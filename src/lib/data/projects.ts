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
		slug: 'CPU Design',
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
		slug: 'Portfolio Style Analysis',
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
	}
];

const title = 'Projects';

const ProjectsData = { title, items };

export default ProjectsData;
