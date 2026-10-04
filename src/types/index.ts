/**
 * Castor System Types & API Response Models
 */

export type NodeHealthStatus = 'HEALTHY' | 'DEGRADED' | 'OFFLINE';

export interface User {
  id: string;
  email: string;
  role: string;
}

export interface S3Credential {
  id: string;
  accessKeyId: string;
  createdAt: string;
  status: 'ACTIVE' | 'REVOKED';
}

export interface CreateKeyResponse {
  accessKeyId: string;
  secretAccessKey: string;
}

export interface NodeCapacity {
  nodeId: string;
  grpcAddress: string;
  totalBytes: number;
  freeBytes: number;
  freeRatio: number;
  status: NodeHealthStatus;
}

export interface ClusterHealthResponse {
  raftLeader: string;
  term: number;
  commitIndex: number;
  totalNodes: number;
  healthyNodes: number;
  nodes: NodeCapacity[];
}

export interface Bucket {
  name: string;
  creationDate: string;
  ownerId?: string;
  objectCount?: number;
  totalSizeBytes?: number;
}

export interface ObjectItem {
  key: string;
  size: number;
  etag: string;
  lastModified: string;
  isFolder?: boolean;
}

export interface ScrubStatus {
  running: boolean;
  progressRatio: number;
  chunksVerified: number;
  corruptionsFound: number;
  lastCompletedAt: string | null;
  cursorPosition: string;
}

export interface PresignRequest {
  bucket: string;
  key: string;
  method: 'GET' | 'PUT';
  expiresIn: number;
}

export interface PresignResponse {
  presignedUrl: string;
  expiresAt: string;
}
