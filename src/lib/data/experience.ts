import Assets from './assets';
import { getSkills } from './skills';
import { ContractType, type Experience } from './types';

const title = 'Experience';

const items: Array<Experience> = [
	{
		slug: 'open-sourcer',
		company: 'Espressif Systems (Czechia) s.r.o.',
		description: 'Creating awesome tools for developers.',
		contract: ContractType.Internship,
		type: 'Software Development',
		location: 'Brno, Czechia',
		period: { from: new Date() },
		skills: getSkills('C', 'Cpp', 'python', 'esp-idf'),
		name: 'Software Engineer (Intern)',
		color: 'red',
		links: [],
		logo: Assets.ESP,
		shortDescription: 'Board Support Package (BSP) Developer'
	},
	{
		slug: 'software-freelance',
		company: 'Espressif Systems (Singapore) Pte. Ltd.',
		description: 'Creating awesome applications for customers.',
		contract: ContractType.Internship,
		type: 'Software Development',
		location: 'One North, Singapore',
		period: { from: new Date() },
		skills: getSkills('C', 'Cpp', 'python', 'esp-idf'),
		name: 'Software Engineer (Intern)',
		color: 'red',
		links: [],
		logo: Assets.ESP,
		shortDescription: 'ESP-IDF Developer'
	},
];

const ExperienceData = { title, items };

export default ExperienceData;
