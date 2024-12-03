import{d as _,r,g as w,o as M,j as q,c as g,a as t,t as I,w as A,v as F,b as N,F as O,e as z,f as h,h as J}from"./index-iyQ0fk6r.js";import{p as Q,c as G}from"./sdk-CDpKy7gT.js";import{_ as H}from"./export-helper-DlAUqK2U.js";import"./zoid-DaRsBbJ-.js";import"./loadScript-wOdhQs3s.js";const K={class:"container"},W={class:"mb-4 text-2xl font-bold"},X={class:"flex flex-col space-y-2"},Y={class:""},Z={class:"w-30%"},ee={open:""},c="?sigma.dai.adsEndpoint=c1995593-784e-454e-b667-4b1ff441738e&sigma.dai.userId=abcd1234&sigma.dai.sessionId=xyz987",te=_({__name:"App",setup(se){const b=r([]),a=r(w(window.location.href).url),i=r(w(window.location.href).adsUrl),S=r();function x(){return new Promise((o,e)=>{const s=indexedDB.open("TrackingLogDB",1);s.onerror=n=>e(`IndexedDB error: ${n.target.error}`),s.onsuccess=n=>o(n.target.result),s.onupgradeneeded=n=>{n.target.result.createObjectStore("trackingLog",{keyPath:"id",autoIncrement:!0})}})}r();const m=r(a),U=r(i),j=r({merchantId:"",appId:"",sessionId:"",userId:""});function k(){const o=new URL(window.location.href);o.searchParams.set("url",m.value),o.searchParams.set("adsUrl",U.value),Object.entries(j.value).forEach(([e,s])=>{o.searchParams.set(`drm_${e}`,s)}),window.location.href=o.toString()}const l=r();async function d(o){const e=document.querySelector("#video2"),s=document.querySelector("#adContainer1"),{playerUrl:n,adsUrl:v}=Q(o);G({video:e,adContainer:s,adsUrl:v}).then(({onEventTracking:$,sigmaPlayer:B,destroy:D,cspm:T})=>{const u=videojs(e,{controls:!0,muted:!0,autoplay:!0,preload:"metadata",html5:{vhs:{overrideNative:!0,cspm:T},nativeAudioTracks:!1,nativeVideoTracks:!1}});u.on("error",f=>{playerError.value=`Player Error: ${u.error().message}`,console.debug("Player Error:",u.error()),console.debug("Player Error:",f)}),u.src({src:n,type:"application/x-mpegURL"}),B.attachVideojs2(u),$("*",f=>{b.value.push(f)}),l.value=D})}const y=r("00:00:00"),p=r();function V(o){const e=Math.floor(o/3600),s=Math.floor(o%3600/60),n=o%60;return[e,s,n].map(v=>v.toString().padStart(2,"0")).join(":")}M(async()=>{S.value=await x(),d(a.value,i.value);let o=0;p.value=setInterval(()=>{o++,y.value=V(o)},1e3)}),q(()=>{p.value&&clearInterval(p.value)});function C(){l.value(),a.value=`https://cdn-lrm-test.sigma.video/manifest/origin04/scte35-video-audio-clear/master.m3u8${c}`,d(a.value,i.value)}function R(){l.value(),a.value=`https://cdn-lrm-test.sigma.video/manifest/origin04/scte35-av2s-clear/master.m3u8${c}`,d(a.value,i.value)}function E(){l.value(),a.value=`https://cdn-lrm-test.sigma.video/manifest/origin04/scte35-av4s-clear/master.m3u8${c}`,d(a.value,i.value)}function L(){l.value(),a.value=`https://cdn-lrm-test.sigma.video/manifest/origin04/scte35-av6s-clear/master.m3u8${c}`,d(a.value,i.value)}function P(){l.value(),a.value=`https://cdn-lrm-test.sigma.video/manifest/origin04/av4s-clear/master.m3u8${c}`,d(a.value,i.value)}return(o,e)=>(h(),g("div",K,[t("div",W," Time Elapsed: "+I(y.value),1),t("form",{class:"mb-4",onSubmit:N(k,["prevent"])},[t("div",X,[e[6]||(e[6]=t("label",{for:"urlInput",class:"font-medium"},"URL:",-1)),A(t("input",{id:"urlInput","onUpdate:modelValue":e[0]||(e[0]=s=>m.value=s),type:"text",class:"border rounded px-2 py-1"},null,512),[[F,m.value]]),e[7]||(e[7]=t("button",{type:"submit",class:"mt-4 rounded bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600"}," Update and Reload ",-1))])],32),t("button",{onClick:e[1]||(e[1]=()=>C())}," Videojs tách rời video và âm thanh "),t("button",{onClick:e[2]||(e[2]=()=>R())}," Videojs ts 2s "),t("button",{onClick:e[3]||(e[3]=()=>E())}," Videojs ts 4s "),t("button",{onClick:e[4]||(e[4]=()=>L())}," Videojs ts 6s "),t("button",{onClick:e[5]||(e[5]=()=>P())}," Videojs không quảng cáo "),t("div",Y,[e[9]||(e[9]=t("div",{class:"w-70%"},[t("div",{class:"aspect-ratio-video",style:{position:"relative",width:"1080px",overflow:"hidden"}},[t("video",{id:"video2",class:"video-js vjs-default-skin vjs-big-play-button vjs-fluid",controls:"",preload:"auto",width:"640",height:"360",crossorigin:"anonymous",style:{position:"absolute",inset:"0",width:"100%",height:"100%"}}),t("div",{id:"adContainer1",style:{position:"absolute",top:"0",left:"0",bottom:"0",right:"0",overflow:"hidden",width:"100%"}})])],-1)),t("div",Z,[(h(!0),g(O,null,z(b.value,(s,n)=>(h(),g("div",{key:n,class:"event-log-item"},[t("details",ee,[e[8]||(e[8]=t("summary",null,"item",-1)),t("pre",null,I(JSON.stringify(s,null,2)),1)])]))),128))])])]))}}),oe=H(te,[["__scopeId","data-v-6201f521"]]);J(oe).mount("#app");