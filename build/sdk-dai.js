var ys = Object.defineProperty;
var Es = (t, o, s) => o in t ? ys(t, o, { enumerable: !0, configurable: !0, writable: !0, value: s }) : t[o] = s;
var It = (t, o, s) => Es(t, typeof o != "symbol" ? o + "" : o, s);
const bs = /#/g, Ps = /&/g, Ts = /\//g, Ss = /=/g, po = /\+/g, Rs = /%5e/gi, xs = /%60/gi, Os = /%7c/gi, Is = /%20/gi;
function Cs(t) {
  return encodeURI("" + t).replace(Os, "|");
}
function co(t) {
  return Cs(typeof t == "string" ? t : JSON.stringify(t)).replace(po, "%2B").replace(Is, "+").replace(bs, "%23").replace(Ps, "%26").replace(xs, "`").replace(Rs, "^").replace(Ts, "%2F");
}
function oo(t) {
  return co(t).replace(Ss, "%3D");
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
function _s(t) {
  return ia(t.replace(po, " "));
}
function aa(t = "") {
  const o = {};
  t[0] === "?" && (t = t.slice(1));
  for (const s of t.split("&")) {
    const d = s.match(/([^=]+)=?(.*)/) || [];
    if (d.length < 2)
      continue;
    const f = Ds(d[1]);
    if (f === "__proto__" || f === "constructor")
      continue;
    const m = _s(d[2] || "");
    o[f] === void 0 ? o[f] = m : Array.isArray(o[f]) ? o[f].push(m) : o[f] = [o[f], m];
  }
  return o;
}
function Ns(t, o) {
  return (typeof o == "number" || typeof o == "boolean") && (o = String(o)), o ? Array.isArray(o) ? o.map((s) => `${oo(t)}=${co(s)}`).join("&") : `${oo(t)}=${co(o)}` : oo(t);
}
function As(t) {
  return Object.keys(t).filter((o) => t[o] !== void 0).map((o) => Ns(o, t[o])).filter(Boolean).join("&");
}
const Ws = /^[\s\w\0+.-]{2,}:([/\\]{1,2})/, Ms = /^[\s\w\0+.-]{2,}:([/\\]{2})?/, Fs = /^([/\\]\s*){2,}[^/\\]/, zs = /^\.?\//;
function sa(t, o = {}) {
  return typeof o == "boolean" && (o = { acceptRelative: o }), o.strict ? Ws.test(t) : Ms.test(t) || (o.acceptRelative ? Fs.test(t) : !1);
}
function Us(t = "", o) {
  return t.endsWith("/");
}
function Ls(t = "", o) {
  return (Us(t) ? t.slice(0, -1) : t) || "/";
}
function js(t = "", o) {
  return t.endsWith("/") ? t : t + "/";
}
function Bs(t, o) {
  if (Hs(o) || sa(t))
    return t;
  const s = Ls(o);
  return t.startsWith(s) ? t : Pn(s, t);
}
function En(t, o) {
  const s = vo(t), d = { ...aa(s.search), ...o };
  return s.search = As(d), Vs(s);
}
function qs(t) {
  return aa(vo(t).search);
}
function Hs(t) {
  return !t || t === "/";
}
function $s(t) {
  return t && t !== "/";
}
function Pn(t, ...o) {
  let s = t || "";
  for (const d of o.filter((f) => $s(f)))
    if (s) {
      const f = d.replace(zs, "");
      s = js(s) + f;
    } else
      s = d;
  return s;
}
const ca = Symbol.for("ufo:protocolRelative");
function vo(t = "", o) {
  const s = t.match(
    /^[\s\0]*(blob:|data:|javascript:|vbscript:)(.*)/i
  );
  if (s) {
    const [, D, N = ""] = s;
    return {
      protocol: D.toLowerCase(),
      pathname: N,
      href: D + N,
      auth: "",
      host: "",
      search: "",
      hash: ""
    };
  }
  if (!sa(t, { acceptRelative: !0 }))
    return qi(t);
  const [, d = "", f, m = ""] = t.replace(/\\/g, "/").match(/^[\s\0]*([\w+.-]{2,}:)?\/\/([^/@]+@)?(.*)/) || [];
  let [, E = "", p = ""] = m.match(/([^#/?]*)(.*)?/) || [];
  d === "file:" && (p = p.replace(/\/(?=[A-Za-z]:)/, ""));
  const { pathname: x, search: C, hash: b } = qi(p);
  return {
    protocol: d.toLowerCase(),
    auth: f ? f.slice(0, Math.max(0, f.length - 1)) : "",
    host: E,
    pathname: x,
    search: C,
    hash: b,
    [ca]: !d
  };
}
function qi(t = "") {
  const [o = "", s = "", d = ""] = (t.match(/([^#?]*)(\?[^#]*)?(#.*)?/) || []).splice(1);
  return {
    pathname: o,
    search: s,
    hash: d
  };
}
function Vs(t) {
  const o = t.pathname || "", s = t.search ? (t.search.startsWith("?") ? "" : "?") + t.search : "", d = t.hash || "", f = t.auth ? t.auth + "@" : "", m = t.host || "";
  return (t.protocol || t[ca] ? (t.protocol || "") + "//" : "") + f + m + o + s + d;
}
const Gs = (t) => (o, s) => (t.set(o, s), s), Hi = Number.MAX_SAFE_INTEGER === void 0 ? 9007199254740991 : Number.MAX_SAFE_INTEGER, ua = 536870912, $i = ua * 2, Js = (t, o) => (s) => {
  const d = o.get(s);
  let f = d === void 0 ? s.size : d < $i ? d + 1 : 0;
  if (!s.has(f))
    return t(s, f);
  if (s.size < ua) {
    for (; s.has(f); )
      f = Math.floor(Math.random() * $i);
    return t(s, f);
  }
  if (s.size > Hi)
    throw new Error("Congratulations, you created a collection of unique numbers which uses all available integers!");
  for (; s.has(f); )
    f = Math.floor(Math.random() * Hi);
  return t(s, f);
}, da = /* @__PURE__ */ new WeakMap(), Ks = Gs(da), pn = Js(Ks, da), Ys = (t) => t.method !== void 0 && t.method === "call", Zs = (t) => typeof t.id == "number" && typeof t.result == "boolean", Xs = (t) => {
  const o = /* @__PURE__ */ new Map([[0, () => {
  }]]), s = /* @__PURE__ */ new Map([[0, () => {
  }]]), d = /* @__PURE__ */ new Map(), f = new Worker(t);
  return f.addEventListener("message", ({ data: C }) => {
    if (Ys(C)) {
      const { params: { timerId: b, timerType: D } } = C;
      if (D === "interval") {
        const N = o.get(b);
        if (typeof N === void 0)
          throw new Error("The timer is in an undefined state.");
        if (typeof N == "number") {
          const ae = d.get(N);
          if (ae === void 0 || ae.timerId !== b || ae.timerType !== D)
            throw new Error("The timer is in an undefined state.");
        } else typeof N == "function" && N();
      } else if (D === "timeout") {
        const N = s.get(b);
        if (typeof N === void 0)
          throw new Error("The timer is in an undefined state.");
        if (typeof N == "number") {
          const ae = d.get(N);
          if (ae === void 0 || ae.timerId !== b || ae.timerType !== D)
            throw new Error("The timer is in an undefined state.");
        } else typeof N == "function" && (N(), s.delete(b));
      }
    } else if (Zs(C)) {
      const { id: b } = C, D = d.get(b);
      if (D === void 0)
        throw new Error("The timer is in an undefined state.");
      const { timerId: N, timerType: ae } = D;
      d.delete(b), ae === "interval" ? o.delete(N) : s.delete(N);
    } else {
      const { error: { message: b } } = C;
      throw new Error(b);
    }
  }), {
    clearInterval: (C) => {
      if (typeof o.get(C) == "function") {
        const b = pn(d);
        d.set(b, { timerId: C, timerType: "interval" }), o.set(C, b), f.postMessage({
          id: b,
          method: "clear",
          params: { timerId: C, timerType: "interval" }
        });
      }
    },
    clearTimeout: (C) => {
      if (typeof s.get(C) == "function") {
        const b = pn(d);
        d.set(b, { timerId: C, timerType: "timeout" }), s.set(C, b), f.postMessage({
          id: b,
          method: "clear",
          params: { timerId: C, timerType: "timeout" }
        });
      }
    },
    setInterval: (C, b = 0, ...D) => {
      const N = pn(o);
      return o.set(N, () => {
        C(...D), typeof o.get(N) == "function" && f.postMessage({
          id: null,
          method: "set",
          params: {
            delay: b,
            now: performance.timeOrigin + performance.now(),
            timerId: N,
            timerType: "interval"
          }
        });
      }), f.postMessage({
        id: null,
        method: "set",
        params: {
          delay: b,
          now: performance.timeOrigin + performance.now(),
          timerId: N,
          timerType: "interval"
        }
      }), N;
    },
    setTimeout: (C, b = 0, ...D) => {
      const N = pn(s);
      return s.set(N, () => C(...D)), f.postMessage({
        id: null,
        method: "set",
        params: {
          delay: b,
          now: performance.timeOrigin + performance.now(),
          timerId: N,
          timerType: "timeout"
        }
      }), N;
    }
  };
}, Qs = (t, o) => {
  let s = null;
  return () => {
    if (s !== null)
      return s;
    const d = new Blob([o], { type: "application/javascript; charset=utf-8" }), f = URL.createObjectURL(d);
    return s = t(f), setTimeout(() => URL.revokeObjectURL(f)), s;
  };
}, ks = `(()=>{"use strict";const e=new Map,t=new Map,r=t=>{const r=e.get(t);return void 0!==r&&(clearTimeout(r),e.delete(t),!0)},s=e=>{const r=t.get(e);return void 0!==r&&(clearTimeout(r),t.delete(e),!0)},o=(e,t)=>{const r=performance.now(),s=e+t-r-performance.timeOrigin;return{expected:r+s,remainingDelay:s}},i=(e,t,r,s)=>{const o=r-performance.now();o>0?e.set(t,setTimeout(i,o,e,t,r,s)):(e.delete(t),postMessage({id:null,method:"call",params:{timerId:t,timerType:s}}))};addEventListener("message",(n=>{let{data:a}=n;try{if("clear"===a.method){const{id:e,params:{timerId:t,timerType:o}}=a;if("interval"===o)postMessage({id:e,result:r(t)});else{if("timeout"!==o)throw new Error('The given type "'.concat(o,'" is not supported'));postMessage({id:e,result:s(t)})}}else{if("set"!==a.method)throw new Error('The given method "'.concat(a.method,'" is not supported'));{const{params:{delay:r,now:s,timerId:n,timerType:m}}=a;if("interval"===m)((t,r,s)=>{const{expected:n,remainingDelay:a}=o(t,s);e.set(r,setTimeout(i,a,e,r,n,"interval"))})(r,n,s);else{if("timeout"!==m)throw new Error('The given type "'.concat(m,'" is not supported'));((e,r,s)=>{const{expected:n,remainingDelay:a}=o(e,s);t.set(r,setTimeout(i,a,t,r,n,"timeout"))})(r,n,s)}}}}catch(e){postMessage({error:{message:e.message},id:a.id,result:null})}}))})();`, ec = Qs(Xs, ks), Vi = (t) => ec().clearTimeout(t);
/**
* @vue/shared v3.5.1
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
/*! #__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function tc(t, o) {
  const s = new Set(t.split(","));
  return (d) => s.has(d);
}
const Gi = Object.assign, rc = Object.prototype.hasOwnProperty, uo = (t, o) => rc.call(t, o), Tr = Array.isArray, $r = (t) => fa(t) === "[object Map]", nc = (t) => typeof t == "string", Kr = (t) => typeof t == "symbol", Tn = (t) => t !== null && typeof t == "object", oc = Object.prototype.toString, fa = (t) => oc.call(t), la = (t) => fa(t).slice(8, -1), wo = (t) => nc(t) && t !== "NaN" && t[0] !== "-" && "" + parseInt(t, 10) === t, ic = (t) => {
  const o = /* @__PURE__ */ Object.create(null);
  return (s) => o[s] || (o[s] = t(s));
}, ac = ic((t) => t.charAt(0).toUpperCase() + t.slice(1)), Or = (t, o) => !Object.is(t, o);
var tt = {};
function Rr(t, ...o) {
  console.warn(`[Vue warn] ${t}`, ...o);
}
let ge;
const io = /* @__PURE__ */ new WeakSet();
class Ji {
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
    this.flags |= 2, Ki(this), pa(this);
    const o = ge, s = Ct;
    ge = this, Ct = !0;
    try {
      return this.fn();
    } finally {
      tt.NODE_ENV !== "production" && ge !== this && Rr(
        "Active effect was not restored correctly - this is likely a Vue internal bug."
      ), va(this), ge = o, Ct = s, this.flags &= -3;
    }
  }
  stop() {
    if (this.flags & 1) {
      for (let o = this.deps; o; o = o.nextDep)
        yo(o);
      this.deps = this.depsTail = void 0, Ki(this), this.onStop && this.onStop(), this.flags &= -2;
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
function mo() {
  ha++;
}
function go() {
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
        } catch (d) {
          t || (t = d);
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
  for (let d = s; d; d = d.prevDep)
    d.version === -1 ? (d === s && (s = d.prevDep), yo(d), cc(d)) : o = d, d.dep.activeLink = d.prevActiveLink, d.prevActiveLink = void 0;
  t.deps = o, t.depsTail = s;
}
function fo(t) {
  for (let o = t.deps; o; o = o.nextDep)
    if (o.dep.version !== o.version || o.dep.computed && sc(o.dep.computed) === !1 || o.dep.version !== o.version)
      return !0;
  return !!t._dirty;
}
function sc(t) {
  if (t.flags & 2)
    return !1;
  if (t.flags & 4 && !(t.flags & 16) || (t.flags &= -17, t.globalVersion === bn))
    return;
  t.globalVersion = bn;
  const o = t.dep;
  if (t.flags |= 2, o.version > 0 && !t.isSSR && !fo(t)) {
    t.flags &= -3;
    return;
  }
  const s = ge, d = Ct;
  ge = t, Ct = !0;
  try {
    pa(t);
    const f = t.fn();
    (o.version === 0 || Or(f, t._value)) && (t._value = f, o.version++);
  } catch (f) {
    throw o.version++, f;
  } finally {
    ge = s, Ct = d, va(t), t.flags &= -3;
  }
}
function yo(t) {
  const { dep: o, prevSub: s, nextSub: d } = t;
  if (s && (s.nextSub = d, t.prevSub = void 0), d && (d.prevSub = s, t.nextSub = void 0), o.subs === t && (o.subs = s), !o.subs && o.computed) {
    o.computed.flags &= -5;
    for (let f = o.computed.deps; f; f = f.nextDep)
      yo(f);
  }
}
function cc(t) {
  const { prevDep: o, nextDep: s } = t;
  o && (o.nextDep = s, t.prevDep = void 0), s && (s.prevDep = o, t.nextDep = void 0);
}
function uc(t, o) {
  t.effect instanceof Ji && (t = t.effect.fn);
  const s = new Ji(t);
  try {
    s.run();
  } catch (f) {
    throw s.stop(), f;
  }
  const d = s.run.bind(s);
  return d.effect = s, d;
}
let Ct = !0;
const wa = [];
function dc() {
  wa.push(Ct), Ct = !1;
}
function fc() {
  const t = wa.pop();
  Ct = t === void 0 ? !0 : t;
}
function Ki(t) {
  const { cleanup: o } = t;
  if (t.cleanup = void 0, o) {
    const s = ge;
    ge = void 0;
    try {
      o();
    } finally {
      ge = s;
    }
  }
}
let bn = 0;
class ma {
  constructor(o) {
    this.computed = o, this.version = 0, this.activeLink = void 0, this.subs = void 0, tt.NODE_ENV !== "production" && (this.subsHead = void 0);
  }
  track(o) {
    if (!ge || !Ct)
      return;
    let s = this.activeLink;
    if (s === void 0 || s.sub !== ge)
      s = this.activeLink = {
        dep: this,
        sub: ge,
        version: this.version,
        nextDep: void 0,
        prevDep: void 0,
        nextSub: void 0,
        prevSub: void 0,
        prevActiveLink: void 0
      }, ge.deps ? (s.prevDep = ge.depsTail, ge.depsTail.nextDep = s, ge.depsTail = s) : ge.deps = ge.depsTail = s, ge.flags & 4 && ga(s);
    else if (s.version === -1 && (s.version = this.version, s.nextDep)) {
      const d = s.nextDep;
      d.prevDep = s.prevDep, s.prevDep && (s.prevDep.nextDep = d), s.prevDep = ge.depsTail, s.nextDep = void 0, ge.depsTail.nextDep = s, ge.depsTail = s, ge.deps === s && (ge.deps = d);
    }
    return tt.NODE_ENV !== "production" && ge.onTrack && ge.onTrack(
      Gi(
        {
          effect: ge
        },
        o
      )
    ), s;
  }
  trigger(o) {
    this.version++, bn++, this.notify(o);
  }
  notify(o) {
    mo();
    try {
      if (tt.NODE_ENV !== "production")
        for (let s = this.subsHead; s; s = s.nextSub)
          tt.NODE_ENV !== "production" && s.sub.onTrigger && !(s.sub.flags & 8) && s.sub.onTrigger(
            Gi(
              {
                effect: s.sub
              },
              o
            )
          );
      for (let s = this.subs; s; s = s.prevSub)
        s.sub.notify();
    } finally {
      go();
    }
  }
}
function ga(t) {
  const o = t.dep.computed;
  if (o && !t.dep.subs) {
    o.flags |= 20;
    for (let d = o.deps; d; d = d.nextDep)
      ga(d);
  }
  const s = t.dep.subs;
  s !== t && (t.prevSub = s, s && (s.nextSub = t)), tt.NODE_ENV !== "production" && t.dep.subsHead === void 0 && (t.dep.subsHead = t), t.dep.subs = t;
}
const lo = /* @__PURE__ */ new WeakMap(), pr = Symbol(
  tt.NODE_ENV !== "production" ? "Object iterate" : ""
), ho = Symbol(
  tt.NODE_ENV !== "production" ? "Map keys iterate" : ""
), Gr = Symbol(
  tt.NODE_ENV !== "production" ? "Array iterate" : ""
);
function vt(t, o, s) {
  if (Ct && ge) {
    let d = lo.get(t);
    d || lo.set(t, d = /* @__PURE__ */ new Map());
    let f = d.get(s);
    f || d.set(s, f = new ma()), tt.NODE_ENV !== "production" ? f.track({
      target: t,
      type: o,
      key: s
    }) : f.track();
  }
}
function rr(t, o, s, d, f, m) {
  const E = lo.get(t);
  if (!E) {
    bn++;
    return;
  }
  let p = [];
  if (o === "clear")
    p = [...E.values()];
  else {
    const x = Tr(t), C = x && wo(s);
    if (x && s === "length") {
      const b = Number(d);
      E.forEach((D, N) => {
        (N === "length" || N === Gr || !Kr(N) && N >= b) && p.push(D);
      });
    } else {
      const b = (D) => D && p.push(D);
      switch (s !== void 0 && b(E.get(s)), C && b(E.get(Gr)), o) {
        case "add":
          x ? C && b(E.get("length")) : (b(E.get(pr)), $r(t) && b(E.get(ho)));
          break;
        case "delete":
          x || (b(E.get(pr)), $r(t) && b(E.get(ho)));
          break;
        case "set":
          $r(t) && b(E.get(pr));
          break;
      }
    }
  }
  mo();
  for (const x of p)
    tt.NODE_ENV !== "production" ? x.trigger({
      target: t,
      type: o,
      key: s,
      newValue: d,
      oldValue: f,
      oldTarget: m
    }) : x.trigger();
  go();
}
function br(t) {
  const o = ye(t);
  return o === t ? o : (vt(o, "iterate", Gr), nr(t) ? o : o.map(ht));
}
function Eo(t) {
  return vt(t = ye(t), "iterate", Gr), t;
}
const lc = {
  __proto__: null,
  [Symbol.iterator]() {
    return ao(this, Symbol.iterator, ht);
  },
  concat(...t) {
    return br(this).concat(
      ...t.map((o) => Tr(o) ? br(o) : o)
    );
  },
  entries() {
    return ao(this, "entries", (t) => (t[1] = ht(t[1]), t));
  },
  every(t, o) {
    return jt(this, "every", t, o, void 0, arguments);
  },
  filter(t, o) {
    return jt(this, "filter", t, o, (s) => s.map(ht), arguments);
  },
  find(t, o) {
    return jt(this, "find", t, o, ht, arguments);
  },
  findIndex(t, o) {
    return jt(this, "findIndex", t, o, void 0, arguments);
  },
  findLast(t, o) {
    return jt(this, "findLast", t, o, ht, arguments);
  },
  findLastIndex(t, o) {
    return jt(this, "findLastIndex", t, o, void 0, arguments);
  },
  // flat, flatMap could benefit from ARRAY_ITERATE but are not straight-forward to implement
  forEach(t, o) {
    return jt(this, "forEach", t, o, void 0, arguments);
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
    return jt(this, "map", t, o, void 0, arguments);
  },
  pop() {
    return Hr(this, "pop");
  },
  push(...t) {
    return Hr(this, "push", t);
  },
  reduce(t, ...o) {
    return Yi(this, "reduce", t, o);
  },
  reduceRight(t, ...o) {
    return Yi(this, "reduceRight", t, o);
  },
  shift() {
    return Hr(this, "shift");
  },
  // slice could use ARRAY_ITERATE but also seems to beg for range tracking
  some(t, o) {
    return jt(this, "some", t, o, void 0, arguments);
  },
  splice(...t) {
    return Hr(this, "splice", t);
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
    return Hr(this, "unshift", t);
  },
  values() {
    return ao(this, "values", ht);
  }
};
function ao(t, o, s) {
  const d = Eo(t), f = d[o]();
  return d !== t && !nr(t) && (f._next = f.next, f.next = () => {
    const m = f._next();
    return m.value && (m.value = s(m.value)), m;
  }), f;
}
const hc = Array.prototype;
function jt(t, o, s, d, f, m) {
  const E = Eo(t), p = E !== t && !nr(t), x = E[o];
  if (x !== hc[o]) {
    const D = x.apply(t, m);
    return p ? ht(D) : D;
  }
  let C = s;
  E !== t && (p ? C = function(D, N) {
    return s.call(this, ht(D), N, t);
  } : s.length > 2 && (C = function(D, N) {
    return s.call(this, D, N, t);
  }));
  const b = x.call(E, C, d);
  return p && f ? f(b) : b;
}
function Yi(t, o, s, d) {
  const f = Eo(t);
  let m = s;
  return f !== t && (nr(t) ? s.length > 3 && (m = function(E, p, x) {
    return s.call(this, E, p, x, t);
  }) : m = function(E, p, x) {
    return s.call(this, E, ht(p), x, t);
  }), f[o](m, ...d);
}
function so(t, o, s) {
  const d = ye(t);
  vt(d, "iterate", Gr);
  const f = d[o](...s);
  return (f === -1 || f === !1) && _c(s[0]) ? (s[0] = ye(s[0]), d[o](...s)) : f;
}
function Hr(t, o, s = []) {
  dc(), mo();
  const d = ye(t)[o].apply(t, s);
  return go(), fc(), d;
}
const pc = /* @__PURE__ */ tc("__proto__,__v_isRef,__isVue"), ya = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((t) => t !== "arguments" && t !== "caller").map((t) => Symbol[t]).filter(Kr)
);
function vc(t) {
  Kr(t) || (t = String(t));
  const o = ye(this);
  return vt(o, "has", t), o.hasOwnProperty(t);
}
class Ea {
  constructor(o = !1, s = !1) {
    this._isReadonly = o, this._isShallow = s;
  }
  get(o, s, d) {
    const f = this._isReadonly, m = this._isShallow;
    if (s === "__v_isReactive")
      return !f;
    if (s === "__v_isReadonly")
      return f;
    if (s === "__v_isShallow")
      return m;
    if (s === "__v_raw")
      return d === (f ? m ? Ic : Sa : m ? Oc : Ta).get(o) || // receiver is not the reactive proxy, but has the same prototype
      // this means the receiver is a user proxy of the reactive proxy
      Object.getPrototypeOf(o) === Object.getPrototypeOf(d) ? o : void 0;
    const E = Tr(o);
    if (!f) {
      let x;
      if (E && (x = lc[s]))
        return x;
      if (s === "hasOwnProperty")
        return vc;
    }
    const p = Reflect.get(
      o,
      s,
      // if this is a proxy wrapping a ref, return methods using the raw ref
      // as receiver so that we don't have to call `toRaw` on the ref in all
      // its class methods
      Sr(o) ? o : d
    );
    return (Kr(s) ? ya.has(s) : pc(s)) || (f || vt(o, "get", s), m) ? p : Sr(p) ? E && wo(s) ? p : p.value : Tn(p) ? f ? xa(p) : Ra(p) : p;
  }
}
class wc extends Ea {
  constructor(o = !1) {
    super(!1, o);
  }
  set(o, s, d, f) {
    let m = o[s];
    if (!this._isShallow) {
      const x = xr(m);
      if (!nr(d) && !xr(d) && (m = ye(m), d = ye(d)), !Tr(o) && Sr(m) && !Sr(d))
        return x ? !1 : (m.value = d, !0);
    }
    const E = Tr(o) && wo(s) ? Number(s) < o.length : uo(o, s), p = Reflect.set(
      o,
      s,
      d,
      Sr(o) ? o : f
    );
    return o === ye(f) && (E ? Or(d, m) && rr(o, "set", s, d, m) : rr(o, "add", s, d)), p;
  }
  deleteProperty(o, s) {
    const d = uo(o, s), f = o[s], m = Reflect.deleteProperty(o, s);
    return m && d && rr(o, "delete", s, void 0, f), m;
  }
  has(o, s) {
    const d = Reflect.has(o, s);
    return (!Kr(s) || !ya.has(s)) && vt(o, "has", s), d;
  }
  ownKeys(o) {
    return vt(
      o,
      "iterate",
      Tr(o) ? "length" : pr
    ), Reflect.ownKeys(o);
  }
}
class mc extends Ea {
  constructor(o = !1) {
    super(!0, o);
  }
  set(o, s) {
    return tt.NODE_ENV !== "production" && Rr(
      `Set operation on key "${String(s)}" failed: target is readonly.`,
      o
    ), !0;
  }
  deleteProperty(o, s) {
    return tt.NODE_ENV !== "production" && Rr(
      `Delete operation on key "${String(s)}" failed: target is readonly.`,
      o
    ), !0;
  }
}
const gc = /* @__PURE__ */ new wc(), yc = /* @__PURE__ */ new mc(), bo = (t) => t, Sn = (t) => Reflect.getPrototypeOf(t);
function vn(t, o, s = !1, d = !1) {
  t = t.__v_raw;
  const f = ye(t), m = ye(o);
  s || (Or(o, m) && vt(f, "get", o), vt(f, "get", m));
  const { has: E } = Sn(f), p = d ? bo : s ? Po : ht;
  if (E.call(f, o))
    return p(t.get(o));
  if (E.call(f, m))
    return p(t.get(m));
  t !== f && t.get(o);
}
function wn(t, o = !1) {
  const s = this.__v_raw, d = ye(s), f = ye(t);
  return o || (Or(t, f) && vt(d, "has", t), vt(d, "has", f)), t === f ? s.has(t) : s.has(t) || s.has(f);
}
function mn(t, o = !1) {
  return t = t.__v_raw, !o && vt(ye(t), "iterate", pr), Reflect.get(t, "size", t);
}
function Zi(t, o = !1) {
  !o && !nr(t) && !xr(t) && (t = ye(t));
  const s = ye(this);
  return Sn(s).has.call(s, t) || (s.add(t), rr(s, "add", t, t)), this;
}
function Xi(t, o, s = !1) {
  !s && !nr(o) && !xr(o) && (o = ye(o));
  const d = ye(this), { has: f, get: m } = Sn(d);
  let E = f.call(d, t);
  E ? tt.NODE_ENV !== "production" && Pa(d, f, t) : (t = ye(t), E = f.call(d, t));
  const p = m.call(d, t);
  return d.set(t, o), E ? Or(o, p) && rr(d, "set", t, o, p) : rr(d, "add", t, o), this;
}
function Qi(t) {
  const o = ye(this), { has: s, get: d } = Sn(o);
  let f = s.call(o, t);
  f ? tt.NODE_ENV !== "production" && Pa(o, s, t) : (t = ye(t), f = s.call(o, t));
  const m = d ? d.call(o, t) : void 0, E = o.delete(t);
  return f && rr(o, "delete", t, void 0, m), E;
}
function ki() {
  const t = ye(this), o = t.size !== 0, s = tt.NODE_ENV !== "production" ? $r(t) ? new Map(t) : new Set(t) : void 0, d = t.clear();
  return o && rr(t, "clear", void 0, void 0, s), d;
}
function gn(t, o) {
  return function(d, f) {
    const m = this, E = m.__v_raw, p = ye(E), x = o ? bo : t ? Po : ht;
    return !t && vt(p, "iterate", pr), E.forEach((C, b) => d.call(f, x(C), x(b), m));
  };
}
function yn(t, o, s) {
  return function(...d) {
    const f = this.__v_raw, m = ye(f), E = $r(m), p = t === "entries" || t === Symbol.iterator && E, x = t === "keys" && E, C = f[t](...d), b = s ? bo : o ? Po : ht;
    return !o && vt(
      m,
      "iterate",
      x ? ho : pr
    ), {
      // iterator protocol
      next() {
        const { value: D, done: N } = C.next();
        return N ? { value: D, done: N } : {
          value: p ? [b(D[0]), b(D[1])] : b(D),
          done: N
        };
      },
      // iterable protocol
      [Symbol.iterator]() {
        return this;
      }
    };
  };
}
function tr(t) {
  return function(...o) {
    if (tt.NODE_ENV !== "production") {
      const s = o[0] ? `on key "${o[0]}" ` : "";
      Rr(
        `${ac(t)} operation ${s}failed: target is readonly.`,
        ye(this)
      );
    }
    return t === "delete" ? !1 : t === "clear" ? void 0 : this;
  };
}
function Ec() {
  const t = {
    get(m) {
      return vn(this, m);
    },
    get size() {
      return mn(this);
    },
    has: wn,
    add: Zi,
    set: Xi,
    delete: Qi,
    clear: ki,
    forEach: gn(!1, !1)
  }, o = {
    get(m) {
      return vn(this, m, !1, !0);
    },
    get size() {
      return mn(this);
    },
    has: wn,
    add(m) {
      return Zi.call(this, m, !0);
    },
    set(m, E) {
      return Xi.call(this, m, E, !0);
    },
    delete: Qi,
    clear: ki,
    forEach: gn(!1, !0)
  }, s = {
    get(m) {
      return vn(this, m, !0);
    },
    get size() {
      return mn(this, !0);
    },
    has(m) {
      return wn.call(this, m, !0);
    },
    add: tr("add"),
    set: tr("set"),
    delete: tr("delete"),
    clear: tr("clear"),
    forEach: gn(!0, !1)
  }, d = {
    get(m) {
      return vn(this, m, !0, !0);
    },
    get size() {
      return mn(this, !0);
    },
    has(m) {
      return wn.call(this, m, !0);
    },
    add: tr("add"),
    set: tr("set"),
    delete: tr("delete"),
    clear: tr("clear"),
    forEach: gn(!0, !0)
  };
  return [
    "keys",
    "values",
    "entries",
    Symbol.iterator
  ].forEach((m) => {
    t[m] = yn(m, !1, !1), s[m] = yn(m, !0, !1), o[m] = yn(m, !1, !0), d[m] = yn(
      m,
      !0,
      !0
    );
  }), [
    t,
    s,
    o,
    d
  ];
}
const [
  bc,
  Pc,
  Tc,
  Sc
] = /* @__PURE__ */ Ec();
function ba(t, o) {
  const s = o ? t ? Sc : Tc : t ? Pc : bc;
  return (d, f, m) => f === "__v_isReactive" ? !t : f === "__v_isReadonly" ? t : f === "__v_raw" ? d : Reflect.get(
    uo(s, f) && f in d ? s : d,
    f,
    m
  );
}
const Rc = {
  get: /* @__PURE__ */ ba(!1, !1)
}, xc = {
  get: /* @__PURE__ */ ba(!0, !1)
};
function Pa(t, o, s) {
  const d = ye(s);
  if (d !== s && o.call(t, d)) {
    const f = la(t);
    Rr(
      `Reactive ${f} contains both the raw and reactive versions of the same object${f === "Map" ? " as keys" : ""}, which can lead to inconsistencies. Avoid differentiating between the raw and reactive versions of an object and only use the reactive version if possible.`
    );
  }
}
const Ta = /* @__PURE__ */ new WeakMap(), Oc = /* @__PURE__ */ new WeakMap(), Sa = /* @__PURE__ */ new WeakMap(), Ic = /* @__PURE__ */ new WeakMap();
function Cc(t) {
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
function Dc(t) {
  return t.__v_skip || !Object.isExtensible(t) ? 0 : Cc(la(t));
}
function Ra(t) {
  return xr(t) ? t : Oa(
    t,
    !1,
    gc,
    Rc,
    Ta
  );
}
function xa(t) {
  return Oa(
    t,
    !0,
    yc,
    xc,
    Sa
  );
}
function Oa(t, o, s, d, f) {
  if (!Tn(t))
    return tt.NODE_ENV !== "production" && Rr(
      `value cannot be made ${o ? "readonly" : "reactive"}: ${String(
        t
      )}`
    ), t;
  if (t.__v_raw && !(o && t.__v_isReactive))
    return t;
  const m = f.get(t);
  if (m)
    return m;
  const E = Dc(t);
  if (E === 0)
    return t;
  const p = new Proxy(
    t,
    E === 2 ? d : s
  );
  return f.set(t, p), p;
}
function xr(t) {
  return !!(t && t.__v_isReadonly);
}
function nr(t) {
  return !!(t && t.__v_isShallow);
}
function _c(t) {
  return t ? !!t.__v_raw : !1;
}
function ye(t) {
  const o = t && t.__v_raw;
  return o ? ye(o) : t;
}
const ht = (t) => Tn(t) ? Ra(t) : t, Po = (t) => Tn(t) ? xa(t) : t;
function Sr(t) {
  return t ? t.__v_isRef === !0 : !1;
}
function qt(t) {
  return Nc(t, !1);
}
function Nc(t, o) {
  return Sr(t) ? t : new Ac(t, o);
}
class Ac {
  constructor(o, s) {
    this.dep = new ma(), this.__v_isRef = !0, this.__v_isShallow = !1, this._rawValue = s ? o : ye(o), this._value = s ? o : ht(o), this.__v_isShallow = s;
  }
  get value() {
    return tt.NODE_ENV !== "production" ? this.dep.track({
      target: this,
      type: "get",
      key: "value"
    }) : this.dep.track(), this._value;
  }
  set value(o) {
    const s = this._rawValue, d = this.__v_isShallow || nr(o) || xr(o);
    o = d ? o : ye(o), Or(o, s) && (this._rawValue = o, this._value = d ? o : ht(o), tt.NODE_ENV !== "production" ? this.dep.trigger({
      target: this,
      type: "set",
      key: "value",
      newValue: o,
      oldValue: s
    }) : this.dep.trigger());
  }
}
const Wc = /"(?:_|\\u0{2}5[Ff]){2}(?:p|\\u0{2}70)(?:r|\\u0{2}72)(?:o|\\u0{2}6[Ff])(?:t|\\u0{2}74)(?:o|\\u0{2}6[Ff])(?:_|\\u0{2}5[Ff]){2}"\s*:/, Mc = /"(?:c|\\u0063)(?:o|\\u006[Ff])(?:n|\\u006[Ee])(?:s|\\u0073)(?:t|\\u0074)(?:r|\\u0072)(?:u|\\u0075)(?:c|\\u0063)(?:t|\\u0074)(?:o|\\u006[Ff])(?:r|\\u0072)"\s*:/, Fc = /^\s*["[{]|^\s*-?\d{1,16}(\.\d{1,17})?([Ee][+-]?\d+)?\s*$/;
function zc(t, o) {
  if (t === "__proto__" || t === "constructor" && o && typeof o == "object" && "prototype" in o) {
    Uc(t);
    return;
  }
  return o;
}
function Uc(t) {
  console.warn(`[destr] Dropping "${t}" key to prevent prototype pollution.`);
}
function Ia(t, o = {}) {
  if (typeof t != "string")
    return t;
  const s = t.trim();
  if (
    // eslint-disable-next-line unicorn/prefer-at
    t[0] === '"' && t.endsWith('"') && !t.includes("\\")
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
  if (!Fc.test(t)) {
    if (o.strict)
      throw new SyntaxError("[destr] Invalid JSON");
    return t;
  }
  try {
    if (Wc.test(t) || Mc.test(t)) {
      if (o.strict)
        throw new Error("[destr] Possible prototype pollution");
      return JSON.parse(t, zc);
    }
    return JSON.parse(t);
  } catch (d) {
    if (o.strict)
      throw d;
    return t;
  }
}
function Lc() {
  const t = /* @__PURE__ */ new Set(), o = (f) => {
    t.delete(f);
  };
  return {
    on: (f) => (t.add(f), {
      off: () => o(f)
    }),
    off: o,
    trigger: (...f) => Promise.all(Array.from(t).map((m) => m(...f)))
  };
}
async function jc(t) {
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
var Bc = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, Ca = { exports: {} };
(function(t, o) {
  (function(s, d) {
    t.exports = d();
  })(typeof self < "u" ? self : Bc, function() {
    return function(s) {
      var d = {};
      function f(m) {
        if (d[m]) return d[m].exports;
        var E = d[m] = {
          i: m,
          l: !1,
          exports: {}
        };
        return s[m].call(E.exports, E, E.exports, f), E.l = !0, E.exports;
      }
      return f.m = s, f.c = d, f.d = function(m, E, p) {
        f.o(m, E) || Object.defineProperty(m, E, {
          enumerable: !0,
          get: p
        });
      }, f.r = function(m) {
        typeof Symbol < "u" && Symbol.toStringTag && Object.defineProperty(m, Symbol.toStringTag, {
          value: "Module"
        }), Object.defineProperty(m, "__esModule", {
          value: !0
        });
      }, f.t = function(m, E) {
        if (1 & E && (m = f(m)), 8 & E || 4 & E && typeof m == "object" && m && m.__esModule) return m;
        var p = /* @__PURE__ */ Object.create(null);
        if (f.r(p), Object.defineProperty(p, "default", {
          enumerable: !0,
          value: m
        }), 2 & E && typeof m != "string") for (var x in m) f.d(p, x, (function(C) {
          return m[C];
        }).bind(null, x));
        return p;
      }, f.n = function(m) {
        var E = m && m.__esModule ? function() {
          return m.default;
        } : function() {
          return m;
        };
        return f.d(E, "a", E), E;
      }, f.o = function(m, E) {
        return {}.hasOwnProperty.call(m, E);
      }, f.p = "", f(f.s = 0);
    }([function(s, d, f) {
      f.r(d), f.d(d, "PopupOpenError", function() {
        return zn;
      }), f.d(d, "create", function() {
        return as;
      }), f.d(d, "destroy", function() {
        return ss;
      }), f.d(d, "destroyComponents", function() {
        return Oi;
      }), f.d(d, "destroyAll", function() {
        return Ii;
      }), f.d(d, "PROP_TYPE", function() {
        return be;
      }), f.d(d, "PROP_SERIALIZATION", function() {
        return fn;
      }), f.d(d, "CONTEXT", function() {
        return We;
      }), f.d(d, "EVENT", function() {
        return Ce;
      });
      function m(e, r) {
        return (m = Object.setPrototypeOf || function(n, i) {
          return n.__proto__ = i, n;
        })(e, r);
      }
      function E(e, r) {
        e.prototype = Object.create(r.prototype), e.prototype.constructor = e, m(e, r);
      }
      function p() {
        return (p = Object.assign || function(e) {
          for (var r = 1; r < arguments.length; r++) {
            var n = arguments[r];
            for (var i in n) ({}).hasOwnProperty.call(n, i) && (e[i] = n[i]);
          }
          return e;
        }).apply(this, arguments);
      }
      function x(e) {
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
      var C = [], b = [], D = 0, N;
      function ae() {
        if (!D && N) {
          var e = N;
          N = null, e.resolve();
        }
      }
      function se() {
        D += 1;
      }
      function Ge() {
        D -= 1, ae();
      }
      var v = function() {
        function e(n) {
          var i = this;
          if (this.resolved = void 0, this.rejected = void 0, this.errorHandled = void 0, this.value = void 0, this.error = void 0, this.handlers = void 0, this.dispatching = void 0, this.stack = void 0, this.resolved = !1, this.rejected = !1, this.errorHandled = !1, this.handlers = [], n) {
            var a, c, u = !1, h = !1, l = !1;
            se();
            try {
              n(function(g) {
                l ? i.resolve(g) : (u = !0, a = g);
              }, function(g) {
                l ? i.reject(g) : (h = !0, c = g);
              });
            } catch (g) {
              Ge(), this.reject(g);
              return;
            }
            Ge(), l = !0, u ? this.resolve(a) : h && this.reject(c);
          }
        }
        var r = e.prototype;
        return r.resolve = function(n) {
          if (this.resolved || this.rejected) return this;
          if (x(n)) throw new Error("Can not resolve promise with another promise");
          return this.resolved = !0, this.value = n, this.dispatch(), this;
        }, r.reject = function(n) {
          var i = this;
          if (this.resolved || this.rejected) return this;
          if (x(n)) throw new Error("Can not reject promise with another promise");
          if (!n) {
            var a = n && typeof n.toString == "function" ? n.toString() : {}.toString.call(n);
            n = new Error("Expected reject to be called with Error, got " + a);
          }
          return this.rejected = !0, this.error = n, this.errorHandled || setTimeout(function() {
            i.errorHandled || function(c, u) {
              if (C.indexOf(c) === -1) {
                C.push(c), setTimeout(function() {
                  throw c;
                }, 1);
                for (var h = 0; h < b.length; h++) b[h](c, u);
              }
            }(n, i);
          }, 1), this.dispatch(), this;
        }, r.asyncReject = function(n) {
          return this.errorHandled = !0, this.reject(n), this;
        }, r.dispatch = function() {
          var n = this.resolved, i = this.rejected, a = this.handlers;
          if (!this.dispatching && (n || i)) {
            this.dispatching = !0, se();
            for (var c = function(P, S) {
              return P.then(function(R) {
                S.resolve(R);
              }, function(R) {
                S.reject(R);
              });
            }, u = 0; u < a.length; u++) {
              var h = a[u], l = h.onSuccess, g = h.onError, T = h.promise, y = void 0;
              if (n) try {
                y = l ? l(this.value) : this.value;
              } catch (P) {
                T.reject(P);
                continue;
              }
              else if (i) {
                if (!g) {
                  T.reject(this.error);
                  continue;
                }
                try {
                  y = g(this.error);
                } catch (P) {
                  T.reject(P);
                  continue;
                }
              }
              if (y instanceof e && (y.resolved || y.rejected)) {
                var w = y;
                w.resolved ? T.resolve(w.value) : T.reject(w.error), w.errorHandled = !0;
              } else x(y) ? y instanceof e && (y.resolved || y.rejected) ? y.resolved ? T.resolve(y.value) : T.reject(y.error) : c(y, T) : T.resolve(y);
            }
            a.length = 0, this.dispatching = !1, Ge();
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
          return this.then(function(u) {
            return clearTimeout(c), u;
          });
        }, r.toPromise = function() {
          if (typeof Promise > "u") throw new TypeError("Could not find Promise");
          return Promise.resolve(this);
        }, r.lazy = function() {
          return this.errorHandled = !0, this;
        }, e.resolve = function(n) {
          return n instanceof e ? n : x(n) ? new e(function(i, a) {
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
          for (var u = function(g, T, y) {
            return T.then(function(w) {
              c[g] = w, (a -= 1) == 0 && i.resolve(c);
            }, function(w) {
              y.reject(w);
            });
          }, h = 0; h < n.length; h++) {
            var l = n[h];
            if (l instanceof e) {
              if (l.resolved) {
                c[h] = l.value, a -= 1;
                continue;
              }
            } else if (!x(l)) {
              c[h] = l, a -= 1;
              continue;
            }
            u(h, e.resolve(l), i);
          }
          return a === 0 && i.resolve(c), i;
        }, e.hash = function(n) {
          var i = {}, a = [], c = function(h) {
            if (n.hasOwnProperty(h)) {
              var l = n[h];
              x(l) ? a.push(l.then(function(g) {
                i[h] = g;
              })) : i[h] = l;
            }
          };
          for (var u in n) c(u);
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
          se();
          try {
            c = n.apply(i, a || []);
          } catch (u) {
            return Ge(), e.reject(u);
          }
          return Ge(), e.resolve(c);
        }, e.delay = function(n) {
          return new e(function(i) {
            setTimeout(i, n);
          });
        }, e.isPromise = function(n) {
          return !!(n && n instanceof e) || x(n);
        }, e.flush = function() {
          return function(n) {
            var i = N = N || new n();
            return ae(), i;
          }(e);
        }, e;
      }();
      function A(e) {
        return {}.toString.call(e) === "[object RegExp]";
      }
      var q = {
        IFRAME: "iframe",
        POPUP: "popup"
      }, Y = `Call was rejected by callee.\r
`;
      function Ee(e) {
        return e === void 0 && (e = window), e.location.protocol;
      }
      function xe(e) {
        if (e === void 0 && (e = window), e.mockDomain) {
          var r = e.mockDomain.split("//")[0];
          if (r) return r;
        }
        return Ee(e);
      }
      function Fe(e) {
        return e === void 0 && (e = window), xe(e) === "about:";
      }
      function ve(e) {
        if (e === void 0 && (e = window), e) try {
          if (e.parent && e.parent !== e) return e.parent;
        } catch {
        }
      }
      function Ae(e) {
        if (e === void 0 && (e = window), e && !ve(e)) try {
          return e.opener;
        } catch {
        }
      }
      function Z(e) {
        try {
          return !0;
        } catch {
        }
        return !1;
      }
      function Pe(e) {
        e === void 0 && (e = window);
        var r = e.location;
        if (!r) throw new Error("Can not read window location");
        var n = Ee(e);
        if (!n) throw new Error("Can not read window protocol");
        if (n === "file:") return "file://";
        if (n === "about:") {
          var i = ve(e);
          return i && Z() ? Pe(i) : "about://";
        }
        var a = r.host;
        if (!a) throw new Error("Can not read window host");
        return n + "//" + a;
      }
      function ie(e) {
        e === void 0 && (e = window);
        var r = Pe(e);
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
            if (Fe(r) && Z()) return !0;
          } catch {
          }
          try {
            if (function(i) {
              return i === void 0 && (i = window), xe(i) === "mock:";
            }(r) && Z()) return !0;
          } catch {
          }
          try {
            if (Pe(r) === Pe(window)) return !0;
          } catch {
          }
          return !1;
        }(e)) return !1;
        try {
          if (e === window || Fe(e) && Z() || ie(window) === ie(e)) return !0;
        } catch {
        }
        return !1;
      }
      function z(e) {
        if (!U(e)) throw new Error("Expected window to be same domain");
        return e;
      }
      function de(e, r) {
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
      function Te(e) {
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
        for (var u = 0; u < 100; u++) {
          var h = void 0;
          try {
            h = n[u];
          } catch {
            return r;
          }
          if (!h) return r;
          r.push(h);
        }
        return r;
      }
      function ot(e) {
        for (var r = [], n = 0, i = Te(e); n < i.length; n++) {
          var a = i[n];
          r.push(a);
          for (var c = 0, u = ot(a); c < u.length; c++) r.push(u[c]);
        }
        return r;
      }
      function Oe(e) {
        e === void 0 && (e = window);
        try {
          if (e.top) return e.top;
        } catch {
        }
        if (ve(e) === e) return e;
        try {
          if (de(window, e) && window.top) return window.top;
        } catch {
        }
        try {
          if (de(e, window) && window.top) return window.top;
        } catch {
        }
        for (var r = 0, n = ot(e); r < n.length; r++) {
          var i = n[r];
          try {
            if (i.top) return i.top;
          } catch {
          }
          if (ve(i) === i) return i;
        }
      }
      function Je(e) {
        var r = Oe(e);
        if (!r) throw new Error("Can not determine top window");
        var n = [].concat(ot(r), [r]);
        return n.indexOf(e) === -1 && (n = [].concat(n, [e], ot(e))), n;
      }
      var at = [], Dt = [];
      function ze(e, r) {
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
          return !a || a.message !== Y;
        }
        if (r && U(e)) try {
          if (e.mockclosed) return !0;
        } catch {
        }
        try {
          if (!e.parent || !e.top) return !0;
        } catch {
        }
        var n = function(a, c) {
          for (var u = 0; u < a.length; u++) try {
            if (a[u] === c) return u;
          } catch {
          }
          return -1;
        }(at, e);
        if (n !== -1) {
          var i = Dt[n];
          if (i && function(a) {
            if (!a.contentWindow || !a.parentNode) return !0;
            var c = a.ownerDocument;
            if (c && c.documentElement && !c.documentElement.contains(a)) {
              for (var u = a; u.parentNode && u.parentNode !== u; ) u = u.parentNode;
              if (!u.host || !c.documentElement.contains(u.host)) return !0;
            }
            return !1;
          }(i)) return !0;
        }
        return !1;
      }
      function Rn(e) {
        return (e = e || window).navigator.mockUserAgent || e.navigator.userAgent;
      }
      function Ht(e, r) {
        for (var n = Te(e), i = 0; i < n.length; i++) {
          var a = n[i];
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
      function Yr(e, r) {
        return e === Ae(r);
      }
      function $t(e) {
        return e === void 0 && (e = window), Ae(e = e || window) || ve(e) || void 0;
      }
      function Ir(e, r) {
        for (var n = 0; n < e.length; n++)
          for (var i = e[n], a = 0; a < r.length; a++) if (i === r[a]) return !0;
        return !1;
      }
      function Cr(e) {
        e === void 0 && (e = window);
        for (var r = 0, n = e; n; ) (n = ve(n)) && (r += 1);
        return r;
      }
      function or(e, r) {
        var n = Oe(e) || e, i = Oe(r) || r;
        try {
          if (n && i) return n === i;
        } catch {
        }
        var a = Je(e), c = Je(r);
        if (Ir(a, c)) return !0;
        var u = Ae(n), h = Ae(i);
        return u && Ir(Je(u), c) || h && Ir(Je(h), a), !1;
      }
      function wt(e, r) {
        if (typeof e == "string") {
          if (typeof r == "string") return e === "*" || r === e;
          if (A(r) || Array.isArray(r)) return !1;
        }
        return A(e) ? A(r) ? e.toString() === r.toString() : !Array.isArray(r) && !!r.match(e) : !!Array.isArray(e) && (Array.isArray(r) ? JSON.stringify(e) === JSON.stringify(r) : !A(r) && e.some(function(n) {
          return wt(n, r);
        }));
      }
      function Wt(e) {
        return e.match(/^(https?|mock|file):\/\//) ? e.split("/").slice(0, 3).join("/") : ie();
      }
      function So(e, r, n, i) {
        n === void 0 && (n = 1e3), i === void 0 && (i = 1 / 0);
        var a;
        return function c() {
          if (ze(e))
            return a && clearTimeout(a), r();
          i <= 0 ? clearTimeout(a) : (i -= n, a = setTimeout(c, n));
        }(), {
          cancel: function() {
            a && clearTimeout(a);
          }
        };
      }
      function ir(e) {
        try {
          if (e === window) return !0;
        } catch (r) {
          if (r && r.message === Y) return !0;
        }
        try {
          if ({}.toString.call(e) === "[object Window]") return !0;
        } catch (r) {
          if (r && r.message === Y) return !0;
        }
        try {
          if (window.Window && e instanceof window.Window) return !0;
        } catch (r) {
          if (r && r.message === Y) return !0;
        }
        try {
          if (e && e.self === e) return !0;
        } catch (r) {
          if (r && r.message === Y) return !0;
        }
        try {
          if (e && e.parent === e) return !0;
        } catch (r) {
          if (r && r.message === Y) return !0;
        }
        try {
          if (e && e.top === e) return !0;
        } catch (r) {
          if (r && r.message === Y) return !0;
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
        if (r = Wt(e), r.indexOf("mock:") !== 0) return e;
        var r;
        throw new Error("Mock urls not supported out of test mode");
      }
      function Ro(e) {
        if (U(e)) return z(e).frameElement;
        for (var r = 0, n = document.querySelectorAll("iframe"); r < n.length; r++) {
          var i = n[r];
          if (i && i.contentWindow && i.contentWindow === e) return i;
        }
      }
      function xo(e) {
        if (function(n) {
          return n === void 0 && (n = window), !!ve(n);
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
      function Zr(e, r) {
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
            if (ir(c) && ze(c)) {
              if (n) try {
                n.delete(c);
              } catch {
              }
              i.splice(a, 1), this.values.splice(a, 1), a -= 1;
            }
          }
        }, r.isSafeToReadWrite = function(n) {
          return !ir(n);
        }, r.set = function(n, i) {
          if (!n) throw new Error("WeakMap expected key");
          var a = this.weakmap;
          if (a) try {
            a.set(n, i);
          } catch {
            delete this.weakmap;
          }
          if (this.isSafeToReadWrite(n)) try {
            var c = this.name, u = n[c];
            u && u[0] === n ? u[1] = i : Object.defineProperty(n, c, {
              value: [n, i],
              writable: !0
            });
            return;
          } catch {
          }
          this._cleanupClosedWindows();
          var h = this.keys, l = this.values, g = Zr(h, n);
          g === -1 ? (h.push(n), l.push(i)) : l[g] = i;
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
          var c = Zr(this.keys, n);
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
          var c = this.keys, u = Zr(c, n);
          u !== -1 && (c.splice(u, 1), this.values.splice(u, 1));
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
          return this._cleanupClosedWindows(), Zr(this.keys, n) !== -1;
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
      function Io(e, r, n) {
        return (Io = Aa() ? Reflect.construct : function(i, a, c) {
          var u = [null];
          u.push.apply(u, a);
          var h = new (Function.bind.apply(i, u))();
          return c && m(h, c.prototype), h;
        }).apply(null, arguments);
      }
      function Co(e) {
        var r = typeof Map == "function" ? /* @__PURE__ */ new Map() : void 0;
        return (Co = function(n) {
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
          }), m(a, n);
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
      function Cn(e, r) {
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
      function st() {
        var e = "0123456789abcdef";
        return "uid_" + "xxxxxxxxxx".replace(/./g, function() {
          return e.charAt(Math.floor(Math.random() * e.length));
        }) + "_" + Dn((/* @__PURE__ */ new Date()).toISOString().slice(11, 19).replace("T", ".")).replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
      }
      var Qr;
      function _n(e) {
        try {
          return JSON.stringify([].slice.call(e), function(r, n) {
            return typeof n == "function" ? "memoize[" + function(i) {
              if (Qr = Qr || new Xr(), i == null || typeof i != "object" && typeof i != "function") throw new Error("Invalid object");
              var a = Qr.get(i);
              return a || (a = typeof i + ":" + st(), Qr.set(i, a)), a;
            }(n) + "]" : On(n) ? {} : n;
          });
        } catch {
          throw new Error("Arguments not serializable -- can not be used to memoize");
        }
      }
      function Wa() {
        return {};
      }
      var Dr = 0, Do = 0;
      function Vt(e, r) {
        r === void 0 && (r = {});
        var n = r.thisNamespace, i = n !== void 0 && n, a = r.time, c, u, h = Dr;
        Dr += 1;
        var l = function() {
          for (var g = arguments.length, T = new Array(g), y = 0; y < g; y++) T[y] = arguments[y];
          h < Do && (c = null, u = null, h = Dr, Dr += 1);
          var w;
          w = i ? (u = u || new Xr()).getOrSet(this, Wa) : c = c || {};
          var P;
          try {
            P = _n(T);
          } catch {
            return e.apply(this, arguments);
          }
          var S = w[P];
          if (S && a && Date.now() - S.time < a && (delete w[P], S = null), S) return S.value;
          var R = Date.now(), O = e.apply(this, arguments);
          return w[P] = {
            time: R,
            value: O
          }, O;
        };
        return l.reset = function() {
          c = null, u = null;
        }, Cn(l, (r.name || In(e)) + "::memoized");
      }
      Vt.clear = function() {
        Do = Dr;
      };
      function Ma(e) {
        var r = {};
        function n() {
          for (var i = arguments, a = this, c = arguments.length, u = new Array(c), h = 0; h < c; h++) u[h] = arguments[h];
          var l = _n(u);
          return r.hasOwnProperty(l) || (r[l] = v.try(function() {
            return e.apply(a, i);
          }).finally(function() {
            delete r[l];
          })), r[l];
        }
        return n.reset = function() {
          r = {};
        }, Cn(n, In(e) + "::promiseMemoized");
      }
      function Ie() {
      }
      function kr(e) {
        var r = !1;
        return Cn(function() {
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
      function en(e) {
        return typeof e == "string" ? e : e && e.toString && typeof e.toString == "function" ? e.toString() : {}.toString.call(e);
      }
      function wr(e, r) {
        if (!r) return e;
        if (Object.assign) return Object.assign(e, r);
        for (var n in r) r.hasOwnProperty(n) && (e[n] = r[n]);
        return e;
      }
      Vt(function(e) {
        if (Object.values) return Object.values(e);
        var r = [];
        for (var n in e) e.hasOwnProperty(n) && r.push(e[n]);
        return r;
      });
      function Fa(e) {
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
      function tn(e, r, n) {
        if (n === void 0 && (n = ""), Array.isArray(e)) {
          for (var i = e.length, a = [], c = function(T) {
            _o(a, T, function() {
              var y = n ? n + "." + T : "" + T, w = r(e[T], T, y);
              return (Wn(w) || Array.isArray(w)) && (w = tn(w, r, y)), w;
            });
          }, u = 0; u < i; u++) c(u);
          return a;
        }
        if (Wn(e)) {
          var h = {}, l = function(T) {
            if (!e.hasOwnProperty(T)) return 1;
            _o(h, T, function() {
              var y = n ? n + "." + T : "" + T, w = r(e[T], T, y);
              return (Wn(w) || Array.isArray(w)) && (w = tn(w, r, y)), w;
            });
          };
          for (var g in e) l(g);
          return h;
        }
        throw new Error("Pass an object or array");
      }
      function Gt(e) {
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
      function rn(e) {
        var r = [], n = !1, i, a = {
          set: function(c, u) {
            return n || (e[c] = u, a.register(function() {
              delete e[c];
            })), u;
          },
          register: function(c) {
            var u = kr(function() {
              return c(i);
            });
            return n ? c(i) : r.push(u), {
              cancel: function() {
                var h = r.indexOf(u);
                h !== -1 && r.splice(h, 1);
              }
            };
          },
          all: function(c) {
            i = c;
            var u = [];
            for (n = !0; r.length; ) {
              var h = r.shift();
              u.push(h());
            }
            return v.all(u).then(Ie);
          }
        };
        return a;
      }
      function nn(e, r) {
        if (r == null) throw new Error("Expected " + e + " to be present");
        return r;
      }
      var za = function(e) {
        E(r, e);
        function r(n) {
          var i;
          return (i = e.call(this, n) || this).name = i.constructor.name, typeof Error.captureStackTrace == "function" ? Error.captureStackTrace(function(a) {
            if (a === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return a;
          }(i), i.constructor) : i.stack = new Error(n).stack, i;
        }
        return r;
      }(Co(Error));
      function Ao() {
        var e = document.body;
        if (!e) throw new Error("Body element not found");
        return e;
      }
      function on() {
        return !!document.body && document.readyState === "complete";
      }
      function Wo() {
        return !!document.body && document.readyState === "interactive";
      }
      function Mo(e) {
        return encodeURIComponent(e);
      }
      Vt(function() {
        return new v(function(e) {
          if (on() || Wo()) return e();
          var r = setInterval(function() {
            if (on() || Wo())
              return clearInterval(r), e();
          }, 10);
        });
      });
      function Fo(e) {
        return function(r, n, i) {
          i === void 0 && (i = []);
          var a = r.__inline_memoize_cache__ = r.__inline_memoize_cache__ || {}, c = _n(i);
          return a.hasOwnProperty(c) ? a[c] : a[c] = (function() {
            var u = {};
            if (!e || e.indexOf("=") === -1) return u;
            for (var h = 0, l = e.split("&"); h < l.length; h++) {
              var g = l[h];
              (g = g.split("="))[0] && g[1] && (u[decodeURIComponent(g[0])] = decodeURIComponent(g[1]));
            }
            return u;
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
        }(p({}, Fo(e), r)) : e;
      }
      function Ua(e, r) {
        e.appendChild(r);
      }
      function Fn(e, r) {
        return r === void 0 && (r = document), On(e) ? e : typeof e == "string" ? r.querySelector(e) : void 0;
      }
      function Uo(e) {
        return new v(function(r, n) {
          var i = en(e), a = Fn(e);
          if (a) return r(a);
          if (on()) return n(new Error("Document is ready and element " + i + " does not exist"));
          var c = setInterval(function() {
            if (a = Fn(e))
              r(a), clearInterval(c);
            else if (on())
              return clearInterval(c), n(new Error("Document is ready and element " + i + " does not exist"));
          }, 10);
        });
      }
      var zn = function(e) {
        E(r, e);
        function r() {
          return e.apply(this, arguments) || this;
        }
        return r;
      }(za), an;
      function Lo(e) {
        if ((an = an || new Xr()).has(e)) {
          var r = an.get(e);
          if (r) return r;
        }
        var n = new v(function(i, a) {
          e.addEventListener("load", function() {
            (function(c) {
              if (function() {
                for (var u = 0; u < at.length; u++) {
                  var h = !1;
                  try {
                    h = at[u].closed;
                  } catch {
                  }
                  h && (Dt.splice(u, 1), at.splice(u, 1));
                }
              }(), c && c.contentWindow) try {
                at.push(c.contentWindow), Dt.push(c);
              } catch {
              }
            })(e), i(e);
          }), e.addEventListener("error", function(c) {
            e.contentWindow ? i(e) : a(c);
          });
        });
        return an.set(e, n), n;
      }
      function Un(e) {
        return Lo(e).then(function(r) {
          if (!r.contentWindow) throw new Error("Could not find window in iframe");
          return r.contentWindow;
        });
      }
      function jo(e, r) {
        e === void 0 && (e = {});
        var n = e.style || {}, i = function(c, u, h) {
          c === void 0 && (c = "div"), u === void 0 && (u = {}), c = c.toLowerCase();
          var l = document.createElement(c);
          if (u.style && wr(l.style, u.style), u.class && (l.className = u.class.join(" ")), u.id && l.setAttribute("id", u.id), u.attributes) for (var g = 0, T = Object.keys(u.attributes); g < T.length; g++) {
            var y = T[g];
            l.setAttribute(y, u.attributes[y]);
          }
          if (u.styleSheet && function(w, P, S) {
            S === void 0 && (S = window.document), w.styleSheet ? w.styleSheet.cssText = P : w.appendChild(S.createTextNode(P));
          }(l, u.styleSheet), u.html) {
            if (c === "iframe") throw new Error("Iframe html can not be written unless container provided and iframe in DOM");
            l.innerHTML = u.html;
          }
          return l;
        }("iframe", {
          attributes: p({
            allowTransparency: "true"
          }, e.attributes || {}),
          style: p({
            backgroundColor: "transparent",
            border: "none"
          }, n),
          html: e.html,
          class: e.class
        }), a = window.navigator.userAgent.match(/MSIE|Edge/i);
        return i.hasAttribute("id") || i.setAttribute("id", st()), Lo(i), (e.url || a) && i.setAttribute("src", e.url || "about:blank"), i;
      }
      function Bo(e, r, n) {
        return e.addEventListener(r, n), {
          cancel: function() {
            e.removeEventListener(r, n);
          }
        };
      }
      function La(e) {
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
      function Ho(e, r, n) {
        var i = n === void 0 ? {} : n, a = i.width, c = a === void 0 || a, u = i.height, h = u === void 0 || u, l = i.interval, g = l === void 0 ? 100 : l, T = i.win, y = T === void 0 ? window : T, w = e.offsetWidth, P = e.offsetHeight, S = !1;
        r({
          width: w,
          height: P
        });
        var R = function() {
          if (!S && function(M) {
            return !!(M.offsetWidth || M.offsetHeight || M.getClientRects().length);
          }(e)) {
            var L = e.offsetWidth, J = e.offsetHeight;
            (c && L !== w || h && J !== P) && r({
              width: L,
              height: J
            }), w = L, P = J;
          }
        }, O, W;
        return y.addEventListener("resize", R), y.ResizeObserver !== void 0 ? ((O = new y.ResizeObserver(R)).observe(e), W = _r(R, 10 * g)) : y.MutationObserver !== void 0 ? ((O = new y.MutationObserver(R)).observe(e, {
          attributes: !0,
          childList: !0,
          subtree: !0,
          characterData: !1
        }), W = _r(R, 10 * g)) : W = _r(R, g), {
          cancel: function() {
            S = !0, O.disconnect(), window.removeEventListener("resize", R), W.cancel();
          }
        };
      }
      function Ln(e) {
        for (; e.parentNode; ) e = e.parentNode;
        return e.toString() === "[object ShadowRoot]";
      }
      var sn = typeof document < "u" ? document.currentScript : null, ja = Vt(function() {
        if (sn || (sn = function() {
          try {
            var e = function() {
              try {
                throw new Error("_");
              } catch (u) {
                return u.stack || "";
              }
            }(), r = /.*at [^(]*\((.*):(.+):(.+)\)$/gi.exec(e), n = r && r[1];
            if (!n) return;
            for (var i = 0, a = [].slice.call(document.getElementsByTagName("script")).reverse(); i < a.length; i++) {
              var c = a[i];
              if (c.src && c.src === n) return c;
            }
          } catch {
          }
        }())) return sn;
        throw new Error("Can not determine current script");
      }), Ba = st();
      Vt(function() {
        var e;
        try {
          e = ja();
        } catch {
          return Ba;
        }
        var r = e.getAttribute("data-uid");
        if (r && typeof r == "string" || (r = e.getAttribute("data-uid-auto")) && typeof r == "string") return r;
        if (e.src) {
          var n = function(i) {
            for (var a = "", c = 0; c < i.length; c++) {
              var u = i[c].charCodeAt(0) * c;
              i[c + 1] && (u += i[c + 1].charCodeAt(0) * (c - 1)), a += String.fromCharCode(97 + Math.abs(u) % 26);
            }
            return a;
          }(JSON.stringify({
            src: e.src,
            dataset: e.dataset
          }));
          r = "uid_" + n.slice(n.length - 30);
        } else r = st();
        return e.setAttribute("data-uid-auto", r), r;
      });
      function $o(e) {
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
        return typeof e == "number" ? Vo(e) : $o(e) ? e : Vo(e);
      }
      function Jo(e, r) {
        if (typeof e == "number") return e;
        if ($o(e)) return parseInt(r * jn(e) / 100, 10);
        if (typeof (n = e) == "string" && /^[0-9]+px$/.test(n)) return jn(e);
        var n;
        throw new Error("Can not normalize dimension: " + e);
      }
      function _t(e) {
        e === void 0 && (e = window);
        var r = "__post_robot_11_0_0__";
        return e !== window ? e[r] : e[r] = e[r] || {};
      }
      var Ko = function() {
        return {};
      };
      function we(e, r) {
        return e === void 0 && (e = "store"), r === void 0 && (r = Ko), Nr(_t(), e, function() {
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
      var qa = function() {
      };
      function cn() {
        var e = _t();
        return e.WINDOW_WILDCARD = e.WINDOW_WILDCARD || new qa(), e.WINDOW_WILDCARD;
      }
      function it(e, r) {
        return e === void 0 && (e = "store"), r === void 0 && (r = Ko), we("windowStore").getOrSet(e, function() {
          var n = new Xr(), i = function(a) {
            return n.getOrSet(a, r);
          };
          return {
            has: function(a) {
              return i(a).hasOwnProperty(e);
            },
            get: function(a, c) {
              var u = i(a);
              return u.hasOwnProperty(e) ? u[e] : c;
            },
            set: function(a, c) {
              return i(a)[e] = c, c;
            },
            del: function(a) {
              delete i(a)[e];
            },
            getOrSet: function(a, c) {
              return Nr(i(a), e, c);
            }
          };
        });
      }
      function Yo() {
        return we("instance").getOrSet("instanceID", st);
      }
      function Zo(e, r) {
        var n = r.domain, i = it("helloPromises"), a = i.get(e);
        a && a.resolve({
          domain: n
        });
        var c = v.resolve({
          domain: n
        });
        return i.set(e, c), c;
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
        return it("windowInstanceIDPromises").getOrSet(e, function() {
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
          return it("helloPromises").getOrSet(a, function() {
            return new v();
          });
        }(e);
        return r !== -1 && (i = i.timeout(r, new Error(n + " did not load after " + r + "ms"))), i;
      }
      function ko(e) {
        it("knownWindows").set(e, !0);
      }
      function qn(e) {
        return typeof e == "object" && e !== null && typeof e.__type__ == "string";
      }
      function ei(e) {
        return e === void 0 ? "undefined" : e === null ? "null" : Array.isArray(e) ? "array" : typeof e == "function" ? "function" : typeof e == "object" ? e instanceof Error ? "error" : typeof e.then == "function" ? "promise" : {}.toString.call(e) === "[object RegExp]" ? "regex" : {}.toString.call(e) === "[object Date]" ? "date" : "object" : typeof e == "string" ? "string" : typeof e == "number" ? "number" : typeof e == "boolean" ? "boolean" : void 0;
      }
      function ar(e, r) {
        return {
          __type__: e,
          __val__: r
        };
      }
      var mt, Ha = ((mt = {}).function = function() {
      }, mt.error = function(e) {
        return ar("error", {
          message: e.message,
          stack: e.stack,
          code: e.code,
          data: e.data
        });
      }, mt.promise = function() {
      }, mt.regex = function(e) {
        return ar("regex", e.source);
      }, mt.date = function(e) {
        return ar("date", e.toJSON());
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
      }, mt[void 0] = function(e) {
        return ar("undefined", e);
      }, mt), $a = {}, gt, Va = ((gt = {}).function = function() {
        throw new Error("Function serialization is not implemented; nothing to deserialize");
      }, gt.error = function(e) {
        var r = e.stack, n = e.code, i = e.data, a = new Error(e.message);
        return a.code = n, i && (a.data = i), a.stack = r + `

` + a.stack, a;
      }, gt.promise = function() {
        throw new Error("Promise serialization is not implemented; nothing to deserialize");
      }, gt.regex = function(e) {
        return new RegExp(e);
      }, gt.date = function(e) {
        return new Date(e);
      }, gt.array = function(e) {
        return e;
      }, gt.object = function(e) {
        return e;
      }, gt.string = function(e) {
        return e;
      }, gt.number = function(e) {
        return e;
      }, gt.boolean = function(e) {
        return e;
      }, gt.null = function(e) {
        return e;
      }, gt[void 0] = function() {
      }, gt), Ga = {};
      function Hn() {
        return !!Rn(window).match(/MSIE|trident|edge\/12|edge\/13/i);
      }
      function ti(e) {
        return !or(window, e);
      }
      function ri(e, r) {
        if (e) {
          if (ie() !== Wt(e)) return !0;
        } else if (r && !U(r)) return !0;
        return !1;
      }
      function ni(e) {
        var r = e.win, n = e.domain;
        return !(!Hn() || n && !ri(n, r) || r && !ti(r));
      }
      function $n(e) {
        return "__postrobot_bridge___" + (e = e || Wt(e)).replace(/[^a-zA-Z0-9]+/g, "_");
      }
      function oi() {
        return !!(window.name && window.name === $n(ie()));
      }
      var Ja = new v(function(e) {
        if (window.document && window.document.body) return e(window.document.body);
        var r = setInterval(function() {
          if (window.document && window.document.body)
            return clearInterval(r), e(window.document.body);
        }, 10);
      });
      function ii(e) {
        it("remoteWindowPromises").getOrSet(e, function() {
          return new v();
        });
      }
      function Vn(e) {
        var r = it("remoteWindowPromises").get(e);
        if (!r) throw new Error("Remote window promise not found");
        return r;
      }
      function ai(e, r, n) {
        Vn(e).resolve(function(i, a, c) {
          if (i !== e) throw new Error("Remote window does not match window");
          if (!wt(a, r)) throw new Error("Remote domain " + a + " does not match domain " + r);
          n.fireAndForget(c);
        });
      }
      function Gn(e, r) {
        Vn(e).reject(r).catch(Ie);
      }
      function un(e) {
        for (var r = e.win, n = e.name, i = e.domain, a = we("popupWindowsByName"), c = it("popupWindowsByWin"), u = 0, h = a.keys(); u < h.length; u++) {
          var l = h[u], g = a.get(l);
          g && !ze(g.win) || a.del(l);
        }
        if (ze(r)) return {
          win: r,
          name: n,
          domain: i
        };
        var T = c.getOrSet(r, function() {
          return n ? a.getOrSet(n, function() {
            return {
              win: r,
              name: n
            };
          }) : {
            win: r
          };
        });
        if (T.win && T.win !== r) throw new Error("Different window already linked for window: " + (n || "undefined"));
        return n && (T.name = n, a.set(n, T)), i && (T.domain = i, ii(r)), c.set(r, T), T;
      }
      function si(e) {
        var r = e.on, n = e.send, i = e.receiveMessage;
        a = window.open, window.open = function(c, u, h, l) {
          var g = a.call(this, xn(c), u, h, l);
          return g && (un({
            win: g,
            name: u,
            domain: c ? Wt(c) : null
          }), g);
        };
        var a;
        (function(c) {
          var u = c.on, h = c.send, l = c.receiveMessage, g = we("popupWindowsByName");
          u("postrobot_open_tunnel", function(T) {
            var y = T.source, w = T.origin, P = T.data, S = we("bridges").get(w);
            if (!S) throw new Error("Can not find bridge promise for domain " + w);
            return S.then(function(R) {
              if (y !== R) throw new Error("Message source does not matched registered bridge for domain " + w);
              if (!P.name) throw new Error("Register window expected to be passed window name");
              if (!P.sendMessage) throw new Error("Register window expected to be passed sendMessage method");
              if (!g.has(P.name)) throw new Error("Window with name " + P.name + " does not exist, or was not opened by this window");
              var O = function() {
                return g.get(P.name);
              };
              if (!O().domain) throw new Error("We do not have a registered domain for window " + P.name);
              if (O().domain !== w) throw new Error("Message origin " + w + " does not matched registered window origin " + (O().domain || "unknown"));
              return ai(O().win, w, P.sendMessage), {
                sendMessage: function(W) {
                  if (window && !window.closed && O()) {
                    var L = O().domain;
                    if (L) try {
                      l({
                        data: W,
                        origin: L,
                        source: O().win
                      }, {
                        on: u,
                        send: h
                      });
                    } catch (J) {
                      v.reject(J);
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
          var u = c.send;
          _t(window).openTunnelToParent = function(h) {
            var l = h.name, g = h.source, T = h.canary, y = h.sendMessage, w = we("tunnelWindows"), P = ve(window);
            if (!P) throw new Error("No parent window found to open tunnel to");
            var S = function(R) {
              var O = R.name, W = R.source, L = R.canary, J = R.sendMessage;
              (function() {
                for (var V = we("tunnelWindows"), j = 0, te = V.keys(); j < te.length; j++) {
                  var $ = te[j];
                  ze(V[$].source) && V.del($);
                }
              })();
              var M = st();
              return we("tunnelWindows").set(M, {
                name: O,
                source: W,
                canary: L,
                sendMessage: J
              }), M;
            }({
              name: l,
              source: g,
              canary: T,
              sendMessage: y
            });
            return u(P, "postrobot_open_tunnel", {
              name: l,
              sendMessage: function() {
                var R = w.get(S);
                if (R && R.source && !ze(R.source)) {
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
          var u = c.on, h = c.send, l = c.receiveMessage;
          v.try(function() {
            var g = Ae(window);
            if (g && ni({
              win: g
            })) {
              return ii(g), (T = g, it("remoteBridgeAwaiters").getOrSet(T, function() {
                return v.try(function() {
                  var y = Ht(T, $n(ie()));
                  if (y) return U(y) && _t(z(y)) ? y : new v(function(w) {
                    var P, S;
                    P = setInterval(function() {
                      if (y && U(y) && _t(z(y)))
                        return clearInterval(P), clearTimeout(S), w(y);
                    }, 100), S = setTimeout(function() {
                      return clearInterval(P), w();
                    }, 2e3);
                  });
                });
              })).then(function(y) {
                return y ? window.name ? _t(z(y)).openTunnelToParent({
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
                        on: u,
                        send: h
                      });
                    } catch (P) {
                      v.reject(P);
                    }
                  }
                }).then(function(w) {
                  var P = w.source, S = w.origin, R = w.data;
                  if (P !== g) throw new Error("Source does not match opener");
                  ai(P, S, R.sendMessage);
                }).catch(function(w) {
                  throw Gn(g, w), w;
                }) : Gn(g, new Error("Can not register with opener: window does not have a name")) : Gn(g, new Error("Can not register with opener: no bridge found in opener"));
              });
              var T;
            }
          });
        }({
          on: r,
          send: n,
          receiveMessage: i
        });
      }
      function Jn() {
        for (var e = we("idToProxyWindow"), r = 0, n = e.keys(); r < n.length; r++) {
          var i = n[r];
          e.get(i).shouldClean() && e.del(i);
        }
      }
      function ci(e, r) {
        var n = r.send, i = r.id, a = i === void 0 ? st() : i, c = e.then(function(l) {
          if (U(l)) return z(l).name;
        }), u = e.then(function(l) {
          if (ze(l)) throw new Error("Window is closed, can not determine type");
          return Ae(l) ? q.POPUP : q.IFRAME;
        });
        c.catch(Ie), u.catch(Ie);
        var h = function() {
          return e.then(function(l) {
            if (!ze(l)) return U(l) ? z(l).name : c;
          });
        };
        return {
          id: a,
          getType: function() {
            return u;
          },
          getInstanceID: Ma(function() {
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
              return ze(l);
            });
          },
          setLocation: function(l, g) {
            return g === void 0 && (g = {}), e.then(function(T) {
              var y = window.location.protocol + "//" + window.location.host, w = g.method, P = w === void 0 ? "get" : w, S = g.body;
              if (l.indexOf("/") === 0) l = "" + y + l;
              else if (!l.match(/^https?:\/\//) && l.indexOf(y) !== 0) throw new Error("Expected url to be http or https url, or absolute path, got " + JSON.stringify(l));
              if (P === "post") return h().then(function(R) {
                if (!R) throw new Error("Can not post to window without target name");
                (function(O) {
                  var W = O.url, L = O.target, J = O.body, M = O.method, V = M === void 0 ? "post" : M, j = document.createElement("form");
                  if (j.setAttribute("target", L), j.setAttribute("method", V), j.setAttribute("action", W), j.style.display = "none", J) for (var te = 0, $ = Object.keys(J); te < $.length; te++) {
                    var he, ce = $[te], X = document.createElement("input");
                    X.setAttribute("name", ce), X.setAttribute("value", (he = J[ce]) == null ? void 0 : he.toString()), j.appendChild(X);
                  }
                  Ao().appendChild(j), j.submit(), Ao().removeChild(j);
                })({
                  url: l,
                  target: R,
                  method: P,
                  body: S
                });
              });
              if (P !== "get") throw new Error("Unsupported method: " + P);
              if (U(T)) try {
                if (T.location && typeof T.location.replace == "function") {
                  T.location.replace(l);
                  return;
                }
              } catch {
              }
              T.location = l;
            });
          },
          setName: function(l) {
            return e.then(function(g) {
              un({
                win: g,
                name: l
              });
              var T = U(g), y = Ro(g);
              if (!T) throw new Error("Can not set name for cross-domain window: " + l);
              z(g).name = l, y && y.setAttribute("name", l), c = v.resolve(l);
            });
          }
        };
      }
      var yt = function() {
        function e(n) {
          var i = n.send, a = n.win, c = n.serializedWindow;
          this.id = void 0, this.isProxyWindow = !0, this.serializedWindow = void 0, this.actualWindow = void 0, this.actualWindowPromise = void 0, this.send = void 0, this.name = void 0, this.actualWindowPromise = new v(), this.serializedWindow = c || ci(this.actualWindowPromise, {
            send: i
          }), we("idToProxyWindow").set(this.getID(), this), a && this.setWindow(a, {
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
            return n === q.POPUP;
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
          var n = this, i = this.isPopup(), a = this.getName(), c = v.hash({
            isPopup: i,
            name: a
          }).then(function(h) {
            var l = h.name;
            h.isPopup && l && window.open("", l, "noopener");
          }), u = this.serializedWindow.focus();
          return v.all([c, u]).then(function() {
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
          }), it("winToProxyWindow").set(n, this);
        }, r.awaitWindow = function() {
          return this.actualWindowPromise;
        }, r.matchWindow = function(n, i) {
          var a = this, c = i.send;
          return v.try(function() {
            return a.actualWindow ? n === a.actualWindow : v.hash({
              proxyInstanceID: a.getInstanceID(),
              knownWindowInstanceID: Xo(n, {
                send: c
              })
            }).then(function(u) {
              var h = u.proxyInstanceID === u.knownWindowInstanceID;
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
          return !!(this.actualWindow && ze(this.actualWindow));
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
          return Jn(), we("idToProxyWindow").get(n.id) || new e({
            serializedWindow: n,
            send: a
          });
        }, e.isProxyWindow = function(n) {
          return !!(n && !ir(n) && n.isProxyWindow);
        }, e.toProxyWindow = function(n, i) {
          var a = i.send;
          if (Jn(), e.isProxyWindow(n)) return n;
          var c = n;
          return it("winToProxyWindow").get(c) || new e({
            win: c,
            send: a
          });
        }, e;
      }();
      function Kn(e, r, n, i, a) {
        var c = it("methodStore"), u = we("proxyWindowMethods");
        yt.isProxyWindow(i) ? u.set(e, {
          val: r,
          name: n,
          domain: a,
          source: i
        }) : (u.del(e), c.getOrSet(i, function() {
          return {};
        })[e] = {
          domain: a,
          name: n,
          val: r,
          source: i
        });
      }
      function ui(e, r) {
        var n = it("methodStore"), i = we("proxyWindowMethods");
        return n.getOrSet(e, function() {
          return {};
        })[r] || i.get(r);
      }
      function di(e, r, n, i, a) {
        u = (c = {
          on: a.on,
          send: a.send
        }).on, h = c.send, we("builtinListeners").getOrSet("functionCalls", function() {
          return u("postrobot_method", {
            domain: "*"
          }, function(T) {
            var y = T.source, w = T.origin, P = T.data, S = P.id, R = P.name, O = ui(y, S);
            if (!O) throw new Error("Could not find method '" + R + "' with id: " + P.id + " in " + ie(window));
            var W = O.source, L = O.domain, J = O.val;
            return v.try(function() {
              if (!wt(L, w)) throw new Error("Method '" + P.name + "' domain " + JSON.stringify(Mn(O.domain) ? O.domain.source : O.domain) + " does not match origin " + w + " in " + ie(window));
              if (yt.isProxyWindow(W)) return W.matchWindow(y, {
                send: h
              }).then(function(M) {
                if (!M) throw new Error("Method call '" + P.name + "' failed - proxy window does not match source in " + ie(window));
              });
            }).then(function() {
              return J.apply({
                source: y,
                origin: w
              }, P.args);
            }, function(M) {
              return v.try(function() {
                if (J.onError) return J.onError(M);
              }).then(function() {
                throw M.stack && (M.stack = "Remote call to " + R + "(" + function(V) {
                  return V === void 0 && (V = []), An(V).map(function(j) {
                    return typeof j == "string" ? "'" + j + "'" : j === void 0 ? "undefined" : j === null ? "null" : typeof j == "boolean" ? j.toString() : Array.isArray(j) ? "[ ... ]" : typeof j == "object" ? "{ ... }" : typeof j == "function" ? "() => { ... }" : "<" + typeof j + ">";
                  }).join(", ");
                }(P.args) + `) failed

` + M.stack), M;
              });
            }).then(function(M) {
              return {
                result: M,
                id: S,
                name: R
              };
            });
          });
        });
        var c, u, h, l = n.__id__ || st();
        e = yt.unwrap(e);
        var g = n.__name__ || n.name || i;
        return typeof g == "string" && typeof g.indexOf == "function" && g.indexOf("anonymous::") === 0 && (g = g.replace("anonymous::", i + "::")), yt.isProxyWindow(e) ? (Kn(l, n, g, e, r), e.awaitWindow().then(function(T) {
          Kn(l, n, g, T, r);
        })) : Kn(l, n, g, e, r), ar("cross_domain_function", {
          id: l,
          name: g
        });
      }
      function fi(e, r, n, i) {
        var a, c = i.on, u = i.send;
        return function(h, l) {
          l === void 0 && (l = $a);
          var g = JSON.stringify(h, function(T) {
            var y = this[T];
            if (qn(this)) return y;
            var w = ei(y);
            if (!w) return y;
            var P = l[w] || Ha[w];
            return P ? P(y, T) : y;
          });
          return g === void 0 ? "undefined" : g;
        }(n, ((a = {}).promise = function(h, l) {
          return function(g, T, y, w, P) {
            return ar("cross_domain_zalgo_promise", {
              then: di(g, T, function(S, R) {
                return y.then(S, R);
              }, w, {
                on: P.on,
                send: P.send
              })
            });
          }(e, r, h, l, {
            on: c,
            send: u
          });
        }, a.function = function(h, l) {
          return di(e, r, h, l, {
            on: c,
            send: u
          });
        }, a.object = function(h) {
          return ir(h) || yt.isProxyWindow(h) ? ar("cross_domain_window", yt.serialize(h, {
            send: u
          })) : h;
        }, a));
      }
      function li(e, r, n, i) {
        var a, c = i.send;
        return function(u, h) {
          if (h === void 0 && (h = Ga), u !== "undefined") return JSON.parse(u, function(l, g) {
            if (qn(this)) return g;
            var T, y;
            if (qn(g) ? (T = g.__type__, y = g.__val__) : (T = ei(g), y = g), !T) return y;
            var w = h[T] || Va[T];
            return w ? w(y, l) : y;
          });
        }(n, ((a = {}).cross_domain_zalgo_promise = function(u) {
          return function(h, l, g) {
            return new v(g.then);
          }(0, 0, u);
        }, a.cross_domain_function = function(u) {
          return function(h, l, g, T) {
            var y = g.id, w = g.name, P = T.send, S = function(O) {
              O === void 0 && (O = {});
              function W() {
                var L = arguments;
                return yt.toProxyWindow(h, {
                  send: P
                }).awaitWindow().then(function(J) {
                  var M = ui(J, y);
                  if (M && M.val !== W) return M.val.apply({
                    source: window,
                    origin: ie()
                  }, L);
                  var V = [].slice.call(L);
                  return O.fireAndForget ? P(J, "postrobot_method", {
                    id: y,
                    name: w,
                    args: V
                  }, {
                    domain: l,
                    fireAndForget: !0
                  }) : P(J, "postrobot_method", {
                    id: y,
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
              return W.__name__ = w, W.__origin__ = l, W.__source__ = h, W.__id__ = y, W.origin = l, W;
            }, R = S();
            return R.fireAndForget = S({
              fireAndForget: !0
            }), R;
          }(e, r, u, {
            send: c
          });
        }, a.cross_domain_window = function(u) {
          return yt.deserialize(u, {
            send: c
          });
        }, a));
      }
      var Wr = {};
      Wr.postrobot_post_message = function(e, r, n) {
        n.indexOf("file:") === 0 && (n = "*"), e.postMessage(r, n);
      }, Wr.postrobot_bridge = function(e, r, n) {
        if (!Hn() && !oi()) throw new Error("Bridge not needed for browser");
        if (U(e)) throw new Error("Post message through bridge disabled between same domain windows");
        if (or(window, e) !== !1) throw new Error("Can only use bridge to communicate between two different windows, not between frames");
        (function(i, a, c) {
          var u = Yr(window, i), h = Yr(i, window);
          if (!u && !h) throw new Error("Can only send messages to and from parent and popup windows");
          Vn(i).then(function(l) {
            return l(i, a, c);
          });
        })(e, n, r);
      }, Wr.postrobot_global = function(e, r) {
        if (!Rn(window).match(/MSIE|rv:11|trident|edge\/12|edge\/13/i)) throw new Error("Global messaging not needed for browser");
        if (!U(e)) throw new Error("Post message through global disabled between different domain windows");
        if (or(window, e) !== !1) throw new Error("Can only use global to communicate between two different windows, not between frames");
        var n = _t(e);
        if (!n) throw new Error("Can not find postRobot global on foreign window");
        n.receiveMessage({
          source: window,
          origin: ie(),
          data: r
        });
      };
      function Yn(e, r, n, i) {
        var a = i.on, c = i.send;
        return v.try(function() {
          var u = it().getOrSet(e, function() {
            return {};
          });
          return u.buffer = u.buffer || [], u.buffer.push(n), u.flush = u.flush || v.flush().then(function() {
            if (ze(e)) throw new Error("Window is closed");
            var h = fi(e, r, ((l = {}).__post_robot_11_0_0__ = u.buffer || [], l), {
              on: a,
              send: c
            }), l;
            delete u.buffer;
            for (var g = Object.keys(Wr), T = [], y = 0; y < g.length; y++) {
              var w = g[y];
              try {
                Wr[w](e, h, r);
              } catch (P) {
                T.push(P);
              }
            }
            if (T.length === g.length) throw new Error(`All post-robot messaging strategies failed:

` + T.map(function(P, S) {
              return S + ". " + vr(P);
            }).join(`

`));
          }), u.flush.then(function() {
            delete u.flush;
          });
        }).then(Ie);
      }
      function hi(e) {
        return we("responseListeners").get(e);
      }
      function pi(e) {
        we("responseListeners").del(e);
      }
      function vi(e) {
        return we("erroredResponseListeners").has(e);
      }
      function wi(e) {
        var r = e.name, n = e.win, i = e.domain, a = it("requestListeners");
        if (n === "*" && (n = null), i === "*" && (i = null), !r) throw new Error("Name required to get request listener");
        for (var c = 0, u = [n, cn()]; c < u.length; c++) {
          var h = u[c];
          if (h) {
            var l = a.get(h);
            if (l) {
              var g = l[r];
              if (g) {
                if (i && typeof i == "string") {
                  if (g[i]) return g[i];
                  if (g.__domain_regex__) for (var T = 0, y = g.__domain_regex__; T < y.length; T++) {
                    var w = y[T], P = w.listener;
                    if (wt(w.regex, i)) return P;
                  }
                }
                if (g["*"]) return g["*"];
              }
            }
          }
        }
      }
      function Zn(e, r) {
        var n = r.on, i = r.send, a = we("receivedMessages");
        try {
          if (!window || window.closed || !e.source) return;
        } catch {
          return;
        }
        var c = e.source, u = e.origin, h = function(y, w, P, S) {
          var R = S.on, O = S.send, W;
          try {
            W = li(w, P, y, {
              on: R,
              send: O
            });
          } catch {
            return;
          }
          if (W && typeof W == "object" && W !== null) {
            var L = W.__post_robot_11_0_0__;
            if (Array.isArray(L)) return L;
          }
        }(e.data, c, u, {
          on: n,
          send: i
        });
        if (h) {
          ko(c);
          for (var l, g = function() {
            var y = h[T];
            if (a.has(y.id)) return {
              v: void 0
            };
            if (a.set(y.id, !0), ze(c) && !y.fireAndForget) return {
              v: void 0
            };
            y.origin.indexOf("file:") === 0 && (u = "file://");
            try {
              y.type === "postrobot_message_request" ? function(w, P, S, R) {
                var O = R.on, W = R.send, L = wi({
                  name: S.name,
                  win: w,
                  domain: P
                }), J = S.name === "postrobot_method" && S.data && typeof S.data.name == "string" ? S.data.name + "()" : S.name;
                function M(V, j, te) {
                  return v.flush().then(function() {
                    if (!S.fireAndForget && !ze(w)) try {
                      return Yn(w, P, {
                        id: st(),
                        origin: ie(window),
                        type: "postrobot_message_response",
                        hash: S.hash,
                        name: S.name,
                        ack: V,
                        data: j,
                        error: te
                      }, {
                        on: O,
                        send: W
                      });
                    } catch ($) {
                      throw new Error("Send response message failed for " + J + " in " + ie() + `

` + vr($));
                    }
                  });
                }
                v.all([v.flush().then(function() {
                  if (!S.fireAndForget && !ze(w)) try {
                    return Yn(w, P, {
                      id: st(),
                      origin: ie(window),
                      type: "postrobot_message_ack",
                      hash: S.hash,
                      name: S.name
                    }, {
                      on: O,
                      send: W
                    });
                  } catch (V) {
                    throw new Error("Send ack message failed for " + J + " in " + ie() + `

` + vr(V));
                  }
                }), v.try(function() {
                  if (!L) throw new Error("No handler found for post message: " + S.name + " from " + P + " in " + window.location.protocol + "//" + window.location.host + window.location.pathname);
                  return L.handler({
                    source: w,
                    origin: P,
                    data: S.data
                  });
                }).then(function(V) {
                  return M("success", V);
                }, function(V) {
                  return M("error", null, V);
                })]).then(Ie).catch(function(V) {
                  if (L && L.handleError) return L.handleError(V);
                  throw V;
                });
              }(c, u, y, {
                on: n,
                send: i
              }) : y.type === "postrobot_message_response" ? function(w, P, S) {
                if (!vi(S.hash)) {
                  var R = hi(S.hash);
                  if (!R) throw new Error("No handler found for post message response for message: " + S.name + " from " + P + " in " + window.location.protocol + "//" + window.location.host + window.location.pathname);
                  if (!wt(R.domain, P)) throw new Error("Response origin " + P + " does not match domain " + (O = R.domain, Array.isArray(O) ? "(" + O.join(" | ") + ")" : A(O) ? "RegExp(" + O.toString() + ")" : O.toString()));
                  var O;
                  if (w !== R.win) throw new Error("Response source does not match registered window");
                  pi(S.hash), S.ack === "error" ? R.promise.reject(S.error) : S.ack === "success" && R.promise.resolve({
                    source: w,
                    origin: P,
                    data: S.data
                  });
                }
              }(c, u, y) : y.type === "postrobot_message_ack" && function(w, P, S) {
                if (!vi(S.hash)) {
                  var R = hi(S.hash);
                  if (!R) throw new Error("No handler found for post message ack for message: " + S.name + " from " + P + " in " + window.location.protocol + "//" + window.location.host + window.location.pathname);
                  try {
                    if (!wt(R.domain, P)) throw new Error("Ack origin " + P + " does not match domain " + R.domain.toString());
                    if (w !== R.win) throw new Error("Ack source does not match registered window");
                  } catch (O) {
                    R.promise.reject(O);
                  }
                  R.ack = !0;
                }
              }(c, u, y);
            } catch (w) {
              setTimeout(function() {
                throw w;
              }, 0);
            }
          }, T = 0; T < h.length; T++) if (l = g()) return l.v;
        }
      }
      function Mt(e, r, n) {
        if (!e) throw new Error("Expected name");
        if (typeof (r = r || {}) == "function" && (n = r, r = {}), !n) throw new Error("Expected handler");
        var i = function a(c, u) {
          var h = c.name, l = c.win, g = c.domain, T = it("requestListeners");
          if (!h || typeof h != "string") throw new Error("Name required to add request listener");
          if (l && l !== "*" && yt.isProxyWindow(l)) {
            var y = l.awaitWindow().then(function(he) {
              return a({
                name: h,
                win: he,
                domain: g
              }, u);
            });
            return {
              cancel: function() {
                y.then(function(he) {
                  return he.cancel();
                }, Ie);
              }
            };
          }
          var w = l;
          if (Array.isArray(w)) {
            for (var P = [], S = 0, R = w; S < R.length; S++) P.push(a({
              name: h,
              domain: g,
              win: R[S]
            }, u));
            return {
              cancel: function() {
                for (var he = 0; he < P.length; he++) P[he].cancel();
              }
            };
          }
          if (Array.isArray(g)) {
            for (var O = [], W = 0, L = g; W < L.length; W++) O.push(a({
              name: h,
              win: w,
              domain: L[W]
            }, u));
            return {
              cancel: function() {
                for (var he = 0; he < O.length; he++) O[he].cancel();
              }
            };
          }
          var J = wi({
            name: h,
            win: w,
            domain: g
          });
          w && w !== "*" || (w = cn());
          var M = (g = g || "*").toString();
          if (J) throw w && g ? new Error("Request listener already exists for " + h + " on domain " + g.toString() + " for " + (w === cn() ? "wildcard" : "specified") + " window") : w ? new Error("Request listener already exists for " + h + " for " + (w === cn() ? "wildcard" : "specified") + " window") : g ? new Error("Request listener already exists for " + h + " on domain " + g.toString()) : new Error("Request listener already exists for " + h);
          var V = T.getOrSet(w, function() {
            return {};
          }), j = Nr(V, h, function() {
            return {};
          }), te, $;
          return Mn(g) ? (te = Nr(j, "__domain_regex__", function() {
            return [];
          })).push($ = {
            regex: g,
            listener: u
          }) : j[M] = u, {
            cancel: function() {
              delete j[M], $ && (te.splice(te.indexOf($, 1)), te.length || delete j.__domain_regex__), Object.keys(j).length || delete V[h], w && !Object.keys(V).length && T.del(w);
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
        var c = (a = a || {}).domain || "*", u = a.timeout || -1, h = a.timeout || 5e3, l = a.fireAndForget || !1;
        return yt.toProxyWindow(r, {
          send: e
        }).awaitWindow().then(function(g) {
          return v.try(function() {
            if (function(T, y, w) {
              if (!T) throw new Error("Expected name");
              if (w && typeof w != "string" && !Array.isArray(w) && !Mn(w)) throw new TypeError("Can not send " + T + ". Expected domain " + JSON.stringify(w) + " to be a string, array, or regex");
              if (ze(y)) throw new Error("Can not send " + T + ". Target window is closed");
            }(n, g, c), function(T, y) {
              var w = $t(y);
              if (w) return w === T;
              if (y === T || Oe(y) === y) return !1;
              for (var P = 0, S = Te(T); P < S.length; P++) if (S[P] === y) return !0;
              return !1;
            }(window, g)) return Qo(g, h);
          }).then(function(T) {
            return function(y, w, P, S) {
              var R = S.send;
              return v.try(function() {
                return typeof w == "string" ? w : v.try(function() {
                  return P || Bn(y, {
                    send: R
                  }).then(function(O) {
                    return O.domain;
                  });
                }).then(function(O) {
                  if (!wt(w, w)) throw new Error("Domain " + en(w) + " does not match " + en(w));
                  return O;
                });
              });
            }(g, c, (T === void 0 ? {} : T).domain, {
              send: e
            });
          }).then(function(T) {
            var y = T, w = n === "postrobot_method" && i && typeof i.name == "string" ? i.name + "()" : n, P = new v(), S = n + "_" + st();
            if (!l) {
              var R = {
                name: n,
                win: g,
                domain: y,
                promise: P
              };
              (function(j, te) {
                we("responseListeners").set(j, te);
              })(S, R);
              var O = it("requestPromises").getOrSet(g, function() {
                return [];
              });
              O.push(P), P.catch(function() {
                (function(j) {
                  we("erroredResponseListeners").set(j, !0);
                })(S), pi(S);
              });
              var W = function(j) {
                return it("knownWindows").get(j, !1);
              }(g) ? 1e4 : 2e3, L = u, J = W, M = L, V = _r(function() {
                return ze(g) ? P.reject(new Error("Window closed for " + n + " before " + (R.ack ? "response" : "ack"))) : R.cancelled ? P.reject(new Error("Response listener was cancelled for " + n)) : (J = Math.max(J - 500, 0), M !== -1 && (M = Math.max(M - 500, 0)), R.ack || J !== 0 ? M === 0 ? P.reject(new Error("No response for postMessage " + w + " in " + ie() + " in " + L + "ms")) : void 0 : P.reject(new Error("No ack for postMessage " + w + " in " + ie() + " in " + W + "ms")));
              }, 500);
              P.finally(function() {
                V.cancel(), O.splice(O.indexOf(P, 1));
              }).catch(Ie);
            }
            return Yn(g, y, {
              id: st(),
              origin: ie(window),
              type: "postrobot_message_request",
              hash: S,
              name: n,
              data: i,
              fireAndForget: l
            }, {
              on: Mt,
              send: e
            }).then(function() {
              return l ? P.resolve() : P;
            }, function(j) {
              throw new Error("Send request message failed for " + w + " in " + ie() + `

` + vr(j));
            });
          });
        });
      };
      function Mr(e) {
        return yt.toProxyWindow(e, {
          send: Rt
        });
      }
      function mi(e) {
        for (var r = 0, n = it("requestPromises").get(e, []); r < n.length; r++) n[r].reject(new Error("Window " + (ze(e) ? "closed" : "cleaned up") + " before response")).catch(Ie);
      }
      var Jt;
      Jt = {
        setupBridge: si,
        openBridge: function(e, r) {
          var n = we("bridges"), i = we("bridgeFrames");
          return r = r || Wt(e), n.getOrSet(r, function() {
            return v.try(function() {
              if (ie() === r) throw new Error("Can not open bridge on the same domain as current domain: " + r);
              var a = $n(r);
              if (Ht(window, a)) throw new Error("Frame with name " + a + " already exists on page");
              var c = function(u, h) {
                var l = document.createElement("iframe");
                return l.setAttribute("name", u), l.setAttribute("id", u), l.setAttribute("style", "display: none; margin: 0; padding: 0; border: 0px none; overflow: hidden;"), l.setAttribute("frameborder", "0"), l.setAttribute("border", "0"), l.setAttribute("scrolling", "no"), l.setAttribute("allowTransparency", "true"), l.setAttribute("tabindex", "-1"), l.setAttribute("hidden", "true"), l.setAttribute("title", ""), l.setAttribute("role", "presentation"), l.src = h, l;
              }(a, e);
              return i.set(r, c), Ja.then(function(u) {
                u.appendChild(c);
                var h = c.contentWindow;
                return new v(function(l, g) {
                  c.addEventListener("load", l), c.addEventListener("error", g);
                }).then(function() {
                  return Qo(h, 5e3, "Bridge " + e);
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
            domain: Wt(r)
          });
        },
        isBridge: oi,
        needsBridge: ni,
        needsBridgeForBrowser: Hn,
        hasBridge: function(e, r) {
          return we("bridges").has(r || Wt(e));
        },
        needsBridgeForWin: ti,
        needsBridgeForDomain: ri,
        destroyBridges: function() {
          for (var e = we("bridges"), r = we("bridgeFrames"), n = 0, i = r.keys(); n < i.length; n++) {
            var a = r.get(i[n]);
            a && a.parentNode && a.parentNode.removeChild(a);
          }
          r.reset(), e.reset();
        }
      };
      function Fr(e) {
        if (!U(e)) throw new Error("Can not get global for window on different domain");
        return e.__zoid_10_3_3__ || (e.__zoid_10_3_3__ = {}), e.__zoid_10_3_3__;
      }
      function gi(e, r) {
        try {
          return r(Fr(e));
        } catch {
        }
      }
      function dn(e) {
        return {
          get: function() {
            var r = this;
            return v.try(function() {
              if (r.source && r.source !== window) throw new Error("Can not call get on proxy object from a remote window");
              return e;
            });
          }
        };
      }
      function Ka(e) {
        return Dn(JSON.stringify(e));
      }
      function Xn(e) {
        var r = Fr(e);
        return r.references = r.references || {}, r.references;
      }
      function yi(e) {
        var r = e.data, n = e.metaData, i = e.sender, a = e.receiver, c = e.passByReference, u = c !== void 0 && c, h = e.basic, l = h !== void 0 && h, g = Mr(a.win), T = l ? JSON.stringify(r) : fi(g, a.domain, r, {
          on: Mt,
          send: Rt
        }), y = u ? function(w) {
          var P = st();
          return Xn(window)[P] = w, {
            type: "uid",
            uid: P
          };
        }(T) : {
          type: "raw",
          val: T
        };
        return {
          serializedData: Ka({
            sender: {
              domain: i.domain
            },
            metaData: n,
            reference: y
          }),
          cleanReference: function() {
            w = window, (P = y).type === "uid" && delete Xn(w)[P.uid];
            var w, P;
          }
        };
      }
      function Ei(e) {
        var r = e.sender, n = e.basic, i = n !== void 0 && n, a = function(T) {
          return JSON.parse(function(y) {
            if (typeof atob == "function") return decodeURIComponent([].map.call(atob(y), function(w) {
              return "%" + ("00" + w.charCodeAt(0).toString(16)).slice(-2);
            }).join(""));
            if (typeof Buffer < "u") return Buffer.from(y, "base64").toString("utf8");
            throw new Error("Can not find window.atob or Buffer");
          }(T));
        }(e.data), c = a.reference, u = a.metaData, h;
        h = typeof r.win == "function" ? r.win({
          metaData: u
        }) : r.win;
        var l;
        l = typeof r.domain == "function" ? r.domain({
          metaData: u
        }) : typeof r.domain == "string" ? r.domain : a.sender.domain;
        var g = function(T, y) {
          if (y.type === "raw") return y.val;
          if (y.type === "uid") return Xn(T)[y.uid];
          throw new Error("Unsupported ref type: " + y.type);
        }(h, c);
        return {
          data: i ? JSON.parse(g) : function(T, y, w) {
            return li(T, y, w, {
              on: Mt,
              send: Rt
            });
          }(h, l, g),
          metaData: u,
          sender: {
            win: h,
            domain: l
          },
          reference: c
        };
      }
      var be = {
        STRING: "string",
        OBJECT: "object",
        FUNCTION: "function",
        BOOLEAN: "boolean",
        NUMBER: "number",
        ARRAY: "array"
      }, fn = {
        JSON: "json",
        DOTIFY: "dotify",
        BASE64: "base64"
      }, We = q, Ce = {
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
      var Ya = Vt(function(e) {
        var r = Ei({
          data: Qn(e).serializedInitialPayload,
          sender: {
            win: function(n) {
              return function(i) {
                if (i.type === "opener") return nn("opener", Ae(window));
                if (i.type === "parent" && typeof i.distance == "number") return nn("parent", function(y, w) {
                  return w === void 0 && (w = 1), function(P, S) {
                    S === void 0 && (S = 1);
                    for (var R = P, O = 0; O < S; O++) {
                      if (!R) return;
                      R = ve(R);
                    }
                    return R;
                  }(y, Cr(y) - w);
                }(window, i.distance));
                if (i.type === "global" && i.uid && typeof i.uid == "string") {
                  var a = i.uid, c = $t(window);
                  if (!c) throw new Error("Can not find ancestor window");
                  for (var u = 0, h = Je(c); u < h.length; u++) {
                    var l = h[u];
                    if (U(l)) {
                      var g = gi(l, function(y) {
                        return y.windows && y.windows[a];
                      });
                      if (g) return g;
                    }
                  }
                } else if (i.type === "name") {
                  var T = i.name;
                  return nn("namedWindow", function(y, w) {
                    return Ht(y, w) || function P(S, R) {
                      var O = Ht(S, R);
                      if (O) return O;
                      for (var W = 0, L = Te(S); W < L.length; W++) {
                        var J = P(L[W], R);
                        if (J) return J;
                      }
                    }(Oe(y) || y, w);
                  }(nn("ancestor", $t(window)), T));
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
        return Ya(window.name);
      }
      function Za(e, r) {
        if (r === void 0 && (r = window), e === ve(r)) return {
          type: "parent",
          distance: Cr(e)
        };
        if (e === Ae(r)) return {
          type: "opener"
        };
        if (U(e) && (i = e, i !== Oe(i))) {
          var n = z(e).name;
          if (n) return {
            type: "name",
            name: n
          };
        }
        var i;
      }
      function Ti(e, r, n, i, a) {
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
      function Xa() {
        return v.try(function() {
          window.focus();
        });
      }
      function Si() {
        return v.try(function() {
          window.close();
        });
      }
      var Ft = function() {
        return Ie;
      }, sr = function(e) {
        return kr(e.value);
      };
      function kn(e, r, n) {
        for (var i = 0, a = Object.keys(p({}, e, r)); i < a.length; i++) {
          var c = a[i];
          n(c, r[c], e[c]);
        }
      }
      function Ri(e, r, n) {
        var i = {};
        return v.all(function(a, c, u) {
          var h = [];
          return kn(a, c, function(l, g, T) {
            var y = function(w, P, S) {
              return v.resolve().then(function() {
                var R, O;
                if (S != null && P) {
                  var W = (R = {}, R.get = P.queryParam, R.post = P.bodyParam, R)[n], L = (O = {}, O.get = P.queryValue, O.post = P.bodyValue, O)[n];
                  if (W) return v.hash({
                    finalParam: v.try(function() {
                      return typeof W == "function" ? W({
                        value: S
                      }) : typeof W == "string" ? W : w;
                    }),
                    finalValue: v.try(function() {
                      return typeof L == "function" && Gt(S) ? L({
                        value: S
                      }) : S;
                    })
                  }).then(function(J) {
                    var M = J.finalParam, V = J.finalValue, j;
                    if (typeof V == "boolean") j = V.toString();
                    else if (typeof V == "string") j = V.toString();
                    else if (typeof V == "object" && V !== null) {
                      if (P.serialization === fn.JSON) j = JSON.stringify(V);
                      else if (P.serialization === fn.BASE64) j = Dn(JSON.stringify(V));
                      else if (P.serialization === fn.DOTIFY || !P.serialization) {
                        j = function ce(X, G, le) {
                          G === void 0 && (G = ""), le === void 0 && (le = {}), G = G && G + ".";
                          for (var re in X) X.hasOwnProperty(re) && X[re] != null && typeof X[re] != "function" && (X[re] && Array.isArray(X[re]) && X[re].length && X[re].every(function(Me) {
                            return typeof Me != "object";
                          }) ? le["" + G + re + "[]"] = X[re].join(",") : X[re] && typeof X[re] == "object" ? le = ce(X[re], "" + G + re, le) : le["" + G + re] = X[re].toString());
                          return le;
                        }(V, w);
                        for (var te = 0, $ = Object.keys(j); te < $.length; te++) {
                          var he = $[te];
                          i[he] = j[he];
                        }
                        return;
                      }
                    } else typeof V == "number" && (j = V.toString());
                    i[M] = j;
                  });
                }
              });
            }(l, g, T);
            h.push(y);
          }), h;
        }(r, e)).then(function() {
          return i;
        });
      }
      function xi(e) {
        var r = e.uid, n = e.options, i = e.overrides, a = i === void 0 ? {} : i, c = e.parentWin, u = c === void 0 ? window : c, h = n.propsDef, l = n.containerTemplate, g = n.prerenderTemplate, T = n.tag, y = n.name, w = n.attributes, P = n.dimensions, S = n.autoResize, R = n.url, O = n.domain, W = n.exports, L = new v(), J = [], M = rn(), V = {}, j = {}, te = {
          visible: !0
        }, $ = a.event ? a.event : (he = {}, ce = {}, X = {
          on: function(I, _) {
            var H = ce[I] = ce[I] || [];
            H.push(_);
            var B = !1;
            return {
              cancel: function() {
                B || (B = !0, H.splice(H.indexOf(_), 1));
              }
            };
          },
          once: function(I, _) {
            var H = X.on(I, function() {
              H.cancel(), _();
            });
            return H;
          },
          trigger: function(I) {
            for (var _ = arguments.length, H = new Array(_ > 1 ? _ - 1 : 0), B = 1; B < _; B++) H[B - 1] = arguments[B];
            var oe = ce[I], Q = [];
            if (oe)
              for (var Se = function() {
                var Ze = oe[Re];
                Q.push(v.try(function() {
                  return Ze.apply(void 0, H);
                }));
              }, Re = 0; Re < oe.length; Re++) Se();
            return v.all(Q).then(Ie);
          },
          triggerOnce: function(I) {
            if (he[I]) return v.resolve();
            he[I] = !0;
            for (var _ = arguments.length, H = new Array(_ > 1 ? _ - 1 : 0), B = 1; B < _; B++) H[B - 1] = arguments[B];
            return X.trigger.apply(X, [I].concat(H));
          },
          reset: function() {
            ce = {};
          }
        }), he, ce, X, G = a.props ? a.props : {}, le, re, Me, Nt, Et, Kt = !1, Yt = a.onError, zt = a.getProxyContainer, Zt = a.show, Xt = a.hide, cr = a.close, Qt = a.renderContainer, xt = a.getProxyWindow, ur = a.setProxyWin, kt = a.openFrame, er = a.openPrerenderFrame, dr = a.prerender, fr = a.open, ue = a.openPrerender, bt = a.watchForUnload, fe = a.getInternalState, Ke = a.setInternalState, Ue = function() {
          return typeof P == "function" ? P({
            props: G
          }) : P;
        }, Ye = function() {
          return v.try(function() {
            return a.resolveInitPromise ? a.resolveInitPromise() : L.resolve();
          });
        }, Ne = function(I) {
          return v.try(function() {
            return a.rejectInitPromise ? a.rejectInitPromise(I) : L.reject(I);
          });
        }, ct = function(I) {
          for (var _ = {}, H = 0, B = Object.keys(G); H < B.length; H++) {
            var oe = B[H], Q = h[oe];
            if (!Q || Q.sendToChild !== !1) {
              var Se = Q && Q.trustedDomains && Q.trustedDomains.length > 0 ? Q.trustedDomains.reduce(function(Re, Ze) {
                return Re || wt(Ze, I);
              }, !1) : wt(I, ie(window));
              Q && Q.sameDomain && !Se || Q && Q.trustedDomains && !Se || (_[oe] = G[oe]);
            }
          }
          return v.hash(_);
        }, He = function() {
          return v.try(function() {
            return fe ? fe() : te;
          });
        }, $e = function(I) {
          return v.try(function() {
            return Ke ? Ke(I) : te = p({}, te, I);
          });
        }, Pt = function() {
          return xt ? xt() : v.try(function() {
            var I = G.window;
            if (I) {
              var _ = Mr(I);
              return M.register(function() {
                return I.close();
              }), _;
            }
            return new yt({
              send: Rt
            });
          });
        }, dt = function(I) {
          return ur ? ur(I) : v.try(function() {
            le = I;
          });
        }, Ot = function() {
          return Zt ? Zt() : v.hash({
            setState: $e({
              visible: !0
            }),
            showElement: re ? re.get().then(La) : null
          }).then(Ie);
        }, Ut = function() {
          return Xt ? Xt() : v.hash({
            setState: $e({
              visible: !1
            }),
            showElement: re ? re.get().then(qo) : null
          }).then(Ie);
        }, gr = function() {
          return typeof R == "function" ? R({
            props: G
          }) : R;
        }, yr = function() {
          return typeof w == "function" ? w({
            props: G
          }) : w;
        }, lr = function() {
          return Wt(gr());
        }, ft = function(I, _) {
          var H = _.windowName;
          return kt ? kt(I, {
            windowName: H
          }) : v.try(function() {
            if (I === We.IFRAME) return dn(jo({
              attributes: p({
                name: H,
                title: y
              }, yr().iframe)
            }));
          });
        }, zr = function(I) {
          return er ? er(I) : v.try(function() {
            if (I === We.IFRAME) return dn(jo({
              attributes: p({
                name: "__zoid_prerender_frame__" + y + "_" + st() + "__",
                title: "prerender__" + y
              }, yr().iframe)
            }));
          });
        }, Ur = function(I, _, H) {
          return ue ? ue(I, _, H) : v.try(function() {
            if (I === We.IFRAME) {
              if (!H) throw new Error("Expected proxy frame to be passed");
              return H.get().then(function(B) {
                return M.register(function() {
                  return Ar(B);
                }), Un(B).then(function(oe) {
                  return z(oe);
                }).then(function(oe) {
                  return Mr(oe);
                });
              });
            }
            if (I === We.POPUP) return _;
            throw new Error("No render context available for " + I);
          });
        }, Er = function() {
          return v.try(function() {
            if (le) return v.all([$.trigger(Ce.FOCUS), le.focus()]).then(Ie);
          });
        }, ln = function() {
          var I = Fr(window);
          return I.windows = I.windows || {}, I.windows[r] = window, M.register(function() {
            delete I.windows[r];
          }), r;
        }, Lr = function(I, _, H, B) {
          if (_ === ie(window)) return {
            type: "global",
            uid: ln()
          };
          if (I !== window) throw new Error("Can not construct cross-domain window reference for different target window");
          if (G.window) {
            var oe = B.getWindow();
            if (!oe) throw new Error("Can not construct cross-domain window reference for lazy window prop");
            if ($t(oe) !== window) throw new Error("Can not construct cross-domain window reference for window prop with different ancestor");
          }
          if (H === We.POPUP) return {
            type: "opener"
          };
          if (H === We.IFRAME) return {
            type: "parent",
            distance: Cr(window)
          };
          throw new Error("Can not construct window reference for child");
        }, hn = function(I, _) {
          return v.try(function() {
            var H;
            Nt = I, Me = _, (H = le) == null || H.isPopup().then(function(B) {
              if ((_ == null ? void 0 : _.name) !== "" && B) {
                var oe;
                (oe = le) == null || oe.setName(_ == null ? void 0 : _.name);
              }
            }).finally(function() {
              Ye(), M.register(function() {
                return _.close.fireAndForget().catch(Ie);
              });
            });
          });
        }, jr = function(I) {
          var _ = I.width, H = I.height;
          return v.try(function() {
            $.trigger(Ce.RESIZE, {
              width: _,
              height: H
            });
          });
        }, Br = function(I) {
          return v.try(function() {
            return $.trigger(Ce.DESTROY);
          }).catch(Ie).then(function() {
            return M.all(I);
          }).then(function() {
            var _ = I || new Error("Component destroyed");
            Et && mr(Et) || _.message === "Window navigated away" ? L.resolve() : L.asyncReject(_);
          });
        }, Lt = Vt(function(I) {
          return v.try(function() {
            return cr ? ze(cr.__source__) ? void 0 : cr() : v.try(function() {
              return $.trigger(Ce.CLOSE);
            }).then(function() {
              return Br(I || new Error("Component closed"));
            });
          });
        }), Ci = function(I, _) {
          var H = _.proxyWin, B = _.proxyFrame, oe = _.windowName;
          return fr ? fr(I, {
            proxyWin: H,
            proxyFrame: B,
            windowName: oe
          }) : v.try(function() {
            if (I === We.IFRAME) {
              if (!B) throw new Error("Expected proxy frame to be passed");
              return B.get().then(function(Le) {
                return Un(Le).then(function(me) {
                  return M.register(function() {
                    return Ar(Le);
                  }), M.register(function() {
                    return mi(me);
                  }), me;
                });
              });
            }
            if (I === We.POPUP) {
              var Q = Ue(), Se = Q.width, Re = Se === void 0 ? "300px" : Se, Ze = Q.height, De = Ze === void 0 ? "150px" : Ze;
              Re = Jo(Re, window.outerWidth), De = Jo(De, window.outerWidth);
              var Ve = function(Le, me) {
                var je = (me = me || {}).closeOnUnload, _e = je === void 0 ? 1 : je, lt = me.name, Xe = lt === void 0 ? "" : lt, pe = me.width, Qe = me.height, ut = 0, rt = 0;
                pe && (window.outerWidth ? rt = Math.round((window.outerWidth - pe) / 2) + window.screenX : window.screen.width && (rt = Math.round((window.screen.width - pe) / 2))), Qe && (window.outerHeight ? ut = Math.round((window.outerHeight - Qe) / 2) + window.screenY : window.screen.height && (ut = Math.round((window.screen.height - Qe) / 2))), delete me.closeOnUnload, delete me.name, pe && Qe && (me = p({
                  top: ut,
                  left: rt,
                  width: pe,
                  height: Qe,
                  status: 1,
                  toolbar: 0,
                  menubar: 0,
                  resizable: 1,
                  scrollbars: 1
                }, me));
                var hr = Object.keys(me).map(function(At) {
                  if (me[At] != null) return At + "=" + en(me[At]);
                }).filter(Boolean).join(","), Tt;
                try {
                  Tt = window.open("", Xe, hr);
                } catch (At) {
                  throw new zn("Can not open popup window - " + (At.stack || At.message));
                }
                if (ze(Tt))
                  throw new zn("Can not open popup window - blocked");
                return _e && window.addEventListener("unload", function() {
                  return Tt.close();
                }), Tt;
              }(0, p({
                name: oe,
                width: Re,
                height: De
              }, yr().popup));
              return M.register(function() {
                return xo(Ve);
              }), M.register(function() {
                return mi(Ve);
              }), Ve;
            }
            throw new Error("No render context available for " + I);
          }).then(function(Q) {
            return H.setWindow(Q, {
              send: Rt
            }), H.setName(oe).then(function() {
              return H;
            });
          });
        }, Di = function() {
          return v.try(function() {
            var I = Bo(window, "unload", kr(function() {
              Br(new Error("Window navigated away"));
            })), _ = So(u, Br, 3e3);
            if (M.register(_.cancel), M.register(I.cancel), bt) return bt();
          });
        }, _i = function(I) {
          var _ = !1;
          return I.isClosed().then(function(H) {
            return H ? (_ = !0, Lt(new Error("Detected component window close"))) : v.delay(200).then(function() {
              return I.isClosed();
            }).then(function(B) {
              if (B)
                return _ = !0, Lt(new Error("Detected component window close"));
            });
          }).then(function() {
            return _;
          });
        }, qr = function(I) {
          return Yt ? Yt(I) : v.try(function() {
            if (J.indexOf(I) === -1)
              return J.push(I), L.asyncReject(I), $.trigger(Ce.ERROR, I);
          });
        }, Ni = new v(), Ai = function(I) {
          return v.try(function() {
            Ni.resolve(I);
          });
        };
        hn.onError = qr;
        var Wi = function(I, _) {
          return I({
            uid: r,
            container: _.container,
            context: _.context,
            doc: _.doc,
            frame: _.frame,
            prerenderFrame: _.prerenderFrame,
            focus: Er,
            close: Lt,
            state: V,
            props: G,
            tag: T,
            dimensions: Ue(),
            event: $
          });
        }, Mi = function(I, _) {
          var H = _.context;
          return dr ? dr(I, {
            context: H
          }) : v.try(function() {
            if (g) {
              $.trigger(Ce.PRERENDER);
              var B = I.getWindow();
              if (B && U(B) && function(je) {
                try {
                  if (!je.location.href || je.location.href === "about:blank") return !0;
                } catch {
                }
                return !1;
              }(B)) {
                var oe = (B = z(B)).document, Q = Wi(g, {
                  context: H,
                  doc: oe
                });
                if (Q) {
                  if (Q.ownerDocument !== oe) throw new Error("Expected prerender template to have been created with document from child window");
                  (function(je, _e) {
                    var lt = _e.tagName.toLowerCase();
                    if (lt !== "html") throw new Error("Expected element to be html, got " + lt);
                    for (var Xe = je.document.documentElement, pe = 0, Qe = An(Xe.children); pe < Qe.length; pe++) Xe.removeChild(Qe[pe]);
                    for (var ut = 0, rt = An(_e.children); ut < rt.length; ut++) Xe.appendChild(rt[ut]);
                  })(B, Q);
                  var Se = S.width, Re = Se !== void 0 && Se, Ze = S.height, De = Ze !== void 0 && Ze, Ve = S.element, Le = Ve === void 0 ? "body" : Ve;
                  if ((Le = Fn(Le, oe)) && (Re || De)) {
                    var me = Ho(Le, function(je) {
                      jr({
                        width: Re ? je.width : void 0,
                        height: De ? je.height : void 0
                      });
                    }, {
                      width: Re,
                      height: De,
                      win: B
                    });
                    $.on(Ce.RENDERED, me.cancel);
                  }
                  $.trigger(Ce.PRERENDERED);
                }
              }
            }
          });
        }, Fi = function(I, _) {
          var H = _.proxyFrame, B = _.proxyPrerenderFrame, oe = _.context, Q = _.rerender;
          return Qt ? Qt(I, {
            proxyFrame: H,
            proxyPrerenderFrame: B,
            context: oe,
            rerender: Q
          }) : v.hash({
            container: I.get(),
            frame: H ? H.get() : null,
            prerenderFrame: B ? B.get() : null,
            internalState: He()
          }).then(function(Se) {
            var Re = Se.container, Ze = Se.internalState.visible, De = Wi(l, {
              context: oe,
              container: Re,
              frame: Se.frame,
              prerenderFrame: Se.prerenderFrame,
              doc: document
            });
            if (De) {
              Ze || qo(De), Ua(Re, De);
              var Ve = function(Le, me) {
                me = kr(me);
                var je = !1, _e = [], lt, Xe, pe, Qe = function() {
                  je = !0;
                  for (var Tt = 0; Tt < _e.length; Tt++) _e[Tt].disconnect();
                  lt && lt.cancel(), pe && pe.removeEventListener("unload", ut), Xe && Ar(Xe);
                }, ut = function() {
                  je || (me(), Qe());
                };
                if (mr(Le))
                  return ut(), {
                    cancel: Qe
                  };
                if (window.MutationObserver)
                  for (var rt = Le.parentElement; rt; ) {
                    var hr = new window.MutationObserver(function() {
                      mr(Le) && ut();
                    });
                    hr.observe(rt, {
                      childList: !0
                    }), _e.push(hr), rt = rt.parentElement;
                  }
                return (Xe = document.createElement("iframe")).setAttribute("name", "__detect_close_" + st() + "__"), Xe.style.display = "none", Un(Xe).then(function(Tt) {
                  (pe = z(Tt)).addEventListener("unload", ut);
                }), Le.appendChild(Xe), lt = _r(function() {
                  mr(Le) && ut();
                }, 1e3), {
                  cancel: Qe
                };
              }(De, function() {
                var Le = new Error("Detected container element removed from DOM");
                return v.delay(1).then(function() {
                  if (!mr(De))
                    return M.all(Le), Q().then(Ye, Ne);
                  Lt(Le);
                });
              });
              return M.register(function() {
                return Ve.cancel();
              }), M.register(function() {
                return Ar(De);
              }), re = dn(De);
            }
          });
        }, zi = function() {
          return {
            state: V,
            event: $,
            close: Lt,
            focus: Er,
            resize: jr,
            onError: qr,
            updateProps: cs,
            show: Ot,
            hide: Ut
          };
        }, ro = function(I) {
          I === void 0 && (I = {});
          var _ = Et, H = zi();
          wr(j, I), function(B, oe, Q, Se, Re) {
            var Ze = Se.state, De = Se.close, Ve = Se.focus, Le = Se.event, me = Se.onError;
            kn(Q, B, function(je, _e, lt) {
              var Xe = !1, pe = lt;
              Object.defineProperty(oe, je, {
                configurable: !0,
                enumerable: !0,
                get: function() {
                  return Xe ? pe : (Xe = !0, function() {
                    if (!_e) return pe;
                    var Qe = _e.alias;
                    if (Qe && !Gt(lt) && Gt(Q[Qe]) && (pe = Q[Qe]), _e.value && (pe = _e.value({
                      props: oe,
                      state: Ze,
                      close: De,
                      focus: Ve,
                      event: Le,
                      onError: me,
                      container: Re
                    })), !_e.default || Gt(pe) || Gt(Q[je]) || (pe = _e.default({
                      props: oe,
                      state: Ze,
                      close: De,
                      focus: Ve,
                      event: Le,
                      onError: me,
                      container: Re
                    })), Gt(pe)) {
                      if (_e.type === be.ARRAY ? !Array.isArray(pe) : typeof pe !== _e.type) throw new TypeError("Prop is not of type " + _e.type + ": " + je);
                    } else if (_e.required !== !1 && !Gt(Q[je])) throw new Error('Expected prop "' + je + '" to be defined');
                    return Gt(pe) && _e.decorate && (pe = _e.decorate({
                      value: pe,
                      props: oe,
                      state: Ze,
                      close: De,
                      focus: Ve,
                      event: Le,
                      onError: me,
                      container: Re
                    })), pe;
                  }());
                }
              });
            }), kn(oe, B, Ie);
          }(h, G, j, H, _);
        }, cs = function(I) {
          return ro(I), L.then(function() {
            var _ = Me, H = le;
            if (_ && H && Nt) return ct(Nt).then(function(B) {
              return _.updateProps(B).catch(function(oe) {
                return _i(H).then(function(Q) {
                  if (!Q) throw oe;
                });
              });
            });
          });
        }, Ui = function(I) {
          return zt ? zt(I) : v.try(function() {
            return Uo(I);
          }).then(function(_) {
            return Ln(_) && (_ = function H(B) {
              var oe = function(Ze) {
                var De = function(Ve) {
                  for (; Ve.parentNode; ) Ve = Ve.parentNode;
                  if (Ln(Ve)) return Ve;
                }(Ze);
                if (De && De.host) return De.host;
              }(B);
              if (!oe) throw new Error("Element is not in shadow dom");
              var Q = "shadow-slot-" + st(), Se = document.createElement("slot");
              Se.setAttribute("name", Q), B.appendChild(Se);
              var Re = document.createElement("div");
              return Re.setAttribute("slot", Q), oe.appendChild(Re), Ln(oe) ? H(Re) : Re;
            }(_)), Et = _, dn(_);
          });
        };
        return {
          init: function() {
            (function() {
              $.on(Ce.RENDER, function() {
                return G.onRender();
              }), $.on(Ce.PRERENDER, function() {
                return G.onPrerender();
              }), $.on(Ce.DISPLAY, function() {
                return G.onDisplay();
              }), $.on(Ce.RENDERED, function() {
                return G.onRendered();
              }), $.on(Ce.PRERENDERED, function() {
                return G.onPrerendered();
              }), $.on(Ce.CLOSE, function() {
                return G.onClose();
              }), $.on(Ce.DESTROY, function() {
                return G.onDestroy();
              }), $.on(Ce.RESIZE, function() {
                return G.onResize();
              }), $.on(Ce.FOCUS, function() {
                return G.onFocus();
              }), $.on(Ce.PROPS, function(I) {
                return G.onProps(I);
              }), $.on(Ce.ERROR, function(I) {
                return G && G.onError ? G.onError(I) : Ne(I).then(function() {
                  setTimeout(function() {
                    throw I;
                  }, 1);
                });
              }), M.register($.reset);
            })();
          },
          render: function(I) {
            var _ = I.target, H = I.container, B = I.context, oe = I.rerender;
            return v.try(function() {
              var Q = lr(), Se = O || lr();
              (function(K, ke, Be) {
                if (K !== window) {
                  if (!or(window, K)) throw new Error("Can only renderTo an adjacent frame");
                  var et = ie();
                  if (!wt(ke, et) && !U(K)) throw new Error("Can not render remotely to " + ke.toString() + " - can only render to " + et);
                  if (Be && typeof Be != "string") throw new Error("Container passed to renderTo must be a string selector, got " + typeof Be + " }");
                }
              })(_, Se, H);
              var Re = v.try(function() {
                if (_ !== window) return function(K, ke) {
                  for (var Be = {}, et = 0, pt = Object.keys(G); et < pt.length; et++) {
                    var qe = pt[et], St = h[qe];
                    St && St.allowDelegate && (Be[qe] = G[qe]);
                  }
                  var nt = Rt(ke, "zoid_delegate_" + y, {
                    uid: r,
                    overrides: {
                      props: Be,
                      event: $,
                      close: Lt,
                      onError: qr,
                      getInternalState: He,
                      setInternalState: $e,
                      resolveInitPromise: Ye,
                      rejectInitPromise: Ne
                    }
                  }).then(function(k) {
                    var ee = k.data.parent;
                    return M.register(function(F) {
                      if (!ze(ke)) return ee.destroy(F);
                    }), ee.getDelegateOverrides();
                  }).catch(function(k) {
                    throw new Error(`Unable to delegate rendering. Possibly the component is not loaded in the target window.

` + vr(k));
                  });
                  return zt = function() {
                    for (var k = arguments.length, ee = new Array(k), F = 0; F < k; F++) ee[F] = arguments[F];
                    return nt.then(function(ne) {
                      return ne.getProxyContainer.apply(ne, ee);
                    });
                  }, Qt = function() {
                    for (var k = arguments.length, ee = new Array(k), F = 0; F < k; F++) ee[F] = arguments[F];
                    return nt.then(function(ne) {
                      return ne.renderContainer.apply(ne, ee);
                    });
                  }, Zt = function() {
                    for (var k = arguments.length, ee = new Array(k), F = 0; F < k; F++) ee[F] = arguments[F];
                    return nt.then(function(ne) {
                      return ne.show.apply(ne, ee);
                    });
                  }, Xt = function() {
                    for (var k = arguments.length, ee = new Array(k), F = 0; F < k; F++) ee[F] = arguments[F];
                    return nt.then(function(ne) {
                      return ne.hide.apply(ne, ee);
                    });
                  }, bt = function() {
                    for (var k = arguments.length, ee = new Array(k), F = 0; F < k; F++) ee[F] = arguments[F];
                    return nt.then(function(ne) {
                      return ne.watchForUnload.apply(ne, ee);
                    });
                  }, K === We.IFRAME ? (xt = function() {
                    for (var k = arguments.length, ee = new Array(k), F = 0; F < k; F++) ee[F] = arguments[F];
                    return nt.then(function(ne) {
                      return ne.getProxyWindow.apply(ne, ee);
                    });
                  }, kt = function() {
                    for (var k = arguments.length, ee = new Array(k), F = 0; F < k; F++) ee[F] = arguments[F];
                    return nt.then(function(ne) {
                      return ne.openFrame.apply(ne, ee);
                    });
                  }, er = function() {
                    for (var k = arguments.length, ee = new Array(k), F = 0; F < k; F++) ee[F] = arguments[F];
                    return nt.then(function(ne) {
                      return ne.openPrerenderFrame.apply(ne, ee);
                    });
                  }, dr = function() {
                    for (var k = arguments.length, ee = new Array(k), F = 0; F < k; F++) ee[F] = arguments[F];
                    return nt.then(function(ne) {
                      return ne.prerender.apply(ne, ee);
                    });
                  }, fr = function() {
                    for (var k = arguments.length, ee = new Array(k), F = 0; F < k; F++) ee[F] = arguments[F];
                    return nt.then(function(ne) {
                      return ne.open.apply(ne, ee);
                    });
                  }, ue = function() {
                    for (var k = arguments.length, ee = new Array(k), F = 0; F < k; F++) ee[F] = arguments[F];
                    return nt.then(function(ne) {
                      return ne.openPrerender.apply(ne, ee);
                    });
                  }) : K === We.POPUP && (ur = function() {
                    for (var k = arguments.length, ee = new Array(k), F = 0; F < k; F++) ee[F] = arguments[F];
                    return nt.then(function(ne) {
                      return ne.setProxyWin.apply(ne, ee);
                    });
                  }), nt;
                }(B, _);
              }), Ze = G.window, De = Di(), Ve = Ri(h, G, "post"), Le = $.trigger(Ce.RENDER), me = Ui(H), je = Pt(), _e = me.then(function() {
                return ro();
              }), lt = _e.then(function() {
                return Ri(h, G, "get").then(function(K) {
                  return function(ke, Be) {
                    var et = Be.query || {}, pt = Be.hash || {}, qe, St, nt = ke.split("#");
                    St = nt[1];
                    var k = (qe = nt[0]).split("?");
                    qe = k[0];
                    var ee = zo(k[1], et), F = zo(St, pt);
                    return ee && (qe = qe + "?" + ee), F && (qe = qe + "#" + F), qe;
                  }(xn(gr()), {
                    query: K
                  });
                });
              }), Xe = je.then(function(K) {
                return function(Be) {
                  var et = Be === void 0 ? {} : Be, pt = et.proxyWin, qe = et.initialChildDomain, St = et.childDomainMatch, nt = et.target, k = nt === void 0 ? window : nt, ee = et.context;
                  return function(F) {
                    var ne = F === void 0 ? {} : F, no = ne.proxyWin, vs = ne.childDomainMatch, ws = ne.context;
                    return ct(ne.initialChildDomain).then(function(ms) {
                      return {
                        uid: r,
                        context: ws,
                        tag: T,
                        childDomainMatch: vs,
                        version: "10_3_3",
                        props: ms,
                        exports: (Bi = no, {
                          init: function(gs) {
                            return hn(this.origin, gs);
                          },
                          close: Lt,
                          checkClose: function() {
                            return _i(Bi);
                          },
                          resize: jr,
                          onError: qr,
                          show: Ot,
                          hide: Ut,
                          export: Ai
                        })
                      };
                      var Bi;
                    });
                  }({
                    proxyWin: pt,
                    initialChildDomain: qe,
                    childDomainMatch: St,
                    context: ee
                  }).then(function(F) {
                    var ne = yi({
                      data: F,
                      metaData: {
                        windowRef: Lr(k, qe, ee, pt)
                      },
                      sender: {
                        domain: ie(window)
                      },
                      receiver: {
                        win: pt,
                        domain: St
                      },
                      passByReference: qe === ie()
                    }), no = ne.serializedData;
                    return M.register(ne.cleanReference), no;
                  });
                }({
                  proxyWin: (ke = {
                    proxyWin: K,
                    initialChildDomain: Q,
                    childDomainMatch: Se,
                    target: _,
                    context: B
                  }).proxyWin,
                  initialChildDomain: ke.initialChildDomain,
                  childDomainMatch: ke.childDomainMatch,
                  target: ke.target,
                  context: ke.context
                }).then(function(Be) {
                  return bi({
                    name: y,
                    serializedPayload: Be
                  });
                });
                var ke;
              }), pe = Xe.then(function(K) {
                return ft(B, {
                  windowName: K
                });
              }), Qe = zr(B), ut = v.hash({
                proxyContainer: me,
                proxyFrame: pe,
                proxyPrerenderFrame: Qe
              }).then(function(K) {
                return Fi(K.proxyContainer, {
                  context: B,
                  proxyFrame: K.proxyFrame,
                  proxyPrerenderFrame: K.proxyPrerenderFrame,
                  rerender: oe
                });
              }).then(function(K) {
                return K;
              }), rt = v.hash({
                windowName: Xe,
                proxyFrame: pe,
                proxyWin: je
              }).then(function(K) {
                var ke = K.proxyWin;
                return Ze ? ke : Ci(B, {
                  windowName: K.windowName,
                  proxyWin: ke,
                  proxyFrame: K.proxyFrame
                });
              }), hr = v.hash({
                proxyWin: rt,
                proxyPrerenderFrame: Qe
              }).then(function(K) {
                return Ur(B, K.proxyWin, K.proxyPrerenderFrame);
              }), Tt = rt.then(function(K) {
                return le = K, dt(K);
              }), At = v.hash({
                proxyPrerenderWin: hr,
                state: Tt
              }).then(function(K) {
                return Mi(K.proxyPrerenderWin, {
                  context: B
                });
              }), Li = v.hash({
                proxyWin: rt,
                windowName: Xe
              }).then(function(K) {
                if (Ze) return K.proxyWin.setName(K.windowName);
              }), us = v.hash({
                body: Ve
              }).then(function(K) {
                return n.method ? n.method : Object.keys(K.body).length ? "post" : "get";
              }), ji = v.hash({
                proxyWin: rt,
                windowUrl: lt,
                body: Ve,
                method: us,
                windowName: Li,
                prerender: At
              }).then(function(K) {
                return K.proxyWin.setLocation(K.windowUrl, {
                  method: K.method,
                  body: K.body
                });
              }), ds = rt.then(function(K) {
                (function ke(Be, et) {
                  var pt = !1;
                  return M.register(function() {
                    pt = !0;
                  }), v.delay(2e3).then(function() {
                    return Be.isClosed();
                  }).then(function(qe) {
                    if (!pt) {
                      if (et === We.POPUP && qe) return Lt(new Error("Detected popup close"));
                      var St = !!(Et && mr(Et));
                      return et === We.IFRAME && qe && (St || Kt) ? Lt(new Error("Detected iframe close")) : ke(Be, et);
                    }
                  });
                })(K, B);
              }), fs = v.hash({
                container: ut,
                prerender: At
              }).then(function() {
                return $.trigger(Ce.DISPLAY);
              }), ls = rt.then(function(K) {
                return function(ke, Be, et) {
                  return v.try(function() {
                    return ke.awaitWindow();
                  }).then(function(pt) {
                    if (Jt && Jt.needsBridge({
                      win: pt,
                      domain: Be
                    }) && !Jt.hasBridge(Be, Be)) {
                      var qe = typeof n.bridgeUrl == "function" ? n.bridgeUrl({
                        props: G
                      }) : n.bridgeUrl;
                      if (!qe) throw new Error("Bridge needed to render " + et);
                      var St = Wt(qe);
                      return Jt.linkUrl(pt, Be), Jt.openBridge(xn(qe), St);
                    }
                  });
                }(K, Q, B);
              }), hs = ji.then(function() {
                return v.try(function() {
                  var K = G.timeout;
                  if (K) return L.timeout(K, new Error("Loading component timed out after " + K + " milliseconds"));
                });
              }), ps = L.then(function() {
                return Kt = !0, $.trigger(Ce.RENDERED);
              });
              return v.hash({
                initPromise: L,
                buildUrlPromise: lt,
                onRenderPromise: Le,
                getProxyContainerPromise: me,
                openFramePromise: pe,
                openPrerenderFramePromise: Qe,
                renderContainerPromise: ut,
                openPromise: rt,
                openPrerenderPromise: hr,
                setStatePromise: Tt,
                prerenderPromise: At,
                loadUrlPromise: ji,
                buildWindowNamePromise: Xe,
                setWindowNamePromise: Li,
                watchForClosePromise: ds,
                onDisplayPromise: fs,
                openBridgePromise: ls,
                runTimeoutPromise: hs,
                onRenderedPromise: ps,
                delegatePromise: Re,
                watchForUnloadPromise: De,
                finalSetPropsPromise: _e
              });
            }).catch(function(Q) {
              return v.all([qr(Q), Br(Q)]).then(function() {
                throw Q;
              }, function() {
                throw Q;
              });
            }).then(Ie);
          },
          destroy: Br,
          getProps: function() {
            return G;
          },
          setProps: ro,
          export: Ai,
          getHelpers: zi,
          getDelegateOverrides: function() {
            return v.try(function() {
              return {
                getProxyContainer: Ui,
                show: Ot,
                hide: Ut,
                renderContainer: Fi,
                getProxyWindow: Pt,
                watchForUnload: Di,
                openFrame: ft,
                openPrerenderFrame: zr,
                prerender: Mi,
                open: Ci,
                openPrerender: Ur,
                setProxyWin: dt
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
      var Qa = {
        register: function(e, r, n, i) {
          var a = i.React, c = i.ReactDOM;
          return function(u) {
            E(h, u);
            function h() {
              return u.apply(this, arguments) || this;
            }
            var l = h.prototype;
            return l.render = function() {
              return a.createElement("div", null);
            }, l.componentDidMount = function() {
              var g = c.findDOMNode(this), T = n(wr({}, this.props));
              T.render(g, We.IFRAME), this.setState({
                parent: T
              });
            }, l.componentDidUpdate = function() {
              this.state && this.state.parent && this.state.parent.updateProps(wr({}, this.props)).catch(Ie);
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
              this.parent = n(p({}, (c = this.$attrs, Object.keys(c).reduce(function(u, h) {
                var l = c[h];
                return h === "style-object" || h === "styleObject" ? (u.style = l, u.styleObject = l) : h.includes("-") ? u[Nn(h)] = l : u[h] = l, u;
              }, {}))));
              var c;
              this.parent.render(a, We.IFRAME);
            },
            watch: {
              $attrs: {
                handler: function() {
                  this.parent && this.$attrs && this.parent.updateProps(p({}, this.$attrs)).catch(Ie);
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
              this.parent = n(p({}, (a = this.$attrs, Object.keys(a).reduce(function(c, u) {
                var h = a[u];
                return u === "style-object" || u === "styleObject" ? (c.style = h, c.styleObject = h) : u.includes("-") ? c[Nn(u)] = h : c[u] = h, c;
              }, {}))));
              var a;
              this.parent.render(i, We.IFRAME);
            },
            watch: {
              $attrs: {
                handler: function() {
                  this.parent && this.$attrs && this.parent.updateProps(p({}, this.$attrs)).catch(Ie);
                },
                deep: !0
              }
            }
          };
        }
      }, ts = {
        register: function(e, r, n, i) {
          return i.module(e, []).directive(Nn(e), function() {
            for (var a = {}, c = 0, u = Object.keys(r); c < u.length; c++) a[u[c]] = "=";
            return a.props = "=", {
              scope: a,
              restrict: "E",
              controller: ["$scope", "$element", function(h, l) {
                function g() {
                  if (h.$root.$$phase !== "$apply" && h.$root.$$phase !== "$digest") try {
                    h.$apply();
                  } catch {
                  }
                }
                var T = function() {
                  return tn(h.props, function(w) {
                    return typeof w == "function" ? function() {
                      var P = w.apply(this, arguments);
                      return g(), P;
                    } : w;
                  });
                }, y = n(T());
                y.render(l[0], We.IFRAME), h.$watch(function() {
                  y.updateProps(T()).catch(Ie);
                });
              }]
            };
          });
        }
      }, rs = {
        register: function(e, r, n, i) {
          var a = i.Component, c = i.NgModule, u = i.ElementRef, h = i.NgZone, l = i.Inject, g = function() {
            function y(P, S) {
              this.elementRef = void 0, this.internalProps = void 0, this.parent = void 0, this.props = void 0, this.zone = void 0, this._props = void 0, this._props = {}, this.elementRef = P, this.zone = S;
            }
            var w = y.prototype;
            return w.getProps = function() {
              var P = this;
              return tn(p({}, this.internalProps, this.props), function(S) {
                if (typeof S == "function") {
                  var R = P.zone;
                  return function() {
                    var O = arguments, W = this;
                    return R.run(function() {
                      return S.apply(W, O);
                    });
                  };
                }
                return S;
              });
            }, w.ngOnInit = function() {
              var P = this.elementRef.nativeElement;
              this.parent = n(this.getProps()), this.parent.render(P, We.IFRAME);
            }, w.ngDoCheck = function() {
              this.parent && !function(P, S) {
                var R = {};
                for (var O in P) if (P.hasOwnProperty(O) && (R[O] = !0, P[O] !== S[O]))
                  return !1;
                for (var W in S) if (!R[W]) return !1;
                return !0;
              }(this._props, this.props) && (this._props = p({}, this.props), this.parent.updateProps(this.getProps()));
            }, y;
          }();
          g.annotations = void 0, g.parameters = void 0, g.parameters = [[new l(u)], [new l(h)]], g.annotations = [new a({
            selector: e,
            template: "<div></div>",
            inputs: ["props"]
          })];
          var T = function() {
          };
          return T.annotations = void 0, T.annotations = [new c({
            declarations: [g],
            exports: [g]
          })], T;
        }
      };
      function ns(e) {
        var r = e.uid, n = e.frame, i = e.prerenderFrame, a = e.doc, c = e.props, u = e.event, h = e.dimensions, l = h.width, g = h.height;
        if (n && i) {
          var T = a.createElement("div");
          T.setAttribute("id", r);
          var y = a.createElement("style");
          return c.cspNonce && y.setAttribute("nonce", c.cspNonce), y.appendChild(a.createTextNode(`
            #` + r + ` {
                display: inline-block;
                position: relative;
                width: ` + l + `;
                height: ` + g + `;
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
        `)), T.appendChild(n), T.appendChild(i), T.appendChild(y), i.classList.add("zoid-visible"), n.classList.add("zoid-invisible"), u.on(Ce.RENDERED, function() {
            i.classList.remove("zoid-visible"), i.classList.add("zoid-invisible"), n.classList.remove("zoid-invisible"), n.classList.add("zoid-visible"), setTimeout(function() {
              Ar(i);
            }, 1);
          }), u.on(Ce.RESIZE, function(w) {
            var P = w.width, S = w.height;
            typeof P == "number" && (T.style.width = Go(P)), typeof S == "number" && (T.style.height = Go(S));
          }), T;
        }
      }
      function os(e) {
        var r = e.doc, n = e.props, i = r.createElement("html"), a = r.createElement("body"), c = r.createElement("style"), u = r.createElement("div");
        return u.classList.add("spinner"), n.cspNonce && c.setAttribute("nonce", n.cspNonce), i.appendChild(a), a.appendChild(u), a.appendChild(c), c.appendChild(r.createTextNode(`
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
      var eo = rn(), to = rn();
      function is(e) {
        var r = function(S) {
          var R = S.tag, O = S.url, W = S.domain, L = S.bridgeUrl, J = S.props, M = J === void 0 ? {} : J, V = S.dimensions, j = V === void 0 ? {} : V, te = S.autoResize, $ = te === void 0 ? {} : te, he = S.allowedParentDomains, ce = he === void 0 ? "*" : he, X = S.attributes, G = X === void 0 ? {} : X, le = S.defaultContext, re = le === void 0 ? We.IFRAME : le, Me = S.containerTemplate, Nt = Me === void 0 ? ns : Me, Et = S.prerenderTemplate, Kt = Et === void 0 ? os : Et, Yt = S.validate, zt = S.eligible, Zt = zt === void 0 ? function() {
            return {
              eligible: !0
            };
          } : zt, Xt = S.logger, cr = Xt === void 0 ? {
            info: Ie
          } : Xt, Qt = S.exports, xt = Qt === void 0 ? Ie : Qt, ur = S.method, kt = S.children, er = kt === void 0 ? function() {
            return {};
          } : kt, dr = R.replace(/-/g, "_"), fr = p({}, {
            window: {
              type: be.OBJECT,
              sendToChild: !1,
              required: !1,
              allowDelegate: !0,
              validate: function(ue) {
                var bt = ue.value;
                if (!ir(bt) && !yt.isProxyWindow(bt)) throw new Error("Expected Window or ProxyWindow");
                if (ir(bt)) {
                  if (ze(bt)) throw new Error("Window is closed");
                  if (!U(bt)) throw new Error("Window is not same domain");
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
              default: Ft,
              decorate: sr
            },
            onRendered: {
              type: be.FUNCTION,
              required: !1,
              sendToChild: !1,
              default: Ft,
              decorate: sr
            },
            onRender: {
              type: be.FUNCTION,
              required: !1,
              sendToChild: !1,
              default: Ft,
              decorate: sr
            },
            onPrerendered: {
              type: be.FUNCTION,
              required: !1,
              sendToChild: !1,
              default: Ft,
              decorate: sr
            },
            onPrerender: {
              type: be.FUNCTION,
              required: !1,
              sendToChild: !1,
              default: Ft,
              decorate: sr
            },
            onClose: {
              type: be.FUNCTION,
              required: !1,
              sendToChild: !1,
              allowDelegate: !0,
              default: Ft,
              decorate: sr
            },
            onDestroy: {
              type: be.FUNCTION,
              required: !1,
              sendToChild: !1,
              allowDelegate: !0,
              default: Ft,
              decorate: sr
            },
            onResize: {
              type: be.FUNCTION,
              required: !1,
              sendToChild: !1,
              allowDelegate: !0,
              default: Ft
            },
            onFocus: {
              type: be.FUNCTION,
              required: !1,
              sendToChild: !1,
              allowDelegate: !0,
              default: Ft
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
          if (!Nt) throw new Error("Container template required");
          return {
            name: dr,
            tag: R,
            url: O,
            domain: W,
            bridgeUrl: L,
            method: ur,
            propsDef: fr,
            dimensions: j,
            autoResize: $,
            allowedParentDomains: ce,
            attributes: G,
            defaultContext: re,
            containerTemplate: Nt,
            prerenderTemplate: Kt,
            validate: Yt,
            logger: cr,
            eligible: Zt,
            children: er,
            exports: typeof xt == "function" ? xt : function(ue) {
              for (var bt = ue.getExports, fe = {}, Ke = function() {
                var Ne = Ye[Ue], ct = xt[Ne].type, He = bt().then(function($e) {
                  return $e[Ne];
                });
                fe[Ne] = ct === be.FUNCTION ? function() {
                  for (var $e = arguments.length, Pt = new Array($e), dt = 0; dt < $e; dt++) Pt[dt] = arguments[dt];
                  return He.then(function(Ot) {
                    return Ot.apply(void 0, Pt);
                  });
                } : He;
              }, Ue = 0, Ye = Object.keys(xt); Ue < Ye.length; Ue++) Ke();
              return fe;
            }
          };
        }(e), n = r.name, i = r.tag, a = r.defaultContext, c = r.propsDef, u = r.eligible, h = r.children, l = Fr(window), g = {}, T = [], y = function() {
          if (function(R) {
            try {
              return Qn(window.name).name === R;
            } catch {
            }
            return !1;
          }(n)) {
            var S = Pi().payload;
            if (S.tag === i && wt(S.childDomainMatch, ie())) return !0;
          }
          return !1;
        }, w = Vt(function() {
          if (y()) {
            if (window.xprops)
              throw delete l.components[i], new Error("Can not register " + n + " as child - child already registered");
            var S = function(R) {
              var O = R.tag, W = R.propsDef, L = R.autoResize, J = R.allowedParentDomains, M = [], V = Pi(), j = V.parent, te = V.payload, $ = j.win, he = j.domain, ce, X = new v(), G = te.version, le = te.uid, re = te.exports, Me = te.context, Nt = te.props;
              if (!function(fe, Ke) {
                if (!/_/.test(fe) || !/_/.test("10_3_3")) throw new Error("Versions are in an invalid format (" + fe + ", 10_3_3)");
                return fe.split("_")[0] === "10_3_3".split("_")[0];
              }(G)) throw new Error("Parent window has zoid version " + G + ", child window has version 10_3_3");
              var Et = re.show, Kt = re.hide, Yt = re.close, zt = re.onError, Zt = re.checkClose, Xt = re.export, cr = re.resize, Qt = re.init, xt = function() {
                return $;
              }, ur = function() {
                return he;
              }, kt = function(fe) {
                return M.push(fe), {
                  cancel: function() {
                    M.splice(M.indexOf(fe), 1);
                  }
                };
              }, er = function(fe) {
                return cr.fireAndForget({
                  width: fe.width,
                  height: fe.height
                });
              }, dr = function(fe) {
                return X.resolve(fe), Xt(fe);
              }, fr = function(fe) {
                var Ke = (fe === void 0 ? {} : fe).anyParent, Ue = [], Ye = ce.parent;
                if (Ke === void 0 && (Ke = !Ye), !Ke && !Ye) throw new Error("No parent found for " + O + " child");
                for (var Ne = 0, ct = Je(window); Ne < ct.length; Ne++) {
                  var He = ct[Ne];
                  if (U(He)) {
                    var $e = z(He).xprops;
                    if ($e && xt() === $e.getParent()) {
                      var Pt = $e.parent;
                      if (Ke || !Ye || Pt && Pt.uid === Ye.uid) {
                        var dt = gi(He, function(Ot) {
                          return Ot.exports;
                        });
                        Ue.push({
                          props: $e,
                          exports: dt
                        });
                      }
                    }
                  }
                }
                return Ue;
              }, ue = function(fe, Ke, Ue) {
                Ue === void 0 && (Ue = !1);
                var Ye = function(ct, He, $e, Pt, dt, Ot) {
                  Ot === void 0 && (Ot = !1);
                  for (var Ut = {}, gr = 0, yr = Object.keys($e); gr < yr.length; gr++) {
                    var lr = yr[gr], ft = He[lr], zr = ft && ft.trustedDomains && ft.trustedDomains.length > 0 ? ft.trustedDomains.reduce(function(hn, jr) {
                      return hn || wt(jr, ie(window));
                    }, !1) : Pt === ie(window) || U(ct);
                    if ((!ft || !ft.sameDomain || zr) && (!ft || !ft.trustedDomains || zr)) {
                      var Ur = Ti(He, 0, lr, $e[lr], dt);
                      Ut[lr] = Ur, ft && ft.alias && !Ut[ft.alias] && (Ut[ft.alias] = Ur);
                    }
                  }
                  if (!Ot) for (var Er = 0, ln = Object.keys(He); Er < ln.length; Er++) {
                    var Lr = ln[Er];
                    $e.hasOwnProperty(Lr) || (Ut[Lr] = Ti(He, 0, Lr, void 0, dt));
                  }
                  return Ut;
                }($, W, fe, Ke, {
                  tag: O,
                  show: Et,
                  hide: Kt,
                  close: Yt,
                  focus: Xa,
                  onError: zt,
                  resize: er,
                  getSiblings: fr,
                  onProps: kt,
                  getParent: xt,
                  getParentDomain: ur,
                  uid: le,
                  export: dr
                }, Ue);
                ce ? wr(ce, Ye) : ce = Ye;
                for (var Ne = 0; Ne < M.length; Ne++) (0, M[Ne])(ce);
              }, bt = function(fe) {
                return v.try(function() {
                  return ue(fe, he, !0);
                });
              };
              return {
                init: function() {
                  return v.try(function() {
                    var fe = "";
                    return U($) && (fe = function(Ke) {
                      var Ue = Ke.componentName, Ye = Ke.parentComponentWindow, Ne = Ei({
                        data: Qn(window.name).serializedInitialPayload,
                        sender: {
                          win: Ye
                        },
                        basic: !0
                      }), ct = Ne.sender;
                      if (Ne.reference.type === "uid" || Ne.metaData.windowRef.type === "global") {
                        var He = bi({
                          name: Ue,
                          serializedPayload: yi({
                            data: Ne.data,
                            metaData: {
                              windowRef: Za(Ye)
                            },
                            sender: {
                              domain: ct.domain
                            },
                            receiver: {
                              win: window,
                              domain: ie()
                            },
                            basic: !0
                          }).serializedData
                        });
                        return window.name = He, He;
                      }
                    }({
                      componentName: R.name,
                      parentComponentWindow: $
                    }) || ""), Fr(window).exports = R.exports({
                      getExports: function() {
                        return X;
                      }
                    }), function(Ke, Ue) {
                      if (!wt(Ke, Ue)) throw new Error("Can not be rendered by domain: " + Ue);
                    }(J, he), ko($), function() {
                      window.addEventListener("beforeunload", function() {
                        Zt.fireAndForget();
                      }), window.addEventListener("unload", function() {
                        Zt.fireAndForget();
                      }), So($, function() {
                        Si();
                      });
                    }(), Qt({
                      name: fe,
                      updateProps: bt,
                      close: Si
                    });
                  }).then(function() {
                    return (fe = L.width, Ke = fe !== void 0 && fe, Ue = L.height, Ye = Ue !== void 0 && Ue, Ne = L.element, Uo(Ne === void 0 ? "body" : Ne).catch(Ie).then(function(ct) {
                      return {
                        width: Ke,
                        height: Ye,
                        element: ct
                      };
                    })).then(function(ct) {
                      var He = ct.width, $e = ct.height, Pt = ct.element;
                      Pt && (He || $e) && Me !== We.POPUP && Ho(Pt, function(dt) {
                        er({
                          width: He ? dt.width : void 0,
                          height: $e ? dt.height : void 0
                        });
                      }, {
                        width: He,
                        height: $e
                      });
                    });
                    var fe, Ke, Ue, Ye, Ne;
                  }).catch(function(fe) {
                    zt(fe);
                  });
                },
                getProps: function() {
                  return ce || (ue(Nt, he), ce);
                }
              };
            }(r);
            return S.init(), S;
          }
        }), P = function S(R) {
          var O, W = "zoid-" + i + "-" + st(), L = R || {}, J = u({
            props: L
          }), M = J.eligible, V = J.reason, j = L.onDestroy;
          L.onDestroy = function() {
            if (O && M && T.splice(T.indexOf(O), 1), j) return j.apply(void 0, arguments);
          };
          var te = xi({
            uid: W,
            options: r
          });
          te.init(), M ? te.setProps(L) : L.onDestroy && L.onDestroy(), eo.register(function(ce) {
            return te.destroy(ce || new Error("zoid destroyed all components"));
          });
          var $ = function(ce) {
            var X = (ce === void 0 ? {} : ce).decorate;
            return S((X === void 0 ? Fa : X)(L));
          }, he = function(ce, X, G) {
            return v.try(function() {
              if (!M) {
                var le = new Error(V || n + " component is not eligible");
                return te.destroy(le).then(function() {
                  throw le;
                });
              }
              if (!ir(ce)) throw new Error("Must pass window to renderTo");
              return function(re, Me) {
                return v.try(function() {
                  if (re.window) return Mr(re.window).getType();
                  if (Me) {
                    if (Me !== We.IFRAME && Me !== We.POPUP) throw new Error("Unrecognized context: " + Me);
                    return Me;
                  }
                  return a;
                });
              }(L, G);
            }).then(function(le) {
              if (X = function(re, Me) {
                if (Me) {
                  if (typeof Me != "string" && !On(Me)) throw new TypeError("Expected string or element selector to be passed");
                  return Me;
                }
                if (re === We.POPUP) return "body";
                throw new Error("Expected element to be passed to render iframe");
              }(le, X), ce !== window && typeof X != "string") throw new Error("Must pass string element when rendering to another window");
              return te.render({
                target: ce,
                container: X,
                context: le,
                rerender: function() {
                  var re = $();
                  return wr(O, re), re.renderTo(ce, X, G);
                }
              });
            }).catch(function(le) {
              return te.destroy(le).then(function() {
                throw le;
              });
            });
          };
          return O = p({}, te.getExports(), te.getHelpers(), function() {
            for (var ce = h(), X = {}, G = function() {
              var Me = re[le], Nt = ce[Me];
              X[Me] = function(Et) {
                var Kt = te.getProps(), Yt = p({}, Et, {
                  parent: {
                    uid: W,
                    props: Kt,
                    export: te.export
                  }
                });
                return Nt(Yt);
              };
            }, le = 0, re = Object.keys(ce); le < re.length; le++) G();
            return X;
          }(), {
            isEligible: function() {
              return M;
            },
            clone: $,
            render: function(ce, X) {
              return he(window, ce, X);
            },
            renderTo: function(ce, X, G) {
              return he(ce, X, G);
            }
          }), M && T.push(O), O;
        };
        if (w(), function() {
          var S = Mt("zoid_allow_delegate_" + n, function() {
            return !0;
          }), R = Mt("zoid_delegate_" + n, function(O) {
            var W = O.data;
            return {
              parent: xi({
                uid: W.uid,
                options: r,
                overrides: W.overrides,
                parentWin: O.source
              })
            };
          });
          to.register(S.cancel), to.register(R.cancel);
        }(), l.components = l.components || {}, l.components[i]) throw new Error("Can not register multiple components with the same tag: " + i);
        return l.components[i] = !0, {
          init: P,
          instances: T,
          driver: function(S, R) {
            var O = {
              react: Qa,
              angular: ts,
              vue: ka,
              vue3: es,
              angular2: rs
            };
            if (!O[S]) throw new Error("Could not find driver for framework: " + S);
            return g[S] || (g[S] = O[S].register(i, c, P, R)), g[S];
          },
          isChild: y,
          canRenderTo: function(S) {
            return Rt(S, "zoid_allow_delegate_" + n).then(function(R) {
              return R.data;
            }).catch(function() {
              return !1;
            });
          },
          registerChild: w
        };
      }
      var as = function(e) {
        (function() {
          _t().initialized || (_t().initialized = !0, c = (a = {
            on: Mt,
            send: Rt
          }).on, u = a.send, (h = _t()).receiveMessage = h.receiveMessage || function(l) {
            return Zn(l, {
              on: c,
              send: u
            });
          }, function(l) {
            var g = l.on, T = l.send;
            we().getOrSet("postMessageListener", function() {
              return Bo(window, "message", function(y) {
                (function(w, P) {
                  var S = P.on, R = P.send;
                  v.try(function() {
                    var O = w.source || w.sourceElement, W = w.origin || w.originalEvent && w.originalEvent.origin, L = w.data;
                    if (W === "null" && (W = "file://"), O) {
                      if (!W) throw new Error("Post message did not have origin domain");
                      Zn({
                        source: O,
                        origin: W,
                        data: L
                      }, {
                        on: S,
                        send: R
                      });
                    }
                  });
                })(y, {
                  on: g,
                  send: T
                });
              });
            });
          }({
            on: Mt,
            send: Rt
          }), si({
            on: Mt,
            send: Rt,
            receiveMessage: Zn
          }), function(l) {
            var g = l.on, T = l.send;
            we("builtinListeners").getOrSet("helloListener", function() {
              var y = g("postrobot_hello", {
                domain: "*"
              }, function(P) {
                return Zo(P.source, {
                  domain: P.origin
                }), {
                  instanceID: Yo()
                };
              }), w = $t();
              return w && Bn(w, {
                send: T
              }).catch(function(P) {
              }), y;
            });
          }({
            on: Mt,
            send: Rt
          }));
          var a, c, u, h;
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
      function Oi(e) {
        Jt && Jt.destroyBridges();
        var r = eo.all(e);
        return eo = rn(), r;
      }
      var Ii = Oi;
      function ss(e) {
        return Ii(), delete window.__zoid_10_3_3__, function() {
          (function() {
            for (var n = we("responseListeners"), i = 0, a = n.keys(); i < a.length; i++) {
              var c = a[i], u = n.get(c);
              u && (u.cancelled = !0), n.del(c);
            }
          })(), (r = we().get("postMessageListener")) && r.cancel();
          var r;
          delete window.__post_robot_11_0_0__;
        }(), to.all(e);
      }
    }]);
  });
})(Ca);
var Da = Ca.exports;
const ea = Da.EVENT, Pr = {
  VISIBLE: "zoid-visible",
  INVISIBLE: "zoid-invisible"
};
function qc({
  uid: t,
  frame: o,
  prerenderFrame: s,
  doc: d,
  props: f,
  event: m,
  dimensions: E
}) {
  const { width: p, height: x } = E, { top: C = 0, left: b = 0 } = f;
  if (!o || !s)
    return;
  const D = d.createElement("div");
  D.setAttribute("id", t);
  const N = d.createElement("style");
  return f.cspNonce && N.setAttribute("nonce", f.cspNonce), N.appendChild(
    d.createTextNode(`
          #${t} {
              display: inline-block;
              position: absolute;
              width: ${p};
              height: ${x};
              z-index: 1049;
              border: none;
              top: ${C}px;
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
  ), D.appendChild(o), D.appendChild(s), D.appendChild(N), s.classList.add(Pr.INVISIBLE), o.classList.add(Pr.INVISIBLE), m.on(ea.RENDERED, () => {
    setTimeout(() => {
      o.classList.remove(Pr.INVISIBLE), o.classList.add(Pr.VISIBLE);
    }, 100), setTimeout(() => {
      s.remove();
    }, 1);
  }), m.on(ea.RESIZE, ({ width: ae, height: se }) => {
    typeof ae == "number" && (D.style.width = `${ae}px`), typeof se == "number" && (D.style.height = `${se}px`);
  }), D;
}
function Hc(t) {
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
    containerTemplate: qc
  });
}
function $c(t) {
  return Hc(t.id)(t);
}
class Vc extends Error {
  constructor(o, s) {
    super(o, s), this.name = "FetchError", s != null && s.cause && !this.cause && (this.cause = s.cause);
  }
}
function Gc(t) {
  var x, C, b, D, N;
  const o = ((x = t.error) == null ? void 0 : x.message) || ((C = t.error) == null ? void 0 : C.toString()) || "", s = ((b = t.request) == null ? void 0 : b.method) || ((D = t.options) == null ? void 0 : D.method) || "GET", d = ((N = t.request) == null ? void 0 : N.url) || String(t.request) || "/", f = `[${s}] ${JSON.stringify(d)}`, m = t.response ? `${t.response.status} ${t.response.statusText}` : "<no response>", E = `${f}: ${m}${o ? ` ${o}` : ""}`, p = new Vc(
    E,
    t.error ? { cause: t.error } : void 0
  );
  for (const ae of ["request", "options", "response"])
    Object.defineProperty(p, ae, {
      get() {
        return t[ae];
      }
    });
  for (const [ae, se] of [
    ["data", "_data"],
    ["status", "status"],
    ["statusCode", "status"],
    ["statusText", "statusText"],
    ["statusMessage", "statusText"]
  ])
    Object.defineProperty(p, ae, {
      get() {
        return t.response && t.response[se];
      }
    });
  return p;
}
const Jc = new Set(
  Object.freeze(["PATCH", "POST", "PUT", "DELETE"])
);
function ta(t = "GET") {
  return Jc.has(t.toUpperCase());
}
function Kc(t) {
  if (t === void 0)
    return !1;
  const o = typeof t;
  return o === "string" || o === "number" || o === "boolean" || o === null ? !0 : o !== "object" ? !1 : Array.isArray(t) ? !0 : t.buffer ? !1 : t.constructor && t.constructor.name === "Object" || typeof t.toJSON == "function";
}
const Yc = /* @__PURE__ */ new Set([
  "image/svg",
  "application/xml",
  "application/xhtml",
  "application/html"
]), Zc = /^application\/(?:[\w!#$%&*.^`~-]*\+)?json(;.+)?$/i;
function Xc(t = "") {
  if (!t)
    return "json";
  const o = t.split(";").shift() || "";
  return Zc.test(o) ? "json" : Yc.has(o) || o.startsWith("text/") ? "text" : "blob";
}
function Qc(t, o, s = globalThis.Headers) {
  const d = {
    ...o,
    ...t
  };
  if (o != null && o.params && (t != null && t.params) && (d.params = {
    ...o == null ? void 0 : o.params,
    ...t == null ? void 0 : t.params
  }), o != null && o.query && (t != null && t.query) && (d.query = {
    ...o == null ? void 0 : o.query,
    ...t == null ? void 0 : t.query
  }), o != null && o.headers && (t != null && t.headers)) {
    d.headers = new s((o == null ? void 0 : o.headers) || {});
    for (const [f, m] of new s((t == null ? void 0 : t.headers) || {}))
      d.headers.set(f, m);
  }
  return d;
}
const kc = /* @__PURE__ */ new Set([
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
function _a(t = {}) {
  const {
    fetch: o = globalThis.fetch,
    Headers: s = globalThis.Headers,
    AbortController: d = globalThis.AbortController
  } = t;
  async function f(p) {
    const x = p.error && p.error.name === "AbortError" && !p.options.timeout || !1;
    if (p.options.retry !== !1 && !x) {
      let b;
      typeof p.options.retry == "number" ? b = p.options.retry : b = ta(p.options.method) ? 0 : 1;
      const D = p.response && p.response.status || 500;
      if (b > 0 && (Array.isArray(p.options.retryStatusCodes) ? p.options.retryStatusCodes.includes(D) : kc.has(D))) {
        const N = p.options.retryDelay || 0;
        return N > 0 && await new Promise((ae) => setTimeout(ae, N)), m(p.request, {
          ...p.options,
          retry: b - 1
        });
      }
    }
    const C = Gc(p);
    throw Error.captureStackTrace && Error.captureStackTrace(C, m), C;
  }
  const m = async function(x, C = {}) {
    var ae;
    const b = {
      request: x,
      options: Qc(C, t.defaults, s),
      response: void 0,
      error: void 0
    };
    b.options.method = (ae = b.options.method) == null ? void 0 : ae.toUpperCase(), b.options.onRequest && await b.options.onRequest(b), typeof b.request == "string" && (b.options.baseURL && (b.request = Bs(b.request, b.options.baseURL)), (b.options.query || b.options.params) && (b.request = En(b.request, {
      ...b.options.params,
      ...b.options.query
    }))), b.options.body && ta(b.options.method) && (Kc(b.options.body) ? (b.options.body = typeof b.options.body == "string" ? b.options.body : JSON.stringify(b.options.body), b.options.headers = new s(b.options.headers || {}), b.options.headers.has("content-type") || b.options.headers.set("content-type", "application/json"), b.options.headers.has("accept") || b.options.headers.set("accept", "application/json")) : (
      // ReadableStream Body
      ("pipeTo" in b.options.body && typeof b.options.body.pipeTo == "function" || // Node.js Stream Body
      typeof b.options.body.pipe == "function") && ("duplex" in b.options || (b.options.duplex = "half"))
    ));
    let D;
    if (!b.options.signal && b.options.timeout) {
      const se = new d();
      D = setTimeout(
        () => se.abort(),
        b.options.timeout
      ), b.options.signal = se.signal;
    }
    try {
      b.response = await o(
        b.request,
        b.options
      );
    } catch (se) {
      return b.error = se, b.options.onRequestError && await b.options.onRequestError(b), await f(b);
    } finally {
      D && clearTimeout(D);
    }
    if (b.response.body && !eu.has(b.response.status) && b.options.method !== "HEAD") {
      const se = (b.options.parseResponse ? "json" : b.options.responseType) || Xc(b.response.headers.get("content-type") || "");
      switch (se) {
        case "json": {
          const Ge = await b.response.text(), v = b.options.parseResponse || Ia;
          b.response._data = v(Ge);
          break;
        }
        case "stream": {
          b.response._data = b.response.body;
          break;
        }
        default:
          b.response._data = await b.response[se]();
      }
    }
    return b.options.onResponse && await b.options.onResponse(b), !b.options.ignoreResponseError && b.response.status >= 400 && b.response.status < 600 ? (b.options.onResponseError && await b.options.onResponseError(b), await f(b)) : b.response;
  }, E = async function(x, C) {
    return (await m(x, C))._data;
  };
  return E.raw = m, E.native = (...p) => o(...p), E.create = (p = {}) => _a({
    ...t,
    defaults: {
      ...t.defaults,
      ...p
    }
  }), E;
}
const To = function() {
  if (typeof globalThis < "u")
    return globalThis;
  if (typeof self < "u")
    return self;
  if (typeof window < "u")
    return window;
  if (typeof global < "u")
    return global;
  throw new Error("unable to locate global object");
}(), tu = To.fetch || (() => Promise.reject(new Error("[ofetch] global.fetch is not supported!"))), ru = To.Headers, nu = To.AbortController, ou = _a({ fetch: tu, Headers: ru, AbortController: nu }), iu = ou.create({
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
});
function au() {
  var t = t || window;
  const o = new TextEncoder("utf-8"), s = new TextDecoder("utf-8");
  let d = new DataView(new ArrayBuffer(8));
  var f = [];
  class m {
    constructor() {
      this._callbackTimeouts = /* @__PURE__ */ new Map(), this._nextCallbackTimeoutID = 1;
      const p = () => new DataView(this._inst.exports.memory.buffer), x = (v) => {
        d.setBigInt64(0, v, !0);
        const A = d.getFloat64(0, !0);
        if (A === 0) return;
        if (!isNaN(A)) return A;
        const q = 0xffffffffn & v;
        return this._values[q];
      }, C = (v) => {
        let A = p().getBigUint64(v, !0);
        return x(A);
      }, b = (v) => {
        const A = 0x7ff80000n;
        if (typeof v == "number")
          return isNaN(v) ? A << 32n : v === 0 ? A << 32n | 1n : (d.setFloat64(0, v, !0), d.getBigInt64(0, !0));
        switch (v) {
          case void 0:
            return 0n;
          case null:
            return A << 32n | 2n;
          case !0:
            return A << 32n | 3n;
          case !1:
            return A << 32n | 4n;
        }
        let q = this._ids.get(v);
        q === void 0 && (q = this._idPool.pop(), q === void 0 && (q = BigInt(this._values.length)), this._values[q] = v, this._goRefCounts[q] = 0, this._ids.set(v, q)), this._goRefCounts[q]++;
        let Y = 1n;
        switch (typeof v) {
          case "string":
            Y = 2n;
            break;
          case "symbol":
            Y = 3n;
            break;
          case "function":
            Y = 4n;
        }
        return q | (A | Y) << 32n;
      }, D = (v, A) => {
        let q = b(A);
        p().setBigUint64(v, q, !0);
      }, N = (v, A, q) => new Uint8Array(this._inst.exports.memory.buffer, v, A), ae = (v, A, q) => {
        const Y = new Array(A);
        for (let Ee = 0; Ee < A; Ee++) Y[Ee] = C(v + 8 * Ee);
        return Y;
      }, se = (v, A) => s.decode(new DataView(this._inst.exports.memory.buffer, v, A)), Ge = Date.now() - performance.now();
      this.importObject = {
        wasi_snapshot_preview1: {
          fd_write: function(v, A, q, Y) {
            let Ee = 0;
            if (v == 1)
              for (let xe = 0; xe < q; xe++) {
                let Fe = A + 8 * xe, ve = p().getUint32(Fe + 0, !0), Ae = p().getUint32(Fe + 4, !0);
                Ee += Ae;
                for (let Z = 0; Z < Ae; Z++) {
                  let Pe = p().getUint8(ve + Z);
                  if (Pe != 13) if (Pe == 10) {
                    let ie = s.decode(new Uint8Array(f));
                    f = [], console.log(ie);
                  } else f.push(Pe);
                }
              }
            else console.error("invalid file descriptor:", v);
            return p().setUint32(Y, Ee, !0), 0;
          },
          fd_close: () => 0,
          fd_fdstat_get: () => 0,
          fd_seek: () => 0,
          proc_exit: (v) => {
            if (!t.process) throw "trying to exit with code " + v;
            process.exit(v);
          },
          random_get: (v, A) => (crypto.getRandomValues(N(v, A)), 0)
        },
        gojs: {
          "runtime.ticks": () => Ge + performance.now(),
          "runtime.sleepTicks": (v) => {
            setTimeout(this._inst.exports.go_scheduler, v);
          },
          "syscall/js.finalizeRef": (v) => {
            const A = p().getUint32(x(v), !0);
            if (this._goRefCounts[A]--, this._goRefCounts[A] === 0) {
              const q = this._values[A];
              this._values[A] = null, this._ids.delete(q), this._idPool.push(A);
            }
          },
          "syscall/js.stringVal": (v, A) => {
            const q = se(v, A);
            return b(q);
          },
          "syscall/js.valueGet": (v, A, q) => {
            let Y = se(A, q), Ee = x(v), xe = Reflect.get(Ee, Y);
            return b(xe);
          },
          "syscall/js.valueSet": (v, A, q, Y) => {
            const Ee = x(v), xe = se(A, q), Fe = x(Y);
            Reflect.set(Ee, xe, Fe);
          },
          "syscall/js.valueDelete": (v, A, q) => {
            const Y = x(v), Ee = se(A, q);
            Reflect.deleteProperty(Y, Ee);
          },
          "syscall/js.valueIndex": (v, A) => b(Reflect.get(x(v), A)),
          "syscall/js.valueSetIndex": (v, A, q) => {
            Reflect.set(x(v), A, x(q));
          },
          "syscall/js.valueCall": (v, A, q, Y, Ee, xe, Fe) => {
            const ve = x(A), Ae = se(q, Y), Z = ae(Ee, xe);
            try {
              const Pe = Reflect.get(ve, Ae);
              D(v, Reflect.apply(Pe, ve, Z)), p().setUint8(v + 8, 1);
            } catch (Pe) {
              D(v, Pe), p().setUint8(v + 8, 0);
            }
          },
          "syscall/js.valueInvoke": (v, A, q, Y, Ee) => {
            try {
              const xe = x(A), Fe = ae(q, Y);
              D(v, Reflect.apply(xe, void 0, Fe)), p().setUint8(v + 8, 1);
            } catch (xe) {
              D(v, xe), p().setUint8(v + 8, 0);
            }
          },
          "syscall/js.valueNew": (v, A, q, Y, Ee) => {
            const xe = x(A), Fe = ae(q, Y);
            try {
              D(v, Reflect.construct(xe, Fe)), p().setUint8(v + 8, 1);
            } catch (ve) {
              D(v, ve), p().setUint8(v + 8, 0);
            }
          },
          "syscall/js.valueLength": (v) => x(v).length,
          "syscall/js.valuePrepareString": (v, A) => {
            const q = String(x(A)), Y = o.encode(q);
            D(v, Y), p().setInt32(v + 8, Y.length, !0);
          },
          "syscall/js.valueLoadString": (v, A, q, Y) => {
            const Ee = x(v);
            N(A, q).set(Ee);
          },
          "syscall/js.valueInstanceOf": (v, A) => x(v) instanceof x(A),
          "syscall/js.copyBytesToGo": (v, A, q, Y, Ee) => {
            let xe = v, Fe = v + 4;
            const ve = N(A, q), Ae = x(Ee);
            if (!(Ae instanceof Uint8Array || Ae instanceof Uint8ClampedArray))
              return void p().setUint8(Fe, 0);
            const Z = Ae.subarray(0, ve.length);
            ve.set(Z), p().setUint32(xe, Z.length, !0), p().setUint8(Fe, 1);
          },
          "syscall/js.copyBytesToJS": (v, A, q, Y, Ee) => {
            let xe = v, Fe = v + 4;
            const ve = x(A), Ae = N(q, Y);
            if (!(ve instanceof Uint8Array || ve instanceof Uint8ClampedArray))
              return void p().setUint8(Fe, 0);
            const Z = Ae.subarray(0, ve.length);
            ve.set(Z), p().setUint32(xe, Z.length, !0), p().setUint8(Fe, 1);
          }
        }
      }, this.importObject.env = this.importObject.gojs;
    }
    async run(p) {
      for (this._inst = p, this._values = [NaN, 0, null, !0, !1, t, this], this._goRefCounts = [], this._ids = /* @__PURE__ */ new Map(), this._idPool = [], this.exited = !1; ; ) {
        const x = new Promise((C) => {
          this._resolveCallbackPromise = () => {
            if (this.exited)
              throw new Error("bad callback: Go program has already exited");
            setTimeout(C, 0);
          };
        });
        if (this._inst.exports._start(), this.exited) break;
        await x;
      }
    }
    _resume() {
      if (this.exited) throw new Error("Go program has already exited");
      this._inst.exports.resume(), this.exited && this._resolveExitPromise();
    }
    _makeFuncWrapper(p) {
      const x = this;
      return function() {
        const C = {
          id: p,
          this: this,
          args: arguments
        };
        return x._pendingEvent = C, x._resume(), C.result;
      };
    }
  }
  return new m();
}
class su {
  constructor() {
    It(this, "data");
    It(this, "mutex");
    this.mutex = new Na(), this.data = "";
  }
  async loadSource(o) {
    await this.mutex.acquire();
    try {
      this.data && (o.session = this.data);
      const s = JSON.stringify(o);
      for (let d = 1; d <= 3; d++)
        try {
          const f = await Jr.getInstance({}), { manifest: m, err: E, session: p } = await f.loadSource(s);
          if (E)
            throw new Error(E);
          return this.data = p, m;
        } catch (f) {
          if (console.log(`Attempt ${d} failed:`, f, s), d === 3)
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
class Na {
  constructor() {
    It(this, "_queue");
    It(this, "_locked");
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
const Bt = class Bt {
  constructor(o) {
    It(this, "mutex");
    // private go: any
    // private _values: any[]
    // private _goRefCounts: Map<any, any>
    // private _ids: any[]
    It(this, "instanceExpiration");
    It(this, "wasm");
    It(this, "uri");
    It(this, "go");
    var s;
    this.uri = o, o || (this.uri = (s = window == null ? void 0 : window.sigmaCSPMEnv) == null ? void 0 : s.WASM_URL), this.instanceExpiration = Date.now() + 1e3, this.mutex = new Na();
  }
  static async getInstance(o) {
    if (!Bt.instance)
      Bt.instance = new Bt(o.uri), Bt.instance.initializeInstance(1e3);
    else if (!Bt.instance)
      throw new Error("Manager not initialized");
    return Bt.instance;
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
          const m = await fetch(this.uri);
          this.wasm = await m.arrayBuffer();
        }
        window.loadSource !== null && (window.loadSource = null), window.getEventTracking = null, this.go && (this.go = null);
        const d = au();
        this.instanceExpiration = Date.now() + 1e3;
        const f = await WebAssembly.instantiate(
          this.wasm,
          d.importObject
        );
        d.run(f.instance), this.go = d;
      }
    } finally {
      this.mutex.release();
    }
  }
  async loadSource(o) {
    return await this.useInstance(async () => {
      try {
        return await window.loadSource(o);
      } catch (d) {
        return { err: d };
      }
    });
  }
  async getEventTracking(o) {
    const s = await this.useInstance(async () => {
      try {
        return await window.getEventTracking(o);
      } catch (d) {
        throw console.log("Error", d), d;
      }
    });
    return { avails: JSON.parse(s.avails) };
  }
  isExpired() {
    return Date.now() > this.instanceExpiration;
  }
  createSession() {
    return new su();
  }
};
It(Bt, "instance");
let Jr = Bt;
function ra(t, o, s) {
  var E;
  const d = o == null ? void 0 : o.find((p) => (p == null ? void 0 : p.id) == (t == null ? void 0 : t.availId)), m = ((E = d == null ? void 0 : d.ads) == null ? void 0 : E.filter((p) => (p == null ? void 0 : p.id) == (t == null ? void 0 : t.adsId))).find((p) => p.position === (t == null ? void 0 : t.position));
  return m && (m.availId = d == null ? void 0 : d.id), s && (s == null ? void 0 : s.id) == (m == null ? void 0 : m.id) && s.availId == (m == null ? void 0 : m.availId) ? s : m ? { ...m, impression: !1 } : null;
}
const cu = (t) => {
  try {
    return atob(t);
  } catch (o) {
    return console.error("Invalid base64 string:", o), null;
  }
};
function uu(t) {
  const s = new URL(t).hash, d = cu(s.substring(1));
  if (d)
    try {
      return {
        ...JSON.parse(d)
        // events: jsonObject.event
      };
    } catch (f) {
      console.error("Invalid JSON string:", f);
    }
  return null;
}
function na({ adsUrl: t, sdk: o, loader: s }) {
  return class extends s {
    constructor(f) {
      super(f);
    }
    load(f, m, E) {
      const p = E.onSuccess;
      E.onSuccess = async (x, C, b) => {
        (b.type === "manifest" || b.type === "level" || b.type === "audioTrack") && (x.data = await this.modifyManifest(x.url, x.data, b.type)), p(x, C, b);
      }, super.load(f, m, E);
    }
    async modifyManifest(f, m, E) {
      const p = {
        proxyAds: {
          uri: t,
          timeout: 2
        }
      };
      try {
        return await o.loadSource({ config: p, manifest: m, masterUri: f });
      } catch (x) {
        return console.error("[LOG] ~ error:", x), m;
      }
    }
  };
}
function du({
  video: t,
  adContainer: o,
  startSession: s,
  sdk: d,
  domain: f
}) {
  const m = Lc(), E = qt(!1), p = qt(), x = Math.random().toString(36).slice(6);
  function C({ icons: U }) {
    const z = Pn(f, "/build/dist/wta/index.html");
    return {
      id: x,
      appConfig: {
        sdkBaseUrl: En(z || "https://localhost:4222/wta/index.html", { id: x })
      },
      icons: U
    };
  }
  if (!!o) {
    const U = $c(C({
      icons: []
    }));
    U.render(o), U.hide(), o.style.display = "none", uc(() => {
      var z;
      if (p.value) {
        const de = ((z = p.value) == null ? void 0 : z.icons) || [];
        o.style.display = "block", U.updateProps(C({
          icons: de
        })), U.show();
      } else
        o.style.display = "none", U.hide();
    });
  }
  const D = qt([]), N = qt(), ae = qt([]);
  async function se(U) {
    var z;
    try {
      const de = (z = p.value) == null ? void 0 : z.trackingEvents.find((Te) => Te.eventType === U);
      if (!de)
        return;
      m.trigger(de), de.beaconUrls.map((Te) => jc(iu(Te, {
        retry: 3,
        retryDelay: 500
      })));
    } catch (de) {
      console.error("[ERROR] ~ error:", de);
    }
  }
  const Ge = /* @__PURE__ */ new Map();
  let v, A;
  function q(U, z, de) {
    U.addEventListener(z, de), Ge.set(z, de);
  }
  async function Y(U) {
    const z = uu(U);
    if (z) {
      const { avails: de } = await d.getEventTracking();
      p.value = ra(z, de, p.value), z.events.forEach((Te) => {
        p.value && (p.value.impression || (se("impression"), p.value.impression = !0), se(Te), Te === "complete" && (p.value = void 0));
      });
    }
  }
  function Ee() {
    return E.value = !1, ["fullscreenchange", "webkitfullscreenchange", "mozfullscreenchange", "msfullscreenchange"].forEach((U) => {
      q(t, U, () => {
        const z = document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement;
        se(z ? "fullscreen" : "exitFullscreen");
      });
    }), q(t, "pause", () => se("pause")), q(t, "play", () => se("resume")), q(t, "rewind", () => se("rewind")), q(t, "mute", () => se("mute")), q(t, "unmute", () => se("unmute")), async (U, z) => {
      const { tagList: de, _url: Te } = z.frag;
      de.flat().find((Oe) => Oe === "EXT-X-CUE-OUT-CONT" || Oe === "EXT-X-CUE-OUT" || Oe === "EXT-X-CUE-IN") && Y(Te);
    };
  }
  async function xe() {
    return d.getEventTracking().then((U) => {
      for (const z of (U == null ? void 0 : U.avails) || [])
        for (const de of z.ads) {
          const Te = `${z.id}_${de.id}_${de.startTimeInSeconds}`;
          for (const ot of de.trackingEvents) {
            const Oe = `${Te}_${ot.eventType}`;
            ae.value.find((at) => at.key === Oe) || ae.value.push({
              ...ot,
              key: Oe,
              ad: {
                ...de,
                key: Te
              },
              tracked: !1
            });
          }
        }
    });
  }
  function Fe() {
    return async (U, z) => {
      function de(Oe) {
        for (let Je = 0; Je < Oe.length; Je++)
          if (Oe[Je] === 0)
            return Je;
        return Oe.length;
      }
      const { start: Te, sn: ot } = z.frag;
      for (let Oe = 0; Oe < z.samples.length; Oe++) {
        const Je = z.samples[Oe], at = Je.data, Dt = Je.pts;
        if (String.fromCharCode.apply(null, at.slice(0, 3)) !== "ID3" || String.fromCharCode.apply(null, at.slice(10, 14)) !== "TXXX")
          continue;
        const Ht = at.slice(21, at.length), Yr = de(Ht), $t = Ht.slice(Yr + 1, Ht.length), Ir = de($t), Cr = new TextDecoder("utf-8").decode($t.slice(0, Ir)), or = {
          sn: ot,
          time: Dt - Te,
          value: Ia(Cr)
        };
        if (N.value && ot < N.value)
          return;
        D.value.push(or), or.value.event === "start" && xe();
      }
    };
  }
  function ve() {
    return (U) => {
      const z = U.track;
      z.kind === "metadata" && (z.oncuechange = async () => {
        const de = z.activeCues;
        for (let Te = 0; Te < de.length; Te++) {
          const ot = de[Te];
          if (ot.value && ot.value.uri) {
            const Oe = ot.value.uri;
            Y(Oe);
          }
        }
      });
    };
  }
  function Ae() {
    return async (U) => {
      var de, Te;
      const z = (de = U == null ? void 0 : U.detail) == null ? void 0 : de.value;
      if (((Te = U == null ? void 0 : U.detail) == null ? void 0 : Te.schemeIdUri) === "urn:sigma:dai:2018")
        try {
          const Oe = ((at) => {
            try {
              return atob(at);
            } catch (Dt) {
              return console.error("Invalid base64 string:", Dt), null;
            }
          })(z), Je = JSON.parse(Oe);
          if (Je.event = U.detail.id, Je) {
            const { avails: at } = await d.getEventTracking();
            p.value = ra(Je, at, p.value);
            const Dt = Je.event;
            p.value && (p.value.impression || (se("impression"), p.value.impression = !0), se(Dt), Dt === "complete" && (p.value = void 0));
          }
        } catch (ot) {
          console.error("Error decoding base64:", ot);
        }
    };
  }
  function Z(U, z) {
    m.on((de) => {
      (U === "*" || de.eventType === U) && z(de);
    });
  }
  function Pe() {
    p.value = void 0, D.value = [], ae.value = [], Vi(v), Vi(A), Ge.forEach((U, z) => {
      t.removeEventListener(z, U);
    }), Ge.clear();
  }
  function ie() {
    return {
      eventTracking: D,
      trackingDataEvent: ae
    };
  }
  return {
    destroy: Pe,
    onEventTracking: Z,
    hlsHelper: {
      createHlsFragChanged: Ee,
      createHlsFragParsingMetadata: Fe
    },
    videojsHelper: {
      createVideojsAddTrack: ve
    },
    shakaPlayerHelper: {
      createShakaPlayerHandlerEvent: Ae
    },
    getLog: ie
  };
}
async function pu({ video: t, adContainer: o, adsUrl: s, baseURL: d }) {
  const f = d || "https://cdn.jsdelivr.net/gh/sigmaott/sigma-ssai-web-sdk@v1.3.0", E = (await Jr.getInstance({ uri: Pn(f, "/build/dist/sigma-cspm.wasm") || "https://localhost:4222/sigma-cspm.wasm" })).createSession();
  function p() {
  }
  const { onEventTracking: x, destroy: C, videojsHelper: b, hlsHelper: D, shakaPlayerHelper: N, getLog: ae } = du({
    video: t,
    adContainer: o,
    trackingUrl: "",
    startSession: p,
    sdk: E,
    domain: f
  }), se = qt(), Ge = qt();
  function v(Z) {
    Z.config.loader = na({ adsUrl: s, sdk: E, loader: Hls.DefaultConfig.loader }), se.value = Z;
    const Pe = D.createHlsFragChanged(), ie = D.createHlsFragParsingMetadata();
    Z.on("hlsFragChanged", Pe), Z.on("hlsFragParsingMetadata", ie), Z.on(Hls.Events.ERROR, (U, z) => {
      console.error("HLS Error:", U, z), z.type === window.Hls.ErrorTypes.NETWORK_ERROR ? console.error("Network Error:", z.details) : z.type === window.Hls.ErrorTypes.MEDIA_ERROR ? console.error("Media Error:", z.details) : console.error("Other Error:", z.details);
    }), Ge.value = () => {
      Z.off("hlsFragChanged", Pe), Z.off("hlsFragParsingMetadata", ie);
    };
  }
  function A(Z) {
    Z.hls.config.loader = na({ adsUrl: s, sdk: E, loader: SigmaManager.DefaultConfig.loader }), se.value = Z.hls;
    const Pe = D.createHlsFragChanged(), ie = D.createHlsFragParsingMetadata();
    Z.hls.on("hlsFragChanged", Pe), Z.hls.on("hlsFragParsingMetadata", ie), Z.on(SigmaManager.Events.ERROR, (U, z) => {
      console.error("HLS Error:", U, z), z.type === window.Hls.ErrorTypes.NETWORK_ERROR ? console.error("Network Error:", z.details) : z.type === window.Hls.ErrorTypes.MEDIA_ERROR ? console.error("Media Error:", z.details) : console.error("Other Error:", z.details);
    }), Ge.value = () => {
      Z.hls.destroy();
    };
  }
  const q = qt(), Y = qt(), xe = {
    instance: E,
    config: {
      proxyAds: {
        uri: s,
        timeout: 2
      }
    }
  };
  function Fe(Z) {
    q.value = Z;
    const Pe = b.createVideojsAddTrack();
    Z.textTracks().on("addtrack", Pe), Y.value = () => {
      Z.textTracks().off("addtrack", Pe);
    };
  }
  function ve(Z, Pe) {
    const ie = N.createShakaPlayerHandlerEvent();
    Z.addEventListener("timelineregionenter", ie), Z.getNetworkingEngine().registerRequestFilter((U, z) => {
    }), Z.getNetworkingEngine().registerResponseFilter(async (U, z) => {
      if (U === 0) {
        const de = new TextDecoder().decode(z.data), Te = await E.loadSource({
          config: {
            proxyAds: {
              uri: s,
              timeout: 2e3
            }
          },
          masterUri: Pe,
          manifest: de
        });
        z.data = new TextEncoder().encode(Te);
      }
    });
  }
  function Ae() {
    var Z, Pe;
    C(), (Z = Ge.value) == null || Z.call(Ge), (Pe = Y.value) == null || Pe.call(Y), se.value = null, q.value = null, Ge.value = null, Y.value = null;
  }
  return {
    onEventTracking: x,
    destroy: Ae,
    sigmaPlayer: {
      attachVideojs: Fe,
      attachHls: v,
      attachSigmaDrm: A,
      getLog: ae,
      attachShaka: ve
    },
    sdk: E,
    cspm: xe
  };
}
const oa = window == null ? void 0 : window.videojs;
function fu(t) {
  if ((t == null ? void 0 : t.VERSION) === "7.10.2") {
    let o = t.Vhs.PlaylistLoader.prototype.setupInitialPlaylist;
    t != null && t.originalSetupInitialPlaylist ? o = t.originalSetupInitialPlaylist : t.originalSetupInitialPlaylist = o, t.Vhs.PlaylistLoader.prototype.setupInitialPlaylist = async function(f) {
      var m;
      if ((m = this.vhs_.options_) != null && m.cspm)
        try {
          const p = await (await fetch(this.src)).text();
          await this.vhs_.options_.cspm.instance.loadSource({
            config: this.vhs_.options_.cspm.config,
            manifest: p,
            masterUri: this.src
          });
        } catch (E) {
          console.error("Error loading source:", E);
        }
      o.apply(this, [f]);
    };
    let s = t.Vhs.PlaylistLoader.prototype.haveMetadata;
    t != null && t.originalHaveMetadata ? s = t.originalHaveMetadata : t.originalHaveMetadata = s, t.Vhs.PlaylistLoader.prototype.haveMetadata = async function({
      playlistString: f,
      playlistObject: m,
      url: E,
      id: p
    }) {
      var C, b;
      const x = (C = this.vhs_.options_.cspm) == null ? void 0 : C.config;
      try {
        f && ((b = this.vhs_.options_) != null && b.cspm) && (f = await this.vhs_.options_.cspm.instance.loadSource({
          config: x,
          manifest: f,
          masterUri: this.master.playlists[p].resolvedUri
        })), s.apply(this, [{ playlistString: f, playlistObject: m, url: E, id: p }]);
      } catch (D) {
        console.error("Error loading source:", D);
      }
    };
    const d = (f, m, E) => f && E && E.responseURL && m !== E.responseURL ? E.responseURL : m;
    t.Vhs.PlaylistLoader.prototype.media = function(f, m) {
      if (!f)
        return this.media_;
      if (this.state === "HAVE_NOTHING")
        throw new Error(`Cannot switch media playlist from ${this.state}`);
      if (typeof f == "string") {
        if (!this.master.playlists[f])
          throw new Error(`Unknown playlist URI: ${f}`);
        f = this.master.playlists[f];
      }
      if (window.clearTimeout(this.finalRenditionTimeout), m) {
        const x = f.targetDuration / 2 * 1e3 || 5e3;
        this.finalRenditionTimeout = window.setTimeout(this.media.bind(this, f, !1), x);
        return;
      }
      const E = this.state, p = !this.media_ || f.id !== this.media_.id;
      if (this.master.playlists[f.id].endList || f.endList && f.segments.length) {
        this.request && (this.request.onreadystatechange = null, this.request.abort(), this.request = null), this.state = "HAVE_METADATA", this.media_ = f, p && (this.trigger("mediachanging"), E === "HAVE_MASTER" ? this.trigger("loadedmetadata") : this.trigger("mediachange"));
        return;
      }
      if (p) {
        if (this.state = "SWITCHING_MEDIA", this.request) {
          if (f.resolvedUri === this.request.url)
            return;
          this.request.onreadystatechange = null, this.request.abort(), this.request = null;
        }
        this.media_ && this.trigger("mediachanging"), this.request = this.vhs_.xhr(
          {
            uri: f.resolvedUri,
            withCredentials: this.withCredentials
          },
          (x, C) => {
            if (this.request) {
              if (f.resolvedUri = d(this.handleManifestRedirects, f.resolvedUri, C), x)
                return this.playlistRequestError(this.request, f, E);
              this.haveMetadata({
                playlistString: C.responseText,
                url: f.uri,
                id: f.id
              }).then(() => {
                E === "HAVE_MASTER" ? this.trigger("loadedmetadata") : this.trigger("mediachange");
              });
            }
          }
        );
      }
    };
  } else {
    let o = t.Vhs.PlaylistLoader.prototype.setupInitialPlaylist;
    t != null && t.originalSetupInitialPlaylist ? o = t.originalSetupInitialPlaylist : t.originalSetupInitialPlaylist = o, t.Vhs.PlaylistLoader.prototype.setupInitialPlaylist = async function(E) {
      if (E.manifestString && this.vhs_.options_.cspm)
        try {
          await this.vhs_.options_.cspm.instance.loadSource({
            config: this.vhs_.options_.cspm.config,
            manifest: E.manifestString,
            masterUri: this.src
          });
        } catch (p) {
          console.error("Error loading source:", p);
        }
      o.apply(this, [E]);
    };
    let s = t.Vhs.PlaylistLoader.prototype.parseManifest_;
    t != null && t.originalParseManifest ? s = t.originalParseManifest : t.originalParseManifest = s, t.Vhs.PlaylistLoader.prototype.parseManifest_ = function({ url: E, manifestString: p }) {
      const x = s.apply(this, [{ url: E, manifestString: p }]);
      return x.playlists && x.playlists.length && (x.manifestString = p), x;
    };
    let d = t.Vhs.PlaylistLoader.prototype.haveMetadata;
    t.Vhs.PlaylistLoader.prototype.haveMetadata = async function({
      playlistString: E,
      playlistObject: p,
      url: x,
      id: C
    }) {
      try {
        if (E && this.vhs_.options_.cspm) {
          const b = this.vhs_.options_.cspm.config;
          E = await this.vhs_.options_.cspm.instance.loadSource({
            config: b,
            manifest: E,
            masterUri: this.main.playlists[C].resolvedUri
          });
        }
        d.apply(this, [{ playlistString: E, playlistObject: p, url: x, id: C }]);
      } catch (b) {
        throw console.error("Error loading source:", b), b;
      }
    }, t != null && t.originalHaveMetadata ? d = t.originalHaveMetadata : t.originalHaveMetadata = d;
    const f = (E, p) => {
      const x = E.segments || [], C = x[x.length - 1], b = C && C.parts && C.parts[C.parts.length - 1], D = b && b.duration || C && C.duration;
      return D ? D * 1e3 : (E.partTargetDuration || E.targetDuration || 10) * 500;
    }, m = (E, p) => p && p.responseURL && E !== p.responseURL ? p.responseURL : E;
    t.Vhs.PlaylistLoader.prototype.media = function(E, p) {
      if (!E)
        return this.media_;
      if (this.state === "HAVE_NOTHING")
        throw new Error(`Cannot switch media playlist from ${this.state}`);
      if (typeof E == "string") {
        if (!this.main.playlists[E])
          throw new Error(`Unknown playlist URI: ${E}`);
        E = this.main.playlists[E];
      }
      if (window.clearTimeout(this.finalRenditionTimeout), p) {
        const N = (E.partTargetDuration || E.targetDuration) / 2 * 1e3 || 5e3;
        this.finalRenditionTimeout = window.setTimeout(this.media.bind(this, E, !1), N);
        return;
      }
      const x = this.state, C = !this.media_ || E.id !== this.media_.id, b = this.main.playlists[E.id];
      if (b && b.endList || E.endList && E.segments.length) {
        this.request && (this.request.onreadystatechange = null, this.request.abort(), this.request = null), this.state = "HAVE_METADATA", this.media_ = E, C && (this.trigger("mediachanging"), x === "HAVE_MAIN_MANIFEST" ? this.trigger("loadedmetadata") : this.trigger("mediachange"));
        return;
      }
      if (this.updateMediaUpdateTimeout_(f(E)), !C)
        return;
      if (this.state = "SWITCHING_MEDIA", this.request) {
        if (E.resolvedUri === this.request.url)
          return;
        this.request.onreadystatechange = null, this.request.abort(), this.request = null;
      }
      this.media_ && this.trigger("mediachanging"), this.pendingMedia_ = E;
      const D = {
        playlistInfo: {
          type: "media",
          uri: E.uri
        }
      };
      this.trigger({ type: "playlistrequeststart", metadata: D }), this.request = this.vhs_.xhr(
        {
          uri: E.resolvedUri,
          withCredentials: this.withCredentials,
          requestType: "hls-playlist"
        },
        (N, ae) => {
          if (this.request) {
            if (E.lastRequest = Date.now(), E.resolvedUri = m(E.resolvedUri, ae), N)
              return this.playlistRequestError(this.request, E, x);
            this.haveMetadata({
              playlistString: ae.responseText,
              url: E.uri,
              id: E.id
            }).then(() => {
              this.trigger({ type: "playlistrequestcomplete", metadata: D }), x === "HAVE_MAIN_MANIFEST" ? this.trigger("loadedmetadata") : this.trigger("mediachange");
            });
          }
        }
      );
    };
  }
  return t;
}
oa && fu(oa);
function vu(t) {
  const o = "https://dai.sigma.video/api/proxy-ads/ads/", s = vo(t), d = `${s.protocol}//${s.host}${s.pathname}`;
  if (!s.search)
    return { playerUrl: t, adsUrl: null };
  const f = qs(t), m = f["sigma.dai.adsEndpoint"];
  if (!m)
    return { playerUrl: t, adsUrl: null };
  const E = {}, p = {};
  for (const [C, b] of Object.entries(f))
    C.startsWith("sigma.dai") ? C !== "sigma.dai.adsEndpoint" && (E[C.replace("sigma.dai.", "")] = b) : p[C] = b;
  return {
    playerUrl: En(d, p),
    adsUrl: En(Pn(o, m), E)
  };
}
export {
  pu as createSigmaDai,
  vu as processURL,
  fu as videojsForCSPM
};
