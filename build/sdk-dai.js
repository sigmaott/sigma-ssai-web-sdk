function Gi(t) {
  return new Promise((a, c) => {
    const h = document.createElement("script");
    h.async = !0, h.src = t, h.onload = a, h.onerror = c, document.body.appendChild(h);
  });
}
const ls = "https://imasdk.googleapis.com/pal/sdkloader/pal.js";
let hr = null;
function Di() {
  hr = null;
}
function hs() {
  const t = window;
  return t.goog && t.goog.pal ? Promise.resolve(t.goog.pal) : hr || (hr = Gi(ls).then(() => t.goog.pal), hr.then(Di).catch(Di), hr);
}
async function lt(t) {
  try {
    return {
      data: await t,
      error: null
    };
  } catch (a) {
    return {
      data: null,
      error: a
    };
  }
}
function ps(t, a) {
  let c, h, l, C = !1;
  function S() {
    return !0;
  }
  function V() {
    a.addEventListener("mousedown", (ue) => void b(ue)), a.addEventListener("touchstart", (ue) => void b(ue)), a.addEventListener("play", () => {
      C || (B(), C = !0);
    }), a.addEventListener("ended", () => void M()), a.addEventListener("error", () => {
      console.log(`Video error: ${a.error.message}`), M();
    });
    const $ = new t.ConsentSettings();
    return $.allowStorage = S(), c = new t.NonceLoader(), z();
  }
  async function z() {
    const $ = new t.NonceRequest();
    $.adWillAutoPlay = !0, $.adWillPlayMuted = !0, $.continuousPlayback = !1, $.descriptionUrl = "https://example.com", $.iconsSupported = !0, $.playerType = "Sample Player Type", $.playerVersion = "1.0", $.ppid = "Sample PPID", $.sessionId = "Sample SID", $.supportedApiFrameworks = "2,7,9", $.url = "https://developers.google.com/ad-manager/pal/html5", $.videoHeight = 480, $.videoWidth = 640, h = c.loadNonceManager($);
    const { data: ue, error: fn } = await lt(h);
    return fn ? (console.log(`Error generating nonce: ${fn}`), null) : (l = ue, l.getNonce());
  }
  function b($) {
    l && l.sendTouch($);
  }
  function B() {
    l && l.sendPlaybackStart();
  }
  function M() {
    l && l.sendPlaybackEnd();
  }
  return V();
}
const vs = /"(?:_|\\u0{2}5[Ff]){2}(?:p|\\u0{2}70)(?:r|\\u0{2}72)(?:o|\\u0{2}6[Ff])(?:t|\\u0{2}74)(?:o|\\u0{2}6[Ff])(?:_|\\u0{2}5[Ff]){2}"\s*:/, ws = /"(?:c|\\u0063)(?:o|\\u006[Ff])(?:n|\\u006[Ee])(?:s|\\u0073)(?:t|\\u0074)(?:r|\\u0072)(?:u|\\u0075)(?:c|\\u0063)(?:t|\\u0074)(?:o|\\u006[Ff])(?:r|\\u0072)"\s*:/, ms = /^\s*["[{]|^\s*-?\d{1,16}(\.\d{1,17})?([Ee][+-]?\d+)?\s*$/;
function gs(t, a) {
  if (t === "__proto__" || t === "constructor" && a && typeof a == "object" && "prototype" in a) {
    ys(t);
    return;
  }
  return a;
}
function ys(t) {
  console.warn(`[destr] Dropping "${t}" key to prevent prototype pollution.`);
}
function Ji(t, a = {}) {
  if (typeof t != "string")
    return t;
  const c = t.trim();
  if (
    // eslint-disable-next-line unicorn/prefer-at
    t[0] === '"' && t.endsWith('"') && !t.includes("\\")
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
  if (!ms.test(t)) {
    if (a.strict)
      throw new SyntaxError("[destr] Invalid JSON");
    return t;
  }
  try {
    if (vs.test(t) || ws.test(t)) {
      if (a.strict)
        throw new Error("[destr] Possible prototype pollution");
      return JSON.parse(t, gs);
    }
    return JSON.parse(t);
  } catch (h) {
    if (a.strict)
      throw h;
    return t;
  }
}
const Es = /#/g, bs = /&/g, Ps = /\//g, Ss = /=/g, io = /\+/g, Os = /%5e/gi, Rs = /%60/gi, Ts = /%7c/gi, Cs = /%20/gi;
function Ns(t) {
  return encodeURI("" + t).replace(Ts, "|");
}
function kt(t) {
  return Ns(typeof t == "string" ? t : JSON.stringify(t)).replace(io, "%2B").replace(Cs, "+").replace(Es, "%23").replace(bs, "%26").replace(Rs, "`").replace(Os, "^").replace(Ps, "%2F");
}
function Qt(t) {
  return kt(t).replace(Ss, "%3D");
}
function Ki(t = "") {
  try {
    return decodeURIComponent("" + t);
  } catch {
    return "" + t;
  }
}
function Is(t) {
  return Ki(t.replace(io, " "));
}
function xs(t) {
  return Ki(t.replace(io, " "));
}
function Ds(t = "") {
  const a = {};
  t[0] === "?" && (t = t.slice(1));
  for (const c of t.split("&")) {
    const h = c.match(/([^=]+)=?(.*)/) || [];
    if (h.length < 2)
      continue;
    const l = Is(h[1]);
    if (l === "__proto__" || l === "constructor")
      continue;
    const E = xs(h[2] || "");
    a[l] === void 0 ? a[l] = E : Array.isArray(a[l]) ? a[l].push(E) : a[l] = [a[l], E];
  }
  return a;
}
function _s(t, a) {
  return (typeof a == "number" || typeof a == "boolean") && (a = String(a)), a ? Array.isArray(a) ? a.map((c) => `${Qt(t)}=${kt(c)}`).join("&") : `${Qt(t)}=${kt(a)}` : Qt(t);
}
function Ws(t) {
  return Object.keys(t).filter((a) => t[a] !== void 0).map((a) => _s(a, t[a])).filter(Boolean).join("&");
}
const As = /^[\s\w\0+.-]{2,}:([/\\]{1,2})/, Ms = /^[\s\w\0+.-]{2,}:([/\\]{2})?/, zs = /^([/\\]\s*){2,}[^/\\]/, Fs = /^\.?\//;
function Yi(t, a = {}) {
  return typeof a == "boolean" && (a = { acceptRelative: a }), a.strict ? As.test(t) : Ms.test(t) || (a.acceptRelative ? zs.test(t) : !1);
}
function Ls(t = "", a) {
  return t.endsWith("/");
}
function js(t = "", a) {
  return (Ls(t) ? t.slice(0, -1) : t) || "/";
}
function Us(t = "", a) {
  return t.endsWith("/") ? t : t + "/";
}
function Bs(t, a) {
  if (qs(a) || Yi(t))
    return t;
  const c = js(a);
  return t.startsWith(c) ? t : Zi(c, t);
}
function $s(t, a) {
  const c = Qi(t), h = { ...Ds(c.search), ...a };
  return c.search = Ws(h), Vs(c);
}
function qs(t) {
  return !t || t === "/";
}
function Hs(t) {
  return t && t !== "/";
}
function Zi(t, ...a) {
  let c = t || "";
  for (const h of a.filter((l) => Hs(l)))
    if (c) {
      const l = h.replace(Fs, "");
      c = Us(c) + l;
    } else
      c = h;
  return c;
}
const Xi = Symbol.for("ufo:protocolRelative");
function Qi(t = "", a) {
  const c = t.match(
    /^[\s\0]*(blob:|data:|javascript:|vbscript:)(.*)/i
  );
  if (c) {
    const [, B, M = ""] = c;
    return {
      protocol: B.toLowerCase(),
      pathname: M,
      href: B + M,
      auth: "",
      host: "",
      search: "",
      hash: ""
    };
  }
  if (!Yi(t, { acceptRelative: !0 }))
    return _i(t);
  const [, h = "", l, E = ""] = t.replace(/\\/g, "/").match(/^[\s\0]*([\w+.-]{2,}:)?\/\/([^/@]+@)?(.*)/) || [], [, C = "", S = ""] = E.match(/([^#/?]*)(.*)?/) || [], { pathname: V, search: z, hash: b } = _i(
    S.replace(/\/(?=[A-Za-z]:)/, "")
  );
  return {
    protocol: h.toLowerCase(),
    auth: l ? l.slice(0, Math.max(0, l.length - 1)) : "",
    host: C,
    pathname: V,
    search: z,
    hash: b,
    [Xi]: !h
  };
}
function _i(t = "") {
  const [a = "", c = "", h = ""] = (t.match(/([^#?]*)(\?[^#]*)?(#.*)?/) || []).splice(1);
  return {
    pathname: a,
    search: c,
    hash: h
  };
}
function Vs(t) {
  const a = t.pathname || "", c = t.search ? (t.search.startsWith("?") ? "" : "?") + t.search : "", h = t.hash || "", l = t.auth ? t.auth + "@" : "", E = t.host || "";
  return (t.protocol || t[Xi] ? (t.protocol || "") + "//" : "") + l + E + a + c + h;
}
class Gs extends Error {
  constructor(a, c) {
    super(a, c), this.name = "FetchError", c != null && c.cause && !this.cause && (this.cause = c.cause);
  }
}
function Js(t) {
  var V, z, b, B, M;
  const a = ((V = t.error) == null ? void 0 : V.message) || ((z = t.error) == null ? void 0 : z.toString()) || "", c = ((b = t.request) == null ? void 0 : b.method) || ((B = t.options) == null ? void 0 : B.method) || "GET", h = ((M = t.request) == null ? void 0 : M.url) || String(t.request) || "/", l = `[${c}] ${JSON.stringify(h)}`, E = t.response ? `${t.response.status} ${t.response.statusText}` : "<no response>", C = `${l}: ${E}${a ? ` ${a}` : ""}`, S = new Gs(
    C,
    t.error ? { cause: t.error } : void 0
  );
  for (const $ of ["request", "options", "response"])
    Object.defineProperty(S, $, {
      get() {
        return t[$];
      }
    });
  for (const [$, ue] of [
    ["data", "_data"],
    ["status", "status"],
    ["statusCode", "status"],
    ["statusText", "statusText"],
    ["statusMessage", "statusText"]
  ])
    Object.defineProperty(S, $, {
      get() {
        return t.response && t.response[ue];
      }
    });
  return S;
}
const Ks = new Set(
  Object.freeze(["PATCH", "POST", "PUT", "DELETE"])
);
function Wi(t = "GET") {
  return Ks.has(t.toUpperCase());
}
function Ys(t) {
  if (t === void 0)
    return !1;
  const a = typeof t;
  return a === "string" || a === "number" || a === "boolean" || a === null ? !0 : a !== "object" ? !1 : Array.isArray(t) ? !0 : t.buffer ? !1 : t.constructor && t.constructor.name === "Object" || typeof t.toJSON == "function";
}
const Zs = /* @__PURE__ */ new Set([
  "image/svg",
  "application/xml",
  "application/xhtml",
  "application/html"
]), Xs = /^application\/(?:[\w!#$%&*.^`~-]*\+)?json(;.+)?$/i;
function Qs(t = "") {
  if (!t)
    return "json";
  const a = t.split(";").shift() || "";
  return Xs.test(a) ? "json" : Zs.has(a) || a.startsWith("text/") ? "text" : "blob";
}
function ks(t, a, c = globalThis.Headers) {
  const h = {
    ...a,
    ...t
  };
  if (a != null && a.params && (t != null && t.params) && (h.params = {
    ...a == null ? void 0 : a.params,
    ...t == null ? void 0 : t.params
  }), a != null && a.query && (t != null && t.query) && (h.query = {
    ...a == null ? void 0 : a.query,
    ...t == null ? void 0 : t.query
  }), a != null && a.headers && (t != null && t.headers)) {
    h.headers = new c((a == null ? void 0 : a.headers) || {});
    for (const [l, E] of new c((t == null ? void 0 : t.headers) || {}))
      h.headers.set(l, E);
  }
  return h;
}
const eu = /* @__PURE__ */ new Set([
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
]), nu = /* @__PURE__ */ new Set([101, 204, 205, 304]);
function ki(t = {}) {
  const {
    fetch: a = globalThis.fetch,
    Headers: c = globalThis.Headers,
    AbortController: h = globalThis.AbortController
  } = t;
  async function l(S) {
    const V = S.error && S.error.name === "AbortError" && !S.options.timeout || !1;
    if (S.options.retry !== !1 && !V) {
      let b;
      typeof S.options.retry == "number" ? b = S.options.retry : b = Wi(S.options.method) ? 0 : 1;
      const B = S.response && S.response.status || 500;
      if (b > 0 && (Array.isArray(S.options.retryStatusCodes) ? S.options.retryStatusCodes.includes(B) : eu.has(B))) {
        const M = S.options.retryDelay || 0;
        return M > 0 && await new Promise(($) => setTimeout($, M)), E(S.request, {
          ...S.options,
          retry: b - 1
        });
      }
    }
    const z = Js(S);
    throw Error.captureStackTrace && Error.captureStackTrace(z, E), z;
  }
  const E = async function(V, z = {}) {
    var $;
    const b = {
      request: V,
      options: ks(z, t.defaults, c),
      response: void 0,
      error: void 0
    };
    b.options.method = ($ = b.options.method) == null ? void 0 : $.toUpperCase(), b.options.onRequest && await b.options.onRequest(b), typeof b.request == "string" && (b.options.baseURL && (b.request = Bs(b.request, b.options.baseURL)), (b.options.query || b.options.params) && (b.request = $s(b.request, {
      ...b.options.params,
      ...b.options.query
    }))), b.options.body && Wi(b.options.method) && (Ys(b.options.body) ? (b.options.body = typeof b.options.body == "string" ? b.options.body : JSON.stringify(b.options.body), b.options.headers = new c(b.options.headers || {}), b.options.headers.has("content-type") || b.options.headers.set("content-type", "application/json"), b.options.headers.has("accept") || b.options.headers.set("accept", "application/json")) : (
      // ReadableStream Body
      ("pipeTo" in b.options.body && typeof b.options.body.pipeTo == "function" || // Node.js Stream Body
      typeof b.options.body.pipe == "function") && ("duplex" in b.options || (b.options.duplex = "half"))
    ));
    let B;
    if (!b.options.signal && b.options.timeout) {
      const ue = new h();
      B = setTimeout(
        () => ue.abort(),
        b.options.timeout
      ), b.options.signal = ue.signal;
    }
    try {
      b.response = await a(
        b.request,
        b.options
      );
    } catch (ue) {
      return b.error = ue, b.options.onRequestError && await b.options.onRequestError(b), await l(b);
    } finally {
      B && clearTimeout(B);
    }
    if (b.response.body && !nu.has(b.response.status) && b.options.method !== "HEAD") {
      const ue = (b.options.parseResponse ? "json" : b.options.responseType) || Qs(b.response.headers.get("content-type") || "");
      switch (ue) {
        case "json": {
          const fn = await b.response.text(), O = b.options.parseResponse || Ji;
          b.response._data = O(fn);
          break;
        }
        case "stream": {
          b.response._data = b.response.body;
          break;
        }
        default:
          b.response._data = await b.response[ue]();
      }
    }
    return b.options.onResponse && await b.options.onResponse(b), !b.options.ignoreResponseError && b.response.status >= 400 && b.response.status < 600 ? (b.options.onResponseError && await b.options.onResponseError(b), await l(b)) : b.response;
  }, C = async function(V, z) {
    return (await E(V, z))._data;
  };
  return C.raw = E, C.native = (...S) => a(...S), C.create = (S = {}) => ki({
    ...t,
    defaults: {
      ...t.defaults,
      ...S
    }
  }), C;
}
const ao = function() {
  if (typeof globalThis < "u")
    return globalThis;
  if (typeof self < "u")
    return self;
  if (typeof window < "u")
    return window;
  if (typeof global < "u")
    return global;
  throw new Error("unable to locate global object");
}(), ru = ao.fetch || (() => Promise.reject(new Error("[ofetch] global.fetch is not supported!"))), tu = ao.Headers, ou = ao.AbortController, ea = ki({ fetch: ru, Headers: tu, AbortController: ou }), na = ea, iu = ea.create({
  credentials: "omit",
  onResponseError({ response: t, error: a }) {
    console.log("[LOG] ~ error:", a);
  },
  onRequest: ({ options: t, request: a }) => {
    const c = t.token;
    c && (t.headers = t.headers || {}, t.headers.Authorization = `${c}`);
  },
  onResponse({ response: t, options: a }) {
  }
}), au = (t) => (a, c) => (t.set(a, c), c), Ai = Number.MAX_SAFE_INTEGER === void 0 ? 9007199254740991 : Number.MAX_SAFE_INTEGER, ra = 536870912, Mi = ra * 2, su = (t, a) => (c) => {
  const h = a.get(c);
  let l = h === void 0 ? c.size : h < Mi ? h + 1 : 0;
  if (!c.has(l))
    return t(c, l);
  if (c.size < ra) {
    for (; c.has(l); )
      l = Math.floor(Math.random() * Mi);
    return t(c, l);
  }
  if (c.size > Ai)
    throw new Error("Congratulations, you created a collection of unique numbers which uses all available integers!");
  for (; c.has(l); )
    l = Math.floor(Math.random() * Ai);
  return t(c, l);
}, ta = /* @__PURE__ */ new WeakMap(), uu = au(ta), it = su(uu, ta), cu = (t) => t.method !== void 0 && t.method === "call", du = (t) => typeof t.id == "number" && typeof t.result == "boolean", fu = (t) => {
  const a = /* @__PURE__ */ new Map([[0, () => {
  }]]), c = /* @__PURE__ */ new Map([[0, () => {
  }]]), h = /* @__PURE__ */ new Map(), l = new Worker(t);
  return l.addEventListener("message", ({ data: z }) => {
    if (cu(z)) {
      const { params: { timerId: b, timerType: B } } = z;
      if (B === "interval") {
        const M = a.get(b);
        if (typeof M === void 0)
          throw new Error("The timer is in an undefined state.");
        if (typeof M == "number") {
          const $ = h.get(M);
          if ($ === void 0 || $.timerId !== b || $.timerType !== B)
            throw new Error("The timer is in an undefined state.");
        } else typeof M == "function" && M();
      } else if (B === "timeout") {
        const M = c.get(b);
        if (typeof M === void 0)
          throw new Error("The timer is in an undefined state.");
        if (typeof M == "number") {
          const $ = h.get(M);
          if ($ === void 0 || $.timerId !== b || $.timerType !== B)
            throw new Error("The timer is in an undefined state.");
        } else typeof M == "function" && (M(), c.delete(b));
      }
    } else if (du(z)) {
      const { id: b } = z, B = h.get(b);
      if (B === void 0)
        throw new Error("The timer is in an undefined state.");
      const { timerId: M, timerType: $ } = B;
      h.delete(b), $ === "interval" ? a.delete(M) : c.delete(M);
    } else {
      const { error: { message: b } } = z;
      throw new Error(b);
    }
  }), {
    clearInterval: (z) => {
      if (typeof a.get(z) == "function") {
        const b = it(h);
        h.set(b, { timerId: z, timerType: "interval" }), a.set(z, b), l.postMessage({
          id: b,
          method: "clear",
          params: { timerId: z, timerType: "interval" }
        });
      }
    },
    clearTimeout: (z) => {
      if (typeof c.get(z) == "function") {
        const b = it(h);
        h.set(b, { timerId: z, timerType: "timeout" }), c.set(z, b), l.postMessage({
          id: b,
          method: "clear",
          params: { timerId: z, timerType: "timeout" }
        });
      }
    },
    setInterval: (z, b = 0, ...B) => {
      const M = it(a);
      return a.set(M, () => {
        z(...B), typeof a.get(M) == "function" && l.postMessage({
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
    setTimeout: (z, b = 0, ...B) => {
      const M = it(c);
      return c.set(M, () => z(...B)), l.postMessage({
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
}, lu = (t, a) => {
  let c = null;
  return () => {
    if (c !== null)
      return c;
    const h = new Blob([a], { type: "application/javascript; charset=utf-8" }), l = URL.createObjectURL(h);
    return c = t(l), setTimeout(() => URL.revokeObjectURL(l)), c;
  };
}, hu = `(()=>{"use strict";const e=new Map,t=new Map,r=t=>{const r=e.get(t);return void 0!==r&&(clearTimeout(r),e.delete(t),!0)},s=e=>{const r=t.get(e);return void 0!==r&&(clearTimeout(r),t.delete(e),!0)},o=(e,t)=>{const r=performance.now(),s=e+t-r-performance.timeOrigin;return{expected:r+s,remainingDelay:s}},i=(e,t,r,s)=>{const o=r-performance.now();o>0?e.set(t,setTimeout(i,o,e,t,r,s)):(e.delete(t),postMessage({id:null,method:"call",params:{timerId:t,timerType:s}}))};addEventListener("message",(n=>{let{data:a}=n;try{if("clear"===a.method){const{id:e,params:{timerId:t,timerType:o}}=a;if("interval"===o)postMessage({id:e,result:r(t)});else{if("timeout"!==o)throw new Error('The given type "'.concat(o,'" is not supported'));postMessage({id:e,result:s(t)})}}else{if("set"!==a.method)throw new Error('The given method "'.concat(a.method,'" is not supported'));{const{params:{delay:r,now:s,timerId:n,timerType:m}}=a;if("interval"===m)((t,r,s)=>{const{expected:n,remainingDelay:a}=o(t,s);e.set(r,setTimeout(i,a,e,r,n,"interval"))})(r,n,s);else{if("timeout"!==m)throw new Error('The given type "'.concat(m,'" is not supported'));((e,r,s)=>{const{expected:n,remainingDelay:a}=o(e,s);t.set(r,setTimeout(i,a,t,r,n,"timeout"))})(r,n,s)}}}}catch(e){postMessage({error:{message:e.message},id:a.id,result:null})}}))})();`, pu = lu(fu, hu), vu = (...t) => pu().setTimeout(...t);
/**
* @vue/shared v3.4.32
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
/*! #__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function wu(t, a) {
  const c = new Set(t.split(","));
  return (h) => c.has(h);
}
const mu = () => {
}, oa = Object.assign, gu = Object.prototype.hasOwnProperty, ht = (t, a) => gu.call(t, a), kn = Array.isArray, Fr = (t) => ia(t) === "[object Map]", yu = (t) => typeof t == "string", jr = (t) => typeof t == "symbol", vt = (t) => t !== null && typeof t == "object", Eu = Object.prototype.toString, ia = (t) => Eu.call(t), aa = (t) => ia(t).slice(8, -1), so = (t) => yu(t) && t !== "NaN" && t[0] !== "-" && "" + parseInt(t, 10) === t, bu = (t) => {
  const a = /* @__PURE__ */ Object.create(null);
  return (c) => a[c] || (a[c] = t(c));
}, Pu = bu((t) => t.charAt(0).toUpperCase() + t.slice(1)), mr = (t, a) => !Object.is(t, a);
var Ke = {};
function vr(t, ...a) {
  console.warn(`[Vue warn] ${t}`, ...a);
}
let Su;
function Ou(t, a = Su) {
  a && a.active && a.effects.push(t);
}
let er;
class eo {
  constructor(a, c, h, l) {
    this.fn = a, this.trigger = c, this.scheduler = h, this.active = !0, this.deps = [], this._dirtyLevel = 4, this._trackId = 0, this._runnings = 0, this._shouldSchedule = !1, this._depsLength = 0, Ou(this, l);
  }
  get dirty() {
    if (this._dirtyLevel === 2 || this._dirtyLevel === 3) {
      this._dirtyLevel = 1, ca();
      for (let a = 0; a < this._depsLength; a++) {
        const c = this.deps[a];
        if (c.computed && (Ru(c.computed), this._dirtyLevel >= 4))
          break;
      }
      this._dirtyLevel === 1 && (this._dirtyLevel = 0), da();
    }
    return this._dirtyLevel >= 4;
  }
  set dirty(a) {
    this._dirtyLevel = a ? 4 : 0;
  }
  run() {
    if (this._dirtyLevel = 0, !this.active)
      return this.fn();
    let a = $n, c = er;
    try {
      return $n = !0, er = this, this._runnings++, zi(this), this.fn();
    } finally {
      Fi(this), this._runnings--, er = c, $n = a;
    }
  }
  stop() {
    this.active && (zi(this), Fi(this), this.onStop && this.onStop(), this.active = !1);
  }
}
function Ru(t) {
  return t.value;
}
function zi(t) {
  t._trackId++, t._depsLength = 0;
}
function Fi(t) {
  if (t.deps.length > t._depsLength) {
    for (let a = t._depsLength; a < t.deps.length; a++)
      sa(t.deps[a], t);
    t.deps.length = t._depsLength;
  }
}
function sa(t, a) {
  const c = t.get(a);
  c !== void 0 && a._trackId !== c && (t.delete(a), t.size === 0 && t.cleanup());
}
function Tu(t, a) {
  t.effect instanceof eo && (t = t.effect.fn);
  const c = new eo(t, mu, () => {
    c.dirty && c.run();
  });
  c.run();
  const h = c.run.bind(c);
  return h.effect = c, h;
}
let $n = !0, no = 0;
const ua = [];
function ca() {
  ua.push($n), $n = !1;
}
function da() {
  const t = ua.pop();
  $n = t === void 0 ? !0 : t;
}
function uo() {
  no++;
}
function co() {
  for (no--; !no && ro.length; )
    ro.shift()();
}
function fa(t, a, c) {
  var h;
  if (a.get(t) !== t._trackId) {
    a.set(t, t._trackId);
    const l = t.deps[t._depsLength];
    l !== a ? (l && sa(l, t), t.deps[t._depsLength++] = a) : t._depsLength++, Ke.NODE_ENV !== "production" && ((h = t.onTrack) == null || h.call(t, oa({ effect: t }, c)));
  }
}
const ro = [];
function la(t, a, c) {
  var h;
  uo();
  for (const l of t.keys()) {
    let E;
    l._dirtyLevel < a && (E ?? (E = t.get(l) === l._trackId)) && (l._shouldSchedule || (l._shouldSchedule = l._dirtyLevel === 0), l._dirtyLevel = a), l._shouldSchedule && (E ?? (E = t.get(l) === l._trackId)) && (Ke.NODE_ENV !== "production" && ((h = l.onTrigger) == null || h.call(l, oa({ effect: l }, c))), l.trigger(), (!l._runnings || l.allowRecurse) && l._dirtyLevel !== 2 && (l._shouldSchedule = !1, l.scheduler && ro.push(l.scheduler)));
  }
  co();
}
const ha = (t, a) => {
  const c = /* @__PURE__ */ new Map();
  return c.cleanup = t, c.computed = a, c;
}, to = /* @__PURE__ */ new WeakMap(), nr = Symbol(Ke.NODE_ENV !== "production" ? "iterate" : ""), oo = Symbol(Ke.NODE_ENV !== "production" ? "Map key iterate" : "");
function hn(t, a, c) {
  if ($n && er) {
    let h = to.get(t);
    h || to.set(t, h = /* @__PURE__ */ new Map());
    let l = h.get(c);
    l || h.set(c, l = ha(() => h.delete(c))), fa(
      er,
      l,
      Ke.NODE_ENV !== "production" ? {
        target: t,
        type: a,
        key: c
      } : void 0
    );
  }
}
function qn(t, a, c, h, l, E) {
  const C = to.get(t);
  if (!C)
    return;
  let S = [];
  if (a === "clear")
    S = [...C.values()];
  else if (c === "length" && kn(t)) {
    const V = Number(h);
    C.forEach((z, b) => {
      (b === "length" || !jr(b) && b >= V) && S.push(z);
    });
  } else
    switch (c !== void 0 && S.push(C.get(c)), a) {
      case "add":
        kn(t) ? so(c) && S.push(C.get("length")) : (S.push(C.get(nr)), Fr(t) && S.push(C.get(oo)));
        break;
      case "delete":
        kn(t) || (S.push(C.get(nr)), Fr(t) && S.push(C.get(oo)));
        break;
      case "set":
        Fr(t) && S.push(C.get(nr));
        break;
    }
  uo();
  for (const V of S)
    V && la(
      V,
      4,
      Ke.NODE_ENV !== "production" ? {
        target: t,
        type: a,
        key: c,
        newValue: h,
        oldValue: l,
        oldTarget: E
      } : void 0
    );
  co();
}
const Cu = /* @__PURE__ */ wu("__proto__,__v_isRef,__isVue"), pa = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((t) => t !== "arguments" && t !== "caller").map((t) => Symbol[t]).filter(jr)
), Li = /* @__PURE__ */ Nu();
function Nu() {
  const t = {};
  return ["includes", "indexOf", "lastIndexOf"].forEach((a) => {
    t[a] = function(...c) {
      const h = se(this);
      for (let E = 0, C = this.length; E < C; E++)
        hn(h, "get", E + "");
      const l = h[a](...c);
      return l === -1 || l === !1 ? h[a](...c.map(se)) : l;
    };
  }), ["push", "pop", "shift", "unshift", "splice"].forEach((a) => {
    t[a] = function(...c) {
      ca(), uo();
      const h = se(this)[a].apply(this, c);
      return co(), da(), h;
    };
  }), t;
}
function Iu(t) {
  jr(t) || (t = String(t));
  const a = se(this);
  return hn(a, "has", t), a.hasOwnProperty(t);
}
class va {
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
      return h === (l ? E ? $u : ya : E ? Bu : ga).get(a) || // receiver is not the reactive proxy, but has the same prototype
      // this means the reciever is a user proxy of the reactive proxy
      Object.getPrototypeOf(a) === Object.getPrototypeOf(h) ? a : void 0;
    const C = kn(a);
    if (!l) {
      if (C && ht(Li, c))
        return Reflect.get(Li, c, h);
      if (c === "hasOwnProperty")
        return Iu;
    }
    const S = Reflect.get(a, c, h);
    return (jr(c) ? pa.has(c) : Cu(c)) || (l || hn(a, "get", c), E) ? S : pt(S) ? C && so(c) ? S : S.value : vt(S) ? l ? ba(S) : Ea(S) : S;
  }
}
class xu extends va {
  constructor(a = !1) {
    super(!1, a);
  }
  set(a, c, h, l) {
    let E = a[c];
    if (!this._isShallow) {
      const V = wr(E);
      if (!mt(h) && !wr(h) && (E = se(E), h = se(h)), !kn(a) && pt(E) && !pt(h))
        return V ? !1 : (E.value = h, !0);
    }
    const C = kn(a) && so(c) ? Number(c) < a.length : ht(a, c), S = Reflect.set(a, c, h, l);
    return a === se(l) && (C ? mr(h, E) && qn(a, "set", c, h, E) : qn(a, "add", c, h)), S;
  }
  deleteProperty(a, c) {
    const h = ht(a, c), l = a[c], E = Reflect.deleteProperty(a, c);
    return E && h && qn(a, "delete", c, void 0, l), E;
  }
  has(a, c) {
    const h = Reflect.has(a, c);
    return (!jr(c) || !pa.has(c)) && hn(a, "has", c), h;
  }
  ownKeys(a) {
    return hn(
      a,
      "iterate",
      kn(a) ? "length" : nr
    ), Reflect.ownKeys(a);
  }
}
class Du extends va {
  constructor(a = !1) {
    super(!0, a);
  }
  set(a, c) {
    return Ke.NODE_ENV !== "production" && vr(
      `Set operation on key "${String(c)}" failed: target is readonly.`,
      a
    ), !0;
  }
  deleteProperty(a, c) {
    return Ke.NODE_ENV !== "production" && vr(
      `Delete operation on key "${String(c)}" failed: target is readonly.`,
      a
    ), !0;
  }
}
const _u = /* @__PURE__ */ new xu(), Wu = /* @__PURE__ */ new Du(), fo = (t) => t, wt = (t) => Reflect.getPrototypeOf(t);
function at(t, a, c = !1, h = !1) {
  t = t.__v_raw;
  const l = se(t), E = se(a);
  c || (mr(a, E) && hn(l, "get", a), hn(l, "get", E));
  const { has: C } = wt(l), S = h ? fo : c ? lo : Lr;
  if (C.call(l, a))
    return S(t.get(a));
  if (C.call(l, E))
    return S(t.get(E));
  t !== l && t.get(a);
}
function st(t, a = !1) {
  const c = this.__v_raw, h = se(c), l = se(t);
  return a || (mr(t, l) && hn(h, "has", t), hn(h, "has", l)), t === l ? c.has(t) : c.has(t) || c.has(l);
}
function ut(t, a = !1) {
  return t = t.__v_raw, !a && hn(se(t), "iterate", nr), Reflect.get(t, "size", t);
}
function ji(t, a = !1) {
  !a && !mt(t) && !wr(t) && (t = se(t));
  const c = se(this);
  return wt(c).has.call(c, t) || (c.add(t), qn(c, "add", t, t)), this;
}
function Ui(t, a, c = !1) {
  !c && !mt(a) && !wr(a) && (a = se(a));
  const h = se(this), { has: l, get: E } = wt(h);
  let C = l.call(h, t);
  C ? Ke.NODE_ENV !== "production" && ma(h, l, t) : (t = se(t), C = l.call(h, t));
  const S = E.call(h, t);
  return h.set(t, a), C ? mr(a, S) && qn(h, "set", t, a, S) : qn(h, "add", t, a), this;
}
function Bi(t) {
  const a = se(this), { has: c, get: h } = wt(a);
  let l = c.call(a, t);
  l ? Ke.NODE_ENV !== "production" && ma(a, c, t) : (t = se(t), l = c.call(a, t));
  const E = h ? h.call(a, t) : void 0, C = a.delete(t);
  return l && qn(a, "delete", t, void 0, E), C;
}
function $i() {
  const t = se(this), a = t.size !== 0, c = Ke.NODE_ENV !== "production" ? Fr(t) ? new Map(t) : new Set(t) : void 0, h = t.clear();
  return a && qn(t, "clear", void 0, void 0, c), h;
}
function ct(t, a) {
  return function(h, l) {
    const E = this, C = E.__v_raw, S = se(C), V = a ? fo : t ? lo : Lr;
    return !t && hn(S, "iterate", nr), C.forEach((z, b) => h.call(l, V(z), V(b), E));
  };
}
function dt(t, a, c) {
  return function(...h) {
    const l = this.__v_raw, E = se(l), C = Fr(E), S = t === "entries" || t === Symbol.iterator && C, V = t === "keys" && C, z = l[t](...h), b = c ? fo : a ? lo : Lr;
    return !a && hn(
      E,
      "iterate",
      V ? oo : nr
    ), {
      // iterator protocol
      next() {
        const { value: B, done: M } = z.next();
        return M ? { value: B, done: M } : {
          value: S ? [b(B[0]), b(B[1])] : b(B),
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
function Bn(t) {
  return function(...a) {
    if (Ke.NODE_ENV !== "production") {
      const c = a[0] ? `on key "${a[0]}" ` : "";
      vr(
        `${Pu(t)} operation ${c}failed: target is readonly.`,
        se(this)
      );
    }
    return t === "delete" ? !1 : t === "clear" ? void 0 : this;
  };
}
function Au() {
  const t = {
    get(E) {
      return at(this, E);
    },
    get size() {
      return ut(this);
    },
    has: st,
    add: ji,
    set: Ui,
    delete: Bi,
    clear: $i,
    forEach: ct(!1, !1)
  }, a = {
    get(E) {
      return at(this, E, !1, !0);
    },
    get size() {
      return ut(this);
    },
    has: st,
    add(E) {
      return ji.call(this, E, !0);
    },
    set(E, C) {
      return Ui.call(this, E, C, !0);
    },
    delete: Bi,
    clear: $i,
    forEach: ct(!1, !0)
  }, c = {
    get(E) {
      return at(this, E, !0);
    },
    get size() {
      return ut(this, !0);
    },
    has(E) {
      return st.call(this, E, !0);
    },
    add: Bn("add"),
    set: Bn("set"),
    delete: Bn("delete"),
    clear: Bn("clear"),
    forEach: ct(!0, !1)
  }, h = {
    get(E) {
      return at(this, E, !0, !0);
    },
    get size() {
      return ut(this, !0);
    },
    has(E) {
      return st.call(this, E, !0);
    },
    add: Bn("add"),
    set: Bn("set"),
    delete: Bn("delete"),
    clear: Bn("clear"),
    forEach: ct(!0, !0)
  };
  return [
    "keys",
    "values",
    "entries",
    Symbol.iterator
  ].forEach((E) => {
    t[E] = dt(E, !1, !1), c[E] = dt(E, !0, !1), a[E] = dt(E, !1, !0), h[E] = dt(
      E,
      !0,
      !0
    );
  }), [
    t,
    c,
    a,
    h
  ];
}
const [
  Mu,
  zu,
  Fu,
  Lu
] = /* @__PURE__ */ Au();
function wa(t, a) {
  const c = a ? t ? Lu : Fu : t ? zu : Mu;
  return (h, l, E) => l === "__v_isReactive" ? !t : l === "__v_isReadonly" ? t : l === "__v_raw" ? h : Reflect.get(
    ht(c, l) && l in h ? c : h,
    l,
    E
  );
}
const ju = {
  get: /* @__PURE__ */ wa(!1, !1)
}, Uu = {
  get: /* @__PURE__ */ wa(!0, !1)
};
function ma(t, a, c) {
  const h = se(c);
  if (h !== c && a.call(t, h)) {
    const l = aa(t);
    vr(
      `Reactive ${l} contains both the raw and reactive versions of the same object${l === "Map" ? " as keys" : ""}, which can lead to inconsistencies. Avoid differentiating between the raw and reactive versions of an object and only use the reactive version if possible.`
    );
  }
}
const ga = /* @__PURE__ */ new WeakMap(), Bu = /* @__PURE__ */ new WeakMap(), ya = /* @__PURE__ */ new WeakMap(), $u = /* @__PURE__ */ new WeakMap();
function qu(t) {
  switch (t) {
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
function Hu(t) {
  return t.__v_skip || !Object.isExtensible(t) ? 0 : qu(aa(t));
}
function Ea(t) {
  return wr(t) ? t : Pa(
    t,
    !1,
    _u,
    ju,
    ga
  );
}
function ba(t) {
  return Pa(
    t,
    !0,
    Wu,
    Uu,
    ya
  );
}
function Pa(t, a, c, h, l) {
  if (!vt(t))
    return Ke.NODE_ENV !== "production" && vr(
      `value cannot be made ${a ? "readonly" : "reactive"}: ${String(
        t
      )}`
    ), t;
  if (t.__v_raw && !(a && t.__v_isReactive))
    return t;
  const E = l.get(t);
  if (E)
    return E;
  const C = Hu(t);
  if (C === 0)
    return t;
  const S = new Proxy(
    t,
    C === 2 ? h : c
  );
  return l.set(t, S), S;
}
function wr(t) {
  return !!(t && t.__v_isReadonly);
}
function mt(t) {
  return !!(t && t.__v_isShallow);
}
function se(t) {
  const a = t && t.__v_raw;
  return a ? se(a) : t;
}
const Lr = (t) => vt(t) ? Ea(t) : t, lo = (t) => vt(t) ? ba(t) : t, Vu = "Computed is still dirty after getter evaluation, likely because a computed is mutating its own dependency in its getter. State mutations in computed getters should be avoided.  Check the docs for more details: https://vuejs.org/guide/essentials/computed.html#getters-should-be-side-effect-free";
class Gu {
  constructor(a, c, h, l) {
    this.getter = a, this._setter = c, this.dep = void 0, this.__v_isRef = !0, this.__v_isReadonly = !1, this.effect = new eo(
      () => a(this._value),
      () => ft(
        this,
        this.effect._dirtyLevel === 2 ? 2 : 3
      )
    ), this.effect.computed = this, this.effect.active = this._cacheable = !l, this.__v_isReadonly = h;
  }
  get value() {
    const a = se(this);
    return (!a._cacheable || a.effect.dirty) && mr(a._value, a._value = a.effect.run()) && ft(a, 4), Sa(a), a.effect._dirtyLevel >= 2 && (Ke.NODE_ENV !== "production" && this._warnRecursive && vr(Vu, `

getter: `, this.getter), ft(a, 2)), a._value;
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
function Sa(t) {
  var a;
  $n && er && (t = se(t), fa(
    er,
    (a = t.dep) != null ? a : t.dep = ha(
      () => t.dep = void 0,
      t instanceof Gu ? t : void 0
    ),
    Ke.NODE_ENV !== "production" ? {
      target: t,
      type: "get",
      key: "value"
    } : void 0
  ));
}
function ft(t, a = 4, c, h) {
  t = se(t);
  const l = t.dep;
  l && la(
    l,
    a,
    Ke.NODE_ENV !== "production" ? {
      target: t,
      type: "set",
      key: "value",
      newValue: c,
      oldValue: h
    } : void 0
  );
}
function pt(t) {
  return !!(t && t.__v_isRef === !0);
}
function Pn(t) {
  return Ju(t, !1);
}
function Ju(t, a) {
  return pt(t) ? t : new Ku(t, a);
}
class Ku {
  constructor(a, c) {
    this.__v_isShallow = c, this.dep = void 0, this.__v_isRef = !0, this._rawValue = c ? a : se(a), this._value = c ? a : Lr(a);
  }
  get value() {
    return Sa(this), this._value;
  }
  set value(a) {
    const c = this.__v_isShallow || mt(a) || wr(a);
    if (a = c ? a : se(a), mr(a, this._rawValue)) {
      const h = this._rawValue;
      this._rawValue = a, this._value = c ? a : Lr(a), ft(this, 4, a, h);
    }
  }
}
function Yu() {
  const t = /* @__PURE__ */ new Set(), a = (l) => {
    t.delete(l);
  };
  return {
    on: (l) => (t.add(l), {
      off: () => a(l)
    }),
    off: a,
    trigger: (...l) => Promise.all(Array.from(t).map((E) => E(...l)))
  };
}
var Zu = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, Oa = { exports: {} };
(function(t, a) {
  (function(c, h) {
    t.exports = h();
  })(typeof self < "u" ? self : Zu, function() {
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
      return l.m = c, l.c = h, l.d = function(E, C, S) {
        l.o(E, C) || Object.defineProperty(E, C, {
          enumerable: !0,
          get: S
        });
      }, l.r = function(E) {
        typeof Symbol < "u" && Symbol.toStringTag && Object.defineProperty(E, Symbol.toStringTag, {
          value: "Module"
        }), Object.defineProperty(E, "__esModule", {
          value: !0
        });
      }, l.t = function(E, C) {
        if (1 & C && (E = l(E)), 8 & C || 4 & C && typeof E == "object" && E && E.__esModule) return E;
        var S = /* @__PURE__ */ Object.create(null);
        if (l.r(S), Object.defineProperty(S, "default", {
          enumerable: !0,
          value: E
        }), 2 & C && typeof E != "string") for (var V in E) l.d(S, V, (function(z) {
          return E[z];
        }).bind(null, V));
        return S;
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
        return Dt;
      }), l.d(h, "create", function() {
        return ka;
      }), l.d(h, "destroy", function() {
        return es;
      }), l.d(h, "destroyComponents", function() {
        return wi;
      }), l.d(h, "destroyAll", function() {
        return mi;
      }), l.d(h, "PROP_TYPE", function() {
        return fe;
      }), l.d(h, "PROP_SERIALIZATION", function() {
        return rt;
      }), l.d(h, "CONTEXT", function() {
        return Pe;
      }), l.d(h, "EVENT", function() {
        return me;
      });
      function E(e, n) {
        return (E = Object.setPrototypeOf || function(r, o) {
          return r.__proto__ = o, r;
        })(e, n);
      }
      function C(e, n) {
        e.prototype = Object.create(n.prototype), e.prototype.constructor = e, E(e, n);
      }
      function S() {
        return (S = Object.assign || function(e) {
          for (var n = 1; n < arguments.length; n++) {
            var r = arguments[n];
            for (var o in r) ({}).hasOwnProperty.call(r, o) && (e[o] = r[o]);
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
            var r = n.call(e);
            if (r === "[object Window]" || r === "[object global]" || r === "[object DOMWindow]") return !1;
          }
          if (typeof e.then == "function") return !0;
        } catch {
          return !1;
        }
        return !1;
      }
      var z = [], b = [], B = 0, M;
      function $() {
        if (!B && M) {
          var e = M;
          M = null, e.resolve();
        }
      }
      function ue() {
        B += 1;
      }
      function fn() {
        B -= 1, $();
      }
      var O = function() {
        function e(r) {
          var o = this;
          if (this.resolved = void 0, this.rejected = void 0, this.errorHandled = void 0, this.value = void 0, this.error = void 0, this.handlers = void 0, this.dispatching = void 0, this.stack = void 0, this.resolved = !1, this.rejected = !1, this.errorHandled = !1, this.handlers = [], r) {
            var i, s, u = !1, f = !1, d = !1;
            ue();
            try {
              r(function(v) {
                d ? o.resolve(v) : (u = !0, i = v);
              }, function(v) {
                d ? o.reject(v) : (f = !0, s = v);
              });
            } catch (v) {
              fn(), this.reject(v);
              return;
            }
            fn(), d = !0, u ? this.resolve(i) : f && this.reject(s);
          }
        }
        var n = e.prototype;
        return n.resolve = function(r) {
          if (this.resolved || this.rejected) return this;
          if (V(r)) throw new Error("Can not resolve promise with another promise");
          return this.resolved = !0, this.value = r, this.dispatch(), this;
        }, n.reject = function(r) {
          var o = this;
          if (this.resolved || this.rejected) return this;
          if (V(r)) throw new Error("Can not reject promise with another promise");
          if (!r) {
            var i = r && typeof r.toString == "function" ? r.toString() : {}.toString.call(r);
            r = new Error("Expected reject to be called with Error, got " + i);
          }
          return this.rejected = !0, this.error = r, this.errorHandled || setTimeout(function() {
            o.errorHandled || function(s, u) {
              if (z.indexOf(s) === -1) {
                z.push(s), setTimeout(function() {
                  throw s;
                }, 1);
                for (var f = 0; f < b.length; f++) b[f](s, u);
              }
            }(r, o);
          }, 1), this.dispatch(), this;
        }, n.asyncReject = function(r) {
          return this.errorHandled = !0, this.reject(r), this;
        }, n.dispatch = function() {
          var r = this.resolved, o = this.rejected, i = this.handlers;
          if (!this.dispatching && (r || o)) {
            this.dispatching = !0, ue();
            for (var s = function(m, y) {
              return m.then(function(P) {
                y.resolve(P);
              }, function(P) {
                y.reject(P);
              });
            }, u = 0; u < i.length; u++) {
              var f = i[u], d = f.onSuccess, v = f.onError, g = f.promise, w = void 0;
              if (r) try {
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
            i.length = 0, this.dispatching = !1, fn();
          }
        }, n.then = function(r, o) {
          if (r && typeof r != "function" && !r.call) throw new Error("Promise.then expected a function for success handler");
          if (o && typeof o != "function" && !o.call) throw new Error("Promise.then expected a function for error handler");
          var i = new e();
          return this.handlers.push({
            promise: i,
            onSuccess: r,
            onError: o
          }), this.errorHandled = !0, this.dispatch(), i;
        }, n.catch = function(r) {
          return this.then(void 0, r);
        }, n.finally = function(r) {
          if (r && typeof r != "function" && !r.call) throw new Error("Promise.finally expected a function");
          return this.then(function(o) {
            return e.try(r).then(function() {
              return o;
            });
          }, function(o) {
            return e.try(r).then(function() {
              throw o;
            });
          });
        }, n.timeout = function(r, o) {
          var i = this;
          if (this.resolved || this.rejected) return this;
          var s = setTimeout(function() {
            i.resolved || i.rejected || i.reject(o || new Error("Promise timed out after " + r + "ms"));
          }, r);
          return this.then(function(u) {
            return clearTimeout(s), u;
          });
        }, n.toPromise = function() {
          if (typeof Promise > "u") throw new TypeError("Could not find Promise");
          return Promise.resolve(this);
        }, n.lazy = function() {
          return this.errorHandled = !0, this;
        }, e.resolve = function(r) {
          return r instanceof e ? r : V(r) ? new e(function(o, i) {
            return r.then(o, i);
          }) : new e().resolve(r);
        }, e.reject = function(r) {
          return new e().reject(r);
        }, e.asyncReject = function(r) {
          return new e().asyncReject(r);
        }, e.all = function(r) {
          var o = new e(), i = r.length, s = [].slice();
          if (!i)
            return o.resolve(s), o;
          for (var u = function(v, g, w) {
            return g.then(function(p) {
              s[v] = p, (i -= 1) == 0 && o.resolve(s);
            }, function(p) {
              w.reject(p);
            });
          }, f = 0; f < r.length; f++) {
            var d = r[f];
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
        }, e.hash = function(r) {
          var o = {}, i = [], s = function(f) {
            if (r.hasOwnProperty(f)) {
              var d = r[f];
              V(d) ? i.push(d.then(function(v) {
                o[f] = v;
              })) : o[f] = d;
            }
          };
          for (var u in r) s(u);
          return e.all(i).then(function() {
            return o;
          });
        }, e.map = function(r, o) {
          return e.all(r.map(o));
        }, e.onPossiblyUnhandledException = function(r) {
          return function(o) {
            return b.push(o), {
              cancel: function() {
                b.splice(b.indexOf(o), 1);
              }
            };
          }(r);
        }, e.try = function(r, o, i) {
          if (r && typeof r != "function" && !r.call) throw new Error("Promise.try expected a function");
          var s;
          ue();
          try {
            s = r.apply(o, i || []);
          } catch (u) {
            return fn(), e.reject(u);
          }
          return fn(), e.resolve(s);
        }, e.delay = function(r) {
          return new e(function(o) {
            setTimeout(o, r);
          });
        }, e.isPromise = function(r) {
          return !!(r && r instanceof e) || V(r);
        }, e.flush = function() {
          return function(r) {
            var o = M = M || new r();
            return $(), o;
          }(e);
        }, e;
      }();
      function Ve(e) {
        return {}.toString.call(e) === "[object RegExp]";
      }
      var Ge = {
        IFRAME: "iframe",
        POPUP: "popup"
      }, je = `Call was rejected by callee.\r
`;
      function gr(e) {
        return e === void 0 && (e = window), e.location.protocol;
      }
      function mn(e) {
        if (e === void 0 && (e = window), e.mockDomain) {
          var n = e.mockDomain.split("//")[0];
          if (n) return n;
        }
        return gr(e);
      }
      function Qe(e) {
        return e === void 0 && (e = window), mn(e) === "about:";
      }
      function be(e) {
        if (e === void 0 && (e = window), e) try {
          if (e.parent && e.parent !== e) return e.parent;
        } catch {
        }
      }
      function ke(e) {
        if (e === void 0 && (e = window), e && !be(e)) try {
          return e.opener;
        } catch {
        }
      }
      function rr(e) {
        try {
          return !0;
        } catch {
        }
        return !1;
      }
      function yr(e) {
        e === void 0 && (e = window);
        var n = e.location;
        if (!n) throw new Error("Can not read window location");
        var r = gr(e);
        if (!r) throw new Error("Can not read window protocol");
        if (r === "file:") return "file://";
        if (r === "about:") {
          var o = be(e);
          return o && rr() ? yr(o) : "about://";
        }
        var i = n.host;
        if (!i) throw new Error("Can not read window host");
        return r + "//" + i;
      }
      function ae(e) {
        e === void 0 && (e = window);
        var n = yr(e);
        return n && e.mockDomain && e.mockDomain.indexOf("mock:") === 0 ? e.mockDomain : n;
      }
      function pe(e) {
        if (!function(n) {
          try {
            if (n === window) return !0;
          } catch {
          }
          try {
            var r = Object.getOwnPropertyDescriptor(n, "location");
            if (r && r.enumerable === !1) return !1;
          } catch {
          }
          try {
            if (Qe(n) && rr()) return !0;
          } catch {
          }
          try {
            if (function(o) {
              return o === void 0 && (o = window), mn(o) === "mock:";
            }(n) && rr()) return !0;
          } catch {
          }
          try {
            if (yr(n) === yr(window)) return !0;
          } catch {
          }
          return !1;
        }(e)) return !1;
        try {
          if (e === window || Qe(e) && rr() || ae(window) === ae(e)) return !0;
        } catch {
        }
        return !1;
      }
      function en(e) {
        if (!pe(e)) throw new Error("Expected window to be same domain");
        return e;
      }
      function Er(e, n) {
        if (!e || !n) return !1;
        var r = be(n);
        return r ? r === e : function(o) {
          var i = [];
          try {
            for (; o.parent !== o; )
              i.push(o.parent), o = o.parent;
          } catch {
          }
          return i;
        }(n).indexOf(e) !== -1;
      }
      function tr(e) {
        var n = [], r;
        try {
          r = e.frames;
        } catch {
          r = e;
        }
        var o;
        try {
          o = r.length;
        } catch {
        }
        if (o === 0) return n;
        if (o) {
          for (var i = 0; i < o; i++) {
            var s = void 0;
            try {
              s = r[i];
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
            f = r[u];
          } catch {
            return n;
          }
          if (!f) return n;
          n.push(f);
        }
        return n;
      }
      function or(e) {
        for (var n = [], r = 0, o = tr(e); r < o.length; r++) {
          var i = o[r];
          n.push(i);
          for (var s = 0, u = or(i); s < u.length; s++) n.push(u[s]);
        }
        return n;
      }
      function Sn(e) {
        e === void 0 && (e = window);
        try {
          if (e.top) return e.top;
        } catch {
        }
        if (be(e) === e) return e;
        try {
          if (Er(window, e) && window.top) return window.top;
        } catch {
        }
        try {
          if (Er(e, window) && window.top) return window.top;
        } catch {
        }
        for (var n = 0, r = or(e); n < r.length; n++) {
          var o = r[n];
          try {
            if (o.top) return o.top;
          } catch {
          }
          if (be(o) === o) return o;
        }
      }
      function gn(e) {
        var n = Sn(e);
        if (!n) throw new Error("Can not determine top window");
        var r = [].concat(or(n), [n]);
        return r.indexOf(e) === -1 && (r = [].concat(r, [e], or(e))), r;
      }
      var xn = [], ir = [];
      function ve(e, n) {
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
          return !i || i.message !== je;
        }
        if (n && pe(e)) try {
          if (e.mockclosed) return !0;
        } catch {
        }
        try {
          if (!e.parent || !e.top) return !0;
        } catch {
        }
        var r = function(i, s) {
          for (var u = 0; u < i.length; u++) try {
            if (i[u] === s) return u;
          } catch {
          }
          return -1;
        }(xn, e);
        if (r !== -1) {
          var o = ir[r];
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
      function br(e) {
        return (e = e || window).navigator.mockUserAgent || e.navigator.userAgent;
      }
      function Pr(e, n) {
        for (var r = tr(e), o = 0; o < r.length; o++) {
          var i = r[o];
          try {
            if (pe(i) && i.name === n && r.indexOf(i) !== -1) return i;
          } catch {
          }
        }
        try {
          if (r.indexOf(e.frames[n]) !== -1) return e.frames[n];
        } catch {
        }
        try {
          if (r.indexOf(e[n]) !== -1) return e[n];
        } catch {
        }
      }
      function Ur(e, n) {
        return e === ke(n);
      }
      function Sr(e) {
        return e === void 0 && (e = window), ke(e = e || window) || be(e) || void 0;
      }
      function gt(e, n) {
        for (var r = 0; r < e.length; r++)
          for (var o = e[r], i = 0; i < n.length; i++) if (o === n[i]) return !0;
        return !1;
      }
      function yt(e) {
        e === void 0 && (e = window);
        for (var n = 0, r = e; r; ) (r = be(r)) && (n += 1);
        return n;
      }
      function Br(e, n) {
        var r = Sn(e) || e, o = Sn(n) || n;
        try {
          if (r && o) return r === o;
        } catch {
        }
        var i = gn(e), s = gn(n);
        if (gt(i, s)) return !0;
        var u = ke(r), f = ke(o);
        return u && gt(gn(u), s) || f && gt(gn(f), i), !1;
      }
      function rn(e, n) {
        if (typeof e == "string") {
          if (typeof n == "string") return e === "*" || n === e;
          if (Ve(n) || Array.isArray(n)) return !1;
        }
        return Ve(e) ? Ve(n) ? e.toString() === n.toString() : !Array.isArray(n) && !!n.match(e) : !!Array.isArray(e) && (Array.isArray(n) ? JSON.stringify(e) === JSON.stringify(n) : !Ve(n) && e.some(function(r) {
          return rn(r, n);
        }));
      }
      function On(e) {
        return e.match(/^(https?|mock|file):\/\//) ? e.split("/").slice(0, 3).join("/") : ae();
      }
      function ho(e, n, r, o) {
        r === void 0 && (r = 1e3), o === void 0 && (o = 1 / 0);
        var i;
        return function s() {
          if (ve(e))
            return i && clearTimeout(i), n();
          o <= 0 ? clearTimeout(i) : (o -= r, i = setTimeout(s, r));
        }(), {
          cancel: function() {
            i && clearTimeout(i);
          }
        };
      }
      function Hn(e) {
        try {
          if (e === window) return !0;
        } catch (n) {
          if (n && n.message === je) return !0;
        }
        try {
          if ({}.toString.call(e) === "[object Window]") return !0;
        } catch (n) {
          if (n && n.message === je) return !0;
        }
        try {
          if (window.Window && e instanceof window.Window) return !0;
        } catch (n) {
          if (n && n.message === je) return !0;
        }
        try {
          if (e && e.self === e) return !0;
        } catch (n) {
          if (n && n.message === je) return !0;
        }
        try {
          if (e && e.parent === e) return !0;
        } catch (n) {
          if (n && n.message === je) return !0;
        }
        try {
          if (e && e.top === e) return !0;
        } catch (n) {
          if (n && n.message === je) return !0;
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
      function Et(e) {
        if (n = On(e), n.indexOf("mock:") !== 0) return e;
        var n;
        throw new Error("Mock urls not supported out of test mode");
      }
      function po(e) {
        if (pe(e)) return en(e).frameElement;
        for (var n = 0, r = document.querySelectorAll("iframe"); n < r.length; n++) {
          var o = r[n];
          if (o && o.contentWindow && o.contentWindow === e) return o;
        }
      }
      function vo(e) {
        if (function(r) {
          return r === void 0 && (r = window), !!be(r);
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
      function $r(e, n) {
        for (var r = 0; r < e.length; r++) try {
          if (e[r] === n) return r;
        } catch {
        }
        return -1;
      }
      var qr = function() {
        function e() {
          if (this.name = void 0, this.weakmap = void 0, this.keys = void 0, this.values = void 0, this.name = "__weakmap_" + (1e9 * Math.random() >>> 0) + "__", function() {
            if (typeof WeakMap > "u" || Object.freeze === void 0) return !1;
            try {
              var r = /* @__PURE__ */ new WeakMap(), o = {};
              return Object.freeze(o), r.set(o, "__testvalue__"), r.get(o) === "__testvalue__";
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
          for (var r = this.weakmap, o = this.keys, i = 0; i < o.length; i++) {
            var s = o[i];
            if (Hn(s) && ve(s)) {
              if (r) try {
                r.delete(s);
              } catch {
              }
              o.splice(i, 1), this.values.splice(i, 1), i -= 1;
            }
          }
        }, n.isSafeToReadWrite = function(r) {
          return !Hn(r);
        }, n.set = function(r, o) {
          if (!r) throw new Error("WeakMap expected key");
          var i = this.weakmap;
          if (i) try {
            i.set(r, o);
          } catch {
            delete this.weakmap;
          }
          if (this.isSafeToReadWrite(r)) try {
            var s = this.name, u = r[s];
            u && u[0] === r ? u[1] = o : Object.defineProperty(r, s, {
              value: [r, o],
              writable: !0
            });
            return;
          } catch {
          }
          this._cleanupClosedWindows();
          var f = this.keys, d = this.values, v = $r(f, r);
          v === -1 ? (f.push(r), d.push(o)) : d[v] = o;
        }, n.get = function(r) {
          if (!r) throw new Error("WeakMap expected key");
          var o = this.weakmap;
          if (o) try {
            if (o.has(r)) return o.get(r);
          } catch {
            delete this.weakmap;
          }
          if (this.isSafeToReadWrite(r)) try {
            var i = r[this.name];
            return i && i[0] === r ? i[1] : void 0;
          } catch {
          }
          this._cleanupClosedWindows();
          var s = $r(this.keys, r);
          if (s !== -1) return this.values[s];
        }, n.delete = function(r) {
          if (!r) throw new Error("WeakMap expected key");
          var o = this.weakmap;
          if (o) try {
            o.delete(r);
          } catch {
            delete this.weakmap;
          }
          if (this.isSafeToReadWrite(r)) try {
            var i = r[this.name];
            i && i[0] === r && (i[0] = i[1] = void 0);
          } catch {
          }
          this._cleanupClosedWindows();
          var s = this.keys, u = $r(s, r);
          u !== -1 && (s.splice(u, 1), this.values.splice(u, 1));
        }, n.has = function(r) {
          if (!r) throw new Error("WeakMap expected key");
          var o = this.weakmap;
          if (o) try {
            if (o.has(r)) return !0;
          } catch {
            delete this.weakmap;
          }
          if (this.isSafeToReadWrite(r)) try {
            var i = r[this.name];
            return !(!i || i[0] !== r);
          } catch {
          }
          return this._cleanupClosedWindows(), $r(this.keys, r) !== -1;
        }, n.getOrSet = function(r, o) {
          if (this.has(r)) return this.get(r);
          var i = o();
          return this.set(r, i), i;
        }, e;
      }();
      function wo(e) {
        return (wo = Object.setPrototypeOf ? Object.getPrototypeOf : function(n) {
          return n.__proto__ || Object.getPrototypeOf(n);
        })(e);
      }
      function Ta() {
        if (typeof Reflect > "u" || !Reflect.construct || Reflect.construct.sham) return !1;
        if (typeof Proxy == "function") return !0;
        try {
          return Date.prototype.toString.call(Reflect.construct(Date, [], function() {
          })), !0;
        } catch {
          return !1;
        }
      }
      function mo(e, n, r) {
        return (mo = Ta() ? Reflect.construct : function(o, i, s) {
          var u = [null];
          u.push.apply(u, i);
          var f = new (Function.bind.apply(o, u))();
          return s && E(f, s.prototype), f;
        }).apply(null, arguments);
      }
      function go(e) {
        var n = typeof Map == "function" ? /* @__PURE__ */ new Map() : void 0;
        return (go = function(r) {
          if (r === null || (o = r, Function.toString.call(o).indexOf("[native code]") === -1)) return r;
          var o;
          if (typeof r != "function") throw new TypeError("Super expression must either be null or a function");
          if (n !== void 0) {
            if (n.has(r)) return n.get(r);
            n.set(r, i);
          }
          function i() {
            return mo(r, arguments, wo(this).constructor);
          }
          return i.prototype = Object.create(r.prototype, {
            constructor: {
              value: i,
              enumerable: !1,
              writable: !0,
              configurable: !0
            }
          }), E(i, r);
        })(e);
      }
      function bt(e) {
        var n = !1;
        try {
          (e instanceof window.Element || e !== null && typeof e == "object" && e.nodeType === 1 && typeof e.style == "object" && typeof e.ownerDocument == "object") && (n = !0);
        } catch {
        }
        return n;
      }
      function Pt(e) {
        return e.name || e.__name__ || e.displayName || "anonymous";
      }
      function St(e, n) {
        try {
          delete e.name, e.name = n;
        } catch {
        }
        return e.__name__ = e.displayName = n, e;
      }
      function Ot(e) {
        if (typeof btoa == "function") return btoa(encodeURIComponent(e).replace(/%([0-9A-F]{2})/g, function(n, r) {
          return String.fromCharCode(parseInt(r, 16));
        })).replace(/[=]/g, "");
        if (typeof Buffer < "u") return Buffer.from(e, "utf8").toString("base64").replace(/[=]/g, "");
        throw new Error("Can not find window.btoa or Buffer");
      }
      function qe() {
        var e = "0123456789abcdef";
        return "uid_" + "xxxxxxxxxx".replace(/./g, function() {
          return e.charAt(Math.floor(Math.random() * e.length));
        }) + "_" + Ot((/* @__PURE__ */ new Date()).toISOString().slice(11, 19).replace("T", ".")).replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
      }
      var Hr;
      function Rt(e) {
        try {
          return JSON.stringify([].slice.call(e), function(n, r) {
            return typeof r == "function" ? "memoize[" + function(o) {
              if (Hr = Hr || new qr(), o == null || typeof o != "object" && typeof o != "function") throw new Error("Invalid object");
              var i = Hr.get(o);
              return i || (i = typeof o + ":" + qe(), Hr.set(o, i)), i;
            }(r) + "]" : bt(r) ? {} : r;
          });
        } catch {
          throw new Error("Arguments not serializable -- can not be used to memoize");
        }
      }
      function Ca() {
        return {};
      }
      var Or = 0, yo = 0;
      function Dn(e, n) {
        n === void 0 && (n = {});
        var r = n.thisNamespace, o = r !== void 0 && r, i = n.time, s, u, f = Or;
        Or += 1;
        var d = function() {
          for (var v = arguments.length, g = new Array(v), w = 0; w < v; w++) g[w] = arguments[w];
          f < yo && (s = null, u = null, f = Or, Or += 1);
          var p;
          p = o ? (u = u || new qr()).getOrSet(this, Ca) : s = s || {};
          var m;
          try {
            m = Rt(g);
          } catch {
            return e.apply(this, arguments);
          }
          var y = p[m];
          if (y && i && Date.now() - y.time < i && (delete p[m], y = null), y) return y.value;
          var P = Date.now(), R = e.apply(this, arguments);
          return p[m] = {
            time: P,
            value: R
          }, R;
        };
        return d.reset = function() {
          s = null, u = null;
        }, St(d, (n.name || Pt(e)) + "::memoized");
      }
      Dn.clear = function() {
        yo = Or;
      };
      function Na(e) {
        var n = {};
        function r() {
          for (var o = arguments, i = this, s = arguments.length, u = new Array(s), f = 0; f < s; f++) u[f] = arguments[f];
          var d = Rt(u);
          return n.hasOwnProperty(d) || (n[d] = O.try(function() {
            return e.apply(i, o);
          }).finally(function() {
            delete n[d];
          })), n[d];
        }
        return r.reset = function() {
          n = {};
        }, St(r, Pt(e) + "::promiseMemoized");
      }
      function we() {
      }
      function Vr(e) {
        var n = !1;
        return St(function() {
          if (!n)
            return n = !0, e.apply(this, arguments);
        }, Pt(e) + "::once");
      }
      function ar(e, n) {
        if (n === void 0 && (n = 1), n >= 3) return "stringifyError stack overflow";
        try {
          if (!e) return "<unknown error: " + {}.toString.call(e) + ">";
          if (typeof e == "string") return e;
          if (e instanceof Error) {
            var r = e && e.stack, o = e && e.message;
            if (r && o) return r.indexOf(o) !== -1 ? r : o + `
` + r;
            if (r) return r;
            if (o) return o;
          }
          return e && e.toString && typeof e.toString == "function" ? e.toString() : {}.toString.call(e);
        } catch (i) {
          return "Error while stringifying error: " + ar(i, n + 1);
        }
      }
      function Gr(e) {
        return typeof e == "string" ? e : e && e.toString && typeof e.toString == "function" ? e.toString() : {}.toString.call(e);
      }
      function sr(e, n) {
        if (!n) return e;
        if (Object.assign) return Object.assign(e, n);
        for (var r in n) n.hasOwnProperty(r) && (e[r] = n[r]);
        return e;
      }
      Dn(function(e) {
        if (Object.values) return Object.values(e);
        var n = [];
        for (var r in e) e.hasOwnProperty(r) && n.push(e[r]);
        return n;
      });
      function Ia(e) {
        return e;
      }
      function Rr(e, n) {
        var r;
        return function o() {
          r = setTimeout(function() {
            e(), o();
          }, n);
        }(), {
          cancel: function() {
            clearTimeout(r);
          }
        };
      }
      function Tt(e) {
        return e.replace(/-([a-z])/g, function(n) {
          return n[1].toUpperCase();
        });
      }
      function Eo(e, n, r) {
        if (Array.isArray(e)) {
          if (typeof n != "number") throw new TypeError("Array key must be number");
        } else if (typeof e == "object" && e !== null && typeof n != "string") throw new TypeError("Object key must be string");
        Object.defineProperty(e, n, {
          configurable: !0,
          enumerable: !0,
          get: function() {
            delete e[n];
            var o = r();
            return e[n] = o, o;
          },
          set: function(o) {
            delete e[n], e[n] = o;
          }
        });
      }
      function Ct(e) {
        return [].slice.call(e);
      }
      function bo(e) {
        return typeof (n = e) == "object" && n !== null && {}.toString.call(e) === "[object Object]";
        var n;
      }
      function Nt(e) {
        if (!bo(e)) return !1;
        var n = e.constructor;
        if (typeof n != "function") return !1;
        var r = n.prototype;
        return !!bo(r) && !!r.hasOwnProperty("isPrototypeOf");
      }
      function Jr(e, n, r) {
        if (r === void 0 && (r = ""), Array.isArray(e)) {
          for (var o = e.length, i = [], s = function(g) {
            Eo(i, g, function() {
              var w = r ? r + "." + g : "" + g, p = n(e[g], g, w);
              return (Nt(p) || Array.isArray(p)) && (p = Jr(p, n, w)), p;
            });
          }, u = 0; u < o; u++) s(u);
          return i;
        }
        if (Nt(e)) {
          var f = {}, d = function(g) {
            if (!e.hasOwnProperty(g)) return 1;
            Eo(f, g, function() {
              var w = r ? r + "." + g : "" + g, p = n(e[g], g, w);
              return (Nt(p) || Array.isArray(p)) && (p = Jr(p, n, w)), p;
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
      function It(e) {
        return {}.toString.call(e) === "[object RegExp]";
      }
      function Tr(e, n, r) {
        if (e.hasOwnProperty(n)) return e[n];
        var o = r();
        return e[n] = o, o;
      }
      function Kr(e) {
        var n = [], r = !1, o, i = {
          set: function(s, u) {
            return r || (e[s] = u, i.register(function() {
              delete e[s];
            })), u;
          },
          register: function(s) {
            var u = Vr(function() {
              return s(o);
            });
            return r ? s(o) : n.push(u), {
              cancel: function() {
                var f = n.indexOf(u);
                f !== -1 && n.splice(f, 1);
              }
            };
          },
          all: function(s) {
            o = s;
            var u = [];
            for (r = !0; n.length; ) {
              var f = n.shift();
              u.push(f());
            }
            return O.all(u).then(we);
          }
        };
        return i;
      }
      function Yr(e, n) {
        if (n == null) throw new Error("Expected " + e + " to be present");
        return n;
      }
      var xa = function(e) {
        C(n, e);
        function n(r) {
          var o;
          return (o = e.call(this, r) || this).name = o.constructor.name, typeof Error.captureStackTrace == "function" ? Error.captureStackTrace(function(i) {
            if (i === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return i;
          }(o), o.constructor) : o.stack = new Error(r).stack, o;
        }
        return n;
      }(go(Error));
      function Po() {
        var e = document.body;
        if (!e) throw new Error("Body element not found");
        return e;
      }
      function Zr() {
        return !!document.body && document.readyState === "complete";
      }
      function So() {
        return !!document.body && document.readyState === "interactive";
      }
      function Oo(e) {
        return encodeURIComponent(e);
      }
      Dn(function() {
        return new O(function(e) {
          if (Zr() || So()) return e();
          var n = setInterval(function() {
            if (Zr() || So())
              return clearInterval(n), e();
          }, 10);
        });
      });
      function Ro(e) {
        return function(n, r, o) {
          o === void 0 && (o = []);
          var i = n.__inline_memoize_cache__ = n.__inline_memoize_cache__ || {}, s = Rt(o);
          return i.hasOwnProperty(s) ? i[s] : i[s] = (function() {
            var u = {};
            if (!e || e.indexOf("=") === -1) return u;
            for (var f = 0, d = e.split("&"); f < d.length; f++) {
              var v = d[f];
              (v = v.split("="))[0] && v[1] && (u[decodeURIComponent(v[0])] = decodeURIComponent(v[1]));
            }
            return u;
          }).apply(void 0, o);
        }(Ro, 0, [e]);
      }
      function To(e, n) {
        return n === void 0 && (n = {}), n && Object.keys(n).length ? function(r) {
          return r === void 0 && (r = {}), Object.keys(r).filter(function(o) {
            return typeof r[o] == "string" || typeof r[o] == "boolean";
          }).map(function(o) {
            var i = r[o];
            if (typeof i != "string" && typeof i != "boolean") throw new TypeError("Invalid type for query");
            return Oo(o) + "=" + Oo(i.toString());
          }).join("&");
        }(S({}, Ro(e), n)) : e;
      }
      function Da(e, n) {
        e.appendChild(n);
      }
      function xt(e, n) {
        return n === void 0 && (n = document), bt(e) ? e : typeof e == "string" ? n.querySelector(e) : void 0;
      }
      function Co(e) {
        return new O(function(n, r) {
          var o = Gr(e), i = xt(e);
          if (i) return n(i);
          if (Zr()) return r(new Error("Document is ready and element " + o + " does not exist"));
          var s = setInterval(function() {
            if (i = xt(e))
              n(i), clearInterval(s);
            else if (Zr())
              return clearInterval(s), r(new Error("Document is ready and element " + o + " does not exist"));
          }, 10);
        });
      }
      var Dt = function(e) {
        C(n, e);
        function n() {
          return e.apply(this, arguments) || this;
        }
        return n;
      }(xa), Xr;
      function No(e) {
        if ((Xr = Xr || new qr()).has(e)) {
          var n = Xr.get(e);
          if (n) return n;
        }
        var r = new O(function(o, i) {
          e.addEventListener("load", function() {
            (function(s) {
              if (function() {
                for (var u = 0; u < xn.length; u++) {
                  var f = !1;
                  try {
                    f = xn[u].closed;
                  } catch {
                  }
                  f && (ir.splice(u, 1), xn.splice(u, 1));
                }
              }(), s && s.contentWindow) try {
                xn.push(s.contentWindow), ir.push(s);
              } catch {
              }
            })(e), o(e);
          }), e.addEventListener("error", function(s) {
            e.contentWindow ? o(e) : i(s);
          });
        });
        return Xr.set(e, r), r;
      }
      function _t(e) {
        return No(e).then(function(n) {
          if (!n.contentWindow) throw new Error("Could not find window in iframe");
          return n.contentWindow;
        });
      }
      function Io(e, n) {
        e === void 0 && (e = {});
        var r = e.style || {}, o = function(s, u, f) {
          s === void 0 && (s = "div"), u === void 0 && (u = {}), s = s.toLowerCase();
          var d = document.createElement(s);
          if (u.style && sr(d.style, u.style), u.class && (d.className = u.class.join(" ")), u.id && d.setAttribute("id", u.id), u.attributes) for (var v = 0, g = Object.keys(u.attributes); v < g.length; v++) {
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
          attributes: S({
            allowTransparency: "true"
          }, e.attributes || {}),
          style: S({
            backgroundColor: "transparent",
            border: "none"
          }, r),
          html: e.html,
          class: e.class
        }), i = window.navigator.userAgent.match(/MSIE|Edge/i);
        return o.hasAttribute("id") || o.setAttribute("id", qe()), No(o), (e.url || i) && o.setAttribute("src", e.url || "about:blank"), o;
      }
      function xo(e, n, r) {
        return e.addEventListener(n, r), {
          cancel: function() {
            e.removeEventListener(n, r);
          }
        };
      }
      function _a(e) {
        e.style.setProperty("display", "");
      }
      function Do(e) {
        e.style.setProperty("display", "none", "important");
      }
      function Cr(e) {
        e && e.parentNode && e.parentNode.removeChild(e);
      }
      function ur(e) {
        return !(e && e.parentNode && e.ownerDocument && e.ownerDocument.documentElement && e.ownerDocument.documentElement.contains(e));
      }
      function _o(e, n, r) {
        var o = r === void 0 ? {} : r, i = o.width, s = i === void 0 || i, u = o.height, f = u === void 0 || u, d = o.interval, v = d === void 0 ? 100 : d, g = o.win, w = g === void 0 ? window : g, p = e.offsetWidth, m = e.offsetHeight, y = !1;
        n({
          width: p,
          height: m
        });
        var P = function() {
          if (!y && function(x) {
            return !!(x.offsetWidth || x.offsetHeight || x.getClientRects().length);
          }(e)) {
            var _ = e.offsetWidth, q = e.offsetHeight;
            (s && _ !== p || f && q !== m) && n({
              width: _,
              height: q
            }), p = _, m = q;
          }
        }, R, I;
        return w.addEventListener("resize", P), w.ResizeObserver !== void 0 ? ((R = new w.ResizeObserver(P)).observe(e), I = Rr(P, 10 * v)) : w.MutationObserver !== void 0 ? ((R = new w.MutationObserver(P)).observe(e, {
          attributes: !0,
          childList: !0,
          subtree: !0,
          characterData: !1
        }), I = Rr(P, 10 * v)) : I = Rr(P, v), {
          cancel: function() {
            y = !0, R.disconnect(), window.removeEventListener("resize", P), I.cancel();
          }
        };
      }
      function Wt(e) {
        for (; e.parentNode; ) e = e.parentNode;
        return e.toString() === "[object ShadowRoot]";
      }
      var Qr = typeof document < "u" ? document.currentScript : null, Wa = Dn(function() {
        if (Qr || (Qr = function() {
          try {
            var e = function() {
              try {
                throw new Error("_");
              } catch (u) {
                return u.stack || "";
              }
            }(), n = /.*at [^(]*\((.*):(.+):(.+)\)$/gi.exec(e), r = n && n[1];
            if (!r) return;
            for (var o = 0, i = [].slice.call(document.getElementsByTagName("script")).reverse(); o < i.length; o++) {
              var s = i[o];
              if (s.src && s.src === r) return s;
            }
          } catch {
          }
        }())) return Qr;
        throw new Error("Can not determine current script");
      }), Aa = qe();
      Dn(function() {
        var e;
        try {
          e = Wa();
        } catch {
          return Aa;
        }
        var n = e.getAttribute("data-uid");
        if (n && typeof n == "string" || (n = e.getAttribute("data-uid-auto")) && typeof n == "string") return n;
        if (e.src) {
          var r = function(o) {
            for (var i = "", s = 0; s < o.length; s++) {
              var u = o[s].charCodeAt(0) * s;
              o[s + 1] && (u += o[s + 1].charCodeAt(0) * (s - 1)), i += String.fromCharCode(97 + Math.abs(u) % 26);
            }
            return i;
          }(JSON.stringify({
            src: e.src,
            dataset: e.dataset
          }));
          n = "uid_" + r.slice(r.length - 30);
        } else n = qe();
        return e.setAttribute("data-uid-auto", n), n;
      });
      function Wo(e) {
        return typeof e == "string" && /^[0-9]+%$/.test(e);
      }
      function At(e) {
        if (typeof e == "number") return e;
        var n = e.match(/^([0-9]+)(px|%)$/);
        if (!n) throw new Error("Could not match css value from " + e);
        return parseInt(n[1], 10);
      }
      function Ao(e) {
        return At(e) + "px";
      }
      function Mo(e) {
        return typeof e == "number" ? Ao(e) : Wo(e) ? e : Ao(e);
      }
      function zo(e, n) {
        if (typeof e == "number") return e;
        if (Wo(e)) return parseInt(n * At(e) / 100, 10);
        if (typeof (r = e) == "string" && /^[0-9]+px$/.test(r)) return At(e);
        var r;
        throw new Error("Can not normalize dimension: " + e);
      }
      function yn(e) {
        e === void 0 && (e = window);
        var n = "__post_robot_11_0_0__";
        return e !== window ? e[n] : e[n] = e[n] || {};
      }
      var Fo = function() {
        return {};
      };
      function ce(e, n) {
        return e === void 0 && (e = "store"), n === void 0 && (n = Fo), Tr(yn(), e, function() {
          var r = n();
          return {
            has: function(o) {
              return r.hasOwnProperty(o);
            },
            get: function(o, i) {
              return r.hasOwnProperty(o) ? r[o] : i;
            },
            set: function(o, i) {
              return r[o] = i, i;
            },
            del: function(o) {
              delete r[o];
            },
            getOrSet: function(o, i) {
              return Tr(r, o, i);
            },
            reset: function() {
              r = n();
            },
            keys: function() {
              return Object.keys(r);
            }
          };
        });
      }
      var Ma = function() {
      };
      function kr() {
        var e = yn();
        return e.WINDOW_WILDCARD = e.WINDOW_WILDCARD || new Ma(), e.WINDOW_WILDCARD;
      }
      function $e(e, n) {
        return e === void 0 && (e = "store"), n === void 0 && (n = Fo), ce("windowStore").getOrSet(e, function() {
          var r = new qr(), o = function(i) {
            return r.getOrSet(i, n);
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
              return Tr(o(i), e, s);
            }
          };
        });
      }
      function Lo() {
        return ce("instance").getOrSet("instanceID", qe);
      }
      function jo(e, n) {
        var r = n.domain, o = $e("helloPromises"), i = o.get(e);
        i && i.resolve({
          domain: r
        });
        var s = O.resolve({
          domain: r
        });
        return o.set(e, s), s;
      }
      function Mt(e, n) {
        return (0, n.send)(e, "postrobot_hello", {
          instanceID: Lo()
        }, {
          domain: "*",
          timeout: -1
        }).then(function(r) {
          var o = r.origin, i = r.data.instanceID;
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
        var r = n.send;
        return $e("windowInstanceIDPromises").getOrSet(e, function() {
          return Mt(e, {
            send: r
          }).then(function(o) {
            return o.instanceID;
          });
        });
      }
      function Bo(e, n, r) {
        n === void 0 && (n = 5e3), r === void 0 && (r = "Window");
        var o = function(i) {
          return $e("helloPromises").getOrSet(i, function() {
            return new O();
          });
        }(e);
        return n !== -1 && (o = o.timeout(n, new Error(r + " did not load after " + n + "ms"))), o;
      }
      function $o(e) {
        $e("knownWindows").set(e, !0);
      }
      function zt(e) {
        return typeof e == "object" && e !== null && typeof e.__type__ == "string";
      }
      function qo(e) {
        return e === void 0 ? "undefined" : e === null ? "null" : Array.isArray(e) ? "array" : typeof e == "function" ? "function" : typeof e == "object" ? e instanceof Error ? "error" : typeof e.then == "function" ? "promise" : {}.toString.call(e) === "[object RegExp]" ? "regex" : {}.toString.call(e) === "[object Date]" ? "date" : "object" : typeof e == "string" ? "string" : typeof e == "number" ? "number" : typeof e == "boolean" ? "boolean" : void 0;
      }
      function Vn(e, n) {
        return {
          __type__: e,
          __val__: n
        };
      }
      var tn, za = ((tn = {}).function = function() {
      }, tn.error = function(e) {
        return Vn("error", {
          message: e.message,
          stack: e.stack,
          code: e.code,
          data: e.data
        });
      }, tn.promise = function() {
      }, tn.regex = function(e) {
        return Vn("regex", e.source);
      }, tn.date = function(e) {
        return Vn("date", e.toJSON());
      }, tn.array = function(e) {
        return e;
      }, tn.object = function(e) {
        return e;
      }, tn.string = function(e) {
        return e;
      }, tn.number = function(e) {
        return e;
      }, tn.boolean = function(e) {
        return e;
      }, tn.null = function(e) {
        return e;
      }, tn[void 0] = function(e) {
        return Vn("undefined", e);
      }, tn), Fa = {}, on, La = ((on = {}).function = function() {
        throw new Error("Function serialization is not implemented; nothing to deserialize");
      }, on.error = function(e) {
        var n = e.stack, r = e.code, o = e.data, i = new Error(e.message);
        return i.code = r, o && (i.data = o), i.stack = n + `

` + i.stack, i;
      }, on.promise = function() {
        throw new Error("Promise serialization is not implemented; nothing to deserialize");
      }, on.regex = function(e) {
        return new RegExp(e);
      }, on.date = function(e) {
        return new Date(e);
      }, on.array = function(e) {
        return e;
      }, on.object = function(e) {
        return e;
      }, on.string = function(e) {
        return e;
      }, on.number = function(e) {
        return e;
      }, on.boolean = function(e) {
        return e;
      }, on.null = function(e) {
        return e;
      }, on[void 0] = function() {
      }, on), ja = {};
      function Ft() {
        return !!br(window).match(/MSIE|trident|edge\/12|edge\/13/i);
      }
      function Ho(e) {
        return !Br(window, e);
      }
      function Vo(e, n) {
        if (e) {
          if (ae() !== On(e)) return !0;
        } else if (n && !pe(n)) return !0;
        return !1;
      }
      function Go(e) {
        var n = e.win, r = e.domain;
        return !(!Ft() || r && !Vo(r, n) || n && !Ho(n));
      }
      function Lt(e) {
        return "__postrobot_bridge___" + (e = e || On(e)).replace(/[^a-zA-Z0-9]+/g, "_");
      }
      function Jo() {
        return !!(window.name && window.name === Lt(ae()));
      }
      var Ua = new O(function(e) {
        if (window.document && window.document.body) return e(window.document.body);
        var n = setInterval(function() {
          if (window.document && window.document.body)
            return clearInterval(n), e(window.document.body);
        }, 10);
      });
      function Ko(e) {
        $e("remoteWindowPromises").getOrSet(e, function() {
          return new O();
        });
      }
      function jt(e) {
        var n = $e("remoteWindowPromises").get(e);
        if (!n) throw new Error("Remote window promise not found");
        return n;
      }
      function Yo(e, n, r) {
        jt(e).resolve(function(o, i, s) {
          if (o !== e) throw new Error("Remote window does not match window");
          if (!rn(i, n)) throw new Error("Remote domain " + i + " does not match domain " + n);
          r.fireAndForget(s);
        });
      }
      function Ut(e, n) {
        jt(e).reject(n).catch(we);
      }
      function et(e) {
        for (var n = e.win, r = e.name, o = e.domain, i = ce("popupWindowsByName"), s = $e("popupWindowsByWin"), u = 0, f = i.keys(); u < f.length; u++) {
          var d = f[u], v = i.get(d);
          v && !ve(v.win) || i.del(d);
        }
        if (ve(n)) return {
          win: n,
          name: r,
          domain: o
        };
        var g = s.getOrSet(n, function() {
          return r ? i.getOrSet(r, function() {
            return {
              win: n,
              name: r
            };
          }) : {
            win: n
          };
        });
        if (g.win && g.win !== n) throw new Error("Different window already linked for window: " + (r || "undefined"));
        return r && (g.name = r, i.set(r, g)), o && (g.domain = o, Ko(n)), s.set(n, g), g;
      }
      function Zo(e) {
        var n = e.on, r = e.send, o = e.receiveMessage;
        i = window.open, window.open = function(s, u, f, d) {
          var v = i.call(this, Et(s), u, f, d);
          return v && (et({
            win: v,
            name: u,
            domain: s ? On(s) : null
          }), v);
        };
        var i;
        (function(s) {
          var u = s.on, f = s.send, d = s.receiveMessage, v = ce("popupWindowsByName");
          u("postrobot_open_tunnel", function(g) {
            var w = g.source, p = g.origin, m = g.data, y = ce("bridges").get(p);
            if (!y) throw new Error("Can not find bridge promise for domain " + p);
            return y.then(function(P) {
              if (w !== P) throw new Error("Message source does not matched registered bridge for domain " + p);
              if (!m.name) throw new Error("Register window expected to be passed window name");
              if (!m.sendMessage) throw new Error("Register window expected to be passed sendMessage method");
              if (!v.has(m.name)) throw new Error("Window with name " + m.name + " does not exist, or was not opened by this window");
              var R = function() {
                return v.get(m.name);
              };
              if (!R().domain) throw new Error("We do not have a registered domain for window " + m.name);
              if (R().domain !== p) throw new Error("Message origin " + p + " does not matched registered window origin " + (R().domain || "unknown"));
              return Yo(R().win, p, m.sendMessage), {
                sendMessage: function(I) {
                  if (window && !window.closed && R()) {
                    var _ = R().domain;
                    if (_) try {
                      d({
                        data: I,
                        origin: _,
                        source: R().win
                      }, {
                        on: u,
                        send: f
                      });
                    } catch (q) {
                      O.reject(q);
                    }
                  }
                }
              };
            });
          });
        })({
          on: n,
          send: r,
          receiveMessage: o
        }), function(s) {
          var u = s.send;
          yn(window).openTunnelToParent = function(f) {
            var d = f.name, v = f.source, g = f.canary, w = f.sendMessage, p = ce("tunnelWindows"), m = be(window);
            if (!m) throw new Error("No parent window found to open tunnel to");
            var y = function(P) {
              var R = P.name, I = P.source, _ = P.canary, q = P.sendMessage;
              (function() {
                for (var j = ce("tunnelWindows"), W = 0, Z = j.keys(); W < Z.length; W++) {
                  var L = Z[W];
                  ve(j[L].source) && j.del(L);
                }
              })();
              var x = qe();
              return ce("tunnelWindows").set(x, {
                name: R,
                source: I,
                canary: _,
                sendMessage: q
              }), x;
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
                if (P && P.source && !ve(P.source)) {
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
          send: r
        }), function(s) {
          var u = s.on, f = s.send, d = s.receiveMessage;
          O.try(function() {
            var v = ke(window);
            if (v && Go({
              win: v
            })) {
              return Ko(v), (g = v, $e("remoteBridgeAwaiters").getOrSet(g, function() {
                return O.try(function() {
                  var w = Pr(g, Lt(ae()));
                  if (w) return pe(w) && yn(en(w)) ? w : new O(function(p) {
                    var m, y;
                    m = setInterval(function() {
                      if (w && pe(w) && yn(en(w)))
                        return clearInterval(m), clearTimeout(y), p(w);
                    }, 100), y = setTimeout(function() {
                      return clearInterval(m), p();
                    }, 2e3);
                  });
                });
              })).then(function(w) {
                return w ? window.name ? yn(en(w)).openTunnelToParent({
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
                      O.reject(m);
                    }
                  }
                }).then(function(p) {
                  var m = p.source, y = p.origin, P = p.data;
                  if (m !== v) throw new Error("Source does not match opener");
                  Yo(m, y, P.sendMessage);
                }).catch(function(p) {
                  throw Ut(v, p), p;
                }) : Ut(v, new Error("Can not register with opener: window does not have a name")) : Ut(v, new Error("Can not register with opener: no bridge found in opener"));
              });
              var g;
            }
          });
        }({
          on: n,
          send: r,
          receiveMessage: o
        });
      }
      function Bt() {
        for (var e = ce("idToProxyWindow"), n = 0, r = e.keys(); n < r.length; n++) {
          var o = r[n];
          e.get(o).shouldClean() && e.del(o);
        }
      }
      function Xo(e, n) {
        var r = n.send, o = n.id, i = o === void 0 ? qe() : o, s = e.then(function(d) {
          if (pe(d)) return en(d).name;
        }), u = e.then(function(d) {
          if (ve(d)) throw new Error("Window is closed, can not determine type");
          return ke(d) ? Ge.POPUP : Ge.IFRAME;
        });
        s.catch(we), u.catch(we);
        var f = function() {
          return e.then(function(d) {
            if (!ve(d)) return pe(d) ? en(d).name : s;
          });
        };
        return {
          id: i,
          getType: function() {
            return u;
          },
          getInstanceID: Na(function() {
            return e.then(function(d) {
              return Uo(d, {
                send: r
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
              return ve(d);
            });
          },
          setLocation: function(d, v) {
            return v === void 0 && (v = {}), e.then(function(g) {
              var w = window.location.protocol + "//" + window.location.host, p = v.method, m = p === void 0 ? "get" : p, y = v.body;
              if (d.indexOf("/") === 0) d = "" + w + d;
              else if (!d.match(/^https?:\/\//) && d.indexOf(w) !== 0) throw new Error("Expected url to be http or https url, or absolute path, got " + JSON.stringify(d));
              if (m === "post") return f().then(function(P) {
                if (!P) throw new Error("Can not post to window without target name");
                (function(R) {
                  var I = R.url, _ = R.target, q = R.body, x = R.method, j = x === void 0 ? "post" : x, W = document.createElement("form");
                  if (W.setAttribute("target", _), W.setAttribute("method", j), W.setAttribute("action", I), W.style.display = "none", q) for (var Z = 0, L = Object.keys(q); Z < L.length; Z++) {
                    var oe, ee = L[Z], G = document.createElement("input");
                    G.setAttribute("name", ee), G.setAttribute("value", (oe = q[ee]) == null ? void 0 : oe.toString()), W.appendChild(G);
                  }
                  Po().appendChild(W), W.submit(), Po().removeChild(W);
                })({
                  url: d,
                  target: P,
                  method: m,
                  body: y
                });
              });
              if (m !== "get") throw new Error("Unsupported method: " + m);
              if (pe(g)) try {
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
              et({
                win: v,
                name: d
              });
              var g = pe(v), w = po(v);
              if (!g) throw new Error("Can not set name for cross-domain window: " + d);
              en(v).name = d, w && w.setAttribute("name", d), s = O.resolve(d);
            });
          }
        };
      }
      var an = function() {
        function e(r) {
          var o = r.send, i = r.win, s = r.serializedWindow;
          this.id = void 0, this.isProxyWindow = !0, this.serializedWindow = void 0, this.actualWindow = void 0, this.actualWindowPromise = void 0, this.send = void 0, this.name = void 0, this.actualWindowPromise = new O(), this.serializedWindow = s || Xo(this.actualWindowPromise, {
            send: o
          }), ce("idToProxyWindow").set(this.getID(), this), i && this.setWindow(i, {
            send: o
          });
        }
        var n = e.prototype;
        return n.getID = function() {
          return this.serializedWindow.id;
        }, n.getType = function() {
          return this.serializedWindow.getType();
        }, n.isPopup = function() {
          return this.getType().then(function(r) {
            return r === Ge.POPUP;
          });
        }, n.setLocation = function(r, o) {
          var i = this;
          return this.serializedWindow.setLocation(r, o).then(function() {
            return i;
          });
        }, n.getName = function() {
          return this.serializedWindow.getName();
        }, n.setName = function(r) {
          var o = this;
          return this.serializedWindow.setName(r).then(function() {
            return o;
          });
        }, n.close = function() {
          var r = this;
          return this.serializedWindow.close().then(function() {
            return r;
          });
        }, n.focus = function() {
          var r = this, o = this.isPopup(), i = this.getName(), s = O.hash({
            isPopup: o,
            name: i
          }).then(function(f) {
            var d = f.name;
            f.isPopup && d && window.open("", d, "noopener");
          }), u = this.serializedWindow.focus();
          return O.all([s, u]).then(function() {
            return r;
          });
        }, n.isClosed = function() {
          return this.serializedWindow.isClosed();
        }, n.getWindow = function() {
          return this.actualWindow;
        }, n.setWindow = function(r, o) {
          var i = o.send;
          this.actualWindow = r, this.actualWindowPromise.resolve(this.actualWindow), this.serializedWindow = Xo(this.actualWindowPromise, {
            send: i,
            id: this.getID()
          }), $e("winToProxyWindow").set(r, this);
        }, n.awaitWindow = function() {
          return this.actualWindowPromise;
        }, n.matchWindow = function(r, o) {
          var i = this, s = o.send;
          return O.try(function() {
            return i.actualWindow ? r === i.actualWindow : O.hash({
              proxyInstanceID: i.getInstanceID(),
              knownWindowInstanceID: Uo(r, {
                send: s
              })
            }).then(function(u) {
              var f = u.proxyInstanceID === u.knownWindowInstanceID;
              return f && i.setWindow(r, {
                send: s
              }), f;
            });
          });
        }, n.unwrap = function() {
          return this.actualWindow || this;
        }, n.getInstanceID = function() {
          return this.serializedWindow.getInstanceID();
        }, n.shouldClean = function() {
          return !!(this.actualWindow && ve(this.actualWindow));
        }, n.serialize = function() {
          return this.serializedWindow;
        }, e.unwrap = function(r) {
          return e.isProxyWindow(r) ? r.unwrap() : r;
        }, e.serialize = function(r, o) {
          var i = o.send;
          return Bt(), e.toProxyWindow(r, {
            send: i
          }).serialize();
        }, e.deserialize = function(r, o) {
          var i = o.send;
          return Bt(), ce("idToProxyWindow").get(r.id) || new e({
            serializedWindow: r,
            send: i
          });
        }, e.isProxyWindow = function(r) {
          return !!(r && !Hn(r) && r.isProxyWindow);
        }, e.toProxyWindow = function(r, o) {
          var i = o.send;
          if (Bt(), e.isProxyWindow(r)) return r;
          var s = r;
          return $e("winToProxyWindow").get(s) || new e({
            win: s,
            send: i
          });
        }, e;
      }();
      function $t(e, n, r, o, i) {
        var s = $e("methodStore"), u = ce("proxyWindowMethods");
        an.isProxyWindow(o) ? u.set(e, {
          val: n,
          name: r,
          domain: i,
          source: o
        }) : (u.del(e), s.getOrSet(o, function() {
          return {};
        })[e] = {
          domain: i,
          name: r,
          val: n,
          source: o
        });
      }
      function Qo(e, n) {
        var r = $e("methodStore"), o = ce("proxyWindowMethods");
        return r.getOrSet(e, function() {
          return {};
        })[n] || o.get(n);
      }
      function ko(e, n, r, o, i) {
        u = (s = {
          on: i.on,
          send: i.send
        }).on, f = s.send, ce("builtinListeners").getOrSet("functionCalls", function() {
          return u("postrobot_method", {
            domain: "*"
          }, function(g) {
            var w = g.source, p = g.origin, m = g.data, y = m.id, P = m.name, R = Qo(w, y);
            if (!R) throw new Error("Could not find method '" + P + "' with id: " + m.id + " in " + ae(window));
            var I = R.source, _ = R.domain, q = R.val;
            return O.try(function() {
              if (!rn(_, p)) throw new Error("Method '" + m.name + "' domain " + JSON.stringify(It(R.domain) ? R.domain.source : R.domain) + " does not match origin " + p + " in " + ae(window));
              if (an.isProxyWindow(I)) return I.matchWindow(w, {
                send: f
              }).then(function(x) {
                if (!x) throw new Error("Method call '" + m.name + "' failed - proxy window does not match source in " + ae(window));
              });
            }).then(function() {
              return q.apply({
                source: w,
                origin: p
              }, m.args);
            }, function(x) {
              return O.try(function() {
                if (q.onError) return q.onError(x);
              }).then(function() {
                throw x.stack && (x.stack = "Remote call to " + P + "(" + function(j) {
                  return j === void 0 && (j = []), Ct(j).map(function(W) {
                    return typeof W == "string" ? "'" + W + "'" : W === void 0 ? "undefined" : W === null ? "null" : typeof W == "boolean" ? W.toString() : Array.isArray(W) ? "[ ... ]" : typeof W == "object" ? "{ ... }" : typeof W == "function" ? "() => { ... }" : "<" + typeof W + ">";
                  }).join(", ");
                }(m.args) + `) failed

` + x.stack), x;
              });
            }).then(function(x) {
              return {
                result: x,
                id: y,
                name: P
              };
            });
          });
        });
        var s, u, f, d = r.__id__ || qe();
        e = an.unwrap(e);
        var v = r.__name__ || r.name || o;
        return typeof v == "string" && typeof v.indexOf == "function" && v.indexOf("anonymous::") === 0 && (v = v.replace("anonymous::", o + "::")), an.isProxyWindow(e) ? ($t(d, r, v, e, n), e.awaitWindow().then(function(g) {
          $t(d, r, v, g, n);
        })) : $t(d, r, v, e, n), Vn("cross_domain_function", {
          id: d,
          name: v
        });
      }
      function ei(e, n, r, o) {
        var i, s = o.on, u = o.send;
        return function(f, d) {
          d === void 0 && (d = Fa);
          var v = JSON.stringify(f, function(g) {
            var w = this[g];
            if (zt(this)) return w;
            var p = qo(w);
            if (!p) return w;
            var m = d[p] || za[p];
            return m ? m(w, g) : w;
          });
          return v === void 0 ? "undefined" : v;
        }(r, ((i = {}).promise = function(f, d) {
          return function(v, g, w, p, m) {
            return Vn("cross_domain_zalgo_promise", {
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
          return Hn(f) || an.isProxyWindow(f) ? Vn("cross_domain_window", an.serialize(f, {
            send: u
          })) : f;
        }, i));
      }
      function ni(e, n, r, o) {
        var i, s = o.send;
        return function(u, f) {
          if (f === void 0 && (f = ja), u !== "undefined") return JSON.parse(u, function(d, v) {
            if (zt(this)) return v;
            var g, w;
            if (zt(v) ? (g = v.__type__, w = v.__val__) : (g = qo(v), w = v), !g) return w;
            var p = f[g] || La[g];
            return p ? p(w, d) : w;
          });
        }(r, ((i = {}).cross_domain_zalgo_promise = function(u) {
          return function(f, d, v) {
            return new O(v.then);
          }(0, 0, u);
        }, i.cross_domain_function = function(u) {
          return function(f, d, v, g) {
            var w = v.id, p = v.name, m = g.send, y = function(R) {
              R === void 0 && (R = {});
              function I() {
                var _ = arguments;
                return an.toProxyWindow(f, {
                  send: m
                }).awaitWindow().then(function(q) {
                  var x = Qo(q, w);
                  if (x && x.val !== I) return x.val.apply({
                    source: window,
                    origin: ae()
                  }, _);
                  var j = [].slice.call(_);
                  return R.fireAndForget ? m(q, "postrobot_method", {
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
                  }).then(function(W) {
                    return W.data.result;
                  });
                }).catch(function(q) {
                  throw q;
                });
              }
              return I.__name__ = p, I.__origin__ = d, I.__source__ = f, I.__id__ = w, I.origin = d, I;
            }, P = y();
            return P.fireAndForget = y({
              fireAndForget: !0
            }), P;
          }(e, n, u, {
            send: s
          });
        }, i.cross_domain_window = function(u) {
          return an.deserialize(u, {
            send: s
          });
        }, i));
      }
      var Nr = {};
      Nr.postrobot_post_message = function(e, n, r) {
        r.indexOf("file:") === 0 && (r = "*"), e.postMessage(n, r);
      }, Nr.postrobot_bridge = function(e, n, r) {
        if (!Ft() && !Jo()) throw new Error("Bridge not needed for browser");
        if (pe(e)) throw new Error("Post message through bridge disabled between same domain windows");
        if (Br(window, e) !== !1) throw new Error("Can only use bridge to communicate between two different windows, not between frames");
        (function(o, i, s) {
          var u = Ur(window, o), f = Ur(o, window);
          if (!u && !f) throw new Error("Can only send messages to and from parent and popup windows");
          jt(o).then(function(d) {
            return d(o, i, s);
          });
        })(e, r, n);
      }, Nr.postrobot_global = function(e, n) {
        if (!br(window).match(/MSIE|rv:11|trident|edge\/12|edge\/13/i)) throw new Error("Global messaging not needed for browser");
        if (!pe(e)) throw new Error("Post message through global disabled between different domain windows");
        if (Br(window, e) !== !1) throw new Error("Can only use global to communicate between two different windows, not between frames");
        var r = yn(e);
        if (!r) throw new Error("Can not find postRobot global on foreign window");
        r.receiveMessage({
          source: window,
          origin: ae(),
          data: n
        });
      };
      function qt(e, n, r, o) {
        var i = o.on, s = o.send;
        return O.try(function() {
          var u = $e().getOrSet(e, function() {
            return {};
          });
          return u.buffer = u.buffer || [], u.buffer.push(r), u.flush = u.flush || O.flush().then(function() {
            if (ve(e)) throw new Error("Window is closed");
            var f = ei(e, n, ((d = {}).__post_robot_11_0_0__ = u.buffer || [], d), {
              on: i,
              send: s
            }), d;
            delete u.buffer;
            for (var v = Object.keys(Nr), g = [], w = 0; w < v.length; w++) {
              var p = v[w];
              try {
                Nr[p](e, f, n);
              } catch (m) {
                g.push(m);
              }
            }
            if (g.length === v.length) throw new Error(`All post-robot messaging strategies failed:

` + g.map(function(m, y) {
              return y + ". " + ar(m);
            }).join(`

`));
          }), u.flush.then(function() {
            delete u.flush;
          });
        }).then(we);
      }
      function ri(e) {
        return ce("responseListeners").get(e);
      }
      function ti(e) {
        ce("responseListeners").del(e);
      }
      function oi(e) {
        return ce("erroredResponseListeners").has(e);
      }
      function ii(e) {
        var n = e.name, r = e.win, o = e.domain, i = $e("requestListeners");
        if (r === "*" && (r = null), o === "*" && (o = null), !n) throw new Error("Name required to get request listener");
        for (var s = 0, u = [r, kr()]; s < u.length; s++) {
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
                    if (rn(p.regex, o)) return m;
                  }
                }
                if (v["*"]) return v["*"];
              }
            }
          }
        }
      }
      function Ht(e, n) {
        var r = n.on, o = n.send, i = ce("receivedMessages");
        try {
          if (!window || window.closed || !e.source) return;
        } catch {
          return;
        }
        var s = e.source, u = e.origin, f = function(w, p, m, y) {
          var P = y.on, R = y.send, I;
          try {
            I = ni(p, m, w, {
              on: P,
              send: R
            });
          } catch {
            return;
          }
          if (I && typeof I == "object" && I !== null) {
            var _ = I.__post_robot_11_0_0__;
            if (Array.isArray(_)) return _;
          }
        }(e.data, s, u, {
          on: r,
          send: o
        });
        if (f) {
          $o(s);
          for (var d, v = function() {
            var w = f[g];
            if (i.has(w.id)) return {
              v: void 0
            };
            if (i.set(w.id, !0), ve(s) && !w.fireAndForget) return {
              v: void 0
            };
            w.origin.indexOf("file:") === 0 && (u = "file://");
            try {
              w.type === "postrobot_message_request" ? function(p, m, y, P) {
                var R = P.on, I = P.send, _ = ii({
                  name: y.name,
                  win: p,
                  domain: m
                }), q = y.name === "postrobot_method" && y.data && typeof y.data.name == "string" ? y.data.name + "()" : y.name;
                function x(j, W, Z) {
                  return O.flush().then(function() {
                    if (!y.fireAndForget && !ve(p)) try {
                      return qt(p, m, {
                        id: qe(),
                        origin: ae(window),
                        type: "postrobot_message_response",
                        hash: y.hash,
                        name: y.name,
                        ack: j,
                        data: W,
                        error: Z
                      }, {
                        on: R,
                        send: I
                      });
                    } catch (L) {
                      throw new Error("Send response message failed for " + q + " in " + ae() + `

` + ar(L));
                    }
                  });
                }
                O.all([O.flush().then(function() {
                  if (!y.fireAndForget && !ve(p)) try {
                    return qt(p, m, {
                      id: qe(),
                      origin: ae(window),
                      type: "postrobot_message_ack",
                      hash: y.hash,
                      name: y.name
                    }, {
                      on: R,
                      send: I
                    });
                  } catch (j) {
                    throw new Error("Send ack message failed for " + q + " in " + ae() + `

` + ar(j));
                  }
                }), O.try(function() {
                  if (!_) throw new Error("No handler found for post message: " + y.name + " from " + m + " in " + window.location.protocol + "//" + window.location.host + window.location.pathname);
                  return _.handler({
                    source: p,
                    origin: m,
                    data: y.data
                  });
                }).then(function(j) {
                  return x("success", j);
                }, function(j) {
                  return x("error", null, j);
                })]).then(we).catch(function(j) {
                  if (_ && _.handleError) return _.handleError(j);
                  throw j;
                });
              }(s, u, w, {
                on: r,
                send: o
              }) : w.type === "postrobot_message_response" ? function(p, m, y) {
                if (!oi(y.hash)) {
                  var P = ri(y.hash);
                  if (!P) throw new Error("No handler found for post message response for message: " + y.name + " from " + m + " in " + window.location.protocol + "//" + window.location.host + window.location.pathname);
                  if (!rn(P.domain, m)) throw new Error("Response origin " + m + " does not match domain " + (R = P.domain, Array.isArray(R) ? "(" + R.join(" | ") + ")" : Ve(R) ? "RegExp(" + R.toString() + ")" : R.toString()));
                  var R;
                  if (p !== P.win) throw new Error("Response source does not match registered window");
                  ti(y.hash), y.ack === "error" ? P.promise.reject(y.error) : y.ack === "success" && P.promise.resolve({
                    source: p,
                    origin: m,
                    data: y.data
                  });
                }
              }(s, u, w) : w.type === "postrobot_message_ack" && function(p, m, y) {
                if (!oi(y.hash)) {
                  var P = ri(y.hash);
                  if (!P) throw new Error("No handler found for post message ack for message: " + y.name + " from " + m + " in " + window.location.protocol + "//" + window.location.host + window.location.pathname);
                  try {
                    if (!rn(P.domain, m)) throw new Error("Ack origin " + m + " does not match domain " + P.domain.toString());
                    if (p !== P.win) throw new Error("Ack source does not match registered window");
                  } catch (R) {
                    P.promise.reject(R);
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
      function Rn(e, n, r) {
        if (!e) throw new Error("Expected name");
        if (typeof (n = n || {}) == "function" && (r = n, n = {}), !r) throw new Error("Expected handler");
        var o = function i(s, u) {
          var f = s.name, d = s.win, v = s.domain, g = $e("requestListeners");
          if (!f || typeof f != "string") throw new Error("Name required to add request listener");
          if (d && d !== "*" && an.isProxyWindow(d)) {
            var w = d.awaitWindow().then(function(oe) {
              return i({
                name: f,
                win: oe,
                domain: v
              }, u);
            });
            return {
              cancel: function() {
                w.then(function(oe) {
                  return oe.cancel();
                }, we);
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
                for (var oe = 0; oe < m.length; oe++) m[oe].cancel();
              }
            };
          }
          if (Array.isArray(v)) {
            for (var R = [], I = 0, _ = v; I < _.length; I++) R.push(i({
              name: f,
              win: p,
              domain: _[I]
            }, u));
            return {
              cancel: function() {
                for (var oe = 0; oe < R.length; oe++) R[oe].cancel();
              }
            };
          }
          var q = ii({
            name: f,
            win: p,
            domain: v
          });
          p && p !== "*" || (p = kr());
          var x = (v = v || "*").toString();
          if (q) throw p && v ? new Error("Request listener already exists for " + f + " on domain " + v.toString() + " for " + (p === kr() ? "wildcard" : "specified") + " window") : p ? new Error("Request listener already exists for " + f + " for " + (p === kr() ? "wildcard" : "specified") + " window") : v ? new Error("Request listener already exists for " + f + " on domain " + v.toString()) : new Error("Request listener already exists for " + f);
          var j = g.getOrSet(p, function() {
            return {};
          }), W = Tr(j, f, function() {
            return {};
          }), Z, L;
          return It(v) ? (Z = Tr(W, "__domain_regex__", function() {
            return [];
          })).push(L = {
            regex: v,
            listener: u
          }) : W[x] = u, {
            cancel: function() {
              delete W[x], L && (Z.splice(Z.indexOf(L, 1)), Z.length || delete W.__domain_regex__), Object.keys(W).length || delete j[f], p && !Object.keys(j).length && g.del(p);
            }
          };
        }({
          name: e,
          win: n.window,
          domain: n.domain || "*"
        }, {
          handler: r || n.handler,
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
      var pn = function e(n, r, o, i) {
        var s = (i = i || {}).domain || "*", u = i.timeout || -1, f = i.timeout || 5e3, d = i.fireAndForget || !1;
        return an.toProxyWindow(n, {
          send: e
        }).awaitWindow().then(function(v) {
          return O.try(function() {
            if (function(g, w, p) {
              if (!g) throw new Error("Expected name");
              if (p && typeof p != "string" && !Array.isArray(p) && !It(p)) throw new TypeError("Can not send " + g + ". Expected domain " + JSON.stringify(p) + " to be a string, array, or regex");
              if (ve(w)) throw new Error("Can not send " + g + ". Target window is closed");
            }(r, v, s), function(g, w) {
              var p = Sr(w);
              if (p) return p === g;
              if (w === g || Sn(w) === w) return !1;
              for (var m = 0, y = tr(g); m < y.length; m++) if (y[m] === w) return !0;
              return !1;
            }(window, v)) return Bo(v, f);
          }).then(function(g) {
            return function(w, p, m, y) {
              var P = y.send;
              return O.try(function() {
                return typeof p == "string" ? p : O.try(function() {
                  return m || Mt(w, {
                    send: P
                  }).then(function(R) {
                    return R.domain;
                  });
                }).then(function(R) {
                  if (!rn(p, p)) throw new Error("Domain " + Gr(p) + " does not match " + Gr(p));
                  return R;
                });
              });
            }(v, s, (g === void 0 ? {} : g).domain, {
              send: e
            });
          }).then(function(g) {
            var w = g, p = r === "postrobot_method" && o && typeof o.name == "string" ? o.name + "()" : r, m = new O(), y = r + "_" + qe();
            if (!d) {
              var P = {
                name: r,
                win: v,
                domain: w,
                promise: m
              };
              (function(W, Z) {
                ce("responseListeners").set(W, Z);
              })(y, P);
              var R = $e("requestPromises").getOrSet(v, function() {
                return [];
              });
              R.push(m), m.catch(function() {
                (function(W) {
                  ce("erroredResponseListeners").set(W, !0);
                })(y), ti(y);
              });
              var I = function(W) {
                return $e("knownWindows").get(W, !1);
              }(v) ? 1e4 : 2e3, _ = u, q = I, x = _, j = Rr(function() {
                return ve(v) ? m.reject(new Error("Window closed for " + r + " before " + (P.ack ? "response" : "ack"))) : P.cancelled ? m.reject(new Error("Response listener was cancelled for " + r)) : (q = Math.max(q - 500, 0), x !== -1 && (x = Math.max(x - 500, 0)), P.ack || q !== 0 ? x === 0 ? m.reject(new Error("No response for postMessage " + p + " in " + ae() + " in " + _ + "ms")) : void 0 : m.reject(new Error("No ack for postMessage " + p + " in " + ae() + " in " + I + "ms")));
              }, 500);
              m.finally(function() {
                j.cancel(), R.splice(R.indexOf(m, 1));
              }).catch(we);
            }
            return qt(v, w, {
              id: qe(),
              origin: ae(window),
              type: "postrobot_message_request",
              hash: y,
              name: r,
              data: o,
              fireAndForget: d
            }, {
              on: Rn,
              send: e
            }).then(function() {
              return d ? m.resolve() : m;
            }, function(W) {
              throw new Error("Send request message failed for " + p + " in " + ae() + `

` + ar(W));
            });
          });
        });
      };
      function Ir(e) {
        return an.toProxyWindow(e, {
          send: pn
        });
      }
      function ai(e) {
        for (var n = 0, r = $e("requestPromises").get(e, []); n < r.length; n++) r[n].reject(new Error("Window " + (ve(e) ? "closed" : "cleaned up") + " before response")).catch(we);
      }
      var Wn;
      Wn = {
        setupBridge: Zo,
        openBridge: function(e, n) {
          var r = ce("bridges"), o = ce("bridgeFrames");
          return n = n || On(e), r.getOrSet(n, function() {
            return O.try(function() {
              if (ae() === n) throw new Error("Can not open bridge on the same domain as current domain: " + n);
              var i = Lt(n);
              if (Pr(window, i)) throw new Error("Frame with name " + i + " already exists on page");
              var s = function(u, f) {
                var d = document.createElement("iframe");
                return d.setAttribute("name", u), d.setAttribute("id", u), d.setAttribute("style", "display: none; margin: 0; padding: 0; border: 0px none; overflow: hidden;"), d.setAttribute("frameborder", "0"), d.setAttribute("border", "0"), d.setAttribute("scrolling", "no"), d.setAttribute("allowTransparency", "true"), d.setAttribute("tabindex", "-1"), d.setAttribute("hidden", "true"), d.setAttribute("title", ""), d.setAttribute("role", "presentation"), d.src = f, d;
              }(i, e);
              return o.set(n, s), Ua.then(function(u) {
                u.appendChild(s);
                var f = s.contentWindow;
                return new O(function(d, v) {
                  s.addEventListener("load", d), s.addEventListener("error", v);
                }).then(function() {
                  return Bo(f, 5e3, "Bridge " + e);
                }).then(function() {
                  return f;
                });
              });
            });
          });
        },
        linkWindow: et,
        linkUrl: function(e, n) {
          et({
            win: e,
            domain: On(n)
          });
        },
        isBridge: Jo,
        needsBridge: Go,
        needsBridgeForBrowser: Ft,
        hasBridge: function(e, n) {
          return ce("bridges").has(n || On(e));
        },
        needsBridgeForWin: Ho,
        needsBridgeForDomain: Vo,
        destroyBridges: function() {
          for (var e = ce("bridges"), n = ce("bridgeFrames"), r = 0, o = n.keys(); r < o.length; r++) {
            var i = n.get(o[r]);
            i && i.parentNode && i.parentNode.removeChild(i);
          }
          n.reset(), e.reset();
        }
      };
      function xr(e) {
        if (!pe(e)) throw new Error("Can not get global for window on different domain");
        return e.__zoid_10_3_3__ || (e.__zoid_10_3_3__ = {}), e.__zoid_10_3_3__;
      }
      function si(e, n) {
        try {
          return n(xr(e));
        } catch {
        }
      }
      function nt(e) {
        return {
          get: function() {
            var n = this;
            return O.try(function() {
              if (n.source && n.source !== window) throw new Error("Can not call get on proxy object from a remote window");
              return e;
            });
          }
        };
      }
      function Ba(e) {
        return Ot(JSON.stringify(e));
      }
      function Vt(e) {
        var n = xr(e);
        return n.references = n.references || {}, n.references;
      }
      function ui(e) {
        var n = e.data, r = e.metaData, o = e.sender, i = e.receiver, s = e.passByReference, u = s !== void 0 && s, f = e.basic, d = f !== void 0 && f, v = Ir(i.win), g = d ? JSON.stringify(n) : ei(v, i.domain, n, {
          on: Rn,
          send: pn
        }), w = u ? function(p) {
          var m = qe();
          return Vt(window)[m] = p, {
            type: "uid",
            uid: m
          };
        }(g) : {
          type: "raw",
          val: g
        };
        return {
          serializedData: Ba({
            sender: {
              domain: o.domain
            },
            metaData: r,
            reference: w
          }),
          cleanReference: function() {
            p = window, (m = w).type === "uid" && delete Vt(p)[m.uid];
            var p, m;
          }
        };
      }
      function ci(e) {
        var n = e.sender, r = e.basic, o = r !== void 0 && r, i = function(g) {
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
          if (w.type === "uid") return Vt(g)[w.uid];
          throw new Error("Unsupported ref type: " + w.type);
        }(f, s);
        return {
          data: o ? JSON.parse(v) : function(g, w, p) {
            return ni(g, w, p, {
              on: Rn,
              send: pn
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
      var fe = {
        STRING: "string",
        OBJECT: "object",
        FUNCTION: "function",
        BOOLEAN: "boolean",
        NUMBER: "number",
        ARRAY: "array"
      }, rt = {
        JSON: "json",
        DOTIFY: "dotify",
        BASE64: "base64"
      }, Pe = Ge, me = {
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
      function Gt(e) {
        if (!e) throw new Error("No window name");
        var n = e.split("__"), r = n[1], o = n[2], i = n[3];
        if (r !== "zoid") throw new Error("Window not rendered by zoid - got " + r);
        if (!o) throw new Error("Expected component name");
        if (!i) throw new Error("Expected serialized payload ref");
        return {
          name: o,
          serializedInitialPayload: i
        };
      }
      var $a = Dn(function(e) {
        var n = ci({
          data: Gt(e).serializedInitialPayload,
          sender: {
            win: function(r) {
              return function(o) {
                if (o.type === "opener") return Yr("opener", ke(window));
                if (o.type === "parent" && typeof o.distance == "number") return Yr("parent", function(w, p) {
                  return p === void 0 && (p = 1), function(m, y) {
                    y === void 0 && (y = 1);
                    for (var P = m, R = 0; R < y; R++) {
                      if (!P) return;
                      P = be(P);
                    }
                    return P;
                  }(w, yt(w) - p);
                }(window, o.distance));
                if (o.type === "global" && o.uid && typeof o.uid == "string") {
                  var i = o.uid, s = Sr(window);
                  if (!s) throw new Error("Can not find ancestor window");
                  for (var u = 0, f = gn(s); u < f.length; u++) {
                    var d = f[u];
                    if (pe(d)) {
                      var v = si(d, function(w) {
                        return w.windows && w.windows[i];
                      });
                      if (v) return v;
                    }
                  }
                } else if (o.type === "name") {
                  var g = o.name;
                  return Yr("namedWindow", function(w, p) {
                    return Pr(w, p) || function m(y, P) {
                      var R = Pr(y, P);
                      if (R) return R;
                      for (var I = 0, _ = tr(y); I < _.length; I++) {
                        var q = m(_[I], P);
                        if (q) return q;
                      }
                    }(Sn(w) || w, p);
                  }(Yr("ancestor", Sr(window)), g));
                }
                throw new Error("Unable to find " + o.type + " parent component window");
              }(r.metaData.windowRef);
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
        return $a(window.name);
      }
      function qa(e, n) {
        if (n === void 0 && (n = window), e === be(n)) return {
          type: "parent",
          distance: yt(e)
        };
        if (e === ke(n)) return {
          type: "opener"
        };
        if (pe(e) && (o = e, o !== Sn(o))) {
          var r = en(e).name;
          if (r) return {
            type: "name",
            name: r
          };
        }
        var o;
      }
      function li(e, n, r, o, i) {
        if (!e.hasOwnProperty(r)) return o;
        var s = e[r];
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
      function Ha() {
        return O.try(function() {
          window.focus();
        });
      }
      function hi() {
        return O.try(function() {
          window.close();
        });
      }
      var Tn = function() {
        return we;
      }, Gn = function(e) {
        return Vr(e.value);
      };
      function Jt(e, n, r) {
        for (var o = 0, i = Object.keys(S({}, e, n)); o < i.length; o++) {
          var s = i[o];
          r(s, n[s], e[s]);
        }
      }
      function pi(e, n, r) {
        var o = {};
        return O.all(function(i, s, u) {
          var f = [];
          return Jt(i, s, function(d, v, g) {
            var w = function(p, m, y) {
              return O.resolve().then(function() {
                var P, R;
                if (y != null && m) {
                  var I = (P = {}, P.get = m.queryParam, P.post = m.bodyParam, P)[r], _ = (R = {}, R.get = m.queryValue, R.post = m.bodyValue, R)[r];
                  if (I) return O.hash({
                    finalParam: O.try(function() {
                      return typeof I == "function" ? I({
                        value: y
                      }) : typeof I == "string" ? I : p;
                    }),
                    finalValue: O.try(function() {
                      return typeof _ == "function" && _n(y) ? _({
                        value: y
                      }) : y;
                    })
                  }).then(function(q) {
                    var x = q.finalParam, j = q.finalValue, W;
                    if (typeof j == "boolean") W = j.toString();
                    else if (typeof j == "string") W = j.toString();
                    else if (typeof j == "object" && j !== null) {
                      if (m.serialization === rt.JSON) W = JSON.stringify(j);
                      else if (m.serialization === rt.BASE64) W = Ot(JSON.stringify(j));
                      else if (m.serialization === rt.DOTIFY || !m.serialization) {
                        W = function ee(G, U, te) {
                          U === void 0 && (U = ""), te === void 0 && (te = {}), U = U && U + ".";
                          for (var X in G) G.hasOwnProperty(X) && G[X] != null && typeof G[X] != "function" && (G[X] && Array.isArray(G[X]) && G[X].length && G[X].every(function(Se) {
                            return typeof Se != "object";
                          }) ? te["" + U + X + "[]"] = G[X].join(",") : G[X] && typeof G[X] == "object" ? te = ee(G[X], "" + U + X, te) : te["" + U + X] = G[X].toString());
                          return te;
                        }(j, p);
                        for (var Z = 0, L = Object.keys(W); Z < L.length; Z++) {
                          var oe = L[Z];
                          o[oe] = W[oe];
                        }
                        return;
                      }
                    } else typeof j == "number" && (W = j.toString());
                    o[x] = W;
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
        var n = e.uid, r = e.options, o = e.overrides, i = o === void 0 ? {} : o, s = e.parentWin, u = s === void 0 ? window : s, f = r.propsDef, d = r.containerTemplate, v = r.prerenderTemplate, g = r.tag, w = r.name, p = r.attributes, m = r.dimensions, y = r.autoResize, P = r.url, R = r.domain, I = r.exports, _ = new O(), q = [], x = Kr(), j = {}, W = {}, Z = {
          visible: !0
        }, L = i.event ? i.event : (oe = {}, ee = {}, G = {
          on: function(T, N) {
            var F = ee[T] = ee[T] || [];
            F.push(N);
            var A = !1;
            return {
              cancel: function() {
                A || (A = !0, F.splice(F.indexOf(N), 1));
              }
            };
          },
          once: function(T, N) {
            var F = G.on(T, function() {
              F.cancel(), N();
            });
            return F;
          },
          trigger: function(T) {
            for (var N = arguments.length, F = new Array(N > 1 ? N - 1 : 0), A = 1; A < N; A++) F[A - 1] = arguments[A];
            var k = ee[T], J = [];
            if (k)
              for (var le = function() {
                var Ae = k[he];
                J.push(O.try(function() {
                  return Ae.apply(void 0, F);
                }));
              }, he = 0; he < k.length; he++) le();
            return O.all(J).then(we);
          },
          triggerOnce: function(T) {
            if (oe[T]) return O.resolve();
            oe[T] = !0;
            for (var N = arguments.length, F = new Array(N > 1 ? N - 1 : 0), A = 1; A < N; A++) F[A - 1] = arguments[A];
            return G.trigger.apply(G, [T].concat(F));
          },
          reset: function() {
            ee = {};
          }
        }), oe, ee, G, U = i.props ? i.props : {}, te, X, Se, En, sn, An = !1, Mn = i.onError, Cn = i.getProxyContainer, zn = i.show, Fn = i.hide, Jn = i.close, Ln = i.renderContainer, vn = i.getProxyWindow, Kn = i.setProxyWin, jn = i.openFrame, Un = i.openPrerenderFrame, Yn = i.prerender, Zn = i.open, ne = i.openPrerender, un = i.watchForUnload, re = i.getInternalState, _e = i.setInternalState, Oe = function() {
          return typeof m == "function" ? m({
            props: U
          }) : m;
        }, We = function() {
          return O.try(function() {
            return i.resolveInitPromise ? i.resolveInitPromise() : _.resolve();
          });
        }, Ee = function(T) {
          return O.try(function() {
            return i.rejectInitPromise ? i.rejectInitPromise(T) : _.reject(T);
          });
        }, He = function(T) {
          for (var N = {}, F = 0, A = Object.keys(U); F < A.length; F++) {
            var k = A[F], J = f[k];
            if (!J || J.sendToChild !== !1) {
              var le = J && J.trustedDomains && J.trustedDomains.length > 0 ? J.trustedDomains.reduce(function(he, Ae) {
                return he || rn(Ae, T);
              }, !1) : rn(T, ae(window));
              J && J.sameDomain && !le || J && J.trustedDomains && !le || (N[k] = U[k]);
            }
          }
          return O.hash(N);
        }, Ie = function() {
          return O.try(function() {
            return re ? re() : Z;
          });
        }, xe = function(T) {
          return O.try(function() {
            return _e ? _e(T) : Z = S({}, Z, T);
          });
        }, cn = function() {
          return vn ? vn() : O.try(function() {
            var T = U.window;
            if (T) {
              var N = Ir(T);
              return x.register(function() {
                return T.close();
              }), N;
            }
            return new an({
              send: pn
            });
          });
        }, Ye = function(T) {
          return Kn ? Kn(T) : O.try(function() {
            te = T;
          });
        }, wn = function() {
          return zn ? zn() : O.hash({
            setState: xe({
              visible: !0
            }),
            showElement: X ? X.get().then(_a) : null
          }).then(we);
        }, Nn = function() {
          return Fn ? Fn() : O.hash({
            setState: xe({
              visible: !1
            }),
            showElement: X ? X.get().then(Do) : null
          }).then(we);
        }, cr = function() {
          return typeof P == "function" ? P({
            props: U
          }) : P;
        }, dr = function() {
          return typeof p == "function" ? p({
            props: U
          }) : p;
        }, Xn = function() {
          return On(cr());
        }, Ze = function(T, N) {
          var F = N.windowName;
          return jn ? jn(T, {
            windowName: F
          }) : O.try(function() {
            if (T === Pe.IFRAME) return nt(Io({
              attributes: S({
                name: F,
                title: w
              }, dr().iframe)
            }));
          });
        }, Dr = function(T) {
          return Un ? Un(T) : O.try(function() {
            if (T === Pe.IFRAME) return nt(Io({
              attributes: S({
                name: "__zoid_prerender_frame__" + w + "_" + qe() + "__",
                title: "prerender__" + w
              }, dr().iframe)
            }));
          });
        }, _r = function(T, N, F) {
          return ne ? ne(T, N, F) : O.try(function() {
            if (T === Pe.IFRAME) {
              if (!F) throw new Error("Expected proxy frame to be passed");
              return F.get().then(function(A) {
                return x.register(function() {
                  return Cr(A);
                }), _t(A).then(function(k) {
                  return en(k);
                }).then(function(k) {
                  return Ir(k);
                });
              });
            }
            if (T === Pe.POPUP) return N;
            throw new Error("No render context available for " + T);
          });
        }, fr = function() {
          return O.try(function() {
            if (te) return O.all([L.trigger(me.FOCUS), te.focus()]).then(we);
          });
        }, tt = function() {
          var T = xr(window);
          return T.windows = T.windows || {}, T.windows[n] = window, x.register(function() {
            delete T.windows[n];
          }), n;
        }, Wr = function(T, N, F, A) {
          if (N === ae(window)) return {
            type: "global",
            uid: tt()
          };
          if (T !== window) throw new Error("Can not construct cross-domain window reference for different target window");
          if (U.window) {
            var k = A.getWindow();
            if (!k) throw new Error("Can not construct cross-domain window reference for lazy window prop");
            if (Sr(k) !== window) throw new Error("Can not construct cross-domain window reference for window prop with different ancestor");
          }
          if (F === Pe.POPUP) return {
            type: "opener"
          };
          if (F === Pe.IFRAME) return {
            type: "parent",
            distance: yt(window)
          };
          throw new Error("Can not construct window reference for child");
        }, ot = function(T, N) {
          return O.try(function() {
            var F;
            En = T, Se = N, (F = te) == null || F.isPopup().then(function(A) {
              if ((N == null ? void 0 : N.name) !== "" && A) {
                var k;
                (k = te) == null || k.setName(N == null ? void 0 : N.name);
              }
            }).finally(function() {
              We(), x.register(function() {
                return N.close.fireAndForget().catch(we);
              });
            });
          });
        }, Ar = function(T) {
          var N = T.width, F = T.height;
          return O.try(function() {
            L.trigger(me.RESIZE, {
              width: N,
              height: F
            });
          });
        }, Mr = function(T) {
          return O.try(function() {
            return L.trigger(me.DESTROY);
          }).catch(we).then(function() {
            return x.all(T);
          }).then(function() {
            var N = T || new Error("Component destroyed");
            sn && ur(sn) || N.message === "Window navigated away" ? _.resolve() : _.asyncReject(N);
          });
        }, In = Dn(function(T) {
          return O.try(function() {
            return Jn ? ve(Jn.__source__) ? void 0 : Jn() : O.try(function() {
              return L.trigger(me.CLOSE);
            }).then(function() {
              return Mr(T || new Error("Component closed"));
            });
          });
        }), gi = function(T, N) {
          var F = N.proxyWin, A = N.proxyFrame, k = N.windowName;
          return Zn ? Zn(T, {
            proxyWin: F,
            proxyFrame: A,
            windowName: k
          }) : O.try(function() {
            if (T === Pe.IFRAME) {
              if (!A) throw new Error("Expected proxy frame to be passed");
              return A.get().then(function(Re) {
                return _t(Re).then(function(de) {
                  return x.register(function() {
                    return Cr(Re);
                  }), x.register(function() {
                    return ai(de);
                  }), de;
                });
              });
            }
            if (T === Pe.POPUP) {
              var J = Oe(), le = J.width, he = le === void 0 ? "300px" : le, Ae = J.height, ge = Ae === void 0 ? "150px" : Ae;
              he = zo(he, window.outerWidth), ge = zo(ge, window.outerWidth);
              var De = function(Re, de) {
                var Te = (de = de || {}).closeOnUnload, ye = Te === void 0 ? 1 : Te, Xe = de.name, Me = Xe === void 0 ? "" : Xe, ie = de.width, ze = de.height, Je = 0, Ue = 0;
                ie && (window.outerWidth ? Ue = Math.round((window.outerWidth - ie) / 2) + window.screenX : window.screen.width && (Ue = Math.round((window.screen.width - ie) / 2))), ze && (window.outerHeight ? Je = Math.round((window.outerHeight - ze) / 2) + window.screenY : window.screen.height && (Je = Math.round((window.screen.height - ze) / 2))), delete de.closeOnUnload, delete de.name, ie && ze && (de = S({
                  top: Je,
                  left: Ue,
                  width: ie,
                  height: ze,
                  status: 1,
                  toolbar: 0,
                  menubar: 0,
                  resizable: 1,
                  scrollbars: 1
                }, de));
                var Qn = Object.keys(de).map(function(bn) {
                  if (de[bn] != null) return bn + "=" + Gr(de[bn]);
                }).filter(Boolean).join(","), dn;
                try {
                  dn = window.open("", Me, Qn);
                } catch (bn) {
                  throw new Dt("Can not open popup window - " + (bn.stack || bn.message));
                }
                if (ve(dn))
                  throw new Dt("Can not open popup window - blocked");
                return ye && window.addEventListener("unload", function() {
                  return dn.close();
                }), dn;
              }(0, S({
                name: k,
                width: he,
                height: ge
              }, dr().popup));
              return x.register(function() {
                return vo(De);
              }), x.register(function() {
                return ai(De);
              }), De;
            }
            throw new Error("No render context available for " + T);
          }).then(function(J) {
            return F.setWindow(J, {
              send: pn
            }), F.setName(k).then(function() {
              return F;
            });
          });
        }, yi = function() {
          return O.try(function() {
            var T = xo(window, "unload", Vr(function() {
              Mr(new Error("Window navigated away"));
            })), N = ho(u, Mr, 3e3);
            if (x.register(N.cancel), x.register(T.cancel), un) return un();
          });
        }, Ei = function(T) {
          var N = !1;
          return T.isClosed().then(function(F) {
            return F ? (N = !0, In(new Error("Detected component window close"))) : O.delay(200).then(function() {
              return T.isClosed();
            }).then(function(A) {
              if (A)
                return N = !0, In(new Error("Detected component window close"));
            });
          }).then(function() {
            return N;
          });
        }, zr = function(T) {
          return Mn ? Mn(T) : O.try(function() {
            if (q.indexOf(T) === -1)
              return q.push(T), _.asyncReject(T), L.trigger(me.ERROR, T);
          });
        }, bi = new O(), Pi = function(T) {
          return O.try(function() {
            bi.resolve(T);
          });
        };
        ot.onError = zr;
        var Si = function(T, N) {
          return T({
            uid: n,
            container: N.container,
            context: N.context,
            doc: N.doc,
            frame: N.frame,
            prerenderFrame: N.prerenderFrame,
            focus: fr,
            close: In,
            state: j,
            props: U,
            tag: g,
            dimensions: Oe(),
            event: L
          });
        }, Oi = function(T, N) {
          var F = N.context;
          return Yn ? Yn(T, {
            context: F
          }) : O.try(function() {
            if (v) {
              L.trigger(me.PRERENDER);
              var A = T.getWindow();
              if (A && pe(A) && function(Te) {
                try {
                  if (!Te.location.href || Te.location.href === "about:blank") return !0;
                } catch {
                }
                return !1;
              }(A)) {
                var k = (A = en(A)).document, J = Si(v, {
                  context: F,
                  doc: k
                });
                if (J) {
                  if (J.ownerDocument !== k) throw new Error("Expected prerender template to have been created with document from child window");
                  (function(Te, ye) {
                    var Xe = ye.tagName.toLowerCase();
                    if (Xe !== "html") throw new Error("Expected element to be html, got " + Xe);
                    for (var Me = Te.document.documentElement, ie = 0, ze = Ct(Me.children); ie < ze.length; ie++) Me.removeChild(ze[ie]);
                    for (var Je = 0, Ue = Ct(ye.children); Je < Ue.length; Je++) Me.appendChild(Ue[Je]);
                  })(A, J);
                  var le = y.width, he = le !== void 0 && le, Ae = y.height, ge = Ae !== void 0 && Ae, De = y.element, Re = De === void 0 ? "body" : De;
                  if ((Re = xt(Re, k)) && (he || ge)) {
                    var de = _o(Re, function(Te) {
                      Ar({
                        width: he ? Te.width : void 0,
                        height: ge ? Te.height : void 0
                      });
                    }, {
                      width: he,
                      height: ge,
                      win: A
                    });
                    L.on(me.RENDERED, de.cancel);
                  }
                  L.trigger(me.PRERENDERED);
                }
              }
            }
          });
        }, Ri = function(T, N) {
          var F = N.proxyFrame, A = N.proxyPrerenderFrame, k = N.context, J = N.rerender;
          return Ln ? Ln(T, {
            proxyFrame: F,
            proxyPrerenderFrame: A,
            context: k,
            rerender: J
          }) : O.hash({
            container: T.get(),
            frame: F ? F.get() : null,
            prerenderFrame: A ? A.get() : null,
            internalState: Ie()
          }).then(function(le) {
            var he = le.container, Ae = le.internalState.visible, ge = Si(d, {
              context: k,
              container: he,
              frame: le.frame,
              prerenderFrame: le.prerenderFrame,
              doc: document
            });
            if (ge) {
              Ae || Do(ge), Da(he, ge);
              var De = function(Re, de) {
                de = Vr(de);
                var Te = !1, ye = [], Xe, Me, ie, ze = function() {
                  Te = !0;
                  for (var dn = 0; dn < ye.length; dn++) ye[dn].disconnect();
                  Xe && Xe.cancel(), ie && ie.removeEventListener("unload", Je), Me && Cr(Me);
                }, Je = function() {
                  Te || (de(), ze());
                };
                if (ur(Re))
                  return Je(), {
                    cancel: ze
                  };
                if (window.MutationObserver)
                  for (var Ue = Re.parentElement; Ue; ) {
                    var Qn = new window.MutationObserver(function() {
                      ur(Re) && Je();
                    });
                    Qn.observe(Ue, {
                      childList: !0
                    }), ye.push(Qn), Ue = Ue.parentElement;
                  }
                return (Me = document.createElement("iframe")).setAttribute("name", "__detect_close_" + qe() + "__"), Me.style.display = "none", _t(Me).then(function(dn) {
                  (ie = en(dn)).addEventListener("unload", Je);
                }), Re.appendChild(Me), Xe = Rr(function() {
                  ur(Re) && Je();
                }, 1e3), {
                  cancel: ze
                };
              }(ge, function() {
                var Re = new Error("Detected container element removed from DOM");
                return O.delay(1).then(function() {
                  if (!ur(ge))
                    return x.all(Re), J().then(We, Ee);
                  In(Re);
                });
              });
              return x.register(function() {
                return De.cancel();
              }), x.register(function() {
                return Cr(ge);
              }), X = nt(ge);
            }
          });
        }, Ti = function() {
          return {
            state: j,
            event: L,
            close: In,
            focus: fr,
            resize: Ar,
            onError: zr,
            updateProps: ns,
            show: wn,
            hide: Nn
          };
        }, Zt = function(T) {
          T === void 0 && (T = {});
          var N = sn, F = Ti();
          sr(W, T), function(A, k, J, le, he) {
            var Ae = le.state, ge = le.close, De = le.focus, Re = le.event, de = le.onError;
            Jt(J, A, function(Te, ye, Xe) {
              var Me = !1, ie = Xe;
              Object.defineProperty(k, Te, {
                configurable: !0,
                enumerable: !0,
                get: function() {
                  return Me ? ie : (Me = !0, function() {
                    if (!ye) return ie;
                    var ze = ye.alias;
                    if (ze && !_n(Xe) && _n(J[ze]) && (ie = J[ze]), ye.value && (ie = ye.value({
                      props: k,
                      state: Ae,
                      close: ge,
                      focus: De,
                      event: Re,
                      onError: de,
                      container: he
                    })), !ye.default || _n(ie) || _n(J[Te]) || (ie = ye.default({
                      props: k,
                      state: Ae,
                      close: ge,
                      focus: De,
                      event: Re,
                      onError: de,
                      container: he
                    })), _n(ie)) {
                      if (ye.type === fe.ARRAY ? !Array.isArray(ie) : typeof ie !== ye.type) throw new TypeError("Prop is not of type " + ye.type + ": " + Te);
                    } else if (ye.required !== !1 && !_n(J[Te])) throw new Error('Expected prop "' + Te + '" to be defined');
                    return _n(ie) && ye.decorate && (ie = ye.decorate({
                      value: ie,
                      props: k,
                      state: Ae,
                      close: ge,
                      focus: De,
                      event: Re,
                      onError: de,
                      container: he
                    })), ie;
                  }());
                }
              });
            }), Jt(k, A, we);
          }(f, U, W, F, N);
        }, ns = function(T) {
          return Zt(T), _.then(function() {
            var N = Se, F = te;
            if (N && F && En) return He(En).then(function(A) {
              return N.updateProps(A).catch(function(k) {
                return Ei(F).then(function(J) {
                  if (!J) throw k;
                });
              });
            });
          });
        }, Ci = function(T) {
          return Cn ? Cn(T) : O.try(function() {
            return Co(T);
          }).then(function(N) {
            return Wt(N) && (N = function F(A) {
              var k = function(Ae) {
                var ge = function(De) {
                  for (; De.parentNode; ) De = De.parentNode;
                  if (Wt(De)) return De;
                }(Ae);
                if (ge && ge.host) return ge.host;
              }(A);
              if (!k) throw new Error("Element is not in shadow dom");
              var J = "shadow-slot-" + qe(), le = document.createElement("slot");
              le.setAttribute("name", J), A.appendChild(le);
              var he = document.createElement("div");
              return he.setAttribute("slot", J), k.appendChild(he), Wt(k) ? F(he) : he;
            }(N)), sn = N, nt(N);
          });
        };
        return {
          init: function() {
            (function() {
              L.on(me.RENDER, function() {
                return U.onRender();
              }), L.on(me.PRERENDER, function() {
                return U.onPrerender();
              }), L.on(me.DISPLAY, function() {
                return U.onDisplay();
              }), L.on(me.RENDERED, function() {
                return U.onRendered();
              }), L.on(me.PRERENDERED, function() {
                return U.onPrerendered();
              }), L.on(me.CLOSE, function() {
                return U.onClose();
              }), L.on(me.DESTROY, function() {
                return U.onDestroy();
              }), L.on(me.RESIZE, function() {
                return U.onResize();
              }), L.on(me.FOCUS, function() {
                return U.onFocus();
              }), L.on(me.PROPS, function(T) {
                return U.onProps(T);
              }), L.on(me.ERROR, function(T) {
                return U && U.onError ? U.onError(T) : Ee(T).then(function() {
                  setTimeout(function() {
                    throw T;
                  }, 1);
                });
              }), x.register(L.reset);
            })();
          },
          render: function(T) {
            var N = T.target, F = T.container, A = T.context, k = T.rerender;
            return O.try(function() {
              var J = Xn(), le = R || Xn();
              (function(H, Fe, Ce) {
                if (H !== window) {
                  if (!Br(window, H)) throw new Error("Can only renderTo an adjacent frame");
                  var Le = ae();
                  if (!rn(Fe, Le) && !pe(H)) throw new Error("Can not render remotely to " + Fe.toString() + " - can only render to " + Le);
                  if (Ce && typeof Ce != "string") throw new Error("Container passed to renderTo must be a string selector, got " + typeof Ce + " }");
                }
              })(N, le, F);
              var he = O.try(function() {
                if (N !== window) return function(H, Fe) {
                  for (var Ce = {}, Le = 0, nn = Object.keys(U); Le < nn.length; Le++) {
                    var Ne = nn[Le], ln = f[Ne];
                    ln && ln.allowDelegate && (Ce[Ne] = U[Ne]);
                  }
                  var Be = pn(Fe, "zoid_delegate_" + w, {
                    uid: n,
                    overrides: {
                      props: Ce,
                      event: L,
                      close: In,
                      onError: zr,
                      getInternalState: Ie,
                      setInternalState: xe,
                      resolveInitPromise: We,
                      rejectInitPromise: Ee
                    }
                  }).then(function(K) {
                    var Y = K.data.parent;
                    return x.register(function(D) {
                      if (!ve(Fe)) return Y.destroy(D);
                    }), Y.getDelegateOverrides();
                  }).catch(function(K) {
                    throw new Error(`Unable to delegate rendering. Possibly the component is not loaded in the target window.

` + ar(K));
                  });
                  return Cn = function() {
                    for (var K = arguments.length, Y = new Array(K), D = 0; D < K; D++) Y[D] = arguments[D];
                    return Be.then(function(Q) {
                      return Q.getProxyContainer.apply(Q, Y);
                    });
                  }, Ln = function() {
                    for (var K = arguments.length, Y = new Array(K), D = 0; D < K; D++) Y[D] = arguments[D];
                    return Be.then(function(Q) {
                      return Q.renderContainer.apply(Q, Y);
                    });
                  }, zn = function() {
                    for (var K = arguments.length, Y = new Array(K), D = 0; D < K; D++) Y[D] = arguments[D];
                    return Be.then(function(Q) {
                      return Q.show.apply(Q, Y);
                    });
                  }, Fn = function() {
                    for (var K = arguments.length, Y = new Array(K), D = 0; D < K; D++) Y[D] = arguments[D];
                    return Be.then(function(Q) {
                      return Q.hide.apply(Q, Y);
                    });
                  }, un = function() {
                    for (var K = arguments.length, Y = new Array(K), D = 0; D < K; D++) Y[D] = arguments[D];
                    return Be.then(function(Q) {
                      return Q.watchForUnload.apply(Q, Y);
                    });
                  }, H === Pe.IFRAME ? (vn = function() {
                    for (var K = arguments.length, Y = new Array(K), D = 0; D < K; D++) Y[D] = arguments[D];
                    return Be.then(function(Q) {
                      return Q.getProxyWindow.apply(Q, Y);
                    });
                  }, jn = function() {
                    for (var K = arguments.length, Y = new Array(K), D = 0; D < K; D++) Y[D] = arguments[D];
                    return Be.then(function(Q) {
                      return Q.openFrame.apply(Q, Y);
                    });
                  }, Un = function() {
                    for (var K = arguments.length, Y = new Array(K), D = 0; D < K; D++) Y[D] = arguments[D];
                    return Be.then(function(Q) {
                      return Q.openPrerenderFrame.apply(Q, Y);
                    });
                  }, Yn = function() {
                    for (var K = arguments.length, Y = new Array(K), D = 0; D < K; D++) Y[D] = arguments[D];
                    return Be.then(function(Q) {
                      return Q.prerender.apply(Q, Y);
                    });
                  }, Zn = function() {
                    for (var K = arguments.length, Y = new Array(K), D = 0; D < K; D++) Y[D] = arguments[D];
                    return Be.then(function(Q) {
                      return Q.open.apply(Q, Y);
                    });
                  }, ne = function() {
                    for (var K = arguments.length, Y = new Array(K), D = 0; D < K; D++) Y[D] = arguments[D];
                    return Be.then(function(Q) {
                      return Q.openPrerender.apply(Q, Y);
                    });
                  }) : H === Pe.POPUP && (Kn = function() {
                    for (var K = arguments.length, Y = new Array(K), D = 0; D < K; D++) Y[D] = arguments[D];
                    return Be.then(function(Q) {
                      return Q.setProxyWin.apply(Q, Y);
                    });
                  }), Be;
                }(A, N);
              }), Ae = U.window, ge = yi(), De = pi(f, U, "post"), Re = L.trigger(me.RENDER), de = Ci(F), Te = cn(), ye = de.then(function() {
                return Zt();
              }), Xe = ye.then(function() {
                return pi(f, U, "get").then(function(H) {
                  return function(Fe, Ce) {
                    var Le = Ce.query || {}, nn = Ce.hash || {}, Ne, ln, Be = Fe.split("#");
                    ln = Be[1];
                    var K = (Ne = Be[0]).split("?");
                    Ne = K[0];
                    var Y = To(K[1], Le), D = To(ln, nn);
                    return Y && (Ne = Ne + "?" + Y), D && (Ne = Ne + "#" + D), Ne;
                  }(Et(cr()), {
                    query: H
                  });
                });
              }), Me = Te.then(function(H) {
                return function(Ce) {
                  var Le = Ce === void 0 ? {} : Ce, nn = Le.proxyWin, Ne = Le.initialChildDomain, ln = Le.childDomainMatch, Be = Le.target, K = Be === void 0 ? window : Be, Y = Le.context;
                  return function(D) {
                    var Q = D === void 0 ? {} : D, Xt = Q.proxyWin, us = Q.childDomainMatch, cs = Q.context;
                    return He(Q.initialChildDomain).then(function(ds) {
                      return {
                        uid: n,
                        context: cs,
                        tag: g,
                        childDomainMatch: us,
                        version: "10_3_3",
                        props: ds,
                        exports: (xi = Xt, {
                          init: function(fs) {
                            return ot(this.origin, fs);
                          },
                          close: In,
                          checkClose: function() {
                            return Ei(xi);
                          },
                          resize: Ar,
                          onError: zr,
                          show: wn,
                          hide: Nn,
                          export: Pi
                        })
                      };
                      var xi;
                    });
                  }({
                    proxyWin: nn,
                    initialChildDomain: Ne,
                    childDomainMatch: ln,
                    context: Y
                  }).then(function(D) {
                    var Q = ui({
                      data: D,
                      metaData: {
                        windowRef: Wr(K, Ne, Y, nn)
                      },
                      sender: {
                        domain: ae(window)
                      },
                      receiver: {
                        win: nn,
                        domain: ln
                      },
                      passByReference: Ne === ae()
                    }), Xt = Q.serializedData;
                    return x.register(Q.cleanReference), Xt;
                  });
                }({
                  proxyWin: (Fe = {
                    proxyWin: H,
                    initialChildDomain: J,
                    childDomainMatch: le,
                    target: N,
                    context: A
                  }).proxyWin,
                  initialChildDomain: Fe.initialChildDomain,
                  childDomainMatch: Fe.childDomainMatch,
                  target: Fe.target,
                  context: Fe.context
                }).then(function(Ce) {
                  return di({
                    name: w,
                    serializedPayload: Ce
                  });
                });
                var Fe;
              }), ie = Me.then(function(H) {
                return Ze(A, {
                  windowName: H
                });
              }), ze = Dr(A), Je = O.hash({
                proxyContainer: de,
                proxyFrame: ie,
                proxyPrerenderFrame: ze
              }).then(function(H) {
                return Ri(H.proxyContainer, {
                  context: A,
                  proxyFrame: H.proxyFrame,
                  proxyPrerenderFrame: H.proxyPrerenderFrame,
                  rerender: k
                });
              }).then(function(H) {
                return H;
              }), Ue = O.hash({
                windowName: Me,
                proxyFrame: ie,
                proxyWin: Te
              }).then(function(H) {
                var Fe = H.proxyWin;
                return Ae ? Fe : gi(A, {
                  windowName: H.windowName,
                  proxyWin: Fe,
                  proxyFrame: H.proxyFrame
                });
              }), Qn = O.hash({
                proxyWin: Ue,
                proxyPrerenderFrame: ze
              }).then(function(H) {
                return _r(A, H.proxyWin, H.proxyPrerenderFrame);
              }), dn = Ue.then(function(H) {
                return te = H, Ye(H);
              }), bn = O.hash({
                proxyPrerenderWin: Qn,
                state: dn
              }).then(function(H) {
                return Oi(H.proxyPrerenderWin, {
                  context: A
                });
              }), Ni = O.hash({
                proxyWin: Ue,
                windowName: Me
              }).then(function(H) {
                if (Ae) return H.proxyWin.setName(H.windowName);
              }), rs = O.hash({
                body: De
              }).then(function(H) {
                return r.method ? r.method : Object.keys(H.body).length ? "post" : "get";
              }), Ii = O.hash({
                proxyWin: Ue,
                windowUrl: Xe,
                body: De,
                method: rs,
                windowName: Ni,
                prerender: bn
              }).then(function(H) {
                return H.proxyWin.setLocation(H.windowUrl, {
                  method: H.method,
                  body: H.body
                });
              }), ts = Ue.then(function(H) {
                (function Fe(Ce, Le) {
                  var nn = !1;
                  return x.register(function() {
                    nn = !0;
                  }), O.delay(2e3).then(function() {
                    return Ce.isClosed();
                  }).then(function(Ne) {
                    if (!nn) {
                      if (Le === Pe.POPUP && Ne) return In(new Error("Detected popup close"));
                      var ln = !!(sn && ur(sn));
                      return Le === Pe.IFRAME && Ne && (ln || An) ? In(new Error("Detected iframe close")) : Fe(Ce, Le);
                    }
                  });
                })(H, A);
              }), os = O.hash({
                container: Je,
                prerender: bn
              }).then(function() {
                return L.trigger(me.DISPLAY);
              }), is = Ue.then(function(H) {
                return function(Fe, Ce, Le) {
                  return O.try(function() {
                    return Fe.awaitWindow();
                  }).then(function(nn) {
                    if (Wn && Wn.needsBridge({
                      win: nn,
                      domain: Ce
                    }) && !Wn.hasBridge(Ce, Ce)) {
                      var Ne = typeof r.bridgeUrl == "function" ? r.bridgeUrl({
                        props: U
                      }) : r.bridgeUrl;
                      if (!Ne) throw new Error("Bridge needed to render " + Le);
                      var ln = On(Ne);
                      return Wn.linkUrl(nn, Ce), Wn.openBridge(Et(Ne), ln);
                    }
                  });
                }(H, J, A);
              }), as = Ii.then(function() {
                return O.try(function() {
                  var H = U.timeout;
                  if (H) return _.timeout(H, new Error("Loading component timed out after " + H + " milliseconds"));
                });
              }), ss = _.then(function() {
                return An = !0, L.trigger(me.RENDERED);
              });
              return O.hash({
                initPromise: _,
                buildUrlPromise: Xe,
                onRenderPromise: Re,
                getProxyContainerPromise: de,
                openFramePromise: ie,
                openPrerenderFramePromise: ze,
                renderContainerPromise: Je,
                openPromise: Ue,
                openPrerenderPromise: Qn,
                setStatePromise: dn,
                prerenderPromise: bn,
                loadUrlPromise: Ii,
                buildWindowNamePromise: Me,
                setWindowNamePromise: Ni,
                watchForClosePromise: ts,
                onDisplayPromise: os,
                openBridgePromise: is,
                runTimeoutPromise: as,
                onRenderedPromise: ss,
                delegatePromise: he,
                watchForUnloadPromise: ge,
                finalSetPropsPromise: ye
              });
            }).catch(function(J) {
              return O.all([zr(J), Mr(J)]).then(function() {
                throw J;
              }, function() {
                throw J;
              });
            }).then(we);
          },
          destroy: Mr,
          getProps: function() {
            return U;
          },
          setProps: Zt,
          export: Pi,
          getHelpers: Ti,
          getDelegateOverrides: function() {
            return O.try(function() {
              return {
                getProxyContainer: Ci,
                show: wn,
                hide: Nn,
                renderContainer: Ri,
                getProxyWindow: cn,
                watchForUnload: yi,
                openFrame: Ze,
                openPrerenderFrame: Dr,
                prerender: Oi,
                open: gi,
                openPrerender: _r,
                setProxyWin: Ye
              };
            });
          },
          getExports: function() {
            return I({
              getExports: function() {
                return bi;
              }
            });
          }
        };
      }
      var Va = {
        register: function(e, n, r, o) {
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
              var v = s.findDOMNode(this), g = r(sr({}, this.props));
              g.render(v, Pe.IFRAME), this.setState({
                parent: g
              });
            }, d.componentDidUpdate = function() {
              this.state && this.state.parent && this.state.parent.updateProps(sr({}, this.props)).catch(we);
            }, f;
          }(i.Component);
        }
      }, Ga = {
        register: function(e, n, r, o) {
          return o.component(e, {
            render: function(i) {
              return i("div");
            },
            inheritAttrs: !1,
            mounted: function() {
              var i = this.$el;
              this.parent = r(S({}, (s = this.$attrs, Object.keys(s).reduce(function(u, f) {
                var d = s[f];
                return f === "style-object" || f === "styleObject" ? (u.style = d, u.styleObject = d) : f.includes("-") ? u[Tt(f)] = d : u[f] = d, u;
              }, {}))));
              var s;
              this.parent.render(i, Pe.IFRAME);
            },
            watch: {
              $attrs: {
                handler: function() {
                  this.parent && this.$attrs && this.parent.updateProps(S({}, this.$attrs)).catch(we);
                },
                deep: !0
              }
            }
          });
        }
      }, Ja = {
        register: function(e, n, r) {
          return {
            template: "<div></div>",
            inheritAttrs: !1,
            mounted: function() {
              var o = this.$el;
              this.parent = r(S({}, (i = this.$attrs, Object.keys(i).reduce(function(s, u) {
                var f = i[u];
                return u === "style-object" || u === "styleObject" ? (s.style = f, s.styleObject = f) : u.includes("-") ? s[Tt(u)] = f : s[u] = f, s;
              }, {}))));
              var i;
              this.parent.render(o, Pe.IFRAME);
            },
            watch: {
              $attrs: {
                handler: function() {
                  this.parent && this.$attrs && this.parent.updateProps(S({}, this.$attrs)).catch(we);
                },
                deep: !0
              }
            }
          };
        }
      }, Ka = {
        register: function(e, n, r, o) {
          return o.module(e, []).directive(Tt(e), function() {
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
                  return Jr(f.props, function(p) {
                    return typeof p == "function" ? function() {
                      var m = p.apply(this, arguments);
                      return v(), m;
                    } : p;
                  });
                }, w = r(g());
                w.render(d[0], Pe.IFRAME), f.$watch(function() {
                  w.updateProps(g()).catch(we);
                });
              }]
            };
          });
        }
      }, Ya = {
        register: function(e, n, r, o) {
          var i = o.Component, s = o.NgModule, u = o.ElementRef, f = o.NgZone, d = o.Inject, v = function() {
            function w(m, y) {
              this.elementRef = void 0, this.internalProps = void 0, this.parent = void 0, this.props = void 0, this.zone = void 0, this._props = void 0, this._props = {}, this.elementRef = m, this.zone = y;
            }
            var p = w.prototype;
            return p.getProps = function() {
              var m = this;
              return Jr(S({}, this.internalProps, this.props), function(y) {
                if (typeof y == "function") {
                  var P = m.zone;
                  return function() {
                    var R = arguments, I = this;
                    return P.run(function() {
                      return y.apply(I, R);
                    });
                  };
                }
                return y;
              });
            }, p.ngOnInit = function() {
              var m = this.elementRef.nativeElement;
              this.parent = r(this.getProps()), this.parent.render(m, Pe.IFRAME);
            }, p.ngDoCheck = function() {
              this.parent && !function(m, y) {
                var P = {};
                for (var R in m) if (m.hasOwnProperty(R) && (P[R] = !0, m[R] !== y[R]))
                  return !1;
                for (var I in y) if (!P[I]) return !1;
                return !0;
              }(this._props, this.props) && (this._props = S({}, this.props), this.parent.updateProps(this.getProps()));
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
      function Za(e) {
        var n = e.uid, r = e.frame, o = e.prerenderFrame, i = e.doc, s = e.props, u = e.event, f = e.dimensions, d = f.width, v = f.height;
        if (r && o) {
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
        `)), g.appendChild(r), g.appendChild(o), g.appendChild(w), o.classList.add("zoid-visible"), r.classList.add("zoid-invisible"), u.on(me.RENDERED, function() {
            o.classList.remove("zoid-visible"), o.classList.add("zoid-invisible"), r.classList.remove("zoid-invisible"), r.classList.add("zoid-visible"), setTimeout(function() {
              Cr(o);
            }, 1);
          }), u.on(me.RESIZE, function(p) {
            var m = p.width, y = p.height;
            typeof m == "number" && (g.style.width = Mo(m)), typeof y == "number" && (g.style.height = Mo(y));
          }), g;
        }
      }
      function Xa(e) {
        var n = e.doc, r = e.props, o = n.createElement("html"), i = n.createElement("body"), s = n.createElement("style"), u = n.createElement("div");
        return u.classList.add("spinner"), r.cspNonce && s.setAttribute("nonce", r.cspNonce), o.appendChild(i), i.appendChild(u), i.appendChild(s), s.appendChild(n.createTextNode(`
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
      var Kt = Kr(), Yt = Kr();
      function Qa(e) {
        var n = function(y) {
          var P = y.tag, R = y.url, I = y.domain, _ = y.bridgeUrl, q = y.props, x = q === void 0 ? {} : q, j = y.dimensions, W = j === void 0 ? {} : j, Z = y.autoResize, L = Z === void 0 ? {} : Z, oe = y.allowedParentDomains, ee = oe === void 0 ? "*" : oe, G = y.attributes, U = G === void 0 ? {} : G, te = y.defaultContext, X = te === void 0 ? Pe.IFRAME : te, Se = y.containerTemplate, En = Se === void 0 ? Za : Se, sn = y.prerenderTemplate, An = sn === void 0 ? Xa : sn, Mn = y.validate, Cn = y.eligible, zn = Cn === void 0 ? function() {
            return {
              eligible: !0
            };
          } : Cn, Fn = y.logger, Jn = Fn === void 0 ? {
            info: we
          } : Fn, Ln = y.exports, vn = Ln === void 0 ? we : Ln, Kn = y.method, jn = y.children, Un = jn === void 0 ? function() {
            return {};
          } : jn, Yn = P.replace(/-/g, "_"), Zn = S({}, {
            window: {
              type: fe.OBJECT,
              sendToChild: !1,
              required: !1,
              allowDelegate: !0,
              validate: function(ne) {
                var un = ne.value;
                if (!Hn(un) && !an.isProxyWindow(un)) throw new Error("Expected Window or ProxyWindow");
                if (Hn(un)) {
                  if (ve(un)) throw new Error("Window is closed");
                  if (!pe(un)) throw new Error("Window is not same domain");
                }
              },
              decorate: function(ne) {
                return Ir(ne.value);
              }
            },
            timeout: {
              type: fe.NUMBER,
              required: !1,
              sendToChild: !1
            },
            cspNonce: {
              type: fe.STRING,
              required: !1
            },
            onDisplay: {
              type: fe.FUNCTION,
              required: !1,
              sendToChild: !1,
              allowDelegate: !0,
              default: Tn,
              decorate: Gn
            },
            onRendered: {
              type: fe.FUNCTION,
              required: !1,
              sendToChild: !1,
              default: Tn,
              decorate: Gn
            },
            onRender: {
              type: fe.FUNCTION,
              required: !1,
              sendToChild: !1,
              default: Tn,
              decorate: Gn
            },
            onPrerendered: {
              type: fe.FUNCTION,
              required: !1,
              sendToChild: !1,
              default: Tn,
              decorate: Gn
            },
            onPrerender: {
              type: fe.FUNCTION,
              required: !1,
              sendToChild: !1,
              default: Tn,
              decorate: Gn
            },
            onClose: {
              type: fe.FUNCTION,
              required: !1,
              sendToChild: !1,
              allowDelegate: !0,
              default: Tn,
              decorate: Gn
            },
            onDestroy: {
              type: fe.FUNCTION,
              required: !1,
              sendToChild: !1,
              allowDelegate: !0,
              default: Tn,
              decorate: Gn
            },
            onResize: {
              type: fe.FUNCTION,
              required: !1,
              sendToChild: !1,
              allowDelegate: !0,
              default: Tn
            },
            onFocus: {
              type: fe.FUNCTION,
              required: !1,
              sendToChild: !1,
              allowDelegate: !0,
              default: Tn
            },
            close: {
              type: fe.FUNCTION,
              required: !1,
              sendToChild: !1,
              childDecorate: function(ne) {
                return ne.close;
              }
            },
            focus: {
              type: fe.FUNCTION,
              required: !1,
              sendToChild: !1,
              childDecorate: function(ne) {
                return ne.focus;
              }
            },
            resize: {
              type: fe.FUNCTION,
              required: !1,
              sendToChild: !1,
              childDecorate: function(ne) {
                return ne.resize;
              }
            },
            uid: {
              type: fe.STRING,
              required: !1,
              sendToChild: !1,
              childDecorate: function(ne) {
                return ne.uid;
              }
            },
            tag: {
              type: fe.STRING,
              required: !1,
              sendToChild: !1,
              childDecorate: function(ne) {
                return ne.tag;
              }
            },
            getParent: {
              type: fe.FUNCTION,
              required: !1,
              sendToChild: !1,
              childDecorate: function(ne) {
                return ne.getParent;
              }
            },
            getParentDomain: {
              type: fe.FUNCTION,
              required: !1,
              sendToChild: !1,
              childDecorate: function(ne) {
                return ne.getParentDomain;
              }
            },
            show: {
              type: fe.FUNCTION,
              required: !1,
              sendToChild: !1,
              childDecorate: function(ne) {
                return ne.show;
              }
            },
            hide: {
              type: fe.FUNCTION,
              required: !1,
              sendToChild: !1,
              childDecorate: function(ne) {
                return ne.hide;
              }
            },
            export: {
              type: fe.FUNCTION,
              required: !1,
              sendToChild: !1,
              childDecorate: function(ne) {
                return ne.export;
              }
            },
            onError: {
              type: fe.FUNCTION,
              required: !1,
              sendToChild: !1,
              childDecorate: function(ne) {
                return ne.onError;
              }
            },
            onProps: {
              type: fe.FUNCTION,
              required: !1,
              sendToChild: !1,
              childDecorate: function(ne) {
                return ne.onProps;
              }
            },
            getSiblings: {
              type: fe.FUNCTION,
              required: !1,
              sendToChild: !1,
              childDecorate: function(ne) {
                return ne.getSiblings;
              }
            }
          }, x);
          if (!En) throw new Error("Container template required");
          return {
            name: Yn,
            tag: P,
            url: R,
            domain: I,
            bridgeUrl: _,
            method: Kn,
            propsDef: Zn,
            dimensions: W,
            autoResize: L,
            allowedParentDomains: ee,
            attributes: U,
            defaultContext: X,
            containerTemplate: En,
            prerenderTemplate: An,
            validate: Mn,
            logger: Jn,
            eligible: zn,
            children: Un,
            exports: typeof vn == "function" ? vn : function(ne) {
              for (var un = ne.getExports, re = {}, _e = function() {
                var Ee = We[Oe], He = vn[Ee].type, Ie = un().then(function(xe) {
                  return xe[Ee];
                });
                re[Ee] = He === fe.FUNCTION ? function() {
                  for (var xe = arguments.length, cn = new Array(xe), Ye = 0; Ye < xe; Ye++) cn[Ye] = arguments[Ye];
                  return Ie.then(function(wn) {
                    return wn.apply(void 0, cn);
                  });
                } : Ie;
              }, Oe = 0, We = Object.keys(vn); Oe < We.length; Oe++) _e();
              return re;
            }
          };
        }(e), r = n.name, o = n.tag, i = n.defaultContext, s = n.propsDef, u = n.eligible, f = n.children, d = xr(window), v = {}, g = [], w = function() {
          if (function(P) {
            try {
              return Gt(window.name).name === P;
            } catch {
            }
            return !1;
          }(r)) {
            var y = fi().payload;
            if (y.tag === o && rn(y.childDomainMatch, ae())) return !0;
          }
          return !1;
        }, p = Dn(function() {
          if (w()) {
            if (window.xprops)
              throw delete d.components[o], new Error("Can not register " + r + " as child - child already registered");
            var y = function(P) {
              var R = P.tag, I = P.propsDef, _ = P.autoResize, q = P.allowedParentDomains, x = [], j = fi(), W = j.parent, Z = j.payload, L = W.win, oe = W.domain, ee, G = new O(), U = Z.version, te = Z.uid, X = Z.exports, Se = Z.context, En = Z.props;
              if (!function(re, _e) {
                if (!/_/.test(re) || !/_/.test("10_3_3")) throw new Error("Versions are in an invalid format (" + re + ", 10_3_3)");
                return re.split("_")[0] === "10_3_3".split("_")[0];
              }(U)) throw new Error("Parent window has zoid version " + U + ", child window has version 10_3_3");
              var sn = X.show, An = X.hide, Mn = X.close, Cn = X.onError, zn = X.checkClose, Fn = X.export, Jn = X.resize, Ln = X.init, vn = function() {
                return L;
              }, Kn = function() {
                return oe;
              }, jn = function(re) {
                return x.push(re), {
                  cancel: function() {
                    x.splice(x.indexOf(re), 1);
                  }
                };
              }, Un = function(re) {
                return Jn.fireAndForget({
                  width: re.width,
                  height: re.height
                });
              }, Yn = function(re) {
                return G.resolve(re), Fn(re);
              }, Zn = function(re) {
                var _e = (re === void 0 ? {} : re).anyParent, Oe = [], We = ee.parent;
                if (_e === void 0 && (_e = !We), !_e && !We) throw new Error("No parent found for " + R + " child");
                for (var Ee = 0, He = gn(window); Ee < He.length; Ee++) {
                  var Ie = He[Ee];
                  if (pe(Ie)) {
                    var xe = en(Ie).xprops;
                    if (xe && vn() === xe.getParent()) {
                      var cn = xe.parent;
                      if (_e || !We || cn && cn.uid === We.uid) {
                        var Ye = si(Ie, function(wn) {
                          return wn.exports;
                        });
                        Oe.push({
                          props: xe,
                          exports: Ye
                        });
                      }
                    }
                  }
                }
                return Oe;
              }, ne = function(re, _e, Oe) {
                Oe === void 0 && (Oe = !1);
                var We = function(He, Ie, xe, cn, Ye, wn) {
                  wn === void 0 && (wn = !1);
                  for (var Nn = {}, cr = 0, dr = Object.keys(xe); cr < dr.length; cr++) {
                    var Xn = dr[cr], Ze = Ie[Xn], Dr = Ze && Ze.trustedDomains && Ze.trustedDomains.length > 0 ? Ze.trustedDomains.reduce(function(ot, Ar) {
                      return ot || rn(Ar, ae(window));
                    }, !1) : cn === ae(window) || pe(He);
                    if ((!Ze || !Ze.sameDomain || Dr) && (!Ze || !Ze.trustedDomains || Dr)) {
                      var _r = li(Ie, 0, Xn, xe[Xn], Ye);
                      Nn[Xn] = _r, Ze && Ze.alias && !Nn[Ze.alias] && (Nn[Ze.alias] = _r);
                    }
                  }
                  if (!wn) for (var fr = 0, tt = Object.keys(Ie); fr < tt.length; fr++) {
                    var Wr = tt[fr];
                    xe.hasOwnProperty(Wr) || (Nn[Wr] = li(Ie, 0, Wr, void 0, Ye));
                  }
                  return Nn;
                }(L, I, re, _e, {
                  tag: R,
                  show: sn,
                  hide: An,
                  close: Mn,
                  focus: Ha,
                  onError: Cn,
                  resize: Un,
                  getSiblings: Zn,
                  onProps: jn,
                  getParent: vn,
                  getParentDomain: Kn,
                  uid: te,
                  export: Yn
                }, Oe);
                ee ? sr(ee, We) : ee = We;
                for (var Ee = 0; Ee < x.length; Ee++) (0, x[Ee])(ee);
              }, un = function(re) {
                return O.try(function() {
                  return ne(re, oe, !0);
                });
              };
              return {
                init: function() {
                  return O.try(function() {
                    var re = "";
                    return pe(L) && (re = function(_e) {
                      var Oe = _e.componentName, We = _e.parentComponentWindow, Ee = ci({
                        data: Gt(window.name).serializedInitialPayload,
                        sender: {
                          win: We
                        },
                        basic: !0
                      }), He = Ee.sender;
                      if (Ee.reference.type === "uid" || Ee.metaData.windowRef.type === "global") {
                        var Ie = di({
                          name: Oe,
                          serializedPayload: ui({
                            data: Ee.data,
                            metaData: {
                              windowRef: qa(We)
                            },
                            sender: {
                              domain: He.domain
                            },
                            receiver: {
                              win: window,
                              domain: ae()
                            },
                            basic: !0
                          }).serializedData
                        });
                        return window.name = Ie, Ie;
                      }
                    }({
                      componentName: P.name,
                      parentComponentWindow: L
                    }) || ""), xr(window).exports = P.exports({
                      getExports: function() {
                        return G;
                      }
                    }), function(_e, Oe) {
                      if (!rn(_e, Oe)) throw new Error("Can not be rendered by domain: " + Oe);
                    }(q, oe), $o(L), function() {
                      window.addEventListener("beforeunload", function() {
                        zn.fireAndForget();
                      }), window.addEventListener("unload", function() {
                        zn.fireAndForget();
                      }), ho(L, function() {
                        hi();
                      });
                    }(), Ln({
                      name: re,
                      updateProps: un,
                      close: hi
                    });
                  }).then(function() {
                    return (re = _.width, _e = re !== void 0 && re, Oe = _.height, We = Oe !== void 0 && Oe, Ee = _.element, Co(Ee === void 0 ? "body" : Ee).catch(we).then(function(He) {
                      return {
                        width: _e,
                        height: We,
                        element: He
                      };
                    })).then(function(He) {
                      var Ie = He.width, xe = He.height, cn = He.element;
                      cn && (Ie || xe) && Se !== Pe.POPUP && _o(cn, function(Ye) {
                        Un({
                          width: Ie ? Ye.width : void 0,
                          height: xe ? Ye.height : void 0
                        });
                      }, {
                        width: Ie,
                        height: xe
                      });
                    });
                    var re, _e, Oe, We, Ee;
                  }).catch(function(re) {
                    Cn(re);
                  });
                },
                getProps: function() {
                  return ee || (ne(En, oe), ee);
                }
              };
            }(n);
            return y.init(), y;
          }
        }), m = function y(P) {
          var R, I = "zoid-" + o + "-" + qe(), _ = P || {}, q = u({
            props: _
          }), x = q.eligible, j = q.reason, W = _.onDestroy;
          _.onDestroy = function() {
            if (R && x && g.splice(g.indexOf(R), 1), W) return W.apply(void 0, arguments);
          };
          var Z = vi({
            uid: I,
            options: n
          });
          Z.init(), x ? Z.setProps(_) : _.onDestroy && _.onDestroy(), Kt.register(function(ee) {
            return Z.destroy(ee || new Error("zoid destroyed all components"));
          });
          var L = function(ee) {
            var G = (ee === void 0 ? {} : ee).decorate;
            return y((G === void 0 ? Ia : G)(_));
          }, oe = function(ee, G, U) {
            return O.try(function() {
              if (!x) {
                var te = new Error(j || r + " component is not eligible");
                return Z.destroy(te).then(function() {
                  throw te;
                });
              }
              if (!Hn(ee)) throw new Error("Must pass window to renderTo");
              return function(X, Se) {
                return O.try(function() {
                  if (X.window) return Ir(X.window).getType();
                  if (Se) {
                    if (Se !== Pe.IFRAME && Se !== Pe.POPUP) throw new Error("Unrecognized context: " + Se);
                    return Se;
                  }
                  return i;
                });
              }(_, U);
            }).then(function(te) {
              if (G = function(X, Se) {
                if (Se) {
                  if (typeof Se != "string" && !bt(Se)) throw new TypeError("Expected string or element selector to be passed");
                  return Se;
                }
                if (X === Pe.POPUP) return "body";
                throw new Error("Expected element to be passed to render iframe");
              }(te, G), ee !== window && typeof G != "string") throw new Error("Must pass string element when rendering to another window");
              return Z.render({
                target: ee,
                container: G,
                context: te,
                rerender: function() {
                  var X = L();
                  return sr(R, X), X.renderTo(ee, G, U);
                }
              });
            }).catch(function(te) {
              return Z.destroy(te).then(function() {
                throw te;
              });
            });
          };
          return R = S({}, Z.getExports(), Z.getHelpers(), function() {
            for (var ee = f(), G = {}, U = function() {
              var Se = X[te], En = ee[Se];
              G[Se] = function(sn) {
                var An = Z.getProps(), Mn = S({}, sn, {
                  parent: {
                    uid: I,
                    props: An,
                    export: Z.export
                  }
                });
                return En(Mn);
              };
            }, te = 0, X = Object.keys(ee); te < X.length; te++) U();
            return G;
          }(), {
            isEligible: function() {
              return x;
            },
            clone: L,
            render: function(ee, G) {
              return oe(window, ee, G);
            },
            renderTo: function(ee, G, U) {
              return oe(ee, G, U);
            }
          }), x && g.push(R), R;
        };
        if (p(), function() {
          var y = Rn("zoid_allow_delegate_" + r, function() {
            return !0;
          }), P = Rn("zoid_delegate_" + r, function(R) {
            var I = R.data;
            return {
              parent: vi({
                uid: I.uid,
                options: n,
                overrides: I.overrides,
                parentWin: R.source
              })
            };
          });
          Yt.register(y.cancel), Yt.register(P.cancel);
        }(), d.components = d.components || {}, d.components[o]) throw new Error("Can not register multiple components with the same tag: " + o);
        return d.components[o] = !0, {
          init: m,
          instances: g,
          driver: function(y, P) {
            var R = {
              react: Va,
              angular: Ka,
              vue: Ga,
              vue3: Ja,
              angular2: Ya
            };
            if (!R[y]) throw new Error("Could not find driver for framework: " + y);
            return v[y] || (v[y] = R[y].register(o, s, m, P)), v[y];
          },
          isChild: w,
          canRenderTo: function(y) {
            return pn(y, "zoid_allow_delegate_" + r).then(function(P) {
              return P.data;
            }).catch(function() {
              return !1;
            });
          },
          registerChild: p
        };
      }
      var ka = function(e) {
        (function() {
          yn().initialized || (yn().initialized = !0, s = (i = {
            on: Rn,
            send: pn
          }).on, u = i.send, (f = yn()).receiveMessage = f.receiveMessage || function(d) {
            return Ht(d, {
              on: s,
              send: u
            });
          }, function(d) {
            var v = d.on, g = d.send;
            ce().getOrSet("postMessageListener", function() {
              return xo(window, "message", function(w) {
                (function(p, m) {
                  var y = m.on, P = m.send;
                  O.try(function() {
                    var R = p.source || p.sourceElement, I = p.origin || p.originalEvent && p.originalEvent.origin, _ = p.data;
                    if (I === "null" && (I = "file://"), R) {
                      if (!I) throw new Error("Post message did not have origin domain");
                      Ht({
                        source: R,
                        origin: I,
                        data: _
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
            on: Rn,
            send: pn
          }), Zo({
            on: Rn,
            send: pn,
            receiveMessage: Ht
          }), function(d) {
            var v = d.on, g = d.send;
            ce("builtinListeners").getOrSet("helloListener", function() {
              var w = v("postrobot_hello", {
                domain: "*"
              }, function(m) {
                return jo(m.source, {
                  domain: m.origin
                }), {
                  instanceID: Lo()
                };
              }), p = Sr();
              return p && Mt(p, {
                send: g
              }).catch(function(m) {
              }), w;
            });
          }({
            on: Rn,
            send: pn
          }));
          var i, s, u, f;
        })();
        var n = Qa(e), r = function(i) {
          return n.init(i);
        };
        r.driver = function(i, s) {
          return n.driver(i, s);
        }, r.isChild = function() {
          return n.isChild();
        }, r.canRenderTo = function(i) {
          return n.canRenderTo(i);
        }, r.instances = n.instances;
        var o = n.registerChild();
        return o && (window.xprops = r.xprops = o.getProps()), r;
      };
      function wi(e) {
        Wn && Wn.destroyBridges();
        var n = Kt.all(e);
        return Kt = Kr(), n;
      }
      var mi = wi;
      function es(e) {
        return mi(), delete window.__zoid_10_3_3__, function() {
          (function() {
            for (var r = ce("responseListeners"), o = 0, i = r.keys(); o < i.length; o++) {
              var s = i[o], u = r.get(s);
              u && (u.cancelled = !0), r.del(s);
            }
          })(), (n = ce().get("postMessageListener")) && n.cancel();
          var n;
          delete window.__post_robot_11_0_0__;
        }(), Yt.all(e);
      }
    }]);
  });
})(Oa);
var Ra = Oa.exports;
const qi = Ra.EVENT, lr = {
  VISIBLE: "zoid-visible",
  INVISIBLE: "zoid-invisible"
};
function Xu({
  uid: t,
  frame: a,
  prerenderFrame: c,
  doc: h,
  props: l,
  event: E,
  dimensions: C
}) {
  const { width: S, height: V } = C, { top: z = 0, left: b = 0 } = l;
  if (!a || !c)
    return;
  const B = h.createElement("div");
  B.setAttribute("id", t);
  const M = h.createElement("style");
  return l.cspNonce && M.setAttribute("nonce", l.cspNonce), M.appendChild(
    h.createTextNode(`
          #${t} {
              display: inline-block;
              position: absolute;
              width: ${S};
              height: ${V};
              z-index: 1049;
              border: none;
              top: ${z}px;
              left: ${b}px;
              overflow: hidden;
          }

          #${t} > iframe {
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

          #${t} > iframe.${lr.INVISIBLE} {
              opacity: 0;
          }

          #${t} > iframe.${lr.VISIBLE} {
              opacity: 1;
        }
      `)
  ), B.appendChild(a), B.appendChild(c), B.appendChild(M), c.classList.add(lr.INVISIBLE), a.classList.add(lr.INVISIBLE), E.on(qi.RENDERED, () => {
    setTimeout(() => {
      a.classList.remove(lr.INVISIBLE), a.classList.add(lr.VISIBLE);
    }, 100), setTimeout(() => {
      c.remove();
    }, 1);
  }), E.on(qi.RESIZE, ({ width: $, height: ue }) => {
    typeof $ == "number" && (B.style.width = `${$}px`), typeof ue == "number" && (B.style.height = `${ue}px`);
  }), B;
}
function Qu() {
  return Ra.create({
    dimensions: {
      width: "100%",
      height: "100%"
    },
    tag: "wta",
    url: ({ props: t }) => Zi(t.appConfig.sdkBaseUrl, "/wta"),
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
    containerTemplate: Xu
  });
}
function ku(t) {
  return Qu()(t);
}
const ec = "https://cdn.jsdelivr.net/npm/hls.js@latest";
let pr = null;
function Hi() {
  pr = null;
}
function nc() {
  const t = window;
  return t.Hls ? Promise.resolve(t.Hls) : pr || (pr = Gi(ec).then(() => t.Hls), pr.then(Hi).catch(Hi), pr);
}
var Vi = { VITE_WTA_URL: "https://cdn.jsdelivr.net/gh/sigmaott/sigma-ssai-web-sdk/build/dist", BASE_URL: "/", MODE: "production", DEV: !1, PROD: !0, SSR: !1 };
function rc({ video: t, adContainer: a, trackingUrl: c, interval: h }) {
  const l = Pn(0);
  t.addEventListener("timeupdate", () => {
    l.value = t.currentTime;
  }), Pn({}), Pn(), Pn(h || 1e3), Pn();
  const E = Yu(), C = Pn(!1), S = Pn();
  console.log("import.meta.env", Vi);
  function V({ icons: Ve }) {
    return {
      appConfig: {
        sdkBaseUrl: Vi.VITE_BASE_URL || "https://localhost:4222"
      },
      icons: Ve
    };
  }
  const z = ku(V({
    icons: []
  }));
  z.render(a), z.hide(), a.style.display = "none", Tu(() => {
    var Ve;
    if (S.value) {
      const Ge = ((Ve = S.value) == null ? void 0 : Ve.icons) || [];
      a.style.display = "block", z.updateProps(V({
        icons: Ge
      })), z.show();
    } else
      a.style.display = "none", z.hide();
  });
  const b = Pn([]), B = Pn(), M = Pn([]);
  function $() {
    return C.value = !1, async (Ve, Ge) => {
      if (B.value = Ge.frag.sn, !Ve !== window.Hls.Events.FRAG_CHANGED) {
        for (const je of b.value)
          if (je.sn === Ge.frag.sn)
            for (const mn of M.value) {
              if (mn.tracked)
                continue;
              S.value = mn;
              const Qe = mn.trackingEvents.find((be) => be.eventType === je.value.event);
              Qe && vu(async () => {
                E.trigger(Qe), await Promise.all(Qe.beaconUrls.map((be) => lt(iu(be)))), je.value.event === "complete" && (S.value = void 0, b.value = [], mn.tracked = !0);
              }, je.time * 1e3);
            }
      }
    };
  }
  function ue() {
    return async (Ve, Ge) => {
      function je(Qe) {
        for (let be = 0; be < Qe.length; be++)
          if (Qe[be] === 0)
            return be;
        return Qe.length;
      }
      const { start: gr, sn: mn } = Ge.frag;
      for (let Qe = 0; Qe < Ge.samples.length; Qe++) {
        const be = Ge.samples[Qe], ke = be.data, rr = be.pts;
        if (String.fromCharCode.apply(null, ke.slice(0, 3)) !== "ID3" || String.fromCharCode.apply(null, ke.slice(10, 14)) !== "TXXX")
          continue;
        const pe = ke.slice(21, ke.length), en = je(pe), Er = pe.slice(en + 1, pe.length), tr = je(Er), or = new TextDecoder("utf-8").decode(Er.slice(0, tr)), Sn = {
          sn: mn,
          time: rr - gr,
          value: Ji(or)
        };
        if (B.value && mn < B.value)
          return;
        b.value.push(Sn), Sn.value.event === "start" && lt(na(c)).then(({ data: gn, error: xn }) => {
          if (xn) {
            console.error("Cannot get tracking data", xn);
            return;
          }
          for (const ir of (gn == null ? void 0 : gn.avails) || [])
            for (const ve of ir.ads) {
              const br = `${ir.id}_${ve.id}_${ve.startTimeInSeconds}`;
              M.value.find((Ur) => Ur.key === br) || M.value.push({
                ...ve,
                key: br,
                tracked: !1
              });
            }
        });
      }
    };
  }
  function fn() {
    S.value = void 0, b.value = [], E.off(() => {
    });
  }
  function O(Ve, Ge) {
    E.on((je) => {
      (Ve === "*" || je.eventType === Ve) && Ge(je);
    });
  }
  return {
    destroy: fn,
    hlsHelper: {
      createHlsFragChanged: $,
      createHlsFragParsingMetadata: ue
    },
    onEventTracking: O
  };
}
async function tc({ video: t, adContainer: a, url: c }) {
  await nc();
  const h = Qi(c), l = await hs(), E = await ps(l, t);
  if (!E)
    throw console.error("nonce is null"), new Error("nonce is null");
  const C = `${h.protocol}//${h.host}`, { data: S, error: V } = await lt(na(`${C}${h.pathname}`, {
    params: { "play_params.nonce": E }
  }));
  if (V || !S)
    throw console.error(V), new Error(V);
  const z = `${C}${S.manifestUrl}`, b = `${C}${S.trackingUrl}`, { hlsHelper: B, onEventTracking: M, destroy: $ } = rc({ video: t, adContainer: a, trackingUrl: b });
  if (!window.Hls.isSupported())
    throw console.error("hls is not supported"), new Error("hls is not supported");
  const ue = new window.Hls();
  return ue.loadSource(z), ue.attachMedia(t), ue.on(window.Hls.Events.FRAG_CHANGED, B.createHlsFragChanged()), ue.on(window.Hls.Events.FRAG_PARSING_METADATA, B.createHlsFragParsingMetadata()), {
    manifestUrl: z,
    onEventTracking: M,
    destroy: $,
    hlsHelper: B
  };
}
export {
  ps as createPal,
  tc as createSigmaDai,
  hs as loadPalSdk
};
