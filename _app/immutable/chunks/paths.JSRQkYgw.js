import{B as k,k as l,y as q,C as v}from"./utils.jAVDF0d8.js";const c=[];function x(s,t){return{subscribe:z(s,t).subscribe}}function z(s,t=l){let n=null;const o=new Set;function u(r){if(v(s,r)&&(s=r,n)){const i=!c.length;for(const e of o)e[1](),c.push(e,s);if(i){for(let e=0;e<c.length;e+=2)c[e][0](c[e+1]);c.length=0}}}function b(r){u(r(s))}function f(r,i=l){const e=[r,i];return o.add(e),o.size===1&&(n=t(u,b)||l),r(s),()=>{o.delete(e),o.size===0&&n&&(n(),n=null)}}return{set:u,update:b,subscribe:f}}function T(s,t,n){const o=!Array.isArray(s),u=o?[s]:s;if(!u.every(Boolean))throw new Error("derived() expects stores as input, got a falsy value");const b=t.length<2;return x(n,(f,r)=>{let i=!1;const e=[];let d=0,g=l;const _=()=>{if(d)return;g();const a=t(o?e[0]:e,f,r);b?f(a):g=typeof a=="function"?a:l},w=u.map((a,p)=>k(a,m=>{e[p]=m,d&=~(1<<p),i&&_()},()=>{d|=1<<p}));return i=!0,_(),function(){q(w),g(),i=!1}})}function C(s){return{subscribe:s.subscribe.bind(s)}}function E(s){let t;return k(s,n=>t=n)(),t}var y;const A=((y=globalThis.__sveltekit_1902gak)==null?void 0:y.base)??"";var h;const S=((h=globalThis.__sveltekit_1902gak)==null?void 0:h.assets)??A;export{x as a,A as b,S as c,T as d,E as g,C as r,z as w};
