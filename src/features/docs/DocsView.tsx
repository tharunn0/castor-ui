import { useState } from 'react';
import { 
  Rocket, 
  DownloadCloud, 
  Cpu, 
  Terminal, 
  Activity, 
  Layers, 
  KeyRound, 
  Copy, 
  Check 
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CLUSTER_TOPOLOGY } from '@/mocks/initialData';
import { toast } from 'sonner';

interface DocsViewProps {
  onNavigate?: (view: 'health' | 'keys') => void;
}

type DocSection = 'getting-started' | 'installation' | 'architecture' | 'integrations' | 'operations';

export function DocsView({ onNavigate }: DocsViewProps) {
  const [activeSection, setActiveSection] = useState<DocSection>('getting-started');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleCopy = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(id);
    toast.success('Snippet copied to clipboard');
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const navItems = [
    { id: 'getting-started', label: 'Getting Started', icon: Rocket },
    { id: 'installation', label: 'Installation & Setup', icon: DownloadCloud },
    { id: 'architecture', label: 'System Architecture', icon: Cpu },
    { id: 'integrations', label: 'Client Integrations', icon: Terminal },
    { id: 'operations', label: 'Operations & Health', icon: Activity },
  ] as const;

  return (
    <div className="flex-1 flex flex-col md:flex-row gap-8 max-w-6xl mx-auto w-full py-2">
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 shrink-0 space-y-2">
        <div className="px-3 py-2">
          <h2 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
            Documentation
          </h2>
          <p className="text-[11px] text-muted-foreground mt-0.5">
            Architecture, installation, and APIs
          </p>
        </div>

        <nav className="flex flex-row md:flex-col gap-1 overflow-x-auto md:overflow-visible pb-2 md:pb-0">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`flex items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-medium text-left whitespace-nowrap md:whitespace-normal cursor-pointer transition-all duration-150 ${
                  isActive
                    ? 'bg-primary text-primary-foreground shadow-xs'
                    : 'text-muted-foreground hover:bg-muted/70 hover:text-foreground hover:translate-x-1 active:translate-x-0.5'
                }`}
              >
                <Icon className="h-4 w-4 shrink-0" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Quick jump to Admin for developers */}
        {onNavigate && (
          <div className="pt-4 border-t border-border mt-4 hidden md:block space-y-1">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground px-3">
              Operator Quick Links
            </span>
            <button
              onClick={() => onNavigate('health')}
              className="w-full flex items-center justify-between px-3 py-1.5 rounded-md text-xs text-muted-foreground hover:bg-muted/50 hover:text-foreground hover:translate-x-1 transition-all duration-150 cursor-pointer"
            >
              <span>Cluster Telemetry</span>
              <Activity className="h-3 w-3 text-emerald-500" />
            </button>
            <button
              onClick={() => onNavigate('keys')}
              className="w-full flex items-center justify-between px-3 py-1.5 rounded-md text-xs text-muted-foreground hover:bg-muted/50 hover:text-foreground hover:translate-x-1 transition-all duration-150 cursor-pointer"
            >
              <span>S3 Access Keys</span>
              <KeyRound className="h-3 w-3 text-blue-500" />
            </button>
          </div>
        )}
      </aside>

      {/* Main Documentation Body */}
      <main className="flex-1 min-w-0 space-y-8">
        {/* SECTION 1: GETTING STARTED */}
        {activeSection === 'getting-started' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold tracking-tight text-foreground">Getting Started</h1>
                <Badge variant="outline">Overview</Badge>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Learn the core concepts of Castor and how to get your private storage cluster online.
              </p>
            </div>

            <div className="space-y-4 text-xs text-muted-foreground leading-relaxed">
              <p>
                <strong className="text-foreground font-semibold">Castor</strong> is a high-performance, 
                distributed object storage system designed for personal servers, homelabs, and edge deployments. 
                It exposes a standard Amazon S3-compatible REST API on port <code className="bg-muted px-1.5 py-0.5 rounded text-foreground font-mono">:9000</code>, 
                allowing existing backup tools, mobile sync clients, and SDKs to connect without modification.
              </p>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-semibold">Core Capabilities</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-xs">
                  <div className="flex items-start gap-2">
                    <span className="font-bold text-foreground">•</span>
                    <span><strong className="text-foreground">S3-Compatible Front-Door:</strong> Supports path-style and virtual-host requests via AWS SigV4.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="font-bold text-foreground">•</span>
                    <span><strong className="text-foreground">Deterministic 4MB Chunking:</strong> Files are split into fixed 4MB chunks and hashed using SHA-256 for inline deduplication.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="font-bold text-foreground">•</span>
                    <span><strong className="text-foreground">Majority Quorum Consensus:</strong> Metadata and bucket states replicate across a 3-node HashiCorp Raft cluster with BadgerDB.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="font-bold text-foreground">•</span>
                    <span><strong className="text-foreground">Bit-Rot Prevention:</strong> Background scrubbing sweeps verify data integrity to heal silent drive corruption.</span>
                  </div>
                </CardContent>
              </Card>

              <div className="rounded-lg border border-border bg-muted/30 p-4 space-y-2">
                <h3 className="text-sm font-semibold text-foreground">Quickstart in 60 Seconds</h3>
                <p className="text-xs">
                  Once your backend is running with Docker, you can immediately begin streaming files using standard tools:
                </p>
                <div className="relative mt-2">
                  <pre className="rounded bg-zinc-950 p-3 text-zinc-100 font-mono text-[11px] overflow-x-auto">
{`# 1. Test cluster health
curl http://localhost:9000/healthz

# 2. Upload file via AWS CLI
export S3_ENDPOINT=http://localhost:9000
aws --endpoint-url=$S3_ENDPOINT s3 mb s3://my-first-bucket
aws --endpoint-url=$S3_ENDPOINT s3 cp ./photo.jpg s3://my-first-bucket/photo.jpg`}
                  </pre>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleCopy(`curl http://localhost:9000/healthz\nexport S3_ENDPOINT=http://localhost:9000\naws --endpoint-url=$S3_ENDPOINT s3 mb s3://my-first-bucket\naws --endpoint-url=$S3_ENDPOINT s3 cp ./photo.jpg s3://my-first-bucket/photo.jpg`, 'quickstart')}
                    className="absolute top-2 right-2 h-7 text-xs bg-zinc-800/80 hover:bg-zinc-700 text-zinc-200"
                  >
                    {copiedCode === 'quickstart' ? <Check className="h-3.5 w-3.5 text-green-400" /> : <Copy className="h-3.5 w-3.5" />}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SECTION 2: INSTALLATION & SETUP */}
        {activeSection === 'installation' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold tracking-tight text-foreground">Installation & Setup</h1>
                <Badge variant="outline">Docker & Bare Metal</Badge>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Deploy Castor using Docker Compose or standalone Go binaries.
              </p>
            </div>

            <div className="space-y-4 text-xs text-muted-foreground leading-relaxed">
              <h3 className="text-sm font-semibold text-foreground">1. Docker Compose Deployment</h3>
              <p>
                The fastest way to spin up the complete 5-component stack (Gateway, Auth, 3 Metadata Raft nodes, 3 Data nodes, and Web UI):
              </p>

              <div className="relative">
                <pre className="rounded-lg bg-zinc-950 p-4 text-zinc-100 font-mono text-[11px] overflow-x-auto leading-relaxed">
{`version: '3.8'

services:
  gateway-svc:
    image: castor/gateway:latest
    ports:
      - "9000:9000"   # S3 REST Endpoint & Health
      - "9001:9001"   # Browser BFF API
    environment:
      - AUTH_SVC_URL=http://auth-svc:9095
      - METADATA_SVC_ADDR=metadata-svc-1:9091

  auth-svc:
    image: castor/auth:latest
    ports:
      - "9095:9095"
    environment:
      - DB_TYPE=sqlite
      - DB_PATH=/data/auth.db
    volumes:
      - auth_data:/data

  metadata-svc-1:
    image: castor/metadata:latest
    ports:
      - "9091:9091"   # gRPC API
      - "9081:9081"   # Raft Transport
      - "9071:9071"   # Operator HTTP

  data-svc-1:
    image: castor/data:latest
    ports:
      - "9101:9101"
    volumes:
      - disk1_data:/chunks

volumes:
  auth_data:
  disk1_data:`}
                </pre>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleCopy(`docker compose up -d`, 'docker-compose')}
                  className="absolute top-3 right-3 h-7 text-xs bg-zinc-800/80 hover:bg-zinc-700 text-zinc-200"
                >
                  {copiedCode === 'docker-compose' ? <Check className="h-3.5 w-3.5 text-green-400" /> : <Copy className="h-3.5 w-3.5" />}
                </Button>
              </div>

              <h3 className="text-sm font-semibold text-foreground pt-4">2. Launching Services</h3>
              <div className="rounded bg-zinc-950 p-3 text-zinc-100 font-mono text-[11px]">
                $ docker compose up -d
              </div>
            </div>
          </div>
        )}

        {/* SECTION 3: SYSTEM ARCHITECTURE */}
        {activeSection === 'architecture' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold tracking-tight text-foreground">System Architecture</h1>
                <Badge variant="outline">Topology & Design</Badge>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Deconstructed view of Castor's 3-tier distributed storage architecture.
              </p>
            </div>

            {/* Topology Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

            {/* In-Depth Specs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-semibold flex items-center gap-2">
                    <Cpu className="h-4 w-4 text-primary" />
                    <span>Consensus & Raft Quorum</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-xs text-muted-foreground leading-relaxed">
                  <p>
                    Castor uses 3-node HashiCorp Raft with BadgerDB as the underlying replicated state machine.
                    Write operations require approval from at least 2 nodes ($W=2, R=3$) ensuring zero split-brain data corruption.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-semibold flex items-center gap-2">
                    <Layers className="h-4 w-4 text-primary" />
                    <span>4MB Fixed Chunking</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-xs text-muted-foreground leading-relaxed">
                  <p>
                    Incoming file streams are sliced into immutable 4MB content-addressed blocks.
                    Identical chunks share the same SHA-256 hash, naturally deduplicating repeated backups.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* SECTION 4: CLIENT INTEGRATIONS */}
        {activeSection === 'integrations' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold tracking-tight text-foreground">Client Integrations</h1>
                <Badge variant="outline">S3 SDKs & Tools</Badge>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Connect CLI tools, desktop sync apps, and programming languages to Castor.
              </p>
            </div>

            <div className="space-y-5 text-xs text-muted-foreground leading-relaxed">
              <div className="space-y-2">
                <h3 className="text-sm font-semibold text-foreground">Python (Boto3)</h3>
                <div className="relative">
                  <pre className="rounded bg-zinc-950 p-3 text-zinc-100 font-mono text-[11px] overflow-x-auto">
{`import boto3

s3 = boto3.client(
    's3',
    endpoint_url='http://localhost:9000',
    aws_access_key_id='AKIA_CASTOR_BOOTSTRAP7F',
    aws_secret_access_key='YOUR_SECRET_KEY',
    region_name='us-east-1'
)

# List all buckets
response = s3.list_buckets()
for bucket in response['Buckets']:
    print(f"Bucket: {bucket['Name']}")`}
                  </pre>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleCopy(`import boto3\n\ns3 = boto3.client('s3', endpoint_url='http://localhost:9000', aws_access_key_id='AKIA_CASTOR_BOOTSTRAP7F', aws_secret_access_key='YOUR_SECRET_KEY', region_name='us-east-1')\nprint(s3.list_buckets())`, 'boto3')}
                    className="absolute top-2 right-2 h-7 text-xs bg-zinc-800/80 hover:bg-zinc-700 text-zinc-200"
                  >
                    {copiedCode === 'boto3' ? <Check className="h-3.5 w-3.5 text-green-400" /> : <Copy className="h-3.5 w-3.5" />}
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-semibold text-foreground">Desktop Apps (Cyberduck / FileZilla Pro)</h3>
                <p>
                  Create an S3 connection profile:
                </p>
                <div className="rounded-md border border-border bg-muted/40 p-3 space-y-1 font-mono text-[11px] text-foreground">
                  <div>Protocol: S3 (Amazon Simple Storage Service)</div>
                  <div>Server: localhost (Port: 9000)</div>
                  <div>Access Key ID: (from API Keys view)</div>
                  <div>Secret Key: (from API Keys view)</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SECTION 5: OPERATIONS & HEALTH */}
        {activeSection === 'operations' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold tracking-tight text-foreground">Operations & Health</h1>
                <Badge variant="outline">Maintenance</Badge>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Monitoring storage node health, garbage collection, and autonomous bit-rot scrubbers.
              </p>
            </div>

            <div className="space-y-4 text-xs text-muted-foreground leading-relaxed">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-semibold">Autonomous Bit-Rot Scrubber</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-xs">
                  <p>
                    The active Raft leader runs an autonomous 7-day cyclical scrubber. It verifies SHA-256 chunk digests 
                    against raw blocks on each `data-svc` storage node. If a block is found corrupted, it triggers automatic 
                    peer healing by streaming a verified replica from surviving nodes.
                  </p>
                  <div className="pt-2">
                    <code className="bg-muted px-2 py-1 rounded text-foreground font-mono">
                      POST /admin/scrub/trigger?dry_run=true
                    </code>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-semibold">Quarantine Garbage Collection</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-xs">
                  <p>
                    Deleted objects enter a 24-hour safety quarantine window before physical chunk reclamation. 
                    Administrators can trigger immediate GC sweeps:
                  </p>
                  <div className="pt-1">
                    <code className="bg-muted px-2 py-1 rounded text-foreground font-mono">
                      POST /admin/gc?dry_run=true
                    </code>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
