export interface EducationItem {
  institution: string;
  degree: string;
  period: string;
  location: string;
  summary: string;
  highlights: string[];
  coursework: string[];
  badge?: string;
}

export const educationItems: EducationItem[] = [
  {
    institution: 'National University of Singapore (NUS)',
    degree: 'Bachelor of Engineering (Honours) in Computer Engineering',
    period: '2021 – 2025',
    location: 'Singapore',
    summary:
      'Interdisciplinary engineering degree jointly hosted by College of Design & Engineering and School of Computing.',
    highlights: [
      'Second Major in Management',
      'Specialization in Internet of Things (IoT)',
      'Specialization in Robotics',
    ],
    coursework: [
      'Computer Networks (EE4204)',
      'Computer Architecture (CG3207)',
      'Digital Design & FPGA (EE2026)',
      'Introduction to Machine Learning (EE2211)',
      'Data Structures & Algorithms (CS2040C)',
      'Software Engineering & OOP (CS2113)',
      'Data Science for IoT (EE4211)',
      'Robot Perception & Mechanics (EE4309, ME4245)',
    ],
    badge: 'Primary Degree',
  },
  {
    institution: 'Technical University of Denmark (DTU)',
    degree: 'Student Exchange Programme',
    period: 'Spring 2024',
    location: 'Lyngby, Denmark',
    summary:
      'Semester-long international academic exchange focusing on advanced computing, reinforcement learning, and VLSI design.',
    highlights: [
      'Reinforcement Learning & Autonomous Decision Making',
      'VLSI & Integrated Circuit Design',
      'Sustainable Economics & Systems',
    ],
    coursework: ['Reinforcement Learning', 'VLSI Design', 'Sustainable Economics'],
    badge: 'International Exchange',
  },
  {
    institution: 'Ridge View Residential College (RVRC)',
    degree: 'Residential College Programme',
    period: '2021 – 2023',
    location: 'NUS, Singapore',
    summary:
      'Living-learning programme focused on sustainability, workplace communications, and community engagement.',
    highlights: [
      'Sustainability & Climate Resilience Studies',
      'Workplace and Interdisciplinary Communications',
      'Community Action Projects',
    ],
    coursework: ['Exploring Sense of Place', 'How in the World Do We Get Along?', 'Rewilding & Conservation'],
    badge: 'Residential Fellowship',
  },
];

export default educationItems;
