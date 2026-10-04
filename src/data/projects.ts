export interface Project {
  name: string;
  description: string;
  tags: string[];
  repoUrl?: string;
  demoUrl?: string;
  detailPath?: string;
  image?: string;
  featured: boolean;
  category?: 'ai-security' | 'embedded' | 'hardware' | 'web' | 'data-science' | 'software';
  badge?: string;
  date?: string;
}

export const projects: Project[] = [
  {
    name: 'Homelab',
    description:
      'A personal homelab environment for experimenting with and learning about various technologies, including cybersecurity, networking, and software development.',
    tags: ['Homelab', 'Cybersecurity', 'Networking', 'Software Development'],
    demoUrl: 'https://cheahhaoyi.github.io/homelab',
    featured: true,
    category: 'hardware',
    badge: 'Hardware / Homelab',
    date: '2026',
  },
  {
    name: 'Unified MITRE Framework Navigator',
    description:
      '(Work in Progress) A unified MITRE framework navigator and threat intelligence platform integrating ATT&CK, ATLAS, CAPEC, D3FEND and ENGAGE as a cohesive, interactive knowledge graph for cybersecurity research and analysis.',
    tags: ['MITRE', 'ATT&CK', 'ATLAS', 'CAPEC', 'D3FEND', 'ENGAGE'],
    demoUrl: 'https://cheahhaoyi.github.io/mitrall',
    featured: true,
    category: 'ai-security',
    badge: 'Cybersecurity',
    date: '2026',
  },
  {
    name: 'OSCAL Compliance Navigator',
    description:
      '(Work in Progress) Analyzing NIST SP800-53 and Singapore IM8 Reform through a unified compliance framework to automate compliance assessment.',
    tags: ['OSCAL', 'NIST SP800-53', 'IM8 Reform', 'Compliance Assessment', 'Cybersecurity'],
    demoUrl: 'https://cheahhaoyi.github.io/oscal',
    featured: true,
    category: 'ai-security',
    badge: 'Cybersecurity',
    date: '2026',
  },
  {
    name: 'AIsploitable',
    description:
      'Autonomous threat intelligence and security verification platform leveraging local Gemma models, offline MITRE ATT&CK & ATLAS RAG, and isolated Docker dual-sandboxes for empirical PoC execution.',
    tags: [
      'AI Security',
      'Local LLMs',
      'Gemma',
      'FastAPI',
      'Next.js',
      'Docker Sandbox',
      'Threat Intel RAG',
      'Python',
    ],
    repoUrl: 'https://github.com/CheahHaoYi/AIsploitable',
    detailPath: '/projects#aisploitable',
    featured: true,
    category: 'ai-security',
    badge: 'AI Security',
    date: '2026',
  },
  {
    name: 'Portfolio Website & Design System',
    description:
      'Personal multi-repo portfolio hub and design token ecosystem built with Astro 5.x, TypeScript, and the @cheahhaoyi/site-kit zero-bundle component library.',
    tags: ['Astro', 'TypeScript', 'Design Tokens', 'CSS Variables', 'Accessibility'],
    repoUrl: 'https://github.com/CheahHaoYi/CheahHaoYi.github.io',
    demoUrl: 'https://cheahhaoyi.github.io',
    featured: false,
    category: 'web',
    badge: 'Web Architecture',
    date: '2026',
  },
  {
    name: 'RISC-V 32-bit CPU Architecture',
    description:
      'Hardware implementation of a 32-bit RISC-V processor synthesized in Verilog with ALU, register file, instruction decoding, and control path tested on FPGA.',
    tags: ['Verilog', 'FPGA', 'RISC-V', 'Computer Architecture', 'Hardware'],
    repoUrl: 'https://github.com/NUS-CG3207/labs',
    featured: true,
    category: 'hardware',
    badge: 'Hardware / CPU',
    date: '2024',
  },
  {
    name: "Don't Leave Laundry Messy (DLLM IoT)",
    description:
      'Smart IoT laundry monitoring platform combining accelerometer edge sensors, ESP32 ESP-IDF firmware, and machine learning inference for real-time cycle tracking.',
    tags: ['ESP-IDF', 'C/C++', 'PyTorch', 'IoT', 'FreeRTOS', 'Sensors'],
    repoUrl: 'https://github.com/CheahHaoYi/DLLM_IoT',
    featured: true,
    category: 'embedded',
    badge: 'Embedded / IoT',
    date: '2024',
  },
  {
    name: 'Singapore Carpark Availability Prediction',
    description:
      'Machine learning model forecasting urban parking availability by ingesting live LTA Gov APIs with time-series feature engineering and regression ensemble models.',
    tags: ['Machine Learning', 'Python', 'Scikit-Learn', 'Pandas', 'Time Series'],
    demoUrl: 'https://cheahhaoyi.github.io/projects',
    featured: false,
    category: 'data-science',
    badge: 'Data Science',
    date: '2024',
  },
  {
    name: 'Sharpe Returns-Based Style Analysis',
    description:
      'Quantitative financial portfolio style analysis engine in Python implementing William Sharpe’s constrained quadratic optimization against benchmark index data.',
    tags: ['Python', 'NumPy', 'Matplotlib', 'Optimization', 'Quantitative Finance'],
    demoUrl: 'https://cheahhaoyi.github.io/projects',
    featured: false,
    category: 'data-science',
    badge: 'Quant Finance',
    date: '2024',
  },
  {
    name: 'Yet Another Module Organiser / Manager (YAMOM)',
    description:
      'Keyboard-centric CLI application and schedule solver for NUS university students designed with strict OOP architecture and automated test harnesses.',
    tags: ['Java', 'OOP', 'CLI', 'Software Engineering', 'JUnit'],
    repoUrl: 'https://github.com/AY2223S1-CS2113-F11-3/tp',
    demoUrl: 'https://ay2223s1-cs2113-f11-3.github.io/tp/UserGuide.html',
    featured: false,
    category: 'software',
    badge: 'Software Engineering',
    date: '2022',
  },
];

export default projects;
