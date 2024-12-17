import Assets from './assets';
import type { Education } from './types';

const title = 'Education';

const items: Array<Education> = [
	{
		degree: 'Bachelor of Engineering, Computer Engineering',
		description: 'Second Major in Management, Specialization in IoT and Robotics',
		location: 'Singapore',
		logo: Assets.NUS,
		name: 'National University of Singapore',
		organization: 'NUS',
		period: { from: new Date(2020, 8, 1), to: new Date(2025, 5, 1) },
		shortDescription: 'Bachelor Degree',
		slug: 'National University of Singapore',
		subjects: ['ALgorithm', 'C/C++', 'Python', 'Java', 'Verilog', 'Assembly']
	},
	{
		degree: 'Exchange Programme',
		description: 'Spring Semester',
		location: 'Denmark',
		logo: Assets.DTU,
		name: 'Techical University of Denmark',
		organization: 'DTU',
		period: { from: new Date(2024, 0, 1), to: new Date(2024, 5, 1) },
		shortDescription: 'Semester long exchange programme',
		slug: 'Danmarks Tekniske Universitet',
		subjects: ['Reinforcement Learning', 'VLSI', 'Sustainable Economics']
	}
];

const EducationData = { title, items };

export default EducationData;
