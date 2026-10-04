import { useState } from 'react';
import { HardDrive, Plus, Folder, File, Download, Share2, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CopyButton } from '@/components/shared/copy-button';
import { formatBytes } from '@/lib/utils';
import { INITIAL_OBJECTS } from '@/mocks/initialData';
import { ObjectItem } from '@/types';
import { toast } from 'sonner';

export function BucketView() {
  const [currentBucket, setCurrentBucket] = useState('media-archive');
  const [objects, setObjects] = useState<ObjectItem[]>(INITIAL_OBJECTS);

  const handleDelete = (key: string) => {
    setObjects((prev) => prev.filter((o) => o.key !== key));
    toast.success(`Deleted ${key}`);
  };

  return (
    <div className="space-y-6">
      {/* Top Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold tracking-tight text-foreground">Storage Explorer</h2>
            <Badge variant="outline" className="font-mono text-xs">
              s3://{currentBucket}
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground">
            Browse objects, navigate folder prefixes, and stream files via 4MB content-addressed chunks.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => toast.info('New folder modal will open')}
            className="text-xs"
          >
            <Folder className="mr-1.5 h-3.5 w-3.5" />
            New Folder
          </Button>
          <Button 
            size="sm" 
            onClick={() => toast.info('In-process 4MB streaming upload bridge active')}
            className="text-xs"
          >
            <Plus className="mr-1.5 h-3.5 w-3.5" />
            Upload File
          </Button>
        </div>
      </div>

      {/* Bucket Breadcrumbs & Selector */}
      <div className="flex items-center gap-2 text-xs font-mono border-b border-border pb-3 text-muted-foreground">
        <HardDrive className="h-3.5 w-3.5 text-foreground" />
        <span className="hover:text-foreground cursor-pointer" onClick={() => setCurrentBucket('media-archive')}>
          {currentBucket}
        </span>
        <span>/</span>
        <span className="text-foreground">root</span>
      </div>

      {/* Files Table */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm">Objects ({objects.length})</CardTitle>
          <CardDescription className="text-xs">
            Inline deduplicated against BadgerDB metadata; replicated across 3 data-svc nodes.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-border bg-muted/40 font-medium text-muted-foreground">
                <tr>
                  <th className="py-2.5 px-4">Name / Key</th>
                  <th className="py-2.5 px-4">Size</th>
                  <th className="py-2.5 px-4">SHA-256 ETag</th>
                  <th className="py-2.5 px-4">Last Modified</th>
                  <th className="py-2.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {objects.map((file) => (
                  <tr key={file.key} className="hover:bg-muted/30 transition-colors">
                    <td className="py-3 px-4 font-medium text-foreground">
                      <div className="flex items-center gap-2 font-mono">
                        <File className="h-3.5 w-3.5 text-blue-500" />
                        <span>{file.key}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 font-mono text-muted-foreground">
                      {formatBytes(file.size)}
                    </td>
                    <td className="py-3 px-4 font-mono text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <span>{file.etag.substring(0, 12)}...</span>
                        <CopyButton value={file.etag} label="ETag copied" />
                      </div>
                    </td>
                    <td className="py-3 px-4 text-muted-foreground">
                      {new Date(file.lastModified).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7"
                          onClick={() => toast.success(`Downloading ${file.key}`)}
                          title="Download file"
                        >
                          <Download className="h-3.5 w-3.5 text-muted-foreground" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7"
                          onClick={() => toast.success(`Generated presigned URL for ${file.key}`)}
                          title="Generate Presigned URL"
                        >
                          <Share2 className="h-3.5 w-3.5 text-muted-foreground" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 text-destructive hover:bg-destructive/10"
                          onClick={() => handleDelete(file.key)}
                          title="Delete file"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
