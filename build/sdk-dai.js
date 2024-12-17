const ys = /#/g, Es = /&/g, bs = /\//g, Ps = /=/g, wo = /\+/g, Ts = /%5e/gi, Rs = /%60/gi, Os = /%7c/gi, Ss = /%20/gi;
function xs(t) {
  return encodeURI("" + t).replace(Os, "|");
}
function co(t) {
  return xs(typeof t == "string" ? t : JSON.stringify(t)).replace(wo, "%2B").replace(Ss, "+").replace(ys, "%23").replace(Es, "%26").replace(Rs, "`").replace(Ts, "^").replace(bs, "%2F");
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
  return (typeof i == "number" || typeof i == "boolean") && (i = String(i)), i ? Array.isArray(i) ? i.map((s) => `${no(t)}=${co(s)}`).join("&") : `${no(t)}=${co(i)}` : no(t);
}
function Is(t) {
  return Object.keys(t).filter((i) => t[i] !== void 0).map((i) => Cs(i, t[i])).filter(Boolean).join("&");
}
const As = /^[\s\w\0+.-]{2,}:([/\\]{1,2})/, Ws = /^[\s\w\0+.-]{2,}:([/\\]{2})?/, _s = /^([/\\]\s*){2,}[^/\\]/, Ms = /^\.?\//;
function ua(t, i = {}) {
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
  if (Bs(i) || ua(t))
    return t;
  const s = zs(i);
  return t.startsWith(s) ? t : Gr(s, t);
}
function bn(t, i) {
  const s = mo(t), c = { ...sa(s.search), ...i };
  return s.search = Is(c), qs(s);
}
function Us(t) {
  return sa(mo(t).search);
}
function Bs(t) {
  return !t || t === "/";
}
function $s(t) {
  return t && t !== "/";
}
function Gr(t, ...i) {
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
function mo(t = "", i) {
  const s = t.match(
    /^[\s\0]*(blob:|data:|javascript:|vbscript:)(.*)/i
  );
  if (s) {
    const [, M, F = ""] = s;
    return {
      protocol: M.toLowerCase(),
      pathname: F,
      href: M + F,
      auth: "",
      host: "",
      search: "",
      hash: ""
    };
  }
  if (!ua(t, { acceptRelative: !0 }))
    return Vi(t);
  const [, c = "", f, m = ""] = t.replace(/\\/g, "/").match(/^[\s\0]*([\w+.-]{2,}:)?\/\/([^/@]+@)?(.*)/) || [];
  let [, T = "", P = ""] = m.match(/([^#/?]*)(.*)?/) || [];
  c === "file:" && (P = P.replace(/\/(?=[A-Za-z]:)/, ""));
  const { pathname: C, search: _, hash: b } = Vi(P);
  return {
    protocol: c.toLowerCase(),
    auth: f ? f.slice(0, Math.max(0, f.length - 1)) : "",
    host: T,
    pathname: C,
    search: _,
    hash: b,
    [ca]: !c
  };
}
function Vi(t = "") {
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
function fo(t, i = {}) {
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
  var C, _, b, M, F;
  const i = ((C = t.error) == null ? void 0 : C.message) || ((_ = t.error) == null ? void 0 : _.toString()) || "", s = ((b = t.request) == null ? void 0 : b.method) || ((M = t.options) == null ? void 0 : M.method) || "GET", c = ((F = t.request) == null ? void 0 : F.url) || String(t.request) || "/", f = `[${s}] ${JSON.stringify(c)}`, m = t.response ? `${t.response.status} ${t.response.statusText}` : "<no response>", T = `${f}: ${m}${i ? ` ${i}` : ""}`, P = new Ys(
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
  async function f(P) {
    const C = P.error && P.error.name === "AbortError" && !P.options.timeout || !1;
    if (P.options.retry !== !1 && !C) {
      let b;
      typeof P.options.retry == "number" ? b = P.options.retry : b = Gi(P.options.method) ? 0 : 1;
      const M = P.response && P.response.status || 500;
      if (b > 0 && (Array.isArray(P.options.retryStatusCodes) ? P.options.retryStatusCodes.includes(M) : nu.has(M))) {
        const F = P.options.retryDelay || 0;
        return F > 0 && await new Promise((re) => setTimeout(re, F)), m(P.request, {
          ...P.options,
          retry: b - 1
        });
      }
    }
    const _ = Zs(P);
    throw Error.captureStackTrace && Error.captureStackTrace(_, m), _;
  }
  const m = async function(C, _ = {}) {
    var re;
    const b = {
      request: C,
      options: ru(_, t.defaults, s),
      response: void 0,
      error: void 0
    };
    b.options.method = (re = b.options.method) == null ? void 0 : re.toUpperCase(), b.options.onRequest && await b.options.onRequest(b), typeof b.request == "string" && (b.options.baseURL && (b.request = js(b.request, b.options.baseURL)), (b.options.query || b.options.params) && (b.request = bn(b.request, {
      ...b.options.params,
      ...b.options.query
    }))), b.options.body && Gi(b.options.method) && (Xs(b.options.body) ? (b.options.body = typeof b.options.body == "string" ? b.options.body : JSON.stringify(b.options.body), b.options.headers = new s(b.options.headers || {}), b.options.headers.has("content-type") || b.options.headers.set("content-type", "application/json"), b.options.headers.has("accept") || b.options.headers.set("accept", "application/json")) : (
      // ReadableStream Body
      ("pipeTo" in b.options.body && typeof b.options.body.pipeTo == "function" || // Node.js Stream Body
      typeof b.options.body.pipe == "function") && ("duplex" in b.options || (b.options.duplex = "half"))
    ));
    let M;
    if (!b.options.signal && b.options.timeout) {
      const ae = new c();
      M = setTimeout(
        () => ae.abort(),
        b.options.timeout
      ), b.options.signal = ae.signal;
    }
    try {
      b.response = await i(
        b.request,
        b.options
      );
    } catch (ae) {
      return b.error = ae, b.options.onRequestError && await b.options.onRequestError(b), await f(b);
    } finally {
      M && clearTimeout(M);
    }
    if (b.response.body && !ou.has(b.response.status) && b.options.method !== "HEAD") {
      const ae = (b.options.parseResponse ? "json" : b.options.responseType) || tu(b.response.headers.get("content-type") || "");
      switch (ae) {
        case "json": {
          const ut = await b.response.text(), O = b.options.parseResponse || fo;
          b.response._data = O(ut);
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
  }, T = async function(C, _) {
    return (await m(C, _))._data;
  };
  return T.raw = m, T.native = (...P) => i(...P), T.create = (P = {}) => da({
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
  onResponseError({ response: t, error: i }) {
    console.log("[LOG] ~ error:", i);
  },
  onRequest: ({ options: t, request: i }) => {
    const s = t.token;
    s && (t.headers = t.headers || {}, t.headers.Authorization = `${s}`);
  },
  onResponse({ response: t, options: i }) {
  }
}), du = (t) => (i, s) => (t.set(i, s), s), Ji = Number.MAX_SAFE_INTEGER === void 0 ? 9007199254740991 : Number.MAX_SAFE_INTEGER, fa = 536870912, Ki = fa * 2, fu = (t, i) => (s) => {
  const c = i.get(s);
  let f = c === void 0 ? s.size : c < Ki ? c + 1 : 0;
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
  const i = /* @__PURE__ */ new Map([[0, () => {
  }]]), s = /* @__PURE__ */ new Map([[0, () => {
  }]]), c = /* @__PURE__ */ new Map(), f = new Worker(t);
  return f.addEventListener("message", ({ data: _ }) => {
    if (hu(_)) {
      const { params: { timerId: b, timerType: M } } = _;
      if (M === "interval") {
        const F = i.get(b);
        if (typeof F === void 0)
          throw new Error("The timer is in an undefined state.");
        if (typeof F == "number") {
          const re = c.get(F);
          if (re === void 0 || re.timerId !== b || re.timerType !== M)
            throw new Error("The timer is in an undefined state.");
        } else typeof F == "function" && F();
      } else if (M === "timeout") {
        const F = s.get(b);
        if (typeof F === void 0)
          throw new Error("The timer is in an undefined state.");
        if (typeof F == "number") {
          const re = c.get(F);
          if (re === void 0 || re.timerId !== b || re.timerType !== M)
            throw new Error("The timer is in an undefined state.");
        } else typeof F == "function" && (F(), s.delete(b));
      }
    } else if (pu(_)) {
      const { id: b } = _, M = c.get(b);
      if (M === void 0)
        throw new Error("The timer is in an undefined state.");
      const { timerId: F, timerType: re } = M;
      c.delete(b), re === "interval" ? i.delete(F) : s.delete(F);
    } else {
      const { error: { message: b } } = _;
      throw new Error(b);
    }
  }), {
    clearInterval: (_) => {
      if (typeof i.get(_) == "function") {
        const b = vn(c);
        c.set(b, { timerId: _, timerType: "interval" }), i.set(_, b), f.postMessage({
          id: b,
          method: "clear",
          params: { timerId: _, timerType: "interval" }
        });
      }
    },
    clearTimeout: (_) => {
      if (typeof s.get(_) == "function") {
        const b = vn(c);
        c.set(b, { timerId: _, timerType: "timeout" }), s.set(_, b), f.postMessage({
          id: b,
          method: "clear",
          params: { timerId: _, timerType: "timeout" }
        });
      }
    },
    setInterval: (_, b = 0, ...M) => {
      const F = vn(i);
      return i.set(F, () => {
        _(...M), typeof i.get(F) == "function" && f.postMessage({
          id: null,
          method: "set",
          params: {
            delay: b,
            now: performance.timeOrigin + performance.now(),
            timerId: F,
            timerType: "interval"
          }
        });
      }), f.postMessage({
        id: null,
        method: "set",
        params: {
          delay: b,
          now: performance.timeOrigin + performance.now(),
          timerId: F,
          timerType: "interval"
        }
      }), F;
    },
    setTimeout: (_, b = 0, ...M) => {
      const F = vn(s);
      return s.set(F, () => _(...M)), f.postMessage({
        id: null,
        method: "set",
        params: {
          delay: b,
          now: performance.timeOrigin + performance.now(),
          timerId: F,
          timerType: "timeout"
        }
      }), F;
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
}, mu = `(()=>{"use strict";const e=new Map,t=new Map,r=t=>{const r=e.get(t);return void 0!==r&&(clearTimeout(r),e.delete(t),!0)},s=e=>{const r=t.get(e);return void 0!==r&&(clearTimeout(r),t.delete(e),!0)},o=(e,t)=>{const r=performance.now(),s=e+t-r-performance.timeOrigin;return{expected:r+s,remainingDelay:s}},i=(e,t,r,s)=>{const o=r-performance.now();o>0?e.set(t,setTimeout(i,o,e,t,r,s)):(e.delete(t),postMessage({id:null,method:"call",params:{timerId:t,timerType:s}}))};addEventListener("message",(n=>{let{data:a}=n;try{if("clear"===a.method){const{id:e,params:{timerId:t,timerType:o}}=a;if("interval"===o)postMessage({id:e,result:r(t)});else{if("timeout"!==o)throw new Error('The given type "'.concat(o,'" is not supported'));postMessage({id:e,result:s(t)})}}else{if("set"!==a.method)throw new Error('The given method "'.concat(a.method,'" is not supported'));{const{params:{delay:r,now:s,timerId:n,timerType:m}}=a;if("interval"===m)((t,r,s)=>{const{expected:n,remainingDelay:a}=o(t,s);e.set(r,setTimeout(i,a,e,r,n,"interval"))})(r,n,s);else{if("timeout"!==m)throw new Error('The given type "'.concat(m,'" is not supported'));((e,r,s)=>{const{expected:n,remainingDelay:a}=o(e,s);t.set(r,setTimeout(i,a,t,r,n,"timeout"))})(r,n,s)}}}}catch(e){postMessage({error:{message:e.message},id:a.id,result:null})}}))})();`, ha = wu(vu, mu), oo = (t) => ha().clearTimeout(t), io = (...t) => ha().setTimeout(...t);
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
const Yi = Object.assign, yu = Object.prototype.hasOwnProperty, lo = (t, i) => yu.call(t, i), Tr = Array.isArray, Hr = (t) => pa(t) === "[object Map]", Eu = (t) => typeof t == "string", Kr = (t) => typeof t == "symbol", Tn = (t) => t !== null && typeof t == "object", bu = Object.prototype.toString, pa = (t) => bu.call(t), va = (t) => pa(t).slice(8, -1), yo = (t) => Eu(t) && t !== "NaN" && t[0] !== "-" && "" + parseInt(t, 10) === t, Pu = (t) => {
  const i = /* @__PURE__ */ Object.create(null);
  return (s) => i[s] || (i[s] = t(s));
}, Tu = Pu((t) => t.charAt(0).toUpperCase() + t.slice(1)), xr = (t, i) => !Object.is(t, i);
var He = {};
function Or(t, ...i) {
  console.warn(`[Vue warn] ${t}`, ...i);
}
let he;
const ao = /* @__PURE__ */ new WeakSet();
class Zi {
  constructor(i) {
    this.fn = i, this.deps = void 0, this.depsTail = void 0, this.flags = 5, this.nextEffect = void 0, this.cleanup = void 0, this.scheduler = void 0;
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
    const i = he, s = Rt;
    he = this, Rt = !0;
    try {
      return this.fn();
    } finally {
      He.NODE_ENV !== "production" && he !== this && Or(
        "Active effect was not restored correctly - this is likely a Vue internal bug."
      ), ga(this), he = i, Rt = s, this.flags &= -3;
    }
  }
  stop() {
    if (this.flags & 1) {
      for (let i = this.deps; i; i = i.nextDep)
        Po(i);
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
    let i = Vr;
    for (Vr = void 0; i; ) {
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
    c.version === -1 ? (c === s && (s = c.prevDep), Po(c), Ou(c)) : i = c, c.dep.activeLink = c.prevActiveLink, c.prevActiveLink = void 0;
  t.deps = i, t.depsTail = s;
}
function ho(t) {
  for (let i = t.deps; i; i = i.nextDep)
    if (i.dep.version !== i.version || i.dep.computed && Ru(i.dep.computed) === !1 || i.dep.version !== i.version)
      return !0;
  return !!t._dirty;
}
function Ru(t) {
  if (t.flags & 2)
    return !1;
  if (t.flags & 4 && !(t.flags & 16) || (t.flags &= -17, t.globalVersion === Pn))
    return;
  t.globalVersion = Pn;
  const i = t.dep;
  if (t.flags |= 2, i.version > 0 && !t.isSSR && !ho(t)) {
    t.flags &= -3;
    return;
  }
  const s = he, c = Rt;
  he = t, Rt = !0;
  try {
    ma(t);
    const f = t.fn();
    (i.version === 0 || xr(f, t._value)) && (t._value = f, i.version++);
  } catch (f) {
    throw i.version++, f;
  } finally {
    he = s, Rt = c, ga(t), t.flags &= -3;
  }
}
function Po(t) {
  const { dep: i, prevSub: s, nextSub: c } = t;
  if (s && (s.nextSub = c, t.prevSub = void 0), c && (c.prevSub = s, t.nextSub = void 0), i.subs === t && (i.subs = s), !i.subs && i.computed) {
    i.computed.flags &= -5;
    for (let f = i.computed.deps; f; f = f.nextDep)
      Po(f);
  }
}
function Ou(t) {
  const { prevDep: i, nextDep: s } = t;
  i && (i.nextDep = s, t.prevDep = void 0), s && (s.prevDep = i, t.nextDep = void 0);
}
function Su(t, i) {
  t.effect instanceof Zi && (t = t.effect.fn);
  const s = new Zi(t);
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
function Qi(t) {
  const { cleanup: i } = t;
  if (t.cleanup = void 0, i) {
    const s = he;
    he = void 0;
    try {
      i();
    } finally {
      he = s;
    }
  }
}
let Pn = 0;
class Ea {
  constructor(i) {
    this.computed = i, this.version = 0, this.activeLink = void 0, this.subs = void 0, He.NODE_ENV !== "production" && (this.subsHead = void 0);
  }
  track(i) {
    if (!he || !Rt)
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
      const c = s.nextDep;
      c.prevDep = s.prevDep, s.prevDep && (s.prevDep.nextDep = c), s.prevDep = he.depsTail, s.nextDep = void 0, he.depsTail.nextDep = s, he.depsTail = s, he.deps === s && (he.deps = c);
    }
    return He.NODE_ENV !== "production" && he.onTrack && he.onTrack(
      Yi(
        {
          effect: he
        },
        i
      )
    ), s;
  }
  trigger(i) {
    this.version++, Pn++, this.notify(i);
  }
  notify(i) {
    Eo();
    try {
      if (He.NODE_ENV !== "production")
        for (let s = this.subsHead; s; s = s.nextSub)
          He.NODE_ENV !== "production" && s.sub.onTrigger && !(s.sub.flags & 8) && s.sub.onTrigger(
            Yi(
              {
                effect: s.sub
              },
              i
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
  const i = t.dep.computed;
  if (i && !t.dep.subs) {
    i.flags |= 20;
    for (let c = i.deps; c; c = c.nextDep)
      ba(c);
  }
  const s = t.dep.subs;
  s !== t && (t.prevSub = s, s && (s.nextSub = t)), He.NODE_ENV !== "production" && t.dep.subsHead === void 0 && (t.dep.subsHead = t), t.dep.subs = t;
}
const po = /* @__PURE__ */ new WeakMap(), sr = Symbol(
  He.NODE_ENV !== "production" ? "Object iterate" : ""
), vo = Symbol(
  He.NODE_ENV !== "production" ? "Map keys iterate" : ""
), Jr = Symbol(
  He.NODE_ENV !== "production" ? "Array iterate" : ""
);
function st(t, i, s) {
  if (Rt && he) {
    let c = po.get(t);
    c || po.set(t, c = /* @__PURE__ */ new Map());
    let f = c.get(s);
    f || c.set(s, f = new Ea()), He.NODE_ENV !== "production" ? f.track({
      target: t,
      type: i,
      key: s
    }) : f.track();
  }
}
function Yt(t, i, s, c, f, m) {
  const T = po.get(t);
  if (!T) {
    Pn++;
    return;
  }
  let P = [];
  if (i === "clear")
    P = [...T.values()];
  else {
    const C = Tr(t), _ = C && yo(s);
    if (C && s === "length") {
      const b = Number(c);
      T.forEach((M, F) => {
        (F === "length" || F === Jr || !Kr(F) && F >= b) && P.push(M);
      });
    } else {
      const b = (M) => M && P.push(M);
      switch (s !== void 0 && b(T.get(s)), _ && b(T.get(Jr)), i) {
        case "add":
          C ? _ && b(T.get("length")) : (b(T.get(sr)), Hr(t) && b(T.get(vo)));
          break;
        case "delete":
          C || (b(T.get(sr)), Hr(t) && b(T.get(vo)));
          break;
        case "set":
          Hr(t) && b(T.get(sr));
          break;
      }
    }
  }
  Eo();
  for (const C of P)
    He.NODE_ENV !== "production" ? C.trigger({
      target: t,
      type: i,
      key: s,
      newValue: c,
      oldValue: f,
      oldTarget: m
    }) : C.trigger();
  bo();
}
function yr(t) {
  const i = pe(t);
  return i === t ? i : (st(i, "iterate", Jr), Zt(t) ? i : i.map(it));
}
function To(t) {
  return st(t = pe(t), "iterate", Jr), t;
}
const Nu = {
  __proto__: null,
  [Symbol.iterator]() {
    return so(this, Symbol.iterator, it);
  },
  concat(...t) {
    return yr(this).concat(
      ...t.map((i) => Tr(i) ? yr(i) : i)
    );
  },
  entries() {
    return so(this, "entries", (t) => (t[1] = it(t[1]), t));
  },
  every(t, i) {
    return Mt(this, "every", t, i, void 0, arguments);
  },
  filter(t, i) {
    return Mt(this, "filter", t, i, (s) => s.map(it), arguments);
  },
  find(t, i) {
    return Mt(this, "find", t, i, it, arguments);
  },
  findIndex(t, i) {
    return Mt(this, "findIndex", t, i, void 0, arguments);
  },
  findLast(t, i) {
    return Mt(this, "findLast", t, i, it, arguments);
  },
  findLastIndex(t, i) {
    return Mt(this, "findLastIndex", t, i, void 0, arguments);
  },
  // flat, flatMap could benefit from ARRAY_ITERATE but are not straight-forward to implement
  forEach(t, i) {
    return Mt(this, "forEach", t, i, void 0, arguments);
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
  map(t, i) {
    return Mt(this, "map", t, i, void 0, arguments);
  },
  pop() {
    return qr(this, "pop");
  },
  push(...t) {
    return qr(this, "push", t);
  },
  reduce(t, ...i) {
    return Xi(this, "reduce", t, i);
  },
  reduceRight(t, ...i) {
    return Xi(this, "reduceRight", t, i);
  },
  shift() {
    return qr(this, "shift");
  },
  // slice could use ARRAY_ITERATE but also seems to beg for range tracking
  some(t, i) {
    return Mt(this, "some", t, i, void 0, arguments);
  },
  splice(...t) {
    return qr(this, "splice", t);
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
    return qr(this, "unshift", t);
  },
  values() {
    return so(this, "values", it);
  }
};
function so(t, i, s) {
  const c = To(t), f = c[i]();
  return c !== t && !Zt(t) && (f._next = f.next, f.next = () => {
    const m = f._next();
    return m.value && (m.value = s(m.value)), m;
  }), f;
}
const Cu = Array.prototype;
function Mt(t, i, s, c, f, m) {
  const T = To(t), P = T !== t && !Zt(t), C = T[i];
  if (C !== Cu[i]) {
    const M = C.apply(t, m);
    return P ? it(M) : M;
  }
  let _ = s;
  T !== t && (P ? _ = function(M, F) {
    return s.call(this, it(M), F, t);
  } : s.length > 2 && (_ = function(M, F) {
    return s.call(this, M, F, t);
  }));
  const b = C.call(T, _, c);
  return P && f ? f(b) : b;
}
function Xi(t, i, s, c) {
  const f = To(t);
  let m = s;
  return f !== t && (Zt(t) ? s.length > 3 && (m = function(T, P, C) {
    return s.call(this, T, P, C, t);
  }) : m = function(T, P, C) {
    return s.call(this, T, it(P), C, t);
  }), f[i](m, ...c);
}
function uo(t, i, s) {
  const c = pe(t);
  st(c, "iterate", Jr);
  const f = c[i](...s);
  return (f === -1 || f === !1) && Ku(s[0]) ? (s[0] = pe(s[0]), c[i](...s)) : f;
}
function qr(t, i, s = []) {
  xu(), Eo();
  const c = pe(t)[i].apply(t, s);
  return bo(), Du(), c;
}
const Iu = /* @__PURE__ */ gu("__proto__,__v_isRef,__isVue"), Pa = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((t) => t !== "arguments" && t !== "caller").map((t) => Symbol[t]).filter(Kr)
);
function Au(t) {
  Kr(t) || (t = String(t));
  const i = pe(this);
  return st(i, "has", t), i.hasOwnProperty(t);
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
    const T = Tr(i);
    if (!f) {
      let C;
      if (T && (C = Nu[s]))
        return C;
      if (s === "hasOwnProperty")
        return Au;
    }
    const P = Reflect.get(
      i,
      s,
      // if this is a proxy wrapping a ref, return methods using the raw ref
      // as receiver so that we don't have to call `toRaw` on the ref in all
      // its class methods
      Rr(i) ? i : c
    );
    return (Kr(s) ? Pa.has(s) : Iu(s)) || (f || st(i, "get", s), m) ? P : Rr(P) ? T && yo(s) ? P : P.value : Tn(P) ? f ? Na(P) : Da(P) : P;
  }
}
class Wu extends Ta {
  constructor(i = !1) {
    super(!1, i);
  }
  set(i, s, c, f) {
    let m = i[s];
    if (!this._isShallow) {
      const C = Sr(m);
      if (!Zt(c) && !Sr(c) && (m = pe(m), c = pe(c)), !Tr(i) && Rr(m) && !Rr(c))
        return C ? !1 : (m.value = c, !0);
    }
    const T = Tr(i) && yo(s) ? Number(s) < i.length : lo(i, s), P = Reflect.set(
      i,
      s,
      c,
      Rr(i) ? i : f
    );
    return i === pe(f) && (T ? xr(c, m) && Yt(i, "set", s, c, m) : Yt(i, "add", s, c)), P;
  }
  deleteProperty(i, s) {
    const c = lo(i, s), f = i[s], m = Reflect.deleteProperty(i, s);
    return m && c && Yt(i, "delete", s, void 0, f), m;
  }
  has(i, s) {
    const c = Reflect.has(i, s);
    return (!Kr(s) || !Pa.has(s)) && st(i, "has", s), c;
  }
  ownKeys(i) {
    return st(
      i,
      "iterate",
      Tr(i) ? "length" : sr
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
const Mu = /* @__PURE__ */ new Wu(), Fu = /* @__PURE__ */ new _u(), Ro = (t) => t, Rn = (t) => Reflect.getPrototypeOf(t);
function wn(t, i, s = !1, c = !1) {
  t = t.__v_raw;
  const f = pe(t), m = pe(i);
  s || (xr(i, m) && st(f, "get", i), st(f, "get", m));
  const { has: T } = Rn(f), P = c ? Ro : s ? Oo : it;
  if (T.call(f, i))
    return P(t.get(i));
  if (T.call(f, m))
    return P(t.get(m));
  t !== f && t.get(i);
}
function mn(t, i = !1) {
  const s = this.__v_raw, c = pe(s), f = pe(t);
  return i || (xr(t, f) && st(c, "has", t), st(c, "has", f)), t === f ? s.has(t) : s.has(t) || s.has(f);
}
function gn(t, i = !1) {
  return t = t.__v_raw, !i && st(pe(t), "iterate", sr), Reflect.get(t, "size", t);
}
function ki(t, i = !1) {
  !i && !Zt(t) && !Sr(t) && (t = pe(t));
  const s = pe(this);
  return Rn(s).has.call(s, t) || (s.add(t), Yt(s, "add", t, t)), this;
}
function ea(t, i, s = !1) {
  !s && !Zt(i) && !Sr(i) && (i = pe(i));
  const c = pe(this), { has: f, get: m } = Rn(c);
  let T = f.call(c, t);
  T ? He.NODE_ENV !== "production" && Oa(c, f, t) : (t = pe(t), T = f.call(c, t));
  const P = m.call(c, t);
  return c.set(t, i), T ? xr(i, P) && Yt(c, "set", t, i, P) : Yt(c, "add", t, i), this;
}
function ta(t) {
  const i = pe(this), { has: s, get: c } = Rn(i);
  let f = s.call(i, t);
  f ? He.NODE_ENV !== "production" && Oa(i, s, t) : (t = pe(t), f = s.call(i, t));
  const m = c ? c.call(i, t) : void 0, T = i.delete(t);
  return f && Yt(i, "delete", t, void 0, m), T;
}
function ra() {
  const t = pe(this), i = t.size !== 0, s = He.NODE_ENV !== "production" ? Hr(t) ? new Map(t) : new Set(t) : void 0, c = t.clear();
  return i && Yt(t, "clear", void 0, void 0, s), c;
}
function yn(t, i) {
  return function(c, f) {
    const m = this, T = m.__v_raw, P = pe(T), C = i ? Ro : t ? Oo : it;
    return !t && st(P, "iterate", sr), T.forEach((_, b) => c.call(f, C(_), C(b), m));
  };
}
function En(t, i, s) {
  return function(...c) {
    const f = this.__v_raw, m = pe(f), T = Hr(m), P = t === "entries" || t === Symbol.iterator && T, C = t === "keys" && T, _ = f[t](...c), b = s ? Ro : i ? Oo : it;
    return !i && st(
      m,
      "iterate",
      C ? vo : sr
    ), {
      // iterator protocol
      next() {
        const { value: M, done: F } = _.next();
        return F ? { value: M, done: F } : {
          value: P ? [b(M[0]), b(M[1])] : b(M),
          done: F
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
        pe(this)
      );
    }
    return t === "delete" ? !1 : t === "clear" ? void 0 : this;
  };
}
function zu() {
  const t = {
    get(m) {
      return wn(this, m);
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
  }, i = {
    get(m) {
      return wn(this, m, !1, !0);
    },
    get size() {
      return gn(this);
    },
    has: mn,
    add(m) {
      return ki.call(this, m, !0);
    },
    set(m, T) {
      return ea.call(this, m, T, !0);
    },
    delete: ta,
    clear: ra,
    forEach: yn(!1, !0)
  }, s = {
    get(m) {
      return wn(this, m, !0);
    },
    get size() {
      return gn(this, !0);
    },
    has(m) {
      return mn.call(this, m, !0);
    },
    add: Kt("add"),
    set: Kt("set"),
    delete: Kt("delete"),
    clear: Kt("clear"),
    forEach: yn(!0, !1)
  }, c = {
    get(m) {
      return wn(this, m, !0, !0);
    },
    get size() {
      return gn(this, !0);
    },
    has(m) {
      return mn.call(this, m, !0);
    },
    add: Kt("add"),
    set: Kt("set"),
    delete: Kt("delete"),
    clear: Kt("clear"),
    forEach: yn(!0, !0)
  };
  return [
    "keys",
    "values",
    "entries",
    Symbol.iterator
  ].forEach((m) => {
    t[m] = En(m, !1, !1), s[m] = En(m, !0, !1), i[m] = En(m, !1, !0), c[m] = En(
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
function Ra(t, i) {
  const s = i ? t ? Bu : Uu : t ? ju : Lu;
  return (c, f, m) => f === "__v_isReactive" ? !t : f === "__v_isReadonly" ? t : f === "__v_raw" ? c : Reflect.get(
    lo(s, f) && f in c ? s : c,
    f,
    m
  );
}
const $u = {
  get: /* @__PURE__ */ Ra(!1, !1)
}, qu = {
  get: /* @__PURE__ */ Ra(!0, !1)
};
function Oa(t, i, s) {
  const c = pe(s);
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
  return Sr(t) ? t : Ca(
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
  if (!Tn(t))
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
  const T = Ju(t);
  if (T === 0)
    return t;
  const P = new Proxy(
    t,
    T === 2 ? c : s
  );
  return f.set(t, P), P;
}
function Sr(t) {
  return !!(t && t.__v_isReadonly);
}
function Zt(t) {
  return !!(t && t.__v_isShallow);
}
function Ku(t) {
  return t ? !!t.__v_raw : !1;
}
function pe(t) {
  const i = t && t.__v_raw;
  return i ? pe(i) : t;
}
const it = (t) => Tn(t) ? Da(t) : t, Oo = (t) => Tn(t) ? Na(t) : t;
function Rr(t) {
  return t ? t.__v_isRef === !0 : !1;
}
function Ft(t) {
  return Yu(t, !1);
}
function Yu(t, i) {
  return Rr(t) ? t : new Zu(t, i);
}
class Zu {
  constructor(i, s) {
    this.dep = new Ea(), this.__v_isRef = !0, this.__v_isShallow = !1, this._rawValue = s ? i : pe(i), this._value = s ? i : it(i), this.__v_isShallow = s;
  }
  get value() {
    return He.NODE_ENV !== "production" ? this.dep.track({
      target: this,
      type: "get",
      key: "value"
    }) : this.dep.track(), this._value;
  }
  set value(i) {
    const s = this._rawValue, c = this.__v_isShallow || Zt(i) || Sr(i);
    i = c ? i : pe(i), xr(i, s) && (this._rawValue = i, this._value = c ? i : it(i), He.NODE_ENV !== "production" ? this.dep.trigger({
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
        var T = c[m] = {
          i: m,
          l: !1,
          exports: {}
        };
        return s[m].call(T.exports, T, T.exports, f), T.l = !0, T.exports;
      }
      return f.m = s, f.c = c, f.d = function(m, T, P) {
        f.o(m, T) || Object.defineProperty(m, T, {
          enumerable: !0,
          get: P
        });
      }, f.r = function(m) {
        typeof Symbol < "u" && Symbol.toStringTag && Object.defineProperty(m, Symbol.toStringTag, {
          value: "Module"
        }), Object.defineProperty(m, "__esModule", {
          value: !0
        });
      }, f.t = function(m, T) {
        if (1 & T && (m = f(m)), 8 & T || 4 & T && typeof m == "object" && m && m.__esModule) return m;
        var P = /* @__PURE__ */ Object.create(null);
        if (f.r(P), Object.defineProperty(P, "default", {
          enumerable: !0,
          value: m
        }), 2 & T && typeof m != "string") for (var C in m) f.d(P, C, (function(_) {
          return m[_];
        }).bind(null, C));
        return P;
      }, f.n = function(m) {
        var T = m && m.__esModule ? function() {
          return m.default;
        } : function() {
          return m;
        };
        return f.d(T, "a", T), T;
      }, f.o = function(m, T) {
        return {}.hasOwnProperty.call(m, T);
      }, f.p = "", f(f.s = 0);
    }([function(s, c, f) {
      f.r(c), f.d(c, "PopupOpenError", function() {
        return Fn;
      }), f.d(c, "create", function() {
        return as;
      }), f.d(c, "destroy", function() {
        return ss;
      }), f.d(c, "destroyComponents", function() {
        return Ci;
      }), f.d(c, "destroyAll", function() {
        return Ii;
      }), f.d(c, "PROP_TYPE", function() {
        return ve;
      }), f.d(c, "PROP_SERIALIZATION", function() {
        return ln;
      }), f.d(c, "CONTEXT", function() {
        return Oe;
      }), f.d(c, "EVENT", function() {
        return Ee;
      });
      function m(e, r) {
        return (m = Object.setPrototypeOf || function(n, o) {
          return n.__proto__ = o, n;
        })(e, r);
      }
      function T(e, r) {
        e.prototype = Object.create(r.prototype), e.prototype.constructor = e, m(e, r);
      }
      function P() {
        return (P = Object.assign || function(e) {
          for (var r = 1; r < arguments.length; r++) {
            var n = arguments[r];
            for (var o in n) ({}).hasOwnProperty.call(n, o) && (e[o] = n[o]);
          }
          return e;
        }).apply(this, arguments);
      }
      function C(e) {
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
      var _ = [], b = [], M = 0, F;
      function re() {
        if (!M && F) {
          var e = F;
          F = null, e.resolve();
        }
      }
      function ae() {
        M += 1;
      }
      function ut() {
        M -= 1, re();
      }
      var O = function() {
        function e(n) {
          var o = this;
          if (this.resolved = void 0, this.rejected = void 0, this.errorHandled = void 0, this.value = void 0, this.error = void 0, this.handlers = void 0, this.dispatching = void 0, this.stack = void 0, this.resolved = !1, this.rejected = !1, this.errorHandled = !1, this.handlers = [], n) {
            var a, u, d = !1, h = !1, l = !1;
            ae();
            try {
              n(function(v) {
                l ? o.resolve(v) : (d = !0, a = v);
              }, function(v) {
                l ? o.reject(v) : (h = !0, u = v);
              });
            } catch (v) {
              ut(), this.reject(v);
              return;
            }
            ut(), l = !0, d ? this.resolve(a) : h && this.reject(u);
          }
        }
        var r = e.prototype;
        return r.resolve = function(n) {
          if (this.resolved || this.rejected) return this;
          if (C(n)) throw new Error("Can not resolve promise with another promise");
          return this.resolved = !0, this.value = n, this.dispatch(), this;
        }, r.reject = function(n) {
          var o = this;
          if (this.resolved || this.rejected) return this;
          if (C(n)) throw new Error("Can not reject promise with another promise");
          if (!n) {
            var a = n && typeof n.toString == "function" ? n.toString() : {}.toString.call(n);
            n = new Error("Expected reject to be called with Error, got " + a);
          }
          return this.rejected = !0, this.error = n, this.errorHandled || setTimeout(function() {
            o.errorHandled || function(u, d) {
              if (_.indexOf(u) === -1) {
                _.push(u), setTimeout(function() {
                  throw u;
                }, 1);
                for (var h = 0; h < b.length; h++) b[h](u, d);
              }
            }(n, o);
          }, 1), this.dispatch(), this;
        }, r.asyncReject = function(n) {
          return this.errorHandled = !0, this.reject(n), this;
        }, r.dispatch = function() {
          var n = this.resolved, o = this.rejected, a = this.handlers;
          if (!this.dispatching && (n || o)) {
            this.dispatching = !0, ae();
            for (var u = function(g, E) {
              return g.then(function(R) {
                E.resolve(R);
              }, function(R) {
                E.reject(R);
              });
            }, d = 0; d < a.length; d++) {
              var h = a[d], l = h.onSuccess, v = h.onError, y = h.promise, w = void 0;
              if (n) try {
                w = l ? l(this.value) : this.value;
              } catch (g) {
                y.reject(g);
                continue;
              }
              else if (o) {
                if (!v) {
                  y.reject(this.error);
                  continue;
                }
                try {
                  w = v(this.error);
                } catch (g) {
                  y.reject(g);
                  continue;
                }
              }
              if (w instanceof e && (w.resolved || w.rejected)) {
                var p = w;
                p.resolved ? y.resolve(p.value) : y.reject(p.error), p.errorHandled = !0;
              } else C(w) ? w instanceof e && (w.resolved || w.rejected) ? w.resolved ? y.resolve(w.value) : y.reject(w.error) : u(w, y) : y.resolve(w);
            }
            a.length = 0, this.dispatching = !1, ut();
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
          return n instanceof e ? n : C(n) ? new e(function(o, a) {
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
          for (var d = function(v, y, w) {
            return y.then(function(p) {
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
            } else if (!C(l)) {
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
              C(l) ? a.push(l.then(function(v) {
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
            return b.push(o), {
              cancel: function() {
                b.splice(b.indexOf(o), 1);
              }
            };
          }(n);
        }, e.try = function(n, o, a) {
          if (n && typeof n != "function" && !n.call) throw new Error("Promise.try expected a function");
          var u;
          ae();
          try {
            u = n.apply(o, a || []);
          } catch (d) {
            return ut(), e.reject(d);
          }
          return ut(), e.resolve(u);
        }, e.delay = function(n) {
          return new e(function(o) {
            setTimeout(o, n);
          });
        }, e.isPromise = function(n) {
          return !!(n && n instanceof e) || C(n);
        }, e.flush = function() {
          return function(n) {
            var o = F = F || new n();
            return re(), o;
          }(e);
        }, e;
      }();
      function mt(e) {
        return {}.toString.call(e) === "[object RegExp]";
      }
      var Ze = {
        IFRAME: "iframe",
        POPUP: "popup"
      }, yt = `Call was rejected by callee.\r
`;
      function ur(e) {
        return e === void 0 && (e = window), e.location.protocol;
      }
      function zt(e) {
        if (e === void 0 && (e = window), e.mockDomain) {
          var r = e.mockDomain.split("//")[0];
          if (r) return r;
        }
        return ur(e);
      }
      function cr(e) {
        return e === void 0 && (e = window), zt(e) === "about:";
      }
      function ie(e) {
        if (e === void 0 && (e = window), e) try {
          if (e.parent && e.parent !== e) return e.parent;
        } catch {
        }
      }
      function We(e) {
        if (e === void 0 && (e = window), e && !ie(e)) try {
          return e.opener;
        } catch {
        }
      }
      function Et(e) {
        try {
          return !0;
        } catch {
        }
        return !1;
      }
      function Ot(e) {
        e === void 0 && (e = window);
        var r = e.location;
        if (!r) throw new Error("Can not read window location");
        var n = ur(e);
        if (!n) throw new Error("Can not read window protocol");
        if (n === "file:") return "file://";
        if (n === "about:") {
          var o = ie(e);
          return o && Et() ? Ot(o) : "about://";
        }
        var a = r.host;
        if (!a) throw new Error("Can not read window host");
        return n + "//" + a;
      }
      function D(e) {
        e === void 0 && (e = window);
        var r = Ot(e);
        return r && e.mockDomain && e.mockDomain.indexOf("mock:") === 0 ? e.mockDomain : r;
      }
      function j(e) {
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
            if (cr(r) && Et()) return !0;
          } catch {
          }
          try {
            if (function(o) {
              return o === void 0 && (o = window), zt(o) === "mock:";
            }(r) && Et()) return !0;
          } catch {
          }
          try {
            if (Ot(r) === Ot(window)) return !0;
          } catch {
          }
          return !1;
        }(e)) return !1;
        try {
          if (e === window || cr(e) && Et() || D(window) === D(e)) return !0;
        } catch {
        }
        return !1;
      }
      function J(e) {
        if (!j(e)) throw new Error("Expected window to be same domain");
        return e;
      }
      function we(e, r) {
        if (!e || !r) return !1;
        var n = ie(r);
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
      function et(e) {
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
      function Je(e) {
        for (var r = [], n = 0, o = et(e); n < o.length; n++) {
          var a = o[n];
          r.push(a);
          for (var u = 0, d = Je(a); u < d.length; u++) r.push(d[u]);
        }
        return r;
      }
      function Ke(e) {
        e === void 0 && (e = window);
        try {
          if (e.top) return e.top;
        } catch {
        }
        if (ie(e) === e) return e;
        try {
          if (we(window, e) && window.top) return window.top;
        } catch {
        }
        try {
          if (we(e, window) && window.top) return window.top;
        } catch {
        }
        for (var r = 0, n = Je(e); r < n.length; r++) {
          var o = n[r];
          try {
            if (o.top) return o.top;
          } catch {
          }
          if (ie(o) === o) return o;
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
          return !a || a.message !== yt;
        }
        if (r && j(e)) try {
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
        }(Qe, e);
        if (n !== -1) {
          var o = Yr[n];
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
      function dr(e) {
        return (e = e || window).navigator.mockUserAgent || e.navigator.userAgent;
      }
      function fr(e, r) {
        for (var n = et(e), o = 0; o < n.length; o++) {
          var a = n[o];
          try {
            if (j(a) && a.name === r && n.indexOf(a) !== -1) return a;
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
        return e === We(r);
      }
      function Qt(e) {
        return e === void 0 && (e = window), We(e = e || window) || ie(e) || void 0;
      }
      function Nr(e, r) {
        for (var n = 0; n < e.length; n++)
          for (var o = e[n], a = 0; a < r.length; a++) if (o === r[a]) return !0;
        return !1;
      }
      function lr(e) {
        e === void 0 && (e = window);
        for (var r = 0, n = e; n; ) (n = ie(n)) && (r += 1);
        return r;
      }
      function Zr(e, r) {
        var n = Ke(e) || e, o = Ke(r) || r;
        try {
          if (n && o) return n === o;
        } catch {
        }
        var a = Re(e), u = Re(r);
        if (Nr(a, u)) return !0;
        var d = We(n), h = We(o);
        return d && Nr(Re(d), u) || h && Nr(Re(h), a), !1;
      }
      function ct(e, r) {
        if (typeof e == "string") {
          if (typeof r == "string") return e === "*" || r === e;
          if (mt(r) || Array.isArray(r)) return !1;
        }
        return mt(e) ? mt(r) ? e.toString() === r.toString() : !Array.isArray(r) && !!r.match(e) : !!Array.isArray(e) && (Array.isArray(r) ? JSON.stringify(e) === JSON.stringify(r) : !mt(r) && e.some(function(n) {
          return ct(n, r);
        }));
      }
      function Nt(e) {
        return e.match(/^(https?|mock|file):\/\//) ? e.split("/").slice(0, 3).join("/") : D();
      }
      function So(e, r, n, o) {
        n === void 0 && (n = 1e3), o === void 0 && (o = 1 / 0);
        var a;
        return function u() {
          if (xe(e))
            return a && clearTimeout(a), r();
          o <= 0 ? clearTimeout(a) : (o -= n, a = setTimeout(u, n));
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
          if (r && r.message === yt) return !0;
        }
        try {
          if ({}.toString.call(e) === "[object Window]") return !0;
        } catch (r) {
          if (r && r.message === yt) return !0;
        }
        try {
          if (window.Window && e instanceof window.Window) return !0;
        } catch (r) {
          if (r && r.message === yt) return !0;
        }
        try {
          if (e && e.self === e) return !0;
        } catch (r) {
          if (r && r.message === yt) return !0;
        }
        try {
          if (e && e.parent === e) return !0;
        } catch (r) {
          if (r && r.message === yt) return !0;
        }
        try {
          if (e && e.top === e) return !0;
        } catch (r) {
          if (r && r.message === yt) return !0;
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
        if (r = Nt(e), r.indexOf("mock:") !== 0) return e;
        var r;
        throw new Error("Mock urls not supported out of test mode");
      }
      function xo(e) {
        if (j(e)) return J(e).frameElement;
        for (var r = 0, n = document.querySelectorAll("iframe"); r < n.length; r++) {
          var o = n[r];
          if (o && o.contentWindow && o.contentWindow === e) return o;
        }
      }
      function Do(e) {
        if (function(n) {
          return n === void 0 && (n = window), !!ie(n);
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
            if (Xt(u) && xe(u)) {
              if (n) try {
                n.delete(u);
              } catch {
              }
              o.splice(a, 1), this.values.splice(a, 1), a -= 1;
            }
          }
        }, r.isSafeToReadWrite = function(n) {
          return !Xt(n);
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
          var h = this.keys, l = this.values, v = Qr(h, n);
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
          var u = Qr(this.keys, n);
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
          var u = this.keys, d = Qr(u, n);
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
          return this._cleanupClosedWindows(), Qr(this.keys, n) !== -1;
        }, r.getOrSet = function(n, o) {
          if (this.has(n)) return this.get(n);
          var a = o();
          return this.set(n, a), a;
        }, e;
      }();
      function No(e) {
        return (No = Object.setPrototypeOf ? Object.getPrototypeOf : function(r) {
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
      function Co(e, r, n) {
        return (Co = Wa() ? Reflect.construct : function(o, a, u) {
          var d = [null];
          d.push.apply(d, a);
          var h = new (Function.bind.apply(o, d))();
          return u && m(h, u.prototype), h;
        }).apply(null, arguments);
      }
      function Io(e) {
        var r = typeof Map == "function" ? /* @__PURE__ */ new Map() : void 0;
        return (Io = function(n) {
          if (n === null || (o = n, Function.toString.call(o).indexOf("[native code]") === -1)) return n;
          var o;
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
          }), m(a, n);
        })(e);
      }
      function Sn(e) {
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
            return typeof n == "function" ? "memoize[" + function(o) {
              if (kr = kr || new Xr(), o == null || typeof o != "object" && typeof o != "function") throw new Error("Invalid object");
              var a = kr.get(o);
              return a || (a = typeof o + ":" + Xe(), kr.set(o, a)), a;
            }(n) + "]" : Sn(n) ? {} : n;
          });
        } catch {
          throw new Error("Arguments not serializable -- can not be used to memoize");
        }
      }
      function _a() {
        return {};
      }
      var Cr = 0, Ao = 0;
      function Lt(e, r) {
        r === void 0 && (r = {});
        var n = r.thisNamespace, o = n !== void 0 && n, a = r.time, u, d, h = Cr;
        Cr += 1;
        var l = function() {
          for (var v = arguments.length, y = new Array(v), w = 0; w < v; w++) y[w] = arguments[w];
          h < Ao && (u = null, d = null, h = Cr, Cr += 1);
          var p;
          p = o ? (d = d || new Xr()).getOrSet(this, _a) : u = u || {};
          var g;
          try {
            g = Cn(y);
          } catch {
            return e.apply(this, arguments);
          }
          var E = p[g];
          if (E && a && Date.now() - E.time < a && (delete p[g], E = null), E) return E.value;
          var R = Date.now(), S = e.apply(this, arguments);
          return p[g] = {
            time: R,
            value: S
          }, S;
        };
        return l.reset = function() {
          u = null, d = null;
        }, Dn(l, (r.name || xn(e)) + "::memoized");
      }
      Lt.clear = function() {
        Ao = Cr;
      };
      function Ma(e) {
        var r = {};
        function n() {
          for (var o = arguments, a = this, u = arguments.length, d = new Array(u), h = 0; h < u; h++) d[h] = arguments[h];
          var l = Cn(d);
          return r.hasOwnProperty(l) || (r[l] = O.try(function() {
            return e.apply(a, o);
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
            var n = e && e.stack, o = e && e.message;
            if (n && o) return n.indexOf(o) !== -1 ? n : o + `
` + n;
            if (n) return n;
            if (o) return o;
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
      Lt(function(e) {
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
      function In(e) {
        return e.replace(/-([a-z])/g, function(r) {
          return r[1].toUpperCase();
        });
      }
      function Wo(e, r, n) {
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
      function An(e) {
        return [].slice.call(e);
      }
      function _o(e) {
        return typeof (r = e) == "object" && r !== null && {}.toString.call(e) === "[object Object]";
        var r;
      }
      function Wn(e) {
        if (!_o(e)) return !1;
        var r = e.constructor;
        if (typeof r != "function") return !1;
        var n = r.prototype;
        return !!_o(n) && !!n.hasOwnProperty("isPrototypeOf");
      }
      function rn(e, r, n) {
        if (n === void 0 && (n = ""), Array.isArray(e)) {
          for (var o = e.length, a = [], u = function(y) {
            Wo(a, y, function() {
              var w = n ? n + "." + y : "" + y, p = r(e[y], y, w);
              return (Wn(p) || Array.isArray(p)) && (p = rn(p, r, w)), p;
            });
          }, d = 0; d < o; d++) u(d);
          return a;
        }
        if (Wn(e)) {
          var h = {}, l = function(y) {
            if (!e.hasOwnProperty(y)) return 1;
            Wo(h, y, function() {
              var w = n ? n + "." + y : "" + y, p = r(e[y], y, w);
              return (Wn(p) || Array.isArray(p)) && (p = rn(p, r, w)), p;
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
      function _n(e) {
        return {}.toString.call(e) === "[object RegExp]";
      }
      function Ar(e, r, n) {
        if (e.hasOwnProperty(r)) return e[r];
        var o = n();
        return e[r] = o, o;
      }
      function nn(e) {
        var r = [], n = !1, o, a = {
          set: function(u, d) {
            return n || (e[u] = d, a.register(function() {
              delete e[u];
            })), d;
          },
          register: function(u) {
            var d = en(function() {
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
            return O.all(d).then(ye);
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
          var o;
          return (o = e.call(this, n) || this).name = o.constructor.name, typeof Error.captureStackTrace == "function" ? Error.captureStackTrace(function(a) {
            if (a === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return a;
          }(o), o.constructor) : o.stack = new Error(n).stack, o;
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
      Lt(function() {
        return new O(function(e) {
          if (an() || Fo()) return e();
          var r = setInterval(function() {
            if (an() || Fo())
              return clearInterval(r), e();
          }, 10);
        });
      });
      function Lo(e) {
        return function(r, n, o) {
          o === void 0 && (o = []);
          var a = r.__inline_memoize_cache__ = r.__inline_memoize_cache__ || {}, u = Cn(o);
          return a.hasOwnProperty(u) ? a[u] : a[u] = (function() {
            var d = {};
            if (!e || e.indexOf("=") === -1) return d;
            for (var h = 0, l = e.split("&"); h < l.length; h++) {
              var v = l[h];
              (v = v.split("="))[0] && v[1] && (d[decodeURIComponent(v[0])] = decodeURIComponent(v[1]));
            }
            return d;
          }).apply(void 0, o);
        }(Lo, 0, [e]);
      }
      function jo(e, r) {
        return r === void 0 && (r = {}), r && Object.keys(r).length ? function(n) {
          return n === void 0 && (n = {}), Object.keys(n).filter(function(o) {
            return typeof n[o] == "string" || typeof n[o] == "boolean";
          }).map(function(o) {
            var a = n[o];
            if (typeof a != "string" && typeof a != "boolean") throw new TypeError("Invalid type for query");
            return zo(o) + "=" + zo(a.toString());
          }).join("&");
        }(P({}, Lo(e), r)) : e;
      }
      function La(e, r) {
        e.appendChild(r);
      }
      function Mn(e, r) {
        return r === void 0 && (r = document), Sn(e) ? e : typeof e == "string" ? r.querySelector(e) : void 0;
      }
      function Uo(e) {
        return new O(function(r, n) {
          var o = tn(e), a = Mn(e);
          if (a) return r(a);
          if (an()) return n(new Error("Document is ready and element " + o + " does not exist"));
          var u = setInterval(function() {
            if (a = Mn(e))
              r(a), clearInterval(u);
            else if (an())
              return clearInterval(u), n(new Error("Document is ready and element " + o + " does not exist"));
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
      function Bo(e) {
        if ((sn = sn || new Xr()).has(e)) {
          var r = sn.get(e);
          if (r) return r;
        }
        var n = new O(function(o, a) {
          e.addEventListener("load", function() {
            (function(u) {
              if (function() {
                for (var d = 0; d < Qe.length; d++) {
                  var h = !1;
                  try {
                    h = Qe[d].closed;
                  } catch {
                  }
                  h && (Yr.splice(d, 1), Qe.splice(d, 1));
                }
              }(), u && u.contentWindow) try {
                Qe.push(u.contentWindow), Yr.push(u);
              } catch {
              }
            })(e), o(e);
          }), e.addEventListener("error", function(u) {
            e.contentWindow ? o(e) : a(u);
          });
        });
        return sn.set(e, n), n;
      }
      function zn(e) {
        return Bo(e).then(function(r) {
          if (!r.contentWindow) throw new Error("Could not find window in iframe");
          return r.contentWindow;
        });
      }
      function $o(e, r) {
        e === void 0 && (e = {});
        var n = e.style || {}, o = function(u, d, h) {
          u === void 0 && (u = "div"), d === void 0 && (d = {}), u = u.toLowerCase();
          var l = document.createElement(u);
          if (d.style && pr(l.style, d.style), d.class && (l.className = d.class.join(" ")), d.id && l.setAttribute("id", d.id), d.attributes) for (var v = 0, y = Object.keys(d.attributes); v < y.length; v++) {
            var w = y[v];
            l.setAttribute(w, d.attributes[w]);
          }
          if (d.styleSheet && function(p, g, E) {
            E === void 0 && (E = window.document), p.styleSheet ? p.styleSheet.cssText = g : p.appendChild(E.createTextNode(g));
          }(l, d.styleSheet), d.html) {
            if (u === "iframe") throw new Error("Iframe html can not be written unless container provided and iframe in DOM");
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
        return o.hasAttribute("id") || o.setAttribute("id", Xe()), Bo(o), (e.url || a) && o.setAttribute("src", e.url || "about:blank"), o;
      }
      function qo(e, r, n) {
        return e.addEventListener(r, n), {
          cancel: function() {
            e.removeEventListener(r, n);
          }
        };
      }
      function ja(e) {
        e.style.setProperty("display", "");
      }
      function Ho(e) {
        e.style.setProperty("display", "none", "important");
      }
      function Wr(e) {
        e && e.parentNode && e.parentNode.removeChild(e);
      }
      function vr(e) {
        return !(e && e.parentNode && e.ownerDocument && e.ownerDocument.documentElement && e.ownerDocument.documentElement.contains(e));
      }
      function Vo(e, r, n) {
        var o = n === void 0 ? {} : n, a = o.width, u = a === void 0 || a, d = o.height, h = d === void 0 || d, l = o.interval, v = l === void 0 ? 100 : l, y = o.win, w = y === void 0 ? window : y, p = e.offsetWidth, g = e.offsetHeight, E = !1;
        r({
          width: p,
          height: g
        });
        var R = function() {
          if (!E && function(A) {
            return !!(A.offsetWidth || A.offsetHeight || A.getClientRects().length);
          }(e)) {
            var z = e.offsetWidth, V = e.offsetHeight;
            (u && z !== p || h && V !== g) && r({
              width: z,
              height: V
            }), p = z, g = V;
          }
        }, S, I;
        return w.addEventListener("resize", R), w.ResizeObserver !== void 0 ? ((S = new w.ResizeObserver(R)).observe(e), I = Ir(R, 10 * v)) : w.MutationObserver !== void 0 ? ((S = new w.MutationObserver(R)).observe(e, {
          attributes: !0,
          childList: !0,
          subtree: !0,
          characterData: !1
        }), I = Ir(R, 10 * v)) : I = Ir(R, v), {
          cancel: function() {
            E = !0, S.disconnect(), window.removeEventListener("resize", R), I.cancel();
          }
        };
      }
      function Ln(e) {
        for (; e.parentNode; ) e = e.parentNode;
        return e.toString() === "[object ShadowRoot]";
      }
      var un = typeof document < "u" ? document.currentScript : null, Ua = Lt(function() {
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
            for (var o = 0, a = [].slice.call(document.getElementsByTagName("script")).reverse(); o < a.length; o++) {
              var u = a[o];
              if (u.src && u.src === n) return u;
            }
          } catch {
          }
        }())) return un;
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
      function Jo(e) {
        return typeof e == "string" && /^[0-9]+%$/.test(e);
      }
      function jn(e) {
        if (typeof e == "number") return e;
        var r = e.match(/^([0-9]+)(px|%)$/);
        if (!r) throw new Error("Could not match css value from " + e);
        return parseInt(r[1], 10);
      }
      function Ko(e) {
        return jn(e) + "px";
      }
      function Yo(e) {
        return typeof e == "number" ? Ko(e) : Jo(e) ? e : Ko(e);
      }
      function Zo(e, r) {
        if (typeof e == "number") return e;
        if (Jo(e)) return parseInt(r * jn(e) / 100, 10);
        if (typeof (n = e) == "string" && /^[0-9]+px$/.test(n)) return jn(e);
        var n;
        throw new Error("Can not normalize dimension: " + e);
      }
      function St(e) {
        e === void 0 && (e = window);
        var r = "__post_robot_11_0_0__";
        return e !== window ? e[r] : e[r] = e[r] || {};
      }
      var Qo = function() {
        return {};
      };
      function fe(e, r) {
        return e === void 0 && (e = "store"), r === void 0 && (r = Qo), Ar(St(), e, function() {
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
              return Ar(n, o, a);
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
      function cn() {
        var e = St();
        return e.WINDOW_WILDCARD = e.WINDOW_WILDCARD || new $a(), e.WINDOW_WILDCARD;
      }
      function Ye(e, r) {
        return e === void 0 && (e = "store"), r === void 0 && (r = Qo), fe("windowStore").getOrSet(e, function() {
          var n = new Xr(), o = function(a) {
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
              return Ar(o(a), e, u);
            }
          };
        });
      }
      function Xo() {
        return fe("instance").getOrSet("instanceID", Xe);
      }
      function ko(e, r) {
        var n = r.domain, o = Ye("helloPromises"), a = o.get(e);
        a && a.resolve({
          domain: n
        });
        var u = O.resolve({
          domain: n
        });
        return o.set(e, u), u;
      }
      function Un(e, r) {
        return (0, r.send)(e, "postrobot_hello", {
          instanceID: Xo()
        }, {
          domain: "*",
          timeout: -1
        }).then(function(n) {
          var o = n.origin, a = n.data.instanceID;
          return ko(e, {
            domain: o
          }), {
            win: e,
            domain: o,
            instanceID: a
          };
        });
      }
      function ei(e, r) {
        var n = r.send;
        return Ye("windowInstanceIDPromises").getOrSet(e, function() {
          return Un(e, {
            send: n
          }).then(function(o) {
            return o.instanceID;
          });
        });
      }
      function ti(e, r, n) {
        r === void 0 && (r = 5e3), n === void 0 && (n = "Window");
        var o = function(a) {
          return Ye("helloPromises").getOrSet(a, function() {
            return new O();
          });
        }(e);
        return r !== -1 && (o = o.timeout(r, new Error(n + " did not load after " + r + "ms"))), o;
      }
      function ri(e) {
        Ye("knownWindows").set(e, !0);
      }
      function Bn(e) {
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
      var dt, qa = ((dt = {}).function = function() {
      }, dt.error = function(e) {
        return kt("error", {
          message: e.message,
          stack: e.stack,
          code: e.code,
          data: e.data
        });
      }, dt.promise = function() {
      }, dt.regex = function(e) {
        return kt("regex", e.source);
      }, dt.date = function(e) {
        return kt("date", e.toJSON());
      }, dt.array = function(e) {
        return e;
      }, dt.object = function(e) {
        return e;
      }, dt.string = function(e) {
        return e;
      }, dt.number = function(e) {
        return e;
      }, dt.boolean = function(e) {
        return e;
      }, dt.null = function(e) {
        return e;
      }, dt[void 0] = function(e) {
        return kt("undefined", e);
      }, dt), Ha = {}, ft, Va = ((ft = {}).function = function() {
        throw new Error("Function serialization is not implemented; nothing to deserialize");
      }, ft.error = function(e) {
        var r = e.stack, n = e.code, o = e.data, a = new Error(e.message);
        return a.code = n, o && (a.data = o), a.stack = r + `

` + a.stack, a;
      }, ft.promise = function() {
        throw new Error("Promise serialization is not implemented; nothing to deserialize");
      }, ft.regex = function(e) {
        return new RegExp(e);
      }, ft.date = function(e) {
        return new Date(e);
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
      }, ft[void 0] = function() {
      }, ft), Ga = {};
      function $n() {
        return !!dr(window).match(/MSIE|trident|edge\/12|edge\/13/i);
      }
      function oi(e) {
        return !Zr(window, e);
      }
      function ii(e, r) {
        if (e) {
          if (D() !== Nt(e)) return !0;
        } else if (r && !j(r)) return !0;
        return !1;
      }
      function ai(e) {
        var r = e.win, n = e.domain;
        return !(!$n() || n && !ii(n, r) || r && !oi(r));
      }
      function qn(e) {
        return "__postrobot_bridge___" + (e = e || Nt(e)).replace(/[^a-zA-Z0-9]+/g, "_");
      }
      function si() {
        return !!(window.name && window.name === qn(D()));
      }
      var Ja = new O(function(e) {
        if (window.document && window.document.body) return e(window.document.body);
        var r = setInterval(function() {
          if (window.document && window.document.body)
            return clearInterval(r), e(window.document.body);
        }, 10);
      });
      function ui(e) {
        Ye("remoteWindowPromises").getOrSet(e, function() {
          return new O();
        });
      }
      function Hn(e) {
        var r = Ye("remoteWindowPromises").get(e);
        if (!r) throw new Error("Remote window promise not found");
        return r;
      }
      function ci(e, r, n) {
        Hn(e).resolve(function(o, a, u) {
          if (o !== e) throw new Error("Remote window does not match window");
          if (!ct(a, r)) throw new Error("Remote domain " + a + " does not match domain " + r);
          n.fireAndForget(u);
        });
      }
      function Vn(e, r) {
        Hn(e).reject(r).catch(ye);
      }
      function dn(e) {
        for (var r = e.win, n = e.name, o = e.domain, a = fe("popupWindowsByName"), u = Ye("popupWindowsByWin"), d = 0, h = a.keys(); d < h.length; d++) {
          var l = h[d], v = a.get(l);
          v && !xe(v.win) || a.del(l);
        }
        if (xe(r)) return {
          win: r,
          name: n,
          domain: o
        };
        var y = u.getOrSet(r, function() {
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
        return n && (y.name = n, a.set(n, y)), o && (y.domain = o, ui(r)), u.set(r, y), y;
      }
      function di(e) {
        var r = e.on, n = e.send, o = e.receiveMessage;
        a = window.open, window.open = function(u, d, h, l) {
          var v = a.call(this, On(u), d, h, l);
          return v && (dn({
            win: v,
            name: d,
            domain: u ? Nt(u) : null
          }), v);
        };
        var a;
        (function(u) {
          var d = u.on, h = u.send, l = u.receiveMessage, v = fe("popupWindowsByName");
          d("postrobot_open_tunnel", function(y) {
            var w = y.source, p = y.origin, g = y.data, E = fe("bridges").get(p);
            if (!E) throw new Error("Can not find bridge promise for domain " + p);
            return E.then(function(R) {
              if (w !== R) throw new Error("Message source does not matched registered bridge for domain " + p);
              if (!g.name) throw new Error("Register window expected to be passed window name");
              if (!g.sendMessage) throw new Error("Register window expected to be passed sendMessage method");
              if (!v.has(g.name)) throw new Error("Window with name " + g.name + " does not exist, or was not opened by this window");
              var S = function() {
                return v.get(g.name);
              };
              if (!S().domain) throw new Error("We do not have a registered domain for window " + g.name);
              if (S().domain !== p) throw new Error("Message origin " + p + " does not matched registered window origin " + (S().domain || "unknown"));
              return ci(S().win, p, g.sendMessage), {
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
                      O.reject(V);
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
            var l = h.name, v = h.source, y = h.canary, w = h.sendMessage, p = fe("tunnelWindows"), g = ie(window);
            if (!g) throw new Error("No parent window found to open tunnel to");
            var E = function(R) {
              var S = R.name, I = R.source, z = R.canary, V = R.sendMessage;
              (function() {
                for (var q = fe("tunnelWindows"), L = 0, X = q.keys(); L < X.length; L++) {
                  var $ = X[L];
                  xe(q[$].source) && q.del($);
                }
              })();
              var A = Xe();
              return fe("tunnelWindows").set(A, {
                name: S,
                source: I,
                canary: z,
                sendMessage: V
              }), A;
            }({
              name: l,
              source: v,
              canary: y,
              sendMessage: w
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
        }), function(u) {
          var d = u.on, h = u.send, l = u.receiveMessage;
          O.try(function() {
            var v = We(window);
            if (v && ai({
              win: v
            })) {
              return ui(v), (y = v, Ye("remoteBridgeAwaiters").getOrSet(y, function() {
                return O.try(function() {
                  var w = fr(y, qn(D()));
                  if (w) return j(w) && St(J(w)) ? w : new O(function(p) {
                    var g, E;
                    g = setInterval(function() {
                      if (w && j(w) && St(J(w)))
                        return clearInterval(g), clearTimeout(E), p(w);
                    }, 100), E = setTimeout(function() {
                      return clearInterval(g), p();
                    }, 2e3);
                  });
                });
              })).then(function(w) {
                return w ? window.name ? St(J(w)).openTunnelToParent({
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
                      O.reject(g);
                    }
                  }
                }).then(function(p) {
                  var g = p.source, E = p.origin, R = p.data;
                  if (g !== v) throw new Error("Source does not match opener");
                  ci(g, E, R.sendMessage);
                }).catch(function(p) {
                  throw Vn(v, p), p;
                }) : Vn(v, new Error("Can not register with opener: window does not have a name")) : Vn(v, new Error("Can not register with opener: no bridge found in opener"));
              });
              var y;
            }
          });
        }({
          on: r,
          send: n,
          receiveMessage: o
        });
      }
      function Gn() {
        for (var e = fe("idToProxyWindow"), r = 0, n = e.keys(); r < n.length; r++) {
          var o = n[r];
          e.get(o).shouldClean() && e.del(o);
        }
      }
      function fi(e, r) {
        var n = r.send, o = r.id, a = o === void 0 ? Xe() : o, u = e.then(function(l) {
          if (j(l)) return J(l).name;
        }), d = e.then(function(l) {
          if (xe(l)) throw new Error("Window is closed, can not determine type");
          return We(l) ? Ze.POPUP : Ze.IFRAME;
        });
        u.catch(ye), d.catch(ye);
        var h = function() {
          return e.then(function(l) {
            if (!xe(l)) return j(l) ? J(l).name : u;
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
          setLocation: function(l, v) {
            return v === void 0 && (v = {}), e.then(function(y) {
              var w = window.location.protocol + "//" + window.location.host, p = v.method, g = p === void 0 ? "get" : p, E = v.body;
              if (l.indexOf("/") === 0) l = "" + w + l;
              else if (!l.match(/^https?:\/\//) && l.indexOf(w) !== 0) throw new Error("Expected url to be http or https url, or absolute path, got " + JSON.stringify(l));
              if (g === "post") return h().then(function(R) {
                if (!R) throw new Error("Can not post to window without target name");
                (function(S) {
                  var I = S.url, z = S.target, V = S.body, A = S.method, q = A === void 0 ? "post" : A, L = document.createElement("form");
                  if (L.setAttribute("target", z), L.setAttribute("method", q), L.setAttribute("action", I), L.style.display = "none", V) for (var X = 0, $ = Object.keys(V); X < $.length; X++) {
                    var ce, ne = $[X], K = document.createElement("input");
                    K.setAttribute("name", ne), K.setAttribute("value", (ce = V[ne]) == null ? void 0 : ce.toString()), L.appendChild(K);
                  }
                  Mo().appendChild(L), L.submit(), Mo().removeChild(L);
                })({
                  url: l,
                  target: R,
                  method: g,
                  body: E
                });
              });
              if (g !== "get") throw new Error("Unsupported method: " + g);
              if (j(y)) try {
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
            return e.then(function(v) {
              dn({
                win: v,
                name: l
              });
              var y = j(v), w = xo(v);
              if (!y) throw new Error("Can not set name for cross-domain window: " + l);
              J(v).name = l, w && w.setAttribute("name", l), u = O.resolve(l);
            });
          }
        };
      }
      var lt = function() {
        function e(n) {
          var o = n.send, a = n.win, u = n.serializedWindow;
          this.id = void 0, this.isProxyWindow = !0, this.serializedWindow = void 0, this.actualWindow = void 0, this.actualWindowPromise = void 0, this.send = void 0, this.name = void 0, this.actualWindowPromise = new O(), this.serializedWindow = u || fi(this.actualWindowPromise, {
            send: o
          }), fe("idToProxyWindow").set(this.getID(), this), a && this.setWindow(a, {
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
            return n === Ze.POPUP;
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
          var n = this, o = this.isPopup(), a = this.getName(), u = O.hash({
            isPopup: o,
            name: a
          }).then(function(h) {
            var l = h.name;
            h.isPopup && l && window.open("", l, "noopener");
          }), d = this.serializedWindow.focus();
          return O.all([u, d]).then(function() {
            return n;
          });
        }, r.isClosed = function() {
          return this.serializedWindow.isClosed();
        }, r.getWindow = function() {
          return this.actualWindow;
        }, r.setWindow = function(n, o) {
          var a = o.send;
          this.actualWindow = n, this.actualWindowPromise.resolve(this.actualWindow), this.serializedWindow = fi(this.actualWindowPromise, {
            send: a,
            id: this.getID()
          }), Ye("winToProxyWindow").set(n, this);
        }, r.awaitWindow = function() {
          return this.actualWindowPromise;
        }, r.matchWindow = function(n, o) {
          var a = this, u = o.send;
          return O.try(function() {
            return a.actualWindow ? n === a.actualWindow : O.hash({
              proxyInstanceID: a.getInstanceID(),
              knownWindowInstanceID: ei(n, {
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
          return !!(this.actualWindow && xe(this.actualWindow));
        }, r.serialize = function() {
          return this.serializedWindow;
        }, e.unwrap = function(n) {
          return e.isProxyWindow(n) ? n.unwrap() : n;
        }, e.serialize = function(n, o) {
          var a = o.send;
          return Gn(), e.toProxyWindow(n, {
            send: a
          }).serialize();
        }, e.deserialize = function(n, o) {
          var a = o.send;
          return Gn(), fe("idToProxyWindow").get(n.id) || new e({
            serializedWindow: n,
            send: a
          });
        }, e.isProxyWindow = function(n) {
          return !!(n && !Xt(n) && n.isProxyWindow);
        }, e.toProxyWindow = function(n, o) {
          var a = o.send;
          if (Gn(), e.isProxyWindow(n)) return n;
          var u = n;
          return Ye("winToProxyWindow").get(u) || new e({
            win: u,
            send: a
          });
        }, e;
      }();
      function Jn(e, r, n, o, a) {
        var u = Ye("methodStore"), d = fe("proxyWindowMethods");
        lt.isProxyWindow(o) ? d.set(e, {
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
      function li(e, r) {
        var n = Ye("methodStore"), o = fe("proxyWindowMethods");
        return n.getOrSet(e, function() {
          return {};
        })[r] || o.get(r);
      }
      function hi(e, r, n, o, a) {
        d = (u = {
          on: a.on,
          send: a.send
        }).on, h = u.send, fe("builtinListeners").getOrSet("functionCalls", function() {
          return d("postrobot_method", {
            domain: "*"
          }, function(y) {
            var w = y.source, p = y.origin, g = y.data, E = g.id, R = g.name, S = li(w, E);
            if (!S) throw new Error("Could not find method '" + R + "' with id: " + g.id + " in " + D(window));
            var I = S.source, z = S.domain, V = S.val;
            return O.try(function() {
              if (!ct(z, p)) throw new Error("Method '" + g.name + "' domain " + JSON.stringify(_n(S.domain) ? S.domain.source : S.domain) + " does not match origin " + p + " in " + D(window));
              if (lt.isProxyWindow(I)) return I.matchWindow(w, {
                send: h
              }).then(function(A) {
                if (!A) throw new Error("Method call '" + g.name + "' failed - proxy window does not match source in " + D(window));
              });
            }).then(function() {
              return V.apply({
                source: w,
                origin: p
              }, g.args);
            }, function(A) {
              return O.try(function() {
                if (V.onError) return V.onError(A);
              }).then(function() {
                throw A.stack && (A.stack = "Remote call to " + R + "(" + function(q) {
                  return q === void 0 && (q = []), An(q).map(function(L) {
                    return typeof L == "string" ? "'" + L + "'" : L === void 0 ? "undefined" : L === null ? "null" : typeof L == "boolean" ? L.toString() : Array.isArray(L) ? "[ ... ]" : typeof L == "object" ? "{ ... }" : typeof L == "function" ? "() => { ... }" : "<" + typeof L + ">";
                  }).join(", ");
                }(g.args) + `) failed

` + A.stack), A;
              });
            }).then(function(A) {
              return {
                result: A,
                id: E,
                name: R
              };
            });
          });
        });
        var u, d, h, l = n.__id__ || Xe();
        e = lt.unwrap(e);
        var v = n.__name__ || n.name || o;
        return typeof v == "string" && typeof v.indexOf == "function" && v.indexOf("anonymous::") === 0 && (v = v.replace("anonymous::", o + "::")), lt.isProxyWindow(e) ? (Jn(l, n, v, e, r), e.awaitWindow().then(function(y) {
          Jn(l, n, v, y, r);
        })) : Jn(l, n, v, e, r), kt("cross_domain_function", {
          id: l,
          name: v
        });
      }
      function pi(e, r, n, o) {
        var a, u = o.on, d = o.send;
        return function(h, l) {
          l === void 0 && (l = Ha);
          var v = JSON.stringify(h, function(y) {
            var w = this[y];
            if (Bn(this)) return w;
            var p = ni(w);
            if (!p) return w;
            var g = l[p] || qa[p];
            return g ? g(w, y) : w;
          });
          return v === void 0 ? "undefined" : v;
        }(n, ((a = {}).promise = function(h, l) {
          return function(v, y, w, p, g) {
            return kt("cross_domain_zalgo_promise", {
              then: hi(v, y, function(E, R) {
                return w.then(E, R);
              }, p, {
                on: g.on,
                send: g.send
              })
            });
          }(e, r, h, l, {
            on: u,
            send: d
          });
        }, a.function = function(h, l) {
          return hi(e, r, h, l, {
            on: u,
            send: d
          });
        }, a.object = function(h) {
          return Xt(h) || lt.isProxyWindow(h) ? kt("cross_domain_window", lt.serialize(h, {
            send: d
          })) : h;
        }, a));
      }
      function vi(e, r, n, o) {
        var a, u = o.send;
        return function(d, h) {
          if (h === void 0 && (h = Ga), d !== "undefined") return JSON.parse(d, function(l, v) {
            if (Bn(this)) return v;
            var y, w;
            if (Bn(v) ? (y = v.__type__, w = v.__val__) : (y = ni(v), w = v), !y) return w;
            var p = h[y] || Va[y];
            return p ? p(w, l) : w;
          });
        }(n, ((a = {}).cross_domain_zalgo_promise = function(d) {
          return function(h, l, v) {
            return new O(v.then);
          }(0, 0, d);
        }, a.cross_domain_function = function(d) {
          return function(h, l, v, y) {
            var w = v.id, p = v.name, g = y.send, E = function(S) {
              S === void 0 && (S = {});
              function I() {
                var z = arguments;
                return lt.toProxyWindow(h, {
                  send: g
                }).awaitWindow().then(function(V) {
                  var A = li(V, w);
                  if (A && A.val !== I) return A.val.apply({
                    source: window,
                    origin: D()
                  }, z);
                  var q = [].slice.call(z);
                  return S.fireAndForget ? g(V, "postrobot_method", {
                    id: w,
                    name: p,
                    args: q
                  }, {
                    domain: l,
                    fireAndForget: !0
                  }) : g(V, "postrobot_method", {
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
            }, R = E();
            return R.fireAndForget = E({
              fireAndForget: !0
            }), R;
          }(e, r, d, {
            send: u
          });
        }, a.cross_domain_window = function(d) {
          return lt.deserialize(d, {
            send: u
          });
        }, a));
      }
      var _r = {};
      _r.postrobot_post_message = function(e, r, n) {
        n.indexOf("file:") === 0 && (n = "*"), e.postMessage(r, n);
      }, _r.postrobot_bridge = function(e, r, n) {
        if (!$n() && !si()) throw new Error("Bridge not needed for browser");
        if (j(e)) throw new Error("Post message through bridge disabled between same domain windows");
        if (Zr(window, e) !== !1) throw new Error("Can only use bridge to communicate between two different windows, not between frames");
        (function(o, a, u) {
          var d = Dr(window, o), h = Dr(o, window);
          if (!d && !h) throw new Error("Can only send messages to and from parent and popup windows");
          Hn(o).then(function(l) {
            return l(o, a, u);
          });
        })(e, n, r);
      }, _r.postrobot_global = function(e, r) {
        if (!dr(window).match(/MSIE|rv:11|trident|edge\/12|edge\/13/i)) throw new Error("Global messaging not needed for browser");
        if (!j(e)) throw new Error("Post message through global disabled between different domain windows");
        if (Zr(window, e) !== !1) throw new Error("Can only use global to communicate between two different windows, not between frames");
        var n = St(e);
        if (!n) throw new Error("Can not find postRobot global on foreign window");
        n.receiveMessage({
          source: window,
          origin: D(),
          data: r
        });
      };
      function Kn(e, r, n, o) {
        var a = o.on, u = o.send;
        return O.try(function() {
          var d = Ye().getOrSet(e, function() {
            return {};
          });
          return d.buffer = d.buffer || [], d.buffer.push(n), d.flush = d.flush || O.flush().then(function() {
            if (xe(e)) throw new Error("Window is closed");
            var h = pi(e, r, ((l = {}).__post_robot_11_0_0__ = d.buffer || [], l), {
              on: a,
              send: u
            }), l;
            delete d.buffer;
            for (var v = Object.keys(_r), y = [], w = 0; w < v.length; w++) {
              var p = v[w];
              try {
                _r[p](e, h, r);
              } catch (g) {
                y.push(g);
              }
            }
            if (y.length === v.length) throw new Error(`All post-robot messaging strategies failed:

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
        var r = e.name, n = e.win, o = e.domain, a = Ye("requestListeners");
        if (n === "*" && (n = null), o === "*" && (o = null), !r) throw new Error("Name required to get request listener");
        for (var u = 0, d = [n, cn()]; u < d.length; u++) {
          var h = d[u];
          if (h) {
            var l = a.get(h);
            if (l) {
              var v = l[r];
              if (v) {
                if (o && typeof o == "string") {
                  if (v[o]) return v[o];
                  if (v.__domain_regex__) for (var y = 0, w = v.__domain_regex__; y < w.length; y++) {
                    var p = w[y], g = p.listener;
                    if (ct(p.regex, o)) return g;
                  }
                }
                if (v["*"]) return v["*"];
              }
            }
          }
        }
      }
      function Yn(e, r) {
        var n = r.on, o = r.send, a = fe("receivedMessages");
        try {
          if (!window || window.closed || !e.source) return;
        } catch {
          return;
        }
        var u = e.source, d = e.origin, h = function(w, p, g, E) {
          var R = E.on, S = E.send, I;
          try {
            I = vi(p, g, w, {
              on: R,
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
          ri(u);
          for (var l, v = function() {
            var w = h[y];
            if (a.has(w.id)) return {
              v: void 0
            };
            if (a.set(w.id, !0), xe(u) && !w.fireAndForget) return {
              v: void 0
            };
            w.origin.indexOf("file:") === 0 && (d = "file://");
            try {
              w.type === "postrobot_message_request" ? function(p, g, E, R) {
                var S = R.on, I = R.send, z = yi({
                  name: E.name,
                  win: p,
                  domain: g
                }), V = E.name === "postrobot_method" && E.data && typeof E.data.name == "string" ? E.data.name + "()" : E.name;
                function A(q, L, X) {
                  return O.flush().then(function() {
                    if (!E.fireAndForget && !xe(p)) try {
                      return Kn(p, g, {
                        id: Xe(),
                        origin: D(window),
                        type: "postrobot_message_response",
                        hash: E.hash,
                        name: E.name,
                        ack: q,
                        data: L,
                        error: X
                      }, {
                        on: S,
                        send: I
                      });
                    } catch ($) {
                      throw new Error("Send response message failed for " + V + " in " + D() + `

` + hr($));
                    }
                  });
                }
                O.all([O.flush().then(function() {
                  if (!E.fireAndForget && !xe(p)) try {
                    return Kn(p, g, {
                      id: Xe(),
                      origin: D(window),
                      type: "postrobot_message_ack",
                      hash: E.hash,
                      name: E.name
                    }, {
                      on: S,
                      send: I
                    });
                  } catch (q) {
                    throw new Error("Send ack message failed for " + V + " in " + D() + `

` + hr(q));
                  }
                }), O.try(function() {
                  if (!z) throw new Error("No handler found for post message: " + E.name + " from " + g + " in " + window.location.protocol + "//" + window.location.host + window.location.pathname);
                  return z.handler({
                    source: p,
                    origin: g,
                    data: E.data
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
              }) : w.type === "postrobot_message_response" ? function(p, g, E) {
                if (!gi(E.hash)) {
                  var R = wi(E.hash);
                  if (!R) throw new Error("No handler found for post message response for message: " + E.name + " from " + g + " in " + window.location.protocol + "//" + window.location.host + window.location.pathname);
                  if (!ct(R.domain, g)) throw new Error("Response origin " + g + " does not match domain " + (S = R.domain, Array.isArray(S) ? "(" + S.join(" | ") + ")" : mt(S) ? "RegExp(" + S.toString() + ")" : S.toString()));
                  var S;
                  if (p !== R.win) throw new Error("Response source does not match registered window");
                  mi(E.hash), E.ack === "error" ? R.promise.reject(E.error) : E.ack === "success" && R.promise.resolve({
                    source: p,
                    origin: g,
                    data: E.data
                  });
                }
              }(u, d, w) : w.type === "postrobot_message_ack" && function(p, g, E) {
                if (!gi(E.hash)) {
                  var R = wi(E.hash);
                  if (!R) throw new Error("No handler found for post message ack for message: " + E.name + " from " + g + " in " + window.location.protocol + "//" + window.location.host + window.location.pathname);
                  try {
                    if (!ct(R.domain, g)) throw new Error("Ack origin " + g + " does not match domain " + R.domain.toString());
                    if (p !== R.win) throw new Error("Ack source does not match registered window");
                  } catch (S) {
                    R.promise.reject(S);
                  }
                  R.ack = !0;
                }
              }(u, d, w);
            } catch (p) {
              setTimeout(function() {
                throw p;
              }, 0);
            }
          }, y = 0; y < h.length; y++) if (l = v()) return l.v;
        }
      }
      function Ct(e, r, n) {
        if (!e) throw new Error("Expected name");
        if (typeof (r = r || {}) == "function" && (n = r, r = {}), !n) throw new Error("Expected handler");
        var o = function a(u, d) {
          var h = u.name, l = u.win, v = u.domain, y = Ye("requestListeners");
          if (!h || typeof h != "string") throw new Error("Name required to add request listener");
          if (l && l !== "*" && lt.isProxyWindow(l)) {
            var w = l.awaitWindow().then(function(ce) {
              return a({
                name: h,
                win: ce,
                domain: v
              }, d);
            });
            return {
              cancel: function() {
                w.then(function(ce) {
                  return ce.cancel();
                }, ye);
              }
            };
          }
          var p = l;
          if (Array.isArray(p)) {
            for (var g = [], E = 0, R = p; E < R.length; E++) g.push(a({
              name: h,
              domain: v,
              win: R[E]
            }, d));
            return {
              cancel: function() {
                for (var ce = 0; ce < g.length; ce++) g[ce].cancel();
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
                for (var ce = 0; ce < S.length; ce++) S[ce].cancel();
              }
            };
          }
          var V = yi({
            name: h,
            win: p,
            domain: v
          });
          p && p !== "*" || (p = cn());
          var A = (v = v || "*").toString();
          if (V) throw p && v ? new Error("Request listener already exists for " + h + " on domain " + v.toString() + " for " + (p === cn() ? "wildcard" : "specified") + " window") : p ? new Error("Request listener already exists for " + h + " for " + (p === cn() ? "wildcard" : "specified") + " window") : v ? new Error("Request listener already exists for " + h + " on domain " + v.toString()) : new Error("Request listener already exists for " + h);
          var q = y.getOrSet(p, function() {
            return {};
          }), L = Ar(q, h, function() {
            return {};
          }), X, $;
          return _n(v) ? (X = Ar(L, "__domain_regex__", function() {
            return [];
          })).push($ = {
            regex: v,
            listener: d
          }) : L[A] = d, {
            cancel: function() {
              delete L[A], $ && (X.splice(X.indexOf($, 1)), X.length || delete L.__domain_regex__), Object.keys(L).length || delete q[h], p && !Object.keys(q).length && y.del(p);
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
        return lt.toProxyWindow(r, {
          send: e
        }).awaitWindow().then(function(v) {
          return O.try(function() {
            if (function(y, w, p) {
              if (!y) throw new Error("Expected name");
              if (p && typeof p != "string" && !Array.isArray(p) && !_n(p)) throw new TypeError("Can not send " + y + ". Expected domain " + JSON.stringify(p) + " to be a string, array, or regex");
              if (xe(w)) throw new Error("Can not send " + y + ". Target window is closed");
            }(n, v, u), function(y, w) {
              var p = Qt(w);
              if (p) return p === y;
              if (w === y || Ke(w) === w) return !1;
              for (var g = 0, E = et(y); g < E.length; g++) if (E[g] === w) return !0;
              return !1;
            }(window, v)) return ti(v, h);
          }).then(function(y) {
            return function(w, p, g, E) {
              var R = E.send;
              return O.try(function() {
                return typeof p == "string" ? p : O.try(function() {
                  return g || Un(w, {
                    send: R
                  }).then(function(S) {
                    return S.domain;
                  });
                }).then(function(S) {
                  if (!ct(p, p)) throw new Error("Domain " + tn(p) + " does not match " + tn(p));
                  return S;
                });
              });
            }(v, u, (y === void 0 ? {} : y).domain, {
              send: e
            });
          }).then(function(y) {
            var w = y, p = n === "postrobot_method" && o && typeof o.name == "string" ? o.name + "()" : n, g = new O(), E = n + "_" + Xe();
            if (!l) {
              var R = {
                name: n,
                win: v,
                domain: w,
                promise: g
              };
              (function(L, X) {
                fe("responseListeners").set(L, X);
              })(E, R);
              var S = Ye("requestPromises").getOrSet(v, function() {
                return [];
              });
              S.push(g), g.catch(function() {
                (function(L) {
                  fe("erroredResponseListeners").set(L, !0);
                })(E), mi(E);
              });
              var I = function(L) {
                return Ye("knownWindows").get(L, !1);
              }(v) ? 1e4 : 2e3, z = d, V = I, A = z, q = Ir(function() {
                return xe(v) ? g.reject(new Error("Window closed for " + n + " before " + (R.ack ? "response" : "ack"))) : R.cancelled ? g.reject(new Error("Response listener was cancelled for " + n)) : (V = Math.max(V - 500, 0), A !== -1 && (A = Math.max(A - 500, 0)), R.ack || V !== 0 ? A === 0 ? g.reject(new Error("No response for postMessage " + p + " in " + D() + " in " + z + "ms")) : void 0 : g.reject(new Error("No ack for postMessage " + p + " in " + D() + " in " + I + "ms")));
              }, 500);
              g.finally(function() {
                q.cancel(), S.splice(S.indexOf(g, 1));
              }).catch(ye);
            }
            return Kn(v, w, {
              id: Xe(),
              origin: D(window),
              type: "postrobot_message_request",
              hash: E,
              name: n,
              data: o,
              fireAndForget: l
            }, {
              on: Ct,
              send: e
            }).then(function() {
              return l ? g.resolve() : g;
            }, function(L) {
              throw new Error("Send request message failed for " + p + " in " + D() + `

` + hr(L));
            });
          });
        });
      };
      function Mr(e) {
        return lt.toProxyWindow(e, {
          send: bt
        });
      }
      function Ei(e) {
        for (var r = 0, n = Ye("requestPromises").get(e, []); r < n.length; r++) n[r].reject(new Error("Window " + (xe(e) ? "closed" : "cleaned up") + " before response")).catch(ye);
      }
      var Ut;
      Ut = {
        setupBridge: di,
        openBridge: function(e, r) {
          var n = fe("bridges"), o = fe("bridgeFrames");
          return r = r || Nt(e), n.getOrSet(r, function() {
            return O.try(function() {
              if (D() === r) throw new Error("Can not open bridge on the same domain as current domain: " + r);
              var a = qn(r);
              if (fr(window, a)) throw new Error("Frame with name " + a + " already exists on page");
              var u = function(d, h) {
                var l = document.createElement("iframe");
                return l.setAttribute("name", d), l.setAttribute("id", d), l.setAttribute("style", "display: none; margin: 0; padding: 0; border: 0px none; overflow: hidden;"), l.setAttribute("frameborder", "0"), l.setAttribute("border", "0"), l.setAttribute("scrolling", "no"), l.setAttribute("allowTransparency", "true"), l.setAttribute("tabindex", "-1"), l.setAttribute("hidden", "true"), l.setAttribute("title", ""), l.setAttribute("role", "presentation"), l.src = h, l;
              }(a, e);
              return o.set(r, u), Ja.then(function(d) {
                d.appendChild(u);
                var h = u.contentWindow;
                return new O(function(l, v) {
                  u.addEventListener("load", l), u.addEventListener("error", v);
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
        needsBridgeForBrowser: $n,
        hasBridge: function(e, r) {
          return fe("bridges").has(r || Nt(e));
        },
        needsBridgeForWin: oi,
        needsBridgeForDomain: ii,
        destroyBridges: function() {
          for (var e = fe("bridges"), r = fe("bridgeFrames"), n = 0, o = r.keys(); n < o.length; n++) {
            var a = r.get(o[n]);
            a && a.parentNode && a.parentNode.removeChild(a);
          }
          r.reset(), e.reset();
        }
      };
      function Fr(e) {
        if (!j(e)) throw new Error("Can not get global for window on different domain");
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
            return O.try(function() {
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
        var r = e.data, n = e.metaData, o = e.sender, a = e.receiver, u = e.passByReference, d = u !== void 0 && u, h = e.basic, l = h !== void 0 && h, v = Mr(a.win), y = l ? JSON.stringify(r) : pi(v, a.domain, r, {
          on: Ct,
          send: bt
        }), w = d ? function(p) {
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
              domain: o.domain
            },
            metaData: n,
            reference: w
          }),
          cleanReference: function() {
            p = window, (g = w).type === "uid" && delete Zn(p)[g.uid];
            var p, g;
          }
        };
      }
      function Ti(e) {
        var r = e.sender, n = e.basic, o = n !== void 0 && n, a = function(y) {
          return JSON.parse(function(w) {
            if (typeof atob == "function") return decodeURIComponent([].map.call(atob(w), function(p) {
              return "%" + ("00" + p.charCodeAt(0).toString(16)).slice(-2);
            }).join(""));
            if (typeof Buffer < "u") return Buffer.from(w, "base64").toString("utf8");
            throw new Error("Can not find window.atob or Buffer");
          }(y));
        }(e.data), u = a.reference, d = a.metaData, h;
        h = typeof r.win == "function" ? r.win({
          metaData: d
        }) : r.win;
        var l;
        l = typeof r.domain == "function" ? r.domain({
          metaData: d
        }) : typeof r.domain == "string" ? r.domain : a.sender.domain;
        var v = function(y, w) {
          if (w.type === "raw") return w.val;
          if (w.type === "uid") return Zn(y)[w.uid];
          throw new Error("Unsupported ref type: " + w.type);
        }(h, u);
        return {
          data: o ? JSON.parse(v) : function(y, w, p) {
            return vi(y, w, p, {
              on: Ct,
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
      }, Oe = Ze, Ee = {
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
        var r = Ti({
          data: Qn(e).serializedInitialPayload,
          sender: {
            win: function(n) {
              return function(o) {
                if (o.type === "opener") return on("opener", We(window));
                if (o.type === "parent" && typeof o.distance == "number") return on("parent", function(w, p) {
                  return p === void 0 && (p = 1), function(g, E) {
                    E === void 0 && (E = 1);
                    for (var R = g, S = 0; S < E; S++) {
                      if (!R) return;
                      R = ie(R);
                    }
                    return R;
                  }(w, lr(w) - p);
                }(window, o.distance));
                if (o.type === "global" && o.uid && typeof o.uid == "string") {
                  var a = o.uid, u = Qt(window);
                  if (!u) throw new Error("Can not find ancestor window");
                  for (var d = 0, h = Re(u); d < h.length; d++) {
                    var l = h[d];
                    if (j(l)) {
                      var v = bi(l, function(w) {
                        return w.windows && w.windows[a];
                      });
                      if (v) return v;
                    }
                  }
                } else if (o.type === "name") {
                  var y = o.name;
                  return on("namedWindow", function(w, p) {
                    return fr(w, p) || function g(E, R) {
                      var S = fr(E, R);
                      if (S) return S;
                      for (var I = 0, z = et(E); I < z.length; I++) {
                        var V = g(z[I], R);
                        if (V) return V;
                      }
                    }(Ke(w) || w, p);
                  }(on("ancestor", Qt(window)), y));
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
      function Oi() {
        return Ya(window.name);
      }
      function Za(e, r) {
        if (r === void 0 && (r = window), e === ie(r)) return {
          type: "parent",
          distance: lr(e)
        };
        if (e === We(r)) return {
          type: "opener"
        };
        if (j(e) && (o = e, o !== Ke(o))) {
          var n = J(e).name;
          if (n) return {
            type: "name",
            name: n
          };
        }
        var o;
      }
      function Si(e, r, n, o, a) {
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
        return O.try(function() {
          window.focus();
        });
      }
      function xi() {
        return O.try(function() {
          window.close();
        });
      }
      var It = function() {
        return ye;
      }, er = function(e) {
        return en(e.value);
      };
      function Xn(e, r, n) {
        for (var o = 0, a = Object.keys(P({}, e, r)); o < a.length; o++) {
          var u = a[o];
          n(u, r[u], e[u]);
        }
      }
      function Di(e, r, n) {
        var o = {};
        return O.all(function(a, u, d) {
          var h = [];
          return Xn(a, u, function(l, v, y) {
            var w = function(p, g, E) {
              return O.resolve().then(function() {
                var R, S;
                if (E != null && g) {
                  var I = (R = {}, R.get = g.queryParam, R.post = g.bodyParam, R)[n], z = (S = {}, S.get = g.queryValue, S.post = g.bodyValue, S)[n];
                  if (I) return O.hash({
                    finalParam: O.try(function() {
                      return typeof I == "function" ? I({
                        value: E
                      }) : typeof I == "string" ? I : p;
                    }),
                    finalValue: O.try(function() {
                      return typeof z == "function" && jt(E) ? z({
                        value: E
                      }) : E;
                    })
                  }).then(function(V) {
                    var A = V.finalParam, q = V.finalValue, L;
                    if (typeof q == "boolean") L = q.toString();
                    else if (typeof q == "string") L = q.toString();
                    else if (typeof q == "object" && q !== null) {
                      if (g.serialization === ln.JSON) L = JSON.stringify(q);
                      else if (g.serialization === ln.BASE64) L = Nn(JSON.stringify(q));
                      else if (g.serialization === ln.DOTIFY || !g.serialization) {
                        L = function ne(K, H, ue) {
                          H === void 0 && (H = ""), ue === void 0 && (ue = {}), H = H && H + ".";
                          for (var k in K) K.hasOwnProperty(k) && K[k] != null && typeof K[k] != "function" && (K[k] && Array.isArray(K[k]) && K[k].length && K[k].every(function(Se) {
                            return typeof Se != "object";
                          }) ? ue["" + H + k + "[]"] = K[k].join(",") : K[k] && typeof K[k] == "object" ? ue = ne(K[k], "" + H + k, ue) : ue["" + H + k] = K[k].toString());
                          return ue;
                        }(q, p);
                        for (var X = 0, $ = Object.keys(L); X < $.length; X++) {
                          var ce = $[X];
                          o[ce] = L[ce];
                        }
                        return;
                      }
                    } else typeof q == "number" && (L = q.toString());
                    o[A] = L;
                  });
                }
              });
            }(l, v, y);
            h.push(w);
          }), h;
        }(r, e)).then(function() {
          return o;
        });
      }
      function Ni(e) {
        var r = e.uid, n = e.options, o = e.overrides, a = o === void 0 ? {} : o, u = e.parentWin, d = u === void 0 ? window : u, h = n.propsDef, l = n.containerTemplate, v = n.prerenderTemplate, y = n.tag, w = n.name, p = n.attributes, g = n.dimensions, E = n.autoResize, R = n.url, S = n.domain, I = n.exports, z = new O(), V = [], A = nn(), q = {}, L = {}, X = {
          visible: !0
        }, $ = a.event ? a.event : (ce = {}, ne = {}, K = {
          on: function(x, N) {
            var B = ne[x] = ne[x] || [];
            B.push(N);
            var U = !1;
            return {
              cancel: function() {
                U || (U = !0, B.splice(B.indexOf(N), 1));
              }
            };
          },
          once: function(x, N) {
            var B = K.on(x, function() {
              B.cancel(), N();
            });
            return B;
          },
          trigger: function(x) {
            for (var N = arguments.length, B = new Array(N > 1 ? N - 1 : 0), U = 1; U < N; U++) B[U - 1] = arguments[U];
            var te = ne[x], Y = [];
            if (te)
              for (var me = function() {
                var je = te[ge];
                Y.push(O.try(function() {
                  return je.apply(void 0, B);
                }));
              }, ge = 0; ge < te.length; ge++) me();
            return O.all(Y).then(ye);
          },
          triggerOnce: function(x) {
            if (ce[x]) return O.resolve();
            ce[x] = !0;
            for (var N = arguments.length, B = new Array(N > 1 ? N - 1 : 0), U = 1; U < N; U++) B[U - 1] = arguments[U];
            return K.trigger.apply(K, [x].concat(B));
          },
          reset: function() {
            ne = {};
          }
        }), ce, ne, K, H = a.props ? a.props : {}, ue, k, Se, xt, ht, Bt = !1, $t = a.onError, At = a.getProxyContainer, qt = a.show, Ht = a.hide, tr = a.close, Vt = a.renderContainer, Pt = a.getProxyWindow, rr = a.setProxyWin, Gt = a.openFrame, Jt = a.openPrerenderFrame, nr = a.prerender, or = a.open, oe = a.openPrerender, pt = a.watchForUnload, se = a.getInternalState, ze = a.setInternalState, De = function() {
          return typeof g == "function" ? g({
            props: H
          }) : g;
        }, Le = function() {
          return O.try(function() {
            return a.resolveInitPromise ? a.resolveInitPromise() : z.resolve();
          });
        }, Te = function(x) {
          return O.try(function() {
            return a.rejectInitPromise ? a.rejectInitPromise(x) : z.reject(x);
          });
        }, ke = function(x) {
          for (var N = {}, B = 0, U = Object.keys(H); B < U.length; B++) {
            var te = U[B], Y = h[te];
            if (!Y || Y.sendToChild !== !1) {
              var me = Y && Y.trustedDomains && Y.trustedDomains.length > 0 ? Y.trustedDomains.reduce(function(ge, je) {
                return ge || ct(je, x);
              }, !1) : ct(x, D(window));
              Y && Y.sameDomain && !me || Y && Y.trustedDomains && !me || (N[te] = H[te]);
            }
          }
          return O.hash(N);
        }, _e = function() {
          return O.try(function() {
            return se ? se() : X;
          });
        }, Me = function(x) {
          return O.try(function() {
            return ze ? ze(x) : X = P({}, X, x);
          });
        }, vt = function() {
          return Pt ? Pt() : O.try(function() {
            var x = H.window;
            if (x) {
              var N = Mr(x);
              return A.register(function() {
                return x.close();
              }), N;
            }
            return new lt({
              send: bt
            });
          });
        }, rt = function(x) {
          return rr ? rr(x) : O.try(function() {
            ue = x;
          });
        }, Tt = function() {
          return qt ? qt() : O.hash({
            setState: Me({
              visible: !0
            }),
            showElement: k ? k.get().then(ja) : null
          }).then(ye);
        }, Wt = function() {
          return Ht ? Ht() : O.hash({
            setState: Me({
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
        }, nt = function(x, N) {
          var B = N.windowName;
          return Gt ? Gt(x, {
            windowName: B
          }) : O.try(function() {
            if (x === Oe.IFRAME) return fn($o({
              attributes: P({
                name: B,
                title: w
              }, mr().iframe)
            }));
          });
        }, zr = function(x) {
          return Jt ? Jt(x) : O.try(function() {
            if (x === Oe.IFRAME) return fn($o({
              attributes: P({
                name: "__zoid_prerender_frame__" + w + "_" + Xe() + "__",
                title: "prerender__" + w
              }, mr().iframe)
            }));
          });
        }, Lr = function(x, N, B) {
          return oe ? oe(x, N, B) : O.try(function() {
            if (x === Oe.IFRAME) {
              if (!B) throw new Error("Expected proxy frame to be passed");
              return B.get().then(function(U) {
                return A.register(function() {
                  return Wr(U);
                }), zn(U).then(function(te) {
                  return J(te);
                }).then(function(te) {
                  return Mr(te);
                });
              });
            }
            if (x === Oe.POPUP) return N;
            throw new Error("No render context available for " + x);
          });
        }, gr = function() {
          return O.try(function() {
            if (ue) return O.all([$.trigger(Ee.FOCUS), ue.focus()]).then(ye);
          });
        }, hn = function() {
          var x = Fr(window);
          return x.windows = x.windows || {}, x.windows[r] = window, A.register(function() {
            delete x.windows[r];
          }), r;
        }, jr = function(x, N, B, U) {
          if (N === D(window)) return {
            type: "global",
            uid: hn()
          };
          if (x !== window) throw new Error("Can not construct cross-domain window reference for different target window");
          if (H.window) {
            var te = U.getWindow();
            if (!te) throw new Error("Can not construct cross-domain window reference for lazy window prop");
            if (Qt(te) !== window) throw new Error("Can not construct cross-domain window reference for window prop with different ancestor");
          }
          if (B === Oe.POPUP) return {
            type: "opener"
          };
          if (B === Oe.IFRAME) return {
            type: "parent",
            distance: lr(window)
          };
          throw new Error("Can not construct window reference for child");
        }, pn = function(x, N) {
          return O.try(function() {
            var B;
            xt = x, Se = N, (B = ue) == null || B.isPopup().then(function(U) {
              if ((N == null ? void 0 : N.name) !== "" && U) {
                var te;
                (te = ue) == null || te.setName(N == null ? void 0 : N.name);
              }
            }).finally(function() {
              Le(), A.register(function() {
                return N.close.fireAndForget().catch(ye);
              });
            });
          });
        }, Ur = function(x) {
          var N = x.width, B = x.height;
          return O.try(function() {
            $.trigger(Ee.RESIZE, {
              width: N,
              height: B
            });
          });
        }, Br = function(x) {
          return O.try(function() {
            return $.trigger(Ee.DESTROY);
          }).catch(ye).then(function() {
            return A.all(x);
          }).then(function() {
            var N = x || new Error("Component destroyed");
            ht && vr(ht) || N.message === "Window navigated away" ? z.resolve() : z.asyncReject(N);
          });
        }, _t = Lt(function(x) {
          return O.try(function() {
            return tr ? xe(tr.__source__) ? void 0 : tr() : O.try(function() {
              return $.trigger(Ee.CLOSE);
            }).then(function() {
              return Br(x || new Error("Component closed"));
            });
          });
        }), Ai = function(x, N) {
          var B = N.proxyWin, U = N.proxyFrame, te = N.windowName;
          return or ? or(x, {
            proxyWin: B,
            proxyFrame: U,
            windowName: te
          }) : O.try(function() {
            if (x === Oe.IFRAME) {
              if (!U) throw new Error("Expected proxy frame to be passed");
              return U.get().then(function(Ne) {
                return zn(Ne).then(function(le) {
                  return A.register(function() {
                    return Wr(Ne);
                  }), A.register(function() {
                    return Ei(le);
                  }), le;
                });
              });
            }
            if (x === Oe.POPUP) {
              var Y = De(), me = Y.width, ge = me === void 0 ? "300px" : me, je = Y.height, be = je === void 0 ? "150px" : je;
              ge = Zo(ge, window.outerWidth), be = Zo(be, window.outerWidth);
              var Fe = function(Ne, le) {
                var Ce = (le = le || {}).closeOnUnload, Pe = Ce === void 0 ? 1 : Ce, ot = le.name, Ue = ot === void 0 ? "" : ot, de = le.width, Be = le.height, tt = 0, Ve = 0;
                de && (window.outerWidth ? Ve = Math.round((window.outerWidth - de) / 2) + window.screenX : window.screen.width && (Ve = Math.round((window.screen.width - de) / 2))), Be && (window.outerHeight ? tt = Math.round((window.outerHeight - Be) / 2) + window.screenY : window.screen.height && (tt = Math.round((window.screen.height - Be) / 2))), delete le.closeOnUnload, delete le.name, de && Be && (le = P({
                  top: tt,
                  left: Ve,
                  width: de,
                  height: Be,
                  status: 1,
                  toolbar: 0,
                  menubar: 0,
                  resizable: 1,
                  scrollbars: 1
                }, le));
                var ar = Object.keys(le).map(function(Dt) {
                  if (le[Dt] != null) return Dt + "=" + tn(le[Dt]);
                }).filter(Boolean).join(","), wt;
                try {
                  wt = window.open("", Ue, ar);
                } catch (Dt) {
                  throw new Fn("Can not open popup window - " + (Dt.stack || Dt.message));
                }
                if (xe(wt))
                  throw new Fn("Can not open popup window - blocked");
                return Pe && window.addEventListener("unload", function() {
                  return wt.close();
                }), wt;
              }(0, P({
                name: te,
                width: ge,
                height: be
              }, mr().popup));
              return A.register(function() {
                return Do(Fe);
              }), A.register(function() {
                return Ei(Fe);
              }), Fe;
            }
            throw new Error("No render context available for " + x);
          }).then(function(Y) {
            return B.setWindow(Y, {
              send: bt
            }), B.setName(te).then(function() {
              return B;
            });
          });
        }, Wi = function() {
          return O.try(function() {
            var x = qo(window, "unload", en(function() {
              Br(new Error("Window navigated away"));
            })), N = So(d, Br, 3e3);
            if (A.register(N.cancel), A.register(x.cancel), pt) return pt();
          });
        }, _i = function(x) {
          var N = !1;
          return x.isClosed().then(function(B) {
            return B ? (N = !0, _t(new Error("Detected component window close"))) : O.delay(200).then(function() {
              return x.isClosed();
            }).then(function(U) {
              if (U)
                return N = !0, _t(new Error("Detected component window close"));
            });
          }).then(function() {
            return N;
          });
        }, $r = function(x) {
          return $t ? $t(x) : O.try(function() {
            if (V.indexOf(x) === -1)
              return V.push(x), z.asyncReject(x), $.trigger(Ee.ERROR, x);
          });
        }, Mi = new O(), Fi = function(x) {
          return O.try(function() {
            Mi.resolve(x);
          });
        };
        pn.onError = $r;
        var zi = function(x, N) {
          return x({
            uid: r,
            container: N.container,
            context: N.context,
            doc: N.doc,
            frame: N.frame,
            prerenderFrame: N.prerenderFrame,
            focus: gr,
            close: _t,
            state: q,
            props: H,
            tag: y,
            dimensions: De(),
            event: $
          });
        }, Li = function(x, N) {
          var B = N.context;
          return nr ? nr(x, {
            context: B
          }) : O.try(function() {
            if (v) {
              $.trigger(Ee.PRERENDER);
              var U = x.getWindow();
              if (U && j(U) && function(Ce) {
                try {
                  if (!Ce.location.href || Ce.location.href === "about:blank") return !0;
                } catch {
                }
                return !1;
              }(U)) {
                var te = (U = J(U)).document, Y = zi(v, {
                  context: B,
                  doc: te
                });
                if (Y) {
                  if (Y.ownerDocument !== te) throw new Error("Expected prerender template to have been created with document from child window");
                  (function(Ce, Pe) {
                    var ot = Pe.tagName.toLowerCase();
                    if (ot !== "html") throw new Error("Expected element to be html, got " + ot);
                    for (var Ue = Ce.document.documentElement, de = 0, Be = An(Ue.children); de < Be.length; de++) Ue.removeChild(Be[de]);
                    for (var tt = 0, Ve = An(Pe.children); tt < Ve.length; tt++) Ue.appendChild(Ve[tt]);
                  })(U, Y);
                  var me = E.width, ge = me !== void 0 && me, je = E.height, be = je !== void 0 && je, Fe = E.element, Ne = Fe === void 0 ? "body" : Fe;
                  if ((Ne = Mn(Ne, te)) && (ge || be)) {
                    var le = Vo(Ne, function(Ce) {
                      Ur({
                        width: ge ? Ce.width : void 0,
                        height: be ? Ce.height : void 0
                      });
                    }, {
                      width: ge,
                      height: be,
                      win: U
                    });
                    $.on(Ee.RENDERED, le.cancel);
                  }
                  $.trigger(Ee.PRERENDERED);
                }
              }
            }
          });
        }, ji = function(x, N) {
          var B = N.proxyFrame, U = N.proxyPrerenderFrame, te = N.context, Y = N.rerender;
          return Vt ? Vt(x, {
            proxyFrame: B,
            proxyPrerenderFrame: U,
            context: te,
            rerender: Y
          }) : O.hash({
            container: x.get(),
            frame: B ? B.get() : null,
            prerenderFrame: U ? U.get() : null,
            internalState: _e()
          }).then(function(me) {
            var ge = me.container, je = me.internalState.visible, be = zi(l, {
              context: te,
              container: ge,
              frame: me.frame,
              prerenderFrame: me.prerenderFrame,
              doc: document
            });
            if (be) {
              je || Ho(be), La(ge, be);
              var Fe = function(Ne, le) {
                le = en(le);
                var Ce = !1, Pe = [], ot, Ue, de, Be = function() {
                  Ce = !0;
                  for (var wt = 0; wt < Pe.length; wt++) Pe[wt].disconnect();
                  ot && ot.cancel(), de && de.removeEventListener("unload", tt), Ue && Wr(Ue);
                }, tt = function() {
                  Ce || (le(), Be());
                };
                if (vr(Ne))
                  return tt(), {
                    cancel: Be
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
                return (Ue = document.createElement("iframe")).setAttribute("name", "__detect_close_" + Xe() + "__"), Ue.style.display = "none", zn(Ue).then(function(wt) {
                  (de = J(wt)).addEventListener("unload", tt);
                }), Ne.appendChild(Ue), ot = Ir(function() {
                  vr(Ne) && tt();
                }, 1e3), {
                  cancel: Be
                };
              }(be, function() {
                var Ne = new Error("Detected container element removed from DOM");
                return O.delay(1).then(function() {
                  if (!vr(be))
                    return A.all(Ne), Y().then(Le, Te);
                  _t(Ne);
                });
              });
              return A.register(function() {
                return Fe.cancel();
              }), A.register(function() {
                return Wr(be);
              }), k = fn(be);
            }
          });
        }, Ui = function() {
          return {
            state: q,
            event: $,
            close: _t,
            focus: gr,
            resize: Ur,
            onError: $r,
            updateProps: us,
            show: Tt,
            hide: Wt
          };
        }, to = function(x) {
          x === void 0 && (x = {});
          var N = ht, B = Ui();
          pr(L, x), function(U, te, Y, me, ge) {
            var je = me.state, be = me.close, Fe = me.focus, Ne = me.event, le = me.onError;
            Xn(Y, U, function(Ce, Pe, ot) {
              var Ue = !1, de = ot;
              Object.defineProperty(te, Ce, {
                configurable: !0,
                enumerable: !0,
                get: function() {
                  return Ue ? de : (Ue = !0, function() {
                    if (!Pe) return de;
                    var Be = Pe.alias;
                    if (Be && !jt(ot) && jt(Y[Be]) && (de = Y[Be]), Pe.value && (de = Pe.value({
                      props: te,
                      state: je,
                      close: be,
                      focus: Fe,
                      event: Ne,
                      onError: le,
                      container: ge
                    })), !Pe.default || jt(de) || jt(Y[Ce]) || (de = Pe.default({
                      props: te,
                      state: je,
                      close: be,
                      focus: Fe,
                      event: Ne,
                      onError: le,
                      container: ge
                    })), jt(de)) {
                      if (Pe.type === ve.ARRAY ? !Array.isArray(de) : typeof de !== Pe.type) throw new TypeError("Prop is not of type " + Pe.type + ": " + Ce);
                    } else if (Pe.required !== !1 && !jt(Y[Ce])) throw new Error('Expected prop "' + Ce + '" to be defined');
                    return jt(de) && Pe.decorate && (de = Pe.decorate({
                      value: de,
                      props: te,
                      state: je,
                      close: be,
                      focus: Fe,
                      event: Ne,
                      onError: le,
                      container: ge
                    })), de;
                  }());
                }
              });
            }), Xn(te, U, ye);
          }(h, H, L, B, N);
        }, us = function(x) {
          return to(x), z.then(function() {
            var N = Se, B = ue;
            if (N && B && xt) return ke(xt).then(function(U) {
              return N.updateProps(U).catch(function(te) {
                return _i(B).then(function(Y) {
                  if (!Y) throw te;
                });
              });
            });
          });
        }, Bi = function(x) {
          return At ? At(x) : O.try(function() {
            return Uo(x);
          }).then(function(N) {
            return Ln(N) && (N = function B(U) {
              var te = function(je) {
                var be = function(Fe) {
                  for (; Fe.parentNode; ) Fe = Fe.parentNode;
                  if (Ln(Fe)) return Fe;
                }(je);
                if (be && be.host) return be.host;
              }(U);
              if (!te) throw new Error("Element is not in shadow dom");
              var Y = "shadow-slot-" + Xe(), me = document.createElement("slot");
              me.setAttribute("name", Y), U.appendChild(me);
              var ge = document.createElement("div");
              return ge.setAttribute("slot", Y), te.appendChild(ge), Ln(te) ? B(ge) : ge;
            }(N)), ht = N, fn(N);
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
                return H && H.onError ? H.onError(x) : Te(x).then(function() {
                  setTimeout(function() {
                    throw x;
                  }, 1);
                });
              }), A.register($.reset);
            })();
          },
          render: function(x) {
            var N = x.target, B = x.container, U = x.context, te = x.rerender;
            return O.try(function() {
              var Y = ir(), me = S || ir();
              (function(G, $e, Ie) {
                if (G !== window) {
                  if (!Zr(window, G)) throw new Error("Can only renderTo an adjacent frame");
                  var qe = D();
                  if (!ct($e, qe) && !j(G)) throw new Error("Can not render remotely to " + $e.toString() + " - can only render to " + qe);
                  if (Ie && typeof Ie != "string") throw new Error("Container passed to renderTo must be a string selector, got " + typeof Ie + " }");
                }
              })(N, me, B);
              var ge = O.try(function() {
                if (N !== window) return function(G, $e) {
                  for (var Ie = {}, qe = 0, at = Object.keys(H); qe < at.length; qe++) {
                    var Ae = at[qe], gt = h[Ae];
                    gt && gt.allowDelegate && (Ie[Ae] = H[Ae]);
                  }
                  var Ge = bt($e, "zoid_delegate_" + w, {
                    uid: r,
                    overrides: {
                      props: Ie,
                      event: $,
                      close: _t,
                      onError: $r,
                      getInternalState: _e,
                      setInternalState: Me,
                      resolveInitPromise: Le,
                      rejectInitPromise: Te
                    }
                  }).then(function(Z) {
                    var Q = Z.data.parent;
                    return A.register(function(W) {
                      if (!xe($e)) return Q.destroy(W);
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
                  }, Vt = function() {
                    for (var Z = arguments.length, Q = new Array(Z), W = 0; W < Z; W++) Q[W] = arguments[W];
                    return Ge.then(function(ee) {
                      return ee.renderContainer.apply(ee, Q);
                    });
                  }, qt = function() {
                    for (var Z = arguments.length, Q = new Array(Z), W = 0; W < Z; W++) Q[W] = arguments[W];
                    return Ge.then(function(ee) {
                      return ee.show.apply(ee, Q);
                    });
                  }, Ht = function() {
                    for (var Z = arguments.length, Q = new Array(Z), W = 0; W < Z; W++) Q[W] = arguments[W];
                    return Ge.then(function(ee) {
                      return ee.hide.apply(ee, Q);
                    });
                  }, pt = function() {
                    for (var Z = arguments.length, Q = new Array(Z), W = 0; W < Z; W++) Q[W] = arguments[W];
                    return Ge.then(function(ee) {
                      return ee.watchForUnload.apply(ee, Q);
                    });
                  }, G === Oe.IFRAME ? (Pt = function() {
                    for (var Z = arguments.length, Q = new Array(Z), W = 0; W < Z; W++) Q[W] = arguments[W];
                    return Ge.then(function(ee) {
                      return ee.getProxyWindow.apply(ee, Q);
                    });
                  }, Gt = function() {
                    for (var Z = arguments.length, Q = new Array(Z), W = 0; W < Z; W++) Q[W] = arguments[W];
                    return Ge.then(function(ee) {
                      return ee.openFrame.apply(ee, Q);
                    });
                  }, Jt = function() {
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
                  }) : G === Oe.POPUP && (rr = function() {
                    for (var Z = arguments.length, Q = new Array(Z), W = 0; W < Z; W++) Q[W] = arguments[W];
                    return Ge.then(function(ee) {
                      return ee.setProxyWin.apply(ee, Q);
                    });
                  }), Ge;
                }(U, N);
              }), je = H.window, be = Wi(), Fe = Di(h, H, "post"), Ne = $.trigger(Ee.RENDER), le = Bi(B), Ce = vt(), Pe = le.then(function() {
                return to();
              }), ot = Pe.then(function() {
                return Di(h, H, "get").then(function(G) {
                  return function($e, Ie) {
                    var qe = Ie.query || {}, at = Ie.hash || {}, Ae, gt, Ge = $e.split("#");
                    gt = Ge[1];
                    var Z = (Ae = Ge[0]).split("?");
                    Ae = Z[0];
                    var Q = jo(Z[1], qe), W = jo(gt, at);
                    return Q && (Ae = Ae + "?" + Q), W && (Ae = Ae + "#" + W), Ae;
                  }(On(wr()), {
                    query: G
                  });
                });
              }), Ue = Ce.then(function(G) {
                return function(Ie) {
                  var qe = Ie === void 0 ? {} : Ie, at = qe.proxyWin, Ae = qe.initialChildDomain, gt = qe.childDomainMatch, Ge = qe.target, Z = Ge === void 0 ? window : Ge, Q = qe.context;
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
                          close: _t,
                          checkClose: function() {
                            return _i(Hi);
                          },
                          resize: Ur,
                          onError: $r,
                          show: Tt,
                          hide: Wt,
                          export: Fi
                        })
                      };
                      var Hi;
                    });
                  }({
                    proxyWin: at,
                    initialChildDomain: Ae,
                    childDomainMatch: gt,
                    context: Q
                  }).then(function(W) {
                    var ee = Pi({
                      data: W,
                      metaData: {
                        windowRef: jr(Z, Ae, Q, at)
                      },
                      sender: {
                        domain: D(window)
                      },
                      receiver: {
                        win: at,
                        domain: gt
                      },
                      passByReference: Ae === D()
                    }), ro = ee.serializedData;
                    return A.register(ee.cleanReference), ro;
                  });
                }({
                  proxyWin: ($e = {
                    proxyWin: G,
                    initialChildDomain: Y,
                    childDomainMatch: me,
                    target: N,
                    context: U
                  }).proxyWin,
                  initialChildDomain: $e.initialChildDomain,
                  childDomainMatch: $e.childDomainMatch,
                  target: $e.target,
                  context: $e.context
                }).then(function(Ie) {
                  return Ri({
                    name: w,
                    serializedPayload: Ie
                  });
                });
                var $e;
              }), de = Ue.then(function(G) {
                return nt(U, {
                  windowName: G
                });
              }), Be = zr(U), tt = O.hash({
                proxyContainer: le,
                proxyFrame: de,
                proxyPrerenderFrame: Be
              }).then(function(G) {
                return ji(G.proxyContainer, {
                  context: U,
                  proxyFrame: G.proxyFrame,
                  proxyPrerenderFrame: G.proxyPrerenderFrame,
                  rerender: te
                });
              }).then(function(G) {
                return G;
              }), Ve = O.hash({
                windowName: Ue,
                proxyFrame: de,
                proxyWin: Ce
              }).then(function(G) {
                var $e = G.proxyWin;
                return je ? $e : Ai(U, {
                  windowName: G.windowName,
                  proxyWin: $e,
                  proxyFrame: G.proxyFrame
                });
              }), ar = O.hash({
                proxyWin: Ve,
                proxyPrerenderFrame: Be
              }).then(function(G) {
                return Lr(U, G.proxyWin, G.proxyPrerenderFrame);
              }), wt = Ve.then(function(G) {
                return ue = G, rt(G);
              }), Dt = O.hash({
                proxyPrerenderWin: ar,
                state: wt
              }).then(function(G) {
                return Li(G.proxyPrerenderWin, {
                  context: U
                });
              }), $i = O.hash({
                proxyWin: Ve,
                windowName: Ue
              }).then(function(G) {
                if (je) return G.proxyWin.setName(G.windowName);
              }), cs = O.hash({
                body: Fe
              }).then(function(G) {
                return n.method ? n.method : Object.keys(G.body).length ? "post" : "get";
              }), qi = O.hash({
                proxyWin: Ve,
                windowUrl: ot,
                body: Fe,
                method: cs,
                windowName: $i,
                prerender: Dt
              }).then(function(G) {
                return G.proxyWin.setLocation(G.windowUrl, {
                  method: G.method,
                  body: G.body
                });
              }), ds = Ve.then(function(G) {
                (function $e(Ie, qe) {
                  var at = !1;
                  return A.register(function() {
                    at = !0;
                  }), O.delay(2e3).then(function() {
                    return Ie.isClosed();
                  }).then(function(Ae) {
                    if (!at) {
                      if (qe === Oe.POPUP && Ae) return _t(new Error("Detected popup close"));
                      var gt = !!(ht && vr(ht));
                      return qe === Oe.IFRAME && Ae && (gt || Bt) ? _t(new Error("Detected iframe close")) : $e(Ie, qe);
                    }
                  });
                })(G, U);
              }), fs = O.hash({
                container: tt,
                prerender: Dt
              }).then(function() {
                return $.trigger(Ee.DISPLAY);
              }), ls = Ve.then(function(G) {
                return function($e, Ie, qe) {
                  return O.try(function() {
                    return $e.awaitWindow();
                  }).then(function(at) {
                    if (Ut && Ut.needsBridge({
                      win: at,
                      domain: Ie
                    }) && !Ut.hasBridge(Ie, Ie)) {
                      var Ae = typeof n.bridgeUrl == "function" ? n.bridgeUrl({
                        props: H
                      }) : n.bridgeUrl;
                      if (!Ae) throw new Error("Bridge needed to render " + qe);
                      var gt = Nt(Ae);
                      return Ut.linkUrl(at, Ie), Ut.openBridge(On(Ae), gt);
                    }
                  });
                }(G, Y, U);
              }), hs = qi.then(function() {
                return O.try(function() {
                  var G = H.timeout;
                  if (G) return z.timeout(G, new Error("Loading component timed out after " + G + " milliseconds"));
                });
              }), ps = z.then(function() {
                return Bt = !0, $.trigger(Ee.RENDERED);
              });
              return O.hash({
                initPromise: z,
                buildUrlPromise: ot,
                onRenderPromise: Ne,
                getProxyContainerPromise: le,
                openFramePromise: de,
                openPrerenderFramePromise: Be,
                renderContainerPromise: tt,
                openPromise: Ve,
                openPrerenderPromise: ar,
                setStatePromise: wt,
                prerenderPromise: Dt,
                loadUrlPromise: qi,
                buildWindowNamePromise: Ue,
                setWindowNamePromise: $i,
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
              return O.all([$r(Y), Br(Y)]).then(function() {
                throw Y;
              }, function() {
                throw Y;
              });
            }).then(ye);
          },
          destroy: Br,
          getProps: function() {
            return H;
          },
          setProps: to,
          export: Fi,
          getHelpers: Ui,
          getDelegateOverrides: function() {
            return O.try(function() {
              return {
                getProxyContainer: Bi,
                show: Tt,
                hide: Wt,
                renderContainer: ji,
                getProxyWindow: vt,
                watchForUnload: Wi,
                openFrame: nt,
                openPrerenderFrame: zr,
                prerender: Li,
                open: Ai,
                openPrerender: Lr,
                setProxyWin: rt
              };
            });
          },
          getExports: function() {
            return I({
              getExports: function() {
                return Mi;
              }
            });
          }
        };
      }
      var Xa = {
        register: function(e, r, n, o) {
          var a = o.React, u = o.ReactDOM;
          return function(d) {
            T(h, d);
            function h() {
              return d.apply(this, arguments) || this;
            }
            var l = h.prototype;
            return l.render = function() {
              return a.createElement("div", null);
            }, l.componentDidMount = function() {
              var v = u.findDOMNode(this), y = n(pr({}, this.props));
              y.render(v, Oe.IFRAME), this.setState({
                parent: y
              });
            }, l.componentDidUpdate = function() {
              this.state && this.state.parent && this.state.parent.updateProps(pr({}, this.props)).catch(ye);
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
              this.parent = n(P({}, (u = this.$attrs, Object.keys(u).reduce(function(d, h) {
                var l = u[h];
                return h === "style-object" || h === "styleObject" ? (d.style = l, d.styleObject = l) : h.includes("-") ? d[In(h)] = l : d[h] = l, d;
              }, {}))));
              var u;
              this.parent.render(a, Oe.IFRAME);
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
              var o = this.$el;
              this.parent = n(P({}, (a = this.$attrs, Object.keys(a).reduce(function(u, d) {
                var h = a[d];
                return d === "style-object" || d === "styleObject" ? (u.style = h, u.styleObject = h) : d.includes("-") ? u[In(d)] = h : u[d] = h, u;
              }, {}))));
              var a;
              this.parent.render(o, Oe.IFRAME);
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
        register: function(e, r, n, o) {
          return o.module(e, []).directive(In(e), function() {
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
                var y = function() {
                  return rn(h.props, function(p) {
                    return typeof p == "function" ? function() {
                      var g = p.apply(this, arguments);
                      return v(), g;
                    } : p;
                  });
                }, w = n(y());
                w.render(l[0], Oe.IFRAME), h.$watch(function() {
                  w.updateProps(y()).catch(ye);
                });
              }]
            };
          });
        }
      }, rs = {
        register: function(e, r, n, o) {
          var a = o.Component, u = o.NgModule, d = o.ElementRef, h = o.NgZone, l = o.Inject, v = function() {
            function w(g, E) {
              this.elementRef = void 0, this.internalProps = void 0, this.parent = void 0, this.props = void 0, this.zone = void 0, this._props = void 0, this._props = {}, this.elementRef = g, this.zone = E;
            }
            var p = w.prototype;
            return p.getProps = function() {
              var g = this;
              return rn(P({}, this.internalProps, this.props), function(E) {
                if (typeof E == "function") {
                  var R = g.zone;
                  return function() {
                    var S = arguments, I = this;
                    return R.run(function() {
                      return E.apply(I, S);
                    });
                  };
                }
                return E;
              });
            }, p.ngOnInit = function() {
              var g = this.elementRef.nativeElement;
              this.parent = n(this.getProps()), this.parent.render(g, Oe.IFRAME);
            }, p.ngDoCheck = function() {
              this.parent && !function(g, E) {
                var R = {};
                for (var S in g) if (g.hasOwnProperty(S) && (R[S] = !0, g[S] !== E[S]))
                  return !1;
                for (var I in E) if (!R[I]) return !1;
                return !0;
              }(this._props, this.props) && (this._props = P({}, this.props), this.parent.updateProps(this.getProps()));
            }, w;
          }();
          v.annotations = void 0, v.parameters = void 0, v.parameters = [[new l(d)], [new l(h)]], v.annotations = [new a({
            selector: e,
            template: "<div></div>",
            inputs: ["props"]
          })];
          var y = function() {
          };
          return y.annotations = void 0, y.annotations = [new u({
            declarations: [v],
            exports: [v]
          })], y;
        }
      };
      function ns(e) {
        var r = e.uid, n = e.frame, o = e.prerenderFrame, a = e.doc, u = e.props, d = e.event, h = e.dimensions, l = h.width, v = h.height;
        if (n && o) {
          var y = a.createElement("div");
          y.setAttribute("id", r);
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
        `)), y.appendChild(n), y.appendChild(o), y.appendChild(w), o.classList.add("zoid-visible"), n.classList.add("zoid-invisible"), d.on(Ee.RENDERED, function() {
            o.classList.remove("zoid-visible"), o.classList.add("zoid-invisible"), n.classList.remove("zoid-invisible"), n.classList.add("zoid-visible"), setTimeout(function() {
              Wr(o);
            }, 1);
          }), d.on(Ee.RESIZE, function(p) {
            var g = p.width, E = p.height;
            typeof g == "number" && (y.style.width = Yo(g)), typeof E == "number" && (y.style.height = Yo(E));
          }), y;
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
      var kn = nn(), eo = nn();
      function is(e) {
        var r = function(E) {
          var R = E.tag, S = E.url, I = E.domain, z = E.bridgeUrl, V = E.props, A = V === void 0 ? {} : V, q = E.dimensions, L = q === void 0 ? {} : q, X = E.autoResize, $ = X === void 0 ? {} : X, ce = E.allowedParentDomains, ne = ce === void 0 ? "*" : ce, K = E.attributes, H = K === void 0 ? {} : K, ue = E.defaultContext, k = ue === void 0 ? Oe.IFRAME : ue, Se = E.containerTemplate, xt = Se === void 0 ? ns : Se, ht = E.prerenderTemplate, Bt = ht === void 0 ? os : ht, $t = E.validate, At = E.eligible, qt = At === void 0 ? function() {
            return {
              eligible: !0
            };
          } : At, Ht = E.logger, tr = Ht === void 0 ? {
            info: ye
          } : Ht, Vt = E.exports, Pt = Vt === void 0 ? ye : Vt, rr = E.method, Gt = E.children, Jt = Gt === void 0 ? function() {
            return {};
          } : Gt, nr = R.replace(/-/g, "_"), or = P({}, {
            window: {
              type: ve.OBJECT,
              sendToChild: !1,
              required: !1,
              allowDelegate: !0,
              validate: function(oe) {
                var pt = oe.value;
                if (!Xt(pt) && !lt.isProxyWindow(pt)) throw new Error("Expected Window or ProxyWindow");
                if (Xt(pt)) {
                  if (xe(pt)) throw new Error("Window is closed");
                  if (!j(pt)) throw new Error("Window is not same domain");
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
          }, A);
          if (!xt) throw new Error("Container template required");
          return {
            name: nr,
            tag: R,
            url: S,
            domain: I,
            bridgeUrl: z,
            method: rr,
            propsDef: or,
            dimensions: L,
            autoResize: $,
            allowedParentDomains: ne,
            attributes: H,
            defaultContext: k,
            containerTemplate: xt,
            prerenderTemplate: Bt,
            validate: $t,
            logger: tr,
            eligible: qt,
            children: Jt,
            exports: typeof Pt == "function" ? Pt : function(oe) {
              for (var pt = oe.getExports, se = {}, ze = function() {
                var Te = Le[De], ke = Pt[Te].type, _e = pt().then(function(Me) {
                  return Me[Te];
                });
                se[Te] = ke === ve.FUNCTION ? function() {
                  for (var Me = arguments.length, vt = new Array(Me), rt = 0; rt < Me; rt++) vt[rt] = arguments[rt];
                  return _e.then(function(Tt) {
                    return Tt.apply(void 0, vt);
                  });
                } : _e;
              }, De = 0, Le = Object.keys(Pt); De < Le.length; De++) ze();
              return se;
            }
          };
        }(e), n = r.name, o = r.tag, a = r.defaultContext, u = r.propsDef, d = r.eligible, h = r.children, l = Fr(window), v = {}, y = [], w = function() {
          if (function(R) {
            try {
              return Qn(window.name).name === R;
            } catch {
            }
            return !1;
          }(n)) {
            var E = Oi().payload;
            if (E.tag === o && ct(E.childDomainMatch, D())) return !0;
          }
          return !1;
        }, p = Lt(function() {
          if (w()) {
            if (window.xprops)
              throw delete l.components[o], new Error("Can not register " + n + " as child - child already registered");
            var E = function(R) {
              var S = R.tag, I = R.propsDef, z = R.autoResize, V = R.allowedParentDomains, A = [], q = Oi(), L = q.parent, X = q.payload, $ = L.win, ce = L.domain, ne, K = new O(), H = X.version, ue = X.uid, k = X.exports, Se = X.context, xt = X.props;
              if (!function(se, ze) {
                if (!/_/.test(se) || !/_/.test("10_3_3")) throw new Error("Versions are in an invalid format (" + se + ", 10_3_3)");
                return se.split("_")[0] === "10_3_3".split("_")[0];
              }(H)) throw new Error("Parent window has zoid version " + H + ", child window has version 10_3_3");
              var ht = k.show, Bt = k.hide, $t = k.close, At = k.onError, qt = k.checkClose, Ht = k.export, tr = k.resize, Vt = k.init, Pt = function() {
                return $;
              }, rr = function() {
                return ce;
              }, Gt = function(se) {
                return A.push(se), {
                  cancel: function() {
                    A.splice(A.indexOf(se), 1);
                  }
                };
              }, Jt = function(se) {
                return tr.fireAndForget({
                  width: se.width,
                  height: se.height
                });
              }, nr = function(se) {
                return K.resolve(se), Ht(se);
              }, or = function(se) {
                var ze = (se === void 0 ? {} : se).anyParent, De = [], Le = ne.parent;
                if (ze === void 0 && (ze = !Le), !ze && !Le) throw new Error("No parent found for " + S + " child");
                for (var Te = 0, ke = Re(window); Te < ke.length; Te++) {
                  var _e = ke[Te];
                  if (j(_e)) {
                    var Me = J(_e).xprops;
                    if (Me && Pt() === Me.getParent()) {
                      var vt = Me.parent;
                      if (ze || !Le || vt && vt.uid === Le.uid) {
                        var rt = bi(_e, function(Tt) {
                          return Tt.exports;
                        });
                        De.push({
                          props: Me,
                          exports: rt
                        });
                      }
                    }
                  }
                }
                return De;
              }, oe = function(se, ze, De) {
                De === void 0 && (De = !1);
                var Le = function(ke, _e, Me, vt, rt, Tt) {
                  Tt === void 0 && (Tt = !1);
                  for (var Wt = {}, wr = 0, mr = Object.keys(Me); wr < mr.length; wr++) {
                    var ir = mr[wr], nt = _e[ir], zr = nt && nt.trustedDomains && nt.trustedDomains.length > 0 ? nt.trustedDomains.reduce(function(pn, Ur) {
                      return pn || ct(Ur, D(window));
                    }, !1) : vt === D(window) || j(ke);
                    if ((!nt || !nt.sameDomain || zr) && (!nt || !nt.trustedDomains || zr)) {
                      var Lr = Si(_e, 0, ir, Me[ir], rt);
                      Wt[ir] = Lr, nt && nt.alias && !Wt[nt.alias] && (Wt[nt.alias] = Lr);
                    }
                  }
                  if (!Tt) for (var gr = 0, hn = Object.keys(_e); gr < hn.length; gr++) {
                    var jr = hn[gr];
                    Me.hasOwnProperty(jr) || (Wt[jr] = Si(_e, 0, jr, void 0, rt));
                  }
                  return Wt;
                }($, I, se, ze, {
                  tag: S,
                  show: ht,
                  hide: Bt,
                  close: $t,
                  focus: Qa,
                  onError: At,
                  resize: Jt,
                  getSiblings: or,
                  onProps: Gt,
                  getParent: Pt,
                  getParentDomain: rr,
                  uid: ue,
                  export: nr
                }, De);
                ne ? pr(ne, Le) : ne = Le;
                for (var Te = 0; Te < A.length; Te++) (0, A[Te])(ne);
              }, pt = function(se) {
                return O.try(function() {
                  return oe(se, ce, !0);
                });
              };
              return {
                init: function() {
                  return O.try(function() {
                    var se = "";
                    return j($) && (se = function(ze) {
                      var De = ze.componentName, Le = ze.parentComponentWindow, Te = Ti({
                        data: Qn(window.name).serializedInitialPayload,
                        sender: {
                          win: Le
                        },
                        basic: !0
                      }), ke = Te.sender;
                      if (Te.reference.type === "uid" || Te.metaData.windowRef.type === "global") {
                        var _e = Ri({
                          name: De,
                          serializedPayload: Pi({
                            data: Te.data,
                            metaData: {
                              windowRef: Za(Le)
                            },
                            sender: {
                              domain: ke.domain
                            },
                            receiver: {
                              win: window,
                              domain: D()
                            },
                            basic: !0
                          }).serializedData
                        });
                        return window.name = _e, _e;
                      }
                    }({
                      componentName: R.name,
                      parentComponentWindow: $
                    }) || ""), Fr(window).exports = R.exports({
                      getExports: function() {
                        return K;
                      }
                    }), function(ze, De) {
                      if (!ct(ze, De)) throw new Error("Can not be rendered by domain: " + De);
                    }(V, ce), ri($), function() {
                      window.addEventListener("beforeunload", function() {
                        qt.fireAndForget();
                      }), window.addEventListener("unload", function() {
                        qt.fireAndForget();
                      }), So($, function() {
                        xi();
                      });
                    }(), Vt({
                      name: se,
                      updateProps: pt,
                      close: xi
                    });
                  }).then(function() {
                    return (se = z.width, ze = se !== void 0 && se, De = z.height, Le = De !== void 0 && De, Te = z.element, Uo(Te === void 0 ? "body" : Te).catch(ye).then(function(ke) {
                      return {
                        width: ze,
                        height: Le,
                        element: ke
                      };
                    })).then(function(ke) {
                      var _e = ke.width, Me = ke.height, vt = ke.element;
                      vt && (_e || Me) && Se !== Oe.POPUP && Vo(vt, function(rt) {
                        Jt({
                          width: _e ? rt.width : void 0,
                          height: Me ? rt.height : void 0
                        });
                      }, {
                        width: _e,
                        height: Me
                      });
                    });
                    var se, ze, De, Le, Te;
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
          var S, I = "zoid-" + o + "-" + Xe(), z = R || {}, V = d({
            props: z
          }), A = V.eligible, q = V.reason, L = z.onDestroy;
          z.onDestroy = function() {
            if (S && A && y.splice(y.indexOf(S), 1), L) return L.apply(void 0, arguments);
          };
          var X = Ni({
            uid: I,
            options: r
          });
          X.init(), A ? X.setProps(z) : z.onDestroy && z.onDestroy(), kn.register(function(ne) {
            return X.destroy(ne || new Error("zoid destroyed all components"));
          });
          var $ = function(ne) {
            var K = (ne === void 0 ? {} : ne).decorate;
            return E((K === void 0 ? Fa : K)(z));
          }, ce = function(ne, K, H) {
            return O.try(function() {
              if (!A) {
                var ue = new Error(q || n + " component is not eligible");
                return X.destroy(ue).then(function() {
                  throw ue;
                });
              }
              if (!Xt(ne)) throw new Error("Must pass window to renderTo");
              return function(k, Se) {
                return O.try(function() {
                  if (k.window) return Mr(k.window).getType();
                  if (Se) {
                    if (Se !== Oe.IFRAME && Se !== Oe.POPUP) throw new Error("Unrecognized context: " + Se);
                    return Se;
                  }
                  return a;
                });
              }(z, H);
            }).then(function(ue) {
              if (K = function(k, Se) {
                if (Se) {
                  if (typeof Se != "string" && !Sn(Se)) throw new TypeError("Expected string or element selector to be passed");
                  return Se;
                }
                if (k === Oe.POPUP) return "body";
                throw new Error("Expected element to be passed to render iframe");
              }(ue, K), ne !== window && typeof K != "string") throw new Error("Must pass string element when rendering to another window");
              return X.render({
                target: ne,
                container: K,
                context: ue,
                rerender: function() {
                  var k = $();
                  return pr(S, k), k.renderTo(ne, K, H);
                }
              });
            }).catch(function(ue) {
              return X.destroy(ue).then(function() {
                throw ue;
              });
            });
          };
          return S = P({}, X.getExports(), X.getHelpers(), function() {
            for (var ne = h(), K = {}, H = function() {
              var Se = k[ue], xt = ne[Se];
              K[Se] = function(ht) {
                var Bt = X.getProps(), $t = P({}, ht, {
                  parent: {
                    uid: I,
                    props: Bt,
                    export: X.export
                  }
                });
                return xt($t);
              };
            }, ue = 0, k = Object.keys(ne); ue < k.length; ue++) H();
            return K;
          }(), {
            isEligible: function() {
              return A;
            },
            clone: $,
            render: function(ne, K) {
              return ce(window, ne, K);
            },
            renderTo: function(ne, K, H) {
              return ce(ne, K, H);
            }
          }), A && y.push(S), S;
        };
        if (p(), function() {
          var E = Ct("zoid_allow_delegate_" + n, function() {
            return !0;
          }), R = Ct("zoid_delegate_" + n, function(S) {
            var I = S.data;
            return {
              parent: Ni({
                uid: I.uid,
                options: r,
                overrides: I.overrides,
                parentWin: S.source
              })
            };
          });
          eo.register(E.cancel), eo.register(R.cancel);
        }(), l.components = l.components || {}, l.components[o]) throw new Error("Can not register multiple components with the same tag: " + o);
        return l.components[o] = !0, {
          init: g,
          instances: y,
          driver: function(E, R) {
            var S = {
              react: Xa,
              angular: ts,
              vue: ka,
              vue3: es,
              angular2: rs
            };
            if (!S[E]) throw new Error("Could not find driver for framework: " + E);
            return v[E] || (v[E] = S[E].register(o, u, g, R)), v[E];
          },
          isChild: w,
          canRenderTo: function(E) {
            return bt(E, "zoid_allow_delegate_" + n).then(function(R) {
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
          St().initialized || (St().initialized = !0, u = (a = {
            on: Ct,
            send: bt
          }).on, d = a.send, (h = St()).receiveMessage = h.receiveMessage || function(l) {
            return Yn(l, {
              on: u,
              send: d
            });
          }, function(l) {
            var v = l.on, y = l.send;
            fe().getOrSet("postMessageListener", function() {
              return qo(window, "message", function(w) {
                (function(p, g) {
                  var E = g.on, R = g.send;
                  O.try(function() {
                    var S = p.source || p.sourceElement, I = p.origin || p.originalEvent && p.originalEvent.origin, z = p.data;
                    if (I === "null" && (I = "file://"), S) {
                      if (!I) throw new Error("Post message did not have origin domain");
                      Yn({
                        source: S,
                        origin: I,
                        data: z
                      }, {
                        on: E,
                        send: R
                      });
                    }
                  });
                })(w, {
                  on: v,
                  send: y
                });
              });
            });
          }({
            on: Ct,
            send: bt
          }), di({
            on: Ct,
            send: bt,
            receiveMessage: Yn
          }), function(l) {
            var v = l.on, y = l.send;
            fe("builtinListeners").getOrSet("helloListener", function() {
              var w = v("postrobot_hello", {
                domain: "*"
              }, function(g) {
                return ko(g.source, {
                  domain: g.origin
                }), {
                  instanceID: Xo()
                };
              }), p = Qt();
              return p && Un(p, {
                send: y
              }).catch(function(g) {
              }), w;
            });
          }({
            on: Ct,
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
      function Ci(e) {
        Ut && Ut.destroyBridges();
        var r = kn.all(e);
        return kn = nn(), r;
      }
      var Ii = Ci;
      function ss(e) {
        return Ii(), delete window.__zoid_10_3_3__, function() {
          (function() {
            for (var n = fe("responseListeners"), o = 0, a = n.keys(); o < a.length; o++) {
              var u = a[o], d = n.get(u);
              d && (d.cancelled = !0), n.del(u);
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
  frame: i,
  prerenderFrame: s,
  doc: c,
  props: f,
  event: m,
  dimensions: T
}) {
  const { width: P, height: C } = T, { top: _ = 0, left: b = 0 } = f;
  if (!i || !s)
    return;
  const M = c.createElement("div");
  M.setAttribute("id", t);
  const F = c.createElement("style");
  return f.cspNonce && F.setAttribute("nonce", f.cspNonce), F.appendChild(
    c.createTextNode(`
          #${t} {
              display: inline-block;
              position: absolute;
              width: ${P};
              height: ${C};
              z-index: 1049;
              border: none;
              top: ${_}px;
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
  ), M.appendChild(i), M.appendChild(s), M.appendChild(F), s.classList.add(Er.INVISIBLE), i.classList.add(Er.INVISIBLE), m.on(na.RENDERED, () => {
    setTimeout(() => {
      i.classList.remove(Er.INVISIBLE), i.classList.add(Er.VISIBLE);
    }, 100), setTimeout(() => {
      s.remove();
    }, 1);
  }), m.on(na.RESIZE, ({ width: re, height: ae }) => {
    typeof re == "number" && (M.style.width = `${re}px`), typeof ae == "number" && (M.style.height = `${ae}px`);
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
let br = null;
function oa() {
  br = null;
}
function oc(t) {
  const i = window;
  return i.Go ? Promise.resolve(i.wasm) : br || (br = nc(t).then(() => i.Go), br.then(oa).catch(oa), br);
}
class Pr {
  constructor() {
    return Pr.instance ? Pr.instance : (this.session = null, this.go = null, this.buffer = null, this.audioMediaSequence = {}, Pr.instance = this, this);
  }
  async init(i) {
    if (!this.buffer) {
      const c = await (await fetch(i)).arrayBuffer();
      this.buffer = c;
    }
    return Pr.instance;
  }
  async loadSource(i) {
    this.session && (i.session = this.session);
    const s = JSON.stringify(i), c = new Go(), f = await WebAssembly.instantiate(this.buffer, c.importObject);
    c.run(f.instance);
    let m;
    for (let T = 1; T <= 3; T++)
      try {
        m = await window.loadSource(s);
        break;
      } catch (P) {
        if (console.log(`Attempt ${T} failed:`, P), T === 3)
          throw console.log("session:", this.session), P;
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
function ia({ adsUrl: t, sdk: i, loader: s }) {
  return class extends s {
    constructor(f) {
      super(f);
    }
    load(f, m, T) {
      const P = T.onSuccess;
      T.onSuccess = async (C, _, b) => {
        (b.type === "manifest" || b.type === "level" || b.type === "audioTrack") && (C.data = await this.modifyManifest(C.url, C.data, b.type)), P(C, _, b);
      }, super.load(f, m, T);
    }
    async modifyManifest(f, m, T) {
      const P = {
        proxyAds: {
          uri: t,
          timeout: 2
        }
      };
      try {
        return await i.loadSource({ config: P, manifest: m, masterUri: f });
      } catch (C) {
        return console.error("[LOG] ~ error:", C), m;
      }
    }
  };
}
function ic({
  video: t,
  adContainer: i,
  startSession: s,
  sdk: c,
  domain: f
}) {
  const m = Qu(), T = Ft(!1), P = Ft(), C = Math.random().toString(36).slice(6);
  function _({ icons: D }) {
    const j = Gr(f, "/build/dist/wta/index.html");
    return {
      id: C,
      appConfig: {
        sdkBaseUrl: bn(j || "https://localhost:4222/wta/index.html", { id: C })
      },
      icons: D
    };
  }
  if (!!i) {
    const D = rc(_({
      icons: []
    }));
    D.render(i), D.hide(), i.style.display = "none", Su(() => {
      var j;
      if (P.value) {
        const J = ((j = P.value) == null ? void 0 : j.icons) || [];
        i.style.display = "block", D.updateProps(_({
          icons: J
        })), D.show();
      } else
        i.style.display = "none", D.hide();
    });
  }
  const M = Ft([]), F = Ft(), re = Ft([]);
  async function ae(D) {
    var J;
    const j = (J = P.value) == null ? void 0 : J.trackingEvents.find((we) => we.eventType === D);
    j && (m.trigger(j), await Promise.all(j.beaconUrls.map((we) => Xu(cu(we, {
      retry: 3,
      retryDelay: 500
    })))));
  }
  const ut = /* @__PURE__ */ new Map();
  let O, mt;
  function Ze(D, j, J) {
    D.addEventListener(j, J), ut.set(j, J);
  }
  function yt(D) {
    var Je, Ke;
    const j = ((D == null ? void 0 : D.time) || 0) > 0 ? D.time : 0, J = (Je = D == null ? void 0 : D.value) == null ? void 0 : Je.event, we = re.value.find((Re) => Re.eventType === J && !Re.tracked && !Re.skipped);
    if (!we)
      return;
    const et = we == null ? void 0 : we.ad;
    if (et)
      if (J === "start")
        P.value && re.value.filter((Qe) => Qe.key.startsWith(`${P.value.key}_`)).forEach((Qe) => Qe.skipped = !0), P.value = et, s(et.adVerifications, m), O = io(() => {
          ae("impression"), ae("start");
          const Re = re.value.find((Qe) => Qe.key === we.key.replace("_start", "_impression"));
          Re && (Re.tracked = !0), we.tracked = !0, mt = io(() => {
            P.value = void 0;
          }, 30 * 1e3);
        }, j * 1e3);
      else {
        if (!P.value)
          return;
        if (et.id !== ((Ke = P.value) == null ? void 0 : Ke.id)) {
          re.value.filter((Qe) => Qe.key.startsWith(`${P.value.key}_`)).forEach((Qe) => Qe.skipped = !0);
          return;
        }
        O = io(() => {
          ae(J), J === "complete" && et.id === P.value.id && (P.value = void 0, oo(mt)), we.tracked = !0;
        }, j * 1e3);
      }
  }
  function ur() {
    return T.value = !1, ["fullscreenchange", "webkitfullscreenchange", "mozfullscreenchange", "msfullscreenchange"].forEach((D) => {
      Ze(t, D, () => {
        const j = document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement;
        ae(j ? "fullscreen" : "exitFullscreen");
      });
    }), Ze(t, "pause", () => ae("pause")), Ze(t, "play", () => ae("resume")), Ze(t, "rewind", () => ae("rewind")), Ze(t, "mute", () => ae("mute")), Ze(t, "unmute", () => ae("unmute")), async (D, j) => {
      if (F.value = j.frag.sn, D !== window.Hls.Events.FRAG_CHANGED)
        return;
      const J = M.value.filter((we) => we.sn === j.frag.sn);
      J.length && (J.forEach((we) => yt(we)), M.value = M.value.filter((we) => we.sn !== j.frag.sn));
    };
  }
  async function zt() {
    return c.getEventTracking().then((D) => {
      for (const j of (D == null ? void 0 : D.avails) || [])
        for (const J of j.ads) {
          const we = `${j.id}_${J.id}_${J.startTimeInSeconds}`;
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
    return async (D, j) => {
      function J(Je) {
        for (let Ke = 0; Ke < Je.length; Ke++)
          if (Je[Ke] === 0)
            return Ke;
        return Je.length;
      }
      const { start: we, sn: et } = j.frag;
      for (let Je = 0; Je < j.samples.length; Je++) {
        const Ke = j.samples[Je], Re = Ke.data, Qe = Ke.pts;
        if (String.fromCharCode.apply(null, Re.slice(0, 3)) !== "ID3" || String.fromCharCode.apply(null, Re.slice(10, 14)) !== "TXXX")
          continue;
        const dr = Re.slice(21, Re.length), fr = J(dr), Dr = dr.slice(fr + 1, dr.length), Qt = J(Dr), Nr = new TextDecoder("utf-8").decode(Dr.slice(0, Qt)), lr = {
          sn: et,
          time: Qe - we,
          value: fo(Nr)
        };
        if (F.value && et < F.value)
          return;
        M.value.push(lr), lr.value.event === "start" && zt();
      }
    };
  }
  function ie() {
    return (D) => {
      const j = D.track;
      j.kind === "metadata" && (j.oncuechange = async () => {
        const J = j.activeCues[0];
        if (J && J.value.data) {
          await zt();
          const we = fo(J.value.data);
          yt({
            value: we
          });
        }
      });
    };
  }
  function We(D, j) {
    m.on((J) => {
      (D === "*" || J.eventType === D) && j(J);
    });
  }
  function Et() {
    P.value = void 0, M.value = [], re.value = [], oo(O), oo(mt), ut.forEach((D, j) => {
      t.removeEventListener(j, D);
    }), ut.clear();
  }
  function Ot() {
    return {
      eventTracking: M,
      trackingDataEvent: re
    };
  }
  return {
    destroy: Et,
    onEventTracking: We,
    hlsHelper: {
      createHlsFragChanged: ur,
      createHlsFragParsingMetadata: cr
    },
    videojsHelper: {
      createVideojsAddTrack: ie
    },
    getLog: Ot
  };
}
async function sc({ video: t, adContainer: i, adsUrl: s, baseURL: c }) {
  const f = c || "https://cdn.jsdelivr.net/gh/sigmaott/sigma-ssai-web-sdk@v1.0.9", m = Gr(f, "/build/dist/wasm_exec.js") || "https://localhost:4222/wasm_exec.js";
  await oc(m);
  const T = new Pr();
  await T.init(Gr(f, "/build/dist/sigma-cspm.wasm") || "https://localhost:4222/sigma-cspm.wasm");
  function P() {
  }
  const { onEventTracking: C, destroy: _, videojsHelper: b, hlsHelper: M, getLog: F } = ic({
    video: t,
    adContainer: i,
    trackingUrl: "",
    startSession: P,
    sdk: T,
    domain: f
  }), re = Ft(), ae = Ft();
  function ut(ie) {
    ie.config.loader = ia({ adsUrl: s, sdk: T, loader: Hls.DefaultConfig.loader }), re.value = ie;
    const We = M.createHlsFragChanged(), Et = M.createHlsFragParsingMetadata();
    ie.on("hlsFragChanged", We), ie.on("hlsFragParsingMetadata", Et), ie.on(Hls.Events.ERROR, (Ot, D) => {
      console.error("HLS Error:", Ot, D), D.type === window.Hls.ErrorTypes.NETWORK_ERROR ? console.error("Network Error:", D.details) : D.type === window.Hls.ErrorTypes.MEDIA_ERROR ? console.error("Media Error:", D.details) : console.error("Other Error:", D.details);
    }), ae.value = () => {
      ie.off("hlsFragChanged", We), ie.off("hlsFragParsingMetadata", Et);
    };
  }
  function O(ie) {
    ie.hls.config.loader = ia({ adsUrl: s, sdk: T, loader: SigmaManager.DefaultConfig.loader }), re.value = ie.hls;
    const We = M.createHlsFragChanged(), Et = M.createHlsFragParsingMetadata();
    ie.hls.on("hlsFragChanged", We), ie.hls.on("hlsFragParsingMetadata", Et), ie.on(SigmaManager.Events.ERROR, (Ot, D) => {
      console.error("HLS Error:", Ot, D), D.type === window.Hls.ErrorTypes.NETWORK_ERROR ? console.error("Network Error:", D.details) : D.type === window.Hls.ErrorTypes.MEDIA_ERROR ? console.error("Media Error:", D.details) : console.error("Other Error:", D.details);
    }), ae.value = () => {
      ie.hls.destroy();
    };
  }
  const mt = Ft(), Ze = Ft(), ur = {
    instance: T,
    config: {
      proxyAds: {
        uri: s,
        timeout: 2
      }
    }
  };
  function zt(ie) {
    mt.value = ie;
    const We = b.createVideojsAddTrack();
    ie.textTracks().on("addtrack", We), Ze.value = () => {
      ie.textTracks().off("addtrack", We);
    };
  }
  function cr() {
    var ie, We;
    _(), (ie = ae.value) == null || ie.call(ae), (We = Ze.value) == null || We.call(Ze), re.value = null, mt.value = null, ae.value = null, Ze.value = null;
  }
  return {
    onEventTracking: C,
    destroy: cr,
    sigmaPlayer: {
      attachVideojs: zt,
      attachHls: ut,
      attachSigmaDrm: O,
      attachVideojs2: zt,
      getLog: F
    },
    sdk: T,
    cspm: ur
  };
}
window.videojs && (function(t) {
  const i = t.Vhs.PlaylistLoader.prototype.setupInitialPlaylist;
  t.Vhs.PlaylistLoader.prototype.setupInitialPlaylist = async function(s) {
    if (s.manifestString && this.vhs_.options_.cspm)
      try {
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
}(videojs), function(t) {
  const i = t.Vhs.PlaylistLoader.prototype.parseManifest_;
  t.Vhs.PlaylistLoader.prototype.parseManifest_ = function({ url: s, manifestString: c }) {
    const f = i.apply(this, [{ url: s, manifestString: c }]);
    return f.playlists && f.playlists.length && (f.manifestString = c), f;
  };
}(videojs), function(t) {
  const i = t.Vhs.PlaylistLoader.prototype.haveMetadata;
  t.Vhs.PlaylistLoader.prototype.haveMetadata = async function({
    playlistString: s,
    playlistObject: c,
    url: f,
    id: m
  }) {
    try {
      if (s && this.vhs_.options_.cspm) {
        const T = this.vhs_.options_.cspm.config;
        s = await this.vhs_.options_.cspm.instance.loadSource({
          config: T,
          manifest: s,
          masterUri: this.main.playlists[m].resolvedUri
        });
      }
      i.apply(this, [{ playlistString: s, playlistObject: c, url: f, id: m }]);
    } catch (T) {
      console.error("Error loading source:", T);
    }
  };
}(videojs), function(t) {
  const i = (c, f) => {
    const m = c.segments || [], T = m[m.length - 1], P = T && T.parts && T.parts[T.parts.length - 1], C = P && P.duration || T && T.duration;
    return C ? C * 1e3 : (c.partTargetDuration || c.targetDuration || 10) * 500;
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
      const _ = (c.partTargetDuration || c.targetDuration) / 2 * 1e3 || 5e3;
      this.finalRenditionTimeout = window.setTimeout(this.media.bind(this, c, !1), _);
      return;
    }
    const m = this.state, T = !this.media_ || c.id !== this.media_.id, P = this.main.playlists[c.id];
    if (P && P.endList || c.endList && c.segments.length) {
      this.request && (this.request.onreadystatechange = null, this.request.abort(), this.request = null), this.state = "HAVE_METADATA", this.media_ = c, T && (this.trigger("mediachanging"), m === "HAVE_MAIN_MANIFEST" ? this.trigger("loadedmetadata") : this.trigger("mediachange"));
      return;
    }
    if (this.updateMediaUpdateTimeout_(i(c)), !T)
      return;
    if (this.state = "SWITCHING_MEDIA", this.request) {
      if (c.resolvedUri === this.request.url)
        return;
      this.request.onreadystatechange = null, this.request.abort(), this.request = null;
    }
    this.media_ && this.trigger("mediachanging"), this.pendingMedia_ = c;
    const C = {
      playlistInfo: {
        type: "media",
        uri: c.uri
      }
    };
    this.trigger({ type: "playlistrequeststart", metadata: C }), this.request = this.vhs_.xhr(
      {
        uri: c.resolvedUri,
        withCredentials: this.withCredentials,
        requestType: "hls-playlist"
      },
      (_, b) => {
        if (this.request) {
          if (c.lastRequest = Date.now(), c.resolvedUri = s(c.resolvedUri, b), _)
            return this.playlistRequestError(this.request, c, m);
          this.haveMetadata({
            playlistString: b.responseText,
            url: c.uri,
            id: c.id
          }).then(() => {
            this.trigger({ type: "playlistrequestcomplete", metadata: C }), m === "HAVE_MAIN_MANIFEST" ? this.trigger("loadedmetadata") : this.trigger("mediachange");
          });
        }
      }
    );
  };
}(videojs));
function uc(t) {
  const i = "https://dai.sigma.video/api/proxy-ads/ads/", s = mo(t), c = `${s.protocol}//${s.host}${s.pathname}`;
  if (!s.search)
    return { playerUrl: t, adsUrl: null };
  const f = Us(t), m = f["sigma.dai.adsEndpoint"];
  if (!m)
    return { playerUrl: t, adsUrl: null };
  const T = {}, P = {};
  for (const [_, b] of Object.entries(f))
    _.startsWith("sigma.dai") ? _ !== "sigma.dai.adsEndpoint" && (T[_.replace("sigma.dai.", "")] = b) : P[_] = b;
  return {
    playerUrl: bn(c, P),
    adsUrl: bn(Gr(i, m), T)
  };
}
export {
  sc as createSigmaDai,
  uc as processURL
};
