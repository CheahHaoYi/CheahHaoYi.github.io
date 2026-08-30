import type { IOSColor } from '@cheahhaoyi/site-kit';

export interface KnowledgeArea {
  name: string;
  slug: string;
  path: string;
  description: string;
  tags: string[];
  status: 'published' | 'planned';
  badge?: string;
  iosColor?: IOSColor;
  featured?: boolean;
}

export const knowledgeAreas: KnowledgeArea[] = [
  {
    name: 'CISSP (Certified Information Systems Security Professional)',
    slug: 'cissp',
    path: '/cissp',
    description:
      'Enterprise security architecture, cryptographic principles, defense-in-depth engineering, and security risk governance across all 8 (ISC)² domains.',
    tags: ['Security Architecture', 'Cryptography', 'Risk Management', 'Access Control', 'Network Security'],
    status: 'published',
    badge: 'Security Architecture',
    iosColor: 'purple',
    featured: true,
  },
  {
    name: 'CCNA (Cisco Certified Network Associate)',
    slug: 'ccna',
    path: '/ccna',
    description:
      'Enterprise IP connectivity, dynamic routing protocols (OSPF, EIGRP, BGP fundamentals), switching architectures, VLAN segmentation, and network automation.',
    tags: ['Enterprise Routing', 'Switching', 'OSPF', 'BGP', 'Subnetting', 'IP Services'],
    status: 'published',
    badge: 'Enterprise Networking',
    iosColor: 'blue',
    featured: true,
  },
  {
    name: 'RHCSA (Red Hat Certified System Administrator)',
    slug: 'rhcsa',
    path: '/rhcsa',
    description:
      'Hardened enterprise Linux administration, storage configuration (LVM / Stratis), systemd service management, firewalling, and mandatory access control with SELinux.',
    tags: ['RHEL / Linux', 'SELinux', 'Storage / LVM', 'Systemd', 'Process Isolation'],
    status: 'published',
    badge: 'Linux Systems',
    iosColor: 'mint',
    featured: true,
  },
  {
    name: 'System Design & Distributed Architecture',
    slug: 'systemdesign',
    path: '/systemdesign',
    description:
      'Scalable distributed systems, high availability patterns, database partitioning, consensus protocols, and microservices architecture.',
    tags: ['Distributed Systems', 'Microservices', 'Scalability', 'High Availability', 'Database Sharding'],
    status: 'published',
    badge: 'System Design',
    iosColor: 'orange',
    featured: true,
  },
  {
    name: 'Leetcode solutions & algorithmic problem solving',
    slug: 'leetcode',
    path: '/leetcode',
    description:
      'Solutions to popular Leetcode problems with detailed explanations and algorithmic approaches.',
    tags: ['Algorithms', 'Data Structures', 'Problem Solving', 'Coding Interview'],
    status: 'published',
    badge: 'Leetcode',
    iosColor: 'green',
    featured: true,
  },
  {
    name: 'AI Security & Adversarial Defense',
    slug: 'ai-security',
    path: '/projects#ai-security',
    description:
      'Applying rigorous network defense and systems engineering principles to securing AI inference pipelines, defending against prompt injection, and monitoring model telemetry.',
    tags: ['Adversarial ML', 'LLM Guardrails', 'Inference Telemetry', 'Model Hardening', 'Safety'],
    status: 'published',
    badge: 'AI Defense',
    iosColor: 'indigo',
    featured: true,
  },
];

export default knowledgeAreas;
