import{A as e}from"./assets.CvNvAytx.js";const m=(n,...t)=>{const r={...n};return Object.keys(r).forEach(i=>{t.includes(i)&&delete r[i]}),r},u=`# Svelte

---

[\`Svelte\`](https://svelte.dev/) is a free and open-source front end component framework or language created by Rich Harris and maintained by the Svelte core team members. Svelte is not a monolithic JavaScript library imported by applications: instead, Svelte compiles HTML templates to specialized code that manipulates the DOM directly, which may reduce the size of transferred files and give better client performance. Application code is also processed by the compiler, inserting calls to automatically recompute data and re-render UI elements when the data they depend on is modified. This also avoids the overhead associated with runtime intermediate representations, such as virtual DOM, unlike traditional frameworks (such as React and Vue) which carry out the bulk of their work at runtime, i.e. in the browser.

The compiler itself is written in TypeScript. Its source code is licensed under MIT License and hosted on GitHub.

<br/>

Svelte is :

- compiled : Svelte shifts as much work as possible out of the browser and into your build step. No more manual optimisations — just faster, more efficient apps.
- compact : Write breathtakingly concise components using languages you already know — HTML, CSS and JavaScript. Oh, and your application bundles will be tiny as well.
- complete : Built-in scoped styling, state management, motion primitives, form bindings and more — don't waste time trawling npm for the bare essentials. It's all here.

<br/>

## Example

\`\`\`ts
<script>
    let count = 1;
    $: doubled = count * 2;
<\/script>

<p>{count} * 2 = {doubled}</p>

<button on:click={() => count = count + 1}>Count</button>

// comment here
\`\`\`

### Heading 3

#### Heading 4

##### Heading 5

###### Heading 6

> Svelte is a free and open-source front end component framework or language created by Rich Harris and maintained by the Svelte core team members.
`,a=n=>n,p=[a({name:"Programming Languages",slug:"pro-lang"}),a({name:"Frameworks",slug:"framework"}),a({name:"Libraries",slug:"library"}),a({name:"Langauges",slug:"lang"}),a({name:"Databases",slug:"db"}),a({name:"ORMs",slug:"orm"}),a({name:"DevOps",slug:"devops"}),a({name:"Testing",slug:"test"}),a({name:"Dev Tools",slug:"devtools"}),a({name:"Markup & Style",slug:"markup-style"}),a({name:"Design",slug:"design"}),a({name:"Soft Skills",slug:"soft"})],o=n=>{const t=m(n,"category");return n.category&&(t.category=p.find(r=>r.slug===n.category)),t},v=(...n)=>l.filter(t=>n.length===0?!0:n.includes(t.slug)),w=n=>{const t=[],r=[];return l.forEach(i=>{if(n.trim()&&!i.name.toLowerCase().includes(n.trim().toLowerCase()))return;if(!i.category){r.push(i);return}let s=t.find(g=>{var c;return g.category.slug===((c=i.category)==null?void 0:c.slug)});s||(s={items:[],category:i.category},t.push(s)),s.items.push(i)}),r.length!==0&&t.push({category:{name:"Others",slug:"others"},items:r}),t},d="Skills",y=[o({slug:"js",color:"yellow",description:"Some experience with JavaScript. Currently learning TypeScript and Svelte.",logo:e.JavaScript,name:"Javascript",category:"pro-lang"}),o({slug:"ts",color:"blue",description:"Using TypeScript for web development. Familiar with the basics and some advanced concepts.",logo:e.TypeScript,name:"Typescript",category:"pro-lang"}),o({slug:"java",color:"red",description:"High-level programming language. Used for Android Development, Web Development and Enterprise Applications",logo:e.Java,name:"Java",category:"pro-lang"}),o({slug:"c",color:"blue",description:"Low-level programming language. Mainly used for Embedded systems development",logo:e.C,name:"C",category:"pro-lang"}),o({slug:"cpp",color:"blue",description:"Low-level programming language with Object Oriented Programming. Mainly used for Embedded systems development",logo:e.Cpp,name:"C++",category:"pro-lang"}),o({slug:"verilog",color:"blue",description:"Hardware Description Language. Used for Digital Circuit Design and FPGA programming",logo:e.Verilog,name:"Verilog",category:"pro-lang"}),o({slug:"python",color:"yellow",description:"High Level language. Used for Numeric Analysis, Machine Learning, Scripting and Visualizations",logo:e.Python,name:"Python",category:"pro-lang"})],h=[o({slug:"esp-idf",color:"red",description:"Espressif IoT Development Framework (ESP-IDF) is the official development framework using C/C++",logo:e.ESP,name:"ESP-IDF",category:"framework"}),o({slug:"svelte",color:"orange",description:u,logo:e.Svelte,name:"Svelte",category:"framework"}),o({slug:"arduino",color:"blue",description:"Open-source electronics platform based on easy-to-use hardware and software",logo:e.Arduino,name:"Arduino",category:"framework"})],b=[o({slug:"numpy",color:"blue",description:"Used for Numerical Analysis, Scientific Computing, Machine Learning and Data Analysis",logo:e.Numpy,name:"Numpy",category:"library"}),o({slug:"matplotlib",color:"blue",description:"Used for Data Visualization, Plotting and Graphing",logo:e.Matplotlib,name:"Matplotlib",category:"library"}),o({slug:"pandas",color:"blue",description:"Used for Data Visualization, Plotting and Graphing",logo:e.Pandas,name:"Pandas",category:"library"}),o({slug:"sklearn",color:"orange",description:"Used for numerical Machine Learning",logo:e.Scikitlearn,name:"Scikit Learn",category:"library"}),o({slug:"pytorch",color:"orange",description:"Build and train neural networks",logo:e.Pytorch,name:"Pytorch",category:"library"}),o({slug:"scipy",color:"blue",description:"Used for Scientific Computing",logo:e.Scipy,name:"Scipy",category:"library"}),o({slug:"seaborn",color:"blue",description:"Used for Data Visualization",logo:e.Seaborn,name:"Seaborn",category:"library"}),o({slug:"sympy",color:"green",description:"Used for Symbolic Mathematics",logo:e.Sympy,name:"Sympy",category:"library"})],f=[o({slug:"css",color:"blue",description:"Some experience with CSS. Learn enough to style a website. Currently learning SASS.",logo:e.CSS,name:"CSS",category:"markup-style"}),o({slug:"html",color:"orange",description:"Some experience with HTML. Learn enough to create a website.",logo:e.HTML,name:"HTML",category:"markup-style"}),o({slug:"uml",color:"green",description:"Some experience with UML to create diagrams for software development",logo:e.Uml,name:"UML",category:"markup-style"}),o({slug:"latex",color:"black",description:"Some experience with LaTeX to create documents and document algorithms and equations",logo:e.Latex,name:"LaTex",category:"markup-style"})],l=[...y,...h,...b,...f],k={title:d,items:l};export{k as S,v as a,w as g};
