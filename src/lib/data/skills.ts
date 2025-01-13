import type { Skill, SkillCategory } from './types';
import type { StringWithAutoComplete } from '@riadh-adrani/utils';
import { omit } from '@riadh-adrani/utils';
import Assets from './assets';
import svelteMd from './md/svelte.md?raw';

const defineSkillCategory = <S extends string>(data: SkillCategory<S>): SkillCategory<S> => data;

const categories = [
	defineSkillCategory({ name: 'Programming Languages', slug: 'pro-lang' }),
	defineSkillCategory({ name: 'Frameworks', slug: 'framework' }),
	defineSkillCategory({ name: 'Libraries', slug: 'library' }),
	defineSkillCategory({ name: 'Langauges', slug: 'lang' }),
	defineSkillCategory({ name: 'Databases', slug: 'db' }),
	defineSkillCategory({ name: 'ORMs', slug: 'orm' }),
	defineSkillCategory({ name: 'DevOps', slug: 'devops' }),
	defineSkillCategory({ name: 'Testing', slug: 'test' }),
	defineSkillCategory({ name: 'Dev Tools', slug: 'devtools' }),
	defineSkillCategory({ name: 'Markup & Style', slug: 'markup-style' }),
	defineSkillCategory({ name: 'Design', slug: 'design' }),
	defineSkillCategory({ name: 'Soft Skills', slug: 'soft' })
] as const;

const defineSkill = <S extends string>(
	skill: Omit<Skill<S>, 'category'> & {
		category?: StringWithAutoComplete<(typeof categories)[number]['slug']>;
	}
): Skill<S> => {
	const out: Skill<S> = omit(skill, 'category');

	if (skill.category) {
		out.category = categories.find((it) => it.slug === skill.category);
	}

	return out;
};

export const getSkills = (
	...slugs: Array<StringWithAutoComplete<(typeof items)[number]['slug']>>
): Array<Skill> => {
	return items.filter((it) => (slugs.length === 0 ? true : slugs.includes(it.slug)));
};

export const groupByCategory = (
	query: string
): Array<{ category: SkillCategory; items: Array<Skill> }> => {
	const out: ReturnType<typeof groupByCategory> = [];

	const others: Array<Skill> = [];

	items.forEach((item) => {
		if (query.trim() && !item.name.toLowerCase().includes(query.trim().toLowerCase())) return;

		// push to others if item does not have a category
		if (!item.category) {
			others.push(item);
			return;
		}

		// check if category exists
		let category = out.find((it) => it.category.slug === item.category?.slug);

		if (!category) {
			category = { items: [], category: item.category };

			out.push(category);
		}

		category.items.push(item);
	});

	if (others.length !== 0) {
		out.push({ category: { name: 'Others', slug: 'others' }, items: others });
	}

	return out;
};

const title = 'Skills';

const itemsProLang = [
	defineSkill({
		slug: 'js',
		color: 'yellow',
		description:
			'Some experience with JavaScript. Currently learning TypeScript and Svelte.',
		logo: Assets.JavaScript,
		name: 'Javascript',
		category: 'pro-lang'
	}),
	defineSkill({
		slug: 'ts',
		color: 'blue',
		description:
			'Using TypeScript for web development. Familiar with the basics and some advanced concepts.',
		logo: Assets.TypeScript,
		name: 'Typescript',
		category: 'pro-lang'
	}),
	defineSkill({
		slug: 'java',
		color: 'red',
		description:
			'High-level programming language. Used for Android Development, Web Development and Enterprise Applications',
		logo: Assets.Java,
		name: 'Java',
		category: 'pro-lang'
	}),
	defineSkill({
		slug: 'c',
		color: 'blue',
		description:
			'Low-level programming language. Mainly used for Embedded systems development',
		logo: Assets.C,
		name: 'C',
		category: 'pro-lang'
	}),
	defineSkill({
		slug: 'cpp',
		color: 'blue',
		description:
			'Low-level programming language with Object Oriented Programming. Mainly used for Embedded systems development',
		logo: Assets.Cpp,
		name: 'C++',
		category: 'pro-lang' 
	}),
	
	defineSkill({
		slug: 'verilog',
		color: 'blue',
		description:
			'Hardware Description Language. Used for Digital Circuit Design and FPGA programming',
		logo: Assets.Verilog,
		name: 'Verilog',
		category: 'pro-lang'
	}),
	defineSkill({
		slug: 'python',
		color: 'yellow',
		description:
			'High Level language. Used for Numeric Analysis, Machine Learning, Scripting and Visualizations',
		logo: Assets.Python,
		name: 'Python',
		category: 'pro-lang'
	}),
	
] as const;

const itemsFramework = [
	defineSkill({
		slug: 'esp-idf',
		color: 'red',
		description:
			'Espressif IoT Development Framework (ESP-IDF) is the official development framework using C/C++',
		logo: Assets.ESP,
		name: 'ESP-IDF',
		category: 'framework'
	}),
	defineSkill({
		slug: 'svelte',
		color: 'orange',
		description: svelteMd,
		logo: Assets.Svelte,
		name: 'Svelte',
		category: 'framework'
	}),
	defineSkill({
		slug: 'arduino',
		color: 'blue',
		description: 'Open-source electronics platform based on easy-to-use hardware and software',
		logo: Assets.Arduino,
		name: 'Arduino',
		category: 'framework'
	}),
] as const;

const itemsLibrary = [
	defineSkill({
		slug: 'numpy',
		color: 'blue',
		description:
			'Used for Numerical Analysis, Scientific Computing, Machine Learning and Data Analysis',
		logo: Assets.Numpy,
		name: 'Numpy',
		category: 'library'
	}),
	defineSkill({
		slug: 'matplotlib',
		color: 'blue',
		description:
			'Used for Data Visualization, Plotting and Graphing',
		logo: Assets.Matplotlib,
		name: 'Matplotlib',
		category: 'library'
	}),
	defineSkill({
		slug: 'pandas',
		color: 'blue',
		description:
			'Used for Data Visualization, Plotting and Graphing',
		logo: Assets.Pandas,
		name: 'Pandas',
		category: 'library'
	}),
	defineSkill({
		slug: 'sklearn',
		color: 'orange',
		description:
			'Used for numerical Machine Learning',
		logo: Assets.Scikitlearn,
		name: 'Scikit Learn',
		category: 'library'
	}),
	defineSkill({
		slug: 'pytorch',
		color: 'orange',
		description:
			'Build and train neural networks',
		logo: Assets.Pytorch,
		name: 'Pytorch',
		category: 'library'
	}),
	defineSkill({
		slug: 'scipy',
		color: 'blue',
		description:
			'Used for Scientific Computing',
		logo: Assets.Scipy,
		name: 'Scipy',
		category: 'library'
	}),
	defineSkill({
		slug: 'seaborn',
		color: 'blue',
		description:
			'Used for Data Visualization',
		logo: Assets.Seaborn,
		name: 'Seaborn',
		category: 'library'
	}),
	defineSkill({
		slug: 'sympy',
		color: 'green',
		description:
			'Used for Symbolic Mathematics',
		logo: Assets.Sympy,
		name: 'Sympy',
		category: 'library'
	})
] as const;

const itemsMarkUpStyle = [
	defineSkill({
		slug: 'css',
		color: 'blue',
		description:
			'Some experience with CSS. Learn enough to style a website. Currently learning SASS.',
		logo: Assets.CSS,
		name: 'CSS',
		category: 'markup-style'
	}),
	defineSkill({
		slug: 'html',
		color: 'orange',
		description:
			'Some experience with HTML. Learn enough to create a website.',
		logo: Assets.HTML,
		name: 'HTML',
		category: 'markup-style'
	}),
	defineSkill({
		slug: 'uml',
		color: 'green',
		description:
			'Some experience with UML to create diagrams for software development',
		logo: Assets.Uml,
		name: 'UML',
		category: 'markup-style'
	}),
	defineSkill({
		slug: 'latex',
		color: 'black',
		description:
			'Some experience with LaTeX to create documents and document algorithms and equations',
		logo: Assets.Latex,
		name: 'LaTex',
		category: 'markup-style'
	}),
] as const;

const items = [...itemsProLang, ...itemsFramework, ...itemsLibrary, ...itemsMarkUpStyle];

const SkillsData = {
	title,
	items
};

export default SkillsData;
