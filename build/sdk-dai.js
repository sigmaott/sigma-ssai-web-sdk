function cs(r) {
  return new Promise((a, c) => {
    const h = document.createElement("script");
    h.async = !0, h.src = r, h.onload = a, h.onerror = c, document.body.appendChild(h);
  });
}
const ds = "https://imasdk.googleapis.com/pal/sdkloader/pal.js";
let lt = null;
function Wi() {
  lt = null;
}
function fs() {
  const r = window;
  return r.goog && r.goog.pal ? Promise.resolve(r.goog.pal) : lt || (lt = cs(ds).then(() => r.goog.pal), lt.then(Wi).catch(Wi), lt);
}
async function qn(r) {
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
  function T() {
    return !0;
  }
  function U() {
    a.addEventListener("mousedown", (le) => void b(le)), a.addEventListener("touchstart", (le) => void b(le)), a.addEventListener("play", () => {
      C || (B(), C = !0);
    }), a.addEventListener("ended", () => void A()), a.addEventListener("error", () => {
      console.log(`Video error: ${a.error.message}`), A();
    });
    const q = new r.ConsentSettings();
    return q.allowStorage = T(), c = new r.NonceLoader(), $();
  }
  async function $() {
    const q = new r.NonceRequest();
    q.adWillAutoPlay = !0, q.adWillPlayMuted = !0, q.continuousPlayback = !1, q.descriptionUrl = "https://example.com", q.iconsSupported = !0, q.playerType = "Sample Player Type", q.playerVersion = "1.0", q.ppid = "Sample PPID", q.sessionId = "Sample SID", q.supportedApiFrameworks = "2,7,9", q.url = "https://developers.google.com/ad-manager/pal/html5", q.videoHeight = 480, q.videoWidth = 640, h = c.loadNonceManager(q);
    const { data: le, error: ze } = await qn(h);
    return ze ? (console.log(`Error generating nonce: ${ze}`), null) : (l = le, l.getNonce());
  }
  function b(q) {
    l && l.sendTouch(q);
  }
  function B() {
    l && l.sendPlaybackStart();
  }
  function A() {
    l && l.sendPlaybackEnd();
  }
  return U();
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
function Qr(r, a = {}) {
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
const gs = /#/g, ys = /&/g, Es = /\//g, bs = /=/g, io = /\+/g, Ps = /%5e/gi, Os = /%60/gi, Ss = /%7c/gi, Ts = /%20/gi;
function Rs(r) {
  return encodeURI("" + r).replace(Ss, "|");
}
function kr(r) {
  return Rs(typeof r == "string" ? r : JSON.stringify(r)).replace(io, "%2B").replace(Ts, "+").replace(gs, "%23").replace(ys, "%26").replace(Os, "`").replace(Ps, "^").replace(Es, "%2F");
}
function Xr(r) {
  return kr(r).replace(bs, "%3D");
}
function Vi(r = "") {
  try {
    return decodeURIComponent("" + r);
  } catch {
    return "" + r;
  }
}
function Cs(r) {
  return Vi(r.replace(io, " "));
}
function Ns(r) {
  return Vi(r.replace(io, " "));
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
  return (typeof a == "number" || typeof a == "boolean") && (a = String(a)), a ? Array.isArray(a) ? a.map((c) => `${Xr(r)}=${kr(c)}`).join("&") : `${Xr(r)}=${kr(a)}` : Xr(r);
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
    const [, B, A = ""] = c;
    return {
      protocol: B.toLowerCase(),
      pathname: A,
      href: B + A,
      auth: "",
      host: "",
      search: "",
      hash: ""
    };
  }
  if (!Gi(r, { acceptRelative: !0 }))
    return _i(r);
  const [, h = "", l, E = ""] = r.replace(/\\/g, "/").match(/^[\s\0]*([\w+.-]{2,}:)?\/\/([^/@]+@)?(.*)/) || [], [, C = "", T = ""] = E.match(/([^#/?]*)(.*)?/) || [], { pathname: U, search: $, hash: b } = _i(
    T.replace(/\/(?=[A-Za-z]:)/, "")
  );
  return {
    protocol: h.toLowerCase(),
    auth: l ? l.slice(0, Math.max(0, l.length - 1)) : "",
    host: C,
    pathname: U,
    search: $,
    hash: b,
    [Ki]: !h
  };
}
function _i(r = "") {
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
  var U, $, b, B, A;
  const a = ((U = r.error) == null ? void 0 : U.message) || (($ = r.error) == null ? void 0 : $.toString()) || "", c = ((b = r.request) == null ? void 0 : b.method) || ((B = r.options) == null ? void 0 : B.method) || "GET", h = ((A = r.request) == null ? void 0 : A.url) || String(r.request) || "/", l = `[${c}] ${JSON.stringify(h)}`, E = r.response ? `${r.response.status} ${r.response.statusText}` : "<no response>", C = `${l}: ${E}${a ? ` ${a}` : ""}`, T = new Hs(
    C,
    r.error ? { cause: r.error } : void 0
  );
  for (const q of ["request", "options", "response"])
    Object.defineProperty(T, q, {
      get() {
        return r[q];
      }
    });
  for (const [q, le] of [
    ["data", "_data"],
    ["status", "status"],
    ["statusCode", "status"],
    ["statusText", "statusText"],
    ["statusMessage", "statusText"]
  ])
    Object.defineProperty(T, q, {
      get() {
        return r.response && r.response[le];
      }
    });
  return T;
}
const Gs = new Set(
  Object.freeze(["PATCH", "POST", "PUT", "DELETE"])
);
function Ai(r = "GET") {
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
  async function l(T) {
    const U = T.error && T.error.name === "AbortError" && !T.options.timeout || !1;
    if (T.options.retry !== !1 && !U) {
      let b;
      typeof T.options.retry == "number" ? b = T.options.retry : b = Ai(T.options.method) ? 0 : 1;
      const B = T.response && T.response.status || 500;
      if (b > 0 && (Array.isArray(T.options.retryStatusCodes) ? T.options.retryStatusCodes.includes(B) : Qs.has(B))) {
        const A = T.options.retryDelay || 0;
        return A > 0 && await new Promise((q) => setTimeout(q, A)), E(T.request, {
          ...T.options,
          retry: b - 1
        });
      }
    }
    const $ = Vs(T);
    throw Error.captureStackTrace && Error.captureStackTrace($, E), $;
  }
  const E = async function(U, $ = {}) {
    var q;
    const b = {
      request: U,
      options: Xs($, r.defaults, c),
      response: void 0,
      error: void 0
    };
    b.options.method = (q = b.options.method) == null ? void 0 : q.toUpperCase(), b.options.onRequest && await b.options.onRequest(b), typeof b.request == "string" && (b.options.baseURL && (b.request = js(b.request, b.options.baseURL)), (b.options.query || b.options.params) && (b.request = Ji(b.request, {
      ...b.options.params,
      ...b.options.query
    }))), b.options.body && Ai(b.options.method) && (Js(b.options.body) ? (b.options.body = typeof b.options.body == "string" ? b.options.body : JSON.stringify(b.options.body), b.options.headers = new c(b.options.headers || {}), b.options.headers.has("content-type") || b.options.headers.set("content-type", "application/json"), b.options.headers.has("accept") || b.options.headers.set("accept", "application/json")) : (
      // ReadableStream Body
      ("pipeTo" in b.options.body && typeof b.options.body.pipeTo == "function" || // Node.js Stream Body
      typeof b.options.body.pipe == "function") && ("duplex" in b.options || (b.options.duplex = "half"))
    ));
    let B;
    if (!b.options.signal && b.options.timeout) {
      const le = new h();
      B = setTimeout(
        () => le.abort(),
        b.options.timeout
      ), b.options.signal = le.signal;
    }
    try {
      b.response = await a(
        b.request,
        b.options
      );
    } catch (le) {
      return b.error = le, b.options.onRequestError && await b.options.onRequestError(b), await l(b);
    } finally {
      B && clearTimeout(B);
    }
    if (b.response.body && !ks.has(b.response.status) && b.options.method !== "HEAD") {
      const le = (b.options.parseResponse ? "json" : b.options.responseType) || Zs(b.response.headers.get("content-type") || "");
      switch (le) {
        case "json": {
          const ze = await b.response.text(), O = b.options.parseResponse || Qr;
          b.response._data = O(ze);
          break;
        }
        case "stream": {
          b.response._data = b.response.body;
          break;
        }
        default:
          b.response._data = await b.response[le]();
      }
    }
    return b.options.onResponse && await b.options.onResponse(b), !b.options.ignoreResponseError && b.response.status >= 400 && b.response.status < 600 ? (b.options.onResponseError && await b.options.onResponseError(b), await l(b)) : b.response;
  }, C = async function(U, $) {
    return (await E(U, $))._data;
  };
  return C.raw = E, C.native = (...T) => a(...T), C.create = (T = {}) => Zi({
    ...r,
    defaults: {
      ...r.defaults,
      ...T
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
}(), eu = ao.fetch || (() => Promise.reject(new Error("[ofetch] global.fetch is not supported!"))), nu = ao.Headers, tu = ao.AbortController, Xi = Zi({ fetch: eu, Headers: nu, AbortController: tu }), Qi = Xi, At = Xi.create({
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
}, ea = /* @__PURE__ */ new WeakMap(), iu = ru(ea), ir = ou(iu, ea), au = (r) => r.method !== void 0 && r.method === "call", su = (r) => typeof r.id == "number" && typeof r.result == "boolean", uu = (r) => {
  const a = /* @__PURE__ */ new Map([[0, () => {
  }]]), c = /* @__PURE__ */ new Map([[0, () => {
  }]]), h = /* @__PURE__ */ new Map(), l = new Worker(r);
  return l.addEventListener("message", ({ data: $ }) => {
    if (au($)) {
      const { params: { timerId: b, timerType: B } } = $;
      if (B === "interval") {
        const A = a.get(b);
        if (typeof A === void 0)
          throw new Error("The timer is in an undefined state.");
        if (typeof A == "number") {
          const q = h.get(A);
          if (q === void 0 || q.timerId !== b || q.timerType !== B)
            throw new Error("The timer is in an undefined state.");
        } else typeof A == "function" && A();
      } else if (B === "timeout") {
        const A = c.get(b);
        if (typeof A === void 0)
          throw new Error("The timer is in an undefined state.");
        if (typeof A == "number") {
          const q = h.get(A);
          if (q === void 0 || q.timerId !== b || q.timerType !== B)
            throw new Error("The timer is in an undefined state.");
        } else typeof A == "function" && (A(), c.delete(b));
      }
    } else if (su($)) {
      const { id: b } = $, B = h.get(b);
      if (B === void 0)
        throw new Error("The timer is in an undefined state.");
      const { timerId: A, timerType: q } = B;
      h.delete(b), q === "interval" ? a.delete(A) : c.delete(A);
    } else {
      const { error: { message: b } } = $;
      throw new Error(b);
    }
  }), {
    clearInterval: ($) => {
      if (typeof a.get($) == "function") {
        const b = ir(h);
        h.set(b, { timerId: $, timerType: "interval" }), a.set($, b), l.postMessage({
          id: b,
          method: "clear",
          params: { timerId: $, timerType: "interval" }
        });
      }
    },
    clearTimeout: ($) => {
      if (typeof c.get($) == "function") {
        const b = ir(h);
        h.set(b, { timerId: $, timerType: "timeout" }), c.set($, b), l.postMessage({
          id: b,
          method: "clear",
          params: { timerId: $, timerType: "timeout" }
        });
      }
    },
    setInterval: ($, b = 0, ...B) => {
      const A = ir(a);
      return a.set(A, () => {
        $(...B), typeof a.get(A) == "function" && l.postMessage({
          id: null,
          method: "set",
          params: {
            delay: b,
            now: performance.timeOrigin + performance.now(),
            timerId: A,
            timerType: "interval"
          }
        });
      }), l.postMessage({
        id: null,
        method: "set",
        params: {
          delay: b,
          now: performance.timeOrigin + performance.now(),
          timerId: A,
          timerType: "interval"
        }
      }), A;
    },
    setTimeout: ($, b = 0, ...B) => {
      const A = ir(c);
      return c.set(A, () => $(...B)), l.postMessage({
        id: null,
        method: "set",
        params: {
          delay: b,
          now: performance.timeOrigin + performance.now(),
          timerId: A,
          timerType: "timeout"
        }
      }), A;
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
}, na = Object.assign, vu = Object.prototype.hasOwnProperty, lr = (r, a) => vu.call(r, a), nt = Array.isArray, Mt = (r) => ta(r) === "[object Map]", wu = (r) => typeof r == "string", Ft = (r) => typeof r == "symbol", pr = (r) => r !== null && typeof r == "object", mu = Object.prototype.toString, ta = (r) => mu.call(r), ra = (r) => ta(r).slice(8, -1), so = (r) => wu(r) && r !== "NaN" && r[0] !== "-" && "" + parseInt(r, 10) === r, gu = (r) => {
  const a = /* @__PURE__ */ Object.create(null);
  return (c) => a[c] || (a[c] = r(c));
}, yu = gu((r) => r.charAt(0).toUpperCase() + r.slice(1)), vt = (r, a) => !Object.is(r, a);
var Xe = {};
function ht(r, ...a) {
  console.warn(`[Vue warn] ${r}`, ...a);
}
let Eu;
function bu(r, a = Eu) {
  a && a.active && a.effects.push(r);
}
let tt;
class eo {
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
    let a = Hn, c = tt;
    try {
      return Hn = !0, tt = this, this._runnings++, Fi(this), this.fn();
    } finally {
      Li(this), this._runnings--, tt = c, Hn = a;
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
  r.effect instanceof eo && (r = r.effect.fn);
  const c = new eo(r, pu, () => {
    c.dirty && c.run();
  });
  c.run();
  const h = c.run.bind(c);
  return h.effect = c, h;
}
let Hn = !0, no = 0;
const ia = [];
function aa() {
  ia.push(Hn), Hn = !1;
}
function sa() {
  const r = ia.pop();
  Hn = r === void 0 ? !0 : r;
}
function uo() {
  no++;
}
function co() {
  for (no--; !no && to.length; )
    to.shift()();
}
function ua(r, a, c) {
  var h;
  if (a.get(r) !== r._trackId) {
    a.set(r, r._trackId);
    const l = r.deps[r._depsLength];
    l !== a ? (l && oa(l, r), r.deps[r._depsLength++] = a) : r._depsLength++, Xe.NODE_ENV !== "production" && ((h = r.onTrack) == null || h.call(r, na({ effect: r }, c)));
  }
}
const to = [];
function ca(r, a, c) {
  var h;
  uo();
  for (const l of r.keys()) {
    let E;
    l._dirtyLevel < a && (E ?? (E = r.get(l) === l._trackId)) && (l._shouldSchedule || (l._shouldSchedule = l._dirtyLevel === 0), l._dirtyLevel = a), l._shouldSchedule && (E ?? (E = r.get(l) === l._trackId)) && (Xe.NODE_ENV !== "production" && ((h = l.onTrigger) == null || h.call(l, na({ effect: l }, c))), l.trigger(), (!l._runnings || l.allowRecurse) && l._dirtyLevel !== 2 && (l._shouldSchedule = !1, l.scheduler && to.push(l.scheduler)));
  }
  co();
}
const da = (r, a) => {
  const c = /* @__PURE__ */ new Map();
  return c.cleanup = r, c.computed = a, c;
}, ro = /* @__PURE__ */ new WeakMap(), rt = Symbol(Xe.NODE_ENV !== "production" ? "iterate" : ""), oo = Symbol(Xe.NODE_ENV !== "production" ? "Map key iterate" : "");
function ln(r, a, c) {
  if (Hn && tt) {
    let h = ro.get(r);
    h || ro.set(r, h = /* @__PURE__ */ new Map());
    let l = h.get(c);
    l || h.set(c, l = da(() => h.delete(c))), ua(
      tt,
      l,
      Xe.NODE_ENV !== "production" ? {
        target: r,
        type: a,
        key: c
      } : void 0
    );
  }
}
function Vn(r, a, c, h, l, E) {
  const C = ro.get(r);
  if (!C)
    return;
  let T = [];
  if (a === "clear")
    T = [...C.values()];
  else if (c === "length" && nt(r)) {
    const U = Number(h);
    C.forEach(($, b) => {
      (b === "length" || !Ft(b) && b >= U) && T.push($);
    });
  } else
    switch (c !== void 0 && T.push(C.get(c)), a) {
      case "add":
        nt(r) ? so(c) && T.push(C.get("length")) : (T.push(C.get(rt)), Mt(r) && T.push(C.get(oo)));
        break;
      case "delete":
        nt(r) || (T.push(C.get(rt)), Mt(r) && T.push(C.get(oo)));
        break;
      case "set":
        Mt(r) && T.push(C.get(rt));
        break;
    }
  uo();
  for (const U of T)
    U && ca(
      U,
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
  co();
}
const Su = /* @__PURE__ */ hu("__proto__,__v_isRef,__isVue"), fa = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((r) => r !== "arguments" && r !== "caller").map((r) => Symbol[r]).filter(Ft)
), ji = /* @__PURE__ */ Tu();
function Tu() {
  const r = {};
  return ["includes", "indexOf", "lastIndexOf"].forEach((a) => {
    r[a] = function(...c) {
      const h = fe(this);
      for (let E = 0, C = this.length; E < C; E++)
        ln(h, "get", E + "");
      const l = h[a](...c);
      return l === -1 || l === !1 ? h[a](...c.map(fe)) : l;
    };
  }), ["push", "pop", "shift", "unshift", "splice"].forEach((a) => {
    r[a] = function(...c) {
      aa(), uo();
      const h = fe(this)[a].apply(this, c);
      return co(), sa(), h;
    };
  }), r;
}
function Ru(r) {
  Ft(r) || (r = String(r));
  const a = fe(this);
  return ln(a, "has", r), a.hasOwnProperty(r);
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
    const C = nt(a);
    if (!l) {
      if (C && lr(ji, c))
        return Reflect.get(ji, c, h);
      if (c === "hasOwnProperty")
        return Ru;
    }
    const T = Reflect.get(a, c, h);
    return (Ft(c) ? fa.has(c) : Su(c)) || (l || ln(a, "get", c), E) ? T : hr(T) ? C && so(c) ? T : T.value : pr(T) ? l ? ga(T) : ma(T) : T;
  }
}
class Cu extends la {
  constructor(a = !1) {
    super(!1, a);
  }
  set(a, c, h, l) {
    let E = a[c];
    if (!this._isShallow) {
      const U = pt(E);
      if (!wr(h) && !pt(h) && (E = fe(E), h = fe(h)), !nt(a) && hr(E) && !hr(h))
        return U ? !1 : (E.value = h, !0);
    }
    const C = nt(a) && so(c) ? Number(c) < a.length : lr(a, c), T = Reflect.set(a, c, h, l);
    return a === fe(l) && (C ? vt(h, E) && Vn(a, "set", c, h, E) : Vn(a, "add", c, h)), T;
  }
  deleteProperty(a, c) {
    const h = lr(a, c), l = a[c], E = Reflect.deleteProperty(a, c);
    return E && h && Vn(a, "delete", c, void 0, l), E;
  }
  has(a, c) {
    const h = Reflect.has(a, c);
    return (!Ft(c) || !fa.has(c)) && ln(a, "has", c), h;
  }
  ownKeys(a) {
    return ln(
      a,
      "iterate",
      nt(a) ? "length" : rt
    ), Reflect.ownKeys(a);
  }
}
class Nu extends la {
  constructor(a = !1) {
    super(!0, a);
  }
  set(a, c) {
    return Xe.NODE_ENV !== "production" && ht(
      `Set operation on key "${String(c)}" failed: target is readonly.`,
      a
    ), !0;
  }
  deleteProperty(a, c) {
    return Xe.NODE_ENV !== "production" && ht(
      `Delete operation on key "${String(c)}" failed: target is readonly.`,
      a
    ), !0;
  }
}
const xu = /* @__PURE__ */ new Cu(), Iu = /* @__PURE__ */ new Nu(), fo = (r) => r, vr = (r) => Reflect.getPrototypeOf(r);
function ar(r, a, c = !1, h = !1) {
  r = r.__v_raw;
  const l = fe(r), E = fe(a);
  c || (vt(a, E) && ln(l, "get", a), ln(l, "get", E));
  const { has: C } = vr(l), T = h ? fo : c ? lo : zt;
  if (C.call(l, a))
    return T(r.get(a));
  if (C.call(l, E))
    return T(r.get(E));
  r !== l && r.get(a);
}
function sr(r, a = !1) {
  const c = this.__v_raw, h = fe(c), l = fe(r);
  return a || (vt(r, l) && ln(h, "has", r), ln(h, "has", l)), r === l ? c.has(r) : c.has(r) || c.has(l);
}
function ur(r, a = !1) {
  return r = r.__v_raw, !a && ln(fe(r), "iterate", rt), Reflect.get(r, "size", r);
}
function Ui(r, a = !1) {
  !a && !wr(r) && !pt(r) && (r = fe(r));
  const c = fe(this);
  return vr(c).has.call(c, r) || (c.add(r), Vn(c, "add", r, r)), this;
}
function $i(r, a, c = !1) {
  !c && !wr(a) && !pt(a) && (a = fe(a));
  const h = fe(this), { has: l, get: E } = vr(h);
  let C = l.call(h, r);
  C ? Xe.NODE_ENV !== "production" && pa(h, l, r) : (r = fe(r), C = l.call(h, r));
  const T = E.call(h, r);
  return h.set(r, a), C ? vt(a, T) && Vn(h, "set", r, a, T) : Vn(h, "add", r, a), this;
}
function Bi(r) {
  const a = fe(this), { has: c, get: h } = vr(a);
  let l = c.call(a, r);
  l ? Xe.NODE_ENV !== "production" && pa(a, c, r) : (r = fe(r), l = c.call(a, r));
  const E = h ? h.call(a, r) : void 0, C = a.delete(r);
  return l && Vn(a, "delete", r, void 0, E), C;
}
function qi() {
  const r = fe(this), a = r.size !== 0, c = Xe.NODE_ENV !== "production" ? Mt(r) ? new Map(r) : new Set(r) : void 0, h = r.clear();
  return a && Vn(r, "clear", void 0, void 0, c), h;
}
function cr(r, a) {
  return function(h, l) {
    const E = this, C = E.__v_raw, T = fe(C), U = a ? fo : r ? lo : zt;
    return !r && ln(T, "iterate", rt), C.forEach(($, b) => h.call(l, U($), U(b), E));
  };
}
function dr(r, a, c) {
  return function(...h) {
    const l = this.__v_raw, E = fe(l), C = Mt(E), T = r === "entries" || r === Symbol.iterator && C, U = r === "keys" && C, $ = l[r](...h), b = c ? fo : a ? lo : zt;
    return !a && ln(
      E,
      "iterate",
      U ? oo : rt
    ), {
      // iterator protocol
      next() {
        const { value: B, done: A } = $.next();
        return A ? { value: B, done: A } : {
          value: T ? [b(B[0]), b(B[1])] : b(B),
          done: A
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
      ht(
        `${yu(r)} operation ${c}failed: target is readonly.`,
        fe(this)
      );
    }
    return r === "delete" ? !1 : r === "clear" ? void 0 : this;
  };
}
function Du() {
  const r = {
    get(E) {
      return ar(this, E);
    },
    get size() {
      return ur(this);
    },
    has: sr,
    add: Ui,
    set: $i,
    delete: Bi,
    clear: qi,
    forEach: cr(!1, !1)
  }, a = {
    get(E) {
      return ar(this, E, !1, !0);
    },
    get size() {
      return ur(this);
    },
    has: sr,
    add(E) {
      return Ui.call(this, E, !0);
    },
    set(E, C) {
      return $i.call(this, E, C, !0);
    },
    delete: Bi,
    clear: qi,
    forEach: cr(!1, !0)
  }, c = {
    get(E) {
      return ar(this, E, !0);
    },
    get size() {
      return ur(this, !0);
    },
    has(E) {
      return sr.call(this, E, !0);
    },
    add: Bn("add"),
    set: Bn("set"),
    delete: Bn("delete"),
    clear: Bn("clear"),
    forEach: cr(!0, !1)
  }, h = {
    get(E) {
      return ar(this, E, !0, !0);
    },
    get size() {
      return ur(this, !0);
    },
    has(E) {
      return sr.call(this, E, !0);
    },
    add: Bn("add"),
    set: Bn("set"),
    delete: Bn("delete"),
    clear: Bn("clear"),
    forEach: cr(!0, !0)
  };
  return [
    "keys",
    "values",
    "entries",
    Symbol.iterator
  ].forEach((E) => {
    r[E] = dr(E, !1, !1), c[E] = dr(E, !0, !1), a[E] = dr(E, !1, !0), h[E] = dr(
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
    lr(c, l) && l in h ? c : h,
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
  const h = fe(c);
  if (h !== c && a.call(r, h)) {
    const l = ra(r);
    ht(
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
  return pt(r) ? r : ya(
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
  if (!pr(r))
    return Xe.NODE_ENV !== "production" && ht(
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
  const T = new Proxy(
    r,
    C === 2 ? h : c
  );
  return l.set(r, T), T;
}
function pt(r) {
  return !!(r && r.__v_isReadonly);
}
function wr(r) {
  return !!(r && r.__v_isShallow);
}
function fe(r) {
  const a = r && r.__v_raw;
  return a ? fe(a) : r;
}
const zt = (r) => pr(r) ? ma(r) : r, lo = (r) => pr(r) ? ga(r) : r, Bu = "Computed is still dirty after getter evaluation, likely because a computed is mutating its own dependency in its getter. State mutations in computed getters should be avoided.  Check the docs for more details: https://vuejs.org/guide/essentials/computed.html#getters-should-be-side-effect-free";
class qu {
  constructor(a, c, h, l) {
    this.getter = a, this._setter = c, this.dep = void 0, this.__v_isRef = !0, this.__v_isReadonly = !1, this.effect = new eo(
      () => a(this._value),
      () => fr(
        this,
        this.effect._dirtyLevel === 2 ? 2 : 3
      )
    ), this.effect.computed = this, this.effect.active = this._cacheable = !l, this.__v_isReadonly = h;
  }
  get value() {
    const a = fe(this);
    return (!a._cacheable || a.effect.dirty) && vt(a._value, a._value = a.effect.run()) && fr(a, 4), Ea(a), a.effect._dirtyLevel >= 2 && (Xe.NODE_ENV !== "production" && this._warnRecursive && ht(Bu, `

getter: `, this.getter), fr(a, 2)), a._value;
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
  Hn && tt && (r = fe(r), ua(
    tt,
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
function fr(r, a = 4, c, h) {
  r = fe(r);
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
function hr(r) {
  return !!(r && r.__v_isRef === !0);
}
function bn(r) {
  return Hu(r, !1);
}
function Hu(r, a) {
  return hr(r) ? r : new Vu(r, a);
}
class Vu {
  constructor(a, c) {
    this.__v_isShallow = c, this.dep = void 0, this.__v_isRef = !0, this._rawValue = c ? a : fe(a), this._value = c ? a : zt(a);
  }
  get value() {
    return Ea(this), this._value;
  }
  set value(a) {
    const c = this.__v_isShallow || wr(a) || pt(a);
    if (a = c ? a : fe(a), vt(a, this._rawValue)) {
      const h = this._rawValue;
      this._rawValue = a, this._value = c ? a : zt(a), fr(this, 4, a, h);
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
      return l.m = c, l.c = h, l.d = function(E, C, T) {
        l.o(E, C) || Object.defineProperty(E, C, {
          enumerable: !0,
          get: T
        });
      }, l.r = function(E) {
        typeof Symbol < "u" && Symbol.toStringTag && Object.defineProperty(E, Symbol.toStringTag, {
          value: "Module"
        }), Object.defineProperty(E, "__esModule", {
          value: !0
        });
      }, l.t = function(E, C) {
        if (1 & C && (E = l(E)), 8 & C || 4 & C && typeof E == "object" && E && E.__esModule) return E;
        var T = /* @__PURE__ */ Object.create(null);
        if (l.r(T), Object.defineProperty(T, "default", {
          enumerable: !0,
          value: E
        }), 2 & C && typeof E != "string") for (var U in E) l.d(T, U, (function($) {
          return E[$];
        }).bind(null, U));
        return T;
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
        return Ir;
      }), l.d(h, "create", function() {
        return Za;
      }), l.d(h, "destroy", function() {
        return Xa;
      }), l.d(h, "destroyComponents", function() {
        return mi;
      }), l.d(h, "destroyAll", function() {
        return gi;
      }), l.d(h, "PROP_TYPE", function() {
        return ve;
      }), l.d(h, "PROP_SERIALIZATION", function() {
        return tr;
      }), l.d(h, "CONTEXT", function() {
        return Te;
      }), l.d(h, "EVENT", function() {
        return ye;
      });
      function E(e, n) {
        return (E = Object.setPrototypeOf || function(t, o) {
          return t.__proto__ = o, t;
        })(e, n);
      }
      function C(e, n) {
        e.prototype = Object.create(n.prototype), e.prototype.constructor = e, E(e, n);
      }
      function T() {
        return (T = Object.assign || function(e) {
          for (var n = 1; n < arguments.length; n++) {
            var t = arguments[n];
            for (var o in t) ({}).hasOwnProperty.call(t, o) && (e[o] = t[o]);
          }
          return e;
        }).apply(this, arguments);
      }
      function U(e) {
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
      var $ = [], b = [], B = 0, A;
      function q() {
        if (!B && A) {
          var e = A;
          A = null, e.resolve();
        }
      }
      function le() {
        B += 1;
      }
      function ze() {
        B -= 1, q();
      }
      var O = function() {
        function e(t) {
          var o = this;
          if (this.resolved = void 0, this.rejected = void 0, this.errorHandled = void 0, this.value = void 0, this.error = void 0, this.handlers = void 0, this.dispatching = void 0, this.stack = void 0, this.resolved = !1, this.rejected = !1, this.errorHandled = !1, this.handlers = [], t) {
            var i, s, u = !1, f = !1, d = !1;
            le();
            try {
              t(function(v) {
                d ? o.resolve(v) : (u = !0, i = v);
              }, function(v) {
                d ? o.reject(v) : (f = !0, s = v);
              });
            } catch (v) {
              ze(), this.reject(v);
              return;
            }
            ze(), d = !0, u ? this.resolve(i) : f && this.reject(s);
          }
        }
        var n = e.prototype;
        return n.resolve = function(t) {
          if (this.resolved || this.rejected) return this;
          if (U(t)) throw new Error("Can not resolve promise with another promise");
          return this.resolved = !0, this.value = t, this.dispatch(), this;
        }, n.reject = function(t) {
          var o = this;
          if (this.resolved || this.rejected) return this;
          if (U(t)) throw new Error("Can not reject promise with another promise");
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
            this.dispatching = !0, le();
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
              } else U(w) ? w instanceof e && (w.resolved || w.rejected) ? w.resolved ? g.resolve(w.value) : g.reject(w.error) : s(w, g) : g.resolve(w);
            }
            i.length = 0, this.dispatching = !1, ze();
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
          return t instanceof e ? t : U(t) ? new e(function(o, i) {
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
            } else if (!U(d)) {
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
              U(d) ? i.push(d.then(function(v) {
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
          le();
          try {
            s = t.apply(o, i || []);
          } catch (u) {
            return ze(), e.reject(u);
          }
          return ze(), e.resolve(s);
        }, e.delay = function(t) {
          return new e(function(o) {
            setTimeout(o, t);
          });
        }, e.isPromise = function(t) {
          return !!(t && t instanceof e) || U(t);
        }, e.flush = function() {
          return function(t) {
            var o = A = A || new t();
            return q(), o;
          }(e);
        }, e;
      }();
      function hn(e) {
        return {}.toString.call(e) === "[object RegExp]";
      }
      var ot = {
        IFRAME: "iframe",
        POPUP: "popup"
      }, Pn = `Call was rejected by callee.\r
`;
      function Lt(e) {
        return e === void 0 && (e = window), e.location.protocol;
      }
      function jt(e) {
        if (e === void 0 && (e = window), e.mockDomain) {
          var n = e.mockDomain.split("//")[0];
          if (n) return n;
        }
        return Lt(e);
      }
      function Oe(e) {
        return e === void 0 && (e = window), jt(e) === "about:";
      }
      function oe(e) {
        if (e === void 0 && (e = window), e) try {
          if (e.parent && e.parent !== e) return e.parent;
        } catch {
        }
      }
      function ue(e) {
        if (e === void 0 && (e = window), e && !oe(e)) try {
          return e.opener;
        } catch {
        }
      }
      function He(e) {
        try {
          return !0;
        } catch {
        }
        return !1;
      }
      function We(e) {
        e === void 0 && (e = window);
        var n = e.location;
        if (!n) throw new Error("Can not read window location");
        var t = Lt(e);
        if (!t) throw new Error("Can not read window protocol");
        if (t === "file:") return "file://";
        if (t === "about:") {
          var o = oe(e);
          return o && He() ? We(o) : "about://";
        }
        var i = n.host;
        if (!i) throw new Error("Can not read window host");
        return t + "//" + i;
      }
      function H(e) {
        e === void 0 && (e = window);
        var n = We(e);
        return n && e.mockDomain && e.mockDomain.indexOf("mock:") === 0 ? e.mockDomain : n;
      }
      function J(e) {
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
            if (Oe(n) && He()) return !0;
          } catch {
          }
          try {
            if (function(o) {
              return o === void 0 && (o = window), jt(o) === "mock:";
            }(n) && He()) return !0;
          } catch {
          }
          try {
            if (We(n) === We(window)) return !0;
          } catch {
          }
          return !1;
        }(e)) return !1;
        try {
          if (e === window || Oe(e) && He() || H(window) === H(e)) return !0;
        } catch {
        }
        return !1;
      }
      function de(e) {
        if (!J(e)) throw new Error("Expected window to be same domain");
        return e;
      }
      function xn(e, n) {
        if (!e || !n) return !1;
        var t = oe(n);
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
      function wt(e) {
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
      function mt(e) {
        for (var n = [], t = 0, o = wt(e); t < o.length; t++) {
          var i = o[t];
          n.push(i);
          for (var s = 0, u = mt(i); s < u.length; s++) n.push(u[s]);
        }
        return n;
      }
      function mn(e) {
        e === void 0 && (e = window);
        try {
          if (e.top) return e.top;
        } catch {
        }
        if (oe(e) === e) return e;
        try {
          if (xn(window, e) && window.top) return window.top;
        } catch {
        }
        try {
          if (xn(e, window) && window.top) return window.top;
        } catch {
        }
        for (var n = 0, t = mt(e); n < t.length; n++) {
          var o = t[n];
          try {
            if (o.top) return o.top;
          } catch {
          }
          if (oe(o) === o) return o;
        }
      }
      function In(e) {
        var n = mn(e);
        if (!n) throw new Error("Can not determine top window");
        var t = [].concat(mt(n), [n]);
        return t.indexOf(e) === -1 && (t = [].concat(t, [e], mt(e))), t;
      }
      var Dn = [], gt = [];
      function Se(e, n) {
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
        if (n && J(e)) try {
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
        }(Dn, e);
        if (t !== -1) {
          var o = gt[t];
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
      function yt(e) {
        return (e = e || window).navigator.mockUserAgent || e.navigator.userAgent;
      }
      function Ut(e, n) {
        for (var t = wt(e), o = 0; o < t.length; o++) {
          var i = t[o];
          try {
            if (J(i) && i.name === n && t.indexOf(i) !== -1) return i;
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
      function ho(e, n) {
        return e === ue(n);
      }
      function Et(e) {
        return e === void 0 && (e = window), ue(e = e || window) || oe(e) || void 0;
      }
      function mr(e, n) {
        for (var t = 0; t < e.length; t++)
          for (var o = e[t], i = 0; i < n.length; i++) if (o === n[i]) return !0;
        return !1;
      }
      function gr(e) {
        e === void 0 && (e = window);
        for (var n = 0, t = e; t; ) (t = oe(t)) && (n += 1);
        return n;
      }
      function $t(e, n) {
        var t = mn(e) || e, o = mn(n) || n;
        try {
          if (t && o) return t === o;
        } catch {
        }
        var i = In(e), s = In(n);
        if (mr(i, s)) return !0;
        var u = ue(t), f = ue(o);
        return u && mr(In(u), s) || f && mr(In(f), i), !1;
      }
      function tn(e, n) {
        if (typeof e == "string") {
          if (typeof n == "string") return e === "*" || n === e;
          if (hn(n) || Array.isArray(n)) return !1;
        }
        return hn(e) ? hn(n) ? e.toString() === n.toString() : !Array.isArray(n) && !!n.match(e) : !!Array.isArray(e) && (Array.isArray(n) ? JSON.stringify(e) === JSON.stringify(n) : !hn(n) && e.some(function(t) {
          return tn(t, n);
        }));
      }
      function On(e) {
        return e.match(/^(https?|mock|file):\/\//) ? e.split("/").slice(0, 3).join("/") : H();
      }
      function po(e, n, t, o) {
        t === void 0 && (t = 1e3), o === void 0 && (o = 1 / 0);
        var i;
        return function s() {
          if (Se(e))
            return i && clearTimeout(i), n();
          o <= 0 ? clearTimeout(i) : (o -= t, i = setTimeout(s, t));
        }(), {
          cancel: function() {
            i && clearTimeout(i);
          }
        };
      }
      function Gn(e) {
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
      function yr(e) {
        if (n = On(e), n.indexOf("mock:") !== 0) return e;
        var n;
        throw new Error("Mock urls not supported out of test mode");
      }
      function vo(e) {
        if (J(e)) return de(e).frameElement;
        for (var n = 0, t = document.querySelectorAll("iframe"); n < t.length; n++) {
          var o = t[n];
          if (o && o.contentWindow && o.contentWindow === e) return o;
        }
      }
      function wo(e) {
        if (function(t) {
          return t === void 0 && (t = window), !!oe(t);
        }(e)) {
          var n = vo(e);
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
      function Bt(e, n) {
        for (var t = 0; t < e.length; t++) try {
          if (e[t] === n) return t;
        } catch {
        }
        return -1;
      }
      var qt = function() {
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
            if (Gn(s) && Se(s)) {
              if (t) try {
                t.delete(s);
              } catch {
              }
              o.splice(i, 1), this.values.splice(i, 1), i -= 1;
            }
          }
        }, n.isSafeToReadWrite = function(t) {
          return !Gn(t);
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
          var f = this.keys, d = this.values, v = Bt(f, t);
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
          var s = Bt(this.keys, t);
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
          var s = this.keys, u = Bt(s, t);
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
          return this._cleanupClosedWindows(), Bt(this.keys, t) !== -1;
        }, n.getOrSet = function(t, o) {
          if (this.has(t)) return this.get(t);
          var i = o();
          return this.set(t, i), i;
        }, e;
      }();
      function mo(e) {
        return (mo = Object.setPrototypeOf ? Object.getPrototypeOf : function(n) {
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
      function go(e, n, t) {
        return (go = Oa() ? Reflect.construct : function(o, i, s) {
          var u = [null];
          u.push.apply(u, i);
          var f = new (Function.bind.apply(o, u))();
          return s && E(f, s.prototype), f;
        }).apply(null, arguments);
      }
      function yo(e) {
        var n = typeof Map == "function" ? /* @__PURE__ */ new Map() : void 0;
        return (yo = function(t) {
          if (t === null || (o = t, Function.toString.call(o).indexOf("[native code]") === -1)) return t;
          var o;
          if (typeof t != "function") throw new TypeError("Super expression must either be null or a function");
          if (n !== void 0) {
            if (n.has(t)) return n.get(t);
            n.set(t, i);
          }
          function i() {
            return go(t, arguments, mo(this).constructor);
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
      function Er(e) {
        var n = !1;
        try {
          (e instanceof window.Element || e !== null && typeof e == "object" && e.nodeType === 1 && typeof e.style == "object" && typeof e.ownerDocument == "object") && (n = !0);
        } catch {
        }
        return n;
      }
      function br(e) {
        return e.name || e.__name__ || e.displayName || "anonymous";
      }
      function Pr(e, n) {
        try {
          delete e.name, e.name = n;
        } catch {
        }
        return e.__name__ = e.displayName = n, e;
      }
      function Or(e) {
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
        }) + "_" + Or((/* @__PURE__ */ new Date()).toISOString().slice(11, 19).replace("T", ".")).replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
      }
      var Ht;
      function Sr(e) {
        try {
          return JSON.stringify([].slice.call(e), function(n, t) {
            return typeof t == "function" ? "memoize[" + function(o) {
              if (Ht = Ht || new qt(), o == null || typeof o != "object" && typeof o != "function") throw new Error("Invalid object");
              var i = Ht.get(o);
              return i || (i = typeof o + ":" + Ke(), Ht.set(o, i)), i;
            }(t) + "]" : Er(t) ? {} : t;
          });
        } catch {
          throw new Error("Arguments not serializable -- can not be used to memoize");
        }
      }
      function Sa() {
        return {};
      }
      var bt = 0, Eo = 0;
      function Wn(e, n) {
        n === void 0 && (n = {});
        var t = n.thisNamespace, o = t !== void 0 && t, i = n.time, s, u, f = bt;
        bt += 1;
        var d = function() {
          for (var v = arguments.length, g = new Array(v), w = 0; w < v; w++) g[w] = arguments[w];
          f < Eo && (s = null, u = null, f = bt, bt += 1);
          var p;
          p = o ? (u = u || new qt()).getOrSet(this, Sa) : s = s || {};
          var m;
          try {
            m = Sr(g);
          } catch {
            return e.apply(this, arguments);
          }
          var y = p[m];
          if (y && i && Date.now() - y.time < i && (delete p[m], y = null), y) return y.value;
          var P = Date.now(), S = e.apply(this, arguments);
          return p[m] = {
            time: P,
            value: S
          }, S;
        };
        return d.reset = function() {
          s = null, u = null;
        }, Pr(d, (n.name || br(e)) + "::memoized");
      }
      Wn.clear = function() {
        Eo = bt;
      };
      function Ta(e) {
        var n = {};
        function t() {
          for (var o = arguments, i = this, s = arguments.length, u = new Array(s), f = 0; f < s; f++) u[f] = arguments[f];
          var d = Sr(u);
          return n.hasOwnProperty(d) || (n[d] = O.try(function() {
            return e.apply(i, o);
          }).finally(function() {
            delete n[d];
          })), n[d];
        }
        return t.reset = function() {
          n = {};
        }, Pr(t, br(e) + "::promiseMemoized");
      }
      function ge() {
      }
      function Vt(e) {
        var n = !1;
        return Pr(function() {
          if (!n)
            return n = !0, e.apply(this, arguments);
        }, br(e) + "::once");
      }
      function it(e, n) {
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
          return "Error while stringifying error: " + it(i, n + 1);
        }
      }
      function Gt(e) {
        return typeof e == "string" ? e : e && e.toString && typeof e.toString == "function" ? e.toString() : {}.toString.call(e);
      }
      function at(e, n) {
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
      function Pt(e, n) {
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
      function Tr(e) {
        return e.replace(/-([a-z])/g, function(n) {
          return n[1].toUpperCase();
        });
      }
      function bo(e, n, t) {
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
      function Rr(e) {
        return [].slice.call(e);
      }
      function Po(e) {
        return typeof (n = e) == "object" && n !== null && {}.toString.call(e) === "[object Object]";
        var n;
      }
      function Cr(e) {
        if (!Po(e)) return !1;
        var n = e.constructor;
        if (typeof n != "function") return !1;
        var t = n.prototype;
        return !!Po(t) && !!t.hasOwnProperty("isPrototypeOf");
      }
      function Jt(e, n, t) {
        if (t === void 0 && (t = ""), Array.isArray(e)) {
          for (var o = e.length, i = [], s = function(g) {
            bo(i, g, function() {
              var w = t ? t + "." + g : "" + g, p = n(e[g], g, w);
              return (Cr(p) || Array.isArray(p)) && (p = Jt(p, n, w)), p;
            });
          }, u = 0; u < o; u++) s(u);
          return i;
        }
        if (Cr(e)) {
          var f = {}, d = function(g) {
            if (!e.hasOwnProperty(g)) return 1;
            bo(f, g, function() {
              var w = t ? t + "." + g : "" + g, p = n(e[g], g, w);
              return (Cr(p) || Array.isArray(p)) && (p = Jt(p, n, w)), p;
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
      function Nr(e) {
        return {}.toString.call(e) === "[object RegExp]";
      }
      function Ot(e, n, t) {
        if (e.hasOwnProperty(n)) return e[n];
        var o = t();
        return e[n] = o, o;
      }
      function Kt(e) {
        var n = [], t = !1, o, i = {
          set: function(s, u) {
            return t || (e[s] = u, i.register(function() {
              delete e[s];
            })), u;
          },
          register: function(s) {
            var u = Vt(function() {
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
            return O.all(u).then(ge);
          }
        };
        return i;
      }
      function Yt(e, n) {
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
      }(yo(Error));
      function Oo() {
        var e = document.body;
        if (!e) throw new Error("Body element not found");
        return e;
      }
      function Zt() {
        return !!document.body && document.readyState === "complete";
      }
      function So() {
        return !!document.body && document.readyState === "interactive";
      }
      function To(e) {
        return encodeURIComponent(e);
      }
      Wn(function() {
        return new O(function(e) {
          if (Zt() || So()) return e();
          var n = setInterval(function() {
            if (Zt() || So())
              return clearInterval(n), e();
          }, 10);
        });
      });
      function Ro(e) {
        return function(n, t, o) {
          o === void 0 && (o = []);
          var i = n.__inline_memoize_cache__ = n.__inline_memoize_cache__ || {}, s = Sr(o);
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
      function Co(e, n) {
        return n === void 0 && (n = {}), n && Object.keys(n).length ? function(t) {
          return t === void 0 && (t = {}), Object.keys(t).filter(function(o) {
            return typeof t[o] == "string" || typeof t[o] == "boolean";
          }).map(function(o) {
            var i = t[o];
            if (typeof i != "string" && typeof i != "boolean") throw new TypeError("Invalid type for query");
            return To(o) + "=" + To(i.toString());
          }).join("&");
        }(T({}, Ro(e), n)) : e;
      }
      function Na(e, n) {
        e.appendChild(n);
      }
      function xr(e, n) {
        return n === void 0 && (n = document), Er(e) ? e : typeof e == "string" ? n.querySelector(e) : void 0;
      }
      function No(e) {
        return new O(function(n, t) {
          var o = Gt(e), i = xr(e);
          if (i) return n(i);
          if (Zt()) return t(new Error("Document is ready and element " + o + " does not exist"));
          var s = setInterval(function() {
            if (i = xr(e))
              n(i), clearInterval(s);
            else if (Zt())
              return clearInterval(s), t(new Error("Document is ready and element " + o + " does not exist"));
          }, 10);
        });
      }
      var Ir = function(e) {
        C(n, e);
        function n() {
          return e.apply(this, arguments) || this;
        }
        return n;
      }(Ca), Xt;
      function xo(e) {
        if ((Xt = Xt || new qt()).has(e)) {
          var n = Xt.get(e);
          if (n) return n;
        }
        var t = new O(function(o, i) {
          e.addEventListener("load", function() {
            (function(s) {
              if (function() {
                for (var u = 0; u < Dn.length; u++) {
                  var f = !1;
                  try {
                    f = Dn[u].closed;
                  } catch {
                  }
                  f && (gt.splice(u, 1), Dn.splice(u, 1));
                }
              }(), s && s.contentWindow) try {
                Dn.push(s.contentWindow), gt.push(s);
              } catch {
              }
            })(e), o(e);
          }), e.addEventListener("error", function(s) {
            e.contentWindow ? o(e) : i(s);
          });
        });
        return Xt.set(e, t), t;
      }
      function Dr(e) {
        return xo(e).then(function(n) {
          if (!n.contentWindow) throw new Error("Could not find window in iframe");
          return n.contentWindow;
        });
      }
      function Io(e, n) {
        e === void 0 && (e = {});
        var t = e.style || {}, o = function(s, u, f) {
          s === void 0 && (s = "div"), u === void 0 && (u = {}), s = s.toLowerCase();
          var d = document.createElement(s);
          if (u.style && at(d.style, u.style), u.class && (d.className = u.class.join(" ")), u.id && d.setAttribute("id", u.id), u.attributes) for (var v = 0, g = Object.keys(u.attributes); v < g.length; v++) {
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
          attributes: T({
            allowTransparency: "true"
          }, e.attributes || {}),
          style: T({
            backgroundColor: "transparent",
            border: "none"
          }, t),
          html: e.html,
          class: e.class
        }), i = window.navigator.userAgent.match(/MSIE|Edge/i);
        return o.hasAttribute("id") || o.setAttribute("id", Ke()), xo(o), (e.url || i) && o.setAttribute("src", e.url || "about:blank"), o;
      }
      function Do(e, n, t) {
        return e.addEventListener(n, t), {
          cancel: function() {
            e.removeEventListener(n, t);
          }
        };
      }
      function xa(e) {
        e.style.setProperty("display", "");
      }
      function Wo(e) {
        e.style.setProperty("display", "none", "important");
      }
      function St(e) {
        e && e.parentNode && e.parentNode.removeChild(e);
      }
      function st(e) {
        return !(e && e.parentNode && e.ownerDocument && e.ownerDocument.documentElement && e.ownerDocument.documentElement.contains(e));
      }
      function _o(e, n, t) {
        var o = t === void 0 ? {} : t, i = o.width, s = i === void 0 || i, u = o.height, f = u === void 0 || u, d = o.interval, v = d === void 0 ? 100 : d, g = o.win, w = g === void 0 ? window : g, p = e.offsetWidth, m = e.offsetHeight, y = !1;
        n({
          width: p,
          height: m
        });
        var P = function() {
          if (!y && function(I) {
            return !!(I.offsetWidth || I.offsetHeight || I.getClientRects().length);
          }(e)) {
            var W = e.offsetWidth, V = e.offsetHeight;
            (s && W !== p || f && V !== m) && n({
              width: W,
              height: V
            }), p = W, m = V;
          }
        }, S, x;
        return w.addEventListener("resize", P), w.ResizeObserver !== void 0 ? ((S = new w.ResizeObserver(P)).observe(e), x = Pt(P, 10 * v)) : w.MutationObserver !== void 0 ? ((S = new w.MutationObserver(P)).observe(e, {
          attributes: !0,
          childList: !0,
          subtree: !0,
          characterData: !1
        }), x = Pt(P, 10 * v)) : x = Pt(P, v), {
          cancel: function() {
            y = !0, S.disconnect(), window.removeEventListener("resize", P), x.cancel();
          }
        };
      }
      function Wr(e) {
        for (; e.parentNode; ) e = e.parentNode;
        return e.toString() === "[object ShadowRoot]";
      }
      var Qt = typeof document < "u" ? document.currentScript : null, Ia = Wn(function() {
        if (Qt || (Qt = function() {
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
        }())) return Qt;
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
      function Ao(e) {
        return typeof e == "string" && /^[0-9]+%$/.test(e);
      }
      function _r(e) {
        if (typeof e == "number") return e;
        var n = e.match(/^([0-9]+)(px|%)$/);
        if (!n) throw new Error("Could not match css value from " + e);
        return parseInt(n[1], 10);
      }
      function Mo(e) {
        return _r(e) + "px";
      }
      function zo(e) {
        return typeof e == "number" ? Mo(e) : Ao(e) ? e : Mo(e);
      }
      function Fo(e, n) {
        if (typeof e == "number") return e;
        if (Ao(e)) return parseInt(n * _r(e) / 100, 10);
        if (typeof (t = e) == "string" && /^[0-9]+px$/.test(t)) return _r(e);
        var t;
        throw new Error("Can not normalize dimension: " + e);
      }
      function gn(e) {
        e === void 0 && (e = window);
        var n = "__post_robot_11_0_0__";
        return e !== window ? e[n] : e[n] = e[n] || {};
      }
      var Lo = function() {
        return {};
      };
      function he(e, n) {
        return e === void 0 && (e = "store"), n === void 0 && (n = Lo), Ot(gn(), e, function() {
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
              return Ot(t, o, i);
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
      function kt() {
        var e = gn();
        return e.WINDOW_WILDCARD = e.WINDOW_WILDCARD || new Wa(), e.WINDOW_WILDCARD;
      }
      function Je(e, n) {
        return e === void 0 && (e = "store"), n === void 0 && (n = Lo), he("windowStore").getOrSet(e, function() {
          var t = new qt(), o = function(i) {
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
              return Ot(o(i), e, s);
            }
          };
        });
      }
      function jo() {
        return he("instance").getOrSet("instanceID", Ke);
      }
      function Uo(e, n) {
        var t = n.domain, o = Je("helloPromises"), i = o.get(e);
        i && i.resolve({
          domain: t
        });
        var s = O.resolve({
          domain: t
        });
        return o.set(e, s), s;
      }
      function Ar(e, n) {
        return (0, n.send)(e, "postrobot_hello", {
          instanceID: jo()
        }, {
          domain: "*",
          timeout: -1
        }).then(function(t) {
          var o = t.origin, i = t.data.instanceID;
          return Uo(e, {
            domain: o
          }), {
            win: e,
            domain: o,
            instanceID: i
          };
        });
      }
      function $o(e, n) {
        var t = n.send;
        return Je("windowInstanceIDPromises").getOrSet(e, function() {
          return Ar(e, {
            send: t
          }).then(function(o) {
            return o.instanceID;
          });
        });
      }
      function Bo(e, n, t) {
        n === void 0 && (n = 5e3), t === void 0 && (t = "Window");
        var o = function(i) {
          return Je("helloPromises").getOrSet(i, function() {
            return new O();
          });
        }(e);
        return n !== -1 && (o = o.timeout(n, new Error(t + " did not load after " + n + "ms"))), o;
      }
      function qo(e) {
        Je("knownWindows").set(e, !0);
      }
      function Mr(e) {
        return typeof e == "object" && e !== null && typeof e.__type__ == "string";
      }
      function Ho(e) {
        return e === void 0 ? "undefined" : e === null ? "null" : Array.isArray(e) ? "array" : typeof e == "function" ? "function" : typeof e == "object" ? e instanceof Error ? "error" : typeof e.then == "function" ? "promise" : {}.toString.call(e) === "[object RegExp]" ? "regex" : {}.toString.call(e) === "[object Date]" ? "date" : "object" : typeof e == "string" ? "string" : typeof e == "number" ? "number" : typeof e == "boolean" ? "boolean" : void 0;
      }
      function Jn(e, n) {
        return {
          __type__: e,
          __val__: n
        };
      }
      var rn, _a = ((rn = {}).function = function() {
      }, rn.error = function(e) {
        return Jn("error", {
          message: e.message,
          stack: e.stack,
          code: e.code,
          data: e.data
        });
      }, rn.promise = function() {
      }, rn.regex = function(e) {
        return Jn("regex", e.source);
      }, rn.date = function(e) {
        return Jn("date", e.toJSON());
      }, rn.array = function(e) {
        return e;
      }, rn.object = function(e) {
        return e;
      }, rn.string = function(e) {
        return e;
      }, rn.number = function(e) {
        return e;
      }, rn.boolean = function(e) {
        return e;
      }, rn.null = function(e) {
        return e;
      }, rn[void 0] = function(e) {
        return Jn("undefined", e);
      }, rn), Aa = {}, on, Ma = ((on = {}).function = function() {
        throw new Error("Function serialization is not implemented; nothing to deserialize");
      }, on.error = function(e) {
        var n = e.stack, t = e.code, o = e.data, i = new Error(e.message);
        return i.code = t, o && (i.data = o), i.stack = n + `

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
      }, on), za = {};
      function zr() {
        return !!yt(window).match(/MSIE|trident|edge\/12|edge\/13/i);
      }
      function Vo(e) {
        return !$t(window, e);
      }
      function Go(e, n) {
        if (e) {
          if (H() !== On(e)) return !0;
        } else if (n && !J(n)) return !0;
        return !1;
      }
      function Jo(e) {
        var n = e.win, t = e.domain;
        return !(!zr() || t && !Go(t, n) || n && !Vo(n));
      }
      function Fr(e) {
        return "__postrobot_bridge___" + (e = e || On(e)).replace(/[^a-zA-Z0-9]+/g, "_");
      }
      function Ko() {
        return !!(window.name && window.name === Fr(H()));
      }
      var Fa = new O(function(e) {
        if (window.document && window.document.body) return e(window.document.body);
        var n = setInterval(function() {
          if (window.document && window.document.body)
            return clearInterval(n), e(window.document.body);
        }, 10);
      });
      function Yo(e) {
        Je("remoteWindowPromises").getOrSet(e, function() {
          return new O();
        });
      }
      function Lr(e) {
        var n = Je("remoteWindowPromises").get(e);
        if (!n) throw new Error("Remote window promise not found");
        return n;
      }
      function Zo(e, n, t) {
        Lr(e).resolve(function(o, i, s) {
          if (o !== e) throw new Error("Remote window does not match window");
          if (!tn(i, n)) throw new Error("Remote domain " + i + " does not match domain " + n);
          t.fireAndForget(s);
        });
      }
      function jr(e, n) {
        Lr(e).reject(n).catch(ge);
      }
      function er(e) {
        for (var n = e.win, t = e.name, o = e.domain, i = he("popupWindowsByName"), s = Je("popupWindowsByWin"), u = 0, f = i.keys(); u < f.length; u++) {
          var d = f[u], v = i.get(d);
          v && !Se(v.win) || i.del(d);
        }
        if (Se(n)) return {
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
        return t && (g.name = t, i.set(t, g)), o && (g.domain = o, Yo(n)), s.set(n, g), g;
      }
      function Xo(e) {
        var n = e.on, t = e.send, o = e.receiveMessage;
        i = window.open, window.open = function(s, u, f, d) {
          var v = i.call(this, yr(s), u, f, d);
          return v && (er({
            win: v,
            name: u,
            domain: s ? On(s) : null
          }), v);
        };
        var i;
        (function(s) {
          var u = s.on, f = s.send, d = s.receiveMessage, v = he("popupWindowsByName");
          u("postrobot_open_tunnel", function(g) {
            var w = g.source, p = g.origin, m = g.data, y = he("bridges").get(p);
            if (!y) throw new Error("Can not find bridge promise for domain " + p);
            return y.then(function(P) {
              if (w !== P) throw new Error("Message source does not matched registered bridge for domain " + p);
              if (!m.name) throw new Error("Register window expected to be passed window name");
              if (!m.sendMessage) throw new Error("Register window expected to be passed sendMessage method");
              if (!v.has(m.name)) throw new Error("Window with name " + m.name + " does not exist, or was not opened by this window");
              var S = function() {
                return v.get(m.name);
              };
              if (!S().domain) throw new Error("We do not have a registered domain for window " + m.name);
              if (S().domain !== p) throw new Error("Message origin " + p + " does not matched registered window origin " + (S().domain || "unknown"));
              return Zo(S().win, p, m.sendMessage), {
                sendMessage: function(x) {
                  if (window && !window.closed && S()) {
                    var W = S().domain;
                    if (W) try {
                      d({
                        data: x,
                        origin: W,
                        source: S().win
                      }, {
                        on: u,
                        send: f
                      });
                    } catch (V) {
                      O.reject(V);
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
            var d = f.name, v = f.source, g = f.canary, w = f.sendMessage, p = he("tunnelWindows"), m = oe(window);
            if (!m) throw new Error("No parent window found to open tunnel to");
            var y = function(P) {
              var S = P.name, x = P.source, W = P.canary, V = P.sendMessage;
              (function() {
                for (var L = he("tunnelWindows"), _ = 0, Q = L.keys(); _ < Q.length; _++) {
                  var F = Q[_];
                  Se(L[F].source) && L.del(F);
                }
              })();
              var I = Ke();
              return he("tunnelWindows").set(I, {
                name: S,
                source: x,
                canary: W,
                sendMessage: V
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
                if (P && P.source && !Se(P.source)) {
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
          O.try(function() {
            var v = ue(window);
            if (v && Jo({
              win: v
            })) {
              return Yo(v), (g = v, Je("remoteBridgeAwaiters").getOrSet(g, function() {
                return O.try(function() {
                  var w = Ut(g, Fr(H()));
                  if (w) return J(w) && gn(de(w)) ? w : new O(function(p) {
                    var m, y;
                    m = setInterval(function() {
                      if (w && J(w) && gn(de(w)))
                        return clearInterval(m), clearTimeout(y), p(w);
                    }, 100), y = setTimeout(function() {
                      return clearInterval(m), p();
                    }, 2e3);
                  });
                });
              })).then(function(w) {
                return w ? window.name ? gn(de(w)).openTunnelToParent({
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
                  Zo(m, y, P.sendMessage);
                }).catch(function(p) {
                  throw jr(v, p), p;
                }) : jr(v, new Error("Can not register with opener: window does not have a name")) : jr(v, new Error("Can not register with opener: no bridge found in opener"));
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
      function Ur() {
        for (var e = he("idToProxyWindow"), n = 0, t = e.keys(); n < t.length; n++) {
          var o = t[n];
          e.get(o).shouldClean() && e.del(o);
        }
      }
      function Qo(e, n) {
        var t = n.send, o = n.id, i = o === void 0 ? Ke() : o, s = e.then(function(d) {
          if (J(d)) return de(d).name;
        }), u = e.then(function(d) {
          if (Se(d)) throw new Error("Window is closed, can not determine type");
          return ue(d) ? ot.POPUP : ot.IFRAME;
        });
        s.catch(ge), u.catch(ge);
        var f = function() {
          return e.then(function(d) {
            if (!Se(d)) return J(d) ? de(d).name : s;
          });
        };
        return {
          id: i,
          getType: function() {
            return u;
          },
          getInstanceID: Ta(function() {
            return e.then(function(d) {
              return $o(d, {
                send: t
              });
            });
          }),
          close: function() {
            return e.then(wo);
          },
          getName: f,
          focus: function() {
            return e.then(function(d) {
              d.focus();
            });
          },
          isClosed: function() {
            return e.then(function(d) {
              return Se(d);
            });
          },
          setLocation: function(d, v) {
            return v === void 0 && (v = {}), e.then(function(g) {
              var w = window.location.protocol + "//" + window.location.host, p = v.method, m = p === void 0 ? "get" : p, y = v.body;
              if (d.indexOf("/") === 0) d = "" + w + d;
              else if (!d.match(/^https?:\/\//) && d.indexOf(w) !== 0) throw new Error("Expected url to be http or https url, or absolute path, got " + JSON.stringify(d));
              if (m === "post") return f().then(function(P) {
                if (!P) throw new Error("Can not post to window without target name");
                (function(S) {
                  var x = S.url, W = S.target, V = S.body, I = S.method, L = I === void 0 ? "post" : I, _ = document.createElement("form");
                  if (_.setAttribute("target", W), _.setAttribute("method", L), _.setAttribute("action", x), _.style.display = "none", V) for (var Q = 0, F = Object.keys(V); Q < F.length; Q++) {
                    var se, te = F[Q], K = document.createElement("input");
                    K.setAttribute("name", te), K.setAttribute("value", (se = V[te]) == null ? void 0 : se.toString()), _.appendChild(K);
                  }
                  Oo().appendChild(_), _.submit(), Oo().removeChild(_);
                })({
                  url: d,
                  target: P,
                  method: m,
                  body: y
                });
              });
              if (m !== "get") throw new Error("Unsupported method: " + m);
              if (J(g)) try {
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
              er({
                win: v,
                name: d
              });
              var g = J(v), w = vo(v);
              if (!g) throw new Error("Can not set name for cross-domain window: " + d);
              de(v).name = d, w && w.setAttribute("name", d), s = O.resolve(d);
            });
          }
        };
      }
      var an = function() {
        function e(t) {
          var o = t.send, i = t.win, s = t.serializedWindow;
          this.id = void 0, this.isProxyWindow = !0, this.serializedWindow = void 0, this.actualWindow = void 0, this.actualWindowPromise = void 0, this.send = void 0, this.name = void 0, this.actualWindowPromise = new O(), this.serializedWindow = s || Qo(this.actualWindowPromise, {
            send: o
          }), he("idToProxyWindow").set(this.getID(), this), i && this.setWindow(i, {
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
            return t === ot.POPUP;
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
          var t = this, o = this.isPopup(), i = this.getName(), s = O.hash({
            isPopup: o,
            name: i
          }).then(function(f) {
            var d = f.name;
            f.isPopup && d && window.open("", d, "noopener");
          }), u = this.serializedWindow.focus();
          return O.all([s, u]).then(function() {
            return t;
          });
        }, n.isClosed = function() {
          return this.serializedWindow.isClosed();
        }, n.getWindow = function() {
          return this.actualWindow;
        }, n.setWindow = function(t, o) {
          var i = o.send;
          this.actualWindow = t, this.actualWindowPromise.resolve(this.actualWindow), this.serializedWindow = Qo(this.actualWindowPromise, {
            send: i,
            id: this.getID()
          }), Je("winToProxyWindow").set(t, this);
        }, n.awaitWindow = function() {
          return this.actualWindowPromise;
        }, n.matchWindow = function(t, o) {
          var i = this, s = o.send;
          return O.try(function() {
            return i.actualWindow ? t === i.actualWindow : O.hash({
              proxyInstanceID: i.getInstanceID(),
              knownWindowInstanceID: $o(t, {
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
          return !!(this.actualWindow && Se(this.actualWindow));
        }, n.serialize = function() {
          return this.serializedWindow;
        }, e.unwrap = function(t) {
          return e.isProxyWindow(t) ? t.unwrap() : t;
        }, e.serialize = function(t, o) {
          var i = o.send;
          return Ur(), e.toProxyWindow(t, {
            send: i
          }).serialize();
        }, e.deserialize = function(t, o) {
          var i = o.send;
          return Ur(), he("idToProxyWindow").get(t.id) || new e({
            serializedWindow: t,
            send: i
          });
        }, e.isProxyWindow = function(t) {
          return !!(t && !Gn(t) && t.isProxyWindow);
        }, e.toProxyWindow = function(t, o) {
          var i = o.send;
          if (Ur(), e.isProxyWindow(t)) return t;
          var s = t;
          return Je("winToProxyWindow").get(s) || new e({
            win: s,
            send: i
          });
        }, e;
      }();
      function $r(e, n, t, o, i) {
        var s = Je("methodStore"), u = he("proxyWindowMethods");
        an.isProxyWindow(o) ? u.set(e, {
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
      function ko(e, n) {
        var t = Je("methodStore"), o = he("proxyWindowMethods");
        return t.getOrSet(e, function() {
          return {};
        })[n] || o.get(n);
      }
      function ei(e, n, t, o, i) {
        u = (s = {
          on: i.on,
          send: i.send
        }).on, f = s.send, he("builtinListeners").getOrSet("functionCalls", function() {
          return u("postrobot_method", {
            domain: "*"
          }, function(g) {
            var w = g.source, p = g.origin, m = g.data, y = m.id, P = m.name, S = ko(w, y);
            if (!S) throw new Error("Could not find method '" + P + "' with id: " + m.id + " in " + H(window));
            var x = S.source, W = S.domain, V = S.val;
            return O.try(function() {
              if (!tn(W, p)) throw new Error("Method '" + m.name + "' domain " + JSON.stringify(Nr(S.domain) ? S.domain.source : S.domain) + " does not match origin " + p + " in " + H(window));
              if (an.isProxyWindow(x)) return x.matchWindow(w, {
                send: f
              }).then(function(I) {
                if (!I) throw new Error("Method call '" + m.name + "' failed - proxy window does not match source in " + H(window));
              });
            }).then(function() {
              return V.apply({
                source: w,
                origin: p
              }, m.args);
            }, function(I) {
              return O.try(function() {
                if (V.onError) return V.onError(I);
              }).then(function() {
                throw I.stack && (I.stack = "Remote call to " + P + "(" + function(L) {
                  return L === void 0 && (L = []), Rr(L).map(function(_) {
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
        e = an.unwrap(e);
        var v = t.__name__ || t.name || o;
        return typeof v == "string" && typeof v.indexOf == "function" && v.indexOf("anonymous::") === 0 && (v = v.replace("anonymous::", o + "::")), an.isProxyWindow(e) ? ($r(d, t, v, e, n), e.awaitWindow().then(function(g) {
          $r(d, t, v, g, n);
        })) : $r(d, t, v, e, n), Jn("cross_domain_function", {
          id: d,
          name: v
        });
      }
      function ni(e, n, t, o) {
        var i, s = o.on, u = o.send;
        return function(f, d) {
          d === void 0 && (d = Aa);
          var v = JSON.stringify(f, function(g) {
            var w = this[g];
            if (Mr(this)) return w;
            var p = Ho(w);
            if (!p) return w;
            var m = d[p] || _a[p];
            return m ? m(w, g) : w;
          });
          return v === void 0 ? "undefined" : v;
        }(t, ((i = {}).promise = function(f, d) {
          return function(v, g, w, p, m) {
            return Jn("cross_domain_zalgo_promise", {
              then: ei(v, g, function(y, P) {
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
          return ei(e, n, f, d, {
            on: s,
            send: u
          });
        }, i.object = function(f) {
          return Gn(f) || an.isProxyWindow(f) ? Jn("cross_domain_window", an.serialize(f, {
            send: u
          })) : f;
        }, i));
      }
      function ti(e, n, t, o) {
        var i, s = o.send;
        return function(u, f) {
          if (f === void 0 && (f = za), u !== "undefined") return JSON.parse(u, function(d, v) {
            if (Mr(this)) return v;
            var g, w;
            if (Mr(v) ? (g = v.__type__, w = v.__val__) : (g = Ho(v), w = v), !g) return w;
            var p = f[g] || Ma[g];
            return p ? p(w, d) : w;
          });
        }(t, ((i = {}).cross_domain_zalgo_promise = function(u) {
          return function(f, d, v) {
            return new O(v.then);
          }(0, 0, u);
        }, i.cross_domain_function = function(u) {
          return function(f, d, v, g) {
            var w = v.id, p = v.name, m = g.send, y = function(S) {
              S === void 0 && (S = {});
              function x() {
                var W = arguments;
                return an.toProxyWindow(f, {
                  send: m
                }).awaitWindow().then(function(V) {
                  var I = ko(V, w);
                  if (I && I.val !== x) return I.val.apply({
                    source: window,
                    origin: H()
                  }, W);
                  var L = [].slice.call(W);
                  return S.fireAndForget ? m(V, "postrobot_method", {
                    id: w,
                    name: p,
                    args: L
                  }, {
                    domain: d,
                    fireAndForget: !0
                  }) : m(V, "postrobot_method", {
                    id: w,
                    name: p,
                    args: L
                  }, {
                    domain: d,
                    fireAndForget: !1
                  }).then(function(_) {
                    return _.data.result;
                  });
                }).catch(function(V) {
                  throw V;
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
          return an.deserialize(u, {
            send: s
          });
        }, i));
      }
      var Tt = {};
      Tt.postrobot_post_message = function(e, n, t) {
        t.indexOf("file:") === 0 && (t = "*"), e.postMessage(n, t);
      }, Tt.postrobot_bridge = function(e, n, t) {
        if (!zr() && !Ko()) throw new Error("Bridge not needed for browser");
        if (J(e)) throw new Error("Post message through bridge disabled between same domain windows");
        if ($t(window, e) !== !1) throw new Error("Can only use bridge to communicate between two different windows, not between frames");
        (function(o, i, s) {
          var u = ho(window, o), f = ho(o, window);
          if (!u && !f) throw new Error("Can only send messages to and from parent and popup windows");
          Lr(o).then(function(d) {
            return d(o, i, s);
          });
        })(e, t, n);
      }, Tt.postrobot_global = function(e, n) {
        if (!yt(window).match(/MSIE|rv:11|trident|edge\/12|edge\/13/i)) throw new Error("Global messaging not needed for browser");
        if (!J(e)) throw new Error("Post message through global disabled between different domain windows");
        if ($t(window, e) !== !1) throw new Error("Can only use global to communicate between two different windows, not between frames");
        var t = gn(e);
        if (!t) throw new Error("Can not find postRobot global on foreign window");
        t.receiveMessage({
          source: window,
          origin: H(),
          data: n
        });
      };
      function Br(e, n, t, o) {
        var i = o.on, s = o.send;
        return O.try(function() {
          var u = Je().getOrSet(e, function() {
            return {};
          });
          return u.buffer = u.buffer || [], u.buffer.push(t), u.flush = u.flush || O.flush().then(function() {
            if (Se(e)) throw new Error("Window is closed");
            var f = ni(e, n, ((d = {}).__post_robot_11_0_0__ = u.buffer || [], d), {
              on: i,
              send: s
            }), d;
            delete u.buffer;
            for (var v = Object.keys(Tt), g = [], w = 0; w < v.length; w++) {
              var p = v[w];
              try {
                Tt[p](e, f, n);
              } catch (m) {
                g.push(m);
              }
            }
            if (g.length === v.length) throw new Error(`All post-robot messaging strategies failed:

` + g.map(function(m, y) {
              return y + ". " + it(m);
            }).join(`

`));
          }), u.flush.then(function() {
            delete u.flush;
          });
        }).then(ge);
      }
      function ri(e) {
        return he("responseListeners").get(e);
      }
      function oi(e) {
        he("responseListeners").del(e);
      }
      function ii(e) {
        return he("erroredResponseListeners").has(e);
      }
      function ai(e) {
        var n = e.name, t = e.win, o = e.domain, i = Je("requestListeners");
        if (t === "*" && (t = null), o === "*" && (o = null), !n) throw new Error("Name required to get request listener");
        for (var s = 0, u = [t, kt()]; s < u.length; s++) {
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
                    if (tn(p.regex, o)) return m;
                  }
                }
                if (v["*"]) return v["*"];
              }
            }
          }
        }
      }
      function qr(e, n) {
        var t = n.on, o = n.send, i = he("receivedMessages");
        try {
          if (!window || window.closed || !e.source) return;
        } catch {
          return;
        }
        var s = e.source, u = e.origin, f = function(w, p, m, y) {
          var P = y.on, S = y.send, x;
          try {
            x = ti(p, m, w, {
              on: P,
              send: S
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
          qo(s);
          for (var d, v = function() {
            var w = f[g];
            if (i.has(w.id)) return {
              v: void 0
            };
            if (i.set(w.id, !0), Se(s) && !w.fireAndForget) return {
              v: void 0
            };
            w.origin.indexOf("file:") === 0 && (u = "file://");
            try {
              w.type === "postrobot_message_request" ? function(p, m, y, P) {
                var S = P.on, x = P.send, W = ai({
                  name: y.name,
                  win: p,
                  domain: m
                }), V = y.name === "postrobot_method" && y.data && typeof y.data.name == "string" ? y.data.name + "()" : y.name;
                function I(L, _, Q) {
                  return O.flush().then(function() {
                    if (!y.fireAndForget && !Se(p)) try {
                      return Br(p, m, {
                        id: Ke(),
                        origin: H(window),
                        type: "postrobot_message_response",
                        hash: y.hash,
                        name: y.name,
                        ack: L,
                        data: _,
                        error: Q
                      }, {
                        on: S,
                        send: x
                      });
                    } catch (F) {
                      throw new Error("Send response message failed for " + V + " in " + H() + `

` + it(F));
                    }
                  });
                }
                O.all([O.flush().then(function() {
                  if (!y.fireAndForget && !Se(p)) try {
                    return Br(p, m, {
                      id: Ke(),
                      origin: H(window),
                      type: "postrobot_message_ack",
                      hash: y.hash,
                      name: y.name
                    }, {
                      on: S,
                      send: x
                    });
                  } catch (L) {
                    throw new Error("Send ack message failed for " + V + " in " + H() + `

` + it(L));
                  }
                }), O.try(function() {
                  if (!W) throw new Error("No handler found for post message: " + y.name + " from " + m + " in " + window.location.protocol + "//" + window.location.host + window.location.pathname);
                  return W.handler({
                    source: p,
                    origin: m,
                    data: y.data
                  });
                }).then(function(L) {
                  return I("success", L);
                }, function(L) {
                  return I("error", null, L);
                })]).then(ge).catch(function(L) {
                  if (W && W.handleError) return W.handleError(L);
                  throw L;
                });
              }(s, u, w, {
                on: t,
                send: o
              }) : w.type === "postrobot_message_response" ? function(p, m, y) {
                if (!ii(y.hash)) {
                  var P = ri(y.hash);
                  if (!P) throw new Error("No handler found for post message response for message: " + y.name + " from " + m + " in " + window.location.protocol + "//" + window.location.host + window.location.pathname);
                  if (!tn(P.domain, m)) throw new Error("Response origin " + m + " does not match domain " + (S = P.domain, Array.isArray(S) ? "(" + S.join(" | ") + ")" : hn(S) ? "RegExp(" + S.toString() + ")" : S.toString()));
                  var S;
                  if (p !== P.win) throw new Error("Response source does not match registered window");
                  oi(y.hash), y.ack === "error" ? P.promise.reject(y.error) : y.ack === "success" && P.promise.resolve({
                    source: p,
                    origin: m,
                    data: y.data
                  });
                }
              }(s, u, w) : w.type === "postrobot_message_ack" && function(p, m, y) {
                if (!ii(y.hash)) {
                  var P = ri(y.hash);
                  if (!P) throw new Error("No handler found for post message ack for message: " + y.name + " from " + m + " in " + window.location.protocol + "//" + window.location.host + window.location.pathname);
                  try {
                    if (!tn(P.domain, m)) throw new Error("Ack origin " + m + " does not match domain " + P.domain.toString());
                    if (p !== P.win) throw new Error("Ack source does not match registered window");
                  } catch (S) {
                    P.promise.reject(S);
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
      function Sn(e, n, t) {
        if (!e) throw new Error("Expected name");
        if (typeof (n = n || {}) == "function" && (t = n, n = {}), !t) throw new Error("Expected handler");
        var o = function i(s, u) {
          var f = s.name, d = s.win, v = s.domain, g = Je("requestListeners");
          if (!f || typeof f != "string") throw new Error("Name required to add request listener");
          if (d && d !== "*" && an.isProxyWindow(d)) {
            var w = d.awaitWindow().then(function(se) {
              return i({
                name: f,
                win: se,
                domain: v
              }, u);
            });
            return {
              cancel: function() {
                w.then(function(se) {
                  return se.cancel();
                }, ge);
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
                for (var se = 0; se < m.length; se++) m[se].cancel();
              }
            };
          }
          if (Array.isArray(v)) {
            for (var S = [], x = 0, W = v; x < W.length; x++) S.push(i({
              name: f,
              win: p,
              domain: W[x]
            }, u));
            return {
              cancel: function() {
                for (var se = 0; se < S.length; se++) S[se].cancel();
              }
            };
          }
          var V = ai({
            name: f,
            win: p,
            domain: v
          });
          p && p !== "*" || (p = kt());
          var I = (v = v || "*").toString();
          if (V) throw p && v ? new Error("Request listener already exists for " + f + " on domain " + v.toString() + " for " + (p === kt() ? "wildcard" : "specified") + " window") : p ? new Error("Request listener already exists for " + f + " for " + (p === kt() ? "wildcard" : "specified") + " window") : v ? new Error("Request listener already exists for " + f + " on domain " + v.toString()) : new Error("Request listener already exists for " + f);
          var L = g.getOrSet(p, function() {
            return {};
          }), _ = Ot(L, f, function() {
            return {};
          }), Q, F;
          return Nr(v) ? (Q = Ot(_, "__domain_regex__", function() {
            return [];
          })).push(F = {
            regex: v,
            listener: u
          }) : _[I] = u, {
            cancel: function() {
              delete _[I], F && (Q.splice(Q.indexOf(F, 1)), Q.length || delete _.__domain_regex__), Object.keys(_).length || delete L[f], p && !Object.keys(L).length && g.del(p);
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
      var pn = function e(n, t, o, i) {
        var s = (i = i || {}).domain || "*", u = i.timeout || -1, f = i.timeout || 5e3, d = i.fireAndForget || !1;
        return an.toProxyWindow(n, {
          send: e
        }).awaitWindow().then(function(v) {
          return O.try(function() {
            if (function(g, w, p) {
              if (!g) throw new Error("Expected name");
              if (p && typeof p != "string" && !Array.isArray(p) && !Nr(p)) throw new TypeError("Can not send " + g + ". Expected domain " + JSON.stringify(p) + " to be a string, array, or regex");
              if (Se(w)) throw new Error("Can not send " + g + ". Target window is closed");
            }(t, v, s), function(g, w) {
              var p = Et(w);
              if (p) return p === g;
              if (w === g || mn(w) === w) return !1;
              for (var m = 0, y = wt(g); m < y.length; m++) if (y[m] === w) return !0;
              return !1;
            }(window, v)) return Bo(v, f);
          }).then(function(g) {
            return function(w, p, m, y) {
              var P = y.send;
              return O.try(function() {
                return typeof p == "string" ? p : O.try(function() {
                  return m || Ar(w, {
                    send: P
                  }).then(function(S) {
                    return S.domain;
                  });
                }).then(function(S) {
                  if (!tn(p, p)) throw new Error("Domain " + Gt(p) + " does not match " + Gt(p));
                  return S;
                });
              });
            }(v, s, (g === void 0 ? {} : g).domain, {
              send: e
            });
          }).then(function(g) {
            var w = g, p = t === "postrobot_method" && o && typeof o.name == "string" ? o.name + "()" : t, m = new O(), y = t + "_" + Ke();
            if (!d) {
              var P = {
                name: t,
                win: v,
                domain: w,
                promise: m
              };
              (function(_, Q) {
                he("responseListeners").set(_, Q);
              })(y, P);
              var S = Je("requestPromises").getOrSet(v, function() {
                return [];
              });
              S.push(m), m.catch(function() {
                (function(_) {
                  he("erroredResponseListeners").set(_, !0);
                })(y), oi(y);
              });
              var x = function(_) {
                return Je("knownWindows").get(_, !1);
              }(v) ? 1e4 : 2e3, W = u, V = x, I = W, L = Pt(function() {
                return Se(v) ? m.reject(new Error("Window closed for " + t + " before " + (P.ack ? "response" : "ack"))) : P.cancelled ? m.reject(new Error("Response listener was cancelled for " + t)) : (V = Math.max(V - 500, 0), I !== -1 && (I = Math.max(I - 500, 0)), P.ack || V !== 0 ? I === 0 ? m.reject(new Error("No response for postMessage " + p + " in " + H() + " in " + W + "ms")) : void 0 : m.reject(new Error("No ack for postMessage " + p + " in " + H() + " in " + x + "ms")));
              }, 500);
              m.finally(function() {
                L.cancel(), S.splice(S.indexOf(m, 1));
              }).catch(ge);
            }
            return Br(v, w, {
              id: Ke(),
              origin: H(window),
              type: "postrobot_message_request",
              hash: y,
              name: t,
              data: o,
              fireAndForget: d
            }, {
              on: Sn,
              send: e
            }).then(function() {
              return d ? m.resolve() : m;
            }, function(_) {
              throw new Error("Send request message failed for " + p + " in " + H() + `

` + it(_));
            });
          });
        });
      };
      function Rt(e) {
        return an.toProxyWindow(e, {
          send: pn
        });
      }
      function si(e) {
        for (var n = 0, t = Je("requestPromises").get(e, []); n < t.length; n++) t[n].reject(new Error("Window " + (Se(e) ? "closed" : "cleaned up") + " before response")).catch(ge);
      }
      var An;
      An = {
        setupBridge: Xo,
        openBridge: function(e, n) {
          var t = he("bridges"), o = he("bridgeFrames");
          return n = n || On(e), t.getOrSet(n, function() {
            return O.try(function() {
              if (H() === n) throw new Error("Can not open bridge on the same domain as current domain: " + n);
              var i = Fr(n);
              if (Ut(window, i)) throw new Error("Frame with name " + i + " already exists on page");
              var s = function(u, f) {
                var d = document.createElement("iframe");
                return d.setAttribute("name", u), d.setAttribute("id", u), d.setAttribute("style", "display: none; margin: 0; padding: 0; border: 0px none; overflow: hidden;"), d.setAttribute("frameborder", "0"), d.setAttribute("border", "0"), d.setAttribute("scrolling", "no"), d.setAttribute("allowTransparency", "true"), d.setAttribute("tabindex", "-1"), d.setAttribute("hidden", "true"), d.setAttribute("title", ""), d.setAttribute("role", "presentation"), d.src = f, d;
              }(i, e);
              return o.set(n, s), Fa.then(function(u) {
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
        linkWindow: er,
        linkUrl: function(e, n) {
          er({
            win: e,
            domain: On(n)
          });
        },
        isBridge: Ko,
        needsBridge: Jo,
        needsBridgeForBrowser: zr,
        hasBridge: function(e, n) {
          return he("bridges").has(n || On(e));
        },
        needsBridgeForWin: Vo,
        needsBridgeForDomain: Go,
        destroyBridges: function() {
          for (var e = he("bridges"), n = he("bridgeFrames"), t = 0, o = n.keys(); t < o.length; t++) {
            var i = n.get(o[t]);
            i && i.parentNode && i.parentNode.removeChild(i);
          }
          n.reset(), e.reset();
        }
      };
      function Ct(e) {
        if (!J(e)) throw new Error("Can not get global for window on different domain");
        return e.__zoid_10_3_3__ || (e.__zoid_10_3_3__ = {}), e.__zoid_10_3_3__;
      }
      function ui(e, n) {
        try {
          return n(Ct(e));
        } catch {
        }
      }
      function nr(e) {
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
      function La(e) {
        return Or(JSON.stringify(e));
      }
      function Hr(e) {
        var n = Ct(e);
        return n.references = n.references || {}, n.references;
      }
      function ci(e) {
        var n = e.data, t = e.metaData, o = e.sender, i = e.receiver, s = e.passByReference, u = s !== void 0 && s, f = e.basic, d = f !== void 0 && f, v = Rt(i.win), g = d ? JSON.stringify(n) : ni(v, i.domain, n, {
          on: Sn,
          send: pn
        }), w = u ? function(p) {
          var m = Ke();
          return Hr(window)[m] = p, {
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
            p = window, (m = w).type === "uid" && delete Hr(p)[m.uid];
            var p, m;
          }
        };
      }
      function di(e) {
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
          if (w.type === "uid") return Hr(g)[w.uid];
          throw new Error("Unsupported ref type: " + w.type);
        }(f, s);
        return {
          data: o ? JSON.parse(v) : function(g, w, p) {
            return ti(g, w, p, {
              on: Sn,
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
      var ve = {
        STRING: "string",
        OBJECT: "object",
        FUNCTION: "function",
        BOOLEAN: "boolean",
        NUMBER: "number",
        ARRAY: "array"
      }, tr = {
        JSON: "json",
        DOTIFY: "dotify",
        BASE64: "base64"
      }, Te = ot, ye = {
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
      function fi(e) {
        return "__zoid__" + e.name + "__" + e.serializedPayload + "__";
      }
      function Vr(e) {
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
        var n = di({
          data: Vr(e).serializedInitialPayload,
          sender: {
            win: function(t) {
              return function(o) {
                if (o.type === "opener") return Yt("opener", ue(window));
                if (o.type === "parent" && typeof o.distance == "number") return Yt("parent", function(w, p) {
                  return p === void 0 && (p = 1), function(m, y) {
                    y === void 0 && (y = 1);
                    for (var P = m, S = 0; S < y; S++) {
                      if (!P) return;
                      P = oe(P);
                    }
                    return P;
                  }(w, gr(w) - p);
                }(window, o.distance));
                if (o.type === "global" && o.uid && typeof o.uid == "string") {
                  var i = o.uid, s = Et(window);
                  if (!s) throw new Error("Can not find ancestor window");
                  for (var u = 0, f = In(s); u < f.length; u++) {
                    var d = f[u];
                    if (J(d)) {
                      var v = ui(d, function(w) {
                        return w.windows && w.windows[i];
                      });
                      if (v) return v;
                    }
                  }
                } else if (o.type === "name") {
                  var g = o.name;
                  return Yt("namedWindow", function(w, p) {
                    return Ut(w, p) || function m(y, P) {
                      var S = Ut(y, P);
                      if (S) return S;
                      for (var x = 0, W = wt(y); x < W.length; x++) {
                        var V = m(W[x], P);
                        if (V) return V;
                      }
                    }(mn(w) || w, p);
                  }(Yt("ancestor", Et(window)), g));
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
      function li() {
        return ja(window.name);
      }
      function Ua(e, n) {
        if (n === void 0 && (n = window), e === oe(n)) return {
          type: "parent",
          distance: gr(e)
        };
        if (e === ue(n)) return {
          type: "opener"
        };
        if (J(e) && (o = e, o !== mn(o))) {
          var t = de(e).name;
          if (t) return {
            type: "name",
            name: t
          };
        }
        var o;
      }
      function hi(e, n, t, o, i) {
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
        return O.try(function() {
          window.focus();
        });
      }
      function pi() {
        return O.try(function() {
          window.close();
        });
      }
      var Tn = function() {
        return ge;
      }, Kn = function(e) {
        return Vt(e.value);
      };
      function Gr(e, n, t) {
        for (var o = 0, i = Object.keys(T({}, e, n)); o < i.length; o++) {
          var s = i[o];
          t(s, n[s], e[s]);
        }
      }
      function vi(e, n, t) {
        var o = {};
        return O.all(function(i, s, u) {
          var f = [];
          return Gr(i, s, function(d, v, g) {
            var w = function(p, m, y) {
              return O.resolve().then(function() {
                var P, S;
                if (y != null && m) {
                  var x = (P = {}, P.get = m.queryParam, P.post = m.bodyParam, P)[t], W = (S = {}, S.get = m.queryValue, S.post = m.bodyValue, S)[t];
                  if (x) return O.hash({
                    finalParam: O.try(function() {
                      return typeof x == "function" ? x({
                        value: y
                      }) : typeof x == "string" ? x : p;
                    }),
                    finalValue: O.try(function() {
                      return typeof W == "function" && _n(y) ? W({
                        value: y
                      }) : y;
                    })
                  }).then(function(V) {
                    var I = V.finalParam, L = V.finalValue, _;
                    if (typeof L == "boolean") _ = L.toString();
                    else if (typeof L == "string") _ = L.toString();
                    else if (typeof L == "object" && L !== null) {
                      if (m.serialization === tr.JSON) _ = JSON.stringify(L);
                      else if (m.serialization === tr.BASE64) _ = Or(JSON.stringify(L));
                      else if (m.serialization === tr.DOTIFY || !m.serialization) {
                        _ = function te(K, j, ae) {
                          j === void 0 && (j = ""), ae === void 0 && (ae = {}), j = j && j + ".";
                          for (var k in K) K.hasOwnProperty(k) && K[k] != null && typeof K[k] != "function" && (K[k] && Array.isArray(K[k]) && K[k].length && K[k].every(function(Re) {
                            return typeof Re != "object";
                          }) ? ae["" + j + k + "[]"] = K[k].join(",") : K[k] && typeof K[k] == "object" ? ae = te(K[k], "" + j + k, ae) : ae["" + j + k] = K[k].toString());
                          return ae;
                        }(L, p);
                        for (var Q = 0, F = Object.keys(_); Q < F.length; Q++) {
                          var se = F[Q];
                          o[se] = _[se];
                        }
                        return;
                      }
                    } else typeof L == "number" && (_ = L.toString());
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
      function wi(e) {
        var n = e.uid, t = e.options, o = e.overrides, i = o === void 0 ? {} : o, s = e.parentWin, u = s === void 0 ? window : s, f = t.propsDef, d = t.containerTemplate, v = t.prerenderTemplate, g = t.tag, w = t.name, p = t.attributes, m = t.dimensions, y = t.autoResize, P = t.url, S = t.domain, x = t.exports, W = new O(), V = [], I = Kt(), L = {}, _ = {}, Q = {
          visible: !0
        }, F = i.event ? i.event : (se = {}, te = {}, K = {
          on: function(R, N) {
            var z = te[R] = te[R] || [];
            z.push(N);
            var M = !1;
            return {
              cancel: function() {
                M || (M = !0, z.splice(z.indexOf(N), 1));
              }
            };
          },
          once: function(R, N) {
            var z = K.on(R, function() {
              z.cancel(), N();
            });
            return z;
          },
          trigger: function(R) {
            for (var N = arguments.length, z = new Array(N > 1 ? N - 1 : 0), M = 1; M < N; M++) z[M - 1] = arguments[M];
            var ne = te[R], Y = [];
            if (ne)
              for (var we = function() {
                var je = ne[me];
                Y.push(O.try(function() {
                  return je.apply(void 0, z);
                }));
              }, me = 0; me < ne.length; me++) we();
            return O.all(Y).then(ge);
          },
          triggerOnce: function(R) {
            if (se[R]) return O.resolve();
            se[R] = !0;
            for (var N = arguments.length, z = new Array(N > 1 ? N - 1 : 0), M = 1; M < N; M++) z[M - 1] = arguments[M];
            return K.trigger.apply(K, [R].concat(z));
          },
          reset: function() {
            te = {};
          }
        }), se, te, K, j = i.props ? i.props : {}, ae, k, Re, yn, sn, Mn = !1, zn = i.onError, Rn = i.getProxyContainer, Fn = i.show, Ln = i.hide, Yn = i.close, jn = i.renderContainer, vn = i.getProxyWindow, Zn = i.setProxyWin, Un = i.openFrame, $n = i.openPrerenderFrame, Xn = i.prerender, Qn = i.open, re = i.openPrerender, un = i.watchForUnload, ie = i.getInternalState, Fe = i.setInternalState, Ce = function() {
          return typeof m == "function" ? m({
            props: j
          }) : m;
        }, Le = function() {
          return O.try(function() {
            return i.resolveInitPromise ? i.resolveInitPromise() : W.resolve();
          });
        }, Pe = function(R) {
          return O.try(function() {
            return i.rejectInitPromise ? i.rejectInitPromise(R) : W.reject(R);
          });
        }, Ye = function(R) {
          for (var N = {}, z = 0, M = Object.keys(j); z < M.length; z++) {
            var ne = M[z], Y = f[ne];
            if (!Y || Y.sendToChild !== !1) {
              var we = Y && Y.trustedDomains && Y.trustedDomains.length > 0 ? Y.trustedDomains.reduce(function(me, je) {
                return me || tn(je, R);
              }, !1) : tn(R, H(window));
              Y && Y.sameDomain && !we || Y && Y.trustedDomains && !we || (N[ne] = j[ne]);
            }
          }
          return O.hash(N);
        }, _e = function() {
          return O.try(function() {
            return ie ? ie() : Q;
          });
        }, Ae = function(R) {
          return O.try(function() {
            return Fe ? Fe(R) : Q = T({}, Q, R);
          });
        }, cn = function() {
          return vn ? vn() : O.try(function() {
            var R = j.window;
            if (R) {
              var N = Rt(R);
              return I.register(function() {
                return R.close();
              }), N;
            }
            return new an({
              send: pn
            });
          });
        }, Qe = function(R) {
          return Zn ? Zn(R) : O.try(function() {
            ae = R;
          });
        }, wn = function() {
          return Fn ? Fn() : O.hash({
            setState: Ae({
              visible: !0
            }),
            showElement: k ? k.get().then(xa) : null
          }).then(ge);
        }, Cn = function() {
          return Ln ? Ln() : O.hash({
            setState: Ae({
              visible: !1
            }),
            showElement: k ? k.get().then(Wo) : null
          }).then(ge);
        }, ut = function() {
          return typeof P == "function" ? P({
            props: j
          }) : P;
        }, ct = function() {
          return typeof p == "function" ? p({
            props: j
          }) : p;
        }, kn = function() {
          return On(ut());
        }, ke = function(R, N) {
          var z = N.windowName;
          return Un ? Un(R, {
            windowName: z
          }) : O.try(function() {
            if (R === Te.IFRAME) return nr(Io({
              attributes: T({
                name: z,
                title: w
              }, ct().iframe)
            }));
          });
        }, Nt = function(R) {
          return $n ? $n(R) : O.try(function() {
            if (R === Te.IFRAME) return nr(Io({
              attributes: T({
                name: "__zoid_prerender_frame__" + w + "_" + Ke() + "__",
                title: "prerender__" + w
              }, ct().iframe)
            }));
          });
        }, xt = function(R, N, z) {
          return re ? re(R, N, z) : O.try(function() {
            if (R === Te.IFRAME) {
              if (!z) throw new Error("Expected proxy frame to be passed");
              return z.get().then(function(M) {
                return I.register(function() {
                  return St(M);
                }), Dr(M).then(function(ne) {
                  return de(ne);
                }).then(function(ne) {
                  return Rt(ne);
                });
              });
            }
            if (R === Te.POPUP) return N;
            throw new Error("No render context available for " + R);
          });
        }, dt = function() {
          return O.try(function() {
            if (ae) return O.all([F.trigger(ye.FOCUS), ae.focus()]).then(ge);
          });
        }, rr = function() {
          var R = Ct(window);
          return R.windows = R.windows || {}, R.windows[n] = window, I.register(function() {
            delete R.windows[n];
          }), n;
        }, It = function(R, N, z, M) {
          if (N === H(window)) return {
            type: "global",
            uid: rr()
          };
          if (R !== window) throw new Error("Can not construct cross-domain window reference for different target window");
          if (j.window) {
            var ne = M.getWindow();
            if (!ne) throw new Error("Can not construct cross-domain window reference for lazy window prop");
            if (Et(ne) !== window) throw new Error("Can not construct cross-domain window reference for window prop with different ancestor");
          }
          if (z === Te.POPUP) return {
            type: "opener"
          };
          if (z === Te.IFRAME) return {
            type: "parent",
            distance: gr(window)
          };
          throw new Error("Can not construct window reference for child");
        }, or = function(R, N) {
          return O.try(function() {
            var z;
            yn = R, Re = N, (z = ae) == null || z.isPopup().then(function(M) {
              if ((N == null ? void 0 : N.name) !== "" && M) {
                var ne;
                (ne = ae) == null || ne.setName(N == null ? void 0 : N.name);
              }
            }).finally(function() {
              Le(), I.register(function() {
                return N.close.fireAndForget().catch(ge);
              });
            });
          });
        }, Dt = function(R) {
          var N = R.width, z = R.height;
          return O.try(function() {
            F.trigger(ye.RESIZE, {
              width: N,
              height: z
            });
          });
        }, Wt = function(R) {
          return O.try(function() {
            return F.trigger(ye.DESTROY);
          }).catch(ge).then(function() {
            return I.all(R);
          }).then(function() {
            var N = R || new Error("Component destroyed");
            sn && st(sn) || N.message === "Window navigated away" ? W.resolve() : W.asyncReject(N);
          });
        }, Nn = Wn(function(R) {
          return O.try(function() {
            return Yn ? Se(Yn.__source__) ? void 0 : Yn() : O.try(function() {
              return F.trigger(ye.CLOSE);
            }).then(function() {
              return Wt(R || new Error("Component closed"));
            });
          });
        }), yi = function(R, N) {
          var z = N.proxyWin, M = N.proxyFrame, ne = N.windowName;
          return Qn ? Qn(R, {
            proxyWin: z,
            proxyFrame: M,
            windowName: ne
          }) : O.try(function() {
            if (R === Te.IFRAME) {
              if (!M) throw new Error("Expected proxy frame to be passed");
              return M.get().then(function(Ne) {
                return Dr(Ne).then(function(pe) {
                  return I.register(function() {
                    return St(Ne);
                  }), I.register(function() {
                    return si(pe);
                  }), pe;
                });
              });
            }
            if (R === Te.POPUP) {
              var Y = Ce(), we = Y.width, me = we === void 0 ? "300px" : we, je = Y.height, Ee = je === void 0 ? "150px" : je;
              me = Fo(me, window.outerWidth), Ee = Fo(Ee, window.outerWidth);
              var Me = function(Ne, pe) {
                var xe = (pe = pe || {}).closeOnUnload, be = xe === void 0 ? 1 : xe, en = pe.name, Ue = en === void 0 ? "" : en, ce = pe.width, $e = pe.height, Ze = 0, Ve = 0;
                ce && (window.outerWidth ? Ve = Math.round((window.outerWidth - ce) / 2) + window.screenX : window.screen.width && (Ve = Math.round((window.screen.width - ce) / 2))), $e && (window.outerHeight ? Ze = Math.round((window.outerHeight - $e) / 2) + window.screenY : window.screen.height && (Ze = Math.round((window.screen.height - $e) / 2))), delete pe.closeOnUnload, delete pe.name, ce && $e && (pe = T({
                  top: Ze,
                  left: Ve,
                  width: ce,
                  height: $e,
                  status: 1,
                  toolbar: 0,
                  menubar: 0,
                  resizable: 1,
                  scrollbars: 1
                }, pe));
                var et = Object.keys(pe).map(function(En) {
                  if (pe[En] != null) return En + "=" + Gt(pe[En]);
                }).filter(Boolean).join(","), dn;
                try {
                  dn = window.open("", Ue, et);
                } catch (En) {
                  throw new Ir("Can not open popup window - " + (En.stack || En.message));
                }
                if (Se(dn))
                  throw new Ir("Can not open popup window - blocked");
                return be && window.addEventListener("unload", function() {
                  return dn.close();
                }), dn;
              }(0, T({
                name: ne,
                width: me,
                height: Ee
              }, ct().popup));
              return I.register(function() {
                return wo(Me);
              }), I.register(function() {
                return si(Me);
              }), Me;
            }
            throw new Error("No render context available for " + R);
          }).then(function(Y) {
            return z.setWindow(Y, {
              send: pn
            }), z.setName(ne).then(function() {
              return z;
            });
          });
        }, Ei = function() {
          return O.try(function() {
            var R = Do(window, "unload", Vt(function() {
              Wt(new Error("Window navigated away"));
            })), N = po(u, Wt, 3e3);
            if (I.register(N.cancel), I.register(R.cancel), un) return un();
          });
        }, bi = function(R) {
          var N = !1;
          return R.isClosed().then(function(z) {
            return z ? (N = !0, Nn(new Error("Detected component window close"))) : O.delay(200).then(function() {
              return R.isClosed();
            }).then(function(M) {
              if (M)
                return N = !0, Nn(new Error("Detected component window close"));
            });
          }).then(function() {
            return N;
          });
        }, _t = function(R) {
          return zn ? zn(R) : O.try(function() {
            if (V.indexOf(R) === -1)
              return V.push(R), W.asyncReject(R), F.trigger(ye.ERROR, R);
          });
        }, Pi = new O(), Oi = function(R) {
          return O.try(function() {
            Pi.resolve(R);
          });
        };
        or.onError = _t;
        var Si = function(R, N) {
          return R({
            uid: n,
            container: N.container,
            context: N.context,
            doc: N.doc,
            frame: N.frame,
            prerenderFrame: N.prerenderFrame,
            focus: dt,
            close: Nn,
            state: L,
            props: j,
            tag: g,
            dimensions: Ce(),
            event: F
          });
        }, Ti = function(R, N) {
          var z = N.context;
          return Xn ? Xn(R, {
            context: z
          }) : O.try(function() {
            if (v) {
              F.trigger(ye.PRERENDER);
              var M = R.getWindow();
              if (M && J(M) && function(xe) {
                try {
                  if (!xe.location.href || xe.location.href === "about:blank") return !0;
                } catch {
                }
                return !1;
              }(M)) {
                var ne = (M = de(M)).document, Y = Si(v, {
                  context: z,
                  doc: ne
                });
                if (Y) {
                  if (Y.ownerDocument !== ne) throw new Error("Expected prerender template to have been created with document from child window");
                  (function(xe, be) {
                    var en = be.tagName.toLowerCase();
                    if (en !== "html") throw new Error("Expected element to be html, got " + en);
                    for (var Ue = xe.document.documentElement, ce = 0, $e = Rr(Ue.children); ce < $e.length; ce++) Ue.removeChild($e[ce]);
                    for (var Ze = 0, Ve = Rr(be.children); Ze < Ve.length; Ze++) Ue.appendChild(Ve[Ze]);
                  })(M, Y);
                  var we = y.width, me = we !== void 0 && we, je = y.height, Ee = je !== void 0 && je, Me = y.element, Ne = Me === void 0 ? "body" : Me;
                  if ((Ne = xr(Ne, ne)) && (me || Ee)) {
                    var pe = _o(Ne, function(xe) {
                      Dt({
                        width: me ? xe.width : void 0,
                        height: Ee ? xe.height : void 0
                      });
                    }, {
                      width: me,
                      height: Ee,
                      win: M
                    });
                    F.on(ye.RENDERED, pe.cancel);
                  }
                  F.trigger(ye.PRERENDERED);
                }
              }
            }
          });
        }, Ri = function(R, N) {
          var z = N.proxyFrame, M = N.proxyPrerenderFrame, ne = N.context, Y = N.rerender;
          return jn ? jn(R, {
            proxyFrame: z,
            proxyPrerenderFrame: M,
            context: ne,
            rerender: Y
          }) : O.hash({
            container: R.get(),
            frame: z ? z.get() : null,
            prerenderFrame: M ? M.get() : null,
            internalState: _e()
          }).then(function(we) {
            var me = we.container, je = we.internalState.visible, Ee = Si(d, {
              context: ne,
              container: me,
              frame: we.frame,
              prerenderFrame: we.prerenderFrame,
              doc: document
            });
            if (Ee) {
              je || Wo(Ee), Na(me, Ee);
              var Me = function(Ne, pe) {
                pe = Vt(pe);
                var xe = !1, be = [], en, Ue, ce, $e = function() {
                  xe = !0;
                  for (var dn = 0; dn < be.length; dn++) be[dn].disconnect();
                  en && en.cancel(), ce && ce.removeEventListener("unload", Ze), Ue && St(Ue);
                }, Ze = function() {
                  xe || (pe(), $e());
                };
                if (st(Ne))
                  return Ze(), {
                    cancel: $e
                  };
                if (window.MutationObserver)
                  for (var Ve = Ne.parentElement; Ve; ) {
                    var et = new window.MutationObserver(function() {
                      st(Ne) && Ze();
                    });
                    et.observe(Ve, {
                      childList: !0
                    }), be.push(et), Ve = Ve.parentElement;
                  }
                return (Ue = document.createElement("iframe")).setAttribute("name", "__detect_close_" + Ke() + "__"), Ue.style.display = "none", Dr(Ue).then(function(dn) {
                  (ce = de(dn)).addEventListener("unload", Ze);
                }), Ne.appendChild(Ue), en = Pt(function() {
                  st(Ne) && Ze();
                }, 1e3), {
                  cancel: $e
                };
              }(Ee, function() {
                var Ne = new Error("Detected container element removed from DOM");
                return O.delay(1).then(function() {
                  if (!st(Ee))
                    return I.all(Ne), Y().then(Le, Pe);
                  Nn(Ne);
                });
              });
              return I.register(function() {
                return Me.cancel();
              }), I.register(function() {
                return St(Ee);
              }), k = nr(Ee);
            }
          });
        }, Ci = function() {
          return {
            state: L,
            event: F,
            close: Nn,
            focus: dt,
            resize: Dt,
            onError: _t,
            updateProps: Qa,
            show: wn,
            hide: Cn
          };
        }, Yr = function(R) {
          R === void 0 && (R = {});
          var N = sn, z = Ci();
          at(_, R), function(M, ne, Y, we, me) {
            var je = we.state, Ee = we.close, Me = we.focus, Ne = we.event, pe = we.onError;
            Gr(Y, M, function(xe, be, en) {
              var Ue = !1, ce = en;
              Object.defineProperty(ne, xe, {
                configurable: !0,
                enumerable: !0,
                get: function() {
                  return Ue ? ce : (Ue = !0, function() {
                    if (!be) return ce;
                    var $e = be.alias;
                    if ($e && !_n(en) && _n(Y[$e]) && (ce = Y[$e]), be.value && (ce = be.value({
                      props: ne,
                      state: je,
                      close: Ee,
                      focus: Me,
                      event: Ne,
                      onError: pe,
                      container: me
                    })), !be.default || _n(ce) || _n(Y[xe]) || (ce = be.default({
                      props: ne,
                      state: je,
                      close: Ee,
                      focus: Me,
                      event: Ne,
                      onError: pe,
                      container: me
                    })), _n(ce)) {
                      if (be.type === ve.ARRAY ? !Array.isArray(ce) : typeof ce !== be.type) throw new TypeError("Prop is not of type " + be.type + ": " + xe);
                    } else if (be.required !== !1 && !_n(Y[xe])) throw new Error('Expected prop "' + xe + '" to be defined');
                    return _n(ce) && be.decorate && (ce = be.decorate({
                      value: ce,
                      props: ne,
                      state: je,
                      close: Ee,
                      focus: Me,
                      event: Ne,
                      onError: pe,
                      container: me
                    })), ce;
                  }());
                }
              });
            }), Gr(ne, M, ge);
          }(f, j, _, z, N);
        }, Qa = function(R) {
          return Yr(R), W.then(function() {
            var N = Re, z = ae;
            if (N && z && yn) return Ye(yn).then(function(M) {
              return N.updateProps(M).catch(function(ne) {
                return bi(z).then(function(Y) {
                  if (!Y) throw ne;
                });
              });
            });
          });
        }, Ni = function(R) {
          return Rn ? Rn(R) : O.try(function() {
            return No(R);
          }).then(function(N) {
            return Wr(N) && (N = function z(M) {
              var ne = function(je) {
                var Ee = function(Me) {
                  for (; Me.parentNode; ) Me = Me.parentNode;
                  if (Wr(Me)) return Me;
                }(je);
                if (Ee && Ee.host) return Ee.host;
              }(M);
              if (!ne) throw new Error("Element is not in shadow dom");
              var Y = "shadow-slot-" + Ke(), we = document.createElement("slot");
              we.setAttribute("name", Y), M.appendChild(we);
              var me = document.createElement("div");
              return me.setAttribute("slot", Y), ne.appendChild(me), Wr(ne) ? z(me) : me;
            }(N)), sn = N, nr(N);
          });
        };
        return {
          init: function() {
            (function() {
              F.on(ye.RENDER, function() {
                return j.onRender();
              }), F.on(ye.PRERENDER, function() {
                return j.onPrerender();
              }), F.on(ye.DISPLAY, function() {
                return j.onDisplay();
              }), F.on(ye.RENDERED, function() {
                return j.onRendered();
              }), F.on(ye.PRERENDERED, function() {
                return j.onPrerendered();
              }), F.on(ye.CLOSE, function() {
                return j.onClose();
              }), F.on(ye.DESTROY, function() {
                return j.onDestroy();
              }), F.on(ye.RESIZE, function() {
                return j.onResize();
              }), F.on(ye.FOCUS, function() {
                return j.onFocus();
              }), F.on(ye.PROPS, function(R) {
                return j.onProps(R);
              }), F.on(ye.ERROR, function(R) {
                return j && j.onError ? j.onError(R) : Pe(R).then(function() {
                  setTimeout(function() {
                    throw R;
                  }, 1);
                });
              }), I.register(F.reset);
            })();
          },
          render: function(R) {
            var N = R.target, z = R.container, M = R.context, ne = R.rerender;
            return O.try(function() {
              var Y = kn(), we = S || kn();
              (function(G, Be, Ie) {
                if (G !== window) {
                  if (!$t(window, G)) throw new Error("Can only renderTo an adjacent frame");
                  var qe = H();
                  if (!tn(Be, qe) && !J(G)) throw new Error("Can not render remotely to " + Be.toString() + " - can only render to " + qe);
                  if (Ie && typeof Ie != "string") throw new Error("Container passed to renderTo must be a string selector, got " + typeof Ie + " }");
                }
              })(N, we, z);
              var me = O.try(function() {
                if (N !== window) return function(G, Be) {
                  for (var Ie = {}, qe = 0, nn = Object.keys(j); qe < nn.length; qe++) {
                    var De = nn[qe], fn = f[De];
                    fn && fn.allowDelegate && (Ie[De] = j[De]);
                  }
                  var Ge = pn(Be, "zoid_delegate_" + w, {
                    uid: n,
                    overrides: {
                      props: Ie,
                      event: F,
                      close: Nn,
                      onError: _t,
                      getInternalState: _e,
                      setInternalState: Ae,
                      resolveInitPromise: Le,
                      rejectInitPromise: Pe
                    }
                  }).then(function(Z) {
                    var X = Z.data.parent;
                    return I.register(function(D) {
                      if (!Se(Be)) return X.destroy(D);
                    }), X.getDelegateOverrides();
                  }).catch(function(Z) {
                    throw new Error(`Unable to delegate rendering. Possibly the component is not loaded in the target window.

` + it(Z));
                  });
                  return Rn = function() {
                    for (var Z = arguments.length, X = new Array(Z), D = 0; D < Z; D++) X[D] = arguments[D];
                    return Ge.then(function(ee) {
                      return ee.getProxyContainer.apply(ee, X);
                    });
                  }, jn = function() {
                    for (var Z = arguments.length, X = new Array(Z), D = 0; D < Z; D++) X[D] = arguments[D];
                    return Ge.then(function(ee) {
                      return ee.renderContainer.apply(ee, X);
                    });
                  }, Fn = function() {
                    for (var Z = arguments.length, X = new Array(Z), D = 0; D < Z; D++) X[D] = arguments[D];
                    return Ge.then(function(ee) {
                      return ee.show.apply(ee, X);
                    });
                  }, Ln = function() {
                    for (var Z = arguments.length, X = new Array(Z), D = 0; D < Z; D++) X[D] = arguments[D];
                    return Ge.then(function(ee) {
                      return ee.hide.apply(ee, X);
                    });
                  }, un = function() {
                    for (var Z = arguments.length, X = new Array(Z), D = 0; D < Z; D++) X[D] = arguments[D];
                    return Ge.then(function(ee) {
                      return ee.watchForUnload.apply(ee, X);
                    });
                  }, G === Te.IFRAME ? (vn = function() {
                    for (var Z = arguments.length, X = new Array(Z), D = 0; D < Z; D++) X[D] = arguments[D];
                    return Ge.then(function(ee) {
                      return ee.getProxyWindow.apply(ee, X);
                    });
                  }, Un = function() {
                    for (var Z = arguments.length, X = new Array(Z), D = 0; D < Z; D++) X[D] = arguments[D];
                    return Ge.then(function(ee) {
                      return ee.openFrame.apply(ee, X);
                    });
                  }, $n = function() {
                    for (var Z = arguments.length, X = new Array(Z), D = 0; D < Z; D++) X[D] = arguments[D];
                    return Ge.then(function(ee) {
                      return ee.openPrerenderFrame.apply(ee, X);
                    });
                  }, Xn = function() {
                    for (var Z = arguments.length, X = new Array(Z), D = 0; D < Z; D++) X[D] = arguments[D];
                    return Ge.then(function(ee) {
                      return ee.prerender.apply(ee, X);
                    });
                  }, Qn = function() {
                    for (var Z = arguments.length, X = new Array(Z), D = 0; D < Z; D++) X[D] = arguments[D];
                    return Ge.then(function(ee) {
                      return ee.open.apply(ee, X);
                    });
                  }, re = function() {
                    for (var Z = arguments.length, X = new Array(Z), D = 0; D < Z; D++) X[D] = arguments[D];
                    return Ge.then(function(ee) {
                      return ee.openPrerender.apply(ee, X);
                    });
                  }) : G === Te.POPUP && (Zn = function() {
                    for (var Z = arguments.length, X = new Array(Z), D = 0; D < Z; D++) X[D] = arguments[D];
                    return Ge.then(function(ee) {
                      return ee.setProxyWin.apply(ee, X);
                    });
                  }), Ge;
                }(M, N);
              }), je = j.window, Ee = Ei(), Me = vi(f, j, "post"), Ne = F.trigger(ye.RENDER), pe = Ni(z), xe = cn(), be = pe.then(function() {
                return Yr();
              }), en = be.then(function() {
                return vi(f, j, "get").then(function(G) {
                  return function(Be, Ie) {
                    var qe = Ie.query || {}, nn = Ie.hash || {}, De, fn, Ge = Be.split("#");
                    fn = Ge[1];
                    var Z = (De = Ge[0]).split("?");
                    De = Z[0];
                    var X = Co(Z[1], qe), D = Co(fn, nn);
                    return X && (De = De + "?" + X), D && (De = De + "#" + D), De;
                  }(yr(ut()), {
                    query: G
                  });
                });
              }), Ue = xe.then(function(G) {
                return function(Ie) {
                  var qe = Ie === void 0 ? {} : Ie, nn = qe.proxyWin, De = qe.initialChildDomain, fn = qe.childDomainMatch, Ge = qe.target, Z = Ge === void 0 ? window : Ge, X = qe.context;
                  return function(D) {
                    var ee = D === void 0 ? {} : D, Zr = ee.proxyWin, is = ee.childDomainMatch, as = ee.context;
                    return Ye(ee.initialChildDomain).then(function(ss) {
                      return {
                        uid: n,
                        context: as,
                        tag: g,
                        childDomainMatch: is,
                        version: "10_3_3",
                        props: ss,
                        exports: (Di = Zr, {
                          init: function(us) {
                            return or(this.origin, us);
                          },
                          close: Nn,
                          checkClose: function() {
                            return bi(Di);
                          },
                          resize: Dt,
                          onError: _t,
                          show: wn,
                          hide: Cn,
                          export: Oi
                        })
                      };
                      var Di;
                    });
                  }({
                    proxyWin: nn,
                    initialChildDomain: De,
                    childDomainMatch: fn,
                    context: X
                  }).then(function(D) {
                    var ee = ci({
                      data: D,
                      metaData: {
                        windowRef: It(Z, De, X, nn)
                      },
                      sender: {
                        domain: H(window)
                      },
                      receiver: {
                        win: nn,
                        domain: fn
                      },
                      passByReference: De === H()
                    }), Zr = ee.serializedData;
                    return I.register(ee.cleanReference), Zr;
                  });
                }({
                  proxyWin: (Be = {
                    proxyWin: G,
                    initialChildDomain: Y,
                    childDomainMatch: we,
                    target: N,
                    context: M
                  }).proxyWin,
                  initialChildDomain: Be.initialChildDomain,
                  childDomainMatch: Be.childDomainMatch,
                  target: Be.target,
                  context: Be.context
                }).then(function(Ie) {
                  return fi({
                    name: w,
                    serializedPayload: Ie
                  });
                });
                var Be;
              }), ce = Ue.then(function(G) {
                return ke(M, {
                  windowName: G
                });
              }), $e = Nt(M), Ze = O.hash({
                proxyContainer: pe,
                proxyFrame: ce,
                proxyPrerenderFrame: $e
              }).then(function(G) {
                return Ri(G.proxyContainer, {
                  context: M,
                  proxyFrame: G.proxyFrame,
                  proxyPrerenderFrame: G.proxyPrerenderFrame,
                  rerender: ne
                });
              }).then(function(G) {
                return G;
              }), Ve = O.hash({
                windowName: Ue,
                proxyFrame: ce,
                proxyWin: xe
              }).then(function(G) {
                var Be = G.proxyWin;
                return je ? Be : yi(M, {
                  windowName: G.windowName,
                  proxyWin: Be,
                  proxyFrame: G.proxyFrame
                });
              }), et = O.hash({
                proxyWin: Ve,
                proxyPrerenderFrame: $e
              }).then(function(G) {
                return xt(M, G.proxyWin, G.proxyPrerenderFrame);
              }), dn = Ve.then(function(G) {
                return ae = G, Qe(G);
              }), En = O.hash({
                proxyPrerenderWin: et,
                state: dn
              }).then(function(G) {
                return Ti(G.proxyPrerenderWin, {
                  context: M
                });
              }), xi = O.hash({
                proxyWin: Ve,
                windowName: Ue
              }).then(function(G) {
                if (je) return G.proxyWin.setName(G.windowName);
              }), ka = O.hash({
                body: Me
              }).then(function(G) {
                return t.method ? t.method : Object.keys(G.body).length ? "post" : "get";
              }), Ii = O.hash({
                proxyWin: Ve,
                windowUrl: en,
                body: Me,
                method: ka,
                windowName: xi,
                prerender: En
              }).then(function(G) {
                return G.proxyWin.setLocation(G.windowUrl, {
                  method: G.method,
                  body: G.body
                });
              }), es = Ve.then(function(G) {
                (function Be(Ie, qe) {
                  var nn = !1;
                  return I.register(function() {
                    nn = !0;
                  }), O.delay(2e3).then(function() {
                    return Ie.isClosed();
                  }).then(function(De) {
                    if (!nn) {
                      if (qe === Te.POPUP && De) return Nn(new Error("Detected popup close"));
                      var fn = !!(sn && st(sn));
                      return qe === Te.IFRAME && De && (fn || Mn) ? Nn(new Error("Detected iframe close")) : Be(Ie, qe);
                    }
                  });
                })(G, M);
              }), ns = O.hash({
                container: Ze,
                prerender: En
              }).then(function() {
                return F.trigger(ye.DISPLAY);
              }), ts = Ve.then(function(G) {
                return function(Be, Ie, qe) {
                  return O.try(function() {
                    return Be.awaitWindow();
                  }).then(function(nn) {
                    if (An && An.needsBridge({
                      win: nn,
                      domain: Ie
                    }) && !An.hasBridge(Ie, Ie)) {
                      var De = typeof t.bridgeUrl == "function" ? t.bridgeUrl({
                        props: j
                      }) : t.bridgeUrl;
                      if (!De) throw new Error("Bridge needed to render " + qe);
                      var fn = On(De);
                      return An.linkUrl(nn, Ie), An.openBridge(yr(De), fn);
                    }
                  });
                }(G, Y, M);
              }), rs = Ii.then(function() {
                return O.try(function() {
                  var G = j.timeout;
                  if (G) return W.timeout(G, new Error("Loading component timed out after " + G + " milliseconds"));
                });
              }), os = W.then(function() {
                return Mn = !0, F.trigger(ye.RENDERED);
              });
              return O.hash({
                initPromise: W,
                buildUrlPromise: en,
                onRenderPromise: Ne,
                getProxyContainerPromise: pe,
                openFramePromise: ce,
                openPrerenderFramePromise: $e,
                renderContainerPromise: Ze,
                openPromise: Ve,
                openPrerenderPromise: et,
                setStatePromise: dn,
                prerenderPromise: En,
                loadUrlPromise: Ii,
                buildWindowNamePromise: Ue,
                setWindowNamePromise: xi,
                watchForClosePromise: es,
                onDisplayPromise: ns,
                openBridgePromise: ts,
                runTimeoutPromise: rs,
                onRenderedPromise: os,
                delegatePromise: me,
                watchForUnloadPromise: Ee,
                finalSetPropsPromise: be
              });
            }).catch(function(Y) {
              return O.all([_t(Y), Wt(Y)]).then(function() {
                throw Y;
              }, function() {
                throw Y;
              });
            }).then(ge);
          },
          destroy: Wt,
          getProps: function() {
            return j;
          },
          setProps: Yr,
          export: Oi,
          getHelpers: Ci,
          getDelegateOverrides: function() {
            return O.try(function() {
              return {
                getProxyContainer: Ni,
                show: wn,
                hide: Cn,
                renderContainer: Ri,
                getProxyWindow: cn,
                watchForUnload: Ei,
                openFrame: ke,
                openPrerenderFrame: Nt,
                prerender: Ti,
                open: yi,
                openPrerender: xt,
                setProxyWin: Qe
              };
            });
          },
          getExports: function() {
            return x({
              getExports: function() {
                return Pi;
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
              var v = s.findDOMNode(this), g = t(at({}, this.props));
              g.render(v, Te.IFRAME), this.setState({
                parent: g
              });
            }, d.componentDidUpdate = function() {
              this.state && this.state.parent && this.state.parent.updateProps(at({}, this.props)).catch(ge);
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
              this.parent = t(T({}, (s = this.$attrs, Object.keys(s).reduce(function(u, f) {
                var d = s[f];
                return f === "style-object" || f === "styleObject" ? (u.style = d, u.styleObject = d) : f.includes("-") ? u[Tr(f)] = d : u[f] = d, u;
              }, {}))));
              var s;
              this.parent.render(i, Te.IFRAME);
            },
            watch: {
              $attrs: {
                handler: function() {
                  this.parent && this.$attrs && this.parent.updateProps(T({}, this.$attrs)).catch(ge);
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
              this.parent = t(T({}, (i = this.$attrs, Object.keys(i).reduce(function(s, u) {
                var f = i[u];
                return u === "style-object" || u === "styleObject" ? (s.style = f, s.styleObject = f) : u.includes("-") ? s[Tr(u)] = f : s[u] = f, s;
              }, {}))));
              var i;
              this.parent.render(o, Te.IFRAME);
            },
            watch: {
              $attrs: {
                handler: function() {
                  this.parent && this.$attrs && this.parent.updateProps(T({}, this.$attrs)).catch(ge);
                },
                deep: !0
              }
            }
          };
        }
      }, Va = {
        register: function(e, n, t, o) {
          return o.module(e, []).directive(Tr(e), function() {
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
                  return Jt(f.props, function(p) {
                    return typeof p == "function" ? function() {
                      var m = p.apply(this, arguments);
                      return v(), m;
                    } : p;
                  });
                }, w = t(g());
                w.render(d[0], Te.IFRAME), f.$watch(function() {
                  w.updateProps(g()).catch(ge);
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
              return Jt(T({}, this.internalProps, this.props), function(y) {
                if (typeof y == "function") {
                  var P = m.zone;
                  return function() {
                    var S = arguments, x = this;
                    return P.run(function() {
                      return y.apply(x, S);
                    });
                  };
                }
                return y;
              });
            }, p.ngOnInit = function() {
              var m = this.elementRef.nativeElement;
              this.parent = t(this.getProps()), this.parent.render(m, Te.IFRAME);
            }, p.ngDoCheck = function() {
              this.parent && !function(m, y) {
                var P = {};
                for (var S in m) if (m.hasOwnProperty(S) && (P[S] = !0, m[S] !== y[S]))
                  return !1;
                for (var x in y) if (!P[x]) return !1;
                return !0;
              }(this._props, this.props) && (this._props = T({}, this.props), this.parent.updateProps(this.getProps()));
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
        `)), g.appendChild(t), g.appendChild(o), g.appendChild(w), o.classList.add("zoid-visible"), t.classList.add("zoid-invisible"), u.on(ye.RENDERED, function() {
            o.classList.remove("zoid-visible"), o.classList.add("zoid-invisible"), t.classList.remove("zoid-invisible"), t.classList.add("zoid-visible"), setTimeout(function() {
              St(o);
            }, 1);
          }), u.on(ye.RESIZE, function(p) {
            var m = p.width, y = p.height;
            typeof m == "number" && (g.style.width = zo(m)), typeof y == "number" && (g.style.height = zo(y));
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
      var Jr = Kt(), Kr = Kt();
      function Ya(e) {
        var n = function(y) {
          var P = y.tag, S = y.url, x = y.domain, W = y.bridgeUrl, V = y.props, I = V === void 0 ? {} : V, L = y.dimensions, _ = L === void 0 ? {} : L, Q = y.autoResize, F = Q === void 0 ? {} : Q, se = y.allowedParentDomains, te = se === void 0 ? "*" : se, K = y.attributes, j = K === void 0 ? {} : K, ae = y.defaultContext, k = ae === void 0 ? Te.IFRAME : ae, Re = y.containerTemplate, yn = Re === void 0 ? Ja : Re, sn = y.prerenderTemplate, Mn = sn === void 0 ? Ka : sn, zn = y.validate, Rn = y.eligible, Fn = Rn === void 0 ? function() {
            return {
              eligible: !0
            };
          } : Rn, Ln = y.logger, Yn = Ln === void 0 ? {
            info: ge
          } : Ln, jn = y.exports, vn = jn === void 0 ? ge : jn, Zn = y.method, Un = y.children, $n = Un === void 0 ? function() {
            return {};
          } : Un, Xn = P.replace(/-/g, "_"), Qn = T({}, {
            window: {
              type: ve.OBJECT,
              sendToChild: !1,
              required: !1,
              allowDelegate: !0,
              validate: function(re) {
                var un = re.value;
                if (!Gn(un) && !an.isProxyWindow(un)) throw new Error("Expected Window or ProxyWindow");
                if (Gn(un)) {
                  if (Se(un)) throw new Error("Window is closed");
                  if (!J(un)) throw new Error("Window is not same domain");
                }
              },
              decorate: function(re) {
                return Rt(re.value);
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
              default: Tn,
              decorate: Kn
            },
            onRendered: {
              type: ve.FUNCTION,
              required: !1,
              sendToChild: !1,
              default: Tn,
              decorate: Kn
            },
            onRender: {
              type: ve.FUNCTION,
              required: !1,
              sendToChild: !1,
              default: Tn,
              decorate: Kn
            },
            onPrerendered: {
              type: ve.FUNCTION,
              required: !1,
              sendToChild: !1,
              default: Tn,
              decorate: Kn
            },
            onPrerender: {
              type: ve.FUNCTION,
              required: !1,
              sendToChild: !1,
              default: Tn,
              decorate: Kn
            },
            onClose: {
              type: ve.FUNCTION,
              required: !1,
              sendToChild: !1,
              allowDelegate: !0,
              default: Tn,
              decorate: Kn
            },
            onDestroy: {
              type: ve.FUNCTION,
              required: !1,
              sendToChild: !1,
              allowDelegate: !0,
              default: Tn,
              decorate: Kn
            },
            onResize: {
              type: ve.FUNCTION,
              required: !1,
              sendToChild: !1,
              allowDelegate: !0,
              default: Tn
            },
            onFocus: {
              type: ve.FUNCTION,
              required: !1,
              sendToChild: !1,
              allowDelegate: !0,
              default: Tn
            },
            close: {
              type: ve.FUNCTION,
              required: !1,
              sendToChild: !1,
              childDecorate: function(re) {
                return re.close;
              }
            },
            focus: {
              type: ve.FUNCTION,
              required: !1,
              sendToChild: !1,
              childDecorate: function(re) {
                return re.focus;
              }
            },
            resize: {
              type: ve.FUNCTION,
              required: !1,
              sendToChild: !1,
              childDecorate: function(re) {
                return re.resize;
              }
            },
            uid: {
              type: ve.STRING,
              required: !1,
              sendToChild: !1,
              childDecorate: function(re) {
                return re.uid;
              }
            },
            tag: {
              type: ve.STRING,
              required: !1,
              sendToChild: !1,
              childDecorate: function(re) {
                return re.tag;
              }
            },
            getParent: {
              type: ve.FUNCTION,
              required: !1,
              sendToChild: !1,
              childDecorate: function(re) {
                return re.getParent;
              }
            },
            getParentDomain: {
              type: ve.FUNCTION,
              required: !1,
              sendToChild: !1,
              childDecorate: function(re) {
                return re.getParentDomain;
              }
            },
            show: {
              type: ve.FUNCTION,
              required: !1,
              sendToChild: !1,
              childDecorate: function(re) {
                return re.show;
              }
            },
            hide: {
              type: ve.FUNCTION,
              required: !1,
              sendToChild: !1,
              childDecorate: function(re) {
                return re.hide;
              }
            },
            export: {
              type: ve.FUNCTION,
              required: !1,
              sendToChild: !1,
              childDecorate: function(re) {
                return re.export;
              }
            },
            onError: {
              type: ve.FUNCTION,
              required: !1,
              sendToChild: !1,
              childDecorate: function(re) {
                return re.onError;
              }
            },
            onProps: {
              type: ve.FUNCTION,
              required: !1,
              sendToChild: !1,
              childDecorate: function(re) {
                return re.onProps;
              }
            },
            getSiblings: {
              type: ve.FUNCTION,
              required: !1,
              sendToChild: !1,
              childDecorate: function(re) {
                return re.getSiblings;
              }
            }
          }, I);
          if (!yn) throw new Error("Container template required");
          return {
            name: Xn,
            tag: P,
            url: S,
            domain: x,
            bridgeUrl: W,
            method: Zn,
            propsDef: Qn,
            dimensions: _,
            autoResize: F,
            allowedParentDomains: te,
            attributes: j,
            defaultContext: k,
            containerTemplate: yn,
            prerenderTemplate: Mn,
            validate: zn,
            logger: Yn,
            eligible: Fn,
            children: $n,
            exports: typeof vn == "function" ? vn : function(re) {
              for (var un = re.getExports, ie = {}, Fe = function() {
                var Pe = Le[Ce], Ye = vn[Pe].type, _e = un().then(function(Ae) {
                  return Ae[Pe];
                });
                ie[Pe] = Ye === ve.FUNCTION ? function() {
                  for (var Ae = arguments.length, cn = new Array(Ae), Qe = 0; Qe < Ae; Qe++) cn[Qe] = arguments[Qe];
                  return _e.then(function(wn) {
                    return wn.apply(void 0, cn);
                  });
                } : _e;
              }, Ce = 0, Le = Object.keys(vn); Ce < Le.length; Ce++) Fe();
              return ie;
            }
          };
        }(e), t = n.name, o = n.tag, i = n.defaultContext, s = n.propsDef, u = n.eligible, f = n.children, d = Ct(window), v = {}, g = [], w = function() {
          if (function(P) {
            try {
              return Vr(window.name).name === P;
            } catch {
            }
            return !1;
          }(t)) {
            var y = li().payload;
            if (y.tag === o && tn(y.childDomainMatch, H())) return !0;
          }
          return !1;
        }, p = Wn(function() {
          if (w()) {
            if (window.xprops)
              throw delete d.components[o], new Error("Can not register " + t + " as child - child already registered");
            var y = function(P) {
              var S = P.tag, x = P.propsDef, W = P.autoResize, V = P.allowedParentDomains, I = [], L = li(), _ = L.parent, Q = L.payload, F = _.win, se = _.domain, te, K = new O(), j = Q.version, ae = Q.uid, k = Q.exports, Re = Q.context, yn = Q.props;
              if (!function(ie, Fe) {
                if (!/_/.test(ie) || !/_/.test("10_3_3")) throw new Error("Versions are in an invalid format (" + ie + ", 10_3_3)");
                return ie.split("_")[0] === "10_3_3".split("_")[0];
              }(j)) throw new Error("Parent window has zoid version " + j + ", child window has version 10_3_3");
              var sn = k.show, Mn = k.hide, zn = k.close, Rn = k.onError, Fn = k.checkClose, Ln = k.export, Yn = k.resize, jn = k.init, vn = function() {
                return F;
              }, Zn = function() {
                return se;
              }, Un = function(ie) {
                return I.push(ie), {
                  cancel: function() {
                    I.splice(I.indexOf(ie), 1);
                  }
                };
              }, $n = function(ie) {
                return Yn.fireAndForget({
                  width: ie.width,
                  height: ie.height
                });
              }, Xn = function(ie) {
                return K.resolve(ie), Ln(ie);
              }, Qn = function(ie) {
                var Fe = (ie === void 0 ? {} : ie).anyParent, Ce = [], Le = te.parent;
                if (Fe === void 0 && (Fe = !Le), !Fe && !Le) throw new Error("No parent found for " + S + " child");
                for (var Pe = 0, Ye = In(window); Pe < Ye.length; Pe++) {
                  var _e = Ye[Pe];
                  if (J(_e)) {
                    var Ae = de(_e).xprops;
                    if (Ae && vn() === Ae.getParent()) {
                      var cn = Ae.parent;
                      if (Fe || !Le || cn && cn.uid === Le.uid) {
                        var Qe = ui(_e, function(wn) {
                          return wn.exports;
                        });
                        Ce.push({
                          props: Ae,
                          exports: Qe
                        });
                      }
                    }
                  }
                }
                return Ce;
              }, re = function(ie, Fe, Ce) {
                Ce === void 0 && (Ce = !1);
                var Le = function(Ye, _e, Ae, cn, Qe, wn) {
                  wn === void 0 && (wn = !1);
                  for (var Cn = {}, ut = 0, ct = Object.keys(Ae); ut < ct.length; ut++) {
                    var kn = ct[ut], ke = _e[kn], Nt = ke && ke.trustedDomains && ke.trustedDomains.length > 0 ? ke.trustedDomains.reduce(function(or, Dt) {
                      return or || tn(Dt, H(window));
                    }, !1) : cn === H(window) || J(Ye);
                    if ((!ke || !ke.sameDomain || Nt) && (!ke || !ke.trustedDomains || Nt)) {
                      var xt = hi(_e, 0, kn, Ae[kn], Qe);
                      Cn[kn] = xt, ke && ke.alias && !Cn[ke.alias] && (Cn[ke.alias] = xt);
                    }
                  }
                  if (!wn) for (var dt = 0, rr = Object.keys(_e); dt < rr.length; dt++) {
                    var It = rr[dt];
                    Ae.hasOwnProperty(It) || (Cn[It] = hi(_e, 0, It, void 0, Qe));
                  }
                  return Cn;
                }(F, x, ie, Fe, {
                  tag: S,
                  show: sn,
                  hide: Mn,
                  close: zn,
                  focus: $a,
                  onError: Rn,
                  resize: $n,
                  getSiblings: Qn,
                  onProps: Un,
                  getParent: vn,
                  getParentDomain: Zn,
                  uid: ae,
                  export: Xn
                }, Ce);
                te ? at(te, Le) : te = Le;
                for (var Pe = 0; Pe < I.length; Pe++) (0, I[Pe])(te);
              }, un = function(ie) {
                return O.try(function() {
                  return re(ie, se, !0);
                });
              };
              return {
                init: function() {
                  return O.try(function() {
                    var ie = "";
                    return J(F) && (ie = function(Fe) {
                      var Ce = Fe.componentName, Le = Fe.parentComponentWindow, Pe = di({
                        data: Vr(window.name).serializedInitialPayload,
                        sender: {
                          win: Le
                        },
                        basic: !0
                      }), Ye = Pe.sender;
                      if (Pe.reference.type === "uid" || Pe.metaData.windowRef.type === "global") {
                        var _e = fi({
                          name: Ce,
                          serializedPayload: ci({
                            data: Pe.data,
                            metaData: {
                              windowRef: Ua(Le)
                            },
                            sender: {
                              domain: Ye.domain
                            },
                            receiver: {
                              win: window,
                              domain: H()
                            },
                            basic: !0
                          }).serializedData
                        });
                        return window.name = _e, _e;
                      }
                    }({
                      componentName: P.name,
                      parentComponentWindow: F
                    }) || ""), Ct(window).exports = P.exports({
                      getExports: function() {
                        return K;
                      }
                    }), function(Fe, Ce) {
                      if (!tn(Fe, Ce)) throw new Error("Can not be rendered by domain: " + Ce);
                    }(V, se), qo(F), function() {
                      window.addEventListener("beforeunload", function() {
                        Fn.fireAndForget();
                      }), window.addEventListener("unload", function() {
                        Fn.fireAndForget();
                      }), po(F, function() {
                        pi();
                      });
                    }(), jn({
                      name: ie,
                      updateProps: un,
                      close: pi
                    });
                  }).then(function() {
                    return (ie = W.width, Fe = ie !== void 0 && ie, Ce = W.height, Le = Ce !== void 0 && Ce, Pe = W.element, No(Pe === void 0 ? "body" : Pe).catch(ge).then(function(Ye) {
                      return {
                        width: Fe,
                        height: Le,
                        element: Ye
                      };
                    })).then(function(Ye) {
                      var _e = Ye.width, Ae = Ye.height, cn = Ye.element;
                      cn && (_e || Ae) && Re !== Te.POPUP && _o(cn, function(Qe) {
                        $n({
                          width: _e ? Qe.width : void 0,
                          height: Ae ? Qe.height : void 0
                        });
                      }, {
                        width: _e,
                        height: Ae
                      });
                    });
                    var ie, Fe, Ce, Le, Pe;
                  }).catch(function(ie) {
                    Rn(ie);
                  });
                },
                getProps: function() {
                  return te || (re(yn, se), te);
                }
              };
            }(n);
            return y.init(), y;
          }
        }), m = function y(P) {
          var S, x = "zoid-" + o + "-" + Ke(), W = P || {}, V = u({
            props: W
          }), I = V.eligible, L = V.reason, _ = W.onDestroy;
          W.onDestroy = function() {
            if (S && I && g.splice(g.indexOf(S), 1), _) return _.apply(void 0, arguments);
          };
          var Q = wi({
            uid: x,
            options: n
          });
          Q.init(), I ? Q.setProps(W) : W.onDestroy && W.onDestroy(), Jr.register(function(te) {
            return Q.destroy(te || new Error("zoid destroyed all components"));
          });
          var F = function(te) {
            var K = (te === void 0 ? {} : te).decorate;
            return y((K === void 0 ? Ra : K)(W));
          }, se = function(te, K, j) {
            return O.try(function() {
              if (!I) {
                var ae = new Error(L || t + " component is not eligible");
                return Q.destroy(ae).then(function() {
                  throw ae;
                });
              }
              if (!Gn(te)) throw new Error("Must pass window to renderTo");
              return function(k, Re) {
                return O.try(function() {
                  if (k.window) return Rt(k.window).getType();
                  if (Re) {
                    if (Re !== Te.IFRAME && Re !== Te.POPUP) throw new Error("Unrecognized context: " + Re);
                    return Re;
                  }
                  return i;
                });
              }(W, j);
            }).then(function(ae) {
              if (K = function(k, Re) {
                if (Re) {
                  if (typeof Re != "string" && !Er(Re)) throw new TypeError("Expected string or element selector to be passed");
                  return Re;
                }
                if (k === Te.POPUP) return "body";
                throw new Error("Expected element to be passed to render iframe");
              }(ae, K), te !== window && typeof K != "string") throw new Error("Must pass string element when rendering to another window");
              return Q.render({
                target: te,
                container: K,
                context: ae,
                rerender: function() {
                  var k = F();
                  return at(S, k), k.renderTo(te, K, j);
                }
              });
            }).catch(function(ae) {
              return Q.destroy(ae).then(function() {
                throw ae;
              });
            });
          };
          return S = T({}, Q.getExports(), Q.getHelpers(), function() {
            for (var te = f(), K = {}, j = function() {
              var Re = k[ae], yn = te[Re];
              K[Re] = function(sn) {
                var Mn = Q.getProps(), zn = T({}, sn, {
                  parent: {
                    uid: x,
                    props: Mn,
                    export: Q.export
                  }
                });
                return yn(zn);
              };
            }, ae = 0, k = Object.keys(te); ae < k.length; ae++) j();
            return K;
          }(), {
            isEligible: function() {
              return I;
            },
            clone: F,
            render: function(te, K) {
              return se(window, te, K);
            },
            renderTo: function(te, K, j) {
              return se(te, K, j);
            }
          }), I && g.push(S), S;
        };
        if (p(), function() {
          var y = Sn("zoid_allow_delegate_" + t, function() {
            return !0;
          }), P = Sn("zoid_delegate_" + t, function(S) {
            var x = S.data;
            return {
              parent: wi({
                uid: x.uid,
                options: n,
                overrides: x.overrides,
                parentWin: S.source
              })
            };
          });
          Kr.register(y.cancel), Kr.register(P.cancel);
        }(), d.components = d.components || {}, d.components[o]) throw new Error("Can not register multiple components with the same tag: " + o);
        return d.components[o] = !0, {
          init: m,
          instances: g,
          driver: function(y, P) {
            var S = {
              react: Ba,
              angular: Va,
              vue: qa,
              vue3: Ha,
              angular2: Ga
            };
            if (!S[y]) throw new Error("Could not find driver for framework: " + y);
            return v[y] || (v[y] = S[y].register(o, s, m, P)), v[y];
          },
          isChild: w,
          canRenderTo: function(y) {
            return pn(y, "zoid_allow_delegate_" + t).then(function(P) {
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
            on: Sn,
            send: pn
          }).on, u = i.send, (f = gn()).receiveMessage = f.receiveMessage || function(d) {
            return qr(d, {
              on: s,
              send: u
            });
          }, function(d) {
            var v = d.on, g = d.send;
            he().getOrSet("postMessageListener", function() {
              return Do(window, "message", function(w) {
                (function(p, m) {
                  var y = m.on, P = m.send;
                  O.try(function() {
                    var S = p.source || p.sourceElement, x = p.origin || p.originalEvent && p.originalEvent.origin, W = p.data;
                    if (x === "null" && (x = "file://"), S) {
                      if (!x) throw new Error("Post message did not have origin domain");
                      qr({
                        source: S,
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
            on: Sn,
            send: pn
          }), Xo({
            on: Sn,
            send: pn,
            receiveMessage: qr
          }), function(d) {
            var v = d.on, g = d.send;
            he("builtinListeners").getOrSet("helloListener", function() {
              var w = v("postrobot_hello", {
                domain: "*"
              }, function(m) {
                return Uo(m.source, {
                  domain: m.origin
                }), {
                  instanceID: jo()
                };
              }), p = Et();
              return p && Ar(p, {
                send: g
              }).catch(function(m) {
              }), w;
            });
          }({
            on: Sn,
            send: pn
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
      function mi(e) {
        An && An.destroyBridges();
        var n = Jr.all(e);
        return Jr = Kt(), n;
      }
      var gi = mi;
      function Xa(e) {
        return gi(), delete window.__zoid_10_3_3__, function() {
          (function() {
            for (var t = he("responseListeners"), o = 0, i = t.keys(); o < i.length; o++) {
              var s = i[o], u = t.get(s);
              u && (u.cancelled = !0), t.del(s);
            }
          })(), (n = he().get("postMessageListener")) && n.cancel();
          var n;
          delete window.__post_robot_11_0_0__;
        }(), Kr.all(e);
      }
    }]);
  });
})(ba);
var Pa = ba.exports;
const Hi = Pa.EVENT, ft = {
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
  const { width: T, height: U } = C, { top: $ = 0, left: b = 0 } = l;
  if (!a || !c)
    return;
  const B = h.createElement("div");
  B.setAttribute("id", r);
  const A = h.createElement("style");
  return l.cspNonce && A.setAttribute("nonce", l.cspNonce), A.appendChild(
    h.createTextNode(`
          #${r} {
              display: inline-block;
              position: absolute;
              width: ${T};
              height: ${U};
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

          #${r} > iframe.${ft.INVISIBLE} {
              opacity: 0;
          }

          #${r} > iframe.${ft.VISIBLE} {
              opacity: 1;
        }
      `)
  ), B.appendChild(a), B.appendChild(c), B.appendChild(A), c.classList.add(ft.INVISIBLE), a.classList.add(ft.INVISIBLE), E.on(Hi.RENDERED, () => {
    setTimeout(() => {
      a.classList.remove(ft.INVISIBLE), a.classList.add(ft.VISIBLE);
    }, 100), setTimeout(() => {
      c.remove();
    }, 1);
  }), E.on(Hi.RESIZE, ({ width: q, height: le }) => {
    typeof q == "number" && (B.style.width = `${q}px`), typeof le == "number" && (B.style.height = `${le}px`);
  }), B;
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
function Xu({ video: r, adContainer: a, trackingUrl: c, interval: h, startSession: l }) {
  const E = bn(0);
  r.addEventListener("timeupdate", () => {
    E.value = r.currentTime;
  }), bn({}), bn(), bn(h || 1e3), bn();
  const C = Gu(), T = bn(!1), U = bn(), $ = Math.random().toString(36).slice(6);
  function b({ icons: Oe }) {
    return {
      id: $,
      appConfig: {
        sdkBaseUrl: Ji("https://cdn.jsdelivr.net/gh/sigmaott/sigma-ssai-web-sdk/build/dist/wta/index.html", { id: $ })
      },
      icons: Oe
    };
  }
  const B = Zu(b({
    icons: []
  }));
  B.render(a), B.hide(), a.style.display = "none", Ou(() => {
    var Oe;
    if (U.value) {
      const oe = ((Oe = U.value) == null ? void 0 : Oe.icons) || [];
      a.style.display = "block", B.updateProps(b({
        icons: oe
      })), B.show();
    } else
      a.style.display = "none", B.hide();
  });
  const A = bn([]), q = bn(), le = bn([]);
  async function ze(Oe) {
    var ue;
    const oe = (ue = U.value) == null ? void 0 : ue.trackingEvents.find((He) => He.eventType === Oe);
    oe && (C.trigger(oe), await Promise.all(oe.beaconUrls.map((He) => qn(At(He)))));
  }
  function O() {
    return T.value = !1, ["fullscreenchange", "webkitfullscreenchange", "mozfullscreenchange", "msfullscreenchange"].forEach((Oe) => {
      r.addEventListener(Oe, () => {
        const oe = document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement;
        ze(oe ? "fullscreen" : "exitFullscreen");
      });
    }), r.addEventListener("pause", () => {
      ze("pause");
    }), r.addEventListener("play", () => {
      ze("resume");
    }), r.addEventListener("rewind", () => {
      ze("rewind");
    }), r.addEventListener("mute", () => {
      ze("mute");
    }), r.addEventListener("unmute", () => {
      ze("unmute");
    }), async (Oe, oe) => {
      if (q.value = oe.frag.sn, !Oe !== window.Hls.Events.FRAG_CHANGED) {
        for (const ue of A.value)
          if (ue.sn === oe.frag.sn)
            for (const We of le.value) {
              if (We.tracked)
                continue;
              U.value = We, l(We.adVerifications, C);
              const H = We.trackingEvents.find((J) => J.eventType === ue.value.event);
              H && lu(async () => {
                if (ue.value.event === "start") {
                  const J = We.trackingEvents.find((de) => de.eventType === "impression");
                  J && (C.trigger(J), await Promise.all(J.beaconUrls.map((de) => qn(At(de)))));
                }
                C.trigger(H), await Promise.all(H.beaconUrls.map((J) => qn(At(J)))), ue.value.event === "complete" && (U.value = void 0, A.value = [], We.tracked = !0);
              }, ue.time * 1e3);
            }
      }
    };
  }
  function hn() {
    qn(Qi(c)).then(({ data: Oe, error: oe }) => {
      if (oe) {
        console.error("Cannot get tracking data", oe);
        return;
      }
      for (const ue of (Oe == null ? void 0 : Oe.avails) || [])
        for (const He of ue.ads) {
          const We = `${ue.id}_${He.id}_${He.startTimeInSeconds}`;
          le.value.find((J) => J.key === We) || le.value.push({
            ...He,
            key: We,
            tracked: !1
          });
        }
    });
  }
  function ot() {
    return async (Oe, oe) => {
      function ue(H) {
        for (let J = 0; J < H.length; J++)
          if (H[J] === 0)
            return J;
        return H.length;
      }
      const { start: He, sn: We } = oe.frag;
      for (let H = 0; H < oe.samples.length; H++) {
        const J = oe.samples[H], de = J.data, xn = J.pts;
        if (String.fromCharCode.apply(null, de.slice(0, 3)) !== "ID3" || String.fromCharCode.apply(null, de.slice(10, 14)) !== "TXXX")
          continue;
        const mn = de.slice(21, de.length), In = ue(mn), Dn = mn.slice(In + 1, mn.length), gt = ue(Dn), Se = new TextDecoder("utf-8").decode(Dn.slice(0, gt)), yt = {
          sn: We,
          time: xn - He,
          value: Qr(Se)
        };
        if (q.value && We < q.value)
          return;
        A.value.push(yt), yt.value.event === "start" && hn();
      }
    };
  }
  function Pn() {
    U.value = void 0, A.value = [], C.off(() => {
    });
  }
  function Lt(Oe) {
    Oe.textTracks().on("addtrack", (oe) => {
      const ue = oe.track;
      ue.kind === "metadata" && (hn(), ue.on("cuechange", async () => {
        const He = ue.activeCues[0];
        if (He && He.value.data) {
          const We = Qr(He.value.data);
          for (const H of le.value) {
            if (H.tracked)
              continue;
            U.value = H, l(H.adVerifications, C);
            const J = H.trackingEvents.find((de) => de.eventType === We.event);
            if (J) {
              if (We.event === "start") {
                const de = H.trackingEvents.find((xn) => xn.eventType === "impression");
                de && (C.trigger(de), await Promise.all(de.beaconUrls.map((xn) => qn(At(xn)))));
              }
              C.trigger(J), await Promise.all(J.beaconUrls.map((de) => qn(At(de)))), We.event === "complete" && (U.value = void 0);
            }
          }
        }
      }));
    });
  }
  function jt(Oe, oe) {
    C.on((ue) => {
      (Oe === "*" || ue.eventType === Oe) && oe(ue);
    });
  }
  return {
    destroy: Pn,
    hlsHelper: {
      createHlsFragChanged: O,
      createHlsFragParsingMetadata: ot
    },
    onEventTracking: jt,
    attachVideojs: Lt
  };
}
async function Qu({ video: r, adContainer: a, url: c }) {
  const h = Yi(c), l = await fs(), E = await ls(l, r);
  if (!E)
    throw console.error("nonce is null"), new Error("nonce is null");
  const C = `${h.protocol}//${h.host}`, { data: T, error: U } = await qn(Qi(`${C}${h.pathname}`, {
    params: { "play_params.nonce": E }
  }));
  if (U || !T)
    throw console.error(U), new Error(U);
  const $ = `${C}${T.manifestUrl}`, b = `${C}${T.trackingUrl}`;
  function B() {
  }
  const { hlsHelper: A, onEventTracking: q, destroy: le, attachVideojs: ze } = Xu({ video: r, adContainer: a, trackingUrl: b, startSession: B });
  function O(hn) {
    hn.on("hlsFragChanged", A.createHlsFragChanged()), hn.on("hlsFragParsingMetadata", A.createHlsFragParsingMetadata());
  }
  return {
    manifestUrl: $,
    onEventTracking: q,
    destroy: le,
    sigmaPlayer: {
      attachVideojs: ze,
      attachHls: O
    }
  };
}
export {
  ls as createPal,
  Qu as createSigmaDai,
  fs as loadPalSdk
};
