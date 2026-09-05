export interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  location: string;
  contract: string;
  summary: string;
  responsibilities: string[];
  skills: string[];
  badge?: string;
}

export const experienceItems: ExperienceItem[] = [
  {
    company: 'Huawei Technologies',
    role: 'Network Security Engineer',
    period: '2025',
    location: 'Changi Business Park, Singapore',
    contract: 'Full-time',
    summary:
      'Commissioned, secured, and maintained high-availability data center infrastructure, NFVI virtualization platforms, and core enterprise network architectures.',
    responsibilities: [
      'Installed, commissioned, and configured high-density server hardware and Network Functions Virtualization Infrastructure (NFVI) virtualization layers.',
      'Executed system security hardening and OS patch management on Huawei server platforms based on VAPT feedback and CIS Controls best practices.',
      'Diagnosed and resolved complex Layer 2 and Layer 3 routing and switching connectivity issues across enterprise network environments.',
      'Developed custom Bash and Python scripts for operational task automation, data analysis, and technical reporting.',
      'Supervised on-site contractors across physical procurement, rack cable management, and facility maintenance.',
      'Served as a multilingual liaison between L2/L3 technical support teams and external clients to resolve operational roadblocks.',
      'Authored Standard Operating Procedures (SOPs) and organized complete documentation frameworks for User Acceptance Testing (UAT).',
      'Contributed to campus recruitment drives and Corporate Social Responsibility (CSR) events.',
    ],
    skills: [
      'Python',
      'Bash',
      'NFVI',
      'Virtualization',
      'Routing & Switching (L2/L3)',
      'System Hardening',
      'VAPT',
      'CIS Controls',
      'Huawei Kunpeng & Ascend',
      'Enterprise Storage',
      'Firewalls & Security Gateways',
      'Project Management',
    ],
    badge: 'Data Center Infrastructure',
  },
  {
    company: 'Espressif Systems (Czechia) s.r.o.',
    role: 'Software Engineer (Intern) — Board Support Package (BSP)',
    period: '2024',
    location: 'Brno, Czechia',
    contract: 'Internship',
    summary:
      'Engineered open-source developer tooling, hardware abstraction layers, and board support packages for ESP32 microcontrollers.',
    responsibilities: [
      'Developed and maintained Board Support Packages (BSP) for ESP32 SoC architectures in C and C++.',
      'Authored automated test fixtures and diagnostic validation scripts in Python to verify peripheral interfaces (I2C, SPI, UART).',
      'Contributed to upstream open-source embedded software repositories, refining API ergonomics and documentation.',
    ],
    skills: ['C', 'C++', 'Python', 'ESP-IDF', 'FreeRTOS', 'Linux', 'Git', 'Hardware Debugging'],
    badge: 'Embedded Systems',
  },
  {
    company: 'Espressif Systems (Singapore) Pte. Ltd.',
    role: 'Software Engineer (Intern) — ESP-IDF Development',
    period: '2023',
    location: 'One North, Singapore',
    contract: 'Internship',
    summary:
      'Developed IoT customer solutions, networking protocol integrations, and low-level firmware on ESP-IDF.',
    responsibilities: [
      'Engineered customer-facing IoT applications leveraging ESP-IDF networking stacks (Wi-Fi, BLE, TCP/IP, MQTT).',
      'Optimized memory footprints and firmware execution timing on constrained microcontroller targets.',
      'Collaborated closely with field application engineers to troubleshoot complex wireless communication and power management issues.',
    ],
    skills: ['C', 'C++', 'ESP-IDF', 'Networking Protocols', 'TCP/IP', 'Wi-Fi', 'BLE', 'Python'],
    badge: 'IoT & Firmware',
  },
];

export default experienceItems;
