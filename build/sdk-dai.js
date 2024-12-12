const ys = /#/g, Es = /&/g, bs = /\//g, Ps = /=/g, vo = /\+/g, Ts = /%5e/gi, Os = /%60/gi, Rs = /%7c/gi, Ss = /%20/gi;
function xs(t) {
  return encodeURI("" + t).replace(Rs, "|");
}
function uo(t) {
  return xs(typeof t == "string" ? t : JSON.stringify(t)).replace(vo, "%2B").replace(Ss, "+").replace(ys, "%23").replace(Es, "%26").replace(Os, "`").replace(Ts, "^").replace(bs, "%2F");
}
function no(t) {
  return uo(t).replace(Ps, "%3D");
}
function aa(t = "") {
  try {
    return decodeURIComponent("" + t);
  } catch {
    return "" + t;
  }
}
function Ds(t) {
  return aa(t.replace(vo, " "));
}
function Ns(t) {
  return aa(t.replace(vo, " "));
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
  return (typeof i == "number" || typeof i == "boolean") && (i = String(i)), i ? Array.isArray(i) ? i.map((s) => `${no(t)}=${uo(s)}`).join("&") : `${no(t)}=${uo(i)}` : no(t);
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
  const s = wo(t), c = { ...sa(s.search), ...i };
  return s.search = Is(c), qs(s);
}
function Us(t) {
  return sa(wo(t).search);
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
function wo(t = "", i) {
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
    return Hi(t);
  const [, c = "", f, m = ""] = t.replace(/\\/g, "/").match(/^[\s\0]*([\w+.-]{2,}:)?\/\/([^/@]+@)?(.*)/) || [];
  let [, T = "", P = ""] = m.match(/([^#/?]*)(.*)?/) || [];
  c === "file:" && (P = P.replace(/\/(?=[A-Za-z]:)/, ""));
  const { pathname: C, search: _, hash: y } = Hi(P);
  return {
    protocol: c.toLowerCase(),
    auth: f ? f.slice(0, Math.max(0, f.length - 1)) : "",
    host: T,
    pathname: C,
    search: _,
    hash: y,
    [ca]: !c
  };
}
function Hi(t = "") {
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
function co(t, i = {}) {
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
  var C, _, y, M, F;
  const i = ((C = t.error) == null ? void 0 : C.message) || ((_ = t.error) == null ? void 0 : _.toString()) || "", s = ((y = t.request) == null ? void 0 : y.method) || ((M = t.options) == null ? void 0 : M.method) || "GET", c = ((F = t.request) == null ? void 0 : F.url) || String(t.request) || "/", f = `[${s}] ${JSON.stringify(c)}`, m = t.response ? `${t.response.status} ${t.response.statusText}` : "<no response>", T = `${f}: ${m}${i ? ` ${i}` : ""}`, P = new Ys(
    T,
    t.error ? { cause: t.error } : void 0
  );
  for (const oe of ["request", "options", "response"])
    Object.defineProperty(P, oe, {
      get() {
        return t[oe];
      }
    });
  for (const [oe, ae] of [
    ["data", "_data"],
    ["status", "status"],
    ["statusCode", "status"],
    ["statusText", "statusText"],
    ["statusMessage", "statusText"]
  ])
    Object.defineProperty(P, oe, {
      get() {
        return t.response && t.response[ae];
      }
    });
  return P;
}
const Qs = new Set(
  Object.freeze(["PATCH", "POST", "PUT", "DELETE"])
);
function Vi(t = "GET") {
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
      let y;
      typeof P.options.retry == "number" ? y = P.options.retry : y = Vi(P.options.method) ? 0 : 1;
      const M = P.response && P.response.status || 500;
      if (y > 0 && (Array.isArray(P.options.retryStatusCodes) ? P.options.retryStatusCodes.includes(M) : nu.has(M))) {
        const F = P.options.retryDelay || 0;
        return F > 0 && await new Promise((oe) => setTimeout(oe, F)), m(P.request, {
          ...P.options,
          retry: y - 1
        });
      }
    }
    const _ = Zs(P);
    throw Error.captureStackTrace && Error.captureStackTrace(_, m), _;
  }
  const m = async function(C, _ = {}) {
    var oe;
    const y = {
      request: C,
      options: ru(_, t.defaults, s),
      response: void 0,
      error: void 0
    };
    y.options.method = (oe = y.options.method) == null ? void 0 : oe.toUpperCase(), y.options.onRequest && await y.options.onRequest(y), typeof y.request == "string" && (y.options.baseURL && (y.request = js(y.request, y.options.baseURL)), (y.options.query || y.options.params) && (y.request = bn(y.request, {
      ...y.options.params,
      ...y.options.query
    }))), y.options.body && Vi(y.options.method) && (Xs(y.options.body) ? (y.options.body = typeof y.options.body == "string" ? y.options.body : JSON.stringify(y.options.body), y.options.headers = new s(y.options.headers || {}), y.options.headers.has("content-type") || y.options.headers.set("content-type", "application/json"), y.options.headers.has("accept") || y.options.headers.set("accept", "application/json")) : (
      // ReadableStream Body
      ("pipeTo" in y.options.body && typeof y.options.body.pipeTo == "function" || // Node.js Stream Body
      typeof y.options.body.pipe == "function") && ("duplex" in y.options || (y.options.duplex = "half"))
    ));
    let M;
    if (!y.options.signal && y.options.timeout) {
      const ae = new c();
      M = setTimeout(
        () => ae.abort(),
        y.options.timeout
      ), y.options.signal = ae.signal;
    }
    try {
      y.response = await i(
        y.request,
        y.options
      );
    } catch (ae) {
      return y.error = ae, y.options.onRequestError && await y.options.onRequestError(y), await f(y);
    } finally {
      M && clearTimeout(M);
    }
    if (y.response.body && !ou.has(y.response.status) && y.options.method !== "HEAD") {
      const ae = (y.options.parseResponse ? "json" : y.options.responseType) || tu(y.response.headers.get("content-type") || "");
      switch (ae) {
        case "json": {
          const ut = await y.response.text(), R = y.options.parseResponse || co;
          y.response._data = R(ut);
          break;
        }
        case "stream": {
          y.response._data = y.response.body;
          break;
        }
        default:
          y.response._data = await y.response[ae]();
      }
    }
    return y.options.onResponse && await y.options.onResponse(y), !y.options.ignoreResponseError && y.response.status >= 400 && y.response.status < 600 ? (y.options.onResponseError && await y.options.onResponseError(y), await f(y)) : y.response;
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
const mo = function() {
  if (typeof globalThis < "u")
    return globalThis;
  if (typeof self < "u")
    return self;
  if (typeof window < "u")
    return window;
  if (typeof global < "u")
    return global;
  throw new Error("unable to locate global object");
}(), iu = mo.fetch || (() => Promise.reject(new Error("[ofetch] global.fetch is not supported!"))), au = mo.Headers, su = mo.AbortController, uu = da({ fetch: iu, Headers: au, AbortController: su }), cu = uu.create({
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
}), du = (t) => (i, s) => (t.set(i, s), s), Gi = Number.MAX_SAFE_INTEGER === void 0 ? 9007199254740991 : Number.MAX_SAFE_INTEGER, fa = 536870912, Ji = fa * 2, fu = (t, i) => (s) => {
  const c = i.get(s);
  let f = c === void 0 ? s.size : c < Ji ? c + 1 : 0;
  if (!s.has(f))
    return t(s, f);
  if (s.size < fa) {
    for (; s.has(f); )
      f = Math.floor(Math.random() * Ji);
    return t(s, f);
  }
  if (s.size > Gi)
    throw new Error("Congratulations, you created a collection of unique numbers which uses all available integers!");
  for (; s.has(f); )
    f = Math.floor(Math.random() * Gi);
  return t(s, f);
}, la = /* @__PURE__ */ new WeakMap(), lu = du(la), vn = fu(lu, la), hu = (t) => t.method !== void 0 && t.method === "call", pu = (t) => typeof t.id == "number" && typeof t.result == "boolean", vu = (t) => {
  const i = /* @__PURE__ */ new Map([[0, () => {
  }]]), s = /* @__PURE__ */ new Map([[0, () => {
  }]]), c = /* @__PURE__ */ new Map(), f = new Worker(t);
  return f.addEventListener("message", ({ data: _ }) => {
    if (hu(_)) {
      const { params: { timerId: y, timerType: M } } = _;
      if (M === "interval") {
        const F = i.get(y);
        if (typeof F === void 0)
          throw new Error("The timer is in an undefined state.");
        if (typeof F == "number") {
          const oe = c.get(F);
          if (oe === void 0 || oe.timerId !== y || oe.timerType !== M)
            throw new Error("The timer is in an undefined state.");
        } else typeof F == "function" && F();
      } else if (M === "timeout") {
        const F = s.get(y);
        if (typeof F === void 0)
          throw new Error("The timer is in an undefined state.");
        if (typeof F == "number") {
          const oe = c.get(F);
          if (oe === void 0 || oe.timerId !== y || oe.timerType !== M)
            throw new Error("The timer is in an undefined state.");
        } else typeof F == "function" && (F(), s.delete(y));
      }
    } else if (pu(_)) {
      const { id: y } = _, M = c.get(y);
      if (M === void 0)
        throw new Error("The timer is in an undefined state.");
      const { timerId: F, timerType: oe } = M;
      c.delete(y), oe === "interval" ? i.delete(F) : s.delete(F);
    } else {
      const { error: { message: y } } = _;
      throw new Error(y);
    }
  }), {
    clearInterval: (_) => {
      if (typeof i.get(_) == "function") {
        const y = vn(c);
        c.set(y, { timerId: _, timerType: "interval" }), i.set(_, y), f.postMessage({
          id: y,
          method: "clear",
          params: { timerId: _, timerType: "interval" }
        });
      }
    },
    clearTimeout: (_) => {
      if (typeof s.get(_) == "function") {
        const y = vn(c);
        c.set(y, { timerId: _, timerType: "timeout" }), s.set(_, y), f.postMessage({
          id: y,
          method: "clear",
          params: { timerId: _, timerType: "timeout" }
        });
      }
    },
    setInterval: (_, y = 0, ...M) => {
      const F = vn(i);
      return i.set(F, () => {
        _(...M), typeof i.get(F) == "function" && f.postMessage({
          id: null,
          method: "set",
          params: {
            delay: y,
            now: performance.timeOrigin + performance.now(),
            timerId: F,
            timerType: "interval"
          }
        });
      }), f.postMessage({
        id: null,
        method: "set",
        params: {
          delay: y,
          now: performance.timeOrigin + performance.now(),
          timerId: F,
          timerType: "interval"
        }
      }), F;
    },
    setTimeout: (_, y = 0, ...M) => {
      const F = vn(s);
      return s.set(F, () => _(...M)), f.postMessage({
        id: null,
        method: "set",
        params: {
          delay: y,
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
}, mu = `(()=>{"use strict";const e=new Map,t=new Map,r=t=>{const r=e.get(t);return void 0!==r&&(clearTimeout(r),e.delete(t),!0)},s=e=>{const r=t.get(e);return void 0!==r&&(clearTimeout(r),t.delete(e),!0)},o=(e,t)=>{const r=performance.now(),s=e+t-r-performance.timeOrigin;return{expected:r+s,remainingDelay:s}},i=(e,t,r,s)=>{const o=r-performance.now();o>0?e.set(t,setTimeout(i,o,e,t,r,s)):(e.delete(t),postMessage({id:null,method:"call",params:{timerId:t,timerType:s}}))};addEventListener("message",(n=>{let{data:a}=n;try{if("clear"===a.method){const{id:e,params:{timerId:t,timerType:o}}=a;if("interval"===o)postMessage({id:e,result:r(t)});else{if("timeout"!==o)throw new Error('The given type "'.concat(o,'" is not supported'));postMessage({id:e,result:s(t)})}}else{if("set"!==a.method)throw new Error('The given method "'.concat(a.method,'" is not supported'));{const{params:{delay:r,now:s,timerId:n,timerType:m}}=a;if("interval"===m)((t,r,s)=>{const{expected:n,remainingDelay:a}=o(t,s);e.set(r,setTimeout(i,a,e,r,n,"interval"))})(r,n,s);else{if("timeout"!==m)throw new Error('The given type "'.concat(m,'" is not supported'));((e,r,s)=>{const{expected:n,remainingDelay:a}=o(e,s);t.set(r,setTimeout(i,a,t,r,n,"timeout"))})(r,n,s)}}}}catch(e){postMessage({error:{message:e.message},id:a.id,result:null})}}))})();`, ha = wu(vu, mu), Ki = (t) => ha().clearTimeout(t), oo = (...t) => ha().setTimeout(...t);
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
const Yi = Object.assign, yu = Object.prototype.hasOwnProperty, fo = (t, i) => yu.call(t, i), Tr = Array.isArray, Hr = (t) => pa(t) === "[object Map]", Eu = (t) => typeof t == "string", Kr = (t) => typeof t == "symbol", Tn = (t) => t !== null && typeof t == "object", bu = Object.prototype.toString, pa = (t) => bu.call(t), va = (t) => pa(t).slice(8, -1), go = (t) => Eu(t) && t !== "NaN" && t[0] !== "-" && "" + parseInt(t, 10) === t, Pu = (t) => {
  const i = /* @__PURE__ */ Object.create(null);
  return (s) => i[s] || (i[s] = t(s));
}, Tu = Pu((t) => t.charAt(0).toUpperCase() + t.slice(1)), xr = (t, i) => !Object.is(t, i);
var He = {};
function Rr(t, ...i) {
  console.warn(`[Vue warn] ${t}`, ...i);
}
let pe;
const io = /* @__PURE__ */ new WeakSet();
class Zi {
  constructor(i) {
    this.fn = i, this.deps = void 0, this.depsTail = void 0, this.flags = 5, this.nextEffect = void 0, this.cleanup = void 0, this.scheduler = void 0;
  }
  pause() {
    this.flags |= 64;
  }
  resume() {
    this.flags & 64 && (this.flags &= -65, io.has(this) && (io.delete(this), this.trigger()));
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
    const i = pe, s = Rt;
    pe = this, Rt = !0;
    try {
      return this.fn();
    } finally {
      He.NODE_ENV !== "production" && pe !== this && Rr(
        "Active effect was not restored correctly - this is likely a Vue internal bug."
      ), ga(this), pe = i, Rt = s, this.flags &= -3;
    }
  }
  stop() {
    if (this.flags & 1) {
      for (let i = this.deps; i; i = i.nextDep)
        bo(i);
      this.deps = this.depsTail = void 0, Qi(this), this.onStop && this.onStop(), this.flags &= -2;
    }
  }
  trigger() {
    this.flags & 64 ? io.add(this) : this.scheduler ? this.scheduler() : this.runIfDirty();
  }
  /**
   * @internal
   */
  runIfDirty() {
    lo(this) && this.run();
  }
  get dirty() {
    return lo(this);
  }
}
let wa = 0, Vr;
function yo() {
  wa++;
}
function Eo() {
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
    c.version === -1 ? (c === s && (s = c.prevDep), bo(c), Ru(c)) : i = c, c.dep.activeLink = c.prevActiveLink, c.prevActiveLink = void 0;
  t.deps = i, t.depsTail = s;
}
function lo(t) {
  for (let i = t.deps; i; i = i.nextDep)
    if (i.dep.version !== i.version || i.dep.computed && Ou(i.dep.computed) === !1 || i.dep.version !== i.version)
      return !0;
  return !!t._dirty;
}
function Ou(t) {
  if (t.flags & 2)
    return !1;
  if (t.flags & 4 && !(t.flags & 16) || (t.flags &= -17, t.globalVersion === Pn))
    return;
  t.globalVersion = Pn;
  const i = t.dep;
  if (t.flags |= 2, i.version > 0 && !t.isSSR && !lo(t)) {
    t.flags &= -3;
    return;
  }
  const s = pe, c = Rt;
  pe = t, Rt = !0;
  try {
    ma(t);
    const f = t.fn();
    (i.version === 0 || xr(f, t._value)) && (t._value = f, i.version++);
  } catch (f) {
    throw i.version++, f;
  } finally {
    pe = s, Rt = c, ga(t), t.flags &= -3;
  }
}
function bo(t) {
  const { dep: i, prevSub: s, nextSub: c } = t;
  if (s && (s.nextSub = c, t.prevSub = void 0), c && (c.prevSub = s, t.nextSub = void 0), i.subs === t && (i.subs = s), !i.subs && i.computed) {
    i.computed.flags &= -5;
    for (let f = i.computed.deps; f; f = f.nextDep)
      bo(f);
  }
}
function Ru(t) {
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
    const s = pe;
    pe = void 0;
    try {
      i();
    } finally {
      pe = s;
    }
  }
}
let Pn = 0;
class Ea {
  constructor(i) {
    this.computed = i, this.version = 0, this.activeLink = void 0, this.subs = void 0, He.NODE_ENV !== "production" && (this.subsHead = void 0);
  }
  track(i) {
    if (!pe || !Rt)
      return;
    let s = this.activeLink;
    if (s === void 0 || s.sub !== pe)
      s = this.activeLink = {
        dep: this,
        sub: pe,
        version: this.version,
        nextDep: void 0,
        prevDep: void 0,
        nextSub: void 0,
        prevSub: void 0,
        prevActiveLink: void 0
      }, pe.deps ? (s.prevDep = pe.depsTail, pe.depsTail.nextDep = s, pe.depsTail = s) : pe.deps = pe.depsTail = s, pe.flags & 4 && ba(s);
    else if (s.version === -1 && (s.version = this.version, s.nextDep)) {
      const c = s.nextDep;
      c.prevDep = s.prevDep, s.prevDep && (s.prevDep.nextDep = c), s.prevDep = pe.depsTail, s.nextDep = void 0, pe.depsTail.nextDep = s, pe.depsTail = s, pe.deps === s && (pe.deps = c);
    }
    return He.NODE_ENV !== "production" && pe.onTrack && pe.onTrack(
      Yi(
        {
          effect: pe
        },
        i
      )
    ), s;
  }
  trigger(i) {
    this.version++, Pn++, this.notify(i);
  }
  notify(i) {
    yo();
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
      Eo();
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
const ho = /* @__PURE__ */ new WeakMap(), sr = Symbol(
  He.NODE_ENV !== "production" ? "Object iterate" : ""
), po = Symbol(
  He.NODE_ENV !== "production" ? "Map keys iterate" : ""
), Jr = Symbol(
  He.NODE_ENV !== "production" ? "Array iterate" : ""
);
function st(t, i, s) {
  if (Rt && pe) {
    let c = ho.get(t);
    c || ho.set(t, c = /* @__PURE__ */ new Map());
    let f = c.get(s);
    f || c.set(s, f = new Ea()), He.NODE_ENV !== "production" ? f.track({
      target: t,
      type: i,
      key: s
    }) : f.track();
  }
}
function Yt(t, i, s, c, f, m) {
  const T = ho.get(t);
  if (!T) {
    Pn++;
    return;
  }
  let P = [];
  if (i === "clear")
    P = [...T.values()];
  else {
    const C = Tr(t), _ = C && go(s);
    if (C && s === "length") {
      const y = Number(c);
      T.forEach((M, F) => {
        (F === "length" || F === Jr || !Kr(F) && F >= y) && P.push(M);
      });
    } else {
      const y = (M) => M && P.push(M);
      switch (s !== void 0 && y(T.get(s)), _ && y(T.get(Jr)), i) {
        case "add":
          C ? _ && y(T.get("length")) : (y(T.get(sr)), Hr(t) && y(T.get(po)));
          break;
        case "delete":
          C || (y(T.get(sr)), Hr(t) && y(T.get(po)));
          break;
        case "set":
          Hr(t) && y(T.get(sr));
          break;
      }
    }
  }
  yo();
  for (const C of P)
    He.NODE_ENV !== "production" ? C.trigger({
      target: t,
      type: i,
      key: s,
      newValue: c,
      oldValue: f,
      oldTarget: m
    }) : C.trigger();
  Eo();
}
function yr(t) {
  const i = ve(t);
  return i === t ? i : (st(i, "iterate", Jr), Zt(t) ? i : i.map(it));
}
function Po(t) {
  return st(t = ve(t), "iterate", Jr), t;
}
const Nu = {
  __proto__: null,
  [Symbol.iterator]() {
    return ao(this, Symbol.iterator, it);
  },
  concat(...t) {
    return yr(this).concat(
      ...t.map((i) => Tr(i) ? yr(i) : i)
    );
  },
  entries() {
    return ao(this, "entries", (t) => (t[1] = it(t[1]), t));
  },
  every(t, i) {
    return Ft(this, "every", t, i, void 0, arguments);
  },
  filter(t, i) {
    return Ft(this, "filter", t, i, (s) => s.map(it), arguments);
  },
  find(t, i) {
    return Ft(this, "find", t, i, it, arguments);
  },
  findIndex(t, i) {
    return Ft(this, "findIndex", t, i, void 0, arguments);
  },
  findLast(t, i) {
    return Ft(this, "findLast", t, i, it, arguments);
  },
  findLastIndex(t, i) {
    return Ft(this, "findLastIndex", t, i, void 0, arguments);
  },
  // flat, flatMap could benefit from ARRAY_ITERATE but are not straight-forward to implement
  forEach(t, i) {
    return Ft(this, "forEach", t, i, void 0, arguments);
  },
  includes(...t) {
    return so(this, "includes", t);
  },
  indexOf(...t) {
    return so(this, "indexOf", t);
  },
  join(t) {
    return yr(this).join(t);
  },
  // keys() iterator only reads `length`, no optimisation required
  lastIndexOf(...t) {
    return so(this, "lastIndexOf", t);
  },
  map(t, i) {
    return Ft(this, "map", t, i, void 0, arguments);
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
    return Ft(this, "some", t, i, void 0, arguments);
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
    return ao(this, "values", it);
  }
};
function ao(t, i, s) {
  const c = Po(t), f = c[i]();
  return c !== t && !Zt(t) && (f._next = f.next, f.next = () => {
    const m = f._next();
    return m.value && (m.value = s(m.value)), m;
  }), f;
}
const Cu = Array.prototype;
function Ft(t, i, s, c, f, m) {
  const T = Po(t), P = T !== t && !Zt(t), C = T[i];
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
  const y = C.call(T, _, c);
  return P && f ? f(y) : y;
}
function Xi(t, i, s, c) {
  const f = Po(t);
  let m = s;
  return f !== t && (Zt(t) ? s.length > 3 && (m = function(T, P, C) {
    return s.call(this, T, P, C, t);
  }) : m = function(T, P, C) {
    return s.call(this, T, it(P), C, t);
  }), f[i](m, ...c);
}
function so(t, i, s) {
  const c = ve(t);
  st(c, "iterate", Jr);
  const f = c[i](...s);
  return (f === -1 || f === !1) && Ku(s[0]) ? (s[0] = ve(s[0]), c[i](...s)) : f;
}
function qr(t, i, s = []) {
  xu(), yo();
  const c = ve(t)[i].apply(t, s);
  return Eo(), Du(), c;
}
const Iu = /* @__PURE__ */ gu("__proto__,__v_isRef,__isVue"), Pa = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((t) => t !== "arguments" && t !== "caller").map((t) => Symbol[t]).filter(Kr)
);
function Au(t) {
  Kr(t) || (t = String(t));
  const i = ve(this);
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
      Or(i) ? i : c
    );
    return (Kr(s) ? Pa.has(s) : Iu(s)) || (f || st(i, "get", s), m) ? P : Or(P) ? T && go(s) ? P : P.value : Tn(P) ? f ? Na(P) : Da(P) : P;
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
      if (!Zt(c) && !Sr(c) && (m = ve(m), c = ve(c)), !Tr(i) && Or(m) && !Or(c))
        return C ? !1 : (m.value = c, !0);
    }
    const T = Tr(i) && go(s) ? Number(s) < i.length : fo(i, s), P = Reflect.set(
      i,
      s,
      c,
      Or(i) ? i : f
    );
    return i === ve(f) && (T ? xr(c, m) && Yt(i, "set", s, c, m) : Yt(i, "add", s, c)), P;
  }
  deleteProperty(i, s) {
    const c = fo(i, s), f = i[s], m = Reflect.deleteProperty(i, s);
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
    return He.NODE_ENV !== "production" && Rr(
      `Set operation on key "${String(s)}" failed: target is readonly.`,
      i
    ), !0;
  }
  deleteProperty(i, s) {
    return He.NODE_ENV !== "production" && Rr(
      `Delete operation on key "${String(s)}" failed: target is readonly.`,
      i
    ), !0;
  }
}
const Mu = /* @__PURE__ */ new Wu(), Fu = /* @__PURE__ */ new _u(), To = (t) => t, On = (t) => Reflect.getPrototypeOf(t);
function wn(t, i, s = !1, c = !1) {
  t = t.__v_raw;
  const f = ve(t), m = ve(i);
  s || (xr(i, m) && st(f, "get", i), st(f, "get", m));
  const { has: T } = On(f), P = c ? To : s ? Oo : it;
  if (T.call(f, i))
    return P(t.get(i));
  if (T.call(f, m))
    return P(t.get(m));
  t !== f && t.get(i);
}
function mn(t, i = !1) {
  const s = this.__v_raw, c = ve(s), f = ve(t);
  return i || (xr(t, f) && st(c, "has", t), st(c, "has", f)), t === f ? s.has(t) : s.has(t) || s.has(f);
}
function gn(t, i = !1) {
  return t = t.__v_raw, !i && st(ve(t), "iterate", sr), Reflect.get(t, "size", t);
}
function ki(t, i = !1) {
  !i && !Zt(t) && !Sr(t) && (t = ve(t));
  const s = ve(this);
  return On(s).has.call(s, t) || (s.add(t), Yt(s, "add", t, t)), this;
}
function ea(t, i, s = !1) {
  !s && !Zt(i) && !Sr(i) && (i = ve(i));
  const c = ve(this), { has: f, get: m } = On(c);
  let T = f.call(c, t);
  T ? He.NODE_ENV !== "production" && Ra(c, f, t) : (t = ve(t), T = f.call(c, t));
  const P = m.call(c, t);
  return c.set(t, i), T ? xr(i, P) && Yt(c, "set", t, i, P) : Yt(c, "add", t, i), this;
}
function ta(t) {
  const i = ve(this), { has: s, get: c } = On(i);
  let f = s.call(i, t);
  f ? He.NODE_ENV !== "production" && Ra(i, s, t) : (t = ve(t), f = s.call(i, t));
  const m = c ? c.call(i, t) : void 0, T = i.delete(t);
  return f && Yt(i, "delete", t, void 0, m), T;
}
function ra() {
  const t = ve(this), i = t.size !== 0, s = He.NODE_ENV !== "production" ? Hr(t) ? new Map(t) : new Set(t) : void 0, c = t.clear();
  return i && Yt(t, "clear", void 0, void 0, s), c;
}
function yn(t, i) {
  return function(c, f) {
    const m = this, T = m.__v_raw, P = ve(T), C = i ? To : t ? Oo : it;
    return !t && st(P, "iterate", sr), T.forEach((_, y) => c.call(f, C(_), C(y), m));
  };
}
function En(t, i, s) {
  return function(...c) {
    const f = this.__v_raw, m = ve(f), T = Hr(m), P = t === "entries" || t === Symbol.iterator && T, C = t === "keys" && T, _ = f[t](...c), y = s ? To : i ? Oo : it;
    return !i && st(
      m,
      "iterate",
      C ? po : sr
    ), {
      // iterator protocol
      next() {
        const { value: M, done: F } = _.next();
        return F ? { value: M, done: F } : {
          value: P ? [y(M[0]), y(M[1])] : y(M),
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
      Rr(
        `${Tu(t)} operation ${s}failed: target is readonly.`,
        ve(this)
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
function Oa(t, i) {
  const s = i ? t ? Bu : Uu : t ? ju : Lu;
  return (c, f, m) => f === "__v_isReactive" ? !t : f === "__v_isReadonly" ? t : f === "__v_raw" ? c : Reflect.get(
    fo(s, f) && f in c ? s : c,
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
  const c = ve(s);
  if (c !== s && i.call(t, c)) {
    const f = va(t);
    Rr(
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
    return He.NODE_ENV !== "production" && Rr(
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
function ve(t) {
  const i = t && t.__v_raw;
  return i ? ve(i) : t;
}
const it = (t) => Tn(t) ? Da(t) : t, Oo = (t) => Tn(t) ? Na(t) : t;
function Or(t) {
  return t ? t.__v_isRef === !0 : !1;
}
function Ot(t) {
  return Yu(t, !1);
}
function Yu(t, i) {
  return Or(t) ? t : new Zu(t, i);
}
class Zu {
  constructor(i, s) {
    this.dep = new Ea(), this.__v_isRef = !0, this.__v_isShallow = !1, this._rawValue = s ? i : ve(i), this._value = s ? i : it(i), this.__v_isShallow = s;
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
    i = c ? i : ve(i), xr(i, s) && (this._rawValue = i, this._value = c ? i : it(i), He.NODE_ENV !== "production" ? this.dep.trigger({
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
        return Ni;
      }), f.d(c, "destroyAll", function() {
        return Ci;
      }), f.d(c, "PROP_TYPE", function() {
        return we;
      }), f.d(c, "PROP_SERIALIZATION", function() {
        return ln;
      }), f.d(c, "CONTEXT", function() {
        return Re;
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
      var _ = [], y = [], M = 0, F;
      function oe() {
        if (!M && F) {
          var e = F;
          F = null, e.resolve();
        }
      }
      function ae() {
        M += 1;
      }
      function ut() {
        M -= 1, oe();
      }
      var R = function() {
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
                for (var h = 0; h < y.length; h++) y[h](u, d);
              }
            }(n, o);
          }, 1), this.dispatch(), this;
        }, r.asyncReject = function(n) {
          return this.errorHandled = !0, this.reject(n), this;
        }, r.dispatch = function() {
          var n = this.resolved, o = this.rejected, a = this.handlers;
          if (!this.dispatching && (n || o)) {
            this.dispatching = !0, ae();
            for (var u = function(g, b) {
              return g.then(function(O) {
                b.resolve(O);
              }, function(O) {
                b.reject(O);
              });
            }, d = 0; d < a.length; d++) {
              var h = a[d], l = h.onSuccess, v = h.onError, E = h.promise, w = void 0;
              if (n) try {
                w = l ? l(this.value) : this.value;
              } catch (g) {
                E.reject(g);
                continue;
              }
              else if (o) {
                if (!v) {
                  E.reject(this.error);
                  continue;
                }
                try {
                  w = v(this.error);
                } catch (g) {
                  E.reject(g);
                  continue;
                }
              }
              if (w instanceof e && (w.resolved || w.rejected)) {
                var p = w;
                p.resolved ? E.resolve(p.value) : E.reject(p.error), p.errorHandled = !0;
              } else C(w) ? w instanceof e && (w.resolved || w.rejected) ? w.resolved ? E.resolve(w.value) : E.reject(w.error) : u(w, E) : E.resolve(w);
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
            return y.push(o), {
              cancel: function() {
                y.splice(y.indexOf(o), 1);
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
            return oe(), o;
          }(e);
        }, e;
      }();
      function gt(e) {
        return {}.toString.call(e) === "[object RegExp]";
      }
      var Qe = {
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
      function St(e) {
        e === void 0 && (e = window);
        var r = e.location;
        if (!r) throw new Error("Can not read window location");
        var n = ur(e);
        if (!n) throw new Error("Can not read window protocol");
        if (n === "file:") return "file://";
        if (n === "about:") {
          var o = ie(e);
          return o && Et() ? St(o) : "about://";
        }
        var a = r.host;
        if (!a) throw new Error("Can not read window host");
        return n + "//" + a;
      }
      function D(e) {
        e === void 0 && (e = window);
        var r = St(e);
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
            if (St(r) === St(window)) return !0;
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
        if (!U(e)) throw new Error("Expected window to be same domain");
        return e;
      }
      function fe(e, r) {
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
      function Je(e) {
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
      function Ke(e) {
        for (var r = [], n = 0, o = Je(e); n < o.length; n++) {
          var a = o[n];
          r.push(a);
          for (var u = 0, d = Ke(a); u < d.length; u++) r.push(d[u]);
        }
        return r;
      }
      function Ye(e) {
        e === void 0 && (e = window);
        try {
          if (e.top) return e.top;
        } catch {
        }
        if (ie(e) === e) return e;
        try {
          if (fe(window, e) && window.top) return window.top;
        } catch {
        }
        try {
          if (fe(e, window) && window.top) return window.top;
        } catch {
        }
        for (var r = 0, n = Ke(e); r < n.length; r++) {
          var o = n[r];
          try {
            if (o.top) return o.top;
          } catch {
          }
          if (ie(o) === o) return o;
        }
      }
      function Oe(e) {
        var r = Ye(e);
        if (!r) throw new Error("Can not determine top window");
        var n = [].concat(Ke(r), [r]);
        return n.indexOf(e) === -1 && (n = [].concat(n, [e], Ke(e))), n;
      }
      var Xe = [], Yr = [];
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
        }(Xe, e);
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
        for (var n = Je(e), o = 0; o < n.length; o++) {
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
        var n = Ye(e) || e, o = Ye(r) || r;
        try {
          if (n && o) return n === o;
        } catch {
        }
        var a = Oe(e), u = Oe(r);
        if (Nr(a, u)) return !0;
        var d = We(n), h = We(o);
        return d && Nr(Oe(d), u) || h && Nr(Oe(h), a), !1;
      }
      function ct(e, r) {
        if (typeof e == "string") {
          if (typeof r == "string") return e === "*" || r === e;
          if (gt(r) || Array.isArray(r)) return !1;
        }
        return gt(e) ? gt(r) ? e.toString() === r.toString() : !Array.isArray(r) && !!r.match(e) : !!Array.isArray(e) && (Array.isArray(r) ? JSON.stringify(e) === JSON.stringify(r) : !gt(r) && e.some(function(n) {
          return ct(n, r);
        }));
      }
      function Ct(e) {
        return e.match(/^(https?|mock|file):\/\//) ? e.split("/").slice(0, 3).join("/") : D();
      }
      function Ro(e, r, n, o) {
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
      function Rn(e) {
        if (r = Ct(e), r.indexOf("mock:") !== 0) return e;
        var r;
        throw new Error("Mock urls not supported out of test mode");
      }
      function So(e) {
        if (U(e)) return J(e).frameElement;
        for (var r = 0, n = document.querySelectorAll("iframe"); r < n.length; r++) {
          var o = n[r];
          if (o && o.contentWindow && o.contentWindow === e) return o;
        }
      }
      function xo(e) {
        if (function(n) {
          return n === void 0 && (n = window), !!ie(n);
        }(e)) {
          var r = So(e);
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
      function Do(e) {
        return (Do = Object.setPrototypeOf ? Object.getPrototypeOf : function(r) {
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
      function No(e, r, n) {
        return (No = Wa() ? Reflect.construct : function(o, a, u) {
          var d = [null];
          d.push.apply(d, a);
          var h = new (Function.bind.apply(o, d))();
          return u && m(h, u.prototype), h;
        }).apply(null, arguments);
      }
      function Co(e) {
        var r = typeof Map == "function" ? /* @__PURE__ */ new Map() : void 0;
        return (Co = function(n) {
          if (n === null || (o = n, Function.toString.call(o).indexOf("[native code]") === -1)) return n;
          var o;
          if (typeof n != "function") throw new TypeError("Super expression must either be null or a function");
          if (r !== void 0) {
            if (r.has(n)) return r.get(n);
            r.set(n, a);
          }
          function a() {
            return No(n, arguments, Do(this).constructor);
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
      function ke() {
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
              return a || (a = typeof o + ":" + ke(), kr.set(o, a)), a;
            }(n) + "]" : Sn(n) ? {} : n;
          });
        } catch {
          throw new Error("Arguments not serializable -- can not be used to memoize");
        }
      }
      function _a() {
        return {};
      }
      var Cr = 0, Io = 0;
      function Lt(e, r) {
        r === void 0 && (r = {});
        var n = r.thisNamespace, o = n !== void 0 && n, a = r.time, u, d, h = Cr;
        Cr += 1;
        var l = function() {
          for (var v = arguments.length, E = new Array(v), w = 0; w < v; w++) E[w] = arguments[w];
          h < Io && (u = null, d = null, h = Cr, Cr += 1);
          var p;
          p = o ? (d = d || new Xr()).getOrSet(this, _a) : u = u || {};
          var g;
          try {
            g = Cn(E);
          } catch {
            return e.apply(this, arguments);
          }
          var b = p[g];
          if (b && a && Date.now() - b.time < a && (delete p[g], b = null), b) return b.value;
          var O = Date.now(), S = e.apply(this, arguments);
          return p[g] = {
            time: O,
            value: S
          }, S;
        };
        return l.reset = function() {
          u = null, d = null;
        }, Dn(l, (r.name || xn(e)) + "::memoized");
      }
      Lt.clear = function() {
        Io = Cr;
      };
      function Ma(e) {
        var r = {};
        function n() {
          for (var o = arguments, a = this, u = arguments.length, d = new Array(u), h = 0; h < u; h++) d[h] = arguments[h];
          var l = Cn(d);
          return r.hasOwnProperty(l) || (r[l] = R.try(function() {
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
      function Ao(e, r, n) {
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
      function Wo(e) {
        return typeof (r = e) == "object" && r !== null && {}.toString.call(e) === "[object Object]";
        var r;
      }
      function Wn(e) {
        if (!Wo(e)) return !1;
        var r = e.constructor;
        if (typeof r != "function") return !1;
        var n = r.prototype;
        return !!Wo(n) && !!n.hasOwnProperty("isPrototypeOf");
      }
      function rn(e, r, n) {
        if (n === void 0 && (n = ""), Array.isArray(e)) {
          for (var o = e.length, a = [], u = function(E) {
            Ao(a, E, function() {
              var w = n ? n + "." + E : "" + E, p = r(e[E], E, w);
              return (Wn(p) || Array.isArray(p)) && (p = rn(p, r, w)), p;
            });
          }, d = 0; d < o; d++) u(d);
          return a;
        }
        if (Wn(e)) {
          var h = {}, l = function(E) {
            if (!e.hasOwnProperty(E)) return 1;
            Ao(h, E, function() {
              var w = n ? n + "." + E : "" + E, p = r(e[E], E, w);
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
            return R.all(d).then(ye);
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
      }(Co(Error));
      function _o() {
        var e = document.body;
        if (!e) throw new Error("Body element not found");
        return e;
      }
      function an() {
        return !!document.body && document.readyState === "complete";
      }
      function Mo() {
        return !!document.body && document.readyState === "interactive";
      }
      function Fo(e) {
        return encodeURIComponent(e);
      }
      Lt(function() {
        return new R(function(e) {
          if (an() || Mo()) return e();
          var r = setInterval(function() {
            if (an() || Mo())
              return clearInterval(r), e();
          }, 10);
        });
      });
      function zo(e) {
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
        }(zo, 0, [e]);
      }
      function Lo(e, r) {
        return r === void 0 && (r = {}), r && Object.keys(r).length ? function(n) {
          return n === void 0 && (n = {}), Object.keys(n).filter(function(o) {
            return typeof n[o] == "string" || typeof n[o] == "boolean";
          }).map(function(o) {
            var a = n[o];
            if (typeof a != "string" && typeof a != "boolean") throw new TypeError("Invalid type for query");
            return Fo(o) + "=" + Fo(a.toString());
          }).join("&");
        }(P({}, zo(e), r)) : e;
      }
      function La(e, r) {
        e.appendChild(r);
      }
      function Mn(e, r) {
        return r === void 0 && (r = document), Sn(e) ? e : typeof e == "string" ? r.querySelector(e) : void 0;
      }
      function jo(e) {
        return new R(function(r, n) {
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
      function Uo(e) {
        if ((sn = sn || new Xr()).has(e)) {
          var r = sn.get(e);
          if (r) return r;
        }
        var n = new R(function(o, a) {
          e.addEventListener("load", function() {
            (function(u) {
              if (function() {
                for (var d = 0; d < Xe.length; d++) {
                  var h = !1;
                  try {
                    h = Xe[d].closed;
                  } catch {
                  }
                  h && (Yr.splice(d, 1), Xe.splice(d, 1));
                }
              }(), u && u.contentWindow) try {
                Xe.push(u.contentWindow), Yr.push(u);
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
        return Uo(e).then(function(r) {
          if (!r.contentWindow) throw new Error("Could not find window in iframe");
          return r.contentWindow;
        });
      }
      function Bo(e, r) {
        e === void 0 && (e = {});
        var n = e.style || {}, o = function(u, d, h) {
          u === void 0 && (u = "div"), d === void 0 && (d = {}), u = u.toLowerCase();
          var l = document.createElement(u);
          if (d.style && pr(l.style, d.style), d.class && (l.className = d.class.join(" ")), d.id && l.setAttribute("id", d.id), d.attributes) for (var v = 0, E = Object.keys(d.attributes); v < E.length; v++) {
            var w = E[v];
            l.setAttribute(w, d.attributes[w]);
          }
          if (d.styleSheet && function(p, g, b) {
            b === void 0 && (b = window.document), p.styleSheet ? p.styleSheet.cssText = g : p.appendChild(b.createTextNode(g));
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
        return o.hasAttribute("id") || o.setAttribute("id", ke()), Uo(o), (e.url || a) && o.setAttribute("src", e.url || "about:blank"), o;
      }
      function $o(e, r, n) {
        return e.addEventListener(r, n), {
          cancel: function() {
            e.removeEventListener(r, n);
          }
        };
      }
      function ja(e) {
        e.style.setProperty("display", "");
      }
      function qo(e) {
        e.style.setProperty("display", "none", "important");
      }
      function Wr(e) {
        e && e.parentNode && e.parentNode.removeChild(e);
      }
      function vr(e) {
        return !(e && e.parentNode && e.ownerDocument && e.ownerDocument.documentElement && e.ownerDocument.documentElement.contains(e));
      }
      function Ho(e, r, n) {
        var o = n === void 0 ? {} : n, a = o.width, u = a === void 0 || a, d = o.height, h = d === void 0 || d, l = o.interval, v = l === void 0 ? 100 : l, E = o.win, w = E === void 0 ? window : E, p = e.offsetWidth, g = e.offsetHeight, b = !1;
        r({
          width: p,
          height: g
        });
        var O = function() {
          if (!b && function(A) {
            return !!(A.offsetWidth || A.offsetHeight || A.getClientRects().length);
          }(e)) {
            var z = e.offsetWidth, V = e.offsetHeight;
            (u && z !== p || h && V !== g) && r({
              width: z,
              height: V
            }), p = z, g = V;
          }
        }, S, I;
        return w.addEventListener("resize", O), w.ResizeObserver !== void 0 ? ((S = new w.ResizeObserver(O)).observe(e), I = Ir(O, 10 * v)) : w.MutationObserver !== void 0 ? ((S = new w.MutationObserver(O)).observe(e, {
          attributes: !0,
          childList: !0,
          subtree: !0,
          characterData: !1
        }), I = Ir(O, 10 * v)) : I = Ir(O, v), {
          cancel: function() {
            b = !0, S.disconnect(), window.removeEventListener("resize", O), I.cancel();
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
      }), Ba = ke();
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
        } else r = ke();
        return e.setAttribute("data-uid-auto", r), r;
      });
      function Vo(e) {
        return typeof e == "string" && /^[0-9]+%$/.test(e);
      }
      function jn(e) {
        if (typeof e == "number") return e;
        var r = e.match(/^([0-9]+)(px|%)$/);
        if (!r) throw new Error("Could not match css value from " + e);
        return parseInt(r[1], 10);
      }
      function Jo(e) {
        return jn(e) + "px";
      }
      function Ko(e) {
        return typeof e == "number" ? Jo(e) : Vo(e) ? e : Jo(e);
      }
      function Yo(e, r) {
        if (typeof e == "number") return e;
        if (Vo(e)) return parseInt(r * jn(e) / 100, 10);
        if (typeof (n = e) == "string" && /^[0-9]+px$/.test(n)) return jn(e);
        var n;
        throw new Error("Can not normalize dimension: " + e);
      }
      function xt(e) {
        e === void 0 && (e = window);
        var r = "__post_robot_11_0_0__";
        return e !== window ? e[r] : e[r] = e[r] || {};
      }
      var Zo = function() {
        return {};
      };
      function le(e, r) {
        return e === void 0 && (e = "store"), r === void 0 && (r = Zo), Ar(xt(), e, function() {
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
        var e = xt();
        return e.WINDOW_WILDCARD = e.WINDOW_WILDCARD || new $a(), e.WINDOW_WILDCARD;
      }
      function Ze(e, r) {
        return e === void 0 && (e = "store"), r === void 0 && (r = Zo), le("windowStore").getOrSet(e, function() {
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
      function Qo() {
        return le("instance").getOrSet("instanceID", ke);
      }
      function Xo(e, r) {
        var n = r.domain, o = Ze("helloPromises"), a = o.get(e);
        a && a.resolve({
          domain: n
        });
        var u = R.resolve({
          domain: n
        });
        return o.set(e, u), u;
      }
      function Un(e, r) {
        return (0, r.send)(e, "postrobot_hello", {
          instanceID: Qo()
        }, {
          domain: "*",
          timeout: -1
        }).then(function(n) {
          var o = n.origin, a = n.data.instanceID;
          return Xo(e, {
            domain: o
          }), {
            win: e,
            domain: o,
            instanceID: a
          };
        });
      }
      function ko(e, r) {
        var n = r.send;
        return Ze("windowInstanceIDPromises").getOrSet(e, function() {
          return Un(e, {
            send: n
          }).then(function(o) {
            return o.instanceID;
          });
        });
      }
      function ei(e, r, n) {
        r === void 0 && (r = 5e3), n === void 0 && (n = "Window");
        var o = function(a) {
          return Ze("helloPromises").getOrSet(a, function() {
            return new R();
          });
        }(e);
        return r !== -1 && (o = o.timeout(r, new Error(n + " did not load after " + r + "ms"))), o;
      }
      function ti(e) {
        Ze("knownWindows").set(e, !0);
      }
      function Bn(e) {
        return typeof e == "object" && e !== null && typeof e.__type__ == "string";
      }
      function ri(e) {
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
      function ni(e) {
        return !Zr(window, e);
      }
      function oi(e, r) {
        if (e) {
          if (D() !== Ct(e)) return !0;
        } else if (r && !U(r)) return !0;
        return !1;
      }
      function ii(e) {
        var r = e.win, n = e.domain;
        return !(!$n() || n && !oi(n, r) || r && !ni(r));
      }
      function qn(e) {
        return "__postrobot_bridge___" + (e = e || Ct(e)).replace(/[^a-zA-Z0-9]+/g, "_");
      }
      function ai() {
        return !!(window.name && window.name === qn(D()));
      }
      var Ja = new R(function(e) {
        if (window.document && window.document.body) return e(window.document.body);
        var r = setInterval(function() {
          if (window.document && window.document.body)
            return clearInterval(r), e(window.document.body);
        }, 10);
      });
      function si(e) {
        Ze("remoteWindowPromises").getOrSet(e, function() {
          return new R();
        });
      }
      function Hn(e) {
        var r = Ze("remoteWindowPromises").get(e);
        if (!r) throw new Error("Remote window promise not found");
        return r;
      }
      function ui(e, r, n) {
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
        for (var r = e.win, n = e.name, o = e.domain, a = le("popupWindowsByName"), u = Ze("popupWindowsByWin"), d = 0, h = a.keys(); d < h.length; d++) {
          var l = h[d], v = a.get(l);
          v && !xe(v.win) || a.del(l);
        }
        if (xe(r)) return {
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
        return n && (E.name = n, a.set(n, E)), o && (E.domain = o, si(r)), u.set(r, E), E;
      }
      function ci(e) {
        var r = e.on, n = e.send, o = e.receiveMessage;
        a = window.open, window.open = function(u, d, h, l) {
          var v = a.call(this, Rn(u), d, h, l);
          return v && (dn({
            win: v,
            name: d,
            domain: u ? Ct(u) : null
          }), v);
        };
        var a;
        (function(u) {
          var d = u.on, h = u.send, l = u.receiveMessage, v = le("popupWindowsByName");
          d("postrobot_open_tunnel", function(E) {
            var w = E.source, p = E.origin, g = E.data, b = le("bridges").get(p);
            if (!b) throw new Error("Can not find bridge promise for domain " + p);
            return b.then(function(O) {
              if (w !== O) throw new Error("Message source does not matched registered bridge for domain " + p);
              if (!g.name) throw new Error("Register window expected to be passed window name");
              if (!g.sendMessage) throw new Error("Register window expected to be passed sendMessage method");
              if (!v.has(g.name)) throw new Error("Window with name " + g.name + " does not exist, or was not opened by this window");
              var S = function() {
                return v.get(g.name);
              };
              if (!S().domain) throw new Error("We do not have a registered domain for window " + g.name);
              if (S().domain !== p) throw new Error("Message origin " + p + " does not matched registered window origin " + (S().domain || "unknown"));
              return ui(S().win, p, g.sendMessage), {
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
            var l = h.name, v = h.source, E = h.canary, w = h.sendMessage, p = le("tunnelWindows"), g = ie(window);
            if (!g) throw new Error("No parent window found to open tunnel to");
            var b = function(O) {
              var S = O.name, I = O.source, z = O.canary, V = O.sendMessage;
              (function() {
                for (var q = le("tunnelWindows"), L = 0, X = q.keys(); L < X.length; L++) {
                  var $ = X[L];
                  xe(q[$].source) && q.del($);
                }
              })();
              var A = ke();
              return le("tunnelWindows").set(A, {
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
            return d(g, "postrobot_open_tunnel", {
              name: l,
              sendMessage: function() {
                var O = p.get(b);
                if (O && O.source && !xe(O.source)) {
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
            var v = We(window);
            if (v && ii({
              win: v
            })) {
              return si(v), (E = v, Ze("remoteBridgeAwaiters").getOrSet(E, function() {
                return R.try(function() {
                  var w = fr(E, qn(D()));
                  if (w) return U(w) && xt(J(w)) ? w : new R(function(p) {
                    var g, b;
                    g = setInterval(function() {
                      if (w && U(w) && xt(J(w)))
                        return clearInterval(g), clearTimeout(b), p(w);
                    }, 100), b = setTimeout(function() {
                      return clearInterval(g), p();
                    }, 2e3);
                  });
                });
              })).then(function(w) {
                return w ? window.name ? xt(J(w)).openTunnelToParent({
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
                      R.reject(g);
                    }
                  }
                }).then(function(p) {
                  var g = p.source, b = p.origin, O = p.data;
                  if (g !== v) throw new Error("Source does not match opener");
                  ui(g, b, O.sendMessage);
                }).catch(function(p) {
                  throw Vn(v, p), p;
                }) : Vn(v, new Error("Can not register with opener: window does not have a name")) : Vn(v, new Error("Can not register with opener: no bridge found in opener"));
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
      function Gn() {
        for (var e = le("idToProxyWindow"), r = 0, n = e.keys(); r < n.length; r++) {
          var o = n[r];
          e.get(o).shouldClean() && e.del(o);
        }
      }
      function di(e, r) {
        var n = r.send, o = r.id, a = o === void 0 ? ke() : o, u = e.then(function(l) {
          if (U(l)) return J(l).name;
        }), d = e.then(function(l) {
          if (xe(l)) throw new Error("Window is closed, can not determine type");
          return We(l) ? Qe.POPUP : Qe.IFRAME;
        });
        u.catch(ye), d.catch(ye);
        var h = function() {
          return e.then(function(l) {
            if (!xe(l)) return U(l) ? J(l).name : u;
          });
        };
        return {
          id: a,
          getType: function() {
            return d;
          },
          getInstanceID: Ma(function() {
            return e.then(function(l) {
              return ko(l, {
                send: n
              });
            });
          }),
          close: function() {
            return e.then(xo);
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
            return v === void 0 && (v = {}), e.then(function(E) {
              var w = window.location.protocol + "//" + window.location.host, p = v.method, g = p === void 0 ? "get" : p, b = v.body;
              if (l.indexOf("/") === 0) l = "" + w + l;
              else if (!l.match(/^https?:\/\//) && l.indexOf(w) !== 0) throw new Error("Expected url to be http or https url, or absolute path, got " + JSON.stringify(l));
              if (g === "post") return h().then(function(O) {
                if (!O) throw new Error("Can not post to window without target name");
                (function(S) {
                  var I = S.url, z = S.target, V = S.body, A = S.method, q = A === void 0 ? "post" : A, L = document.createElement("form");
                  if (L.setAttribute("target", z), L.setAttribute("method", q), L.setAttribute("action", I), L.style.display = "none", V) for (var X = 0, $ = Object.keys(V); X < $.length; X++) {
                    var ce, re = $[X], K = document.createElement("input");
                    K.setAttribute("name", re), K.setAttribute("value", (ce = V[re]) == null ? void 0 : ce.toString()), L.appendChild(K);
                  }
                  _o().appendChild(L), L.submit(), _o().removeChild(L);
                })({
                  url: l,
                  target: O,
                  method: g,
                  body: b
                });
              });
              if (g !== "get") throw new Error("Unsupported method: " + g);
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
              dn({
                win: v,
                name: l
              });
              var E = U(v), w = So(v);
              if (!E) throw new Error("Can not set name for cross-domain window: " + l);
              J(v).name = l, w && w.setAttribute("name", l), u = R.resolve(l);
            });
          }
        };
      }
      var lt = function() {
        function e(n) {
          var o = n.send, a = n.win, u = n.serializedWindow;
          this.id = void 0, this.isProxyWindow = !0, this.serializedWindow = void 0, this.actualWindow = void 0, this.actualWindowPromise = void 0, this.send = void 0, this.name = void 0, this.actualWindowPromise = new R(), this.serializedWindow = u || di(this.actualWindowPromise, {
            send: o
          }), le("idToProxyWindow").set(this.getID(), this), a && this.setWindow(a, {
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
            return n === Qe.POPUP;
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
          this.actualWindow = n, this.actualWindowPromise.resolve(this.actualWindow), this.serializedWindow = di(this.actualWindowPromise, {
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
              knownWindowInstanceID: ko(n, {
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
          return Gn(), le("idToProxyWindow").get(n.id) || new e({
            serializedWindow: n,
            send: a
          });
        }, e.isProxyWindow = function(n) {
          return !!(n && !Xt(n) && n.isProxyWindow);
        }, e.toProxyWindow = function(n, o) {
          var a = o.send;
          if (Gn(), e.isProxyWindow(n)) return n;
          var u = n;
          return Ze("winToProxyWindow").get(u) || new e({
            win: u,
            send: a
          });
        }, e;
      }();
      function Jn(e, r, n, o, a) {
        var u = Ze("methodStore"), d = le("proxyWindowMethods");
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
      function fi(e, r) {
        var n = Ze("methodStore"), o = le("proxyWindowMethods");
        return n.getOrSet(e, function() {
          return {};
        })[r] || o.get(r);
      }
      function li(e, r, n, o, a) {
        d = (u = {
          on: a.on,
          send: a.send
        }).on, h = u.send, le("builtinListeners").getOrSet("functionCalls", function() {
          return d("postrobot_method", {
            domain: "*"
          }, function(E) {
            var w = E.source, p = E.origin, g = E.data, b = g.id, O = g.name, S = fi(w, b);
            if (!S) throw new Error("Could not find method '" + O + "' with id: " + g.id + " in " + D(window));
            var I = S.source, z = S.domain, V = S.val;
            return R.try(function() {
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
              return R.try(function() {
                if (V.onError) return V.onError(A);
              }).then(function() {
                throw A.stack && (A.stack = "Remote call to " + O + "(" + function(q) {
                  return q === void 0 && (q = []), An(q).map(function(L) {
                    return typeof L == "string" ? "'" + L + "'" : L === void 0 ? "undefined" : L === null ? "null" : typeof L == "boolean" ? L.toString() : Array.isArray(L) ? "[ ... ]" : typeof L == "object" ? "{ ... }" : typeof L == "function" ? "() => { ... }" : "<" + typeof L + ">";
                  }).join(", ");
                }(g.args) + `) failed

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
        var u, d, h, l = n.__id__ || ke();
        e = lt.unwrap(e);
        var v = n.__name__ || n.name || o;
        return typeof v == "string" && typeof v.indexOf == "function" && v.indexOf("anonymous::") === 0 && (v = v.replace("anonymous::", o + "::")), lt.isProxyWindow(e) ? (Jn(l, n, v, e, r), e.awaitWindow().then(function(E) {
          Jn(l, n, v, E, r);
        })) : Jn(l, n, v, e, r), kt("cross_domain_function", {
          id: l,
          name: v
        });
      }
      function hi(e, r, n, o) {
        var a, u = o.on, d = o.send;
        return function(h, l) {
          l === void 0 && (l = Ha);
          var v = JSON.stringify(h, function(E) {
            var w = this[E];
            if (Bn(this)) return w;
            var p = ri(w);
            if (!p) return w;
            var g = l[p] || qa[p];
            return g ? g(w, E) : w;
          });
          return v === void 0 ? "undefined" : v;
        }(n, ((a = {}).promise = function(h, l) {
          return function(v, E, w, p, g) {
            return kt("cross_domain_zalgo_promise", {
              then: li(v, E, function(b, O) {
                return w.then(b, O);
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
          return li(e, r, h, l, {
            on: u,
            send: d
          });
        }, a.object = function(h) {
          return Xt(h) || lt.isProxyWindow(h) ? kt("cross_domain_window", lt.serialize(h, {
            send: d
          })) : h;
        }, a));
      }
      function pi(e, r, n, o) {
        var a, u = o.send;
        return function(d, h) {
          if (h === void 0 && (h = Ga), d !== "undefined") return JSON.parse(d, function(l, v) {
            if (Bn(this)) return v;
            var E, w;
            if (Bn(v) ? (E = v.__type__, w = v.__val__) : (E = ri(v), w = v), !E) return w;
            var p = h[E] || Va[E];
            return p ? p(w, l) : w;
          });
        }(n, ((a = {}).cross_domain_zalgo_promise = function(d) {
          return function(h, l, v) {
            return new R(v.then);
          }(0, 0, d);
        }, a.cross_domain_function = function(d) {
          return function(h, l, v, E) {
            var w = v.id, p = v.name, g = E.send, b = function(S) {
              S === void 0 && (S = {});
              function I() {
                var z = arguments;
                return lt.toProxyWindow(h, {
                  send: g
                }).awaitWindow().then(function(V) {
                  var A = fi(V, w);
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
            }, O = b();
            return O.fireAndForget = b({
              fireAndForget: !0
            }), O;
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
        if (!$n() && !ai()) throw new Error("Bridge not needed for browser");
        if (U(e)) throw new Error("Post message through bridge disabled between same domain windows");
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
        if (!U(e)) throw new Error("Post message through global disabled between different domain windows");
        if (Zr(window, e) !== !1) throw new Error("Can only use global to communicate between two different windows, not between frames");
        var n = xt(e);
        if (!n) throw new Error("Can not find postRobot global on foreign window");
        n.receiveMessage({
          source: window,
          origin: D(),
          data: r
        });
      };
      function Kn(e, r, n, o) {
        var a = o.on, u = o.send;
        return R.try(function() {
          var d = Ze().getOrSet(e, function() {
            return {};
          });
          return d.buffer = d.buffer || [], d.buffer.push(n), d.flush = d.flush || R.flush().then(function() {
            if (xe(e)) throw new Error("Window is closed");
            var h = hi(e, r, ((l = {}).__post_robot_11_0_0__ = d.buffer || [], l), {
              on: a,
              send: u
            }), l;
            delete d.buffer;
            for (var v = Object.keys(_r), E = [], w = 0; w < v.length; w++) {
              var p = v[w];
              try {
                _r[p](e, h, r);
              } catch (g) {
                E.push(g);
              }
            }
            if (E.length === v.length) throw new Error(`All post-robot messaging strategies failed:

` + E.map(function(g, b) {
              return b + ". " + hr(g);
            }).join(`

`));
          }), d.flush.then(function() {
            delete d.flush;
          });
        }).then(ye);
      }
      function vi(e) {
        return le("responseListeners").get(e);
      }
      function wi(e) {
        le("responseListeners").del(e);
      }
      function mi(e) {
        return le("erroredResponseListeners").has(e);
      }
      function gi(e) {
        var r = e.name, n = e.win, o = e.domain, a = Ze("requestListeners");
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
                  if (v.__domain_regex__) for (var E = 0, w = v.__domain_regex__; E < w.length; E++) {
                    var p = w[E], g = p.listener;
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
        var n = r.on, o = r.send, a = le("receivedMessages");
        try {
          if (!window || window.closed || !e.source) return;
        } catch {
          return;
        }
        var u = e.source, d = e.origin, h = function(w, p, g, b) {
          var O = b.on, S = b.send, I;
          try {
            I = pi(p, g, w, {
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
          ti(u);
          for (var l, v = function() {
            var w = h[E];
            if (a.has(w.id)) return {
              v: void 0
            };
            if (a.set(w.id, !0), xe(u) && !w.fireAndForget) return {
              v: void 0
            };
            w.origin.indexOf("file:") === 0 && (d = "file://");
            try {
              w.type === "postrobot_message_request" ? function(p, g, b, O) {
                var S = O.on, I = O.send, z = gi({
                  name: b.name,
                  win: p,
                  domain: g
                }), V = b.name === "postrobot_method" && b.data && typeof b.data.name == "string" ? b.data.name + "()" : b.name;
                function A(q, L, X) {
                  return R.flush().then(function() {
                    if (!b.fireAndForget && !xe(p)) try {
                      return Kn(p, g, {
                        id: ke(),
                        origin: D(window),
                        type: "postrobot_message_response",
                        hash: b.hash,
                        name: b.name,
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
                R.all([R.flush().then(function() {
                  if (!b.fireAndForget && !xe(p)) try {
                    return Kn(p, g, {
                      id: ke(),
                      origin: D(window),
                      type: "postrobot_message_ack",
                      hash: b.hash,
                      name: b.name
                    }, {
                      on: S,
                      send: I
                    });
                  } catch (q) {
                    throw new Error("Send ack message failed for " + V + " in " + D() + `

` + hr(q));
                  }
                }), R.try(function() {
                  if (!z) throw new Error("No handler found for post message: " + b.name + " from " + g + " in " + window.location.protocol + "//" + window.location.host + window.location.pathname);
                  return z.handler({
                    source: p,
                    origin: g,
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
              }) : w.type === "postrobot_message_response" ? function(p, g, b) {
                if (!mi(b.hash)) {
                  var O = vi(b.hash);
                  if (!O) throw new Error("No handler found for post message response for message: " + b.name + " from " + g + " in " + window.location.protocol + "//" + window.location.host + window.location.pathname);
                  if (!ct(O.domain, g)) throw new Error("Response origin " + g + " does not match domain " + (S = O.domain, Array.isArray(S) ? "(" + S.join(" | ") + ")" : gt(S) ? "RegExp(" + S.toString() + ")" : S.toString()));
                  var S;
                  if (p !== O.win) throw new Error("Response source does not match registered window");
                  wi(b.hash), b.ack === "error" ? O.promise.reject(b.error) : b.ack === "success" && O.promise.resolve({
                    source: p,
                    origin: g,
                    data: b.data
                  });
                }
              }(u, d, w) : w.type === "postrobot_message_ack" && function(p, g, b) {
                if (!mi(b.hash)) {
                  var O = vi(b.hash);
                  if (!O) throw new Error("No handler found for post message ack for message: " + b.name + " from " + g + " in " + window.location.protocol + "//" + window.location.host + window.location.pathname);
                  try {
                    if (!ct(O.domain, g)) throw new Error("Ack origin " + g + " does not match domain " + O.domain.toString());
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
      function It(e, r, n) {
        if (!e) throw new Error("Expected name");
        if (typeof (r = r || {}) == "function" && (n = r, r = {}), !n) throw new Error("Expected handler");
        var o = function a(u, d) {
          var h = u.name, l = u.win, v = u.domain, E = Ze("requestListeners");
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
            for (var g = [], b = 0, O = p; b < O.length; b++) g.push(a({
              name: h,
              domain: v,
              win: O[b]
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
          var V = gi({
            name: h,
            win: p,
            domain: v
          });
          p && p !== "*" || (p = cn());
          var A = (v = v || "*").toString();
          if (V) throw p && v ? new Error("Request listener already exists for " + h + " on domain " + v.toString() + " for " + (p === cn() ? "wildcard" : "specified") + " window") : p ? new Error("Request listener already exists for " + h + " for " + (p === cn() ? "wildcard" : "specified") + " window") : v ? new Error("Request listener already exists for " + h + " on domain " + v.toString()) : new Error("Request listener already exists for " + h);
          var q = E.getOrSet(p, function() {
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
              delete L[A], $ && (X.splice(X.indexOf($, 1)), X.length || delete L.__domain_regex__), Object.keys(L).length || delete q[h], p && !Object.keys(q).length && E.del(p);
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
          return R.try(function() {
            if (function(E, w, p) {
              if (!E) throw new Error("Expected name");
              if (p && typeof p != "string" && !Array.isArray(p) && !_n(p)) throw new TypeError("Can not send " + E + ". Expected domain " + JSON.stringify(p) + " to be a string, array, or regex");
              if (xe(w)) throw new Error("Can not send " + E + ". Target window is closed");
            }(n, v, u), function(E, w) {
              var p = Qt(w);
              if (p) return p === E;
              if (w === E || Ye(w) === w) return !1;
              for (var g = 0, b = Je(E); g < b.length; g++) if (b[g] === w) return !0;
              return !1;
            }(window, v)) return ei(v, h);
          }).then(function(E) {
            return function(w, p, g, b) {
              var O = b.send;
              return R.try(function() {
                return typeof p == "string" ? p : R.try(function() {
                  return g || Un(w, {
                    send: O
                  }).then(function(S) {
                    return S.domain;
                  });
                }).then(function(S) {
                  if (!ct(p, p)) throw new Error("Domain " + tn(p) + " does not match " + tn(p));
                  return S;
                });
              });
            }(v, u, (E === void 0 ? {} : E).domain, {
              send: e
            });
          }).then(function(E) {
            var w = E, p = n === "postrobot_method" && o && typeof o.name == "string" ? o.name + "()" : n, g = new R(), b = n + "_" + ke();
            if (!l) {
              var O = {
                name: n,
                win: v,
                domain: w,
                promise: g
              };
              (function(L, X) {
                le("responseListeners").set(L, X);
              })(b, O);
              var S = Ze("requestPromises").getOrSet(v, function() {
                return [];
              });
              S.push(g), g.catch(function() {
                (function(L) {
                  le("erroredResponseListeners").set(L, !0);
                })(b), wi(b);
              });
              var I = function(L) {
                return Ze("knownWindows").get(L, !1);
              }(v) ? 1e4 : 2e3, z = d, V = I, A = z, q = Ir(function() {
                return xe(v) ? g.reject(new Error("Window closed for " + n + " before " + (O.ack ? "response" : "ack"))) : O.cancelled ? g.reject(new Error("Response listener was cancelled for " + n)) : (V = Math.max(V - 500, 0), A !== -1 && (A = Math.max(A - 500, 0)), O.ack || V !== 0 ? A === 0 ? g.reject(new Error("No response for postMessage " + p + " in " + D() + " in " + z + "ms")) : void 0 : g.reject(new Error("No ack for postMessage " + p + " in " + D() + " in " + I + "ms")));
              }, 500);
              g.finally(function() {
                q.cancel(), S.splice(S.indexOf(g, 1));
              }).catch(ye);
            }
            return Kn(v, w, {
              id: ke(),
              origin: D(window),
              type: "postrobot_message_request",
              hash: b,
              name: n,
              data: o,
              fireAndForget: l
            }, {
              on: It,
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
      function yi(e) {
        for (var r = 0, n = Ze("requestPromises").get(e, []); r < n.length; r++) n[r].reject(new Error("Window " + (xe(e) ? "closed" : "cleaned up") + " before response")).catch(ye);
      }
      var Ut;
      Ut = {
        setupBridge: ci,
        openBridge: function(e, r) {
          var n = le("bridges"), o = le("bridgeFrames");
          return r = r || Ct(e), n.getOrSet(r, function() {
            return R.try(function() {
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
                return new R(function(l, v) {
                  u.addEventListener("load", l), u.addEventListener("error", v);
                }).then(function() {
                  return ei(h, 5e3, "Bridge " + e);
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
            domain: Ct(r)
          });
        },
        isBridge: ai,
        needsBridge: ii,
        needsBridgeForBrowser: $n,
        hasBridge: function(e, r) {
          return le("bridges").has(r || Ct(e));
        },
        needsBridgeForWin: ni,
        needsBridgeForDomain: oi,
        destroyBridges: function() {
          for (var e = le("bridges"), r = le("bridgeFrames"), n = 0, o = r.keys(); n < o.length; n++) {
            var a = r.get(o[n]);
            a && a.parentNode && a.parentNode.removeChild(a);
          }
          r.reset(), e.reset();
        }
      };
      function Fr(e) {
        if (!U(e)) throw new Error("Can not get global for window on different domain");
        return e.__zoid_10_3_3__ || (e.__zoid_10_3_3__ = {}), e.__zoid_10_3_3__;
      }
      function Ei(e, r) {
        try {
          return r(Fr(e));
        } catch {
        }
      }
      function fn(e) {
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
        return Nn(JSON.stringify(e));
      }
      function Zn(e) {
        var r = Fr(e);
        return r.references = r.references || {}, r.references;
      }
      function bi(e) {
        var r = e.data, n = e.metaData, o = e.sender, a = e.receiver, u = e.passByReference, d = u !== void 0 && u, h = e.basic, l = h !== void 0 && h, v = Mr(a.win), E = l ? JSON.stringify(r) : hi(v, a.domain, r, {
          on: It,
          send: bt
        }), w = d ? function(p) {
          var g = ke();
          return Zn(window)[g] = p, {
            type: "uid",
            uid: g
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
            p = window, (g = w).type === "uid" && delete Zn(p)[g.uid];
            var p, g;
          }
        };
      }
      function Pi(e) {
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
          if (w.type === "uid") return Zn(E)[w.uid];
          throw new Error("Unsupported ref type: " + w.type);
        }(h, u);
        return {
          data: o ? JSON.parse(v) : function(E, w, p) {
            return pi(E, w, p, {
              on: It,
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
      var we = {
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
      }, Re = Qe, Ee = {
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
      function Ti(e) {
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
        var r = Pi({
          data: Qn(e).serializedInitialPayload,
          sender: {
            win: function(n) {
              return function(o) {
                if (o.type === "opener") return on("opener", We(window));
                if (o.type === "parent" && typeof o.distance == "number") return on("parent", function(w, p) {
                  return p === void 0 && (p = 1), function(g, b) {
                    b === void 0 && (b = 1);
                    for (var O = g, S = 0; S < b; S++) {
                      if (!O) return;
                      O = ie(O);
                    }
                    return O;
                  }(w, lr(w) - p);
                }(window, o.distance));
                if (o.type === "global" && o.uid && typeof o.uid == "string") {
                  var a = o.uid, u = Qt(window);
                  if (!u) throw new Error("Can not find ancestor window");
                  for (var d = 0, h = Oe(u); d < h.length; d++) {
                    var l = h[d];
                    if (U(l)) {
                      var v = Ei(l, function(w) {
                        return w.windows && w.windows[a];
                      });
                      if (v) return v;
                    }
                  }
                } else if (o.type === "name") {
                  var E = o.name;
                  return on("namedWindow", function(w, p) {
                    return fr(w, p) || function g(b, O) {
                      var S = fr(b, O);
                      if (S) return S;
                      for (var I = 0, z = Je(b); I < z.length; I++) {
                        var V = g(z[I], O);
                        if (V) return V;
                      }
                    }(Ye(w) || w, p);
                  }(on("ancestor", Qt(window)), E));
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
        if (U(e) && (o = e, o !== Ye(o))) {
          var n = J(e).name;
          if (n) return {
            type: "name",
            name: n
          };
        }
        var o;
      }
      function Ri(e, r, n, o, a) {
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
      function Si() {
        return R.try(function() {
          window.close();
        });
      }
      var At = function() {
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
      function xi(e, r, n) {
        var o = {};
        return R.all(function(a, u, d) {
          var h = [];
          return Xn(a, u, function(l, v, E) {
            var w = function(p, g, b) {
              return R.resolve().then(function() {
                var O, S;
                if (b != null && g) {
                  var I = (O = {}, O.get = g.queryParam, O.post = g.bodyParam, O)[n], z = (S = {}, S.get = g.queryValue, S.post = g.bodyValue, S)[n];
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
                      if (g.serialization === ln.JSON) L = JSON.stringify(q);
                      else if (g.serialization === ln.BASE64) L = Nn(JSON.stringify(q));
                      else if (g.serialization === ln.DOTIFY || !g.serialization) {
                        L = function re(K, H, ue) {
                          H === void 0 && (H = ""), ue === void 0 && (ue = {}), H = H && H + ".";
                          for (var k in K) K.hasOwnProperty(k) && K[k] != null && typeof K[k] != "function" && (K[k] && Array.isArray(K[k]) && K[k].length && K[k].every(function(Se) {
                            return typeof Se != "object";
                          }) ? ue["" + H + k + "[]"] = K[k].join(",") : K[k] && typeof K[k] == "object" ? ue = re(K[k], "" + H + k, ue) : ue["" + H + k] = K[k].toString());
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
            }(l, v, E);
            h.push(w);
          }), h;
        }(r, e)).then(function() {
          return o;
        });
      }
      function Di(e) {
        var r = e.uid, n = e.options, o = e.overrides, a = o === void 0 ? {} : o, u = e.parentWin, d = u === void 0 ? window : u, h = n.propsDef, l = n.containerTemplate, v = n.prerenderTemplate, E = n.tag, w = n.name, p = n.attributes, g = n.dimensions, b = n.autoResize, O = n.url, S = n.domain, I = n.exports, z = new R(), V = [], A = nn(), q = {}, L = {}, X = {
          visible: !0
        }, $ = a.event ? a.event : (ce = {}, re = {}, K = {
          on: function(x, N) {
            var B = re[x] = re[x] || [];
            B.push(N);
            var j = !1;
            return {
              cancel: function() {
                j || (j = !0, B.splice(B.indexOf(N), 1));
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
            for (var N = arguments.length, B = new Array(N > 1 ? N - 1 : 0), j = 1; j < N; j++) B[j - 1] = arguments[j];
            var te = re[x], Y = [];
            if (te)
              for (var me = function() {
                var je = te[ge];
                Y.push(R.try(function() {
                  return je.apply(void 0, B);
                }));
              }, ge = 0; ge < te.length; ge++) me();
            return R.all(Y).then(ye);
          },
          triggerOnce: function(x) {
            if (ce[x]) return R.resolve();
            ce[x] = !0;
            for (var N = arguments.length, B = new Array(N > 1 ? N - 1 : 0), j = 1; j < N; j++) B[j - 1] = arguments[j];
            return K.trigger.apply(K, [x].concat(B));
          },
          reset: function() {
            re = {};
          }
        }), ce, re, K, H = a.props ? a.props : {}, ue, k, Se, Dt, ht, Bt = !1, $t = a.onError, Wt = a.getProxyContainer, qt = a.show, Ht = a.hide, tr = a.close, Vt = a.renderContainer, Pt = a.getProxyWindow, rr = a.setProxyWin, Gt = a.openFrame, Jt = a.openPrerenderFrame, nr = a.prerender, or = a.open, ne = a.openPrerender, pt = a.watchForUnload, se = a.getInternalState, ze = a.setInternalState, De = function() {
          return typeof g == "function" ? g({
            props: H
          }) : g;
        }, Le = function() {
          return R.try(function() {
            return a.resolveInitPromise ? a.resolveInitPromise() : z.resolve();
          });
        }, Te = function(x) {
          return R.try(function() {
            return a.rejectInitPromise ? a.rejectInitPromise(x) : z.reject(x);
          });
        }, et = function(x) {
          for (var N = {}, B = 0, j = Object.keys(H); B < j.length; B++) {
            var te = j[B], Y = h[te];
            if (!Y || Y.sendToChild !== !1) {
              var me = Y && Y.trustedDomains && Y.trustedDomains.length > 0 ? Y.trustedDomains.reduce(function(ge, je) {
                return ge || ct(je, x);
              }, !1) : ct(x, D(window));
              Y && Y.sameDomain && !me || Y && Y.trustedDomains && !me || (N[te] = H[te]);
            }
          }
          return R.hash(N);
        }, _e = function() {
          return R.try(function() {
            return se ? se() : X;
          });
        }, Me = function(x) {
          return R.try(function() {
            return ze ? ze(x) : X = P({}, X, x);
          });
        }, vt = function() {
          return Pt ? Pt() : R.try(function() {
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
          return rr ? rr(x) : R.try(function() {
            ue = x;
          });
        }, Tt = function() {
          return qt ? qt() : R.hash({
            setState: Me({
              visible: !0
            }),
            showElement: k ? k.get().then(ja) : null
          }).then(ye);
        }, _t = function() {
          return Ht ? Ht() : R.hash({
            setState: Me({
              visible: !1
            }),
            showElement: k ? k.get().then(qo) : null
          }).then(ye);
        }, wr = function() {
          return typeof O == "function" ? O({
            props: H
          }) : O;
        }, mr = function() {
          return typeof p == "function" ? p({
            props: H
          }) : p;
        }, ir = function() {
          return Ct(wr());
        }, nt = function(x, N) {
          var B = N.windowName;
          return Gt ? Gt(x, {
            windowName: B
          }) : R.try(function() {
            if (x === Re.IFRAME) return fn(Bo({
              attributes: P({
                name: B,
                title: w
              }, mr().iframe)
            }));
          });
        }, zr = function(x) {
          return Jt ? Jt(x) : R.try(function() {
            if (x === Re.IFRAME) return fn(Bo({
              attributes: P({
                name: "__zoid_prerender_frame__" + w + "_" + ke() + "__",
                title: "prerender__" + w
              }, mr().iframe)
            }));
          });
        }, Lr = function(x, N, B) {
          return ne ? ne(x, N, B) : R.try(function() {
            if (x === Re.IFRAME) {
              if (!B) throw new Error("Expected proxy frame to be passed");
              return B.get().then(function(j) {
                return A.register(function() {
                  return Wr(j);
                }), zn(j).then(function(te) {
                  return J(te);
                }).then(function(te) {
                  return Mr(te);
                });
              });
            }
            if (x === Re.POPUP) return N;
            throw new Error("No render context available for " + x);
          });
        }, gr = function() {
          return R.try(function() {
            if (ue) return R.all([$.trigger(Ee.FOCUS), ue.focus()]).then(ye);
          });
        }, hn = function() {
          var x = Fr(window);
          return x.windows = x.windows || {}, x.windows[r] = window, A.register(function() {
            delete x.windows[r];
          }), r;
        }, jr = function(x, N, B, j) {
          if (N === D(window)) return {
            type: "global",
            uid: hn()
          };
          if (x !== window) throw new Error("Can not construct cross-domain window reference for different target window");
          if (H.window) {
            var te = j.getWindow();
            if (!te) throw new Error("Can not construct cross-domain window reference for lazy window prop");
            if (Qt(te) !== window) throw new Error("Can not construct cross-domain window reference for window prop with different ancestor");
          }
          if (B === Re.POPUP) return {
            type: "opener"
          };
          if (B === Re.IFRAME) return {
            type: "parent",
            distance: lr(window)
          };
          throw new Error("Can not construct window reference for child");
        }, pn = function(x, N) {
          return R.try(function() {
            var B;
            Dt = x, Se = N, (B = ue) == null || B.isPopup().then(function(j) {
              if ((N == null ? void 0 : N.name) !== "" && j) {
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
          return R.try(function() {
            $.trigger(Ee.RESIZE, {
              width: N,
              height: B
            });
          });
        }, Br = function(x) {
          return R.try(function() {
            return $.trigger(Ee.DESTROY);
          }).catch(ye).then(function() {
            return A.all(x);
          }).then(function() {
            var N = x || new Error("Component destroyed");
            ht && vr(ht) || N.message === "Window navigated away" ? z.resolve() : z.asyncReject(N);
          });
        }, Mt = Lt(function(x) {
          return R.try(function() {
            return tr ? xe(tr.__source__) ? void 0 : tr() : R.try(function() {
              return $.trigger(Ee.CLOSE);
            }).then(function() {
              return Br(x || new Error("Component closed"));
            });
          });
        }), Ii = function(x, N) {
          var B = N.proxyWin, j = N.proxyFrame, te = N.windowName;
          return or ? or(x, {
            proxyWin: B,
            proxyFrame: j,
            windowName: te
          }) : R.try(function() {
            if (x === Re.IFRAME) {
              if (!j) throw new Error("Expected proxy frame to be passed");
              return j.get().then(function(Ne) {
                return zn(Ne).then(function(he) {
                  return A.register(function() {
                    return Wr(Ne);
                  }), A.register(function() {
                    return yi(he);
                  }), he;
                });
              });
            }
            if (x === Re.POPUP) {
              var Y = De(), me = Y.width, ge = me === void 0 ? "300px" : me, je = Y.height, be = je === void 0 ? "150px" : je;
              ge = Yo(ge, window.outerWidth), be = Yo(be, window.outerWidth);
              var Fe = function(Ne, he) {
                var Ce = (he = he || {}).closeOnUnload, Pe = Ce === void 0 ? 1 : Ce, ot = he.name, Ue = ot === void 0 ? "" : ot, de = he.width, Be = he.height, tt = 0, Ve = 0;
                de && (window.outerWidth ? Ve = Math.round((window.outerWidth - de) / 2) + window.screenX : window.screen.width && (Ve = Math.round((window.screen.width - de) / 2))), Be && (window.outerHeight ? tt = Math.round((window.outerHeight - Be) / 2) + window.screenY : window.screen.height && (tt = Math.round((window.screen.height - Be) / 2))), delete he.closeOnUnload, delete he.name, de && Be && (he = P({
                  top: tt,
                  left: Ve,
                  width: de,
                  height: Be,
                  status: 1,
                  toolbar: 0,
                  menubar: 0,
                  resizable: 1,
                  scrollbars: 1
                }, he));
                var ar = Object.keys(he).map(function(Nt) {
                  if (he[Nt] != null) return Nt + "=" + tn(he[Nt]);
                }).filter(Boolean).join(","), wt;
                try {
                  wt = window.open("", Ue, ar);
                } catch (Nt) {
                  throw new Fn("Can not open popup window - " + (Nt.stack || Nt.message));
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
                return xo(Fe);
              }), A.register(function() {
                return yi(Fe);
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
        }, Ai = function() {
          return R.try(function() {
            var x = $o(window, "unload", en(function() {
              Br(new Error("Window navigated away"));
            })), N = Ro(d, Br, 3e3);
            if (A.register(N.cancel), A.register(x.cancel), pt) return pt();
          });
        }, Wi = function(x) {
          var N = !1;
          return x.isClosed().then(function(B) {
            return B ? (N = !0, Mt(new Error("Detected component window close"))) : R.delay(200).then(function() {
              return x.isClosed();
            }).then(function(j) {
              if (j)
                return N = !0, Mt(new Error("Detected component window close"));
            });
          }).then(function() {
            return N;
          });
        }, $r = function(x) {
          return $t ? $t(x) : R.try(function() {
            if (V.indexOf(x) === -1)
              return V.push(x), z.asyncReject(x), $.trigger(Ee.ERROR, x);
          });
        }, _i = new R(), Mi = function(x) {
          return R.try(function() {
            _i.resolve(x);
          });
        };
        pn.onError = $r;
        var Fi = function(x, N) {
          return x({
            uid: r,
            container: N.container,
            context: N.context,
            doc: N.doc,
            frame: N.frame,
            prerenderFrame: N.prerenderFrame,
            focus: gr,
            close: Mt,
            state: q,
            props: H,
            tag: E,
            dimensions: De(),
            event: $
          });
        }, zi = function(x, N) {
          var B = N.context;
          return nr ? nr(x, {
            context: B
          }) : R.try(function() {
            if (v) {
              $.trigger(Ee.PRERENDER);
              var j = x.getWindow();
              if (j && U(j) && function(Ce) {
                try {
                  if (!Ce.location.href || Ce.location.href === "about:blank") return !0;
                } catch {
                }
                return !1;
              }(j)) {
                var te = (j = J(j)).document, Y = Fi(v, {
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
                  })(j, Y);
                  var me = b.width, ge = me !== void 0 && me, je = b.height, be = je !== void 0 && je, Fe = b.element, Ne = Fe === void 0 ? "body" : Fe;
                  if ((Ne = Mn(Ne, te)) && (ge || be)) {
                    var he = Ho(Ne, function(Ce) {
                      Ur({
                        width: ge ? Ce.width : void 0,
                        height: be ? Ce.height : void 0
                      });
                    }, {
                      width: ge,
                      height: be,
                      win: j
                    });
                    $.on(Ee.RENDERED, he.cancel);
                  }
                  $.trigger(Ee.PRERENDERED);
                }
              }
            }
          });
        }, Li = function(x, N) {
          var B = N.proxyFrame, j = N.proxyPrerenderFrame, te = N.context, Y = N.rerender;
          return Vt ? Vt(x, {
            proxyFrame: B,
            proxyPrerenderFrame: j,
            context: te,
            rerender: Y
          }) : R.hash({
            container: x.get(),
            frame: B ? B.get() : null,
            prerenderFrame: j ? j.get() : null,
            internalState: _e()
          }).then(function(me) {
            var ge = me.container, je = me.internalState.visible, be = Fi(l, {
              context: te,
              container: ge,
              frame: me.frame,
              prerenderFrame: me.prerenderFrame,
              doc: document
            });
            if (be) {
              je || qo(be), La(ge, be);
              var Fe = function(Ne, he) {
                he = en(he);
                var Ce = !1, Pe = [], ot, Ue, de, Be = function() {
                  Ce = !0;
                  for (var wt = 0; wt < Pe.length; wt++) Pe[wt].disconnect();
                  ot && ot.cancel(), de && de.removeEventListener("unload", tt), Ue && Wr(Ue);
                }, tt = function() {
                  Ce || (he(), Be());
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
                return (Ue = document.createElement("iframe")).setAttribute("name", "__detect_close_" + ke() + "__"), Ue.style.display = "none", zn(Ue).then(function(wt) {
                  (de = J(wt)).addEventListener("unload", tt);
                }), Ne.appendChild(Ue), ot = Ir(function() {
                  vr(Ne) && tt();
                }, 1e3), {
                  cancel: Be
                };
              }(be, function() {
                var Ne = new Error("Detected container element removed from DOM");
                return R.delay(1).then(function() {
                  if (!vr(be))
                    return A.all(Ne), Y().then(Le, Te);
                  Mt(Ne);
                });
              });
              return A.register(function() {
                return Fe.cancel();
              }), A.register(function() {
                return Wr(be);
              }), k = fn(be);
            }
          });
        }, ji = function() {
          return {
            state: q,
            event: $,
            close: Mt,
            focus: gr,
            resize: Ur,
            onError: $r,
            updateProps: us,
            show: Tt,
            hide: _t
          };
        }, to = function(x) {
          x === void 0 && (x = {});
          var N = ht, B = ji();
          pr(L, x), function(j, te, Y, me, ge) {
            var je = me.state, be = me.close, Fe = me.focus, Ne = me.event, he = me.onError;
            Xn(Y, j, function(Ce, Pe, ot) {
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
                      onError: he,
                      container: ge
                    })), !Pe.default || jt(de) || jt(Y[Ce]) || (de = Pe.default({
                      props: te,
                      state: je,
                      close: be,
                      focus: Fe,
                      event: Ne,
                      onError: he,
                      container: ge
                    })), jt(de)) {
                      if (Pe.type === we.ARRAY ? !Array.isArray(de) : typeof de !== Pe.type) throw new TypeError("Prop is not of type " + Pe.type + ": " + Ce);
                    } else if (Pe.required !== !1 && !jt(Y[Ce])) throw new Error('Expected prop "' + Ce + '" to be defined');
                    return jt(de) && Pe.decorate && (de = Pe.decorate({
                      value: de,
                      props: te,
                      state: je,
                      close: be,
                      focus: Fe,
                      event: Ne,
                      onError: he,
                      container: ge
                    })), de;
                  }());
                }
              });
            }), Xn(te, j, ye);
          }(h, H, L, B, N);
        }, us = function(x) {
          return to(x), z.then(function() {
            var N = Se, B = ue;
            if (N && B && Dt) return et(Dt).then(function(j) {
              return N.updateProps(j).catch(function(te) {
                return Wi(B).then(function(Y) {
                  if (!Y) throw te;
                });
              });
            });
          });
        }, Ui = function(x) {
          return Wt ? Wt(x) : R.try(function() {
            return jo(x);
          }).then(function(N) {
            return Ln(N) && (N = function B(j) {
              var te = function(je) {
                var be = function(Fe) {
                  for (; Fe.parentNode; ) Fe = Fe.parentNode;
                  if (Ln(Fe)) return Fe;
                }(je);
                if (be && be.host) return be.host;
              }(j);
              if (!te) throw new Error("Element is not in shadow dom");
              var Y = "shadow-slot-" + ke(), me = document.createElement("slot");
              me.setAttribute("name", Y), j.appendChild(me);
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
            var N = x.target, B = x.container, j = x.context, te = x.rerender;
            return R.try(function() {
              var Y = ir(), me = S || ir();
              (function(G, $e, Ie) {
                if (G !== window) {
                  if (!Zr(window, G)) throw new Error("Can only renderTo an adjacent frame");
                  var qe = D();
                  if (!ct($e, qe) && !U(G)) throw new Error("Can not render remotely to " + $e.toString() + " - can only render to " + qe);
                  if (Ie && typeof Ie != "string") throw new Error("Container passed to renderTo must be a string selector, got " + typeof Ie + " }");
                }
              })(N, me, B);
              var ge = R.try(function() {
                if (N !== window) return function(G, $e) {
                  for (var Ie = {}, qe = 0, at = Object.keys(H); qe < at.length; qe++) {
                    var Ae = at[qe], mt = h[Ae];
                    mt && mt.allowDelegate && (Ie[Ae] = H[Ae]);
                  }
                  var Ge = bt($e, "zoid_delegate_" + w, {
                    uid: r,
                    overrides: {
                      props: Ie,
                      event: $,
                      close: Mt,
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
                  return Wt = function() {
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
                  }, G === Re.IFRAME ? (Pt = function() {
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
                  }, ne = function() {
                    for (var Z = arguments.length, Q = new Array(Z), W = 0; W < Z; W++) Q[W] = arguments[W];
                    return Ge.then(function(ee) {
                      return ee.openPrerender.apply(ee, Q);
                    });
                  }) : G === Re.POPUP && (rr = function() {
                    for (var Z = arguments.length, Q = new Array(Z), W = 0; W < Z; W++) Q[W] = arguments[W];
                    return Ge.then(function(ee) {
                      return ee.setProxyWin.apply(ee, Q);
                    });
                  }), Ge;
                }(j, N);
              }), je = H.window, be = Ai(), Fe = xi(h, H, "post"), Ne = $.trigger(Ee.RENDER), he = Ui(B), Ce = vt(), Pe = he.then(function() {
                return to();
              }), ot = Pe.then(function() {
                return xi(h, H, "get").then(function(G) {
                  return function($e, Ie) {
                    var qe = Ie.query || {}, at = Ie.hash || {}, Ae, mt, Ge = $e.split("#");
                    mt = Ge[1];
                    var Z = (Ae = Ge[0]).split("?");
                    Ae = Z[0];
                    var Q = Lo(Z[1], qe), W = Lo(mt, at);
                    return Q && (Ae = Ae + "?" + Q), W && (Ae = Ae + "#" + W), Ae;
                  }(Rn(wr()), {
                    query: G
                  });
                });
              }), Ue = Ce.then(function(G) {
                return function(Ie) {
                  var qe = Ie === void 0 ? {} : Ie, at = qe.proxyWin, Ae = qe.initialChildDomain, mt = qe.childDomainMatch, Ge = qe.target, Z = Ge === void 0 ? window : Ge, Q = qe.context;
                  return function(W) {
                    var ee = W === void 0 ? {} : W, ro = ee.proxyWin, vs = ee.childDomainMatch, ws = ee.context;
                    return et(ee.initialChildDomain).then(function(ms) {
                      return {
                        uid: r,
                        context: ws,
                        tag: E,
                        childDomainMatch: vs,
                        version: "10_3_3",
                        props: ms,
                        exports: (qi = ro, {
                          init: function(gs) {
                            return pn(this.origin, gs);
                          },
                          close: Mt,
                          checkClose: function() {
                            return Wi(qi);
                          },
                          resize: Ur,
                          onError: $r,
                          show: Tt,
                          hide: _t,
                          export: Mi
                        })
                      };
                      var qi;
                    });
                  }({
                    proxyWin: at,
                    initialChildDomain: Ae,
                    childDomainMatch: mt,
                    context: Q
                  }).then(function(W) {
                    var ee = bi({
                      data: W,
                      metaData: {
                        windowRef: jr(Z, Ae, Q, at)
                      },
                      sender: {
                        domain: D(window)
                      },
                      receiver: {
                        win: at,
                        domain: mt
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
                    context: j
                  }).proxyWin,
                  initialChildDomain: $e.initialChildDomain,
                  childDomainMatch: $e.childDomainMatch,
                  target: $e.target,
                  context: $e.context
                }).then(function(Ie) {
                  return Ti({
                    name: w,
                    serializedPayload: Ie
                  });
                });
                var $e;
              }), de = Ue.then(function(G) {
                return nt(j, {
                  windowName: G
                });
              }), Be = zr(j), tt = R.hash({
                proxyContainer: he,
                proxyFrame: de,
                proxyPrerenderFrame: Be
              }).then(function(G) {
                return Li(G.proxyContainer, {
                  context: j,
                  proxyFrame: G.proxyFrame,
                  proxyPrerenderFrame: G.proxyPrerenderFrame,
                  rerender: te
                });
              }).then(function(G) {
                return G;
              }), Ve = R.hash({
                windowName: Ue,
                proxyFrame: de,
                proxyWin: Ce
              }).then(function(G) {
                var $e = G.proxyWin;
                return je ? $e : Ii(j, {
                  windowName: G.windowName,
                  proxyWin: $e,
                  proxyFrame: G.proxyFrame
                });
              }), ar = R.hash({
                proxyWin: Ve,
                proxyPrerenderFrame: Be
              }).then(function(G) {
                return Lr(j, G.proxyWin, G.proxyPrerenderFrame);
              }), wt = Ve.then(function(G) {
                return ue = G, rt(G);
              }), Nt = R.hash({
                proxyPrerenderWin: ar,
                state: wt
              }).then(function(G) {
                return zi(G.proxyPrerenderWin, {
                  context: j
                });
              }), Bi = R.hash({
                proxyWin: Ve,
                windowName: Ue
              }).then(function(G) {
                if (je) return G.proxyWin.setName(G.windowName);
              }), cs = R.hash({
                body: Fe
              }).then(function(G) {
                return n.method ? n.method : Object.keys(G.body).length ? "post" : "get";
              }), $i = R.hash({
                proxyWin: Ve,
                windowUrl: ot,
                body: Fe,
                method: cs,
                windowName: Bi,
                prerender: Nt
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
                  }), R.delay(2e3).then(function() {
                    return Ie.isClosed();
                  }).then(function(Ae) {
                    if (!at) {
                      if (qe === Re.POPUP && Ae) return Mt(new Error("Detected popup close"));
                      var mt = !!(ht && vr(ht));
                      return qe === Re.IFRAME && Ae && (mt || Bt) ? Mt(new Error("Detected iframe close")) : $e(Ie, qe);
                    }
                  });
                })(G, j);
              }), fs = R.hash({
                container: tt,
                prerender: Nt
              }).then(function() {
                return $.trigger(Ee.DISPLAY);
              }), ls = Ve.then(function(G) {
                return function($e, Ie, qe) {
                  return R.try(function() {
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
                      var mt = Ct(Ae);
                      return Ut.linkUrl(at, Ie), Ut.openBridge(Rn(Ae), mt);
                    }
                  });
                }(G, Y, j);
              }), hs = $i.then(function() {
                return R.try(function() {
                  var G = H.timeout;
                  if (G) return z.timeout(G, new Error("Loading component timed out after " + G + " milliseconds"));
                });
              }), ps = z.then(function() {
                return Bt = !0, $.trigger(Ee.RENDERED);
              });
              return R.hash({
                initPromise: z,
                buildUrlPromise: ot,
                onRenderPromise: Ne,
                getProxyContainerPromise: he,
                openFramePromise: de,
                openPrerenderFramePromise: Be,
                renderContainerPromise: tt,
                openPromise: Ve,
                openPrerenderPromise: ar,
                setStatePromise: wt,
                prerenderPromise: Nt,
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
              return R.all([$r(Y), Br(Y)]).then(function() {
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
          export: Mi,
          getHelpers: ji,
          getDelegateOverrides: function() {
            return R.try(function() {
              return {
                getProxyContainer: Ui,
                show: Tt,
                hide: _t,
                renderContainer: Li,
                getProxyWindow: vt,
                watchForUnload: Ai,
                openFrame: nt,
                openPrerenderFrame: zr,
                prerender: zi,
                open: Ii,
                openPrerender: Lr,
                setProxyWin: rt
              };
            });
          },
          getExports: function() {
            return I({
              getExports: function() {
                return _i;
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
              var v = u.findDOMNode(this), E = n(pr({}, this.props));
              E.render(v, Re.IFRAME), this.setState({
                parent: E
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
              this.parent.render(a, Re.IFRAME);
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
              this.parent.render(o, Re.IFRAME);
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
                var E = function() {
                  return rn(h.props, function(p) {
                    return typeof p == "function" ? function() {
                      var g = p.apply(this, arguments);
                      return v(), g;
                    } : p;
                  });
                }, w = n(E());
                w.render(l[0], Re.IFRAME), h.$watch(function() {
                  w.updateProps(E()).catch(ye);
                });
              }]
            };
          });
        }
      }, rs = {
        register: function(e, r, n, o) {
          var a = o.Component, u = o.NgModule, d = o.ElementRef, h = o.NgZone, l = o.Inject, v = function() {
            function w(g, b) {
              this.elementRef = void 0, this.internalProps = void 0, this.parent = void 0, this.props = void 0, this.zone = void 0, this._props = void 0, this._props = {}, this.elementRef = g, this.zone = b;
            }
            var p = w.prototype;
            return p.getProps = function() {
              var g = this;
              return rn(P({}, this.internalProps, this.props), function(b) {
                if (typeof b == "function") {
                  var O = g.zone;
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
              var g = this.elementRef.nativeElement;
              this.parent = n(this.getProps()), this.parent.render(g, Re.IFRAME);
            }, p.ngDoCheck = function() {
              this.parent && !function(g, b) {
                var O = {};
                for (var S in g) if (g.hasOwnProperty(S) && (O[S] = !0, g[S] !== b[S]))
                  return !1;
                for (var I in b) if (!O[I]) return !1;
                return !0;
              }(this._props, this.props) && (this._props = P({}, this.props), this.parent.updateProps(this.getProps()));
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
              Wr(o);
            }, 1);
          }), d.on(Ee.RESIZE, function(p) {
            var g = p.width, b = p.height;
            typeof g == "number" && (E.style.width = Ko(g)), typeof b == "number" && (E.style.height = Ko(b));
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
      var kn = nn(), eo = nn();
      function is(e) {
        var r = function(b) {
          var O = b.tag, S = b.url, I = b.domain, z = b.bridgeUrl, V = b.props, A = V === void 0 ? {} : V, q = b.dimensions, L = q === void 0 ? {} : q, X = b.autoResize, $ = X === void 0 ? {} : X, ce = b.allowedParentDomains, re = ce === void 0 ? "*" : ce, K = b.attributes, H = K === void 0 ? {} : K, ue = b.defaultContext, k = ue === void 0 ? Re.IFRAME : ue, Se = b.containerTemplate, Dt = Se === void 0 ? ns : Se, ht = b.prerenderTemplate, Bt = ht === void 0 ? os : ht, $t = b.validate, Wt = b.eligible, qt = Wt === void 0 ? function() {
            return {
              eligible: !0
            };
          } : Wt, Ht = b.logger, tr = Ht === void 0 ? {
            info: ye
          } : Ht, Vt = b.exports, Pt = Vt === void 0 ? ye : Vt, rr = b.method, Gt = b.children, Jt = Gt === void 0 ? function() {
            return {};
          } : Gt, nr = O.replace(/-/g, "_"), or = P({}, {
            window: {
              type: we.OBJECT,
              sendToChild: !1,
              required: !1,
              allowDelegate: !0,
              validate: function(ne) {
                var pt = ne.value;
                if (!Xt(pt) && !lt.isProxyWindow(pt)) throw new Error("Expected Window or ProxyWindow");
                if (Xt(pt)) {
                  if (xe(pt)) throw new Error("Window is closed");
                  if (!U(pt)) throw new Error("Window is not same domain");
                }
              },
              decorate: function(ne) {
                return Mr(ne.value);
              }
            },
            timeout: {
              type: we.NUMBER,
              required: !1,
              sendToChild: !1
            },
            cspNonce: {
              type: we.STRING,
              required: !1
            },
            onDisplay: {
              type: we.FUNCTION,
              required: !1,
              sendToChild: !1,
              allowDelegate: !0,
              default: At,
              decorate: er
            },
            onRendered: {
              type: we.FUNCTION,
              required: !1,
              sendToChild: !1,
              default: At,
              decorate: er
            },
            onRender: {
              type: we.FUNCTION,
              required: !1,
              sendToChild: !1,
              default: At,
              decorate: er
            },
            onPrerendered: {
              type: we.FUNCTION,
              required: !1,
              sendToChild: !1,
              default: At,
              decorate: er
            },
            onPrerender: {
              type: we.FUNCTION,
              required: !1,
              sendToChild: !1,
              default: At,
              decorate: er
            },
            onClose: {
              type: we.FUNCTION,
              required: !1,
              sendToChild: !1,
              allowDelegate: !0,
              default: At,
              decorate: er
            },
            onDestroy: {
              type: we.FUNCTION,
              required: !1,
              sendToChild: !1,
              allowDelegate: !0,
              default: At,
              decorate: er
            },
            onResize: {
              type: we.FUNCTION,
              required: !1,
              sendToChild: !1,
              allowDelegate: !0,
              default: At
            },
            onFocus: {
              type: we.FUNCTION,
              required: !1,
              sendToChild: !1,
              allowDelegate: !0,
              default: At
            },
            close: {
              type: we.FUNCTION,
              required: !1,
              sendToChild: !1,
              childDecorate: function(ne) {
                return ne.close;
              }
            },
            focus: {
              type: we.FUNCTION,
              required: !1,
              sendToChild: !1,
              childDecorate: function(ne) {
                return ne.focus;
              }
            },
            resize: {
              type: we.FUNCTION,
              required: !1,
              sendToChild: !1,
              childDecorate: function(ne) {
                return ne.resize;
              }
            },
            uid: {
              type: we.STRING,
              required: !1,
              sendToChild: !1,
              childDecorate: function(ne) {
                return ne.uid;
              }
            },
            tag: {
              type: we.STRING,
              required: !1,
              sendToChild: !1,
              childDecorate: function(ne) {
                return ne.tag;
              }
            },
            getParent: {
              type: we.FUNCTION,
              required: !1,
              sendToChild: !1,
              childDecorate: function(ne) {
                return ne.getParent;
              }
            },
            getParentDomain: {
              type: we.FUNCTION,
              required: !1,
              sendToChild: !1,
              childDecorate: function(ne) {
                return ne.getParentDomain;
              }
            },
            show: {
              type: we.FUNCTION,
              required: !1,
              sendToChild: !1,
              childDecorate: function(ne) {
                return ne.show;
              }
            },
            hide: {
              type: we.FUNCTION,
              required: !1,
              sendToChild: !1,
              childDecorate: function(ne) {
                return ne.hide;
              }
            },
            export: {
              type: we.FUNCTION,
              required: !1,
              sendToChild: !1,
              childDecorate: function(ne) {
                return ne.export;
              }
            },
            onError: {
              type: we.FUNCTION,
              required: !1,
              sendToChild: !1,
              childDecorate: function(ne) {
                return ne.onError;
              }
            },
            onProps: {
              type: we.FUNCTION,
              required: !1,
              sendToChild: !1,
              childDecorate: function(ne) {
                return ne.onProps;
              }
            },
            getSiblings: {
              type: we.FUNCTION,
              required: !1,
              sendToChild: !1,
              childDecorate: function(ne) {
                return ne.getSiblings;
              }
            }
          }, A);
          if (!Dt) throw new Error("Container template required");
          return {
            name: nr,
            tag: O,
            url: S,
            domain: I,
            bridgeUrl: z,
            method: rr,
            propsDef: or,
            dimensions: L,
            autoResize: $,
            allowedParentDomains: re,
            attributes: H,
            defaultContext: k,
            containerTemplate: Dt,
            prerenderTemplate: Bt,
            validate: $t,
            logger: tr,
            eligible: qt,
            children: Jt,
            exports: typeof Pt == "function" ? Pt : function(ne) {
              for (var pt = ne.getExports, se = {}, ze = function() {
                var Te = Le[De], et = Pt[Te].type, _e = pt().then(function(Me) {
                  return Me[Te];
                });
                se[Te] = et === we.FUNCTION ? function() {
                  for (var Me = arguments.length, vt = new Array(Me), rt = 0; rt < Me; rt++) vt[rt] = arguments[rt];
                  return _e.then(function(Tt) {
                    return Tt.apply(void 0, vt);
                  });
                } : _e;
              }, De = 0, Le = Object.keys(Pt); De < Le.length; De++) ze();
              return se;
            }
          };
        }(e), n = r.name, o = r.tag, a = r.defaultContext, u = r.propsDef, d = r.eligible, h = r.children, l = Fr(window), v = {}, E = [], w = function() {
          if (function(O) {
            try {
              return Qn(window.name).name === O;
            } catch {
            }
            return !1;
          }(n)) {
            var b = Oi().payload;
            if (b.tag === o && ct(b.childDomainMatch, D())) return !0;
          }
          return !1;
        }, p = Lt(function() {
          if (w()) {
            if (window.xprops)
              throw delete l.components[o], new Error("Can not register " + n + " as child - child already registered");
            var b = function(O) {
              var S = O.tag, I = O.propsDef, z = O.autoResize, V = O.allowedParentDomains, A = [], q = Oi(), L = q.parent, X = q.payload, $ = L.win, ce = L.domain, re, K = new R(), H = X.version, ue = X.uid, k = X.exports, Se = X.context, Dt = X.props;
              if (!function(se, ze) {
                if (!/_/.test(se) || !/_/.test("10_3_3")) throw new Error("Versions are in an invalid format (" + se + ", 10_3_3)");
                return se.split("_")[0] === "10_3_3".split("_")[0];
              }(H)) throw new Error("Parent window has zoid version " + H + ", child window has version 10_3_3");
              var ht = k.show, Bt = k.hide, $t = k.close, Wt = k.onError, qt = k.checkClose, Ht = k.export, tr = k.resize, Vt = k.init, Pt = function() {
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
                var ze = (se === void 0 ? {} : se).anyParent, De = [], Le = re.parent;
                if (ze === void 0 && (ze = !Le), !ze && !Le) throw new Error("No parent found for " + S + " child");
                for (var Te = 0, et = Oe(window); Te < et.length; Te++) {
                  var _e = et[Te];
                  if (U(_e)) {
                    var Me = J(_e).xprops;
                    if (Me && Pt() === Me.getParent()) {
                      var vt = Me.parent;
                      if (ze || !Le || vt && vt.uid === Le.uid) {
                        var rt = Ei(_e, function(Tt) {
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
              }, ne = function(se, ze, De) {
                De === void 0 && (De = !1);
                var Le = function(et, _e, Me, vt, rt, Tt) {
                  Tt === void 0 && (Tt = !1);
                  for (var _t = {}, wr = 0, mr = Object.keys(Me); wr < mr.length; wr++) {
                    var ir = mr[wr], nt = _e[ir], zr = nt && nt.trustedDomains && nt.trustedDomains.length > 0 ? nt.trustedDomains.reduce(function(pn, Ur) {
                      return pn || ct(Ur, D(window));
                    }, !1) : vt === D(window) || U(et);
                    if ((!nt || !nt.sameDomain || zr) && (!nt || !nt.trustedDomains || zr)) {
                      var Lr = Ri(_e, 0, ir, Me[ir], rt);
                      _t[ir] = Lr, nt && nt.alias && !_t[nt.alias] && (_t[nt.alias] = Lr);
                    }
                  }
                  if (!Tt) for (var gr = 0, hn = Object.keys(_e); gr < hn.length; gr++) {
                    var jr = hn[gr];
                    Me.hasOwnProperty(jr) || (_t[jr] = Ri(_e, 0, jr, void 0, rt));
                  }
                  return _t;
                }($, I, se, ze, {
                  tag: S,
                  show: ht,
                  hide: Bt,
                  close: $t,
                  focus: Qa,
                  onError: Wt,
                  resize: Jt,
                  getSiblings: or,
                  onProps: Gt,
                  getParent: Pt,
                  getParentDomain: rr,
                  uid: ue,
                  export: nr
                }, De);
                re ? pr(re, Le) : re = Le;
                for (var Te = 0; Te < A.length; Te++) (0, A[Te])(re);
              }, pt = function(se) {
                return R.try(function() {
                  return ne(se, ce, !0);
                });
              };
              return {
                init: function() {
                  return R.try(function() {
                    var se = "";
                    return U($) && (se = function(ze) {
                      var De = ze.componentName, Le = ze.parentComponentWindow, Te = Pi({
                        data: Qn(window.name).serializedInitialPayload,
                        sender: {
                          win: Le
                        },
                        basic: !0
                      }), et = Te.sender;
                      if (Te.reference.type === "uid" || Te.metaData.windowRef.type === "global") {
                        var _e = Ti({
                          name: De,
                          serializedPayload: bi({
                            data: Te.data,
                            metaData: {
                              windowRef: Za(Le)
                            },
                            sender: {
                              domain: et.domain
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
                      componentName: O.name,
                      parentComponentWindow: $
                    }) || ""), Fr(window).exports = O.exports({
                      getExports: function() {
                        return K;
                      }
                    }), function(ze, De) {
                      if (!ct(ze, De)) throw new Error("Can not be rendered by domain: " + De);
                    }(V, ce), ti($), function() {
                      window.addEventListener("beforeunload", function() {
                        qt.fireAndForget();
                      }), window.addEventListener("unload", function() {
                        qt.fireAndForget();
                      }), Ro($, function() {
                        Si();
                      });
                    }(), Vt({
                      name: se,
                      updateProps: pt,
                      close: Si
                    });
                  }).then(function() {
                    return (se = z.width, ze = se !== void 0 && se, De = z.height, Le = De !== void 0 && De, Te = z.element, jo(Te === void 0 ? "body" : Te).catch(ye).then(function(et) {
                      return {
                        width: ze,
                        height: Le,
                        element: et
                      };
                    })).then(function(et) {
                      var _e = et.width, Me = et.height, vt = et.element;
                      vt && (_e || Me) && Se !== Re.POPUP && Ho(vt, function(rt) {
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
                    Wt(se);
                  });
                },
                getProps: function() {
                  return re || (ne(Dt, ce), re);
                }
              };
            }(r);
            return b.init(), b;
          }
        }), g = function b(O) {
          var S, I = "zoid-" + o + "-" + ke(), z = O || {}, V = d({
            props: z
          }), A = V.eligible, q = V.reason, L = z.onDestroy;
          z.onDestroy = function() {
            if (S && A && E.splice(E.indexOf(S), 1), L) return L.apply(void 0, arguments);
          };
          var X = Di({
            uid: I,
            options: r
          });
          X.init(), A ? X.setProps(z) : z.onDestroy && z.onDestroy(), kn.register(function(re) {
            return X.destroy(re || new Error("zoid destroyed all components"));
          });
          var $ = function(re) {
            var K = (re === void 0 ? {} : re).decorate;
            return b((K === void 0 ? Fa : K)(z));
          }, ce = function(re, K, H) {
            return R.try(function() {
              if (!A) {
                var ue = new Error(q || n + " component is not eligible");
                return X.destroy(ue).then(function() {
                  throw ue;
                });
              }
              if (!Xt(re)) throw new Error("Must pass window to renderTo");
              return function(k, Se) {
                return R.try(function() {
                  if (k.window) return Mr(k.window).getType();
                  if (Se) {
                    if (Se !== Re.IFRAME && Se !== Re.POPUP) throw new Error("Unrecognized context: " + Se);
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
                if (k === Re.POPUP) return "body";
                throw new Error("Expected element to be passed to render iframe");
              }(ue, K), re !== window && typeof K != "string") throw new Error("Must pass string element when rendering to another window");
              return X.render({
                target: re,
                container: K,
                context: ue,
                rerender: function() {
                  var k = $();
                  return pr(S, k), k.renderTo(re, K, H);
                }
              });
            }).catch(function(ue) {
              return X.destroy(ue).then(function() {
                throw ue;
              });
            });
          };
          return S = P({}, X.getExports(), X.getHelpers(), function() {
            for (var re = h(), K = {}, H = function() {
              var Se = k[ue], Dt = re[Se];
              K[Se] = function(ht) {
                var Bt = X.getProps(), $t = P({}, ht, {
                  parent: {
                    uid: I,
                    props: Bt,
                    export: X.export
                  }
                });
                return Dt($t);
              };
            }, ue = 0, k = Object.keys(re); ue < k.length; ue++) H();
            return K;
          }(), {
            isEligible: function() {
              return A;
            },
            clone: $,
            render: function(re, K) {
              return ce(window, re, K);
            },
            renderTo: function(re, K, H) {
              return ce(re, K, H);
            }
          }), A && E.push(S), S;
        };
        if (p(), function() {
          var b = It("zoid_allow_delegate_" + n, function() {
            return !0;
          }), O = It("zoid_delegate_" + n, function(S) {
            var I = S.data;
            return {
              parent: Di({
                uid: I.uid,
                options: r,
                overrides: I.overrides,
                parentWin: S.source
              })
            };
          });
          eo.register(b.cancel), eo.register(O.cancel);
        }(), l.components = l.components || {}, l.components[o]) throw new Error("Can not register multiple components with the same tag: " + o);
        return l.components[o] = !0, {
          init: g,
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
            return v[b] || (v[b] = S[b].register(o, u, g, O)), v[b];
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
            on: It,
            send: bt
          }).on, d = a.send, (h = xt()).receiveMessage = h.receiveMessage || function(l) {
            return Yn(l, {
              on: u,
              send: d
            });
          }, function(l) {
            var v = l.on, E = l.send;
            le().getOrSet("postMessageListener", function() {
              return $o(window, "message", function(w) {
                (function(p, g) {
                  var b = g.on, O = g.send;
                  R.try(function() {
                    var S = p.source || p.sourceElement, I = p.origin || p.originalEvent && p.originalEvent.origin, z = p.data;
                    if (I === "null" && (I = "file://"), S) {
                      if (!I) throw new Error("Post message did not have origin domain");
                      Yn({
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
            on: It,
            send: bt
          }), ci({
            on: It,
            send: bt,
            receiveMessage: Yn
          }), function(l) {
            var v = l.on, E = l.send;
            le("builtinListeners").getOrSet("helloListener", function() {
              var w = v("postrobot_hello", {
                domain: "*"
              }, function(g) {
                return Xo(g.source, {
                  domain: g.origin
                }), {
                  instanceID: Qo()
                };
              }), p = Qt();
              return p && Un(p, {
                send: E
              }).catch(function(g) {
              }), w;
            });
          }({
            on: It,
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
      function Ni(e) {
        Ut && Ut.destroyBridges();
        var r = kn.all(e);
        return kn = nn(), r;
      }
      var Ci = Ni;
      function ss(e) {
        return Ci(), delete window.__zoid_10_3_3__, function() {
          (function() {
            for (var n = le("responseListeners"), o = 0, a = n.keys(); o < a.length; o++) {
              var u = a[o], d = n.get(u);
              d && (d.cancelled = !0), n.del(u);
            }
          })(), (r = le().get("postMessageListener")) && r.cancel();
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
  const { width: P, height: C } = T, { top: _ = 0, left: y = 0 } = f;
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
              left: ${y}px;
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
  }), m.on(na.RESIZE, ({ width: oe, height: ae }) => {
    typeof oe == "number" && (M.style.width = `${oe}px`), typeof ae == "number" && (M.style.height = `${ae}px`);
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
const ic = Ot(), ac = Ot();
function ia({ adsUrl: t, sdk: i, loader: s }) {
  return class extends s {
    constructor(f) {
      super(f);
    }
    load(f, m, T) {
      const P = T.onSuccess;
      T.onSuccess = async (C, _, y) => {
        (y.type === "manifest" || y.type === "level" || y.type === "audioTrack") && (C.data = await this.modifyManifest(C.url, C.data, y.type)), P(C, _, y);
      }, super.load(f, m, T);
    }
    async modifyManifest(f, m, T) {
      ic.value = m;
      const P = {
        proxyAds: {
          uri: t,
          timeout: 2
        }
      };
      try {
        const C = await i.loadSource({ config: P, manifest: m, masterUri: f });
        return ac.value = C, C;
      } catch (C) {
        return console.error("[LOG] ~ error:", C), m;
      }
    }
  };
}
function sc({
  video: t,
  adContainer: i,
  startSession: s,
  sdk: c,
  domain: f
}) {
  const m = Qu(), T = Ot(!1), P = Ot(), C = Math.random().toString(36).slice(6);
  function _({ icons: D }) {
    const U = Gr(f, "/build/dist/wta/index.html");
    return {
      id: C,
      appConfig: {
        sdkBaseUrl: bn(U || "https://localhost:4222/wta/index.html", { id: C })
      },
      icons: D
    };
  }
  const y = rc(_({
    icons: []
  }));
  y.render(i), y.hide(), i.style.display = "none", Su(() => {
    var D;
    if (P.value) {
      const U = ((D = P.value) == null ? void 0 : D.icons) || [];
      i.style.display = "block", y.updateProps(_({
        icons: U
      })), y.show();
    } else
      i.style.display = "none", y.hide();
  });
  const M = Ot([]), F = Ot(), oe = Ot([]);
  async function ae(D) {
    var J;
    const U = (J = P.value) == null ? void 0 : J.trackingEvents.find((fe) => fe.eventType === D);
    if (!U) {
      console.debug("[LOG] ~ event:", D);
      return;
    }
    m.trigger(U), await Promise.all(U.beaconUrls.map((fe) => Xu(cu(fe, {
      retry: 3,
      retryDelay: 500
    }))));
  }
  const ut = /* @__PURE__ */ new Map();
  let R, gt;
  function Qe(D, U, J) {
    D.addEventListener(U, J), ut.set(U, J);
  }
  function yt(D) {
    var Ke, Ye;
    const U = ((D == null ? void 0 : D.time) || 0) > 0 ? D.time : 0, J = (Ke = D == null ? void 0 : D.value) == null ? void 0 : Ke.event;
    console.debug("[LOG] ~ eventType:", J);
    const fe = oe.value.find((Oe) => Oe.eventType === J && !Oe.tracked && !Oe.skipped);
    if (console.debug("[LOG] ~ eventAd:", fe), !fe)
      return;
    const Je = fe == null ? void 0 : fe.ad;
    if (console.debug("[LOG] ~ ad:", Je), !!Je) {
      if (J === "start")
        P.value && oe.value.filter((Xe) => Xe.key.startsWith(`${P.value.key}_`)).forEach((Xe) => Xe.skipped = !0), P.value = Je, s(Je.adVerifications, m), R = oo(() => {
          ae("impression"), ae("start");
          const Oe = oe.value.find((Xe) => Xe.key === fe.key.replace("_start", "_impression"));
          Oe && (Oe.tracked = !0), fe.tracked = !0, gt = oo(() => {
            P.value = void 0;
          }, 30 * 1e3);
        }, U * 1e3);
      else {
        if (!P.value) {
          console.debug("[LOG] ~ eventType:", J);
          return;
        }
        if (Je.id !== ((Ye = P.value) == null ? void 0 : Ye.id)) {
          console.debug("[ERROR] ~ ad:", Je), console.debug("[ERROR] ~ currentAd:", P.value), oe.value.filter((Xe) => Xe.key.startsWith(`${P.value.key}_`)).forEach((Xe) => Xe.skipped = !0);
          return;
        }
        R = oo(() => {
          ae(J), J === "complete" && Je.id === P.value.id && (P.value = void 0, Ki(gt)), fe.tracked = !0;
        }, U * 1e3);
      }
      console.debug("========================================");
    }
  }
  function ur() {
    return T.value = !1, ["fullscreenchange", "webkitfullscreenchange", "mozfullscreenchange", "msfullscreenchange"].forEach((D) => {
      Qe(t, D, () => {
        const U = document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement;
        ae(U ? "fullscreen" : "exitFullscreen");
      });
    }), Qe(t, "pause", () => ae("pause")), Qe(t, "play", () => ae("resume")), Qe(t, "rewind", () => ae("rewind")), Qe(t, "mute", () => ae("mute")), Qe(t, "unmute", () => ae("unmute")), async (D, U) => {
      if (F.value = U.frag.sn, D !== window.Hls.Events.FRAG_CHANGED)
        return;
      const J = M.value.filter((fe) => fe.sn === U.frag.sn);
      if (!J.length) {
        console.debug("[LOG] ~ trackingEvent:", J);
        return;
      }
      J.forEach((fe) => yt(fe)), M.value = M.value.filter((fe) => fe.sn !== U.frag.sn);
    };
  }
  async function zt() {
    return c.getEventTracking().then((D) => {
      for (const U of (D == null ? void 0 : D.avails) || [])
        for (const J of U.ads) {
          const fe = `${U.id}_${J.id}_${J.startTimeInSeconds}`;
          for (const Je of J.trackingEvents) {
            const Ke = `${fe}_${Je.eventType}`;
            oe.value.find((Oe) => Oe.key === Ke) || oe.value.push({
              ...Je,
              key: Ke,
              ad: {
                ...J,
                key: fe
              },
              tracked: !1
            });
          }
        }
    });
  }
  function cr() {
    return async (D, U) => {
      function J(Ke) {
        for (let Ye = 0; Ye < Ke.length; Ye++)
          if (Ke[Ye] === 0)
            return Ye;
        return Ke.length;
      }
      const { start: fe, sn: Je } = U.frag;
      for (let Ke = 0; Ke < U.samples.length; Ke++) {
        const Ye = U.samples[Ke], Oe = Ye.data, Xe = Ye.pts;
        if (String.fromCharCode.apply(null, Oe.slice(0, 3)) !== "ID3" || String.fromCharCode.apply(null, Oe.slice(10, 14)) !== "TXXX")
          continue;
        const dr = Oe.slice(21, Oe.length), fr = J(dr), Dr = dr.slice(fr + 1, dr.length), Qt = J(Dr), Nr = new TextDecoder("utf-8").decode(Dr.slice(0, Qt)), lr = {
          sn: Je,
          time: Xe - fe,
          value: co(Nr)
        };
        if (F.value && Je < F.value)
          return;
        M.value.push(lr), lr.value.event === "start" && zt();
      }
    };
  }
  function ie() {
    return (D) => {
      const U = D.track;
      U.kind === "metadata" && (U.oncuechange = async () => {
        const J = U.activeCues[0];
        if (J && J.value.data) {
          console.debug("[LOG] ~ elemTrack:", J), await zt();
          const fe = co(J.value.data);
          console.debug("[LOG] ~ trackingEvent:", fe), yt({
            value: fe
          });
        }
      });
    };
  }
  function We(D, U) {
    m.on((J) => {
      (D === "*" || J.eventType === D) && U(J);
    });
  }
  function Et() {
    P.value = void 0, M.value = [], ut.forEach((D, U) => {
      t.removeEventListener(U, D);
    }), ut.clear(), Ki(R);
  }
  function St() {
    return {
      eventTracking: M,
      trackingDataEvent: oe
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
    getLog: St
  };
}
async function cc({ video: t, adContainer: i, adsUrl: s, baseURL: c }) {
  const f = c || "https://cdn.jsdelivr.net/gh/sigmaott/sigma-ssai-web-sdk@v1.0.6", m = Gr(f, "/build/dist/wasm_exec.js") || "https://localhost:4222/wasm_exec.js";
  await oc(m);
  const T = new Pr();
  await T.init(Gr(f, "/build/dist/sigma-cspm.wasm") || "https://localhost:4222/sigma-cspm.wasm");
  function P() {
  }
  const { onEventTracking: C, destroy: _, videojsHelper: y, hlsHelper: M, getLog: F } = sc({
    video: t,
    adContainer: i,
    trackingUrl: "",
    startSession: P,
    sdk: T
  }), oe = Ot(), ae = Ot();
  function ut(ie) {
    ie.config.loader = ia({ adsUrl: s, sdk: T, loader: Hls.DefaultConfig.loader }), oe.value = ie;
    const We = M.createHlsFragChanged(), Et = M.createHlsFragParsingMetadata();
    ie.on("hlsFragChanged", We), ie.on("hlsFragParsingMetadata", Et), ie.on(Hls.Events.ERROR, (St, D) => {
      console.error("HLS Error:", St, D), D.type === window.Hls.ErrorTypes.NETWORK_ERROR ? console.error("Network Error:", D.details) : D.type === window.Hls.ErrorTypes.MEDIA_ERROR ? console.error("Media Error:", D.details) : console.error("Other Error:", D.details);
    }), ae.value = () => {
      ie.off("hlsFragChanged", We), ie.off("hlsFragParsingMetadata", Et);
    };
  }
  function R(ie) {
    ie.hls.config.loader = ia({ adsUrl: s, sdk: T, loader: SigmaManager.DefaultConfig.loader }), oe.value = ie.hls;
    const We = M.createHlsFragChanged(), Et = M.createHlsFragParsingMetadata();
    ie.hls.on("hlsFragChanged", We), ie.hls.on("hlsFragParsingMetadata", Et), ie.on(SigmaManager.Events.ERROR, (St, D) => {
      console.error("HLS Error:", St, D), D.type === window.Hls.ErrorTypes.NETWORK_ERROR ? console.error("Network Error:", D.details) : D.type === window.Hls.ErrorTypes.MEDIA_ERROR ? console.error("Media Error:", D.details) : console.error("Other Error:", D.details);
    }), ae.value = () => {
      ie.hls.destroy();
    };
  }
  const gt = Ot(), Qe = Ot(), ur = {
    instance: T,
    config: {
      proxyAds: {
        uri: s,
        timeout: 2
      }
    }
  };
  function zt(ie) {
    gt.value = ie;
    const We = y.createVideojsAddTrack();
    ie.textTracks().on("addtrack", We), Qe.value = () => {
      ie.textTracks().off("addtrack", We);
    };
  }
  function cr() {
    var ie, We;
    _(), (ie = ae.value) == null || ie.call(ae), (We = Qe.value) == null || We.call(Qe), oe.value = null, gt.value = null, ae.value = null, Qe.value = null;
  }
  return {
    onEventTracking: C,
    destroy: cr,
    sigmaPlayer: {
      attachVideojs: zt,
      attachHls: ut,
      attachSigmaDrm: R,
      attachVideojs2: zt,
      getLog: F
    },
    sdk: T,
    cspm: ur
  };
}
(function(t) {
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
})(videojs);
(function(t) {
  const i = t.Vhs.PlaylistLoader.prototype.parseManifest_;
  t.Vhs.PlaylistLoader.prototype.parseManifest_ = function({ url: s, manifestString: c }) {
    const f = i.apply(this, [{ url: s, manifestString: c }]);
    return f.playlists && f.playlists.length && (f.manifestString = c), f;
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
})(videojs);
(function(t) {
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
      (_, y) => {
        if (this.request) {
          if (c.lastRequest = Date.now(), c.resolvedUri = s(c.resolvedUri, y), _)
            return this.playlistRequestError(this.request, c, m);
          this.haveMetadata({
            playlistString: y.responseText,
            url: c.uri,
            id: c.id
          }).then(() => {
            this.trigger({ type: "playlistrequestcomplete", metadata: C }), m === "HAVE_MAIN_MANIFEST" ? this.trigger("loadedmetadata") : this.trigger("mediachange");
          });
        }
      }
    );
  };
})(videojs);
function dc(t) {
  const i = "https://dai.sigma.video/api/proxy-ads/ads/", s = wo(t), c = `${s.protocol}//${s.host}${s.pathname}`;
  if (!s.search)
    return { playerUrl: t, adsUrl: null };
  const f = Us(t), m = f["sigma.dai.adsEndpoint"];
  if (!m)
    return { playerUrl: t, adsUrl: null };
  const T = {}, P = {};
  for (const [_, y] of Object.entries(f))
    _.startsWith("sigma.dai") ? _ !== "sigma.dai.adsEndpoint" && (T[_.replace("sigma.dai.", "")] = y) : P[_] = y;
  return {
    playerUrl: bn(c, P),
    adsUrl: bn(Gr(i, m), T)
  };
}
export {
  cc as createSigmaDai,
  dc as processURL
};
