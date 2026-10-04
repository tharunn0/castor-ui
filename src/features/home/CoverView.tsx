import { 
  FolderLock, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  Layers, 
  Laptop, 
  Film, 
  Archive, 
  PlugZap 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface CoverViewProps {
  onNavigate: (view: 'explorer' | 'health' | 'keys' | 'login' | 'register') => void;
}

export function CoverView({ onNavigate }: CoverViewProps) {
  return (
    <div className="flex-1 flex flex-col justify-center py-6 sm:py-12 max-w-5xl mx-auto w-full space-y-16">
      {/* Hero Section */}
      <section className="text-center space-y-6 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-muted/50 text-xs text-muted-foreground font-medium">
          <Sparkles className="h-3.5 w-3.5 text-primary" />
          <span>Simple, private cloud storage</span>
          <span className="text-border">•</span>
          <span className="flex items-center gap-1.5 text-green-600 dark:text-green-400 font-normal">
            <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
            Online & Ready
          </span>
        </div>

        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-foreground leading-[1.15]">
          Store, protect, and access all your files in one place.
        </h1>

        <p className="text-base sm:text-lg text-muted-foreground leading-relaxed font-normal max-w-2xl mx-auto">
          Castor is your own self-hosted cloud storage. Think of it like your personal, ultra-reliable 
          Dropbox or Google Drive — secure, always online, and completely under your control.
        </p>

        {/* Primary Call to Actions */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <Button 
            size="lg" 
            onClick={() => onNavigate('explorer')} 
            className="gap-2 px-6 text-sm font-semibold shadow-sm"
          >
            <span>Open File Explorer</span>
            <ArrowRight className="h-4 w-4" />
          </Button>

          <Button 
            variant="outline" 
            size="lg" 
            onClick={() => onNavigate('login')} 
            className="text-sm px-6 font-medium"
          >
            Sign In / Register
          </Button>
        </div>
      </section>

      {/* Practical Use Cases Grid */}
      <section className="space-y-6">
        <div className="text-center space-y-1">
          <h2 className="text-xl font-bold tracking-tight text-foreground">
            What can you use Castor for?
          </h2>
          <p className="text-xs text-muted-foreground">
            Built to handle everyday storage needs as well as heavy media and backups.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Use Case 1: Media & Documents */}
          <Card className="hover:border-foreground/20 transition-all shadow-xs">
            <CardHeader className="pb-3">
              <div className="h-10 w-10 rounded-lg bg-blue-500/10 text-blue-500 flex items-center justify-center mb-2">
                <Film className="h-5 w-5" />
              </div>
              <CardTitle className="text-base font-semibold">Media & Documents</CardTitle>
              <CardDescription className="text-xs leading-relaxed text-muted-foreground">
                Safely store videos, family photo albums, and large project files. Stream or download them anytime with high speed and zero bandwidth restrictions.
              </CardDescription>
            </CardHeader>
          </Card>

          {/* Use Case 2: Automated Backups */}
          <Card className="hover:border-foreground/20 transition-all shadow-xs">
            <CardHeader className="pb-3">
              <div className="h-10 w-10 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center mb-2">
                <Archive className="h-5 w-5" />
              </div>
              <CardTitle className="text-base font-semibold">Automatic Backups</CardTitle>
              <CardDescription className="text-xs leading-relaxed text-muted-foreground">
                Keep daily snapshots of your computers, databases, and servers safe. Identical duplicate files are automatically detected to avoid wasting space.
              </CardDescription>
            </CardHeader>
          </Card>

          {/* Use Case 3: App Assets & Tools */}
          <Card className="hover:border-foreground/20 transition-all shadow-xs">
            <CardHeader className="pb-3">
              <div className="h-10 w-10 rounded-lg bg-purple-500/10 text-purple-500 flex items-center justify-center mb-2">
                <PlugZap className="h-5 w-5" />
              </div>
              <CardTitle className="text-base font-semibold">Connect Any App</CardTitle>
              <CardDescription className="text-xs leading-relaxed text-muted-foreground">
                Connect external apps, desktop sync clients, or website uploads using standard S3 keys. If your favorite app supports cloud storage, it works with Castor.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* Why Choose Castor (Key Highlights) */}
      <section className="rounded-xl border border-border bg-muted/20 p-6 sm:p-8 space-y-6">
        <div className="text-center space-y-1">
          <h2 className="text-lg font-bold tracking-tight text-foreground">
            Simple, private, and durable by design
          </h2>
          <p className="text-xs text-muted-foreground">
            Peace of mind knowing your data is safe and always accessible.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs">
          <div className="flex items-start gap-3 p-2">
            <FolderLock className="h-5 w-5 text-primary shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="font-semibold text-foreground">100% Private</p>
              <p className="text-muted-foreground text-[11px] leading-relaxed">
                Your data stays exclusively on your infrastructure. No third-party analytics or lock-in.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-2">
            <Layers className="h-5 w-5 text-primary shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="font-semibold text-foreground">Smart Deduplication</p>
              <p className="text-muted-foreground text-[11px] leading-relaxed">
                Identical files share storage automatically, saving up to 30%+ of your hard drive capacity.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-2">
            <ShieldCheck className="h-5 w-5 text-primary shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="font-semibold text-foreground">Continuous Protection</p>
              <p className="text-muted-foreground text-[11px] leading-relaxed">
                Continuous background health audits verify file integrity and prevent digital data rot.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-2">
            <Laptop className="h-5 w-5 text-primary shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="font-semibold text-foreground">Universal Compatibility</p>
              <p className="text-muted-foreground text-[11px] leading-relaxed">
                Connect tools like Cyberduck, AWS CLI, rclone, or Python scripts in a matter of seconds.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Subtle Operator & Developer Shortcuts Footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-muted-foreground border-t border-border pt-6 gap-3">
        <span className="font-medium text-foreground">Advanced Options:</span>
        <div className="flex items-center gap-4">
          <button 
            onClick={() => onNavigate('health')} 
            className="hover:text-foreground transition-colors underline-offset-4 hover:underline"
          >
            System Status & Storage Nodes →
          </button>
          <span>•</span>
          <button 
            onClick={() => onNavigate('keys')} 
            className="hover:text-foreground transition-colors underline-offset-4 hover:underline"
          >
            Connect External Apps (API Keys) →
          </button>
        </div>
      </div>
    </div>
  );
}
