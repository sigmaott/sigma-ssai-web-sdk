import{w as de,a as te,r as R,c as pe,e as fe,p as me,d as ge,g as he,o as ye,b as j,f as E,F as x,h as J,u as G,i as N,t as z,j as ve}from"./zoid-Bks5zh6L.js";function ne(e){return new Promise((n,o)=>{const r=document.createElement("script");r.async=!0,r.src=e,r.onload=n,r.onerror=o,document.body.appendChild(r)})}const we="https://imasdk.googleapis.com/pal/sdkloader/pal.js";let I=null;function X(){I=null}function Te(){const e=window;return e.goog&&e.goog.pal?Promise.resolve(e.goog.pal):I||(I=ne(we).then(()=>e.goog.pal),I.then(X).catch(X),I)}async function A(e){try{return{data:await e,error:null}}catch(n){return{data:null,error:n}}}function be(e,n){let o,r,s,b=!1;function h(){return!0}function w(){n.addEventListener("mousedown",T=>void t(T)),n.addEventListener("touchstart",T=>void t(T)),n.addEventListener("play",()=>{b||(m(),b=!0)}),n.addEventListener("ended",()=>void a()),n.addEventListener("error",()=>{console.log(`Video error: ${n.error.message}`),a()});const i=new e.ConsentSettings;return i.allowStorage=h(),o=new e.NonceLoader,f()}async function f(){const i=new e.NonceRequest;i.adWillAutoPlay=!0,i.adWillPlayMuted=!0,i.continuousPlayback=!1,i.descriptionUrl="https://example.com",i.iconsSupported=!0,i.playerType="Sample Player Type",i.playerVersion="1.0",i.ppid="Sample PPID",i.sessionId="Sample SID",i.supportedApiFrameworks="2,7,9",i.url="https://developers.google.com/ad-manager/pal/html5",i.videoHeight=480,i.videoWidth=640,r=o.loadNonceManager(i);const{data:T,error:P}=await A(r);return P?(console.log(`Error generating nonce: ${P}`),null):(s=T,s.getNonce())}function t(i){s&&s.sendTouch(i)}function m(){s&&s.sendPlaybackStart()}function a(){s&&s.sendPlaybackEnd()}return w()}const Ee=/"(?:_|\\u0{2}5[Ff]){2}(?:p|\\u0{2}70)(?:r|\\u0{2}72)(?:o|\\u0{2}6[Ff])(?:t|\\u0{2}74)(?:o|\\u0{2}6[Ff])(?:_|\\u0{2}5[Ff]){2}"\s*:/,ke=/"(?:c|\\u0063)(?:o|\\u006[Ff])(?:n|\\u006[Ee])(?:s|\\u0073)(?:t|\\u0074)(?:r|\\u0072)(?:u|\\u0075)(?:c|\\u0063)(?:t|\\u0074)(?:o|\\u006[Ff])(?:r|\\u0072)"\s*:/,Se=/^\s*["[{]|^\s*-?\d{1,16}(\.\d{1,17})?([Ee][+-]?\d+)?\s*$/;function _e(e,n){if(e==="__proto__"||e==="constructor"&&n&&typeof n=="object"&&"prototype"in n){Re(e);return}return n}function Re(e){console.warn(`[destr] Dropping "${e}" key to prevent prototype pollution.`)}function D(e,n={}){if(typeof e!="string")return e;const o=e.trim();if(e[0]==='"'&&e.endsWith('"')&&!e.includes("\\"))return o.slice(1,-1);if(o.length<=9){const r=o.toLowerCase();if(r==="true")return!0;if(r==="false")return!1;if(r==="undefined")return;if(r==="null")return null;if(r==="nan")return Number.NaN;if(r==="infinity")return Number.POSITIVE_INFINITY;if(r==="-infinity")return Number.NEGATIVE_INFINITY}if(!Se.test(e)){if(n.strict)throw new SyntaxError("[destr] Invalid JSON");return e}try{if(Ee.test(e)||ke.test(e)){if(n.strict)throw new Error("[destr] Possible prototype pollution");return JSON.parse(e,_e)}return JSON.parse(e)}catch(r){if(n.strict)throw r;return e}}class Ce extends Error{constructor(n,o){super(n,o),this.name="FetchError",o!=null&&o.cause&&!this.cause&&(this.cause=o.cause)}}function Pe(e){var w,f,t,m,a;const n=((w=e.error)==null?void 0:w.message)||((f=e.error)==null?void 0:f.toString())||"",o=((t=e.request)==null?void 0:t.method)||((m=e.options)==null?void 0:m.method)||"GET",r=((a=e.request)==null?void 0:a.url)||String(e.request)||"/",s=`[${o}] ${JSON.stringify(r)}`,_=e.response?`${e.response.status} ${e.response.statusText}`:"<no response>",b=`${s}: ${_}${n?` ${n}`:""}`,h=new Ce(b,e.error?{cause:e.error}:void 0);for(const i of["request","options","response"])Object.defineProperty(h,i,{get(){return e[i]}});for(const[i,T]of[["data","_data"],["status","status"],["statusCode","status"],["statusText","statusText"],["statusMessage","statusText"]])Object.defineProperty(h,i,{get(){return e.response&&e.response[T]}});return h}const Le=new Set(Object.freeze(["PATCH","POST","PUT","DELETE"]));function K(e="GET"){return Le.has(e.toUpperCase())}function Fe(e){if(e===void 0)return!1;const n=typeof e;return n==="string"||n==="number"||n==="boolean"||n===null?!0:n!=="object"?!1:Array.isArray(e)?!0:e.buffer?!1:e.constructor&&e.constructor.name==="Object"||typeof e.toJSON=="function"}const $e=new Set(["image/svg","application/xml","application/xhtml","application/html"]),Ae=/^application\/(?:[\w!#$%&*.^`~-]*\+)?json(;.+)?$/i;function Ie(e=""){if(!e)return"json";const n=e.split(";").shift()||"";return Ae.test(n)?"json":$e.has(n)||n.startsWith("text/")?"text":"blob"}function Oe(e,n,o=globalThis.Headers){const r={...n,...e};if(n!=null&&n.params&&(e!=null&&e.params)&&(r.params={...n==null?void 0:n.params,...e==null?void 0:e.params}),n!=null&&n.query&&(e!=null&&e.query)&&(r.query={...n==null?void 0:n.query,...e==null?void 0:e.query}),n!=null&&n.headers&&(e!=null&&e.headers)){r.headers=new o((n==null?void 0:n.headers)||{});for(const[s,_]of new o((e==null?void 0:e.headers)||{}))r.headers.set(s,_)}return r}const je=new Set([408,409,425,429,500,502,503,504]),Ne=new Set([101,204,205,304]);function oe(e={}){const{fetch:n=globalThis.fetch,Headers:o=globalThis.Headers,AbortController:r=globalThis.AbortController}=e;async function s(h){const w=h.error&&h.error.name==="AbortError"&&!h.options.timeout||!1;if(h.options.retry!==!1&&!w){let t;typeof h.options.retry=="number"?t=h.options.retry:t=K(h.options.method)?0:1;const m=h.response&&h.response.status||500;if(t>0&&(Array.isArray(h.options.retryStatusCodes)?h.options.retryStatusCodes.includes(m):je.has(m))){const a=h.options.retryDelay||0;return a>0&&await new Promise(i=>setTimeout(i,a)),_(h.request,{...h.options,retry:t-1})}}const f=Pe(h);throw Error.captureStackTrace&&Error.captureStackTrace(f,_),f}const _=async function(w,f={}){var i;const t={request:w,options:Oe(f,e.defaults,o),response:void 0,error:void 0};t.options.method=(i=t.options.method)==null?void 0:i.toUpperCase(),t.options.onRequest&&await t.options.onRequest(t),typeof t.request=="string"&&(t.options.baseURL&&(t.request=de(t.request,t.options.baseURL)),(t.options.query||t.options.params)&&(t.request=te(t.request,{...t.options.params,...t.options.query}))),t.options.body&&K(t.options.method)&&(Fe(t.options.body)?(t.options.body=typeof t.options.body=="string"?t.options.body:JSON.stringify(t.options.body),t.options.headers=new o(t.options.headers||{}),t.options.headers.has("content-type")||t.options.headers.set("content-type","application/json"),t.options.headers.has("accept")||t.options.headers.set("accept","application/json")):("pipeTo"in t.options.body&&typeof t.options.body.pipeTo=="function"||typeof t.options.body.pipe=="function")&&("duplex"in t.options||(t.options.duplex="half")));let m;if(!t.options.signal&&t.options.timeout){const T=new r;m=setTimeout(()=>T.abort(),t.options.timeout),t.options.signal=T.signal}try{t.response=await n(t.request,t.options)}catch(T){return t.error=T,t.options.onRequestError&&await t.options.onRequestError(t),await s(t)}finally{m&&clearTimeout(m)}if(t.response.body&&!Ne.has(t.response.status)&&t.options.method!=="HEAD"){const T=(t.options.parseResponse?"json":t.options.responseType)||Ie(t.response.headers.get("content-type")||"");switch(T){case"json":{const P=await t.response.text(),$=t.options.parseResponse||D;t.response._data=$(P);break}case"stream":{t.response._data=t.response.body;break}default:t.response._data=await t.response[T]()}}return t.options.onResponse&&await t.options.onResponse(t),!t.options.ignoreResponseError&&t.response.status>=400&&t.response.status<600?(t.options.onResponseError&&await t.options.onResponseError(t),await s(t)):t.response},b=async function(w,f){return(await _(w,f))._data};return b.raw=_,b.native=(...h)=>n(...h),b.create=(h={})=>oe({...e,defaults:{...e.defaults,...h}}),b}const V=function(){if(typeof globalThis<"u")return globalThis;if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("unable to locate global object")}(),Me=V.fetch||(()=>Promise.reject(new Error("[ofetch] global.fetch is not supported!"))),qe=V.Headers,Ue=V.AbortController,re=oe({fetch:Me,Headers:qe,AbortController:Ue}),se=re,M=re.create({credentials:"omit",onResponseError({response:e,error:n}){console.log("[LOG] ~ error:",n)},onRequest:({options:e,request:n})=>{const o=e.token;o&&(e.headers=e.headers||{},e.headers.Authorization=`${o}`)},onResponse({response:e,options:n}){}}),He=e=>(n,o)=>(e.set(n,o),o),Y=Number.MAX_SAFE_INTEGER===void 0?9007199254740991:Number.MAX_SAFE_INTEGER,ie=536870912,Q=ie*2,De=(e,n)=>o=>{const r=n.get(o);let s=r===void 0?o.size:r<Q?r+1:0;if(!o.has(s))return e(o,s);if(o.size<ie){for(;o.has(s);)s=Math.floor(Math.random()*Q);return e(o,s)}if(o.size>Y)throw new Error("Congratulations, you created a collection of unique numbers which uses all available integers!");for(;o.has(s);)s=Math.floor(Math.random()*Y);return e(o,s)},ae=new WeakMap,Ve=He(ae),q=De(Ve,ae),Be=e=>e.method!==void 0&&e.method==="call",We=e=>typeof e.id=="number"&&typeof e.result=="boolean",xe=e=>{const n=new Map([[0,()=>{}]]),o=new Map([[0,()=>{}]]),r=new Map,s=new Worker(e);return s.addEventListener("message",({data:f})=>{if(Be(f)){const{params:{timerId:t,timerType:m}}=f;if(m==="interval"){const a=n.get(t);if(typeof a===void 0)throw new Error("The timer is in an undefined state.");if(typeof a=="number"){const i=r.get(a);if(i===void 0||i.timerId!==t||i.timerType!==m)throw new Error("The timer is in an undefined state.")}else typeof a=="function"&&a()}else if(m==="timeout"){const a=o.get(t);if(typeof a===void 0)throw new Error("The timer is in an undefined state.");if(typeof a=="number"){const i=r.get(a);if(i===void 0||i.timerId!==t||i.timerType!==m)throw new Error("The timer is in an undefined state.")}else typeof a=="function"&&(a(),o.delete(t))}}else if(We(f)){const{id:t}=f,m=r.get(t);if(m===void 0)throw new Error("The timer is in an undefined state.");const{timerId:a,timerType:i}=m;r.delete(t),i==="interval"?n.delete(a):o.delete(a)}else{const{error:{message:t}}=f;throw new Error(t)}}),{clearInterval:f=>{if(typeof n.get(f)=="function"){const t=q(r);r.set(t,{timerId:f,timerType:"interval"}),n.set(f,t),s.postMessage({id:t,method:"clear",params:{timerId:f,timerType:"interval"}})}},clearTimeout:f=>{if(typeof o.get(f)=="function"){const t=q(r);r.set(t,{timerId:f,timerType:"timeout"}),o.set(f,t),s.postMessage({id:t,method:"clear",params:{timerId:f,timerType:"timeout"}})}},setInterval:(f,t=0,...m)=>{const a=q(n);return n.set(a,()=>{f(...m),typeof n.get(a)=="function"&&s.postMessage({id:null,method:"set",params:{delay:t,now:performance.timeOrigin+performance.now(),timerId:a,timerType:"interval"}})}),s.postMessage({id:null,method:"set",params:{delay:t,now:performance.timeOrigin+performance.now(),timerId:a,timerType:"interval"}}),a},setTimeout:(f,t=0,...m)=>{const a=q(o);return o.set(a,()=>f(...m)),s.postMessage({id:null,method:"set",params:{delay:t,now:performance.timeOrigin+performance.now(),timerId:a,timerType:"timeout"}}),a}}},Je=(e,n)=>{let o=null;return()=>{if(o!==null)return o;const r=new Blob([n],{type:"application/javascript; charset=utf-8"}),s=URL.createObjectURL(r);return o=e(s),setTimeout(()=>URL.revokeObjectURL(s)),o}},Ge=`(()=>{"use strict";const e=new Map,t=new Map,r=t=>{const r=e.get(t);return void 0!==r&&(clearTimeout(r),e.delete(t),!0)},s=e=>{const r=t.get(e);return void 0!==r&&(clearTimeout(r),t.delete(e),!0)},o=(e,t)=>{const r=performance.now(),s=e+t-r-performance.timeOrigin;return{expected:r+s,remainingDelay:s}},i=(e,t,r,s)=>{const o=r-performance.now();o>0?e.set(t,setTimeout(i,o,e,t,r,s)):(e.delete(t),postMessage({id:null,method:"call",params:{timerId:t,timerType:s}}))};addEventListener("message",(n=>{let{data:a}=n;try{if("clear"===a.method){const{id:e,params:{timerId:t,timerType:o}}=a;if("interval"===o)postMessage({id:e,result:r(t)});else{if("timeout"!==o)throw new Error('The given type "'.concat(o,'" is not supported'));postMessage({id:e,result:s(t)})}}else{if("set"!==a.method)throw new Error('The given method "'.concat(a.method,'" is not supported'));{const{params:{delay:r,now:s,timerId:n,timerType:m}}=a;if("interval"===m)((t,r,s)=>{const{expected:n,remainingDelay:a}=o(t,s);e.set(r,setTimeout(i,a,e,r,n,"interval"))})(r,n,s);else{if("timeout"!==m)throw new Error('The given type "'.concat(m,'" is not supported'));((e,r,s)=>{const{expected:n,remainingDelay:a}=o(e,s);t.set(r,setTimeout(i,a,t,r,n,"timeout"))})(r,n,s)}}}}catch(e){postMessage({error:{message:e.message},id:a.id,result:null})}}))})();`,ze=Je(xe,Ge),Xe=(...e)=>ze().setTimeout(...e);function Ke(){const e=new Set,n=s=>{e.delete(s)};return{on:s=>(e.add(s),{off:()=>n(s)}),off:n,trigger:(...s)=>Promise.all(Array.from(e).map(_=>_(...s)))}}function Ye({video:e,adContainer:n,trackingUrl:o,interval:r,startSession:s}){const _=R(o);R({}),R(),R(r||1e3),R();const b=Ke(),h=R(!1),w=R(),f=Math.random().toString(36).slice(6);function t({icons:g}){return{id:f,appConfig:{sdkBaseUrl:te("https://cdn.jsdelivr.net/gh/sigmaott/sigma-ssai-web-sdk/v1/build/dist/wta/index.html",{id:f})},icons:g}}const m=pe(t({icons:[]}));m.render(n),m.hide(),n.style.display="none",fe(()=>{var g;if(w.value){const d=((g=w.value)==null?void 0:g.icons)||[];n.style.display="block",m.updateProps(t({icons:d})),m.show()}else n.style.display="none",m.hide()});const a=R([]),i=R(),T=R([]);async function P(g){var p;const d=(p=w.value)==null?void 0:p.trackingEvents.find(S=>S.eventType===g);d&&(b.trigger(d),await Promise.all(d.beaconUrls.map(S=>A(M(S)))))}function $(){return h.value=!1,["fullscreenchange","webkitfullscreenchange","mozfullscreenchange","msfullscreenchange"].forEach(g=>{e.addEventListener(g,()=>{const d=document.fullscreenElement||document.webkitFullscreenElement||document.mozFullScreenElement||document.msFullscreenElement;P(d?"fullscreen":"exitFullscreen")})}),e.addEventListener("pause",()=>{P("pause")}),e.addEventListener("play",()=>{P("resume")}),e.addEventListener("rewind",()=>{P("rewind")}),e.addEventListener("mute",()=>{P("mute")}),e.addEventListener("unmute",()=>{P("unmute")}),async(g,d)=>{if(i.value=d.frag.sn,!g!==window.Hls.Events.FRAG_CHANGED){for(const p of a.value)if(p.sn===d.frag.sn)for(const k of T.value){if(k.tracked)continue;w.value=k,s(k.adVerifications,b);const C=k.trackingEvents.find(v=>v.eventType===p.value.event);C&&Xe(async()=>{if(p.value.event==="start"){const v=k.trackingEvents.find(F=>F.eventType==="impression");v&&(b.trigger(v),await Promise.all(v.beaconUrls.map(F=>A(M(F)))))}b.trigger(C),await Promise.all(C.beaconUrls.map(v=>A(M(v)))),p.value.event==="complete"&&(w.value=void 0,a.value=[],k.tracked=!0)},p.time*1e3)}}}}function y(){A(se(_.value)).then(({data:g,error:d})=>{if(d){console.error("Cannot get tracking data",d);return}for(const p of(g==null?void 0:g.avails)||[])for(const S of p.ads){const k=`${p.id}_${S.id}_${S.startTimeInSeconds}`;T.value.find(v=>v.key===k)||T.value.push({...S,key:k,tracked:!1})}})}function l(){return async(g,d)=>{function p(C){for(let v=0;v<C.length;v++)if(C[v]===0)return v;return C.length}const{start:S,sn:k}=d.frag;for(let C=0;C<d.samples.length;C++){const v=d.samples[C],F=v.data,U=v.pts;if(String.fromCharCode.apply(null,F.slice(0,3))!=="ID3"||String.fromCharCode.apply(null,F.slice(10,14))!=="TXXX")continue;const H=F.slice(21,F.length),ce=p(H),B=H.slice(ce+1,H.length),le=p(B),ue=new TextDecoder("utf-8").decode(B.slice(0,le)),W={sn:k,time:U-S,value:D(ue)};if(i.value&&k<i.value)return;a.value.push(W),W.value.event==="start"&&y()}}}function u(){return g=>{const d=g.track;d.kind==="metadata"&&(y(),d.on("cuechange",async()=>{const p=d.activeCues[0];if(p&&p.value.data){const S=D(p.value.data);for(const k of T.value){if(k.tracked)continue;w.value=k,s(k.adVerifications,b);const C=k.trackingEvents.find(v=>v.eventType===S.event);if(C){if(S.event==="start"){const v=k.trackingEvents.find(F=>F.eventType==="impression");v&&(b.trigger(v),await Promise.all(v.beaconUrls.map(F=>A(M(F)))))}b.trigger(C),await Promise.all(C.beaconUrls.map(v=>A(M(v)))),S.event==="complete"&&(w.value=void 0)}}}}))}}function c(g,d){b.on(p=>{(g==="*"||p.eventType===g)&&d(p)})}function L(){w.value=void 0,a.value=[]}return{destroy:L,onEventTracking:c,hlsHelper:{createHlsFragChanged:$,createHlsFragParsingMetadata:l},videojsHelper:{createVideojsAddTrack:u}}}async function Z({video:e,adContainer:n,url:o}){const r=await Te();async function s({url:u}){const c=me(u),L=await be(r,e);if(!L)throw console.error("nonce is null"),new Error("nonce is null");const g=`${c.protocol}//${c.host}`,{data:d,error:p}=await A(se(`${g}${c.pathname}`,{params:{"play_params.nonce":L}}));if(p||!d)throw console.error(p),new Error(p);const S=`${g}${d.manifestUrl}`,k=`${g}${d.trackingUrl}`;return{manifestUrl:S,trackingUrl:k}}const{manifestUrl:_,trackingUrl:b}=await s({url:o});function h(){}const{onEventTracking:w,destroy:f,videojsHelper:t,hlsHelper:m}=Ye({video:e,adContainer:n,trackingUrl:b,startSession:h}),a=R(),i=R();function T(u){a.value=u;const c=m.createHlsFragChanged(),L=m.createHlsFragParsingMetadata();u.on("hlsFragChanged",c),u.on("hlsFragParsingMetadata",L),i.value=()=>{u.off("hlsFragChanged",c),u.off("hlsFragParsingMetadata",L)}}const P=R(),$=R();function y(u){P.value=u;const c=t.createVideojsAddTrack();u.textTracks().on("addtrack",c),$.value=()=>{u.textTracks().off("addtrack",c)}}function l(){var u,c;f(),(u=i.value)==null||u.call(i),(c=$.value)==null||c.call($)}return{manifestUrl:_,onEventTracking:w,destroy:l,sigmaPlayer:{attachVideojs:y,attachHls:T}}}const Qe="https://cdn.jsdelivr.net/npm/hls.js@latest";let O=null;function ee(){O=null}function Ze(){const e=window;return e.Hls?Promise.resolve(e.Hls):O||(O=ne(Qe).then(()=>e.Hls),O.then(ee).catch(ee),O)}const et={class:"container"},tt={class:""},nt={class:"w-30%"},ot={open:""},rt={class:""},st={class:"w-30%"},it={open:""},at=ge({__name:"App",setup(e){const n=R([]),o=R([]),r=he(window.location.href).url,s=R();function _(){return new Promise((y,l)=>{const u=indexedDB.open("TrackingLogDB",1);u.onerror=c=>l(`IndexedDB error: ${c.target.error}`),u.onsuccess=c=>y(c.target.result),u.onupgradeneeded=c=>{c.target.result.createObjectStore("trackingLog",{keyPath:"id",autoIncrement:!0})}})}function b(y){const u=s.value.transaction(["trackingLog"],"readwrite").objectStore("trackingLog"),c={...y,timestamp:new Date().toISOString(),beaconUrls:y.beaconUrls.join(",")};u.add(c)}async function h(y){return new Promise((l,u)=>{const g=s.value.transaction(["trackingLog"],"readonly").objectStore("trackingLog").getAll();g.onerror=()=>u(g.error),g.onsuccess=()=>{const d=g.result.filter(p=>p.type===y);l(d)}})}async function w(y){try{const l=await h(y),u=f(l);let c="",L=0;u.forEach((S,k)=>{L++,c+=`Session ${k+1}:
`,c+=`Total events in session: ${S.length}

`,S.forEach((C,v)=>{c+=Object.entries(C).map(([F,U])=>`  ${F}: ${t(U)}`).join(`
`),c+=`
`,v<S.length-1&&(c+=`  --------
`)}),c+=`========================================

`}),c+=`Total number of sessions: ${L}
`;const g=new Blob([c],{type:"text/plain"}),d=URL.createObjectURL(g),p=document.createElement("a");p.href=d,p.download=`${y}_logs_${new Date().toISOString()}.txt`,document.body.appendChild(p),p.click(),document.body.removeChild(p),URL.revokeObjectURL(d)}catch(l){console.error("Error downloading logs:",l)}}function f(y){const l=[];let u=[];return y.forEach(c=>{c.eventType==="impression"?(u.length>0&&l.push(u),u=[c]):(u.push(c),c.eventType==="complete"&&(l.push(u),u=[]))}),u.length>0&&l.push(u),l}function t(y){return Array.isArray(y)?`[${y.map(l=>`"${l}"`).join(", ")}]`:typeof y=="string"?`"${y}"`:JSON.stringify(y)}const m=R();function a(){const y=document.querySelector("#video1"),l=document.querySelector("#adContainer1");console.log("[LOG] ~ adContainer:",l),Z({video:y,adContainer:l,url:r}).then(({onEventTracking:u,manifestUrl:c,sigmaPlayer:L,destroy:g})=>{if(Hls.isSupported()){const d=new Hls;d.loadSource(c),d.attachMedia(y),L.attachHls(d),u("*",p=>{n.value.push(p),b({type:"video1",...p})}),m.value=g}})}const i=R();function T(){const y=document.querySelector("#video2"),l=document.querySelector("#adContainer2");Z({video:y,adContainer:l,url:r}).then(({onEventTracking:u,manifestUrl:c,sigmaPlayer:L,destroy:g})=>{const d=videojs(y);d.src({src:c,type:"application/x-mpegURL"}),L.attachVideojs(d),u("*",p=>{o.value.push(p)}),i.value=g})}ye(async()=>{await Ze(),s.value=await _(),a(),T()});function P(){m.value(),a()}function $(){i.value(),T()}return(y,l)=>(N(),j("div",et,[E("button",{onClick:l[0]||(l[0]=()=>w("video1"))}," Download Video 1 Logs "),E("button",{onClick:l[1]||(l[1]=()=>w("video2"))}," Download Video 2 Logs "),E("button",{onClick:l[2]||(l[2]=()=>P())}," Reload Session "),E("button",{onClick:l[3]||(l[3]=()=>$())}," Reload Session 2 "),E("button",{onClick:l[4]||(l[4]=()=>a())}," Start Video 1 "),E("div",tt,[l[6]||(l[6]=E("div",{class:"w-70%"},[E("div",{class:"aspect-ratio-video",style:{position:"relative",width:"720px",overflow:"hidden"}},[E("video",{id:"video1",muted:"",controls:"",playsinline:"",preload:"auto",style:{position:"absolute",inset:"0",width:"100%",height:"100%"}}),E("div",{id:"adContainer1",style:{position:"absolute",top:"0",left:"0",bottom:"0",right:"0",overflow:"hidden",width:"100%"}})])],-1)),E("div",nt,[(N(!0),j(x,null,J(G(n),(u,c)=>(N(),j("div",{key:c,class:"event-log-item"},[E("details",ot,[l[5]||(l[5]=E("summary",null,"item",-1)),E("pre",null,z(JSON.stringify(u,null,2)),1)])]))),128))])]),E("div",rt,[l[8]||(l[8]=E("div",{class:"w-70%"},[E("div",{class:"aspect-ratio-video",style:{position:"relative",width:"720px",overflow:"hidden"}},[E("video",{id:"video2",class:"video-js",muted:"",controls:"",playsinline:"",preload:"auto",style:{position:"absolute",inset:"0",width:"100%",height:"100%"}}),E("div",{id:"adContainer2",style:{position:"absolute",top:"0",left:"0",bottom:"0",right:"0",overflow:"hidden",width:"100%"}})])],-1)),E("div",st,[(N(!0),j(x,null,J(G(o),(u,c)=>(N(),j("div",{key:c,class:"event-log-item"},[E("details",it,[l[7]||(l[7]=E("summary",null,"item",-1)),E("pre",null,z(JSON.stringify(u,null,2)),1)])]))),128))])])]))}}),ct=(e,n)=>{const o=e.__vccOpts||e;for(const[r,s]of n)o[r]=s;return o},lt=ct(at,[["__scopeId","data-v-653a524b"]]);ve(lt).mount("#app");
