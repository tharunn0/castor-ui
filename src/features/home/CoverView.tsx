import { 
  Database, 
  ShieldCheck, 
  HardDrive, 
  KeyRound, 
  Cpu, 
  ArrowRight, 
  Terminal, 
  LogIn, 
  UserPlus 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CLUSTER_TOPOLOGY } from '@/mocks/initialData';

interface CoverViewProps {
  onNavigate: (view: 'explorer' | 'health' | 'keys' | 'login' | 'register') => void;
}

export function CoverView({ onNavigate }: CoverViewProps) {
  return (
    <div className="flex-1 flex flex-col justify-between p-6 max-w-6xl mx-auto w-full space-y-12">
      {/* Top Banner / System Status */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-4 border-b border-border pb-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm">
            <Database className="h-6 w-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold tracking-tight text-foreground">Castor Object Store</h1>
              <Badge variant="healthy" className="gap-1.5 text-[11px] py-0">
                <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
                Cluster Online
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground">
              S3-Compatible • Content-Addressed 4MB Chunks • Majority Quorum ($W=2, R=3$)
            </p>
          </div>
        </div>

        {/* User Portal Actions */}
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => onNavigate('login')}
            className="gap-1.5 text-xs"
          >
            <LogIn className="h-3.5 w-3.5" />
            Sign In
          </Button>
          <Button 
            size="sm" 
            onClick={() => onNavigate('register')}
            className="gap-1.5 text-xs"
          >
            <UserPlus className="h-3.5 w-3.5" />
            Create Account
          </Button>
        </div>
      </div>

      {/* Hero Statement */}
      <div className="text-center max-w-2xl mx-auto space-y-3 py-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-muted/60 text-xs text-muted-foreground font-mono">
          <ShieldCheck className="h-3.5 w-3.5 text-primary" />
          <span>Linearizable Consensus with BadgerDB + HashiCorp Raft</span>
        </div>
        <h2 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
          High-performance distributed storage for modern workloads.
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Stateless S3 gateway front-door, in-memory chunk deduplication, autonomous replica healing, 
          and periodic 7-day bit-rot scrubbing.
        </p>
      </div>

      {/* Gateway Portals Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Portal 1: Bucket & Object Explorer */}
        <Card className="flex flex-col justify-between hover:border-primary/50 transition-colors">
          <CardHeader>
            <div className="flex items-center justify-between mb-1">
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-blue-500/10 text-blue-500">
                <HardDrive className="h-4 w-4" />
              </div>
              <span className="text-[11px] font-mono text-muted-foreground">Port :9001</span>
            </div>
            <CardTitle className="text-base">Bucket & Object Explorer</CardTitle>
            <CardDescription className="text-xs leading-relaxed">
              Create storage buckets, browse folder hierarchies, stream downloads, and upload files directly via the 4MB in-process chunker.
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            <Button 
              variant="secondary" 
              className="w-full justify-between text-xs"
              onClick={() => onNavigate('explorer')}
            >
              <span>Launch Explorer</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          </CardContent>
        </Card>

        {/* Portal 2: Cluster Health & Telemetry */}
        <Card className="flex flex-col justify-between hover:border-primary/50 transition-colors">
          <CardHeader>
            <div className="flex items-center justify-between mb-1">
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-emerald-500/10 text-emerald-500">
                <Cpu className="h-4 w-4" />
              </div>
              <span className="text-[11px] font-mono text-muted-foreground">Admin :9071</span>
            </div>
            <CardTitle className="text-base">Cluster Health & Ops</CardTitle>
            <CardDescription className="text-xs leading-relaxed">
              Inspect active Raft consensus, monitor disk capacity across storage nodes, and observe leader-only bit-rot scrubber progress.
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            <Button 
              variant="secondary" 
              className="w-full justify-between text-xs"
              onClick={() => onNavigate('health')}
            >
              <span>View Cluster Health</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          </CardContent>
        </Card>

        {/* Portal 3: S3 API Credentials */}
        <Card className="flex flex-col justify-between hover:border-primary/50 transition-colors">
          <CardHeader>
            <div className="flex items-center justify-between mb-1">
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-indigo-500/10 text-indigo-500">
                <KeyRound className="h-4 w-4" />
              </div>
              <span className="text-[11px] font-mono text-muted-foreground">Auth :9095</span>
            </div>
            <CardTitle className="text-base">S3 Credentials & Keys</CardTitle>
            <CardDescription className="text-xs leading-relaxed">
              Generate Amazon SigV4 keypairs to connect standard tools like AWS CLI, Boto3, Rclone, or Cyberduck against port :9000.
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            <Button 
              variant="secondary" 
              className="w-full justify-between text-xs"
              onClick={() => onNavigate('keys')}
            >
              <span>Manage API Keys</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Cluster Topology & Endpoints Matrix from Centralized Definition */}
      <div className="rounded-lg border border-border bg-surface p-4 space-y-3">
        <div className="flex items-center justify-between text-xs font-medium text-foreground">
          <div className="flex items-center gap-2">
            <Terminal className="h-4 w-4 text-muted-foreground" />
            <span>Active Cluster Endpoint Catalog</span>
          </div>
          <span className="text-muted-foreground font-mono">Quorum W=2, R=3</span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 text-xs font-mono">
          {CLUSTER_TOPOLOGY.map((service) => (
            <div key={service.name} className="rounded-md border border-border bg-muted/40 p-2.5">
              <div className="text-[11px] text-muted-foreground truncate">{service.name}</div>
              <div className="text-foreground font-semibold truncate">{service.url}</div>
              <div className="text-[10px] text-muted-foreground/75 truncate mt-0.5">{service.engine}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
