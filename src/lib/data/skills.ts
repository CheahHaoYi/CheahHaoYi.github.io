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

/*
defineSkill({
		slug: '',
		color: '',
		description:
			'',
		logo: Assets.Sass,
		name: '',
		category: '' // 'pro-lang' 'library' 'markup-style'
}),

*/

const items = [
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
		slug: 'C',
		color: 'blue',
		description:
			'Low-level programming language. Mainly used for Embedded systems development',
		logo: Assets.C,
		name: 'C Language',
		category: 'pro-lang' // 'pro-lang' 'library' 'markup-style'
	}),
	defineSkill({
		slug: 'Cpp',
		color: 'blue',
		description:
			'Low-level programming language with Object Oriented Programming. Mainly used for Embedded systems development',
		logo: Assets.Cpp,
		name: 'C++ Language',
		category: 'pro-lang' // 'pro-lang' 'library' 'markup-style'
	}),
	defineSkill({
		slug: 'python',
		color: 'yellow',
		description:
			'High Level language. Used for Numeric Analysis, Machine Learning, Scripting and Visualizations',
		logo: Assets.Python,
		name: 'Python',
		category: 'pro-lang' // 'pro-lang' 'library' 'markup-style'
	}),
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
		slug: 'esp-idf',
		color: 'red',
		description:
			'Espressif IoT Development Framework (ESP-IDF) is the official development framework using C/C++',
		logo: Assets.ESP,
		name: 'ESP IoT Development Framework',
		category: 'library'
	}),
	defineSkill({
		slug: 'svelte',
		color: 'orange',
		description: svelteMd,
		logo: Assets.Svelte,
		name: 'Svelte',
		category: 'library'
	})
] as const;

const SkillsData = {
	title,
	items
};

export default SkillsData;
