const ys = /#/g, Es = /&/g, bs = /\//g, Ps = /=/g, po = /\+/g, Ts = /%5e/gi, Os = /%60/gi, Rs = /%7c/gi, Ss = /%20/gi;
function xs(r) {
  return encodeURI("" + r).replace(Rs, "|");
}
function so(r) {
  return xs(typeof r == "string" ? r : JSON.stringify(r)).replace(po, "%2B").replace(Ss, "+").replace(ys, "%23").replace(Es, "%26").replace(Os, "`").replace(Ts, "^").replace(bs, "%2F");
}
function to(r) {
  return so(r).replace(Ps, "%3D");
}
function ia(r = "") {
  try {
    return decodeURIComponent("" + r);
  } catch {
    return "" + r;
  }
}
function Ds(r) {
  return ia(r.replace(po, " "));
}
function Ns(r) {
  return ia(r.replace(po, " "));
}
function aa(r = "") {
  const i = {};
  r[0] === "?" && (r = r.slice(1));
  for (const s of r.split("&")) {
    const c = s.match(/([^=]+)=?(.*)/) || [];
    if (c.length < 2)
      continue;
    const l = Ds(c[1]);
    if (l === "__proto__" || l === "constructor")
      continue;
    const m = Ns(c[2] || "");
    i[l] === void 0 ? i[l] = m : Array.isArray(i[l]) ? i[l].push(m) : i[l] = [i[l], m];
  }
  return i;
}
function Cs(r, i) {
  return (typeof i == "number" || typeof i == "boolean") && (i = String(i)), i ? Array.isArray(i) ? i.map((s) => `${to(r)}=${so(s)}`).join("&") : `${to(r)}=${so(i)}` : to(r);
}
function Is(r) {
  return Object.keys(r).filter((i) => r[i] !== void 0).map((i) => Cs(i, r[i])).filter(Boolean).join("&");
}
const As = /^[\s\w\0+.-]{2,}:([/\\]{1,2})/, Ws = /^[\s\w\0+.-]{2,}:([/\\]{2})?/, _s = /^([/\\]\s*){2,}[^/\\]/, Ms = /^\.?\//;
function sa(r, i = {}) {
  return typeof i == "boolean" && (i = { acceptRelative: i }), i.strict ? As.test(r) : Ws.test(r) || (i.acceptRelative ? _s.test(r) : !1);
}
function Fs(r = "", i) {
  return r.endsWith("/");
}
function zs(r = "", i) {
  return (Fs(r) ? r.slice(0, -1) : r) || "/";
}
function Ls(r = "", i) {
  return r.endsWith("/") ? r : r + "/";
}
function js(r, i) {
  if (Bs(i) || sa(r))
    return r;
  const s = zs(i);
  return r.startsWith(s) ? r : ua(s, r);
}
function yn(r, i) {
  const s = vo(r), c = { ...aa(s.search), ...i };
  return s.search = Is(c), qs(s);
}
function Us(r) {
  return aa(vo(r).search);
}
function Bs(r) {
  return !r || r === "/";
}
function $s(r) {
  return r && r !== "/";
}
function ua(r, ...i) {
  let s = r || "";
  for (const c of i.filter((l) => $s(l)))
    if (s) {
      const l = c.replace(Ms, "");
      s = Ls(s) + l;
    } else
      s = c;
  return s;
}
const ca = Symbol.for("ufo:protocolRelative");
function vo(r = "", i) {
  const s = r.match(
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
  if (!sa(r, { acceptRelative: !0 }))
    return qi(r);
  const [, c = "", l, m = ""] = r.replace(/\\/g, "/").match(/^[\s\0]*([\w+.-]{2,}:)?\/\/([^/@]+@)?(.*)/) || [];
  let [, P = "", T = ""] = m.match(/([^#/?]*)(.*)?/) || [];
  c === "file:" && (T = T.replace(/\/(?=[A-Za-z]:)/, ""));
  const { pathname: D, search: W, hash: g } = qi(T);
  return {
    protocol: c.toLowerCase(),
    auth: l ? l.slice(0, Math.max(0, l.length - 1)) : "",
    host: P,
    pathname: D,
    search: W,
    hash: g,
    [ca]: !c
  };
}
function qi(r = "") {
  const [i = "", s = "", c = ""] = (r.match(/([^#?]*)(\?[^#]*)?(#.*)?/) || []).splice(1);
  return {
    pathname: i,
    search: s,
    hash: c
  };
}
function qs(r) {
  const i = r.pathname || "", s = r.search ? (r.search.startsWith("?") ? "" : "?") + r.search : "", c = r.hash || "", l = r.auth ? r.auth + "@" : "", m = r.host || "";
  return (r.protocol || r[ca] ? (r.protocol || "") + "//" : "") + l + m + i + s + c;
}
const Hs = /"(?:_|\\u0{2}5[Ff]){2}(?:p|\\u0{2}70)(?:r|\\u0{2}72)(?:o|\\u0{2}6[Ff])(?:t|\\u0{2}74)(?:o|\\u0{2}6[Ff])(?:_|\\u0{2}5[Ff]){2}"\s*:/, Vs = /"(?:c|\\u0063)(?:o|\\u006[Ff])(?:n|\\u006[Ee])(?:s|\\u0073)(?:t|\\u0074)(?:r|\\u0072)(?:u|\\u0075)(?:c|\\u0063)(?:t|\\u0074)(?:o|\\u006[Ff])(?:r|\\u0072)"\s*:/, Gs = /^\s*["[{]|^\s*-?\d{1,16}(\.\d{1,17})?([Ee][+-]?\d+)?\s*$/;
function Js(r, i) {
  if (r === "__proto__" || r === "constructor" && i && typeof i == "object" && "prototype" in i) {
    Ks(r);
    return;
  }
  return i;
}
function Ks(r) {
  console.warn(`[destr] Dropping "${r}" key to prevent prototype pollution.`);
}
function uo(r, i = {}) {
  if (typeof r != "string")
    return r;
  const s = r.trim();
  if (
    // eslint-disable-next-line unicorn/prefer-at
    r[0] === '"' && r.endsWith('"') && !r.includes("\\")
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
  if (!Gs.test(r)) {
    if (i.strict)
      throw new SyntaxError("[destr] Invalid JSON");
    return r;
  }
  try {
    if (Hs.test(r) || Vs.test(r)) {
      if (i.strict)
        throw new Error("[destr] Possible prototype pollution");
      return JSON.parse(r, Js);
    }
    return JSON.parse(r);
  } catch (c) {
    if (i.strict)
      throw c;
    return r;
  }
}
class Ys extends Error {
  constructor(i, s) {
    super(i, s), this.name = "FetchError", s != null && s.cause && !this.cause && (this.cause = s.cause);
  }
}
function Zs(r) {
  var D, W, g, M, _;
  const i = ((D = r.error) == null ? void 0 : D.message) || ((W = r.error) == null ? void 0 : W.toString()) || "", s = ((g = r.request) == null ? void 0 : g.method) || ((M = r.options) == null ? void 0 : M.method) || "GET", c = ((_ = r.request) == null ? void 0 : _.url) || String(r.request) || "/", l = `[${s}] ${JSON.stringify(c)}`, m = r.response ? `${r.response.status} ${r.response.statusText}` : "<no response>", P = `${l}: ${m}${i ? ` ${i}` : ""}`, T = new Ys(
    P,
    r.error ? { cause: r.error } : void 0
  );
  for (const te of ["request", "options", "response"])
    Object.defineProperty(T, te, {
      get() {
        return r[te];
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
        return r.response && r.response[Re];
      }
    });
  return T;
}
const Qs = new Set(
  Object.freeze(["PATCH", "POST", "PUT", "DELETE"])
);
function Hi(r = "GET") {
  return Qs.has(r.toUpperCase());
}
function Xs(r) {
  if (r === void 0)
    return !1;
  const i = typeof r;
  return i === "string" || i === "number" || i === "boolean" || i === null ? !0 : i !== "object" ? !1 : Array.isArray(r) ? !0 : r.buffer ? !1 : r.constructor && r.constructor.name === "Object" || typeof r.toJSON == "function";
}
const ks = /* @__PURE__ */ new Set([
  "image/svg",
  "application/xml",
  "application/xhtml",
  "application/html"
]), eu = /^application\/(?:[\w!#$%&*.^`~-]*\+)?json(;.+)?$/i;
function ru(r = "") {
  if (!r)
    return "json";
  const i = r.split(";").shift() || "";
  return eu.test(i) ? "json" : ks.has(i) || i.startsWith("text/") ? "text" : "blob";
}
function tu(r, i, s = globalThis.Headers) {
  const c = {
    ...i,
    ...r
  };
  if (i != null && i.params && (r != null && r.params) && (c.params = {
    ...i == null ? void 0 : i.params,
    ...r == null ? void 0 : r.params
  }), i != null && i.query && (r != null && r.query) && (c.query = {
    ...i == null ? void 0 : i.query,
    ...r == null ? void 0 : r.query
  }), i != null && i.headers && (r != null && r.headers)) {
    c.headers = new s((i == null ? void 0 : i.headers) || {});
    for (const [l, m] of new s((r == null ? void 0 : r.headers) || {}))
      c.headers.set(l, m);
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
function da(r = {}) {
  const {
    fetch: i = globalThis.fetch,
    Headers: s = globalThis.Headers,
    AbortController: c = globalThis.AbortController
  } = r;
  async function l(T) {
    const D = T.error && T.error.name === "AbortError" && !T.options.timeout || !1;
    if (T.options.retry !== !1 && !D) {
      let g;
      typeof T.options.retry == "number" ? g = T.options.retry : g = Hi(T.options.method) ? 0 : 1;
      const M = T.response && T.response.status || 500;
      if (g > 0 && (Array.isArray(T.options.retryStatusCodes) ? T.options.retryStatusCodes.includes(M) : nu.has(M))) {
        const _ = T.options.retryDelay || 0;
        return _ > 0 && await new Promise((te) => setTimeout(te, _)), m(T.request, {
          ...T.options,
          retry: g - 1
        });
      }
    }
    const W = Zs(T);
    throw Error.captureStackTrace && Error.captureStackTrace(W, m), W;
  }
  const m = async function(D, W = {}) {
    var te;
    const g = {
      request: D,
      options: tu(W, r.defaults, s),
      response: void 0,
      error: void 0
    };
    g.options.method = (te = g.options.method) == null ? void 0 : te.toUpperCase(), g.options.onRequest && await g.options.onRequest(g), typeof g.request == "string" && (g.options.baseURL && (g.request = js(g.request, g.options.baseURL)), (g.options.query || g.options.params) && (g.request = yn(g.request, {
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
      return g.error = Re, g.options.onRequestError && await g.options.onRequestError(g), await l(g);
    } finally {
      M && clearTimeout(M);
    }
    if (g.response.body && !ou.has(g.response.status) && g.options.method !== "HEAD") {
      const Re = (g.options.parseResponse ? "json" : g.options.responseType) || ru(g.response.headers.get("content-type") || "");
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
    return g.options.onResponse && await g.options.onResponse(g), !g.options.ignoreResponseError && g.response.status >= 400 && g.response.status < 600 ? (g.options.onResponseError && await g.options.onResponseError(g), await l(g)) : g.response;
  }, P = async function(D, W) {
    return (await m(D, W))._data;
  };
  return P.raw = m, P.native = (...T) => i(...T), P.create = (T = {}) => da({
    ...r,
    defaults: {
      ...r.defaults,
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
  onResponseError({ response: r, error: i }) {
    console.log("[LOG] ~ error:", i);
  },
  onRequest: ({ options: r, request: i }) => {
    const s = r.token;
    s && (r.headers = r.headers || {}, r.headers.Authorization = `${s}`);
  },
  onResponse({ response: r, options: i }) {
  }
}), du = (r) => (i, s) => (r.set(i, s), s), Vi = Number.MAX_SAFE_INTEGER === void 0 ? 9007199254740991 : Number.MAX_SAFE_INTEGER, fa = 536870912, Gi = fa * 2, fu = (r, i) => (s) => {
  const c = i.get(s);
  let l = c === void 0 ? s.size : c < Gi ? c + 1 : 0;
  if (!s.has(l))
    return r(s, l);
  if (s.size < fa) {
    for (; s.has(l); )
      l = Math.floor(Math.random() * Gi);
    return r(s, l);
  }
  if (s.size > Vi)
    throw new Error("Congratulations, you created a collection of unique numbers which uses all available integers!");
  for (; s.has(l); )
    l = Math.floor(Math.random() * Vi);
  return r(s, l);
}, la = /* @__PURE__ */ new WeakMap(), lu = du(la), hn = fu(lu, la), hu = (r) => r.method !== void 0 && r.method === "call", pu = (r) => typeof r.id == "number" && typeof r.result == "boolean", vu = (r) => {
  const i = /* @__PURE__ */ new Map([[0, () => {
  }]]), s = /* @__PURE__ */ new Map([[0, () => {
  }]]), c = /* @__PURE__ */ new Map(), l = new Worker(r);
  return l.addEventListener("message", ({ data: W }) => {
    if (hu(W)) {
      const { params: { timerId: g, timerType: M } } = W;
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
    } else if (pu(W)) {
      const { id: g } = W, M = c.get(g);
      if (M === void 0)
        throw new Error("The timer is in an undefined state.");
      const { timerId: _, timerType: te } = M;
      c.delete(g), te === "interval" ? i.delete(_) : s.delete(_);
    } else {
      const { error: { message: g } } = W;
      throw new Error(g);
    }
  }), {
    clearInterval: (W) => {
      if (typeof i.get(W) == "function") {
        const g = hn(c);
        c.set(g, { timerId: W, timerType: "interval" }), i.set(W, g), l.postMessage({
          id: g,
          method: "clear",
          params: { timerId: W, timerType: "interval" }
        });
      }
    },
    clearTimeout: (W) => {
      if (typeof s.get(W) == "function") {
        const g = hn(c);
        c.set(g, { timerId: W, timerType: "timeout" }), s.set(W, g), l.postMessage({
          id: g,
          method: "clear",
          params: { timerId: W, timerType: "timeout" }
        });
      }
    },
    setInterval: (W, g = 0, ...M) => {
      const _ = hn(i);
      return i.set(_, () => {
        W(...M), typeof i.get(_) == "function" && l.postMessage({
          id: null,
          method: "set",
          params: {
            delay: g,
            now: performance.timeOrigin + performance.now(),
            timerId: _,
            timerType: "interval"
          }
        });
      }), l.postMessage({
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
    setTimeout: (W, g = 0, ...M) => {
      const _ = hn(s);
      return s.set(_, () => W(...M)), l.postMessage({
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
}, wu = (r, i) => {
  let s = null;
  return () => {
    if (s !== null)
      return s;
    const c = new Blob([i], { type: "application/javascript; charset=utf-8" }), l = URL.createObjectURL(c);
    return s = r(l), setTimeout(() => URL.revokeObjectURL(l)), s;
  };
}, mu = `(()=>{"use strict";const e=new Map,t=new Map,r=t=>{const r=e.get(t);return void 0!==r&&(clearTimeout(r),e.delete(t),!0)},s=e=>{const r=t.get(e);return void 0!==r&&(clearTimeout(r),t.delete(e),!0)},o=(e,t)=>{const r=performance.now(),s=e+t-r-performance.timeOrigin;return{expected:r+s,remainingDelay:s}},i=(e,t,r,s)=>{const o=r-performance.now();o>0?e.set(t,setTimeout(i,o,e,t,r,s)):(e.delete(t),postMessage({id:null,method:"call",params:{timerId:t,timerType:s}}))};addEventListener("message",(n=>{let{data:a}=n;try{if("clear"===a.method){const{id:e,params:{timerId:t,timerType:o}}=a;if("interval"===o)postMessage({id:e,result:r(t)});else{if("timeout"!==o)throw new Error('The given type "'.concat(o,'" is not supported'));postMessage({id:e,result:s(t)})}}else{if("set"!==a.method)throw new Error('The given method "'.concat(a.method,'" is not supported'));{const{params:{delay:r,now:s,timerId:n,timerType:m}}=a;if("interval"===m)((t,r,s)=>{const{expected:n,remainingDelay:a}=o(t,s);e.set(r,setTimeout(i,a,e,r,n,"interval"))})(r,n,s);else{if("timeout"!==m)throw new Error('The given type "'.concat(m,'" is not supported'));((e,r,s)=>{const{expected:n,remainingDelay:a}=o(e,s);t.set(r,setTimeout(i,a,t,r,n,"timeout"))})(r,n,s)}}}}catch(e){postMessage({error:{message:e.message},id:a.id,result:null})}}))})();`, ha = wu(vu, mu), Ji = (r) => ha().clearTimeout(r), no = (...r) => ha().setTimeout(...r);
/**
* @vue/shared v3.5.1
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
/*! #__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function gu(r, i) {
  const s = new Set(r.split(","));
  return (c) => s.has(c);
}
const Ki = Object.assign, yu = Object.prototype.hasOwnProperty, co = (r, i) => yu.call(r, i), Pt = Array.isArray, Bt = (r) => pa(r) === "[object Map]", Eu = (r) => typeof r == "string", Ht = (r) => typeof r == "symbol", bn = (r) => r !== null && typeof r == "object", bu = Object.prototype.toString, pa = (r) => bu.call(r), va = (r) => pa(r).slice(8, -1), mo = (r) => Eu(r) && r !== "NaN" && r[0] !== "-" && "" + parseInt(r, 10) === r, Pu = (r) => {
  const i = /* @__PURE__ */ Object.create(null);
  return (s) => i[s] || (i[s] = r(s));
}, Tu = Pu((r) => r.charAt(0).toUpperCase() + r.slice(1)), St = (r, i) => !Object.is(r, i);
var He = {};
function Ot(r, ...i) {
  console.warn(`[Vue warn] ${r}`, ...i);
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
    this.flags & 2 && !(this.flags & 32) || this.flags & 8 || (this.flags |= 8, this.nextEffect = $t, $t = this);
  }
  run() {
    if (!(this.flags & 1))
      return this.fn();
    this.flags |= 2, Zi(this), ma(this);
    const i = le, s = Rr;
    le = this, Rr = !0;
    try {
      return this.fn();
    } finally {
      He.NODE_ENV !== "production" && le !== this && Ot(
        "Active effect was not restored correctly - this is likely a Vue internal bug."
      ), ga(this), le = i, Rr = s, this.flags &= -3;
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
let wa = 0, $t;
function go() {
  wa++;
}
function yo() {
  if (--wa > 0)
    return;
  let r;
  for (; $t; ) {
    let i = $t;
    for ($t = void 0; i; ) {
      const s = i.nextEffect;
      if (i.nextEffect = void 0, i.flags &= -9, i.flags & 1)
        try {
          i.trigger();
        } catch (c) {
          r || (r = c);
        }
      i = s;
    }
  }
  if (r) throw r;
}
function ma(r) {
  for (let i = r.deps; i; i = i.nextDep)
    i.version = -1, i.prevActiveLink = i.dep.activeLink, i.dep.activeLink = i;
}
function ga(r) {
  let i, s = r.depsTail;
  for (let c = s; c; c = c.prevDep)
    c.version === -1 ? (c === s && (s = c.prevDep), Eo(c), Ru(c)) : i = c, c.dep.activeLink = c.prevActiveLink, c.prevActiveLink = void 0;
  r.deps = i, r.depsTail = s;
}
function fo(r) {
  for (let i = r.deps; i; i = i.nextDep)
    if (i.dep.version !== i.version || i.dep.computed && Ou(i.dep.computed) === !1 || i.dep.version !== i.version)
      return !0;
  return !!r._dirty;
}
function Ou(r) {
  if (r.flags & 2)
    return !1;
  if (r.flags & 4 && !(r.flags & 16) || (r.flags &= -17, r.globalVersion === En))
    return;
  r.globalVersion = En;
  const i = r.dep;
  if (r.flags |= 2, i.version > 0 && !r.isSSR && !fo(r)) {
    r.flags &= -3;
    return;
  }
  const s = le, c = Rr;
  le = r, Rr = !0;
  try {
    ma(r);
    const l = r.fn();
    (i.version === 0 || St(l, r._value)) && (r._value = l, i.version++);
  } catch (l) {
    throw i.version++, l;
  } finally {
    le = s, Rr = c, ga(r), r.flags &= -3;
  }
}
function Eo(r) {
  const { dep: i, prevSub: s, nextSub: c } = r;
  if (s && (s.nextSub = c, r.prevSub = void 0), c && (c.prevSub = s, r.nextSub = void 0), i.subs === r && (i.subs = s), !i.subs && i.computed) {
    i.computed.flags &= -5;
    for (let l = i.computed.deps; l; l = l.nextDep)
      Eo(l);
  }
}
function Ru(r) {
  const { prevDep: i, nextDep: s } = r;
  i && (i.nextDep = s, r.prevDep = void 0), s && (s.prevDep = i, r.nextDep = void 0);
}
function Su(r, i) {
  r.effect instanceof Yi && (r = r.effect.fn);
  const s = new Yi(r);
  try {
    s.run();
  } catch (l) {
    throw s.stop(), l;
  }
  const c = s.run.bind(s);
  return c.effect = s, c;
}
let Rr = !0;
const ya = [];
function xu() {
  ya.push(Rr), Rr = !1;
}
function Du() {
  const r = ya.pop();
  Rr = r === void 0 ? !0 : r;
}
function Zi(r) {
  const { cleanup: i } = r;
  if (r.cleanup = void 0, i) {
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
    if (!le || !Rr)
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
function ba(r) {
  const i = r.dep.computed;
  if (i && !r.dep.subs) {
    i.flags |= 20;
    for (let c = i.deps; c; c = c.nextDep)
      ba(c);
  }
  const s = r.dep.subs;
  s !== r && (r.prevSub = s, s && (s.nextSub = r)), He.NODE_ENV !== "production" && r.dep.subsHead === void 0 && (r.dep.subsHead = r), r.dep.subs = r;
}
const lo = /* @__PURE__ */ new WeakMap(), ut = Symbol(
  He.NODE_ENV !== "production" ? "Object iterate" : ""
), ho = Symbol(
  He.NODE_ENV !== "production" ? "Map keys iterate" : ""
), qt = Symbol(
  He.NODE_ENV !== "production" ? "Array iterate" : ""
);
function dr(r, i, s) {
  if (Rr && le) {
    let c = lo.get(r);
    c || lo.set(r, c = /* @__PURE__ */ new Map());
    let l = c.get(s);
    l || c.set(s, l = new Ea()), He.NODE_ENV !== "production" ? l.track({
      target: r,
      type: i,
      key: s
    }) : l.track();
  }
}
function Yr(r, i, s, c, l, m) {
  const P = lo.get(r);
  if (!P) {
    En++;
    return;
  }
  let T = [];
  if (i === "clear")
    T = [...P.values()];
  else {
    const D = Pt(r), W = D && mo(s);
    if (D && s === "length") {
      const g = Number(c);
      P.forEach((M, _) => {
        (_ === "length" || _ === qt || !Ht(_) && _ >= g) && T.push(M);
      });
    } else {
      const g = (M) => M && T.push(M);
      switch (s !== void 0 && g(P.get(s)), W && g(P.get(qt)), i) {
        case "add":
          D ? W && g(P.get("length")) : (g(P.get(ut)), Bt(r) && g(P.get(ho)));
          break;
        case "delete":
          D || (g(P.get(ut)), Bt(r) && g(P.get(ho)));
          break;
        case "set":
          Bt(r) && g(P.get(ut));
          break;
      }
    }
  }
  go();
  for (const D of T)
    He.NODE_ENV !== "production" ? D.trigger({
      target: r,
      type: i,
      key: s,
      newValue: c,
      oldValue: l,
      oldTarget: m
    }) : D.trigger();
  yo();
}
function gt(r) {
  const i = he(r);
  return i === r ? i : (dr(i, "iterate", qt), Zr(r) ? i : i.map(sr));
}
function bo(r) {
  return dr(r = he(r), "iterate", qt), r;
}
const Nu = {
  __proto__: null,
  [Symbol.iterator]() {
    return io(this, Symbol.iterator, sr);
  },
  concat(...r) {
    return gt(this).concat(
      ...r.map((i) => Pt(i) ? gt(i) : i)
    );
  },
  entries() {
    return io(this, "entries", (r) => (r[1] = sr(r[1]), r));
  },
  every(r, i) {
    return zr(this, "every", r, i, void 0, arguments);
  },
  filter(r, i) {
    return zr(this, "filter", r, i, (s) => s.map(sr), arguments);
  },
  find(r, i) {
    return zr(this, "find", r, i, sr, arguments);
  },
  findIndex(r, i) {
    return zr(this, "findIndex", r, i, void 0, arguments);
  },
  findLast(r, i) {
    return zr(this, "findLast", r, i, sr, arguments);
  },
  findLastIndex(r, i) {
    return zr(this, "findLastIndex", r, i, void 0, arguments);
  },
  // flat, flatMap could benefit from ARRAY_ITERATE but are not straight-forward to implement
  forEach(r, i) {
    return zr(this, "forEach", r, i, void 0, arguments);
  },
  includes(...r) {
    return ao(this, "includes", r);
  },
  indexOf(...r) {
    return ao(this, "indexOf", r);
  },
  join(r) {
    return gt(this).join(r);
  },
  // keys() iterator only reads `length`, no optimisation required
  lastIndexOf(...r) {
    return ao(this, "lastIndexOf", r);
  },
  map(r, i) {
    return zr(this, "map", r, i, void 0, arguments);
  },
  pop() {
    return Ut(this, "pop");
  },
  push(...r) {
    return Ut(this, "push", r);
  },
  reduce(r, ...i) {
    return Qi(this, "reduce", r, i);
  },
  reduceRight(r, ...i) {
    return Qi(this, "reduceRight", r, i);
  },
  shift() {
    return Ut(this, "shift");
  },
  // slice could use ARRAY_ITERATE but also seems to beg for range tracking
  some(r, i) {
    return zr(this, "some", r, i, void 0, arguments);
  },
  splice(...r) {
    return Ut(this, "splice", r);
  },
  toReversed() {
    return gt(this).toReversed();
  },
  toSorted(r) {
    return gt(this).toSorted(r);
  },
  toSpliced(...r) {
    return gt(this).toSpliced(...r);
  },
  unshift(...r) {
    return Ut(this, "unshift", r);
  },
  values() {
    return io(this, "values", sr);
  }
};
function io(r, i, s) {
  const c = bo(r), l = c[i]();
  return c !== r && !Zr(r) && (l._next = l.next, l.next = () => {
    const m = l._next();
    return m.value && (m.value = s(m.value)), m;
  }), l;
}
const Cu = Array.prototype;
function zr(r, i, s, c, l, m) {
  const P = bo(r), T = P !== r && !Zr(r), D = P[i];
  if (D !== Cu[i]) {
    const M = D.apply(r, m);
    return T ? sr(M) : M;
  }
  let W = s;
  P !== r && (T ? W = function(M, _) {
    return s.call(this, sr(M), _, r);
  } : s.length > 2 && (W = function(M, _) {
    return s.call(this, M, _, r);
  }));
  const g = D.call(P, W, c);
  return T && l ? l(g) : g;
}
function Qi(r, i, s, c) {
  const l = bo(r);
  let m = s;
  return l !== r && (Zr(r) ? s.length > 3 && (m = function(P, T, D) {
    return s.call(this, P, T, D, r);
  }) : m = function(P, T, D) {
    return s.call(this, P, sr(T), D, r);
  }), l[i](m, ...c);
}
function ao(r, i, s) {
  const c = he(r);
  dr(c, "iterate", qt);
  const l = c[i](...s);
  return (l === -1 || l === !1) && Ku(s[0]) ? (s[0] = he(s[0]), c[i](...s)) : l;
}
function Ut(r, i, s = []) {
  xu(), go();
  const c = he(r)[i].apply(r, s);
  return yo(), Du(), c;
}
const Iu = /* @__PURE__ */ gu("__proto__,__v_isRef,__isVue"), Pa = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((r) => r !== "arguments" && r !== "caller").map((r) => Symbol[r]).filter(Ht)
);
function Au(r) {
  Ht(r) || (r = String(r));
  const i = he(this);
  return dr(i, "has", r), i.hasOwnProperty(r);
}
class Ta {
  constructor(i = !1, s = !1) {
    this._isReadonly = i, this._isShallow = s;
  }
  get(i, s, c) {
    const l = this._isReadonly, m = this._isShallow;
    if (s === "__v_isReactive")
      return !l;
    if (s === "__v_isReadonly")
      return l;
    if (s === "__v_isShallow")
      return m;
    if (s === "__v_raw")
      return c === (l ? m ? Vu : xa : m ? Hu : Sa).get(i) || // receiver is not the reactive proxy, but has the same prototype
      // this means the receiver is a user proxy of the reactive proxy
      Object.getPrototypeOf(i) === Object.getPrototypeOf(c) ? i : void 0;
    const P = Pt(i);
    if (!l) {
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
      Tt(i) ? i : c
    );
    return (Ht(s) ? Pa.has(s) : Iu(s)) || (l || dr(i, "get", s), m) ? T : Tt(T) ? P && mo(s) ? T : T.value : bn(T) ? l ? Na(T) : Da(T) : T;
  }
}
class Wu extends Ta {
  constructor(i = !1) {
    super(!1, i);
  }
  set(i, s, c, l) {
    let m = i[s];
    if (!this._isShallow) {
      const D = Rt(m);
      if (!Zr(c) && !Rt(c) && (m = he(m), c = he(c)), !Pt(i) && Tt(m) && !Tt(c))
        return D ? !1 : (m.value = c, !0);
    }
    const P = Pt(i) && mo(s) ? Number(s) < i.length : co(i, s), T = Reflect.set(
      i,
      s,
      c,
      Tt(i) ? i : l
    );
    return i === he(l) && (P ? St(c, m) && Yr(i, "set", s, c, m) : Yr(i, "add", s, c)), T;
  }
  deleteProperty(i, s) {
    const c = co(i, s), l = i[s], m = Reflect.deleteProperty(i, s);
    return m && c && Yr(i, "delete", s, void 0, l), m;
  }
  has(i, s) {
    const c = Reflect.has(i, s);
    return (!Ht(s) || !Pa.has(s)) && dr(i, "has", s), c;
  }
  ownKeys(i) {
    return dr(
      i,
      "iterate",
      Pt(i) ? "length" : ut
    ), Reflect.ownKeys(i);
  }
}
class _u extends Ta {
  constructor(i = !1) {
    super(!0, i);
  }
  set(i, s) {
    return He.NODE_ENV !== "production" && Ot(
      `Set operation on key "${String(s)}" failed: target is readonly.`,
      i
    ), !0;
  }
  deleteProperty(i, s) {
    return He.NODE_ENV !== "production" && Ot(
      `Delete operation on key "${String(s)}" failed: target is readonly.`,
      i
    ), !0;
  }
}
const Mu = /* @__PURE__ */ new Wu(), Fu = /* @__PURE__ */ new _u(), Po = (r) => r, Pn = (r) => Reflect.getPrototypeOf(r);
function pn(r, i, s = !1, c = !1) {
  r = r.__v_raw;
  const l = he(r), m = he(i);
  s || (St(i, m) && dr(l, "get", i), dr(l, "get", m));
  const { has: P } = Pn(l), T = c ? Po : s ? To : sr;
  if (P.call(l, i))
    return T(r.get(i));
  if (P.call(l, m))
    return T(r.get(m));
  r !== l && r.get(i);
}
function vn(r, i = !1) {
  const s = this.__v_raw, c = he(s), l = he(r);
  return i || (St(r, l) && dr(c, "has", r), dr(c, "has", l)), r === l ? s.has(r) : s.has(r) || s.has(l);
}
function wn(r, i = !1) {
  return r = r.__v_raw, !i && dr(he(r), "iterate", ut), Reflect.get(r, "size", r);
}
function Xi(r, i = !1) {
  !i && !Zr(r) && !Rt(r) && (r = he(r));
  const s = he(this);
  return Pn(s).has.call(s, r) || (s.add(r), Yr(s, "add", r, r)), this;
}
function ki(r, i, s = !1) {
  !s && !Zr(i) && !Rt(i) && (i = he(i));
  const c = he(this), { has: l, get: m } = Pn(c);
  let P = l.call(c, r);
  P ? He.NODE_ENV !== "production" && Ra(c, l, r) : (r = he(r), P = l.call(c, r));
  const T = m.call(c, r);
  return c.set(r, i), P ? St(i, T) && Yr(c, "set", r, i, T) : Yr(c, "add", r, i), this;
}
function ea(r) {
  const i = he(this), { has: s, get: c } = Pn(i);
  let l = s.call(i, r);
  l ? He.NODE_ENV !== "production" && Ra(i, s, r) : (r = he(r), l = s.call(i, r));
  const m = c ? c.call(i, r) : void 0, P = i.delete(r);
  return l && Yr(i, "delete", r, void 0, m), P;
}
function ra() {
  const r = he(this), i = r.size !== 0, s = He.NODE_ENV !== "production" ? Bt(r) ? new Map(r) : new Set(r) : void 0, c = r.clear();
  return i && Yr(r, "clear", void 0, void 0, s), c;
}
function mn(r, i) {
  return function(c, l) {
    const m = this, P = m.__v_raw, T = he(P), D = i ? Po : r ? To : sr;
    return !r && dr(T, "iterate", ut), P.forEach((W, g) => c.call(l, D(W), D(g), m));
  };
}
function gn(r, i, s) {
  return function(...c) {
    const l = this.__v_raw, m = he(l), P = Bt(m), T = r === "entries" || r === Symbol.iterator && P, D = r === "keys" && P, W = l[r](...c), g = s ? Po : i ? To : sr;
    return !i && dr(
      m,
      "iterate",
      D ? ho : ut
    ), {
      // iterator protocol
      next() {
        const { value: M, done: _ } = W.next();
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
function Kr(r) {
  return function(...i) {
    if (He.NODE_ENV !== "production") {
      const s = i[0] ? `on key "${i[0]}" ` : "";
      Ot(
        `${Tu(r)} operation ${s}failed: target is readonly.`,
        he(this)
      );
    }
    return r === "delete" ? !1 : r === "clear" ? void 0 : this;
  };
}
function zu() {
  const r = {
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
    clear: ra,
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
    clear: ra,
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
    add: Kr("add"),
    set: Kr("set"),
    delete: Kr("delete"),
    clear: Kr("clear"),
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
    add: Kr("add"),
    set: Kr("set"),
    delete: Kr("delete"),
    clear: Kr("clear"),
    forEach: mn(!0, !0)
  };
  return [
    "keys",
    "values",
    "entries",
    Symbol.iterator
  ].forEach((m) => {
    r[m] = gn(m, !1, !1), s[m] = gn(m, !0, !1), i[m] = gn(m, !1, !0), c[m] = gn(
      m,
      !0,
      !0
    );
  }), [
    r,
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
function Oa(r, i) {
  const s = i ? r ? Bu : Uu : r ? ju : Lu;
  return (c, l, m) => l === "__v_isReactive" ? !r : l === "__v_isReadonly" ? r : l === "__v_raw" ? c : Reflect.get(
    co(s, l) && l in c ? s : c,
    l,
    m
  );
}
const $u = {
  get: /* @__PURE__ */ Oa(!1, !1)
}, qu = {
  get: /* @__PURE__ */ Oa(!0, !1)
};
function Ra(r, i, s) {
  const c = he(s);
  if (c !== s && i.call(r, c)) {
    const l = va(r);
    Ot(
      `Reactive ${l} contains both the raw and reactive versions of the same object${l === "Map" ? " as keys" : ""}, which can lead to inconsistencies. Avoid differentiating between the raw and reactive versions of an object and only use the reactive version if possible.`
    );
  }
}
const Sa = /* @__PURE__ */ new WeakMap(), Hu = /* @__PURE__ */ new WeakMap(), xa = /* @__PURE__ */ new WeakMap(), Vu = /* @__PURE__ */ new WeakMap();
function Gu(r) {
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
function Ju(r) {
  return r.__v_skip || !Object.isExtensible(r) ? 0 : Gu(va(r));
}
function Da(r) {
  return Rt(r) ? r : Ca(
    r,
    !1,
    Mu,
    $u,
    Sa
  );
}
function Na(r) {
  return Ca(
    r,
    !0,
    Fu,
    qu,
    xa
  );
}
function Ca(r, i, s, c, l) {
  if (!bn(r))
    return He.NODE_ENV !== "production" && Ot(
      `value cannot be made ${i ? "readonly" : "reactive"}: ${String(
        r
      )}`
    ), r;
  if (r.__v_raw && !(i && r.__v_isReactive))
    return r;
  const m = l.get(r);
  if (m)
    return m;
  const P = Ju(r);
  if (P === 0)
    return r;
  const T = new Proxy(
    r,
    P === 2 ? c : s
  );
  return l.set(r, T), T;
}
function Rt(r) {
  return !!(r && r.__v_isReadonly);
}
function Zr(r) {
  return !!(r && r.__v_isShallow);
}
function Ku(r) {
  return r ? !!r.__v_raw : !1;
}
function he(r) {
  const i = r && r.__v_raw;
  return i ? he(i) : r;
}
const sr = (r) => bn(r) ? Da(r) : r, To = (r) => bn(r) ? Na(r) : r;
function Tt(r) {
  return r ? r.__v_isRef === !0 : !1;
}
function Or(r) {
  return Yu(r, !1);
}
function Yu(r, i) {
  return Tt(r) ? r : new Zu(r, i);
}
class Zu {
  constructor(i, s) {
    this.dep = new Ea(), this.__v_isRef = !0, this.__v_isShallow = !1, this._rawValue = s ? i : he(i), this._value = s ? i : sr(i), this.__v_isShallow = s;
  }
  get value() {
    return He.NODE_ENV !== "production" ? this.dep.track({
      target: this,
      type: "get",
      key: "value"
    }) : this.dep.track(), this._value;
  }
  set value(i) {
    const s = this._rawValue, c = this.__v_isShallow || Zr(i) || Rt(i);
    i = c ? i : he(i), St(i, s) && (this._rawValue = i, this._value = c ? i : sr(i), He.NODE_ENV !== "production" ? this.dep.trigger({
      target: this,
      type: "set",
      key: "value",
      newValue: i,
      oldValue: s
    }) : this.dep.trigger());
  }
}
function Qu() {
  const r = /* @__PURE__ */ new Set(), i = (l) => {
    r.delete(l);
  };
  return {
    on: (l) => (r.add(l), {
      off: () => i(l)
    }),
    off: i,
    trigger: (...l) => Promise.all(Array.from(r).map((m) => m(...l)))
  };
}
async function Xu(r) {
  try {
    return {
      data: await r,
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
(function(r, i) {
  (function(s, c) {
    r.exports = c();
  })(typeof self < "u" ? self : ku, function() {
    return function(s) {
      var c = {};
      function l(m) {
        if (c[m]) return c[m].exports;
        var P = c[m] = {
          i: m,
          l: !1,
          exports: {}
        };
        return s[m].call(P.exports, P, P.exports, l), P.l = !0, P.exports;
      }
      return l.m = s, l.c = c, l.d = function(m, P, T) {
        l.o(m, P) || Object.defineProperty(m, P, {
          enumerable: !0,
          get: T
        });
      }, l.r = function(m) {
        typeof Symbol < "u" && Symbol.toStringTag && Object.defineProperty(m, Symbol.toStringTag, {
          value: "Module"
        }), Object.defineProperty(m, "__esModule", {
          value: !0
        });
      }, l.t = function(m, P) {
        if (1 & P && (m = l(m)), 8 & P || 4 & P && typeof m == "object" && m && m.__esModule) return m;
        var T = /* @__PURE__ */ Object.create(null);
        if (l.r(T), Object.defineProperty(T, "default", {
          enumerable: !0,
          value: m
        }), 2 & P && typeof m != "string") for (var D in m) l.d(T, D, (function(W) {
          return m[W];
        }).bind(null, D));
        return T;
      }, l.n = function(m) {
        var P = m && m.__esModule ? function() {
          return m.default;
        } : function() {
          return m;
        };
        return l.d(P, "a", P), P;
      }, l.o = function(m, P) {
        return {}.hasOwnProperty.call(m, P);
      }, l.p = "", l(l.s = 0);
    }([function(s, c, l) {
      l.r(c), l.d(c, "PopupOpenError", function() {
        return Mn;
      }), l.d(c, "create", function() {
        return as;
      }), l.d(c, "destroy", function() {
        return ss;
      }), l.d(c, "destroyComponents", function() {
        return Di;
      }), l.d(c, "destroyAll", function() {
        return Ni;
      }), l.d(c, "PROP_TYPE", function() {
        return pe;
      }), l.d(c, "PROP_SERIALIZATION", function() {
        return dn;
      }), l.d(c, "CONTEXT", function() {
        return xe;
      }), l.d(c, "EVENT", function() {
        return Ee;
      });
      function m(e, t) {
        return (m = Object.setPrototypeOf || function(n, o) {
          return n.__proto__ = o, n;
        })(e, t);
      }
      function P(e, t) {
        e.prototype = Object.create(t.prototype), e.prototype.constructor = e, m(e, t);
      }
      function T() {
        return (T = Object.assign || function(e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
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
          var t = {}.toString;
          if (t) {
            var n = t.call(e);
            if (n === "[object Window]" || n === "[object global]" || n === "[object DOMWindow]") return !1;
          }
          if (typeof e.then == "function") return !0;
        } catch {
          return !1;
        }
        return !1;
      }
      var W = [], g = [], M = 0, _;
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
            var a, u, d = !1, h = !1, f = !1;
            Re();
            try {
              n(function(v) {
                f ? o.resolve(v) : (d = !0, a = v);
              }, function(v) {
                f ? o.reject(v) : (h = !0, u = v);
              });
            } catch (v) {
              Qe(), this.reject(v);
              return;
            }
            Qe(), f = !0, d ? this.resolve(a) : h && this.reject(u);
          }
        }
        var t = e.prototype;
        return t.resolve = function(n) {
          if (this.resolved || this.rejected) return this;
          if (D(n)) throw new Error("Can not resolve promise with another promise");
          return this.resolved = !0, this.value = n, this.dispatch(), this;
        }, t.reject = function(n) {
          var o = this;
          if (this.resolved || this.rejected) return this;
          if (D(n)) throw new Error("Can not reject promise with another promise");
          if (!n) {
            var a = n && typeof n.toString == "function" ? n.toString() : {}.toString.call(n);
            n = new Error("Expected reject to be called with Error, got " + a);
          }
          return this.rejected = !0, this.error = n, this.errorHandled || setTimeout(function() {
            o.errorHandled || function(u, d) {
              if (W.indexOf(u) === -1) {
                W.push(u), setTimeout(function() {
                  throw u;
                }, 1);
                for (var h = 0; h < g.length; h++) g[h](u, d);
              }
            }(n, o);
          }, 1), this.dispatch(), this;
        }, t.asyncReject = function(n) {
          return this.errorHandled = !0, this.reject(n), this;
        }, t.dispatch = function() {
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
              var h = a[d], f = h.onSuccess, v = h.onError, E = h.promise, w = void 0;
              if (n) try {
                w = f ? f(this.value) : this.value;
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
        }, t.then = function(n, o) {
          if (n && typeof n != "function" && !n.call) throw new Error("Promise.then expected a function for success handler");
          if (o && typeof o != "function" && !o.call) throw new Error("Promise.then expected a function for error handler");
          var a = new e();
          return this.handlers.push({
            promise: a,
            onSuccess: n,
            onError: o
          }), this.errorHandled = !0, this.dispatch(), a;
        }, t.catch = function(n) {
          return this.then(void 0, n);
        }, t.finally = function(n) {
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
        }, t.timeout = function(n, o) {
          var a = this;
          if (this.resolved || this.rejected) return this;
          var u = setTimeout(function() {
            a.resolved || a.rejected || a.reject(o || new Error("Promise timed out after " + n + "ms"));
          }, n);
          return this.then(function(d) {
            return clearTimeout(u), d;
          });
        }, t.toPromise = function() {
          if (typeof Promise > "u") throw new TypeError("Could not find Promise");
          return Promise.resolve(this);
        }, t.lazy = function() {
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
            var f = n[h];
            if (f instanceof e) {
              if (f.resolved) {
                u[h] = f.value, a -= 1;
                continue;
              }
            } else if (!D(f)) {
              u[h] = f, a -= 1;
              continue;
            }
            d(h, e.resolve(f), o);
          }
          return a === 0 && o.resolve(u), o;
        }, e.hash = function(n) {
          var o = {}, a = [], u = function(h) {
            if (n.hasOwnProperty(h)) {
              var f = n[h];
              D(f) ? a.push(f.then(function(v) {
                o[h] = v;
              })) : o[h] = f;
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
      function ur(e) {
        return {}.toString.call(e) === "[object RegExp]";
      }
      var Sr = {
        IFRAME: "iframe",
        POPUP: "popup"
      }, Er = `Call was rejected by callee.\r
`;
      function ve(e) {
        return e === void 0 && (e = window), e.location.protocol;
      }
      function nr(e) {
        if (e === void 0 && (e = window), e.mockDomain) {
          var t = e.mockDomain.split("//")[0];
          if (t) return t;
        }
        return ve(e);
      }
      function Cr(e) {
        return e === void 0 && (e = window), nr(e) === "about:";
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
      function ct(e) {
        try {
          return !0;
        } catch {
        }
        return !1;
      }
      function ne(e) {
        e === void 0 && (e = window);
        var t = e.location;
        if (!t) throw new Error("Can not read window location");
        var n = ve(e);
        if (!n) throw new Error("Can not read window protocol");
        if (n === "file:") return "file://";
        if (n === "about:") {
          var o = Je(e);
          return o && ct() ? ne(o) : "about://";
        }
        var a = t.host;
        if (!a) throw new Error("Can not read window host");
        return n + "//" + a;
      }
      function F(e) {
        e === void 0 && (e = window);
        var t = ne(e);
        return t && e.mockDomain && e.mockDomain.indexOf("mock:") === 0 ? e.mockDomain : t;
      }
      function U(e) {
        if (!function(t) {
          try {
            if (t === window) return !0;
          } catch {
          }
          try {
            var n = Object.getOwnPropertyDescriptor(t, "location");
            if (n && n.enumerable === !1) return !1;
          } catch {
          }
          try {
            if (Cr(t) && ct()) return !0;
          } catch {
          }
          try {
            if (function(o) {
              return o === void 0 && (o = window), nr(o) === "mock:";
            }(t) && ct()) return !0;
          } catch {
          }
          try {
            if (ne(t) === ne(window)) return !0;
          } catch {
          }
          return !1;
        }(e)) return !1;
        try {
          if (e === window || Cr(e) && ct() || F(window) === F(e)) return !0;
        } catch {
        }
        return !1;
      }
      function re(e) {
        if (!U(e)) throw new Error("Expected window to be same domain");
        return e;
      }
      function er(e, t) {
        if (!e || !t) return !1;
        var n = Je(t);
        return n ? n === e : function(o) {
          var a = [];
          try {
            for (; o.parent !== o; )
              a.push(o.parent), o = o.parent;
          } catch {
          }
          return a;
        }(t).indexOf(e) !== -1;
      }
      function Ke(e) {
        var t = [], n;
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
        if (o === 0) return t;
        if (o) {
          for (var a = 0; a < o; a++) {
            var u = void 0;
            try {
              u = n[a];
            } catch {
              continue;
            }
            t.push(u);
          }
          return t;
        }
        for (var d = 0; d < 100; d++) {
          var h = void 0;
          try {
            h = n[d];
          } catch {
            return t;
          }
          if (!h) return t;
          t.push(h);
        }
        return t;
      }
      function rr(e) {
        for (var t = [], n = 0, o = Ke(e); n < o.length; n++) {
          var a = o[n];
          t.push(a);
          for (var u = 0, d = rr(a); u < d.length; u++) t.push(d[u]);
        }
        return t;
      }
      function Se(e) {
        e === void 0 && (e = window);
        try {
          if (e.top) return e.top;
        } catch {
        }
        if (Je(e) === e) return e;
        try {
          if (er(window, e) && window.top) return window.top;
        } catch {
        }
        try {
          if (er(e, window) && window.top) return window.top;
        } catch {
        }
        for (var t = 0, n = rr(e); t < n.length; t++) {
          var o = n[t];
          try {
            if (o.top) return o.top;
          } catch {
          }
          if (Je(o) === o) return o;
        }
      }
      function Ye(e) {
        var t = Se(e);
        if (!t) throw new Error("Can not determine top window");
        var n = [].concat(rr(t), [t]);
        return n.indexOf(e) === -1 && (n = [].concat(n, [e], rr(e))), n;
      }
      var dt = [], Vt = [];
      function ge(e, t) {
        t === void 0 && (t = !0);
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
          return !a || a.message !== Er;
        }
        if (t && U(e)) try {
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
        }(dt, e);
        if (n !== -1) {
          var o = Vt[n];
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
      function Gt(e) {
        return (e = e || window).navigator.mockUserAgent || e.navigator.userAgent;
      }
      function Qr(e, t) {
        for (var n = Ke(e), o = 0; o < n.length; o++) {
          var a = n[o];
          try {
            if (U(a) && a.name === t && n.indexOf(a) !== -1) return a;
          } catch {
          }
        }
        try {
          if (n.indexOf(e.frames[t]) !== -1) return e.frames[t];
        } catch {
        }
        try {
          if (n.indexOf(e[t]) !== -1) return e[t];
        } catch {
        }
      }
      function Jt(e, t) {
        return e === Te(t);
      }
      function Xr(e) {
        return e === void 0 && (e = window), Te(e = e || window) || Je(e) || void 0;
      }
      function ft(e, t) {
        for (var n = 0; n < e.length; n++)
          for (var o = e[n], a = 0; a < t.length; a++) if (o === t[a]) return !0;
        return !1;
      }
      function Tn(e) {
        e === void 0 && (e = window);
        for (var t = 0, n = e; n; ) (n = Je(n)) && (t += 1);
        return t;
      }
      function Kt(e, t) {
        var n = Se(e) || e, o = Se(t) || t;
        try {
          if (n && o) return n === o;
        } catch {
        }
        var a = Ye(e), u = Ye(t);
        if (ft(a, u)) return !0;
        var d = Te(n), h = Te(o);
        return d && ft(Ye(d), u) || h && ft(Ye(h), a), !1;
      }
      function fr(e, t) {
        if (typeof e == "string") {
          if (typeof t == "string") return e === "*" || t === e;
          if (ur(t) || Array.isArray(t)) return !1;
        }
        return ur(e) ? ur(t) ? e.toString() === t.toString() : !Array.isArray(t) && !!t.match(e) : !!Array.isArray(e) && (Array.isArray(t) ? JSON.stringify(e) === JSON.stringify(t) : !ur(t) && e.some(function(n) {
          return fr(n, t);
        }));
      }
      function Ir(e) {
        return e.match(/^(https?|mock|file):\/\//) ? e.split("/").slice(0, 3).join("/") : F();
      }
      function Oo(e, t, n, o) {
        n === void 0 && (n = 1e3), o === void 0 && (o = 1 / 0);
        var a;
        return function u() {
          if (ge(e))
            return a && clearTimeout(a), t();
          o <= 0 ? clearTimeout(a) : (o -= n, a = setTimeout(u, n));
        }(), {
          cancel: function() {
            a && clearTimeout(a);
          }
        };
      }
      function kr(e) {
        try {
          if (e === window) return !0;
        } catch (t) {
          if (t && t.message === Er) return !0;
        }
        try {
          if ({}.toString.call(e) === "[object Window]") return !0;
        } catch (t) {
          if (t && t.message === Er) return !0;
        }
        try {
          if (window.Window && e instanceof window.Window) return !0;
        } catch (t) {
          if (t && t.message === Er) return !0;
        }
        try {
          if (e && e.self === e) return !0;
        } catch (t) {
          if (t && t.message === Er) return !0;
        }
        try {
          if (e && e.parent === e) return !0;
        } catch (t) {
          if (t && t.message === Er) return !0;
        }
        try {
          if (e && e.top === e) return !0;
        } catch (t) {
          if (t && t.message === Er) return !0;
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
        if (t = Ir(e), t.indexOf("mock:") !== 0) return e;
        var t;
        throw new Error("Mock urls not supported out of test mode");
      }
      function Ro(e) {
        if (U(e)) return re(e).frameElement;
        for (var t = 0, n = document.querySelectorAll("iframe"); t < n.length; t++) {
          var o = n[t];
          if (o && o.contentWindow && o.contentWindow === e) return o;
        }
      }
      function So(e) {
        if (function(n) {
          return n === void 0 && (n = window), !!Je(n);
        }(e)) {
          var t = Ro(e);
          if (t && t.parentElement) {
            t.parentElement.removeChild(t);
            return;
          }
        }
        try {
          e.close();
        } catch {
        }
      }
      function Yt(e, t) {
        for (var n = 0; n < e.length; n++) try {
          if (e[n] === t) return n;
        } catch {
        }
        return -1;
      }
      var Zt = function() {
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
        var t = e.prototype;
        return t._cleanupClosedWindows = function() {
          for (var n = this.weakmap, o = this.keys, a = 0; a < o.length; a++) {
            var u = o[a];
            if (kr(u) && ge(u)) {
              if (n) try {
                n.delete(u);
              } catch {
              }
              o.splice(a, 1), this.values.splice(a, 1), a -= 1;
            }
          }
        }, t.isSafeToReadWrite = function(n) {
          return !kr(n);
        }, t.set = function(n, o) {
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
          var h = this.keys, f = this.values, v = Yt(h, n);
          v === -1 ? (h.push(n), f.push(o)) : f[v] = o;
        }, t.get = function(n) {
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
          var u = Yt(this.keys, n);
          if (u !== -1) return this.values[u];
        }, t.delete = function(n) {
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
          var u = this.keys, d = Yt(u, n);
          d !== -1 && (u.splice(d, 1), this.values.splice(d, 1));
        }, t.has = function(n) {
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
          return this._cleanupClosedWindows(), Yt(this.keys, n) !== -1;
        }, t.getOrSet = function(n, o) {
          if (this.has(n)) return this.get(n);
          var a = o();
          return this.set(n, a), a;
        }, e;
      }();
      function xo(e) {
        return (xo = Object.setPrototypeOf ? Object.getPrototypeOf : function(t) {
          return t.__proto__ || Object.getPrototypeOf(t);
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
      function Do(e, t, n) {
        return (Do = Wa() ? Reflect.construct : function(o, a, u) {
          var d = [null];
          d.push.apply(d, a);
          var h = new (Function.bind.apply(o, d))();
          return u && m(h, u.prototype), h;
        }).apply(null, arguments);
      }
      function No(e) {
        var t = typeof Map == "function" ? /* @__PURE__ */ new Map() : void 0;
        return (No = function(n) {
          if (n === null || (o = n, Function.toString.call(o).indexOf("[native code]") === -1)) return n;
          var o;
          if (typeof n != "function") throw new TypeError("Super expression must either be null or a function");
          if (t !== void 0) {
            if (t.has(n)) return t.get(n);
            t.set(n, a);
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
        var t = !1;
        try {
          (e instanceof window.Element || e !== null && typeof e == "object" && e.nodeType === 1 && typeof e.style == "object" && typeof e.ownerDocument == "object") && (t = !0);
        } catch {
        }
        return t;
      }
      function Sn(e) {
        return e.name || e.__name__ || e.displayName || "anonymous";
      }
      function xn(e, t) {
        try {
          delete e.name, e.name = t;
        } catch {
        }
        return e.__name__ = e.displayName = t, e;
      }
      function Dn(e) {
        if (typeof btoa == "function") return btoa(encodeURIComponent(e).replace(/%([0-9A-F]{2})/g, function(t, n) {
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
      var Qt;
      function Nn(e) {
        try {
          return JSON.stringify([].slice.call(e), function(t, n) {
            return typeof n == "function" ? "memoize[" + function(o) {
              if (Qt = Qt || new Zt(), o == null || typeof o != "object" && typeof o != "function") throw new Error("Invalid object");
              var a = Qt.get(o);
              return a || (a = typeof o + ":" + Xe(), Qt.set(o, a)), a;
            }(n) + "]" : Rn(n) ? {} : n;
          });
        } catch {
          throw new Error("Arguments not serializable -- can not be used to memoize");
        }
      }
      function _a() {
        return {};
      }
      var xt = 0, Co = 0;
      function Lr(e, t) {
        t === void 0 && (t = {});
        var n = t.thisNamespace, o = n !== void 0 && n, a = t.time, u, d, h = xt;
        xt += 1;
        var f = function() {
          for (var v = arguments.length, E = new Array(v), w = 0; w < v; w++) E[w] = arguments[w];
          h < Co && (u = null, d = null, h = xt, xt += 1);
          var p;
          p = o ? (d = d || new Zt()).getOrSet(this, _a) : u = u || {};
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
        return f.reset = function() {
          u = null, d = null;
        }, xn(f, (t.name || Sn(e)) + "::memoized");
      }
      Lr.clear = function() {
        Co = xt;
      };
      function Ma(e) {
        var t = {};
        function n() {
          for (var o = arguments, a = this, u = arguments.length, d = new Array(u), h = 0; h < u; h++) d[h] = arguments[h];
          var f = Nn(d);
          return t.hasOwnProperty(f) || (t[f] = R.try(function() {
            return e.apply(a, o);
          }).finally(function() {
            delete t[f];
          })), t[f];
        }
        return n.reset = function() {
          t = {};
        }, xn(n, Sn(e) + "::promiseMemoized");
      }
      function ye() {
      }
      function Xt(e) {
        var t = !1;
        return xn(function() {
          if (!t)
            return t = !0, e.apply(this, arguments);
        }, Sn(e) + "::once");
      }
      function lt(e, t) {
        if (t === void 0 && (t = 1), t >= 3) return "stringifyError stack overflow";
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
          return "Error while stringifying error: " + lt(a, t + 1);
        }
      }
      function kt(e) {
        return typeof e == "string" ? e : e && e.toString && typeof e.toString == "function" ? e.toString() : {}.toString.call(e);
      }
      function ht(e, t) {
        if (!t) return e;
        if (Object.assign) return Object.assign(e, t);
        for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
        return e;
      }
      Lr(function(e) {
        if (Object.values) return Object.values(e);
        var t = [];
        for (var n in e) e.hasOwnProperty(n) && t.push(e[n]);
        return t;
      });
      function Fa(e) {
        return e;
      }
      function Dt(e, t) {
        var n;
        return function o() {
          n = setTimeout(function() {
            e(), o();
          }, t);
        }(), {
          cancel: function() {
            clearTimeout(n);
          }
        };
      }
      function Cn(e) {
        return e.replace(/-([a-z])/g, function(t) {
          return t[1].toUpperCase();
        });
      }
      function Io(e, t, n) {
        if (Array.isArray(e)) {
          if (typeof t != "number") throw new TypeError("Array key must be number");
        } else if (typeof e == "object" && e !== null && typeof t != "string") throw new TypeError("Object key must be string");
        Object.defineProperty(e, t, {
          configurable: !0,
          enumerable: !0,
          get: function() {
            delete e[t];
            var o = n();
            return e[t] = o, o;
          },
          set: function(o) {
            delete e[t], e[t] = o;
          }
        });
      }
      function In(e) {
        return [].slice.call(e);
      }
      function Ao(e) {
        return typeof (t = e) == "object" && t !== null && {}.toString.call(e) === "[object Object]";
        var t;
      }
      function An(e) {
        if (!Ao(e)) return !1;
        var t = e.constructor;
        if (typeof t != "function") return !1;
        var n = t.prototype;
        return !!Ao(n) && !!n.hasOwnProperty("isPrototypeOf");
      }
      function en(e, t, n) {
        if (n === void 0 && (n = ""), Array.isArray(e)) {
          for (var o = e.length, a = [], u = function(E) {
            Io(a, E, function() {
              var w = n ? n + "." + E : "" + E, p = t(e[E], E, w);
              return (An(p) || Array.isArray(p)) && (p = en(p, t, w)), p;
            });
          }, d = 0; d < o; d++) u(d);
          return a;
        }
        if (An(e)) {
          var h = {}, f = function(E) {
            if (!e.hasOwnProperty(E)) return 1;
            Io(h, E, function() {
              var w = n ? n + "." + E : "" + E, p = t(e[E], E, w);
              return (An(p) || Array.isArray(p)) && (p = en(p, t, w)), p;
            });
          };
          for (var v in e) f(v);
          return h;
        }
        throw new Error("Pass an object or array");
      }
      function jr(e) {
        return e != null;
      }
      function Wn(e) {
        return {}.toString.call(e) === "[object RegExp]";
      }
      function Nt(e, t, n) {
        if (e.hasOwnProperty(t)) return e[t];
        var o = n();
        return e[t] = o, o;
      }
      function rn(e) {
        var t = [], n = !1, o, a = {
          set: function(u, d) {
            return n || (e[u] = d, a.register(function() {
              delete e[u];
            })), d;
          },
          register: function(u) {
            var d = Xt(function() {
              return u(o);
            });
            return n ? u(o) : t.push(d), {
              cancel: function() {
                var h = t.indexOf(d);
                h !== -1 && t.splice(h, 1);
              }
            };
          },
          all: function(u) {
            o = u;
            var d = [];
            for (n = !0; t.length; ) {
              var h = t.shift();
              d.push(h());
            }
            return R.all(d).then(ye);
          }
        };
        return a;
      }
      function tn(e, t) {
        if (t == null) throw new Error("Expected " + e + " to be present");
        return t;
      }
      var za = function(e) {
        P(t, e);
        function t(n) {
          var o;
          return (o = e.call(this, n) || this).name = o.constructor.name, typeof Error.captureStackTrace == "function" ? Error.captureStackTrace(function(a) {
            if (a === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return a;
          }(o), o.constructor) : o.stack = new Error(n).stack, o;
        }
        return t;
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
      Lr(function() {
        return new R(function(e) {
          if (nn() || _o()) return e();
          var t = setInterval(function() {
            if (nn() || _o())
              return clearInterval(t), e();
          }, 10);
        });
      });
      function Fo(e) {
        return function(t, n, o) {
          o === void 0 && (o = []);
          var a = t.__inline_memoize_cache__ = t.__inline_memoize_cache__ || {}, u = Nn(o);
          return a.hasOwnProperty(u) ? a[u] : a[u] = (function() {
            var d = {};
            if (!e || e.indexOf("=") === -1) return d;
            for (var h = 0, f = e.split("&"); h < f.length; h++) {
              var v = f[h];
              (v = v.split("="))[0] && v[1] && (d[decodeURIComponent(v[0])] = decodeURIComponent(v[1]));
            }
            return d;
          }).apply(void 0, o);
        }(Fo, 0, [e]);
      }
      function zo(e, t) {
        return t === void 0 && (t = {}), t && Object.keys(t).length ? function(n) {
          return n === void 0 && (n = {}), Object.keys(n).filter(function(o) {
            return typeof n[o] == "string" || typeof n[o] == "boolean";
          }).map(function(o) {
            var a = n[o];
            if (typeof a != "string" && typeof a != "boolean") throw new TypeError("Invalid type for query");
            return Mo(o) + "=" + Mo(a.toString());
          }).join("&");
        }(T({}, Fo(e), t)) : e;
      }
      function La(e, t) {
        e.appendChild(t);
      }
      function _n(e, t) {
        return t === void 0 && (t = document), Rn(e) ? e : typeof e == "string" ? t.querySelector(e) : void 0;
      }
      function Lo(e) {
        return new R(function(t, n) {
          var o = kt(e), a = _n(e);
          if (a) return t(a);
          if (nn()) return n(new Error("Document is ready and element " + o + " does not exist"));
          var u = setInterval(function() {
            if (a = _n(e))
              t(a), clearInterval(u);
            else if (nn())
              return clearInterval(u), n(new Error("Document is ready and element " + o + " does not exist"));
          }, 10);
        });
      }
      var Mn = function(e) {
        P(t, e);
        function t() {
          return e.apply(this, arguments) || this;
        }
        return t;
      }(za), on;
      function jo(e) {
        if ((on = on || new Zt()).has(e)) {
          var t = on.get(e);
          if (t) return t;
        }
        var n = new R(function(o, a) {
          e.addEventListener("load", function() {
            (function(u) {
              if (function() {
                for (var d = 0; d < dt.length; d++) {
                  var h = !1;
                  try {
                    h = dt[d].closed;
                  } catch {
                  }
                  h && (Vt.splice(d, 1), dt.splice(d, 1));
                }
              }(), u && u.contentWindow) try {
                dt.push(u.contentWindow), Vt.push(u);
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
        return jo(e).then(function(t) {
          if (!t.contentWindow) throw new Error("Could not find window in iframe");
          return t.contentWindow;
        });
      }
      function Uo(e, t) {
        e === void 0 && (e = {});
        var n = e.style || {}, o = function(u, d, h) {
          u === void 0 && (u = "div"), d === void 0 && (d = {}), u = u.toLowerCase();
          var f = document.createElement(u);
          if (d.style && ht(f.style, d.style), d.class && (f.className = d.class.join(" ")), d.id && f.setAttribute("id", d.id), d.attributes) for (var v = 0, E = Object.keys(d.attributes); v < E.length; v++) {
            var w = E[v];
            f.setAttribute(w, d.attributes[w]);
          }
          if (d.styleSheet && function(p, y, b) {
            b === void 0 && (b = window.document), p.styleSheet ? p.styleSheet.cssText = y : p.appendChild(b.createTextNode(y));
          }(f, d.styleSheet), d.html) {
            if (u === "iframe") throw new Error("Iframe html can not be written unless container provided and iframe in DOM");
            f.innerHTML = d.html;
          }
          return f;
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
      function Bo(e, t, n) {
        return e.addEventListener(t, n), {
          cancel: function() {
            e.removeEventListener(t, n);
          }
        };
      }
      function ja(e) {
        e.style.setProperty("display", "");
      }
      function $o(e) {
        e.style.setProperty("display", "none", "important");
      }
      function Ct(e) {
        e && e.parentNode && e.parentNode.removeChild(e);
      }
      function pt(e) {
        return !(e && e.parentNode && e.ownerDocument && e.ownerDocument.documentElement && e.ownerDocument.documentElement.contains(e));
      }
      function qo(e, t, n) {
        var o = n === void 0 ? {} : n, a = o.width, u = a === void 0 || a, d = o.height, h = d === void 0 || d, f = o.interval, v = f === void 0 ? 100 : f, E = o.win, w = E === void 0 ? window : E, p = e.offsetWidth, y = e.offsetHeight, b = !1;
        t({
          width: p,
          height: y
        });
        var O = function() {
          if (!b && function(I) {
            return !!(I.offsetWidth || I.offsetHeight || I.getClientRects().length);
          }(e)) {
            var z = e.offsetWidth, V = e.offsetHeight;
            (u && z !== p || h && V !== y) && t({
              width: z,
              height: V
            }), p = z, y = V;
          }
        }, S, C;
        return w.addEventListener("resize", O), w.ResizeObserver !== void 0 ? ((S = new w.ResizeObserver(O)).observe(e), C = Dt(O, 10 * v)) : w.MutationObserver !== void 0 ? ((S = new w.MutationObserver(O)).observe(e, {
          attributes: !0,
          childList: !0,
          subtree: !0,
          characterData: !1
        }), C = Dt(O, 10 * v)) : C = Dt(O, v), {
          cancel: function() {
            b = !0, S.disconnect(), window.removeEventListener("resize", O), C.cancel();
          }
        };
      }
      function zn(e) {
        for (; e.parentNode; ) e = e.parentNode;
        return e.toString() === "[object ShadowRoot]";
      }
      var an = typeof document < "u" ? document.currentScript : null, Ua = Lr(function() {
        if (an || (an = function() {
          try {
            var e = function() {
              try {
                throw new Error("_");
              } catch (d) {
                return d.stack || "";
              }
            }(), t = /.*at [^(]*\((.*):(.+):(.+)\)$/gi.exec(e), n = t && t[1];
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
      Lr(function() {
        var e;
        try {
          e = Ua();
        } catch {
          return Ba;
        }
        var t = e.getAttribute("data-uid");
        if (t && typeof t == "string" || (t = e.getAttribute("data-uid-auto")) && typeof t == "string") return t;
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
          t = "uid_" + n.slice(n.length - 30);
        } else t = Xe();
        return e.setAttribute("data-uid-auto", t), t;
      });
      function Ho(e) {
        return typeof e == "string" && /^[0-9]+%$/.test(e);
      }
      function Ln(e) {
        if (typeof e == "number") return e;
        var t = e.match(/^([0-9]+)(px|%)$/);
        if (!t) throw new Error("Could not match css value from " + e);
        return parseInt(t[1], 10);
      }
      function Vo(e) {
        return Ln(e) + "px";
      }
      function Jo(e) {
        return typeof e == "number" ? Vo(e) : Ho(e) ? e : Vo(e);
      }
      function Ko(e, t) {
        if (typeof e == "number") return e;
        if (Ho(e)) return parseInt(t * Ln(e) / 100, 10);
        if (typeof (n = e) == "string" && /^[0-9]+px$/.test(n)) return Ln(e);
        var n;
        throw new Error("Can not normalize dimension: " + e);
      }
      function xr(e) {
        e === void 0 && (e = window);
        var t = "__post_robot_11_0_0__";
        return e !== window ? e[t] : e[t] = e[t] || {};
      }
      var Yo = function() {
        return {};
      };
      function de(e, t) {
        return e === void 0 && (e = "store"), t === void 0 && (t = Yo), Nt(xr(), e, function() {
          var n = t();
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
              return Nt(n, o, a);
            },
            reset: function() {
              n = t();
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
        var e = xr();
        return e.WINDOW_WILDCARD = e.WINDOW_WILDCARD || new $a(), e.WINDOW_WILDCARD;
      }
      function Ze(e, t) {
        return e === void 0 && (e = "store"), t === void 0 && (t = Yo), de("windowStore").getOrSet(e, function() {
          var n = new Zt(), o = function(a) {
            return n.getOrSet(a, t);
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
              return Nt(o(a), e, u);
            }
          };
        });
      }
      function Zo() {
        return de("instance").getOrSet("instanceID", Xe);
      }
      function Qo(e, t) {
        var n = t.domain, o = Ze("helloPromises"), a = o.get(e);
        a && a.resolve({
          domain: n
        });
        var u = R.resolve({
          domain: n
        });
        return o.set(e, u), u;
      }
      function jn(e, t) {
        return (0, t.send)(e, "postrobot_hello", {
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
      function Xo(e, t) {
        var n = t.send;
        return Ze("windowInstanceIDPromises").getOrSet(e, function() {
          return jn(e, {
            send: n
          }).then(function(o) {
            return o.instanceID;
          });
        });
      }
      function ko(e, t, n) {
        t === void 0 && (t = 5e3), n === void 0 && (n = "Window");
        var o = function(a) {
          return Ze("helloPromises").getOrSet(a, function() {
            return new R();
          });
        }(e);
        return t !== -1 && (o = o.timeout(t, new Error(n + " did not load after " + t + "ms"))), o;
      }
      function ei(e) {
        Ze("knownWindows").set(e, !0);
      }
      function Un(e) {
        return typeof e == "object" && e !== null && typeof e.__type__ == "string";
      }
      function ri(e) {
        return e === void 0 ? "undefined" : e === null ? "null" : Array.isArray(e) ? "array" : typeof e == "function" ? "function" : typeof e == "object" ? e instanceof Error ? "error" : typeof e.then == "function" ? "promise" : {}.toString.call(e) === "[object RegExp]" ? "regex" : {}.toString.call(e) === "[object Date]" ? "date" : "object" : typeof e == "string" ? "string" : typeof e == "number" ? "number" : typeof e == "boolean" ? "boolean" : void 0;
      }
      function et(e, t) {
        return {
          __type__: e,
          __val__: t
        };
      }
      var lr, qa = ((lr = {}).function = function() {
      }, lr.error = function(e) {
        return et("error", {
          message: e.message,
          stack: e.stack,
          code: e.code,
          data: e.data
        });
      }, lr.promise = function() {
      }, lr.regex = function(e) {
        return et("regex", e.source);
      }, lr.date = function(e) {
        return et("date", e.toJSON());
      }, lr.array = function(e) {
        return e;
      }, lr.object = function(e) {
        return e;
      }, lr.string = function(e) {
        return e;
      }, lr.number = function(e) {
        return e;
      }, lr.boolean = function(e) {
        return e;
      }, lr.null = function(e) {
        return e;
      }, lr[void 0] = function(e) {
        return et("undefined", e);
      }, lr), Ha = {}, hr, Va = ((hr = {}).function = function() {
        throw new Error("Function serialization is not implemented; nothing to deserialize");
      }, hr.error = function(e) {
        var t = e.stack, n = e.code, o = e.data, a = new Error(e.message);
        return a.code = n, o && (a.data = o), a.stack = t + `

` + a.stack, a;
      }, hr.promise = function() {
        throw new Error("Promise serialization is not implemented; nothing to deserialize");
      }, hr.regex = function(e) {
        return new RegExp(e);
      }, hr.date = function(e) {
        return new Date(e);
      }, hr.array = function(e) {
        return e;
      }, hr.object = function(e) {
        return e;
      }, hr.string = function(e) {
        return e;
      }, hr.number = function(e) {
        return e;
      }, hr.boolean = function(e) {
        return e;
      }, hr.null = function(e) {
        return e;
      }, hr[void 0] = function() {
      }, hr), Ga = {};
      function Bn() {
        return !!Gt(window).match(/MSIE|trident|edge\/12|edge\/13/i);
      }
      function ti(e) {
        return !Kt(window, e);
      }
      function ni(e, t) {
        if (e) {
          if (F() !== Ir(e)) return !0;
        } else if (t && !U(t)) return !0;
        return !1;
      }
      function oi(e) {
        var t = e.win, n = e.domain;
        return !(!Bn() || n && !ni(n, t) || t && !ti(t));
      }
      function $n(e) {
        return "__postrobot_bridge___" + (e = e || Ir(e)).replace(/[^a-zA-Z0-9]+/g, "_");
      }
      function ii() {
        return !!(window.name && window.name === $n(F()));
      }
      var Ja = new R(function(e) {
        if (window.document && window.document.body) return e(window.document.body);
        var t = setInterval(function() {
          if (window.document && window.document.body)
            return clearInterval(t), e(window.document.body);
        }, 10);
      });
      function ai(e) {
        Ze("remoteWindowPromises").getOrSet(e, function() {
          return new R();
        });
      }
      function qn(e) {
        var t = Ze("remoteWindowPromises").get(e);
        if (!t) throw new Error("Remote window promise not found");
        return t;
      }
      function si(e, t, n) {
        qn(e).resolve(function(o, a, u) {
          if (o !== e) throw new Error("Remote window does not match window");
          if (!fr(a, t)) throw new Error("Remote domain " + a + " does not match domain " + t);
          n.fireAndForget(u);
        });
      }
      function Hn(e, t) {
        qn(e).reject(t).catch(ye);
      }
      function un(e) {
        for (var t = e.win, n = e.name, o = e.domain, a = de("popupWindowsByName"), u = Ze("popupWindowsByWin"), d = 0, h = a.keys(); d < h.length; d++) {
          var f = h[d], v = a.get(f);
          v && !ge(v.win) || a.del(f);
        }
        if (ge(t)) return {
          win: t,
          name: n,
          domain: o
        };
        var E = u.getOrSet(t, function() {
          return n ? a.getOrSet(n, function() {
            return {
              win: t,
              name: n
            };
          }) : {
            win: t
          };
        });
        if (E.win && E.win !== t) throw new Error("Different window already linked for window: " + (n || "undefined"));
        return n && (E.name = n, a.set(n, E)), o && (E.domain = o, ai(t)), u.set(t, E), E;
      }
      function ui(e) {
        var t = e.on, n = e.send, o = e.receiveMessage;
        a = window.open, window.open = function(u, d, h, f) {
          var v = a.call(this, On(u), d, h, f);
          return v && (un({
            win: v,
            name: d,
            domain: u ? Ir(u) : null
          }), v);
        };
        var a;
        (function(u) {
          var d = u.on, h = u.send, f = u.receiveMessage, v = de("popupWindowsByName");
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
                sendMessage: function(C) {
                  if (window && !window.closed && S()) {
                    var z = S().domain;
                    if (z) try {
                      f({
                        data: C,
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
          on: t,
          send: n,
          receiveMessage: o
        }), function(u) {
          var d = u.send;
          xr(window).openTunnelToParent = function(h) {
            var f = h.name, v = h.source, E = h.canary, w = h.sendMessage, p = de("tunnelWindows"), y = Je(window);
            if (!y) throw new Error("No parent window found to open tunnel to");
            var b = function(O) {
              var S = O.name, C = O.source, z = O.canary, V = O.sendMessage;
              (function() {
                for (var q = de("tunnelWindows"), L = 0, Q = q.keys(); L < Q.length; L++) {
                  var $ = Q[L];
                  ge(q[$].source) && q.del($);
                }
              })();
              var I = Xe();
              return de("tunnelWindows").set(I, {
                name: S,
                source: C,
                canary: z,
                sendMessage: V
              }), I;
            }({
              name: f,
              source: v,
              canary: E,
              sendMessage: w
            });
            return d(y, "postrobot_open_tunnel", {
              name: f,
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
          var d = u.on, h = u.send, f = u.receiveMessage;
          R.try(function() {
            var v = Te(window);
            if (v && oi({
              win: v
            })) {
              return ai(v), (E = v, Ze("remoteBridgeAwaiters").getOrSet(E, function() {
                return R.try(function() {
                  var w = Qr(E, $n(F()));
                  if (w) return U(w) && xr(re(w)) ? w : new R(function(p) {
                    var y, b;
                    y = setInterval(function() {
                      if (w && U(w) && xr(re(w)))
                        return clearInterval(y), clearTimeout(b), p(w);
                    }, 100), b = setTimeout(function() {
                      return clearInterval(y), p();
                    }, 2e3);
                  });
                });
              })).then(function(w) {
                return w ? window.name ? xr(re(w)).openTunnelToParent({
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
                      f({
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
          on: t,
          send: n,
          receiveMessage: o
        });
      }
      function Vn() {
        for (var e = de("idToProxyWindow"), t = 0, n = e.keys(); t < n.length; t++) {
          var o = n[t];
          e.get(o).shouldClean() && e.del(o);
        }
      }
      function ci(e, t) {
        var n = t.send, o = t.id, a = o === void 0 ? Xe() : o, u = e.then(function(f) {
          if (U(f)) return re(f).name;
        }), d = e.then(function(f) {
          if (ge(f)) throw new Error("Window is closed, can not determine type");
          return Te(f) ? Sr.POPUP : Sr.IFRAME;
        });
        u.catch(ye), d.catch(ye);
        var h = function() {
          return e.then(function(f) {
            if (!ge(f)) return U(f) ? re(f).name : u;
          });
        };
        return {
          id: a,
          getType: function() {
            return d;
          },
          getInstanceID: Ma(function() {
            return e.then(function(f) {
              return Xo(f, {
                send: n
              });
            });
          }),
          close: function() {
            return e.then(So);
          },
          getName: h,
          focus: function() {
            return e.then(function(f) {
              f.focus();
            });
          },
          isClosed: function() {
            return e.then(function(f) {
              return ge(f);
            });
          },
          setLocation: function(f, v) {
            return v === void 0 && (v = {}), e.then(function(E) {
              var w = window.location.protocol + "//" + window.location.host, p = v.method, y = p === void 0 ? "get" : p, b = v.body;
              if (f.indexOf("/") === 0) f = "" + w + f;
              else if (!f.match(/^https?:\/\//) && f.indexOf(w) !== 0) throw new Error("Expected url to be http or https url, or absolute path, got " + JSON.stringify(f));
              if (y === "post") return h().then(function(O) {
                if (!O) throw new Error("Can not post to window without target name");
                (function(S) {
                  var C = S.url, z = S.target, V = S.body, I = S.method, q = I === void 0 ? "post" : I, L = document.createElement("form");
                  if (L.setAttribute("target", z), L.setAttribute("method", q), L.setAttribute("action", C), L.style.display = "none", V) for (var Q = 0, $ = Object.keys(V); Q < $.length; Q++) {
                    var ue, oe = $[Q], J = document.createElement("input");
                    J.setAttribute("name", oe), J.setAttribute("value", (ue = V[oe]) == null ? void 0 : ue.toString()), L.appendChild(J);
                  }
                  Wo().appendChild(L), L.submit(), Wo().removeChild(L);
                })({
                  url: f,
                  target: O,
                  method: y,
                  body: b
                });
              });
              if (y !== "get") throw new Error("Unsupported method: " + y);
              if (U(E)) try {
                if (E.location && typeof E.location.replace == "function") {
                  E.location.replace(f);
                  return;
                }
              } catch {
              }
              E.location = f;
            });
          },
          setName: function(f) {
            return e.then(function(v) {
              un({
                win: v,
                name: f
              });
              var E = U(v), w = Ro(v);
              if (!E) throw new Error("Can not set name for cross-domain window: " + f);
              re(v).name = f, w && w.setAttribute("name", f), u = R.resolve(f);
            });
          }
        };
      }
      var pr = function() {
        function e(n) {
          var o = n.send, a = n.win, u = n.serializedWindow;
          this.id = void 0, this.isProxyWindow = !0, this.serializedWindow = void 0, this.actualWindow = void 0, this.actualWindowPromise = void 0, this.send = void 0, this.name = void 0, this.actualWindowPromise = new R(), this.serializedWindow = u || ci(this.actualWindowPromise, {
            send: o
          }), de("idToProxyWindow").set(this.getID(), this), a && this.setWindow(a, {
            send: o
          });
        }
        var t = e.prototype;
        return t.getID = function() {
          return this.serializedWindow.id;
        }, t.getType = function() {
          return this.serializedWindow.getType();
        }, t.isPopup = function() {
          return this.getType().then(function(n) {
            return n === Sr.POPUP;
          });
        }, t.setLocation = function(n, o) {
          var a = this;
          return this.serializedWindow.setLocation(n, o).then(function() {
            return a;
          });
        }, t.getName = function() {
          return this.serializedWindow.getName();
        }, t.setName = function(n) {
          var o = this;
          return this.serializedWindow.setName(n).then(function() {
            return o;
          });
        }, t.close = function() {
          var n = this;
          return this.serializedWindow.close().then(function() {
            return n;
          });
        }, t.focus = function() {
          var n = this, o = this.isPopup(), a = this.getName(), u = R.hash({
            isPopup: o,
            name: a
          }).then(function(h) {
            var f = h.name;
            h.isPopup && f && window.open("", f, "noopener");
          }), d = this.serializedWindow.focus();
          return R.all([u, d]).then(function() {
            return n;
          });
        }, t.isClosed = function() {
          return this.serializedWindow.isClosed();
        }, t.getWindow = function() {
          return this.actualWindow;
        }, t.setWindow = function(n, o) {
          var a = o.send;
          this.actualWindow = n, this.actualWindowPromise.resolve(this.actualWindow), this.serializedWindow = ci(this.actualWindowPromise, {
            send: a,
            id: this.getID()
          }), Ze("winToProxyWindow").set(n, this);
        }, t.awaitWindow = function() {
          return this.actualWindowPromise;
        }, t.matchWindow = function(n, o) {
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
        }, t.unwrap = function() {
          return this.actualWindow || this;
        }, t.getInstanceID = function() {
          return this.serializedWindow.getInstanceID();
        }, t.shouldClean = function() {
          return !!(this.actualWindow && ge(this.actualWindow));
        }, t.serialize = function() {
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
          return !!(n && !kr(n) && n.isProxyWindow);
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
      function Gn(e, t, n, o, a) {
        var u = Ze("methodStore"), d = de("proxyWindowMethods");
        pr.isProxyWindow(o) ? d.set(e, {
          val: t,
          name: n,
          domain: a,
          source: o
        }) : (d.del(e), u.getOrSet(o, function() {
          return {};
        })[e] = {
          domain: a,
          name: n,
          val: t,
          source: o
        });
      }
      function di(e, t) {
        var n = Ze("methodStore"), o = de("proxyWindowMethods");
        return n.getOrSet(e, function() {
          return {};
        })[t] || o.get(t);
      }
      function fi(e, t, n, o, a) {
        d = (u = {
          on: a.on,
          send: a.send
        }).on, h = u.send, de("builtinListeners").getOrSet("functionCalls", function() {
          return d("postrobot_method", {
            domain: "*"
          }, function(E) {
            var w = E.source, p = E.origin, y = E.data, b = y.id, O = y.name, S = di(w, b);
            if (!S) throw new Error("Could not find method '" + O + "' with id: " + y.id + " in " + F(window));
            var C = S.source, z = S.domain, V = S.val;
            return R.try(function() {
              if (!fr(z, p)) throw new Error("Method '" + y.name + "' domain " + JSON.stringify(Wn(S.domain) ? S.domain.source : S.domain) + " does not match origin " + p + " in " + F(window));
              if (pr.isProxyWindow(C)) return C.matchWindow(w, {
                send: h
              }).then(function(I) {
                if (!I) throw new Error("Method call '" + y.name + "' failed - proxy window does not match source in " + F(window));
              });
            }).then(function() {
              return V.apply({
                source: w,
                origin: p
              }, y.args);
            }, function(I) {
              return R.try(function() {
                if (V.onError) return V.onError(I);
              }).then(function() {
                throw I.stack && (I.stack = "Remote call to " + O + "(" + function(q) {
                  return q === void 0 && (q = []), In(q).map(function(L) {
                    return typeof L == "string" ? "'" + L + "'" : L === void 0 ? "undefined" : L === null ? "null" : typeof L == "boolean" ? L.toString() : Array.isArray(L) ? "[ ... ]" : typeof L == "object" ? "{ ... }" : typeof L == "function" ? "() => { ... }" : "<" + typeof L + ">";
                  }).join(", ");
                }(y.args) + `) failed

` + I.stack), I;
              });
            }).then(function(I) {
              return {
                result: I,
                id: b,
                name: O
              };
            });
          });
        });
        var u, d, h, f = n.__id__ || Xe();
        e = pr.unwrap(e);
        var v = n.__name__ || n.name || o;
        return typeof v == "string" && typeof v.indexOf == "function" && v.indexOf("anonymous::") === 0 && (v = v.replace("anonymous::", o + "::")), pr.isProxyWindow(e) ? (Gn(f, n, v, e, t), e.awaitWindow().then(function(E) {
          Gn(f, n, v, E, t);
        })) : Gn(f, n, v, e, t), et("cross_domain_function", {
          id: f,
          name: v
        });
      }
      function li(e, t, n, o) {
        var a, u = o.on, d = o.send;
        return function(h, f) {
          f === void 0 && (f = Ha);
          var v = JSON.stringify(h, function(E) {
            var w = this[E];
            if (Un(this)) return w;
            var p = ri(w);
            if (!p) return w;
            var y = f[p] || qa[p];
            return y ? y(w, E) : w;
          });
          return v === void 0 ? "undefined" : v;
        }(n, ((a = {}).promise = function(h, f) {
          return function(v, E, w, p, y) {
            return et("cross_domain_zalgo_promise", {
              then: fi(v, E, function(b, O) {
                return w.then(b, O);
              }, p, {
                on: y.on,
                send: y.send
              })
            });
          }(e, t, h, f, {
            on: u,
            send: d
          });
        }, a.function = function(h, f) {
          return fi(e, t, h, f, {
            on: u,
            send: d
          });
        }, a.object = function(h) {
          return kr(h) || pr.isProxyWindow(h) ? et("cross_domain_window", pr.serialize(h, {
            send: d
          })) : h;
        }, a));
      }
      function hi(e, t, n, o) {
        var a, u = o.send;
        return function(d, h) {
          if (h === void 0 && (h = Ga), d !== "undefined") return JSON.parse(d, function(f, v) {
            if (Un(this)) return v;
            var E, w;
            if (Un(v) ? (E = v.__type__, w = v.__val__) : (E = ri(v), w = v), !E) return w;
            var p = h[E] || Va[E];
            return p ? p(w, f) : w;
          });
        }(n, ((a = {}).cross_domain_zalgo_promise = function(d) {
          return function(h, f, v) {
            return new R(v.then);
          }(0, 0, d);
        }, a.cross_domain_function = function(d) {
          return function(h, f, v, E) {
            var w = v.id, p = v.name, y = E.send, b = function(S) {
              S === void 0 && (S = {});
              function C() {
                var z = arguments;
                return pr.toProxyWindow(h, {
                  send: y
                }).awaitWindow().then(function(V) {
                  var I = di(V, w);
                  if (I && I.val !== C) return I.val.apply({
                    source: window,
                    origin: F()
                  }, z);
                  var q = [].slice.call(z);
                  return S.fireAndForget ? y(V, "postrobot_method", {
                    id: w,
                    name: p,
                    args: q
                  }, {
                    domain: f,
                    fireAndForget: !0
                  }) : y(V, "postrobot_method", {
                    id: w,
                    name: p,
                    args: q
                  }, {
                    domain: f,
                    fireAndForget: !1
                  }).then(function(L) {
                    return L.data.result;
                  });
                }).catch(function(V) {
                  throw V;
                });
              }
              return C.__name__ = p, C.__origin__ = f, C.__source__ = h, C.__id__ = w, C.origin = f, C;
            }, O = b();
            return O.fireAndForget = b({
              fireAndForget: !0
            }), O;
          }(e, t, d, {
            send: u
          });
        }, a.cross_domain_window = function(d) {
          return pr.deserialize(d, {
            send: u
          });
        }, a));
      }
      var It = {};
      It.postrobot_post_message = function(e, t, n) {
        n.indexOf("file:") === 0 && (n = "*"), e.postMessage(t, n);
      }, It.postrobot_bridge = function(e, t, n) {
        if (!Bn() && !ii()) throw new Error("Bridge not needed for browser");
        if (U(e)) throw new Error("Post message through bridge disabled between same domain windows");
        if (Kt(window, e) !== !1) throw new Error("Can only use bridge to communicate between two different windows, not between frames");
        (function(o, a, u) {
          var d = Jt(window, o), h = Jt(o, window);
          if (!d && !h) throw new Error("Can only send messages to and from parent and popup windows");
          qn(o).then(function(f) {
            return f(o, a, u);
          });
        })(e, n, t);
      }, It.postrobot_global = function(e, t) {
        if (!Gt(window).match(/MSIE|rv:11|trident|edge\/12|edge\/13/i)) throw new Error("Global messaging not needed for browser");
        if (!U(e)) throw new Error("Post message through global disabled between different domain windows");
        if (Kt(window, e) !== !1) throw new Error("Can only use global to communicate between two different windows, not between frames");
        var n = xr(e);
        if (!n) throw new Error("Can not find postRobot global on foreign window");
        n.receiveMessage({
          source: window,
          origin: F(),
          data: t
        });
      };
      function Jn(e, t, n, o) {
        var a = o.on, u = o.send;
        return R.try(function() {
          var d = Ze().getOrSet(e, function() {
            return {};
          });
          return d.buffer = d.buffer || [], d.buffer.push(n), d.flush = d.flush || R.flush().then(function() {
            if (ge(e)) throw new Error("Window is closed");
            var h = li(e, t, ((f = {}).__post_robot_11_0_0__ = d.buffer || [], f), {
              on: a,
              send: u
            }), f;
            delete d.buffer;
            for (var v = Object.keys(It), E = [], w = 0; w < v.length; w++) {
              var p = v[w];
              try {
                It[p](e, h, t);
              } catch (y) {
                E.push(y);
              }
            }
            if (E.length === v.length) throw new Error(`All post-robot messaging strategies failed:

` + E.map(function(y, b) {
              return b + ". " + lt(y);
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
        var t = e.name, n = e.win, o = e.domain, a = Ze("requestListeners");
        if (n === "*" && (n = null), o === "*" && (o = null), !t) throw new Error("Name required to get request listener");
        for (var u = 0, d = [n, sn()]; u < d.length; u++) {
          var h = d[u];
          if (h) {
            var f = a.get(h);
            if (f) {
              var v = f[t];
              if (v) {
                if (o && typeof o == "string") {
                  if (v[o]) return v[o];
                  if (v.__domain_regex__) for (var E = 0, w = v.__domain_regex__; E < w.length; E++) {
                    var p = w[E], y = p.listener;
                    if (fr(p.regex, o)) return y;
                  }
                }
                if (v["*"]) return v["*"];
              }
            }
          }
        }
      }
      function Kn(e, t) {
        var n = t.on, o = t.send, a = de("receivedMessages");
        try {
          if (!window || window.closed || !e.source) return;
        } catch {
          return;
        }
        var u = e.source, d = e.origin, h = function(w, p, y, b) {
          var O = b.on, S = b.send, C;
          try {
            C = hi(p, y, w, {
              on: O,
              send: S
            });
          } catch {
            return;
          }
          if (C && typeof C == "object" && C !== null) {
            var z = C.__post_robot_11_0_0__;
            if (Array.isArray(z)) return z;
          }
        }(e.data, u, d, {
          on: n,
          send: o
        });
        if (h) {
          ei(u);
          for (var f, v = function() {
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
                var S = O.on, C = O.send, z = mi({
                  name: b.name,
                  win: p,
                  domain: y
                }), V = b.name === "postrobot_method" && b.data && typeof b.data.name == "string" ? b.data.name + "()" : b.name;
                function I(q, L, Q) {
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
                        send: C
                      });
                    } catch ($) {
                      throw new Error("Send response message failed for " + V + " in " + F() + `

` + lt($));
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
                      send: C
                    });
                  } catch (q) {
                    throw new Error("Send ack message failed for " + V + " in " + F() + `

` + lt(q));
                  }
                }), R.try(function() {
                  if (!z) throw new Error("No handler found for post message: " + b.name + " from " + y + " in " + window.location.protocol + "//" + window.location.host + window.location.pathname);
                  return z.handler({
                    source: p,
                    origin: y,
                    data: b.data
                  });
                }).then(function(q) {
                  return I("success", q);
                }, function(q) {
                  return I("error", null, q);
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
                  if (!fr(O.domain, y)) throw new Error("Response origin " + y + " does not match domain " + (S = O.domain, Array.isArray(S) ? "(" + S.join(" | ") + ")" : ur(S) ? "RegExp(" + S.toString() + ")" : S.toString()));
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
                    if (!fr(O.domain, y)) throw new Error("Ack origin " + y + " does not match domain " + O.domain.toString());
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
          }, E = 0; E < h.length; E++) if (f = v()) return f.v;
        }
      }
      function Ar(e, t, n) {
        if (!e) throw new Error("Expected name");
        if (typeof (t = t || {}) == "function" && (n = t, t = {}), !n) throw new Error("Expected handler");
        var o = function a(u, d) {
          var h = u.name, f = u.win, v = u.domain, E = Ze("requestListeners");
          if (!h || typeof h != "string") throw new Error("Name required to add request listener");
          if (f && f !== "*" && pr.isProxyWindow(f)) {
            var w = f.awaitWindow().then(function(ue) {
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
          var p = f;
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
            for (var S = [], C = 0, z = v; C < z.length; C++) S.push(a({
              name: h,
              win: p,
              domain: z[C]
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
          var I = (v = v || "*").toString();
          if (V) throw p && v ? new Error("Request listener already exists for " + h + " on domain " + v.toString() + " for " + (p === sn() ? "wildcard" : "specified") + " window") : p ? new Error("Request listener already exists for " + h + " for " + (p === sn() ? "wildcard" : "specified") + " window") : v ? new Error("Request listener already exists for " + h + " on domain " + v.toString()) : new Error("Request listener already exists for " + h);
          var q = E.getOrSet(p, function() {
            return {};
          }), L = Nt(q, h, function() {
            return {};
          }), Q, $;
          return Wn(v) ? (Q = Nt(L, "__domain_regex__", function() {
            return [];
          })).push($ = {
            regex: v,
            listener: d
          }) : L[I] = d, {
            cancel: function() {
              delete L[I], $ && (Q.splice(Q.indexOf($, 1)), Q.length || delete L.__domain_regex__), Object.keys(L).length || delete q[h], p && !Object.keys(q).length && E.del(p);
            }
          };
        }({
          name: e,
          win: t.window,
          domain: t.domain || "*"
        }, {
          handler: n || t.handler,
          handleError: t.errorHandler || function(a) {
            throw a;
          }
        });
        return {
          cancel: function() {
            o.cancel();
          }
        };
      }
      var br = function e(t, n, o, a) {
        var u = (a = a || {}).domain || "*", d = a.timeout || -1, h = a.timeout || 5e3, f = a.fireAndForget || !1;
        return pr.toProxyWindow(t, {
          send: e
        }).awaitWindow().then(function(v) {
          return R.try(function() {
            if (function(E, w, p) {
              if (!E) throw new Error("Expected name");
              if (p && typeof p != "string" && !Array.isArray(p) && !Wn(p)) throw new TypeError("Can not send " + E + ". Expected domain " + JSON.stringify(p) + " to be a string, array, or regex");
              if (ge(w)) throw new Error("Can not send " + E + ". Target window is closed");
            }(n, v, u), function(E, w) {
              var p = Xr(w);
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
                  if (!fr(p, p)) throw new Error("Domain " + kt(p) + " does not match " + kt(p));
                  return S;
                });
              });
            }(v, u, (E === void 0 ? {} : E).domain, {
              send: e
            });
          }).then(function(E) {
            var w = E, p = n === "postrobot_method" && o && typeof o.name == "string" ? o.name + "()" : n, y = new R(), b = n + "_" + Xe();
            if (!f) {
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
              var C = function(L) {
                return Ze("knownWindows").get(L, !1);
              }(v) ? 1e4 : 2e3, z = d, V = C, I = z, q = Dt(function() {
                return ge(v) ? y.reject(new Error("Window closed for " + n + " before " + (O.ack ? "response" : "ack"))) : O.cancelled ? y.reject(new Error("Response listener was cancelled for " + n)) : (V = Math.max(V - 500, 0), I !== -1 && (I = Math.max(I - 500, 0)), O.ack || V !== 0 ? I === 0 ? y.reject(new Error("No response for postMessage " + p + " in " + F() + " in " + z + "ms")) : void 0 : y.reject(new Error("No ack for postMessage " + p + " in " + F() + " in " + C + "ms")));
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
              fireAndForget: f
            }, {
              on: Ar,
              send: e
            }).then(function() {
              return f ? y.resolve() : y;
            }, function(L) {
              throw new Error("Send request message failed for " + p + " in " + F() + `

` + lt(L));
            });
          });
        });
      };
      function At(e) {
        return pr.toProxyWindow(e, {
          send: br
        });
      }
      function gi(e) {
        for (var t = 0, n = Ze("requestPromises").get(e, []); t < n.length; t++) n[t].reject(new Error("Window " + (ge(e) ? "closed" : "cleaned up") + " before response")).catch(ye);
      }
      var Ur;
      Ur = {
        setupBridge: ui,
        openBridge: function(e, t) {
          var n = de("bridges"), o = de("bridgeFrames");
          return t = t || Ir(e), n.getOrSet(t, function() {
            return R.try(function() {
              if (F() === t) throw new Error("Can not open bridge on the same domain as current domain: " + t);
              var a = $n(t);
              if (Qr(window, a)) throw new Error("Frame with name " + a + " already exists on page");
              var u = function(d, h) {
                var f = document.createElement("iframe");
                return f.setAttribute("name", d), f.setAttribute("id", d), f.setAttribute("style", "display: none; margin: 0; padding: 0; border: 0px none; overflow: hidden;"), f.setAttribute("frameborder", "0"), f.setAttribute("border", "0"), f.setAttribute("scrolling", "no"), f.setAttribute("allowTransparency", "true"), f.setAttribute("tabindex", "-1"), f.setAttribute("hidden", "true"), f.setAttribute("title", ""), f.setAttribute("role", "presentation"), f.src = h, f;
              }(a, e);
              return o.set(t, u), Ja.then(function(d) {
                d.appendChild(u);
                var h = u.contentWindow;
                return new R(function(f, v) {
                  u.addEventListener("load", f), u.addEventListener("error", v);
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
        linkUrl: function(e, t) {
          un({
            win: e,
            domain: Ir(t)
          });
        },
        isBridge: ii,
        needsBridge: oi,
        needsBridgeForBrowser: Bn,
        hasBridge: function(e, t) {
          return de("bridges").has(t || Ir(e));
        },
        needsBridgeForWin: ti,
        needsBridgeForDomain: ni,
        destroyBridges: function() {
          for (var e = de("bridges"), t = de("bridgeFrames"), n = 0, o = t.keys(); n < o.length; n++) {
            var a = t.get(o[n]);
            a && a.parentNode && a.parentNode.removeChild(a);
          }
          t.reset(), e.reset();
        }
      };
      function Wt(e) {
        if (!U(e)) throw new Error("Can not get global for window on different domain");
        return e.__zoid_10_3_3__ || (e.__zoid_10_3_3__ = {}), e.__zoid_10_3_3__;
      }
      function yi(e, t) {
        try {
          return t(Wt(e));
        } catch {
        }
      }
      function cn(e) {
        return {
          get: function() {
            var t = this;
            return R.try(function() {
              if (t.source && t.source !== window) throw new Error("Can not call get on proxy object from a remote window");
              return e;
            });
          }
        };
      }
      function Ka(e) {
        return Dn(JSON.stringify(e));
      }
      function Yn(e) {
        var t = Wt(e);
        return t.references = t.references || {}, t.references;
      }
      function Ei(e) {
        var t = e.data, n = e.metaData, o = e.sender, a = e.receiver, u = e.passByReference, d = u !== void 0 && u, h = e.basic, f = h !== void 0 && h, v = At(a.win), E = f ? JSON.stringify(t) : li(v, a.domain, t, {
          on: Ar,
          send: br
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
        var t = e.sender, n = e.basic, o = n !== void 0 && n, a = function(E) {
          return JSON.parse(function(w) {
            if (typeof atob == "function") return decodeURIComponent([].map.call(atob(w), function(p) {
              return "%" + ("00" + p.charCodeAt(0).toString(16)).slice(-2);
            }).join(""));
            if (typeof Buffer < "u") return Buffer.from(w, "base64").toString("utf8");
            throw new Error("Can not find window.atob or Buffer");
          }(E));
        }(e.data), u = a.reference, d = a.metaData, h;
        h = typeof t.win == "function" ? t.win({
          metaData: d
        }) : t.win;
        var f;
        f = typeof t.domain == "function" ? t.domain({
          metaData: d
        }) : typeof t.domain == "string" ? t.domain : a.sender.domain;
        var v = function(E, w) {
          if (w.type === "raw") return w.val;
          if (w.type === "uid") return Yn(E)[w.uid];
          throw new Error("Unsupported ref type: " + w.type);
        }(h, u);
        return {
          data: o ? JSON.parse(v) : function(E, w, p) {
            return hi(E, w, p, {
              on: Ar,
              send: br
            });
          }(h, f, v),
          metaData: d,
          sender: {
            win: h,
            domain: f
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
      }, xe = Sr, Ee = {
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
        var t = e.split("__"), n = t[1], o = t[2], a = t[3];
        if (n !== "zoid") throw new Error("Window not rendered by zoid - got " + n);
        if (!o) throw new Error("Expected component name");
        if (!a) throw new Error("Expected serialized payload ref");
        return {
          name: o,
          serializedInitialPayload: a
        };
      }
      var Ya = Lr(function(e) {
        var t = bi({
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
                      O = Je(O);
                    }
                    return O;
                  }(w, Tn(w) - p);
                }(window, o.distance));
                if (o.type === "global" && o.uid && typeof o.uid == "string") {
                  var a = o.uid, u = Xr(window);
                  if (!u) throw new Error("Can not find ancestor window");
                  for (var d = 0, h = Ye(u); d < h.length; d++) {
                    var f = h[d];
                    if (U(f)) {
                      var v = yi(f, function(w) {
                        return w.windows && w.windows[a];
                      });
                      if (v) return v;
                    }
                  }
                } else if (o.type === "name") {
                  var E = o.name;
                  return tn("namedWindow", function(w, p) {
                    return Qr(w, p) || function y(b, O) {
                      var S = Qr(b, O);
                      if (S) return S;
                      for (var C = 0, z = Ke(b); C < z.length; C++) {
                        var V = y(z[C], O);
                        if (V) return V;
                      }
                    }(Se(w) || w, p);
                  }(tn("ancestor", Xr(window)), E));
                }
                throw new Error("Unable to find " + o.type + " parent component window");
              }(n.metaData.windowRef);
            }
          }
        });
        return {
          parent: t.sender,
          payload: t.data,
          reference: t.reference
        };
      });
      function Ti() {
        return Ya(window.name);
      }
      function Za(e, t) {
        if (t === void 0 && (t = window), e === Je(t)) return {
          type: "parent",
          distance: Tn(e)
        };
        if (e === Te(t)) return {
          type: "opener"
        };
        if (U(e) && (o = e, o !== Se(o))) {
          var n = re(e).name;
          if (n) return {
            type: "name",
            name: n
          };
        }
        var o;
      }
      function Oi(e, t, n, o, a) {
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
      var Wr = function() {
        return ye;
      }, rt = function(e) {
        return Xt(e.value);
      };
      function Qn(e, t, n) {
        for (var o = 0, a = Object.keys(T({}, e, t)); o < a.length; o++) {
          var u = a[o];
          n(u, t[u], e[u]);
        }
      }
      function Si(e, t, n) {
        var o = {};
        return R.all(function(a, u, d) {
          var h = [];
          return Qn(a, u, function(f, v, E) {
            var w = function(p, y, b) {
              return R.resolve().then(function() {
                var O, S;
                if (b != null && y) {
                  var C = (O = {}, O.get = y.queryParam, O.post = y.bodyParam, O)[n], z = (S = {}, S.get = y.queryValue, S.post = y.bodyValue, S)[n];
                  if (C) return R.hash({
                    finalParam: R.try(function() {
                      return typeof C == "function" ? C({
                        value: b
                      }) : typeof C == "string" ? C : p;
                    }),
                    finalValue: R.try(function() {
                      return typeof z == "function" && jr(b) ? z({
                        value: b
                      }) : b;
                    })
                  }).then(function(V) {
                    var I = V.finalParam, q = V.finalValue, L;
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
                    o[I] = L;
                  });
                }
              });
            }(f, v, E);
            h.push(w);
          }), h;
        }(t, e)).then(function() {
          return o;
        });
      }
      function xi(e) {
        var t = e.uid, n = e.options, o = e.overrides, a = o === void 0 ? {} : o, u = e.parentWin, d = u === void 0 ? window : u, h = n.propsDef, f = n.containerTemplate, v = n.prerenderTemplate, E = n.tag, w = n.name, p = n.attributes, y = n.dimensions, b = n.autoResize, O = n.url, S = n.domain, C = n.exports, z = new R(), V = [], I = rn(), q = {}, L = {}, Q = {
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
        }), ue, oe, J, H = a.props ? a.props : {}, se, X, De, Dr, vr, Br = !1, $r = a.onError, _r = a.getProxyContainer, qr = a.show, Hr = a.hide, tt = a.close, Vr = a.renderContainer, Pr = a.getProxyWindow, nt = a.setProxyWin, Gr = a.openFrame, Jr = a.openPrerenderFrame, ot = a.prerender, it = a.open, ie = a.openPrerender, wr = a.watchForUnload, ae = a.getInternalState, ze = a.setInternalState, Ne = function() {
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
                return me || fr(je, x);
              }, !1) : fr(x, F(window));
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
        }, mr = function() {
          return Pr ? Pr() : R.try(function() {
            var x = H.window;
            if (x) {
              var N = At(x);
              return I.register(function() {
                return x.close();
              }), N;
            }
            return new pr({
              send: br
            });
          });
        }, or = function(x) {
          return nt ? nt(x) : R.try(function() {
            se = x;
          });
        }, Tr = function() {
          return qr ? qr() : R.hash({
            setState: Me({
              visible: !0
            }),
            showElement: X ? X.get().then(ja) : null
          }).then(ye);
        }, Mr = function() {
          return Hr ? Hr() : R.hash({
            setState: Me({
              visible: !1
            }),
            showElement: X ? X.get().then($o) : null
          }).then(ye);
        }, vt = function() {
          return typeof O == "function" ? O({
            props: H
          }) : O;
        }, wt = function() {
          return typeof p == "function" ? p({
            props: H
          }) : p;
        }, at = function() {
          return Ir(vt());
        }, ir = function(x, N) {
          var B = N.windowName;
          return Gr ? Gr(x, {
            windowName: B
          }) : R.try(function() {
            if (x === xe.IFRAME) return cn(Uo({
              attributes: T({
                name: B,
                title: w
              }, wt().iframe)
            }));
          });
        }, _t = function(x) {
          return Jr ? Jr(x) : R.try(function() {
            if (x === xe.IFRAME) return cn(Uo({
              attributes: T({
                name: "__zoid_prerender_frame__" + w + "_" + Xe() + "__",
                title: "prerender__" + w
              }, wt().iframe)
            }));
          });
        }, Mt = function(x, N, B) {
          return ie ? ie(x, N, B) : R.try(function() {
            if (x === xe.IFRAME) {
              if (!B) throw new Error("Expected proxy frame to be passed");
              return B.get().then(function(j) {
                return I.register(function() {
                  return Ct(j);
                }), Fn(j).then(function(ee) {
                  return re(ee);
                }).then(function(ee) {
                  return At(ee);
                });
              });
            }
            if (x === xe.POPUP) return N;
            throw new Error("No render context available for " + x);
          });
        }, mt = function() {
          return R.try(function() {
            if (se) return R.all([$.trigger(Ee.FOCUS), se.focus()]).then(ye);
          });
        }, fn = function() {
          var x = Wt(window);
          return x.windows = x.windows || {}, x.windows[t] = window, I.register(function() {
            delete x.windows[t];
          }), t;
        }, Ft = function(x, N, B, j) {
          if (N === F(window)) return {
            type: "global",
            uid: fn()
          };
          if (x !== window) throw new Error("Can not construct cross-domain window reference for different target window");
          if (H.window) {
            var ee = j.getWindow();
            if (!ee) throw new Error("Can not construct cross-domain window reference for lazy window prop");
            if (Xr(ee) !== window) throw new Error("Can not construct cross-domain window reference for window prop with different ancestor");
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
            Dr = x, De = N, (B = se) == null || B.isPopup().then(function(j) {
              if ((N == null ? void 0 : N.name) !== "" && j) {
                var ee;
                (ee = se) == null || ee.setName(N == null ? void 0 : N.name);
              }
            }).finally(function() {
              Le(), I.register(function() {
                return N.close.fireAndForget().catch(ye);
              });
            });
          });
        }, zt = function(x) {
          var N = x.width, B = x.height;
          return R.try(function() {
            $.trigger(Ee.RESIZE, {
              width: N,
              height: B
            });
          });
        }, Lt = function(x) {
          return R.try(function() {
            return $.trigger(Ee.DESTROY);
          }).catch(ye).then(function() {
            return I.all(x);
          }).then(function() {
            var N = x || new Error("Component destroyed");
            vr && pt(vr) || N.message === "Window navigated away" ? z.resolve() : z.asyncReject(N);
          });
        }, Fr = Lr(function(x) {
          return R.try(function() {
            return tt ? ge(tt.__source__) ? void 0 : tt() : R.try(function() {
              return $.trigger(Ee.CLOSE);
            }).then(function() {
              return Lt(x || new Error("Component closed"));
            });
          });
        }), Ci = function(x, N) {
          var B = N.proxyWin, j = N.proxyFrame, ee = N.windowName;
          return it ? it(x, {
            proxyWin: B,
            proxyFrame: j,
            windowName: ee
          }) : R.try(function() {
            if (x === xe.IFRAME) {
              if (!j) throw new Error("Expected proxy frame to be passed");
              return j.get().then(function(Ce) {
                return Fn(Ce).then(function(fe) {
                  return I.register(function() {
                    return Ct(Ce);
                  }), I.register(function() {
                    return gi(fe);
                  }), fe;
                });
              });
            }
            if (x === xe.POPUP) {
              var K = Ne(), we = K.width, me = we === void 0 ? "300px" : we, je = K.height, be = je === void 0 ? "150px" : je;
              me = Ko(me, window.outerWidth), be = Ko(be, window.outerWidth);
              var Fe = function(Ce, fe) {
                var Ie = (fe = fe || {}).closeOnUnload, Pe = Ie === void 0 ? 1 : Ie, ar = fe.name, Ue = ar === void 0 ? "" : ar, ce = fe.width, Be = fe.height, tr = 0, Ve = 0;
                ce && (window.outerWidth ? Ve = Math.round((window.outerWidth - ce) / 2) + window.screenX : window.screen.width && (Ve = Math.round((window.screen.width - ce) / 2))), Be && (window.outerHeight ? tr = Math.round((window.outerHeight - Be) / 2) + window.screenY : window.screen.height && (tr = Math.round((window.screen.height - Be) / 2))), delete fe.closeOnUnload, delete fe.name, ce && Be && (fe = T({
                  top: tr,
                  left: Ve,
                  width: ce,
                  height: Be,
                  status: 1,
                  toolbar: 0,
                  menubar: 0,
                  resizable: 1,
                  scrollbars: 1
                }, fe));
                var st = Object.keys(fe).map(function(Nr) {
                  if (fe[Nr] != null) return Nr + "=" + kt(fe[Nr]);
                }).filter(Boolean).join(","), gr;
                try {
                  gr = window.open("", Ue, st);
                } catch (Nr) {
                  throw new Mn("Can not open popup window - " + (Nr.stack || Nr.message));
                }
                if (ge(gr))
                  throw new Mn("Can not open popup window - blocked");
                return Pe && window.addEventListener("unload", function() {
                  return gr.close();
                }), gr;
              }(0, T({
                name: ee,
                width: me,
                height: be
              }, wt().popup));
              return I.register(function() {
                return So(Fe);
              }), I.register(function() {
                return gi(Fe);
              }), Fe;
            }
            throw new Error("No render context available for " + x);
          }).then(function(K) {
            return B.setWindow(K, {
              send: br
            }), B.setName(ee).then(function() {
              return B;
            });
          });
        }, Ii = function() {
          return R.try(function() {
            var x = Bo(window, "unload", Xt(function() {
              Lt(new Error("Window navigated away"));
            })), N = Oo(d, Lt, 3e3);
            if (I.register(N.cancel), I.register(x.cancel), wr) return wr();
          });
        }, Ai = function(x) {
          var N = !1;
          return x.isClosed().then(function(B) {
            return B ? (N = !0, Fr(new Error("Detected component window close"))) : R.delay(200).then(function() {
              return x.isClosed();
            }).then(function(j) {
              if (j)
                return N = !0, Fr(new Error("Detected component window close"));
            });
          }).then(function() {
            return N;
          });
        }, jt = function(x) {
          return $r ? $r(x) : R.try(function() {
            if (V.indexOf(x) === -1)
              return V.push(x), z.asyncReject(x), $.trigger(Ee.ERROR, x);
          });
        }, Wi = new R(), _i = function(x) {
          return R.try(function() {
            Wi.resolve(x);
          });
        };
        ln.onError = jt;
        var Mi = function(x, N) {
          return x({
            uid: t,
            container: N.container,
            context: N.context,
            doc: N.doc,
            frame: N.frame,
            prerenderFrame: N.prerenderFrame,
            focus: mt,
            close: Fr,
            state: q,
            props: H,
            tag: E,
            dimensions: Ne(),
            event: $
          });
        }, Fi = function(x, N) {
          var B = N.context;
          return ot ? ot(x, {
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
                var ee = (j = re(j)).document, K = Mi(v, {
                  context: B,
                  doc: ee
                });
                if (K) {
                  if (K.ownerDocument !== ee) throw new Error("Expected prerender template to have been created with document from child window");
                  (function(Ie, Pe) {
                    var ar = Pe.tagName.toLowerCase();
                    if (ar !== "html") throw new Error("Expected element to be html, got " + ar);
                    for (var Ue = Ie.document.documentElement, ce = 0, Be = In(Ue.children); ce < Be.length; ce++) Ue.removeChild(Be[ce]);
                    for (var tr = 0, Ve = In(Pe.children); tr < Ve.length; tr++) Ue.appendChild(Ve[tr]);
                  })(j, K);
                  var we = b.width, me = we !== void 0 && we, je = b.height, be = je !== void 0 && je, Fe = b.element, Ce = Fe === void 0 ? "body" : Fe;
                  if ((Ce = _n(Ce, ee)) && (me || be)) {
                    var fe = qo(Ce, function(Ie) {
                      zt({
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
          return Vr ? Vr(x, {
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
            var me = we.container, je = we.internalState.visible, be = Mi(f, {
              context: ee,
              container: me,
              frame: we.frame,
              prerenderFrame: we.prerenderFrame,
              doc: document
            });
            if (be) {
              je || $o(be), La(me, be);
              var Fe = function(Ce, fe) {
                fe = Xt(fe);
                var Ie = !1, Pe = [], ar, Ue, ce, Be = function() {
                  Ie = !0;
                  for (var gr = 0; gr < Pe.length; gr++) Pe[gr].disconnect();
                  ar && ar.cancel(), ce && ce.removeEventListener("unload", tr), Ue && Ct(Ue);
                }, tr = function() {
                  Ie || (fe(), Be());
                };
                if (pt(Ce))
                  return tr(), {
                    cancel: Be
                  };
                if (window.MutationObserver)
                  for (var Ve = Ce.parentElement; Ve; ) {
                    var st = new window.MutationObserver(function() {
                      pt(Ce) && tr();
                    });
                    st.observe(Ve, {
                      childList: !0
                    }), Pe.push(st), Ve = Ve.parentElement;
                  }
                return (Ue = document.createElement("iframe")).setAttribute("name", "__detect_close_" + Xe() + "__"), Ue.style.display = "none", Fn(Ue).then(function(gr) {
                  (ce = re(gr)).addEventListener("unload", tr);
                }), Ce.appendChild(Ue), ar = Dt(function() {
                  pt(Ce) && tr();
                }, 1e3), {
                  cancel: Be
                };
              }(be, function() {
                var Ce = new Error("Detected container element removed from DOM");
                return R.delay(1).then(function() {
                  if (!pt(be))
                    return I.all(Ce), K().then(Le, Oe);
                  Fr(Ce);
                });
              });
              return I.register(function() {
                return Fe.cancel();
              }), I.register(function() {
                return Ct(be);
              }), X = cn(be);
            }
          });
        }, Li = function() {
          return {
            state: q,
            event: $,
            close: Fr,
            focus: mt,
            resize: zt,
            onError: jt,
            updateProps: us,
            show: Tr,
            hide: Mr
          };
        }, eo = function(x) {
          x === void 0 && (x = {});
          var N = vr, B = Li();
          ht(L, x), function(j, ee, K, we, me) {
            var je = we.state, be = we.close, Fe = we.focus, Ce = we.event, fe = we.onError;
            Qn(K, j, function(Ie, Pe, ar) {
              var Ue = !1, ce = ar;
              Object.defineProperty(ee, Ie, {
                configurable: !0,
                enumerable: !0,
                get: function() {
                  return Ue ? ce : (Ue = !0, function() {
                    if (!Pe) return ce;
                    var Be = Pe.alias;
                    if (Be && !jr(ar) && jr(K[Be]) && (ce = K[Be]), Pe.value && (ce = Pe.value({
                      props: ee,
                      state: je,
                      close: be,
                      focus: Fe,
                      event: Ce,
                      onError: fe,
                      container: me
                    })), !Pe.default || jr(ce) || jr(K[Ie]) || (ce = Pe.default({
                      props: ee,
                      state: je,
                      close: be,
                      focus: Fe,
                      event: Ce,
                      onError: fe,
                      container: me
                    })), jr(ce)) {
                      if (Pe.type === pe.ARRAY ? !Array.isArray(ce) : typeof ce !== Pe.type) throw new TypeError("Prop is not of type " + Pe.type + ": " + Ie);
                    } else if (Pe.required !== !1 && !jr(K[Ie])) throw new Error('Expected prop "' + Ie + '" to be defined');
                    return jr(ce) && Pe.decorate && (ce = Pe.decorate({
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
            if (N && B && Dr) return ke(Dr).then(function(j) {
              return N.updateProps(j).catch(function(ee) {
                return Ai(B).then(function(K) {
                  if (!K) throw ee;
                });
              });
            });
          });
        }, ji = function(x) {
          return _r ? _r(x) : R.try(function() {
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
            }(N)), vr = N, cn(N);
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
              }), I.register($.reset);
            })();
          },
          render: function(x) {
            var N = x.target, B = x.container, j = x.context, ee = x.rerender;
            return R.try(function() {
              var K = at(), we = S || at();
              (function(G, $e, Ae) {
                if (G !== window) {
                  if (!Kt(window, G)) throw new Error("Can only renderTo an adjacent frame");
                  var qe = F();
                  if (!fr($e, qe) && !U(G)) throw new Error("Can not render remotely to " + $e.toString() + " - can only render to " + qe);
                  if (Ae && typeof Ae != "string") throw new Error("Container passed to renderTo must be a string selector, got " + typeof Ae + " }");
                }
              })(N, we, B);
              var me = R.try(function() {
                if (N !== window) return function(G, $e) {
                  for (var Ae = {}, qe = 0, cr = Object.keys(H); qe < cr.length; qe++) {
                    var We = cr[qe], yr = h[We];
                    yr && yr.allowDelegate && (Ae[We] = H[We]);
                  }
                  var Ge = br($e, "zoid_delegate_" + w, {
                    uid: t,
                    overrides: {
                      props: Ae,
                      event: $,
                      close: Fr,
                      onError: jt,
                      getInternalState: _e,
                      setInternalState: Me,
                      resolveInitPromise: Le,
                      rejectInitPromise: Oe
                    }
                  }).then(function(Y) {
                    var Z = Y.data.parent;
                    return I.register(function(A) {
                      if (!ge($e)) return Z.destroy(A);
                    }), Z.getDelegateOverrides();
                  }).catch(function(Y) {
                    throw new Error(`Unable to delegate rendering. Possibly the component is not loaded in the target window.

` + lt(Y));
                  });
                  return _r = function() {
                    for (var Y = arguments.length, Z = new Array(Y), A = 0; A < Y; A++) Z[A] = arguments[A];
                    return Ge.then(function(k) {
                      return k.getProxyContainer.apply(k, Z);
                    });
                  }, Vr = function() {
                    for (var Y = arguments.length, Z = new Array(Y), A = 0; A < Y; A++) Z[A] = arguments[A];
                    return Ge.then(function(k) {
                      return k.renderContainer.apply(k, Z);
                    });
                  }, qr = function() {
                    for (var Y = arguments.length, Z = new Array(Y), A = 0; A < Y; A++) Z[A] = arguments[A];
                    return Ge.then(function(k) {
                      return k.show.apply(k, Z);
                    });
                  }, Hr = function() {
                    for (var Y = arguments.length, Z = new Array(Y), A = 0; A < Y; A++) Z[A] = arguments[A];
                    return Ge.then(function(k) {
                      return k.hide.apply(k, Z);
                    });
                  }, wr = function() {
                    for (var Y = arguments.length, Z = new Array(Y), A = 0; A < Y; A++) Z[A] = arguments[A];
                    return Ge.then(function(k) {
                      return k.watchForUnload.apply(k, Z);
                    });
                  }, G === xe.IFRAME ? (Pr = function() {
                    for (var Y = arguments.length, Z = new Array(Y), A = 0; A < Y; A++) Z[A] = arguments[A];
                    return Ge.then(function(k) {
                      return k.getProxyWindow.apply(k, Z);
                    });
                  }, Gr = function() {
                    for (var Y = arguments.length, Z = new Array(Y), A = 0; A < Y; A++) Z[A] = arguments[A];
                    return Ge.then(function(k) {
                      return k.openFrame.apply(k, Z);
                    });
                  }, Jr = function() {
                    for (var Y = arguments.length, Z = new Array(Y), A = 0; A < Y; A++) Z[A] = arguments[A];
                    return Ge.then(function(k) {
                      return k.openPrerenderFrame.apply(k, Z);
                    });
                  }, ot = function() {
                    for (var Y = arguments.length, Z = new Array(Y), A = 0; A < Y; A++) Z[A] = arguments[A];
                    return Ge.then(function(k) {
                      return k.prerender.apply(k, Z);
                    });
                  }, it = function() {
                    for (var Y = arguments.length, Z = new Array(Y), A = 0; A < Y; A++) Z[A] = arguments[A];
                    return Ge.then(function(k) {
                      return k.open.apply(k, Z);
                    });
                  }, ie = function() {
                    for (var Y = arguments.length, Z = new Array(Y), A = 0; A < Y; A++) Z[A] = arguments[A];
                    return Ge.then(function(k) {
                      return k.openPrerender.apply(k, Z);
                    });
                  }) : G === xe.POPUP && (nt = function() {
                    for (var Y = arguments.length, Z = new Array(Y), A = 0; A < Y; A++) Z[A] = arguments[A];
                    return Ge.then(function(k) {
                      return k.setProxyWin.apply(k, Z);
                    });
                  }), Ge;
                }(j, N);
              }), je = H.window, be = Ii(), Fe = Si(h, H, "post"), Ce = $.trigger(Ee.RENDER), fe = ji(B), Ie = mr(), Pe = fe.then(function() {
                return eo();
              }), ar = Pe.then(function() {
                return Si(h, H, "get").then(function(G) {
                  return function($e, Ae) {
                    var qe = Ae.query || {}, cr = Ae.hash || {}, We, yr, Ge = $e.split("#");
                    yr = Ge[1];
                    var Y = (We = Ge[0]).split("?");
                    We = Y[0];
                    var Z = zo(Y[1], qe), A = zo(yr, cr);
                    return Z && (We = We + "?" + Z), A && (We = We + "#" + A), We;
                  }(On(vt()), {
                    query: G
                  });
                });
              }), Ue = Ie.then(function(G) {
                return function(Ae) {
                  var qe = Ae === void 0 ? {} : Ae, cr = qe.proxyWin, We = qe.initialChildDomain, yr = qe.childDomainMatch, Ge = qe.target, Y = Ge === void 0 ? window : Ge, Z = qe.context;
                  return function(A) {
                    var k = A === void 0 ? {} : A, ro = k.proxyWin, vs = k.childDomainMatch, ws = k.context;
                    return ke(k.initialChildDomain).then(function(ms) {
                      return {
                        uid: t,
                        context: ws,
                        tag: E,
                        childDomainMatch: vs,
                        version: "10_3_3",
                        props: ms,
                        exports: ($i = ro, {
                          init: function(gs) {
                            return ln(this.origin, gs);
                          },
                          close: Fr,
                          checkClose: function() {
                            return Ai($i);
                          },
                          resize: zt,
                          onError: jt,
                          show: Tr,
                          hide: Mr,
                          export: _i
                        })
                      };
                      var $i;
                    });
                  }({
                    proxyWin: cr,
                    initialChildDomain: We,
                    childDomainMatch: yr,
                    context: Z
                  }).then(function(A) {
                    var k = Ei({
                      data: A,
                      metaData: {
                        windowRef: Ft(Y, We, Z, cr)
                      },
                      sender: {
                        domain: F(window)
                      },
                      receiver: {
                        win: cr,
                        domain: yr
                      },
                      passByReference: We === F()
                    }), ro = k.serializedData;
                    return I.register(k.cleanReference), ro;
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
                return ir(j, {
                  windowName: G
                });
              }), Be = _t(j), tr = R.hash({
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
              }), st = R.hash({
                proxyWin: Ve,
                proxyPrerenderFrame: Be
              }).then(function(G) {
                return Mt(j, G.proxyWin, G.proxyPrerenderFrame);
              }), gr = Ve.then(function(G) {
                return se = G, or(G);
              }), Nr = R.hash({
                proxyPrerenderWin: st,
                state: gr
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
                windowUrl: ar,
                body: Fe,
                method: cs,
                windowName: Ui,
                prerender: Nr
              }).then(function(G) {
                return G.proxyWin.setLocation(G.windowUrl, {
                  method: G.method,
                  body: G.body
                });
              }), ds = Ve.then(function(G) {
                (function $e(Ae, qe) {
                  var cr = !1;
                  return I.register(function() {
                    cr = !0;
                  }), R.delay(2e3).then(function() {
                    return Ae.isClosed();
                  }).then(function(We) {
                    if (!cr) {
                      if (qe === xe.POPUP && We) return Fr(new Error("Detected popup close"));
                      var yr = !!(vr && pt(vr));
                      return qe === xe.IFRAME && We && (yr || Br) ? Fr(new Error("Detected iframe close")) : $e(Ae, qe);
                    }
                  });
                })(G, j);
              }), fs = R.hash({
                container: tr,
                prerender: Nr
              }).then(function() {
                return $.trigger(Ee.DISPLAY);
              }), ls = Ve.then(function(G) {
                return function($e, Ae, qe) {
                  return R.try(function() {
                    return $e.awaitWindow();
                  }).then(function(cr) {
                    if (Ur && Ur.needsBridge({
                      win: cr,
                      domain: Ae
                    }) && !Ur.hasBridge(Ae, Ae)) {
                      var We = typeof n.bridgeUrl == "function" ? n.bridgeUrl({
                        props: H
                      }) : n.bridgeUrl;
                      if (!We) throw new Error("Bridge needed to render " + qe);
                      var yr = Ir(We);
                      return Ur.linkUrl(cr, Ae), Ur.openBridge(On(We), yr);
                    }
                  });
                }(G, K, j);
              }), hs = Bi.then(function() {
                return R.try(function() {
                  var G = H.timeout;
                  if (G) return z.timeout(G, new Error("Loading component timed out after " + G + " milliseconds"));
                });
              }), ps = z.then(function() {
                return Br = !0, $.trigger(Ee.RENDERED);
              });
              return R.hash({
                initPromise: z,
                buildUrlPromise: ar,
                onRenderPromise: Ce,
                getProxyContainerPromise: fe,
                openFramePromise: ce,
                openPrerenderFramePromise: Be,
                renderContainerPromise: tr,
                openPromise: Ve,
                openPrerenderPromise: st,
                setStatePromise: gr,
                prerenderPromise: Nr,
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
              return R.all([jt(K), Lt(K)]).then(function() {
                throw K;
              }, function() {
                throw K;
              });
            }).then(ye);
          },
          destroy: Lt,
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
                show: Tr,
                hide: Mr,
                renderContainer: zi,
                getProxyWindow: mr,
                watchForUnload: Ii,
                openFrame: ir,
                openPrerenderFrame: _t,
                prerender: Fi,
                open: Ci,
                openPrerender: Mt,
                setProxyWin: or
              };
            });
          },
          getExports: function() {
            return C({
              getExports: function() {
                return Wi;
              }
            });
          }
        };
      }
      var Xa = {
        register: function(e, t, n, o) {
          var a = o.React, u = o.ReactDOM;
          return function(d) {
            P(h, d);
            function h() {
              return d.apply(this, arguments) || this;
            }
            var f = h.prototype;
            return f.render = function() {
              return a.createElement("div", null);
            }, f.componentDidMount = function() {
              var v = u.findDOMNode(this), E = n(ht({}, this.props));
              E.render(v, xe.IFRAME), this.setState({
                parent: E
              });
            }, f.componentDidUpdate = function() {
              this.state && this.state.parent && this.state.parent.updateProps(ht({}, this.props)).catch(ye);
            }, h;
          }(a.Component);
        }
      }, ka = {
        register: function(e, t, n, o) {
          return o.component(e, {
            render: function(a) {
              return a("div");
            },
            inheritAttrs: !1,
            mounted: function() {
              var a = this.$el;
              this.parent = n(T({}, (u = this.$attrs, Object.keys(u).reduce(function(d, h) {
                var f = u[h];
                return h === "style-object" || h === "styleObject" ? (d.style = f, d.styleObject = f) : h.includes("-") ? d[Cn(h)] = f : d[h] = f, d;
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
        register: function(e, t, n) {
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
      }, rs = {
        register: function(e, t, n, o) {
          return o.module(e, []).directive(Cn(e), function() {
            for (var a = {}, u = 0, d = Object.keys(t); u < d.length; u++) a[d[u]] = "=";
            return a.props = "=", {
              scope: a,
              restrict: "E",
              controller: ["$scope", "$element", function(h, f) {
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
                w.render(f[0], xe.IFRAME), h.$watch(function() {
                  w.updateProps(E()).catch(ye);
                });
              }]
            };
          });
        }
      }, ts = {
        register: function(e, t, n, o) {
          var a = o.Component, u = o.NgModule, d = o.ElementRef, h = o.NgZone, f = o.Inject, v = function() {
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
                    var S = arguments, C = this;
                    return O.run(function() {
                      return b.apply(C, S);
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
                for (var C in b) if (!O[C]) return !1;
                return !0;
              }(this._props, this.props) && (this._props = T({}, this.props), this.parent.updateProps(this.getProps()));
            }, w;
          }();
          v.annotations = void 0, v.parameters = void 0, v.parameters = [[new f(d)], [new f(h)]], v.annotations = [new a({
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
        var t = e.uid, n = e.frame, o = e.prerenderFrame, a = e.doc, u = e.props, d = e.event, h = e.dimensions, f = h.width, v = h.height;
        if (n && o) {
          var E = a.createElement("div");
          E.setAttribute("id", t);
          var w = a.createElement("style");
          return u.cspNonce && w.setAttribute("nonce", u.cspNonce), w.appendChild(a.createTextNode(`
            #` + t + ` {
                display: inline-block;
                position: relative;
                width: ` + f + `;
                height: ` + v + `;
            }

            #` + t + ` > iframe {
                display: inline-block;
                position: absolute;
                width: 100%;
                height: 100%;
                top: 0;
                left: 0;
                transition: opacity .2s ease-in-out;
            }

            #` + t + ` > iframe.zoid-invisible {
                opacity: 0;
            }

            #` + t + ` > iframe.zoid-visible {
                opacity: 1;
        }
        `)), E.appendChild(n), E.appendChild(o), E.appendChild(w), o.classList.add("zoid-visible"), n.classList.add("zoid-invisible"), d.on(Ee.RENDERED, function() {
            o.classList.remove("zoid-visible"), o.classList.add("zoid-invisible"), n.classList.remove("zoid-invisible"), n.classList.add("zoid-visible"), setTimeout(function() {
              Ct(o);
            }, 1);
          }), d.on(Ee.RESIZE, function(p) {
            var y = p.width, b = p.height;
            typeof y == "number" && (E.style.width = Jo(y)), typeof b == "number" && (E.style.height = Jo(b));
          }), E;
        }
      }
      function os(e) {
        var t = e.doc, n = e.props, o = t.createElement("html"), a = t.createElement("body"), u = t.createElement("style"), d = t.createElement("div");
        return d.classList.add("spinner"), n.cspNonce && u.setAttribute("nonce", n.cspNonce), o.appendChild(a), a.appendChild(d), a.appendChild(u), u.appendChild(t.createTextNode(`
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
      var Xn = rn(), kn = rn();
      function is(e) {
        var t = function(b) {
          var O = b.tag, S = b.url, C = b.domain, z = b.bridgeUrl, V = b.props, I = V === void 0 ? {} : V, q = b.dimensions, L = q === void 0 ? {} : q, Q = b.autoResize, $ = Q === void 0 ? {} : Q, ue = b.allowedParentDomains, oe = ue === void 0 ? "*" : ue, J = b.attributes, H = J === void 0 ? {} : J, se = b.defaultContext, X = se === void 0 ? xe.IFRAME : se, De = b.containerTemplate, Dr = De === void 0 ? ns : De, vr = b.prerenderTemplate, Br = vr === void 0 ? os : vr, $r = b.validate, _r = b.eligible, qr = _r === void 0 ? function() {
            return {
              eligible: !0
            };
          } : _r, Hr = b.logger, tt = Hr === void 0 ? {
            info: ye
          } : Hr, Vr = b.exports, Pr = Vr === void 0 ? ye : Vr, nt = b.method, Gr = b.children, Jr = Gr === void 0 ? function() {
            return {};
          } : Gr, ot = O.replace(/-/g, "_"), it = T({}, {
            window: {
              type: pe.OBJECT,
              sendToChild: !1,
              required: !1,
              allowDelegate: !0,
              validate: function(ie) {
                var wr = ie.value;
                if (!kr(wr) && !pr.isProxyWindow(wr)) throw new Error("Expected Window or ProxyWindow");
                if (kr(wr)) {
                  if (ge(wr)) throw new Error("Window is closed");
                  if (!U(wr)) throw new Error("Window is not same domain");
                }
              },
              decorate: function(ie) {
                return At(ie.value);
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
              default: Wr,
              decorate: rt
            },
            onRendered: {
              type: pe.FUNCTION,
              required: !1,
              sendToChild: !1,
              default: Wr,
              decorate: rt
            },
            onRender: {
              type: pe.FUNCTION,
              required: !1,
              sendToChild: !1,
              default: Wr,
              decorate: rt
            },
            onPrerendered: {
              type: pe.FUNCTION,
              required: !1,
              sendToChild: !1,
              default: Wr,
              decorate: rt
            },
            onPrerender: {
              type: pe.FUNCTION,
              required: !1,
              sendToChild: !1,
              default: Wr,
              decorate: rt
            },
            onClose: {
              type: pe.FUNCTION,
              required: !1,
              sendToChild: !1,
              allowDelegate: !0,
              default: Wr,
              decorate: rt
            },
            onDestroy: {
              type: pe.FUNCTION,
              required: !1,
              sendToChild: !1,
              allowDelegate: !0,
              default: Wr,
              decorate: rt
            },
            onResize: {
              type: pe.FUNCTION,
              required: !1,
              sendToChild: !1,
              allowDelegate: !0,
              default: Wr
            },
            onFocus: {
              type: pe.FUNCTION,
              required: !1,
              sendToChild: !1,
              allowDelegate: !0,
              default: Wr
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
          }, I);
          if (!Dr) throw new Error("Container template required");
          return {
            name: ot,
            tag: O,
            url: S,
            domain: C,
            bridgeUrl: z,
            method: nt,
            propsDef: it,
            dimensions: L,
            autoResize: $,
            allowedParentDomains: oe,
            attributes: H,
            defaultContext: X,
            containerTemplate: Dr,
            prerenderTemplate: Br,
            validate: $r,
            logger: tt,
            eligible: qr,
            children: Jr,
            exports: typeof Pr == "function" ? Pr : function(ie) {
              for (var wr = ie.getExports, ae = {}, ze = function() {
                var Oe = Le[Ne], ke = Pr[Oe].type, _e = wr().then(function(Me) {
                  return Me[Oe];
                });
                ae[Oe] = ke === pe.FUNCTION ? function() {
                  for (var Me = arguments.length, mr = new Array(Me), or = 0; or < Me; or++) mr[or] = arguments[or];
                  return _e.then(function(Tr) {
                    return Tr.apply(void 0, mr);
                  });
                } : _e;
              }, Ne = 0, Le = Object.keys(Pr); Ne < Le.length; Ne++) ze();
              return ae;
            }
          };
        }(e), n = t.name, o = t.tag, a = t.defaultContext, u = t.propsDef, d = t.eligible, h = t.children, f = Wt(window), v = {}, E = [], w = function() {
          if (function(O) {
            try {
              return Zn(window.name).name === O;
            } catch {
            }
            return !1;
          }(n)) {
            var b = Ti().payload;
            if (b.tag === o && fr(b.childDomainMatch, F())) return !0;
          }
          return !1;
        }, p = Lr(function() {
          if (w()) {
            if (window.xprops)
              throw delete f.components[o], new Error("Can not register " + n + " as child - child already registered");
            var b = function(O) {
              var S = O.tag, C = O.propsDef, z = O.autoResize, V = O.allowedParentDomains, I = [], q = Ti(), L = q.parent, Q = q.payload, $ = L.win, ue = L.domain, oe, J = new R(), H = Q.version, se = Q.uid, X = Q.exports, De = Q.context, Dr = Q.props;
              if (!function(ae, ze) {
                if (!/_/.test(ae) || !/_/.test("10_3_3")) throw new Error("Versions are in an invalid format (" + ae + ", 10_3_3)");
                return ae.split("_")[0] === "10_3_3".split("_")[0];
              }(H)) throw new Error("Parent window has zoid version " + H + ", child window has version 10_3_3");
              var vr = X.show, Br = X.hide, $r = X.close, _r = X.onError, qr = X.checkClose, Hr = X.export, tt = X.resize, Vr = X.init, Pr = function() {
                return $;
              }, nt = function() {
                return ue;
              }, Gr = function(ae) {
                return I.push(ae), {
                  cancel: function() {
                    I.splice(I.indexOf(ae), 1);
                  }
                };
              }, Jr = function(ae) {
                return tt.fireAndForget({
                  width: ae.width,
                  height: ae.height
                });
              }, ot = function(ae) {
                return J.resolve(ae), Hr(ae);
              }, it = function(ae) {
                var ze = (ae === void 0 ? {} : ae).anyParent, Ne = [], Le = oe.parent;
                if (ze === void 0 && (ze = !Le), !ze && !Le) throw new Error("No parent found for " + S + " child");
                for (var Oe = 0, ke = Ye(window); Oe < ke.length; Oe++) {
                  var _e = ke[Oe];
                  if (U(_e)) {
                    var Me = re(_e).xprops;
                    if (Me && Pr() === Me.getParent()) {
                      var mr = Me.parent;
                      if (ze || !Le || mr && mr.uid === Le.uid) {
                        var or = yi(_e, function(Tr) {
                          return Tr.exports;
                        });
                        Ne.push({
                          props: Me,
                          exports: or
                        });
                      }
                    }
                  }
                }
                return Ne;
              }, ie = function(ae, ze, Ne) {
                Ne === void 0 && (Ne = !1);
                var Le = function(ke, _e, Me, mr, or, Tr) {
                  Tr === void 0 && (Tr = !1);
                  for (var Mr = {}, vt = 0, wt = Object.keys(Me); vt < wt.length; vt++) {
                    var at = wt[vt], ir = _e[at], _t = ir && ir.trustedDomains && ir.trustedDomains.length > 0 ? ir.trustedDomains.reduce(function(ln, zt) {
                      return ln || fr(zt, F(window));
                    }, !1) : mr === F(window) || U(ke);
                    if ((!ir || !ir.sameDomain || _t) && (!ir || !ir.trustedDomains || _t)) {
                      var Mt = Oi(_e, 0, at, Me[at], or);
                      Mr[at] = Mt, ir && ir.alias && !Mr[ir.alias] && (Mr[ir.alias] = Mt);
                    }
                  }
                  if (!Tr) for (var mt = 0, fn = Object.keys(_e); mt < fn.length; mt++) {
                    var Ft = fn[mt];
                    Me.hasOwnProperty(Ft) || (Mr[Ft] = Oi(_e, 0, Ft, void 0, or));
                  }
                  return Mr;
                }($, C, ae, ze, {
                  tag: S,
                  show: vr,
                  hide: Br,
                  close: $r,
                  focus: Qa,
                  onError: _r,
                  resize: Jr,
                  getSiblings: it,
                  onProps: Gr,
                  getParent: Pr,
                  getParentDomain: nt,
                  uid: se,
                  export: ot
                }, Ne);
                oe ? ht(oe, Le) : oe = Le;
                for (var Oe = 0; Oe < I.length; Oe++) (0, I[Oe])(oe);
              }, wr = function(ae) {
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
                    }) || ""), Wt(window).exports = O.exports({
                      getExports: function() {
                        return J;
                      }
                    }), function(ze, Ne) {
                      if (!fr(ze, Ne)) throw new Error("Can not be rendered by domain: " + Ne);
                    }(V, ue), ei($), function() {
                      window.addEventListener("beforeunload", function() {
                        qr.fireAndForget();
                      }), window.addEventListener("unload", function() {
                        qr.fireAndForget();
                      }), Oo($, function() {
                        Ri();
                      });
                    }(), Vr({
                      name: ae,
                      updateProps: wr,
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
                      var _e = ke.width, Me = ke.height, mr = ke.element;
                      mr && (_e || Me) && De !== xe.POPUP && qo(mr, function(or) {
                        Jr({
                          width: _e ? or.width : void 0,
                          height: Me ? or.height : void 0
                        });
                      }, {
                        width: _e,
                        height: Me
                      });
                    });
                    var ae, ze, Ne, Le, Oe;
                  }).catch(function(ae) {
                    _r(ae);
                  });
                },
                getProps: function() {
                  return oe || (ie(Dr, ue), oe);
                }
              };
            }(t);
            return b.init(), b;
          }
        }), y = function b(O) {
          var S, C = "zoid-" + o + "-" + Xe(), z = O || {}, V = d({
            props: z
          }), I = V.eligible, q = V.reason, L = z.onDestroy;
          z.onDestroy = function() {
            if (S && I && E.splice(E.indexOf(S), 1), L) return L.apply(void 0, arguments);
          };
          var Q = xi({
            uid: C,
            options: t
          });
          Q.init(), I ? Q.setProps(z) : z.onDestroy && z.onDestroy(), Xn.register(function(oe) {
            return Q.destroy(oe || new Error("zoid destroyed all components"));
          });
          var $ = function(oe) {
            var J = (oe === void 0 ? {} : oe).decorate;
            return b((J === void 0 ? Fa : J)(z));
          }, ue = function(oe, J, H) {
            return R.try(function() {
              if (!I) {
                var se = new Error(q || n + " component is not eligible");
                return Q.destroy(se).then(function() {
                  throw se;
                });
              }
              if (!kr(oe)) throw new Error("Must pass window to renderTo");
              return function(X, De) {
                return R.try(function() {
                  if (X.window) return At(X.window).getType();
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
                  return ht(S, X), X.renderTo(oe, J, H);
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
              var De = X[se], Dr = oe[De];
              J[De] = function(vr) {
                var Br = Q.getProps(), $r = T({}, vr, {
                  parent: {
                    uid: C,
                    props: Br,
                    export: Q.export
                  }
                });
                return Dr($r);
              };
            }, se = 0, X = Object.keys(oe); se < X.length; se++) H();
            return J;
          }(), {
            isEligible: function() {
              return I;
            },
            clone: $,
            render: function(oe, J) {
              return ue(window, oe, J);
            },
            renderTo: function(oe, J, H) {
              return ue(oe, J, H);
            }
          }), I && E.push(S), S;
        };
        if (p(), function() {
          var b = Ar("zoid_allow_delegate_" + n, function() {
            return !0;
          }), O = Ar("zoid_delegate_" + n, function(S) {
            var C = S.data;
            return {
              parent: xi({
                uid: C.uid,
                options: t,
                overrides: C.overrides,
                parentWin: S.source
              })
            };
          });
          kn.register(b.cancel), kn.register(O.cancel);
        }(), f.components = f.components || {}, f.components[o]) throw new Error("Can not register multiple components with the same tag: " + o);
        return f.components[o] = !0, {
          init: y,
          instances: E,
          driver: function(b, O) {
            var S = {
              react: Xa,
              angular: rs,
              vue: ka,
              vue3: es,
              angular2: ts
            };
            if (!S[b]) throw new Error("Could not find driver for framework: " + b);
            return v[b] || (v[b] = S[b].register(o, u, y, O)), v[b];
          },
          isChild: w,
          canRenderTo: function(b) {
            return br(b, "zoid_allow_delegate_" + n).then(function(O) {
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
          xr().initialized || (xr().initialized = !0, u = (a = {
            on: Ar,
            send: br
          }).on, d = a.send, (h = xr()).receiveMessage = h.receiveMessage || function(f) {
            return Kn(f, {
              on: u,
              send: d
            });
          }, function(f) {
            var v = f.on, E = f.send;
            de().getOrSet("postMessageListener", function() {
              return Bo(window, "message", function(w) {
                (function(p, y) {
                  var b = y.on, O = y.send;
                  R.try(function() {
                    var S = p.source || p.sourceElement, C = p.origin || p.originalEvent && p.originalEvent.origin, z = p.data;
                    if (C === "null" && (C = "file://"), S) {
                      if (!C) throw new Error("Post message did not have origin domain");
                      Kn({
                        source: S,
                        origin: C,
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
            on: Ar,
            send: br
          }), ui({
            on: Ar,
            send: br,
            receiveMessage: Kn
          }), function(f) {
            var v = f.on, E = f.send;
            de("builtinListeners").getOrSet("helloListener", function() {
              var w = v("postrobot_hello", {
                domain: "*"
              }, function(y) {
                return Qo(y.source, {
                  domain: y.origin
                }), {
                  instanceID: Zo()
                };
              }), p = Xr();
              return p && jn(p, {
                send: E
              }).catch(function(y) {
              }), w;
            });
          }({
            on: Ar,
            send: br
          }));
          var a, u, d, h;
        })();
        var t = is(e), n = function(a) {
          return t.init(a);
        };
        n.driver = function(a, u) {
          return t.driver(a, u);
        }, n.isChild = function() {
          return t.isChild();
        }, n.canRenderTo = function(a) {
          return t.canRenderTo(a);
        }, n.instances = t.instances;
        var o = t.registerChild();
        return o && (window.xprops = n.xprops = o.getProps()), n;
      };
      function Di(e) {
        Ur && Ur.destroyBridges();
        var t = Xn.all(e);
        return Xn = rn(), t;
      }
      var Ni = Di;
      function ss(e) {
        return Ni(), delete window.__zoid_10_3_3__, function() {
          (function() {
            for (var n = de("responseListeners"), o = 0, a = n.keys(); o < a.length; o++) {
              var u = a[o], d = n.get(u);
              d && (d.cancelled = !0), n.del(u);
            }
          })(), (t = de().get("postMessageListener")) && t.cancel();
          var t;
          delete window.__post_robot_11_0_0__;
        }(), kn.all(e);
      }
    }]);
  });
})(Ia);
var Aa = Ia.exports;
const ta = Aa.EVENT, yt = {
  VISIBLE: "zoid-visible",
  INVISIBLE: "zoid-invisible"
};
function ec({
  uid: r,
  frame: i,
  prerenderFrame: s,
  doc: c,
  props: l,
  event: m,
  dimensions: P
}) {
  const { width: T, height: D } = P, { top: W = 0, left: g = 0 } = l;
  if (!i || !s)
    return;
  const M = c.createElement("div");
  M.setAttribute("id", r);
  const _ = c.createElement("style");
  return l.cspNonce && _.setAttribute("nonce", l.cspNonce), _.appendChild(
    c.createTextNode(`
          #${r} {
              display: inline-block;
              position: absolute;
              width: ${T};
              height: ${D};
              z-index: 1049;
              border: none;
              top: ${W}px;
              left: ${g}px;
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

          #${r} > iframe.${yt.INVISIBLE} {
              opacity: 0;
          }

          #${r} > iframe.${yt.VISIBLE} {
              opacity: 1;
        }
      `)
  ), M.appendChild(i), M.appendChild(s), M.appendChild(_), s.classList.add(yt.INVISIBLE), i.classList.add(yt.INVISIBLE), m.on(ta.RENDERED, () => {
    setTimeout(() => {
      i.classList.remove(yt.INVISIBLE), i.classList.add(yt.VISIBLE);
    }, 100), setTimeout(() => {
      s.remove();
    }, 1);
  }), m.on(ta.RESIZE, ({ width: te, height: Re }) => {
    typeof te == "number" && (M.style.width = `${te}px`), typeof Re == "number" && (M.style.height = `${Re}px`);
  }), M;
}
function rc(r) {
  return Aa.create({
    dimensions: {
      width: "100%",
      height: "100%"
    },
    tag: `wta${r}`,
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
function tc(r) {
  return rc(r.id)(r);
}
function nc(r) {
  return new Promise((i, s) => {
    const c = document.createElement("script");
    c.async = !0, c.src = r, c.onload = i, c.onerror = s, document.body.appendChild(c);
  });
}
const oc = "https://cdn.jsdelivr.net/gh/sigmaott/sigma-ssai-web-sdk/v7/build/dist/wasm_exec.js";
let Et = null;
function na() {
  Et = null;
}
function ic() {
  const r = window;
  return r.Go ? Promise.resolve(r.wasm) : Et || (Et = nc(oc).then(() => r.Go), Et.then(na).catch(na), Et);
}
class bt {
  constructor() {
    return bt.instance ? bt.instance : (this.session = null, this.go = null, this.buffer = null, this.audioMediaSequence = {}, bt.instance = this, this);
  }
  async init(i) {
    if (!this.buffer) {
      const c = await (await fetch(i)).arrayBuffer();
      this.buffer = c;
    }
    return bt.instance;
  }
  async loadSource(i) {
    this.session && (i.session = this.session);
    const s = JSON.stringify(i), c = new Go(), l = await WebAssembly.instantiate(this.buffer, c.importObject);
    c.run(l.instance);
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
const ac = Or(), sc = Or();
function oa({ adsUrl: r, sdk: i, loader: s }) {
  return class extends s {
    constructor(l) {
      super(l);
    }
    load(l, m, P) {
      const T = P.onSuccess;
      P.onSuccess = async (D, W, g) => {
        (g.type === "manifest" || g.type === "level" || g.type === "audioTrack") && (D.data = await this.modifyManifest(D.url, D.data, g.type)), T(D, W, g);
      }, super.load(l, m, P);
    }
    async modifyManifest(l, m, P) {
      ac.value = m;
      const T = {
        proxyAds: {
          uri: r,
          timeout: 2
        }
      };
      try {
        const D = await i.loadSource({ config: T, manifest: m, masterUri: l });
        return console.log("[LOG] ~ newManifest:", D), sc.value = D, D;
      } catch (D) {
        return console.error("[LOG] ~ error:", D), m;
      }
    }
  };
}
function uc({
  video: r,
  adContainer: i,
  startSession: s,
  sdk: c
}) {
  const l = Qu(), m = Or(!1), P = Or(), T = Math.random().toString(36).slice(6);
  function D({ icons: ne }) {
    return {
      id: T,
      appConfig: {
        sdkBaseUrl: yn("https://cdn.jsdelivr.net/gh/sigmaott/sigma-ssai-web-sdk/v7/build/dist/wta/index.html", { id: T })
      },
      icons: ne
    };
  }
  const W = tc(D({
    icons: []
  }));
  W.render(i), W.hide(), i.style.display = "none", Su(() => {
    var ne;
    if (P.value) {
      const F = ((ne = P.value) == null ? void 0 : ne.icons) || [];
      i.style.display = "block", W.updateProps(D({
        icons: F
      })), W.show();
    } else
      i.style.display = "none", W.hide();
  });
  const g = Or([]), M = Or(), _ = Or([]);
  async function te(ne) {
    var U;
    console.log("[LOG] ~ currentAd:", P);
    const F = (U = P.value) == null ? void 0 : U.trackingEvents.find((re) => re.eventType === ne);
    if (!F) {
      console.debug("[LOG] ~ event:", ne);
      return;
    }
    l.trigger(F), await Promise.all(F.beaconUrls.map((re) => Xu(cu(re, {
      retry: 3,
      retryDelay: 500
    }))));
  }
  const Re = /* @__PURE__ */ new Map();
  let Qe, R;
  function ur(ne, F, U) {
    ne.addEventListener(F, U), Re.set(F, U);
  }
  function Sr(ne) {
    var Ke, rr;
    const F = ((ne == null ? void 0 : ne.time) || 0) > 0 ? ne.time : 0, U = (Ke = ne == null ? void 0 : ne.value) == null ? void 0 : Ke.event;
    console.debug("[LOG] ~ eventType:", U);
    const re = _.value.find((Se) => Se.eventType === U && !Se.tracked && !Se.skipped);
    if (console.debug("[LOG] ~ eventAd:", re), !re)
      return;
    const er = re == null ? void 0 : re.ad;
    if (console.debug("[LOG] ~ ad:", er), !!er) {
      if (U === "start")
        P.value && _.value.filter((Ye) => Ye.key.startsWith(`${P.value.key}_`)).forEach((Ye) => Ye.skipped = !0), P.value = er, s(er.adVerifications, l), Qe = no(() => {
          te("impression"), te("start");
          const Se = _.value.find((Ye) => Ye.key === re.key.replace("_start", "_impression"));
          Se && (Se.tracked = !0), re.tracked = !0, R = no(() => {
            P.value = void 0;
          }, 30 * 1e3);
        }, F * 1e3);
      else {
        if (!P.value) {
          console.debug("[LOG] ~ eventType:", U);
          return;
        }
        if (er.id !== ((rr = P.value) == null ? void 0 : rr.id)) {
          console.debug("[ERROR] ~ ad:", er), console.debug("[ERROR] ~ currentAd:", P.value), _.value.filter((Ye) => Ye.key.startsWith(`${P.value.key}_`)).forEach((Ye) => Ye.skipped = !0);
          return;
        }
        Qe = no(() => {
          te(U), U === "complete" && er.id === P.value.id && (P.value = void 0, Ji(R)), re.tracked = !0;
        }, F * 1e3);
      }
      console.debug("========================================");
    }
  }
  function Er() {
    return m.value = !1, ["fullscreenchange", "webkitfullscreenchange", "mozfullscreenchange", "msfullscreenchange"].forEach((ne) => {
      ur(r, ne, () => {
        const F = document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement;
        te(F ? "fullscreen" : "exitFullscreen");
      });
    }), ur(r, "pause", () => te("pause")), ur(r, "play", () => te("resume")), ur(r, "rewind", () => te("rewind")), ur(r, "mute", () => te("mute")), ur(r, "unmute", () => te("unmute")), async (ne, F) => {
      if (M.value = F.frag.sn, ne !== window.Hls.Events.FRAG_CHANGED)
        return;
      const U = g.value.filter((re) => re.sn === F.frag.sn);
      if (!U.length) {
        console.debug("[LOG] ~ trackingEvent:", U);
        return;
      }
      U.forEach((re) => Sr(re)), g.value = g.value.filter((re) => re.sn !== F.frag.sn);
    };
  }
  async function ve() {
    return c.getEventTracking().then((ne) => {
      for (const F of (ne == null ? void 0 : ne.avails) || [])
        for (const U of F.ads) {
          const re = `${F.id}_${U.id}_${U.startTimeInSeconds}`;
          for (const er of U.trackingEvents) {
            const Ke = `${re}_${er.eventType}`;
            _.value.find((Se) => Se.key === Ke) || _.value.push({
              ...er,
              key: Ke,
              ad: {
                ...U,
                key: re
              },
              tracked: !1
            });
          }
        }
    });
  }
  function nr() {
    return async (ne, F) => {
      function U(Ke) {
        for (let rr = 0; rr < Ke.length; rr++)
          if (Ke[rr] === 0)
            return rr;
        return Ke.length;
      }
      const { start: re, sn: er } = F.frag;
      for (let Ke = 0; Ke < F.samples.length; Ke++) {
        const rr = F.samples[Ke], Se = rr.data, Ye = rr.pts;
        if (String.fromCharCode.apply(null, Se.slice(0, 3)) !== "ID3" || String.fromCharCode.apply(null, Se.slice(10, 14)) !== "TXXX")
          continue;
        const ge = Se.slice(21, Se.length), Gt = U(ge), Qr = ge.slice(Gt + 1, ge.length), Jt = U(Qr), Xr = new TextDecoder("utf-8").decode(Qr.slice(0, Jt)), ft = {
          sn: er,
          time: Ye - re,
          value: uo(Xr)
        };
        if (M.value && er < M.value)
          return;
        g.value.push(ft), ft.value.event === "start" && ve();
      }
    };
  }
  function Cr() {
    return (ne) => {
      const F = ne.track;
      F.kind === "metadata" && (F.oncuechange = async () => {
        const U = F.activeCues[0];
        if (U && U.value.data) {
          console.debug("[LOG] ~ elemTrack:", U), await ve();
          const re = uo(U.value.data);
          console.debug("[LOG] ~ trackingEvent:", re), Sr({
            value: re
          });
        }
      });
    };
  }
  function Je(ne, F) {
    l.on((U) => {
      (ne === "*" || U.eventType === ne) && F(U);
    });
  }
  function Te() {
    P.value = void 0, g.value = [], Re.forEach((ne, F) => {
      r.removeEventListener(F, ne);
    }), Re.clear(), Ji(Qe);
  }
  function ct() {
    return {
      eventTracking: g,
      trackingDataEvent: _
    };
  }
  return {
    destroy: Te,
    onEventTracking: Je,
    hlsHelper: {
      createHlsFragChanged: Er,
      createHlsFragParsingMetadata: nr
    },
    videojsHelper: {
      createVideojsAddTrack: Cr
    },
    getLog: ct
  };
}
async function dc({ video: r, adContainer: i, adsUrl: s }) {
  await ic();
  const c = new bt();
  await c.init("https://cdn.jsdelivr.net/gh/sigmaott/sigma-ssai-web-sdk/v7/build/dist/sigma-cspm.wasm");
  function l() {
  }
  const { onEventTracking: m, destroy: P, videojsHelper: T, hlsHelper: D, getLog: W } = uc({
    video: r,
    adContainer: i,
    trackingUrl: "",
    startSession: l,
    sdk: c
  }), g = Or(), M = Or();
  function _(ve) {
    ve.config.loader = oa({ adsUrl: s, sdk: c, loader: Hls.DefaultConfig.loader }), g.value = ve;
    const nr = D.createHlsFragChanged(), Cr = D.createHlsFragParsingMetadata();
    ve.on("hlsFragChanged", nr), ve.on("hlsFragParsingMetadata", Cr), ve.on(Hls.Events.ERROR, (Je, Te) => {
      console.error("HLS Error:", Je, Te), Te.type === window.Hls.ErrorTypes.NETWORK_ERROR ? console.error("Network Error:", Te.details) : Te.type === window.Hls.ErrorTypes.MEDIA_ERROR ? console.error("Media Error:", Te.details) : console.error("Other Error:", Te.details);
    }), M.value = () => {
      ve.off("hlsFragChanged", nr), ve.off("hlsFragParsingMetadata", Cr);
    };
  }
  function te(ve) {
    ve.hls.config.loader = oa({ adsUrl: s, sdk: c, loader: SigmaManager.DefaultConfig.loader }), g.value = ve.hls;
    const nr = D.createHlsFragChanged(), Cr = D.createHlsFragParsingMetadata();
    ve.hls.on("hlsFragChanged", nr), ve.hls.on("hlsFragParsingMetadata", Cr), ve.on(SigmaManager.Events.ERROR, (Je, Te) => {
      console.log("[LOG] ~ event:", Je), console.error("HLS Error:", Je, Te), Te.type === window.Hls.ErrorTypes.NETWORK_ERROR ? console.error("Network Error:", Te.details) : Te.type === window.Hls.ErrorTypes.MEDIA_ERROR ? console.error("Media Error:", Te.details) : console.error("Other Error:", Te.details);
    }), M.value = () => {
      ve.hls.destroy();
    };
  }
  const Re = Or(), Qe = Or(), ur = {
    instance: c,
    config: {
      proxyAds: {
        uri: s,
        timeout: 2
      }
    }
  };
  function Sr(ve) {
    Re.value = ve;
    const nr = T.createVideojsAddTrack();
    ve.textTracks().on("addtrack", nr), Qe.value = () => {
      ve.textTracks().off("addtrack", nr);
    };
  }
  function Er() {
    var ve, nr;
    P(), (ve = M.value) == null || ve.call(M), (nr = Qe.value) == null || nr.call(Qe), g.value = null, Re.value = null, M.value = null, Qe.value = null;
  }
  return {
    onEventTracking: m,
    destroy: Er,
    sigmaPlayer: {
      attachVideojs: Sr,
      attachHls: _,
      attachSigmaDrm: te,
      attachVideojs2: Sr,
      getLog: W
    },
    sdk: c,
    cspm: ur
  };
}
(function(r) {
  const i = r.Vhs.PlaylistLoader.prototype.setupInitialPlaylist;
  r.Vhs.PlaylistLoader.prototype.setupInitialPlaylist = async function(s) {
    if (s.manifestString && this.vhs_.options_.cspm)
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
(function(r) {
  const i = r.Vhs.PlaylistLoader.prototype.haveMetadata;
  r.Vhs.PlaylistLoader.prototype.haveMetadata = async function({
    playlistString: s,
    playlistObject: c,
    url: l,
    id: m
  }) {
    try {
      if (s && this.vhs_.options_.cspm) {
        const P = this.vhs_.options_.cspm.config;
        s = await this.vhs_.options_.cspm.instance.loadSource({
          config: P,
          manifest: s,
          masterUri: this.main.playlists[m].resolvedUri
        });
      }
      i.apply(this, [{ playlistString: s, playlistObject: c, url: l, id: m }]);
    } catch (P) {
      console.error("Error loading source:", P);
    }
  };
})(videojs);
(function(r) {
  const i = (c, l) => {
    const m = c.segments || [], P = m[m.length - 1], T = P && P.parts && P.parts[P.parts.length - 1], D = T && T.duration || P && P.duration;
    return D ? D * 1e3 : (c.partTargetDuration || c.targetDuration || 10) * 500;
  }, s = (c, l) => l && l.responseURL && c !== l.responseURL ? l.responseURL : c;
  r.Vhs.PlaylistLoader.prototype.media = function(c, l) {
    if (!c)
      return this.media_;
    if (this.state === "HAVE_NOTHING")
      throw new Error(`Cannot switch media playlist from ${this.state}`);
    if (typeof c == "string") {
      if (!this.main.playlists[c])
        throw new Error(`Unknown playlist URI: ${c}`);
      c = this.main.playlists[c];
    }
    if (window.clearTimeout(this.finalRenditionTimeout), l) {
      const W = (c.partTargetDuration || c.targetDuration) / 2 * 1e3 || 5e3;
      this.finalRenditionTimeout = window.setTimeout(this.media.bind(this, c, !1), W);
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
      (W, g) => {
        if (this.request) {
          if (c.lastRequest = Date.now(), c.resolvedUri = s(c.resolvedUri, g), W)
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
function fc(r) {
  console.log("🚀 ~ file: sdk.ts:250 ~ url:", r);
  const i = "https://dai.sigma.video/api/proxy-ads/ads/", s = vo(r), c = `${s.protocol}//${s.host}${s.pathname}`;
  if (!s.search)
    return { playerUrl: r, adsUrl: null };
  const l = Us(r), m = l["sigma.dai.adsEndpoint"];
  if (!m)
    return { playerUrl: r, adsUrl: null };
  const P = {}, T = {};
  for (const [W, g] of Object.entries(l))
    W.startsWith("sigma.dai") ? W !== "sigma.dai.adsEndpoint" && (P[W.replace("sigma.dai.", "")] = g) : T[W] = g;
  return {
    playerUrl: yn(c, T),
    adsUrl: yn(ua(i, m), P)
  };
}
export {
  dc as createSigmaDai,
  fc as processURL
};
