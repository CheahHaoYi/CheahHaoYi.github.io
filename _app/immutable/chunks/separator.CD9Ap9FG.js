import{s as M,g as S,a as g,b as R,d as T}from"./disclose-version.BnJXOy71.js";import{i as y}from"./legacy.xph4F0-O.js";import{p as P,X as p,Y as j,f as z,t as D,o as d,a as x,Z as U,F as O,u as $,_ as q}from"./utils.BVOOPjVZ.js";import{l as m,p as c,i as B,b as F,s as W}from"./index-client.BLua1_qX.js";import{m as X,j as Y,a as Z,b as G,c as H}from"./base.C3T0Zqxf.js";import{t as I,c as J,r as K,g as L}from"./stores.COLlJqcE.js";const Q={orientation:"horizontal",decorative:!1},V=a=>{const t={...Q,...a},o=I(t),{orientation:n,decorative:r}=o;return{elements:{root:X("separator",{stores:[n,r],returned:([e,s])=>({role:s?"none":"separator","aria-orientation":e==="vertical"?e:void 0,"aria-hidden":s,"data-orientation":e})})},options:o}};function tt(){return{NAME:"separator",PARTS:["root"]}}function et(a){const{NAME:t,PARTS:o}=tt(),n=J(t,o),r={...V(K(a)),getAttrs:n};return{...r,updateOption:L(r.options)}}var at=R("<div></div>");function ot(a,t){const o=m(t,["children","$$slots","$$events","$$legacy"]),n=m(o,["orientation","decorative","asChild","el"]);P(t,!1);const r=M(),l=()=>T(E,"$root",r),e=U();let s=c(t,"orientation",8,"horizontal"),f=c(t,"decorative",8,!0),C=c(t,"asChild",8,!1),h=c(t,"el",28,()=>{});const{elements:{root:E},updateOption:b,getAttrs:N}=et({orientation:s(),decorative:f()}),k=N("root");p(()=>O(s()),()=>{b("orientation",s())}),p(()=>O(f()),()=>{b("decorative",f())}),p(()=>l(),()=>{$(e,l())}),p(()=>d(e),()=>{Object.assign(d(e),k)}),j(),y();var A=S(),w=z(A);B(w,C,_=>{var i=S(),u=z(i);Z(u,t,"default",{get builder(){return d(e)}}),g(_,i)},_=>{var i=at();let u;F(i,v=>h(v),()=>h()),Y(i,v=>d(e).action(v)),D(()=>u=G(i,u,{...d(e),...n})),g(_,i)}),g(a,A),x()}function dt(a,t){const o=m(t,["children","$$slots","$$events","$$legacy"]),n=m(o,["class","orientation","decorative"]);P(t,!1);let r=c(t,"class",8,void 0),l=c(t,"orientation",8,"horizontal"),e=c(t,"decorative",8,void 0);y();var s=q(()=>H("bg-border shrink-0",l()==="horizontal"?"h-[1px] w-full":"min-h-full w-[1px]",r()));ot(a,W({get class(){return d(s)},get orientation(){return l()},get decorative(){return e()}},()=>n)),x()}export{dt as S,V as c};
