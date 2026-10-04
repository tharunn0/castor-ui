import { Cloud, Folder, Shield, KeyRound, Home, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';

export type NavTab = 'cover' | 'explorer' | 'health' | 'keys';

interface HeaderProps {
  activeTab: NavTab;
  onTabChange: (tab: NavTab) => void;
  currentUser?: string | null;
  onOpenAuth: (mode: 'login' | 'register') => void;
}

export function Header({
  activeTab,
  onTabChange,
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
            <Cloud className="h-4 w-4" />
          </div>
          <span className="text-base font-bold tracking-wider">CASTOR</span>
        </button>

        {/* User Navigation Tabs */}
        <nav className="flex items-center gap-1">
          <button
            onClick={() => onTabChange('cover')}
            className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
              activeTab === 'cover'
                ? 'bg-muted text-foreground'
                : 'text-muted-foreground hover:bg-muted/60 hover:text-foreground'
            }`}
          >
            <Home className="h-3.5 w-3.5" />
            Home
          </button>
          <button
            onClick={() => onTabChange('explorer')}
            className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
              activeTab === 'explorer'
                ? 'bg-muted text-foreground'
                : 'text-muted-foreground hover:bg-muted/60 hover:text-foreground'
            }`}
          >
            <Folder className="h-3.5 w-3.5" />
            Files
          </button>
        </nav>
      </div>

      {/* Right Controls: Admin Area & User Session */}
      <div className="flex items-center gap-3">
        {/* Admin Area Links */}
        <div className="flex items-center gap-1 text-xs">
          <button
            onClick={() => onTabChange('health')}
            className={`flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${
              activeTab === 'health'
                ? 'bg-muted text-foreground'
                : 'text-muted-foreground hover:bg-muted/60 hover:text-foreground'
            }`}
            title="Cluster Health (Admin)"
          >
            <Shield className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">System Health</span>
          </button>
          <button
            onClick={() => onTabChange('keys')}
            className={`flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${
              activeTab === 'keys'
                ? 'bg-muted text-foreground'
                : 'text-muted-foreground hover:bg-muted/60 hover:text-foreground'
            }`}
            title="Access Keys (Admin)"
          >
            <KeyRound className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Access Keys</span>
          </button>
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
              className="h-8 text-xs gap-1.5"
            >
              <LogIn className="h-3.5 w-3.5" />
              Sign In
            </Button>
          </div>
        )}
      </div>
    </header>
  );
}
