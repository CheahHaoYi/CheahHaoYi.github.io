import Assets from './assets';
import type { Education } from './types';
import rvrcMd from './md_education/rvrc.md?raw';
import dtuMd from './md_education/dtu.md?raw';
import nusMd from './md_education/nus.md?raw';

const title = 'Education';

const items: Array<Education> = [
	{
		degree: 'Bachelor of Engineering (Honours)',
		description: nusMd,
		location: 'Singapore',
		logo: Assets.NUS,
		name: 'National University of Singapore',
		organization: 'NUS',
		period: { from: new Date(2021, 8, 1), to: new Date(2025, 5, 1) },
		shortDescription: 'Computer Engineering',
		slug: 'National University of Singapore',
		subjects: ['ALgorithm', 'C/C++', 'Python', 'Java', 'Verilog', 'Assembly']
	},
	{
		degree: 'Exchange Programme',
		description: dtuMd,
		location: 'Denmark',
		logo: Assets.DTU,
		name: 'Techical University of Denmark',
		organization: 'DTU',
		period: { from: new Date(2024, 0, 1), to: new Date(2024, 5, 1) },
		shortDescription: 'Semester long exchange programme',
		slug: 'Danmarks Tekniske Universitet',
		subjects: ['Reinforcement Learning', 'VLSI', 'Sustainable Economics']
	},
	{
		degree: 'Residential College Programme',
		description: rvrcMd,
		location: 'Singapore',
		logo: Assets.RVRC,
		name: 'Ridge View Residential College',
		organization: 'RVRC',
		period: { from: new Date(2021, 8, 1), to: new Date(2025, 5, 1) },
		shortDescription: 'Sustainability Studies',
		slug: 'Ridge View Residential College',
		subjects: ['Cultures and Connection', 'Communities and Engagement', 'Singapore Studies', 'Sustainability']
	}
];

const EducationData = { title, items };

export default EducationData;
