import { Cloud, ArrowRight, BookOpen, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CoverViewProps {
  onNavigate: (view: 'explorer' | 'docs' | 'health' | 'keys' | 'login' | 'register') => void;
}

export function CoverView({ onNavigate }: CoverViewProps) {
  const handleOpenDocs = () => {
    onNavigate('docs');
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center min-h-[70vh] max-w-2xl mx-auto px-4 text-center">
      {/* Brand Icon */}
      <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-sm">
        <Cloud className="h-8 w-8" />
      </div>

      {/* Main Title & Tagline */}
      <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-foreground">
        Castor
      </h1>

      <p className="mt-3 text-lg sm:text-xl font-medium text-foreground/80">
        Personal, private cloud storage.
      </p>

      <p className="mt-2 text-sm text-muted-foreground max-w-md">
        A simple and secure place to store, organize, and access all your files and backups.
      </p>

      {/* Action Buttons: Sign In / Sign Up, Docs, Files */}
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Button 
          size="lg" 
          onClick={() => onNavigate('login')}
          className="gap-2 px-6 font-semibold"
        >
          <LogIn className="h-4 w-4" />
          <span>Sign In / Sign Up</span>
        </Button>

        <Button 
          variant="outline" 
          size="lg" 
          onClick={() => onNavigate('explorer')}
          className="gap-2 px-5 font-medium"
        >
          <span>Browse Files</span>
          <ArrowRight className="h-4 w-4" />
        </Button>

        <Button 
          variant="ghost" 
          size="lg" 
          onClick={handleOpenDocs}
          className="gap-2 px-4 text-muted-foreground hover:text-foreground"
        >
          <BookOpen className="h-4 w-4" />
          <span>Documentation</span>
        </Button>
      </div>
    </div>
  );
}
