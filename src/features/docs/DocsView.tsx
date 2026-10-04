import { 
  Terminal, 
  Cpu, 
  Layers, 
  Network, 
  KeyRound,
  Activity
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CLUSTER_TOPOLOGY } from '@/mocks/initialData';

interface DocsViewProps {
  onNavigate?: (view: 'health' | 'keys') => void;
}

export function DocsView({ onNavigate }: DocsViewProps) {
  return (
    <div className="space-y-8 max-w-5xl mx-auto py-2">
      {/* Docs Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-5">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-foreground">Castor Technical Docs</h1>
            <Badge variant="outline" className="font-mono text-xs">v0.1.0 Architecture</Badge>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Internal system specifications, cluster port allocations, consensus protocols, and storage topology.
          </p>
        </div>

        {onNavigate && (
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onNavigate('health')}
              className="gap-1.5 text-xs"
            >
              <Activity className="h-3.5 w-3.5 text-emerald-500" />
              <span>Live Cluster Status</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onNavigate('keys')}
              className="gap-1.5 text-xs"
            >
              <KeyRound className="h-3.5 w-3.5 text-blue-500" />
              <span>API Credentials</span>
            </Button>
          </div>
        )}
      </div>

      {/* Architecture Overview */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold tracking-tight text-foreground flex items-center gap-2">
          <Network className="h-4 w-4 text-primary" />
          <span>System Topology & Port Allocations</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {CLUSTER_TOPOLOGY.map((service) => (
            <Card key={service.name} className="bg-surface">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono text-muted-foreground">{service.protocol}</span>
                  <Badge variant="outline" className="font-mono text-[10px]">
                    Port {service.port}
                  </Badge>
                </div>
                <CardTitle className="text-sm font-semibold">{service.name}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-1.5 text-xs">
                <div className="text-muted-foreground text-[11px] leading-relaxed">
                  {service.engine}
                </div>
                <div className="font-mono text-[11px] text-foreground font-medium pt-1">
                  {service.url}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Deep-Dive Specifications */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Consensus Specification */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2 text-primary mb-1">
              <Cpu className="h-4 w-4" />
              <CardTitle className="text-base">Metadata Consensus & Quorum</CardTitle>
            </div>
            <CardDescription className="text-xs">
              Linearizable metadata state machine built on HashiCorp Raft and BadgerDB.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-xs leading-relaxed text-muted-foreground">
            <p>
              Metadata (buckets, object manifests, and chunk placement tables) is strictly replicated across a 
              3-node Raft consensus group (`metadata-svc-1..3`).
            </p>
            <div className="rounded-md border border-border bg-muted/40 p-3 space-y-1.5 font-mono text-[11px] text-foreground">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Replication Quorum:</span>
                <span className="font-semibold text-emerald-600 dark:text-emerald-400">Majority (W=2, R=3)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">State Store:</span>
                <span>BadgerDB LSM-Tree</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Heartbeat Timeout:</span>
                <span>250ms (Election: 1000ms)</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Storage Engine Specification */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2 text-primary mb-1">
              <Layers className="h-4 w-4" />
              <CardTitle className="text-base">Chunking & Deduplication</CardTitle>
            </div>
            <CardDescription className="text-xs">
              Content-addressed chunk storage with deterministic SHA-256 identification.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-xs leading-relaxed text-muted-foreground">
            <p>
              Inbound files are segmented into fixed 4MB chunks directly in the stream pipeline. 
              Each chunk is addressed by its SHA-256 digest, providing automatic inline deduplication.
            </p>
            <div className="rounded-md border border-border bg-muted/40 p-3 space-y-1.5 font-mono text-[11px] text-foreground">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Chunk Size:</span>
                <span>4,194,304 bytes (4MB)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Addressing:</span>
                <span>SHA-256 Content-Addressed</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Bit-Rot Auditing:</span>
                <span>Autonomous 7-day scrubber</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* CLI & Integration Quickstart */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <Terminal className="h-4 w-4 text-primary" />
            <CardTitle className="text-sm font-semibold">S3 REST API & AWS CLI Configuration</CardTitle>
          </div>
          <CardDescription className="text-xs">
            Standard S3 clients (boto3, aws-cli, rclone) connect to Castor at port 9000.
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-0">
          <pre className="rounded-md border border-border bg-muted/50 p-4 font-mono text-xs text-foreground overflow-x-auto">
{`# Connect AWS CLI to Castor
export AWS_ACCESS_KEY_ID=AKIA_CASTOR_BOOTSTRAP7F
export AWS_SECRET_ACCESS_KEY=<YOUR_SECRET_KEY>
export S3_ENDPOINT=http://localhost:9000

# List buckets
aws --endpoint-url=$S3_ENDPOINT s3 ls

# Upload file with content-addressed streaming
aws --endpoint-url=$S3_ENDPOINT s3 cp ./backup.tar.gz s3://my-bucket/backup.tar.gz`}
          </pre>
        </CardContent>
      </Card>
    </div>
  );
}
