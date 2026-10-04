import { Database, ShieldCheck } from 'lucide-react';

export default function App() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Minimal Header */}
      <header className="h-14 border-b border-border flex items-center justify-between px-6">
        <div className="flex items-center gap-2 font-bold tracking-tight">
          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <Database className="h-4 w-4" />
          </div>
          <span className="tracking-wider">CASTOR</span>
          <span className="text-xs text-muted-foreground font-mono ml-1">Console</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <ShieldCheck className="h-4 w-4 text-green-500" />
          <span className="font-mono">W=2 / R=3 Quorum</span>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 flex items-center justify-center p-6">
        <div className="max-w-md w-full rounded-lg border border-border bg-surface p-6 shadow-sm space-y-4">
          <div className="space-y-1">
            <h1 className="text-base font-semibold tracking-tight">Castor UI — Phase 0 Ready</h1>
            <p className="text-xs text-muted-foreground">
              Vite, React 19, TypeScript, and Tailwind tokens initialized.
            </p>
          </div>
          <div className="rounded-md border border-border bg-muted/40 p-3 font-mono text-xs space-y-1 text-muted-foreground">
            <div className="flex justify-between">
              <span>Status:</span>
              <span className="text-green-500 font-medium">Scaffolding Complete</span>
            </div>
            <div className="flex justify-between">
              <span>Target BFF:</span>
              <span className="text-foreground">http://localhost:9001</span>
            </div>
            <div className="flex justify-between">
              <span>Target S3:</span>
              <span className="text-foreground">http://localhost:9000</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
