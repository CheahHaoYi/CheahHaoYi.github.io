import Assets from './assets';
import { getSkills } from './skills';
import type { Project } from './types';
import projPortfolioMd from './md_project/Portfolio_Style_Analysis.md?raw';
import projCarparkPredMd from './md_project/Carpark_Availability_Prediction.md?raw';

const items: Array<Project> = [
	{
		slug: 'portfolio-website',
		color: '#5e95e3',
		description:
			'My own portfolio website built with SvelteKit, TypeScript, and Tailwind CSS. Credits to Riadh Adrani for the template, planning to expand on the template',
		shortDescription:
			'My own portfolio website built with SvelteKit, TypeScript, and Tailwind CSS.',
		links: [
			{ to: 'https://github.com/CheahHaoYi', label: 'My GitHub' },
			{ to: 'https://github.com/CheahHaoYi/CheahHaoYi.github.io', label: 'Repository' },

		],
		logo: Assets.Svelte,
		name: 'Portfolio Website',
		period: {
			from: new Date(2024, 12, 10)
		},
		skills: getSkills('svelte', 'ts', 'html', 'css'),
		type: 'Web Development'
	},
	{
		slug: 'riscv-cpu-design',
		color: '#0047ab',
		description:
			'Implementation of a RISC-V processor supporting 32 bit instructions. \
			The processor is implemented in Verilog and tested on an FPGA board. \
			The processor supports a subset of the RISC-V ISA and is capable of running simple programs. \
			The source code cannot be released publicly due to academic integrity reasons.',
		shortDescription:
			'Implementation of a RISC-V processor supporting 32 bit instructions.',
		links: [{ to: 'https://github.com/NUS-CG3207/labs', label: 'Skeleton Code' }],
		logo: Assets.RISCV,
		name: 'RISC-V CPU Design',
		period: {
			from: new Date(2024, 8, 1), to: new Date(2024, 11, 30)
		},
		skills: getSkills('verilog', 'python'),
		type: 'CPU Architecture',
	},
	{
		slug: 'portfolio-style-analysis',
		color: '#a16125',
		description: projPortfolioMd,
		shortDescription:
			'Implementation of Sharpe Returns Based Style Analysis in Python using Data from Yahoo Finance',
		links: [{ to: 'https://cheahhaoyi.github.io/projects/Portfolio%20Style%20Analysis', label: 'Portfolio Website' }],
		logo: Assets.Python,
		name: 'Portfolio Style Analysis',
		period: {
			from: new Date(2024, 8, 1), to: new Date(2024, 11, 30)
		},
		skills: getSkills('matplotlib', 'python', 'numpy'),
		type: 'Finance',
	},
	{
		slug: 'carpark-available-prediction',
		color: '#c26ad4',
		description: projCarparkPredMd,
		shortDescription:
			'Prediction of Carpark Availability in Singapore using Machine Learning techniques',
		links: [{ to: 'https://cheahhaoyi.github.io/projects/carpark-available-prediction', label: 'Portfolio Website' }],
		logo: Assets.Python,
		name: 'Singapore Carpark Availability Prediction',
		period: {
			from: new Date(2024, 8, 1), to: new Date(2024, 11, 30)
		},
		skills: getSkills('matplotlib', 'python', 'numpy', 'pandas', 'sklearn'),
		type: 'Data Science',
	},
	{
		slug: 'yamom',
		color: '#b8161e',
		description: 'Yet Another Module Organiser / Manager offers the latest cutting edge features for NUS students favouring efficiency and productivity. \
			Schedule your timetable without your fingers leaving your keyboard.',
		shortDescription:
			'CLI for managing modules in NUS',
		links: [{ to: 'https://github.com/AY2223S1-CS2113-F11-3/tp', label: 'Github Repo' },
			{ to: 'https://ay2223s1-cs2113-f11-3.github.io/tp/DeveloperGuide.html', label: 'Developer Guide' },
			{ to: 'https://ay2223s1-cs2113-f11-3.github.io/tp/UserGuide.html', label: 'User Guide' }
		],
		logo: Assets.Java,
		name: 'Yet Another Module Organiser / Manager',
		period: {
			from: new Date(2022, 8, 1), to: new Date(2022, 11, 30)
		},
		skills: getSkills('java'),
		type: 'Software Development',
	},
];

const title = 'Projects';

const ProjectsData = { title, items };

export default ProjectsData;
