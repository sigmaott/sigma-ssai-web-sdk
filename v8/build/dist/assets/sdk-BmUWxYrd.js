import{k as oe,l as C,r as M,m as ie,p as ae,g as ce,n as ue}from"./index-iyQ0fk6r.js";import{c as le}from"./zoid-DaRsBbJ-.js";import{l as de}from"./loadScript-wOdhQs3s.js";const fe=/"(?:_|\\u0{2}5[Ff]){2}(?:p|\\u0{2}70)(?:r|\\u0{2}72)(?:o|\\u0{2}6[Ff])(?:t|\\u0{2}74)(?:o|\\u0{2}6[Ff])(?:_|\\u0{2}5[Ff]){2}"\s*:/,pe=/"(?:c|\\u0063)(?:o|\\u006[Ff])(?:n|\\u006[Ee])(?:s|\\u0073)(?:t|\\u0074)(?:r|\\u0072)(?:u|\\u0075)(?:c|\\u0063)(?:t|\\u0074)(?:o|\\u006[Ff])(?:r|\\u0072)"\s*:/,he=/^\s*["[{]|^\s*-?\d{1,16}(\.\d{1,17})?([Ee][+-]?\d+)?\s*$/;function me(e,r){if(e==="__proto__"||e==="constructor"&&r&&typeof r=="object"&&"prototype"in r){ge(e);return}return r}function ge(e){console.warn(`[destr] Dropping "${e}" key to prevent prototype pollution.`)}function D(e,r={}){if(typeof e!="string")return e;const n=e.trim();if(e[0]==='"'&&e.endsWith('"')&&!e.includes("\\"))return n.slice(1,-1);if(n.length<=9){const s=n.toLowerCase();if(s==="true")return!0;if(s==="false")return!1;if(s==="undefined")return;if(s==="null")return null;if(s==="nan")return Number.NaN;if(s==="infinity")return Number.POSITIVE_INFINITY;if(s==="-infinity")return Number.NEGATIVE_INFINITY}if(!he.test(e)){if(r.strict)throw new SyntaxError("[destr] Invalid JSON");return e}try{if(fe.test(e)||pe.test(e)){if(r.strict)throw new Error("[destr] Possible prototype pollution");return JSON.parse(e,me)}return JSON.parse(e)}catch(s){if(r.strict)throw s;return e}}class ye extends Error{constructor(r,n){super(r,n),this.name="FetchError",n!=null&&n.cause&&!this.cause&&(this.cause=n.cause)}}function we(e){var d,c,t,m,l;const r=((d=e.error)==null?void 0:d.message)||((c=e.error)==null?void 0:c.toString())||"",n=((t=e.request)==null?void 0:t.method)||((m=e.options)==null?void 0:m.method)||"GET",s=((l=e.request)==null?void 0:l.url)||String(e.request)||"/",o=`[${n}] ${JSON.stringify(s)}`,u=e.response?`${e.response.status} ${e.response.statusText}`:"<no response>",i=`${o}: ${u}${r?` ${r}`:""}`,a=new ye(i,e.error?{cause:e.error}:void 0);for(const g of["request","options","response"])Object.defineProperty(a,g,{get(){return e[g]}});for(const[g,T]of[["data","_data"],["status","status"],["statusCode","status"],["statusText","statusText"],["statusMessage","statusText"]])Object.defineProperty(a,g,{get(){return e.response&&e.response[T]}});return a}const Te=new Set(Object.freeze(["PATCH","POST","PUT","DELETE"]));function B(e="GET"){return Te.has(e.toUpperCase())}function ve(e){if(e===void 0)return!1;const r=typeof e;return r==="string"||r==="number"||r==="boolean"||r===null?!0:r!=="object"?!1:Array.isArray(e)?!0:e.buffer?!1:e.constructor&&e.constructor.name==="Object"||typeof e.toJSON=="function"}const Ee=new Set(["image/svg","application/xml","application/xhtml","application/html"]),be=/^application\/(?:[\w!#$%&*.^`~-]*\+)?json(;.+)?$/i;function Re(e=""){if(!e)return"json";const r=e.split(";").shift()||"";return be.test(r)?"json":Ee.has(r)||r.startsWith("text/")?"text":"blob"}function _e(e,r,n=globalThis.Headers){const s={...r,...e};if(r!=null&&r.params&&(e!=null&&e.params)&&(s.params={...r==null?void 0:r.params,...e==null?void 0:e.params}),r!=null&&r.query&&(e!=null&&e.query)&&(s.query={...r==null?void 0:r.query,...e==null?void 0:e.query}),r!=null&&r.headers&&(e!=null&&e.headers)){s.headers=new n((r==null?void 0:r.headers)||{});for(const[o,u]of new n((e==null?void 0:e.headers)||{}))s.headers.set(o,u)}return s}const ke=new Set([408,409,425,429,500,502,503,504]),Se=new Set([101,204,205,304]);function Y(e={}){const{fetch:r=globalThis.fetch,Headers:n=globalThis.Headers,AbortController:s=globalThis.AbortController}=e;async function o(a){const d=a.error&&a.error.name==="AbortError"&&!a.options.timeout||!1;if(a.options.retry!==!1&&!d){let t;typeof a.options.retry=="number"?t=a.options.retry:t=B(a.options.method)?0:1;const m=a.response&&a.response.status||500;if(t>0&&(Array.isArray(a.options.retryStatusCodes)?a.options.retryStatusCodes.includes(m):ke.has(m))){const l=a.options.retryDelay||0;return l>0&&await new Promise(g=>setTimeout(g,l)),u(a.request,{...a.options,retry:t-1})}}const c=we(a);throw Error.captureStackTrace&&Error.captureStackTrace(c,u),c}const u=async function(d,c={}){var g;const t={request:d,options:_e(c,e.defaults,n),response:void 0,error:void 0};t.options.method=(g=t.options.method)==null?void 0:g.toUpperCase(),t.options.onRequest&&await t.options.onRequest(t),typeof t.request=="string"&&(t.options.baseURL&&(t.request=oe(t.request,t.options.baseURL)),(t.options.query||t.options.params)&&(t.request=C(t.request,{...t.options.params,...t.options.query}))),t.options.body&&B(t.options.method)&&(ve(t.options.body)?(t.options.body=typeof t.options.body=="string"?t.options.body:JSON.stringify(t.options.body),t.options.headers=new n(t.options.headers||{}),t.options.headers.has("content-type")||t.options.headers.set("content-type","application/json"),t.options.headers.has("accept")||t.options.headers.set("accept","application/json")):("pipeTo"in t.options.body&&typeof t.options.body.pipeTo=="function"||typeof t.options.body.pipe=="function")&&("duplex"in t.options||(t.options.duplex="half")));let m;if(!t.options.signal&&t.options.timeout){const T=new s;m=setTimeout(()=>T.abort(),t.options.timeout),t.options.signal=T.signal}try{t.response=await r(t.request,t.options)}catch(T){return t.error=T,t.options.onRequestError&&await t.options.onRequestError(t),await o(t)}finally{m&&clearTimeout(m)}if(t.response.body&&!Se.has(t.response.status)&&t.options.method!=="HEAD"){const T=(t.options.parseResponse?"json":t.options.responseType)||Re(t.response.headers.get("content-type")||"");switch(T){case"json":{const k=await t.response.text(),N=t.options.parseResponse||D;t.response._data=N(k);break}case"stream":{t.response._data=t.response.body;break}default:t.response._data=await t.response[T]()}}return t.options.onResponse&&await t.options.onResponse(t),!t.options.ignoreResponseError&&t.response.status>=400&&t.response.status<600?(t.options.onResponseError&&await t.options.onResponseError(t),await o(t)):t.response},i=async function(d,c){return(await u(d,c))._data};return i.raw=u,i.native=(...a)=>r(...a),i.create=(a={})=>Y({...e,defaults:{...e.defaults,...a}}),i}const G=function(){if(typeof globalThis<"u")return globalThis;if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("unable to locate global object")}(),Oe=G.fetch||(()=>Promise.reject(new Error("[ofetch] global.fetch is not supported!"))),Me=G.Headers,Ae=G.AbortController,Fe=Y({fetch:Oe,Headers:Me,AbortController:Ae}),Le=Fe.create({credentials:"omit",onResponseError({response:e,error:r}){console.log("[LOG] ~ error:",r)},onRequest:({options:e,request:r})=>{const n=e.token;n&&(e.headers=e.headers||{},e.headers.Authorization=`${n}`)},onResponse({response:e,options:r}){}}),Ie=e=>(r,n)=>(e.set(r,n),n),J=Number.MAX_SAFE_INTEGER===void 0?9007199254740991:Number.MAX_SAFE_INTEGER,Q=536870912,z=Q*2,qe=(e,r)=>n=>{const s=r.get(n);let o=s===void 0?n.size:s<z?s+1:0;if(!n.has(o))return e(n,o);if(n.size<Q){for(;n.has(o);)o=Math.floor(Math.random()*z);return e(n,o)}if(n.size>J)throw new Error("Congratulations, you created a collection of unique numbers which uses all available integers!");for(;n.has(o);)o=Math.floor(Math.random()*J);return e(n,o)},Z=new WeakMap,Ne=Ie(Z),U=qe(Ne,Z),Pe=e=>e.method!==void 0&&e.method==="call",Ue=e=>typeof e.id=="number"&&typeof e.result=="boolean",Ce=e=>{const r=new Map([[0,()=>{}]]),n=new Map([[0,()=>{}]]),s=new Map,o=new Worker(e);return o.addEventListener("message",({data:c})=>{if(Pe(c)){const{params:{timerId:t,timerType:m}}=c;if(m==="interval"){const l=r.get(t);if(typeof l===void 0)throw new Error("The timer is in an undefined state.");if(typeof l=="number"){const g=s.get(l);if(g===void 0||g.timerId!==t||g.timerType!==m)throw new Error("The timer is in an undefined state.")}else typeof l=="function"&&l()}else if(m==="timeout"){const l=n.get(t);if(typeof l===void 0)throw new Error("The timer is in an undefined state.");if(typeof l=="number"){const g=s.get(l);if(g===void 0||g.timerId!==t||g.timerType!==m)throw new Error("The timer is in an undefined state.")}else typeof l=="function"&&(l(),n.delete(t))}}else if(Ue(c)){const{id:t}=c,m=s.get(t);if(m===void 0)throw new Error("The timer is in an undefined state.");const{timerId:l,timerType:g}=m;s.delete(t),g==="interval"?r.delete(l):n.delete(l)}else{const{error:{message:t}}=c;throw new Error(t)}}),{clearInterval:c=>{if(typeof r.get(c)=="function"){const t=U(s);s.set(t,{timerId:c,timerType:"interval"}),r.set(c,t),o.postMessage({id:t,method:"clear",params:{timerId:c,timerType:"interval"}})}},clearTimeout:c=>{if(typeof n.get(c)=="function"){const t=U(s);s.set(t,{timerId:c,timerType:"timeout"}),n.set(c,t),o.postMessage({id:t,method:"clear",params:{timerId:c,timerType:"timeout"}})}},setInterval:(c,t=0,...m)=>{const l=U(r);return r.set(l,()=>{c(...m),typeof r.get(l)=="function"&&o.postMessage({id:null,method:"set",params:{delay:t,now:performance.timeOrigin+performance.now(),timerId:l,timerType:"interval"}})}),o.postMessage({id:null,method:"set",params:{delay:t,now:performance.timeOrigin+performance.now(),timerId:l,timerType:"interval"}}),l},setTimeout:(c,t=0,...m)=>{const l=U(n);return n.set(l,()=>c(...m)),o.postMessage({id:null,method:"set",params:{delay:t,now:performance.timeOrigin+performance.now(),timerId:l,timerType:"timeout"}}),l}}},He=(e,r)=>{let n=null;return()=>{if(n!==null)return n;const s=new Blob([r],{type:"application/javascript; charset=utf-8"}),o=URL.createObjectURL(s);return n=e(o),setTimeout(()=>URL.revokeObjectURL(o)),n}},je=`(()=>{"use strict";const e=new Map,t=new Map,r=t=>{const r=e.get(t);return void 0!==r&&(clearTimeout(r),e.delete(t),!0)},s=e=>{const r=t.get(e);return void 0!==r&&(clearTimeout(r),t.delete(e),!0)},o=(e,t)=>{const r=performance.now(),s=e+t-r-performance.timeOrigin;return{expected:r+s,remainingDelay:s}},i=(e,t,r,s)=>{const o=r-performance.now();o>0?e.set(t,setTimeout(i,o,e,t,r,s)):(e.delete(t),postMessage({id:null,method:"call",params:{timerId:t,timerType:s}}))};addEventListener("message",(n=>{let{data:a}=n;try{if("clear"===a.method){const{id:e,params:{timerId:t,timerType:o}}=a;if("interval"===o)postMessage({id:e,result:r(t)});else{if("timeout"!==o)throw new Error('The given type "'.concat(o,'" is not supported'));postMessage({id:e,result:s(t)})}}else{if("set"!==a.method)throw new Error('The given method "'.concat(a.method,'" is not supported'));{const{params:{delay:r,now:s,timerId:n,timerType:m}}=a;if("interval"===m)((t,r,s)=>{const{expected:n,remainingDelay:a}=o(t,s);e.set(r,setTimeout(i,a,e,r,n,"interval"))})(r,n,s);else{if("timeout"!==m)throw new Error('The given type "'.concat(m,'" is not supported'));((e,r,s)=>{const{expected:n,remainingDelay:a}=o(e,s);t.set(r,setTimeout(i,a,t,r,n,"timeout"))})(r,n,s)}}}}catch(e){postMessage({error:{message:e.message},id:a.id,result:null})}}))})();`,ee=He(Ce,je),x=e=>ee().clearTimeout(e),$=(...e)=>ee().setTimeout(...e);function $e(){const e=new Set,r=o=>{e.delete(o)};return{on:o=>(e.add(o),{off:()=>r(o)}),off:r,trigger:(...o)=>Promise.all(Array.from(e).map(u=>u(...o)))}}async function De(e){try{return{data:await e,error:null}}catch(r){return{data:null,error:r||{message:"Unknown error"}}}}const Ge="https://cdn.jsdelivr.net/gh/sigmaott/sigma-ssai-web-sdk/v7/build/dist/wasm_exec.js";let I=null;function X(){I=null}function We(){const e=window;return e.Go?Promise.resolve(e.wasm):I||(I=de(Ge).then(()=>e.Go),I.then(X).catch(X),I)}class q{constructor(){return q.instance?q.instance:(this.session=null,this.go=null,this.buffer=null,this.audioMediaSequence={},q.instance=this,this)}async init(r){if(!this.buffer){const s=await(await fetch(r)).arrayBuffer();this.buffer=s}return q.instance}async loadSource(r){this.session&&(r.session=this.session);const n=JSON.stringify(r),s=new Go,o=await WebAssembly.instantiate(this.buffer,s.importObject);s.run(o.instance);let u;for(let i=1;i<=3;i++)try{u=await window.loadSource(n);break}catch(a){if(console.log(`Attempt ${i} failed:`,a),i===3)throw console.log("session:",this.session),console.log(n),a}if(u.session!=""&&(this.session=u.session),u.error)throw new Error(u.error);return u.manifest}async getEventTracking(){if(this.session){const r=window.getEventTracking(this.session);if(r.error)throw new Error(r.error);return{avails:JSON.parse(r.avails)}}return null}}const Ve=M(),Be=M();function K({adsUrl:e,sdk:r,loader:n}){return class extends n{constructor(o){super(o)}load(o,u,i){const a=i.onSuccess;i.onSuccess=async(d,c,t)=>{(t.type==="manifest"||t.type==="level"||t.type==="audioTrack")&&(d.data=await this.modifyManifest(d.url,d.data,t.type)),a(d,c,t)},super.load(o,u,i)}async modifyManifest(o,u,i){Ve.value=u;const a={proxyAds:{uri:e,timeout:2}};try{const d=await r.loadSource({config:a,manifest:u,masterUri:o});return console.log("[LOG] ~ newManifest:",d),Be.value=d,d}catch(d){return console.error("[LOG] ~ error:",d),u}}}}function Je({video:e,adContainer:r,startSession:n,sdk:s}){const o=$e(),u=M(!1),i=M(),a=Math.random().toString(36).slice(6);function d({icons:f}){return{id:a,appConfig:{sdkBaseUrl:C("https://cdn.jsdelivr.net/gh/sigmaott/sigma-ssai-web-sdk/v7/build/dist/wta/index.html",{id:a})},icons:f}}const c=le(d({icons:[]}));c.render(r),c.hide(),r.style.display="none",ie(()=>{var f;if(i.value){const p=((f=i.value)==null?void 0:f.icons)||[];r.style.display="block",c.updateProps(d({icons:p})),c.show()}else r.style.display="none",c.hide()});const t=M([]),m=M(),l=M([]);async function g(f){var h;console.log("[LOG] ~ currentAd:",i);const p=(h=i.value)==null?void 0:h.trackingEvents.find(y=>y.eventType===f);if(!p){console.debug("[LOG] ~ event:",f);return}o.trigger(p),await Promise.all(p.beaconUrls.map(y=>De(Le(y,{retry:3,retryDelay:500}))))}const T=new Map;let k,N;function A(f,p,h){f.addEventListener(p,h),T.set(p,h)}function P(f){var R,S;const p=((f==null?void 0:f.time)||0)>0?f.time:0,h=(R=f==null?void 0:f.value)==null?void 0:R.event;console.debug("[LOG] ~ eventType:",h);const y=l.value.find(v=>v.eventType===h&&!v.tracked&&!v.skipped);if(console.debug("[LOG] ~ eventAd:",y),!y)return;const b=y==null?void 0:y.ad;if(console.debug("[LOG] ~ ad:",b),!!b){if(h==="start")i.value&&l.value.filter(O=>O.key.startsWith(`${i.value.key}_`)).forEach(O=>O.skipped=!0),i.value=b,n(b.adVerifications,o),k=$(()=>{g("impression"),g("start");const v=l.value.find(O=>O.key===y.key.replace("_start","_impression"));v&&(v.tracked=!0),y.tracked=!0,N=$(()=>{i.value=void 0},30*1e3)},p*1e3);else{if(!i.value){console.debug("[LOG] ~ eventType:",h);return}if(b.id!==((S=i.value)==null?void 0:S.id)){console.debug("[ERROR] ~ ad:",b),console.debug("[ERROR] ~ currentAd:",i.value),l.value.filter(O=>O.key.startsWith(`${i.value.key}_`)).forEach(O=>O.skipped=!0);return}k=$(()=>{g(h),h==="complete"&&b.id===i.value.id&&(i.value=void 0,x(N)),y.tracked=!0},p*1e3)}console.debug("========================================")}}function H(){return u.value=!1,["fullscreenchange","webkitfullscreenchange","mozfullscreenchange","msfullscreenchange"].forEach(f=>{A(e,f,()=>{const p=document.fullscreenElement||document.webkitFullscreenElement||document.mozFullScreenElement||document.msFullscreenElement;g(p?"fullscreen":"exitFullscreen")})}),A(e,"pause",()=>g("pause")),A(e,"play",()=>g("resume")),A(e,"rewind",()=>g("rewind")),A(e,"mute",()=>g("mute")),A(e,"unmute",()=>g("unmute")),async(f,p)=>{if(m.value=p.frag.sn,f!==window.Hls.Events.FRAG_CHANGED)return;const h=t.value.filter(y=>y.sn===p.frag.sn);if(!h.length){console.debug("[LOG] ~ trackingEvent:",h);return}h.forEach(y=>P(y)),t.value=t.value.filter(y=>y.sn!==p.frag.sn)}}async function w(){return s.getEventTracking().then(f=>{for(const p of(f==null?void 0:f.avails)||[])for(const h of p.ads){const y=`${p.id}_${h.id}_${h.startTimeInSeconds}`;for(const b of h.trackingEvents){const R=`${y}_${b.eventType}`;l.value.find(v=>v.key===R)||l.value.push({...b,key:R,ad:{...h,key:y},tracked:!1})}}})}function _(){return async(f,p)=>{function h(R){for(let S=0;S<R.length;S++)if(R[S]===0)return S;return R.length}const{start:y,sn:b}=p.frag;for(let R=0;R<p.samples.length;R++){const S=p.samples[R],v=S.data,O=S.pts;if(String.fromCharCode.apply(null,v.slice(0,3))!=="ID3"||String.fromCharCode.apply(null,v.slice(10,14))!=="TXXX")continue;const j=v.slice(21,v.length),re=h(j),W=j.slice(re+1,j.length),se=h(W),ne=new TextDecoder("utf-8").decode(W.slice(0,se)),V={sn:b,time:O-y,value:D(ne)};if(m.value&&b<m.value)return;t.value.push(V),V.value.event==="start"&&w()}}}function F(){return f=>{const p=f.track;p.kind==="metadata"&&(p.oncuechange=async()=>{const h=p.activeCues[0];if(h&&h.value.data){console.debug("[LOG] ~ elemTrack:",h),await w();const y=D(h.value.data);console.debug("[LOG] ~ trackingEvent:",y),P({value:y})}})}}function L(f,p){o.on(h=>{(f==="*"||h.eventType===f)&&p(h)})}function E(){i.value=void 0,t.value=[],T.forEach((f,p)=>{e.removeEventListener(p,f)}),T.clear(),x(k)}function te(){return{eventTracking:t,trackingDataEvent:l}}return{destroy:E,onEventTracking:L,hlsHelper:{createHlsFragChanged:H,createHlsFragParsingMetadata:_},videojsHelper:{createVideojsAddTrack:F},getLog:te}}async function Ze({video:e,adContainer:r,adsUrl:n}){await We();const s=new q;await s.init("https://cdn.jsdelivr.net/gh/sigmaott/sigma-ssai-web-sdk/v7/build/dist/sigma-cspm.wasm");function o(){}const{onEventTracking:u,destroy:i,videojsHelper:a,hlsHelper:d,getLog:c}=Je({video:e,adContainer:r,trackingUrl:"",startSession:o,sdk:s}),t=M(),m=M();function l(w){w.config.loader=K({adsUrl:n,sdk:s,loader:Hls.DefaultConfig.loader}),t.value=w;const _=d.createHlsFragChanged(),F=d.createHlsFragParsingMetadata();w.on("hlsFragChanged",_),w.on("hlsFragParsingMetadata",F),w.on(Hls.Events.ERROR,(L,E)=>{console.error("HLS Error:",L,E),E.type===window.Hls.ErrorTypes.NETWORK_ERROR?console.error("Network Error:",E.details):E.type===window.Hls.ErrorTypes.MEDIA_ERROR?console.error("Media Error:",E.details):console.error("Other Error:",E.details)}),m.value=()=>{w.off("hlsFragChanged",_),w.off("hlsFragParsingMetadata",F)}}function g(w){w.hls.config.loader=K({adsUrl:n,sdk:s,loader:SigmaManager.DefaultConfig.loader}),t.value=w.hls;const _=d.createHlsFragChanged(),F=d.createHlsFragParsingMetadata();w.hls.on("hlsFragChanged",_),w.hls.on("hlsFragParsingMetadata",F),w.on(SigmaManager.Events.ERROR,(L,E)=>{console.log("[LOG] ~ event:",L),console.error("HLS Error:",L,E),E.type===window.Hls.ErrorTypes.NETWORK_ERROR?console.error("Network Error:",E.details):E.type===window.Hls.ErrorTypes.MEDIA_ERROR?console.error("Media Error:",E.details):console.error("Other Error:",E.details)}),m.value=()=>{w.hls.destroy()}}const T=M(),k=M(),A={instance:s,config:{proxyAds:{uri:n,timeout:2}}};function P(w){T.value=w;const _=a.createVideojsAddTrack();w.textTracks().on("addtrack",_),k.value=()=>{w.textTracks().off("addtrack",_)}}function H(){var w,_;i(),(w=m.value)==null||w.call(m),(_=k.value)==null||_.call(k),t.value=null,T.value=null,m.value=null,k.value=null}return{onEventTracking:u,destroy:H,sigmaPlayer:{attachVideojs:P,attachHls:l,attachSigmaDrm:g,attachVideojs2:P,getLog:c},sdk:s,cspm:A}}(function(e){const r=e.Vhs.PlaylistLoader.prototype.setupInitialPlaylist;e.Vhs.PlaylistLoader.prototype.setupInitialPlaylist=async function(n){if(n.manifestString&&this.vhs_.options_.cspm)try{const s=n.manifestString;await this.vhs_.options_.cspm.instance.loadSource({config:this.vhs_.options_.cspm.config,manifest:n.manifestString,masterUri:this.src})}catch(s){console.error("Error loading source:",s)}r.apply(this,[n])}})(videojs);(function(e){const r=e.Vhs.PlaylistLoader.prototype.haveMetadata;e.Vhs.PlaylistLoader.prototype.haveMetadata=async function({playlistString:n,playlistObject:s,url:o,id:u}){try{if(n&&this.vhs_.options_.cspm){const i=this.vhs_.options_.cspm.config;n=await this.vhs_.options_.cspm.instance.loadSource({config:i,manifest:n,masterUri:this.main.playlists[u].resolvedUri})}r.apply(this,[{playlistString:n,playlistObject:s,url:o,id:u}])}catch(i){console.error("Error loading source:",i)}}})(videojs);(function(e){const r=(s,o)=>{const u=s.segments||[],i=u[u.length-1],a=i&&i.parts&&i.parts[i.parts.length-1],d=a&&a.duration||i&&i.duration;return d?d*1e3:(s.partTargetDuration||s.targetDuration||10)*500},n=(s,o)=>o&&o.responseURL&&s!==o.responseURL?o.responseURL:s;e.Vhs.PlaylistLoader.prototype.media=function(s,o){if(!s)return this.media_;if(this.state==="HAVE_NOTHING")throw new Error(`Cannot switch media playlist from ${this.state}`);if(typeof s=="string"){if(!this.main.playlists[s])throw new Error(`Unknown playlist URI: ${s}`);s=this.main.playlists[s]}if(window.clearTimeout(this.finalRenditionTimeout),o){const c=(s.partTargetDuration||s.targetDuration)/2*1e3||5e3;this.finalRenditionTimeout=window.setTimeout(this.media.bind(this,s,!1),c);return}const u=this.state,i=!this.media_||s.id!==this.media_.id,a=this.main.playlists[s.id];if(a&&a.endList||s.endList&&s.segments.length){this.request&&(this.request.onreadystatechange=null,this.request.abort(),this.request=null),this.state="HAVE_METADATA",this.media_=s,i&&(this.trigger("mediachanging"),u==="HAVE_MAIN_MANIFEST"?this.trigger("loadedmetadata"):this.trigger("mediachange"));return}if(this.updateMediaUpdateTimeout_(r(s)),!i)return;if(this.state="SWITCHING_MEDIA",this.request){if(s.resolvedUri===this.request.url)return;this.request.onreadystatechange=null,this.request.abort(),this.request=null}this.media_&&this.trigger("mediachanging"),this.pendingMedia_=s;const d={playlistInfo:{type:"media",uri:s.uri}};this.trigger({type:"playlistrequeststart",metadata:d}),this.request=this.vhs_.xhr({uri:s.resolvedUri,withCredentials:this.withCredentials,requestType:"hls-playlist"},(c,t)=>{if(this.request){if(s.lastRequest=Date.now(),s.resolvedUri=n(s.resolvedUri,t),c)return this.playlistRequestError(this.request,s,u);this.haveMetadata({playlistString:t.responseText,url:s.uri,id:s.id}).then(()=>{this.trigger({type:"playlistrequestcomplete",metadata:d}),u==="HAVE_MAIN_MANIFEST"?this.trigger("loadedmetadata"):this.trigger("mediachange")})}})}})(videojs);function et(e){console.log("🚀 ~ file: sdk.ts:250 ~ url:",e);const r="https://dai.sigma.video/api/proxy-ads/ads/",n=ae(e),s=`${n.protocol}//${n.host}${n.pathname}`;if(!n.search)return{playerUrl:e,adsUrl:null};const o=ce(e),u=o["sigma.dai.adsEndpoint"];if(!u)return{playerUrl:e,adsUrl:null};const i={},a={};for(const[c,t]of Object.entries(o))c.startsWith("sigma.dai")?c!=="sigma.dai.adsEndpoint"&&(i[c.replace("sigma.dai.","")]=t):a[c]=t;return{playerUrl:C(s,a),adsUrl:C(ue(r,u),i)}}export{Ze as c,et as p};
