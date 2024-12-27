var ms = Object.defineProperty;
var gs = (t, o, s) => o in t ? ms(t, o, { enumerable: !0, configurable: !0, writable: !0, value: s }) : t[o] = s;
var Ot = (t, o, s) => gs(t, typeof o != "symbol" ? o + "" : o, s);
const ys = /#/g, Es = /&/g, bs = /\//g, Ps = /=/g, po = /\+/g, Ts = /%5e/gi, Rs = /%60/gi, Ss = /%7c/gi, xs = /%20/gi;
function Os(t) {
  return encodeURI("" + t).replace(Ss, "|");
}
function co(t) {
  return Os(typeof t == "string" ? t : JSON.stringify(t)).replace(po, "%2B").replace(xs, "+").replace(ys, "%23").replace(Es, "%26").replace(Rs, "`").replace(Ts, "^").replace(bs, "%2F");
}
function oo(t) {
  return co(t).replace(Ps, "%3D");
}
function na(t = "") {
  try {
    return decodeURIComponent("" + t);
  } catch {
    return "" + t;
  }
}
function Is(t) {
  return na(t.replace(po, " "));
}
function Ds(t) {
  return na(t.replace(po, " "));
}
function oa(t = "") {
  const o = {};
  t[0] === "?" && (t = t.slice(1));
  for (const s of t.split("&")) {
    const c = s.match(/([^=]+)=?(.*)/) || [];
    if (c.length < 2)
      continue;
    const f = Is(c[1]);
    if (f === "__proto__" || f === "constructor")
      continue;
    const v = Ds(c[2] || "");
    o[f] === void 0 ? o[f] = v : Array.isArray(o[f]) ? o[f].push(v) : o[f] = [o[f], v];
  }
  return o;
}
function Cs(t, o) {
  return (typeof o == "number" || typeof o == "boolean") && (o = String(o)), o ? Array.isArray(o) ? o.map((s) => `${oo(t)}=${co(s)}`).join("&") : `${oo(t)}=${co(o)}` : oo(t);
}
function _s(t) {
  return Object.keys(t).filter((o) => t[o] !== void 0).map((o) => Cs(o, t[o])).filter(Boolean).join("&");
}
const Ns = /^[\s\w\0+.-]{2,}:([/\\]{1,2})/, As = /^[\s\w\0+.-]{2,}:([/\\]{2})?/, Ws = /^([/\\]\s*){2,}[^/\\]/, Ms = /^\.?\//;
function ia(t, o = {}) {
  return typeof o == "boolean" && (o = { acceptRelative: o }), o.strict ? Ns.test(t) : As.test(t) || (o.acceptRelative ? Ws.test(t) : !1);
}
function Fs(t = "", o) {
  return t.endsWith("/");
}
function zs(t = "", o) {
  return (Fs(t) ? t.slice(0, -1) : t) || "/";
}
function Us(t = "", o) {
  return t.endsWith("/") ? t : t + "/";
}
function Ls(t, o) {
  if (Bs(o) || ia(t))
    return t;
  const s = zs(o);
  return t.startsWith(s) ? t : Tn(s, t);
}
function bn(t, o) {
  const s = vo(t), c = { ...oa(s.search), ...o };
  return s.search = _s(c), $s(s);
}
function js(t) {
  return oa(vo(t).search);
}
function Bs(t) {
  return !t || t === "/";
}
function qs(t) {
  return t && t !== "/";
}
function Tn(t, ...o) {
  let s = t || "";
  for (const c of o.filter((f) => qs(f)))
    if (s) {
      const f = c.replace(Ms, "");
      s = Us(s) + f;
    } else
      s = c;
  return s;
}
const aa = Symbol.for("ufo:protocolRelative");
function vo(t = "", o) {
  const s = t.match(
    /^[\s\0]*(blob:|data:|javascript:|vbscript:)(.*)/i
  );
  if (s) {
    const [, N, U = ""] = s;
    return {
      protocol: N.toLowerCase(),
      pathname: U,
      href: N + U,
      auth: "",
      host: "",
      search: "",
      hash: ""
    };
  }
  if (!ia(t, { acceptRelative: !0 }))
    return qi(t);
  const [, c = "", f, v = ""] = t.replace(/\\/g, "/").match(/^[\s\0]*([\w+.-]{2,}:)?\/\/([^/@]+@)?(.*)/) || [];
  let [, R = "", y = ""] = v.match(/([^#/?]*)(.*)?/) || [];
  c === "file:" && (y = y.replace(/\/(?=[A-Za-z]:)/, ""));
  const { pathname: I, search: _, hash: b } = qi(y);
  return {
    protocol: c.toLowerCase(),
    auth: f ? f.slice(0, Math.max(0, f.length - 1)) : "",
    host: R,
    pathname: I,
    search: _,
    hash: b,
    [aa]: !c
  };
}
function qi(t = "") {
  const [o = "", s = "", c = ""] = (t.match(/([^#?]*)(\?[^#]*)?(#.*)?/) || []).splice(1);
  return {
    pathname: o,
    search: s,
    hash: c
  };
}
function $s(t) {
  const o = t.pathname || "", s = t.search ? (t.search.startsWith("?") ? "" : "?") + t.search : "", c = t.hash || "", f = t.auth ? t.auth + "@" : "", v = t.host || "";
  return (t.protocol || t[aa] ? (t.protocol || "") + "//" : "") + f + v + o + s + c;
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
function sa(t, o = {}) {
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
  } catch (c) {
    if (o.strict)
      throw c;
    return t;
  }
}
class Ys extends Error {
  constructor(o, s) {
    super(o, s), this.name = "FetchError", s != null && s.cause && !this.cause && (this.cause = s.cause);
  }
}
function Zs(t) {
  var I, _, b, N, U;
  const o = ((I = t.error) == null ? void 0 : I.message) || ((_ = t.error) == null ? void 0 : _.toString()) || "", s = ((b = t.request) == null ? void 0 : b.method) || ((N = t.options) == null ? void 0 : N.method) || "GET", c = ((U = t.request) == null ? void 0 : U.url) || String(t.request) || "/", f = `[${s}] ${JSON.stringify(c)}`, v = t.response ? `${t.response.status} ${t.response.statusText}` : "<no response>", R = `${f}: ${v}${o ? ` ${o}` : ""}`, y = new Ys(
    R,
    t.error ? { cause: t.error } : void 0
  );
  for (const se of ["request", "options", "response"])
    Object.defineProperty(y, se, {
      get() {
        return t[se];
      }
    });
  for (const [se, ae] of [
    ["data", "_data"],
    ["status", "status"],
    ["statusCode", "status"],
    ["statusText", "statusText"],
    ["statusMessage", "statusText"]
  ])
    Object.defineProperty(y, se, {
      get() {
        return t.response && t.response[ae];
      }
    });
  return y;
}
const Xs = new Set(
  Object.freeze(["PATCH", "POST", "PUT", "DELETE"])
);
function $i(t = "GET") {
  return Xs.has(t.toUpperCase());
}
function Qs(t) {
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
]), ec = /^application\/(?:[\w!#$%&*.^`~-]*\+)?json(;.+)?$/i;
function tc(t = "") {
  if (!t)
    return "json";
  const o = t.split(";").shift() || "";
  return ec.test(o) ? "json" : ks.has(o) || o.startsWith("text/") ? "text" : "blob";
}
function rc(t, o, s = globalThis.Headers) {
  const c = {
    ...o,
    ...t
  };
  if (o != null && o.params && (t != null && t.params) && (c.params = {
    ...o == null ? void 0 : o.params,
    ...t == null ? void 0 : t.params
  }), o != null && o.query && (t != null && t.query) && (c.query = {
    ...o == null ? void 0 : o.query,
    ...t == null ? void 0 : t.query
  }), o != null && o.headers && (t != null && t.headers)) {
    c.headers = new s((o == null ? void 0 : o.headers) || {});
    for (const [f, v] of new s((t == null ? void 0 : t.headers) || {}))
      c.headers.set(f, v);
  }
  return c;
}
const nc = /* @__PURE__ */ new Set([
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
]), oc = /* @__PURE__ */ new Set([101, 204, 205, 304]);
function ca(t = {}) {
  const {
    fetch: o = globalThis.fetch,
    Headers: s = globalThis.Headers,
    AbortController: c = globalThis.AbortController
  } = t;
  async function f(y) {
    const I = y.error && y.error.name === "AbortError" && !y.options.timeout || !1;
    if (y.options.retry !== !1 && !I) {
      let b;
      typeof y.options.retry == "number" ? b = y.options.retry : b = $i(y.options.method) ? 0 : 1;
      const N = y.response && y.response.status || 500;
      if (b > 0 && (Array.isArray(y.options.retryStatusCodes) ? y.options.retryStatusCodes.includes(N) : nc.has(N))) {
        const U = y.options.retryDelay || 0;
        return U > 0 && await new Promise((se) => setTimeout(se, U)), v(y.request, {
          ...y.options,
          retry: b - 1
        });
      }
    }
    const _ = Zs(y);
    throw Error.captureStackTrace && Error.captureStackTrace(_, v), _;
  }
  const v = async function(I, _ = {}) {
    var se;
    const b = {
      request: I,
      options: rc(_, t.defaults, s),
      response: void 0,
      error: void 0
    };
    b.options.method = (se = b.options.method) == null ? void 0 : se.toUpperCase(), b.options.onRequest && await b.options.onRequest(b), typeof b.request == "string" && (b.options.baseURL && (b.request = Ls(b.request, b.options.baseURL)), (b.options.query || b.options.params) && (b.request = bn(b.request, {
      ...b.options.params,
      ...b.options.query
    }))), b.options.body && $i(b.options.method) && (Qs(b.options.body) ? (b.options.body = typeof b.options.body == "string" ? b.options.body : JSON.stringify(b.options.body), b.options.headers = new s(b.options.headers || {}), b.options.headers.has("content-type") || b.options.headers.set("content-type", "application/json"), b.options.headers.has("accept") || b.options.headers.set("accept", "application/json")) : (
      // ReadableStream Body
      ("pipeTo" in b.options.body && typeof b.options.body.pipeTo == "function" || // Node.js Stream Body
      typeof b.options.body.pipe == "function") && ("duplex" in b.options || (b.options.duplex = "half"))
    ));
    let N;
    if (!b.options.signal && b.options.timeout) {
      const ae = new c();
      N = setTimeout(
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
      N && clearTimeout(N);
    }
    if (b.response.body && !oc.has(b.response.status) && b.options.method !== "HEAD") {
      const ae = (b.options.parseResponse ? "json" : b.options.responseType) || tc(b.response.headers.get("content-type") || "");
      switch (ae) {
        case "json": {
          const it = await b.response.text(), p = b.options.parseResponse || sa;
          b.response._data = p(it);
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
  }, R = async function(I, _) {
    return (await v(I, _))._data;
  };
  return R.raw = v, R.native = (...y) => o(...y), R.create = (y = {}) => ca({
    ...t,
    defaults: {
      ...t.defaults,
      ...y
    }
  }), R;
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
}(), ic = wo.fetch || (() => Promise.reject(new Error("[ofetch] global.fetch is not supported!"))), ac = wo.Headers, sc = wo.AbortController, cc = ca({ fetch: ic, Headers: ac, AbortController: sc }), uc = cc.create({
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
}), dc = (t) => (o, s) => (t.set(o, s), s), Hi = Number.MAX_SAFE_INTEGER === void 0 ? 9007199254740991 : Number.MAX_SAFE_INTEGER, ua = 536870912, Vi = ua * 2, fc = (t, o) => (s) => {
  const c = o.get(s);
  let f = c === void 0 ? s.size : c < Vi ? c + 1 : 0;
  if (!s.has(f))
    return t(s, f);
  if (s.size < ua) {
    for (; s.has(f); )
      f = Math.floor(Math.random() * Vi);
    return t(s, f);
  }
  if (s.size > Hi)
    throw new Error("Congratulations, you created a collection of unique numbers which uses all available integers!");
  for (; s.has(f); )
    f = Math.floor(Math.random() * Hi);
  return t(s, f);
}, da = /* @__PURE__ */ new WeakMap(), lc = dc(da), vn = fc(lc, da), hc = (t) => t.method !== void 0 && t.method === "call", pc = (t) => typeof t.id == "number" && typeof t.result == "boolean", vc = (t) => {
  const o = /* @__PURE__ */ new Map([[0, () => {
  }]]), s = /* @__PURE__ */ new Map([[0, () => {
  }]]), c = /* @__PURE__ */ new Map(), f = new Worker(t);
  return f.addEventListener("message", ({ data: _ }) => {
    if (hc(_)) {
      const { params: { timerId: b, timerType: N } } = _;
      if (N === "interval") {
        const U = o.get(b);
        if (typeof U === void 0)
          throw new Error("The timer is in an undefined state.");
        if (typeof U == "number") {
          const se = c.get(U);
          if (se === void 0 || se.timerId !== b || se.timerType !== N)
            throw new Error("The timer is in an undefined state.");
        } else typeof U == "function" && U();
      } else if (N === "timeout") {
        const U = s.get(b);
        if (typeof U === void 0)
          throw new Error("The timer is in an undefined state.");
        if (typeof U == "number") {
          const se = c.get(U);
          if (se === void 0 || se.timerId !== b || se.timerType !== N)
            throw new Error("The timer is in an undefined state.");
        } else typeof U == "function" && (U(), s.delete(b));
      }
    } else if (pc(_)) {
      const { id: b } = _, N = c.get(b);
      if (N === void 0)
        throw new Error("The timer is in an undefined state.");
      const { timerId: U, timerType: se } = N;
      c.delete(b), se === "interval" ? o.delete(U) : s.delete(U);
    } else {
      const { error: { message: b } } = _;
      throw new Error(b);
    }
  }), {
    clearInterval: (_) => {
      if (typeof o.get(_) == "function") {
        const b = vn(c);
        c.set(b, { timerId: _, timerType: "interval" }), o.set(_, b), f.postMessage({
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
    setInterval: (_, b = 0, ...N) => {
      const U = vn(o);
      return o.set(U, () => {
        _(...N), typeof o.get(U) == "function" && f.postMessage({
          id: null,
          method: "set",
          params: {
            delay: b,
            now: performance.timeOrigin + performance.now(),
            timerId: U,
            timerType: "interval"
          }
        });
      }), f.postMessage({
        id: null,
        method: "set",
        params: {
          delay: b,
          now: performance.timeOrigin + performance.now(),
          timerId: U,
          timerType: "interval"
        }
      }), U;
    },
    setTimeout: (_, b = 0, ...N) => {
      const U = vn(s);
      return s.set(U, () => _(...N)), f.postMessage({
        id: null,
        method: "set",
        params: {
          delay: b,
          now: performance.timeOrigin + performance.now(),
          timerId: U,
          timerType: "timeout"
        }
      }), U;
    }
  };
}, wc = (t, o) => {
  let s = null;
  return () => {
    if (s !== null)
      return s;
    const c = new Blob([o], { type: "application/javascript; charset=utf-8" }), f = URL.createObjectURL(c);
    return s = t(f), setTimeout(() => URL.revokeObjectURL(f)), s;
  };
}, mc = `(()=>{"use strict";const e=new Map,t=new Map,r=t=>{const r=e.get(t);return void 0!==r&&(clearTimeout(r),e.delete(t),!0)},s=e=>{const r=t.get(e);return void 0!==r&&(clearTimeout(r),t.delete(e),!0)},o=(e,t)=>{const r=performance.now(),s=e+t-r-performance.timeOrigin;return{expected:r+s,remainingDelay:s}},i=(e,t,r,s)=>{const o=r-performance.now();o>0?e.set(t,setTimeout(i,o,e,t,r,s)):(e.delete(t),postMessage({id:null,method:"call",params:{timerId:t,timerType:s}}))};addEventListener("message",(n=>{let{data:a}=n;try{if("clear"===a.method){const{id:e,params:{timerId:t,timerType:o}}=a;if("interval"===o)postMessage({id:e,result:r(t)});else{if("timeout"!==o)throw new Error('The given type "'.concat(o,'" is not supported'));postMessage({id:e,result:s(t)})}}else{if("set"!==a.method)throw new Error('The given method "'.concat(a.method,'" is not supported'));{const{params:{delay:r,now:s,timerId:n,timerType:m}}=a;if("interval"===m)((t,r,s)=>{const{expected:n,remainingDelay:a}=o(t,s);e.set(r,setTimeout(i,a,e,r,n,"interval"))})(r,n,s);else{if("timeout"!==m)throw new Error('The given type "'.concat(m,'" is not supported'));((e,r,s)=>{const{expected:n,remainingDelay:a}=o(e,s);t.set(r,setTimeout(i,a,t,r,n,"timeout"))})(r,n,s)}}}}catch(e){postMessage({error:{message:e.message},id:a.id,result:null})}}))})();`, gc = wc(vc, mc), Gi = (t) => gc().clearTimeout(t);
/**
* @vue/shared v3.5.1
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
/*! #__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function yc(t, o) {
  const s = new Set(t.split(","));
  return (c) => s.has(c);
}
const Ji = Object.assign, Ec = Object.prototype.hasOwnProperty, uo = (t, o) => Ec.call(t, o), Tr = Array.isArray, Hr = (t) => fa(t) === "[object Map]", bc = (t) => typeof t == "string", Kr = (t) => typeof t == "symbol", Rn = (t) => t !== null && typeof t == "object", Pc = Object.prototype.toString, fa = (t) => Pc.call(t), la = (t) => fa(t).slice(8, -1), mo = (t) => bc(t) && t !== "NaN" && t[0] !== "-" && "" + parseInt(t, 10) === t, Tc = (t) => {
  const o = /* @__PURE__ */ Object.create(null);
  return (s) => o[s] || (o[s] = t(s));
}, Rc = Tc((t) => t.charAt(0).toUpperCase() + t.slice(1)), Or = (t, o) => !Object.is(t, o);
var Xe = {};
function Sr(t, ...o) {
  console.warn(`[Vue warn] ${t}`, ...o);
}
let ye;
const io = /* @__PURE__ */ new WeakSet();
class Ki {
  constructor(o) {
    this.fn = o, this.deps = void 0, this.depsTail = void 0, this.flags = 5, this.nextEffect = void 0, this.cleanup = void 0, this.scheduler = void 0;
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
    this.flags |= 2, Yi(this), pa(this);
    const o = ye, s = It;
    ye = this, It = !0;
    try {
      return this.fn();
    } finally {
      Xe.NODE_ENV !== "production" && ye !== this && Sr(
        "Active effect was not restored correctly - this is likely a Vue internal bug."
      ), va(this), ye = o, It = s, this.flags &= -3;
    }
  }
  stop() {
    if (this.flags & 1) {
      for (let o = this.deps; o; o = o.nextDep)
        Eo(o);
      this.deps = this.depsTail = void 0, Yi(this), this.onStop && this.onStop(), this.flags &= -2;
    }
  }
  trigger() {
    this.flags & 64 ? io.add(this) : this.scheduler ? this.scheduler() : this.runIfDirty();
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
let ha = 0, Vr;
function go() {
  ha++;
}
function yo() {
  if (--ha > 0)
    return;
  let t;
  for (; Vr; ) {
    let o = Vr;
    for (Vr = void 0; o; ) {
      const s = o.nextEffect;
      if (o.nextEffect = void 0, o.flags &= -9, o.flags & 1)
        try {
          o.trigger();
        } catch (c) {
          t || (t = c);
        }
      o = s;
    }
  }
  if (t) throw t;
}
function pa(t) {
  for (let o = t.deps; o; o = o.nextDep)
    o.version = -1, o.prevActiveLink = o.dep.activeLink, o.dep.activeLink = o;
}
function va(t) {
  let o, s = t.depsTail;
  for (let c = s; c; c = c.prevDep)
    c.version === -1 ? (c === s && (s = c.prevDep), Eo(c), xc(c)) : o = c, c.dep.activeLink = c.prevActiveLink, c.prevActiveLink = void 0;
  t.deps = o, t.depsTail = s;
}
function fo(t) {
  for (let o = t.deps; o; o = o.nextDep)
    if (o.dep.version !== o.version || o.dep.computed && Sc(o.dep.computed) === !1 || o.dep.version !== o.version)
      return !0;
  return !!t._dirty;
}
function Sc(t) {
  if (t.flags & 2)
    return !1;
  if (t.flags & 4 && !(t.flags & 16) || (t.flags &= -17, t.globalVersion === Pn))
    return;
  t.globalVersion = Pn;
  const o = t.dep;
  if (t.flags |= 2, o.version > 0 && !t.isSSR && !fo(t)) {
    t.flags &= -3;
    return;
  }
  const s = ye, c = It;
  ye = t, It = !0;
  try {
    pa(t);
    const f = t.fn();
    (o.version === 0 || Or(f, t._value)) && (t._value = f, o.version++);
  } catch (f) {
    throw o.version++, f;
  } finally {
    ye = s, It = c, va(t), t.flags &= -3;
  }
}
function Eo(t) {
  const { dep: o, prevSub: s, nextSub: c } = t;
  if (s && (s.nextSub = c, t.prevSub = void 0), c && (c.prevSub = s, t.nextSub = void 0), o.subs === t && (o.subs = s), !o.subs && o.computed) {
    o.computed.flags &= -5;
    for (let f = o.computed.deps; f; f = f.nextDep)
      Eo(f);
  }
}
function xc(t) {
  const { prevDep: o, nextDep: s } = t;
  o && (o.nextDep = s, t.prevDep = void 0), s && (s.prevDep = o, t.nextDep = void 0);
}
function Oc(t, o) {
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
let It = !0;
const wa = [];
function Ic() {
  wa.push(It), It = !1;
}
function Dc() {
  const t = wa.pop();
  It = t === void 0 ? !0 : t;
}
function Yi(t) {
  const { cleanup: o } = t;
  if (t.cleanup = void 0, o) {
    const s = ye;
    ye = void 0;
    try {
      o();
    } finally {
      ye = s;
    }
  }
}
let Pn = 0;
class ma {
  constructor(o) {
    this.computed = o, this.version = 0, this.activeLink = void 0, this.subs = void 0, Xe.NODE_ENV !== "production" && (this.subsHead = void 0);
  }
  track(o) {
    if (!ye || !It)
      return;
    let s = this.activeLink;
    if (s === void 0 || s.sub !== ye)
      s = this.activeLink = {
        dep: this,
        sub: ye,
        version: this.version,
        nextDep: void 0,
        prevDep: void 0,
        nextSub: void 0,
        prevSub: void 0,
        prevActiveLink: void 0
      }, ye.deps ? (s.prevDep = ye.depsTail, ye.depsTail.nextDep = s, ye.depsTail = s) : ye.deps = ye.depsTail = s, ye.flags & 4 && ga(s);
    else if (s.version === -1 && (s.version = this.version, s.nextDep)) {
      const c = s.nextDep;
      c.prevDep = s.prevDep, s.prevDep && (s.prevDep.nextDep = c), s.prevDep = ye.depsTail, s.nextDep = void 0, ye.depsTail.nextDep = s, ye.depsTail = s, ye.deps === s && (ye.deps = c);
    }
    return Xe.NODE_ENV !== "production" && ye.onTrack && ye.onTrack(
      Ji(
        {
          effect: ye
        },
        o
      )
    ), s;
  }
  trigger(o) {
    this.version++, Pn++, this.notify(o);
  }
  notify(o) {
    go();
    try {
      if (Xe.NODE_ENV !== "production")
        for (let s = this.subsHead; s; s = s.nextSub)
          Xe.NODE_ENV !== "production" && s.sub.onTrigger && !(s.sub.flags & 8) && s.sub.onTrigger(
            Ji(
              {
                effect: s.sub
              },
              o
            )
          );
      for (let s = this.subs; s; s = s.prevSub)
        s.sub.notify();
    } finally {
      yo();
    }
  }
}
function ga(t) {
  const o = t.dep.computed;
  if (o && !t.dep.subs) {
    o.flags |= 20;
    for (let c = o.deps; c; c = c.nextDep)
      ga(c);
  }
  const s = t.dep.subs;
  s !== t && (t.prevSub = s, s && (s.nextSub = t)), Xe.NODE_ENV !== "production" && t.dep.subsHead === void 0 && (t.dep.subsHead = t), t.dep.subs = t;
}
const lo = /* @__PURE__ */ new WeakMap(), fr = Symbol(
  Xe.NODE_ENV !== "production" ? "Object iterate" : ""
), ho = Symbol(
  Xe.NODE_ENV !== "production" ? "Map keys iterate" : ""
), Gr = Symbol(
  Xe.NODE_ENV !== "production" ? "Array iterate" : ""
);
function pt(t, o, s) {
  if (It && ye) {
    let c = lo.get(t);
    c || lo.set(t, c = /* @__PURE__ */ new Map());
    let f = c.get(s);
    f || c.set(s, f = new ma()), Xe.NODE_ENV !== "production" ? f.track({
      target: t,
      type: o,
      key: s
    }) : f.track();
  }
}
function Qt(t, o, s, c, f, v) {
  const R = lo.get(t);
  if (!R) {
    Pn++;
    return;
  }
  let y = [];
  if (o === "clear")
    y = [...R.values()];
  else {
    const I = Tr(t), _ = I && mo(s);
    if (I && s === "length") {
      const b = Number(c);
      R.forEach((N, U) => {
        (U === "length" || U === Gr || !Kr(U) && U >= b) && y.push(N);
      });
    } else {
      const b = (N) => N && y.push(N);
      switch (s !== void 0 && b(R.get(s)), _ && b(R.get(Gr)), o) {
        case "add":
          I ? _ && b(R.get("length")) : (b(R.get(fr)), Hr(t) && b(R.get(ho)));
          break;
        case "delete":
          I || (b(R.get(fr)), Hr(t) && b(R.get(ho)));
          break;
        case "set":
          Hr(t) && b(R.get(fr));
          break;
      }
    }
  }
  go();
  for (const I of y)
    Xe.NODE_ENV !== "production" ? I.trigger({
      target: t,
      type: o,
      key: s,
      newValue: c,
      oldValue: f,
      oldTarget: v
    }) : I.trigger();
  yo();
}
function br(t) {
  const o = Ee(t);
  return o === t ? o : (pt(o, "iterate", Gr), kt(t) ? o : o.map(ft));
}
function bo(t) {
  return pt(t = Ee(t), "iterate", Gr), t;
}
const Cc = {
  __proto__: null,
  [Symbol.iterator]() {
    return ao(this, Symbol.iterator, ft);
  },
  concat(...t) {
    return br(this).concat(
      ...t.map((o) => Tr(o) ? br(o) : o)
    );
  },
  entries() {
    return ao(this, "entries", (t) => (t[1] = ft(t[1]), t));
  },
  every(t, o) {
    return Ut(this, "every", t, o, void 0, arguments);
  },
  filter(t, o) {
    return Ut(this, "filter", t, o, (s) => s.map(ft), arguments);
  },
  find(t, o) {
    return Ut(this, "find", t, o, ft, arguments);
  },
  findIndex(t, o) {
    return Ut(this, "findIndex", t, o, void 0, arguments);
  },
  findLast(t, o) {
    return Ut(this, "findLast", t, o, ft, arguments);
  },
  findLastIndex(t, o) {
    return Ut(this, "findLastIndex", t, o, void 0, arguments);
  },
  // flat, flatMap could benefit from ARRAY_ITERATE but are not straight-forward to implement
  forEach(t, o) {
    return Ut(this, "forEach", t, o, void 0, arguments);
  },
  includes(...t) {
    return so(this, "includes", t);
  },
  indexOf(...t) {
    return so(this, "indexOf", t);
  },
  join(t) {
    return br(this).join(t);
  },
  // keys() iterator only reads `length`, no optimisation required
  lastIndexOf(...t) {
    return so(this, "lastIndexOf", t);
  },
  map(t, o) {
    return Ut(this, "map", t, o, void 0, arguments);
  },
  pop() {
    return $r(this, "pop");
  },
  push(...t) {
    return $r(this, "push", t);
  },
  reduce(t, ...o) {
    return Zi(this, "reduce", t, o);
  },
  reduceRight(t, ...o) {
    return Zi(this, "reduceRight", t, o);
  },
  shift() {
    return $r(this, "shift");
  },
  // slice could use ARRAY_ITERATE but also seems to beg for range tracking
  some(t, o) {
    return Ut(this, "some", t, o, void 0, arguments);
  },
  splice(...t) {
    return $r(this, "splice", t);
  },
  toReversed() {
    return br(this).toReversed();
  },
  toSorted(t) {
    return br(this).toSorted(t);
  },
  toSpliced(...t) {
    return br(this).toSpliced(...t);
  },
  unshift(...t) {
    return $r(this, "unshift", t);
  },
  values() {
    return ao(this, "values", ft);
  }
};
function ao(t, o, s) {
  const c = bo(t), f = c[o]();
  return c !== t && !kt(t) && (f._next = f.next, f.next = () => {
    const v = f._next();
    return v.value && (v.value = s(v.value)), v;
  }), f;
}
const _c = Array.prototype;
function Ut(t, o, s, c, f, v) {
  const R = bo(t), y = R !== t && !kt(t), I = R[o];
  if (I !== _c[o]) {
    const N = I.apply(t, v);
    return y ? ft(N) : N;
  }
  let _ = s;
  R !== t && (y ? _ = function(N, U) {
    return s.call(this, ft(N), U, t);
  } : s.length > 2 && (_ = function(N, U) {
    return s.call(this, N, U, t);
  }));
  const b = I.call(R, _, c);
  return y && f ? f(b) : b;
}
function Zi(t, o, s, c) {
  const f = bo(t);
  let v = s;
  return f !== t && (kt(t) ? s.length > 3 && (v = function(R, y, I) {
    return s.call(this, R, y, I, t);
  }) : v = function(R, y, I) {
    return s.call(this, R, ft(y), I, t);
  }), f[o](v, ...c);
}
function so(t, o, s) {
  const c = Ee(t);
  pt(c, "iterate", Gr);
  const f = c[o](...s);
  return (f === -1 || f === !1) && Yc(s[0]) ? (s[0] = Ee(s[0]), c[o](...s)) : f;
}
function $r(t, o, s = []) {
  Ic(), go();
  const c = Ee(t)[o].apply(t, s);
  return yo(), Dc(), c;
}
const Nc = /* @__PURE__ */ yc("__proto__,__v_isRef,__isVue"), ya = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((t) => t !== "arguments" && t !== "caller").map((t) => Symbol[t]).filter(Kr)
);
function Ac(t) {
  Kr(t) || (t = String(t));
  const o = Ee(this);
  return pt(o, "has", t), o.hasOwnProperty(t);
}
class Ea {
  constructor(o = !1, s = !1) {
    this._isReadonly = o, this._isShallow = s;
  }
  get(o, s, c) {
    const f = this._isReadonly, v = this._isShallow;
    if (s === "__v_isReactive")
      return !f;
    if (s === "__v_isReadonly")
      return f;
    if (s === "__v_isShallow")
      return v;
    if (s === "__v_raw")
      return c === (f ? v ? Gc : Ra : v ? Vc : Ta).get(o) || // receiver is not the reactive proxy, but has the same prototype
      // this means the receiver is a user proxy of the reactive proxy
      Object.getPrototypeOf(o) === Object.getPrototypeOf(c) ? o : void 0;
    const R = Tr(o);
    if (!f) {
      let I;
      if (R && (I = Cc[s]))
        return I;
      if (s === "hasOwnProperty")
        return Ac;
    }
    const y = Reflect.get(
      o,
      s,
      // if this is a proxy wrapping a ref, return methods using the raw ref
      // as receiver so that we don't have to call `toRaw` on the ref in all
      // its class methods
      Rr(o) ? o : c
    );
    return (Kr(s) ? ya.has(s) : Nc(s)) || (f || pt(o, "get", s), v) ? y : Rr(y) ? R && mo(s) ? y : y.value : Rn(y) ? f ? xa(y) : Sa(y) : y;
  }
}
class Wc extends Ea {
  constructor(o = !1) {
    super(!1, o);
  }
  set(o, s, c, f) {
    let v = o[s];
    if (!this._isShallow) {
      const I = xr(v);
      if (!kt(c) && !xr(c) && (v = Ee(v), c = Ee(c)), !Tr(o) && Rr(v) && !Rr(c))
        return I ? !1 : (v.value = c, !0);
    }
    const R = Tr(o) && mo(s) ? Number(s) < o.length : uo(o, s), y = Reflect.set(
      o,
      s,
      c,
      Rr(o) ? o : f
    );
    return o === Ee(f) && (R ? Or(c, v) && Qt(o, "set", s, c, v) : Qt(o, "add", s, c)), y;
  }
  deleteProperty(o, s) {
    const c = uo(o, s), f = o[s], v = Reflect.deleteProperty(o, s);
    return v && c && Qt(o, "delete", s, void 0, f), v;
  }
  has(o, s) {
    const c = Reflect.has(o, s);
    return (!Kr(s) || !ya.has(s)) && pt(o, "has", s), c;
  }
  ownKeys(o) {
    return pt(
      o,
      "iterate",
      Tr(o) ? "length" : fr
    ), Reflect.ownKeys(o);
  }
}
class Mc extends Ea {
  constructor(o = !1) {
    super(!0, o);
  }
  set(o, s) {
    return Xe.NODE_ENV !== "production" && Sr(
      `Set operation on key "${String(s)}" failed: target is readonly.`,
      o
    ), !0;
  }
  deleteProperty(o, s) {
    return Xe.NODE_ENV !== "production" && Sr(
      `Delete operation on key "${String(s)}" failed: target is readonly.`,
      o
    ), !0;
  }
}
const Fc = /* @__PURE__ */ new Wc(), zc = /* @__PURE__ */ new Mc(), Po = (t) => t, Sn = (t) => Reflect.getPrototypeOf(t);
function wn(t, o, s = !1, c = !1) {
  t = t.__v_raw;
  const f = Ee(t), v = Ee(o);
  s || (Or(o, v) && pt(f, "get", o), pt(f, "get", v));
  const { has: R } = Sn(f), y = c ? Po : s ? To : ft;
  if (R.call(f, o))
    return y(t.get(o));
  if (R.call(f, v))
    return y(t.get(v));
  t !== f && t.get(o);
}
function mn(t, o = !1) {
  const s = this.__v_raw, c = Ee(s), f = Ee(t);
  return o || (Or(t, f) && pt(c, "has", t), pt(c, "has", f)), t === f ? s.has(t) : s.has(t) || s.has(f);
}
function gn(t, o = !1) {
  return t = t.__v_raw, !o && pt(Ee(t), "iterate", fr), Reflect.get(t, "size", t);
}
function Xi(t, o = !1) {
  !o && !kt(t) && !xr(t) && (t = Ee(t));
  const s = Ee(this);
  return Sn(s).has.call(s, t) || (s.add(t), Qt(s, "add", t, t)), this;
}
function Qi(t, o, s = !1) {
  !s && !kt(o) && !xr(o) && (o = Ee(o));
  const c = Ee(this), { has: f, get: v } = Sn(c);
  let R = f.call(c, t);
  R ? Xe.NODE_ENV !== "production" && Pa(c, f, t) : (t = Ee(t), R = f.call(c, t));
  const y = v.call(c, t);
  return c.set(t, o), R ? Or(o, y) && Qt(c, "set", t, o, y) : Qt(c, "add", t, o), this;
}
function ki(t) {
  const o = Ee(this), { has: s, get: c } = Sn(o);
  let f = s.call(o, t);
  f ? Xe.NODE_ENV !== "production" && Pa(o, s, t) : (t = Ee(t), f = s.call(o, t));
  const v = c ? c.call(o, t) : void 0, R = o.delete(t);
  return f && Qt(o, "delete", t, void 0, v), R;
}
function ea() {
  const t = Ee(this), o = t.size !== 0, s = Xe.NODE_ENV !== "production" ? Hr(t) ? new Map(t) : new Set(t) : void 0, c = t.clear();
  return o && Qt(t, "clear", void 0, void 0, s), c;
}
function yn(t, o) {
  return function(c, f) {
    const v = this, R = v.__v_raw, y = Ee(R), I = o ? Po : t ? To : ft;
    return !t && pt(y, "iterate", fr), R.forEach((_, b) => c.call(f, I(_), I(b), v));
  };
}
function En(t, o, s) {
  return function(...c) {
    const f = this.__v_raw, v = Ee(f), R = Hr(v), y = t === "entries" || t === Symbol.iterator && R, I = t === "keys" && R, _ = f[t](...c), b = s ? Po : o ? To : ft;
    return !o && pt(
      v,
      "iterate",
      I ? ho : fr
    ), {
      // iterator protocol
      next() {
        const { value: N, done: U } = _.next();
        return U ? { value: N, done: U } : {
          value: y ? [b(N[0]), b(N[1])] : b(N),
          done: U
        };
      },
      // iterable protocol
      [Symbol.iterator]() {
        return this;
      }
    };
  };
}
function Xt(t) {
  return function(...o) {
    if (Xe.NODE_ENV !== "production") {
      const s = o[0] ? `on key "${o[0]}" ` : "";
      Sr(
        `${Rc(t)} operation ${s}failed: target is readonly.`,
        Ee(this)
      );
    }
    return t === "delete" ? !1 : t === "clear" ? void 0 : this;
  };
}
function Uc() {
  const t = {
    get(v) {
      return wn(this, v);
    },
    get size() {
      return gn(this);
    },
    has: mn,
    add: Xi,
    set: Qi,
    delete: ki,
    clear: ea,
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
      return Xi.call(this, v, !0);
    },
    set(v, R) {
      return Qi.call(this, v, R, !0);
    },
    delete: ki,
    clear: ea,
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
    add: Xt("add"),
    set: Xt("set"),
    delete: Xt("delete"),
    clear: Xt("clear"),
    forEach: yn(!0, !1)
  }, c = {
    get(v) {
      return wn(this, v, !0, !0);
    },
    get size() {
      return gn(this, !0);
    },
    has(v) {
      return mn.call(this, v, !0);
    },
    add: Xt("add"),
    set: Xt("set"),
    delete: Xt("delete"),
    clear: Xt("clear"),
    forEach: yn(!0, !0)
  };
  return [
    "keys",
    "values",
    "entries",
    Symbol.iterator
  ].forEach((v) => {
    t[v] = En(v, !1, !1), s[v] = En(v, !0, !1), o[v] = En(v, !1, !0), c[v] = En(
      v,
      !0,
      !0
    );
  }), [
    t,
    s,
    o,
    c
  ];
}
const [
  Lc,
  jc,
  Bc,
  qc
] = /* @__PURE__ */ Uc();
function ba(t, o) {
  const s = o ? t ? qc : Bc : t ? jc : Lc;
  return (c, f, v) => f === "__v_isReactive" ? !t : f === "__v_isReadonly" ? t : f === "__v_raw" ? c : Reflect.get(
    uo(s, f) && f in c ? s : c,
    f,
    v
  );
}
const $c = {
  get: /* @__PURE__ */ ba(!1, !1)
}, Hc = {
  get: /* @__PURE__ */ ba(!0, !1)
};
function Pa(t, o, s) {
  const c = Ee(s);
  if (c !== s && o.call(t, c)) {
    const f = la(t);
    Sr(
      `Reactive ${f} contains both the raw and reactive versions of the same object${f === "Map" ? " as keys" : ""}, which can lead to inconsistencies. Avoid differentiating between the raw and reactive versions of an object and only use the reactive version if possible.`
    );
  }
}
const Ta = /* @__PURE__ */ new WeakMap(), Vc = /* @__PURE__ */ new WeakMap(), Ra = /* @__PURE__ */ new WeakMap(), Gc = /* @__PURE__ */ new WeakMap();
function Jc(t) {
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
function Kc(t) {
  return t.__v_skip || !Object.isExtensible(t) ? 0 : Jc(la(t));
}
function Sa(t) {
  return xr(t) ? t : Oa(
    t,
    !1,
    Fc,
    $c,
    Ta
  );
}
function xa(t) {
  return Oa(
    t,
    !0,
    zc,
    Hc,
    Ra
  );
}
function Oa(t, o, s, c, f) {
  if (!Rn(t))
    return Xe.NODE_ENV !== "production" && Sr(
      `value cannot be made ${o ? "readonly" : "reactive"}: ${String(
        t
      )}`
    ), t;
  if (t.__v_raw && !(o && t.__v_isReactive))
    return t;
  const v = f.get(t);
  if (v)
    return v;
  const R = Kc(t);
  if (R === 0)
    return t;
  const y = new Proxy(
    t,
    R === 2 ? c : s
  );
  return f.set(t, y), y;
}
function xr(t) {
  return !!(t && t.__v_isReadonly);
}
function kt(t) {
  return !!(t && t.__v_isShallow);
}
function Yc(t) {
  return t ? !!t.__v_raw : !1;
}
function Ee(t) {
  const o = t && t.__v_raw;
  return o ? Ee(o) : t;
}
const ft = (t) => Rn(t) ? Sa(t) : t, To = (t) => Rn(t) ? xa(t) : t;
function Rr(t) {
  return t ? t.__v_isRef === !0 : !1;
}
function jt(t) {
  return Zc(t, !1);
}
function Zc(t, o) {
  return Rr(t) ? t : new Xc(t, o);
}
class Xc {
  constructor(o, s) {
    this.dep = new ma(), this.__v_isRef = !0, this.__v_isShallow = !1, this._rawValue = s ? o : Ee(o), this._value = s ? o : ft(o), this.__v_isShallow = s;
  }
  get value() {
    return Xe.NODE_ENV !== "production" ? this.dep.track({
      target: this,
      type: "get",
      key: "value"
    }) : this.dep.track(), this._value;
  }
  set value(o) {
    const s = this._rawValue, c = this.__v_isShallow || kt(o) || xr(o);
    o = c ? o : Ee(o), Or(o, s) && (this._rawValue = o, this._value = c ? o : ft(o), Xe.NODE_ENV !== "production" ? this.dep.trigger({
      target: this,
      type: "set",
      key: "value",
      newValue: o,
      oldValue: s
    }) : this.dep.trigger());
  }
}
function Qc() {
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
async function kc(t) {
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
var eu = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, Ia = { exports: {} };
(function(t, o) {
  (function(s, c) {
    t.exports = c();
  })(typeof self < "u" ? self : eu, function() {
    return function(s) {
      var c = {};
      function f(v) {
        if (c[v]) return c[v].exports;
        var R = c[v] = {
          i: v,
          l: !1,
          exports: {}
        };
        return s[v].call(R.exports, R, R.exports, f), R.l = !0, R.exports;
      }
      return f.m = s, f.c = c, f.d = function(v, R, y) {
        f.o(v, R) || Object.defineProperty(v, R, {
          enumerable: !0,
          get: y
        });
      }, f.r = function(v) {
        typeof Symbol < "u" && Symbol.toStringTag && Object.defineProperty(v, Symbol.toStringTag, {
          value: "Module"
        }), Object.defineProperty(v, "__esModule", {
          value: !0
        });
      }, f.t = function(v, R) {
        if (1 & R && (v = f(v)), 8 & R || 4 & R && typeof v == "object" && v && v.__esModule) return v;
        var y = /* @__PURE__ */ Object.create(null);
        if (f.r(y), Object.defineProperty(y, "default", {
          enumerable: !0,
          value: v
        }), 2 & R && typeof v != "string") for (var I in v) f.d(y, I, (function(_) {
          return v[_];
        }).bind(null, I));
        return y;
      }, f.n = function(v) {
        var R = v && v.__esModule ? function() {
          return v.default;
        } : function() {
          return v;
        };
        return f.d(R, "a", R), R;
      }, f.o = function(v, R) {
        return {}.hasOwnProperty.call(v, R);
      }, f.p = "", f(f.s = 0);
    }([function(s, c, f) {
      f.r(c), f.d(c, "PopupOpenError", function() {
        return zn;
      }), f.d(c, "create", function() {
        return os;
      }), f.d(c, "destroy", function() {
        return is;
      }), f.d(c, "destroyComponents", function() {
        return Oi;
      }), f.d(c, "destroyAll", function() {
        return Ii;
      }), f.d(c, "PROP_TYPE", function() {
        return be;
      }), f.d(c, "PROP_SERIALIZATION", function() {
        return ln;
      }), f.d(c, "CONTEXT", function() {
        return Ce;
      }), f.d(c, "EVENT", function() {
        return xe;
      });
      function v(e, r) {
        return (v = Object.setPrototypeOf || function(n, i) {
          return n.__proto__ = i, n;
        })(e, r);
      }
      function R(e, r) {
        e.prototype = Object.create(r.prototype), e.prototype.constructor = e, v(e, r);
      }
      function y() {
        return (y = Object.assign || function(e) {
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
      var _ = [], b = [], N = 0, U;
      function se() {
        if (!N && U) {
          var e = U;
          U = null, e.resolve();
        }
      }
      function ae() {
        N += 1;
      }
      function it() {
        N -= 1, se();
      }
      var p = function() {
        function e(n) {
          var i = this;
          if (this.resolved = void 0, this.rejected = void 0, this.errorHandled = void 0, this.value = void 0, this.error = void 0, this.handlers = void 0, this.dispatching = void 0, this.stack = void 0, this.resolved = !1, this.rejected = !1, this.errorHandled = !1, this.handlers = [], n) {
            var a, u, d = !1, h = !1, l = !1;
            ae();
            try {
              n(function(m) {
                l ? i.resolve(m) : (d = !0, a = m);
              }, function(m) {
                l ? i.reject(m) : (h = !0, u = m);
              });
            } catch (m) {
              it(), this.reject(m);
              return;
            }
            it(), l = !0, d ? this.resolve(a) : h && this.reject(u);
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
            i.errorHandled || function(u, d) {
              if (_.indexOf(u) === -1) {
                _.push(u), setTimeout(function() {
                  throw u;
                }, 1);
                for (var h = 0; h < b.length; h++) b[h](u, d);
              }
            }(n, i);
          }, 1), this.dispatch(), this;
        }, r.asyncReject = function(n) {
          return this.errorHandled = !0, this.reject(n), this;
        }, r.dispatch = function() {
          var n = this.resolved, i = this.rejected, a = this.handlers;
          if (!this.dispatching && (n || i)) {
            this.dispatching = !0, ae();
            for (var u = function(E, T) {
              return E.then(function(S) {
                T.resolve(S);
              }, function(S) {
                T.reject(S);
              });
            }, d = 0; d < a.length; d++) {
              var h = a[d], l = h.onSuccess, m = h.onError, P = h.promise, g = void 0;
              if (n) try {
                g = l ? l(this.value) : this.value;
              } catch (E) {
                P.reject(E);
                continue;
              }
              else if (i) {
                if (!m) {
                  P.reject(this.error);
                  continue;
                }
                try {
                  g = m(this.error);
                } catch (E) {
                  P.reject(E);
                  continue;
                }
              }
              if (g instanceof e && (g.resolved || g.rejected)) {
                var w = g;
                w.resolved ? P.resolve(w.value) : P.reject(w.error), w.errorHandled = !0;
              } else I(g) ? g instanceof e && (g.resolved || g.rejected) ? g.resolved ? P.resolve(g.value) : P.reject(g.error) : u(g, P) : P.resolve(g);
            }
            a.length = 0, this.dispatching = !1, it();
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
          var u = setTimeout(function() {
            a.resolved || a.rejected || a.reject(i || new Error("Promise timed out after " + n + "ms"));
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
          return n instanceof e ? n : I(n) ? new e(function(i, a) {
            return n.then(i, a);
          }) : new e().resolve(n);
        }, e.reject = function(n) {
          return new e().reject(n);
        }, e.asyncReject = function(n) {
          return new e().asyncReject(n);
        }, e.all = function(n) {
          var i = new e(), a = n.length, u = [].slice();
          if (!a)
            return i.resolve(u), i;
          for (var d = function(m, P, g) {
            return P.then(function(w) {
              u[m] = w, (a -= 1) == 0 && i.resolve(u);
            }, function(w) {
              g.reject(w);
            });
          }, h = 0; h < n.length; h++) {
            var l = n[h];
            if (l instanceof e) {
              if (l.resolved) {
                u[h] = l.value, a -= 1;
                continue;
              }
            } else if (!I(l)) {
              u[h] = l, a -= 1;
              continue;
            }
            d(h, e.resolve(l), i);
          }
          return a === 0 && i.resolve(u), i;
        }, e.hash = function(n) {
          var i = {}, a = [], u = function(h) {
            if (n.hasOwnProperty(h)) {
              var l = n[h];
              I(l) ? a.push(l.then(function(m) {
                i[h] = m;
              })) : i[h] = l;
            }
          };
          for (var d in n) u(d);
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
          var u;
          ae();
          try {
            u = n.apply(i, a || []);
          } catch (d) {
            return it(), e.reject(d);
          }
          return it(), e.resolve(u);
        }, e.delay = function(n) {
          return new e(function(i) {
            setTimeout(i, n);
          });
        }, e.isPromise = function(n) {
          return !!(n && n instanceof e) || I(n);
        }, e.flush = function() {
          return function(n) {
            var i = U = U || new n();
            return se(), i;
          }(e);
        }, e;
      }();
      function A(e) {
        return {}.toString.call(e) === "[object RegExp]";
      }
      var B = {
        IFRAME: "iframe",
        POPUP: "popup"
      }, ie = `Call was rejected by callee.\r
`;
      function we(e) {
        return e === void 0 && (e = window), e.location.protocol;
      }
      function Re(e) {
        if (e === void 0 && (e = window), e.mockDomain) {
          var r = e.mockDomain.split("//")[0];
          if (r) return r;
        }
        return we(e);
      }
      function Ne(e) {
        return e === void 0 && (e = window), Re(e) === "about:";
      }
      function ve(e) {
        if (e === void 0 && (e = window), e) try {
          if (e.parent && e.parent !== e) return e.parent;
        } catch {
        }
      }
      function Y(e) {
        if (e === void 0 && (e = window), e && !ve(e)) try {
          return e.opener;
        } catch {
        }
      }
      function he(e) {
        try {
          return !0;
        } catch {
        }
        return !1;
      }
      function Ae(e) {
        e === void 0 && (e = window);
        var r = e.location;
        if (!r) throw new Error("Can not read window location");
        var n = we(e);
        if (!n) throw new Error("Can not read window protocol");
        if (n === "file:") return "file://";
        if (n === "about:") {
          var i = ve(e);
          return i && he() ? Ae(i) : "about://";
        }
        var a = r.host;
        if (!a) throw new Error("Can not read window host");
        return n + "//" + a;
      }
      function z(e) {
        e === void 0 && (e = window);
        var r = Ae(e);
        return r && e.mockDomain && e.mockDomain.indexOf("mock:") === 0 ? e.mockDomain : r;
      }
      function C(e) {
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
            if (Ne(r) && he()) return !0;
          } catch {
          }
          try {
            if (function(i) {
              return i === void 0 && (i = window), Re(i) === "mock:";
            }(r) && he()) return !0;
          } catch {
          }
          try {
            if (Ae(r) === Ae(window)) return !0;
          } catch {
          }
          return !1;
        }(e)) return !1;
        try {
          if (e === window || Ne(e) && he() || z(window) === z(e)) return !0;
        } catch {
        }
        return !1;
      }
      function oe(e) {
        if (!C(e)) throw new Error("Expected window to be same domain");
        return e;
      }
      function Qe(e, r) {
        if (!e || !r) return !1;
        var n = ve(r);
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
      function at(e) {
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
      function je(e) {
        for (var r = [], n = 0, i = at(e); n < i.length; n++) {
          var a = i[n];
          r.push(a);
          for (var u = 0, d = je(a); u < d.length; u++) r.push(d[u]);
        }
        return r;
      }
      function st(e) {
        e === void 0 && (e = window);
        try {
          if (e.top) return e.top;
        } catch {
        }
        if (ve(e) === e) return e;
        try {
          if (Qe(window, e) && window.top) return window.top;
        } catch {
        }
        try {
          if (Qe(e, window) && window.top) return window.top;
        } catch {
        }
        for (var r = 0, n = je(e); r < n.length; r++) {
          var i = n[r];
          try {
            if (i.top) return i.top;
          } catch {
          }
          if (ve(i) === i) return i;
        }
      }
      function lt(e) {
        var r = st(e);
        if (!r) throw new Error("Can not determine top window");
        var n = [].concat(je(r), [r]);
        return n.indexOf(e) === -1 && (n = [].concat(n, [e], je(e))), n;
      }
      var er = [], Yr = [];
      function We(e, r) {
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
          return !a || a.message !== ie;
        }
        if (r && C(e)) try {
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
        }(er, e);
        if (n !== -1) {
          var i = Yr[n];
          if (i && function(a) {
            if (!a.contentWindow || !a.parentNode) return !0;
            var u = a.ownerDocument;
            if (u && u.documentElement && !u.documentElement.contains(a)) {
              for (var d = a; d.parentNode && d.parentNode !== d; ) d = d.parentNode;
              if (!d.host || !u.documentElement.contains(d.host)) return !0;
            }
            return !1;
          }(i)) return !0;
        }
        return !1;
      }
      function lr(e) {
        return (e = e || window).navigator.mockUserAgent || e.navigator.userAgent;
      }
      function hr(e, r) {
        for (var n = at(e), i = 0; i < n.length; i++) {
          var a = n[i];
          try {
            if (C(a) && a.name === r && n.indexOf(a) !== -1) return a;
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
      function Ir(e, r) {
        return e === Y(r);
      }
      function tr(e) {
        return e === void 0 && (e = window), Y(e = e || window) || ve(e) || void 0;
      }
      function Dr(e, r) {
        for (var n = 0; n < e.length; n++)
          for (var i = e[n], a = 0; a < r.length; a++) if (i === r[a]) return !0;
        return !1;
      }
      function pr(e) {
        e === void 0 && (e = window);
        for (var r = 0, n = e; n; ) (n = ve(n)) && (r += 1);
        return r;
      }
      function Zr(e, r) {
        var n = st(e) || e, i = st(r) || r;
        try {
          if (n && i) return n === i;
        } catch {
        }
        var a = lt(e), u = lt(r);
        if (Dr(a, u)) return !0;
        var d = Y(n), h = Y(i);
        return d && Dr(lt(d), u) || h && Dr(lt(h), a), !1;
      }
      function vt(e, r) {
        if (typeof e == "string") {
          if (typeof r == "string") return e === "*" || r === e;
          if (A(r) || Array.isArray(r)) return !1;
        }
        return A(e) ? A(r) ? e.toString() === r.toString() : !Array.isArray(r) && !!r.match(e) : !!Array.isArray(e) && (Array.isArray(r) ? JSON.stringify(e) === JSON.stringify(r) : !A(r) && e.some(function(n) {
          return vt(n, r);
        }));
      }
      function Nt(e) {
        return e.match(/^(https?|mock|file):\/\//) ? e.split("/").slice(0, 3).join("/") : z();
      }
      function Ro(e, r, n, i) {
        n === void 0 && (n = 1e3), i === void 0 && (i = 1 / 0);
        var a;
        return function u() {
          if (We(e))
            return a && clearTimeout(a), r();
          i <= 0 ? clearTimeout(a) : (i -= n, a = setTimeout(u, n));
        }(), {
          cancel: function() {
            a && clearTimeout(a);
          }
        };
      }
      function rr(e) {
        try {
          if (e === window) return !0;
        } catch (r) {
          if (r && r.message === ie) return !0;
        }
        try {
          if ({}.toString.call(e) === "[object Window]") return !0;
        } catch (r) {
          if (r && r.message === ie) return !0;
        }
        try {
          if (window.Window && e instanceof window.Window) return !0;
        } catch (r) {
          if (r && r.message === ie) return !0;
        }
        try {
          if (e && e.self === e) return !0;
        } catch (r) {
          if (r && r.message === ie) return !0;
        }
        try {
          if (e && e.parent === e) return !0;
        } catch (r) {
          if (r && r.message === ie) return !0;
        }
        try {
          if (e && e.top === e) return !0;
        } catch (r) {
          if (r && r.message === ie) return !0;
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
      function xn(e) {
        if (r = Nt(e), r.indexOf("mock:") !== 0) return e;
        var r;
        throw new Error("Mock urls not supported out of test mode");
      }
      function So(e) {
        if (C(e)) return oe(e).frameElement;
        for (var r = 0, n = document.querySelectorAll("iframe"); r < n.length; r++) {
          var i = n[r];
          if (i && i.contentWindow && i.contentWindow === e) return i;
        }
      }
      function xo(e) {
        if (function(n) {
          return n === void 0 && (n = window), !!ve(n);
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
      function Xr(e, r) {
        for (var n = 0; n < e.length; n++) try {
          if (e[n] === r) return n;
        } catch {
        }
        return -1;
      }
      var Qr = function() {
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
            var u = i[a];
            if (rr(u) && We(u)) {
              if (n) try {
                n.delete(u);
              } catch {
              }
              i.splice(a, 1), this.values.splice(a, 1), a -= 1;
            }
          }
        }, r.isSafeToReadWrite = function(n) {
          return !rr(n);
        }, r.set = function(n, i) {
          if (!n) throw new Error("WeakMap expected key");
          var a = this.weakmap;
          if (a) try {
            a.set(n, i);
          } catch {
            delete this.weakmap;
          }
          if (this.isSafeToReadWrite(n)) try {
            var u = this.name, d = n[u];
            d && d[0] === n ? d[1] = i : Object.defineProperty(n, u, {
              value: [n, i],
              writable: !0
            });
            return;
          } catch {
          }
          this._cleanupClosedWindows();
          var h = this.keys, l = this.values, m = Xr(h, n);
          m === -1 ? (h.push(n), l.push(i)) : l[m] = i;
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
          var u = Xr(this.keys, n);
          if (u !== -1) return this.values[u];
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
          var u = this.keys, d = Xr(u, n);
          d !== -1 && (u.splice(d, 1), this.values.splice(d, 1));
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
          return this._cleanupClosedWindows(), Xr(this.keys, n) !== -1;
        }, r.getOrSet = function(n, i) {
          if (this.has(n)) return this.get(n);
          var a = i();
          return this.set(n, a), a;
        }, e;
      }();
      function Oo(e) {
        return (Oo = Object.setPrototypeOf ? Object.getPrototypeOf : function(r) {
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
      function Io(e, r, n) {
        return (Io = _a() ? Reflect.construct : function(i, a, u) {
          var d = [null];
          d.push.apply(d, a);
          var h = new (Function.bind.apply(i, d))();
          return u && v(h, u.prototype), h;
        }).apply(null, arguments);
      }
      function Do(e) {
        var r = typeof Map == "function" ? /* @__PURE__ */ new Map() : void 0;
        return (Do = function(n) {
          if (n === null || (i = n, Function.toString.call(i).indexOf("[native code]") === -1)) return n;
          var i;
          if (typeof n != "function") throw new TypeError("Super expression must either be null or a function");
          if (r !== void 0) {
            if (r.has(n)) return r.get(n);
            r.set(n, a);
          }
          function a() {
            return Io(n, arguments, Oo(this).constructor);
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
      function In(e) {
        return e.name || e.__name__ || e.displayName || "anonymous";
      }
      function Dn(e, r) {
        try {
          delete e.name, e.name = r;
        } catch {
        }
        return e.__name__ = e.displayName = r, e;
      }
      function Cn(e) {
        if (typeof btoa == "function") return btoa(encodeURIComponent(e).replace(/%([0-9A-F]{2})/g, function(r, n) {
          return String.fromCharCode(parseInt(n, 16));
        })).replace(/[=]/g, "");
        if (typeof Buffer < "u") return Buffer.from(e, "utf8").toString("base64").replace(/[=]/g, "");
        throw new Error("Can not find window.btoa or Buffer");
      }
      function rt() {
        var e = "0123456789abcdef";
        return "uid_" + "xxxxxxxxxx".replace(/./g, function() {
          return e.charAt(Math.floor(Math.random() * e.length));
        }) + "_" + Cn((/* @__PURE__ */ new Date()).toISOString().slice(11, 19).replace("T", ".")).replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
      }
      var kr;
      function _n(e) {
        try {
          return JSON.stringify([].slice.call(e), function(r, n) {
            return typeof n == "function" ? "memoize[" + function(i) {
              if (kr = kr || new Qr(), i == null || typeof i != "object" && typeof i != "function") throw new Error("Invalid object");
              var a = kr.get(i);
              return a || (a = typeof i + ":" + rt(), kr.set(i, a)), a;
            }(n) + "]" : On(n) ? {} : n;
          });
        } catch {
          throw new Error("Arguments not serializable -- can not be used to memoize");
        }
      }
      function Na() {
        return {};
      }
      var Cr = 0, Co = 0;
      function Bt(e, r) {
        r === void 0 && (r = {});
        var n = r.thisNamespace, i = n !== void 0 && n, a = r.time, u, d, h = Cr;
        Cr += 1;
        var l = function() {
          for (var m = arguments.length, P = new Array(m), g = 0; g < m; g++) P[g] = arguments[g];
          h < Co && (u = null, d = null, h = Cr, Cr += 1);
          var w;
          w = i ? (d = d || new Qr()).getOrSet(this, Na) : u = u || {};
          var E;
          try {
            E = _n(P);
          } catch {
            return e.apply(this, arguments);
          }
          var T = w[E];
          if (T && a && Date.now() - T.time < a && (delete w[E], T = null), T) return T.value;
          var S = Date.now(), x = e.apply(this, arguments);
          return w[E] = {
            time: S,
            value: x
          }, x;
        };
        return l.reset = function() {
          u = null, d = null;
        }, Dn(l, (r.name || In(e)) + "::memoized");
      }
      Bt.clear = function() {
        Co = Cr;
      };
      function Aa(e) {
        var r = {};
        function n() {
          for (var i = arguments, a = this, u = arguments.length, d = new Array(u), h = 0; h < u; h++) d[h] = arguments[h];
          var l = _n(d);
          return r.hasOwnProperty(l) || (r[l] = p.try(function() {
            return e.apply(a, i);
          }).finally(function() {
            delete r[l];
          })), r[l];
        }
        return n.reset = function() {
          r = {};
        }, Dn(n, In(e) + "::promiseMemoized");
      }
      function Se() {
      }
      function en(e) {
        var r = !1;
        return Dn(function() {
          if (!r)
            return r = !0, e.apply(this, arguments);
        }, In(e) + "::once");
      }
      function vr(e, r) {
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
          return "Error while stringifying error: " + vr(a, r + 1);
        }
      }
      function tn(e) {
        return typeof e == "string" ? e : e && e.toString && typeof e.toString == "function" ? e.toString() : {}.toString.call(e);
      }
      function wr(e, r) {
        if (!r) return e;
        if (Object.assign) return Object.assign(e, r);
        for (var n in r) r.hasOwnProperty(n) && (e[n] = r[n]);
        return e;
      }
      Bt(function(e) {
        if (Object.values) return Object.values(e);
        var r = [];
        for (var n in e) e.hasOwnProperty(n) && r.push(e[n]);
        return r;
      });
      function Wa(e) {
        return e;
      }
      function _r(e, r) {
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
      function Nn(e) {
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
      function No(e) {
        return typeof (r = e) == "object" && r !== null && {}.toString.call(e) === "[object Object]";
        var r;
      }
      function Wn(e) {
        if (!No(e)) return !1;
        var r = e.constructor;
        if (typeof r != "function") return !1;
        var n = r.prototype;
        return !!No(n) && !!n.hasOwnProperty("isPrototypeOf");
      }
      function rn(e, r, n) {
        if (n === void 0 && (n = ""), Array.isArray(e)) {
          for (var i = e.length, a = [], u = function(P) {
            _o(a, P, function() {
              var g = n ? n + "." + P : "" + P, w = r(e[P], P, g);
              return (Wn(w) || Array.isArray(w)) && (w = rn(w, r, g)), w;
            });
          }, d = 0; d < i; d++) u(d);
          return a;
        }
        if (Wn(e)) {
          var h = {}, l = function(P) {
            if (!e.hasOwnProperty(P)) return 1;
            _o(h, P, function() {
              var g = n ? n + "." + P : "" + P, w = r(e[P], P, g);
              return (Wn(w) || Array.isArray(w)) && (w = rn(w, r, g)), w;
            });
          };
          for (var m in e) l(m);
          return h;
        }
        throw new Error("Pass an object or array");
      }
      function qt(e) {
        return e != null;
      }
      function Mn(e) {
        return {}.toString.call(e) === "[object RegExp]";
      }
      function Nr(e, r, n) {
        if (e.hasOwnProperty(r)) return e[r];
        var i = n();
        return e[r] = i, i;
      }
      function nn(e) {
        var r = [], n = !1, i, a = {
          set: function(u, d) {
            return n || (e[u] = d, a.register(function() {
              delete e[u];
            })), d;
          },
          register: function(u) {
            var d = en(function() {
              return u(i);
            });
            return n ? u(i) : r.push(d), {
              cancel: function() {
                var h = r.indexOf(d);
                h !== -1 && r.splice(h, 1);
              }
            };
          },
          all: function(u) {
            i = u;
            var d = [];
            for (n = !0; r.length; ) {
              var h = r.shift();
              d.push(h());
            }
            return p.all(d).then(Se);
          }
        };
        return a;
      }
      function on(e, r) {
        if (r == null) throw new Error("Expected " + e + " to be present");
        return r;
      }
      var Ma = function(e) {
        R(r, e);
        function r(n) {
          var i;
          return (i = e.call(this, n) || this).name = i.constructor.name, typeof Error.captureStackTrace == "function" ? Error.captureStackTrace(function(a) {
            if (a === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return a;
          }(i), i.constructor) : i.stack = new Error(n).stack, i;
        }
        return r;
      }(Do(Error));
      function Ao() {
        var e = document.body;
        if (!e) throw new Error("Body element not found");
        return e;
      }
      function an() {
        return !!document.body && document.readyState === "complete";
      }
      function Wo() {
        return !!document.body && document.readyState === "interactive";
      }
      function Mo(e) {
        return encodeURIComponent(e);
      }
      Bt(function() {
        return new p(function(e) {
          if (an() || Wo()) return e();
          var r = setInterval(function() {
            if (an() || Wo())
              return clearInterval(r), e();
          }, 10);
        });
      });
      function Fo(e) {
        return function(r, n, i) {
          i === void 0 && (i = []);
          var a = r.__inline_memoize_cache__ = r.__inline_memoize_cache__ || {}, u = _n(i);
          return a.hasOwnProperty(u) ? a[u] : a[u] = (function() {
            var d = {};
            if (!e || e.indexOf("=") === -1) return d;
            for (var h = 0, l = e.split("&"); h < l.length; h++) {
              var m = l[h];
              (m = m.split("="))[0] && m[1] && (d[decodeURIComponent(m[0])] = decodeURIComponent(m[1]));
            }
            return d;
          }).apply(void 0, i);
        }(Fo, 0, [e]);
      }
      function zo(e, r) {
        return r === void 0 && (r = {}), r && Object.keys(r).length ? function(n) {
          return n === void 0 && (n = {}), Object.keys(n).filter(function(i) {
            return typeof n[i] == "string" || typeof n[i] == "boolean";
          }).map(function(i) {
            var a = n[i];
            if (typeof a != "string" && typeof a != "boolean") throw new TypeError("Invalid type for query");
            return Mo(i) + "=" + Mo(a.toString());
          }).join("&");
        }(y({}, Fo(e), r)) : e;
      }
      function Fa(e, r) {
        e.appendChild(r);
      }
      function Fn(e, r) {
        return r === void 0 && (r = document), On(e) ? e : typeof e == "string" ? r.querySelector(e) : void 0;
      }
      function Uo(e) {
        return new p(function(r, n) {
          var i = tn(e), a = Fn(e);
          if (a) return r(a);
          if (an()) return n(new Error("Document is ready and element " + i + " does not exist"));
          var u = setInterval(function() {
            if (a = Fn(e))
              r(a), clearInterval(u);
            else if (an())
              return clearInterval(u), n(new Error("Document is ready and element " + i + " does not exist"));
          }, 10);
        });
      }
      var zn = function(e) {
        R(r, e);
        function r() {
          return e.apply(this, arguments) || this;
        }
        return r;
      }(Ma), sn;
      function Lo(e) {
        if ((sn = sn || new Qr()).has(e)) {
          var r = sn.get(e);
          if (r) return r;
        }
        var n = new p(function(i, a) {
          e.addEventListener("load", function() {
            (function(u) {
              if (function() {
                for (var d = 0; d < er.length; d++) {
                  var h = !1;
                  try {
                    h = er[d].closed;
                  } catch {
                  }
                  h && (Yr.splice(d, 1), er.splice(d, 1));
                }
              }(), u && u.contentWindow) try {
                er.push(u.contentWindow), Yr.push(u);
              } catch {
              }
            })(e), i(e);
          }), e.addEventListener("error", function(u) {
            e.contentWindow ? i(e) : a(u);
          });
        });
        return sn.set(e, n), n;
      }
      function Un(e) {
        return Lo(e).then(function(r) {
          if (!r.contentWindow) throw new Error("Could not find window in iframe");
          return r.contentWindow;
        });
      }
      function jo(e, r) {
        e === void 0 && (e = {});
        var n = e.style || {}, i = function(u, d, h) {
          u === void 0 && (u = "div"), d === void 0 && (d = {}), u = u.toLowerCase();
          var l = document.createElement(u);
          if (d.style && wr(l.style, d.style), d.class && (l.className = d.class.join(" ")), d.id && l.setAttribute("id", d.id), d.attributes) for (var m = 0, P = Object.keys(d.attributes); m < P.length; m++) {
            var g = P[m];
            l.setAttribute(g, d.attributes[g]);
          }
          if (d.styleSheet && function(w, E, T) {
            T === void 0 && (T = window.document), w.styleSheet ? w.styleSheet.cssText = E : w.appendChild(T.createTextNode(E));
          }(l, d.styleSheet), d.html) {
            if (u === "iframe") throw new Error("Iframe html can not be written unless container provided and iframe in DOM");
            l.innerHTML = d.html;
          }
          return l;
        }("iframe", {
          attributes: y({
            allowTransparency: "true"
          }, e.attributes || {}),
          style: y({
            backgroundColor: "transparent",
            border: "none"
          }, n),
          html: e.html,
          class: e.class
        }), a = window.navigator.userAgent.match(/MSIE|Edge/i);
        return i.hasAttribute("id") || i.setAttribute("id", rt()), Lo(i), (e.url || a) && i.setAttribute("src", e.url || "about:blank"), i;
      }
      function Bo(e, r, n) {
        return e.addEventListener(r, n), {
          cancel: function() {
            e.removeEventListener(r, n);
          }
        };
      }
      function za(e) {
        e.style.setProperty("display", "");
      }
      function qo(e) {
        e.style.setProperty("display", "none", "important");
      }
      function Ar(e) {
        e && e.parentNode && e.parentNode.removeChild(e);
      }
      function mr(e) {
        return !(e && e.parentNode && e.ownerDocument && e.ownerDocument.documentElement && e.ownerDocument.documentElement.contains(e));
      }
      function $o(e, r, n) {
        var i = n === void 0 ? {} : n, a = i.width, u = a === void 0 || a, d = i.height, h = d === void 0 || d, l = i.interval, m = l === void 0 ? 100 : l, P = i.win, g = P === void 0 ? window : P, w = e.offsetWidth, E = e.offsetHeight, T = !1;
        r({
          width: w,
          height: E
        });
        var S = function() {
          if (!T && function(M) {
            return !!(M.offsetWidth || M.offsetHeight || M.getClientRects().length);
          }(e)) {
            var L = e.offsetWidth, J = e.offsetHeight;
            (u && L !== w || h && J !== E) && r({
              width: L,
              height: J
            }), w = L, E = J;
          }
        }, x, W;
        return g.addEventListener("resize", S), g.ResizeObserver !== void 0 ? ((x = new g.ResizeObserver(S)).observe(e), W = _r(S, 10 * m)) : g.MutationObserver !== void 0 ? ((x = new g.MutationObserver(S)).observe(e, {
          attributes: !0,
          childList: !0,
          subtree: !0,
          characterData: !1
        }), W = _r(S, 10 * m)) : W = _r(S, m), {
          cancel: function() {
            T = !0, x.disconnect(), window.removeEventListener("resize", S), W.cancel();
          }
        };
      }
      function Ln(e) {
        for (; e.parentNode; ) e = e.parentNode;
        return e.toString() === "[object ShadowRoot]";
      }
      var cn = typeof document < "u" ? document.currentScript : null, Ua = Bt(function() {
        if (cn || (cn = function() {
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
              var u = a[i];
              if (u.src && u.src === n) return u;
            }
          } catch {
          }
        }())) return cn;
        throw new Error("Can not determine current script");
      }), La = rt();
      Bt(function() {
        var e;
        try {
          e = Ua();
        } catch {
          return La;
        }
        var r = e.getAttribute("data-uid");
        if (r && typeof r == "string" || (r = e.getAttribute("data-uid-auto")) && typeof r == "string") return r;
        if (e.src) {
          var n = function(i) {
            for (var a = "", u = 0; u < i.length; u++) {
              var d = i[u].charCodeAt(0) * u;
              i[u + 1] && (d += i[u + 1].charCodeAt(0) * (u - 1)), a += String.fromCharCode(97 + Math.abs(d) % 26);
            }
            return a;
          }(JSON.stringify({
            src: e.src,
            dataset: e.dataset
          }));
          r = "uid_" + n.slice(n.length - 30);
        } else r = rt();
        return e.setAttribute("data-uid-auto", r), r;
      });
      function Ho(e) {
        return typeof e == "string" && /^[0-9]+%$/.test(e);
      }
      function jn(e) {
        if (typeof e == "number") return e;
        var r = e.match(/^([0-9]+)(px|%)$/);
        if (!r) throw new Error("Could not match css value from " + e);
        return parseInt(r[1], 10);
      }
      function Vo(e) {
        return jn(e) + "px";
      }
      function Go(e) {
        return typeof e == "number" ? Vo(e) : Ho(e) ? e : Vo(e);
      }
      function Jo(e, r) {
        if (typeof e == "number") return e;
        if (Ho(e)) return parseInt(r * jn(e) / 100, 10);
        if (typeof (n = e) == "string" && /^[0-9]+px$/.test(n)) return jn(e);
        var n;
        throw new Error("Can not normalize dimension: " + e);
      }
      function Dt(e) {
        e === void 0 && (e = window);
        var r = "__post_robot_11_0_0__";
        return e !== window ? e[r] : e[r] = e[r] || {};
      }
      var Ko = function() {
        return {};
      };
      function me(e, r) {
        return e === void 0 && (e = "store"), r === void 0 && (r = Ko), Nr(Dt(), e, function() {
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
              return Nr(n, i, a);
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
      var ja = function() {
      };
      function un() {
        var e = Dt();
        return e.WINDOW_WILDCARD = e.WINDOW_WILDCARD || new ja(), e.WINDOW_WILDCARD;
      }
      function tt(e, r) {
        return e === void 0 && (e = "store"), r === void 0 && (r = Ko), me("windowStore").getOrSet(e, function() {
          var n = new Qr(), i = function(a) {
            return n.getOrSet(a, r);
          };
          return {
            has: function(a) {
              return i(a).hasOwnProperty(e);
            },
            get: function(a, u) {
              var d = i(a);
              return d.hasOwnProperty(e) ? d[e] : u;
            },
            set: function(a, u) {
              return i(a)[e] = u, u;
            },
            del: function(a) {
              delete i(a)[e];
            },
            getOrSet: function(a, u) {
              return Nr(i(a), e, u);
            }
          };
        });
      }
      function Yo() {
        return me("instance").getOrSet("instanceID", rt);
      }
      function Zo(e, r) {
        var n = r.domain, i = tt("helloPromises"), a = i.get(e);
        a && a.resolve({
          domain: n
        });
        var u = p.resolve({
          domain: n
        });
        return i.set(e, u), u;
      }
      function Bn(e, r) {
        return (0, r.send)(e, "postrobot_hello", {
          instanceID: Yo()
        }, {
          domain: "*",
          timeout: -1
        }).then(function(n) {
          var i = n.origin, a = n.data.instanceID;
          return Zo(e, {
            domain: i
          }), {
            win: e,
            domain: i,
            instanceID: a
          };
        });
      }
      function Xo(e, r) {
        var n = r.send;
        return tt("windowInstanceIDPromises").getOrSet(e, function() {
          return Bn(e, {
            send: n
          }).then(function(i) {
            return i.instanceID;
          });
        });
      }
      function Qo(e, r, n) {
        r === void 0 && (r = 5e3), n === void 0 && (n = "Window");
        var i = function(a) {
          return tt("helloPromises").getOrSet(a, function() {
            return new p();
          });
        }(e);
        return r !== -1 && (i = i.timeout(r, new Error(n + " did not load after " + r + "ms"))), i;
      }
      function ko(e) {
        tt("knownWindows").set(e, !0);
      }
      function qn(e) {
        return typeof e == "object" && e !== null && typeof e.__type__ == "string";
      }
      function ei(e) {
        return e === void 0 ? "undefined" : e === null ? "null" : Array.isArray(e) ? "array" : typeof e == "function" ? "function" : typeof e == "object" ? e instanceof Error ? "error" : typeof e.then == "function" ? "promise" : {}.toString.call(e) === "[object RegExp]" ? "regex" : {}.toString.call(e) === "[object Date]" ? "date" : "object" : typeof e == "string" ? "string" : typeof e == "number" ? "number" : typeof e == "boolean" ? "boolean" : void 0;
      }
      function nr(e, r) {
        return {
          __type__: e,
          __val__: r
        };
      }
      var wt, Ba = ((wt = {}).function = function() {
      }, wt.error = function(e) {
        return nr("error", {
          message: e.message,
          stack: e.stack,
          code: e.code,
          data: e.data
        });
      }, wt.promise = function() {
      }, wt.regex = function(e) {
        return nr("regex", e.source);
      }, wt.date = function(e) {
        return nr("date", e.toJSON());
      }, wt.array = function(e) {
        return e;
      }, wt.object = function(e) {
        return e;
      }, wt.string = function(e) {
        return e;
      }, wt.number = function(e) {
        return e;
      }, wt.boolean = function(e) {
        return e;
      }, wt.null = function(e) {
        return e;
      }, wt[void 0] = function(e) {
        return nr("undefined", e);
      }, wt), qa = {}, mt, $a = ((mt = {}).function = function() {
        throw new Error("Function serialization is not implemented; nothing to deserialize");
      }, mt.error = function(e) {
        var r = e.stack, n = e.code, i = e.data, a = new Error(e.message);
        return a.code = n, i && (a.data = i), a.stack = r + `

` + a.stack, a;
      }, mt.promise = function() {
        throw new Error("Promise serialization is not implemented; nothing to deserialize");
      }, mt.regex = function(e) {
        return new RegExp(e);
      }, mt.date = function(e) {
        return new Date(e);
      }, mt.array = function(e) {
        return e;
      }, mt.object = function(e) {
        return e;
      }, mt.string = function(e) {
        return e;
      }, mt.number = function(e) {
        return e;
      }, mt.boolean = function(e) {
        return e;
      }, mt.null = function(e) {
        return e;
      }, mt[void 0] = function() {
      }, mt), Ha = {};
      function $n() {
        return !!lr(window).match(/MSIE|trident|edge\/12|edge\/13/i);
      }
      function ti(e) {
        return !Zr(window, e);
      }
      function ri(e, r) {
        if (e) {
          if (z() !== Nt(e)) return !0;
        } else if (r && !C(r)) return !0;
        return !1;
      }
      function ni(e) {
        var r = e.win, n = e.domain;
        return !(!$n() || n && !ri(n, r) || r && !ti(r));
      }
      function Hn(e) {
        return "__postrobot_bridge___" + (e = e || Nt(e)).replace(/[^a-zA-Z0-9]+/g, "_");
      }
      function oi() {
        return !!(window.name && window.name === Hn(z()));
      }
      var Va = new p(function(e) {
        if (window.document && window.document.body) return e(window.document.body);
        var r = setInterval(function() {
          if (window.document && window.document.body)
            return clearInterval(r), e(window.document.body);
        }, 10);
      });
      function ii(e) {
        tt("remoteWindowPromises").getOrSet(e, function() {
          return new p();
        });
      }
      function Vn(e) {
        var r = tt("remoteWindowPromises").get(e);
        if (!r) throw new Error("Remote window promise not found");
        return r;
      }
      function ai(e, r, n) {
        Vn(e).resolve(function(i, a, u) {
          if (i !== e) throw new Error("Remote window does not match window");
          if (!vt(a, r)) throw new Error("Remote domain " + a + " does not match domain " + r);
          n.fireAndForget(u);
        });
      }
      function Gn(e, r) {
        Vn(e).reject(r).catch(Se);
      }
      function dn(e) {
        for (var r = e.win, n = e.name, i = e.domain, a = me("popupWindowsByName"), u = tt("popupWindowsByWin"), d = 0, h = a.keys(); d < h.length; d++) {
          var l = h[d], m = a.get(l);
          m && !We(m.win) || a.del(l);
        }
        if (We(r)) return {
          win: r,
          name: n,
          domain: i
        };
        var P = u.getOrSet(r, function() {
          return n ? a.getOrSet(n, function() {
            return {
              win: r,
              name: n
            };
          }) : {
            win: r
          };
        });
        if (P.win && P.win !== r) throw new Error("Different window already linked for window: " + (n || "undefined"));
        return n && (P.name = n, a.set(n, P)), i && (P.domain = i, ii(r)), u.set(r, P), P;
      }
      function si(e) {
        var r = e.on, n = e.send, i = e.receiveMessage;
        a = window.open, window.open = function(u, d, h, l) {
          var m = a.call(this, xn(u), d, h, l);
          return m && (dn({
            win: m,
            name: d,
            domain: u ? Nt(u) : null
          }), m);
        };
        var a;
        (function(u) {
          var d = u.on, h = u.send, l = u.receiveMessage, m = me("popupWindowsByName");
          d("postrobot_open_tunnel", function(P) {
            var g = P.source, w = P.origin, E = P.data, T = me("bridges").get(w);
            if (!T) throw new Error("Can not find bridge promise for domain " + w);
            return T.then(function(S) {
              if (g !== S) throw new Error("Message source does not matched registered bridge for domain " + w);
              if (!E.name) throw new Error("Register window expected to be passed window name");
              if (!E.sendMessage) throw new Error("Register window expected to be passed sendMessage method");
              if (!m.has(E.name)) throw new Error("Window with name " + E.name + " does not exist, or was not opened by this window");
              var x = function() {
                return m.get(E.name);
              };
              if (!x().domain) throw new Error("We do not have a registered domain for window " + E.name);
              if (x().domain !== w) throw new Error("Message origin " + w + " does not matched registered window origin " + (x().domain || "unknown"));
              return ai(x().win, w, E.sendMessage), {
                sendMessage: function(W) {
                  if (window && !window.closed && x()) {
                    var L = x().domain;
                    if (L) try {
                      l({
                        data: W,
                        origin: L,
                        source: x().win
                      }, {
                        on: d,
                        send: h
                      });
                    } catch (J) {
                      p.reject(J);
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
        }), function(u) {
          var d = u.send;
          Dt(window).openTunnelToParent = function(h) {
            var l = h.name, m = h.source, P = h.canary, g = h.sendMessage, w = me("tunnelWindows"), E = ve(window);
            if (!E) throw new Error("No parent window found to open tunnel to");
            var T = function(S) {
              var x = S.name, W = S.source, L = S.canary, J = S.sendMessage;
              (function() {
                for (var V = me("tunnelWindows"), j = 0, ee = V.keys(); j < ee.length; j++) {
                  var H = ee[j];
                  We(V[H].source) && V.del(H);
                }
              })();
              var M = rt();
              return me("tunnelWindows").set(M, {
                name: x,
                source: W,
                canary: L,
                sendMessage: J
              }), M;
            }({
              name: l,
              source: m,
              canary: P,
              sendMessage: g
            });
            return d(E, "postrobot_open_tunnel", {
              name: l,
              sendMessage: function() {
                var S = w.get(T);
                if (S && S.source && !We(S.source)) {
                  try {
                    S.canary();
                  } catch {
                    return;
                  }
                  S.sendMessage.apply(this, arguments);
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
          p.try(function() {
            var m = Y(window);
            if (m && ni({
              win: m
            })) {
              return ii(m), (P = m, tt("remoteBridgeAwaiters").getOrSet(P, function() {
                return p.try(function() {
                  var g = hr(P, Hn(z()));
                  if (g) return C(g) && Dt(oe(g)) ? g : new p(function(w) {
                    var E, T;
                    E = setInterval(function() {
                      if (g && C(g) && Dt(oe(g)))
                        return clearInterval(E), clearTimeout(T), w(g);
                    }, 100), T = setTimeout(function() {
                      return clearInterval(E), w();
                    }, 2e3);
                  });
                });
              })).then(function(g) {
                return g ? window.name ? Dt(oe(g)).openTunnelToParent({
                  name: window.name,
                  source: window,
                  canary: function() {
                  },
                  sendMessage: function(w) {
                    try {
                    } catch {
                      return;
                    }
                    if (window && !window.closed) try {
                      l({
                        data: w,
                        origin: this.origin,
                        source: this.source
                      }, {
                        on: d,
                        send: h
                      });
                    } catch (E) {
                      p.reject(E);
                    }
                  }
                }).then(function(w) {
                  var E = w.source, T = w.origin, S = w.data;
                  if (E !== m) throw new Error("Source does not match opener");
                  ai(E, T, S.sendMessage);
                }).catch(function(w) {
                  throw Gn(m, w), w;
                }) : Gn(m, new Error("Can not register with opener: window does not have a name")) : Gn(m, new Error("Can not register with opener: no bridge found in opener"));
              });
              var P;
            }
          });
        }({
          on: r,
          send: n,
          receiveMessage: i
        });
      }
      function Jn() {
        for (var e = me("idToProxyWindow"), r = 0, n = e.keys(); r < n.length; r++) {
          var i = n[r];
          e.get(i).shouldClean() && e.del(i);
        }
      }
      function ci(e, r) {
        var n = r.send, i = r.id, a = i === void 0 ? rt() : i, u = e.then(function(l) {
          if (C(l)) return oe(l).name;
        }), d = e.then(function(l) {
          if (We(l)) throw new Error("Window is closed, can not determine type");
          return Y(l) ? B.POPUP : B.IFRAME;
        });
        u.catch(Se), d.catch(Se);
        var h = function() {
          return e.then(function(l) {
            if (!We(l)) return C(l) ? oe(l).name : u;
          });
        };
        return {
          id: a,
          getType: function() {
            return d;
          },
          getInstanceID: Aa(function() {
            return e.then(function(l) {
              return Xo(l, {
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
              return We(l);
            });
          },
          setLocation: function(l, m) {
            return m === void 0 && (m = {}), e.then(function(P) {
              var g = window.location.protocol + "//" + window.location.host, w = m.method, E = w === void 0 ? "get" : w, T = m.body;
              if (l.indexOf("/") === 0) l = "" + g + l;
              else if (!l.match(/^https?:\/\//) && l.indexOf(g) !== 0) throw new Error("Expected url to be http or https url, or absolute path, got " + JSON.stringify(l));
              if (E === "post") return h().then(function(S) {
                if (!S) throw new Error("Can not post to window without target name");
                (function(x) {
                  var W = x.url, L = x.target, J = x.body, M = x.method, V = M === void 0 ? "post" : M, j = document.createElement("form");
                  if (j.setAttribute("target", L), j.setAttribute("method", V), j.setAttribute("action", W), j.style.display = "none", J) for (var ee = 0, H = Object.keys(J); ee < H.length; ee++) {
                    var le, ce = H[ee], Z = document.createElement("input");
                    Z.setAttribute("name", ce), Z.setAttribute("value", (le = J[ce]) == null ? void 0 : le.toString()), j.appendChild(Z);
                  }
                  Ao().appendChild(j), j.submit(), Ao().removeChild(j);
                })({
                  url: l,
                  target: S,
                  method: E,
                  body: T
                });
              });
              if (E !== "get") throw new Error("Unsupported method: " + E);
              if (C(P)) try {
                if (P.location && typeof P.location.replace == "function") {
                  P.location.replace(l);
                  return;
                }
              } catch {
              }
              P.location = l;
            });
          },
          setName: function(l) {
            return e.then(function(m) {
              dn({
                win: m,
                name: l
              });
              var P = C(m), g = So(m);
              if (!P) throw new Error("Can not set name for cross-domain window: " + l);
              oe(m).name = l, g && g.setAttribute("name", l), u = p.resolve(l);
            });
          }
        };
      }
      var gt = function() {
        function e(n) {
          var i = n.send, a = n.win, u = n.serializedWindow;
          this.id = void 0, this.isProxyWindow = !0, this.serializedWindow = void 0, this.actualWindow = void 0, this.actualWindowPromise = void 0, this.send = void 0, this.name = void 0, this.actualWindowPromise = new p(), this.serializedWindow = u || ci(this.actualWindowPromise, {
            send: i
          }), me("idToProxyWindow").set(this.getID(), this), a && this.setWindow(a, {
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
            return n === B.POPUP;
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
          var n = this, i = this.isPopup(), a = this.getName(), u = p.hash({
            isPopup: i,
            name: a
          }).then(function(h) {
            var l = h.name;
            h.isPopup && l && window.open("", l, "noopener");
          }), d = this.serializedWindow.focus();
          return p.all([u, d]).then(function() {
            return n;
          });
        }, r.isClosed = function() {
          return this.serializedWindow.isClosed();
        }, r.getWindow = function() {
          return this.actualWindow;
        }, r.setWindow = function(n, i) {
          var a = i.send;
          this.actualWindow = n, this.actualWindowPromise.resolve(this.actualWindow), this.serializedWindow = ci(this.actualWindowPromise, {
            send: a,
            id: this.getID()
          }), tt("winToProxyWindow").set(n, this);
        }, r.awaitWindow = function() {
          return this.actualWindowPromise;
        }, r.matchWindow = function(n, i) {
          var a = this, u = i.send;
          return p.try(function() {
            return a.actualWindow ? n === a.actualWindow : p.hash({
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
          return !!(this.actualWindow && We(this.actualWindow));
        }, r.serialize = function() {
          return this.serializedWindow;
        }, e.unwrap = function(n) {
          return e.isProxyWindow(n) ? n.unwrap() : n;
        }, e.serialize = function(n, i) {
          var a = i.send;
          return Jn(), e.toProxyWindow(n, {
            send: a
          }).serialize();
        }, e.deserialize = function(n, i) {
          var a = i.send;
          return Jn(), me("idToProxyWindow").get(n.id) || new e({
            serializedWindow: n,
            send: a
          });
        }, e.isProxyWindow = function(n) {
          return !!(n && !rr(n) && n.isProxyWindow);
        }, e.toProxyWindow = function(n, i) {
          var a = i.send;
          if (Jn(), e.isProxyWindow(n)) return n;
          var u = n;
          return tt("winToProxyWindow").get(u) || new e({
            win: u,
            send: a
          });
        }, e;
      }();
      function Kn(e, r, n, i, a) {
        var u = tt("methodStore"), d = me("proxyWindowMethods");
        gt.isProxyWindow(i) ? d.set(e, {
          val: r,
          name: n,
          domain: a,
          source: i
        }) : (d.del(e), u.getOrSet(i, function() {
          return {};
        })[e] = {
          domain: a,
          name: n,
          val: r,
          source: i
        });
      }
      function ui(e, r) {
        var n = tt("methodStore"), i = me("proxyWindowMethods");
        return n.getOrSet(e, function() {
          return {};
        })[r] || i.get(r);
      }
      function di(e, r, n, i, a) {
        d = (u = {
          on: a.on,
          send: a.send
        }).on, h = u.send, me("builtinListeners").getOrSet("functionCalls", function() {
          return d("postrobot_method", {
            domain: "*"
          }, function(P) {
            var g = P.source, w = P.origin, E = P.data, T = E.id, S = E.name, x = ui(g, T);
            if (!x) throw new Error("Could not find method '" + S + "' with id: " + E.id + " in " + z(window));
            var W = x.source, L = x.domain, J = x.val;
            return p.try(function() {
              if (!vt(L, w)) throw new Error("Method '" + E.name + "' domain " + JSON.stringify(Mn(x.domain) ? x.domain.source : x.domain) + " does not match origin " + w + " in " + z(window));
              if (gt.isProxyWindow(W)) return W.matchWindow(g, {
                send: h
              }).then(function(M) {
                if (!M) throw new Error("Method call '" + E.name + "' failed - proxy window does not match source in " + z(window));
              });
            }).then(function() {
              return J.apply({
                source: g,
                origin: w
              }, E.args);
            }, function(M) {
              return p.try(function() {
                if (J.onError) return J.onError(M);
              }).then(function() {
                throw M.stack && (M.stack = "Remote call to " + S + "(" + function(V) {
                  return V === void 0 && (V = []), An(V).map(function(j) {
                    return typeof j == "string" ? "'" + j + "'" : j === void 0 ? "undefined" : j === null ? "null" : typeof j == "boolean" ? j.toString() : Array.isArray(j) ? "[ ... ]" : typeof j == "object" ? "{ ... }" : typeof j == "function" ? "() => { ... }" : "<" + typeof j + ">";
                  }).join(", ");
                }(E.args) + `) failed

` + M.stack), M;
              });
            }).then(function(M) {
              return {
                result: M,
                id: T,
                name: S
              };
            });
          });
        });
        var u, d, h, l = n.__id__ || rt();
        e = gt.unwrap(e);
        var m = n.__name__ || n.name || i;
        return typeof m == "string" && typeof m.indexOf == "function" && m.indexOf("anonymous::") === 0 && (m = m.replace("anonymous::", i + "::")), gt.isProxyWindow(e) ? (Kn(l, n, m, e, r), e.awaitWindow().then(function(P) {
          Kn(l, n, m, P, r);
        })) : Kn(l, n, m, e, r), nr("cross_domain_function", {
          id: l,
          name: m
        });
      }
      function fi(e, r, n, i) {
        var a, u = i.on, d = i.send;
        return function(h, l) {
          l === void 0 && (l = qa);
          var m = JSON.stringify(h, function(P) {
            var g = this[P];
            if (qn(this)) return g;
            var w = ei(g);
            if (!w) return g;
            var E = l[w] || Ba[w];
            return E ? E(g, P) : g;
          });
          return m === void 0 ? "undefined" : m;
        }(n, ((a = {}).promise = function(h, l) {
          return function(m, P, g, w, E) {
            return nr("cross_domain_zalgo_promise", {
              then: di(m, P, function(T, S) {
                return g.then(T, S);
              }, w, {
                on: E.on,
                send: E.send
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
          return rr(h) || gt.isProxyWindow(h) ? nr("cross_domain_window", gt.serialize(h, {
            send: d
          })) : h;
        }, a));
      }
      function li(e, r, n, i) {
        var a, u = i.send;
        return function(d, h) {
          if (h === void 0 && (h = Ha), d !== "undefined") return JSON.parse(d, function(l, m) {
            if (qn(this)) return m;
            var P, g;
            if (qn(m) ? (P = m.__type__, g = m.__val__) : (P = ei(m), g = m), !P) return g;
            var w = h[P] || $a[P];
            return w ? w(g, l) : g;
          });
        }(n, ((a = {}).cross_domain_zalgo_promise = function(d) {
          return function(h, l, m) {
            return new p(m.then);
          }(0, 0, d);
        }, a.cross_domain_function = function(d) {
          return function(h, l, m, P) {
            var g = m.id, w = m.name, E = P.send, T = function(x) {
              x === void 0 && (x = {});
              function W() {
                var L = arguments;
                return gt.toProxyWindow(h, {
                  send: E
                }).awaitWindow().then(function(J) {
                  var M = ui(J, g);
                  if (M && M.val !== W) return M.val.apply({
                    source: window,
                    origin: z()
                  }, L);
                  var V = [].slice.call(L);
                  return x.fireAndForget ? E(J, "postrobot_method", {
                    id: g,
                    name: w,
                    args: V
                  }, {
                    domain: l,
                    fireAndForget: !0
                  }) : E(J, "postrobot_method", {
                    id: g,
                    name: w,
                    args: V
                  }, {
                    domain: l,
                    fireAndForget: !1
                  }).then(function(j) {
                    return j.data.result;
                  });
                }).catch(function(J) {
                  throw J;
                });
              }
              return W.__name__ = w, W.__origin__ = l, W.__source__ = h, W.__id__ = g, W.origin = l, W;
            }, S = T();
            return S.fireAndForget = T({
              fireAndForget: !0
            }), S;
          }(e, r, d, {
            send: u
          });
        }, a.cross_domain_window = function(d) {
          return gt.deserialize(d, {
            send: u
          });
        }, a));
      }
      var Wr = {};
      Wr.postrobot_post_message = function(e, r, n) {
        n.indexOf("file:") === 0 && (n = "*"), e.postMessage(r, n);
      }, Wr.postrobot_bridge = function(e, r, n) {
        if (!$n() && !oi()) throw new Error("Bridge not needed for browser");
        if (C(e)) throw new Error("Post message through bridge disabled between same domain windows");
        if (Zr(window, e) !== !1) throw new Error("Can only use bridge to communicate between two different windows, not between frames");
        (function(i, a, u) {
          var d = Ir(window, i), h = Ir(i, window);
          if (!d && !h) throw new Error("Can only send messages to and from parent and popup windows");
          Vn(i).then(function(l) {
            return l(i, a, u);
          });
        })(e, n, r);
      }, Wr.postrobot_global = function(e, r) {
        if (!lr(window).match(/MSIE|rv:11|trident|edge\/12|edge\/13/i)) throw new Error("Global messaging not needed for browser");
        if (!C(e)) throw new Error("Post message through global disabled between different domain windows");
        if (Zr(window, e) !== !1) throw new Error("Can only use global to communicate between two different windows, not between frames");
        var n = Dt(e);
        if (!n) throw new Error("Can not find postRobot global on foreign window");
        n.receiveMessage({
          source: window,
          origin: z(),
          data: r
        });
      };
      function Yn(e, r, n, i) {
        var a = i.on, u = i.send;
        return p.try(function() {
          var d = tt().getOrSet(e, function() {
            return {};
          });
          return d.buffer = d.buffer || [], d.buffer.push(n), d.flush = d.flush || p.flush().then(function() {
            if (We(e)) throw new Error("Window is closed");
            var h = fi(e, r, ((l = {}).__post_robot_11_0_0__ = d.buffer || [], l), {
              on: a,
              send: u
            }), l;
            delete d.buffer;
            for (var m = Object.keys(Wr), P = [], g = 0; g < m.length; g++) {
              var w = m[g];
              try {
                Wr[w](e, h, r);
              } catch (E) {
                P.push(E);
              }
            }
            if (P.length === m.length) throw new Error(`All post-robot messaging strategies failed:

` + P.map(function(E, T) {
              return T + ". " + vr(E);
            }).join(`

`));
          }), d.flush.then(function() {
            delete d.flush;
          });
        }).then(Se);
      }
      function hi(e) {
        return me("responseListeners").get(e);
      }
      function pi(e) {
        me("responseListeners").del(e);
      }
      function vi(e) {
        return me("erroredResponseListeners").has(e);
      }
      function wi(e) {
        var r = e.name, n = e.win, i = e.domain, a = tt("requestListeners");
        if (n === "*" && (n = null), i === "*" && (i = null), !r) throw new Error("Name required to get request listener");
        for (var u = 0, d = [n, un()]; u < d.length; u++) {
          var h = d[u];
          if (h) {
            var l = a.get(h);
            if (l) {
              var m = l[r];
              if (m) {
                if (i && typeof i == "string") {
                  if (m[i]) return m[i];
                  if (m.__domain_regex__) for (var P = 0, g = m.__domain_regex__; P < g.length; P++) {
                    var w = g[P], E = w.listener;
                    if (vt(w.regex, i)) return E;
                  }
                }
                if (m["*"]) return m["*"];
              }
            }
          }
        }
      }
      function Zn(e, r) {
        var n = r.on, i = r.send, a = me("receivedMessages");
        try {
          if (!window || window.closed || !e.source) return;
        } catch {
          return;
        }
        var u = e.source, d = e.origin, h = function(g, w, E, T) {
          var S = T.on, x = T.send, W;
          try {
            W = li(w, E, g, {
              on: S,
              send: x
            });
          } catch {
            return;
          }
          if (W && typeof W == "object" && W !== null) {
            var L = W.__post_robot_11_0_0__;
            if (Array.isArray(L)) return L;
          }
        }(e.data, u, d, {
          on: n,
          send: i
        });
        if (h) {
          ko(u);
          for (var l, m = function() {
            var g = h[P];
            if (a.has(g.id)) return {
              v: void 0
            };
            if (a.set(g.id, !0), We(u) && !g.fireAndForget) return {
              v: void 0
            };
            g.origin.indexOf("file:") === 0 && (d = "file://");
            try {
              g.type === "postrobot_message_request" ? function(w, E, T, S) {
                var x = S.on, W = S.send, L = wi({
                  name: T.name,
                  win: w,
                  domain: E
                }), J = T.name === "postrobot_method" && T.data && typeof T.data.name == "string" ? T.data.name + "()" : T.name;
                function M(V, j, ee) {
                  return p.flush().then(function() {
                    if (!T.fireAndForget && !We(w)) try {
                      return Yn(w, E, {
                        id: rt(),
                        origin: z(window),
                        type: "postrobot_message_response",
                        hash: T.hash,
                        name: T.name,
                        ack: V,
                        data: j,
                        error: ee
                      }, {
                        on: x,
                        send: W
                      });
                    } catch (H) {
                      throw new Error("Send response message failed for " + J + " in " + z() + `

` + vr(H));
                    }
                  });
                }
                p.all([p.flush().then(function() {
                  if (!T.fireAndForget && !We(w)) try {
                    return Yn(w, E, {
                      id: rt(),
                      origin: z(window),
                      type: "postrobot_message_ack",
                      hash: T.hash,
                      name: T.name
                    }, {
                      on: x,
                      send: W
                    });
                  } catch (V) {
                    throw new Error("Send ack message failed for " + J + " in " + z() + `

` + vr(V));
                  }
                }), p.try(function() {
                  if (!L) throw new Error("No handler found for post message: " + T.name + " from " + E + " in " + window.location.protocol + "//" + window.location.host + window.location.pathname);
                  return L.handler({
                    source: w,
                    origin: E,
                    data: T.data
                  });
                }).then(function(V) {
                  return M("success", V);
                }, function(V) {
                  return M("error", null, V);
                })]).then(Se).catch(function(V) {
                  if (L && L.handleError) return L.handleError(V);
                  throw V;
                });
              }(u, d, g, {
                on: n,
                send: i
              }) : g.type === "postrobot_message_response" ? function(w, E, T) {
                if (!vi(T.hash)) {
                  var S = hi(T.hash);
                  if (!S) throw new Error("No handler found for post message response for message: " + T.name + " from " + E + " in " + window.location.protocol + "//" + window.location.host + window.location.pathname);
                  if (!vt(S.domain, E)) throw new Error("Response origin " + E + " does not match domain " + (x = S.domain, Array.isArray(x) ? "(" + x.join(" | ") + ")" : A(x) ? "RegExp(" + x.toString() + ")" : x.toString()));
                  var x;
                  if (w !== S.win) throw new Error("Response source does not match registered window");
                  pi(T.hash), T.ack === "error" ? S.promise.reject(T.error) : T.ack === "success" && S.promise.resolve({
                    source: w,
                    origin: E,
                    data: T.data
                  });
                }
              }(u, d, g) : g.type === "postrobot_message_ack" && function(w, E, T) {
                if (!vi(T.hash)) {
                  var S = hi(T.hash);
                  if (!S) throw new Error("No handler found for post message ack for message: " + T.name + " from " + E + " in " + window.location.protocol + "//" + window.location.host + window.location.pathname);
                  try {
                    if (!vt(S.domain, E)) throw new Error("Ack origin " + E + " does not match domain " + S.domain.toString());
                    if (w !== S.win) throw new Error("Ack source does not match registered window");
                  } catch (x) {
                    S.promise.reject(x);
                  }
                  S.ack = !0;
                }
              }(u, d, g);
            } catch (w) {
              setTimeout(function() {
                throw w;
              }, 0);
            }
          }, P = 0; P < h.length; P++) if (l = m()) return l.v;
        }
      }
      function At(e, r, n) {
        if (!e) throw new Error("Expected name");
        if (typeof (r = r || {}) == "function" && (n = r, r = {}), !n) throw new Error("Expected handler");
        var i = function a(u, d) {
          var h = u.name, l = u.win, m = u.domain, P = tt("requestListeners");
          if (!h || typeof h != "string") throw new Error("Name required to add request listener");
          if (l && l !== "*" && gt.isProxyWindow(l)) {
            var g = l.awaitWindow().then(function(le) {
              return a({
                name: h,
                win: le,
                domain: m
              }, d);
            });
            return {
              cancel: function() {
                g.then(function(le) {
                  return le.cancel();
                }, Se);
              }
            };
          }
          var w = l;
          if (Array.isArray(w)) {
            for (var E = [], T = 0, S = w; T < S.length; T++) E.push(a({
              name: h,
              domain: m,
              win: S[T]
            }, d));
            return {
              cancel: function() {
                for (var le = 0; le < E.length; le++) E[le].cancel();
              }
            };
          }
          if (Array.isArray(m)) {
            for (var x = [], W = 0, L = m; W < L.length; W++) x.push(a({
              name: h,
              win: w,
              domain: L[W]
            }, d));
            return {
              cancel: function() {
                for (var le = 0; le < x.length; le++) x[le].cancel();
              }
            };
          }
          var J = wi({
            name: h,
            win: w,
            domain: m
          });
          w && w !== "*" || (w = un());
          var M = (m = m || "*").toString();
          if (J) throw w && m ? new Error("Request listener already exists for " + h + " on domain " + m.toString() + " for " + (w === un() ? "wildcard" : "specified") + " window") : w ? new Error("Request listener already exists for " + h + " for " + (w === un() ? "wildcard" : "specified") + " window") : m ? new Error("Request listener already exists for " + h + " on domain " + m.toString()) : new Error("Request listener already exists for " + h);
          var V = P.getOrSet(w, function() {
            return {};
          }), j = Nr(V, h, function() {
            return {};
          }), ee, H;
          return Mn(m) ? (ee = Nr(j, "__domain_regex__", function() {
            return [];
          })).push(H = {
            regex: m,
            listener: d
          }) : j[M] = d, {
            cancel: function() {
              delete j[M], H && (ee.splice(ee.indexOf(H, 1)), ee.length || delete j.__domain_regex__), Object.keys(j).length || delete V[h], w && !Object.keys(V).length && P.del(w);
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
      var Rt = function e(r, n, i, a) {
        var u = (a = a || {}).domain || "*", d = a.timeout || -1, h = a.timeout || 5e3, l = a.fireAndForget || !1;
        return gt.toProxyWindow(r, {
          send: e
        }).awaitWindow().then(function(m) {
          return p.try(function() {
            if (function(P, g, w) {
              if (!P) throw new Error("Expected name");
              if (w && typeof w != "string" && !Array.isArray(w) && !Mn(w)) throw new TypeError("Can not send " + P + ". Expected domain " + JSON.stringify(w) + " to be a string, array, or regex");
              if (We(g)) throw new Error("Can not send " + P + ". Target window is closed");
            }(n, m, u), function(P, g) {
              var w = tr(g);
              if (w) return w === P;
              if (g === P || st(g) === g) return !1;
              for (var E = 0, T = at(P); E < T.length; E++) if (T[E] === g) return !0;
              return !1;
            }(window, m)) return Qo(m, h);
          }).then(function(P) {
            return function(g, w, E, T) {
              var S = T.send;
              return p.try(function() {
                return typeof w == "string" ? w : p.try(function() {
                  return E || Bn(g, {
                    send: S
                  }).then(function(x) {
                    return x.domain;
                  });
                }).then(function(x) {
                  if (!vt(w, w)) throw new Error("Domain " + tn(w) + " does not match " + tn(w));
                  return x;
                });
              });
            }(m, u, (P === void 0 ? {} : P).domain, {
              send: e
            });
          }).then(function(P) {
            var g = P, w = n === "postrobot_method" && i && typeof i.name == "string" ? i.name + "()" : n, E = new p(), T = n + "_" + rt();
            if (!l) {
              var S = {
                name: n,
                win: m,
                domain: g,
                promise: E
              };
              (function(j, ee) {
                me("responseListeners").set(j, ee);
              })(T, S);
              var x = tt("requestPromises").getOrSet(m, function() {
                return [];
              });
              x.push(E), E.catch(function() {
                (function(j) {
                  me("erroredResponseListeners").set(j, !0);
                })(T), pi(T);
              });
              var W = function(j) {
                return tt("knownWindows").get(j, !1);
              }(m) ? 1e4 : 2e3, L = d, J = W, M = L, V = _r(function() {
                return We(m) ? E.reject(new Error("Window closed for " + n + " before " + (S.ack ? "response" : "ack"))) : S.cancelled ? E.reject(new Error("Response listener was cancelled for " + n)) : (J = Math.max(J - 500, 0), M !== -1 && (M = Math.max(M - 500, 0)), S.ack || J !== 0 ? M === 0 ? E.reject(new Error("No response for postMessage " + w + " in " + z() + " in " + L + "ms")) : void 0 : E.reject(new Error("No ack for postMessage " + w + " in " + z() + " in " + W + "ms")));
              }, 500);
              E.finally(function() {
                V.cancel(), x.splice(x.indexOf(E, 1));
              }).catch(Se);
            }
            return Yn(m, g, {
              id: rt(),
              origin: z(window),
              type: "postrobot_message_request",
              hash: T,
              name: n,
              data: i,
              fireAndForget: l
            }, {
              on: At,
              send: e
            }).then(function() {
              return l ? E.resolve() : E;
            }, function(j) {
              throw new Error("Send request message failed for " + w + " in " + z() + `

` + vr(j));
            });
          });
        });
      };
      function Mr(e) {
        return gt.toProxyWindow(e, {
          send: Rt
        });
      }
      function mi(e) {
        for (var r = 0, n = tt("requestPromises").get(e, []); r < n.length; r++) n[r].reject(new Error("Window " + (We(e) ? "closed" : "cleaned up") + " before response")).catch(Se);
      }
      var $t;
      $t = {
        setupBridge: si,
        openBridge: function(e, r) {
          var n = me("bridges"), i = me("bridgeFrames");
          return r = r || Nt(e), n.getOrSet(r, function() {
            return p.try(function() {
              if (z() === r) throw new Error("Can not open bridge on the same domain as current domain: " + r);
              var a = Hn(r);
              if (hr(window, a)) throw new Error("Frame with name " + a + " already exists on page");
              var u = function(d, h) {
                var l = document.createElement("iframe");
                return l.setAttribute("name", d), l.setAttribute("id", d), l.setAttribute("style", "display: none; margin: 0; padding: 0; border: 0px none; overflow: hidden;"), l.setAttribute("frameborder", "0"), l.setAttribute("border", "0"), l.setAttribute("scrolling", "no"), l.setAttribute("allowTransparency", "true"), l.setAttribute("tabindex", "-1"), l.setAttribute("hidden", "true"), l.setAttribute("title", ""), l.setAttribute("role", "presentation"), l.src = h, l;
              }(a, e);
              return i.set(r, u), Va.then(function(d) {
                d.appendChild(u);
                var h = u.contentWindow;
                return new p(function(l, m) {
                  u.addEventListener("load", l), u.addEventListener("error", m);
                }).then(function() {
                  return Qo(h, 5e3, "Bridge " + e);
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
        isBridge: oi,
        needsBridge: ni,
        needsBridgeForBrowser: $n,
        hasBridge: function(e, r) {
          return me("bridges").has(r || Nt(e));
        },
        needsBridgeForWin: ti,
        needsBridgeForDomain: ri,
        destroyBridges: function() {
          for (var e = me("bridges"), r = me("bridgeFrames"), n = 0, i = r.keys(); n < i.length; n++) {
            var a = r.get(i[n]);
            a && a.parentNode && a.parentNode.removeChild(a);
          }
          r.reset(), e.reset();
        }
      };
      function Fr(e) {
        if (!C(e)) throw new Error("Can not get global for window on different domain");
        return e.__zoid_10_3_3__ || (e.__zoid_10_3_3__ = {}), e.__zoid_10_3_3__;
      }
      function gi(e, r) {
        try {
          return r(Fr(e));
        } catch {
        }
      }
      function fn(e) {
        return {
          get: function() {
            var r = this;
            return p.try(function() {
              if (r.source && r.source !== window) throw new Error("Can not call get on proxy object from a remote window");
              return e;
            });
          }
        };
      }
      function Ga(e) {
        return Cn(JSON.stringify(e));
      }
      function Xn(e) {
        var r = Fr(e);
        return r.references = r.references || {}, r.references;
      }
      function yi(e) {
        var r = e.data, n = e.metaData, i = e.sender, a = e.receiver, u = e.passByReference, d = u !== void 0 && u, h = e.basic, l = h !== void 0 && h, m = Mr(a.win), P = l ? JSON.stringify(r) : fi(m, a.domain, r, {
          on: At,
          send: Rt
        }), g = d ? function(w) {
          var E = rt();
          return Xn(window)[E] = w, {
            type: "uid",
            uid: E
          };
        }(P) : {
          type: "raw",
          val: P
        };
        return {
          serializedData: Ga({
            sender: {
              domain: i.domain
            },
            metaData: n,
            reference: g
          }),
          cleanReference: function() {
            w = window, (E = g).type === "uid" && delete Xn(w)[E.uid];
            var w, E;
          }
        };
      }
      function Ei(e) {
        var r = e.sender, n = e.basic, i = n !== void 0 && n, a = function(P) {
          return JSON.parse(function(g) {
            if (typeof atob == "function") return decodeURIComponent([].map.call(atob(g), function(w) {
              return "%" + ("00" + w.charCodeAt(0).toString(16)).slice(-2);
            }).join(""));
            if (typeof Buffer < "u") return Buffer.from(g, "base64").toString("utf8");
            throw new Error("Can not find window.atob or Buffer");
          }(P));
        }(e.data), u = a.reference, d = a.metaData, h;
        h = typeof r.win == "function" ? r.win({
          metaData: d
        }) : r.win;
        var l;
        l = typeof r.domain == "function" ? r.domain({
          metaData: d
        }) : typeof r.domain == "string" ? r.domain : a.sender.domain;
        var m = function(P, g) {
          if (g.type === "raw") return g.val;
          if (g.type === "uid") return Xn(P)[g.uid];
          throw new Error("Unsupported ref type: " + g.type);
        }(h, u);
        return {
          data: i ? JSON.parse(m) : function(P, g, w) {
            return li(P, g, w, {
              on: At,
              send: Rt
            });
          }(h, l, m),
          metaData: d,
          sender: {
            win: h,
            domain: l
          },
          reference: u
        };
      }
      var be = {
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
      }, Ce = B, xe = {
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
      var Ja = Bt(function(e) {
        var r = Ei({
          data: Qn(e).serializedInitialPayload,
          sender: {
            win: function(n) {
              return function(i) {
                if (i.type === "opener") return on("opener", Y(window));
                if (i.type === "parent" && typeof i.distance == "number") return on("parent", function(g, w) {
                  return w === void 0 && (w = 1), function(E, T) {
                    T === void 0 && (T = 1);
                    for (var S = E, x = 0; x < T; x++) {
                      if (!S) return;
                      S = ve(S);
                    }
                    return S;
                  }(g, pr(g) - w);
                }(window, i.distance));
                if (i.type === "global" && i.uid && typeof i.uid == "string") {
                  var a = i.uid, u = tr(window);
                  if (!u) throw new Error("Can not find ancestor window");
                  for (var d = 0, h = lt(u); d < h.length; d++) {
                    var l = h[d];
                    if (C(l)) {
                      var m = gi(l, function(g) {
                        return g.windows && g.windows[a];
                      });
                      if (m) return m;
                    }
                  }
                } else if (i.type === "name") {
                  var P = i.name;
                  return on("namedWindow", function(g, w) {
                    return hr(g, w) || function E(T, S) {
                      var x = hr(T, S);
                      if (x) return x;
                      for (var W = 0, L = at(T); W < L.length; W++) {
                        var J = E(L[W], S);
                        if (J) return J;
                      }
                    }(st(g) || g, w);
                  }(on("ancestor", tr(window)), P));
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
      function Pi() {
        return Ja(window.name);
      }
      function Ka(e, r) {
        if (r === void 0 && (r = window), e === ve(r)) return {
          type: "parent",
          distance: pr(e)
        };
        if (e === Y(r)) return {
          type: "opener"
        };
        if (C(e) && (i = e, i !== st(i))) {
          var n = oe(e).name;
          if (n) return {
            type: "name",
            name: n
          };
        }
        var i;
      }
      function Ti(e, r, n, i, a) {
        if (!e.hasOwnProperty(n)) return i;
        var u = e[n];
        return typeof u.childDecorate == "function" ? u.childDecorate({
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
      function Ya() {
        return p.try(function() {
          window.focus();
        });
      }
      function Ri() {
        return p.try(function() {
          window.close();
        });
      }
      var Wt = function() {
        return Se;
      }, or = function(e) {
        return en(e.value);
      };
      function kn(e, r, n) {
        for (var i = 0, a = Object.keys(y({}, e, r)); i < a.length; i++) {
          var u = a[i];
          n(u, r[u], e[u]);
        }
      }
      function Si(e, r, n) {
        var i = {};
        return p.all(function(a, u, d) {
          var h = [];
          return kn(a, u, function(l, m, P) {
            var g = function(w, E, T) {
              return p.resolve().then(function() {
                var S, x;
                if (T != null && E) {
                  var W = (S = {}, S.get = E.queryParam, S.post = E.bodyParam, S)[n], L = (x = {}, x.get = E.queryValue, x.post = E.bodyValue, x)[n];
                  if (W) return p.hash({
                    finalParam: p.try(function() {
                      return typeof W == "function" ? W({
                        value: T
                      }) : typeof W == "string" ? W : w;
                    }),
                    finalValue: p.try(function() {
                      return typeof L == "function" && qt(T) ? L({
                        value: T
                      }) : T;
                    })
                  }).then(function(J) {
                    var M = J.finalParam, V = J.finalValue, j;
                    if (typeof V == "boolean") j = V.toString();
                    else if (typeof V == "string") j = V.toString();
                    else if (typeof V == "object" && V !== null) {
                      if (E.serialization === ln.JSON) j = JSON.stringify(V);
                      else if (E.serialization === ln.BASE64) j = Cn(JSON.stringify(V));
                      else if (E.serialization === ln.DOTIFY || !E.serialization) {
                        j = function ce(Z, G, fe) {
                          G === void 0 && (G = ""), fe === void 0 && (fe = {}), G = G && G + ".";
                          for (var te in Z) Z.hasOwnProperty(te) && Z[te] != null && typeof Z[te] != "function" && (Z[te] && Array.isArray(Z[te]) && Z[te].length && Z[te].every(function(_e) {
                            return typeof _e != "object";
                          }) ? fe["" + G + te + "[]"] = Z[te].join(",") : Z[te] && typeof Z[te] == "object" ? fe = ce(Z[te], "" + G + te, fe) : fe["" + G + te] = Z[te].toString());
                          return fe;
                        }(V, w);
                        for (var ee = 0, H = Object.keys(j); ee < H.length; ee++) {
                          var le = H[ee];
                          i[le] = j[le];
                        }
                        return;
                      }
                    } else typeof V == "number" && (j = V.toString());
                    i[M] = j;
                  });
                }
              });
            }(l, m, P);
            h.push(g);
          }), h;
        }(r, e)).then(function() {
          return i;
        });
      }
      function xi(e) {
        var r = e.uid, n = e.options, i = e.overrides, a = i === void 0 ? {} : i, u = e.parentWin, d = u === void 0 ? window : u, h = n.propsDef, l = n.containerTemplate, m = n.prerenderTemplate, P = n.tag, g = n.name, w = n.attributes, E = n.dimensions, T = n.autoResize, S = n.url, x = n.domain, W = n.exports, L = new p(), J = [], M = nn(), V = {}, j = {}, ee = {
          visible: !0
        }, H = a.event ? a.event : (le = {}, ce = {}, Z = {
          on: function(O, D) {
            var $ = ce[O] = ce[O] || [];
            $.push(D);
            var q = !1;
            return {
              cancel: function() {
                q || (q = !0, $.splice($.indexOf(D), 1));
              }
            };
          },
          once: function(O, D) {
            var $ = Z.on(O, function() {
              $.cancel(), D();
            });
            return $;
          },
          trigger: function(O) {
            for (var D = arguments.length, $ = new Array(D > 1 ? D - 1 : 0), q = 1; q < D; q++) $[q - 1] = arguments[q];
            var ne = ce[O], X = [];
            if (ne)
              for (var Pe = function() {
                var Ge = ne[Te];
                X.push(p.try(function() {
                  return Ge.apply(void 0, $);
                }));
              }, Te = 0; Te < ne.length; Te++) Pe();
            return p.all(X).then(Se);
          },
          triggerOnce: function(O) {
            if (le[O]) return p.resolve();
            le[O] = !0;
            for (var D = arguments.length, $ = new Array(D > 1 ? D - 1 : 0), q = 1; q < D; q++) $[q - 1] = arguments[q];
            return Z.trigger.apply(Z, [O].concat($));
          },
          reset: function() {
            ce = {};
          }
        }), le, ce, Z, G = a.props ? a.props : {}, fe, te, _e, Ct, yt, Ht = !1, Vt = a.onError, Mt = a.getProxyContainer, Gt = a.show, Jt = a.hide, ir = a.close, Kt = a.renderContainer, St = a.getProxyWindow, ar = a.setProxyWin, Yt = a.openFrame, Zt = a.openPrerenderFrame, sr = a.prerender, cr = a.open, ue = a.openPrerender, Et = a.watchForUnload, de = a.getInternalState, He = a.setInternalState, Me = function() {
          return typeof E == "function" ? E({
            props: G
          }) : E;
        }, Ve = function() {
          return p.try(function() {
            return a.resolveInitPromise ? a.resolveInitPromise() : L.resolve();
          });
        }, De = function(O) {
          return p.try(function() {
            return a.rejectInitPromise ? a.rejectInitPromise(O) : L.reject(O);
          });
        }, nt = function(O) {
          for (var D = {}, $ = 0, q = Object.keys(G); $ < q.length; $++) {
            var ne = q[$], X = h[ne];
            if (!X || X.sendToChild !== !1) {
              var Pe = X && X.trustedDomains && X.trustedDomains.length > 0 ? X.trustedDomains.reduce(function(Te, Ge) {
                return Te || vt(Ge, O);
              }, !1) : vt(O, z(window));
              X && X.sameDomain && !Pe || X && X.trustedDomains && !Pe || (D[ne] = G[ne]);
            }
          }
          return p.hash(D);
        }, Be = function() {
          return p.try(function() {
            return de ? de() : ee;
          });
        }, qe = function(O) {
          return p.try(function() {
            return He ? He(O) : ee = y({}, ee, O);
          });
        }, bt = function() {
          return St ? St() : p.try(function() {
            var O = G.window;
            if (O) {
              var D = Mr(O);
              return M.register(function() {
                return O.close();
              }), D;
            }
            return new gt({
              send: Rt
            });
          });
        }, ct = function(O) {
          return ar ? ar(O) : p.try(function() {
            fe = O;
          });
        }, xt = function() {
          return Gt ? Gt() : p.hash({
            setState: qe({
              visible: !0
            }),
            showElement: te ? te.get().then(za) : null
          }).then(Se);
        }, Ft = function() {
          return Jt ? Jt() : p.hash({
            setState: qe({
              visible: !1
            }),
            showElement: te ? te.get().then(qo) : null
          }).then(Se);
        }, gr = function() {
          return typeof S == "function" ? S({
            props: G
          }) : S;
        }, yr = function() {
          return typeof w == "function" ? w({
            props: G
          }) : w;
        }, ur = function() {
          return Nt(gr());
        }, ut = function(O, D) {
          var $ = D.windowName;
          return Yt ? Yt(O, {
            windowName: $
          }) : p.try(function() {
            if (O === Ce.IFRAME) return fn(jo({
              attributes: y({
                name: $,
                title: g
              }, yr().iframe)
            }));
          });
        }, zr = function(O) {
          return Zt ? Zt(O) : p.try(function() {
            if (O === Ce.IFRAME) return fn(jo({
              attributes: y({
                name: "__zoid_prerender_frame__" + g + "_" + rt() + "__",
                title: "prerender__" + g
              }, yr().iframe)
            }));
          });
        }, Ur = function(O, D, $) {
          return ue ? ue(O, D, $) : p.try(function() {
            if (O === Ce.IFRAME) {
              if (!$) throw new Error("Expected proxy frame to be passed");
              return $.get().then(function(q) {
                return M.register(function() {
                  return Ar(q);
                }), Un(q).then(function(ne) {
                  return oe(ne);
                }).then(function(ne) {
                  return Mr(ne);
                });
              });
            }
            if (O === Ce.POPUP) return D;
            throw new Error("No render context available for " + O);
          });
        }, Er = function() {
          return p.try(function() {
            if (fe) return p.all([H.trigger(xe.FOCUS), fe.focus()]).then(Se);
          });
        }, hn = function() {
          var O = Fr(window);
          return O.windows = O.windows || {}, O.windows[r] = window, M.register(function() {
            delete O.windows[r];
          }), r;
        }, Lr = function(O, D, $, q) {
          if (D === z(window)) return {
            type: "global",
            uid: hn()
          };
          if (O !== window) throw new Error("Can not construct cross-domain window reference for different target window");
          if (G.window) {
            var ne = q.getWindow();
            if (!ne) throw new Error("Can not construct cross-domain window reference for lazy window prop");
            if (tr(ne) !== window) throw new Error("Can not construct cross-domain window reference for window prop with different ancestor");
          }
          if ($ === Ce.POPUP) return {
            type: "opener"
          };
          if ($ === Ce.IFRAME) return {
            type: "parent",
            distance: pr(window)
          };
          throw new Error("Can not construct window reference for child");
        }, pn = function(O, D) {
          return p.try(function() {
            var $;
            Ct = O, _e = D, ($ = fe) == null || $.isPopup().then(function(q) {
              if ((D == null ? void 0 : D.name) !== "" && q) {
                var ne;
                (ne = fe) == null || ne.setName(D == null ? void 0 : D.name);
              }
            }).finally(function() {
              Ve(), M.register(function() {
                return D.close.fireAndForget().catch(Se);
              });
            });
          });
        }, jr = function(O) {
          var D = O.width, $ = O.height;
          return p.try(function() {
            H.trigger(xe.RESIZE, {
              width: D,
              height: $
            });
          });
        }, Br = function(O) {
          return p.try(function() {
            return H.trigger(xe.DESTROY);
          }).catch(Se).then(function() {
            return M.all(O);
          }).then(function() {
            var D = O || new Error("Component destroyed");
            yt && mr(yt) || D.message === "Window navigated away" ? L.resolve() : L.asyncReject(D);
          });
        }, zt = Bt(function(O) {
          return p.try(function() {
            return ir ? We(ir.__source__) ? void 0 : ir() : p.try(function() {
              return H.trigger(xe.CLOSE);
            }).then(function() {
              return Br(O || new Error("Component closed"));
            });
          });
        }), Di = function(O, D) {
          var $ = D.proxyWin, q = D.proxyFrame, ne = D.windowName;
          return cr ? cr(O, {
            proxyWin: $,
            proxyFrame: q,
            windowName: ne
          }) : p.try(function() {
            if (O === Ce.IFRAME) {
              if (!q) throw new Error("Expected proxy frame to be passed");
              return q.get().then(function(Fe) {
                return Un(Fe).then(function(ge) {
                  return M.register(function() {
                    return Ar(Fe);
                  }), M.register(function() {
                    return mi(ge);
                  }), ge;
                });
              });
            }
            if (O === Ce.POPUP) {
              var X = Me(), Pe = X.width, Te = Pe === void 0 ? "300px" : Pe, Ge = X.height, Oe = Ge === void 0 ? "150px" : Ge;
              Te = Jo(Te, window.outerWidth), Oe = Jo(Oe, window.outerWidth);
              var $e = function(Fe, ge) {
                var ze = (ge = ge || {}).closeOnUnload, Ie = ze === void 0 ? 1 : ze, dt = ge.name, Je = dt === void 0 ? "" : dt, pe = ge.width, Ke = ge.height, ot = 0, ke = 0;
                pe && (window.outerWidth ? ke = Math.round((window.outerWidth - pe) / 2) + window.screenX : window.screen.width && (ke = Math.round((window.screen.width - pe) / 2))), Ke && (window.outerHeight ? ot = Math.round((window.outerHeight - Ke) / 2) + window.screenY : window.screen.height && (ot = Math.round((window.screen.height - Ke) / 2))), delete ge.closeOnUnload, delete ge.name, pe && Ke && (ge = y({
                  top: ot,
                  left: ke,
                  width: pe,
                  height: Ke,
                  status: 1,
                  toolbar: 0,
                  menubar: 0,
                  resizable: 1,
                  scrollbars: 1
                }, ge));
                var dr = Object.keys(ge).map(function(_t) {
                  if (ge[_t] != null) return _t + "=" + tn(ge[_t]);
                }).filter(Boolean).join(","), Pt;
                try {
                  Pt = window.open("", Je, dr);
                } catch (_t) {
                  throw new zn("Can not open popup window - " + (_t.stack || _t.message));
                }
                if (We(Pt))
                  throw new zn("Can not open popup window - blocked");
                return Ie && window.addEventListener("unload", function() {
                  return Pt.close();
                }), Pt;
              }(0, y({
                name: ne,
                width: Te,
                height: Oe
              }, yr().popup));
              return M.register(function() {
                return xo($e);
              }), M.register(function() {
                return mi($e);
              }), $e;
            }
            throw new Error("No render context available for " + O);
          }).then(function(X) {
            return $.setWindow(X, {
              send: Rt
            }), $.setName(ne).then(function() {
              return $;
            });
          });
        }, Ci = function() {
          return p.try(function() {
            var O = Bo(window, "unload", en(function() {
              Br(new Error("Window navigated away"));
            })), D = Ro(d, Br, 3e3);
            if (M.register(D.cancel), M.register(O.cancel), Et) return Et();
          });
        }, _i = function(O) {
          var D = !1;
          return O.isClosed().then(function($) {
            return $ ? (D = !0, zt(new Error("Detected component window close"))) : p.delay(200).then(function() {
              return O.isClosed();
            }).then(function(q) {
              if (q)
                return D = !0, zt(new Error("Detected component window close"));
            });
          }).then(function() {
            return D;
          });
        }, qr = function(O) {
          return Vt ? Vt(O) : p.try(function() {
            if (J.indexOf(O) === -1)
              return J.push(O), L.asyncReject(O), H.trigger(xe.ERROR, O);
          });
        }, Ni = new p(), Ai = function(O) {
          return p.try(function() {
            Ni.resolve(O);
          });
        };
        pn.onError = qr;
        var Wi = function(O, D) {
          return O({
            uid: r,
            container: D.container,
            context: D.context,
            doc: D.doc,
            frame: D.frame,
            prerenderFrame: D.prerenderFrame,
            focus: Er,
            close: zt,
            state: V,
            props: G,
            tag: P,
            dimensions: Me(),
            event: H
          });
        }, Mi = function(O, D) {
          var $ = D.context;
          return sr ? sr(O, {
            context: $
          }) : p.try(function() {
            if (m) {
              H.trigger(xe.PRERENDER);
              var q = O.getWindow();
              if (q && C(q) && function(ze) {
                try {
                  if (!ze.location.href || ze.location.href === "about:blank") return !0;
                } catch {
                }
                return !1;
              }(q)) {
                var ne = (q = oe(q)).document, X = Wi(m, {
                  context: $,
                  doc: ne
                });
                if (X) {
                  if (X.ownerDocument !== ne) throw new Error("Expected prerender template to have been created with document from child window");
                  (function(ze, Ie) {
                    var dt = Ie.tagName.toLowerCase();
                    if (dt !== "html") throw new Error("Expected element to be html, got " + dt);
                    for (var Je = ze.document.documentElement, pe = 0, Ke = An(Je.children); pe < Ke.length; pe++) Je.removeChild(Ke[pe]);
                    for (var ot = 0, ke = An(Ie.children); ot < ke.length; ot++) Je.appendChild(ke[ot]);
                  })(q, X);
                  var Pe = T.width, Te = Pe !== void 0 && Pe, Ge = T.height, Oe = Ge !== void 0 && Ge, $e = T.element, Fe = $e === void 0 ? "body" : $e;
                  if ((Fe = Fn(Fe, ne)) && (Te || Oe)) {
                    var ge = $o(Fe, function(ze) {
                      jr({
                        width: Te ? ze.width : void 0,
                        height: Oe ? ze.height : void 0
                      });
                    }, {
                      width: Te,
                      height: Oe,
                      win: q
                    });
                    H.on(xe.RENDERED, ge.cancel);
                  }
                  H.trigger(xe.PRERENDERED);
                }
              }
            }
          });
        }, Fi = function(O, D) {
          var $ = D.proxyFrame, q = D.proxyPrerenderFrame, ne = D.context, X = D.rerender;
          return Kt ? Kt(O, {
            proxyFrame: $,
            proxyPrerenderFrame: q,
            context: ne,
            rerender: X
          }) : p.hash({
            container: O.get(),
            frame: $ ? $.get() : null,
            prerenderFrame: q ? q.get() : null,
            internalState: Be()
          }).then(function(Pe) {
            var Te = Pe.container, Ge = Pe.internalState.visible, Oe = Wi(l, {
              context: ne,
              container: Te,
              frame: Pe.frame,
              prerenderFrame: Pe.prerenderFrame,
              doc: document
            });
            if (Oe) {
              Ge || qo(Oe), Fa(Te, Oe);
              var $e = function(Fe, ge) {
                ge = en(ge);
                var ze = !1, Ie = [], dt, Je, pe, Ke = function() {
                  ze = !0;
                  for (var Pt = 0; Pt < Ie.length; Pt++) Ie[Pt].disconnect();
                  dt && dt.cancel(), pe && pe.removeEventListener("unload", ot), Je && Ar(Je);
                }, ot = function() {
                  ze || (ge(), Ke());
                };
                if (mr(Fe))
                  return ot(), {
                    cancel: Ke
                  };
                if (window.MutationObserver)
                  for (var ke = Fe.parentElement; ke; ) {
                    var dr = new window.MutationObserver(function() {
                      mr(Fe) && ot();
                    });
                    dr.observe(ke, {
                      childList: !0
                    }), Ie.push(dr), ke = ke.parentElement;
                  }
                return (Je = document.createElement("iframe")).setAttribute("name", "__detect_close_" + rt() + "__"), Je.style.display = "none", Un(Je).then(function(Pt) {
                  (pe = oe(Pt)).addEventListener("unload", ot);
                }), Fe.appendChild(Je), dt = _r(function() {
                  mr(Fe) && ot();
                }, 1e3), {
                  cancel: Ke
                };
              }(Oe, function() {
                var Fe = new Error("Detected container element removed from DOM");
                return p.delay(1).then(function() {
                  if (!mr(Oe))
                    return M.all(Fe), X().then(Ve, De);
                  zt(Fe);
                });
              });
              return M.register(function() {
                return $e.cancel();
              }), M.register(function() {
                return Ar(Oe);
              }), te = fn(Oe);
            }
          });
        }, zi = function() {
          return {
            state: V,
            event: H,
            close: zt,
            focus: Er,
            resize: jr,
            onError: qr,
            updateProps: as,
            show: xt,
            hide: Ft
          };
        }, ro = function(O) {
          O === void 0 && (O = {});
          var D = yt, $ = zi();
          wr(j, O), function(q, ne, X, Pe, Te) {
            var Ge = Pe.state, Oe = Pe.close, $e = Pe.focus, Fe = Pe.event, ge = Pe.onError;
            kn(X, q, function(ze, Ie, dt) {
              var Je = !1, pe = dt;
              Object.defineProperty(ne, ze, {
                configurable: !0,
                enumerable: !0,
                get: function() {
                  return Je ? pe : (Je = !0, function() {
                    if (!Ie) return pe;
                    var Ke = Ie.alias;
                    if (Ke && !qt(dt) && qt(X[Ke]) && (pe = X[Ke]), Ie.value && (pe = Ie.value({
                      props: ne,
                      state: Ge,
                      close: Oe,
                      focus: $e,
                      event: Fe,
                      onError: ge,
                      container: Te
                    })), !Ie.default || qt(pe) || qt(X[ze]) || (pe = Ie.default({
                      props: ne,
                      state: Ge,
                      close: Oe,
                      focus: $e,
                      event: Fe,
                      onError: ge,
                      container: Te
                    })), qt(pe)) {
                      if (Ie.type === be.ARRAY ? !Array.isArray(pe) : typeof pe !== Ie.type) throw new TypeError("Prop is not of type " + Ie.type + ": " + ze);
                    } else if (Ie.required !== !1 && !qt(X[ze])) throw new Error('Expected prop "' + ze + '" to be defined');
                    return qt(pe) && Ie.decorate && (pe = Ie.decorate({
                      value: pe,
                      props: ne,
                      state: Ge,
                      close: Oe,
                      focus: $e,
                      event: Fe,
                      onError: ge,
                      container: Te
                    })), pe;
                  }());
                }
              });
            }), kn(ne, q, Se);
          }(h, G, j, $, D);
        }, as = function(O) {
          return ro(O), L.then(function() {
            var D = _e, $ = fe;
            if (D && $ && Ct) return nt(Ct).then(function(q) {
              return D.updateProps(q).catch(function(ne) {
                return _i($).then(function(X) {
                  if (!X) throw ne;
                });
              });
            });
          });
        }, Ui = function(O) {
          return Mt ? Mt(O) : p.try(function() {
            return Uo(O);
          }).then(function(D) {
            return Ln(D) && (D = function $(q) {
              var ne = function(Ge) {
                var Oe = function($e) {
                  for (; $e.parentNode; ) $e = $e.parentNode;
                  if (Ln($e)) return $e;
                }(Ge);
                if (Oe && Oe.host) return Oe.host;
              }(q);
              if (!ne) throw new Error("Element is not in shadow dom");
              var X = "shadow-slot-" + rt(), Pe = document.createElement("slot");
              Pe.setAttribute("name", X), q.appendChild(Pe);
              var Te = document.createElement("div");
              return Te.setAttribute("slot", X), ne.appendChild(Te), Ln(ne) ? $(Te) : Te;
            }(D)), yt = D, fn(D);
          });
        };
        return {
          init: function() {
            (function() {
              H.on(xe.RENDER, function() {
                return G.onRender();
              }), H.on(xe.PRERENDER, function() {
                return G.onPrerender();
              }), H.on(xe.DISPLAY, function() {
                return G.onDisplay();
              }), H.on(xe.RENDERED, function() {
                return G.onRendered();
              }), H.on(xe.PRERENDERED, function() {
                return G.onPrerendered();
              }), H.on(xe.CLOSE, function() {
                return G.onClose();
              }), H.on(xe.DESTROY, function() {
                return G.onDestroy();
              }), H.on(xe.RESIZE, function() {
                return G.onResize();
              }), H.on(xe.FOCUS, function() {
                return G.onFocus();
              }), H.on(xe.PROPS, function(O) {
                return G.onProps(O);
              }), H.on(xe.ERROR, function(O) {
                return G && G.onError ? G.onError(O) : De(O).then(function() {
                  setTimeout(function() {
                    throw O;
                  }, 1);
                });
              }), M.register(H.reset);
            })();
          },
          render: function(O) {
            var D = O.target, $ = O.container, q = O.context, ne = O.rerender;
            return p.try(function() {
              var X = ur(), Pe = x || ur();
              (function(K, Ye, Ue) {
                if (K !== window) {
                  if (!Zr(window, K)) throw new Error("Can only renderTo an adjacent frame");
                  var Ze = z();
                  if (!vt(Ye, Ze) && !C(K)) throw new Error("Can not render remotely to " + Ye.toString() + " - can only render to " + Ze);
                  if (Ue && typeof Ue != "string") throw new Error("Container passed to renderTo must be a string selector, got " + typeof Ue + " }");
                }
              })(D, Pe, $);
              var Te = p.try(function() {
                if (D !== window) return function(K, Ye) {
                  for (var Ue = {}, Ze = 0, ht = Object.keys(G); Ze < ht.length; Ze++) {
                    var Le = ht[Ze], Tt = h[Le];
                    Tt && Tt.allowDelegate && (Ue[Le] = G[Le]);
                  }
                  var et = Rt(Ye, "zoid_delegate_" + g, {
                    uid: r,
                    overrides: {
                      props: Ue,
                      event: H,
                      close: zt,
                      onError: qr,
                      getInternalState: Be,
                      setInternalState: qe,
                      resolveInitPromise: Ve,
                      rejectInitPromise: De
                    }
                  }).then(function(Q) {
                    var k = Q.data.parent;
                    return M.register(function(F) {
                      if (!We(Ye)) return k.destroy(F);
                    }), k.getDelegateOverrides();
                  }).catch(function(Q) {
                    throw new Error(`Unable to delegate rendering. Possibly the component is not loaded in the target window.

` + vr(Q));
                  });
                  return Mt = function() {
                    for (var Q = arguments.length, k = new Array(Q), F = 0; F < Q; F++) k[F] = arguments[F];
                    return et.then(function(re) {
                      return re.getProxyContainer.apply(re, k);
                    });
                  }, Kt = function() {
                    for (var Q = arguments.length, k = new Array(Q), F = 0; F < Q; F++) k[F] = arguments[F];
                    return et.then(function(re) {
                      return re.renderContainer.apply(re, k);
                    });
                  }, Gt = function() {
                    for (var Q = arguments.length, k = new Array(Q), F = 0; F < Q; F++) k[F] = arguments[F];
                    return et.then(function(re) {
                      return re.show.apply(re, k);
                    });
                  }, Jt = function() {
                    for (var Q = arguments.length, k = new Array(Q), F = 0; F < Q; F++) k[F] = arguments[F];
                    return et.then(function(re) {
                      return re.hide.apply(re, k);
                    });
                  }, Et = function() {
                    for (var Q = arguments.length, k = new Array(Q), F = 0; F < Q; F++) k[F] = arguments[F];
                    return et.then(function(re) {
                      return re.watchForUnload.apply(re, k);
                    });
                  }, K === Ce.IFRAME ? (St = function() {
                    for (var Q = arguments.length, k = new Array(Q), F = 0; F < Q; F++) k[F] = arguments[F];
                    return et.then(function(re) {
                      return re.getProxyWindow.apply(re, k);
                    });
                  }, Yt = function() {
                    for (var Q = arguments.length, k = new Array(Q), F = 0; F < Q; F++) k[F] = arguments[F];
                    return et.then(function(re) {
                      return re.openFrame.apply(re, k);
                    });
                  }, Zt = function() {
                    for (var Q = arguments.length, k = new Array(Q), F = 0; F < Q; F++) k[F] = arguments[F];
                    return et.then(function(re) {
                      return re.openPrerenderFrame.apply(re, k);
                    });
                  }, sr = function() {
                    for (var Q = arguments.length, k = new Array(Q), F = 0; F < Q; F++) k[F] = arguments[F];
                    return et.then(function(re) {
                      return re.prerender.apply(re, k);
                    });
                  }, cr = function() {
                    for (var Q = arguments.length, k = new Array(Q), F = 0; F < Q; F++) k[F] = arguments[F];
                    return et.then(function(re) {
                      return re.open.apply(re, k);
                    });
                  }, ue = function() {
                    for (var Q = arguments.length, k = new Array(Q), F = 0; F < Q; F++) k[F] = arguments[F];
                    return et.then(function(re) {
                      return re.openPrerender.apply(re, k);
                    });
                  }) : K === Ce.POPUP && (ar = function() {
                    for (var Q = arguments.length, k = new Array(Q), F = 0; F < Q; F++) k[F] = arguments[F];
                    return et.then(function(re) {
                      return re.setProxyWin.apply(re, k);
                    });
                  }), et;
                }(q, D);
              }), Ge = G.window, Oe = Ci(), $e = Si(h, G, "post"), Fe = H.trigger(xe.RENDER), ge = Ui($), ze = bt(), Ie = ge.then(function() {
                return ro();
              }), dt = Ie.then(function() {
                return Si(h, G, "get").then(function(K) {
                  return function(Ye, Ue) {
                    var Ze = Ue.query || {}, ht = Ue.hash || {}, Le, Tt, et = Ye.split("#");
                    Tt = et[1];
                    var Q = (Le = et[0]).split("?");
                    Le = Q[0];
                    var k = zo(Q[1], Ze), F = zo(Tt, ht);
                    return k && (Le = Le + "?" + k), F && (Le = Le + "#" + F), Le;
                  }(xn(gr()), {
                    query: K
                  });
                });
              }), Je = ze.then(function(K) {
                return function(Ue) {
                  var Ze = Ue === void 0 ? {} : Ue, ht = Ze.proxyWin, Le = Ze.initialChildDomain, Tt = Ze.childDomainMatch, et = Ze.target, Q = et === void 0 ? window : et, k = Ze.context;
                  return function(F) {
                    var re = F === void 0 ? {} : F, no = re.proxyWin, hs = re.childDomainMatch, ps = re.context;
                    return nt(re.initialChildDomain).then(function(vs) {
                      return {
                        uid: r,
                        context: ps,
                        tag: P,
                        childDomainMatch: hs,
                        version: "10_3_3",
                        props: vs,
                        exports: (Bi = no, {
                          init: function(ws) {
                            return pn(this.origin, ws);
                          },
                          close: zt,
                          checkClose: function() {
                            return _i(Bi);
                          },
                          resize: jr,
                          onError: qr,
                          show: xt,
                          hide: Ft,
                          export: Ai
                        })
                      };
                      var Bi;
                    });
                  }({
                    proxyWin: ht,
                    initialChildDomain: Le,
                    childDomainMatch: Tt,
                    context: k
                  }).then(function(F) {
                    var re = yi({
                      data: F,
                      metaData: {
                        windowRef: Lr(Q, Le, k, ht)
                      },
                      sender: {
                        domain: z(window)
                      },
                      receiver: {
                        win: ht,
                        domain: Tt
                      },
                      passByReference: Le === z()
                    }), no = re.serializedData;
                    return M.register(re.cleanReference), no;
                  });
                }({
                  proxyWin: (Ye = {
                    proxyWin: K,
                    initialChildDomain: X,
                    childDomainMatch: Pe,
                    target: D,
                    context: q
                  }).proxyWin,
                  initialChildDomain: Ye.initialChildDomain,
                  childDomainMatch: Ye.childDomainMatch,
                  target: Ye.target,
                  context: Ye.context
                }).then(function(Ue) {
                  return bi({
                    name: g,
                    serializedPayload: Ue
                  });
                });
                var Ye;
              }), pe = Je.then(function(K) {
                return ut(q, {
                  windowName: K
                });
              }), Ke = zr(q), ot = p.hash({
                proxyContainer: ge,
                proxyFrame: pe,
                proxyPrerenderFrame: Ke
              }).then(function(K) {
                return Fi(K.proxyContainer, {
                  context: q,
                  proxyFrame: K.proxyFrame,
                  proxyPrerenderFrame: K.proxyPrerenderFrame,
                  rerender: ne
                });
              }).then(function(K) {
                return K;
              }), ke = p.hash({
                windowName: Je,
                proxyFrame: pe,
                proxyWin: ze
              }).then(function(K) {
                var Ye = K.proxyWin;
                return Ge ? Ye : Di(q, {
                  windowName: K.windowName,
                  proxyWin: Ye,
                  proxyFrame: K.proxyFrame
                });
              }), dr = p.hash({
                proxyWin: ke,
                proxyPrerenderFrame: Ke
              }).then(function(K) {
                return Ur(q, K.proxyWin, K.proxyPrerenderFrame);
              }), Pt = ke.then(function(K) {
                return fe = K, ct(K);
              }), _t = p.hash({
                proxyPrerenderWin: dr,
                state: Pt
              }).then(function(K) {
                return Mi(K.proxyPrerenderWin, {
                  context: q
                });
              }), Li = p.hash({
                proxyWin: ke,
                windowName: Je
              }).then(function(K) {
                if (Ge) return K.proxyWin.setName(K.windowName);
              }), ss = p.hash({
                body: $e
              }).then(function(K) {
                return n.method ? n.method : Object.keys(K.body).length ? "post" : "get";
              }), ji = p.hash({
                proxyWin: ke,
                windowUrl: dt,
                body: $e,
                method: ss,
                windowName: Li,
                prerender: _t
              }).then(function(K) {
                return K.proxyWin.setLocation(K.windowUrl, {
                  method: K.method,
                  body: K.body
                });
              }), cs = ke.then(function(K) {
                (function Ye(Ue, Ze) {
                  var ht = !1;
                  return M.register(function() {
                    ht = !0;
                  }), p.delay(2e3).then(function() {
                    return Ue.isClosed();
                  }).then(function(Le) {
                    if (!ht) {
                      if (Ze === Ce.POPUP && Le) return zt(new Error("Detected popup close"));
                      var Tt = !!(yt && mr(yt));
                      return Ze === Ce.IFRAME && Le && (Tt || Ht) ? zt(new Error("Detected iframe close")) : Ye(Ue, Ze);
                    }
                  });
                })(K, q);
              }), us = p.hash({
                container: ot,
                prerender: _t
              }).then(function() {
                return H.trigger(xe.DISPLAY);
              }), ds = ke.then(function(K) {
                return function(Ye, Ue, Ze) {
                  return p.try(function() {
                    return Ye.awaitWindow();
                  }).then(function(ht) {
                    if ($t && $t.needsBridge({
                      win: ht,
                      domain: Ue
                    }) && !$t.hasBridge(Ue, Ue)) {
                      var Le = typeof n.bridgeUrl == "function" ? n.bridgeUrl({
                        props: G
                      }) : n.bridgeUrl;
                      if (!Le) throw new Error("Bridge needed to render " + Ze);
                      var Tt = Nt(Le);
                      return $t.linkUrl(ht, Ue), $t.openBridge(xn(Le), Tt);
                    }
                  });
                }(K, X, q);
              }), fs = ji.then(function() {
                return p.try(function() {
                  var K = G.timeout;
                  if (K) return L.timeout(K, new Error("Loading component timed out after " + K + " milliseconds"));
                });
              }), ls = L.then(function() {
                return Ht = !0, H.trigger(xe.RENDERED);
              });
              return p.hash({
                initPromise: L,
                buildUrlPromise: dt,
                onRenderPromise: Fe,
                getProxyContainerPromise: ge,
                openFramePromise: pe,
                openPrerenderFramePromise: Ke,
                renderContainerPromise: ot,
                openPromise: ke,
                openPrerenderPromise: dr,
                setStatePromise: Pt,
                prerenderPromise: _t,
                loadUrlPromise: ji,
                buildWindowNamePromise: Je,
                setWindowNamePromise: Li,
                watchForClosePromise: cs,
                onDisplayPromise: us,
                openBridgePromise: ds,
                runTimeoutPromise: fs,
                onRenderedPromise: ls,
                delegatePromise: Te,
                watchForUnloadPromise: Oe,
                finalSetPropsPromise: Ie
              });
            }).catch(function(X) {
              return p.all([qr(X), Br(X)]).then(function() {
                throw X;
              }, function() {
                throw X;
              });
            }).then(Se);
          },
          destroy: Br,
          getProps: function() {
            return G;
          },
          setProps: ro,
          export: Ai,
          getHelpers: zi,
          getDelegateOverrides: function() {
            return p.try(function() {
              return {
                getProxyContainer: Ui,
                show: xt,
                hide: Ft,
                renderContainer: Fi,
                getProxyWindow: bt,
                watchForUnload: Ci,
                openFrame: ut,
                openPrerenderFrame: zr,
                prerender: Mi,
                open: Di,
                openPrerender: Ur,
                setProxyWin: ct
              };
            });
          },
          getExports: function() {
            return W({
              getExports: function() {
                return Ni;
              }
            });
          }
        };
      }
      var Za = {
        register: function(e, r, n, i) {
          var a = i.React, u = i.ReactDOM;
          return function(d) {
            R(h, d);
            function h() {
              return d.apply(this, arguments) || this;
            }
            var l = h.prototype;
            return l.render = function() {
              return a.createElement("div", null);
            }, l.componentDidMount = function() {
              var m = u.findDOMNode(this), P = n(wr({}, this.props));
              P.render(m, Ce.IFRAME), this.setState({
                parent: P
              });
            }, l.componentDidUpdate = function() {
              this.state && this.state.parent && this.state.parent.updateProps(wr({}, this.props)).catch(Se);
            }, h;
          }(a.Component);
        }
      }, Xa = {
        register: function(e, r, n, i) {
          return i.component(e, {
            render: function(a) {
              return a("div");
            },
            inheritAttrs: !1,
            mounted: function() {
              var a = this.$el;
              this.parent = n(y({}, (u = this.$attrs, Object.keys(u).reduce(function(d, h) {
                var l = u[h];
                return h === "style-object" || h === "styleObject" ? (d.style = l, d.styleObject = l) : h.includes("-") ? d[Nn(h)] = l : d[h] = l, d;
              }, {}))));
              var u;
              this.parent.render(a, Ce.IFRAME);
            },
            watch: {
              $attrs: {
                handler: function() {
                  this.parent && this.$attrs && this.parent.updateProps(y({}, this.$attrs)).catch(Se);
                },
                deep: !0
              }
            }
          });
        }
      }, Qa = {
        register: function(e, r, n) {
          return {
            template: "<div></div>",
            inheritAttrs: !1,
            mounted: function() {
              var i = this.$el;
              this.parent = n(y({}, (a = this.$attrs, Object.keys(a).reduce(function(u, d) {
                var h = a[d];
                return d === "style-object" || d === "styleObject" ? (u.style = h, u.styleObject = h) : d.includes("-") ? u[Nn(d)] = h : u[d] = h, u;
              }, {}))));
              var a;
              this.parent.render(i, Ce.IFRAME);
            },
            watch: {
              $attrs: {
                handler: function() {
                  this.parent && this.$attrs && this.parent.updateProps(y({}, this.$attrs)).catch(Se);
                },
                deep: !0
              }
            }
          };
        }
      }, ka = {
        register: function(e, r, n, i) {
          return i.module(e, []).directive(Nn(e), function() {
            for (var a = {}, u = 0, d = Object.keys(r); u < d.length; u++) a[d[u]] = "=";
            return a.props = "=", {
              scope: a,
              restrict: "E",
              controller: ["$scope", "$element", function(h, l) {
                function m() {
                  if (h.$root.$$phase !== "$apply" && h.$root.$$phase !== "$digest") try {
                    h.$apply();
                  } catch {
                  }
                }
                var P = function() {
                  return rn(h.props, function(w) {
                    return typeof w == "function" ? function() {
                      var E = w.apply(this, arguments);
                      return m(), E;
                    } : w;
                  });
                }, g = n(P());
                g.render(l[0], Ce.IFRAME), h.$watch(function() {
                  g.updateProps(P()).catch(Se);
                });
              }]
            };
          });
        }
      }, es = {
        register: function(e, r, n, i) {
          var a = i.Component, u = i.NgModule, d = i.ElementRef, h = i.NgZone, l = i.Inject, m = function() {
            function g(E, T) {
              this.elementRef = void 0, this.internalProps = void 0, this.parent = void 0, this.props = void 0, this.zone = void 0, this._props = void 0, this._props = {}, this.elementRef = E, this.zone = T;
            }
            var w = g.prototype;
            return w.getProps = function() {
              var E = this;
              return rn(y({}, this.internalProps, this.props), function(T) {
                if (typeof T == "function") {
                  var S = E.zone;
                  return function() {
                    var x = arguments, W = this;
                    return S.run(function() {
                      return T.apply(W, x);
                    });
                  };
                }
                return T;
              });
            }, w.ngOnInit = function() {
              var E = this.elementRef.nativeElement;
              this.parent = n(this.getProps()), this.parent.render(E, Ce.IFRAME);
            }, w.ngDoCheck = function() {
              this.parent && !function(E, T) {
                var S = {};
                for (var x in E) if (E.hasOwnProperty(x) && (S[x] = !0, E[x] !== T[x]))
                  return !1;
                for (var W in T) if (!S[W]) return !1;
                return !0;
              }(this._props, this.props) && (this._props = y({}, this.props), this.parent.updateProps(this.getProps()));
            }, g;
          }();
          m.annotations = void 0, m.parameters = void 0, m.parameters = [[new l(d)], [new l(h)]], m.annotations = [new a({
            selector: e,
            template: "<div></div>",
            inputs: ["props"]
          })];
          var P = function() {
          };
          return P.annotations = void 0, P.annotations = [new u({
            declarations: [m],
            exports: [m]
          })], P;
        }
      };
      function ts(e) {
        var r = e.uid, n = e.frame, i = e.prerenderFrame, a = e.doc, u = e.props, d = e.event, h = e.dimensions, l = h.width, m = h.height;
        if (n && i) {
          var P = a.createElement("div");
          P.setAttribute("id", r);
          var g = a.createElement("style");
          return u.cspNonce && g.setAttribute("nonce", u.cspNonce), g.appendChild(a.createTextNode(`
            #` + r + ` {
                display: inline-block;
                position: relative;
                width: ` + l + `;
                height: ` + m + `;
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
        `)), P.appendChild(n), P.appendChild(i), P.appendChild(g), i.classList.add("zoid-visible"), n.classList.add("zoid-invisible"), d.on(xe.RENDERED, function() {
            i.classList.remove("zoid-visible"), i.classList.add("zoid-invisible"), n.classList.remove("zoid-invisible"), n.classList.add("zoid-visible"), setTimeout(function() {
              Ar(i);
            }, 1);
          }), d.on(xe.RESIZE, function(w) {
            var E = w.width, T = w.height;
            typeof E == "number" && (P.style.width = Go(E)), typeof T == "number" && (P.style.height = Go(T));
          }), P;
        }
      }
      function rs(e) {
        var r = e.doc, n = e.props, i = r.createElement("html"), a = r.createElement("body"), u = r.createElement("style"), d = r.createElement("div");
        return d.classList.add("spinner"), n.cspNonce && u.setAttribute("nonce", n.cspNonce), i.appendChild(a), a.appendChild(d), a.appendChild(u), u.appendChild(r.createTextNode(`
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
      var eo = nn(), to = nn();
      function ns(e) {
        var r = function(T) {
          var S = T.tag, x = T.url, W = T.domain, L = T.bridgeUrl, J = T.props, M = J === void 0 ? {} : J, V = T.dimensions, j = V === void 0 ? {} : V, ee = T.autoResize, H = ee === void 0 ? {} : ee, le = T.allowedParentDomains, ce = le === void 0 ? "*" : le, Z = T.attributes, G = Z === void 0 ? {} : Z, fe = T.defaultContext, te = fe === void 0 ? Ce.IFRAME : fe, _e = T.containerTemplate, Ct = _e === void 0 ? ts : _e, yt = T.prerenderTemplate, Ht = yt === void 0 ? rs : yt, Vt = T.validate, Mt = T.eligible, Gt = Mt === void 0 ? function() {
            return {
              eligible: !0
            };
          } : Mt, Jt = T.logger, ir = Jt === void 0 ? {
            info: Se
          } : Jt, Kt = T.exports, St = Kt === void 0 ? Se : Kt, ar = T.method, Yt = T.children, Zt = Yt === void 0 ? function() {
            return {};
          } : Yt, sr = S.replace(/-/g, "_"), cr = y({}, {
            window: {
              type: be.OBJECT,
              sendToChild: !1,
              required: !1,
              allowDelegate: !0,
              validate: function(ue) {
                var Et = ue.value;
                if (!rr(Et) && !gt.isProxyWindow(Et)) throw new Error("Expected Window or ProxyWindow");
                if (rr(Et)) {
                  if (We(Et)) throw new Error("Window is closed");
                  if (!C(Et)) throw new Error("Window is not same domain");
                }
              },
              decorate: function(ue) {
                return Mr(ue.value);
              }
            },
            timeout: {
              type: be.NUMBER,
              required: !1,
              sendToChild: !1
            },
            cspNonce: {
              type: be.STRING,
              required: !1
            },
            onDisplay: {
              type: be.FUNCTION,
              required: !1,
              sendToChild: !1,
              allowDelegate: !0,
              default: Wt,
              decorate: or
            },
            onRendered: {
              type: be.FUNCTION,
              required: !1,
              sendToChild: !1,
              default: Wt,
              decorate: or
            },
            onRender: {
              type: be.FUNCTION,
              required: !1,
              sendToChild: !1,
              default: Wt,
              decorate: or
            },
            onPrerendered: {
              type: be.FUNCTION,
              required: !1,
              sendToChild: !1,
              default: Wt,
              decorate: or
            },
            onPrerender: {
              type: be.FUNCTION,
              required: !1,
              sendToChild: !1,
              default: Wt,
              decorate: or
            },
            onClose: {
              type: be.FUNCTION,
              required: !1,
              sendToChild: !1,
              allowDelegate: !0,
              default: Wt,
              decorate: or
            },
            onDestroy: {
              type: be.FUNCTION,
              required: !1,
              sendToChild: !1,
              allowDelegate: !0,
              default: Wt,
              decorate: or
            },
            onResize: {
              type: be.FUNCTION,
              required: !1,
              sendToChild: !1,
              allowDelegate: !0,
              default: Wt
            },
            onFocus: {
              type: be.FUNCTION,
              required: !1,
              sendToChild: !1,
              allowDelegate: !0,
              default: Wt
            },
            close: {
              type: be.FUNCTION,
              required: !1,
              sendToChild: !1,
              childDecorate: function(ue) {
                return ue.close;
              }
            },
            focus: {
              type: be.FUNCTION,
              required: !1,
              sendToChild: !1,
              childDecorate: function(ue) {
                return ue.focus;
              }
            },
            resize: {
              type: be.FUNCTION,
              required: !1,
              sendToChild: !1,
              childDecorate: function(ue) {
                return ue.resize;
              }
            },
            uid: {
              type: be.STRING,
              required: !1,
              sendToChild: !1,
              childDecorate: function(ue) {
                return ue.uid;
              }
            },
            tag: {
              type: be.STRING,
              required: !1,
              sendToChild: !1,
              childDecorate: function(ue) {
                return ue.tag;
              }
            },
            getParent: {
              type: be.FUNCTION,
              required: !1,
              sendToChild: !1,
              childDecorate: function(ue) {
                return ue.getParent;
              }
            },
            getParentDomain: {
              type: be.FUNCTION,
              required: !1,
              sendToChild: !1,
              childDecorate: function(ue) {
                return ue.getParentDomain;
              }
            },
            show: {
              type: be.FUNCTION,
              required: !1,
              sendToChild: !1,
              childDecorate: function(ue) {
                return ue.show;
              }
            },
            hide: {
              type: be.FUNCTION,
              required: !1,
              sendToChild: !1,
              childDecorate: function(ue) {
                return ue.hide;
              }
            },
            export: {
              type: be.FUNCTION,
              required: !1,
              sendToChild: !1,
              childDecorate: function(ue) {
                return ue.export;
              }
            },
            onError: {
              type: be.FUNCTION,
              required: !1,
              sendToChild: !1,
              childDecorate: function(ue) {
                return ue.onError;
              }
            },
            onProps: {
              type: be.FUNCTION,
              required: !1,
              sendToChild: !1,
              childDecorate: function(ue) {
                return ue.onProps;
              }
            },
            getSiblings: {
              type: be.FUNCTION,
              required: !1,
              sendToChild: !1,
              childDecorate: function(ue) {
                return ue.getSiblings;
              }
            }
          }, M);
          if (!Ct) throw new Error("Container template required");
          return {
            name: sr,
            tag: S,
            url: x,
            domain: W,
            bridgeUrl: L,
            method: ar,
            propsDef: cr,
            dimensions: j,
            autoResize: H,
            allowedParentDomains: ce,
            attributes: G,
            defaultContext: te,
            containerTemplate: Ct,
            prerenderTemplate: Ht,
            validate: Vt,
            logger: ir,
            eligible: Gt,
            children: Zt,
            exports: typeof St == "function" ? St : function(ue) {
              for (var Et = ue.getExports, de = {}, He = function() {
                var De = Ve[Me], nt = St[De].type, Be = Et().then(function(qe) {
                  return qe[De];
                });
                de[De] = nt === be.FUNCTION ? function() {
                  for (var qe = arguments.length, bt = new Array(qe), ct = 0; ct < qe; ct++) bt[ct] = arguments[ct];
                  return Be.then(function(xt) {
                    return xt.apply(void 0, bt);
                  });
                } : Be;
              }, Me = 0, Ve = Object.keys(St); Me < Ve.length; Me++) He();
              return de;
            }
          };
        }(e), n = r.name, i = r.tag, a = r.defaultContext, u = r.propsDef, d = r.eligible, h = r.children, l = Fr(window), m = {}, P = [], g = function() {
          if (function(S) {
            try {
              return Qn(window.name).name === S;
            } catch {
            }
            return !1;
          }(n)) {
            var T = Pi().payload;
            if (T.tag === i && vt(T.childDomainMatch, z())) return !0;
          }
          return !1;
        }, w = Bt(function() {
          if (g()) {
            if (window.xprops)
              throw delete l.components[i], new Error("Can not register " + n + " as child - child already registered");
            var T = function(S) {
              var x = S.tag, W = S.propsDef, L = S.autoResize, J = S.allowedParentDomains, M = [], V = Pi(), j = V.parent, ee = V.payload, H = j.win, le = j.domain, ce, Z = new p(), G = ee.version, fe = ee.uid, te = ee.exports, _e = ee.context, Ct = ee.props;
              if (!function(de, He) {
                if (!/_/.test(de) || !/_/.test("10_3_3")) throw new Error("Versions are in an invalid format (" + de + ", 10_3_3)");
                return de.split("_")[0] === "10_3_3".split("_")[0];
              }(G)) throw new Error("Parent window has zoid version " + G + ", child window has version 10_3_3");
              var yt = te.show, Ht = te.hide, Vt = te.close, Mt = te.onError, Gt = te.checkClose, Jt = te.export, ir = te.resize, Kt = te.init, St = function() {
                return H;
              }, ar = function() {
                return le;
              }, Yt = function(de) {
                return M.push(de), {
                  cancel: function() {
                    M.splice(M.indexOf(de), 1);
                  }
                };
              }, Zt = function(de) {
                return ir.fireAndForget({
                  width: de.width,
                  height: de.height
                });
              }, sr = function(de) {
                return Z.resolve(de), Jt(de);
              }, cr = function(de) {
                var He = (de === void 0 ? {} : de).anyParent, Me = [], Ve = ce.parent;
                if (He === void 0 && (He = !Ve), !He && !Ve) throw new Error("No parent found for " + x + " child");
                for (var De = 0, nt = lt(window); De < nt.length; De++) {
                  var Be = nt[De];
                  if (C(Be)) {
                    var qe = oe(Be).xprops;
                    if (qe && St() === qe.getParent()) {
                      var bt = qe.parent;
                      if (He || !Ve || bt && bt.uid === Ve.uid) {
                        var ct = gi(Be, function(xt) {
                          return xt.exports;
                        });
                        Me.push({
                          props: qe,
                          exports: ct
                        });
                      }
                    }
                  }
                }
                return Me;
              }, ue = function(de, He, Me) {
                Me === void 0 && (Me = !1);
                var Ve = function(nt, Be, qe, bt, ct, xt) {
                  xt === void 0 && (xt = !1);
                  for (var Ft = {}, gr = 0, yr = Object.keys(qe); gr < yr.length; gr++) {
                    var ur = yr[gr], ut = Be[ur], zr = ut && ut.trustedDomains && ut.trustedDomains.length > 0 ? ut.trustedDomains.reduce(function(pn, jr) {
                      return pn || vt(jr, z(window));
                    }, !1) : bt === z(window) || C(nt);
                    if ((!ut || !ut.sameDomain || zr) && (!ut || !ut.trustedDomains || zr)) {
                      var Ur = Ti(Be, 0, ur, qe[ur], ct);
                      Ft[ur] = Ur, ut && ut.alias && !Ft[ut.alias] && (Ft[ut.alias] = Ur);
                    }
                  }
                  if (!xt) for (var Er = 0, hn = Object.keys(Be); Er < hn.length; Er++) {
                    var Lr = hn[Er];
                    qe.hasOwnProperty(Lr) || (Ft[Lr] = Ti(Be, 0, Lr, void 0, ct));
                  }
                  return Ft;
                }(H, W, de, He, {
                  tag: x,
                  show: yt,
                  hide: Ht,
                  close: Vt,
                  focus: Ya,
                  onError: Mt,
                  resize: Zt,
                  getSiblings: cr,
                  onProps: Yt,
                  getParent: St,
                  getParentDomain: ar,
                  uid: fe,
                  export: sr
                }, Me);
                ce ? wr(ce, Ve) : ce = Ve;
                for (var De = 0; De < M.length; De++) (0, M[De])(ce);
              }, Et = function(de) {
                return p.try(function() {
                  return ue(de, le, !0);
                });
              };
              return {
                init: function() {
                  return p.try(function() {
                    var de = "";
                    return C(H) && (de = function(He) {
                      var Me = He.componentName, Ve = He.parentComponentWindow, De = Ei({
                        data: Qn(window.name).serializedInitialPayload,
                        sender: {
                          win: Ve
                        },
                        basic: !0
                      }), nt = De.sender;
                      if (De.reference.type === "uid" || De.metaData.windowRef.type === "global") {
                        var Be = bi({
                          name: Me,
                          serializedPayload: yi({
                            data: De.data,
                            metaData: {
                              windowRef: Ka(Ve)
                            },
                            sender: {
                              domain: nt.domain
                            },
                            receiver: {
                              win: window,
                              domain: z()
                            },
                            basic: !0
                          }).serializedData
                        });
                        return window.name = Be, Be;
                      }
                    }({
                      componentName: S.name,
                      parentComponentWindow: H
                    }) || ""), Fr(window).exports = S.exports({
                      getExports: function() {
                        return Z;
                      }
                    }), function(He, Me) {
                      if (!vt(He, Me)) throw new Error("Can not be rendered by domain: " + Me);
                    }(J, le), ko(H), function() {
                      window.addEventListener("beforeunload", function() {
                        Gt.fireAndForget();
                      }), window.addEventListener("unload", function() {
                        Gt.fireAndForget();
                      }), Ro(H, function() {
                        Ri();
                      });
                    }(), Kt({
                      name: de,
                      updateProps: Et,
                      close: Ri
                    });
                  }).then(function() {
                    return (de = L.width, He = de !== void 0 && de, Me = L.height, Ve = Me !== void 0 && Me, De = L.element, Uo(De === void 0 ? "body" : De).catch(Se).then(function(nt) {
                      return {
                        width: He,
                        height: Ve,
                        element: nt
                      };
                    })).then(function(nt) {
                      var Be = nt.width, qe = nt.height, bt = nt.element;
                      bt && (Be || qe) && _e !== Ce.POPUP && $o(bt, function(ct) {
                        Zt({
                          width: Be ? ct.width : void 0,
                          height: qe ? ct.height : void 0
                        });
                      }, {
                        width: Be,
                        height: qe
                      });
                    });
                    var de, He, Me, Ve, De;
                  }).catch(function(de) {
                    Mt(de);
                  });
                },
                getProps: function() {
                  return ce || (ue(Ct, le), ce);
                }
              };
            }(r);
            return T.init(), T;
          }
        }), E = function T(S) {
          var x, W = "zoid-" + i + "-" + rt(), L = S || {}, J = d({
            props: L
          }), M = J.eligible, V = J.reason, j = L.onDestroy;
          L.onDestroy = function() {
            if (x && M && P.splice(P.indexOf(x), 1), j) return j.apply(void 0, arguments);
          };
          var ee = xi({
            uid: W,
            options: r
          });
          ee.init(), M ? ee.setProps(L) : L.onDestroy && L.onDestroy(), eo.register(function(ce) {
            return ee.destroy(ce || new Error("zoid destroyed all components"));
          });
          var H = function(ce) {
            var Z = (ce === void 0 ? {} : ce).decorate;
            return T((Z === void 0 ? Wa : Z)(L));
          }, le = function(ce, Z, G) {
            return p.try(function() {
              if (!M) {
                var fe = new Error(V || n + " component is not eligible");
                return ee.destroy(fe).then(function() {
                  throw fe;
                });
              }
              if (!rr(ce)) throw new Error("Must pass window to renderTo");
              return function(te, _e) {
                return p.try(function() {
                  if (te.window) return Mr(te.window).getType();
                  if (_e) {
                    if (_e !== Ce.IFRAME && _e !== Ce.POPUP) throw new Error("Unrecognized context: " + _e);
                    return _e;
                  }
                  return a;
                });
              }(L, G);
            }).then(function(fe) {
              if (Z = function(te, _e) {
                if (_e) {
                  if (typeof _e != "string" && !On(_e)) throw new TypeError("Expected string or element selector to be passed");
                  return _e;
                }
                if (te === Ce.POPUP) return "body";
                throw new Error("Expected element to be passed to render iframe");
              }(fe, Z), ce !== window && typeof Z != "string") throw new Error("Must pass string element when rendering to another window");
              return ee.render({
                target: ce,
                container: Z,
                context: fe,
                rerender: function() {
                  var te = H();
                  return wr(x, te), te.renderTo(ce, Z, G);
                }
              });
            }).catch(function(fe) {
              return ee.destroy(fe).then(function() {
                throw fe;
              });
            });
          };
          return x = y({}, ee.getExports(), ee.getHelpers(), function() {
            for (var ce = h(), Z = {}, G = function() {
              var _e = te[fe], Ct = ce[_e];
              Z[_e] = function(yt) {
                var Ht = ee.getProps(), Vt = y({}, yt, {
                  parent: {
                    uid: W,
                    props: Ht,
                    export: ee.export
                  }
                });
                return Ct(Vt);
              };
            }, fe = 0, te = Object.keys(ce); fe < te.length; fe++) G();
            return Z;
          }(), {
            isEligible: function() {
              return M;
            },
            clone: H,
            render: function(ce, Z) {
              return le(window, ce, Z);
            },
            renderTo: function(ce, Z, G) {
              return le(ce, Z, G);
            }
          }), M && P.push(x), x;
        };
        if (w(), function() {
          var T = At("zoid_allow_delegate_" + n, function() {
            return !0;
          }), S = At("zoid_delegate_" + n, function(x) {
            var W = x.data;
            return {
              parent: xi({
                uid: W.uid,
                options: r,
                overrides: W.overrides,
                parentWin: x.source
              })
            };
          });
          to.register(T.cancel), to.register(S.cancel);
        }(), l.components = l.components || {}, l.components[i]) throw new Error("Can not register multiple components with the same tag: " + i);
        return l.components[i] = !0, {
          init: E,
          instances: P,
          driver: function(T, S) {
            var x = {
              react: Za,
              angular: ka,
              vue: Xa,
              vue3: Qa,
              angular2: es
            };
            if (!x[T]) throw new Error("Could not find driver for framework: " + T);
            return m[T] || (m[T] = x[T].register(i, u, E, S)), m[T];
          },
          isChild: g,
          canRenderTo: function(T) {
            return Rt(T, "zoid_allow_delegate_" + n).then(function(S) {
              return S.data;
            }).catch(function() {
              return !1;
            });
          },
          registerChild: w
        };
      }
      var os = function(e) {
        (function() {
          Dt().initialized || (Dt().initialized = !0, u = (a = {
            on: At,
            send: Rt
          }).on, d = a.send, (h = Dt()).receiveMessage = h.receiveMessage || function(l) {
            return Zn(l, {
              on: u,
              send: d
            });
          }, function(l) {
            var m = l.on, P = l.send;
            me().getOrSet("postMessageListener", function() {
              return Bo(window, "message", function(g) {
                (function(w, E) {
                  var T = E.on, S = E.send;
                  p.try(function() {
                    var x = w.source || w.sourceElement, W = w.origin || w.originalEvent && w.originalEvent.origin, L = w.data;
                    if (W === "null" && (W = "file://"), x) {
                      if (!W) throw new Error("Post message did not have origin domain");
                      Zn({
                        source: x,
                        origin: W,
                        data: L
                      }, {
                        on: T,
                        send: S
                      });
                    }
                  });
                })(g, {
                  on: m,
                  send: P
                });
              });
            });
          }({
            on: At,
            send: Rt
          }), si({
            on: At,
            send: Rt,
            receiveMessage: Zn
          }), function(l) {
            var m = l.on, P = l.send;
            me("builtinListeners").getOrSet("helloListener", function() {
              var g = m("postrobot_hello", {
                domain: "*"
              }, function(E) {
                return Zo(E.source, {
                  domain: E.origin
                }), {
                  instanceID: Yo()
                };
              }), w = tr();
              return w && Bn(w, {
                send: P
              }).catch(function(E) {
              }), g;
            });
          }({
            on: At,
            send: Rt
          }));
          var a, u, d, h;
        })();
        var r = ns(e), n = function(a) {
          return r.init(a);
        };
        n.driver = function(a, u) {
          return r.driver(a, u);
        }, n.isChild = function() {
          return r.isChild();
        }, n.canRenderTo = function(a) {
          return r.canRenderTo(a);
        }, n.instances = r.instances;
        var i = r.registerChild();
        return i && (window.xprops = n.xprops = i.getProps()), n;
      };
      function Oi(e) {
        $t && $t.destroyBridges();
        var r = eo.all(e);
        return eo = nn(), r;
      }
      var Ii = Oi;
      function is(e) {
        return Ii(), delete window.__zoid_10_3_3__, function() {
          (function() {
            for (var n = me("responseListeners"), i = 0, a = n.keys(); i < a.length; i++) {
              var u = a[i], d = n.get(u);
              d && (d.cancelled = !0), n.del(u);
            }
          })(), (r = me().get("postMessageListener")) && r.cancel();
          var r;
          delete window.__post_robot_11_0_0__;
        }(), to.all(e);
      }
    }]);
  });
})(Ia);
var Da = Ia.exports;
const ta = Da.EVENT, Pr = {
  VISIBLE: "zoid-visible",
  INVISIBLE: "zoid-invisible"
};
function tu({
  uid: t,
  frame: o,
  prerenderFrame: s,
  doc: c,
  props: f,
  event: v,
  dimensions: R
}) {
  const { width: y, height: I } = R, { top: _ = 0, left: b = 0 } = f;
  if (!o || !s)
    return;
  const N = c.createElement("div");
  N.setAttribute("id", t);
  const U = c.createElement("style");
  return f.cspNonce && U.setAttribute("nonce", f.cspNonce), U.appendChild(
    c.createTextNode(`
          #${t} {
              display: inline-block;
              position: absolute;
              width: ${y};
              height: ${I};
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

          #${t} > iframe.${Pr.INVISIBLE} {
              opacity: 0;
          }

          #${t} > iframe.${Pr.VISIBLE} {
              opacity: 1;
        }
      `)
  ), N.appendChild(o), N.appendChild(s), N.appendChild(U), s.classList.add(Pr.INVISIBLE), o.classList.add(Pr.INVISIBLE), v.on(ta.RENDERED, () => {
    setTimeout(() => {
      o.classList.remove(Pr.INVISIBLE), o.classList.add(Pr.VISIBLE);
    }, 100), setTimeout(() => {
      s.remove();
    }, 1);
  }), v.on(ta.RESIZE, ({ width: se, height: ae }) => {
    typeof se == "number" && (N.style.width = `${se}px`), typeof ae == "number" && (N.style.height = `${ae}px`);
  }), N;
}
function ru(t) {
  return Da.create({
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
    containerTemplate: tu
  });
}
function nu(t) {
  return ru(t.id)(t);
}
function ou() {
  var t = t || window;
  const o = new TextEncoder("utf-8"), s = new TextDecoder("utf-8");
  let c = new DataView(new ArrayBuffer(8));
  var f = [];
  class v {
    constructor() {
      this._callbackTimeouts = /* @__PURE__ */ new Map(), this._nextCallbackTimeoutID = 1;
      const y = () => new DataView(this._inst.exports.memory.buffer), I = (p) => {
        c.setBigInt64(0, p, !0);
        const A = c.getFloat64(0, !0);
        if (A === 0) return;
        if (!isNaN(A)) return A;
        const B = 0xffffffffn & p;
        return this._values[B];
      }, _ = (p) => {
        let A = y().getBigUint64(p, !0);
        return I(A);
      }, b = (p) => {
        const A = 0x7ff80000n;
        if (typeof p == "number")
          return isNaN(p) ? A << 32n : p === 0 ? A << 32n | 1n : (c.setFloat64(0, p, !0), c.getBigInt64(0, !0));
        switch (p) {
          case void 0:
            return 0n;
          case null:
            return A << 32n | 2n;
          case !0:
            return A << 32n | 3n;
          case !1:
            return A << 32n | 4n;
        }
        let B = this._ids.get(p);
        B === void 0 && (B = this._idPool.pop(), B === void 0 && (B = BigInt(this._values.length)), this._values[B] = p, this._goRefCounts[B] = 0, this._ids.set(p, B)), this._goRefCounts[B]++;
        let ie = 1n;
        switch (typeof p) {
          case "string":
            ie = 2n;
            break;
          case "symbol":
            ie = 3n;
            break;
          case "function":
            ie = 4n;
        }
        return B | (A | ie) << 32n;
      }, N = (p, A) => {
        let B = b(A);
        y().setBigUint64(p, B, !0);
      }, U = (p, A, B) => new Uint8Array(this._inst.exports.memory.buffer, p, A), se = (p, A, B) => {
        const ie = new Array(A);
        for (let we = 0; we < A; we++) ie[we] = _(p + 8 * we);
        return ie;
      }, ae = (p, A) => s.decode(new DataView(this._inst.exports.memory.buffer, p, A)), it = Date.now() - performance.now();
      this.importObject = {
        wasi_snapshot_preview1: {
          fd_write: function(p, A, B, ie) {
            let we = 0;
            if (p == 1)
              for (let Re = 0; Re < B; Re++) {
                let Ne = A + 8 * Re, ve = y().getUint32(Ne + 0, !0), Y = y().getUint32(Ne + 4, !0);
                we += Y;
                for (let he = 0; he < Y; he++) {
                  let Ae = y().getUint8(ve + he);
                  if (Ae != 13) if (Ae == 10) {
                    let z = s.decode(new Uint8Array(f));
                    f = [], console.log(z);
                  } else f.push(Ae);
                }
              }
            else console.error("invalid file descriptor:", p);
            return y().setUint32(ie, we, !0), 0;
          },
          fd_close: () => 0,
          fd_fdstat_get: () => 0,
          fd_seek: () => 0,
          proc_exit: (p) => {
            if (!t.process) throw "trying to exit with code " + p;
            process.exit(p);
          },
          random_get: (p, A) => (crypto.getRandomValues(U(p, A)), 0)
        },
        gojs: {
          "runtime.ticks": () => it + performance.now(),
          "runtime.sleepTicks": (p) => {
            setTimeout(this._inst.exports.go_scheduler, p);
          },
          "syscall/js.finalizeRef": (p) => {
            const A = y().getUint32(I(p), !0);
            if (this._goRefCounts[A]--, this._goRefCounts[A] === 0) {
              const B = this._values[A];
              this._values[A] = null, this._ids.delete(B), this._idPool.push(A);
            }
          },
          "syscall/js.stringVal": (p, A) => {
            const B = ae(p, A);
            return b(B);
          },
          "syscall/js.valueGet": (p, A, B) => {
            let ie = ae(A, B), we = I(p), Re = Reflect.get(we, ie);
            return b(Re);
          },
          "syscall/js.valueSet": (p, A, B, ie) => {
            const we = I(p), Re = ae(A, B), Ne = I(ie);
            Reflect.set(we, Re, Ne);
          },
          "syscall/js.valueDelete": (p, A, B) => {
            const ie = I(p), we = ae(A, B);
            Reflect.deleteProperty(ie, we);
          },
          "syscall/js.valueIndex": (p, A) => b(Reflect.get(I(p), A)),
          "syscall/js.valueSetIndex": (p, A, B) => {
            Reflect.set(I(p), A, I(B));
          },
          "syscall/js.valueCall": (p, A, B, ie, we, Re, Ne) => {
            const ve = I(A), Y = ae(B, ie), he = se(we, Re);
            try {
              const Ae = Reflect.get(ve, Y);
              N(p, Reflect.apply(Ae, ve, he)), y().setUint8(p + 8, 1);
            } catch (Ae) {
              N(p, Ae), y().setUint8(p + 8, 0);
            }
          },
          "syscall/js.valueInvoke": (p, A, B, ie, we) => {
            try {
              const Re = I(A), Ne = se(B, ie);
              N(p, Reflect.apply(Re, void 0, Ne)), y().setUint8(p + 8, 1);
            } catch (Re) {
              N(p, Re), y().setUint8(p + 8, 0);
            }
          },
          "syscall/js.valueNew": (p, A, B, ie, we) => {
            const Re = I(A), Ne = se(B, ie);
            try {
              N(p, Reflect.construct(Re, Ne)), y().setUint8(p + 8, 1);
            } catch (ve) {
              N(p, ve), y().setUint8(p + 8, 0);
            }
          },
          "syscall/js.valueLength": (p) => I(p).length,
          "syscall/js.valuePrepareString": (p, A) => {
            const B = String(I(A)), ie = o.encode(B);
            N(p, ie), y().setInt32(p + 8, ie.length, !0);
          },
          "syscall/js.valueLoadString": (p, A, B, ie) => {
            const we = I(p);
            U(A, B).set(we);
          },
          "syscall/js.valueInstanceOf": (p, A) => I(p) instanceof I(A),
          "syscall/js.copyBytesToGo": (p, A, B, ie, we) => {
            let Re = p, Ne = p + 4;
            const ve = U(A, B), Y = I(we);
            if (!(Y instanceof Uint8Array || Y instanceof Uint8ClampedArray))
              return void y().setUint8(Ne, 0);
            const he = Y.subarray(0, ve.length);
            ve.set(he), y().setUint32(Re, he.length, !0), y().setUint8(Ne, 1);
          },
          "syscall/js.copyBytesToJS": (p, A, B, ie, we) => {
            let Re = p, Ne = p + 4;
            const ve = I(A), Y = U(B, ie);
            if (!(ve instanceof Uint8Array || ve instanceof Uint8ClampedArray))
              return void y().setUint8(Ne, 0);
            const he = Y.subarray(0, ve.length);
            ve.set(he), y().setUint32(Re, he.length, !0), y().setUint8(Ne, 1);
          }
        }
      }, this.importObject.env = this.importObject.gojs;
    }
    async run(y) {
      for (this._inst = y, this._values = [NaN, 0, null, !0, !1, t, this], this._goRefCounts = [], this._ids = /* @__PURE__ */ new Map(), this._idPool = [], this.exited = !1; ; ) {
        const I = new Promise((_) => {
          this._resolveCallbackPromise = () => {
            if (this.exited)
              throw new Error("bad callback: Go program has already exited");
            setTimeout(_, 0);
          };
        });
        if (this._inst.exports._start(), this.exited) break;
        await I;
      }
    }
    _resume() {
      if (this.exited) throw new Error("Go program has already exited");
      this._inst.exports.resume(), this.exited && this._resolveExitPromise();
    }
    _makeFuncWrapper(y) {
      const I = this;
      return function() {
        const _ = {
          id: y,
          this: this,
          args: arguments
        };
        return I._pendingEvent = _, I._resume(), _.result;
      };
    }
  }
  return new v();
}
class iu {
  constructor() {
    Ot(this, "data");
    Ot(this, "mutex");
    this.mutex = new Ca(), this.data = "";
  }
  async loadSource(o) {
    await this.mutex.acquire();
    try {
      this.data && (o.session = this.data);
      const s = JSON.stringify(o);
      for (let c = 1; c <= 3; c++)
        try {
          const { manifest: f, err: v, session: R } = await (await Jr.getInstance({})).loadSource(s);
          if (v)
            throw new Error(v);
          return this.data = R, f;
        } catch (f) {
          if (console.log(`Attempt ${c} failed:`, f, s), c === 3)
            throw console.log("session:", this.data), f;
        }
    } finally {
      this.mutex.release();
    }
    return null;
  }
  async getEventTracking() {
    return await (await Jr.getInstance({})).getEventTracking(this.data);
  }
  async acquire() {
    return new Promise((o) => {
      this._locked ? this._queue.push(o) : (this._locked = !0, o());
    });
  }
  release() {
    if (this._queue.length > 0) {
      const o = this._queue.shift();
      o && o();
    } else
      this._locked = !1;
  }
}
class Ca {
  constructor() {
    Ot(this, "_queue");
    Ot(this, "_locked");
    this._queue = [], this._locked = !1;
  }
  async acquire() {
    return new Promise((o) => {
      this._locked ? this._queue.push(o) : (this._locked = !0, o());
    });
  }
  release() {
    if (this._queue.length > 0) {
      const o = this._queue.shift();
      o && o();
    } else
      this._locked = !1;
  }
}
const Lt = class Lt {
  constructor(o) {
    Ot(this, "mutex");
    // private go: any
    // private _values: any[]
    // private _goRefCounts: Map<any, any>
    // private _ids: any[]
    Ot(this, "instanceExpiration");
    Ot(this, "wasm");
    Ot(this, "uri");
    Ot(this, "go");
    var s;
    this.uri = o, o || (this.uri = (s = window == null ? void 0 : window.sigmaCSPMEnv) == null ? void 0 : s.WASM_URL), this.instanceExpiration = Date.now() + 1e3, this.mutex = new Ca();
  }
  static async getInstance(o) {
    if (!Lt.instance)
      Lt.instance = new Lt(o.uri), Lt.instance.initializeInstance(1e3);
    else if (!Lt.instance)
      throw new Error("Manager not initialized");
    return Lt.instance;
  }
  async useInstance(o) {
    await this.initializeInstance(1e3), await this.mutex.acquire();
    try {
      if (this.wasm)
        return await o();
    } finally {
      this.mutex.release();
    }
  }
  async initializeInstance(o, s) {
    await this.mutex.acquire();
    try {
      if (this.isExpired() || s || !this.wasm) {
        if (this.instanceExpiration = Date.now() + o, !this.wasm) {
          const v = await fetch(this.uri);
          this.wasm = await v.arrayBuffer();
        }
        window.loadSource !== null && (window.loadSource = null), window.getEventTracking = null, this.go && (this.go = null);
        const c = ou();
        this.instanceExpiration = Date.now() + 1e3;
        const f = await WebAssembly.instantiate(
          this.wasm,
          c.importObject
        );
        c.run(f.instance), this.go = c;
      }
    } finally {
      this.mutex.release();
    }
  }
  async loadSource(o) {
    return await this.useInstance(async () => {
      try {
        return await window.loadSource(o);
      } catch (c) {
        console.log("Error", c);
        try {
          return await this.initializeInstance(1e3, !0), await window.loadSource(o);
        } catch (f) {
          console.log("Error", f);
        }
        throw c;
      }
    });
  }
  async getEventTracking(o) {
    const s = await this.useInstance(async () => {
      try {
        return await window.getEventTracking(o);
      } catch (c) {
        throw console.log("Error", c), c;
      }
    });
    return { avails: JSON.parse(s.avails) };
  }
  isExpired() {
    return Date.now() > this.instanceExpiration;
  }
  createSession() {
    return new iu();
  }
};
Ot(Lt, "instance");
let Jr = Lt;
function au(t, o, s) {
  var R;
  const c = o == null ? void 0 : o.find((y) => (y == null ? void 0 : y.id) === (t == null ? void 0 : t.availId)), f = (R = c == null ? void 0 : c.ads) == null ? void 0 : R.filter((y) => (y == null ? void 0 : y.id) === (t == null ? void 0 : t.adsId)), v = f == null ? void 0 : f[t == null ? void 0 : t.position];
  return v && (v.availId = c == null ? void 0 : c.id), s && (s == null ? void 0 : s.id) == (v == null ? void 0 : v.id) && s.availId === (v == null ? void 0 : v.availId) ? s : { ...v, impression: !1 };
}
const su = (t) => {
  try {
    return atob(t);
  } catch (o) {
    return console.error("Invalid base64 string:", o), null;
  }
};
function cu(t) {
  const s = new URL(t).hash, c = su(s.substring(1));
  if (c)
    try {
      return {
        ...JSON.parse(c)
        // events: jsonObject.event
      };
    } catch (f) {
      console.error("Invalid JSON string:", f);
    }
  return null;
}
function ra({ adsUrl: t, sdk: o, loader: s }) {
  return class extends s {
    constructor(f) {
      super(f);
    }
    load(f, v, R) {
      const y = R.onSuccess;
      R.onSuccess = async (I, _, b) => {
        (b.type === "manifest" || b.type === "level" || b.type === "audioTrack") && (I.data = await this.modifyManifest(I.url, I.data, b.type)), y(I, _, b);
      }, super.load(f, v, R);
    }
    async modifyManifest(f, v, R) {
      const y = {
        proxyAds: {
          uri: t,
          timeout: 2
        }
      };
      try {
        return await o.loadSource({ config: y, manifest: v, masterUri: f });
      } catch (I) {
        return console.error("[LOG] ~ error:", I), v;
      }
    }
  };
}
function uu({
  video: t,
  adContainer: o,
  startSession: s,
  sdk: c,
  domain: f
}) {
  const v = Qc(), R = jt(!1), y = jt(), I = Math.random().toString(36).slice(6);
  function _({ icons: z }) {
    const C = Tn(f, "/build/dist/wta/index.html");
    return {
      id: I,
      appConfig: {
        sdkBaseUrl: bn(C || "https://localhost:4222/wta/index.html", { id: I })
      },
      icons: z
    };
  }
  if (!!o) {
    const z = nu(_({
      icons: []
    }));
    z.render(o), z.hide(), o.style.display = "none", Oc(() => {
      var C;
      if (y.value) {
        const oe = ((C = y.value) == null ? void 0 : C.icons) || [];
        o.style.display = "block", z.updateProps(_({
          icons: oe
        })), z.show();
      } else
        o.style.display = "none", z.hide();
    });
  }
  const N = jt([]), U = jt(), se = jt([]);
  async function ae(z) {
    var oe;
    const C = (oe = y.value) == null ? void 0 : oe.trackingEvents.find((Qe) => Qe.eventType === z);
    C && (v.trigger(C), await Promise.all(C.beaconUrls.map((Qe) => kc(uc(Qe, {
      retry: 3,
      retryDelay: 500
    })))));
  }
  const it = /* @__PURE__ */ new Map();
  let p, A;
  function B(z, C, oe) {
    z.addEventListener(C, oe), it.set(C, oe);
  }
  async function ie(z) {
    const C = cu(z);
    if (C) {
      const { avails: oe } = await c.getEventTracking();
      y.value = au(C, oe, y.value), C.events.forEach((Qe) => {
        console.log("event:", y.value.impression), y.value.impression || (ae("impression"), y.value.impression = !0), ae(Qe);
      });
    }
  }
  function we() {
    return R.value = !1, ["fullscreenchange", "webkitfullscreenchange", "mozfullscreenchange", "msfullscreenchange"].forEach((z) => {
      B(t, z, () => {
        const C = document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement;
        ae(C ? "fullscreen" : "exitFullscreen");
      });
    }), B(t, "pause", () => ae("pause")), B(t, "play", () => ae("resume")), B(t, "rewind", () => ae("rewind")), B(t, "mute", () => ae("mute")), B(t, "unmute", () => ae("unmute")), async (z, C) => {
      const { tagList: oe, _url: Qe } = C.frag;
      oe.flat().find((je) => je === "EXT-X-CUE-OUT-CONT" || je === "EXT-X-CUE-OUT" || je === "EXT-X-CUE-IN") && ie(Qe);
    };
  }
  async function Re() {
    return c.getEventTracking().then((z) => {
      for (const C of (z == null ? void 0 : z.avails) || [])
        for (const oe of C.ads) {
          const Qe = `${C.id}_${oe.id}_${oe.startTimeInSeconds}`;
          for (const at of oe.trackingEvents) {
            const je = `${Qe}_${at.eventType}`;
            se.value.find((lt) => lt.key === je) || se.value.push({
              ...at,
              key: je,
              ad: {
                ...oe,
                key: Qe
              },
              tracked: !1
            });
          }
        }
    });
  }
  function Ne() {
    return async (z, C) => {
      function oe(je) {
        for (let st = 0; st < je.length; st++)
          if (je[st] === 0)
            return st;
        return je.length;
      }
      const { start: Qe, sn: at } = C.frag;
      for (let je = 0; je < C.samples.length; je++) {
        const st = C.samples[je], lt = st.data, er = st.pts;
        if (String.fromCharCode.apply(null, lt.slice(0, 3)) !== "ID3" || String.fromCharCode.apply(null, lt.slice(10, 14)) !== "TXXX")
          continue;
        const lr = lt.slice(21, lt.length), hr = oe(lr), Ir = lr.slice(hr + 1, lr.length), tr = oe(Ir), Dr = new TextDecoder("utf-8").decode(Ir.slice(0, tr)), pr = {
          sn: at,
          time: er - Qe,
          value: sa(Dr)
        };
        if (U.value && at < U.value)
          return;
        N.value.push(pr), pr.value.event === "start" && Re();
      }
    };
  }
  function ve() {
    return (z) => {
      const C = z.track;
      C.kind === "metadata" && (C.oncuechange = async () => {
        for (var oe = C.activeCues, Qe = 0; Qe < oe.length; Qe++) {
          var at = oe[Qe];
          if (at.value && at.value.uri) {
            const je = at.value.uri;
            ie(je);
          }
        }
      });
    };
  }
  function Y(z, C) {
    v.on((oe) => {
      (z === "*" || oe.eventType === z) && C(oe);
    });
  }
  function he() {
    y.value = void 0, N.value = [], se.value = [], Gi(p), Gi(A), it.forEach((z, C) => {
      t.removeEventListener(C, z);
    }), it.clear();
  }
  function Ae() {
    return {
      eventTracking: N,
      trackingDataEvent: se
    };
  }
  return {
    destroy: he,
    onEventTracking: Y,
    hlsHelper: {
      createHlsFragChanged: we,
      createHlsFragParsingMetadata: Ne
    },
    videojsHelper: {
      createVideojsAddTrack: ve
    },
    getLog: Ae
  };
}
async function lu({ video: t, adContainer: o, adsUrl: s, baseURL: c }) {
  const f = c || "https://cdn.jsdelivr.net/gh/sigmaott/sigma-ssai-web-sdk@v1.1.2", R = (await Jr.getInstance({ uri: Tn(f, "/build/dist/sigma-cspm.wasm") || "https://localhost:4222/sigma-cspm.wasm" })).createSession();
  function y() {
  }
  const { onEventTracking: I, destroy: _, videojsHelper: b, hlsHelper: N, getLog: U } = uu({
    video: t,
    adContainer: o,
    trackingUrl: "",
    startSession: y,
    sdk: R,
    domain: f
  }), se = jt(), ae = jt();
  function it(Y) {
    Y.config.loader = ra({ adsUrl: s, sdk: R, loader: Hls.DefaultConfig.loader }), se.value = Y;
    const he = N.createHlsFragChanged(), Ae = N.createHlsFragParsingMetadata();
    Y.on("hlsFragChanged", he), Y.on("hlsFragParsingMetadata", Ae), Y.on(Hls.Events.ERROR, (z, C) => {
      console.error("HLS Error:", z, C), C.type === window.Hls.ErrorTypes.NETWORK_ERROR ? console.error("Network Error:", C.details) : C.type === window.Hls.ErrorTypes.MEDIA_ERROR ? console.error("Media Error:", C.details) : console.error("Other Error:", C.details);
    }), ae.value = () => {
      Y.off("hlsFragChanged", he), Y.off("hlsFragParsingMetadata", Ae);
    };
  }
  function p(Y) {
    Y.hls.config.loader = ra({ adsUrl: s, sdk: R, loader: SigmaManager.DefaultConfig.loader }), se.value = Y.hls;
    const he = N.createHlsFragChanged(), Ae = N.createHlsFragParsingMetadata();
    Y.hls.on("hlsFragChanged", he), Y.hls.on("hlsFragParsingMetadata", Ae), Y.on(SigmaManager.Events.ERROR, (z, C) => {
      console.error("HLS Error:", z, C), C.type === window.Hls.ErrorTypes.NETWORK_ERROR ? console.error("Network Error:", C.details) : C.type === window.Hls.ErrorTypes.MEDIA_ERROR ? console.error("Media Error:", C.details) : console.error("Other Error:", C.details);
    }), ae.value = () => {
      Y.hls.destroy();
    };
  }
  const A = jt(), B = jt(), we = {
    instance: R,
    config: {
      proxyAds: {
        uri: s,
        timeout: 2
      }
    }
  };
  function Re(Y) {
    A.value = Y;
    const he = b.createVideojsAddTrack();
    Y.textTracks().on("addtrack", he), B.value = () => {
      Y.textTracks().off("addtrack", he);
    };
  }
  function Ne(Y, he) {
    Y.getNetworkingEngine().registerRequestFilter((Ae, z) => {
    }), Y.getNetworkingEngine().registerResponseFilter(async (Ae, z) => {
      if (Ae === 0) {
        const C = new TextDecoder().decode(z.data), oe = await R.loadSource({
          config: {
            proxyAds: {
              uri: s,
              timeout: 2e3
            }
          },
          masterUri: he,
          manifest: C
        });
        z.data = new TextEncoder().encode(oe);
      }
    });
  }
  function ve() {
    var Y, he;
    _(), (Y = ae.value) == null || Y.call(ae), (he = B.value) == null || he.call(B), se.value = null, A.value = null, ae.value = null, B.value = null;
  }
  return {
    onEventTracking: I,
    destroy: ve,
    sigmaPlayer: {
      attachVideojs: Re,
      attachHls: it,
      attachSigmaDrm: p,
      getLog: U,
      attachShaka: Ne
    },
    sdk: R,
    cspm: we
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
      } catch (c) {
        console.error("Error loading source:", c);
      }
    o.apply(this, [s]);
  };
}(videojs), function(t) {
  const o = t.Vhs.PlaylistLoader.prototype.haveMetadata;
  t.Vhs.PlaylistLoader.prototype.haveMetadata = async function({
    playlistString: s,
    playlistObject: c,
    url: f,
    id: v
  }) {
    const R = this.vhs_.options_.cspm.config;
    try {
      s && this.vhs_.options_.cspm && (s = await this.vhs_.options_.cspm.instance.loadSource({
        config: R,
        manifest: s,
        masterUri: this.master.playlists[v].resolvedUri
      })), o.apply(this, [{ playlistString: s, playlistObject: c, url: f, id: v }]);
    } catch (y) {
      console.error("Error loading source:", y);
    }
  };
}(videojs), function(t) {
  const o = (s, c, f) => s && f && f.responseURL && c !== f.responseURL ? f.responseURL : c;
  t.Vhs.PlaylistLoader.prototype.media = function(s, c) {
    if (!s)
      return this.media_;
    if (this.state === "HAVE_NOTHING")
      throw new Error("Cannot switch media playlist from " + this.state);
    if (typeof s == "string") {
      if (!this.master.playlists[s])
        throw new Error("Unknown playlist URI: " + s);
      s = this.master.playlists[s];
    }
    if (window.clearTimeout(this.finalRenditionTimeout), c) {
      const R = s.targetDuration / 2 * 1e3 || 5e3;
      this.finalRenditionTimeout = window.setTimeout(this.media.bind(this, s, !1), R);
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
        (R, y) => {
          if (this.request) {
            if (s.resolvedUri = o(this.handleManifestRedirects, s.resolvedUri, y), R)
              return this.playlistRequestError(this.request, s, f);
            this.haveMetadata({
              playlistString: y.responseText,
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
      } catch (c) {
        console.error("Error loading source:", c);
      }
    o.apply(this, [s]);
  };
}(videojs), function(t) {
  const o = t.Vhs.PlaylistLoader.prototype.parseManifest_;
  t.Vhs.PlaylistLoader.prototype.parseManifest_ = function({ url: s, manifestString: c }) {
    const f = o.apply(this, [{ url: s, manifestString: c }]);
    return f.playlists && f.playlists.length && (f.manifestString = c), f;
  };
}(videojs), function(t) {
  const o = t.Vhs.PlaylistLoader.prototype.haveMetadata;
  t.Vhs.PlaylistLoader.prototype.haveMetadata = async function({
    playlistString: s,
    playlistObject: c,
    url: f,
    id: v
  }) {
    try {
      if (s && this.vhs_.options_.cspm) {
        const R = this.vhs_.options_.cspm.config;
        s = await this.vhs_.options_.cspm.instance.loadSource({
          config: R,
          manifest: s,
          masterUri: this.main.playlists[v].resolvedUri
        });
      }
      o.apply(this, [{ playlistString: s, playlistObject: c, url: f, id: v }]);
    } catch (R) {
      throw console.error("Error loading source:", R), R;
    }
  };
}(videojs), function(t) {
  const o = (c, f) => {
    const v = c.segments || [], R = v[v.length - 1], y = R && R.parts && R.parts[R.parts.length - 1], I = y && y.duration || R && R.duration;
    return I ? I * 1e3 : (c.partTargetDuration || c.targetDuration || 10) * 500;
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
    const v = this.state, R = !this.media_ || c.id !== this.media_.id, y = this.main.playlists[c.id];
    if (y && y.endList || c.endList && c.segments.length) {
      this.request && (this.request.onreadystatechange = null, this.request.abort(), this.request = null), this.state = "HAVE_METADATA", this.media_ = c, R && (this.trigger("mediachanging"), v === "HAVE_MAIN_MANIFEST" ? this.trigger("loadedmetadata") : this.trigger("mediachange"));
      return;
    }
    if (this.updateMediaUpdateTimeout_(o(c)), !R)
      return;
    if (this.state = "SWITCHING_MEDIA", this.request) {
      if (c.resolvedUri === this.request.url)
        return;
      this.request.onreadystatechange = null, this.request.abort(), this.request = null;
    }
    this.media_ && this.trigger("mediachanging"), this.pendingMedia_ = c;
    const I = {
      playlistInfo: {
        type: "media",
        uri: c.uri
      }
    };
    this.trigger({ type: "playlistrequeststart", metadata: I }), this.request = this.vhs_.xhr(
      {
        uri: c.resolvedUri,
        withCredentials: this.withCredentials,
        requestType: "hls-playlist"
      },
      (_, b) => {
        if (this.request) {
          if (c.lastRequest = Date.now(), c.resolvedUri = s(c.resolvedUri, b), _)
            return this.playlistRequestError(this.request, c, v);
          this.haveMetadata({
            playlistString: b.responseText,
            url: c.uri,
            id: c.id
          }).then(() => {
            this.trigger({ type: "playlistrequestcomplete", metadata: I }), v === "HAVE_MAIN_MANIFEST" ? this.trigger("loadedmetadata") : this.trigger("mediachange");
          });
        }
      }
    );
  };
}(videojs)));
function hu(t) {
  const o = "https://dai.sigma.video/api/proxy-ads/ads/", s = vo(t), c = `${s.protocol}//${s.host}${s.pathname}`;
  if (!s.search)
    return { playerUrl: t, adsUrl: null };
  const f = js(t), v = f["sigma.dai.adsEndpoint"];
  if (!v)
    return { playerUrl: t, adsUrl: null };
  const R = {}, y = {};
  for (const [_, b] of Object.entries(f))
    _.startsWith("sigma.dai") ? _ !== "sigma.dai.adsEndpoint" && (R[_.replace("sigma.dai.", "")] = b) : y[_] = b;
  return {
    playerUrl: bn(c, y),
    adsUrl: bn(Tn(o, v), R)
  };
}
export {
  lu as createSigmaDai,
  hu as processURL
};
