function Vi(r) {
  return new Promise((a, c) => {
    const h = document.createElement("script");
    h.async = !0, h.src = r, h.onload = a, h.onerror = c, document.body.appendChild(h);
  });
}
const fs = "https://imasdk.googleapis.com/pal/sdkloader/pal.js";
let ht = null;
function Di() {
  ht = null;
}
function ls() {
  const r = window;
  return r.goog && r.goog.pal ? Promise.resolve(r.goog.pal) : ht || (ht = Vi(fs).then(() => r.goog.pal), ht.then(Di).catch(Di), ht);
}
async function lr(r) {
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
function hs(r, a) {
  let c, h, l, C = !1;
  function O() {
    return !0;
  }
  function V() {
    a.addEventListener("mousedown", (ue) => void b(ue)), a.addEventListener("touchstart", (ue) => void b(ue)), a.addEventListener("play", () => {
      C || (B(), C = !0);
    }), a.addEventListener("ended", () => void M()), a.addEventListener("error", () => {
      console.log(`Video error: ${a.error.message}`), M();
    });
    const $ = new r.ConsentSettings();
    return $.allowStorage = O(), c = new r.NonceLoader(), z();
  }
  async function z() {
    const $ = new r.NonceRequest();
    $.adWillAutoPlay = !0, $.adWillPlayMuted = !0, $.continuousPlayback = !1, $.descriptionUrl = "https://example.com", $.iconsSupported = !0, $.playerType = "Sample Player Type", $.playerVersion = "1.0", $.ppid = "Sample PPID", $.sessionId = "Sample SID", $.supportedApiFrameworks = "2,7,9", $.url = "https://developers.google.com/ad-manager/pal/html5", $.videoHeight = 480, $.videoWidth = 640, h = c.loadNonceManager($);
    const { data: ue, error: fn } = await lr(h);
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
const ps = /"(?:_|\\u0{2}5[Ff]){2}(?:p|\\u0{2}70)(?:r|\\u0{2}72)(?:o|\\u0{2}6[Ff])(?:t|\\u0{2}74)(?:o|\\u0{2}6[Ff])(?:_|\\u0{2}5[Ff]){2}"\s*:/, vs = /"(?:c|\\u0063)(?:o|\\u006[Ff])(?:n|\\u006[Ee])(?:s|\\u0073)(?:t|\\u0074)(?:r|\\u0072)(?:u|\\u0075)(?:c|\\u0063)(?:t|\\u0074)(?:o|\\u006[Ff])(?:r|\\u0072)"\s*:/, ws = /^\s*["[{]|^\s*-?\d{1,16}(\.\d{1,17})?([Ee][+-]?\d+)?\s*$/;
function ms(r, a) {
  if (r === "__proto__" || r === "constructor" && a && typeof a == "object" && "prototype" in a) {
    gs(r);
    return;
  }
  return a;
}
function gs(r) {
  console.warn(`[destr] Dropping "${r}" key to prevent prototype pollution.`);
}
function Gi(r, a = {}) {
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
  if (!ws.test(r)) {
    if (a.strict)
      throw new SyntaxError("[destr] Invalid JSON");
    return r;
  }
  try {
    if (ps.test(r) || vs.test(r)) {
      if (a.strict)
        throw new Error("[destr] Possible prototype pollution");
      return JSON.parse(r, ms);
    }
    return JSON.parse(r);
  } catch (h) {
    if (a.strict)
      throw h;
    return r;
  }
}
const ys = /#/g, Es = /&/g, bs = /\//g, Ps = /=/g, io = /\+/g, Os = /%5e/gi, Ss = /%60/gi, Rs = /%7c/gi, Ts = /%20/gi;
function Cs(r) {
  return encodeURI("" + r).replace(Rs, "|");
}
function kr(r) {
  return Cs(typeof r == "string" ? r : JSON.stringify(r)).replace(io, "%2B").replace(Ts, "+").replace(ys, "%23").replace(Es, "%26").replace(Ss, "`").replace(Os, "^").replace(bs, "%2F");
}
function Qr(r) {
  return kr(r).replace(Ps, "%3D");
}
function Ji(r = "") {
  try {
    return decodeURIComponent("" + r);
  } catch {
    return "" + r;
  }
}
function Ns(r) {
  return Ji(r.replace(io, " "));
}
function xs(r) {
  return Ji(r.replace(io, " "));
}
function Is(r = "") {
  const a = {};
  r[0] === "?" && (r = r.slice(1));
  for (const c of r.split("&")) {
    const h = c.match(/([^=]+)=?(.*)/) || [];
    if (h.length < 2)
      continue;
    const l = Ns(h[1]);
    if (l === "__proto__" || l === "constructor")
      continue;
    const E = xs(h[2] || "");
    a[l] === void 0 ? a[l] = E : Array.isArray(a[l]) ? a[l].push(E) : a[l] = [a[l], E];
  }
  return a;
}
function Ds(r, a) {
  return (typeof a == "number" || typeof a == "boolean") && (a = String(a)), a ? Array.isArray(a) ? a.map((c) => `${Qr(r)}=${kr(c)}`).join("&") : `${Qr(r)}=${kr(a)}` : Qr(r);
}
function _s(r) {
  return Object.keys(r).filter((a) => r[a] !== void 0).map((a) => Ds(a, r[a])).filter(Boolean).join("&");
}
const Ws = /^[\s\w\0+.-]{2,}:([/\\]{1,2})/, As = /^[\s\w\0+.-]{2,}:([/\\]{2})?/, Ms = /^([/\\]\s*){2,}[^/\\]/, zs = /^\.?\//;
function Ki(r, a = {}) {
  return typeof a == "boolean" && (a = { acceptRelative: a }), a.strict ? Ws.test(r) : As.test(r) || (a.acceptRelative ? Ms.test(r) : !1);
}
function Fs(r = "", a) {
  return r.endsWith("/");
}
function Ls(r = "", a) {
  return (Fs(r) ? r.slice(0, -1) : r) || "/";
}
function js(r = "", a) {
  return r.endsWith("/") ? r : r + "/";
}
function Us(r, a) {
  if ($s(a) || Ki(r))
    return r;
  const c = Ls(a);
  return r.startsWith(c) ? r : Yi(c, r);
}
function Bs(r, a) {
  const c = Xi(r), h = { ...Is(c.search), ...a };
  return c.search = _s(h), Hs(c);
}
function $s(r) {
  return !r || r === "/";
}
function qs(r) {
  return r && r !== "/";
}
function Yi(r, ...a) {
  let c = r || "";
  for (const h of a.filter((l) => qs(l)))
    if (c) {
      const l = h.replace(zs, "");
      c = js(c) + l;
    } else
      c = h;
  return c;
}
const Zi = Symbol.for("ufo:protocolRelative");
function Xi(r = "", a) {
  const c = r.match(
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
  if (!Ki(r, { acceptRelative: !0 }))
    return _i(r);
  const [, h = "", l, E = ""] = r.replace(/\\/g, "/").match(/^[\s\0]*([\w+.-]{2,}:)?\/\/([^/@]+@)?(.*)/) || [], [, C = "", O = ""] = E.match(/([^#/?]*)(.*)?/) || [], { pathname: V, search: z, hash: b } = _i(
    O.replace(/\/(?=[A-Za-z]:)/, "")
  );
  return {
    protocol: h.toLowerCase(),
    auth: l ? l.slice(0, Math.max(0, l.length - 1)) : "",
    host: C,
    pathname: V,
    search: z,
    hash: b,
    [Zi]: !h
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
function Hs(r) {
  const a = r.pathname || "", c = r.search ? (r.search.startsWith("?") ? "" : "?") + r.search : "", h = r.hash || "", l = r.auth ? r.auth + "@" : "", E = r.host || "";
  return (r.protocol || r[Zi] ? (r.protocol || "") + "//" : "") + l + E + a + c + h;
}
class Vs extends Error {
  constructor(a, c) {
    super(a, c), this.name = "FetchError", c != null && c.cause && !this.cause && (this.cause = c.cause);
  }
}
function Gs(r) {
  var V, z, b, B, M;
  const a = ((V = r.error) == null ? void 0 : V.message) || ((z = r.error) == null ? void 0 : z.toString()) || "", c = ((b = r.request) == null ? void 0 : b.method) || ((B = r.options) == null ? void 0 : B.method) || "GET", h = ((M = r.request) == null ? void 0 : M.url) || String(r.request) || "/", l = `[${c}] ${JSON.stringify(h)}`, E = r.response ? `${r.response.status} ${r.response.statusText}` : "<no response>", C = `${l}: ${E}${a ? ` ${a}` : ""}`, O = new Vs(
    C,
    r.error ? { cause: r.error } : void 0
  );
  for (const $ of ["request", "options", "response"])
    Object.defineProperty(O, $, {
      get() {
        return r[$];
      }
    });
  for (const [$, ue] of [
    ["data", "_data"],
    ["status", "status"],
    ["statusCode", "status"],
    ["statusText", "statusText"],
    ["statusMessage", "statusText"]
  ])
    Object.defineProperty(O, $, {
      get() {
        return r.response && r.response[ue];
      }
    });
  return O;
}
const Js = new Set(
  Object.freeze(["PATCH", "POST", "PUT", "DELETE"])
);
function Wi(r = "GET") {
  return Js.has(r.toUpperCase());
}
function Ks(r) {
  if (r === void 0)
    return !1;
  const a = typeof r;
  return a === "string" || a === "number" || a === "boolean" || a === null ? !0 : a !== "object" ? !1 : Array.isArray(r) ? !0 : r.buffer ? !1 : r.constructor && r.constructor.name === "Object" || typeof r.toJSON == "function";
}
const Ys = /* @__PURE__ */ new Set([
  "image/svg",
  "application/xml",
  "application/xhtml",
  "application/html"
]), Zs = /^application\/(?:[\w!#$%&*.^`~-]*\+)?json(;.+)?$/i;
function Xs(r = "") {
  if (!r)
    return "json";
  const a = r.split(";").shift() || "";
  return Zs.test(a) ? "json" : Ys.has(a) || a.startsWith("text/") ? "text" : "blob";
}
function Qs(r, a, c = globalThis.Headers) {
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
const ks = /* @__PURE__ */ new Set([
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
]), eu = /* @__PURE__ */ new Set([101, 204, 205, 304]);
function Qi(r = {}) {
  const {
    fetch: a = globalThis.fetch,
    Headers: c = globalThis.Headers,
    AbortController: h = globalThis.AbortController
  } = r;
  async function l(O) {
    const V = O.error && O.error.name === "AbortError" && !O.options.timeout || !1;
    if (O.options.retry !== !1 && !V) {
      let b;
      typeof O.options.retry == "number" ? b = O.options.retry : b = Wi(O.options.method) ? 0 : 1;
      const B = O.response && O.response.status || 500;
      if (b > 0 && (Array.isArray(O.options.retryStatusCodes) ? O.options.retryStatusCodes.includes(B) : ks.has(B))) {
        const M = O.options.retryDelay || 0;
        return M > 0 && await new Promise(($) => setTimeout($, M)), E(O.request, {
          ...O.options,
          retry: b - 1
        });
      }
    }
    const z = Gs(O);
    throw Error.captureStackTrace && Error.captureStackTrace(z, E), z;
  }
  const E = async function(V, z = {}) {
    var $;
    const b = {
      request: V,
      options: Qs(z, r.defaults, c),
      response: void 0,
      error: void 0
    };
    b.options.method = ($ = b.options.method) == null ? void 0 : $.toUpperCase(), b.options.onRequest && await b.options.onRequest(b), typeof b.request == "string" && (b.options.baseURL && (b.request = Us(b.request, b.options.baseURL)), (b.options.query || b.options.params) && (b.request = Bs(b.request, {
      ...b.options.params,
      ...b.options.query
    }))), b.options.body && Wi(b.options.method) && (Ks(b.options.body) ? (b.options.body = typeof b.options.body == "string" ? b.options.body : JSON.stringify(b.options.body), b.options.headers = new c(b.options.headers || {}), b.options.headers.has("content-type") || b.options.headers.set("content-type", "application/json"), b.options.headers.has("accept") || b.options.headers.set("accept", "application/json")) : (
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
    if (b.response.body && !eu.has(b.response.status) && b.options.method !== "HEAD") {
      const ue = (b.options.parseResponse ? "json" : b.options.responseType) || Xs(b.response.headers.get("content-type") || "");
      switch (ue) {
        case "json": {
          const fn = await b.response.text(), S = b.options.parseResponse || Gi;
          b.response._data = S(fn);
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
  return C.raw = E, C.native = (...O) => a(...O), C.create = (O = {}) => Qi({
    ...r,
    defaults: {
      ...r.defaults,
      ...O
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
}(), nu = ao.fetch || (() => Promise.reject(new Error("[ofetch] global.fetch is not supported!"))), tu = ao.Headers, ru = ao.AbortController, ki = Qi({ fetch: nu, Headers: tu, AbortController: ru }), ea = ki, ou = ki.create({
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
}), iu = (r) => (a, c) => (r.set(a, c), c), Ai = Number.MAX_SAFE_INTEGER === void 0 ? 9007199254740991 : Number.MAX_SAFE_INTEGER, na = 536870912, Mi = na * 2, au = (r, a) => (c) => {
  const h = a.get(c);
  let l = h === void 0 ? c.size : h < Mi ? h + 1 : 0;
  if (!c.has(l))
    return r(c, l);
  if (c.size < na) {
    for (; c.has(l); )
      l = Math.floor(Math.random() * Mi);
    return r(c, l);
  }
  if (c.size > Ai)
    throw new Error("Congratulations, you created a collection of unique numbers which uses all available integers!");
  for (; c.has(l); )
    l = Math.floor(Math.random() * Ai);
  return r(c, l);
}, ta = /* @__PURE__ */ new WeakMap(), su = iu(ta), ir = au(su, ta), uu = (r) => r.method !== void 0 && r.method === "call", cu = (r) => typeof r.id == "number" && typeof r.result == "boolean", du = (r) => {
  const a = /* @__PURE__ */ new Map([[0, () => {
  }]]), c = /* @__PURE__ */ new Map([[0, () => {
  }]]), h = /* @__PURE__ */ new Map(), l = new Worker(r);
  return l.addEventListener("message", ({ data: z }) => {
    if (uu(z)) {
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
    } else if (cu(z)) {
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
        const b = ir(h);
        h.set(b, { timerId: z, timerType: "interval" }), a.set(z, b), l.postMessage({
          id: b,
          method: "clear",
          params: { timerId: z, timerType: "interval" }
        });
      }
    },
    clearTimeout: (z) => {
      if (typeof c.get(z) == "function") {
        const b = ir(h);
        h.set(b, { timerId: z, timerType: "timeout" }), c.set(z, b), l.postMessage({
          id: b,
          method: "clear",
          params: { timerId: z, timerType: "timeout" }
        });
      }
    },
    setInterval: (z, b = 0, ...B) => {
      const M = ir(a);
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
      const M = ir(c);
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
}, fu = (r, a) => {
  let c = null;
  return () => {
    if (c !== null)
      return c;
    const h = new Blob([a], { type: "application/javascript; charset=utf-8" }), l = URL.createObjectURL(h);
    return c = r(l), setTimeout(() => URL.revokeObjectURL(l)), c;
  };
}, lu = `(()=>{"use strict";const e=new Map,t=new Map,r=t=>{const r=e.get(t);return void 0!==r&&(clearTimeout(r),e.delete(t),!0)},s=e=>{const r=t.get(e);return void 0!==r&&(clearTimeout(r),t.delete(e),!0)},o=(e,t)=>{const r=performance.now(),s=e+t-r-performance.timeOrigin;return{expected:r+s,remainingDelay:s}},i=(e,t,r,s)=>{const o=r-performance.now();o>0?e.set(t,setTimeout(i,o,e,t,r,s)):(e.delete(t),postMessage({id:null,method:"call",params:{timerId:t,timerType:s}}))};addEventListener("message",(n=>{let{data:a}=n;try{if("clear"===a.method){const{id:e,params:{timerId:t,timerType:o}}=a;if("interval"===o)postMessage({id:e,result:r(t)});else{if("timeout"!==o)throw new Error('The given type "'.concat(o,'" is not supported'));postMessage({id:e,result:s(t)})}}else{if("set"!==a.method)throw new Error('The given method "'.concat(a.method,'" is not supported'));{const{params:{delay:r,now:s,timerId:n,timerType:m}}=a;if("interval"===m)((t,r,s)=>{const{expected:n,remainingDelay:a}=o(t,s);e.set(r,setTimeout(i,a,e,r,n,"interval"))})(r,n,s);else{if("timeout"!==m)throw new Error('The given type "'.concat(m,'" is not supported'));((e,r,s)=>{const{expected:n,remainingDelay:a}=o(e,s);t.set(r,setTimeout(i,a,t,r,n,"timeout"))})(r,n,s)}}}}catch(e){postMessage({error:{message:e.message},id:a.id,result:null})}}))})();`, hu = fu(du, lu), pu = (...r) => hu().setTimeout(...r);
/**
* @vue/shared v3.4.32
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
/*! #__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function vu(r, a) {
  const c = new Set(r.split(","));
  return (h) => c.has(h);
}
const wu = () => {
}, ra = Object.assign, mu = Object.prototype.hasOwnProperty, hr = (r, a) => mu.call(r, a), kn = Array.isArray, Ft = (r) => oa(r) === "[object Map]", gu = (r) => typeof r == "string", jt = (r) => typeof r == "symbol", vr = (r) => r !== null && typeof r == "object", yu = Object.prototype.toString, oa = (r) => yu.call(r), ia = (r) => oa(r).slice(8, -1), so = (r) => gu(r) && r !== "NaN" && r[0] !== "-" && "" + parseInt(r, 10) === r, Eu = (r) => {
  const a = /* @__PURE__ */ Object.create(null);
  return (c) => a[c] || (a[c] = r(c));
}, bu = Eu((r) => r.charAt(0).toUpperCase() + r.slice(1)), mt = (r, a) => !Object.is(r, a);
var Ke = {};
function vt(r, ...a) {
  console.warn(`[Vue warn] ${r}`, ...a);
}
let Pu;
function Ou(r, a = Pu) {
  a && a.active && a.effects.push(r);
}
let et;
class eo {
  constructor(a, c, h, l) {
    this.fn = a, this.trigger = c, this.scheduler = h, this.active = !0, this.deps = [], this._dirtyLevel = 4, this._trackId = 0, this._runnings = 0, this._shouldSchedule = !1, this._depsLength = 0, Ou(this, l);
  }
  get dirty() {
    if (this._dirtyLevel === 2 || this._dirtyLevel === 3) {
      this._dirtyLevel = 1, ua();
      for (let a = 0; a < this._depsLength; a++) {
        const c = this.deps[a];
        if (c.computed && (Su(c.computed), this._dirtyLevel >= 4))
          break;
      }
      this._dirtyLevel === 1 && (this._dirtyLevel = 0), ca();
    }
    return this._dirtyLevel >= 4;
  }
  set dirty(a) {
    this._dirtyLevel = a ? 4 : 0;
  }
  run() {
    if (this._dirtyLevel = 0, !this.active)
      return this.fn();
    let a = $n, c = et;
    try {
      return $n = !0, et = this, this._runnings++, zi(this), this.fn();
    } finally {
      Fi(this), this._runnings--, et = c, $n = a;
    }
  }
  stop() {
    this.active && (zi(this), Fi(this), this.onStop && this.onStop(), this.active = !1);
  }
}
function Su(r) {
  return r.value;
}
function zi(r) {
  r._trackId++, r._depsLength = 0;
}
function Fi(r) {
  if (r.deps.length > r._depsLength) {
    for (let a = r._depsLength; a < r.deps.length; a++)
      aa(r.deps[a], r);
    r.deps.length = r._depsLength;
  }
}
function aa(r, a) {
  const c = r.get(a);
  c !== void 0 && a._trackId !== c && (r.delete(a), r.size === 0 && r.cleanup());
}
function Ru(r, a) {
  r.effect instanceof eo && (r = r.effect.fn);
  const c = new eo(r, wu, () => {
    c.dirty && c.run();
  });
  c.run();
  const h = c.run.bind(c);
  return h.effect = c, h;
}
let $n = !0, no = 0;
const sa = [];
function ua() {
  sa.push($n), $n = !1;
}
function ca() {
  const r = sa.pop();
  $n = r === void 0 ? !0 : r;
}
function uo() {
  no++;
}
function co() {
  for (no--; !no && to.length; )
    to.shift()();
}
function da(r, a, c) {
  var h;
  if (a.get(r) !== r._trackId) {
    a.set(r, r._trackId);
    const l = r.deps[r._depsLength];
    l !== a ? (l && aa(l, r), r.deps[r._depsLength++] = a) : r._depsLength++, Ke.NODE_ENV !== "production" && ((h = r.onTrack) == null || h.call(r, ra({ effect: r }, c)));
  }
}
const to = [];
function fa(r, a, c) {
  var h;
  uo();
  for (const l of r.keys()) {
    let E;
    l._dirtyLevel < a && (E ?? (E = r.get(l) === l._trackId)) && (l._shouldSchedule || (l._shouldSchedule = l._dirtyLevel === 0), l._dirtyLevel = a), l._shouldSchedule && (E ?? (E = r.get(l) === l._trackId)) && (Ke.NODE_ENV !== "production" && ((h = l.onTrigger) == null || h.call(l, ra({ effect: l }, c))), l.trigger(), (!l._runnings || l.allowRecurse) && l._dirtyLevel !== 2 && (l._shouldSchedule = !1, l.scheduler && to.push(l.scheduler)));
  }
  co();
}
const la = (r, a) => {
  const c = /* @__PURE__ */ new Map();
  return c.cleanup = r, c.computed = a, c;
}, ro = /* @__PURE__ */ new WeakMap(), nt = Symbol(Ke.NODE_ENV !== "production" ? "iterate" : ""), oo = Symbol(Ke.NODE_ENV !== "production" ? "Map key iterate" : "");
function hn(r, a, c) {
  if ($n && et) {
    let h = ro.get(r);
    h || ro.set(r, h = /* @__PURE__ */ new Map());
    let l = h.get(c);
    l || h.set(c, l = la(() => h.delete(c))), da(
      et,
      l,
      Ke.NODE_ENV !== "production" ? {
        target: r,
        type: a,
        key: c
      } : void 0
    );
  }
}
function qn(r, a, c, h, l, E) {
  const C = ro.get(r);
  if (!C)
    return;
  let O = [];
  if (a === "clear")
    O = [...C.values()];
  else if (c === "length" && kn(r)) {
    const V = Number(h);
    C.forEach((z, b) => {
      (b === "length" || !jt(b) && b >= V) && O.push(z);
    });
  } else
    switch (c !== void 0 && O.push(C.get(c)), a) {
      case "add":
        kn(r) ? so(c) && O.push(C.get("length")) : (O.push(C.get(nt)), Ft(r) && O.push(C.get(oo)));
        break;
      case "delete":
        kn(r) || (O.push(C.get(nt)), Ft(r) && O.push(C.get(oo)));
        break;
      case "set":
        Ft(r) && O.push(C.get(nt));
        break;
    }
  uo();
  for (const V of O)
    V && fa(
      V,
      4,
      Ke.NODE_ENV !== "production" ? {
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
const Tu = /* @__PURE__ */ vu("__proto__,__v_isRef,__isVue"), ha = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((r) => r !== "arguments" && r !== "caller").map((r) => Symbol[r]).filter(jt)
), Li = /* @__PURE__ */ Cu();
function Cu() {
  const r = {};
  return ["includes", "indexOf", "lastIndexOf"].forEach((a) => {
    r[a] = function(...c) {
      const h = se(this);
      for (let E = 0, C = this.length; E < C; E++)
        hn(h, "get", E + "");
      const l = h[a](...c);
      return l === -1 || l === !1 ? h[a](...c.map(se)) : l;
    };
  }), ["push", "pop", "shift", "unshift", "splice"].forEach((a) => {
    r[a] = function(...c) {
      ua(), uo();
      const h = se(this)[a].apply(this, c);
      return co(), ca(), h;
    };
  }), r;
}
function Nu(r) {
  jt(r) || (r = String(r));
  const a = se(this);
  return hn(a, "has", r), a.hasOwnProperty(r);
}
class pa {
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
      return h === (l ? E ? Bu : ga : E ? Uu : ma).get(a) || // receiver is not the reactive proxy, but has the same prototype
      // this means the reciever is a user proxy of the reactive proxy
      Object.getPrototypeOf(a) === Object.getPrototypeOf(h) ? a : void 0;
    const C = kn(a);
    if (!l) {
      if (C && hr(Li, c))
        return Reflect.get(Li, c, h);
      if (c === "hasOwnProperty")
        return Nu;
    }
    const O = Reflect.get(a, c, h);
    return (jt(c) ? ha.has(c) : Tu(c)) || (l || hn(a, "get", c), E) ? O : pr(O) ? C && so(c) ? O : O.value : vr(O) ? l ? Ea(O) : ya(O) : O;
  }
}
class xu extends pa {
  constructor(a = !1) {
    super(!1, a);
  }
  set(a, c, h, l) {
    let E = a[c];
    if (!this._isShallow) {
      const V = wt(E);
      if (!mr(h) && !wt(h) && (E = se(E), h = se(h)), !kn(a) && pr(E) && !pr(h))
        return V ? !1 : (E.value = h, !0);
    }
    const C = kn(a) && so(c) ? Number(c) < a.length : hr(a, c), O = Reflect.set(a, c, h, l);
    return a === se(l) && (C ? mt(h, E) && qn(a, "set", c, h, E) : qn(a, "add", c, h)), O;
  }
  deleteProperty(a, c) {
    const h = hr(a, c), l = a[c], E = Reflect.deleteProperty(a, c);
    return E && h && qn(a, "delete", c, void 0, l), E;
  }
  has(a, c) {
    const h = Reflect.has(a, c);
    return (!jt(c) || !ha.has(c)) && hn(a, "has", c), h;
  }
  ownKeys(a) {
    return hn(
      a,
      "iterate",
      kn(a) ? "length" : nt
    ), Reflect.ownKeys(a);
  }
}
class Iu extends pa {
  constructor(a = !1) {
    super(!0, a);
  }
  set(a, c) {
    return Ke.NODE_ENV !== "production" && vt(
      `Set operation on key "${String(c)}" failed: target is readonly.`,
      a
    ), !0;
  }
  deleteProperty(a, c) {
    return Ke.NODE_ENV !== "production" && vt(
      `Delete operation on key "${String(c)}" failed: target is readonly.`,
      a
    ), !0;
  }
}
const Du = /* @__PURE__ */ new xu(), _u = /* @__PURE__ */ new Iu(), fo = (r) => r, wr = (r) => Reflect.getPrototypeOf(r);
function ar(r, a, c = !1, h = !1) {
  r = r.__v_raw;
  const l = se(r), E = se(a);
  c || (mt(a, E) && hn(l, "get", a), hn(l, "get", E));
  const { has: C } = wr(l), O = h ? fo : c ? lo : Lt;
  if (C.call(l, a))
    return O(r.get(a));
  if (C.call(l, E))
    return O(r.get(E));
  r !== l && r.get(a);
}
function sr(r, a = !1) {
  const c = this.__v_raw, h = se(c), l = se(r);
  return a || (mt(r, l) && hn(h, "has", r), hn(h, "has", l)), r === l ? c.has(r) : c.has(r) || c.has(l);
}
function ur(r, a = !1) {
  return r = r.__v_raw, !a && hn(se(r), "iterate", nt), Reflect.get(r, "size", r);
}
function ji(r, a = !1) {
  !a && !mr(r) && !wt(r) && (r = se(r));
  const c = se(this);
  return wr(c).has.call(c, r) || (c.add(r), qn(c, "add", r, r)), this;
}
function Ui(r, a, c = !1) {
  !c && !mr(a) && !wt(a) && (a = se(a));
  const h = se(this), { has: l, get: E } = wr(h);
  let C = l.call(h, r);
  C ? Ke.NODE_ENV !== "production" && wa(h, l, r) : (r = se(r), C = l.call(h, r));
  const O = E.call(h, r);
  return h.set(r, a), C ? mt(a, O) && qn(h, "set", r, a, O) : qn(h, "add", r, a), this;
}
function Bi(r) {
  const a = se(this), { has: c, get: h } = wr(a);
  let l = c.call(a, r);
  l ? Ke.NODE_ENV !== "production" && wa(a, c, r) : (r = se(r), l = c.call(a, r));
  const E = h ? h.call(a, r) : void 0, C = a.delete(r);
  return l && qn(a, "delete", r, void 0, E), C;
}
function $i() {
  const r = se(this), a = r.size !== 0, c = Ke.NODE_ENV !== "production" ? Ft(r) ? new Map(r) : new Set(r) : void 0, h = r.clear();
  return a && qn(r, "clear", void 0, void 0, c), h;
}
function cr(r, a) {
  return function(h, l) {
    const E = this, C = E.__v_raw, O = se(C), V = a ? fo : r ? lo : Lt;
    return !r && hn(O, "iterate", nt), C.forEach((z, b) => h.call(l, V(z), V(b), E));
  };
}
function dr(r, a, c) {
  return function(...h) {
    const l = this.__v_raw, E = se(l), C = Ft(E), O = r === "entries" || r === Symbol.iterator && C, V = r === "keys" && C, z = l[r](...h), b = c ? fo : a ? lo : Lt;
    return !a && hn(
      E,
      "iterate",
      V ? oo : nt
    ), {
      // iterator protocol
      next() {
        const { value: B, done: M } = z.next();
        return M ? { value: B, done: M } : {
          value: O ? [b(B[0]), b(B[1])] : b(B),
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
    if (Ke.NODE_ENV !== "production") {
      const c = a[0] ? `on key "${a[0]}" ` : "";
      vt(
        `${bu(r)} operation ${c}failed: target is readonly.`,
        se(this)
      );
    }
    return r === "delete" ? !1 : r === "clear" ? void 0 : this;
  };
}
function Wu() {
  const r = {
    get(E) {
      return ar(this, E);
    },
    get size() {
      return ur(this);
    },
    has: sr,
    add: ji,
    set: Ui,
    delete: Bi,
    clear: $i,
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
      return ji.call(this, E, !0);
    },
    set(E, C) {
      return Ui.call(this, E, C, !0);
    },
    delete: Bi,
    clear: $i,
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
  Au,
  Mu,
  zu,
  Fu
] = /* @__PURE__ */ Wu();
function va(r, a) {
  const c = a ? r ? Fu : zu : r ? Mu : Au;
  return (h, l, E) => l === "__v_isReactive" ? !r : l === "__v_isReadonly" ? r : l === "__v_raw" ? h : Reflect.get(
    hr(c, l) && l in h ? c : h,
    l,
    E
  );
}
const Lu = {
  get: /* @__PURE__ */ va(!1, !1)
}, ju = {
  get: /* @__PURE__ */ va(!0, !1)
};
function wa(r, a, c) {
  const h = se(c);
  if (h !== c && a.call(r, h)) {
    const l = ia(r);
    vt(
      `Reactive ${l} contains both the raw and reactive versions of the same object${l === "Map" ? " as keys" : ""}, which can lead to inconsistencies. Avoid differentiating between the raw and reactive versions of an object and only use the reactive version if possible.`
    );
  }
}
const ma = /* @__PURE__ */ new WeakMap(), Uu = /* @__PURE__ */ new WeakMap(), ga = /* @__PURE__ */ new WeakMap(), Bu = /* @__PURE__ */ new WeakMap();
function $u(r) {
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
function qu(r) {
  return r.__v_skip || !Object.isExtensible(r) ? 0 : $u(ia(r));
}
function ya(r) {
  return wt(r) ? r : ba(
    r,
    !1,
    Du,
    Lu,
    ma
  );
}
function Ea(r) {
  return ba(
    r,
    !0,
    _u,
    ju,
    ga
  );
}
function ba(r, a, c, h, l) {
  if (!vr(r))
    return Ke.NODE_ENV !== "production" && vt(
      `value cannot be made ${a ? "readonly" : "reactive"}: ${String(
        r
      )}`
    ), r;
  if (r.__v_raw && !(a && r.__v_isReactive))
    return r;
  const E = l.get(r);
  if (E)
    return E;
  const C = qu(r);
  if (C === 0)
    return r;
  const O = new Proxy(
    r,
    C === 2 ? h : c
  );
  return l.set(r, O), O;
}
function wt(r) {
  return !!(r && r.__v_isReadonly);
}
function mr(r) {
  return !!(r && r.__v_isShallow);
}
function se(r) {
  const a = r && r.__v_raw;
  return a ? se(a) : r;
}
const Lt = (r) => vr(r) ? ya(r) : r, lo = (r) => vr(r) ? Ea(r) : r, Hu = "Computed is still dirty after getter evaluation, likely because a computed is mutating its own dependency in its getter. State mutations in computed getters should be avoided.  Check the docs for more details: https://vuejs.org/guide/essentials/computed.html#getters-should-be-side-effect-free";
class Vu {
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
    const a = se(this);
    return (!a._cacheable || a.effect.dirty) && mt(a._value, a._value = a.effect.run()) && fr(a, 4), Pa(a), a.effect._dirtyLevel >= 2 && (Ke.NODE_ENV !== "production" && this._warnRecursive && vt(Hu, `

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
function Pa(r) {
  var a;
  $n && et && (r = se(r), da(
    et,
    (a = r.dep) != null ? a : r.dep = la(
      () => r.dep = void 0,
      r instanceof Vu ? r : void 0
    ),
    Ke.NODE_ENV !== "production" ? {
      target: r,
      type: "get",
      key: "value"
    } : void 0
  ));
}
function fr(r, a = 4, c, h) {
  r = se(r);
  const l = r.dep;
  l && fa(
    l,
    a,
    Ke.NODE_ENV !== "production" ? {
      target: r,
      type: "set",
      key: "value",
      newValue: c,
      oldValue: h
    } : void 0
  );
}
function pr(r) {
  return !!(r && r.__v_isRef === !0);
}
function Pn(r) {
  return Gu(r, !1);
}
function Gu(r, a) {
  return pr(r) ? r : new Ju(r, a);
}
class Ju {
  constructor(a, c) {
    this.__v_isShallow = c, this.dep = void 0, this.__v_isRef = !0, this._rawValue = c ? a : se(a), this._value = c ? a : Lt(a);
  }
  get value() {
    return Pa(this), this._value;
  }
  set value(a) {
    const c = this.__v_isShallow || mr(a) || wt(a);
    if (a = c ? a : se(a), mt(a, this._rawValue)) {
      const h = this._rawValue;
      this._rawValue = a, this._value = c ? a : Lt(a), fr(this, 4, a, h);
    }
  }
}
function Ku() {
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
var Yu = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, Oa = { exports: {} };
(function(r, a) {
  (function(c, h) {
    r.exports = h();
  })(typeof self < "u" ? self : Yu, function() {
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
        }), 2 & C && typeof E != "string") for (var V in E) l.d(O, V, (function(z) {
          return E[z];
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
        return Dr;
      }), l.d(h, "create", function() {
        return Qa;
      }), l.d(h, "destroy", function() {
        return ka;
      }), l.d(h, "destroyComponents", function() {
        return wi;
      }), l.d(h, "destroyAll", function() {
        return mi;
      }), l.d(h, "PROP_TYPE", function() {
        return fe;
      }), l.d(h, "PROP_SERIALIZATION", function() {
        return tr;
      }), l.d(h, "CONTEXT", function() {
        return Pe;
      }), l.d(h, "EVENT", function() {
        return me;
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
      var S = function() {
        function e(t) {
          var o = this;
          if (this.resolved = void 0, this.rejected = void 0, this.errorHandled = void 0, this.value = void 0, this.error = void 0, this.handlers = void 0, this.dispatching = void 0, this.stack = void 0, this.resolved = !1, this.rejected = !1, this.errorHandled = !1, this.handlers = [], t) {
            var i, s, u = !1, f = !1, d = !1;
            ue();
            try {
              t(function(v) {
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
              if (z.indexOf(s) === -1) {
                z.push(s), setTimeout(function() {
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
            this.dispatching = !0, ue();
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
            i.length = 0, this.dispatching = !1, fn();
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
          ue();
          try {
            s = t.apply(o, i || []);
          } catch (u) {
            return fn(), e.reject(u);
          }
          return fn(), e.resolve(s);
        }, e.delay = function(t) {
          return new e(function(o) {
            setTimeout(o, t);
          });
        }, e.isPromise = function(t) {
          return !!(t && t instanceof e) || V(t);
        }, e.flush = function() {
          return function(t) {
            var o = M = M || new t();
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
      function gt(e) {
        return e === void 0 && (e = window), e.location.protocol;
      }
      function mn(e) {
        if (e === void 0 && (e = window), e.mockDomain) {
          var n = e.mockDomain.split("//")[0];
          if (n) return n;
        }
        return gt(e);
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
      function tt(e) {
        try {
          return !0;
        } catch {
        }
        return !1;
      }
      function yt(e) {
        e === void 0 && (e = window);
        var n = e.location;
        if (!n) throw new Error("Can not read window location");
        var t = gt(e);
        if (!t) throw new Error("Can not read window protocol");
        if (t === "file:") return "file://";
        if (t === "about:") {
          var o = be(e);
          return o && tt() ? yt(o) : "about://";
        }
        var i = n.host;
        if (!i) throw new Error("Can not read window host");
        return t + "//" + i;
      }
      function ae(e) {
        e === void 0 && (e = window);
        var n = yt(e);
        return n && e.mockDomain && e.mockDomain.indexOf("mock:") === 0 ? e.mockDomain : n;
      }
      function pe(e) {
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
            if (Qe(n) && tt()) return !0;
          } catch {
          }
          try {
            if (function(o) {
              return o === void 0 && (o = window), mn(o) === "mock:";
            }(n) && tt()) return !0;
          } catch {
          }
          try {
            if (yt(n) === yt(window)) return !0;
          } catch {
          }
          return !1;
        }(e)) return !1;
        try {
          if (e === window || Qe(e) && tt() || ae(window) === ae(e)) return !0;
        } catch {
        }
        return !1;
      }
      function en(e) {
        if (!pe(e)) throw new Error("Expected window to be same domain");
        return e;
      }
      function Et(e, n) {
        if (!e || !n) return !1;
        var t = be(n);
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
      function rt(e) {
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
      function ot(e) {
        for (var n = [], t = 0, o = rt(e); t < o.length; t++) {
          var i = o[t];
          n.push(i);
          for (var s = 0, u = ot(i); s < u.length; s++) n.push(u[s]);
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
          if (Et(window, e) && window.top) return window.top;
        } catch {
        }
        try {
          if (Et(e, window) && window.top) return window.top;
        } catch {
        }
        for (var n = 0, t = ot(e); n < t.length; n++) {
          var o = t[n];
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
        var t = [].concat(ot(n), [n]);
        return t.indexOf(e) === -1 && (t = [].concat(t, [e], ot(e))), t;
      }
      var In = [], it = [];
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
        var t = function(i, s) {
          for (var u = 0; u < i.length; u++) try {
            if (i[u] === s) return u;
          } catch {
          }
          return -1;
        }(In, e);
        if (t !== -1) {
          var o = it[t];
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
      function bt(e) {
        return (e = e || window).navigator.mockUserAgent || e.navigator.userAgent;
      }
      function Pt(e, n) {
        for (var t = rt(e), o = 0; o < t.length; o++) {
          var i = t[o];
          try {
            if (pe(i) && i.name === n && t.indexOf(i) !== -1) return i;
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
      function Ut(e, n) {
        return e === ke(n);
      }
      function Ot(e) {
        return e === void 0 && (e = window), ke(e = e || window) || be(e) || void 0;
      }
      function gr(e, n) {
        for (var t = 0; t < e.length; t++)
          for (var o = e[t], i = 0; i < n.length; i++) if (o === n[i]) return !0;
        return !1;
      }
      function yr(e) {
        e === void 0 && (e = window);
        for (var n = 0, t = e; t; ) (t = be(t)) && (n += 1);
        return n;
      }
      function Bt(e, n) {
        var t = On(e) || e, o = On(n) || n;
        try {
          if (t && o) return t === o;
        } catch {
        }
        var i = gn(e), s = gn(n);
        if (gr(i, s)) return !0;
        var u = ke(t), f = ke(o);
        return u && gr(gn(u), s) || f && gr(gn(f), i), !1;
      }
      function tn(e, n) {
        if (typeof e == "string") {
          if (typeof n == "string") return e === "*" || n === e;
          if (Ve(n) || Array.isArray(n)) return !1;
        }
        return Ve(e) ? Ve(n) ? e.toString() === n.toString() : !Array.isArray(n) && !!n.match(e) : !!Array.isArray(e) && (Array.isArray(n) ? JSON.stringify(e) === JSON.stringify(n) : !Ve(n) && e.some(function(t) {
          return tn(t, n);
        }));
      }
      function Sn(e) {
        return e.match(/^(https?|mock|file):\/\//) ? e.split("/").slice(0, 3).join("/") : ae();
      }
      function ho(e, n, t, o) {
        t === void 0 && (t = 1e3), o === void 0 && (o = 1 / 0);
        var i;
        return function s() {
          if (ve(e))
            return i && clearTimeout(i), n();
          o <= 0 ? clearTimeout(i) : (o -= t, i = setTimeout(s, t));
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
      function Er(e) {
        if (n = Sn(e), n.indexOf("mock:") !== 0) return e;
        var n;
        throw new Error("Mock urls not supported out of test mode");
      }
      function po(e) {
        if (pe(e)) return en(e).frameElement;
        for (var n = 0, t = document.querySelectorAll("iframe"); n < t.length; n++) {
          var o = t[n];
          if (o && o.contentWindow && o.contentWindow === e) return o;
        }
      }
      function vo(e) {
        if (function(t) {
          return t === void 0 && (t = window), !!be(t);
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
      function $t(e, n) {
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
            if (Hn(s) && ve(s)) {
              if (t) try {
                t.delete(s);
              } catch {
              }
              o.splice(i, 1), this.values.splice(i, 1), i -= 1;
            }
          }
        }, n.isSafeToReadWrite = function(t) {
          return !Hn(t);
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
          var f = this.keys, d = this.values, v = $t(f, t);
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
          var s = $t(this.keys, t);
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
          var s = this.keys, u = $t(s, t);
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
          return this._cleanupClosedWindows(), $t(this.keys, t) !== -1;
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
      function Ra() {
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
        return (mo = Ra() ? Reflect.construct : function(o, i, s) {
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
      function br(e) {
        var n = !1;
        try {
          (e instanceof window.Element || e !== null && typeof e == "object" && e.nodeType === 1 && typeof e.style == "object" && typeof e.ownerDocument == "object") && (n = !0);
        } catch {
        }
        return n;
      }
      function Pr(e) {
        return e.name || e.__name__ || e.displayName || "anonymous";
      }
      function Or(e, n) {
        try {
          delete e.name, e.name = n;
        } catch {
        }
        return e.__name__ = e.displayName = n, e;
      }
      function Sr(e) {
        if (typeof btoa == "function") return btoa(encodeURIComponent(e).replace(/%([0-9A-F]{2})/g, function(n, t) {
          return String.fromCharCode(parseInt(t, 16));
        })).replace(/[=]/g, "");
        if (typeof Buffer < "u") return Buffer.from(e, "utf8").toString("base64").replace(/[=]/g, "");
        throw new Error("Can not find window.btoa or Buffer");
      }
      function qe() {
        var e = "0123456789abcdef";
        return "uid_" + "xxxxxxxxxx".replace(/./g, function() {
          return e.charAt(Math.floor(Math.random() * e.length));
        }) + "_" + Sr((/* @__PURE__ */ new Date()).toISOString().slice(11, 19).replace("T", ".")).replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
      }
      var Ht;
      function Rr(e) {
        try {
          return JSON.stringify([].slice.call(e), function(n, t) {
            return typeof t == "function" ? "memoize[" + function(o) {
              if (Ht = Ht || new qt(), o == null || typeof o != "object" && typeof o != "function") throw new Error("Invalid object");
              var i = Ht.get(o);
              return i || (i = typeof o + ":" + qe(), Ht.set(o, i)), i;
            }(t) + "]" : br(t) ? {} : t;
          });
        } catch {
          throw new Error("Arguments not serializable -- can not be used to memoize");
        }
      }
      function Ta() {
        return {};
      }
      var St = 0, yo = 0;
      function Dn(e, n) {
        n === void 0 && (n = {});
        var t = n.thisNamespace, o = t !== void 0 && t, i = n.time, s, u, f = St;
        St += 1;
        var d = function() {
          for (var v = arguments.length, g = new Array(v), w = 0; w < v; w++) g[w] = arguments[w];
          f < yo && (s = null, u = null, f = St, St += 1);
          var p;
          p = o ? (u = u || new qt()).getOrSet(this, Ta) : s = s || {};
          var m;
          try {
            m = Rr(g);
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
        }, Or(d, (n.name || Pr(e)) + "::memoized");
      }
      Dn.clear = function() {
        yo = St;
      };
      function Ca(e) {
        var n = {};
        function t() {
          for (var o = arguments, i = this, s = arguments.length, u = new Array(s), f = 0; f < s; f++) u[f] = arguments[f];
          var d = Rr(u);
          return n.hasOwnProperty(d) || (n[d] = S.try(function() {
            return e.apply(i, o);
          }).finally(function() {
            delete n[d];
          })), n[d];
        }
        return t.reset = function() {
          n = {};
        }, Or(t, Pr(e) + "::promiseMemoized");
      }
      function we() {
      }
      function Vt(e) {
        var n = !1;
        return Or(function() {
          if (!n)
            return n = !0, e.apply(this, arguments);
        }, Pr(e) + "::once");
      }
      function at(e, n) {
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
          return "Error while stringifying error: " + at(i, n + 1);
        }
      }
      function Gt(e) {
        return typeof e == "string" ? e : e && e.toString && typeof e.toString == "function" ? e.toString() : {}.toString.call(e);
      }
      function st(e, n) {
        if (!n) return e;
        if (Object.assign) return Object.assign(e, n);
        for (var t in n) n.hasOwnProperty(t) && (e[t] = n[t]);
        return e;
      }
      Dn(function(e) {
        if (Object.values) return Object.values(e);
        var n = [];
        for (var t in e) e.hasOwnProperty(t) && n.push(e[t]);
        return n;
      });
      function Na(e) {
        return e;
      }
      function Rt(e, n) {
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
      function Cr(e) {
        return [].slice.call(e);
      }
      function bo(e) {
        return typeof (n = e) == "object" && n !== null && {}.toString.call(e) === "[object Object]";
        var n;
      }
      function Nr(e) {
        if (!bo(e)) return !1;
        var n = e.constructor;
        if (typeof n != "function") return !1;
        var t = n.prototype;
        return !!bo(t) && !!t.hasOwnProperty("isPrototypeOf");
      }
      function Jt(e, n, t) {
        if (t === void 0 && (t = ""), Array.isArray(e)) {
          for (var o = e.length, i = [], s = function(g) {
            Eo(i, g, function() {
              var w = t ? t + "." + g : "" + g, p = n(e[g], g, w);
              return (Nr(p) || Array.isArray(p)) && (p = Jt(p, n, w)), p;
            });
          }, u = 0; u < o; u++) s(u);
          return i;
        }
        if (Nr(e)) {
          var f = {}, d = function(g) {
            if (!e.hasOwnProperty(g)) return 1;
            Eo(f, g, function() {
              var w = t ? t + "." + g : "" + g, p = n(e[g], g, w);
              return (Nr(p) || Array.isArray(p)) && (p = Jt(p, n, w)), p;
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
      function xr(e) {
        return {}.toString.call(e) === "[object RegExp]";
      }
      function Tt(e, n, t) {
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
            return S.all(u).then(we);
          }
        };
        return i;
      }
      function Yt(e, n) {
        if (n == null) throw new Error("Expected " + e + " to be present");
        return n;
      }
      var xa = function(e) {
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
      function Zt() {
        return !!document.body && document.readyState === "complete";
      }
      function Oo() {
        return !!document.body && document.readyState === "interactive";
      }
      function So(e) {
        return encodeURIComponent(e);
      }
      Dn(function() {
        return new S(function(e) {
          if (Zt() || Oo()) return e();
          var n = setInterval(function() {
            if (Zt() || Oo())
              return clearInterval(n), e();
          }, 10);
        });
      });
      function Ro(e) {
        return function(n, t, o) {
          o === void 0 && (o = []);
          var i = n.__inline_memoize_cache__ = n.__inline_memoize_cache__ || {}, s = Rr(o);
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
        return n === void 0 && (n = {}), n && Object.keys(n).length ? function(t) {
          return t === void 0 && (t = {}), Object.keys(t).filter(function(o) {
            return typeof t[o] == "string" || typeof t[o] == "boolean";
          }).map(function(o) {
            var i = t[o];
            if (typeof i != "string" && typeof i != "boolean") throw new TypeError("Invalid type for query");
            return So(o) + "=" + So(i.toString());
          }).join("&");
        }(O({}, Ro(e), n)) : e;
      }
      function Ia(e, n) {
        e.appendChild(n);
      }
      function Ir(e, n) {
        return n === void 0 && (n = document), br(e) ? e : typeof e == "string" ? n.querySelector(e) : void 0;
      }
      function Co(e) {
        return new S(function(n, t) {
          var o = Gt(e), i = Ir(e);
          if (i) return n(i);
          if (Zt()) return t(new Error("Document is ready and element " + o + " does not exist"));
          var s = setInterval(function() {
            if (i = Ir(e))
              n(i), clearInterval(s);
            else if (Zt())
              return clearInterval(s), t(new Error("Document is ready and element " + o + " does not exist"));
          }, 10);
        });
      }
      var Dr = function(e) {
        C(n, e);
        function n() {
          return e.apply(this, arguments) || this;
        }
        return n;
      }(xa), Xt;
      function No(e) {
        if ((Xt = Xt || new qt()).has(e)) {
          var n = Xt.get(e);
          if (n) return n;
        }
        var t = new S(function(o, i) {
          e.addEventListener("load", function() {
            (function(s) {
              if (function() {
                for (var u = 0; u < In.length; u++) {
                  var f = !1;
                  try {
                    f = In[u].closed;
                  } catch {
                  }
                  f && (it.splice(u, 1), In.splice(u, 1));
                }
              }(), s && s.contentWindow) try {
                In.push(s.contentWindow), it.push(s);
              } catch {
              }
            })(e), o(e);
          }), e.addEventListener("error", function(s) {
            e.contentWindow ? o(e) : i(s);
          });
        });
        return Xt.set(e, t), t;
      }
      function _r(e) {
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
          if (u.style && st(d.style, u.style), u.class && (d.className = u.class.join(" ")), u.id && d.setAttribute("id", u.id), u.attributes) for (var v = 0, g = Object.keys(u.attributes); v < g.length; v++) {
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
        return o.hasAttribute("id") || o.setAttribute("id", qe()), No(o), (e.url || i) && o.setAttribute("src", e.url || "about:blank"), o;
      }
      function Io(e, n, t) {
        return e.addEventListener(n, t), {
          cancel: function() {
            e.removeEventListener(n, t);
          }
        };
      }
      function Da(e) {
        e.style.setProperty("display", "");
      }
      function Do(e) {
        e.style.setProperty("display", "none", "important");
      }
      function Ct(e) {
        e && e.parentNode && e.parentNode.removeChild(e);
      }
      function ut(e) {
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
            var _ = e.offsetWidth, q = e.offsetHeight;
            (s && _ !== p || f && q !== m) && n({
              width: _,
              height: q
            }), p = _, m = q;
          }
        }, R, x;
        return w.addEventListener("resize", P), w.ResizeObserver !== void 0 ? ((R = new w.ResizeObserver(P)).observe(e), x = Rt(P, 10 * v)) : w.MutationObserver !== void 0 ? ((R = new w.MutationObserver(P)).observe(e, {
          attributes: !0,
          childList: !0,
          subtree: !0,
          characterData: !1
        }), x = Rt(P, 10 * v)) : x = Rt(P, v), {
          cancel: function() {
            y = !0, R.disconnect(), window.removeEventListener("resize", P), x.cancel();
          }
        };
      }
      function Wr(e) {
        for (; e.parentNode; ) e = e.parentNode;
        return e.toString() === "[object ShadowRoot]";
      }
      var Qt = typeof document < "u" ? document.currentScript : null, _a = Dn(function() {
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
      }), Wa = qe();
      Dn(function() {
        var e;
        try {
          e = _a();
        } catch {
          return Wa;
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
        } else n = qe();
        return e.setAttribute("data-uid-auto", n), n;
      });
      function Wo(e) {
        return typeof e == "string" && /^[0-9]+%$/.test(e);
      }
      function Ar(e) {
        if (typeof e == "number") return e;
        var n = e.match(/^([0-9]+)(px|%)$/);
        if (!n) throw new Error("Could not match css value from " + e);
        return parseInt(n[1], 10);
      }
      function Ao(e) {
        return Ar(e) + "px";
      }
      function Mo(e) {
        return typeof e == "number" ? Ao(e) : Wo(e) ? e : Ao(e);
      }
      function zo(e, n) {
        if (typeof e == "number") return e;
        if (Wo(e)) return parseInt(n * Ar(e) / 100, 10);
        if (typeof (t = e) == "string" && /^[0-9]+px$/.test(t)) return Ar(e);
        var t;
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
        return e === void 0 && (e = "store"), n === void 0 && (n = Fo), Tt(yn(), e, function() {
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
              return Tt(t, o, i);
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
      var Aa = function() {
      };
      function kt() {
        var e = yn();
        return e.WINDOW_WILDCARD = e.WINDOW_WILDCARD || new Aa(), e.WINDOW_WILDCARD;
      }
      function $e(e, n) {
        return e === void 0 && (e = "store"), n === void 0 && (n = Fo), ce("windowStore").getOrSet(e, function() {
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
              return Tt(o(i), e, s);
            }
          };
        });
      }
      function Lo() {
        return ce("instance").getOrSet("instanceID", qe);
      }
      function jo(e, n) {
        var t = n.domain, o = $e("helloPromises"), i = o.get(e);
        i && i.resolve({
          domain: t
        });
        var s = S.resolve({
          domain: t
        });
        return o.set(e, s), s;
      }
      function Mr(e, n) {
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
        return $e("windowInstanceIDPromises").getOrSet(e, function() {
          return Mr(e, {
            send: t
          }).then(function(o) {
            return o.instanceID;
          });
        });
      }
      function Bo(e, n, t) {
        n === void 0 && (n = 5e3), t === void 0 && (t = "Window");
        var o = function(i) {
          return $e("helloPromises").getOrSet(i, function() {
            return new S();
          });
        }(e);
        return n !== -1 && (o = o.timeout(n, new Error(t + " did not load after " + n + "ms"))), o;
      }
      function $o(e) {
        $e("knownWindows").set(e, !0);
      }
      function zr(e) {
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
      var rn, Ma = ((rn = {}).function = function() {
      }, rn.error = function(e) {
        return Vn("error", {
          message: e.message,
          stack: e.stack,
          code: e.code,
          data: e.data
        });
      }, rn.promise = function() {
      }, rn.regex = function(e) {
        return Vn("regex", e.source);
      }, rn.date = function(e) {
        return Vn("date", e.toJSON());
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
        return Vn("undefined", e);
      }, rn), za = {}, on, Fa = ((on = {}).function = function() {
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
      }, on), La = {};
      function Fr() {
        return !!bt(window).match(/MSIE|trident|edge\/12|edge\/13/i);
      }
      function Ho(e) {
        return !Bt(window, e);
      }
      function Vo(e, n) {
        if (e) {
          if (ae() !== Sn(e)) return !0;
        } else if (n && !pe(n)) return !0;
        return !1;
      }
      function Go(e) {
        var n = e.win, t = e.domain;
        return !(!Fr() || t && !Vo(t, n) || n && !Ho(n));
      }
      function Lr(e) {
        return "__postrobot_bridge___" + (e = e || Sn(e)).replace(/[^a-zA-Z0-9]+/g, "_");
      }
      function Jo() {
        return !!(window.name && window.name === Lr(ae()));
      }
      var ja = new S(function(e) {
        if (window.document && window.document.body) return e(window.document.body);
        var n = setInterval(function() {
          if (window.document && window.document.body)
            return clearInterval(n), e(window.document.body);
        }, 10);
      });
      function Ko(e) {
        $e("remoteWindowPromises").getOrSet(e, function() {
          return new S();
        });
      }
      function jr(e) {
        var n = $e("remoteWindowPromises").get(e);
        if (!n) throw new Error("Remote window promise not found");
        return n;
      }
      function Yo(e, n, t) {
        jr(e).resolve(function(o, i, s) {
          if (o !== e) throw new Error("Remote window does not match window");
          if (!tn(i, n)) throw new Error("Remote domain " + i + " does not match domain " + n);
          t.fireAndForget(s);
        });
      }
      function Ur(e, n) {
        jr(e).reject(n).catch(we);
      }
      function er(e) {
        for (var n = e.win, t = e.name, o = e.domain, i = ce("popupWindowsByName"), s = $e("popupWindowsByWin"), u = 0, f = i.keys(); u < f.length; u++) {
          var d = f[u], v = i.get(d);
          v && !ve(v.win) || i.del(d);
        }
        if (ve(n)) return {
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
          var v = i.call(this, Er(s), u, f, d);
          return v && (er({
            win: v,
            name: u,
            domain: s ? Sn(s) : null
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
                sendMessage: function(x) {
                  if (window && !window.closed && R()) {
                    var _ = R().domain;
                    if (_) try {
                      d({
                        data: x,
                        origin: _,
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
          send: t,
          receiveMessage: o
        }), function(s) {
          var u = s.send;
          yn(window).openTunnelToParent = function(f) {
            var d = f.name, v = f.source, g = f.canary, w = f.sendMessage, p = ce("tunnelWindows"), m = be(window);
            if (!m) throw new Error("No parent window found to open tunnel to");
            var y = function(P) {
              var R = P.name, x = P.source, _ = P.canary, q = P.sendMessage;
              (function() {
                for (var j = ce("tunnelWindows"), W = 0, Z = j.keys(); W < Z.length; W++) {
                  var L = Z[W];
                  ve(j[L].source) && j.del(L);
                }
              })();
              var I = qe();
              return ce("tunnelWindows").set(I, {
                name: R,
                source: x,
                canary: _,
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
          send: t
        }), function(s) {
          var u = s.on, f = s.send, d = s.receiveMessage;
          S.try(function() {
            var v = ke(window);
            if (v && Go({
              win: v
            })) {
              return Ko(v), (g = v, $e("remoteBridgeAwaiters").getOrSet(g, function() {
                return S.try(function() {
                  var w = Pt(g, Lr(ae()));
                  if (w) return pe(w) && yn(en(w)) ? w : new S(function(p) {
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
                      S.reject(m);
                    }
                  }
                }).then(function(p) {
                  var m = p.source, y = p.origin, P = p.data;
                  if (m !== v) throw new Error("Source does not match opener");
                  Yo(m, y, P.sendMessage);
                }).catch(function(p) {
                  throw Ur(v, p), p;
                }) : Ur(v, new Error("Can not register with opener: window does not have a name")) : Ur(v, new Error("Can not register with opener: no bridge found in opener"));
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
      function Br() {
        for (var e = ce("idToProxyWindow"), n = 0, t = e.keys(); n < t.length; n++) {
          var o = t[n];
          e.get(o).shouldClean() && e.del(o);
        }
      }
      function Xo(e, n) {
        var t = n.send, o = n.id, i = o === void 0 ? qe() : o, s = e.then(function(d) {
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
          getInstanceID: Ca(function() {
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
                  var x = R.url, _ = R.target, q = R.body, I = R.method, j = I === void 0 ? "post" : I, W = document.createElement("form");
                  if (W.setAttribute("target", _), W.setAttribute("method", j), W.setAttribute("action", x), W.style.display = "none", q) for (var Z = 0, L = Object.keys(q); Z < L.length; Z++) {
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
              er({
                win: v,
                name: d
              });
              var g = pe(v), w = po(v);
              if (!g) throw new Error("Can not set name for cross-domain window: " + d);
              en(v).name = d, w && w.setAttribute("name", d), s = S.resolve(d);
            });
          }
        };
      }
      var an = function() {
        function e(t) {
          var o = t.send, i = t.win, s = t.serializedWindow;
          this.id = void 0, this.isProxyWindow = !0, this.serializedWindow = void 0, this.actualWindow = void 0, this.actualWindowPromise = void 0, this.send = void 0, this.name = void 0, this.actualWindowPromise = new S(), this.serializedWindow = s || Xo(this.actualWindowPromise, {
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
          return this.getType().then(function(t) {
            return t === Ge.POPUP;
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
          }), $e("winToProxyWindow").set(t, this);
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
          return !!(this.actualWindow && ve(this.actualWindow));
        }, n.serialize = function() {
          return this.serializedWindow;
        }, e.unwrap = function(t) {
          return e.isProxyWindow(t) ? t.unwrap() : t;
        }, e.serialize = function(t, o) {
          var i = o.send;
          return Br(), e.toProxyWindow(t, {
            send: i
          }).serialize();
        }, e.deserialize = function(t, o) {
          var i = o.send;
          return Br(), ce("idToProxyWindow").get(t.id) || new e({
            serializedWindow: t,
            send: i
          });
        }, e.isProxyWindow = function(t) {
          return !!(t && !Hn(t) && t.isProxyWindow);
        }, e.toProxyWindow = function(t, o) {
          var i = o.send;
          if (Br(), e.isProxyWindow(t)) return t;
          var s = t;
          return $e("winToProxyWindow").get(s) || new e({
            win: s,
            send: i
          });
        }, e;
      }();
      function $r(e, n, t, o, i) {
        var s = $e("methodStore"), u = ce("proxyWindowMethods");
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
      function Qo(e, n) {
        var t = $e("methodStore"), o = ce("proxyWindowMethods");
        return t.getOrSet(e, function() {
          return {};
        })[n] || o.get(n);
      }
      function ko(e, n, t, o, i) {
        u = (s = {
          on: i.on,
          send: i.send
        }).on, f = s.send, ce("builtinListeners").getOrSet("functionCalls", function() {
          return u("postrobot_method", {
            domain: "*"
          }, function(g) {
            var w = g.source, p = g.origin, m = g.data, y = m.id, P = m.name, R = Qo(w, y);
            if (!R) throw new Error("Could not find method '" + P + "' with id: " + m.id + " in " + ae(window));
            var x = R.source, _ = R.domain, q = R.val;
            return S.try(function() {
              if (!tn(_, p)) throw new Error("Method '" + m.name + "' domain " + JSON.stringify(xr(R.domain) ? R.domain.source : R.domain) + " does not match origin " + p + " in " + ae(window));
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
                  return j === void 0 && (j = []), Cr(j).map(function(W) {
                    return typeof W == "string" ? "'" + W + "'" : W === void 0 ? "undefined" : W === null ? "null" : typeof W == "boolean" ? W.toString() : Array.isArray(W) ? "[ ... ]" : typeof W == "object" ? "{ ... }" : typeof W == "function" ? "() => { ... }" : "<" + typeof W + ">";
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
        var s, u, f, d = t.__id__ || qe();
        e = an.unwrap(e);
        var v = t.__name__ || t.name || o;
        return typeof v == "string" && typeof v.indexOf == "function" && v.indexOf("anonymous::") === 0 && (v = v.replace("anonymous::", o + "::")), an.isProxyWindow(e) ? ($r(d, t, v, e, n), e.awaitWindow().then(function(g) {
          $r(d, t, v, g, n);
        })) : $r(d, t, v, e, n), Vn("cross_domain_function", {
          id: d,
          name: v
        });
      }
      function ei(e, n, t, o) {
        var i, s = o.on, u = o.send;
        return function(f, d) {
          d === void 0 && (d = za);
          var v = JSON.stringify(f, function(g) {
            var w = this[g];
            if (zr(this)) return w;
            var p = qo(w);
            if (!p) return w;
            var m = d[p] || Ma[p];
            return m ? m(w, g) : w;
          });
          return v === void 0 ? "undefined" : v;
        }(t, ((i = {}).promise = function(f, d) {
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
      function ni(e, n, t, o) {
        var i, s = o.send;
        return function(u, f) {
          if (f === void 0 && (f = La), u !== "undefined") return JSON.parse(u, function(d, v) {
            if (zr(this)) return v;
            var g, w;
            if (zr(v) ? (g = v.__type__, w = v.__val__) : (g = qo(v), w = v), !g) return w;
            var p = f[g] || Fa[g];
            return p ? p(w, d) : w;
          });
        }(t, ((i = {}).cross_domain_zalgo_promise = function(u) {
          return function(f, d, v) {
            return new S(v.then);
          }(0, 0, u);
        }, i.cross_domain_function = function(u) {
          return function(f, d, v, g) {
            var w = v.id, p = v.name, m = g.send, y = function(R) {
              R === void 0 && (R = {});
              function x() {
                var _ = arguments;
                return an.toProxyWindow(f, {
                  send: m
                }).awaitWindow().then(function(q) {
                  var I = Qo(q, w);
                  if (I && I.val !== x) return I.val.apply({
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
      var Nt = {};
      Nt.postrobot_post_message = function(e, n, t) {
        t.indexOf("file:") === 0 && (t = "*"), e.postMessage(n, t);
      }, Nt.postrobot_bridge = function(e, n, t) {
        if (!Fr() && !Jo()) throw new Error("Bridge not needed for browser");
        if (pe(e)) throw new Error("Post message through bridge disabled between same domain windows");
        if (Bt(window, e) !== !1) throw new Error("Can only use bridge to communicate between two different windows, not between frames");
        (function(o, i, s) {
          var u = Ut(window, o), f = Ut(o, window);
          if (!u && !f) throw new Error("Can only send messages to and from parent and popup windows");
          jr(o).then(function(d) {
            return d(o, i, s);
          });
        })(e, t, n);
      }, Nt.postrobot_global = function(e, n) {
        if (!bt(window).match(/MSIE|rv:11|trident|edge\/12|edge\/13/i)) throw new Error("Global messaging not needed for browser");
        if (!pe(e)) throw new Error("Post message through global disabled between different domain windows");
        if (Bt(window, e) !== !1) throw new Error("Can only use global to communicate between two different windows, not between frames");
        var t = yn(e);
        if (!t) throw new Error("Can not find postRobot global on foreign window");
        t.receiveMessage({
          source: window,
          origin: ae(),
          data: n
        });
      };
      function qr(e, n, t, o) {
        var i = o.on, s = o.send;
        return S.try(function() {
          var u = $e().getOrSet(e, function() {
            return {};
          });
          return u.buffer = u.buffer || [], u.buffer.push(t), u.flush = u.flush || S.flush().then(function() {
            if (ve(e)) throw new Error("Window is closed");
            var f = ei(e, n, ((d = {}).__post_robot_11_0_0__ = u.buffer || [], d), {
              on: i,
              send: s
            }), d;
            delete u.buffer;
            for (var v = Object.keys(Nt), g = [], w = 0; w < v.length; w++) {
              var p = v[w];
              try {
                Nt[p](e, f, n);
              } catch (m) {
                g.push(m);
              }
            }
            if (g.length === v.length) throw new Error(`All post-robot messaging strategies failed:

` + g.map(function(m, y) {
              return y + ". " + at(m);
            }).join(`

`));
          }), u.flush.then(function() {
            delete u.flush;
          });
        }).then(we);
      }
      function ti(e) {
        return ce("responseListeners").get(e);
      }
      function ri(e) {
        ce("responseListeners").del(e);
      }
      function oi(e) {
        return ce("erroredResponseListeners").has(e);
      }
      function ii(e) {
        var n = e.name, t = e.win, o = e.domain, i = $e("requestListeners");
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
      function Hr(e, n) {
        var t = n.on, o = n.send, i = ce("receivedMessages");
        try {
          if (!window || window.closed || !e.source) return;
        } catch {
          return;
        }
        var s = e.source, u = e.origin, f = function(w, p, m, y) {
          var P = y.on, R = y.send, x;
          try {
            x = ni(p, m, w, {
              on: P,
              send: R
            });
          } catch {
            return;
          }
          if (x && typeof x == "object" && x !== null) {
            var _ = x.__post_robot_11_0_0__;
            if (Array.isArray(_)) return _;
          }
        }(e.data, s, u, {
          on: t,
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
                var R = P.on, x = P.send, _ = ii({
                  name: y.name,
                  win: p,
                  domain: m
                }), q = y.name === "postrobot_method" && y.data && typeof y.data.name == "string" ? y.data.name + "()" : y.name;
                function I(j, W, Z) {
                  return S.flush().then(function() {
                    if (!y.fireAndForget && !ve(p)) try {
                      return qr(p, m, {
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
                        send: x
                      });
                    } catch (L) {
                      throw new Error("Send response message failed for " + q + " in " + ae() + `

` + at(L));
                    }
                  });
                }
                S.all([S.flush().then(function() {
                  if (!y.fireAndForget && !ve(p)) try {
                    return qr(p, m, {
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

` + at(j));
                  }
                }), S.try(function() {
                  if (!_) throw new Error("No handler found for post message: " + y.name + " from " + m + " in " + window.location.protocol + "//" + window.location.host + window.location.pathname);
                  return _.handler({
                    source: p,
                    origin: m,
                    data: y.data
                  });
                }).then(function(j) {
                  return I("success", j);
                }, function(j) {
                  return I("error", null, j);
                })]).then(we).catch(function(j) {
                  if (_ && _.handleError) return _.handleError(j);
                  throw j;
                });
              }(s, u, w, {
                on: t,
                send: o
              }) : w.type === "postrobot_message_response" ? function(p, m, y) {
                if (!oi(y.hash)) {
                  var P = ti(y.hash);
                  if (!P) throw new Error("No handler found for post message response for message: " + y.name + " from " + m + " in " + window.location.protocol + "//" + window.location.host + window.location.pathname);
                  if (!tn(P.domain, m)) throw new Error("Response origin " + m + " does not match domain " + (R = P.domain, Array.isArray(R) ? "(" + R.join(" | ") + ")" : Ve(R) ? "RegExp(" + R.toString() + ")" : R.toString()));
                  var R;
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
                    if (!tn(P.domain, m)) throw new Error("Ack origin " + m + " does not match domain " + P.domain.toString());
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
      function Rn(e, n, t) {
        if (!e) throw new Error("Expected name");
        if (typeof (n = n || {}) == "function" && (t = n, n = {}), !t) throw new Error("Expected handler");
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
            for (var R = [], x = 0, _ = v; x < _.length; x++) R.push(i({
              name: f,
              win: p,
              domain: _[x]
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
          p && p !== "*" || (p = kt());
          var I = (v = v || "*").toString();
          if (q) throw p && v ? new Error("Request listener already exists for " + f + " on domain " + v.toString() + " for " + (p === kt() ? "wildcard" : "specified") + " window") : p ? new Error("Request listener already exists for " + f + " for " + (p === kt() ? "wildcard" : "specified") + " window") : v ? new Error("Request listener already exists for " + f + " on domain " + v.toString()) : new Error("Request listener already exists for " + f);
          var j = g.getOrSet(p, function() {
            return {};
          }), W = Tt(j, f, function() {
            return {};
          }), Z, L;
          return xr(v) ? (Z = Tt(W, "__domain_regex__", function() {
            return [];
          })).push(L = {
            regex: v,
            listener: u
          }) : W[I] = u, {
            cancel: function() {
              delete W[I], L && (Z.splice(Z.indexOf(L, 1)), Z.length || delete W.__domain_regex__), Object.keys(W).length || delete j[f], p && !Object.keys(j).length && g.del(p);
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
          return S.try(function() {
            if (function(g, w, p) {
              if (!g) throw new Error("Expected name");
              if (p && typeof p != "string" && !Array.isArray(p) && !xr(p)) throw new TypeError("Can not send " + g + ". Expected domain " + JSON.stringify(p) + " to be a string, array, or regex");
              if (ve(w)) throw new Error("Can not send " + g + ". Target window is closed");
            }(t, v, s), function(g, w) {
              var p = Ot(w);
              if (p) return p === g;
              if (w === g || On(w) === w) return !1;
              for (var m = 0, y = rt(g); m < y.length; m++) if (y[m] === w) return !0;
              return !1;
            }(window, v)) return Bo(v, f);
          }).then(function(g) {
            return function(w, p, m, y) {
              var P = y.send;
              return S.try(function() {
                return typeof p == "string" ? p : S.try(function() {
                  return m || Mr(w, {
                    send: P
                  }).then(function(R) {
                    return R.domain;
                  });
                }).then(function(R) {
                  if (!tn(p, p)) throw new Error("Domain " + Gt(p) + " does not match " + Gt(p));
                  return R;
                });
              });
            }(v, s, (g === void 0 ? {} : g).domain, {
              send: e
            });
          }).then(function(g) {
            var w = g, p = t === "postrobot_method" && o && typeof o.name == "string" ? o.name + "()" : t, m = new S(), y = t + "_" + qe();
            if (!d) {
              var P = {
                name: t,
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
                })(y), ri(y);
              });
              var x = function(W) {
                return $e("knownWindows").get(W, !1);
              }(v) ? 1e4 : 2e3, _ = u, q = x, I = _, j = Rt(function() {
                return ve(v) ? m.reject(new Error("Window closed for " + t + " before " + (P.ack ? "response" : "ack"))) : P.cancelled ? m.reject(new Error("Response listener was cancelled for " + t)) : (q = Math.max(q - 500, 0), I !== -1 && (I = Math.max(I - 500, 0)), P.ack || q !== 0 ? I === 0 ? m.reject(new Error("No response for postMessage " + p + " in " + ae() + " in " + _ + "ms")) : void 0 : m.reject(new Error("No ack for postMessage " + p + " in " + ae() + " in " + x + "ms")));
              }, 500);
              m.finally(function() {
                j.cancel(), R.splice(R.indexOf(m, 1));
              }).catch(we);
            }
            return qr(v, w, {
              id: qe(),
              origin: ae(window),
              type: "postrobot_message_request",
              hash: y,
              name: t,
              data: o,
              fireAndForget: d
            }, {
              on: Rn,
              send: e
            }).then(function() {
              return d ? m.resolve() : m;
            }, function(W) {
              throw new Error("Send request message failed for " + p + " in " + ae() + `

` + at(W));
            });
          });
        });
      };
      function xt(e) {
        return an.toProxyWindow(e, {
          send: pn
        });
      }
      function ai(e) {
        for (var n = 0, t = $e("requestPromises").get(e, []); n < t.length; n++) t[n].reject(new Error("Window " + (ve(e) ? "closed" : "cleaned up") + " before response")).catch(we);
      }
      var Wn;
      Wn = {
        setupBridge: Zo,
        openBridge: function(e, n) {
          var t = ce("bridges"), o = ce("bridgeFrames");
          return n = n || Sn(e), t.getOrSet(n, function() {
            return S.try(function() {
              if (ae() === n) throw new Error("Can not open bridge on the same domain as current domain: " + n);
              var i = Lr(n);
              if (Pt(window, i)) throw new Error("Frame with name " + i + " already exists on page");
              var s = function(u, f) {
                var d = document.createElement("iframe");
                return d.setAttribute("name", u), d.setAttribute("id", u), d.setAttribute("style", "display: none; margin: 0; padding: 0; border: 0px none; overflow: hidden;"), d.setAttribute("frameborder", "0"), d.setAttribute("border", "0"), d.setAttribute("scrolling", "no"), d.setAttribute("allowTransparency", "true"), d.setAttribute("tabindex", "-1"), d.setAttribute("hidden", "true"), d.setAttribute("title", ""), d.setAttribute("role", "presentation"), d.src = f, d;
              }(i, e);
              return o.set(n, s), ja.then(function(u) {
                u.appendChild(s);
                var f = s.contentWindow;
                return new S(function(d, v) {
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
            domain: Sn(n)
          });
        },
        isBridge: Jo,
        needsBridge: Go,
        needsBridgeForBrowser: Fr,
        hasBridge: function(e, n) {
          return ce("bridges").has(n || Sn(e));
        },
        needsBridgeForWin: Ho,
        needsBridgeForDomain: Vo,
        destroyBridges: function() {
          for (var e = ce("bridges"), n = ce("bridgeFrames"), t = 0, o = n.keys(); t < o.length; t++) {
            var i = n.get(o[t]);
            i && i.parentNode && i.parentNode.removeChild(i);
          }
          n.reset(), e.reset();
        }
      };
      function It(e) {
        if (!pe(e)) throw new Error("Can not get global for window on different domain");
        return e.__zoid_10_3_3__ || (e.__zoid_10_3_3__ = {}), e.__zoid_10_3_3__;
      }
      function si(e, n) {
        try {
          return n(It(e));
        } catch {
        }
      }
      function nr(e) {
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
      function Ua(e) {
        return Sr(JSON.stringify(e));
      }
      function Vr(e) {
        var n = It(e);
        return n.references = n.references || {}, n.references;
      }
      function ui(e) {
        var n = e.data, t = e.metaData, o = e.sender, i = e.receiver, s = e.passByReference, u = s !== void 0 && s, f = e.basic, d = f !== void 0 && f, v = xt(i.win), g = d ? JSON.stringify(n) : ei(v, i.domain, n, {
          on: Rn,
          send: pn
        }), w = u ? function(p) {
          var m = qe();
          return Vr(window)[m] = p, {
            type: "uid",
            uid: m
          };
        }(g) : {
          type: "raw",
          val: g
        };
        return {
          serializedData: Ua({
            sender: {
              domain: o.domain
            },
            metaData: t,
            reference: w
          }),
          cleanReference: function() {
            p = window, (m = w).type === "uid" && delete Vr(p)[m.uid];
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
          if (w.type === "uid") return Vr(g)[w.uid];
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
      }, tr = {
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
      function Gr(e) {
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
      var Ba = Dn(function(e) {
        var n = ci({
          data: Gr(e).serializedInitialPayload,
          sender: {
            win: function(t) {
              return function(o) {
                if (o.type === "opener") return Yt("opener", ke(window));
                if (o.type === "parent" && typeof o.distance == "number") return Yt("parent", function(w, p) {
                  return p === void 0 && (p = 1), function(m, y) {
                    y === void 0 && (y = 1);
                    for (var P = m, R = 0; R < y; R++) {
                      if (!P) return;
                      P = be(P);
                    }
                    return P;
                  }(w, yr(w) - p);
                }(window, o.distance));
                if (o.type === "global" && o.uid && typeof o.uid == "string") {
                  var i = o.uid, s = Ot(window);
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
                  return Yt("namedWindow", function(w, p) {
                    return Pt(w, p) || function m(y, P) {
                      var R = Pt(y, P);
                      if (R) return R;
                      for (var x = 0, _ = rt(y); x < _.length; x++) {
                        var q = m(_[x], P);
                        if (q) return q;
                      }
                    }(On(w) || w, p);
                  }(Yt("ancestor", Ot(window)), g));
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
        return Ba(window.name);
      }
      function $a(e, n) {
        if (n === void 0 && (n = window), e === be(n)) return {
          type: "parent",
          distance: yr(e)
        };
        if (e === ke(n)) return {
          type: "opener"
        };
        if (pe(e) && (o = e, o !== On(o))) {
          var t = en(e).name;
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
      function qa() {
        return S.try(function() {
          window.focus();
        });
      }
      function hi() {
        return S.try(function() {
          window.close();
        });
      }
      var Tn = function() {
        return we;
      }, Gn = function(e) {
        return Vt(e.value);
      };
      function Jr(e, n, t) {
        for (var o = 0, i = Object.keys(O({}, e, n)); o < i.length; o++) {
          var s = i[o];
          t(s, n[s], e[s]);
        }
      }
      function pi(e, n, t) {
        var o = {};
        return S.all(function(i, s, u) {
          var f = [];
          return Jr(i, s, function(d, v, g) {
            var w = function(p, m, y) {
              return S.resolve().then(function() {
                var P, R;
                if (y != null && m) {
                  var x = (P = {}, P.get = m.queryParam, P.post = m.bodyParam, P)[t], _ = (R = {}, R.get = m.queryValue, R.post = m.bodyValue, R)[t];
                  if (x) return S.hash({
                    finalParam: S.try(function() {
                      return typeof x == "function" ? x({
                        value: y
                      }) : typeof x == "string" ? x : p;
                    }),
                    finalValue: S.try(function() {
                      return typeof _ == "function" && _n(y) ? _({
                        value: y
                      }) : y;
                    })
                  }).then(function(q) {
                    var I = q.finalParam, j = q.finalValue, W;
                    if (typeof j == "boolean") W = j.toString();
                    else if (typeof j == "string") W = j.toString();
                    else if (typeof j == "object" && j !== null) {
                      if (m.serialization === tr.JSON) W = JSON.stringify(j);
                      else if (m.serialization === tr.BASE64) W = Sr(JSON.stringify(j));
                      else if (m.serialization === tr.DOTIFY || !m.serialization) {
                        W = function ee(G, U, re) {
                          U === void 0 && (U = ""), re === void 0 && (re = {}), U = U && U + ".";
                          for (var X in G) G.hasOwnProperty(X) && G[X] != null && typeof G[X] != "function" && (G[X] && Array.isArray(G[X]) && G[X].length && G[X].every(function(Oe) {
                            return typeof Oe != "object";
                          }) ? re["" + U + X + "[]"] = G[X].join(",") : G[X] && typeof G[X] == "object" ? re = ee(G[X], "" + U + X, re) : re["" + U + X] = G[X].toString());
                          return re;
                        }(j, p);
                        for (var Z = 0, L = Object.keys(W); Z < L.length; Z++) {
                          var oe = L[Z];
                          o[oe] = W[oe];
                        }
                        return;
                      }
                    } else typeof j == "number" && (W = j.toString());
                    o[I] = W;
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
        var n = e.uid, t = e.options, o = e.overrides, i = o === void 0 ? {} : o, s = e.parentWin, u = s === void 0 ? window : s, f = t.propsDef, d = t.containerTemplate, v = t.prerenderTemplate, g = t.tag, w = t.name, p = t.attributes, m = t.dimensions, y = t.autoResize, P = t.url, R = t.domain, x = t.exports, _ = new S(), q = [], I = Kt(), j = {}, W = {}, Z = {
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
                J.push(S.try(function() {
                  return Ae.apply(void 0, F);
                }));
              }, he = 0; he < k.length; he++) le();
            return S.all(J).then(we);
          },
          triggerOnce: function(T) {
            if (oe[T]) return S.resolve();
            oe[T] = !0;
            for (var N = arguments.length, F = new Array(N > 1 ? N - 1 : 0), A = 1; A < N; A++) F[A - 1] = arguments[A];
            return G.trigger.apply(G, [T].concat(F));
          },
          reset: function() {
            ee = {};
          }
        }), oe, ee, G, U = i.props ? i.props : {}, re, X, Oe, En, sn, An = !1, Mn = i.onError, Cn = i.getProxyContainer, zn = i.show, Fn = i.hide, Jn = i.close, Ln = i.renderContainer, vn = i.getProxyWindow, Kn = i.setProxyWin, jn = i.openFrame, Un = i.openPrerenderFrame, Yn = i.prerender, Zn = i.open, ne = i.openPrerender, un = i.watchForUnload, te = i.getInternalState, _e = i.setInternalState, Se = function() {
          return typeof m == "function" ? m({
            props: U
          }) : m;
        }, We = function() {
          return S.try(function() {
            return i.resolveInitPromise ? i.resolveInitPromise() : _.resolve();
          });
        }, Ee = function(T) {
          return S.try(function() {
            return i.rejectInitPromise ? i.rejectInitPromise(T) : _.reject(T);
          });
        }, He = function(T) {
          for (var N = {}, F = 0, A = Object.keys(U); F < A.length; F++) {
            var k = A[F], J = f[k];
            if (!J || J.sendToChild !== !1) {
              var le = J && J.trustedDomains && J.trustedDomains.length > 0 ? J.trustedDomains.reduce(function(he, Ae) {
                return he || tn(Ae, T);
              }, !1) : tn(T, ae(window));
              J && J.sameDomain && !le || J && J.trustedDomains && !le || (N[k] = U[k]);
            }
          }
          return S.hash(N);
        }, xe = function() {
          return S.try(function() {
            return te ? te() : Z;
          });
        }, Ie = function(T) {
          return S.try(function() {
            return _e ? _e(T) : Z = O({}, Z, T);
          });
        }, cn = function() {
          return vn ? vn() : S.try(function() {
            var T = U.window;
            if (T) {
              var N = xt(T);
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
            re = T;
          });
        }, wn = function() {
          return zn ? zn() : S.hash({
            setState: Ie({
              visible: !0
            }),
            showElement: X ? X.get().then(Da) : null
          }).then(we);
        }, Nn = function() {
          return Fn ? Fn() : S.hash({
            setState: Ie({
              visible: !1
            }),
            showElement: X ? X.get().then(Do) : null
          }).then(we);
        }, ct = function() {
          return typeof P == "function" ? P({
            props: U
          }) : P;
        }, dt = function() {
          return typeof p == "function" ? p({
            props: U
          }) : p;
        }, Xn = function() {
          return Sn(ct());
        }, Ze = function(T, N) {
          var F = N.windowName;
          return jn ? jn(T, {
            windowName: F
          }) : S.try(function() {
            if (T === Pe.IFRAME) return nr(xo({
              attributes: O({
                name: F,
                title: w
              }, dt().iframe)
            }));
          });
        }, Dt = function(T) {
          return Un ? Un(T) : S.try(function() {
            if (T === Pe.IFRAME) return nr(xo({
              attributes: O({
                name: "__zoid_prerender_frame__" + w + "_" + qe() + "__",
                title: "prerender__" + w
              }, dt().iframe)
            }));
          });
        }, _t = function(T, N, F) {
          return ne ? ne(T, N, F) : S.try(function() {
            if (T === Pe.IFRAME) {
              if (!F) throw new Error("Expected proxy frame to be passed");
              return F.get().then(function(A) {
                return I.register(function() {
                  return Ct(A);
                }), _r(A).then(function(k) {
                  return en(k);
                }).then(function(k) {
                  return xt(k);
                });
              });
            }
            if (T === Pe.POPUP) return N;
            throw new Error("No render context available for " + T);
          });
        }, ft = function() {
          return S.try(function() {
            if (re) return S.all([L.trigger(me.FOCUS), re.focus()]).then(we);
          });
        }, rr = function() {
          var T = It(window);
          return T.windows = T.windows || {}, T.windows[n] = window, I.register(function() {
            delete T.windows[n];
          }), n;
        }, Wt = function(T, N, F, A) {
          if (N === ae(window)) return {
            type: "global",
            uid: rr()
          };
          if (T !== window) throw new Error("Can not construct cross-domain window reference for different target window");
          if (U.window) {
            var k = A.getWindow();
            if (!k) throw new Error("Can not construct cross-domain window reference for lazy window prop");
            if (Ot(k) !== window) throw new Error("Can not construct cross-domain window reference for window prop with different ancestor");
          }
          if (F === Pe.POPUP) return {
            type: "opener"
          };
          if (F === Pe.IFRAME) return {
            type: "parent",
            distance: yr(window)
          };
          throw new Error("Can not construct window reference for child");
        }, or = function(T, N) {
          return S.try(function() {
            var F;
            En = T, Oe = N, (F = re) == null || F.isPopup().then(function(A) {
              if ((N == null ? void 0 : N.name) !== "" && A) {
                var k;
                (k = re) == null || k.setName(N == null ? void 0 : N.name);
              }
            }).finally(function() {
              We(), I.register(function() {
                return N.close.fireAndForget().catch(we);
              });
            });
          });
        }, At = function(T) {
          var N = T.width, F = T.height;
          return S.try(function() {
            L.trigger(me.RESIZE, {
              width: N,
              height: F
            });
          });
        }, Mt = function(T) {
          return S.try(function() {
            return L.trigger(me.DESTROY);
          }).catch(we).then(function() {
            return I.all(T);
          }).then(function() {
            var N = T || new Error("Component destroyed");
            sn && ut(sn) || N.message === "Window navigated away" ? _.resolve() : _.asyncReject(N);
          });
        }, xn = Dn(function(T) {
          return S.try(function() {
            return Jn ? ve(Jn.__source__) ? void 0 : Jn() : S.try(function() {
              return L.trigger(me.CLOSE);
            }).then(function() {
              return Mt(T || new Error("Component closed"));
            });
          });
        }), gi = function(T, N) {
          var F = N.proxyWin, A = N.proxyFrame, k = N.windowName;
          return Zn ? Zn(T, {
            proxyWin: F,
            proxyFrame: A,
            windowName: k
          }) : S.try(function() {
            if (T === Pe.IFRAME) {
              if (!A) throw new Error("Expected proxy frame to be passed");
              return A.get().then(function(Re) {
                return _r(Re).then(function(de) {
                  return I.register(function() {
                    return Ct(Re);
                  }), I.register(function() {
                    return ai(de);
                  }), de;
                });
              });
            }
            if (T === Pe.POPUP) {
              var J = Se(), le = J.width, he = le === void 0 ? "300px" : le, Ae = J.height, ge = Ae === void 0 ? "150px" : Ae;
              he = zo(he, window.outerWidth), ge = zo(ge, window.outerWidth);
              var De = function(Re, de) {
                var Te = (de = de || {}).closeOnUnload, ye = Te === void 0 ? 1 : Te, Xe = de.name, Me = Xe === void 0 ? "" : Xe, ie = de.width, ze = de.height, Je = 0, Ue = 0;
                ie && (window.outerWidth ? Ue = Math.round((window.outerWidth - ie) / 2) + window.screenX : window.screen.width && (Ue = Math.round((window.screen.width - ie) / 2))), ze && (window.outerHeight ? Je = Math.round((window.outerHeight - ze) / 2) + window.screenY : window.screen.height && (Je = Math.round((window.screen.height - ze) / 2))), delete de.closeOnUnload, delete de.name, ie && ze && (de = O({
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
                  if (de[bn] != null) return bn + "=" + Gt(de[bn]);
                }).filter(Boolean).join(","), dn;
                try {
                  dn = window.open("", Me, Qn);
                } catch (bn) {
                  throw new Dr("Can not open popup window - " + (bn.stack || bn.message));
                }
                if (ve(dn))
                  throw new Dr("Can not open popup window - blocked");
                return ye && window.addEventListener("unload", function() {
                  return dn.close();
                }), dn;
              }(0, O({
                name: k,
                width: he,
                height: ge
              }, dt().popup));
              return I.register(function() {
                return vo(De);
              }), I.register(function() {
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
          return S.try(function() {
            var T = Io(window, "unload", Vt(function() {
              Mt(new Error("Window navigated away"));
            })), N = ho(u, Mt, 3e3);
            if (I.register(N.cancel), I.register(T.cancel), un) return un();
          });
        }, Ei = function(T) {
          var N = !1;
          return T.isClosed().then(function(F) {
            return F ? (N = !0, xn(new Error("Detected component window close"))) : S.delay(200).then(function() {
              return T.isClosed();
            }).then(function(A) {
              if (A)
                return N = !0, xn(new Error("Detected component window close"));
            });
          }).then(function() {
            return N;
          });
        }, zt = function(T) {
          return Mn ? Mn(T) : S.try(function() {
            if (q.indexOf(T) === -1)
              return q.push(T), _.asyncReject(T), L.trigger(me.ERROR, T);
          });
        }, bi = new S(), Pi = function(T) {
          return S.try(function() {
            bi.resolve(T);
          });
        };
        or.onError = zt;
        var Oi = function(T, N) {
          return T({
            uid: n,
            container: N.container,
            context: N.context,
            doc: N.doc,
            frame: N.frame,
            prerenderFrame: N.prerenderFrame,
            focus: ft,
            close: xn,
            state: j,
            props: U,
            tag: g,
            dimensions: Se(),
            event: L
          });
        }, Si = function(T, N) {
          var F = N.context;
          return Yn ? Yn(T, {
            context: F
          }) : S.try(function() {
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
                var k = (A = en(A)).document, J = Oi(v, {
                  context: F,
                  doc: k
                });
                if (J) {
                  if (J.ownerDocument !== k) throw new Error("Expected prerender template to have been created with document from child window");
                  (function(Te, ye) {
                    var Xe = ye.tagName.toLowerCase();
                    if (Xe !== "html") throw new Error("Expected element to be html, got " + Xe);
                    for (var Me = Te.document.documentElement, ie = 0, ze = Cr(Me.children); ie < ze.length; ie++) Me.removeChild(ze[ie]);
                    for (var Je = 0, Ue = Cr(ye.children); Je < Ue.length; Je++) Me.appendChild(Ue[Je]);
                  })(A, J);
                  var le = y.width, he = le !== void 0 && le, Ae = y.height, ge = Ae !== void 0 && Ae, De = y.element, Re = De === void 0 ? "body" : De;
                  if ((Re = Ir(Re, k)) && (he || ge)) {
                    var de = _o(Re, function(Te) {
                      At({
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
          }) : S.hash({
            container: T.get(),
            frame: F ? F.get() : null,
            prerenderFrame: A ? A.get() : null,
            internalState: xe()
          }).then(function(le) {
            var he = le.container, Ae = le.internalState.visible, ge = Oi(d, {
              context: k,
              container: he,
              frame: le.frame,
              prerenderFrame: le.prerenderFrame,
              doc: document
            });
            if (ge) {
              Ae || Do(ge), Ia(he, ge);
              var De = function(Re, de) {
                de = Vt(de);
                var Te = !1, ye = [], Xe, Me, ie, ze = function() {
                  Te = !0;
                  for (var dn = 0; dn < ye.length; dn++) ye[dn].disconnect();
                  Xe && Xe.cancel(), ie && ie.removeEventListener("unload", Je), Me && Ct(Me);
                }, Je = function() {
                  Te || (de(), ze());
                };
                if (ut(Re))
                  return Je(), {
                    cancel: ze
                  };
                if (window.MutationObserver)
                  for (var Ue = Re.parentElement; Ue; ) {
                    var Qn = new window.MutationObserver(function() {
                      ut(Re) && Je();
                    });
                    Qn.observe(Ue, {
                      childList: !0
                    }), ye.push(Qn), Ue = Ue.parentElement;
                  }
                return (Me = document.createElement("iframe")).setAttribute("name", "__detect_close_" + qe() + "__"), Me.style.display = "none", _r(Me).then(function(dn) {
                  (ie = en(dn)).addEventListener("unload", Je);
                }), Re.appendChild(Me), Xe = Rt(function() {
                  ut(Re) && Je();
                }, 1e3), {
                  cancel: ze
                };
              }(ge, function() {
                var Re = new Error("Detected container element removed from DOM");
                return S.delay(1).then(function() {
                  if (!ut(ge))
                    return I.all(Re), J().then(We, Ee);
                  xn(Re);
                });
              });
              return I.register(function() {
                return De.cancel();
              }), I.register(function() {
                return Ct(ge);
              }), X = nr(ge);
            }
          });
        }, Ti = function() {
          return {
            state: j,
            event: L,
            close: xn,
            focus: ft,
            resize: At,
            onError: zt,
            updateProps: es,
            show: wn,
            hide: Nn
          };
        }, Zr = function(T) {
          T === void 0 && (T = {});
          var N = sn, F = Ti();
          st(W, T), function(A, k, J, le, he) {
            var Ae = le.state, ge = le.close, De = le.focus, Re = le.event, de = le.onError;
            Jr(J, A, function(Te, ye, Xe) {
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
            }), Jr(k, A, we);
          }(f, U, W, F, N);
        }, es = function(T) {
          return Zr(T), _.then(function() {
            var N = Oe, F = re;
            if (N && F && En) return He(En).then(function(A) {
              return N.updateProps(A).catch(function(k) {
                return Ei(F).then(function(J) {
                  if (!J) throw k;
                });
              });
            });
          });
        }, Ci = function(T) {
          return Cn ? Cn(T) : S.try(function() {
            return Co(T);
          }).then(function(N) {
            return Wr(N) && (N = function F(A) {
              var k = function(Ae) {
                var ge = function(De) {
                  for (; De.parentNode; ) De = De.parentNode;
                  if (Wr(De)) return De;
                }(Ae);
                if (ge && ge.host) return ge.host;
              }(A);
              if (!k) throw new Error("Element is not in shadow dom");
              var J = "shadow-slot-" + qe(), le = document.createElement("slot");
              le.setAttribute("name", J), A.appendChild(le);
              var he = document.createElement("div");
              return he.setAttribute("slot", J), k.appendChild(he), Wr(k) ? F(he) : he;
            }(N)), sn = N, nr(N);
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
              }), I.register(L.reset);
            })();
          },
          render: function(T) {
            var N = T.target, F = T.container, A = T.context, k = T.rerender;
            return S.try(function() {
              var J = Xn(), le = R || Xn();
              (function(H, Fe, Ce) {
                if (H !== window) {
                  if (!Bt(window, H)) throw new Error("Can only renderTo an adjacent frame");
                  var Le = ae();
                  if (!tn(Fe, Le) && !pe(H)) throw new Error("Can not render remotely to " + Fe.toString() + " - can only render to " + Le);
                  if (Ce && typeof Ce != "string") throw new Error("Container passed to renderTo must be a string selector, got " + typeof Ce + " }");
                }
              })(N, le, F);
              var he = S.try(function() {
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
                      close: xn,
                      onError: zt,
                      getInternalState: xe,
                      setInternalState: Ie,
                      resolveInitPromise: We,
                      rejectInitPromise: Ee
                    }
                  }).then(function(K) {
                    var Y = K.data.parent;
                    return I.register(function(D) {
                      if (!ve(Fe)) return Y.destroy(D);
                    }), Y.getDelegateOverrides();
                  }).catch(function(K) {
                    throw new Error(`Unable to delegate rendering. Possibly the component is not loaded in the target window.

` + at(K));
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
                return Zr();
              }), Xe = ye.then(function() {
                return pi(f, U, "get").then(function(H) {
                  return function(Fe, Ce) {
                    var Le = Ce.query || {}, nn = Ce.hash || {}, Ne, ln, Be = Fe.split("#");
                    ln = Be[1];
                    var K = (Ne = Be[0]).split("?");
                    Ne = K[0];
                    var Y = To(K[1], Le), D = To(ln, nn);
                    return Y && (Ne = Ne + "?" + Y), D && (Ne = Ne + "#" + D), Ne;
                  }(Er(ct()), {
                    query: H
                  });
                });
              }), Me = Te.then(function(H) {
                return function(Ce) {
                  var Le = Ce === void 0 ? {} : Ce, nn = Le.proxyWin, Ne = Le.initialChildDomain, ln = Le.childDomainMatch, Be = Le.target, K = Be === void 0 ? window : Be, Y = Le.context;
                  return function(D) {
                    var Q = D === void 0 ? {} : D, Xr = Q.proxyWin, ss = Q.childDomainMatch, us = Q.context;
                    return He(Q.initialChildDomain).then(function(cs) {
                      return {
                        uid: n,
                        context: us,
                        tag: g,
                        childDomainMatch: ss,
                        version: "10_3_3",
                        props: cs,
                        exports: (Ii = Xr, {
                          init: function(ds) {
                            return or(this.origin, ds);
                          },
                          close: xn,
                          checkClose: function() {
                            return Ei(Ii);
                          },
                          resize: At,
                          onError: zt,
                          show: wn,
                          hide: Nn,
                          export: Pi
                        })
                      };
                      var Ii;
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
                        windowRef: Wt(K, Ne, Y, nn)
                      },
                      sender: {
                        domain: ae(window)
                      },
                      receiver: {
                        win: nn,
                        domain: ln
                      },
                      passByReference: Ne === ae()
                    }), Xr = Q.serializedData;
                    return I.register(Q.cleanReference), Xr;
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
              }), ze = Dt(A), Je = S.hash({
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
              }), Ue = S.hash({
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
              }), Qn = S.hash({
                proxyWin: Ue,
                proxyPrerenderFrame: ze
              }).then(function(H) {
                return _t(A, H.proxyWin, H.proxyPrerenderFrame);
              }), dn = Ue.then(function(H) {
                return re = H, Ye(H);
              }), bn = S.hash({
                proxyPrerenderWin: Qn,
                state: dn
              }).then(function(H) {
                return Si(H.proxyPrerenderWin, {
                  context: A
                });
              }), Ni = S.hash({
                proxyWin: Ue,
                windowName: Me
              }).then(function(H) {
                if (Ae) return H.proxyWin.setName(H.windowName);
              }), ns = S.hash({
                body: De
              }).then(function(H) {
                return t.method ? t.method : Object.keys(H.body).length ? "post" : "get";
              }), xi = S.hash({
                proxyWin: Ue,
                windowUrl: Xe,
                body: De,
                method: ns,
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
                  return I.register(function() {
                    nn = !0;
                  }), S.delay(2e3).then(function() {
                    return Ce.isClosed();
                  }).then(function(Ne) {
                    if (!nn) {
                      if (Le === Pe.POPUP && Ne) return xn(new Error("Detected popup close"));
                      var ln = !!(sn && ut(sn));
                      return Le === Pe.IFRAME && Ne && (ln || An) ? xn(new Error("Detected iframe close")) : Fe(Ce, Le);
                    }
                  });
                })(H, A);
              }), rs = S.hash({
                container: Je,
                prerender: bn
              }).then(function() {
                return L.trigger(me.DISPLAY);
              }), os = Ue.then(function(H) {
                return function(Fe, Ce, Le) {
                  return S.try(function() {
                    return Fe.awaitWindow();
                  }).then(function(nn) {
                    if (Wn && Wn.needsBridge({
                      win: nn,
                      domain: Ce
                    }) && !Wn.hasBridge(Ce, Ce)) {
                      var Ne = typeof t.bridgeUrl == "function" ? t.bridgeUrl({
                        props: U
                      }) : t.bridgeUrl;
                      if (!Ne) throw new Error("Bridge needed to render " + Le);
                      var ln = Sn(Ne);
                      return Wn.linkUrl(nn, Ce), Wn.openBridge(Er(Ne), ln);
                    }
                  });
                }(H, J, A);
              }), is = xi.then(function() {
                return S.try(function() {
                  var H = U.timeout;
                  if (H) return _.timeout(H, new Error("Loading component timed out after " + H + " milliseconds"));
                });
              }), as = _.then(function() {
                return An = !0, L.trigger(me.RENDERED);
              });
              return S.hash({
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
                loadUrlPromise: xi,
                buildWindowNamePromise: Me,
                setWindowNamePromise: Ni,
                watchForClosePromise: ts,
                onDisplayPromise: rs,
                openBridgePromise: os,
                runTimeoutPromise: is,
                onRenderedPromise: as,
                delegatePromise: he,
                watchForUnloadPromise: ge,
                finalSetPropsPromise: ye
              });
            }).catch(function(J) {
              return S.all([zt(J), Mt(J)]).then(function() {
                throw J;
              }, function() {
                throw J;
              });
            }).then(we);
          },
          destroy: Mt,
          getProps: function() {
            return U;
          },
          setProps: Zr,
          export: Pi,
          getHelpers: Ti,
          getDelegateOverrides: function() {
            return S.try(function() {
              return {
                getProxyContainer: Ci,
                show: wn,
                hide: Nn,
                renderContainer: Ri,
                getProxyWindow: cn,
                watchForUnload: yi,
                openFrame: Ze,
                openPrerenderFrame: Dt,
                prerender: Si,
                open: gi,
                openPrerender: _t,
                setProxyWin: Ye
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
      var Ha = {
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
              var v = s.findDOMNode(this), g = t(st({}, this.props));
              g.render(v, Pe.IFRAME), this.setState({
                parent: g
              });
            }, d.componentDidUpdate = function() {
              this.state && this.state.parent && this.state.parent.updateProps(st({}, this.props)).catch(we);
            }, f;
          }(i.Component);
        }
      }, Va = {
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
                return f === "style-object" || f === "styleObject" ? (u.style = d, u.styleObject = d) : f.includes("-") ? u[Tr(f)] = d : u[f] = d, u;
              }, {}))));
              var s;
              this.parent.render(i, Pe.IFRAME);
            },
            watch: {
              $attrs: {
                handler: function() {
                  this.parent && this.$attrs && this.parent.updateProps(O({}, this.$attrs)).catch(we);
                },
                deep: !0
              }
            }
          });
        }
      }, Ga = {
        register: function(e, n, t) {
          return {
            template: "<div></div>",
            inheritAttrs: !1,
            mounted: function() {
              var o = this.$el;
              this.parent = t(O({}, (i = this.$attrs, Object.keys(i).reduce(function(s, u) {
                var f = i[u];
                return u === "style-object" || u === "styleObject" ? (s.style = f, s.styleObject = f) : u.includes("-") ? s[Tr(u)] = f : s[u] = f, s;
              }, {}))));
              var i;
              this.parent.render(o, Pe.IFRAME);
            },
            watch: {
              $attrs: {
                handler: function() {
                  this.parent && this.$attrs && this.parent.updateProps(O({}, this.$attrs)).catch(we);
                },
                deep: !0
              }
            }
          };
        }
      }, Ja = {
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
                w.render(d[0], Pe.IFRAME), f.$watch(function() {
                  w.updateProps(g()).catch(we);
                });
              }]
            };
          });
        }
      }, Ka = {
        register: function(e, n, t, o) {
          var i = o.Component, s = o.NgModule, u = o.ElementRef, f = o.NgZone, d = o.Inject, v = function() {
            function w(m, y) {
              this.elementRef = void 0, this.internalProps = void 0, this.parent = void 0, this.props = void 0, this.zone = void 0, this._props = void 0, this._props = {}, this.elementRef = m, this.zone = y;
            }
            var p = w.prototype;
            return p.getProps = function() {
              var m = this;
              return Jt(O({}, this.internalProps, this.props), function(y) {
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
              this.parent = t(this.getProps()), this.parent.render(m, Pe.IFRAME);
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
      function Ya(e) {
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
        `)), g.appendChild(t), g.appendChild(o), g.appendChild(w), o.classList.add("zoid-visible"), t.classList.add("zoid-invisible"), u.on(me.RENDERED, function() {
            o.classList.remove("zoid-visible"), o.classList.add("zoid-invisible"), t.classList.remove("zoid-invisible"), t.classList.add("zoid-visible"), setTimeout(function() {
              Ct(o);
            }, 1);
          }), u.on(me.RESIZE, function(p) {
            var m = p.width, y = p.height;
            typeof m == "number" && (g.style.width = Mo(m)), typeof y == "number" && (g.style.height = Mo(y));
          }), g;
        }
      }
      function Za(e) {
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
      var Kr = Kt(), Yr = Kt();
      function Xa(e) {
        var n = function(y) {
          var P = y.tag, R = y.url, x = y.domain, _ = y.bridgeUrl, q = y.props, I = q === void 0 ? {} : q, j = y.dimensions, W = j === void 0 ? {} : j, Z = y.autoResize, L = Z === void 0 ? {} : Z, oe = y.allowedParentDomains, ee = oe === void 0 ? "*" : oe, G = y.attributes, U = G === void 0 ? {} : G, re = y.defaultContext, X = re === void 0 ? Pe.IFRAME : re, Oe = y.containerTemplate, En = Oe === void 0 ? Ya : Oe, sn = y.prerenderTemplate, An = sn === void 0 ? Za : sn, Mn = y.validate, Cn = y.eligible, zn = Cn === void 0 ? function() {
            return {
              eligible: !0
            };
          } : Cn, Fn = y.logger, Jn = Fn === void 0 ? {
            info: we
          } : Fn, Ln = y.exports, vn = Ln === void 0 ? we : Ln, Kn = y.method, jn = y.children, Un = jn === void 0 ? function() {
            return {};
          } : jn, Yn = P.replace(/-/g, "_"), Zn = O({}, {
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
                return xt(ne.value);
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
          }, I);
          if (!En) throw new Error("Container template required");
          return {
            name: Yn,
            tag: P,
            url: R,
            domain: x,
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
              for (var un = ne.getExports, te = {}, _e = function() {
                var Ee = We[Se], He = vn[Ee].type, xe = un().then(function(Ie) {
                  return Ie[Ee];
                });
                te[Ee] = He === fe.FUNCTION ? function() {
                  for (var Ie = arguments.length, cn = new Array(Ie), Ye = 0; Ye < Ie; Ye++) cn[Ye] = arguments[Ye];
                  return xe.then(function(wn) {
                    return wn.apply(void 0, cn);
                  });
                } : xe;
              }, Se = 0, We = Object.keys(vn); Se < We.length; Se++) _e();
              return te;
            }
          };
        }(e), t = n.name, o = n.tag, i = n.defaultContext, s = n.propsDef, u = n.eligible, f = n.children, d = It(window), v = {}, g = [], w = function() {
          if (function(P) {
            try {
              return Gr(window.name).name === P;
            } catch {
            }
            return !1;
          }(t)) {
            var y = fi().payload;
            if (y.tag === o && tn(y.childDomainMatch, ae())) return !0;
          }
          return !1;
        }, p = Dn(function() {
          if (w()) {
            if (window.xprops)
              throw delete d.components[o], new Error("Can not register " + t + " as child - child already registered");
            var y = function(P) {
              var R = P.tag, x = P.propsDef, _ = P.autoResize, q = P.allowedParentDomains, I = [], j = fi(), W = j.parent, Z = j.payload, L = W.win, oe = W.domain, ee, G = new S(), U = Z.version, re = Z.uid, X = Z.exports, Oe = Z.context, En = Z.props;
              if (!function(te, _e) {
                if (!/_/.test(te) || !/_/.test("10_3_3")) throw new Error("Versions are in an invalid format (" + te + ", 10_3_3)");
                return te.split("_")[0] === "10_3_3".split("_")[0];
              }(U)) throw new Error("Parent window has zoid version " + U + ", child window has version 10_3_3");
              var sn = X.show, An = X.hide, Mn = X.close, Cn = X.onError, zn = X.checkClose, Fn = X.export, Jn = X.resize, Ln = X.init, vn = function() {
                return L;
              }, Kn = function() {
                return oe;
              }, jn = function(te) {
                return I.push(te), {
                  cancel: function() {
                    I.splice(I.indexOf(te), 1);
                  }
                };
              }, Un = function(te) {
                return Jn.fireAndForget({
                  width: te.width,
                  height: te.height
                });
              }, Yn = function(te) {
                return G.resolve(te), Fn(te);
              }, Zn = function(te) {
                var _e = (te === void 0 ? {} : te).anyParent, Se = [], We = ee.parent;
                if (_e === void 0 && (_e = !We), !_e && !We) throw new Error("No parent found for " + R + " child");
                for (var Ee = 0, He = gn(window); Ee < He.length; Ee++) {
                  var xe = He[Ee];
                  if (pe(xe)) {
                    var Ie = en(xe).xprops;
                    if (Ie && vn() === Ie.getParent()) {
                      var cn = Ie.parent;
                      if (_e || !We || cn && cn.uid === We.uid) {
                        var Ye = si(xe, function(wn) {
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
              }, ne = function(te, _e, Se) {
                Se === void 0 && (Se = !1);
                var We = function(He, xe, Ie, cn, Ye, wn) {
                  wn === void 0 && (wn = !1);
                  for (var Nn = {}, ct = 0, dt = Object.keys(Ie); ct < dt.length; ct++) {
                    var Xn = dt[ct], Ze = xe[Xn], Dt = Ze && Ze.trustedDomains && Ze.trustedDomains.length > 0 ? Ze.trustedDomains.reduce(function(or, At) {
                      return or || tn(At, ae(window));
                    }, !1) : cn === ae(window) || pe(He);
                    if ((!Ze || !Ze.sameDomain || Dt) && (!Ze || !Ze.trustedDomains || Dt)) {
                      var _t = li(xe, 0, Xn, Ie[Xn], Ye);
                      Nn[Xn] = _t, Ze && Ze.alias && !Nn[Ze.alias] && (Nn[Ze.alias] = _t);
                    }
                  }
                  if (!wn) for (var ft = 0, rr = Object.keys(xe); ft < rr.length; ft++) {
                    var Wt = rr[ft];
                    Ie.hasOwnProperty(Wt) || (Nn[Wt] = li(xe, 0, Wt, void 0, Ye));
                  }
                  return Nn;
                }(L, x, te, _e, {
                  tag: R,
                  show: sn,
                  hide: An,
                  close: Mn,
                  focus: qa,
                  onError: Cn,
                  resize: Un,
                  getSiblings: Zn,
                  onProps: jn,
                  getParent: vn,
                  getParentDomain: Kn,
                  uid: re,
                  export: Yn
                }, Se);
                ee ? st(ee, We) : ee = We;
                for (var Ee = 0; Ee < I.length; Ee++) (0, I[Ee])(ee);
              }, un = function(te) {
                return S.try(function() {
                  return ne(te, oe, !0);
                });
              };
              return {
                init: function() {
                  return S.try(function() {
                    var te = "";
                    return pe(L) && (te = function(_e) {
                      var Se = _e.componentName, We = _e.parentComponentWindow, Ee = ci({
                        data: Gr(window.name).serializedInitialPayload,
                        sender: {
                          win: We
                        },
                        basic: !0
                      }), He = Ee.sender;
                      if (Ee.reference.type === "uid" || Ee.metaData.windowRef.type === "global") {
                        var xe = di({
                          name: Se,
                          serializedPayload: ui({
                            data: Ee.data,
                            metaData: {
                              windowRef: $a(We)
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
                    }) || ""), It(window).exports = P.exports({
                      getExports: function() {
                        return G;
                      }
                    }), function(_e, Se) {
                      if (!tn(_e, Se)) throw new Error("Can not be rendered by domain: " + Se);
                    }(q, oe), $o(L), function() {
                      window.addEventListener("beforeunload", function() {
                        zn.fireAndForget();
                      }), window.addEventListener("unload", function() {
                        zn.fireAndForget();
                      }), ho(L, function() {
                        hi();
                      });
                    }(), Ln({
                      name: te,
                      updateProps: un,
                      close: hi
                    });
                  }).then(function() {
                    return (te = _.width, _e = te !== void 0 && te, Se = _.height, We = Se !== void 0 && Se, Ee = _.element, Co(Ee === void 0 ? "body" : Ee).catch(we).then(function(He) {
                      return {
                        width: _e,
                        height: We,
                        element: He
                      };
                    })).then(function(He) {
                      var xe = He.width, Ie = He.height, cn = He.element;
                      cn && (xe || Ie) && Oe !== Pe.POPUP && _o(cn, function(Ye) {
                        Un({
                          width: xe ? Ye.width : void 0,
                          height: Ie ? Ye.height : void 0
                        });
                      }, {
                        width: xe,
                        height: Ie
                      });
                    });
                    var te, _e, Se, We, Ee;
                  }).catch(function(te) {
                    Cn(te);
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
          var R, x = "zoid-" + o + "-" + qe(), _ = P || {}, q = u({
            props: _
          }), I = q.eligible, j = q.reason, W = _.onDestroy;
          _.onDestroy = function() {
            if (R && I && g.splice(g.indexOf(R), 1), W) return W.apply(void 0, arguments);
          };
          var Z = vi({
            uid: x,
            options: n
          });
          Z.init(), I ? Z.setProps(_) : _.onDestroy && _.onDestroy(), Kr.register(function(ee) {
            return Z.destroy(ee || new Error("zoid destroyed all components"));
          });
          var L = function(ee) {
            var G = (ee === void 0 ? {} : ee).decorate;
            return y((G === void 0 ? Na : G)(_));
          }, oe = function(ee, G, U) {
            return S.try(function() {
              if (!I) {
                var re = new Error(j || t + " component is not eligible");
                return Z.destroy(re).then(function() {
                  throw re;
                });
              }
              if (!Hn(ee)) throw new Error("Must pass window to renderTo");
              return function(X, Oe) {
                return S.try(function() {
                  if (X.window) return xt(X.window).getType();
                  if (Oe) {
                    if (Oe !== Pe.IFRAME && Oe !== Pe.POPUP) throw new Error("Unrecognized context: " + Oe);
                    return Oe;
                  }
                  return i;
                });
              }(_, U);
            }).then(function(re) {
              if (G = function(X, Oe) {
                if (Oe) {
                  if (typeof Oe != "string" && !br(Oe)) throw new TypeError("Expected string or element selector to be passed");
                  return Oe;
                }
                if (X === Pe.POPUP) return "body";
                throw new Error("Expected element to be passed to render iframe");
              }(re, G), ee !== window && typeof G != "string") throw new Error("Must pass string element when rendering to another window");
              return Z.render({
                target: ee,
                container: G,
                context: re,
                rerender: function() {
                  var X = L();
                  return st(R, X), X.renderTo(ee, G, U);
                }
              });
            }).catch(function(re) {
              return Z.destroy(re).then(function() {
                throw re;
              });
            });
          };
          return R = O({}, Z.getExports(), Z.getHelpers(), function() {
            for (var ee = f(), G = {}, U = function() {
              var Oe = X[re], En = ee[Oe];
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
            }, re = 0, X = Object.keys(ee); re < X.length; re++) U();
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
          var y = Rn("zoid_allow_delegate_" + t, function() {
            return !0;
          }), P = Rn("zoid_delegate_" + t, function(R) {
            var x = R.data;
            return {
              parent: vi({
                uid: x.uid,
                options: n,
                overrides: x.overrides,
                parentWin: R.source
              })
            };
          });
          Yr.register(y.cancel), Yr.register(P.cancel);
        }(), d.components = d.components || {}, d.components[o]) throw new Error("Can not register multiple components with the same tag: " + o);
        return d.components[o] = !0, {
          init: m,
          instances: g,
          driver: function(y, P) {
            var R = {
              react: Ha,
              angular: Ja,
              vue: Va,
              vue3: Ga,
              angular2: Ka
            };
            if (!R[y]) throw new Error("Could not find driver for framework: " + y);
            return v[y] || (v[y] = R[y].register(o, s, m, P)), v[y];
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
      var Qa = function(e) {
        (function() {
          yn().initialized || (yn().initialized = !0, s = (i = {
            on: Rn,
            send: pn
          }).on, u = i.send, (f = yn()).receiveMessage = f.receiveMessage || function(d) {
            return Hr(d, {
              on: s,
              send: u
            });
          }, function(d) {
            var v = d.on, g = d.send;
            ce().getOrSet("postMessageListener", function() {
              return Io(window, "message", function(w) {
                (function(p, m) {
                  var y = m.on, P = m.send;
                  S.try(function() {
                    var R = p.source || p.sourceElement, x = p.origin || p.originalEvent && p.originalEvent.origin, _ = p.data;
                    if (x === "null" && (x = "file://"), R) {
                      if (!x) throw new Error("Post message did not have origin domain");
                      Hr({
                        source: R,
                        origin: x,
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
            receiveMessage: Hr
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
              }), p = Ot();
              return p && Mr(p, {
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
        var n = Xa(e), t = function(i) {
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
        Wn && Wn.destroyBridges();
        var n = Kr.all(e);
        return Kr = Kt(), n;
      }
      var mi = wi;
      function ka(e) {
        return mi(), delete window.__zoid_10_3_3__, function() {
          (function() {
            for (var t = ce("responseListeners"), o = 0, i = t.keys(); o < i.length; o++) {
              var s = i[o], u = t.get(s);
              u && (u.cancelled = !0), t.del(s);
            }
          })(), (n = ce().get("postMessageListener")) && n.cancel();
          var n;
          delete window.__post_robot_11_0_0__;
        }(), Yr.all(e);
      }
    }]);
  });
})(Oa);
var Sa = Oa.exports;
const qi = Sa.EVENT, lt = {
  VISIBLE: "zoid-visible",
  INVISIBLE: "zoid-invisible"
};
function Zu({
  uid: r,
  frame: a,
  prerenderFrame: c,
  doc: h,
  props: l,
  event: E,
  dimensions: C
}) {
  const { width: O, height: V } = C, { top: z = 0, left: b = 0 } = l;
  if (!a || !c)
    return;
  const B = h.createElement("div");
  B.setAttribute("id", r);
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
              top: ${z}px;
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

          #${r} > iframe.${lt.INVISIBLE} {
              opacity: 0;
          }

          #${r} > iframe.${lt.VISIBLE} {
              opacity: 1;
        }
      `)
  ), B.appendChild(a), B.appendChild(c), B.appendChild(M), c.classList.add(lt.INVISIBLE), a.classList.add(lt.INVISIBLE), E.on(qi.RENDERED, () => {
    setTimeout(() => {
      a.classList.remove(lt.INVISIBLE), a.classList.add(lt.VISIBLE);
    }, 100), setTimeout(() => {
      c.remove();
    }, 1);
  }), E.on(qi.RESIZE, ({ width: $, height: ue }) => {
    typeof $ == "number" && (B.style.width = `${$}px`), typeof ue == "number" && (B.style.height = `${ue}px`);
  }), B;
}
function Xu() {
  return Sa.create({
    dimensions: {
      width: "100%",
      height: "100%"
    },
    tag: "wta",
    url: ({ props: r }) => Yi(r.appConfig.sdkBaseUrl, "/wta/index.html"),
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
    containerTemplate: Zu
  });
}
function Qu(r) {
  return Xu()(r);
}
const ku = "https://cdn.jsdelivr.net/npm/hls.js@latest";
let pt = null;
function Hi() {
  pt = null;
}
function ec() {
  const r = window;
  return r.Hls ? Promise.resolve(r.Hls) : pt || (pt = Vi(ku).then(() => r.Hls), pt.then(Hi).catch(Hi), pt);
}
var nc = { VITE_WTA_URL: "https://cdn.jsdelivr.net/gh/sigmaott/sigma-ssai-web-sdk/build/dist", BASE_URL: "/", MODE: "production", DEV: !1, PROD: !0, SSR: !1 };
function tc({ video: r, adContainer: a, trackingUrl: c, interval: h }) {
  const l = Pn(0);
  r.addEventListener("timeupdate", () => {
    l.value = r.currentTime;
  }), Pn({}), Pn(), Pn(h || 1e3), Pn();
  const E = Ku(), C = Pn(!1), O = Pn();
  console.log("import.meta.env", nc);
  function V({ icons: Ve }) {
    return {
      appConfig: {
        sdkBaseUrl: "https://cdn.jsdelivr.net/gh/sigmaott/sigma-ssai-web-sdk/build/dist"
      },
      icons: Ve
    };
  }
  const z = Qu(V({
    icons: []
  }));
  z.render(a), z.hide(), a.style.display = "none", Ru(() => {
    var Ve;
    if (O.value) {
      const Ge = ((Ve = O.value) == null ? void 0 : Ve.icons) || [];
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
              O.value = mn;
              const Qe = mn.trackingEvents.find((be) => be.eventType === je.value.event);
              Qe && pu(async () => {
                E.trigger(Qe), await Promise.all(Qe.beaconUrls.map((be) => lr(ou(be)))), je.value.event === "complete" && (O.value = void 0, b.value = [], mn.tracked = !0);
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
      const { start: gt, sn: mn } = Ge.frag;
      for (let Qe = 0; Qe < Ge.samples.length; Qe++) {
        const be = Ge.samples[Qe], ke = be.data, tt = be.pts;
        if (String.fromCharCode.apply(null, ke.slice(0, 3)) !== "ID3" || String.fromCharCode.apply(null, ke.slice(10, 14)) !== "TXXX")
          continue;
        const pe = ke.slice(21, ke.length), en = je(pe), Et = pe.slice(en + 1, pe.length), rt = je(Et), ot = new TextDecoder("utf-8").decode(Et.slice(0, rt)), On = {
          sn: mn,
          time: tt - gt,
          value: Gi(ot)
        };
        if (B.value && mn < B.value)
          return;
        b.value.push(On), On.value.event === "start" && lr(ea(c)).then(({ data: gn, error: In }) => {
          if (In) {
            console.error("Cannot get tracking data", In);
            return;
          }
          for (const it of (gn == null ? void 0 : gn.avails) || [])
            for (const ve of it.ads) {
              const bt = `${it.id}_${ve.id}_${ve.startTimeInSeconds}`;
              M.value.find((Ut) => Ut.key === bt) || M.value.push({
                ...ve,
                key: bt,
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
      createHlsFragChanged: $,
      createHlsFragParsingMetadata: ue
    },
    onEventTracking: S
  };
}
async function rc({ video: r, adContainer: a, url: c }) {
  await ec();
  const h = Xi(c), l = await ls(), E = await hs(l, r);
  if (!E)
    throw console.error("nonce is null"), new Error("nonce is null");
  const C = `${h.protocol}//${h.host}`, { data: O, error: V } = await lr(ea(`${C}${h.pathname}`, {
    params: { "play_params.nonce": E }
  }));
  if (V || !O)
    throw console.error(V), new Error(V);
  const z = `${C}${O.manifestUrl}`, b = `${C}${O.trackingUrl}`, { hlsHelper: B, onEventTracking: M, destroy: $ } = tc({ video: r, adContainer: a, trackingUrl: b });
  if (!window.Hls.isSupported())
    throw console.error("hls is not supported"), new Error("hls is not supported");
  const ue = new window.Hls();
  return ue.loadSource(z), ue.attachMedia(r), ue.on(window.Hls.Events.FRAG_CHANGED, B.createHlsFragChanged()), ue.on(window.Hls.Events.FRAG_PARSING_METADATA, B.createHlsFragParsingMetadata()), {
    manifestUrl: z,
    onEventTracking: M,
    destroy: $,
    hlsHelper: B
  };
}
export {
  hs as createPal,
  rc as createSigmaDai,
  ls as loadPalSdk
};
