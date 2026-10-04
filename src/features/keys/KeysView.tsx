import { useState } from 'react';
import { KeyRound, Plus, Trash2, ShieldAlert, Terminal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CopyButton } from '@/components/shared/copy-button';
import { S3Credential } from '@/types';

export function KeysView() {
  const [keys, setKeys] = useState<S3Credential[]>([
    {
      id: 'cred-1',
      accessKeyId: 'AKIA_CASTOR_7F83B165',
      createdAt: '2026-10-04T12:00:00Z',
      status: 'ACTIVE',
    },
  ]);

  const [newKey, setNewKey] = useState<{ accessKeyId: string; secretAccessKey: string } | null>(null);

  const handleGenerateKey = () => {
    const randomHex = () => Math.random().toString(36).substring(2, 10).toUpperCase();
    const generated = {
      accessKeyId: `AKIA_CASTOR_${randomHex()}${randomHex()}`,
      secretAccessKey: `sec_${randomHex()}${randomHex()}${randomHex()}${randomHex()}`,
    };

    setNewKey(generated);
    setKeys((prev) => [
      {
        id: `cred-${Date.now()}`,
        accessKeyId: generated.accessKeyId,
        createdAt: new Date().toISOString(),
        status: 'ACTIVE',
      },
      ...prev,
    ]);
  };

  const handleRevoke = (id: string) => {
    setKeys((prev) => prev.filter((k) => k.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* Header action */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-foreground">S3 Access Credentials</h2>
          <p className="text-xs text-muted-foreground">
            Manage Amazon SigV4 API keypairs for AWS CLI, Boto3, Rclone, and SDK integrations.
          </p>
        </div>
        <Button onClick={handleGenerateKey} size="sm" className="gap-2">
          <Plus className="h-4 w-4" />
          Generate Keypair
        </Button>
      </div>

      {/* New Key Alert Banner (if generated) */}
      {newKey && (
        <Card className="border-blue-500/30 bg-blue-500/5">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-blue-400">
                <ShieldAlert className="h-4 w-4" />
                <CardTitle className="text-sm">New Credentials Generated</CardTitle>
              </div>
              <Button variant="ghost" size="sm" onClick={() => setNewKey(null)} className="h-7 text-xs">
                Dismiss
              </Button>
            </div>
            <CardDescription className="text-xs text-blue-300/80">
              Save your secret access key immediately. For security, Castor does not store raw secrets in plaintext.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 pt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-md border border-border bg-surface p-3">
                <span className="text-xs text-muted-foreground font-medium">Access Key ID</span>
                <div className="mt-1 flex items-center justify-between font-mono text-xs text-foreground">
                  <span>{newKey.accessKeyId}</span>
                  <CopyButton value={newKey.accessKeyId} label="Access Key ID copied" />
                </div>
              </div>
              <div className="rounded-md border border-border bg-surface p-3">
                <span className="text-xs text-muted-foreground font-medium">Secret Access Key</span>
                <div className="mt-1 flex items-center justify-between font-mono text-xs text-foreground">
                  <span>{newKey.secretAccessKey}</span>
                  <CopyButton value={newKey.secretAccessKey} label="Secret Access Key copied" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Active Keys Table */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm">Active Keypairs</CardTitle>
          <CardDescription className="text-xs">
            Keys have full access to buckets and objects owned by your account.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-border bg-muted/40 font-medium text-muted-foreground">
                <tr>
                  <th className="py-2.5 px-4">Access Key ID</th>
                  <th className="py-2.5 px-4">Created Date</th>
                  <th className="py-2.5 px-4">Status</th>
                  <th className="py-2.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {keys.map((k) => (
                  <tr key={k.id} className="hover:bg-muted/30 transition-colors">
                    <td className="py-3 px-4 font-mono font-medium text-foreground">
                      <div className="flex items-center gap-2">
                        <KeyRound className="h-3.5 w-3.5 text-muted-foreground" />
                        <span>{k.accessKeyId}</span>
                        <CopyButton value={k.accessKeyId} label="Access Key ID copied" />
                      </div>
                    </td>
                    <td className="py-3 px-4 text-muted-foreground">
                      {new Date(k.createdAt).toLocaleDateString(undefined, {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </td>
                    <td className="py-3 px-4">
                      <Badge variant="healthy" className="text-[11px] py-0 px-2 font-mono">
                        {k.status}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRevoke(k.id)}
                        className="h-7 text-xs text-destructive hover:bg-destructive/10"
                      >
                        <Trash2 className="mr-1.5 h-3.5 w-3.5" />
                        Revoke
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Developer Snippet Card */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <Terminal className="h-4 w-4 text-primary" />
            <CardTitle className="text-sm">AWS CLI Quickstart</CardTitle>
          </div>
          <CardDescription className="text-xs">
            Run these commands in your shell to point your standard AWS CLI directly to this Castor cluster.
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-0">
          <pre className="rounded-md border border-border bg-muted/50 p-4 font-mono text-xs text-foreground overflow-x-auto">
{`# 1. Configure S3 endpoint and credentials
export AWS_ACCESS_KEY_ID=${keys[0]?.accessKeyId || 'AKIA_CASTOR_EXAMPLE'}
export AWS_SECRET_ACCESS_KEY=<YOUR_SECRET_KEY>
export S3_ENDPOINT=http://localhost:9000

# 2. List buckets
aws --endpoint-url=$S3_ENDPOINT s3 ls

# 3. Upload a file
aws --endpoint-url=$S3_ENDPOINT s3 cp ./archive.tar.gz s3://my-bucket/archive.tar.gz`}
          </pre>
        </CardContent>
      </Card>
    </div>
  );
}
