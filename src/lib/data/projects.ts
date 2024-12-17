import Assets from './assets';
import { getSkills } from './skills';
import type { Project } from './types';

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
	}
];

const title = 'Projects';

const ProjectsData = { title, items };

export default ProjectsData;
