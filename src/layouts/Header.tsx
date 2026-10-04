import { Database, ShieldCheck, KeyRound, HardDrive } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export type NavTab = 'explorer' | 'health' | 'keys';

interface HeaderProps {
  activeTab: NavTab;
  onTabChange: (tab: NavTab) => void;
  clusterHealthy?: boolean;
}

export function Header({ activeTab, onTabChange, clusterHealthy = true }: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 flex h-14 w-full items-center justify-between border-b border-border bg-background/95 px-6 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      {/* Brand & Logo */}
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2 font-semibold tracking-tight text-foreground">
          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <Database className="h-4 w-4" />
          </div>
          <span className="text-base font-bold tracking-wider">CASTOR</span>
          <span className="text-xs text-muted-foreground font-mono">v0.1.0</span>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex items-center gap-1">
          <button
            onClick={() => onTabChange('explorer')}
            className={`flex items-center gap-2 rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
              activeTab === 'explorer'
                ? 'bg-muted text-foreground'
                : 'text-muted-foreground hover:bg-muted/60 hover:text-foreground'
            }`}
          >
            <HardDrive className="h-3.5 w-3.5" />
            Buckets & Objects
          </button>
          <button
            onClick={() => onTabChange('health')}
            className={`flex items-center gap-2 rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
              activeTab === 'health'
                ? 'bg-muted text-foreground'
                : 'text-muted-foreground hover:bg-muted/60 hover:text-foreground'
            }`}
          >
            <ShieldCheck className="h-3.5 w-3.5" />
            Cluster Health
          </button>
          <button
            onClick={() => onTabChange('keys')}
            className={`flex items-center gap-2 rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
              activeTab === 'keys'
                ? 'bg-muted text-foreground'
                : 'text-muted-foreground hover:bg-muted/60 hover:text-foreground'
            }`}
          >
            <KeyRound className="h-3.5 w-3.5" />
            API Keys
          </button>
        </nav>
      </div>

      {/* Cluster Health Pill & User */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">Cluster:</span>
          {clusterHealthy ? (
            <Badge variant="healthy" className="gap-1.5 py-0.5">
              <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
              Healthy (W=2/R=3)
            </Badge>
          ) : (
            <Badge variant="degraded" className="gap-1.5 py-0.5">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
              Degraded
            </Badge>
          )}
        </div>

        <div className="h-4 w-[1px] bg-border" />

        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span className="font-mono">admin@castor.local</span>
        </div>
      </div>
    </header>
  );
}
