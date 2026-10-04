/**
 * Castor BFF (:9001) and Admin API endpoints matching docs/api.md specifications.
 */
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/api/auth/login',
    LOGOUT: '/api/auth/logout',
    KEYS: '/api/auth/keys',
    REVOKE_KEY: (id: string) => `/api/auth/keys/${encodeURIComponent(id)}`,
  },
  CLUSTER: {
    HEALTH: '/api/cluster/health',
    NODES: '/admin/nodes',
    RAFT_STATUS: '/admin/raft/status',
    SCRUB_STATUS: '/admin/scrub/status',
    TRIGGER_SCRUB: '/admin/scrub/trigger',
    TRIGGER_GC: '/admin/gc',
  },
  STORAGE: {
    BUCKETS: '/api/buckets',
    BUCKET_DETAIL: (bucket: string) => `/api/buckets/${encodeURIComponent(bucket)}`,
    UPLOAD_FILE: (bucket: string) => `/api/files/upload?bucket=${encodeURIComponent(bucket)}`,
    DOWNLOAD_FILE: (bucket: string, key: string) =>
      `/api/files/download?bucket=${encodeURIComponent(bucket)}&key=${encodeURIComponent(key)}`,
    PRESIGN: '/api/files/presign',
  },
} as const;
