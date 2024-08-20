function cs(r) {
  return new Promise((a, c) => {
    const h = document.createElement("script");
    h.async = !0, h.src = r, h.onload = a, h.onerror = c, document.body.appendChild(h);
  });
}
const ds = "https://imasdk.googleapis.com/pal/sdkloader/pal.js";
let vt = null;
function Di() {
  vt = null;
}
function fs() {
  const r = window;
  return r.goog && r.goog.pal ? Promise.resolve(r.goog.pal) : vt || (vt = cs(ds).then(() => r.goog.pal), vt.then(Di).catch(Di), vt);
}
async function _t(r) {
  try {
    return {
      data: await r,
      error: null
    };
  } catch (a) {
    return {
      data: null,
      error: a
    };
  }
}
function ls(r, a) {
  let c, h, l, C = !1;
  function O() {
    return !0;
  }
  function V() {
    a.addEventListener("mousedown", (he) => void b(he)), a.addEventListener("touchstart", (he) => void b(he)), a.addEventListener("play", () => {
      C || (L(), C = !0);
    }), a.addEventListener("ended", () => void M()), a.addEventListener("error", () => {
      console.log(`Video error: ${a.error.message}`), M();
    });
    const B = new r.ConsentSettings();
    return B.allowStorage = O(), c = new r.NonceLoader(), $();
  }
  async function $() {
    const B = new r.NonceRequest();
    B.adWillAutoPlay = !0, B.adWillPlayMuted = !0, B.continuousPlayback = !1, B.descriptionUrl = "https://example.com", B.iconsSupported = !0, B.playerType = "Sample Player Type", B.playerVersion = "1.0", B.ppid = "Sample PPID", B.sessionId = "Sample SID", B.supportedApiFrameworks = "2,7,9", B.url = "https://developers.google.com/ad-manager/pal/html5", B.videoHeight = 480, B.videoWidth = 640, h = c.loadNonceManager(B);
    const { data: he, error: Qe } = await _t(h);
    return Qe ? (console.log(`Error generating nonce: ${Qe}`), null) : (l = he, l.getNonce());
  }
  function b(B) {
    l && l.sendTouch(B);
  }
  function L() {
    l && l.sendPlaybackStart();
  }
  function M() {
    l && l.sendPlaybackEnd();
  }
  return V();
}
const hs = /"(?:_|\\u0{2}5[Ff]){2}(?:p|\\u0{2}70)(?:r|\\u0{2}72)(?:o|\\u0{2}6[Ff])(?:t|\\u0{2}74)(?:o|\\u0{2}6[Ff])(?:_|\\u0{2}5[Ff]){2}"\s*:/, ps = /"(?:c|\\u0063)(?:o|\\u006[Ff])(?:n|\\u006[Ee])(?:s|\\u0073)(?:t|\\u0074)(?:r|\\u0072)(?:u|\\u0075)(?:c|\\u0063)(?:t|\\u0074)(?:o|\\u006[Ff])(?:r|\\u0072)"\s*:/, vs = /^\s*["[{]|^\s*-?\d{1,16}(\.\d{1,17})?([Ee][+-]?\d+)?\s*$/;
function ws(r, a) {
  if (r === "__proto__" || r === "constructor" && a && typeof a == "object" && "prototype" in a) {
    ms(r);
    return;
  }
  return a;
}
function ms(r) {
  console.warn(`[destr] Dropping "${r}" key to prevent prototype pollution.`);
}
function Zr(r, a = {}) {
  if (typeof r != "string")
    return r;
  const c = r.trim();
  if (
    // eslint-disable-next-line unicorn/prefer-at
    r[0] === '"' && r.endsWith('"') && !r.includes("\\")
  )
    return c.slice(1, -1);
  if (c.length <= 9) {
    const h = c.toLowerCase();
    if (h === "true")
      return !0;
    if (h === "false")
      return !1;
    if (h === "undefined")
      return;
    if (h === "null")
      return null;
    if (h === "nan")
      return Number.NaN;
    if (h === "infinity")
      return Number.POSITIVE_INFINITY;
    if (h === "-infinity")
      return Number.NEGATIVE_INFINITY;
  }
  if (!vs.test(r)) {
    if (a.strict)
      throw new SyntaxError("[destr] Invalid JSON");
    return r;
  }
  try {
    if (hs.test(r) || ps.test(r)) {
      if (a.strict)
        throw new Error("[destr] Possible prototype pollution");
      return JSON.parse(r, ws);
    }
    return JSON.parse(r);
  } catch (h) {
    if (a.strict)
      throw h;
    return r;
  }
}
const gs = /#/g, ys = /&/g, Es = /\//g, bs = /=/g, ro = /\+/g, Ps = /%5e/gi, Os = /%60/gi, Ss = /%7c/gi, Ts = /%20/gi;
function Rs(r) {
  return encodeURI("" + r).replace(Ss, "|");
}
function Xr(r) {
  return Rs(typeof r == "string" ? r : JSON.stringify(r)).replace(ro, "%2B").replace(Ts, "+").replace(gs, "%23").replace(ys, "%26").replace(Os, "`").replace(Ps, "^").replace(Es, "%2F");
}
function Yr(r) {
  return Xr(r).replace(bs, "%3D");
}
function Vi(r = "") {
  try {
    return decodeURIComponent("" + r);
  } catch {
    return "" + r;
  }
}
function Cs(r) {
  return Vi(r.replace(ro, " "));
}
function Ns(r) {
  return Vi(r.replace(ro, " "));
}
function xs(r = "") {
  const a = {};
  r[0] === "?" && (r = r.slice(1));
  for (const c of r.split("&")) {
    const h = c.match(/([^=]+)=?(.*)/) || [];
    if (h.length < 2)
      continue;
    const l = Cs(h[1]);
    if (l === "__proto__" || l === "constructor")
      continue;
    const E = Ns(h[2] || "");
    a[l] === void 0 ? a[l] = E : Array.isArray(a[l]) ? a[l].push(E) : a[l] = [a[l], E];
  }
  return a;
}
function Is(r, a) {
  return (typeof a == "number" || typeof a == "boolean") && (a = String(a)), a ? Array.isArray(a) ? a.map((c) => `${Yr(r)}=${Xr(c)}`).join("&") : `${Yr(r)}=${Xr(a)}` : Yr(r);
}
function Ds(r) {
  return Object.keys(r).filter((a) => r[a] !== void 0).map((a) => Is(a, r[a])).filter(Boolean).join("&");
}
const Ws = /^[\s\w\0+.-]{2,}:([/\\]{1,2})/, _s = /^[\s\w\0+.-]{2,}:([/\\]{2})?/, As = /^([/\\]\s*){2,}[^/\\]/, Ms = /^\.?\//;
function Gi(r, a = {}) {
  return typeof a == "boolean" && (a = { acceptRelative: a }), a.strict ? Ws.test(r) : _s.test(r) || (a.acceptRelative ? As.test(r) : !1);
}
function zs(r = "", a) {
  return r.endsWith("/");
}
function Fs(r = "", a) {
  return (zs(r) ? r.slice(0, -1) : r) || "/";
}
function Ls(r = "", a) {
  return r.endsWith("/") ? r : r + "/";
}
function js(r, a) {
  if (Us(a) || Gi(r))
    return r;
  const c = Fs(a);
  return r.startsWith(c) ? r : Bs(c, r);
}
function Ji(r, a) {
  const c = Yi(r), h = { ...xs(c.search), ...a };
  return c.search = Ds(h), qs(c);
}
function Us(r) {
  return !r || r === "/";
}
function $s(r) {
  return r && r !== "/";
}
function Bs(r, ...a) {
  let c = r || "";
  for (const h of a.filter((l) => $s(l)))
    if (c) {
      const l = h.replace(Ms, "");
      c = Ls(c) + l;
    } else
      c = h;
  return c;
}
const Ki = Symbol.for("ufo:protocolRelative");
function Yi(r = "", a) {
  const c = r.match(
    /^[\s\0]*(blob:|data:|javascript:|vbscript:)(.*)/i
  );
  if (c) {
    const [, L, M = ""] = c;
    return {
      protocol: L.toLowerCase(),
      pathname: M,
      href: L + M,
      auth: "",
      host: "",
      search: "",
      hash: ""
    };
  }
  if (!Gi(r, { acceptRelative: !0 }))
    return Wi(r);
  const [, h = "", l, E = ""] = r.replace(/\\/g, "/").match(/^[\s\0]*([\w+.-]{2,}:)?\/\/([^/@]+@)?(.*)/) || [], [, C = "", O = ""] = E.match(/([^#/?]*)(.*)?/) || [], { pathname: V, search: $, hash: b } = Wi(
    O.replace(/\/(?=[A-Za-z]:)/, "")
  );
  return {
    protocol: h.toLowerCase(),
    auth: l ? l.slice(0, Math.max(0, l.length - 1)) : "",
    host: C,
    pathname: V,
    search: $,
    hash: b,
    [Ki]: !h
  };
}
function Wi(r = "") {
  const [a = "", c = "", h = ""] = (r.match(/([^#?]*)(\?[^#]*)?(#.*)?/) || []).splice(1);
  return {
    pathname: a,
    search: c,
    hash: h
  };
}
function qs(r) {
  const a = r.pathname || "", c = r.search ? (r.search.startsWith("?") ? "" : "?") + r.search : "", h = r.hash || "", l = r.auth ? r.auth + "@" : "", E = r.host || "";
  return (r.protocol || r[Ki] ? (r.protocol || "") + "//" : "") + l + E + a + c + h;
}
class Hs extends Error {
  constructor(a, c) {
    super(a, c), this.name = "FetchError", c != null && c.cause && !this.cause && (this.cause = c.cause);
  }
}
function Vs(r) {
  var V, $, b, L, M;
  const a = ((V = r.error) == null ? void 0 : V.message) || (($ = r.error) == null ? void 0 : $.toString()) || "", c = ((b = r.request) == null ? void 0 : b.method) || ((L = r.options) == null ? void 0 : L.method) || "GET", h = ((M = r.request) == null ? void 0 : M.url) || String(r.request) || "/", l = `[${c}] ${JSON.stringify(h)}`, E = r.response ? `${r.response.status} ${r.response.statusText}` : "<no response>", C = `${l}: ${E}${a ? ` ${a}` : ""}`, O = new Hs(
    C,
    r.error ? { cause: r.error } : void 0
  );
  for (const B of ["request", "options", "response"])
    Object.defineProperty(O, B, {
      get() {
        return r[B];
      }
    });
  for (const [B, he] of [
    ["data", "_data"],
    ["status", "status"],
    ["statusCode", "status"],
    ["statusText", "statusText"],
    ["statusMessage", "statusText"]
  ])
    Object.defineProperty(O, B, {
      get() {
        return r.response && r.response[he];
      }
    });
  return O;
}
const Gs = new Set(
  Object.freeze(["PATCH", "POST", "PUT", "DELETE"])
);
function _i(r = "GET") {
  return Gs.has(r.toUpperCase());
}
function Js(r) {
  if (r === void 0)
    return !1;
  const a = typeof r;
  return a === "string" || a === "number" || a === "boolean" || a === null ? !0 : a !== "object" ? !1 : Array.isArray(r) ? !0 : r.buffer ? !1 : r.constructor && r.constructor.name === "Object" || typeof r.toJSON == "function";
}
const Ks = /* @__PURE__ */ new Set([
  "image/svg",
  "application/xml",
  "application/xhtml",
  "application/html"
]), Ys = /^application\/(?:[\w!#$%&*.^`~-]*\+)?json(;.+)?$/i;
function Zs(r = "") {
  if (!r)
    return "json";
  const a = r.split(";").shift() || "";
  return Ys.test(a) ? "json" : Ks.has(a) || a.startsWith("text/") ? "text" : "blob";
}
function Xs(r, a, c = globalThis.Headers) {
  const h = {
    ...a,
    ...r
  };
  if (a != null && a.params && (r != null && r.params) && (h.params = {
    ...a == null ? void 0 : a.params,
    ...r == null ? void 0 : r.params
  }), a != null && a.query && (r != null && r.query) && (h.query = {
    ...a == null ? void 0 : a.query,
    ...r == null ? void 0 : r.query
  }), a != null && a.headers && (r != null && r.headers)) {
    h.headers = new c((a == null ? void 0 : a.headers) || {});
    for (const [l, E] of new c((r == null ? void 0 : r.headers) || {}))
      h.headers.set(l, E);
  }
  return h;
}
const Qs = /* @__PURE__ */ new Set([
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
]), ks = /* @__PURE__ */ new Set([101, 204, 205, 304]);
function Zi(r = {}) {
  const {
    fetch: a = globalThis.fetch,
    Headers: c = globalThis.Headers,
    AbortController: h = globalThis.AbortController
  } = r;
  async function l(O) {
    const V = O.error && O.error.name === "AbortError" && !O.options.timeout || !1;
    if (O.options.retry !== !1 && !V) {
      let b;
      typeof O.options.retry == "number" ? b = O.options.retry : b = _i(O.options.method) ? 0 : 1;
      const L = O.response && O.response.status || 500;
      if (b > 0 && (Array.isArray(O.options.retryStatusCodes) ? O.options.retryStatusCodes.includes(L) : Qs.has(L))) {
        const M = O.options.retryDelay || 0;
        return M > 0 && await new Promise((B) => setTimeout(B, M)), E(O.request, {
          ...O.options,
          retry: b - 1
        });
      }
    }
    const $ = Vs(O);
    throw Error.captureStackTrace && Error.captureStackTrace($, E), $;
  }
  const E = async function(V, $ = {}) {
    var B;
    const b = {
      request: V,
      options: Xs($, r.defaults, c),
      response: void 0,
      error: void 0
    };
    b.options.method = (B = b.options.method) == null ? void 0 : B.toUpperCase(), b.options.onRequest && await b.options.onRequest(b), typeof b.request == "string" && (b.options.baseURL && (b.request = js(b.request, b.options.baseURL)), (b.options.query || b.options.params) && (b.request = Ji(b.request, {
      ...b.options.params,
      ...b.options.query
    }))), b.options.body && _i(b.options.method) && (Js(b.options.body) ? (b.options.body = typeof b.options.body == "string" ? b.options.body : JSON.stringify(b.options.body), b.options.headers = new c(b.options.headers || {}), b.options.headers.has("content-type") || b.options.headers.set("content-type", "application/json"), b.options.headers.has("accept") || b.options.headers.set("accept", "application/json")) : (
      // ReadableStream Body
      ("pipeTo" in b.options.body && typeof b.options.body.pipeTo == "function" || // Node.js Stream Body
      typeof b.options.body.pipe == "function") && ("duplex" in b.options || (b.options.duplex = "half"))
    ));
    let L;
    if (!b.options.signal && b.options.timeout) {
      const he = new h();
      L = setTimeout(
        () => he.abort(),
        b.options.timeout
      ), b.options.signal = he.signal;
    }
    try {
      b.response = await a(
        b.request,
        b.options
      );
    } catch (he) {
      return b.error = he, b.options.onRequestError && await b.options.onRequestError(b), await l(b);
    } finally {
      L && clearTimeout(L);
    }
    if (b.response.body && !ks.has(b.response.status) && b.options.method !== "HEAD") {
      const he = (b.options.parseResponse ? "json" : b.options.responseType) || Zs(b.response.headers.get("content-type") || "");
      switch (he) {
        case "json": {
          const Qe = await b.response.text(), S = b.options.parseResponse || Zr;
          b.response._data = S(Qe);
          break;
        }
        case "stream": {
          b.response._data = b.response.body;
          break;
        }
        default:
          b.response._data = await b.response[he]();
      }
    }
    return b.options.onResponse && await b.options.onResponse(b), !b.options.ignoreResponseError && b.response.status >= 400 && b.response.status < 600 ? (b.options.onResponseError && await b.options.onResponseError(b), await l(b)) : b.response;
  }, C = async function(V, $) {
    return (await E(V, $))._data;
  };
  return C.raw = E, C.native = (...O) => a(...O), C.create = (O = {}) => Zi({
    ...r,
    defaults: {
      ...r.defaults,
      ...O
    }
  }), C;
}
const oo = function() {
  if (typeof globalThis < "u")
    return globalThis;
  if (typeof self < "u")
    return self;
  if (typeof window < "u")
    return window;
  if (typeof global < "u")
    return global;
  throw new Error("unable to locate global object");
}(), eu = oo.fetch || (() => Promise.reject(new Error("[ofetch] global.fetch is not supported!"))), nu = oo.Headers, tu = oo.AbortController, Xi = Zi({ fetch: eu, Headers: nu, AbortController: tu }), Qi = Xi, Ai = Xi.create({
  credentials: "omit",
  onResponseError({ response: r, error: a }) {
    console.log("[LOG] ~ error:", a);
  },
  onRequest: ({ options: r, request: a }) => {
    const c = r.token;
    c && (r.headers = r.headers || {}, r.headers.Authorization = `${c}`);
  },
  onResponse({ response: r, options: a }) {
  }
}), ru = (r) => (a, c) => (r.set(a, c), c), Mi = Number.MAX_SAFE_INTEGER === void 0 ? 9007199254740991 : Number.MAX_SAFE_INTEGER, ki = 536870912, zi = ki * 2, ou = (r, a) => (c) => {
  const h = a.get(c);
  let l = h === void 0 ? c.size : h < zi ? h + 1 : 0;
  if (!c.has(l))
    return r(c, l);
  if (c.size < ki) {
    for (; c.has(l); )
      l = Math.floor(Math.random() * zi);
    return r(c, l);
  }
  if (c.size > Mi)
    throw new Error("Congratulations, you created a collection of unique numbers which uses all available integers!");
  for (; c.has(l); )
    l = Math.floor(Math.random() * Mi);
  return r(c, l);
}, ea = /* @__PURE__ */ new WeakMap(), iu = ru(ea), tr = ou(iu, ea), au = (r) => r.method !== void 0 && r.method === "call", su = (r) => typeof r.id == "number" && typeof r.result == "boolean", uu = (r) => {
  const a = /* @__PURE__ */ new Map([[0, () => {
  }]]), c = /* @__PURE__ */ new Map([[0, () => {
  }]]), h = /* @__PURE__ */ new Map(), l = new Worker(r);
  return l.addEventListener("message", ({ data: $ }) => {
    if (au($)) {
      const { params: { timerId: b, timerType: L } } = $;
      if (L === "interval") {
        const M = a.get(b);
        if (typeof M === void 0)
          throw new Error("The timer is in an undefined state.");
        if (typeof M == "number") {
          const B = h.get(M);
          if (B === void 0 || B.timerId !== b || B.timerType !== L)
            throw new Error("The timer is in an undefined state.");
        } else typeof M == "function" && M();
      } else if (L === "timeout") {
        const M = c.get(b);
        if (typeof M === void 0)
          throw new Error("The timer is in an undefined state.");
        if (typeof M == "number") {
          const B = h.get(M);
          if (B === void 0 || B.timerId !== b || B.timerType !== L)
            throw new Error("The timer is in an undefined state.");
        } else typeof M == "function" && (M(), c.delete(b));
      }
    } else if (su($)) {
      const { id: b } = $, L = h.get(b);
      if (L === void 0)
        throw new Error("The timer is in an undefined state.");
      const { timerId: M, timerType: B } = L;
      h.delete(b), B === "interval" ? a.delete(M) : c.delete(M);
    } else {
      const { error: { message: b } } = $;
      throw new Error(b);
    }
  }), {
    clearInterval: ($) => {
      if (typeof a.get($) == "function") {
        const b = tr(h);
        h.set(b, { timerId: $, timerType: "interval" }), a.set($, b), l.postMessage({
          id: b,
          method: "clear",
          params: { timerId: $, timerType: "interval" }
        });
      }
    },
    clearTimeout: ($) => {
      if (typeof c.get($) == "function") {
        const b = tr(h);
        h.set(b, { timerId: $, timerType: "timeout" }), c.set($, b), l.postMessage({
          id: b,
          method: "clear",
          params: { timerId: $, timerType: "timeout" }
        });
      }
    },
    setInterval: ($, b = 0, ...L) => {
      const M = tr(a);
      return a.set(M, () => {
        $(...L), typeof a.get(M) == "function" && l.postMessage({
          id: null,
          method: "set",
          params: {
            delay: b,
            now: performance.timeOrigin + performance.now(),
            timerId: M,
            timerType: "interval"
          }
        });
      }), l.postMessage({
        id: null,
        method: "set",
        params: {
          delay: b,
          now: performance.timeOrigin + performance.now(),
          timerId: M,
          timerType: "interval"
        }
      }), M;
    },
    setTimeout: ($, b = 0, ...L) => {
      const M = tr(c);
      return c.set(M, () => $(...L)), l.postMessage({
        id: null,
        method: "set",
        params: {
          delay: b,
          now: performance.timeOrigin + performance.now(),
          timerId: M,
          timerType: "timeout"
        }
      }), M;
    }
  };
}, cu = (r, a) => {
  let c = null;
  return () => {
    if (c !== null)
      return c;
    const h = new Blob([a], { type: "application/javascript; charset=utf-8" }), l = URL.createObjectURL(h);
    return c = r(l), setTimeout(() => URL.revokeObjectURL(l)), c;
  };
}, du = `(()=>{"use strict";const e=new Map,t=new Map,r=t=>{const r=e.get(t);return void 0!==r&&(clearTimeout(r),e.delete(t),!0)},s=e=>{const r=t.get(e);return void 0!==r&&(clearTimeout(r),t.delete(e),!0)},o=(e,t)=>{const r=performance.now(),s=e+t-r-performance.timeOrigin;return{expected:r+s,remainingDelay:s}},i=(e,t,r,s)=>{const o=r-performance.now();o>0?e.set(t,setTimeout(i,o,e,t,r,s)):(e.delete(t),postMessage({id:null,method:"call",params:{timerId:t,timerType:s}}))};addEventListener("message",(n=>{let{data:a}=n;try{if("clear"===a.method){const{id:e,params:{timerId:t,timerType:o}}=a;if("interval"===o)postMessage({id:e,result:r(t)});else{if("timeout"!==o)throw new Error('The given type "'.concat(o,'" is not supported'));postMessage({id:e,result:s(t)})}}else{if("set"!==a.method)throw new Error('The given method "'.concat(a.method,'" is not supported'));{const{params:{delay:r,now:s,timerId:n,timerType:m}}=a;if("interval"===m)((t,r,s)=>{const{expected:n,remainingDelay:a}=o(t,s);e.set(r,setTimeout(i,a,e,r,n,"interval"))})(r,n,s);else{if("timeout"!==m)throw new Error('The given type "'.concat(m,'" is not supported'));((e,r,s)=>{const{expected:n,remainingDelay:a}=o(e,s);t.set(r,setTimeout(i,a,t,r,n,"timeout"))})(r,n,s)}}}}catch(e){postMessage({error:{message:e.message},id:a.id,result:null})}}))})();`, fu = cu(uu, du), lu = (...r) => fu().setTimeout(...r);
/**
* @vue/shared v3.4.32
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
/*! #__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function hu(r, a) {
  const c = new Set(r.split(","));
  return (h) => c.has(h);
}
const pu = () => {
}, na = Object.assign, vu = Object.prototype.hasOwnProperty, cr = (r, a) => vu.call(r, a), tt = Array.isArray, At = (r) => ta(r) === "[object Map]", wu = (r) => typeof r == "string", zt = (r) => typeof r == "symbol", fr = (r) => r !== null && typeof r == "object", mu = Object.prototype.toString, ta = (r) => mu.call(r), ra = (r) => ta(r).slice(8, -1), io = (r) => wu(r) && r !== "NaN" && r[0] !== "-" && "" + parseInt(r, 10) === r, gu = (r) => {
  const a = /* @__PURE__ */ Object.create(null);
  return (c) => a[c] || (a[c] = r(c));
}, yu = gu((r) => r.charAt(0).toUpperCase() + r.slice(1)), gt = (r, a) => !Object.is(r, a);
var Xe = {};
function wt(r, ...a) {
  console.warn(`[Vue warn] ${r}`, ...a);
}
let Eu;
function bu(r, a = Eu) {
  a && a.active && a.effects.push(r);
}
let rt;
class Qr {
  constructor(a, c, h, l) {
    this.fn = a, this.trigger = c, this.scheduler = h, this.active = !0, this.deps = [], this._dirtyLevel = 4, this._trackId = 0, this._runnings = 0, this._shouldSchedule = !1, this._depsLength = 0, bu(this, l);
  }
  get dirty() {
    if (this._dirtyLevel === 2 || this._dirtyLevel === 3) {
      this._dirtyLevel = 1, aa();
      for (let a = 0; a < this._depsLength; a++) {
        const c = this.deps[a];
        if (c.computed && (Pu(c.computed), this._dirtyLevel >= 4))
          break;
      }
      this._dirtyLevel === 1 && (this._dirtyLevel = 0), sa();
    }
    return this._dirtyLevel >= 4;
  }
  set dirty(a) {
    this._dirtyLevel = a ? 4 : 0;
  }
  run() {
    if (this._dirtyLevel = 0, !this.active)
      return this.fn();
    let a = qn, c = rt;
    try {
      return qn = !0, rt = this, this._runnings++, Fi(this), this.fn();
    } finally {
      Li(this), this._runnings--, rt = c, qn = a;
    }
  }
  stop() {
    this.active && (Fi(this), Li(this), this.onStop && this.onStop(), this.active = !1);
  }
}
function Pu(r) {
  return r.value;
}
function Fi(r) {
  r._trackId++, r._depsLength = 0;
}
function Li(r) {
  if (r.deps.length > r._depsLength) {
    for (let a = r._depsLength; a < r.deps.length; a++)
      oa(r.deps[a], r);
    r.deps.length = r._depsLength;
  }
}
function oa(r, a) {
  const c = r.get(a);
  c !== void 0 && a._trackId !== c && (r.delete(a), r.size === 0 && r.cleanup());
}
function Ou(r, a) {
  r.effect instanceof Qr && (r = r.effect.fn);
  const c = new Qr(r, pu, () => {
    c.dirty && c.run();
  });
  c.run();
  const h = c.run.bind(c);
  return h.effect = c, h;
}
let qn = !0, kr = 0;
const ia = [];
function aa() {
  ia.push(qn), qn = !1;
}
function sa() {
  const r = ia.pop();
  qn = r === void 0 ? !0 : r;
}
function ao() {
  kr++;
}
function so() {
  for (kr--; !kr && eo.length; )
    eo.shift()();
}
function ua(r, a, c) {
  var h;
  if (a.get(r) !== r._trackId) {
    a.set(r, r._trackId);
    const l = r.deps[r._depsLength];
    l !== a ? (l && oa(l, r), r.deps[r._depsLength++] = a) : r._depsLength++, Xe.NODE_ENV !== "production" && ((h = r.onTrack) == null || h.call(r, na({ effect: r }, c)));
  }
}
const eo = [];
function ca(r, a, c) {
  var h;
  ao();
  for (const l of r.keys()) {
    let E;
    l._dirtyLevel < a && (E ?? (E = r.get(l) === l._trackId)) && (l._shouldSchedule || (l._shouldSchedule = l._dirtyLevel === 0), l._dirtyLevel = a), l._shouldSchedule && (E ?? (E = r.get(l) === l._trackId)) && (Xe.NODE_ENV !== "production" && ((h = l.onTrigger) == null || h.call(l, na({ effect: l }, c))), l.trigger(), (!l._runnings || l.allowRecurse) && l._dirtyLevel !== 2 && (l._shouldSchedule = !1, l.scheduler && eo.push(l.scheduler)));
  }
  so();
}
const da = (r, a) => {
  const c = /* @__PURE__ */ new Map();
  return c.cleanup = r, c.computed = a, c;
}, no = /* @__PURE__ */ new WeakMap(), ot = Symbol(Xe.NODE_ENV !== "production" ? "iterate" : ""), to = Symbol(Xe.NODE_ENV !== "production" ? "Map key iterate" : "");
function pn(r, a, c) {
  if (qn && rt) {
    let h = no.get(r);
    h || no.set(r, h = /* @__PURE__ */ new Map());
    let l = h.get(c);
    l || h.set(c, l = da(() => h.delete(c))), ua(
      rt,
      l,
      Xe.NODE_ENV !== "production" ? {
        target: r,
        type: a,
        key: c
      } : void 0
    );
  }
}
function Hn(r, a, c, h, l, E) {
  const C = no.get(r);
  if (!C)
    return;
  let O = [];
  if (a === "clear")
    O = [...C.values()];
  else if (c === "length" && tt(r)) {
    const V = Number(h);
    C.forEach(($, b) => {
      (b === "length" || !zt(b) && b >= V) && O.push($);
    });
  } else
    switch (c !== void 0 && O.push(C.get(c)), a) {
      case "add":
        tt(r) ? io(c) && O.push(C.get("length")) : (O.push(C.get(ot)), At(r) && O.push(C.get(to)));
        break;
      case "delete":
        tt(r) || (O.push(C.get(ot)), At(r) && O.push(C.get(to)));
        break;
      case "set":
        At(r) && O.push(C.get(ot));
        break;
    }
  ao();
  for (const V of O)
    V && ca(
      V,
      4,
      Xe.NODE_ENV !== "production" ? {
        target: r,
        type: a,
        key: c,
        newValue: h,
        oldValue: l,
        oldTarget: E
      } : void 0
    );
  so();
}
const Su = /* @__PURE__ */ hu("__proto__,__v_isRef,__isVue"), fa = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((r) => r !== "arguments" && r !== "caller").map((r) => Symbol[r]).filter(zt)
), ji = /* @__PURE__ */ Tu();
function Tu() {
  const r = {};
  return ["includes", "indexOf", "lastIndexOf"].forEach((a) => {
    r[a] = function(...c) {
      const h = se(this);
      for (let E = 0, C = this.length; E < C; E++)
        pn(h, "get", E + "");
      const l = h[a](...c);
      return l === -1 || l === !1 ? h[a](...c.map(se)) : l;
    };
  }), ["push", "pop", "shift", "unshift", "splice"].forEach((a) => {
    r[a] = function(...c) {
      aa(), ao();
      const h = se(this)[a].apply(this, c);
      return so(), sa(), h;
    };
  }), r;
}
function Ru(r) {
  zt(r) || (r = String(r));
  const a = se(this);
  return pn(a, "has", r), a.hasOwnProperty(r);
}
class la {
  constructor(a = !1, c = !1) {
    this._isReadonly = a, this._isShallow = c;
  }
  get(a, c, h) {
    const l = this._isReadonly, E = this._isShallow;
    if (c === "__v_isReactive")
      return !l;
    if (c === "__v_isReadonly")
      return l;
    if (c === "__v_isShallow")
      return E;
    if (c === "__v_raw")
      return h === (l ? E ? ju : wa : E ? Lu : va).get(a) || // receiver is not the reactive proxy, but has the same prototype
      // this means the reciever is a user proxy of the reactive proxy
      Object.getPrototypeOf(a) === Object.getPrototypeOf(h) ? a : void 0;
    const C = tt(a);
    if (!l) {
      if (C && cr(ji, c))
        return Reflect.get(ji, c, h);
      if (c === "hasOwnProperty")
        return Ru;
    }
    const O = Reflect.get(a, c, h);
    return (zt(c) ? fa.has(c) : Su(c)) || (l || pn(a, "get", c), E) ? O : dr(O) ? C && io(c) ? O : O.value : fr(O) ? l ? ga(O) : ma(O) : O;
  }
}
class Cu extends la {
  constructor(a = !1) {
    super(!1, a);
  }
  set(a, c, h, l) {
    let E = a[c];
    if (!this._isShallow) {
      const V = mt(E);
      if (!hr(h) && !mt(h) && (E = se(E), h = se(h)), !tt(a) && dr(E) && !dr(h))
        return V ? !1 : (E.value = h, !0);
    }
    const C = tt(a) && io(c) ? Number(c) < a.length : cr(a, c), O = Reflect.set(a, c, h, l);
    return a === se(l) && (C ? gt(h, E) && Hn(a, "set", c, h, E) : Hn(a, "add", c, h)), O;
  }
  deleteProperty(a, c) {
    const h = cr(a, c), l = a[c], E = Reflect.deleteProperty(a, c);
    return E && h && Hn(a, "delete", c, void 0, l), E;
  }
  has(a, c) {
    const h = Reflect.has(a, c);
    return (!zt(c) || !fa.has(c)) && pn(a, "has", c), h;
  }
  ownKeys(a) {
    return pn(
      a,
      "iterate",
      tt(a) ? "length" : ot
    ), Reflect.ownKeys(a);
  }
}
class Nu extends la {
  constructor(a = !1) {
    super(!0, a);
  }
  set(a, c) {
    return Xe.NODE_ENV !== "production" && wt(
      `Set operation on key "${String(c)}" failed: target is readonly.`,
      a
    ), !0;
  }
  deleteProperty(a, c) {
    return Xe.NODE_ENV !== "production" && wt(
      `Delete operation on key "${String(c)}" failed: target is readonly.`,
      a
    ), !0;
  }
}
const xu = /* @__PURE__ */ new Cu(), Iu = /* @__PURE__ */ new Nu(), uo = (r) => r, lr = (r) => Reflect.getPrototypeOf(r);
function rr(r, a, c = !1, h = !1) {
  r = r.__v_raw;
  const l = se(r), E = se(a);
  c || (gt(a, E) && pn(l, "get", a), pn(l, "get", E));
  const { has: C } = lr(l), O = h ? uo : c ? co : Mt;
  if (C.call(l, a))
    return O(r.get(a));
  if (C.call(l, E))
    return O(r.get(E));
  r !== l && r.get(a);
}
function or(r, a = !1) {
  const c = this.__v_raw, h = se(c), l = se(r);
  return a || (gt(r, l) && pn(h, "has", r), pn(h, "has", l)), r === l ? c.has(r) : c.has(r) || c.has(l);
}
function ir(r, a = !1) {
  return r = r.__v_raw, !a && pn(se(r), "iterate", ot), Reflect.get(r, "size", r);
}
function Ui(r, a = !1) {
  !a && !hr(r) && !mt(r) && (r = se(r));
  const c = se(this);
  return lr(c).has.call(c, r) || (c.add(r), Hn(c, "add", r, r)), this;
}
function $i(r, a, c = !1) {
  !c && !hr(a) && !mt(a) && (a = se(a));
  const h = se(this), { has: l, get: E } = lr(h);
  let C = l.call(h, r);
  C ? Xe.NODE_ENV !== "production" && pa(h, l, r) : (r = se(r), C = l.call(h, r));
  const O = E.call(h, r);
  return h.set(r, a), C ? gt(a, O) && Hn(h, "set", r, a, O) : Hn(h, "add", r, a), this;
}
function Bi(r) {
  const a = se(this), { has: c, get: h } = lr(a);
  let l = c.call(a, r);
  l ? Xe.NODE_ENV !== "production" && pa(a, c, r) : (r = se(r), l = c.call(a, r));
  const E = h ? h.call(a, r) : void 0, C = a.delete(r);
  return l && Hn(a, "delete", r, void 0, E), C;
}
function qi() {
  const r = se(this), a = r.size !== 0, c = Xe.NODE_ENV !== "production" ? At(r) ? new Map(r) : new Set(r) : void 0, h = r.clear();
  return a && Hn(r, "clear", void 0, void 0, c), h;
}
function ar(r, a) {
  return function(h, l) {
    const E = this, C = E.__v_raw, O = se(C), V = a ? uo : r ? co : Mt;
    return !r && pn(O, "iterate", ot), C.forEach(($, b) => h.call(l, V($), V(b), E));
  };
}
function sr(r, a, c) {
  return function(...h) {
    const l = this.__v_raw, E = se(l), C = At(E), O = r === "entries" || r === Symbol.iterator && C, V = r === "keys" && C, $ = l[r](...h), b = c ? uo : a ? co : Mt;
    return !a && pn(
      E,
      "iterate",
      V ? to : ot
    ), {
      // iterator protocol
      next() {
        const { value: L, done: M } = $.next();
        return M ? { value: L, done: M } : {
          value: O ? [b(L[0]), b(L[1])] : b(L),
          done: M
        };
      },
      // iterable protocol
      [Symbol.iterator]() {
        return this;
      }
    };
  };
}
function Bn(r) {
  return function(...a) {
    if (Xe.NODE_ENV !== "production") {
      const c = a[0] ? `on key "${a[0]}" ` : "";
      wt(
        `${yu(r)} operation ${c}failed: target is readonly.`,
        se(this)
      );
    }
    return r === "delete" ? !1 : r === "clear" ? void 0 : this;
  };
}
function Du() {
  const r = {
    get(E) {
      return rr(this, E);
    },
    get size() {
      return ir(this);
    },
    has: or,
    add: Ui,
    set: $i,
    delete: Bi,
    clear: qi,
    forEach: ar(!1, !1)
  }, a = {
    get(E) {
      return rr(this, E, !1, !0);
    },
    get size() {
      return ir(this);
    },
    has: or,
    add(E) {
      return Ui.call(this, E, !0);
    },
    set(E, C) {
      return $i.call(this, E, C, !0);
    },
    delete: Bi,
    clear: qi,
    forEach: ar(!1, !0)
  }, c = {
    get(E) {
      return rr(this, E, !0);
    },
    get size() {
      return ir(this, !0);
    },
    has(E) {
      return or.call(this, E, !0);
    },
    add: Bn("add"),
    set: Bn("set"),
    delete: Bn("delete"),
    clear: Bn("clear"),
    forEach: ar(!0, !1)
  }, h = {
    get(E) {
      return rr(this, E, !0, !0);
    },
    get size() {
      return ir(this, !0);
    },
    has(E) {
      return or.call(this, E, !0);
    },
    add: Bn("add"),
    set: Bn("set"),
    delete: Bn("delete"),
    clear: Bn("clear"),
    forEach: ar(!0, !0)
  };
  return [
    "keys",
    "values",
    "entries",
    Symbol.iterator
  ].forEach((E) => {
    r[E] = sr(E, !1, !1), c[E] = sr(E, !0, !1), a[E] = sr(E, !1, !0), h[E] = sr(
      E,
      !0,
      !0
    );
  }), [
    r,
    c,
    a,
    h
  ];
}
const [
  Wu,
  _u,
  Au,
  Mu
] = /* @__PURE__ */ Du();
function ha(r, a) {
  const c = a ? r ? Mu : Au : r ? _u : Wu;
  return (h, l, E) => l === "__v_isReactive" ? !r : l === "__v_isReadonly" ? r : l === "__v_raw" ? h : Reflect.get(
    cr(c, l) && l in h ? c : h,
    l,
    E
  );
}
const zu = {
  get: /* @__PURE__ */ ha(!1, !1)
}, Fu = {
  get: /* @__PURE__ */ ha(!0, !1)
};
function pa(r, a, c) {
  const h = se(c);
  if (h !== c && a.call(r, h)) {
    const l = ra(r);
    wt(
      `Reactive ${l} contains both the raw and reactive versions of the same object${l === "Map" ? " as keys" : ""}, which can lead to inconsistencies. Avoid differentiating between the raw and reactive versions of an object and only use the reactive version if possible.`
    );
  }
}
const va = /* @__PURE__ */ new WeakMap(), Lu = /* @__PURE__ */ new WeakMap(), wa = /* @__PURE__ */ new WeakMap(), ju = /* @__PURE__ */ new WeakMap();
function Uu(r) {
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
function $u(r) {
  return r.__v_skip || !Object.isExtensible(r) ? 0 : Uu(ra(r));
}
function ma(r) {
  return mt(r) ? r : ya(
    r,
    !1,
    xu,
    zu,
    va
  );
}
function ga(r) {
  return ya(
    r,
    !0,
    Iu,
    Fu,
    wa
  );
}
function ya(r, a, c, h, l) {
  if (!fr(r))
    return Xe.NODE_ENV !== "production" && wt(
      `value cannot be made ${a ? "readonly" : "reactive"}: ${String(
        r
      )}`
    ), r;
  if (r.__v_raw && !(a && r.__v_isReactive))
    return r;
  const E = l.get(r);
  if (E)
    return E;
  const C = $u(r);
  if (C === 0)
    return r;
  const O = new Proxy(
    r,
    C === 2 ? h : c
  );
  return l.set(r, O), O;
}
function mt(r) {
  return !!(r && r.__v_isReadonly);
}
function hr(r) {
  return !!(r && r.__v_isShallow);
}
function se(r) {
  const a = r && r.__v_raw;
  return a ? se(a) : r;
}
const Mt = (r) => fr(r) ? ma(r) : r, co = (r) => fr(r) ? ga(r) : r, Bu = "Computed is still dirty after getter evaluation, likely because a computed is mutating its own dependency in its getter. State mutations in computed getters should be avoided.  Check the docs for more details: https://vuejs.org/guide/essentials/computed.html#getters-should-be-side-effect-free";
class qu {
  constructor(a, c, h, l) {
    this.getter = a, this._setter = c, this.dep = void 0, this.__v_isRef = !0, this.__v_isReadonly = !1, this.effect = new Qr(
      () => a(this._value),
      () => ur(
        this,
        this.effect._dirtyLevel === 2 ? 2 : 3
      )
    ), this.effect.computed = this, this.effect.active = this._cacheable = !l, this.__v_isReadonly = h;
  }
  get value() {
    const a = se(this);
    return (!a._cacheable || a.effect.dirty) && gt(a._value, a._value = a.effect.run()) && ur(a, 4), Ea(a), a.effect._dirtyLevel >= 2 && (Xe.NODE_ENV !== "production" && this._warnRecursive && wt(Bu, `

getter: `, this.getter), ur(a, 2)), a._value;
  }
  set value(a) {
    this._setter(a);
  }
  // #region polyfill _dirty for backward compatibility third party code for Vue <= 3.3.x
  get _dirty() {
    return this.effect.dirty;
  }
  set _dirty(a) {
    this.effect.dirty = a;
  }
  // #endregion
}
function Ea(r) {
  var a;
  qn && rt && (r = se(r), ua(
    rt,
    (a = r.dep) != null ? a : r.dep = da(
      () => r.dep = void 0,
      r instanceof qu ? r : void 0
    ),
    Xe.NODE_ENV !== "production" ? {
      target: r,
      type: "get",
      key: "value"
    } : void 0
  ));
}
function ur(r, a = 4, c, h) {
  r = se(r);
  const l = r.dep;
  l && ca(
    l,
    a,
    Xe.NODE_ENV !== "production" ? {
      target: r,
      type: "set",
      key: "value",
      newValue: c,
      oldValue: h
    } : void 0
  );
}
function dr(r) {
  return !!(r && r.__v_isRef === !0);
}
function bn(r) {
  return Hu(r, !1);
}
function Hu(r, a) {
  return dr(r) ? r : new Vu(r, a);
}
class Vu {
  constructor(a, c) {
    this.__v_isShallow = c, this.dep = void 0, this.__v_isRef = !0, this._rawValue = c ? a : se(a), this._value = c ? a : Mt(a);
  }
  get value() {
    return Ea(this), this._value;
  }
  set value(a) {
    const c = this.__v_isShallow || hr(a) || mt(a);
    if (a = c ? a : se(a), gt(a, this._rawValue)) {
      const h = this._rawValue;
      this._rawValue = a, this._value = c ? a : Mt(a), ur(this, 4, a, h);
    }
  }
}
function Gu() {
  const r = /* @__PURE__ */ new Set(), a = (l) => {
    r.delete(l);
  };
  return {
    on: (l) => (r.add(l), {
      off: () => a(l)
    }),
    off: a,
    trigger: (...l) => Promise.all(Array.from(r).map((E) => E(...l)))
  };
}
var Ju = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, ba = { exports: {} };
(function(r, a) {
  (function(c, h) {
    r.exports = h();
  })(typeof self < "u" ? self : Ju, function() {
    return function(c) {
      var h = {};
      function l(E) {
        if (h[E]) return h[E].exports;
        var C = h[E] = {
          i: E,
          l: !1,
          exports: {}
        };
        return c[E].call(C.exports, C, C.exports, l), C.l = !0, C.exports;
      }
      return l.m = c, l.c = h, l.d = function(E, C, O) {
        l.o(E, C) || Object.defineProperty(E, C, {
          enumerable: !0,
          get: O
        });
      }, l.r = function(E) {
        typeof Symbol < "u" && Symbol.toStringTag && Object.defineProperty(E, Symbol.toStringTag, {
          value: "Module"
        }), Object.defineProperty(E, "__esModule", {
          value: !0
        });
      }, l.t = function(E, C) {
        if (1 & C && (E = l(E)), 8 & C || 4 & C && typeof E == "object" && E && E.__esModule) return E;
        var O = /* @__PURE__ */ Object.create(null);
        if (l.r(O), Object.defineProperty(O, "default", {
          enumerable: !0,
          value: E
        }), 2 & C && typeof E != "string") for (var V in E) l.d(O, V, (function($) {
          return E[$];
        }).bind(null, V));
        return O;
      }, l.n = function(E) {
        var C = E && E.__esModule ? function() {
          return E.default;
        } : function() {
          return E;
        };
        return l.d(C, "a", C), C;
      }, l.o = function(E, C) {
        return {}.hasOwnProperty.call(E, C);
      }, l.p = "", l(l.s = 0);
    }([function(c, h, l) {
      l.r(h), l.d(h, "PopupOpenError", function() {
        return Nr;
      }), l.d(h, "create", function() {
        return Za;
      }), l.d(h, "destroy", function() {
        return Xa;
      }), l.d(h, "destroyComponents", function() {
        return wi;
      }), l.d(h, "destroyAll", function() {
        return mi;
      }), l.d(h, "PROP_TYPE", function() {
        return de;
      }), l.d(h, "PROP_SERIALIZATION", function() {
        return kt;
      }), l.d(h, "CONTEXT", function() {
        return Ee;
      }), l.d(h, "EVENT", function() {
        return ve;
      });
      function E(e, n) {
        return (E = Object.setPrototypeOf || function(t, o) {
          return t.__proto__ = o, t;
        })(e, n);
      }
      function C(e, n) {
        e.prototype = Object.create(n.prototype), e.prototype.constructor = e, E(e, n);
      }
      function O() {
        return (O = Object.assign || function(e) {
          for (var n = 1; n < arguments.length; n++) {
            var t = arguments[n];
            for (var o in t) ({}).hasOwnProperty.call(t, o) && (e[o] = t[o]);
          }
          return e;
        }).apply(this, arguments);
      }
      function V(e) {
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
      var $ = [], b = [], L = 0, M;
      function B() {
        if (!L && M) {
          var e = M;
          M = null, e.resolve();
        }
      }
      function he() {
        L += 1;
      }
      function Qe() {
        L -= 1, B();
      }
      var S = function() {
        function e(t) {
          var o = this;
          if (this.resolved = void 0, this.rejected = void 0, this.errorHandled = void 0, this.value = void 0, this.error = void 0, this.handlers = void 0, this.dispatching = void 0, this.stack = void 0, this.resolved = !1, this.rejected = !1, this.errorHandled = !1, this.handlers = [], t) {
            var i, s, u = !1, f = !1, d = !1;
            he();
            try {
              t(function(v) {
                d ? o.resolve(v) : (u = !0, i = v);
              }, function(v) {
                d ? o.reject(v) : (f = !0, s = v);
              });
            } catch (v) {
              Qe(), this.reject(v);
              return;
            }
            Qe(), d = !0, u ? this.resolve(i) : f && this.reject(s);
          }
        }
        var n = e.prototype;
        return n.resolve = function(t) {
          if (this.resolved || this.rejected) return this;
          if (V(t)) throw new Error("Can not resolve promise with another promise");
          return this.resolved = !0, this.value = t, this.dispatch(), this;
        }, n.reject = function(t) {
          var o = this;
          if (this.resolved || this.rejected) return this;
          if (V(t)) throw new Error("Can not reject promise with another promise");
          if (!t) {
            var i = t && typeof t.toString == "function" ? t.toString() : {}.toString.call(t);
            t = new Error("Expected reject to be called with Error, got " + i);
          }
          return this.rejected = !0, this.error = t, this.errorHandled || setTimeout(function() {
            o.errorHandled || function(s, u) {
              if ($.indexOf(s) === -1) {
                $.push(s), setTimeout(function() {
                  throw s;
                }, 1);
                for (var f = 0; f < b.length; f++) b[f](s, u);
              }
            }(t, o);
          }, 1), this.dispatch(), this;
        }, n.asyncReject = function(t) {
          return this.errorHandled = !0, this.reject(t), this;
        }, n.dispatch = function() {
          var t = this.resolved, o = this.rejected, i = this.handlers;
          if (!this.dispatching && (t || o)) {
            this.dispatching = !0, he();
            for (var s = function(m, y) {
              return m.then(function(P) {
                y.resolve(P);
              }, function(P) {
                y.reject(P);
              });
            }, u = 0; u < i.length; u++) {
              var f = i[u], d = f.onSuccess, v = f.onError, g = f.promise, w = void 0;
              if (t) try {
                w = d ? d(this.value) : this.value;
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
              } else V(w) ? w instanceof e && (w.resolved || w.rejected) ? w.resolved ? g.resolve(w.value) : g.reject(w.error) : s(w, g) : g.resolve(w);
            }
            i.length = 0, this.dispatching = !1, Qe();
          }
        }, n.then = function(t, o) {
          if (t && typeof t != "function" && !t.call) throw new Error("Promise.then expected a function for success handler");
          if (o && typeof o != "function" && !o.call) throw new Error("Promise.then expected a function for error handler");
          var i = new e();
          return this.handlers.push({
            promise: i,
            onSuccess: t,
            onError: o
          }), this.errorHandled = !0, this.dispatch(), i;
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
          var i = this;
          if (this.resolved || this.rejected) return this;
          var s = setTimeout(function() {
            i.resolved || i.rejected || i.reject(o || new Error("Promise timed out after " + t + "ms"));
          }, t);
          return this.then(function(u) {
            return clearTimeout(s), u;
          });
        }, n.toPromise = function() {
          if (typeof Promise > "u") throw new TypeError("Could not find Promise");
          return Promise.resolve(this);
        }, n.lazy = function() {
          return this.errorHandled = !0, this;
        }, e.resolve = function(t) {
          return t instanceof e ? t : V(t) ? new e(function(o, i) {
            return t.then(o, i);
          }) : new e().resolve(t);
        }, e.reject = function(t) {
          return new e().reject(t);
        }, e.asyncReject = function(t) {
          return new e().asyncReject(t);
        }, e.all = function(t) {
          var o = new e(), i = t.length, s = [].slice();
          if (!i)
            return o.resolve(s), o;
          for (var u = function(v, g, w) {
            return g.then(function(p) {
              s[v] = p, (i -= 1) == 0 && o.resolve(s);
            }, function(p) {
              w.reject(p);
            });
          }, f = 0; f < t.length; f++) {
            var d = t[f];
            if (d instanceof e) {
              if (d.resolved) {
                s[f] = d.value, i -= 1;
                continue;
              }
            } else if (!V(d)) {
              s[f] = d, i -= 1;
              continue;
            }
            u(f, e.resolve(d), o);
          }
          return i === 0 && o.resolve(s), o;
        }, e.hash = function(t) {
          var o = {}, i = [], s = function(f) {
            if (t.hasOwnProperty(f)) {
              var d = t[f];
              V(d) ? i.push(d.then(function(v) {
                o[f] = v;
              })) : o[f] = d;
            }
          };
          for (var u in t) s(u);
          return e.all(i).then(function() {
            return o;
          });
        }, e.map = function(t, o) {
          return e.all(t.map(o));
        }, e.onPossiblyUnhandledException = function(t) {
          return function(o) {
            return b.push(o), {
              cancel: function() {
                b.splice(b.indexOf(o), 1);
              }
            };
          }(t);
        }, e.try = function(t, o, i) {
          if (t && typeof t != "function" && !t.call) throw new Error("Promise.try expected a function");
          var s;
          he();
          try {
            s = t.apply(o, i || []);
          } catch (u) {
            return Qe(), e.reject(u);
          }
          return Qe(), e.resolve(s);
        }, e.delay = function(t) {
          return new e(function(o) {
            setTimeout(o, t);
          });
        }, e.isPromise = function(t) {
          return !!(t && t instanceof e) || V(t);
        }, e.flush = function() {
          return function(t) {
            var o = M = M || new t();
            return B(), o;
          }(e);
        }, e;
      }();
      function Vn(e) {
        return {}.toString.call(e) === "[object RegExp]";
      }
      var it = {
        IFRAME: "iframe",
        POPUP: "popup"
      }, Pn = `Call was rejected by callee.\r
`;
      function qe(e) {
        return e === void 0 && (e = window), e.location.protocol;
      }
      function He(e) {
        if (e === void 0 && (e = window), e.mockDomain) {
          var n = e.mockDomain.split("//")[0];
          if (n) return n;
        }
        return qe(e);
      }
      function De(e) {
        return e === void 0 && (e = window), He(e) === "about:";
      }
      function Pe(e) {
        if (e === void 0 && (e = window), e) try {
          if (e.parent && e.parent !== e) return e.parent;
        } catch {
        }
      }
      function Oe(e) {
        if (e === void 0 && (e = window), e && !Pe(e)) try {
          return e.opener;
        } catch {
        }
      }
      function Se(e) {
        try {
          return !0;
        } catch {
        }
        return !1;
      }
      function Te(e) {
        e === void 0 && (e = window);
        var n = e.location;
        if (!n) throw new Error("Can not read window location");
        var t = qe(e);
        if (!t) throw new Error("Can not read window protocol");
        if (t === "file:") return "file://";
        if (t === "about:") {
          var o = Pe(e);
          return o && Se() ? Te(o) : "about://";
        }
        var i = n.host;
        if (!i) throw new Error("Can not read window host");
        return t + "//" + i;
      }
      function ee(e) {
        e === void 0 && (e = window);
        var n = Te(e);
        return n && e.mockDomain && e.mockDomain.indexOf("mock:") === 0 ? e.mockDomain : n;
      }
      function ge(e) {
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
            if (De(n) && Se()) return !0;
          } catch {
          }
          try {
            if (function(o) {
              return o === void 0 && (o = window), He(o) === "mock:";
            }(n) && Se()) return !0;
          } catch {
          }
          try {
            if (Te(n) === Te(window)) return !0;
          } catch {
          }
          return !1;
        }(e)) return !1;
        try {
          if (e === window || De(e) && Se() || ee(window) === ee(e)) return !0;
        } catch {
        }
        return !1;
      }
      function rn(e) {
        if (!ge(e)) throw new Error("Expected window to be same domain");
        return e;
      }
      function pr(e, n) {
        if (!e || !n) return !1;
        var t = Pe(n);
        return t ? t === e : function(o) {
          var i = [];
          try {
            for (; o.parent !== o; )
              i.push(o.parent), o = o.parent;
          } catch {
          }
          return i;
        }(n).indexOf(e) !== -1;
      }
      function In(e) {
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
          for (var i = 0; i < o; i++) {
            var s = void 0;
            try {
              s = t[i];
            } catch {
              continue;
            }
            n.push(s);
          }
          return n;
        }
        for (var u = 0; u < 100; u++) {
          var f = void 0;
          try {
            f = t[u];
          } catch {
            return n;
          }
          if (!f) return n;
          n.push(f);
        }
        return n;
      }
      function at(e) {
        for (var n = [], t = 0, o = In(e); t < o.length; t++) {
          var i = o[t];
          n.push(i);
          for (var s = 0, u = at(i); s < u.length; s++) n.push(u[s]);
        }
        return n;
      }
      function On(e) {
        e === void 0 && (e = window);
        try {
          if (e.top) return e.top;
        } catch {
        }
        if (Pe(e) === e) return e;
        try {
          if (pr(window, e) && window.top) return window.top;
        } catch {
        }
        try {
          if (pr(e, window) && window.top) return window.top;
        } catch {
        }
        for (var n = 0, t = at(e); n < t.length; n++) {
          var o = t[n];
          try {
            if (o.top) return o.top;
          } catch {
          }
          if (Pe(o) === o) return o;
        }
      }
      function Dn(e) {
        var n = On(e);
        if (!n) throw new Error("Can not determine top window");
        var t = [].concat(at(n), [n]);
        return t.indexOf(e) === -1 && (t = [].concat(t, [e], at(e))), t;
      }
      var Gn = [], st = [];
      function We(e, n) {
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
        } catch (i) {
          return !i || i.message !== Pn;
        }
        if (n && ge(e)) try {
          if (e.mockclosed) return !0;
        } catch {
        }
        try {
          if (!e.parent || !e.top) return !0;
        } catch {
        }
        var t = function(i, s) {
          for (var u = 0; u < i.length; u++) try {
            if (i[u] === s) return u;
          } catch {
          }
          return -1;
        }(Gn, e);
        if (t !== -1) {
          var o = st[t];
          if (o && function(i) {
            if (!i.contentWindow || !i.parentNode) return !0;
            var s = i.ownerDocument;
            if (s && s.documentElement && !s.documentElement.contains(i)) {
              for (var u = i; u.parentNode && u.parentNode !== u; ) u = u.parentNode;
              if (!u.host || !s.documentElement.contains(u.host)) return !0;
            }
            return !1;
          }(o)) return !0;
        }
        return !1;
      }
      function fo(e) {
        return (e = e || window).navigator.mockUserAgent || e.navigator.userAgent;
      }
      function Ft(e, n) {
        for (var t = In(e), o = 0; o < t.length; o++) {
          var i = t[o];
          try {
            if (ge(i) && i.name === n && t.indexOf(i) !== -1) return i;
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
      function lo(e, n) {
        return e === Oe(n);
      }
      function yt(e) {
        return e === void 0 && (e = window), Oe(e = e || window) || Pe(e) || void 0;
      }
      function vr(e, n) {
        for (var t = 0; t < e.length; t++)
          for (var o = e[t], i = 0; i < n.length; i++) if (o === n[i]) return !0;
        return !1;
      }
      function wr(e) {
        e === void 0 && (e = window);
        for (var n = 0, t = e; t; ) (t = Pe(t)) && (n += 1);
        return n;
      }
      function Lt(e, n) {
        var t = On(e) || e, o = On(n) || n;
        try {
          if (t && o) return t === o;
        } catch {
        }
        var i = Dn(e), s = Dn(n);
        if (vr(i, s)) return !0;
        var u = Oe(t), f = Oe(o);
        return u && vr(Dn(u), s) || f && vr(Dn(f), i), !1;
      }
      function on(e, n) {
        if (typeof e == "string") {
          if (typeof n == "string") return e === "*" || n === e;
          if (Vn(n) || Array.isArray(n)) return !1;
        }
        return Vn(e) ? Vn(n) ? e.toString() === n.toString() : !Array.isArray(n) && !!n.match(e) : !!Array.isArray(e) && (Array.isArray(n) ? JSON.stringify(e) === JSON.stringify(n) : !Vn(n) && e.some(function(t) {
          return on(t, n);
        }));
      }
      function Sn(e) {
        return e.match(/^(https?|mock|file):\/\//) ? e.split("/").slice(0, 3).join("/") : ee();
      }
      function ho(e, n, t, o) {
        t === void 0 && (t = 1e3), o === void 0 && (o = 1 / 0);
        var i;
        return function s() {
          if (We(e))
            return i && clearTimeout(i), n();
          o <= 0 ? clearTimeout(i) : (o -= t, i = setTimeout(s, t));
        }(), {
          cancel: function() {
            i && clearTimeout(i);
          }
        };
      }
      function Jn(e) {
        try {
          if (e === window) return !0;
        } catch (n) {
          if (n && n.message === Pn) return !0;
        }
        try {
          if ({}.toString.call(e) === "[object Window]") return !0;
        } catch (n) {
          if (n && n.message === Pn) return !0;
        }
        try {
          if (window.Window && e instanceof window.Window) return !0;
        } catch (n) {
          if (n && n.message === Pn) return !0;
        }
        try {
          if (e && e.self === e) return !0;
        } catch (n) {
          if (n && n.message === Pn) return !0;
        }
        try {
          if (e && e.parent === e) return !0;
        } catch (n) {
          if (n && n.message === Pn) return !0;
        }
        try {
          if (e && e.top === e) return !0;
        } catch (n) {
          if (n && n.message === Pn) return !0;
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
      function mr(e) {
        if (n = Sn(e), n.indexOf("mock:") !== 0) return e;
        var n;
        throw new Error("Mock urls not supported out of test mode");
      }
      function po(e) {
        if (ge(e)) return rn(e).frameElement;
        for (var n = 0, t = document.querySelectorAll("iframe"); n < t.length; n++) {
          var o = t[n];
          if (o && o.contentWindow && o.contentWindow === e) return o;
        }
      }
      function vo(e) {
        if (function(t) {
          return t === void 0 && (t = window), !!Pe(t);
        }(e)) {
          var n = po(e);
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
      function jt(e, n) {
        for (var t = 0; t < e.length; t++) try {
          if (e[t] === n) return t;
        } catch {
        }
        return -1;
      }
      var Ut = function() {
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
          for (var t = this.weakmap, o = this.keys, i = 0; i < o.length; i++) {
            var s = o[i];
            if (Jn(s) && We(s)) {
              if (t) try {
                t.delete(s);
              } catch {
              }
              o.splice(i, 1), this.values.splice(i, 1), i -= 1;
            }
          }
        }, n.isSafeToReadWrite = function(t) {
          return !Jn(t);
        }, n.set = function(t, o) {
          if (!t) throw new Error("WeakMap expected key");
          var i = this.weakmap;
          if (i) try {
            i.set(t, o);
          } catch {
            delete this.weakmap;
          }
          if (this.isSafeToReadWrite(t)) try {
            var s = this.name, u = t[s];
            u && u[0] === t ? u[1] = o : Object.defineProperty(t, s, {
              value: [t, o],
              writable: !0
            });
            return;
          } catch {
          }
          this._cleanupClosedWindows();
          var f = this.keys, d = this.values, v = jt(f, t);
          v === -1 ? (f.push(t), d.push(o)) : d[v] = o;
        }, n.get = function(t) {
          if (!t) throw new Error("WeakMap expected key");
          var o = this.weakmap;
          if (o) try {
            if (o.has(t)) return o.get(t);
          } catch {
            delete this.weakmap;
          }
          if (this.isSafeToReadWrite(t)) try {
            var i = t[this.name];
            return i && i[0] === t ? i[1] : void 0;
          } catch {
          }
          this._cleanupClosedWindows();
          var s = jt(this.keys, t);
          if (s !== -1) return this.values[s];
        }, n.delete = function(t) {
          if (!t) throw new Error("WeakMap expected key");
          var o = this.weakmap;
          if (o) try {
            o.delete(t);
          } catch {
            delete this.weakmap;
          }
          if (this.isSafeToReadWrite(t)) try {
            var i = t[this.name];
            i && i[0] === t && (i[0] = i[1] = void 0);
          } catch {
          }
          this._cleanupClosedWindows();
          var s = this.keys, u = jt(s, t);
          u !== -1 && (s.splice(u, 1), this.values.splice(u, 1));
        }, n.has = function(t) {
          if (!t) throw new Error("WeakMap expected key");
          var o = this.weakmap;
          if (o) try {
            if (o.has(t)) return !0;
          } catch {
            delete this.weakmap;
          }
          if (this.isSafeToReadWrite(t)) try {
            var i = t[this.name];
            return !(!i || i[0] !== t);
          } catch {
          }
          return this._cleanupClosedWindows(), jt(this.keys, t) !== -1;
        }, n.getOrSet = function(t, o) {
          if (this.has(t)) return this.get(t);
          var i = o();
          return this.set(t, i), i;
        }, e;
      }();
      function wo(e) {
        return (wo = Object.setPrototypeOf ? Object.getPrototypeOf : function(n) {
          return n.__proto__ || Object.getPrototypeOf(n);
        })(e);
      }
      function Oa() {
        if (typeof Reflect > "u" || !Reflect.construct || Reflect.construct.sham) return !1;
        if (typeof Proxy == "function") return !0;
        try {
          return Date.prototype.toString.call(Reflect.construct(Date, [], function() {
          })), !0;
        } catch {
          return !1;
        }
      }
      function mo(e, n, t) {
        return (mo = Oa() ? Reflect.construct : function(o, i, s) {
          var u = [null];
          u.push.apply(u, i);
          var f = new (Function.bind.apply(o, u))();
          return s && E(f, s.prototype), f;
        }).apply(null, arguments);
      }
      function go(e) {
        var n = typeof Map == "function" ? /* @__PURE__ */ new Map() : void 0;
        return (go = function(t) {
          if (t === null || (o = t, Function.toString.call(o).indexOf("[native code]") === -1)) return t;
          var o;
          if (typeof t != "function") throw new TypeError("Super expression must either be null or a function");
          if (n !== void 0) {
            if (n.has(t)) return n.get(t);
            n.set(t, i);
          }
          function i() {
            return mo(t, arguments, wo(this).constructor);
          }
          return i.prototype = Object.create(t.prototype, {
            constructor: {
              value: i,
              enumerable: !1,
              writable: !0,
              configurable: !0
            }
          }), E(i, t);
        })(e);
      }
      function gr(e) {
        var n = !1;
        try {
          (e instanceof window.Element || e !== null && typeof e == "object" && e.nodeType === 1 && typeof e.style == "object" && typeof e.ownerDocument == "object") && (n = !0);
        } catch {
        }
        return n;
      }
      function yr(e) {
        return e.name || e.__name__ || e.displayName || "anonymous";
      }
      function Er(e, n) {
        try {
          delete e.name, e.name = n;
        } catch {
        }
        return e.__name__ = e.displayName = n, e;
      }
      function br(e) {
        if (typeof btoa == "function") return btoa(encodeURIComponent(e).replace(/%([0-9A-F]{2})/g, function(n, t) {
          return String.fromCharCode(parseInt(t, 16));
        })).replace(/[=]/g, "");
        if (typeof Buffer < "u") return Buffer.from(e, "utf8").toString("base64").replace(/[=]/g, "");
        throw new Error("Can not find window.btoa or Buffer");
      }
      function Ke() {
        var e = "0123456789abcdef";
        return "uid_" + "xxxxxxxxxx".replace(/./g, function() {
          return e.charAt(Math.floor(Math.random() * e.length));
        }) + "_" + br((/* @__PURE__ */ new Date()).toISOString().slice(11, 19).replace("T", ".")).replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
      }
      var $t;
      function Pr(e) {
        try {
          return JSON.stringify([].slice.call(e), function(n, t) {
            return typeof t == "function" ? "memoize[" + function(o) {
              if ($t = $t || new Ut(), o == null || typeof o != "object" && typeof o != "function") throw new Error("Invalid object");
              var i = $t.get(o);
              return i || (i = typeof o + ":" + Ke(), $t.set(o, i)), i;
            }(t) + "]" : gr(t) ? {} : t;
          });
        } catch {
          throw new Error("Arguments not serializable -- can not be used to memoize");
        }
      }
      function Sa() {
        return {};
      }
      var Et = 0, yo = 0;
      function Wn(e, n) {
        n === void 0 && (n = {});
        var t = n.thisNamespace, o = t !== void 0 && t, i = n.time, s, u, f = Et;
        Et += 1;
        var d = function() {
          for (var v = arguments.length, g = new Array(v), w = 0; w < v; w++) g[w] = arguments[w];
          f < yo && (s = null, u = null, f = Et, Et += 1);
          var p;
          p = o ? (u = u || new Ut()).getOrSet(this, Sa) : s = s || {};
          var m;
          try {
            m = Pr(g);
          } catch {
            return e.apply(this, arguments);
          }
          var y = p[m];
          if (y && i && Date.now() - y.time < i && (delete p[m], y = null), y) return y.value;
          var P = Date.now(), T = e.apply(this, arguments);
          return p[m] = {
            time: P,
            value: T
          }, T;
        };
        return d.reset = function() {
          s = null, u = null;
        }, Er(d, (n.name || yr(e)) + "::memoized");
      }
      Wn.clear = function() {
        yo = Et;
      };
      function Ta(e) {
        var n = {};
        function t() {
          for (var o = arguments, i = this, s = arguments.length, u = new Array(s), f = 0; f < s; f++) u[f] = arguments[f];
          var d = Pr(u);
          return n.hasOwnProperty(d) || (n[d] = S.try(function() {
            return e.apply(i, o);
          }).finally(function() {
            delete n[d];
          })), n[d];
        }
        return t.reset = function() {
          n = {};
        }, Er(t, yr(e) + "::promiseMemoized");
      }
      function pe() {
      }
      function Bt(e) {
        var n = !1;
        return Er(function() {
          if (!n)
            return n = !0, e.apply(this, arguments);
        }, yr(e) + "::once");
      }
      function ut(e, n) {
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
        } catch (i) {
          return "Error while stringifying error: " + ut(i, n + 1);
        }
      }
      function qt(e) {
        return typeof e == "string" ? e : e && e.toString && typeof e.toString == "function" ? e.toString() : {}.toString.call(e);
      }
      function ct(e, n) {
        if (!n) return e;
        if (Object.assign) return Object.assign(e, n);
        for (var t in n) n.hasOwnProperty(t) && (e[t] = n[t]);
        return e;
      }
      Wn(function(e) {
        if (Object.values) return Object.values(e);
        var n = [];
        for (var t in e) e.hasOwnProperty(t) && n.push(e[t]);
        return n;
      });
      function Ra(e) {
        return e;
      }
      function bt(e, n) {
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
      function Or(e) {
        return e.replace(/-([a-z])/g, function(n) {
          return n[1].toUpperCase();
        });
      }
      function Eo(e, n, t) {
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
      function Sr(e) {
        return [].slice.call(e);
      }
      function bo(e) {
        return typeof (n = e) == "object" && n !== null && {}.toString.call(e) === "[object Object]";
        var n;
      }
      function Tr(e) {
        if (!bo(e)) return !1;
        var n = e.constructor;
        if (typeof n != "function") return !1;
        var t = n.prototype;
        return !!bo(t) && !!t.hasOwnProperty("isPrototypeOf");
      }
      function Ht(e, n, t) {
        if (t === void 0 && (t = ""), Array.isArray(e)) {
          for (var o = e.length, i = [], s = function(g) {
            Eo(i, g, function() {
              var w = t ? t + "." + g : "" + g, p = n(e[g], g, w);
              return (Tr(p) || Array.isArray(p)) && (p = Ht(p, n, w)), p;
            });
          }, u = 0; u < o; u++) s(u);
          return i;
        }
        if (Tr(e)) {
          var f = {}, d = function(g) {
            if (!e.hasOwnProperty(g)) return 1;
            Eo(f, g, function() {
              var w = t ? t + "." + g : "" + g, p = n(e[g], g, w);
              return (Tr(p) || Array.isArray(p)) && (p = Ht(p, n, w)), p;
            });
          };
          for (var v in e) d(v);
          return f;
        }
        throw new Error("Pass an object or array");
      }
      function _n(e) {
        return e != null;
      }
      function Rr(e) {
        return {}.toString.call(e) === "[object RegExp]";
      }
      function Pt(e, n, t) {
        if (e.hasOwnProperty(n)) return e[n];
        var o = t();
        return e[n] = o, o;
      }
      function Vt(e) {
        var n = [], t = !1, o, i = {
          set: function(s, u) {
            return t || (e[s] = u, i.register(function() {
              delete e[s];
            })), u;
          },
          register: function(s) {
            var u = Bt(function() {
              return s(o);
            });
            return t ? s(o) : n.push(u), {
              cancel: function() {
                var f = n.indexOf(u);
                f !== -1 && n.splice(f, 1);
              }
            };
          },
          all: function(s) {
            o = s;
            var u = [];
            for (t = !0; n.length; ) {
              var f = n.shift();
              u.push(f());
            }
            return S.all(u).then(pe);
          }
        };
        return i;
      }
      function Gt(e, n) {
        if (n == null) throw new Error("Expected " + e + " to be present");
        return n;
      }
      var Ca = function(e) {
        C(n, e);
        function n(t) {
          var o;
          return (o = e.call(this, t) || this).name = o.constructor.name, typeof Error.captureStackTrace == "function" ? Error.captureStackTrace(function(i) {
            if (i === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return i;
          }(o), o.constructor) : o.stack = new Error(t).stack, o;
        }
        return n;
      }(go(Error));
      function Po() {
        var e = document.body;
        if (!e) throw new Error("Body element not found");
        return e;
      }
      function Jt() {
        return !!document.body && document.readyState === "complete";
      }
      function Oo() {
        return !!document.body && document.readyState === "interactive";
      }
      function So(e) {
        return encodeURIComponent(e);
      }
      Wn(function() {
        return new S(function(e) {
          if (Jt() || Oo()) return e();
          var n = setInterval(function() {
            if (Jt() || Oo())
              return clearInterval(n), e();
          }, 10);
        });
      });
      function To(e) {
        return function(n, t, o) {
          o === void 0 && (o = []);
          var i = n.__inline_memoize_cache__ = n.__inline_memoize_cache__ || {}, s = Pr(o);
          return i.hasOwnProperty(s) ? i[s] : i[s] = (function() {
            var u = {};
            if (!e || e.indexOf("=") === -1) return u;
            for (var f = 0, d = e.split("&"); f < d.length; f++) {
              var v = d[f];
              (v = v.split("="))[0] && v[1] && (u[decodeURIComponent(v[0])] = decodeURIComponent(v[1]));
            }
            return u;
          }).apply(void 0, o);
        }(To, 0, [e]);
      }
      function Ro(e, n) {
        return n === void 0 && (n = {}), n && Object.keys(n).length ? function(t) {
          return t === void 0 && (t = {}), Object.keys(t).filter(function(o) {
            return typeof t[o] == "string" || typeof t[o] == "boolean";
          }).map(function(o) {
            var i = t[o];
            if (typeof i != "string" && typeof i != "boolean") throw new TypeError("Invalid type for query");
            return So(o) + "=" + So(i.toString());
          }).join("&");
        }(O({}, To(e), n)) : e;
      }
      function Na(e, n) {
        e.appendChild(n);
      }
      function Cr(e, n) {
        return n === void 0 && (n = document), gr(e) ? e : typeof e == "string" ? n.querySelector(e) : void 0;
      }
      function Co(e) {
        return new S(function(n, t) {
          var o = qt(e), i = Cr(e);
          if (i) return n(i);
          if (Jt()) return t(new Error("Document is ready and element " + o + " does not exist"));
          var s = setInterval(function() {
            if (i = Cr(e))
              n(i), clearInterval(s);
            else if (Jt())
              return clearInterval(s), t(new Error("Document is ready and element " + o + " does not exist"));
          }, 10);
        });
      }
      var Nr = function(e) {
        C(n, e);
        function n() {
          return e.apply(this, arguments) || this;
        }
        return n;
      }(Ca), Kt;
      function No(e) {
        if ((Kt = Kt || new Ut()).has(e)) {
          var n = Kt.get(e);
          if (n) return n;
        }
        var t = new S(function(o, i) {
          e.addEventListener("load", function() {
            (function(s) {
              if (function() {
                for (var u = 0; u < Gn.length; u++) {
                  var f = !1;
                  try {
                    f = Gn[u].closed;
                  } catch {
                  }
                  f && (st.splice(u, 1), Gn.splice(u, 1));
                }
              }(), s && s.contentWindow) try {
                Gn.push(s.contentWindow), st.push(s);
              } catch {
              }
            })(e), o(e);
          }), e.addEventListener("error", function(s) {
            e.contentWindow ? o(e) : i(s);
          });
        });
        return Kt.set(e, t), t;
      }
      function xr(e) {
        return No(e).then(function(n) {
          if (!n.contentWindow) throw new Error("Could not find window in iframe");
          return n.contentWindow;
        });
      }
      function xo(e, n) {
        e === void 0 && (e = {});
        var t = e.style || {}, o = function(s, u, f) {
          s === void 0 && (s = "div"), u === void 0 && (u = {}), s = s.toLowerCase();
          var d = document.createElement(s);
          if (u.style && ct(d.style, u.style), u.class && (d.className = u.class.join(" ")), u.id && d.setAttribute("id", u.id), u.attributes) for (var v = 0, g = Object.keys(u.attributes); v < g.length; v++) {
            var w = g[v];
            d.setAttribute(w, u.attributes[w]);
          }
          if (u.styleSheet && function(p, m, y) {
            y === void 0 && (y = window.document), p.styleSheet ? p.styleSheet.cssText = m : p.appendChild(y.createTextNode(m));
          }(d, u.styleSheet), u.html) {
            if (s === "iframe") throw new Error("Iframe html can not be written unless container provided and iframe in DOM");
            d.innerHTML = u.html;
          }
          return d;
        }("iframe", {
          attributes: O({
            allowTransparency: "true"
          }, e.attributes || {}),
          style: O({
            backgroundColor: "transparent",
            border: "none"
          }, t),
          html: e.html,
          class: e.class
        }), i = window.navigator.userAgent.match(/MSIE|Edge/i);
        return o.hasAttribute("id") || o.setAttribute("id", Ke()), No(o), (e.url || i) && o.setAttribute("src", e.url || "about:blank"), o;
      }
      function Io(e, n, t) {
        return e.addEventListener(n, t), {
          cancel: function() {
            e.removeEventListener(n, t);
          }
        };
      }
      function xa(e) {
        e.style.setProperty("display", "");
      }
      function Do(e) {
        e.style.setProperty("display", "none", "important");
      }
      function Ot(e) {
        e && e.parentNode && e.parentNode.removeChild(e);
      }
      function dt(e) {
        return !(e && e.parentNode && e.ownerDocument && e.ownerDocument.documentElement && e.ownerDocument.documentElement.contains(e));
      }
      function Wo(e, n, t) {
        var o = t === void 0 ? {} : t, i = o.width, s = i === void 0 || i, u = o.height, f = u === void 0 || u, d = o.interval, v = d === void 0 ? 100 : d, g = o.win, w = g === void 0 ? window : g, p = e.offsetWidth, m = e.offsetHeight, y = !1;
        n({
          width: p,
          height: m
        });
        var P = function() {
          if (!y && function(I) {
            return !!(I.offsetWidth || I.offsetHeight || I.getClientRects().length);
          }(e)) {
            var W = e.offsetWidth, q = e.offsetHeight;
            (s && W !== p || f && q !== m) && n({
              width: W,
              height: q
            }), p = W, m = q;
          }
        }, T, x;
        return w.addEventListener("resize", P), w.ResizeObserver !== void 0 ? ((T = new w.ResizeObserver(P)).observe(e), x = bt(P, 10 * v)) : w.MutationObserver !== void 0 ? ((T = new w.MutationObserver(P)).observe(e, {
          attributes: !0,
          childList: !0,
          subtree: !0,
          characterData: !1
        }), x = bt(P, 10 * v)) : x = bt(P, v), {
          cancel: function() {
            y = !0, T.disconnect(), window.removeEventListener("resize", P), x.cancel();
          }
        };
      }
      function Ir(e) {
        for (; e.parentNode; ) e = e.parentNode;
        return e.toString() === "[object ShadowRoot]";
      }
      var Yt = typeof document < "u" ? document.currentScript : null, Ia = Wn(function() {
        if (Yt || (Yt = function() {
          try {
            var e = function() {
              try {
                throw new Error("_");
              } catch (u) {
                return u.stack || "";
              }
            }(), n = /.*at [^(]*\((.*):(.+):(.+)\)$/gi.exec(e), t = n && n[1];
            if (!t) return;
            for (var o = 0, i = [].slice.call(document.getElementsByTagName("script")).reverse(); o < i.length; o++) {
              var s = i[o];
              if (s.src && s.src === t) return s;
            }
          } catch {
          }
        }())) return Yt;
        throw new Error("Can not determine current script");
      }), Da = Ke();
      Wn(function() {
        var e;
        try {
          e = Ia();
        } catch {
          return Da;
        }
        var n = e.getAttribute("data-uid");
        if (n && typeof n == "string" || (n = e.getAttribute("data-uid-auto")) && typeof n == "string") return n;
        if (e.src) {
          var t = function(o) {
            for (var i = "", s = 0; s < o.length; s++) {
              var u = o[s].charCodeAt(0) * s;
              o[s + 1] && (u += o[s + 1].charCodeAt(0) * (s - 1)), i += String.fromCharCode(97 + Math.abs(u) % 26);
            }
            return i;
          }(JSON.stringify({
            src: e.src,
            dataset: e.dataset
          }));
          n = "uid_" + t.slice(t.length - 30);
        } else n = Ke();
        return e.setAttribute("data-uid-auto", n), n;
      });
      function _o(e) {
        return typeof e == "string" && /^[0-9]+%$/.test(e);
      }
      function Dr(e) {
        if (typeof e == "number") return e;
        var n = e.match(/^([0-9]+)(px|%)$/);
        if (!n) throw new Error("Could not match css value from " + e);
        return parseInt(n[1], 10);
      }
      function Ao(e) {
        return Dr(e) + "px";
      }
      function Mo(e) {
        return typeof e == "number" ? Ao(e) : _o(e) ? e : Ao(e);
      }
      function zo(e, n) {
        if (typeof e == "number") return e;
        if (_o(e)) return parseInt(n * Dr(e) / 100, 10);
        if (typeof (t = e) == "string" && /^[0-9]+px$/.test(t)) return Dr(e);
        var t;
        throw new Error("Can not normalize dimension: " + e);
      }
      function gn(e) {
        e === void 0 && (e = window);
        var n = "__post_robot_11_0_0__";
        return e !== window ? e[n] : e[n] = e[n] || {};
      }
      var Fo = function() {
        return {};
      };
      function ue(e, n) {
        return e === void 0 && (e = "store"), n === void 0 && (n = Fo), Pt(gn(), e, function() {
          var t = n();
          return {
            has: function(o) {
              return t.hasOwnProperty(o);
            },
            get: function(o, i) {
              return t.hasOwnProperty(o) ? t[o] : i;
            },
            set: function(o, i) {
              return t[o] = i, i;
            },
            del: function(o) {
              delete t[o];
            },
            getOrSet: function(o, i) {
              return Pt(t, o, i);
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
      var Wa = function() {
      };
      function Zt() {
        var e = gn();
        return e.WINDOW_WILDCARD = e.WINDOW_WILDCARD || new Wa(), e.WINDOW_WILDCARD;
      }
      function Je(e, n) {
        return e === void 0 && (e = "store"), n === void 0 && (n = Fo), ue("windowStore").getOrSet(e, function() {
          var t = new Ut(), o = function(i) {
            return t.getOrSet(i, n);
          };
          return {
            has: function(i) {
              return o(i).hasOwnProperty(e);
            },
            get: function(i, s) {
              var u = o(i);
              return u.hasOwnProperty(e) ? u[e] : s;
            },
            set: function(i, s) {
              return o(i)[e] = s, s;
            },
            del: function(i) {
              delete o(i)[e];
            },
            getOrSet: function(i, s) {
              return Pt(o(i), e, s);
            }
          };
        });
      }
      function Lo() {
        return ue("instance").getOrSet("instanceID", Ke);
      }
      function jo(e, n) {
        var t = n.domain, o = Je("helloPromises"), i = o.get(e);
        i && i.resolve({
          domain: t
        });
        var s = S.resolve({
          domain: t
        });
        return o.set(e, s), s;
      }
      function Wr(e, n) {
        return (0, n.send)(e, "postrobot_hello", {
          instanceID: Lo()
        }, {
          domain: "*",
          timeout: -1
        }).then(function(t) {
          var o = t.origin, i = t.data.instanceID;
          return jo(e, {
            domain: o
          }), {
            win: e,
            domain: o,
            instanceID: i
          };
        });
      }
      function Uo(e, n) {
        var t = n.send;
        return Je("windowInstanceIDPromises").getOrSet(e, function() {
          return Wr(e, {
            send: t
          }).then(function(o) {
            return o.instanceID;
          });
        });
      }
      function $o(e, n, t) {
        n === void 0 && (n = 5e3), t === void 0 && (t = "Window");
        var o = function(i) {
          return Je("helloPromises").getOrSet(i, function() {
            return new S();
          });
        }(e);
        return n !== -1 && (o = o.timeout(n, new Error(t + " did not load after " + n + "ms"))), o;
      }
      function Bo(e) {
        Je("knownWindows").set(e, !0);
      }
      function _r(e) {
        return typeof e == "object" && e !== null && typeof e.__type__ == "string";
      }
      function qo(e) {
        return e === void 0 ? "undefined" : e === null ? "null" : Array.isArray(e) ? "array" : typeof e == "function" ? "function" : typeof e == "object" ? e instanceof Error ? "error" : typeof e.then == "function" ? "promise" : {}.toString.call(e) === "[object RegExp]" ? "regex" : {}.toString.call(e) === "[object Date]" ? "date" : "object" : typeof e == "string" ? "string" : typeof e == "number" ? "number" : typeof e == "boolean" ? "boolean" : void 0;
      }
      function Kn(e, n) {
        return {
          __type__: e,
          __val__: n
        };
      }
      var an, _a = ((an = {}).function = function() {
      }, an.error = function(e) {
        return Kn("error", {
          message: e.message,
          stack: e.stack,
          code: e.code,
          data: e.data
        });
      }, an.promise = function() {
      }, an.regex = function(e) {
        return Kn("regex", e.source);
      }, an.date = function(e) {
        return Kn("date", e.toJSON());
      }, an.array = function(e) {
        return e;
      }, an.object = function(e) {
        return e;
      }, an.string = function(e) {
        return e;
      }, an.number = function(e) {
        return e;
      }, an.boolean = function(e) {
        return e;
      }, an.null = function(e) {
        return e;
      }, an[void 0] = function(e) {
        return Kn("undefined", e);
      }, an), Aa = {}, sn, Ma = ((sn = {}).function = function() {
        throw new Error("Function serialization is not implemented; nothing to deserialize");
      }, sn.error = function(e) {
        var n = e.stack, t = e.code, o = e.data, i = new Error(e.message);
        return i.code = t, o && (i.data = o), i.stack = n + `

` + i.stack, i;
      }, sn.promise = function() {
        throw new Error("Promise serialization is not implemented; nothing to deserialize");
      }, sn.regex = function(e) {
        return new RegExp(e);
      }, sn.date = function(e) {
        return new Date(e);
      }, sn.array = function(e) {
        return e;
      }, sn.object = function(e) {
        return e;
      }, sn.string = function(e) {
        return e;
      }, sn.number = function(e) {
        return e;
      }, sn.boolean = function(e) {
        return e;
      }, sn.null = function(e) {
        return e;
      }, sn[void 0] = function() {
      }, sn), za = {};
      function Ar() {
        return !!fo(window).match(/MSIE|trident|edge\/12|edge\/13/i);
      }
      function Ho(e) {
        return !Lt(window, e);
      }
      function Vo(e, n) {
        if (e) {
          if (ee() !== Sn(e)) return !0;
        } else if (n && !ge(n)) return !0;
        return !1;
      }
      function Go(e) {
        var n = e.win, t = e.domain;
        return !(!Ar() || t && !Vo(t, n) || n && !Ho(n));
      }
      function Mr(e) {
        return "__postrobot_bridge___" + (e = e || Sn(e)).replace(/[^a-zA-Z0-9]+/g, "_");
      }
      function Jo() {
        return !!(window.name && window.name === Mr(ee()));
      }
      var Fa = new S(function(e) {
        if (window.document && window.document.body) return e(window.document.body);
        var n = setInterval(function() {
          if (window.document && window.document.body)
            return clearInterval(n), e(window.document.body);
        }, 10);
      });
      function Ko(e) {
        Je("remoteWindowPromises").getOrSet(e, function() {
          return new S();
        });
      }
      function zr(e) {
        var n = Je("remoteWindowPromises").get(e);
        if (!n) throw new Error("Remote window promise not found");
        return n;
      }
      function Yo(e, n, t) {
        zr(e).resolve(function(o, i, s) {
          if (o !== e) throw new Error("Remote window does not match window");
          if (!on(i, n)) throw new Error("Remote domain " + i + " does not match domain " + n);
          t.fireAndForget(s);
        });
      }
      function Fr(e, n) {
        zr(e).reject(n).catch(pe);
      }
      function Xt(e) {
        for (var n = e.win, t = e.name, o = e.domain, i = ue("popupWindowsByName"), s = Je("popupWindowsByWin"), u = 0, f = i.keys(); u < f.length; u++) {
          var d = f[u], v = i.get(d);
          v && !We(v.win) || i.del(d);
        }
        if (We(n)) return {
          win: n,
          name: t,
          domain: o
        };
        var g = s.getOrSet(n, function() {
          return t ? i.getOrSet(t, function() {
            return {
              win: n,
              name: t
            };
          }) : {
            win: n
          };
        });
        if (g.win && g.win !== n) throw new Error("Different window already linked for window: " + (t || "undefined"));
        return t && (g.name = t, i.set(t, g)), o && (g.domain = o, Ko(n)), s.set(n, g), g;
      }
      function Zo(e) {
        var n = e.on, t = e.send, o = e.receiveMessage;
        i = window.open, window.open = function(s, u, f, d) {
          var v = i.call(this, mr(s), u, f, d);
          return v && (Xt({
            win: v,
            name: u,
            domain: s ? Sn(s) : null
          }), v);
        };
        var i;
        (function(s) {
          var u = s.on, f = s.send, d = s.receiveMessage, v = ue("popupWindowsByName");
          u("postrobot_open_tunnel", function(g) {
            var w = g.source, p = g.origin, m = g.data, y = ue("bridges").get(p);
            if (!y) throw new Error("Can not find bridge promise for domain " + p);
            return y.then(function(P) {
              if (w !== P) throw new Error("Message source does not matched registered bridge for domain " + p);
              if (!m.name) throw new Error("Register window expected to be passed window name");
              if (!m.sendMessage) throw new Error("Register window expected to be passed sendMessage method");
              if (!v.has(m.name)) throw new Error("Window with name " + m.name + " does not exist, or was not opened by this window");
              var T = function() {
                return v.get(m.name);
              };
              if (!T().domain) throw new Error("We do not have a registered domain for window " + m.name);
              if (T().domain !== p) throw new Error("Message origin " + p + " does not matched registered window origin " + (T().domain || "unknown"));
              return Yo(T().win, p, m.sendMessage), {
                sendMessage: function(x) {
                  if (window && !window.closed && T()) {
                    var W = T().domain;
                    if (W) try {
                      d({
                        data: x,
                        origin: W,
                        source: T().win
                      }, {
                        on: u,
                        send: f
                      });
                    } catch (q) {
                      S.reject(q);
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
        }), function(s) {
          var u = s.send;
          gn(window).openTunnelToParent = function(f) {
            var d = f.name, v = f.source, g = f.canary, w = f.sendMessage, p = ue("tunnelWindows"), m = Pe(window);
            if (!m) throw new Error("No parent window found to open tunnel to");
            var y = function(P) {
              var T = P.name, x = P.source, W = P.canary, q = P.sendMessage;
              (function() {
                for (var j = ue("tunnelWindows"), _ = 0, Z = j.keys(); _ < Z.length; _++) {
                  var F = Z[_];
                  We(j[F].source) && j.del(F);
                }
              })();
              var I = Ke();
              return ue("tunnelWindows").set(I, {
                name: T,
                source: x,
                canary: W,
                sendMessage: q
              }), I;
            }({
              name: d,
              source: v,
              canary: g,
              sendMessage: w
            });
            return u(m, "postrobot_open_tunnel", {
              name: d,
              sendMessage: function() {
                var P = p.get(y);
                if (P && P.source && !We(P.source)) {
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
        }), function(s) {
          var u = s.on, f = s.send, d = s.receiveMessage;
          S.try(function() {
            var v = Oe(window);
            if (v && Go({
              win: v
            })) {
              return Ko(v), (g = v, Je("remoteBridgeAwaiters").getOrSet(g, function() {
                return S.try(function() {
                  var w = Ft(g, Mr(ee()));
                  if (w) return ge(w) && gn(rn(w)) ? w : new S(function(p) {
                    var m, y;
                    m = setInterval(function() {
                      if (w && ge(w) && gn(rn(w)))
                        return clearInterval(m), clearTimeout(y), p(w);
                    }, 100), y = setTimeout(function() {
                      return clearInterval(m), p();
                    }, 2e3);
                  });
                });
              })).then(function(w) {
                return w ? window.name ? gn(rn(w)).openTunnelToParent({
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
                      d({
                        data: p,
                        origin: this.origin,
                        source: this.source
                      }, {
                        on: u,
                        send: f
                      });
                    } catch (m) {
                      S.reject(m);
                    }
                  }
                }).then(function(p) {
                  var m = p.source, y = p.origin, P = p.data;
                  if (m !== v) throw new Error("Source does not match opener");
                  Yo(m, y, P.sendMessage);
                }).catch(function(p) {
                  throw Fr(v, p), p;
                }) : Fr(v, new Error("Can not register with opener: window does not have a name")) : Fr(v, new Error("Can not register with opener: no bridge found in opener"));
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
      function Lr() {
        for (var e = ue("idToProxyWindow"), n = 0, t = e.keys(); n < t.length; n++) {
          var o = t[n];
          e.get(o).shouldClean() && e.del(o);
        }
      }
      function Xo(e, n) {
        var t = n.send, o = n.id, i = o === void 0 ? Ke() : o, s = e.then(function(d) {
          if (ge(d)) return rn(d).name;
        }), u = e.then(function(d) {
          if (We(d)) throw new Error("Window is closed, can not determine type");
          return Oe(d) ? it.POPUP : it.IFRAME;
        });
        s.catch(pe), u.catch(pe);
        var f = function() {
          return e.then(function(d) {
            if (!We(d)) return ge(d) ? rn(d).name : s;
          });
        };
        return {
          id: i,
          getType: function() {
            return u;
          },
          getInstanceID: Ta(function() {
            return e.then(function(d) {
              return Uo(d, {
                send: t
              });
            });
          }),
          close: function() {
            return e.then(vo);
          },
          getName: f,
          focus: function() {
            return e.then(function(d) {
              d.focus();
            });
          },
          isClosed: function() {
            return e.then(function(d) {
              return We(d);
            });
          },
          setLocation: function(d, v) {
            return v === void 0 && (v = {}), e.then(function(g) {
              var w = window.location.protocol + "//" + window.location.host, p = v.method, m = p === void 0 ? "get" : p, y = v.body;
              if (d.indexOf("/") === 0) d = "" + w + d;
              else if (!d.match(/^https?:\/\//) && d.indexOf(w) !== 0) throw new Error("Expected url to be http or https url, or absolute path, got " + JSON.stringify(d));
              if (m === "post") return f().then(function(P) {
                if (!P) throw new Error("Can not post to window without target name");
                (function(T) {
                  var x = T.url, W = T.target, q = T.body, I = T.method, j = I === void 0 ? "post" : I, _ = document.createElement("form");
                  if (_.setAttribute("target", W), _.setAttribute("method", j), _.setAttribute("action", x), _.style.display = "none", q) for (var Z = 0, F = Object.keys(q); Z < F.length; Z++) {
                    var ie, ne = F[Z], G = document.createElement("input");
                    G.setAttribute("name", ne), G.setAttribute("value", (ie = q[ne]) == null ? void 0 : ie.toString()), _.appendChild(G);
                  }
                  Po().appendChild(_), _.submit(), Po().removeChild(_);
                })({
                  url: d,
                  target: P,
                  method: m,
                  body: y
                });
              });
              if (m !== "get") throw new Error("Unsupported method: " + m);
              if (ge(g)) try {
                if (g.location && typeof g.location.replace == "function") {
                  g.location.replace(d);
                  return;
                }
              } catch {
              }
              g.location = d;
            });
          },
          setName: function(d) {
            return e.then(function(v) {
              Xt({
                win: v,
                name: d
              });
              var g = ge(v), w = po(v);
              if (!g) throw new Error("Can not set name for cross-domain window: " + d);
              rn(v).name = d, w && w.setAttribute("name", d), s = S.resolve(d);
            });
          }
        };
      }
      var un = function() {
        function e(t) {
          var o = t.send, i = t.win, s = t.serializedWindow;
          this.id = void 0, this.isProxyWindow = !0, this.serializedWindow = void 0, this.actualWindow = void 0, this.actualWindowPromise = void 0, this.send = void 0, this.name = void 0, this.actualWindowPromise = new S(), this.serializedWindow = s || Xo(this.actualWindowPromise, {
            send: o
          }), ue("idToProxyWindow").set(this.getID(), this), i && this.setWindow(i, {
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
            return t === it.POPUP;
          });
        }, n.setLocation = function(t, o) {
          var i = this;
          return this.serializedWindow.setLocation(t, o).then(function() {
            return i;
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
          var t = this, o = this.isPopup(), i = this.getName(), s = S.hash({
            isPopup: o,
            name: i
          }).then(function(f) {
            var d = f.name;
            f.isPopup && d && window.open("", d, "noopener");
          }), u = this.serializedWindow.focus();
          return S.all([s, u]).then(function() {
            return t;
          });
        }, n.isClosed = function() {
          return this.serializedWindow.isClosed();
        }, n.getWindow = function() {
          return this.actualWindow;
        }, n.setWindow = function(t, o) {
          var i = o.send;
          this.actualWindow = t, this.actualWindowPromise.resolve(this.actualWindow), this.serializedWindow = Xo(this.actualWindowPromise, {
            send: i,
            id: this.getID()
          }), Je("winToProxyWindow").set(t, this);
        }, n.awaitWindow = function() {
          return this.actualWindowPromise;
        }, n.matchWindow = function(t, o) {
          var i = this, s = o.send;
          return S.try(function() {
            return i.actualWindow ? t === i.actualWindow : S.hash({
              proxyInstanceID: i.getInstanceID(),
              knownWindowInstanceID: Uo(t, {
                send: s
              })
            }).then(function(u) {
              var f = u.proxyInstanceID === u.knownWindowInstanceID;
              return f && i.setWindow(t, {
                send: s
              }), f;
            });
          });
        }, n.unwrap = function() {
          return this.actualWindow || this;
        }, n.getInstanceID = function() {
          return this.serializedWindow.getInstanceID();
        }, n.shouldClean = function() {
          return !!(this.actualWindow && We(this.actualWindow));
        }, n.serialize = function() {
          return this.serializedWindow;
        }, e.unwrap = function(t) {
          return e.isProxyWindow(t) ? t.unwrap() : t;
        }, e.serialize = function(t, o) {
          var i = o.send;
          return Lr(), e.toProxyWindow(t, {
            send: i
          }).serialize();
        }, e.deserialize = function(t, o) {
          var i = o.send;
          return Lr(), ue("idToProxyWindow").get(t.id) || new e({
            serializedWindow: t,
            send: i
          });
        }, e.isProxyWindow = function(t) {
          return !!(t && !Jn(t) && t.isProxyWindow);
        }, e.toProxyWindow = function(t, o) {
          var i = o.send;
          if (Lr(), e.isProxyWindow(t)) return t;
          var s = t;
          return Je("winToProxyWindow").get(s) || new e({
            win: s,
            send: i
          });
        }, e;
      }();
      function jr(e, n, t, o, i) {
        var s = Je("methodStore"), u = ue("proxyWindowMethods");
        un.isProxyWindow(o) ? u.set(e, {
          val: n,
          name: t,
          domain: i,
          source: o
        }) : (u.del(e), s.getOrSet(o, function() {
          return {};
        })[e] = {
          domain: i,
          name: t,
          val: n,
          source: o
        });
      }
      function Qo(e, n) {
        var t = Je("methodStore"), o = ue("proxyWindowMethods");
        return t.getOrSet(e, function() {
          return {};
        })[n] || o.get(n);
      }
      function ko(e, n, t, o, i) {
        u = (s = {
          on: i.on,
          send: i.send
        }).on, f = s.send, ue("builtinListeners").getOrSet("functionCalls", function() {
          return u("postrobot_method", {
            domain: "*"
          }, function(g) {
            var w = g.source, p = g.origin, m = g.data, y = m.id, P = m.name, T = Qo(w, y);
            if (!T) throw new Error("Could not find method '" + P + "' with id: " + m.id + " in " + ee(window));
            var x = T.source, W = T.domain, q = T.val;
            return S.try(function() {
              if (!on(W, p)) throw new Error("Method '" + m.name + "' domain " + JSON.stringify(Rr(T.domain) ? T.domain.source : T.domain) + " does not match origin " + p + " in " + ee(window));
              if (un.isProxyWindow(x)) return x.matchWindow(w, {
                send: f
              }).then(function(I) {
                if (!I) throw new Error("Method call '" + m.name + "' failed - proxy window does not match source in " + ee(window));
              });
            }).then(function() {
              return q.apply({
                source: w,
                origin: p
              }, m.args);
            }, function(I) {
              return S.try(function() {
                if (q.onError) return q.onError(I);
              }).then(function() {
                throw I.stack && (I.stack = "Remote call to " + P + "(" + function(j) {
                  return j === void 0 && (j = []), Sr(j).map(function(_) {
                    return typeof _ == "string" ? "'" + _ + "'" : _ === void 0 ? "undefined" : _ === null ? "null" : typeof _ == "boolean" ? _.toString() : Array.isArray(_) ? "[ ... ]" : typeof _ == "object" ? "{ ... }" : typeof _ == "function" ? "() => { ... }" : "<" + typeof _ + ">";
                  }).join(", ");
                }(m.args) + `) failed

` + I.stack), I;
              });
            }).then(function(I) {
              return {
                result: I,
                id: y,
                name: P
              };
            });
          });
        });
        var s, u, f, d = t.__id__ || Ke();
        e = un.unwrap(e);
        var v = t.__name__ || t.name || o;
        return typeof v == "string" && typeof v.indexOf == "function" && v.indexOf("anonymous::") === 0 && (v = v.replace("anonymous::", o + "::")), un.isProxyWindow(e) ? (jr(d, t, v, e, n), e.awaitWindow().then(function(g) {
          jr(d, t, v, g, n);
        })) : jr(d, t, v, e, n), Kn("cross_domain_function", {
          id: d,
          name: v
        });
      }
      function ei(e, n, t, o) {
        var i, s = o.on, u = o.send;
        return function(f, d) {
          d === void 0 && (d = Aa);
          var v = JSON.stringify(f, function(g) {
            var w = this[g];
            if (_r(this)) return w;
            var p = qo(w);
            if (!p) return w;
            var m = d[p] || _a[p];
            return m ? m(w, g) : w;
          });
          return v === void 0 ? "undefined" : v;
        }(t, ((i = {}).promise = function(f, d) {
          return function(v, g, w, p, m) {
            return Kn("cross_domain_zalgo_promise", {
              then: ko(v, g, function(y, P) {
                return w.then(y, P);
              }, p, {
                on: m.on,
                send: m.send
              })
            });
          }(e, n, f, d, {
            on: s,
            send: u
          });
        }, i.function = function(f, d) {
          return ko(e, n, f, d, {
            on: s,
            send: u
          });
        }, i.object = function(f) {
          return Jn(f) || un.isProxyWindow(f) ? Kn("cross_domain_window", un.serialize(f, {
            send: u
          })) : f;
        }, i));
      }
      function ni(e, n, t, o) {
        var i, s = o.send;
        return function(u, f) {
          if (f === void 0 && (f = za), u !== "undefined") return JSON.parse(u, function(d, v) {
            if (_r(this)) return v;
            var g, w;
            if (_r(v) ? (g = v.__type__, w = v.__val__) : (g = qo(v), w = v), !g) return w;
            var p = f[g] || Ma[g];
            return p ? p(w, d) : w;
          });
        }(t, ((i = {}).cross_domain_zalgo_promise = function(u) {
          return function(f, d, v) {
            return new S(v.then);
          }(0, 0, u);
        }, i.cross_domain_function = function(u) {
          return function(f, d, v, g) {
            var w = v.id, p = v.name, m = g.send, y = function(T) {
              T === void 0 && (T = {});
              function x() {
                var W = arguments;
                return un.toProxyWindow(f, {
                  send: m
                }).awaitWindow().then(function(q) {
                  var I = Qo(q, w);
                  if (I && I.val !== x) return I.val.apply({
                    source: window,
                    origin: ee()
                  }, W);
                  var j = [].slice.call(W);
                  return T.fireAndForget ? m(q, "postrobot_method", {
                    id: w,
                    name: p,
                    args: j
                  }, {
                    domain: d,
                    fireAndForget: !0
                  }) : m(q, "postrobot_method", {
                    id: w,
                    name: p,
                    args: j
                  }, {
                    domain: d,
                    fireAndForget: !1
                  }).then(function(_) {
                    return _.data.result;
                  });
                }).catch(function(q) {
                  throw q;
                });
              }
              return x.__name__ = p, x.__origin__ = d, x.__source__ = f, x.__id__ = w, x.origin = d, x;
            }, P = y();
            return P.fireAndForget = y({
              fireAndForget: !0
            }), P;
          }(e, n, u, {
            send: s
          });
        }, i.cross_domain_window = function(u) {
          return un.deserialize(u, {
            send: s
          });
        }, i));
      }
      var St = {};
      St.postrobot_post_message = function(e, n, t) {
        t.indexOf("file:") === 0 && (t = "*"), e.postMessage(n, t);
      }, St.postrobot_bridge = function(e, n, t) {
        if (!Ar() && !Jo()) throw new Error("Bridge not needed for browser");
        if (ge(e)) throw new Error("Post message through bridge disabled between same domain windows");
        if (Lt(window, e) !== !1) throw new Error("Can only use bridge to communicate between two different windows, not between frames");
        (function(o, i, s) {
          var u = lo(window, o), f = lo(o, window);
          if (!u && !f) throw new Error("Can only send messages to and from parent and popup windows");
          zr(o).then(function(d) {
            return d(o, i, s);
          });
        })(e, t, n);
      }, St.postrobot_global = function(e, n) {
        if (!fo(window).match(/MSIE|rv:11|trident|edge\/12|edge\/13/i)) throw new Error("Global messaging not needed for browser");
        if (!ge(e)) throw new Error("Post message through global disabled between different domain windows");
        if (Lt(window, e) !== !1) throw new Error("Can only use global to communicate between two different windows, not between frames");
        var t = gn(e);
        if (!t) throw new Error("Can not find postRobot global on foreign window");
        t.receiveMessage({
          source: window,
          origin: ee(),
          data: n
        });
      };
      function Ur(e, n, t, o) {
        var i = o.on, s = o.send;
        return S.try(function() {
          var u = Je().getOrSet(e, function() {
            return {};
          });
          return u.buffer = u.buffer || [], u.buffer.push(t), u.flush = u.flush || S.flush().then(function() {
            if (We(e)) throw new Error("Window is closed");
            var f = ei(e, n, ((d = {}).__post_robot_11_0_0__ = u.buffer || [], d), {
              on: i,
              send: s
            }), d;
            delete u.buffer;
            for (var v = Object.keys(St), g = [], w = 0; w < v.length; w++) {
              var p = v[w];
              try {
                St[p](e, f, n);
              } catch (m) {
                g.push(m);
              }
            }
            if (g.length === v.length) throw new Error(`All post-robot messaging strategies failed:

` + g.map(function(m, y) {
              return y + ". " + ut(m);
            }).join(`

`));
          }), u.flush.then(function() {
            delete u.flush;
          });
        }).then(pe);
      }
      function ti(e) {
        return ue("responseListeners").get(e);
      }
      function ri(e) {
        ue("responseListeners").del(e);
      }
      function oi(e) {
        return ue("erroredResponseListeners").has(e);
      }
      function ii(e) {
        var n = e.name, t = e.win, o = e.domain, i = Je("requestListeners");
        if (t === "*" && (t = null), o === "*" && (o = null), !n) throw new Error("Name required to get request listener");
        for (var s = 0, u = [t, Zt()]; s < u.length; s++) {
          var f = u[s];
          if (f) {
            var d = i.get(f);
            if (d) {
              var v = d[n];
              if (v) {
                if (o && typeof o == "string") {
                  if (v[o]) return v[o];
                  if (v.__domain_regex__) for (var g = 0, w = v.__domain_regex__; g < w.length; g++) {
                    var p = w[g], m = p.listener;
                    if (on(p.regex, o)) return m;
                  }
                }
                if (v["*"]) return v["*"];
              }
            }
          }
        }
      }
      function $r(e, n) {
        var t = n.on, o = n.send, i = ue("receivedMessages");
        try {
          if (!window || window.closed || !e.source) return;
        } catch {
          return;
        }
        var s = e.source, u = e.origin, f = function(w, p, m, y) {
          var P = y.on, T = y.send, x;
          try {
            x = ni(p, m, w, {
              on: P,
              send: T
            });
          } catch {
            return;
          }
          if (x && typeof x == "object" && x !== null) {
            var W = x.__post_robot_11_0_0__;
            if (Array.isArray(W)) return W;
          }
        }(e.data, s, u, {
          on: t,
          send: o
        });
        if (f) {
          Bo(s);
          for (var d, v = function() {
            var w = f[g];
            if (i.has(w.id)) return {
              v: void 0
            };
            if (i.set(w.id, !0), We(s) && !w.fireAndForget) return {
              v: void 0
            };
            w.origin.indexOf("file:") === 0 && (u = "file://");
            try {
              w.type === "postrobot_message_request" ? function(p, m, y, P) {
                var T = P.on, x = P.send, W = ii({
                  name: y.name,
                  win: p,
                  domain: m
                }), q = y.name === "postrobot_method" && y.data && typeof y.data.name == "string" ? y.data.name + "()" : y.name;
                function I(j, _, Z) {
                  return S.flush().then(function() {
                    if (!y.fireAndForget && !We(p)) try {
                      return Ur(p, m, {
                        id: Ke(),
                        origin: ee(window),
                        type: "postrobot_message_response",
                        hash: y.hash,
                        name: y.name,
                        ack: j,
                        data: _,
                        error: Z
                      }, {
                        on: T,
                        send: x
                      });
                    } catch (F) {
                      throw new Error("Send response message failed for " + q + " in " + ee() + `

` + ut(F));
                    }
                  });
                }
                S.all([S.flush().then(function() {
                  if (!y.fireAndForget && !We(p)) try {
                    return Ur(p, m, {
                      id: Ke(),
                      origin: ee(window),
                      type: "postrobot_message_ack",
                      hash: y.hash,
                      name: y.name
                    }, {
                      on: T,
                      send: x
                    });
                  } catch (j) {
                    throw new Error("Send ack message failed for " + q + " in " + ee() + `

` + ut(j));
                  }
                }), S.try(function() {
                  if (!W) throw new Error("No handler found for post message: " + y.name + " from " + m + " in " + window.location.protocol + "//" + window.location.host + window.location.pathname);
                  return W.handler({
                    source: p,
                    origin: m,
                    data: y.data
                  });
                }).then(function(j) {
                  return I("success", j);
                }, function(j) {
                  return I("error", null, j);
                })]).then(pe).catch(function(j) {
                  if (W && W.handleError) return W.handleError(j);
                  throw j;
                });
              }(s, u, w, {
                on: t,
                send: o
              }) : w.type === "postrobot_message_response" ? function(p, m, y) {
                if (!oi(y.hash)) {
                  var P = ti(y.hash);
                  if (!P) throw new Error("No handler found for post message response for message: " + y.name + " from " + m + " in " + window.location.protocol + "//" + window.location.host + window.location.pathname);
                  if (!on(P.domain, m)) throw new Error("Response origin " + m + " does not match domain " + (T = P.domain, Array.isArray(T) ? "(" + T.join(" | ") + ")" : Vn(T) ? "RegExp(" + T.toString() + ")" : T.toString()));
                  var T;
                  if (p !== P.win) throw new Error("Response source does not match registered window");
                  ri(y.hash), y.ack === "error" ? P.promise.reject(y.error) : y.ack === "success" && P.promise.resolve({
                    source: p,
                    origin: m,
                    data: y.data
                  });
                }
              }(s, u, w) : w.type === "postrobot_message_ack" && function(p, m, y) {
                if (!oi(y.hash)) {
                  var P = ti(y.hash);
                  if (!P) throw new Error("No handler found for post message ack for message: " + y.name + " from " + m + " in " + window.location.protocol + "//" + window.location.host + window.location.pathname);
                  try {
                    if (!on(P.domain, m)) throw new Error("Ack origin " + m + " does not match domain " + P.domain.toString());
                    if (p !== P.win) throw new Error("Ack source does not match registered window");
                  } catch (T) {
                    P.promise.reject(T);
                  }
                  P.ack = !0;
                }
              }(s, u, w);
            } catch (p) {
              setTimeout(function() {
                throw p;
              }, 0);
            }
          }, g = 0; g < f.length; g++) if (d = v()) return d.v;
        }
      }
      function Tn(e, n, t) {
        if (!e) throw new Error("Expected name");
        if (typeof (n = n || {}) == "function" && (t = n, n = {}), !t) throw new Error("Expected handler");
        var o = function i(s, u) {
          var f = s.name, d = s.win, v = s.domain, g = Je("requestListeners");
          if (!f || typeof f != "string") throw new Error("Name required to add request listener");
          if (d && d !== "*" && un.isProxyWindow(d)) {
            var w = d.awaitWindow().then(function(ie) {
              return i({
                name: f,
                win: ie,
                domain: v
              }, u);
            });
            return {
              cancel: function() {
                w.then(function(ie) {
                  return ie.cancel();
                }, pe);
              }
            };
          }
          var p = d;
          if (Array.isArray(p)) {
            for (var m = [], y = 0, P = p; y < P.length; y++) m.push(i({
              name: f,
              domain: v,
              win: P[y]
            }, u));
            return {
              cancel: function() {
                for (var ie = 0; ie < m.length; ie++) m[ie].cancel();
              }
            };
          }
          if (Array.isArray(v)) {
            for (var T = [], x = 0, W = v; x < W.length; x++) T.push(i({
              name: f,
              win: p,
              domain: W[x]
            }, u));
            return {
              cancel: function() {
                for (var ie = 0; ie < T.length; ie++) T[ie].cancel();
              }
            };
          }
          var q = ii({
            name: f,
            win: p,
            domain: v
          });
          p && p !== "*" || (p = Zt());
          var I = (v = v || "*").toString();
          if (q) throw p && v ? new Error("Request listener already exists for " + f + " on domain " + v.toString() + " for " + (p === Zt() ? "wildcard" : "specified") + " window") : p ? new Error("Request listener already exists for " + f + " for " + (p === Zt() ? "wildcard" : "specified") + " window") : v ? new Error("Request listener already exists for " + f + " on domain " + v.toString()) : new Error("Request listener already exists for " + f);
          var j = g.getOrSet(p, function() {
            return {};
          }), _ = Pt(j, f, function() {
            return {};
          }), Z, F;
          return Rr(v) ? (Z = Pt(_, "__domain_regex__", function() {
            return [];
          })).push(F = {
            regex: v,
            listener: u
          }) : _[I] = u, {
            cancel: function() {
              delete _[I], F && (Z.splice(Z.indexOf(F, 1)), Z.length || delete _.__domain_regex__), Object.keys(_).length || delete j[f], p && !Object.keys(j).length && g.del(p);
            }
          };
        }({
          name: e,
          win: n.window,
          domain: n.domain || "*"
        }, {
          handler: t || n.handler,
          handleError: n.errorHandler || function(i) {
            throw i;
          }
        });
        return {
          cancel: function() {
            o.cancel();
          }
        };
      }
      var vn = function e(n, t, o, i) {
        var s = (i = i || {}).domain || "*", u = i.timeout || -1, f = i.timeout || 5e3, d = i.fireAndForget || !1;
        return un.toProxyWindow(n, {
          send: e
        }).awaitWindow().then(function(v) {
          return S.try(function() {
            if (function(g, w, p) {
              if (!g) throw new Error("Expected name");
              if (p && typeof p != "string" && !Array.isArray(p) && !Rr(p)) throw new TypeError("Can not send " + g + ". Expected domain " + JSON.stringify(p) + " to be a string, array, or regex");
              if (We(w)) throw new Error("Can not send " + g + ". Target window is closed");
            }(t, v, s), function(g, w) {
              var p = yt(w);
              if (p) return p === g;
              if (w === g || On(w) === w) return !1;
              for (var m = 0, y = In(g); m < y.length; m++) if (y[m] === w) return !0;
              return !1;
            }(window, v)) return $o(v, f);
          }).then(function(g) {
            return function(w, p, m, y) {
              var P = y.send;
              return S.try(function() {
                return typeof p == "string" ? p : S.try(function() {
                  return m || Wr(w, {
                    send: P
                  }).then(function(T) {
                    return T.domain;
                  });
                }).then(function(T) {
                  if (!on(p, p)) throw new Error("Domain " + qt(p) + " does not match " + qt(p));
                  return T;
                });
              });
            }(v, s, (g === void 0 ? {} : g).domain, {
              send: e
            });
          }).then(function(g) {
            var w = g, p = t === "postrobot_method" && o && typeof o.name == "string" ? o.name + "()" : t, m = new S(), y = t + "_" + Ke();
            if (!d) {
              var P = {
                name: t,
                win: v,
                domain: w,
                promise: m
              };
              (function(_, Z) {
                ue("responseListeners").set(_, Z);
              })(y, P);
              var T = Je("requestPromises").getOrSet(v, function() {
                return [];
              });
              T.push(m), m.catch(function() {
                (function(_) {
                  ue("erroredResponseListeners").set(_, !0);
                })(y), ri(y);
              });
              var x = function(_) {
                return Je("knownWindows").get(_, !1);
              }(v) ? 1e4 : 2e3, W = u, q = x, I = W, j = bt(function() {
                return We(v) ? m.reject(new Error("Window closed for " + t + " before " + (P.ack ? "response" : "ack"))) : P.cancelled ? m.reject(new Error("Response listener was cancelled for " + t)) : (q = Math.max(q - 500, 0), I !== -1 && (I = Math.max(I - 500, 0)), P.ack || q !== 0 ? I === 0 ? m.reject(new Error("No response for postMessage " + p + " in " + ee() + " in " + W + "ms")) : void 0 : m.reject(new Error("No ack for postMessage " + p + " in " + ee() + " in " + x + "ms")));
              }, 500);
              m.finally(function() {
                j.cancel(), T.splice(T.indexOf(m, 1));
              }).catch(pe);
            }
            return Ur(v, w, {
              id: Ke(),
              origin: ee(window),
              type: "postrobot_message_request",
              hash: y,
              name: t,
              data: o,
              fireAndForget: d
            }, {
              on: Tn,
              send: e
            }).then(function() {
              return d ? m.resolve() : m;
            }, function(_) {
              throw new Error("Send request message failed for " + p + " in " + ee() + `

` + ut(_));
            });
          });
        });
      };
      function Tt(e) {
        return un.toProxyWindow(e, {
          send: vn
        });
      }
      function ai(e) {
        for (var n = 0, t = Je("requestPromises").get(e, []); n < t.length; n++) t[n].reject(new Error("Window " + (We(e) ? "closed" : "cleaned up") + " before response")).catch(pe);
      }
      var An;
      An = {
        setupBridge: Zo,
        openBridge: function(e, n) {
          var t = ue("bridges"), o = ue("bridgeFrames");
          return n = n || Sn(e), t.getOrSet(n, function() {
            return S.try(function() {
              if (ee() === n) throw new Error("Can not open bridge on the same domain as current domain: " + n);
              var i = Mr(n);
              if (Ft(window, i)) throw new Error("Frame with name " + i + " already exists on page");
              var s = function(u, f) {
                var d = document.createElement("iframe");
                return d.setAttribute("name", u), d.setAttribute("id", u), d.setAttribute("style", "display: none; margin: 0; padding: 0; border: 0px none; overflow: hidden;"), d.setAttribute("frameborder", "0"), d.setAttribute("border", "0"), d.setAttribute("scrolling", "no"), d.setAttribute("allowTransparency", "true"), d.setAttribute("tabindex", "-1"), d.setAttribute("hidden", "true"), d.setAttribute("title", ""), d.setAttribute("role", "presentation"), d.src = f, d;
              }(i, e);
              return o.set(n, s), Fa.then(function(u) {
                u.appendChild(s);
                var f = s.contentWindow;
                return new S(function(d, v) {
                  s.addEventListener("load", d), s.addEventListener("error", v);
                }).then(function() {
                  return $o(f, 5e3, "Bridge " + e);
                }).then(function() {
                  return f;
                });
              });
            });
          });
        },
        linkWindow: Xt,
        linkUrl: function(e, n) {
          Xt({
            win: e,
            domain: Sn(n)
          });
        },
        isBridge: Jo,
        needsBridge: Go,
        needsBridgeForBrowser: Ar,
        hasBridge: function(e, n) {
          return ue("bridges").has(n || Sn(e));
        },
        needsBridgeForWin: Ho,
        needsBridgeForDomain: Vo,
        destroyBridges: function() {
          for (var e = ue("bridges"), n = ue("bridgeFrames"), t = 0, o = n.keys(); t < o.length; t++) {
            var i = n.get(o[t]);
            i && i.parentNode && i.parentNode.removeChild(i);
          }
          n.reset(), e.reset();
        }
      };
      function Rt(e) {
        if (!ge(e)) throw new Error("Can not get global for window on different domain");
        return e.__zoid_10_3_3__ || (e.__zoid_10_3_3__ = {}), e.__zoid_10_3_3__;
      }
      function si(e, n) {
        try {
          return n(Rt(e));
        } catch {
        }
      }
      function Qt(e) {
        return {
          get: function() {
            var n = this;
            return S.try(function() {
              if (n.source && n.source !== window) throw new Error("Can not call get on proxy object from a remote window");
              return e;
            });
          }
        };
      }
      function La(e) {
        return br(JSON.stringify(e));
      }
      function Br(e) {
        var n = Rt(e);
        return n.references = n.references || {}, n.references;
      }
      function ui(e) {
        var n = e.data, t = e.metaData, o = e.sender, i = e.receiver, s = e.passByReference, u = s !== void 0 && s, f = e.basic, d = f !== void 0 && f, v = Tt(i.win), g = d ? JSON.stringify(n) : ei(v, i.domain, n, {
          on: Tn,
          send: vn
        }), w = u ? function(p) {
          var m = Ke();
          return Br(window)[m] = p, {
            type: "uid",
            uid: m
          };
        }(g) : {
          type: "raw",
          val: g
        };
        return {
          serializedData: La({
            sender: {
              domain: o.domain
            },
            metaData: t,
            reference: w
          }),
          cleanReference: function() {
            p = window, (m = w).type === "uid" && delete Br(p)[m.uid];
            var p, m;
          }
        };
      }
      function ci(e) {
        var n = e.sender, t = e.basic, o = t !== void 0 && t, i = function(g) {
          return JSON.parse(function(w) {
            if (typeof atob == "function") return decodeURIComponent([].map.call(atob(w), function(p) {
              return "%" + ("00" + p.charCodeAt(0).toString(16)).slice(-2);
            }).join(""));
            if (typeof Buffer < "u") return Buffer.from(w, "base64").toString("utf8");
            throw new Error("Can not find window.atob or Buffer");
          }(g));
        }(e.data), s = i.reference, u = i.metaData, f;
        f = typeof n.win == "function" ? n.win({
          metaData: u
        }) : n.win;
        var d;
        d = typeof n.domain == "function" ? n.domain({
          metaData: u
        }) : typeof n.domain == "string" ? n.domain : i.sender.domain;
        var v = function(g, w) {
          if (w.type === "raw") return w.val;
          if (w.type === "uid") return Br(g)[w.uid];
          throw new Error("Unsupported ref type: " + w.type);
        }(f, s);
        return {
          data: o ? JSON.parse(v) : function(g, w, p) {
            return ni(g, w, p, {
              on: Tn,
              send: vn
            });
          }(f, d, v),
          metaData: u,
          sender: {
            win: f,
            domain: d
          },
          reference: s
        };
      }
      var de = {
        STRING: "string",
        OBJECT: "object",
        FUNCTION: "function",
        BOOLEAN: "boolean",
        NUMBER: "number",
        ARRAY: "array"
      }, kt = {
        JSON: "json",
        DOTIFY: "dotify",
        BASE64: "base64"
      }, Ee = it, ve = {
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
      function di(e) {
        return "__zoid__" + e.name + "__" + e.serializedPayload + "__";
      }
      function qr(e) {
        if (!e) throw new Error("No window name");
        var n = e.split("__"), t = n[1], o = n[2], i = n[3];
        if (t !== "zoid") throw new Error("Window not rendered by zoid - got " + t);
        if (!o) throw new Error("Expected component name");
        if (!i) throw new Error("Expected serialized payload ref");
        return {
          name: o,
          serializedInitialPayload: i
        };
      }
      var ja = Wn(function(e) {
        var n = ci({
          data: qr(e).serializedInitialPayload,
          sender: {
            win: function(t) {
              return function(o) {
                if (o.type === "opener") return Gt("opener", Oe(window));
                if (o.type === "parent" && typeof o.distance == "number") return Gt("parent", function(w, p) {
                  return p === void 0 && (p = 1), function(m, y) {
                    y === void 0 && (y = 1);
                    for (var P = m, T = 0; T < y; T++) {
                      if (!P) return;
                      P = Pe(P);
                    }
                    return P;
                  }(w, wr(w) - p);
                }(window, o.distance));
                if (o.type === "global" && o.uid && typeof o.uid == "string") {
                  var i = o.uid, s = yt(window);
                  if (!s) throw new Error("Can not find ancestor window");
                  for (var u = 0, f = Dn(s); u < f.length; u++) {
                    var d = f[u];
                    if (ge(d)) {
                      var v = si(d, function(w) {
                        return w.windows && w.windows[i];
                      });
                      if (v) return v;
                    }
                  }
                } else if (o.type === "name") {
                  var g = o.name;
                  return Gt("namedWindow", function(w, p) {
                    return Ft(w, p) || function m(y, P) {
                      var T = Ft(y, P);
                      if (T) return T;
                      for (var x = 0, W = In(y); x < W.length; x++) {
                        var q = m(W[x], P);
                        if (q) return q;
                      }
                    }(On(w) || w, p);
                  }(Gt("ancestor", yt(window)), g));
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
      function fi() {
        return ja(window.name);
      }
      function Ua(e, n) {
        if (n === void 0 && (n = window), e === Pe(n)) return {
          type: "parent",
          distance: wr(e)
        };
        if (e === Oe(n)) return {
          type: "opener"
        };
        if (ge(e) && (o = e, o !== On(o))) {
          var t = rn(e).name;
          if (t) return {
            type: "name",
            name: t
          };
        }
        var o;
      }
      function li(e, n, t, o, i) {
        if (!e.hasOwnProperty(t)) return o;
        var s = e[t];
        return typeof s.childDecorate == "function" ? s.childDecorate({
          value: o,
          uid: i.uid,
          tag: i.tag,
          close: i.close,
          focus: i.focus,
          onError: i.onError,
          onProps: i.onProps,
          resize: i.resize,
          getParent: i.getParent,
          getParentDomain: i.getParentDomain,
          show: i.show,
          hide: i.hide,
          export: i.export,
          getSiblings: i.getSiblings
        }) : o;
      }
      function $a() {
        return S.try(function() {
          window.focus();
        });
      }
      function hi() {
        return S.try(function() {
          window.close();
        });
      }
      var Rn = function() {
        return pe;
      }, Yn = function(e) {
        return Bt(e.value);
      };
      function Hr(e, n, t) {
        for (var o = 0, i = Object.keys(O({}, e, n)); o < i.length; o++) {
          var s = i[o];
          t(s, n[s], e[s]);
        }
      }
      function pi(e, n, t) {
        var o = {};
        return S.all(function(i, s, u) {
          var f = [];
          return Hr(i, s, function(d, v, g) {
            var w = function(p, m, y) {
              return S.resolve().then(function() {
                var P, T;
                if (y != null && m) {
                  var x = (P = {}, P.get = m.queryParam, P.post = m.bodyParam, P)[t], W = (T = {}, T.get = m.queryValue, T.post = m.bodyValue, T)[t];
                  if (x) return S.hash({
                    finalParam: S.try(function() {
                      return typeof x == "function" ? x({
                        value: y
                      }) : typeof x == "string" ? x : p;
                    }),
                    finalValue: S.try(function() {
                      return typeof W == "function" && _n(y) ? W({
                        value: y
                      }) : y;
                    })
                  }).then(function(q) {
                    var I = q.finalParam, j = q.finalValue, _;
                    if (typeof j == "boolean") _ = j.toString();
                    else if (typeof j == "string") _ = j.toString();
                    else if (typeof j == "object" && j !== null) {
                      if (m.serialization === kt.JSON) _ = JSON.stringify(j);
                      else if (m.serialization === kt.BASE64) _ = br(JSON.stringify(j));
                      else if (m.serialization === kt.DOTIFY || !m.serialization) {
                        _ = function ne(G, U, oe) {
                          U === void 0 && (U = ""), oe === void 0 && (oe = {}), U = U && U + ".";
                          for (var X in G) G.hasOwnProperty(X) && G[X] != null && typeof G[X] != "function" && (G[X] && Array.isArray(G[X]) && G[X].length && G[X].every(function(be) {
                            return typeof be != "object";
                          }) ? oe["" + U + X + "[]"] = G[X].join(",") : G[X] && typeof G[X] == "object" ? oe = ne(G[X], "" + U + X, oe) : oe["" + U + X] = G[X].toString());
                          return oe;
                        }(j, p);
                        for (var Z = 0, F = Object.keys(_); Z < F.length; Z++) {
                          var ie = F[Z];
                          o[ie] = _[ie];
                        }
                        return;
                      }
                    } else typeof j == "number" && (_ = j.toString());
                    o[I] = _;
                  });
                }
              });
            }(d, v, g);
            f.push(w);
          }), f;
        }(n, e)).then(function() {
          return o;
        });
      }
      function vi(e) {
        var n = e.uid, t = e.options, o = e.overrides, i = o === void 0 ? {} : o, s = e.parentWin, u = s === void 0 ? window : s, f = t.propsDef, d = t.containerTemplate, v = t.prerenderTemplate, g = t.tag, w = t.name, p = t.attributes, m = t.dimensions, y = t.autoResize, P = t.url, T = t.domain, x = t.exports, W = new S(), q = [], I = Vt(), j = {}, _ = {}, Z = {
          visible: !0
        }, F = i.event ? i.event : (ie = {}, ne = {}, G = {
          on: function(R, N) {
            var z = ne[R] = ne[R] || [];
            z.push(N);
            var A = !1;
            return {
              cancel: function() {
                A || (A = !0, z.splice(z.indexOf(N), 1));
              }
            };
          },
          once: function(R, N) {
            var z = G.on(R, function() {
              z.cancel(), N();
            });
            return z;
          },
          trigger: function(R) {
            for (var N = arguments.length, z = new Array(N > 1 ? N - 1 : 0), A = 1; A < N; A++) z[A - 1] = arguments[A];
            var k = ne[R], J = [];
            if (k)
              for (var fe = function() {
                var Le = k[le];
                J.push(S.try(function() {
                  return Le.apply(void 0, z);
                }));
              }, le = 0; le < k.length; le++) fe();
            return S.all(J).then(pe);
          },
          triggerOnce: function(R) {
            if (ie[R]) return S.resolve();
            ie[R] = !0;
            for (var N = arguments.length, z = new Array(N > 1 ? N - 1 : 0), A = 1; A < N; A++) z[A - 1] = arguments[A];
            return G.trigger.apply(G, [R].concat(z));
          },
          reset: function() {
            ne = {};
          }
        }), ie, ne, G, U = i.props ? i.props : {}, oe, X, be, yn, cn, Mn = !1, zn = i.onError, Cn = i.getProxyContainer, Fn = i.show, Ln = i.hide, Zn = i.close, jn = i.renderContainer, wn = i.getProxyWindow, Xn = i.setProxyWin, Un = i.openFrame, $n = i.openPrerenderFrame, Qn = i.prerender, kn = i.open, te = i.openPrerender, dn = i.watchForUnload, re = i.getInternalState, ze = i.setInternalState, Re = function() {
          return typeof m == "function" ? m({
            props: U
          }) : m;
        }, Fe = function() {
          return S.try(function() {
            return i.resolveInitPromise ? i.resolveInitPromise() : W.resolve();
          });
        }, ye = function(R) {
          return S.try(function() {
            return i.rejectInitPromise ? i.rejectInitPromise(R) : W.reject(R);
          });
        }, Ye = function(R) {
          for (var N = {}, z = 0, A = Object.keys(U); z < A.length; z++) {
            var k = A[z], J = f[k];
            if (!J || J.sendToChild !== !1) {
              var fe = J && J.trustedDomains && J.trustedDomains.length > 0 ? J.trustedDomains.reduce(function(le, Le) {
                return le || on(Le, R);
              }, !1) : on(R, ee(window));
              J && J.sameDomain && !fe || J && J.trustedDomains && !fe || (N[k] = U[k]);
            }
          }
          return S.hash(N);
        }, _e = function() {
          return S.try(function() {
            return re ? re() : Z;
          });
        }, Ae = function(R) {
          return S.try(function() {
            return ze ? ze(R) : Z = O({}, Z, R);
          });
        }, fn = function() {
          return wn ? wn() : S.try(function() {
            var R = U.window;
            if (R) {
              var N = Tt(R);
              return I.register(function() {
                return R.close();
              }), N;
            }
            return new un({
              send: vn
            });
          });
        }, ke = function(R) {
          return Xn ? Xn(R) : S.try(function() {
            oe = R;
          });
        }, mn = function() {
          return Fn ? Fn() : S.hash({
            setState: Ae({
              visible: !0
            }),
            showElement: X ? X.get().then(xa) : null
          }).then(pe);
        }, Nn = function() {
          return Ln ? Ln() : S.hash({
            setState: Ae({
              visible: !1
            }),
            showElement: X ? X.get().then(Do) : null
          }).then(pe);
        }, ft = function() {
          return typeof P == "function" ? P({
            props: U
          }) : P;
        }, lt = function() {
          return typeof p == "function" ? p({
            props: U
          }) : p;
        }, et = function() {
          return Sn(ft());
        }, en = function(R, N) {
          var z = N.windowName;
          return Un ? Un(R, {
            windowName: z
          }) : S.try(function() {
            if (R === Ee.IFRAME) return Qt(xo({
              attributes: O({
                name: z,
                title: w
              }, lt().iframe)
            }));
          });
        }, Ct = function(R) {
          return $n ? $n(R) : S.try(function() {
            if (R === Ee.IFRAME) return Qt(xo({
              attributes: O({
                name: "__zoid_prerender_frame__" + w + "_" + Ke() + "__",
                title: "prerender__" + w
              }, lt().iframe)
            }));
          });
        }, Nt = function(R, N, z) {
          return te ? te(R, N, z) : S.try(function() {
            if (R === Ee.IFRAME) {
              if (!z) throw new Error("Expected proxy frame to be passed");
              return z.get().then(function(A) {
                return I.register(function() {
                  return Ot(A);
                }), xr(A).then(function(k) {
                  return rn(k);
                }).then(function(k) {
                  return Tt(k);
                });
              });
            }
            if (R === Ee.POPUP) return N;
            throw new Error("No render context available for " + R);
          });
        }, ht = function() {
          return S.try(function() {
            if (oe) return S.all([F.trigger(ve.FOCUS), oe.focus()]).then(pe);
          });
        }, er = function() {
          var R = Rt(window);
          return R.windows = R.windows || {}, R.windows[n] = window, I.register(function() {
            delete R.windows[n];
          }), n;
        }, xt = function(R, N, z, A) {
          if (N === ee(window)) return {
            type: "global",
            uid: er()
          };
          if (R !== window) throw new Error("Can not construct cross-domain window reference for different target window");
          if (U.window) {
            var k = A.getWindow();
            if (!k) throw new Error("Can not construct cross-domain window reference for lazy window prop");
            if (yt(k) !== window) throw new Error("Can not construct cross-domain window reference for window prop with different ancestor");
          }
          if (z === Ee.POPUP) return {
            type: "opener"
          };
          if (z === Ee.IFRAME) return {
            type: "parent",
            distance: wr(window)
          };
          throw new Error("Can not construct window reference for child");
        }, nr = function(R, N) {
          return S.try(function() {
            var z;
            yn = R, be = N, (z = oe) == null || z.isPopup().then(function(A) {
              if ((N == null ? void 0 : N.name) !== "" && A) {
                var k;
                (k = oe) == null || k.setName(N == null ? void 0 : N.name);
              }
            }).finally(function() {
              Fe(), I.register(function() {
                return N.close.fireAndForget().catch(pe);
              });
            });
          });
        }, It = function(R) {
          var N = R.width, z = R.height;
          return S.try(function() {
            F.trigger(ve.RESIZE, {
              width: N,
              height: z
            });
          });
        }, Dt = function(R) {
          return S.try(function() {
            return F.trigger(ve.DESTROY);
          }).catch(pe).then(function() {
            return I.all(R);
          }).then(function() {
            var N = R || new Error("Component destroyed");
            cn && dt(cn) || N.message === "Window navigated away" ? W.resolve() : W.asyncReject(N);
          });
        }, xn = Wn(function(R) {
          return S.try(function() {
            return Zn ? We(Zn.__source__) ? void 0 : Zn() : S.try(function() {
              return F.trigger(ve.CLOSE);
            }).then(function() {
              return Dt(R || new Error("Component closed"));
            });
          });
        }), gi = function(R, N) {
          var z = N.proxyWin, A = N.proxyFrame, k = N.windowName;
          return kn ? kn(R, {
            proxyWin: z,
            proxyFrame: A,
            windowName: k
          }) : S.try(function() {
            if (R === Ee.IFRAME) {
              if (!A) throw new Error("Expected proxy frame to be passed");
              return A.get().then(function(Ce) {
                return xr(Ce).then(function(ce) {
                  return I.register(function() {
                    return Ot(Ce);
                  }), I.register(function() {
                    return ai(ce);
                  }), ce;
                });
              });
            }
            if (R === Ee.POPUP) {
              var J = Re(), fe = J.width, le = fe === void 0 ? "300px" : fe, Le = J.height, we = Le === void 0 ? "150px" : Le;
              le = zo(le, window.outerWidth), we = zo(we, window.outerWidth);
              var Me = function(Ce, ce) {
                var Ne = (ce = ce || {}).closeOnUnload, me = Ne === void 0 ? 1 : Ne, nn = ce.name, je = nn === void 0 ? "" : nn, ae = ce.width, Ue = ce.height, Ze = 0, Ve = 0;
                ae && (window.outerWidth ? Ve = Math.round((window.outerWidth - ae) / 2) + window.screenX : window.screen.width && (Ve = Math.round((window.screen.width - ae) / 2))), Ue && (window.outerHeight ? Ze = Math.round((window.outerHeight - Ue) / 2) + window.screenY : window.screen.height && (Ze = Math.round((window.screen.height - Ue) / 2))), delete ce.closeOnUnload, delete ce.name, ae && Ue && (ce = O({
                  top: Ze,
                  left: Ve,
                  width: ae,
                  height: Ue,
                  status: 1,
                  toolbar: 0,
                  menubar: 0,
                  resizable: 1,
                  scrollbars: 1
                }, ce));
                var nt = Object.keys(ce).map(function(En) {
                  if (ce[En] != null) return En + "=" + qt(ce[En]);
                }).filter(Boolean).join(","), ln;
                try {
                  ln = window.open("", je, nt);
                } catch (En) {
                  throw new Nr("Can not open popup window - " + (En.stack || En.message));
                }
                if (We(ln))
                  throw new Nr("Can not open popup window - blocked");
                return me && window.addEventListener("unload", function() {
                  return ln.close();
                }), ln;
              }(0, O({
                name: k,
                width: le,
                height: we
              }, lt().popup));
              return I.register(function() {
                return vo(Me);
              }), I.register(function() {
                return ai(Me);
              }), Me;
            }
            throw new Error("No render context available for " + R);
          }).then(function(J) {
            return z.setWindow(J, {
              send: vn
            }), z.setName(k).then(function() {
              return z;
            });
          });
        }, yi = function() {
          return S.try(function() {
            var R = Io(window, "unload", Bt(function() {
              Dt(new Error("Window navigated away"));
            })), N = ho(u, Dt, 3e3);
            if (I.register(N.cancel), I.register(R.cancel), dn) return dn();
          });
        }, Ei = function(R) {
          var N = !1;
          return R.isClosed().then(function(z) {
            return z ? (N = !0, xn(new Error("Detected component window close"))) : S.delay(200).then(function() {
              return R.isClosed();
            }).then(function(A) {
              if (A)
                return N = !0, xn(new Error("Detected component window close"));
            });
          }).then(function() {
            return N;
          });
        }, Wt = function(R) {
          return zn ? zn(R) : S.try(function() {
            if (q.indexOf(R) === -1)
              return q.push(R), W.asyncReject(R), F.trigger(ve.ERROR, R);
          });
        }, bi = new S(), Pi = function(R) {
          return S.try(function() {
            bi.resolve(R);
          });
        };
        nr.onError = Wt;
        var Oi = function(R, N) {
          return R({
            uid: n,
            container: N.container,
            context: N.context,
            doc: N.doc,
            frame: N.frame,
            prerenderFrame: N.prerenderFrame,
            focus: ht,
            close: xn,
            state: j,
            props: U,
            tag: g,
            dimensions: Re(),
            event: F
          });
        }, Si = function(R, N) {
          var z = N.context;
          return Qn ? Qn(R, {
            context: z
          }) : S.try(function() {
            if (v) {
              F.trigger(ve.PRERENDER);
              var A = R.getWindow();
              if (A && ge(A) && function(Ne) {
                try {
                  if (!Ne.location.href || Ne.location.href === "about:blank") return !0;
                } catch {
                }
                return !1;
              }(A)) {
                var k = (A = rn(A)).document, J = Oi(v, {
                  context: z,
                  doc: k
                });
                if (J) {
                  if (J.ownerDocument !== k) throw new Error("Expected prerender template to have been created with document from child window");
                  (function(Ne, me) {
                    var nn = me.tagName.toLowerCase();
                    if (nn !== "html") throw new Error("Expected element to be html, got " + nn);
                    for (var je = Ne.document.documentElement, ae = 0, Ue = Sr(je.children); ae < Ue.length; ae++) je.removeChild(Ue[ae]);
                    for (var Ze = 0, Ve = Sr(me.children); Ze < Ve.length; Ze++) je.appendChild(Ve[Ze]);
                  })(A, J);
                  var fe = y.width, le = fe !== void 0 && fe, Le = y.height, we = Le !== void 0 && Le, Me = y.element, Ce = Me === void 0 ? "body" : Me;
                  if ((Ce = Cr(Ce, k)) && (le || we)) {
                    var ce = Wo(Ce, function(Ne) {
                      It({
                        width: le ? Ne.width : void 0,
                        height: we ? Ne.height : void 0
                      });
                    }, {
                      width: le,
                      height: we,
                      win: A
                    });
                    F.on(ve.RENDERED, ce.cancel);
                  }
                  F.trigger(ve.PRERENDERED);
                }
              }
            }
          });
        }, Ti = function(R, N) {
          var z = N.proxyFrame, A = N.proxyPrerenderFrame, k = N.context, J = N.rerender;
          return jn ? jn(R, {
            proxyFrame: z,
            proxyPrerenderFrame: A,
            context: k,
            rerender: J
          }) : S.hash({
            container: R.get(),
            frame: z ? z.get() : null,
            prerenderFrame: A ? A.get() : null,
            internalState: _e()
          }).then(function(fe) {
            var le = fe.container, Le = fe.internalState.visible, we = Oi(d, {
              context: k,
              container: le,
              frame: fe.frame,
              prerenderFrame: fe.prerenderFrame,
              doc: document
            });
            if (we) {
              Le || Do(we), Na(le, we);
              var Me = function(Ce, ce) {
                ce = Bt(ce);
                var Ne = !1, me = [], nn, je, ae, Ue = function() {
                  Ne = !0;
                  for (var ln = 0; ln < me.length; ln++) me[ln].disconnect();
                  nn && nn.cancel(), ae && ae.removeEventListener("unload", Ze), je && Ot(je);
                }, Ze = function() {
                  Ne || (ce(), Ue());
                };
                if (dt(Ce))
                  return Ze(), {
                    cancel: Ue
                  };
                if (window.MutationObserver)
                  for (var Ve = Ce.parentElement; Ve; ) {
                    var nt = new window.MutationObserver(function() {
                      dt(Ce) && Ze();
                    });
                    nt.observe(Ve, {
                      childList: !0
                    }), me.push(nt), Ve = Ve.parentElement;
                  }
                return (je = document.createElement("iframe")).setAttribute("name", "__detect_close_" + Ke() + "__"), je.style.display = "none", xr(je).then(function(ln) {
                  (ae = rn(ln)).addEventListener("unload", Ze);
                }), Ce.appendChild(je), nn = bt(function() {
                  dt(Ce) && Ze();
                }, 1e3), {
                  cancel: Ue
                };
              }(we, function() {
                var Ce = new Error("Detected container element removed from DOM");
                return S.delay(1).then(function() {
                  if (!dt(we))
                    return I.all(Ce), J().then(Fe, ye);
                  xn(Ce);
                });
              });
              return I.register(function() {
                return Me.cancel();
              }), I.register(function() {
                return Ot(we);
              }), X = Qt(we);
            }
          });
        }, Ri = function() {
          return {
            state: j,
            event: F,
            close: xn,
            focus: ht,
            resize: It,
            onError: Wt,
            updateProps: Qa,
            show: mn,
            hide: Nn
          };
        }, Jr = function(R) {
          R === void 0 && (R = {});
          var N = cn, z = Ri();
          ct(_, R), function(A, k, J, fe, le) {
            var Le = fe.state, we = fe.close, Me = fe.focus, Ce = fe.event, ce = fe.onError;
            Hr(J, A, function(Ne, me, nn) {
              var je = !1, ae = nn;
              Object.defineProperty(k, Ne, {
                configurable: !0,
                enumerable: !0,
                get: function() {
                  return je ? ae : (je = !0, function() {
                    if (!me) return ae;
                    var Ue = me.alias;
                    if (Ue && !_n(nn) && _n(J[Ue]) && (ae = J[Ue]), me.value && (ae = me.value({
                      props: k,
                      state: Le,
                      close: we,
                      focus: Me,
                      event: Ce,
                      onError: ce,
                      container: le
                    })), !me.default || _n(ae) || _n(J[Ne]) || (ae = me.default({
                      props: k,
                      state: Le,
                      close: we,
                      focus: Me,
                      event: Ce,
                      onError: ce,
                      container: le
                    })), _n(ae)) {
                      if (me.type === de.ARRAY ? !Array.isArray(ae) : typeof ae !== me.type) throw new TypeError("Prop is not of type " + me.type + ": " + Ne);
                    } else if (me.required !== !1 && !_n(J[Ne])) throw new Error('Expected prop "' + Ne + '" to be defined');
                    return _n(ae) && me.decorate && (ae = me.decorate({
                      value: ae,
                      props: k,
                      state: Le,
                      close: we,
                      focus: Me,
                      event: Ce,
                      onError: ce,
                      container: le
                    })), ae;
                  }());
                }
              });
            }), Hr(k, A, pe);
          }(f, U, _, z, N);
        }, Qa = function(R) {
          return Jr(R), W.then(function() {
            var N = be, z = oe;
            if (N && z && yn) return Ye(yn).then(function(A) {
              return N.updateProps(A).catch(function(k) {
                return Ei(z).then(function(J) {
                  if (!J) throw k;
                });
              });
            });
          });
        }, Ci = function(R) {
          return Cn ? Cn(R) : S.try(function() {
            return Co(R);
          }).then(function(N) {
            return Ir(N) && (N = function z(A) {
              var k = function(Le) {
                var we = function(Me) {
                  for (; Me.parentNode; ) Me = Me.parentNode;
                  if (Ir(Me)) return Me;
                }(Le);
                if (we && we.host) return we.host;
              }(A);
              if (!k) throw new Error("Element is not in shadow dom");
              var J = "shadow-slot-" + Ke(), fe = document.createElement("slot");
              fe.setAttribute("name", J), A.appendChild(fe);
              var le = document.createElement("div");
              return le.setAttribute("slot", J), k.appendChild(le), Ir(k) ? z(le) : le;
            }(N)), cn = N, Qt(N);
          });
        };
        return {
          init: function() {
            (function() {
              F.on(ve.RENDER, function() {
                return U.onRender();
              }), F.on(ve.PRERENDER, function() {
                return U.onPrerender();
              }), F.on(ve.DISPLAY, function() {
                return U.onDisplay();
              }), F.on(ve.RENDERED, function() {
                return U.onRendered();
              }), F.on(ve.PRERENDERED, function() {
                return U.onPrerendered();
              }), F.on(ve.CLOSE, function() {
                return U.onClose();
              }), F.on(ve.DESTROY, function() {
                return U.onDestroy();
              }), F.on(ve.RESIZE, function() {
                return U.onResize();
              }), F.on(ve.FOCUS, function() {
                return U.onFocus();
              }), F.on(ve.PROPS, function(R) {
                return U.onProps(R);
              }), F.on(ve.ERROR, function(R) {
                return U && U.onError ? U.onError(R) : ye(R).then(function() {
                  setTimeout(function() {
                    throw R;
                  }, 1);
                });
              }), I.register(F.reset);
            })();
          },
          render: function(R) {
            var N = R.target, z = R.container, A = R.context, k = R.rerender;
            return S.try(function() {
              var J = et(), fe = T || et();
              (function(H, $e, xe) {
                if (H !== window) {
                  if (!Lt(window, H)) throw new Error("Can only renderTo an adjacent frame");
                  var Be = ee();
                  if (!on($e, Be) && !ge(H)) throw new Error("Can not render remotely to " + $e.toString() + " - can only render to " + Be);
                  if (xe && typeof xe != "string") throw new Error("Container passed to renderTo must be a string selector, got " + typeof xe + " }");
                }
              })(N, fe, z);
              var le = S.try(function() {
                if (N !== window) return function(H, $e) {
                  for (var xe = {}, Be = 0, tn = Object.keys(U); Be < tn.length; Be++) {
                    var Ie = tn[Be], hn = f[Ie];
                    hn && hn.allowDelegate && (xe[Ie] = U[Ie]);
                  }
                  var Ge = vn($e, "zoid_delegate_" + w, {
                    uid: n,
                    overrides: {
                      props: xe,
                      event: F,
                      close: xn,
                      onError: Wt,
                      getInternalState: _e,
                      setInternalState: Ae,
                      resolveInitPromise: Fe,
                      rejectInitPromise: ye
                    }
                  }).then(function(K) {
                    var Y = K.data.parent;
                    return I.register(function(D) {
                      if (!We($e)) return Y.destroy(D);
                    }), Y.getDelegateOverrides();
                  }).catch(function(K) {
                    throw new Error(`Unable to delegate rendering. Possibly the component is not loaded in the target window.

` + ut(K));
                  });
                  return Cn = function() {
                    for (var K = arguments.length, Y = new Array(K), D = 0; D < K; D++) Y[D] = arguments[D];
                    return Ge.then(function(Q) {
                      return Q.getProxyContainer.apply(Q, Y);
                    });
                  }, jn = function() {
                    for (var K = arguments.length, Y = new Array(K), D = 0; D < K; D++) Y[D] = arguments[D];
                    return Ge.then(function(Q) {
                      return Q.renderContainer.apply(Q, Y);
                    });
                  }, Fn = function() {
                    for (var K = arguments.length, Y = new Array(K), D = 0; D < K; D++) Y[D] = arguments[D];
                    return Ge.then(function(Q) {
                      return Q.show.apply(Q, Y);
                    });
                  }, Ln = function() {
                    for (var K = arguments.length, Y = new Array(K), D = 0; D < K; D++) Y[D] = arguments[D];
                    return Ge.then(function(Q) {
                      return Q.hide.apply(Q, Y);
                    });
                  }, dn = function() {
                    for (var K = arguments.length, Y = new Array(K), D = 0; D < K; D++) Y[D] = arguments[D];
                    return Ge.then(function(Q) {
                      return Q.watchForUnload.apply(Q, Y);
                    });
                  }, H === Ee.IFRAME ? (wn = function() {
                    for (var K = arguments.length, Y = new Array(K), D = 0; D < K; D++) Y[D] = arguments[D];
                    return Ge.then(function(Q) {
                      return Q.getProxyWindow.apply(Q, Y);
                    });
                  }, Un = function() {
                    for (var K = arguments.length, Y = new Array(K), D = 0; D < K; D++) Y[D] = arguments[D];
                    return Ge.then(function(Q) {
                      return Q.openFrame.apply(Q, Y);
                    });
                  }, $n = function() {
                    for (var K = arguments.length, Y = new Array(K), D = 0; D < K; D++) Y[D] = arguments[D];
                    return Ge.then(function(Q) {
                      return Q.openPrerenderFrame.apply(Q, Y);
                    });
                  }, Qn = function() {
                    for (var K = arguments.length, Y = new Array(K), D = 0; D < K; D++) Y[D] = arguments[D];
                    return Ge.then(function(Q) {
                      return Q.prerender.apply(Q, Y);
                    });
                  }, kn = function() {
                    for (var K = arguments.length, Y = new Array(K), D = 0; D < K; D++) Y[D] = arguments[D];
                    return Ge.then(function(Q) {
                      return Q.open.apply(Q, Y);
                    });
                  }, te = function() {
                    for (var K = arguments.length, Y = new Array(K), D = 0; D < K; D++) Y[D] = arguments[D];
                    return Ge.then(function(Q) {
                      return Q.openPrerender.apply(Q, Y);
                    });
                  }) : H === Ee.POPUP && (Xn = function() {
                    for (var K = arguments.length, Y = new Array(K), D = 0; D < K; D++) Y[D] = arguments[D];
                    return Ge.then(function(Q) {
                      return Q.setProxyWin.apply(Q, Y);
                    });
                  }), Ge;
                }(A, N);
              }), Le = U.window, we = yi(), Me = pi(f, U, "post"), Ce = F.trigger(ve.RENDER), ce = Ci(z), Ne = fn(), me = ce.then(function() {
                return Jr();
              }), nn = me.then(function() {
                return pi(f, U, "get").then(function(H) {
                  return function($e, xe) {
                    var Be = xe.query || {}, tn = xe.hash || {}, Ie, hn, Ge = $e.split("#");
                    hn = Ge[1];
                    var K = (Ie = Ge[0]).split("?");
                    Ie = K[0];
                    var Y = Ro(K[1], Be), D = Ro(hn, tn);
                    return Y && (Ie = Ie + "?" + Y), D && (Ie = Ie + "#" + D), Ie;
                  }(mr(ft()), {
                    query: H
                  });
                });
              }), je = Ne.then(function(H) {
                return function(xe) {
                  var Be = xe === void 0 ? {} : xe, tn = Be.proxyWin, Ie = Be.initialChildDomain, hn = Be.childDomainMatch, Ge = Be.target, K = Ge === void 0 ? window : Ge, Y = Be.context;
                  return function(D) {
                    var Q = D === void 0 ? {} : D, Kr = Q.proxyWin, is = Q.childDomainMatch, as = Q.context;
                    return Ye(Q.initialChildDomain).then(function(ss) {
                      return {
                        uid: n,
                        context: as,
                        tag: g,
                        childDomainMatch: is,
                        version: "10_3_3",
                        props: ss,
                        exports: (Ii = Kr, {
                          init: function(us) {
                            return nr(this.origin, us);
                          },
                          close: xn,
                          checkClose: function() {
                            return Ei(Ii);
                          },
                          resize: It,
                          onError: Wt,
                          show: mn,
                          hide: Nn,
                          export: Pi
                        })
                      };
                      var Ii;
                    });
                  }({
                    proxyWin: tn,
                    initialChildDomain: Ie,
                    childDomainMatch: hn,
                    context: Y
                  }).then(function(D) {
                    var Q = ui({
                      data: D,
                      metaData: {
                        windowRef: xt(K, Ie, Y, tn)
                      },
                      sender: {
                        domain: ee(window)
                      },
                      receiver: {
                        win: tn,
                        domain: hn
                      },
                      passByReference: Ie === ee()
                    }), Kr = Q.serializedData;
                    return I.register(Q.cleanReference), Kr;
                  });
                }({
                  proxyWin: ($e = {
                    proxyWin: H,
                    initialChildDomain: J,
                    childDomainMatch: fe,
                    target: N,
                    context: A
                  }).proxyWin,
                  initialChildDomain: $e.initialChildDomain,
                  childDomainMatch: $e.childDomainMatch,
                  target: $e.target,
                  context: $e.context
                }).then(function(xe) {
                  return di({
                    name: w,
                    serializedPayload: xe
                  });
                });
                var $e;
              }), ae = je.then(function(H) {
                return en(A, {
                  windowName: H
                });
              }), Ue = Ct(A), Ze = S.hash({
                proxyContainer: ce,
                proxyFrame: ae,
                proxyPrerenderFrame: Ue
              }).then(function(H) {
                return Ti(H.proxyContainer, {
                  context: A,
                  proxyFrame: H.proxyFrame,
                  proxyPrerenderFrame: H.proxyPrerenderFrame,
                  rerender: k
                });
              }).then(function(H) {
                return H;
              }), Ve = S.hash({
                windowName: je,
                proxyFrame: ae,
                proxyWin: Ne
              }).then(function(H) {
                var $e = H.proxyWin;
                return Le ? $e : gi(A, {
                  windowName: H.windowName,
                  proxyWin: $e,
                  proxyFrame: H.proxyFrame
                });
              }), nt = S.hash({
                proxyWin: Ve,
                proxyPrerenderFrame: Ue
              }).then(function(H) {
                return Nt(A, H.proxyWin, H.proxyPrerenderFrame);
              }), ln = Ve.then(function(H) {
                return oe = H, ke(H);
              }), En = S.hash({
                proxyPrerenderWin: nt,
                state: ln
              }).then(function(H) {
                return Si(H.proxyPrerenderWin, {
                  context: A
                });
              }), Ni = S.hash({
                proxyWin: Ve,
                windowName: je
              }).then(function(H) {
                if (Le) return H.proxyWin.setName(H.windowName);
              }), ka = S.hash({
                body: Me
              }).then(function(H) {
                return t.method ? t.method : Object.keys(H.body).length ? "post" : "get";
              }), xi = S.hash({
                proxyWin: Ve,
                windowUrl: nn,
                body: Me,
                method: ka,
                windowName: Ni,
                prerender: En
              }).then(function(H) {
                return H.proxyWin.setLocation(H.windowUrl, {
                  method: H.method,
                  body: H.body
                });
              }), es = Ve.then(function(H) {
                (function $e(xe, Be) {
                  var tn = !1;
                  return I.register(function() {
                    tn = !0;
                  }), S.delay(2e3).then(function() {
                    return xe.isClosed();
                  }).then(function(Ie) {
                    if (!tn) {
                      if (Be === Ee.POPUP && Ie) return xn(new Error("Detected popup close"));
                      var hn = !!(cn && dt(cn));
                      return Be === Ee.IFRAME && Ie && (hn || Mn) ? xn(new Error("Detected iframe close")) : $e(xe, Be);
                    }
                  });
                })(H, A);
              }), ns = S.hash({
                container: Ze,
                prerender: En
              }).then(function() {
                return F.trigger(ve.DISPLAY);
              }), ts = Ve.then(function(H) {
                return function($e, xe, Be) {
                  return S.try(function() {
                    return $e.awaitWindow();
                  }).then(function(tn) {
                    if (An && An.needsBridge({
                      win: tn,
                      domain: xe
                    }) && !An.hasBridge(xe, xe)) {
                      var Ie = typeof t.bridgeUrl == "function" ? t.bridgeUrl({
                        props: U
                      }) : t.bridgeUrl;
                      if (!Ie) throw new Error("Bridge needed to render " + Be);
                      var hn = Sn(Ie);
                      return An.linkUrl(tn, xe), An.openBridge(mr(Ie), hn);
                    }
                  });
                }(H, J, A);
              }), rs = xi.then(function() {
                return S.try(function() {
                  var H = U.timeout;
                  if (H) return W.timeout(H, new Error("Loading component timed out after " + H + " milliseconds"));
                });
              }), os = W.then(function() {
                return Mn = !0, F.trigger(ve.RENDERED);
              });
              return S.hash({
                initPromise: W,
                buildUrlPromise: nn,
                onRenderPromise: Ce,
                getProxyContainerPromise: ce,
                openFramePromise: ae,
                openPrerenderFramePromise: Ue,
                renderContainerPromise: Ze,
                openPromise: Ve,
                openPrerenderPromise: nt,
                setStatePromise: ln,
                prerenderPromise: En,
                loadUrlPromise: xi,
                buildWindowNamePromise: je,
                setWindowNamePromise: Ni,
                watchForClosePromise: es,
                onDisplayPromise: ns,
                openBridgePromise: ts,
                runTimeoutPromise: rs,
                onRenderedPromise: os,
                delegatePromise: le,
                watchForUnloadPromise: we,
                finalSetPropsPromise: me
              });
            }).catch(function(J) {
              return S.all([Wt(J), Dt(J)]).then(function() {
                throw J;
              }, function() {
                throw J;
              });
            }).then(pe);
          },
          destroy: Dt,
          getProps: function() {
            return U;
          },
          setProps: Jr,
          export: Pi,
          getHelpers: Ri,
          getDelegateOverrides: function() {
            return S.try(function() {
              return {
                getProxyContainer: Ci,
                show: mn,
                hide: Nn,
                renderContainer: Ti,
                getProxyWindow: fn,
                watchForUnload: yi,
                openFrame: en,
                openPrerenderFrame: Ct,
                prerender: Si,
                open: gi,
                openPrerender: Nt,
                setProxyWin: ke
              };
            });
          },
          getExports: function() {
            return x({
              getExports: function() {
                return bi;
              }
            });
          }
        };
      }
      var Ba = {
        register: function(e, n, t, o) {
          var i = o.React, s = o.ReactDOM;
          return function(u) {
            C(f, u);
            function f() {
              return u.apply(this, arguments) || this;
            }
            var d = f.prototype;
            return d.render = function() {
              return i.createElement("div", null);
            }, d.componentDidMount = function() {
              var v = s.findDOMNode(this), g = t(ct({}, this.props));
              g.render(v, Ee.IFRAME), this.setState({
                parent: g
              });
            }, d.componentDidUpdate = function() {
              this.state && this.state.parent && this.state.parent.updateProps(ct({}, this.props)).catch(pe);
            }, f;
          }(i.Component);
        }
      }, qa = {
        register: function(e, n, t, o) {
          return o.component(e, {
            render: function(i) {
              return i("div");
            },
            inheritAttrs: !1,
            mounted: function() {
              var i = this.$el;
              this.parent = t(O({}, (s = this.$attrs, Object.keys(s).reduce(function(u, f) {
                var d = s[f];
                return f === "style-object" || f === "styleObject" ? (u.style = d, u.styleObject = d) : f.includes("-") ? u[Or(f)] = d : u[f] = d, u;
              }, {}))));
              var s;
              this.parent.render(i, Ee.IFRAME);
            },
            watch: {
              $attrs: {
                handler: function() {
                  this.parent && this.$attrs && this.parent.updateProps(O({}, this.$attrs)).catch(pe);
                },
                deep: !0
              }
            }
          });
        }
      }, Ha = {
        register: function(e, n, t) {
          return {
            template: "<div></div>",
            inheritAttrs: !1,
            mounted: function() {
              var o = this.$el;
              this.parent = t(O({}, (i = this.$attrs, Object.keys(i).reduce(function(s, u) {
                var f = i[u];
                return u === "style-object" || u === "styleObject" ? (s.style = f, s.styleObject = f) : u.includes("-") ? s[Or(u)] = f : s[u] = f, s;
              }, {}))));
              var i;
              this.parent.render(o, Ee.IFRAME);
            },
            watch: {
              $attrs: {
                handler: function() {
                  this.parent && this.$attrs && this.parent.updateProps(O({}, this.$attrs)).catch(pe);
                },
                deep: !0
              }
            }
          };
        }
      }, Va = {
        register: function(e, n, t, o) {
          return o.module(e, []).directive(Or(e), function() {
            for (var i = {}, s = 0, u = Object.keys(n); s < u.length; s++) i[u[s]] = "=";
            return i.props = "=", {
              scope: i,
              restrict: "E",
              controller: ["$scope", "$element", function(f, d) {
                function v() {
                  if (f.$root.$$phase !== "$apply" && f.$root.$$phase !== "$digest") try {
                    f.$apply();
                  } catch {
                  }
                }
                var g = function() {
                  return Ht(f.props, function(p) {
                    return typeof p == "function" ? function() {
                      var m = p.apply(this, arguments);
                      return v(), m;
                    } : p;
                  });
                }, w = t(g());
                w.render(d[0], Ee.IFRAME), f.$watch(function() {
                  w.updateProps(g()).catch(pe);
                });
              }]
            };
          });
        }
      }, Ga = {
        register: function(e, n, t, o) {
          var i = o.Component, s = o.NgModule, u = o.ElementRef, f = o.NgZone, d = o.Inject, v = function() {
            function w(m, y) {
              this.elementRef = void 0, this.internalProps = void 0, this.parent = void 0, this.props = void 0, this.zone = void 0, this._props = void 0, this._props = {}, this.elementRef = m, this.zone = y;
            }
            var p = w.prototype;
            return p.getProps = function() {
              var m = this;
              return Ht(O({}, this.internalProps, this.props), function(y) {
                if (typeof y == "function") {
                  var P = m.zone;
                  return function() {
                    var T = arguments, x = this;
                    return P.run(function() {
                      return y.apply(x, T);
                    });
                  };
                }
                return y;
              });
            }, p.ngOnInit = function() {
              var m = this.elementRef.nativeElement;
              this.parent = t(this.getProps()), this.parent.render(m, Ee.IFRAME);
            }, p.ngDoCheck = function() {
              this.parent && !function(m, y) {
                var P = {};
                for (var T in m) if (m.hasOwnProperty(T) && (P[T] = !0, m[T] !== y[T]))
                  return !1;
                for (var x in y) if (!P[x]) return !1;
                return !0;
              }(this._props, this.props) && (this._props = O({}, this.props), this.parent.updateProps(this.getProps()));
            }, w;
          }();
          v.annotations = void 0, v.parameters = void 0, v.parameters = [[new d(u)], [new d(f)]], v.annotations = [new i({
            selector: e,
            template: "<div></div>",
            inputs: ["props"]
          })];
          var g = function() {
          };
          return g.annotations = void 0, g.annotations = [new s({
            declarations: [v],
            exports: [v]
          })], g;
        }
      };
      function Ja(e) {
        var n = e.uid, t = e.frame, o = e.prerenderFrame, i = e.doc, s = e.props, u = e.event, f = e.dimensions, d = f.width, v = f.height;
        if (t && o) {
          var g = i.createElement("div");
          g.setAttribute("id", n);
          var w = i.createElement("style");
          return s.cspNonce && w.setAttribute("nonce", s.cspNonce), w.appendChild(i.createTextNode(`
            #` + n + ` {
                display: inline-block;
                position: relative;
                width: ` + d + `;
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
        `)), g.appendChild(t), g.appendChild(o), g.appendChild(w), o.classList.add("zoid-visible"), t.classList.add("zoid-invisible"), u.on(ve.RENDERED, function() {
            o.classList.remove("zoid-visible"), o.classList.add("zoid-invisible"), t.classList.remove("zoid-invisible"), t.classList.add("zoid-visible"), setTimeout(function() {
              Ot(o);
            }, 1);
          }), u.on(ve.RESIZE, function(p) {
            var m = p.width, y = p.height;
            typeof m == "number" && (g.style.width = Mo(m)), typeof y == "number" && (g.style.height = Mo(y));
          }), g;
        }
      }
      function Ka(e) {
        var n = e.doc, t = e.props, o = n.createElement("html"), i = n.createElement("body"), s = n.createElement("style"), u = n.createElement("div");
        return u.classList.add("spinner"), t.cspNonce && s.setAttribute("nonce", t.cspNonce), o.appendChild(i), i.appendChild(u), i.appendChild(s), s.appendChild(n.createTextNode(`
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
      var Vr = Vt(), Gr = Vt();
      function Ya(e) {
        var n = function(y) {
          var P = y.tag, T = y.url, x = y.domain, W = y.bridgeUrl, q = y.props, I = q === void 0 ? {} : q, j = y.dimensions, _ = j === void 0 ? {} : j, Z = y.autoResize, F = Z === void 0 ? {} : Z, ie = y.allowedParentDomains, ne = ie === void 0 ? "*" : ie, G = y.attributes, U = G === void 0 ? {} : G, oe = y.defaultContext, X = oe === void 0 ? Ee.IFRAME : oe, be = y.containerTemplate, yn = be === void 0 ? Ja : be, cn = y.prerenderTemplate, Mn = cn === void 0 ? Ka : cn, zn = y.validate, Cn = y.eligible, Fn = Cn === void 0 ? function() {
            return {
              eligible: !0
            };
          } : Cn, Ln = y.logger, Zn = Ln === void 0 ? {
            info: pe
          } : Ln, jn = y.exports, wn = jn === void 0 ? pe : jn, Xn = y.method, Un = y.children, $n = Un === void 0 ? function() {
            return {};
          } : Un, Qn = P.replace(/-/g, "_"), kn = O({}, {
            window: {
              type: de.OBJECT,
              sendToChild: !1,
              required: !1,
              allowDelegate: !0,
              validate: function(te) {
                var dn = te.value;
                if (!Jn(dn) && !un.isProxyWindow(dn)) throw new Error("Expected Window or ProxyWindow");
                if (Jn(dn)) {
                  if (We(dn)) throw new Error("Window is closed");
                  if (!ge(dn)) throw new Error("Window is not same domain");
                }
              },
              decorate: function(te) {
                return Tt(te.value);
              }
            },
            timeout: {
              type: de.NUMBER,
              required: !1,
              sendToChild: !1
            },
            cspNonce: {
              type: de.STRING,
              required: !1
            },
            onDisplay: {
              type: de.FUNCTION,
              required: !1,
              sendToChild: !1,
              allowDelegate: !0,
              default: Rn,
              decorate: Yn
            },
            onRendered: {
              type: de.FUNCTION,
              required: !1,
              sendToChild: !1,
              default: Rn,
              decorate: Yn
            },
            onRender: {
              type: de.FUNCTION,
              required: !1,
              sendToChild: !1,
              default: Rn,
              decorate: Yn
            },
            onPrerendered: {
              type: de.FUNCTION,
              required: !1,
              sendToChild: !1,
              default: Rn,
              decorate: Yn
            },
            onPrerender: {
              type: de.FUNCTION,
              required: !1,
              sendToChild: !1,
              default: Rn,
              decorate: Yn
            },
            onClose: {
              type: de.FUNCTION,
              required: !1,
              sendToChild: !1,
              allowDelegate: !0,
              default: Rn,
              decorate: Yn
            },
            onDestroy: {
              type: de.FUNCTION,
              required: !1,
              sendToChild: !1,
              allowDelegate: !0,
              default: Rn,
              decorate: Yn
            },
            onResize: {
              type: de.FUNCTION,
              required: !1,
              sendToChild: !1,
              allowDelegate: !0,
              default: Rn
            },
            onFocus: {
              type: de.FUNCTION,
              required: !1,
              sendToChild: !1,
              allowDelegate: !0,
              default: Rn
            },
            close: {
              type: de.FUNCTION,
              required: !1,
              sendToChild: !1,
              childDecorate: function(te) {
                return te.close;
              }
            },
            focus: {
              type: de.FUNCTION,
              required: !1,
              sendToChild: !1,
              childDecorate: function(te) {
                return te.focus;
              }
            },
            resize: {
              type: de.FUNCTION,
              required: !1,
              sendToChild: !1,
              childDecorate: function(te) {
                return te.resize;
              }
            },
            uid: {
              type: de.STRING,
              required: !1,
              sendToChild: !1,
              childDecorate: function(te) {
                return te.uid;
              }
            },
            tag: {
              type: de.STRING,
              required: !1,
              sendToChild: !1,
              childDecorate: function(te) {
                return te.tag;
              }
            },
            getParent: {
              type: de.FUNCTION,
              required: !1,
              sendToChild: !1,
              childDecorate: function(te) {
                return te.getParent;
              }
            },
            getParentDomain: {
              type: de.FUNCTION,
              required: !1,
              sendToChild: !1,
              childDecorate: function(te) {
                return te.getParentDomain;
              }
            },
            show: {
              type: de.FUNCTION,
              required: !1,
              sendToChild: !1,
              childDecorate: function(te) {
                return te.show;
              }
            },
            hide: {
              type: de.FUNCTION,
              required: !1,
              sendToChild: !1,
              childDecorate: function(te) {
                return te.hide;
              }
            },
            export: {
              type: de.FUNCTION,
              required: !1,
              sendToChild: !1,
              childDecorate: function(te) {
                return te.export;
              }
            },
            onError: {
              type: de.FUNCTION,
              required: !1,
              sendToChild: !1,
              childDecorate: function(te) {
                return te.onError;
              }
            },
            onProps: {
              type: de.FUNCTION,
              required: !1,
              sendToChild: !1,
              childDecorate: function(te) {
                return te.onProps;
              }
            },
            getSiblings: {
              type: de.FUNCTION,
              required: !1,
              sendToChild: !1,
              childDecorate: function(te) {
                return te.getSiblings;
              }
            }
          }, I);
          if (!yn) throw new Error("Container template required");
          return {
            name: Qn,
            tag: P,
            url: T,
            domain: x,
            bridgeUrl: W,
            method: Xn,
            propsDef: kn,
            dimensions: _,
            autoResize: F,
            allowedParentDomains: ne,
            attributes: U,
            defaultContext: X,
            containerTemplate: yn,
            prerenderTemplate: Mn,
            validate: zn,
            logger: Zn,
            eligible: Fn,
            children: $n,
            exports: typeof wn == "function" ? wn : function(te) {
              for (var dn = te.getExports, re = {}, ze = function() {
                var ye = Fe[Re], Ye = wn[ye].type, _e = dn().then(function(Ae) {
                  return Ae[ye];
                });
                re[ye] = Ye === de.FUNCTION ? function() {
                  for (var Ae = arguments.length, fn = new Array(Ae), ke = 0; ke < Ae; ke++) fn[ke] = arguments[ke];
                  return _e.then(function(mn) {
                    return mn.apply(void 0, fn);
                  });
                } : _e;
              }, Re = 0, Fe = Object.keys(wn); Re < Fe.length; Re++) ze();
              return re;
            }
          };
        }(e), t = n.name, o = n.tag, i = n.defaultContext, s = n.propsDef, u = n.eligible, f = n.children, d = Rt(window), v = {}, g = [], w = function() {
          if (function(P) {
            try {
              return qr(window.name).name === P;
            } catch {
            }
            return !1;
          }(t)) {
            var y = fi().payload;
            if (y.tag === o && on(y.childDomainMatch, ee())) return !0;
          }
          return !1;
        }, p = Wn(function() {
          if (w()) {
            if (window.xprops)
              throw delete d.components[o], new Error("Can not register " + t + " as child - child already registered");
            var y = function(P) {
              var T = P.tag, x = P.propsDef, W = P.autoResize, q = P.allowedParentDomains, I = [], j = fi(), _ = j.parent, Z = j.payload, F = _.win, ie = _.domain, ne, G = new S(), U = Z.version, oe = Z.uid, X = Z.exports, be = Z.context, yn = Z.props;
              if (!function(re, ze) {
                if (!/_/.test(re) || !/_/.test("10_3_3")) throw new Error("Versions are in an invalid format (" + re + ", 10_3_3)");
                return re.split("_")[0] === "10_3_3".split("_")[0];
              }(U)) throw new Error("Parent window has zoid version " + U + ", child window has version 10_3_3");
              var cn = X.show, Mn = X.hide, zn = X.close, Cn = X.onError, Fn = X.checkClose, Ln = X.export, Zn = X.resize, jn = X.init, wn = function() {
                return F;
              }, Xn = function() {
                return ie;
              }, Un = function(re) {
                return I.push(re), {
                  cancel: function() {
                    I.splice(I.indexOf(re), 1);
                  }
                };
              }, $n = function(re) {
                return Zn.fireAndForget({
                  width: re.width,
                  height: re.height
                });
              }, Qn = function(re) {
                return G.resolve(re), Ln(re);
              }, kn = function(re) {
                var ze = (re === void 0 ? {} : re).anyParent, Re = [], Fe = ne.parent;
                if (ze === void 0 && (ze = !Fe), !ze && !Fe) throw new Error("No parent found for " + T + " child");
                for (var ye = 0, Ye = Dn(window); ye < Ye.length; ye++) {
                  var _e = Ye[ye];
                  if (ge(_e)) {
                    var Ae = rn(_e).xprops;
                    if (Ae && wn() === Ae.getParent()) {
                      var fn = Ae.parent;
                      if (ze || !Fe || fn && fn.uid === Fe.uid) {
                        var ke = si(_e, function(mn) {
                          return mn.exports;
                        });
                        Re.push({
                          props: Ae,
                          exports: ke
                        });
                      }
                    }
                  }
                }
                return Re;
              }, te = function(re, ze, Re) {
                Re === void 0 && (Re = !1);
                var Fe = function(Ye, _e, Ae, fn, ke, mn) {
                  mn === void 0 && (mn = !1);
                  for (var Nn = {}, ft = 0, lt = Object.keys(Ae); ft < lt.length; ft++) {
                    var et = lt[ft], en = _e[et], Ct = en && en.trustedDomains && en.trustedDomains.length > 0 ? en.trustedDomains.reduce(function(nr, It) {
                      return nr || on(It, ee(window));
                    }, !1) : fn === ee(window) || ge(Ye);
                    if ((!en || !en.sameDomain || Ct) && (!en || !en.trustedDomains || Ct)) {
                      var Nt = li(_e, 0, et, Ae[et], ke);
                      Nn[et] = Nt, en && en.alias && !Nn[en.alias] && (Nn[en.alias] = Nt);
                    }
                  }
                  if (!mn) for (var ht = 0, er = Object.keys(_e); ht < er.length; ht++) {
                    var xt = er[ht];
                    Ae.hasOwnProperty(xt) || (Nn[xt] = li(_e, 0, xt, void 0, ke));
                  }
                  return Nn;
                }(F, x, re, ze, {
                  tag: T,
                  show: cn,
                  hide: Mn,
                  close: zn,
                  focus: $a,
                  onError: Cn,
                  resize: $n,
                  getSiblings: kn,
                  onProps: Un,
                  getParent: wn,
                  getParentDomain: Xn,
                  uid: oe,
                  export: Qn
                }, Re);
                ne ? ct(ne, Fe) : ne = Fe;
                for (var ye = 0; ye < I.length; ye++) (0, I[ye])(ne);
              }, dn = function(re) {
                return S.try(function() {
                  return te(re, ie, !0);
                });
              };
              return {
                init: function() {
                  return S.try(function() {
                    var re = "";
                    return ge(F) && (re = function(ze) {
                      var Re = ze.componentName, Fe = ze.parentComponentWindow, ye = ci({
                        data: qr(window.name).serializedInitialPayload,
                        sender: {
                          win: Fe
                        },
                        basic: !0
                      }), Ye = ye.sender;
                      if (ye.reference.type === "uid" || ye.metaData.windowRef.type === "global") {
                        var _e = di({
                          name: Re,
                          serializedPayload: ui({
                            data: ye.data,
                            metaData: {
                              windowRef: Ua(Fe)
                            },
                            sender: {
                              domain: Ye.domain
                            },
                            receiver: {
                              win: window,
                              domain: ee()
                            },
                            basic: !0
                          }).serializedData
                        });
                        return window.name = _e, _e;
                      }
                    }({
                      componentName: P.name,
                      parentComponentWindow: F
                    }) || ""), Rt(window).exports = P.exports({
                      getExports: function() {
                        return G;
                      }
                    }), function(ze, Re) {
                      if (!on(ze, Re)) throw new Error("Can not be rendered by domain: " + Re);
                    }(q, ie), Bo(F), function() {
                      window.addEventListener("beforeunload", function() {
                        Fn.fireAndForget();
                      }), window.addEventListener("unload", function() {
                        Fn.fireAndForget();
                      }), ho(F, function() {
                        hi();
                      });
                    }(), jn({
                      name: re,
                      updateProps: dn,
                      close: hi
                    });
                  }).then(function() {
                    return (re = W.width, ze = re !== void 0 && re, Re = W.height, Fe = Re !== void 0 && Re, ye = W.element, Co(ye === void 0 ? "body" : ye).catch(pe).then(function(Ye) {
                      return {
                        width: ze,
                        height: Fe,
                        element: Ye
                      };
                    })).then(function(Ye) {
                      var _e = Ye.width, Ae = Ye.height, fn = Ye.element;
                      fn && (_e || Ae) && be !== Ee.POPUP && Wo(fn, function(ke) {
                        $n({
                          width: _e ? ke.width : void 0,
                          height: Ae ? ke.height : void 0
                        });
                      }, {
                        width: _e,
                        height: Ae
                      });
                    });
                    var re, ze, Re, Fe, ye;
                  }).catch(function(re) {
                    Cn(re);
                  });
                },
                getProps: function() {
                  return ne || (te(yn, ie), ne);
                }
              };
            }(n);
            return y.init(), y;
          }
        }), m = function y(P) {
          var T, x = "zoid-" + o + "-" + Ke(), W = P || {}, q = u({
            props: W
          }), I = q.eligible, j = q.reason, _ = W.onDestroy;
          W.onDestroy = function() {
            if (T && I && g.splice(g.indexOf(T), 1), _) return _.apply(void 0, arguments);
          };
          var Z = vi({
            uid: x,
            options: n
          });
          Z.init(), I ? Z.setProps(W) : W.onDestroy && W.onDestroy(), Vr.register(function(ne) {
            return Z.destroy(ne || new Error("zoid destroyed all components"));
          });
          var F = function(ne) {
            var G = (ne === void 0 ? {} : ne).decorate;
            return y((G === void 0 ? Ra : G)(W));
          }, ie = function(ne, G, U) {
            return S.try(function() {
              if (!I) {
                var oe = new Error(j || t + " component is not eligible");
                return Z.destroy(oe).then(function() {
                  throw oe;
                });
              }
              if (!Jn(ne)) throw new Error("Must pass window to renderTo");
              return function(X, be) {
                return S.try(function() {
                  if (X.window) return Tt(X.window).getType();
                  if (be) {
                    if (be !== Ee.IFRAME && be !== Ee.POPUP) throw new Error("Unrecognized context: " + be);
                    return be;
                  }
                  return i;
                });
              }(W, U);
            }).then(function(oe) {
              if (G = function(X, be) {
                if (be) {
                  if (typeof be != "string" && !gr(be)) throw new TypeError("Expected string or element selector to be passed");
                  return be;
                }
                if (X === Ee.POPUP) return "body";
                throw new Error("Expected element to be passed to render iframe");
              }(oe, G), ne !== window && typeof G != "string") throw new Error("Must pass string element when rendering to another window");
              return Z.render({
                target: ne,
                container: G,
                context: oe,
                rerender: function() {
                  var X = F();
                  return ct(T, X), X.renderTo(ne, G, U);
                }
              });
            }).catch(function(oe) {
              return Z.destroy(oe).then(function() {
                throw oe;
              });
            });
          };
          return T = O({}, Z.getExports(), Z.getHelpers(), function() {
            for (var ne = f(), G = {}, U = function() {
              var be = X[oe], yn = ne[be];
              G[be] = function(cn) {
                var Mn = Z.getProps(), zn = O({}, cn, {
                  parent: {
                    uid: x,
                    props: Mn,
                    export: Z.export
                  }
                });
                return yn(zn);
              };
            }, oe = 0, X = Object.keys(ne); oe < X.length; oe++) U();
            return G;
          }(), {
            isEligible: function() {
              return I;
            },
            clone: F,
            render: function(ne, G) {
              return ie(window, ne, G);
            },
            renderTo: function(ne, G, U) {
              return ie(ne, G, U);
            }
          }), I && g.push(T), T;
        };
        if (p(), function() {
          var y = Tn("zoid_allow_delegate_" + t, function() {
            return !0;
          }), P = Tn("zoid_delegate_" + t, function(T) {
            var x = T.data;
            return {
              parent: vi({
                uid: x.uid,
                options: n,
                overrides: x.overrides,
                parentWin: T.source
              })
            };
          });
          Gr.register(y.cancel), Gr.register(P.cancel);
        }(), d.components = d.components || {}, d.components[o]) throw new Error("Can not register multiple components with the same tag: " + o);
        return d.components[o] = !0, {
          init: m,
          instances: g,
          driver: function(y, P) {
            var T = {
              react: Ba,
              angular: Va,
              vue: qa,
              vue3: Ha,
              angular2: Ga
            };
            if (!T[y]) throw new Error("Could not find driver for framework: " + y);
            return v[y] || (v[y] = T[y].register(o, s, m, P)), v[y];
          },
          isChild: w,
          canRenderTo: function(y) {
            return vn(y, "zoid_allow_delegate_" + t).then(function(P) {
              return P.data;
            }).catch(function() {
              return !1;
            });
          },
          registerChild: p
        };
      }
      var Za = function(e) {
        (function() {
          gn().initialized || (gn().initialized = !0, s = (i = {
            on: Tn,
            send: vn
          }).on, u = i.send, (f = gn()).receiveMessage = f.receiveMessage || function(d) {
            return $r(d, {
              on: s,
              send: u
            });
          }, function(d) {
            var v = d.on, g = d.send;
            ue().getOrSet("postMessageListener", function() {
              return Io(window, "message", function(w) {
                (function(p, m) {
                  var y = m.on, P = m.send;
                  S.try(function() {
                    var T = p.source || p.sourceElement, x = p.origin || p.originalEvent && p.originalEvent.origin, W = p.data;
                    if (x === "null" && (x = "file://"), T) {
                      if (!x) throw new Error("Post message did not have origin domain");
                      $r({
                        source: T,
                        origin: x,
                        data: W
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
            on: Tn,
            send: vn
          }), Zo({
            on: Tn,
            send: vn,
            receiveMessage: $r
          }), function(d) {
            var v = d.on, g = d.send;
            ue("builtinListeners").getOrSet("helloListener", function() {
              var w = v("postrobot_hello", {
                domain: "*"
              }, function(m) {
                return jo(m.source, {
                  domain: m.origin
                }), {
                  instanceID: Lo()
                };
              }), p = yt();
              return p && Wr(p, {
                send: g
              }).catch(function(m) {
              }), w;
            });
          }({
            on: Tn,
            send: vn
          }));
          var i, s, u, f;
        })();
        var n = Ya(e), t = function(i) {
          return n.init(i);
        };
        t.driver = function(i, s) {
          return n.driver(i, s);
        }, t.isChild = function() {
          return n.isChild();
        }, t.canRenderTo = function(i) {
          return n.canRenderTo(i);
        }, t.instances = n.instances;
        var o = n.registerChild();
        return o && (window.xprops = t.xprops = o.getProps()), t;
      };
      function wi(e) {
        An && An.destroyBridges();
        var n = Vr.all(e);
        return Vr = Vt(), n;
      }
      var mi = wi;
      function Xa(e) {
        return mi(), delete window.__zoid_10_3_3__, function() {
          (function() {
            for (var t = ue("responseListeners"), o = 0, i = t.keys(); o < i.length; o++) {
              var s = i[o], u = t.get(s);
              u && (u.cancelled = !0), t.del(s);
            }
          })(), (n = ue().get("postMessageListener")) && n.cancel();
          var n;
          delete window.__post_robot_11_0_0__;
        }(), Gr.all(e);
      }
    }]);
  });
})(ba);
var Pa = ba.exports;
const Hi = Pa.EVENT, pt = {
  VISIBLE: "zoid-visible",
  INVISIBLE: "zoid-invisible"
};
function Ku({
  uid: r,
  frame: a,
  prerenderFrame: c,
  doc: h,
  props: l,
  event: E,
  dimensions: C
}) {
  const { width: O, height: V } = C, { top: $ = 0, left: b = 0 } = l;
  if (!a || !c)
    return;
  const L = h.createElement("div");
  L.setAttribute("id", r);
  const M = h.createElement("style");
  return l.cspNonce && M.setAttribute("nonce", l.cspNonce), M.appendChild(
    h.createTextNode(`
          #${r} {
              display: inline-block;
              position: absolute;
              width: ${O};
              height: ${V};
              z-index: 1049;
              border: none;
              top: ${$}px;
              left: ${b}px;
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

          #${r} > iframe.${pt.INVISIBLE} {
              opacity: 0;
          }

          #${r} > iframe.${pt.VISIBLE} {
              opacity: 1;
        }
      `)
  ), L.appendChild(a), L.appendChild(c), L.appendChild(M), c.classList.add(pt.INVISIBLE), a.classList.add(pt.INVISIBLE), E.on(Hi.RENDERED, () => {
    setTimeout(() => {
      a.classList.remove(pt.INVISIBLE), a.classList.add(pt.VISIBLE);
    }, 100), setTimeout(() => {
      c.remove();
    }, 1);
  }), E.on(Hi.RESIZE, ({ width: B, height: he }) => {
    typeof B == "number" && (L.style.width = `${B}px`), typeof he == "number" && (L.style.height = `${he}px`);
  }), L;
}
function Yu(r) {
  return Pa.create({
    dimensions: {
      width: "100%",
      height: "100%"
    },
    tag: `wta${r}`,
    url: ({ props: a }) => a.appConfig.sdkBaseUrl,
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
    containerTemplate: Ku
  });
}
function Zu(r) {
  return Yu(r.id)(r);
}
function Xu({ video: r, adContainer: a, trackingUrl: c, interval: h }) {
  const l = bn(0);
  r.addEventListener("timeupdate", () => {
    l.value = r.currentTime;
  }), bn({}), bn(), bn(h || 1e3), bn();
  const E = Gu(), C = bn(!1), O = bn(), V = Math.random().toString(36).slice(6);
  function $({ icons: qe }) {
    return {
      id: V,
      appConfig: {
        sdkBaseUrl: Ji("https://cdn.jsdelivr.net/gh/sigmaott/sigma-ssai-web-sdk/build/dist/wta/index.html", { id: V })
      },
      icons: qe
    };
  }
  const b = Zu($({
    icons: []
  }));
  b.render(a), b.hide(), a.style.display = "none", Ou(() => {
    var qe;
    if (O.value) {
      const He = ((qe = O.value) == null ? void 0 : qe.icons) || [];
      a.style.display = "block", b.updateProps($({
        icons: He
      })), b.show();
    } else
      a.style.display = "none", b.hide();
  });
  const L = bn([]), M = bn(), B = bn([]);
  function he() {
    return C.value = !1, async (qe, He) => {
      if (M.value = He.frag.sn, !qe !== window.Hls.Events.FRAG_CHANGED) {
        for (const De of L.value)
          if (De.sn === He.frag.sn)
            for (const Oe of B.value) {
              if (Oe.tracked)
                continue;
              O.value = Oe;
              const Se = Oe.trackingEvents.find((Te) => Te.eventType === De.value.event);
              Se && lu(async () => {
                E.trigger(Se), await Promise.all(Se.beaconUrls.map((Te) => _t(Ai(Te)))), De.value.event === "complete" && (O.value = void 0, L.value = [], Oe.tracked = !0);
              }, De.time * 1e3);
            }
      }
    };
  }
  function Qe() {
    _t(Qi(c)).then(({ data: qe, error: He }) => {
      if (He) {
        console.error("Cannot get tracking data", He);
        return;
      }
      for (const De of (qe == null ? void 0 : qe.avails) || [])
        for (const Pe of De.ads) {
          const Oe = `${De.id}_${Pe.id}_${Pe.startTimeInSeconds}`;
          B.value.find((Te) => Te.key === Oe) || B.value.push({
            ...Pe,
            key: Oe,
            tracked: !1
          });
        }
    });
  }
  function S() {
    return async (qe, He) => {
      function De(Se) {
        for (let Te = 0; Te < Se.length; Te++)
          if (Se[Te] === 0)
            return Te;
        return Se.length;
      }
      const { start: Pe, sn: Oe } = He.frag;
      for (let Se = 0; Se < He.samples.length; Se++) {
        const Te = He.samples[Se], ee = Te.data, ge = Te.pts;
        if (String.fromCharCode.apply(null, ee.slice(0, 3)) !== "ID3" || String.fromCharCode.apply(null, ee.slice(10, 14)) !== "TXXX")
          continue;
        const In = ee.slice(21, ee.length), at = De(In), On = In.slice(at + 1, In.length), Dn = De(On), Gn = new TextDecoder("utf-8").decode(On.slice(0, Dn)), st = {
          sn: Oe,
          time: ge - Pe,
          value: Zr(Gn)
        };
        if (M.value && Oe < M.value)
          return;
        L.value.push(st), st.value.event === "start" && Qe();
      }
    };
  }
  function Vn() {
    O.value = void 0, L.value = [], E.off(() => {
    });
  }
  function it(qe) {
    qe.textTracks().on("addtrack", (He) => {
      const De = He.track;
      De.kind === "metadata" && (Qe(), De.on("cuechange", async () => {
        const Pe = De.activeCues[0];
        if (Pe && Pe.value.data) {
          const Oe = Zr(Pe.value.data);
          for (const Se of B.value) {
            if (Se.tracked)
              continue;
            O.value = Se;
            const Te = Se.trackingEvents.find((ee) => ee.eventType === Oe.event);
            Te && (E.trigger(Te), await Promise.all(Te.beaconUrls.map((ee) => _t(Ai(ee)))), Oe.event === "complete" && (O.value = void 0, L.value = [], Se.tracked = !0));
          }
        }
      }));
    });
  }
  function Pn(qe, He) {
    E.on((De) => {
      (qe === "*" || De.eventType === qe) && He(De);
    });
  }
  return {
    destroy: Vn,
    hlsHelper: {
      createHlsFragChanged: he,
      createHlsFragParsingMetadata: S
    },
    onEventTracking: Pn,
    attachVideojs: it
  };
}
async function Qu({ video: r, adContainer: a, url: c }) {
  const h = Yi(c), l = await fs(), E = await ls(l, r);
  if (!E)
    throw console.error("nonce is null"), new Error("nonce is null");
  const C = `${h.protocol}//${h.host}`, { data: O, error: V } = await _t(Qi(`${C}${h.pathname}`, {
    params: { "play_params.nonce": E }
  }));
  if (V || !O)
    throw console.error(V), new Error(V);
  const $ = `${C}${O.manifestUrl}`, b = `${C}${O.trackingUrl}`, { hlsHelper: L, onEventTracking: M, destroy: B, attachVideojs: he } = Xu({ video: r, adContainer: a, trackingUrl: b });
  function Qe(S) {
    S.on("hlsFragChanged", L.createHlsFragChanged()), S.on("hlsFragParsingMetadata", L.createHlsFragParsingMetadata());
  }
  return {
    manifestUrl: $,
    onEventTracking: M,
    destroy: B,
    sigmaPlayer: {
      attachVideojs: he,
      attachHls: Qe
    }
  };
}
export {
  ls as createPal,
  Qu as createSigmaDai,
  fs as loadPalSdk
};
