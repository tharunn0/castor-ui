import { Database, ShieldCheck, KeyRound, HardDrive, Home, LogIn } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export type NavTab = 'cover' | 'explorer' | 'health' | 'keys';

interface HeaderProps {
  activeTab: NavTab;
  onTabChange: (tab: NavTab) => void;
  clusterHealthy?: boolean;
  currentUser?: string | null;
  onOpenAuth: (mode: 'login' | 'register') => void;
}

export function Header({
  activeTab,
  onTabChange,
  clusterHealthy = true,
  currentUser = null,
  onOpenAuth,
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 flex h-14 w-full items-center justify-between border-b border-border bg-background/95 px-6 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      {/* Brand & Logo */}
      <div className="flex items-center gap-6">
        <button
          onClick={() => onTabChange('cover')}
          className="flex items-center gap-2 font-semibold tracking-tight text-foreground hover:opacity-80 transition-opacity"
        >
          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <Database className="h-4 w-4" />
          </div>
          <span className="text-base font-bold tracking-wider">CASTOR</span>
          <span className="text-xs text-muted-foreground font-mono">v0.1.0</span>
        </button>

        {/* Navigation Tabs */}
        <nav className="flex items-center gap-1">
          <button
            onClick={() => onTabChange('cover')}
            className={`flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-medium transition-colors ${
              activeTab === 'cover'
                ? 'bg-muted text-foreground'
                : 'text-muted-foreground hover:bg-muted/60 hover:text-foreground'
            }`}
          >
            <Home className="h-3.5 w-3.5" />
            Overview
          </button>
          <button
            onClick={() => onTabChange('explorer')}
            className={`flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-medium transition-colors ${
              activeTab === 'explorer'
                ? 'bg-muted text-foreground'
                : 'text-muted-foreground hover:bg-muted/60 hover:text-foreground'
            }`}
          >
            <HardDrive className="h-3.5 w-3.5" />
            Buckets
          </button>
          <button
            onClick={() => onTabChange('health')}
            className={`flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-medium transition-colors ${
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
            className={`flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-medium transition-colors ${
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

      {/* Status & Auth Control */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground hidden sm:inline">Quorum:</span>
          {clusterHealthy ? (
            <Badge variant="healthy" className="gap-1.5 py-0.5 text-[11px]">
              <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
              W=2 / R=3
            </Badge>
          ) : (
            <Badge variant="degraded" className="gap-1.5 py-0.5 text-[11px]">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
              Degraded
            </Badge>
          )}
        </div>

        <div className="h-4 w-[1px] bg-border" />

        {currentUser ? (
          <div className="flex items-center gap-2 text-xs text-foreground">
            <span className="font-mono bg-muted/60 px-2 py-1 rounded border border-border">
              {currentUser}
            </span>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onOpenAuth('login')}
              className="h-7 text-xs gap-1.5"
            >
              <LogIn className="h-3 w-3" />
              Sign In
            </Button>
          </div>
        )}
      </div>
    </header>
  );
}
