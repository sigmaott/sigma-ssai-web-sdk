function vs(r) {
  return new Promise((i, s) => {
    const d = document.createElement("script");
    d.async = !0, d.src = r, d.onload = i, d.onerror = s, document.body.appendChild(d);
  });
}
const ws = "https://imasdk.googleapis.com/pal/sdkloader/pal.js";
let wn = null;
function Ui() {
  wn = null;
}
function ms() {
  const r = window;
  return r.goog && r.goog.pal ? Promise.resolve(r.goog.pal) : wn || (wn = vs(ws).then(() => r.goog.pal), wn.then(Ui).catch(Ui), wn);
}
async function Kr(r) {
  try {
    return {
      data: await r,
      error: null
    };
  } catch (i) {
    return {
      data: null,
      error: i
    };
  }
}
function gs(r, i) {
  let s, d, h, x = !1;
  function S() {
    return !0;
  }
  function _() {
    i.addEventListener("mousedown", (de) => void E(de)), i.addEventListener("touchstart", (de) => void E(de)), i.addEventListener("play", () => {
      x || (A(), x = !0);
    }), i.addEventListener("ended", () => void W()), i.addEventListener("error", () => {
      console.log(`Video error: ${i.error.message}`), W();
    });
    const U = new r.ConsentSettings();
    return U.allowStorage = S(), s = new r.NonceLoader(), L();
  }
  async function L() {
    const U = new r.NonceRequest();
    U.adWillAutoPlay = !0, U.adWillPlayMuted = !0, U.continuousPlayback = !1, U.descriptionUrl = "https://example.com", U.iconsSupported = !0, U.playerType = "Sample Player Type", U.playerVersion = "1.0", U.ppid = "Sample PPID", U.sessionId = "Sample SID", U.supportedApiFrameworks = "2,7,9", U.url = "https://developers.google.com/ad-manager/pal/html5", U.videoHeight = 480, U.videoWidth = 640, d = s.loadNonceManager(U);
    const { data: de, error: je } = await Kr(d);
    return je ? (console.log(`Error generating nonce: ${je}`), null) : (h = de, h.getNonce());
  }
  function E(U) {
    h && h.sendTouch(U);
  }
  function A() {
    h && h.sendPlaybackStart();
  }
  function W() {
    h && h.sendPlaybackEnd();
  }
  return _();
}
const ys = /"(?:_|\\u0{2}5[Ff]){2}(?:p|\\u0{2}70)(?:r|\\u0{2}72)(?:o|\\u0{2}6[Ff])(?:t|\\u0{2}74)(?:o|\\u0{2}6[Ff])(?:_|\\u0{2}5[Ff]){2}"\s*:/, Es = /"(?:c|\\u0063)(?:o|\\u006[Ff])(?:n|\\u006[Ee])(?:s|\\u0073)(?:t|\\u0074)(?:r|\\u0072)(?:u|\\u0075)(?:c|\\u0063)(?:t|\\u0074)(?:o|\\u006[Ff])(?:r|\\u0072)"\s*:/, bs = /^\s*["[{]|^\s*-?\d{1,16}(\.\d{1,17})?([Ee][+-]?\d+)?\s*$/;
function Ps(r, i) {
  if (r === "__proto__" || r === "constructor" && i && typeof i == "object" && "prototype" in i) {
    Ts(r);
    return;
  }
  return i;
}
function Ts(r) {
  console.warn(`[destr] Dropping "${r}" key to prevent prototype pollution.`);
}
function io(r, i = {}) {
  if (typeof r != "string")
    return r;
  const s = r.trim();
  if (
    // eslint-disable-next-line unicorn/prefer-at
    r[0] === '"' && r.endsWith('"') && !r.includes("\\")
  )
    return s.slice(1, -1);
  if (s.length <= 9) {
    const d = s.toLowerCase();
    if (d === "true")
      return !0;
    if (d === "false")
      return !1;
    if (d === "undefined")
      return;
    if (d === "null")
      return null;
    if (d === "nan")
      return Number.NaN;
    if (d === "infinity")
      return Number.POSITIVE_INFINITY;
    if (d === "-infinity")
      return Number.NEGATIVE_INFINITY;
  }
  if (!bs.test(r)) {
    if (i.strict)
      throw new SyntaxError("[destr] Invalid JSON");
    return r;
  }
  try {
    if (ys.test(r) || Es.test(r)) {
      if (i.strict)
        throw new Error("[destr] Possible prototype pollution");
      return JSON.parse(r, Ps);
    }
    return JSON.parse(r);
  } catch (d) {
    if (i.strict)
      throw d;
    return r;
  }
}
const Ss = /#/g, Os = /&/g, Rs = /\//g, xs = /=/g, lo = /\+/g, Ds = /%5e/gi, Cs = /%60/gi, Ns = /%7c/gi, Is = /%20/gi;
function Ws(r) {
  return encodeURI("" + r).replace(Ns, "|");
}
function ao(r) {
  return Ws(typeof r == "string" ? r : JSON.stringify(r)).replace(lo, "%2B").replace(Is, "+").replace(Ss, "%23").replace(Os, "%26").replace(Cs, "`").replace(Ds, "^").replace(Rs, "%2F");
}
function ro(r) {
  return ao(r).replace(xs, "%3D");
}
function ea(r = "") {
  try {
    return decodeURIComponent("" + r);
  } catch {
    return "" + r;
  }
}
function As(r) {
  return ea(r.replace(lo, " "));
}
function _s(r) {
  return ea(r.replace(lo, " "));
}
function Ms(r = "") {
  const i = {};
  r[0] === "?" && (r = r.slice(1));
  for (const s of r.split("&")) {
    const d = s.match(/([^=]+)=?(.*)/) || [];
    if (d.length < 2)
      continue;
    const h = As(d[1]);
    if (h === "__proto__" || h === "constructor")
      continue;
    const b = _s(d[2] || "");
    i[h] === void 0 ? i[h] = b : Array.isArray(i[h]) ? i[h].push(b) : i[h] = [i[h], b];
  }
  return i;
}
function Fs(r, i) {
  return (typeof i == "number" || typeof i == "boolean") && (i = String(i)), i ? Array.isArray(i) ? i.map((s) => `${ro(r)}=${ao(s)}`).join("&") : `${ro(r)}=${ao(i)}` : ro(r);
}
function zs(r) {
  return Object.keys(r).filter((i) => r[i] !== void 0).map((i) => Fs(i, r[i])).filter(Boolean).join("&");
}
const Ls = /^[\s\w\0+.-]{2,}:([/\\]{1,2})/, js = /^[\s\w\0+.-]{2,}:([/\\]{2})?/, Us = /^([/\\]\s*){2,}[^/\\]/, Bs = /^\.?\//;
function ra(r, i = {}) {
  return typeof i == "boolean" && (i = { acceptRelative: i }), i.strict ? Ls.test(r) : js.test(r) || (i.acceptRelative ? Us.test(r) : !1);
}
function $s(r = "", i) {
  return r.endsWith("/");
}
function qs(r = "", i) {
  return ($s(r) ? r.slice(0, -1) : r) || "/";
}
function Hs(r = "", i) {
  return r.endsWith("/") ? r : r + "/";
}
function Vs(r, i) {
  if (Gs(i) || ra(r))
    return r;
  const s = qs(i);
  return r.startsWith(s) ? r : Ks(s, r);
}
function na(r, i) {
  const s = oa(r), d = { ...Ms(s.search), ...i };
  return s.search = zs(d), Ys(s);
}
function Gs(r) {
  return !r || r === "/";
}
function Js(r) {
  return r && r !== "/";
}
function Ks(r, ...i) {
  let s = r || "";
  for (const d of i.filter((h) => Js(h)))
    if (s) {
      const h = d.replace(Bs, "");
      s = Hs(s) + h;
    } else
      s = d;
  return s;
}
const ta = Symbol.for("ufo:protocolRelative");
function oa(r = "", i) {
  const s = r.match(
    /^[\s\0]*(blob:|data:|javascript:|vbscript:)(.*)/i
  );
  if (s) {
    const [, A, W = ""] = s;
    return {
      protocol: A.toLowerCase(),
      pathname: W,
      href: A + W,
      auth: "",
      host: "",
      search: "",
      hash: ""
    };
  }
  if (!ra(r, { acceptRelative: !0 }))
    return Bi(r);
  const [, d = "", h, b = ""] = r.replace(/\\/g, "/").match(/^[\s\0]*([\w+.-]{2,}:)?\/\/([^/@]+@)?(.*)/) || [];
  let [, x = "", S = ""] = b.match(/([^#/?]*)(.*)?/) || [];
  d === "file:" && (S = S.replace(/\/(?=[A-Za-z]:)/, ""));
  const { pathname: _, search: L, hash: E } = Bi(S);
  return {
    protocol: d.toLowerCase(),
    auth: h ? h.slice(0, Math.max(0, h.length - 1)) : "",
    host: x,
    pathname: _,
    search: L,
    hash: E,
    [ta]: !d
  };
}
function Bi(r = "") {
  const [i = "", s = "", d = ""] = (r.match(/([^#?]*)(\?[^#]*)?(#.*)?/) || []).splice(1);
  return {
    pathname: i,
    search: s,
    hash: d
  };
}
function Ys(r) {
  const i = r.pathname || "", s = r.search ? (r.search.startsWith("?") ? "" : "?") + r.search : "", d = r.hash || "", h = r.auth ? r.auth + "@" : "", b = r.host || "";
  return (r.protocol || r[ta] ? (r.protocol || "") + "//" : "") + h + b + i + s + d;
}
class Zs extends Error {
  constructor(i, s) {
    super(i, s), this.name = "FetchError", s != null && s.cause && !this.cause && (this.cause = s.cause);
  }
}
function Qs(r) {
  var _, L, E, A, W;
  const i = ((_ = r.error) == null ? void 0 : _.message) || ((L = r.error) == null ? void 0 : L.toString()) || "", s = ((E = r.request) == null ? void 0 : E.method) || ((A = r.options) == null ? void 0 : A.method) || "GET", d = ((W = r.request) == null ? void 0 : W.url) || String(r.request) || "/", h = `[${s}] ${JSON.stringify(d)}`, b = r.response ? `${r.response.status} ${r.response.statusText}` : "<no response>", x = `${h}: ${b}${i ? ` ${i}` : ""}`, S = new Zs(
    x,
    r.error ? { cause: r.error } : void 0
  );
  for (const U of ["request", "options", "response"])
    Object.defineProperty(S, U, {
      get() {
        return r[U];
      }
    });
  for (const [U, de] of [
    ["data", "_data"],
    ["status", "status"],
    ["statusCode", "status"],
    ["statusText", "statusText"],
    ["statusMessage", "statusText"]
  ])
    Object.defineProperty(S, U, {
      get() {
        return r.response && r.response[de];
      }
    });
  return S;
}
const Xs = new Set(
  Object.freeze(["PATCH", "POST", "PUT", "DELETE"])
);
function $i(r = "GET") {
  return Xs.has(r.toUpperCase());
}
function ks(r) {
  if (r === void 0)
    return !1;
  const i = typeof r;
  return i === "string" || i === "number" || i === "boolean" || i === null ? !0 : i !== "object" ? !1 : Array.isArray(r) ? !0 : r.buffer ? !1 : r.constructor && r.constructor.name === "Object" || typeof r.toJSON == "function";
}
const eu = /* @__PURE__ */ new Set([
  "image/svg",
  "application/xml",
  "application/xhtml",
  "application/html"
]), ru = /^application\/(?:[\w!#$%&*.^`~-]*\+)?json(;.+)?$/i;
function nu(r = "") {
  if (!r)
    return "json";
  const i = r.split(";").shift() || "";
  return ru.test(i) ? "json" : eu.has(i) || i.startsWith("text/") ? "text" : "blob";
}
function tu(r, i, s = globalThis.Headers) {
  const d = {
    ...i,
    ...r
  };
  if (i != null && i.params && (r != null && r.params) && (d.params = {
    ...i == null ? void 0 : i.params,
    ...r == null ? void 0 : r.params
  }), i != null && i.query && (r != null && r.query) && (d.query = {
    ...i == null ? void 0 : i.query,
    ...r == null ? void 0 : r.query
  }), i != null && i.headers && (r != null && r.headers)) {
    d.headers = new s((i == null ? void 0 : i.headers) || {});
    for (const [h, b] of new s((r == null ? void 0 : r.headers) || {}))
      d.headers.set(h, b);
  }
  return d;
}
const ou = /* @__PURE__ */ new Set([
  408,
  // Request Timeout
  409,
  // Conflict
  425,
  // Too Early
  429,
  // Too Many Requests
  500,
  // Internal Server Error
  502,
  // Bad Gateway
  503,
  // Service Unavailable
  504
  //  Gateway Timeout
]), iu = /* @__PURE__ */ new Set([101, 204, 205, 304]);
function ia(r = {}) {
  const {
    fetch: i = globalThis.fetch,
    Headers: s = globalThis.Headers,
    AbortController: d = globalThis.AbortController
  } = r;
  async function h(S) {
    const _ = S.error && S.error.name === "AbortError" && !S.options.timeout || !1;
    if (S.options.retry !== !1 && !_) {
      let E;
      typeof S.options.retry == "number" ? E = S.options.retry : E = $i(S.options.method) ? 0 : 1;
      const A = S.response && S.response.status || 500;
      if (E > 0 && (Array.isArray(S.options.retryStatusCodes) ? S.options.retryStatusCodes.includes(A) : ou.has(A))) {
        const W = S.options.retryDelay || 0;
        return W > 0 && await new Promise((U) => setTimeout(U, W)), b(S.request, {
          ...S.options,
          retry: E - 1
        });
      }
    }
    const L = Qs(S);
    throw Error.captureStackTrace && Error.captureStackTrace(L, b), L;
  }
  const b = async function(_, L = {}) {
    var U;
    const E = {
      request: _,
      options: tu(L, r.defaults, s),
      response: void 0,
      error: void 0
    };
    E.options.method = (U = E.options.method) == null ? void 0 : U.toUpperCase(), E.options.onRequest && await E.options.onRequest(E), typeof E.request == "string" && (E.options.baseURL && (E.request = Vs(E.request, E.options.baseURL)), (E.options.query || E.options.params) && (E.request = na(E.request, {
      ...E.options.params,
      ...E.options.query
    }))), E.options.body && $i(E.options.method) && (ks(E.options.body) ? (E.options.body = typeof E.options.body == "string" ? E.options.body : JSON.stringify(E.options.body), E.options.headers = new s(E.options.headers || {}), E.options.headers.has("content-type") || E.options.headers.set("content-type", "application/json"), E.options.headers.has("accept") || E.options.headers.set("accept", "application/json")) : (
      // ReadableStream Body
      ("pipeTo" in E.options.body && typeof E.options.body.pipeTo == "function" || // Node.js Stream Body
      typeof E.options.body.pipe == "function") && ("duplex" in E.options || (E.options.duplex = "half"))
    ));
    let A;
    if (!E.options.signal && E.options.timeout) {
      const de = new d();
      A = setTimeout(
        () => de.abort(),
        E.options.timeout
      ), E.options.signal = de.signal;
    }
    try {
      E.response = await i(
        E.request,
        E.options
      );
    } catch (de) {
      return E.error = de, E.options.onRequestError && await E.options.onRequestError(E), await h(E);
    } finally {
      A && clearTimeout(A);
    }
    if (E.response.body && !iu.has(E.response.status) && E.options.method !== "HEAD") {
      const de = (E.options.parseResponse ? "json" : E.options.responseType) || nu(E.response.headers.get("content-type") || "");
      switch (de) {
        case "json": {
          const je = await E.response.text(), T = E.options.parseResponse || io;
          E.response._data = T(je);
          break;
        }
        case "stream": {
          E.response._data = E.response.body;
          break;
        }
        default:
          E.response._data = await E.response[de]();
      }
    }
    return E.options.onResponse && await E.options.onResponse(E), !E.options.ignoreResponseError && E.response.status >= 400 && E.response.status < 600 ? (E.options.onResponseError && await E.options.onResponseError(E), await h(E)) : E.response;
  }, x = async function(_, L) {
    return (await b(_, L))._data;
  };
  return x.raw = b, x.native = (...S) => i(...S), x.create = (S = {}) => ia({
    ...r,
    defaults: {
      ...r.defaults,
      ...S
    }
  }), x;
}
const ho = function() {
  if (typeof globalThis < "u")
    return globalThis;
  if (typeof self < "u")
    return self;
  if (typeof window < "u")
    return window;
  if (typeof global < "u")
    return global;
  throw new Error("unable to locate global object");
}(), au = ho.fetch || (() => Promise.reject(new Error("[ofetch] global.fetch is not supported!"))), su = ho.Headers, uu = ho.AbortController, aa = ia({ fetch: au, Headers: su, AbortController: uu }), sa = aa, Un = aa.create({
  credentials: "omit",
  onResponseError({ response: r, error: i }) {
    console.log("[LOG] ~ error:", i);
  },
  onRequest: ({ options: r, request: i }) => {
    const s = r.token;
    s && (r.headers = r.headers || {}, r.headers.Authorization = `${s}`);
  },
  onResponse({ response: r, options: i }) {
  }
}), cu = (r) => (i, s) => (r.set(i, s), s), qi = Number.MAX_SAFE_INTEGER === void 0 ? 9007199254740991 : Number.MAX_SAFE_INTEGER, ua = 536870912, Hi = ua * 2, du = (r, i) => (s) => {
  const d = i.get(s);
  let h = d === void 0 ? s.size : d < Hi ? d + 1 : 0;
  if (!s.has(h))
    return r(s, h);
  if (s.size < ua) {
    for (; s.has(h); )
      h = Math.floor(Math.random() * Hi);
    return r(s, h);
  }
  if (s.size > qi)
    throw new Error("Congratulations, you created a collection of unique numbers which uses all available integers!");
  for (; s.has(h); )
    h = Math.floor(Math.random() * qi);
  return r(s, h);
}, ca = /* @__PURE__ */ new WeakMap(), fu = cu(ca), lt = du(fu, ca), lu = (r) => r.method !== void 0 && r.method === "call", hu = (r) => typeof r.id == "number" && typeof r.result == "boolean", pu = (r) => {
  const i = /* @__PURE__ */ new Map([[0, () => {
  }]]), s = /* @__PURE__ */ new Map([[0, () => {
  }]]), d = /* @__PURE__ */ new Map(), h = new Worker(r);
  return h.addEventListener("message", ({ data: L }) => {
    if (lu(L)) {
      const { params: { timerId: E, timerType: A } } = L;
      if (A === "interval") {
        const W = i.get(E);
        if (typeof W === void 0)
          throw new Error("The timer is in an undefined state.");
        if (typeof W == "number") {
          const U = d.get(W);
          if (U === void 0 || U.timerId !== E || U.timerType !== A)
            throw new Error("The timer is in an undefined state.");
        } else typeof W == "function" && W();
      } else if (A === "timeout") {
        const W = s.get(E);
        if (typeof W === void 0)
          throw new Error("The timer is in an undefined state.");
        if (typeof W == "number") {
          const U = d.get(W);
          if (U === void 0 || U.timerId !== E || U.timerType !== A)
            throw new Error("The timer is in an undefined state.");
        } else typeof W == "function" && (W(), s.delete(E));
      }
    } else if (hu(L)) {
      const { id: E } = L, A = d.get(E);
      if (A === void 0)
        throw new Error("The timer is in an undefined state.");
      const { timerId: W, timerType: U } = A;
      d.delete(E), U === "interval" ? i.delete(W) : s.delete(W);
    } else {
      const { error: { message: E } } = L;
      throw new Error(E);
    }
  }), {
    clearInterval: (L) => {
      if (typeof i.get(L) == "function") {
        const E = lt(d);
        d.set(E, { timerId: L, timerType: "interval" }), i.set(L, E), h.postMessage({
          id: E,
          method: "clear",
          params: { timerId: L, timerType: "interval" }
        });
      }
    },
    clearTimeout: (L) => {
      if (typeof s.get(L) == "function") {
        const E = lt(d);
        d.set(E, { timerId: L, timerType: "timeout" }), s.set(L, E), h.postMessage({
          id: E,
          method: "clear",
          params: { timerId: L, timerType: "timeout" }
        });
      }
    },
    setInterval: (L, E = 0, ...A) => {
      const W = lt(i);
      return i.set(W, () => {
        L(...A), typeof i.get(W) == "function" && h.postMessage({
          id: null,
          method: "set",
          params: {
            delay: E,
            now: performance.timeOrigin + performance.now(),
            timerId: W,
            timerType: "interval"
          }
        });
      }), h.postMessage({
        id: null,
        method: "set",
        params: {
          delay: E,
          now: performance.timeOrigin + performance.now(),
          timerId: W,
          timerType: "interval"
        }
      }), W;
    },
    setTimeout: (L, E = 0, ...A) => {
      const W = lt(s);
      return s.set(W, () => L(...A)), h.postMessage({
        id: null,
        method: "set",
        params: {
          delay: E,
          now: performance.timeOrigin + performance.now(),
          timerId: W,
          timerType: "timeout"
        }
      }), W;
    }
  };
}, vu = (r, i) => {
  let s = null;
  return () => {
    if (s !== null)
      return s;
    const d = new Blob([i], { type: "application/javascript; charset=utf-8" }), h = URL.createObjectURL(d);
    return s = r(h), setTimeout(() => URL.revokeObjectURL(h)), s;
  };
}, wu = `(()=>{"use strict";const e=new Map,t=new Map,r=t=>{const r=e.get(t);return void 0!==r&&(clearTimeout(r),e.delete(t),!0)},s=e=>{const r=t.get(e);return void 0!==r&&(clearTimeout(r),t.delete(e),!0)},o=(e,t)=>{const r=performance.now(),s=e+t-r-performance.timeOrigin;return{expected:r+s,remainingDelay:s}},i=(e,t,r,s)=>{const o=r-performance.now();o>0?e.set(t,setTimeout(i,o,e,t,r,s)):(e.delete(t),postMessage({id:null,method:"call",params:{timerId:t,timerType:s}}))};addEventListener("message",(n=>{let{data:a}=n;try{if("clear"===a.method){const{id:e,params:{timerId:t,timerType:o}}=a;if("interval"===o)postMessage({id:e,result:r(t)});else{if("timeout"!==o)throw new Error('The given type "'.concat(o,'" is not supported'));postMessage({id:e,result:s(t)})}}else{if("set"!==a.method)throw new Error('The given method "'.concat(a.method,'" is not supported'));{const{params:{delay:r,now:s,timerId:n,timerType:m}}=a;if("interval"===m)((t,r,s)=>{const{expected:n,remainingDelay:a}=o(t,s);e.set(r,setTimeout(i,a,e,r,n,"interval"))})(r,n,s);else{if("timeout"!==m)throw new Error('The given type "'.concat(m,'" is not supported'));((e,r,s)=>{const{expected:n,remainingDelay:a}=o(e,s);t.set(r,setTimeout(i,a,t,r,n,"timeout"))})(r,n,s)}}}}catch(e){postMessage({error:{message:e.message},id:a.id,result:null})}}))})();`, mu = vu(pu, wu), gu = (...r) => mu().setTimeout(...r);
/**
* @vue/shared v3.5.1
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
/*! #__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function yu(r, i) {
  const s = new Set(r.split(","));
  return (d) => s.has(d);
}
const Vi = Object.assign, Eu = Object.prototype.hasOwnProperty, so = (r, i) => Eu.call(r, i), mn = Array.isArray, $n = (r) => da(r) === "[object Map]", bu = (r) => typeof r == "string", Vn = (r) => typeof r == "symbol", yt = (r) => r !== null && typeof r == "object", Pu = Object.prototype.toString, da = (r) => Pu.call(r), fa = (r) => da(r).slice(8, -1), po = (r) => bu(r) && r !== "NaN" && r[0] !== "-" && "" + parseInt(r, 10) === r, Tu = (r) => {
  const i = /* @__PURE__ */ Object.create(null);
  return (s) => i[s] || (i[s] = r(s));
}, Su = Tu((r) => r.charAt(0).toUpperCase() + r.slice(1)), bn = (r, i) => !Object.is(r, i);
var Je = {};
function yn(r, ...i) {
  console.warn(`[Vue warn] ${r}`, ...i);
}
let he;
const no = /* @__PURE__ */ new WeakSet();
class Gi {
  constructor(i) {
    this.fn = i, this.deps = void 0, this.depsTail = void 0, this.flags = 5, this.nextEffect = void 0, this.cleanup = void 0, this.scheduler = void 0;
  }
  pause() {
    this.flags |= 64;
  }
  resume() {
    this.flags & 64 && (this.flags &= -65, no.has(this) && (no.delete(this), this.trigger()));
  }
  /**
   * @internal
   */
  notify() {
    this.flags & 2 && !(this.flags & 32) || this.flags & 8 || (this.flags |= 8, this.nextEffect = qn, qn = this);
  }
  run() {
    if (!(this.flags & 1))
      return this.fn();
    this.flags |= 2, Ji(this), ha(this);
    const i = he, s = Er;
    he = this, Er = !0;
    try {
      return this.fn();
    } finally {
      Je.NODE_ENV !== "production" && he !== this && yn(
        "Active effect was not restored correctly - this is likely a Vue internal bug."
      ), pa(this), he = i, Er = s, this.flags &= -3;
    }
  }
  stop() {
    if (this.flags & 1) {
      for (let i = this.deps; i; i = i.nextDep)
        mo(i);
      this.deps = this.depsTail = void 0, Ji(this), this.onStop && this.onStop(), this.flags &= -2;
    }
  }
  trigger() {
    this.flags & 64 ? no.add(this) : this.scheduler ? this.scheduler() : this.runIfDirty();
  }
  /**
   * @internal
   */
  runIfDirty() {
    uo(this) && this.run();
  }
  get dirty() {
    return uo(this);
  }
}
let la = 0, qn;
function vo() {
  la++;
}
function wo() {
  if (--la > 0)
    return;
  let r;
  for (; qn; ) {
    let i = qn;
    for (qn = void 0; i; ) {
      const s = i.nextEffect;
      if (i.nextEffect = void 0, i.flags &= -9, i.flags & 1)
        try {
          i.trigger();
        } catch (d) {
          r || (r = d);
        }
      i = s;
    }
  }
  if (r) throw r;
}
function ha(r) {
  for (let i = r.deps; i; i = i.nextDep)
    i.version = -1, i.prevActiveLink = i.dep.activeLink, i.dep.activeLink = i;
}
function pa(r) {
  let i, s = r.depsTail;
  for (let d = s; d; d = d.prevDep)
    d.version === -1 ? (d === s && (s = d.prevDep), mo(d), Ru(d)) : i = d, d.dep.activeLink = d.prevActiveLink, d.prevActiveLink = void 0;
  r.deps = i, r.depsTail = s;
}
function uo(r) {
  for (let i = r.deps; i; i = i.nextDep)
    if (i.dep.version !== i.version || i.dep.computed && Ou(i.dep.computed) === !1 || i.dep.version !== i.version)
      return !0;
  return !!r._dirty;
}
function Ou(r) {
  if (r.flags & 2)
    return !1;
  if (r.flags & 4 && !(r.flags & 16) || (r.flags &= -17, r.globalVersion === gt))
    return;
  r.globalVersion = gt;
  const i = r.dep;
  if (r.flags |= 2, i.version > 0 && !r.isSSR && !uo(r)) {
    r.flags &= -3;
    return;
  }
  const s = he, d = Er;
  he = r, Er = !0;
  try {
    ha(r);
    const h = r.fn();
    (i.version === 0 || bn(h, r._value)) && (r._value = h, i.version++);
  } catch (h) {
    throw i.version++, h;
  } finally {
    he = s, Er = d, pa(r), r.flags &= -3;
  }
}
function mo(r) {
  const { dep: i, prevSub: s, nextSub: d } = r;
  if (s && (s.nextSub = d, r.prevSub = void 0), d && (d.prevSub = s, r.nextSub = void 0), i.subs === r && (i.subs = s), !i.subs && i.computed) {
    i.computed.flags &= -5;
    for (let h = i.computed.deps; h; h = h.nextDep)
      mo(h);
  }
}
function Ru(r) {
  const { prevDep: i, nextDep: s } = r;
  i && (i.nextDep = s, r.prevDep = void 0), s && (s.prevDep = i, r.nextDep = void 0);
}
function xu(r, i) {
  r.effect instanceof Gi && (r = r.effect.fn);
  const s = new Gi(r);
  try {
    s.run();
  } catch (h) {
    throw s.stop(), h;
  }
  const d = s.run.bind(s);
  return d.effect = s, d;
}
let Er = !0;
const va = [];
function Du() {
  va.push(Er), Er = !1;
}
function Cu() {
  const r = va.pop();
  Er = r === void 0 ? !0 : r;
}
function Ji(r) {
  const { cleanup: i } = r;
  if (r.cleanup = void 0, i) {
    const s = he;
    he = void 0;
    try {
      i();
    } finally {
      he = s;
    }
  }
}
let gt = 0;
class wa {
  constructor(i) {
    this.computed = i, this.version = 0, this.activeLink = void 0, this.subs = void 0, Je.NODE_ENV !== "production" && (this.subsHead = void 0);
  }
  track(i) {
    if (!he || !Er)
      return;
    let s = this.activeLink;
    if (s === void 0 || s.sub !== he)
      s = this.activeLink = {
        dep: this,
        sub: he,
        version: this.version,
        nextDep: void 0,
        prevDep: void 0,
        nextSub: void 0,
        prevSub: void 0,
        prevActiveLink: void 0
      }, he.deps ? (s.prevDep = he.depsTail, he.depsTail.nextDep = s, he.depsTail = s) : he.deps = he.depsTail = s, he.flags & 4 && ma(s);
    else if (s.version === -1 && (s.version = this.version, s.nextDep)) {
      const d = s.nextDep;
      d.prevDep = s.prevDep, s.prevDep && (s.prevDep.nextDep = d), s.prevDep = he.depsTail, s.nextDep = void 0, he.depsTail.nextDep = s, he.depsTail = s, he.deps === s && (he.deps = d);
    }
    return Je.NODE_ENV !== "production" && he.onTrack && he.onTrack(
      Vi(
        {
          effect: he
        },
        i
      )
    ), s;
  }
  trigger(i) {
    this.version++, gt++, this.notify(i);
  }
  notify(i) {
    vo();
    try {
      if (Je.NODE_ENV !== "production")
        for (let s = this.subsHead; s; s = s.nextSub)
          Je.NODE_ENV !== "production" && s.sub.onTrigger && !(s.sub.flags & 8) && s.sub.onTrigger(
            Vi(
              {
                effect: s.sub
              },
              i
            )
          );
      for (let s = this.subs; s; s = s.prevSub)
        s.sub.notify();
    } finally {
      wo();
    }
  }
}
function ma(r) {
  const i = r.dep.computed;
  if (i && !r.dep.subs) {
    i.flags |= 20;
    for (let d = i.deps; d; d = d.nextDep)
      ma(d);
  }
  const s = r.dep.subs;
  s !== r && (r.prevSub = s, s && (s.nextSub = r)), Je.NODE_ENV !== "production" && r.dep.subsHead === void 0 && (r.dep.subsHead = r), r.dep.subs = r;
}
const co = /* @__PURE__ */ new WeakMap(), sn = Symbol(
  Je.NODE_ENV !== "production" ? "Object iterate" : ""
), fo = Symbol(
  Je.NODE_ENV !== "production" ? "Map keys iterate" : ""
), Hn = Symbol(
  Je.NODE_ENV !== "production" ? "Array iterate" : ""
);
function sr(r, i, s) {
  if (Er && he) {
    let d = co.get(r);
    d || co.set(r, d = /* @__PURE__ */ new Map());
    let h = d.get(s);
    h || d.set(s, h = new wa()), Je.NODE_ENV !== "production" ? h.track({
      target: r,
      type: i,
      key: s
    }) : h.track();
  }
}
function Yr(r, i, s, d, h, b) {
  const x = co.get(r);
  if (!x) {
    gt++;
    return;
  }
  let S = [];
  if (i === "clear")
    S = [...x.values()];
  else {
    const _ = mn(r), L = _ && po(s);
    if (_ && s === "length") {
      const E = Number(d);
      x.forEach((A, W) => {
        (W === "length" || W === Hn || !Vn(W) && W >= E) && S.push(A);
      });
    } else {
      const E = (A) => A && S.push(A);
      switch (s !== void 0 && E(x.get(s)), L && E(x.get(Hn)), i) {
        case "add":
          _ ? L && E(x.get("length")) : (E(x.get(sn)), $n(r) && E(x.get(fo)));
          break;
        case "delete":
          _ || (E(x.get(sn)), $n(r) && E(x.get(fo)));
          break;
        case "set":
          $n(r) && E(x.get(sn));
          break;
      }
    }
  }
  vo();
  for (const _ of S)
    Je.NODE_ENV !== "production" ? _.trigger({
      target: r,
      type: i,
      key: s,
      newValue: d,
      oldValue: h,
      oldTarget: b
    }) : _.trigger();
  wo();
}
function pn(r) {
  const i = pe(r);
  return i === r ? i : (sr(i, "iterate", Hn), Zr(r) ? i : i.map(or));
}
function go(r) {
  return sr(r = pe(r), "iterate", Hn), r;
}
const Nu = {
  __proto__: null,
  [Symbol.iterator]() {
    return to(this, Symbol.iterator, or);
  },
  concat(...r) {
    return pn(this).concat(
      ...r.map((i) => mn(i) ? pn(i) : i)
    );
  },
  entries() {
    return to(this, "entries", (r) => (r[1] = or(r[1]), r));
  },
  every(r, i) {
    return Ar(this, "every", r, i, void 0, arguments);
  },
  filter(r, i) {
    return Ar(this, "filter", r, i, (s) => s.map(or), arguments);
  },
  find(r, i) {
    return Ar(this, "find", r, i, or, arguments);
  },
  findIndex(r, i) {
    return Ar(this, "findIndex", r, i, void 0, arguments);
  },
  findLast(r, i) {
    return Ar(this, "findLast", r, i, or, arguments);
  },
  findLastIndex(r, i) {
    return Ar(this, "findLastIndex", r, i, void 0, arguments);
  },
  // flat, flatMap could benefit from ARRAY_ITERATE but are not straight-forward to implement
  forEach(r, i) {
    return Ar(this, "forEach", r, i, void 0, arguments);
  },
  includes(...r) {
    return oo(this, "includes", r);
  },
  indexOf(...r) {
    return oo(this, "indexOf", r);
  },
  join(r) {
    return pn(this).join(r);
  },
  // keys() iterator only reads `length`, no optimisation required
  lastIndexOf(...r) {
    return oo(this, "lastIndexOf", r);
  },
  map(r, i) {
    return Ar(this, "map", r, i, void 0, arguments);
  },
  pop() {
    return Bn(this, "pop");
  },
  push(...r) {
    return Bn(this, "push", r);
  },
  reduce(r, ...i) {
    return Ki(this, "reduce", r, i);
  },
  reduceRight(r, ...i) {
    return Ki(this, "reduceRight", r, i);
  },
  shift() {
    return Bn(this, "shift");
  },
  // slice could use ARRAY_ITERATE but also seems to beg for range tracking
  some(r, i) {
    return Ar(this, "some", r, i, void 0, arguments);
  },
  splice(...r) {
    return Bn(this, "splice", r);
  },
  toReversed() {
    return pn(this).toReversed();
  },
  toSorted(r) {
    return pn(this).toSorted(r);
  },
  toSpliced(...r) {
    return pn(this).toSpliced(...r);
  },
  unshift(...r) {
    return Bn(this, "unshift", r);
  },
  values() {
    return to(this, "values", or);
  }
};
function to(r, i, s) {
  const d = go(r), h = d[i]();
  return d !== r && !Zr(r) && (h._next = h.next, h.next = () => {
    const b = h._next();
    return b.value && (b.value = s(b.value)), b;
  }), h;
}
const Iu = Array.prototype;
function Ar(r, i, s, d, h, b) {
  const x = go(r), S = x !== r && !Zr(r), _ = x[i];
  if (_ !== Iu[i]) {
    const A = _.apply(r, b);
    return S ? or(A) : A;
  }
  let L = s;
  x !== r && (S ? L = function(A, W) {
    return s.call(this, or(A), W, r);
  } : s.length > 2 && (L = function(A, W) {
    return s.call(this, A, W, r);
  }));
  const E = _.call(x, L, d);
  return S && h ? h(E) : E;
}
function Ki(r, i, s, d) {
  const h = go(r);
  let b = s;
  return h !== r && (Zr(r) ? s.length > 3 && (b = function(x, S, _) {
    return s.call(this, x, S, _, r);
  }) : b = function(x, S, _) {
    return s.call(this, x, or(S), _, r);
  }), h[i](b, ...d);
}
function oo(r, i, s) {
  const d = pe(r);
  sr(d, "iterate", Hn);
  const h = d[i](...s);
  return (h === -1 || h === !1) && Yu(s[0]) ? (s[0] = pe(s[0]), d[i](...s)) : h;
}
function Bn(r, i, s = []) {
  Du(), vo();
  const d = pe(r)[i].apply(r, s);
  return wo(), Cu(), d;
}
const Wu = /* @__PURE__ */ yu("__proto__,__v_isRef,__isVue"), ga = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((r) => r !== "arguments" && r !== "caller").map((r) => Symbol[r]).filter(Vn)
);
function Au(r) {
  Vn(r) || (r = String(r));
  const i = pe(this);
  return sr(i, "has", r), i.hasOwnProperty(r);
}
class ya {
  constructor(i = !1, s = !1) {
    this._isReadonly = i, this._isShallow = s;
  }
  get(i, s, d) {
    const h = this._isReadonly, b = this._isShallow;
    if (s === "__v_isReactive")
      return !h;
    if (s === "__v_isReadonly")
      return h;
    if (s === "__v_isShallow")
      return b;
    if (s === "__v_raw")
      return d === (h ? b ? Gu : Ta : b ? Vu : Pa).get(i) || // receiver is not the reactive proxy, but has the same prototype
      // this means the receiver is a user proxy of the reactive proxy
      Object.getPrototypeOf(i) === Object.getPrototypeOf(d) ? i : void 0;
    const x = mn(i);
    if (!h) {
      let _;
      if (x && (_ = Nu[s]))
        return _;
      if (s === "hasOwnProperty")
        return Au;
    }
    const S = Reflect.get(
      i,
      s,
      // if this is a proxy wrapping a ref, return methods using the raw ref
      // as receiver so that we don't have to call `toRaw` on the ref in all
      // its class methods
      gn(i) ? i : d
    );
    return (Vn(s) ? ga.has(s) : Wu(s)) || (h || sr(i, "get", s), b) ? S : gn(S) ? x && po(s) ? S : S.value : yt(S) ? h ? Oa(S) : Sa(S) : S;
  }
}
class _u extends ya {
  constructor(i = !1) {
    super(!1, i);
  }
  set(i, s, d, h) {
    let b = i[s];
    if (!this._isShallow) {
      const _ = En(b);
      if (!Zr(d) && !En(d) && (b = pe(b), d = pe(d)), !mn(i) && gn(b) && !gn(d))
        return _ ? !1 : (b.value = d, !0);
    }
    const x = mn(i) && po(s) ? Number(s) < i.length : so(i, s), S = Reflect.set(
      i,
      s,
      d,
      gn(i) ? i : h
    );
    return i === pe(h) && (x ? bn(d, b) && Yr(i, "set", s, d, b) : Yr(i, "add", s, d)), S;
  }
  deleteProperty(i, s) {
    const d = so(i, s), h = i[s], b = Reflect.deleteProperty(i, s);
    return b && d && Yr(i, "delete", s, void 0, h), b;
  }
  has(i, s) {
    const d = Reflect.has(i, s);
    return (!Vn(s) || !ga.has(s)) && sr(i, "has", s), d;
  }
  ownKeys(i) {
    return sr(
      i,
      "iterate",
      mn(i) ? "length" : sn
    ), Reflect.ownKeys(i);
  }
}
class Mu extends ya {
  constructor(i = !1) {
    super(!0, i);
  }
  set(i, s) {
    return Je.NODE_ENV !== "production" && yn(
      `Set operation on key "${String(s)}" failed: target is readonly.`,
      i
    ), !0;
  }
  deleteProperty(i, s) {
    return Je.NODE_ENV !== "production" && yn(
      `Delete operation on key "${String(s)}" failed: target is readonly.`,
      i
    ), !0;
  }
}
const Fu = /* @__PURE__ */ new _u(), zu = /* @__PURE__ */ new Mu(), yo = (r) => r, Et = (r) => Reflect.getPrototypeOf(r);
function ht(r, i, s = !1, d = !1) {
  r = r.__v_raw;
  const h = pe(r), b = pe(i);
  s || (bn(i, b) && sr(h, "get", i), sr(h, "get", b));
  const { has: x } = Et(h), S = d ? yo : s ? Eo : or;
  if (x.call(h, i))
    return S(r.get(i));
  if (x.call(h, b))
    return S(r.get(b));
  r !== h && r.get(i);
}
function pt(r, i = !1) {
  const s = this.__v_raw, d = pe(s), h = pe(r);
  return i || (bn(r, h) && sr(d, "has", r), sr(d, "has", h)), r === h ? s.has(r) : s.has(r) || s.has(h);
}
function vt(r, i = !1) {
  return r = r.__v_raw, !i && sr(pe(r), "iterate", sn), Reflect.get(r, "size", r);
}
function Yi(r, i = !1) {
  !i && !Zr(r) && !En(r) && (r = pe(r));
  const s = pe(this);
  return Et(s).has.call(s, r) || (s.add(r), Yr(s, "add", r, r)), this;
}
function Zi(r, i, s = !1) {
  !s && !Zr(i) && !En(i) && (i = pe(i));
  const d = pe(this), { has: h, get: b } = Et(d);
  let x = h.call(d, r);
  x ? Je.NODE_ENV !== "production" && ba(d, h, r) : (r = pe(r), x = h.call(d, r));
  const S = b.call(d, r);
  return d.set(r, i), x ? bn(i, S) && Yr(d, "set", r, i, S) : Yr(d, "add", r, i), this;
}
function Qi(r) {
  const i = pe(this), { has: s, get: d } = Et(i);
  let h = s.call(i, r);
  h ? Je.NODE_ENV !== "production" && ba(i, s, r) : (r = pe(r), h = s.call(i, r));
  const b = d ? d.call(i, r) : void 0, x = i.delete(r);
  return h && Yr(i, "delete", r, void 0, b), x;
}
function Xi() {
  const r = pe(this), i = r.size !== 0, s = Je.NODE_ENV !== "production" ? $n(r) ? new Map(r) : new Set(r) : void 0, d = r.clear();
  return i && Yr(r, "clear", void 0, void 0, s), d;
}
function wt(r, i) {
  return function(d, h) {
    const b = this, x = b.__v_raw, S = pe(x), _ = i ? yo : r ? Eo : or;
    return !r && sr(S, "iterate", sn), x.forEach((L, E) => d.call(h, _(L), _(E), b));
  };
}
function mt(r, i, s) {
  return function(...d) {
    const h = this.__v_raw, b = pe(h), x = $n(b), S = r === "entries" || r === Symbol.iterator && x, _ = r === "keys" && x, L = h[r](...d), E = s ? yo : i ? Eo : or;
    return !i && sr(
      b,
      "iterate",
      _ ? fo : sn
    ), {
      // iterator protocol
      next() {
        const { value: A, done: W } = L.next();
        return W ? { value: A, done: W } : {
          value: S ? [E(A[0]), E(A[1])] : E(A),
          done: W
        };
      },
      // iterable protocol
      [Symbol.iterator]() {
        return this;
      }
    };
  };
}
function Jr(r) {
  return function(...i) {
    if (Je.NODE_ENV !== "production") {
      const s = i[0] ? `on key "${i[0]}" ` : "";
      yn(
        `${Su(r)} operation ${s}failed: target is readonly.`,
        pe(this)
      );
    }
    return r === "delete" ? !1 : r === "clear" ? void 0 : this;
  };
}
function Lu() {
  const r = {
    get(b) {
      return ht(this, b);
    },
    get size() {
      return vt(this);
    },
    has: pt,
    add: Yi,
    set: Zi,
    delete: Qi,
    clear: Xi,
    forEach: wt(!1, !1)
  }, i = {
    get(b) {
      return ht(this, b, !1, !0);
    },
    get size() {
      return vt(this);
    },
    has: pt,
    add(b) {
      return Yi.call(this, b, !0);
    },
    set(b, x) {
      return Zi.call(this, b, x, !0);
    },
    delete: Qi,
    clear: Xi,
    forEach: wt(!1, !0)
  }, s = {
    get(b) {
      return ht(this, b, !0);
    },
    get size() {
      return vt(this, !0);
    },
    has(b) {
      return pt.call(this, b, !0);
    },
    add: Jr("add"),
    set: Jr("set"),
    delete: Jr("delete"),
    clear: Jr("clear"),
    forEach: wt(!0, !1)
  }, d = {
    get(b) {
      return ht(this, b, !0, !0);
    },
    get size() {
      return vt(this, !0);
    },
    has(b) {
      return pt.call(this, b, !0);
    },
    add: Jr("add"),
    set: Jr("set"),
    delete: Jr("delete"),
    clear: Jr("clear"),
    forEach: wt(!0, !0)
  };
  return [
    "keys",
    "values",
    "entries",
    Symbol.iterator
  ].forEach((b) => {
    r[b] = mt(b, !1, !1), s[b] = mt(b, !0, !1), i[b] = mt(b, !1, !0), d[b] = mt(
      b,
      !0,
      !0
    );
  }), [
    r,
    s,
    i,
    d
  ];
}
const [
  ju,
  Uu,
  Bu,
  $u
] = /* @__PURE__ */ Lu();
function Ea(r, i) {
  const s = i ? r ? $u : Bu : r ? Uu : ju;
  return (d, h, b) => h === "__v_isReactive" ? !r : h === "__v_isReadonly" ? r : h === "__v_raw" ? d : Reflect.get(
    so(s, h) && h in d ? s : d,
    h,
    b
  );
}
const qu = {
  get: /* @__PURE__ */ Ea(!1, !1)
}, Hu = {
  get: /* @__PURE__ */ Ea(!0, !1)
};
function ba(r, i, s) {
  const d = pe(s);
  if (d !== s && i.call(r, d)) {
    const h = fa(r);
    yn(
      `Reactive ${h} contains both the raw and reactive versions of the same object${h === "Map" ? " as keys" : ""}, which can lead to inconsistencies. Avoid differentiating between the raw and reactive versions of an object and only use the reactive version if possible.`
    );
  }
}
const Pa = /* @__PURE__ */ new WeakMap(), Vu = /* @__PURE__ */ new WeakMap(), Ta = /* @__PURE__ */ new WeakMap(), Gu = /* @__PURE__ */ new WeakMap();
function Ju(r) {
  switch (r) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0;
  }
}
function Ku(r) {
  return r.__v_skip || !Object.isExtensible(r) ? 0 : Ju(fa(r));
}
function Sa(r) {
  return En(r) ? r : Ra(
    r,
    !1,
    Fu,
    qu,
    Pa
  );
}
function Oa(r) {
  return Ra(
    r,
    !0,
    zu,
    Hu,
    Ta
  );
}
function Ra(r, i, s, d, h) {
  if (!yt(r))
    return Je.NODE_ENV !== "production" && yn(
      `value cannot be made ${i ? "readonly" : "reactive"}: ${String(
        r
      )}`
    ), r;
  if (r.__v_raw && !(i && r.__v_isReactive))
    return r;
  const b = h.get(r);
  if (b)
    return b;
  const x = Ku(r);
  if (x === 0)
    return r;
  const S = new Proxy(
    r,
    x === 2 ? d : s
  );
  return h.set(r, S), S;
}
function En(r) {
  return !!(r && r.__v_isReadonly);
}
function Zr(r) {
  return !!(r && r.__v_isShallow);
}
function Yu(r) {
  return r ? !!r.__v_raw : !1;
}
function pe(r) {
  const i = r && r.__v_raw;
  return i ? pe(i) : r;
}
const or = (r) => yt(r) ? Sa(r) : r, Eo = (r) => yt(r) ? Oa(r) : r;
function gn(r) {
  return r ? r.__v_isRef === !0 : !1;
}
function ar(r) {
  return Zu(r, !1);
}
function Zu(r, i) {
  return gn(r) ? r : new Qu(r, i);
}
class Qu {
  constructor(i, s) {
    this.dep = new wa(), this.__v_isRef = !0, this.__v_isShallow = !1, this._rawValue = s ? i : pe(i), this._value = s ? i : or(i), this.__v_isShallow = s;
  }
  get value() {
    return Je.NODE_ENV !== "production" ? this.dep.track({
      target: this,
      type: "get",
      key: "value"
    }) : this.dep.track(), this._value;
  }
  set value(i) {
    const s = this._rawValue, d = this.__v_isShallow || Zr(i) || En(i);
    i = d ? i : pe(i), bn(i, s) && (this._rawValue = i, this._value = d ? i : or(i), Je.NODE_ENV !== "production" ? this.dep.trigger({
      target: this,
      type: "set",
      key: "value",
      newValue: i,
      oldValue: s
    }) : this.dep.trigger());
  }
}
function Xu() {
  const r = /* @__PURE__ */ new Set(), i = (h) => {
    r.delete(h);
  };
  return {
    on: (h) => (r.add(h), {
      off: () => i(h)
    }),
    off: i,
    trigger: (...h) => Promise.all(Array.from(r).map((b) => b(...h)))
  };
}
var ku = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, xa = { exports: {} };
(function(r, i) {
  (function(s, d) {
    r.exports = d();
  })(typeof self < "u" ? self : ku, function() {
    return function(s) {
      var d = {};
      function h(b) {
        if (d[b]) return d[b].exports;
        var x = d[b] = {
          i: b,
          l: !1,
          exports: {}
        };
        return s[b].call(x.exports, x, x.exports, h), x.l = !0, x.exports;
      }
      return h.m = s, h.c = d, h.d = function(b, x, S) {
        h.o(b, x) || Object.defineProperty(b, x, {
          enumerable: !0,
          get: S
        });
      }, h.r = function(b) {
        typeof Symbol < "u" && Symbol.toStringTag && Object.defineProperty(b, Symbol.toStringTag, {
          value: "Module"
        }), Object.defineProperty(b, "__esModule", {
          value: !0
        });
      }, h.t = function(b, x) {
        if (1 & x && (b = h(b)), 8 & x || 4 & x && typeof b == "object" && b && b.__esModule) return b;
        var S = /* @__PURE__ */ Object.create(null);
        if (h.r(S), Object.defineProperty(S, "default", {
          enumerable: !0,
          value: b
        }), 2 & x && typeof b != "string") for (var _ in b) h.d(S, _, (function(L) {
          return b[L];
        }).bind(null, _));
        return S;
      }, h.n = function(b) {
        var x = b && b.__esModule ? function() {
          return b.default;
        } : function() {
          return b;
        };
        return h.d(x, "a", x), x;
      }, h.o = function(b, x) {
        return {}.hasOwnProperty.call(b, x);
      }, h.p = "", h(h.s = 0);
    }([function(s, d, h) {
      h.r(d), h.d(d, "PopupOpenError", function() {
        return _t;
      }), h.d(d, "create", function() {
        return ns;
      }), h.d(d, "destroy", function() {
        return ts;
      }), h.d(d, "destroyComponents", function() {
        return Oi;
      }), h.d(d, "destroyAll", function() {
        return Ri;
      }), h.d(d, "PROP_TYPE", function() {
        return ve;
      }), h.d(d, "PROP_SERIALIZATION", function() {
        return ct;
      }), h.d(d, "CONTEXT", function() {
        return De;
      }), h.d(d, "EVENT", function() {
        return Pe;
      });
      function b(e, n) {
        return (b = Object.setPrototypeOf || function(t, o) {
          return t.__proto__ = o, t;
        })(e, n);
      }
      function x(e, n) {
        e.prototype = Object.create(n.prototype), e.prototype.constructor = e, b(e, n);
      }
      function S() {
        return (S = Object.assign || function(e) {
          for (var n = 1; n < arguments.length; n++) {
            var t = arguments[n];
            for (var o in t) ({}).hasOwnProperty.call(t, o) && (e[o] = t[o]);
          }
          return e;
        }).apply(this, arguments);
      }
      function _(e) {
        try {
          if (!e) return !1;
          if (typeof Promise < "u" && e instanceof Promise) return !0;
          if (typeof window < "u" && typeof window.Window == "function" && e instanceof window.Window || typeof window < "u" && typeof window.constructor == "function" && e instanceof window.constructor) return !1;
          var n = {}.toString;
          if (n) {
            var t = n.call(e);
            if (t === "[object Window]" || t === "[object global]" || t === "[object DOMWindow]") return !1;
          }
          if (typeof e.then == "function") return !0;
        } catch {
          return !1;
        }
        return !1;
      }
      var L = [], E = [], A = 0, W;
      function U() {
        if (!A && W) {
          var e = W;
          W = null, e.resolve();
        }
      }
      function de() {
        A += 1;
      }
      function je() {
        A -= 1, U();
      }
      var T = function() {
        function e(t) {
          var o = this;
          if (this.resolved = void 0, this.rejected = void 0, this.errorHandled = void 0, this.value = void 0, this.error = void 0, this.handlers = void 0, this.dispatching = void 0, this.stack = void 0, this.resolved = !1, this.rejected = !1, this.errorHandled = !1, this.handlers = [], t) {
            var a, u, c = !1, l = !1, f = !1;
            de();
            try {
              t(function(v) {
                f ? o.resolve(v) : (c = !0, a = v);
              }, function(v) {
                f ? o.reject(v) : (l = !0, u = v);
              });
            } catch (v) {
              je(), this.reject(v);
              return;
            }
            je(), f = !0, c ? this.resolve(a) : l && this.reject(u);
          }
        }
        var n = e.prototype;
        return n.resolve = function(t) {
          if (this.resolved || this.rejected) return this;
          if (_(t)) throw new Error("Can not resolve promise with another promise");
          return this.resolved = !0, this.value = t, this.dispatch(), this;
        }, n.reject = function(t) {
          var o = this;
          if (this.resolved || this.rejected) return this;
          if (_(t)) throw new Error("Can not reject promise with another promise");
          if (!t) {
            var a = t && typeof t.toString == "function" ? t.toString() : {}.toString.call(t);
            t = new Error("Expected reject to be called with Error, got " + a);
          }
          return this.rejected = !0, this.error = t, this.errorHandled || setTimeout(function() {
            o.errorHandled || function(u, c) {
              if (L.indexOf(u) === -1) {
                L.push(u), setTimeout(function() {
                  throw u;
                }, 1);
                for (var l = 0; l < E.length; l++) E[l](u, c);
              }
            }(t, o);
          }, 1), this.dispatch(), this;
        }, n.asyncReject = function(t) {
          return this.errorHandled = !0, this.reject(t), this;
        }, n.dispatch = function() {
          var t = this.resolved, o = this.rejected, a = this.handlers;
          if (!this.dispatching && (t || o)) {
            this.dispatching = !0, de();
            for (var u = function(m, y) {
              return m.then(function(P) {
                y.resolve(P);
              }, function(P) {
                y.reject(P);
              });
            }, c = 0; c < a.length; c++) {
              var l = a[c], f = l.onSuccess, v = l.onError, g = l.promise, w = void 0;
              if (t) try {
                w = f ? f(this.value) : this.value;
              } catch (m) {
                g.reject(m);
                continue;
              }
              else if (o) {
                if (!v) {
                  g.reject(this.error);
                  continue;
                }
                try {
                  w = v(this.error);
                } catch (m) {
                  g.reject(m);
                  continue;
                }
              }
              if (w instanceof e && (w.resolved || w.rejected)) {
                var p = w;
                p.resolved ? g.resolve(p.value) : g.reject(p.error), p.errorHandled = !0;
              } else _(w) ? w instanceof e && (w.resolved || w.rejected) ? w.resolved ? g.resolve(w.value) : g.reject(w.error) : u(w, g) : g.resolve(w);
            }
            a.length = 0, this.dispatching = !1, je();
          }
        }, n.then = function(t, o) {
          if (t && typeof t != "function" && !t.call) throw new Error("Promise.then expected a function for success handler");
          if (o && typeof o != "function" && !o.call) throw new Error("Promise.then expected a function for error handler");
          var a = new e();
          return this.handlers.push({
            promise: a,
            onSuccess: t,
            onError: o
          }), this.errorHandled = !0, this.dispatch(), a;
        }, n.catch = function(t) {
          return this.then(void 0, t);
        }, n.finally = function(t) {
          if (t && typeof t != "function" && !t.call) throw new Error("Promise.finally expected a function");
          return this.then(function(o) {
            return e.try(t).then(function() {
              return o;
            });
          }, function(o) {
            return e.try(t).then(function() {
              throw o;
            });
          });
        }, n.timeout = function(t, o) {
          var a = this;
          if (this.resolved || this.rejected) return this;
          var u = setTimeout(function() {
            a.resolved || a.rejected || a.reject(o || new Error("Promise timed out after " + t + "ms"));
          }, t);
          return this.then(function(c) {
            return clearTimeout(u), c;
          });
        }, n.toPromise = function() {
          if (typeof Promise > "u") throw new TypeError("Could not find Promise");
          return Promise.resolve(this);
        }, n.lazy = function() {
          return this.errorHandled = !0, this;
        }, e.resolve = function(t) {
          return t instanceof e ? t : _(t) ? new e(function(o, a) {
            return t.then(o, a);
          }) : new e().resolve(t);
        }, e.reject = function(t) {
          return new e().reject(t);
        }, e.asyncReject = function(t) {
          return new e().asyncReject(t);
        }, e.all = function(t) {
          var o = new e(), a = t.length, u = [].slice();
          if (!a)
            return o.resolve(u), o;
          for (var c = function(v, g, w) {
            return g.then(function(p) {
              u[v] = p, (a -= 1) == 0 && o.resolve(u);
            }, function(p) {
              w.reject(p);
            });
          }, l = 0; l < t.length; l++) {
            var f = t[l];
            if (f instanceof e) {
              if (f.resolved) {
                u[l] = f.value, a -= 1;
                continue;
              }
            } else if (!_(f)) {
              u[l] = f, a -= 1;
              continue;
            }
            c(l, e.resolve(f), o);
          }
          return a === 0 && o.resolve(u), o;
        }, e.hash = function(t) {
          var o = {}, a = [], u = function(l) {
            if (t.hasOwnProperty(l)) {
              var f = t[l];
              _(f) ? a.push(f.then(function(v) {
                o[l] = v;
              })) : o[l] = f;
            }
          };
          for (var c in t) u(c);
          return e.all(a).then(function() {
            return o;
          });
        }, e.map = function(t, o) {
          return e.all(t.map(o));
        }, e.onPossiblyUnhandledException = function(t) {
          return function(o) {
            return E.push(o), {
              cancel: function() {
                E.splice(E.indexOf(o), 1);
              }
            };
          }(t);
        }, e.try = function(t, o, a) {
          if (t && typeof t != "function" && !t.call) throw new Error("Promise.try expected a function");
          var u;
          de();
          try {
            u = t.apply(o, a || []);
          } catch (c) {
            return je(), e.reject(c);
          }
          return je(), e.resolve(u);
        }, e.delay = function(t) {
          return new e(function(o) {
            setTimeout(o, t);
          });
        }, e.isPromise = function(t) {
          return !!(t && t instanceof e) || _(t);
        }, e.flush = function() {
          return function(t) {
            var o = W = W || new t();
            return U(), o;
          }(e);
        }, e;
      }();
      function br(e) {
        return {}.toString.call(e) === "[object RegExp]";
      }
      var _r = {
        IFRAME: "iframe",
        POPUP: "popup"
      }, Oe = `Call was rejected by callee.\r
`;
      function Qe(e) {
        return e === void 0 && (e = window), e.location.protocol;
      }
      function Pr(e) {
        if (e === void 0 && (e = window), e.mockDomain) {
          var n = e.mockDomain.split("//")[0];
          if (n) return n;
        }
        return Qe(e);
      }
      function we(e) {
        return e === void 0 && (e = window), Pr(e) === "about:";
      }
      function ne(e) {
        if (e === void 0 && (e = window), e) try {
          if (e.parent && e.parent !== e) return e.parent;
        } catch {
        }
      }
      function ie(e) {
        if (e === void 0 && (e = window), e && !ne(e)) try {
          return e.opener;
        } catch {
        }
      }
      function Me(e) {
        try {
          return !0;
        } catch {
        }
        return !1;
      }
      function Ee(e) {
        e === void 0 && (e = window);
        var n = e.location;
        if (!n) throw new Error("Can not read window location");
        var t = Qe(e);
        if (!t) throw new Error("Can not read window protocol");
        if (t === "file:") return "file://";
        if (t === "about:") {
          var o = ne(e);
          return o && Me() ? Ee(o) : "about://";
        }
        var a = n.host;
        if (!a) throw new Error("Can not read window host");
        return t + "//" + a;
      }
      function J(e) {
        e === void 0 && (e = window);
        var n = Ee(e);
        return n && e.mockDomain && e.mockDomain.indexOf("mock:") === 0 ? e.mockDomain : n;
      }
      function H(e) {
        if (!function(n) {
          try {
            if (n === window) return !0;
          } catch {
          }
          try {
            var t = Object.getOwnPropertyDescriptor(n, "location");
            if (t && t.enumerable === !1) return !1;
          } catch {
          }
          try {
            if (we(n) && Me()) return !0;
          } catch {
          }
          try {
            if (function(o) {
              return o === void 0 && (o = window), Pr(o) === "mock:";
            }(n) && Me()) return !0;
          } catch {
          }
          try {
            if (Ee(n) === Ee(window)) return !0;
          } catch {
          }
          return !1;
        }(e)) return !1;
        try {
          if (e === window || we(e) && Me() || J(window) === J(e)) return !0;
        } catch {
        }
        return !1;
      }
      function ye(e) {
        if (!H(e)) throw new Error("Expected window to be same domain");
        return e;
      }
      function Gn(e, n) {
        if (!e || !n) return !1;
        var t = ne(n);
        return t ? t === e : function(o) {
          var a = [];
          try {
            for (; o.parent !== o; )
              a.push(o.parent), o = o.parent;
          } catch {
          }
          return a;
        }(n).indexOf(e) !== -1;
      }
      function Pn(e) {
        var n = [], t;
        try {
          t = e.frames;
        } catch {
          t = e;
        }
        var o;
        try {
          o = t.length;
        } catch {
        }
        if (o === 0) return n;
        if (o) {
          for (var a = 0; a < o; a++) {
            var u = void 0;
            try {
              u = t[a];
            } catch {
              continue;
            }
            n.push(u);
          }
          return n;
        }
        for (var c = 0; c < 100; c++) {
          var l = void 0;
          try {
            l = t[c];
          } catch {
            return n;
          }
          if (!l) return n;
          n.push(l);
        }
        return n;
      }
      function Tn(e) {
        for (var n = [], t = 0, o = Pn(e); t < o.length; t++) {
          var a = o[t];
          n.push(a);
          for (var u = 0, c = Tn(a); u < c.length; u++) n.push(c[u]);
        }
        return n;
      }
      function Tr(e) {
        e === void 0 && (e = window);
        try {
          if (e.top) return e.top;
        } catch {
        }
        if (ne(e) === e) return e;
        try {
          if (Gn(window, e) && window.top) return window.top;
        } catch {
        }
        try {
          if (Gn(e, window) && window.top) return window.top;
        } catch {
        }
        for (var n = 0, t = Tn(e); n < t.length; n++) {
          var o = t[n];
          try {
            if (o.top) return o.top;
          } catch {
          }
          if (ne(o) === o) return o;
        }
      }
      function Mr(e) {
        var n = Tr(e);
        if (!n) throw new Error("Can not determine top window");
        var t = [].concat(Tn(n), [n]);
        return t.indexOf(e) === -1 && (t = [].concat(t, [e], Tn(e))), t;
      }
      var Fr = [], Sn = [];
      function xe(e, n) {
        n === void 0 && (n = !0);
        try {
          if (e === window) return !1;
        } catch {
          return !0;
        }
        try {
          if (!e) return !0;
        } catch {
          return !0;
        }
        try {
          if (e.closed) return !0;
        } catch (a) {
          return !a || a.message !== Oe;
        }
        if (n && H(e)) try {
          if (e.mockclosed) return !0;
        } catch {
        }
        try {
          if (!e.parent || !e.top) return !0;
        } catch {
        }
        var t = function(a, u) {
          for (var c = 0; c < a.length; c++) try {
            if (a[c] === u) return c;
          } catch {
          }
          return -1;
        }(Fr, e);
        if (t !== -1) {
          var o = Sn[t];
          if (o && function(a) {
            if (!a.contentWindow || !a.parentNode) return !0;
            var u = a.ownerDocument;
            if (u && u.documentElement && !u.documentElement.contains(a)) {
              for (var c = a; c.parentNode && c.parentNode !== c; ) c = c.parentNode;
              if (!c.host || !u.documentElement.contains(c.host)) return !0;
            }
            return !1;
          }(o)) return !0;
        }
        return !1;
      }
      function On(e) {
        return (e = e || window).navigator.mockUserAgent || e.navigator.userAgent;
      }
      function Jn(e, n) {
        for (var t = Pn(e), o = 0; o < t.length; o++) {
          var a = t[o];
          try {
            if (H(a) && a.name === n && t.indexOf(a) !== -1) return a;
          } catch {
          }
        }
        try {
          if (t.indexOf(e.frames[n]) !== -1) return e.frames[n];
        } catch {
        }
        try {
          if (t.indexOf(e[n]) !== -1) return e[n];
        } catch {
        }
      }
      function bo(e, n) {
        return e === ie(n);
      }
      function Rn(e) {
        return e === void 0 && (e = window), ie(e = e || window) || ne(e) || void 0;
      }
      function bt(e, n) {
        for (var t = 0; t < e.length; t++)
          for (var o = e[t], a = 0; a < n.length; a++) if (o === n[a]) return !0;
        return !1;
      }
      function Pt(e) {
        e === void 0 && (e = window);
        for (var n = 0, t = e; t; ) (t = ne(t)) && (n += 1);
        return n;
      }
      function Kn(e, n) {
        var t = Tr(e) || e, o = Tr(n) || n;
        try {
          if (t && o) return t === o;
        } catch {
        }
        var a = Mr(e), u = Mr(n);
        if (bt(a, u)) return !0;
        var c = ie(t), l = ie(o);
        return c && bt(Mr(c), u) || l && bt(Mr(l), a), !1;
      }
      function ur(e, n) {
        if (typeof e == "string") {
          if (typeof n == "string") return e === "*" || n === e;
          if (br(n) || Array.isArray(n)) return !1;
        }
        return br(e) ? br(n) ? e.toString() === n.toString() : !Array.isArray(n) && !!n.match(e) : !!Array.isArray(e) && (Array.isArray(n) ? JSON.stringify(e) === JSON.stringify(n) : !br(n) && e.some(function(t) {
          return ur(t, n);
        }));
      }
      function xr(e) {
        return e.match(/^(https?|mock|file):\/\//) ? e.split("/").slice(0, 3).join("/") : J();
      }
      function Po(e, n, t, o) {
        t === void 0 && (t = 1e3), o === void 0 && (o = 1 / 0);
        var a;
        return function u() {
          if (xe(e))
            return a && clearTimeout(a), n();
          o <= 0 ? clearTimeout(a) : (o -= t, a = setTimeout(u, t));
        }(), {
          cancel: function() {
            a && clearTimeout(a);
          }
        };
      }
      function Qr(e) {
        try {
          if (e === window) return !0;
        } catch (n) {
          if (n && n.message === Oe) return !0;
        }
        try {
          if ({}.toString.call(e) === "[object Window]") return !0;
        } catch (n) {
          if (n && n.message === Oe) return !0;
        }
        try {
          if (window.Window && e instanceof window.Window) return !0;
        } catch (n) {
          if (n && n.message === Oe) return !0;
        }
        try {
          if (e && e.self === e) return !0;
        } catch (n) {
          if (n && n.message === Oe) return !0;
        }
        try {
          if (e && e.parent === e) return !0;
        } catch (n) {
          if (n && n.message === Oe) return !0;
        }
        try {
          if (e && e.top === e) return !0;
        } catch (n) {
          if (n && n.message === Oe) return !0;
        }
        try {
          if (e && e.__cross_domain_utils_window_check__ === "__unlikely_value__") return !1;
        } catch {
          return !0;
        }
        try {
          if ("postMessage" in e && "self" in e && "location" in e) return !0;
        } catch {
        }
        return !1;
      }
      function Tt(e) {
        if (n = xr(e), n.indexOf("mock:") !== 0) return e;
        var n;
        throw new Error("Mock urls not supported out of test mode");
      }
      function To(e) {
        if (H(e)) return ye(e).frameElement;
        for (var n = 0, t = document.querySelectorAll("iframe"); n < t.length; n++) {
          var o = t[n];
          if (o && o.contentWindow && o.contentWindow === e) return o;
        }
      }
      function So(e) {
        if (function(t) {
          return t === void 0 && (t = window), !!ne(t);
        }(e)) {
          var n = To(e);
          if (n && n.parentElement) {
            n.parentElement.removeChild(n);
            return;
          }
        }
        try {
          e.close();
        } catch {
        }
      }
      function Yn(e, n) {
        for (var t = 0; t < e.length; t++) try {
          if (e[t] === n) return t;
        } catch {
        }
        return -1;
      }
      var Zn = function() {
        function e() {
          if (this.name = void 0, this.weakmap = void 0, this.keys = void 0, this.values = void 0, this.name = "__weakmap_" + (1e9 * Math.random() >>> 0) + "__", function() {
            if (typeof WeakMap > "u" || Object.freeze === void 0) return !1;
            try {
              var t = /* @__PURE__ */ new WeakMap(), o = {};
              return Object.freeze(o), t.set(o, "__testvalue__"), t.get(o) === "__testvalue__";
            } catch {
              return !1;
            }
          }()) try {
            this.weakmap = /* @__PURE__ */ new WeakMap();
          } catch {
          }
          this.keys = [], this.values = [];
        }
        var n = e.prototype;
        return n._cleanupClosedWindows = function() {
          for (var t = this.weakmap, o = this.keys, a = 0; a < o.length; a++) {
            var u = o[a];
            if (Qr(u) && xe(u)) {
              if (t) try {
                t.delete(u);
              } catch {
              }
              o.splice(a, 1), this.values.splice(a, 1), a -= 1;
            }
          }
        }, n.isSafeToReadWrite = function(t) {
          return !Qr(t);
        }, n.set = function(t, o) {
          if (!t) throw new Error("WeakMap expected key");
          var a = this.weakmap;
          if (a) try {
            a.set(t, o);
          } catch {
            delete this.weakmap;
          }
          if (this.isSafeToReadWrite(t)) try {
            var u = this.name, c = t[u];
            c && c[0] === t ? c[1] = o : Object.defineProperty(t, u, {
              value: [t, o],
              writable: !0
            });
            return;
          } catch {
          }
          this._cleanupClosedWindows();
          var l = this.keys, f = this.values, v = Yn(l, t);
          v === -1 ? (l.push(t), f.push(o)) : f[v] = o;
        }, n.get = function(t) {
          if (!t) throw new Error("WeakMap expected key");
          var o = this.weakmap;
          if (o) try {
            if (o.has(t)) return o.get(t);
          } catch {
            delete this.weakmap;
          }
          if (this.isSafeToReadWrite(t)) try {
            var a = t[this.name];
            return a && a[0] === t ? a[1] : void 0;
          } catch {
          }
          this._cleanupClosedWindows();
          var u = Yn(this.keys, t);
          if (u !== -1) return this.values[u];
        }, n.delete = function(t) {
          if (!t) throw new Error("WeakMap expected key");
          var o = this.weakmap;
          if (o) try {
            o.delete(t);
          } catch {
            delete this.weakmap;
          }
          if (this.isSafeToReadWrite(t)) try {
            var a = t[this.name];
            a && a[0] === t && (a[0] = a[1] = void 0);
          } catch {
          }
          this._cleanupClosedWindows();
          var u = this.keys, c = Yn(u, t);
          c !== -1 && (u.splice(c, 1), this.values.splice(c, 1));
        }, n.has = function(t) {
          if (!t) throw new Error("WeakMap expected key");
          var o = this.weakmap;
          if (o) try {
            if (o.has(t)) return !0;
          } catch {
            delete this.weakmap;
          }
          if (this.isSafeToReadWrite(t)) try {
            var a = t[this.name];
            return !(!a || a[0] !== t);
          } catch {
          }
          return this._cleanupClosedWindows(), Yn(this.keys, t) !== -1;
        }, n.getOrSet = function(t, o) {
          if (this.has(t)) return this.get(t);
          var a = o();
          return this.set(t, a), a;
        }, e;
      }();
      function Oo(e) {
        return (Oo = Object.setPrototypeOf ? Object.getPrototypeOf : function(n) {
          return n.__proto__ || Object.getPrototypeOf(n);
        })(e);
      }
      function Ca() {
        if (typeof Reflect > "u" || !Reflect.construct || Reflect.construct.sham) return !1;
        if (typeof Proxy == "function") return !0;
        try {
          return Date.prototype.toString.call(Reflect.construct(Date, [], function() {
          })), !0;
        } catch {
          return !1;
        }
      }
      function Ro(e, n, t) {
        return (Ro = Ca() ? Reflect.construct : function(o, a, u) {
          var c = [null];
          c.push.apply(c, a);
          var l = new (Function.bind.apply(o, c))();
          return u && b(l, u.prototype), l;
        }).apply(null, arguments);
      }
      function xo(e) {
        var n = typeof Map == "function" ? /* @__PURE__ */ new Map() : void 0;
        return (xo = function(t) {
          if (t === null || (o = t, Function.toString.call(o).indexOf("[native code]") === -1)) return t;
          var o;
          if (typeof t != "function") throw new TypeError("Super expression must either be null or a function");
          if (n !== void 0) {
            if (n.has(t)) return n.get(t);
            n.set(t, a);
          }
          function a() {
            return Ro(t, arguments, Oo(this).constructor);
          }
          return a.prototype = Object.create(t.prototype, {
            constructor: {
              value: a,
              enumerable: !1,
              writable: !0,
              configurable: !0
            }
          }), b(a, t);
        })(e);
      }
      function St(e) {
        var n = !1;
        try {
          (e instanceof window.Element || e !== null && typeof e == "object" && e.nodeType === 1 && typeof e.style == "object" && typeof e.ownerDocument == "object") && (n = !0);
        } catch {
        }
        return n;
      }
      function Ot(e) {
        return e.name || e.__name__ || e.displayName || "anonymous";
      }
      function Rt(e, n) {
        try {
          delete e.name, e.name = n;
        } catch {
        }
        return e.__name__ = e.displayName = n, e;
      }
      function xt(e) {
        if (typeof btoa == "function") return btoa(encodeURIComponent(e).replace(/%([0-9A-F]{2})/g, function(n, t) {
          return String.fromCharCode(parseInt(t, 16));
        })).replace(/[=]/g, "");
        if (typeof Buffer < "u") return Buffer.from(e, "utf8").toString("base64").replace(/[=]/g, "");
        throw new Error("Can not find window.btoa or Buffer");
      }
      function Xe() {
        var e = "0123456789abcdef";
        return "uid_" + "xxxxxxxxxx".replace(/./g, function() {
          return e.charAt(Math.floor(Math.random() * e.length));
        }) + "_" + xt((/* @__PURE__ */ new Date()).toISOString().slice(11, 19).replace("T", ".")).replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
      }
      var Qn;
      function Dt(e) {
        try {
          return JSON.stringify([].slice.call(e), function(n, t) {
            return typeof t == "function" ? "memoize[" + function(o) {
              if (Qn = Qn || new Zn(), o == null || typeof o != "object" && typeof o != "function") throw new Error("Invalid object");
              var a = Qn.get(o);
              return a || (a = typeof o + ":" + Xe(), Qn.set(o, a)), a;
            }(t) + "]" : St(t) ? {} : t;
          });
        } catch {
          throw new Error("Arguments not serializable -- can not be used to memoize");
        }
      }
      function Na() {
        return {};
      }
      var xn = 0, Do = 0;
      function zr(e, n) {
        n === void 0 && (n = {});
        var t = n.thisNamespace, o = t !== void 0 && t, a = n.time, u, c, l = xn;
        xn += 1;
        var f = function() {
          for (var v = arguments.length, g = new Array(v), w = 0; w < v; w++) g[w] = arguments[w];
          l < Do && (u = null, c = null, l = xn, xn += 1);
          var p;
          p = o ? (c = c || new Zn()).getOrSet(this, Na) : u = u || {};
          var m;
          try {
            m = Dt(g);
          } catch {
            return e.apply(this, arguments);
          }
          var y = p[m];
          if (y && a && Date.now() - y.time < a && (delete p[m], y = null), y) return y.value;
          var P = Date.now(), O = e.apply(this, arguments);
          return p[m] = {
            time: P,
            value: O
          }, O;
        };
        return f.reset = function() {
          u = null, c = null;
        }, Rt(f, (n.name || Ot(e)) + "::memoized");
      }
      zr.clear = function() {
        Do = xn;
      };
      function Ia(e) {
        var n = {};
        function t() {
          for (var o = arguments, a = this, u = arguments.length, c = new Array(u), l = 0; l < u; l++) c[l] = arguments[l];
          var f = Dt(c);
          return n.hasOwnProperty(f) || (n[f] = T.try(function() {
            return e.apply(a, o);
          }).finally(function() {
            delete n[f];
          })), n[f];
        }
        return t.reset = function() {
          n = {};
        }, Rt(t, Ot(e) + "::promiseMemoized");
      }
      function be() {
      }
      function Xn(e) {
        var n = !1;
        return Rt(function() {
          if (!n)
            return n = !0, e.apply(this, arguments);
        }, Ot(e) + "::once");
      }
      function un(e, n) {
        if (n === void 0 && (n = 1), n >= 3) return "stringifyError stack overflow";
        try {
          if (!e) return "<unknown error: " + {}.toString.call(e) + ">";
          if (typeof e == "string") return e;
          if (e instanceof Error) {
            var t = e && e.stack, o = e && e.message;
            if (t && o) return t.indexOf(o) !== -1 ? t : o + `
` + t;
            if (t) return t;
            if (o) return o;
          }
          return e && e.toString && typeof e.toString == "function" ? e.toString() : {}.toString.call(e);
        } catch (a) {
          return "Error while stringifying error: " + un(a, n + 1);
        }
      }
      function kn(e) {
        return typeof e == "string" ? e : e && e.toString && typeof e.toString == "function" ? e.toString() : {}.toString.call(e);
      }
      function cn(e, n) {
        if (!n) return e;
        if (Object.assign) return Object.assign(e, n);
        for (var t in n) n.hasOwnProperty(t) && (e[t] = n[t]);
        return e;
      }
      zr(function(e) {
        if (Object.values) return Object.values(e);
        var n = [];
        for (var t in e) e.hasOwnProperty(t) && n.push(e[t]);
        return n;
      });
      function Wa(e) {
        return e;
      }
      function Dn(e, n) {
        var t;
        return function o() {
          t = setTimeout(function() {
            e(), o();
          }, n);
        }(), {
          cancel: function() {
            clearTimeout(t);
          }
        };
      }
      function Ct(e) {
        return e.replace(/-([a-z])/g, function(n) {
          return n[1].toUpperCase();
        });
      }
      function Co(e, n, t) {
        if (Array.isArray(e)) {
          if (typeof n != "number") throw new TypeError("Array key must be number");
        } else if (typeof e == "object" && e !== null && typeof n != "string") throw new TypeError("Object key must be string");
        Object.defineProperty(e, n, {
          configurable: !0,
          enumerable: !0,
          get: function() {
            delete e[n];
            var o = t();
            return e[n] = o, o;
          },
          set: function(o) {
            delete e[n], e[n] = o;
          }
        });
      }
      function Nt(e) {
        return [].slice.call(e);
      }
      function No(e) {
        return typeof (n = e) == "object" && n !== null && {}.toString.call(e) === "[object Object]";
        var n;
      }
      function It(e) {
        if (!No(e)) return !1;
        var n = e.constructor;
        if (typeof n != "function") return !1;
        var t = n.prototype;
        return !!No(t) && !!t.hasOwnProperty("isPrototypeOf");
      }
      function et(e, n, t) {
        if (t === void 0 && (t = ""), Array.isArray(e)) {
          for (var o = e.length, a = [], u = function(g) {
            Co(a, g, function() {
              var w = t ? t + "." + g : "" + g, p = n(e[g], g, w);
              return (It(p) || Array.isArray(p)) && (p = et(p, n, w)), p;
            });
          }, c = 0; c < o; c++) u(c);
          return a;
        }
        if (It(e)) {
          var l = {}, f = function(g) {
            if (!e.hasOwnProperty(g)) return 1;
            Co(l, g, function() {
              var w = t ? t + "." + g : "" + g, p = n(e[g], g, w);
              return (It(p) || Array.isArray(p)) && (p = et(p, n, w)), p;
            });
          };
          for (var v in e) f(v);
          return l;
        }
        throw new Error("Pass an object or array");
      }
      function Lr(e) {
        return e != null;
      }
      function Wt(e) {
        return {}.toString.call(e) === "[object RegExp]";
      }
      function Cn(e, n, t) {
        if (e.hasOwnProperty(n)) return e[n];
        var o = t();
        return e[n] = o, o;
      }
      function rt(e) {
        var n = [], t = !1, o, a = {
          set: function(u, c) {
            return t || (e[u] = c, a.register(function() {
              delete e[u];
            })), c;
          },
          register: function(u) {
            var c = Xn(function() {
              return u(o);
            });
            return t ? u(o) : n.push(c), {
              cancel: function() {
                var l = n.indexOf(c);
                l !== -1 && n.splice(l, 1);
              }
            };
          },
          all: function(u) {
            o = u;
            var c = [];
            for (t = !0; n.length; ) {
              var l = n.shift();
              c.push(l());
            }
            return T.all(c).then(be);
          }
        };
        return a;
      }
      function nt(e, n) {
        if (n == null) throw new Error("Expected " + e + " to be present");
        return n;
      }
      var Aa = function(e) {
        x(n, e);
        function n(t) {
          var o;
          return (o = e.call(this, t) || this).name = o.constructor.name, typeof Error.captureStackTrace == "function" ? Error.captureStackTrace(function(a) {
            if (a === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return a;
          }(o), o.constructor) : o.stack = new Error(t).stack, o;
        }
        return n;
      }(xo(Error));
      function Io() {
        var e = document.body;
        if (!e) throw new Error("Body element not found");
        return e;
      }
      function tt() {
        return !!document.body && document.readyState === "complete";
      }
      function Wo() {
        return !!document.body && document.readyState === "interactive";
      }
      function Ao(e) {
        return encodeURIComponent(e);
      }
      zr(function() {
        return new T(function(e) {
          if (tt() || Wo()) return e();
          var n = setInterval(function() {
            if (tt() || Wo())
              return clearInterval(n), e();
          }, 10);
        });
      });
      function _o(e) {
        return function(n, t, o) {
          o === void 0 && (o = []);
          var a = n.__inline_memoize_cache__ = n.__inline_memoize_cache__ || {}, u = Dt(o);
          return a.hasOwnProperty(u) ? a[u] : a[u] = (function() {
            var c = {};
            if (!e || e.indexOf("=") === -1) return c;
            for (var l = 0, f = e.split("&"); l < f.length; l++) {
              var v = f[l];
              (v = v.split("="))[0] && v[1] && (c[decodeURIComponent(v[0])] = decodeURIComponent(v[1]));
            }
            return c;
          }).apply(void 0, o);
        }(_o, 0, [e]);
      }
      function Mo(e, n) {
        return n === void 0 && (n = {}), n && Object.keys(n).length ? function(t) {
          return t === void 0 && (t = {}), Object.keys(t).filter(function(o) {
            return typeof t[o] == "string" || typeof t[o] == "boolean";
          }).map(function(o) {
            var a = t[o];
            if (typeof a != "string" && typeof a != "boolean") throw new TypeError("Invalid type for query");
            return Ao(o) + "=" + Ao(a.toString());
          }).join("&");
        }(S({}, _o(e), n)) : e;
      }
      function _a(e, n) {
        e.appendChild(n);
      }
      function At(e, n) {
        return n === void 0 && (n = document), St(e) ? e : typeof e == "string" ? n.querySelector(e) : void 0;
      }
      function Fo(e) {
        return new T(function(n, t) {
          var o = kn(e), a = At(e);
          if (a) return n(a);
          if (tt()) return t(new Error("Document is ready and element " + o + " does not exist"));
          var u = setInterval(function() {
            if (a = At(e))
              n(a), clearInterval(u);
            else if (tt())
              return clearInterval(u), t(new Error("Document is ready and element " + o + " does not exist"));
          }, 10);
        });
      }
      var _t = function(e) {
        x(n, e);
        function n() {
          return e.apply(this, arguments) || this;
        }
        return n;
      }(Aa), ot;
      function zo(e) {
        if ((ot = ot || new Zn()).has(e)) {
          var n = ot.get(e);
          if (n) return n;
        }
        var t = new T(function(o, a) {
          e.addEventListener("load", function() {
            (function(u) {
              if (function() {
                for (var c = 0; c < Fr.length; c++) {
                  var l = !1;
                  try {
                    l = Fr[c].closed;
                  } catch {
                  }
                  l && (Sn.splice(c, 1), Fr.splice(c, 1));
                }
              }(), u && u.contentWindow) try {
                Fr.push(u.contentWindow), Sn.push(u);
              } catch {
              }
            })(e), o(e);
          }), e.addEventListener("error", function(u) {
            e.contentWindow ? o(e) : a(u);
          });
        });
        return ot.set(e, t), t;
      }
      function Mt(e) {
        return zo(e).then(function(n) {
          if (!n.contentWindow) throw new Error("Could not find window in iframe");
          return n.contentWindow;
        });
      }
      function Lo(e, n) {
        e === void 0 && (e = {});
        var t = e.style || {}, o = function(u, c, l) {
          u === void 0 && (u = "div"), c === void 0 && (c = {}), u = u.toLowerCase();
          var f = document.createElement(u);
          if (c.style && cn(f.style, c.style), c.class && (f.className = c.class.join(" ")), c.id && f.setAttribute("id", c.id), c.attributes) for (var v = 0, g = Object.keys(c.attributes); v < g.length; v++) {
            var w = g[v];
            f.setAttribute(w, c.attributes[w]);
          }
          if (c.styleSheet && function(p, m, y) {
            y === void 0 && (y = window.document), p.styleSheet ? p.styleSheet.cssText = m : p.appendChild(y.createTextNode(m));
          }(f, c.styleSheet), c.html) {
            if (u === "iframe") throw new Error("Iframe html can not be written unless container provided and iframe in DOM");
            f.innerHTML = c.html;
          }
          return f;
        }("iframe", {
          attributes: S({
            allowTransparency: "true"
          }, e.attributes || {}),
          style: S({
            backgroundColor: "transparent",
            border: "none"
          }, t),
          html: e.html,
          class: e.class
        }), a = window.navigator.userAgent.match(/MSIE|Edge/i);
        return o.hasAttribute("id") || o.setAttribute("id", Xe()), zo(o), (e.url || a) && o.setAttribute("src", e.url || "about:blank"), o;
      }
      function jo(e, n, t) {
        return e.addEventListener(n, t), {
          cancel: function() {
            e.removeEventListener(n, t);
          }
        };
      }
      function Ma(e) {
        e.style.setProperty("display", "");
      }
      function Uo(e) {
        e.style.setProperty("display", "none", "important");
      }
      function Nn(e) {
        e && e.parentNode && e.parentNode.removeChild(e);
      }
      function dn(e) {
        return !(e && e.parentNode && e.ownerDocument && e.ownerDocument.documentElement && e.ownerDocument.documentElement.contains(e));
      }
      function Bo(e, n, t) {
        var o = t === void 0 ? {} : t, a = o.width, u = a === void 0 || a, c = o.height, l = c === void 0 || c, f = o.interval, v = f === void 0 ? 100 : f, g = o.win, w = g === void 0 ? window : g, p = e.offsetWidth, m = e.offsetHeight, y = !1;
        n({
          width: p,
          height: m
        });
        var P = function() {
          if (!y && function(N) {
            return !!(N.offsetWidth || N.offsetHeight || N.getClientRects().length);
          }(e)) {
            var M = e.offsetWidth, V = e.offsetHeight;
            (u && M !== p || l && V !== m) && n({
              width: M,
              height: V
            }), p = M, m = V;
          }
        }, O, C;
        return w.addEventListener("resize", P), w.ResizeObserver !== void 0 ? ((O = new w.ResizeObserver(P)).observe(e), C = Dn(P, 10 * v)) : w.MutationObserver !== void 0 ? ((O = new w.MutationObserver(P)).observe(e, {
          attributes: !0,
          childList: !0,
          subtree: !0,
          characterData: !1
        }), C = Dn(P, 10 * v)) : C = Dn(P, v), {
          cancel: function() {
            y = !0, O.disconnect(), window.removeEventListener("resize", P), C.cancel();
          }
        };
      }
      function Ft(e) {
        for (; e.parentNode; ) e = e.parentNode;
        return e.toString() === "[object ShadowRoot]";
      }
      var it = typeof document < "u" ? document.currentScript : null, Fa = zr(function() {
        if (it || (it = function() {
          try {
            var e = function() {
              try {
                throw new Error("_");
              } catch (c) {
                return c.stack || "";
              }
            }(), n = /.*at [^(]*\((.*):(.+):(.+)\)$/gi.exec(e), t = n && n[1];
            if (!t) return;
            for (var o = 0, a = [].slice.call(document.getElementsByTagName("script")).reverse(); o < a.length; o++) {
              var u = a[o];
              if (u.src && u.src === t) return u;
            }
          } catch {
          }
        }())) return it;
        throw new Error("Can not determine current script");
      }), za = Xe();
      zr(function() {
        var e;
        try {
          e = Fa();
        } catch {
          return za;
        }
        var n = e.getAttribute("data-uid");
        if (n && typeof n == "string" || (n = e.getAttribute("data-uid-auto")) && typeof n == "string") return n;
        if (e.src) {
          var t = function(o) {
            for (var a = "", u = 0; u < o.length; u++) {
              var c = o[u].charCodeAt(0) * u;
              o[u + 1] && (c += o[u + 1].charCodeAt(0) * (u - 1)), a += String.fromCharCode(97 + Math.abs(c) % 26);
            }
            return a;
          }(JSON.stringify({
            src: e.src,
            dataset: e.dataset
          }));
          n = "uid_" + t.slice(t.length - 30);
        } else n = Xe();
        return e.setAttribute("data-uid-auto", n), n;
      });
      function $o(e) {
        return typeof e == "string" && /^[0-9]+%$/.test(e);
      }
      function zt(e) {
        if (typeof e == "number") return e;
        var n = e.match(/^([0-9]+)(px|%)$/);
        if (!n) throw new Error("Could not match css value from " + e);
        return parseInt(n[1], 10);
      }
      function qo(e) {
        return zt(e) + "px";
      }
      function Ho(e) {
        return typeof e == "number" ? qo(e) : $o(e) ? e : qo(e);
      }
      function Vo(e, n) {
        if (typeof e == "number") return e;
        if ($o(e)) return parseInt(n * zt(e) / 100, 10);
        if (typeof (t = e) == "string" && /^[0-9]+px$/.test(t)) return zt(e);
        var t;
        throw new Error("Can not normalize dimension: " + e);
      }
      function Sr(e) {
        e === void 0 && (e = window);
        var n = "__post_robot_11_0_0__";
        return e !== window ? e[n] : e[n] = e[n] || {};
      }
      var Go = function() {
        return {};
      };
      function fe(e, n) {
        return e === void 0 && (e = "store"), n === void 0 && (n = Go), Cn(Sr(), e, function() {
          var t = n();
          return {
            has: function(o) {
              return t.hasOwnProperty(o);
            },
            get: function(o, a) {
              return t.hasOwnProperty(o) ? t[o] : a;
            },
            set: function(o, a) {
              return t[o] = a, a;
            },
            del: function(o) {
              delete t[o];
            },
            getOrSet: function(o, a) {
              return Cn(t, o, a);
            },
            reset: function() {
              t = n();
            },
            keys: function() {
              return Object.keys(t);
            }
          };
        });
      }
      var La = function() {
      };
      function at() {
        var e = Sr();
        return e.WINDOW_WILDCARD = e.WINDOW_WILDCARD || new La(), e.WINDOW_WILDCARD;
      }
      function Ze(e, n) {
        return e === void 0 && (e = "store"), n === void 0 && (n = Go), fe("windowStore").getOrSet(e, function() {
          var t = new Zn(), o = function(a) {
            return t.getOrSet(a, n);
          };
          return {
            has: function(a) {
              return o(a).hasOwnProperty(e);
            },
            get: function(a, u) {
              var c = o(a);
              return c.hasOwnProperty(e) ? c[e] : u;
            },
            set: function(a, u) {
              return o(a)[e] = u, u;
            },
            del: function(a) {
              delete o(a)[e];
            },
            getOrSet: function(a, u) {
              return Cn(o(a), e, u);
            }
          };
        });
      }
      function Jo() {
        return fe("instance").getOrSet("instanceID", Xe);
      }
      function Ko(e, n) {
        var t = n.domain, o = Ze("helloPromises"), a = o.get(e);
        a && a.resolve({
          domain: t
        });
        var u = T.resolve({
          domain: t
        });
        return o.set(e, u), u;
      }
      function Lt(e, n) {
        return (0, n.send)(e, "postrobot_hello", {
          instanceID: Jo()
        }, {
          domain: "*",
          timeout: -1
        }).then(function(t) {
          var o = t.origin, a = t.data.instanceID;
          return Ko(e, {
            domain: o
          }), {
            win: e,
            domain: o,
            instanceID: a
          };
        });
      }
      function Yo(e, n) {
        var t = n.send;
        return Ze("windowInstanceIDPromises").getOrSet(e, function() {
          return Lt(e, {
            send: t
          }).then(function(o) {
            return o.instanceID;
          });
        });
      }
      function Zo(e, n, t) {
        n === void 0 && (n = 5e3), t === void 0 && (t = "Window");
        var o = function(a) {
          return Ze("helloPromises").getOrSet(a, function() {
            return new T();
          });
        }(e);
        return n !== -1 && (o = o.timeout(n, new Error(t + " did not load after " + n + "ms"))), o;
      }
      function Qo(e) {
        Ze("knownWindows").set(e, !0);
      }
      function jt(e) {
        return typeof e == "object" && e !== null && typeof e.__type__ == "string";
      }
      function Xo(e) {
        return e === void 0 ? "undefined" : e === null ? "null" : Array.isArray(e) ? "array" : typeof e == "function" ? "function" : typeof e == "object" ? e instanceof Error ? "error" : typeof e.then == "function" ? "promise" : {}.toString.call(e) === "[object RegExp]" ? "regex" : {}.toString.call(e) === "[object Date]" ? "date" : "object" : typeof e == "string" ? "string" : typeof e == "number" ? "number" : typeof e == "boolean" ? "boolean" : void 0;
      }
      function Xr(e, n) {
        return {
          __type__: e,
          __val__: n
        };
      }
      var cr, ja = ((cr = {}).function = function() {
      }, cr.error = function(e) {
        return Xr("error", {
          message: e.message,
          stack: e.stack,
          code: e.code,
          data: e.data
        });
      }, cr.promise = function() {
      }, cr.regex = function(e) {
        return Xr("regex", e.source);
      }, cr.date = function(e) {
        return Xr("date", e.toJSON());
      }, cr.array = function(e) {
        return e;
      }, cr.object = function(e) {
        return e;
      }, cr.string = function(e) {
        return e;
      }, cr.number = function(e) {
        return e;
      }, cr.boolean = function(e) {
        return e;
      }, cr.null = function(e) {
        return e;
      }, cr[void 0] = function(e) {
        return Xr("undefined", e);
      }, cr), Ua = {}, dr, Ba = ((dr = {}).function = function() {
        throw new Error("Function serialization is not implemented; nothing to deserialize");
      }, dr.error = function(e) {
        var n = e.stack, t = e.code, o = e.data, a = new Error(e.message);
        return a.code = t, o && (a.data = o), a.stack = n + `

` + a.stack, a;
      }, dr.promise = function() {
        throw new Error("Promise serialization is not implemented; nothing to deserialize");
      }, dr.regex = function(e) {
        return new RegExp(e);
      }, dr.date = function(e) {
        return new Date(e);
      }, dr.array = function(e) {
        return e;
      }, dr.object = function(e) {
        return e;
      }, dr.string = function(e) {
        return e;
      }, dr.number = function(e) {
        return e;
      }, dr.boolean = function(e) {
        return e;
      }, dr.null = function(e) {
        return e;
      }, dr[void 0] = function() {
      }, dr), $a = {};
      function Ut() {
        return !!On(window).match(/MSIE|trident|edge\/12|edge\/13/i);
      }
      function ko(e) {
        return !Kn(window, e);
      }
      function ei(e, n) {
        if (e) {
          if (J() !== xr(e)) return !0;
        } else if (n && !H(n)) return !0;
        return !1;
      }
      function ri(e) {
        var n = e.win, t = e.domain;
        return !(!Ut() || t && !ei(t, n) || n && !ko(n));
      }
      function Bt(e) {
        return "__postrobot_bridge___" + (e = e || xr(e)).replace(/[^a-zA-Z0-9]+/g, "_");
      }
      function ni() {
        return !!(window.name && window.name === Bt(J()));
      }
      var qa = new T(function(e) {
        if (window.document && window.document.body) return e(window.document.body);
        var n = setInterval(function() {
          if (window.document && window.document.body)
            return clearInterval(n), e(window.document.body);
        }, 10);
      });
      function ti(e) {
        Ze("remoteWindowPromises").getOrSet(e, function() {
          return new T();
        });
      }
      function $t(e) {
        var n = Ze("remoteWindowPromises").get(e);
        if (!n) throw new Error("Remote window promise not found");
        return n;
      }
      function oi(e, n, t) {
        $t(e).resolve(function(o, a, u) {
          if (o !== e) throw new Error("Remote window does not match window");
          if (!ur(a, n)) throw new Error("Remote domain " + a + " does not match domain " + n);
          t.fireAndForget(u);
        });
      }
      function qt(e, n) {
        $t(e).reject(n).catch(be);
      }
      function st(e) {
        for (var n = e.win, t = e.name, o = e.domain, a = fe("popupWindowsByName"), u = Ze("popupWindowsByWin"), c = 0, l = a.keys(); c < l.length; c++) {
          var f = l[c], v = a.get(f);
          v && !xe(v.win) || a.del(f);
        }
        if (xe(n)) return {
          win: n,
          name: t,
          domain: o
        };
        var g = u.getOrSet(n, function() {
          return t ? a.getOrSet(t, function() {
            return {
              win: n,
              name: t
            };
          }) : {
            win: n
          };
        });
        if (g.win && g.win !== n) throw new Error("Different window already linked for window: " + (t || "undefined"));
        return t && (g.name = t, a.set(t, g)), o && (g.domain = o, ti(n)), u.set(n, g), g;
      }
      function ii(e) {
        var n = e.on, t = e.send, o = e.receiveMessage;
        a = window.open, window.open = function(u, c, l, f) {
          var v = a.call(this, Tt(u), c, l, f);
          return v && (st({
            win: v,
            name: c,
            domain: u ? xr(u) : null
          }), v);
        };
        var a;
        (function(u) {
          var c = u.on, l = u.send, f = u.receiveMessage, v = fe("popupWindowsByName");
          c("postrobot_open_tunnel", function(g) {
            var w = g.source, p = g.origin, m = g.data, y = fe("bridges").get(p);
            if (!y) throw new Error("Can not find bridge promise for domain " + p);
            return y.then(function(P) {
              if (w !== P) throw new Error("Message source does not matched registered bridge for domain " + p);
              if (!m.name) throw new Error("Register window expected to be passed window name");
              if (!m.sendMessage) throw new Error("Register window expected to be passed sendMessage method");
              if (!v.has(m.name)) throw new Error("Window with name " + m.name + " does not exist, or was not opened by this window");
              var O = function() {
                return v.get(m.name);
              };
              if (!O().domain) throw new Error("We do not have a registered domain for window " + m.name);
              if (O().domain !== p) throw new Error("Message origin " + p + " does not matched registered window origin " + (O().domain || "unknown"));
              return oi(O().win, p, m.sendMessage), {
                sendMessage: function(C) {
                  if (window && !window.closed && O()) {
                    var M = O().domain;
                    if (M) try {
                      f({
                        data: C,
                        origin: M,
                        source: O().win
                      }, {
                        on: c,
                        send: l
                      });
                    } catch (V) {
                      T.reject(V);
                    }
                  }
                }
              };
            });
          });
        })({
          on: n,
          send: t,
          receiveMessage: o
        }), function(u) {
          var c = u.send;
          Sr(window).openTunnelToParent = function(l) {
            var f = l.name, v = l.source, g = l.canary, w = l.sendMessage, p = fe("tunnelWindows"), m = ne(window);
            if (!m) throw new Error("No parent window found to open tunnel to");
            var y = function(P) {
              var O = P.name, C = P.source, M = P.canary, V = P.sendMessage;
              (function() {
                for (var $ = fe("tunnelWindows"), F = 0, X = $.keys(); F < X.length; F++) {
                  var B = X[F];
                  xe($[B].source) && $.del(B);
                }
              })();
              var N = Xe();
              return fe("tunnelWindows").set(N, {
                name: O,
                source: C,
                canary: M,
                sendMessage: V
              }), N;
            }({
              name: f,
              source: v,
              canary: g,
              sendMessage: w
            });
            return c(m, "postrobot_open_tunnel", {
              name: f,
              sendMessage: function() {
                var P = p.get(y);
                if (P && P.source && !xe(P.source)) {
                  try {
                    P.canary();
                  } catch {
                    return;
                  }
                  P.sendMessage.apply(this, arguments);
                }
              }
            }, {
              domain: "*"
            });
          };
        }({
          send: t
        }), function(u) {
          var c = u.on, l = u.send, f = u.receiveMessage;
          T.try(function() {
            var v = ie(window);
            if (v && ri({
              win: v
            })) {
              return ti(v), (g = v, Ze("remoteBridgeAwaiters").getOrSet(g, function() {
                return T.try(function() {
                  var w = Jn(g, Bt(J()));
                  if (w) return H(w) && Sr(ye(w)) ? w : new T(function(p) {
                    var m, y;
                    m = setInterval(function() {
                      if (w && H(w) && Sr(ye(w)))
                        return clearInterval(m), clearTimeout(y), p(w);
                    }, 100), y = setTimeout(function() {
                      return clearInterval(m), p();
                    }, 2e3);
                  });
                });
              })).then(function(w) {
                return w ? window.name ? Sr(ye(w)).openTunnelToParent({
                  name: window.name,
                  source: window,
                  canary: function() {
                  },
                  sendMessage: function(p) {
                    try {
                    } catch {
                      return;
                    }
                    if (window && !window.closed) try {
                      f({
                        data: p,
                        origin: this.origin,
                        source: this.source
                      }, {
                        on: c,
                        send: l
                      });
                    } catch (m) {
                      T.reject(m);
                    }
                  }
                }).then(function(p) {
                  var m = p.source, y = p.origin, P = p.data;
                  if (m !== v) throw new Error("Source does not match opener");
                  oi(m, y, P.sendMessage);
                }).catch(function(p) {
                  throw qt(v, p), p;
                }) : qt(v, new Error("Can not register with opener: window does not have a name")) : qt(v, new Error("Can not register with opener: no bridge found in opener"));
              });
              var g;
            }
          });
        }({
          on: n,
          send: t,
          receiveMessage: o
        });
      }
      function Ht() {
        for (var e = fe("idToProxyWindow"), n = 0, t = e.keys(); n < t.length; n++) {
          var o = t[n];
          e.get(o).shouldClean() && e.del(o);
        }
      }
      function ai(e, n) {
        var t = n.send, o = n.id, a = o === void 0 ? Xe() : o, u = e.then(function(f) {
          if (H(f)) return ye(f).name;
        }), c = e.then(function(f) {
          if (xe(f)) throw new Error("Window is closed, can not determine type");
          return ie(f) ? _r.POPUP : _r.IFRAME;
        });
        u.catch(be), c.catch(be);
        var l = function() {
          return e.then(function(f) {
            if (!xe(f)) return H(f) ? ye(f).name : u;
          });
        };
        return {
          id: a,
          getType: function() {
            return c;
          },
          getInstanceID: Ia(function() {
            return e.then(function(f) {
              return Yo(f, {
                send: t
              });
            });
          }),
          close: function() {
            return e.then(So);
          },
          getName: l,
          focus: function() {
            return e.then(function(f) {
              f.focus();
            });
          },
          isClosed: function() {
            return e.then(function(f) {
              return xe(f);
            });
          },
          setLocation: function(f, v) {
            return v === void 0 && (v = {}), e.then(function(g) {
              var w = window.location.protocol + "//" + window.location.host, p = v.method, m = p === void 0 ? "get" : p, y = v.body;
              if (f.indexOf("/") === 0) f = "" + w + f;
              else if (!f.match(/^https?:\/\//) && f.indexOf(w) !== 0) throw new Error("Expected url to be http or https url, or absolute path, got " + JSON.stringify(f));
              if (m === "post") return l().then(function(P) {
                if (!P) throw new Error("Can not post to window without target name");
                (function(O) {
                  var C = O.url, M = O.target, V = O.body, N = O.method, $ = N === void 0 ? "post" : N, F = document.createElement("form");
                  if (F.setAttribute("target", M), F.setAttribute("method", $), F.setAttribute("action", C), F.style.display = "none", V) for (var X = 0, B = Object.keys(V); X < B.length; X++) {
                    var ue, te = B[X], K = document.createElement("input");
                    K.setAttribute("name", te), K.setAttribute("value", (ue = V[te]) == null ? void 0 : ue.toString()), F.appendChild(K);
                  }
                  Io().appendChild(F), F.submit(), Io().removeChild(F);
                })({
                  url: f,
                  target: P,
                  method: m,
                  body: y
                });
              });
              if (m !== "get") throw new Error("Unsupported method: " + m);
              if (H(g)) try {
                if (g.location && typeof g.location.replace == "function") {
                  g.location.replace(f);
                  return;
                }
              } catch {
              }
              g.location = f;
            });
          },
          setName: function(f) {
            return e.then(function(v) {
              st({
                win: v,
                name: f
              });
              var g = H(v), w = To(v);
              if (!g) throw new Error("Can not set name for cross-domain window: " + f);
              ye(v).name = f, w && w.setAttribute("name", f), u = T.resolve(f);
            });
          }
        };
      }
      var fr = function() {
        function e(t) {
          var o = t.send, a = t.win, u = t.serializedWindow;
          this.id = void 0, this.isProxyWindow = !0, this.serializedWindow = void 0, this.actualWindow = void 0, this.actualWindowPromise = void 0, this.send = void 0, this.name = void 0, this.actualWindowPromise = new T(), this.serializedWindow = u || ai(this.actualWindowPromise, {
            send: o
          }), fe("idToProxyWindow").set(this.getID(), this), a && this.setWindow(a, {
            send: o
          });
        }
        var n = e.prototype;
        return n.getID = function() {
          return this.serializedWindow.id;
        }, n.getType = function() {
          return this.serializedWindow.getType();
        }, n.isPopup = function() {
          return this.getType().then(function(t) {
            return t === _r.POPUP;
          });
        }, n.setLocation = function(t, o) {
          var a = this;
          return this.serializedWindow.setLocation(t, o).then(function() {
            return a;
          });
        }, n.getName = function() {
          return this.serializedWindow.getName();
        }, n.setName = function(t) {
          var o = this;
          return this.serializedWindow.setName(t).then(function() {
            return o;
          });
        }, n.close = function() {
          var t = this;
          return this.serializedWindow.close().then(function() {
            return t;
          });
        }, n.focus = function() {
          var t = this, o = this.isPopup(), a = this.getName(), u = T.hash({
            isPopup: o,
            name: a
          }).then(function(l) {
            var f = l.name;
            l.isPopup && f && window.open("", f, "noopener");
          }), c = this.serializedWindow.focus();
          return T.all([u, c]).then(function() {
            return t;
          });
        }, n.isClosed = function() {
          return this.serializedWindow.isClosed();
        }, n.getWindow = function() {
          return this.actualWindow;
        }, n.setWindow = function(t, o) {
          var a = o.send;
          this.actualWindow = t, this.actualWindowPromise.resolve(this.actualWindow), this.serializedWindow = ai(this.actualWindowPromise, {
            send: a,
            id: this.getID()
          }), Ze("winToProxyWindow").set(t, this);
        }, n.awaitWindow = function() {
          return this.actualWindowPromise;
        }, n.matchWindow = function(t, o) {
          var a = this, u = o.send;
          return T.try(function() {
            return a.actualWindow ? t === a.actualWindow : T.hash({
              proxyInstanceID: a.getInstanceID(),
              knownWindowInstanceID: Yo(t, {
                send: u
              })
            }).then(function(c) {
              var l = c.proxyInstanceID === c.knownWindowInstanceID;
              return l && a.setWindow(t, {
                send: u
              }), l;
            });
          });
        }, n.unwrap = function() {
          return this.actualWindow || this;
        }, n.getInstanceID = function() {
          return this.serializedWindow.getInstanceID();
        }, n.shouldClean = function() {
          return !!(this.actualWindow && xe(this.actualWindow));
        }, n.serialize = function() {
          return this.serializedWindow;
        }, e.unwrap = function(t) {
          return e.isProxyWindow(t) ? t.unwrap() : t;
        }, e.serialize = function(t, o) {
          var a = o.send;
          return Ht(), e.toProxyWindow(t, {
            send: a
          }).serialize();
        }, e.deserialize = function(t, o) {
          var a = o.send;
          return Ht(), fe("idToProxyWindow").get(t.id) || new e({
            serializedWindow: t,
            send: a
          });
        }, e.isProxyWindow = function(t) {
          return !!(t && !Qr(t) && t.isProxyWindow);
        }, e.toProxyWindow = function(t, o) {
          var a = o.send;
          if (Ht(), e.isProxyWindow(t)) return t;
          var u = t;
          return Ze("winToProxyWindow").get(u) || new e({
            win: u,
            send: a
          });
        }, e;
      }();
      function Vt(e, n, t, o, a) {
        var u = Ze("methodStore"), c = fe("proxyWindowMethods");
        fr.isProxyWindow(o) ? c.set(e, {
          val: n,
          name: t,
          domain: a,
          source: o
        }) : (c.del(e), u.getOrSet(o, function() {
          return {};
        })[e] = {
          domain: a,
          name: t,
          val: n,
          source: o
        });
      }
      function si(e, n) {
        var t = Ze("methodStore"), o = fe("proxyWindowMethods");
        return t.getOrSet(e, function() {
          return {};
        })[n] || o.get(n);
      }
      function ui(e, n, t, o, a) {
        c = (u = {
          on: a.on,
          send: a.send
        }).on, l = u.send, fe("builtinListeners").getOrSet("functionCalls", function() {
          return c("postrobot_method", {
            domain: "*"
          }, function(g) {
            var w = g.source, p = g.origin, m = g.data, y = m.id, P = m.name, O = si(w, y);
            if (!O) throw new Error("Could not find method '" + P + "' with id: " + m.id + " in " + J(window));
            var C = O.source, M = O.domain, V = O.val;
            return T.try(function() {
              if (!ur(M, p)) throw new Error("Method '" + m.name + "' domain " + JSON.stringify(Wt(O.domain) ? O.domain.source : O.domain) + " does not match origin " + p + " in " + J(window));
              if (fr.isProxyWindow(C)) return C.matchWindow(w, {
                send: l
              }).then(function(N) {
                if (!N) throw new Error("Method call '" + m.name + "' failed - proxy window does not match source in " + J(window));
              });
            }).then(function() {
              return V.apply({
                source: w,
                origin: p
              }, m.args);
            }, function(N) {
              return T.try(function() {
                if (V.onError) return V.onError(N);
              }).then(function() {
                throw N.stack && (N.stack = "Remote call to " + P + "(" + function($) {
                  return $ === void 0 && ($ = []), Nt($).map(function(F) {
                    return typeof F == "string" ? "'" + F + "'" : F === void 0 ? "undefined" : F === null ? "null" : typeof F == "boolean" ? F.toString() : Array.isArray(F) ? "[ ... ]" : typeof F == "object" ? "{ ... }" : typeof F == "function" ? "() => { ... }" : "<" + typeof F + ">";
                  }).join(", ");
                }(m.args) + `) failed

` + N.stack), N;
              });
            }).then(function(N) {
              return {
                result: N,
                id: y,
                name: P
              };
            });
          });
        });
        var u, c, l, f = t.__id__ || Xe();
        e = fr.unwrap(e);
        var v = t.__name__ || t.name || o;
        return typeof v == "string" && typeof v.indexOf == "function" && v.indexOf("anonymous::") === 0 && (v = v.replace("anonymous::", o + "::")), fr.isProxyWindow(e) ? (Vt(f, t, v, e, n), e.awaitWindow().then(function(g) {
          Vt(f, t, v, g, n);
        })) : Vt(f, t, v, e, n), Xr("cross_domain_function", {
          id: f,
          name: v
        });
      }
      function ci(e, n, t, o) {
        var a, u = o.on, c = o.send;
        return function(l, f) {
          f === void 0 && (f = Ua);
          var v = JSON.stringify(l, function(g) {
            var w = this[g];
            if (jt(this)) return w;
            var p = Xo(w);
            if (!p) return w;
            var m = f[p] || ja[p];
            return m ? m(w, g) : w;
          });
          return v === void 0 ? "undefined" : v;
        }(t, ((a = {}).promise = function(l, f) {
          return function(v, g, w, p, m) {
            return Xr("cross_domain_zalgo_promise", {
              then: ui(v, g, function(y, P) {
                return w.then(y, P);
              }, p, {
                on: m.on,
                send: m.send
              })
            });
          }(e, n, l, f, {
            on: u,
            send: c
          });
        }, a.function = function(l, f) {
          return ui(e, n, l, f, {
            on: u,
            send: c
          });
        }, a.object = function(l) {
          return Qr(l) || fr.isProxyWindow(l) ? Xr("cross_domain_window", fr.serialize(l, {
            send: c
          })) : l;
        }, a));
      }
      function di(e, n, t, o) {
        var a, u = o.send;
        return function(c, l) {
          if (l === void 0 && (l = $a), c !== "undefined") return JSON.parse(c, function(f, v) {
            if (jt(this)) return v;
            var g, w;
            if (jt(v) ? (g = v.__type__, w = v.__val__) : (g = Xo(v), w = v), !g) return w;
            var p = l[g] || Ba[g];
            return p ? p(w, f) : w;
          });
        }(t, ((a = {}).cross_domain_zalgo_promise = function(c) {
          return function(l, f, v) {
            return new T(v.then);
          }(0, 0, c);
        }, a.cross_domain_function = function(c) {
          return function(l, f, v, g) {
            var w = v.id, p = v.name, m = g.send, y = function(O) {
              O === void 0 && (O = {});
              function C() {
                var M = arguments;
                return fr.toProxyWindow(l, {
                  send: m
                }).awaitWindow().then(function(V) {
                  var N = si(V, w);
                  if (N && N.val !== C) return N.val.apply({
                    source: window,
                    origin: J()
                  }, M);
                  var $ = [].slice.call(M);
                  return O.fireAndForget ? m(V, "postrobot_method", {
                    id: w,
                    name: p,
                    args: $
                  }, {
                    domain: f,
                    fireAndForget: !0
                  }) : m(V, "postrobot_method", {
                    id: w,
                    name: p,
                    args: $
                  }, {
                    domain: f,
                    fireAndForget: !1
                  }).then(function(F) {
                    return F.data.result;
                  });
                }).catch(function(V) {
                  throw V;
                });
              }
              return C.__name__ = p, C.__origin__ = f, C.__source__ = l, C.__id__ = w, C.origin = f, C;
            }, P = y();
            return P.fireAndForget = y({
              fireAndForget: !0
            }), P;
          }(e, n, c, {
            send: u
          });
        }, a.cross_domain_window = function(c) {
          return fr.deserialize(c, {
            send: u
          });
        }, a));
      }
      var In = {};
      In.postrobot_post_message = function(e, n, t) {
        t.indexOf("file:") === 0 && (t = "*"), e.postMessage(n, t);
      }, In.postrobot_bridge = function(e, n, t) {
        if (!Ut() && !ni()) throw new Error("Bridge not needed for browser");
        if (H(e)) throw new Error("Post message through bridge disabled between same domain windows");
        if (Kn(window, e) !== !1) throw new Error("Can only use bridge to communicate between two different windows, not between frames");
        (function(o, a, u) {
          var c = bo(window, o), l = bo(o, window);
          if (!c && !l) throw new Error("Can only send messages to and from parent and popup windows");
          $t(o).then(function(f) {
            return f(o, a, u);
          });
        })(e, t, n);
      }, In.postrobot_global = function(e, n) {
        if (!On(window).match(/MSIE|rv:11|trident|edge\/12|edge\/13/i)) throw new Error("Global messaging not needed for browser");
        if (!H(e)) throw new Error("Post message through global disabled between different domain windows");
        if (Kn(window, e) !== !1) throw new Error("Can only use global to communicate between two different windows, not between frames");
        var t = Sr(e);
        if (!t) throw new Error("Can not find postRobot global on foreign window");
        t.receiveMessage({
          source: window,
          origin: J(),
          data: n
        });
      };
      function Gt(e, n, t, o) {
        var a = o.on, u = o.send;
        return T.try(function() {
          var c = Ze().getOrSet(e, function() {
            return {};
          });
          return c.buffer = c.buffer || [], c.buffer.push(t), c.flush = c.flush || T.flush().then(function() {
            if (xe(e)) throw new Error("Window is closed");
            var l = ci(e, n, ((f = {}).__post_robot_11_0_0__ = c.buffer || [], f), {
              on: a,
              send: u
            }), f;
            delete c.buffer;
            for (var v = Object.keys(In), g = [], w = 0; w < v.length; w++) {
              var p = v[w];
              try {
                In[p](e, l, n);
              } catch (m) {
                g.push(m);
              }
            }
            if (g.length === v.length) throw new Error(`All post-robot messaging strategies failed:

` + g.map(function(m, y) {
              return y + ". " + un(m);
            }).join(`

`));
          }), c.flush.then(function() {
            delete c.flush;
          });
        }).then(be);
      }
      function fi(e) {
        return fe("responseListeners").get(e);
      }
      function li(e) {
        fe("responseListeners").del(e);
      }
      function hi(e) {
        return fe("erroredResponseListeners").has(e);
      }
      function pi(e) {
        var n = e.name, t = e.win, o = e.domain, a = Ze("requestListeners");
        if (t === "*" && (t = null), o === "*" && (o = null), !n) throw new Error("Name required to get request listener");
        for (var u = 0, c = [t, at()]; u < c.length; u++) {
          var l = c[u];
          if (l) {
            var f = a.get(l);
            if (f) {
              var v = f[n];
              if (v) {
                if (o && typeof o == "string") {
                  if (v[o]) return v[o];
                  if (v.__domain_regex__) for (var g = 0, w = v.__domain_regex__; g < w.length; g++) {
                    var p = w[g], m = p.listener;
                    if (ur(p.regex, o)) return m;
                  }
                }
                if (v["*"]) return v["*"];
              }
            }
          }
        }
      }
      function Jt(e, n) {
        var t = n.on, o = n.send, a = fe("receivedMessages");
        try {
          if (!window || window.closed || !e.source) return;
        } catch {
          return;
        }
        var u = e.source, c = e.origin, l = function(w, p, m, y) {
          var P = y.on, O = y.send, C;
          try {
            C = di(p, m, w, {
              on: P,
              send: O
            });
          } catch {
            return;
          }
          if (C && typeof C == "object" && C !== null) {
            var M = C.__post_robot_11_0_0__;
            if (Array.isArray(M)) return M;
          }
        }(e.data, u, c, {
          on: t,
          send: o
        });
        if (l) {
          Qo(u);
          for (var f, v = function() {
            var w = l[g];
            if (a.has(w.id)) return {
              v: void 0
            };
            if (a.set(w.id, !0), xe(u) && !w.fireAndForget) return {
              v: void 0
            };
            w.origin.indexOf("file:") === 0 && (c = "file://");
            try {
              w.type === "postrobot_message_request" ? function(p, m, y, P) {
                var O = P.on, C = P.send, M = pi({
                  name: y.name,
                  win: p,
                  domain: m
                }), V = y.name === "postrobot_method" && y.data && typeof y.data.name == "string" ? y.data.name + "()" : y.name;
                function N($, F, X) {
                  return T.flush().then(function() {
                    if (!y.fireAndForget && !xe(p)) try {
                      return Gt(p, m, {
                        id: Xe(),
                        origin: J(window),
                        type: "postrobot_message_response",
                        hash: y.hash,
                        name: y.name,
                        ack: $,
                        data: F,
                        error: X
                      }, {
                        on: O,
                        send: C
                      });
                    } catch (B) {
                      throw new Error("Send response message failed for " + V + " in " + J() + `

` + un(B));
                    }
                  });
                }
                T.all([T.flush().then(function() {
                  if (!y.fireAndForget && !xe(p)) try {
                    return Gt(p, m, {
                      id: Xe(),
                      origin: J(window),
                      type: "postrobot_message_ack",
                      hash: y.hash,
                      name: y.name
                    }, {
                      on: O,
                      send: C
                    });
                  } catch ($) {
                    throw new Error("Send ack message failed for " + V + " in " + J() + `

` + un($));
                  }
                }), T.try(function() {
                  if (!M) throw new Error("No handler found for post message: " + y.name + " from " + m + " in " + window.location.protocol + "//" + window.location.host + window.location.pathname);
                  return M.handler({
                    source: p,
                    origin: m,
                    data: y.data
                  });
                }).then(function($) {
                  return N("success", $);
                }, function($) {
                  return N("error", null, $);
                })]).then(be).catch(function($) {
                  if (M && M.handleError) return M.handleError($);
                  throw $;
                });
              }(u, c, w, {
                on: t,
                send: o
              }) : w.type === "postrobot_message_response" ? function(p, m, y) {
                if (!hi(y.hash)) {
                  var P = fi(y.hash);
                  if (!P) throw new Error("No handler found for post message response for message: " + y.name + " from " + m + " in " + window.location.protocol + "//" + window.location.host + window.location.pathname);
                  if (!ur(P.domain, m)) throw new Error("Response origin " + m + " does not match domain " + (O = P.domain, Array.isArray(O) ? "(" + O.join(" | ") + ")" : br(O) ? "RegExp(" + O.toString() + ")" : O.toString()));
                  var O;
                  if (p !== P.win) throw new Error("Response source does not match registered window");
                  li(y.hash), y.ack === "error" ? P.promise.reject(y.error) : y.ack === "success" && P.promise.resolve({
                    source: p,
                    origin: m,
                    data: y.data
                  });
                }
              }(u, c, w) : w.type === "postrobot_message_ack" && function(p, m, y) {
                if (!hi(y.hash)) {
                  var P = fi(y.hash);
                  if (!P) throw new Error("No handler found for post message ack for message: " + y.name + " from " + m + " in " + window.location.protocol + "//" + window.location.host + window.location.pathname);
                  try {
                    if (!ur(P.domain, m)) throw new Error("Ack origin " + m + " does not match domain " + P.domain.toString());
                    if (p !== P.win) throw new Error("Ack source does not match registered window");
                  } catch (O) {
                    P.promise.reject(O);
                  }
                  P.ack = !0;
                }
              }(u, c, w);
            } catch (p) {
              setTimeout(function() {
                throw p;
              }, 0);
            }
          }, g = 0; g < l.length; g++) if (f = v()) return f.v;
        }
      }
      function Dr(e, n, t) {
        if (!e) throw new Error("Expected name");
        if (typeof (n = n || {}) == "function" && (t = n, n = {}), !t) throw new Error("Expected handler");
        var o = function a(u, c) {
          var l = u.name, f = u.win, v = u.domain, g = Ze("requestListeners");
          if (!l || typeof l != "string") throw new Error("Name required to add request listener");
          if (f && f !== "*" && fr.isProxyWindow(f)) {
            var w = f.awaitWindow().then(function(ue) {
              return a({
                name: l,
                win: ue,
                domain: v
              }, c);
            });
            return {
              cancel: function() {
                w.then(function(ue) {
                  return ue.cancel();
                }, be);
              }
            };
          }
          var p = f;
          if (Array.isArray(p)) {
            for (var m = [], y = 0, P = p; y < P.length; y++) m.push(a({
              name: l,
              domain: v,
              win: P[y]
            }, c));
            return {
              cancel: function() {
                for (var ue = 0; ue < m.length; ue++) m[ue].cancel();
              }
            };
          }
          if (Array.isArray(v)) {
            for (var O = [], C = 0, M = v; C < M.length; C++) O.push(a({
              name: l,
              win: p,
              domain: M[C]
            }, c));
            return {
              cancel: function() {
                for (var ue = 0; ue < O.length; ue++) O[ue].cancel();
              }
            };
          }
          var V = pi({
            name: l,
            win: p,
            domain: v
          });
          p && p !== "*" || (p = at());
          var N = (v = v || "*").toString();
          if (V) throw p && v ? new Error("Request listener already exists for " + l + " on domain " + v.toString() + " for " + (p === at() ? "wildcard" : "specified") + " window") : p ? new Error("Request listener already exists for " + l + " for " + (p === at() ? "wildcard" : "specified") + " window") : v ? new Error("Request listener already exists for " + l + " on domain " + v.toString()) : new Error("Request listener already exists for " + l);
          var $ = g.getOrSet(p, function() {
            return {};
          }), F = Cn($, l, function() {
            return {};
          }), X, B;
          return Wt(v) ? (X = Cn(F, "__domain_regex__", function() {
            return [];
          })).push(B = {
            regex: v,
            listener: c
          }) : F[N] = c, {
            cancel: function() {
              delete F[N], B && (X.splice(X.indexOf(B, 1)), X.length || delete F.__domain_regex__), Object.keys(F).length || delete $[l], p && !Object.keys($).length && g.del(p);
            }
          };
        }({
          name: e,
          win: n.window,
          domain: n.domain || "*"
        }, {
          handler: t || n.handler,
          handleError: n.errorHandler || function(a) {
            throw a;
          }
        });
        return {
          cancel: function() {
            o.cancel();
          }
        };
      }
      var mr = function e(n, t, o, a) {
        var u = (a = a || {}).domain || "*", c = a.timeout || -1, l = a.timeout || 5e3, f = a.fireAndForget || !1;
        return fr.toProxyWindow(n, {
          send: e
        }).awaitWindow().then(function(v) {
          return T.try(function() {
            if (function(g, w, p) {
              if (!g) throw new Error("Expected name");
              if (p && typeof p != "string" && !Array.isArray(p) && !Wt(p)) throw new TypeError("Can not send " + g + ". Expected domain " + JSON.stringify(p) + " to be a string, array, or regex");
              if (xe(w)) throw new Error("Can not send " + g + ". Target window is closed");
            }(t, v, u), function(g, w) {
              var p = Rn(w);
              if (p) return p === g;
              if (w === g || Tr(w) === w) return !1;
              for (var m = 0, y = Pn(g); m < y.length; m++) if (y[m] === w) return !0;
              return !1;
            }(window, v)) return Zo(v, l);
          }).then(function(g) {
            return function(w, p, m, y) {
              var P = y.send;
              return T.try(function() {
                return typeof p == "string" ? p : T.try(function() {
                  return m || Lt(w, {
                    send: P
                  }).then(function(O) {
                    return O.domain;
                  });
                }).then(function(O) {
                  if (!ur(p, p)) throw new Error("Domain " + kn(p) + " does not match " + kn(p));
                  return O;
                });
              });
            }(v, u, (g === void 0 ? {} : g).domain, {
              send: e
            });
          }).then(function(g) {
            var w = g, p = t === "postrobot_method" && o && typeof o.name == "string" ? o.name + "()" : t, m = new T(), y = t + "_" + Xe();
            if (!f) {
              var P = {
                name: t,
                win: v,
                domain: w,
                promise: m
              };
              (function(F, X) {
                fe("responseListeners").set(F, X);
              })(y, P);
              var O = Ze("requestPromises").getOrSet(v, function() {
                return [];
              });
              O.push(m), m.catch(function() {
                (function(F) {
                  fe("erroredResponseListeners").set(F, !0);
                })(y), li(y);
              });
              var C = function(F) {
                return Ze("knownWindows").get(F, !1);
              }(v) ? 1e4 : 2e3, M = c, V = C, N = M, $ = Dn(function() {
                return xe(v) ? m.reject(new Error("Window closed for " + t + " before " + (P.ack ? "response" : "ack"))) : P.cancelled ? m.reject(new Error("Response listener was cancelled for " + t)) : (V = Math.max(V - 500, 0), N !== -1 && (N = Math.max(N - 500, 0)), P.ack || V !== 0 ? N === 0 ? m.reject(new Error("No response for postMessage " + p + " in " + J() + " in " + M + "ms")) : void 0 : m.reject(new Error("No ack for postMessage " + p + " in " + J() + " in " + C + "ms")));
              }, 500);
              m.finally(function() {
                $.cancel(), O.splice(O.indexOf(m, 1));
              }).catch(be);
            }
            return Gt(v, w, {
              id: Xe(),
              origin: J(window),
              type: "postrobot_message_request",
              hash: y,
              name: t,
              data: o,
              fireAndForget: f
            }, {
              on: Dr,
              send: e
            }).then(function() {
              return f ? m.resolve() : m;
            }, function(F) {
              throw new Error("Send request message failed for " + p + " in " + J() + `

` + un(F));
            });
          });
        });
      };
      function Wn(e) {
        return fr.toProxyWindow(e, {
          send: mr
        });
      }
      function vi(e) {
        for (var n = 0, t = Ze("requestPromises").get(e, []); n < t.length; n++) t[n].reject(new Error("Window " + (xe(e) ? "closed" : "cleaned up") + " before response")).catch(be);
      }
      var jr;
      jr = {
        setupBridge: ii,
        openBridge: function(e, n) {
          var t = fe("bridges"), o = fe("bridgeFrames");
          return n = n || xr(e), t.getOrSet(n, function() {
            return T.try(function() {
              if (J() === n) throw new Error("Can not open bridge on the same domain as current domain: " + n);
              var a = Bt(n);
              if (Jn(window, a)) throw new Error("Frame with name " + a + " already exists on page");
              var u = function(c, l) {
                var f = document.createElement("iframe");
                return f.setAttribute("name", c), f.setAttribute("id", c), f.setAttribute("style", "display: none; margin: 0; padding: 0; border: 0px none; overflow: hidden;"), f.setAttribute("frameborder", "0"), f.setAttribute("border", "0"), f.setAttribute("scrolling", "no"), f.setAttribute("allowTransparency", "true"), f.setAttribute("tabindex", "-1"), f.setAttribute("hidden", "true"), f.setAttribute("title", ""), f.setAttribute("role", "presentation"), f.src = l, f;
              }(a, e);
              return o.set(n, u), qa.then(function(c) {
                c.appendChild(u);
                var l = u.contentWindow;
                return new T(function(f, v) {
                  u.addEventListener("load", f), u.addEventListener("error", v);
                }).then(function() {
                  return Zo(l, 5e3, "Bridge " + e);
                }).then(function() {
                  return l;
                });
              });
            });
          });
        },
        linkWindow: st,
        linkUrl: function(e, n) {
          st({
            win: e,
            domain: xr(n)
          });
        },
        isBridge: ni,
        needsBridge: ri,
        needsBridgeForBrowser: Ut,
        hasBridge: function(e, n) {
          return fe("bridges").has(n || xr(e));
        },
        needsBridgeForWin: ko,
        needsBridgeForDomain: ei,
        destroyBridges: function() {
          for (var e = fe("bridges"), n = fe("bridgeFrames"), t = 0, o = n.keys(); t < o.length; t++) {
            var a = n.get(o[t]);
            a && a.parentNode && a.parentNode.removeChild(a);
          }
          n.reset(), e.reset();
        }
      };
      function An(e) {
        if (!H(e)) throw new Error("Can not get global for window on different domain");
        return e.__zoid_10_3_3__ || (e.__zoid_10_3_3__ = {}), e.__zoid_10_3_3__;
      }
      function wi(e, n) {
        try {
          return n(An(e));
        } catch {
        }
      }
      function ut(e) {
        return {
          get: function() {
            var n = this;
            return T.try(function() {
              if (n.source && n.source !== window) throw new Error("Can not call get on proxy object from a remote window");
              return e;
            });
          }
        };
      }
      function Ha(e) {
        return xt(JSON.stringify(e));
      }
      function Kt(e) {
        var n = An(e);
        return n.references = n.references || {}, n.references;
      }
      function mi(e) {
        var n = e.data, t = e.metaData, o = e.sender, a = e.receiver, u = e.passByReference, c = u !== void 0 && u, l = e.basic, f = l !== void 0 && l, v = Wn(a.win), g = f ? JSON.stringify(n) : ci(v, a.domain, n, {
          on: Dr,
          send: mr
        }), w = c ? function(p) {
          var m = Xe();
          return Kt(window)[m] = p, {
            type: "uid",
            uid: m
          };
        }(g) : {
          type: "raw",
          val: g
        };
        return {
          serializedData: Ha({
            sender: {
              domain: o.domain
            },
            metaData: t,
            reference: w
          }),
          cleanReference: function() {
            p = window, (m = w).type === "uid" && delete Kt(p)[m.uid];
            var p, m;
          }
        };
      }
      function gi(e) {
        var n = e.sender, t = e.basic, o = t !== void 0 && t, a = function(g) {
          return JSON.parse(function(w) {
            if (typeof atob == "function") return decodeURIComponent([].map.call(atob(w), function(p) {
              return "%" + ("00" + p.charCodeAt(0).toString(16)).slice(-2);
            }).join(""));
            if (typeof Buffer < "u") return Buffer.from(w, "base64").toString("utf8");
            throw new Error("Can not find window.atob or Buffer");
          }(g));
        }(e.data), u = a.reference, c = a.metaData, l;
        l = typeof n.win == "function" ? n.win({
          metaData: c
        }) : n.win;
        var f;
        f = typeof n.domain == "function" ? n.domain({
          metaData: c
        }) : typeof n.domain == "string" ? n.domain : a.sender.domain;
        var v = function(g, w) {
          if (w.type === "raw") return w.val;
          if (w.type === "uid") return Kt(g)[w.uid];
          throw new Error("Unsupported ref type: " + w.type);
        }(l, u);
        return {
          data: o ? JSON.parse(v) : function(g, w, p) {
            return di(g, w, p, {
              on: Dr,
              send: mr
            });
          }(l, f, v),
          metaData: c,
          sender: {
            win: l,
            domain: f
          },
          reference: u
        };
      }
      var ve = {
        STRING: "string",
        OBJECT: "object",
        FUNCTION: "function",
        BOOLEAN: "boolean",
        NUMBER: "number",
        ARRAY: "array"
      }, ct = {
        JSON: "json",
        DOTIFY: "dotify",
        BASE64: "base64"
      }, De = _r, Pe = {
        RENDER: "zoid-render",
        RENDERED: "zoid-rendered",
        PRERENDER: "zoid-prerender",
        PRERENDERED: "zoid-prerendered",
        DISPLAY: "zoid-display",
        ERROR: "zoid-error",
        CLOSE: "zoid-close",
        DESTROY: "zoid-destroy",
        PROPS: "zoid-props",
        RESIZE: "zoid-resize",
        FOCUS: "zoid-focus"
      };
      function yi(e) {
        return "__zoid__" + e.name + "__" + e.serializedPayload + "__";
      }
      function Yt(e) {
        if (!e) throw new Error("No window name");
        var n = e.split("__"), t = n[1], o = n[2], a = n[3];
        if (t !== "zoid") throw new Error("Window not rendered by zoid - got " + t);
        if (!o) throw new Error("Expected component name");
        if (!a) throw new Error("Expected serialized payload ref");
        return {
          name: o,
          serializedInitialPayload: a
        };
      }
      var Va = zr(function(e) {
        var n = gi({
          data: Yt(e).serializedInitialPayload,
          sender: {
            win: function(t) {
              return function(o) {
                if (o.type === "opener") return nt("opener", ie(window));
                if (o.type === "parent" && typeof o.distance == "number") return nt("parent", function(w, p) {
                  return p === void 0 && (p = 1), function(m, y) {
                    y === void 0 && (y = 1);
                    for (var P = m, O = 0; O < y; O++) {
                      if (!P) return;
                      P = ne(P);
                    }
                    return P;
                  }(w, Pt(w) - p);
                }(window, o.distance));
                if (o.type === "global" && o.uid && typeof o.uid == "string") {
                  var a = o.uid, u = Rn(window);
                  if (!u) throw new Error("Can not find ancestor window");
                  for (var c = 0, l = Mr(u); c < l.length; c++) {
                    var f = l[c];
                    if (H(f)) {
                      var v = wi(f, function(w) {
                        return w.windows && w.windows[a];
                      });
                      if (v) return v;
                    }
                  }
                } else if (o.type === "name") {
                  var g = o.name;
                  return nt("namedWindow", function(w, p) {
                    return Jn(w, p) || function m(y, P) {
                      var O = Jn(y, P);
                      if (O) return O;
                      for (var C = 0, M = Pn(y); C < M.length; C++) {
                        var V = m(M[C], P);
                        if (V) return V;
                      }
                    }(Tr(w) || w, p);
                  }(nt("ancestor", Rn(window)), g));
                }
                throw new Error("Unable to find " + o.type + " parent component window");
              }(t.metaData.windowRef);
            }
          }
        });
        return {
          parent: n.sender,
          payload: n.data,
          reference: n.reference
        };
      });
      function Ei() {
        return Va(window.name);
      }
      function Ga(e, n) {
        if (n === void 0 && (n = window), e === ne(n)) return {
          type: "parent",
          distance: Pt(e)
        };
        if (e === ie(n)) return {
          type: "opener"
        };
        if (H(e) && (o = e, o !== Tr(o))) {
          var t = ye(e).name;
          if (t) return {
            type: "name",
            name: t
          };
        }
        var o;
      }
      function bi(e, n, t, o, a) {
        if (!e.hasOwnProperty(t)) return o;
        var u = e[t];
        return typeof u.childDecorate == "function" ? u.childDecorate({
          value: o,
          uid: a.uid,
          tag: a.tag,
          close: a.close,
          focus: a.focus,
          onError: a.onError,
          onProps: a.onProps,
          resize: a.resize,
          getParent: a.getParent,
          getParentDomain: a.getParentDomain,
          show: a.show,
          hide: a.hide,
          export: a.export,
          getSiblings: a.getSiblings
        }) : o;
      }
      function Ja() {
        return T.try(function() {
          window.focus();
        });
      }
      function Pi() {
        return T.try(function() {
          window.close();
        });
      }
      var Cr = function() {
        return be;
      }, kr = function(e) {
        return Xn(e.value);
      };
      function Zt(e, n, t) {
        for (var o = 0, a = Object.keys(S({}, e, n)); o < a.length; o++) {
          var u = a[o];
          t(u, n[u], e[u]);
        }
      }
      function Ti(e, n, t) {
        var o = {};
        return T.all(function(a, u, c) {
          var l = [];
          return Zt(a, u, function(f, v, g) {
            var w = function(p, m, y) {
              return T.resolve().then(function() {
                var P, O;
                if (y != null && m) {
                  var C = (P = {}, P.get = m.queryParam, P.post = m.bodyParam, P)[t], M = (O = {}, O.get = m.queryValue, O.post = m.bodyValue, O)[t];
                  if (C) return T.hash({
                    finalParam: T.try(function() {
                      return typeof C == "function" ? C({
                        value: y
                      }) : typeof C == "string" ? C : p;
                    }),
                    finalValue: T.try(function() {
                      return typeof M == "function" && Lr(y) ? M({
                        value: y
                      }) : y;
                    })
                  }).then(function(V) {
                    var N = V.finalParam, $ = V.finalValue, F;
                    if (typeof $ == "boolean") F = $.toString();
                    else if (typeof $ == "string") F = $.toString();
                    else if (typeof $ == "object" && $ !== null) {
                      if (m.serialization === ct.JSON) F = JSON.stringify($);
                      else if (m.serialization === ct.BASE64) F = xt(JSON.stringify($));
                      else if (m.serialization === ct.DOTIFY || !m.serialization) {
                        F = function te(K, q, se) {
                          q === void 0 && (q = ""), se === void 0 && (se = {}), q = q && q + ".";
                          for (var k in K) K.hasOwnProperty(k) && K[k] != null && typeof K[k] != "function" && (K[k] && Array.isArray(K[k]) && K[k].length && K[k].every(function(Ce) {
                            return typeof Ce != "object";
                          }) ? se["" + q + k + "[]"] = K[k].join(",") : K[k] && typeof K[k] == "object" ? se = te(K[k], "" + q + k, se) : se["" + q + k] = K[k].toString());
                          return se;
                        }($, p);
                        for (var X = 0, B = Object.keys(F); X < B.length; X++) {
                          var ue = B[X];
                          o[ue] = F[ue];
                        }
                        return;
                      }
                    } else typeof $ == "number" && (F = $.toString());
                    o[N] = F;
                  });
                }
              });
            }(f, v, g);
            l.push(w);
          }), l;
        }(n, e)).then(function() {
          return o;
        });
      }
      function Si(e) {
        var n = e.uid, t = e.options, o = e.overrides, a = o === void 0 ? {} : o, u = e.parentWin, c = u === void 0 ? window : u, l = t.propsDef, f = t.containerTemplate, v = t.prerenderTemplate, g = t.tag, w = t.name, p = t.attributes, m = t.dimensions, y = t.autoResize, P = t.url, O = t.domain, C = t.exports, M = new T(), V = [], N = rt(), $ = {}, F = {}, X = {
          visible: !0
        }, B = a.event ? a.event : (ue = {}, te = {}, K = {
          on: function(R, D) {
            var j = te[R] = te[R] || [];
            j.push(D);
            var z = !1;
            return {
              cancel: function() {
                z || (z = !0, j.splice(j.indexOf(D), 1));
              }
            };
          },
          once: function(R, D) {
            var j = K.on(R, function() {
              j.cancel(), D();
            });
            return j;
          },
          trigger: function(R) {
            for (var D = arguments.length, j = new Array(D > 1 ? D - 1 : 0), z = 1; z < D; z++) j[z - 1] = arguments[z];
            var re = te[R], Y = [];
            if (re)
              for (var me = function() {
                var $e = re[ge];
                Y.push(T.try(function() {
                  return $e.apply(void 0, j);
                }));
              }, ge = 0; ge < re.length; ge++) me();
            return T.all(Y).then(be);
          },
          triggerOnce: function(R) {
            if (ue[R]) return T.resolve();
            ue[R] = !0;
            for (var D = arguments.length, j = new Array(D > 1 ? D - 1 : 0), z = 1; z < D; z++) j[z - 1] = arguments[z];
            return K.trigger.apply(K, [R].concat(j));
          },
          reset: function() {
            te = {};
          }
        }), ue, te, K, q = a.props ? a.props : {}, se, k, Ce, Or, lr, Ur = !1, Br = a.onError, Nr = a.getProxyContainer, $r = a.show, qr = a.hide, en = a.close, Hr = a.renderContainer, gr = a.getProxyWindow, rn = a.setProxyWin, Vr = a.openFrame, Gr = a.openPrerenderFrame, nn = a.prerender, tn = a.open, oe = a.openPrerender, hr = a.watchForUnload, ae = a.getInternalState, Ue = a.setInternalState, Ne = function() {
          return typeof m == "function" ? m({
            props: q
          }) : m;
        }, Be = function() {
          return T.try(function() {
            return a.resolveInitPromise ? a.resolveInitPromise() : M.resolve();
          });
        }, Re = function(R) {
          return T.try(function() {
            return a.rejectInitPromise ? a.rejectInitPromise(R) : M.reject(R);
          });
        }, ke = function(R) {
          for (var D = {}, j = 0, z = Object.keys(q); j < z.length; j++) {
            var re = z[j], Y = l[re];
            if (!Y || Y.sendToChild !== !1) {
              var me = Y && Y.trustedDomains && Y.trustedDomains.length > 0 ? Y.trustedDomains.reduce(function(ge, $e) {
                return ge || ur($e, R);
              }, !1) : ur(R, J(window));
              Y && Y.sameDomain && !me || Y && Y.trustedDomains && !me || (D[re] = q[re]);
            }
          }
          return T.hash(D);
        }, Fe = function() {
          return T.try(function() {
            return ae ? ae() : X;
          });
        }, ze = function(R) {
          return T.try(function() {
            return Ue ? Ue(R) : X = S({}, X, R);
          });
        }, pr = function() {
          return gr ? gr() : T.try(function() {
            var R = q.window;
            if (R) {
              var D = Wn(R);
              return N.register(function() {
                return R.close();
              }), D;
            }
            return new fr({
              send: mr
            });
          });
        }, rr = function(R) {
          return rn ? rn(R) : T.try(function() {
            se = R;
          });
        }, yr = function() {
          return $r ? $r() : T.hash({
            setState: ze({
              visible: !0
            }),
            showElement: k ? k.get().then(Ma) : null
          }).then(be);
        }, Ir = function() {
          return qr ? qr() : T.hash({
            setState: ze({
              visible: !1
            }),
            showElement: k ? k.get().then(Uo) : null
          }).then(be);
        }, fn = function() {
          return typeof P == "function" ? P({
            props: q
          }) : P;
        }, ln = function() {
          return typeof p == "function" ? p({
            props: q
          }) : p;
        }, on = function() {
          return xr(fn());
        }, nr = function(R, D) {
          var j = D.windowName;
          return Vr ? Vr(R, {
            windowName: j
          }) : T.try(function() {
            if (R === De.IFRAME) return ut(Lo({
              attributes: S({
                name: j,
                title: w
              }, ln().iframe)
            }));
          });
        }, _n = function(R) {
          return Gr ? Gr(R) : T.try(function() {
            if (R === De.IFRAME) return ut(Lo({
              attributes: S({
                name: "__zoid_prerender_frame__" + w + "_" + Xe() + "__",
                title: "prerender__" + w
              }, ln().iframe)
            }));
          });
        }, Mn = function(R, D, j) {
          return oe ? oe(R, D, j) : T.try(function() {
            if (R === De.IFRAME) {
              if (!j) throw new Error("Expected proxy frame to be passed");
              return j.get().then(function(z) {
                return N.register(function() {
                  return Nn(z);
                }), Mt(z).then(function(re) {
                  return ye(re);
                }).then(function(re) {
                  return Wn(re);
                });
              });
            }
            if (R === De.POPUP) return D;
            throw new Error("No render context available for " + R);
          });
        }, hn = function() {
          return T.try(function() {
            if (se) return T.all([B.trigger(Pe.FOCUS), se.focus()]).then(be);
          });
        }, dt = function() {
          var R = An(window);
          return R.windows = R.windows || {}, R.windows[n] = window, N.register(function() {
            delete R.windows[n];
          }), n;
        }, Fn = function(R, D, j, z) {
          if (D === J(window)) return {
            type: "global",
            uid: dt()
          };
          if (R !== window) throw new Error("Can not construct cross-domain window reference for different target window");
          if (q.window) {
            var re = z.getWindow();
            if (!re) throw new Error("Can not construct cross-domain window reference for lazy window prop");
            if (Rn(re) !== window) throw new Error("Can not construct cross-domain window reference for window prop with different ancestor");
          }
          if (j === De.POPUP) return {
            type: "opener"
          };
          if (j === De.IFRAME) return {
            type: "parent",
            distance: Pt(window)
          };
          throw new Error("Can not construct window reference for child");
        }, ft = function(R, D) {
          return T.try(function() {
            var j;
            Or = R, Ce = D, (j = se) == null || j.isPopup().then(function(z) {
              if ((D == null ? void 0 : D.name) !== "" && z) {
                var re;
                (re = se) == null || re.setName(D == null ? void 0 : D.name);
              }
            }).finally(function() {
              Be(), N.register(function() {
                return D.close.fireAndForget().catch(be);
              });
            });
          });
        }, zn = function(R) {
          var D = R.width, j = R.height;
          return T.try(function() {
            B.trigger(Pe.RESIZE, {
              width: D,
              height: j
            });
          });
        }, Ln = function(R) {
          return T.try(function() {
            return B.trigger(Pe.DESTROY);
          }).catch(be).then(function() {
            return N.all(R);
          }).then(function() {
            var D = R || new Error("Component destroyed");
            lr && dn(lr) || D.message === "Window navigated away" ? M.resolve() : M.asyncReject(D);
          });
        }, Wr = zr(function(R) {
          return T.try(function() {
            return en ? xe(en.__source__) ? void 0 : en() : T.try(function() {
              return B.trigger(Pe.CLOSE);
            }).then(function() {
              return Ln(R || new Error("Component closed"));
            });
          });
        }), xi = function(R, D) {
          var j = D.proxyWin, z = D.proxyFrame, re = D.windowName;
          return tn ? tn(R, {
            proxyWin: j,
            proxyFrame: z,
            windowName: re
          }) : T.try(function() {
            if (R === De.IFRAME) {
              if (!z) throw new Error("Expected proxy frame to be passed");
              return z.get().then(function(Ie) {
                return Mt(Ie).then(function(le) {
                  return N.register(function() {
                    return Nn(Ie);
                  }), N.register(function() {
                    return vi(le);
                  }), le;
                });
              });
            }
            if (R === De.POPUP) {
              var Y = Ne(), me = Y.width, ge = me === void 0 ? "300px" : me, $e = Y.height, Te = $e === void 0 ? "150px" : $e;
              ge = Vo(ge, window.outerWidth), Te = Vo(Te, window.outerWidth);
              var Le = function(Ie, le) {
                var We = (le = le || {}).closeOnUnload, Se = We === void 0 ? 1 : We, tr = le.name, qe = tr === void 0 ? "" : tr, ce = le.width, He = le.height, er = 0, Ke = 0;
                ce && (window.outerWidth ? Ke = Math.round((window.outerWidth - ce) / 2) + window.screenX : window.screen.width && (Ke = Math.round((window.screen.width - ce) / 2))), He && (window.outerHeight ? er = Math.round((window.outerHeight - He) / 2) + window.screenY : window.screen.height && (er = Math.round((window.screen.height - He) / 2))), delete le.closeOnUnload, delete le.name, ce && He && (le = S({
                  top: er,
                  left: Ke,
                  width: ce,
                  height: He,
                  status: 1,
                  toolbar: 0,
                  menubar: 0,
                  resizable: 1,
                  scrollbars: 1
                }, le));
                var an = Object.keys(le).map(function(Rr) {
                  if (le[Rr] != null) return Rr + "=" + kn(le[Rr]);
                }).filter(Boolean).join(","), vr;
                try {
                  vr = window.open("", qe, an);
                } catch (Rr) {
                  throw new _t("Can not open popup window - " + (Rr.stack || Rr.message));
                }
                if (xe(vr))
                  throw new _t("Can not open popup window - blocked");
                return Se && window.addEventListener("unload", function() {
                  return vr.close();
                }), vr;
              }(0, S({
                name: re,
                width: ge,
                height: Te
              }, ln().popup));
              return N.register(function() {
                return So(Le);
              }), N.register(function() {
                return vi(Le);
              }), Le;
            }
            throw new Error("No render context available for " + R);
          }).then(function(Y) {
            return j.setWindow(Y, {
              send: mr
            }), j.setName(re).then(function() {
              return j;
            });
          });
        }, Di = function() {
          return T.try(function() {
            var R = jo(window, "unload", Xn(function() {
              Ln(new Error("Window navigated away"));
            })), D = Po(c, Ln, 3e3);
            if (N.register(D.cancel), N.register(R.cancel), hr) return hr();
          });
        }, Ci = function(R) {
          var D = !1;
          return R.isClosed().then(function(j) {
            return j ? (D = !0, Wr(new Error("Detected component window close"))) : T.delay(200).then(function() {
              return R.isClosed();
            }).then(function(z) {
              if (z)
                return D = !0, Wr(new Error("Detected component window close"));
            });
          }).then(function() {
            return D;
          });
        }, jn = function(R) {
          return Br ? Br(R) : T.try(function() {
            if (V.indexOf(R) === -1)
              return V.push(R), M.asyncReject(R), B.trigger(Pe.ERROR, R);
          });
        }, Ni = new T(), Ii = function(R) {
          return T.try(function() {
            Ni.resolve(R);
          });
        };
        ft.onError = jn;
        var Wi = function(R, D) {
          return R({
            uid: n,
            container: D.container,
            context: D.context,
            doc: D.doc,
            frame: D.frame,
            prerenderFrame: D.prerenderFrame,
            focus: hn,
            close: Wr,
            state: $,
            props: q,
            tag: g,
            dimensions: Ne(),
            event: B
          });
        }, Ai = function(R, D) {
          var j = D.context;
          return nn ? nn(R, {
            context: j
          }) : T.try(function() {
            if (v) {
              B.trigger(Pe.PRERENDER);
              var z = R.getWindow();
              if (z && H(z) && function(We) {
                try {
                  if (!We.location.href || We.location.href === "about:blank") return !0;
                } catch {
                }
                return !1;
              }(z)) {
                var re = (z = ye(z)).document, Y = Wi(v, {
                  context: j,
                  doc: re
                });
                if (Y) {
                  if (Y.ownerDocument !== re) throw new Error("Expected prerender template to have been created with document from child window");
                  (function(We, Se) {
                    var tr = Se.tagName.toLowerCase();
                    if (tr !== "html") throw new Error("Expected element to be html, got " + tr);
                    for (var qe = We.document.documentElement, ce = 0, He = Nt(qe.children); ce < He.length; ce++) qe.removeChild(He[ce]);
                    for (var er = 0, Ke = Nt(Se.children); er < Ke.length; er++) qe.appendChild(Ke[er]);
                  })(z, Y);
                  var me = y.width, ge = me !== void 0 && me, $e = y.height, Te = $e !== void 0 && $e, Le = y.element, Ie = Le === void 0 ? "body" : Le;
                  if ((Ie = At(Ie, re)) && (ge || Te)) {
                    var le = Bo(Ie, function(We) {
                      zn({
                        width: ge ? We.width : void 0,
                        height: Te ? We.height : void 0
                      });
                    }, {
                      width: ge,
                      height: Te,
                      win: z
                    });
                    B.on(Pe.RENDERED, le.cancel);
                  }
                  B.trigger(Pe.PRERENDERED);
                }
              }
            }
          });
        }, _i = function(R, D) {
          var j = D.proxyFrame, z = D.proxyPrerenderFrame, re = D.context, Y = D.rerender;
          return Hr ? Hr(R, {
            proxyFrame: j,
            proxyPrerenderFrame: z,
            context: re,
            rerender: Y
          }) : T.hash({
            container: R.get(),
            frame: j ? j.get() : null,
            prerenderFrame: z ? z.get() : null,
            internalState: Fe()
          }).then(function(me) {
            var ge = me.container, $e = me.internalState.visible, Te = Wi(f, {
              context: re,
              container: ge,
              frame: me.frame,
              prerenderFrame: me.prerenderFrame,
              doc: document
            });
            if (Te) {
              $e || Uo(Te), _a(ge, Te);
              var Le = function(Ie, le) {
                le = Xn(le);
                var We = !1, Se = [], tr, qe, ce, He = function() {
                  We = !0;
                  for (var vr = 0; vr < Se.length; vr++) Se[vr].disconnect();
                  tr && tr.cancel(), ce && ce.removeEventListener("unload", er), qe && Nn(qe);
                }, er = function() {
                  We || (le(), He());
                };
                if (dn(Ie))
                  return er(), {
                    cancel: He
                  };
                if (window.MutationObserver)
                  for (var Ke = Ie.parentElement; Ke; ) {
                    var an = new window.MutationObserver(function() {
                      dn(Ie) && er();
                    });
                    an.observe(Ke, {
                      childList: !0
                    }), Se.push(an), Ke = Ke.parentElement;
                  }
                return (qe = document.createElement("iframe")).setAttribute("name", "__detect_close_" + Xe() + "__"), qe.style.display = "none", Mt(qe).then(function(vr) {
                  (ce = ye(vr)).addEventListener("unload", er);
                }), Ie.appendChild(qe), tr = Dn(function() {
                  dn(Ie) && er();
                }, 1e3), {
                  cancel: He
                };
              }(Te, function() {
                var Ie = new Error("Detected container element removed from DOM");
                return T.delay(1).then(function() {
                  if (!dn(Te))
                    return N.all(Ie), Y().then(Be, Re);
                  Wr(Ie);
                });
              });
              return N.register(function() {
                return Le.cancel();
              }), N.register(function() {
                return Nn(Te);
              }), k = ut(Te);
            }
          });
        }, Mi = function() {
          return {
            state: $,
            event: B,
            close: Wr,
            focus: hn,
            resize: zn,
            onError: jn,
            updateProps: os,
            show: yr,
            hide: Ir
          };
        }, kt = function(R) {
          R === void 0 && (R = {});
          var D = lr, j = Mi();
          cn(F, R), function(z, re, Y, me, ge) {
            var $e = me.state, Te = me.close, Le = me.focus, Ie = me.event, le = me.onError;
            Zt(Y, z, function(We, Se, tr) {
              var qe = !1, ce = tr;
              Object.defineProperty(re, We, {
                configurable: !0,
                enumerable: !0,
                get: function() {
                  return qe ? ce : (qe = !0, function() {
                    if (!Se) return ce;
                    var He = Se.alias;
                    if (He && !Lr(tr) && Lr(Y[He]) && (ce = Y[He]), Se.value && (ce = Se.value({
                      props: re,
                      state: $e,
                      close: Te,
                      focus: Le,
                      event: Ie,
                      onError: le,
                      container: ge
                    })), !Se.default || Lr(ce) || Lr(Y[We]) || (ce = Se.default({
                      props: re,
                      state: $e,
                      close: Te,
                      focus: Le,
                      event: Ie,
                      onError: le,
                      container: ge
                    })), Lr(ce)) {
                      if (Se.type === ve.ARRAY ? !Array.isArray(ce) : typeof ce !== Se.type) throw new TypeError("Prop is not of type " + Se.type + ": " + We);
                    } else if (Se.required !== !1 && !Lr(Y[We])) throw new Error('Expected prop "' + We + '" to be defined');
                    return Lr(ce) && Se.decorate && (ce = Se.decorate({
                      value: ce,
                      props: re,
                      state: $e,
                      close: Te,
                      focus: Le,
                      event: Ie,
                      onError: le,
                      container: ge
                    })), ce;
                  }());
                }
              });
            }), Zt(re, z, be);
          }(l, q, F, j, D);
        }, os = function(R) {
          return kt(R), M.then(function() {
            var D = Ce, j = se;
            if (D && j && Or) return ke(Or).then(function(z) {
              return D.updateProps(z).catch(function(re) {
                return Ci(j).then(function(Y) {
                  if (!Y) throw re;
                });
              });
            });
          });
        }, Fi = function(R) {
          return Nr ? Nr(R) : T.try(function() {
            return Fo(R);
          }).then(function(D) {
            return Ft(D) && (D = function j(z) {
              var re = function($e) {
                var Te = function(Le) {
                  for (; Le.parentNode; ) Le = Le.parentNode;
                  if (Ft(Le)) return Le;
                }($e);
                if (Te && Te.host) return Te.host;
              }(z);
              if (!re) throw new Error("Element is not in shadow dom");
              var Y = "shadow-slot-" + Xe(), me = document.createElement("slot");
              me.setAttribute("name", Y), z.appendChild(me);
              var ge = document.createElement("div");
              return ge.setAttribute("slot", Y), re.appendChild(ge), Ft(re) ? j(ge) : ge;
            }(D)), lr = D, ut(D);
          });
        };
        return {
          init: function() {
            (function() {
              B.on(Pe.RENDER, function() {
                return q.onRender();
              }), B.on(Pe.PRERENDER, function() {
                return q.onPrerender();
              }), B.on(Pe.DISPLAY, function() {
                return q.onDisplay();
              }), B.on(Pe.RENDERED, function() {
                return q.onRendered();
              }), B.on(Pe.PRERENDERED, function() {
                return q.onPrerendered();
              }), B.on(Pe.CLOSE, function() {
                return q.onClose();
              }), B.on(Pe.DESTROY, function() {
                return q.onDestroy();
              }), B.on(Pe.RESIZE, function() {
                return q.onResize();
              }), B.on(Pe.FOCUS, function() {
                return q.onFocus();
              }), B.on(Pe.PROPS, function(R) {
                return q.onProps(R);
              }), B.on(Pe.ERROR, function(R) {
                return q && q.onError ? q.onError(R) : Re(R).then(function() {
                  setTimeout(function() {
                    throw R;
                  }, 1);
                });
              }), N.register(B.reset);
            })();
          },
          render: function(R) {
            var D = R.target, j = R.container, z = R.context, re = R.rerender;
            return T.try(function() {
              var Y = on(), me = O || on();
              (function(G, Ve, Ae) {
                if (G !== window) {
                  if (!Kn(window, G)) throw new Error("Can only renderTo an adjacent frame");
                  var Ge = J();
                  if (!ur(Ve, Ge) && !H(G)) throw new Error("Can not render remotely to " + Ve.toString() + " - can only render to " + Ge);
                  if (Ae && typeof Ae != "string") throw new Error("Container passed to renderTo must be a string selector, got " + typeof Ae + " }");
                }
              })(D, me, j);
              var ge = T.try(function() {
                if (D !== window) return function(G, Ve) {
                  for (var Ae = {}, Ge = 0, ir = Object.keys(q); Ge < ir.length; Ge++) {
                    var _e = ir[Ge], wr = l[_e];
                    wr && wr.allowDelegate && (Ae[_e] = q[_e]);
                  }
                  var Ye = mr(Ve, "zoid_delegate_" + w, {
                    uid: n,
                    overrides: {
                      props: Ae,
                      event: B,
                      close: Wr,
                      onError: jn,
                      getInternalState: Fe,
                      setInternalState: ze,
                      resolveInitPromise: Be,
                      rejectInitPromise: Re
                    }
                  }).then(function(Z) {
                    var Q = Z.data.parent;
                    return N.register(function(I) {
                      if (!xe(Ve)) return Q.destroy(I);
                    }), Q.getDelegateOverrides();
                  }).catch(function(Z) {
                    throw new Error(`Unable to delegate rendering. Possibly the component is not loaded in the target window.

` + un(Z));
                  });
                  return Nr = function() {
                    for (var Z = arguments.length, Q = new Array(Z), I = 0; I < Z; I++) Q[I] = arguments[I];
                    return Ye.then(function(ee) {
                      return ee.getProxyContainer.apply(ee, Q);
                    });
                  }, Hr = function() {
                    for (var Z = arguments.length, Q = new Array(Z), I = 0; I < Z; I++) Q[I] = arguments[I];
                    return Ye.then(function(ee) {
                      return ee.renderContainer.apply(ee, Q);
                    });
                  }, $r = function() {
                    for (var Z = arguments.length, Q = new Array(Z), I = 0; I < Z; I++) Q[I] = arguments[I];
                    return Ye.then(function(ee) {
                      return ee.show.apply(ee, Q);
                    });
                  }, qr = function() {
                    for (var Z = arguments.length, Q = new Array(Z), I = 0; I < Z; I++) Q[I] = arguments[I];
                    return Ye.then(function(ee) {
                      return ee.hide.apply(ee, Q);
                    });
                  }, hr = function() {
                    for (var Z = arguments.length, Q = new Array(Z), I = 0; I < Z; I++) Q[I] = arguments[I];
                    return Ye.then(function(ee) {
                      return ee.watchForUnload.apply(ee, Q);
                    });
                  }, G === De.IFRAME ? (gr = function() {
                    for (var Z = arguments.length, Q = new Array(Z), I = 0; I < Z; I++) Q[I] = arguments[I];
                    return Ye.then(function(ee) {
                      return ee.getProxyWindow.apply(ee, Q);
                    });
                  }, Vr = function() {
                    for (var Z = arguments.length, Q = new Array(Z), I = 0; I < Z; I++) Q[I] = arguments[I];
                    return Ye.then(function(ee) {
                      return ee.openFrame.apply(ee, Q);
                    });
                  }, Gr = function() {
                    for (var Z = arguments.length, Q = new Array(Z), I = 0; I < Z; I++) Q[I] = arguments[I];
                    return Ye.then(function(ee) {
                      return ee.openPrerenderFrame.apply(ee, Q);
                    });
                  }, nn = function() {
                    for (var Z = arguments.length, Q = new Array(Z), I = 0; I < Z; I++) Q[I] = arguments[I];
                    return Ye.then(function(ee) {
                      return ee.prerender.apply(ee, Q);
                    });
                  }, tn = function() {
                    for (var Z = arguments.length, Q = new Array(Z), I = 0; I < Z; I++) Q[I] = arguments[I];
                    return Ye.then(function(ee) {
                      return ee.open.apply(ee, Q);
                    });
                  }, oe = function() {
                    for (var Z = arguments.length, Q = new Array(Z), I = 0; I < Z; I++) Q[I] = arguments[I];
                    return Ye.then(function(ee) {
                      return ee.openPrerender.apply(ee, Q);
                    });
                  }) : G === De.POPUP && (rn = function() {
                    for (var Z = arguments.length, Q = new Array(Z), I = 0; I < Z; I++) Q[I] = arguments[I];
                    return Ye.then(function(ee) {
                      return ee.setProxyWin.apply(ee, Q);
                    });
                  }), Ye;
                }(z, D);
              }), $e = q.window, Te = Di(), Le = Ti(l, q, "post"), Ie = B.trigger(Pe.RENDER), le = Fi(j), We = pr(), Se = le.then(function() {
                return kt();
              }), tr = Se.then(function() {
                return Ti(l, q, "get").then(function(G) {
                  return function(Ve, Ae) {
                    var Ge = Ae.query || {}, ir = Ae.hash || {}, _e, wr, Ye = Ve.split("#");
                    wr = Ye[1];
                    var Z = (_e = Ye[0]).split("?");
                    _e = Z[0];
                    var Q = Mo(Z[1], Ge), I = Mo(wr, ir);
                    return Q && (_e = _e + "?" + Q), I && (_e = _e + "#" + I), _e;
                  }(Tt(fn()), {
                    query: G
                  });
                });
              }), qe = We.then(function(G) {
                return function(Ae) {
                  var Ge = Ae === void 0 ? {} : Ae, ir = Ge.proxyWin, _e = Ge.initialChildDomain, wr = Ge.childDomainMatch, Ye = Ge.target, Z = Ye === void 0 ? window : Ye, Q = Ge.context;
                  return function(I) {
                    var ee = I === void 0 ? {} : I, eo = ee.proxyWin, fs = ee.childDomainMatch, ls = ee.context;
                    return ke(ee.initialChildDomain).then(function(hs) {
                      return {
                        uid: n,
                        context: ls,
                        tag: g,
                        childDomainMatch: fs,
                        version: "10_3_3",
                        props: hs,
                        exports: (ji = eo, {
                          init: function(ps) {
                            return ft(this.origin, ps);
                          },
                          close: Wr,
                          checkClose: function() {
                            return Ci(ji);
                          },
                          resize: zn,
                          onError: jn,
                          show: yr,
                          hide: Ir,
                          export: Ii
                        })
                      };
                      var ji;
                    });
                  }({
                    proxyWin: ir,
                    initialChildDomain: _e,
                    childDomainMatch: wr,
                    context: Q
                  }).then(function(I) {
                    var ee = mi({
                      data: I,
                      metaData: {
                        windowRef: Fn(Z, _e, Q, ir)
                      },
                      sender: {
                        domain: J(window)
                      },
                      receiver: {
                        win: ir,
                        domain: wr
                      },
                      passByReference: _e === J()
                    }), eo = ee.serializedData;
                    return N.register(ee.cleanReference), eo;
                  });
                }({
                  proxyWin: (Ve = {
                    proxyWin: G,
                    initialChildDomain: Y,
                    childDomainMatch: me,
                    target: D,
                    context: z
                  }).proxyWin,
                  initialChildDomain: Ve.initialChildDomain,
                  childDomainMatch: Ve.childDomainMatch,
                  target: Ve.target,
                  context: Ve.context
                }).then(function(Ae) {
                  return yi({
                    name: w,
                    serializedPayload: Ae
                  });
                });
                var Ve;
              }), ce = qe.then(function(G) {
                return nr(z, {
                  windowName: G
                });
              }), He = _n(z), er = T.hash({
                proxyContainer: le,
                proxyFrame: ce,
                proxyPrerenderFrame: He
              }).then(function(G) {
                return _i(G.proxyContainer, {
                  context: z,
                  proxyFrame: G.proxyFrame,
                  proxyPrerenderFrame: G.proxyPrerenderFrame,
                  rerender: re
                });
              }).then(function(G) {
                return G;
              }), Ke = T.hash({
                windowName: qe,
                proxyFrame: ce,
                proxyWin: We
              }).then(function(G) {
                var Ve = G.proxyWin;
                return $e ? Ve : xi(z, {
                  windowName: G.windowName,
                  proxyWin: Ve,
                  proxyFrame: G.proxyFrame
                });
              }), an = T.hash({
                proxyWin: Ke,
                proxyPrerenderFrame: He
              }).then(function(G) {
                return Mn(z, G.proxyWin, G.proxyPrerenderFrame);
              }), vr = Ke.then(function(G) {
                return se = G, rr(G);
              }), Rr = T.hash({
                proxyPrerenderWin: an,
                state: vr
              }).then(function(G) {
                return Ai(G.proxyPrerenderWin, {
                  context: z
                });
              }), zi = T.hash({
                proxyWin: Ke,
                windowName: qe
              }).then(function(G) {
                if ($e) return G.proxyWin.setName(G.windowName);
              }), is = T.hash({
                body: Le
              }).then(function(G) {
                return t.method ? t.method : Object.keys(G.body).length ? "post" : "get";
              }), Li = T.hash({
                proxyWin: Ke,
                windowUrl: tr,
                body: Le,
                method: is,
                windowName: zi,
                prerender: Rr
              }).then(function(G) {
                return G.proxyWin.setLocation(G.windowUrl, {
                  method: G.method,
                  body: G.body
                });
              }), as = Ke.then(function(G) {
                (function Ve(Ae, Ge) {
                  var ir = !1;
                  return N.register(function() {
                    ir = !0;
                  }), T.delay(2e3).then(function() {
                    return Ae.isClosed();
                  }).then(function(_e) {
                    if (!ir) {
                      if (Ge === De.POPUP && _e) return Wr(new Error("Detected popup close"));
                      var wr = !!(lr && dn(lr));
                      return Ge === De.IFRAME && _e && (wr || Ur) ? Wr(new Error("Detected iframe close")) : Ve(Ae, Ge);
                    }
                  });
                })(G, z);
              }), ss = T.hash({
                container: er,
                prerender: Rr
              }).then(function() {
                return B.trigger(Pe.DISPLAY);
              }), us = Ke.then(function(G) {
                return function(Ve, Ae, Ge) {
                  return T.try(function() {
                    return Ve.awaitWindow();
                  }).then(function(ir) {
                    if (jr && jr.needsBridge({
                      win: ir,
                      domain: Ae
                    }) && !jr.hasBridge(Ae, Ae)) {
                      var _e = typeof t.bridgeUrl == "function" ? t.bridgeUrl({
                        props: q
                      }) : t.bridgeUrl;
                      if (!_e) throw new Error("Bridge needed to render " + Ge);
                      var wr = xr(_e);
                      return jr.linkUrl(ir, Ae), jr.openBridge(Tt(_e), wr);
                    }
                  });
                }(G, Y, z);
              }), cs = Li.then(function() {
                return T.try(function() {
                  var G = q.timeout;
                  if (G) return M.timeout(G, new Error("Loading component timed out after " + G + " milliseconds"));
                });
              }), ds = M.then(function() {
                return Ur = !0, B.trigger(Pe.RENDERED);
              });
              return T.hash({
                initPromise: M,
                buildUrlPromise: tr,
                onRenderPromise: Ie,
                getProxyContainerPromise: le,
                openFramePromise: ce,
                openPrerenderFramePromise: He,
                renderContainerPromise: er,
                openPromise: Ke,
                openPrerenderPromise: an,
                setStatePromise: vr,
                prerenderPromise: Rr,
                loadUrlPromise: Li,
                buildWindowNamePromise: qe,
                setWindowNamePromise: zi,
                watchForClosePromise: as,
                onDisplayPromise: ss,
                openBridgePromise: us,
                runTimeoutPromise: cs,
                onRenderedPromise: ds,
                delegatePromise: ge,
                watchForUnloadPromise: Te,
                finalSetPropsPromise: Se
              });
            }).catch(function(Y) {
              return T.all([jn(Y), Ln(Y)]).then(function() {
                throw Y;
              }, function() {
                throw Y;
              });
            }).then(be);
          },
          destroy: Ln,
          getProps: function() {
            return q;
          },
          setProps: kt,
          export: Ii,
          getHelpers: Mi,
          getDelegateOverrides: function() {
            return T.try(function() {
              return {
                getProxyContainer: Fi,
                show: yr,
                hide: Ir,
                renderContainer: _i,
                getProxyWindow: pr,
                watchForUnload: Di,
                openFrame: nr,
                openPrerenderFrame: _n,
                prerender: Ai,
                open: xi,
                openPrerender: Mn,
                setProxyWin: rr
              };
            });
          },
          getExports: function() {
            return C({
              getExports: function() {
                return Ni;
              }
            });
          }
        };
      }
      var Ka = {
        register: function(e, n, t, o) {
          var a = o.React, u = o.ReactDOM;
          return function(c) {
            x(l, c);
            function l() {
              return c.apply(this, arguments) || this;
            }
            var f = l.prototype;
            return f.render = function() {
              return a.createElement("div", null);
            }, f.componentDidMount = function() {
              var v = u.findDOMNode(this), g = t(cn({}, this.props));
              g.render(v, De.IFRAME), this.setState({
                parent: g
              });
            }, f.componentDidUpdate = function() {
              this.state && this.state.parent && this.state.parent.updateProps(cn({}, this.props)).catch(be);
            }, l;
          }(a.Component);
        }
      }, Ya = {
        register: function(e, n, t, o) {
          return o.component(e, {
            render: function(a) {
              return a("div");
            },
            inheritAttrs: !1,
            mounted: function() {
              var a = this.$el;
              this.parent = t(S({}, (u = this.$attrs, Object.keys(u).reduce(function(c, l) {
                var f = u[l];
                return l === "style-object" || l === "styleObject" ? (c.style = f, c.styleObject = f) : l.includes("-") ? c[Ct(l)] = f : c[l] = f, c;
              }, {}))));
              var u;
              this.parent.render(a, De.IFRAME);
            },
            watch: {
              $attrs: {
                handler: function() {
                  this.parent && this.$attrs && this.parent.updateProps(S({}, this.$attrs)).catch(be);
                },
                deep: !0
              }
            }
          });
        }
      }, Za = {
        register: function(e, n, t) {
          return {
            template: "<div></div>",
            inheritAttrs: !1,
            mounted: function() {
              var o = this.$el;
              this.parent = t(S({}, (a = this.$attrs, Object.keys(a).reduce(function(u, c) {
                var l = a[c];
                return c === "style-object" || c === "styleObject" ? (u.style = l, u.styleObject = l) : c.includes("-") ? u[Ct(c)] = l : u[c] = l, u;
              }, {}))));
              var a;
              this.parent.render(o, De.IFRAME);
            },
            watch: {
              $attrs: {
                handler: function() {
                  this.parent && this.$attrs && this.parent.updateProps(S({}, this.$attrs)).catch(be);
                },
                deep: !0
              }
            }
          };
        }
      }, Qa = {
        register: function(e, n, t, o) {
          return o.module(e, []).directive(Ct(e), function() {
            for (var a = {}, u = 0, c = Object.keys(n); u < c.length; u++) a[c[u]] = "=";
            return a.props = "=", {
              scope: a,
              restrict: "E",
              controller: ["$scope", "$element", function(l, f) {
                function v() {
                  if (l.$root.$$phase !== "$apply" && l.$root.$$phase !== "$digest") try {
                    l.$apply();
                  } catch {
                  }
                }
                var g = function() {
                  return et(l.props, function(p) {
                    return typeof p == "function" ? function() {
                      var m = p.apply(this, arguments);
                      return v(), m;
                    } : p;
                  });
                }, w = t(g());
                w.render(f[0], De.IFRAME), l.$watch(function() {
                  w.updateProps(g()).catch(be);
                });
              }]
            };
          });
        }
      }, Xa = {
        register: function(e, n, t, o) {
          var a = o.Component, u = o.NgModule, c = o.ElementRef, l = o.NgZone, f = o.Inject, v = function() {
            function w(m, y) {
              this.elementRef = void 0, this.internalProps = void 0, this.parent = void 0, this.props = void 0, this.zone = void 0, this._props = void 0, this._props = {}, this.elementRef = m, this.zone = y;
            }
            var p = w.prototype;
            return p.getProps = function() {
              var m = this;
              return et(S({}, this.internalProps, this.props), function(y) {
                if (typeof y == "function") {
                  var P = m.zone;
                  return function() {
                    var O = arguments, C = this;
                    return P.run(function() {
                      return y.apply(C, O);
                    });
                  };
                }
                return y;
              });
            }, p.ngOnInit = function() {
              var m = this.elementRef.nativeElement;
              this.parent = t(this.getProps()), this.parent.render(m, De.IFRAME);
            }, p.ngDoCheck = function() {
              this.parent && !function(m, y) {
                var P = {};
                for (var O in m) if (m.hasOwnProperty(O) && (P[O] = !0, m[O] !== y[O]))
                  return !1;
                for (var C in y) if (!P[C]) return !1;
                return !0;
              }(this._props, this.props) && (this._props = S({}, this.props), this.parent.updateProps(this.getProps()));
            }, w;
          }();
          v.annotations = void 0, v.parameters = void 0, v.parameters = [[new f(c)], [new f(l)]], v.annotations = [new a({
            selector: e,
            template: "<div></div>",
            inputs: ["props"]
          })];
          var g = function() {
          };
          return g.annotations = void 0, g.annotations = [new u({
            declarations: [v],
            exports: [v]
          })], g;
        }
      };
      function ka(e) {
        var n = e.uid, t = e.frame, o = e.prerenderFrame, a = e.doc, u = e.props, c = e.event, l = e.dimensions, f = l.width, v = l.height;
        if (t && o) {
          var g = a.createElement("div");
          g.setAttribute("id", n);
          var w = a.createElement("style");
          return u.cspNonce && w.setAttribute("nonce", u.cspNonce), w.appendChild(a.createTextNode(`
            #` + n + ` {
                display: inline-block;
                position: relative;
                width: ` + f + `;
                height: ` + v + `;
            }

            #` + n + ` > iframe {
                display: inline-block;
                position: absolute;
                width: 100%;
                height: 100%;
                top: 0;
                left: 0;
                transition: opacity .2s ease-in-out;
            }

            #` + n + ` > iframe.zoid-invisible {
                opacity: 0;
            }

            #` + n + ` > iframe.zoid-visible {
                opacity: 1;
        }
        `)), g.appendChild(t), g.appendChild(o), g.appendChild(w), o.classList.add("zoid-visible"), t.classList.add("zoid-invisible"), c.on(Pe.RENDERED, function() {
            o.classList.remove("zoid-visible"), o.classList.add("zoid-invisible"), t.classList.remove("zoid-invisible"), t.classList.add("zoid-visible"), setTimeout(function() {
              Nn(o);
            }, 1);
          }), c.on(Pe.RESIZE, function(p) {
            var m = p.width, y = p.height;
            typeof m == "number" && (g.style.width = Ho(m)), typeof y == "number" && (g.style.height = Ho(y));
          }), g;
        }
      }
      function es(e) {
        var n = e.doc, t = e.props, o = n.createElement("html"), a = n.createElement("body"), u = n.createElement("style"), c = n.createElement("div");
        return c.classList.add("spinner"), t.cspNonce && u.setAttribute("nonce", t.cspNonce), o.appendChild(a), a.appendChild(c), a.appendChild(u), u.appendChild(n.createTextNode(`
            html, body {
                width: 100%;
                height: 100%;
            }

            .spinner {
                position: fixed;
                max-height: 60vmin;
                max-width: 60vmin;
                height: 40px;
                width: 40px;
                top: 50%;
                left: 50%;
                box-sizing: border-box;
                border: 3px solid rgba(0, 0, 0, .2);
                border-top-color: rgba(33, 128, 192, 0.8);
                border-radius: 100%;
                animation: rotation .7s infinite linear;
            }

            @keyframes rotation {
                from {
                    transform: translateX(-50%) translateY(-50%) rotate(0deg);
                }
                to {
                    transform: translateX(-50%) translateY(-50%) rotate(359deg);
                }
            }
        `)), o;
      }
      var Qt = rt(), Xt = rt();
      function rs(e) {
        var n = function(y) {
          var P = y.tag, O = y.url, C = y.domain, M = y.bridgeUrl, V = y.props, N = V === void 0 ? {} : V, $ = y.dimensions, F = $ === void 0 ? {} : $, X = y.autoResize, B = X === void 0 ? {} : X, ue = y.allowedParentDomains, te = ue === void 0 ? "*" : ue, K = y.attributes, q = K === void 0 ? {} : K, se = y.defaultContext, k = se === void 0 ? De.IFRAME : se, Ce = y.containerTemplate, Or = Ce === void 0 ? ka : Ce, lr = y.prerenderTemplate, Ur = lr === void 0 ? es : lr, Br = y.validate, Nr = y.eligible, $r = Nr === void 0 ? function() {
            return {
              eligible: !0
            };
          } : Nr, qr = y.logger, en = qr === void 0 ? {
            info: be
          } : qr, Hr = y.exports, gr = Hr === void 0 ? be : Hr, rn = y.method, Vr = y.children, Gr = Vr === void 0 ? function() {
            return {};
          } : Vr, nn = P.replace(/-/g, "_"), tn = S({}, {
            window: {
              type: ve.OBJECT,
              sendToChild: !1,
              required: !1,
              allowDelegate: !0,
              validate: function(oe) {
                var hr = oe.value;
                if (!Qr(hr) && !fr.isProxyWindow(hr)) throw new Error("Expected Window or ProxyWindow");
                if (Qr(hr)) {
                  if (xe(hr)) throw new Error("Window is closed");
                  if (!H(hr)) throw new Error("Window is not same domain");
                }
              },
              decorate: function(oe) {
                return Wn(oe.value);
              }
            },
            timeout: {
              type: ve.NUMBER,
              required: !1,
              sendToChild: !1
            },
            cspNonce: {
              type: ve.STRING,
              required: !1
            },
            onDisplay: {
              type: ve.FUNCTION,
              required: !1,
              sendToChild: !1,
              allowDelegate: !0,
              default: Cr,
              decorate: kr
            },
            onRendered: {
              type: ve.FUNCTION,
              required: !1,
              sendToChild: !1,
              default: Cr,
              decorate: kr
            },
            onRender: {
              type: ve.FUNCTION,
              required: !1,
              sendToChild: !1,
              default: Cr,
              decorate: kr
            },
            onPrerendered: {
              type: ve.FUNCTION,
              required: !1,
              sendToChild: !1,
              default: Cr,
              decorate: kr
            },
            onPrerender: {
              type: ve.FUNCTION,
              required: !1,
              sendToChild: !1,
              default: Cr,
              decorate: kr
            },
            onClose: {
              type: ve.FUNCTION,
              required: !1,
              sendToChild: !1,
              allowDelegate: !0,
              default: Cr,
              decorate: kr
            },
            onDestroy: {
              type: ve.FUNCTION,
              required: !1,
              sendToChild: !1,
              allowDelegate: !0,
              default: Cr,
              decorate: kr
            },
            onResize: {
              type: ve.FUNCTION,
              required: !1,
              sendToChild: !1,
              allowDelegate: !0,
              default: Cr
            },
            onFocus: {
              type: ve.FUNCTION,
              required: !1,
              sendToChild: !1,
              allowDelegate: !0,
              default: Cr
            },
            close: {
              type: ve.FUNCTION,
              required: !1,
              sendToChild: !1,
              childDecorate: function(oe) {
                return oe.close;
              }
            },
            focus: {
              type: ve.FUNCTION,
              required: !1,
              sendToChild: !1,
              childDecorate: function(oe) {
                return oe.focus;
              }
            },
            resize: {
              type: ve.FUNCTION,
              required: !1,
              sendToChild: !1,
              childDecorate: function(oe) {
                return oe.resize;
              }
            },
            uid: {
              type: ve.STRING,
              required: !1,
              sendToChild: !1,
              childDecorate: function(oe) {
                return oe.uid;
              }
            },
            tag: {
              type: ve.STRING,
              required: !1,
              sendToChild: !1,
              childDecorate: function(oe) {
                return oe.tag;
              }
            },
            getParent: {
              type: ve.FUNCTION,
              required: !1,
              sendToChild: !1,
              childDecorate: function(oe) {
                return oe.getParent;
              }
            },
            getParentDomain: {
              type: ve.FUNCTION,
              required: !1,
              sendToChild: !1,
              childDecorate: function(oe) {
                return oe.getParentDomain;
              }
            },
            show: {
              type: ve.FUNCTION,
              required: !1,
              sendToChild: !1,
              childDecorate: function(oe) {
                return oe.show;
              }
            },
            hide: {
              type: ve.FUNCTION,
              required: !1,
              sendToChild: !1,
              childDecorate: function(oe) {
                return oe.hide;
              }
            },
            export: {
              type: ve.FUNCTION,
              required: !1,
              sendToChild: !1,
              childDecorate: function(oe) {
                return oe.export;
              }
            },
            onError: {
              type: ve.FUNCTION,
              required: !1,
              sendToChild: !1,
              childDecorate: function(oe) {
                return oe.onError;
              }
            },
            onProps: {
              type: ve.FUNCTION,
              required: !1,
              sendToChild: !1,
              childDecorate: function(oe) {
                return oe.onProps;
              }
            },
            getSiblings: {
              type: ve.FUNCTION,
              required: !1,
              sendToChild: !1,
              childDecorate: function(oe) {
                return oe.getSiblings;
              }
            }
          }, N);
          if (!Or) throw new Error("Container template required");
          return {
            name: nn,
            tag: P,
            url: O,
            domain: C,
            bridgeUrl: M,
            method: rn,
            propsDef: tn,
            dimensions: F,
            autoResize: B,
            allowedParentDomains: te,
            attributes: q,
            defaultContext: k,
            containerTemplate: Or,
            prerenderTemplate: Ur,
            validate: Br,
            logger: en,
            eligible: $r,
            children: Gr,
            exports: typeof gr == "function" ? gr : function(oe) {
              for (var hr = oe.getExports, ae = {}, Ue = function() {
                var Re = Be[Ne], ke = gr[Re].type, Fe = hr().then(function(ze) {
                  return ze[Re];
                });
                ae[Re] = ke === ve.FUNCTION ? function() {
                  for (var ze = arguments.length, pr = new Array(ze), rr = 0; rr < ze; rr++) pr[rr] = arguments[rr];
                  return Fe.then(function(yr) {
                    return yr.apply(void 0, pr);
                  });
                } : Fe;
              }, Ne = 0, Be = Object.keys(gr); Ne < Be.length; Ne++) Ue();
              return ae;
            }
          };
        }(e), t = n.name, o = n.tag, a = n.defaultContext, u = n.propsDef, c = n.eligible, l = n.children, f = An(window), v = {}, g = [], w = function() {
          if (function(P) {
            try {
              return Yt(window.name).name === P;
            } catch {
            }
            return !1;
          }(t)) {
            var y = Ei().payload;
            if (y.tag === o && ur(y.childDomainMatch, J())) return !0;
          }
          return !1;
        }, p = zr(function() {
          if (w()) {
            if (window.xprops)
              throw delete f.components[o], new Error("Can not register " + t + " as child - child already registered");
            var y = function(P) {
              var O = P.tag, C = P.propsDef, M = P.autoResize, V = P.allowedParentDomains, N = [], $ = Ei(), F = $.parent, X = $.payload, B = F.win, ue = F.domain, te, K = new T(), q = X.version, se = X.uid, k = X.exports, Ce = X.context, Or = X.props;
              if (!function(ae, Ue) {
                if (!/_/.test(ae) || !/_/.test("10_3_3")) throw new Error("Versions are in an invalid format (" + ae + ", 10_3_3)");
                return ae.split("_")[0] === "10_3_3".split("_")[0];
              }(q)) throw new Error("Parent window has zoid version " + q + ", child window has version 10_3_3");
              var lr = k.show, Ur = k.hide, Br = k.close, Nr = k.onError, $r = k.checkClose, qr = k.export, en = k.resize, Hr = k.init, gr = function() {
                return B;
              }, rn = function() {
                return ue;
              }, Vr = function(ae) {
                return N.push(ae), {
                  cancel: function() {
                    N.splice(N.indexOf(ae), 1);
                  }
                };
              }, Gr = function(ae) {
                return en.fireAndForget({
                  width: ae.width,
                  height: ae.height
                });
              }, nn = function(ae) {
                return K.resolve(ae), qr(ae);
              }, tn = function(ae) {
                var Ue = (ae === void 0 ? {} : ae).anyParent, Ne = [], Be = te.parent;
                if (Ue === void 0 && (Ue = !Be), !Ue && !Be) throw new Error("No parent found for " + O + " child");
                for (var Re = 0, ke = Mr(window); Re < ke.length; Re++) {
                  var Fe = ke[Re];
                  if (H(Fe)) {
                    var ze = ye(Fe).xprops;
                    if (ze && gr() === ze.getParent()) {
                      var pr = ze.parent;
                      if (Ue || !Be || pr && pr.uid === Be.uid) {
                        var rr = wi(Fe, function(yr) {
                          return yr.exports;
                        });
                        Ne.push({
                          props: ze,
                          exports: rr
                        });
                      }
                    }
                  }
                }
                return Ne;
              }, oe = function(ae, Ue, Ne) {
                Ne === void 0 && (Ne = !1);
                var Be = function(ke, Fe, ze, pr, rr, yr) {
                  yr === void 0 && (yr = !1);
                  for (var Ir = {}, fn = 0, ln = Object.keys(ze); fn < ln.length; fn++) {
                    var on = ln[fn], nr = Fe[on], _n = nr && nr.trustedDomains && nr.trustedDomains.length > 0 ? nr.trustedDomains.reduce(function(ft, zn) {
                      return ft || ur(zn, J(window));
                    }, !1) : pr === J(window) || H(ke);
                    if ((!nr || !nr.sameDomain || _n) && (!nr || !nr.trustedDomains || _n)) {
                      var Mn = bi(Fe, 0, on, ze[on], rr);
                      Ir[on] = Mn, nr && nr.alias && !Ir[nr.alias] && (Ir[nr.alias] = Mn);
                    }
                  }
                  if (!yr) for (var hn = 0, dt = Object.keys(Fe); hn < dt.length; hn++) {
                    var Fn = dt[hn];
                    ze.hasOwnProperty(Fn) || (Ir[Fn] = bi(Fe, 0, Fn, void 0, rr));
                  }
                  return Ir;
                }(B, C, ae, Ue, {
                  tag: O,
                  show: lr,
                  hide: Ur,
                  close: Br,
                  focus: Ja,
                  onError: Nr,
                  resize: Gr,
                  getSiblings: tn,
                  onProps: Vr,
                  getParent: gr,
                  getParentDomain: rn,
                  uid: se,
                  export: nn
                }, Ne);
                te ? cn(te, Be) : te = Be;
                for (var Re = 0; Re < N.length; Re++) (0, N[Re])(te);
              }, hr = function(ae) {
                return T.try(function() {
                  return oe(ae, ue, !0);
                });
              };
              return {
                init: function() {
                  return T.try(function() {
                    var ae = "";
                    return H(B) && (ae = function(Ue) {
                      var Ne = Ue.componentName, Be = Ue.parentComponentWindow, Re = gi({
                        data: Yt(window.name).serializedInitialPayload,
                        sender: {
                          win: Be
                        },
                        basic: !0
                      }), ke = Re.sender;
                      if (Re.reference.type === "uid" || Re.metaData.windowRef.type === "global") {
                        var Fe = yi({
                          name: Ne,
                          serializedPayload: mi({
                            data: Re.data,
                            metaData: {
                              windowRef: Ga(Be)
                            },
                            sender: {
                              domain: ke.domain
                            },
                            receiver: {
                              win: window,
                              domain: J()
                            },
                            basic: !0
                          }).serializedData
                        });
                        return window.name = Fe, Fe;
                      }
                    }({
                      componentName: P.name,
                      parentComponentWindow: B
                    }) || ""), An(window).exports = P.exports({
                      getExports: function() {
                        return K;
                      }
                    }), function(Ue, Ne) {
                      if (!ur(Ue, Ne)) throw new Error("Can not be rendered by domain: " + Ne);
                    }(V, ue), Qo(B), function() {
                      window.addEventListener("beforeunload", function() {
                        $r.fireAndForget();
                      }), window.addEventListener("unload", function() {
                        $r.fireAndForget();
                      }), Po(B, function() {
                        Pi();
                      });
                    }(), Hr({
                      name: ae,
                      updateProps: hr,
                      close: Pi
                    });
                  }).then(function() {
                    return (ae = M.width, Ue = ae !== void 0 && ae, Ne = M.height, Be = Ne !== void 0 && Ne, Re = M.element, Fo(Re === void 0 ? "body" : Re).catch(be).then(function(ke) {
                      return {
                        width: Ue,
                        height: Be,
                        element: ke
                      };
                    })).then(function(ke) {
                      var Fe = ke.width, ze = ke.height, pr = ke.element;
                      pr && (Fe || ze) && Ce !== De.POPUP && Bo(pr, function(rr) {
                        Gr({
                          width: Fe ? rr.width : void 0,
                          height: ze ? rr.height : void 0
                        });
                      }, {
                        width: Fe,
                        height: ze
                      });
                    });
                    var ae, Ue, Ne, Be, Re;
                  }).catch(function(ae) {
                    Nr(ae);
                  });
                },
                getProps: function() {
                  return te || (oe(Or, ue), te);
                }
              };
            }(n);
            return y.init(), y;
          }
        }), m = function y(P) {
          var O, C = "zoid-" + o + "-" + Xe(), M = P || {}, V = c({
            props: M
          }), N = V.eligible, $ = V.reason, F = M.onDestroy;
          M.onDestroy = function() {
            if (O && N && g.splice(g.indexOf(O), 1), F) return F.apply(void 0, arguments);
          };
          var X = Si({
            uid: C,
            options: n
          });
          X.init(), N ? X.setProps(M) : M.onDestroy && M.onDestroy(), Qt.register(function(te) {
            return X.destroy(te || new Error("zoid destroyed all components"));
          });
          var B = function(te) {
            var K = (te === void 0 ? {} : te).decorate;
            return y((K === void 0 ? Wa : K)(M));
          }, ue = function(te, K, q) {
            return T.try(function() {
              if (!N) {
                var se = new Error($ || t + " component is not eligible");
                return X.destroy(se).then(function() {
                  throw se;
                });
              }
              if (!Qr(te)) throw new Error("Must pass window to renderTo");
              return function(k, Ce) {
                return T.try(function() {
                  if (k.window) return Wn(k.window).getType();
                  if (Ce) {
                    if (Ce !== De.IFRAME && Ce !== De.POPUP) throw new Error("Unrecognized context: " + Ce);
                    return Ce;
                  }
                  return a;
                });
              }(M, q);
            }).then(function(se) {
              if (K = function(k, Ce) {
                if (Ce) {
                  if (typeof Ce != "string" && !St(Ce)) throw new TypeError("Expected string or element selector to be passed");
                  return Ce;
                }
                if (k === De.POPUP) return "body";
                throw new Error("Expected element to be passed to render iframe");
              }(se, K), te !== window && typeof K != "string") throw new Error("Must pass string element when rendering to another window");
              return X.render({
                target: te,
                container: K,
                context: se,
                rerender: function() {
                  var k = B();
                  return cn(O, k), k.renderTo(te, K, q);
                }
              });
            }).catch(function(se) {
              return X.destroy(se).then(function() {
                throw se;
              });
            });
          };
          return O = S({}, X.getExports(), X.getHelpers(), function() {
            for (var te = l(), K = {}, q = function() {
              var Ce = k[se], Or = te[Ce];
              K[Ce] = function(lr) {
                var Ur = X.getProps(), Br = S({}, lr, {
                  parent: {
                    uid: C,
                    props: Ur,
                    export: X.export
                  }
                });
                return Or(Br);
              };
            }, se = 0, k = Object.keys(te); se < k.length; se++) q();
            return K;
          }(), {
            isEligible: function() {
              return N;
            },
            clone: B,
            render: function(te, K) {
              return ue(window, te, K);
            },
            renderTo: function(te, K, q) {
              return ue(te, K, q);
            }
          }), N && g.push(O), O;
        };
        if (p(), function() {
          var y = Dr("zoid_allow_delegate_" + t, function() {
            return !0;
          }), P = Dr("zoid_delegate_" + t, function(O) {
            var C = O.data;
            return {
              parent: Si({
                uid: C.uid,
                options: n,
                overrides: C.overrides,
                parentWin: O.source
              })
            };
          });
          Xt.register(y.cancel), Xt.register(P.cancel);
        }(), f.components = f.components || {}, f.components[o]) throw new Error("Can not register multiple components with the same tag: " + o);
        return f.components[o] = !0, {
          init: m,
          instances: g,
          driver: function(y, P) {
            var O = {
              react: Ka,
              angular: Qa,
              vue: Ya,
              vue3: Za,
              angular2: Xa
            };
            if (!O[y]) throw new Error("Could not find driver for framework: " + y);
            return v[y] || (v[y] = O[y].register(o, u, m, P)), v[y];
          },
          isChild: w,
          canRenderTo: function(y) {
            return mr(y, "zoid_allow_delegate_" + t).then(function(P) {
              return P.data;
            }).catch(function() {
              return !1;
            });
          },
          registerChild: p
        };
      }
      var ns = function(e) {
        (function() {
          Sr().initialized || (Sr().initialized = !0, u = (a = {
            on: Dr,
            send: mr
          }).on, c = a.send, (l = Sr()).receiveMessage = l.receiveMessage || function(f) {
            return Jt(f, {
              on: u,
              send: c
            });
          }, function(f) {
            var v = f.on, g = f.send;
            fe().getOrSet("postMessageListener", function() {
              return jo(window, "message", function(w) {
                (function(p, m) {
                  var y = m.on, P = m.send;
                  T.try(function() {
                    var O = p.source || p.sourceElement, C = p.origin || p.originalEvent && p.originalEvent.origin, M = p.data;
                    if (C === "null" && (C = "file://"), O) {
                      if (!C) throw new Error("Post message did not have origin domain");
                      Jt({
                        source: O,
                        origin: C,
                        data: M
                      }, {
                        on: y,
                        send: P
                      });
                    }
                  });
                })(w, {
                  on: v,
                  send: g
                });
              });
            });
          }({
            on: Dr,
            send: mr
          }), ii({
            on: Dr,
            send: mr,
            receiveMessage: Jt
          }), function(f) {
            var v = f.on, g = f.send;
            fe("builtinListeners").getOrSet("helloListener", function() {
              var w = v("postrobot_hello", {
                domain: "*"
              }, function(m) {
                return Ko(m.source, {
                  domain: m.origin
                }), {
                  instanceID: Jo()
                };
              }), p = Rn();
              return p && Lt(p, {
                send: g
              }).catch(function(m) {
              }), w;
            });
          }({
            on: Dr,
            send: mr
          }));
          var a, u, c, l;
        })();
        var n = rs(e), t = function(a) {
          return n.init(a);
        };
        t.driver = function(a, u) {
          return n.driver(a, u);
        }, t.isChild = function() {
          return n.isChild();
        }, t.canRenderTo = function(a) {
          return n.canRenderTo(a);
        }, t.instances = n.instances;
        var o = n.registerChild();
        return o && (window.xprops = t.xprops = o.getProps()), t;
      };
      function Oi(e) {
        jr && jr.destroyBridges();
        var n = Qt.all(e);
        return Qt = rt(), n;
      }
      var Ri = Oi;
      function ts(e) {
        return Ri(), delete window.__zoid_10_3_3__, function() {
          (function() {
            for (var t = fe("responseListeners"), o = 0, a = t.keys(); o < a.length; o++) {
              var u = a[o], c = t.get(u);
              c && (c.cancelled = !0), t.del(u);
            }
          })(), (n = fe().get("postMessageListener")) && n.cancel();
          var n;
          delete window.__post_robot_11_0_0__;
        }(), Xt.all(e);
      }
    }]);
  });
})(xa);
var Da = xa.exports;
const ki = Da.EVENT, vn = {
  VISIBLE: "zoid-visible",
  INVISIBLE: "zoid-invisible"
};
function ec({
  uid: r,
  frame: i,
  prerenderFrame: s,
  doc: d,
  props: h,
  event: b,
  dimensions: x
}) {
  const { width: S, height: _ } = x, { top: L = 0, left: E = 0 } = h;
  if (!i || !s)
    return;
  const A = d.createElement("div");
  A.setAttribute("id", r);
  const W = d.createElement("style");
  return h.cspNonce && W.setAttribute("nonce", h.cspNonce), W.appendChild(
    d.createTextNode(`
          #${r} {
              display: inline-block;
              position: absolute;
              width: ${S};
              height: ${_};
              z-index: 1049;
              border: none;
              top: ${L}px;
              left: ${E}px;
              overflow: hidden;
          }

          #${r} > iframe {
              display: inline-block;
              position: absolute;
              width: 100%;
              height: 100%;
              top: 0;
              left: 0;
              transition: opacity .2s ease-in-out;
              border: none;
              background-color: transparent;
              overflow: hidden;
          }

          #${r} > iframe.${vn.INVISIBLE} {
              opacity: 0;
          }

          #${r} > iframe.${vn.VISIBLE} {
              opacity: 1;
        }
      `)
  ), A.appendChild(i), A.appendChild(s), A.appendChild(W), s.classList.add(vn.INVISIBLE), i.classList.add(vn.INVISIBLE), b.on(ki.RENDERED, () => {
    setTimeout(() => {
      i.classList.remove(vn.INVISIBLE), i.classList.add(vn.VISIBLE);
    }, 100), setTimeout(() => {
      s.remove();
    }, 1);
  }), b.on(ki.RESIZE, ({ width: U, height: de }) => {
    typeof U == "number" && (A.style.width = `${U}px`), typeof de == "number" && (A.style.height = `${de}px`);
  }), A;
}
function rc(r) {
  return Da.create({
    dimensions: {
      width: "100%",
      height: "100%"
    },
    tag: `wta${r}`,
    url: ({ props: i }) => i.appConfig.sdkBaseUrl,
    props: {
      appConfig: {
        type: "object",
        required: !0
      },
      icons: {
        type: "array",
        required: !0
      }
    },
    containerTemplate: ec
  });
}
function nc(r) {
  return rc(r.id)(r);
}
function tc({ video: r, adContainer: i, trackingUrl: s, interval: d, startSession: h }) {
  const b = ar(s);
  ar({}), ar(), ar(d || 1e3), ar();
  const x = Xu(), S = ar(!1), _ = ar(), L = Math.random().toString(36).slice(6);
  function E({ icons: we }) {
    return {
      id: L,
      appConfig: {
        sdkBaseUrl: na("https://cdn.jsdelivr.net/gh/sigmaott/sigma-ssai-web-sdk/v1/build/dist/wta/index.html", { id: L })
      },
      icons: we
    };
  }
  const A = nc(E({
    icons: []
  }));
  A.render(i), A.hide(), i.style.display = "none", xu(() => {
    var we;
    if (_.value) {
      const ne = ((we = _.value) == null ? void 0 : we.icons) || [];
      i.style.display = "block", A.updateProps(E({
        icons: ne
      })), A.show();
    } else
      i.style.display = "none", A.hide();
  });
  const W = ar([]), U = ar(), de = ar([]);
  async function je(we) {
    var ie;
    const ne = (ie = _.value) == null ? void 0 : ie.trackingEvents.find((Me) => Me.eventType === we);
    ne && (x.trigger(ne), await Promise.all(ne.beaconUrls.map((Me) => Kr(Un(Me)))));
  }
  function T() {
    return S.value = !1, ["fullscreenchange", "webkitfullscreenchange", "mozfullscreenchange", "msfullscreenchange"].forEach((we) => {
      r.addEventListener(we, () => {
        const ne = document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement;
        je(ne ? "fullscreen" : "exitFullscreen");
      });
    }), r.addEventListener("pause", () => {
      je("pause");
    }), r.addEventListener("play", () => {
      je("resume");
    }), r.addEventListener("rewind", () => {
      je("rewind");
    }), r.addEventListener("mute", () => {
      je("mute");
    }), r.addEventListener("unmute", () => {
      je("unmute");
    }), async (we, ne) => {
      if (U.value = ne.frag.sn, !we !== window.Hls.Events.FRAG_CHANGED) {
        for (const ie of W.value)
          if (ie.sn === ne.frag.sn)
            for (const Ee of de.value) {
              if (Ee.tracked)
                continue;
              _.value = Ee, h(Ee.adVerifications, x);
              const J = Ee.trackingEvents.find((H) => H.eventType === ie.value.event);
              J && gu(async () => {
                if (ie.value.event === "start") {
                  const H = Ee.trackingEvents.find((ye) => ye.eventType === "impression");
                  H && (x.trigger(H), await Promise.all(H.beaconUrls.map((ye) => Kr(Un(ye)))));
                }
                x.trigger(J), await Promise.all(J.beaconUrls.map((H) => Kr(Un(H)))), ie.value.event === "complete" && (_.value = void 0, W.value = [], Ee.tracked = !0);
              }, ie.time * 1e3);
            }
      }
    };
  }
  function br() {
    Kr(sa(b.value)).then(({ data: we, error: ne }) => {
      if (ne) {
        console.error("Cannot get tracking data", ne);
        return;
      }
      for (const ie of (we == null ? void 0 : we.avails) || [])
        for (const Me of ie.ads) {
          const Ee = `${ie.id}_${Me.id}_${Me.startTimeInSeconds}`;
          de.value.find((H) => H.key === Ee) || de.value.push({
            ...Me,
            key: Ee,
            tracked: !1
          });
        }
    });
  }
  function _r() {
    return async (we, ne) => {
      function ie(J) {
        for (let H = 0; H < J.length; H++)
          if (J[H] === 0)
            return H;
        return J.length;
      }
      const { start: Me, sn: Ee } = ne.frag;
      for (let J = 0; J < ne.samples.length; J++) {
        const H = ne.samples[J], ye = H.data, Gn = H.pts;
        if (String.fromCharCode.apply(null, ye.slice(0, 3)) !== "ID3" || String.fromCharCode.apply(null, ye.slice(10, 14)) !== "TXXX")
          continue;
        const Tr = ye.slice(21, ye.length), Mr = ie(Tr), Fr = Tr.slice(Mr + 1, Tr.length), Sn = ie(Fr), xe = new TextDecoder("utf-8").decode(Fr.slice(0, Sn)), On = {
          sn: Ee,
          time: Gn - Me,
          value: io(xe)
        };
        if (U.value && Ee < U.value)
          return;
        W.value.push(On), On.value.event === "start" && br();
      }
    };
  }
  function Oe() {
    return (we) => {
      const ne = we.track;
      ne.kind === "metadata" && (br(), ne.on("cuechange", async () => {
        const ie = ne.activeCues[0];
        if (ie && ie.value.data) {
          const Me = io(ie.value.data);
          for (const Ee of de.value) {
            if (Ee.tracked)
              continue;
            _.value = Ee, h(Ee.adVerifications, x);
            const J = Ee.trackingEvents.find((H) => H.eventType === Me.event);
            if (J) {
              if (Me.event === "start") {
                const H = Ee.trackingEvents.find((ye) => ye.eventType === "impression");
                H && (x.trigger(H), await Promise.all(H.beaconUrls.map((ye) => Kr(Un(ye)))));
              }
              x.trigger(J), await Promise.all(J.beaconUrls.map((H) => Kr(Un(H)))), Me.event === "complete" && (_.value = void 0);
            }
          }
        }
      }));
    };
  }
  function Qe(we, ne) {
    x.on((ie) => {
      (we === "*" || ie.eventType === we) && ne(ie);
    });
  }
  function Pr() {
    _.value = void 0, W.value = [];
  }
  return {
    destroy: Pr,
    onEventTracking: Qe,
    hlsHelper: {
      createHlsFragChanged: T,
      createHlsFragParsingMetadata: _r
    },
    videojsHelper: {
      createVideojsAddTrack: Oe
    }
  };
}
async function oc({ video: r, adContainer: i, url: s }) {
  const d = await ms();
  async function h({ url: Oe }) {
    const Qe = oa(Oe), Pr = await gs(d, r);
    if (!Pr)
      throw console.error("nonce is null"), new Error("nonce is null");
    const we = `${Qe.protocol}//${Qe.host}`, { data: ne, error: ie } = await Kr(sa(`${we}${Qe.pathname}`, {
      params: { "play_params.nonce": Pr }
    }));
    if (ie || !ne)
      throw console.error(ie), new Error(ie);
    const Me = `${we}${ne.manifestUrl}`, Ee = `${we}${ne.trackingUrl}`;
    return {
      manifestUrl: Me,
      trackingUrl: Ee
    };
  }
  const { manifestUrl: b, trackingUrl: x } = await h({ url: s });
  function S() {
  }
  const { onEventTracking: _, destroy: L, videojsHelper: E, hlsHelper: A } = tc({
    video: r,
    adContainer: i,
    trackingUrl: x,
    startSession: S
  }), W = ar(), U = ar();
  function de(Oe) {
    W.value = Oe;
    const Qe = A.createHlsFragChanged(), Pr = A.createHlsFragParsingMetadata();
    Oe.on("hlsFragChanged", Qe), Oe.on("hlsFragParsingMetadata", Pr), U.value = () => {
      Oe.off("hlsFragChanged", Qe), Oe.off("hlsFragParsingMetadata", Pr);
    };
  }
  const je = ar(), T = ar();
  function br(Oe) {
    je.value = Oe;
    const Qe = E.createVideojsAddTrack();
    Oe.textTracks().on("addtrack", Qe), T.value = () => {
      Oe.textTracks().off("addtrack", Qe);
    };
  }
  function _r() {
    var Oe, Qe;
    L(), (Oe = U.value) == null || Oe.call(U), (Qe = T.value) == null || Qe.call(T);
  }
  return {
    manifestUrl: b,
    onEventTracking: _,
    destroy: _r,
    sigmaPlayer: {
      attachVideojs: br,
      attachHls: de
    }
  };
}
export {
  gs as createPal,
  oc as createSigmaDai,
  ms as loadPalSdk
};
