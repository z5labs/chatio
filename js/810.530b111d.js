(self["webpackChunkchatio"]=self["webpackChunkchatio"]||[]).push([[810],{93810:(e,t,n)=>{"use strict";n.r(t),n.d(t,{default:()=>M});var o=n(83673);function r(e,t,n,r,a,u){const i=(0,o.up)("Call"),s=(0,o.up)("Libp2p"),d=(0,o.up)("q-spinner"),l=(0,o.up)("q-page"),c=(0,o.up)("q-page-container"),b=(0,o.up)("Chat"),f=(0,o.up)("q-drawer"),p=(0,o.up)("q-checkbox"),m=(0,o.up)("q-space"),y=(0,o.up)("q-btn"),h=(0,o.up)("q-toolbar"),g=(0,o.up)("q-footer"),w=(0,o.up)("q-layout");return(0,o.wg)(),(0,o.j4)(w,{view:"lHh Lpr lFf"},{default:(0,o.w5)((()=>[(0,o.Wm)(c,null,{default:(0,o.w5)((()=>[(0,o.Wm)(l,{class:"row items-center justify-center"},{default:(0,o.w5)((()=>[((0,o.wg)(),(0,o.j4)(o.n4,null,{default:(0,o.w5)((()=>[(0,o.Wm)(s,{onNode:e.setNode},{default:(0,o.w5)((({node:e})=>[(0,o.Wm)(i,{node:e},null,8,["node"])])),_:1},8,["onNode"])])),fallback:(0,o.w5)((()=>[(0,o.Wm)(d,{color:"primary",size:"3em"})])),_:1}))])),_:1})])),_:1}),(0,o.Wm)(f,{modelValue:e.showChat,"onUpdate:modelValue":t[1]||(t[1]=t=>e.showChat=t),side:"right",width:300,breakpoint:500,elevated:""},{default:(0,o.w5)((()=>[(0,o.Wm)(b,{onMessage:e.sendMessage,messages:e.messages},null,8,["onMessage","messages"])])),_:1},8,["modelValue"]),(0,o.Wm)(g,{bordered:"",class:"bg-black text-primary"},{default:(0,o.w5)((()=>[(0,o.Wm)(h,null,{default:(0,o.w5)((()=>[(0,o.Wm)(p,{modelValue:e.audio,"onUpdate:modelValue":t[2]||(t[2]=t=>e.audio=t),label:"Audio",color:"primary","keep-color":""},null,8,["modelValue"]),(0,o.Wm)(p,{modelValue:e.video,"onUpdate:modelValue":t[3]||(t[3]=t=>e.video=t),label:"Video",color:"primary","keep-color":""},null,8,["modelValue"]),(0,o.Wm)(m),(0,o.Wm)(y,{icon:"people",label:"Participants",flat:""}),(0,o.Wm)(y,{onClick:t[4]||(t[4]=t=>e.showChat=!e.showChat),icon:"message",label:"Chat",flat:""})])),_:1})])),_:1})])),_:1})}var a=n(61959),u=n(46794),i=n.n(u),s=n(1603),d=n.n(s),l=n(41193),c=n.n(l),b=n(67199),f=n.n(b);const p={user:"",created:0},m={encode(e,t=f().Writer.create()){return""!==e.user&&t.uint32(10).string(e.user),0!==e.body.length&&t.uint32(18).bytes(e.body),0!==e.created&&t.uint32(24).uint64(e.created),t},decode(e,t){const n=e instanceof f().Reader?e:new(f().Reader)(e);let o=void 0===t?n.len:n.pos+t;const r=Object.assign({},p);r.body=new Uint8Array;while(n.pos<o){const e=n.uint32();switch(e>>>3){case 1:r.user=n.string();break;case 2:r.body=n.bytes();break;case 3:r.created=C(n.uint64());break;default:n.skipType(7&e);break}}return r},fromJSON(e){const t=Object.assign({},p);return t.body=new Uint8Array,void 0!==e.user&&null!==e.user?t.user=String(e.user):t.user="",void 0!==e.body&&null!==e.body&&(t.body=g(e.body)),void 0!==e.created&&null!==e.created?t.created=Number(e.created):t.created=0,t},toJSON(e){const t={};return void 0!==e.user&&(t.user=e.user),void 0!==e.body&&(t.body=v(void 0!==e.body?e.body:new Uint8Array)),void 0!==e.created&&(t.created=e.created),t},fromPartial(e){const t=Object.assign({},p);return void 0!==e.user&&null!==e.user?t.user=e.user:t.user="",void 0!==e.body&&null!==e.body?t.body=e.body:t.body=new Uint8Array,void 0!==e.created&&null!==e.created?t.created=e.created:t.created=0,t}};var y=(()=>{if("undefined"!==typeof y)return y;if("undefined"!==typeof self)return self;if("undefined"!==typeof window)return window;if("undefined"!==typeof n.g)return n.g;throw"Unable to locate global object"})();const h=y.atob||(e=>y.Buffer.from(e,"base64").toString("binary"));function g(e){const t=h(e),n=new Uint8Array(t.length);for(let o=0;o<t.length;++o)n[o]=t.charCodeAt(o);return n}const w=y.btoa||(e=>y.Buffer.from(e,"binary").toString("base64"));function v(e){const t=[];for(const n of e)t.push(String.fromCharCode(n));return w(t.join(""))}function C(e){if(e.gt(Number.MAX_SAFE_INTEGER))throw new y.Error("Value is larger than Number.MAX_SAFE_INTEGER");return e.toNumber()}f().util.Long!==c()&&(f().util.Long=c(),f().configure());var S=function(e,t,n,o){function r(e){return e instanceof n?e:new n((function(t){t(e)}))}return new(n||(n=Promise))((function(n,a){function u(e){try{s(o.next(e))}catch(t){a(t)}}function i(e){try{s(o["throw"](e))}catch(t){a(t)}}function s(e){e.done?n(e.value):r(e.value).then(u,i)}s((o=o.apply(e,t||[])).next())}))};const k=(e,t)=>{const n=(0,a.iH)([]),r=W(n),u=new Set;return(0,o.YP)(e,(e=>{e&&(e.on("peer:connect",(e=>{console.log("Connected to",e.remotePeer.toB58String()),u.has(e.remotePeer.toB58String())||u.add(e.remotePeer.toB58String())})),e.on("peer:disconnect",(e=>{console.log("Disconnected from",e.remotePeer.toB58String()),u.delete(e.remotePeer.toB58String())})),e.pubsub.on(t,r),e.pubsub.subscribe(t))})),{messages:n,disconnect:()=>{e.value&&(e.value.pubsub.removeListener(t,r),e.value.pubsub.unsubscribe(t))},send:n=>S(void 0,void 0,void 0,(function*(){if(!e.value)return;const o=m.encode({user:n.user,body:i()(n.body),created:n.created}).finish();yield e.value.pubsub.publish(t,o)}))}},W=e=>t=>{if(!t||!t.data)return;const n=m.decode(t.data);e.value.push({user:n.user,body:d()(n.body),created:n.created})};var P=function(e,t,n,o){function r(e){return e instanceof n?e:new n((function(t){t(e)}))}return new(n||(n=Promise))((function(n,a){function u(e){try{s(o.next(e))}catch(t){a(t)}}function i(e){try{s(o["throw"](e))}catch(t){a(t)}}function s(e){e.done?n(e.value):r(e.value).then(u,i)}s((o=o.apply(e,t||[])).next())}))};const A=(0,o.aZ)({name:"CallLayout",components:{Libp2p:(0,o.RC)((()=>Promise.all([n.e(736),n.e(923)]).then(n.bind(n,13709)))),Call:(0,o.RC)((()=>n.e(282).then(n.bind(n,7282)))),Chat:(0,o.RC)((()=>Promise.all([n.e(736),n.e(927)]).then(n.bind(n,25927))))},props:{id:{type:String,required:!0},pwd:{type:String}},setup(e){const t=`/chatio/${e.id}/chat/1.0.0`,n=(0,a.iH)(null),r=(0,a.iH)(!1),u=(0,a.iH)(!1),i=(0,a.iH)(!1),s=e=>n.value=e,{messages:d,send:l,disconnect:c}=k(n,t),b=e=>P(this,void 0,void 0,(function*(){const t=Date.now(),n={user:"Me",body:e,created:t};d.value.push(n),yield l(n)}));return(0,o.Ah)((()=>{c()})),{audio:r,video:u,showChat:i,messages:d,sendMessage:b,setNode:s}}});var N=n(19214),_=n(72652),q=n(24379),V=n(39754),Z=n(17667),Q=n(41762),U=n(39570),j=n(65735),B=n(62025),L=n(66819),x=n(7518),E=n.n(x);A.render=r;const M=A;E()(A,"components",{QLayout:N.Z,QPageContainer:_.Z,QPage:q.Z,QSpinner:V.Z,QDrawer:Z.Z,QFooter:Q.Z,QToolbar:U.Z,QCheckbox:j.Z,QSpace:B.Z,QBtn:L.Z})}}]);