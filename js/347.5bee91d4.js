(self["webpackChunkchatio"]=self["webpackChunkchatio"]||[]).push([[347],{49578:(e,n,t)=>{"use strict";t.r(n),t.d(n,{default:()=>C});var o=t(83673);function r(e,n,t,r,a,c){const i=(0,o.up)("WithNode");return(0,o.wg)(),(0,o.j4)(i,{node:e.node},{default:(0,o.w5)((()=>[(0,o.WI)(e.$slots,"default")])),_:3},8,["node"])}var a=t(10556),c=(t(90246),t(54389)),i=t.n(c),d=t(68027),s=t.n(d),u=t(30506),p=t.n(u),l=t(89608),f=t.n(l),h=t(62640),b=t.n(h),g=t(69055),m=t(69810),y=t.n(m),v=t(30314),w=t.n(v),S=t(99349),W=t.n(S);const k=W()("chatio:peer"),I=s().prototype[Symbol.toStringTag],$=async e=>{const n=await i().create({peerId:e.peerId,addresses:{listen:e.signalAddrs},modules:{transport:[s(),f()],streamMuxer:[b()],connEncryption:[g.NOISE],dht:y(),pubsub:w()},config:{peerDiscovery:{autoDial:!0,[f().tag]:{enabled:!0}},dht:{enabled:e.dht.enabled,randomWalk:{enabled:e.dht.randomWalk}},transport:{[I]:{filter:p().all}}}});return n.connectionManager.on("peer:discovery",(e=>k(`Discovered: ${e.toB58String()}`))),n.connectionManager.on("peer:connect",(e=>k(`Connected: ${e.remotePeer.toB58String()}`))),n.connectionManager.on("peer:disconnect",(e=>k(`Disconnected: ${e.remotePeer.toB58String()}`))),await n.start(),n};function D(e,n,t,r,a,c){return(0,o.WI)(e.$slots,"default")}const M=(0,o.aZ)({name:"WithNode",props:{node:{type:Object,required:!0}},setup(e){return(0,o.JJ)("node",e.node),{}}});M.render=D;const N=M;var x=function(e,n,t,o){function r(e){return e instanceof t?e:new t((function(n){n(e)}))}return new(t||(t=Promise))((function(t,a){function c(e){try{d(o.next(e))}catch(n){a(n)}}function i(e){try{d(o["throw"](e))}catch(n){a(n)}}function d(e){e.done?t(e.value):r(e.value).then(c,i)}d((o=o.apply(e,n||[])).next())}))};const B=(0,o.aZ)({name:"Libp2p",components:{WithNode:N},setup(){return x(this,void 0,void 0,(function*(){const e=(0,a.useStore)(),n=yield $(e.state.libp2p);return{node:n}}))}});B.render=r;const C=B},5696:()=>{},89408:()=>{},57600:()=>{},52361:()=>{},94616:()=>{}}]);