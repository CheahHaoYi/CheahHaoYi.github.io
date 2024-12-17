import{A as r}from"./assets.DgE60YNH.js";const m=(e,...t)=>{const o={...e};return Object.keys(o).forEach(a=>{t.includes(a)&&delete o[a]}),o},u=`# Svelte

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
`,n=e=>e,p=[n({name:"Programming Languages",slug:"pro-lang"}),n({name:"Frameworks",slug:"framework"}),n({name:"Libraries",slug:"library"}),n({name:"Langauges",slug:"lang"}),n({name:"Databases",slug:"db"}),n({name:"ORMs",slug:"orm"}),n({name:"DevOps",slug:"devops"}),n({name:"Testing",slug:"test"}),n({name:"Dev Tools",slug:"devtools"}),n({name:"Markup & Style",slug:"markup-style"}),n({name:"Design",slug:"design"}),n({name:"Soft Skills",slug:"soft"})],s=e=>{const t=m(e,"category");return e.category&&(t.category=p.find(o=>o.slug===e.category)),t},h=(...e)=>l.filter(t=>e.length===0?!0:e.includes(t.slug)),f=e=>{const t=[],o=[];return l.forEach(a=>{if(e.trim()&&!a.name.toLowerCase().includes(e.trim().toLowerCase()))return;if(!a.category){o.push(a);return}let i=t.find(g=>{var c;return g.category.slug===((c=a.category)==null?void 0:c.slug)});i||(i={items:[],category:a.category},t.push(i)),i.items.push(a)}),o.length!==0&&t.push({category:{name:"Others",slug:"others"},items:o}),t},d="Skills",l=[s({slug:"js",color:"yellow",description:"Some experience with JavaScript. Currently learning TypeScript and Svelte.",logo:r.JavaScript,name:"Javascript",category:"pro-lang"}),s({slug:"ts",color:"blue",description:"Using TypeScript for web development. Familiar with the basics and some advanced concepts.",logo:r.TypeScript,name:"Typescript",category:"pro-lang"}),s({slug:"C",color:"blue",description:"Low-level programming language. Mainly used for Embedded systems development",logo:r.C,name:"C Language",category:"pro-lang"}),s({slug:"Cpp",color:"blue",description:"Low-level programming language with Object Oriented Programming. Mainly used for Embedded systems development",logo:r.Cpp,name:"C++ Language",category:"pro-lang"}),s({slug:"python",color:"yellow",description:"High Level language. Used for Numeric Analysis, Machine Learning, Scripting and Visualizations",logo:r.Python,name:"Python",category:"pro-lang"}),s({slug:"css",color:"blue",description:"Some experience with CSS. Learn enough to style a website. Currently learning SASS.",logo:r.CSS,name:"CSS",category:"markup-style"}),s({slug:"html",color:"orange",description:"Some experience with HTML. Learn enough to create a website.",logo:r.HTML,name:"HTML",category:"markup-style"}),s({slug:"esp-idf",color:"red",description:"Espressif IoT Development Framework (ESP-IDF) is the official development framework using C/C++",logo:r.ESP,name:"ESP IoT Development Framework",category:"library"}),s({slug:"svelte",color:"orange",description:u,logo:r.Svelte,name:"Svelte",category:"library"})],S={title:d,items:l};export{S,h as a,f as g};
