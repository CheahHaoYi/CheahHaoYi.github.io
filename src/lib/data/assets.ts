import { base } from '$app/paths';

const url = (file: string) => `${base}/logos/${file}`;

const asset = (lightFilename: string, darkFilename = lightFilename) => {
	return { light: url(lightFilename), dark: url(darkFilename) };
};

const AssetsEdu = {
	Unknown: asset('no-img.svg'),
	NUS: asset('nus.jpg'),
	DTU: asset('DTU.jpg'),
	RVRC: asset('rvrc.jpeg'),
};

const AssetsExp = {
	Unknown: asset('no-img.svg'),
	ESP: asset('esp.svg'),
};

const AssetsSkill = {
	Unknown: asset('no-img.svg'),
	// Low Level
	C: asset('c.svg'),
	Cpp: asset('cpp.svg'),
	Nginx: asset('nginx.svg'),
	RISCV: asset('risc_v.webp'),
	Verilog: asset('verilog.png'),
	Arduino: asset('arduino.svg'),
	
	// Web Development
	TypeScript: asset('ts.png'),
	NodeJs: asset('node.png'),
	Svelte: asset('svelte.svg'),
	JavaScript: asset('js.png'),
	Java: asset('java.png'),
	HTML: asset('html.svg'),
	CSS: asset('css.svg'),
	Vite: asset('vite.png'),
	
	// Python Libraries
	Python: asset('python.png'),
	Numpy: asset('numpy.svg'),
	Pandas: asset('pandas.svg'),
	Matplotlib: asset('matplotlib.png'),
	Scikitlearn: asset('scikitlearn.svg'),
	Pytorch: asset('pytorch.png'),
	Scipy: asset('scipy.svg'),
	Seaborn: asset('seaborn.svg'),
	Sympy: asset('sympy.svg'),

	// Others
	Uml: asset('uml.svg'),
	Latex: asset('latex.svg'),
};

const AssetsDesign = {
	Premiere: asset('premiere.svg'),
	Photoshop: asset('photoshop.svg'),
	AfterEffects: asset('after-effects.svg'),
	Illustrator: asset('illustrator.svg'),
};


const AssetsToLearn = {
	AWS: asset('aws.svg'),
	Bootstrap: asset('bootstrap.svg'),
	Django: asset('django.svg'),
	FastApi: asset('fastapi'),
	Flask: asset('flask.svg'),
	Go: asset('go.svg'),
	Kafka: asset('kafka.svg'),
	Rust: asset('rust.svg', 'rust-dark.png'),
	Selenium: asset('selenium.svg'),
	Docker: asset('docker.svg'),
	Kubernetes: asset('kubernetes.svg'),
	VueJs: asset('vue.png'),
	ReactJs: asset('react.svg'),
	Deno: asset('deno.svg'),
	ExpressJs: asset('express.png'),
	Electron: asset('electron.png'),
	Android: asset('android.png'),
	Angular: asset('angular.png'),
	PostgreSQL: asset('postgres.png'),
	Firebase: asset('firebase.png'),
	Sass: asset('sass.png'),
	Vitest: asset('vitest.svg'),
};

const Assets = { ...AssetsEdu, ...AssetsExp, ...AssetsSkill, ...AssetsDesign, ...AssetsToLearn };	

export default Assets;
