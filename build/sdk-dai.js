const ys = /#/g, Es = /&/g, bs = /\//g, Ps = /=/g, wo = /\+/g, Ts = /%5e/gi, Rs = /%60/gi, Ss = /%7c/gi, Os = /%20/gi;
function xs(t) {
  return encodeURI("" + t).replace(Ss, "|");
}
function co(t) {
  return xs(typeof t == "string" ? t : JSON.stringify(t)).replace(wo, "%2B").replace(Os, "+").replace(ys, "%23").replace(Es, "%26").replace(Rs, "`").replace(Ts, "^").replace(bs, "%2F");
}
function no(t) {
  return co(t).replace(Ps, "%3D");
}
function aa(t = "") {
  try {
    return decodeURIComponent("" + t);
  } catch {
    return "" + t;
  }
}
function Ds(t) {
  return aa(t.replace(wo, " "));
}
function Ns(t) {
  return aa(t.replace(wo, " "));
}
function sa(t = "") {
  const o = {};
  t[0] === "?" && (t = t.slice(1));
  for (const s of t.split("&")) {
    const u = s.match(/([^=]+)=?(.*)/) || [];
    if (u.length < 2)
      continue;
    const f = Ds(u[1]);
    if (f === "__proto__" || f === "constructor")
      continue;
    const v = Ns(u[2] || "");
    o[f] === void 0 ? o[f] = v : Array.isArray(o[f]) ? o[f].push(v) : o[f] = [o[f], v];
  }
  return o;
}
function Cs(t, o) {
  return (typeof o == "number" || typeof o == "boolean") && (o = String(o)), o ? Array.isArray(o) ? o.map((s) => `${no(t)}=${co(s)}`).join("&") : `${no(t)}=${co(o)}` : no(t);
}
function Is(t) {
  return Object.keys(t).filter((o) => t[o] !== void 0).map((o) => Cs(o, t[o])).filter(Boolean).join("&");
}
const As = /^[\s\w\0+.-]{2,}:([/\\]{1,2})/, _s = /^[\s\w\0+.-]{2,}:([/\\]{2})?/, Ws = /^([/\\]\s*){2,}[^/\\]/, Ms = /^\.?\//;
function ua(t, o = {}) {
  return typeof o == "boolean" && (o = { acceptRelative: o }), o.strict ? As.test(t) : _s.test(t) || (o.acceptRelative ? Ws.test(t) : !1);
}
function Fs(t = "", o) {
  return t.endsWith("/");
}
function zs(t = "", o) {
  return (Fs(t) ? t.slice(0, -1) : t) || "/";
}
function Ls(t = "", o) {
  return t.endsWith("/") ? t : t + "/";
}
function Us(t, o) {
  if (qs(o) || ua(t))
    return t;
  const s = zs(o);
  return t.startsWith(s) ? t : Gr(s, t);
}
function bn(t, o) {
  const s = mo(t), u = { ...sa(s.search), ...o };
  return s.search = Is(u), $s(s);
}
function js(t) {
  return sa(mo(t).search);
}
function qs(t) {
  return !t || t === "/";
}
function Bs(t) {
  return t && t !== "/";
}
function Gr(t, ...o) {
  let s = t || "";
  for (const u of o.filter((f) => Bs(f)))
    if (s) {
      const f = u.replace(Ms, "");
      s = Ls(s) + f;
    } else
      s = u;
  return s;
}
const ca = Symbol.for("ufo:protocolRelative");
function mo(t = "", o) {
  const s = t.match(
    /^[\s\0]*(blob:|data:|javascript:|vbscript:)(.*)/i
  );
  if (s) {
    const [, F, z = ""] = s;
    return {
      protocol: F.toLowerCase(),
      pathname: z,
      href: F + z,
      auth: "",
      host: "",
      search: "",
      hash: ""
    };
  }
  if (!ua(t, { acceptRelative: !0 }))
    return Vi(t);
  const [, u = "", f, v = ""] = t.replace(/\\/g, "/").match(/^[\s\0]*([\w+.-]{2,}:)?\/\/([^/@]+@)?(.*)/) || [];
  let [, T = "", P = ""] = v.match(/([^#/?]*)(.*)?/) || [];
  u === "file:" && (P = P.replace(/\/(?=[A-Za-z]:)/, ""));
  const { pathname: I, search: M, hash: b } = Vi(P);
  return {
    protocol: u.toLowerCase(),
    auth: f ? f.slice(0, Math.max(0, f.length - 1)) : "",
    host: T,
    pathname: I,
    search: M,
    hash: b,
    [ca]: !u
  };
}
function Vi(t = "") {
  const [o = "", s = "", u = ""] = (t.match(/([^#?]*)(\?[^#]*)?(#.*)?/) || []).splice(1);
  return {
    pathname: o,
    search: s,
    hash: u
  };
}
function $s(t) {
  const o = t.pathname || "", s = t.search ? (t.search.startsWith("?") ? "" : "?") + t.search : "", u = t.hash || "", f = t.auth ? t.auth + "@" : "", v = t.host || "";
  return (t.protocol || t[ca] ? (t.protocol || "") + "//" : "") + f + v + o + s + u;
}
const Hs = /"(?:_|\\u0{2}5[Ff]){2}(?:p|\\u0{2}70)(?:r|\\u0{2}72)(?:o|\\u0{2}6[Ff])(?:t|\\u0{2}74)(?:o|\\u0{2}6[Ff])(?:_|\\u0{2}5[Ff]){2}"\s*:/, Vs = /"(?:c|\\u0063)(?:o|\\u006[Ff])(?:n|\\u006[Ee])(?:s|\\u0073)(?:t|\\u0074)(?:r|\\u0072)(?:u|\\u0075)(?:c|\\u0063)(?:t|\\u0074)(?:o|\\u006[Ff])(?:r|\\u0072)"\s*:/, Gs = /^\s*["[{]|^\s*-?\d{1,16}(\.\d{1,17})?([Ee][+-]?\d+)?\s*$/;
function Js(t, o) {
  if (t === "__proto__" || t === "constructor" && o && typeof o == "object" && "prototype" in o) {
    Ks(t);
    return;
  }
  return o;
}
function Ks(t) {
  console.warn(`[destr] Dropping "${t}" key to prevent prototype pollution.`);
}
function fo(t, o = {}) {
  if (typeof t != "string")
    return t;
  const s = t.trim();
  if (
    // eslint-disable-next-line unicorn/prefer-at
    t[0] === '"' && t.endsWith('"') && !t.includes("\\")
  )
    return s.slice(1, -1);
  if (s.length <= 9) {
    const u = s.toLowerCase();
    if (u === "true")
      return !0;
    if (u === "false")
      return !1;
    if (u === "undefined")
      return;
    if (u === "null")
      return null;
    if (u === "nan")
      return Number.NaN;
    if (u === "infinity")
      return Number.POSITIVE_INFINITY;
    if (u === "-infinity")
      return Number.NEGATIVE_INFINITY;
  }
  if (!Gs.test(t)) {
    if (o.strict)
      throw new SyntaxError("[destr] Invalid JSON");
    return t;
  }
  try {
    if (Hs.test(t) || Vs.test(t)) {
      if (o.strict)
        throw new Error("[destr] Possible prototype pollution");
      return JSON.parse(t, Js);
    }
    return JSON.parse(t);
  } catch (u) {
    if (o.strict)
      throw u;
    return t;
  }
}
class Ys extends Error {
  constructor(o, s) {
    super(o, s), this.name = "FetchError", s != null && s.cause && !this.cause && (this.cause = s.cause);
  }
}
function Zs(t) {
  var I, M, b, F, z;
  const o = ((I = t.error) == null ? void 0 : I.message) || ((M = t.error) == null ? void 0 : M.toString()) || "", s = ((b = t.request) == null ? void 0 : b.method) || ((F = t.options) == null ? void 0 : F.method) || "GET", u = ((z = t.request) == null ? void 0 : z.url) || String(t.request) || "/", f = `[${s}] ${JSON.stringify(u)}`, v = t.response ? `${t.response.status} ${t.response.statusText}` : "<no response>", T = `${f}: ${v}${o ? ` ${o}` : ""}`, P = new Ys(
    T,
    t.error ? { cause: t.error } : void 0
  );
  for (const re of ["request", "options", "response"])
    Object.defineProperty(P, re, {
      get() {
        return t[re];
      }
    });
  for (const [re, ae] of [
    ["data", "_data"],
    ["status", "status"],
    ["statusCode", "status"],
    ["statusText", "statusText"],
    ["statusMessage", "statusText"]
  ])
    Object.defineProperty(P, re, {
      get() {
        return t.response && t.response[ae];
      }
    });
  return P;
}
const Qs = new Set(
  Object.freeze(["PATCH", "POST", "PUT", "DELETE"])
);
function Gi(t = "GET") {
  return Qs.has(t.toUpperCase());
}
function Xs(t) {
  if (t === void 0)
    return !1;
  const o = typeof t;
  return o === "string" || o === "number" || o === "boolean" || o === null ? !0 : o !== "object" ? !1 : Array.isArray(t) ? !0 : t.buffer ? !1 : t.constructor && t.constructor.name === "Object" || typeof t.toJSON == "function";
}
const ks = /* @__PURE__ */ new Set([
  "image/svg",
  "application/xml",
  "application/xhtml",
  "application/html"
]), eu = /^application\/(?:[\w!#$%&*.^`~-]*\+)?json(;.+)?$/i;
function tu(t = "") {
  if (!t)
    return "json";
  const o = t.split(";").shift() || "";
  return eu.test(o) ? "json" : ks.has(o) || o.startsWith("text/") ? "text" : "blob";
}
function ru(t, o, s = globalThis.Headers) {
  const u = {
    ...o,
    ...t
  };
  if (o != null && o.params && (t != null && t.params) && (u.params = {
    ...o == null ? void 0 : o.params,
    ...t == null ? void 0 : t.params
  }), o != null && o.query && (t != null && t.query) && (u.query = {
    ...o == null ? void 0 : o.query,
    ...t == null ? void 0 : t.query
  }), o != null && o.headers && (t != null && t.headers)) {
    u.headers = new s((o == null ? void 0 : o.headers) || {});
    for (const [f, v] of new s((t == null ? void 0 : t.headers) || {}))
      u.headers.set(f, v);
  }
  return u;
}
const nu = /* @__PURE__ */ new Set([
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
]), ou = /* @__PURE__ */ new Set([101, 204, 205, 304]);
function da(t = {}) {
  const {
    fetch: o = globalThis.fetch,
    Headers: s = globalThis.Headers,
    AbortController: u = globalThis.AbortController
  } = t;
  async function f(P) {
    const I = P.error && P.error.name === "AbortError" && !P.options.timeout || !1;
    if (P.options.retry !== !1 && !I) {
      let b;
      typeof P.options.retry == "number" ? b = P.options.retry : b = Gi(P.options.method) ? 0 : 1;
      const F = P.response && P.response.status || 500;
      if (b > 0 && (Array.isArray(P.options.retryStatusCodes) ? P.options.retryStatusCodes.includes(F) : nu.has(F))) {
        const z = P.options.retryDelay || 0;
        return z > 0 && await new Promise((re) => setTimeout(re, z)), v(P.request, {
          ...P.options,
          retry: b - 1
        });
      }
    }
    const M = Zs(P);
    throw Error.captureStackTrace && Error.captureStackTrace(M, v), M;
  }
  const v = async function(I, M = {}) {
    var re;
    const b = {
      request: I,
      options: ru(M, t.defaults, s),
      response: void 0,
      error: void 0
    };
    b.options.method = (re = b.options.method) == null ? void 0 : re.toUpperCase(), b.options.onRequest && await b.options.onRequest(b), typeof b.request == "string" && (b.options.baseURL && (b.request = Us(b.request, b.options.baseURL)), (b.options.query || b.options.params) && (b.request = bn(b.request, {
      ...b.options.params,
      ...b.options.query
    }))), b.options.body && Gi(b.options.method) && (Xs(b.options.body) ? (b.options.body = typeof b.options.body == "string" ? b.options.body : JSON.stringify(b.options.body), b.options.headers = new s(b.options.headers || {}), b.options.headers.has("content-type") || b.options.headers.set("content-type", "application/json"), b.options.headers.has("accept") || b.options.headers.set("accept", "application/json")) : (
      // ReadableStream Body
      ("pipeTo" in b.options.body && typeof b.options.body.pipeTo == "function" || // Node.js Stream Body
      typeof b.options.body.pipe == "function") && ("duplex" in b.options || (b.options.duplex = "half"))
    ));
    let F;
    if (!b.options.signal && b.options.timeout) {
      const ae = new u();
      F = setTimeout(
        () => ae.abort(),
        b.options.timeout
      ), b.options.signal = ae.signal;
    }
    try {
      b.response = await o(
        b.request,
        b.options
      );
    } catch (ae) {
      return b.error = ae, b.options.onRequestError && await b.options.onRequestError(b), await f(b);
    } finally {
      F && clearTimeout(F);
    }
    if (b.response.body && !ou.has(b.response.status) && b.options.method !== "HEAD") {
      const ae = (b.options.parseResponse ? "json" : b.options.responseType) || tu(b.response.headers.get("content-type") || "");
      switch (ae) {
        case "json": {
          const dt = await b.response.text(), S = b.options.parseResponse || fo;
          b.response._data = S(dt);
          break;
        }
        case "stream": {
          b.response._data = b.response.body;
          break;
        }
        default:
          b.response._data = await b.response[ae]();
      }
    }
    return b.options.onResponse && await b.options.onResponse(b), !b.options.ignoreResponseError && b.response.status >= 400 && b.response.status < 600 ? (b.options.onResponseError && await b.options.onResponseError(b), await f(b)) : b.response;
  }, T = async function(I, M) {
    return (await v(I, M))._data;
  };
  return T.raw = v, T.native = (...P) => o(...P), T.create = (P = {}) => da({
    ...t,
    defaults: {
      ...t.defaults,
      ...P
    }
  }), T;
}
const go = function() {
  if (typeof globalThis < "u")
    return globalThis;
  if (typeof self < "u")
    return self;
  if (typeof window < "u")
    return window;
  if (typeof global < "u")
    return global;
  throw new Error("unable to locate global object");
}(), iu = go.fetch || (() => Promise.reject(new Error("[ofetch] global.fetch is not supported!"))), au = go.Headers, su = go.AbortController, uu = da({ fetch: iu, Headers: au, AbortController: su }), cu = uu.create({
  credentials: "omit",
  onResponseError({ response: t, error: o }) {
    console.log("[LOG] ~ error:", o);
  },
  onRequest: ({ options: t, request: o }) => {
    const s = t.token;
    s && (t.headers = t.headers || {}, t.headers.Authorization = `${s}`);
  },
  onResponse({ response: t, options: o }) {
  }
}), du = (t) => (o, s) => (t.set(o, s), s), Ji = Number.MAX_SAFE_INTEGER === void 0 ? 9007199254740991 : Number.MAX_SAFE_INTEGER, fa = 536870912, Ki = fa * 2, fu = (t, o) => (s) => {
  const u = o.get(s);
  let f = u === void 0 ? s.size : u < Ki ? u + 1 : 0;
  if (!s.has(f))
    return t(s, f);
  if (s.size < fa) {
    for (; s.has(f); )
      f = Math.floor(Math.random() * Ki);
    return t(s, f);
  }
  if (s.size > Ji)
    throw new Error("Congratulations, you created a collection of unique numbers which uses all available integers!");
  for (; s.has(f); )
    f = Math.floor(Math.random() * Ji);
  return t(s, f);
}, la = /* @__PURE__ */ new WeakMap(), lu = du(la), vn = fu(lu, la), hu = (t) => t.method !== void 0 && t.method === "call", pu = (t) => typeof t.id == "number" && typeof t.result == "boolean", vu = (t) => {
  const o = /* @__PURE__ */ new Map([[0, () => {
  }]]), s = /* @__PURE__ */ new Map([[0, () => {
  }]]), u = /* @__PURE__ */ new Map(), f = new Worker(t);
  return f.addEventListener("message", ({ data: M }) => {
    if (hu(M)) {
      const { params: { timerId: b, timerType: F } } = M;
      if (F === "interval") {
        const z = o.get(b);
        if (typeof z === void 0)
          throw new Error("The timer is in an undefined state.");
        if (typeof z == "number") {
          const re = u.get(z);
          if (re === void 0 || re.timerId !== b || re.timerType !== F)
            throw new Error("The timer is in an undefined state.");
        } else typeof z == "function" && z();
      } else if (F === "timeout") {
        const z = s.get(b);
        if (typeof z === void 0)
          throw new Error("The timer is in an undefined state.");
        if (typeof z == "number") {
          const re = u.get(z);
          if (re === void 0 || re.timerId !== b || re.timerType !== F)
            throw new Error("The timer is in an undefined state.");
        } else typeof z == "function" && (z(), s.delete(b));
      }
    } else if (pu(M)) {
      const { id: b } = M, F = u.get(b);
      if (F === void 0)
        throw new Error("The timer is in an undefined state.");
      const { timerId: z, timerType: re } = F;
      u.delete(b), re === "interval" ? o.delete(z) : s.delete(z);
    } else {
      const { error: { message: b } } = M;
      throw new Error(b);
    }
  }), {
    clearInterval: (M) => {
      if (typeof o.get(M) == "function") {
        const b = vn(u);
        u.set(b, { timerId: M, timerType: "interval" }), o.set(M, b), f.postMessage({
          id: b,
          method: "clear",
          params: { timerId: M, timerType: "interval" }
        });
      }
    },
    clearTimeout: (M) => {
      if (typeof s.get(M) == "function") {
        const b = vn(u);
        u.set(b, { timerId: M, timerType: "timeout" }), s.set(M, b), f.postMessage({
          id: b,
          method: "clear",
          params: { timerId: M, timerType: "timeout" }
        });
      }
    },
    setInterval: (M, b = 0, ...F) => {
      const z = vn(o);
      return o.set(z, () => {
        M(...F), typeof o.get(z) == "function" && f.postMessage({
          id: null,
          method: "set",
          params: {
            delay: b,
            now: performance.timeOrigin + performance.now(),
            timerId: z,
            timerType: "interval"
          }
        });
      }), f.postMessage({
        id: null,
        method: "set",
        params: {
          delay: b,
          now: performance.timeOrigin + performance.now(),
          timerId: z,
          timerType: "interval"
        }
      }), z;
    },
    setTimeout: (M, b = 0, ...F) => {
      const z = vn(s);
      return s.set(z, () => M(...F)), f.postMessage({
        id: null,
        method: "set",
        params: {
          delay: b,
          now: performance.timeOrigin + performance.now(),
          timerId: z,
          timerType: "timeout"
        }
      }), z;
    }
  };
}, wu = (t, o) => {
  let s = null;
  return () => {
    if (s !== null)
      return s;
    const u = new Blob([o], { type: "application/javascript; charset=utf-8" }), f = URL.createObjectURL(u);
    return s = t(f), setTimeout(() => URL.revokeObjectURL(f)), s;
  };
}, mu = `(()=>{"use strict";const e=new Map,t=new Map,r=t=>{const r=e.get(t);return void 0!==r&&(clearTimeout(r),e.delete(t),!0)},s=e=>{const r=t.get(e);return void 0!==r&&(clearTimeout(r),t.delete(e),!0)},o=(e,t)=>{const r=performance.now(),s=e+t-r-performance.timeOrigin;return{expected:r+s,remainingDelay:s}},i=(e,t,r,s)=>{const o=r-performance.now();o>0?e.set(t,setTimeout(i,o,e,t,r,s)):(e.delete(t),postMessage({id:null,method:"call",params:{timerId:t,timerType:s}}))};addEventListener("message",(n=>{let{data:a}=n;try{if("clear"===a.method){const{id:e,params:{timerId:t,timerType:o}}=a;if("interval"===o)postMessage({id:e,result:r(t)});else{if("timeout"!==o)throw new Error('The given type "'.concat(o,'" is not supported'));postMessage({id:e,result:s(t)})}}else{if("set"!==a.method)throw new Error('The given method "'.concat(a.method,'" is not supported'));{const{params:{delay:r,now:s,timerId:n,timerType:m}}=a;if("interval"===m)((t,r,s)=>{const{expected:n,remainingDelay:a}=o(t,s);e.set(r,setTimeout(i,a,e,r,n,"interval"))})(r,n,s);else{if("timeout"!==m)throw new Error('The given type "'.concat(m,'" is not supported'));((e,r,s)=>{const{expected:n,remainingDelay:a}=o(e,s);t.set(r,setTimeout(i,a,t,r,n,"timeout"))})(r,n,s)}}}}catch(e){postMessage({error:{message:e.message},id:a.id,result:null})}}))})();`, ha = wu(vu, mu), oo = (t) => ha().clearTimeout(t), io = (...t) => ha().setTimeout(...t);
/**
* @vue/shared v3.5.1
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
/*! #__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function gu(t, o) {
  const s = new Set(t.split(","));
  return (u) => s.has(u);
}
const Yi = Object.assign, yu = Object.prototype.hasOwnProperty, lo = (t, o) => yu.call(t, o), Tr = Array.isArray, Hr = (t) => pa(t) === "[object Map]", Eu = (t) => typeof t == "string", Kr = (t) => typeof t == "symbol", Tn = (t) => t !== null && typeof t == "object", bu = Object.prototype.toString, pa = (t) => bu.call(t), va = (t) => pa(t).slice(8, -1), yo = (t) => Eu(t) && t !== "NaN" && t[0] !== "-" && "" + parseInt(t, 10) === t, Pu = (t) => {
  const o = /* @__PURE__ */ Object.create(null);
  return (s) => o[s] || (o[s] = t(s));
}, Tu = Pu((t) => t.charAt(0).toUpperCase() + t.slice(1)), xr = (t, o) => !Object.is(t, o);
var $e = {};
function Sr(t, ...o) {
  console.warn(`[Vue warn] ${t}`, ...o);
}
let he;
const ao = /* @__PURE__ */ new WeakSet();
class Zi {
  constructor(o) {
    this.fn = o, this.deps = void 0, this.depsTail = void 0, this.flags = 5, this.nextEffect = void 0, this.cleanup = void 0, this.scheduler = void 0;
  }
  pause() {
    this.flags |= 64;
  }
  resume() {
    this.flags & 64 && (this.flags &= -65, ao.has(this) && (ao.delete(this), this.trigger()));
  }
  /**
   * @internal
   */
  notify() {
    this.flags & 2 && !(this.flags & 32) || this.flags & 8 || (this.flags |= 8, this.nextEffect = Vr, Vr = this);
  }
  run() {
    if (!(this.flags & 1))
      return this.fn();
    this.flags |= 2, Qi(this), ma(this);
    const o = he, s = St;
    he = this, St = !0;
    try {
      return this.fn();
    } finally {
      $e.NODE_ENV !== "production" && he !== this && Sr(
        "Active effect was not restored correctly - this is likely a Vue internal bug."
      ), ga(this), he = o, St = s, this.flags &= -3;
    }
  }
  stop() {
    if (this.flags & 1) {
      for (let o = this.deps; o; o = o.nextDep)
        Po(o);
      this.deps = this.depsTail = void 0, Qi(this), this.onStop && this.onStop(), this.flags &= -2;
    }
  }
  trigger() {
    this.flags & 64 ? ao.add(this) : this.scheduler ? this.scheduler() : this.runIfDirty();
  }
  /**
   * @internal
   */
  runIfDirty() {
    ho(this) && this.run();
  }
  get dirty() {
    return ho(this);
  }
}
let wa = 0, Vr;
function Eo() {
  wa++;
}
function bo() {
  if (--wa > 0)
    return;
  let t;
  for (; Vr; ) {
    let o = Vr;
    for (Vr = void 0; o; ) {
      const s = o.nextEffect;
      if (o.nextEffect = void 0, o.flags &= -9, o.flags & 1)
        try {
          o.trigger();
        } catch (u) {
          t || (t = u);
        }
      o = s;
    }
  }
  if (t) throw t;
}
function ma(t) {
  for (let o = t.deps; o; o = o.nextDep)
    o.version = -1, o.prevActiveLink = o.dep.activeLink, o.dep.activeLink = o;
}
function ga(t) {
  let o, s = t.depsTail;
  for (let u = s; u; u = u.prevDep)
    u.version === -1 ? (u === s && (s = u.prevDep), Po(u), Su(u)) : o = u, u.dep.activeLink = u.prevActiveLink, u.prevActiveLink = void 0;
  t.deps = o, t.depsTail = s;
}
function ho(t) {
  for (let o = t.deps; o; o = o.nextDep)
    if (o.dep.version !== o.version || o.dep.computed && Ru(o.dep.computed) === !1 || o.dep.version !== o.version)
      return !0;
  return !!t._dirty;
}
function Ru(t) {
  if (t.flags & 2)
    return !1;
  if (t.flags & 4 && !(t.flags & 16) || (t.flags &= -17, t.globalVersion === Pn))
    return;
  t.globalVersion = Pn;
  const o = t.dep;
  if (t.flags |= 2, o.version > 0 && !t.isSSR && !ho(t)) {
    t.flags &= -3;
    return;
  }
  const s = he, u = St;
  he = t, St = !0;
  try {
    ma(t);
    const f = t.fn();
    (o.version === 0 || xr(f, t._value)) && (t._value = f, o.version++);
  } catch (f) {
    throw o.version++, f;
  } finally {
    he = s, St = u, ga(t), t.flags &= -3;
  }
}
function Po(t) {
  const { dep: o, prevSub: s, nextSub: u } = t;
  if (s && (s.nextSub = u, t.prevSub = void 0), u && (u.prevSub = s, t.nextSub = void 0), o.subs === t && (o.subs = s), !o.subs && o.computed) {
    o.computed.flags &= -5;
    for (let f = o.computed.deps; f; f = f.nextDep)
      Po(f);
  }
}
function Su(t) {
  const { prevDep: o, nextDep: s } = t;
  o && (o.nextDep = s, t.prevDep = void 0), s && (s.prevDep = o, t.nextDep = void 0);
}
function Ou(t, o) {
  t.effect instanceof Zi && (t = t.effect.fn);
  const s = new Zi(t);
  try {
    s.run();
  } catch (f) {
    throw s.stop(), f;
  }
  const u = s.run.bind(s);
  return u.effect = s, u;
}
let St = !0;
const ya = [];
function xu() {
  ya.push(St), St = !1;
}
function Du() {
  const t = ya.pop();
  St = t === void 0 ? !0 : t;
}
function Qi(t) {
  const { cleanup: o } = t;
  if (t.cleanup = void 0, o) {
    const s = he;
    he = void 0;
    try {
      o();
    } finally {
      he = s;
    }
  }
}
let Pn = 0;
class Ea {
  constructor(o) {
    this.computed = o, this.version = 0, this.activeLink = void 0, this.subs = void 0, $e.NODE_ENV !== "production" && (this.subsHead = void 0);
  }
  track(o) {
    if (!he || !St)
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
      }, he.deps ? (s.prevDep = he.depsTail, he.depsTail.nextDep = s, he.depsTail = s) : he.deps = he.depsTail = s, he.flags & 4 && ba(s);
    else if (s.version === -1 && (s.version = this.version, s.nextDep)) {
      const u = s.nextDep;
      u.prevDep = s.prevDep, s.prevDep && (s.prevDep.nextDep = u), s.prevDep = he.depsTail, s.nextDep = void 0, he.depsTail.nextDep = s, he.depsTail = s, he.deps === s && (he.deps = u);
    }
    return $e.NODE_ENV !== "production" && he.onTrack && he.onTrack(
      Yi(
        {
          effect: he
        },
        o
      )
    ), s;
  }
  trigger(o) {
    this.version++, Pn++, this.notify(o);
  }
  notify(o) {
    Eo();
    try {
      if ($e.NODE_ENV !== "production")
        for (let s = this.subsHead; s; s = s.nextSub)
          $e.NODE_ENV !== "production" && s.sub.onTrigger && !(s.sub.flags & 8) && s.sub.onTrigger(
            Yi(
              {
                effect: s.sub
              },
              o
            )
          );
      for (let s = this.subs; s; s = s.prevSub)
        s.sub.notify();
    } finally {
      bo();
    }
  }
}
function ba(t) {
  const o = t.dep.computed;
  if (o && !t.dep.subs) {
    o.flags |= 20;
    for (let u = o.deps; u; u = u.nextDep)
      ba(u);
  }
  const s = t.dep.subs;
  s !== t && (t.prevSub = s, s && (s.nextSub = t)), $e.NODE_ENV !== "production" && t.dep.subsHead === void 0 && (t.dep.subsHead = t), t.dep.subs = t;
}
const po = /* @__PURE__ */ new WeakMap(), sr = Symbol(
  $e.NODE_ENV !== "production" ? "Object iterate" : ""
), vo = Symbol(
  $e.NODE_ENV !== "production" ? "Map keys iterate" : ""
), Jr = Symbol(
  $e.NODE_ENV !== "production" ? "Array iterate" : ""
);
function ct(t, o, s) {
  if (St && he) {
    let u = po.get(t);
    u || po.set(t, u = /* @__PURE__ */ new Map());
    let f = u.get(s);
    f || u.set(s, f = new Ea()), $e.NODE_ENV !== "production" ? f.track({
      target: t,
      type: o,
      key: s
    }) : f.track();
  }
}
function Kt(t, o, s, u, f, v) {
  const T = po.get(t);
  if (!T) {
    Pn++;
    return;
  }
  let P = [];
  if (o === "clear")
    P = [...T.values()];
  else {
    const I = Tr(t), M = I && yo(s);
    if (I && s === "length") {
      const b = Number(u);
      T.forEach((F, z) => {
        (z === "length" || z === Jr || !Kr(z) && z >= b) && P.push(F);
      });
    } else {
      const b = (F) => F && P.push(F);
      switch (s !== void 0 && b(T.get(s)), M && b(T.get(Jr)), o) {
        case "add":
          I ? M && b(T.get("length")) : (b(T.get(sr)), Hr(t) && b(T.get(vo)));
          break;
        case "delete":
          I || (b(T.get(sr)), Hr(t) && b(T.get(vo)));
          break;
        case "set":
          Hr(t) && b(T.get(sr));
          break;
      }
    }
  }
  Eo();
  for (const I of P)
    $e.NODE_ENV !== "production" ? I.trigger({
      target: t,
      type: o,
      key: s,
      newValue: u,
      oldValue: f,
      oldTarget: v
    }) : I.trigger();
  bo();
}
function yr(t) {
  const o = pe(t);
  return o === t ? o : (ct(o, "iterate", Jr), Yt(t) ? o : o.map(at));
}
function To(t) {
  return ct(t = pe(t), "iterate", Jr), t;
}
const Nu = {
  __proto__: null,
  [Symbol.iterator]() {
    return so(this, Symbol.iterator, at);
  },
  concat(...t) {
    return yr(this).concat(
      ...t.map((o) => Tr(o) ? yr(o) : o)
    );
  },
  entries() {
    return so(this, "entries", (t) => (t[1] = at(t[1]), t));
  },
  every(t, o) {
    return Mt(this, "every", t, o, void 0, arguments);
  },
  filter(t, o) {
    return Mt(this, "filter", t, o, (s) => s.map(at), arguments);
  },
  find(t, o) {
    return Mt(this, "find", t, o, at, arguments);
  },
  findIndex(t, o) {
    return Mt(this, "findIndex", t, o, void 0, arguments);
  },
  findLast(t, o) {
    return Mt(this, "findLast", t, o, at, arguments);
  },
  findLastIndex(t, o) {
    return Mt(this, "findLastIndex", t, o, void 0, arguments);
  },
  // flat, flatMap could benefit from ARRAY_ITERATE but are not straight-forward to implement
  forEach(t, o) {
    return Mt(this, "forEach", t, o, void 0, arguments);
  },
  includes(...t) {
    return uo(this, "includes", t);
  },
  indexOf(...t) {
    return uo(this, "indexOf", t);
  },
  join(t) {
    return yr(this).join(t);
  },
  // keys() iterator only reads `length`, no optimisation required
  lastIndexOf(...t) {
    return uo(this, "lastIndexOf", t);
  },
  map(t, o) {
    return Mt(this, "map", t, o, void 0, arguments);
  },
  pop() {
    return $r(this, "pop");
  },
  push(...t) {
    return $r(this, "push", t);
  },
  reduce(t, ...o) {
    return Xi(this, "reduce", t, o);
  },
  reduceRight(t, ...o) {
    return Xi(this, "reduceRight", t, o);
  },
  shift() {
    return $r(this, "shift");
  },
  // slice could use ARRAY_ITERATE but also seems to beg for range tracking
  some(t, o) {
    return Mt(this, "some", t, o, void 0, arguments);
  },
  splice(...t) {
    return $r(this, "splice", t);
  },
  toReversed() {
    return yr(this).toReversed();
  },
  toSorted(t) {
    return yr(this).toSorted(t);
  },
  toSpliced(...t) {
    return yr(this).toSpliced(...t);
  },
  unshift(...t) {
    return $r(this, "unshift", t);
  },
  values() {
    return so(this, "values", at);
  }
};
function so(t, o, s) {
  const u = To(t), f = u[o]();
  return u !== t && !Yt(t) && (f._next = f.next, f.next = () => {
    const v = f._next();
    return v.value && (v.value = s(v.value)), v;
  }), f;
}
const Cu = Array.prototype;
function Mt(t, o, s, u, f, v) {
  const T = To(t), P = T !== t && !Yt(t), I = T[o];
  if (I !== Cu[o]) {
    const F = I.apply(t, v);
    return P ? at(F) : F;
  }
  let M = s;
  T !== t && (P ? M = function(F, z) {
    return s.call(this, at(F), z, t);
  } : s.length > 2 && (M = function(F, z) {
    return s.call(this, F, z, t);
  }));
  const b = I.call(T, M, u);
  return P && f ? f(b) : b;
}
function Xi(t, o, s, u) {
  const f = To(t);
  let v = s;
  return f !== t && (Yt(t) ? s.length > 3 && (v = function(T, P, I) {
    return s.call(this, T, P, I, t);
  }) : v = function(T, P, I) {
    return s.call(this, T, at(P), I, t);
  }), f[o](v, ...u);
}
function uo(t, o, s) {
  const u = pe(t);
  ct(u, "iterate", Jr);
  const f = u[o](...s);
  return (f === -1 || f === !1) && Ku(s[0]) ? (s[0] = pe(s[0]), u[o](...s)) : f;
}
function $r(t, o, s = []) {
  xu(), Eo();
  const u = pe(t)[o].apply(t, s);
  return bo(), Du(), u;
}
const Iu = /* @__PURE__ */ gu("__proto__,__v_isRef,__isVue"), Pa = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((t) => t !== "arguments" && t !== "caller").map((t) => Symbol[t]).filter(Kr)
);
function Au(t) {
  Kr(t) || (t = String(t));
  const o = pe(this);
  return ct(o, "has", t), o.hasOwnProperty(t);
}
class Ta {
  constructor(o = !1, s = !1) {
    this._isReadonly = o, this._isShallow = s;
  }
  get(o, s, u) {
    const f = this._isReadonly, v = this._isShallow;
    if (s === "__v_isReactive")
      return !f;
    if (s === "__v_isReadonly")
      return f;
    if (s === "__v_isShallow")
      return v;
    if (s === "__v_raw")
      return u === (f ? v ? Vu : xa : v ? Hu : Oa).get(o) || // receiver is not the reactive proxy, but has the same prototype
      // this means the receiver is a user proxy of the reactive proxy
      Object.getPrototypeOf(o) === Object.getPrototypeOf(u) ? o : void 0;
    const T = Tr(o);
    if (!f) {
      let I;
      if (T && (I = Nu[s]))
        return I;
      if (s === "hasOwnProperty")
        return Au;
    }
    const P = Reflect.get(
      o,
      s,
      // if this is a proxy wrapping a ref, return methods using the raw ref
      // as receiver so that we don't have to call `toRaw` on the ref in all
      // its class methods
      Rr(o) ? o : u
    );
    return (Kr(s) ? Pa.has(s) : Iu(s)) || (f || ct(o, "get", s), v) ? P : Rr(P) ? T && yo(s) ? P : P.value : Tn(P) ? f ? Na(P) : Da(P) : P;
  }
}
class _u extends Ta {
  constructor(o = !1) {
    super(!1, o);
  }
  set(o, s, u, f) {
    let v = o[s];
    if (!this._isShallow) {
      const I = Or(v);
      if (!Yt(u) && !Or(u) && (v = pe(v), u = pe(u)), !Tr(o) && Rr(v) && !Rr(u))
        return I ? !1 : (v.value = u, !0);
    }
    const T = Tr(o) && yo(s) ? Number(s) < o.length : lo(o, s), P = Reflect.set(
      o,
      s,
      u,
      Rr(o) ? o : f
    );
    return o === pe(f) && (T ? xr(u, v) && Kt(o, "set", s, u, v) : Kt(o, "add", s, u)), P;
  }
  deleteProperty(o, s) {
    const u = lo(o, s), f = o[s], v = Reflect.deleteProperty(o, s);
    return v && u && Kt(o, "delete", s, void 0, f), v;
  }
  has(o, s) {
    const u = Reflect.has(o, s);
    return (!Kr(s) || !Pa.has(s)) && ct(o, "has", s), u;
  }
  ownKeys(o) {
    return ct(
      o,
      "iterate",
      Tr(o) ? "length" : sr
    ), Reflect.ownKeys(o);
  }
}
class Wu extends Ta {
  constructor(o = !1) {
    super(!0, o);
  }
  set(o, s) {
    return $e.NODE_ENV !== "production" && Sr(
      `Set operation on key "${String(s)}" failed: target is readonly.`,
      o
    ), !0;
  }
  deleteProperty(o, s) {
    return $e.NODE_ENV !== "production" && Sr(
      `Delete operation on key "${String(s)}" failed: target is readonly.`,
      o
    ), !0;
  }
}
const Mu = /* @__PURE__ */ new _u(), Fu = /* @__PURE__ */ new Wu(), Ro = (t) => t, Rn = (t) => Reflect.getPrototypeOf(t);
function wn(t, o, s = !1, u = !1) {
  t = t.__v_raw;
  const f = pe(t), v = pe(o);
  s || (xr(o, v) && ct(f, "get", o), ct(f, "get", v));
  const { has: T } = Rn(f), P = u ? Ro : s ? So : at;
  if (T.call(f, o))
    return P(t.get(o));
  if (T.call(f, v))
    return P(t.get(v));
  t !== f && t.get(o);
}
function mn(t, o = !1) {
  const s = this.__v_raw, u = pe(s), f = pe(t);
  return o || (xr(t, f) && ct(u, "has", t), ct(u, "has", f)), t === f ? s.has(t) : s.has(t) || s.has(f);
}
function gn(t, o = !1) {
  return t = t.__v_raw, !o && ct(pe(t), "iterate", sr), Reflect.get(t, "size", t);
}
function ki(t, o = !1) {
  !o && !Yt(t) && !Or(t) && (t = pe(t));
  const s = pe(this);
  return Rn(s).has.call(s, t) || (s.add(t), Kt(s, "add", t, t)), this;
}
function ea(t, o, s = !1) {
  !s && !Yt(o) && !Or(o) && (o = pe(o));
  const u = pe(this), { has: f, get: v } = Rn(u);
  let T = f.call(u, t);
  T ? $e.NODE_ENV !== "production" && Sa(u, f, t) : (t = pe(t), T = f.call(u, t));
  const P = v.call(u, t);
  return u.set(t, o), T ? xr(o, P) && Kt(u, "set", t, o, P) : Kt(u, "add", t, o), this;
}
function ta(t) {
  const o = pe(this), { has: s, get: u } = Rn(o);
  let f = s.call(o, t);
  f ? $e.NODE_ENV !== "production" && Sa(o, s, t) : (t = pe(t), f = s.call(o, t));
  const v = u ? u.call(o, t) : void 0, T = o.delete(t);
  return f && Kt(o, "delete", t, void 0, v), T;
}
function ra() {
  const t = pe(this), o = t.size !== 0, s = $e.NODE_ENV !== "production" ? Hr(t) ? new Map(t) : new Set(t) : void 0, u = t.clear();
  return o && Kt(t, "clear", void 0, void 0, s), u;
}
function yn(t, o) {
  return function(u, f) {
    const v = this, T = v.__v_raw, P = pe(T), I = o ? Ro : t ? So : at;
    return !t && ct(P, "iterate", sr), T.forEach((M, b) => u.call(f, I(M), I(b), v));
  };
}
function En(t, o, s) {
  return function(...u) {
    const f = this.__v_raw, v = pe(f), T = Hr(v), P = t === "entries" || t === Symbol.iterator && T, I = t === "keys" && T, M = f[t](...u), b = s ? Ro : o ? So : at;
    return !o && ct(
      v,
      "iterate",
      I ? vo : sr
    ), {
      // iterator protocol
      next() {
        const { value: F, done: z } = M.next();
        return z ? { value: F, done: z } : {
          value: P ? [b(F[0]), b(F[1])] : b(F),
          done: z
        };
      },
      // iterable protocol
      [Symbol.iterator]() {
        return this;
      }
    };
  };
}
function Jt(t) {
  return function(...o) {
    if ($e.NODE_ENV !== "production") {
      const s = o[0] ? `on key "${o[0]}" ` : "";
      Sr(
        `${Tu(t)} operation ${s}failed: target is readonly.`,
        pe(this)
      );
    }
    return t === "delete" ? !1 : t === "clear" ? void 0 : this;
  };
}
function zu() {
  const t = {
    get(v) {
      return wn(this, v);
    },
    get size() {
      return gn(this);
    },
    has: mn,
    add: ki,
    set: ea,
    delete: ta,
    clear: ra,
    forEach: yn(!1, !1)
  }, o = {
    get(v) {
      return wn(this, v, !1, !0);
    },
    get size() {
      return gn(this);
    },
    has: mn,
    add(v) {
      return ki.call(this, v, !0);
    },
    set(v, T) {
      return ea.call(this, v, T, !0);
    },
    delete: ta,
    clear: ra,
    forEach: yn(!1, !0)
  }, s = {
    get(v) {
      return wn(this, v, !0);
    },
    get size() {
      return gn(this, !0);
    },
    has(v) {
      return mn.call(this, v, !0);
    },
    add: Jt("add"),
    set: Jt("set"),
    delete: Jt("delete"),
    clear: Jt("clear"),
    forEach: yn(!0, !1)
  }, u = {
    get(v) {
      return wn(this, v, !0, !0);
    },
    get size() {
      return gn(this, !0);
    },
    has(v) {
      return mn.call(this, v, !0);
    },
    add: Jt("add"),
    set: Jt("set"),
    delete: Jt("delete"),
    clear: Jt("clear"),
    forEach: yn(!0, !0)
  };
  return [
    "keys",
    "values",
    "entries",
    Symbol.iterator
  ].forEach((v) => {
    t[v] = En(v, !1, !1), s[v] = En(v, !0, !1), o[v] = En(v, !1, !0), u[v] = En(
      v,
      !0,
      !0
    );
  }), [
    t,
    s,
    o,
    u
  ];
}
const [
  Lu,
  Uu,
  ju,
  qu
] = /* @__PURE__ */ zu();
function Ra(t, o) {
  const s = o ? t ? qu : ju : t ? Uu : Lu;
  return (u, f, v) => f === "__v_isReactive" ? !t : f === "__v_isReadonly" ? t : f === "__v_raw" ? u : Reflect.get(
    lo(s, f) && f in u ? s : u,
    f,
    v
  );
}
const Bu = {
  get: /* @__PURE__ */ Ra(!1, !1)
}, $u = {
  get: /* @__PURE__ */ Ra(!0, !1)
};
function Sa(t, o, s) {
  const u = pe(s);
  if (u !== s && o.call(t, u)) {
    const f = va(t);
    Sr(
      `Reactive ${f} contains both the raw and reactive versions of the same object${f === "Map" ? " as keys" : ""}, which can lead to inconsistencies. Avoid differentiating between the raw and reactive versions of an object and only use the reactive version if possible.`
    );
  }
}
const Oa = /* @__PURE__ */ new WeakMap(), Hu = /* @__PURE__ */ new WeakMap(), xa = /* @__PURE__ */ new WeakMap(), Vu = /* @__PURE__ */ new WeakMap();
function Gu(t) {
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
function Ju(t) {
  return t.__v_skip || !Object.isExtensible(t) ? 0 : Gu(va(t));
}
function Da(t) {
  return Or(t) ? t : Ca(
    t,
    !1,
    Mu,
    Bu,
    Oa
  );
}
function Na(t) {
  return Ca(
    t,
    !0,
    Fu,
    $u,
    xa
  );
}
function Ca(t, o, s, u, f) {
  if (!Tn(t))
    return $e.NODE_ENV !== "production" && Sr(
      `value cannot be made ${o ? "readonly" : "reactive"}: ${String(
        t
      )}`
    ), t;
  if (t.__v_raw && !(o && t.__v_isReactive))
    return t;
  const v = f.get(t);
  if (v)
    return v;
  const T = Ju(t);
  if (T === 0)
    return t;
  const P = new Proxy(
    t,
    T === 2 ? u : s
  );
  return f.set(t, P), P;
}
function Or(t) {
  return !!(t && t.__v_isReadonly);
}
function Yt(t) {
  return !!(t && t.__v_isShallow);
}
function Ku(t) {
  return t ? !!t.__v_raw : !1;
}
function pe(t) {
  const o = t && t.__v_raw;
  return o ? pe(o) : t;
}
const at = (t) => Tn(t) ? Da(t) : t, So = (t) => Tn(t) ? Na(t) : t;
function Rr(t) {
  return t ? t.__v_isRef === !0 : !1;
}
function Ft(t) {
  return Yu(t, !1);
}
function Yu(t, o) {
  return Rr(t) ? t : new Zu(t, o);
}
class Zu {
  constructor(o, s) {
    this.dep = new Ea(), this.__v_isRef = !0, this.__v_isShallow = !1, this._rawValue = s ? o : pe(o), this._value = s ? o : at(o), this.__v_isShallow = s;
  }
  get value() {
    return $e.NODE_ENV !== "production" ? this.dep.track({
      target: this,
      type: "get",
      key: "value"
    }) : this.dep.track(), this._value;
  }
  set value(o) {
    const s = this._rawValue, u = this.__v_isShallow || Yt(o) || Or(o);
    o = u ? o : pe(o), xr(o, s) && (this._rawValue = o, this._value = u ? o : at(o), $e.NODE_ENV !== "production" ? this.dep.trigger({
      target: this,
      type: "set",
      key: "value",
      newValue: o,
      oldValue: s
    }) : this.dep.trigger());
  }
}
function Qu() {
  const t = /* @__PURE__ */ new Set(), o = (f) => {
    t.delete(f);
  };
  return {
    on: (f) => (t.add(f), {
      off: () => o(f)
    }),
    off: o,
    trigger: (...f) => Promise.all(Array.from(t).map((v) => v(...f)))
  };
}
async function Xu(t) {
  try {
    return {
      data: await t,
      error: null
    };
  } catch (o) {
    return {
      data: null,
      error: o || {
        message: "Unknown error"
      }
    };
  }
}
var ku = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, Ia = { exports: {} };
(function(t, o) {
  (function(s, u) {
    t.exports = u();
  })(typeof self < "u" ? self : ku, function() {
    return function(s) {
      var u = {};
      function f(v) {
        if (u[v]) return u[v].exports;
        var T = u[v] = {
          i: v,
          l: !1,
          exports: {}
        };
        return s[v].call(T.exports, T, T.exports, f), T.l = !0, T.exports;
      }
      return f.m = s, f.c = u, f.d = function(v, T, P) {
        f.o(v, T) || Object.defineProperty(v, T, {
          enumerable: !0,
          get: P
        });
      }, f.r = function(v) {
        typeof Symbol < "u" && Symbol.toStringTag && Object.defineProperty(v, Symbol.toStringTag, {
          value: "Module"
        }), Object.defineProperty(v, "__esModule", {
          value: !0
        });
      }, f.t = function(v, T) {
        if (1 & T && (v = f(v)), 8 & T || 4 & T && typeof v == "object" && v && v.__esModule) return v;
        var P = /* @__PURE__ */ Object.create(null);
        if (f.r(P), Object.defineProperty(P, "default", {
          enumerable: !0,
          value: v
        }), 2 & T && typeof v != "string") for (var I in v) f.d(P, I, (function(M) {
          return v[M];
        }).bind(null, I));
        return P;
      }, f.n = function(v) {
        var T = v && v.__esModule ? function() {
          return v.default;
        } : function() {
          return v;
        };
        return f.d(T, "a", T), T;
      }, f.o = function(v, T) {
        return {}.hasOwnProperty.call(v, T);
      }, f.p = "", f(f.s = 0);
    }([function(s, u, f) {
      f.r(u), f.d(u, "PopupOpenError", function() {
        return Fn;
      }), f.d(u, "create", function() {
        return as;
      }), f.d(u, "destroy", function() {
        return ss;
      }), f.d(u, "destroyComponents", function() {
        return Ci;
      }), f.d(u, "destroyAll", function() {
        return Ii;
      }), f.d(u, "PROP_TYPE", function() {
        return ve;
      }), f.d(u, "PROP_SERIALIZATION", function() {
        return ln;
      }), f.d(u, "CONTEXT", function() {
        return Se;
      }), f.d(u, "EVENT", function() {
        return Ee;
      });
      function v(e, r) {
        return (v = Object.setPrototypeOf || function(n, i) {
          return n.__proto__ = i, n;
        })(e, r);
      }
      function T(e, r) {
        e.prototype = Object.create(r.prototype), e.prototype.constructor = e, v(e, r);
      }
      function P() {
        return (P = Object.assign || function(e) {
          for (var r = 1; r < arguments.length; r++) {
            var n = arguments[r];
            for (var i in n) ({}).hasOwnProperty.call(n, i) && (e[i] = n[i]);
          }
          return e;
        }).apply(this, arguments);
      }
      function I(e) {
        try {
          if (!e) return !1;
          if (typeof Promise < "u" && e instanceof Promise) return !0;
          if (typeof window < "u" && typeof window.Window == "function" && e instanceof window.Window || typeof window < "u" && typeof window.constructor == "function" && e instanceof window.constructor) return !1;
          var r = {}.toString;
          if (r) {
            var n = r.call(e);
            if (n === "[object Window]" || n === "[object global]" || n === "[object DOMWindow]") return !1;
          }
          if (typeof e.then == "function") return !0;
        } catch {
          return !1;
        }
        return !1;
      }
      var M = [], b = [], F = 0, z;
      function re() {
        if (!F && z) {
          var e = z;
          z = null, e.resolve();
        }
      }
      function ae() {
        F += 1;
      }
      function dt() {
        F -= 1, re();
      }
      var S = function() {
        function e(n) {
          var i = this;
          if (this.resolved = void 0, this.rejected = void 0, this.errorHandled = void 0, this.value = void 0, this.error = void 0, this.handlers = void 0, this.dispatching = void 0, this.stack = void 0, this.resolved = !1, this.rejected = !1, this.errorHandled = !1, this.handlers = [], n) {
            var a, c, d = !1, h = !1, l = !1;
            ae();
            try {
              n(function(w) {
                l ? i.resolve(w) : (d = !0, a = w);
              }, function(w) {
                l ? i.reject(w) : (h = !0, c = w);
              });
            } catch (w) {
              dt(), this.reject(w);
              return;
            }
            dt(), l = !0, d ? this.resolve(a) : h && this.reject(c);
          }
        }
        var r = e.prototype;
        return r.resolve = function(n) {
          if (this.resolved || this.rejected) return this;
          if (I(n)) throw new Error("Can not resolve promise with another promise");
          return this.resolved = !0, this.value = n, this.dispatch(), this;
        }, r.reject = function(n) {
          var i = this;
          if (this.resolved || this.rejected) return this;
          if (I(n)) throw new Error("Can not reject promise with another promise");
          if (!n) {
            var a = n && typeof n.toString == "function" ? n.toString() : {}.toString.call(n);
            n = new Error("Expected reject to be called with Error, got " + a);
          }
          return this.rejected = !0, this.error = n, this.errorHandled || setTimeout(function() {
            i.errorHandled || function(c, d) {
              if (M.indexOf(c) === -1) {
                M.push(c), setTimeout(function() {
                  throw c;
                }, 1);
                for (var h = 0; h < b.length; h++) b[h](c, d);
              }
            }(n, i);
          }, 1), this.dispatch(), this;
        }, r.asyncReject = function(n) {
          return this.errorHandled = !0, this.reject(n), this;
        }, r.dispatch = function() {
          var n = this.resolved, i = this.rejected, a = this.handlers;
          if (!this.dispatching && (n || i)) {
            this.dispatching = !0, ae();
            for (var c = function(g, E) {
              return g.then(function(R) {
                E.resolve(R);
              }, function(R) {
                E.reject(R);
              });
            }, d = 0; d < a.length; d++) {
              var h = a[d], l = h.onSuccess, w = h.onError, y = h.promise, m = void 0;
              if (n) try {
                m = l ? l(this.value) : this.value;
              } catch (g) {
                y.reject(g);
                continue;
              }
              else if (i) {
                if (!w) {
                  y.reject(this.error);
                  continue;
                }
                try {
                  m = w(this.error);
                } catch (g) {
                  y.reject(g);
                  continue;
                }
              }
              if (m instanceof e && (m.resolved || m.rejected)) {
                var p = m;
                p.resolved ? y.resolve(p.value) : y.reject(p.error), p.errorHandled = !0;
              } else I(m) ? m instanceof e && (m.resolved || m.rejected) ? m.resolved ? y.resolve(m.value) : y.reject(m.error) : c(m, y) : y.resolve(m);
            }
            a.length = 0, this.dispatching = !1, dt();
          }
        }, r.then = function(n, i) {
          if (n && typeof n != "function" && !n.call) throw new Error("Promise.then expected a function for success handler");
          if (i && typeof i != "function" && !i.call) throw new Error("Promise.then expected a function for error handler");
          var a = new e();
          return this.handlers.push({
            promise: a,
            onSuccess: n,
            onError: i
          }), this.errorHandled = !0, this.dispatch(), a;
        }, r.catch = function(n) {
          return this.then(void 0, n);
        }, r.finally = function(n) {
          if (n && typeof n != "function" && !n.call) throw new Error("Promise.finally expected a function");
          return this.then(function(i) {
            return e.try(n).then(function() {
              return i;
            });
          }, function(i) {
            return e.try(n).then(function() {
              throw i;
            });
          });
        }, r.timeout = function(n, i) {
          var a = this;
          if (this.resolved || this.rejected) return this;
          var c = setTimeout(function() {
            a.resolved || a.rejected || a.reject(i || new Error("Promise timed out after " + n + "ms"));
          }, n);
          return this.then(function(d) {
            return clearTimeout(c), d;
          });
        }, r.toPromise = function() {
          if (typeof Promise > "u") throw new TypeError("Could not find Promise");
          return Promise.resolve(this);
        }, r.lazy = function() {
          return this.errorHandled = !0, this;
        }, e.resolve = function(n) {
          return n instanceof e ? n : I(n) ? new e(function(i, a) {
            return n.then(i, a);
          }) : new e().resolve(n);
        }, e.reject = function(n) {
          return new e().reject(n);
        }, e.asyncReject = function(n) {
          return new e().asyncReject(n);
        }, e.all = function(n) {
          var i = new e(), a = n.length, c = [].slice();
          if (!a)
            return i.resolve(c), i;
          for (var d = function(w, y, m) {
            return y.then(function(p) {
              c[w] = p, (a -= 1) == 0 && i.resolve(c);
            }, function(p) {
              m.reject(p);
            });
          }, h = 0; h < n.length; h++) {
            var l = n[h];
            if (l instanceof e) {
              if (l.resolved) {
                c[h] = l.value, a -= 1;
                continue;
              }
            } else if (!I(l)) {
              c[h] = l, a -= 1;
              continue;
            }
            d(h, e.resolve(l), i);
          }
          return a === 0 && i.resolve(c), i;
        }, e.hash = function(n) {
          var i = {}, a = [], c = function(h) {
            if (n.hasOwnProperty(h)) {
              var l = n[h];
              I(l) ? a.push(l.then(function(w) {
                i[h] = w;
              })) : i[h] = l;
            }
          };
          for (var d in n) c(d);
          return e.all(a).then(function() {
            return i;
          });
        }, e.map = function(n, i) {
          return e.all(n.map(i));
        }, e.onPossiblyUnhandledException = function(n) {
          return function(i) {
            return b.push(i), {
              cancel: function() {
                b.splice(b.indexOf(i), 1);
              }
            };
          }(n);
        }, e.try = function(n, i, a) {
          if (n && typeof n != "function" && !n.call) throw new Error("Promise.try expected a function");
          var c;
          ae();
          try {
            c = n.apply(i, a || []);
          } catch (d) {
            return dt(), e.reject(d);
          }
          return dt(), e.resolve(c);
        }, e.delay = function(n) {
          return new e(function(i) {
            setTimeout(i, n);
          });
        }, e.isPromise = function(n) {
          return !!(n && n instanceof e) || I(n);
        }, e.flush = function() {
          return function(n) {
            var i = z = z || new n();
            return re(), i;
          }(e);
        }, e;
      }();
      function yt(e) {
        return {}.toString.call(e) === "[object RegExp]";
      }
      var Ze = {
        IFRAME: "iframe",
        POPUP: "popup"
      }, bt = `Call was rejected by callee.\r
`;
      function ur(e) {
        return e === void 0 && (e = window), e.location.protocol;
      }
      function Zt(e) {
        if (e === void 0 && (e = window), e.mockDomain) {
          var r = e.mockDomain.split("//")[0];
          if (r) return r;
        }
        return ur(e);
      }
      function cr(e) {
        return e === void 0 && (e = window), Zt(e) === "about:";
      }
      function rt(e) {
        if (e === void 0 && (e = window), e) try {
          if (e.parent && e.parent !== e) return e.parent;
        } catch {
        }
      }
      function ie(e) {
        if (e === void 0 && (e = window), e && !rt(e)) try {
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
      function st(e) {
        e === void 0 && (e = window);
        var r = e.location;
        if (!r) throw new Error("Can not read window location");
        var n = ur(e);
        if (!n) throw new Error("Can not read window protocol");
        if (n === "file:") return "file://";
        if (n === "about:") {
          var i = rt(e);
          return i && He() ? st(i) : "about://";
        }
        var a = r.host;
        if (!a) throw new Error("Can not read window host");
        return n + "//" + a;
      }
      function C(e) {
        e === void 0 && (e = window);
        var r = st(e);
        return r && e.mockDomain && e.mockDomain.indexOf("mock:") === 0 ? e.mockDomain : r;
      }
      function D(e) {
        if (!function(r) {
          try {
            if (r === window) return !0;
          } catch {
          }
          try {
            var n = Object.getOwnPropertyDescriptor(r, "location");
            if (n && n.enumerable === !1) return !1;
          } catch {
          }
          try {
            if (cr(r) && He()) return !0;
          } catch {
          }
          try {
            if (function(i) {
              return i === void 0 && (i = window), Zt(i) === "mock:";
            }(r) && He()) return !0;
          } catch {
          }
          try {
            if (st(r) === st(window)) return !0;
          } catch {
          }
          return !1;
        }(e)) return !1;
        try {
          if (e === window || cr(e) && He() || C(window) === C(e)) return !0;
        } catch {
        }
        return !1;
      }
      function J(e) {
        if (!D(e)) throw new Error("Expected window to be same domain");
        return e;
      }
      function we(e, r) {
        if (!e || !r) return !1;
        var n = rt(r);
        return n ? n === e : function(i) {
          var a = [];
          try {
            for (; i.parent !== i; )
              a.push(i.parent), i = i.parent;
          } catch {
          }
          return a;
        }(r).indexOf(e) !== -1;
      }
      function et(e) {
        var r = [], n;
        try {
          n = e.frames;
        } catch {
          n = e;
        }
        var i;
        try {
          i = n.length;
        } catch {
        }
        if (i === 0) return r;
        if (i) {
          for (var a = 0; a < i; a++) {
            var c = void 0;
            try {
              c = n[a];
            } catch {
              continue;
            }
            r.push(c);
          }
          return r;
        }
        for (var d = 0; d < 100; d++) {
          var h = void 0;
          try {
            h = n[d];
          } catch {
            return r;
          }
          if (!h) return r;
          r.push(h);
        }
        return r;
      }
      function Je(e) {
        for (var r = [], n = 0, i = et(e); n < i.length; n++) {
          var a = i[n];
          r.push(a);
          for (var c = 0, d = Je(a); c < d.length; c++) r.push(d[c]);
        }
        return r;
      }
      function Ke(e) {
        e === void 0 && (e = window);
        try {
          if (e.top) return e.top;
        } catch {
        }
        if (rt(e) === e) return e;
        try {
          if (we(window, e) && window.top) return window.top;
        } catch {
        }
        try {
          if (we(e, window) && window.top) return window.top;
        } catch {
        }
        for (var r = 0, n = Je(e); r < n.length; r++) {
          var i = n[r];
          try {
            if (i.top) return i.top;
          } catch {
          }
          if (rt(i) === i) return i;
        }
      }
      function Re(e) {
        var r = Ke(e);
        if (!r) throw new Error("Can not determine top window");
        var n = [].concat(Je(r), [r]);
        return n.indexOf(e) === -1 && (n = [].concat(n, [e], Je(e))), n;
      }
      var Qe = [], Yr = [];
      function xe(e, r) {
        r === void 0 && (r = !0);
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
          return !a || a.message !== bt;
        }
        if (r && D(e)) try {
          if (e.mockclosed) return !0;
        } catch {
        }
        try {
          if (!e.parent || !e.top) return !0;
        } catch {
        }
        var n = function(a, c) {
          for (var d = 0; d < a.length; d++) try {
            if (a[d] === c) return d;
          } catch {
          }
          return -1;
        }(Qe, e);
        if (n !== -1) {
          var i = Yr[n];
          if (i && function(a) {
            if (!a.contentWindow || !a.parentNode) return !0;
            var c = a.ownerDocument;
            if (c && c.documentElement && !c.documentElement.contains(a)) {
              for (var d = a; d.parentNode && d.parentNode !== d; ) d = d.parentNode;
              if (!d.host || !c.documentElement.contains(d.host)) return !0;
            }
            return !1;
          }(i)) return !0;
        }
        return !1;
      }
      function dr(e) {
        return (e = e || window).navigator.mockUserAgent || e.navigator.userAgent;
      }
      function fr(e, r) {
        for (var n = et(e), i = 0; i < n.length; i++) {
          var a = n[i];
          try {
            if (D(a) && a.name === r && n.indexOf(a) !== -1) return a;
          } catch {
          }
        }
        try {
          if (n.indexOf(e.frames[r]) !== -1) return e.frames[r];
        } catch {
        }
        try {
          if (n.indexOf(e[r]) !== -1) return e[r];
        } catch {
        }
      }
      function Dr(e, r) {
        return e === ie(r);
      }
      function Qt(e) {
        return e === void 0 && (e = window), ie(e = e || window) || rt(e) || void 0;
      }
      function Nr(e, r) {
        for (var n = 0; n < e.length; n++)
          for (var i = e[n], a = 0; a < r.length; a++) if (i === r[a]) return !0;
        return !1;
      }
      function lr(e) {
        e === void 0 && (e = window);
        for (var r = 0, n = e; n; ) (n = rt(n)) && (r += 1);
        return r;
      }
      function Zr(e, r) {
        var n = Ke(e) || e, i = Ke(r) || r;
        try {
          if (n && i) return n === i;
        } catch {
        }
        var a = Re(e), c = Re(r);
        if (Nr(a, c)) return !0;
        var d = ie(n), h = ie(i);
        return d && Nr(Re(d), c) || h && Nr(Re(h), a), !1;
      }
      function ft(e, r) {
        if (typeof e == "string") {
          if (typeof r == "string") return e === "*" || r === e;
          if (yt(r) || Array.isArray(r)) return !1;
        }
        return yt(e) ? yt(r) ? e.toString() === r.toString() : !Array.isArray(r) && !!r.match(e) : !!Array.isArray(e) && (Array.isArray(r) ? JSON.stringify(e) === JSON.stringify(r) : !yt(r) && e.some(function(n) {
          return ft(n, r);
        }));
      }
      function Nt(e) {
        return e.match(/^(https?|mock|file):\/\//) ? e.split("/").slice(0, 3).join("/") : C();
      }
      function Oo(e, r, n, i) {
        n === void 0 && (n = 1e3), i === void 0 && (i = 1 / 0);
        var a;
        return function c() {
          if (xe(e))
            return a && clearTimeout(a), r();
          i <= 0 ? clearTimeout(a) : (i -= n, a = setTimeout(c, n));
        }(), {
          cancel: function() {
            a && clearTimeout(a);
          }
        };
      }
      function Xt(e) {
        try {
          if (e === window) return !0;
        } catch (r) {
          if (r && r.message === bt) return !0;
        }
        try {
          if ({}.toString.call(e) === "[object Window]") return !0;
        } catch (r) {
          if (r && r.message === bt) return !0;
        }
        try {
          if (window.Window && e instanceof window.Window) return !0;
        } catch (r) {
          if (r && r.message === bt) return !0;
        }
        try {
          if (e && e.self === e) return !0;
        } catch (r) {
          if (r && r.message === bt) return !0;
        }
        try {
          if (e && e.parent === e) return !0;
        } catch (r) {
          if (r && r.message === bt) return !0;
        }
        try {
          if (e && e.top === e) return !0;
        } catch (r) {
          if (r && r.message === bt) return !0;
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
      function Sn(e) {
        if (r = Nt(e), r.indexOf("mock:") !== 0) return e;
        var r;
        throw new Error("Mock urls not supported out of test mode");
      }
      function xo(e) {
        if (D(e)) return J(e).frameElement;
        for (var r = 0, n = document.querySelectorAll("iframe"); r < n.length; r++) {
          var i = n[r];
          if (i && i.contentWindow && i.contentWindow === e) return i;
        }
      }
      function Do(e) {
        if (function(n) {
          return n === void 0 && (n = window), !!rt(n);
        }(e)) {
          var r = xo(e);
          if (r && r.parentElement) {
            r.parentElement.removeChild(r);
            return;
          }
        }
        try {
          e.close();
        } catch {
        }
      }
      function Qr(e, r) {
        for (var n = 0; n < e.length; n++) try {
          if (e[n] === r) return n;
        } catch {
        }
        return -1;
      }
      var Xr = function() {
        function e() {
          if (this.name = void 0, this.weakmap = void 0, this.keys = void 0, this.values = void 0, this.name = "__weakmap_" + (1e9 * Math.random() >>> 0) + "__", function() {
            if (typeof WeakMap > "u" || Object.freeze === void 0) return !1;
            try {
              var n = /* @__PURE__ */ new WeakMap(), i = {};
              return Object.freeze(i), n.set(i, "__testvalue__"), n.get(i) === "__testvalue__";
            } catch {
              return !1;
            }
          }()) try {
            this.weakmap = /* @__PURE__ */ new WeakMap();
          } catch {
          }
          this.keys = [], this.values = [];
        }
        var r = e.prototype;
        return r._cleanupClosedWindows = function() {
          for (var n = this.weakmap, i = this.keys, a = 0; a < i.length; a++) {
            var c = i[a];
            if (Xt(c) && xe(c)) {
              if (n) try {
                n.delete(c);
              } catch {
              }
              i.splice(a, 1), this.values.splice(a, 1), a -= 1;
            }
          }
        }, r.isSafeToReadWrite = function(n) {
          return !Xt(n);
        }, r.set = function(n, i) {
          if (!n) throw new Error("WeakMap expected key");
          var a = this.weakmap;
          if (a) try {
            a.set(n, i);
          } catch {
            delete this.weakmap;
          }
          if (this.isSafeToReadWrite(n)) try {
            var c = this.name, d = n[c];
            d && d[0] === n ? d[1] = i : Object.defineProperty(n, c, {
              value: [n, i],
              writable: !0
            });
            return;
          } catch {
          }
          this._cleanupClosedWindows();
          var h = this.keys, l = this.values, w = Qr(h, n);
          w === -1 ? (h.push(n), l.push(i)) : l[w] = i;
        }, r.get = function(n) {
          if (!n) throw new Error("WeakMap expected key");
          var i = this.weakmap;
          if (i) try {
            if (i.has(n)) return i.get(n);
          } catch {
            delete this.weakmap;
          }
          if (this.isSafeToReadWrite(n)) try {
            var a = n[this.name];
            return a && a[0] === n ? a[1] : void 0;
          } catch {
          }
          this._cleanupClosedWindows();
          var c = Qr(this.keys, n);
          if (c !== -1) return this.values[c];
        }, r.delete = function(n) {
          if (!n) throw new Error("WeakMap expected key");
          var i = this.weakmap;
          if (i) try {
            i.delete(n);
          } catch {
            delete this.weakmap;
          }
          if (this.isSafeToReadWrite(n)) try {
            var a = n[this.name];
            a && a[0] === n && (a[0] = a[1] = void 0);
          } catch {
          }
          this._cleanupClosedWindows();
          var c = this.keys, d = Qr(c, n);
          d !== -1 && (c.splice(d, 1), this.values.splice(d, 1));
        }, r.has = function(n) {
          if (!n) throw new Error("WeakMap expected key");
          var i = this.weakmap;
          if (i) try {
            if (i.has(n)) return !0;
          } catch {
            delete this.weakmap;
          }
          if (this.isSafeToReadWrite(n)) try {
            var a = n[this.name];
            return !(!a || a[0] !== n);
          } catch {
          }
          return this._cleanupClosedWindows(), Qr(this.keys, n) !== -1;
        }, r.getOrSet = function(n, i) {
          if (this.has(n)) return this.get(n);
          var a = i();
          return this.set(n, a), a;
        }, e;
      }();
      function No(e) {
        return (No = Object.setPrototypeOf ? Object.getPrototypeOf : function(r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        })(e);
      }
      function _a() {
        if (typeof Reflect > "u" || !Reflect.construct || Reflect.construct.sham) return !1;
        if (typeof Proxy == "function") return !0;
        try {
          return Date.prototype.toString.call(Reflect.construct(Date, [], function() {
          })), !0;
        } catch {
          return !1;
        }
      }
      function Co(e, r, n) {
        return (Co = _a() ? Reflect.construct : function(i, a, c) {
          var d = [null];
          d.push.apply(d, a);
          var h = new (Function.bind.apply(i, d))();
          return c && v(h, c.prototype), h;
        }).apply(null, arguments);
      }
      function Io(e) {
        var r = typeof Map == "function" ? /* @__PURE__ */ new Map() : void 0;
        return (Io = function(n) {
          if (n === null || (i = n, Function.toString.call(i).indexOf("[native code]") === -1)) return n;
          var i;
          if (typeof n != "function") throw new TypeError("Super expression must either be null or a function");
          if (r !== void 0) {
            if (r.has(n)) return r.get(n);
            r.set(n, a);
          }
          function a() {
            return Co(n, arguments, No(this).constructor);
          }
          return a.prototype = Object.create(n.prototype, {
            constructor: {
              value: a,
              enumerable: !1,
              writable: !0,
              configurable: !0
            }
          }), v(a, n);
        })(e);
      }
      function On(e) {
        var r = !1;
        try {
          (e instanceof window.Element || e !== null && typeof e == "object" && e.nodeType === 1 && typeof e.style == "object" && typeof e.ownerDocument == "object") && (r = !0);
        } catch {
        }
        return r;
      }
      function xn(e) {
        return e.name || e.__name__ || e.displayName || "anonymous";
      }
      function Dn(e, r) {
        try {
          delete e.name, e.name = r;
        } catch {
        }
        return e.__name__ = e.displayName = r, e;
      }
      function Nn(e) {
        if (typeof btoa == "function") return btoa(encodeURIComponent(e).replace(/%([0-9A-F]{2})/g, function(r, n) {
          return String.fromCharCode(parseInt(n, 16));
        })).replace(/[=]/g, "");
        if (typeof Buffer < "u") return Buffer.from(e, "utf8").toString("base64").replace(/[=]/g, "");
        throw new Error("Can not find window.btoa or Buffer");
      }
      function Xe() {
        var e = "0123456789abcdef";
        return "uid_" + "xxxxxxxxxx".replace(/./g, function() {
          return e.charAt(Math.floor(Math.random() * e.length));
        }) + "_" + Nn((/* @__PURE__ */ new Date()).toISOString().slice(11, 19).replace("T", ".")).replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
      }
      var kr;
      function Cn(e) {
        try {
          return JSON.stringify([].slice.call(e), function(r, n) {
            return typeof n == "function" ? "memoize[" + function(i) {
              if (kr = kr || new Xr(), i == null || typeof i != "object" && typeof i != "function") throw new Error("Invalid object");
              var a = kr.get(i);
              return a || (a = typeof i + ":" + Xe(), kr.set(i, a)), a;
            }(n) + "]" : On(n) ? {} : n;
          });
        } catch {
          throw new Error("Arguments not serializable -- can not be used to memoize");
        }
      }
      function Wa() {
        return {};
      }
      var Cr = 0, Ao = 0;
      function zt(e, r) {
        r === void 0 && (r = {});
        var n = r.thisNamespace, i = n !== void 0 && n, a = r.time, c, d, h = Cr;
        Cr += 1;
        var l = function() {
          for (var w = arguments.length, y = new Array(w), m = 0; m < w; m++) y[m] = arguments[m];
          h < Ao && (c = null, d = null, h = Cr, Cr += 1);
          var p;
          p = i ? (d = d || new Xr()).getOrSet(this, Wa) : c = c || {};
          var g;
          try {
            g = Cn(y);
          } catch {
            return e.apply(this, arguments);
          }
          var E = p[g];
          if (E && a && Date.now() - E.time < a && (delete p[g], E = null), E) return E.value;
          var R = Date.now(), O = e.apply(this, arguments);
          return p[g] = {
            time: R,
            value: O
          }, O;
        };
        return l.reset = function() {
          c = null, d = null;
        }, Dn(l, (r.name || xn(e)) + "::memoized");
      }
      zt.clear = function() {
        Ao = Cr;
      };
      function Ma(e) {
        var r = {};
        function n() {
          for (var i = arguments, a = this, c = arguments.length, d = new Array(c), h = 0; h < c; h++) d[h] = arguments[h];
          var l = Cn(d);
          return r.hasOwnProperty(l) || (r[l] = S.try(function() {
            return e.apply(a, i);
          }).finally(function() {
            delete r[l];
          })), r[l];
        }
        return n.reset = function() {
          r = {};
        }, Dn(n, xn(e) + "::promiseMemoized");
      }
      function ye() {
      }
      function en(e) {
        var r = !1;
        return Dn(function() {
          if (!r)
            return r = !0, e.apply(this, arguments);
        }, xn(e) + "::once");
      }
      function hr(e, r) {
        if (r === void 0 && (r = 1), r >= 3) return "stringifyError stack overflow";
        try {
          if (!e) return "<unknown error: " + {}.toString.call(e) + ">";
          if (typeof e == "string") return e;
          if (e instanceof Error) {
            var n = e && e.stack, i = e && e.message;
            if (n && i) return n.indexOf(i) !== -1 ? n : i + `
` + n;
            if (n) return n;
            if (i) return i;
          }
          return e && e.toString && typeof e.toString == "function" ? e.toString() : {}.toString.call(e);
        } catch (a) {
          return "Error while stringifying error: " + hr(a, r + 1);
        }
      }
      function tn(e) {
        return typeof e == "string" ? e : e && e.toString && typeof e.toString == "function" ? e.toString() : {}.toString.call(e);
      }
      function pr(e, r) {
        if (!r) return e;
        if (Object.assign) return Object.assign(e, r);
        for (var n in r) r.hasOwnProperty(n) && (e[n] = r[n]);
        return e;
      }
      zt(function(e) {
        if (Object.values) return Object.values(e);
        var r = [];
        for (var n in e) e.hasOwnProperty(n) && r.push(e[n]);
        return r;
      });
      function Fa(e) {
        return e;
      }
      function Ir(e, r) {
        var n;
        return function i() {
          n = setTimeout(function() {
            e(), i();
          }, r);
        }(), {
          cancel: function() {
            clearTimeout(n);
          }
        };
      }
      function In(e) {
        return e.replace(/-([a-z])/g, function(r) {
          return r[1].toUpperCase();
        });
      }
      function _o(e, r, n) {
        if (Array.isArray(e)) {
          if (typeof r != "number") throw new TypeError("Array key must be number");
        } else if (typeof e == "object" && e !== null && typeof r != "string") throw new TypeError("Object key must be string");
        Object.defineProperty(e, r, {
          configurable: !0,
          enumerable: !0,
          get: function() {
            delete e[r];
            var i = n();
            return e[r] = i, i;
          },
          set: function(i) {
            delete e[r], e[r] = i;
          }
        });
      }
      function An(e) {
        return [].slice.call(e);
      }
      function Wo(e) {
        return typeof (r = e) == "object" && r !== null && {}.toString.call(e) === "[object Object]";
        var r;
      }
      function _n(e) {
        if (!Wo(e)) return !1;
        var r = e.constructor;
        if (typeof r != "function") return !1;
        var n = r.prototype;
        return !!Wo(n) && !!n.hasOwnProperty("isPrototypeOf");
      }
      function rn(e, r, n) {
        if (n === void 0 && (n = ""), Array.isArray(e)) {
          for (var i = e.length, a = [], c = function(y) {
            _o(a, y, function() {
              var m = n ? n + "." + y : "" + y, p = r(e[y], y, m);
              return (_n(p) || Array.isArray(p)) && (p = rn(p, r, m)), p;
            });
          }, d = 0; d < i; d++) c(d);
          return a;
        }
        if (_n(e)) {
          var h = {}, l = function(y) {
            if (!e.hasOwnProperty(y)) return 1;
            _o(h, y, function() {
              var m = n ? n + "." + y : "" + y, p = r(e[y], y, m);
              return (_n(p) || Array.isArray(p)) && (p = rn(p, r, m)), p;
            });
          };
          for (var w in e) l(w);
          return h;
        }
        throw new Error("Pass an object or array");
      }
      function Lt(e) {
        return e != null;
      }
      function Wn(e) {
        return {}.toString.call(e) === "[object RegExp]";
      }
      function Ar(e, r, n) {
        if (e.hasOwnProperty(r)) return e[r];
        var i = n();
        return e[r] = i, i;
      }
      function nn(e) {
        var r = [], n = !1, i, a = {
          set: function(c, d) {
            return n || (e[c] = d, a.register(function() {
              delete e[c];
            })), d;
          },
          register: function(c) {
            var d = en(function() {
              return c(i);
            });
            return n ? c(i) : r.push(d), {
              cancel: function() {
                var h = r.indexOf(d);
                h !== -1 && r.splice(h, 1);
              }
            };
          },
          all: function(c) {
            i = c;
            var d = [];
            for (n = !0; r.length; ) {
              var h = r.shift();
              d.push(h());
            }
            return S.all(d).then(ye);
          }
        };
        return a;
      }
      function on(e, r) {
        if (r == null) throw new Error("Expected " + e + " to be present");
        return r;
      }
      var za = function(e) {
        T(r, e);
        function r(n) {
          var i;
          return (i = e.call(this, n) || this).name = i.constructor.name, typeof Error.captureStackTrace == "function" ? Error.captureStackTrace(function(a) {
            if (a === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return a;
          }(i), i.constructor) : i.stack = new Error(n).stack, i;
        }
        return r;
      }(Io(Error));
      function Mo() {
        var e = document.body;
        if (!e) throw new Error("Body element not found");
        return e;
      }
      function an() {
        return !!document.body && document.readyState === "complete";
      }
      function Fo() {
        return !!document.body && document.readyState === "interactive";
      }
      function zo(e) {
        return encodeURIComponent(e);
      }
      zt(function() {
        return new S(function(e) {
          if (an() || Fo()) return e();
          var r = setInterval(function() {
            if (an() || Fo())
              return clearInterval(r), e();
          }, 10);
        });
      });
      function Lo(e) {
        return function(r, n, i) {
          i === void 0 && (i = []);
          var a = r.__inline_memoize_cache__ = r.__inline_memoize_cache__ || {}, c = Cn(i);
          return a.hasOwnProperty(c) ? a[c] : a[c] = (function() {
            var d = {};
            if (!e || e.indexOf("=") === -1) return d;
            for (var h = 0, l = e.split("&"); h < l.length; h++) {
              var w = l[h];
              (w = w.split("="))[0] && w[1] && (d[decodeURIComponent(w[0])] = decodeURIComponent(w[1]));
            }
            return d;
          }).apply(void 0, i);
        }(Lo, 0, [e]);
      }
      function Uo(e, r) {
        return r === void 0 && (r = {}), r && Object.keys(r).length ? function(n) {
          return n === void 0 && (n = {}), Object.keys(n).filter(function(i) {
            return typeof n[i] == "string" || typeof n[i] == "boolean";
          }).map(function(i) {
            var a = n[i];
            if (typeof a != "string" && typeof a != "boolean") throw new TypeError("Invalid type for query");
            return zo(i) + "=" + zo(a.toString());
          }).join("&");
        }(P({}, Lo(e), r)) : e;
      }
      function La(e, r) {
        e.appendChild(r);
      }
      function Mn(e, r) {
        return r === void 0 && (r = document), On(e) ? e : typeof e == "string" ? r.querySelector(e) : void 0;
      }
      function jo(e) {
        return new S(function(r, n) {
          var i = tn(e), a = Mn(e);
          if (a) return r(a);
          if (an()) return n(new Error("Document is ready and element " + i + " does not exist"));
          var c = setInterval(function() {
            if (a = Mn(e))
              r(a), clearInterval(c);
            else if (an())
              return clearInterval(c), n(new Error("Document is ready and element " + i + " does not exist"));
          }, 10);
        });
      }
      var Fn = function(e) {
        T(r, e);
        function r() {
          return e.apply(this, arguments) || this;
        }
        return r;
      }(za), sn;
      function qo(e) {
        if ((sn = sn || new Xr()).has(e)) {
          var r = sn.get(e);
          if (r) return r;
        }
        var n = new S(function(i, a) {
          e.addEventListener("load", function() {
            (function(c) {
              if (function() {
                for (var d = 0; d < Qe.length; d++) {
                  var h = !1;
                  try {
                    h = Qe[d].closed;
                  } catch {
                  }
                  h && (Yr.splice(d, 1), Qe.splice(d, 1));
                }
              }(), c && c.contentWindow) try {
                Qe.push(c.contentWindow), Yr.push(c);
              } catch {
              }
            })(e), i(e);
          }), e.addEventListener("error", function(c) {
            e.contentWindow ? i(e) : a(c);
          });
        });
        return sn.set(e, n), n;
      }
      function zn(e) {
        return qo(e).then(function(r) {
          if (!r.contentWindow) throw new Error("Could not find window in iframe");
          return r.contentWindow;
        });
      }
      function Bo(e, r) {
        e === void 0 && (e = {});
        var n = e.style || {}, i = function(c, d, h) {
          c === void 0 && (c = "div"), d === void 0 && (d = {}), c = c.toLowerCase();
          var l = document.createElement(c);
          if (d.style && pr(l.style, d.style), d.class && (l.className = d.class.join(" ")), d.id && l.setAttribute("id", d.id), d.attributes) for (var w = 0, y = Object.keys(d.attributes); w < y.length; w++) {
            var m = y[w];
            l.setAttribute(m, d.attributes[m]);
          }
          if (d.styleSheet && function(p, g, E) {
            E === void 0 && (E = window.document), p.styleSheet ? p.styleSheet.cssText = g : p.appendChild(E.createTextNode(g));
          }(l, d.styleSheet), d.html) {
            if (c === "iframe") throw new Error("Iframe html can not be written unless container provided and iframe in DOM");
            l.innerHTML = d.html;
          }
          return l;
        }("iframe", {
          attributes: P({
            allowTransparency: "true"
          }, e.attributes || {}),
          style: P({
            backgroundColor: "transparent",
            border: "none"
          }, n),
          html: e.html,
          class: e.class
        }), a = window.navigator.userAgent.match(/MSIE|Edge/i);
        return i.hasAttribute("id") || i.setAttribute("id", Xe()), qo(i), (e.url || a) && i.setAttribute("src", e.url || "about:blank"), i;
      }
      function $o(e, r, n) {
        return e.addEventListener(r, n), {
          cancel: function() {
            e.removeEventListener(r, n);
          }
        };
      }
      function Ua(e) {
        e.style.setProperty("display", "");
      }
      function Ho(e) {
        e.style.setProperty("display", "none", "important");
      }
      function _r(e) {
        e && e.parentNode && e.parentNode.removeChild(e);
      }
      function vr(e) {
        return !(e && e.parentNode && e.ownerDocument && e.ownerDocument.documentElement && e.ownerDocument.documentElement.contains(e));
      }
      function Vo(e, r, n) {
        var i = n === void 0 ? {} : n, a = i.width, c = a === void 0 || a, d = i.height, h = d === void 0 || d, l = i.interval, w = l === void 0 ? 100 : l, y = i.win, m = y === void 0 ? window : y, p = e.offsetWidth, g = e.offsetHeight, E = !1;
        r({
          width: p,
          height: g
        });
        var R = function() {
          if (!E && function(_) {
            return !!(_.offsetWidth || _.offsetHeight || _.getClientRects().length);
          }(e)) {
            var L = e.offsetWidth, V = e.offsetHeight;
            (c && L !== p || h && V !== g) && r({
              width: L,
              height: V
            }), p = L, g = V;
          }
        }, O, A;
        return m.addEventListener("resize", R), m.ResizeObserver !== void 0 ? ((O = new m.ResizeObserver(R)).observe(e), A = Ir(R, 10 * w)) : m.MutationObserver !== void 0 ? ((O = new m.MutationObserver(R)).observe(e, {
          attributes: !0,
          childList: !0,
          subtree: !0,
          characterData: !1
        }), A = Ir(R, 10 * w)) : A = Ir(R, w), {
          cancel: function() {
            E = !0, O.disconnect(), window.removeEventListener("resize", R), A.cancel();
          }
        };
      }
      function Ln(e) {
        for (; e.parentNode; ) e = e.parentNode;
        return e.toString() === "[object ShadowRoot]";
      }
      var un = typeof document < "u" ? document.currentScript : null, ja = zt(function() {
        if (un || (un = function() {
          try {
            var e = function() {
              try {
                throw new Error("_");
              } catch (d) {
                return d.stack || "";
              }
            }(), r = /.*at [^(]*\((.*):(.+):(.+)\)$/gi.exec(e), n = r && r[1];
            if (!n) return;
            for (var i = 0, a = [].slice.call(document.getElementsByTagName("script")).reverse(); i < a.length; i++) {
              var c = a[i];
              if (c.src && c.src === n) return c;
            }
          } catch {
          }
        }())) return un;
        throw new Error("Can not determine current script");
      }), qa = Xe();
      zt(function() {
        var e;
        try {
          e = ja();
        } catch {
          return qa;
        }
        var r = e.getAttribute("data-uid");
        if (r && typeof r == "string" || (r = e.getAttribute("data-uid-auto")) && typeof r == "string") return r;
        if (e.src) {
          var n = function(i) {
            for (var a = "", c = 0; c < i.length; c++) {
              var d = i[c].charCodeAt(0) * c;
              i[c + 1] && (d += i[c + 1].charCodeAt(0) * (c - 1)), a += String.fromCharCode(97 + Math.abs(d) % 26);
            }
            return a;
          }(JSON.stringify({
            src: e.src,
            dataset: e.dataset
          }));
          r = "uid_" + n.slice(n.length - 30);
        } else r = Xe();
        return e.setAttribute("data-uid-auto", r), r;
      });
      function Jo(e) {
        return typeof e == "string" && /^[0-9]+%$/.test(e);
      }
      function Un(e) {
        if (typeof e == "number") return e;
        var r = e.match(/^([0-9]+)(px|%)$/);
        if (!r) throw new Error("Could not match css value from " + e);
        return parseInt(r[1], 10);
      }
      function Ko(e) {
        return Un(e) + "px";
      }
      function Yo(e) {
        return typeof e == "number" ? Ko(e) : Jo(e) ? e : Ko(e);
      }
      function Zo(e, r) {
        if (typeof e == "number") return e;
        if (Jo(e)) return parseInt(r * Un(e) / 100, 10);
        if (typeof (n = e) == "string" && /^[0-9]+px$/.test(n)) return Un(e);
        var n;
        throw new Error("Can not normalize dimension: " + e);
      }
      function Ot(e) {
        e === void 0 && (e = window);
        var r = "__post_robot_11_0_0__";
        return e !== window ? e[r] : e[r] = e[r] || {};
      }
      var Qo = function() {
        return {};
      };
      function fe(e, r) {
        return e === void 0 && (e = "store"), r === void 0 && (r = Qo), Ar(Ot(), e, function() {
          var n = r();
          return {
            has: function(i) {
              return n.hasOwnProperty(i);
            },
            get: function(i, a) {
              return n.hasOwnProperty(i) ? n[i] : a;
            },
            set: function(i, a) {
              return n[i] = a, a;
            },
            del: function(i) {
              delete n[i];
            },
            getOrSet: function(i, a) {
              return Ar(n, i, a);
            },
            reset: function() {
              n = r();
            },
            keys: function() {
              return Object.keys(n);
            }
          };
        });
      }
      var Ba = function() {
      };
      function cn() {
        var e = Ot();
        return e.WINDOW_WILDCARD = e.WINDOW_WILDCARD || new Ba(), e.WINDOW_WILDCARD;
      }
      function Ye(e, r) {
        return e === void 0 && (e = "store"), r === void 0 && (r = Qo), fe("windowStore").getOrSet(e, function() {
          var n = new Xr(), i = function(a) {
            return n.getOrSet(a, r);
          };
          return {
            has: function(a) {
              return i(a).hasOwnProperty(e);
            },
            get: function(a, c) {
              var d = i(a);
              return d.hasOwnProperty(e) ? d[e] : c;
            },
            set: function(a, c) {
              return i(a)[e] = c, c;
            },
            del: function(a) {
              delete i(a)[e];
            },
            getOrSet: function(a, c) {
              return Ar(i(a), e, c);
            }
          };
        });
      }
      function Xo() {
        return fe("instance").getOrSet("instanceID", Xe);
      }
      function ko(e, r) {
        var n = r.domain, i = Ye("helloPromises"), a = i.get(e);
        a && a.resolve({
          domain: n
        });
        var c = S.resolve({
          domain: n
        });
        return i.set(e, c), c;
      }
      function jn(e, r) {
        return (0, r.send)(e, "postrobot_hello", {
          instanceID: Xo()
        }, {
          domain: "*",
          timeout: -1
        }).then(function(n) {
          var i = n.origin, a = n.data.instanceID;
          return ko(e, {
            domain: i
          }), {
            win: e,
            domain: i,
            instanceID: a
          };
        });
      }
      function ei(e, r) {
        var n = r.send;
        return Ye("windowInstanceIDPromises").getOrSet(e, function() {
          return jn(e, {
            send: n
          }).then(function(i) {
            return i.instanceID;
          });
        });
      }
      function ti(e, r, n) {
        r === void 0 && (r = 5e3), n === void 0 && (n = "Window");
        var i = function(a) {
          return Ye("helloPromises").getOrSet(a, function() {
            return new S();
          });
        }(e);
        return r !== -1 && (i = i.timeout(r, new Error(n + " did not load after " + r + "ms"))), i;
      }
      function ri(e) {
        Ye("knownWindows").set(e, !0);
      }
      function qn(e) {
        return typeof e == "object" && e !== null && typeof e.__type__ == "string";
      }
      function ni(e) {
        return e === void 0 ? "undefined" : e === null ? "null" : Array.isArray(e) ? "array" : typeof e == "function" ? "function" : typeof e == "object" ? e instanceof Error ? "error" : typeof e.then == "function" ? "promise" : {}.toString.call(e) === "[object RegExp]" ? "regex" : {}.toString.call(e) === "[object Date]" ? "date" : "object" : typeof e == "string" ? "string" : typeof e == "number" ? "number" : typeof e == "boolean" ? "boolean" : void 0;
      }
      function kt(e, r) {
        return {
          __type__: e,
          __val__: r
        };
      }
      var lt, $a = ((lt = {}).function = function() {
      }, lt.error = function(e) {
        return kt("error", {
          message: e.message,
          stack: e.stack,
          code: e.code,
          data: e.data
        });
      }, lt.promise = function() {
      }, lt.regex = function(e) {
        return kt("regex", e.source);
      }, lt.date = function(e) {
        return kt("date", e.toJSON());
      }, lt.array = function(e) {
        return e;
      }, lt.object = function(e) {
        return e;
      }, lt.string = function(e) {
        return e;
      }, lt.number = function(e) {
        return e;
      }, lt.boolean = function(e) {
        return e;
      }, lt.null = function(e) {
        return e;
      }, lt[void 0] = function(e) {
        return kt("undefined", e);
      }, lt), Ha = {}, ht, Va = ((ht = {}).function = function() {
        throw new Error("Function serialization is not implemented; nothing to deserialize");
      }, ht.error = function(e) {
        var r = e.stack, n = e.code, i = e.data, a = new Error(e.message);
        return a.code = n, i && (a.data = i), a.stack = r + `

` + a.stack, a;
      }, ht.promise = function() {
        throw new Error("Promise serialization is not implemented; nothing to deserialize");
      }, ht.regex = function(e) {
        return new RegExp(e);
      }, ht.date = function(e) {
        return new Date(e);
      }, ht.array = function(e) {
        return e;
      }, ht.object = function(e) {
        return e;
      }, ht.string = function(e) {
        return e;
      }, ht.number = function(e) {
        return e;
      }, ht.boolean = function(e) {
        return e;
      }, ht.null = function(e) {
        return e;
      }, ht[void 0] = function() {
      }, ht), Ga = {};
      function Bn() {
        return !!dr(window).match(/MSIE|trident|edge\/12|edge\/13/i);
      }
      function oi(e) {
        return !Zr(window, e);
      }
      function ii(e, r) {
        if (e) {
          if (C() !== Nt(e)) return !0;
        } else if (r && !D(r)) return !0;
        return !1;
      }
      function ai(e) {
        var r = e.win, n = e.domain;
        return !(!Bn() || n && !ii(n, r) || r && !oi(r));
      }
      function $n(e) {
        return "__postrobot_bridge___" + (e = e || Nt(e)).replace(/[^a-zA-Z0-9]+/g, "_");
      }
      function si() {
        return !!(window.name && window.name === $n(C()));
      }
      var Ja = new S(function(e) {
        if (window.document && window.document.body) return e(window.document.body);
        var r = setInterval(function() {
          if (window.document && window.document.body)
            return clearInterval(r), e(window.document.body);
        }, 10);
      });
      function ui(e) {
        Ye("remoteWindowPromises").getOrSet(e, function() {
          return new S();
        });
      }
      function Hn(e) {
        var r = Ye("remoteWindowPromises").get(e);
        if (!r) throw new Error("Remote window promise not found");
        return r;
      }
      function ci(e, r, n) {
        Hn(e).resolve(function(i, a, c) {
          if (i !== e) throw new Error("Remote window does not match window");
          if (!ft(a, r)) throw new Error("Remote domain " + a + " does not match domain " + r);
          n.fireAndForget(c);
        });
      }
      function Vn(e, r) {
        Hn(e).reject(r).catch(ye);
      }
      function dn(e) {
        for (var r = e.win, n = e.name, i = e.domain, a = fe("popupWindowsByName"), c = Ye("popupWindowsByWin"), d = 0, h = a.keys(); d < h.length; d++) {
          var l = h[d], w = a.get(l);
          w && !xe(w.win) || a.del(l);
        }
        if (xe(r)) return {
          win: r,
          name: n,
          domain: i
        };
        var y = c.getOrSet(r, function() {
          return n ? a.getOrSet(n, function() {
            return {
              win: r,
              name: n
            };
          }) : {
            win: r
          };
        });
        if (y.win && y.win !== r) throw new Error("Different window already linked for window: " + (n || "undefined"));
        return n && (y.name = n, a.set(n, y)), i && (y.domain = i, ui(r)), c.set(r, y), y;
      }
      function di(e) {
        var r = e.on, n = e.send, i = e.receiveMessage;
        a = window.open, window.open = function(c, d, h, l) {
          var w = a.call(this, Sn(c), d, h, l);
          return w && (dn({
            win: w,
            name: d,
            domain: c ? Nt(c) : null
          }), w);
        };
        var a;
        (function(c) {
          var d = c.on, h = c.send, l = c.receiveMessage, w = fe("popupWindowsByName");
          d("postrobot_open_tunnel", function(y) {
            var m = y.source, p = y.origin, g = y.data, E = fe("bridges").get(p);
            if (!E) throw new Error("Can not find bridge promise for domain " + p);
            return E.then(function(R) {
              if (m !== R) throw new Error("Message source does not matched registered bridge for domain " + p);
              if (!g.name) throw new Error("Register window expected to be passed window name");
              if (!g.sendMessage) throw new Error("Register window expected to be passed sendMessage method");
              if (!w.has(g.name)) throw new Error("Window with name " + g.name + " does not exist, or was not opened by this window");
              var O = function() {
                return w.get(g.name);
              };
              if (!O().domain) throw new Error("We do not have a registered domain for window " + g.name);
              if (O().domain !== p) throw new Error("Message origin " + p + " does not matched registered window origin " + (O().domain || "unknown"));
              return ci(O().win, p, g.sendMessage), {
                sendMessage: function(A) {
                  if (window && !window.closed && O()) {
                    var L = O().domain;
                    if (L) try {
                      l({
                        data: A,
                        origin: L,
                        source: O().win
                      }, {
                        on: d,
                        send: h
                      });
                    } catch (V) {
                      S.reject(V);
                    }
                  }
                }
              };
            });
          });
        })({
          on: r,
          send: n,
          receiveMessage: i
        }), function(c) {
          var d = c.send;
          Ot(window).openTunnelToParent = function(h) {
            var l = h.name, w = h.source, y = h.canary, m = h.sendMessage, p = fe("tunnelWindows"), g = rt(window);
            if (!g) throw new Error("No parent window found to open tunnel to");
            var E = function(R) {
              var O = R.name, A = R.source, L = R.canary, V = R.sendMessage;
              (function() {
                for (var $ = fe("tunnelWindows"), U = 0, X = $.keys(); U < X.length; U++) {
                  var B = X[U];
                  xe($[B].source) && $.del(B);
                }
              })();
              var _ = Xe();
              return fe("tunnelWindows").set(_, {
                name: O,
                source: A,
                canary: L,
                sendMessage: V
              }), _;
            }({
              name: l,
              source: w,
              canary: y,
              sendMessage: m
            });
            return d(g, "postrobot_open_tunnel", {
              name: l,
              sendMessage: function() {
                var R = p.get(E);
                if (R && R.source && !xe(R.source)) {
                  try {
                    R.canary();
                  } catch {
                    return;
                  }
                  R.sendMessage.apply(this, arguments);
                }
              }
            }, {
              domain: "*"
            });
          };
        }({
          send: n
        }), function(c) {
          var d = c.on, h = c.send, l = c.receiveMessage;
          S.try(function() {
            var w = ie(window);
            if (w && ai({
              win: w
            })) {
              return ui(w), (y = w, Ye("remoteBridgeAwaiters").getOrSet(y, function() {
                return S.try(function() {
                  var m = fr(y, $n(C()));
                  if (m) return D(m) && Ot(J(m)) ? m : new S(function(p) {
                    var g, E;
                    g = setInterval(function() {
                      if (m && D(m) && Ot(J(m)))
                        return clearInterval(g), clearTimeout(E), p(m);
                    }, 100), E = setTimeout(function() {
                      return clearInterval(g), p();
                    }, 2e3);
                  });
                });
              })).then(function(m) {
                return m ? window.name ? Ot(J(m)).openTunnelToParent({
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
                      l({
                        data: p,
                        origin: this.origin,
                        source: this.source
                      }, {
                        on: d,
                        send: h
                      });
                    } catch (g) {
                      S.reject(g);
                    }
                  }
                }).then(function(p) {
                  var g = p.source, E = p.origin, R = p.data;
                  if (g !== w) throw new Error("Source does not match opener");
                  ci(g, E, R.sendMessage);
                }).catch(function(p) {
                  throw Vn(w, p), p;
                }) : Vn(w, new Error("Can not register with opener: window does not have a name")) : Vn(w, new Error("Can not register with opener: no bridge found in opener"));
              });
              var y;
            }
          });
        }({
          on: r,
          send: n,
          receiveMessage: i
        });
      }
      function Gn() {
        for (var e = fe("idToProxyWindow"), r = 0, n = e.keys(); r < n.length; r++) {
          var i = n[r];
          e.get(i).shouldClean() && e.del(i);
        }
      }
      function fi(e, r) {
        var n = r.send, i = r.id, a = i === void 0 ? Xe() : i, c = e.then(function(l) {
          if (D(l)) return J(l).name;
        }), d = e.then(function(l) {
          if (xe(l)) throw new Error("Window is closed, can not determine type");
          return ie(l) ? Ze.POPUP : Ze.IFRAME;
        });
        c.catch(ye), d.catch(ye);
        var h = function() {
          return e.then(function(l) {
            if (!xe(l)) return D(l) ? J(l).name : c;
          });
        };
        return {
          id: a,
          getType: function() {
            return d;
          },
          getInstanceID: Ma(function() {
            return e.then(function(l) {
              return ei(l, {
                send: n
              });
            });
          }),
          close: function() {
            return e.then(Do);
          },
          getName: h,
          focus: function() {
            return e.then(function(l) {
              l.focus();
            });
          },
          isClosed: function() {
            return e.then(function(l) {
              return xe(l);
            });
          },
          setLocation: function(l, w) {
            return w === void 0 && (w = {}), e.then(function(y) {
              var m = window.location.protocol + "//" + window.location.host, p = w.method, g = p === void 0 ? "get" : p, E = w.body;
              if (l.indexOf("/") === 0) l = "" + m + l;
              else if (!l.match(/^https?:\/\//) && l.indexOf(m) !== 0) throw new Error("Expected url to be http or https url, or absolute path, got " + JSON.stringify(l));
              if (g === "post") return h().then(function(R) {
                if (!R) throw new Error("Can not post to window without target name");
                (function(O) {
                  var A = O.url, L = O.target, V = O.body, _ = O.method, $ = _ === void 0 ? "post" : _, U = document.createElement("form");
                  if (U.setAttribute("target", L), U.setAttribute("method", $), U.setAttribute("action", A), U.style.display = "none", V) for (var X = 0, B = Object.keys(V); X < B.length; X++) {
                    var ce, ne = B[X], K = document.createElement("input");
                    K.setAttribute("name", ne), K.setAttribute("value", (ce = V[ne]) == null ? void 0 : ce.toString()), U.appendChild(K);
                  }
                  Mo().appendChild(U), U.submit(), Mo().removeChild(U);
                })({
                  url: l,
                  target: R,
                  method: g,
                  body: E
                });
              });
              if (g !== "get") throw new Error("Unsupported method: " + g);
              if (D(y)) try {
                if (y.location && typeof y.location.replace == "function") {
                  y.location.replace(l);
                  return;
                }
              } catch {
              }
              y.location = l;
            });
          },
          setName: function(l) {
            return e.then(function(w) {
              dn({
                win: w,
                name: l
              });
              var y = D(w), m = xo(w);
              if (!y) throw new Error("Can not set name for cross-domain window: " + l);
              J(w).name = l, m && m.setAttribute("name", l), c = S.resolve(l);
            });
          }
        };
      }
      var pt = function() {
        function e(n) {
          var i = n.send, a = n.win, c = n.serializedWindow;
          this.id = void 0, this.isProxyWindow = !0, this.serializedWindow = void 0, this.actualWindow = void 0, this.actualWindowPromise = void 0, this.send = void 0, this.name = void 0, this.actualWindowPromise = new S(), this.serializedWindow = c || fi(this.actualWindowPromise, {
            send: i
          }), fe("idToProxyWindow").set(this.getID(), this), a && this.setWindow(a, {
            send: i
          });
        }
        var r = e.prototype;
        return r.getID = function() {
          return this.serializedWindow.id;
        }, r.getType = function() {
          return this.serializedWindow.getType();
        }, r.isPopup = function() {
          return this.getType().then(function(n) {
            return n === Ze.POPUP;
          });
        }, r.setLocation = function(n, i) {
          var a = this;
          return this.serializedWindow.setLocation(n, i).then(function() {
            return a;
          });
        }, r.getName = function() {
          return this.serializedWindow.getName();
        }, r.setName = function(n) {
          var i = this;
          return this.serializedWindow.setName(n).then(function() {
            return i;
          });
        }, r.close = function() {
          var n = this;
          return this.serializedWindow.close().then(function() {
            return n;
          });
        }, r.focus = function() {
          var n = this, i = this.isPopup(), a = this.getName(), c = S.hash({
            isPopup: i,
            name: a
          }).then(function(h) {
            var l = h.name;
            h.isPopup && l && window.open("", l, "noopener");
          }), d = this.serializedWindow.focus();
          return S.all([c, d]).then(function() {
            return n;
          });
        }, r.isClosed = function() {
          return this.serializedWindow.isClosed();
        }, r.getWindow = function() {
          return this.actualWindow;
        }, r.setWindow = function(n, i) {
          var a = i.send;
          this.actualWindow = n, this.actualWindowPromise.resolve(this.actualWindow), this.serializedWindow = fi(this.actualWindowPromise, {
            send: a,
            id: this.getID()
          }), Ye("winToProxyWindow").set(n, this);
        }, r.awaitWindow = function() {
          return this.actualWindowPromise;
        }, r.matchWindow = function(n, i) {
          var a = this, c = i.send;
          return S.try(function() {
            return a.actualWindow ? n === a.actualWindow : S.hash({
              proxyInstanceID: a.getInstanceID(),
              knownWindowInstanceID: ei(n, {
                send: c
              })
            }).then(function(d) {
              var h = d.proxyInstanceID === d.knownWindowInstanceID;
              return h && a.setWindow(n, {
                send: c
              }), h;
            });
          });
        }, r.unwrap = function() {
          return this.actualWindow || this;
        }, r.getInstanceID = function() {
          return this.serializedWindow.getInstanceID();
        }, r.shouldClean = function() {
          return !!(this.actualWindow && xe(this.actualWindow));
        }, r.serialize = function() {
          return this.serializedWindow;
        }, e.unwrap = function(n) {
          return e.isProxyWindow(n) ? n.unwrap() : n;
        }, e.serialize = function(n, i) {
          var a = i.send;
          return Gn(), e.toProxyWindow(n, {
            send: a
          }).serialize();
        }, e.deserialize = function(n, i) {
          var a = i.send;
          return Gn(), fe("idToProxyWindow").get(n.id) || new e({
            serializedWindow: n,
            send: a
          });
        }, e.isProxyWindow = function(n) {
          return !!(n && !Xt(n) && n.isProxyWindow);
        }, e.toProxyWindow = function(n, i) {
          var a = i.send;
          if (Gn(), e.isProxyWindow(n)) return n;
          var c = n;
          return Ye("winToProxyWindow").get(c) || new e({
            win: c,
            send: a
          });
        }, e;
      }();
      function Jn(e, r, n, i, a) {
        var c = Ye("methodStore"), d = fe("proxyWindowMethods");
        pt.isProxyWindow(i) ? d.set(e, {
          val: r,
          name: n,
          domain: a,
          source: i
        }) : (d.del(e), c.getOrSet(i, function() {
          return {};
        })[e] = {
          domain: a,
          name: n,
          val: r,
          source: i
        });
      }
      function li(e, r) {
        var n = Ye("methodStore"), i = fe("proxyWindowMethods");
        return n.getOrSet(e, function() {
          return {};
        })[r] || i.get(r);
      }
      function hi(e, r, n, i, a) {
        d = (c = {
          on: a.on,
          send: a.send
        }).on, h = c.send, fe("builtinListeners").getOrSet("functionCalls", function() {
          return d("postrobot_method", {
            domain: "*"
          }, function(y) {
            var m = y.source, p = y.origin, g = y.data, E = g.id, R = g.name, O = li(m, E);
            if (!O) throw new Error("Could not find method '" + R + "' with id: " + g.id + " in " + C(window));
            var A = O.source, L = O.domain, V = O.val;
            return S.try(function() {
              if (!ft(L, p)) throw new Error("Method '" + g.name + "' domain " + JSON.stringify(Wn(O.domain) ? O.domain.source : O.domain) + " does not match origin " + p + " in " + C(window));
              if (pt.isProxyWindow(A)) return A.matchWindow(m, {
                send: h
              }).then(function(_) {
                if (!_) throw new Error("Method call '" + g.name + "' failed - proxy window does not match source in " + C(window));
              });
            }).then(function() {
              return V.apply({
                source: m,
                origin: p
              }, g.args);
            }, function(_) {
              return S.try(function() {
                if (V.onError) return V.onError(_);
              }).then(function() {
                throw _.stack && (_.stack = "Remote call to " + R + "(" + function($) {
                  return $ === void 0 && ($ = []), An($).map(function(U) {
                    return typeof U == "string" ? "'" + U + "'" : U === void 0 ? "undefined" : U === null ? "null" : typeof U == "boolean" ? U.toString() : Array.isArray(U) ? "[ ... ]" : typeof U == "object" ? "{ ... }" : typeof U == "function" ? "() => { ... }" : "<" + typeof U + ">";
                  }).join(", ");
                }(g.args) + `) failed

` + _.stack), _;
              });
            }).then(function(_) {
              return {
                result: _,
                id: E,
                name: R
              };
            });
          });
        });
        var c, d, h, l = n.__id__ || Xe();
        e = pt.unwrap(e);
        var w = n.__name__ || n.name || i;
        return typeof w == "string" && typeof w.indexOf == "function" && w.indexOf("anonymous::") === 0 && (w = w.replace("anonymous::", i + "::")), pt.isProxyWindow(e) ? (Jn(l, n, w, e, r), e.awaitWindow().then(function(y) {
          Jn(l, n, w, y, r);
        })) : Jn(l, n, w, e, r), kt("cross_domain_function", {
          id: l,
          name: w
        });
      }
      function pi(e, r, n, i) {
        var a, c = i.on, d = i.send;
        return function(h, l) {
          l === void 0 && (l = Ha);
          var w = JSON.stringify(h, function(y) {
            var m = this[y];
            if (qn(this)) return m;
            var p = ni(m);
            if (!p) return m;
            var g = l[p] || $a[p];
            return g ? g(m, y) : m;
          });
          return w === void 0 ? "undefined" : w;
        }(n, ((a = {}).promise = function(h, l) {
          return function(w, y, m, p, g) {
            return kt("cross_domain_zalgo_promise", {
              then: hi(w, y, function(E, R) {
                return m.then(E, R);
              }, p, {
                on: g.on,
                send: g.send
              })
            });
          }(e, r, h, l, {
            on: c,
            send: d
          });
        }, a.function = function(h, l) {
          return hi(e, r, h, l, {
            on: c,
            send: d
          });
        }, a.object = function(h) {
          return Xt(h) || pt.isProxyWindow(h) ? kt("cross_domain_window", pt.serialize(h, {
            send: d
          })) : h;
        }, a));
      }
      function vi(e, r, n, i) {
        var a, c = i.send;
        return function(d, h) {
          if (h === void 0 && (h = Ga), d !== "undefined") return JSON.parse(d, function(l, w) {
            if (qn(this)) return w;
            var y, m;
            if (qn(w) ? (y = w.__type__, m = w.__val__) : (y = ni(w), m = w), !y) return m;
            var p = h[y] || Va[y];
            return p ? p(m, l) : m;
          });
        }(n, ((a = {}).cross_domain_zalgo_promise = function(d) {
          return function(h, l, w) {
            return new S(w.then);
          }(0, 0, d);
        }, a.cross_domain_function = function(d) {
          return function(h, l, w, y) {
            var m = w.id, p = w.name, g = y.send, E = function(O) {
              O === void 0 && (O = {});
              function A() {
                var L = arguments;
                return pt.toProxyWindow(h, {
                  send: g
                }).awaitWindow().then(function(V) {
                  var _ = li(V, m);
                  if (_ && _.val !== A) return _.val.apply({
                    source: window,
                    origin: C()
                  }, L);
                  var $ = [].slice.call(L);
                  return O.fireAndForget ? g(V, "postrobot_method", {
                    id: m,
                    name: p,
                    args: $
                  }, {
                    domain: l,
                    fireAndForget: !0
                  }) : g(V, "postrobot_method", {
                    id: m,
                    name: p,
                    args: $
                  }, {
                    domain: l,
                    fireAndForget: !1
                  }).then(function(U) {
                    return U.data.result;
                  });
                }).catch(function(V) {
                  throw V;
                });
              }
              return A.__name__ = p, A.__origin__ = l, A.__source__ = h, A.__id__ = m, A.origin = l, A;
            }, R = E();
            return R.fireAndForget = E({
              fireAndForget: !0
            }), R;
          }(e, r, d, {
            send: c
          });
        }, a.cross_domain_window = function(d) {
          return pt.deserialize(d, {
            send: c
          });
        }, a));
      }
      var Wr = {};
      Wr.postrobot_post_message = function(e, r, n) {
        n.indexOf("file:") === 0 && (n = "*"), e.postMessage(r, n);
      }, Wr.postrobot_bridge = function(e, r, n) {
        if (!Bn() && !si()) throw new Error("Bridge not needed for browser");
        if (D(e)) throw new Error("Post message through bridge disabled between same domain windows");
        if (Zr(window, e) !== !1) throw new Error("Can only use bridge to communicate between two different windows, not between frames");
        (function(i, a, c) {
          var d = Dr(window, i), h = Dr(i, window);
          if (!d && !h) throw new Error("Can only send messages to and from parent and popup windows");
          Hn(i).then(function(l) {
            return l(i, a, c);
          });
        })(e, n, r);
      }, Wr.postrobot_global = function(e, r) {
        if (!dr(window).match(/MSIE|rv:11|trident|edge\/12|edge\/13/i)) throw new Error("Global messaging not needed for browser");
        if (!D(e)) throw new Error("Post message through global disabled between different domain windows");
        if (Zr(window, e) !== !1) throw new Error("Can only use global to communicate between two different windows, not between frames");
        var n = Ot(e);
        if (!n) throw new Error("Can not find postRobot global on foreign window");
        n.receiveMessage({
          source: window,
          origin: C(),
          data: r
        });
      };
      function Kn(e, r, n, i) {
        var a = i.on, c = i.send;
        return S.try(function() {
          var d = Ye().getOrSet(e, function() {
            return {};
          });
          return d.buffer = d.buffer || [], d.buffer.push(n), d.flush = d.flush || S.flush().then(function() {
            if (xe(e)) throw new Error("Window is closed");
            var h = pi(e, r, ((l = {}).__post_robot_11_0_0__ = d.buffer || [], l), {
              on: a,
              send: c
            }), l;
            delete d.buffer;
            for (var w = Object.keys(Wr), y = [], m = 0; m < w.length; m++) {
              var p = w[m];
              try {
                Wr[p](e, h, r);
              } catch (g) {
                y.push(g);
              }
            }
            if (y.length === w.length) throw new Error(`All post-robot messaging strategies failed:

` + y.map(function(g, E) {
              return E + ". " + hr(g);
            }).join(`

`));
          }), d.flush.then(function() {
            delete d.flush;
          });
        }).then(ye);
      }
      function wi(e) {
        return fe("responseListeners").get(e);
      }
      function mi(e) {
        fe("responseListeners").del(e);
      }
      function gi(e) {
        return fe("erroredResponseListeners").has(e);
      }
      function yi(e) {
        var r = e.name, n = e.win, i = e.domain, a = Ye("requestListeners");
        if (n === "*" && (n = null), i === "*" && (i = null), !r) throw new Error("Name required to get request listener");
        for (var c = 0, d = [n, cn()]; c < d.length; c++) {
          var h = d[c];
          if (h) {
            var l = a.get(h);
            if (l) {
              var w = l[r];
              if (w) {
                if (i && typeof i == "string") {
                  if (w[i]) return w[i];
                  if (w.__domain_regex__) for (var y = 0, m = w.__domain_regex__; y < m.length; y++) {
                    var p = m[y], g = p.listener;
                    if (ft(p.regex, i)) return g;
                  }
                }
                if (w["*"]) return w["*"];
              }
            }
          }
        }
      }
      function Yn(e, r) {
        var n = r.on, i = r.send, a = fe("receivedMessages");
        try {
          if (!window || window.closed || !e.source) return;
        } catch {
          return;
        }
        var c = e.source, d = e.origin, h = function(m, p, g, E) {
          var R = E.on, O = E.send, A;
          try {
            A = vi(p, g, m, {
              on: R,
              send: O
            });
          } catch {
            return;
          }
          if (A && typeof A == "object" && A !== null) {
            var L = A.__post_robot_11_0_0__;
            if (Array.isArray(L)) return L;
          }
        }(e.data, c, d, {
          on: n,
          send: i
        });
        if (h) {
          ri(c);
          for (var l, w = function() {
            var m = h[y];
            if (a.has(m.id)) return {
              v: void 0
            };
            if (a.set(m.id, !0), xe(c) && !m.fireAndForget) return {
              v: void 0
            };
            m.origin.indexOf("file:") === 0 && (d = "file://");
            try {
              m.type === "postrobot_message_request" ? function(p, g, E, R) {
                var O = R.on, A = R.send, L = yi({
                  name: E.name,
                  win: p,
                  domain: g
                }), V = E.name === "postrobot_method" && E.data && typeof E.data.name == "string" ? E.data.name + "()" : E.name;
                function _($, U, X) {
                  return S.flush().then(function() {
                    if (!E.fireAndForget && !xe(p)) try {
                      return Kn(p, g, {
                        id: Xe(),
                        origin: C(window),
                        type: "postrobot_message_response",
                        hash: E.hash,
                        name: E.name,
                        ack: $,
                        data: U,
                        error: X
                      }, {
                        on: O,
                        send: A
                      });
                    } catch (B) {
                      throw new Error("Send response message failed for " + V + " in " + C() + `

` + hr(B));
                    }
                  });
                }
                S.all([S.flush().then(function() {
                  if (!E.fireAndForget && !xe(p)) try {
                    return Kn(p, g, {
                      id: Xe(),
                      origin: C(window),
                      type: "postrobot_message_ack",
                      hash: E.hash,
                      name: E.name
                    }, {
                      on: O,
                      send: A
                    });
                  } catch ($) {
                    throw new Error("Send ack message failed for " + V + " in " + C() + `

` + hr($));
                  }
                }), S.try(function() {
                  if (!L) throw new Error("No handler found for post message: " + E.name + " from " + g + " in " + window.location.protocol + "//" + window.location.host + window.location.pathname);
                  return L.handler({
                    source: p,
                    origin: g,
                    data: E.data
                  });
                }).then(function($) {
                  return _("success", $);
                }, function($) {
                  return _("error", null, $);
                })]).then(ye).catch(function($) {
                  if (L && L.handleError) return L.handleError($);
                  throw $;
                });
              }(c, d, m, {
                on: n,
                send: i
              }) : m.type === "postrobot_message_response" ? function(p, g, E) {
                if (!gi(E.hash)) {
                  var R = wi(E.hash);
                  if (!R) throw new Error("No handler found for post message response for message: " + E.name + " from " + g + " in " + window.location.protocol + "//" + window.location.host + window.location.pathname);
                  if (!ft(R.domain, g)) throw new Error("Response origin " + g + " does not match domain " + (O = R.domain, Array.isArray(O) ? "(" + O.join(" | ") + ")" : yt(O) ? "RegExp(" + O.toString() + ")" : O.toString()));
                  var O;
                  if (p !== R.win) throw new Error("Response source does not match registered window");
                  mi(E.hash), E.ack === "error" ? R.promise.reject(E.error) : E.ack === "success" && R.promise.resolve({
                    source: p,
                    origin: g,
                    data: E.data
                  });
                }
              }(c, d, m) : m.type === "postrobot_message_ack" && function(p, g, E) {
                if (!gi(E.hash)) {
                  var R = wi(E.hash);
                  if (!R) throw new Error("No handler found for post message ack for message: " + E.name + " from " + g + " in " + window.location.protocol + "//" + window.location.host + window.location.pathname);
                  try {
                    if (!ft(R.domain, g)) throw new Error("Ack origin " + g + " does not match domain " + R.domain.toString());
                    if (p !== R.win) throw new Error("Ack source does not match registered window");
                  } catch (O) {
                    R.promise.reject(O);
                  }
                  R.ack = !0;
                }
              }(c, d, m);
            } catch (p) {
              setTimeout(function() {
                throw p;
              }, 0);
            }
          }, y = 0; y < h.length; y++) if (l = w()) return l.v;
        }
      }
      function Ct(e, r, n) {
        if (!e) throw new Error("Expected name");
        if (typeof (r = r || {}) == "function" && (n = r, r = {}), !n) throw new Error("Expected handler");
        var i = function a(c, d) {
          var h = c.name, l = c.win, w = c.domain, y = Ye("requestListeners");
          if (!h || typeof h != "string") throw new Error("Name required to add request listener");
          if (l && l !== "*" && pt.isProxyWindow(l)) {
            var m = l.awaitWindow().then(function(ce) {
              return a({
                name: h,
                win: ce,
                domain: w
              }, d);
            });
            return {
              cancel: function() {
                m.then(function(ce) {
                  return ce.cancel();
                }, ye);
              }
            };
          }
          var p = l;
          if (Array.isArray(p)) {
            for (var g = [], E = 0, R = p; E < R.length; E++) g.push(a({
              name: h,
              domain: w,
              win: R[E]
            }, d));
            return {
              cancel: function() {
                for (var ce = 0; ce < g.length; ce++) g[ce].cancel();
              }
            };
          }
          if (Array.isArray(w)) {
            for (var O = [], A = 0, L = w; A < L.length; A++) O.push(a({
              name: h,
              win: p,
              domain: L[A]
            }, d));
            return {
              cancel: function() {
                for (var ce = 0; ce < O.length; ce++) O[ce].cancel();
              }
            };
          }
          var V = yi({
            name: h,
            win: p,
            domain: w
          });
          p && p !== "*" || (p = cn());
          var _ = (w = w || "*").toString();
          if (V) throw p && w ? new Error("Request listener already exists for " + h + " on domain " + w.toString() + " for " + (p === cn() ? "wildcard" : "specified") + " window") : p ? new Error("Request listener already exists for " + h + " for " + (p === cn() ? "wildcard" : "specified") + " window") : w ? new Error("Request listener already exists for " + h + " on domain " + w.toString()) : new Error("Request listener already exists for " + h);
          var $ = y.getOrSet(p, function() {
            return {};
          }), U = Ar($, h, function() {
            return {};
          }), X, B;
          return Wn(w) ? (X = Ar(U, "__domain_regex__", function() {
            return [];
          })).push(B = {
            regex: w,
            listener: d
          }) : U[_] = d, {
            cancel: function() {
              delete U[_], B && (X.splice(X.indexOf(B, 1)), X.length || delete U.__domain_regex__), Object.keys(U).length || delete $[h], p && !Object.keys($).length && y.del(p);
            }
          };
        }({
          name: e,
          win: r.window,
          domain: r.domain || "*"
        }, {
          handler: n || r.handler,
          handleError: r.errorHandler || function(a) {
            throw a;
          }
        });
        return {
          cancel: function() {
            i.cancel();
          }
        };
      }
      var Pt = function e(r, n, i, a) {
        var c = (a = a || {}).domain || "*", d = a.timeout || -1, h = a.timeout || 5e3, l = a.fireAndForget || !1;
        return pt.toProxyWindow(r, {
          send: e
        }).awaitWindow().then(function(w) {
          return S.try(function() {
            if (function(y, m, p) {
              if (!y) throw new Error("Expected name");
              if (p && typeof p != "string" && !Array.isArray(p) && !Wn(p)) throw new TypeError("Can not send " + y + ". Expected domain " + JSON.stringify(p) + " to be a string, array, or regex");
              if (xe(m)) throw new Error("Can not send " + y + ". Target window is closed");
            }(n, w, c), function(y, m) {
              var p = Qt(m);
              if (p) return p === y;
              if (m === y || Ke(m) === m) return !1;
              for (var g = 0, E = et(y); g < E.length; g++) if (E[g] === m) return !0;
              return !1;
            }(window, w)) return ti(w, h);
          }).then(function(y) {
            return function(m, p, g, E) {
              var R = E.send;
              return S.try(function() {
                return typeof p == "string" ? p : S.try(function() {
                  return g || jn(m, {
                    send: R
                  }).then(function(O) {
                    return O.domain;
                  });
                }).then(function(O) {
                  if (!ft(p, p)) throw new Error("Domain " + tn(p) + " does not match " + tn(p));
                  return O;
                });
              });
            }(w, c, (y === void 0 ? {} : y).domain, {
              send: e
            });
          }).then(function(y) {
            var m = y, p = n === "postrobot_method" && i && typeof i.name == "string" ? i.name + "()" : n, g = new S(), E = n + "_" + Xe();
            if (!l) {
              var R = {
                name: n,
                win: w,
                domain: m,
                promise: g
              };
              (function(U, X) {
                fe("responseListeners").set(U, X);
              })(E, R);
              var O = Ye("requestPromises").getOrSet(w, function() {
                return [];
              });
              O.push(g), g.catch(function() {
                (function(U) {
                  fe("erroredResponseListeners").set(U, !0);
                })(E), mi(E);
              });
              var A = function(U) {
                return Ye("knownWindows").get(U, !1);
              }(w) ? 1e4 : 2e3, L = d, V = A, _ = L, $ = Ir(function() {
                return xe(w) ? g.reject(new Error("Window closed for " + n + " before " + (R.ack ? "response" : "ack"))) : R.cancelled ? g.reject(new Error("Response listener was cancelled for " + n)) : (V = Math.max(V - 500, 0), _ !== -1 && (_ = Math.max(_ - 500, 0)), R.ack || V !== 0 ? _ === 0 ? g.reject(new Error("No response for postMessage " + p + " in " + C() + " in " + L + "ms")) : void 0 : g.reject(new Error("No ack for postMessage " + p + " in " + C() + " in " + A + "ms")));
              }, 500);
              g.finally(function() {
                $.cancel(), O.splice(O.indexOf(g, 1));
              }).catch(ye);
            }
            return Kn(w, m, {
              id: Xe(),
              origin: C(window),
              type: "postrobot_message_request",
              hash: E,
              name: n,
              data: i,
              fireAndForget: l
            }, {
              on: Ct,
              send: e
            }).then(function() {
              return l ? g.resolve() : g;
            }, function(U) {
              throw new Error("Send request message failed for " + p + " in " + C() + `

` + hr(U));
            });
          });
        });
      };
      function Mr(e) {
        return pt.toProxyWindow(e, {
          send: Pt
        });
      }
      function Ei(e) {
        for (var r = 0, n = Ye("requestPromises").get(e, []); r < n.length; r++) n[r].reject(new Error("Window " + (xe(e) ? "closed" : "cleaned up") + " before response")).catch(ye);
      }
      var Ut;
      Ut = {
        setupBridge: di,
        openBridge: function(e, r) {
          var n = fe("bridges"), i = fe("bridgeFrames");
          return r = r || Nt(e), n.getOrSet(r, function() {
            return S.try(function() {
              if (C() === r) throw new Error("Can not open bridge on the same domain as current domain: " + r);
              var a = $n(r);
              if (fr(window, a)) throw new Error("Frame with name " + a + " already exists on page");
              var c = function(d, h) {
                var l = document.createElement("iframe");
                return l.setAttribute("name", d), l.setAttribute("id", d), l.setAttribute("style", "display: none; margin: 0; padding: 0; border: 0px none; overflow: hidden;"), l.setAttribute("frameborder", "0"), l.setAttribute("border", "0"), l.setAttribute("scrolling", "no"), l.setAttribute("allowTransparency", "true"), l.setAttribute("tabindex", "-1"), l.setAttribute("hidden", "true"), l.setAttribute("title", ""), l.setAttribute("role", "presentation"), l.src = h, l;
              }(a, e);
              return i.set(r, c), Ja.then(function(d) {
                d.appendChild(c);
                var h = c.contentWindow;
                return new S(function(l, w) {
                  c.addEventListener("load", l), c.addEventListener("error", w);
                }).then(function() {
                  return ti(h, 5e3, "Bridge " + e);
                }).then(function() {
                  return h;
                });
              });
            });
          });
        },
        linkWindow: dn,
        linkUrl: function(e, r) {
          dn({
            win: e,
            domain: Nt(r)
          });
        },
        isBridge: si,
        needsBridge: ai,
        needsBridgeForBrowser: Bn,
        hasBridge: function(e, r) {
          return fe("bridges").has(r || Nt(e));
        },
        needsBridgeForWin: oi,
        needsBridgeForDomain: ii,
        destroyBridges: function() {
          for (var e = fe("bridges"), r = fe("bridgeFrames"), n = 0, i = r.keys(); n < i.length; n++) {
            var a = r.get(i[n]);
            a && a.parentNode && a.parentNode.removeChild(a);
          }
          r.reset(), e.reset();
        }
      };
      function Fr(e) {
        if (!D(e)) throw new Error("Can not get global for window on different domain");
        return e.__zoid_10_3_3__ || (e.__zoid_10_3_3__ = {}), e.__zoid_10_3_3__;
      }
      function bi(e, r) {
        try {
          return r(Fr(e));
        } catch {
        }
      }
      function fn(e) {
        return {
          get: function() {
            var r = this;
            return S.try(function() {
              if (r.source && r.source !== window) throw new Error("Can not call get on proxy object from a remote window");
              return e;
            });
          }
        };
      }
      function Ka(e) {
        return Nn(JSON.stringify(e));
      }
      function Zn(e) {
        var r = Fr(e);
        return r.references = r.references || {}, r.references;
      }
      function Pi(e) {
        var r = e.data, n = e.metaData, i = e.sender, a = e.receiver, c = e.passByReference, d = c !== void 0 && c, h = e.basic, l = h !== void 0 && h, w = Mr(a.win), y = l ? JSON.stringify(r) : pi(w, a.domain, r, {
          on: Ct,
          send: Pt
        }), m = d ? function(p) {
          var g = Xe();
          return Zn(window)[g] = p, {
            type: "uid",
            uid: g
          };
        }(y) : {
          type: "raw",
          val: y
        };
        return {
          serializedData: Ka({
            sender: {
              domain: i.domain
            },
            metaData: n,
            reference: m
          }),
          cleanReference: function() {
            p = window, (g = m).type === "uid" && delete Zn(p)[g.uid];
            var p, g;
          }
        };
      }
      function Ti(e) {
        var r = e.sender, n = e.basic, i = n !== void 0 && n, a = function(y) {
          return JSON.parse(function(m) {
            if (typeof atob == "function") return decodeURIComponent([].map.call(atob(m), function(p) {
              return "%" + ("00" + p.charCodeAt(0).toString(16)).slice(-2);
            }).join(""));
            if (typeof Buffer < "u") return Buffer.from(m, "base64").toString("utf8");
            throw new Error("Can not find window.atob or Buffer");
          }(y));
        }(e.data), c = a.reference, d = a.metaData, h;
        h = typeof r.win == "function" ? r.win({
          metaData: d
        }) : r.win;
        var l;
        l = typeof r.domain == "function" ? r.domain({
          metaData: d
        }) : typeof r.domain == "string" ? r.domain : a.sender.domain;
        var w = function(y, m) {
          if (m.type === "raw") return m.val;
          if (m.type === "uid") return Zn(y)[m.uid];
          throw new Error("Unsupported ref type: " + m.type);
        }(h, c);
        return {
          data: i ? JSON.parse(w) : function(y, m, p) {
            return vi(y, m, p, {
              on: Ct,
              send: Pt
            });
          }(h, l, w),
          metaData: d,
          sender: {
            win: h,
            domain: l
          },
          reference: c
        };
      }
      var ve = {
        STRING: "string",
        OBJECT: "object",
        FUNCTION: "function",
        BOOLEAN: "boolean",
        NUMBER: "number",
        ARRAY: "array"
      }, ln = {
        JSON: "json",
        DOTIFY: "dotify",
        BASE64: "base64"
      }, Se = Ze, Ee = {
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
      function Ri(e) {
        return "__zoid__" + e.name + "__" + e.serializedPayload + "__";
      }
      function Qn(e) {
        if (!e) throw new Error("No window name");
        var r = e.split("__"), n = r[1], i = r[2], a = r[3];
        if (n !== "zoid") throw new Error("Window not rendered by zoid - got " + n);
        if (!i) throw new Error("Expected component name");
        if (!a) throw new Error("Expected serialized payload ref");
        return {
          name: i,
          serializedInitialPayload: a
        };
      }
      var Ya = zt(function(e) {
        var r = Ti({
          data: Qn(e).serializedInitialPayload,
          sender: {
            win: function(n) {
              return function(i) {
                if (i.type === "opener") return on("opener", ie(window));
                if (i.type === "parent" && typeof i.distance == "number") return on("parent", function(m, p) {
                  return p === void 0 && (p = 1), function(g, E) {
                    E === void 0 && (E = 1);
                    for (var R = g, O = 0; O < E; O++) {
                      if (!R) return;
                      R = rt(R);
                    }
                    return R;
                  }(m, lr(m) - p);
                }(window, i.distance));
                if (i.type === "global" && i.uid && typeof i.uid == "string") {
                  var a = i.uid, c = Qt(window);
                  if (!c) throw new Error("Can not find ancestor window");
                  for (var d = 0, h = Re(c); d < h.length; d++) {
                    var l = h[d];
                    if (D(l)) {
                      var w = bi(l, function(m) {
                        return m.windows && m.windows[a];
                      });
                      if (w) return w;
                    }
                  }
                } else if (i.type === "name") {
                  var y = i.name;
                  return on("namedWindow", function(m, p) {
                    return fr(m, p) || function g(E, R) {
                      var O = fr(E, R);
                      if (O) return O;
                      for (var A = 0, L = et(E); A < L.length; A++) {
                        var V = g(L[A], R);
                        if (V) return V;
                      }
                    }(Ke(m) || m, p);
                  }(on("ancestor", Qt(window)), y));
                }
                throw new Error("Unable to find " + i.type + " parent component window");
              }(n.metaData.windowRef);
            }
          }
        });
        return {
          parent: r.sender,
          payload: r.data,
          reference: r.reference
        };
      });
      function Si() {
        return Ya(window.name);
      }
      function Za(e, r) {
        if (r === void 0 && (r = window), e === rt(r)) return {
          type: "parent",
          distance: lr(e)
        };
        if (e === ie(r)) return {
          type: "opener"
        };
        if (D(e) && (i = e, i !== Ke(i))) {
          var n = J(e).name;
          if (n) return {
            type: "name",
            name: n
          };
        }
        var i;
      }
      function Oi(e, r, n, i, a) {
        if (!e.hasOwnProperty(n)) return i;
        var c = e[n];
        return typeof c.childDecorate == "function" ? c.childDecorate({
          value: i,
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
        }) : i;
      }
      function Qa() {
        return S.try(function() {
          window.focus();
        });
      }
      function xi() {
        return S.try(function() {
          window.close();
        });
      }
      var It = function() {
        return ye;
      }, er = function(e) {
        return en(e.value);
      };
      function Xn(e, r, n) {
        for (var i = 0, a = Object.keys(P({}, e, r)); i < a.length; i++) {
          var c = a[i];
          n(c, r[c], e[c]);
        }
      }
      function Di(e, r, n) {
        var i = {};
        return S.all(function(a, c, d) {
          var h = [];
          return Xn(a, c, function(l, w, y) {
            var m = function(p, g, E) {
              return S.resolve().then(function() {
                var R, O;
                if (E != null && g) {
                  var A = (R = {}, R.get = g.queryParam, R.post = g.bodyParam, R)[n], L = (O = {}, O.get = g.queryValue, O.post = g.bodyValue, O)[n];
                  if (A) return S.hash({
                    finalParam: S.try(function() {
                      return typeof A == "function" ? A({
                        value: E
                      }) : typeof A == "string" ? A : p;
                    }),
                    finalValue: S.try(function() {
                      return typeof L == "function" && Lt(E) ? L({
                        value: E
                      }) : E;
                    })
                  }).then(function(V) {
                    var _ = V.finalParam, $ = V.finalValue, U;
                    if (typeof $ == "boolean") U = $.toString();
                    else if (typeof $ == "string") U = $.toString();
                    else if (typeof $ == "object" && $ !== null) {
                      if (g.serialization === ln.JSON) U = JSON.stringify($);
                      else if (g.serialization === ln.BASE64) U = Nn(JSON.stringify($));
                      else if (g.serialization === ln.DOTIFY || !g.serialization) {
                        U = function ne(K, H, ue) {
                          H === void 0 && (H = ""), ue === void 0 && (ue = {}), H = H && H + ".";
                          for (var k in K) K.hasOwnProperty(k) && K[k] != null && typeof K[k] != "function" && (K[k] && Array.isArray(K[k]) && K[k].length && K[k].every(function(Oe) {
                            return typeof Oe != "object";
                          }) ? ue["" + H + k + "[]"] = K[k].join(",") : K[k] && typeof K[k] == "object" ? ue = ne(K[k], "" + H + k, ue) : ue["" + H + k] = K[k].toString());
                          return ue;
                        }($, p);
                        for (var X = 0, B = Object.keys(U); X < B.length; X++) {
                          var ce = B[X];
                          i[ce] = U[ce];
                        }
                        return;
                      }
                    } else typeof $ == "number" && (U = $.toString());
                    i[_] = U;
                  });
                }
              });
            }(l, w, y);
            h.push(m);
          }), h;
        }(r, e)).then(function() {
          return i;
        });
      }
      function Ni(e) {
        var r = e.uid, n = e.options, i = e.overrides, a = i === void 0 ? {} : i, c = e.parentWin, d = c === void 0 ? window : c, h = n.propsDef, l = n.containerTemplate, w = n.prerenderTemplate, y = n.tag, m = n.name, p = n.attributes, g = n.dimensions, E = n.autoResize, R = n.url, O = n.domain, A = n.exports, L = new S(), V = [], _ = nn(), $ = {}, U = {}, X = {
          visible: !0
        }, B = a.event ? a.event : (ce = {}, ne = {}, K = {
          on: function(x, N) {
            var q = ne[x] = ne[x] || [];
            q.push(N);
            var j = !1;
            return {
              cancel: function() {
                j || (j = !0, q.splice(q.indexOf(N), 1));
              }
            };
          },
          once: function(x, N) {
            var q = K.on(x, function() {
              q.cancel(), N();
            });
            return q;
          },
          trigger: function(x) {
            for (var N = arguments.length, q = new Array(N > 1 ? N - 1 : 0), j = 1; j < N; j++) q[j - 1] = arguments[j];
            var te = ne[x], Y = [];
            if (te)
              for (var me = function() {
                var Le = te[ge];
                Y.push(S.try(function() {
                  return Le.apply(void 0, q);
                }));
              }, ge = 0; ge < te.length; ge++) me();
            return S.all(Y).then(ye);
          },
          triggerOnce: function(x) {
            if (ce[x]) return S.resolve();
            ce[x] = !0;
            for (var N = arguments.length, q = new Array(N > 1 ? N - 1 : 0), j = 1; j < N; j++) q[j - 1] = arguments[j];
            return K.trigger.apply(K, [x].concat(q));
          },
          reset: function() {
            ne = {};
          }
        }), ce, ne, K, H = a.props ? a.props : {}, ue, k, Oe, xt, vt, jt = !1, qt = a.onError, At = a.getProxyContainer, Bt = a.show, $t = a.hide, tr = a.close, Ht = a.renderContainer, Tt = a.getProxyWindow, rr = a.setProxyWin, Vt = a.openFrame, Gt = a.openPrerenderFrame, nr = a.prerender, or = a.open, oe = a.openPrerender, wt = a.watchForUnload, se = a.getInternalState, Fe = a.setInternalState, De = function() {
          return typeof g == "function" ? g({
            props: H
          }) : g;
        }, ze = function() {
          return S.try(function() {
            return a.resolveInitPromise ? a.resolveInitPromise() : L.resolve();
          });
        }, Te = function(x) {
          return S.try(function() {
            return a.rejectInitPromise ? a.rejectInitPromise(x) : L.reject(x);
          });
        }, ke = function(x) {
          for (var N = {}, q = 0, j = Object.keys(H); q < j.length; q++) {
            var te = j[q], Y = h[te];
            if (!Y || Y.sendToChild !== !1) {
              var me = Y && Y.trustedDomains && Y.trustedDomains.length > 0 ? Y.trustedDomains.reduce(function(ge, Le) {
                return ge || ft(Le, x);
              }, !1) : ft(x, C(window));
              Y && Y.sameDomain && !me || Y && Y.trustedDomains && !me || (N[te] = H[te]);
            }
          }
          return S.hash(N);
        }, _e = function() {
          return S.try(function() {
            return se ? se() : X;
          });
        }, We = function(x) {
          return S.try(function() {
            return Fe ? Fe(x) : X = P({}, X, x);
          });
        }, mt = function() {
          return Tt ? Tt() : S.try(function() {
            var x = H.window;
            if (x) {
              var N = Mr(x);
              return _.register(function() {
                return x.close();
              }), N;
            }
            return new pt({
              send: Pt
            });
          });
        }, nt = function(x) {
          return rr ? rr(x) : S.try(function() {
            ue = x;
          });
        }, Rt = function() {
          return Bt ? Bt() : S.hash({
            setState: We({
              visible: !0
            }),
            showElement: k ? k.get().then(Ua) : null
          }).then(ye);
        }, _t = function() {
          return $t ? $t() : S.hash({
            setState: We({
              visible: !1
            }),
            showElement: k ? k.get().then(Ho) : null
          }).then(ye);
        }, wr = function() {
          return typeof R == "function" ? R({
            props: H
          }) : R;
        }, mr = function() {
          return typeof p == "function" ? p({
            props: H
          }) : p;
        }, ir = function() {
          return Nt(wr());
        }, ot = function(x, N) {
          var q = N.windowName;
          return Vt ? Vt(x, {
            windowName: q
          }) : S.try(function() {
            if (x === Se.IFRAME) return fn(Bo({
              attributes: P({
                name: q,
                title: m
              }, mr().iframe)
            }));
          });
        }, zr = function(x) {
          return Gt ? Gt(x) : S.try(function() {
            if (x === Se.IFRAME) return fn(Bo({
              attributes: P({
                name: "__zoid_prerender_frame__" + m + "_" + Xe() + "__",
                title: "prerender__" + m
              }, mr().iframe)
            }));
          });
        }, Lr = function(x, N, q) {
          return oe ? oe(x, N, q) : S.try(function() {
            if (x === Se.IFRAME) {
              if (!q) throw new Error("Expected proxy frame to be passed");
              return q.get().then(function(j) {
                return _.register(function() {
                  return _r(j);
                }), zn(j).then(function(te) {
                  return J(te);
                }).then(function(te) {
                  return Mr(te);
                });
              });
            }
            if (x === Se.POPUP) return N;
            throw new Error("No render context available for " + x);
          });
        }, gr = function() {
          return S.try(function() {
            if (ue) return S.all([B.trigger(Ee.FOCUS), ue.focus()]).then(ye);
          });
        }, hn = function() {
          var x = Fr(window);
          return x.windows = x.windows || {}, x.windows[r] = window, _.register(function() {
            delete x.windows[r];
          }), r;
        }, Ur = function(x, N, q, j) {
          if (N === C(window)) return {
            type: "global",
            uid: hn()
          };
          if (x !== window) throw new Error("Can not construct cross-domain window reference for different target window");
          if (H.window) {
            var te = j.getWindow();
            if (!te) throw new Error("Can not construct cross-domain window reference for lazy window prop");
            if (Qt(te) !== window) throw new Error("Can not construct cross-domain window reference for window prop with different ancestor");
          }
          if (q === Se.POPUP) return {
            type: "opener"
          };
          if (q === Se.IFRAME) return {
            type: "parent",
            distance: lr(window)
          };
          throw new Error("Can not construct window reference for child");
        }, pn = function(x, N) {
          return S.try(function() {
            var q;
            xt = x, Oe = N, (q = ue) == null || q.isPopup().then(function(j) {
              if ((N == null ? void 0 : N.name) !== "" && j) {
                var te;
                (te = ue) == null || te.setName(N == null ? void 0 : N.name);
              }
            }).finally(function() {
              ze(), _.register(function() {
                return N.close.fireAndForget().catch(ye);
              });
            });
          });
        }, jr = function(x) {
          var N = x.width, q = x.height;
          return S.try(function() {
            B.trigger(Ee.RESIZE, {
              width: N,
              height: q
            });
          });
        }, qr = function(x) {
          return S.try(function() {
            return B.trigger(Ee.DESTROY);
          }).catch(ye).then(function() {
            return _.all(x);
          }).then(function() {
            var N = x || new Error("Component destroyed");
            vt && vr(vt) || N.message === "Window navigated away" ? L.resolve() : L.asyncReject(N);
          });
        }, Wt = zt(function(x) {
          return S.try(function() {
            return tr ? xe(tr.__source__) ? void 0 : tr() : S.try(function() {
              return B.trigger(Ee.CLOSE);
            }).then(function() {
              return qr(x || new Error("Component closed"));
            });
          });
        }), Ai = function(x, N) {
          var q = N.proxyWin, j = N.proxyFrame, te = N.windowName;
          return or ? or(x, {
            proxyWin: q,
            proxyFrame: j,
            windowName: te
          }) : S.try(function() {
            if (x === Se.IFRAME) {
              if (!j) throw new Error("Expected proxy frame to be passed");
              return j.get().then(function(Ne) {
                return zn(Ne).then(function(le) {
                  return _.register(function() {
                    return _r(Ne);
                  }), _.register(function() {
                    return Ei(le);
                  }), le;
                });
              });
            }
            if (x === Se.POPUP) {
              var Y = De(), me = Y.width, ge = me === void 0 ? "300px" : me, Le = Y.height, be = Le === void 0 ? "150px" : Le;
              ge = Zo(ge, window.outerWidth), be = Zo(be, window.outerWidth);
              var Me = function(Ne, le) {
                var Ce = (le = le || {}).closeOnUnload, Pe = Ce === void 0 ? 1 : Ce, it = le.name, Ue = it === void 0 ? "" : it, de = le.width, je = le.height, tt = 0, Ve = 0;
                de && (window.outerWidth ? Ve = Math.round((window.outerWidth - de) / 2) + window.screenX : window.screen.width && (Ve = Math.round((window.screen.width - de) / 2))), je && (window.outerHeight ? tt = Math.round((window.outerHeight - je) / 2) + window.screenY : window.screen.height && (tt = Math.round((window.screen.height - je) / 2))), delete le.closeOnUnload, delete le.name, de && je && (le = P({
                  top: tt,
                  left: Ve,
                  width: de,
                  height: je,
                  status: 1,
                  toolbar: 0,
                  menubar: 0,
                  resizable: 1,
                  scrollbars: 1
                }, le));
                var ar = Object.keys(le).map(function(Dt) {
                  if (le[Dt] != null) return Dt + "=" + tn(le[Dt]);
                }).filter(Boolean).join(","), gt;
                try {
                  gt = window.open("", Ue, ar);
                } catch (Dt) {
                  throw new Fn("Can not open popup window - " + (Dt.stack || Dt.message));
                }
                if (xe(gt))
                  throw new Fn("Can not open popup window - blocked");
                return Pe && window.addEventListener("unload", function() {
                  return gt.close();
                }), gt;
              }(0, P({
                name: te,
                width: ge,
                height: be
              }, mr().popup));
              return _.register(function() {
                return Do(Me);
              }), _.register(function() {
                return Ei(Me);
              }), Me;
            }
            throw new Error("No render context available for " + x);
          }).then(function(Y) {
            return q.setWindow(Y, {
              send: Pt
            }), q.setName(te).then(function() {
              return q;
            });
          });
        }, _i = function() {
          return S.try(function() {
            var x = $o(window, "unload", en(function() {
              qr(new Error("Window navigated away"));
            })), N = Oo(d, qr, 3e3);
            if (_.register(N.cancel), _.register(x.cancel), wt) return wt();
          });
        }, Wi = function(x) {
          var N = !1;
          return x.isClosed().then(function(q) {
            return q ? (N = !0, Wt(new Error("Detected component window close"))) : S.delay(200).then(function() {
              return x.isClosed();
            }).then(function(j) {
              if (j)
                return N = !0, Wt(new Error("Detected component window close"));
            });
          }).then(function() {
            return N;
          });
        }, Br = function(x) {
          return qt ? qt(x) : S.try(function() {
            if (V.indexOf(x) === -1)
              return V.push(x), L.asyncReject(x), B.trigger(Ee.ERROR, x);
          });
        }, Mi = new S(), Fi = function(x) {
          return S.try(function() {
            Mi.resolve(x);
          });
        };
        pn.onError = Br;
        var zi = function(x, N) {
          return x({
            uid: r,
            container: N.container,
            context: N.context,
            doc: N.doc,
            frame: N.frame,
            prerenderFrame: N.prerenderFrame,
            focus: gr,
            close: Wt,
            state: $,
            props: H,
            tag: y,
            dimensions: De(),
            event: B
          });
        }, Li = function(x, N) {
          var q = N.context;
          return nr ? nr(x, {
            context: q
          }) : S.try(function() {
            if (w) {
              B.trigger(Ee.PRERENDER);
              var j = x.getWindow();
              if (j && D(j) && function(Ce) {
                try {
                  if (!Ce.location.href || Ce.location.href === "about:blank") return !0;
                } catch {
                }
                return !1;
              }(j)) {
                var te = (j = J(j)).document, Y = zi(w, {
                  context: q,
                  doc: te
                });
                if (Y) {
                  if (Y.ownerDocument !== te) throw new Error("Expected prerender template to have been created with document from child window");
                  (function(Ce, Pe) {
                    var it = Pe.tagName.toLowerCase();
                    if (it !== "html") throw new Error("Expected element to be html, got " + it);
                    for (var Ue = Ce.document.documentElement, de = 0, je = An(Ue.children); de < je.length; de++) Ue.removeChild(je[de]);
                    for (var tt = 0, Ve = An(Pe.children); tt < Ve.length; tt++) Ue.appendChild(Ve[tt]);
                  })(j, Y);
                  var me = E.width, ge = me !== void 0 && me, Le = E.height, be = Le !== void 0 && Le, Me = E.element, Ne = Me === void 0 ? "body" : Me;
                  if ((Ne = Mn(Ne, te)) && (ge || be)) {
                    var le = Vo(Ne, function(Ce) {
                      jr({
                        width: ge ? Ce.width : void 0,
                        height: be ? Ce.height : void 0
                      });
                    }, {
                      width: ge,
                      height: be,
                      win: j
                    });
                    B.on(Ee.RENDERED, le.cancel);
                  }
                  B.trigger(Ee.PRERENDERED);
                }
              }
            }
          });
        }, Ui = function(x, N) {
          var q = N.proxyFrame, j = N.proxyPrerenderFrame, te = N.context, Y = N.rerender;
          return Ht ? Ht(x, {
            proxyFrame: q,
            proxyPrerenderFrame: j,
            context: te,
            rerender: Y
          }) : S.hash({
            container: x.get(),
            frame: q ? q.get() : null,
            prerenderFrame: j ? j.get() : null,
            internalState: _e()
          }).then(function(me) {
            var ge = me.container, Le = me.internalState.visible, be = zi(l, {
              context: te,
              container: ge,
              frame: me.frame,
              prerenderFrame: me.prerenderFrame,
              doc: document
            });
            if (be) {
              Le || Ho(be), La(ge, be);
              var Me = function(Ne, le) {
                le = en(le);
                var Ce = !1, Pe = [], it, Ue, de, je = function() {
                  Ce = !0;
                  for (var gt = 0; gt < Pe.length; gt++) Pe[gt].disconnect();
                  it && it.cancel(), de && de.removeEventListener("unload", tt), Ue && _r(Ue);
                }, tt = function() {
                  Ce || (le(), je());
                };
                if (vr(Ne))
                  return tt(), {
                    cancel: je
                  };
                if (window.MutationObserver)
                  for (var Ve = Ne.parentElement; Ve; ) {
                    var ar = new window.MutationObserver(function() {
                      vr(Ne) && tt();
                    });
                    ar.observe(Ve, {
                      childList: !0
                    }), Pe.push(ar), Ve = Ve.parentElement;
                  }
                return (Ue = document.createElement("iframe")).setAttribute("name", "__detect_close_" + Xe() + "__"), Ue.style.display = "none", zn(Ue).then(function(gt) {
                  (de = J(gt)).addEventListener("unload", tt);
                }), Ne.appendChild(Ue), it = Ir(function() {
                  vr(Ne) && tt();
                }, 1e3), {
                  cancel: je
                };
              }(be, function() {
                var Ne = new Error("Detected container element removed from DOM");
                return S.delay(1).then(function() {
                  if (!vr(be))
                    return _.all(Ne), Y().then(ze, Te);
                  Wt(Ne);
                });
              });
              return _.register(function() {
                return Me.cancel();
              }), _.register(function() {
                return _r(be);
              }), k = fn(be);
            }
          });
        }, ji = function() {
          return {
            state: $,
            event: B,
            close: Wt,
            focus: gr,
            resize: jr,
            onError: Br,
            updateProps: us,
            show: Rt,
            hide: _t
          };
        }, to = function(x) {
          x === void 0 && (x = {});
          var N = vt, q = ji();
          pr(U, x), function(j, te, Y, me, ge) {
            var Le = me.state, be = me.close, Me = me.focus, Ne = me.event, le = me.onError;
            Xn(Y, j, function(Ce, Pe, it) {
              var Ue = !1, de = it;
              Object.defineProperty(te, Ce, {
                configurable: !0,
                enumerable: !0,
                get: function() {
                  return Ue ? de : (Ue = !0, function() {
                    if (!Pe) return de;
                    var je = Pe.alias;
                    if (je && !Lt(it) && Lt(Y[je]) && (de = Y[je]), Pe.value && (de = Pe.value({
                      props: te,
                      state: Le,
                      close: be,
                      focus: Me,
                      event: Ne,
                      onError: le,
                      container: ge
                    })), !Pe.default || Lt(de) || Lt(Y[Ce]) || (de = Pe.default({
                      props: te,
                      state: Le,
                      close: be,
                      focus: Me,
                      event: Ne,
                      onError: le,
                      container: ge
                    })), Lt(de)) {
                      if (Pe.type === ve.ARRAY ? !Array.isArray(de) : typeof de !== Pe.type) throw new TypeError("Prop is not of type " + Pe.type + ": " + Ce);
                    } else if (Pe.required !== !1 && !Lt(Y[Ce])) throw new Error('Expected prop "' + Ce + '" to be defined');
                    return Lt(de) && Pe.decorate && (de = Pe.decorate({
                      value: de,
                      props: te,
                      state: Le,
                      close: be,
                      focus: Me,
                      event: Ne,
                      onError: le,
                      container: ge
                    })), de;
                  }());
                }
              });
            }), Xn(te, j, ye);
          }(h, H, U, q, N);
        }, us = function(x) {
          return to(x), L.then(function() {
            var N = Oe, q = ue;
            if (N && q && xt) return ke(xt).then(function(j) {
              return N.updateProps(j).catch(function(te) {
                return Wi(q).then(function(Y) {
                  if (!Y) throw te;
                });
              });
            });
          });
        }, qi = function(x) {
          return At ? At(x) : S.try(function() {
            return jo(x);
          }).then(function(N) {
            return Ln(N) && (N = function q(j) {
              var te = function(Le) {
                var be = function(Me) {
                  for (; Me.parentNode; ) Me = Me.parentNode;
                  if (Ln(Me)) return Me;
                }(Le);
                if (be && be.host) return be.host;
              }(j);
              if (!te) throw new Error("Element is not in shadow dom");
              var Y = "shadow-slot-" + Xe(), me = document.createElement("slot");
              me.setAttribute("name", Y), j.appendChild(me);
              var ge = document.createElement("div");
              return ge.setAttribute("slot", Y), te.appendChild(ge), Ln(te) ? q(ge) : ge;
            }(N)), vt = N, fn(N);
          });
        };
        return {
          init: function() {
            (function() {
              B.on(Ee.RENDER, function() {
                return H.onRender();
              }), B.on(Ee.PRERENDER, function() {
                return H.onPrerender();
              }), B.on(Ee.DISPLAY, function() {
                return H.onDisplay();
              }), B.on(Ee.RENDERED, function() {
                return H.onRendered();
              }), B.on(Ee.PRERENDERED, function() {
                return H.onPrerendered();
              }), B.on(Ee.CLOSE, function() {
                return H.onClose();
              }), B.on(Ee.DESTROY, function() {
                return H.onDestroy();
              }), B.on(Ee.RESIZE, function() {
                return H.onResize();
              }), B.on(Ee.FOCUS, function() {
                return H.onFocus();
              }), B.on(Ee.PROPS, function(x) {
                return H.onProps(x);
              }), B.on(Ee.ERROR, function(x) {
                return H && H.onError ? H.onError(x) : Te(x).then(function() {
                  setTimeout(function() {
                    throw x;
                  }, 1);
                });
              }), _.register(B.reset);
            })();
          },
          render: function(x) {
            var N = x.target, q = x.container, j = x.context, te = x.rerender;
            return S.try(function() {
              var Y = ir(), me = O || ir();
              (function(G, qe, Ie) {
                if (G !== window) {
                  if (!Zr(window, G)) throw new Error("Can only renderTo an adjacent frame");
                  var Be = C();
                  if (!ft(qe, Be) && !D(G)) throw new Error("Can not render remotely to " + qe.toString() + " - can only render to " + Be);
                  if (Ie && typeof Ie != "string") throw new Error("Container passed to renderTo must be a string selector, got " + typeof Ie + " }");
                }
              })(N, me, q);
              var ge = S.try(function() {
                if (N !== window) return function(G, qe) {
                  for (var Ie = {}, Be = 0, ut = Object.keys(H); Be < ut.length; Be++) {
                    var Ae = ut[Be], Et = h[Ae];
                    Et && Et.allowDelegate && (Ie[Ae] = H[Ae]);
                  }
                  var Ge = Pt(qe, "zoid_delegate_" + m, {
                    uid: r,
                    overrides: {
                      props: Ie,
                      event: B,
                      close: Wt,
                      onError: Br,
                      getInternalState: _e,
                      setInternalState: We,
                      resolveInitPromise: ze,
                      rejectInitPromise: Te
                    }
                  }).then(function(Z) {
                    var Q = Z.data.parent;
                    return _.register(function(W) {
                      if (!xe(qe)) return Q.destroy(W);
                    }), Q.getDelegateOverrides();
                  }).catch(function(Z) {
                    throw new Error(`Unable to delegate rendering. Possibly the component is not loaded in the target window.

` + hr(Z));
                  });
                  return At = function() {
                    for (var Z = arguments.length, Q = new Array(Z), W = 0; W < Z; W++) Q[W] = arguments[W];
                    return Ge.then(function(ee) {
                      return ee.getProxyContainer.apply(ee, Q);
                    });
                  }, Ht = function() {
                    for (var Z = arguments.length, Q = new Array(Z), W = 0; W < Z; W++) Q[W] = arguments[W];
                    return Ge.then(function(ee) {
                      return ee.renderContainer.apply(ee, Q);
                    });
                  }, Bt = function() {
                    for (var Z = arguments.length, Q = new Array(Z), W = 0; W < Z; W++) Q[W] = arguments[W];
                    return Ge.then(function(ee) {
                      return ee.show.apply(ee, Q);
                    });
                  }, $t = function() {
                    for (var Z = arguments.length, Q = new Array(Z), W = 0; W < Z; W++) Q[W] = arguments[W];
                    return Ge.then(function(ee) {
                      return ee.hide.apply(ee, Q);
                    });
                  }, wt = function() {
                    for (var Z = arguments.length, Q = new Array(Z), W = 0; W < Z; W++) Q[W] = arguments[W];
                    return Ge.then(function(ee) {
                      return ee.watchForUnload.apply(ee, Q);
                    });
                  }, G === Se.IFRAME ? (Tt = function() {
                    for (var Z = arguments.length, Q = new Array(Z), W = 0; W < Z; W++) Q[W] = arguments[W];
                    return Ge.then(function(ee) {
                      return ee.getProxyWindow.apply(ee, Q);
                    });
                  }, Vt = function() {
                    for (var Z = arguments.length, Q = new Array(Z), W = 0; W < Z; W++) Q[W] = arguments[W];
                    return Ge.then(function(ee) {
                      return ee.openFrame.apply(ee, Q);
                    });
                  }, Gt = function() {
                    for (var Z = arguments.length, Q = new Array(Z), W = 0; W < Z; W++) Q[W] = arguments[W];
                    return Ge.then(function(ee) {
                      return ee.openPrerenderFrame.apply(ee, Q);
                    });
                  }, nr = function() {
                    for (var Z = arguments.length, Q = new Array(Z), W = 0; W < Z; W++) Q[W] = arguments[W];
                    return Ge.then(function(ee) {
                      return ee.prerender.apply(ee, Q);
                    });
                  }, or = function() {
                    for (var Z = arguments.length, Q = new Array(Z), W = 0; W < Z; W++) Q[W] = arguments[W];
                    return Ge.then(function(ee) {
                      return ee.open.apply(ee, Q);
                    });
                  }, oe = function() {
                    for (var Z = arguments.length, Q = new Array(Z), W = 0; W < Z; W++) Q[W] = arguments[W];
                    return Ge.then(function(ee) {
                      return ee.openPrerender.apply(ee, Q);
                    });
                  }) : G === Se.POPUP && (rr = function() {
                    for (var Z = arguments.length, Q = new Array(Z), W = 0; W < Z; W++) Q[W] = arguments[W];
                    return Ge.then(function(ee) {
                      return ee.setProxyWin.apply(ee, Q);
                    });
                  }), Ge;
                }(j, N);
              }), Le = H.window, be = _i(), Me = Di(h, H, "post"), Ne = B.trigger(Ee.RENDER), le = qi(q), Ce = mt(), Pe = le.then(function() {
                return to();
              }), it = Pe.then(function() {
                return Di(h, H, "get").then(function(G) {
                  return function(qe, Ie) {
                    var Be = Ie.query || {}, ut = Ie.hash || {}, Ae, Et, Ge = qe.split("#");
                    Et = Ge[1];
                    var Z = (Ae = Ge[0]).split("?");
                    Ae = Z[0];
                    var Q = Uo(Z[1], Be), W = Uo(Et, ut);
                    return Q && (Ae = Ae + "?" + Q), W && (Ae = Ae + "#" + W), Ae;
                  }(Sn(wr()), {
                    query: G
                  });
                });
              }), Ue = Ce.then(function(G) {
                return function(Ie) {
                  var Be = Ie === void 0 ? {} : Ie, ut = Be.proxyWin, Ae = Be.initialChildDomain, Et = Be.childDomainMatch, Ge = Be.target, Z = Ge === void 0 ? window : Ge, Q = Be.context;
                  return function(W) {
                    var ee = W === void 0 ? {} : W, ro = ee.proxyWin, vs = ee.childDomainMatch, ws = ee.context;
                    return ke(ee.initialChildDomain).then(function(ms) {
                      return {
                        uid: r,
                        context: ws,
                        tag: y,
                        childDomainMatch: vs,
                        version: "10_3_3",
                        props: ms,
                        exports: (Hi = ro, {
                          init: function(gs) {
                            return pn(this.origin, gs);
                          },
                          close: Wt,
                          checkClose: function() {
                            return Wi(Hi);
                          },
                          resize: jr,
                          onError: Br,
                          show: Rt,
                          hide: _t,
                          export: Fi
                        })
                      };
                      var Hi;
                    });
                  }({
                    proxyWin: ut,
                    initialChildDomain: Ae,
                    childDomainMatch: Et,
                    context: Q
                  }).then(function(W) {
                    var ee = Pi({
                      data: W,
                      metaData: {
                        windowRef: Ur(Z, Ae, Q, ut)
                      },
                      sender: {
                        domain: C(window)
                      },
                      receiver: {
                        win: ut,
                        domain: Et
                      },
                      passByReference: Ae === C()
                    }), ro = ee.serializedData;
                    return _.register(ee.cleanReference), ro;
                  });
                }({
                  proxyWin: (qe = {
                    proxyWin: G,
                    initialChildDomain: Y,
                    childDomainMatch: me,
                    target: N,
                    context: j
                  }).proxyWin,
                  initialChildDomain: qe.initialChildDomain,
                  childDomainMatch: qe.childDomainMatch,
                  target: qe.target,
                  context: qe.context
                }).then(function(Ie) {
                  return Ri({
                    name: m,
                    serializedPayload: Ie
                  });
                });
                var qe;
              }), de = Ue.then(function(G) {
                return ot(j, {
                  windowName: G
                });
              }), je = zr(j), tt = S.hash({
                proxyContainer: le,
                proxyFrame: de,
                proxyPrerenderFrame: je
              }).then(function(G) {
                return Ui(G.proxyContainer, {
                  context: j,
                  proxyFrame: G.proxyFrame,
                  proxyPrerenderFrame: G.proxyPrerenderFrame,
                  rerender: te
                });
              }).then(function(G) {
                return G;
              }), Ve = S.hash({
                windowName: Ue,
                proxyFrame: de,
                proxyWin: Ce
              }).then(function(G) {
                var qe = G.proxyWin;
                return Le ? qe : Ai(j, {
                  windowName: G.windowName,
                  proxyWin: qe,
                  proxyFrame: G.proxyFrame
                });
              }), ar = S.hash({
                proxyWin: Ve,
                proxyPrerenderFrame: je
              }).then(function(G) {
                return Lr(j, G.proxyWin, G.proxyPrerenderFrame);
              }), gt = Ve.then(function(G) {
                return ue = G, nt(G);
              }), Dt = S.hash({
                proxyPrerenderWin: ar,
                state: gt
              }).then(function(G) {
                return Li(G.proxyPrerenderWin, {
                  context: j
                });
              }), Bi = S.hash({
                proxyWin: Ve,
                windowName: Ue
              }).then(function(G) {
                if (Le) return G.proxyWin.setName(G.windowName);
              }), cs = S.hash({
                body: Me
              }).then(function(G) {
                return n.method ? n.method : Object.keys(G.body).length ? "post" : "get";
              }), $i = S.hash({
                proxyWin: Ve,
                windowUrl: it,
                body: Me,
                method: cs,
                windowName: Bi,
                prerender: Dt
              }).then(function(G) {
                return G.proxyWin.setLocation(G.windowUrl, {
                  method: G.method,
                  body: G.body
                });
              }), ds = Ve.then(function(G) {
                (function qe(Ie, Be) {
                  var ut = !1;
                  return _.register(function() {
                    ut = !0;
                  }), S.delay(2e3).then(function() {
                    return Ie.isClosed();
                  }).then(function(Ae) {
                    if (!ut) {
                      if (Be === Se.POPUP && Ae) return Wt(new Error("Detected popup close"));
                      var Et = !!(vt && vr(vt));
                      return Be === Se.IFRAME && Ae && (Et || jt) ? Wt(new Error("Detected iframe close")) : qe(Ie, Be);
                    }
                  });
                })(G, j);
              }), fs = S.hash({
                container: tt,
                prerender: Dt
              }).then(function() {
                return B.trigger(Ee.DISPLAY);
              }), ls = Ve.then(function(G) {
                return function(qe, Ie, Be) {
                  return S.try(function() {
                    return qe.awaitWindow();
                  }).then(function(ut) {
                    if (Ut && Ut.needsBridge({
                      win: ut,
                      domain: Ie
                    }) && !Ut.hasBridge(Ie, Ie)) {
                      var Ae = typeof n.bridgeUrl == "function" ? n.bridgeUrl({
                        props: H
                      }) : n.bridgeUrl;
                      if (!Ae) throw new Error("Bridge needed to render " + Be);
                      var Et = Nt(Ae);
                      return Ut.linkUrl(ut, Ie), Ut.openBridge(Sn(Ae), Et);
                    }
                  });
                }(G, Y, j);
              }), hs = $i.then(function() {
                return S.try(function() {
                  var G = H.timeout;
                  if (G) return L.timeout(G, new Error("Loading component timed out after " + G + " milliseconds"));
                });
              }), ps = L.then(function() {
                return jt = !0, B.trigger(Ee.RENDERED);
              });
              return S.hash({
                initPromise: L,
                buildUrlPromise: it,
                onRenderPromise: Ne,
                getProxyContainerPromise: le,
                openFramePromise: de,
                openPrerenderFramePromise: je,
                renderContainerPromise: tt,
                openPromise: Ve,
                openPrerenderPromise: ar,
                setStatePromise: gt,
                prerenderPromise: Dt,
                loadUrlPromise: $i,
                buildWindowNamePromise: Ue,
                setWindowNamePromise: Bi,
                watchForClosePromise: ds,
                onDisplayPromise: fs,
                openBridgePromise: ls,
                runTimeoutPromise: hs,
                onRenderedPromise: ps,
                delegatePromise: ge,
                watchForUnloadPromise: be,
                finalSetPropsPromise: Pe
              });
            }).catch(function(Y) {
              return S.all([Br(Y), qr(Y)]).then(function() {
                throw Y;
              }, function() {
                throw Y;
              });
            }).then(ye);
          },
          destroy: qr,
          getProps: function() {
            return H;
          },
          setProps: to,
          export: Fi,
          getHelpers: ji,
          getDelegateOverrides: function() {
            return S.try(function() {
              return {
                getProxyContainer: qi,
                show: Rt,
                hide: _t,
                renderContainer: Ui,
                getProxyWindow: mt,
                watchForUnload: _i,
                openFrame: ot,
                openPrerenderFrame: zr,
                prerender: Li,
                open: Ai,
                openPrerender: Lr,
                setProxyWin: nt
              };
            });
          },
          getExports: function() {
            return A({
              getExports: function() {
                return Mi;
              }
            });
          }
        };
      }
      var Xa = {
        register: function(e, r, n, i) {
          var a = i.React, c = i.ReactDOM;
          return function(d) {
            T(h, d);
            function h() {
              return d.apply(this, arguments) || this;
            }
            var l = h.prototype;
            return l.render = function() {
              return a.createElement("div", null);
            }, l.componentDidMount = function() {
              var w = c.findDOMNode(this), y = n(pr({}, this.props));
              y.render(w, Se.IFRAME), this.setState({
                parent: y
              });
            }, l.componentDidUpdate = function() {
              this.state && this.state.parent && this.state.parent.updateProps(pr({}, this.props)).catch(ye);
            }, h;
          }(a.Component);
        }
      }, ka = {
        register: function(e, r, n, i) {
          return i.component(e, {
            render: function(a) {
              return a("div");
            },
            inheritAttrs: !1,
            mounted: function() {
              var a = this.$el;
              this.parent = n(P({}, (c = this.$attrs, Object.keys(c).reduce(function(d, h) {
                var l = c[h];
                return h === "style-object" || h === "styleObject" ? (d.style = l, d.styleObject = l) : h.includes("-") ? d[In(h)] = l : d[h] = l, d;
              }, {}))));
              var c;
              this.parent.render(a, Se.IFRAME);
            },
            watch: {
              $attrs: {
                handler: function() {
                  this.parent && this.$attrs && this.parent.updateProps(P({}, this.$attrs)).catch(ye);
                },
                deep: !0
              }
            }
          });
        }
      }, es = {
        register: function(e, r, n) {
          return {
            template: "<div></div>",
            inheritAttrs: !1,
            mounted: function() {
              var i = this.$el;
              this.parent = n(P({}, (a = this.$attrs, Object.keys(a).reduce(function(c, d) {
                var h = a[d];
                return d === "style-object" || d === "styleObject" ? (c.style = h, c.styleObject = h) : d.includes("-") ? c[In(d)] = h : c[d] = h, c;
              }, {}))));
              var a;
              this.parent.render(i, Se.IFRAME);
            },
            watch: {
              $attrs: {
                handler: function() {
                  this.parent && this.$attrs && this.parent.updateProps(P({}, this.$attrs)).catch(ye);
                },
                deep: !0
              }
            }
          };
        }
      }, ts = {
        register: function(e, r, n, i) {
          return i.module(e, []).directive(In(e), function() {
            for (var a = {}, c = 0, d = Object.keys(r); c < d.length; c++) a[d[c]] = "=";
            return a.props = "=", {
              scope: a,
              restrict: "E",
              controller: ["$scope", "$element", function(h, l) {
                function w() {
                  if (h.$root.$$phase !== "$apply" && h.$root.$$phase !== "$digest") try {
                    h.$apply();
                  } catch {
                  }
                }
                var y = function() {
                  return rn(h.props, function(p) {
                    return typeof p == "function" ? function() {
                      var g = p.apply(this, arguments);
                      return w(), g;
                    } : p;
                  });
                }, m = n(y());
                m.render(l[0], Se.IFRAME), h.$watch(function() {
                  m.updateProps(y()).catch(ye);
                });
              }]
            };
          });
        }
      }, rs = {
        register: function(e, r, n, i) {
          var a = i.Component, c = i.NgModule, d = i.ElementRef, h = i.NgZone, l = i.Inject, w = function() {
            function m(g, E) {
              this.elementRef = void 0, this.internalProps = void 0, this.parent = void 0, this.props = void 0, this.zone = void 0, this._props = void 0, this._props = {}, this.elementRef = g, this.zone = E;
            }
            var p = m.prototype;
            return p.getProps = function() {
              var g = this;
              return rn(P({}, this.internalProps, this.props), function(E) {
                if (typeof E == "function") {
                  var R = g.zone;
                  return function() {
                    var O = arguments, A = this;
                    return R.run(function() {
                      return E.apply(A, O);
                    });
                  };
                }
                return E;
              });
            }, p.ngOnInit = function() {
              var g = this.elementRef.nativeElement;
              this.parent = n(this.getProps()), this.parent.render(g, Se.IFRAME);
            }, p.ngDoCheck = function() {
              this.parent && !function(g, E) {
                var R = {};
                for (var O in g) if (g.hasOwnProperty(O) && (R[O] = !0, g[O] !== E[O]))
                  return !1;
                for (var A in E) if (!R[A]) return !1;
                return !0;
              }(this._props, this.props) && (this._props = P({}, this.props), this.parent.updateProps(this.getProps()));
            }, m;
          }();
          w.annotations = void 0, w.parameters = void 0, w.parameters = [[new l(d)], [new l(h)]], w.annotations = [new a({
            selector: e,
            template: "<div></div>",
            inputs: ["props"]
          })];
          var y = function() {
          };
          return y.annotations = void 0, y.annotations = [new c({
            declarations: [w],
            exports: [w]
          })], y;
        }
      };
      function ns(e) {
        var r = e.uid, n = e.frame, i = e.prerenderFrame, a = e.doc, c = e.props, d = e.event, h = e.dimensions, l = h.width, w = h.height;
        if (n && i) {
          var y = a.createElement("div");
          y.setAttribute("id", r);
          var m = a.createElement("style");
          return c.cspNonce && m.setAttribute("nonce", c.cspNonce), m.appendChild(a.createTextNode(`
            #` + r + ` {
                display: inline-block;
                position: relative;
                width: ` + l + `;
                height: ` + w + `;
            }

            #` + r + ` > iframe {
                display: inline-block;
                position: absolute;
                width: 100%;
                height: 100%;
                top: 0;
                left: 0;
                transition: opacity .2s ease-in-out;
            }

            #` + r + ` > iframe.zoid-invisible {
                opacity: 0;
            }

            #` + r + ` > iframe.zoid-visible {
                opacity: 1;
        }
        `)), y.appendChild(n), y.appendChild(i), y.appendChild(m), i.classList.add("zoid-visible"), n.classList.add("zoid-invisible"), d.on(Ee.RENDERED, function() {
            i.classList.remove("zoid-visible"), i.classList.add("zoid-invisible"), n.classList.remove("zoid-invisible"), n.classList.add("zoid-visible"), setTimeout(function() {
              _r(i);
            }, 1);
          }), d.on(Ee.RESIZE, function(p) {
            var g = p.width, E = p.height;
            typeof g == "number" && (y.style.width = Yo(g)), typeof E == "number" && (y.style.height = Yo(E));
          }), y;
        }
      }
      function os(e) {
        var r = e.doc, n = e.props, i = r.createElement("html"), a = r.createElement("body"), c = r.createElement("style"), d = r.createElement("div");
        return d.classList.add("spinner"), n.cspNonce && c.setAttribute("nonce", n.cspNonce), i.appendChild(a), a.appendChild(d), a.appendChild(c), c.appendChild(r.createTextNode(`
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
        `)), i;
      }
      var kn = nn(), eo = nn();
      function is(e) {
        var r = function(E) {
          var R = E.tag, O = E.url, A = E.domain, L = E.bridgeUrl, V = E.props, _ = V === void 0 ? {} : V, $ = E.dimensions, U = $ === void 0 ? {} : $, X = E.autoResize, B = X === void 0 ? {} : X, ce = E.allowedParentDomains, ne = ce === void 0 ? "*" : ce, K = E.attributes, H = K === void 0 ? {} : K, ue = E.defaultContext, k = ue === void 0 ? Se.IFRAME : ue, Oe = E.containerTemplate, xt = Oe === void 0 ? ns : Oe, vt = E.prerenderTemplate, jt = vt === void 0 ? os : vt, qt = E.validate, At = E.eligible, Bt = At === void 0 ? function() {
            return {
              eligible: !0
            };
          } : At, $t = E.logger, tr = $t === void 0 ? {
            info: ye
          } : $t, Ht = E.exports, Tt = Ht === void 0 ? ye : Ht, rr = E.method, Vt = E.children, Gt = Vt === void 0 ? function() {
            return {};
          } : Vt, nr = R.replace(/-/g, "_"), or = P({}, {
            window: {
              type: ve.OBJECT,
              sendToChild: !1,
              required: !1,
              allowDelegate: !0,
              validate: function(oe) {
                var wt = oe.value;
                if (!Xt(wt) && !pt.isProxyWindow(wt)) throw new Error("Expected Window or ProxyWindow");
                if (Xt(wt)) {
                  if (xe(wt)) throw new Error("Window is closed");
                  if (!D(wt)) throw new Error("Window is not same domain");
                }
              },
              decorate: function(oe) {
                return Mr(oe.value);
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
              default: It,
              decorate: er
            },
            onRendered: {
              type: ve.FUNCTION,
              required: !1,
              sendToChild: !1,
              default: It,
              decorate: er
            },
            onRender: {
              type: ve.FUNCTION,
              required: !1,
              sendToChild: !1,
              default: It,
              decorate: er
            },
            onPrerendered: {
              type: ve.FUNCTION,
              required: !1,
              sendToChild: !1,
              default: It,
              decorate: er
            },
            onPrerender: {
              type: ve.FUNCTION,
              required: !1,
              sendToChild: !1,
              default: It,
              decorate: er
            },
            onClose: {
              type: ve.FUNCTION,
              required: !1,
              sendToChild: !1,
              allowDelegate: !0,
              default: It,
              decorate: er
            },
            onDestroy: {
              type: ve.FUNCTION,
              required: !1,
              sendToChild: !1,
              allowDelegate: !0,
              default: It,
              decorate: er
            },
            onResize: {
              type: ve.FUNCTION,
              required: !1,
              sendToChild: !1,
              allowDelegate: !0,
              default: It
            },
            onFocus: {
              type: ve.FUNCTION,
              required: !1,
              sendToChild: !1,
              allowDelegate: !0,
              default: It
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
          }, _);
          if (!xt) throw new Error("Container template required");
          return {
            name: nr,
            tag: R,
            url: O,
            domain: A,
            bridgeUrl: L,
            method: rr,
            propsDef: or,
            dimensions: U,
            autoResize: B,
            allowedParentDomains: ne,
            attributes: H,
            defaultContext: k,
            containerTemplate: xt,
            prerenderTemplate: jt,
            validate: qt,
            logger: tr,
            eligible: Bt,
            children: Gt,
            exports: typeof Tt == "function" ? Tt : function(oe) {
              for (var wt = oe.getExports, se = {}, Fe = function() {
                var Te = ze[De], ke = Tt[Te].type, _e = wt().then(function(We) {
                  return We[Te];
                });
                se[Te] = ke === ve.FUNCTION ? function() {
                  for (var We = arguments.length, mt = new Array(We), nt = 0; nt < We; nt++) mt[nt] = arguments[nt];
                  return _e.then(function(Rt) {
                    return Rt.apply(void 0, mt);
                  });
                } : _e;
              }, De = 0, ze = Object.keys(Tt); De < ze.length; De++) Fe();
              return se;
            }
          };
        }(e), n = r.name, i = r.tag, a = r.defaultContext, c = r.propsDef, d = r.eligible, h = r.children, l = Fr(window), w = {}, y = [], m = function() {
          if (function(R) {
            try {
              return Qn(window.name).name === R;
            } catch {
            }
            return !1;
          }(n)) {
            var E = Si().payload;
            if (E.tag === i && ft(E.childDomainMatch, C())) return !0;
          }
          return !1;
        }, p = zt(function() {
          if (m()) {
            if (window.xprops)
              throw delete l.components[i], new Error("Can not register " + n + " as child - child already registered");
            var E = function(R) {
              var O = R.tag, A = R.propsDef, L = R.autoResize, V = R.allowedParentDomains, _ = [], $ = Si(), U = $.parent, X = $.payload, B = U.win, ce = U.domain, ne, K = new S(), H = X.version, ue = X.uid, k = X.exports, Oe = X.context, xt = X.props;
              if (!function(se, Fe) {
                if (!/_/.test(se) || !/_/.test("10_3_3")) throw new Error("Versions are in an invalid format (" + se + ", 10_3_3)");
                return se.split("_")[0] === "10_3_3".split("_")[0];
              }(H)) throw new Error("Parent window has zoid version " + H + ", child window has version 10_3_3");
              var vt = k.show, jt = k.hide, qt = k.close, At = k.onError, Bt = k.checkClose, $t = k.export, tr = k.resize, Ht = k.init, Tt = function() {
                return B;
              }, rr = function() {
                return ce;
              }, Vt = function(se) {
                return _.push(se), {
                  cancel: function() {
                    _.splice(_.indexOf(se), 1);
                  }
                };
              }, Gt = function(se) {
                return tr.fireAndForget({
                  width: se.width,
                  height: se.height
                });
              }, nr = function(se) {
                return K.resolve(se), $t(se);
              }, or = function(se) {
                var Fe = (se === void 0 ? {} : se).anyParent, De = [], ze = ne.parent;
                if (Fe === void 0 && (Fe = !ze), !Fe && !ze) throw new Error("No parent found for " + O + " child");
                for (var Te = 0, ke = Re(window); Te < ke.length; Te++) {
                  var _e = ke[Te];
                  if (D(_e)) {
                    var We = J(_e).xprops;
                    if (We && Tt() === We.getParent()) {
                      var mt = We.parent;
                      if (Fe || !ze || mt && mt.uid === ze.uid) {
                        var nt = bi(_e, function(Rt) {
                          return Rt.exports;
                        });
                        De.push({
                          props: We,
                          exports: nt
                        });
                      }
                    }
                  }
                }
                return De;
              }, oe = function(se, Fe, De) {
                De === void 0 && (De = !1);
                var ze = function(ke, _e, We, mt, nt, Rt) {
                  Rt === void 0 && (Rt = !1);
                  for (var _t = {}, wr = 0, mr = Object.keys(We); wr < mr.length; wr++) {
                    var ir = mr[wr], ot = _e[ir], zr = ot && ot.trustedDomains && ot.trustedDomains.length > 0 ? ot.trustedDomains.reduce(function(pn, jr) {
                      return pn || ft(jr, C(window));
                    }, !1) : mt === C(window) || D(ke);
                    if ((!ot || !ot.sameDomain || zr) && (!ot || !ot.trustedDomains || zr)) {
                      var Lr = Oi(_e, 0, ir, We[ir], nt);
                      _t[ir] = Lr, ot && ot.alias && !_t[ot.alias] && (_t[ot.alias] = Lr);
                    }
                  }
                  if (!Rt) for (var gr = 0, hn = Object.keys(_e); gr < hn.length; gr++) {
                    var Ur = hn[gr];
                    We.hasOwnProperty(Ur) || (_t[Ur] = Oi(_e, 0, Ur, void 0, nt));
                  }
                  return _t;
                }(B, A, se, Fe, {
                  tag: O,
                  show: vt,
                  hide: jt,
                  close: qt,
                  focus: Qa,
                  onError: At,
                  resize: Gt,
                  getSiblings: or,
                  onProps: Vt,
                  getParent: Tt,
                  getParentDomain: rr,
                  uid: ue,
                  export: nr
                }, De);
                ne ? pr(ne, ze) : ne = ze;
                for (var Te = 0; Te < _.length; Te++) (0, _[Te])(ne);
              }, wt = function(se) {
                return S.try(function() {
                  return oe(se, ce, !0);
                });
              };
              return {
                init: function() {
                  return S.try(function() {
                    var se = "";
                    return D(B) && (se = function(Fe) {
                      var De = Fe.componentName, ze = Fe.parentComponentWindow, Te = Ti({
                        data: Qn(window.name).serializedInitialPayload,
                        sender: {
                          win: ze
                        },
                        basic: !0
                      }), ke = Te.sender;
                      if (Te.reference.type === "uid" || Te.metaData.windowRef.type === "global") {
                        var _e = Ri({
                          name: De,
                          serializedPayload: Pi({
                            data: Te.data,
                            metaData: {
                              windowRef: Za(ze)
                            },
                            sender: {
                              domain: ke.domain
                            },
                            receiver: {
                              win: window,
                              domain: C()
                            },
                            basic: !0
                          }).serializedData
                        });
                        return window.name = _e, _e;
                      }
                    }({
                      componentName: R.name,
                      parentComponentWindow: B
                    }) || ""), Fr(window).exports = R.exports({
                      getExports: function() {
                        return K;
                      }
                    }), function(Fe, De) {
                      if (!ft(Fe, De)) throw new Error("Can not be rendered by domain: " + De);
                    }(V, ce), ri(B), function() {
                      window.addEventListener("beforeunload", function() {
                        Bt.fireAndForget();
                      }), window.addEventListener("unload", function() {
                        Bt.fireAndForget();
                      }), Oo(B, function() {
                        xi();
                      });
                    }(), Ht({
                      name: se,
                      updateProps: wt,
                      close: xi
                    });
                  }).then(function() {
                    return (se = L.width, Fe = se !== void 0 && se, De = L.height, ze = De !== void 0 && De, Te = L.element, jo(Te === void 0 ? "body" : Te).catch(ye).then(function(ke) {
                      return {
                        width: Fe,
                        height: ze,
                        element: ke
                      };
                    })).then(function(ke) {
                      var _e = ke.width, We = ke.height, mt = ke.element;
                      mt && (_e || We) && Oe !== Se.POPUP && Vo(mt, function(nt) {
                        Gt({
                          width: _e ? nt.width : void 0,
                          height: We ? nt.height : void 0
                        });
                      }, {
                        width: _e,
                        height: We
                      });
                    });
                    var se, Fe, De, ze, Te;
                  }).catch(function(se) {
                    At(se);
                  });
                },
                getProps: function() {
                  return ne || (oe(xt, ce), ne);
                }
              };
            }(r);
            return E.init(), E;
          }
        }), g = function E(R) {
          var O, A = "zoid-" + i + "-" + Xe(), L = R || {}, V = d({
            props: L
          }), _ = V.eligible, $ = V.reason, U = L.onDestroy;
          L.onDestroy = function() {
            if (O && _ && y.splice(y.indexOf(O), 1), U) return U.apply(void 0, arguments);
          };
          var X = Ni({
            uid: A,
            options: r
          });
          X.init(), _ ? X.setProps(L) : L.onDestroy && L.onDestroy(), kn.register(function(ne) {
            return X.destroy(ne || new Error("zoid destroyed all components"));
          });
          var B = function(ne) {
            var K = (ne === void 0 ? {} : ne).decorate;
            return E((K === void 0 ? Fa : K)(L));
          }, ce = function(ne, K, H) {
            return S.try(function() {
              if (!_) {
                var ue = new Error($ || n + " component is not eligible");
                return X.destroy(ue).then(function() {
                  throw ue;
                });
              }
              if (!Xt(ne)) throw new Error("Must pass window to renderTo");
              return function(k, Oe) {
                return S.try(function() {
                  if (k.window) return Mr(k.window).getType();
                  if (Oe) {
                    if (Oe !== Se.IFRAME && Oe !== Se.POPUP) throw new Error("Unrecognized context: " + Oe);
                    return Oe;
                  }
                  return a;
                });
              }(L, H);
            }).then(function(ue) {
              if (K = function(k, Oe) {
                if (Oe) {
                  if (typeof Oe != "string" && !On(Oe)) throw new TypeError("Expected string or element selector to be passed");
                  return Oe;
                }
                if (k === Se.POPUP) return "body";
                throw new Error("Expected element to be passed to render iframe");
              }(ue, K), ne !== window && typeof K != "string") throw new Error("Must pass string element when rendering to another window");
              return X.render({
                target: ne,
                container: K,
                context: ue,
                rerender: function() {
                  var k = B();
                  return pr(O, k), k.renderTo(ne, K, H);
                }
              });
            }).catch(function(ue) {
              return X.destroy(ue).then(function() {
                throw ue;
              });
            });
          };
          return O = P({}, X.getExports(), X.getHelpers(), function() {
            for (var ne = h(), K = {}, H = function() {
              var Oe = k[ue], xt = ne[Oe];
              K[Oe] = function(vt) {
                var jt = X.getProps(), qt = P({}, vt, {
                  parent: {
                    uid: A,
                    props: jt,
                    export: X.export
                  }
                });
                return xt(qt);
              };
            }, ue = 0, k = Object.keys(ne); ue < k.length; ue++) H();
            return K;
          }(), {
            isEligible: function() {
              return _;
            },
            clone: B,
            render: function(ne, K) {
              return ce(window, ne, K);
            },
            renderTo: function(ne, K, H) {
              return ce(ne, K, H);
            }
          }), _ && y.push(O), O;
        };
        if (p(), function() {
          var E = Ct("zoid_allow_delegate_" + n, function() {
            return !0;
          }), R = Ct("zoid_delegate_" + n, function(O) {
            var A = O.data;
            return {
              parent: Ni({
                uid: A.uid,
                options: r,
                overrides: A.overrides,
                parentWin: O.source
              })
            };
          });
          eo.register(E.cancel), eo.register(R.cancel);
        }(), l.components = l.components || {}, l.components[i]) throw new Error("Can not register multiple components with the same tag: " + i);
        return l.components[i] = !0, {
          init: g,
          instances: y,
          driver: function(E, R) {
            var O = {
              react: Xa,
              angular: ts,
              vue: ka,
              vue3: es,
              angular2: rs
            };
            if (!O[E]) throw new Error("Could not find driver for framework: " + E);
            return w[E] || (w[E] = O[E].register(i, c, g, R)), w[E];
          },
          isChild: m,
          canRenderTo: function(E) {
            return Pt(E, "zoid_allow_delegate_" + n).then(function(R) {
              return R.data;
            }).catch(function() {
              return !1;
            });
          },
          registerChild: p
        };
      }
      var as = function(e) {
        (function() {
          Ot().initialized || (Ot().initialized = !0, c = (a = {
            on: Ct,
            send: Pt
          }).on, d = a.send, (h = Ot()).receiveMessage = h.receiveMessage || function(l) {
            return Yn(l, {
              on: c,
              send: d
            });
          }, function(l) {
            var w = l.on, y = l.send;
            fe().getOrSet("postMessageListener", function() {
              return $o(window, "message", function(m) {
                (function(p, g) {
                  var E = g.on, R = g.send;
                  S.try(function() {
                    var O = p.source || p.sourceElement, A = p.origin || p.originalEvent && p.originalEvent.origin, L = p.data;
                    if (A === "null" && (A = "file://"), O) {
                      if (!A) throw new Error("Post message did not have origin domain");
                      Yn({
                        source: O,
                        origin: A,
                        data: L
                      }, {
                        on: E,
                        send: R
                      });
                    }
                  });
                })(m, {
                  on: w,
                  send: y
                });
              });
            });
          }({
            on: Ct,
            send: Pt
          }), di({
            on: Ct,
            send: Pt,
            receiveMessage: Yn
          }), function(l) {
            var w = l.on, y = l.send;
            fe("builtinListeners").getOrSet("helloListener", function() {
              var m = w("postrobot_hello", {
                domain: "*"
              }, function(g) {
                return ko(g.source, {
                  domain: g.origin
                }), {
                  instanceID: Xo()
                };
              }), p = Qt();
              return p && jn(p, {
                send: y
              }).catch(function(g) {
              }), m;
            });
          }({
            on: Ct,
            send: Pt
          }));
          var a, c, d, h;
        })();
        var r = is(e), n = function(a) {
          return r.init(a);
        };
        n.driver = function(a, c) {
          return r.driver(a, c);
        }, n.isChild = function() {
          return r.isChild();
        }, n.canRenderTo = function(a) {
          return r.canRenderTo(a);
        }, n.instances = r.instances;
        var i = r.registerChild();
        return i && (window.xprops = n.xprops = i.getProps()), n;
      };
      function Ci(e) {
        Ut && Ut.destroyBridges();
        var r = kn.all(e);
        return kn = nn(), r;
      }
      var Ii = Ci;
      function ss(e) {
        return Ii(), delete window.__zoid_10_3_3__, function() {
          (function() {
            for (var n = fe("responseListeners"), i = 0, a = n.keys(); i < a.length; i++) {
              var c = a[i], d = n.get(c);
              d && (d.cancelled = !0), n.del(c);
            }
          })(), (r = fe().get("postMessageListener")) && r.cancel();
          var r;
          delete window.__post_robot_11_0_0__;
        }(), eo.all(e);
      }
    }]);
  });
})(Ia);
var Aa = Ia.exports;
const na = Aa.EVENT, Er = {
  VISIBLE: "zoid-visible",
  INVISIBLE: "zoid-invisible"
};
function ec({
  uid: t,
  frame: o,
  prerenderFrame: s,
  doc: u,
  props: f,
  event: v,
  dimensions: T
}) {
  const { width: P, height: I } = T, { top: M = 0, left: b = 0 } = f;
  if (!o || !s)
    return;
  const F = u.createElement("div");
  F.setAttribute("id", t);
  const z = u.createElement("style");
  return f.cspNonce && z.setAttribute("nonce", f.cspNonce), z.appendChild(
    u.createTextNode(`
          #${t} {
              display: inline-block;
              position: absolute;
              width: ${P};
              height: ${I};
              z-index: 1049;
              border: none;
              top: ${M}px;
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

          #${t} > iframe.${Er.INVISIBLE} {
              opacity: 0;
          }

          #${t} > iframe.${Er.VISIBLE} {
              opacity: 1;
        }
      `)
  ), F.appendChild(o), F.appendChild(s), F.appendChild(z), s.classList.add(Er.INVISIBLE), o.classList.add(Er.INVISIBLE), v.on(na.RENDERED, () => {
    setTimeout(() => {
      o.classList.remove(Er.INVISIBLE), o.classList.add(Er.VISIBLE);
    }, 100), setTimeout(() => {
      s.remove();
    }, 1);
  }), v.on(na.RESIZE, ({ width: re, height: ae }) => {
    typeof re == "number" && (F.style.width = `${re}px`), typeof ae == "number" && (F.style.height = `${ae}px`);
  }), F;
}
function tc(t) {
  return Aa.create({
    dimensions: {
      width: "100%",
      height: "100%"
    },
    tag: `wta${t}`,
    url: ({ props: o }) => o.appConfig.sdkBaseUrl,
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
function rc(t) {
  return tc(t.id)(t);
}
function nc(t) {
  return new Promise((o, s) => {
    const u = document.createElement("script");
    u.async = !0, u.src = t, u.onload = o, u.onerror = s, document.body.appendChild(u);
  });
}
let br = null;
function oa() {
  br = null;
}
function oc(t) {
  const o = window;
  return o.Go ? Promise.resolve(o.wasm) : br || (br = nc(t).then(() => o.Go), br.then(oa).catch(oa), br);
}
class Pr {
  constructor() {
    return Pr.instance ? Pr.instance : (this.session = null, this.go = null, this.buffer = null, this.audioMediaSequence = {}, Pr.instance = this, this);
  }
  async init(o) {
    if (!this.buffer) {
      const u = await (await fetch(o)).arrayBuffer();
      this.buffer = u;
    }
    return Pr.instance;
  }
  async loadSource(o) {
    this.session && (o.session = this.session);
    const s = JSON.stringify(o), u = new Go(), f = await WebAssembly.instantiate(this.buffer, u.importObject);
    u.run(f.instance);
    let v;
    for (let T = 1; T <= 3; T++)
      try {
        v = await window.loadSource(s);
        break;
      } catch (P) {
        if (console.log(`Attempt ${T} failed:`, P), T === 3)
          throw console.log("session:", this.session), P;
      }
    if (v.session != "" && (this.session = v.session), v.error)
      throw new Error(v.error);
    return v.manifest;
  }
  async getEventTracking() {
    if (this.session) {
      const o = window.getEventTracking(this.session);
      if (o.error)
        throw new Error(o.error);
      return { avails: JSON.parse(o.avails) };
    }
    return null;
  }
}
function ia({ adsUrl: t, sdk: o, loader: s }) {
  return class extends s {
    constructor(f) {
      super(f);
    }
    load(f, v, T) {
      const P = T.onSuccess;
      T.onSuccess = async (I, M, b) => {
        (b.type === "manifest" || b.type === "level" || b.type === "audioTrack") && (I.data = await this.modifyManifest(I.url, I.data, b.type)), P(I, M, b);
      }, super.load(f, v, T);
    }
    async modifyManifest(f, v, T) {
      const P = {
        proxyAds: {
          uri: t,
          timeout: 2
        }
      };
      try {
        return await o.loadSource({ config: P, manifest: v, masterUri: f });
      } catch (I) {
        return console.error("[LOG] ~ error:", I), v;
      }
    }
  };
}
function ic({
  video: t,
  adContainer: o,
  startSession: s,
  sdk: u,
  domain: f
}) {
  const v = Qu(), T = Ft(!1), P = Ft(), I = Math.random().toString(36).slice(6);
  function M({ icons: C }) {
    const D = Gr(f, "/build/dist/wta/index.html");
    return {
      id: I,
      appConfig: {
        sdkBaseUrl: bn(D || "https://localhost:4222/wta/index.html", { id: I })
      },
      icons: C
    };
  }
  if (!!o) {
    const C = rc(M({
      icons: []
    }));
    C.render(o), C.hide(), o.style.display = "none", Ou(() => {
      var D;
      if (P.value) {
        const J = ((D = P.value) == null ? void 0 : D.icons) || [];
        o.style.display = "block", C.updateProps(M({
          icons: J
        })), C.show();
      } else
        o.style.display = "none", C.hide();
    });
  }
  const F = Ft([]), z = Ft(), re = Ft([]);
  async function ae(C) {
    var J;
    const D = (J = P.value) == null ? void 0 : J.trackingEvents.find((we) => we.eventType === C);
    D && (v.trigger(D), await Promise.all(D.beaconUrls.map((we) => Xu(cu(we, {
      retry: 3,
      retryDelay: 500
    })))));
  }
  const dt = /* @__PURE__ */ new Map();
  let S, yt;
  function Ze(C, D, J) {
    C.addEventListener(D, J), dt.set(D, J);
  }
  function bt(C) {
    var Je, Ke;
    const D = ((C == null ? void 0 : C.time) || 0) > 0 ? C.time : 0, J = (Je = C == null ? void 0 : C.value) == null ? void 0 : Je.event, we = re.value.find((Re) => Re.eventType === J && !Re.tracked && !Re.skipped);
    if (!we)
      return;
    const et = we == null ? void 0 : we.ad;
    if (et)
      if (J === "start")
        P.value && re.value.filter((Qe) => Qe.key.startsWith(`${P.value.key}_`)).forEach((Qe) => Qe.skipped = !0), P.value = et, s(et.adVerifications, v), S = io(() => {
          ae("impression"), ae("start");
          const Re = re.value.find((Qe) => Qe.key === we.key.replace("_start", "_impression"));
          Re && (Re.tracked = !0), we.tracked = !0, yt = io(() => {
            P.value = void 0;
          }, 30 * 1e3);
        }, D * 1e3);
      else {
        if (!P.value)
          return;
        if (et.id !== ((Ke = P.value) == null ? void 0 : Ke.id)) {
          re.value.filter((Qe) => Qe.key.startsWith(`${P.value.key}_`)).forEach((Qe) => Qe.skipped = !0);
          return;
        }
        S = io(() => {
          ae(J), J === "complete" && et.id === P.value.id && (P.value = void 0, oo(yt)), we.tracked = !0;
        }, D * 1e3);
      }
  }
  function ur() {
    return T.value = !1, ["fullscreenchange", "webkitfullscreenchange", "mozfullscreenchange", "msfullscreenchange"].forEach((C) => {
      Ze(t, C, () => {
        const D = document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement;
        ae(D ? "fullscreen" : "exitFullscreen");
      });
    }), Ze(t, "pause", () => ae("pause")), Ze(t, "play", () => ae("resume")), Ze(t, "rewind", () => ae("rewind")), Ze(t, "mute", () => ae("mute")), Ze(t, "unmute", () => ae("unmute")), async (C, D) => {
      if (z.value = D.frag.sn, C !== window.Hls.Events.FRAG_CHANGED)
        return;
      const J = F.value.filter((we) => we.sn === D.frag.sn);
      J.length && (J.forEach((we) => bt(we)), F.value = F.value.filter((we) => we.sn !== D.frag.sn));
    };
  }
  async function Zt() {
    return u.getEventTracking().then((C) => {
      for (const D of (C == null ? void 0 : C.avails) || [])
        for (const J of D.ads) {
          const we = `${D.id}_${J.id}_${J.startTimeInSeconds}`;
          for (const et of J.trackingEvents) {
            const Je = `${we}_${et.eventType}`;
            re.value.find((Re) => Re.key === Je) || re.value.push({
              ...et,
              key: Je,
              ad: {
                ...J,
                key: we
              },
              tracked: !1
            });
          }
        }
    });
  }
  function cr() {
    return async (C, D) => {
      function J(Je) {
        for (let Ke = 0; Ke < Je.length; Ke++)
          if (Je[Ke] === 0)
            return Ke;
        return Je.length;
      }
      const { start: we, sn: et } = D.frag;
      for (let Je = 0; Je < D.samples.length; Je++) {
        const Ke = D.samples[Je], Re = Ke.data, Qe = Ke.pts;
        if (String.fromCharCode.apply(null, Re.slice(0, 3)) !== "ID3" || String.fromCharCode.apply(null, Re.slice(10, 14)) !== "TXXX")
          continue;
        const dr = Re.slice(21, Re.length), fr = J(dr), Dr = dr.slice(fr + 1, dr.length), Qt = J(Dr), Nr = new TextDecoder("utf-8").decode(Dr.slice(0, Qt)), lr = {
          sn: et,
          time: Qe - we,
          value: fo(Nr)
        };
        if (z.value && et < z.value)
          return;
        F.value.push(lr), lr.value.event === "start" && Zt();
      }
    };
  }
  function rt() {
    return (C) => {
      const D = C.track;
      D.kind === "metadata" && (D.oncuechange = async () => {
        const J = D.activeCues[0];
        if (J && J.value.data) {
          await Zt();
          const we = fo(J.value.data);
          bt({
            value: we
          });
        }
      });
    };
  }
  function ie(C, D) {
    v.on((J) => {
      (C === "*" || J.eventType === C) && D(J);
    });
  }
  function He() {
    P.value = void 0, F.value = [], re.value = [], oo(S), oo(yt), dt.forEach((C, D) => {
      t.removeEventListener(D, C);
    }), dt.clear();
  }
  function st() {
    return {
      eventTracking: F,
      trackingDataEvent: re
    };
  }
  return {
    destroy: He,
    onEventTracking: ie,
    hlsHelper: {
      createHlsFragChanged: ur,
      createHlsFragParsingMetadata: cr
    },
    videojsHelper: {
      createVideojsAddTrack: rt
    },
    getLog: st
  };
}
async function sc({ video: t, adContainer: o, adsUrl: s, baseURL: u }) {
  const f = u || "https://cdn.jsdelivr.net/gh/sigmaott/sigma-ssai-web-sdk@v1.1.1", v = Gr(f, "/build/dist/wasm_exec.js") || "https://localhost:4222/wasm_exec.js";
  await oc(v);
  const T = new Pr();
  await T.init(Gr(f, "/build/dist/sigma-cspm.wasm") || "https://localhost:4222/sigma-cspm.wasm");
  function P() {
  }
  const { onEventTracking: I, destroy: M, videojsHelper: b, hlsHelper: F, getLog: z } = ic({
    video: t,
    adContainer: o,
    trackingUrl: "",
    startSession: P,
    sdk: T,
    domain: f
  }), re = Ft(), ae = Ft();
  function dt(ie) {
    ie.config.loader = ia({ adsUrl: s, sdk: T, loader: Hls.DefaultConfig.loader }), re.value = ie;
    const He = F.createHlsFragChanged(), st = F.createHlsFragParsingMetadata();
    ie.on("hlsFragChanged", He), ie.on("hlsFragParsingMetadata", st), ie.on(Hls.Events.ERROR, (C, D) => {
      console.error("HLS Error:", C, D), D.type === window.Hls.ErrorTypes.NETWORK_ERROR ? console.error("Network Error:", D.details) : D.type === window.Hls.ErrorTypes.MEDIA_ERROR ? console.error("Media Error:", D.details) : console.error("Other Error:", D.details);
    }), ae.value = () => {
      ie.off("hlsFragChanged", He), ie.off("hlsFragParsingMetadata", st);
    };
  }
  function S(ie) {
    ie.hls.config.loader = ia({ adsUrl: s, sdk: T, loader: SigmaManager.DefaultConfig.loader }), re.value = ie.hls;
    const He = F.createHlsFragChanged(), st = F.createHlsFragParsingMetadata();
    ie.hls.on("hlsFragChanged", He), ie.hls.on("hlsFragParsingMetadata", st), ie.on(SigmaManager.Events.ERROR, (C, D) => {
      console.error("HLS Error:", C, D), D.type === window.Hls.ErrorTypes.NETWORK_ERROR ? console.error("Network Error:", D.details) : D.type === window.Hls.ErrorTypes.MEDIA_ERROR ? console.error("Media Error:", D.details) : console.error("Other Error:", D.details);
    }), ae.value = () => {
      ie.hls.destroy();
    };
  }
  const yt = Ft(), Ze = Ft(), ur = {
    instance: T,
    config: {
      proxyAds: {
        uri: s,
        timeout: 2
      }
    }
  };
  function Zt(ie) {
    yt.value = ie;
    const He = b.createVideojsAddTrack();
    ie.textTracks().on("addtrack", He), Ze.value = () => {
      ie.textTracks().off("addtrack", He);
    };
  }
  function cr(ie, He) {
    ie.getNetworkingEngine().registerRequestFilter((st, C) => {
    }), ie.getNetworkingEngine().registerResponseFilter(async (st, C) => {
      if (st === 0) {
        const D = new TextDecoder().decode(C.data), J = await T.loadSource({
          config: {
            proxyAds: {
              uri: s,
              timeout: 2e3
            }
          },
          masterUri: He,
          manifest: D
        });
        C.data = new TextEncoder().encode(J);
      }
    });
  }
  function rt() {
    var ie, He;
    M(), (ie = ae.value) == null || ie.call(ae), (He = Ze.value) == null || He.call(Ze), re.value = null, yt.value = null, ae.value = null, Ze.value = null;
  }
  return {
    onEventTracking: I,
    destroy: rt,
    sigmaPlayer: {
      attachVideojs: Zt,
      attachHls: dt,
      attachSigmaDrm: S,
      getLog: z,
      attachShaka: cr
    },
    sdk: T,
    cspm: ur
  };
}
window.videojs && (window.videojs.VERSION === "7.10.2" ? (function(t) {
  const o = t.Vhs.PlaylistLoader.prototype.setupInitialPlaylist;
  t.Vhs.PlaylistLoader.prototype.setupInitialPlaylist = async function(s) {
    if (this.vhs_.options_.cspm)
      try {
        const f = await (await fetch(this.src)).text();
        await this.vhs_.options_.cspm.instance.loadSource({
          config: this.vhs_.options_.cspm.config,
          manifest: f,
          masterUri: this.src
        });
      } catch (u) {
        console.error("Error loading source:", u);
      }
    o.apply(this, [s]);
  };
}(videojs), function(t) {
  const o = t.Vhs.PlaylistLoader.prototype.haveMetadata;
  t.Vhs.PlaylistLoader.prototype.haveMetadata = async function({
    playlistString: s,
    playlistObject: u,
    url: f,
    id: v
  }) {
    const T = this.vhs_.options_.cspm.config;
    try {
      s && this.vhs_.options_.cspm && (console.log(this.master.playlists[v].resolvedUri), s = await this.vhs_.options_.cspm.instance.loadSource({
        config: T,
        manifest: s,
        masterUri: this.master.playlists[v].resolvedUri
      })), o.apply(this, [{ playlistString: s, playlistObject: u, url: f, id: v }]);
    } catch (P) {
      console.error("Error loading source:", P);
    }
  };
}(videojs), function(t) {
  const o = (s, u, f) => s && f && f.responseURL && u !== f.responseURL ? f.responseURL : u;
  t.Vhs.PlaylistLoader.prototype.media = function(s, u) {
    if (!s)
      return this.media_;
    if (this.state === "HAVE_NOTHING")
      throw new Error("Cannot switch media playlist from " + this.state);
    if (typeof s == "string") {
      if (!this.master.playlists[s])
        throw new Error("Unknown playlist URI: " + s);
      s = this.master.playlists[s];
    }
    if (window.clearTimeout(this.finalRenditionTimeout), u) {
      const T = s.targetDuration / 2 * 1e3 || 5e3;
      this.finalRenditionTimeout = window.setTimeout(this.media.bind(this, s, !1), T);
      return;
    }
    const f = this.state, v = !this.media_ || s.id !== this.media_.id;
    if (this.master.playlists[s.id].endList || // handle the case of a playlist object (e.g., if using vhs-json with a resolved
    // media playlist or, for the case of demuxed audio, a resolved audio media group)
    s.endList && s.segments.length) {
      this.request && (this.request.onreadystatechange = null, this.request.abort(), this.request = null), this.state = "HAVE_METADATA", this.media_ = s, v && (this.trigger("mediachanging"), f === "HAVE_MASTER" ? this.trigger("loadedmetadata") : this.trigger("mediachange"));
      return;
    }
    if (v) {
      if (this.state = "SWITCHING_MEDIA", this.request) {
        if (s.resolvedUri === this.request.url)
          return;
        this.request.onreadystatechange = null, this.request.abort(), this.request = null;
      }
      this.media_ && this.trigger("mediachanging"), this.request = this.vhs_.xhr(
        {
          uri: s.resolvedUri,
          withCredentials: this.withCredentials
        },
        (T, P) => {
          if (this.request) {
            if (s.resolvedUri = o(this.handleManifestRedirects, s.resolvedUri, P), T)
              return this.playlistRequestError(this.request, s, f);
            this.haveMetadata({
              playlistString: P.responseText,
              url: s.uri,
              id: s.id
            }).then(() => {
              f === "HAVE_MASTER" ? this.trigger("loadedmetadata") : this.trigger("mediachange");
            });
          }
        }
      );
    }
  };
}(videojs)) : (function(t) {
  const o = t.Vhs.PlaylistLoader.prototype.setupInitialPlaylist;
  t.Vhs.PlaylistLoader.prototype.setupInitialPlaylist = async function(s) {
    if (s.manifestString && this.vhs_.options_.cspm)
      try {
        await this.vhs_.options_.cspm.instance.loadSource({
          config: this.vhs_.options_.cspm.config,
          manifest: s.manifestString,
          masterUri: this.src
        });
      } catch (u) {
        console.error("Error loading source:", u);
      }
    o.apply(this, [s]);
  };
}(videojs), function(t) {
  const o = t.Vhs.PlaylistLoader.prototype.parseManifest_;
  t.Vhs.PlaylistLoader.prototype.parseManifest_ = function({ url: s, manifestString: u }) {
    const f = o.apply(this, [{ url: s, manifestString: u }]);
    return f.playlists && f.playlists.length && (f.manifestString = u), f;
  };
}(videojs), function(t) {
  const o = t.Vhs.PlaylistLoader.prototype.haveMetadata;
  t.Vhs.PlaylistLoader.prototype.haveMetadata = async function({
    playlistString: s,
    playlistObject: u,
    url: f,
    id: v
  }) {
    try {
      if (s && this.vhs_.options_.cspm) {
        const T = this.vhs_.options_.cspm.config;
        s = await this.vhs_.options_.cspm.instance.loadSource({
          config: T,
          manifest: s,
          masterUri: this.main.playlists[v].resolvedUri
        });
      }
      o.apply(this, [{ playlistString: s, playlistObject: u, url: f, id: v }]);
    } catch (T) {
      console.error("Error loading source:", T);
    }
  };
}(videojs), function(t) {
  const o = (u, f) => {
    const v = u.segments || [], T = v[v.length - 1], P = T && T.parts && T.parts[T.parts.length - 1], I = P && P.duration || T && T.duration;
    return I ? I * 1e3 : (u.partTargetDuration || u.targetDuration || 10) * 500;
  }, s = (u, f) => f && f.responseURL && u !== f.responseURL ? f.responseURL : u;
  t.Vhs.PlaylistLoader.prototype.media = function(u, f) {
    if (!u)
      return this.media_;
    if (this.state === "HAVE_NOTHING")
      throw new Error(`Cannot switch media playlist from ${this.state}`);
    if (typeof u == "string") {
      if (!this.main.playlists[u])
        throw new Error(`Unknown playlist URI: ${u}`);
      u = this.main.playlists[u];
    }
    if (window.clearTimeout(this.finalRenditionTimeout), f) {
      const M = (u.partTargetDuration || u.targetDuration) / 2 * 1e3 || 5e3;
      this.finalRenditionTimeout = window.setTimeout(this.media.bind(this, u, !1), M);
      return;
    }
    const v = this.state, T = !this.media_ || u.id !== this.media_.id, P = this.main.playlists[u.id];
    if (P && P.endList || u.endList && u.segments.length) {
      this.request && (this.request.onreadystatechange = null, this.request.abort(), this.request = null), this.state = "HAVE_METADATA", this.media_ = u, T && (this.trigger("mediachanging"), v === "HAVE_MAIN_MANIFEST" ? this.trigger("loadedmetadata") : this.trigger("mediachange"));
      return;
    }
    if (this.updateMediaUpdateTimeout_(o(u)), !T)
      return;
    if (this.state = "SWITCHING_MEDIA", this.request) {
      if (u.resolvedUri === this.request.url)
        return;
      this.request.onreadystatechange = null, this.request.abort(), this.request = null;
    }
    this.media_ && this.trigger("mediachanging"), this.pendingMedia_ = u;
    const I = {
      playlistInfo: {
        type: "media",
        uri: u.uri
      }
    };
    this.trigger({ type: "playlistrequeststart", metadata: I }), this.request = this.vhs_.xhr(
      {
        uri: u.resolvedUri,
        withCredentials: this.withCredentials,
        requestType: "hls-playlist"
      },
      (M, b) => {
        if (this.request) {
          if (u.lastRequest = Date.now(), u.resolvedUri = s(u.resolvedUri, b), M)
            return this.playlistRequestError(this.request, u, v);
          this.haveMetadata({
            playlistString: b.responseText,
            url: u.uri,
            id: u.id
          }).then(() => {
            this.trigger({ type: "playlistrequestcomplete", metadata: I }), v === "HAVE_MAIN_MANIFEST" ? this.trigger("loadedmetadata") : this.trigger("mediachange");
          });
        }
      }
    );
  };
}(videojs)));
function uc(t) {
  const o = "https://dai.sigma.video/api/proxy-ads/ads/", s = mo(t), u = `${s.protocol}//${s.host}${s.pathname}`;
  if (!s.search)
    return { playerUrl: t, adsUrl: null };
  const f = js(t), v = f["sigma.dai.adsEndpoint"];
  if (!v)
    return { playerUrl: t, adsUrl: null };
  const T = {}, P = {};
  for (const [M, b] of Object.entries(f))
    M.startsWith("sigma.dai") ? M !== "sigma.dai.adsEndpoint" && (T[M.replace("sigma.dai.", "")] = b) : P[M] = b;
  return {
    playerUrl: bn(u, P),
    adsUrl: bn(Gr(o, v), T)
  };
}
export {
  sc as createSigmaDai,
  uc as processURL
};
