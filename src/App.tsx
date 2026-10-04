import { useState } from 'react';
import { Header, NavTab } from '@/layouts/Header';
import { CoverView } from '@/features/home/CoverView';
import { BucketView } from '@/features/explorer/BucketView';
import { ClusterHealthView } from '@/features/health/ClusterHealthView';
import { KeysView } from '@/features/keys/KeysView';
import { AuthModal } from '@/features/auth/AuthModal';

export default function App() {
  const [currentTab, setCurrentTab] = useState<NavTab>('cover');
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const [authModal, setAuthModal] = useState<{ isOpen: boolean; mode: 'login' | 'register' }>({
    isOpen: false,
    mode: 'login',
  });

  const handleOpenAuth = (mode: 'login' | 'register') => {
    setAuthModal({ isOpen: true, mode });
  };

  const handleAuthSuccess = (email: string) => {
    setCurrentUser(email);
  };

  const handleNavigateFromCover = (view: 'explorer' | 'health' | 'keys' | 'login' | 'register') => {
    if (view === 'login' || view === 'register') {
      handleOpenAuth(view);
    } else {
      setCurrentTab(view);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col antialiased">
      {/* Global Header */}
      <Header
        activeTab={currentTab}
        onTabChange={setCurrentTab}
        currentUser={currentUser}
        onOpenAuth={handleOpenAuth}
      />

      {/* Main Content View Switcher */}
      <main className="flex-1 flex flex-col p-6 max-w-7xl mx-auto w-full">
        {currentTab === 'cover' && (
          <CoverView onNavigate={handleNavigateFromCover} />
        )}
        {currentTab === 'explorer' && <BucketView />}
        {currentTab === 'health' && <ClusterHealthView />}
        {currentTab === 'keys' && <KeysView />}
      </main>

      {/* Auth Modal (Login / Register) */}
      <AuthModal
        mode={authModal.mode}
        isOpen={authModal.isOpen}
        onClose={() => setAuthModal((prev) => ({ ...prev, isOpen: false }))}
        onSuccess={handleAuthSuccess}
        onSwitchMode={(newMode) => setAuthModal({ isOpen: true, mode: newMode })}
      />

      {/* Global Footer */}
      <footer className="border-t border-border py-4 px-6 text-center text-xs text-muted-foreground flex flex-col sm:flex-row items-center justify-between gap-2 max-w-7xl mx-auto w-full">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-foreground">Castor UI</span>
          <span>•</span>
          <span>Stateless Browser BFF on Port :9001</span>
        </div>
        <div className="font-mono text-[11px]">
          Linearizable Metadata (Raft) • Fixed 4MB Chunking (SHA-256)
        </div>
      </footer>
    </div>
  );
}
