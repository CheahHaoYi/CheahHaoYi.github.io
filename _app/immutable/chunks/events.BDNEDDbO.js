import{E as q,ax as x,ay as B,ac as D,B as z,az as H,a6 as I,aj as U,O as g,x as T,aA as j,aB as G,S as F,R as O,aC as $,au as K}from"./utils.BVOOPjVZ.js";import{o as W}from"./disclose-version.BnJXOy71.js";import{w as J,q as R,r as Q}from"./base.C3T0Zqxf.js";import{c as V}from"./index-client.BLua1_qX.js";const X=()=>performance.now(),m={tick:e=>requestAnimationFrame(e),now:()=>X(),tasks:new Set};function L(e){m.tasks.forEach(t=>{t.c(e)||(m.tasks.delete(t),t.f())}),m.tasks.size!==0&&m.tick(L)}function Y(e){let t;return m.tasks.size===0&&m.tick(L),{promise:new Promise(r=>{m.tasks.add(t={c:e,f:r})}),abort(){m.tasks.delete(t)}}}function A(e,t){e.dispatchEvent(new CustomEvent(t))}function Z(e){if(e==="float")return"cssFloat";if(e==="offset")return"cssOffset";if(e.startsWith("--"))return e;const t=e.split("-");return t.length===1?t[0]:t[0]+t.slice(1).map(r=>r[0].toUpperCase()+r.slice(1)).join("")}function P(e){const t={},r=e.split(";");for(const a of r){const[n,i]=a.split(":");if(!n||i===void 0)break;const f=Z(n.trim());t[f]=i.trim()}return t}const tt=e=>e;function ut(e,t,r,a){var n=(e&H)!==0,i=(e&j)!==0,f=n&&i,h=(e&G)!==0,y=f?"both":n?"in":"out",l,d=t.inert,u,s;function w(){var o=$,b=I;F(null),O(null);try{return l??(l=r()(t,(a==null?void 0:a())??{},{direction:y}))}finally{F(o),O(b)}}var _={is_global:h,in(){var o;if(t.inert=d,!n){s==null||s.abort(),(o=s==null?void 0:s.reset)==null||o.call(s);return}i||u==null||u.abort(),A(t,"introstart"),u=N(t,w(),s,1,()=>{A(t,"introend"),u==null||u.abort(),u=l=void 0})},out(o){if(!i){o==null||o(),l=void 0;return}t.inert=!0,A(t,"outrostart"),s=N(t,w(),u,0,()=>{A(t,"outroend"),o==null||o()})},stop:()=>{u==null||u.abort(),s==null||s.abort()}},c=I;if((c.transitions??(c.transitions=[])).push(_),n&&W){var p=h;if(!p){for(var v=c.parent;v&&v.f&q;)for(;(v=v.parent)&&!(v.f&x););p=!v||(v.f&B)!==0}p&&D(()=>{z(()=>_.in())})}}function N(e,t,r,a,n){var i=a===1;if(U(t)){var f,h=!1;return g(()=>{if(!h){var p=t({direction:i?"in":"out"});f=N(e,p,r,a,n)}}),{abort:()=>{h=!0,f==null||f.abort()},deactivate:()=>f.deactivate(),reset:()=>f.reset(),t:()=>f.t()}}if(r==null||r.deactivate(),!(t!=null&&t.duration))return n(),{abort:T,deactivate:T,reset:T,t:()=>a};const{delay:y=0,css:l,tick:d,easing:u=tt}=t;var s=[];if(i&&r===void 0&&(d&&d(0,1),l)){var w=P(l(0,1));s.push(w,w)}var _=()=>1-a,c=e.animate(s,{duration:y});return c.onfinish=()=>{var p=(r==null?void 0:r.t())??1-a;r==null||r.abort();var v=a-p,o=t.duration*Math.abs(v),b=[];if(o>0){if(l)for(var S=Math.ceil(o/16.666666666666668),k=0;k<=S;k+=1){var C=p+v*u(k/S),M=l(C,1-C);b.push(P(M))}_=()=>{var E=c.currentTime;return p+v*u(E/o)},d&&Y(()=>{if(c.playState!=="running")return!1;var E=_();return d(E,1-E),!0})}c=e.animate(b,{duration:o,fill:"forwards"}),c.onfinish=()=>{_=()=>a,d==null||d(a,1-a),n()}},{abort:()=>{c&&(c.cancel(),c.effect=null,c.onfinish=T)},deactivate:()=>{n=T},reset:()=>{a===0&&(d==null||d(1,0))},t:()=>_()}}const ct=(e,t)=>{const r=J(e),a=(i,f)=>{r.update(h=>{const y=i(h);let l=y;return t&&(l=t({curr:h,next:y})),f==null||f(l),l})};return{...r,update:a,set:i=>{a(()=>i)}}};let et="useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict",rt=(e=21)=>{let t="",r=e;for(;r--;)t+=et[Math.random()*64|0];return t};function at(){return rt(10)}function lt(e){return e.reduce((t,r)=>(t[r]=at(),t),{})}function nt(e){let t=e.parentElement;for(;R(t)&&!t.hasAttribute("data-portal");)t=t.parentElement;return t||"body"}function dt(e,t){return t!==void 0?t:nt(e)==="body"?document.body:null}const vt=(e,t="body")=>{let r;if(!R(t)&&typeof t!="string")return{destroy:Q};async function a(i){if(t=i,typeof t=="string"){if(r=document.querySelector(t),r===null&&(await K(),r=document.querySelector(t)),r===null)throw new Error(`No element found matching css selector: "${t}"`)}else if(t instanceof HTMLElement)r=t;else throw new TypeError(`Unknown portal target type: ${t===null?"null":typeof t}. Allowed types: string (CSS selector) or HTMLElement.`);e.dataset.portal="",r.appendChild(e),e.hidden=!1}function n(){e.remove()}return a(t),{update:a,destroy:n}};function pt(){const e=V();return t=>{const{originalEvent:r}=t.detail,{cancelable:a}=t,n=r.type;e(n,{originalEvent:r,currentTarget:r.currentTarget},{cancelable:a})||t.preventDefault()}}export{dt as a,pt as c,lt as g,ct as o,ut as t,vt as u};
