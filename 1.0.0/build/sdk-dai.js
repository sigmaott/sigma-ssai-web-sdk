const vs = /"(?:_|\\u0{2}5[Ff]){2}(?:p|\\u0{2}70)(?:r|\\u0{2}72)(?:o|\\u0{2}6[Ff])(?:t|\\u0{2}74)(?:o|\\u0{2}6[Ff])(?:_|\\u0{2}5[Ff]){2}"\s*:/, ws = /"(?:c|\\u0063)(?:o|\\u006[Ff])(?:n|\\u006[Ee])(?:s|\\u0073)(?:t|\\u0074)(?:r|\\u0072)(?:u|\\u0075)(?:c|\\u0063)(?:t|\\u0074)(?:o|\\u006[Ff])(?:r|\\u0072)"\s*:/, ms = /^\s*["[{]|^\s*-?\d{1,16}(\.\d{1,17})?([Ee][+-]?\d+)?\s*$/;
function gs(r, i) {
  if (r === "__proto__" || r === "constructor" && i && typeof i == "object" && "prototype" in i) {
    ys(r);
    return;
  }
  return i;
}
function ys(r) {
  console.warn(`[destr] Dropping "${r}" key to prevent prototype pollution.`);
}
function io(r, i = {}) {
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
  if (!ms.test(r)) {
    if (i.strict)
      throw new SyntaxError("[destr] Invalid JSON");
    return r;
  }
  try {
    if (vs.test(r) || ws.test(r)) {
      if (i.strict)
        throw new Error("[destr] Possible prototype pollution");
      return JSON.parse(r, gs);
    }
    return JSON.parse(r);
  } catch (d) {
    if (i.strict)
      throw d;
    return r;
  }
}
const Es = /#/g, bs = /&/g, Ps = /\//g, Ts = /=/g, lo = /\+/g, Os = /%5e/gi, Rs = /%60/gi, Ss = /%7c/gi, xs = /%20/gi;
function Ds(r) {
  return encodeURI("" + r).replace(Ss, "|");
}
function ao(r) {
  return Ds(typeof r == "string" ? r : JSON.stringify(r)).replace(lo, "%2B").replace(xs, "+").replace(Es, "%23").replace(bs, "%26").replace(Rs, "`").replace(Os, "^").replace(Ps, "%2F");
}
function ro(r) {
  return ao(r).replace(Ts, "%3D");
}
function ta(r = "") {
  try {
    return decodeURIComponent("" + r);
  } catch {
    return "" + r;
  }
}
function Ns(r) {
  return ta(r.replace(lo, " "));
}
function Cs(r) {
  return ta(r.replace(lo, " "));
}
function Is(r = "") {
  const i = {};
  r[0] === "?" && (r = r.slice(1));
  for (const s of r.split("&")) {
    const d = s.match(/([^=]+)=?(.*)/) || [];
    if (d.length < 2)
      continue;
    const h = Ns(d[1]);
    if (h === "__proto__" || h === "constructor")
      continue;
    const g = Cs(d[2] || "");
    i[h] === void 0 ? i[h] = g : Array.isArray(i[h]) ? i[h].push(g) : i[h] = [i[h], g];
  }
  return i;
}
function As(r, i) {
  return (typeof i == "number" || typeof i == "boolean") && (i = String(i)), i ? Array.isArray(i) ? i.map((s) => `${ro(r)}=${ao(s)}`).join("&") : `${ro(r)}=${ao(i)}` : ro(r);
}
function Ws(r) {
  return Object.keys(r).filter((i) => r[i] !== void 0).map((i) => As(i, r[i])).filter(Boolean).join("&");
}
const Ms = /^[\s\w\0+.-]{2,}:([/\\]{1,2})/, _s = /^[\s\w\0+.-]{2,}:([/\\]{2})?/, Fs = /^([/\\]\s*){2,}[^/\\]/, zs = /^\.?\//;
function na(r, i = {}) {
  return typeof i == "boolean" && (i = { acceptRelative: i }), i.strict ? Ms.test(r) : _s.test(r) || (i.acceptRelative ? Fs.test(r) : !1);
}
function Ls(r = "", i) {
  return r.endsWith("/");
}
function js(r = "", i) {
  return (Ls(r) ? r.slice(0, -1) : r) || "/";
}
function Us(r = "", i) {
  return r.endsWith("/") ? r : r + "/";
}
function Bs(r, i) {
  if ($s(i) || na(r))
    return r;
  const s = js(i);
  return r.startsWith(s) ? r : Hs(s, r);
}
function oa(r, i) {
  const s = Vs(r), d = { ...Is(s.search), ...i };
  return s.search = Ws(d), Gs(s);
}
function $s(r) {
  return !r || r === "/";
}
function qs(r) {
  return r && r !== "/";
}
function Hs(r, ...i) {
  let s = r || "";
  for (const d of i.filter((h) => qs(h)))
    if (s) {
      const h = d.replace(zs, "");
      s = Us(s) + h;
    } else
      s = d;
  return s;
}
const ia = Symbol.for("ufo:protocolRelative");
function Vs(r = "", i) {
  const s = r.match(
    /^[\s\0]*(blob:|data:|javascript:|vbscript:)(.*)/i
  );
  if (s) {
    const [, _, M = ""] = s;
    return {
      protocol: _.toLowerCase(),
      pathname: M,
      href: _ + M,
      auth: "",
      host: "",
      search: "",
      hash: ""
    };
  }
  if (!na(r, { acceptRelative: !0 }))
    return Ui(r);
  const [, d = "", h, g = ""] = r.replace(/\\/g, "/").match(/^[\s\0]*([\w+.-]{2,}:)?\/\/([^/@]+@)?(.*)/) || [];
  let [, O = "", R = ""] = g.match(/([^#/?]*)(.*)?/) || [];
  d === "file:" && (R = R.replace(/\/(?=[A-Za-z]:)/, ""));
  const { pathname: C, search: L, hash: b } = Ui(R);
  return {
    protocol: d.toLowerCase(),
    auth: h ? h.slice(0, Math.max(0, h.length - 1)) : "",
    host: O,
    pathname: C,
    search: L,
    hash: b,
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
function Gs(r) {
  const i = r.pathname || "", s = r.search ? (r.search.startsWith("?") ? "" : "?") + r.search : "", d = r.hash || "", h = r.auth ? r.auth + "@" : "", g = r.host || "";
  return (r.protocol || r[ia] ? (r.protocol || "") + "//" : "") + h + g + i + s + d;
}
class Js extends Error {
  constructor(i, s) {
    super(i, s), this.name = "FetchError", s != null && s.cause && !this.cause && (this.cause = s.cause);
  }
}
function Ks(r) {
  var C, L, b, _, M;
  const i = ((C = r.error) == null ? void 0 : C.message) || ((L = r.error) == null ? void 0 : L.toString()) || "", s = ((b = r.request) == null ? void 0 : b.method) || ((_ = r.options) == null ? void 0 : _.method) || "GET", d = ((M = r.request) == null ? void 0 : M.url) || String(r.request) || "/", h = `[${s}] ${JSON.stringify(d)}`, g = r.response ? `${r.response.status} ${r.response.statusText}` : "<no response>", O = `${h}: ${g}${i ? ` ${i}` : ""}`, R = new Js(
    O,
    r.error ? { cause: r.error } : void 0
  );
  for (const oe of ["request", "options", "response"])
    Object.defineProperty(R, oe, {
      get() {
        return r[oe];
      }
    });
  for (const [oe, xe] of [
    ["data", "_data"],
    ["status", "status"],
    ["statusCode", "status"],
    ["statusText", "statusText"],
    ["statusMessage", "statusText"]
  ])
    Object.defineProperty(R, oe, {
      get() {
        return r.response && r.response[xe];
      }
    });
  return R;
}
const Ys = new Set(
  Object.freeze(["PATCH", "POST", "PUT", "DELETE"])
);
function Bi(r = "GET") {
  return Ys.has(r.toUpperCase());
}
function Zs(r) {
  if (r === void 0)
    return !1;
  const i = typeof r;
  return i === "string" || i === "number" || i === "boolean" || i === null ? !0 : i !== "object" ? !1 : Array.isArray(r) ? !0 : r.buffer ? !1 : r.constructor && r.constructor.name === "Object" || typeof r.toJSON == "function";
}
const Qs = /* @__PURE__ */ new Set([
  "image/svg",
  "application/xml",
  "application/xhtml",
  "application/html"
]), Xs = /^application\/(?:[\w!#$%&*.^`~-]*\+)?json(;.+)?$/i;
function ks(r = "") {
  if (!r)
    return "json";
  const i = r.split(";").shift() || "";
  return Xs.test(i) ? "json" : Qs.has(i) || i.startsWith("text/") ? "text" : "blob";
}
function eu(r, i, s = globalThis.Headers) {
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
    for (const [h, g] of new s((r == null ? void 0 : r.headers) || {}))
      d.headers.set(h, g);
  }
  return d;
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
]), tu = /* @__PURE__ */ new Set([101, 204, 205, 304]);
function aa(r = {}) {
  const {
    fetch: i = globalThis.fetch,
    Headers: s = globalThis.Headers,
    AbortController: d = globalThis.AbortController
  } = r;
  async function h(R) {
    const C = R.error && R.error.name === "AbortError" && !R.options.timeout || !1;
    if (R.options.retry !== !1 && !C) {
      let b;
      typeof R.options.retry == "number" ? b = R.options.retry : b = Bi(R.options.method) ? 0 : 1;
      const _ = R.response && R.response.status || 500;
      if (b > 0 && (Array.isArray(R.options.retryStatusCodes) ? R.options.retryStatusCodes.includes(_) : ru.has(_))) {
        const M = R.options.retryDelay || 0;
        return M > 0 && await new Promise((oe) => setTimeout(oe, M)), g(R.request, {
          ...R.options,
          retry: b - 1
        });
      }
    }
    const L = Ks(R);
    throw Error.captureStackTrace && Error.captureStackTrace(L, g), L;
  }
  const g = async function(C, L = {}) {
    var oe;
    const b = {
      request: C,
      options: eu(L, r.defaults, s),
      response: void 0,
      error: void 0
    };
    b.options.method = (oe = b.options.method) == null ? void 0 : oe.toUpperCase(), b.options.onRequest && await b.options.onRequest(b), typeof b.request == "string" && (b.options.baseURL && (b.request = Bs(b.request, b.options.baseURL)), (b.options.query || b.options.params) && (b.request = oa(b.request, {
      ...b.options.params,
      ...b.options.query
    }))), b.options.body && Bi(b.options.method) && (Zs(b.options.body) ? (b.options.body = typeof b.options.body == "string" ? b.options.body : JSON.stringify(b.options.body), b.options.headers = new s(b.options.headers || {}), b.options.headers.has("content-type") || b.options.headers.set("content-type", "application/json"), b.options.headers.has("accept") || b.options.headers.set("accept", "application/json")) : (
      // ReadableStream Body
      ("pipeTo" in b.options.body && typeof b.options.body.pipeTo == "function" || // Node.js Stream Body
      typeof b.options.body.pipe == "function") && ("duplex" in b.options || (b.options.duplex = "half"))
    ));
    let _;
    if (!b.options.signal && b.options.timeout) {
      const xe = new d();
      _ = setTimeout(
        () => xe.abort(),
        b.options.timeout
      ), b.options.signal = xe.signal;
    }
    try {
      b.response = await i(
        b.request,
        b.options
      );
    } catch (xe) {
      return b.error = xe, b.options.onRequestError && await b.options.onRequestError(b), await h(b);
    } finally {
      _ && clearTimeout(_);
    }
    if (b.response.body && !tu.has(b.response.status) && b.options.method !== "HEAD") {
      const xe = (b.options.parseResponse ? "json" : b.options.responseType) || ks(b.response.headers.get("content-type") || "");
      switch (xe) {
        case "json": {
          const tr = await b.response.text(), T = b.options.parseResponse || io;
          b.response._data = T(tr);
          break;
        }
        case "stream": {
          b.response._data = b.response.body;
          break;
        }
        default:
          b.response._data = await b.response[xe]();
      }
    }
    return b.options.onResponse && await b.options.onResponse(b), !b.options.ignoreResponseError && b.response.status >= 400 && b.response.status < 600 ? (b.options.onResponseError && await b.options.onResponseError(b), await h(b)) : b.response;
  }, O = async function(C, L) {
    return (await g(C, L))._data;
  };
  return O.raw = g, O.native = (...R) => i(...R), O.create = (R = {}) => aa({
    ...r,
    defaults: {
      ...r.defaults,
      ...R
    }
  }), O;
}
const ho = function() {
  if (typeof globalThis < "u")
    return globalThis;
  if (typeof self < "u")
    return self;
  if (typeof window < "u")
    return window;
  if (typeof global < "u")
    return global;
  throw new Error("unable to locate global object");
}(), nu = ho.fetch || (() => Promise.reject(new Error("[ofetch] global.fetch is not supported!"))), ou = ho.Headers, iu = ho.AbortController, au = aa({ fetch: nu, Headers: ou, AbortController: iu }), su = au.create({
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
}), uu = (r) => (i, s) => (r.set(i, s), s), $i = Number.MAX_SAFE_INTEGER === void 0 ? 9007199254740991 : Number.MAX_SAFE_INTEGER, sa = 536870912, qi = sa * 2, cu = (r, i) => (s) => {
  const d = i.get(s);
  let h = d === void 0 ? s.size : d < qi ? d + 1 : 0;
  if (!s.has(h))
    return r(s, h);
  if (s.size < sa) {
    for (; s.has(h); )
      h = Math.floor(Math.random() * qi);
    return r(s, h);
  }
  if (s.size > $i)
    throw new Error("Congratulations, you created a collection of unique numbers which uses all available integers!");
  for (; s.has(h); )
    h = Math.floor(Math.random() * $i);
  return r(s, h);
}, ua = /* @__PURE__ */ new WeakMap(), du = uu(ua), ln = cu(du, ua), fu = (r) => r.method !== void 0 && r.method === "call", lu = (r) => typeof r.id == "number" && typeof r.result == "boolean", hu = (r) => {
  const i = /* @__PURE__ */ new Map([[0, () => {
  }]]), s = /* @__PURE__ */ new Map([[0, () => {
  }]]), d = /* @__PURE__ */ new Map(), h = new Worker(r);
  return h.addEventListener("message", ({ data: L }) => {
    if (fu(L)) {
      const { params: { timerId: b, timerType: _ } } = L;
      if (_ === "interval") {
        const M = i.get(b);
        if (typeof M === void 0)
          throw new Error("The timer is in an undefined state.");
        if (typeof M == "number") {
          const oe = d.get(M);
          if (oe === void 0 || oe.timerId !== b || oe.timerType !== _)
            throw new Error("The timer is in an undefined state.");
        } else typeof M == "function" && M();
      } else if (_ === "timeout") {
        const M = s.get(b);
        if (typeof M === void 0)
          throw new Error("The timer is in an undefined state.");
        if (typeof M == "number") {
          const oe = d.get(M);
          if (oe === void 0 || oe.timerId !== b || oe.timerType !== _)
            throw new Error("The timer is in an undefined state.");
        } else typeof M == "function" && (M(), s.delete(b));
      }
    } else if (lu(L)) {
      const { id: b } = L, _ = d.get(b);
      if (_ === void 0)
        throw new Error("The timer is in an undefined state.");
      const { timerId: M, timerType: oe } = _;
      d.delete(b), oe === "interval" ? i.delete(M) : s.delete(M);
    } else {
      const { error: { message: b } } = L;
      throw new Error(b);
    }
  }), {
    clearInterval: (L) => {
      if (typeof i.get(L) == "function") {
        const b = ln(d);
        d.set(b, { timerId: L, timerType: "interval" }), i.set(L, b), h.postMessage({
          id: b,
          method: "clear",
          params: { timerId: L, timerType: "interval" }
        });
      }
    },
    clearTimeout: (L) => {
      if (typeof s.get(L) == "function") {
        const b = ln(d);
        d.set(b, { timerId: L, timerType: "timeout" }), s.set(L, b), h.postMessage({
          id: b,
          method: "clear",
          params: { timerId: L, timerType: "timeout" }
        });
      }
    },
    setInterval: (L, b = 0, ..._) => {
      const M = ln(i);
      return i.set(M, () => {
        L(..._), typeof i.get(M) == "function" && h.postMessage({
          id: null,
          method: "set",
          params: {
            delay: b,
            now: performance.timeOrigin + performance.now(),
            timerId: M,
            timerType: "interval"
          }
        });
      }), h.postMessage({
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
    setTimeout: (L, b = 0, ..._) => {
      const M = ln(s);
      return s.set(M, () => L(..._)), h.postMessage({
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
}, pu = (r, i) => {
  let s = null;
  return () => {
    if (s !== null)
      return s;
    const d = new Blob([i], { type: "application/javascript; charset=utf-8" }), h = URL.createObjectURL(d);
    return s = r(h), setTimeout(() => URL.revokeObjectURL(h)), s;
  };
}, vu = `(()=>{"use strict";const e=new Map,t=new Map,r=t=>{const r=e.get(t);return void 0!==r&&(clearTimeout(r),e.delete(t),!0)},s=e=>{const r=t.get(e);return void 0!==r&&(clearTimeout(r),t.delete(e),!0)},o=(e,t)=>{const r=performance.now(),s=e+t-r-performance.timeOrigin;return{expected:r+s,remainingDelay:s}},i=(e,t,r,s)=>{const o=r-performance.now();o>0?e.set(t,setTimeout(i,o,e,t,r,s)):(e.delete(t),postMessage({id:null,method:"call",params:{timerId:t,timerType:s}}))};addEventListener("message",(n=>{let{data:a}=n;try{if("clear"===a.method){const{id:e,params:{timerId:t,timerType:o}}=a;if("interval"===o)postMessage({id:e,result:r(t)});else{if("timeout"!==o)throw new Error('The given type "'.concat(o,'" is not supported'));postMessage({id:e,result:s(t)})}}else{if("set"!==a.method)throw new Error('The given method "'.concat(a.method,'" is not supported'));{const{params:{delay:r,now:s,timerId:n,timerType:m}}=a;if("interval"===m)((t,r,s)=>{const{expected:n,remainingDelay:a}=o(t,s);e.set(r,setTimeout(i,a,e,r,n,"interval"))})(r,n,s);else{if("timeout"!==m)throw new Error('The given type "'.concat(m,'" is not supported'));((e,r,s)=>{const{expected:n,remainingDelay:a}=o(e,s);t.set(r,setTimeout(i,a,t,r,n,"timeout"))})(r,n,s)}}}}catch(e){postMessage({error:{message:e.message},id:a.id,result:null})}}))})();`, ca = pu(hu, vu), wu = (r) => ca().clearTimeout(r), Hi = (...r) => ca().setTimeout(...r);
/**
* @vue/shared v3.5.1
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
/*! #__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function mu(r, i) {
  const s = new Set(r.split(","));
  return (d) => s.has(d);
}
const Vi = Object.assign, gu = Object.prototype.hasOwnProperty, so = (r, i) => gu.call(r, i), Pt = Array.isArray, $t = (r) => da(r) === "[object Map]", yu = (r) => typeof r == "string", Vt = (r) => typeof r == "symbol", yn = (r) => r !== null && typeof r == "object", Eu = Object.prototype.toString, da = (r) => Eu.call(r), fa = (r) => da(r).slice(8, -1), po = (r) => yu(r) && r !== "NaN" && r[0] !== "-" && "" + parseInt(r, 10) === r, bu = (r) => {
  const i = /* @__PURE__ */ Object.create(null);
  return (s) => i[s] || (i[s] = r(s));
}, Pu = bu((r) => r.charAt(0).toUpperCase() + r.slice(1)), St = (r, i) => !Object.is(r, i);
var Ze = {};
function Ot(r, ...i) {
  console.warn(`[Vue warn] ${r}`, ...i);
}
let pe;
const to = /* @__PURE__ */ new WeakSet();
class Gi {
  constructor(i) {
    this.fn = i, this.deps = void 0, this.depsTail = void 0, this.flags = 5, this.nextEffect = void 0, this.cleanup = void 0, this.scheduler = void 0;
  }
  pause() {
    this.flags |= 64;
  }
  resume() {
    this.flags & 64 && (this.flags &= -65, to.has(this) && (to.delete(this), this.trigger()));
  }
  /**
   * @internal
   */
  notify() {
    this.flags & 2 && !(this.flags & 32) || this.flags & 8 || (this.flags |= 8, this.nextEffect = qt, qt = this);
  }
  run() {
    if (!(this.flags & 1))
      return this.fn();
    this.flags |= 2, Ji(this), ha(this);
    const i = pe, s = Sr;
    pe = this, Sr = !0;
    try {
      return this.fn();
    } finally {
      Ze.NODE_ENV !== "production" && pe !== this && Ot(
        "Active effect was not restored correctly - this is likely a Vue internal bug."
      ), pa(this), pe = i, Sr = s, this.flags &= -3;
    }
  }
  stop() {
    if (this.flags & 1) {
      for (let i = this.deps; i; i = i.nextDep)
        mo(i);
      this.deps = this.depsTail = void 0, Ji(this), this.onStop && this.onStop(), this.flags &= -2;
    }
  }
  trigger() {
    this.flags & 64 ? to.add(this) : this.scheduler ? this.scheduler() : this.runIfDirty();
  }
  /**
   * @internal
   */
  runIfDirty() {
    uo(this) && this.run();
  }
  get dirty() {
    return uo(this);
  }
}
let la = 0, qt;
function vo() {
  la++;
}
function wo() {
  if (--la > 0)
    return;
  let r;
  for (; qt; ) {
    let i = qt;
    for (qt = void 0; i; ) {
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
    d.version === -1 ? (d === s && (s = d.prevDep), mo(d), Ou(d)) : i = d, d.dep.activeLink = d.prevActiveLink, d.prevActiveLink = void 0;
  r.deps = i, r.depsTail = s;
}
function uo(r) {
  for (let i = r.deps; i; i = i.nextDep)
    if (i.dep.version !== i.version || i.dep.computed && Tu(i.dep.computed) === !1 || i.dep.version !== i.version)
      return !0;
  return !!r._dirty;
}
function Tu(r) {
  if (r.flags & 2)
    return !1;
  if (r.flags & 4 && !(r.flags & 16) || (r.flags &= -17, r.globalVersion === gn))
    return;
  r.globalVersion = gn;
  const i = r.dep;
  if (r.flags |= 2, i.version > 0 && !r.isSSR && !uo(r)) {
    r.flags &= -3;
    return;
  }
  const s = pe, d = Sr;
  pe = r, Sr = !0;
  try {
    ha(r);
    const h = r.fn();
    (i.version === 0 || St(h, r._value)) && (r._value = h, i.version++);
  } catch (h) {
    throw i.version++, h;
  } finally {
    pe = s, Sr = d, pa(r), r.flags &= -3;
  }
}
function mo(r) {
  const { dep: i, prevSub: s, nextSub: d } = r;
  if (s && (s.nextSub = d, r.prevSub = void 0), d && (d.prevSub = s, r.nextSub = void 0), i.subs === r && (i.subs = s), !i.subs && i.computed) {
    i.computed.flags &= -5;
    for (let h = i.computed.deps; h; h = h.nextDep)
      mo(h);
  }
}
function Ou(r) {
  const { prevDep: i, nextDep: s } = r;
  i && (i.nextDep = s, r.prevDep = void 0), s && (s.prevDep = i, r.nextDep = void 0);
}
function Ru(r, i) {
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
let Sr = !0;
const va = [];
function Su() {
  va.push(Sr), Sr = !1;
}
function xu() {
  const r = va.pop();
  Sr = r === void 0 ? !0 : r;
}
function Ji(r) {
  const { cleanup: i } = r;
  if (r.cleanup = void 0, i) {
    const s = pe;
    pe = void 0;
    try {
      i();
    } finally {
      pe = s;
    }
  }
}
let gn = 0;
class wa {
  constructor(i) {
    this.computed = i, this.version = 0, this.activeLink = void 0, this.subs = void 0, Ze.NODE_ENV !== "production" && (this.subsHead = void 0);
  }
  track(i) {
    if (!pe || !Sr)
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
      }, pe.deps ? (s.prevDep = pe.depsTail, pe.depsTail.nextDep = s, pe.depsTail = s) : pe.deps = pe.depsTail = s, pe.flags & 4 && ma(s);
    else if (s.version === -1 && (s.version = this.version, s.nextDep)) {
      const d = s.nextDep;
      d.prevDep = s.prevDep, s.prevDep && (s.prevDep.nextDep = d), s.prevDep = pe.depsTail, s.nextDep = void 0, pe.depsTail.nextDep = s, pe.depsTail = s, pe.deps === s && (pe.deps = d);
    }
    return Ze.NODE_ENV !== "production" && pe.onTrack && pe.onTrack(
      Vi(
        {
          effect: pe
        },
        i
      )
    ), s;
  }
  trigger(i) {
    this.version++, gn++, this.notify(i);
  }
  notify(i) {
    vo();
    try {
      if (Ze.NODE_ENV !== "production")
        for (let s = this.subsHead; s; s = s.nextSub)
          Ze.NODE_ENV !== "production" && s.sub.onTrigger && !(s.sub.flags & 8) && s.sub.onTrigger(
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
      wo();
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
  s !== r && (r.prevSub = s, s && (s.nextSub = r)), Ze.NODE_ENV !== "production" && r.dep.subsHead === void 0 && (r.dep.subsHead = r), r.dep.subs = r;
}
const co = /* @__PURE__ */ new WeakMap(), ct = Symbol(
  Ze.NODE_ENV !== "production" ? "Object iterate" : ""
), fo = Symbol(
  Ze.NODE_ENV !== "production" ? "Map keys iterate" : ""
), Ht = Symbol(
  Ze.NODE_ENV !== "production" ? "Array iterate" : ""
);
function fr(r, i, s) {
  if (Sr && pe) {
    let d = co.get(r);
    d || co.set(r, d = /* @__PURE__ */ new Map());
    let h = d.get(s);
    h || d.set(s, h = new wa()), Ze.NODE_ENV !== "production" ? h.track({
      target: r,
      type: i,
      key: s
    }) : h.track();
  }
}
function Zr(r, i, s, d, h, g) {
  const O = co.get(r);
  if (!O) {
    gn++;
    return;
  }
  let R = [];
  if (i === "clear")
    R = [...O.values()];
  else {
    const C = Pt(r), L = C && po(s);
    if (C && s === "length") {
      const b = Number(d);
      O.forEach((_, M) => {
        (M === "length" || M === Ht || !Vt(M) && M >= b) && R.push(_);
      });
    } else {
      const b = (_) => _ && R.push(_);
      switch (s !== void 0 && b(O.get(s)), L && b(O.get(Ht)), i) {
        case "add":
          C ? L && b(O.get("length")) : (b(O.get(ct)), $t(r) && b(O.get(fo)));
          break;
        case "delete":
          C || (b(O.get(ct)), $t(r) && b(O.get(fo)));
          break;
        case "set":
          $t(r) && b(O.get(ct));
          break;
      }
    }
  }
  vo();
  for (const C of R)
    Ze.NODE_ENV !== "production" ? C.trigger({
      target: r,
      type: i,
      key: s,
      newValue: d,
      oldValue: h,
      oldTarget: g
    }) : C.trigger();
  wo();
}
function gt(r) {
  const i = ve(r);
  return i === r ? i : (fr(i, "iterate", Ht), Qr(r) ? i : i.map(cr));
}
function go(r) {
  return fr(r = ve(r), "iterate", Ht), r;
}
const Du = {
  __proto__: null,
  [Symbol.iterator]() {
    return no(this, Symbol.iterator, cr);
  },
  concat(...r) {
    return gt(this).concat(
      ...r.map((i) => Pt(i) ? gt(i) : i)
    );
  },
  entries() {
    return no(this, "entries", (r) => (r[1] = cr(r[1]), r));
  },
  every(r, i) {
    return zr(this, "every", r, i, void 0, arguments);
  },
  filter(r, i) {
    return zr(this, "filter", r, i, (s) => s.map(cr), arguments);
  },
  find(r, i) {
    return zr(this, "find", r, i, cr, arguments);
  },
  findIndex(r, i) {
    return zr(this, "findIndex", r, i, void 0, arguments);
  },
  findLast(r, i) {
    return zr(this, "findLast", r, i, cr, arguments);
  },
  findLastIndex(r, i) {
    return zr(this, "findLastIndex", r, i, void 0, arguments);
  },
  // flat, flatMap could benefit from ARRAY_ITERATE but are not straight-forward to implement
  forEach(r, i) {
    return zr(this, "forEach", r, i, void 0, arguments);
  },
  includes(...r) {
    return oo(this, "includes", r);
  },
  indexOf(...r) {
    return oo(this, "indexOf", r);
  },
  join(r) {
    return gt(this).join(r);
  },
  // keys() iterator only reads `length`, no optimisation required
  lastIndexOf(...r) {
    return oo(this, "lastIndexOf", r);
  },
  map(r, i) {
    return zr(this, "map", r, i, void 0, arguments);
  },
  pop() {
    return Bt(this, "pop");
  },
  push(...r) {
    return Bt(this, "push", r);
  },
  reduce(r, ...i) {
    return Ki(this, "reduce", r, i);
  },
  reduceRight(r, ...i) {
    return Ki(this, "reduceRight", r, i);
  },
  shift() {
    return Bt(this, "shift");
  },
  // slice could use ARRAY_ITERATE but also seems to beg for range tracking
  some(r, i) {
    return zr(this, "some", r, i, void 0, arguments);
  },
  splice(...r) {
    return Bt(this, "splice", r);
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
    return Bt(this, "unshift", r);
  },
  values() {
    return no(this, "values", cr);
  }
};
function no(r, i, s) {
  const d = go(r), h = d[i]();
  return d !== r && !Qr(r) && (h._next = h.next, h.next = () => {
    const g = h._next();
    return g.value && (g.value = s(g.value)), g;
  }), h;
}
const Nu = Array.prototype;
function zr(r, i, s, d, h, g) {
  const O = go(r), R = O !== r && !Qr(r), C = O[i];
  if (C !== Nu[i]) {
    const _ = C.apply(r, g);
    return R ? cr(_) : _;
  }
  let L = s;
  O !== r && (R ? L = function(_, M) {
    return s.call(this, cr(_), M, r);
  } : s.length > 2 && (L = function(_, M) {
    return s.call(this, _, M, r);
  }));
  const b = C.call(O, L, d);
  return R && h ? h(b) : b;
}
function Ki(r, i, s, d) {
  const h = go(r);
  let g = s;
  return h !== r && (Qr(r) ? s.length > 3 && (g = function(O, R, C) {
    return s.call(this, O, R, C, r);
  }) : g = function(O, R, C) {
    return s.call(this, O, cr(R), C, r);
  }), h[i](g, ...d);
}
function oo(r, i, s) {
  const d = ve(r);
  fr(d, "iterate", Ht);
  const h = d[i](...s);
  return (h === -1 || h === !1) && Ju(s[0]) ? (s[0] = ve(s[0]), d[i](...s)) : h;
}
function Bt(r, i, s = []) {
  Su(), vo();
  const d = ve(r)[i].apply(r, s);
  return wo(), xu(), d;
}
const Cu = /* @__PURE__ */ mu("__proto__,__v_isRef,__isVue"), ga = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((r) => r !== "arguments" && r !== "caller").map((r) => Symbol[r]).filter(Vt)
);
function Iu(r) {
  Vt(r) || (r = String(r));
  const i = ve(this);
  return fr(i, "has", r), i.hasOwnProperty(r);
}
class ya {
  constructor(i = !1, s = !1) {
    this._isReadonly = i, this._isShallow = s;
  }
  get(i, s, d) {
    const h = this._isReadonly, g = this._isShallow;
    if (s === "__v_isReactive")
      return !h;
    if (s === "__v_isReadonly")
      return h;
    if (s === "__v_isShallow")
      return g;
    if (s === "__v_raw")
      return d === (h ? g ? Hu : Ta : g ? qu : Pa).get(i) || // receiver is not the reactive proxy, but has the same prototype
      // this means the receiver is a user proxy of the reactive proxy
      Object.getPrototypeOf(i) === Object.getPrototypeOf(d) ? i : void 0;
    const O = Pt(i);
    if (!h) {
      let C;
      if (O && (C = Du[s]))
        return C;
      if (s === "hasOwnProperty")
        return Iu;
    }
    const R = Reflect.get(
      i,
      s,
      // if this is a proxy wrapping a ref, return methods using the raw ref
      // as receiver so that we don't have to call `toRaw` on the ref in all
      // its class methods
      Tt(i) ? i : d
    );
    return (Vt(s) ? ga.has(s) : Cu(s)) || (h || fr(i, "get", s), g) ? R : Tt(R) ? O && po(s) ? R : R.value : yn(R) ? h ? Ra(R) : Oa(R) : R;
  }
}
class Au extends ya {
  constructor(i = !1) {
    super(!1, i);
  }
  set(i, s, d, h) {
    let g = i[s];
    if (!this._isShallow) {
      const C = Rt(g);
      if (!Qr(d) && !Rt(d) && (g = ve(g), d = ve(d)), !Pt(i) && Tt(g) && !Tt(d))
        return C ? !1 : (g.value = d, !0);
    }
    const O = Pt(i) && po(s) ? Number(s) < i.length : so(i, s), R = Reflect.set(
      i,
      s,
      d,
      Tt(i) ? i : h
    );
    return i === ve(h) && (O ? St(d, g) && Zr(i, "set", s, d, g) : Zr(i, "add", s, d)), R;
  }
  deleteProperty(i, s) {
    const d = so(i, s), h = i[s], g = Reflect.deleteProperty(i, s);
    return g && d && Zr(i, "delete", s, void 0, h), g;
  }
  has(i, s) {
    const d = Reflect.has(i, s);
    return (!Vt(s) || !ga.has(s)) && fr(i, "has", s), d;
  }
  ownKeys(i) {
    return fr(
      i,
      "iterate",
      Pt(i) ? "length" : ct
    ), Reflect.ownKeys(i);
  }
}
class Wu extends ya {
  constructor(i = !1) {
    super(!0, i);
  }
  set(i, s) {
    return Ze.NODE_ENV !== "production" && Ot(
      `Set operation on key "${String(s)}" failed: target is readonly.`,
      i
    ), !0;
  }
  deleteProperty(i, s) {
    return Ze.NODE_ENV !== "production" && Ot(
      `Delete operation on key "${String(s)}" failed: target is readonly.`,
      i
    ), !0;
  }
}
const Mu = /* @__PURE__ */ new Au(), _u = /* @__PURE__ */ new Wu(), yo = (r) => r, En = (r) => Reflect.getPrototypeOf(r);
function hn(r, i, s = !1, d = !1) {
  r = r.__v_raw;
  const h = ve(r), g = ve(i);
  s || (St(i, g) && fr(h, "get", i), fr(h, "get", g));
  const { has: O } = En(h), R = d ? yo : s ? Eo : cr;
  if (O.call(h, i))
    return R(r.get(i));
  if (O.call(h, g))
    return R(r.get(g));
  r !== h && r.get(i);
}
function pn(r, i = !1) {
  const s = this.__v_raw, d = ve(s), h = ve(r);
  return i || (St(r, h) && fr(d, "has", r), fr(d, "has", h)), r === h ? s.has(r) : s.has(r) || s.has(h);
}
function vn(r, i = !1) {
  return r = r.__v_raw, !i && fr(ve(r), "iterate", ct), Reflect.get(r, "size", r);
}
function Yi(r, i = !1) {
  !i && !Qr(r) && !Rt(r) && (r = ve(r));
  const s = ve(this);
  return En(s).has.call(s, r) || (s.add(r), Zr(s, "add", r, r)), this;
}
function Zi(r, i, s = !1) {
  !s && !Qr(i) && !Rt(i) && (i = ve(i));
  const d = ve(this), { has: h, get: g } = En(d);
  let O = h.call(d, r);
  O ? Ze.NODE_ENV !== "production" && ba(d, h, r) : (r = ve(r), O = h.call(d, r));
  const R = g.call(d, r);
  return d.set(r, i), O ? St(i, R) && Zr(d, "set", r, i, R) : Zr(d, "add", r, i), this;
}
function Qi(r) {
  const i = ve(this), { has: s, get: d } = En(i);
  let h = s.call(i, r);
  h ? Ze.NODE_ENV !== "production" && ba(i, s, r) : (r = ve(r), h = s.call(i, r));
  const g = d ? d.call(i, r) : void 0, O = i.delete(r);
  return h && Zr(i, "delete", r, void 0, g), O;
}
function Xi() {
  const r = ve(this), i = r.size !== 0, s = Ze.NODE_ENV !== "production" ? $t(r) ? new Map(r) : new Set(r) : void 0, d = r.clear();
  return i && Zr(r, "clear", void 0, void 0, s), d;
}
function wn(r, i) {
  return function(d, h) {
    const g = this, O = g.__v_raw, R = ve(O), C = i ? yo : r ? Eo : cr;
    return !r && fr(R, "iterate", ct), O.forEach((L, b) => d.call(h, C(L), C(b), g));
  };
}
function mn(r, i, s) {
  return function(...d) {
    const h = this.__v_raw, g = ve(h), O = $t(g), R = r === "entries" || r === Symbol.iterator && O, C = r === "keys" && O, L = h[r](...d), b = s ? yo : i ? Eo : cr;
    return !i && fr(
      g,
      "iterate",
      C ? fo : ct
    ), {
      // iterator protocol
      next() {
        const { value: _, done: M } = L.next();
        return M ? { value: _, done: M } : {
          value: R ? [b(_[0]), b(_[1])] : b(_),
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
function Yr(r) {
  return function(...i) {
    if (Ze.NODE_ENV !== "production") {
      const s = i[0] ? `on key "${i[0]}" ` : "";
      Ot(
        `${Pu(r)} operation ${s}failed: target is readonly.`,
        ve(this)
      );
    }
    return r === "delete" ? !1 : r === "clear" ? void 0 : this;
  };
}
function Fu() {
  const r = {
    get(g) {
      return hn(this, g);
    },
    get size() {
      return vn(this);
    },
    has: pn,
    add: Yi,
    set: Zi,
    delete: Qi,
    clear: Xi,
    forEach: wn(!1, !1)
  }, i = {
    get(g) {
      return hn(this, g, !1, !0);
    },
    get size() {
      return vn(this);
    },
    has: pn,
    add(g) {
      return Yi.call(this, g, !0);
    },
    set(g, O) {
      return Zi.call(this, g, O, !0);
    },
    delete: Qi,
    clear: Xi,
    forEach: wn(!1, !0)
  }, s = {
    get(g) {
      return hn(this, g, !0);
    },
    get size() {
      return vn(this, !0);
    },
    has(g) {
      return pn.call(this, g, !0);
    },
    add: Yr("add"),
    set: Yr("set"),
    delete: Yr("delete"),
    clear: Yr("clear"),
    forEach: wn(!0, !1)
  }, d = {
    get(g) {
      return hn(this, g, !0, !0);
    },
    get size() {
      return vn(this, !0);
    },
    has(g) {
      return pn.call(this, g, !0);
    },
    add: Yr("add"),
    set: Yr("set"),
    delete: Yr("delete"),
    clear: Yr("clear"),
    forEach: wn(!0, !0)
  };
  return [
    "keys",
    "values",
    "entries",
    Symbol.iterator
  ].forEach((g) => {
    r[g] = mn(g, !1, !1), s[g] = mn(g, !0, !1), i[g] = mn(g, !1, !0), d[g] = mn(
      g,
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
  zu,
  Lu,
  ju,
  Uu
] = /* @__PURE__ */ Fu();
function Ea(r, i) {
  const s = i ? r ? Uu : ju : r ? Lu : zu;
  return (d, h, g) => h === "__v_isReactive" ? !r : h === "__v_isReadonly" ? r : h === "__v_raw" ? d : Reflect.get(
    so(s, h) && h in d ? s : d,
    h,
    g
  );
}
const Bu = {
  get: /* @__PURE__ */ Ea(!1, !1)
}, $u = {
  get: /* @__PURE__ */ Ea(!0, !1)
};
function ba(r, i, s) {
  const d = ve(s);
  if (d !== s && i.call(r, d)) {
    const h = fa(r);
    Ot(
      `Reactive ${h} contains both the raw and reactive versions of the same object${h === "Map" ? " as keys" : ""}, which can lead to inconsistencies. Avoid differentiating between the raw and reactive versions of an object and only use the reactive version if possible.`
    );
  }
}
const Pa = /* @__PURE__ */ new WeakMap(), qu = /* @__PURE__ */ new WeakMap(), Ta = /* @__PURE__ */ new WeakMap(), Hu = /* @__PURE__ */ new WeakMap();
function Vu(r) {
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
function Gu(r) {
  return r.__v_skip || !Object.isExtensible(r) ? 0 : Vu(fa(r));
}
function Oa(r) {
  return Rt(r) ? r : Sa(
    r,
    !1,
    Mu,
    Bu,
    Pa
  );
}
function Ra(r) {
  return Sa(
    r,
    !0,
    _u,
    $u,
    Ta
  );
}
function Sa(r, i, s, d, h) {
  if (!yn(r))
    return Ze.NODE_ENV !== "production" && Ot(
      `value cannot be made ${i ? "readonly" : "reactive"}: ${String(
        r
      )}`
    ), r;
  if (r.__v_raw && !(i && r.__v_isReactive))
    return r;
  const g = h.get(r);
  if (g)
    return g;
  const O = Gu(r);
  if (O === 0)
    return r;
  const R = new Proxy(
    r,
    O === 2 ? d : s
  );
  return h.set(r, R), R;
}
function Rt(r) {
  return !!(r && r.__v_isReadonly);
}
function Qr(r) {
  return !!(r && r.__v_isShallow);
}
function Ju(r) {
  return r ? !!r.__v_raw : !1;
}
function ve(r) {
  const i = r && r.__v_raw;
  return i ? ve(i) : r;
}
const cr = (r) => yn(r) ? Oa(r) : r, Eo = (r) => yn(r) ? Ra(r) : r;
function Tt(r) {
  return r ? r.__v_isRef === !0 : !1;
}
function Rr(r) {
  return Ku(r, !1);
}
function Ku(r, i) {
  return Tt(r) ? r : new Yu(r, i);
}
class Yu {
  constructor(i, s) {
    this.dep = new wa(), this.__v_isRef = !0, this.__v_isShallow = !1, this._rawValue = s ? i : ve(i), this._value = s ? i : cr(i), this.__v_isShallow = s;
  }
  get value() {
    return Ze.NODE_ENV !== "production" ? this.dep.track({
      target: this,
      type: "get",
      key: "value"
    }) : this.dep.track(), this._value;
  }
  set value(i) {
    const s = this._rawValue, d = this.__v_isShallow || Qr(i) || Rt(i);
    i = d ? i : ve(i), St(i, s) && (this._rawValue = i, this._value = d ? i : cr(i), Ze.NODE_ENV !== "production" ? this.dep.trigger({
      target: this,
      type: "set",
      key: "value",
      newValue: i,
      oldValue: s
    }) : this.dep.trigger());
  }
}
function Zu() {
  const r = /* @__PURE__ */ new Set(), i = (h) => {
    r.delete(h);
  };
  return {
    on: (h) => (r.add(h), {
      off: () => i(h)
    }),
    off: i,
    trigger: (...h) => Promise.all(Array.from(r).map((g) => g(...h)))
  };
}
async function Qu(r) {
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
var Xu = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, xa = { exports: {} };
(function(r, i) {
  (function(s, d) {
    r.exports = d();
  })(typeof self < "u" ? self : Xu, function() {
    return function(s) {
      var d = {};
      function h(g) {
        if (d[g]) return d[g].exports;
        var O = d[g] = {
          i: g,
          l: !1,
          exports: {}
        };
        return s[g].call(O.exports, O, O.exports, h), O.l = !0, O.exports;
      }
      return h.m = s, h.c = d, h.d = function(g, O, R) {
        h.o(g, O) || Object.defineProperty(g, O, {
          enumerable: !0,
          get: R
        });
      }, h.r = function(g) {
        typeof Symbol < "u" && Symbol.toStringTag && Object.defineProperty(g, Symbol.toStringTag, {
          value: "Module"
        }), Object.defineProperty(g, "__esModule", {
          value: !0
        });
      }, h.t = function(g, O) {
        if (1 & O && (g = h(g)), 8 & O || 4 & O && typeof g == "object" && g && g.__esModule) return g;
        var R = /* @__PURE__ */ Object.create(null);
        if (h.r(R), Object.defineProperty(R, "default", {
          enumerable: !0,
          value: g
        }), 2 & O && typeof g != "string") for (var C in g) h.d(R, C, (function(L) {
          return g[L];
        }).bind(null, C));
        return R;
      }, h.n = function(g) {
        var O = g && g.__esModule ? function() {
          return g.default;
        } : function() {
          return g;
        };
        return h.d(O, "a", O), O;
      }, h.o = function(g, O) {
        return {}.hasOwnProperty.call(g, O);
      }, h.p = "", h(h.s = 0);
    }([function(s, d, h) {
      h.r(d), h.d(d, "PopupOpenError", function() {
        return Mn;
      }), h.d(d, "create", function() {
        return ts;
      }), h.d(d, "destroy", function() {
        return ns;
      }), h.d(d, "destroyComponents", function() {
        return Ri;
      }), h.d(d, "destroyAll", function() {
        return Si;
      }), h.d(d, "PROP_TYPE", function() {
        return ge;
      }), h.d(d, "PROP_SERIALIZATION", function() {
        return cn;
      }), h.d(d, "CONTEXT", function() {
        return Ne;
      }), h.d(d, "EVENT", function() {
        return Te;
      });
      function g(e, t) {
        return (g = Object.setPrototypeOf || function(n, o) {
          return n.__proto__ = o, n;
        })(e, t);
      }
      function O(e, t) {
        e.prototype = Object.create(t.prototype), e.prototype.constructor = e, g(e, t);
      }
      function R() {
        return (R = Object.assign || function(e) {
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
      var L = [], b = [], _ = 0, M;
      function oe() {
        if (!_ && M) {
          var e = M;
          M = null, e.resolve();
        }
      }
      function xe() {
        _ += 1;
      }
      function tr() {
        _ -= 1, oe();
      }
      var T = function() {
        function e(n) {
          var o = this;
          if (this.resolved = void 0, this.rejected = void 0, this.errorHandled = void 0, this.value = void 0, this.error = void 0, this.handlers = void 0, this.dispatching = void 0, this.stack = void 0, this.resolved = !1, this.rejected = !1, this.errorHandled = !1, this.handlers = [], n) {
            var a, u, c = !1, l = !1, f = !1;
            xe();
            try {
              n(function(v) {
                f ? o.resolve(v) : (c = !0, a = v);
              }, function(v) {
                f ? o.reject(v) : (l = !0, u = v);
              });
            } catch (v) {
              tr(), this.reject(v);
              return;
            }
            tr(), f = !0, c ? this.resolve(a) : l && this.reject(u);
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
              if (L.indexOf(u) === -1) {
                L.push(u), setTimeout(function() {
                  throw u;
                }, 1);
                for (var l = 0; l < b.length; l++) b[l](u, c);
              }
            }(n, o);
          }, 1), this.dispatch(), this;
        }, t.asyncReject = function(n) {
          return this.errorHandled = !0, this.reject(n), this;
        }, t.dispatch = function() {
          var n = this.resolved, o = this.rejected, a = this.handlers;
          if (!this.dispatching && (n || o)) {
            this.dispatching = !0, xe();
            for (var u = function(m, E) {
              return m.then(function(P) {
                E.resolve(P);
              }, function(P) {
                E.reject(P);
              });
            }, c = 0; c < a.length; c++) {
              var l = a[c], f = l.onSuccess, v = l.onError, y = l.promise, w = void 0;
              if (n) try {
                w = f ? f(this.value) : this.value;
              } catch (m) {
                y.reject(m);
                continue;
              }
              else if (o) {
                if (!v) {
                  y.reject(this.error);
                  continue;
                }
                try {
                  w = v(this.error);
                } catch (m) {
                  y.reject(m);
                  continue;
                }
              }
              if (w instanceof e && (w.resolved || w.rejected)) {
                var p = w;
                p.resolved ? y.resolve(p.value) : y.reject(p.error), p.errorHandled = !0;
              } else C(w) ? w instanceof e && (w.resolved || w.rejected) ? w.resolved ? y.resolve(w.value) : y.reject(w.error) : u(w, y) : y.resolve(w);
            }
            a.length = 0, this.dispatching = !1, tr();
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
          for (var c = function(v, y, w) {
            return y.then(function(p) {
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
            return b.push(o), {
              cancel: function() {
                b.splice(b.indexOf(o), 1);
              }
            };
          }(n);
        }, e.try = function(n, o, a) {
          if (n && typeof n != "function" && !n.call) throw new Error("Promise.try expected a function");
          var u;
          xe();
          try {
            u = n.apply(o, a || []);
          } catch (c) {
            return tr(), e.reject(c);
          }
          return tr(), e.resolve(u);
        }, e.delay = function(n) {
          return new e(function(o) {
            setTimeout(o, n);
          });
        }, e.isPromise = function(n) {
          return !!(n && n instanceof e) || C(n);
        }, e.flush = function() {
          return function(n) {
            var o = M = M || new n();
            return oe(), o;
          }(e);
        }, e;
      }();
      function xr(e) {
        return {}.toString.call(e) === "[object RegExp]";
      }
      var we = {
        IFRAME: "iframe",
        POPUP: "popup"
      }, Fe = `Call was rejected by callee.\r
`;
      function Er(e) {
        return e === void 0 && (e = window), e.location.protocol;
      }
      function $e(e) {
        if (e === void 0 && (e = window), e.mockDomain) {
          var t = e.mockDomain.split("//")[0];
          if (t) return t;
        }
        return Er(e);
      }
      function be(e) {
        return e === void 0 && (e = window), $e(e) === "about:";
      }
      function me(e) {
        if (e === void 0 && (e = window), e) try {
          if (e.parent && e.parent !== e) return e.parent;
        } catch {
        }
      }
      function H(e) {
        if (e === void 0 && (e = window), e && !me(e)) try {
          return e.opener;
        } catch {
        }
      }
      function $(e) {
        try {
          return !0;
        } catch {
        }
        return !1;
      }
      function J(e) {
        e === void 0 && (e = window);
        var t = e.location;
        if (!t) throw new Error("Can not read window location");
        var n = Er(e);
        if (!n) throw new Error("Can not read window protocol");
        if (n === "file:") return "file://";
        if (n === "about:") {
          var o = me(e);
          return o && $() ? J(o) : "about://";
        }
        var a = t.host;
        if (!a) throw new Error("Can not read window host");
        return n + "//" + a;
      }
      function D(e) {
        e === void 0 && (e = window);
        var t = J(e);
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
            if (be(t) && $()) return !0;
          } catch {
          }
          try {
            if (function(o) {
              return o === void 0 && (o = window), $e(o) === "mock:";
            }(t) && $()) return !0;
          } catch {
          }
          try {
            if (J(t) === J(window)) return !0;
          } catch {
          }
          return !1;
        }(e)) return !1;
        try {
          if (e === window || be(e) && $() || D(window) === D(e)) return !0;
        } catch {
        }
        return !1;
      }
      function ce(e) {
        if (!U(e)) throw new Error("Expected window to be same domain");
        return e;
      }
      function ze(e, t) {
        if (!e || !t) return !1;
        var n = me(t);
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
      function Qe(e) {
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
      function Le(e) {
        for (var t = [], n = 0, o = Qe(e); n < o.length; n++) {
          var a = o[n];
          t.push(a);
          for (var u = 0, c = Le(a); u < c.length; u++) t.push(c[u]);
        }
        return t;
      }
      function er(e) {
        e === void 0 && (e = window);
        try {
          if (e.top) return e.top;
        } catch {
        }
        if (me(e) === e) return e;
        try {
          if (ze(window, e) && window.top) return window.top;
        } catch {
        }
        try {
          if (ze(e, window) && window.top) return window.top;
        } catch {
        }
        for (var t = 0, n = Le(e); t < n.length; t++) {
          var o = n[t];
          try {
            if (o.top) return o.top;
          } catch {
          }
          if (me(o) === o) return o;
        }
      }
      function Xr(e) {
        var t = er(e);
        if (!t) throw new Error("Can not determine top window");
        var n = [].concat(Le(t), [t]);
        return n.indexOf(e) === -1 && (n = [].concat(n, [e], Le(e))), n;
      }
      var dt = [], kr = [];
      function De(e, t) {
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
          return !a || a.message !== Fe;
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
          for (var c = 0; c < a.length; c++) try {
            if (a[c] === u) return c;
          } catch {
          }
          return -1;
        }(dt, e);
        if (n !== -1) {
          var o = kr[n];
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
      function xt(e) {
        return (e = e || window).navigator.mockUserAgent || e.navigator.userAgent;
      }
      function ft(e, t) {
        for (var n = Qe(e), o = 0; o < n.length; o++) {
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
      function Gt(e, t) {
        return e === H(t);
      }
      function Lr(e) {
        return e === void 0 && (e = window), H(e = e || window) || me(e) || void 0;
      }
      function bn(e, t) {
        for (var n = 0; n < e.length; n++)
          for (var o = e[n], a = 0; a < t.length; a++) if (o === t[a]) return !0;
        return !1;
      }
      function Pn(e) {
        e === void 0 && (e = window);
        for (var t = 0, n = e; n; ) (n = me(n)) && (t += 1);
        return t;
      }
      function Jt(e, t) {
        var n = er(e) || e, o = er(t) || t;
        try {
          if (n && o) return n === o;
        } catch {
        }
        var a = Xr(e), u = Xr(t);
        if (bn(a, u)) return !0;
        var c = H(n), l = H(o);
        return c && bn(Xr(c), u) || l && bn(Xr(l), a), !1;
      }
      function lr(e, t) {
        if (typeof e == "string") {
          if (typeof t == "string") return e === "*" || t === e;
          if (xr(t) || Array.isArray(t)) return !1;
        }
        return xr(e) ? xr(t) ? e.toString() === t.toString() : !Array.isArray(t) && !!t.match(e) : !!Array.isArray(e) && (Array.isArray(t) ? JSON.stringify(e) === JSON.stringify(t) : !xr(t) && e.some(function(n) {
          return lr(n, t);
        }));
      }
      function Ir(e) {
        return e.match(/^(https?|mock|file):\/\//) ? e.split("/").slice(0, 3).join("/") : D();
      }
      function bo(e, t, n, o) {
        n === void 0 && (n = 1e3), o === void 0 && (o = 1 / 0);
        var a;
        return function u() {
          if (De(e))
            return a && clearTimeout(a), t();
          o <= 0 ? clearTimeout(a) : (o -= n, a = setTimeout(u, n));
        }(), {
          cancel: function() {
            a && clearTimeout(a);
          }
        };
      }
      function et(e) {
        try {
          if (e === window) return !0;
        } catch (t) {
          if (t && t.message === Fe) return !0;
        }
        try {
          if ({}.toString.call(e) === "[object Window]") return !0;
        } catch (t) {
          if (t && t.message === Fe) return !0;
        }
        try {
          if (window.Window && e instanceof window.Window) return !0;
        } catch (t) {
          if (t && t.message === Fe) return !0;
        }
        try {
          if (e && e.self === e) return !0;
        } catch (t) {
          if (t && t.message === Fe) return !0;
        }
        try {
          if (e && e.parent === e) return !0;
        } catch (t) {
          if (t && t.message === Fe) return !0;
        }
        try {
          if (e && e.top === e) return !0;
        } catch (t) {
          if (t && t.message === Fe) return !0;
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
      function Tn(e) {
        if (t = Ir(e), t.indexOf("mock:") !== 0) return e;
        var t;
        throw new Error("Mock urls not supported out of test mode");
      }
      function Po(e) {
        if (U(e)) return ce(e).frameElement;
        for (var t = 0, n = document.querySelectorAll("iframe"); t < n.length; t++) {
          var o = n[t];
          if (o && o.contentWindow && o.contentWindow === e) return o;
        }
      }
      function To(e) {
        if (function(n) {
          return n === void 0 && (n = window), !!me(n);
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
      function Kt(e, t) {
        for (var n = 0; n < e.length; n++) try {
          if (e[n] === t) return n;
        } catch {
        }
        return -1;
      }
      var Yt = function() {
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
            if (et(u) && De(u)) {
              if (n) try {
                n.delete(u);
              } catch {
              }
              o.splice(a, 1), this.values.splice(a, 1), a -= 1;
            }
          }
        }, t.isSafeToReadWrite = function(n) {
          return !et(n);
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
          var l = this.keys, f = this.values, v = Kt(l, n);
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
          var u = Kt(this.keys, n);
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
          var u = this.keys, c = Kt(u, n);
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
          return this._cleanupClosedWindows(), Kt(this.keys, n) !== -1;
        }, t.getOrSet = function(n, o) {
          if (this.has(n)) return this.get(n);
          var a = o();
          return this.set(n, a), a;
        }, e;
      }();
      function Oo(e) {
        return (Oo = Object.setPrototypeOf ? Object.getPrototypeOf : function(t) {
          return t.__proto__ || Object.getPrototypeOf(t);
        })(e);
      }
      function Na() {
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
        return (Ro = Na() ? Reflect.construct : function(o, a, u) {
          var c = [null];
          c.push.apply(c, a);
          var l = new (Function.bind.apply(o, c))();
          return u && g(l, u.prototype), l;
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
            return Ro(n, arguments, Oo(this).constructor);
          }
          return a.prototype = Object.create(n.prototype, {
            constructor: {
              value: a,
              enumerable: !1,
              writable: !0,
              configurable: !0
            }
          }), g(a, n);
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
      function Rn(e) {
        return e.name || e.__name__ || e.displayName || "anonymous";
      }
      function Sn(e, t) {
        try {
          delete e.name, e.name = t;
        } catch {
        }
        return e.__name__ = e.displayName = t, e;
      }
      function xn(e) {
        if (typeof btoa == "function") return btoa(encodeURIComponent(e).replace(/%([0-9A-F]{2})/g, function(t, n) {
          return String.fromCharCode(parseInt(n, 16));
        })).replace(/[=]/g, "");
        if (typeof Buffer < "u") return Buffer.from(e, "utf8").toString("base64").replace(/[=]/g, "");
        throw new Error("Can not find window.btoa or Buffer");
      }
      function nr() {
        var e = "0123456789abcdef";
        return "uid_" + "xxxxxxxxxx".replace(/./g, function() {
          return e.charAt(Math.floor(Math.random() * e.length));
        }) + "_" + xn((/* @__PURE__ */ new Date()).toISOString().slice(11, 19).replace("T", ".")).replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
      }
      var Zt;
      function Dn(e) {
        try {
          return JSON.stringify([].slice.call(e), function(t, n) {
            return typeof n == "function" ? "memoize[" + function(o) {
              if (Zt = Zt || new Yt(), o == null || typeof o != "object" && typeof o != "function") throw new Error("Invalid object");
              var a = Zt.get(o);
              return a || (a = typeof o + ":" + nr(), Zt.set(o, a)), a;
            }(n) + "]" : On(n) ? {} : n;
          });
        } catch {
          throw new Error("Arguments not serializable -- can not be used to memoize");
        }
      }
      function Ca() {
        return {};
      }
      var Dt = 0, xo = 0;
      function jr(e, t) {
        t === void 0 && (t = {});
        var n = t.thisNamespace, o = n !== void 0 && n, a = t.time, u, c, l = Dt;
        Dt += 1;
        var f = function() {
          for (var v = arguments.length, y = new Array(v), w = 0; w < v; w++) y[w] = arguments[w];
          l < xo && (u = null, c = null, l = Dt, Dt += 1);
          var p;
          p = o ? (c = c || new Yt()).getOrSet(this, Ca) : u = u || {};
          var m;
          try {
            m = Dn(y);
          } catch {
            return e.apply(this, arguments);
          }
          var E = p[m];
          if (E && a && Date.now() - E.time < a && (delete p[m], E = null), E) return E.value;
          var P = Date.now(), S = e.apply(this, arguments);
          return p[m] = {
            time: P,
            value: S
          }, S;
        };
        return f.reset = function() {
          u = null, c = null;
        }, Sn(f, (t.name || Rn(e)) + "::memoized");
      }
      jr.clear = function() {
        xo = Dt;
      };
      function Ia(e) {
        var t = {};
        function n() {
          for (var o = arguments, a = this, u = arguments.length, c = new Array(u), l = 0; l < u; l++) c[l] = arguments[l];
          var f = Dn(c);
          return t.hasOwnProperty(f) || (t[f] = T.try(function() {
            return e.apply(a, o);
          }).finally(function() {
            delete t[f];
          })), t[f];
        }
        return n.reset = function() {
          t = {};
        }, Sn(n, Rn(e) + "::promiseMemoized");
      }
      function Pe() {
      }
      function Qt(e) {
        var t = !1;
        return Sn(function() {
          if (!t)
            return t = !0, e.apply(this, arguments);
        }, Rn(e) + "::once");
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
      function Xt(e) {
        return typeof e == "string" ? e : e && e.toString && typeof e.toString == "function" ? e.toString() : {}.toString.call(e);
      }
      function ht(e, t) {
        if (!t) return e;
        if (Object.assign) return Object.assign(e, t);
        for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n]);
        return e;
      }
      jr(function(e) {
        if (Object.values) return Object.values(e);
        var t = [];
        for (var n in e) e.hasOwnProperty(n) && t.push(e[n]);
        return t;
      });
      function Aa(e) {
        return e;
      }
      function Nt(e, t) {
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
      function Nn(e) {
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
      function No(e) {
        return typeof (t = e) == "object" && t !== null && {}.toString.call(e) === "[object Object]";
        var t;
      }
      function In(e) {
        if (!No(e)) return !1;
        var t = e.constructor;
        if (typeof t != "function") return !1;
        var n = t.prototype;
        return !!No(n) && !!n.hasOwnProperty("isPrototypeOf");
      }
      function kt(e, t, n) {
        if (n === void 0 && (n = ""), Array.isArray(e)) {
          for (var o = e.length, a = [], u = function(y) {
            Do(a, y, function() {
              var w = n ? n + "." + y : "" + y, p = t(e[y], y, w);
              return (In(p) || Array.isArray(p)) && (p = kt(p, t, w)), p;
            });
          }, c = 0; c < o; c++) u(c);
          return a;
        }
        if (In(e)) {
          var l = {}, f = function(y) {
            if (!e.hasOwnProperty(y)) return 1;
            Do(l, y, function() {
              var w = n ? n + "." + y : "" + y, p = t(e[y], y, w);
              return (In(p) || Array.isArray(p)) && (p = kt(p, t, w)), p;
            });
          };
          for (var v in e) f(v);
          return l;
        }
        throw new Error("Pass an object or array");
      }
      function Ur(e) {
        return e != null;
      }
      function An(e) {
        return {}.toString.call(e) === "[object RegExp]";
      }
      function Ct(e, t, n) {
        if (e.hasOwnProperty(t)) return e[t];
        var o = n();
        return e[t] = o, o;
      }
      function en(e) {
        var t = [], n = !1, o, a = {
          set: function(u, c) {
            return n || (e[u] = c, a.register(function() {
              delete e[u];
            })), c;
          },
          register: function(u) {
            var c = Qt(function() {
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
            return T.all(c).then(Pe);
          }
        };
        return a;
      }
      function rn(e, t) {
        if (t == null) throw new Error("Expected " + e + " to be present");
        return t;
      }
      var Wa = function(e) {
        O(t, e);
        function t(n) {
          var o;
          return (o = e.call(this, n) || this).name = o.constructor.name, typeof Error.captureStackTrace == "function" ? Error.captureStackTrace(function(a) {
            if (a === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return a;
          }(o), o.constructor) : o.stack = new Error(n).stack, o;
        }
        return t;
      }(So(Error));
      function Co() {
        var e = document.body;
        if (!e) throw new Error("Body element not found");
        return e;
      }
      function tn() {
        return !!document.body && document.readyState === "complete";
      }
      function Io() {
        return !!document.body && document.readyState === "interactive";
      }
      function Ao(e) {
        return encodeURIComponent(e);
      }
      jr(function() {
        return new T(function(e) {
          if (tn() || Io()) return e();
          var t = setInterval(function() {
            if (tn() || Io())
              return clearInterval(t), e();
          }, 10);
        });
      });
      function Wo(e) {
        return function(t, n, o) {
          o === void 0 && (o = []);
          var a = t.__inline_memoize_cache__ = t.__inline_memoize_cache__ || {}, u = Dn(o);
          return a.hasOwnProperty(u) ? a[u] : a[u] = (function() {
            var c = {};
            if (!e || e.indexOf("=") === -1) return c;
            for (var l = 0, f = e.split("&"); l < f.length; l++) {
              var v = f[l];
              (v = v.split("="))[0] && v[1] && (c[decodeURIComponent(v[0])] = decodeURIComponent(v[1]));
            }
            return c;
          }).apply(void 0, o);
        }(Wo, 0, [e]);
      }
      function Mo(e, t) {
        return t === void 0 && (t = {}), t && Object.keys(t).length ? function(n) {
          return n === void 0 && (n = {}), Object.keys(n).filter(function(o) {
            return typeof n[o] == "string" || typeof n[o] == "boolean";
          }).map(function(o) {
            var a = n[o];
            if (typeof a != "string" && typeof a != "boolean") throw new TypeError("Invalid type for query");
            return Ao(o) + "=" + Ao(a.toString());
          }).join("&");
        }(R({}, Wo(e), t)) : e;
      }
      function Ma(e, t) {
        e.appendChild(t);
      }
      function Wn(e, t) {
        return t === void 0 && (t = document), On(e) ? e : typeof e == "string" ? t.querySelector(e) : void 0;
      }
      function _o(e) {
        return new T(function(t, n) {
          var o = Xt(e), a = Wn(e);
          if (a) return t(a);
          if (tn()) return n(new Error("Document is ready and element " + o + " does not exist"));
          var u = setInterval(function() {
            if (a = Wn(e))
              t(a), clearInterval(u);
            else if (tn())
              return clearInterval(u), n(new Error("Document is ready and element " + o + " does not exist"));
          }, 10);
        });
      }
      var Mn = function(e) {
        O(t, e);
        function t() {
          return e.apply(this, arguments) || this;
        }
        return t;
      }(Wa), nn;
      function Fo(e) {
        if ((nn = nn || new Yt()).has(e)) {
          var t = nn.get(e);
          if (t) return t;
        }
        var n = new T(function(o, a) {
          e.addEventListener("load", function() {
            (function(u) {
              if (function() {
                for (var c = 0; c < dt.length; c++) {
                  var l = !1;
                  try {
                    l = dt[c].closed;
                  } catch {
                  }
                  l && (kr.splice(c, 1), dt.splice(c, 1));
                }
              }(), u && u.contentWindow) try {
                dt.push(u.contentWindow), kr.push(u);
              } catch {
              }
            })(e), o(e);
          }), e.addEventListener("error", function(u) {
            e.contentWindow ? o(e) : a(u);
          });
        });
        return nn.set(e, n), n;
      }
      function _n(e) {
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
          if (c.style && ht(f.style, c.style), c.class && (f.className = c.class.join(" ")), c.id && f.setAttribute("id", c.id), c.attributes) for (var v = 0, y = Object.keys(c.attributes); v < y.length; v++) {
            var w = y[v];
            f.setAttribute(w, c.attributes[w]);
          }
          if (c.styleSheet && function(p, m, E) {
            E === void 0 && (E = window.document), p.styleSheet ? p.styleSheet.cssText = m : p.appendChild(E.createTextNode(m));
          }(f, c.styleSheet), c.html) {
            if (u === "iframe") throw new Error("Iframe html can not be written unless container provided and iframe in DOM");
            f.innerHTML = c.html;
          }
          return f;
        }("iframe", {
          attributes: R({
            allowTransparency: "true"
          }, e.attributes || {}),
          style: R({
            backgroundColor: "transparent",
            border: "none"
          }, n),
          html: e.html,
          class: e.class
        }), a = window.navigator.userAgent.match(/MSIE|Edge/i);
        return o.hasAttribute("id") || o.setAttribute("id", nr()), Fo(o), (e.url || a) && o.setAttribute("src", e.url || "about:blank"), o;
      }
      function Lo(e, t, n) {
        return e.addEventListener(t, n), {
          cancel: function() {
            e.removeEventListener(t, n);
          }
        };
      }
      function _a(e) {
        e.style.setProperty("display", "");
      }
      function jo(e) {
        e.style.setProperty("display", "none", "important");
      }
      function It(e) {
        e && e.parentNode && e.parentNode.removeChild(e);
      }
      function pt(e) {
        return !(e && e.parentNode && e.ownerDocument && e.ownerDocument.documentElement && e.ownerDocument.documentElement.contains(e));
      }
      function Uo(e, t, n) {
        var o = n === void 0 ? {} : n, a = o.width, u = a === void 0 || a, c = o.height, l = c === void 0 || c, f = o.interval, v = f === void 0 ? 100 : f, y = o.win, w = y === void 0 ? window : y, p = e.offsetWidth, m = e.offsetHeight, E = !1;
        t({
          width: p,
          height: m
        });
        var P = function() {
          if (!E && function(A) {
            return !!(A.offsetWidth || A.offsetHeight || A.getClientRects().length);
          }(e)) {
            var F = e.offsetWidth, K = e.offsetHeight;
            (u && F !== p || l && K !== m) && t({
              width: F,
              height: K
            }), p = F, m = K;
          }
        }, S, I;
        return w.addEventListener("resize", P), w.ResizeObserver !== void 0 ? ((S = new w.ResizeObserver(P)).observe(e), I = Nt(P, 10 * v)) : w.MutationObserver !== void 0 ? ((S = new w.MutationObserver(P)).observe(e, {
          attributes: !0,
          childList: !0,
          subtree: !0,
          characterData: !1
        }), I = Nt(P, 10 * v)) : I = Nt(P, v), {
          cancel: function() {
            E = !0, S.disconnect(), window.removeEventListener("resize", P), I.cancel();
          }
        };
      }
      function Fn(e) {
        for (; e.parentNode; ) e = e.parentNode;
        return e.toString() === "[object ShadowRoot]";
      }
      var on = typeof document < "u" ? document.currentScript : null, Fa = jr(function() {
        if (on || (on = function() {
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
        }())) return on;
        throw new Error("Can not determine current script");
      }), za = nr();
      jr(function() {
        var e;
        try {
          e = Fa();
        } catch {
          return za;
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
        } else t = nr();
        return e.setAttribute("data-uid-auto", t), t;
      });
      function Bo(e) {
        return typeof e == "string" && /^[0-9]+%$/.test(e);
      }
      function zn(e) {
        if (typeof e == "number") return e;
        var t = e.match(/^([0-9]+)(px|%)$/);
        if (!t) throw new Error("Could not match css value from " + e);
        return parseInt(t[1], 10);
      }
      function $o(e) {
        return zn(e) + "px";
      }
      function qo(e) {
        return typeof e == "number" ? $o(e) : Bo(e) ? e : $o(e);
      }
      function Ho(e, t) {
        if (typeof e == "number") return e;
        if (Bo(e)) return parseInt(t * zn(e) / 100, 10);
        if (typeof (n = e) == "string" && /^[0-9]+px$/.test(n)) return zn(e);
        var n;
        throw new Error("Can not normalize dimension: " + e);
      }
      function Dr(e) {
        e === void 0 && (e = window);
        var t = "__post_robot_11_0_0__";
        return e !== window ? e[t] : e[t] = e[t] || {};
      }
      var Vo = function() {
        return {};
      };
      function le(e, t) {
        return e === void 0 && (e = "store"), t === void 0 && (t = Vo), Ct(Dr(), e, function() {
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
              return Ct(n, o, a);
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
      var La = function() {
      };
      function an() {
        var e = Dr();
        return e.WINDOW_WILDCARD = e.WINDOW_WILDCARD || new La(), e.WINDOW_WILDCARD;
      }
      function rr(e, t) {
        return e === void 0 && (e = "store"), t === void 0 && (t = Vo), le("windowStore").getOrSet(e, function() {
          var n = new Yt(), o = function(a) {
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
              return Ct(o(a), e, u);
            }
          };
        });
      }
      function Jo() {
        return le("instance").getOrSet("instanceID", nr);
      }
      function Ko(e, t) {
        var n = t.domain, o = rr("helloPromises"), a = o.get(e);
        a && a.resolve({
          domain: n
        });
        var u = T.resolve({
          domain: n
        });
        return o.set(e, u), u;
      }
      function Ln(e, t) {
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
        return rr("windowInstanceIDPromises").getOrSet(e, function() {
          return Ln(e, {
            send: n
          }).then(function(o) {
            return o.instanceID;
          });
        });
      }
      function Zo(e, t, n) {
        t === void 0 && (t = 5e3), n === void 0 && (n = "Window");
        var o = function(a) {
          return rr("helloPromises").getOrSet(a, function() {
            return new T();
          });
        }(e);
        return t !== -1 && (o = o.timeout(t, new Error(n + " did not load after " + t + "ms"))), o;
      }
      function Qo(e) {
        rr("knownWindows").set(e, !0);
      }
      function jn(e) {
        return typeof e == "object" && e !== null && typeof e.__type__ == "string";
      }
      function Xo(e) {
        return e === void 0 ? "undefined" : e === null ? "null" : Array.isArray(e) ? "array" : typeof e == "function" ? "function" : typeof e == "object" ? e instanceof Error ? "error" : typeof e.then == "function" ? "promise" : {}.toString.call(e) === "[object RegExp]" ? "regex" : {}.toString.call(e) === "[object Date]" ? "date" : "object" : typeof e == "string" ? "string" : typeof e == "number" ? "number" : typeof e == "boolean" ? "boolean" : void 0;
      }
      function rt(e, t) {
        return {
          __type__: e,
          __val__: t
        };
      }
      var hr, ja = ((hr = {}).function = function() {
      }, hr.error = function(e) {
        return rt("error", {
          message: e.message,
          stack: e.stack,
          code: e.code,
          data: e.data
        });
      }, hr.promise = function() {
      }, hr.regex = function(e) {
        return rt("regex", e.source);
      }, hr.date = function(e) {
        return rt("date", e.toJSON());
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
      }, hr[void 0] = function(e) {
        return rt("undefined", e);
      }, hr), Ua = {}, pr, Ba = ((pr = {}).function = function() {
        throw new Error("Function serialization is not implemented; nothing to deserialize");
      }, pr.error = function(e) {
        var t = e.stack, n = e.code, o = e.data, a = new Error(e.message);
        return a.code = n, o && (a.data = o), a.stack = t + `

` + a.stack, a;
      }, pr.promise = function() {
        throw new Error("Promise serialization is not implemented; nothing to deserialize");
      }, pr.regex = function(e) {
        return new RegExp(e);
      }, pr.date = function(e) {
        return new Date(e);
      }, pr.array = function(e) {
        return e;
      }, pr.object = function(e) {
        return e;
      }, pr.string = function(e) {
        return e;
      }, pr.number = function(e) {
        return e;
      }, pr.boolean = function(e) {
        return e;
      }, pr.null = function(e) {
        return e;
      }, pr[void 0] = function() {
      }, pr), $a = {};
      function Un() {
        return !!xt(window).match(/MSIE|trident|edge\/12|edge\/13/i);
      }
      function ko(e) {
        return !Jt(window, e);
      }
      function ei(e, t) {
        if (e) {
          if (D() !== Ir(e)) return !0;
        } else if (t && !U(t)) return !0;
        return !1;
      }
      function ri(e) {
        var t = e.win, n = e.domain;
        return !(!Un() || n && !ei(n, t) || t && !ko(t));
      }
      function Bn(e) {
        return "__postrobot_bridge___" + (e = e || Ir(e)).replace(/[^a-zA-Z0-9]+/g, "_");
      }
      function ti() {
        return !!(window.name && window.name === Bn(D()));
      }
      var qa = new T(function(e) {
        if (window.document && window.document.body) return e(window.document.body);
        var t = setInterval(function() {
          if (window.document && window.document.body)
            return clearInterval(t), e(window.document.body);
        }, 10);
      });
      function ni(e) {
        rr("remoteWindowPromises").getOrSet(e, function() {
          return new T();
        });
      }
      function $n(e) {
        var t = rr("remoteWindowPromises").get(e);
        if (!t) throw new Error("Remote window promise not found");
        return t;
      }
      function oi(e, t, n) {
        $n(e).resolve(function(o, a, u) {
          if (o !== e) throw new Error("Remote window does not match window");
          if (!lr(a, t)) throw new Error("Remote domain " + a + " does not match domain " + t);
          n.fireAndForget(u);
        });
      }
      function qn(e, t) {
        $n(e).reject(t).catch(Pe);
      }
      function sn(e) {
        for (var t = e.win, n = e.name, o = e.domain, a = le("popupWindowsByName"), u = rr("popupWindowsByWin"), c = 0, l = a.keys(); c < l.length; c++) {
          var f = l[c], v = a.get(f);
          v && !De(v.win) || a.del(f);
        }
        if (De(t)) return {
          win: t,
          name: n,
          domain: o
        };
        var y = u.getOrSet(t, function() {
          return n ? a.getOrSet(n, function() {
            return {
              win: t,
              name: n
            };
          }) : {
            win: t
          };
        });
        if (y.win && y.win !== t) throw new Error("Different window already linked for window: " + (n || "undefined"));
        return n && (y.name = n, a.set(n, y)), o && (y.domain = o, ni(t)), u.set(t, y), y;
      }
      function ii(e) {
        var t = e.on, n = e.send, o = e.receiveMessage;
        a = window.open, window.open = function(u, c, l, f) {
          var v = a.call(this, Tn(u), c, l, f);
          return v && (sn({
            win: v,
            name: c,
            domain: u ? Ir(u) : null
          }), v);
        };
        var a;
        (function(u) {
          var c = u.on, l = u.send, f = u.receiveMessage, v = le("popupWindowsByName");
          c("postrobot_open_tunnel", function(y) {
            var w = y.source, p = y.origin, m = y.data, E = le("bridges").get(p);
            if (!E) throw new Error("Can not find bridge promise for domain " + p);
            return E.then(function(P) {
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
                sendMessage: function(I) {
                  if (window && !window.closed && S()) {
                    var F = S().domain;
                    if (F) try {
                      f({
                        data: I,
                        origin: F,
                        source: S().win
                      }, {
                        on: c,
                        send: l
                      });
                    } catch (K) {
                      T.reject(K);
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
          Dr(window).openTunnelToParent = function(l) {
            var f = l.name, v = l.source, y = l.canary, w = l.sendMessage, p = le("tunnelWindows"), m = me(window);
            if (!m) throw new Error("No parent window found to open tunnel to");
            var E = function(P) {
              var S = P.name, I = P.source, F = P.canary, K = P.sendMessage;
              (function() {
                for (var V = le("tunnelWindows"), z = 0, ee = V.keys(); z < ee.length; z++) {
                  var q = ee[z];
                  De(V[q].source) && V.del(q);
                }
              })();
              var A = nr();
              return le("tunnelWindows").set(A, {
                name: S,
                source: I,
                canary: F,
                sendMessage: K
              }), A;
            }({
              name: f,
              source: v,
              canary: y,
              sendMessage: w
            });
            return c(m, "postrobot_open_tunnel", {
              name: f,
              sendMessage: function() {
                var P = p.get(E);
                if (P && P.source && !De(P.source)) {
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
            var v = H(window);
            if (v && ri({
              win: v
            })) {
              return ni(v), (y = v, rr("remoteBridgeAwaiters").getOrSet(y, function() {
                return T.try(function() {
                  var w = ft(y, Bn(D()));
                  if (w) return U(w) && Dr(ce(w)) ? w : new T(function(p) {
                    var m, E;
                    m = setInterval(function() {
                      if (w && U(w) && Dr(ce(w)))
                        return clearInterval(m), clearTimeout(E), p(w);
                    }, 100), E = setTimeout(function() {
                      return clearInterval(m), p();
                    }, 2e3);
                  });
                });
              })).then(function(w) {
                return w ? window.name ? Dr(ce(w)).openTunnelToParent({
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
                  var m = p.source, E = p.origin, P = p.data;
                  if (m !== v) throw new Error("Source does not match opener");
                  oi(m, E, P.sendMessage);
                }).catch(function(p) {
                  throw qn(v, p), p;
                }) : qn(v, new Error("Can not register with opener: window does not have a name")) : qn(v, new Error("Can not register with opener: no bridge found in opener"));
              });
              var y;
            }
          });
        }({
          on: t,
          send: n,
          receiveMessage: o
        });
      }
      function Hn() {
        for (var e = le("idToProxyWindow"), t = 0, n = e.keys(); t < n.length; t++) {
          var o = n[t];
          e.get(o).shouldClean() && e.del(o);
        }
      }
      function ai(e, t) {
        var n = t.send, o = t.id, a = o === void 0 ? nr() : o, u = e.then(function(f) {
          if (U(f)) return ce(f).name;
        }), c = e.then(function(f) {
          if (De(f)) throw new Error("Window is closed, can not determine type");
          return H(f) ? we.POPUP : we.IFRAME;
        });
        u.catch(Pe), c.catch(Pe);
        var l = function() {
          return e.then(function(f) {
            if (!De(f)) return U(f) ? ce(f).name : u;
          });
        };
        return {
          id: a,
          getType: function() {
            return c;
          },
          getInstanceID: Ia(function() {
            return e.then(function(f) {
              return Yo(f, {
                send: n
              });
            });
          }),
          close: function() {
            return e.then(To);
          },
          getName: l,
          focus: function() {
            return e.then(function(f) {
              f.focus();
            });
          },
          isClosed: function() {
            return e.then(function(f) {
              return De(f);
            });
          },
          setLocation: function(f, v) {
            return v === void 0 && (v = {}), e.then(function(y) {
              var w = window.location.protocol + "//" + window.location.host, p = v.method, m = p === void 0 ? "get" : p, E = v.body;
              if (f.indexOf("/") === 0) f = "" + w + f;
              else if (!f.match(/^https?:\/\//) && f.indexOf(w) !== 0) throw new Error("Expected url to be http or https url, or absolute path, got " + JSON.stringify(f));
              if (m === "post") return l().then(function(P) {
                if (!P) throw new Error("Can not post to window without target name");
                (function(S) {
                  var I = S.url, F = S.target, K = S.body, A = S.method, V = A === void 0 ? "post" : A, z = document.createElement("form");
                  if (z.setAttribute("target", F), z.setAttribute("method", V), z.setAttribute("action", I), z.style.display = "none", K) for (var ee = 0, q = Object.keys(K); ee < q.length; ee++) {
                    var de, ie = q[ee], Z = document.createElement("input");
                    Z.setAttribute("name", ie), Z.setAttribute("value", (de = K[ie]) == null ? void 0 : de.toString()), z.appendChild(Z);
                  }
                  Co().appendChild(z), z.submit(), Co().removeChild(z);
                })({
                  url: f,
                  target: P,
                  method: m,
                  body: E
                });
              });
              if (m !== "get") throw new Error("Unsupported method: " + m);
              if (U(y)) try {
                if (y.location && typeof y.location.replace == "function") {
                  y.location.replace(f);
                  return;
                }
              } catch {
              }
              y.location = f;
            });
          },
          setName: function(f) {
            return e.then(function(v) {
              sn({
                win: v,
                name: f
              });
              var y = U(v), w = Po(v);
              if (!y) throw new Error("Can not set name for cross-domain window: " + f);
              ce(v).name = f, w && w.setAttribute("name", f), u = T.resolve(f);
            });
          }
        };
      }
      var vr = function() {
        function e(n) {
          var o = n.send, a = n.win, u = n.serializedWindow;
          this.id = void 0, this.isProxyWindow = !0, this.serializedWindow = void 0, this.actualWindow = void 0, this.actualWindowPromise = void 0, this.send = void 0, this.name = void 0, this.actualWindowPromise = new T(), this.serializedWindow = u || ai(this.actualWindowPromise, {
            send: o
          }), le("idToProxyWindow").set(this.getID(), this), a && this.setWindow(a, {
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
            return n === we.POPUP;
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
          }), rr("winToProxyWindow").set(n, this);
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
          return !!(this.actualWindow && De(this.actualWindow));
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
          return Hn(), le("idToProxyWindow").get(n.id) || new e({
            serializedWindow: n,
            send: a
          });
        }, e.isProxyWindow = function(n) {
          return !!(n && !et(n) && n.isProxyWindow);
        }, e.toProxyWindow = function(n, o) {
          var a = o.send;
          if (Hn(), e.isProxyWindow(n)) return n;
          var u = n;
          return rr("winToProxyWindow").get(u) || new e({
            win: u,
            send: a
          });
        }, e;
      }();
      function Vn(e, t, n, o, a) {
        var u = rr("methodStore"), c = le("proxyWindowMethods");
        vr.isProxyWindow(o) ? c.set(e, {
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
        var n = rr("methodStore"), o = le("proxyWindowMethods");
        return n.getOrSet(e, function() {
          return {};
        })[t] || o.get(t);
      }
      function ui(e, t, n, o, a) {
        c = (u = {
          on: a.on,
          send: a.send
        }).on, l = u.send, le("builtinListeners").getOrSet("functionCalls", function() {
          return c("postrobot_method", {
            domain: "*"
          }, function(y) {
            var w = y.source, p = y.origin, m = y.data, E = m.id, P = m.name, S = si(w, E);
            if (!S) throw new Error("Could not find method '" + P + "' with id: " + m.id + " in " + D(window));
            var I = S.source, F = S.domain, K = S.val;
            return T.try(function() {
              if (!lr(F, p)) throw new Error("Method '" + m.name + "' domain " + JSON.stringify(An(S.domain) ? S.domain.source : S.domain) + " does not match origin " + p + " in " + D(window));
              if (vr.isProxyWindow(I)) return I.matchWindow(w, {
                send: l
              }).then(function(A) {
                if (!A) throw new Error("Method call '" + m.name + "' failed - proxy window does not match source in " + D(window));
              });
            }).then(function() {
              return K.apply({
                source: w,
                origin: p
              }, m.args);
            }, function(A) {
              return T.try(function() {
                if (K.onError) return K.onError(A);
              }).then(function() {
                throw A.stack && (A.stack = "Remote call to " + P + "(" + function(V) {
                  return V === void 0 && (V = []), Cn(V).map(function(z) {
                    return typeof z == "string" ? "'" + z + "'" : z === void 0 ? "undefined" : z === null ? "null" : typeof z == "boolean" ? z.toString() : Array.isArray(z) ? "[ ... ]" : typeof z == "object" ? "{ ... }" : typeof z == "function" ? "() => { ... }" : "<" + typeof z + ">";
                  }).join(", ");
                }(m.args) + `) failed

` + A.stack), A;
              });
            }).then(function(A) {
              return {
                result: A,
                id: E,
                name: P
              };
            });
          });
        });
        var u, c, l, f = n.__id__ || nr();
        e = vr.unwrap(e);
        var v = n.__name__ || n.name || o;
        return typeof v == "string" && typeof v.indexOf == "function" && v.indexOf("anonymous::") === 0 && (v = v.replace("anonymous::", o + "::")), vr.isProxyWindow(e) ? (Vn(f, n, v, e, t), e.awaitWindow().then(function(y) {
          Vn(f, n, v, y, t);
        })) : Vn(f, n, v, e, t), rt("cross_domain_function", {
          id: f,
          name: v
        });
      }
      function ci(e, t, n, o) {
        var a, u = o.on, c = o.send;
        return function(l, f) {
          f === void 0 && (f = Ua);
          var v = JSON.stringify(l, function(y) {
            var w = this[y];
            if (jn(this)) return w;
            var p = Xo(w);
            if (!p) return w;
            var m = f[p] || ja[p];
            return m ? m(w, y) : w;
          });
          return v === void 0 ? "undefined" : v;
        }(n, ((a = {}).promise = function(l, f) {
          return function(v, y, w, p, m) {
            return rt("cross_domain_zalgo_promise", {
              then: ui(v, y, function(E, P) {
                return w.then(E, P);
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
          return et(l) || vr.isProxyWindow(l) ? rt("cross_domain_window", vr.serialize(l, {
            send: c
          })) : l;
        }, a));
      }
      function di(e, t, n, o) {
        var a, u = o.send;
        return function(c, l) {
          if (l === void 0 && (l = $a), c !== "undefined") return JSON.parse(c, function(f, v) {
            if (jn(this)) return v;
            var y, w;
            if (jn(v) ? (y = v.__type__, w = v.__val__) : (y = Xo(v), w = v), !y) return w;
            var p = l[y] || Ba[y];
            return p ? p(w, f) : w;
          });
        }(n, ((a = {}).cross_domain_zalgo_promise = function(c) {
          return function(l, f, v) {
            return new T(v.then);
          }(0, 0, c);
        }, a.cross_domain_function = function(c) {
          return function(l, f, v, y) {
            var w = v.id, p = v.name, m = y.send, E = function(S) {
              S === void 0 && (S = {});
              function I() {
                var F = arguments;
                return vr.toProxyWindow(l, {
                  send: m
                }).awaitWindow().then(function(K) {
                  var A = si(K, w);
                  if (A && A.val !== I) return A.val.apply({
                    source: window,
                    origin: D()
                  }, F);
                  var V = [].slice.call(F);
                  return S.fireAndForget ? m(K, "postrobot_method", {
                    id: w,
                    name: p,
                    args: V
                  }, {
                    domain: f,
                    fireAndForget: !0
                  }) : m(K, "postrobot_method", {
                    id: w,
                    name: p,
                    args: V
                  }, {
                    domain: f,
                    fireAndForget: !1
                  }).then(function(z) {
                    return z.data.result;
                  });
                }).catch(function(K) {
                  throw K;
                });
              }
              return I.__name__ = p, I.__origin__ = f, I.__source__ = l, I.__id__ = w, I.origin = f, I;
            }, P = E();
            return P.fireAndForget = E({
              fireAndForget: !0
            }), P;
          }(e, t, c, {
            send: u
          });
        }, a.cross_domain_window = function(c) {
          return vr.deserialize(c, {
            send: u
          });
        }, a));
      }
      var At = {};
      At.postrobot_post_message = function(e, t, n) {
        n.indexOf("file:") === 0 && (n = "*"), e.postMessage(t, n);
      }, At.postrobot_bridge = function(e, t, n) {
        if (!Un() && !ti()) throw new Error("Bridge not needed for browser");
        if (U(e)) throw new Error("Post message through bridge disabled between same domain windows");
        if (Jt(window, e) !== !1) throw new Error("Can only use bridge to communicate between two different windows, not between frames");
        (function(o, a, u) {
          var c = Gt(window, o), l = Gt(o, window);
          if (!c && !l) throw new Error("Can only send messages to and from parent and popup windows");
          $n(o).then(function(f) {
            return f(o, a, u);
          });
        })(e, n, t);
      }, At.postrobot_global = function(e, t) {
        if (!xt(window).match(/MSIE|rv:11|trident|edge\/12|edge\/13/i)) throw new Error("Global messaging not needed for browser");
        if (!U(e)) throw new Error("Post message through global disabled between different domain windows");
        if (Jt(window, e) !== !1) throw new Error("Can only use global to communicate between two different windows, not between frames");
        var n = Dr(e);
        if (!n) throw new Error("Can not find postRobot global on foreign window");
        n.receiveMessage({
          source: window,
          origin: D(),
          data: t
        });
      };
      function Gn(e, t, n, o) {
        var a = o.on, u = o.send;
        return T.try(function() {
          var c = rr().getOrSet(e, function() {
            return {};
          });
          return c.buffer = c.buffer || [], c.buffer.push(n), c.flush = c.flush || T.flush().then(function() {
            if (De(e)) throw new Error("Window is closed");
            var l = ci(e, t, ((f = {}).__post_robot_11_0_0__ = c.buffer || [], f), {
              on: a,
              send: u
            }), f;
            delete c.buffer;
            for (var v = Object.keys(At), y = [], w = 0; w < v.length; w++) {
              var p = v[w];
              try {
                At[p](e, l, t);
              } catch (m) {
                y.push(m);
              }
            }
            if (y.length === v.length) throw new Error(`All post-robot messaging strategies failed:

` + y.map(function(m, E) {
              return E + ". " + lt(m);
            }).join(`

`));
          }), c.flush.then(function() {
            delete c.flush;
          });
        }).then(Pe);
      }
      function fi(e) {
        return le("responseListeners").get(e);
      }
      function li(e) {
        le("responseListeners").del(e);
      }
      function hi(e) {
        return le("erroredResponseListeners").has(e);
      }
      function pi(e) {
        var t = e.name, n = e.win, o = e.domain, a = rr("requestListeners");
        if (n === "*" && (n = null), o === "*" && (o = null), !t) throw new Error("Name required to get request listener");
        for (var u = 0, c = [n, an()]; u < c.length; u++) {
          var l = c[u];
          if (l) {
            var f = a.get(l);
            if (f) {
              var v = f[t];
              if (v) {
                if (o && typeof o == "string") {
                  if (v[o]) return v[o];
                  if (v.__domain_regex__) for (var y = 0, w = v.__domain_regex__; y < w.length; y++) {
                    var p = w[y], m = p.listener;
                    if (lr(p.regex, o)) return m;
                  }
                }
                if (v["*"]) return v["*"];
              }
            }
          }
        }
      }
      function Jn(e, t) {
        var n = t.on, o = t.send, a = le("receivedMessages");
        try {
          if (!window || window.closed || !e.source) return;
        } catch {
          return;
        }
        var u = e.source, c = e.origin, l = function(w, p, m, E) {
          var P = E.on, S = E.send, I;
          try {
            I = di(p, m, w, {
              on: P,
              send: S
            });
          } catch {
            return;
          }
          if (I && typeof I == "object" && I !== null) {
            var F = I.__post_robot_11_0_0__;
            if (Array.isArray(F)) return F;
          }
        }(e.data, u, c, {
          on: n,
          send: o
        });
        if (l) {
          Qo(u);
          for (var f, v = function() {
            var w = l[y];
            if (a.has(w.id)) return {
              v: void 0
            };
            if (a.set(w.id, !0), De(u) && !w.fireAndForget) return {
              v: void 0
            };
            w.origin.indexOf("file:") === 0 && (c = "file://");
            try {
              w.type === "postrobot_message_request" ? function(p, m, E, P) {
                var S = P.on, I = P.send, F = pi({
                  name: E.name,
                  win: p,
                  domain: m
                }), K = E.name === "postrobot_method" && E.data && typeof E.data.name == "string" ? E.data.name + "()" : E.name;
                function A(V, z, ee) {
                  return T.flush().then(function() {
                    if (!E.fireAndForget && !De(p)) try {
                      return Gn(p, m, {
                        id: nr(),
                        origin: D(window),
                        type: "postrobot_message_response",
                        hash: E.hash,
                        name: E.name,
                        ack: V,
                        data: z,
                        error: ee
                      }, {
                        on: S,
                        send: I
                      });
                    } catch (q) {
                      throw new Error("Send response message failed for " + K + " in " + D() + `

` + lt(q));
                    }
                  });
                }
                T.all([T.flush().then(function() {
                  if (!E.fireAndForget && !De(p)) try {
                    return Gn(p, m, {
                      id: nr(),
                      origin: D(window),
                      type: "postrobot_message_ack",
                      hash: E.hash,
                      name: E.name
                    }, {
                      on: S,
                      send: I
                    });
                  } catch (V) {
                    throw new Error("Send ack message failed for " + K + " in " + D() + `

` + lt(V));
                  }
                }), T.try(function() {
                  if (!F) throw new Error("No handler found for post message: " + E.name + " from " + m + " in " + window.location.protocol + "//" + window.location.host + window.location.pathname);
                  return F.handler({
                    source: p,
                    origin: m,
                    data: E.data
                  });
                }).then(function(V) {
                  return A("success", V);
                }, function(V) {
                  return A("error", null, V);
                })]).then(Pe).catch(function(V) {
                  if (F && F.handleError) return F.handleError(V);
                  throw V;
                });
              }(u, c, w, {
                on: n,
                send: o
              }) : w.type === "postrobot_message_response" ? function(p, m, E) {
                if (!hi(E.hash)) {
                  var P = fi(E.hash);
                  if (!P) throw new Error("No handler found for post message response for message: " + E.name + " from " + m + " in " + window.location.protocol + "//" + window.location.host + window.location.pathname);
                  if (!lr(P.domain, m)) throw new Error("Response origin " + m + " does not match domain " + (S = P.domain, Array.isArray(S) ? "(" + S.join(" | ") + ")" : xr(S) ? "RegExp(" + S.toString() + ")" : S.toString()));
                  var S;
                  if (p !== P.win) throw new Error("Response source does not match registered window");
                  li(E.hash), E.ack === "error" ? P.promise.reject(E.error) : E.ack === "success" && P.promise.resolve({
                    source: p,
                    origin: m,
                    data: E.data
                  });
                }
              }(u, c, w) : w.type === "postrobot_message_ack" && function(p, m, E) {
                if (!hi(E.hash)) {
                  var P = fi(E.hash);
                  if (!P) throw new Error("No handler found for post message ack for message: " + E.name + " from " + m + " in " + window.location.protocol + "//" + window.location.host + window.location.pathname);
                  try {
                    if (!lr(P.domain, m)) throw new Error("Ack origin " + m + " does not match domain " + P.domain.toString());
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
          }, y = 0; y < l.length; y++) if (f = v()) return f.v;
        }
      }
      function Ar(e, t, n) {
        if (!e) throw new Error("Expected name");
        if (typeof (t = t || {}) == "function" && (n = t, t = {}), !n) throw new Error("Expected handler");
        var o = function a(u, c) {
          var l = u.name, f = u.win, v = u.domain, y = rr("requestListeners");
          if (!l || typeof l != "string") throw new Error("Name required to add request listener");
          if (f && f !== "*" && vr.isProxyWindow(f)) {
            var w = f.awaitWindow().then(function(de) {
              return a({
                name: l,
                win: de,
                domain: v
              }, c);
            });
            return {
              cancel: function() {
                w.then(function(de) {
                  return de.cancel();
                }, Pe);
              }
            };
          }
          var p = f;
          if (Array.isArray(p)) {
            for (var m = [], E = 0, P = p; E < P.length; E++) m.push(a({
              name: l,
              domain: v,
              win: P[E]
            }, c));
            return {
              cancel: function() {
                for (var de = 0; de < m.length; de++) m[de].cancel();
              }
            };
          }
          if (Array.isArray(v)) {
            for (var S = [], I = 0, F = v; I < F.length; I++) S.push(a({
              name: l,
              win: p,
              domain: F[I]
            }, c));
            return {
              cancel: function() {
                for (var de = 0; de < S.length; de++) S[de].cancel();
              }
            };
          }
          var K = pi({
            name: l,
            win: p,
            domain: v
          });
          p && p !== "*" || (p = an());
          var A = (v = v || "*").toString();
          if (K) throw p && v ? new Error("Request listener already exists for " + l + " on domain " + v.toString() + " for " + (p === an() ? "wildcard" : "specified") + " window") : p ? new Error("Request listener already exists for " + l + " for " + (p === an() ? "wildcard" : "specified") + " window") : v ? new Error("Request listener already exists for " + l + " on domain " + v.toString()) : new Error("Request listener already exists for " + l);
          var V = y.getOrSet(p, function() {
            return {};
          }), z = Ct(V, l, function() {
            return {};
          }), ee, q;
          return An(v) ? (ee = Ct(z, "__domain_regex__", function() {
            return [];
          })).push(q = {
            regex: v,
            listener: c
          }) : z[A] = c, {
            cancel: function() {
              delete z[A], q && (ee.splice(ee.indexOf(q, 1)), ee.length || delete z.__domain_regex__), Object.keys(z).length || delete V[l], p && !Object.keys(V).length && y.del(p);
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
      var Pr = function e(t, n, o, a) {
        var u = (a = a || {}).domain || "*", c = a.timeout || -1, l = a.timeout || 5e3, f = a.fireAndForget || !1;
        return vr.toProxyWindow(t, {
          send: e
        }).awaitWindow().then(function(v) {
          return T.try(function() {
            if (function(y, w, p) {
              if (!y) throw new Error("Expected name");
              if (p && typeof p != "string" && !Array.isArray(p) && !An(p)) throw new TypeError("Can not send " + y + ". Expected domain " + JSON.stringify(p) + " to be a string, array, or regex");
              if (De(w)) throw new Error("Can not send " + y + ". Target window is closed");
            }(n, v, u), function(y, w) {
              var p = Lr(w);
              if (p) return p === y;
              if (w === y || er(w) === w) return !1;
              for (var m = 0, E = Qe(y); m < E.length; m++) if (E[m] === w) return !0;
              return !1;
            }(window, v)) return Zo(v, l);
          }).then(function(y) {
            return function(w, p, m, E) {
              var P = E.send;
              return T.try(function() {
                return typeof p == "string" ? p : T.try(function() {
                  return m || Ln(w, {
                    send: P
                  }).then(function(S) {
                    return S.domain;
                  });
                }).then(function(S) {
                  if (!lr(p, p)) throw new Error("Domain " + Xt(p) + " does not match " + Xt(p));
                  return S;
                });
              });
            }(v, u, (y === void 0 ? {} : y).domain, {
              send: e
            });
          }).then(function(y) {
            var w = y, p = n === "postrobot_method" && o && typeof o.name == "string" ? o.name + "()" : n, m = new T(), E = n + "_" + nr();
            if (!f) {
              var P = {
                name: n,
                win: v,
                domain: w,
                promise: m
              };
              (function(z, ee) {
                le("responseListeners").set(z, ee);
              })(E, P);
              var S = rr("requestPromises").getOrSet(v, function() {
                return [];
              });
              S.push(m), m.catch(function() {
                (function(z) {
                  le("erroredResponseListeners").set(z, !0);
                })(E), li(E);
              });
              var I = function(z) {
                return rr("knownWindows").get(z, !1);
              }(v) ? 1e4 : 2e3, F = c, K = I, A = F, V = Nt(function() {
                return De(v) ? m.reject(new Error("Window closed for " + n + " before " + (P.ack ? "response" : "ack"))) : P.cancelled ? m.reject(new Error("Response listener was cancelled for " + n)) : (K = Math.max(K - 500, 0), A !== -1 && (A = Math.max(A - 500, 0)), P.ack || K !== 0 ? A === 0 ? m.reject(new Error("No response for postMessage " + p + " in " + D() + " in " + F + "ms")) : void 0 : m.reject(new Error("No ack for postMessage " + p + " in " + D() + " in " + I + "ms")));
              }, 500);
              m.finally(function() {
                V.cancel(), S.splice(S.indexOf(m, 1));
              }).catch(Pe);
            }
            return Gn(v, w, {
              id: nr(),
              origin: D(window),
              type: "postrobot_message_request",
              hash: E,
              name: n,
              data: o,
              fireAndForget: f
            }, {
              on: Ar,
              send: e
            }).then(function() {
              return f ? m.resolve() : m;
            }, function(z) {
              throw new Error("Send request message failed for " + p + " in " + D() + `

` + lt(z));
            });
          });
        });
      };
      function Wt(e) {
        return vr.toProxyWindow(e, {
          send: Pr
        });
      }
      function vi(e) {
        for (var t = 0, n = rr("requestPromises").get(e, []); t < n.length; t++) n[t].reject(new Error("Window " + (De(e) ? "closed" : "cleaned up") + " before response")).catch(Pe);
      }
      var Br;
      Br = {
        setupBridge: ii,
        openBridge: function(e, t) {
          var n = le("bridges"), o = le("bridgeFrames");
          return t = t || Ir(e), n.getOrSet(t, function() {
            return T.try(function() {
              if (D() === t) throw new Error("Can not open bridge on the same domain as current domain: " + t);
              var a = Bn(t);
              if (ft(window, a)) throw new Error("Frame with name " + a + " already exists on page");
              var u = function(c, l) {
                var f = document.createElement("iframe");
                return f.setAttribute("name", c), f.setAttribute("id", c), f.setAttribute("style", "display: none; margin: 0; padding: 0; border: 0px none; overflow: hidden;"), f.setAttribute("frameborder", "0"), f.setAttribute("border", "0"), f.setAttribute("scrolling", "no"), f.setAttribute("allowTransparency", "true"), f.setAttribute("tabindex", "-1"), f.setAttribute("hidden", "true"), f.setAttribute("title", ""), f.setAttribute("role", "presentation"), f.src = l, f;
              }(a, e);
              return o.set(t, u), qa.then(function(c) {
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
        linkWindow: sn,
        linkUrl: function(e, t) {
          sn({
            win: e,
            domain: Ir(t)
          });
        },
        isBridge: ti,
        needsBridge: ri,
        needsBridgeForBrowser: Un,
        hasBridge: function(e, t) {
          return le("bridges").has(t || Ir(e));
        },
        needsBridgeForWin: ko,
        needsBridgeForDomain: ei,
        destroyBridges: function() {
          for (var e = le("bridges"), t = le("bridgeFrames"), n = 0, o = t.keys(); n < o.length; n++) {
            var a = t.get(o[n]);
            a && a.parentNode && a.parentNode.removeChild(a);
          }
          t.reset(), e.reset();
        }
      };
      function Mt(e) {
        if (!U(e)) throw new Error("Can not get global for window on different domain");
        return e.__zoid_10_3_3__ || (e.__zoid_10_3_3__ = {}), e.__zoid_10_3_3__;
      }
      function wi(e, t) {
        try {
          return t(Mt(e));
        } catch {
        }
      }
      function un(e) {
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
      function Ha(e) {
        return xn(JSON.stringify(e));
      }
      function Kn(e) {
        var t = Mt(e);
        return t.references = t.references || {}, t.references;
      }
      function mi(e) {
        var t = e.data, n = e.metaData, o = e.sender, a = e.receiver, u = e.passByReference, c = u !== void 0 && u, l = e.basic, f = l !== void 0 && l, v = Wt(a.win), y = f ? JSON.stringify(t) : ci(v, a.domain, t, {
          on: Ar,
          send: Pr
        }), w = c ? function(p) {
          var m = nr();
          return Kn(window)[m] = p, {
            type: "uid",
            uid: m
          };
        }(y) : {
          type: "raw",
          val: y
        };
        return {
          serializedData: Ha({
            sender: {
              domain: o.domain
            },
            metaData: n,
            reference: w
          }),
          cleanReference: function() {
            p = window, (m = w).type === "uid" && delete Kn(p)[m.uid];
            var p, m;
          }
        };
      }
      function gi(e) {
        var t = e.sender, n = e.basic, o = n !== void 0 && n, a = function(y) {
          return JSON.parse(function(w) {
            if (typeof atob == "function") return decodeURIComponent([].map.call(atob(w), function(p) {
              return "%" + ("00" + p.charCodeAt(0).toString(16)).slice(-2);
            }).join(""));
            if (typeof Buffer < "u") return Buffer.from(w, "base64").toString("utf8");
            throw new Error("Can not find window.atob or Buffer");
          }(y));
        }(e.data), u = a.reference, c = a.metaData, l;
        l = typeof t.win == "function" ? t.win({
          metaData: c
        }) : t.win;
        var f;
        f = typeof t.domain == "function" ? t.domain({
          metaData: c
        }) : typeof t.domain == "string" ? t.domain : a.sender.domain;
        var v = function(y, w) {
          if (w.type === "raw") return w.val;
          if (w.type === "uid") return Kn(y)[w.uid];
          throw new Error("Unsupported ref type: " + w.type);
        }(l, u);
        return {
          data: o ? JSON.parse(v) : function(y, w, p) {
            return di(y, w, p, {
              on: Ar,
              send: Pr
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
      var ge = {
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
      }, Ne = we, Te = {
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
      function Yn(e) {
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
      var Va = jr(function(e) {
        var t = gi({
          data: Yn(e).serializedInitialPayload,
          sender: {
            win: function(n) {
              return function(o) {
                if (o.type === "opener") return rn("opener", H(window));
                if (o.type === "parent" && typeof o.distance == "number") return rn("parent", function(w, p) {
                  return p === void 0 && (p = 1), function(m, E) {
                    E === void 0 && (E = 1);
                    for (var P = m, S = 0; S < E; S++) {
                      if (!P) return;
                      P = me(P);
                    }
                    return P;
                  }(w, Pn(w) - p);
                }(window, o.distance));
                if (o.type === "global" && o.uid && typeof o.uid == "string") {
                  var a = o.uid, u = Lr(window);
                  if (!u) throw new Error("Can not find ancestor window");
                  for (var c = 0, l = Xr(u); c < l.length; c++) {
                    var f = l[c];
                    if (U(f)) {
                      var v = wi(f, function(w) {
                        return w.windows && w.windows[a];
                      });
                      if (v) return v;
                    }
                  }
                } else if (o.type === "name") {
                  var y = o.name;
                  return rn("namedWindow", function(w, p) {
                    return ft(w, p) || function m(E, P) {
                      var S = ft(E, P);
                      if (S) return S;
                      for (var I = 0, F = Qe(E); I < F.length; I++) {
                        var K = m(F[I], P);
                        if (K) return K;
                      }
                    }(er(w) || w, p);
                  }(rn("ancestor", Lr(window)), y));
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
        return Va(window.name);
      }
      function Ga(e, t) {
        if (t === void 0 && (t = window), e === me(t)) return {
          type: "parent",
          distance: Pn(e)
        };
        if (e === H(t)) return {
          type: "opener"
        };
        if (U(e) && (o = e, o !== er(o))) {
          var n = ce(e).name;
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
      function Ja() {
        return T.try(function() {
          window.focus();
        });
      }
      function Pi() {
        return T.try(function() {
          window.close();
        });
      }
      var Wr = function() {
        return Pe;
      }, tt = function(e) {
        return Qt(e.value);
      };
      function Zn(e, t, n) {
        for (var o = 0, a = Object.keys(R({}, e, t)); o < a.length; o++) {
          var u = a[o];
          n(u, t[u], e[u]);
        }
      }
      function Ti(e, t, n) {
        var o = {};
        return T.all(function(a, u, c) {
          var l = [];
          return Zn(a, u, function(f, v, y) {
            var w = function(p, m, E) {
              return T.resolve().then(function() {
                var P, S;
                if (E != null && m) {
                  var I = (P = {}, P.get = m.queryParam, P.post = m.bodyParam, P)[n], F = (S = {}, S.get = m.queryValue, S.post = m.bodyValue, S)[n];
                  if (I) return T.hash({
                    finalParam: T.try(function() {
                      return typeof I == "function" ? I({
                        value: E
                      }) : typeof I == "string" ? I : p;
                    }),
                    finalValue: T.try(function() {
                      return typeof F == "function" && Ur(E) ? F({
                        value: E
                      }) : E;
                    })
                  }).then(function(K) {
                    var A = K.finalParam, V = K.finalValue, z;
                    if (typeof V == "boolean") z = V.toString();
                    else if (typeof V == "string") z = V.toString();
                    else if (typeof V == "object" && V !== null) {
                      if (m.serialization === cn.JSON) z = JSON.stringify(V);
                      else if (m.serialization === cn.BASE64) z = xn(JSON.stringify(V));
                      else if (m.serialization === cn.DOTIFY || !m.serialization) {
                        z = function ie(Z, G, ue) {
                          G === void 0 && (G = ""), ue === void 0 && (ue = {}), G = G && G + ".";
                          for (var re in Z) Z.hasOwnProperty(re) && Z[re] != null && typeof Z[re] != "function" && (Z[re] && Array.isArray(Z[re]) && Z[re].length && Z[re].every(function(Ce) {
                            return typeof Ce != "object";
                          }) ? ue["" + G + re + "[]"] = Z[re].join(",") : Z[re] && typeof Z[re] == "object" ? ue = ie(Z[re], "" + G + re, ue) : ue["" + G + re] = Z[re].toString());
                          return ue;
                        }(V, p);
                        for (var ee = 0, q = Object.keys(z); ee < q.length; ee++) {
                          var de = q[ee];
                          o[de] = z[de];
                        }
                        return;
                      }
                    } else typeof V == "number" && (z = V.toString());
                    o[A] = z;
                  });
                }
              });
            }(f, v, y);
            l.push(w);
          }), l;
        }(t, e)).then(function() {
          return o;
        });
      }
      function Oi(e) {
        var t = e.uid, n = e.options, o = e.overrides, a = o === void 0 ? {} : o, u = e.parentWin, c = u === void 0 ? window : u, l = n.propsDef, f = n.containerTemplate, v = n.prerenderTemplate, y = n.tag, w = n.name, p = n.attributes, m = n.dimensions, E = n.autoResize, P = n.url, S = n.domain, I = n.exports, F = new T(), K = [], A = en(), V = {}, z = {}, ee = {
          visible: !0
        }, q = a.event ? a.event : (de = {}, ie = {}, Z = {
          on: function(x, N) {
            var B = ie[x] = ie[x] || [];
            B.push(N);
            var j = !1;
            return {
              cancel: function() {
                j || (j = !0, B.splice(B.indexOf(N), 1));
              }
            };
          },
          once: function(x, N) {
            var B = Z.on(x, function() {
              B.cancel(), N();
            });
            return B;
          },
          trigger: function(x) {
            for (var N = arguments.length, B = new Array(N > 1 ? N - 1 : 0), j = 1; j < N; j++) B[j - 1] = arguments[j];
            var ne = ie[x], Q = [];
            if (ne)
              for (var ye = function() {
                var Ve = ne[Ee];
                Q.push(T.try(function() {
                  return Ve.apply(void 0, B);
                }));
              }, Ee = 0; Ee < ne.length; Ee++) ye();
            return T.all(Q).then(Pe);
          },
          triggerOnce: function(x) {
            if (de[x]) return T.resolve();
            de[x] = !0;
            for (var N = arguments.length, B = new Array(N > 1 ? N - 1 : 0), j = 1; j < N; j++) B[j - 1] = arguments[j];
            return Z.trigger.apply(Z, [x].concat(B));
          },
          reset: function() {
            ie = {};
          }
        }), de, ie, Z, G = a.props ? a.props : {}, ue, re, Ce, Nr, wr, $r = !1, qr = a.onError, Mr = a.getProxyContainer, Hr = a.show, Vr = a.hide, nt = a.close, Gr = a.renderContainer, Tr = a.getProxyWindow, ot = a.setProxyWin, Jr = a.openFrame, Kr = a.openPrerenderFrame, it = a.prerender, at = a.open, ae = a.openPrerender, mr = a.watchForUnload, se = a.getInternalState, qe = a.setInternalState, Ie = function() {
          return typeof m == "function" ? m({
            props: G
          }) : m;
        }, He = function() {
          return T.try(function() {
            return a.resolveInitPromise ? a.resolveInitPromise() : F.resolve();
          });
        }, Se = function(x) {
          return T.try(function() {
            return a.rejectInitPromise ? a.rejectInitPromise(x) : F.reject(x);
          });
        }, or = function(x) {
          for (var N = {}, B = 0, j = Object.keys(G); B < j.length; B++) {
            var ne = j[B], Q = l[ne];
            if (!Q || Q.sendToChild !== !1) {
              var ye = Q && Q.trustedDomains && Q.trustedDomains.length > 0 ? Q.trustedDomains.reduce(function(Ee, Ve) {
                return Ee || lr(Ve, x);
              }, !1) : lr(x, D(window));
              Q && Q.sameDomain && !ye || Q && Q.trustedDomains && !ye || (N[ne] = G[ne]);
            }
          }
          return T.hash(N);
        }, je = function() {
          return T.try(function() {
            return se ? se() : ee;
          });
        }, Ue = function(x) {
          return T.try(function() {
            return qe ? qe(x) : ee = R({}, ee, x);
          });
        }, gr = function() {
          return Tr ? Tr() : T.try(function() {
            var x = G.window;
            if (x) {
              var N = Wt(x);
              return A.register(function() {
                return x.close();
              }), N;
            }
            return new vr({
              send: Pr
            });
          });
        }, ar = function(x) {
          return ot ? ot(x) : T.try(function() {
            ue = x;
          });
        }, Or = function() {
          return Hr ? Hr() : T.hash({
            setState: Ue({
              visible: !0
            }),
            showElement: re ? re.get().then(_a) : null
          }).then(Pe);
        }, _r = function() {
          return Vr ? Vr() : T.hash({
            setState: Ue({
              visible: !1
            }),
            showElement: re ? re.get().then(jo) : null
          }).then(Pe);
        }, vt = function() {
          return typeof P == "function" ? P({
            props: G
          }) : P;
        }, wt = function() {
          return typeof p == "function" ? p({
            props: G
          }) : p;
        }, st = function() {
          return Ir(vt());
        }, sr = function(x, N) {
          var B = N.windowName;
          return Jr ? Jr(x, {
            windowName: B
          }) : T.try(function() {
            if (x === Ne.IFRAME) return un(zo({
              attributes: R({
                name: B,
                title: w
              }, wt().iframe)
            }));
          });
        }, _t = function(x) {
          return Kr ? Kr(x) : T.try(function() {
            if (x === Ne.IFRAME) return un(zo({
              attributes: R({
                name: "__zoid_prerender_frame__" + w + "_" + nr() + "__",
                title: "prerender__" + w
              }, wt().iframe)
            }));
          });
        }, Ft = function(x, N, B) {
          return ae ? ae(x, N, B) : T.try(function() {
            if (x === Ne.IFRAME) {
              if (!B) throw new Error("Expected proxy frame to be passed");
              return B.get().then(function(j) {
                return A.register(function() {
                  return It(j);
                }), _n(j).then(function(ne) {
                  return ce(ne);
                }).then(function(ne) {
                  return Wt(ne);
                });
              });
            }
            if (x === Ne.POPUP) return N;
            throw new Error("No render context available for " + x);
          });
        }, mt = function() {
          return T.try(function() {
            if (ue) return T.all([q.trigger(Te.FOCUS), ue.focus()]).then(Pe);
          });
        }, dn = function() {
          var x = Mt(window);
          return x.windows = x.windows || {}, x.windows[t] = window, A.register(function() {
            delete x.windows[t];
          }), t;
        }, zt = function(x, N, B, j) {
          if (N === D(window)) return {
            type: "global",
            uid: dn()
          };
          if (x !== window) throw new Error("Can not construct cross-domain window reference for different target window");
          if (G.window) {
            var ne = j.getWindow();
            if (!ne) throw new Error("Can not construct cross-domain window reference for lazy window prop");
            if (Lr(ne) !== window) throw new Error("Can not construct cross-domain window reference for window prop with different ancestor");
          }
          if (B === Ne.POPUP) return {
            type: "opener"
          };
          if (B === Ne.IFRAME) return {
            type: "parent",
            distance: Pn(window)
          };
          throw new Error("Can not construct window reference for child");
        }, fn = function(x, N) {
          return T.try(function() {
            var B;
            Nr = x, Ce = N, (B = ue) == null || B.isPopup().then(function(j) {
              if ((N == null ? void 0 : N.name) !== "" && j) {
                var ne;
                (ne = ue) == null || ne.setName(N == null ? void 0 : N.name);
              }
            }).finally(function() {
              He(), A.register(function() {
                return N.close.fireAndForget().catch(Pe);
              });
            });
          });
        }, Lt = function(x) {
          var N = x.width, B = x.height;
          return T.try(function() {
            q.trigger(Te.RESIZE, {
              width: N,
              height: B
            });
          });
        }, jt = function(x) {
          return T.try(function() {
            return q.trigger(Te.DESTROY);
          }).catch(Pe).then(function() {
            return A.all(x);
          }).then(function() {
            var N = x || new Error("Component destroyed");
            wr && pt(wr) || N.message === "Window navigated away" ? F.resolve() : F.asyncReject(N);
          });
        }, Fr = jr(function(x) {
          return T.try(function() {
            return nt ? De(nt.__source__) ? void 0 : nt() : T.try(function() {
              return q.trigger(Te.CLOSE);
            }).then(function() {
              return jt(x || new Error("Component closed"));
            });
          });
        }), xi = function(x, N) {
          var B = N.proxyWin, j = N.proxyFrame, ne = N.windowName;
          return at ? at(x, {
            proxyWin: B,
            proxyFrame: j,
            windowName: ne
          }) : T.try(function() {
            if (x === Ne.IFRAME) {
              if (!j) throw new Error("Expected proxy frame to be passed");
              return j.get().then(function(Ae) {
                return _n(Ae).then(function(he) {
                  return A.register(function() {
                    return It(Ae);
                  }), A.register(function() {
                    return vi(he);
                  }), he;
                });
              });
            }
            if (x === Ne.POPUP) {
              var Q = Ie(), ye = Q.width, Ee = ye === void 0 ? "300px" : ye, Ve = Q.height, Oe = Ve === void 0 ? "150px" : Ve;
              Ee = Ho(Ee, window.outerWidth), Oe = Ho(Oe, window.outerWidth);
              var Be = function(Ae, he) {
                var We = (he = he || {}).closeOnUnload, Re = We === void 0 ? 1 : We, ur = he.name, Ge = ur === void 0 ? "" : ur, fe = he.width, Je = he.height, ir = 0, Xe = 0;
                fe && (window.outerWidth ? Xe = Math.round((window.outerWidth - fe) / 2) + window.screenX : window.screen.width && (Xe = Math.round((window.screen.width - fe) / 2))), Je && (window.outerHeight ? ir = Math.round((window.outerHeight - Je) / 2) + window.screenY : window.screen.height && (ir = Math.round((window.screen.height - Je) / 2))), delete he.closeOnUnload, delete he.name, fe && Je && (he = R({
                  top: ir,
                  left: Xe,
                  width: fe,
                  height: Je,
                  status: 1,
                  toolbar: 0,
                  menubar: 0,
                  resizable: 1,
                  scrollbars: 1
                }, he));
                var ut = Object.keys(he).map(function(Cr) {
                  if (he[Cr] != null) return Cr + "=" + Xt(he[Cr]);
                }).filter(Boolean).join(","), yr;
                try {
                  yr = window.open("", Ge, ut);
                } catch (Cr) {
                  throw new Mn("Can not open popup window - " + (Cr.stack || Cr.message));
                }
                if (De(yr))
                  throw new Mn("Can not open popup window - blocked");
                return Re && window.addEventListener("unload", function() {
                  return yr.close();
                }), yr;
              }(0, R({
                name: ne,
                width: Ee,
                height: Oe
              }, wt().popup));
              return A.register(function() {
                return To(Be);
              }), A.register(function() {
                return vi(Be);
              }), Be;
            }
            throw new Error("No render context available for " + x);
          }).then(function(Q) {
            return B.setWindow(Q, {
              send: Pr
            }), B.setName(ne).then(function() {
              return B;
            });
          });
        }, Di = function() {
          return T.try(function() {
            var x = Lo(window, "unload", Qt(function() {
              jt(new Error("Window navigated away"));
            })), N = bo(c, jt, 3e3);
            if (A.register(N.cancel), A.register(x.cancel), mr) return mr();
          });
        }, Ni = function(x) {
          var N = !1;
          return x.isClosed().then(function(B) {
            return B ? (N = !0, Fr(new Error("Detected component window close"))) : T.delay(200).then(function() {
              return x.isClosed();
            }).then(function(j) {
              if (j)
                return N = !0, Fr(new Error("Detected component window close"));
            });
          }).then(function() {
            return N;
          });
        }, Ut = function(x) {
          return qr ? qr(x) : T.try(function() {
            if (K.indexOf(x) === -1)
              return K.push(x), F.asyncReject(x), q.trigger(Te.ERROR, x);
          });
        }, Ci = new T(), Ii = function(x) {
          return T.try(function() {
            Ci.resolve(x);
          });
        };
        fn.onError = Ut;
        var Ai = function(x, N) {
          return x({
            uid: t,
            container: N.container,
            context: N.context,
            doc: N.doc,
            frame: N.frame,
            prerenderFrame: N.prerenderFrame,
            focus: mt,
            close: Fr,
            state: V,
            props: G,
            tag: y,
            dimensions: Ie(),
            event: q
          });
        }, Wi = function(x, N) {
          var B = N.context;
          return it ? it(x, {
            context: B
          }) : T.try(function() {
            if (v) {
              q.trigger(Te.PRERENDER);
              var j = x.getWindow();
              if (j && U(j) && function(We) {
                try {
                  if (!We.location.href || We.location.href === "about:blank") return !0;
                } catch {
                }
                return !1;
              }(j)) {
                var ne = (j = ce(j)).document, Q = Ai(v, {
                  context: B,
                  doc: ne
                });
                if (Q) {
                  if (Q.ownerDocument !== ne) throw new Error("Expected prerender template to have been created with document from child window");
                  (function(We, Re) {
                    var ur = Re.tagName.toLowerCase();
                    if (ur !== "html") throw new Error("Expected element to be html, got " + ur);
                    for (var Ge = We.document.documentElement, fe = 0, Je = Cn(Ge.children); fe < Je.length; fe++) Ge.removeChild(Je[fe]);
                    for (var ir = 0, Xe = Cn(Re.children); ir < Xe.length; ir++) Ge.appendChild(Xe[ir]);
                  })(j, Q);
                  var ye = E.width, Ee = ye !== void 0 && ye, Ve = E.height, Oe = Ve !== void 0 && Ve, Be = E.element, Ae = Be === void 0 ? "body" : Be;
                  if ((Ae = Wn(Ae, ne)) && (Ee || Oe)) {
                    var he = Uo(Ae, function(We) {
                      Lt({
                        width: Ee ? We.width : void 0,
                        height: Oe ? We.height : void 0
                      });
                    }, {
                      width: Ee,
                      height: Oe,
                      win: j
                    });
                    q.on(Te.RENDERED, he.cancel);
                  }
                  q.trigger(Te.PRERENDERED);
                }
              }
            }
          });
        }, Mi = function(x, N) {
          var B = N.proxyFrame, j = N.proxyPrerenderFrame, ne = N.context, Q = N.rerender;
          return Gr ? Gr(x, {
            proxyFrame: B,
            proxyPrerenderFrame: j,
            context: ne,
            rerender: Q
          }) : T.hash({
            container: x.get(),
            frame: B ? B.get() : null,
            prerenderFrame: j ? j.get() : null,
            internalState: je()
          }).then(function(ye) {
            var Ee = ye.container, Ve = ye.internalState.visible, Oe = Ai(f, {
              context: ne,
              container: Ee,
              frame: ye.frame,
              prerenderFrame: ye.prerenderFrame,
              doc: document
            });
            if (Oe) {
              Ve || jo(Oe), Ma(Ee, Oe);
              var Be = function(Ae, he) {
                he = Qt(he);
                var We = !1, Re = [], ur, Ge, fe, Je = function() {
                  We = !0;
                  for (var yr = 0; yr < Re.length; yr++) Re[yr].disconnect();
                  ur && ur.cancel(), fe && fe.removeEventListener("unload", ir), Ge && It(Ge);
                }, ir = function() {
                  We || (he(), Je());
                };
                if (pt(Ae))
                  return ir(), {
                    cancel: Je
                  };
                if (window.MutationObserver)
                  for (var Xe = Ae.parentElement; Xe; ) {
                    var ut = new window.MutationObserver(function() {
                      pt(Ae) && ir();
                    });
                    ut.observe(Xe, {
                      childList: !0
                    }), Re.push(ut), Xe = Xe.parentElement;
                  }
                return (Ge = document.createElement("iframe")).setAttribute("name", "__detect_close_" + nr() + "__"), Ge.style.display = "none", _n(Ge).then(function(yr) {
                  (fe = ce(yr)).addEventListener("unload", ir);
                }), Ae.appendChild(Ge), ur = Nt(function() {
                  pt(Ae) && ir();
                }, 1e3), {
                  cancel: Je
                };
              }(Oe, function() {
                var Ae = new Error("Detected container element removed from DOM");
                return T.delay(1).then(function() {
                  if (!pt(Oe))
                    return A.all(Ae), Q().then(He, Se);
                  Fr(Ae);
                });
              });
              return A.register(function() {
                return Be.cancel();
              }), A.register(function() {
                return It(Oe);
              }), re = un(Oe);
            }
          });
        }, _i = function() {
          return {
            state: V,
            event: q,
            close: Fr,
            focus: mt,
            resize: Lt,
            onError: Ut,
            updateProps: os,
            show: Or,
            hide: _r
          };
        }, kn = function(x) {
          x === void 0 && (x = {});
          var N = wr, B = _i();
          ht(z, x), function(j, ne, Q, ye, Ee) {
            var Ve = ye.state, Oe = ye.close, Be = ye.focus, Ae = ye.event, he = ye.onError;
            Zn(Q, j, function(We, Re, ur) {
              var Ge = !1, fe = ur;
              Object.defineProperty(ne, We, {
                configurable: !0,
                enumerable: !0,
                get: function() {
                  return Ge ? fe : (Ge = !0, function() {
                    if (!Re) return fe;
                    var Je = Re.alias;
                    if (Je && !Ur(ur) && Ur(Q[Je]) && (fe = Q[Je]), Re.value && (fe = Re.value({
                      props: ne,
                      state: Ve,
                      close: Oe,
                      focus: Be,
                      event: Ae,
                      onError: he,
                      container: Ee
                    })), !Re.default || Ur(fe) || Ur(Q[We]) || (fe = Re.default({
                      props: ne,
                      state: Ve,
                      close: Oe,
                      focus: Be,
                      event: Ae,
                      onError: he,
                      container: Ee
                    })), Ur(fe)) {
                      if (Re.type === ge.ARRAY ? !Array.isArray(fe) : typeof fe !== Re.type) throw new TypeError("Prop is not of type " + Re.type + ": " + We);
                    } else if (Re.required !== !1 && !Ur(Q[We])) throw new Error('Expected prop "' + We + '" to be defined');
                    return Ur(fe) && Re.decorate && (fe = Re.decorate({
                      value: fe,
                      props: ne,
                      state: Ve,
                      close: Oe,
                      focus: Be,
                      event: Ae,
                      onError: he,
                      container: Ee
                    })), fe;
                  }());
                }
              });
            }), Zn(ne, j, Pe);
          }(l, G, z, B, N);
        }, os = function(x) {
          return kn(x), F.then(function() {
            var N = Ce, B = ue;
            if (N && B && Nr) return or(Nr).then(function(j) {
              return N.updateProps(j).catch(function(ne) {
                return Ni(B).then(function(Q) {
                  if (!Q) throw ne;
                });
              });
            });
          });
        }, Fi = function(x) {
          return Mr ? Mr(x) : T.try(function() {
            return _o(x);
          }).then(function(N) {
            return Fn(N) && (N = function B(j) {
              var ne = function(Ve) {
                var Oe = function(Be) {
                  for (; Be.parentNode; ) Be = Be.parentNode;
                  if (Fn(Be)) return Be;
                }(Ve);
                if (Oe && Oe.host) return Oe.host;
              }(j);
              if (!ne) throw new Error("Element is not in shadow dom");
              var Q = "shadow-slot-" + nr(), ye = document.createElement("slot");
              ye.setAttribute("name", Q), j.appendChild(ye);
              var Ee = document.createElement("div");
              return Ee.setAttribute("slot", Q), ne.appendChild(Ee), Fn(ne) ? B(Ee) : Ee;
            }(N)), wr = N, un(N);
          });
        };
        return {
          init: function() {
            (function() {
              q.on(Te.RENDER, function() {
                return G.onRender();
              }), q.on(Te.PRERENDER, function() {
                return G.onPrerender();
              }), q.on(Te.DISPLAY, function() {
                return G.onDisplay();
              }), q.on(Te.RENDERED, function() {
                return G.onRendered();
              }), q.on(Te.PRERENDERED, function() {
                return G.onPrerendered();
              }), q.on(Te.CLOSE, function() {
                return G.onClose();
              }), q.on(Te.DESTROY, function() {
                return G.onDestroy();
              }), q.on(Te.RESIZE, function() {
                return G.onResize();
              }), q.on(Te.FOCUS, function() {
                return G.onFocus();
              }), q.on(Te.PROPS, function(x) {
                return G.onProps(x);
              }), q.on(Te.ERROR, function(x) {
                return G && G.onError ? G.onError(x) : Se(x).then(function() {
                  setTimeout(function() {
                    throw x;
                  }, 1);
                });
              }), A.register(q.reset);
            })();
          },
          render: function(x) {
            var N = x.target, B = x.container, j = x.context, ne = x.rerender;
            return T.try(function() {
              var Q = st(), ye = S || st();
              (function(Y, Ke, Me) {
                if (Y !== window) {
                  if (!Jt(window, Y)) throw new Error("Can only renderTo an adjacent frame");
                  var Ye = D();
                  if (!lr(Ke, Ye) && !U(Y)) throw new Error("Can not render remotely to " + Ke.toString() + " - can only render to " + Ye);
                  if (Me && typeof Me != "string") throw new Error("Container passed to renderTo must be a string selector, got " + typeof Me + " }");
                }
              })(N, ye, B);
              var Ee = T.try(function() {
                if (N !== window) return function(Y, Ke) {
                  for (var Me = {}, Ye = 0, dr = Object.keys(G); Ye < dr.length; Ye++) {
                    var _e = dr[Ye], br = l[_e];
                    br && br.allowDelegate && (Me[_e] = G[_e]);
                  }
                  var ke = Pr(Ke, "zoid_delegate_" + w, {
                    uid: t,
                    overrides: {
                      props: Me,
                      event: q,
                      close: Fr,
                      onError: Ut,
                      getInternalState: je,
                      setInternalState: Ue,
                      resolveInitPromise: He,
                      rejectInitPromise: Se
                    }
                  }).then(function(X) {
                    var k = X.data.parent;
                    return A.register(function(W) {
                      if (!De(Ke)) return k.destroy(W);
                    }), k.getDelegateOverrides();
                  }).catch(function(X) {
                    throw new Error(`Unable to delegate rendering. Possibly the component is not loaded in the target window.

` + lt(X));
                  });
                  return Mr = function() {
                    for (var X = arguments.length, k = new Array(X), W = 0; W < X; W++) k[W] = arguments[W];
                    return ke.then(function(te) {
                      return te.getProxyContainer.apply(te, k);
                    });
                  }, Gr = function() {
                    for (var X = arguments.length, k = new Array(X), W = 0; W < X; W++) k[W] = arguments[W];
                    return ke.then(function(te) {
                      return te.renderContainer.apply(te, k);
                    });
                  }, Hr = function() {
                    for (var X = arguments.length, k = new Array(X), W = 0; W < X; W++) k[W] = arguments[W];
                    return ke.then(function(te) {
                      return te.show.apply(te, k);
                    });
                  }, Vr = function() {
                    for (var X = arguments.length, k = new Array(X), W = 0; W < X; W++) k[W] = arguments[W];
                    return ke.then(function(te) {
                      return te.hide.apply(te, k);
                    });
                  }, mr = function() {
                    for (var X = arguments.length, k = new Array(X), W = 0; W < X; W++) k[W] = arguments[W];
                    return ke.then(function(te) {
                      return te.watchForUnload.apply(te, k);
                    });
                  }, Y === Ne.IFRAME ? (Tr = function() {
                    for (var X = arguments.length, k = new Array(X), W = 0; W < X; W++) k[W] = arguments[W];
                    return ke.then(function(te) {
                      return te.getProxyWindow.apply(te, k);
                    });
                  }, Jr = function() {
                    for (var X = arguments.length, k = new Array(X), W = 0; W < X; W++) k[W] = arguments[W];
                    return ke.then(function(te) {
                      return te.openFrame.apply(te, k);
                    });
                  }, Kr = function() {
                    for (var X = arguments.length, k = new Array(X), W = 0; W < X; W++) k[W] = arguments[W];
                    return ke.then(function(te) {
                      return te.openPrerenderFrame.apply(te, k);
                    });
                  }, it = function() {
                    for (var X = arguments.length, k = new Array(X), W = 0; W < X; W++) k[W] = arguments[W];
                    return ke.then(function(te) {
                      return te.prerender.apply(te, k);
                    });
                  }, at = function() {
                    for (var X = arguments.length, k = new Array(X), W = 0; W < X; W++) k[W] = arguments[W];
                    return ke.then(function(te) {
                      return te.open.apply(te, k);
                    });
                  }, ae = function() {
                    for (var X = arguments.length, k = new Array(X), W = 0; W < X; W++) k[W] = arguments[W];
                    return ke.then(function(te) {
                      return te.openPrerender.apply(te, k);
                    });
                  }) : Y === Ne.POPUP && (ot = function() {
                    for (var X = arguments.length, k = new Array(X), W = 0; W < X; W++) k[W] = arguments[W];
                    return ke.then(function(te) {
                      return te.setProxyWin.apply(te, k);
                    });
                  }), ke;
                }(j, N);
              }), Ve = G.window, Oe = Di(), Be = Ti(l, G, "post"), Ae = q.trigger(Te.RENDER), he = Fi(B), We = gr(), Re = he.then(function() {
                return kn();
              }), ur = Re.then(function() {
                return Ti(l, G, "get").then(function(Y) {
                  return function(Ke, Me) {
                    var Ye = Me.query || {}, dr = Me.hash || {}, _e, br, ke = Ke.split("#");
                    br = ke[1];
                    var X = (_e = ke[0]).split("?");
                    _e = X[0];
                    var k = Mo(X[1], Ye), W = Mo(br, dr);
                    return k && (_e = _e + "?" + k), W && (_e = _e + "#" + W), _e;
                  }(Tn(vt()), {
                    query: Y
                  });
                });
              }), Ge = We.then(function(Y) {
                return function(Me) {
                  var Ye = Me === void 0 ? {} : Me, dr = Ye.proxyWin, _e = Ye.initialChildDomain, br = Ye.childDomainMatch, ke = Ye.target, X = ke === void 0 ? window : ke, k = Ye.context;
                  return function(W) {
                    var te = W === void 0 ? {} : W, eo = te.proxyWin, fs = te.childDomainMatch, ls = te.context;
                    return or(te.initialChildDomain).then(function(hs) {
                      return {
                        uid: t,
                        context: ls,
                        tag: y,
                        childDomainMatch: fs,
                        version: "10_3_3",
                        props: hs,
                        exports: (ji = eo, {
                          init: function(ps) {
                            return fn(this.origin, ps);
                          },
                          close: Fr,
                          checkClose: function() {
                            return Ni(ji);
                          },
                          resize: Lt,
                          onError: Ut,
                          show: Or,
                          hide: _r,
                          export: Ii
                        })
                      };
                      var ji;
                    });
                  }({
                    proxyWin: dr,
                    initialChildDomain: _e,
                    childDomainMatch: br,
                    context: k
                  }).then(function(W) {
                    var te = mi({
                      data: W,
                      metaData: {
                        windowRef: zt(X, _e, k, dr)
                      },
                      sender: {
                        domain: D(window)
                      },
                      receiver: {
                        win: dr,
                        domain: br
                      },
                      passByReference: _e === D()
                    }), eo = te.serializedData;
                    return A.register(te.cleanReference), eo;
                  });
                }({
                  proxyWin: (Ke = {
                    proxyWin: Y,
                    initialChildDomain: Q,
                    childDomainMatch: ye,
                    target: N,
                    context: j
                  }).proxyWin,
                  initialChildDomain: Ke.initialChildDomain,
                  childDomainMatch: Ke.childDomainMatch,
                  target: Ke.target,
                  context: Ke.context
                }).then(function(Me) {
                  return yi({
                    name: w,
                    serializedPayload: Me
                  });
                });
                var Ke;
              }), fe = Ge.then(function(Y) {
                return sr(j, {
                  windowName: Y
                });
              }), Je = _t(j), ir = T.hash({
                proxyContainer: he,
                proxyFrame: fe,
                proxyPrerenderFrame: Je
              }).then(function(Y) {
                return Mi(Y.proxyContainer, {
                  context: j,
                  proxyFrame: Y.proxyFrame,
                  proxyPrerenderFrame: Y.proxyPrerenderFrame,
                  rerender: ne
                });
              }).then(function(Y) {
                return Y;
              }), Xe = T.hash({
                windowName: Ge,
                proxyFrame: fe,
                proxyWin: We
              }).then(function(Y) {
                var Ke = Y.proxyWin;
                return Ve ? Ke : xi(j, {
                  windowName: Y.windowName,
                  proxyWin: Ke,
                  proxyFrame: Y.proxyFrame
                });
              }), ut = T.hash({
                proxyWin: Xe,
                proxyPrerenderFrame: Je
              }).then(function(Y) {
                return Ft(j, Y.proxyWin, Y.proxyPrerenderFrame);
              }), yr = Xe.then(function(Y) {
                return ue = Y, ar(Y);
              }), Cr = T.hash({
                proxyPrerenderWin: ut,
                state: yr
              }).then(function(Y) {
                return Wi(Y.proxyPrerenderWin, {
                  context: j
                });
              }), zi = T.hash({
                proxyWin: Xe,
                windowName: Ge
              }).then(function(Y) {
                if (Ve) return Y.proxyWin.setName(Y.windowName);
              }), is = T.hash({
                body: Be
              }).then(function(Y) {
                return n.method ? n.method : Object.keys(Y.body).length ? "post" : "get";
              }), Li = T.hash({
                proxyWin: Xe,
                windowUrl: ur,
                body: Be,
                method: is,
                windowName: zi,
                prerender: Cr
              }).then(function(Y) {
                return Y.proxyWin.setLocation(Y.windowUrl, {
                  method: Y.method,
                  body: Y.body
                });
              }), as = Xe.then(function(Y) {
                (function Ke(Me, Ye) {
                  var dr = !1;
                  return A.register(function() {
                    dr = !0;
                  }), T.delay(2e3).then(function() {
                    return Me.isClosed();
                  }).then(function(_e) {
                    if (!dr) {
                      if (Ye === Ne.POPUP && _e) return Fr(new Error("Detected popup close"));
                      var br = !!(wr && pt(wr));
                      return Ye === Ne.IFRAME && _e && (br || $r) ? Fr(new Error("Detected iframe close")) : Ke(Me, Ye);
                    }
                  });
                })(Y, j);
              }), ss = T.hash({
                container: ir,
                prerender: Cr
              }).then(function() {
                return q.trigger(Te.DISPLAY);
              }), us = Xe.then(function(Y) {
                return function(Ke, Me, Ye) {
                  return T.try(function() {
                    return Ke.awaitWindow();
                  }).then(function(dr) {
                    if (Br && Br.needsBridge({
                      win: dr,
                      domain: Me
                    }) && !Br.hasBridge(Me, Me)) {
                      var _e = typeof n.bridgeUrl == "function" ? n.bridgeUrl({
                        props: G
                      }) : n.bridgeUrl;
                      if (!_e) throw new Error("Bridge needed to render " + Ye);
                      var br = Ir(_e);
                      return Br.linkUrl(dr, Me), Br.openBridge(Tn(_e), br);
                    }
                  });
                }(Y, Q, j);
              }), cs = Li.then(function() {
                return T.try(function() {
                  var Y = G.timeout;
                  if (Y) return F.timeout(Y, new Error("Loading component timed out after " + Y + " milliseconds"));
                });
              }), ds = F.then(function() {
                return $r = !0, q.trigger(Te.RENDERED);
              });
              return T.hash({
                initPromise: F,
                buildUrlPromise: ur,
                onRenderPromise: Ae,
                getProxyContainerPromise: he,
                openFramePromise: fe,
                openPrerenderFramePromise: Je,
                renderContainerPromise: ir,
                openPromise: Xe,
                openPrerenderPromise: ut,
                setStatePromise: yr,
                prerenderPromise: Cr,
                loadUrlPromise: Li,
                buildWindowNamePromise: Ge,
                setWindowNamePromise: zi,
                watchForClosePromise: as,
                onDisplayPromise: ss,
                openBridgePromise: us,
                runTimeoutPromise: cs,
                onRenderedPromise: ds,
                delegatePromise: Ee,
                watchForUnloadPromise: Oe,
                finalSetPropsPromise: Re
              });
            }).catch(function(Q) {
              return T.all([Ut(Q), jt(Q)]).then(function() {
                throw Q;
              }, function() {
                throw Q;
              });
            }).then(Pe);
          },
          destroy: jt,
          getProps: function() {
            return G;
          },
          setProps: kn,
          export: Ii,
          getHelpers: _i,
          getDelegateOverrides: function() {
            return T.try(function() {
              return {
                getProxyContainer: Fi,
                show: Or,
                hide: _r,
                renderContainer: Mi,
                getProxyWindow: gr,
                watchForUnload: Di,
                openFrame: sr,
                openPrerenderFrame: _t,
                prerender: Wi,
                open: xi,
                openPrerender: Ft,
                setProxyWin: ar
              };
            });
          },
          getExports: function() {
            return I({
              getExports: function() {
                return Ci;
              }
            });
          }
        };
      }
      var Ka = {
        register: function(e, t, n, o) {
          var a = o.React, u = o.ReactDOM;
          return function(c) {
            O(l, c);
            function l() {
              return c.apply(this, arguments) || this;
            }
            var f = l.prototype;
            return f.render = function() {
              return a.createElement("div", null);
            }, f.componentDidMount = function() {
              var v = u.findDOMNode(this), y = n(ht({}, this.props));
              y.render(v, Ne.IFRAME), this.setState({
                parent: y
              });
            }, f.componentDidUpdate = function() {
              this.state && this.state.parent && this.state.parent.updateProps(ht({}, this.props)).catch(Pe);
            }, l;
          }(a.Component);
        }
      }, Ya = {
        register: function(e, t, n, o) {
          return o.component(e, {
            render: function(a) {
              return a("div");
            },
            inheritAttrs: !1,
            mounted: function() {
              var a = this.$el;
              this.parent = n(R({}, (u = this.$attrs, Object.keys(u).reduce(function(c, l) {
                var f = u[l];
                return l === "style-object" || l === "styleObject" ? (c.style = f, c.styleObject = f) : l.includes("-") ? c[Nn(l)] = f : c[l] = f, c;
              }, {}))));
              var u;
              this.parent.render(a, Ne.IFRAME);
            },
            watch: {
              $attrs: {
                handler: function() {
                  this.parent && this.$attrs && this.parent.updateProps(R({}, this.$attrs)).catch(Pe);
                },
                deep: !0
              }
            }
          });
        }
      }, Za = {
        register: function(e, t, n) {
          return {
            template: "<div></div>",
            inheritAttrs: !1,
            mounted: function() {
              var o = this.$el;
              this.parent = n(R({}, (a = this.$attrs, Object.keys(a).reduce(function(u, c) {
                var l = a[c];
                return c === "style-object" || c === "styleObject" ? (u.style = l, u.styleObject = l) : c.includes("-") ? u[Nn(c)] = l : u[c] = l, u;
              }, {}))));
              var a;
              this.parent.render(o, Ne.IFRAME);
            },
            watch: {
              $attrs: {
                handler: function() {
                  this.parent && this.$attrs && this.parent.updateProps(R({}, this.$attrs)).catch(Pe);
                },
                deep: !0
              }
            }
          };
        }
      }, Qa = {
        register: function(e, t, n, o) {
          return o.module(e, []).directive(Nn(e), function() {
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
                var y = function() {
                  return kt(l.props, function(p) {
                    return typeof p == "function" ? function() {
                      var m = p.apply(this, arguments);
                      return v(), m;
                    } : p;
                  });
                }, w = n(y());
                w.render(f[0], Ne.IFRAME), l.$watch(function() {
                  w.updateProps(y()).catch(Pe);
                });
              }]
            };
          });
        }
      }, Xa = {
        register: function(e, t, n, o) {
          var a = o.Component, u = o.NgModule, c = o.ElementRef, l = o.NgZone, f = o.Inject, v = function() {
            function w(m, E) {
              this.elementRef = void 0, this.internalProps = void 0, this.parent = void 0, this.props = void 0, this.zone = void 0, this._props = void 0, this._props = {}, this.elementRef = m, this.zone = E;
            }
            var p = w.prototype;
            return p.getProps = function() {
              var m = this;
              return kt(R({}, this.internalProps, this.props), function(E) {
                if (typeof E == "function") {
                  var P = m.zone;
                  return function() {
                    var S = arguments, I = this;
                    return P.run(function() {
                      return E.apply(I, S);
                    });
                  };
                }
                return E;
              });
            }, p.ngOnInit = function() {
              var m = this.elementRef.nativeElement;
              this.parent = n(this.getProps()), this.parent.render(m, Ne.IFRAME);
            }, p.ngDoCheck = function() {
              this.parent && !function(m, E) {
                var P = {};
                for (var S in m) if (m.hasOwnProperty(S) && (P[S] = !0, m[S] !== E[S]))
                  return !1;
                for (var I in E) if (!P[I]) return !1;
                return !0;
              }(this._props, this.props) && (this._props = R({}, this.props), this.parent.updateProps(this.getProps()));
            }, w;
          }();
          v.annotations = void 0, v.parameters = void 0, v.parameters = [[new f(c)], [new f(l)]], v.annotations = [new a({
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
      function ka(e) {
        var t = e.uid, n = e.frame, o = e.prerenderFrame, a = e.doc, u = e.props, c = e.event, l = e.dimensions, f = l.width, v = l.height;
        if (n && o) {
          var y = a.createElement("div");
          y.setAttribute("id", t);
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
        `)), y.appendChild(n), y.appendChild(o), y.appendChild(w), o.classList.add("zoid-visible"), n.classList.add("zoid-invisible"), c.on(Te.RENDERED, function() {
            o.classList.remove("zoid-visible"), o.classList.add("zoid-invisible"), n.classList.remove("zoid-invisible"), n.classList.add("zoid-visible"), setTimeout(function() {
              It(o);
            }, 1);
          }), c.on(Te.RESIZE, function(p) {
            var m = p.width, E = p.height;
            typeof m == "number" && (y.style.width = qo(m)), typeof E == "number" && (y.style.height = qo(E));
          }), y;
        }
      }
      function es(e) {
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
      var Qn = en(), Xn = en();
      function rs(e) {
        var t = function(E) {
          var P = E.tag, S = E.url, I = E.domain, F = E.bridgeUrl, K = E.props, A = K === void 0 ? {} : K, V = E.dimensions, z = V === void 0 ? {} : V, ee = E.autoResize, q = ee === void 0 ? {} : ee, de = E.allowedParentDomains, ie = de === void 0 ? "*" : de, Z = E.attributes, G = Z === void 0 ? {} : Z, ue = E.defaultContext, re = ue === void 0 ? Ne.IFRAME : ue, Ce = E.containerTemplate, Nr = Ce === void 0 ? ka : Ce, wr = E.prerenderTemplate, $r = wr === void 0 ? es : wr, qr = E.validate, Mr = E.eligible, Hr = Mr === void 0 ? function() {
            return {
              eligible: !0
            };
          } : Mr, Vr = E.logger, nt = Vr === void 0 ? {
            info: Pe
          } : Vr, Gr = E.exports, Tr = Gr === void 0 ? Pe : Gr, ot = E.method, Jr = E.children, Kr = Jr === void 0 ? function() {
            return {};
          } : Jr, it = P.replace(/-/g, "_"), at = R({}, {
            window: {
              type: ge.OBJECT,
              sendToChild: !1,
              required: !1,
              allowDelegate: !0,
              validate: function(ae) {
                var mr = ae.value;
                if (!et(mr) && !vr.isProxyWindow(mr)) throw new Error("Expected Window or ProxyWindow");
                if (et(mr)) {
                  if (De(mr)) throw new Error("Window is closed");
                  if (!U(mr)) throw new Error("Window is not same domain");
                }
              },
              decorate: function(ae) {
                return Wt(ae.value);
              }
            },
            timeout: {
              type: ge.NUMBER,
              required: !1,
              sendToChild: !1
            },
            cspNonce: {
              type: ge.STRING,
              required: !1
            },
            onDisplay: {
              type: ge.FUNCTION,
              required: !1,
              sendToChild: !1,
              allowDelegate: !0,
              default: Wr,
              decorate: tt
            },
            onRendered: {
              type: ge.FUNCTION,
              required: !1,
              sendToChild: !1,
              default: Wr,
              decorate: tt
            },
            onRender: {
              type: ge.FUNCTION,
              required: !1,
              sendToChild: !1,
              default: Wr,
              decorate: tt
            },
            onPrerendered: {
              type: ge.FUNCTION,
              required: !1,
              sendToChild: !1,
              default: Wr,
              decorate: tt
            },
            onPrerender: {
              type: ge.FUNCTION,
              required: !1,
              sendToChild: !1,
              default: Wr,
              decorate: tt
            },
            onClose: {
              type: ge.FUNCTION,
              required: !1,
              sendToChild: !1,
              allowDelegate: !0,
              default: Wr,
              decorate: tt
            },
            onDestroy: {
              type: ge.FUNCTION,
              required: !1,
              sendToChild: !1,
              allowDelegate: !0,
              default: Wr,
              decorate: tt
            },
            onResize: {
              type: ge.FUNCTION,
              required: !1,
              sendToChild: !1,
              allowDelegate: !0,
              default: Wr
            },
            onFocus: {
              type: ge.FUNCTION,
              required: !1,
              sendToChild: !1,
              allowDelegate: !0,
              default: Wr
            },
            close: {
              type: ge.FUNCTION,
              required: !1,
              sendToChild: !1,
              childDecorate: function(ae) {
                return ae.close;
              }
            },
            focus: {
              type: ge.FUNCTION,
              required: !1,
              sendToChild: !1,
              childDecorate: function(ae) {
                return ae.focus;
              }
            },
            resize: {
              type: ge.FUNCTION,
              required: !1,
              sendToChild: !1,
              childDecorate: function(ae) {
                return ae.resize;
              }
            },
            uid: {
              type: ge.STRING,
              required: !1,
              sendToChild: !1,
              childDecorate: function(ae) {
                return ae.uid;
              }
            },
            tag: {
              type: ge.STRING,
              required: !1,
              sendToChild: !1,
              childDecorate: function(ae) {
                return ae.tag;
              }
            },
            getParent: {
              type: ge.FUNCTION,
              required: !1,
              sendToChild: !1,
              childDecorate: function(ae) {
                return ae.getParent;
              }
            },
            getParentDomain: {
              type: ge.FUNCTION,
              required: !1,
              sendToChild: !1,
              childDecorate: function(ae) {
                return ae.getParentDomain;
              }
            },
            show: {
              type: ge.FUNCTION,
              required: !1,
              sendToChild: !1,
              childDecorate: function(ae) {
                return ae.show;
              }
            },
            hide: {
              type: ge.FUNCTION,
              required: !1,
              sendToChild: !1,
              childDecorate: function(ae) {
                return ae.hide;
              }
            },
            export: {
              type: ge.FUNCTION,
              required: !1,
              sendToChild: !1,
              childDecorate: function(ae) {
                return ae.export;
              }
            },
            onError: {
              type: ge.FUNCTION,
              required: !1,
              sendToChild: !1,
              childDecorate: function(ae) {
                return ae.onError;
              }
            },
            onProps: {
              type: ge.FUNCTION,
              required: !1,
              sendToChild: !1,
              childDecorate: function(ae) {
                return ae.onProps;
              }
            },
            getSiblings: {
              type: ge.FUNCTION,
              required: !1,
              sendToChild: !1,
              childDecorate: function(ae) {
                return ae.getSiblings;
              }
            }
          }, A);
          if (!Nr) throw new Error("Container template required");
          return {
            name: it,
            tag: P,
            url: S,
            domain: I,
            bridgeUrl: F,
            method: ot,
            propsDef: at,
            dimensions: z,
            autoResize: q,
            allowedParentDomains: ie,
            attributes: G,
            defaultContext: re,
            containerTemplate: Nr,
            prerenderTemplate: $r,
            validate: qr,
            logger: nt,
            eligible: Hr,
            children: Kr,
            exports: typeof Tr == "function" ? Tr : function(ae) {
              for (var mr = ae.getExports, se = {}, qe = function() {
                var Se = He[Ie], or = Tr[Se].type, je = mr().then(function(Ue) {
                  return Ue[Se];
                });
                se[Se] = or === ge.FUNCTION ? function() {
                  for (var Ue = arguments.length, gr = new Array(Ue), ar = 0; ar < Ue; ar++) gr[ar] = arguments[ar];
                  return je.then(function(Or) {
                    return Or.apply(void 0, gr);
                  });
                } : je;
              }, Ie = 0, He = Object.keys(Tr); Ie < He.length; Ie++) qe();
              return se;
            }
          };
        }(e), n = t.name, o = t.tag, a = t.defaultContext, u = t.propsDef, c = t.eligible, l = t.children, f = Mt(window), v = {}, y = [], w = function() {
          if (function(P) {
            try {
              return Yn(window.name).name === P;
            } catch {
            }
            return !1;
          }(n)) {
            var E = Ei().payload;
            if (E.tag === o && lr(E.childDomainMatch, D())) return !0;
          }
          return !1;
        }, p = jr(function() {
          if (w()) {
            if (window.xprops)
              throw delete f.components[o], new Error("Can not register " + n + " as child - child already registered");
            var E = function(P) {
              var S = P.tag, I = P.propsDef, F = P.autoResize, K = P.allowedParentDomains, A = [], V = Ei(), z = V.parent, ee = V.payload, q = z.win, de = z.domain, ie, Z = new T(), G = ee.version, ue = ee.uid, re = ee.exports, Ce = ee.context, Nr = ee.props;
              if (!function(se, qe) {
                if (!/_/.test(se) || !/_/.test("10_3_3")) throw new Error("Versions are in an invalid format (" + se + ", 10_3_3)");
                return se.split("_")[0] === "10_3_3".split("_")[0];
              }(G)) throw new Error("Parent window has zoid version " + G + ", child window has version 10_3_3");
              var wr = re.show, $r = re.hide, qr = re.close, Mr = re.onError, Hr = re.checkClose, Vr = re.export, nt = re.resize, Gr = re.init, Tr = function() {
                return q;
              }, ot = function() {
                return de;
              }, Jr = function(se) {
                return A.push(se), {
                  cancel: function() {
                    A.splice(A.indexOf(se), 1);
                  }
                };
              }, Kr = function(se) {
                return nt.fireAndForget({
                  width: se.width,
                  height: se.height
                });
              }, it = function(se) {
                return Z.resolve(se), Vr(se);
              }, at = function(se) {
                var qe = (se === void 0 ? {} : se).anyParent, Ie = [], He = ie.parent;
                if (qe === void 0 && (qe = !He), !qe && !He) throw new Error("No parent found for " + S + " child");
                for (var Se = 0, or = Xr(window); Se < or.length; Se++) {
                  var je = or[Se];
                  if (U(je)) {
                    var Ue = ce(je).xprops;
                    if (Ue && Tr() === Ue.getParent()) {
                      var gr = Ue.parent;
                      if (qe || !He || gr && gr.uid === He.uid) {
                        var ar = wi(je, function(Or) {
                          return Or.exports;
                        });
                        Ie.push({
                          props: Ue,
                          exports: ar
                        });
                      }
                    }
                  }
                }
                return Ie;
              }, ae = function(se, qe, Ie) {
                Ie === void 0 && (Ie = !1);
                var He = function(or, je, Ue, gr, ar, Or) {
                  Or === void 0 && (Or = !1);
                  for (var _r = {}, vt = 0, wt = Object.keys(Ue); vt < wt.length; vt++) {
                    var st = wt[vt], sr = je[st], _t = sr && sr.trustedDomains && sr.trustedDomains.length > 0 ? sr.trustedDomains.reduce(function(fn, Lt) {
                      return fn || lr(Lt, D(window));
                    }, !1) : gr === D(window) || U(or);
                    if ((!sr || !sr.sameDomain || _t) && (!sr || !sr.trustedDomains || _t)) {
                      var Ft = bi(je, 0, st, Ue[st], ar);
                      _r[st] = Ft, sr && sr.alias && !_r[sr.alias] && (_r[sr.alias] = Ft);
                    }
                  }
                  if (!Or) for (var mt = 0, dn = Object.keys(je); mt < dn.length; mt++) {
                    var zt = dn[mt];
                    Ue.hasOwnProperty(zt) || (_r[zt] = bi(je, 0, zt, void 0, ar));
                  }
                  return _r;
                }(q, I, se, qe, {
                  tag: S,
                  show: wr,
                  hide: $r,
                  close: qr,
                  focus: Ja,
                  onError: Mr,
                  resize: Kr,
                  getSiblings: at,
                  onProps: Jr,
                  getParent: Tr,
                  getParentDomain: ot,
                  uid: ue,
                  export: it
                }, Ie);
                ie ? ht(ie, He) : ie = He;
                for (var Se = 0; Se < A.length; Se++) (0, A[Se])(ie);
              }, mr = function(se) {
                return T.try(function() {
                  return ae(se, de, !0);
                });
              };
              return {
                init: function() {
                  return T.try(function() {
                    var se = "";
                    return U(q) && (se = function(qe) {
                      var Ie = qe.componentName, He = qe.parentComponentWindow, Se = gi({
                        data: Yn(window.name).serializedInitialPayload,
                        sender: {
                          win: He
                        },
                        basic: !0
                      }), or = Se.sender;
                      if (Se.reference.type === "uid" || Se.metaData.windowRef.type === "global") {
                        var je = yi({
                          name: Ie,
                          serializedPayload: mi({
                            data: Se.data,
                            metaData: {
                              windowRef: Ga(He)
                            },
                            sender: {
                              domain: or.domain
                            },
                            receiver: {
                              win: window,
                              domain: D()
                            },
                            basic: !0
                          }).serializedData
                        });
                        return window.name = je, je;
                      }
                    }({
                      componentName: P.name,
                      parentComponentWindow: q
                    }) || ""), Mt(window).exports = P.exports({
                      getExports: function() {
                        return Z;
                      }
                    }), function(qe, Ie) {
                      if (!lr(qe, Ie)) throw new Error("Can not be rendered by domain: " + Ie);
                    }(K, de), Qo(q), function() {
                      window.addEventListener("beforeunload", function() {
                        Hr.fireAndForget();
                      }), window.addEventListener("unload", function() {
                        Hr.fireAndForget();
                      }), bo(q, function() {
                        Pi();
                      });
                    }(), Gr({
                      name: se,
                      updateProps: mr,
                      close: Pi
                    });
                  }).then(function() {
                    return (se = F.width, qe = se !== void 0 && se, Ie = F.height, He = Ie !== void 0 && Ie, Se = F.element, _o(Se === void 0 ? "body" : Se).catch(Pe).then(function(or) {
                      return {
                        width: qe,
                        height: He,
                        element: or
                      };
                    })).then(function(or) {
                      var je = or.width, Ue = or.height, gr = or.element;
                      gr && (je || Ue) && Ce !== Ne.POPUP && Uo(gr, function(ar) {
                        Kr({
                          width: je ? ar.width : void 0,
                          height: Ue ? ar.height : void 0
                        });
                      }, {
                        width: je,
                        height: Ue
                      });
                    });
                    var se, qe, Ie, He, Se;
                  }).catch(function(se) {
                    Mr(se);
                  });
                },
                getProps: function() {
                  return ie || (ae(Nr, de), ie);
                }
              };
            }(t);
            return E.init(), E;
          }
        }), m = function E(P) {
          var S, I = "zoid-" + o + "-" + nr(), F = P || {}, K = c({
            props: F
          }), A = K.eligible, V = K.reason, z = F.onDestroy;
          F.onDestroy = function() {
            if (S && A && y.splice(y.indexOf(S), 1), z) return z.apply(void 0, arguments);
          };
          var ee = Oi({
            uid: I,
            options: t
          });
          ee.init(), A ? ee.setProps(F) : F.onDestroy && F.onDestroy(), Qn.register(function(ie) {
            return ee.destroy(ie || new Error("zoid destroyed all components"));
          });
          var q = function(ie) {
            var Z = (ie === void 0 ? {} : ie).decorate;
            return E((Z === void 0 ? Aa : Z)(F));
          }, de = function(ie, Z, G) {
            return T.try(function() {
              if (!A) {
                var ue = new Error(V || n + " component is not eligible");
                return ee.destroy(ue).then(function() {
                  throw ue;
                });
              }
              if (!et(ie)) throw new Error("Must pass window to renderTo");
              return function(re, Ce) {
                return T.try(function() {
                  if (re.window) return Wt(re.window).getType();
                  if (Ce) {
                    if (Ce !== Ne.IFRAME && Ce !== Ne.POPUP) throw new Error("Unrecognized context: " + Ce);
                    return Ce;
                  }
                  return a;
                });
              }(F, G);
            }).then(function(ue) {
              if (Z = function(re, Ce) {
                if (Ce) {
                  if (typeof Ce != "string" && !On(Ce)) throw new TypeError("Expected string or element selector to be passed");
                  return Ce;
                }
                if (re === Ne.POPUP) return "body";
                throw new Error("Expected element to be passed to render iframe");
              }(ue, Z), ie !== window && typeof Z != "string") throw new Error("Must pass string element when rendering to another window");
              return ee.render({
                target: ie,
                container: Z,
                context: ue,
                rerender: function() {
                  var re = q();
                  return ht(S, re), re.renderTo(ie, Z, G);
                }
              });
            }).catch(function(ue) {
              return ee.destroy(ue).then(function() {
                throw ue;
              });
            });
          };
          return S = R({}, ee.getExports(), ee.getHelpers(), function() {
            for (var ie = l(), Z = {}, G = function() {
              var Ce = re[ue], Nr = ie[Ce];
              Z[Ce] = function(wr) {
                var $r = ee.getProps(), qr = R({}, wr, {
                  parent: {
                    uid: I,
                    props: $r,
                    export: ee.export
                  }
                });
                return Nr(qr);
              };
            }, ue = 0, re = Object.keys(ie); ue < re.length; ue++) G();
            return Z;
          }(), {
            isEligible: function() {
              return A;
            },
            clone: q,
            render: function(ie, Z) {
              return de(window, ie, Z);
            },
            renderTo: function(ie, Z, G) {
              return de(ie, Z, G);
            }
          }), A && y.push(S), S;
        };
        if (p(), function() {
          var E = Ar("zoid_allow_delegate_" + n, function() {
            return !0;
          }), P = Ar("zoid_delegate_" + n, function(S) {
            var I = S.data;
            return {
              parent: Oi({
                uid: I.uid,
                options: t,
                overrides: I.overrides,
                parentWin: S.source
              })
            };
          });
          Xn.register(E.cancel), Xn.register(P.cancel);
        }(), f.components = f.components || {}, f.components[o]) throw new Error("Can not register multiple components with the same tag: " + o);
        return f.components[o] = !0, {
          init: m,
          instances: y,
          driver: function(E, P) {
            var S = {
              react: Ka,
              angular: Qa,
              vue: Ya,
              vue3: Za,
              angular2: Xa
            };
            if (!S[E]) throw new Error("Could not find driver for framework: " + E);
            return v[E] || (v[E] = S[E].register(o, u, m, P)), v[E];
          },
          isChild: w,
          canRenderTo: function(E) {
            return Pr(E, "zoid_allow_delegate_" + n).then(function(P) {
              return P.data;
            }).catch(function() {
              return !1;
            });
          },
          registerChild: p
        };
      }
      var ts = function(e) {
        (function() {
          Dr().initialized || (Dr().initialized = !0, u = (a = {
            on: Ar,
            send: Pr
          }).on, c = a.send, (l = Dr()).receiveMessage = l.receiveMessage || function(f) {
            return Jn(f, {
              on: u,
              send: c
            });
          }, function(f) {
            var v = f.on, y = f.send;
            le().getOrSet("postMessageListener", function() {
              return Lo(window, "message", function(w) {
                (function(p, m) {
                  var E = m.on, P = m.send;
                  T.try(function() {
                    var S = p.source || p.sourceElement, I = p.origin || p.originalEvent && p.originalEvent.origin, F = p.data;
                    if (I === "null" && (I = "file://"), S) {
                      if (!I) throw new Error("Post message did not have origin domain");
                      Jn({
                        source: S,
                        origin: I,
                        data: F
                      }, {
                        on: E,
                        send: P
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
            on: Ar,
            send: Pr
          }), ii({
            on: Ar,
            send: Pr,
            receiveMessage: Jn
          }), function(f) {
            var v = f.on, y = f.send;
            le("builtinListeners").getOrSet("helloListener", function() {
              var w = v("postrobot_hello", {
                domain: "*"
              }, function(m) {
                return Ko(m.source, {
                  domain: m.origin
                }), {
                  instanceID: Jo()
                };
              }), p = Lr();
              return p && Ln(p, {
                send: y
              }).catch(function(m) {
              }), w;
            });
          }({
            on: Ar,
            send: Pr
          }));
          var a, u, c, l;
        })();
        var t = rs(e), n = function(a) {
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
        Br && Br.destroyBridges();
        var t = Qn.all(e);
        return Qn = en(), t;
      }
      var Si = Ri;
      function ns(e) {
        return Si(), delete window.__zoid_10_3_3__, function() {
          (function() {
            for (var n = le("responseListeners"), o = 0, a = n.keys(); o < a.length; o++) {
              var u = a[o], c = n.get(u);
              c && (c.cancelled = !0), n.del(u);
            }
          })(), (t = le().get("postMessageListener")) && t.cancel();
          var t;
          delete window.__post_robot_11_0_0__;
        }(), Xn.all(e);
      }
    }]);
  });
})(xa);
var Da = xa.exports;
const ki = Da.EVENT, yt = {
  VISIBLE: "zoid-visible",
  INVISIBLE: "zoid-invisible"
};
function ku({
  uid: r,
  frame: i,
  prerenderFrame: s,
  doc: d,
  props: h,
  event: g,
  dimensions: O
}) {
  const { width: R, height: C } = O, { top: L = 0, left: b = 0 } = h;
  if (!i || !s)
    return;
  const _ = d.createElement("div");
  _.setAttribute("id", r);
  const M = d.createElement("style");
  return h.cspNonce && M.setAttribute("nonce", h.cspNonce), M.appendChild(
    d.createTextNode(`
          #${r} {
              display: inline-block;
              position: absolute;
              width: ${R};
              height: ${C};
              z-index: 1049;
              border: none;
              top: ${L}px;
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

          #${r} > iframe.${yt.INVISIBLE} {
              opacity: 0;
          }

          #${r} > iframe.${yt.VISIBLE} {
              opacity: 1;
        }
      `)
  ), _.appendChild(i), _.appendChild(s), _.appendChild(M), s.classList.add(yt.INVISIBLE), i.classList.add(yt.INVISIBLE), g.on(ki.RENDERED, () => {
    setTimeout(() => {
      i.classList.remove(yt.INVISIBLE), i.classList.add(yt.VISIBLE);
    }, 100), setTimeout(() => {
      s.remove();
    }, 1);
  }), g.on(ki.RESIZE, ({ width: oe, height: xe }) => {
    typeof oe == "number" && (_.style.width = `${oe}px`), typeof xe == "number" && (_.style.height = `${xe}px`);
  }), _;
}
function ec(r) {
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
    containerTemplate: ku
  });
}
function rc(r) {
  return ec(r.id)(r);
}
function tc(r) {
  return new Promise((i, s) => {
    const d = document.createElement("script");
    d.async = !0, d.src = r, d.onload = i, d.onerror = s, document.body.appendChild(d);
  });
}
const nc = "https://cdn.jsdelivr.net/gh/sigmaott/sigma-ssai-web-sdk/v6/build/dist/wasm_exec.js";
let Et = null;
function ea() {
  Et = null;
}
function oc() {
  const r = window;
  return r.Go ? Promise.resolve(r.wasm) : Et || (Et = tc(nc).then(() => r.Go), Et.then(ea).catch(ea), Et);
}
class bt {
  constructor() {
    return bt.instance ? bt.instance : (this.session = null, this.go = null, this.buffer = null, this.audioMediaSequence = {}, bt.instance = this, this);
  }
  async init(i) {
    if (!this.buffer) {
      const d = await (await fetch(i)).arrayBuffer();
      this.buffer = d;
    }
    return bt.instance;
  }
  async loadSource(i) {
    this.session && (i.session = this.session);
    const s = JSON.stringify(i), d = new Go(), h = await WebAssembly.instantiate(this.buffer, d.importObject);
    d.run(h.instance);
    let g;
    for (let O = 1; O <= 3; O++)
      try {
        g = await window.loadSource(s);
        break;
      } catch (R) {
        if (console.log(`Attempt ${O} failed:`, R), O === 3)
          throw console.log("session:", this.session), console.log(s), R;
      }
    if (g.session != "" && (this.session = g.session), g.error)
      throw new Error(g.error);
    return g.manifest;
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
const ic = Rr(), ac = Rr();
function ra({ adsUrl: r, sdk: i, loader: s }) {
  return class extends s {
    constructor(h) {
      super(h);
    }
    load(h, g, O) {
      const R = O.onSuccess;
      O.onSuccess = async (C, L, b) => {
        (b.type === "manifest" || b.type === "level" || b.type === "audioTrack") && (C.data = await this.modifyManifest(C.url, C.data, b.type)), R(C, L, b);
      }, super.load(h, g, O);
    }
    async modifyManifest(h, g, O) {
      console.log("[LOG] ~ manifest:", g), ic.value = g;
      const R = {
        proxyAds: {
          uri: r,
          timeout: 2
        }
      };
      try {
        const C = await i.loadSource({ config: R, manifest: g, masterUri: h });
        return console.log("[LOG] ~ newManifest:", C), ac.value = C, C;
      } catch (C) {
        return console.error("[LOG] ~ error:", C), g;
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
  const h = Zu(), g = Rr(!1), O = Rr(), R = Math.random().toString(36).slice(6);
  function C({ icons: $ }) {
    return {
      id: R,
      appConfig: {
        sdkBaseUrl: oa("https://cdn.jsdelivr.net/gh/sigmaott/sigma-ssai-web-sdk/v6/build/dist/wta/index.html", { id: R })
      },
      icons: $
    };
  }
  const L = rc(C({
    icons: []
  }));
  L.render(i), L.hide(), i.style.display = "none", Ru(() => {
    var $;
    if (O.value) {
      const J = (($ = O.value) == null ? void 0 : $.icons) || [];
      i.style.display = "block", L.updateProps(C({
        icons: J
      })), L.show();
    } else
      i.style.display = "none", L.hide();
  });
  const b = Rr([]), _ = Rr(), M = Rr([]);
  async function oe($) {
    var D;
    console.log("[LOG] ~ currentAd:", O);
    const J = (D = O.value) == null ? void 0 : D.trackingEvents.find((U) => U.eventType === $);
    if (!J) {
      console.debug("[LOG] ~ event:", $);
      return;
    }
    h.trigger(J), await Promise.all(J.beaconUrls.map((U) => Qu(su(U, {
      retry: 3,
      retryDelay: 500
    }))));
  }
  const xe = /* @__PURE__ */ new Map();
  let tr;
  function T($, J, D) {
    $.addEventListener(J, D), xe.set(J, D);
  }
  function xr($) {
    var ze, Qe;
    const J = (($ == null ? void 0 : $.time) || 0) > 0 ? $.time : 0, D = (ze = $ == null ? void 0 : $.value) == null ? void 0 : ze.event;
    console.debug("[LOG] ~ eventType:", D);
    const U = M.value.find((Le) => Le.eventType === D && !Le.tracked && !Le.skipped);
    if (console.debug("[LOG] ~ eventAd:", U), !U)
      return;
    const ce = U == null ? void 0 : U.ad;
    if (console.debug("[LOG] ~ ad:", ce), !!ce) {
      if (D === "start")
        O.value && M.value.filter((er) => er.key.startsWith(`${O.value.key}_`)).forEach((er) => er.skipped = !0), O.value = ce, s(ce.adVerifications, h), tr = Hi(() => {
          oe("impression"), oe("start");
          const Le = M.value.find((er) => er.key === U.key.replace("_start", "_impression"));
          Le && (Le.tracked = !0), U.tracked = !0;
        }, J * 1e3);
      else {
        if (!O.value) {
          console.debug("[LOG] ~ eventType:", D);
          return;
        }
        if (ce.id !== ((Qe = O.value) == null ? void 0 : Qe.id)) {
          console.debug("[ERROR] ~ ad:", ce), console.debug("[ERROR] ~ currentAd:", O.value), M.value.filter((er) => er.key.startsWith(`${O.value.key}_`)).forEach((er) => er.skipped = !0);
          return;
        }
        tr = Hi(() => {
          oe(D), D === "complete" && ce.id === O.value.id && (O.value = void 0), U.tracked = !0;
        }, J * 1e3);
      }
      console.debug("========================================");
    }
  }
  function we() {
    return g.value = !1, ["fullscreenchange", "webkitfullscreenchange", "mozfullscreenchange", "msfullscreenchange"].forEach(($) => {
      T(r, $, () => {
        const J = document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement;
        oe(J ? "fullscreen" : "exitFullscreen");
      });
    }), T(r, "pause", () => oe("pause")), T(r, "play", () => oe("resume")), T(r, "rewind", () => oe("rewind")), T(r, "mute", () => oe("mute")), T(r, "unmute", () => oe("unmute")), async ($, J) => {
      if (_.value = J.frag.sn, $ !== window.Hls.Events.FRAG_CHANGED)
        return;
      const D = b.value.filter((U) => U.sn === J.frag.sn);
      if (!D.length) {
        console.debug("[LOG] ~ trackingEvent:", D);
        return;
      }
      D.forEach((U) => xr(U)), b.value = b.value.filter((U) => U.sn !== J.frag.sn);
    };
  }
  async function Fe() {
    return d.getEventTracking().then(($) => {
      for (const J of ($ == null ? void 0 : $.avails) || [])
        for (const D of J.ads) {
          const U = `${J.id}_${D.id}_${D.startTimeInSeconds}`;
          for (const ce of D.trackingEvents) {
            const ze = `${U}_${ce.eventType}`;
            M.value.find((Le) => Le.key === ze) || M.value.push({
              ...ce,
              key: ze,
              ad: {
                ...D,
                key: U
              },
              tracked: !1
            });
          }
        }
    });
  }
  function Er() {
    return async ($, J) => {
      function D(ze) {
        for (let Qe = 0; Qe < ze.length; Qe++)
          if (ze[Qe] === 0)
            return Qe;
        return ze.length;
      }
      const { start: U, sn: ce } = J.frag;
      for (let ze = 0; ze < J.samples.length; ze++) {
        const Qe = J.samples[ze], Le = Qe.data, er = Qe.pts;
        if (String.fromCharCode.apply(null, Le.slice(0, 3)) !== "ID3" || String.fromCharCode.apply(null, Le.slice(10, 14)) !== "TXXX")
          continue;
        const kr = Le.slice(21, Le.length), De = D(kr), xt = kr.slice(De + 1, kr.length), ft = D(xt), Gt = new TextDecoder("utf-8").decode(xt.slice(0, ft)), Lr = {
          sn: ce,
          time: er - U,
          value: io(Gt)
        };
        if (_.value && ce < _.value)
          return;
        b.value.push(Lr), Lr.value.event === "start" && Fe();
      }
    };
  }
  function $e() {
    return ($) => {
      const J = $.track;
      J.kind === "metadata" && (J.oncuechange = async () => {
        const D = J.activeCues[0];
        if (D && D.value.data) {
          console.debug("[LOG] ~ elemTrack:", D), await Fe();
          const U = io(D.value.data);
          console.debug("[LOG] ~ trackingEvent:", U), xr({
            value: U
          });
        }
      });
    };
  }
  function be($, J) {
    h.on((D) => {
      ($ === "*" || D.eventType === $) && J(D);
    });
  }
  function me() {
    O.value = void 0, b.value = [], xe.forEach(($, J) => {
      r.removeEventListener(J, $);
    }), xe.clear(), wu(tr);
  }
  function H() {
    return {
      eventTracking: b,
      trackingDataEvent: M
    };
  }
  return {
    destroy: me,
    onEventTracking: be,
    hlsHelper: {
      createHlsFragChanged: we,
      createHlsFragParsingMetadata: Er
    },
    videojsHelper: {
      createVideojsAddTrack: $e
    },
    getLog: H
  };
}
async function cc({ video: r, adContainer: i, adsUrl: s }) {
  await oc();
  const d = new bt();
  await d.init("https://cdn.jsdelivr.net/gh/sigmaott/sigma-ssai-web-sdk/v6/build/dist/sigma-cspm.wasm");
  function h() {
  }
  const { onEventTracking: g, destroy: O, videojsHelper: R, hlsHelper: C, getLog: L } = sc({
    video: r,
    adContainer: i,
    trackingUrl: "",
    startSession: h,
    sdk: d
  }), b = Rr(), _ = Rr();
  function M(we) {
    we.config.loader = ra({ adsUrl: s, sdk: d, loader: Hls.DefaultConfig.loader }), b.value = we;
    const Fe = C.createHlsFragChanged(), Er = C.createHlsFragParsingMetadata();
    we.on("hlsFragChanged", Fe), we.on("hlsFragParsingMetadata", Er), we.on(Hls.Events.ERROR, ($e, be) => {
      console.error("HLS Error:", $e, be), be.type === window.Hls.ErrorTypes.NETWORK_ERROR ? console.error("Network Error:", be.details) : be.type === window.Hls.ErrorTypes.MEDIA_ERROR ? console.error("Media Error:", be.details) : console.error("Other Error:", be.details);
    }), _.value = () => {
      we.off("hlsFragChanged", Fe), we.off("hlsFragParsingMetadata", Er);
    };
  }
  function oe(we) {
    we.hls.config.loader = ra({ adsUrl: s, sdk: d, loader: SigmaManager.DefaultConfig.loader }), b.value = we.hls;
    const Fe = C.createHlsFragChanged(), Er = C.createHlsFragParsingMetadata();
    we.hls.on("hlsFragChanged", Fe), we.hls.on("hlsFragParsingMetadata", Er), we.on(SigmaManager.Events.ERROR, ($e, be) => {
      console.log("[LOG] ~ event:", $e), console.error("HLS Error:", $e, be), be.type === window.Hls.ErrorTypes.NETWORK_ERROR ? console.error("Network Error:", be.details) : be.type === window.Hls.ErrorTypes.MEDIA_ERROR ? console.error("Media Error:", be.details) : console.error("Other Error:", be.details);
    }), _.value = () => {
      we.hls.destroy();
    };
  }
  const xe = Rr(), tr = Rr();
  function T(we) {
    const Fe = {
      proxyAds: {
        uri: s,
        timeout: 2
      }
    };
    (function($e) {
      const be = $e.Vhs.PlaylistLoader.prototype.setupInitialPlaylist;
      $e.Vhs.PlaylistLoader.prototype.setupInitialPlaylist = async function(me) {
        if (me.manifestString)
          try {
            const H = me.manifestString;
            await d.loadSource({
              config: Fe,
              manifest: me.manifestString,
              masterUri: this.src
            });
          } catch (H) {
            console.error("Error loading source:", H);
          }
        be.apply(this, [me]);
      };
    })(videojs), function($e) {
      const be = $e.Vhs.PlaylistLoader.prototype.haveMetadata;
      $e.Vhs.PlaylistLoader.prototype.haveMetadata = async function({
        playlistString: me,
        playlistObject: H,
        url: $,
        id: J
      }) {
        console.log("state", me, H, $, J);
        try {
          me && (me = await d.loadSource({
            config: Fe,
            manifest: me,
            masterUri: this.main.playlists[J].resolvedUri
          })), be.apply(this, [{ playlistString: me, playlistObject: H, url: $, id: J }]);
        } catch (D) {
          console.error("Error loading source:", D);
        }
      };
    }(videojs), function($e) {
      const be = $e.Vhs.PlaylistLoader.prototype.parseManifest_;
      $e.Vhs.PlaylistLoader.prototype.parseManifest_ = function({ url: me, manifestString: H }) {
        const $ = be.apply(this, [{ url: me, manifestString: H }]);
        return $.playlists && $.playlists.length && ($.manifestString = H), $;
      };
    }(videojs), function($e) {
      const be = (H, $) => {
        const J = H.segments || [], D = J[J.length - 1], U = D && D.parts && D.parts[D.parts.length - 1], ce = U && U.duration || D && D.duration;
        return ce ? ce * 1e3 : (H.partTargetDuration || H.targetDuration || 10) * 500;
      }, me = (H, $) => $ && $.responseURL && H !== $.responseURL ? $.responseURL : H;
      $e.Vhs.PlaylistLoader.prototype.media = function(H, $) {
        if (!H)
          return this.media_;
        if (this.state === "HAVE_NOTHING")
          throw new Error("Cannot switch media playlist from " + this.state);
        if (typeof H == "string") {
          if (!this.main.playlists[H])
            throw new Error("Unknown playlist URI: " + H);
          H = this.main.playlists[H];
        }
        if (window.clearTimeout(this.finalRenditionTimeout), $) {
          const ze = (H.partTargetDuration || H.targetDuration) / 2 * 1e3 || 5e3;
          console.log("Delay:", ze), this.finalRenditionTimeout = window.setTimeout(this.media.bind(this, H, !1), ze);
          return;
        }
        const J = this.state, D = !this.media_ || H.id !== this.media_.id, U = this.main.playlists[H.id];
        if (U && U.endList || // handle the case of a playlist object (e.g., if using vhs-json with a resolved
        // media playlist or, for the case of demuxed audio, a resolved audio media group)
        H.endList && H.segments.length) {
          this.request && (this.request.onreadystatechange = null, this.request.abort(), this.request = null), this.state = "HAVE_METADATA", this.media_ = H, D && (this.trigger("mediachanging"), J === "HAVE_MAIN_MANIFEST" ? this.trigger("loadedmetadata") : this.trigger("mediachange"));
          return;
        }
        if (this.updateMediaUpdateTimeout_(be(H)), !D)
          return;
        if (this.state = "SWITCHING_MEDIA", this.request) {
          if (H.resolvedUri === this.request.url)
            return;
          this.request.onreadystatechange = null, this.request.abort(), this.request = null;
        }
        this.media_ && this.trigger("mediachanging"), this.pendingMedia_ = H;
        const ce = {
          playlistInfo: {
            type: "media",
            uri: H.uri
          }
        };
        this.trigger({ type: "playlistrequeststart", metadata: ce }), this.request = this.vhs_.xhr(
          {
            uri: H.resolvedUri,
            withCredentials: this.withCredentials,
            requestType: "hls-playlist"
          },
          (ze, Qe) => {
            if (this.request) {
              if (H.lastRequest = Date.now(), H.resolvedUri = me(H.resolvedUri, Qe), ze)
                return this.playlistRequestError(this.request, H, J);
              this.haveMetadata({
                playlistString: Qe.responseText,
                url: H.uri,
                id: H.id
              }).then(() => {
                this.trigger({ type: "playlistrequestcomplete", metadata: ce }), J === "HAVE_MAIN_MANIFEST" ? this.trigger("loadedmetadata") : this.trigger("mediachange");
              });
            }
          }
        );
      };
    }(videojs), xe.value = we;
    const Er = R.createVideojsAddTrack();
    we.textTracks().on("addtrack", Er), tr.value = () => {
      we.textTracks().off("addtrack", Er);
    };
  }
  function xr() {
    var we, Fe;
    O(), (we = _.value) == null || we.call(_), (Fe = tr.value) == null || Fe.call(tr), b.value = null, xe.value = null, _.value = null, tr.value = null;
  }
  return {
    onEventTracking: g,
    destroy: xr,
    sigmaPlayer: {
      attachVideojs: T,
      attachHls: M,
      attachSigmaDrm: oe,
      attachVideojs2: T,
      getLog: L
    },
    sdk: d
  };
}
export {
  cc as createSigmaDai
};
