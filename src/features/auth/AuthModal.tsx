import React, { useState } from 'react';
import { LogIn, UserPlus, X, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';

interface AuthModalProps {
  mode: 'login' | 'register';
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (email: string) => void;
  onSwitchMode: (newMode: 'login' | 'register') => void;
}

export function AuthModal({
  mode,
  isOpen,
  onClose,
  onSuccess,
  onSwitchMode,
}: AuthModalProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Please enter both email and password');
      return;
    }

    setIsLoading(true);
    // Simulate auth request against /api/auth/login or /auth/register
    setTimeout(() => {
      setIsLoading(false);
      if (mode === 'login') {
        toast.success(`Welcome back, ${email}!`);
      } else {
        toast.success(`Account created for ${email}!`);
      }
      onSuccess(email);
      onClose();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs animate-in fade-in duration-150">
      <Card className="w-full max-w-sm shadow-xl border-border">
        <CardHeader className="relative pb-3">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-muted-foreground hover:text-foreground p-1 rounded-md transition-colors"
            aria-label="Close dialog"
          >
            <X className="h-4 w-4" />
          </button>
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary text-primary-foreground">
              {mode === 'login' ? <LogIn className="h-3.5 w-3.5" /> : <UserPlus className="h-3.5 w-3.5" />}
            </div>
            <CardTitle className="text-base">
              {mode === 'login' ? 'Sign In to Castor' : 'Create Operator Account'}
            </CardTitle>
          </div>
          <CardDescription className="text-xs">
            {mode === 'login'
              ? 'Enter your credentials to access your storage buckets and S3 keypairs.'
              : 'Register a new identity on this Castor cluster.'}
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-foreground">Email or Username</label>
              <input
                type="text"
                placeholder="admin@castor.local"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-foreground">Password</label>
              <input
                type="password"
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                required
              />
            </div>

            <Button type="submit" disabled={isLoading} className="w-full text-xs">
              {isLoading ? (
                'Authenticating...'
              ) : mode === 'login' ? (
                'Sign In'
              ) : (
                'Register Account'
              )}
            </Button>

            <div className="text-center pt-2 border-t border-border">
              {mode === 'login' ? (
                <p className="text-xs text-muted-foreground">
                  Don't have an account?{' '}
                  <button
                    type="button"
                    onClick={() => onSwitchMode('register')}
                    className="text-primary hover:underline font-medium"
                  >
                    Register
                  </button>
                </p>
              ) : (
                <p className="text-xs text-muted-foreground">
                  Already have an account?{' '}
                  <button
                    type="button"
                    onClick={() => onSwitchMode('login')}
                    className="text-primary hover:underline font-medium"
                  >
                    Sign In
                  </button>
                </p>
              )}
            </div>

            <div className="flex items-center justify-center gap-1.5 text-[11px] text-muted-foreground font-mono">
              <ShieldCheck className="h-3 w-3 text-green-500" />
              <span>BFF Session Auth (:9001)</span>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
