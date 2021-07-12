(()=>{var e={71619:(e,t,r)=>{"use strict";r(67280),r(65363),r(10071);var n=r(98880),o=r(41659),a=r(83673);function i(e,t,r,n,o,i){const s=(0,a.up)("router-view");return(0,a.wg)(),(0,a.j4)(s)}const s=(0,a.aZ)({name:"App"});s.render=i;const l=s;var c=r(10556),u=r(47083),d=r(79582);const f=[{path:"/",component:()=>Promise.all([r.e(736),r.e(486)]).then(r.bind(r,14486)),children:[{path:"",component:()=>Promise.all([r.e(736),r.e(457)]).then(r.bind(r,60457))},{path:"join",component:()=>Promise.all([r.e(736),r.e(775)]).then(r.bind(r,81775))},{path:"start",component:()=>Promise.all([r.e(736),r.e(778)]).then(r.bind(r,93778))}]},{path:"/call",component:()=>Promise.all([r.e(736),r.e(184)]).then(r.bind(r,5184)),beforeEnter:e=>{if(!e.query.id)return!1},props:e=>({id:e.query.id,pwd:e.query.pwd})},{path:"/:catchAll(.*)*",component:()=>Promise.all([r.e(736),r.e(989)]).then(r.bind(r,38989))}],p=f,h=(0,u.BC)((function(){const e=d.r5,t=(0,d.p7)({scrollBehavior:()=>({left:0,top:0}),routes:p,history:e("")});return t}));async function m(e,t){const n="function"===typeof c.default?await(0,c.default)({}):c.default,{storeKey:a}=await Promise.resolve().then(r.bind(r,10556)),i="function"===typeof h?await h({store:n}):h;n.$router=i;const s=e(l);return s.use(o.Z,t),{app:s,store:n,storeKey:a,router:i}}const v={config:{}},b="";async function y({app:e,router:t,store:r,storeKey:n},o){let a=!1;const i=e=>{a=!0;const r=Object(e)===e?t.resolve(e).fullPath:e;window.location.href=r},s=window.location.href.replace(window.location.origin,"");for(let c=0;!1===a&&c<o.length;c++)try{await o[c]({app:e,router:t,store:r,ssrContext:null,redirect:i,urlPath:s,publicPath:b})}catch(l){return l&&l.url?void(window.location.href=l.url):void console.error("[Quasar] boot error:",l)}!0!==a&&(e.use(t),e.use(r,n),e.mount("#q-app"))}m(n.ri,v).then((e=>Promise.all([Promise.resolve().then(r.bind(r,96451))]).then((t=>{const r=t.map((e=>e.default)).filter((e=>"function"===typeof e));y(e,r)}))))},96451:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>l,i18n:()=>s});var n=r(47083),o=r(9262);const a={failed:"Action failed",success:"Action was successful"},i={"en-US":a},s=(0,o.o)({locale:"en-US",messages:i}),l=(0,n.xr)((({app:e})=>{e.use(s)}))},10556:(e,t,r)=>{"use strict";r.r(t),r.d(t,{storeKey:()=>s,default:()=>c,useStore:()=>u});var n=r(47083),o=r(87874),a=r(25337),i=function(e,t,r,n){function o(e){return e instanceof r?e:new r((function(t){t(e)}))}return new(r||(r=Promise))((function(r,a){function i(e){try{l(n.next(e))}catch(t){a(t)}}function s(e){try{l(n["throw"](e))}catch(t){a(t)}}function l(e){e.done?r(e.value):o(e.value).then(i,s)}l((n=n.apply(e,t||[])).next())}))};const s=Symbol("vuex-key");function l(){return i(this,void 0,void 0,(function*(){const e=localStorage.getItem("peerId");if(null!=e){const t=JSON.parse(e);return yield(0,a.createFromJSON)(t)}console.info("Could not get the stored peer id, a new one will be generated");const t=yield(0,a.create)();return console.info("Storing our peer id in local storage so it can be reused"),localStorage.setItem("peerId",JSON.stringify(t.toJSON())),t}))}const c=(0,n.h)((function(){return i(this,void 0,void 0,(function*(){const e=yield l(),t=(0,o.MT)({state:{username:e.toB58String(),libp2p:{peerId:e,signalAddrs:["/dns4/webrtc-star-signal-qtqc6lsoaa-uc.a.run.app/tcp/443/wss/p2p-webrtc-star"],dht:{enabled:!0,randomWalk:!0}}},strict:!1});return t}))}));function u(){return(0,o.oR)(s)}},46601:()=>{},89214:()=>{},62678:()=>{},25819:()=>{}},t={};function r(n){var o=t[n];if(void 0!==o)return o.exports;var a=t[n]={id:n,loaded:!1,exports:{}};return e[n].call(a.exports,a,a.exports,r),a.loaded=!0,a.exports}r.m=e,(()=>{r.amdO={}})(),(()=>{var e=[];r.O=(t,n,o,a)=>{if(!n){var i=1/0;for(c=0;c<e.length;c++){for(var[n,o,a]=e[c],s=!0,l=0;l<n.length;l++)(!1&a||i>=a)&&Object.keys(r.O).every((e=>r.O[e](n[l])))?n.splice(l--,1):(s=!1,a<i&&(i=a));s&&(e.splice(c--,1),t=o())}return t}a=a||0;for(var c=e.length;c>0&&e[c-1][2]>a;c--)e[c]=e[c-1];e[c]=[n,o,a]}})(),(()=>{r.n=e=>{var t=e&&e.__esModule?()=>e["default"]:()=>e;return r.d(t,{a:t}),t}})(),(()=>{r.d=(e,t)=>{for(var n in t)r.o(t,n)&&!r.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})}})(),(()=>{r.f={},r.e=e=>Promise.all(Object.keys(r.f).reduce(((t,n)=>(r.f[n](e,t),t)),[]))})(),(()=>{r.u=e=>"js/"+e+"."+{184:"f1b2bf52",282:"3fe46b25",457:"747cbeae",486:"99b5f5ae",775:"672ddc30",778:"8071ed21",923:"fb83c5f3",927:"0f0f09b1",989:"6bd6cb8f"}[e]+".js"})(),(()=>{r.miniCssF=e=>"css/"+(736===e?"vendor":e)+"."+{457:"a9a05849",736:"cc62b1eb"}[e]+".css"})(),(()=>{r.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()})(),(()=>{r.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t)})(),(()=>{var e={},t="chatio:";r.l=(n,o,a,i)=>{if(e[n])e[n].push(o);else{var s,l;if(void 0!==a)for(var c=document.getElementsByTagName("script"),u=0;u<c.length;u++){var d=c[u];if(d.getAttribute("src")==n||d.getAttribute("data-webpack")==t+a){s=d;break}}s||(l=!0,s=document.createElement("script"),s.charset="utf-8",s.timeout=120,r.nc&&s.setAttribute("nonce",r.nc),s.setAttribute("data-webpack",t+a),s.src=n),e[n]=[o];var f=(t,r)=>{s.onerror=s.onload=null,clearTimeout(p);var o=e[n];if(delete e[n],s.parentNode&&s.parentNode.removeChild(s),o&&o.forEach((e=>e(r))),t)return t(r)},p=setTimeout(f.bind(null,void 0,{type:"timeout",target:s}),12e4);s.onerror=f.bind(null,s.onerror),s.onload=f.bind(null,s.onload),l&&document.head.appendChild(s)}}})(),(()=>{r.r=e=>{"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}})(),(()=>{r.nmd=e=>(e.paths=[],e.children||(e.children=[]),e)})(),(()=>{r.p=""})(),(()=>{var e=(e,t,r,n)=>{var o=document.createElement("link");o.rel="stylesheet",o.type="text/css";var a=a=>{if(o.onerror=o.onload=null,"load"===a.type)r();else{var i=a&&("load"===a.type?"missing":a.type),s=a&&a.target&&a.target.href||t,l=new Error("Loading CSS chunk "+e+" failed.\n("+s+")");l.code="CSS_CHUNK_LOAD_FAILED",l.type=i,l.request=s,o.parentNode.removeChild(o),n(l)}};return o.onerror=o.onload=a,o.href=t,document.head.appendChild(o),o},t=(e,t)=>{for(var r=document.getElementsByTagName("link"),n=0;n<r.length;n++){var o=r[n],a=o.getAttribute("data-href")||o.getAttribute("href");if("stylesheet"===o.rel&&(a===e||a===t))return o}var i=document.getElementsByTagName("style");for(n=0;n<i.length;n++){o=i[n],a=o.getAttribute("data-href");if(a===e||a===t)return o}},n=n=>new Promise(((o,a)=>{var i=r.miniCssF(n),s=r.p+i;if(t(i,s))return o();e(n,s,o,a)})),o={143:0};r.f.miniCss=(e,t)=>{var r={457:1};o[e]?t.push(o[e]):0!==o[e]&&r[e]&&t.push(o[e]=n(e).then((()=>{o[e]=0}),(t=>{throw delete o[e],t})))}})(),(()=>{var e={143:0};r.f.j=(t,n)=>{var o=r.o(e,t)?e[t]:void 0;if(0!==o)if(o)n.push(o[2]);else{var a=new Promise(((r,n)=>o=e[t]=[r,n]));n.push(o[2]=a);var i=r.p+r.u(t),s=new Error,l=n=>{if(r.o(e,t)&&(o=e[t],0!==o&&(e[t]=void 0),o)){var a=n&&("load"===n.type?"missing":n.type),i=n&&n.target&&n.target.src;s.message="Loading chunk "+t+" failed.\n("+a+": "+i+")",s.name="ChunkLoadError",s.type=a,s.request=i,o[1](s)}};r.l(i,l,"chunk-"+t,t)}},r.O.j=t=>0===e[t];var t=(t,n)=>{var o,a,[i,s,l]=n,c=0;for(o in s)r.o(s,o)&&(r.m[o]=s[o]);if(l)var u=l(r);for(t&&t(n);c<i.length;c++)a=i[c],r.o(e,a)&&e[a]&&e[a][0](),e[i[c]]=0;return r.O(u)},n=self["webpackChunkchatio"]=self["webpackChunkchatio"]||[];n.forEach(t.bind(null,0)),n.push=t.bind(null,n.push.bind(n))})();var n=r.O(void 0,[736],(()=>r(71619)));n=r.O(n)})();