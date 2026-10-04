import { Cloud, BookOpen, LogIn, ShieldCheck, HeartHandshake, HardDrive, Smartphone } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CoverViewProps {
  onNavigate: (view: 'explorer' | 'docs' | 'health' | 'keys' | 'login' | 'register') => void;
}

export function CoverView({ onNavigate }: CoverViewProps) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center max-w-4xl mx-auto px-4 py-12 sm:py-16 space-y-16">
      {/* Hero Section */}
      <section className="text-center space-y-5 max-w-2xl mx-auto">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-sm hover:scale-105 hover:shadow-md transition-all duration-300">
          <Cloud className="h-8 w-8" />
        </div>

        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-foreground">
          Castor
        </h1>

        <p className="text-lg sm:text-xl font-medium text-foreground/85">
          Personal, private cloud storage you truly own.
        </p>

        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
          Take back control of your photos, documents, and computer backups. 
          A simple, private cloud for your home or office with zero monthly subscription fees.
        </p>

        {/* Primary Action Buttons */}
        <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
          <Button 
            size="lg" 
            onClick={() => onNavigate('login')}
            className="gap-2 px-6 font-semibold shadow-xs"
          >
            <LogIn className="h-4 w-4" />
            <span>Sign In / Create Account</span>
          </Button>

          <Button 
            variant="outline" 
            size="lg" 
            onClick={() => onNavigate('docs')}
            className="gap-2 px-5 font-medium"
          >
            <BookOpen className="h-4 w-4" />
            <span>Documentation & Setup</span>
          </Button>
        </div>
      </section>

      {/* Non-Technical Details & Story Section */}
      <section className="w-full space-y-10 border-t border-border pt-12">
        <div className="text-center space-y-2 max-w-xl mx-auto">
          <h2 className="text-2xl font-bold tracking-tight text-foreground">
            Cloud storage on your own terms
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground">
            No corporate surveillance, no sudden price increases, and no storage limits.
          </p>
        </div>

        {/* 4 Pillars of Everyday Value */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="rounded-xl border border-border bg-muted/20 p-5 space-y-2.5 transition-all duration-200 hover:-translate-y-1 hover:border-primary/40 hover:shadow-sm">
            <div className="flex items-center gap-2.5 text-foreground font-semibold text-sm">
              <ShieldCheck className="h-4 w-4 text-primary" />
              <span>Complete Personal Privacy</span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Commercial cloud drives often scan your files for targeted advertising or AI training. 
              With Castor, your files live exclusively on your computer or home server. Nobody else has the keys.
            </p>
          </div>

          <div className="rounded-xl border border-border bg-muted/20 p-5 space-y-2.5 transition-all duration-200 hover:-translate-y-1 hover:border-primary/40 hover:shadow-sm">
            <div className="flex items-center gap-2.5 text-foreground font-semibold text-sm">
              <HeartHandshake className="h-4 w-4 text-primary" />
              <span>Zero Monthly Fees</span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Stop paying $10 to $30 every month for expanding cloud tiers. 
              Castor uses the hard drive space you already have, saving you hundreds of dollars every year.
            </p>
          </div>

          <div className="rounded-xl border border-border bg-muted/20 p-5 space-y-2.5 transition-all duration-200 hover:-translate-y-1 hover:border-primary/40 hover:shadow-sm">
            <div className="flex items-center gap-2.5 text-foreground font-semibold text-sm">
              <HardDrive className="h-4 w-4 text-primary" />
              <span>All Your Memories in Full Quality</span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Store 4K family videos, RAW photos, music libraries, and important documents in their original, uncompressed resolution without quality loss.
            </p>
          </div>

          <div className="rounded-xl border border-border bg-muted/20 p-5 space-y-2.5 transition-all duration-200 hover:-translate-y-1 hover:border-primary/40 hover:shadow-sm">
            <div className="flex items-center gap-2.5 text-foreground font-semibold text-sm">
              <Smartphone className="h-4 w-4 text-primary" />
              <span>Connected Across All Devices</span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Save files from your laptop at work, check a document from your phone, or stream a video to your TV. Castor is always available when you need it.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
