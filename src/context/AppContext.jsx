import { createContext } from 'react';

export const AppContext = createContext();

// 1. We define the Checks (similar to actual AWS Trusted Advisor checks)
export const INITIAL_CHECKS = [
  { 
    id: 'chk-01', checkName: 'Unassociated Elastic IP Addresses', category: 'Cost Optimization', 
    severity: 'Medium', cost: 900, impact: 5, status: 'open',
    resourceId: 'eipalloc-0abcd1234',
    description: 'Elastic IP addresses that are allocated but not attached to a running instance.',
    whyItMatters: 'AWS charges for Elastic IPs that are allocated to your account but not associated with a running resource to ensure efficient use of the public IPv4 pool.',
    bestPractice: 'Release the unassociated Elastic IP address back to AWS if it is no longer needed.'
  },
  { 
    id: 'chk-02', checkName: 'Low Utilization Amazon EC2 Instances', category: 'Cost Optimization', 
    severity: 'High', cost: 4500, impact: 15, status: 'open',
    resourceId: 'i-098765432',
    description: 'Checks for EC2 instances that have 10% or less daily CPU utilization and 5 MB or less network I/O.',
    whyItMatters: 'Idle compute resources generate continuous hourly billing without providing business value.',
    bestPractice: 'Stop or terminate the idle instance. Consider using AWS Auto Scaling to dynamically provision instances.'
  },
  { 
    id: 'chk-03', checkName: 'Amazon S3 Bucket Permissions', category: 'Security', 
    severity: 'Critical', cost: 0, impact: 25, status: 'open',
    resourceId: 'bucket-public-prod',
    description: 'Checks S3 buckets for open access permissions allowing public read/write.',
    whyItMatters: 'Public buckets expose sensitive data to the internet, risking catastrophic data breaches and compliance violations.',
    bestPractice: 'Enable "Block Public Access" at the bucket or account level unless explicitly required for web hosting.'
  },
  { 
    id: 'chk-04', checkName: 'Security Groups - Specific Ports Unrestricted', category: 'Security', 
    severity: 'High', cost: 0, impact: 15, status: 'open',
    resourceId: 'sg-012345 (SSH)',
    description: 'Checks security groups for rules that allow unrestricted access (0.0.0.0/0) to specific ports.',
    whyItMatters: 'Leaving ports like 22 (SSH) or 3389 (RDP) open to the internet allows malicious actors to brute-force access to your servers.',
    bestPractice: 'Restrict access to trusted IP addresses or use AWS Systems Manager Session Manager for secure access.'
  },
  { 
    id: 'chk-05', checkName: 'Amazon RDS Multi-AZ', category: 'Fault Tolerance', 
    severity: 'High', cost: 0, impact: 10, status: 'open',
    resourceId: 'db-prod-main',
    description: 'Checks for DB instances deployed in a single Availability Zone.',
    whyItMatters: 'Single-AZ deployments have a single point of failure. If the AZ goes down, your application loses database access.',
    bestPractice: 'Modify the DB instance to be a Multi-AZ deployment for automatic failover and high availability.'
  },
  { 
    id: 'chk-06', checkName: 'Service Limits - EC2 Instances', category: 'Service Limits', 
    severity: 'Medium', cost: 0, impact: 5, status: 'open',
    resourceId: 'Quota: Standard Instances',
    description: 'Checks usage against the Amazon EC2 active instance limit.',
    whyItMatters: 'Reaching your service limit prevents you from launching new instances, which can block auto-scaling during traffic spikes.',
    bestPractice: 'Request a quota increase through the AWS Service Quotas console before reaching 100% utilization.'
  }
];

export const MOCK_PASSED_CHECKS = 34; // Simulating that TA checked 40 things, 34 are fine.