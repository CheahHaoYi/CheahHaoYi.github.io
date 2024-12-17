import BaseData from './base';
import { getSkills } from './skills';
import type { Skill } from './types';

const title = 'Home';

const hero: {
	title: string;
	description: string;
	links: Array<{ label: string; href: string; icon: `i-carbon-${string}` }>;
} = {
	title: `${BaseData.fullName},`,
	description:
		'Software Developer with experience in Web Development, Embedded Systems, and Software Engineering. Currently pursuing a Bachelor of Engineering in Computer Engineering at the National University of Singapore.',
	links: [
		{ label: 'GitHub', href: 'https://github.com/CheahHaoYi', icon: 'i-carbon-logo-github' },
		{ label: 'LinkedIn', href: 'https://www.linkedin.com/in/cheahhaoyi/', icon: 'i-carbon-logo-linkedin' },
		// { label: 'Twitter', href: 'https://twitter.com', icon: 'i-carbon-logo-twitter' },
		{ label: 'Email', href: 'mailto:hellohaoyicheah@gmail.com', icon: 'i-carbon-at' }
	]
};

const carousel: Array<Skill> = getSkills();

const HomeData = {
	title,
	hero,
	carousel
};

export default HomeData;
