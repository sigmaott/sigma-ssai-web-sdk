const ms = /"(?:_|\\u0{2}5[Ff]){2}(?:p|\\u0{2}70)(?:r|\\u0{2}72)(?:o|\\u0{2}6[Ff])(?:t|\\u0{2}74)(?:o|\\u0{2}6[Ff])(?:_|\\u0{2}5[Ff]){2}"\s*:/, gs = /"(?:c|\\u0063)(?:o|\\u006[Ff])(?:n|\\u006[Ee])(?:s|\\u0073)(?:t|\\u0074)(?:r|\\u0072)(?:u|\\u0075)(?:c|\\u0063)(?:t|\\u0074)(?:o|\\u006[Ff])(?:r|\\u0072)"\s*:/, ys = /^\s*["[{]|^\s*-?\d{1,16}(\.\d{1,17})?([Ee][+-]?\d+)?\s*$/;
function Es(r, i) {
  if (r === "__proto__" || r === "constructor" && i && typeof i == "object" && "prototype" in i) {
    bs(r);
    return;
  }
  return i;
}
function bs(r) {
  console.warn(`[destr] Dropping "${r}" key to prevent prototype pollution.`);
}
function oo(r, i = {}) {
  if (typeof r != "string")
    return r;
  const s = r.trim();
  if (
    // eslint-disable-next-line unicorn/prefer-at
    r[0] === '"' && r.endsWith('"') && !r.includes("\\")
  )
    return s.slice(1, -1);
  if (s.length <= 9) {
    const d = s.toLowerCase();
    if (d === "true")
      return !0;
    if (d === "false")
      return !1;
    if (d === "undefined")
      return;
    if (d === "null")
      return null;
    if (d === "nan")
      return Number.NaN;
    if (d === "infinity")
      return Number.POSITIVE_INFINITY;
    if (d === "-infinity")
      return Number.NEGATIVE_INFINITY;
  }
  if (!ys.test(r)) {
    if (i.strict)
      throw new SyntaxError("[destr] Invalid JSON");
    return r;
  }
  try {
    if (ms.test(r) || gs.test(r)) {
      if (i.strict)
        throw new Error("[destr] Possible prototype pollution");
      return JSON.parse(r, Es);
    }
    return JSON.parse(r);
  } catch (d) {
    if (i.strict)
      throw d;
    return r;
  }
}
const Ps = /#/g, Os = /&/g, Ts = /\//g, Rs = /=/g, fo = /\+/g, Ss = /%5e/gi, xs = /%60/gi, Ds = /%7c/gi, Cs = /%20/gi;
function Ns(r) {
  return encodeURI("" + r).replace(Ds, "|");
}
function io(r) {
  return Ns(typeof r == "string" ? r : JSON.stringify(r)).replace(fo, "%2B").replace(Cs, "+").replace(Ps, "%23").replace(Os, "%26").replace(xs, "`").replace(Ss, "^").replace(Ts, "%2F");
}
function eo(r) {
  return io(r).replace(Rs, "%3D");
}
function ta(r = "") {
  try {
    return decodeURIComponent("" + r);
  } catch {
    return "" + r;
  }
}
function Is(r) {
  return ta(r.replace(fo, " "));
}
function Ws(r) {
  return ta(r.replace(fo, " "));
}
function As(r = "") {
  const i = {};
  r[0] === "?" && (r = r.slice(1));
  for (const s of r.split("&")) {
    const d = s.match(/([^=]+)=?(.*)/) || [];
    if (d.length < 2)
      continue;
    const h = Is(d[1]);
    if (h === "__proto__" || h === "constructor")
      continue;
    const y = Ws(d[2] || "");
    i[h] === void 0 ? i[h] = y : Array.isArray(i[h]) ? i[h].push(y) : i[h] = [i[h], y];
  }
  return i;
}
function Ms(r, i) {
  return (typeof i == "number" || typeof i == "boolean") && (i = String(i)), i ? Array.isArray(i) ? i.map((s) => `${eo(r)}=${io(s)}`).join("&") : `${eo(r)}=${io(i)}` : eo(r);
}
function _s(r) {
  return Object.keys(r).filter((i) => r[i] !== void 0).map((i) => Ms(i, r[i])).filter(Boolean).join("&");
}
const Fs = /^[\s\w\0+.-]{2,}:([/\\]{1,2})/, zs = /^[\s\w\0+.-]{2,}:([/\\]{2})?/, Ls = /^([/\\]\s*){2,}[^/\\]/, js = /^\.?\//;
function na(r, i = {}) {
  return typeof i == "boolean" && (i = { acceptRelative: i }), i.strict ? Fs.test(r) : zs.test(r) || (i.acceptRelative ? Ls.test(r) : !1);
}
function Us(r = "", i) {
  return r.endsWith("/");
}
function Bs(r = "", i) {
  return (Us(r) ? r.slice(0, -1) : r) || "/";
}
function $s(r = "", i) {
  return r.endsWith("/") ? r : r + "/";
}
function Hs(r, i) {
  if (qs(i) || na(r))
    return r;
  const s = Bs(i);
  return r.startsWith(s) ? r : Gs(s, r);
}
function oa(r, i) {
  const s = Js(r), d = { ...As(s.search), ...i };
  return s.search = _s(d), Ks(s);
}
function qs(r) {
  return !r || r === "/";
}
function Vs(r) {
  return r && r !== "/";
}
function Gs(r, ...i) {
  let s = r || "";
  for (const d of i.filter((h) => Vs(h)))
    if (s) {
      const h = d.replace(js, "");
      s = $s(s) + h;
    } else
      s = d;
  return s;
}
const ia = Symbol.for("ufo:protocolRelative");
function Js(r = "", i) {
  const s = r.match(
    /^[\s\0]*(blob:|data:|javascript:|vbscript:)(.*)/i
  );
  if (s) {
    const [, z, A = ""] = s;
    return {
      protocol: z.toLowerCase(),
      pathname: A,
      href: z + A,
      auth: "",
      host: "",
      search: "",
      hash: ""
    };
  }
  if (!na(r, { acceptRelative: !0 }))
    return Ui(r);
  const [, d = "", h, y = ""] = r.replace(/\\/g, "/").match(/^[\s\0]*([\w+.-]{2,}:)?\/\/([^/@]+@)?(.*)/) || [];
  let [, R = "", O = ""] = y.match(/([^#/?]*)(.*)?/) || [];
  d === "file:" && (O = O.replace(/\/(?=[A-Za-z]:)/, ""));
  const { pathname: C, search: F, hash: g } = Ui(O);
  return {
    protocol: d.toLowerCase(),
    auth: h ? h.slice(0, Math.max(0, h.length - 1)) : "",
    host: R,
    pathname: C,
    search: F,
    hash: g,
    [ia]: !d
  };
}
function Ui(r = "") {
  const [i = "", s = "", d = ""] = (r.match(/([^#?]*)(\?[^#]*)?(#.*)?/) || []).splice(1);
  return {
    pathname: i,
    search: s,
    hash: d
  };
}
function Ks(r) {
  const i = r.pathname || "", s = r.search ? (r.search.startsWith("?") ? "" : "?") + r.search : "", d = r.hash || "", h = r.auth ? r.auth + "@" : "", y = r.host || "";
  return (r.protocol || r[ia] ? (r.protocol || "") + "//" : "") + h + y + i + s + d;
}
class Ys extends Error {
  constructor(i, s) {
    super(i, s), this.name = "FetchError", s != null && s.cause && !this.cause && (this.cause = s.cause);
  }
}
function Zs(r) {
  var C, F, g, z, A;
  const i = ((C = r.error) == null ? void 0 : C.message) || ((F = r.error) == null ? void 0 : F.toString()) || "", s = ((g = r.request) == null ? void 0 : g.method) || ((z = r.options) == null ? void 0 : z.method) || "GET", d = ((A = r.request) == null ? void 0 : A.url) || String(r.request) || "/", h = `[${s}] ${JSON.stringify(d)}`, y = r.response ? `${r.response.status} ${r.response.statusText}` : "<no response>", R = `${h}: ${y}${i ? ` ${i}` : ""}`, O = new Ys(
    R,
    r.error ? { cause: r.error } : void 0
  );
  for (const ee of ["request", "options", "response"])
    Object.defineProperty(O, ee, {
      get() {
        return r[ee];
      }
    });
  for (const [ee, ye] of [
    ["data", "_data"],
    ["status", "status"],
    ["statusCode", "status"],
    ["statusText", "statusText"],
    ["statusMessage", "statusText"]
  ])
    Object.defineProperty(O, ee, {
      get() {
        return r.response && r.response[ye];
      }
    });
  return O;
}
const Qs = new Set(
  Object.freeze(["PATCH", "POST", "PUT", "DELETE"])
);
function Bi(r = "GET") {
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
  const d = {
    ...i,
    ...r
  };
  if (i != null && i.params && (r != null && r.params) && (d.params = {
    ...i == null ? void 0 : i.params,
    ...r == null ? void 0 : r.params
  }), i != null && i.query && (r != null && r.query) && (d.query = {
    ...i == null ? void 0 : i.query,
    ...r == null ? void 0 : r.query
  }), i != null && i.headers && (r != null && r.headers)) {
    d.headers = new s((i == null ? void 0 : i.headers) || {});
    for (const [h, y] of new s((r == null ? void 0 : r.headers) || {}))
      d.headers.set(h, y);
  }
  return d;
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
function aa(r = {}) {
  const {
    fetch: i = globalThis.fetch,
    Headers: s = globalThis.Headers,
    AbortController: d = globalThis.AbortController
  } = r;
  async function h(O) {
    const C = O.error && O.error.name === "AbortError" && !O.options.timeout || !1;
    if (O.options.retry !== !1 && !C) {
      let g;
      typeof O.options.retry == "number" ? g = O.options.retry : g = Bi(O.options.method) ? 0 : 1;
      const z = O.response && O.response.status || 500;
      if (g > 0 && (Array.isArray(O.options.retryStatusCodes) ? O.options.retryStatusCodes.includes(z) : nu.has(z))) {
        const A = O.options.retryDelay || 0;
        return A > 0 && await new Promise((ee) => setTimeout(ee, A)), y(O.request, {
          ...O.options,
          retry: g - 1
        });
      }
    }
    const F = Zs(O);
    throw Error.captureStackTrace && Error.captureStackTrace(F, y), F;
  }
  const y = async function(C, F = {}) {
    var ee;
    const g = {
      request: C,
      options: tu(F, r.defaults, s),
      response: void 0,
      error: void 0
    };
    g.options.method = (ee = g.options.method) == null ? void 0 : ee.toUpperCase(), g.options.onRequest && await g.options.onRequest(g), typeof g.request == "string" && (g.options.baseURL && (g.request = Hs(g.request, g.options.baseURL)), (g.options.query || g.options.params) && (g.request = oa(g.request, {
      ...g.options.params,
      ...g.options.query
    }))), g.options.body && Bi(g.options.method) && (Xs(g.options.body) ? (g.options.body = typeof g.options.body == "string" ? g.options.body : JSON.stringify(g.options.body), g.options.headers = new s(g.options.headers || {}), g.options.headers.has("content-type") || g.options.headers.set("content-type", "application/json"), g.options.headers.has("accept") || g.options.headers.set("accept", "application/json")) : (
      // ReadableStream Body
      ("pipeTo" in g.options.body && typeof g.options.body.pipeTo == "function" || // Node.js Stream Body
      typeof g.options.body.pipe == "function") && ("duplex" in g.options || (g.options.duplex = "half"))
    ));
    let z;
    if (!g.options.signal && g.options.timeout) {
      const ye = new d();
      z = setTimeout(
        () => ye.abort(),
        g.options.timeout
      ), g.options.signal = ye.signal;
    }
    try {
      g.response = await i(
        g.request,
        g.options
      );
    } catch (ye) {
      return g.error = ye, g.options.onRequestError && await g.options.onRequestError(g), await h(g);
    } finally {
      z && clearTimeout(z);
    }
    if (g.response.body && !ou.has(g.response.status) && g.options.method !== "HEAD") {
      const ye = (g.options.parseResponse ? "json" : g.options.responseType) || ru(g.response.headers.get("content-type") || "");
      switch (ye) {
        case "json": {
          const sr = await g.response.text(), T = g.options.parseResponse || oo;
          g.response._data = T(sr);
          break;
        }
        case "stream": {
          g.response._data = g.response.body;
          break;
        }
        default:
          g.response._data = await g.response[ye]();
      }
    }
    return g.options.onResponse && await g.options.onResponse(g), !g.options.ignoreResponseError && g.response.status >= 400 && g.response.status < 600 ? (g.options.onResponseError && await g.options.onResponseError(g), await h(g)) : g.response;
  }, R = async function(C, F) {
    return (await y(C, F))._data;
  };
  return R.raw = y, R.native = (...O) => i(...O), R.create = (O = {}) => aa({
    ...r,
    defaults: {
      ...r.defaults,
      ...O
    }
  }), R;
}
const lo = function() {
  if (typeof globalThis < "u")
    return globalThis;
  if (typeof self < "u")
    return self;
  if (typeof window < "u")
    return window;
  if (typeof global < "u")
    return global;
  throw new Error("unable to locate global object");
}(), iu = lo.fetch || (() => Promise.reject(new Error("[ofetch] global.fetch is not supported!"))), au = lo.Headers, su = lo.AbortController, uu = aa({ fetch: iu, Headers: au, AbortController: su }), cu = uu.create({
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
}), du = (r) => (i, s) => (r.set(i, s), s), $i = Number.MAX_SAFE_INTEGER === void 0 ? 9007199254740991 : Number.MAX_SAFE_INTEGER, sa = 536870912, Hi = sa * 2, fu = (r, i) => (s) => {
  const d = i.get(s);
  let h = d === void 0 ? s.size : d < Hi ? d + 1 : 0;
  if (!s.has(h))
    return r(s, h);
  if (s.size < sa) {
    for (; s.has(h); )
      h = Math.floor(Math.random() * Hi);
    return r(s, h);
  }
  if (s.size > $i)
    throw new Error("Congratulations, you created a collection of unique numbers which uses all available integers!");
  for (; s.has(h); )
    h = Math.floor(Math.random() * $i);
  return r(s, h);
}, ua = /* @__PURE__ */ new WeakMap(), lu = du(ua), fn = fu(lu, ua), hu = (r) => r.method !== void 0 && r.method === "call", pu = (r) => typeof r.id == "number" && typeof r.result == "boolean", vu = (r) => {
  const i = /* @__PURE__ */ new Map([[0, () => {
  }]]), s = /* @__PURE__ */ new Map([[0, () => {
  }]]), d = /* @__PURE__ */ new Map(), h = new Worker(r);
  return h.addEventListener("message", ({ data: F }) => {
    if (hu(F)) {
      const { params: { timerId: g, timerType: z } } = F;
      if (z === "interval") {
        const A = i.get(g);
        if (typeof A === void 0)
          throw new Error("The timer is in an undefined state.");
        if (typeof A == "number") {
          const ee = d.get(A);
          if (ee === void 0 || ee.timerId !== g || ee.timerType !== z)
            throw new Error("The timer is in an undefined state.");
        } else typeof A == "function" && A();
      } else if (z === "timeout") {
        const A = s.get(g);
        if (typeof A === void 0)
          throw new Error("The timer is in an undefined state.");
        if (typeof A == "number") {
          const ee = d.get(A);
          if (ee === void 0 || ee.timerId !== g || ee.timerType !== z)
            throw new Error("The timer is in an undefined state.");
        } else typeof A == "function" && (A(), s.delete(g));
      }
    } else if (pu(F)) {
      const { id: g } = F, z = d.get(g);
      if (z === void 0)
        throw new Error("The timer is in an undefined state.");
      const { timerId: A, timerType: ee } = z;
      d.delete(g), ee === "interval" ? i.delete(A) : s.delete(A);
    } else {
      const { error: { message: g } } = F;
      throw new Error(g);
    }
  }), {
    clearInterval: (F) => {
      if (typeof i.get(F) == "function") {
        const g = fn(d);
        d.set(g, { timerId: F, timerType: "interval" }), i.set(F, g), h.postMessage({
          id: g,
          method: "clear",
          params: { timerId: F, timerType: "interval" }
        });
      }
    },
    clearTimeout: (F) => {
      if (typeof s.get(F) == "function") {
        const g = fn(d);
        d.set(g, { timerId: F, timerType: "timeout" }), s.set(F, g), h.postMessage({
          id: g,
          method: "clear",
          params: { timerId: F, timerType: "timeout" }
        });
      }
    },
    setInterval: (F, g = 0, ...z) => {
      const A = fn(i);
      return i.set(A, () => {
        F(...z), typeof i.get(A) == "function" && h.postMessage({
          id: null,
          method: "set",
          params: {
            delay: g,
            now: performance.timeOrigin + performance.now(),
            timerId: A,
            timerType: "interval"
          }
        });
      }), h.postMessage({
        id: null,
        method: "set",
        params: {
          delay: g,
          now: performance.timeOrigin + performance.now(),
          timerId: A,
          timerType: "interval"
        }
      }), A;
    },
    setTimeout: (F, g = 0, ...z) => {
      const A = fn(s);
      return s.set(A, () => F(...z)), h.postMessage({
        id: null,
        method: "set",
        params: {
          delay: g,
          now: performance.timeOrigin + performance.now(),
          timerId: A,
          timerType: "timeout"
        }
      }), A;
    }
  };
}, wu = (r, i) => {
  let s = null;
  return () => {
    if (s !== null)
      return s;
    const d = new Blob([i], { type: "application/javascript; charset=utf-8" }), h = URL.createObjectURL(d);
    return s = r(h), setTimeout(() => URL.revokeObjectURL(h)), s;
  };
}, mu = `(()=>{"use strict";const e=new Map,t=new Map,r=t=>{const r=e.get(t);return void 0!==r&&(clearTimeout(r),e.delete(t),!0)},s=e=>{const r=t.get(e);return void 0!==r&&(clearTimeout(r),t.delete(e),!0)},o=(e,t)=>{const r=performance.now(),s=e+t-r-performance.timeOrigin;return{expected:r+s,remainingDelay:s}},i=(e,t,r,s)=>{const o=r-performance.now();o>0?e.set(t,setTimeout(i,o,e,t,r,s)):(e.delete(t),postMessage({id:null,method:"call",params:{timerId:t,timerType:s}}))};addEventListener("message",(n=>{let{data:a}=n;try{if("clear"===a.method){const{id:e,params:{timerId:t,timerType:o}}=a;if("interval"===o)postMessage({id:e,result:r(t)});else{if("timeout"!==o)throw new Error('The given type "'.concat(o,'" is not supported'));postMessage({id:e,result:s(t)})}}else{if("set"!==a.method)throw new Error('The given method "'.concat(a.method,'" is not supported'));{const{params:{delay:r,now:s,timerId:n,timerType:m}}=a;if("interval"===m)((t,r,s)=>{const{expected:n,remainingDelay:a}=o(t,s);e.set(r,setTimeout(i,a,e,r,n,"interval"))})(r,n,s);else{if("timeout"!==m)throw new Error('The given type "'.concat(m,'" is not supported'));((e,r,s)=>{const{expected:n,remainingDelay:a}=o(e,s);t.set(r,setTimeout(i,a,t,r,n,"timeout"))})(r,n,s)}}}}catch(e){postMessage({error:{message:e.message},id:a.id,result:null})}}))})();`, ca = wu(vu, mu), gu = (r) => ca().clearTimeout(r), qi = (...r) => ca().setTimeout(...r);
/**
* @vue/shared v3.5.1
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
/*! #__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function yu(r, i) {
  const s = new Set(r.split(","));
  return (d) => s.has(d);
}
const Vi = Object.assign, Eu = Object.prototype.hasOwnProperty, ao = (r, i) => Eu.call(r, i), Et = Array.isArray, Ut = (r) => da(r) === "[object Map]", bu = (r) => typeof r == "string", Ht = (r) => typeof r == "symbol", gn = (r) => r !== null && typeof r == "object", Pu = Object.prototype.toString, da = (r) => Pu.call(r), fa = (r) => da(r).slice(8, -1), ho = (r) => bu(r) && r !== "NaN" && r[0] !== "-" && "" + parseInt(r, 10) === r, Ou = (r) => {
  const i = /* @__PURE__ */ Object.create(null);
  return (s) => i[s] || (i[s] = r(s));
}, Tu = Ou((r) => r.charAt(0).toUpperCase() + r.slice(1)), Tt = (r, i) => !Object.is(r, i);
var qe = {};
function Pt(r, ...i) {
  console.warn(`[Vue warn] ${r}`, ...i);
}
let he;
const ro = /* @__PURE__ */ new WeakSet();
class Gi {
  constructor(i) {
    this.fn = i, this.deps = void 0, this.depsTail = void 0, this.flags = 5, this.nextEffect = void 0, this.cleanup = void 0, this.scheduler = void 0;
  }
  pause() {
    this.flags |= 64;
  }
  resume() {
    this.flags & 64 && (this.flags &= -65, ro.has(this) && (ro.delete(this), this.trigger()));
  }
  /**
   * @internal
   */
  notify() {
    this.flags & 2 && !(this.flags & 32) || this.flags & 8 || (this.flags |= 8, this.nextEffect = Bt, Bt = this);
  }
  run() {
    if (!(this.flags & 1))
      return this.fn();
    this.flags |= 2, Ji(this), ha(this);
    const i = he, s = Or;
    he = this, Or = !0;
    try {
      return this.fn();
    } finally {
      qe.NODE_ENV !== "production" && he !== this && Pt(
        "Active effect was not restored correctly - this is likely a Vue internal bug."
      ), pa(this), he = i, Or = s, this.flags &= -3;
    }
  }
  stop() {
    if (this.flags & 1) {
      for (let i = this.deps; i; i = i.nextDep)
        wo(i);
      this.deps = this.depsTail = void 0, Ji(this), this.onStop && this.onStop(), this.flags &= -2;
    }
  }
  trigger() {
    this.flags & 64 ? ro.add(this) : this.scheduler ? this.scheduler() : this.runIfDirty();
  }
  /**
   * @internal
   */
  runIfDirty() {
    so(this) && this.run();
  }
  get dirty() {
    return so(this);
  }
}
let la = 0, Bt;
function po() {
  la++;
}
function vo() {
  if (--la > 0)
    return;
  let r;
  for (; Bt; ) {
    let i = Bt;
    for (Bt = void 0; i; ) {
      const s = i.nextEffect;
      if (i.nextEffect = void 0, i.flags &= -9, i.flags & 1)
        try {
          i.trigger();
        } catch (d) {
          r || (r = d);
        }
      i = s;
    }
  }
  if (r) throw r;
}
function ha(r) {
  for (let i = r.deps; i; i = i.nextDep)
    i.version = -1, i.prevActiveLink = i.dep.activeLink, i.dep.activeLink = i;
}
function pa(r) {
  let i, s = r.depsTail;
  for (let d = s; d; d = d.prevDep)
    d.version === -1 ? (d === s && (s = d.prevDep), wo(d), Su(d)) : i = d, d.dep.activeLink = d.prevActiveLink, d.prevActiveLink = void 0;
  r.deps = i, r.depsTail = s;
}
function so(r) {
  for (let i = r.deps; i; i = i.nextDep)
    if (i.dep.version !== i.version || i.dep.computed && Ru(i.dep.computed) === !1 || i.dep.version !== i.version)
      return !0;
  return !!r._dirty;
}
function Ru(r) {
  if (r.flags & 2)
    return !1;
  if (r.flags & 4 && !(r.flags & 16) || (r.flags &= -17, r.globalVersion === mn))
    return;
  r.globalVersion = mn;
  const i = r.dep;
  if (r.flags |= 2, i.version > 0 && !r.isSSR && !so(r)) {
    r.flags &= -3;
    return;
  }
  const s = he, d = Or;
  he = r, Or = !0;
  try {
    ha(r);
    const h = r.fn();
    (i.version === 0 || Tt(h, r._value)) && (r._value = h, i.version++);
  } catch (h) {
    throw i.version++, h;
  } finally {
    he = s, Or = d, pa(r), r.flags &= -3;
  }
}
function wo(r) {
  const { dep: i, prevSub: s, nextSub: d } = r;
  if (s && (s.nextSub = d, r.prevSub = void 0), d && (d.prevSub = s, r.nextSub = void 0), i.subs === r && (i.subs = s), !i.subs && i.computed) {
    i.computed.flags &= -5;
    for (let h = i.computed.deps; h; h = h.nextDep)
      wo(h);
  }
}
function Su(r) {
  const { prevDep: i, nextDep: s } = r;
  i && (i.nextDep = s, r.prevDep = void 0), s && (s.prevDep = i, r.nextDep = void 0);
}
function xu(r, i) {
  r.effect instanceof Gi && (r = r.effect.fn);
  const s = new Gi(r);
  try {
    s.run();
  } catch (h) {
    throw s.stop(), h;
  }
  const d = s.run.bind(s);
  return d.effect = s, d;
}
let Or = !0;
const va = [];
function Du() {
  va.push(Or), Or = !1;
}
function Cu() {
  const r = va.pop();
  Or = r === void 0 ? !0 : r;
}
function Ji(r) {
  const { cleanup: i } = r;
  if (r.cleanup = void 0, i) {
    const s = he;
    he = void 0;
    try {
      i();
    } finally {
      he = s;
    }
  }
}
let mn = 0;
class wa {
  constructor(i) {
    this.computed = i, this.version = 0, this.activeLink = void 0, this.subs = void 0, qe.NODE_ENV !== "production" && (this.subsHead = void 0);
  }
  track(i) {
    if (!he || !Or)
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
      }, he.deps ? (s.prevDep = he.depsTail, he.depsTail.nextDep = s, he.depsTail = s) : he.deps = he.depsTail = s, he.flags & 4 && ma(s);
    else if (s.version === -1 && (s.version = this.version, s.nextDep)) {
      const d = s.nextDep;
      d.prevDep = s.prevDep, s.prevDep && (s.prevDep.nextDep = d), s.prevDep = he.depsTail, s.nextDep = void 0, he.depsTail.nextDep = s, he.depsTail = s, he.deps === s && (he.deps = d);
    }
    return qe.NODE_ENV !== "production" && he.onTrack && he.onTrack(
      Vi(
        {
          effect: he
        },
        i
      )
    ), s;
  }
  trigger(i) {
    this.version++, mn++, this.notify(i);
  }
  notify(i) {
    po();
    try {
      if (qe.NODE_ENV !== "production")
        for (let s = this.subsHead; s; s = s.nextSub)
          qe.NODE_ENV !== "production" && s.sub.onTrigger && !(s.sub.flags & 8) && s.sub.onTrigger(
            Vi(
              {
                effect: s.sub
              },
              i
            )
          );
      for (let s = this.subs; s; s = s.prevSub)
        s.sub.notify();
    } finally {
      vo();
    }
  }
}
function ma(r) {
  const i = r.dep.computed;
  if (i && !r.dep.subs) {
    i.flags |= 20;
    for (let d = i.deps; d; d = d.nextDep)
      ma(d);
  }
  const s = r.dep.subs;
  s !== r && (r.prevSub = s, s && (s.nextSub = r)), qe.NODE_ENV !== "production" && r.dep.subsHead === void 0 && (r.dep.subsHead = r), r.dep.subs = r;
}
const uo = /* @__PURE__ */ new WeakMap(), ut = Symbol(
  qe.NODE_ENV !== "production" ? "Object iterate" : ""
), co = Symbol(
  qe.NODE_ENV !== "production" ? "Map keys iterate" : ""
), $t = Symbol(
  qe.NODE_ENV !== "production" ? "Array iterate" : ""
);
function ar(r, i, s) {
  if (Or && he) {
    let d = uo.get(r);
    d || uo.set(r, d = /* @__PURE__ */ new Map());
    let h = d.get(s);
    h || d.set(s, h = new wa()), qe.NODE_ENV !== "production" ? h.track({
      target: r,
      type: i,
      key: s
    }) : h.track();
  }
}
function Jr(r, i, s, d, h, y) {
  const R = uo.get(r);
  if (!R) {
    mn++;
    return;
  }
  let O = [];
  if (i === "clear")
    O = [...R.values()];
  else {
    const C = Et(r), F = C && ho(s);
    if (C && s === "length") {
      const g = Number(d);
      R.forEach((z, A) => {
        (A === "length" || A === $t || !Ht(A) && A >= g) && O.push(z);
      });
    } else {
      const g = (z) => z && O.push(z);
      switch (s !== void 0 && g(R.get(s)), F && g(R.get($t)), i) {
        case "add":
          C ? F && g(R.get("length")) : (g(R.get(ut)), Ut(r) && g(R.get(co)));
          break;
        case "delete":
          C || (g(R.get(ut)), Ut(r) && g(R.get(co)));
          break;
        case "set":
          Ut(r) && g(R.get(ut));
          break;
      }
    }
  }
  po();
  for (const C of O)
    qe.NODE_ENV !== "production" ? C.trigger({
      target: r,
      type: i,
      key: s,
      newValue: d,
      oldValue: h,
      oldTarget: y
    }) : C.trigger();
  vo();
}
function wt(r) {
  const i = pe(r);
  return i === r ? i : (ar(i, "iterate", $t), Kr(r) ? i : i.map(or));
}
function mo(r) {
  return ar(r = pe(r), "iterate", $t), r;
}
const Nu = {
  __proto__: null,
  [Symbol.iterator]() {
    return to(this, Symbol.iterator, or);
  },
  concat(...r) {
    return wt(this).concat(
      ...r.map((i) => Et(i) ? wt(i) : i)
    );
  },
  entries() {
    return to(this, "entries", (r) => (r[1] = or(r[1]), r));
  },
  every(r, i) {
    return _r(this, "every", r, i, void 0, arguments);
  },
  filter(r, i) {
    return _r(this, "filter", r, i, (s) => s.map(or), arguments);
  },
  find(r, i) {
    return _r(this, "find", r, i, or, arguments);
  },
  findIndex(r, i) {
    return _r(this, "findIndex", r, i, void 0, arguments);
  },
  findLast(r, i) {
    return _r(this, "findLast", r, i, or, arguments);
  },
  findLastIndex(r, i) {
    return _r(this, "findLastIndex", r, i, void 0, arguments);
  },
  // flat, flatMap could benefit from ARRAY_ITERATE but are not straight-forward to implement
  forEach(r, i) {
    return _r(this, "forEach", r, i, void 0, arguments);
  },
  includes(...r) {
    return no(this, "includes", r);
  },
  indexOf(...r) {
    return no(this, "indexOf", r);
  },
  join(r) {
    return wt(this).join(r);
  },
  // keys() iterator only reads `length`, no optimisation required
  lastIndexOf(...r) {
    return no(this, "lastIndexOf", r);
  },
  map(r, i) {
    return _r(this, "map", r, i, void 0, arguments);
  },
  pop() {
    return jt(this, "pop");
  },
  push(...r) {
    return jt(this, "push", r);
  },
  reduce(r, ...i) {
    return Ki(this, "reduce", r, i);
  },
  reduceRight(r, ...i) {
    return Ki(this, "reduceRight", r, i);
  },
  shift() {
    return jt(this, "shift");
  },
  // slice could use ARRAY_ITERATE but also seems to beg for range tracking
  some(r, i) {
    return _r(this, "some", r, i, void 0, arguments);
  },
  splice(...r) {
    return jt(this, "splice", r);
  },
  toReversed() {
    return wt(this).toReversed();
  },
  toSorted(r) {
    return wt(this).toSorted(r);
  },
  toSpliced(...r) {
    return wt(this).toSpliced(...r);
  },
  unshift(...r) {
    return jt(this, "unshift", r);
  },
  values() {
    return to(this, "values", or);
  }
};
function to(r, i, s) {
  const d = mo(r), h = d[i]();
  return d !== r && !Kr(r) && (h._next = h.next, h.next = () => {
    const y = h._next();
    return y.value && (y.value = s(y.value)), y;
  }), h;
}
const Iu = Array.prototype;
function _r(r, i, s, d, h, y) {
  const R = mo(r), O = R !== r && !Kr(r), C = R[i];
  if (C !== Iu[i]) {
    const z = C.apply(r, y);
    return O ? or(z) : z;
  }
  let F = s;
  R !== r && (O ? F = function(z, A) {
    return s.call(this, or(z), A, r);
  } : s.length > 2 && (F = function(z, A) {
    return s.call(this, z, A, r);
  }));
  const g = C.call(R, F, d);
  return O && h ? h(g) : g;
}
function Ki(r, i, s, d) {
  const h = mo(r);
  let y = s;
  return h !== r && (Kr(r) ? s.length > 3 && (y = function(R, O, C) {
    return s.call(this, R, O, C, r);
  }) : y = function(R, O, C) {
    return s.call(this, R, or(O), C, r);
  }), h[i](y, ...d);
}
function no(r, i, s) {
  const d = pe(r);
  ar(d, "iterate", $t);
  const h = d[i](...s);
  return (h === -1 || h === !1) && Yu(s[0]) ? (s[0] = pe(s[0]), d[i](...s)) : h;
}
function jt(r, i, s = []) {
  Du(), po();
  const d = pe(r)[i].apply(r, s);
  return vo(), Cu(), d;
}
const Wu = /* @__PURE__ */ yu("__proto__,__v_isRef,__isVue"), ga = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((r) => r !== "arguments" && r !== "caller").map((r) => Symbol[r]).filter(Ht)
);
function Au(r) {
  Ht(r) || (r = String(r));
  const i = pe(this);
  return ar(i, "has", r), i.hasOwnProperty(r);
}
class ya {
  constructor(i = !1, s = !1) {
    this._isReadonly = i, this._isShallow = s;
  }
  get(i, s, d) {
    const h = this._isReadonly, y = this._isShallow;
    if (s === "__v_isReactive")
      return !h;
    if (s === "__v_isReadonly")
      return h;
    if (s === "__v_isShallow")
      return y;
    if (s === "__v_raw")
      return d === (h ? y ? Gu : Oa : y ? Vu : Pa).get(i) || // receiver is not the reactive proxy, but has the same prototype
      // this means the receiver is a user proxy of the reactive proxy
      Object.getPrototypeOf(i) === Object.getPrototypeOf(d) ? i : void 0;
    const R = Et(i);
    if (!h) {
      let C;
      if (R && (C = Nu[s]))
        return C;
      if (s === "hasOwnProperty")
        return Au;
    }
    const O = Reflect.get(
      i,
      s,
      // if this is a proxy wrapping a ref, return methods using the raw ref
      // as receiver so that we don't have to call `toRaw` on the ref in all
      // its class methods
      bt(i) ? i : d
    );
    return (Ht(s) ? ga.has(s) : Wu(s)) || (h || ar(i, "get", s), y) ? O : bt(O) ? R && ho(s) ? O : O.value : gn(O) ? h ? Ra(O) : Ta(O) : O;
  }
}
class Mu extends ya {
  constructor(i = !1) {
    super(!1, i);
  }
  set(i, s, d, h) {
    let y = i[s];
    if (!this._isShallow) {
      const C = Ot(y);
      if (!Kr(d) && !Ot(d) && (y = pe(y), d = pe(d)), !Et(i) && bt(y) && !bt(d))
        return C ? !1 : (y.value = d, !0);
    }
    const R = Et(i) && ho(s) ? Number(s) < i.length : ao(i, s), O = Reflect.set(
      i,
      s,
      d,
      bt(i) ? i : h
    );
    return i === pe(h) && (R ? Tt(d, y) && Jr(i, "set", s, d, y) : Jr(i, "add", s, d)), O;
  }
  deleteProperty(i, s) {
    const d = ao(i, s), h = i[s], y = Reflect.deleteProperty(i, s);
    return y && d && Jr(i, "delete", s, void 0, h), y;
  }
  has(i, s) {
    const d = Reflect.has(i, s);
    return (!Ht(s) || !ga.has(s)) && ar(i, "has", s), d;
  }
  ownKeys(i) {
    return ar(
      i,
      "iterate",
      Et(i) ? "length" : ut
    ), Reflect.ownKeys(i);
  }
}
class _u extends ya {
  constructor(i = !1) {
    super(!0, i);
  }
  set(i, s) {
    return qe.NODE_ENV !== "production" && Pt(
      `Set operation on key "${String(s)}" failed: target is readonly.`,
      i
    ), !0;
  }
  deleteProperty(i, s) {
    return qe.NODE_ENV !== "production" && Pt(
      `Delete operation on key "${String(s)}" failed: target is readonly.`,
      i
    ), !0;
  }
}
const Fu = /* @__PURE__ */ new Mu(), zu = /* @__PURE__ */ new _u(), go = (r) => r, yn = (r) => Reflect.getPrototypeOf(r);
function ln(r, i, s = !1, d = !1) {
  r = r.__v_raw;
  const h = pe(r), y = pe(i);
  s || (Tt(i, y) && ar(h, "get", i), ar(h, "get", y));
  const { has: R } = yn(h), O = d ? go : s ? yo : or;
  if (R.call(h, i))
    return O(r.get(i));
  if (R.call(h, y))
    return O(r.get(y));
  r !== h && r.get(i);
}
function hn(r, i = !1) {
  const s = this.__v_raw, d = pe(s), h = pe(r);
  return i || (Tt(r, h) && ar(d, "has", r), ar(d, "has", h)), r === h ? s.has(r) : s.has(r) || s.has(h);
}
function pn(r, i = !1) {
  return r = r.__v_raw, !i && ar(pe(r), "iterate", ut), Reflect.get(r, "size", r);
}
function Yi(r, i = !1) {
  !i && !Kr(r) && !Ot(r) && (r = pe(r));
  const s = pe(this);
  return yn(s).has.call(s, r) || (s.add(r), Jr(s, "add", r, r)), this;
}
function Zi(r, i, s = !1) {
  !s && !Kr(i) && !Ot(i) && (i = pe(i));
  const d = pe(this), { has: h, get: y } = yn(d);
  let R = h.call(d, r);
  R ? qe.NODE_ENV !== "production" && ba(d, h, r) : (r = pe(r), R = h.call(d, r));
  const O = y.call(d, r);
  return d.set(r, i), R ? Tt(i, O) && Jr(d, "set", r, i, O) : Jr(d, "add", r, i), this;
}
function Qi(r) {
  const i = pe(this), { has: s, get: d } = yn(i);
  let h = s.call(i, r);
  h ? qe.NODE_ENV !== "production" && ba(i, s, r) : (r = pe(r), h = s.call(i, r));
  const y = d ? d.call(i, r) : void 0, R = i.delete(r);
  return h && Jr(i, "delete", r, void 0, y), R;
}
function Xi() {
  const r = pe(this), i = r.size !== 0, s = qe.NODE_ENV !== "production" ? Ut(r) ? new Map(r) : new Set(r) : void 0, d = r.clear();
  return i && Jr(r, "clear", void 0, void 0, s), d;
}
function vn(r, i) {
  return function(d, h) {
    const y = this, R = y.__v_raw, O = pe(R), C = i ? go : r ? yo : or;
    return !r && ar(O, "iterate", ut), R.forEach((F, g) => d.call(h, C(F), C(g), y));
  };
}
function wn(r, i, s) {
  return function(...d) {
    const h = this.__v_raw, y = pe(h), R = Ut(y), O = r === "entries" || r === Symbol.iterator && R, C = r === "keys" && R, F = h[r](...d), g = s ? go : i ? yo : or;
    return !i && ar(
      y,
      "iterate",
      C ? co : ut
    ), {
      // iterator protocol
      next() {
        const { value: z, done: A } = F.next();
        return A ? { value: z, done: A } : {
          value: O ? [g(z[0]), g(z[1])] : g(z),
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
function Gr(r) {
  return function(...i) {
    if (qe.NODE_ENV !== "production") {
      const s = i[0] ? `on key "${i[0]}" ` : "";
      Pt(
        `${Tu(r)} operation ${s}failed: target is readonly.`,
        pe(this)
      );
    }
    return r === "delete" ? !1 : r === "clear" ? void 0 : this;
  };
}
function Lu() {
  const r = {
    get(y) {
      return ln(this, y);
    },
    get size() {
      return pn(this);
    },
    has: hn,
    add: Yi,
    set: Zi,
    delete: Qi,
    clear: Xi,
    forEach: vn(!1, !1)
  }, i = {
    get(y) {
      return ln(this, y, !1, !0);
    },
    get size() {
      return pn(this);
    },
    has: hn,
    add(y) {
      return Yi.call(this, y, !0);
    },
    set(y, R) {
      return Zi.call(this, y, R, !0);
    },
    delete: Qi,
    clear: Xi,
    forEach: vn(!1, !0)
  }, s = {
    get(y) {
      return ln(this, y, !0);
    },
    get size() {
      return pn(this, !0);
    },
    has(y) {
      return hn.call(this, y, !0);
    },
    add: Gr("add"),
    set: Gr("set"),
    delete: Gr("delete"),
    clear: Gr("clear"),
    forEach: vn(!0, !1)
  }, d = {
    get(y) {
      return ln(this, y, !0, !0);
    },
    get size() {
      return pn(this, !0);
    },
    has(y) {
      return hn.call(this, y, !0);
    },
    add: Gr("add"),
    set: Gr("set"),
    delete: Gr("delete"),
    clear: Gr("clear"),
    forEach: vn(!0, !0)
  };
  return [
    "keys",
    "values",
    "entries",
    Symbol.iterator
  ].forEach((y) => {
    r[y] = wn(y, !1, !1), s[y] = wn(y, !0, !1), i[y] = wn(y, !1, !0), d[y] = wn(
      y,
      !0,
      !0
    );
  }), [
    r,
    s,
    i,
    d
  ];
}
const [
  ju,
  Uu,
  Bu,
  $u
] = /* @__PURE__ */ Lu();
function Ea(r, i) {
  const s = i ? r ? $u : Bu : r ? Uu : ju;
  return (d, h, y) => h === "__v_isReactive" ? !r : h === "__v_isReadonly" ? r : h === "__v_raw" ? d : Reflect.get(
    ao(s, h) && h in d ? s : d,
    h,
    y
  );
}
const Hu = {
  get: /* @__PURE__ */ Ea(!1, !1)
}, qu = {
  get: /* @__PURE__ */ Ea(!0, !1)
};
function ba(r, i, s) {
  const d = pe(s);
  if (d !== s && i.call(r, d)) {
    const h = fa(r);
    Pt(
      `Reactive ${h} contains both the raw and reactive versions of the same object${h === "Map" ? " as keys" : ""}, which can lead to inconsistencies. Avoid differentiating between the raw and reactive versions of an object and only use the reactive version if possible.`
    );
  }
}
const Pa = /* @__PURE__ */ new WeakMap(), Vu = /* @__PURE__ */ new WeakMap(), Oa = /* @__PURE__ */ new WeakMap(), Gu = /* @__PURE__ */ new WeakMap();
function Ju(r) {
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
function Ku(r) {
  return r.__v_skip || !Object.isExtensible(r) ? 0 : Ju(fa(r));
}
function Ta(r) {
  return Ot(r) ? r : Sa(
    r,
    !1,
    Fu,
    Hu,
    Pa
  );
}
function Ra(r) {
  return Sa(
    r,
    !0,
    zu,
    qu,
    Oa
  );
}
function Sa(r, i, s, d, h) {
  if (!gn(r))
    return qe.NODE_ENV !== "production" && Pt(
      `value cannot be made ${i ? "readonly" : "reactive"}: ${String(
        r
      )}`
    ), r;
  if (r.__v_raw && !(i && r.__v_isReactive))
    return r;
  const y = h.get(r);
  if (y)
    return y;
  const R = Ku(r);
  if (R === 0)
    return r;
  const O = new Proxy(
    r,
    R === 2 ? d : s
  );
  return h.set(r, O), O;
}
function Ot(r) {
  return !!(r && r.__v_isReadonly);
}
function Kr(r) {
  return !!(r && r.__v_isShallow);
}
function Yu(r) {
  return r ? !!r.__v_raw : !1;
}
function pe(r) {
  const i = r && r.__v_raw;
  return i ? pe(i) : r;
}
const or = (r) => gn(r) ? Ta(r) : r, yo = (r) => gn(r) ? Ra(r) : r;
function bt(r) {
  return r ? r.__v_isRef === !0 : !1;
}
function Pr(r) {
  return Zu(r, !1);
}
function Zu(r, i) {
  return bt(r) ? r : new Qu(r, i);
}
class Qu {
  constructor(i, s) {
    this.dep = new wa(), this.__v_isRef = !0, this.__v_isShallow = !1, this._rawValue = s ? i : pe(i), this._value = s ? i : or(i), this.__v_isShallow = s;
  }
  get value() {
    return qe.NODE_ENV !== "production" ? this.dep.track({
      target: this,
      type: "get",
      key: "value"
    }) : this.dep.track(), this._value;
  }
  set value(i) {
    const s = this._rawValue, d = this.__v_isShallow || Kr(i) || Ot(i);
    i = d ? i : pe(i), Tt(i, s) && (this._rawValue = i, this._value = d ? i : or(i), qe.NODE_ENV !== "production" ? this.dep.trigger({
      target: this,
      type: "set",
      key: "value",
      newValue: i,
      oldValue: s
    }) : this.dep.trigger());
  }
}
function Xu() {
  const r = /* @__PURE__ */ new Set(), i = (h) => {
    r.delete(h);
  };
  return {
    on: (h) => (r.add(h), {
      off: () => i(h)
    }),
    off: i,
    trigger: (...h) => Promise.all(Array.from(r).map((y) => y(...h)))
  };
}
async function ku(r) {
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
var ec = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, xa = { exports: {} };
(function(r, i) {
  (function(s, d) {
    r.exports = d();
  })(typeof self < "u" ? self : ec, function() {
    return function(s) {
      var d = {};
      function h(y) {
        if (d[y]) return d[y].exports;
        var R = d[y] = {
          i: y,
          l: !1,
          exports: {}
        };
        return s[y].call(R.exports, R, R.exports, h), R.l = !0, R.exports;
      }
      return h.m = s, h.c = d, h.d = function(y, R, O) {
        h.o(y, R) || Object.defineProperty(y, R, {
          enumerable: !0,
          get: O
        });
      }, h.r = function(y) {
        typeof Symbol < "u" && Symbol.toStringTag && Object.defineProperty(y, Symbol.toStringTag, {
          value: "Module"
        }), Object.defineProperty(y, "__esModule", {
          value: !0
        });
      }, h.t = function(y, R) {
        if (1 & R && (y = h(y)), 8 & R || 4 & R && typeof y == "object" && y && y.__esModule) return y;
        var O = /* @__PURE__ */ Object.create(null);
        if (h.r(O), Object.defineProperty(O, "default", {
          enumerable: !0,
          value: y
        }), 2 & R && typeof y != "string") for (var C in y) h.d(O, C, (function(F) {
          return y[F];
        }).bind(null, C));
        return O;
      }, h.n = function(y) {
        var R = y && y.__esModule ? function() {
          return y.default;
        } : function() {
          return y;
        };
        return h.d(R, "a", R), R;
      }, h.o = function(y, R) {
        return {}.hasOwnProperty.call(y, R);
      }, h.p = "", h(h.s = 0);
    }([function(s, d, h) {
      h.r(d), h.d(d, "PopupOpenError", function() {
        return An;
      }), h.d(d, "create", function() {
        return os;
      }), h.d(d, "destroy", function() {
        return is;
      }), h.d(d, "destroyComponents", function() {
        return Ri;
      }), h.d(d, "destroyAll", function() {
        return Si;
      }), h.d(d, "PROP_TYPE", function() {
        return we;
      }), h.d(d, "PROP_SERIALIZATION", function() {
        return un;
      }), h.d(d, "CONTEXT", function() {
        return xe;
      }), h.d(d, "EVENT", function() {
        return be;
      });
      function y(e, t) {
        return (y = Object.setPrototypeOf || function(n, o) {
          return n.__proto__ = o, n;
        })(e, t);
      }
      function R(e, t) {
        e.prototype = Object.create(t.prototype), e.prototype.constructor = e, y(e, t);
      }
      function O() {
        return (O = Object.assign || function(e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
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
      var F = [], g = [], z = 0, A;
      function ee() {
        if (!z && A) {
          var e = A;
          A = null, e.resolve();
        }
      }
      function ye() {
        z += 1;
      }
      function sr() {
        z -= 1, ee();
      }
      var T = function() {
        function e(n) {
          var o = this;
          if (this.resolved = void 0, this.rejected = void 0, this.errorHandled = void 0, this.value = void 0, this.error = void 0, this.handlers = void 0, this.dispatching = void 0, this.stack = void 0, this.resolved = !1, this.rejected = !1, this.errorHandled = !1, this.handlers = [], n) {
            var a, u, c = !1, l = !1, f = !1;
            ye();
            try {
              n(function(v) {
                f ? o.resolve(v) : (c = !0, a = v);
              }, function(v) {
                f ? o.reject(v) : (l = !0, u = v);
              });
            } catch (v) {
              sr(), this.reject(v);
              return;
            }
            sr(), f = !0, c ? this.resolve(a) : l && this.reject(u);
          }
        }
        var t = e.prototype;
        return t.resolve = function(n) {
          if (this.resolved || this.rejected) return this;
          if (C(n)) throw new Error("Can not resolve promise with another promise");
          return this.resolved = !0, this.value = n, this.dispatch(), this;
        }, t.reject = function(n) {
          var o = this;
          if (this.resolved || this.rejected) return this;
          if (C(n)) throw new Error("Can not reject promise with another promise");
          if (!n) {
            var a = n && typeof n.toString == "function" ? n.toString() : {}.toString.call(n);
            n = new Error("Expected reject to be called with Error, got " + a);
          }
          return this.rejected = !0, this.error = n, this.errorHandled || setTimeout(function() {
            o.errorHandled || function(u, c) {
              if (F.indexOf(u) === -1) {
                F.push(u), setTimeout(function() {
                  throw u;
                }, 1);
                for (var l = 0; l < g.length; l++) g[l](u, c);
              }
            }(n, o);
          }, 1), this.dispatch(), this;
        }, t.asyncReject = function(n) {
          return this.errorHandled = !0, this.reject(n), this;
        }, t.dispatch = function() {
          var n = this.resolved, o = this.rejected, a = this.handlers;
          if (!this.dispatching && (n || o)) {
            this.dispatching = !0, ye();
            for (var u = function(m, b) {
              return m.then(function(P) {
                b.resolve(P);
              }, function(P) {
                b.reject(P);
              });
            }, c = 0; c < a.length; c++) {
              var l = a[c], f = l.onSuccess, v = l.onError, E = l.promise, w = void 0;
              if (n) try {
                w = f ? f(this.value) : this.value;
              } catch (m) {
                E.reject(m);
                continue;
              }
              else if (o) {
                if (!v) {
                  E.reject(this.error);
                  continue;
                }
                try {
                  w = v(this.error);
                } catch (m) {
                  E.reject(m);
                  continue;
                }
              }
              if (w instanceof e && (w.resolved || w.rejected)) {
                var p = w;
                p.resolved ? E.resolve(p.value) : E.reject(p.error), p.errorHandled = !0;
              } else C(w) ? w instanceof e && (w.resolved || w.rejected) ? w.resolved ? E.resolve(w.value) : E.reject(w.error) : u(w, E) : E.resolve(w);
            }
            a.length = 0, this.dispatching = !1, sr();
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
          return this.then(function(c) {
            return clearTimeout(u), c;
          });
        }, t.toPromise = function() {
          if (typeof Promise > "u") throw new TypeError("Could not find Promise");
          return Promise.resolve(this);
        }, t.lazy = function() {
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
          for (var c = function(v, E, w) {
            return E.then(function(p) {
              u[v] = p, (a -= 1) == 0 && o.resolve(u);
            }, function(p) {
              w.reject(p);
            });
          }, l = 0; l < n.length; l++) {
            var f = n[l];
            if (f instanceof e) {
              if (f.resolved) {
                u[l] = f.value, a -= 1;
                continue;
              }
            } else if (!C(f)) {
              u[l] = f, a -= 1;
              continue;
            }
            c(l, e.resolve(f), o);
          }
          return a === 0 && o.resolve(u), o;
        }, e.hash = function(n) {
          var o = {}, a = [], u = function(l) {
            if (n.hasOwnProperty(l)) {
              var f = n[l];
              C(f) ? a.push(f.then(function(v) {
                o[l] = v;
              })) : o[l] = f;
            }
          };
          for (var c in n) u(c);
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
          ye();
          try {
            u = n.apply(o, a || []);
          } catch (c) {
            return sr(), e.reject(c);
          }
          return sr(), e.resolve(u);
        }, e.delay = function(n) {
          return new e(function(o) {
            setTimeout(o, n);
          });
        }, e.isPromise = function(n) {
          return !!(n && n instanceof e) || C(n);
        }, e.flush = function() {
          return function(n) {
            var o = A = A || new n();
            return ee(), o;
          }(e);
        }, e;
      }();
      function ve(e) {
        return {}.toString.call(e) === "[object RegExp]";
      }
      var Ze = {
        IFRAME: "iframe",
        POPUP: "popup"
      }, ur = `Call was rejected by callee.\r
`;
      function Dr(e) {
        return e === void 0 && (e = window), e.location.protocol;
      }
      function Je(e) {
        if (e === void 0 && (e = window), e.mockDomain) {
          var t = e.mockDomain.split("//")[0];
          if (t) return t;
        }
        return Dr(e);
      }
      function qt(e) {
        return e === void 0 && (e = window), Je(e) === "about:";
      }
      function ie(e) {
        if (e === void 0 && (e = window), e) try {
          if (e.parent && e.parent !== e) return e.parent;
        } catch {
        }
      }
      function re(e) {
        if (e === void 0 && (e = window), e && !ie(e)) try {
          return e.opener;
        } catch {
        }
      }
      function se(e) {
        try {
          return !0;
        } catch {
        }
        return !1;
      }
      function Ke(e) {
        e === void 0 && (e = window);
        var t = e.location;
        if (!t) throw new Error("Can not read window location");
        var n = Dr(e);
        if (!n) throw new Error("Can not read window protocol");
        if (n === "file:") return "file://";
        if (n === "about:") {
          var o = ie(e);
          return o && se() ? Ke(o) : "about://";
        }
        var a = t.host;
        if (!a) throw new Error("Can not read window host");
        return n + "//" + a;
      }
      function Y(e) {
        e === void 0 && (e = window);
        var t = Ke(e);
        return t && e.mockDomain && e.mockDomain.indexOf("mock:") === 0 ? e.mockDomain : t;
      }
      function te(e) {
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
            if (qt(t) && se()) return !0;
          } catch {
          }
          try {
            if (function(o) {
              return o === void 0 && (o = window), Je(o) === "mock:";
            }(t) && se()) return !0;
          } catch {
          }
          try {
            if (Ke(t) === Ke(window)) return !0;
          } catch {
          }
          return !1;
        }(e)) return !1;
        try {
          if (e === window || qt(e) && se() || Y(window) === Y(e)) return !0;
        } catch {
        }
        return !1;
      }
      function Te(e) {
        if (!te(e)) throw new Error("Expected window to be same domain");
        return e;
      }
      function cr(e, t) {
        if (!e || !t) return !1;
        var n = ie(t);
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
      function ke(e) {
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
        for (var c = 0; c < 100; c++) {
          var l = void 0;
          try {
            l = n[c];
          } catch {
            return t;
          }
          if (!l) return t;
          t.push(l);
        }
        return t;
      }
      function Yr(e) {
        for (var t = [], n = 0, o = ke(e); n < o.length; n++) {
          var a = o[n];
          t.push(a);
          for (var u = 0, c = Yr(a); u < c.length; u++) t.push(c[u]);
        }
        return t;
      }
      function Zr(e) {
        e === void 0 && (e = window);
        try {
          if (e.top) return e.top;
        } catch {
        }
        if (ie(e) === e) return e;
        try {
          if (cr(window, e) && window.top) return window.top;
        } catch {
        }
        try {
          if (cr(e, window) && window.top) return window.top;
        } catch {
        }
        for (var t = 0, n = Yr(e); t < n.length; t++) {
          var o = n[t];
          try {
            if (o.top) return o.top;
          } catch {
          }
          if (ie(o) === o) return o;
        }
      }
      function Tr(e) {
        var t = Zr(e);
        if (!t) throw new Error("Can not determine top window");
        var n = [].concat(Yr(t), [t]);
        return n.indexOf(e) === -1 && (n = [].concat(n, [e], Yr(e))), n;
      }
      var Qr = [], ct = [];
      function Se(e, t) {
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
          return !a || a.message !== ur;
        }
        if (t && te(e)) try {
          if (e.mockclosed) return !0;
        } catch {
        }
        try {
          if (!e.parent || !e.top) return !0;
        } catch {
        }
        var n = function(a, u) {
          for (var c = 0; c < a.length; c++) try {
            if (a[c] === u) return c;
          } catch {
          }
          return -1;
        }(Qr, e);
        if (n !== -1) {
          var o = ct[n];
          if (o && function(a) {
            if (!a.contentWindow || !a.parentNode) return !0;
            var u = a.ownerDocument;
            if (u && u.documentElement && !u.documentElement.contains(a)) {
              for (var c = a; c.parentNode && c.parentNode !== c; ) c = c.parentNode;
              if (!c.host || !u.documentElement.contains(c.host)) return !0;
            }
            return !1;
          }(o)) return !0;
        }
        return !1;
      }
      function Vt(e) {
        return (e = e || window).navigator.mockUserAgent || e.navigator.userAgent;
      }
      function Xr(e, t) {
        for (var n = ke(e), o = 0; o < n.length; o++) {
          var a = n[o];
          try {
            if (te(a) && a.name === t && n.indexOf(a) !== -1) return a;
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
      function Eo(e, t) {
        return e === re(t);
      }
      function Rt(e) {
        return e === void 0 && (e = window), re(e = e || window) || ie(e) || void 0;
      }
      function En(e, t) {
        for (var n = 0; n < e.length; n++)
          for (var o = e[n], a = 0; a < t.length; a++) if (o === t[a]) return !0;
        return !1;
      }
      function bn(e) {
        e === void 0 && (e = window);
        for (var t = 0, n = e; n; ) (n = ie(n)) && (t += 1);
        return t;
      }
      function Gt(e, t) {
        var n = Zr(e) || e, o = Zr(t) || t;
        try {
          if (n && o) return n === o;
        } catch {
        }
        var a = Tr(e), u = Tr(t);
        if (En(a, u)) return !0;
        var c = re(n), l = re(o);
        return c && En(Tr(c), u) || l && En(Tr(l), a), !1;
      }
      function dr(e, t) {
        if (typeof e == "string") {
          if (typeof t == "string") return e === "*" || t === e;
          if (ve(t) || Array.isArray(t)) return !1;
        }
        return ve(e) ? ve(t) ? e.toString() === t.toString() : !Array.isArray(t) && !!t.match(e) : !!Array.isArray(e) && (Array.isArray(t) ? JSON.stringify(e) === JSON.stringify(t) : !ve(t) && e.some(function(n) {
          return dr(n, t);
        }));
      }
      function Cr(e) {
        return e.match(/^(https?|mock|file):\/\//) ? e.split("/").slice(0, 3).join("/") : Y();
      }
      function bo(e, t, n, o) {
        n === void 0 && (n = 1e3), o === void 0 && (o = 1 / 0);
        var a;
        return function u() {
          if (Se(e))
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
          if (t && t.message === ur) return !0;
        }
        try {
          if ({}.toString.call(e) === "[object Window]") return !0;
        } catch (t) {
          if (t && t.message === ur) return !0;
        }
        try {
          if (window.Window && e instanceof window.Window) return !0;
        } catch (t) {
          if (t && t.message === ur) return !0;
        }
        try {
          if (e && e.self === e) return !0;
        } catch (t) {
          if (t && t.message === ur) return !0;
        }
        try {
          if (e && e.parent === e) return !0;
        } catch (t) {
          if (t && t.message === ur) return !0;
        }
        try {
          if (e && e.top === e) return !0;
        } catch (t) {
          if (t && t.message === ur) return !0;
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
      function Pn(e) {
        if (t = Cr(e), t.indexOf("mock:") !== 0) return e;
        var t;
        throw new Error("Mock urls not supported out of test mode");
      }
      function Po(e) {
        if (te(e)) return Te(e).frameElement;
        for (var t = 0, n = document.querySelectorAll("iframe"); t < n.length; t++) {
          var o = n[t];
          if (o && o.contentWindow && o.contentWindow === e) return o;
        }
      }
      function Oo(e) {
        if (function(n) {
          return n === void 0 && (n = window), !!ie(n);
        }(e)) {
          var t = Po(e);
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
      function Jt(e, t) {
        for (var n = 0; n < e.length; n++) try {
          if (e[n] === t) return n;
        } catch {
        }
        return -1;
      }
      var Kt = function() {
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
            if (kr(u) && Se(u)) {
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
            var u = this.name, c = n[u];
            c && c[0] === n ? c[1] = o : Object.defineProperty(n, u, {
              value: [n, o],
              writable: !0
            });
            return;
          } catch {
          }
          this._cleanupClosedWindows();
          var l = this.keys, f = this.values, v = Jt(l, n);
          v === -1 ? (l.push(n), f.push(o)) : f[v] = o;
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
          var u = Jt(this.keys, n);
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
          var u = this.keys, c = Jt(u, n);
          c !== -1 && (u.splice(c, 1), this.values.splice(c, 1));
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
          return this._cleanupClosedWindows(), Jt(this.keys, n) !== -1;
        }, t.getOrSet = function(n, o) {
          if (this.has(n)) return this.get(n);
          var a = o();
          return this.set(n, a), a;
        }, e;
      }();
      function To(e) {
        return (To = Object.setPrototypeOf ? Object.getPrototypeOf : function(t) {
          return t.__proto__ || Object.getPrototypeOf(t);
        })(e);
      }
      function Ia() {
        if (typeof Reflect > "u" || !Reflect.construct || Reflect.construct.sham) return !1;
        if (typeof Proxy == "function") return !0;
        try {
          return Date.prototype.toString.call(Reflect.construct(Date, [], function() {
          })), !0;
        } catch {
          return !1;
        }
      }
      function Ro(e, t, n) {
        return (Ro = Ia() ? Reflect.construct : function(o, a, u) {
          var c = [null];
          c.push.apply(c, a);
          var l = new (Function.bind.apply(o, c))();
          return u && y(l, u.prototype), l;
        }).apply(null, arguments);
      }
      function So(e) {
        var t = typeof Map == "function" ? /* @__PURE__ */ new Map() : void 0;
        return (So = function(n) {
          if (n === null || (o = n, Function.toString.call(o).indexOf("[native code]") === -1)) return n;
          var o;
          if (typeof n != "function") throw new TypeError("Super expression must either be null or a function");
          if (t !== void 0) {
            if (t.has(n)) return t.get(n);
            t.set(n, a);
          }
          function a() {
            return Ro(n, arguments, To(this).constructor);
          }
          return a.prototype = Object.create(n.prototype, {
            constructor: {
              value: a,
              enumerable: !1,
              writable: !0,
              configurable: !0
            }
          }), y(a, n);
        })(e);
      }
      function On(e) {
        var t = !1;
        try {
          (e instanceof window.Element || e !== null && typeof e == "object" && e.nodeType === 1 && typeof e.style == "object" && typeof e.ownerDocument == "object") && (t = !0);
        } catch {
        }
        return t;
      }
      function Tn(e) {
        return e.name || e.__name__ || e.displayName || "anonymous";
      }
      function Rn(e, t) {
        try {
          delete e.name, e.name = t;
        } catch {
        }
        return e.__name__ = e.displayName = t, e;
      }
      function Sn(e) {
        if (typeof btoa == "function") return btoa(encodeURIComponent(e).replace(/%([0-9A-F]{2})/g, function(t, n) {
          return String.fromCharCode(parseInt(n, 16));
        })).replace(/[=]/g, "");
        if (typeof Buffer < "u") return Buffer.from(e, "utf8").toString("base64").replace(/[=]/g, "");
        throw new Error("Can not find window.btoa or Buffer");
      }
      function Qe() {
        var e = "0123456789abcdef";
        return "uid_" + "xxxxxxxxxx".replace(/./g, function() {
          return e.charAt(Math.floor(Math.random() * e.length));
        }) + "_" + Sn((/* @__PURE__ */ new Date()).toISOString().slice(11, 19).replace("T", ".")).replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
      }
      var Yt;
      function xn(e) {
        try {
          return JSON.stringify([].slice.call(e), function(t, n) {
            return typeof n == "function" ? "memoize[" + function(o) {
              if (Yt = Yt || new Kt(), o == null || typeof o != "object" && typeof o != "function") throw new Error("Invalid object");
              var a = Yt.get(o);
              return a || (a = typeof o + ":" + Qe(), Yt.set(o, a)), a;
            }(n) + "]" : On(n) ? {} : n;
          });
        } catch {
          throw new Error("Arguments not serializable -- can not be used to memoize");
        }
      }
      function Wa() {
        return {};
      }
      var St = 0, xo = 0;
      function Fr(e, t) {
        t === void 0 && (t = {});
        var n = t.thisNamespace, o = n !== void 0 && n, a = t.time, u, c, l = St;
        St += 1;
        var f = function() {
          for (var v = arguments.length, E = new Array(v), w = 0; w < v; w++) E[w] = arguments[w];
          l < xo && (u = null, c = null, l = St, St += 1);
          var p;
          p = o ? (c = c || new Kt()).getOrSet(this, Wa) : u = u || {};
          var m;
          try {
            m = xn(E);
          } catch {
            return e.apply(this, arguments);
          }
          var b = p[m];
          if (b && a && Date.now() - b.time < a && (delete p[m], b = null), b) return b.value;
          var P = Date.now(), S = e.apply(this, arguments);
          return p[m] = {
            time: P,
            value: S
          }, S;
        };
        return f.reset = function() {
          u = null, c = null;
        }, Rn(f, (t.name || Tn(e)) + "::memoized");
      }
      Fr.clear = function() {
        xo = St;
      };
      function Aa(e) {
        var t = {};
        function n() {
          for (var o = arguments, a = this, u = arguments.length, c = new Array(u), l = 0; l < u; l++) c[l] = arguments[l];
          var f = xn(c);
          return t.hasOwnProperty(f) || (t[f] = T.try(function() {
            return e.apply(a, o);
          }).finally(function() {
            delete t[f];
          })), t[f];
        }
        return n.reset = function() {
          t = {};
        }, Rn(n, Tn(e) + "::promiseMemoized");
      }
      function Ee() {
      }
      function Zt(e) {
        var t = !1;
        return Rn(function() {
          if (!t)
            return t = !0, e.apply(this, arguments);
        }, Tn(e) + "::once");
      }
      function dt(e, t) {
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
          return "Error while stringifying error: " + dt(a, t + 1);
        }
      }
      function Qt(e) {
        return typeof e == "string" ? e : e && e.toString && typeof e.toString == "function" ? e.toString() : {}.toString.call(e);
      }
      function ft(e, t) {
        if (!t) return e;
        if (Object.assign) return Object.assign(e, t);
        for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
        return e;
      }
      Fr(function(e) {
        if (Object.values) return Object.values(e);
        var t = [];
        for (var n in e) e.hasOwnProperty(n) && t.push(e[n]);
        return t;
      });
      function Ma(e) {
        return e;
      }
      function xt(e, t) {
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
      function Dn(e) {
        return e.replace(/-([a-z])/g, function(t) {
          return t[1].toUpperCase();
        });
      }
      function Do(e, t, n) {
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
      function Cn(e) {
        return [].slice.call(e);
      }
      function Co(e) {
        return typeof (t = e) == "object" && t !== null && {}.toString.call(e) === "[object Object]";
        var t;
      }
      function Nn(e) {
        if (!Co(e)) return !1;
        var t = e.constructor;
        if (typeof t != "function") return !1;
        var n = t.prototype;
        return !!Co(n) && !!n.hasOwnProperty("isPrototypeOf");
      }
      function Xt(e, t, n) {
        if (n === void 0 && (n = ""), Array.isArray(e)) {
          for (var o = e.length, a = [], u = function(E) {
            Do(a, E, function() {
              var w = n ? n + "." + E : "" + E, p = t(e[E], E, w);
              return (Nn(p) || Array.isArray(p)) && (p = Xt(p, t, w)), p;
            });
          }, c = 0; c < o; c++) u(c);
          return a;
        }
        if (Nn(e)) {
          var l = {}, f = function(E) {
            if (!e.hasOwnProperty(E)) return 1;
            Do(l, E, function() {
              var w = n ? n + "." + E : "" + E, p = t(e[E], E, w);
              return (Nn(p) || Array.isArray(p)) && (p = Xt(p, t, w)), p;
            });
          };
          for (var v in e) f(v);
          return l;
        }
        throw new Error("Pass an object or array");
      }
      function zr(e) {
        return e != null;
      }
      function In(e) {
        return {}.toString.call(e) === "[object RegExp]";
      }
      function Dt(e, t, n) {
        if (e.hasOwnProperty(t)) return e[t];
        var o = n();
        return e[t] = o, o;
      }
      function kt(e) {
        var t = [], n = !1, o, a = {
          set: function(u, c) {
            return n || (e[u] = c, a.register(function() {
              delete e[u];
            })), c;
          },
          register: function(u) {
            var c = Zt(function() {
              return u(o);
            });
            return n ? u(o) : t.push(c), {
              cancel: function() {
                var l = t.indexOf(c);
                l !== -1 && t.splice(l, 1);
              }
            };
          },
          all: function(u) {
            o = u;
            var c = [];
            for (n = !0; t.length; ) {
              var l = t.shift();
              c.push(l());
            }
            return T.all(c).then(Ee);
          }
        };
        return a;
      }
      function en(e, t) {
        if (t == null) throw new Error("Expected " + e + " to be present");
        return t;
      }
      var _a = function(e) {
        R(t, e);
        function t(n) {
          var o;
          return (o = e.call(this, n) || this).name = o.constructor.name, typeof Error.captureStackTrace == "function" ? Error.captureStackTrace(function(a) {
            if (a === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return a;
          }(o), o.constructor) : o.stack = new Error(n).stack, o;
        }
        return t;
      }(So(Error));
      function No() {
        var e = document.body;
        if (!e) throw new Error("Body element not found");
        return e;
      }
      function rn() {
        return !!document.body && document.readyState === "complete";
      }
      function Io() {
        return !!document.body && document.readyState === "interactive";
      }
      function Wo(e) {
        return encodeURIComponent(e);
      }
      Fr(function() {
        return new T(function(e) {
          if (rn() || Io()) return e();
          var t = setInterval(function() {
            if (rn() || Io())
              return clearInterval(t), e();
          }, 10);
        });
      });
      function Ao(e) {
        return function(t, n, o) {
          o === void 0 && (o = []);
          var a = t.__inline_memoize_cache__ = t.__inline_memoize_cache__ || {}, u = xn(o);
          return a.hasOwnProperty(u) ? a[u] : a[u] = (function() {
            var c = {};
            if (!e || e.indexOf("=") === -1) return c;
            for (var l = 0, f = e.split("&"); l < f.length; l++) {
              var v = f[l];
              (v = v.split("="))[0] && v[1] && (c[decodeURIComponent(v[0])] = decodeURIComponent(v[1]));
            }
            return c;
          }).apply(void 0, o);
        }(Ao, 0, [e]);
      }
      function Mo(e, t) {
        return t === void 0 && (t = {}), t && Object.keys(t).length ? function(n) {
          return n === void 0 && (n = {}), Object.keys(n).filter(function(o) {
            return typeof n[o] == "string" || typeof n[o] == "boolean";
          }).map(function(o) {
            var a = n[o];
            if (typeof a != "string" && typeof a != "boolean") throw new TypeError("Invalid type for query");
            return Wo(o) + "=" + Wo(a.toString());
          }).join("&");
        }(O({}, Ao(e), t)) : e;
      }
      function Fa(e, t) {
        e.appendChild(t);
      }
      function Wn(e, t) {
        return t === void 0 && (t = document), On(e) ? e : typeof e == "string" ? t.querySelector(e) : void 0;
      }
      function _o(e) {
        return new T(function(t, n) {
          var o = Qt(e), a = Wn(e);
          if (a) return t(a);
          if (rn()) return n(new Error("Document is ready and element " + o + " does not exist"));
          var u = setInterval(function() {
            if (a = Wn(e))
              t(a), clearInterval(u);
            else if (rn())
              return clearInterval(u), n(new Error("Document is ready and element " + o + " does not exist"));
          }, 10);
        });
      }
      var An = function(e) {
        R(t, e);
        function t() {
          return e.apply(this, arguments) || this;
        }
        return t;
      }(_a), tn;
      function Fo(e) {
        if ((tn = tn || new Kt()).has(e)) {
          var t = tn.get(e);
          if (t) return t;
        }
        var n = new T(function(o, a) {
          e.addEventListener("load", function() {
            (function(u) {
              if (function() {
                for (var c = 0; c < Qr.length; c++) {
                  var l = !1;
                  try {
                    l = Qr[c].closed;
                  } catch {
                  }
                  l && (ct.splice(c, 1), Qr.splice(c, 1));
                }
              }(), u && u.contentWindow) try {
                Qr.push(u.contentWindow), ct.push(u);
              } catch {
              }
            })(e), o(e);
          }), e.addEventListener("error", function(u) {
            e.contentWindow ? o(e) : a(u);
          });
        });
        return tn.set(e, n), n;
      }
      function Mn(e) {
        return Fo(e).then(function(t) {
          if (!t.contentWindow) throw new Error("Could not find window in iframe");
          return t.contentWindow;
        });
      }
      function zo(e, t) {
        e === void 0 && (e = {});
        var n = e.style || {}, o = function(u, c, l) {
          u === void 0 && (u = "div"), c === void 0 && (c = {}), u = u.toLowerCase();
          var f = document.createElement(u);
          if (c.style && ft(f.style, c.style), c.class && (f.className = c.class.join(" ")), c.id && f.setAttribute("id", c.id), c.attributes) for (var v = 0, E = Object.keys(c.attributes); v < E.length; v++) {
            var w = E[v];
            f.setAttribute(w, c.attributes[w]);
          }
          if (c.styleSheet && function(p, m, b) {
            b === void 0 && (b = window.document), p.styleSheet ? p.styleSheet.cssText = m : p.appendChild(b.createTextNode(m));
          }(f, c.styleSheet), c.html) {
            if (u === "iframe") throw new Error("Iframe html can not be written unless container provided and iframe in DOM");
            f.innerHTML = c.html;
          }
          return f;
        }("iframe", {
          attributes: O({
            allowTransparency: "true"
          }, e.attributes || {}),
          style: O({
            backgroundColor: "transparent",
            border: "none"
          }, n),
          html: e.html,
          class: e.class
        }), a = window.navigator.userAgent.match(/MSIE|Edge/i);
        return o.hasAttribute("id") || o.setAttribute("id", Qe()), Fo(o), (e.url || a) && o.setAttribute("src", e.url || "about:blank"), o;
      }
      function Lo(e, t, n) {
        return e.addEventListener(t, n), {
          cancel: function() {
            e.removeEventListener(t, n);
          }
        };
      }
      function za(e) {
        e.style.setProperty("display", "");
      }
      function jo(e) {
        e.style.setProperty("display", "none", "important");
      }
      function Ct(e) {
        e && e.parentNode && e.parentNode.removeChild(e);
      }
      function lt(e) {
        return !(e && e.parentNode && e.ownerDocument && e.ownerDocument.documentElement && e.ownerDocument.documentElement.contains(e));
      }
      function Uo(e, t, n) {
        var o = n === void 0 ? {} : n, a = o.width, u = a === void 0 || a, c = o.height, l = c === void 0 || c, f = o.interval, v = f === void 0 ? 100 : f, E = o.win, w = E === void 0 ? window : E, p = e.offsetWidth, m = e.offsetHeight, b = !1;
        t({
          width: p,
          height: m
        });
        var P = function() {
          if (!b && function(I) {
            return !!(I.offsetWidth || I.offsetHeight || I.getClientRects().length);
          }(e)) {
            var M = e.offsetWidth, H = e.offsetHeight;
            (u && M !== p || l && H !== m) && t({
              width: M,
              height: H
            }), p = M, m = H;
          }
        }, S, N;
        return w.addEventListener("resize", P), w.ResizeObserver !== void 0 ? ((S = new w.ResizeObserver(P)).observe(e), N = xt(P, 10 * v)) : w.MutationObserver !== void 0 ? ((S = new w.MutationObserver(P)).observe(e, {
          attributes: !0,
          childList: !0,
          subtree: !0,
          characterData: !1
        }), N = xt(P, 10 * v)) : N = xt(P, v), {
          cancel: function() {
            b = !0, S.disconnect(), window.removeEventListener("resize", P), N.cancel();
          }
        };
      }
      function _n(e) {
        for (; e.parentNode; ) e = e.parentNode;
        return e.toString() === "[object ShadowRoot]";
      }
      var nn = typeof document < "u" ? document.currentScript : null, La = Fr(function() {
        if (nn || (nn = function() {
          try {
            var e = function() {
              try {
                throw new Error("_");
              } catch (c) {
                return c.stack || "";
              }
            }(), t = /.*at [^(]*\((.*):(.+):(.+)\)$/gi.exec(e), n = t && t[1];
            if (!n) return;
            for (var o = 0, a = [].slice.call(document.getElementsByTagName("script")).reverse(); o < a.length; o++) {
              var u = a[o];
              if (u.src && u.src === n) return u;
            }
          } catch {
          }
        }())) return nn;
        throw new Error("Can not determine current script");
      }), ja = Qe();
      Fr(function() {
        var e;
        try {
          e = La();
        } catch {
          return ja;
        }
        var t = e.getAttribute("data-uid");
        if (t && typeof t == "string" || (t = e.getAttribute("data-uid-auto")) && typeof t == "string") return t;
        if (e.src) {
          var n = function(o) {
            for (var a = "", u = 0; u < o.length; u++) {
              var c = o[u].charCodeAt(0) * u;
              o[u + 1] && (c += o[u + 1].charCodeAt(0) * (u - 1)), a += String.fromCharCode(97 + Math.abs(c) % 26);
            }
            return a;
          }(JSON.stringify({
            src: e.src,
            dataset: e.dataset
          }));
          t = "uid_" + n.slice(n.length - 30);
        } else t = Qe();
        return e.setAttribute("data-uid-auto", t), t;
      });
      function Bo(e) {
        return typeof e == "string" && /^[0-9]+%$/.test(e);
      }
      function Fn(e) {
        if (typeof e == "number") return e;
        var t = e.match(/^([0-9]+)(px|%)$/);
        if (!t) throw new Error("Could not match css value from " + e);
        return parseInt(t[1], 10);
      }
      function $o(e) {
        return Fn(e) + "px";
      }
      function Ho(e) {
        return typeof e == "number" ? $o(e) : Bo(e) ? e : $o(e);
      }
      function qo(e, t) {
        if (typeof e == "number") return e;
        if (Bo(e)) return parseInt(t * Fn(e) / 100, 10);
        if (typeof (n = e) == "string" && /^[0-9]+px$/.test(n)) return Fn(e);
        var n;
        throw new Error("Can not normalize dimension: " + e);
      }
      function Rr(e) {
        e === void 0 && (e = window);
        var t = "__post_robot_11_0_0__";
        return e !== window ? e[t] : e[t] = e[t] || {};
      }
      var Vo = function() {
        return {};
      };
      function fe(e, t) {
        return e === void 0 && (e = "store"), t === void 0 && (t = Vo), Dt(Rr(), e, function() {
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
              return Dt(n, o, a);
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
      var Ua = function() {
      };
      function on() {
        var e = Rr();
        return e.WINDOW_WILDCARD = e.WINDOW_WILDCARD || new Ua(), e.WINDOW_WILDCARD;
      }
      function Ye(e, t) {
        return e === void 0 && (e = "store"), t === void 0 && (t = Vo), fe("windowStore").getOrSet(e, function() {
          var n = new Kt(), o = function(a) {
            return n.getOrSet(a, t);
          };
          return {
            has: function(a) {
              return o(a).hasOwnProperty(e);
            },
            get: function(a, u) {
              var c = o(a);
              return c.hasOwnProperty(e) ? c[e] : u;
            },
            set: function(a, u) {
              return o(a)[e] = u, u;
            },
            del: function(a) {
              delete o(a)[e];
            },
            getOrSet: function(a, u) {
              return Dt(o(a), e, u);
            }
          };
        });
      }
      function Jo() {
        return fe("instance").getOrSet("instanceID", Qe);
      }
      function Ko(e, t) {
        var n = t.domain, o = Ye("helloPromises"), a = o.get(e);
        a && a.resolve({
          domain: n
        });
        var u = T.resolve({
          domain: n
        });
        return o.set(e, u), u;
      }
      function zn(e, t) {
        return (0, t.send)(e, "postrobot_hello", {
          instanceID: Jo()
        }, {
          domain: "*",
          timeout: -1
        }).then(function(n) {
          var o = n.origin, a = n.data.instanceID;
          return Ko(e, {
            domain: o
          }), {
            win: e,
            domain: o,
            instanceID: a
          };
        });
      }
      function Yo(e, t) {
        var n = t.send;
        return Ye("windowInstanceIDPromises").getOrSet(e, function() {
          return zn(e, {
            send: n
          }).then(function(o) {
            return o.instanceID;
          });
        });
      }
      function Zo(e, t, n) {
        t === void 0 && (t = 5e3), n === void 0 && (n = "Window");
        var o = function(a) {
          return Ye("helloPromises").getOrSet(a, function() {
            return new T();
          });
        }(e);
        return t !== -1 && (o = o.timeout(t, new Error(n + " did not load after " + t + "ms"))), o;
      }
      function Qo(e) {
        Ye("knownWindows").set(e, !0);
      }
      function Ln(e) {
        return typeof e == "object" && e !== null && typeof e.__type__ == "string";
      }
      function Xo(e) {
        return e === void 0 ? "undefined" : e === null ? "null" : Array.isArray(e) ? "array" : typeof e == "function" ? "function" : typeof e == "object" ? e instanceof Error ? "error" : typeof e.then == "function" ? "promise" : {}.toString.call(e) === "[object RegExp]" ? "regex" : {}.toString.call(e) === "[object Date]" ? "date" : "object" : typeof e == "string" ? "string" : typeof e == "number" ? "number" : typeof e == "boolean" ? "boolean" : void 0;
      }
      function et(e, t) {
        return {
          __type__: e,
          __val__: t
        };
      }
      var fr, Ba = ((fr = {}).function = function() {
      }, fr.error = function(e) {
        return et("error", {
          message: e.message,
          stack: e.stack,
          code: e.code,
          data: e.data
        });
      }, fr.promise = function() {
      }, fr.regex = function(e) {
        return et("regex", e.source);
      }, fr.date = function(e) {
        return et("date", e.toJSON());
      }, fr.array = function(e) {
        return e;
      }, fr.object = function(e) {
        return e;
      }, fr.string = function(e) {
        return e;
      }, fr.number = function(e) {
        return e;
      }, fr.boolean = function(e) {
        return e;
      }, fr.null = function(e) {
        return e;
      }, fr[void 0] = function(e) {
        return et("undefined", e);
      }, fr), $a = {}, lr, Ha = ((lr = {}).function = function() {
        throw new Error("Function serialization is not implemented; nothing to deserialize");
      }, lr.error = function(e) {
        var t = e.stack, n = e.code, o = e.data, a = new Error(e.message);
        return a.code = n, o && (a.data = o), a.stack = t + `

` + a.stack, a;
      }, lr.promise = function() {
        throw new Error("Promise serialization is not implemented; nothing to deserialize");
      }, lr.regex = function(e) {
        return new RegExp(e);
      }, lr.date = function(e) {
        return new Date(e);
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
      }, lr[void 0] = function() {
      }, lr), qa = {};
      function jn() {
        return !!Vt(window).match(/MSIE|trident|edge\/12|edge\/13/i);
      }
      function ko(e) {
        return !Gt(window, e);
      }
      function ei(e, t) {
        if (e) {
          if (Y() !== Cr(e)) return !0;
        } else if (t && !te(t)) return !0;
        return !1;
      }
      function ri(e) {
        var t = e.win, n = e.domain;
        return !(!jn() || n && !ei(n, t) || t && !ko(t));
      }
      function Un(e) {
        return "__postrobot_bridge___" + (e = e || Cr(e)).replace(/[^a-zA-Z0-9]+/g, "_");
      }
      function ti() {
        return !!(window.name && window.name === Un(Y()));
      }
      var Va = new T(function(e) {
        if (window.document && window.document.body) return e(window.document.body);
        var t = setInterval(function() {
          if (window.document && window.document.body)
            return clearInterval(t), e(window.document.body);
        }, 10);
      });
      function ni(e) {
        Ye("remoteWindowPromises").getOrSet(e, function() {
          return new T();
        });
      }
      function Bn(e) {
        var t = Ye("remoteWindowPromises").get(e);
        if (!t) throw new Error("Remote window promise not found");
        return t;
      }
      function oi(e, t, n) {
        Bn(e).resolve(function(o, a, u) {
          if (o !== e) throw new Error("Remote window does not match window");
          if (!dr(a, t)) throw new Error("Remote domain " + a + " does not match domain " + t);
          n.fireAndForget(u);
        });
      }
      function $n(e, t) {
        Bn(e).reject(t).catch(Ee);
      }
      function an(e) {
        for (var t = e.win, n = e.name, o = e.domain, a = fe("popupWindowsByName"), u = Ye("popupWindowsByWin"), c = 0, l = a.keys(); c < l.length; c++) {
          var f = l[c], v = a.get(f);
          v && !Se(v.win) || a.del(f);
        }
        if (Se(t)) return {
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
        return n && (E.name = n, a.set(n, E)), o && (E.domain = o, ni(t)), u.set(t, E), E;
      }
      function ii(e) {
        var t = e.on, n = e.send, o = e.receiveMessage;
        a = window.open, window.open = function(u, c, l, f) {
          var v = a.call(this, Pn(u), c, l, f);
          return v && (an({
            win: v,
            name: c,
            domain: u ? Cr(u) : null
          }), v);
        };
        var a;
        (function(u) {
          var c = u.on, l = u.send, f = u.receiveMessage, v = fe("popupWindowsByName");
          c("postrobot_open_tunnel", function(E) {
            var w = E.source, p = E.origin, m = E.data, b = fe("bridges").get(p);
            if (!b) throw new Error("Can not find bridge promise for domain " + p);
            return b.then(function(P) {
              if (w !== P) throw new Error("Message source does not matched registered bridge for domain " + p);
              if (!m.name) throw new Error("Register window expected to be passed window name");
              if (!m.sendMessage) throw new Error("Register window expected to be passed sendMessage method");
              if (!v.has(m.name)) throw new Error("Window with name " + m.name + " does not exist, or was not opened by this window");
              var S = function() {
                return v.get(m.name);
              };
              if (!S().domain) throw new Error("We do not have a registered domain for window " + m.name);
              if (S().domain !== p) throw new Error("Message origin " + p + " does not matched registered window origin " + (S().domain || "unknown"));
              return oi(S().win, p, m.sendMessage), {
                sendMessage: function(N) {
                  if (window && !window.closed && S()) {
                    var M = S().domain;
                    if (M) try {
                      f({
                        data: N,
                        origin: M,
                        source: S().win
                      }, {
                        on: c,
                        send: l
                      });
                    } catch (H) {
                      T.reject(H);
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
          var c = u.send;
          Rr(window).openTunnelToParent = function(l) {
            var f = l.name, v = l.source, E = l.canary, w = l.sendMessage, p = fe("tunnelWindows"), m = ie(window);
            if (!m) throw new Error("No parent window found to open tunnel to");
            var b = function(P) {
              var S = P.name, N = P.source, M = P.canary, H = P.sendMessage;
              (function() {
                for (var B = fe("tunnelWindows"), _ = 0, Z = B.keys(); _ < Z.length; _++) {
                  var U = Z[_];
                  Se(B[U].source) && B.del(U);
                }
              })();
              var I = Qe();
              return fe("tunnelWindows").set(I, {
                name: S,
                source: N,
                canary: M,
                sendMessage: H
              }), I;
            }({
              name: f,
              source: v,
              canary: E,
              sendMessage: w
            });
            return c(m, "postrobot_open_tunnel", {
              name: f,
              sendMessage: function() {
                var P = p.get(b);
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
          send: n
        }), function(u) {
          var c = u.on, l = u.send, f = u.receiveMessage;
          T.try(function() {
            var v = re(window);
            if (v && ri({
              win: v
            })) {
              return ni(v), (E = v, Ye("remoteBridgeAwaiters").getOrSet(E, function() {
                return T.try(function() {
                  var w = Xr(E, Un(Y()));
                  if (w) return te(w) && Rr(Te(w)) ? w : new T(function(p) {
                    var m, b;
                    m = setInterval(function() {
                      if (w && te(w) && Rr(Te(w)))
                        return clearInterval(m), clearTimeout(b), p(w);
                    }, 100), b = setTimeout(function() {
                      return clearInterval(m), p();
                    }, 2e3);
                  });
                });
              })).then(function(w) {
                return w ? window.name ? Rr(Te(w)).openTunnelToParent({
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
                        on: c,
                        send: l
                      });
                    } catch (m) {
                      T.reject(m);
                    }
                  }
                }).then(function(p) {
                  var m = p.source, b = p.origin, P = p.data;
                  if (m !== v) throw new Error("Source does not match opener");
                  oi(m, b, P.sendMessage);
                }).catch(function(p) {
                  throw $n(v, p), p;
                }) : $n(v, new Error("Can not register with opener: window does not have a name")) : $n(v, new Error("Can not register with opener: no bridge found in opener"));
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
      function Hn() {
        for (var e = fe("idToProxyWindow"), t = 0, n = e.keys(); t < n.length; t++) {
          var o = n[t];
          e.get(o).shouldClean() && e.del(o);
        }
      }
      function ai(e, t) {
        var n = t.send, o = t.id, a = o === void 0 ? Qe() : o, u = e.then(function(f) {
          if (te(f)) return Te(f).name;
        }), c = e.then(function(f) {
          if (Se(f)) throw new Error("Window is closed, can not determine type");
          return re(f) ? Ze.POPUP : Ze.IFRAME;
        });
        u.catch(Ee), c.catch(Ee);
        var l = function() {
          return e.then(function(f) {
            if (!Se(f)) return te(f) ? Te(f).name : u;
          });
        };
        return {
          id: a,
          getType: function() {
            return c;
          },
          getInstanceID: Aa(function() {
            return e.then(function(f) {
              return Yo(f, {
                send: n
              });
            });
          }),
          close: function() {
            return e.then(Oo);
          },
          getName: l,
          focus: function() {
            return e.then(function(f) {
              f.focus();
            });
          },
          isClosed: function() {
            return e.then(function(f) {
              return Se(f);
            });
          },
          setLocation: function(f, v) {
            return v === void 0 && (v = {}), e.then(function(E) {
              var w = window.location.protocol + "//" + window.location.host, p = v.method, m = p === void 0 ? "get" : p, b = v.body;
              if (f.indexOf("/") === 0) f = "" + w + f;
              else if (!f.match(/^https?:\/\//) && f.indexOf(w) !== 0) throw new Error("Expected url to be http or https url, or absolute path, got " + JSON.stringify(f));
              if (m === "post") return l().then(function(P) {
                if (!P) throw new Error("Can not post to window without target name");
                (function(S) {
                  var N = S.url, M = S.target, H = S.body, I = S.method, B = I === void 0 ? "post" : I, _ = document.createElement("form");
                  if (_.setAttribute("target", M), _.setAttribute("method", B), _.setAttribute("action", N), _.style.display = "none", H) for (var Z = 0, U = Object.keys(H); Z < U.length; Z++) {
                    var ce, ne = U[Z], V = document.createElement("input");
                    V.setAttribute("name", ne), V.setAttribute("value", (ce = H[ne]) == null ? void 0 : ce.toString()), _.appendChild(V);
                  }
                  No().appendChild(_), _.submit(), No().removeChild(_);
                })({
                  url: f,
                  target: P,
                  method: m,
                  body: b
                });
              });
              if (m !== "get") throw new Error("Unsupported method: " + m);
              if (te(E)) try {
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
              an({
                win: v,
                name: f
              });
              var E = te(v), w = Po(v);
              if (!E) throw new Error("Can not set name for cross-domain window: " + f);
              Te(v).name = f, w && w.setAttribute("name", f), u = T.resolve(f);
            });
          }
        };
      }
      var hr = function() {
        function e(n) {
          var o = n.send, a = n.win, u = n.serializedWindow;
          this.id = void 0, this.isProxyWindow = !0, this.serializedWindow = void 0, this.actualWindow = void 0, this.actualWindowPromise = void 0, this.send = void 0, this.name = void 0, this.actualWindowPromise = new T(), this.serializedWindow = u || ai(this.actualWindowPromise, {
            send: o
          }), fe("idToProxyWindow").set(this.getID(), this), a && this.setWindow(a, {
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
            return n === Ze.POPUP;
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
          var n = this, o = this.isPopup(), a = this.getName(), u = T.hash({
            isPopup: o,
            name: a
          }).then(function(l) {
            var f = l.name;
            l.isPopup && f && window.open("", f, "noopener");
          }), c = this.serializedWindow.focus();
          return T.all([u, c]).then(function() {
            return n;
          });
        }, t.isClosed = function() {
          return this.serializedWindow.isClosed();
        }, t.getWindow = function() {
          return this.actualWindow;
        }, t.setWindow = function(n, o) {
          var a = o.send;
          this.actualWindow = n, this.actualWindowPromise.resolve(this.actualWindow), this.serializedWindow = ai(this.actualWindowPromise, {
            send: a,
            id: this.getID()
          }), Ye("winToProxyWindow").set(n, this);
        }, t.awaitWindow = function() {
          return this.actualWindowPromise;
        }, t.matchWindow = function(n, o) {
          var a = this, u = o.send;
          return T.try(function() {
            return a.actualWindow ? n === a.actualWindow : T.hash({
              proxyInstanceID: a.getInstanceID(),
              knownWindowInstanceID: Yo(n, {
                send: u
              })
            }).then(function(c) {
              var l = c.proxyInstanceID === c.knownWindowInstanceID;
              return l && a.setWindow(n, {
                send: u
              }), l;
            });
          });
        }, t.unwrap = function() {
          return this.actualWindow || this;
        }, t.getInstanceID = function() {
          return this.serializedWindow.getInstanceID();
        }, t.shouldClean = function() {
          return !!(this.actualWindow && Se(this.actualWindow));
        }, t.serialize = function() {
          return this.serializedWindow;
        }, e.unwrap = function(n) {
          return e.isProxyWindow(n) ? n.unwrap() : n;
        }, e.serialize = function(n, o) {
          var a = o.send;
          return Hn(), e.toProxyWindow(n, {
            send: a
          }).serialize();
        }, e.deserialize = function(n, o) {
          var a = o.send;
          return Hn(), fe("idToProxyWindow").get(n.id) || new e({
            serializedWindow: n,
            send: a
          });
        }, e.isProxyWindow = function(n) {
          return !!(n && !kr(n) && n.isProxyWindow);
        }, e.toProxyWindow = function(n, o) {
          var a = o.send;
          if (Hn(), e.isProxyWindow(n)) return n;
          var u = n;
          return Ye("winToProxyWindow").get(u) || new e({
            win: u,
            send: a
          });
        }, e;
      }();
      function qn(e, t, n, o, a) {
        var u = Ye("methodStore"), c = fe("proxyWindowMethods");
        hr.isProxyWindow(o) ? c.set(e, {
          val: t,
          name: n,
          domain: a,
          source: o
        }) : (c.del(e), u.getOrSet(o, function() {
          return {};
        })[e] = {
          domain: a,
          name: n,
          val: t,
          source: o
        });
      }
      function si(e, t) {
        var n = Ye("methodStore"), o = fe("proxyWindowMethods");
        return n.getOrSet(e, function() {
          return {};
        })[t] || o.get(t);
      }
      function ui(e, t, n, o, a) {
        c = (u = {
          on: a.on,
          send: a.send
        }).on, l = u.send, fe("builtinListeners").getOrSet("functionCalls", function() {
          return c("postrobot_method", {
            domain: "*"
          }, function(E) {
            var w = E.source, p = E.origin, m = E.data, b = m.id, P = m.name, S = si(w, b);
            if (!S) throw new Error("Could not find method '" + P + "' with id: " + m.id + " in " + Y(window));
            var N = S.source, M = S.domain, H = S.val;
            return T.try(function() {
              if (!dr(M, p)) throw new Error("Method '" + m.name + "' domain " + JSON.stringify(In(S.domain) ? S.domain.source : S.domain) + " does not match origin " + p + " in " + Y(window));
              if (hr.isProxyWindow(N)) return N.matchWindow(w, {
                send: l
              }).then(function(I) {
                if (!I) throw new Error("Method call '" + m.name + "' failed - proxy window does not match source in " + Y(window));
              });
            }).then(function() {
              return H.apply({
                source: w,
                origin: p
              }, m.args);
            }, function(I) {
              return T.try(function() {
                if (H.onError) return H.onError(I);
              }).then(function() {
                throw I.stack && (I.stack = "Remote call to " + P + "(" + function(B) {
                  return B === void 0 && (B = []), Cn(B).map(function(_) {
                    return typeof _ == "string" ? "'" + _ + "'" : _ === void 0 ? "undefined" : _ === null ? "null" : typeof _ == "boolean" ? _.toString() : Array.isArray(_) ? "[ ... ]" : typeof _ == "object" ? "{ ... }" : typeof _ == "function" ? "() => { ... }" : "<" + typeof _ + ">";
                  }).join(", ");
                }(m.args) + `) failed

` + I.stack), I;
              });
            }).then(function(I) {
              return {
                result: I,
                id: b,
                name: P
              };
            });
          });
        });
        var u, c, l, f = n.__id__ || Qe();
        e = hr.unwrap(e);
        var v = n.__name__ || n.name || o;
        return typeof v == "string" && typeof v.indexOf == "function" && v.indexOf("anonymous::") === 0 && (v = v.replace("anonymous::", o + "::")), hr.isProxyWindow(e) ? (qn(f, n, v, e, t), e.awaitWindow().then(function(E) {
          qn(f, n, v, E, t);
        })) : qn(f, n, v, e, t), et("cross_domain_function", {
          id: f,
          name: v
        });
      }
      function ci(e, t, n, o) {
        var a, u = o.on, c = o.send;
        return function(l, f) {
          f === void 0 && (f = $a);
          var v = JSON.stringify(l, function(E) {
            var w = this[E];
            if (Ln(this)) return w;
            var p = Xo(w);
            if (!p) return w;
            var m = f[p] || Ba[p];
            return m ? m(w, E) : w;
          });
          return v === void 0 ? "undefined" : v;
        }(n, ((a = {}).promise = function(l, f) {
          return function(v, E, w, p, m) {
            return et("cross_domain_zalgo_promise", {
              then: ui(v, E, function(b, P) {
                return w.then(b, P);
              }, p, {
                on: m.on,
                send: m.send
              })
            });
          }(e, t, l, f, {
            on: u,
            send: c
          });
        }, a.function = function(l, f) {
          return ui(e, t, l, f, {
            on: u,
            send: c
          });
        }, a.object = function(l) {
          return kr(l) || hr.isProxyWindow(l) ? et("cross_domain_window", hr.serialize(l, {
            send: c
          })) : l;
        }, a));
      }
      function di(e, t, n, o) {
        var a, u = o.send;
        return function(c, l) {
          if (l === void 0 && (l = qa), c !== "undefined") return JSON.parse(c, function(f, v) {
            if (Ln(this)) return v;
            var E, w;
            if (Ln(v) ? (E = v.__type__, w = v.__val__) : (E = Xo(v), w = v), !E) return w;
            var p = l[E] || Ha[E];
            return p ? p(w, f) : w;
          });
        }(n, ((a = {}).cross_domain_zalgo_promise = function(c) {
          return function(l, f, v) {
            return new T(v.then);
          }(0, 0, c);
        }, a.cross_domain_function = function(c) {
          return function(l, f, v, E) {
            var w = v.id, p = v.name, m = E.send, b = function(S) {
              S === void 0 && (S = {});
              function N() {
                var M = arguments;
                return hr.toProxyWindow(l, {
                  send: m
                }).awaitWindow().then(function(H) {
                  var I = si(H, w);
                  if (I && I.val !== N) return I.val.apply({
                    source: window,
                    origin: Y()
                  }, M);
                  var B = [].slice.call(M);
                  return S.fireAndForget ? m(H, "postrobot_method", {
                    id: w,
                    name: p,
                    args: B
                  }, {
                    domain: f,
                    fireAndForget: !0
                  }) : m(H, "postrobot_method", {
                    id: w,
                    name: p,
                    args: B
                  }, {
                    domain: f,
                    fireAndForget: !1
                  }).then(function(_) {
                    return _.data.result;
                  });
                }).catch(function(H) {
                  throw H;
                });
              }
              return N.__name__ = p, N.__origin__ = f, N.__source__ = l, N.__id__ = w, N.origin = f, N;
            }, P = b();
            return P.fireAndForget = b({
              fireAndForget: !0
            }), P;
          }(e, t, c, {
            send: u
          });
        }, a.cross_domain_window = function(c) {
          return hr.deserialize(c, {
            send: u
          });
        }, a));
      }
      var Nt = {};
      Nt.postrobot_post_message = function(e, t, n) {
        n.indexOf("file:") === 0 && (n = "*"), e.postMessage(t, n);
      }, Nt.postrobot_bridge = function(e, t, n) {
        if (!jn() && !ti()) throw new Error("Bridge not needed for browser");
        if (te(e)) throw new Error("Post message through bridge disabled between same domain windows");
        if (Gt(window, e) !== !1) throw new Error("Can only use bridge to communicate between two different windows, not between frames");
        (function(o, a, u) {
          var c = Eo(window, o), l = Eo(o, window);
          if (!c && !l) throw new Error("Can only send messages to and from parent and popup windows");
          Bn(o).then(function(f) {
            return f(o, a, u);
          });
        })(e, n, t);
      }, Nt.postrobot_global = function(e, t) {
        if (!Vt(window).match(/MSIE|rv:11|trident|edge\/12|edge\/13/i)) throw new Error("Global messaging not needed for browser");
        if (!te(e)) throw new Error("Post message through global disabled between different domain windows");
        if (Gt(window, e) !== !1) throw new Error("Can only use global to communicate between two different windows, not between frames");
        var n = Rr(e);
        if (!n) throw new Error("Can not find postRobot global on foreign window");
        n.receiveMessage({
          source: window,
          origin: Y(),
          data: t
        });
      };
      function Vn(e, t, n, o) {
        var a = o.on, u = o.send;
        return T.try(function() {
          var c = Ye().getOrSet(e, function() {
            return {};
          });
          return c.buffer = c.buffer || [], c.buffer.push(n), c.flush = c.flush || T.flush().then(function() {
            if (Se(e)) throw new Error("Window is closed");
            var l = ci(e, t, ((f = {}).__post_robot_11_0_0__ = c.buffer || [], f), {
              on: a,
              send: u
            }), f;
            delete c.buffer;
            for (var v = Object.keys(Nt), E = [], w = 0; w < v.length; w++) {
              var p = v[w];
              try {
                Nt[p](e, l, t);
              } catch (m) {
                E.push(m);
              }
            }
            if (E.length === v.length) throw new Error(`All post-robot messaging strategies failed:

` + E.map(function(m, b) {
              return b + ". " + dt(m);
            }).join(`

`));
          }), c.flush.then(function() {
            delete c.flush;
          });
        }).then(Ee);
      }
      function fi(e) {
        return fe("responseListeners").get(e);
      }
      function li(e) {
        fe("responseListeners").del(e);
      }
      function hi(e) {
        return fe("erroredResponseListeners").has(e);
      }
      function pi(e) {
        var t = e.name, n = e.win, o = e.domain, a = Ye("requestListeners");
        if (n === "*" && (n = null), o === "*" && (o = null), !t) throw new Error("Name required to get request listener");
        for (var u = 0, c = [n, on()]; u < c.length; u++) {
          var l = c[u];
          if (l) {
            var f = a.get(l);
            if (f) {
              var v = f[t];
              if (v) {
                if (o && typeof o == "string") {
                  if (v[o]) return v[o];
                  if (v.__domain_regex__) for (var E = 0, w = v.__domain_regex__; E < w.length; E++) {
                    var p = w[E], m = p.listener;
                    if (dr(p.regex, o)) return m;
                  }
                }
                if (v["*"]) return v["*"];
              }
            }
          }
        }
      }
      function Gn(e, t) {
        var n = t.on, o = t.send, a = fe("receivedMessages");
        try {
          if (!window || window.closed || !e.source) return;
        } catch {
          return;
        }
        var u = e.source, c = e.origin, l = function(w, p, m, b) {
          var P = b.on, S = b.send, N;
          try {
            N = di(p, m, w, {
              on: P,
              send: S
            });
          } catch {
            return;
          }
          if (N && typeof N == "object" && N !== null) {
            var M = N.__post_robot_11_0_0__;
            if (Array.isArray(M)) return M;
          }
        }(e.data, u, c, {
          on: n,
          send: o
        });
        if (l) {
          Qo(u);
          for (var f, v = function() {
            var w = l[E];
            if (a.has(w.id)) return {
              v: void 0
            };
            if (a.set(w.id, !0), Se(u) && !w.fireAndForget) return {
              v: void 0
            };
            w.origin.indexOf("file:") === 0 && (c = "file://");
            try {
              w.type === "postrobot_message_request" ? function(p, m, b, P) {
                var S = P.on, N = P.send, M = pi({
                  name: b.name,
                  win: p,
                  domain: m
                }), H = b.name === "postrobot_method" && b.data && typeof b.data.name == "string" ? b.data.name + "()" : b.name;
                function I(B, _, Z) {
                  return T.flush().then(function() {
                    if (!b.fireAndForget && !Se(p)) try {
                      return Vn(p, m, {
                        id: Qe(),
                        origin: Y(window),
                        type: "postrobot_message_response",
                        hash: b.hash,
                        name: b.name,
                        ack: B,
                        data: _,
                        error: Z
                      }, {
                        on: S,
                        send: N
                      });
                    } catch (U) {
                      throw new Error("Send response message failed for " + H + " in " + Y() + `

` + dt(U));
                    }
                  });
                }
                T.all([T.flush().then(function() {
                  if (!b.fireAndForget && !Se(p)) try {
                    return Vn(p, m, {
                      id: Qe(),
                      origin: Y(window),
                      type: "postrobot_message_ack",
                      hash: b.hash,
                      name: b.name
                    }, {
                      on: S,
                      send: N
                    });
                  } catch (B) {
                    throw new Error("Send ack message failed for " + H + " in " + Y() + `

` + dt(B));
                  }
                }), T.try(function() {
                  if (!M) throw new Error("No handler found for post message: " + b.name + " from " + m + " in " + window.location.protocol + "//" + window.location.host + window.location.pathname);
                  return M.handler({
                    source: p,
                    origin: m,
                    data: b.data
                  });
                }).then(function(B) {
                  return I("success", B);
                }, function(B) {
                  return I("error", null, B);
                })]).then(Ee).catch(function(B) {
                  if (M && M.handleError) return M.handleError(B);
                  throw B;
                });
              }(u, c, w, {
                on: n,
                send: o
              }) : w.type === "postrobot_message_response" ? function(p, m, b) {
                if (!hi(b.hash)) {
                  var P = fi(b.hash);
                  if (!P) throw new Error("No handler found for post message response for message: " + b.name + " from " + m + " in " + window.location.protocol + "//" + window.location.host + window.location.pathname);
                  if (!dr(P.domain, m)) throw new Error("Response origin " + m + " does not match domain " + (S = P.domain, Array.isArray(S) ? "(" + S.join(" | ") + ")" : ve(S) ? "RegExp(" + S.toString() + ")" : S.toString()));
                  var S;
                  if (p !== P.win) throw new Error("Response source does not match registered window");
                  li(b.hash), b.ack === "error" ? P.promise.reject(b.error) : b.ack === "success" && P.promise.resolve({
                    source: p,
                    origin: m,
                    data: b.data
                  });
                }
              }(u, c, w) : w.type === "postrobot_message_ack" && function(p, m, b) {
                if (!hi(b.hash)) {
                  var P = fi(b.hash);
                  if (!P) throw new Error("No handler found for post message ack for message: " + b.name + " from " + m + " in " + window.location.protocol + "//" + window.location.host + window.location.pathname);
                  try {
                    if (!dr(P.domain, m)) throw new Error("Ack origin " + m + " does not match domain " + P.domain.toString());
                    if (p !== P.win) throw new Error("Ack source does not match registered window");
                  } catch (S) {
                    P.promise.reject(S);
                  }
                  P.ack = !0;
                }
              }(u, c, w);
            } catch (p) {
              setTimeout(function() {
                throw p;
              }, 0);
            }
          }, E = 0; E < l.length; E++) if (f = v()) return f.v;
        }
      }
      function Nr(e, t, n) {
        if (!e) throw new Error("Expected name");
        if (typeof (t = t || {}) == "function" && (n = t, t = {}), !n) throw new Error("Expected handler");
        var o = function a(u, c) {
          var l = u.name, f = u.win, v = u.domain, E = Ye("requestListeners");
          if (!l || typeof l != "string") throw new Error("Name required to add request listener");
          if (f && f !== "*" && hr.isProxyWindow(f)) {
            var w = f.awaitWindow().then(function(ce) {
              return a({
                name: l,
                win: ce,
                domain: v
              }, c);
            });
            return {
              cancel: function() {
                w.then(function(ce) {
                  return ce.cancel();
                }, Ee);
              }
            };
          }
          var p = f;
          if (Array.isArray(p)) {
            for (var m = [], b = 0, P = p; b < P.length; b++) m.push(a({
              name: l,
              domain: v,
              win: P[b]
            }, c));
            return {
              cancel: function() {
                for (var ce = 0; ce < m.length; ce++) m[ce].cancel();
              }
            };
          }
          if (Array.isArray(v)) {
            for (var S = [], N = 0, M = v; N < M.length; N++) S.push(a({
              name: l,
              win: p,
              domain: M[N]
            }, c));
            return {
              cancel: function() {
                for (var ce = 0; ce < S.length; ce++) S[ce].cancel();
              }
            };
          }
          var H = pi({
            name: l,
            win: p,
            domain: v
          });
          p && p !== "*" || (p = on());
          var I = (v = v || "*").toString();
          if (H) throw p && v ? new Error("Request listener already exists for " + l + " on domain " + v.toString() + " for " + (p === on() ? "wildcard" : "specified") + " window") : p ? new Error("Request listener already exists for " + l + " for " + (p === on() ? "wildcard" : "specified") + " window") : v ? new Error("Request listener already exists for " + l + " on domain " + v.toString()) : new Error("Request listener already exists for " + l);
          var B = E.getOrSet(p, function() {
            return {};
          }), _ = Dt(B, l, function() {
            return {};
          }), Z, U;
          return In(v) ? (Z = Dt(_, "__domain_regex__", function() {
            return [];
          })).push(U = {
            regex: v,
            listener: c
          }) : _[I] = c, {
            cancel: function() {
              delete _[I], U && (Z.splice(Z.indexOf(U, 1)), Z.length || delete _.__domain_regex__), Object.keys(_).length || delete B[l], p && !Object.keys(B).length && E.del(p);
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
      var yr = function e(t, n, o, a) {
        var u = (a = a || {}).domain || "*", c = a.timeout || -1, l = a.timeout || 5e3, f = a.fireAndForget || !1;
        return hr.toProxyWindow(t, {
          send: e
        }).awaitWindow().then(function(v) {
          return T.try(function() {
            if (function(E, w, p) {
              if (!E) throw new Error("Expected name");
              if (p && typeof p != "string" && !Array.isArray(p) && !In(p)) throw new TypeError("Can not send " + E + ". Expected domain " + JSON.stringify(p) + " to be a string, array, or regex");
              if (Se(w)) throw new Error("Can not send " + E + ". Target window is closed");
            }(n, v, u), function(E, w) {
              var p = Rt(w);
              if (p) return p === E;
              if (w === E || Zr(w) === w) return !1;
              for (var m = 0, b = ke(E); m < b.length; m++) if (b[m] === w) return !0;
              return !1;
            }(window, v)) return Zo(v, l);
          }).then(function(E) {
            return function(w, p, m, b) {
              var P = b.send;
              return T.try(function() {
                return typeof p == "string" ? p : T.try(function() {
                  return m || zn(w, {
                    send: P
                  }).then(function(S) {
                    return S.domain;
                  });
                }).then(function(S) {
                  if (!dr(p, p)) throw new Error("Domain " + Qt(p) + " does not match " + Qt(p));
                  return S;
                });
              });
            }(v, u, (E === void 0 ? {} : E).domain, {
              send: e
            });
          }).then(function(E) {
            var w = E, p = n === "postrobot_method" && o && typeof o.name == "string" ? o.name + "()" : n, m = new T(), b = n + "_" + Qe();
            if (!f) {
              var P = {
                name: n,
                win: v,
                domain: w,
                promise: m
              };
              (function(_, Z) {
                fe("responseListeners").set(_, Z);
              })(b, P);
              var S = Ye("requestPromises").getOrSet(v, function() {
                return [];
              });
              S.push(m), m.catch(function() {
                (function(_) {
                  fe("erroredResponseListeners").set(_, !0);
                })(b), li(b);
              });
              var N = function(_) {
                return Ye("knownWindows").get(_, !1);
              }(v) ? 1e4 : 2e3, M = c, H = N, I = M, B = xt(function() {
                return Se(v) ? m.reject(new Error("Window closed for " + n + " before " + (P.ack ? "response" : "ack"))) : P.cancelled ? m.reject(new Error("Response listener was cancelled for " + n)) : (H = Math.max(H - 500, 0), I !== -1 && (I = Math.max(I - 500, 0)), P.ack || H !== 0 ? I === 0 ? m.reject(new Error("No response for postMessage " + p + " in " + Y() + " in " + M + "ms")) : void 0 : m.reject(new Error("No ack for postMessage " + p + " in " + Y() + " in " + N + "ms")));
              }, 500);
              m.finally(function() {
                B.cancel(), S.splice(S.indexOf(m, 1));
              }).catch(Ee);
            }
            return Vn(v, w, {
              id: Qe(),
              origin: Y(window),
              type: "postrobot_message_request",
              hash: b,
              name: n,
              data: o,
              fireAndForget: f
            }, {
              on: Nr,
              send: e
            }).then(function() {
              return f ? m.resolve() : m;
            }, function(_) {
              throw new Error("Send request message failed for " + p + " in " + Y() + `

` + dt(_));
            });
          });
        });
      };
      function It(e) {
        return hr.toProxyWindow(e, {
          send: yr
        });
      }
      function vi(e) {
        for (var t = 0, n = Ye("requestPromises").get(e, []); t < n.length; t++) n[t].reject(new Error("Window " + (Se(e) ? "closed" : "cleaned up") + " before response")).catch(Ee);
      }
      var Lr;
      Lr = {
        setupBridge: ii,
        openBridge: function(e, t) {
          var n = fe("bridges"), o = fe("bridgeFrames");
          return t = t || Cr(e), n.getOrSet(t, function() {
            return T.try(function() {
              if (Y() === t) throw new Error("Can not open bridge on the same domain as current domain: " + t);
              var a = Un(t);
              if (Xr(window, a)) throw new Error("Frame with name " + a + " already exists on page");
              var u = function(c, l) {
                var f = document.createElement("iframe");
                return f.setAttribute("name", c), f.setAttribute("id", c), f.setAttribute("style", "display: none; margin: 0; padding: 0; border: 0px none; overflow: hidden;"), f.setAttribute("frameborder", "0"), f.setAttribute("border", "0"), f.setAttribute("scrolling", "no"), f.setAttribute("allowTransparency", "true"), f.setAttribute("tabindex", "-1"), f.setAttribute("hidden", "true"), f.setAttribute("title", ""), f.setAttribute("role", "presentation"), f.src = l, f;
              }(a, e);
              return o.set(t, u), Va.then(function(c) {
                c.appendChild(u);
                var l = u.contentWindow;
                return new T(function(f, v) {
                  u.addEventListener("load", f), u.addEventListener("error", v);
                }).then(function() {
                  return Zo(l, 5e3, "Bridge " + e);
                }).then(function() {
                  return l;
                });
              });
            });
          });
        },
        linkWindow: an,
        linkUrl: function(e, t) {
          an({
            win: e,
            domain: Cr(t)
          });
        },
        isBridge: ti,
        needsBridge: ri,
        needsBridgeForBrowser: jn,
        hasBridge: function(e, t) {
          return fe("bridges").has(t || Cr(e));
        },
        needsBridgeForWin: ko,
        needsBridgeForDomain: ei,
        destroyBridges: function() {
          for (var e = fe("bridges"), t = fe("bridgeFrames"), n = 0, o = t.keys(); n < o.length; n++) {
            var a = t.get(o[n]);
            a && a.parentNode && a.parentNode.removeChild(a);
          }
          t.reset(), e.reset();
        }
      };
      function Wt(e) {
        if (!te(e)) throw new Error("Can not get global for window on different domain");
        return e.__zoid_10_3_3__ || (e.__zoid_10_3_3__ = {}), e.__zoid_10_3_3__;
      }
      function wi(e, t) {
        try {
          return t(Wt(e));
        } catch {
        }
      }
      function sn(e) {
        return {
          get: function() {
            var t = this;
            return T.try(function() {
              if (t.source && t.source !== window) throw new Error("Can not call get on proxy object from a remote window");
              return e;
            });
          }
        };
      }
      function Ga(e) {
        return Sn(JSON.stringify(e));
      }
      function Jn(e) {
        var t = Wt(e);
        return t.references = t.references || {}, t.references;
      }
      function mi(e) {
        var t = e.data, n = e.metaData, o = e.sender, a = e.receiver, u = e.passByReference, c = u !== void 0 && u, l = e.basic, f = l !== void 0 && l, v = It(a.win), E = f ? JSON.stringify(t) : ci(v, a.domain, t, {
          on: Nr,
          send: yr
        }), w = c ? function(p) {
          var m = Qe();
          return Jn(window)[m] = p, {
            type: "uid",
            uid: m
          };
        }(E) : {
          type: "raw",
          val: E
        };
        return {
          serializedData: Ga({
            sender: {
              domain: o.domain
            },
            metaData: n,
            reference: w
          }),
          cleanReference: function() {
            p = window, (m = w).type === "uid" && delete Jn(p)[m.uid];
            var p, m;
          }
        };
      }
      function gi(e) {
        var t = e.sender, n = e.basic, o = n !== void 0 && n, a = function(E) {
          return JSON.parse(function(w) {
            if (typeof atob == "function") return decodeURIComponent([].map.call(atob(w), function(p) {
              return "%" + ("00" + p.charCodeAt(0).toString(16)).slice(-2);
            }).join(""));
            if (typeof Buffer < "u") return Buffer.from(w, "base64").toString("utf8");
            throw new Error("Can not find window.atob or Buffer");
          }(E));
        }(e.data), u = a.reference, c = a.metaData, l;
        l = typeof t.win == "function" ? t.win({
          metaData: c
        }) : t.win;
        var f;
        f = typeof t.domain == "function" ? t.domain({
          metaData: c
        }) : typeof t.domain == "string" ? t.domain : a.sender.domain;
        var v = function(E, w) {
          if (w.type === "raw") return w.val;
          if (w.type === "uid") return Jn(E)[w.uid];
          throw new Error("Unsupported ref type: " + w.type);
        }(l, u);
        return {
          data: o ? JSON.parse(v) : function(E, w, p) {
            return di(E, w, p, {
              on: Nr,
              send: yr
            });
          }(l, f, v),
          metaData: c,
          sender: {
            win: l,
            domain: f
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
      }, un = {
        JSON: "json",
        DOTIFY: "dotify",
        BASE64: "base64"
      }, xe = Ze, be = {
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
      function yi(e) {
        return "__zoid__" + e.name + "__" + e.serializedPayload + "__";
      }
      function Kn(e) {
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
      var Ja = Fr(function(e) {
        var t = gi({
          data: Kn(e).serializedInitialPayload,
          sender: {
            win: function(n) {
              return function(o) {
                if (o.type === "opener") return en("opener", re(window));
                if (o.type === "parent" && typeof o.distance == "number") return en("parent", function(w, p) {
                  return p === void 0 && (p = 1), function(m, b) {
                    b === void 0 && (b = 1);
                    for (var P = m, S = 0; S < b; S++) {
                      if (!P) return;
                      P = ie(P);
                    }
                    return P;
                  }(w, bn(w) - p);
                }(window, o.distance));
                if (o.type === "global" && o.uid && typeof o.uid == "string") {
                  var a = o.uid, u = Rt(window);
                  if (!u) throw new Error("Can not find ancestor window");
                  for (var c = 0, l = Tr(u); c < l.length; c++) {
                    var f = l[c];
                    if (te(f)) {
                      var v = wi(f, function(w) {
                        return w.windows && w.windows[a];
                      });
                      if (v) return v;
                    }
                  }
                } else if (o.type === "name") {
                  var E = o.name;
                  return en("namedWindow", function(w, p) {
                    return Xr(w, p) || function m(b, P) {
                      var S = Xr(b, P);
                      if (S) return S;
                      for (var N = 0, M = ke(b); N < M.length; N++) {
                        var H = m(M[N], P);
                        if (H) return H;
                      }
                    }(Zr(w) || w, p);
                  }(en("ancestor", Rt(window)), E));
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
      function Ei() {
        return Ja(window.name);
      }
      function Ka(e, t) {
        if (t === void 0 && (t = window), e === ie(t)) return {
          type: "parent",
          distance: bn(e)
        };
        if (e === re(t)) return {
          type: "opener"
        };
        if (te(e) && (o = e, o !== Zr(o))) {
          var n = Te(e).name;
          if (n) return {
            type: "name",
            name: n
          };
        }
        var o;
      }
      function bi(e, t, n, o, a) {
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
      function Ya() {
        return T.try(function() {
          window.focus();
        });
      }
      function Pi() {
        return T.try(function() {
          window.close();
        });
      }
      var Ir = function() {
        return Ee;
      }, rt = function(e) {
        return Zt(e.value);
      };
      function Yn(e, t, n) {
        for (var o = 0, a = Object.keys(O({}, e, t)); o < a.length; o++) {
          var u = a[o];
          n(u, t[u], e[u]);
        }
      }
      function Oi(e, t, n) {
        var o = {};
        return T.all(function(a, u, c) {
          var l = [];
          return Yn(a, u, function(f, v, E) {
            var w = function(p, m, b) {
              return T.resolve().then(function() {
                var P, S;
                if (b != null && m) {
                  var N = (P = {}, P.get = m.queryParam, P.post = m.bodyParam, P)[n], M = (S = {}, S.get = m.queryValue, S.post = m.bodyValue, S)[n];
                  if (N) return T.hash({
                    finalParam: T.try(function() {
                      return typeof N == "function" ? N({
                        value: b
                      }) : typeof N == "string" ? N : p;
                    }),
                    finalValue: T.try(function() {
                      return typeof M == "function" && zr(b) ? M({
                        value: b
                      }) : b;
                    })
                  }).then(function(H) {
                    var I = H.finalParam, B = H.finalValue, _;
                    if (typeof B == "boolean") _ = B.toString();
                    else if (typeof B == "string") _ = B.toString();
                    else if (typeof B == "object" && B !== null) {
                      if (m.serialization === un.JSON) _ = JSON.stringify(B);
                      else if (m.serialization === un.BASE64) _ = Sn(JSON.stringify(B));
                      else if (m.serialization === un.DOTIFY || !m.serialization) {
                        _ = function ne(V, $, ue) {
                          $ === void 0 && ($ = ""), ue === void 0 && (ue = {}), $ = $ && $ + ".";
                          for (var Q in V) V.hasOwnProperty(Q) && V[Q] != null && typeof V[Q] != "function" && (V[Q] && Array.isArray(V[Q]) && V[Q].length && V[Q].every(function(De) {
                            return typeof De != "object";
                          }) ? ue["" + $ + Q + "[]"] = V[Q].join(",") : V[Q] && typeof V[Q] == "object" ? ue = ne(V[Q], "" + $ + Q, ue) : ue["" + $ + Q] = V[Q].toString());
                          return ue;
                        }(B, p);
                        for (var Z = 0, U = Object.keys(_); Z < U.length; Z++) {
                          var ce = U[Z];
                          o[ce] = _[ce];
                        }
                        return;
                      }
                    } else typeof B == "number" && (_ = B.toString());
                    o[I] = _;
                  });
                }
              });
            }(f, v, E);
            l.push(w);
          }), l;
        }(t, e)).then(function() {
          return o;
        });
      }
      function Ti(e) {
        var t = e.uid, n = e.options, o = e.overrides, a = o === void 0 ? {} : o, u = e.parentWin, c = u === void 0 ? window : u, l = n.propsDef, f = n.containerTemplate, v = n.prerenderTemplate, E = n.tag, w = n.name, p = n.attributes, m = n.dimensions, b = n.autoResize, P = n.url, S = n.domain, N = n.exports, M = new T(), H = [], I = kt(), B = {}, _ = {}, Z = {
          visible: !0
        }, U = a.event ? a.event : (ce = {}, ne = {}, V = {
          on: function(x, D) {
            var j = ne[x] = ne[x] || [];
            j.push(D);
            var L = !1;
            return {
              cancel: function() {
                L || (L = !0, j.splice(j.indexOf(D), 1));
              }
            };
          },
          once: function(x, D) {
            var j = V.on(x, function() {
              j.cancel(), D();
            });
            return j;
          },
          trigger: function(x) {
            for (var D = arguments.length, j = new Array(D > 1 ? D - 1 : 0), L = 1; L < D; L++) j[L - 1] = arguments[L];
            var k = ne[x], G = [];
            if (k)
              for (var me = function() {
                var je = k[ge];
                G.push(T.try(function() {
                  return je.apply(void 0, j);
                }));
              }, ge = 0; ge < k.length; ge++) me();
            return T.all(G).then(Ee);
          },
          triggerOnce: function(x) {
            if (ce[x]) return T.resolve();
            ce[x] = !0;
            for (var D = arguments.length, j = new Array(D > 1 ? D - 1 : 0), L = 1; L < D; L++) j[L - 1] = arguments[L];
            return V.trigger.apply(V, [x].concat(j));
          },
          reset: function() {
            ne = {};
          }
        }), ce, ne, V, $ = a.props ? a.props : {}, ue, Q, De, Sr, pr, jr = !1, Ur = a.onError, Wr = a.getProxyContainer, Br = a.show, $r = a.hide, tt = a.close, Hr = a.renderContainer, Er = a.getProxyWindow, nt = a.setProxyWin, qr = a.openFrame, Vr = a.openPrerenderFrame, ot = a.prerender, it = a.open, oe = a.openPrerender, vr = a.watchForUnload, ae = a.getInternalState, ze = a.setInternalState, Ce = function() {
          return typeof m == "function" ? m({
            props: $
          }) : m;
        }, Le = function() {
          return T.try(function() {
            return a.resolveInitPromise ? a.resolveInitPromise() : M.resolve();
          });
        }, Re = function(x) {
          return T.try(function() {
            return a.rejectInitPromise ? a.rejectInitPromise(x) : M.reject(x);
          });
        }, Xe = function(x) {
          for (var D = {}, j = 0, L = Object.keys($); j < L.length; j++) {
            var k = L[j], G = l[k];
            if (!G || G.sendToChild !== !1) {
              var me = G && G.trustedDomains && G.trustedDomains.length > 0 ? G.trustedDomains.reduce(function(ge, je) {
                return ge || dr(je, x);
              }, !1) : dr(x, Y(window));
              G && G.sameDomain && !me || G && G.trustedDomains && !me || (D[k] = $[k]);
            }
          }
          return T.hash(D);
        }, Me = function() {
          return T.try(function() {
            return ae ? ae() : Z;
          });
        }, _e = function(x) {
          return T.try(function() {
            return ze ? ze(x) : Z = O({}, Z, x);
          });
        }, wr = function() {
          return Er ? Er() : T.try(function() {
            var x = $.window;
            if (x) {
              var D = It(x);
              return I.register(function() {
                return x.close();
              }), D;
            }
            return new hr({
              send: yr
            });
          });
        }, rr = function(x) {
          return nt ? nt(x) : T.try(function() {
            ue = x;
          });
        }, br = function() {
          return Br ? Br() : T.hash({
            setState: _e({
              visible: !0
            }),
            showElement: Q ? Q.get().then(za) : null
          }).then(Ee);
        }, Ar = function() {
          return $r ? $r() : T.hash({
            setState: _e({
              visible: !1
            }),
            showElement: Q ? Q.get().then(jo) : null
          }).then(Ee);
        }, ht = function() {
          return typeof P == "function" ? P({
            props: $
          }) : P;
        }, pt = function() {
          return typeof p == "function" ? p({
            props: $
          }) : p;
        }, at = function() {
          return Cr(ht());
        }, tr = function(x, D) {
          var j = D.windowName;
          return qr ? qr(x, {
            windowName: j
          }) : T.try(function() {
            if (x === xe.IFRAME) return sn(zo({
              attributes: O({
                name: j,
                title: w
              }, pt().iframe)
            }));
          });
        }, At = function(x) {
          return Vr ? Vr(x) : T.try(function() {
            if (x === xe.IFRAME) return sn(zo({
              attributes: O({
                name: "__zoid_prerender_frame__" + w + "_" + Qe() + "__",
                title: "prerender__" + w
              }, pt().iframe)
            }));
          });
        }, Mt = function(x, D, j) {
          return oe ? oe(x, D, j) : T.try(function() {
            if (x === xe.IFRAME) {
              if (!j) throw new Error("Expected proxy frame to be passed");
              return j.get().then(function(L) {
                return I.register(function() {
                  return Ct(L);
                }), Mn(L).then(function(k) {
                  return Te(k);
                }).then(function(k) {
                  return It(k);
                });
              });
            }
            if (x === xe.POPUP) return D;
            throw new Error("No render context available for " + x);
          });
        }, vt = function() {
          return T.try(function() {
            if (ue) return T.all([U.trigger(be.FOCUS), ue.focus()]).then(Ee);
          });
        }, cn = function() {
          var x = Wt(window);
          return x.windows = x.windows || {}, x.windows[t] = window, I.register(function() {
            delete x.windows[t];
          }), t;
        }, _t = function(x, D, j, L) {
          if (D === Y(window)) return {
            type: "global",
            uid: cn()
          };
          if (x !== window) throw new Error("Can not construct cross-domain window reference for different target window");
          if ($.window) {
            var k = L.getWindow();
            if (!k) throw new Error("Can not construct cross-domain window reference for lazy window prop");
            if (Rt(k) !== window) throw new Error("Can not construct cross-domain window reference for window prop with different ancestor");
          }
          if (j === xe.POPUP) return {
            type: "opener"
          };
          if (j === xe.IFRAME) return {
            type: "parent",
            distance: bn(window)
          };
          throw new Error("Can not construct window reference for child");
        }, dn = function(x, D) {
          return T.try(function() {
            var j;
            Sr = x, De = D, (j = ue) == null || j.isPopup().then(function(L) {
              if ((D == null ? void 0 : D.name) !== "" && L) {
                var k;
                (k = ue) == null || k.setName(D == null ? void 0 : D.name);
              }
            }).finally(function() {
              Le(), I.register(function() {
                return D.close.fireAndForget().catch(Ee);
              });
            });
          });
        }, Ft = function(x) {
          var D = x.width, j = x.height;
          return T.try(function() {
            U.trigger(be.RESIZE, {
              width: D,
              height: j
            });
          });
        }, zt = function(x) {
          return T.try(function() {
            return U.trigger(be.DESTROY);
          }).catch(Ee).then(function() {
            return I.all(x);
          }).then(function() {
            var D = x || new Error("Component destroyed");
            pr && lt(pr) || D.message === "Window navigated away" ? M.resolve() : M.asyncReject(D);
          });
        }, Mr = Fr(function(x) {
          return T.try(function() {
            return tt ? Se(tt.__source__) ? void 0 : tt() : T.try(function() {
              return U.trigger(be.CLOSE);
            }).then(function() {
              return zt(x || new Error("Component closed"));
            });
          });
        }), xi = function(x, D) {
          var j = D.proxyWin, L = D.proxyFrame, k = D.windowName;
          return it ? it(x, {
            proxyWin: j,
            proxyFrame: L,
            windowName: k
          }) : T.try(function() {
            if (x === xe.IFRAME) {
              if (!L) throw new Error("Expected proxy frame to be passed");
              return L.get().then(function(Ne) {
                return Mn(Ne).then(function(le) {
                  return I.register(function() {
                    return Ct(Ne);
                  }), I.register(function() {
                    return vi(le);
                  }), le;
                });
              });
            }
            if (x === xe.POPUP) {
              var G = Ce(), me = G.width, ge = me === void 0 ? "300px" : me, je = G.height, Pe = je === void 0 ? "150px" : je;
              ge = qo(ge, window.outerWidth), Pe = qo(Pe, window.outerWidth);
              var Fe = function(Ne, le) {
                var Ie = (le = le || {}).closeOnUnload, Oe = Ie === void 0 ? 1 : Ie, nr = le.name, Ue = nr === void 0 ? "" : nr, de = le.width, Be = le.height, er = 0, Ve = 0;
                de && (window.outerWidth ? Ve = Math.round((window.outerWidth - de) / 2) + window.screenX : window.screen.width && (Ve = Math.round((window.screen.width - de) / 2))), Be && (window.outerHeight ? er = Math.round((window.outerHeight - Be) / 2) + window.screenY : window.screen.height && (er = Math.round((window.screen.height - Be) / 2))), delete le.closeOnUnload, delete le.name, de && Be && (le = O({
                  top: er,
                  left: Ve,
                  width: de,
                  height: Be,
                  status: 1,
                  toolbar: 0,
                  menubar: 0,
                  resizable: 1,
                  scrollbars: 1
                }, le));
                var st = Object.keys(le).map(function(xr) {
                  if (le[xr] != null) return xr + "=" + Qt(le[xr]);
                }).filter(Boolean).join(","), mr;
                try {
                  mr = window.open("", Ue, st);
                } catch (xr) {
                  throw new An("Can not open popup window - " + (xr.stack || xr.message));
                }
                if (Se(mr))
                  throw new An("Can not open popup window - blocked");
                return Oe && window.addEventListener("unload", function() {
                  return mr.close();
                }), mr;
              }(0, O({
                name: k,
                width: ge,
                height: Pe
              }, pt().popup));
              return I.register(function() {
                return Oo(Fe);
              }), I.register(function() {
                return vi(Fe);
              }), Fe;
            }
            throw new Error("No render context available for " + x);
          }).then(function(G) {
            return j.setWindow(G, {
              send: yr
            }), j.setName(k).then(function() {
              return j;
            });
          });
        }, Di = function() {
          return T.try(function() {
            var x = Lo(window, "unload", Zt(function() {
              zt(new Error("Window navigated away"));
            })), D = bo(c, zt, 3e3);
            if (I.register(D.cancel), I.register(x.cancel), vr) return vr();
          });
        }, Ci = function(x) {
          var D = !1;
          return x.isClosed().then(function(j) {
            return j ? (D = !0, Mr(new Error("Detected component window close"))) : T.delay(200).then(function() {
              return x.isClosed();
            }).then(function(L) {
              if (L)
                return D = !0, Mr(new Error("Detected component window close"));
            });
          }).then(function() {
            return D;
          });
        }, Lt = function(x) {
          return Ur ? Ur(x) : T.try(function() {
            if (H.indexOf(x) === -1)
              return H.push(x), M.asyncReject(x), U.trigger(be.ERROR, x);
          });
        }, Ni = new T(), Ii = function(x) {
          return T.try(function() {
            Ni.resolve(x);
          });
        };
        dn.onError = Lt;
        var Wi = function(x, D) {
          return x({
            uid: t,
            container: D.container,
            context: D.context,
            doc: D.doc,
            frame: D.frame,
            prerenderFrame: D.prerenderFrame,
            focus: vt,
            close: Mr,
            state: B,
            props: $,
            tag: E,
            dimensions: Ce(),
            event: U
          });
        }, Ai = function(x, D) {
          var j = D.context;
          return ot ? ot(x, {
            context: j
          }) : T.try(function() {
            if (v) {
              U.trigger(be.PRERENDER);
              var L = x.getWindow();
              if (L && te(L) && function(Ie) {
                try {
                  if (!Ie.location.href || Ie.location.href === "about:blank") return !0;
                } catch {
                }
                return !1;
              }(L)) {
                var k = (L = Te(L)).document, G = Wi(v, {
                  context: j,
                  doc: k
                });
                if (G) {
                  if (G.ownerDocument !== k) throw new Error("Expected prerender template to have been created with document from child window");
                  (function(Ie, Oe) {
                    var nr = Oe.tagName.toLowerCase();
                    if (nr !== "html") throw new Error("Expected element to be html, got " + nr);
                    for (var Ue = Ie.document.documentElement, de = 0, Be = Cn(Ue.children); de < Be.length; de++) Ue.removeChild(Be[de]);
                    for (var er = 0, Ve = Cn(Oe.children); er < Ve.length; er++) Ue.appendChild(Ve[er]);
                  })(L, G);
                  var me = b.width, ge = me !== void 0 && me, je = b.height, Pe = je !== void 0 && je, Fe = b.element, Ne = Fe === void 0 ? "body" : Fe;
                  if ((Ne = Wn(Ne, k)) && (ge || Pe)) {
                    var le = Uo(Ne, function(Ie) {
                      Ft({
                        width: ge ? Ie.width : void 0,
                        height: Pe ? Ie.height : void 0
                      });
                    }, {
                      width: ge,
                      height: Pe,
                      win: L
                    });
                    U.on(be.RENDERED, le.cancel);
                  }
                  U.trigger(be.PRERENDERED);
                }
              }
            }
          });
        }, Mi = function(x, D) {
          var j = D.proxyFrame, L = D.proxyPrerenderFrame, k = D.context, G = D.rerender;
          return Hr ? Hr(x, {
            proxyFrame: j,
            proxyPrerenderFrame: L,
            context: k,
            rerender: G
          }) : T.hash({
            container: x.get(),
            frame: j ? j.get() : null,
            prerenderFrame: L ? L.get() : null,
            internalState: Me()
          }).then(function(me) {
            var ge = me.container, je = me.internalState.visible, Pe = Wi(f, {
              context: k,
              container: ge,
              frame: me.frame,
              prerenderFrame: me.prerenderFrame,
              doc: document
            });
            if (Pe) {
              je || jo(Pe), Fa(ge, Pe);
              var Fe = function(Ne, le) {
                le = Zt(le);
                var Ie = !1, Oe = [], nr, Ue, de, Be = function() {
                  Ie = !0;
                  for (var mr = 0; mr < Oe.length; mr++) Oe[mr].disconnect();
                  nr && nr.cancel(), de && de.removeEventListener("unload", er), Ue && Ct(Ue);
                }, er = function() {
                  Ie || (le(), Be());
                };
                if (lt(Ne))
                  return er(), {
                    cancel: Be
                  };
                if (window.MutationObserver)
                  for (var Ve = Ne.parentElement; Ve; ) {
                    var st = new window.MutationObserver(function() {
                      lt(Ne) && er();
                    });
                    st.observe(Ve, {
                      childList: !0
                    }), Oe.push(st), Ve = Ve.parentElement;
                  }
                return (Ue = document.createElement("iframe")).setAttribute("name", "__detect_close_" + Qe() + "__"), Ue.style.display = "none", Mn(Ue).then(function(mr) {
                  (de = Te(mr)).addEventListener("unload", er);
                }), Ne.appendChild(Ue), nr = xt(function() {
                  lt(Ne) && er();
                }, 1e3), {
                  cancel: Be
                };
              }(Pe, function() {
                var Ne = new Error("Detected container element removed from DOM");
                return T.delay(1).then(function() {
                  if (!lt(Pe))
                    return I.all(Ne), G().then(Le, Re);
                  Mr(Ne);
                });
              });
              return I.register(function() {
                return Fe.cancel();
              }), I.register(function() {
                return Ct(Pe);
              }), Q = sn(Pe);
            }
          });
        }, _i = function() {
          return {
            state: B,
            event: U,
            close: Mr,
            focus: vt,
            resize: Ft,
            onError: Lt,
            updateProps: as,
            show: br,
            hide: Ar
          };
        }, Xn = function(x) {
          x === void 0 && (x = {});
          var D = pr, j = _i();
          ft(_, x), function(L, k, G, me, ge) {
            var je = me.state, Pe = me.close, Fe = me.focus, Ne = me.event, le = me.onError;
            Yn(G, L, function(Ie, Oe, nr) {
              var Ue = !1, de = nr;
              Object.defineProperty(k, Ie, {
                configurable: !0,
                enumerable: !0,
                get: function() {
                  return Ue ? de : (Ue = !0, function() {
                    if (!Oe) return de;
                    var Be = Oe.alias;
                    if (Be && !zr(nr) && zr(G[Be]) && (de = G[Be]), Oe.value && (de = Oe.value({
                      props: k,
                      state: je,
                      close: Pe,
                      focus: Fe,
                      event: Ne,
                      onError: le,
                      container: ge
                    })), !Oe.default || zr(de) || zr(G[Ie]) || (de = Oe.default({
                      props: k,
                      state: je,
                      close: Pe,
                      focus: Fe,
                      event: Ne,
                      onError: le,
                      container: ge
                    })), zr(de)) {
                      if (Oe.type === we.ARRAY ? !Array.isArray(de) : typeof de !== Oe.type) throw new TypeError("Prop is not of type " + Oe.type + ": " + Ie);
                    } else if (Oe.required !== !1 && !zr(G[Ie])) throw new Error('Expected prop "' + Ie + '" to be defined');
                    return zr(de) && Oe.decorate && (de = Oe.decorate({
                      value: de,
                      props: k,
                      state: je,
                      close: Pe,
                      focus: Fe,
                      event: Ne,
                      onError: le,
                      container: ge
                    })), de;
                  }());
                }
              });
            }), Yn(k, L, Ee);
          }(l, $, _, j, D);
        }, as = function(x) {
          return Xn(x), M.then(function() {
            var D = De, j = ue;
            if (D && j && Sr) return Xe(Sr).then(function(L) {
              return D.updateProps(L).catch(function(k) {
                return Ci(j).then(function(G) {
                  if (!G) throw k;
                });
              });
            });
          });
        }, Fi = function(x) {
          return Wr ? Wr(x) : T.try(function() {
            return _o(x);
          }).then(function(D) {
            return _n(D) && (D = function j(L) {
              var k = function(je) {
                var Pe = function(Fe) {
                  for (; Fe.parentNode; ) Fe = Fe.parentNode;
                  if (_n(Fe)) return Fe;
                }(je);
                if (Pe && Pe.host) return Pe.host;
              }(L);
              if (!k) throw new Error("Element is not in shadow dom");
              var G = "shadow-slot-" + Qe(), me = document.createElement("slot");
              me.setAttribute("name", G), L.appendChild(me);
              var ge = document.createElement("div");
              return ge.setAttribute("slot", G), k.appendChild(ge), _n(k) ? j(ge) : ge;
            }(D)), pr = D, sn(D);
          });
        };
        return {
          init: function() {
            (function() {
              U.on(be.RENDER, function() {
                return $.onRender();
              }), U.on(be.PRERENDER, function() {
                return $.onPrerender();
              }), U.on(be.DISPLAY, function() {
                return $.onDisplay();
              }), U.on(be.RENDERED, function() {
                return $.onRendered();
              }), U.on(be.PRERENDERED, function() {
                return $.onPrerendered();
              }), U.on(be.CLOSE, function() {
                return $.onClose();
              }), U.on(be.DESTROY, function() {
                return $.onDestroy();
              }), U.on(be.RESIZE, function() {
                return $.onResize();
              }), U.on(be.FOCUS, function() {
                return $.onFocus();
              }), U.on(be.PROPS, function(x) {
                return $.onProps(x);
              }), U.on(be.ERROR, function(x) {
                return $ && $.onError ? $.onError(x) : Re(x).then(function() {
                  setTimeout(function() {
                    throw x;
                  }, 1);
                });
              }), I.register(U.reset);
            })();
          },
          render: function(x) {
            var D = x.target, j = x.container, L = x.context, k = x.rerender;
            return T.try(function() {
              var G = at(), me = S || at();
              (function(q, $e, We) {
                if (q !== window) {
                  if (!Gt(window, q)) throw new Error("Can only renderTo an adjacent frame");
                  var He = Y();
                  if (!dr($e, He) && !te(q)) throw new Error("Can not render remotely to " + $e.toString() + " - can only render to " + He);
                  if (We && typeof We != "string") throw new Error("Container passed to renderTo must be a string selector, got " + typeof We + " }");
                }
              })(D, me, j);
              var ge = T.try(function() {
                if (D !== window) return function(q, $e) {
                  for (var We = {}, He = 0, ir = Object.keys($); He < ir.length; He++) {
                    var Ae = ir[He], gr = l[Ae];
                    gr && gr.allowDelegate && (We[Ae] = $[Ae]);
                  }
                  var Ge = yr($e, "zoid_delegate_" + w, {
                    uid: t,
                    overrides: {
                      props: We,
                      event: U,
                      close: Mr,
                      onError: Lt,
                      getInternalState: Me,
                      setInternalState: _e,
                      resolveInitPromise: Le,
                      rejectInitPromise: Re
                    }
                  }).then(function(J) {
                    var K = J.data.parent;
                    return I.register(function(W) {
                      if (!Se($e)) return K.destroy(W);
                    }), K.getDelegateOverrides();
                  }).catch(function(J) {
                    throw new Error(`Unable to delegate rendering. Possibly the component is not loaded in the target window.

` + dt(J));
                  });
                  return Wr = function() {
                    for (var J = arguments.length, K = new Array(J), W = 0; W < J; W++) K[W] = arguments[W];
                    return Ge.then(function(X) {
                      return X.getProxyContainer.apply(X, K);
                    });
                  }, Hr = function() {
                    for (var J = arguments.length, K = new Array(J), W = 0; W < J; W++) K[W] = arguments[W];
                    return Ge.then(function(X) {
                      return X.renderContainer.apply(X, K);
                    });
                  }, Br = function() {
                    for (var J = arguments.length, K = new Array(J), W = 0; W < J; W++) K[W] = arguments[W];
                    return Ge.then(function(X) {
                      return X.show.apply(X, K);
                    });
                  }, $r = function() {
                    for (var J = arguments.length, K = new Array(J), W = 0; W < J; W++) K[W] = arguments[W];
                    return Ge.then(function(X) {
                      return X.hide.apply(X, K);
                    });
                  }, vr = function() {
                    for (var J = arguments.length, K = new Array(J), W = 0; W < J; W++) K[W] = arguments[W];
                    return Ge.then(function(X) {
                      return X.watchForUnload.apply(X, K);
                    });
                  }, q === xe.IFRAME ? (Er = function() {
                    for (var J = arguments.length, K = new Array(J), W = 0; W < J; W++) K[W] = arguments[W];
                    return Ge.then(function(X) {
                      return X.getProxyWindow.apply(X, K);
                    });
                  }, qr = function() {
                    for (var J = arguments.length, K = new Array(J), W = 0; W < J; W++) K[W] = arguments[W];
                    return Ge.then(function(X) {
                      return X.openFrame.apply(X, K);
                    });
                  }, Vr = function() {
                    for (var J = arguments.length, K = new Array(J), W = 0; W < J; W++) K[W] = arguments[W];
                    return Ge.then(function(X) {
                      return X.openPrerenderFrame.apply(X, K);
                    });
                  }, ot = function() {
                    for (var J = arguments.length, K = new Array(J), W = 0; W < J; W++) K[W] = arguments[W];
                    return Ge.then(function(X) {
                      return X.prerender.apply(X, K);
                    });
                  }, it = function() {
                    for (var J = arguments.length, K = new Array(J), W = 0; W < J; W++) K[W] = arguments[W];
                    return Ge.then(function(X) {
                      return X.open.apply(X, K);
                    });
                  }, oe = function() {
                    for (var J = arguments.length, K = new Array(J), W = 0; W < J; W++) K[W] = arguments[W];
                    return Ge.then(function(X) {
                      return X.openPrerender.apply(X, K);
                    });
                  }) : q === xe.POPUP && (nt = function() {
                    for (var J = arguments.length, K = new Array(J), W = 0; W < J; W++) K[W] = arguments[W];
                    return Ge.then(function(X) {
                      return X.setProxyWin.apply(X, K);
                    });
                  }), Ge;
                }(L, D);
              }), je = $.window, Pe = Di(), Fe = Oi(l, $, "post"), Ne = U.trigger(be.RENDER), le = Fi(j), Ie = wr(), Oe = le.then(function() {
                return Xn();
              }), nr = Oe.then(function() {
                return Oi(l, $, "get").then(function(q) {
                  return function($e, We) {
                    var He = We.query || {}, ir = We.hash || {}, Ae, gr, Ge = $e.split("#");
                    gr = Ge[1];
                    var J = (Ae = Ge[0]).split("?");
                    Ae = J[0];
                    var K = Mo(J[1], He), W = Mo(gr, ir);
                    return K && (Ae = Ae + "?" + K), W && (Ae = Ae + "#" + W), Ae;
                  }(Pn(ht()), {
                    query: q
                  });
                });
              }), Ue = Ie.then(function(q) {
                return function(We) {
                  var He = We === void 0 ? {} : We, ir = He.proxyWin, Ae = He.initialChildDomain, gr = He.childDomainMatch, Ge = He.target, J = Ge === void 0 ? window : Ge, K = He.context;
                  return function(W) {
                    var X = W === void 0 ? {} : W, kn = X.proxyWin, hs = X.childDomainMatch, ps = X.context;
                    return Xe(X.initialChildDomain).then(function(vs) {
                      return {
                        uid: t,
                        context: ps,
                        tag: E,
                        childDomainMatch: hs,
                        version: "10_3_3",
                        props: vs,
                        exports: (ji = kn, {
                          init: function(ws) {
                            return dn(this.origin, ws);
                          },
                          close: Mr,
                          checkClose: function() {
                            return Ci(ji);
                          },
                          resize: Ft,
                          onError: Lt,
                          show: br,
                          hide: Ar,
                          export: Ii
                        })
                      };
                      var ji;
                    });
                  }({
                    proxyWin: ir,
                    initialChildDomain: Ae,
                    childDomainMatch: gr,
                    context: K
                  }).then(function(W) {
                    var X = mi({
                      data: W,
                      metaData: {
                        windowRef: _t(J, Ae, K, ir)
                      },
                      sender: {
                        domain: Y(window)
                      },
                      receiver: {
                        win: ir,
                        domain: gr
                      },
                      passByReference: Ae === Y()
                    }), kn = X.serializedData;
                    return I.register(X.cleanReference), kn;
                  });
                }({
                  proxyWin: ($e = {
                    proxyWin: q,
                    initialChildDomain: G,
                    childDomainMatch: me,
                    target: D,
                    context: L
                  }).proxyWin,
                  initialChildDomain: $e.initialChildDomain,
                  childDomainMatch: $e.childDomainMatch,
                  target: $e.target,
                  context: $e.context
                }).then(function(We) {
                  return yi({
                    name: w,
                    serializedPayload: We
                  });
                });
                var $e;
              }), de = Ue.then(function(q) {
                return tr(L, {
                  windowName: q
                });
              }), Be = At(L), er = T.hash({
                proxyContainer: le,
                proxyFrame: de,
                proxyPrerenderFrame: Be
              }).then(function(q) {
                return Mi(q.proxyContainer, {
                  context: L,
                  proxyFrame: q.proxyFrame,
                  proxyPrerenderFrame: q.proxyPrerenderFrame,
                  rerender: k
                });
              }).then(function(q) {
                return q;
              }), Ve = T.hash({
                windowName: Ue,
                proxyFrame: de,
                proxyWin: Ie
              }).then(function(q) {
                var $e = q.proxyWin;
                return je ? $e : xi(L, {
                  windowName: q.windowName,
                  proxyWin: $e,
                  proxyFrame: q.proxyFrame
                });
              }), st = T.hash({
                proxyWin: Ve,
                proxyPrerenderFrame: Be
              }).then(function(q) {
                return Mt(L, q.proxyWin, q.proxyPrerenderFrame);
              }), mr = Ve.then(function(q) {
                return ue = q, rr(q);
              }), xr = T.hash({
                proxyPrerenderWin: st,
                state: mr
              }).then(function(q) {
                return Ai(q.proxyPrerenderWin, {
                  context: L
                });
              }), zi = T.hash({
                proxyWin: Ve,
                windowName: Ue
              }).then(function(q) {
                if (je) return q.proxyWin.setName(q.windowName);
              }), ss = T.hash({
                body: Fe
              }).then(function(q) {
                return n.method ? n.method : Object.keys(q.body).length ? "post" : "get";
              }), Li = T.hash({
                proxyWin: Ve,
                windowUrl: nr,
                body: Fe,
                method: ss,
                windowName: zi,
                prerender: xr
              }).then(function(q) {
                return q.proxyWin.setLocation(q.windowUrl, {
                  method: q.method,
                  body: q.body
                });
              }), us = Ve.then(function(q) {
                (function $e(We, He) {
                  var ir = !1;
                  return I.register(function() {
                    ir = !0;
                  }), T.delay(2e3).then(function() {
                    return We.isClosed();
                  }).then(function(Ae) {
                    if (!ir) {
                      if (He === xe.POPUP && Ae) return Mr(new Error("Detected popup close"));
                      var gr = !!(pr && lt(pr));
                      return He === xe.IFRAME && Ae && (gr || jr) ? Mr(new Error("Detected iframe close")) : $e(We, He);
                    }
                  });
                })(q, L);
              }), cs = T.hash({
                container: er,
                prerender: xr
              }).then(function() {
                return U.trigger(be.DISPLAY);
              }), ds = Ve.then(function(q) {
                return function($e, We, He) {
                  return T.try(function() {
                    return $e.awaitWindow();
                  }).then(function(ir) {
                    if (Lr && Lr.needsBridge({
                      win: ir,
                      domain: We
                    }) && !Lr.hasBridge(We, We)) {
                      var Ae = typeof n.bridgeUrl == "function" ? n.bridgeUrl({
                        props: $
                      }) : n.bridgeUrl;
                      if (!Ae) throw new Error("Bridge needed to render " + He);
                      var gr = Cr(Ae);
                      return Lr.linkUrl(ir, We), Lr.openBridge(Pn(Ae), gr);
                    }
                  });
                }(q, G, L);
              }), fs = Li.then(function() {
                return T.try(function() {
                  var q = $.timeout;
                  if (q) return M.timeout(q, new Error("Loading component timed out after " + q + " milliseconds"));
                });
              }), ls = M.then(function() {
                return jr = !0, U.trigger(be.RENDERED);
              });
              return T.hash({
                initPromise: M,
                buildUrlPromise: nr,
                onRenderPromise: Ne,
                getProxyContainerPromise: le,
                openFramePromise: de,
                openPrerenderFramePromise: Be,
                renderContainerPromise: er,
                openPromise: Ve,
                openPrerenderPromise: st,
                setStatePromise: mr,
                prerenderPromise: xr,
                loadUrlPromise: Li,
                buildWindowNamePromise: Ue,
                setWindowNamePromise: zi,
                watchForClosePromise: us,
                onDisplayPromise: cs,
                openBridgePromise: ds,
                runTimeoutPromise: fs,
                onRenderedPromise: ls,
                delegatePromise: ge,
                watchForUnloadPromise: Pe,
                finalSetPropsPromise: Oe
              });
            }).catch(function(G) {
              return T.all([Lt(G), zt(G)]).then(function() {
                throw G;
              }, function() {
                throw G;
              });
            }).then(Ee);
          },
          destroy: zt,
          getProps: function() {
            return $;
          },
          setProps: Xn,
          export: Ii,
          getHelpers: _i,
          getDelegateOverrides: function() {
            return T.try(function() {
              return {
                getProxyContainer: Fi,
                show: br,
                hide: Ar,
                renderContainer: Mi,
                getProxyWindow: wr,
                watchForUnload: Di,
                openFrame: tr,
                openPrerenderFrame: At,
                prerender: Ai,
                open: xi,
                openPrerender: Mt,
                setProxyWin: rr
              };
            });
          },
          getExports: function() {
            return N({
              getExports: function() {
                return Ni;
              }
            });
          }
        };
      }
      var Za = {
        register: function(e, t, n, o) {
          var a = o.React, u = o.ReactDOM;
          return function(c) {
            R(l, c);
            function l() {
              return c.apply(this, arguments) || this;
            }
            var f = l.prototype;
            return f.render = function() {
              return a.createElement("div", null);
            }, f.componentDidMount = function() {
              var v = u.findDOMNode(this), E = n(ft({}, this.props));
              E.render(v, xe.IFRAME), this.setState({
                parent: E
              });
            }, f.componentDidUpdate = function() {
              this.state && this.state.parent && this.state.parent.updateProps(ft({}, this.props)).catch(Ee);
            }, l;
          }(a.Component);
        }
      }, Qa = {
        register: function(e, t, n, o) {
          return o.component(e, {
            render: function(a) {
              return a("div");
            },
            inheritAttrs: !1,
            mounted: function() {
              var a = this.$el;
              this.parent = n(O({}, (u = this.$attrs, Object.keys(u).reduce(function(c, l) {
                var f = u[l];
                return l === "style-object" || l === "styleObject" ? (c.style = f, c.styleObject = f) : l.includes("-") ? c[Dn(l)] = f : c[l] = f, c;
              }, {}))));
              var u;
              this.parent.render(a, xe.IFRAME);
            },
            watch: {
              $attrs: {
                handler: function() {
                  this.parent && this.$attrs && this.parent.updateProps(O({}, this.$attrs)).catch(Ee);
                },
                deep: !0
              }
            }
          });
        }
      }, Xa = {
        register: function(e, t, n) {
          return {
            template: "<div></div>",
            inheritAttrs: !1,
            mounted: function() {
              var o = this.$el;
              this.parent = n(O({}, (a = this.$attrs, Object.keys(a).reduce(function(u, c) {
                var l = a[c];
                return c === "style-object" || c === "styleObject" ? (u.style = l, u.styleObject = l) : c.includes("-") ? u[Dn(c)] = l : u[c] = l, u;
              }, {}))));
              var a;
              this.parent.render(o, xe.IFRAME);
            },
            watch: {
              $attrs: {
                handler: function() {
                  this.parent && this.$attrs && this.parent.updateProps(O({}, this.$attrs)).catch(Ee);
                },
                deep: !0
              }
            }
          };
        }
      }, ka = {
        register: function(e, t, n, o) {
          return o.module(e, []).directive(Dn(e), function() {
            for (var a = {}, u = 0, c = Object.keys(t); u < c.length; u++) a[c[u]] = "=";
            return a.props = "=", {
              scope: a,
              restrict: "E",
              controller: ["$scope", "$element", function(l, f) {
                function v() {
                  if (l.$root.$$phase !== "$apply" && l.$root.$$phase !== "$digest") try {
                    l.$apply();
                  } catch {
                  }
                }
                var E = function() {
                  return Xt(l.props, function(p) {
                    return typeof p == "function" ? function() {
                      var m = p.apply(this, arguments);
                      return v(), m;
                    } : p;
                  });
                }, w = n(E());
                w.render(f[0], xe.IFRAME), l.$watch(function() {
                  w.updateProps(E()).catch(Ee);
                });
              }]
            };
          });
        }
      }, es = {
        register: function(e, t, n, o) {
          var a = o.Component, u = o.NgModule, c = o.ElementRef, l = o.NgZone, f = o.Inject, v = function() {
            function w(m, b) {
              this.elementRef = void 0, this.internalProps = void 0, this.parent = void 0, this.props = void 0, this.zone = void 0, this._props = void 0, this._props = {}, this.elementRef = m, this.zone = b;
            }
            var p = w.prototype;
            return p.getProps = function() {
              var m = this;
              return Xt(O({}, this.internalProps, this.props), function(b) {
                if (typeof b == "function") {
                  var P = m.zone;
                  return function() {
                    var S = arguments, N = this;
                    return P.run(function() {
                      return b.apply(N, S);
                    });
                  };
                }
                return b;
              });
            }, p.ngOnInit = function() {
              var m = this.elementRef.nativeElement;
              this.parent = n(this.getProps()), this.parent.render(m, xe.IFRAME);
            }, p.ngDoCheck = function() {
              this.parent && !function(m, b) {
                var P = {};
                for (var S in m) if (m.hasOwnProperty(S) && (P[S] = !0, m[S] !== b[S]))
                  return !1;
                for (var N in b) if (!P[N]) return !1;
                return !0;
              }(this._props, this.props) && (this._props = O({}, this.props), this.parent.updateProps(this.getProps()));
            }, w;
          }();
          v.annotations = void 0, v.parameters = void 0, v.parameters = [[new f(c)], [new f(l)]], v.annotations = [new a({
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
        var t = e.uid, n = e.frame, o = e.prerenderFrame, a = e.doc, u = e.props, c = e.event, l = e.dimensions, f = l.width, v = l.height;
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
        `)), E.appendChild(n), E.appendChild(o), E.appendChild(w), o.classList.add("zoid-visible"), n.classList.add("zoid-invisible"), c.on(be.RENDERED, function() {
            o.classList.remove("zoid-visible"), o.classList.add("zoid-invisible"), n.classList.remove("zoid-invisible"), n.classList.add("zoid-visible"), setTimeout(function() {
              Ct(o);
            }, 1);
          }), c.on(be.RESIZE, function(p) {
            var m = p.width, b = p.height;
            typeof m == "number" && (E.style.width = Ho(m)), typeof b == "number" && (E.style.height = Ho(b));
          }), E;
        }
      }
      function ts(e) {
        var t = e.doc, n = e.props, o = t.createElement("html"), a = t.createElement("body"), u = t.createElement("style"), c = t.createElement("div");
        return c.classList.add("spinner"), n.cspNonce && u.setAttribute("nonce", n.cspNonce), o.appendChild(a), a.appendChild(c), a.appendChild(u), u.appendChild(t.createTextNode(`
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
      var Zn = kt(), Qn = kt();
      function ns(e) {
        var t = function(b) {
          var P = b.tag, S = b.url, N = b.domain, M = b.bridgeUrl, H = b.props, I = H === void 0 ? {} : H, B = b.dimensions, _ = B === void 0 ? {} : B, Z = b.autoResize, U = Z === void 0 ? {} : Z, ce = b.allowedParentDomains, ne = ce === void 0 ? "*" : ce, V = b.attributes, $ = V === void 0 ? {} : V, ue = b.defaultContext, Q = ue === void 0 ? xe.IFRAME : ue, De = b.containerTemplate, Sr = De === void 0 ? rs : De, pr = b.prerenderTemplate, jr = pr === void 0 ? ts : pr, Ur = b.validate, Wr = b.eligible, Br = Wr === void 0 ? function() {
            return {
              eligible: !0
            };
          } : Wr, $r = b.logger, tt = $r === void 0 ? {
            info: Ee
          } : $r, Hr = b.exports, Er = Hr === void 0 ? Ee : Hr, nt = b.method, qr = b.children, Vr = qr === void 0 ? function() {
            return {};
          } : qr, ot = P.replace(/-/g, "_"), it = O({}, {
            window: {
              type: we.OBJECT,
              sendToChild: !1,
              required: !1,
              allowDelegate: !0,
              validate: function(oe) {
                var vr = oe.value;
                if (!kr(vr) && !hr.isProxyWindow(vr)) throw new Error("Expected Window or ProxyWindow");
                if (kr(vr)) {
                  if (Se(vr)) throw new Error("Window is closed");
                  if (!te(vr)) throw new Error("Window is not same domain");
                }
              },
              decorate: function(oe) {
                return It(oe.value);
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
              default: Ir,
              decorate: rt
            },
            onRendered: {
              type: we.FUNCTION,
              required: !1,
              sendToChild: !1,
              default: Ir,
              decorate: rt
            },
            onRender: {
              type: we.FUNCTION,
              required: !1,
              sendToChild: !1,
              default: Ir,
              decorate: rt
            },
            onPrerendered: {
              type: we.FUNCTION,
              required: !1,
              sendToChild: !1,
              default: Ir,
              decorate: rt
            },
            onPrerender: {
              type: we.FUNCTION,
              required: !1,
              sendToChild: !1,
              default: Ir,
              decorate: rt
            },
            onClose: {
              type: we.FUNCTION,
              required: !1,
              sendToChild: !1,
              allowDelegate: !0,
              default: Ir,
              decorate: rt
            },
            onDestroy: {
              type: we.FUNCTION,
              required: !1,
              sendToChild: !1,
              allowDelegate: !0,
              default: Ir,
              decorate: rt
            },
            onResize: {
              type: we.FUNCTION,
              required: !1,
              sendToChild: !1,
              allowDelegate: !0,
              default: Ir
            },
            onFocus: {
              type: we.FUNCTION,
              required: !1,
              sendToChild: !1,
              allowDelegate: !0,
              default: Ir
            },
            close: {
              type: we.FUNCTION,
              required: !1,
              sendToChild: !1,
              childDecorate: function(oe) {
                return oe.close;
              }
            },
            focus: {
              type: we.FUNCTION,
              required: !1,
              sendToChild: !1,
              childDecorate: function(oe) {
                return oe.focus;
              }
            },
            resize: {
              type: we.FUNCTION,
              required: !1,
              sendToChild: !1,
              childDecorate: function(oe) {
                return oe.resize;
              }
            },
            uid: {
              type: we.STRING,
              required: !1,
              sendToChild: !1,
              childDecorate: function(oe) {
                return oe.uid;
              }
            },
            tag: {
              type: we.STRING,
              required: !1,
              sendToChild: !1,
              childDecorate: function(oe) {
                return oe.tag;
              }
            },
            getParent: {
              type: we.FUNCTION,
              required: !1,
              sendToChild: !1,
              childDecorate: function(oe) {
                return oe.getParent;
              }
            },
            getParentDomain: {
              type: we.FUNCTION,
              required: !1,
              sendToChild: !1,
              childDecorate: function(oe) {
                return oe.getParentDomain;
              }
            },
            show: {
              type: we.FUNCTION,
              required: !1,
              sendToChild: !1,
              childDecorate: function(oe) {
                return oe.show;
              }
            },
            hide: {
              type: we.FUNCTION,
              required: !1,
              sendToChild: !1,
              childDecorate: function(oe) {
                return oe.hide;
              }
            },
            export: {
              type: we.FUNCTION,
              required: !1,
              sendToChild: !1,
              childDecorate: function(oe) {
                return oe.export;
              }
            },
            onError: {
              type: we.FUNCTION,
              required: !1,
              sendToChild: !1,
              childDecorate: function(oe) {
                return oe.onError;
              }
            },
            onProps: {
              type: we.FUNCTION,
              required: !1,
              sendToChild: !1,
              childDecorate: function(oe) {
                return oe.onProps;
              }
            },
            getSiblings: {
              type: we.FUNCTION,
              required: !1,
              sendToChild: !1,
              childDecorate: function(oe) {
                return oe.getSiblings;
              }
            }
          }, I);
          if (!Sr) throw new Error("Container template required");
          return {
            name: ot,
            tag: P,
            url: S,
            domain: N,
            bridgeUrl: M,
            method: nt,
            propsDef: it,
            dimensions: _,
            autoResize: U,
            allowedParentDomains: ne,
            attributes: $,
            defaultContext: Q,
            containerTemplate: Sr,
            prerenderTemplate: jr,
            validate: Ur,
            logger: tt,
            eligible: Br,
            children: Vr,
            exports: typeof Er == "function" ? Er : function(oe) {
              for (var vr = oe.getExports, ae = {}, ze = function() {
                var Re = Le[Ce], Xe = Er[Re].type, Me = vr().then(function(_e) {
                  return _e[Re];
                });
                ae[Re] = Xe === we.FUNCTION ? function() {
                  for (var _e = arguments.length, wr = new Array(_e), rr = 0; rr < _e; rr++) wr[rr] = arguments[rr];
                  return Me.then(function(br) {
                    return br.apply(void 0, wr);
                  });
                } : Me;
              }, Ce = 0, Le = Object.keys(Er); Ce < Le.length; Ce++) ze();
              return ae;
            }
          };
        }(e), n = t.name, o = t.tag, a = t.defaultContext, u = t.propsDef, c = t.eligible, l = t.children, f = Wt(window), v = {}, E = [], w = function() {
          if (function(P) {
            try {
              return Kn(window.name).name === P;
            } catch {
            }
            return !1;
          }(n)) {
            var b = Ei().payload;
            if (b.tag === o && dr(b.childDomainMatch, Y())) return !0;
          }
          return !1;
        }, p = Fr(function() {
          if (w()) {
            if (window.xprops)
              throw delete f.components[o], new Error("Can not register " + n + " as child - child already registered");
            var b = function(P) {
              var S = P.tag, N = P.propsDef, M = P.autoResize, H = P.allowedParentDomains, I = [], B = Ei(), _ = B.parent, Z = B.payload, U = _.win, ce = _.domain, ne, V = new T(), $ = Z.version, ue = Z.uid, Q = Z.exports, De = Z.context, Sr = Z.props;
              if (!function(ae, ze) {
                if (!/_/.test(ae) || !/_/.test("10_3_3")) throw new Error("Versions are in an invalid format (" + ae + ", 10_3_3)");
                return ae.split("_")[0] === "10_3_3".split("_")[0];
              }($)) throw new Error("Parent window has zoid version " + $ + ", child window has version 10_3_3");
              var pr = Q.show, jr = Q.hide, Ur = Q.close, Wr = Q.onError, Br = Q.checkClose, $r = Q.export, tt = Q.resize, Hr = Q.init, Er = function() {
                return U;
              }, nt = function() {
                return ce;
              }, qr = function(ae) {
                return I.push(ae), {
                  cancel: function() {
                    I.splice(I.indexOf(ae), 1);
                  }
                };
              }, Vr = function(ae) {
                return tt.fireAndForget({
                  width: ae.width,
                  height: ae.height
                });
              }, ot = function(ae) {
                return V.resolve(ae), $r(ae);
              }, it = function(ae) {
                var ze = (ae === void 0 ? {} : ae).anyParent, Ce = [], Le = ne.parent;
                if (ze === void 0 && (ze = !Le), !ze && !Le) throw new Error("No parent found for " + S + " child");
                for (var Re = 0, Xe = Tr(window); Re < Xe.length; Re++) {
                  var Me = Xe[Re];
                  if (te(Me)) {
                    var _e = Te(Me).xprops;
                    if (_e && Er() === _e.getParent()) {
                      var wr = _e.parent;
                      if (ze || !Le || wr && wr.uid === Le.uid) {
                        var rr = wi(Me, function(br) {
                          return br.exports;
                        });
                        Ce.push({
                          props: _e,
                          exports: rr
                        });
                      }
                    }
                  }
                }
                return Ce;
              }, oe = function(ae, ze, Ce) {
                Ce === void 0 && (Ce = !1);
                var Le = function(Xe, Me, _e, wr, rr, br) {
                  br === void 0 && (br = !1);
                  for (var Ar = {}, ht = 0, pt = Object.keys(_e); ht < pt.length; ht++) {
                    var at = pt[ht], tr = Me[at], At = tr && tr.trustedDomains && tr.trustedDomains.length > 0 ? tr.trustedDomains.reduce(function(dn, Ft) {
                      return dn || dr(Ft, Y(window));
                    }, !1) : wr === Y(window) || te(Xe);
                    if ((!tr || !tr.sameDomain || At) && (!tr || !tr.trustedDomains || At)) {
                      var Mt = bi(Me, 0, at, _e[at], rr);
                      Ar[at] = Mt, tr && tr.alias && !Ar[tr.alias] && (Ar[tr.alias] = Mt);
                    }
                  }
                  if (!br) for (var vt = 0, cn = Object.keys(Me); vt < cn.length; vt++) {
                    var _t = cn[vt];
                    _e.hasOwnProperty(_t) || (Ar[_t] = bi(Me, 0, _t, void 0, rr));
                  }
                  return Ar;
                }(U, N, ae, ze, {
                  tag: S,
                  show: pr,
                  hide: jr,
                  close: Ur,
                  focus: Ya,
                  onError: Wr,
                  resize: Vr,
                  getSiblings: it,
                  onProps: qr,
                  getParent: Er,
                  getParentDomain: nt,
                  uid: ue,
                  export: ot
                }, Ce);
                ne ? ft(ne, Le) : ne = Le;
                for (var Re = 0; Re < I.length; Re++) (0, I[Re])(ne);
              }, vr = function(ae) {
                return T.try(function() {
                  return oe(ae, ce, !0);
                });
              };
              return {
                init: function() {
                  return T.try(function() {
                    var ae = "";
                    return te(U) && (ae = function(ze) {
                      var Ce = ze.componentName, Le = ze.parentComponentWindow, Re = gi({
                        data: Kn(window.name).serializedInitialPayload,
                        sender: {
                          win: Le
                        },
                        basic: !0
                      }), Xe = Re.sender;
                      if (Re.reference.type === "uid" || Re.metaData.windowRef.type === "global") {
                        var Me = yi({
                          name: Ce,
                          serializedPayload: mi({
                            data: Re.data,
                            metaData: {
                              windowRef: Ka(Le)
                            },
                            sender: {
                              domain: Xe.domain
                            },
                            receiver: {
                              win: window,
                              domain: Y()
                            },
                            basic: !0
                          }).serializedData
                        });
                        return window.name = Me, Me;
                      }
                    }({
                      componentName: P.name,
                      parentComponentWindow: U
                    }) || ""), Wt(window).exports = P.exports({
                      getExports: function() {
                        return V;
                      }
                    }), function(ze, Ce) {
                      if (!dr(ze, Ce)) throw new Error("Can not be rendered by domain: " + Ce);
                    }(H, ce), Qo(U), function() {
                      window.addEventListener("beforeunload", function() {
                        Br.fireAndForget();
                      }), window.addEventListener("unload", function() {
                        Br.fireAndForget();
                      }), bo(U, function() {
                        Pi();
                      });
                    }(), Hr({
                      name: ae,
                      updateProps: vr,
                      close: Pi
                    });
                  }).then(function() {
                    return (ae = M.width, ze = ae !== void 0 && ae, Ce = M.height, Le = Ce !== void 0 && Ce, Re = M.element, _o(Re === void 0 ? "body" : Re).catch(Ee).then(function(Xe) {
                      return {
                        width: ze,
                        height: Le,
                        element: Xe
                      };
                    })).then(function(Xe) {
                      var Me = Xe.width, _e = Xe.height, wr = Xe.element;
                      wr && (Me || _e) && De !== xe.POPUP && Uo(wr, function(rr) {
                        Vr({
                          width: Me ? rr.width : void 0,
                          height: _e ? rr.height : void 0
                        });
                      }, {
                        width: Me,
                        height: _e
                      });
                    });
                    var ae, ze, Ce, Le, Re;
                  }).catch(function(ae) {
                    Wr(ae);
                  });
                },
                getProps: function() {
                  return ne || (oe(Sr, ce), ne);
                }
              };
            }(t);
            return b.init(), b;
          }
        }), m = function b(P) {
          var S, N = "zoid-" + o + "-" + Qe(), M = P || {}, H = c({
            props: M
          }), I = H.eligible, B = H.reason, _ = M.onDestroy;
          M.onDestroy = function() {
            if (S && I && E.splice(E.indexOf(S), 1), _) return _.apply(void 0, arguments);
          };
          var Z = Ti({
            uid: N,
            options: t
          });
          Z.init(), I ? Z.setProps(M) : M.onDestroy && M.onDestroy(), Zn.register(function(ne) {
            return Z.destroy(ne || new Error("zoid destroyed all components"));
          });
          var U = function(ne) {
            var V = (ne === void 0 ? {} : ne).decorate;
            return b((V === void 0 ? Ma : V)(M));
          }, ce = function(ne, V, $) {
            return T.try(function() {
              if (!I) {
                var ue = new Error(B || n + " component is not eligible");
                return Z.destroy(ue).then(function() {
                  throw ue;
                });
              }
              if (!kr(ne)) throw new Error("Must pass window to renderTo");
              return function(Q, De) {
                return T.try(function() {
                  if (Q.window) return It(Q.window).getType();
                  if (De) {
                    if (De !== xe.IFRAME && De !== xe.POPUP) throw new Error("Unrecognized context: " + De);
                    return De;
                  }
                  return a;
                });
              }(M, $);
            }).then(function(ue) {
              if (V = function(Q, De) {
                if (De) {
                  if (typeof De != "string" && !On(De)) throw new TypeError("Expected string or element selector to be passed");
                  return De;
                }
                if (Q === xe.POPUP) return "body";
                throw new Error("Expected element to be passed to render iframe");
              }(ue, V), ne !== window && typeof V != "string") throw new Error("Must pass string element when rendering to another window");
              return Z.render({
                target: ne,
                container: V,
                context: ue,
                rerender: function() {
                  var Q = U();
                  return ft(S, Q), Q.renderTo(ne, V, $);
                }
              });
            }).catch(function(ue) {
              return Z.destroy(ue).then(function() {
                throw ue;
              });
            });
          };
          return S = O({}, Z.getExports(), Z.getHelpers(), function() {
            for (var ne = l(), V = {}, $ = function() {
              var De = Q[ue], Sr = ne[De];
              V[De] = function(pr) {
                var jr = Z.getProps(), Ur = O({}, pr, {
                  parent: {
                    uid: N,
                    props: jr,
                    export: Z.export
                  }
                });
                return Sr(Ur);
              };
            }, ue = 0, Q = Object.keys(ne); ue < Q.length; ue++) $();
            return V;
          }(), {
            isEligible: function() {
              return I;
            },
            clone: U,
            render: function(ne, V) {
              return ce(window, ne, V);
            },
            renderTo: function(ne, V, $) {
              return ce(ne, V, $);
            }
          }), I && E.push(S), S;
        };
        if (p(), function() {
          var b = Nr("zoid_allow_delegate_" + n, function() {
            return !0;
          }), P = Nr("zoid_delegate_" + n, function(S) {
            var N = S.data;
            return {
              parent: Ti({
                uid: N.uid,
                options: t,
                overrides: N.overrides,
                parentWin: S.source
              })
            };
          });
          Qn.register(b.cancel), Qn.register(P.cancel);
        }(), f.components = f.components || {}, f.components[o]) throw new Error("Can not register multiple components with the same tag: " + o);
        return f.components[o] = !0, {
          init: m,
          instances: E,
          driver: function(b, P) {
            var S = {
              react: Za,
              angular: ka,
              vue: Qa,
              vue3: Xa,
              angular2: es
            };
            if (!S[b]) throw new Error("Could not find driver for framework: " + b);
            return v[b] || (v[b] = S[b].register(o, u, m, P)), v[b];
          },
          isChild: w,
          canRenderTo: function(b) {
            return yr(b, "zoid_allow_delegate_" + n).then(function(P) {
              return P.data;
            }).catch(function() {
              return !1;
            });
          },
          registerChild: p
        };
      }
      var os = function(e) {
        (function() {
          Rr().initialized || (Rr().initialized = !0, u = (a = {
            on: Nr,
            send: yr
          }).on, c = a.send, (l = Rr()).receiveMessage = l.receiveMessage || function(f) {
            return Gn(f, {
              on: u,
              send: c
            });
          }, function(f) {
            var v = f.on, E = f.send;
            fe().getOrSet("postMessageListener", function() {
              return Lo(window, "message", function(w) {
                (function(p, m) {
                  var b = m.on, P = m.send;
                  T.try(function() {
                    var S = p.source || p.sourceElement, N = p.origin || p.originalEvent && p.originalEvent.origin, M = p.data;
                    if (N === "null" && (N = "file://"), S) {
                      if (!N) throw new Error("Post message did not have origin domain");
                      Gn({
                        source: S,
                        origin: N,
                        data: M
                      }, {
                        on: b,
                        send: P
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
            on: Nr,
            send: yr
          }), ii({
            on: Nr,
            send: yr,
            receiveMessage: Gn
          }), function(f) {
            var v = f.on, E = f.send;
            fe("builtinListeners").getOrSet("helloListener", function() {
              var w = v("postrobot_hello", {
                domain: "*"
              }, function(m) {
                return Ko(m.source, {
                  domain: m.origin
                }), {
                  instanceID: Jo()
                };
              }), p = Rt();
              return p && zn(p, {
                send: E
              }).catch(function(m) {
              }), w;
            });
          }({
            on: Nr,
            send: yr
          }));
          var a, u, c, l;
        })();
        var t = ns(e), n = function(a) {
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
      function Ri(e) {
        Lr && Lr.destroyBridges();
        var t = Zn.all(e);
        return Zn = kt(), t;
      }
      var Si = Ri;
      function is(e) {
        return Si(), delete window.__zoid_10_3_3__, function() {
          (function() {
            for (var n = fe("responseListeners"), o = 0, a = n.keys(); o < a.length; o++) {
              var u = a[o], c = n.get(u);
              c && (c.cancelled = !0), n.del(u);
            }
          })(), (t = fe().get("postMessageListener")) && t.cancel();
          var t;
          delete window.__post_robot_11_0_0__;
        }(), Qn.all(e);
      }
    }]);
  });
})(xa);
var Da = xa.exports;
const ki = Da.EVENT, mt = {
  VISIBLE: "zoid-visible",
  INVISIBLE: "zoid-invisible"
};
function rc({
  uid: r,
  frame: i,
  prerenderFrame: s,
  doc: d,
  props: h,
  event: y,
  dimensions: R
}) {
  const { width: O, height: C } = R, { top: F = 0, left: g = 0 } = h;
  if (!i || !s)
    return;
  const z = d.createElement("div");
  z.setAttribute("id", r);
  const A = d.createElement("style");
  return h.cspNonce && A.setAttribute("nonce", h.cspNonce), A.appendChild(
    d.createTextNode(`
          #${r} {
              display: inline-block;
              position: absolute;
              width: ${O};
              height: ${C};
              z-index: 1049;
              border: none;
              top: ${F}px;
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

          #${r} > iframe.${mt.INVISIBLE} {
              opacity: 0;
          }

          #${r} > iframe.${mt.VISIBLE} {
              opacity: 1;
        }
      `)
  ), z.appendChild(i), z.appendChild(s), z.appendChild(A), s.classList.add(mt.INVISIBLE), i.classList.add(mt.INVISIBLE), y.on(ki.RENDERED, () => {
    setTimeout(() => {
      i.classList.remove(mt.INVISIBLE), i.classList.add(mt.VISIBLE);
    }, 100), setTimeout(() => {
      s.remove();
    }, 1);
  }), y.on(ki.RESIZE, ({ width: ee, height: ye }) => {
    typeof ee == "number" && (z.style.width = `${ee}px`), typeof ye == "number" && (z.style.height = `${ye}px`);
  }), z;
}
function tc(r) {
  return Da.create({
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
    containerTemplate: rc
  });
}
function nc(r) {
  return tc(r.id)(r);
}
function oc(r) {
  return new Promise((i, s) => {
    const d = document.createElement("script");
    d.async = !0, d.src = r, d.onload = i, d.onerror = s, document.body.appendChild(d);
  });
}
const ic = "https://cdn.jsdelivr.net/gh/sigmaott/sigma-ssai-web-sdk/v5/build/dist/wasm_exec.js";
let gt = null;
function ea() {
  gt = null;
}
function ac() {
  const r = window;
  return r.Go ? Promise.resolve(r.wasm) : gt || (gt = oc(ic).then(() => r.Go), gt.then(ea).catch(ea), gt);
}
class yt {
  constructor() {
    return yt.instance ? yt.instance : (this.session = null, this.go = null, this.buffer = null, this.audioMediaSequence = {}, yt.instance = this, this);
  }
  async init(i) {
    if (!this.buffer) {
      const d = await (await fetch(i)).arrayBuffer();
      this.buffer = d;
    }
    return yt.instance;
  }
  async loadSource(i) {
    this.session && (i.session = this.session);
    const s = JSON.stringify(i), d = new Go(), h = await WebAssembly.instantiate(this.buffer, d.importObject);
    d.run(h.instance);
    let y;
    for (let R = 1; R <= 3; R++)
      try {
        y = await window.loadSource(s);
        break;
      } catch (O) {
        if (console.log(`Attempt ${R} failed:`, O), R === 3)
          throw console.log("session:", this.session), console.log(s), O;
      }
    if (y.session != "" && (this.session = y.session), y.error)
      throw new Error(y.error);
    return y.manifest;
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
const Ca = Pr(), Na = Pr();
function ra({ adsUrl: r, sdk: i, loader: s }) {
  return class extends s {
    constructor(h) {
      super(h);
    }
    load(h, y, R) {
      const O = R.onSuccess;
      R.onSuccess = async (C, F, g) => {
        (g.type === "manifest" || g.type === "level" || g.type === "audioTrack") && (C.data = await this.modifyManifest(C.url, C.data, g.type)), O(C, F, g);
      }, super.load(h, y, R);
    }
    async modifyManifest(h, y, R) {
      console.log("[LOG] ~ manifest:", y), Ca.value = y;
      const O = {
        proxyAds: {
          uri: r,
          timeout: 2
        }
      };
      try {
        const C = await i.loadSource({ config: O, manifest: y, masterUri: h });
        return console.log("[LOG] ~ newManifest:", C), Na.value = C, C;
      } catch (C) {
        return console.error("[LOG] ~ error:", C), y;
      }
    }
  };
}
function sc({
  video: r,
  adContainer: i,
  startSession: s,
  sdk: d
}) {
  const h = Xu(), y = Pr(!1), R = Pr(), O = Math.random().toString(36).slice(6);
  function C({ icons: ie }) {
    return {
      id: O,
      appConfig: {
        sdkBaseUrl: oa("https://cdn.jsdelivr.net/gh/sigmaott/sigma-ssai-web-sdk/v5/build/dist/wta/index.html", { id: O })
      },
      icons: ie
    };
  }
  const F = nc(C({
    icons: []
  }));
  F.render(i), F.hide(), i.style.display = "none", xu(() => {
    var ie;
    if (R.value) {
      const re = ((ie = R.value) == null ? void 0 : ie.icons) || [];
      i.style.display = "block", F.updateProps(C({
        icons: re
      })), F.show();
    } else
      i.style.display = "none", F.hide();
  });
  const g = Pr([]), z = Pr(), A = Pr([]);
  async function ee(ie) {
    var se;
    console.log("[LOG] ~ currentAd:", R);
    const re = (se = R.value) == null ? void 0 : se.trackingEvents.find((Ke) => Ke.eventType === ie);
    if (!re) {
      console.debug("[LOG] ~ event:", ie);
      return;
    }
    h.trigger(re), await Promise.all(re.beaconUrls.map((Ke) => ku(cu(Ke))));
  }
  const ye = /* @__PURE__ */ new Map();
  let sr;
  function T(ie, re, se) {
    ie.addEventListener(re, se), ye.set(re, se);
  }
  function ve() {
    return y.value = !1, ["fullscreenchange", "webkitfullscreenchange", "mozfullscreenchange", "msfullscreenchange"].forEach((ie) => {
      T(r, ie, () => {
        const re = document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement;
        ee(re ? "fullscreen" : "exitFullscreen");
      });
    }), T(r, "pause", () => ee("pause")), T(r, "play", () => ee("resume")), T(r, "rewind", () => ee("rewind")), T(r, "mute", () => ee("mute")), T(r, "unmute", () => ee("unmute")), async (ie, re) => {
      var Te, cr;
      if (z.value = re.frag.sn, ie !== window.Hls.Events.FRAG_CHANGED)
        return;
      const se = g.value.find((ke) => ke.sn === re.frag.sn);
      if (!se)
        return;
      const Ke = (Te = se == null ? void 0 : se.value) == null ? void 0 : Te.event, Y = A.value.find((ke) => ke.eventType === Ke && !ke.tracked);
      if (!Y)
        return;
      const te = Y == null ? void 0 : Y.ad;
      if (te) {
        if (Ke === "start")
          R.value && console.debug("[LOG] ~ currentAd:", R.value), R.value = te, s(te.adVerifications, h), sr = qi(async () => {
            ee("impression"), ee("start");
            const ke = A.value.find((Yr) => Yr.key === Y.key.replace("_start", "_impression"));
            ke && (ke.tracked = !0), Y.tracked = !0;
          }, se.time * 1e3);
        else {
          if (te.id !== ((cr = R.value) == null ? void 0 : cr.id)) {
            console.debug("[LOG] ~ ad:", te), console.debug("[LOG] ~ currentAd:", R.value);
            return;
          }
          sr = qi(async () => {
            ee(Ke), Ke === "complete" && (R.value = void 0), Y.tracked = !0;
          }, se.time * 1e3);
        }
        g.value = g.value.filter((ke) => ke.sn !== re.frag.sn);
      }
    };
  }
  async function Ze() {
    return d.getEventTracking().then((ie) => {
      for (const re of (ie == null ? void 0 : ie.avails) || [])
        for (const se of re.ads) {
          const Ke = `${re.id}_${se.id}_${se.startTimeInSeconds}`;
          for (const Y of se.trackingEvents) {
            const te = `${Ke}_${Y.eventType}`;
            A.value.find((cr) => cr.key === te) || A.value.push({
              ...Y,
              key: te,
              ad: {
                ...se,
                key: Ke
              },
              tracked: !1
            });
          }
        }
    });
  }
  function ur() {
    return async (ie, re) => {
      function se(te) {
        for (let Te = 0; Te < te.length; Te++)
          if (te[Te] === 0)
            return Te;
        return te.length;
      }
      const { start: Ke, sn: Y } = re.frag;
      for (let te = 0; te < re.samples.length; te++) {
        const Te = re.samples[te], cr = Te.data, ke = Te.pts;
        if (String.fromCharCode.apply(null, cr.slice(0, 3)) !== "ID3" || String.fromCharCode.apply(null, cr.slice(10, 14)) !== "TXXX")
          continue;
        const Tr = cr.slice(21, cr.length), Qr = se(Tr), ct = Tr.slice(Qr + 1, Tr.length), Se = se(ct), Vt = new TextDecoder("utf-8").decode(ct.slice(0, Se)), Xr = {
          sn: Y,
          time: ke - Ke,
          value: oo(Vt)
        };
        if (z.value && Y < z.value)
          return;
        g.value.push(Xr), Xr.value.event === "start" && Ze();
      }
    };
  }
  function Dr() {
    return (ie) => {
      const re = ie.track;
      re.kind === "metadata" && re.on("cuechange", async () => {
        const se = re.activeCues[0];
        se && se.value.data && (await Ze(), oo(se.value.data));
      });
    };
  }
  function Je(ie, re) {
    h.on((se) => {
      (ie === "*" || se.eventType === ie) && re(se);
    });
  }
  function qt() {
    R.value = void 0, g.value = [], ye.forEach((ie, re) => {
      r.removeEventListener(re, ie);
    }), ye.clear(), gu(sr);
  }
  return {
    destroy: qt,
    onEventTracking: Je,
    hlsHelper: {
      createHlsFragChanged: ve,
      createHlsFragParsingMetadata: ur
    },
    videojsHelper: {
      createVideojsAddTrack: Dr
    }
  };
}
async function cc({ video: r, adContainer: i, adsUrl: s }) {
  await ac();
  const d = new yt();
  await d.init("https://cdn.jsdelivr.net/gh/sigmaott/sigma-ssai-web-sdk/v5/build/dist/sigma-cspm.wasm");
  function h() {
  }
  const { onEventTracking: y, destroy: R, videojsHelper: O, hlsHelper: C } = sc({
    video: r,
    adContainer: i,
    trackingUrl: "",
    startSession: h,
    sdk: d
  }), F = Pr(), g = Pr();
  function z(ve) {
    ve.config.loader = ra({ adsUrl: s, sdk: d, loader: Hls.DefaultConfig.loader }), F.value = ve;
    const Ze = C.createHlsFragChanged(), ur = C.createHlsFragParsingMetadata();
    ve.on("hlsFragChanged", Ze), ve.on("hlsFragParsingMetadata", ur), ve.on(Hls.Events.ERROR, (Dr, Je) => {
      console.error("HLS Error:", Dr, Je), Je.type === window.Hls.ErrorTypes.NETWORK_ERROR ? console.error("Network Error:", Je.details) : Je.type === window.Hls.ErrorTypes.MEDIA_ERROR ? console.error("Media Error:", Je.details) : console.error("Other Error:", Je.details);
    }), g.value = () => {
      ve.destroy();
    };
  }
  function A(ve) {
    console.debug("[LOG] ~ SigmaManager.DefaultConfig.loader:", SigmaManager.DefaultConfig.loader), ve.hls.config.loader = ra({ adsUrl: s, sdk: d, loader: SigmaManager.DefaultConfig.loader }), F.value = ve.hls;
    const Ze = C.createHlsFragChanged(), ur = C.createHlsFragParsingMetadata();
    ve.hls.on("hlsFragChanged", Ze), ve.hls.on("hlsFragParsingMetadata", ur), ve.on(SigmaManager.Events.ERROR, (Dr, Je) => {
      console.log("[LOG] ~ event:", Dr), console.debug("[LOG] ~ _modifiedManifest:", Na.value), console.debug("[LOG] ~ _manifest:", Ca.value), console.error("HLS Error:", Dr, Je), Je.type === window.Hls.ErrorTypes.NETWORK_ERROR ? console.error("Network Error:", Je.details) : Je.type === window.Hls.ErrorTypes.MEDIA_ERROR ? console.error("Media Error:", Je.details) : console.error("Other Error:", Je.details);
    }), g.value = () => {
      ve.hls.destroy();
    };
  }
  const ee = Pr(), ye = Pr();
  function sr(ve) {
    ee.value = ve;
    const Ze = O.createVideojsAddTrack();
    ve.textTracks().on("addtrack", Ze), ye.value = () => {
      ve.textTracks().off("addtrack", Ze);
    };
  }
  function T() {
    var ve, Ze;
    R(), (ve = g.value) == null || ve.call(g), (Ze = ye.value) == null || Ze.call(ye), F.value = null, ee.value = null, g.value = null, ye.value = null;
  }
  return {
    onEventTracking: y,
    destroy: T,
    sigmaPlayer: {
      attachVideojs: sr,
      attachHls: z,
      attachSigmaDrm: A
    },
    sdk: d
  };
}
export {
  cc as createSigmaDai
};
