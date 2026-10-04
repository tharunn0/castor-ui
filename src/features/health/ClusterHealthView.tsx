import { useState } from 'react';
import { Activity, Server, RefreshCw, Cpu, Layers } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { formatBytes } from '@/lib/utils';
import { INITIAL_DATA_NODES, INITIAL_CLUSTER_HEALTH } from '@/mocks/initialData';

export function ClusterHealthView() {
  const [isScrubbing, setIsScrubbing] = useState(false);
  const [scrubProgress, setScrubProgress] = useState(38);
  const [clusterInfo] = useState(INITIAL_CLUSTER_HEALTH);
  const [nodes] = useState(INITIAL_DATA_NODES);

  const handleTriggerScrub = () => {
    setIsScrubbing(true);
    toast.info('Triggered bit-rot scrubber sweep on Raft leader');
    setTimeout(() => {
      setScrubProgress((prev) => Math.min(100, prev + 15));
      setIsScrubbing(false);
      toast.success('Leader scrubber verified 480 chunks with zero bit-rot');
    }, 1200);
  };

  return (
    <div className="space-y-6">
      {/* View Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-foreground">Cluster Telemetry</h2>
          <p className="text-xs text-muted-foreground">
            Real-time status of consensus state machine, storage nodes, and background bit-rot scrubbers.
          </p>
        </div>
        <Button variant="outline" size="sm" onClick={() => toast.success('Telemetry refreshed')} className="gap-2 text-xs">
          <RefreshCw className="h-3.5 w-3.5" />
          Refresh Stats
        </Button>
      </div>

      {/* Consensus & Top Overview Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Raft Consensus */}
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground font-medium">Raft Consensus</span>
              <Cpu className="h-4 w-4 text-blue-500" />
            </div>
            <CardTitle className="text-lg font-bold">Term {clusterInfo.term} • Leader</CardTitle>
          </CardHeader>
          <CardContent className="space-y-1.5 text-xs">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Active Leader:</span>
              <span className="font-mono font-medium">{clusterInfo.raftLeader}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Commit Index:</span>
              <span className="font-mono">{clusterInfo.commitIndex.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Replication Quorum:</span>
              <span className="font-mono text-green-500 font-medium">
                {clusterInfo.healthyNodes} of {clusterInfo.totalNodes} Nodes Active
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Inline Deduplication Savings */}
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground font-medium">Deduplication Ratio</span>
              <Layers className="h-4 w-4 text-emerald-500" />
            </div>
            <CardTitle className="text-lg font-bold">1.48x (32.4% Saved)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-1.5 text-xs">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Logical Volume:</span>
              <span className="font-mono">62.8 GB</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Raw Chunks Stored:</span>
              <span className="font-mono">42.4 GB</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Deduplicated Chunks:</span>
              <span className="font-mono text-green-500 font-medium">5,120 chunks</span>
            </div>
          </CardContent>
        </Card>

        {/* Scrubber Overview */}
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground font-medium">Bit-Rot Scrubber</span>
              <Activity className="h-4 w-4 text-indigo-500" />
            </div>
            <CardTitle className="text-lg font-bold">Cycle 12 • Healthy</CardTitle>
          </CardHeader>
          <CardContent className="space-y-1.5 text-xs">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Progress:</span>
              <span className="font-mono font-medium">{scrubProgress}% Complete</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Chunks Verified:</span>
              <span className="font-mono">10,854</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Corruptions Found:</span>
              <span className="font-mono text-green-500 font-medium">0 (0.00%)</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Storage Nodes Capacity Grid */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-sm">Storage Nodes Grid (`data-svc`)</CardTitle>
              <CardDescription className="text-xs">
                Majority Quorum placement requires 2 healthy nodes for write acceptance (W=2, R=3).
              </CardDescription>
            </div>
            <Badge variant="healthy" className="text-xs py-0.5">
              Quorum Intact
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4 pt-0">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {nodes.map((node) => {
              const usedBytes = node.totalBytes - node.freeBytes;
              const usedPercent = Math.round((usedBytes / node.totalBytes) * 100);

              return (
                <div
                  key={node.nodeId}
                  className="rounded-md border border-border bg-surface p-4 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Server className="h-4 w-4 text-muted-foreground" />
                      <span className="font-mono text-xs font-semibold text-foreground">
                        {node.nodeId}
                      </span>
                    </div>
                    <Badge variant="healthy" className="text-[10px] py-0 px-1.5">
                      {node.status}
                    </Badge>
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">Capacity Used:</span>
                      <span className="font-mono font-medium text-foreground">{usedPercent}%</span>
                    </div>
                    {/* Linear Progress Bar */}
                    <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                      <div
                        className="h-full bg-primary transition-all duration-300"
                        style={{ width: `${usedPercent}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-[11px] text-muted-foreground font-mono">
                      <span>{formatBytes(usedBytes)} used</span>
                      <span>{formatBytes(node.totalBytes)} total</span>
                    </div>
                  </div>

                  <div className="pt-1 border-t border-border flex justify-between text-xs text-muted-foreground">
                    <span>gRPC Endpoint:</span>
                    <span className="font-mono text-foreground">{node.grpcAddress}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Scrubber Worker Panel */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-sm">Leader Background Workers</CardTitle>
              <CardDescription className="text-xs">
                Active healing, 24h quarantine garbage collection, and bit-rot scrubbing run directly on the active Raft leader.
              </CardDescription>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleTriggerScrub}
              disabled={isScrubbing}
              className="gap-2 h-8 text-xs"
            >
              <RefreshCw className={`h-3 w-3 ${isScrubbing ? 'animate-spin' : ''}`} />
              Trigger Scrub Sweep (Dry-Run)
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-3 pt-0">
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="text-muted-foreground">Periodic Scrub Progress (7-Day Cycle):</span>
              <span className="font-mono text-foreground font-medium">{scrubProgress}%</span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
              <div
                className="h-full bg-indigo-500 transition-all duration-300"
                style={{ width: `${scrubProgress}%` }}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
