const ys = /#/g, Es = /&/g, bs = /\//g, Ps = /=/g, po = /\+/g, Ts = /%5e/gi, Os = /%60/gi, Rs = /%7c/gi, Ss = /%20/gi;
function xs(t) {
  return encodeURI("" + t).replace(Rs, "|");
}
function so(t) {
  return xs(typeof t == "string" ? t : JSON.stringify(t)).replace(po, "%2B").replace(Ss, "+").replace(ys, "%23").replace(Es, "%26").replace(Os, "`").replace(Ts, "^").replace(bs, "%2F");
}
function ro(t) {
  return so(t).replace(Ps, "%3D");
}
function ia(t = "") {
  try {
    return decodeURIComponent("" + t);
  } catch {
    return "" + t;
  }
}
function Ds(t) {
  return ia(t.replace(po, " "));
}
function Ns(t) {
  return ia(t.replace(po, " "));
}
function aa(t = "") {
  const i = {};
  t[0] === "?" && (t = t.slice(1));
  for (const s of t.split("&")) {
    const c = s.match(/([^=]+)=?(.*)/) || [];
    if (c.length < 2)
      continue;
    const f = Ds(c[1]);
    if (f === "__proto__" || f === "constructor")
      continue;
    const m = Ns(c[2] || "");
    i[f] === void 0 ? i[f] = m : Array.isArray(i[f]) ? i[f].push(m) : i[f] = [i[f], m];
  }
  return i;
}
function Cs(t, i) {
  return (typeof i == "number" || typeof i == "boolean") && (i = String(i)), i ? Array.isArray(i) ? i.map((s) => `${ro(t)}=${so(s)}`).join("&") : `${ro(t)}=${so(i)}` : ro(t);
}
function Is(t) {
  return Object.keys(t).filter((i) => t[i] !== void 0).map((i) => Cs(i, t[i])).filter(Boolean).join("&");
}
const As = /^[\s\w\0+.-]{2,}:([/\\]{1,2})/, Ws = /^[\s\w\0+.-]{2,}:([/\\]{2})?/, _s = /^([/\\]\s*){2,}[^/\\]/, Ms = /^\.?\//;
function sa(t, i = {}) {
  return typeof i == "boolean" && (i = { acceptRelative: i }), i.strict ? As.test(t) : Ws.test(t) || (i.acceptRelative ? _s.test(t) : !1);
}
function Fs(t = "", i) {
  return t.endsWith("/");
}
function zs(t = "", i) {
  return (Fs(t) ? t.slice(0, -1) : t) || "/";
}
function Ls(t = "", i) {
  return t.endsWith("/") ? t : t + "/";
}
function js(t, i) {
  if (Bs(i) || sa(t))
    return t;
  const s = zs(i);
  return t.startsWith(s) ? t : ua(s, t);
}
function yn(t, i) {
  const s = vo(t), c = { ...aa(s.search), ...i };
  return s.search = Is(c), qs(s);
}
function Us(t) {
  return aa(vo(t).search);
}
function Bs(t) {
  return !t || t === "/";
}
function $s(t) {
  return t && t !== "/";
}
function ua(t, ...i) {
  let s = t || "";
  for (const c of i.filter((f) => $s(f)))
    if (s) {
      const f = c.replace(Ms, "");
      s = Ls(s) + f;
    } else
      s = c;
  return s;
}
const ca = Symbol.for("ufo:protocolRelative");
function vo(t = "", i) {
  const s = t.match(
    /^[\s\0]*(blob:|data:|javascript:|vbscript:)(.*)/i
  );
  if (s) {
    const [, M, _ = ""] = s;
    return {
      protocol: M.toLowerCase(),
      pathname: _,
      href: M + _,
      auth: "",
      host: "",
      search: "",
      hash: ""
    };
  }
  if (!sa(t, { acceptRelative: !0 }))
    return qi(t);
  const [, c = "", f, m = ""] = t.replace(/\\/g, "/").match(/^[\s\0]*([\w+.-]{2,}:)?\/\/([^/@]+@)?(.*)/) || [];
  let [, P = "", T = ""] = m.match(/([^#/?]*)(.*)?/) || [];
  c === "file:" && (T = T.replace(/\/(?=[A-Za-z]:)/, ""));
  const { pathname: D, search: C, hash: g } = qi(T);
  return {
    protocol: c.toLowerCase(),
    auth: f ? f.slice(0, Math.max(0, f.length - 1)) : "",
    host: P,
    pathname: D,
    search: C,
    hash: g,
    [ca]: !c
  };
}
function qi(t = "") {
  const [i = "", s = "", c = ""] = (t.match(/([^#?]*)(\?[^#]*)?(#.*)?/) || []).splice(1);
  return {
    pathname: i,
    search: s,
    hash: c
  };
}
function qs(t) {
  const i = t.pathname || "", s = t.search ? (t.search.startsWith("?") ? "" : "?") + t.search : "", c = t.hash || "", f = t.auth ? t.auth + "@" : "", m = t.host || "";
  return (t.protocol || t[ca] ? (t.protocol || "") + "//" : "") + f + m + i + s + c;
}
const Hs = /"(?:_|\\u0{2}5[Ff]){2}(?:p|\\u0{2}70)(?:r|\\u0{2}72)(?:o|\\u0{2}6[Ff])(?:t|\\u0{2}74)(?:o|\\u0{2}6[Ff])(?:_|\\u0{2}5[Ff]){2}"\s*:/, Vs = /"(?:c|\\u0063)(?:o|\\u006[Ff])(?:n|\\u006[Ee])(?:s|\\u0073)(?:t|\\u0074)(?:r|\\u0072)(?:u|\\u0075)(?:c|\\u0063)(?:t|\\u0074)(?:o|\\u006[Ff])(?:r|\\u0072)"\s*:/, Gs = /^\s*["[{]|^\s*-?\d{1,16}(\.\d{1,17})?([Ee][+-]?\d+)?\s*$/;
function Js(t, i) {
  if (t === "__proto__" || t === "constructor" && i && typeof i == "object" && "prototype" in i) {
    Ks(t);
    return;
  }
  return i;
}
function Ks(t) {
  console.warn(`[destr] Dropping "${t}" key to prevent prototype pollution.`);
}
function uo(t, i = {}) {
  if (typeof t != "string")
    return t;
  const s = t.trim();
  if (
    // eslint-disable-next-line unicorn/prefer-at
    t[0] === '"' && t.endsWith('"') && !t.includes("\\")
  )
    return s.slice(1, -1);
  if (s.length <= 9) {
    const c = s.toLowerCase();
    if (c === "true")
      return !0;
    if (c === "false")
      return !1;
    if (c === "undefined")
      return;
    if (c === "null")
      return null;
    if (c === "nan")
      return Number.NaN;
    if (c === "infinity")
      return Number.POSITIVE_INFINITY;
    if (c === "-infinity")
      return Number.NEGATIVE_INFINITY;
  }
  if (!Gs.test(t)) {
    if (i.strict)
      throw new SyntaxError("[destr] Invalid JSON");
    return t;
  }
  try {
    if (Hs.test(t) || Vs.test(t)) {
      if (i.strict)
        throw new Error("[destr] Possible prototype pollution");
      return JSON.parse(t, Js);
    }
    return JSON.parse(t);
  } catch (c) {
    if (i.strict)
      throw c;
    return t;
  }
}
class Ys extends Error {
  constructor(i, s) {
    super(i, s), this.name = "FetchError", s != null && s.cause && !this.cause && (this.cause = s.cause);
  }
}
function Zs(t) {
  var D, C, g, M, _;
  const i = ((D = t.error) == null ? void 0 : D.message) || ((C = t.error) == null ? void 0 : C.toString()) || "", s = ((g = t.request) == null ? void 0 : g.method) || ((M = t.options) == null ? void 0 : M.method) || "GET", c = ((_ = t.request) == null ? void 0 : _.url) || String(t.request) || "/", f = `[${s}] ${JSON.stringify(c)}`, m = t.response ? `${t.response.status} ${t.response.statusText}` : "<no response>", P = `${f}: ${m}${i ? ` ${i}` : ""}`, T = new Ys(
    P,
    t.error ? { cause: t.error } : void 0
  );
  for (const re of ["request", "options", "response"])
    Object.defineProperty(T, re, {
      get() {
        return t[re];
      }
    });
  for (const [re, Re] of [
    ["data", "_data"],
    ["status", "status"],
    ["statusCode", "status"],
    ["statusText", "statusText"],
    ["statusMessage", "statusText"]
  ])
    Object.defineProperty(T, re, {
      get() {
        return t.response && t.response[Re];
      }
    });
  return T;
}
const Qs = new Set(
  Object.freeze(["PATCH", "POST", "PUT", "DELETE"])
);
function Hi(t = "GET") {
  return Qs.has(t.toUpperCase());
}
function Xs(t) {
  if (t === void 0)
    return !1;
  const i = typeof t;
  return i === "string" || i === "number" || i === "boolean" || i === null ? !0 : i !== "object" ? !1 : Array.isArray(t) ? !0 : t.buffer ? !1 : t.constructor && t.constructor.name === "Object" || typeof t.toJSON == "function";
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
  const i = t.split(";").shift() || "";
  return eu.test(i) ? "json" : ks.has(i) || i.startsWith("text/") ? "text" : "blob";
}
function ru(t, i, s = globalThis.Headers) {
  const c = {
    ...i,
    ...t
  };
  if (i != null && i.params && (t != null && t.params) && (c.params = {
    ...i == null ? void 0 : i.params,
    ...t == null ? void 0 : t.params
  }), i != null && i.query && (t != null && t.query) && (c.query = {
    ...i == null ? void 0 : i.query,
    ...t == null ? void 0 : t.query
  }), i != null && i.headers && (t != null && t.headers)) {
    c.headers = new s((i == null ? void 0 : i.headers) || {});
    for (const [f, m] of new s((t == null ? void 0 : t.headers) || {}))
      c.headers.set(f, m);
  }
  return c;
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
    fetch: i = globalThis.fetch,
    Headers: s = globalThis.Headers,
    AbortController: c = globalThis.AbortController
  } = t;
  async function f(T) {
    const D = T.error && T.error.name === "AbortError" && !T.options.timeout || !1;
    if (T.options.retry !== !1 && !D) {
      let g;
      typeof T.options.retry == "number" ? g = T.options.retry : g = Hi(T.options.method) ? 0 : 1;
      const M = T.response && T.response.status || 500;
      if (g > 0 && (Array.isArray(T.options.retryStatusCodes) ? T.options.retryStatusCodes.includes(M) : nu.has(M))) {
        const _ = T.options.retryDelay || 0;
        return _ > 0 && await new Promise((re) => setTimeout(re, _)), m(T.request, {
          ...T.options,
          retry: g - 1
        });
      }
    }
    const C = Zs(T);
    throw Error.captureStackTrace && Error.captureStackTrace(C, m), C;
  }
  const m = async function(D, C = {}) {
    var re;
    const g = {
      request: D,
      options: ru(C, t.defaults, s),
      response: void 0,
      error: void 0
    };
    g.options.method = (re = g.options.method) == null ? void 0 : re.toUpperCase(), g.options.onRequest && await g.options.onRequest(g), typeof g.request == "string" && (g.options.baseURL && (g.request = js(g.request, g.options.baseURL)), (g.options.query || g.options.params) && (g.request = yn(g.request, {
      ...g.options.params,
      ...g.options.query
    }))), g.options.body && Hi(g.options.method) && (Xs(g.options.body) ? (g.options.body = typeof g.options.body == "string" ? g.options.body : JSON.stringify(g.options.body), g.options.headers = new s(g.options.headers || {}), g.options.headers.has("content-type") || g.options.headers.set("content-type", "application/json"), g.options.headers.has("accept") || g.options.headers.set("accept", "application/json")) : (
      // ReadableStream Body
      ("pipeTo" in g.options.body && typeof g.options.body.pipeTo == "function" || // Node.js Stream Body
      typeof g.options.body.pipe == "function") && ("duplex" in g.options || (g.options.duplex = "half"))
    ));
    let M;
    if (!g.options.signal && g.options.timeout) {
      const Re = new c();
      M = setTimeout(
        () => Re.abort(),
        g.options.timeout
      ), g.options.signal = Re.signal;
    }
    try {
      g.response = await i(
        g.request,
        g.options
      );
    } catch (Re) {
      return g.error = Re, g.options.onRequestError && await g.options.onRequestError(g), await f(g);
    } finally {
      M && clearTimeout(M);
    }
    if (g.response.body && !ou.has(g.response.status) && g.options.method !== "HEAD") {
      const Re = (g.options.parseResponse ? "json" : g.options.responseType) || tu(g.response.headers.get("content-type") || "");
      switch (Re) {
        case "json": {
          const Qe = await g.response.text(), R = g.options.parseResponse || uo;
          g.response._data = R(Qe);
          break;
        }
        case "stream": {
          g.response._data = g.response.body;
          break;
        }
        default:
          g.response._data = await g.response[Re]();
      }
    }
    return g.options.onResponse && await g.options.onResponse(g), !g.options.ignoreResponseError && g.response.status >= 400 && g.response.status < 600 ? (g.options.onResponseError && await g.options.onResponseError(g), await f(g)) : g.response;
  }, P = async function(D, C) {
    return (await m(D, C))._data;
  };
  return P.raw = m, P.native = (...T) => i(...T), P.create = (T = {}) => da({
    ...t,
    defaults: {
      ...t.defaults,
      ...T
    }
  }), P;
}
const wo = function() {
  if (typeof globalThis < "u")
    return globalThis;
  if (typeof self < "u")
    return self;
  if (typeof window < "u")
    return window;
  if (typeof global < "u")
    return global;
  throw new Error("unable to locate global object");
}(), iu = wo.fetch || (() => Promise.reject(new Error("[ofetch] global.fetch is not supported!"))), au = wo.Headers, su = wo.AbortController, uu = da({ fetch: iu, Headers: au, AbortController: su }), cu = uu.create({
  credentials: "omit",
  onResponseError({ response: t, error: i }) {
    console.log("[LOG] ~ error:", i);
  },
  onRequest: ({ options: t, request: i }) => {
    const s = t.token;
    s && (t.headers = t.headers || {}, t.headers.Authorization = `${s}`);
  },
  onResponse({ response: t, options: i }) {
  }
}), du = (t) => (i, s) => (t.set(i, s), s), Vi = Number.MAX_SAFE_INTEGER === void 0 ? 9007199254740991 : Number.MAX_SAFE_INTEGER, fa = 536870912, Gi = fa * 2, fu = (t, i) => (s) => {
  const c = i.get(s);
  let f = c === void 0 ? s.size : c < Gi ? c + 1 : 0;
  if (!s.has(f))
    return t(s, f);
  if (s.size < fa) {
    for (; s.has(f); )
      f = Math.floor(Math.random() * Gi);
    return t(s, f);
  }
  if (s.size > Vi)
    throw new Error("Congratulations, you created a collection of unique numbers which uses all available integers!");
  for (; s.has(f); )
    f = Math.floor(Math.random() * Vi);
  return t(s, f);
}, la = /* @__PURE__ */ new WeakMap(), lu = du(la), hn = fu(lu, la), hu = (t) => t.method !== void 0 && t.method === "call", pu = (t) => typeof t.id == "number" && typeof t.result == "boolean", vu = (t) => {
  const i = /* @__PURE__ */ new Map([[0, () => {
  }]]), s = /* @__PURE__ */ new Map([[0, () => {
  }]]), c = /* @__PURE__ */ new Map(), f = new Worker(t);
  return f.addEventListener("message", ({ data: C }) => {
    if (hu(C)) {
      const { params: { timerId: g, timerType: M } } = C;
      if (M === "interval") {
        const _ = i.get(g);
        if (typeof _ === void 0)
          throw new Error("The timer is in an undefined state.");
        if (typeof _ == "number") {
          const re = c.get(_);
          if (re === void 0 || re.timerId !== g || re.timerType !== M)
            throw new Error("The timer is in an undefined state.");
        } else typeof _ == "function" && _();
      } else if (M === "timeout") {
        const _ = s.get(g);
        if (typeof _ === void 0)
          throw new Error("The timer is in an undefined state.");
        if (typeof _ == "number") {
          const re = c.get(_);
          if (re === void 0 || re.timerId !== g || re.timerType !== M)
            throw new Error("The timer is in an undefined state.");
        } else typeof _ == "function" && (_(), s.delete(g));
      }
    } else if (pu(C)) {
      const { id: g } = C, M = c.get(g);
      if (M === void 0)
        throw new Error("The timer is in an undefined state.");
      const { timerId: _, timerType: re } = M;
      c.delete(g), re === "interval" ? i.delete(_) : s.delete(_);
    } else {
      const { error: { message: g } } = C;
      throw new Error(g);
    }
  }), {
    clearInterval: (C) => {
      if (typeof i.get(C) == "function") {
        const g = hn(c);
        c.set(g, { timerId: C, timerType: "interval" }), i.set(C, g), f.postMessage({
          id: g,
          method: "clear",
          params: { timerId: C, timerType: "interval" }
        });
      }
    },
    clearTimeout: (C) => {
      if (typeof s.get(C) == "function") {
        const g = hn(c);
        c.set(g, { timerId: C, timerType: "timeout" }), s.set(C, g), f.postMessage({
          id: g,
          method: "clear",
          params: { timerId: C, timerType: "timeout" }
        });
      }
    },
    setInterval: (C, g = 0, ...M) => {
      const _ = hn(i);
      return i.set(_, () => {
        C(...M), typeof i.get(_) == "function" && f.postMessage({
          id: null,
          method: "set",
          params: {
            delay: g,
            now: performance.timeOrigin + performance.now(),
            timerId: _,
            timerType: "interval"
          }
        });
      }), f.postMessage({
        id: null,
        method: "set",
        params: {
          delay: g,
          now: performance.timeOrigin + performance.now(),
          timerId: _,
          timerType: "interval"
        }
      }), _;
    },
    setTimeout: (C, g = 0, ...M) => {
      const _ = hn(s);
      return s.set(_, () => C(...M)), f.postMessage({
        id: null,
        method: "set",
        params: {
          delay: g,
          now: performance.timeOrigin + performance.now(),
          timerId: _,
          timerType: "timeout"
        }
      }), _;
    }
  };
}, wu = (t, i) => {
  let s = null;
  return () => {
    if (s !== null)
      return s;
    const c = new Blob([i], { type: "application/javascript; charset=utf-8" }), f = URL.createObjectURL(c);
    return s = t(f), setTimeout(() => URL.revokeObjectURL(f)), s;
  };
}, mu = `(()=>{"use strict";const e=new Map,t=new Map,r=t=>{const r=e.get(t);return void 0!==r&&(clearTimeout(r),e.delete(t),!0)},s=e=>{const r=t.get(e);return void 0!==r&&(clearTimeout(r),t.delete(e),!0)},o=(e,t)=>{const r=performance.now(),s=e+t-r-performance.timeOrigin;return{expected:r+s,remainingDelay:s}},i=(e,t,r,s)=>{const o=r-performance.now();o>0?e.set(t,setTimeout(i,o,e,t,r,s)):(e.delete(t),postMessage({id:null,method:"call",params:{timerId:t,timerType:s}}))};addEventListener("message",(n=>{let{data:a}=n;try{if("clear"===a.method){const{id:e,params:{timerId:t,timerType:o}}=a;if("interval"===o)postMessage({id:e,result:r(t)});else{if("timeout"!==o)throw new Error('The given type "'.concat(o,'" is not supported'));postMessage({id:e,result:s(t)})}}else{if("set"!==a.method)throw new Error('The given method "'.concat(a.method,'" is not supported'));{const{params:{delay:r,now:s,timerId:n,timerType:m}}=a;if("interval"===m)((t,r,s)=>{const{expected:n,remainingDelay:a}=o(t,s);e.set(r,setTimeout(i,a,e,r,n,"interval"))})(r,n,s);else{if("timeout"!==m)throw new Error('The given type "'.concat(m,'" is not supported'));((e,r,s)=>{const{expected:n,remainingDelay:a}=o(e,s);t.set(r,setTimeout(i,a,t,r,n,"timeout"))})(r,n,s)}}}}catch(e){postMessage({error:{message:e.message},id:a.id,result:null})}}))})();`, ha = wu(vu, mu), Ji = (t) => ha().clearTimeout(t), no = (...t) => ha().setTimeout(...t);
/**
* @vue/shared v3.5.1
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
/*! #__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function gu(t, i) {
  const s = new Set(t.split(","));
  return (c) => s.has(c);
}
const Ki = Object.assign, yu = Object.prototype.hasOwnProperty, co = (t, i) => yu.call(t, i), Pr = Array.isArray, Br = (t) => pa(t) === "[object Map]", Eu = (t) => typeof t == "string", Hr = (t) => typeof t == "symbol", bn = (t) => t !== null && typeof t == "object", bu = Object.prototype.toString, pa = (t) => bu.call(t), va = (t) => pa(t).slice(8, -1), mo = (t) => Eu(t) && t !== "NaN" && t[0] !== "-" && "" + parseInt(t, 10) === t, Pu = (t) => {
  const i = /* @__PURE__ */ Object.create(null);
  return (s) => i[s] || (i[s] = t(s));
}, Tu = Pu((t) => t.charAt(0).toUpperCase() + t.slice(1)), Sr = (t, i) => !Object.is(t, i);
var He = {};
function Or(t, ...i) {
  console.warn(`[Vue warn] ${t}`, ...i);
}
let le;
const oo = /* @__PURE__ */ new WeakSet();
class Yi {
  constructor(i) {
    this.fn = i, this.deps = void 0, this.depsTail = void 0, this.flags = 5, this.nextEffect = void 0, this.cleanup = void 0, this.scheduler = void 0;
  }
  pause() {
    this.flags |= 64;
  }
  resume() {
    this.flags & 64 && (this.flags &= -65, oo.has(this) && (oo.delete(this), this.trigger()));
  }
  /**
   * @internal
   */
  notify() {
    this.flags & 2 && !(this.flags & 32) || this.flags & 8 || (this.flags |= 8, this.nextEffect = $r, $r = this);
  }
  run() {
    if (!(this.flags & 1))
      return this.fn();
    this.flags |= 2, Zi(this), ma(this);
    const i = le, s = Rt;
    le = this, Rt = !0;
    try {
      return this.fn();
    } finally {
      He.NODE_ENV !== "production" && le !== this && Or(
        "Active effect was not restored correctly - this is likely a Vue internal bug."
      ), ga(this), le = i, Rt = s, this.flags &= -3;
    }
  }
  stop() {
    if (this.flags & 1) {
      for (let i = this.deps; i; i = i.nextDep)
        Eo(i);
      this.deps = this.depsTail = void 0, Zi(this), this.onStop && this.onStop(), this.flags &= -2;
    }
  }
  trigger() {
    this.flags & 64 ? oo.add(this) : this.scheduler ? this.scheduler() : this.runIfDirty();
  }
  /**
   * @internal
   */
  runIfDirty() {
    fo(this) && this.run();
  }
  get dirty() {
    return fo(this);
  }
}
let wa = 0, $r;
function go() {
  wa++;
}
function yo() {
  if (--wa > 0)
    return;
  let t;
  for (; $r; ) {
    let i = $r;
    for ($r = void 0; i; ) {
      const s = i.nextEffect;
      if (i.nextEffect = void 0, i.flags &= -9, i.flags & 1)
        try {
          i.trigger();
        } catch (c) {
          t || (t = c);
        }
      i = s;
    }
  }
  if (t) throw t;
}
function ma(t) {
  for (let i = t.deps; i; i = i.nextDep)
    i.version = -1, i.prevActiveLink = i.dep.activeLink, i.dep.activeLink = i;
}
function ga(t) {
  let i, s = t.depsTail;
  for (let c = s; c; c = c.prevDep)
    c.version === -1 ? (c === s && (s = c.prevDep), Eo(c), Ru(c)) : i = c, c.dep.activeLink = c.prevActiveLink, c.prevActiveLink = void 0;
  t.deps = i, t.depsTail = s;
}
function fo(t) {
  for (let i = t.deps; i; i = i.nextDep)
    if (i.dep.version !== i.version || i.dep.computed && Ou(i.dep.computed) === !1 || i.dep.version !== i.version)
      return !0;
  return !!t._dirty;
}
function Ou(t) {
  if (t.flags & 2)
    return !1;
  if (t.flags & 4 && !(t.flags & 16) || (t.flags &= -17, t.globalVersion === En))
    return;
  t.globalVersion = En;
  const i = t.dep;
  if (t.flags |= 2, i.version > 0 && !t.isSSR && !fo(t)) {
    t.flags &= -3;
    return;
  }
  const s = le, c = Rt;
  le = t, Rt = !0;
  try {
    ma(t);
    const f = t.fn();
    (i.version === 0 || Sr(f, t._value)) && (t._value = f, i.version++);
  } catch (f) {
    throw i.version++, f;
  } finally {
    le = s, Rt = c, ga(t), t.flags &= -3;
  }
}
function Eo(t) {
  const { dep: i, prevSub: s, nextSub: c } = t;
  if (s && (s.nextSub = c, t.prevSub = void 0), c && (c.prevSub = s, t.nextSub = void 0), i.subs === t && (i.subs = s), !i.subs && i.computed) {
    i.computed.flags &= -5;
    for (let f = i.computed.deps; f; f = f.nextDep)
      Eo(f);
  }
}
function Ru(t) {
  const { prevDep: i, nextDep: s } = t;
  i && (i.nextDep = s, t.prevDep = void 0), s && (s.prevDep = i, t.nextDep = void 0);
}
function Su(t, i) {
  t.effect instanceof Yi && (t = t.effect.fn);
  const s = new Yi(t);
  try {
    s.run();
  } catch (f) {
    throw s.stop(), f;
  }
  const c = s.run.bind(s);
  return c.effect = s, c;
}
let Rt = !0;
const ya = [];
function xu() {
  ya.push(Rt), Rt = !1;
}
function Du() {
  const t = ya.pop();
  Rt = t === void 0 ? !0 : t;
}
function Zi(t) {
  const { cleanup: i } = t;
  if (t.cleanup = void 0, i) {
    const s = le;
    le = void 0;
    try {
      i();
    } finally {
      le = s;
    }
  }
}
let En = 0;
class Ea {
  constructor(i) {
    this.computed = i, this.version = 0, this.activeLink = void 0, this.subs = void 0, He.NODE_ENV !== "production" && (this.subsHead = void 0);
  }
  track(i) {
    if (!le || !Rt)
      return;
    let s = this.activeLink;
    if (s === void 0 || s.sub !== le)
      s = this.activeLink = {
        dep: this,
        sub: le,
        version: this.version,
        nextDep: void 0,
        prevDep: void 0,
        nextSub: void 0,
        prevSub: void 0,
        prevActiveLink: void 0
      }, le.deps ? (s.prevDep = le.depsTail, le.depsTail.nextDep = s, le.depsTail = s) : le.deps = le.depsTail = s, le.flags & 4 && ba(s);
    else if (s.version === -1 && (s.version = this.version, s.nextDep)) {
      const c = s.nextDep;
      c.prevDep = s.prevDep, s.prevDep && (s.prevDep.nextDep = c), s.prevDep = le.depsTail, s.nextDep = void 0, le.depsTail.nextDep = s, le.depsTail = s, le.deps === s && (le.deps = c);
    }
    return He.NODE_ENV !== "production" && le.onTrack && le.onTrack(
      Ki(
        {
          effect: le
        },
        i
      )
    ), s;
  }
  trigger(i) {
    this.version++, En++, this.notify(i);
  }
  notify(i) {
    go();
    try {
      if (He.NODE_ENV !== "production")
        for (let s = this.subsHead; s; s = s.nextSub)
          He.NODE_ENV !== "production" && s.sub.onTrigger && !(s.sub.flags & 8) && s.sub.onTrigger(
            Ki(
              {
                effect: s.sub
              },
              i
            )
          );
      for (let s = this.subs; s; s = s.prevSub)
        s.sub.notify();
    } finally {
      yo();
    }
  }
}
function ba(t) {
  const i = t.dep.computed;
  if (i && !t.dep.subs) {
    i.flags |= 20;
    for (let c = i.deps; c; c = c.nextDep)
      ba(c);
  }
  const s = t.dep.subs;
  s !== t && (t.prevSub = s, s && (s.nextSub = t)), He.NODE_ENV !== "production" && t.dep.subsHead === void 0 && (t.dep.subsHead = t), t.dep.subs = t;
}
const lo = /* @__PURE__ */ new WeakMap(), ur = Symbol(
  He.NODE_ENV !== "production" ? "Object iterate" : ""
), ho = Symbol(
  He.NODE_ENV !== "production" ? "Map keys iterate" : ""
), qr = Symbol(
  He.NODE_ENV !== "production" ? "Array iterate" : ""
);
function dt(t, i, s) {
  if (Rt && le) {
    let c = lo.get(t);
    c || lo.set(t, c = /* @__PURE__ */ new Map());
    let f = c.get(s);
    f || c.set(s, f = new Ea()), He.NODE_ENV !== "production" ? f.track({
      target: t,
      type: i,
      key: s
    }) : f.track();
  }
}
function Yt(t, i, s, c, f, m) {
  const P = lo.get(t);
  if (!P) {
    En++;
    return;
  }
  let T = [];
  if (i === "clear")
    T = [...P.values()];
  else {
    const D = Pr(t), C = D && mo(s);
    if (D && s === "length") {
      const g = Number(c);
      P.forEach((M, _) => {
        (_ === "length" || _ === qr || !Hr(_) && _ >= g) && T.push(M);
      });
    } else {
      const g = (M) => M && T.push(M);
      switch (s !== void 0 && g(P.get(s)), C && g(P.get(qr)), i) {
        case "add":
          D ? C && g(P.get("length")) : (g(P.get(ur)), Br(t) && g(P.get(ho)));
          break;
        case "delete":
          D || (g(P.get(ur)), Br(t) && g(P.get(ho)));
          break;
        case "set":
          Br(t) && g(P.get(ur));
          break;
      }
    }
  }
  go();
  for (const D of T)
    He.NODE_ENV !== "production" ? D.trigger({
      target: t,
      type: i,
      key: s,
      newValue: c,
      oldValue: f,
      oldTarget: m
    }) : D.trigger();
  yo();
}
function gr(t) {
  const i = he(t);
  return i === t ? i : (dt(i, "iterate", qr), Zt(t) ? i : i.map(st));
}
function bo(t) {
  return dt(t = he(t), "iterate", qr), t;
}
const Nu = {
  __proto__: null,
  [Symbol.iterator]() {
    return io(this, Symbol.iterator, st);
  },
  concat(...t) {
    return gr(this).concat(
      ...t.map((i) => Pr(i) ? gr(i) : i)
    );
  },
  entries() {
    return io(this, "entries", (t) => (t[1] = st(t[1]), t));
  },
  every(t, i) {
    return zt(this, "every", t, i, void 0, arguments);
  },
  filter(t, i) {
    return zt(this, "filter", t, i, (s) => s.map(st), arguments);
  },
  find(t, i) {
    return zt(this, "find", t, i, st, arguments);
  },
  findIndex(t, i) {
    return zt(this, "findIndex", t, i, void 0, arguments);
  },
  findLast(t, i) {
    return zt(this, "findLast", t, i, st, arguments);
  },
  findLastIndex(t, i) {
    return zt(this, "findLastIndex", t, i, void 0, arguments);
  },
  // flat, flatMap could benefit from ARRAY_ITERATE but are not straight-forward to implement
  forEach(t, i) {
    return zt(this, "forEach", t, i, void 0, arguments);
  },
  includes(...t) {
    return ao(this, "includes", t);
  },
  indexOf(...t) {
    return ao(this, "indexOf", t);
  },
  join(t) {
    return gr(this).join(t);
  },
  // keys() iterator only reads `length`, no optimisation required
  lastIndexOf(...t) {
    return ao(this, "lastIndexOf", t);
  },
  map(t, i) {
    return zt(this, "map", t, i, void 0, arguments);
  },
  pop() {
    return Ur(this, "pop");
  },
  push(...t) {
    return Ur(this, "push", t);
  },
  reduce(t, ...i) {
    return Qi(this, "reduce", t, i);
  },
  reduceRight(t, ...i) {
    return Qi(this, "reduceRight", t, i);
  },
  shift() {
    return Ur(this, "shift");
  },
  // slice could use ARRAY_ITERATE but also seems to beg for range tracking
  some(t, i) {
    return zt(this, "some", t, i, void 0, arguments);
  },
  splice(...t) {
    return Ur(this, "splice", t);
  },
  toReversed() {
    return gr(this).toReversed();
  },
  toSorted(t) {
    return gr(this).toSorted(t);
  },
  toSpliced(...t) {
    return gr(this).toSpliced(...t);
  },
  unshift(...t) {
    return Ur(this, "unshift", t);
  },
  values() {
    return io(this, "values", st);
  }
};
function io(t, i, s) {
  const c = bo(t), f = c[i]();
  return c !== t && !Zt(t) && (f._next = f.next, f.next = () => {
    const m = f._next();
    return m.value && (m.value = s(m.value)), m;
  }), f;
}
const Cu = Array.prototype;
function zt(t, i, s, c, f, m) {
  const P = bo(t), T = P !== t && !Zt(t), D = P[i];
  if (D !== Cu[i]) {
    const M = D.apply(t, m);
    return T ? st(M) : M;
  }
  let C = s;
  P !== t && (T ? C = function(M, _) {
    return s.call(this, st(M), _, t);
  } : s.length > 2 && (C = function(M, _) {
    return s.call(this, M, _, t);
  }));
  const g = D.call(P, C, c);
  return T && f ? f(g) : g;
}
function Qi(t, i, s, c) {
  const f = bo(t);
  let m = s;
  return f !== t && (Zt(t) ? s.length > 3 && (m = function(P, T, D) {
    return s.call(this, P, T, D, t);
  }) : m = function(P, T, D) {
    return s.call(this, P, st(T), D, t);
  }), f[i](m, ...c);
}
function ao(t, i, s) {
  const c = he(t);
  dt(c, "iterate", qr);
  const f = c[i](...s);
  return (f === -1 || f === !1) && Ku(s[0]) ? (s[0] = he(s[0]), c[i](...s)) : f;
}
function Ur(t, i, s = []) {
  xu(), go();
  const c = he(t)[i].apply(t, s);
  return yo(), Du(), c;
}
const Iu = /* @__PURE__ */ gu("__proto__,__v_isRef,__isVue"), Pa = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((t) => t !== "arguments" && t !== "caller").map((t) => Symbol[t]).filter(Hr)
);
function Au(t) {
  Hr(t) || (t = String(t));
  const i = he(this);
  return dt(i, "has", t), i.hasOwnProperty(t);
}
class Ta {
  constructor(i = !1, s = !1) {
    this._isReadonly = i, this._isShallow = s;
  }
  get(i, s, c) {
    const f = this._isReadonly, m = this._isShallow;
    if (s === "__v_isReactive")
      return !f;
    if (s === "__v_isReadonly")
      return f;
    if (s === "__v_isShallow")
      return m;
    if (s === "__v_raw")
      return c === (f ? m ? Vu : xa : m ? Hu : Sa).get(i) || // receiver is not the reactive proxy, but has the same prototype
      // this means the receiver is a user proxy of the reactive proxy
      Object.getPrototypeOf(i) === Object.getPrototypeOf(c) ? i : void 0;
    const P = Pr(i);
    if (!f) {
      let D;
      if (P && (D = Nu[s]))
        return D;
      if (s === "hasOwnProperty")
        return Au;
    }
    const T = Reflect.get(
      i,
      s,
      // if this is a proxy wrapping a ref, return methods using the raw ref
      // as receiver so that we don't have to call `toRaw` on the ref in all
      // its class methods
      Tr(i) ? i : c
    );
    return (Hr(s) ? Pa.has(s) : Iu(s)) || (f || dt(i, "get", s), m) ? T : Tr(T) ? P && mo(s) ? T : T.value : bn(T) ? f ? Na(T) : Da(T) : T;
  }
}
class Wu extends Ta {
  constructor(i = !1) {
    super(!1, i);
  }
  set(i, s, c, f) {
    let m = i[s];
    if (!this._isShallow) {
      const D = Rr(m);
      if (!Zt(c) && !Rr(c) && (m = he(m), c = he(c)), !Pr(i) && Tr(m) && !Tr(c))
        return D ? !1 : (m.value = c, !0);
    }
    const P = Pr(i) && mo(s) ? Number(s) < i.length : co(i, s), T = Reflect.set(
      i,
      s,
      c,
      Tr(i) ? i : f
    );
    return i === he(f) && (P ? Sr(c, m) && Yt(i, "set", s, c, m) : Yt(i, "add", s, c)), T;
  }
  deleteProperty(i, s) {
    const c = co(i, s), f = i[s], m = Reflect.deleteProperty(i, s);
    return m && c && Yt(i, "delete", s, void 0, f), m;
  }
  has(i, s) {
    const c = Reflect.has(i, s);
    return (!Hr(s) || !Pa.has(s)) && dt(i, "has", s), c;
  }
  ownKeys(i) {
    return dt(
      i,
      "iterate",
      Pr(i) ? "length" : ur
    ), Reflect.ownKeys(i);
  }
}
class _u extends Ta {
  constructor(i = !1) {
    super(!0, i);
  }
  set(i, s) {
    return He.NODE_ENV !== "production" && Or(
      `Set operation on key "${String(s)}" failed: target is readonly.`,
      i
    ), !0;
  }
  deleteProperty(i, s) {
    return He.NODE_ENV !== "production" && Or(
      `Delete operation on key "${String(s)}" failed: target is readonly.`,
      i
    ), !0;
  }
}
const Mu = /* @__PURE__ */ new Wu(), Fu = /* @__PURE__ */ new _u(), Po = (t) => t, Pn = (t) => Reflect.getPrototypeOf(t);
function pn(t, i, s = !1, c = !1) {
  t = t.__v_raw;
  const f = he(t), m = he(i);
  s || (Sr(i, m) && dt(f, "get", i), dt(f, "get", m));
  const { has: P } = Pn(f), T = c ? Po : s ? To : st;
  if (P.call(f, i))
    return T(t.get(i));
  if (P.call(f, m))
    return T(t.get(m));
  t !== f && t.get(i);
}
function vn(t, i = !1) {
  const s = this.__v_raw, c = he(s), f = he(t);
  return i || (Sr(t, f) && dt(c, "has", t), dt(c, "has", f)), t === f ? s.has(t) : s.has(t) || s.has(f);
}
function wn(t, i = !1) {
  return t = t.__v_raw, !i && dt(he(t), "iterate", ur), Reflect.get(t, "size", t);
}
function Xi(t, i = !1) {
  !i && !Zt(t) && !Rr(t) && (t = he(t));
  const s = he(this);
  return Pn(s).has.call(s, t) || (s.add(t), Yt(s, "add", t, t)), this;
}
function ki(t, i, s = !1) {
  !s && !Zt(i) && !Rr(i) && (i = he(i));
  const c = he(this), { has: f, get: m } = Pn(c);
  let P = f.call(c, t);
  P ? He.NODE_ENV !== "production" && Ra(c, f, t) : (t = he(t), P = f.call(c, t));
  const T = m.call(c, t);
  return c.set(t, i), P ? Sr(i, T) && Yt(c, "set", t, i, T) : Yt(c, "add", t, i), this;
}
function ea(t) {
  const i = he(this), { has: s, get: c } = Pn(i);
  let f = s.call(i, t);
  f ? He.NODE_ENV !== "production" && Ra(i, s, t) : (t = he(t), f = s.call(i, t));
  const m = c ? c.call(i, t) : void 0, P = i.delete(t);
  return f && Yt(i, "delete", t, void 0, m), P;
}
function ta() {
  const t = he(this), i = t.size !== 0, s = He.NODE_ENV !== "production" ? Br(t) ? new Map(t) : new Set(t) : void 0, c = t.clear();
  return i && Yt(t, "clear", void 0, void 0, s), c;
}
function mn(t, i) {
  return function(c, f) {
    const m = this, P = m.__v_raw, T = he(P), D = i ? Po : t ? To : st;
    return !t && dt(T, "iterate", ur), P.forEach((C, g) => c.call(f, D(C), D(g), m));
  };
}
function gn(t, i, s) {
  return function(...c) {
    const f = this.__v_raw, m = he(f), P = Br(m), T = t === "entries" || t === Symbol.iterator && P, D = t === "keys" && P, C = f[t](...c), g = s ? Po : i ? To : st;
    return !i && dt(
      m,
      "iterate",
      D ? ho : ur
    ), {
      // iterator protocol
      next() {
        const { value: M, done: _ } = C.next();
        return _ ? { value: M, done: _ } : {
          value: T ? [g(M[0]), g(M[1])] : g(M),
          done: _
        };
      },
      // iterable protocol
      [Symbol.iterator]() {
        return this;
      }
    };
  };
}
function Kt(t) {
  return function(...i) {
    if (He.NODE_ENV !== "production") {
      const s = i[0] ? `on key "${i[0]}" ` : "";
      Or(
        `${Tu(t)} operation ${s}failed: target is readonly.`,
        he(this)
      );
    }
    return t === "delete" ? !1 : t === "clear" ? void 0 : this;
  };
}
function zu() {
  const t = {
    get(m) {
      return pn(this, m);
    },
    get size() {
      return wn(this);
    },
    has: vn,
    add: Xi,
    set: ki,
    delete: ea,
    clear: ta,
    forEach: mn(!1, !1)
  }, i = {
    get(m) {
      return pn(this, m, !1, !0);
    },
    get size() {
      return wn(this);
    },
    has: vn,
    add(m) {
      return Xi.call(this, m, !0);
    },
    set(m, P) {
      return ki.call(this, m, P, !0);
    },
    delete: ea,
    clear: ta,
    forEach: mn(!1, !0)
  }, s = {
    get(m) {
      return pn(this, m, !0);
    },
    get size() {
      return wn(this, !0);
    },
    has(m) {
      return vn.call(this, m, !0);
    },
    add: Kt("add"),
    set: Kt("set"),
    delete: Kt("delete"),
    clear: Kt("clear"),
    forEach: mn(!0, !1)
  }, c = {
    get(m) {
      return pn(this, m, !0, !0);
    },
    get size() {
      return wn(this, !0);
    },
    has(m) {
      return vn.call(this, m, !0);
    },
    add: Kt("add"),
    set: Kt("set"),
    delete: Kt("delete"),
    clear: Kt("clear"),
    forEach: mn(!0, !0)
  };
  return [
    "keys",
    "values",
    "entries",
    Symbol.iterator
  ].forEach((m) => {
    t[m] = gn(m, !1, !1), s[m] = gn(m, !0, !1), i[m] = gn(m, !1, !0), c[m] = gn(
      m,
      !0,
      !0
    );
  }), [
    t,
    s,
    i,
    c
  ];
}
const [
  Lu,
  ju,
  Uu,
  Bu
] = /* @__PURE__ */ zu();
function Oa(t, i) {
  const s = i ? t ? Bu : Uu : t ? ju : Lu;
  return (c, f, m) => f === "__v_isReactive" ? !t : f === "__v_isReadonly" ? t : f === "__v_raw" ? c : Reflect.get(
    co(s, f) && f in c ? s : c,
    f,
    m
  );
}
const $u = {
  get: /* @__PURE__ */ Oa(!1, !1)
}, qu = {
  get: /* @__PURE__ */ Oa(!0, !1)
};
function Ra(t, i, s) {
  const c = he(s);
  if (c !== s && i.call(t, c)) {
    const f = va(t);
    Or(
      `Reactive ${f} contains both the raw and reactive versions of the same object${f === "Map" ? " as keys" : ""}, which can lead to inconsistencies. Avoid differentiating between the raw and reactive versions of an object and only use the reactive version if possible.`
    );
  }
}
const Sa = /* @__PURE__ */ new WeakMap(), Hu = /* @__PURE__ */ new WeakMap(), xa = /* @__PURE__ */ new WeakMap(), Vu = /* @__PURE__ */ new WeakMap();
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
  return Rr(t) ? t : Ca(
    t,
    !1,
    Mu,
    $u,
    Sa
  );
}
function Na(t) {
  return Ca(
    t,
    !0,
    Fu,
    qu,
    xa
  );
}
function Ca(t, i, s, c, f) {
  if (!bn(t))
    return He.NODE_ENV !== "production" && Or(
      `value cannot be made ${i ? "readonly" : "reactive"}: ${String(
        t
      )}`
    ), t;
  if (t.__v_raw && !(i && t.__v_isReactive))
    return t;
  const m = f.get(t);
  if (m)
    return m;
  const P = Ju(t);
  if (P === 0)
    return t;
  const T = new Proxy(
    t,
    P === 2 ? c : s
  );
  return f.set(t, T), T;
}
function Rr(t) {
  return !!(t && t.__v_isReadonly);
}
function Zt(t) {
  return !!(t && t.__v_isShallow);
}
function Ku(t) {
  return t ? !!t.__v_raw : !1;
}
function he(t) {
  const i = t && t.__v_raw;
  return i ? he(i) : t;
}
const st = (t) => bn(t) ? Da(t) : t, To = (t) => bn(t) ? Na(t) : t;
function Tr(t) {
  return t ? t.__v_isRef === !0 : !1;
}
function Ot(t) {
  return Yu(t, !1);
}
function Yu(t, i) {
  return Tr(t) ? t : new Zu(t, i);
}
class Zu {
  constructor(i, s) {
    this.dep = new Ea(), this.__v_isRef = !0, this.__v_isShallow = !1, this._rawValue = s ? i : he(i), this._value = s ? i : st(i), this.__v_isShallow = s;
  }
  get value() {
    return He.NODE_ENV !== "production" ? this.dep.track({
      target: this,
      type: "get",
      key: "value"
    }) : this.dep.track(), this._value;
  }
  set value(i) {
    const s = this._rawValue, c = this.__v_isShallow || Zt(i) || Rr(i);
    i = c ? i : he(i), Sr(i, s) && (this._rawValue = i, this._value = c ? i : st(i), He.NODE_ENV !== "production" ? this.dep.trigger({
      target: this,
      type: "set",
      key: "value",
      newValue: i,
      oldValue: s
    }) : this.dep.trigger());
  }
}
function Qu() {
  const t = /* @__PURE__ */ new Set(), i = (f) => {
    t.delete(f);
  };
  return {
    on: (f) => (t.add(f), {
      off: () => i(f)
    }),
    off: i,
    trigger: (...f) => Promise.all(Array.from(t).map((m) => m(...f)))
  };
}
async function Xu(t) {
  try {
    return {
      data: await t,
      error: null
    };
  } catch (i) {
    return {
      data: null,
      error: i || {
        message: "Unknown error"
      }
    };
  }
}
var ku = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, Ia = { exports: {} };
(function(t, i) {
  (function(s, c) {
    t.exports = c();
  })(typeof self < "u" ? self : ku, function() {
    return function(s) {
      var c = {};
      function f(m) {
        if (c[m]) return c[m].exports;
        var P = c[m] = {
          i: m,
          l: !1,
          exports: {}
        };
        return s[m].call(P.exports, P, P.exports, f), P.l = !0, P.exports;
      }
      return f.m = s, f.c = c, f.d = function(m, P, T) {
        f.o(m, P) || Object.defineProperty(m, P, {
          enumerable: !0,
          get: T
        });
      }, f.r = function(m) {
        typeof Symbol < "u" && Symbol.toStringTag && Object.defineProperty(m, Symbol.toStringTag, {
          value: "Module"
        }), Object.defineProperty(m, "__esModule", {
          value: !0
        });
      }, f.t = function(m, P) {
        if (1 & P && (m = f(m)), 8 & P || 4 & P && typeof m == "object" && m && m.__esModule) return m;
        var T = /* @__PURE__ */ Object.create(null);
        if (f.r(T), Object.defineProperty(T, "default", {
          enumerable: !0,
          value: m
        }), 2 & P && typeof m != "string") for (var D in m) f.d(T, D, (function(C) {
          return m[C];
        }).bind(null, D));
        return T;
      }, f.n = function(m) {
        var P = m && m.__esModule ? function() {
          return m.default;
        } : function() {
          return m;
        };
        return f.d(P, "a", P), P;
      }, f.o = function(m, P) {
        return {}.hasOwnProperty.call(m, P);
      }, f.p = "", f(f.s = 0);
    }([function(s, c, f) {
      f.r(c), f.d(c, "PopupOpenError", function() {
        return Mn;
      }), f.d(c, "create", function() {
        return as;
      }), f.d(c, "destroy", function() {
        return ss;
      }), f.d(c, "destroyComponents", function() {
        return Di;
      }), f.d(c, "destroyAll", function() {
        return Ni;
      }), f.d(c, "PROP_TYPE", function() {
        return pe;
      }), f.d(c, "PROP_SERIALIZATION", function() {
        return dn;
      }), f.d(c, "CONTEXT", function() {
        return xe;
      }), f.d(c, "EVENT", function() {
        return Ee;
      });
      function m(e, r) {
        return (m = Object.setPrototypeOf || function(n, o) {
          return n.__proto__ = o, n;
        })(e, r);
      }
      function P(e, r) {
        e.prototype = Object.create(r.prototype), e.prototype.constructor = e, m(e, r);
      }
      function T() {
        return (T = Object.assign || function(e) {
          for (var r = 1; r < arguments.length; r++) {
            var n = arguments[r];
            for (var o in n) ({}).hasOwnProperty.call(n, o) && (e[o] = n[o]);
          }
          return e;
        }).apply(this, arguments);
      }
      function D(e) {
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
      var C = [], g = [], M = 0, _;
      function re() {
        if (!M && _) {
          var e = _;
          _ = null, e.resolve();
        }
      }
      function Re() {
        M += 1;
      }
      function Qe() {
        M -= 1, re();
      }
      var R = function() {
        function e(n) {
          var o = this;
          if (this.resolved = void 0, this.rejected = void 0, this.errorHandled = void 0, this.value = void 0, this.error = void 0, this.handlers = void 0, this.dispatching = void 0, this.stack = void 0, this.resolved = !1, this.rejected = !1, this.errorHandled = !1, this.handlers = [], n) {
            var a, u, d = !1, h = !1, l = !1;
            Re();
            try {
              n(function(v) {
                l ? o.resolve(v) : (d = !0, a = v);
              }, function(v) {
                l ? o.reject(v) : (h = !0, u = v);
              });
            } catch (v) {
              Qe(), this.reject(v);
              return;
            }
            Qe(), l = !0, d ? this.resolve(a) : h && this.reject(u);
          }
        }
        var r = e.prototype;
        return r.resolve = function(n) {
          if (this.resolved || this.rejected) return this;
          if (D(n)) throw new Error("Can not resolve promise with another promise");
          return this.resolved = !0, this.value = n, this.dispatch(), this;
        }, r.reject = function(n) {
          var o = this;
          if (this.resolved || this.rejected) return this;
          if (D(n)) throw new Error("Can not reject promise with another promise");
          if (!n) {
            var a = n && typeof n.toString == "function" ? n.toString() : {}.toString.call(n);
            n = new Error("Expected reject to be called with Error, got " + a);
          }
          return this.rejected = !0, this.error = n, this.errorHandled || setTimeout(function() {
            o.errorHandled || function(u, d) {
              if (C.indexOf(u) === -1) {
                C.push(u), setTimeout(function() {
                  throw u;
                }, 1);
                for (var h = 0; h < g.length; h++) g[h](u, d);
              }
            }(n, o);
          }, 1), this.dispatch(), this;
        }, r.asyncReject = function(n) {
          return this.errorHandled = !0, this.reject(n), this;
        }, r.dispatch = function() {
          var n = this.resolved, o = this.rejected, a = this.handlers;
          if (!this.dispatching && (n || o)) {
            this.dispatching = !0, Re();
            for (var u = function(y, b) {
              return y.then(function(O) {
                b.resolve(O);
              }, function(O) {
                b.reject(O);
              });
            }, d = 0; d < a.length; d++) {
              var h = a[d], l = h.onSuccess, v = h.onError, E = h.promise, w = void 0;
              if (n) try {
                w = l ? l(this.value) : this.value;
              } catch (y) {
                E.reject(y);
                continue;
              }
              else if (o) {
                if (!v) {
                  E.reject(this.error);
                  continue;
                }
                try {
                  w = v(this.error);
                } catch (y) {
                  E.reject(y);
                  continue;
                }
              }
              if (w instanceof e && (w.resolved || w.rejected)) {
                var p = w;
                p.resolved ? E.resolve(p.value) : E.reject(p.error), p.errorHandled = !0;
              } else D(w) ? w instanceof e && (w.resolved || w.rejected) ? w.resolved ? E.resolve(w.value) : E.reject(w.error) : u(w, E) : E.resolve(w);
            }
            a.length = 0, this.dispatching = !1, Qe();
          }
        }, r.then = function(n, o) {
          if (n && typeof n != "function" && !n.call) throw new Error("Promise.then expected a function for success handler");
          if (o && typeof o != "function" && !o.call) throw new Error("Promise.then expected a function for error handler");
          var a = new e();
          return this.handlers.push({
            promise: a,
            onSuccess: n,
            onError: o
          }), this.errorHandled = !0, this.dispatch(), a;
        }, r.catch = function(n) {
          return this.then(void 0, n);
        }, r.finally = function(n) {
          if (n && typeof n != "function" && !n.call) throw new Error("Promise.finally expected a function");
          return this.then(function(o) {
            return e.try(n).then(function() {
              return o;
            });
          }, function(o) {
            return e.try(n).then(function() {
              throw o;
            });
          });
        }, r.timeout = function(n, o) {
          var a = this;
          if (this.resolved || this.rejected) return this;
          var u = setTimeout(function() {
            a.resolved || a.rejected || a.reject(o || new Error("Promise timed out after " + n + "ms"));
          }, n);
          return this.then(function(d) {
            return clearTimeout(u), d;
          });
        }, r.toPromise = function() {
          if (typeof Promise > "u") throw new TypeError("Could not find Promise");
          return Promise.resolve(this);
        }, r.lazy = function() {
          return this.errorHandled = !0, this;
        }, e.resolve = function(n) {
          return n instanceof e ? n : D(n) ? new e(function(o, a) {
            return n.then(o, a);
          }) : new e().resolve(n);
        }, e.reject = function(n) {
          return new e().reject(n);
        }, e.asyncReject = function(n) {
          return new e().asyncReject(n);
        }, e.all = function(n) {
          var o = new e(), a = n.length, u = [].slice();
          if (!a)
            return o.resolve(u), o;
          for (var d = function(v, E, w) {
            return E.then(function(p) {
              u[v] = p, (a -= 1) == 0 && o.resolve(u);
            }, function(p) {
              w.reject(p);
            });
          }, h = 0; h < n.length; h++) {
            var l = n[h];
            if (l instanceof e) {
              if (l.resolved) {
                u[h] = l.value, a -= 1;
                continue;
              }
            } else if (!D(l)) {
              u[h] = l, a -= 1;
              continue;
            }
            d(h, e.resolve(l), o);
          }
          return a === 0 && o.resolve(u), o;
        }, e.hash = function(n) {
          var o = {}, a = [], u = function(h) {
            if (n.hasOwnProperty(h)) {
              var l = n[h];
              D(l) ? a.push(l.then(function(v) {
                o[h] = v;
              })) : o[h] = l;
            }
          };
          for (var d in n) u(d);
          return e.all(a).then(function() {
            return o;
          });
        }, e.map = function(n, o) {
          return e.all(n.map(o));
        }, e.onPossiblyUnhandledException = function(n) {
          return function(o) {
            return g.push(o), {
              cancel: function() {
                g.splice(g.indexOf(o), 1);
              }
            };
          }(n);
        }, e.try = function(n, o, a) {
          if (n && typeof n != "function" && !n.call) throw new Error("Promise.try expected a function");
          var u;
          Re();
          try {
            u = n.apply(o, a || []);
          } catch (d) {
            return Qe(), e.reject(d);
          }
          return Qe(), e.resolve(u);
        }, e.delay = function(n) {
          return new e(function(o) {
            setTimeout(o, n);
          });
        }, e.isPromise = function(n) {
          return !!(n && n instanceof e) || D(n);
        }, e.flush = function() {
          return function(n) {
            var o = _ = _ || new n();
            return re(), o;
          }(e);
        }, e;
      }();
      function ut(e) {
        return {}.toString.call(e) === "[object RegExp]";
      }
      var St = {
        IFRAME: "iframe",
        POPUP: "popup"
      }, Et = `Call was rejected by callee.\r
`;
      function ve(e) {
        return e === void 0 && (e = window), e.location.protocol;
      }
      function nt(e) {
        if (e === void 0 && (e = window), e.mockDomain) {
          var r = e.mockDomain.split("//")[0];
          if (r) return r;
        }
        return ve(e);
      }
      function Ct(e) {
        return e === void 0 && (e = window), nt(e) === "about:";
      }
      function Je(e) {
        if (e === void 0 && (e = window), e) try {
          if (e.parent && e.parent !== e) return e.parent;
        } catch {
        }
      }
      function Te(e) {
        if (e === void 0 && (e = window), e && !Je(e)) try {
          return e.opener;
        } catch {
        }
      }
      function cr(e) {
        try {
          return !0;
        } catch {
        }
        return !1;
      }
      function ne(e) {
        e === void 0 && (e = window);
        var r = e.location;
        if (!r) throw new Error("Can not read window location");
        var n = ve(e);
        if (!n) throw new Error("Can not read window protocol");
        if (n === "file:") return "file://";
        if (n === "about:") {
          var o = Je(e);
          return o && cr() ? ne(o) : "about://";
        }
        var a = r.host;
        if (!a) throw new Error("Can not read window host");
        return n + "//" + a;
      }
      function F(e) {
        e === void 0 && (e = window);
        var r = ne(e);
        return r && e.mockDomain && e.mockDomain.indexOf("mock:") === 0 ? e.mockDomain : r;
      }
      function U(e) {
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
            if (Ct(r) && cr()) return !0;
          } catch {
          }
          try {
            if (function(o) {
              return o === void 0 && (o = window), nt(o) === "mock:";
            }(r) && cr()) return !0;
          } catch {
          }
          try {
            if (ne(r) === ne(window)) return !0;
          } catch {
          }
          return !1;
        }(e)) return !1;
        try {
          if (e === window || Ct(e) && cr() || F(window) === F(e)) return !0;
        } catch {
        }
        return !1;
      }
      function te(e) {
        if (!U(e)) throw new Error("Expected window to be same domain");
        return e;
      }
      function et(e, r) {
        if (!e || !r) return !1;
        var n = Je(r);
        return n ? n === e : function(o) {
          var a = [];
          try {
            for (; o.parent !== o; )
              a.push(o.parent), o = o.parent;
          } catch {
          }
          return a;
        }(r).indexOf(e) !== -1;
      }
      function Ke(e) {
        var r = [], n;
        try {
          n = e.frames;
        } catch {
          n = e;
        }
        var o;
        try {
          o = n.length;
        } catch {
        }
        if (o === 0) return r;
        if (o) {
          for (var a = 0; a < o; a++) {
            var u = void 0;
            try {
              u = n[a];
            } catch {
              continue;
            }
            r.push(u);
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
      function tt(e) {
        for (var r = [], n = 0, o = Ke(e); n < o.length; n++) {
          var a = o[n];
          r.push(a);
          for (var u = 0, d = tt(a); u < d.length; u++) r.push(d[u]);
        }
        return r;
      }
      function Se(e) {
        e === void 0 && (e = window);
        try {
          if (e.top) return e.top;
        } catch {
        }
        if (Je(e) === e) return e;
        try {
          if (et(window, e) && window.top) return window.top;
        } catch {
        }
        try {
          if (et(e, window) && window.top) return window.top;
        } catch {
        }
        for (var r = 0, n = tt(e); r < n.length; r++) {
          var o = n[r];
          try {
            if (o.top) return o.top;
          } catch {
          }
          if (Je(o) === o) return o;
        }
      }
      function Ye(e) {
        var r = Se(e);
        if (!r) throw new Error("Can not determine top window");
        var n = [].concat(tt(r), [r]);
        return n.indexOf(e) === -1 && (n = [].concat(n, [e], tt(e))), n;
      }
      var dr = [], Vr = [];
      function ge(e, r) {
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
          return !a || a.message !== Et;
        }
        if (r && U(e)) try {
          if (e.mockclosed) return !0;
        } catch {
        }
        try {
          if (!e.parent || !e.top) return !0;
        } catch {
        }
        var n = function(a, u) {
          for (var d = 0; d < a.length; d++) try {
            if (a[d] === u) return d;
          } catch {
          }
          return -1;
        }(dr, e);
        if (n !== -1) {
          var o = Vr[n];
          if (o && function(a) {
            if (!a.contentWindow || !a.parentNode) return !0;
            var u = a.ownerDocument;
            if (u && u.documentElement && !u.documentElement.contains(a)) {
              for (var d = a; d.parentNode && d.parentNode !== d; ) d = d.parentNode;
              if (!d.host || !u.documentElement.contains(d.host)) return !0;
            }
            return !1;
          }(o)) return !0;
        }
        return !1;
      }
      function Gr(e) {
        return (e = e || window).navigator.mockUserAgent || e.navigator.userAgent;
      }
      function Qt(e, r) {
        for (var n = Ke(e), o = 0; o < n.length; o++) {
          var a = n[o];
          try {
            if (U(a) && a.name === r && n.indexOf(a) !== -1) return a;
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
      function Jr(e, r) {
        return e === Te(r);
      }
      function Xt(e) {
        return e === void 0 && (e = window), Te(e = e || window) || Je(e) || void 0;
      }
      function fr(e, r) {
        for (var n = 0; n < e.length; n++)
          for (var o = e[n], a = 0; a < r.length; a++) if (o === r[a]) return !0;
        return !1;
      }
      function Tn(e) {
        e === void 0 && (e = window);
        for (var r = 0, n = e; n; ) (n = Je(n)) && (r += 1);
        return r;
      }
      function Kr(e, r) {
        var n = Se(e) || e, o = Se(r) || r;
        try {
          if (n && o) return n === o;
        } catch {
        }
        var a = Ye(e), u = Ye(r);
        if (fr(a, u)) return !0;
        var d = Te(n), h = Te(o);
        return d && fr(Ye(d), u) || h && fr(Ye(h), a), !1;
      }
      function ft(e, r) {
        if (typeof e == "string") {
          if (typeof r == "string") return e === "*" || r === e;
          if (ut(r) || Array.isArray(r)) return !1;
        }
        return ut(e) ? ut(r) ? e.toString() === r.toString() : !Array.isArray(r) && !!r.match(e) : !!Array.isArray(e) && (Array.isArray(r) ? JSON.stringify(e) === JSON.stringify(r) : !ut(r) && e.some(function(n) {
          return ft(n, r);
        }));
      }
      function It(e) {
        return e.match(/^(https?|mock|file):\/\//) ? e.split("/").slice(0, 3).join("/") : F();
      }
      function Oo(e, r, n, o) {
        n === void 0 && (n = 1e3), o === void 0 && (o = 1 / 0);
        var a;
        return function u() {
          if (ge(e))
            return a && clearTimeout(a), r();
          o <= 0 ? clearTimeout(a) : (o -= n, a = setTimeout(u, n));
        }(), {
          cancel: function() {
            a && clearTimeout(a);
          }
        };
      }
      function kt(e) {
        try {
          if (e === window) return !0;
        } catch (r) {
          if (r && r.message === Et) return !0;
        }
        try {
          if ({}.toString.call(e) === "[object Window]") return !0;
        } catch (r) {
          if (r && r.message === Et) return !0;
        }
        try {
          if (window.Window && e instanceof window.Window) return !0;
        } catch (r) {
          if (r && r.message === Et) return !0;
        }
        try {
          if (e && e.self === e) return !0;
        } catch (r) {
          if (r && r.message === Et) return !0;
        }
        try {
          if (e && e.parent === e) return !0;
        } catch (r) {
          if (r && r.message === Et) return !0;
        }
        try {
          if (e && e.top === e) return !0;
        } catch (r) {
          if (r && r.message === Et) return !0;
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
      function On(e) {
        if (r = It(e), r.indexOf("mock:") !== 0) return e;
        var r;
        throw new Error("Mock urls not supported out of test mode");
      }
      function Ro(e) {
        if (U(e)) return te(e).frameElement;
        for (var r = 0, n = document.querySelectorAll("iframe"); r < n.length; r++) {
          var o = n[r];
          if (o && o.contentWindow && o.contentWindow === e) return o;
        }
      }
      function So(e) {
        if (function(n) {
          return n === void 0 && (n = window), !!Je(n);
        }(e)) {
          var r = Ro(e);
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
      function Yr(e, r) {
        for (var n = 0; n < e.length; n++) try {
          if (e[n] === r) return n;
        } catch {
        }
        return -1;
      }
      var Zr = function() {
        function e() {
          if (this.name = void 0, this.weakmap = void 0, this.keys = void 0, this.values = void 0, this.name = "__weakmap_" + (1e9 * Math.random() >>> 0) + "__", function() {
            if (typeof WeakMap > "u" || Object.freeze === void 0) return !1;
            try {
              var n = /* @__PURE__ */ new WeakMap(), o = {};
              return Object.freeze(o), n.set(o, "__testvalue__"), n.get(o) === "__testvalue__";
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
          for (var n = this.weakmap, o = this.keys, a = 0; a < o.length; a++) {
            var u = o[a];
            if (kt(u) && ge(u)) {
              if (n) try {
                n.delete(u);
              } catch {
              }
              o.splice(a, 1), this.values.splice(a, 1), a -= 1;
            }
          }
        }, r.isSafeToReadWrite = function(n) {
          return !kt(n);
        }, r.set = function(n, o) {
          if (!n) throw new Error("WeakMap expected key");
          var a = this.weakmap;
          if (a) try {
            a.set(n, o);
          } catch {
            delete this.weakmap;
          }
          if (this.isSafeToReadWrite(n)) try {
            var u = this.name, d = n[u];
            d && d[0] === n ? d[1] = o : Object.defineProperty(n, u, {
              value: [n, o],
              writable: !0
            });
            return;
          } catch {
          }
          this._cleanupClosedWindows();
          var h = this.keys, l = this.values, v = Yr(h, n);
          v === -1 ? (h.push(n), l.push(o)) : l[v] = o;
        }, r.get = function(n) {
          if (!n) throw new Error("WeakMap expected key");
          var o = this.weakmap;
          if (o) try {
            if (o.has(n)) return o.get(n);
          } catch {
            delete this.weakmap;
          }
          if (this.isSafeToReadWrite(n)) try {
            var a = n[this.name];
            return a && a[0] === n ? a[1] : void 0;
          } catch {
          }
          this._cleanupClosedWindows();
          var u = Yr(this.keys, n);
          if (u !== -1) return this.values[u];
        }, r.delete = function(n) {
          if (!n) throw new Error("WeakMap expected key");
          var o = this.weakmap;
          if (o) try {
            o.delete(n);
          } catch {
            delete this.weakmap;
          }
          if (this.isSafeToReadWrite(n)) try {
            var a = n[this.name];
            a && a[0] === n && (a[0] = a[1] = void 0);
          } catch {
          }
          this._cleanupClosedWindows();
          var u = this.keys, d = Yr(u, n);
          d !== -1 && (u.splice(d, 1), this.values.splice(d, 1));
        }, r.has = function(n) {
          if (!n) throw new Error("WeakMap expected key");
          var o = this.weakmap;
          if (o) try {
            if (o.has(n)) return !0;
          } catch {
            delete this.weakmap;
          }
          if (this.isSafeToReadWrite(n)) try {
            var a = n[this.name];
            return !(!a || a[0] !== n);
          } catch {
          }
          return this._cleanupClosedWindows(), Yr(this.keys, n) !== -1;
        }, r.getOrSet = function(n, o) {
          if (this.has(n)) return this.get(n);
          var a = o();
          return this.set(n, a), a;
        }, e;
      }();
      function xo(e) {
        return (xo = Object.setPrototypeOf ? Object.getPrototypeOf : function(r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        })(e);
      }
      function Wa() {
        if (typeof Reflect > "u" || !Reflect.construct || Reflect.construct.sham) return !1;
        if (typeof Proxy == "function") return !0;
        try {
          return Date.prototype.toString.call(Reflect.construct(Date, [], function() {
          })), !0;
        } catch {
          return !1;
        }
      }
      function Do(e, r, n) {
        return (Do = Wa() ? Reflect.construct : function(o, a, u) {
          var d = [null];
          d.push.apply(d, a);
          var h = new (Function.bind.apply(o, d))();
          return u && m(h, u.prototype), h;
        }).apply(null, arguments);
      }
      function No(e) {
        var r = typeof Map == "function" ? /* @__PURE__ */ new Map() : void 0;
        return (No = function(n) {
          if (n === null || (o = n, Function.toString.call(o).indexOf("[native code]") === -1)) return n;
          var o;
          if (typeof n != "function") throw new TypeError("Super expression must either be null or a function");
          if (r !== void 0) {
            if (r.has(n)) return r.get(n);
            r.set(n, a);
          }
          function a() {
            return Do(n, arguments, xo(this).constructor);
          }
          return a.prototype = Object.create(n.prototype, {
            constructor: {
              value: a,
              enumerable: !1,
              writable: !0,
              configurable: !0
            }
          }), m(a, n);
        })(e);
      }
      function Rn(e) {
        var r = !1;
        try {
          (e instanceof window.Element || e !== null && typeof e == "object" && e.nodeType === 1 && typeof e.style == "object" && typeof e.ownerDocument == "object") && (r = !0);
        } catch {
        }
        return r;
      }
      function Sn(e) {
        return e.name || e.__name__ || e.displayName || "anonymous";
      }
      function xn(e, r) {
        try {
          delete e.name, e.name = r;
        } catch {
        }
        return e.__name__ = e.displayName = r, e;
      }
      function Dn(e) {
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
        }) + "_" + Dn((/* @__PURE__ */ new Date()).toISOString().slice(11, 19).replace("T", ".")).replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
      }
      var Qr;
      function Nn(e) {
        try {
          return JSON.stringify([].slice.call(e), function(r, n) {
            return typeof n == "function" ? "memoize[" + function(o) {
              if (Qr = Qr || new Zr(), o == null || typeof o != "object" && typeof o != "function") throw new Error("Invalid object");
              var a = Qr.get(o);
              return a || (a = typeof o + ":" + Xe(), Qr.set(o, a)), a;
            }(n) + "]" : Rn(n) ? {} : n;
          });
        } catch {
          throw new Error("Arguments not serializable -- can not be used to memoize");
        }
      }
      function _a() {
        return {};
      }
      var xr = 0, Co = 0;
      function Lt(e, r) {
        r === void 0 && (r = {});
        var n = r.thisNamespace, o = n !== void 0 && n, a = r.time, u, d, h = xr;
        xr += 1;
        var l = function() {
          for (var v = arguments.length, E = new Array(v), w = 0; w < v; w++) E[w] = arguments[w];
          h < Co && (u = null, d = null, h = xr, xr += 1);
          var p;
          p = o ? (d = d || new Zr()).getOrSet(this, _a) : u = u || {};
          var y;
          try {
            y = Nn(E);
          } catch {
            return e.apply(this, arguments);
          }
          var b = p[y];
          if (b && a && Date.now() - b.time < a && (delete p[y], b = null), b) return b.value;
          var O = Date.now(), S = e.apply(this, arguments);
          return p[y] = {
            time: O,
            value: S
          }, S;
        };
        return l.reset = function() {
          u = null, d = null;
        }, xn(l, (r.name || Sn(e)) + "::memoized");
      }
      Lt.clear = function() {
        Co = xr;
      };
      function Ma(e) {
        var r = {};
        function n() {
          for (var o = arguments, a = this, u = arguments.length, d = new Array(u), h = 0; h < u; h++) d[h] = arguments[h];
          var l = Nn(d);
          return r.hasOwnProperty(l) || (r[l] = R.try(function() {
            return e.apply(a, o);
          }).finally(function() {
            delete r[l];
          })), r[l];
        }
        return n.reset = function() {
          r = {};
        }, xn(n, Sn(e) + "::promiseMemoized");
      }
      function ye() {
      }
      function Xr(e) {
        var r = !1;
        return xn(function() {
          if (!r)
            return r = !0, e.apply(this, arguments);
        }, Sn(e) + "::once");
      }
      function lr(e, r) {
        if (r === void 0 && (r = 1), r >= 3) return "stringifyError stack overflow";
        try {
          if (!e) return "<unknown error: " + {}.toString.call(e) + ">";
          if (typeof e == "string") return e;
          if (e instanceof Error) {
            var n = e && e.stack, o = e && e.message;
            if (n && o) return n.indexOf(o) !== -1 ? n : o + `
` + n;
            if (n) return n;
            if (o) return o;
          }
          return e && e.toString && typeof e.toString == "function" ? e.toString() : {}.toString.call(e);
        } catch (a) {
          return "Error while stringifying error: " + lr(a, r + 1);
        }
      }
      function kr(e) {
        return typeof e == "string" ? e : e && e.toString && typeof e.toString == "function" ? e.toString() : {}.toString.call(e);
      }
      function hr(e, r) {
        if (!r) return e;
        if (Object.assign) return Object.assign(e, r);
        for (var n in r) r.hasOwnProperty(n) && (e[n] = r[n]);
        return e;
      }
      Lt(function(e) {
        if (Object.values) return Object.values(e);
        var r = [];
        for (var n in e) e.hasOwnProperty(n) && r.push(e[n]);
        return r;
      });
      function Fa(e) {
        return e;
      }
      function Dr(e, r) {
        var n;
        return function o() {
          n = setTimeout(function() {
            e(), o();
          }, r);
        }(), {
          cancel: function() {
            clearTimeout(n);
          }
        };
      }
      function Cn(e) {
        return e.replace(/-([a-z])/g, function(r) {
          return r[1].toUpperCase();
        });
      }
      function Io(e, r, n) {
        if (Array.isArray(e)) {
          if (typeof r != "number") throw new TypeError("Array key must be number");
        } else if (typeof e == "object" && e !== null && typeof r != "string") throw new TypeError("Object key must be string");
        Object.defineProperty(e, r, {
          configurable: !0,
          enumerable: !0,
          get: function() {
            delete e[r];
            var o = n();
            return e[r] = o, o;
          },
          set: function(o) {
            delete e[r], e[r] = o;
          }
        });
      }
      function In(e) {
        return [].slice.call(e);
      }
      function Ao(e) {
        return typeof (r = e) == "object" && r !== null && {}.toString.call(e) === "[object Object]";
        var r;
      }
      function An(e) {
        if (!Ao(e)) return !1;
        var r = e.constructor;
        if (typeof r != "function") return !1;
        var n = r.prototype;
        return !!Ao(n) && !!n.hasOwnProperty("isPrototypeOf");
      }
      function en(e, r, n) {
        if (n === void 0 && (n = ""), Array.isArray(e)) {
          for (var o = e.length, a = [], u = function(E) {
            Io(a, E, function() {
              var w = n ? n + "." + E : "" + E, p = r(e[E], E, w);
              return (An(p) || Array.isArray(p)) && (p = en(p, r, w)), p;
            });
          }, d = 0; d < o; d++) u(d);
          return a;
        }
        if (An(e)) {
          var h = {}, l = function(E) {
            if (!e.hasOwnProperty(E)) return 1;
            Io(h, E, function() {
              var w = n ? n + "." + E : "" + E, p = r(e[E], E, w);
              return (An(p) || Array.isArray(p)) && (p = en(p, r, w)), p;
            });
          };
          for (var v in e) l(v);
          return h;
        }
        throw new Error("Pass an object or array");
      }
      function jt(e) {
        return e != null;
      }
      function Wn(e) {
        return {}.toString.call(e) === "[object RegExp]";
      }
      function Nr(e, r, n) {
        if (e.hasOwnProperty(r)) return e[r];
        var o = n();
        return e[r] = o, o;
      }
      function tn(e) {
        var r = [], n = !1, o, a = {
          set: function(u, d) {
            return n || (e[u] = d, a.register(function() {
              delete e[u];
            })), d;
          },
          register: function(u) {
            var d = Xr(function() {
              return u(o);
            });
            return n ? u(o) : r.push(d), {
              cancel: function() {
                var h = r.indexOf(d);
                h !== -1 && r.splice(h, 1);
              }
            };
          },
          all: function(u) {
            o = u;
            var d = [];
            for (n = !0; r.length; ) {
              var h = r.shift();
              d.push(h());
            }
            return R.all(d).then(ye);
          }
        };
        return a;
      }
      function rn(e, r) {
        if (r == null) throw new Error("Expected " + e + " to be present");
        return r;
      }
      var za = function(e) {
        P(r, e);
        function r(n) {
          var o;
          return (o = e.call(this, n) || this).name = o.constructor.name, typeof Error.captureStackTrace == "function" ? Error.captureStackTrace(function(a) {
            if (a === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return a;
          }(o), o.constructor) : o.stack = new Error(n).stack, o;
        }
        return r;
      }(No(Error));
      function Wo() {
        var e = document.body;
        if (!e) throw new Error("Body element not found");
        return e;
      }
      function nn() {
        return !!document.body && document.readyState === "complete";
      }
      function _o() {
        return !!document.body && document.readyState === "interactive";
      }
      function Mo(e) {
        return encodeURIComponent(e);
      }
      Lt(function() {
        return new R(function(e) {
          if (nn() || _o()) return e();
          var r = setInterval(function() {
            if (nn() || _o())
              return clearInterval(r), e();
          }, 10);
        });
      });
      function Fo(e) {
        return function(r, n, o) {
          o === void 0 && (o = []);
          var a = r.__inline_memoize_cache__ = r.__inline_memoize_cache__ || {}, u = Nn(o);
          return a.hasOwnProperty(u) ? a[u] : a[u] = (function() {
            var d = {};
            if (!e || e.indexOf("=") === -1) return d;
            for (var h = 0, l = e.split("&"); h < l.length; h++) {
              var v = l[h];
              (v = v.split("="))[0] && v[1] && (d[decodeURIComponent(v[0])] = decodeURIComponent(v[1]));
            }
            return d;
          }).apply(void 0, o);
        }(Fo, 0, [e]);
      }
      function zo(e, r) {
        return r === void 0 && (r = {}), r && Object.keys(r).length ? function(n) {
          return n === void 0 && (n = {}), Object.keys(n).filter(function(o) {
            return typeof n[o] == "string" || typeof n[o] == "boolean";
          }).map(function(o) {
            var a = n[o];
            if (typeof a != "string" && typeof a != "boolean") throw new TypeError("Invalid type for query");
            return Mo(o) + "=" + Mo(a.toString());
          }).join("&");
        }(T({}, Fo(e), r)) : e;
      }
      function La(e, r) {
        e.appendChild(r);
      }
      function _n(e, r) {
        return r === void 0 && (r = document), Rn(e) ? e : typeof e == "string" ? r.querySelector(e) : void 0;
      }
      function Lo(e) {
        return new R(function(r, n) {
          var o = kr(e), a = _n(e);
          if (a) return r(a);
          if (nn()) return n(new Error("Document is ready and element " + o + " does not exist"));
          var u = setInterval(function() {
            if (a = _n(e))
              r(a), clearInterval(u);
            else if (nn())
              return clearInterval(u), n(new Error("Document is ready and element " + o + " does not exist"));
          }, 10);
        });
      }
      var Mn = function(e) {
        P(r, e);
        function r() {
          return e.apply(this, arguments) || this;
        }
        return r;
      }(za), on;
      function jo(e) {
        if ((on = on || new Zr()).has(e)) {
          var r = on.get(e);
          if (r) return r;
        }
        var n = new R(function(o, a) {
          e.addEventListener("load", function() {
            (function(u) {
              if (function() {
                for (var d = 0; d < dr.length; d++) {
                  var h = !1;
                  try {
                    h = dr[d].closed;
                  } catch {
                  }
                  h && (Vr.splice(d, 1), dr.splice(d, 1));
                }
              }(), u && u.contentWindow) try {
                dr.push(u.contentWindow), Vr.push(u);
              } catch {
              }
            })(e), o(e);
          }), e.addEventListener("error", function(u) {
            e.contentWindow ? o(e) : a(u);
          });
        });
        return on.set(e, n), n;
      }
      function Fn(e) {
        return jo(e).then(function(r) {
          if (!r.contentWindow) throw new Error("Could not find window in iframe");
          return r.contentWindow;
        });
      }
      function Uo(e, r) {
        e === void 0 && (e = {});
        var n = e.style || {}, o = function(u, d, h) {
          u === void 0 && (u = "div"), d === void 0 && (d = {}), u = u.toLowerCase();
          var l = document.createElement(u);
          if (d.style && hr(l.style, d.style), d.class && (l.className = d.class.join(" ")), d.id && l.setAttribute("id", d.id), d.attributes) for (var v = 0, E = Object.keys(d.attributes); v < E.length; v++) {
            var w = E[v];
            l.setAttribute(w, d.attributes[w]);
          }
          if (d.styleSheet && function(p, y, b) {
            b === void 0 && (b = window.document), p.styleSheet ? p.styleSheet.cssText = y : p.appendChild(b.createTextNode(y));
          }(l, d.styleSheet), d.html) {
            if (u === "iframe") throw new Error("Iframe html can not be written unless container provided and iframe in DOM");
            l.innerHTML = d.html;
          }
          return l;
        }("iframe", {
          attributes: T({
            allowTransparency: "true"
          }, e.attributes || {}),
          style: T({
            backgroundColor: "transparent",
            border: "none"
          }, n),
          html: e.html,
          class: e.class
        }), a = window.navigator.userAgent.match(/MSIE|Edge/i);
        return o.hasAttribute("id") || o.setAttribute("id", Xe()), jo(o), (e.url || a) && o.setAttribute("src", e.url || "about:blank"), o;
      }
      function Bo(e, r, n) {
        return e.addEventListener(r, n), {
          cancel: function() {
            e.removeEventListener(r, n);
          }
        };
      }
      function ja(e) {
        e.style.setProperty("display", "");
      }
      function $o(e) {
        e.style.setProperty("display", "none", "important");
      }
      function Cr(e) {
        e && e.parentNode && e.parentNode.removeChild(e);
      }
      function pr(e) {
        return !(e && e.parentNode && e.ownerDocument && e.ownerDocument.documentElement && e.ownerDocument.documentElement.contains(e));
      }
      function qo(e, r, n) {
        var o = n === void 0 ? {} : n, a = o.width, u = a === void 0 || a, d = o.height, h = d === void 0 || d, l = o.interval, v = l === void 0 ? 100 : l, E = o.win, w = E === void 0 ? window : E, p = e.offsetWidth, y = e.offsetHeight, b = !1;
        r({
          width: p,
          height: y
        });
        var O = function() {
          if (!b && function(A) {
            return !!(A.offsetWidth || A.offsetHeight || A.getClientRects().length);
          }(e)) {
            var z = e.offsetWidth, V = e.offsetHeight;
            (u && z !== p || h && V !== y) && r({
              width: z,
              height: V
            }), p = z, y = V;
          }
        }, S, I;
        return w.addEventListener("resize", O), w.ResizeObserver !== void 0 ? ((S = new w.ResizeObserver(O)).observe(e), I = Dr(O, 10 * v)) : w.MutationObserver !== void 0 ? ((S = new w.MutationObserver(O)).observe(e, {
          attributes: !0,
          childList: !0,
          subtree: !0,
          characterData: !1
        }), I = Dr(O, 10 * v)) : I = Dr(O, v), {
          cancel: function() {
            b = !0, S.disconnect(), window.removeEventListener("resize", O), I.cancel();
          }
        };
      }
      function zn(e) {
        for (; e.parentNode; ) e = e.parentNode;
        return e.toString() === "[object ShadowRoot]";
      }
      var an = typeof document < "u" ? document.currentScript : null, Ua = Lt(function() {
        if (an || (an = function() {
          try {
            var e = function() {
              try {
                throw new Error("_");
              } catch (d) {
                return d.stack || "";
              }
            }(), r = /.*at [^(]*\((.*):(.+):(.+)\)$/gi.exec(e), n = r && r[1];
            if (!n) return;
            for (var o = 0, a = [].slice.call(document.getElementsByTagName("script")).reverse(); o < a.length; o++) {
              var u = a[o];
              if (u.src && u.src === n) return u;
            }
          } catch {
          }
        }())) return an;
        throw new Error("Can not determine current script");
      }), Ba = Xe();
      Lt(function() {
        var e;
        try {
          e = Ua();
        } catch {
          return Ba;
        }
        var r = e.getAttribute("data-uid");
        if (r && typeof r == "string" || (r = e.getAttribute("data-uid-auto")) && typeof r == "string") return r;
        if (e.src) {
          var n = function(o) {
            for (var a = "", u = 0; u < o.length; u++) {
              var d = o[u].charCodeAt(0) * u;
              o[u + 1] && (d += o[u + 1].charCodeAt(0) * (u - 1)), a += String.fromCharCode(97 + Math.abs(d) % 26);
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
      function Ho(e) {
        return typeof e == "string" && /^[0-9]+%$/.test(e);
      }
      function Ln(e) {
        if (typeof e == "number") return e;
        var r = e.match(/^([0-9]+)(px|%)$/);
        if (!r) throw new Error("Could not match css value from " + e);
        return parseInt(r[1], 10);
      }
      function Vo(e) {
        return Ln(e) + "px";
      }
      function Jo(e) {
        return typeof e == "number" ? Vo(e) : Ho(e) ? e : Vo(e);
      }
      function Ko(e, r) {
        if (typeof e == "number") return e;
        if (Ho(e)) return parseInt(r * Ln(e) / 100, 10);
        if (typeof (n = e) == "string" && /^[0-9]+px$/.test(n)) return Ln(e);
        var n;
        throw new Error("Can not normalize dimension: " + e);
      }
      function xt(e) {
        e === void 0 && (e = window);
        var r = "__post_robot_11_0_0__";
        return e !== window ? e[r] : e[r] = e[r] || {};
      }
      var Yo = function() {
        return {};
      };
      function de(e, r) {
        return e === void 0 && (e = "store"), r === void 0 && (r = Yo), Nr(xt(), e, function() {
          var n = r();
          return {
            has: function(o) {
              return n.hasOwnProperty(o);
            },
            get: function(o, a) {
              return n.hasOwnProperty(o) ? n[o] : a;
            },
            set: function(o, a) {
              return n[o] = a, a;
            },
            del: function(o) {
              delete n[o];
            },
            getOrSet: function(o, a) {
              return Nr(n, o, a);
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
      var $a = function() {
      };
      function sn() {
        var e = xt();
        return e.WINDOW_WILDCARD = e.WINDOW_WILDCARD || new $a(), e.WINDOW_WILDCARD;
      }
      function Ze(e, r) {
        return e === void 0 && (e = "store"), r === void 0 && (r = Yo), de("windowStore").getOrSet(e, function() {
          var n = new Zr(), o = function(a) {
            return n.getOrSet(a, r);
          };
          return {
            has: function(a) {
              return o(a).hasOwnProperty(e);
            },
            get: function(a, u) {
              var d = o(a);
              return d.hasOwnProperty(e) ? d[e] : u;
            },
            set: function(a, u) {
              return o(a)[e] = u, u;
            },
            del: function(a) {
              delete o(a)[e];
            },
            getOrSet: function(a, u) {
              return Nr(o(a), e, u);
            }
          };
        });
      }
      function Zo() {
        return de("instance").getOrSet("instanceID", Xe);
      }
      function Qo(e, r) {
        var n = r.domain, o = Ze("helloPromises"), a = o.get(e);
        a && a.resolve({
          domain: n
        });
        var u = R.resolve({
          domain: n
        });
        return o.set(e, u), u;
      }
      function jn(e, r) {
        return (0, r.send)(e, "postrobot_hello", {
          instanceID: Zo()
        }, {
          domain: "*",
          timeout: -1
        }).then(function(n) {
          var o = n.origin, a = n.data.instanceID;
          return Qo(e, {
            domain: o
          }), {
            win: e,
            domain: o,
            instanceID: a
          };
        });
      }
      function Xo(e, r) {
        var n = r.send;
        return Ze("windowInstanceIDPromises").getOrSet(e, function() {
          return jn(e, {
            send: n
          }).then(function(o) {
            return o.instanceID;
          });
        });
      }
      function ko(e, r, n) {
        r === void 0 && (r = 5e3), n === void 0 && (n = "Window");
        var o = function(a) {
          return Ze("helloPromises").getOrSet(a, function() {
            return new R();
          });
        }(e);
        return r !== -1 && (o = o.timeout(r, new Error(n + " did not load after " + r + "ms"))), o;
      }
      function ei(e) {
        Ze("knownWindows").set(e, !0);
      }
      function Un(e) {
        return typeof e == "object" && e !== null && typeof e.__type__ == "string";
      }
      function ti(e) {
        return e === void 0 ? "undefined" : e === null ? "null" : Array.isArray(e) ? "array" : typeof e == "function" ? "function" : typeof e == "object" ? e instanceof Error ? "error" : typeof e.then == "function" ? "promise" : {}.toString.call(e) === "[object RegExp]" ? "regex" : {}.toString.call(e) === "[object Date]" ? "date" : "object" : typeof e == "string" ? "string" : typeof e == "number" ? "number" : typeof e == "boolean" ? "boolean" : void 0;
      }
      function er(e, r) {
        return {
          __type__: e,
          __val__: r
        };
      }
      var lt, qa = ((lt = {}).function = function() {
      }, lt.error = function(e) {
        return er("error", {
          message: e.message,
          stack: e.stack,
          code: e.code,
          data: e.data
        });
      }, lt.promise = function() {
      }, lt.regex = function(e) {
        return er("regex", e.source);
      }, lt.date = function(e) {
        return er("date", e.toJSON());
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
        return er("undefined", e);
      }, lt), Ha = {}, ht, Va = ((ht = {}).function = function() {
        throw new Error("Function serialization is not implemented; nothing to deserialize");
      }, ht.error = function(e) {
        var r = e.stack, n = e.code, o = e.data, a = new Error(e.message);
        return a.code = n, o && (a.data = o), a.stack = r + `

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
        return !!Gr(window).match(/MSIE|trident|edge\/12|edge\/13/i);
      }
      function ri(e) {
        return !Kr(window, e);
      }
      function ni(e, r) {
        if (e) {
          if (F() !== It(e)) return !0;
        } else if (r && !U(r)) return !0;
        return !1;
      }
      function oi(e) {
        var r = e.win, n = e.domain;
        return !(!Bn() || n && !ni(n, r) || r && !ri(r));
      }
      function $n(e) {
        return "__postrobot_bridge___" + (e = e || It(e)).replace(/[^a-zA-Z0-9]+/g, "_");
      }
      function ii() {
        return !!(window.name && window.name === $n(F()));
      }
      var Ja = new R(function(e) {
        if (window.document && window.document.body) return e(window.document.body);
        var r = setInterval(function() {
          if (window.document && window.document.body)
            return clearInterval(r), e(window.document.body);
        }, 10);
      });
      function ai(e) {
        Ze("remoteWindowPromises").getOrSet(e, function() {
          return new R();
        });
      }
      function qn(e) {
        var r = Ze("remoteWindowPromises").get(e);
        if (!r) throw new Error("Remote window promise not found");
        return r;
      }
      function si(e, r, n) {
        qn(e).resolve(function(o, a, u) {
          if (o !== e) throw new Error("Remote window does not match window");
          if (!ft(a, r)) throw new Error("Remote domain " + a + " does not match domain " + r);
          n.fireAndForget(u);
        });
      }
      function Hn(e, r) {
        qn(e).reject(r).catch(ye);
      }
      function un(e) {
        for (var r = e.win, n = e.name, o = e.domain, a = de("popupWindowsByName"), u = Ze("popupWindowsByWin"), d = 0, h = a.keys(); d < h.length; d++) {
          var l = h[d], v = a.get(l);
          v && !ge(v.win) || a.del(l);
        }
        if (ge(r)) return {
          win: r,
          name: n,
          domain: o
        };
        var E = u.getOrSet(r, function() {
          return n ? a.getOrSet(n, function() {
            return {
              win: r,
              name: n
            };
          }) : {
            win: r
          };
        });
        if (E.win && E.win !== r) throw new Error("Different window already linked for window: " + (n || "undefined"));
        return n && (E.name = n, a.set(n, E)), o && (E.domain = o, ai(r)), u.set(r, E), E;
      }
      function ui(e) {
        var r = e.on, n = e.send, o = e.receiveMessage;
        a = window.open, window.open = function(u, d, h, l) {
          var v = a.call(this, On(u), d, h, l);
          return v && (un({
            win: v,
            name: d,
            domain: u ? It(u) : null
          }), v);
        };
        var a;
        (function(u) {
          var d = u.on, h = u.send, l = u.receiveMessage, v = de("popupWindowsByName");
          d("postrobot_open_tunnel", function(E) {
            var w = E.source, p = E.origin, y = E.data, b = de("bridges").get(p);
            if (!b) throw new Error("Can not find bridge promise for domain " + p);
            return b.then(function(O) {
              if (w !== O) throw new Error("Message source does not matched registered bridge for domain " + p);
              if (!y.name) throw new Error("Register window expected to be passed window name");
              if (!y.sendMessage) throw new Error("Register window expected to be passed sendMessage method");
              if (!v.has(y.name)) throw new Error("Window with name " + y.name + " does not exist, or was not opened by this window");
              var S = function() {
                return v.get(y.name);
              };
              if (!S().domain) throw new Error("We do not have a registered domain for window " + y.name);
              if (S().domain !== p) throw new Error("Message origin " + p + " does not matched registered window origin " + (S().domain || "unknown"));
              return si(S().win, p, y.sendMessage), {
                sendMessage: function(I) {
                  if (window && !window.closed && S()) {
                    var z = S().domain;
                    if (z) try {
                      l({
                        data: I,
                        origin: z,
                        source: S().win
                      }, {
                        on: d,
                        send: h
                      });
                    } catch (V) {
                      R.reject(V);
                    }
                  }
                }
              };
            });
          });
        })({
          on: r,
          send: n,
          receiveMessage: o
        }), function(u) {
          var d = u.send;
          xt(window).openTunnelToParent = function(h) {
            var l = h.name, v = h.source, E = h.canary, w = h.sendMessage, p = de("tunnelWindows"), y = Je(window);
            if (!y) throw new Error("No parent window found to open tunnel to");
            var b = function(O) {
              var S = O.name, I = O.source, z = O.canary, V = O.sendMessage;
              (function() {
                for (var q = de("tunnelWindows"), L = 0, Q = q.keys(); L < Q.length; L++) {
                  var $ = Q[L];
                  ge(q[$].source) && q.del($);
                }
              })();
              var A = Xe();
              return de("tunnelWindows").set(A, {
                name: S,
                source: I,
                canary: z,
                sendMessage: V
              }), A;
            }({
              name: l,
              source: v,
              canary: E,
              sendMessage: w
            });
            return d(y, "postrobot_open_tunnel", {
              name: l,
              sendMessage: function() {
                var O = p.get(b);
                if (O && O.source && !ge(O.source)) {
                  try {
                    O.canary();
                  } catch {
                    return;
                  }
                  O.sendMessage.apply(this, arguments);
                }
              }
            }, {
              domain: "*"
            });
          };
        }({
          send: n
        }), function(u) {
          var d = u.on, h = u.send, l = u.receiveMessage;
          R.try(function() {
            var v = Te(window);
            if (v && oi({
              win: v
            })) {
              return ai(v), (E = v, Ze("remoteBridgeAwaiters").getOrSet(E, function() {
                return R.try(function() {
                  var w = Qt(E, $n(F()));
                  if (w) return U(w) && xt(te(w)) ? w : new R(function(p) {
                    var y, b;
                    y = setInterval(function() {
                      if (w && U(w) && xt(te(w)))
                        return clearInterval(y), clearTimeout(b), p(w);
                    }, 100), b = setTimeout(function() {
                      return clearInterval(y), p();
                    }, 2e3);
                  });
                });
              })).then(function(w) {
                return w ? window.name ? xt(te(w)).openTunnelToParent({
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
                    } catch (y) {
                      R.reject(y);
                    }
                  }
                }).then(function(p) {
                  var y = p.source, b = p.origin, O = p.data;
                  if (y !== v) throw new Error("Source does not match opener");
                  si(y, b, O.sendMessage);
                }).catch(function(p) {
                  throw Hn(v, p), p;
                }) : Hn(v, new Error("Can not register with opener: window does not have a name")) : Hn(v, new Error("Can not register with opener: no bridge found in opener"));
              });
              var E;
            }
          });
        }({
          on: r,
          send: n,
          receiveMessage: o
        });
      }
      function Vn() {
        for (var e = de("idToProxyWindow"), r = 0, n = e.keys(); r < n.length; r++) {
          var o = n[r];
          e.get(o).shouldClean() && e.del(o);
        }
      }
      function ci(e, r) {
        var n = r.send, o = r.id, a = o === void 0 ? Xe() : o, u = e.then(function(l) {
          if (U(l)) return te(l).name;
        }), d = e.then(function(l) {
          if (ge(l)) throw new Error("Window is closed, can not determine type");
          return Te(l) ? St.POPUP : St.IFRAME;
        });
        u.catch(ye), d.catch(ye);
        var h = function() {
          return e.then(function(l) {
            if (!ge(l)) return U(l) ? te(l).name : u;
          });
        };
        return {
          id: a,
          getType: function() {
            return d;
          },
          getInstanceID: Ma(function() {
            return e.then(function(l) {
              return Xo(l, {
                send: n
              });
            });
          }),
          close: function() {
            return e.then(So);
          },
          getName: h,
          focus: function() {
            return e.then(function(l) {
              l.focus();
            });
          },
          isClosed: function() {
            return e.then(function(l) {
              return ge(l);
            });
          },
          setLocation: function(l, v) {
            return v === void 0 && (v = {}), e.then(function(E) {
              var w = window.location.protocol + "//" + window.location.host, p = v.method, y = p === void 0 ? "get" : p, b = v.body;
              if (l.indexOf("/") === 0) l = "" + w + l;
              else if (!l.match(/^https?:\/\//) && l.indexOf(w) !== 0) throw new Error("Expected url to be http or https url, or absolute path, got " + JSON.stringify(l));
              if (y === "post") return h().then(function(O) {
                if (!O) throw new Error("Can not post to window without target name");
                (function(S) {
                  var I = S.url, z = S.target, V = S.body, A = S.method, q = A === void 0 ? "post" : A, L = document.createElement("form");
                  if (L.setAttribute("target", z), L.setAttribute("method", q), L.setAttribute("action", I), L.style.display = "none", V) for (var Q = 0, $ = Object.keys(V); Q < $.length; Q++) {
                    var ue, oe = $[Q], J = document.createElement("input");
                    J.setAttribute("name", oe), J.setAttribute("value", (ue = V[oe]) == null ? void 0 : ue.toString()), L.appendChild(J);
                  }
                  Wo().appendChild(L), L.submit(), Wo().removeChild(L);
                })({
                  url: l,
                  target: O,
                  method: y,
                  body: b
                });
              });
              if (y !== "get") throw new Error("Unsupported method: " + y);
              if (U(E)) try {
                if (E.location && typeof E.location.replace == "function") {
                  E.location.replace(l);
                  return;
                }
              } catch {
              }
              E.location = l;
            });
          },
          setName: function(l) {
            return e.then(function(v) {
              un({
                win: v,
                name: l
              });
              var E = U(v), w = Ro(v);
              if (!E) throw new Error("Can not set name for cross-domain window: " + l);
              te(v).name = l, w && w.setAttribute("name", l), u = R.resolve(l);
            });
          }
        };
      }
      var pt = function() {
        function e(n) {
          var o = n.send, a = n.win, u = n.serializedWindow;
          this.id = void 0, this.isProxyWindow = !0, this.serializedWindow = void 0, this.actualWindow = void 0, this.actualWindowPromise = void 0, this.send = void 0, this.name = void 0, this.actualWindowPromise = new R(), this.serializedWindow = u || ci(this.actualWindowPromise, {
            send: o
          }), de("idToProxyWindow").set(this.getID(), this), a && this.setWindow(a, {
            send: o
          });
        }
        var r = e.prototype;
        return r.getID = function() {
          return this.serializedWindow.id;
        }, r.getType = function() {
          return this.serializedWindow.getType();
        }, r.isPopup = function() {
          return this.getType().then(function(n) {
            return n === St.POPUP;
          });
        }, r.setLocation = function(n, o) {
          var a = this;
          return this.serializedWindow.setLocation(n, o).then(function() {
            return a;
          });
        }, r.getName = function() {
          return this.serializedWindow.getName();
        }, r.setName = function(n) {
          var o = this;
          return this.serializedWindow.setName(n).then(function() {
            return o;
          });
        }, r.close = function() {
          var n = this;
          return this.serializedWindow.close().then(function() {
            return n;
          });
        }, r.focus = function() {
          var n = this, o = this.isPopup(), a = this.getName(), u = R.hash({
            isPopup: o,
            name: a
          }).then(function(h) {
            var l = h.name;
            h.isPopup && l && window.open("", l, "noopener");
          }), d = this.serializedWindow.focus();
          return R.all([u, d]).then(function() {
            return n;
          });
        }, r.isClosed = function() {
          return this.serializedWindow.isClosed();
        }, r.getWindow = function() {
          return this.actualWindow;
        }, r.setWindow = function(n, o) {
          var a = o.send;
          this.actualWindow = n, this.actualWindowPromise.resolve(this.actualWindow), this.serializedWindow = ci(this.actualWindowPromise, {
            send: a,
            id: this.getID()
          }), Ze("winToProxyWindow").set(n, this);
        }, r.awaitWindow = function() {
          return this.actualWindowPromise;
        }, r.matchWindow = function(n, o) {
          var a = this, u = o.send;
          return R.try(function() {
            return a.actualWindow ? n === a.actualWindow : R.hash({
              proxyInstanceID: a.getInstanceID(),
              knownWindowInstanceID: Xo(n, {
                send: u
              })
            }).then(function(d) {
              var h = d.proxyInstanceID === d.knownWindowInstanceID;
              return h && a.setWindow(n, {
                send: u
              }), h;
            });
          });
        }, r.unwrap = function() {
          return this.actualWindow || this;
        }, r.getInstanceID = function() {
          return this.serializedWindow.getInstanceID();
        }, r.shouldClean = function() {
          return !!(this.actualWindow && ge(this.actualWindow));
        }, r.serialize = function() {
          return this.serializedWindow;
        }, e.unwrap = function(n) {
          return e.isProxyWindow(n) ? n.unwrap() : n;
        }, e.serialize = function(n, o) {
          var a = o.send;
          return Vn(), e.toProxyWindow(n, {
            send: a
          }).serialize();
        }, e.deserialize = function(n, o) {
          var a = o.send;
          return Vn(), de("idToProxyWindow").get(n.id) || new e({
            serializedWindow: n,
            send: a
          });
        }, e.isProxyWindow = function(n) {
          return !!(n && !kt(n) && n.isProxyWindow);
        }, e.toProxyWindow = function(n, o) {
          var a = o.send;
          if (Vn(), e.isProxyWindow(n)) return n;
          var u = n;
          return Ze("winToProxyWindow").get(u) || new e({
            win: u,
            send: a
          });
        }, e;
      }();
      function Gn(e, r, n, o, a) {
        var u = Ze("methodStore"), d = de("proxyWindowMethods");
        pt.isProxyWindow(o) ? d.set(e, {
          val: r,
          name: n,
          domain: a,
          source: o
        }) : (d.del(e), u.getOrSet(o, function() {
          return {};
        })[e] = {
          domain: a,
          name: n,
          val: r,
          source: o
        });
      }
      function di(e, r) {
        var n = Ze("methodStore"), o = de("proxyWindowMethods");
        return n.getOrSet(e, function() {
          return {};
        })[r] || o.get(r);
      }
      function fi(e, r, n, o, a) {
        d = (u = {
          on: a.on,
          send: a.send
        }).on, h = u.send, de("builtinListeners").getOrSet("functionCalls", function() {
          return d("postrobot_method", {
            domain: "*"
          }, function(E) {
            var w = E.source, p = E.origin, y = E.data, b = y.id, O = y.name, S = di(w, b);
            if (!S) throw new Error("Could not find method '" + O + "' with id: " + y.id + " in " + F(window));
            var I = S.source, z = S.domain, V = S.val;
            return R.try(function() {
              if (!ft(z, p)) throw new Error("Method '" + y.name + "' domain " + JSON.stringify(Wn(S.domain) ? S.domain.source : S.domain) + " does not match origin " + p + " in " + F(window));
              if (pt.isProxyWindow(I)) return I.matchWindow(w, {
                send: h
              }).then(function(A) {
                if (!A) throw new Error("Method call '" + y.name + "' failed - proxy window does not match source in " + F(window));
              });
            }).then(function() {
              return V.apply({
                source: w,
                origin: p
              }, y.args);
            }, function(A) {
              return R.try(function() {
                if (V.onError) return V.onError(A);
              }).then(function() {
                throw A.stack && (A.stack = "Remote call to " + O + "(" + function(q) {
                  return q === void 0 && (q = []), In(q).map(function(L) {
                    return typeof L == "string" ? "'" + L + "'" : L === void 0 ? "undefined" : L === null ? "null" : typeof L == "boolean" ? L.toString() : Array.isArray(L) ? "[ ... ]" : typeof L == "object" ? "{ ... }" : typeof L == "function" ? "() => { ... }" : "<" + typeof L + ">";
                  }).join(", ");
                }(y.args) + `) failed

` + A.stack), A;
              });
            }).then(function(A) {
              return {
                result: A,
                id: b,
                name: O
              };
            });
          });
        });
        var u, d, h, l = n.__id__ || Xe();
        e = pt.unwrap(e);
        var v = n.__name__ || n.name || o;
        return typeof v == "string" && typeof v.indexOf == "function" && v.indexOf("anonymous::") === 0 && (v = v.replace("anonymous::", o + "::")), pt.isProxyWindow(e) ? (Gn(l, n, v, e, r), e.awaitWindow().then(function(E) {
          Gn(l, n, v, E, r);
        })) : Gn(l, n, v, e, r), er("cross_domain_function", {
          id: l,
          name: v
        });
      }
      function li(e, r, n, o) {
        var a, u = o.on, d = o.send;
        return function(h, l) {
          l === void 0 && (l = Ha);
          var v = JSON.stringify(h, function(E) {
            var w = this[E];
            if (Un(this)) return w;
            var p = ti(w);
            if (!p) return w;
            var y = l[p] || qa[p];
            return y ? y(w, E) : w;
          });
          return v === void 0 ? "undefined" : v;
        }(n, ((a = {}).promise = function(h, l) {
          return function(v, E, w, p, y) {
            return er("cross_domain_zalgo_promise", {
              then: fi(v, E, function(b, O) {
                return w.then(b, O);
              }, p, {
                on: y.on,
                send: y.send
              })
            });
          }(e, r, h, l, {
            on: u,
            send: d
          });
        }, a.function = function(h, l) {
          return fi(e, r, h, l, {
            on: u,
            send: d
          });
        }, a.object = function(h) {
          return kt(h) || pt.isProxyWindow(h) ? er("cross_domain_window", pt.serialize(h, {
            send: d
          })) : h;
        }, a));
      }
      function hi(e, r, n, o) {
        var a, u = o.send;
        return function(d, h) {
          if (h === void 0 && (h = Ga), d !== "undefined") return JSON.parse(d, function(l, v) {
            if (Un(this)) return v;
            var E, w;
            if (Un(v) ? (E = v.__type__, w = v.__val__) : (E = ti(v), w = v), !E) return w;
            var p = h[E] || Va[E];
            return p ? p(w, l) : w;
          });
        }(n, ((a = {}).cross_domain_zalgo_promise = function(d) {
          return function(h, l, v) {
            return new R(v.then);
          }(0, 0, d);
        }, a.cross_domain_function = function(d) {
          return function(h, l, v, E) {
            var w = v.id, p = v.name, y = E.send, b = function(S) {
              S === void 0 && (S = {});
              function I() {
                var z = arguments;
                return pt.toProxyWindow(h, {
                  send: y
                }).awaitWindow().then(function(V) {
                  var A = di(V, w);
                  if (A && A.val !== I) return A.val.apply({
                    source: window,
                    origin: F()
                  }, z);
                  var q = [].slice.call(z);
                  return S.fireAndForget ? y(V, "postrobot_method", {
                    id: w,
                    name: p,
                    args: q
                  }, {
                    domain: l,
                    fireAndForget: !0
                  }) : y(V, "postrobot_method", {
                    id: w,
                    name: p,
                    args: q
                  }, {
                    domain: l,
                    fireAndForget: !1
                  }).then(function(L) {
                    return L.data.result;
                  });
                }).catch(function(V) {
                  throw V;
                });
              }
              return I.__name__ = p, I.__origin__ = l, I.__source__ = h, I.__id__ = w, I.origin = l, I;
            }, O = b();
            return O.fireAndForget = b({
              fireAndForget: !0
            }), O;
          }(e, r, d, {
            send: u
          });
        }, a.cross_domain_window = function(d) {
          return pt.deserialize(d, {
            send: u
          });
        }, a));
      }
      var Ir = {};
      Ir.postrobot_post_message = function(e, r, n) {
        n.indexOf("file:") === 0 && (n = "*"), e.postMessage(r, n);
      }, Ir.postrobot_bridge = function(e, r, n) {
        if (!Bn() && !ii()) throw new Error("Bridge not needed for browser");
        if (U(e)) throw new Error("Post message through bridge disabled between same domain windows");
        if (Kr(window, e) !== !1) throw new Error("Can only use bridge to communicate between two different windows, not between frames");
        (function(o, a, u) {
          var d = Jr(window, o), h = Jr(o, window);
          if (!d && !h) throw new Error("Can only send messages to and from parent and popup windows");
          qn(o).then(function(l) {
            return l(o, a, u);
          });
        })(e, n, r);
      }, Ir.postrobot_global = function(e, r) {
        if (!Gr(window).match(/MSIE|rv:11|trident|edge\/12|edge\/13/i)) throw new Error("Global messaging not needed for browser");
        if (!U(e)) throw new Error("Post message through global disabled between different domain windows");
        if (Kr(window, e) !== !1) throw new Error("Can only use global to communicate between two different windows, not between frames");
        var n = xt(e);
        if (!n) throw new Error("Can not find postRobot global on foreign window");
        n.receiveMessage({
          source: window,
          origin: F(),
          data: r
        });
      };
      function Jn(e, r, n, o) {
        var a = o.on, u = o.send;
        return R.try(function() {
          var d = Ze().getOrSet(e, function() {
            return {};
          });
          return d.buffer = d.buffer || [], d.buffer.push(n), d.flush = d.flush || R.flush().then(function() {
            if (ge(e)) throw new Error("Window is closed");
            var h = li(e, r, ((l = {}).__post_robot_11_0_0__ = d.buffer || [], l), {
              on: a,
              send: u
            }), l;
            delete d.buffer;
            for (var v = Object.keys(Ir), E = [], w = 0; w < v.length; w++) {
              var p = v[w];
              try {
                Ir[p](e, h, r);
              } catch (y) {
                E.push(y);
              }
            }
            if (E.length === v.length) throw new Error(`All post-robot messaging strategies failed:

` + E.map(function(y, b) {
              return b + ". " + lr(y);
            }).join(`

`));
          }), d.flush.then(function() {
            delete d.flush;
          });
        }).then(ye);
      }
      function pi(e) {
        return de("responseListeners").get(e);
      }
      function vi(e) {
        de("responseListeners").del(e);
      }
      function wi(e) {
        return de("erroredResponseListeners").has(e);
      }
      function mi(e) {
        var r = e.name, n = e.win, o = e.domain, a = Ze("requestListeners");
        if (n === "*" && (n = null), o === "*" && (o = null), !r) throw new Error("Name required to get request listener");
        for (var u = 0, d = [n, sn()]; u < d.length; u++) {
          var h = d[u];
          if (h) {
            var l = a.get(h);
            if (l) {
              var v = l[r];
              if (v) {
                if (o && typeof o == "string") {
                  if (v[o]) return v[o];
                  if (v.__domain_regex__) for (var E = 0, w = v.__domain_regex__; E < w.length; E++) {
                    var p = w[E], y = p.listener;
                    if (ft(p.regex, o)) return y;
                  }
                }
                if (v["*"]) return v["*"];
              }
            }
          }
        }
      }
      function Kn(e, r) {
        var n = r.on, o = r.send, a = de("receivedMessages");
        try {
          if (!window || window.closed || !e.source) return;
        } catch {
          return;
        }
        var u = e.source, d = e.origin, h = function(w, p, y, b) {
          var O = b.on, S = b.send, I;
          try {
            I = hi(p, y, w, {
              on: O,
              send: S
            });
          } catch {
            return;
          }
          if (I && typeof I == "object" && I !== null) {
            var z = I.__post_robot_11_0_0__;
            if (Array.isArray(z)) return z;
          }
        }(e.data, u, d, {
          on: n,
          send: o
        });
        if (h) {
          ei(u);
          for (var l, v = function() {
            var w = h[E];
            if (a.has(w.id)) return {
              v: void 0
            };
            if (a.set(w.id, !0), ge(u) && !w.fireAndForget) return {
              v: void 0
            };
            w.origin.indexOf("file:") === 0 && (d = "file://");
            try {
              w.type === "postrobot_message_request" ? function(p, y, b, O) {
                var S = O.on, I = O.send, z = mi({
                  name: b.name,
                  win: p,
                  domain: y
                }), V = b.name === "postrobot_method" && b.data && typeof b.data.name == "string" ? b.data.name + "()" : b.name;
                function A(q, L, Q) {
                  return R.flush().then(function() {
                    if (!b.fireAndForget && !ge(p)) try {
                      return Jn(p, y, {
                        id: Xe(),
                        origin: F(window),
                        type: "postrobot_message_response",
                        hash: b.hash,
                        name: b.name,
                        ack: q,
                        data: L,
                        error: Q
                      }, {
                        on: S,
                        send: I
                      });
                    } catch ($) {
                      throw new Error("Send response message failed for " + V + " in " + F() + `

` + lr($));
                    }
                  });
                }
                R.all([R.flush().then(function() {
                  if (!b.fireAndForget && !ge(p)) try {
                    return Jn(p, y, {
                      id: Xe(),
                      origin: F(window),
                      type: "postrobot_message_ack",
                      hash: b.hash,
                      name: b.name
                    }, {
                      on: S,
                      send: I
                    });
                  } catch (q) {
                    throw new Error("Send ack message failed for " + V + " in " + F() + `

` + lr(q));
                  }
                }), R.try(function() {
                  if (!z) throw new Error("No handler found for post message: " + b.name + " from " + y + " in " + window.location.protocol + "//" + window.location.host + window.location.pathname);
                  return z.handler({
                    source: p,
                    origin: y,
                    data: b.data
                  });
                }).then(function(q) {
                  return A("success", q);
                }, function(q) {
                  return A("error", null, q);
                })]).then(ye).catch(function(q) {
                  if (z && z.handleError) return z.handleError(q);
                  throw q;
                });
              }(u, d, w, {
                on: n,
                send: o
              }) : w.type === "postrobot_message_response" ? function(p, y, b) {
                if (!wi(b.hash)) {
                  var O = pi(b.hash);
                  if (!O) throw new Error("No handler found for post message response for message: " + b.name + " from " + y + " in " + window.location.protocol + "//" + window.location.host + window.location.pathname);
                  if (!ft(O.domain, y)) throw new Error("Response origin " + y + " does not match domain " + (S = O.domain, Array.isArray(S) ? "(" + S.join(" | ") + ")" : ut(S) ? "RegExp(" + S.toString() + ")" : S.toString()));
                  var S;
                  if (p !== O.win) throw new Error("Response source does not match registered window");
                  vi(b.hash), b.ack === "error" ? O.promise.reject(b.error) : b.ack === "success" && O.promise.resolve({
                    source: p,
                    origin: y,
                    data: b.data
                  });
                }
              }(u, d, w) : w.type === "postrobot_message_ack" && function(p, y, b) {
                if (!wi(b.hash)) {
                  var O = pi(b.hash);
                  if (!O) throw new Error("No handler found for post message ack for message: " + b.name + " from " + y + " in " + window.location.protocol + "//" + window.location.host + window.location.pathname);
                  try {
                    if (!ft(O.domain, y)) throw new Error("Ack origin " + y + " does not match domain " + O.domain.toString());
                    if (p !== O.win) throw new Error("Ack source does not match registered window");
                  } catch (S) {
                    O.promise.reject(S);
                  }
                  O.ack = !0;
                }
              }(u, d, w);
            } catch (p) {
              setTimeout(function() {
                throw p;
              }, 0);
            }
          }, E = 0; E < h.length; E++) if (l = v()) return l.v;
        }
      }
      function At(e, r, n) {
        if (!e) throw new Error("Expected name");
        if (typeof (r = r || {}) == "function" && (n = r, r = {}), !n) throw new Error("Expected handler");
        var o = function a(u, d) {
          var h = u.name, l = u.win, v = u.domain, E = Ze("requestListeners");
          if (!h || typeof h != "string") throw new Error("Name required to add request listener");
          if (l && l !== "*" && pt.isProxyWindow(l)) {
            var w = l.awaitWindow().then(function(ue) {
              return a({
                name: h,
                win: ue,
                domain: v
              }, d);
            });
            return {
              cancel: function() {
                w.then(function(ue) {
                  return ue.cancel();
                }, ye);
              }
            };
          }
          var p = l;
          if (Array.isArray(p)) {
            for (var y = [], b = 0, O = p; b < O.length; b++) y.push(a({
              name: h,
              domain: v,
              win: O[b]
            }, d));
            return {
              cancel: function() {
                for (var ue = 0; ue < y.length; ue++) y[ue].cancel();
              }
            };
          }
          if (Array.isArray(v)) {
            for (var S = [], I = 0, z = v; I < z.length; I++) S.push(a({
              name: h,
              win: p,
              domain: z[I]
            }, d));
            return {
              cancel: function() {
                for (var ue = 0; ue < S.length; ue++) S[ue].cancel();
              }
            };
          }
          var V = mi({
            name: h,
            win: p,
            domain: v
          });
          p && p !== "*" || (p = sn());
          var A = (v = v || "*").toString();
          if (V) throw p && v ? new Error("Request listener already exists for " + h + " on domain " + v.toString() + " for " + (p === sn() ? "wildcard" : "specified") + " window") : p ? new Error("Request listener already exists for " + h + " for " + (p === sn() ? "wildcard" : "specified") + " window") : v ? new Error("Request listener already exists for " + h + " on domain " + v.toString()) : new Error("Request listener already exists for " + h);
          var q = E.getOrSet(p, function() {
            return {};
          }), L = Nr(q, h, function() {
            return {};
          }), Q, $;
          return Wn(v) ? (Q = Nr(L, "__domain_regex__", function() {
            return [];
          })).push($ = {
            regex: v,
            listener: d
          }) : L[A] = d, {
            cancel: function() {
              delete L[A], $ && (Q.splice(Q.indexOf($, 1)), Q.length || delete L.__domain_regex__), Object.keys(L).length || delete q[h], p && !Object.keys(q).length && E.del(p);
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
            o.cancel();
          }
        };
      }
      var bt = function e(r, n, o, a) {
        var u = (a = a || {}).domain || "*", d = a.timeout || -1, h = a.timeout || 5e3, l = a.fireAndForget || !1;
        return pt.toProxyWindow(r, {
          send: e
        }).awaitWindow().then(function(v) {
          return R.try(function() {
            if (function(E, w, p) {
              if (!E) throw new Error("Expected name");
              if (p && typeof p != "string" && !Array.isArray(p) && !Wn(p)) throw new TypeError("Can not send " + E + ". Expected domain " + JSON.stringify(p) + " to be a string, array, or regex");
              if (ge(w)) throw new Error("Can not send " + E + ". Target window is closed");
            }(n, v, u), function(E, w) {
              var p = Xt(w);
              if (p) return p === E;
              if (w === E || Se(w) === w) return !1;
              for (var y = 0, b = Ke(E); y < b.length; y++) if (b[y] === w) return !0;
              return !1;
            }(window, v)) return ko(v, h);
          }).then(function(E) {
            return function(w, p, y, b) {
              var O = b.send;
              return R.try(function() {
                return typeof p == "string" ? p : R.try(function() {
                  return y || jn(w, {
                    send: O
                  }).then(function(S) {
                    return S.domain;
                  });
                }).then(function(S) {
                  if (!ft(p, p)) throw new Error("Domain " + kr(p) + " does not match " + kr(p));
                  return S;
                });
              });
            }(v, u, (E === void 0 ? {} : E).domain, {
              send: e
            });
          }).then(function(E) {
            var w = E, p = n === "postrobot_method" && o && typeof o.name == "string" ? o.name + "()" : n, y = new R(), b = n + "_" + Xe();
            if (!l) {
              var O = {
                name: n,
                win: v,
                domain: w,
                promise: y
              };
              (function(L, Q) {
                de("responseListeners").set(L, Q);
              })(b, O);
              var S = Ze("requestPromises").getOrSet(v, function() {
                return [];
              });
              S.push(y), y.catch(function() {
                (function(L) {
                  de("erroredResponseListeners").set(L, !0);
                })(b), vi(b);
              });
              var I = function(L) {
                return Ze("knownWindows").get(L, !1);
              }(v) ? 1e4 : 2e3, z = d, V = I, A = z, q = Dr(function() {
                return ge(v) ? y.reject(new Error("Window closed for " + n + " before " + (O.ack ? "response" : "ack"))) : O.cancelled ? y.reject(new Error("Response listener was cancelled for " + n)) : (V = Math.max(V - 500, 0), A !== -1 && (A = Math.max(A - 500, 0)), O.ack || V !== 0 ? A === 0 ? y.reject(new Error("No response for postMessage " + p + " in " + F() + " in " + z + "ms")) : void 0 : y.reject(new Error("No ack for postMessage " + p + " in " + F() + " in " + I + "ms")));
              }, 500);
              y.finally(function() {
                q.cancel(), S.splice(S.indexOf(y, 1));
              }).catch(ye);
            }
            return Jn(v, w, {
              id: Xe(),
              origin: F(window),
              type: "postrobot_message_request",
              hash: b,
              name: n,
              data: o,
              fireAndForget: l
            }, {
              on: At,
              send: e
            }).then(function() {
              return l ? y.resolve() : y;
            }, function(L) {
              throw new Error("Send request message failed for " + p + " in " + F() + `

` + lr(L));
            });
          });
        });
      };
      function Ar(e) {
        return pt.toProxyWindow(e, {
          send: bt
        });
      }
      function gi(e) {
        for (var r = 0, n = Ze("requestPromises").get(e, []); r < n.length; r++) n[r].reject(new Error("Window " + (ge(e) ? "closed" : "cleaned up") + " before response")).catch(ye);
      }
      var Ut;
      Ut = {
        setupBridge: ui,
        openBridge: function(e, r) {
          var n = de("bridges"), o = de("bridgeFrames");
          return r = r || It(e), n.getOrSet(r, function() {
            return R.try(function() {
              if (F() === r) throw new Error("Can not open bridge on the same domain as current domain: " + r);
              var a = $n(r);
              if (Qt(window, a)) throw new Error("Frame with name " + a + " already exists on page");
              var u = function(d, h) {
                var l = document.createElement("iframe");
                return l.setAttribute("name", d), l.setAttribute("id", d), l.setAttribute("style", "display: none; margin: 0; padding: 0; border: 0px none; overflow: hidden;"), l.setAttribute("frameborder", "0"), l.setAttribute("border", "0"), l.setAttribute("scrolling", "no"), l.setAttribute("allowTransparency", "true"), l.setAttribute("tabindex", "-1"), l.setAttribute("hidden", "true"), l.setAttribute("title", ""), l.setAttribute("role", "presentation"), l.src = h, l;
              }(a, e);
              return o.set(r, u), Ja.then(function(d) {
                d.appendChild(u);
                var h = u.contentWindow;
                return new R(function(l, v) {
                  u.addEventListener("load", l), u.addEventListener("error", v);
                }).then(function() {
                  return ko(h, 5e3, "Bridge " + e);
                }).then(function() {
                  return h;
                });
              });
            });
          });
        },
        linkWindow: un,
        linkUrl: function(e, r) {
          un({
            win: e,
            domain: It(r)
          });
        },
        isBridge: ii,
        needsBridge: oi,
        needsBridgeForBrowser: Bn,
        hasBridge: function(e, r) {
          return de("bridges").has(r || It(e));
        },
        needsBridgeForWin: ri,
        needsBridgeForDomain: ni,
        destroyBridges: function() {
          for (var e = de("bridges"), r = de("bridgeFrames"), n = 0, o = r.keys(); n < o.length; n++) {
            var a = r.get(o[n]);
            a && a.parentNode && a.parentNode.removeChild(a);
          }
          r.reset(), e.reset();
        }
      };
      function Wr(e) {
        if (!U(e)) throw new Error("Can not get global for window on different domain");
        return e.__zoid_10_3_3__ || (e.__zoid_10_3_3__ = {}), e.__zoid_10_3_3__;
      }
      function yi(e, r) {
        try {
          return r(Wr(e));
        } catch {
        }
      }
      function cn(e) {
        return {
          get: function() {
            var r = this;
            return R.try(function() {
              if (r.source && r.source !== window) throw new Error("Can not call get on proxy object from a remote window");
              return e;
            });
          }
        };
      }
      function Ka(e) {
        return Dn(JSON.stringify(e));
      }
      function Yn(e) {
        var r = Wr(e);
        return r.references = r.references || {}, r.references;
      }
      function Ei(e) {
        var r = e.data, n = e.metaData, o = e.sender, a = e.receiver, u = e.passByReference, d = u !== void 0 && u, h = e.basic, l = h !== void 0 && h, v = Ar(a.win), E = l ? JSON.stringify(r) : li(v, a.domain, r, {
          on: At,
          send: bt
        }), w = d ? function(p) {
          var y = Xe();
          return Yn(window)[y] = p, {
            type: "uid",
            uid: y
          };
        }(E) : {
          type: "raw",
          val: E
        };
        return {
          serializedData: Ka({
            sender: {
              domain: o.domain
            },
            metaData: n,
            reference: w
          }),
          cleanReference: function() {
            p = window, (y = w).type === "uid" && delete Yn(p)[y.uid];
            var p, y;
          }
        };
      }
      function bi(e) {
        var r = e.sender, n = e.basic, o = n !== void 0 && n, a = function(E) {
          return JSON.parse(function(w) {
            if (typeof atob == "function") return decodeURIComponent([].map.call(atob(w), function(p) {
              return "%" + ("00" + p.charCodeAt(0).toString(16)).slice(-2);
            }).join(""));
            if (typeof Buffer < "u") return Buffer.from(w, "base64").toString("utf8");
            throw new Error("Can not find window.atob or Buffer");
          }(E));
        }(e.data), u = a.reference, d = a.metaData, h;
        h = typeof r.win == "function" ? r.win({
          metaData: d
        }) : r.win;
        var l;
        l = typeof r.domain == "function" ? r.domain({
          metaData: d
        }) : typeof r.domain == "string" ? r.domain : a.sender.domain;
        var v = function(E, w) {
          if (w.type === "raw") return w.val;
          if (w.type === "uid") return Yn(E)[w.uid];
          throw new Error("Unsupported ref type: " + w.type);
        }(h, u);
        return {
          data: o ? JSON.parse(v) : function(E, w, p) {
            return hi(E, w, p, {
              on: At,
              send: bt
            });
          }(h, l, v),
          metaData: d,
          sender: {
            win: h,
            domain: l
          },
          reference: u
        };
      }
      var pe = {
        STRING: "string",
        OBJECT: "object",
        FUNCTION: "function",
        BOOLEAN: "boolean",
        NUMBER: "number",
        ARRAY: "array"
      }, dn = {
        JSON: "json",
        DOTIFY: "dotify",
        BASE64: "base64"
      }, xe = St, Ee = {
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
      function Pi(e) {
        return "__zoid__" + e.name + "__" + e.serializedPayload + "__";
      }
      function Zn(e) {
        if (!e) throw new Error("No window name");
        var r = e.split("__"), n = r[1], o = r[2], a = r[3];
        if (n !== "zoid") throw new Error("Window not rendered by zoid - got " + n);
        if (!o) throw new Error("Expected component name");
        if (!a) throw new Error("Expected serialized payload ref");
        return {
          name: o,
          serializedInitialPayload: a
        };
      }
      var Ya = Lt(function(e) {
        var r = bi({
          data: Zn(e).serializedInitialPayload,
          sender: {
            win: function(n) {
              return function(o) {
                if (o.type === "opener") return rn("opener", Te(window));
                if (o.type === "parent" && typeof o.distance == "number") return rn("parent", function(w, p) {
                  return p === void 0 && (p = 1), function(y, b) {
                    b === void 0 && (b = 1);
                    for (var O = y, S = 0; S < b; S++) {
                      if (!O) return;
                      O = Je(O);
                    }
                    return O;
                  }(w, Tn(w) - p);
                }(window, o.distance));
                if (o.type === "global" && o.uid && typeof o.uid == "string") {
                  var a = o.uid, u = Xt(window);
                  if (!u) throw new Error("Can not find ancestor window");
                  for (var d = 0, h = Ye(u); d < h.length; d++) {
                    var l = h[d];
                    if (U(l)) {
                      var v = yi(l, function(w) {
                        return w.windows && w.windows[a];
                      });
                      if (v) return v;
                    }
                  }
                } else if (o.type === "name") {
                  var E = o.name;
                  return rn("namedWindow", function(w, p) {
                    return Qt(w, p) || function y(b, O) {
                      var S = Qt(b, O);
                      if (S) return S;
                      for (var I = 0, z = Ke(b); I < z.length; I++) {
                        var V = y(z[I], O);
                        if (V) return V;
                      }
                    }(Se(w) || w, p);
                  }(rn("ancestor", Xt(window)), E));
                }
                throw new Error("Unable to find " + o.type + " parent component window");
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
      function Ti() {
        return Ya(window.name);
      }
      function Za(e, r) {
        if (r === void 0 && (r = window), e === Je(r)) return {
          type: "parent",
          distance: Tn(e)
        };
        if (e === Te(r)) return {
          type: "opener"
        };
        if (U(e) && (o = e, o !== Se(o))) {
          var n = te(e).name;
          if (n) return {
            type: "name",
            name: n
          };
        }
        var o;
      }
      function Oi(e, r, n, o, a) {
        if (!e.hasOwnProperty(n)) return o;
        var u = e[n];
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
      function Qa() {
        return R.try(function() {
          window.focus();
        });
      }
      function Ri() {
        return R.try(function() {
          window.close();
        });
      }
      var Wt = function() {
        return ye;
      }, tr = function(e) {
        return Xr(e.value);
      };
      function Qn(e, r, n) {
        for (var o = 0, a = Object.keys(T({}, e, r)); o < a.length; o++) {
          var u = a[o];
          n(u, r[u], e[u]);
        }
      }
      function Si(e, r, n) {
        var o = {};
        return R.all(function(a, u, d) {
          var h = [];
          return Qn(a, u, function(l, v, E) {
            var w = function(p, y, b) {
              return R.resolve().then(function() {
                var O, S;
                if (b != null && y) {
                  var I = (O = {}, O.get = y.queryParam, O.post = y.bodyParam, O)[n], z = (S = {}, S.get = y.queryValue, S.post = y.bodyValue, S)[n];
                  if (I) return R.hash({
                    finalParam: R.try(function() {
                      return typeof I == "function" ? I({
                        value: b
                      }) : typeof I == "string" ? I : p;
                    }),
                    finalValue: R.try(function() {
                      return typeof z == "function" && jt(b) ? z({
                        value: b
                      }) : b;
                    })
                  }).then(function(V) {
                    var A = V.finalParam, q = V.finalValue, L;
                    if (typeof q == "boolean") L = q.toString();
                    else if (typeof q == "string") L = q.toString();
                    else if (typeof q == "object" && q !== null) {
                      if (y.serialization === dn.JSON) L = JSON.stringify(q);
                      else if (y.serialization === dn.BASE64) L = Dn(JSON.stringify(q));
                      else if (y.serialization === dn.DOTIFY || !y.serialization) {
                        L = function oe(J, H, se) {
                          H === void 0 && (H = ""), se === void 0 && (se = {}), H = H && H + ".";
                          for (var X in J) J.hasOwnProperty(X) && J[X] != null && typeof J[X] != "function" && (J[X] && Array.isArray(J[X]) && J[X].length && J[X].every(function(De) {
                            return typeof De != "object";
                          }) ? se["" + H + X + "[]"] = J[X].join(",") : J[X] && typeof J[X] == "object" ? se = oe(J[X], "" + H + X, se) : se["" + H + X] = J[X].toString());
                          return se;
                        }(q, p);
                        for (var Q = 0, $ = Object.keys(L); Q < $.length; Q++) {
                          var ue = $[Q];
                          o[ue] = L[ue];
                        }
                        return;
                      }
                    } else typeof q == "number" && (L = q.toString());
                    o[A] = L;
                  });
                }
              });
            }(l, v, E);
            h.push(w);
          }), h;
        }(r, e)).then(function() {
          return o;
        });
      }
      function xi(e) {
        var r = e.uid, n = e.options, o = e.overrides, a = o === void 0 ? {} : o, u = e.parentWin, d = u === void 0 ? window : u, h = n.propsDef, l = n.containerTemplate, v = n.prerenderTemplate, E = n.tag, w = n.name, p = n.attributes, y = n.dimensions, b = n.autoResize, O = n.url, S = n.domain, I = n.exports, z = new R(), V = [], A = tn(), q = {}, L = {}, Q = {
          visible: !0
        }, $ = a.event ? a.event : (ue = {}, oe = {}, J = {
          on: function(x, N) {
            var B = oe[x] = oe[x] || [];
            B.push(N);
            var j = !1;
            return {
              cancel: function() {
                j || (j = !0, B.splice(B.indexOf(N), 1));
              }
            };
          },
          once: function(x, N) {
            var B = J.on(x, function() {
              B.cancel(), N();
            });
            return B;
          },
          trigger: function(x) {
            for (var N = arguments.length, B = new Array(N > 1 ? N - 1 : 0), j = 1; j < N; j++) B[j - 1] = arguments[j];
            var ee = oe[x], K = [];
            if (ee)
              for (var we = function() {
                var je = ee[me];
                K.push(R.try(function() {
                  return je.apply(void 0, B);
                }));
              }, me = 0; me < ee.length; me++) we();
            return R.all(K).then(ye);
          },
          triggerOnce: function(x) {
            if (ue[x]) return R.resolve();
            ue[x] = !0;
            for (var N = arguments.length, B = new Array(N > 1 ? N - 1 : 0), j = 1; j < N; j++) B[j - 1] = arguments[j];
            return J.trigger.apply(J, [x].concat(B));
          },
          reset: function() {
            oe = {};
          }
        }), ue, oe, J, H = a.props ? a.props : {}, se, X, De, Dt, vt, Bt = !1, $t = a.onError, _t = a.getProxyContainer, qt = a.show, Ht = a.hide, rr = a.close, Vt = a.renderContainer, Pt = a.getProxyWindow, nr = a.setProxyWin, Gt = a.openFrame, Jt = a.openPrerenderFrame, or = a.prerender, ir = a.open, ie = a.openPrerender, wt = a.watchForUnload, ae = a.getInternalState, ze = a.setInternalState, Ne = function() {
          return typeof y == "function" ? y({
            props: H
          }) : y;
        }, Le = function() {
          return R.try(function() {
            return a.resolveInitPromise ? a.resolveInitPromise() : z.resolve();
          });
        }, Oe = function(x) {
          return R.try(function() {
            return a.rejectInitPromise ? a.rejectInitPromise(x) : z.reject(x);
          });
        }, ke = function(x) {
          for (var N = {}, B = 0, j = Object.keys(H); B < j.length; B++) {
            var ee = j[B], K = h[ee];
            if (!K || K.sendToChild !== !1) {
              var we = K && K.trustedDomains && K.trustedDomains.length > 0 ? K.trustedDomains.reduce(function(me, je) {
                return me || ft(je, x);
              }, !1) : ft(x, F(window));
              K && K.sameDomain && !we || K && K.trustedDomains && !we || (N[ee] = H[ee]);
            }
          }
          return R.hash(N);
        }, _e = function() {
          return R.try(function() {
            return ae ? ae() : Q;
          });
        }, Me = function(x) {
          return R.try(function() {
            return ze ? ze(x) : Q = T({}, Q, x);
          });
        }, mt = function() {
          return Pt ? Pt() : R.try(function() {
            var x = H.window;
            if (x) {
              var N = Ar(x);
              return A.register(function() {
                return x.close();
              }), N;
            }
            return new pt({
              send: bt
            });
          });
        }, ot = function(x) {
          return nr ? nr(x) : R.try(function() {
            se = x;
          });
        }, Tt = function() {
          return qt ? qt() : R.hash({
            setState: Me({
              visible: !0
            }),
            showElement: X ? X.get().then(ja) : null
          }).then(ye);
        }, Mt = function() {
          return Ht ? Ht() : R.hash({
            setState: Me({
              visible: !1
            }),
            showElement: X ? X.get().then($o) : null
          }).then(ye);
        }, vr = function() {
          return typeof O == "function" ? O({
            props: H
          }) : O;
        }, wr = function() {
          return typeof p == "function" ? p({
            props: H
          }) : p;
        }, ar = function() {
          return It(vr());
        }, it = function(x, N) {
          var B = N.windowName;
          return Gt ? Gt(x, {
            windowName: B
          }) : R.try(function() {
            if (x === xe.IFRAME) return cn(Uo({
              attributes: T({
                name: B,
                title: w
              }, wr().iframe)
            }));
          });
        }, _r = function(x) {
          return Jt ? Jt(x) : R.try(function() {
            if (x === xe.IFRAME) return cn(Uo({
              attributes: T({
                name: "__zoid_prerender_frame__" + w + "_" + Xe() + "__",
                title: "prerender__" + w
              }, wr().iframe)
            }));
          });
        }, Mr = function(x, N, B) {
          return ie ? ie(x, N, B) : R.try(function() {
            if (x === xe.IFRAME) {
              if (!B) throw new Error("Expected proxy frame to be passed");
              return B.get().then(function(j) {
                return A.register(function() {
                  return Cr(j);
                }), Fn(j).then(function(ee) {
                  return te(ee);
                }).then(function(ee) {
                  return Ar(ee);
                });
              });
            }
            if (x === xe.POPUP) return N;
            throw new Error("No render context available for " + x);
          });
        }, mr = function() {
          return R.try(function() {
            if (se) return R.all([$.trigger(Ee.FOCUS), se.focus()]).then(ye);
          });
        }, fn = function() {
          var x = Wr(window);
          return x.windows = x.windows || {}, x.windows[r] = window, A.register(function() {
            delete x.windows[r];
          }), r;
        }, Fr = function(x, N, B, j) {
          if (N === F(window)) return {
            type: "global",
            uid: fn()
          };
          if (x !== window) throw new Error("Can not construct cross-domain window reference for different target window");
          if (H.window) {
            var ee = j.getWindow();
            if (!ee) throw new Error("Can not construct cross-domain window reference for lazy window prop");
            if (Xt(ee) !== window) throw new Error("Can not construct cross-domain window reference for window prop with different ancestor");
          }
          if (B === xe.POPUP) return {
            type: "opener"
          };
          if (B === xe.IFRAME) return {
            type: "parent",
            distance: Tn(window)
          };
          throw new Error("Can not construct window reference for child");
        }, ln = function(x, N) {
          return R.try(function() {
            var B;
            Dt = x, De = N, (B = se) == null || B.isPopup().then(function(j) {
              if ((N == null ? void 0 : N.name) !== "" && j) {
                var ee;
                (ee = se) == null || ee.setName(N == null ? void 0 : N.name);
              }
            }).finally(function() {
              Le(), A.register(function() {
                return N.close.fireAndForget().catch(ye);
              });
            });
          });
        }, zr = function(x) {
          var N = x.width, B = x.height;
          return R.try(function() {
            $.trigger(Ee.RESIZE, {
              width: N,
              height: B
            });
          });
        }, Lr = function(x) {
          return R.try(function() {
            return $.trigger(Ee.DESTROY);
          }).catch(ye).then(function() {
            return A.all(x);
          }).then(function() {
            var N = x || new Error("Component destroyed");
            vt && pr(vt) || N.message === "Window navigated away" ? z.resolve() : z.asyncReject(N);
          });
        }, Ft = Lt(function(x) {
          return R.try(function() {
            return rr ? ge(rr.__source__) ? void 0 : rr() : R.try(function() {
              return $.trigger(Ee.CLOSE);
            }).then(function() {
              return Lr(x || new Error("Component closed"));
            });
          });
        }), Ci = function(x, N) {
          var B = N.proxyWin, j = N.proxyFrame, ee = N.windowName;
          return ir ? ir(x, {
            proxyWin: B,
            proxyFrame: j,
            windowName: ee
          }) : R.try(function() {
            if (x === xe.IFRAME) {
              if (!j) throw new Error("Expected proxy frame to be passed");
              return j.get().then(function(Ce) {
                return Fn(Ce).then(function(fe) {
                  return A.register(function() {
                    return Cr(Ce);
                  }), A.register(function() {
                    return gi(fe);
                  }), fe;
                });
              });
            }
            if (x === xe.POPUP) {
              var K = Ne(), we = K.width, me = we === void 0 ? "300px" : we, je = K.height, be = je === void 0 ? "150px" : je;
              me = Ko(me, window.outerWidth), be = Ko(be, window.outerWidth);
              var Fe = function(Ce, fe) {
                var Ie = (fe = fe || {}).closeOnUnload, Pe = Ie === void 0 ? 1 : Ie, at = fe.name, Ue = at === void 0 ? "" : at, ce = fe.width, Be = fe.height, rt = 0, Ve = 0;
                ce && (window.outerWidth ? Ve = Math.round((window.outerWidth - ce) / 2) + window.screenX : window.screen.width && (Ve = Math.round((window.screen.width - ce) / 2))), Be && (window.outerHeight ? rt = Math.round((window.outerHeight - Be) / 2) + window.screenY : window.screen.height && (rt = Math.round((window.screen.height - Be) / 2))), delete fe.closeOnUnload, delete fe.name, ce && Be && (fe = T({
                  top: rt,
                  left: Ve,
                  width: ce,
                  height: Be,
                  status: 1,
                  toolbar: 0,
                  menubar: 0,
                  resizable: 1,
                  scrollbars: 1
                }, fe));
                var sr = Object.keys(fe).map(function(Nt) {
                  if (fe[Nt] != null) return Nt + "=" + kr(fe[Nt]);
                }).filter(Boolean).join(","), gt;
                try {
                  gt = window.open("", Ue, sr);
                } catch (Nt) {
                  throw new Mn("Can not open popup window - " + (Nt.stack || Nt.message));
                }
                if (ge(gt))
                  throw new Mn("Can not open popup window - blocked");
                return Pe && window.addEventListener("unload", function() {
                  return gt.close();
                }), gt;
              }(0, T({
                name: ee,
                width: me,
                height: be
              }, wr().popup));
              return A.register(function() {
                return So(Fe);
              }), A.register(function() {
                return gi(Fe);
              }), Fe;
            }
            throw new Error("No render context available for " + x);
          }).then(function(K) {
            return B.setWindow(K, {
              send: bt
            }), B.setName(ee).then(function() {
              return B;
            });
          });
        }, Ii = function() {
          return R.try(function() {
            var x = Bo(window, "unload", Xr(function() {
              Lr(new Error("Window navigated away"));
            })), N = Oo(d, Lr, 3e3);
            if (A.register(N.cancel), A.register(x.cancel), wt) return wt();
          });
        }, Ai = function(x) {
          var N = !1;
          return x.isClosed().then(function(B) {
            return B ? (N = !0, Ft(new Error("Detected component window close"))) : R.delay(200).then(function() {
              return x.isClosed();
            }).then(function(j) {
              if (j)
                return N = !0, Ft(new Error("Detected component window close"));
            });
          }).then(function() {
            return N;
          });
        }, jr = function(x) {
          return $t ? $t(x) : R.try(function() {
            if (V.indexOf(x) === -1)
              return V.push(x), z.asyncReject(x), $.trigger(Ee.ERROR, x);
          });
        }, Wi = new R(), _i = function(x) {
          return R.try(function() {
            Wi.resolve(x);
          });
        };
        ln.onError = jr;
        var Mi = function(x, N) {
          return x({
            uid: r,
            container: N.container,
            context: N.context,
            doc: N.doc,
            frame: N.frame,
            prerenderFrame: N.prerenderFrame,
            focus: mr,
            close: Ft,
            state: q,
            props: H,
            tag: E,
            dimensions: Ne(),
            event: $
          });
        }, Fi = function(x, N) {
          var B = N.context;
          return or ? or(x, {
            context: B
          }) : R.try(function() {
            if (v) {
              $.trigger(Ee.PRERENDER);
              var j = x.getWindow();
              if (j && U(j) && function(Ie) {
                try {
                  if (!Ie.location.href || Ie.location.href === "about:blank") return !0;
                } catch {
                }
                return !1;
              }(j)) {
                var ee = (j = te(j)).document, K = Mi(v, {
                  context: B,
                  doc: ee
                });
                if (K) {
                  if (K.ownerDocument !== ee) throw new Error("Expected prerender template to have been created with document from child window");
                  (function(Ie, Pe) {
                    var at = Pe.tagName.toLowerCase();
                    if (at !== "html") throw new Error("Expected element to be html, got " + at);
                    for (var Ue = Ie.document.documentElement, ce = 0, Be = In(Ue.children); ce < Be.length; ce++) Ue.removeChild(Be[ce]);
                    for (var rt = 0, Ve = In(Pe.children); rt < Ve.length; rt++) Ue.appendChild(Ve[rt]);
                  })(j, K);
                  var we = b.width, me = we !== void 0 && we, je = b.height, be = je !== void 0 && je, Fe = b.element, Ce = Fe === void 0 ? "body" : Fe;
                  if ((Ce = _n(Ce, ee)) && (me || be)) {
                    var fe = qo(Ce, function(Ie) {
                      zr({
                        width: me ? Ie.width : void 0,
                        height: be ? Ie.height : void 0
                      });
                    }, {
                      width: me,
                      height: be,
                      win: j
                    });
                    $.on(Ee.RENDERED, fe.cancel);
                  }
                  $.trigger(Ee.PRERENDERED);
                }
              }
            }
          });
        }, zi = function(x, N) {
          var B = N.proxyFrame, j = N.proxyPrerenderFrame, ee = N.context, K = N.rerender;
          return Vt ? Vt(x, {
            proxyFrame: B,
            proxyPrerenderFrame: j,
            context: ee,
            rerender: K
          }) : R.hash({
            container: x.get(),
            frame: B ? B.get() : null,
            prerenderFrame: j ? j.get() : null,
            internalState: _e()
          }).then(function(we) {
            var me = we.container, je = we.internalState.visible, be = Mi(l, {
              context: ee,
              container: me,
              frame: we.frame,
              prerenderFrame: we.prerenderFrame,
              doc: document
            });
            if (be) {
              je || $o(be), La(me, be);
              var Fe = function(Ce, fe) {
                fe = Xr(fe);
                var Ie = !1, Pe = [], at, Ue, ce, Be = function() {
                  Ie = !0;
                  for (var gt = 0; gt < Pe.length; gt++) Pe[gt].disconnect();
                  at && at.cancel(), ce && ce.removeEventListener("unload", rt), Ue && Cr(Ue);
                }, rt = function() {
                  Ie || (fe(), Be());
                };
                if (pr(Ce))
                  return rt(), {
                    cancel: Be
                  };
                if (window.MutationObserver)
                  for (var Ve = Ce.parentElement; Ve; ) {
                    var sr = new window.MutationObserver(function() {
                      pr(Ce) && rt();
                    });
                    sr.observe(Ve, {
                      childList: !0
                    }), Pe.push(sr), Ve = Ve.parentElement;
                  }
                return (Ue = document.createElement("iframe")).setAttribute("name", "__detect_close_" + Xe() + "__"), Ue.style.display = "none", Fn(Ue).then(function(gt) {
                  (ce = te(gt)).addEventListener("unload", rt);
                }), Ce.appendChild(Ue), at = Dr(function() {
                  pr(Ce) && rt();
                }, 1e3), {
                  cancel: Be
                };
              }(be, function() {
                var Ce = new Error("Detected container element removed from DOM");
                return R.delay(1).then(function() {
                  if (!pr(be))
                    return A.all(Ce), K().then(Le, Oe);
                  Ft(Ce);
                });
              });
              return A.register(function() {
                return Fe.cancel();
              }), A.register(function() {
                return Cr(be);
              }), X = cn(be);
            }
          });
        }, Li = function() {
          return {
            state: q,
            event: $,
            close: Ft,
            focus: mr,
            resize: zr,
            onError: jr,
            updateProps: us,
            show: Tt,
            hide: Mt
          };
        }, eo = function(x) {
          x === void 0 && (x = {});
          var N = vt, B = Li();
          hr(L, x), function(j, ee, K, we, me) {
            var je = we.state, be = we.close, Fe = we.focus, Ce = we.event, fe = we.onError;
            Qn(K, j, function(Ie, Pe, at) {
              var Ue = !1, ce = at;
              Object.defineProperty(ee, Ie, {
                configurable: !0,
                enumerable: !0,
                get: function() {
                  return Ue ? ce : (Ue = !0, function() {
                    if (!Pe) return ce;
                    var Be = Pe.alias;
                    if (Be && !jt(at) && jt(K[Be]) && (ce = K[Be]), Pe.value && (ce = Pe.value({
                      props: ee,
                      state: je,
                      close: be,
                      focus: Fe,
                      event: Ce,
                      onError: fe,
                      container: me
                    })), !Pe.default || jt(ce) || jt(K[Ie]) || (ce = Pe.default({
                      props: ee,
                      state: je,
                      close: be,
                      focus: Fe,
                      event: Ce,
                      onError: fe,
                      container: me
                    })), jt(ce)) {
                      if (Pe.type === pe.ARRAY ? !Array.isArray(ce) : typeof ce !== Pe.type) throw new TypeError("Prop is not of type " + Pe.type + ": " + Ie);
                    } else if (Pe.required !== !1 && !jt(K[Ie])) throw new Error('Expected prop "' + Ie + '" to be defined');
                    return jt(ce) && Pe.decorate && (ce = Pe.decorate({
                      value: ce,
                      props: ee,
                      state: je,
                      close: be,
                      focus: Fe,
                      event: Ce,
                      onError: fe,
                      container: me
                    })), ce;
                  }());
                }
              });
            }), Qn(ee, j, ye);
          }(h, H, L, B, N);
        }, us = function(x) {
          return eo(x), z.then(function() {
            var N = De, B = se;
            if (N && B && Dt) return ke(Dt).then(function(j) {
              return N.updateProps(j).catch(function(ee) {
                return Ai(B).then(function(K) {
                  if (!K) throw ee;
                });
              });
            });
          });
        }, ji = function(x) {
          return _t ? _t(x) : R.try(function() {
            return Lo(x);
          }).then(function(N) {
            return zn(N) && (N = function B(j) {
              var ee = function(je) {
                var be = function(Fe) {
                  for (; Fe.parentNode; ) Fe = Fe.parentNode;
                  if (zn(Fe)) return Fe;
                }(je);
                if (be && be.host) return be.host;
              }(j);
              if (!ee) throw new Error("Element is not in shadow dom");
              var K = "shadow-slot-" + Xe(), we = document.createElement("slot");
              we.setAttribute("name", K), j.appendChild(we);
              var me = document.createElement("div");
              return me.setAttribute("slot", K), ee.appendChild(me), zn(ee) ? B(me) : me;
            }(N)), vt = N, cn(N);
          });
        };
        return {
          init: function() {
            (function() {
              $.on(Ee.RENDER, function() {
                return H.onRender();
              }), $.on(Ee.PRERENDER, function() {
                return H.onPrerender();
              }), $.on(Ee.DISPLAY, function() {
                return H.onDisplay();
              }), $.on(Ee.RENDERED, function() {
                return H.onRendered();
              }), $.on(Ee.PRERENDERED, function() {
                return H.onPrerendered();
              }), $.on(Ee.CLOSE, function() {
                return H.onClose();
              }), $.on(Ee.DESTROY, function() {
                return H.onDestroy();
              }), $.on(Ee.RESIZE, function() {
                return H.onResize();
              }), $.on(Ee.FOCUS, function() {
                return H.onFocus();
              }), $.on(Ee.PROPS, function(x) {
                return H.onProps(x);
              }), $.on(Ee.ERROR, function(x) {
                return H && H.onError ? H.onError(x) : Oe(x).then(function() {
                  setTimeout(function() {
                    throw x;
                  }, 1);
                });
              }), A.register($.reset);
            })();
          },
          render: function(x) {
            var N = x.target, B = x.container, j = x.context, ee = x.rerender;
            return R.try(function() {
              var K = ar(), we = S || ar();
              (function(G, $e, Ae) {
                if (G !== window) {
                  if (!Kr(window, G)) throw new Error("Can only renderTo an adjacent frame");
                  var qe = F();
                  if (!ft($e, qe) && !U(G)) throw new Error("Can not render remotely to " + $e.toString() + " - can only render to " + qe);
                  if (Ae && typeof Ae != "string") throw new Error("Container passed to renderTo must be a string selector, got " + typeof Ae + " }");
                }
              })(N, we, B);
              var me = R.try(function() {
                if (N !== window) return function(G, $e) {
                  for (var Ae = {}, qe = 0, ct = Object.keys(H); qe < ct.length; qe++) {
                    var We = ct[qe], yt = h[We];
                    yt && yt.allowDelegate && (Ae[We] = H[We]);
                  }
                  var Ge = bt($e, "zoid_delegate_" + w, {
                    uid: r,
                    overrides: {
                      props: Ae,
                      event: $,
                      close: Ft,
                      onError: jr,
                      getInternalState: _e,
                      setInternalState: Me,
                      resolveInitPromise: Le,
                      rejectInitPromise: Oe
                    }
                  }).then(function(Y) {
                    var Z = Y.data.parent;
                    return A.register(function(W) {
                      if (!ge($e)) return Z.destroy(W);
                    }), Z.getDelegateOverrides();
                  }).catch(function(Y) {
                    throw new Error(`Unable to delegate rendering. Possibly the component is not loaded in the target window.

` + lr(Y));
                  });
                  return _t = function() {
                    for (var Y = arguments.length, Z = new Array(Y), W = 0; W < Y; W++) Z[W] = arguments[W];
                    return Ge.then(function(k) {
                      return k.getProxyContainer.apply(k, Z);
                    });
                  }, Vt = function() {
                    for (var Y = arguments.length, Z = new Array(Y), W = 0; W < Y; W++) Z[W] = arguments[W];
                    return Ge.then(function(k) {
                      return k.renderContainer.apply(k, Z);
                    });
                  }, qt = function() {
                    for (var Y = arguments.length, Z = new Array(Y), W = 0; W < Y; W++) Z[W] = arguments[W];
                    return Ge.then(function(k) {
                      return k.show.apply(k, Z);
                    });
                  }, Ht = function() {
                    for (var Y = arguments.length, Z = new Array(Y), W = 0; W < Y; W++) Z[W] = arguments[W];
                    return Ge.then(function(k) {
                      return k.hide.apply(k, Z);
                    });
                  }, wt = function() {
                    for (var Y = arguments.length, Z = new Array(Y), W = 0; W < Y; W++) Z[W] = arguments[W];
                    return Ge.then(function(k) {
                      return k.watchForUnload.apply(k, Z);
                    });
                  }, G === xe.IFRAME ? (Pt = function() {
                    for (var Y = arguments.length, Z = new Array(Y), W = 0; W < Y; W++) Z[W] = arguments[W];
                    return Ge.then(function(k) {
                      return k.getProxyWindow.apply(k, Z);
                    });
                  }, Gt = function() {
                    for (var Y = arguments.length, Z = new Array(Y), W = 0; W < Y; W++) Z[W] = arguments[W];
                    return Ge.then(function(k) {
                      return k.openFrame.apply(k, Z);
                    });
                  }, Jt = function() {
                    for (var Y = arguments.length, Z = new Array(Y), W = 0; W < Y; W++) Z[W] = arguments[W];
                    return Ge.then(function(k) {
                      return k.openPrerenderFrame.apply(k, Z);
                    });
                  }, or = function() {
                    for (var Y = arguments.length, Z = new Array(Y), W = 0; W < Y; W++) Z[W] = arguments[W];
                    return Ge.then(function(k) {
                      return k.prerender.apply(k, Z);
                    });
                  }, ir = function() {
                    for (var Y = arguments.length, Z = new Array(Y), W = 0; W < Y; W++) Z[W] = arguments[W];
                    return Ge.then(function(k) {
                      return k.open.apply(k, Z);
                    });
                  }, ie = function() {
                    for (var Y = arguments.length, Z = new Array(Y), W = 0; W < Y; W++) Z[W] = arguments[W];
                    return Ge.then(function(k) {
                      return k.openPrerender.apply(k, Z);
                    });
                  }) : G === xe.POPUP && (nr = function() {
                    for (var Y = arguments.length, Z = new Array(Y), W = 0; W < Y; W++) Z[W] = arguments[W];
                    return Ge.then(function(k) {
                      return k.setProxyWin.apply(k, Z);
                    });
                  }), Ge;
                }(j, N);
              }), je = H.window, be = Ii(), Fe = Si(h, H, "post"), Ce = $.trigger(Ee.RENDER), fe = ji(B), Ie = mt(), Pe = fe.then(function() {
                return eo();
              }), at = Pe.then(function() {
                return Si(h, H, "get").then(function(G) {
                  return function($e, Ae) {
                    var qe = Ae.query || {}, ct = Ae.hash || {}, We, yt, Ge = $e.split("#");
                    yt = Ge[1];
                    var Y = (We = Ge[0]).split("?");
                    We = Y[0];
                    var Z = zo(Y[1], qe), W = zo(yt, ct);
                    return Z && (We = We + "?" + Z), W && (We = We + "#" + W), We;
                  }(On(vr()), {
                    query: G
                  });
                });
              }), Ue = Ie.then(function(G) {
                return function(Ae) {
                  var qe = Ae === void 0 ? {} : Ae, ct = qe.proxyWin, We = qe.initialChildDomain, yt = qe.childDomainMatch, Ge = qe.target, Y = Ge === void 0 ? window : Ge, Z = qe.context;
                  return function(W) {
                    var k = W === void 0 ? {} : W, to = k.proxyWin, vs = k.childDomainMatch, ws = k.context;
                    return ke(k.initialChildDomain).then(function(ms) {
                      return {
                        uid: r,
                        context: ws,
                        tag: E,
                        childDomainMatch: vs,
                        version: "10_3_3",
                        props: ms,
                        exports: ($i = to, {
                          init: function(gs) {
                            return ln(this.origin, gs);
                          },
                          close: Ft,
                          checkClose: function() {
                            return Ai($i);
                          },
                          resize: zr,
                          onError: jr,
                          show: Tt,
                          hide: Mt,
                          export: _i
                        })
                      };
                      var $i;
                    });
                  }({
                    proxyWin: ct,
                    initialChildDomain: We,
                    childDomainMatch: yt,
                    context: Z
                  }).then(function(W) {
                    var k = Ei({
                      data: W,
                      metaData: {
                        windowRef: Fr(Y, We, Z, ct)
                      },
                      sender: {
                        domain: F(window)
                      },
                      receiver: {
                        win: ct,
                        domain: yt
                      },
                      passByReference: We === F()
                    }), to = k.serializedData;
                    return A.register(k.cleanReference), to;
                  });
                }({
                  proxyWin: ($e = {
                    proxyWin: G,
                    initialChildDomain: K,
                    childDomainMatch: we,
                    target: N,
                    context: j
                  }).proxyWin,
                  initialChildDomain: $e.initialChildDomain,
                  childDomainMatch: $e.childDomainMatch,
                  target: $e.target,
                  context: $e.context
                }).then(function(Ae) {
                  return Pi({
                    name: w,
                    serializedPayload: Ae
                  });
                });
                var $e;
              }), ce = Ue.then(function(G) {
                return it(j, {
                  windowName: G
                });
              }), Be = _r(j), rt = R.hash({
                proxyContainer: fe,
                proxyFrame: ce,
                proxyPrerenderFrame: Be
              }).then(function(G) {
                return zi(G.proxyContainer, {
                  context: j,
                  proxyFrame: G.proxyFrame,
                  proxyPrerenderFrame: G.proxyPrerenderFrame,
                  rerender: ee
                });
              }).then(function(G) {
                return G;
              }), Ve = R.hash({
                windowName: Ue,
                proxyFrame: ce,
                proxyWin: Ie
              }).then(function(G) {
                var $e = G.proxyWin;
                return je ? $e : Ci(j, {
                  windowName: G.windowName,
                  proxyWin: $e,
                  proxyFrame: G.proxyFrame
                });
              }), sr = R.hash({
                proxyWin: Ve,
                proxyPrerenderFrame: Be
              }).then(function(G) {
                return Mr(j, G.proxyWin, G.proxyPrerenderFrame);
              }), gt = Ve.then(function(G) {
                return se = G, ot(G);
              }), Nt = R.hash({
                proxyPrerenderWin: sr,
                state: gt
              }).then(function(G) {
                return Fi(G.proxyPrerenderWin, {
                  context: j
                });
              }), Ui = R.hash({
                proxyWin: Ve,
                windowName: Ue
              }).then(function(G) {
                if (je) return G.proxyWin.setName(G.windowName);
              }), cs = R.hash({
                body: Fe
              }).then(function(G) {
                return n.method ? n.method : Object.keys(G.body).length ? "post" : "get";
              }), Bi = R.hash({
                proxyWin: Ve,
                windowUrl: at,
                body: Fe,
                method: cs,
                windowName: Ui,
                prerender: Nt
              }).then(function(G) {
                return G.proxyWin.setLocation(G.windowUrl, {
                  method: G.method,
                  body: G.body
                });
              }), ds = Ve.then(function(G) {
                (function $e(Ae, qe) {
                  var ct = !1;
                  return A.register(function() {
                    ct = !0;
                  }), R.delay(2e3).then(function() {
                    return Ae.isClosed();
                  }).then(function(We) {
                    if (!ct) {
                      if (qe === xe.POPUP && We) return Ft(new Error("Detected popup close"));
                      var yt = !!(vt && pr(vt));
                      return qe === xe.IFRAME && We && (yt || Bt) ? Ft(new Error("Detected iframe close")) : $e(Ae, qe);
                    }
                  });
                })(G, j);
              }), fs = R.hash({
                container: rt,
                prerender: Nt
              }).then(function() {
                return $.trigger(Ee.DISPLAY);
              }), ls = Ve.then(function(G) {
                return function($e, Ae, qe) {
                  return R.try(function() {
                    return $e.awaitWindow();
                  }).then(function(ct) {
                    if (Ut && Ut.needsBridge({
                      win: ct,
                      domain: Ae
                    }) && !Ut.hasBridge(Ae, Ae)) {
                      var We = typeof n.bridgeUrl == "function" ? n.bridgeUrl({
                        props: H
                      }) : n.bridgeUrl;
                      if (!We) throw new Error("Bridge needed to render " + qe);
                      var yt = It(We);
                      return Ut.linkUrl(ct, Ae), Ut.openBridge(On(We), yt);
                    }
                  });
                }(G, K, j);
              }), hs = Bi.then(function() {
                return R.try(function() {
                  var G = H.timeout;
                  if (G) return z.timeout(G, new Error("Loading component timed out after " + G + " milliseconds"));
                });
              }), ps = z.then(function() {
                return Bt = !0, $.trigger(Ee.RENDERED);
              });
              return R.hash({
                initPromise: z,
                buildUrlPromise: at,
                onRenderPromise: Ce,
                getProxyContainerPromise: fe,
                openFramePromise: ce,
                openPrerenderFramePromise: Be,
                renderContainerPromise: rt,
                openPromise: Ve,
                openPrerenderPromise: sr,
                setStatePromise: gt,
                prerenderPromise: Nt,
                loadUrlPromise: Bi,
                buildWindowNamePromise: Ue,
                setWindowNamePromise: Ui,
                watchForClosePromise: ds,
                onDisplayPromise: fs,
                openBridgePromise: ls,
                runTimeoutPromise: hs,
                onRenderedPromise: ps,
                delegatePromise: me,
                watchForUnloadPromise: be,
                finalSetPropsPromise: Pe
              });
            }).catch(function(K) {
              return R.all([jr(K), Lr(K)]).then(function() {
                throw K;
              }, function() {
                throw K;
              });
            }).then(ye);
          },
          destroy: Lr,
          getProps: function() {
            return H;
          },
          setProps: eo,
          export: _i,
          getHelpers: Li,
          getDelegateOverrides: function() {
            return R.try(function() {
              return {
                getProxyContainer: ji,
                show: Tt,
                hide: Mt,
                renderContainer: zi,
                getProxyWindow: mt,
                watchForUnload: Ii,
                openFrame: it,
                openPrerenderFrame: _r,
                prerender: Fi,
                open: Ci,
                openPrerender: Mr,
                setProxyWin: ot
              };
            });
          },
          getExports: function() {
            return I({
              getExports: function() {
                return Wi;
              }
            });
          }
        };
      }
      var Xa = {
        register: function(e, r, n, o) {
          var a = o.React, u = o.ReactDOM;
          return function(d) {
            P(h, d);
            function h() {
              return d.apply(this, arguments) || this;
            }
            var l = h.prototype;
            return l.render = function() {
              return a.createElement("div", null);
            }, l.componentDidMount = function() {
              var v = u.findDOMNode(this), E = n(hr({}, this.props));
              E.render(v, xe.IFRAME), this.setState({
                parent: E
              });
            }, l.componentDidUpdate = function() {
              this.state && this.state.parent && this.state.parent.updateProps(hr({}, this.props)).catch(ye);
            }, h;
          }(a.Component);
        }
      }, ka = {
        register: function(e, r, n, o) {
          return o.component(e, {
            render: function(a) {
              return a("div");
            },
            inheritAttrs: !1,
            mounted: function() {
              var a = this.$el;
              this.parent = n(T({}, (u = this.$attrs, Object.keys(u).reduce(function(d, h) {
                var l = u[h];
                return h === "style-object" || h === "styleObject" ? (d.style = l, d.styleObject = l) : h.includes("-") ? d[Cn(h)] = l : d[h] = l, d;
              }, {}))));
              var u;
              this.parent.render(a, xe.IFRAME);
            },
            watch: {
              $attrs: {
                handler: function() {
                  this.parent && this.$attrs && this.parent.updateProps(T({}, this.$attrs)).catch(ye);
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
              var o = this.$el;
              this.parent = n(T({}, (a = this.$attrs, Object.keys(a).reduce(function(u, d) {
                var h = a[d];
                return d === "style-object" || d === "styleObject" ? (u.style = h, u.styleObject = h) : d.includes("-") ? u[Cn(d)] = h : u[d] = h, u;
              }, {}))));
              var a;
              this.parent.render(o, xe.IFRAME);
            },
            watch: {
              $attrs: {
                handler: function() {
                  this.parent && this.$attrs && this.parent.updateProps(T({}, this.$attrs)).catch(ye);
                },
                deep: !0
              }
            }
          };
        }
      }, ts = {
        register: function(e, r, n, o) {
          return o.module(e, []).directive(Cn(e), function() {
            for (var a = {}, u = 0, d = Object.keys(r); u < d.length; u++) a[d[u]] = "=";
            return a.props = "=", {
              scope: a,
              restrict: "E",
              controller: ["$scope", "$element", function(h, l) {
                function v() {
                  if (h.$root.$$phase !== "$apply" && h.$root.$$phase !== "$digest") try {
                    h.$apply();
                  } catch {
                  }
                }
                var E = function() {
                  return en(h.props, function(p) {
                    return typeof p == "function" ? function() {
                      var y = p.apply(this, arguments);
                      return v(), y;
                    } : p;
                  });
                }, w = n(E());
                w.render(l[0], xe.IFRAME), h.$watch(function() {
                  w.updateProps(E()).catch(ye);
                });
              }]
            };
          });
        }
      }, rs = {
        register: function(e, r, n, o) {
          var a = o.Component, u = o.NgModule, d = o.ElementRef, h = o.NgZone, l = o.Inject, v = function() {
            function w(y, b) {
              this.elementRef = void 0, this.internalProps = void 0, this.parent = void 0, this.props = void 0, this.zone = void 0, this._props = void 0, this._props = {}, this.elementRef = y, this.zone = b;
            }
            var p = w.prototype;
            return p.getProps = function() {
              var y = this;
              return en(T({}, this.internalProps, this.props), function(b) {
                if (typeof b == "function") {
                  var O = y.zone;
                  return function() {
                    var S = arguments, I = this;
                    return O.run(function() {
                      return b.apply(I, S);
                    });
                  };
                }
                return b;
              });
            }, p.ngOnInit = function() {
              var y = this.elementRef.nativeElement;
              this.parent = n(this.getProps()), this.parent.render(y, xe.IFRAME);
            }, p.ngDoCheck = function() {
              this.parent && !function(y, b) {
                var O = {};
                for (var S in y) if (y.hasOwnProperty(S) && (O[S] = !0, y[S] !== b[S]))
                  return !1;
                for (var I in b) if (!O[I]) return !1;
                return !0;
              }(this._props, this.props) && (this._props = T({}, this.props), this.parent.updateProps(this.getProps()));
            }, w;
          }();
          v.annotations = void 0, v.parameters = void 0, v.parameters = [[new l(d)], [new l(h)]], v.annotations = [new a({
            selector: e,
            template: "<div></div>",
            inputs: ["props"]
          })];
          var E = function() {
          };
          return E.annotations = void 0, E.annotations = [new u({
            declarations: [v],
            exports: [v]
          })], E;
        }
      };
      function ns(e) {
        var r = e.uid, n = e.frame, o = e.prerenderFrame, a = e.doc, u = e.props, d = e.event, h = e.dimensions, l = h.width, v = h.height;
        if (n && o) {
          var E = a.createElement("div");
          E.setAttribute("id", r);
          var w = a.createElement("style");
          return u.cspNonce && w.setAttribute("nonce", u.cspNonce), w.appendChild(a.createTextNode(`
            #` + r + ` {
                display: inline-block;
                position: relative;
                width: ` + l + `;
                height: ` + v + `;
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
        `)), E.appendChild(n), E.appendChild(o), E.appendChild(w), o.classList.add("zoid-visible"), n.classList.add("zoid-invisible"), d.on(Ee.RENDERED, function() {
            o.classList.remove("zoid-visible"), o.classList.add("zoid-invisible"), n.classList.remove("zoid-invisible"), n.classList.add("zoid-visible"), setTimeout(function() {
              Cr(o);
            }, 1);
          }), d.on(Ee.RESIZE, function(p) {
            var y = p.width, b = p.height;
            typeof y == "number" && (E.style.width = Jo(y)), typeof b == "number" && (E.style.height = Jo(b));
          }), E;
        }
      }
      function os(e) {
        var r = e.doc, n = e.props, o = r.createElement("html"), a = r.createElement("body"), u = r.createElement("style"), d = r.createElement("div");
        return d.classList.add("spinner"), n.cspNonce && u.setAttribute("nonce", n.cspNonce), o.appendChild(a), a.appendChild(d), a.appendChild(u), u.appendChild(r.createTextNode(`
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
      var Xn = tn(), kn = tn();
      function is(e) {
        var r = function(b) {
          var O = b.tag, S = b.url, I = b.domain, z = b.bridgeUrl, V = b.props, A = V === void 0 ? {} : V, q = b.dimensions, L = q === void 0 ? {} : q, Q = b.autoResize, $ = Q === void 0 ? {} : Q, ue = b.allowedParentDomains, oe = ue === void 0 ? "*" : ue, J = b.attributes, H = J === void 0 ? {} : J, se = b.defaultContext, X = se === void 0 ? xe.IFRAME : se, De = b.containerTemplate, Dt = De === void 0 ? ns : De, vt = b.prerenderTemplate, Bt = vt === void 0 ? os : vt, $t = b.validate, _t = b.eligible, qt = _t === void 0 ? function() {
            return {
              eligible: !0
            };
          } : _t, Ht = b.logger, rr = Ht === void 0 ? {
            info: ye
          } : Ht, Vt = b.exports, Pt = Vt === void 0 ? ye : Vt, nr = b.method, Gt = b.children, Jt = Gt === void 0 ? function() {
            return {};
          } : Gt, or = O.replace(/-/g, "_"), ir = T({}, {
            window: {
              type: pe.OBJECT,
              sendToChild: !1,
              required: !1,
              allowDelegate: !0,
              validate: function(ie) {
                var wt = ie.value;
                if (!kt(wt) && !pt.isProxyWindow(wt)) throw new Error("Expected Window or ProxyWindow");
                if (kt(wt)) {
                  if (ge(wt)) throw new Error("Window is closed");
                  if (!U(wt)) throw new Error("Window is not same domain");
                }
              },
              decorate: function(ie) {
                return Ar(ie.value);
              }
            },
            timeout: {
              type: pe.NUMBER,
              required: !1,
              sendToChild: !1
            },
            cspNonce: {
              type: pe.STRING,
              required: !1
            },
            onDisplay: {
              type: pe.FUNCTION,
              required: !1,
              sendToChild: !1,
              allowDelegate: !0,
              default: Wt,
              decorate: tr
            },
            onRendered: {
              type: pe.FUNCTION,
              required: !1,
              sendToChild: !1,
              default: Wt,
              decorate: tr
            },
            onRender: {
              type: pe.FUNCTION,
              required: !1,
              sendToChild: !1,
              default: Wt,
              decorate: tr
            },
            onPrerendered: {
              type: pe.FUNCTION,
              required: !1,
              sendToChild: !1,
              default: Wt,
              decorate: tr
            },
            onPrerender: {
              type: pe.FUNCTION,
              required: !1,
              sendToChild: !1,
              default: Wt,
              decorate: tr
            },
            onClose: {
              type: pe.FUNCTION,
              required: !1,
              sendToChild: !1,
              allowDelegate: !0,
              default: Wt,
              decorate: tr
            },
            onDestroy: {
              type: pe.FUNCTION,
              required: !1,
              sendToChild: !1,
              allowDelegate: !0,
              default: Wt,
              decorate: tr
            },
            onResize: {
              type: pe.FUNCTION,
              required: !1,
              sendToChild: !1,
              allowDelegate: !0,
              default: Wt
            },
            onFocus: {
              type: pe.FUNCTION,
              required: !1,
              sendToChild: !1,
              allowDelegate: !0,
              default: Wt
            },
            close: {
              type: pe.FUNCTION,
              required: !1,
              sendToChild: !1,
              childDecorate: function(ie) {
                return ie.close;
              }
            },
            focus: {
              type: pe.FUNCTION,
              required: !1,
              sendToChild: !1,
              childDecorate: function(ie) {
                return ie.focus;
              }
            },
            resize: {
              type: pe.FUNCTION,
              required: !1,
              sendToChild: !1,
              childDecorate: function(ie) {
                return ie.resize;
              }
            },
            uid: {
              type: pe.STRING,
              required: !1,
              sendToChild: !1,
              childDecorate: function(ie) {
                return ie.uid;
              }
            },
            tag: {
              type: pe.STRING,
              required: !1,
              sendToChild: !1,
              childDecorate: function(ie) {
                return ie.tag;
              }
            },
            getParent: {
              type: pe.FUNCTION,
              required: !1,
              sendToChild: !1,
              childDecorate: function(ie) {
                return ie.getParent;
              }
            },
            getParentDomain: {
              type: pe.FUNCTION,
              required: !1,
              sendToChild: !1,
              childDecorate: function(ie) {
                return ie.getParentDomain;
              }
            },
            show: {
              type: pe.FUNCTION,
              required: !1,
              sendToChild: !1,
              childDecorate: function(ie) {
                return ie.show;
              }
            },
            hide: {
              type: pe.FUNCTION,
              required: !1,
              sendToChild: !1,
              childDecorate: function(ie) {
                return ie.hide;
              }
            },
            export: {
              type: pe.FUNCTION,
              required: !1,
              sendToChild: !1,
              childDecorate: function(ie) {
                return ie.export;
              }
            },
            onError: {
              type: pe.FUNCTION,
              required: !1,
              sendToChild: !1,
              childDecorate: function(ie) {
                return ie.onError;
              }
            },
            onProps: {
              type: pe.FUNCTION,
              required: !1,
              sendToChild: !1,
              childDecorate: function(ie) {
                return ie.onProps;
              }
            },
            getSiblings: {
              type: pe.FUNCTION,
              required: !1,
              sendToChild: !1,
              childDecorate: function(ie) {
                return ie.getSiblings;
              }
            }
          }, A);
          if (!Dt) throw new Error("Container template required");
          return {
            name: or,
            tag: O,
            url: S,
            domain: I,
            bridgeUrl: z,
            method: nr,
            propsDef: ir,
            dimensions: L,
            autoResize: $,
            allowedParentDomains: oe,
            attributes: H,
            defaultContext: X,
            containerTemplate: Dt,
            prerenderTemplate: Bt,
            validate: $t,
            logger: rr,
            eligible: qt,
            children: Jt,
            exports: typeof Pt == "function" ? Pt : function(ie) {
              for (var wt = ie.getExports, ae = {}, ze = function() {
                var Oe = Le[Ne], ke = Pt[Oe].type, _e = wt().then(function(Me) {
                  return Me[Oe];
                });
                ae[Oe] = ke === pe.FUNCTION ? function() {
                  for (var Me = arguments.length, mt = new Array(Me), ot = 0; ot < Me; ot++) mt[ot] = arguments[ot];
                  return _e.then(function(Tt) {
                    return Tt.apply(void 0, mt);
                  });
                } : _e;
              }, Ne = 0, Le = Object.keys(Pt); Ne < Le.length; Ne++) ze();
              return ae;
            }
          };
        }(e), n = r.name, o = r.tag, a = r.defaultContext, u = r.propsDef, d = r.eligible, h = r.children, l = Wr(window), v = {}, E = [], w = function() {
          if (function(O) {
            try {
              return Zn(window.name).name === O;
            } catch {
            }
            return !1;
          }(n)) {
            var b = Ti().payload;
            if (b.tag === o && ft(b.childDomainMatch, F())) return !0;
          }
          return !1;
        }, p = Lt(function() {
          if (w()) {
            if (window.xprops)
              throw delete l.components[o], new Error("Can not register " + n + " as child - child already registered");
            var b = function(O) {
              var S = O.tag, I = O.propsDef, z = O.autoResize, V = O.allowedParentDomains, A = [], q = Ti(), L = q.parent, Q = q.payload, $ = L.win, ue = L.domain, oe, J = new R(), H = Q.version, se = Q.uid, X = Q.exports, De = Q.context, Dt = Q.props;
              if (!function(ae, ze) {
                if (!/_/.test(ae) || !/_/.test("10_3_3")) throw new Error("Versions are in an invalid format (" + ae + ", 10_3_3)");
                return ae.split("_")[0] === "10_3_3".split("_")[0];
              }(H)) throw new Error("Parent window has zoid version " + H + ", child window has version 10_3_3");
              var vt = X.show, Bt = X.hide, $t = X.close, _t = X.onError, qt = X.checkClose, Ht = X.export, rr = X.resize, Vt = X.init, Pt = function() {
                return $;
              }, nr = function() {
                return ue;
              }, Gt = function(ae) {
                return A.push(ae), {
                  cancel: function() {
                    A.splice(A.indexOf(ae), 1);
                  }
                };
              }, Jt = function(ae) {
                return rr.fireAndForget({
                  width: ae.width,
                  height: ae.height
                });
              }, or = function(ae) {
                return J.resolve(ae), Ht(ae);
              }, ir = function(ae) {
                var ze = (ae === void 0 ? {} : ae).anyParent, Ne = [], Le = oe.parent;
                if (ze === void 0 && (ze = !Le), !ze && !Le) throw new Error("No parent found for " + S + " child");
                for (var Oe = 0, ke = Ye(window); Oe < ke.length; Oe++) {
                  var _e = ke[Oe];
                  if (U(_e)) {
                    var Me = te(_e).xprops;
                    if (Me && Pt() === Me.getParent()) {
                      var mt = Me.parent;
                      if (ze || !Le || mt && mt.uid === Le.uid) {
                        var ot = yi(_e, function(Tt) {
                          return Tt.exports;
                        });
                        Ne.push({
                          props: Me,
                          exports: ot
                        });
                      }
                    }
                  }
                }
                return Ne;
              }, ie = function(ae, ze, Ne) {
                Ne === void 0 && (Ne = !1);
                var Le = function(ke, _e, Me, mt, ot, Tt) {
                  Tt === void 0 && (Tt = !1);
                  for (var Mt = {}, vr = 0, wr = Object.keys(Me); vr < wr.length; vr++) {
                    var ar = wr[vr], it = _e[ar], _r = it && it.trustedDomains && it.trustedDomains.length > 0 ? it.trustedDomains.reduce(function(ln, zr) {
                      return ln || ft(zr, F(window));
                    }, !1) : mt === F(window) || U(ke);
                    if ((!it || !it.sameDomain || _r) && (!it || !it.trustedDomains || _r)) {
                      var Mr = Oi(_e, 0, ar, Me[ar], ot);
                      Mt[ar] = Mr, it && it.alias && !Mt[it.alias] && (Mt[it.alias] = Mr);
                    }
                  }
                  if (!Tt) for (var mr = 0, fn = Object.keys(_e); mr < fn.length; mr++) {
                    var Fr = fn[mr];
                    Me.hasOwnProperty(Fr) || (Mt[Fr] = Oi(_e, 0, Fr, void 0, ot));
                  }
                  return Mt;
                }($, I, ae, ze, {
                  tag: S,
                  show: vt,
                  hide: Bt,
                  close: $t,
                  focus: Qa,
                  onError: _t,
                  resize: Jt,
                  getSiblings: ir,
                  onProps: Gt,
                  getParent: Pt,
                  getParentDomain: nr,
                  uid: se,
                  export: or
                }, Ne);
                oe ? hr(oe, Le) : oe = Le;
                for (var Oe = 0; Oe < A.length; Oe++) (0, A[Oe])(oe);
              }, wt = function(ae) {
                return R.try(function() {
                  return ie(ae, ue, !0);
                });
              };
              return {
                init: function() {
                  return R.try(function() {
                    var ae = "";
                    return U($) && (ae = function(ze) {
                      var Ne = ze.componentName, Le = ze.parentComponentWindow, Oe = bi({
                        data: Zn(window.name).serializedInitialPayload,
                        sender: {
                          win: Le
                        },
                        basic: !0
                      }), ke = Oe.sender;
                      if (Oe.reference.type === "uid" || Oe.metaData.windowRef.type === "global") {
                        var _e = Pi({
                          name: Ne,
                          serializedPayload: Ei({
                            data: Oe.data,
                            metaData: {
                              windowRef: Za(Le)
                            },
                            sender: {
                              domain: ke.domain
                            },
                            receiver: {
                              win: window,
                              domain: F()
                            },
                            basic: !0
                          }).serializedData
                        });
                        return window.name = _e, _e;
                      }
                    }({
                      componentName: O.name,
                      parentComponentWindow: $
                    }) || ""), Wr(window).exports = O.exports({
                      getExports: function() {
                        return J;
                      }
                    }), function(ze, Ne) {
                      if (!ft(ze, Ne)) throw new Error("Can not be rendered by domain: " + Ne);
                    }(V, ue), ei($), function() {
                      window.addEventListener("beforeunload", function() {
                        qt.fireAndForget();
                      }), window.addEventListener("unload", function() {
                        qt.fireAndForget();
                      }), Oo($, function() {
                        Ri();
                      });
                    }(), Vt({
                      name: ae,
                      updateProps: wt,
                      close: Ri
                    });
                  }).then(function() {
                    return (ae = z.width, ze = ae !== void 0 && ae, Ne = z.height, Le = Ne !== void 0 && Ne, Oe = z.element, Lo(Oe === void 0 ? "body" : Oe).catch(ye).then(function(ke) {
                      return {
                        width: ze,
                        height: Le,
                        element: ke
                      };
                    })).then(function(ke) {
                      var _e = ke.width, Me = ke.height, mt = ke.element;
                      mt && (_e || Me) && De !== xe.POPUP && qo(mt, function(ot) {
                        Jt({
                          width: _e ? ot.width : void 0,
                          height: Me ? ot.height : void 0
                        });
                      }, {
                        width: _e,
                        height: Me
                      });
                    });
                    var ae, ze, Ne, Le, Oe;
                  }).catch(function(ae) {
                    _t(ae);
                  });
                },
                getProps: function() {
                  return oe || (ie(Dt, ue), oe);
                }
              };
            }(r);
            return b.init(), b;
          }
        }), y = function b(O) {
          var S, I = "zoid-" + o + "-" + Xe(), z = O || {}, V = d({
            props: z
          }), A = V.eligible, q = V.reason, L = z.onDestroy;
          z.onDestroy = function() {
            if (S && A && E.splice(E.indexOf(S), 1), L) return L.apply(void 0, arguments);
          };
          var Q = xi({
            uid: I,
            options: r
          });
          Q.init(), A ? Q.setProps(z) : z.onDestroy && z.onDestroy(), Xn.register(function(oe) {
            return Q.destroy(oe || new Error("zoid destroyed all components"));
          });
          var $ = function(oe) {
            var J = (oe === void 0 ? {} : oe).decorate;
            return b((J === void 0 ? Fa : J)(z));
          }, ue = function(oe, J, H) {
            return R.try(function() {
              if (!A) {
                var se = new Error(q || n + " component is not eligible");
                return Q.destroy(se).then(function() {
                  throw se;
                });
              }
              if (!kt(oe)) throw new Error("Must pass window to renderTo");
              return function(X, De) {
                return R.try(function() {
                  if (X.window) return Ar(X.window).getType();
                  if (De) {
                    if (De !== xe.IFRAME && De !== xe.POPUP) throw new Error("Unrecognized context: " + De);
                    return De;
                  }
                  return a;
                });
              }(z, H);
            }).then(function(se) {
              if (J = function(X, De) {
                if (De) {
                  if (typeof De != "string" && !Rn(De)) throw new TypeError("Expected string or element selector to be passed");
                  return De;
                }
                if (X === xe.POPUP) return "body";
                throw new Error("Expected element to be passed to render iframe");
              }(se, J), oe !== window && typeof J != "string") throw new Error("Must pass string element when rendering to another window");
              return Q.render({
                target: oe,
                container: J,
                context: se,
                rerender: function() {
                  var X = $();
                  return hr(S, X), X.renderTo(oe, J, H);
                }
              });
            }).catch(function(se) {
              return Q.destroy(se).then(function() {
                throw se;
              });
            });
          };
          return S = T({}, Q.getExports(), Q.getHelpers(), function() {
            for (var oe = h(), J = {}, H = function() {
              var De = X[se], Dt = oe[De];
              J[De] = function(vt) {
                var Bt = Q.getProps(), $t = T({}, vt, {
                  parent: {
                    uid: I,
                    props: Bt,
                    export: Q.export
                  }
                });
                return Dt($t);
              };
            }, se = 0, X = Object.keys(oe); se < X.length; se++) H();
            return J;
          }(), {
            isEligible: function() {
              return A;
            },
            clone: $,
            render: function(oe, J) {
              return ue(window, oe, J);
            },
            renderTo: function(oe, J, H) {
              return ue(oe, J, H);
            }
          }), A && E.push(S), S;
        };
        if (p(), function() {
          var b = At("zoid_allow_delegate_" + n, function() {
            return !0;
          }), O = At("zoid_delegate_" + n, function(S) {
            var I = S.data;
            return {
              parent: xi({
                uid: I.uid,
                options: r,
                overrides: I.overrides,
                parentWin: S.source
              })
            };
          });
          kn.register(b.cancel), kn.register(O.cancel);
        }(), l.components = l.components || {}, l.components[o]) throw new Error("Can not register multiple components with the same tag: " + o);
        return l.components[o] = !0, {
          init: y,
          instances: E,
          driver: function(b, O) {
            var S = {
              react: Xa,
              angular: ts,
              vue: ka,
              vue3: es,
              angular2: rs
            };
            if (!S[b]) throw new Error("Could not find driver for framework: " + b);
            return v[b] || (v[b] = S[b].register(o, u, y, O)), v[b];
          },
          isChild: w,
          canRenderTo: function(b) {
            return bt(b, "zoid_allow_delegate_" + n).then(function(O) {
              return O.data;
            }).catch(function() {
              return !1;
            });
          },
          registerChild: p
        };
      }
      var as = function(e) {
        (function() {
          xt().initialized || (xt().initialized = !0, u = (a = {
            on: At,
            send: bt
          }).on, d = a.send, (h = xt()).receiveMessage = h.receiveMessage || function(l) {
            return Kn(l, {
              on: u,
              send: d
            });
          }, function(l) {
            var v = l.on, E = l.send;
            de().getOrSet("postMessageListener", function() {
              return Bo(window, "message", function(w) {
                (function(p, y) {
                  var b = y.on, O = y.send;
                  R.try(function() {
                    var S = p.source || p.sourceElement, I = p.origin || p.originalEvent && p.originalEvent.origin, z = p.data;
                    if (I === "null" && (I = "file://"), S) {
                      if (!I) throw new Error("Post message did not have origin domain");
                      Kn({
                        source: S,
                        origin: I,
                        data: z
                      }, {
                        on: b,
                        send: O
                      });
                    }
                  });
                })(w, {
                  on: v,
                  send: E
                });
              });
            });
          }({
            on: At,
            send: bt
          }), ui({
            on: At,
            send: bt,
            receiveMessage: Kn
          }), function(l) {
            var v = l.on, E = l.send;
            de("builtinListeners").getOrSet("helloListener", function() {
              var w = v("postrobot_hello", {
                domain: "*"
              }, function(y) {
                return Qo(y.source, {
                  domain: y.origin
                }), {
                  instanceID: Zo()
                };
              }), p = Xt();
              return p && jn(p, {
                send: E
              }).catch(function(y) {
              }), w;
            });
          }({
            on: At,
            send: bt
          }));
          var a, u, d, h;
        })();
        var r = is(e), n = function(a) {
          return r.init(a);
        };
        n.driver = function(a, u) {
          return r.driver(a, u);
        }, n.isChild = function() {
          return r.isChild();
        }, n.canRenderTo = function(a) {
          return r.canRenderTo(a);
        }, n.instances = r.instances;
        var o = r.registerChild();
        return o && (window.xprops = n.xprops = o.getProps()), n;
      };
      function Di(e) {
        Ut && Ut.destroyBridges();
        var r = Xn.all(e);
        return Xn = tn(), r;
      }
      var Ni = Di;
      function ss(e) {
        return Ni(), delete window.__zoid_10_3_3__, function() {
          (function() {
            for (var n = de("responseListeners"), o = 0, a = n.keys(); o < a.length; o++) {
              var u = a[o], d = n.get(u);
              d && (d.cancelled = !0), n.del(u);
            }
          })(), (r = de().get("postMessageListener")) && r.cancel();
          var r;
          delete window.__post_robot_11_0_0__;
        }(), kn.all(e);
      }
    }]);
  });
})(Ia);
var Aa = Ia.exports;
const ra = Aa.EVENT, yr = {
  VISIBLE: "zoid-visible",
  INVISIBLE: "zoid-invisible"
};
function ec({
  uid: t,
  frame: i,
  prerenderFrame: s,
  doc: c,
  props: f,
  event: m,
  dimensions: P
}) {
  const { width: T, height: D } = P, { top: C = 0, left: g = 0 } = f;
  if (!i || !s)
    return;
  const M = c.createElement("div");
  M.setAttribute("id", t);
  const _ = c.createElement("style");
  return f.cspNonce && _.setAttribute("nonce", f.cspNonce), _.appendChild(
    c.createTextNode(`
          #${t} {
              display: inline-block;
              position: absolute;
              width: ${T};
              height: ${D};
              z-index: 1049;
              border: none;
              top: ${C}px;
              left: ${g}px;
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

          #${t} > iframe.${yr.INVISIBLE} {
              opacity: 0;
          }

          #${t} > iframe.${yr.VISIBLE} {
              opacity: 1;
        }
      `)
  ), M.appendChild(i), M.appendChild(s), M.appendChild(_), s.classList.add(yr.INVISIBLE), i.classList.add(yr.INVISIBLE), m.on(ra.RENDERED, () => {
    setTimeout(() => {
      i.classList.remove(yr.INVISIBLE), i.classList.add(yr.VISIBLE);
    }, 100), setTimeout(() => {
      s.remove();
    }, 1);
  }), m.on(ra.RESIZE, ({ width: re, height: Re }) => {
    typeof re == "number" && (M.style.width = `${re}px`), typeof Re == "number" && (M.style.height = `${Re}px`);
  }), M;
}
function tc(t) {
  return Aa.create({
    dimensions: {
      width: "100%",
      height: "100%"
    },
    tag: `wta${t}`,
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
function rc(t) {
  return tc(t.id)(t);
}
function nc(t) {
  return new Promise((i, s) => {
    const c = document.createElement("script");
    c.async = !0, c.src = t, c.onload = i, c.onerror = s, document.body.appendChild(c);
  });
}
const oc = "https://cdn.jsdelivr.net/gh/sigmaott/sigma-ssai-web-sdk/v7/build/dist/wasm_exec.js";
let Er = null;
function na() {
  Er = null;
}
function ic() {
  const t = window;
  return t.Go ? Promise.resolve(t.wasm) : Er || (Er = nc(oc).then(() => t.Go), Er.then(na).catch(na), Er);
}
class br {
  constructor() {
    return br.instance ? br.instance : (this.session = null, this.go = null, this.buffer = null, this.audioMediaSequence = {}, br.instance = this, this);
  }
  async init(i) {
    if (!this.buffer) {
      const c = await (await fetch(i)).arrayBuffer();
      this.buffer = c;
    }
    return br.instance;
  }
  async loadSource(i) {
    this.session && (i.session = this.session);
    const s = JSON.stringify(i), c = new Go(), f = await WebAssembly.instantiate(this.buffer, c.importObject);
    c.run(f.instance);
    let m;
    for (let P = 1; P <= 3; P++)
      try {
        m = await window.loadSource(s);
        break;
      } catch (T) {
        if (console.log(`Attempt ${P} failed:`, T), P === 3)
          throw console.log("session:", this.session), console.log(s), T;
      }
    if (m.session != "" && (this.session = m.session), m.error)
      throw new Error(m.error);
    return m.manifest;
  }
  async getEventTracking() {
    if (this.session) {
      const i = window.getEventTracking(this.session);
      if (i.error)
        throw new Error(i.error);
      return { avails: JSON.parse(i.avails) };
    }
    return null;
  }
}
const ac = Ot(), sc = Ot();
function oa({ adsUrl: t, sdk: i, loader: s }) {
  return class extends s {
    constructor(f) {
      super(f);
    }
    load(f, m, P) {
      const T = P.onSuccess;
      P.onSuccess = async (D, C, g) => {
        (g.type === "manifest" || g.type === "level" || g.type === "audioTrack") && (D.data = await this.modifyManifest(D.url, D.data, g.type)), T(D, C, g);
      }, super.load(f, m, P);
    }
    async modifyManifest(f, m, P) {
      ac.value = m;
      const T = {
        proxyAds: {
          uri: t,
          timeout: 2
        }
      };
      try {
        const D = await i.loadSource({ config: T, manifest: m, masterUri: f });
        return console.log("[LOG] ~ newManifest:", D), sc.value = D, D;
      } catch (D) {
        return console.error("[LOG] ~ error:", D), m;
      }
    }
  };
}
function uc({
  video: t,
  adContainer: i,
  startSession: s,
  sdk: c
}) {
  const f = Qu(), m = Ot(!1), P = Ot(), T = Math.random().toString(36).slice(6);
  function D({ icons: ne }) {
    return {
      id: T,
      appConfig: {
        sdkBaseUrl: yn("https://cdn.jsdelivr.net/gh/sigmaott/sigma-ssai-web-sdk/v7/build/dist/wta/index.html", { id: T })
      },
      icons: ne
    };
  }
  const C = rc(D({
    icons: []
  }));
  C.render(i), C.hide(), i.style.display = "none", Su(() => {
    var ne;
    if (P.value) {
      const F = ((ne = P.value) == null ? void 0 : ne.icons) || [];
      i.style.display = "block", C.updateProps(D({
        icons: F
      })), C.show();
    } else
      i.style.display = "none", C.hide();
  });
  const g = Ot([]), M = Ot(), _ = Ot([]);
  async function re(ne) {
    var U;
    console.log("[LOG] ~ currentAd:", P);
    const F = (U = P.value) == null ? void 0 : U.trackingEvents.find((te) => te.eventType === ne);
    if (!F) {
      console.debug("[LOG] ~ event:", ne);
      return;
    }
    f.trigger(F), await Promise.all(F.beaconUrls.map((te) => Xu(cu(te, {
      retry: 3,
      retryDelay: 500
    }))));
  }
  const Re = /* @__PURE__ */ new Map();
  let Qe, R;
  function ut(ne, F, U) {
    ne.addEventListener(F, U), Re.set(F, U);
  }
  function St(ne) {
    var Ke, tt;
    const F = ((ne == null ? void 0 : ne.time) || 0) > 0 ? ne.time : 0, U = (Ke = ne == null ? void 0 : ne.value) == null ? void 0 : Ke.event;
    console.debug("[LOG] ~ eventType:", U);
    const te = _.value.find((Se) => Se.eventType === U && !Se.tracked && !Se.skipped);
    if (console.debug("[LOG] ~ eventAd:", te), !te)
      return;
    const et = te == null ? void 0 : te.ad;
    if (console.debug("[LOG] ~ ad:", et), !!et) {
      if (U === "start")
        P.value && _.value.filter((Ye) => Ye.key.startsWith(`${P.value.key}_`)).forEach((Ye) => Ye.skipped = !0), P.value = et, s(et.adVerifications, f), Qe = no(() => {
          re("impression"), re("start");
          const Se = _.value.find((Ye) => Ye.key === te.key.replace("_start", "_impression"));
          Se && (Se.tracked = !0), te.tracked = !0, R = no(() => {
            P.value = void 0;
          }, 30 * 1e3);
        }, F * 1e3);
      else {
        if (!P.value) {
          console.debug("[LOG] ~ eventType:", U);
          return;
        }
        if (et.id !== ((tt = P.value) == null ? void 0 : tt.id)) {
          console.debug("[ERROR] ~ ad:", et), console.debug("[ERROR] ~ currentAd:", P.value), _.value.filter((Ye) => Ye.key.startsWith(`${P.value.key}_`)).forEach((Ye) => Ye.skipped = !0);
          return;
        }
        Qe = no(() => {
          re(U), U === "complete" && et.id === P.value.id && (P.value = void 0, Ji(R)), te.tracked = !0;
        }, F * 1e3);
      }
      console.debug("========================================");
    }
  }
  function Et() {
    return m.value = !1, ["fullscreenchange", "webkitfullscreenchange", "mozfullscreenchange", "msfullscreenchange"].forEach((ne) => {
      ut(t, ne, () => {
        const F = document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement;
        re(F ? "fullscreen" : "exitFullscreen");
      });
    }), ut(t, "pause", () => re("pause")), ut(t, "play", () => re("resume")), ut(t, "rewind", () => re("rewind")), ut(t, "mute", () => re("mute")), ut(t, "unmute", () => re("unmute")), async (ne, F) => {
      if (M.value = F.frag.sn, ne !== window.Hls.Events.FRAG_CHANGED)
        return;
      const U = g.value.filter((te) => te.sn === F.frag.sn);
      if (!U.length) {
        console.debug("[LOG] ~ trackingEvent:", U);
        return;
      }
      U.forEach((te) => St(te)), g.value = g.value.filter((te) => te.sn !== F.frag.sn);
    };
  }
  async function ve() {
    return c.getEventTracking().then((ne) => {
      for (const F of (ne == null ? void 0 : ne.avails) || [])
        for (const U of F.ads) {
          const te = `${F.id}_${U.id}_${U.startTimeInSeconds}`;
          for (const et of U.trackingEvents) {
            const Ke = `${te}_${et.eventType}`;
            _.value.find((Se) => Se.key === Ke) || _.value.push({
              ...et,
              key: Ke,
              ad: {
                ...U,
                key: te
              },
              tracked: !1
            });
          }
        }
    });
  }
  function nt() {
    return async (ne, F) => {
      function U(Ke) {
        for (let tt = 0; tt < Ke.length; tt++)
          if (Ke[tt] === 0)
            return tt;
        return Ke.length;
      }
      const { start: te, sn: et } = F.frag;
      for (let Ke = 0; Ke < F.samples.length; Ke++) {
        const tt = F.samples[Ke], Se = tt.data, Ye = tt.pts;
        if (String.fromCharCode.apply(null, Se.slice(0, 3)) !== "ID3" || String.fromCharCode.apply(null, Se.slice(10, 14)) !== "TXXX")
          continue;
        const ge = Se.slice(21, Se.length), Gr = U(ge), Qt = ge.slice(Gr + 1, ge.length), Jr = U(Qt), Xt = new TextDecoder("utf-8").decode(Qt.slice(0, Jr)), fr = {
          sn: et,
          time: Ye - te,
          value: uo(Xt)
        };
        if (M.value && et < M.value)
          return;
        g.value.push(fr), fr.value.event === "start" && ve();
      }
    };
  }
  function Ct() {
    return (ne) => {
      const F = ne.track;
      F.kind === "metadata" && (F.oncuechange = async () => {
        const U = F.activeCues[0];
        if (U && U.value.data) {
          console.debug("[LOG] ~ elemTrack:", U), await ve();
          const te = uo(U.value.data);
          console.debug("[LOG] ~ trackingEvent:", te), St({
            value: te
          });
        }
      });
    };
  }
  function Je(ne, F) {
    f.on((U) => {
      (ne === "*" || U.eventType === ne) && F(U);
    });
  }
  function Te() {
    P.value = void 0, g.value = [], Re.forEach((ne, F) => {
      t.removeEventListener(F, ne);
    }), Re.clear(), Ji(Qe);
  }
  function cr() {
    return {
      eventTracking: g,
      trackingDataEvent: _
    };
  }
  return {
    destroy: Te,
    onEventTracking: Je,
    hlsHelper: {
      createHlsFragChanged: Et,
      createHlsFragParsingMetadata: nt
    },
    videojsHelper: {
      createVideojsAddTrack: Ct
    },
    getLog: cr
  };
}
async function dc({ video: t, adContainer: i, adsUrl: s }) {
  await ic();
  const c = new br();
  await c.init("https://cdn.jsdelivr.net/gh/sigmaott/sigma-ssai-web-sdk/v7/build/dist/sigma-cspm.wasm");
  function f() {
  }
  const { onEventTracking: m, destroy: P, videojsHelper: T, hlsHelper: D, getLog: C } = uc({
    video: t,
    adContainer: i,
    trackingUrl: "",
    startSession: f,
    sdk: c
  }), g = Ot(), M = Ot();
  function _(ve) {
    ve.config.loader = oa({ adsUrl: s, sdk: c, loader: Hls.DefaultConfig.loader }), g.value = ve;
    const nt = D.createHlsFragChanged(), Ct = D.createHlsFragParsingMetadata();
    ve.on("hlsFragChanged", nt), ve.on("hlsFragParsingMetadata", Ct), ve.on(Hls.Events.ERROR, (Je, Te) => {
      console.error("HLS Error:", Je, Te), Te.type === window.Hls.ErrorTypes.NETWORK_ERROR ? console.error("Network Error:", Te.details) : Te.type === window.Hls.ErrorTypes.MEDIA_ERROR ? console.error("Media Error:", Te.details) : console.error("Other Error:", Te.details);
    }), M.value = () => {
      ve.off("hlsFragChanged", nt), ve.off("hlsFragParsingMetadata", Ct);
    };
  }
  function re(ve) {
    ve.hls.config.loader = oa({ adsUrl: s, sdk: c, loader: SigmaManager.DefaultConfig.loader }), g.value = ve.hls;
    const nt = D.createHlsFragChanged(), Ct = D.createHlsFragParsingMetadata();
    ve.hls.on("hlsFragChanged", nt), ve.hls.on("hlsFragParsingMetadata", Ct), ve.on(SigmaManager.Events.ERROR, (Je, Te) => {
      console.log("[LOG] ~ event:", Je), console.error("HLS Error:", Je, Te), Te.type === window.Hls.ErrorTypes.NETWORK_ERROR ? console.error("Network Error:", Te.details) : Te.type === window.Hls.ErrorTypes.MEDIA_ERROR ? console.error("Media Error:", Te.details) : console.error("Other Error:", Te.details);
    }), M.value = () => {
      ve.hls.destroy();
    };
  }
  const Re = Ot(), Qe = Ot(), ut = {
    instance: c,
    config: {
      proxyAds: {
        uri: s,
        timeout: 2
      }
    }
  };
  function St(ve) {
    Re.value = ve;
    const nt = T.createVideojsAddTrack();
    ve.textTracks().on("addtrack", nt), Qe.value = () => {
      ve.textTracks().off("addtrack", nt);
    };
  }
  function Et() {
    var ve, nt;
    P(), (ve = M.value) == null || ve.call(M), (nt = Qe.value) == null || nt.call(Qe), g.value = null, Re.value = null, M.value = null, Qe.value = null;
  }
  return {
    onEventTracking: m,
    destroy: Et,
    sigmaPlayer: {
      attachVideojs: St,
      attachHls: _,
      attachSigmaDrm: re,
      attachVideojs2: St,
      getLog: C
    },
    sdk: c,
    cspm: ut
  };
}
(function(t) {
  const i = t.Vhs.PlaylistLoader.prototype.setupInitialPlaylist;
  t.Vhs.PlaylistLoader.prototype.setupInitialPlaylist = async function(s) {
    if (s.manifestString)
      try {
        const c = s.manifestString;
        await this.vhs_.options_.cspm.instance.loadSource({
          config: this.vhs_.options_.cspm.config,
          manifest: s.manifestString,
          masterUri: this.src
        });
      } catch (c) {
        console.error("Error loading source:", c);
      }
    i.apply(this, [s]);
  };
})(videojs);
(function(t) {
  const i = t.Vhs.PlaylistLoader.prototype.haveMetadata;
  t.Vhs.PlaylistLoader.prototype.haveMetadata = async function({
    playlistString: s,
    playlistObject: c,
    url: f,
    id: m
  }) {
    const P = this.vhs_.options_.cspm.config;
    console.log("state", s, c, f, m);
    try {
      if (s) {
        const T = await this.vhs_.options_.cspm.instance.loadSource({
          config: P,
          manifest: s,
          masterUri: this.main.playlists[m].resolvedUri
        });
        console.log("Updated Manifest:", this.main.playlists[m].resolvedUri), s = T;
      }
      i.apply(this, [{ playlistString: s, playlistObject: c, url: f, id: m }]);
    } catch (T) {
      console.error("Error loading source:", T);
    }
  };
})(videojs);
(function(t) {
  const i = t.Vhs.PlaylistLoader.prototype.parseManifest_;
  t.Vhs.PlaylistLoader.prototype.parseManifest_ = function({ url: s, manifestString: c }) {
    const f = i.apply(this, [{ url: s, manifestString: c }]);
    return f.playlists && f.playlists.length && (f.manifestString = c), f;
  };
})(videojs);
(function(t) {
  const i = (c, f) => {
    const m = c.segments || [], P = m[m.length - 1], T = P && P.parts && P.parts[P.parts.length - 1], D = T && T.duration || P && P.duration;
    return D ? D * 1e3 : (c.partTargetDuration || c.targetDuration || 10) * 500;
  }, s = (c, f) => f && f.responseURL && c !== f.responseURL ? f.responseURL : c;
  t.Vhs.PlaylistLoader.prototype.media = function(c, f) {
    if (!c)
      return this.media_;
    if (this.state === "HAVE_NOTHING")
      throw new Error(`Cannot switch media playlist from ${this.state}`);
    if (typeof c == "string") {
      if (!this.main.playlists[c])
        throw new Error(`Unknown playlist URI: ${c}`);
      c = this.main.playlists[c];
    }
    if (window.clearTimeout(this.finalRenditionTimeout), f) {
      const C = (c.partTargetDuration || c.targetDuration) / 2 * 1e3 || 5e3;
      console.log("Delay:", C), this.finalRenditionTimeout = window.setTimeout(this.media.bind(this, c, !1), C);
      return;
    }
    const m = this.state, P = !this.media_ || c.id !== this.media_.id, T = this.main.playlists[c.id];
    if (T && T.endList || c.endList && c.segments.length) {
      this.request && (this.request.onreadystatechange = null, this.request.abort(), this.request = null), this.state = "HAVE_METADATA", this.media_ = c, P && (this.trigger("mediachanging"), m === "HAVE_MAIN_MANIFEST" ? this.trigger("loadedmetadata") : this.trigger("mediachange"));
      return;
    }
    if (this.updateMediaUpdateTimeout_(i(c)), !P)
      return;
    if (this.state = "SWITCHING_MEDIA", this.request) {
      if (c.resolvedUri === this.request.url)
        return;
      this.request.onreadystatechange = null, this.request.abort(), this.request = null;
    }
    this.media_ && this.trigger("mediachanging"), this.pendingMedia_ = c;
    const D = {
      playlistInfo: {
        type: "media",
        uri: c.uri
      }
    };
    this.trigger({ type: "playlistrequeststart", metadata: D }), this.request = this.vhs_.xhr(
      {
        uri: c.resolvedUri,
        withCredentials: this.withCredentials,
        requestType: "hls-playlist"
      },
      (C, g) => {
        if (this.request) {
          if (c.lastRequest = Date.now(), c.resolvedUri = s(c.resolvedUri, g), C)
            return this.playlistRequestError(this.request, c, m);
          this.haveMetadata({
            playlistString: g.responseText,
            url: c.uri,
            id: c.id
          }).then(() => {
            this.trigger({ type: "playlistrequestcomplete", metadata: D }), m === "HAVE_MAIN_MANIFEST" ? this.trigger("loadedmetadata") : this.trigger("mediachange");
          });
        }
      }
    );
  };
})(videojs);
function fc(t) {
  console.log("🚀 ~ file: sdk.ts:250 ~ url:", t);
  const i = "https://dai.sigma.video/api/proxy-ads/ads/", s = vo(t), c = `${s.protocol}//${s.host}${s.pathname}`;
  if (!s.search)
    return { playerUrl: t, adsUrl: null };
  const f = Us(t), m = f["sigma.dai.adsEndpoint"];
  if (!m)
    return { playerUrl: t, adsUrl: null };
  const P = {}, T = {};
  for (const [C, g] of Object.entries(f))
    C.startsWith("sigma.dai") ? C !== "sigma.dai.adsEndpoint" && (P[C.replace("sigma.dai.", "")] = g) : T[C] = g;
  return {
    playerUrl: yn(c, T),
    adsUrl: yn(ua(i, m), P)
  };
}
export {
  dc as createSigmaDai,
  fc as processURL
};
