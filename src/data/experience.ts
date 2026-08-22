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
    period: '2023 – 2024',
    location: 'Singapore',
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
