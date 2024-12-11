import{d as A,r as i,g as D,o as F,c as I,a as t,w as u,v as p,u as a,i as M,b as E,F as H,e as O,f as w,t as T,h as q}from"./index-iyQ0fk6r.js";import{c as N}from"./sdk-D9lmvOuh.js";import{l as W}from"./loadScript-wOdhQs3s.js";import{_ as $}from"./export-helper-DlAUqK2U.js";import"./zoid-DaRsBbJ-.js";const G="https://cdn.jsdelivr.net/npm/hls.js@latest";let m=null;function P(){m=null}function J(){const c=window;return c.Hls?Promise.resolve(c.Hls):m||(m=W(G).then(()=>c.Hls),m.then(P).catch(P),m)}const Q={class:"container"},z={class:"flex flex-col space-y-2"},K={class:"mt-4 flex flex-col space-y-2"},X={class:""},Y={class:"w-30%"},Z={open:""},_="https://sdrm-test.gviet.vn:9080/static/ssai/lib/web/SigmaManager_3.0.0.min.js",ee=A({__name:"App",setup(c){const v=i([]);i([]);const b=D(window.location.href).url,y=D(window.location.href).adsUrl,h=i();function k(){return new Promise((s,e)=>{const n=indexedDB.open("TrackingLogDB",1);n.onerror=o=>e(`IndexedDB error: ${o.target.error}`),n.onsuccess=o=>s(o.target.result),n.onupgradeneeded=o=>{o.target.result.createObjectStore("trackingLog",{keyPath:"id",autoIncrement:!0})}})}function L(s){const n=h.value.transaction(["trackingLog"],"readwrite").objectStore("trackingLog"),o={...s,timestamp:new Date().toISOString(),beaconUrls:s.beaconUrls.join(",")};n.add(o)}const B=i();function V(s){return new Promise((e,n)=>{const o=document.createElement("script");o.async=!0,o.src=s,o.onload=e,o.onerror=n,document.body.appendChild(o)})}let l=null;function S(){l=null}function j(){return window.SigmaManager?Promise.resolve(window.SigmaManager):l||(l=V(_).then(()=>window.SigmaManager),l.then(S).catch(S),l)}const g=i(b),f=i(y),r=i({merchantId:"",appId:"",sessionId:"",userId:""});function C(){const s=new URL(window.location.href);s.searchParams.set("url",g.value),s.searchParams.set("adsUrl",f.value),Object.entries(r.value).forEach(([e,n])=>{s.searchParams.set(`drm_${e}`,n)}),window.location.href=s.toString()}function R(){const s=document.querySelector("#video1"),e=document.querySelector("#adContainer1");N({video:s,adContainer:e,adsUrl:y}).then(async({onEventTracking:n,sigmaPlayer:o,destroy:x})=>{const d=window.sigmaManager||new window.SigmaManager;window.sigmaManager=d,d.config={enableWorker:!0},d.mediaElm=s,d.nativeClient={module:"sigma_drm.js",wasmBaseUrl:"https://dev-streaming.gviet.vn:8783/micro/cms/sdk-dai/dist/drm/"},d.appInfo={browser:"Google-Chrome",merchantId:r.value.merchantId,appId:r.value.appId,sessionId:r.value.sessionId,userId:r.value.userId},d.loadSource(b,{method:"sigma"}),d.on("hlsManifestParsed",async()=>{o.attachSigmaDrm(d),s.play()}),n("*",U=>{v.value.push(U),L({type:"video1",...U})}),B.value=x})}return i(),F(async()=>{await j(),await J(),h.value=await k(),R();const s=new URLSearchParams(window.location.search);r.value={merchantId:s.get("drm_merchantId")||"",appId:s.get("drm_appId")||"",sessionId:s.get("drm_sessionId")||"",userId:s.get("drm_userId")||""}}),(s,e)=>(w(),I("div",Q,[t("form",{class:"mb-4",onSubmit:E(C,["prevent"])},[t("div",z,[e[11]||(e[11]=t("label",{for:"urlInput",class:"font-medium"},"URL:",-1)),u(t("input",{id:"urlInput","onUpdate:modelValue":e[0]||(e[0]=n=>M(g)?g.value=n:null),type:"text",class:"border rounded px-2 py-1"},null,512),[[p,a(g)]]),e[12]||(e[12]=t("label",{for:"adsUrlInput",class:"font-medium"},"Ads URL:",-1)),u(t("input",{id:"adsUrlInput","onUpdate:modelValue":e[1]||(e[1]=n=>M(f)?f.value=n:null),type:"text",class:"border rounded px-2 py-1"},null,512),[[p,a(f)]]),t("div",K,[e[6]||(e[6]=t("h3",{class:"font-medium"}," DRM Settings: ",-1)),e[7]||(e[7]=t("label",{for:"merchantId",class:"font-medium"},"Merchant ID:",-1)),u(t("input",{id:"merchantId","onUpdate:modelValue":e[2]||(e[2]=n=>a(r).merchantId=n),type:"text",class:"border rounded px-2 py-1"},null,512),[[p,a(r).merchantId]]),e[8]||(e[8]=t("label",{for:"appId",class:"font-medium"},"App ID:",-1)),u(t("input",{id:"appId","onUpdate:modelValue":e[3]||(e[3]=n=>a(r).appId=n),type:"text",class:"border rounded px-2 py-1"},null,512),[[p,a(r).appId]]),e[9]||(e[9]=t("label",{for:"sessionId",class:"font-medium"},"Session ID:",-1)),u(t("input",{id:"sessionId","onUpdate:modelValue":e[4]||(e[4]=n=>a(r).sessionId=n),type:"text",class:"border rounded px-2 py-1"},null,512),[[p,a(r).sessionId]]),e[10]||(e[10]=t("label",{for:"userId",class:"font-medium"},"User ID:",-1)),u(t("input",{id:"userId","onUpdate:modelValue":e[5]||(e[5]=n=>a(r).userId=n),type:"text",class:"border rounded px-2 py-1"},null,512),[[p,a(r).userId]])]),e[13]||(e[13]=t("button",{type:"submit",class:"mt-4 rounded bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600"}," Update and Reload ",-1))])],32),t("div",X,[e[15]||(e[15]=t("div",{class:"w-70%"},[t("div",{class:"aspect-ratio-video",style:{position:"relative",width:"720px",overflow:"hidden"}},[t("video",{id:"video1",muted:"",controls:"",playsinline:"",preload:"auto",style:{position:"absolute",inset:"0",width:"100%",height:"100%"}}),t("div",{id:"adContainer1",style:{position:"absolute",top:"0",left:"0",bottom:"0",right:"0",overflow:"hidden",width:"100%"}})])],-1)),t("div",Y,[(w(!0),I(H,null,O(a(v),(n,o)=>(w(),I("div",{key:o,class:"event-log-item"},[t("details",Z,[e[14]||(e[14]=t("summary",null,"item",-1)),t("pre",null,T(JSON.stringify(n,null,2)),1)])]))),128))])])]))}}),te=$(ee,[["__scopeId","data-v-bd0cb817"]]);q(te).mount("#app");
