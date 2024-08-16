function us(t) {
  return new Promise((a, c) => {
    const h = document.createElement("script");
    h.async = !0, h.src = t, h.onload = a, h.onerror = c, document.body.appendChild(h);
  });
}
const cs = "https://imasdk.googleapis.com/pal/sdkloader/pal.js";
let hr = null;
function Ii() {
  hr = null;
}
function ds() {
  const t = window;
  return t.goog && t.goog.pal ? Promise.resolve(t.goog.pal) : hr || (hr = us(cs).then(() => t.goog.pal), hr.then(Ii).catch(Ii), hr);
}
async function ft(t) {
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
function fs(t, a) {
  let c, h, l, C = !1;
  function O() {
    return !0;
  }
  function V() {
    a.addEventListener("mousedown", (ye) => void b(ye)), a.addEventListener("touchstart", (ye) => void b(ye)), a.addEventListener("play", () => {
      C || ($(), C = !0);
    }), a.addEventListener("ended", () => void M()), a.addEventListener("error", () => {
      console.log(`Video error: ${a.error.message}`), M();
    });
    const B = new t.ConsentSettings();
    return B.allowStorage = O(), c = new t.NonceLoader(), F();
  }
  async function F() {
    const B = new t.NonceRequest();
    B.adWillAutoPlay = !0, B.adWillPlayMuted = !0, B.continuousPlayback = !1, B.descriptionUrl = "https://example.com", B.iconsSupported = !0, B.playerType = "Sample Player Type", B.playerVersion = "1.0", B.ppid = "Sample PPID", B.sessionId = "Sample SID", B.supportedApiFrameworks = "2,7,9", B.url = "https://developers.google.com/ad-manager/pal/html5", B.videoHeight = 480, B.videoWidth = 640, h = c.loadNonceManager(B);
    const { data: ye, error: fn } = await ft(h);
    return fn ? (console.log(`Error generating nonce: ${fn}`), null) : (l = ye, l.getNonce());
  }
  function b(B) {
    l && l.sendTouch(B);
  }
  function $() {
    l && l.sendPlaybackStart();
  }
  function M() {
    l && l.sendPlaybackEnd();
  }
  return V();
}
const ls = /"(?:_|\\u0{2}5[Ff]){2}(?:p|\\u0{2}70)(?:r|\\u0{2}72)(?:o|\\u0{2}6[Ff])(?:t|\\u0{2}74)(?:o|\\u0{2}6[Ff])(?:_|\\u0{2}5[Ff]){2}"\s*:/, hs = /"(?:c|\\u0063)(?:o|\\u006[Ff])(?:n|\\u006[Ee])(?:s|\\u0073)(?:t|\\u0074)(?:r|\\u0072)(?:u|\\u0075)(?:c|\\u0063)(?:t|\\u0074)(?:o|\\u006[Ff])(?:r|\\u0072)"\s*:/, ps = /^\s*["[{]|^\s*-?\d{1,16}(\.\d{1,17})?([Ee][+-]?\d+)?\s*$/;
function vs(t, a) {
  if (t === "__proto__" || t === "constructor" && a && typeof a == "object" && "prototype" in a) {
    ws(t);
    return;
  }
  return a;
}
function ws(t) {
  console.warn(`[destr] Dropping "${t}" key to prevent prototype pollution.`);
}
function qi(t, a = {}) {
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
  if (!ps.test(t)) {
    if (a.strict)
      throw new SyntaxError("[destr] Invalid JSON");
    return t;
  }
  try {
    if (ls.test(t) || hs.test(t)) {
      if (a.strict)
        throw new Error("[destr] Possible prototype pollution");
      return JSON.parse(t, vs);
    }
    return JSON.parse(t);
  } catch (h) {
    if (a.strict)
      throw h;
    return t;
  }
}
const ms = /#/g, gs = /&/g, ys = /\//g, Es = /=/g, oo = /\+/g, bs = /%5e/gi, Ps = /%60/gi, Os = /%7c/gi, Ss = /%20/gi;
function Rs(t) {
  return encodeURI("" + t).replace(Os, "|");
}
function Qt(t) {
  return Rs(typeof t == "string" ? t : JSON.stringify(t)).replace(oo, "%2B").replace(Ss, "+").replace(ms, "%23").replace(gs, "%26").replace(Ps, "`").replace(bs, "^").replace(ys, "%2F");
}
function Xt(t) {
  return Qt(t).replace(Es, "%3D");
}
function Hi(t = "") {
  try {
    return decodeURIComponent("" + t);
  } catch {
    return "" + t;
  }
}
function Ts(t) {
  return Hi(t.replace(oo, " "));
}
function Cs(t) {
  return Hi(t.replace(oo, " "));
}
function Ns(t = "") {
  const a = {};
  t[0] === "?" && (t = t.slice(1));
  for (const c of t.split("&")) {
    const h = c.match(/([^=]+)=?(.*)/) || [];
    if (h.length < 2)
      continue;
    const l = Ts(h[1]);
    if (l === "__proto__" || l === "constructor")
      continue;
    const E = Cs(h[2] || "");
    a[l] === void 0 ? a[l] = E : Array.isArray(a[l]) ? a[l].push(E) : a[l] = [a[l], E];
  }
  return a;
}
function xs(t, a) {
  return (typeof a == "number" || typeof a == "boolean") && (a = String(a)), a ? Array.isArray(a) ? a.map((c) => `${Xt(t)}=${Qt(c)}`).join("&") : `${Xt(t)}=${Qt(a)}` : Xt(t);
}
function Is(t) {
  return Object.keys(t).filter((a) => t[a] !== void 0).map((a) => xs(a, t[a])).filter(Boolean).join("&");
}
const Ds = /^[\s\w\0+.-]{2,}:([/\\]{1,2})/, Ws = /^[\s\w\0+.-]{2,}:([/\\]{2})?/, _s = /^([/\\]\s*){2,}[^/\\]/, As = /^\.?\//;
function Vi(t, a = {}) {
  return typeof a == "boolean" && (a = { acceptRelative: a }), a.strict ? Ds.test(t) : Ws.test(t) || (a.acceptRelative ? _s.test(t) : !1);
}
function Ms(t = "", a) {
  return t.endsWith("/");
}
function zs(t = "", a) {
  return (Ms(t) ? t.slice(0, -1) : t) || "/";
}
function Fs(t = "", a) {
  return t.endsWith("/") ? t : t + "/";
}
function Ls(t, a) {
  if (Us(a) || Vi(t))
    return t;
  const c = zs(a);
  return t.startsWith(c) ? t : Gi(c, t);
}
function js(t, a) {
  const c = Ki(t), h = { ...Ns(c.search), ...a };
  return c.search = Is(h), Bs(c);
}
function Us(t) {
  return !t || t === "/";
}
function $s(t) {
  return t && t !== "/";
}
function Gi(t, ...a) {
  let c = t || "";
  for (const h of a.filter((l) => $s(l)))
    if (c) {
      const l = h.replace(As, "");
      c = Fs(c) + l;
    } else
      c = h;
  return c;
}
const Ji = Symbol.for("ufo:protocolRelative");
function Ki(t = "", a) {
  const c = t.match(
    /^[\s\0]*(blob:|data:|javascript:|vbscript:)(.*)/i
  );
  if (c) {
    const [, $, M = ""] = c;
    return {
      protocol: $.toLowerCase(),
      pathname: M,
      href: $ + M,
      auth: "",
      host: "",
      search: "",
      hash: ""
    };
  }
  if (!Vi(t, { acceptRelative: !0 }))
    return Di(t);
  const [, h = "", l, E = ""] = t.replace(/\\/g, "/").match(/^[\s\0]*([\w+.-]{2,}:)?\/\/([^/@]+@)?(.*)/) || [], [, C = "", O = ""] = E.match(/([^#/?]*)(.*)?/) || [], { pathname: V, search: F, hash: b } = Di(
    O.replace(/\/(?=[A-Za-z]:)/, "")
  );
  return {
    protocol: h.toLowerCase(),
    auth: l ? l.slice(0, Math.max(0, l.length - 1)) : "",
    host: C,
    pathname: V,
    search: F,
    hash: b,
    [Ji]: !h
  };
}
function Di(t = "") {
  const [a = "", c = "", h = ""] = (t.match(/([^#?]*)(\?[^#]*)?(#.*)?/) || []).splice(1);
  return {
    pathname: a,
    search: c,
    hash: h
  };
}
function Bs(t) {
  const a = t.pathname || "", c = t.search ? (t.search.startsWith("?") ? "" : "?") + t.search : "", h = t.hash || "", l = t.auth ? t.auth + "@" : "", E = t.host || "";
  return (t.protocol || t[Ji] ? (t.protocol || "") + "//" : "") + l + E + a + c + h;
}
class qs extends Error {
  constructor(a, c) {
    super(a, c), this.name = "FetchError", c != null && c.cause && !this.cause && (this.cause = c.cause);
  }
}
function Hs(t) {
  var V, F, b, $, M;
  const a = ((V = t.error) == null ? void 0 : V.message) || ((F = t.error) == null ? void 0 : F.toString()) || "", c = ((b = t.request) == null ? void 0 : b.method) || (($ = t.options) == null ? void 0 : $.method) || "GET", h = ((M = t.request) == null ? void 0 : M.url) || String(t.request) || "/", l = `[${c}] ${JSON.stringify(h)}`, E = t.response ? `${t.response.status} ${t.response.statusText}` : "<no response>", C = `${l}: ${E}${a ? ` ${a}` : ""}`, O = new qs(
    C,
    t.error ? { cause: t.error } : void 0
  );
  for (const B of ["request", "options", "response"])
    Object.defineProperty(O, B, {
      get() {
        return t[B];
      }
    });
  for (const [B, ye] of [
    ["data", "_data"],
    ["status", "status"],
    ["statusCode", "status"],
    ["statusText", "statusText"],
    ["statusMessage", "statusText"]
  ])
    Object.defineProperty(O, B, {
      get() {
        return t.response && t.response[ye];
      }
    });
  return O;
}
const Vs = new Set(
  Object.freeze(["PATCH", "POST", "PUT", "DELETE"])
);
function Wi(t = "GET") {
  return Vs.has(t.toUpperCase());
}
function Gs(t) {
  if (t === void 0)
    return !1;
  const a = typeof t;
  return a === "string" || a === "number" || a === "boolean" || a === null ? !0 : a !== "object" ? !1 : Array.isArray(t) ? !0 : t.buffer ? !1 : t.constructor && t.constructor.name === "Object" || typeof t.toJSON == "function";
}
const Js = /* @__PURE__ */ new Set([
  "image/svg",
  "application/xml",
  "application/xhtml",
  "application/html"
]), Ks = /^application\/(?:[\w!#$%&*.^`~-]*\+)?json(;.+)?$/i;
function Ys(t = "") {
  if (!t)
    return "json";
  const a = t.split(";").shift() || "";
  return Ks.test(a) ? "json" : Js.has(a) || a.startsWith("text/") ? "text" : "blob";
}
function Zs(t, a, c = globalThis.Headers) {
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
const Xs = /* @__PURE__ */ new Set([
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
]), Qs = /* @__PURE__ */ new Set([101, 204, 205, 304]);
function Yi(t = {}) {
  const {
    fetch: a = globalThis.fetch,
    Headers: c = globalThis.Headers,
    AbortController: h = globalThis.AbortController
  } = t;
  async function l(O) {
    const V = O.error && O.error.name === "AbortError" && !O.options.timeout || !1;
    if (O.options.retry !== !1 && !V) {
      let b;
      typeof O.options.retry == "number" ? b = O.options.retry : b = Wi(O.options.method) ? 0 : 1;
      const $ = O.response && O.response.status || 500;
      if (b > 0 && (Array.isArray(O.options.retryStatusCodes) ? O.options.retryStatusCodes.includes($) : Xs.has($))) {
        const M = O.options.retryDelay || 0;
        return M > 0 && await new Promise((B) => setTimeout(B, M)), E(O.request, {
          ...O.options,
          retry: b - 1
        });
      }
    }
    const F = Hs(O);
    throw Error.captureStackTrace && Error.captureStackTrace(F, E), F;
  }
  const E = async function(V, F = {}) {
    var B;
    const b = {
      request: V,
      options: Zs(F, t.defaults, c),
      response: void 0,
      error: void 0
    };
    b.options.method = (B = b.options.method) == null ? void 0 : B.toUpperCase(), b.options.onRequest && await b.options.onRequest(b), typeof b.request == "string" && (b.options.baseURL && (b.request = Ls(b.request, b.options.baseURL)), (b.options.query || b.options.params) && (b.request = js(b.request, {
      ...b.options.params,
      ...b.options.query
    }))), b.options.body && Wi(b.options.method) && (Gs(b.options.body) ? (b.options.body = typeof b.options.body == "string" ? b.options.body : JSON.stringify(b.options.body), b.options.headers = new c(b.options.headers || {}), b.options.headers.has("content-type") || b.options.headers.set("content-type", "application/json"), b.options.headers.has("accept") || b.options.headers.set("accept", "application/json")) : (
      // ReadableStream Body
      ("pipeTo" in b.options.body && typeof b.options.body.pipeTo == "function" || // Node.js Stream Body
      typeof b.options.body.pipe == "function") && ("duplex" in b.options || (b.options.duplex = "half"))
    ));
    let $;
    if (!b.options.signal && b.options.timeout) {
      const ye = new h();
      $ = setTimeout(
        () => ye.abort(),
        b.options.timeout
      ), b.options.signal = ye.signal;
    }
    try {
      b.response = await a(
        b.request,
        b.options
      );
    } catch (ye) {
      return b.error = ye, b.options.onRequestError && await b.options.onRequestError(b), await l(b);
    } finally {
      $ && clearTimeout($);
    }
    if (b.response.body && !Qs.has(b.response.status) && b.options.method !== "HEAD") {
      const ye = (b.options.parseResponse ? "json" : b.options.responseType) || Ys(b.response.headers.get("content-type") || "");
      switch (ye) {
        case "json": {
          const fn = await b.response.text(), S = b.options.parseResponse || qi;
          b.response._data = S(fn);
          break;
        }
        case "stream": {
          b.response._data = b.response.body;
          break;
        }
        default:
          b.response._data = await b.response[ye]();
      }
    }
    return b.options.onResponse && await b.options.onResponse(b), !b.options.ignoreResponseError && b.response.status >= 400 && b.response.status < 600 ? (b.options.onResponseError && await b.options.onResponseError(b), await l(b)) : b.response;
  }, C = async function(V, F) {
    return (await E(V, F))._data;
  };
  return C.raw = E, C.native = (...O) => a(...O), C.create = (O = {}) => Yi({
    ...t,
    defaults: {
      ...t.defaults,
      ...O
    }
  }), C;
}
const io = function() {
  if (typeof globalThis < "u")
    return globalThis;
  if (typeof self < "u")
    return self;
  if (typeof window < "u")
    return window;
  if (typeof global < "u")
    return global;
  throw new Error("unable to locate global object");
}(), ks = io.fetch || (() => Promise.reject(new Error("[ofetch] global.fetch is not supported!"))), eu = io.Headers, nu = io.AbortController, Zi = Yi({ fetch: ks, Headers: eu, AbortController: nu }), Xi = Zi, ru = Zi.create({
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
}), tu = (t) => (a, c) => (t.set(a, c), c), _i = Number.MAX_SAFE_INTEGER === void 0 ? 9007199254740991 : Number.MAX_SAFE_INTEGER, Qi = 536870912, Ai = Qi * 2, ou = (t, a) => (c) => {
  const h = a.get(c);
  let l = h === void 0 ? c.size : h < Ai ? h + 1 : 0;
  if (!c.has(l))
    return t(c, l);
  if (c.size < Qi) {
    for (; c.has(l); )
      l = Math.floor(Math.random() * Ai);
    return t(c, l);
  }
  if (c.size > _i)
    throw new Error("Congratulations, you created a collection of unique numbers which uses all available integers!");
  for (; c.has(l); )
    l = Math.floor(Math.random() * _i);
  return t(c, l);
}, ki = /* @__PURE__ */ new WeakMap(), iu = tu(ki), ot = ou(iu, ki), au = (t) => t.method !== void 0 && t.method === "call", su = (t) => typeof t.id == "number" && typeof t.result == "boolean", uu = (t) => {
  const a = /* @__PURE__ */ new Map([[0, () => {
  }]]), c = /* @__PURE__ */ new Map([[0, () => {
  }]]), h = /* @__PURE__ */ new Map(), l = new Worker(t);
  return l.addEventListener("message", ({ data: F }) => {
    if (au(F)) {
      const { params: { timerId: b, timerType: $ } } = F;
      if ($ === "interval") {
        const M = a.get(b);
        if (typeof M === void 0)
          throw new Error("The timer is in an undefined state.");
        if (typeof M == "number") {
          const B = h.get(M);
          if (B === void 0 || B.timerId !== b || B.timerType !== $)
            throw new Error("The timer is in an undefined state.");
        } else typeof M == "function" && M();
      } else if ($ === "timeout") {
        const M = c.get(b);
        if (typeof M === void 0)
          throw new Error("The timer is in an undefined state.");
        if (typeof M == "number") {
          const B = h.get(M);
          if (B === void 0 || B.timerId !== b || B.timerType !== $)
            throw new Error("The timer is in an undefined state.");
        } else typeof M == "function" && (M(), c.delete(b));
      }
    } else if (su(F)) {
      const { id: b } = F, $ = h.get(b);
      if ($ === void 0)
        throw new Error("The timer is in an undefined state.");
      const { timerId: M, timerType: B } = $;
      h.delete(b), B === "interval" ? a.delete(M) : c.delete(M);
    } else {
      const { error: { message: b } } = F;
      throw new Error(b);
    }
  }), {
    clearInterval: (F) => {
      if (typeof a.get(F) == "function") {
        const b = ot(h);
        h.set(b, { timerId: F, timerType: "interval" }), a.set(F, b), l.postMessage({
          id: b,
          method: "clear",
          params: { timerId: F, timerType: "interval" }
        });
      }
    },
    clearTimeout: (F) => {
      if (typeof c.get(F) == "function") {
        const b = ot(h);
        h.set(b, { timerId: F, timerType: "timeout" }), c.set(F, b), l.postMessage({
          id: b,
          method: "clear",
          params: { timerId: F, timerType: "timeout" }
        });
      }
    },
    setInterval: (F, b = 0, ...$) => {
      const M = ot(a);
      return a.set(M, () => {
        F(...$), typeof a.get(M) == "function" && l.postMessage({
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
    setTimeout: (F, b = 0, ...$) => {
      const M = ot(c);
      return c.set(M, () => F(...$)), l.postMessage({
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
}, cu = (t, a) => {
  let c = null;
  return () => {
    if (c !== null)
      return c;
    const h = new Blob([a], { type: "application/javascript; charset=utf-8" }), l = URL.createObjectURL(h);
    return c = t(l), setTimeout(() => URL.revokeObjectURL(l)), c;
  };
}, du = `(()=>{"use strict";const e=new Map,t=new Map,r=t=>{const r=e.get(t);return void 0!==r&&(clearTimeout(r),e.delete(t),!0)},s=e=>{const r=t.get(e);return void 0!==r&&(clearTimeout(r),t.delete(e),!0)},o=(e,t)=>{const r=performance.now(),s=e+t-r-performance.timeOrigin;return{expected:r+s,remainingDelay:s}},i=(e,t,r,s)=>{const o=r-performance.now();o>0?e.set(t,setTimeout(i,o,e,t,r,s)):(e.delete(t),postMessage({id:null,method:"call",params:{timerId:t,timerType:s}}))};addEventListener("message",(n=>{let{data:a}=n;try{if("clear"===a.method){const{id:e,params:{timerId:t,timerType:o}}=a;if("interval"===o)postMessage({id:e,result:r(t)});else{if("timeout"!==o)throw new Error('The given type "'.concat(o,'" is not supported'));postMessage({id:e,result:s(t)})}}else{if("set"!==a.method)throw new Error('The given method "'.concat(a.method,'" is not supported'));{const{params:{delay:r,now:s,timerId:n,timerType:m}}=a;if("interval"===m)((t,r,s)=>{const{expected:n,remainingDelay:a}=o(t,s);e.set(r,setTimeout(i,a,e,r,n,"interval"))})(r,n,s);else{if("timeout"!==m)throw new Error('The given type "'.concat(m,'" is not supported'));((e,r,s)=>{const{expected:n,remainingDelay:a}=o(e,s);t.set(r,setTimeout(i,a,t,r,n,"timeout"))})(r,n,s)}}}}catch(e){postMessage({error:{message:e.message},id:a.id,result:null})}}))})();`, fu = cu(uu, du), lu = (...t) => fu().setTimeout(...t);
/**
* @vue/shared v3.4.32
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
/*! #__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function hu(t, a) {
  const c = new Set(t.split(","));
  return (h) => c.has(h);
}
const pu = () => {
}, ea = Object.assign, vu = Object.prototype.hasOwnProperty, lt = (t, a) => vu.call(t, a), kn = Array.isArray, zr = (t) => na(t) === "[object Map]", wu = (t) => typeof t == "string", Lr = (t) => typeof t == "symbol", pt = (t) => t !== null && typeof t == "object", mu = Object.prototype.toString, na = (t) => mu.call(t), ra = (t) => na(t).slice(8, -1), ao = (t) => wu(t) && t !== "NaN" && t[0] !== "-" && "" + parseInt(t, 10) === t, gu = (t) => {
  const a = /* @__PURE__ */ Object.create(null);
  return (c) => a[c] || (a[c] = t(c));
}, yu = gu((t) => t.charAt(0).toUpperCase() + t.slice(1)), wr = (t, a) => !Object.is(t, a);
var Ke = {};
function pr(t, ...a) {
  console.warn(`[Vue warn] ${t}`, ...a);
}
let Eu;
function bu(t, a = Eu) {
  a && a.active && a.effects.push(t);
}
let er;
class kt {
  constructor(a, c, h, l) {
    this.fn = a, this.trigger = c, this.scheduler = h, this.active = !0, this.deps = [], this._dirtyLevel = 4, this._trackId = 0, this._runnings = 0, this._shouldSchedule = !1, this._depsLength = 0, bu(this, l);
  }
  get dirty() {
    if (this._dirtyLevel === 2 || this._dirtyLevel === 3) {
      this._dirtyLevel = 1, ia();
      for (let a = 0; a < this._depsLength; a++) {
        const c = this.deps[a];
        if (c.computed && (Pu(c.computed), this._dirtyLevel >= 4))
          break;
      }
      this._dirtyLevel === 1 && (this._dirtyLevel = 0), aa();
    }
    return this._dirtyLevel >= 4;
  }
  set dirty(a) {
    this._dirtyLevel = a ? 4 : 0;
  }
  run() {
    if (this._dirtyLevel = 0, !this.active)
      return this.fn();
    let a = Bn, c = er;
    try {
      return Bn = !0, er = this, this._runnings++, Mi(this), this.fn();
    } finally {
      zi(this), this._runnings--, er = c, Bn = a;
    }
  }
  stop() {
    this.active && (Mi(this), zi(this), this.onStop && this.onStop(), this.active = !1);
  }
}
function Pu(t) {
  return t.value;
}
function Mi(t) {
  t._trackId++, t._depsLength = 0;
}
function zi(t) {
  if (t.deps.length > t._depsLength) {
    for (let a = t._depsLength; a < t.deps.length; a++)
      ta(t.deps[a], t);
    t.deps.length = t._depsLength;
  }
}
function ta(t, a) {
  const c = t.get(a);
  c !== void 0 && a._trackId !== c && (t.delete(a), t.size === 0 && t.cleanup());
}
function Ou(t, a) {
  t.effect instanceof kt && (t = t.effect.fn);
  const c = new kt(t, pu, () => {
    c.dirty && c.run();
  });
  c.run();
  const h = c.run.bind(c);
  return h.effect = c, h;
}
let Bn = !0, eo = 0;
const oa = [];
function ia() {
  oa.push(Bn), Bn = !1;
}
function aa() {
  const t = oa.pop();
  Bn = t === void 0 ? !0 : t;
}
function so() {
  eo++;
}
function uo() {
  for (eo--; !eo && no.length; )
    no.shift()();
}
function sa(t, a, c) {
  var h;
  if (a.get(t) !== t._trackId) {
    a.set(t, t._trackId);
    const l = t.deps[t._depsLength];
    l !== a ? (l && ta(l, t), t.deps[t._depsLength++] = a) : t._depsLength++, Ke.NODE_ENV !== "production" && ((h = t.onTrack) == null || h.call(t, ea({ effect: t }, c)));
  }
}
const no = [];
function ua(t, a, c) {
  var h;
  so();
  for (const l of t.keys()) {
    let E;
    l._dirtyLevel < a && (E ?? (E = t.get(l) === l._trackId)) && (l._shouldSchedule || (l._shouldSchedule = l._dirtyLevel === 0), l._dirtyLevel = a), l._shouldSchedule && (E ?? (E = t.get(l) === l._trackId)) && (Ke.NODE_ENV !== "production" && ((h = l.onTrigger) == null || h.call(l, ea({ effect: l }, c))), l.trigger(), (!l._runnings || l.allowRecurse) && l._dirtyLevel !== 2 && (l._shouldSchedule = !1, l.scheduler && no.push(l.scheduler)));
  }
  uo();
}
const ca = (t, a) => {
  const c = /* @__PURE__ */ new Map();
  return c.cleanup = t, c.computed = a, c;
}, ro = /* @__PURE__ */ new WeakMap(), nr = Symbol(Ke.NODE_ENV !== "production" ? "iterate" : ""), to = Symbol(Ke.NODE_ENV !== "production" ? "Map key iterate" : "");
function hn(t, a, c) {
  if (Bn && er) {
    let h = ro.get(t);
    h || ro.set(t, h = /* @__PURE__ */ new Map());
    let l = h.get(c);
    l || h.set(c, l = ca(() => h.delete(c))), sa(
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
  const C = ro.get(t);
  if (!C)
    return;
  let O = [];
  if (a === "clear")
    O = [...C.values()];
  else if (c === "length" && kn(t)) {
    const V = Number(h);
    C.forEach((F, b) => {
      (b === "length" || !Lr(b) && b >= V) && O.push(F);
    });
  } else
    switch (c !== void 0 && O.push(C.get(c)), a) {
      case "add":
        kn(t) ? ao(c) && O.push(C.get("length")) : (O.push(C.get(nr)), zr(t) && O.push(C.get(to)));
        break;
      case "delete":
        kn(t) || (O.push(C.get(nr)), zr(t) && O.push(C.get(to)));
        break;
      case "set":
        zr(t) && O.push(C.get(nr));
        break;
    }
  so();
  for (const V of O)
    V && ua(
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
  uo();
}
const Su = /* @__PURE__ */ hu("__proto__,__v_isRef,__isVue"), da = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((t) => t !== "arguments" && t !== "caller").map((t) => Symbol[t]).filter(Lr)
), Fi = /* @__PURE__ */ Ru();
function Ru() {
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
      ia(), so();
      const h = se(this)[a].apply(this, c);
      return uo(), aa(), h;
    };
  }), t;
}
function Tu(t) {
  Lr(t) || (t = String(t));
  const a = se(this);
  return hn(a, "has", t), a.hasOwnProperty(t);
}
class fa {
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
      return h === (l ? E ? ju : va : E ? Lu : pa).get(a) || // receiver is not the reactive proxy, but has the same prototype
      // this means the reciever is a user proxy of the reactive proxy
      Object.getPrototypeOf(a) === Object.getPrototypeOf(h) ? a : void 0;
    const C = kn(a);
    if (!l) {
      if (C && lt(Fi, c))
        return Reflect.get(Fi, c, h);
      if (c === "hasOwnProperty")
        return Tu;
    }
    const O = Reflect.get(a, c, h);
    return (Lr(c) ? da.has(c) : Su(c)) || (l || hn(a, "get", c), E) ? O : ht(O) ? C && ao(c) ? O : O.value : pt(O) ? l ? ma(O) : wa(O) : O;
  }
}
class Cu extends fa {
  constructor(a = !1) {
    super(!1, a);
  }
  set(a, c, h, l) {
    let E = a[c];
    if (!this._isShallow) {
      const V = vr(E);
      if (!wt(h) && !vr(h) && (E = se(E), h = se(h)), !kn(a) && ht(E) && !ht(h))
        return V ? !1 : (E.value = h, !0);
    }
    const C = kn(a) && ao(c) ? Number(c) < a.length : lt(a, c), O = Reflect.set(a, c, h, l);
    return a === se(l) && (C ? wr(h, E) && qn(a, "set", c, h, E) : qn(a, "add", c, h)), O;
  }
  deleteProperty(a, c) {
    const h = lt(a, c), l = a[c], E = Reflect.deleteProperty(a, c);
    return E && h && qn(a, "delete", c, void 0, l), E;
  }
  has(a, c) {
    const h = Reflect.has(a, c);
    return (!Lr(c) || !da.has(c)) && hn(a, "has", c), h;
  }
  ownKeys(a) {
    return hn(
      a,
      "iterate",
      kn(a) ? "length" : nr
    ), Reflect.ownKeys(a);
  }
}
class Nu extends fa {
  constructor(a = !1) {
    super(!0, a);
  }
  set(a, c) {
    return Ke.NODE_ENV !== "production" && pr(
      `Set operation on key "${String(c)}" failed: target is readonly.`,
      a
    ), !0;
  }
  deleteProperty(a, c) {
    return Ke.NODE_ENV !== "production" && pr(
      `Delete operation on key "${String(c)}" failed: target is readonly.`,
      a
    ), !0;
  }
}
const xu = /* @__PURE__ */ new Cu(), Iu = /* @__PURE__ */ new Nu(), co = (t) => t, vt = (t) => Reflect.getPrototypeOf(t);
function it(t, a, c = !1, h = !1) {
  t = t.__v_raw;
  const l = se(t), E = se(a);
  c || (wr(a, E) && hn(l, "get", a), hn(l, "get", E));
  const { has: C } = vt(l), O = h ? co : c ? fo : Fr;
  if (C.call(l, a))
    return O(t.get(a));
  if (C.call(l, E))
    return O(t.get(E));
  t !== l && t.get(a);
}
function at(t, a = !1) {
  const c = this.__v_raw, h = se(c), l = se(t);
  return a || (wr(t, l) && hn(h, "has", t), hn(h, "has", l)), t === l ? c.has(t) : c.has(t) || c.has(l);
}
function st(t, a = !1) {
  return t = t.__v_raw, !a && hn(se(t), "iterate", nr), Reflect.get(t, "size", t);
}
function Li(t, a = !1) {
  !a && !wt(t) && !vr(t) && (t = se(t));
  const c = se(this);
  return vt(c).has.call(c, t) || (c.add(t), qn(c, "add", t, t)), this;
}
function ji(t, a, c = !1) {
  !c && !wt(a) && !vr(a) && (a = se(a));
  const h = se(this), { has: l, get: E } = vt(h);
  let C = l.call(h, t);
  C ? Ke.NODE_ENV !== "production" && ha(h, l, t) : (t = se(t), C = l.call(h, t));
  const O = E.call(h, t);
  return h.set(t, a), C ? wr(a, O) && qn(h, "set", t, a, O) : qn(h, "add", t, a), this;
}
function Ui(t) {
  const a = se(this), { has: c, get: h } = vt(a);
  let l = c.call(a, t);
  l ? Ke.NODE_ENV !== "production" && ha(a, c, t) : (t = se(t), l = c.call(a, t));
  const E = h ? h.call(a, t) : void 0, C = a.delete(t);
  return l && qn(a, "delete", t, void 0, E), C;
}
function $i() {
  const t = se(this), a = t.size !== 0, c = Ke.NODE_ENV !== "production" ? zr(t) ? new Map(t) : new Set(t) : void 0, h = t.clear();
  return a && qn(t, "clear", void 0, void 0, c), h;
}
function ut(t, a) {
  return function(h, l) {
    const E = this, C = E.__v_raw, O = se(C), V = a ? co : t ? fo : Fr;
    return !t && hn(O, "iterate", nr), C.forEach((F, b) => h.call(l, V(F), V(b), E));
  };
}
function ct(t, a, c) {
  return function(...h) {
    const l = this.__v_raw, E = se(l), C = zr(E), O = t === "entries" || t === Symbol.iterator && C, V = t === "keys" && C, F = l[t](...h), b = c ? co : a ? fo : Fr;
    return !a && hn(
      E,
      "iterate",
      V ? to : nr
    ), {
      // iterator protocol
      next() {
        const { value: $, done: M } = F.next();
        return M ? { value: $, done: M } : {
          value: O ? [b($[0]), b($[1])] : b($),
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
function $n(t) {
  return function(...a) {
    if (Ke.NODE_ENV !== "production") {
      const c = a[0] ? `on key "${a[0]}" ` : "";
      pr(
        `${yu(t)} operation ${c}failed: target is readonly.`,
        se(this)
      );
    }
    return t === "delete" ? !1 : t === "clear" ? void 0 : this;
  };
}
function Du() {
  const t = {
    get(E) {
      return it(this, E);
    },
    get size() {
      return st(this);
    },
    has: at,
    add: Li,
    set: ji,
    delete: Ui,
    clear: $i,
    forEach: ut(!1, !1)
  }, a = {
    get(E) {
      return it(this, E, !1, !0);
    },
    get size() {
      return st(this);
    },
    has: at,
    add(E) {
      return Li.call(this, E, !0);
    },
    set(E, C) {
      return ji.call(this, E, C, !0);
    },
    delete: Ui,
    clear: $i,
    forEach: ut(!1, !0)
  }, c = {
    get(E) {
      return it(this, E, !0);
    },
    get size() {
      return st(this, !0);
    },
    has(E) {
      return at.call(this, E, !0);
    },
    add: $n("add"),
    set: $n("set"),
    delete: $n("delete"),
    clear: $n("clear"),
    forEach: ut(!0, !1)
  }, h = {
    get(E) {
      return it(this, E, !0, !0);
    },
    get size() {
      return st(this, !0);
    },
    has(E) {
      return at.call(this, E, !0);
    },
    add: $n("add"),
    set: $n("set"),
    delete: $n("delete"),
    clear: $n("clear"),
    forEach: ut(!0, !0)
  };
  return [
    "keys",
    "values",
    "entries",
    Symbol.iterator
  ].forEach((E) => {
    t[E] = ct(E, !1, !1), c[E] = ct(E, !0, !1), a[E] = ct(E, !1, !0), h[E] = ct(
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
  Wu,
  _u,
  Au,
  Mu
] = /* @__PURE__ */ Du();
function la(t, a) {
  const c = a ? t ? Mu : Au : t ? _u : Wu;
  return (h, l, E) => l === "__v_isReactive" ? !t : l === "__v_isReadonly" ? t : l === "__v_raw" ? h : Reflect.get(
    lt(c, l) && l in h ? c : h,
    l,
    E
  );
}
const zu = {
  get: /* @__PURE__ */ la(!1, !1)
}, Fu = {
  get: /* @__PURE__ */ la(!0, !1)
};
function ha(t, a, c) {
  const h = se(c);
  if (h !== c && a.call(t, h)) {
    const l = ra(t);
    pr(
      `Reactive ${l} contains both the raw and reactive versions of the same object${l === "Map" ? " as keys" : ""}, which can lead to inconsistencies. Avoid differentiating between the raw and reactive versions of an object and only use the reactive version if possible.`
    );
  }
}
const pa = /* @__PURE__ */ new WeakMap(), Lu = /* @__PURE__ */ new WeakMap(), va = /* @__PURE__ */ new WeakMap(), ju = /* @__PURE__ */ new WeakMap();
function Uu(t) {
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
function $u(t) {
  return t.__v_skip || !Object.isExtensible(t) ? 0 : Uu(ra(t));
}
function wa(t) {
  return vr(t) ? t : ga(
    t,
    !1,
    xu,
    zu,
    pa
  );
}
function ma(t) {
  return ga(
    t,
    !0,
    Iu,
    Fu,
    va
  );
}
function ga(t, a, c, h, l) {
  if (!pt(t))
    return Ke.NODE_ENV !== "production" && pr(
      `value cannot be made ${a ? "readonly" : "reactive"}: ${String(
        t
      )}`
    ), t;
  if (t.__v_raw && !(a && t.__v_isReactive))
    return t;
  const E = l.get(t);
  if (E)
    return E;
  const C = $u(t);
  if (C === 0)
    return t;
  const O = new Proxy(
    t,
    C === 2 ? h : c
  );
  return l.set(t, O), O;
}
function vr(t) {
  return !!(t && t.__v_isReadonly);
}
function wt(t) {
  return !!(t && t.__v_isShallow);
}
function se(t) {
  const a = t && t.__v_raw;
  return a ? se(a) : t;
}
const Fr = (t) => pt(t) ? wa(t) : t, fo = (t) => pt(t) ? ma(t) : t, Bu = "Computed is still dirty after getter evaluation, likely because a computed is mutating its own dependency in its getter. State mutations in computed getters should be avoided.  Check the docs for more details: https://vuejs.org/guide/essentials/computed.html#getters-should-be-side-effect-free";
class qu {
  constructor(a, c, h, l) {
    this.getter = a, this._setter = c, this.dep = void 0, this.__v_isRef = !0, this.__v_isReadonly = !1, this.effect = new kt(
      () => a(this._value),
      () => dt(
        this,
        this.effect._dirtyLevel === 2 ? 2 : 3
      )
    ), this.effect.computed = this, this.effect.active = this._cacheable = !l, this.__v_isReadonly = h;
  }
  get value() {
    const a = se(this);
    return (!a._cacheable || a.effect.dirty) && wr(a._value, a._value = a.effect.run()) && dt(a, 4), ya(a), a.effect._dirtyLevel >= 2 && (Ke.NODE_ENV !== "production" && this._warnRecursive && pr(Bu, `

getter: `, this.getter), dt(a, 2)), a._value;
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
function ya(t) {
  var a;
  Bn && er && (t = se(t), sa(
    er,
    (a = t.dep) != null ? a : t.dep = ca(
      () => t.dep = void 0,
      t instanceof qu ? t : void 0
    ),
    Ke.NODE_ENV !== "production" ? {
      target: t,
      type: "get",
      key: "value"
    } : void 0
  ));
}
function dt(t, a = 4, c, h) {
  t = se(t);
  const l = t.dep;
  l && ua(
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
function ht(t) {
  return !!(t && t.__v_isRef === !0);
}
function Pn(t) {
  return Hu(t, !1);
}
function Hu(t, a) {
  return ht(t) ? t : new Vu(t, a);
}
class Vu {
  constructor(a, c) {
    this.__v_isShallow = c, this.dep = void 0, this.__v_isRef = !0, this._rawValue = c ? a : se(a), this._value = c ? a : Fr(a);
  }
  get value() {
    return ya(this), this._value;
  }
  set value(a) {
    const c = this.__v_isShallow || wt(a) || vr(a);
    if (a = c ? a : se(a), wr(a, this._rawValue)) {
      const h = this._rawValue;
      this._rawValue = a, this._value = c ? a : Fr(a), dt(this, 4, a, h);
    }
  }
}
function Gu() {
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
var Ju = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, Ea = { exports: {} };
(function(t, a) {
  (function(c, h) {
    t.exports = h();
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
        }), 2 & C && typeof E != "string") for (var V in E) l.d(O, V, (function(F) {
          return E[F];
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
        return It;
      }), l.d(h, "create", function() {
        return Ya;
      }), l.d(h, "destroy", function() {
        return Za;
      }), l.d(h, "destroyComponents", function() {
        return vi;
      }), l.d(h, "destroyAll", function() {
        return wi;
      }), l.d(h, "PROP_TYPE", function() {
        return de;
      }), l.d(h, "PROP_SERIALIZATION", function() {
        return nt;
      }), l.d(h, "CONTEXT", function() {
        return Pe;
      }), l.d(h, "EVENT", function() {
        return we;
      });
      function E(e, n) {
        return (E = Object.setPrototypeOf || function(r, o) {
          return r.__proto__ = o, r;
        })(e, n);
      }
      function C(e, n) {
        e.prototype = Object.create(n.prototype), e.prototype.constructor = e, E(e, n);
      }
      function O() {
        return (O = Object.assign || function(e) {
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
      var F = [], b = [], $ = 0, M;
      function B() {
        if (!$ && M) {
          var e = M;
          M = null, e.resolve();
        }
      }
      function ye() {
        $ += 1;
      }
      function fn() {
        $ -= 1, B();
      }
      var S = function() {
        function e(r) {
          var o = this;
          if (this.resolved = void 0, this.rejected = void 0, this.errorHandled = void 0, this.value = void 0, this.error = void 0, this.handlers = void 0, this.dispatching = void 0, this.stack = void 0, this.resolved = !1, this.rejected = !1, this.errorHandled = !1, this.handlers = [], r) {
            var i, s, u = !1, f = !1, d = !1;
            ye();
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
              if (F.indexOf(s) === -1) {
                F.push(s), setTimeout(function() {
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
            this.dispatching = !0, ye();
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
          ye();
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
            return B(), o;
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
      function mr(e) {
        return e === void 0 && (e = window), e.location.protocol;
      }
      function mn(e) {
        if (e === void 0 && (e = window), e.mockDomain) {
          var n = e.mockDomain.split("//")[0];
          if (n) return n;
        }
        return mr(e);
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
      function gr(e) {
        e === void 0 && (e = window);
        var n = e.location;
        if (!n) throw new Error("Can not read window location");
        var r = mr(e);
        if (!r) throw new Error("Can not read window protocol");
        if (r === "file:") return "file://";
        if (r === "about:") {
          var o = be(e);
          return o && rr() ? gr(o) : "about://";
        }
        var i = n.host;
        if (!i) throw new Error("Can not read window host");
        return r + "//" + i;
      }
      function ae(e) {
        e === void 0 && (e = window);
        var n = gr(e);
        return n && e.mockDomain && e.mockDomain.indexOf("mock:") === 0 ? e.mockDomain : n;
      }
      function he(e) {
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
            if (gr(n) === gr(window)) return !0;
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
        if (!he(e)) throw new Error("Expected window to be same domain");
        return e;
      }
      function yr(e, n) {
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
      function On(e) {
        e === void 0 && (e = window);
        try {
          if (e.top) return e.top;
        } catch {
        }
        if (be(e) === e) return e;
        try {
          if (yr(window, e) && window.top) return window.top;
        } catch {
        }
        try {
          if (yr(e, window) && window.top) return window.top;
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
        var n = On(e);
        if (!n) throw new Error("Can not determine top window");
        var r = [].concat(or(n), [n]);
        return r.indexOf(e) === -1 && (r = [].concat(r, [e], or(e))), r;
      }
      var In = [], ir = [];
      function pe(e, n) {
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
        if (n && he(e)) try {
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
        }(In, e);
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
      function Er(e) {
        return (e = e || window).navigator.mockUserAgent || e.navigator.userAgent;
      }
      function br(e, n) {
        for (var r = tr(e), o = 0; o < r.length; o++) {
          var i = r[o];
          try {
            if (he(i) && i.name === n && r.indexOf(i) !== -1) return i;
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
      function jr(e, n) {
        return e === ke(n);
      }
      function Pr(e) {
        return e === void 0 && (e = window), ke(e = e || window) || be(e) || void 0;
      }
      function mt(e, n) {
        for (var r = 0; r < e.length; r++)
          for (var o = e[r], i = 0; i < n.length; i++) if (o === n[i]) return !0;
        return !1;
      }
      function gt(e) {
        e === void 0 && (e = window);
        for (var n = 0, r = e; r; ) (r = be(r)) && (n += 1);
        return n;
      }
      function Ur(e, n) {
        var r = On(e) || e, o = On(n) || n;
        try {
          if (r && o) return r === o;
        } catch {
        }
        var i = gn(e), s = gn(n);
        if (mt(i, s)) return !0;
        var u = ke(r), f = ke(o);
        return u && mt(gn(u), s) || f && mt(gn(f), i), !1;
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
      function Sn(e) {
        return e.match(/^(https?|mock|file):\/\//) ? e.split("/").slice(0, 3).join("/") : ae();
      }
      function lo(e, n, r, o) {
        r === void 0 && (r = 1e3), o === void 0 && (o = 1 / 0);
        var i;
        return function s() {
          if (pe(e))
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
      function yt(e) {
        if (n = Sn(e), n.indexOf("mock:") !== 0) return e;
        var n;
        throw new Error("Mock urls not supported out of test mode");
      }
      function ho(e) {
        if (he(e)) return en(e).frameElement;
        for (var n = 0, r = document.querySelectorAll("iframe"); n < r.length; n++) {
          var o = r[n];
          if (o && o.contentWindow && o.contentWindow === e) return o;
        }
      }
      function po(e) {
        if (function(r) {
          return r === void 0 && (r = window), !!be(r);
        }(e)) {
          var n = ho(e);
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
      var Br = function() {
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
            if (Hn(s) && pe(s)) {
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
      function vo(e) {
        return (vo = Object.setPrototypeOf ? Object.getPrototypeOf : function(n) {
          return n.__proto__ || Object.getPrototypeOf(n);
        })(e);
      }
      function Pa() {
        if (typeof Reflect > "u" || !Reflect.construct || Reflect.construct.sham) return !1;
        if (typeof Proxy == "function") return !0;
        try {
          return Date.prototype.toString.call(Reflect.construct(Date, [], function() {
          })), !0;
        } catch {
          return !1;
        }
      }
      function wo(e, n, r) {
        return (wo = Pa() ? Reflect.construct : function(o, i, s) {
          var u = [null];
          u.push.apply(u, i);
          var f = new (Function.bind.apply(o, u))();
          return s && E(f, s.prototype), f;
        }).apply(null, arguments);
      }
      function mo(e) {
        var n = typeof Map == "function" ? /* @__PURE__ */ new Map() : void 0;
        return (mo = function(r) {
          if (r === null || (o = r, Function.toString.call(o).indexOf("[native code]") === -1)) return r;
          var o;
          if (typeof r != "function") throw new TypeError("Super expression must either be null or a function");
          if (n !== void 0) {
            if (n.has(r)) return n.get(r);
            n.set(r, i);
          }
          function i() {
            return wo(r, arguments, vo(this).constructor);
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
      function Et(e) {
        var n = !1;
        try {
          (e instanceof window.Element || e !== null && typeof e == "object" && e.nodeType === 1 && typeof e.style == "object" && typeof e.ownerDocument == "object") && (n = !0);
        } catch {
        }
        return n;
      }
      function bt(e) {
        return e.name || e.__name__ || e.displayName || "anonymous";
      }
      function Pt(e, n) {
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
      var qr;
      function St(e) {
        try {
          return JSON.stringify([].slice.call(e), function(n, r) {
            return typeof r == "function" ? "memoize[" + function(o) {
              if (qr = qr || new Br(), o == null || typeof o != "object" && typeof o != "function") throw new Error("Invalid object");
              var i = qr.get(o);
              return i || (i = typeof o + ":" + qe(), qr.set(o, i)), i;
            }(r) + "]" : Et(r) ? {} : r;
          });
        } catch {
          throw new Error("Arguments not serializable -- can not be used to memoize");
        }
      }
      function Oa() {
        return {};
      }
      var Or = 0, go = 0;
      function Dn(e, n) {
        n === void 0 && (n = {});
        var r = n.thisNamespace, o = r !== void 0 && r, i = n.time, s, u, f = Or;
        Or += 1;
        var d = function() {
          for (var v = arguments.length, g = new Array(v), w = 0; w < v; w++) g[w] = arguments[w];
          f < go && (s = null, u = null, f = Or, Or += 1);
          var p;
          p = o ? (u = u || new Br()).getOrSet(this, Oa) : s = s || {};
          var m;
          try {
            m = St(g);
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
        }, Pt(d, (n.name || bt(e)) + "::memoized");
      }
      Dn.clear = function() {
        go = Or;
      };
      function Sa(e) {
        var n = {};
        function r() {
          for (var o = arguments, i = this, s = arguments.length, u = new Array(s), f = 0; f < s; f++) u[f] = arguments[f];
          var d = St(u);
          return n.hasOwnProperty(d) || (n[d] = S.try(function() {
            return e.apply(i, o);
          }).finally(function() {
            delete n[d];
          })), n[d];
        }
        return r.reset = function() {
          n = {};
        }, Pt(r, bt(e) + "::promiseMemoized");
      }
      function ve() {
      }
      function Hr(e) {
        var n = !1;
        return Pt(function() {
          if (!n)
            return n = !0, e.apply(this, arguments);
        }, bt(e) + "::once");
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
      function Vr(e) {
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
      function Ra(e) {
        return e;
      }
      function Sr(e, n) {
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
      function Rt(e) {
        return e.replace(/-([a-z])/g, function(n) {
          return n[1].toUpperCase();
        });
      }
      function yo(e, n, r) {
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
      function Tt(e) {
        return [].slice.call(e);
      }
      function Eo(e) {
        return typeof (n = e) == "object" && n !== null && {}.toString.call(e) === "[object Object]";
        var n;
      }
      function Ct(e) {
        if (!Eo(e)) return !1;
        var n = e.constructor;
        if (typeof n != "function") return !1;
        var r = n.prototype;
        return !!Eo(r) && !!r.hasOwnProperty("isPrototypeOf");
      }
      function Gr(e, n, r) {
        if (r === void 0 && (r = ""), Array.isArray(e)) {
          for (var o = e.length, i = [], s = function(g) {
            yo(i, g, function() {
              var w = r ? r + "." + g : "" + g, p = n(e[g], g, w);
              return (Ct(p) || Array.isArray(p)) && (p = Gr(p, n, w)), p;
            });
          }, u = 0; u < o; u++) s(u);
          return i;
        }
        if (Ct(e)) {
          var f = {}, d = function(g) {
            if (!e.hasOwnProperty(g)) return 1;
            yo(f, g, function() {
              var w = r ? r + "." + g : "" + g, p = n(e[g], g, w);
              return (Ct(p) || Array.isArray(p)) && (p = Gr(p, n, w)), p;
            });
          };
          for (var v in e) d(v);
          return f;
        }
        throw new Error("Pass an object or array");
      }
      function Wn(e) {
        return e != null;
      }
      function Nt(e) {
        return {}.toString.call(e) === "[object RegExp]";
      }
      function Rr(e, n, r) {
        if (e.hasOwnProperty(n)) return e[n];
        var o = r();
        return e[n] = o, o;
      }
      function Jr(e) {
        var n = [], r = !1, o, i = {
          set: function(s, u) {
            return r || (e[s] = u, i.register(function() {
              delete e[s];
            })), u;
          },
          register: function(s) {
            var u = Hr(function() {
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
            return S.all(u).then(ve);
          }
        };
        return i;
      }
      function Kr(e, n) {
        if (n == null) throw new Error("Expected " + e + " to be present");
        return n;
      }
      var Ta = function(e) {
        C(n, e);
        function n(r) {
          var o;
          return (o = e.call(this, r) || this).name = o.constructor.name, typeof Error.captureStackTrace == "function" ? Error.captureStackTrace(function(i) {
            if (i === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return i;
          }(o), o.constructor) : o.stack = new Error(r).stack, o;
        }
        return n;
      }(mo(Error));
      function bo() {
        var e = document.body;
        if (!e) throw new Error("Body element not found");
        return e;
      }
      function Yr() {
        return !!document.body && document.readyState === "complete";
      }
      function Po() {
        return !!document.body && document.readyState === "interactive";
      }
      function Oo(e) {
        return encodeURIComponent(e);
      }
      Dn(function() {
        return new S(function(e) {
          if (Yr() || Po()) return e();
          var n = setInterval(function() {
            if (Yr() || Po())
              return clearInterval(n), e();
          }, 10);
        });
      });
      function So(e) {
        return function(n, r, o) {
          o === void 0 && (o = []);
          var i = n.__inline_memoize_cache__ = n.__inline_memoize_cache__ || {}, s = St(o);
          return i.hasOwnProperty(s) ? i[s] : i[s] = (function() {
            var u = {};
            if (!e || e.indexOf("=") === -1) return u;
            for (var f = 0, d = e.split("&"); f < d.length; f++) {
              var v = d[f];
              (v = v.split("="))[0] && v[1] && (u[decodeURIComponent(v[0])] = decodeURIComponent(v[1]));
            }
            return u;
          }).apply(void 0, o);
        }(So, 0, [e]);
      }
      function Ro(e, n) {
        return n === void 0 && (n = {}), n && Object.keys(n).length ? function(r) {
          return r === void 0 && (r = {}), Object.keys(r).filter(function(o) {
            return typeof r[o] == "string" || typeof r[o] == "boolean";
          }).map(function(o) {
            var i = r[o];
            if (typeof i != "string" && typeof i != "boolean") throw new TypeError("Invalid type for query");
            return Oo(o) + "=" + Oo(i.toString());
          }).join("&");
        }(O({}, So(e), n)) : e;
      }
      function Ca(e, n) {
        e.appendChild(n);
      }
      function xt(e, n) {
        return n === void 0 && (n = document), Et(e) ? e : typeof e == "string" ? n.querySelector(e) : void 0;
      }
      function To(e) {
        return new S(function(n, r) {
          var o = Vr(e), i = xt(e);
          if (i) return n(i);
          if (Yr()) return r(new Error("Document is ready and element " + o + " does not exist"));
          var s = setInterval(function() {
            if (i = xt(e))
              n(i), clearInterval(s);
            else if (Yr())
              return clearInterval(s), r(new Error("Document is ready and element " + o + " does not exist"));
          }, 10);
        });
      }
      var It = function(e) {
        C(n, e);
        function n() {
          return e.apply(this, arguments) || this;
        }
        return n;
      }(Ta), Zr;
      function Co(e) {
        if ((Zr = Zr || new Br()).has(e)) {
          var n = Zr.get(e);
          if (n) return n;
        }
        var r = new S(function(o, i) {
          e.addEventListener("load", function() {
            (function(s) {
              if (function() {
                for (var u = 0; u < In.length; u++) {
                  var f = !1;
                  try {
                    f = In[u].closed;
                  } catch {
                  }
                  f && (ir.splice(u, 1), In.splice(u, 1));
                }
              }(), s && s.contentWindow) try {
                In.push(s.contentWindow), ir.push(s);
              } catch {
              }
            })(e), o(e);
          }), e.addEventListener("error", function(s) {
            e.contentWindow ? o(e) : i(s);
          });
        });
        return Zr.set(e, r), r;
      }
      function Dt(e) {
        return Co(e).then(function(n) {
          if (!n.contentWindow) throw new Error("Could not find window in iframe");
          return n.contentWindow;
        });
      }
      function No(e, n) {
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
          attributes: O({
            allowTransparency: "true"
          }, e.attributes || {}),
          style: O({
            backgroundColor: "transparent",
            border: "none"
          }, r),
          html: e.html,
          class: e.class
        }), i = window.navigator.userAgent.match(/MSIE|Edge/i);
        return o.hasAttribute("id") || o.setAttribute("id", qe()), Co(o), (e.url || i) && o.setAttribute("src", e.url || "about:blank"), o;
      }
      function xo(e, n, r) {
        return e.addEventListener(n, r), {
          cancel: function() {
            e.removeEventListener(n, r);
          }
        };
      }
      function Na(e) {
        e.style.setProperty("display", "");
      }
      function Io(e) {
        e.style.setProperty("display", "none", "important");
      }
      function Tr(e) {
        e && e.parentNode && e.parentNode.removeChild(e);
      }
      function ur(e) {
        return !(e && e.parentNode && e.ownerDocument && e.ownerDocument.documentElement && e.ownerDocument.documentElement.contains(e));
      }
      function Do(e, n, r) {
        var o = r === void 0 ? {} : r, i = o.width, s = i === void 0 || i, u = o.height, f = u === void 0 || u, d = o.interval, v = d === void 0 ? 100 : d, g = o.win, w = g === void 0 ? window : g, p = e.offsetWidth, m = e.offsetHeight, y = !1;
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
        }, R, x;
        return w.addEventListener("resize", P), w.ResizeObserver !== void 0 ? ((R = new w.ResizeObserver(P)).observe(e), x = Sr(P, 10 * v)) : w.MutationObserver !== void 0 ? ((R = new w.MutationObserver(P)).observe(e, {
          attributes: !0,
          childList: !0,
          subtree: !0,
          characterData: !1
        }), x = Sr(P, 10 * v)) : x = Sr(P, v), {
          cancel: function() {
            y = !0, R.disconnect(), window.removeEventListener("resize", P), x.cancel();
          }
        };
      }
      function Wt(e) {
        for (; e.parentNode; ) e = e.parentNode;
        return e.toString() === "[object ShadowRoot]";
      }
      var Xr = typeof document < "u" ? document.currentScript : null, xa = Dn(function() {
        if (Xr || (Xr = function() {
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
        }())) return Xr;
        throw new Error("Can not determine current script");
      }), Ia = qe();
      Dn(function() {
        var e;
        try {
          e = xa();
        } catch {
          return Ia;
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
      function _t(e) {
        if (typeof e == "number") return e;
        var n = e.match(/^([0-9]+)(px|%)$/);
        if (!n) throw new Error("Could not match css value from " + e);
        return parseInt(n[1], 10);
      }
      function _o(e) {
        return _t(e) + "px";
      }
      function Ao(e) {
        return typeof e == "number" ? _o(e) : Wo(e) ? e : _o(e);
      }
      function Mo(e, n) {
        if (typeof e == "number") return e;
        if (Wo(e)) return parseInt(n * _t(e) / 100, 10);
        if (typeof (r = e) == "string" && /^[0-9]+px$/.test(r)) return _t(e);
        var r;
        throw new Error("Can not normalize dimension: " + e);
      }
      function yn(e) {
        e === void 0 && (e = window);
        var n = "__post_robot_11_0_0__";
        return e !== window ? e[n] : e[n] = e[n] || {};
      }
      var zo = function() {
        return {};
      };
      function ue(e, n) {
        return e === void 0 && (e = "store"), n === void 0 && (n = zo), Rr(yn(), e, function() {
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
              return Rr(r, o, i);
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
      var Da = function() {
      };
      function Qr() {
        var e = yn();
        return e.WINDOW_WILDCARD = e.WINDOW_WILDCARD || new Da(), e.WINDOW_WILDCARD;
      }
      function Be(e, n) {
        return e === void 0 && (e = "store"), n === void 0 && (n = zo), ue("windowStore").getOrSet(e, function() {
          var r = new Br(), o = function(i) {
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
              return Rr(o(i), e, s);
            }
          };
        });
      }
      function Fo() {
        return ue("instance").getOrSet("instanceID", qe);
      }
      function Lo(e, n) {
        var r = n.domain, o = Be("helloPromises"), i = o.get(e);
        i && i.resolve({
          domain: r
        });
        var s = S.resolve({
          domain: r
        });
        return o.set(e, s), s;
      }
      function At(e, n) {
        return (0, n.send)(e, "postrobot_hello", {
          instanceID: Fo()
        }, {
          domain: "*",
          timeout: -1
        }).then(function(r) {
          var o = r.origin, i = r.data.instanceID;
          return Lo(e, {
            domain: o
          }), {
            win: e,
            domain: o,
            instanceID: i
          };
        });
      }
      function jo(e, n) {
        var r = n.send;
        return Be("windowInstanceIDPromises").getOrSet(e, function() {
          return At(e, {
            send: r
          }).then(function(o) {
            return o.instanceID;
          });
        });
      }
      function Uo(e, n, r) {
        n === void 0 && (n = 5e3), r === void 0 && (r = "Window");
        var o = function(i) {
          return Be("helloPromises").getOrSet(i, function() {
            return new S();
          });
        }(e);
        return n !== -1 && (o = o.timeout(n, new Error(r + " did not load after " + n + "ms"))), o;
      }
      function $o(e) {
        Be("knownWindows").set(e, !0);
      }
      function Mt(e) {
        return typeof e == "object" && e !== null && typeof e.__type__ == "string";
      }
      function Bo(e) {
        return e === void 0 ? "undefined" : e === null ? "null" : Array.isArray(e) ? "array" : typeof e == "function" ? "function" : typeof e == "object" ? e instanceof Error ? "error" : typeof e.then == "function" ? "promise" : {}.toString.call(e) === "[object RegExp]" ? "regex" : {}.toString.call(e) === "[object Date]" ? "date" : "object" : typeof e == "string" ? "string" : typeof e == "number" ? "number" : typeof e == "boolean" ? "boolean" : void 0;
      }
      function Vn(e, n) {
        return {
          __type__: e,
          __val__: n
        };
      }
      var tn, Wa = ((tn = {}).function = function() {
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
      }, tn), _a = {}, on, Aa = ((on = {}).function = function() {
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
      }, on), Ma = {};
      function zt() {
        return !!Er(window).match(/MSIE|trident|edge\/12|edge\/13/i);
      }
      function qo(e) {
        return !Ur(window, e);
      }
      function Ho(e, n) {
        if (e) {
          if (ae() !== Sn(e)) return !0;
        } else if (n && !he(n)) return !0;
        return !1;
      }
      function Vo(e) {
        var n = e.win, r = e.domain;
        return !(!zt() || r && !Ho(r, n) || n && !qo(n));
      }
      function Ft(e) {
        return "__postrobot_bridge___" + (e = e || Sn(e)).replace(/[^a-zA-Z0-9]+/g, "_");
      }
      function Go() {
        return !!(window.name && window.name === Ft(ae()));
      }
      var za = new S(function(e) {
        if (window.document && window.document.body) return e(window.document.body);
        var n = setInterval(function() {
          if (window.document && window.document.body)
            return clearInterval(n), e(window.document.body);
        }, 10);
      });
      function Jo(e) {
        Be("remoteWindowPromises").getOrSet(e, function() {
          return new S();
        });
      }
      function Lt(e) {
        var n = Be("remoteWindowPromises").get(e);
        if (!n) throw new Error("Remote window promise not found");
        return n;
      }
      function Ko(e, n, r) {
        Lt(e).resolve(function(o, i, s) {
          if (o !== e) throw new Error("Remote window does not match window");
          if (!rn(i, n)) throw new Error("Remote domain " + i + " does not match domain " + n);
          r.fireAndForget(s);
        });
      }
      function jt(e, n) {
        Lt(e).reject(n).catch(ve);
      }
      function kr(e) {
        for (var n = e.win, r = e.name, o = e.domain, i = ue("popupWindowsByName"), s = Be("popupWindowsByWin"), u = 0, f = i.keys(); u < f.length; u++) {
          var d = f[u], v = i.get(d);
          v && !pe(v.win) || i.del(d);
        }
        if (pe(n)) return {
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
        return r && (g.name = r, i.set(r, g)), o && (g.domain = o, Jo(n)), s.set(n, g), g;
      }
      function Yo(e) {
        var n = e.on, r = e.send, o = e.receiveMessage;
        i = window.open, window.open = function(s, u, f, d) {
          var v = i.call(this, yt(s), u, f, d);
          return v && (kr({
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
              var R = function() {
                return v.get(m.name);
              };
              if (!R().domain) throw new Error("We do not have a registered domain for window " + m.name);
              if (R().domain !== p) throw new Error("Message origin " + p + " does not matched registered window origin " + (R().domain || "unknown"));
              return Ko(R().win, p, m.sendMessage), {
                sendMessage: function(x) {
                  if (window && !window.closed && R()) {
                    var W = R().domain;
                    if (W) try {
                      d({
                        data: x,
                        origin: W,
                        source: R().win
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
          send: r,
          receiveMessage: o
        }), function(s) {
          var u = s.send;
          yn(window).openTunnelToParent = function(f) {
            var d = f.name, v = f.source, g = f.canary, w = f.sendMessage, p = ue("tunnelWindows"), m = be(window);
            if (!m) throw new Error("No parent window found to open tunnel to");
            var y = function(P) {
              var R = P.name, x = P.source, W = P.canary, q = P.sendMessage;
              (function() {
                for (var j = ue("tunnelWindows"), _ = 0, Z = j.keys(); _ < Z.length; _++) {
                  var L = Z[_];
                  pe(j[L].source) && j.del(L);
                }
              })();
              var I = qe();
              return ue("tunnelWindows").set(I, {
                name: R,
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
                if (P && P.source && !pe(P.source)) {
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
          S.try(function() {
            var v = ke(window);
            if (v && Vo({
              win: v
            })) {
              return Jo(v), (g = v, Be("remoteBridgeAwaiters").getOrSet(g, function() {
                return S.try(function() {
                  var w = br(g, Ft(ae()));
                  if (w) return he(w) && yn(en(w)) ? w : new S(function(p) {
                    var m, y;
                    m = setInterval(function() {
                      if (w && he(w) && yn(en(w)))
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
                      S.reject(m);
                    }
                  }
                }).then(function(p) {
                  var m = p.source, y = p.origin, P = p.data;
                  if (m !== v) throw new Error("Source does not match opener");
                  Ko(m, y, P.sendMessage);
                }).catch(function(p) {
                  throw jt(v, p), p;
                }) : jt(v, new Error("Can not register with opener: window does not have a name")) : jt(v, new Error("Can not register with opener: no bridge found in opener"));
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
      function Ut() {
        for (var e = ue("idToProxyWindow"), n = 0, r = e.keys(); n < r.length; n++) {
          var o = r[n];
          e.get(o).shouldClean() && e.del(o);
        }
      }
      function Zo(e, n) {
        var r = n.send, o = n.id, i = o === void 0 ? qe() : o, s = e.then(function(d) {
          if (he(d)) return en(d).name;
        }), u = e.then(function(d) {
          if (pe(d)) throw new Error("Window is closed, can not determine type");
          return ke(d) ? Ge.POPUP : Ge.IFRAME;
        });
        s.catch(ve), u.catch(ve);
        var f = function() {
          return e.then(function(d) {
            if (!pe(d)) return he(d) ? en(d).name : s;
          });
        };
        return {
          id: i,
          getType: function() {
            return u;
          },
          getInstanceID: Sa(function() {
            return e.then(function(d) {
              return jo(d, {
                send: r
              });
            });
          }),
          close: function() {
            return e.then(po);
          },
          getName: f,
          focus: function() {
            return e.then(function(d) {
              d.focus();
            });
          },
          isClosed: function() {
            return e.then(function(d) {
              return pe(d);
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
                  var x = R.url, W = R.target, q = R.body, I = R.method, j = I === void 0 ? "post" : I, _ = document.createElement("form");
                  if (_.setAttribute("target", W), _.setAttribute("method", j), _.setAttribute("action", x), _.style.display = "none", q) for (var Z = 0, L = Object.keys(q); Z < L.length; Z++) {
                    var oe, ee = L[Z], G = document.createElement("input");
                    G.setAttribute("name", ee), G.setAttribute("value", (oe = q[ee]) == null ? void 0 : oe.toString()), _.appendChild(G);
                  }
                  bo().appendChild(_), _.submit(), bo().removeChild(_);
                })({
                  url: d,
                  target: P,
                  method: m,
                  body: y
                });
              });
              if (m !== "get") throw new Error("Unsupported method: " + m);
              if (he(g)) try {
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
              kr({
                win: v,
                name: d
              });
              var g = he(v), w = ho(v);
              if (!g) throw new Error("Can not set name for cross-domain window: " + d);
              en(v).name = d, w && w.setAttribute("name", d), s = S.resolve(d);
            });
          }
        };
      }
      var an = function() {
        function e(r) {
          var o = r.send, i = r.win, s = r.serializedWindow;
          this.id = void 0, this.isProxyWindow = !0, this.serializedWindow = void 0, this.actualWindow = void 0, this.actualWindowPromise = void 0, this.send = void 0, this.name = void 0, this.actualWindowPromise = new S(), this.serializedWindow = s || Zo(this.actualWindowPromise, {
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
          var r = this, o = this.isPopup(), i = this.getName(), s = S.hash({
            isPopup: o,
            name: i
          }).then(function(f) {
            var d = f.name;
            f.isPopup && d && window.open("", d, "noopener");
          }), u = this.serializedWindow.focus();
          return S.all([s, u]).then(function() {
            return r;
          });
        }, n.isClosed = function() {
          return this.serializedWindow.isClosed();
        }, n.getWindow = function() {
          return this.actualWindow;
        }, n.setWindow = function(r, o) {
          var i = o.send;
          this.actualWindow = r, this.actualWindowPromise.resolve(this.actualWindow), this.serializedWindow = Zo(this.actualWindowPromise, {
            send: i,
            id: this.getID()
          }), Be("winToProxyWindow").set(r, this);
        }, n.awaitWindow = function() {
          return this.actualWindowPromise;
        }, n.matchWindow = function(r, o) {
          var i = this, s = o.send;
          return S.try(function() {
            return i.actualWindow ? r === i.actualWindow : S.hash({
              proxyInstanceID: i.getInstanceID(),
              knownWindowInstanceID: jo(r, {
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
          return !!(this.actualWindow && pe(this.actualWindow));
        }, n.serialize = function() {
          return this.serializedWindow;
        }, e.unwrap = function(r) {
          return e.isProxyWindow(r) ? r.unwrap() : r;
        }, e.serialize = function(r, o) {
          var i = o.send;
          return Ut(), e.toProxyWindow(r, {
            send: i
          }).serialize();
        }, e.deserialize = function(r, o) {
          var i = o.send;
          return Ut(), ue("idToProxyWindow").get(r.id) || new e({
            serializedWindow: r,
            send: i
          });
        }, e.isProxyWindow = function(r) {
          return !!(r && !Hn(r) && r.isProxyWindow);
        }, e.toProxyWindow = function(r, o) {
          var i = o.send;
          if (Ut(), e.isProxyWindow(r)) return r;
          var s = r;
          return Be("winToProxyWindow").get(s) || new e({
            win: s,
            send: i
          });
        }, e;
      }();
      function $t(e, n, r, o, i) {
        var s = Be("methodStore"), u = ue("proxyWindowMethods");
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
      function Xo(e, n) {
        var r = Be("methodStore"), o = ue("proxyWindowMethods");
        return r.getOrSet(e, function() {
          return {};
        })[n] || o.get(n);
      }
      function Qo(e, n, r, o, i) {
        u = (s = {
          on: i.on,
          send: i.send
        }).on, f = s.send, ue("builtinListeners").getOrSet("functionCalls", function() {
          return u("postrobot_method", {
            domain: "*"
          }, function(g) {
            var w = g.source, p = g.origin, m = g.data, y = m.id, P = m.name, R = Xo(w, y);
            if (!R) throw new Error("Could not find method '" + P + "' with id: " + m.id + " in " + ae(window));
            var x = R.source, W = R.domain, q = R.val;
            return S.try(function() {
              if (!rn(W, p)) throw new Error("Method '" + m.name + "' domain " + JSON.stringify(Nt(R.domain) ? R.domain.source : R.domain) + " does not match origin " + p + " in " + ae(window));
              if (an.isProxyWindow(x)) return x.matchWindow(w, {
                send: f
              }).then(function(I) {
                if (!I) throw new Error("Method call '" + m.name + "' failed - proxy window does not match source in " + ae(window));
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
                  return j === void 0 && (j = []), Tt(j).map(function(_) {
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
      function ko(e, n, r, o) {
        var i, s = o.on, u = o.send;
        return function(f, d) {
          d === void 0 && (d = _a);
          var v = JSON.stringify(f, function(g) {
            var w = this[g];
            if (Mt(this)) return w;
            var p = Bo(w);
            if (!p) return w;
            var m = d[p] || Wa[p];
            return m ? m(w, g) : w;
          });
          return v === void 0 ? "undefined" : v;
        }(r, ((i = {}).promise = function(f, d) {
          return function(v, g, w, p, m) {
            return Vn("cross_domain_zalgo_promise", {
              then: Qo(v, g, function(y, P) {
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
          return Qo(e, n, f, d, {
            on: s,
            send: u
          });
        }, i.object = function(f) {
          return Hn(f) || an.isProxyWindow(f) ? Vn("cross_domain_window", an.serialize(f, {
            send: u
          })) : f;
        }, i));
      }
      function ei(e, n, r, o) {
        var i, s = o.send;
        return function(u, f) {
          if (f === void 0 && (f = Ma), u !== "undefined") return JSON.parse(u, function(d, v) {
            if (Mt(this)) return v;
            var g, w;
            if (Mt(v) ? (g = v.__type__, w = v.__val__) : (g = Bo(v), w = v), !g) return w;
            var p = f[g] || Aa[g];
            return p ? p(w, d) : w;
          });
        }(r, ((i = {}).cross_domain_zalgo_promise = function(u) {
          return function(f, d, v) {
            return new S(v.then);
          }(0, 0, u);
        }, i.cross_domain_function = function(u) {
          return function(f, d, v, g) {
            var w = v.id, p = v.name, m = g.send, y = function(R) {
              R === void 0 && (R = {});
              function x() {
                var W = arguments;
                return an.toProxyWindow(f, {
                  send: m
                }).awaitWindow().then(function(q) {
                  var I = Xo(q, w);
                  if (I && I.val !== x) return I.val.apply({
                    source: window,
                    origin: ae()
                  }, W);
                  var j = [].slice.call(W);
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
          return an.deserialize(u, {
            send: s
          });
        }, i));
      }
      var Cr = {};
      Cr.postrobot_post_message = function(e, n, r) {
        r.indexOf("file:") === 0 && (r = "*"), e.postMessage(n, r);
      }, Cr.postrobot_bridge = function(e, n, r) {
        if (!zt() && !Go()) throw new Error("Bridge not needed for browser");
        if (he(e)) throw new Error("Post message through bridge disabled between same domain windows");
        if (Ur(window, e) !== !1) throw new Error("Can only use bridge to communicate between two different windows, not between frames");
        (function(o, i, s) {
          var u = jr(window, o), f = jr(o, window);
          if (!u && !f) throw new Error("Can only send messages to and from parent and popup windows");
          Lt(o).then(function(d) {
            return d(o, i, s);
          });
        })(e, r, n);
      }, Cr.postrobot_global = function(e, n) {
        if (!Er(window).match(/MSIE|rv:11|trident|edge\/12|edge\/13/i)) throw new Error("Global messaging not needed for browser");
        if (!he(e)) throw new Error("Post message through global disabled between different domain windows");
        if (Ur(window, e) !== !1) throw new Error("Can only use global to communicate between two different windows, not between frames");
        var r = yn(e);
        if (!r) throw new Error("Can not find postRobot global on foreign window");
        r.receiveMessage({
          source: window,
          origin: ae(),
          data: n
        });
      };
      function Bt(e, n, r, o) {
        var i = o.on, s = o.send;
        return S.try(function() {
          var u = Be().getOrSet(e, function() {
            return {};
          });
          return u.buffer = u.buffer || [], u.buffer.push(r), u.flush = u.flush || S.flush().then(function() {
            if (pe(e)) throw new Error("Window is closed");
            var f = ko(e, n, ((d = {}).__post_robot_11_0_0__ = u.buffer || [], d), {
              on: i,
              send: s
            }), d;
            delete u.buffer;
            for (var v = Object.keys(Cr), g = [], w = 0; w < v.length; w++) {
              var p = v[w];
              try {
                Cr[p](e, f, n);
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
        }).then(ve);
      }
      function ni(e) {
        return ue("responseListeners").get(e);
      }
      function ri(e) {
        ue("responseListeners").del(e);
      }
      function ti(e) {
        return ue("erroredResponseListeners").has(e);
      }
      function oi(e) {
        var n = e.name, r = e.win, o = e.domain, i = Be("requestListeners");
        if (r === "*" && (r = null), o === "*" && (o = null), !n) throw new Error("Name required to get request listener");
        for (var s = 0, u = [r, Qr()]; s < u.length; s++) {
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
      function qt(e, n) {
        var r = n.on, o = n.send, i = ue("receivedMessages");
        try {
          if (!window || window.closed || !e.source) return;
        } catch {
          return;
        }
        var s = e.source, u = e.origin, f = function(w, p, m, y) {
          var P = y.on, R = y.send, x;
          try {
            x = ei(p, m, w, {
              on: P,
              send: R
            });
          } catch {
            return;
          }
          if (x && typeof x == "object" && x !== null) {
            var W = x.__post_robot_11_0_0__;
            if (Array.isArray(W)) return W;
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
            if (i.set(w.id, !0), pe(s) && !w.fireAndForget) return {
              v: void 0
            };
            w.origin.indexOf("file:") === 0 && (u = "file://");
            try {
              w.type === "postrobot_message_request" ? function(p, m, y, P) {
                var R = P.on, x = P.send, W = oi({
                  name: y.name,
                  win: p,
                  domain: m
                }), q = y.name === "postrobot_method" && y.data && typeof y.data.name == "string" ? y.data.name + "()" : y.name;
                function I(j, _, Z) {
                  return S.flush().then(function() {
                    if (!y.fireAndForget && !pe(p)) try {
                      return Bt(p, m, {
                        id: qe(),
                        origin: ae(window),
                        type: "postrobot_message_response",
                        hash: y.hash,
                        name: y.name,
                        ack: j,
                        data: _,
                        error: Z
                      }, {
                        on: R,
                        send: x
                      });
                    } catch (L) {
                      throw new Error("Send response message failed for " + q + " in " + ae() + `

` + ar(L));
                    }
                  });
                }
                S.all([S.flush().then(function() {
                  if (!y.fireAndForget && !pe(p)) try {
                    return Bt(p, m, {
                      id: qe(),
                      origin: ae(window),
                      type: "postrobot_message_ack",
                      hash: y.hash,
                      name: y.name
                    }, {
                      on: R,
                      send: x
                    });
                  } catch (j) {
                    throw new Error("Send ack message failed for " + q + " in " + ae() + `

` + ar(j));
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
                })]).then(ve).catch(function(j) {
                  if (W && W.handleError) return W.handleError(j);
                  throw j;
                });
              }(s, u, w, {
                on: r,
                send: o
              }) : w.type === "postrobot_message_response" ? function(p, m, y) {
                if (!ti(y.hash)) {
                  var P = ni(y.hash);
                  if (!P) throw new Error("No handler found for post message response for message: " + y.name + " from " + m + " in " + window.location.protocol + "//" + window.location.host + window.location.pathname);
                  if (!rn(P.domain, m)) throw new Error("Response origin " + m + " does not match domain " + (R = P.domain, Array.isArray(R) ? "(" + R.join(" | ") + ")" : Ve(R) ? "RegExp(" + R.toString() + ")" : R.toString()));
                  var R;
                  if (p !== P.win) throw new Error("Response source does not match registered window");
                  ri(y.hash), y.ack === "error" ? P.promise.reject(y.error) : y.ack === "success" && P.promise.resolve({
                    source: p,
                    origin: m,
                    data: y.data
                  });
                }
              }(s, u, w) : w.type === "postrobot_message_ack" && function(p, m, y) {
                if (!ti(y.hash)) {
                  var P = ni(y.hash);
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
          var f = s.name, d = s.win, v = s.domain, g = Be("requestListeners");
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
                }, ve);
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
            for (var R = [], x = 0, W = v; x < W.length; x++) R.push(i({
              name: f,
              win: p,
              domain: W[x]
            }, u));
            return {
              cancel: function() {
                for (var oe = 0; oe < R.length; oe++) R[oe].cancel();
              }
            };
          }
          var q = oi({
            name: f,
            win: p,
            domain: v
          });
          p && p !== "*" || (p = Qr());
          var I = (v = v || "*").toString();
          if (q) throw p && v ? new Error("Request listener already exists for " + f + " on domain " + v.toString() + " for " + (p === Qr() ? "wildcard" : "specified") + " window") : p ? new Error("Request listener already exists for " + f + " for " + (p === Qr() ? "wildcard" : "specified") + " window") : v ? new Error("Request listener already exists for " + f + " on domain " + v.toString()) : new Error("Request listener already exists for " + f);
          var j = g.getOrSet(p, function() {
            return {};
          }), _ = Rr(j, f, function() {
            return {};
          }), Z, L;
          return Nt(v) ? (Z = Rr(_, "__domain_regex__", function() {
            return [];
          })).push(L = {
            regex: v,
            listener: u
          }) : _[I] = u, {
            cancel: function() {
              delete _[I], L && (Z.splice(Z.indexOf(L, 1)), Z.length || delete _.__domain_regex__), Object.keys(_).length || delete j[f], p && !Object.keys(j).length && g.del(p);
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
          return S.try(function() {
            if (function(g, w, p) {
              if (!g) throw new Error("Expected name");
              if (p && typeof p != "string" && !Array.isArray(p) && !Nt(p)) throw new TypeError("Can not send " + g + ". Expected domain " + JSON.stringify(p) + " to be a string, array, or regex");
              if (pe(w)) throw new Error("Can not send " + g + ". Target window is closed");
            }(r, v, s), function(g, w) {
              var p = Pr(w);
              if (p) return p === g;
              if (w === g || On(w) === w) return !1;
              for (var m = 0, y = tr(g); m < y.length; m++) if (y[m] === w) return !0;
              return !1;
            }(window, v)) return Uo(v, f);
          }).then(function(g) {
            return function(w, p, m, y) {
              var P = y.send;
              return S.try(function() {
                return typeof p == "string" ? p : S.try(function() {
                  return m || At(w, {
                    send: P
                  }).then(function(R) {
                    return R.domain;
                  });
                }).then(function(R) {
                  if (!rn(p, p)) throw new Error("Domain " + Vr(p) + " does not match " + Vr(p));
                  return R;
                });
              });
            }(v, s, (g === void 0 ? {} : g).domain, {
              send: e
            });
          }).then(function(g) {
            var w = g, p = r === "postrobot_method" && o && typeof o.name == "string" ? o.name + "()" : r, m = new S(), y = r + "_" + qe();
            if (!d) {
              var P = {
                name: r,
                win: v,
                domain: w,
                promise: m
              };
              (function(_, Z) {
                ue("responseListeners").set(_, Z);
              })(y, P);
              var R = Be("requestPromises").getOrSet(v, function() {
                return [];
              });
              R.push(m), m.catch(function() {
                (function(_) {
                  ue("erroredResponseListeners").set(_, !0);
                })(y), ri(y);
              });
              var x = function(_) {
                return Be("knownWindows").get(_, !1);
              }(v) ? 1e4 : 2e3, W = u, q = x, I = W, j = Sr(function() {
                return pe(v) ? m.reject(new Error("Window closed for " + r + " before " + (P.ack ? "response" : "ack"))) : P.cancelled ? m.reject(new Error("Response listener was cancelled for " + r)) : (q = Math.max(q - 500, 0), I !== -1 && (I = Math.max(I - 500, 0)), P.ack || q !== 0 ? I === 0 ? m.reject(new Error("No response for postMessage " + p + " in " + ae() + " in " + W + "ms")) : void 0 : m.reject(new Error("No ack for postMessage " + p + " in " + ae() + " in " + x + "ms")));
              }, 500);
              m.finally(function() {
                j.cancel(), R.splice(R.indexOf(m, 1));
              }).catch(ve);
            }
            return Bt(v, w, {
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
            }, function(_) {
              throw new Error("Send request message failed for " + p + " in " + ae() + `

` + ar(_));
            });
          });
        });
      };
      function Nr(e) {
        return an.toProxyWindow(e, {
          send: pn
        });
      }
      function ii(e) {
        for (var n = 0, r = Be("requestPromises").get(e, []); n < r.length; n++) r[n].reject(new Error("Window " + (pe(e) ? "closed" : "cleaned up") + " before response")).catch(ve);
      }
      var _n;
      _n = {
        setupBridge: Yo,
        openBridge: function(e, n) {
          var r = ue("bridges"), o = ue("bridgeFrames");
          return n = n || Sn(e), r.getOrSet(n, function() {
            return S.try(function() {
              if (ae() === n) throw new Error("Can not open bridge on the same domain as current domain: " + n);
              var i = Ft(n);
              if (br(window, i)) throw new Error("Frame with name " + i + " already exists on page");
              var s = function(u, f) {
                var d = document.createElement("iframe");
                return d.setAttribute("name", u), d.setAttribute("id", u), d.setAttribute("style", "display: none; margin: 0; padding: 0; border: 0px none; overflow: hidden;"), d.setAttribute("frameborder", "0"), d.setAttribute("border", "0"), d.setAttribute("scrolling", "no"), d.setAttribute("allowTransparency", "true"), d.setAttribute("tabindex", "-1"), d.setAttribute("hidden", "true"), d.setAttribute("title", ""), d.setAttribute("role", "presentation"), d.src = f, d;
              }(i, e);
              return o.set(n, s), za.then(function(u) {
                u.appendChild(s);
                var f = s.contentWindow;
                return new S(function(d, v) {
                  s.addEventListener("load", d), s.addEventListener("error", v);
                }).then(function() {
                  return Uo(f, 5e3, "Bridge " + e);
                }).then(function() {
                  return f;
                });
              });
            });
          });
        },
        linkWindow: kr,
        linkUrl: function(e, n) {
          kr({
            win: e,
            domain: Sn(n)
          });
        },
        isBridge: Go,
        needsBridge: Vo,
        needsBridgeForBrowser: zt,
        hasBridge: function(e, n) {
          return ue("bridges").has(n || Sn(e));
        },
        needsBridgeForWin: qo,
        needsBridgeForDomain: Ho,
        destroyBridges: function() {
          for (var e = ue("bridges"), n = ue("bridgeFrames"), r = 0, o = n.keys(); r < o.length; r++) {
            var i = n.get(o[r]);
            i && i.parentNode && i.parentNode.removeChild(i);
          }
          n.reset(), e.reset();
        }
      };
      function xr(e) {
        if (!he(e)) throw new Error("Can not get global for window on different domain");
        return e.__zoid_10_3_3__ || (e.__zoid_10_3_3__ = {}), e.__zoid_10_3_3__;
      }
      function ai(e, n) {
        try {
          return n(xr(e));
        } catch {
        }
      }
      function et(e) {
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
      function Fa(e) {
        return Ot(JSON.stringify(e));
      }
      function Ht(e) {
        var n = xr(e);
        return n.references = n.references || {}, n.references;
      }
      function si(e) {
        var n = e.data, r = e.metaData, o = e.sender, i = e.receiver, s = e.passByReference, u = s !== void 0 && s, f = e.basic, d = f !== void 0 && f, v = Nr(i.win), g = d ? JSON.stringify(n) : ko(v, i.domain, n, {
          on: Rn,
          send: pn
        }), w = u ? function(p) {
          var m = qe();
          return Ht(window)[m] = p, {
            type: "uid",
            uid: m
          };
        }(g) : {
          type: "raw",
          val: g
        };
        return {
          serializedData: Fa({
            sender: {
              domain: o.domain
            },
            metaData: r,
            reference: w
          }),
          cleanReference: function() {
            p = window, (m = w).type === "uid" && delete Ht(p)[m.uid];
            var p, m;
          }
        };
      }
      function ui(e) {
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
          if (w.type === "uid") return Ht(g)[w.uid];
          throw new Error("Unsupported ref type: " + w.type);
        }(f, s);
        return {
          data: o ? JSON.parse(v) : function(g, w, p) {
            return ei(g, w, p, {
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
      var de = {
        STRING: "string",
        OBJECT: "object",
        FUNCTION: "function",
        BOOLEAN: "boolean",
        NUMBER: "number",
        ARRAY: "array"
      }, nt = {
        JSON: "json",
        DOTIFY: "dotify",
        BASE64: "base64"
      }, Pe = Ge, we = {
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
      function ci(e) {
        return "__zoid__" + e.name + "__" + e.serializedPayload + "__";
      }
      function Vt(e) {
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
      var La = Dn(function(e) {
        var n = ui({
          data: Vt(e).serializedInitialPayload,
          sender: {
            win: function(r) {
              return function(o) {
                if (o.type === "opener") return Kr("opener", ke(window));
                if (o.type === "parent" && typeof o.distance == "number") return Kr("parent", function(w, p) {
                  return p === void 0 && (p = 1), function(m, y) {
                    y === void 0 && (y = 1);
                    for (var P = m, R = 0; R < y; R++) {
                      if (!P) return;
                      P = be(P);
                    }
                    return P;
                  }(w, gt(w) - p);
                }(window, o.distance));
                if (o.type === "global" && o.uid && typeof o.uid == "string") {
                  var i = o.uid, s = Pr(window);
                  if (!s) throw new Error("Can not find ancestor window");
                  for (var u = 0, f = gn(s); u < f.length; u++) {
                    var d = f[u];
                    if (he(d)) {
                      var v = ai(d, function(w) {
                        return w.windows && w.windows[i];
                      });
                      if (v) return v;
                    }
                  }
                } else if (o.type === "name") {
                  var g = o.name;
                  return Kr("namedWindow", function(w, p) {
                    return br(w, p) || function m(y, P) {
                      var R = br(y, P);
                      if (R) return R;
                      for (var x = 0, W = tr(y); x < W.length; x++) {
                        var q = m(W[x], P);
                        if (q) return q;
                      }
                    }(On(w) || w, p);
                  }(Kr("ancestor", Pr(window)), g));
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
      function di() {
        return La(window.name);
      }
      function ja(e, n) {
        if (n === void 0 && (n = window), e === be(n)) return {
          type: "parent",
          distance: gt(e)
        };
        if (e === ke(n)) return {
          type: "opener"
        };
        if (he(e) && (o = e, o !== On(o))) {
          var r = en(e).name;
          if (r) return {
            type: "name",
            name: r
          };
        }
        var o;
      }
      function fi(e, n, r, o, i) {
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
      function Ua() {
        return S.try(function() {
          window.focus();
        });
      }
      function li() {
        return S.try(function() {
          window.close();
        });
      }
      var Tn = function() {
        return ve;
      }, Gn = function(e) {
        return Hr(e.value);
      };
      function Gt(e, n, r) {
        for (var o = 0, i = Object.keys(O({}, e, n)); o < i.length; o++) {
          var s = i[o];
          r(s, n[s], e[s]);
        }
      }
      function hi(e, n, r) {
        var o = {};
        return S.all(function(i, s, u) {
          var f = [];
          return Gt(i, s, function(d, v, g) {
            var w = function(p, m, y) {
              return S.resolve().then(function() {
                var P, R;
                if (y != null && m) {
                  var x = (P = {}, P.get = m.queryParam, P.post = m.bodyParam, P)[r], W = (R = {}, R.get = m.queryValue, R.post = m.bodyValue, R)[r];
                  if (x) return S.hash({
                    finalParam: S.try(function() {
                      return typeof x == "function" ? x({
                        value: y
                      }) : typeof x == "string" ? x : p;
                    }),
                    finalValue: S.try(function() {
                      return typeof W == "function" && Wn(y) ? W({
                        value: y
                      }) : y;
                    })
                  }).then(function(q) {
                    var I = q.finalParam, j = q.finalValue, _;
                    if (typeof j == "boolean") _ = j.toString();
                    else if (typeof j == "string") _ = j.toString();
                    else if (typeof j == "object" && j !== null) {
                      if (m.serialization === nt.JSON) _ = JSON.stringify(j);
                      else if (m.serialization === nt.BASE64) _ = Ot(JSON.stringify(j));
                      else if (m.serialization === nt.DOTIFY || !m.serialization) {
                        _ = function ee(G, U, te) {
                          U === void 0 && (U = ""), te === void 0 && (te = {}), U = U && U + ".";
                          for (var X in G) G.hasOwnProperty(X) && G[X] != null && typeof G[X] != "function" && (G[X] && Array.isArray(G[X]) && G[X].length && G[X].every(function(Oe) {
                            return typeof Oe != "object";
                          }) ? te["" + U + X + "[]"] = G[X].join(",") : G[X] && typeof G[X] == "object" ? te = ee(G[X], "" + U + X, te) : te["" + U + X] = G[X].toString());
                          return te;
                        }(j, p);
                        for (var Z = 0, L = Object.keys(_); Z < L.length; Z++) {
                          var oe = L[Z];
                          o[oe] = _[oe];
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
      function pi(e) {
        var n = e.uid, r = e.options, o = e.overrides, i = o === void 0 ? {} : o, s = e.parentWin, u = s === void 0 ? window : s, f = r.propsDef, d = r.containerTemplate, v = r.prerenderTemplate, g = r.tag, w = r.name, p = r.attributes, m = r.dimensions, y = r.autoResize, P = r.url, R = r.domain, x = r.exports, W = new S(), q = [], I = Jr(), j = {}, _ = {}, Z = {
          visible: !0
        }, L = i.event ? i.event : (oe = {}, ee = {}, G = {
          on: function(T, N) {
            var z = ee[T] = ee[T] || [];
            z.push(N);
            var A = !1;
            return {
              cancel: function() {
                A || (A = !0, z.splice(z.indexOf(N), 1));
              }
            };
          },
          once: function(T, N) {
            var z = G.on(T, function() {
              z.cancel(), N();
            });
            return z;
          },
          trigger: function(T) {
            for (var N = arguments.length, z = new Array(N > 1 ? N - 1 : 0), A = 1; A < N; A++) z[A - 1] = arguments[A];
            var k = ee[T], J = [];
            if (k)
              for (var fe = function() {
                var Ae = k[le];
                J.push(S.try(function() {
                  return Ae.apply(void 0, z);
                }));
              }, le = 0; le < k.length; le++) fe();
            return S.all(J).then(ve);
          },
          triggerOnce: function(T) {
            if (oe[T]) return S.resolve();
            oe[T] = !0;
            for (var N = arguments.length, z = new Array(N > 1 ? N - 1 : 0), A = 1; A < N; A++) z[A - 1] = arguments[A];
            return G.trigger.apply(G, [T].concat(z));
          },
          reset: function() {
            ee = {};
          }
        }), oe, ee, G, U = i.props ? i.props : {}, te, X, Oe, En, sn, An = !1, Mn = i.onError, Cn = i.getProxyContainer, zn = i.show, Fn = i.hide, Jn = i.close, Ln = i.renderContainer, vn = i.getProxyWindow, Kn = i.setProxyWin, jn = i.openFrame, Un = i.openPrerenderFrame, Yn = i.prerender, Zn = i.open, ne = i.openPrerender, un = i.watchForUnload, re = i.getInternalState, We = i.setInternalState, Se = function() {
          return typeof m == "function" ? m({
            props: U
          }) : m;
        }, _e = function() {
          return S.try(function() {
            return i.resolveInitPromise ? i.resolveInitPromise() : W.resolve();
          });
        }, Ee = function(T) {
          return S.try(function() {
            return i.rejectInitPromise ? i.rejectInitPromise(T) : W.reject(T);
          });
        }, He = function(T) {
          for (var N = {}, z = 0, A = Object.keys(U); z < A.length; z++) {
            var k = A[z], J = f[k];
            if (!J || J.sendToChild !== !1) {
              var fe = J && J.trustedDomains && J.trustedDomains.length > 0 ? J.trustedDomains.reduce(function(le, Ae) {
                return le || rn(Ae, T);
              }, !1) : rn(T, ae(window));
              J && J.sameDomain && !fe || J && J.trustedDomains && !fe || (N[k] = U[k]);
            }
          }
          return S.hash(N);
        }, xe = function() {
          return S.try(function() {
            return re ? re() : Z;
          });
        }, Ie = function(T) {
          return S.try(function() {
            return We ? We(T) : Z = O({}, Z, T);
          });
        }, cn = function() {
          return vn ? vn() : S.try(function() {
            var T = U.window;
            if (T) {
              var N = Nr(T);
              return I.register(function() {
                return T.close();
              }), N;
            }
            return new an({
              send: pn
            });
          });
        }, Ye = function(T) {
          return Kn ? Kn(T) : S.try(function() {
            te = T;
          });
        }, wn = function() {
          return zn ? zn() : S.hash({
            setState: Ie({
              visible: !0
            }),
            showElement: X ? X.get().then(Na) : null
          }).then(ve);
        }, Nn = function() {
          return Fn ? Fn() : S.hash({
            setState: Ie({
              visible: !1
            }),
            showElement: X ? X.get().then(Io) : null
          }).then(ve);
        }, cr = function() {
          return typeof P == "function" ? P({
            props: U
          }) : P;
        }, dr = function() {
          return typeof p == "function" ? p({
            props: U
          }) : p;
        }, Xn = function() {
          return Sn(cr());
        }, Ze = function(T, N) {
          var z = N.windowName;
          return jn ? jn(T, {
            windowName: z
          }) : S.try(function() {
            if (T === Pe.IFRAME) return et(No({
              attributes: O({
                name: z,
                title: w
              }, dr().iframe)
            }));
          });
        }, Ir = function(T) {
          return Un ? Un(T) : S.try(function() {
            if (T === Pe.IFRAME) return et(No({
              attributes: O({
                name: "__zoid_prerender_frame__" + w + "_" + qe() + "__",
                title: "prerender__" + w
              }, dr().iframe)
            }));
          });
        }, Dr = function(T, N, z) {
          return ne ? ne(T, N, z) : S.try(function() {
            if (T === Pe.IFRAME) {
              if (!z) throw new Error("Expected proxy frame to be passed");
              return z.get().then(function(A) {
                return I.register(function() {
                  return Tr(A);
                }), Dt(A).then(function(k) {
                  return en(k);
                }).then(function(k) {
                  return Nr(k);
                });
              });
            }
            if (T === Pe.POPUP) return N;
            throw new Error("No render context available for " + T);
          });
        }, fr = function() {
          return S.try(function() {
            if (te) return S.all([L.trigger(we.FOCUS), te.focus()]).then(ve);
          });
        }, rt = function() {
          var T = xr(window);
          return T.windows = T.windows || {}, T.windows[n] = window, I.register(function() {
            delete T.windows[n];
          }), n;
        }, Wr = function(T, N, z, A) {
          if (N === ae(window)) return {
            type: "global",
            uid: rt()
          };
          if (T !== window) throw new Error("Can not construct cross-domain window reference for different target window");
          if (U.window) {
            var k = A.getWindow();
            if (!k) throw new Error("Can not construct cross-domain window reference for lazy window prop");
            if (Pr(k) !== window) throw new Error("Can not construct cross-domain window reference for window prop with different ancestor");
          }
          if (z === Pe.POPUP) return {
            type: "opener"
          };
          if (z === Pe.IFRAME) return {
            type: "parent",
            distance: gt(window)
          };
          throw new Error("Can not construct window reference for child");
        }, tt = function(T, N) {
          return S.try(function() {
            var z;
            En = T, Oe = N, (z = te) == null || z.isPopup().then(function(A) {
              if ((N == null ? void 0 : N.name) !== "" && A) {
                var k;
                (k = te) == null || k.setName(N == null ? void 0 : N.name);
              }
            }).finally(function() {
              _e(), I.register(function() {
                return N.close.fireAndForget().catch(ve);
              });
            });
          });
        }, _r = function(T) {
          var N = T.width, z = T.height;
          return S.try(function() {
            L.trigger(we.RESIZE, {
              width: N,
              height: z
            });
          });
        }, Ar = function(T) {
          return S.try(function() {
            return L.trigger(we.DESTROY);
          }).catch(ve).then(function() {
            return I.all(T);
          }).then(function() {
            var N = T || new Error("Component destroyed");
            sn && ur(sn) || N.message === "Window navigated away" ? W.resolve() : W.asyncReject(N);
          });
        }, xn = Dn(function(T) {
          return S.try(function() {
            return Jn ? pe(Jn.__source__) ? void 0 : Jn() : S.try(function() {
              return L.trigger(we.CLOSE);
            }).then(function() {
              return Ar(T || new Error("Component closed"));
            });
          });
        }), mi = function(T, N) {
          var z = N.proxyWin, A = N.proxyFrame, k = N.windowName;
          return Zn ? Zn(T, {
            proxyWin: z,
            proxyFrame: A,
            windowName: k
          }) : S.try(function() {
            if (T === Pe.IFRAME) {
              if (!A) throw new Error("Expected proxy frame to be passed");
              return A.get().then(function(Re) {
                return Dt(Re).then(function(ce) {
                  return I.register(function() {
                    return Tr(Re);
                  }), I.register(function() {
                    return ii(ce);
                  }), ce;
                });
              });
            }
            if (T === Pe.POPUP) {
              var J = Se(), fe = J.width, le = fe === void 0 ? "300px" : fe, Ae = J.height, me = Ae === void 0 ? "150px" : Ae;
              le = Mo(le, window.outerWidth), me = Mo(me, window.outerWidth);
              var De = function(Re, ce) {
                var Te = (ce = ce || {}).closeOnUnload, ge = Te === void 0 ? 1 : Te, Xe = ce.name, Me = Xe === void 0 ? "" : Xe, ie = ce.width, ze = ce.height, Je = 0, Ue = 0;
                ie && (window.outerWidth ? Ue = Math.round((window.outerWidth - ie) / 2) + window.screenX : window.screen.width && (Ue = Math.round((window.screen.width - ie) / 2))), ze && (window.outerHeight ? Je = Math.round((window.outerHeight - ze) / 2) + window.screenY : window.screen.height && (Je = Math.round((window.screen.height - ze) / 2))), delete ce.closeOnUnload, delete ce.name, ie && ze && (ce = O({
                  top: Je,
                  left: Ue,
                  width: ie,
                  height: ze,
                  status: 1,
                  toolbar: 0,
                  menubar: 0,
                  resizable: 1,
                  scrollbars: 1
                }, ce));
                var Qn = Object.keys(ce).map(function(bn) {
                  if (ce[bn] != null) return bn + "=" + Vr(ce[bn]);
                }).filter(Boolean).join(","), dn;
                try {
                  dn = window.open("", Me, Qn);
                } catch (bn) {
                  throw new It("Can not open popup window - " + (bn.stack || bn.message));
                }
                if (pe(dn))
                  throw new It("Can not open popup window - blocked");
                return ge && window.addEventListener("unload", function() {
                  return dn.close();
                }), dn;
              }(0, O({
                name: k,
                width: le,
                height: me
              }, dr().popup));
              return I.register(function() {
                return po(De);
              }), I.register(function() {
                return ii(De);
              }), De;
            }
            throw new Error("No render context available for " + T);
          }).then(function(J) {
            return z.setWindow(J, {
              send: pn
            }), z.setName(k).then(function() {
              return z;
            });
          });
        }, gi = function() {
          return S.try(function() {
            var T = xo(window, "unload", Hr(function() {
              Ar(new Error("Window navigated away"));
            })), N = lo(u, Ar, 3e3);
            if (I.register(N.cancel), I.register(T.cancel), un) return un();
          });
        }, yi = function(T) {
          var N = !1;
          return T.isClosed().then(function(z) {
            return z ? (N = !0, xn(new Error("Detected component window close"))) : S.delay(200).then(function() {
              return T.isClosed();
            }).then(function(A) {
              if (A)
                return N = !0, xn(new Error("Detected component window close"));
            });
          }).then(function() {
            return N;
          });
        }, Mr = function(T) {
          return Mn ? Mn(T) : S.try(function() {
            if (q.indexOf(T) === -1)
              return q.push(T), W.asyncReject(T), L.trigger(we.ERROR, T);
          });
        }, Ei = new S(), bi = function(T) {
          return S.try(function() {
            Ei.resolve(T);
          });
        };
        tt.onError = Mr;
        var Pi = function(T, N) {
          return T({
            uid: n,
            container: N.container,
            context: N.context,
            doc: N.doc,
            frame: N.frame,
            prerenderFrame: N.prerenderFrame,
            focus: fr,
            close: xn,
            state: j,
            props: U,
            tag: g,
            dimensions: Se(),
            event: L
          });
        }, Oi = function(T, N) {
          var z = N.context;
          return Yn ? Yn(T, {
            context: z
          }) : S.try(function() {
            if (v) {
              L.trigger(we.PRERENDER);
              var A = T.getWindow();
              if (A && he(A) && function(Te) {
                try {
                  if (!Te.location.href || Te.location.href === "about:blank") return !0;
                } catch {
                }
                return !1;
              }(A)) {
                var k = (A = en(A)).document, J = Pi(v, {
                  context: z,
                  doc: k
                });
                if (J) {
                  if (J.ownerDocument !== k) throw new Error("Expected prerender template to have been created with document from child window");
                  (function(Te, ge) {
                    var Xe = ge.tagName.toLowerCase();
                    if (Xe !== "html") throw new Error("Expected element to be html, got " + Xe);
                    for (var Me = Te.document.documentElement, ie = 0, ze = Tt(Me.children); ie < ze.length; ie++) Me.removeChild(ze[ie]);
                    for (var Je = 0, Ue = Tt(ge.children); Je < Ue.length; Je++) Me.appendChild(Ue[Je]);
                  })(A, J);
                  var fe = y.width, le = fe !== void 0 && fe, Ae = y.height, me = Ae !== void 0 && Ae, De = y.element, Re = De === void 0 ? "body" : De;
                  if ((Re = xt(Re, k)) && (le || me)) {
                    var ce = Do(Re, function(Te) {
                      _r({
                        width: le ? Te.width : void 0,
                        height: me ? Te.height : void 0
                      });
                    }, {
                      width: le,
                      height: me,
                      win: A
                    });
                    L.on(we.RENDERED, ce.cancel);
                  }
                  L.trigger(we.PRERENDERED);
                }
              }
            }
          });
        }, Si = function(T, N) {
          var z = N.proxyFrame, A = N.proxyPrerenderFrame, k = N.context, J = N.rerender;
          return Ln ? Ln(T, {
            proxyFrame: z,
            proxyPrerenderFrame: A,
            context: k,
            rerender: J
          }) : S.hash({
            container: T.get(),
            frame: z ? z.get() : null,
            prerenderFrame: A ? A.get() : null,
            internalState: xe()
          }).then(function(fe) {
            var le = fe.container, Ae = fe.internalState.visible, me = Pi(d, {
              context: k,
              container: le,
              frame: fe.frame,
              prerenderFrame: fe.prerenderFrame,
              doc: document
            });
            if (me) {
              Ae || Io(me), Ca(le, me);
              var De = function(Re, ce) {
                ce = Hr(ce);
                var Te = !1, ge = [], Xe, Me, ie, ze = function() {
                  Te = !0;
                  for (var dn = 0; dn < ge.length; dn++) ge[dn].disconnect();
                  Xe && Xe.cancel(), ie && ie.removeEventListener("unload", Je), Me && Tr(Me);
                }, Je = function() {
                  Te || (ce(), ze());
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
                    }), ge.push(Qn), Ue = Ue.parentElement;
                  }
                return (Me = document.createElement("iframe")).setAttribute("name", "__detect_close_" + qe() + "__"), Me.style.display = "none", Dt(Me).then(function(dn) {
                  (ie = en(dn)).addEventListener("unload", Je);
                }), Re.appendChild(Me), Xe = Sr(function() {
                  ur(Re) && Je();
                }, 1e3), {
                  cancel: ze
                };
              }(me, function() {
                var Re = new Error("Detected container element removed from DOM");
                return S.delay(1).then(function() {
                  if (!ur(me))
                    return I.all(Re), J().then(_e, Ee);
                  xn(Re);
                });
              });
              return I.register(function() {
                return De.cancel();
              }), I.register(function() {
                return Tr(me);
              }), X = et(me);
            }
          });
        }, Ri = function() {
          return {
            state: j,
            event: L,
            close: xn,
            focus: fr,
            resize: _r,
            onError: Mr,
            updateProps: Xa,
            show: wn,
            hide: Nn
          };
        }, Yt = function(T) {
          T === void 0 && (T = {});
          var N = sn, z = Ri();
          sr(_, T), function(A, k, J, fe, le) {
            var Ae = fe.state, me = fe.close, De = fe.focus, Re = fe.event, ce = fe.onError;
            Gt(J, A, function(Te, ge, Xe) {
              var Me = !1, ie = Xe;
              Object.defineProperty(k, Te, {
                configurable: !0,
                enumerable: !0,
                get: function() {
                  return Me ? ie : (Me = !0, function() {
                    if (!ge) return ie;
                    var ze = ge.alias;
                    if (ze && !Wn(Xe) && Wn(J[ze]) && (ie = J[ze]), ge.value && (ie = ge.value({
                      props: k,
                      state: Ae,
                      close: me,
                      focus: De,
                      event: Re,
                      onError: ce,
                      container: le
                    })), !ge.default || Wn(ie) || Wn(J[Te]) || (ie = ge.default({
                      props: k,
                      state: Ae,
                      close: me,
                      focus: De,
                      event: Re,
                      onError: ce,
                      container: le
                    })), Wn(ie)) {
                      if (ge.type === de.ARRAY ? !Array.isArray(ie) : typeof ie !== ge.type) throw new TypeError("Prop is not of type " + ge.type + ": " + Te);
                    } else if (ge.required !== !1 && !Wn(J[Te])) throw new Error('Expected prop "' + Te + '" to be defined');
                    return Wn(ie) && ge.decorate && (ie = ge.decorate({
                      value: ie,
                      props: k,
                      state: Ae,
                      close: me,
                      focus: De,
                      event: Re,
                      onError: ce,
                      container: le
                    })), ie;
                  }());
                }
              });
            }), Gt(k, A, ve);
          }(f, U, _, z, N);
        }, Xa = function(T) {
          return Yt(T), W.then(function() {
            var N = Oe, z = te;
            if (N && z && En) return He(En).then(function(A) {
              return N.updateProps(A).catch(function(k) {
                return yi(z).then(function(J) {
                  if (!J) throw k;
                });
              });
            });
          });
        }, Ti = function(T) {
          return Cn ? Cn(T) : S.try(function() {
            return To(T);
          }).then(function(N) {
            return Wt(N) && (N = function z(A) {
              var k = function(Ae) {
                var me = function(De) {
                  for (; De.parentNode; ) De = De.parentNode;
                  if (Wt(De)) return De;
                }(Ae);
                if (me && me.host) return me.host;
              }(A);
              if (!k) throw new Error("Element is not in shadow dom");
              var J = "shadow-slot-" + qe(), fe = document.createElement("slot");
              fe.setAttribute("name", J), A.appendChild(fe);
              var le = document.createElement("div");
              return le.setAttribute("slot", J), k.appendChild(le), Wt(k) ? z(le) : le;
            }(N)), sn = N, et(N);
          });
        };
        return {
          init: function() {
            (function() {
              L.on(we.RENDER, function() {
                return U.onRender();
              }), L.on(we.PRERENDER, function() {
                return U.onPrerender();
              }), L.on(we.DISPLAY, function() {
                return U.onDisplay();
              }), L.on(we.RENDERED, function() {
                return U.onRendered();
              }), L.on(we.PRERENDERED, function() {
                return U.onPrerendered();
              }), L.on(we.CLOSE, function() {
                return U.onClose();
              }), L.on(we.DESTROY, function() {
                return U.onDestroy();
              }), L.on(we.RESIZE, function() {
                return U.onResize();
              }), L.on(we.FOCUS, function() {
                return U.onFocus();
              }), L.on(we.PROPS, function(T) {
                return U.onProps(T);
              }), L.on(we.ERROR, function(T) {
                return U && U.onError ? U.onError(T) : Ee(T).then(function() {
                  setTimeout(function() {
                    throw T;
                  }, 1);
                });
              }), I.register(L.reset);
            })();
          },
          render: function(T) {
            var N = T.target, z = T.container, A = T.context, k = T.rerender;
            return S.try(function() {
              var J = Xn(), fe = R || Xn();
              (function(H, Fe, Ce) {
                if (H !== window) {
                  if (!Ur(window, H)) throw new Error("Can only renderTo an adjacent frame");
                  var Le = ae();
                  if (!rn(Fe, Le) && !he(H)) throw new Error("Can not render remotely to " + Fe.toString() + " - can only render to " + Le);
                  if (Ce && typeof Ce != "string") throw new Error("Container passed to renderTo must be a string selector, got " + typeof Ce + " }");
                }
              })(N, fe, z);
              var le = S.try(function() {
                if (N !== window) return function(H, Fe) {
                  for (var Ce = {}, Le = 0, nn = Object.keys(U); Le < nn.length; Le++) {
                    var Ne = nn[Le], ln = f[Ne];
                    ln && ln.allowDelegate && (Ce[Ne] = U[Ne]);
                  }
                  var $e = pn(Fe, "zoid_delegate_" + w, {
                    uid: n,
                    overrides: {
                      props: Ce,
                      event: L,
                      close: xn,
                      onError: Mr,
                      getInternalState: xe,
                      setInternalState: Ie,
                      resolveInitPromise: _e,
                      rejectInitPromise: Ee
                    }
                  }).then(function(K) {
                    var Y = K.data.parent;
                    return I.register(function(D) {
                      if (!pe(Fe)) return Y.destroy(D);
                    }), Y.getDelegateOverrides();
                  }).catch(function(K) {
                    throw new Error(`Unable to delegate rendering. Possibly the component is not loaded in the target window.

` + ar(K));
                  });
                  return Cn = function() {
                    for (var K = arguments.length, Y = new Array(K), D = 0; D < K; D++) Y[D] = arguments[D];
                    return $e.then(function(Q) {
                      return Q.getProxyContainer.apply(Q, Y);
                    });
                  }, Ln = function() {
                    for (var K = arguments.length, Y = new Array(K), D = 0; D < K; D++) Y[D] = arguments[D];
                    return $e.then(function(Q) {
                      return Q.renderContainer.apply(Q, Y);
                    });
                  }, zn = function() {
                    for (var K = arguments.length, Y = new Array(K), D = 0; D < K; D++) Y[D] = arguments[D];
                    return $e.then(function(Q) {
                      return Q.show.apply(Q, Y);
                    });
                  }, Fn = function() {
                    for (var K = arguments.length, Y = new Array(K), D = 0; D < K; D++) Y[D] = arguments[D];
                    return $e.then(function(Q) {
                      return Q.hide.apply(Q, Y);
                    });
                  }, un = function() {
                    for (var K = arguments.length, Y = new Array(K), D = 0; D < K; D++) Y[D] = arguments[D];
                    return $e.then(function(Q) {
                      return Q.watchForUnload.apply(Q, Y);
                    });
                  }, H === Pe.IFRAME ? (vn = function() {
                    for (var K = arguments.length, Y = new Array(K), D = 0; D < K; D++) Y[D] = arguments[D];
                    return $e.then(function(Q) {
                      return Q.getProxyWindow.apply(Q, Y);
                    });
                  }, jn = function() {
                    for (var K = arguments.length, Y = new Array(K), D = 0; D < K; D++) Y[D] = arguments[D];
                    return $e.then(function(Q) {
                      return Q.openFrame.apply(Q, Y);
                    });
                  }, Un = function() {
                    for (var K = arguments.length, Y = new Array(K), D = 0; D < K; D++) Y[D] = arguments[D];
                    return $e.then(function(Q) {
                      return Q.openPrerenderFrame.apply(Q, Y);
                    });
                  }, Yn = function() {
                    for (var K = arguments.length, Y = new Array(K), D = 0; D < K; D++) Y[D] = arguments[D];
                    return $e.then(function(Q) {
                      return Q.prerender.apply(Q, Y);
                    });
                  }, Zn = function() {
                    for (var K = arguments.length, Y = new Array(K), D = 0; D < K; D++) Y[D] = arguments[D];
                    return $e.then(function(Q) {
                      return Q.open.apply(Q, Y);
                    });
                  }, ne = function() {
                    for (var K = arguments.length, Y = new Array(K), D = 0; D < K; D++) Y[D] = arguments[D];
                    return $e.then(function(Q) {
                      return Q.openPrerender.apply(Q, Y);
                    });
                  }) : H === Pe.POPUP && (Kn = function() {
                    for (var K = arguments.length, Y = new Array(K), D = 0; D < K; D++) Y[D] = arguments[D];
                    return $e.then(function(Q) {
                      return Q.setProxyWin.apply(Q, Y);
                    });
                  }), $e;
                }(A, N);
              }), Ae = U.window, me = gi(), De = hi(f, U, "post"), Re = L.trigger(we.RENDER), ce = Ti(z), Te = cn(), ge = ce.then(function() {
                return Yt();
              }), Xe = ge.then(function() {
                return hi(f, U, "get").then(function(H) {
                  return function(Fe, Ce) {
                    var Le = Ce.query || {}, nn = Ce.hash || {}, Ne, ln, $e = Fe.split("#");
                    ln = $e[1];
                    var K = (Ne = $e[0]).split("?");
                    Ne = K[0];
                    var Y = Ro(K[1], Le), D = Ro(ln, nn);
                    return Y && (Ne = Ne + "?" + Y), D && (Ne = Ne + "#" + D), Ne;
                  }(yt(cr()), {
                    query: H
                  });
                });
              }), Me = Te.then(function(H) {
                return function(Ce) {
                  var Le = Ce === void 0 ? {} : Ce, nn = Le.proxyWin, Ne = Le.initialChildDomain, ln = Le.childDomainMatch, $e = Le.target, K = $e === void 0 ? window : $e, Y = Le.context;
                  return function(D) {
                    var Q = D === void 0 ? {} : D, Zt = Q.proxyWin, os = Q.childDomainMatch, is = Q.context;
                    return He(Q.initialChildDomain).then(function(as) {
                      return {
                        uid: n,
                        context: is,
                        tag: g,
                        childDomainMatch: os,
                        version: "10_3_3",
                        props: as,
                        exports: (xi = Zt, {
                          init: function(ss) {
                            return tt(this.origin, ss);
                          },
                          close: xn,
                          checkClose: function() {
                            return yi(xi);
                          },
                          resize: _r,
                          onError: Mr,
                          show: wn,
                          hide: Nn,
                          export: bi
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
                    var Q = si({
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
                    }), Zt = Q.serializedData;
                    return I.register(Q.cleanReference), Zt;
                  });
                }({
                  proxyWin: (Fe = {
                    proxyWin: H,
                    initialChildDomain: J,
                    childDomainMatch: fe,
                    target: N,
                    context: A
                  }).proxyWin,
                  initialChildDomain: Fe.initialChildDomain,
                  childDomainMatch: Fe.childDomainMatch,
                  target: Fe.target,
                  context: Fe.context
                }).then(function(Ce) {
                  return ci({
                    name: w,
                    serializedPayload: Ce
                  });
                });
                var Fe;
              }), ie = Me.then(function(H) {
                return Ze(A, {
                  windowName: H
                });
              }), ze = Ir(A), Je = S.hash({
                proxyContainer: ce,
                proxyFrame: ie,
                proxyPrerenderFrame: ze
              }).then(function(H) {
                return Si(H.proxyContainer, {
                  context: A,
                  proxyFrame: H.proxyFrame,
                  proxyPrerenderFrame: H.proxyPrerenderFrame,
                  rerender: k
                });
              }).then(function(H) {
                return H;
              }), Ue = S.hash({
                windowName: Me,
                proxyFrame: ie,
                proxyWin: Te
              }).then(function(H) {
                var Fe = H.proxyWin;
                return Ae ? Fe : mi(A, {
                  windowName: H.windowName,
                  proxyWin: Fe,
                  proxyFrame: H.proxyFrame
                });
              }), Qn = S.hash({
                proxyWin: Ue,
                proxyPrerenderFrame: ze
              }).then(function(H) {
                return Dr(A, H.proxyWin, H.proxyPrerenderFrame);
              }), dn = Ue.then(function(H) {
                return te = H, Ye(H);
              }), bn = S.hash({
                proxyPrerenderWin: Qn,
                state: dn
              }).then(function(H) {
                return Oi(H.proxyPrerenderWin, {
                  context: A
                });
              }), Ci = S.hash({
                proxyWin: Ue,
                windowName: Me
              }).then(function(H) {
                if (Ae) return H.proxyWin.setName(H.windowName);
              }), Qa = S.hash({
                body: De
              }).then(function(H) {
                return r.method ? r.method : Object.keys(H.body).length ? "post" : "get";
              }), Ni = S.hash({
                proxyWin: Ue,
                windowUrl: Xe,
                body: De,
                method: Qa,
                windowName: Ci,
                prerender: bn
              }).then(function(H) {
                return H.proxyWin.setLocation(H.windowUrl, {
                  method: H.method,
                  body: H.body
                });
              }), ka = Ue.then(function(H) {
                (function Fe(Ce, Le) {
                  var nn = !1;
                  return I.register(function() {
                    nn = !0;
                  }), S.delay(2e3).then(function() {
                    return Ce.isClosed();
                  }).then(function(Ne) {
                    if (!nn) {
                      if (Le === Pe.POPUP && Ne) return xn(new Error("Detected popup close"));
                      var ln = !!(sn && ur(sn));
                      return Le === Pe.IFRAME && Ne && (ln || An) ? xn(new Error("Detected iframe close")) : Fe(Ce, Le);
                    }
                  });
                })(H, A);
              }), es = S.hash({
                container: Je,
                prerender: bn
              }).then(function() {
                return L.trigger(we.DISPLAY);
              }), ns = Ue.then(function(H) {
                return function(Fe, Ce, Le) {
                  return S.try(function() {
                    return Fe.awaitWindow();
                  }).then(function(nn) {
                    if (_n && _n.needsBridge({
                      win: nn,
                      domain: Ce
                    }) && !_n.hasBridge(Ce, Ce)) {
                      var Ne = typeof r.bridgeUrl == "function" ? r.bridgeUrl({
                        props: U
                      }) : r.bridgeUrl;
                      if (!Ne) throw new Error("Bridge needed to render " + Le);
                      var ln = Sn(Ne);
                      return _n.linkUrl(nn, Ce), _n.openBridge(yt(Ne), ln);
                    }
                  });
                }(H, J, A);
              }), rs = Ni.then(function() {
                return S.try(function() {
                  var H = U.timeout;
                  if (H) return W.timeout(H, new Error("Loading component timed out after " + H + " milliseconds"));
                });
              }), ts = W.then(function() {
                return An = !0, L.trigger(we.RENDERED);
              });
              return S.hash({
                initPromise: W,
                buildUrlPromise: Xe,
                onRenderPromise: Re,
                getProxyContainerPromise: ce,
                openFramePromise: ie,
                openPrerenderFramePromise: ze,
                renderContainerPromise: Je,
                openPromise: Ue,
                openPrerenderPromise: Qn,
                setStatePromise: dn,
                prerenderPromise: bn,
                loadUrlPromise: Ni,
                buildWindowNamePromise: Me,
                setWindowNamePromise: Ci,
                watchForClosePromise: ka,
                onDisplayPromise: es,
                openBridgePromise: ns,
                runTimeoutPromise: rs,
                onRenderedPromise: ts,
                delegatePromise: le,
                watchForUnloadPromise: me,
                finalSetPropsPromise: ge
              });
            }).catch(function(J) {
              return S.all([Mr(J), Ar(J)]).then(function() {
                throw J;
              }, function() {
                throw J;
              });
            }).then(ve);
          },
          destroy: Ar,
          getProps: function() {
            return U;
          },
          setProps: Yt,
          export: bi,
          getHelpers: Ri,
          getDelegateOverrides: function() {
            return S.try(function() {
              return {
                getProxyContainer: Ti,
                show: wn,
                hide: Nn,
                renderContainer: Si,
                getProxyWindow: cn,
                watchForUnload: gi,
                openFrame: Ze,
                openPrerenderFrame: Ir,
                prerender: Oi,
                open: mi,
                openPrerender: Dr,
                setProxyWin: Ye
              };
            });
          },
          getExports: function() {
            return x({
              getExports: function() {
                return Ei;
              }
            });
          }
        };
      }
      var $a = {
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
              this.state && this.state.parent && this.state.parent.updateProps(sr({}, this.props)).catch(ve);
            }, f;
          }(i.Component);
        }
      }, Ba = {
        register: function(e, n, r, o) {
          return o.component(e, {
            render: function(i) {
              return i("div");
            },
            inheritAttrs: !1,
            mounted: function() {
              var i = this.$el;
              this.parent = r(O({}, (s = this.$attrs, Object.keys(s).reduce(function(u, f) {
                var d = s[f];
                return f === "style-object" || f === "styleObject" ? (u.style = d, u.styleObject = d) : f.includes("-") ? u[Rt(f)] = d : u[f] = d, u;
              }, {}))));
              var s;
              this.parent.render(i, Pe.IFRAME);
            },
            watch: {
              $attrs: {
                handler: function() {
                  this.parent && this.$attrs && this.parent.updateProps(O({}, this.$attrs)).catch(ve);
                },
                deep: !0
              }
            }
          });
        }
      }, qa = {
        register: function(e, n, r) {
          return {
            template: "<div></div>",
            inheritAttrs: !1,
            mounted: function() {
              var o = this.$el;
              this.parent = r(O({}, (i = this.$attrs, Object.keys(i).reduce(function(s, u) {
                var f = i[u];
                return u === "style-object" || u === "styleObject" ? (s.style = f, s.styleObject = f) : u.includes("-") ? s[Rt(u)] = f : s[u] = f, s;
              }, {}))));
              var i;
              this.parent.render(o, Pe.IFRAME);
            },
            watch: {
              $attrs: {
                handler: function() {
                  this.parent && this.$attrs && this.parent.updateProps(O({}, this.$attrs)).catch(ve);
                },
                deep: !0
              }
            }
          };
        }
      }, Ha = {
        register: function(e, n, r, o) {
          return o.module(e, []).directive(Rt(e), function() {
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
                  return Gr(f.props, function(p) {
                    return typeof p == "function" ? function() {
                      var m = p.apply(this, arguments);
                      return v(), m;
                    } : p;
                  });
                }, w = r(g());
                w.render(d[0], Pe.IFRAME), f.$watch(function() {
                  w.updateProps(g()).catch(ve);
                });
              }]
            };
          });
        }
      }, Va = {
        register: function(e, n, r, o) {
          var i = o.Component, s = o.NgModule, u = o.ElementRef, f = o.NgZone, d = o.Inject, v = function() {
            function w(m, y) {
              this.elementRef = void 0, this.internalProps = void 0, this.parent = void 0, this.props = void 0, this.zone = void 0, this._props = void 0, this._props = {}, this.elementRef = m, this.zone = y;
            }
            var p = w.prototype;
            return p.getProps = function() {
              var m = this;
              return Gr(O({}, this.internalProps, this.props), function(y) {
                if (typeof y == "function") {
                  var P = m.zone;
                  return function() {
                    var R = arguments, x = this;
                    return P.run(function() {
                      return y.apply(x, R);
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
      function Ga(e) {
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
        `)), g.appendChild(r), g.appendChild(o), g.appendChild(w), o.classList.add("zoid-visible"), r.classList.add("zoid-invisible"), u.on(we.RENDERED, function() {
            o.classList.remove("zoid-visible"), o.classList.add("zoid-invisible"), r.classList.remove("zoid-invisible"), r.classList.add("zoid-visible"), setTimeout(function() {
              Tr(o);
            }, 1);
          }), u.on(we.RESIZE, function(p) {
            var m = p.width, y = p.height;
            typeof m == "number" && (g.style.width = Ao(m)), typeof y == "number" && (g.style.height = Ao(y));
          }), g;
        }
      }
      function Ja(e) {
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
      var Jt = Jr(), Kt = Jr();
      function Ka(e) {
        var n = function(y) {
          var P = y.tag, R = y.url, x = y.domain, W = y.bridgeUrl, q = y.props, I = q === void 0 ? {} : q, j = y.dimensions, _ = j === void 0 ? {} : j, Z = y.autoResize, L = Z === void 0 ? {} : Z, oe = y.allowedParentDomains, ee = oe === void 0 ? "*" : oe, G = y.attributes, U = G === void 0 ? {} : G, te = y.defaultContext, X = te === void 0 ? Pe.IFRAME : te, Oe = y.containerTemplate, En = Oe === void 0 ? Ga : Oe, sn = y.prerenderTemplate, An = sn === void 0 ? Ja : sn, Mn = y.validate, Cn = y.eligible, zn = Cn === void 0 ? function() {
            return {
              eligible: !0
            };
          } : Cn, Fn = y.logger, Jn = Fn === void 0 ? {
            info: ve
          } : Fn, Ln = y.exports, vn = Ln === void 0 ? ve : Ln, Kn = y.method, jn = y.children, Un = jn === void 0 ? function() {
            return {};
          } : jn, Yn = P.replace(/-/g, "_"), Zn = O({}, {
            window: {
              type: de.OBJECT,
              sendToChild: !1,
              required: !1,
              allowDelegate: !0,
              validate: function(ne) {
                var un = ne.value;
                if (!Hn(un) && !an.isProxyWindow(un)) throw new Error("Expected Window or ProxyWindow");
                if (Hn(un)) {
                  if (pe(un)) throw new Error("Window is closed");
                  if (!he(un)) throw new Error("Window is not same domain");
                }
              },
              decorate: function(ne) {
                return Nr(ne.value);
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
              default: Tn,
              decorate: Gn
            },
            onRendered: {
              type: de.FUNCTION,
              required: !1,
              sendToChild: !1,
              default: Tn,
              decorate: Gn
            },
            onRender: {
              type: de.FUNCTION,
              required: !1,
              sendToChild: !1,
              default: Tn,
              decorate: Gn
            },
            onPrerendered: {
              type: de.FUNCTION,
              required: !1,
              sendToChild: !1,
              default: Tn,
              decorate: Gn
            },
            onPrerender: {
              type: de.FUNCTION,
              required: !1,
              sendToChild: !1,
              default: Tn,
              decorate: Gn
            },
            onClose: {
              type: de.FUNCTION,
              required: !1,
              sendToChild: !1,
              allowDelegate: !0,
              default: Tn,
              decorate: Gn
            },
            onDestroy: {
              type: de.FUNCTION,
              required: !1,
              sendToChild: !1,
              allowDelegate: !0,
              default: Tn,
              decorate: Gn
            },
            onResize: {
              type: de.FUNCTION,
              required: !1,
              sendToChild: !1,
              allowDelegate: !0,
              default: Tn
            },
            onFocus: {
              type: de.FUNCTION,
              required: !1,
              sendToChild: !1,
              allowDelegate: !0,
              default: Tn
            },
            close: {
              type: de.FUNCTION,
              required: !1,
              sendToChild: !1,
              childDecorate: function(ne) {
                return ne.close;
              }
            },
            focus: {
              type: de.FUNCTION,
              required: !1,
              sendToChild: !1,
              childDecorate: function(ne) {
                return ne.focus;
              }
            },
            resize: {
              type: de.FUNCTION,
              required: !1,
              sendToChild: !1,
              childDecorate: function(ne) {
                return ne.resize;
              }
            },
            uid: {
              type: de.STRING,
              required: !1,
              sendToChild: !1,
              childDecorate: function(ne) {
                return ne.uid;
              }
            },
            tag: {
              type: de.STRING,
              required: !1,
              sendToChild: !1,
              childDecorate: function(ne) {
                return ne.tag;
              }
            },
            getParent: {
              type: de.FUNCTION,
              required: !1,
              sendToChild: !1,
              childDecorate: function(ne) {
                return ne.getParent;
              }
            },
            getParentDomain: {
              type: de.FUNCTION,
              required: !1,
              sendToChild: !1,
              childDecorate: function(ne) {
                return ne.getParentDomain;
              }
            },
            show: {
              type: de.FUNCTION,
              required: !1,
              sendToChild: !1,
              childDecorate: function(ne) {
                return ne.show;
              }
            },
            hide: {
              type: de.FUNCTION,
              required: !1,
              sendToChild: !1,
              childDecorate: function(ne) {
                return ne.hide;
              }
            },
            export: {
              type: de.FUNCTION,
              required: !1,
              sendToChild: !1,
              childDecorate: function(ne) {
                return ne.export;
              }
            },
            onError: {
              type: de.FUNCTION,
              required: !1,
              sendToChild: !1,
              childDecorate: function(ne) {
                return ne.onError;
              }
            },
            onProps: {
              type: de.FUNCTION,
              required: !1,
              sendToChild: !1,
              childDecorate: function(ne) {
                return ne.onProps;
              }
            },
            getSiblings: {
              type: de.FUNCTION,
              required: !1,
              sendToChild: !1,
              childDecorate: function(ne) {
                return ne.getSiblings;
              }
            }
          }, I);
          if (!En) throw new Error("Container template required");
          return {
            name: Yn,
            tag: P,
            url: R,
            domain: x,
            bridgeUrl: W,
            method: Kn,
            propsDef: Zn,
            dimensions: _,
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
              for (var un = ne.getExports, re = {}, We = function() {
                var Ee = _e[Se], He = vn[Ee].type, xe = un().then(function(Ie) {
                  return Ie[Ee];
                });
                re[Ee] = He === de.FUNCTION ? function() {
                  for (var Ie = arguments.length, cn = new Array(Ie), Ye = 0; Ye < Ie; Ye++) cn[Ye] = arguments[Ye];
                  return xe.then(function(wn) {
                    return wn.apply(void 0, cn);
                  });
                } : xe;
              }, Se = 0, _e = Object.keys(vn); Se < _e.length; Se++) We();
              return re;
            }
          };
        }(e), r = n.name, o = n.tag, i = n.defaultContext, s = n.propsDef, u = n.eligible, f = n.children, d = xr(window), v = {}, g = [], w = function() {
          if (function(P) {
            try {
              return Vt(window.name).name === P;
            } catch {
            }
            return !1;
          }(r)) {
            var y = di().payload;
            if (y.tag === o && rn(y.childDomainMatch, ae())) return !0;
          }
          return !1;
        }, p = Dn(function() {
          if (w()) {
            if (window.xprops)
              throw delete d.components[o], new Error("Can not register " + r + " as child - child already registered");
            var y = function(P) {
              var R = P.tag, x = P.propsDef, W = P.autoResize, q = P.allowedParentDomains, I = [], j = di(), _ = j.parent, Z = j.payload, L = _.win, oe = _.domain, ee, G = new S(), U = Z.version, te = Z.uid, X = Z.exports, Oe = Z.context, En = Z.props;
              if (!function(re, We) {
                if (!/_/.test(re) || !/_/.test("10_3_3")) throw new Error("Versions are in an invalid format (" + re + ", 10_3_3)");
                return re.split("_")[0] === "10_3_3".split("_")[0];
              }(U)) throw new Error("Parent window has zoid version " + U + ", child window has version 10_3_3");
              var sn = X.show, An = X.hide, Mn = X.close, Cn = X.onError, zn = X.checkClose, Fn = X.export, Jn = X.resize, Ln = X.init, vn = function() {
                return L;
              }, Kn = function() {
                return oe;
              }, jn = function(re) {
                return I.push(re), {
                  cancel: function() {
                    I.splice(I.indexOf(re), 1);
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
                var We = (re === void 0 ? {} : re).anyParent, Se = [], _e = ee.parent;
                if (We === void 0 && (We = !_e), !We && !_e) throw new Error("No parent found for " + R + " child");
                for (var Ee = 0, He = gn(window); Ee < He.length; Ee++) {
                  var xe = He[Ee];
                  if (he(xe)) {
                    var Ie = en(xe).xprops;
                    if (Ie && vn() === Ie.getParent()) {
                      var cn = Ie.parent;
                      if (We || !_e || cn && cn.uid === _e.uid) {
                        var Ye = ai(xe, function(wn) {
                          return wn.exports;
                        });
                        Se.push({
                          props: Ie,
                          exports: Ye
                        });
                      }
                    }
                  }
                }
                return Se;
              }, ne = function(re, We, Se) {
                Se === void 0 && (Se = !1);
                var _e = function(He, xe, Ie, cn, Ye, wn) {
                  wn === void 0 && (wn = !1);
                  for (var Nn = {}, cr = 0, dr = Object.keys(Ie); cr < dr.length; cr++) {
                    var Xn = dr[cr], Ze = xe[Xn], Ir = Ze && Ze.trustedDomains && Ze.trustedDomains.length > 0 ? Ze.trustedDomains.reduce(function(tt, _r) {
                      return tt || rn(_r, ae(window));
                    }, !1) : cn === ae(window) || he(He);
                    if ((!Ze || !Ze.sameDomain || Ir) && (!Ze || !Ze.trustedDomains || Ir)) {
                      var Dr = fi(xe, 0, Xn, Ie[Xn], Ye);
                      Nn[Xn] = Dr, Ze && Ze.alias && !Nn[Ze.alias] && (Nn[Ze.alias] = Dr);
                    }
                  }
                  if (!wn) for (var fr = 0, rt = Object.keys(xe); fr < rt.length; fr++) {
                    var Wr = rt[fr];
                    Ie.hasOwnProperty(Wr) || (Nn[Wr] = fi(xe, 0, Wr, void 0, Ye));
                  }
                  return Nn;
                }(L, x, re, We, {
                  tag: R,
                  show: sn,
                  hide: An,
                  close: Mn,
                  focus: Ua,
                  onError: Cn,
                  resize: Un,
                  getSiblings: Zn,
                  onProps: jn,
                  getParent: vn,
                  getParentDomain: Kn,
                  uid: te,
                  export: Yn
                }, Se);
                ee ? sr(ee, _e) : ee = _e;
                for (var Ee = 0; Ee < I.length; Ee++) (0, I[Ee])(ee);
              }, un = function(re) {
                return S.try(function() {
                  return ne(re, oe, !0);
                });
              };
              return {
                init: function() {
                  return S.try(function() {
                    var re = "";
                    return he(L) && (re = function(We) {
                      var Se = We.componentName, _e = We.parentComponentWindow, Ee = ui({
                        data: Vt(window.name).serializedInitialPayload,
                        sender: {
                          win: _e
                        },
                        basic: !0
                      }), He = Ee.sender;
                      if (Ee.reference.type === "uid" || Ee.metaData.windowRef.type === "global") {
                        var xe = ci({
                          name: Se,
                          serializedPayload: si({
                            data: Ee.data,
                            metaData: {
                              windowRef: ja(_e)
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
                        return window.name = xe, xe;
                      }
                    }({
                      componentName: P.name,
                      parentComponentWindow: L
                    }) || ""), xr(window).exports = P.exports({
                      getExports: function() {
                        return G;
                      }
                    }), function(We, Se) {
                      if (!rn(We, Se)) throw new Error("Can not be rendered by domain: " + Se);
                    }(q, oe), $o(L), function() {
                      window.addEventListener("beforeunload", function() {
                        zn.fireAndForget();
                      }), window.addEventListener("unload", function() {
                        zn.fireAndForget();
                      }), lo(L, function() {
                        li();
                      });
                    }(), Ln({
                      name: re,
                      updateProps: un,
                      close: li
                    });
                  }).then(function() {
                    return (re = W.width, We = re !== void 0 && re, Se = W.height, _e = Se !== void 0 && Se, Ee = W.element, To(Ee === void 0 ? "body" : Ee).catch(ve).then(function(He) {
                      return {
                        width: We,
                        height: _e,
                        element: He
                      };
                    })).then(function(He) {
                      var xe = He.width, Ie = He.height, cn = He.element;
                      cn && (xe || Ie) && Oe !== Pe.POPUP && Do(cn, function(Ye) {
                        Un({
                          width: xe ? Ye.width : void 0,
                          height: Ie ? Ye.height : void 0
                        });
                      }, {
                        width: xe,
                        height: Ie
                      });
                    });
                    var re, We, Se, _e, Ee;
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
          var R, x = "zoid-" + o + "-" + qe(), W = P || {}, q = u({
            props: W
          }), I = q.eligible, j = q.reason, _ = W.onDestroy;
          W.onDestroy = function() {
            if (R && I && g.splice(g.indexOf(R), 1), _) return _.apply(void 0, arguments);
          };
          var Z = pi({
            uid: x,
            options: n
          });
          Z.init(), I ? Z.setProps(W) : W.onDestroy && W.onDestroy(), Jt.register(function(ee) {
            return Z.destroy(ee || new Error("zoid destroyed all components"));
          });
          var L = function(ee) {
            var G = (ee === void 0 ? {} : ee).decorate;
            return y((G === void 0 ? Ra : G)(W));
          }, oe = function(ee, G, U) {
            return S.try(function() {
              if (!I) {
                var te = new Error(j || r + " component is not eligible");
                return Z.destroy(te).then(function() {
                  throw te;
                });
              }
              if (!Hn(ee)) throw new Error("Must pass window to renderTo");
              return function(X, Oe) {
                return S.try(function() {
                  if (X.window) return Nr(X.window).getType();
                  if (Oe) {
                    if (Oe !== Pe.IFRAME && Oe !== Pe.POPUP) throw new Error("Unrecognized context: " + Oe);
                    return Oe;
                  }
                  return i;
                });
              }(W, U);
            }).then(function(te) {
              if (G = function(X, Oe) {
                if (Oe) {
                  if (typeof Oe != "string" && !Et(Oe)) throw new TypeError("Expected string or element selector to be passed");
                  return Oe;
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
          return R = O({}, Z.getExports(), Z.getHelpers(), function() {
            for (var ee = f(), G = {}, U = function() {
              var Oe = X[te], En = ee[Oe];
              G[Oe] = function(sn) {
                var An = Z.getProps(), Mn = O({}, sn, {
                  parent: {
                    uid: x,
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
              return I;
            },
            clone: L,
            render: function(ee, G) {
              return oe(window, ee, G);
            },
            renderTo: function(ee, G, U) {
              return oe(ee, G, U);
            }
          }), I && g.push(R), R;
        };
        if (p(), function() {
          var y = Rn("zoid_allow_delegate_" + r, function() {
            return !0;
          }), P = Rn("zoid_delegate_" + r, function(R) {
            var x = R.data;
            return {
              parent: pi({
                uid: x.uid,
                options: n,
                overrides: x.overrides,
                parentWin: R.source
              })
            };
          });
          Kt.register(y.cancel), Kt.register(P.cancel);
        }(), d.components = d.components || {}, d.components[o]) throw new Error("Can not register multiple components with the same tag: " + o);
        return d.components[o] = !0, {
          init: m,
          instances: g,
          driver: function(y, P) {
            var R = {
              react: $a,
              angular: Ha,
              vue: Ba,
              vue3: qa,
              angular2: Va
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
      var Ya = function(e) {
        (function() {
          yn().initialized || (yn().initialized = !0, s = (i = {
            on: Rn,
            send: pn
          }).on, u = i.send, (f = yn()).receiveMessage = f.receiveMessage || function(d) {
            return qt(d, {
              on: s,
              send: u
            });
          }, function(d) {
            var v = d.on, g = d.send;
            ue().getOrSet("postMessageListener", function() {
              return xo(window, "message", function(w) {
                (function(p, m) {
                  var y = m.on, P = m.send;
                  S.try(function() {
                    var R = p.source || p.sourceElement, x = p.origin || p.originalEvent && p.originalEvent.origin, W = p.data;
                    if (x === "null" && (x = "file://"), R) {
                      if (!x) throw new Error("Post message did not have origin domain");
                      qt({
                        source: R,
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
            on: Rn,
            send: pn
          }), Yo({
            on: Rn,
            send: pn,
            receiveMessage: qt
          }), function(d) {
            var v = d.on, g = d.send;
            ue("builtinListeners").getOrSet("helloListener", function() {
              var w = v("postrobot_hello", {
                domain: "*"
              }, function(m) {
                return Lo(m.source, {
                  domain: m.origin
                }), {
                  instanceID: Fo()
                };
              }), p = Pr();
              return p && At(p, {
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
        var n = Ka(e), r = function(i) {
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
      function vi(e) {
        _n && _n.destroyBridges();
        var n = Jt.all(e);
        return Jt = Jr(), n;
      }
      var wi = vi;
      function Za(e) {
        return wi(), delete window.__zoid_10_3_3__, function() {
          (function() {
            for (var r = ue("responseListeners"), o = 0, i = r.keys(); o < i.length; o++) {
              var s = i[o], u = r.get(s);
              u && (u.cancelled = !0), r.del(s);
            }
          })(), (n = ue().get("postMessageListener")) && n.cancel();
          var n;
          delete window.__post_robot_11_0_0__;
        }(), Kt.all(e);
      }
    }]);
  });
})(Ea);
var ba = Ea.exports;
const Bi = ba.EVENT, lr = {
  VISIBLE: "zoid-visible",
  INVISIBLE: "zoid-invisible"
};
function Ku({
  uid: t,
  frame: a,
  prerenderFrame: c,
  doc: h,
  props: l,
  event: E,
  dimensions: C
}) {
  const { width: O, height: V } = C, { top: F = 0, left: b = 0 } = l;
  if (!a || !c)
    return;
  const $ = h.createElement("div");
  $.setAttribute("id", t);
  const M = h.createElement("style");
  return l.cspNonce && M.setAttribute("nonce", l.cspNonce), M.appendChild(
    h.createTextNode(`
          #${t} {
              display: inline-block;
              position: absolute;
              width: ${O};
              height: ${V};
              z-index: 1049;
              border: none;
              top: ${F}px;
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
  ), $.appendChild(a), $.appendChild(c), $.appendChild(M), c.classList.add(lr.INVISIBLE), a.classList.add(lr.INVISIBLE), E.on(Bi.RENDERED, () => {
    setTimeout(() => {
      a.classList.remove(lr.INVISIBLE), a.classList.add(lr.VISIBLE);
    }, 100), setTimeout(() => {
      c.remove();
    }, 1);
  }), E.on(Bi.RESIZE, ({ width: B, height: ye }) => {
    typeof B == "number" && ($.style.width = `${B}px`), typeof ye == "number" && ($.style.height = `${ye}px`);
  }), $;
}
function Yu() {
  return ba.create({
    dimensions: {
      width: "100%",
      height: "100%"
    },
    tag: "wta",
    url: ({ props: t }) => Gi(t.appConfig.sdkBaseUrl, "/wta/index.html"),
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
function Zu(t) {
  return Yu()(t);
}
function Xu({ video: t, adContainer: a, trackingUrl: c, interval: h }) {
  const l = Pn(0);
  t.addEventListener("timeupdate", () => {
    l.value = t.currentTime;
  }), Pn({}), Pn(), Pn(h || 1e3), Pn();
  const E = Gu(), C = Pn(!1), O = Pn();
  function V({ icons: Ve }) {
    return {
      appConfig: {
        sdkBaseUrl: "https://cdn.jsdelivr.net/gh/sigmaott/sigma-ssai-web-sdk/build/dist"
      },
      icons: Ve
    };
  }
  const F = Zu(V({
    icons: []
  }));
  F.render(a), F.hide(), a.style.display = "none", Ou(() => {
    var Ve;
    if (O.value) {
      const Ge = ((Ve = O.value) == null ? void 0 : Ve.icons) || [];
      a.style.display = "block", F.updateProps(V({
        icons: Ge
      })), F.show();
    } else
      a.style.display = "none", F.hide();
  });
  const b = Pn([]), $ = Pn(), M = Pn([]);
  function B() {
    return C.value = !1, async (Ve, Ge) => {
      if ($.value = Ge.frag.sn, !Ve !== window.Hls.Events.FRAG_CHANGED) {
        for (const je of b.value)
          if (je.sn === Ge.frag.sn)
            for (const mn of M.value) {
              if (mn.tracked)
                continue;
              O.value = mn;
              const Qe = mn.trackingEvents.find((be) => be.eventType === je.value.event);
              Qe && lu(async () => {
                E.trigger(Qe), await Promise.all(Qe.beaconUrls.map((be) => ft(ru(be)))), je.value.event === "complete" && (O.value = void 0, b.value = [], mn.tracked = !0);
              }, je.time * 1e3);
            }
      }
    };
  }
  function ye() {
    return async (Ve, Ge) => {
      function je(Qe) {
        for (let be = 0; be < Qe.length; be++)
          if (Qe[be] === 0)
            return be;
        return Qe.length;
      }
      const { start: mr, sn: mn } = Ge.frag;
      for (let Qe = 0; Qe < Ge.samples.length; Qe++) {
        const be = Ge.samples[Qe], ke = be.data, rr = be.pts;
        if (String.fromCharCode.apply(null, ke.slice(0, 3)) !== "ID3" || String.fromCharCode.apply(null, ke.slice(10, 14)) !== "TXXX")
          continue;
        const he = ke.slice(21, ke.length), en = je(he), yr = he.slice(en + 1, he.length), tr = je(yr), or = new TextDecoder("utf-8").decode(yr.slice(0, tr)), On = {
          sn: mn,
          time: rr - mr,
          value: qi(or)
        };
        if ($.value && mn < $.value)
          return;
        b.value.push(On), On.value.event === "start" && ft(Xi(c)).then(({ data: gn, error: In }) => {
          if (In) {
            console.error("Cannot get tracking data", In);
            return;
          }
          for (const ir of (gn == null ? void 0 : gn.avails) || [])
            for (const pe of ir.ads) {
              const Er = `${ir.id}_${pe.id}_${pe.startTimeInSeconds}`;
              M.value.find((jr) => jr.key === Er) || M.value.push({
                ...pe,
                key: Er,
                tracked: !1
              });
            }
        });
      }
    };
  }
  function fn() {
    O.value = void 0, b.value = [], E.off(() => {
    });
  }
  function S(Ve, Ge) {
    E.on((je) => {
      (Ve === "*" || je.eventType === Ve) && Ge(je);
    });
  }
  return {
    destroy: fn,
    hlsHelper: {
      createHlsFragChanged: B,
      createHlsFragParsingMetadata: ye
    },
    onEventTracking: S
  };
}
async function Qu({ video: t, adContainer: a, url: c }) {
  const h = Ki(c), l = await ds(), E = await fs(l, t);
  if (!E)
    throw console.error("nonce is null"), new Error("nonce is null");
  const C = `${h.protocol}//${h.host}`, { data: O, error: V } = await ft(Xi(`${C}${h.pathname}`, {
    params: { "play_params.nonce": E }
  }));
  if (V || !O)
    throw console.error(V), new Error(V);
  const F = `${C}${O.manifestUrl}`, b = `${C}${O.trackingUrl}`, { hlsHelper: $, onEventTracking: M, destroy: B } = Xu({ video: t, adContainer: a, trackingUrl: b });
  return {
    manifestUrl: F,
    onEventTracking: M,
    destroy: B,
    hlsHelper: $
  };
}
export {
  fs as createPal,
  Qu as createSigmaDai,
  ds as loadPalSdk
};
