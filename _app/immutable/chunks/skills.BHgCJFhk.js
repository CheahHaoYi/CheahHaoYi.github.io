import{A as e}from"./assets.B3UYyQ4I.js";const u=(o,...a)=>{const r={...o};return Object.keys(r).forEach(i=>{a.includes(i)&&delete r[i]}),r},m=`# Svelte

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
`,t=o=>o,p=[t({name:"Programming Languages",slug:"pro-lang"}),t({name:"Frameworks",slug:"framework"}),t({name:"Libraries",slug:"library"}),t({name:"Langauges",slug:"lang"}),t({name:"Databases",slug:"db"}),t({name:"ORMs",slug:"orm"}),t({name:"DevOps",slug:"devops"}),t({name:"Testing",slug:"test"}),t({name:"Dev Tools",slug:"devtools"}),t({name:"Markup & Style",slug:"markup-style"}),t({name:"Design",slug:"design"}),t({name:"Soft Skills",slug:"soft"})],n=o=>{const a=u(o,"category");return o.category&&(a.category=p.find(r=>r.slug===o.category)),a},h=(...o)=>l.filter(a=>o.length===0?!0:o.includes(a.slug)),f=o=>{const a=[],r=[];return l.forEach(i=>{if(o.trim()&&!i.name.toLowerCase().includes(o.trim().toLowerCase()))return;if(!i.category){r.push(i);return}let s=a.find(g=>{var c;return g.category.slug===((c=i.category)==null?void 0:c.slug)});s||(s={items:[],category:i.category},a.push(s)),s.items.push(i)}),r.length!==0&&a.push({category:{name:"Others",slug:"others"},items:r}),a},d="Skills",l=[n({slug:"js",color:"yellow",description:"Some experience with JavaScript. Currently learning TypeScript and Svelte.",logo:e.JavaScript,name:"Javascript",category:"pro-lang"}),n({slug:"ts",color:"blue",description:"Using TypeScript for web development. Familiar with the basics and some advanced concepts.",logo:e.TypeScript,name:"Typescript",category:"pro-lang"}),n({slug:"C",color:"blue",description:"Low-level programming language. Mainly used for Embedded systems development",logo:e.C,name:"C",category:"pro-lang"}),n({slug:"Cpp",color:"blue",description:"Low-level programming language with Object Oriented Programming. Mainly used for Embedded systems development",logo:e.Cpp,name:"C++",category:"pro-lang"}),n({slug:"python",color:"yellow",description:"High Level language. Used for Numeric Analysis, Machine Learning, Scripting and Visualizations",logo:e.Python,name:"Python",category:"pro-lang"}),n({slug:"verilog",color:"blue",description:"Hardware Description Language. Used for Digital Circuit Design and FPGA programming",logo:e.Verilog,name:"Verilog",category:"pro-lang"}),n({slug:"css",color:"blue",description:"Some experience with CSS. Learn enough to style a website. Currently learning SASS.",logo:e.CSS,name:"CSS",category:"markup-style"}),n({slug:"html",color:"orange",description:"Some experience with HTML. Learn enough to create a website.",logo:e.HTML,name:"HTML",category:"markup-style"}),n({slug:"Numpy",color:"blue",description:"Used for Numerical Analysis, Scientific Computing, Machine Learning and Data Analysis",logo:e.Numpy,name:"Numpy",category:"library"}),n({slug:"Matplotlib",color:"blue",description:"Used for Data Visualization, Plotting and Graphing",logo:e.Matplotlib,name:"Matplotlib",category:"library"}),n({slug:"Sklearn",color:"orange",description:"Used for numerical Machine Learning",logo:e.Scikitlearn,name:"Scikit Learn",category:"library"}),n({slug:"Pytorch",color:"orange",description:"Build and train neural networks",logo:e.Pytorch,name:"Pytorch",category:"library"}),n({slug:"esp-idf",color:"red",description:"Espressif IoT Development Framework (ESP-IDF) is the official development framework using C/C++",logo:e.ESP,name:"ESP-IDF",category:"framework"}),n({slug:"svelte",color:"orange",description:m,logo:e.Svelte,name:"Svelte",category:"framework"})],b={title:d,items:l};export{b as S,h as a,f as g};
