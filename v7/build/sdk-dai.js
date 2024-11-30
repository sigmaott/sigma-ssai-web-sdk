const gs = /#/g, ys = /&/g, Es = /\//g, bs = /=/g, ho = /\+/g, Ps = /%5e/gi, Ts = /%60/gi, Os = /%7c/gi, Rs = /%20/gi;
function Ss(t) {
  return encodeURI("" + t).replace(Os, "|");
}
function ao(t) {
  return Ss(typeof t == "string" ? t : JSON.stringify(t)).replace(ho, "%2B").replace(Rs, "+").replace(gs, "%23").replace(ys, "%26").replace(Ts, "`").replace(Ps, "^").replace(Es, "%2F");
}
function ro(t) {
  return ao(t).replace(bs, "%3D");
}
function oa(t = "") {
  try {
    return decodeURIComponent("" + t);
  } catch {
    return "" + t;
  }
}
function xs(t) {
  return oa(t.replace(ho, " "));
}
function Ds(t) {
  return oa(t.replace(ho, " "));
}
function ia(t = "") {
  const i = {};
  t[0] === "?" && (t = t.slice(1));
  for (const s of t.split("&")) {
    const c = s.match(/([^=]+)=?(.*)/) || [];
    if (c.length < 2)
      continue;
    const f = xs(c[1]);
    if (f === "__proto__" || f === "constructor")
      continue;
    const m = Ds(c[2] || "");
    i[f] === void 0 ? i[f] = m : Array.isArray(i[f]) ? i[f].push(m) : i[f] = [i[f], m];
  }
  return i;
}
function Ns(t, i) {
  return (typeof i == "number" || typeof i == "boolean") && (i = String(i)), i ? Array.isArray(i) ? i.map((s) => `${ro(t)}=${ao(s)}`).join("&") : `${ro(t)}=${ao(i)}` : ro(t);
}
function Cs(t) {
  return Object.keys(t).filter((i) => t[i] !== void 0).map((i) => Ns(i, t[i])).filter(Boolean).join("&");
}
const Is = /^[\s\w\0+.-]{2,}:([/\\]{1,2})/, As = /^[\s\w\0+.-]{2,}:([/\\]{2})?/, Ws = /^([/\\]\s*){2,}[^/\\]/, _s = /^\.?\//;
function aa(t, i = {}) {
  return typeof i == "boolean" && (i = { acceptRelative: i }), i.strict ? Is.test(t) : As.test(t) || (i.acceptRelative ? Ws.test(t) : !1);
}
function Ms(t = "", i) {
  return t.endsWith("/");
}
function Fs(t = "", i) {
  return (Ms(t) ? t.slice(0, -1) : t) || "/";
}
function zs(t = "", i) {
  return t.endsWith("/") ? t : t + "/";
}
function Ls(t, i) {
  if (Us(i) || aa(t))
    return t;
  const s = Fs(i);
  return t.startsWith(s) ? t : sa(s, t);
}
function gn(t, i) {
  const s = po(t), c = { ...ia(s.search), ...i };
  return s.search = Cs(c), $s(s);
}
function js(t) {
  return ia(po(t).search);
}
function Us(t) {
  return !t || t === "/";
}
function Bs(t) {
  return t && t !== "/";
}
function sa(t, ...i) {
  let s = t || "";
  for (const c of i.filter((f) => Bs(f)))
    if (s) {
      const f = c.replace(_s, "");
      s = zs(s) + f;
    } else
      s = c;
  return s;
}
const ua = Symbol.for("ufo:protocolRelative");
function po(t = "", i) {
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
  if (!aa(t, { acceptRelative: !0 }))
    return $i(t);
  const [, c = "", f, m = ""] = t.replace(/\\/g, "/").match(/^[\s\0]*([\w+.-]{2,}:)?\/\/([^/@]+@)?(.*)/) || [];
  let [, P = "", T = ""] = m.match(/([^#/?]*)(.*)?/) || [];
  c === "file:" && (T = T.replace(/\/(?=[A-Za-z]:)/, ""));
  const { pathname: D, search: C, hash: g } = $i(T);
  return {
    protocol: c.toLowerCase(),
    auth: f ? f.slice(0, Math.max(0, f.length - 1)) : "",
    host: P,
    pathname: D,
    search: C,
    hash: g,
    [ua]: !c
  };
}
function $i(t = "") {
  const [i = "", s = "", c = ""] = (t.match(/([^#?]*)(\?[^#]*)?(#.*)?/) || []).splice(1);
  return {
    pathname: i,
    search: s,
    hash: c
  };
}
function $s(t) {
  const i = t.pathname || "", s = t.search ? (t.search.startsWith("?") ? "" : "?") + t.search : "", c = t.hash || "", f = t.auth ? t.auth + "@" : "", m = t.host || "";
  return (t.protocol || t[ua] ? (t.protocol || "") + "//" : "") + f + m + i + s + c;
}
const qs = /"(?:_|\\u0{2}5[Ff]){2}(?:p|\\u0{2}70)(?:r|\\u0{2}72)(?:o|\\u0{2}6[Ff])(?:t|\\u0{2}74)(?:o|\\u0{2}6[Ff])(?:_|\\u0{2}5[Ff]){2}"\s*:/, Hs = /"(?:c|\\u0063)(?:o|\\u006[Ff])(?:n|\\u006[Ee])(?:s|\\u0073)(?:t|\\u0074)(?:r|\\u0072)(?:u|\\u0075)(?:c|\\u0063)(?:t|\\u0074)(?:o|\\u006[Ff])(?:r|\\u0072)"\s*:/, Vs = /^\s*["[{]|^\s*-?\d{1,16}(\.\d{1,17})?([Ee][+-]?\d+)?\s*$/;
function Gs(t, i) {
  if (t === "__proto__" || t === "constructor" && i && typeof i == "object" && "prototype" in i) {
    Js(t);
    return;
  }
  return i;
}
function Js(t) {
  console.warn(`[destr] Dropping "${t}" key to prevent prototype pollution.`);
}
function so(t, i = {}) {
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
  if (!Vs.test(t)) {
    if (i.strict)
      throw new SyntaxError("[destr] Invalid JSON");
    return t;
  }
  try {
    if (qs.test(t) || Hs.test(t)) {
      if (i.strict)
        throw new Error("[destr] Possible prototype pollution");
      return JSON.parse(t, Gs);
    }
    return JSON.parse(t);
  } catch (c) {
    if (i.strict)
      throw c;
    return t;
  }
}
class Ks extends Error {
  constructor(i, s) {
    super(i, s), this.name = "FetchError", s != null && s.cause && !this.cause && (this.cause = s.cause);
  }
}
function Ys(t) {
  var D, C, g, M, _;
  const i = ((D = t.error) == null ? void 0 : D.message) || ((C = t.error) == null ? void 0 : C.toString()) || "", s = ((g = t.request) == null ? void 0 : g.method) || ((M = t.options) == null ? void 0 : M.method) || "GET", c = ((_ = t.request) == null ? void 0 : _.url) || String(t.request) || "/", f = `[${s}] ${JSON.stringify(c)}`, m = t.response ? `${t.response.status} ${t.response.statusText}` : "<no response>", P = `${f}: ${m}${i ? ` ${i}` : ""}`, T = new Ks(
    P,
    t.error ? { cause: t.error } : void 0
  );
  for (const te of ["request", "options", "response"])
    Object.defineProperty(T, te, {
      get() {
        return t[te];
      }
    });
  for (const [te, Re] of [
    ["data", "_data"],
    ["status", "status"],
    ["statusCode", "status"],
    ["statusText", "statusText"],
    ["statusMessage", "statusText"]
  ])
    Object.defineProperty(T, te, {
      get() {
        return t.response && t.response[Re];
      }
    });
  return T;
}
const Zs = new Set(
  Object.freeze(["PATCH", "POST", "PUT", "DELETE"])
);
function qi(t = "GET") {
  return Zs.has(t.toUpperCase());
}
function Qs(t) {
  if (t === void 0)
    return !1;
  const i = typeof t;
  return i === "string" || i === "number" || i === "boolean" || i === null ? !0 : i !== "object" ? !1 : Array.isArray(t) ? !0 : t.buffer ? !1 : t.constructor && t.constructor.name === "Object" || typeof t.toJSON == "function";
}
const Xs = /* @__PURE__ */ new Set([
  "image/svg",
  "application/xml",
  "application/xhtml",
  "application/html"
]), ks = /^application\/(?:[\w!#$%&*.^`~-]*\+)?json(;.+)?$/i;
function eu(t = "") {
  if (!t)
    return "json";
  const i = t.split(";").shift() || "";
  return ks.test(i) ? "json" : Xs.has(i) || i.startsWith("text/") ? "text" : "blob";
}
function tu(t, i, s = globalThis.Headers) {
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
const ru = /* @__PURE__ */ new Set([
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
function ca(t = {}) {
  const {
    fetch: i = globalThis.fetch,
    Headers: s = globalThis.Headers,
    AbortController: c = globalThis.AbortController
  } = t;
  async function f(T) {
    const D = T.error && T.error.name === "AbortError" && !T.options.timeout || !1;
    if (T.options.retry !== !1 && !D) {
      let g;
      typeof T.options.retry == "number" ? g = T.options.retry : g = qi(T.options.method) ? 0 : 1;
      const M = T.response && T.response.status || 500;
      if (g > 0 && (Array.isArray(T.options.retryStatusCodes) ? T.options.retryStatusCodes.includes(M) : ru.has(M))) {
        const _ = T.options.retryDelay || 0;
        return _ > 0 && await new Promise((te) => setTimeout(te, _)), m(T.request, {
          ...T.options,
          retry: g - 1
        });
      }
    }
    const C = Ys(T);
    throw Error.captureStackTrace && Error.captureStackTrace(C, m), C;
  }
  const m = async function(D, C = {}) {
    var te;
    const g = {
      request: D,
      options: tu(C, t.defaults, s),
      response: void 0,
      error: void 0
    };
    g.options.method = (te = g.options.method) == null ? void 0 : te.toUpperCase(), g.options.onRequest && await g.options.onRequest(g), typeof g.request == "string" && (g.options.baseURL && (g.request = Ls(g.request, g.options.baseURL)), (g.options.query || g.options.params) && (g.request = gn(g.request, {
      ...g.options.params,
      ...g.options.query
    }))), g.options.body && qi(g.options.method) && (Qs(g.options.body) ? (g.options.body = typeof g.options.body == "string" ? g.options.body : JSON.stringify(g.options.body), g.options.headers = new s(g.options.headers || {}), g.options.headers.has("content-type") || g.options.headers.set("content-type", "application/json"), g.options.headers.has("accept") || g.options.headers.set("accept", "application/json")) : (
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
    if (g.response.body && !nu.has(g.response.status) && g.options.method !== "HEAD") {
      const Re = (g.options.parseResponse ? "json" : g.options.responseType) || eu(g.response.headers.get("content-type") || "");
      switch (Re) {
        case "json": {
          const Qe = await g.response.text(), R = g.options.parseResponse || so;
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
  return P.raw = m, P.native = (...T) => i(...T), P.create = (T = {}) => ca({
    ...t,
    defaults: {
      ...t.defaults,
      ...T
    }
  }), P;
}
const vo = function() {
  if (typeof globalThis < "u")
    return globalThis;
  if (typeof self < "u")
    return self;
  if (typeof window < "u")
    return window;
  if (typeof global < "u")
    return global;
  throw new Error("unable to locate global object");
}(), ou = vo.fetch || (() => Promise.reject(new Error("[ofetch] global.fetch is not supported!"))), iu = vo.Headers, au = vo.AbortController, su = ca({ fetch: ou, Headers: iu, AbortController: au }), uu = su.create({
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
}), cu = (t) => (i, s) => (t.set(i, s), s), Hi = Number.MAX_SAFE_INTEGER === void 0 ? 9007199254740991 : Number.MAX_SAFE_INTEGER, da = 536870912, Vi = da * 2, du = (t, i) => (s) => {
  const c = i.get(s);
  let f = c === void 0 ? s.size : c < Vi ? c + 1 : 0;
  if (!s.has(f))
    return t(s, f);
  if (s.size < da) {
    for (; s.has(f); )
      f = Math.floor(Math.random() * Vi);
    return t(s, f);
  }
  if (s.size > Hi)
    throw new Error("Congratulations, you created a collection of unique numbers which uses all available integers!");
  for (; s.has(f); )
    f = Math.floor(Math.random() * Hi);
  return t(s, f);
}, fa = /* @__PURE__ */ new WeakMap(), fu = cu(fa), ln = du(fu, fa), lu = (t) => t.method !== void 0 && t.method === "call", hu = (t) => typeof t.id == "number" && typeof t.result == "boolean", pu = (t) => {
  const i = /* @__PURE__ */ new Map([[0, () => {
  }]]), s = /* @__PURE__ */ new Map([[0, () => {
  }]]), c = /* @__PURE__ */ new Map(), f = new Worker(t);
  return f.addEventListener("message", ({ data: C }) => {
    if (lu(C)) {
      const { params: { timerId: g, timerType: M } } = C;
      if (M === "interval") {
        const _ = i.get(g);
        if (typeof _ === void 0)
          throw new Error("The timer is in an undefined state.");
        if (typeof _ == "number") {
          const te = c.get(_);
          if (te === void 0 || te.timerId !== g || te.timerType !== M)
            throw new Error("The timer is in an undefined state.");
        } else typeof _ == "function" && _();
      } else if (M === "timeout") {
        const _ = s.get(g);
        if (typeof _ === void 0)
          throw new Error("The timer is in an undefined state.");
        if (typeof _ == "number") {
          const te = c.get(_);
          if (te === void 0 || te.timerId !== g || te.timerType !== M)
            throw new Error("The timer is in an undefined state.");
        } else typeof _ == "function" && (_(), s.delete(g));
      }
    } else if (hu(C)) {
      const { id: g } = C, M = c.get(g);
      if (M === void 0)
        throw new Error("The timer is in an undefined state.");
      const { timerId: _, timerType: te } = M;
      c.delete(g), te === "interval" ? i.delete(_) : s.delete(_);
    } else {
      const { error: { message: g } } = C;
      throw new Error(g);
    }
  }), {
    clearInterval: (C) => {
      if (typeof i.get(C) == "function") {
        const g = ln(c);
        c.set(g, { timerId: C, timerType: "interval" }), i.set(C, g), f.postMessage({
          id: g,
          method: "clear",
          params: { timerId: C, timerType: "interval" }
        });
      }
    },
    clearTimeout: (C) => {
      if (typeof s.get(C) == "function") {
        const g = ln(c);
        c.set(g, { timerId: C, timerType: "timeout" }), s.set(C, g), f.postMessage({
          id: g,
          method: "clear",
          params: { timerId: C, timerType: "timeout" }
        });
      }
    },
    setInterval: (C, g = 0, ...M) => {
      const _ = ln(i);
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
      const _ = ln(s);
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
}, vu = (t, i) => {
  let s = null;
  return () => {
    if (s !== null)
      return s;
    const c = new Blob([i], { type: "application/javascript; charset=utf-8" }), f = URL.createObjectURL(c);
    return s = t(f), setTimeout(() => URL.revokeObjectURL(f)), s;
  };
}, wu = `(()=>{"use strict";const e=new Map,t=new Map,r=t=>{const r=e.get(t);return void 0!==r&&(clearTimeout(r),e.delete(t),!0)},s=e=>{const r=t.get(e);return void 0!==r&&(clearTimeout(r),t.delete(e),!0)},o=(e,t)=>{const r=performance.now(),s=e+t-r-performance.timeOrigin;return{expected:r+s,remainingDelay:s}},i=(e,t,r,s)=>{const o=r-performance.now();o>0?e.set(t,setTimeout(i,o,e,t,r,s)):(e.delete(t),postMessage({id:null,method:"call",params:{timerId:t,timerType:s}}))};addEventListener("message",(n=>{let{data:a}=n;try{if("clear"===a.method){const{id:e,params:{timerId:t,timerType:o}}=a;if("interval"===o)postMessage({id:e,result:r(t)});else{if("timeout"!==o)throw new Error('The given type "'.concat(o,'" is not supported'));postMessage({id:e,result:s(t)})}}else{if("set"!==a.method)throw new Error('The given method "'.concat(a.method,'" is not supported'));{const{params:{delay:r,now:s,timerId:n,timerType:m}}=a;if("interval"===m)((t,r,s)=>{const{expected:n,remainingDelay:a}=o(t,s);e.set(r,setTimeout(i,a,e,r,n,"interval"))})(r,n,s);else{if("timeout"!==m)throw new Error('The given type "'.concat(m,'" is not supported'));((e,r,s)=>{const{expected:n,remainingDelay:a}=o(e,s);t.set(r,setTimeout(i,a,t,r,n,"timeout"))})(r,n,s)}}}}catch(e){postMessage({error:{message:e.message},id:a.id,result:null})}}))})();`, la = vu(pu, wu), mu = (t) => la().clearTimeout(t), Gi = (...t) => la().setTimeout(...t);
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
const Ji = Object.assign, yu = Object.prototype.hasOwnProperty, uo = (t, i) => yu.call(t, i), Pr = Array.isArray, $r = (t) => ha(t) === "[object Map]", Eu = (t) => typeof t == "string", Vr = (t) => typeof t == "symbol", En = (t) => t !== null && typeof t == "object", bu = Object.prototype.toString, ha = (t) => bu.call(t), pa = (t) => ha(t).slice(8, -1), wo = (t) => Eu(t) && t !== "NaN" && t[0] !== "-" && "" + parseInt(t, 10) === t, Pu = (t) => {
  const i = /* @__PURE__ */ Object.create(null);
  return (s) => i[s] || (i[s] = t(s));
}, Tu = Pu((t) => t.charAt(0).toUpperCase() + t.slice(1)), Sr = (t, i) => !Object.is(t, i);
var Ve = {};
function Or(t, ...i) {
  console.warn(`[Vue warn] ${t}`, ...i);
}
let le;
const no = /* @__PURE__ */ new WeakSet();
class Ki {
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
    this.flags & 2 && !(this.flags & 32) || this.flags & 8 || (this.flags |= 8, this.nextEffect = qr, qr = this);
  }
  run() {
    if (!(this.flags & 1))
      return this.fn();
    this.flags |= 2, Yi(this), wa(this);
    const i = le, s = Ot;
    le = this, Ot = !0;
    try {
      return this.fn();
    } finally {
      Ve.NODE_ENV !== "production" && le !== this && Or(
        "Active effect was not restored correctly - this is likely a Vue internal bug."
      ), ma(this), le = i, Ot = s, this.flags &= -3;
    }
  }
  stop() {
    if (this.flags & 1) {
      for (let i = this.deps; i; i = i.nextDep)
        yo(i);
      this.deps = this.depsTail = void 0, Yi(this), this.onStop && this.onStop(), this.flags &= -2;
    }
  }
  trigger() {
    this.flags & 64 ? no.add(this) : this.scheduler ? this.scheduler() : this.runIfDirty();
  }
  /**
   * @internal
   */
  runIfDirty() {
    co(this) && this.run();
  }
  get dirty() {
    return co(this);
  }
}
let va = 0, qr;
function mo() {
  va++;
}
function go() {
  if (--va > 0)
    return;
  let t;
  for (; qr; ) {
    let i = qr;
    for (qr = void 0; i; ) {
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
function wa(t) {
  for (let i = t.deps; i; i = i.nextDep)
    i.version = -1, i.prevActiveLink = i.dep.activeLink, i.dep.activeLink = i;
}
function ma(t) {
  let i, s = t.depsTail;
  for (let c = s; c; c = c.prevDep)
    c.version === -1 ? (c === s && (s = c.prevDep), yo(c), Ru(c)) : i = c, c.dep.activeLink = c.prevActiveLink, c.prevActiveLink = void 0;
  t.deps = i, t.depsTail = s;
}
function co(t) {
  for (let i = t.deps; i; i = i.nextDep)
    if (i.dep.version !== i.version || i.dep.computed && Ou(i.dep.computed) === !1 || i.dep.version !== i.version)
      return !0;
  return !!t._dirty;
}
function Ou(t) {
  if (t.flags & 2)
    return !1;
  if (t.flags & 4 && !(t.flags & 16) || (t.flags &= -17, t.globalVersion === yn))
    return;
  t.globalVersion = yn;
  const i = t.dep;
  if (t.flags |= 2, i.version > 0 && !t.isSSR && !co(t)) {
    t.flags &= -3;
    return;
  }
  const s = le, c = Ot;
  le = t, Ot = !0;
  try {
    wa(t);
    const f = t.fn();
    (i.version === 0 || Sr(f, t._value)) && (t._value = f, i.version++);
  } catch (f) {
    throw i.version++, f;
  } finally {
    le = s, Ot = c, ma(t), t.flags &= -3;
  }
}
function yo(t) {
  const { dep: i, prevSub: s, nextSub: c } = t;
  if (s && (s.nextSub = c, t.prevSub = void 0), c && (c.prevSub = s, t.nextSub = void 0), i.subs === t && (i.subs = s), !i.subs && i.computed) {
    i.computed.flags &= -5;
    for (let f = i.computed.deps; f; f = f.nextDep)
      yo(f);
  }
}
function Ru(t) {
  const { prevDep: i, nextDep: s } = t;
  i && (i.nextDep = s, t.prevDep = void 0), s && (s.prevDep = i, t.nextDep = void 0);
}
function Su(t, i) {
  t.effect instanceof Ki && (t = t.effect.fn);
  const s = new Ki(t);
  try {
    s.run();
  } catch (f) {
    throw s.stop(), f;
  }
  const c = s.run.bind(s);
  return c.effect = s, c;
}
let Ot = !0;
const ga = [];
function xu() {
  ga.push(Ot), Ot = !1;
}
function Du() {
  const t = ga.pop();
  Ot = t === void 0 ? !0 : t;
}
function Yi(t) {
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
let yn = 0;
class ya {
  constructor(i) {
    this.computed = i, this.version = 0, this.activeLink = void 0, this.subs = void 0, Ve.NODE_ENV !== "production" && (this.subsHead = void 0);
  }
  track(i) {
    if (!le || !Ot)
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
      }, le.deps ? (s.prevDep = le.depsTail, le.depsTail.nextDep = s, le.depsTail = s) : le.deps = le.depsTail = s, le.flags & 4 && Ea(s);
    else if (s.version === -1 && (s.version = this.version, s.nextDep)) {
      const c = s.nextDep;
      c.prevDep = s.prevDep, s.prevDep && (s.prevDep.nextDep = c), s.prevDep = le.depsTail, s.nextDep = void 0, le.depsTail.nextDep = s, le.depsTail = s, le.deps === s && (le.deps = c);
    }
    return Ve.NODE_ENV !== "production" && le.onTrack && le.onTrack(
      Ji(
        {
          effect: le
        },
        i
      )
    ), s;
  }
  trigger(i) {
    this.version++, yn++, this.notify(i);
  }
  notify(i) {
    mo();
    try {
      if (Ve.NODE_ENV !== "production")
        for (let s = this.subsHead; s; s = s.nextSub)
          Ve.NODE_ENV !== "production" && s.sub.onTrigger && !(s.sub.flags & 8) && s.sub.onTrigger(
            Ji(
              {
                effect: s.sub
              },
              i
            )
          );
      for (let s = this.subs; s; s = s.prevSub)
        s.sub.notify();
    } finally {
      go();
    }
  }
}
function Ea(t) {
  const i = t.dep.computed;
  if (i && !t.dep.subs) {
    i.flags |= 20;
    for (let c = i.deps; c; c = c.nextDep)
      Ea(c);
  }
  const s = t.dep.subs;
  s !== t && (t.prevSub = s, s && (s.nextSub = t)), Ve.NODE_ENV !== "production" && t.dep.subsHead === void 0 && (t.dep.subsHead = t), t.dep.subs = t;
}
const fo = /* @__PURE__ */ new WeakMap(), cr = Symbol(
  Ve.NODE_ENV !== "production" ? "Object iterate" : ""
), lo = Symbol(
  Ve.NODE_ENV !== "production" ? "Map keys iterate" : ""
), Hr = Symbol(
  Ve.NODE_ENV !== "production" ? "Array iterate" : ""
);
function ct(t, i, s) {
  if (Ot && le) {
    let c = fo.get(t);
    c || fo.set(t, c = /* @__PURE__ */ new Map());
    let f = c.get(s);
    f || c.set(s, f = new ya()), Ve.NODE_ENV !== "production" ? f.track({
      target: t,
      type: i,
      key: s
    }) : f.track();
  }
}
function Zt(t, i, s, c, f, m) {
  const P = fo.get(t);
  if (!P) {
    yn++;
    return;
  }
  let T = [];
  if (i === "clear")
    T = [...P.values()];
  else {
    const D = Pr(t), C = D && wo(s);
    if (D && s === "length") {
      const g = Number(c);
      P.forEach((M, _) => {
        (_ === "length" || _ === Hr || !Vr(_) && _ >= g) && T.push(M);
      });
    } else {
      const g = (M) => M && T.push(M);
      switch (s !== void 0 && g(P.get(s)), C && g(P.get(Hr)), i) {
        case "add":
          D ? C && g(P.get("length")) : (g(P.get(cr)), $r(t) && g(P.get(lo)));
          break;
        case "delete":
          D || (g(P.get(cr)), $r(t) && g(P.get(lo)));
          break;
        case "set":
          $r(t) && g(P.get(cr));
          break;
      }
    }
  }
  mo();
  for (const D of T)
    Ve.NODE_ENV !== "production" ? D.trigger({
      target: t,
      type: i,
      key: s,
      newValue: c,
      oldValue: f,
      oldTarget: m
    }) : D.trigger();
  go();
}
function gr(t) {
  const i = he(t);
  return i === t ? i : (ct(i, "iterate", Hr), Qt(t) ? i : i.map(st));
}
function Eo(t) {
  return ct(t = he(t), "iterate", Hr), t;
}
const Nu = {
  __proto__: null,
  [Symbol.iterator]() {
    return oo(this, Symbol.iterator, st);
  },
  concat(...t) {
    return gr(this).concat(
      ...t.map((i) => Pr(i) ? gr(i) : i)
    );
  },
  entries() {
    return oo(this, "entries", (t) => (t[1] = st(t[1]), t));
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
    return io(this, "includes", t);
  },
  indexOf(...t) {
    return io(this, "indexOf", t);
  },
  join(t) {
    return gr(this).join(t);
  },
  // keys() iterator only reads `length`, no optimisation required
  lastIndexOf(...t) {
    return io(this, "lastIndexOf", t);
  },
  map(t, i) {
    return zt(this, "map", t, i, void 0, arguments);
  },
  pop() {
    return Br(this, "pop");
  },
  push(...t) {
    return Br(this, "push", t);
  },
  reduce(t, ...i) {
    return Zi(this, "reduce", t, i);
  },
  reduceRight(t, ...i) {
    return Zi(this, "reduceRight", t, i);
  },
  shift() {
    return Br(this, "shift");
  },
  // slice could use ARRAY_ITERATE but also seems to beg for range tracking
  some(t, i) {
    return zt(this, "some", t, i, void 0, arguments);
  },
  splice(...t) {
    return Br(this, "splice", t);
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
    return Br(this, "unshift", t);
  },
  values() {
    return oo(this, "values", st);
  }
};
function oo(t, i, s) {
  const c = Eo(t), f = c[i]();
  return c !== t && !Qt(t) && (f._next = f.next, f.next = () => {
    const m = f._next();
    return m.value && (m.value = s(m.value)), m;
  }), f;
}
const Cu = Array.prototype;
function zt(t, i, s, c, f, m) {
  const P = Eo(t), T = P !== t && !Qt(t), D = P[i];
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
function Zi(t, i, s, c) {
  const f = Eo(t);
  let m = s;
  return f !== t && (Qt(t) ? s.length > 3 && (m = function(P, T, D) {
    return s.call(this, P, T, D, t);
  }) : m = function(P, T, D) {
    return s.call(this, P, st(T), D, t);
  }), f[i](m, ...c);
}
function io(t, i, s) {
  const c = he(t);
  ct(c, "iterate", Hr);
  const f = c[i](...s);
  return (f === -1 || f === !1) && Ku(s[0]) ? (s[0] = he(s[0]), c[i](...s)) : f;
}
function Br(t, i, s = []) {
  xu(), mo();
  const c = he(t)[i].apply(t, s);
  return go(), Du(), c;
}
const Iu = /* @__PURE__ */ gu("__proto__,__v_isRef,__isVue"), ba = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((t) => t !== "arguments" && t !== "caller").map((t) => Symbol[t]).filter(Vr)
);
function Au(t) {
  Vr(t) || (t = String(t));
  const i = he(this);
  return ct(i, "has", t), i.hasOwnProperty(t);
}
class Pa {
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
      return c === (f ? m ? Vu : Sa : m ? Hu : Ra).get(i) || // receiver is not the reactive proxy, but has the same prototype
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
    return (Vr(s) ? ba.has(s) : Iu(s)) || (f || ct(i, "get", s), m) ? T : Tr(T) ? P && wo(s) ? T : T.value : En(T) ? f ? Da(T) : xa(T) : T;
  }
}
class Wu extends Pa {
  constructor(i = !1) {
    super(!1, i);
  }
  set(i, s, c, f) {
    let m = i[s];
    if (!this._isShallow) {
      const D = Rr(m);
      if (!Qt(c) && !Rr(c) && (m = he(m), c = he(c)), !Pr(i) && Tr(m) && !Tr(c))
        return D ? !1 : (m.value = c, !0);
    }
    const P = Pr(i) && wo(s) ? Number(s) < i.length : uo(i, s), T = Reflect.set(
      i,
      s,
      c,
      Tr(i) ? i : f
    );
    return i === he(f) && (P ? Sr(c, m) && Zt(i, "set", s, c, m) : Zt(i, "add", s, c)), T;
  }
  deleteProperty(i, s) {
    const c = uo(i, s), f = i[s], m = Reflect.deleteProperty(i, s);
    return m && c && Zt(i, "delete", s, void 0, f), m;
  }
  has(i, s) {
    const c = Reflect.has(i, s);
    return (!Vr(s) || !ba.has(s)) && ct(i, "has", s), c;
  }
  ownKeys(i) {
    return ct(
      i,
      "iterate",
      Pr(i) ? "length" : cr
    ), Reflect.ownKeys(i);
  }
}
class _u extends Pa {
  constructor(i = !1) {
    super(!0, i);
  }
  set(i, s) {
    return Ve.NODE_ENV !== "production" && Or(
      `Set operation on key "${String(s)}" failed: target is readonly.`,
      i
    ), !0;
  }
  deleteProperty(i, s) {
    return Ve.NODE_ENV !== "production" && Or(
      `Delete operation on key "${String(s)}" failed: target is readonly.`,
      i
    ), !0;
  }
}
const Mu = /* @__PURE__ */ new Wu(), Fu = /* @__PURE__ */ new _u(), bo = (t) => t, bn = (t) => Reflect.getPrototypeOf(t);
function hn(t, i, s = !1, c = !1) {
  t = t.__v_raw;
  const f = he(t), m = he(i);
  s || (Sr(i, m) && ct(f, "get", i), ct(f, "get", m));
  const { has: P } = bn(f), T = c ? bo : s ? Po : st;
  if (P.call(f, i))
    return T(t.get(i));
  if (P.call(f, m))
    return T(t.get(m));
  t !== f && t.get(i);
}
function pn(t, i = !1) {
  const s = this.__v_raw, c = he(s), f = he(t);
  return i || (Sr(t, f) && ct(c, "has", t), ct(c, "has", f)), t === f ? s.has(t) : s.has(t) || s.has(f);
}
function vn(t, i = !1) {
  return t = t.__v_raw, !i && ct(he(t), "iterate", cr), Reflect.get(t, "size", t);
}
function Qi(t, i = !1) {
  !i && !Qt(t) && !Rr(t) && (t = he(t));
  const s = he(this);
  return bn(s).has.call(s, t) || (s.add(t), Zt(s, "add", t, t)), this;
}
function Xi(t, i, s = !1) {
  !s && !Qt(i) && !Rr(i) && (i = he(i));
  const c = he(this), { has: f, get: m } = bn(c);
  let P = f.call(c, t);
  P ? Ve.NODE_ENV !== "production" && Oa(c, f, t) : (t = he(t), P = f.call(c, t));
  const T = m.call(c, t);
  return c.set(t, i), P ? Sr(i, T) && Zt(c, "set", t, i, T) : Zt(c, "add", t, i), this;
}
function ki(t) {
  const i = he(this), { has: s, get: c } = bn(i);
  let f = s.call(i, t);
  f ? Ve.NODE_ENV !== "production" && Oa(i, s, t) : (t = he(t), f = s.call(i, t));
  const m = c ? c.call(i, t) : void 0, P = i.delete(t);
  return f && Zt(i, "delete", t, void 0, m), P;
}
function ea() {
  const t = he(this), i = t.size !== 0, s = Ve.NODE_ENV !== "production" ? $r(t) ? new Map(t) : new Set(t) : void 0, c = t.clear();
  return i && Zt(t, "clear", void 0, void 0, s), c;
}
function wn(t, i) {
  return function(c, f) {
    const m = this, P = m.__v_raw, T = he(P), D = i ? bo : t ? Po : st;
    return !t && ct(T, "iterate", cr), P.forEach((C, g) => c.call(f, D(C), D(g), m));
  };
}
function mn(t, i, s) {
  return function(...c) {
    const f = this.__v_raw, m = he(f), P = $r(m), T = t === "entries" || t === Symbol.iterator && P, D = t === "keys" && P, C = f[t](...c), g = s ? bo : i ? Po : st;
    return !i && ct(
      m,
      "iterate",
      D ? lo : cr
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
function Yt(t) {
  return function(...i) {
    if (Ve.NODE_ENV !== "production") {
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
      return hn(this, m);
    },
    get size() {
      return vn(this);
    },
    has: pn,
    add: Qi,
    set: Xi,
    delete: ki,
    clear: ea,
    forEach: wn(!1, !1)
  }, i = {
    get(m) {
      return hn(this, m, !1, !0);
    },
    get size() {
      return vn(this);
    },
    has: pn,
    add(m) {
      return Qi.call(this, m, !0);
    },
    set(m, P) {
      return Xi.call(this, m, P, !0);
    },
    delete: ki,
    clear: ea,
    forEach: wn(!1, !0)
  }, s = {
    get(m) {
      return hn(this, m, !0);
    },
    get size() {
      return vn(this, !0);
    },
    has(m) {
      return pn.call(this, m, !0);
    },
    add: Yt("add"),
    set: Yt("set"),
    delete: Yt("delete"),
    clear: Yt("clear"),
    forEach: wn(!0, !1)
  }, c = {
    get(m) {
      return hn(this, m, !0, !0);
    },
    get size() {
      return vn(this, !0);
    },
    has(m) {
      return pn.call(this, m, !0);
    },
    add: Yt("add"),
    set: Yt("set"),
    delete: Yt("delete"),
    clear: Yt("clear"),
    forEach: wn(!0, !0)
  };
  return [
    "keys",
    "values",
    "entries",
    Symbol.iterator
  ].forEach((m) => {
    t[m] = mn(m, !1, !1), s[m] = mn(m, !0, !1), i[m] = mn(m, !1, !0), c[m] = mn(
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
function Ta(t, i) {
  const s = i ? t ? Bu : Uu : t ? ju : Lu;
  return (c, f, m) => f === "__v_isReactive" ? !t : f === "__v_isReadonly" ? t : f === "__v_raw" ? c : Reflect.get(
    uo(s, f) && f in c ? s : c,
    f,
    m
  );
}
const $u = {
  get: /* @__PURE__ */ Ta(!1, !1)
}, qu = {
  get: /* @__PURE__ */ Ta(!0, !1)
};
function Oa(t, i, s) {
  const c = he(s);
  if (c !== s && i.call(t, c)) {
    const f = pa(t);
    Or(
      `Reactive ${f} contains both the raw and reactive versions of the same object${f === "Map" ? " as keys" : ""}, which can lead to inconsistencies. Avoid differentiating between the raw and reactive versions of an object and only use the reactive version if possible.`
    );
  }
}
const Ra = /* @__PURE__ */ new WeakMap(), Hu = /* @__PURE__ */ new WeakMap(), Sa = /* @__PURE__ */ new WeakMap(), Vu = /* @__PURE__ */ new WeakMap();
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
  return t.__v_skip || !Object.isExtensible(t) ? 0 : Gu(pa(t));
}
function xa(t) {
  return Rr(t) ? t : Na(
    t,
    !1,
    Mu,
    $u,
    Ra
  );
}
function Da(t) {
  return Na(
    t,
    !0,
    Fu,
    qu,
    Sa
  );
}
function Na(t, i, s, c, f) {
  if (!En(t))
    return Ve.NODE_ENV !== "production" && Or(
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
function Qt(t) {
  return !!(t && t.__v_isShallow);
}
function Ku(t) {
  return t ? !!t.__v_raw : !1;
}
function he(t) {
  const i = t && t.__v_raw;
  return i ? he(i) : t;
}
const st = (t) => En(t) ? xa(t) : t, Po = (t) => En(t) ? Da(t) : t;
function Tr(t) {
  return t ? t.__v_isRef === !0 : !1;
}
function Tt(t) {
  return Yu(t, !1);
}
function Yu(t, i) {
  return Tr(t) ? t : new Zu(t, i);
}
class Zu {
  constructor(i, s) {
    this.dep = new ya(), this.__v_isRef = !0, this.__v_isShallow = !1, this._rawValue = s ? i : he(i), this._value = s ? i : st(i), this.__v_isShallow = s;
  }
  get value() {
    return Ve.NODE_ENV !== "production" ? this.dep.track({
      target: this,
      type: "get",
      key: "value"
    }) : this.dep.track(), this._value;
  }
  set value(i) {
    const s = this._rawValue, c = this.__v_isShallow || Qt(i) || Rr(i);
    i = c ? i : he(i), Sr(i, s) && (this._rawValue = i, this._value = c ? i : st(i), Ve.NODE_ENV !== "production" ? this.dep.trigger({
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
var ku = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, Ca = { exports: {} };
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
        return is;
      }), f.d(c, "destroy", function() {
        return as;
      }), f.d(c, "destroyComponents", function() {
        return xi;
      }), f.d(c, "destroyAll", function() {
        return Di;
      }), f.d(c, "PROP_TYPE", function() {
        return pe;
      }), f.d(c, "PROP_SERIALIZATION", function() {
        return cn;
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
      function te() {
        if (!M && _) {
          var e = _;
          _ = null, e.resolve();
        }
      }
      function Re() {
        M += 1;
      }
      function Qe() {
        M -= 1, te();
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
            return te(), o;
          }(e);
        }, e;
      }();
      function Rt(e) {
        return {}.toString.call(e) === "[object RegExp]";
      }
      var Nt = {
        IFRAME: "iframe",
        POPUP: "popup"
      }, gt = `Call was rejected by callee.\r
`;
      function me(e) {
        return e === void 0 && (e = window), e.location.protocol;
      }
      function nt(e) {
        if (e === void 0 && (e = window), e.mockDomain) {
          var r = e.mockDomain.split("//")[0];
          if (r) return r;
        }
        return me(e);
      }
      function Ct(e) {
        return e === void 0 && (e = window), nt(e) === "about:";
      }
      function Ke(e) {
        if (e === void 0 && (e = window), e) try {
          if (e.parent && e.parent !== e) return e.parent;
        } catch {
        }
      }
      function Te(e) {
        if (e === void 0 && (e = window), e && !Ke(e)) try {
          return e.opener;
        } catch {
        }
      }
      function re(e) {
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
        var n = me(e);
        if (!n) throw new Error("Can not read window protocol");
        if (n === "file:") return "file://";
        if (n === "about:") {
          var o = Ke(e);
          return o && re() ? ne(o) : "about://";
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
      function H(e) {
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
            if (Ct(r) && re()) return !0;
          } catch {
          }
          try {
            if (function(o) {
              return o === void 0 && (o = window), nt(o) === "mock:";
            }(r) && re()) return !0;
          } catch {
          }
          try {
            if (ne(r) === ne(window)) return !0;
          } catch {
          }
          return !1;
        }(e)) return !1;
        try {
          if (e === window || Ct(e) && re() || F(window) === F(e)) return !0;
        } catch {
        }
        return !1;
      }
      function ge(e) {
        if (!H(e)) throw new Error("Expected window to be same domain");
        return e;
      }
      function et(e, r) {
        if (!e || !r) return !1;
        var n = Ke(r);
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
      function tt(e) {
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
      function _e(e) {
        for (var r = [], n = 0, o = tt(e); n < o.length; n++) {
          var a = o[n];
          r.push(a);
          for (var u = 0, d = _e(a); u < d.length; u++) r.push(d[u]);
        }
        return r;
      }
      function Ye(e) {
        e === void 0 && (e = window);
        try {
          if (e.top) return e.top;
        } catch {
        }
        if (Ke(e) === e) return e;
        try {
          if (et(window, e) && window.top) return window.top;
        } catch {
        }
        try {
          if (et(e, window) && window.top) return window.top;
        } catch {
        }
        for (var r = 0, n = _e(e); r < n.length; r++) {
          var o = n[r];
          try {
            if (o.top) return o.top;
          } catch {
          }
          if (Ke(o) === o) return o;
        }
      }
      function Xt(e) {
        var r = Ye(e);
        if (!r) throw new Error("Can not determine top window");
        var n = [].concat(_e(r), [r]);
        return n.indexOf(e) === -1 && (n = [].concat(n, [e], _e(e))), n;
      }
      var dr = [], kt = [];
      function Se(e, r) {
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
          return !a || a.message !== gt;
        }
        if (r && H(e)) try {
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
          var o = kt[n];
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
      function xr(e) {
        return (e = e || window).navigator.mockUserAgent || e.navigator.userAgent;
      }
      function fr(e, r) {
        for (var n = tt(e), o = 0; o < n.length; o++) {
          var a = n[o];
          try {
            if (H(a) && a.name === r && n.indexOf(a) !== -1) return a;
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
      function Gr(e, r) {
        return e === Te(r);
      }
      function Lt(e) {
        return e === void 0 && (e = window), Te(e = e || window) || Ke(e) || void 0;
      }
      function Pn(e, r) {
        for (var n = 0; n < e.length; n++)
          for (var o = e[n], a = 0; a < r.length; a++) if (o === r[a]) return !0;
        return !1;
      }
      function Tn(e) {
        e === void 0 && (e = window);
        for (var r = 0, n = e; n; ) (n = Ke(n)) && (r += 1);
        return r;
      }
      function Jr(e, r) {
        var n = Ye(e) || e, o = Ye(r) || r;
        try {
          if (n && o) return n === o;
        } catch {
        }
        var a = Xt(e), u = Xt(r);
        if (Pn(a, u)) return !0;
        var d = Te(n), h = Te(o);
        return d && Pn(Xt(d), u) || h && Pn(Xt(h), a), !1;
      }
      function dt(e, r) {
        if (typeof e == "string") {
          if (typeof r == "string") return e === "*" || r === e;
          if (Rt(r) || Array.isArray(r)) return !1;
        }
        return Rt(e) ? Rt(r) ? e.toString() === r.toString() : !Array.isArray(r) && !!r.match(e) : !!Array.isArray(e) && (Array.isArray(r) ? JSON.stringify(e) === JSON.stringify(r) : !Rt(r) && e.some(function(n) {
          return dt(n, r);
        }));
      }
      function It(e) {
        return e.match(/^(https?|mock|file):\/\//) ? e.split("/").slice(0, 3).join("/") : F();
      }
      function To(e, r, n, o) {
        n === void 0 && (n = 1e3), o === void 0 && (o = 1 / 0);
        var a;
        return function u() {
          if (Se(e))
            return a && clearTimeout(a), r();
          o <= 0 ? clearTimeout(a) : (o -= n, a = setTimeout(u, n));
        }(), {
          cancel: function() {
            a && clearTimeout(a);
          }
        };
      }
      function er(e) {
        try {
          if (e === window) return !0;
        } catch (r) {
          if (r && r.message === gt) return !0;
        }
        try {
          if ({}.toString.call(e) === "[object Window]") return !0;
        } catch (r) {
          if (r && r.message === gt) return !0;
        }
        try {
          if (window.Window && e instanceof window.Window) return !0;
        } catch (r) {
          if (r && r.message === gt) return !0;
        }
        try {
          if (e && e.self === e) return !0;
        } catch (r) {
          if (r && r.message === gt) return !0;
        }
        try {
          if (e && e.parent === e) return !0;
        } catch (r) {
          if (r && r.message === gt) return !0;
        }
        try {
          if (e && e.top === e) return !0;
        } catch (r) {
          if (r && r.message === gt) return !0;
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
      function Oo(e) {
        if (H(e)) return ge(e).frameElement;
        for (var r = 0, n = document.querySelectorAll("iframe"); r < n.length; r++) {
          var o = n[r];
          if (o && o.contentWindow && o.contentWindow === e) return o;
        }
      }
      function Ro(e) {
        if (function(n) {
          return n === void 0 && (n = window), !!Ke(n);
        }(e)) {
          var r = Oo(e);
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
      function Kr(e, r) {
        for (var n = 0; n < e.length; n++) try {
          if (e[n] === r) return n;
        } catch {
        }
        return -1;
      }
      var Yr = function() {
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
            if (er(u) && Se(u)) {
              if (n) try {
                n.delete(u);
              } catch {
              }
              o.splice(a, 1), this.values.splice(a, 1), a -= 1;
            }
          }
        }, r.isSafeToReadWrite = function(n) {
          return !er(n);
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
          var h = this.keys, l = this.values, v = Kr(h, n);
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
          var u = Kr(this.keys, n);
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
          var u = this.keys, d = Kr(u, n);
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
          return this._cleanupClosedWindows(), Kr(this.keys, n) !== -1;
        }, r.getOrSet = function(n, o) {
          if (this.has(n)) return this.get(n);
          var a = o();
          return this.set(n, a), a;
        }, e;
      }();
      function So(e) {
        return (So = Object.setPrototypeOf ? Object.getPrototypeOf : function(r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        })(e);
      }
      function Aa() {
        if (typeof Reflect > "u" || !Reflect.construct || Reflect.construct.sham) return !1;
        if (typeof Proxy == "function") return !0;
        try {
          return Date.prototype.toString.call(Reflect.construct(Date, [], function() {
          })), !0;
        } catch {
          return !1;
        }
      }
      function xo(e, r, n) {
        return (xo = Aa() ? Reflect.construct : function(o, a, u) {
          var d = [null];
          d.push.apply(d, a);
          var h = new (Function.bind.apply(o, d))();
          return u && m(h, u.prototype), h;
        }).apply(null, arguments);
      }
      function Do(e) {
        var r = typeof Map == "function" ? /* @__PURE__ */ new Map() : void 0;
        return (Do = function(n) {
          if (n === null || (o = n, Function.toString.call(o).indexOf("[native code]") === -1)) return n;
          var o;
          if (typeof n != "function") throw new TypeError("Super expression must either be null or a function");
          if (r !== void 0) {
            if (r.has(n)) return r.get(n);
            r.set(n, a);
          }
          function a() {
            return xo(n, arguments, So(this).constructor);
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
      var Zr;
      function Nn(e) {
        try {
          return JSON.stringify([].slice.call(e), function(r, n) {
            return typeof n == "function" ? "memoize[" + function(o) {
              if (Zr = Zr || new Yr(), o == null || typeof o != "object" && typeof o != "function") throw new Error("Invalid object");
              var a = Zr.get(o);
              return a || (a = typeof o + ":" + Xe(), Zr.set(o, a)), a;
            }(n) + "]" : Rn(n) ? {} : n;
          });
        } catch {
          throw new Error("Arguments not serializable -- can not be used to memoize");
        }
      }
      function Wa() {
        return {};
      }
      var Dr = 0, No = 0;
      function jt(e, r) {
        r === void 0 && (r = {});
        var n = r.thisNamespace, o = n !== void 0 && n, a = r.time, u, d, h = Dr;
        Dr += 1;
        var l = function() {
          for (var v = arguments.length, E = new Array(v), w = 0; w < v; w++) E[w] = arguments[w];
          h < No && (u = null, d = null, h = Dr, Dr += 1);
          var p;
          p = o ? (d = d || new Yr()).getOrSet(this, Wa) : u = u || {};
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
      jt.clear = function() {
        No = Dr;
      };
      function _a(e) {
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
      function Qr(e) {
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
      function Xr(e) {
        return typeof e == "string" ? e : e && e.toString && typeof e.toString == "function" ? e.toString() : {}.toString.call(e);
      }
      function hr(e, r) {
        if (!r) return e;
        if (Object.assign) return Object.assign(e, r);
        for (var n in r) r.hasOwnProperty(n) && (e[n] = r[n]);
        return e;
      }
      jt(function(e) {
        if (Object.values) return Object.values(e);
        var r = [];
        for (var n in e) e.hasOwnProperty(n) && r.push(e[n]);
        return r;
      });
      function Ma(e) {
        return e;
      }
      function Nr(e, r) {
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
      function Co(e, r, n) {
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
      function Io(e) {
        return typeof (r = e) == "object" && r !== null && {}.toString.call(e) === "[object Object]";
        var r;
      }
      function An(e) {
        if (!Io(e)) return !1;
        var r = e.constructor;
        if (typeof r != "function") return !1;
        var n = r.prototype;
        return !!Io(n) && !!n.hasOwnProperty("isPrototypeOf");
      }
      function kr(e, r, n) {
        if (n === void 0 && (n = ""), Array.isArray(e)) {
          for (var o = e.length, a = [], u = function(E) {
            Co(a, E, function() {
              var w = n ? n + "." + E : "" + E, p = r(e[E], E, w);
              return (An(p) || Array.isArray(p)) && (p = kr(p, r, w)), p;
            });
          }, d = 0; d < o; d++) u(d);
          return a;
        }
        if (An(e)) {
          var h = {}, l = function(E) {
            if (!e.hasOwnProperty(E)) return 1;
            Co(h, E, function() {
              var w = n ? n + "." + E : "" + E, p = r(e[E], E, w);
              return (An(p) || Array.isArray(p)) && (p = kr(p, r, w)), p;
            });
          };
          for (var v in e) l(v);
          return h;
        }
        throw new Error("Pass an object or array");
      }
      function Ut(e) {
        return e != null;
      }
      function Wn(e) {
        return {}.toString.call(e) === "[object RegExp]";
      }
      function Cr(e, r, n) {
        if (e.hasOwnProperty(r)) return e[r];
        var o = n();
        return e[r] = o, o;
      }
      function en(e) {
        var r = [], n = !1, o, a = {
          set: function(u, d) {
            return n || (e[u] = d, a.register(function() {
              delete e[u];
            })), d;
          },
          register: function(u) {
            var d = Qr(function() {
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
      function tn(e, r) {
        if (r == null) throw new Error("Expected " + e + " to be present");
        return r;
      }
      var Fa = function(e) {
        P(r, e);
        function r(n) {
          var o;
          return (o = e.call(this, n) || this).name = o.constructor.name, typeof Error.captureStackTrace == "function" ? Error.captureStackTrace(function(a) {
            if (a === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return a;
          }(o), o.constructor) : o.stack = new Error(n).stack, o;
        }
        return r;
      }(Do(Error));
      function Ao() {
        var e = document.body;
        if (!e) throw new Error("Body element not found");
        return e;
      }
      function rn() {
        return !!document.body && document.readyState === "complete";
      }
      function Wo() {
        return !!document.body && document.readyState === "interactive";
      }
      function _o(e) {
        return encodeURIComponent(e);
      }
      jt(function() {
        return new R(function(e) {
          if (rn() || Wo()) return e();
          var r = setInterval(function() {
            if (rn() || Wo())
              return clearInterval(r), e();
          }, 10);
        });
      });
      function Mo(e) {
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
        }(Mo, 0, [e]);
      }
      function Fo(e, r) {
        return r === void 0 && (r = {}), r && Object.keys(r).length ? function(n) {
          return n === void 0 && (n = {}), Object.keys(n).filter(function(o) {
            return typeof n[o] == "string" || typeof n[o] == "boolean";
          }).map(function(o) {
            var a = n[o];
            if (typeof a != "string" && typeof a != "boolean") throw new TypeError("Invalid type for query");
            return _o(o) + "=" + _o(a.toString());
          }).join("&");
        }(T({}, Mo(e), r)) : e;
      }
      function za(e, r) {
        e.appendChild(r);
      }
      function _n(e, r) {
        return r === void 0 && (r = document), Rn(e) ? e : typeof e == "string" ? r.querySelector(e) : void 0;
      }
      function zo(e) {
        return new R(function(r, n) {
          var o = Xr(e), a = _n(e);
          if (a) return r(a);
          if (rn()) return n(new Error("Document is ready and element " + o + " does not exist"));
          var u = setInterval(function() {
            if (a = _n(e))
              r(a), clearInterval(u);
            else if (rn())
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
      }(Fa), nn;
      function Lo(e) {
        if ((nn = nn || new Yr()).has(e)) {
          var r = nn.get(e);
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
                  h && (kt.splice(d, 1), dr.splice(d, 1));
                }
              }(), u && u.contentWindow) try {
                dr.push(u.contentWindow), kt.push(u);
              } catch {
              }
            })(e), o(e);
          }), e.addEventListener("error", function(u) {
            e.contentWindow ? o(e) : a(u);
          });
        });
        return nn.set(e, n), n;
      }
      function Fn(e) {
        return Lo(e).then(function(r) {
          if (!r.contentWindow) throw new Error("Could not find window in iframe");
          return r.contentWindow;
        });
      }
      function jo(e, r) {
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
        return o.hasAttribute("id") || o.setAttribute("id", Xe()), Lo(o), (e.url || a) && o.setAttribute("src", e.url || "about:blank"), o;
      }
      function Uo(e, r, n) {
        return e.addEventListener(r, n), {
          cancel: function() {
            e.removeEventListener(r, n);
          }
        };
      }
      function La(e) {
        e.style.setProperty("display", "");
      }
      function Bo(e) {
        e.style.setProperty("display", "none", "important");
      }
      function Ir(e) {
        e && e.parentNode && e.parentNode.removeChild(e);
      }
      function pr(e) {
        return !(e && e.parentNode && e.ownerDocument && e.ownerDocument.documentElement && e.ownerDocument.documentElement.contains(e));
      }
      function $o(e, r, n) {
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
        return w.addEventListener("resize", O), w.ResizeObserver !== void 0 ? ((S = new w.ResizeObserver(O)).observe(e), I = Nr(O, 10 * v)) : w.MutationObserver !== void 0 ? ((S = new w.MutationObserver(O)).observe(e, {
          attributes: !0,
          childList: !0,
          subtree: !0,
          characterData: !1
        }), I = Nr(O, 10 * v)) : I = Nr(O, v), {
          cancel: function() {
            b = !0, S.disconnect(), window.removeEventListener("resize", O), I.cancel();
          }
        };
      }
      function zn(e) {
        for (; e.parentNode; ) e = e.parentNode;
        return e.toString() === "[object ShadowRoot]";
      }
      var on = typeof document < "u" ? document.currentScript : null, ja = jt(function() {
        if (on || (on = function() {
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
        }())) return on;
        throw new Error("Can not determine current script");
      }), Ua = Xe();
      jt(function() {
        var e;
        try {
          e = ja();
        } catch {
          return Ua;
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
      function qo(e) {
        return typeof e == "string" && /^[0-9]+%$/.test(e);
      }
      function Ln(e) {
        if (typeof e == "number") return e;
        var r = e.match(/^([0-9]+)(px|%)$/);
        if (!r) throw new Error("Could not match css value from " + e);
        return parseInt(r[1], 10);
      }
      function Ho(e) {
        return Ln(e) + "px";
      }
      function Vo(e) {
        return typeof e == "number" ? Ho(e) : qo(e) ? e : Ho(e);
      }
      function Jo(e, r) {
        if (typeof e == "number") return e;
        if (qo(e)) return parseInt(r * Ln(e) / 100, 10);
        if (typeof (n = e) == "string" && /^[0-9]+px$/.test(n)) return Ln(e);
        var n;
        throw new Error("Can not normalize dimension: " + e);
      }
      function St(e) {
        e === void 0 && (e = window);
        var r = "__post_robot_11_0_0__";
        return e !== window ? e[r] : e[r] = e[r] || {};
      }
      var Ko = function() {
        return {};
      };
      function de(e, r) {
        return e === void 0 && (e = "store"), r === void 0 && (r = Ko), Cr(St(), e, function() {
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
              return Cr(n, o, a);
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
      function an() {
        var e = St();
        return e.WINDOW_WILDCARD = e.WINDOW_WILDCARD || new Ba(), e.WINDOW_WILDCARD;
      }
      function Ze(e, r) {
        return e === void 0 && (e = "store"), r === void 0 && (r = Ko), de("windowStore").getOrSet(e, function() {
          var n = new Yr(), o = function(a) {
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
              return Cr(o(a), e, u);
            }
          };
        });
      }
      function Yo() {
        return de("instance").getOrSet("instanceID", Xe);
      }
      function Zo(e, r) {
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
          instanceID: Yo()
        }, {
          domain: "*",
          timeout: -1
        }).then(function(n) {
          var o = n.origin, a = n.data.instanceID;
          return Zo(e, {
            domain: o
          }), {
            win: e,
            domain: o,
            instanceID: a
          };
        });
      }
      function Qo(e, r) {
        var n = r.send;
        return Ze("windowInstanceIDPromises").getOrSet(e, function() {
          return jn(e, {
            send: n
          }).then(function(o) {
            return o.instanceID;
          });
        });
      }
      function Xo(e, r, n) {
        r === void 0 && (r = 5e3), n === void 0 && (n = "Window");
        var o = function(a) {
          return Ze("helloPromises").getOrSet(a, function() {
            return new R();
          });
        }(e);
        return r !== -1 && (o = o.timeout(r, new Error(n + " did not load after " + r + "ms"))), o;
      }
      function ko(e) {
        Ze("knownWindows").set(e, !0);
      }
      function Un(e) {
        return typeof e == "object" && e !== null && typeof e.__type__ == "string";
      }
      function ei(e) {
        return e === void 0 ? "undefined" : e === null ? "null" : Array.isArray(e) ? "array" : typeof e == "function" ? "function" : typeof e == "object" ? e instanceof Error ? "error" : typeof e.then == "function" ? "promise" : {}.toString.call(e) === "[object RegExp]" ? "regex" : {}.toString.call(e) === "[object Date]" ? "date" : "object" : typeof e == "string" ? "string" : typeof e == "number" ? "number" : typeof e == "boolean" ? "boolean" : void 0;
      }
      function tr(e, r) {
        return {
          __type__: e,
          __val__: r
        };
      }
      var ft, $a = ((ft = {}).function = function() {
      }, ft.error = function(e) {
        return tr("error", {
          message: e.message,
          stack: e.stack,
          code: e.code,
          data: e.data
        });
      }, ft.promise = function() {
      }, ft.regex = function(e) {
        return tr("regex", e.source);
      }, ft.date = function(e) {
        return tr("date", e.toJSON());
      }, ft.array = function(e) {
        return e;
      }, ft.object = function(e) {
        return e;
      }, ft.string = function(e) {
        return e;
      }, ft.number = function(e) {
        return e;
      }, ft.boolean = function(e) {
        return e;
      }, ft.null = function(e) {
        return e;
      }, ft[void 0] = function(e) {
        return tr("undefined", e);
      }, ft), qa = {}, lt, Ha = ((lt = {}).function = function() {
        throw new Error("Function serialization is not implemented; nothing to deserialize");
      }, lt.error = function(e) {
        var r = e.stack, n = e.code, o = e.data, a = new Error(e.message);
        return a.code = n, o && (a.data = o), a.stack = r + `

` + a.stack, a;
      }, lt.promise = function() {
        throw new Error("Promise serialization is not implemented; nothing to deserialize");
      }, lt.regex = function(e) {
        return new RegExp(e);
      }, lt.date = function(e) {
        return new Date(e);
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
      }, lt[void 0] = function() {
      }, lt), Va = {};
      function Bn() {
        return !!xr(window).match(/MSIE|trident|edge\/12|edge\/13/i);
      }
      function ti(e) {
        return !Jr(window, e);
      }
      function ri(e, r) {
        if (e) {
          if (F() !== It(e)) return !0;
        } else if (r && !H(r)) return !0;
        return !1;
      }
      function ni(e) {
        var r = e.win, n = e.domain;
        return !(!Bn() || n && !ri(n, r) || r && !ti(r));
      }
      function $n(e) {
        return "__postrobot_bridge___" + (e = e || It(e)).replace(/[^a-zA-Z0-9]+/g, "_");
      }
      function oi() {
        return !!(window.name && window.name === $n(F()));
      }
      var Ga = new R(function(e) {
        if (window.document && window.document.body) return e(window.document.body);
        var r = setInterval(function() {
          if (window.document && window.document.body)
            return clearInterval(r), e(window.document.body);
        }, 10);
      });
      function ii(e) {
        Ze("remoteWindowPromises").getOrSet(e, function() {
          return new R();
        });
      }
      function qn(e) {
        var r = Ze("remoteWindowPromises").get(e);
        if (!r) throw new Error("Remote window promise not found");
        return r;
      }
      function ai(e, r, n) {
        qn(e).resolve(function(o, a, u) {
          if (o !== e) throw new Error("Remote window does not match window");
          if (!dt(a, r)) throw new Error("Remote domain " + a + " does not match domain " + r);
          n.fireAndForget(u);
        });
      }
      function Hn(e, r) {
        qn(e).reject(r).catch(ye);
      }
      function sn(e) {
        for (var r = e.win, n = e.name, o = e.domain, a = de("popupWindowsByName"), u = Ze("popupWindowsByWin"), d = 0, h = a.keys(); d < h.length; d++) {
          var l = h[d], v = a.get(l);
          v && !Se(v.win) || a.del(l);
        }
        if (Se(r)) return {
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
        return n && (E.name = n, a.set(n, E)), o && (E.domain = o, ii(r)), u.set(r, E), E;
      }
      function si(e) {
        var r = e.on, n = e.send, o = e.receiveMessage;
        a = window.open, window.open = function(u, d, h, l) {
          var v = a.call(this, On(u), d, h, l);
          return v && (sn({
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
              return ai(S().win, p, y.sendMessage), {
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
          St(window).openTunnelToParent = function(h) {
            var l = h.name, v = h.source, E = h.canary, w = h.sendMessage, p = de("tunnelWindows"), y = Ke(window);
            if (!y) throw new Error("No parent window found to open tunnel to");
            var b = function(O) {
              var S = O.name, I = O.source, z = O.canary, V = O.sendMessage;
              (function() {
                for (var $ = de("tunnelWindows"), L = 0, Q = $.keys(); L < Q.length; L++) {
                  var B = Q[L];
                  Se($[B].source) && $.del(B);
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
                if (O && O.source && !Se(O.source)) {
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
            if (v && ni({
              win: v
            })) {
              return ii(v), (E = v, Ze("remoteBridgeAwaiters").getOrSet(E, function() {
                return R.try(function() {
                  var w = fr(E, $n(F()));
                  if (w) return H(w) && St(ge(w)) ? w : new R(function(p) {
                    var y, b;
                    y = setInterval(function() {
                      if (w && H(w) && St(ge(w)))
                        return clearInterval(y), clearTimeout(b), p(w);
                    }, 100), b = setTimeout(function() {
                      return clearInterval(y), p();
                    }, 2e3);
                  });
                });
              })).then(function(w) {
                return w ? window.name ? St(ge(w)).openTunnelToParent({
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
                  ai(y, b, O.sendMessage);
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
      function ui(e, r) {
        var n = r.send, o = r.id, a = o === void 0 ? Xe() : o, u = e.then(function(l) {
          if (H(l)) return ge(l).name;
        }), d = e.then(function(l) {
          if (Se(l)) throw new Error("Window is closed, can not determine type");
          return Te(l) ? Nt.POPUP : Nt.IFRAME;
        });
        u.catch(ye), d.catch(ye);
        var h = function() {
          return e.then(function(l) {
            if (!Se(l)) return H(l) ? ge(l).name : u;
          });
        };
        return {
          id: a,
          getType: function() {
            return d;
          },
          getInstanceID: _a(function() {
            return e.then(function(l) {
              return Qo(l, {
                send: n
              });
            });
          }),
          close: function() {
            return e.then(Ro);
          },
          getName: h,
          focus: function() {
            return e.then(function(l) {
              l.focus();
            });
          },
          isClosed: function() {
            return e.then(function(l) {
              return Se(l);
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
                  var I = S.url, z = S.target, V = S.body, A = S.method, $ = A === void 0 ? "post" : A, L = document.createElement("form");
                  if (L.setAttribute("target", z), L.setAttribute("method", $), L.setAttribute("action", I), L.style.display = "none", V) for (var Q = 0, B = Object.keys(V); Q < B.length; Q++) {
                    var ue, oe = B[Q], J = document.createElement("input");
                    J.setAttribute("name", oe), J.setAttribute("value", (ue = V[oe]) == null ? void 0 : ue.toString()), L.appendChild(J);
                  }
                  Ao().appendChild(L), L.submit(), Ao().removeChild(L);
                })({
                  url: l,
                  target: O,
                  method: y,
                  body: b
                });
              });
              if (y !== "get") throw new Error("Unsupported method: " + y);
              if (H(E)) try {
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
              sn({
                win: v,
                name: l
              });
              var E = H(v), w = Oo(v);
              if (!E) throw new Error("Can not set name for cross-domain window: " + l);
              ge(v).name = l, w && w.setAttribute("name", l), u = R.resolve(l);
            });
          }
        };
      }
      var ht = function() {
        function e(n) {
          var o = n.send, a = n.win, u = n.serializedWindow;
          this.id = void 0, this.isProxyWindow = !0, this.serializedWindow = void 0, this.actualWindow = void 0, this.actualWindowPromise = void 0, this.send = void 0, this.name = void 0, this.actualWindowPromise = new R(), this.serializedWindow = u || ui(this.actualWindowPromise, {
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
            return n === Nt.POPUP;
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
          this.actualWindow = n, this.actualWindowPromise.resolve(this.actualWindow), this.serializedWindow = ui(this.actualWindowPromise, {
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
              knownWindowInstanceID: Qo(n, {
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
          return !!(this.actualWindow && Se(this.actualWindow));
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
          return !!(n && !er(n) && n.isProxyWindow);
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
        ht.isProxyWindow(o) ? d.set(e, {
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
      function ci(e, r) {
        var n = Ze("methodStore"), o = de("proxyWindowMethods");
        return n.getOrSet(e, function() {
          return {};
        })[r] || o.get(r);
      }
      function di(e, r, n, o, a) {
        d = (u = {
          on: a.on,
          send: a.send
        }).on, h = u.send, de("builtinListeners").getOrSet("functionCalls", function() {
          return d("postrobot_method", {
            domain: "*"
          }, function(E) {
            var w = E.source, p = E.origin, y = E.data, b = y.id, O = y.name, S = ci(w, b);
            if (!S) throw new Error("Could not find method '" + O + "' with id: " + y.id + " in " + F(window));
            var I = S.source, z = S.domain, V = S.val;
            return R.try(function() {
              if (!dt(z, p)) throw new Error("Method '" + y.name + "' domain " + JSON.stringify(Wn(S.domain) ? S.domain.source : S.domain) + " does not match origin " + p + " in " + F(window));
              if (ht.isProxyWindow(I)) return I.matchWindow(w, {
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
                throw A.stack && (A.stack = "Remote call to " + O + "(" + function($) {
                  return $ === void 0 && ($ = []), In($).map(function(L) {
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
        e = ht.unwrap(e);
        var v = n.__name__ || n.name || o;
        return typeof v == "string" && typeof v.indexOf == "function" && v.indexOf("anonymous::") === 0 && (v = v.replace("anonymous::", o + "::")), ht.isProxyWindow(e) ? (Gn(l, n, v, e, r), e.awaitWindow().then(function(E) {
          Gn(l, n, v, E, r);
        })) : Gn(l, n, v, e, r), tr("cross_domain_function", {
          id: l,
          name: v
        });
      }
      function fi(e, r, n, o) {
        var a, u = o.on, d = o.send;
        return function(h, l) {
          l === void 0 && (l = qa);
          var v = JSON.stringify(h, function(E) {
            var w = this[E];
            if (Un(this)) return w;
            var p = ei(w);
            if (!p) return w;
            var y = l[p] || $a[p];
            return y ? y(w, E) : w;
          });
          return v === void 0 ? "undefined" : v;
        }(n, ((a = {}).promise = function(h, l) {
          return function(v, E, w, p, y) {
            return tr("cross_domain_zalgo_promise", {
              then: di(v, E, function(b, O) {
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
          return di(e, r, h, l, {
            on: u,
            send: d
          });
        }, a.object = function(h) {
          return er(h) || ht.isProxyWindow(h) ? tr("cross_domain_window", ht.serialize(h, {
            send: d
          })) : h;
        }, a));
      }
      function li(e, r, n, o) {
        var a, u = o.send;
        return function(d, h) {
          if (h === void 0 && (h = Va), d !== "undefined") return JSON.parse(d, function(l, v) {
            if (Un(this)) return v;
            var E, w;
            if (Un(v) ? (E = v.__type__, w = v.__val__) : (E = ei(v), w = v), !E) return w;
            var p = h[E] || Ha[E];
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
                return ht.toProxyWindow(h, {
                  send: y
                }).awaitWindow().then(function(V) {
                  var A = ci(V, w);
                  if (A && A.val !== I) return A.val.apply({
                    source: window,
                    origin: F()
                  }, z);
                  var $ = [].slice.call(z);
                  return S.fireAndForget ? y(V, "postrobot_method", {
                    id: w,
                    name: p,
                    args: $
                  }, {
                    domain: l,
                    fireAndForget: !0
                  }) : y(V, "postrobot_method", {
                    id: w,
                    name: p,
                    args: $
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
          return ht.deserialize(d, {
            send: u
          });
        }, a));
      }
      var Ar = {};
      Ar.postrobot_post_message = function(e, r, n) {
        n.indexOf("file:") === 0 && (n = "*"), e.postMessage(r, n);
      }, Ar.postrobot_bridge = function(e, r, n) {
        if (!Bn() && !oi()) throw new Error("Bridge not needed for browser");
        if (H(e)) throw new Error("Post message through bridge disabled between same domain windows");
        if (Jr(window, e) !== !1) throw new Error("Can only use bridge to communicate between two different windows, not between frames");
        (function(o, a, u) {
          var d = Gr(window, o), h = Gr(o, window);
          if (!d && !h) throw new Error("Can only send messages to and from parent and popup windows");
          qn(o).then(function(l) {
            return l(o, a, u);
          });
        })(e, n, r);
      }, Ar.postrobot_global = function(e, r) {
        if (!xr(window).match(/MSIE|rv:11|trident|edge\/12|edge\/13/i)) throw new Error("Global messaging not needed for browser");
        if (!H(e)) throw new Error("Post message through global disabled between different domain windows");
        if (Jr(window, e) !== !1) throw new Error("Can only use global to communicate between two different windows, not between frames");
        var n = St(e);
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
            if (Se(e)) throw new Error("Window is closed");
            var h = fi(e, r, ((l = {}).__post_robot_11_0_0__ = d.buffer || [], l), {
              on: a,
              send: u
            }), l;
            delete d.buffer;
            for (var v = Object.keys(Ar), E = [], w = 0; w < v.length; w++) {
              var p = v[w];
              try {
                Ar[p](e, h, r);
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
      function hi(e) {
        return de("responseListeners").get(e);
      }
      function pi(e) {
        de("responseListeners").del(e);
      }
      function vi(e) {
        return de("erroredResponseListeners").has(e);
      }
      function wi(e) {
        var r = e.name, n = e.win, o = e.domain, a = Ze("requestListeners");
        if (n === "*" && (n = null), o === "*" && (o = null), !r) throw new Error("Name required to get request listener");
        for (var u = 0, d = [n, an()]; u < d.length; u++) {
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
                    if (dt(p.regex, o)) return y;
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
            I = li(p, y, w, {
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
          ko(u);
          for (var l, v = function() {
            var w = h[E];
            if (a.has(w.id)) return {
              v: void 0
            };
            if (a.set(w.id, !0), Se(u) && !w.fireAndForget) return {
              v: void 0
            };
            w.origin.indexOf("file:") === 0 && (d = "file://");
            try {
              w.type === "postrobot_message_request" ? function(p, y, b, O) {
                var S = O.on, I = O.send, z = wi({
                  name: b.name,
                  win: p,
                  domain: y
                }), V = b.name === "postrobot_method" && b.data && typeof b.data.name == "string" ? b.data.name + "()" : b.name;
                function A($, L, Q) {
                  return R.flush().then(function() {
                    if (!b.fireAndForget && !Se(p)) try {
                      return Jn(p, y, {
                        id: Xe(),
                        origin: F(window),
                        type: "postrobot_message_response",
                        hash: b.hash,
                        name: b.name,
                        ack: $,
                        data: L,
                        error: Q
                      }, {
                        on: S,
                        send: I
                      });
                    } catch (B) {
                      throw new Error("Send response message failed for " + V + " in " + F() + `

` + lr(B));
                    }
                  });
                }
                R.all([R.flush().then(function() {
                  if (!b.fireAndForget && !Se(p)) try {
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
                  } catch ($) {
                    throw new Error("Send ack message failed for " + V + " in " + F() + `

` + lr($));
                  }
                }), R.try(function() {
                  if (!z) throw new Error("No handler found for post message: " + b.name + " from " + y + " in " + window.location.protocol + "//" + window.location.host + window.location.pathname);
                  return z.handler({
                    source: p,
                    origin: y,
                    data: b.data
                  });
                }).then(function($) {
                  return A("success", $);
                }, function($) {
                  return A("error", null, $);
                })]).then(ye).catch(function($) {
                  if (z && z.handleError) return z.handleError($);
                  throw $;
                });
              }(u, d, w, {
                on: n,
                send: o
              }) : w.type === "postrobot_message_response" ? function(p, y, b) {
                if (!vi(b.hash)) {
                  var O = hi(b.hash);
                  if (!O) throw new Error("No handler found for post message response for message: " + b.name + " from " + y + " in " + window.location.protocol + "//" + window.location.host + window.location.pathname);
                  if (!dt(O.domain, y)) throw new Error("Response origin " + y + " does not match domain " + (S = O.domain, Array.isArray(S) ? "(" + S.join(" | ") + ")" : Rt(S) ? "RegExp(" + S.toString() + ")" : S.toString()));
                  var S;
                  if (p !== O.win) throw new Error("Response source does not match registered window");
                  pi(b.hash), b.ack === "error" ? O.promise.reject(b.error) : b.ack === "success" && O.promise.resolve({
                    source: p,
                    origin: y,
                    data: b.data
                  });
                }
              }(u, d, w) : w.type === "postrobot_message_ack" && function(p, y, b) {
                if (!vi(b.hash)) {
                  var O = hi(b.hash);
                  if (!O) throw new Error("No handler found for post message ack for message: " + b.name + " from " + y + " in " + window.location.protocol + "//" + window.location.host + window.location.pathname);
                  try {
                    if (!dt(O.domain, y)) throw new Error("Ack origin " + y + " does not match domain " + O.domain.toString());
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
          if (l && l !== "*" && ht.isProxyWindow(l)) {
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
          var V = wi({
            name: h,
            win: p,
            domain: v
          });
          p && p !== "*" || (p = an());
          var A = (v = v || "*").toString();
          if (V) throw p && v ? new Error("Request listener already exists for " + h + " on domain " + v.toString() + " for " + (p === an() ? "wildcard" : "specified") + " window") : p ? new Error("Request listener already exists for " + h + " for " + (p === an() ? "wildcard" : "specified") + " window") : v ? new Error("Request listener already exists for " + h + " on domain " + v.toString()) : new Error("Request listener already exists for " + h);
          var $ = E.getOrSet(p, function() {
            return {};
          }), L = Cr($, h, function() {
            return {};
          }), Q, B;
          return Wn(v) ? (Q = Cr(L, "__domain_regex__", function() {
            return [];
          })).push(B = {
            regex: v,
            listener: d
          }) : L[A] = d, {
            cancel: function() {
              delete L[A], B && (Q.splice(Q.indexOf(B, 1)), Q.length || delete L.__domain_regex__), Object.keys(L).length || delete $[h], p && !Object.keys($).length && E.del(p);
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
      var Et = function e(r, n, o, a) {
        var u = (a = a || {}).domain || "*", d = a.timeout || -1, h = a.timeout || 5e3, l = a.fireAndForget || !1;
        return ht.toProxyWindow(r, {
          send: e
        }).awaitWindow().then(function(v) {
          return R.try(function() {
            if (function(E, w, p) {
              if (!E) throw new Error("Expected name");
              if (p && typeof p != "string" && !Array.isArray(p) && !Wn(p)) throw new TypeError("Can not send " + E + ". Expected domain " + JSON.stringify(p) + " to be a string, array, or regex");
              if (Se(w)) throw new Error("Can not send " + E + ". Target window is closed");
            }(n, v, u), function(E, w) {
              var p = Lt(w);
              if (p) return p === E;
              if (w === E || Ye(w) === w) return !1;
              for (var y = 0, b = tt(E); y < b.length; y++) if (b[y] === w) return !0;
              return !1;
            }(window, v)) return Xo(v, h);
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
                  if (!dt(p, p)) throw new Error("Domain " + Xr(p) + " does not match " + Xr(p));
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
                })(b), pi(b);
              });
              var I = function(L) {
                return Ze("knownWindows").get(L, !1);
              }(v) ? 1e4 : 2e3, z = d, V = I, A = z, $ = Nr(function() {
                return Se(v) ? y.reject(new Error("Window closed for " + n + " before " + (O.ack ? "response" : "ack"))) : O.cancelled ? y.reject(new Error("Response listener was cancelled for " + n)) : (V = Math.max(V - 500, 0), A !== -1 && (A = Math.max(A - 500, 0)), O.ack || V !== 0 ? A === 0 ? y.reject(new Error("No response for postMessage " + p + " in " + F() + " in " + z + "ms")) : void 0 : y.reject(new Error("No ack for postMessage " + p + " in " + F() + " in " + I + "ms")));
              }, 500);
              y.finally(function() {
                $.cancel(), S.splice(S.indexOf(y, 1));
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
      function Wr(e) {
        return ht.toProxyWindow(e, {
          send: Et
        });
      }
      function mi(e) {
        for (var r = 0, n = Ze("requestPromises").get(e, []); r < n.length; r++) n[r].reject(new Error("Window " + (Se(e) ? "closed" : "cleaned up") + " before response")).catch(ye);
      }
      var Bt;
      Bt = {
        setupBridge: si,
        openBridge: function(e, r) {
          var n = de("bridges"), o = de("bridgeFrames");
          return r = r || It(e), n.getOrSet(r, function() {
            return R.try(function() {
              if (F() === r) throw new Error("Can not open bridge on the same domain as current domain: " + r);
              var a = $n(r);
              if (fr(window, a)) throw new Error("Frame with name " + a + " already exists on page");
              var u = function(d, h) {
                var l = document.createElement("iframe");
                return l.setAttribute("name", d), l.setAttribute("id", d), l.setAttribute("style", "display: none; margin: 0; padding: 0; border: 0px none; overflow: hidden;"), l.setAttribute("frameborder", "0"), l.setAttribute("border", "0"), l.setAttribute("scrolling", "no"), l.setAttribute("allowTransparency", "true"), l.setAttribute("tabindex", "-1"), l.setAttribute("hidden", "true"), l.setAttribute("title", ""), l.setAttribute("role", "presentation"), l.src = h, l;
              }(a, e);
              return o.set(r, u), Ga.then(function(d) {
                d.appendChild(u);
                var h = u.contentWindow;
                return new R(function(l, v) {
                  u.addEventListener("load", l), u.addEventListener("error", v);
                }).then(function() {
                  return Xo(h, 5e3, "Bridge " + e);
                }).then(function() {
                  return h;
                });
              });
            });
          });
        },
        linkWindow: sn,
        linkUrl: function(e, r) {
          sn({
            win: e,
            domain: It(r)
          });
        },
        isBridge: oi,
        needsBridge: ni,
        needsBridgeForBrowser: Bn,
        hasBridge: function(e, r) {
          return de("bridges").has(r || It(e));
        },
        needsBridgeForWin: ti,
        needsBridgeForDomain: ri,
        destroyBridges: function() {
          for (var e = de("bridges"), r = de("bridgeFrames"), n = 0, o = r.keys(); n < o.length; n++) {
            var a = r.get(o[n]);
            a && a.parentNode && a.parentNode.removeChild(a);
          }
          r.reset(), e.reset();
        }
      };
      function _r(e) {
        if (!H(e)) throw new Error("Can not get global for window on different domain");
        return e.__zoid_10_3_3__ || (e.__zoid_10_3_3__ = {}), e.__zoid_10_3_3__;
      }
      function gi(e, r) {
        try {
          return r(_r(e));
        } catch {
        }
      }
      function un(e) {
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
      function Ja(e) {
        return Dn(JSON.stringify(e));
      }
      function Yn(e) {
        var r = _r(e);
        return r.references = r.references || {}, r.references;
      }
      function yi(e) {
        var r = e.data, n = e.metaData, o = e.sender, a = e.receiver, u = e.passByReference, d = u !== void 0 && u, h = e.basic, l = h !== void 0 && h, v = Wr(a.win), E = l ? JSON.stringify(r) : fi(v, a.domain, r, {
          on: At,
          send: Et
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
          serializedData: Ja({
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
      function Ei(e) {
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
            return li(E, w, p, {
              on: At,
              send: Et
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
      }, cn = {
        JSON: "json",
        DOTIFY: "dotify",
        BASE64: "base64"
      }, xe = Nt, Ee = {
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
      function bi(e) {
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
      var Ka = jt(function(e) {
        var r = Ei({
          data: Zn(e).serializedInitialPayload,
          sender: {
            win: function(n) {
              return function(o) {
                if (o.type === "opener") return tn("opener", Te(window));
                if (o.type === "parent" && typeof o.distance == "number") return tn("parent", function(w, p) {
                  return p === void 0 && (p = 1), function(y, b) {
                    b === void 0 && (b = 1);
                    for (var O = y, S = 0; S < b; S++) {
                      if (!O) return;
                      O = Ke(O);
                    }
                    return O;
                  }(w, Tn(w) - p);
                }(window, o.distance));
                if (o.type === "global" && o.uid && typeof o.uid == "string") {
                  var a = o.uid, u = Lt(window);
                  if (!u) throw new Error("Can not find ancestor window");
                  for (var d = 0, h = Xt(u); d < h.length; d++) {
                    var l = h[d];
                    if (H(l)) {
                      var v = gi(l, function(w) {
                        return w.windows && w.windows[a];
                      });
                      if (v) return v;
                    }
                  }
                } else if (o.type === "name") {
                  var E = o.name;
                  return tn("namedWindow", function(w, p) {
                    return fr(w, p) || function y(b, O) {
                      var S = fr(b, O);
                      if (S) return S;
                      for (var I = 0, z = tt(b); I < z.length; I++) {
                        var V = y(z[I], O);
                        if (V) return V;
                      }
                    }(Ye(w) || w, p);
                  }(tn("ancestor", Lt(window)), E));
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
      function Pi() {
        return Ka(window.name);
      }
      function Ya(e, r) {
        if (r === void 0 && (r = window), e === Ke(r)) return {
          type: "parent",
          distance: Tn(e)
        };
        if (e === Te(r)) return {
          type: "opener"
        };
        if (H(e) && (o = e, o !== Ye(o))) {
          var n = ge(e).name;
          if (n) return {
            type: "name",
            name: n
          };
        }
        var o;
      }
      function Ti(e, r, n, o, a) {
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
      function Za() {
        return R.try(function() {
          window.focus();
        });
      }
      function Oi() {
        return R.try(function() {
          window.close();
        });
      }
      var Wt = function() {
        return ye;
      }, rr = function(e) {
        return Qr(e.value);
      };
      function Qn(e, r, n) {
        for (var o = 0, a = Object.keys(T({}, e, r)); o < a.length; o++) {
          var u = a[o];
          n(u, r[u], e[u]);
        }
      }
      function Ri(e, r, n) {
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
                      return typeof z == "function" && Ut(b) ? z({
                        value: b
                      }) : b;
                    })
                  }).then(function(V) {
                    var A = V.finalParam, $ = V.finalValue, L;
                    if (typeof $ == "boolean") L = $.toString();
                    else if (typeof $ == "string") L = $.toString();
                    else if (typeof $ == "object" && $ !== null) {
                      if (y.serialization === cn.JSON) L = JSON.stringify($);
                      else if (y.serialization === cn.BASE64) L = Dn(JSON.stringify($));
                      else if (y.serialization === cn.DOTIFY || !y.serialization) {
                        L = function oe(J, q, se) {
                          q === void 0 && (q = ""), se === void 0 && (se = {}), q = q && q + ".";
                          for (var X in J) J.hasOwnProperty(X) && J[X] != null && typeof J[X] != "function" && (J[X] && Array.isArray(J[X]) && J[X].length && J[X].every(function(De) {
                            return typeof De != "object";
                          }) ? se["" + q + X + "[]"] = J[X].join(",") : J[X] && typeof J[X] == "object" ? se = oe(J[X], "" + q + X, se) : se["" + q + X] = J[X].toString());
                          return se;
                        }($, p);
                        for (var Q = 0, B = Object.keys(L); Q < B.length; Q++) {
                          var ue = B[Q];
                          o[ue] = L[ue];
                        }
                        return;
                      }
                    } else typeof $ == "number" && (L = $.toString());
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
      function Si(e) {
        var r = e.uid, n = e.options, o = e.overrides, a = o === void 0 ? {} : o, u = e.parentWin, d = u === void 0 ? window : u, h = n.propsDef, l = n.containerTemplate, v = n.prerenderTemplate, E = n.tag, w = n.name, p = n.attributes, y = n.dimensions, b = n.autoResize, O = n.url, S = n.domain, I = n.exports, z = new R(), V = [], A = en(), $ = {}, L = {}, Q = {
          visible: !0
        }, B = a.event ? a.event : (ue = {}, oe = {}, J = {
          on: function(x, N) {
            var U = oe[x] = oe[x] || [];
            U.push(N);
            var j = !1;
            return {
              cancel: function() {
                j || (j = !0, U.splice(U.indexOf(N), 1));
              }
            };
          },
          once: function(x, N) {
            var U = J.on(x, function() {
              U.cancel(), N();
            });
            return U;
          },
          trigger: function(x) {
            for (var N = arguments.length, U = new Array(N > 1 ? N - 1 : 0), j = 1; j < N; j++) U[j - 1] = arguments[j];
            var ee = oe[x], K = [];
            if (ee)
              for (var ve = function() {
                var Ue = ee[we];
                K.push(R.try(function() {
                  return Ue.apply(void 0, U);
                }));
              }, we = 0; we < ee.length; we++) ve();
            return R.all(K).then(ye);
          },
          triggerOnce: function(x) {
            if (ue[x]) return R.resolve();
            ue[x] = !0;
            for (var N = arguments.length, U = new Array(N > 1 ? N - 1 : 0), j = 1; j < N; j++) U[j - 1] = arguments[j];
            return J.trigger.apply(J, [x].concat(U));
          },
          reset: function() {
            oe = {};
          }
        }), ue, oe, J, q = a.props ? a.props : {}, se, X, De, xt, pt, $t = !1, qt = a.onError, _t = a.getProxyContainer, Ht = a.show, Vt = a.hide, nr = a.close, Gt = a.renderContainer, bt = a.getProxyWindow, or = a.setProxyWin, Jt = a.openFrame, Kt = a.openPrerenderFrame, ir = a.prerender, ar = a.open, ie = a.openPrerender, vt = a.watchForUnload, ae = a.getInternalState, Le = a.setInternalState, Ne = function() {
          return typeof y == "function" ? y({
            props: q
          }) : y;
        }, je = function() {
          return R.try(function() {
            return a.resolveInitPromise ? a.resolveInitPromise() : z.resolve();
          });
        }, Oe = function(x) {
          return R.try(function() {
            return a.rejectInitPromise ? a.rejectInitPromise(x) : z.reject(x);
          });
        }, ke = function(x) {
          for (var N = {}, U = 0, j = Object.keys(q); U < j.length; U++) {
            var ee = j[U], K = h[ee];
            if (!K || K.sendToChild !== !1) {
              var ve = K && K.trustedDomains && K.trustedDomains.length > 0 ? K.trustedDomains.reduce(function(we, Ue) {
                return we || dt(Ue, x);
              }, !1) : dt(x, F(window));
              K && K.sameDomain && !ve || K && K.trustedDomains && !ve || (N[ee] = q[ee]);
            }
          }
          return R.hash(N);
        }, Me = function() {
          return R.try(function() {
            return ae ? ae() : Q;
          });
        }, Fe = function(x) {
          return R.try(function() {
            return Le ? Le(x) : Q = T({}, Q, x);
          });
        }, wt = function() {
          return bt ? bt() : R.try(function() {
            var x = q.window;
            if (x) {
              var N = Wr(x);
              return A.register(function() {
                return x.close();
              }), N;
            }
            return new ht({
              send: Et
            });
          });
        }, ot = function(x) {
          return or ? or(x) : R.try(function() {
            se = x;
          });
        }, Pt = function() {
          return Ht ? Ht() : R.hash({
            setState: Fe({
              visible: !0
            }),
            showElement: X ? X.get().then(La) : null
          }).then(ye);
        }, Mt = function() {
          return Vt ? Vt() : R.hash({
            setState: Fe({
              visible: !1
            }),
            showElement: X ? X.get().then(Bo) : null
          }).then(ye);
        }, vr = function() {
          return typeof O == "function" ? O({
            props: q
          }) : O;
        }, wr = function() {
          return typeof p == "function" ? p({
            props: q
          }) : p;
        }, sr = function() {
          return It(vr());
        }, it = function(x, N) {
          var U = N.windowName;
          return Jt ? Jt(x, {
            windowName: U
          }) : R.try(function() {
            if (x === xe.IFRAME) return un(jo({
              attributes: T({
                name: U,
                title: w
              }, wr().iframe)
            }));
          });
        }, Mr = function(x) {
          return Kt ? Kt(x) : R.try(function() {
            if (x === xe.IFRAME) return un(jo({
              attributes: T({
                name: "__zoid_prerender_frame__" + w + "_" + Xe() + "__",
                title: "prerender__" + w
              }, wr().iframe)
            }));
          });
        }, Fr = function(x, N, U) {
          return ie ? ie(x, N, U) : R.try(function() {
            if (x === xe.IFRAME) {
              if (!U) throw new Error("Expected proxy frame to be passed");
              return U.get().then(function(j) {
                return A.register(function() {
                  return Ir(j);
                }), Fn(j).then(function(ee) {
                  return ge(ee);
                }).then(function(ee) {
                  return Wr(ee);
                });
              });
            }
            if (x === xe.POPUP) return N;
            throw new Error("No render context available for " + x);
          });
        }, mr = function() {
          return R.try(function() {
            if (se) return R.all([B.trigger(Ee.FOCUS), se.focus()]).then(ye);
          });
        }, dn = function() {
          var x = _r(window);
          return x.windows = x.windows || {}, x.windows[r] = window, A.register(function() {
            delete x.windows[r];
          }), r;
        }, zr = function(x, N, U, j) {
          if (N === F(window)) return {
            type: "global",
            uid: dn()
          };
          if (x !== window) throw new Error("Can not construct cross-domain window reference for different target window");
          if (q.window) {
            var ee = j.getWindow();
            if (!ee) throw new Error("Can not construct cross-domain window reference for lazy window prop");
            if (Lt(ee) !== window) throw new Error("Can not construct cross-domain window reference for window prop with different ancestor");
          }
          if (U === xe.POPUP) return {
            type: "opener"
          };
          if (U === xe.IFRAME) return {
            type: "parent",
            distance: Tn(window)
          };
          throw new Error("Can not construct window reference for child");
        }, fn = function(x, N) {
          return R.try(function() {
            var U;
            xt = x, De = N, (U = se) == null || U.isPopup().then(function(j) {
              if ((N == null ? void 0 : N.name) !== "" && j) {
                var ee;
                (ee = se) == null || ee.setName(N == null ? void 0 : N.name);
              }
            }).finally(function() {
              je(), A.register(function() {
                return N.close.fireAndForget().catch(ye);
              });
            });
          });
        }, Lr = function(x) {
          var N = x.width, U = x.height;
          return R.try(function() {
            B.trigger(Ee.RESIZE, {
              width: N,
              height: U
            });
          });
        }, jr = function(x) {
          return R.try(function() {
            return B.trigger(Ee.DESTROY);
          }).catch(ye).then(function() {
            return A.all(x);
          }).then(function() {
            var N = x || new Error("Component destroyed");
            pt && pr(pt) || N.message === "Window navigated away" ? z.resolve() : z.asyncReject(N);
          });
        }, Ft = jt(function(x) {
          return R.try(function() {
            return nr ? Se(nr.__source__) ? void 0 : nr() : R.try(function() {
              return B.trigger(Ee.CLOSE);
            }).then(function() {
              return jr(x || new Error("Component closed"));
            });
          });
        }), Ni = function(x, N) {
          var U = N.proxyWin, j = N.proxyFrame, ee = N.windowName;
          return ar ? ar(x, {
            proxyWin: U,
            proxyFrame: j,
            windowName: ee
          }) : R.try(function() {
            if (x === xe.IFRAME) {
              if (!j) throw new Error("Expected proxy frame to be passed");
              return j.get().then(function(Ce) {
                return Fn(Ce).then(function(fe) {
                  return A.register(function() {
                    return Ir(Ce);
                  }), A.register(function() {
                    return mi(fe);
                  }), fe;
                });
              });
            }
            if (x === xe.POPUP) {
              var K = Ne(), ve = K.width, we = ve === void 0 ? "300px" : ve, Ue = K.height, be = Ue === void 0 ? "150px" : Ue;
              we = Jo(we, window.outerWidth), be = Jo(be, window.outerWidth);
              var ze = function(Ce, fe) {
                var Ie = (fe = fe || {}).closeOnUnload, Pe = Ie === void 0 ? 1 : Ie, at = fe.name, Be = at === void 0 ? "" : at, ce = fe.width, $e = fe.height, rt = 0, Ge = 0;
                ce && (window.outerWidth ? Ge = Math.round((window.outerWidth - ce) / 2) + window.screenX : window.screen.width && (Ge = Math.round((window.screen.width - ce) / 2))), $e && (window.outerHeight ? rt = Math.round((window.outerHeight - $e) / 2) + window.screenY : window.screen.height && (rt = Math.round((window.screen.height - $e) / 2))), delete fe.closeOnUnload, delete fe.name, ce && $e && (fe = T({
                  top: rt,
                  left: Ge,
                  width: ce,
                  height: $e,
                  status: 1,
                  toolbar: 0,
                  menubar: 0,
                  resizable: 1,
                  scrollbars: 1
                }, fe));
                var ur = Object.keys(fe).map(function(Dt) {
                  if (fe[Dt] != null) return Dt + "=" + Xr(fe[Dt]);
                }).filter(Boolean).join(","), mt;
                try {
                  mt = window.open("", Be, ur);
                } catch (Dt) {
                  throw new Mn("Can not open popup window - " + (Dt.stack || Dt.message));
                }
                if (Se(mt))
                  throw new Mn("Can not open popup window - blocked");
                return Pe && window.addEventListener("unload", function() {
                  return mt.close();
                }), mt;
              }(0, T({
                name: ee,
                width: we,
                height: be
              }, wr().popup));
              return A.register(function() {
                return Ro(ze);
              }), A.register(function() {
                return mi(ze);
              }), ze;
            }
            throw new Error("No render context available for " + x);
          }).then(function(K) {
            return U.setWindow(K, {
              send: Et
            }), U.setName(ee).then(function() {
              return U;
            });
          });
        }, Ci = function() {
          return R.try(function() {
            var x = Uo(window, "unload", Qr(function() {
              jr(new Error("Window navigated away"));
            })), N = To(d, jr, 3e3);
            if (A.register(N.cancel), A.register(x.cancel), vt) return vt();
          });
        }, Ii = function(x) {
          var N = !1;
          return x.isClosed().then(function(U) {
            return U ? (N = !0, Ft(new Error("Detected component window close"))) : R.delay(200).then(function() {
              return x.isClosed();
            }).then(function(j) {
              if (j)
                return N = !0, Ft(new Error("Detected component window close"));
            });
          }).then(function() {
            return N;
          });
        }, Ur = function(x) {
          return qt ? qt(x) : R.try(function() {
            if (V.indexOf(x) === -1)
              return V.push(x), z.asyncReject(x), B.trigger(Ee.ERROR, x);
          });
        }, Ai = new R(), Wi = function(x) {
          return R.try(function() {
            Ai.resolve(x);
          });
        };
        fn.onError = Ur;
        var _i = function(x, N) {
          return x({
            uid: r,
            container: N.container,
            context: N.context,
            doc: N.doc,
            frame: N.frame,
            prerenderFrame: N.prerenderFrame,
            focus: mr,
            close: Ft,
            state: $,
            props: q,
            tag: E,
            dimensions: Ne(),
            event: B
          });
        }, Mi = function(x, N) {
          var U = N.context;
          return ir ? ir(x, {
            context: U
          }) : R.try(function() {
            if (v) {
              B.trigger(Ee.PRERENDER);
              var j = x.getWindow();
              if (j && H(j) && function(Ie) {
                try {
                  if (!Ie.location.href || Ie.location.href === "about:blank") return !0;
                } catch {
                }
                return !1;
              }(j)) {
                var ee = (j = ge(j)).document, K = _i(v, {
                  context: U,
                  doc: ee
                });
                if (K) {
                  if (K.ownerDocument !== ee) throw new Error("Expected prerender template to have been created with document from child window");
                  (function(Ie, Pe) {
                    var at = Pe.tagName.toLowerCase();
                    if (at !== "html") throw new Error("Expected element to be html, got " + at);
                    for (var Be = Ie.document.documentElement, ce = 0, $e = In(Be.children); ce < $e.length; ce++) Be.removeChild($e[ce]);
                    for (var rt = 0, Ge = In(Pe.children); rt < Ge.length; rt++) Be.appendChild(Ge[rt]);
                  })(j, K);
                  var ve = b.width, we = ve !== void 0 && ve, Ue = b.height, be = Ue !== void 0 && Ue, ze = b.element, Ce = ze === void 0 ? "body" : ze;
                  if ((Ce = _n(Ce, ee)) && (we || be)) {
                    var fe = $o(Ce, function(Ie) {
                      Lr({
                        width: we ? Ie.width : void 0,
                        height: be ? Ie.height : void 0
                      });
                    }, {
                      width: we,
                      height: be,
                      win: j
                    });
                    B.on(Ee.RENDERED, fe.cancel);
                  }
                  B.trigger(Ee.PRERENDERED);
                }
              }
            }
          });
        }, Fi = function(x, N) {
          var U = N.proxyFrame, j = N.proxyPrerenderFrame, ee = N.context, K = N.rerender;
          return Gt ? Gt(x, {
            proxyFrame: U,
            proxyPrerenderFrame: j,
            context: ee,
            rerender: K
          }) : R.hash({
            container: x.get(),
            frame: U ? U.get() : null,
            prerenderFrame: j ? j.get() : null,
            internalState: Me()
          }).then(function(ve) {
            var we = ve.container, Ue = ve.internalState.visible, be = _i(l, {
              context: ee,
              container: we,
              frame: ve.frame,
              prerenderFrame: ve.prerenderFrame,
              doc: document
            });
            if (be) {
              Ue || Bo(be), za(we, be);
              var ze = function(Ce, fe) {
                fe = Qr(fe);
                var Ie = !1, Pe = [], at, Be, ce, $e = function() {
                  Ie = !0;
                  for (var mt = 0; mt < Pe.length; mt++) Pe[mt].disconnect();
                  at && at.cancel(), ce && ce.removeEventListener("unload", rt), Be && Ir(Be);
                }, rt = function() {
                  Ie || (fe(), $e());
                };
                if (pr(Ce))
                  return rt(), {
                    cancel: $e
                  };
                if (window.MutationObserver)
                  for (var Ge = Ce.parentElement; Ge; ) {
                    var ur = new window.MutationObserver(function() {
                      pr(Ce) && rt();
                    });
                    ur.observe(Ge, {
                      childList: !0
                    }), Pe.push(ur), Ge = Ge.parentElement;
                  }
                return (Be = document.createElement("iframe")).setAttribute("name", "__detect_close_" + Xe() + "__"), Be.style.display = "none", Fn(Be).then(function(mt) {
                  (ce = ge(mt)).addEventListener("unload", rt);
                }), Ce.appendChild(Be), at = Nr(function() {
                  pr(Ce) && rt();
                }, 1e3), {
                  cancel: $e
                };
              }(be, function() {
                var Ce = new Error("Detected container element removed from DOM");
                return R.delay(1).then(function() {
                  if (!pr(be))
                    return A.all(Ce), K().then(je, Oe);
                  Ft(Ce);
                });
              });
              return A.register(function() {
                return ze.cancel();
              }), A.register(function() {
                return Ir(be);
              }), X = un(be);
            }
          });
        }, zi = function() {
          return {
            state: $,
            event: B,
            close: Ft,
            focus: mr,
            resize: Lr,
            onError: Ur,
            updateProps: ss,
            show: Pt,
            hide: Mt
          };
        }, eo = function(x) {
          x === void 0 && (x = {});
          var N = pt, U = zi();
          hr(L, x), function(j, ee, K, ve, we) {
            var Ue = ve.state, be = ve.close, ze = ve.focus, Ce = ve.event, fe = ve.onError;
            Qn(K, j, function(Ie, Pe, at) {
              var Be = !1, ce = at;
              Object.defineProperty(ee, Ie, {
                configurable: !0,
                enumerable: !0,
                get: function() {
                  return Be ? ce : (Be = !0, function() {
                    if (!Pe) return ce;
                    var $e = Pe.alias;
                    if ($e && !Ut(at) && Ut(K[$e]) && (ce = K[$e]), Pe.value && (ce = Pe.value({
                      props: ee,
                      state: Ue,
                      close: be,
                      focus: ze,
                      event: Ce,
                      onError: fe,
                      container: we
                    })), !Pe.default || Ut(ce) || Ut(K[Ie]) || (ce = Pe.default({
                      props: ee,
                      state: Ue,
                      close: be,
                      focus: ze,
                      event: Ce,
                      onError: fe,
                      container: we
                    })), Ut(ce)) {
                      if (Pe.type === pe.ARRAY ? !Array.isArray(ce) : typeof ce !== Pe.type) throw new TypeError("Prop is not of type " + Pe.type + ": " + Ie);
                    } else if (Pe.required !== !1 && !Ut(K[Ie])) throw new Error('Expected prop "' + Ie + '" to be defined');
                    return Ut(ce) && Pe.decorate && (ce = Pe.decorate({
                      value: ce,
                      props: ee,
                      state: Ue,
                      close: be,
                      focus: ze,
                      event: Ce,
                      onError: fe,
                      container: we
                    })), ce;
                  }());
                }
              });
            }), Qn(ee, j, ye);
          }(h, q, L, U, N);
        }, ss = function(x) {
          return eo(x), z.then(function() {
            var N = De, U = se;
            if (N && U && xt) return ke(xt).then(function(j) {
              return N.updateProps(j).catch(function(ee) {
                return Ii(U).then(function(K) {
                  if (!K) throw ee;
                });
              });
            });
          });
        }, Li = function(x) {
          return _t ? _t(x) : R.try(function() {
            return zo(x);
          }).then(function(N) {
            return zn(N) && (N = function U(j) {
              var ee = function(Ue) {
                var be = function(ze) {
                  for (; ze.parentNode; ) ze = ze.parentNode;
                  if (zn(ze)) return ze;
                }(Ue);
                if (be && be.host) return be.host;
              }(j);
              if (!ee) throw new Error("Element is not in shadow dom");
              var K = "shadow-slot-" + Xe(), ve = document.createElement("slot");
              ve.setAttribute("name", K), j.appendChild(ve);
              var we = document.createElement("div");
              return we.setAttribute("slot", K), ee.appendChild(we), zn(ee) ? U(we) : we;
            }(N)), pt = N, un(N);
          });
        };
        return {
          init: function() {
            (function() {
              B.on(Ee.RENDER, function() {
                return q.onRender();
              }), B.on(Ee.PRERENDER, function() {
                return q.onPrerender();
              }), B.on(Ee.DISPLAY, function() {
                return q.onDisplay();
              }), B.on(Ee.RENDERED, function() {
                return q.onRendered();
              }), B.on(Ee.PRERENDERED, function() {
                return q.onPrerendered();
              }), B.on(Ee.CLOSE, function() {
                return q.onClose();
              }), B.on(Ee.DESTROY, function() {
                return q.onDestroy();
              }), B.on(Ee.RESIZE, function() {
                return q.onResize();
              }), B.on(Ee.FOCUS, function() {
                return q.onFocus();
              }), B.on(Ee.PROPS, function(x) {
                return q.onProps(x);
              }), B.on(Ee.ERROR, function(x) {
                return q && q.onError ? q.onError(x) : Oe(x).then(function() {
                  setTimeout(function() {
                    throw x;
                  }, 1);
                });
              }), A.register(B.reset);
            })();
          },
          render: function(x) {
            var N = x.target, U = x.container, j = x.context, ee = x.rerender;
            return R.try(function() {
              var K = sr(), ve = S || sr();
              (function(G, qe, Ae) {
                if (G !== window) {
                  if (!Jr(window, G)) throw new Error("Can only renderTo an adjacent frame");
                  var He = F();
                  if (!dt(qe, He) && !H(G)) throw new Error("Can not render remotely to " + qe.toString() + " - can only render to " + He);
                  if (Ae && typeof Ae != "string") throw new Error("Container passed to renderTo must be a string selector, got " + typeof Ae + " }");
                }
              })(N, ve, U);
              var we = R.try(function() {
                if (N !== window) return function(G, qe) {
                  for (var Ae = {}, He = 0, ut = Object.keys(q); He < ut.length; He++) {
                    var We = ut[He], yt = h[We];
                    yt && yt.allowDelegate && (Ae[We] = q[We]);
                  }
                  var Je = Et(qe, "zoid_delegate_" + w, {
                    uid: r,
                    overrides: {
                      props: Ae,
                      event: B,
                      close: Ft,
                      onError: Ur,
                      getInternalState: Me,
                      setInternalState: Fe,
                      resolveInitPromise: je,
                      rejectInitPromise: Oe
                    }
                  }).then(function(Y) {
                    var Z = Y.data.parent;
                    return A.register(function(W) {
                      if (!Se(qe)) return Z.destroy(W);
                    }), Z.getDelegateOverrides();
                  }).catch(function(Y) {
                    throw new Error(`Unable to delegate rendering. Possibly the component is not loaded in the target window.

` + lr(Y));
                  });
                  return _t = function() {
                    for (var Y = arguments.length, Z = new Array(Y), W = 0; W < Y; W++) Z[W] = arguments[W];
                    return Je.then(function(k) {
                      return k.getProxyContainer.apply(k, Z);
                    });
                  }, Gt = function() {
                    for (var Y = arguments.length, Z = new Array(Y), W = 0; W < Y; W++) Z[W] = arguments[W];
                    return Je.then(function(k) {
                      return k.renderContainer.apply(k, Z);
                    });
                  }, Ht = function() {
                    for (var Y = arguments.length, Z = new Array(Y), W = 0; W < Y; W++) Z[W] = arguments[W];
                    return Je.then(function(k) {
                      return k.show.apply(k, Z);
                    });
                  }, Vt = function() {
                    for (var Y = arguments.length, Z = new Array(Y), W = 0; W < Y; W++) Z[W] = arguments[W];
                    return Je.then(function(k) {
                      return k.hide.apply(k, Z);
                    });
                  }, vt = function() {
                    for (var Y = arguments.length, Z = new Array(Y), W = 0; W < Y; W++) Z[W] = arguments[W];
                    return Je.then(function(k) {
                      return k.watchForUnload.apply(k, Z);
                    });
                  }, G === xe.IFRAME ? (bt = function() {
                    for (var Y = arguments.length, Z = new Array(Y), W = 0; W < Y; W++) Z[W] = arguments[W];
                    return Je.then(function(k) {
                      return k.getProxyWindow.apply(k, Z);
                    });
                  }, Jt = function() {
                    for (var Y = arguments.length, Z = new Array(Y), W = 0; W < Y; W++) Z[W] = arguments[W];
                    return Je.then(function(k) {
                      return k.openFrame.apply(k, Z);
                    });
                  }, Kt = function() {
                    for (var Y = arguments.length, Z = new Array(Y), W = 0; W < Y; W++) Z[W] = arguments[W];
                    return Je.then(function(k) {
                      return k.openPrerenderFrame.apply(k, Z);
                    });
                  }, ir = function() {
                    for (var Y = arguments.length, Z = new Array(Y), W = 0; W < Y; W++) Z[W] = arguments[W];
                    return Je.then(function(k) {
                      return k.prerender.apply(k, Z);
                    });
                  }, ar = function() {
                    for (var Y = arguments.length, Z = new Array(Y), W = 0; W < Y; W++) Z[W] = arguments[W];
                    return Je.then(function(k) {
                      return k.open.apply(k, Z);
                    });
                  }, ie = function() {
                    for (var Y = arguments.length, Z = new Array(Y), W = 0; W < Y; W++) Z[W] = arguments[W];
                    return Je.then(function(k) {
                      return k.openPrerender.apply(k, Z);
                    });
                  }) : G === xe.POPUP && (or = function() {
                    for (var Y = arguments.length, Z = new Array(Y), W = 0; W < Y; W++) Z[W] = arguments[W];
                    return Je.then(function(k) {
                      return k.setProxyWin.apply(k, Z);
                    });
                  }), Je;
                }(j, N);
              }), Ue = q.window, be = Ci(), ze = Ri(h, q, "post"), Ce = B.trigger(Ee.RENDER), fe = Li(U), Ie = wt(), Pe = fe.then(function() {
                return eo();
              }), at = Pe.then(function() {
                return Ri(h, q, "get").then(function(G) {
                  return function(qe, Ae) {
                    var He = Ae.query || {}, ut = Ae.hash || {}, We, yt, Je = qe.split("#");
                    yt = Je[1];
                    var Y = (We = Je[0]).split("?");
                    We = Y[0];
                    var Z = Fo(Y[1], He), W = Fo(yt, ut);
                    return Z && (We = We + "?" + Z), W && (We = We + "#" + W), We;
                  }(On(vr()), {
                    query: G
                  });
                });
              }), Be = Ie.then(function(G) {
                return function(Ae) {
                  var He = Ae === void 0 ? {} : Ae, ut = He.proxyWin, We = He.initialChildDomain, yt = He.childDomainMatch, Je = He.target, Y = Je === void 0 ? window : Je, Z = He.context;
                  return function(W) {
                    var k = W === void 0 ? {} : W, to = k.proxyWin, ps = k.childDomainMatch, vs = k.context;
                    return ke(k.initialChildDomain).then(function(ws) {
                      return {
                        uid: r,
                        context: vs,
                        tag: E,
                        childDomainMatch: ps,
                        version: "10_3_3",
                        props: ws,
                        exports: (Bi = to, {
                          init: function(ms) {
                            return fn(this.origin, ms);
                          },
                          close: Ft,
                          checkClose: function() {
                            return Ii(Bi);
                          },
                          resize: Lr,
                          onError: Ur,
                          show: Pt,
                          hide: Mt,
                          export: Wi
                        })
                      };
                      var Bi;
                    });
                  }({
                    proxyWin: ut,
                    initialChildDomain: We,
                    childDomainMatch: yt,
                    context: Z
                  }).then(function(W) {
                    var k = yi({
                      data: W,
                      metaData: {
                        windowRef: zr(Y, We, Z, ut)
                      },
                      sender: {
                        domain: F(window)
                      },
                      receiver: {
                        win: ut,
                        domain: yt
                      },
                      passByReference: We === F()
                    }), to = k.serializedData;
                    return A.register(k.cleanReference), to;
                  });
                }({
                  proxyWin: (qe = {
                    proxyWin: G,
                    initialChildDomain: K,
                    childDomainMatch: ve,
                    target: N,
                    context: j
                  }).proxyWin,
                  initialChildDomain: qe.initialChildDomain,
                  childDomainMatch: qe.childDomainMatch,
                  target: qe.target,
                  context: qe.context
                }).then(function(Ae) {
                  return bi({
                    name: w,
                    serializedPayload: Ae
                  });
                });
                var qe;
              }), ce = Be.then(function(G) {
                return it(j, {
                  windowName: G
                });
              }), $e = Mr(j), rt = R.hash({
                proxyContainer: fe,
                proxyFrame: ce,
                proxyPrerenderFrame: $e
              }).then(function(G) {
                return Fi(G.proxyContainer, {
                  context: j,
                  proxyFrame: G.proxyFrame,
                  proxyPrerenderFrame: G.proxyPrerenderFrame,
                  rerender: ee
                });
              }).then(function(G) {
                return G;
              }), Ge = R.hash({
                windowName: Be,
                proxyFrame: ce,
                proxyWin: Ie
              }).then(function(G) {
                var qe = G.proxyWin;
                return Ue ? qe : Ni(j, {
                  windowName: G.windowName,
                  proxyWin: qe,
                  proxyFrame: G.proxyFrame
                });
              }), ur = R.hash({
                proxyWin: Ge,
                proxyPrerenderFrame: $e
              }).then(function(G) {
                return Fr(j, G.proxyWin, G.proxyPrerenderFrame);
              }), mt = Ge.then(function(G) {
                return se = G, ot(G);
              }), Dt = R.hash({
                proxyPrerenderWin: ur,
                state: mt
              }).then(function(G) {
                return Mi(G.proxyPrerenderWin, {
                  context: j
                });
              }), ji = R.hash({
                proxyWin: Ge,
                windowName: Be
              }).then(function(G) {
                if (Ue) return G.proxyWin.setName(G.windowName);
              }), us = R.hash({
                body: ze
              }).then(function(G) {
                return n.method ? n.method : Object.keys(G.body).length ? "post" : "get";
              }), Ui = R.hash({
                proxyWin: Ge,
                windowUrl: at,
                body: ze,
                method: us,
                windowName: ji,
                prerender: Dt
              }).then(function(G) {
                return G.proxyWin.setLocation(G.windowUrl, {
                  method: G.method,
                  body: G.body
                });
              }), cs = Ge.then(function(G) {
                (function qe(Ae, He) {
                  var ut = !1;
                  return A.register(function() {
                    ut = !0;
                  }), R.delay(2e3).then(function() {
                    return Ae.isClosed();
                  }).then(function(We) {
                    if (!ut) {
                      if (He === xe.POPUP && We) return Ft(new Error("Detected popup close"));
                      var yt = !!(pt && pr(pt));
                      return He === xe.IFRAME && We && (yt || $t) ? Ft(new Error("Detected iframe close")) : qe(Ae, He);
                    }
                  });
                })(G, j);
              }), ds = R.hash({
                container: rt,
                prerender: Dt
              }).then(function() {
                return B.trigger(Ee.DISPLAY);
              }), fs = Ge.then(function(G) {
                return function(qe, Ae, He) {
                  return R.try(function() {
                    return qe.awaitWindow();
                  }).then(function(ut) {
                    if (Bt && Bt.needsBridge({
                      win: ut,
                      domain: Ae
                    }) && !Bt.hasBridge(Ae, Ae)) {
                      var We = typeof n.bridgeUrl == "function" ? n.bridgeUrl({
                        props: q
                      }) : n.bridgeUrl;
                      if (!We) throw new Error("Bridge needed to render " + He);
                      var yt = It(We);
                      return Bt.linkUrl(ut, Ae), Bt.openBridge(On(We), yt);
                    }
                  });
                }(G, K, j);
              }), ls = Ui.then(function() {
                return R.try(function() {
                  var G = q.timeout;
                  if (G) return z.timeout(G, new Error("Loading component timed out after " + G + " milliseconds"));
                });
              }), hs = z.then(function() {
                return $t = !0, B.trigger(Ee.RENDERED);
              });
              return R.hash({
                initPromise: z,
                buildUrlPromise: at,
                onRenderPromise: Ce,
                getProxyContainerPromise: fe,
                openFramePromise: ce,
                openPrerenderFramePromise: $e,
                renderContainerPromise: rt,
                openPromise: Ge,
                openPrerenderPromise: ur,
                setStatePromise: mt,
                prerenderPromise: Dt,
                loadUrlPromise: Ui,
                buildWindowNamePromise: Be,
                setWindowNamePromise: ji,
                watchForClosePromise: cs,
                onDisplayPromise: ds,
                openBridgePromise: fs,
                runTimeoutPromise: ls,
                onRenderedPromise: hs,
                delegatePromise: we,
                watchForUnloadPromise: be,
                finalSetPropsPromise: Pe
              });
            }).catch(function(K) {
              return R.all([Ur(K), jr(K)]).then(function() {
                throw K;
              }, function() {
                throw K;
              });
            }).then(ye);
          },
          destroy: jr,
          getProps: function() {
            return q;
          },
          setProps: eo,
          export: Wi,
          getHelpers: zi,
          getDelegateOverrides: function() {
            return R.try(function() {
              return {
                getProxyContainer: Li,
                show: Pt,
                hide: Mt,
                renderContainer: Fi,
                getProxyWindow: wt,
                watchForUnload: Ci,
                openFrame: it,
                openPrerenderFrame: Mr,
                prerender: Mi,
                open: Ni,
                openPrerender: Fr,
                setProxyWin: ot
              };
            });
          },
          getExports: function() {
            return I({
              getExports: function() {
                return Ai;
              }
            });
          }
        };
      }
      var Qa = {
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
      }, Xa = {
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
      }, ka = {
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
      }, es = {
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
                  return kr(h.props, function(p) {
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
      }, ts = {
        register: function(e, r, n, o) {
          var a = o.Component, u = o.NgModule, d = o.ElementRef, h = o.NgZone, l = o.Inject, v = function() {
            function w(y, b) {
              this.elementRef = void 0, this.internalProps = void 0, this.parent = void 0, this.props = void 0, this.zone = void 0, this._props = void 0, this._props = {}, this.elementRef = y, this.zone = b;
            }
            var p = w.prototype;
            return p.getProps = function() {
              var y = this;
              return kr(T({}, this.internalProps, this.props), function(b) {
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
      function rs(e) {
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
              Ir(o);
            }, 1);
          }), d.on(Ee.RESIZE, function(p) {
            var y = p.width, b = p.height;
            typeof y == "number" && (E.style.width = Vo(y)), typeof b == "number" && (E.style.height = Vo(b));
          }), E;
        }
      }
      function ns(e) {
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
      var Xn = en(), kn = en();
      function os(e) {
        var r = function(b) {
          var O = b.tag, S = b.url, I = b.domain, z = b.bridgeUrl, V = b.props, A = V === void 0 ? {} : V, $ = b.dimensions, L = $ === void 0 ? {} : $, Q = b.autoResize, B = Q === void 0 ? {} : Q, ue = b.allowedParentDomains, oe = ue === void 0 ? "*" : ue, J = b.attributes, q = J === void 0 ? {} : J, se = b.defaultContext, X = se === void 0 ? xe.IFRAME : se, De = b.containerTemplate, xt = De === void 0 ? rs : De, pt = b.prerenderTemplate, $t = pt === void 0 ? ns : pt, qt = b.validate, _t = b.eligible, Ht = _t === void 0 ? function() {
            return {
              eligible: !0
            };
          } : _t, Vt = b.logger, nr = Vt === void 0 ? {
            info: ye
          } : Vt, Gt = b.exports, bt = Gt === void 0 ? ye : Gt, or = b.method, Jt = b.children, Kt = Jt === void 0 ? function() {
            return {};
          } : Jt, ir = O.replace(/-/g, "_"), ar = T({}, {
            window: {
              type: pe.OBJECT,
              sendToChild: !1,
              required: !1,
              allowDelegate: !0,
              validate: function(ie) {
                var vt = ie.value;
                if (!er(vt) && !ht.isProxyWindow(vt)) throw new Error("Expected Window or ProxyWindow");
                if (er(vt)) {
                  if (Se(vt)) throw new Error("Window is closed");
                  if (!H(vt)) throw new Error("Window is not same domain");
                }
              },
              decorate: function(ie) {
                return Wr(ie.value);
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
              decorate: rr
            },
            onRendered: {
              type: pe.FUNCTION,
              required: !1,
              sendToChild: !1,
              default: Wt,
              decorate: rr
            },
            onRender: {
              type: pe.FUNCTION,
              required: !1,
              sendToChild: !1,
              default: Wt,
              decorate: rr
            },
            onPrerendered: {
              type: pe.FUNCTION,
              required: !1,
              sendToChild: !1,
              default: Wt,
              decorate: rr
            },
            onPrerender: {
              type: pe.FUNCTION,
              required: !1,
              sendToChild: !1,
              default: Wt,
              decorate: rr
            },
            onClose: {
              type: pe.FUNCTION,
              required: !1,
              sendToChild: !1,
              allowDelegate: !0,
              default: Wt,
              decorate: rr
            },
            onDestroy: {
              type: pe.FUNCTION,
              required: !1,
              sendToChild: !1,
              allowDelegate: !0,
              default: Wt,
              decorate: rr
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
          if (!xt) throw new Error("Container template required");
          return {
            name: ir,
            tag: O,
            url: S,
            domain: I,
            bridgeUrl: z,
            method: or,
            propsDef: ar,
            dimensions: L,
            autoResize: B,
            allowedParentDomains: oe,
            attributes: q,
            defaultContext: X,
            containerTemplate: xt,
            prerenderTemplate: $t,
            validate: qt,
            logger: nr,
            eligible: Ht,
            children: Kt,
            exports: typeof bt == "function" ? bt : function(ie) {
              for (var vt = ie.getExports, ae = {}, Le = function() {
                var Oe = je[Ne], ke = bt[Oe].type, Me = vt().then(function(Fe) {
                  return Fe[Oe];
                });
                ae[Oe] = ke === pe.FUNCTION ? function() {
                  for (var Fe = arguments.length, wt = new Array(Fe), ot = 0; ot < Fe; ot++) wt[ot] = arguments[ot];
                  return Me.then(function(Pt) {
                    return Pt.apply(void 0, wt);
                  });
                } : Me;
              }, Ne = 0, je = Object.keys(bt); Ne < je.length; Ne++) Le();
              return ae;
            }
          };
        }(e), n = r.name, o = r.tag, a = r.defaultContext, u = r.propsDef, d = r.eligible, h = r.children, l = _r(window), v = {}, E = [], w = function() {
          if (function(O) {
            try {
              return Zn(window.name).name === O;
            } catch {
            }
            return !1;
          }(n)) {
            var b = Pi().payload;
            if (b.tag === o && dt(b.childDomainMatch, F())) return !0;
          }
          return !1;
        }, p = jt(function() {
          if (w()) {
            if (window.xprops)
              throw delete l.components[o], new Error("Can not register " + n + " as child - child already registered");
            var b = function(O) {
              var S = O.tag, I = O.propsDef, z = O.autoResize, V = O.allowedParentDomains, A = [], $ = Pi(), L = $.parent, Q = $.payload, B = L.win, ue = L.domain, oe, J = new R(), q = Q.version, se = Q.uid, X = Q.exports, De = Q.context, xt = Q.props;
              if (!function(ae, Le) {
                if (!/_/.test(ae) || !/_/.test("10_3_3")) throw new Error("Versions are in an invalid format (" + ae + ", 10_3_3)");
                return ae.split("_")[0] === "10_3_3".split("_")[0];
              }(q)) throw new Error("Parent window has zoid version " + q + ", child window has version 10_3_3");
              var pt = X.show, $t = X.hide, qt = X.close, _t = X.onError, Ht = X.checkClose, Vt = X.export, nr = X.resize, Gt = X.init, bt = function() {
                return B;
              }, or = function() {
                return ue;
              }, Jt = function(ae) {
                return A.push(ae), {
                  cancel: function() {
                    A.splice(A.indexOf(ae), 1);
                  }
                };
              }, Kt = function(ae) {
                return nr.fireAndForget({
                  width: ae.width,
                  height: ae.height
                });
              }, ir = function(ae) {
                return J.resolve(ae), Vt(ae);
              }, ar = function(ae) {
                var Le = (ae === void 0 ? {} : ae).anyParent, Ne = [], je = oe.parent;
                if (Le === void 0 && (Le = !je), !Le && !je) throw new Error("No parent found for " + S + " child");
                for (var Oe = 0, ke = Xt(window); Oe < ke.length; Oe++) {
                  var Me = ke[Oe];
                  if (H(Me)) {
                    var Fe = ge(Me).xprops;
                    if (Fe && bt() === Fe.getParent()) {
                      var wt = Fe.parent;
                      if (Le || !je || wt && wt.uid === je.uid) {
                        var ot = gi(Me, function(Pt) {
                          return Pt.exports;
                        });
                        Ne.push({
                          props: Fe,
                          exports: ot
                        });
                      }
                    }
                  }
                }
                return Ne;
              }, ie = function(ae, Le, Ne) {
                Ne === void 0 && (Ne = !1);
                var je = function(ke, Me, Fe, wt, ot, Pt) {
                  Pt === void 0 && (Pt = !1);
                  for (var Mt = {}, vr = 0, wr = Object.keys(Fe); vr < wr.length; vr++) {
                    var sr = wr[vr], it = Me[sr], Mr = it && it.trustedDomains && it.trustedDomains.length > 0 ? it.trustedDomains.reduce(function(fn, Lr) {
                      return fn || dt(Lr, F(window));
                    }, !1) : wt === F(window) || H(ke);
                    if ((!it || !it.sameDomain || Mr) && (!it || !it.trustedDomains || Mr)) {
                      var Fr = Ti(Me, 0, sr, Fe[sr], ot);
                      Mt[sr] = Fr, it && it.alias && !Mt[it.alias] && (Mt[it.alias] = Fr);
                    }
                  }
                  if (!Pt) for (var mr = 0, dn = Object.keys(Me); mr < dn.length; mr++) {
                    var zr = dn[mr];
                    Fe.hasOwnProperty(zr) || (Mt[zr] = Ti(Me, 0, zr, void 0, ot));
                  }
                  return Mt;
                }(B, I, ae, Le, {
                  tag: S,
                  show: pt,
                  hide: $t,
                  close: qt,
                  focus: Za,
                  onError: _t,
                  resize: Kt,
                  getSiblings: ar,
                  onProps: Jt,
                  getParent: bt,
                  getParentDomain: or,
                  uid: se,
                  export: ir
                }, Ne);
                oe ? hr(oe, je) : oe = je;
                for (var Oe = 0; Oe < A.length; Oe++) (0, A[Oe])(oe);
              }, vt = function(ae) {
                return R.try(function() {
                  return ie(ae, ue, !0);
                });
              };
              return {
                init: function() {
                  return R.try(function() {
                    var ae = "";
                    return H(B) && (ae = function(Le) {
                      var Ne = Le.componentName, je = Le.parentComponentWindow, Oe = Ei({
                        data: Zn(window.name).serializedInitialPayload,
                        sender: {
                          win: je
                        },
                        basic: !0
                      }), ke = Oe.sender;
                      if (Oe.reference.type === "uid" || Oe.metaData.windowRef.type === "global") {
                        var Me = bi({
                          name: Ne,
                          serializedPayload: yi({
                            data: Oe.data,
                            metaData: {
                              windowRef: Ya(je)
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
                        return window.name = Me, Me;
                      }
                    }({
                      componentName: O.name,
                      parentComponentWindow: B
                    }) || ""), _r(window).exports = O.exports({
                      getExports: function() {
                        return J;
                      }
                    }), function(Le, Ne) {
                      if (!dt(Le, Ne)) throw new Error("Can not be rendered by domain: " + Ne);
                    }(V, ue), ko(B), function() {
                      window.addEventListener("beforeunload", function() {
                        Ht.fireAndForget();
                      }), window.addEventListener("unload", function() {
                        Ht.fireAndForget();
                      }), To(B, function() {
                        Oi();
                      });
                    }(), Gt({
                      name: ae,
                      updateProps: vt,
                      close: Oi
                    });
                  }).then(function() {
                    return (ae = z.width, Le = ae !== void 0 && ae, Ne = z.height, je = Ne !== void 0 && Ne, Oe = z.element, zo(Oe === void 0 ? "body" : Oe).catch(ye).then(function(ke) {
                      return {
                        width: Le,
                        height: je,
                        element: ke
                      };
                    })).then(function(ke) {
                      var Me = ke.width, Fe = ke.height, wt = ke.element;
                      wt && (Me || Fe) && De !== xe.POPUP && $o(wt, function(ot) {
                        Kt({
                          width: Me ? ot.width : void 0,
                          height: Fe ? ot.height : void 0
                        });
                      }, {
                        width: Me,
                        height: Fe
                      });
                    });
                    var ae, Le, Ne, je, Oe;
                  }).catch(function(ae) {
                    _t(ae);
                  });
                },
                getProps: function() {
                  return oe || (ie(xt, ue), oe);
                }
              };
            }(r);
            return b.init(), b;
          }
        }), y = function b(O) {
          var S, I = "zoid-" + o + "-" + Xe(), z = O || {}, V = d({
            props: z
          }), A = V.eligible, $ = V.reason, L = z.onDestroy;
          z.onDestroy = function() {
            if (S && A && E.splice(E.indexOf(S), 1), L) return L.apply(void 0, arguments);
          };
          var Q = Si({
            uid: I,
            options: r
          });
          Q.init(), A ? Q.setProps(z) : z.onDestroy && z.onDestroy(), Xn.register(function(oe) {
            return Q.destroy(oe || new Error("zoid destroyed all components"));
          });
          var B = function(oe) {
            var J = (oe === void 0 ? {} : oe).decorate;
            return b((J === void 0 ? Ma : J)(z));
          }, ue = function(oe, J, q) {
            return R.try(function() {
              if (!A) {
                var se = new Error($ || n + " component is not eligible");
                return Q.destroy(se).then(function() {
                  throw se;
                });
              }
              if (!er(oe)) throw new Error("Must pass window to renderTo");
              return function(X, De) {
                return R.try(function() {
                  if (X.window) return Wr(X.window).getType();
                  if (De) {
                    if (De !== xe.IFRAME && De !== xe.POPUP) throw new Error("Unrecognized context: " + De);
                    return De;
                  }
                  return a;
                });
              }(z, q);
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
                  var X = B();
                  return hr(S, X), X.renderTo(oe, J, q);
                }
              });
            }).catch(function(se) {
              return Q.destroy(se).then(function() {
                throw se;
              });
            });
          };
          return S = T({}, Q.getExports(), Q.getHelpers(), function() {
            for (var oe = h(), J = {}, q = function() {
              var De = X[se], xt = oe[De];
              J[De] = function(pt) {
                var $t = Q.getProps(), qt = T({}, pt, {
                  parent: {
                    uid: I,
                    props: $t,
                    export: Q.export
                  }
                });
                return xt(qt);
              };
            }, se = 0, X = Object.keys(oe); se < X.length; se++) q();
            return J;
          }(), {
            isEligible: function() {
              return A;
            },
            clone: B,
            render: function(oe, J) {
              return ue(window, oe, J);
            },
            renderTo: function(oe, J, q) {
              return ue(oe, J, q);
            }
          }), A && E.push(S), S;
        };
        if (p(), function() {
          var b = At("zoid_allow_delegate_" + n, function() {
            return !0;
          }), O = At("zoid_delegate_" + n, function(S) {
            var I = S.data;
            return {
              parent: Si({
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
              react: Qa,
              angular: es,
              vue: Xa,
              vue3: ka,
              angular2: ts
            };
            if (!S[b]) throw new Error("Could not find driver for framework: " + b);
            return v[b] || (v[b] = S[b].register(o, u, y, O)), v[b];
          },
          isChild: w,
          canRenderTo: function(b) {
            return Et(b, "zoid_allow_delegate_" + n).then(function(O) {
              return O.data;
            }).catch(function() {
              return !1;
            });
          },
          registerChild: p
        };
      }
      var is = function(e) {
        (function() {
          St().initialized || (St().initialized = !0, u = (a = {
            on: At,
            send: Et
          }).on, d = a.send, (h = St()).receiveMessage = h.receiveMessage || function(l) {
            return Kn(l, {
              on: u,
              send: d
            });
          }, function(l) {
            var v = l.on, E = l.send;
            de().getOrSet("postMessageListener", function() {
              return Uo(window, "message", function(w) {
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
            send: Et
          }), si({
            on: At,
            send: Et,
            receiveMessage: Kn
          }), function(l) {
            var v = l.on, E = l.send;
            de("builtinListeners").getOrSet("helloListener", function() {
              var w = v("postrobot_hello", {
                domain: "*"
              }, function(y) {
                return Zo(y.source, {
                  domain: y.origin
                }), {
                  instanceID: Yo()
                };
              }), p = Lt();
              return p && jn(p, {
                send: E
              }).catch(function(y) {
              }), w;
            });
          }({
            on: At,
            send: Et
          }));
          var a, u, d, h;
        })();
        var r = os(e), n = function(a) {
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
      function xi(e) {
        Bt && Bt.destroyBridges();
        var r = Xn.all(e);
        return Xn = en(), r;
      }
      var Di = xi;
      function as(e) {
        return Di(), delete window.__zoid_10_3_3__, function() {
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
})(Ca);
var Ia = Ca.exports;
const ta = Ia.EVENT, yr = {
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
  ), M.appendChild(i), M.appendChild(s), M.appendChild(_), s.classList.add(yr.INVISIBLE), i.classList.add(yr.INVISIBLE), m.on(ta.RENDERED, () => {
    setTimeout(() => {
      i.classList.remove(yr.INVISIBLE), i.classList.add(yr.VISIBLE);
    }, 100), setTimeout(() => {
      s.remove();
    }, 1);
  }), m.on(ta.RESIZE, ({ width: te, height: Re }) => {
    typeof te == "number" && (M.style.width = `${te}px`), typeof Re == "number" && (M.style.height = `${Re}px`);
  }), M;
}
function tc(t) {
  return Ia.create({
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
const oc = "https://cdn.jsdelivr.net/gh/sigmaott/sigma-ssai-web-sdk/v6/build/dist/wasm_exec.js";
let Er = null;
function ra() {
  Er = null;
}
function ic() {
  const t = window;
  return t.Go ? Promise.resolve(t.wasm) : Er || (Er = nc(oc).then(() => t.Go), Er.then(ra).catch(ra), Er);
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
const ac = Tt(), sc = Tt();
function na({ adsUrl: t, sdk: i, loader: s }) {
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
  const f = Qu(), m = Tt(!1), P = Tt(), T = Math.random().toString(36).slice(6);
  function D({ icons: re }) {
    return {
      id: T,
      appConfig: {
        sdkBaseUrl: gn("https://cdn.jsdelivr.net/gh/sigmaott/sigma-ssai-web-sdk/v6/build/dist/wta/index.html", { id: T })
      },
      icons: re
    };
  }
  const C = rc(D({
    icons: []
  }));
  C.render(i), C.hide(), i.style.display = "none", Su(() => {
    var re;
    if (P.value) {
      const ne = ((re = P.value) == null ? void 0 : re.icons) || [];
      i.style.display = "block", C.updateProps(D({
        icons: ne
      })), C.show();
    } else
      i.style.display = "none", C.hide();
  });
  const g = Tt([]), M = Tt(), _ = Tt([]);
  async function te(re) {
    var F;
    console.log("[LOG] ~ currentAd:", P);
    const ne = (F = P.value) == null ? void 0 : F.trackingEvents.find((H) => H.eventType === re);
    if (!ne) {
      console.debug("[LOG] ~ event:", re);
      return;
    }
    f.trigger(ne), await Promise.all(ne.beaconUrls.map((H) => Xu(uu(H, {
      retry: 3,
      retryDelay: 500
    }))));
  }
  const Re = /* @__PURE__ */ new Map();
  let Qe;
  function R(re, ne, F) {
    re.addEventListener(ne, F), Re.set(ne, F);
  }
  function Rt(re) {
    var et, tt;
    const ne = ((re == null ? void 0 : re.time) || 0) > 0 ? re.time : 0, F = (et = re == null ? void 0 : re.value) == null ? void 0 : et.event;
    console.debug("[LOG] ~ eventType:", F);
    const H = _.value.find((_e) => _e.eventType === F && !_e.tracked && !_e.skipped);
    if (console.debug("[LOG] ~ eventAd:", H), !H)
      return;
    const ge = H == null ? void 0 : H.ad;
    if (console.debug("[LOG] ~ ad:", ge), !!ge) {
      if (F === "start")
        P.value && _.value.filter((Ye) => Ye.key.startsWith(`${P.value.key}_`)).forEach((Ye) => Ye.skipped = !0), P.value = ge, s(ge.adVerifications, f), Qe = Gi(() => {
          te("impression"), te("start");
          const _e = _.value.find((Ye) => Ye.key === H.key.replace("_start", "_impression"));
          _e && (_e.tracked = !0), H.tracked = !0;
        }, ne * 1e3);
      else {
        if (!P.value) {
          console.debug("[LOG] ~ eventType:", F);
          return;
        }
        if (ge.id !== ((tt = P.value) == null ? void 0 : tt.id)) {
          console.debug("[ERROR] ~ ad:", ge), console.debug("[ERROR] ~ currentAd:", P.value), _.value.filter((Ye) => Ye.key.startsWith(`${P.value.key}_`)).forEach((Ye) => Ye.skipped = !0);
          return;
        }
        Qe = Gi(() => {
          te(F), F === "complete" && ge.id === P.value.id && (P.value = void 0), H.tracked = !0;
        }, ne * 1e3);
      }
      console.debug("========================================");
    }
  }
  function Nt() {
    return m.value = !1, ["fullscreenchange", "webkitfullscreenchange", "mozfullscreenchange", "msfullscreenchange"].forEach((re) => {
      R(t, re, () => {
        const ne = document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement;
        te(ne ? "fullscreen" : "exitFullscreen");
      });
    }), R(t, "pause", () => te("pause")), R(t, "play", () => te("resume")), R(t, "rewind", () => te("rewind")), R(t, "mute", () => te("mute")), R(t, "unmute", () => te("unmute")), async (re, ne) => {
      if (M.value = ne.frag.sn, re !== window.Hls.Events.FRAG_CHANGED)
        return;
      const F = g.value.filter((H) => H.sn === ne.frag.sn);
      if (!F.length) {
        console.debug("[LOG] ~ trackingEvent:", F);
        return;
      }
      F.forEach((H) => Rt(H)), g.value = g.value.filter((H) => H.sn !== ne.frag.sn);
    };
  }
  async function gt() {
    return c.getEventTracking().then((re) => {
      for (const ne of (re == null ? void 0 : re.avails) || [])
        for (const F of ne.ads) {
          const H = `${ne.id}_${F.id}_${F.startTimeInSeconds}`;
          for (const ge of F.trackingEvents) {
            const et = `${H}_${ge.eventType}`;
            _.value.find((_e) => _e.key === et) || _.value.push({
              ...ge,
              key: et,
              ad: {
                ...F,
                key: H
              },
              tracked: !1
            });
          }
        }
    });
  }
  function me() {
    return async (re, ne) => {
      function F(et) {
        for (let tt = 0; tt < et.length; tt++)
          if (et[tt] === 0)
            return tt;
        return et.length;
      }
      const { start: H, sn: ge } = ne.frag;
      for (let et = 0; et < ne.samples.length; et++) {
        const tt = ne.samples[et], _e = tt.data, Ye = tt.pts;
        if (String.fromCharCode.apply(null, _e.slice(0, 3)) !== "ID3" || String.fromCharCode.apply(null, _e.slice(10, 14)) !== "TXXX")
          continue;
        const kt = _e.slice(21, _e.length), Se = F(kt), xr = kt.slice(Se + 1, kt.length), fr = F(xr), Gr = new TextDecoder("utf-8").decode(xr.slice(0, fr)), Lt = {
          sn: ge,
          time: Ye - H,
          value: so(Gr)
        };
        if (M.value && ge < M.value)
          return;
        g.value.push(Lt), Lt.value.event === "start" && gt();
      }
    };
  }
  function nt() {
    return (re) => {
      const ne = re.track;
      ne.kind === "metadata" && (ne.oncuechange = async () => {
        const F = ne.activeCues[0];
        if (F && F.value.data) {
          console.debug("[LOG] ~ elemTrack:", F), await gt();
          const H = so(F.value.data);
          console.debug("[LOG] ~ trackingEvent:", H), Rt({
            value: H
          });
        }
      });
    };
  }
  function Ct(re, ne) {
    f.on((F) => {
      (re === "*" || F.eventType === re) && ne(F);
    });
  }
  function Ke() {
    P.value = void 0, g.value = [], Re.forEach((re, ne) => {
      t.removeEventListener(ne, re);
    }), Re.clear(), mu(Qe);
  }
  function Te() {
    return {
      eventTracking: g,
      trackingDataEvent: _
    };
  }
  return {
    destroy: Ke,
    onEventTracking: Ct,
    hlsHelper: {
      createHlsFragChanged: Nt,
      createHlsFragParsingMetadata: me
    },
    videojsHelper: {
      createVideojsAddTrack: nt
    },
    getLog: Te
  };
}
async function dc({ video: t, adContainer: i, adsUrl: s }) {
  await ic();
  const c = new br();
  await c.init("https://cdn.jsdelivr.net/gh/sigmaott/sigma-ssai-web-sdk/v6/build/dist/sigma-cspm.wasm");
  function f() {
  }
  const { onEventTracking: m, destroy: P, videojsHelper: T, hlsHelper: D, getLog: C } = uc({
    video: t,
    adContainer: i,
    trackingUrl: "",
    startSession: f,
    sdk: c
  }), g = Tt(), M = Tt();
  function _(me) {
    me.config.loader = na({ adsUrl: s, sdk: c, loader: Hls.DefaultConfig.loader }), g.value = me;
    const nt = D.createHlsFragChanged(), Ct = D.createHlsFragParsingMetadata();
    me.on("hlsFragChanged", nt), me.on("hlsFragParsingMetadata", Ct), me.on(Hls.Events.ERROR, (Ke, Te) => {
      console.error("HLS Error:", Ke, Te), Te.type === window.Hls.ErrorTypes.NETWORK_ERROR ? console.error("Network Error:", Te.details) : Te.type === window.Hls.ErrorTypes.MEDIA_ERROR ? console.error("Media Error:", Te.details) : console.error("Other Error:", Te.details);
    }), M.value = () => {
      me.off("hlsFragChanged", nt), me.off("hlsFragParsingMetadata", Ct);
    };
  }
  function te(me) {
    me.hls.config.loader = na({ adsUrl: s, sdk: c, loader: SigmaManager.DefaultConfig.loader }), g.value = me.hls;
    const nt = D.createHlsFragChanged(), Ct = D.createHlsFragParsingMetadata();
    me.hls.on("hlsFragChanged", nt), me.hls.on("hlsFragParsingMetadata", Ct), me.on(SigmaManager.Events.ERROR, (Ke, Te) => {
      console.log("[LOG] ~ event:", Ke), console.error("HLS Error:", Ke, Te), Te.type === window.Hls.ErrorTypes.NETWORK_ERROR ? console.error("Network Error:", Te.details) : Te.type === window.Hls.ErrorTypes.MEDIA_ERROR ? console.error("Media Error:", Te.details) : console.error("Other Error:", Te.details);
    }), M.value = () => {
      me.hls.destroy();
    };
  }
  const Re = Tt(), Qe = Tt(), Rt = {
    instance: c,
    config: {
      proxyAds: {
        uri: s,
        timeout: 2
      }
    }
  };
  function Nt(me) {
    Re.value = me;
    const nt = T.createVideojsAddTrack();
    me.textTracks().on("addtrack", nt), Qe.value = () => {
      me.textTracks().off("addtrack", nt);
    };
  }
  function gt() {
    var me, nt;
    P(), (me = M.value) == null || me.call(M), (nt = Qe.value) == null || nt.call(Qe), g.value = null, Re.value = null, M.value = null, Qe.value = null;
  }
  return {
    onEventTracking: m,
    destroy: gt,
    sigmaPlayer: {
      attachVideojs: Nt,
      attachHls: _,
      attachSigmaDrm: te,
      attachVideojs2: Nt,
      getLog: C
    },
    sdk: c,
    cspm: Rt
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
  const i = "https://dai.sigma.video/api/proxy-ads/ads/", s = po(t), c = `${s.protocol}//${s.host}${s.pathname}`;
  if (!s.search)
    return { playerUrl: t, adsUrl: null };
  const f = js(t), m = f["sigma.dai.adsEndpoint"];
  if (!m)
    return { playerUrl: t, adsUrl: null };
  const P = {}, T = {};
  for (const [C, g] of Object.entries(f))
    C.startsWith("sigma.dai") ? C !== "sigma.dai.adsEndpoint" && (P[C.replace("sigma.dai.", "")] = g) : T[C] = g;
  return {
    playerUrl: gn(c, T),
    adsUrl: gn(sa(i, m), P)
  };
}
export {
  dc as createSigmaDai,
  fc as processURL
};
