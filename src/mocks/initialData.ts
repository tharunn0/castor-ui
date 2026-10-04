import { ClusterHealthResponse, S3Credential, ObjectItem, NodeCapacity } from '@/types';

/**
 * Static baseline cluster endpoints matching docs/architecture.md port allocation.
 */
export const CLUSTER_TOPOLOGY = [
  {
    name: 'S3 REST Frontend',
    port: 9000,
    protocol: 'HTTP',
    engine: 'versitygw (SigV4, Path-Style)',
    url: 'http://localhost:9000',
  },
  {
    name: 'Headless BFF API',
    port: 9001,
    protocol: 'HTTP/JSON',
    engine: 'gateway-svc (CORS, JWT Sessions)',
    url: 'http://localhost:9001',
  },
  {
    name: 'Identity & Auth Provider',
    port: 9095,
    protocol: 'HTTP',
    engine: 'auth-svc (PostgreSQL / SQLite)',
    url: 'http://localhost:9095',
  },
  {
    name: 'Metadata Consensus Cluster',
    port: '9091-9093',
    protocol: 'gRPC / TCP',
    engine: 'metadata-svc (3-node Raft + BadgerDB)',
    url: 'tcp://localhost:9091',
  },
  {
    name: 'Content-Addressed Data Nodes',
    port: '9101-9103',
    protocol: 'gRPC',
    engine: 'data-svc (4MB Chunks, W=2 / R=3)',
    url: 'grpc://localhost:9101',
  },
] as const;

/**
 * Baseline storage nodes capacity telemetry.
 */
export const INITIAL_DATA_NODES: NodeCapacity[] = [
  {
    nodeId: 'data-svc-1',
    grpcAddress: '127.0.0.1:9101',
    totalBytes: 50 * 1024 * 1024 * 1024, // 50 GB
    freeBytes: 36 * 1024 * 1024 * 1024,  // 36 GB free
    freeRatio: 0.72,
    status: 'HEALTHY',
  },
  {
    nodeId: 'data-svc-2',
    grpcAddress: '127.0.0.1:9102',
    totalBytes: 50 * 1024 * 1024 * 1024,
    freeBytes: 35.8 * 1024 * 1024 * 1024,
    freeRatio: 0.716,
    status: 'HEALTHY',
  },
  {
    nodeId: 'data-svc-3',
    grpcAddress: '127.0.0.1:9103',
    totalBytes: 50 * 1024 * 1024 * 1024,
    freeBytes: 36.2 * 1024 * 1024 * 1024,
    freeRatio: 0.724,
    status: 'HEALTHY',
  },
];

/**
 * Baseline Raft consensus and cluster health summary.
 */
export const INITIAL_CLUSTER_HEALTH: ClusterHealthResponse = {
  raftLeader: 'metadata-svc-1 (:9091)',
  term: 4,
  commitIndex: 14208,
  totalNodes: 3,
  healthyNodes: 3,
  nodes: INITIAL_DATA_NODES,
};

/**
 * Baseline S3 credentials for local testing.
 */
export const INITIAL_S3_CREDENTIALS: S3Credential[] = [
  {
    id: 'cred-bootstrap',
    accessKeyId: 'AKIA_CASTOR_BOOTSTRAP7F',
    createdAt: '2026-10-04T12:00:00Z',
    status: 'ACTIVE',
  },
];

/**
 * Baseline objects for storage explorer.
 */
export const INITIAL_OBJECTS: ObjectItem[] = [
  {
    key: 'recordings/2026/backup_segment_01.mp4',
    size: 4 * 1024 * 1024, // 4 MB
    etag: '7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069',
    lastModified: '2026-10-04T16:00:00Z',
  },
  {
    key: 'recordings/2026/backup_segment_02.mp4',
    size: 4 * 1024 * 1024,
    etag: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
    lastModified: '2026-10-04T16:05:00Z',
  },
  {
    key: 'manifests/cluster_state.json',
    size: 14540, // 14.2 KB
    etag: 'a1b2c3d4e5f60718293a4b5c6d7e8f90112233445566778899aabbccddeeff00',
    lastModified: '2026-10-04T15:30:00Z',
  },
];
