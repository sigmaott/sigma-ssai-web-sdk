var Ps = Object.defineProperty;
var Rs = (t, o, s) => o in t ? Ps(t, o, { enumerable: !0, configurable: !0, writable: !0, value: s }) : t[o] = s;
var Tt = (t, o, s) => Rs(t, typeof o != "symbol" ? o + "" : o, s);
const Ts = /#/g, Ss = /&/g, xs = /\//g, Os = /=/g, wo = /\+/g, Is = /%5e/gi, Cs = /%60/gi, Ds = /%7c/gi, _s = /%20/gi;
function Ns(t) {
  return encodeURI("" + t).replace(Ds, "|");
}
function fo(t) {
  return Ns(typeof t == "string" ? t : JSON.stringify(t)).replace(wo, "%2B").replace(_s, "+").replace(Ts, "%23").replace(Ss, "%26").replace(Cs, "`").replace(Is, "^").replace(xs, "%2F");
}
function io(t) {
  return fo(t).replace(Os, "%3D");
}
function sa(t = "") {
  try {
    return decodeURIComponent("" + t);
  } catch {
    return "" + t;
  }
}
function As(t) {
  return sa(t.replace(wo, " "));
}
function Ws(t) {
  return sa(t.replace(wo, " "));
}
function ca(t = "") {
  const o = {};
  t[0] === "?" && (t = t.slice(1));
  for (const s of t.split("&")) {
    const d = s.match(/([^=]+)=?(.*)/) || [];
    if (d.length < 2)
      continue;
    const f = As(d[1]);
    if (f === "__proto__" || f === "constructor")
      continue;
    const m = Ws(d[2] || "");
    o[f] === void 0 ? o[f] = m : Array.isArray(o[f]) ? o[f].push(m) : o[f] = [o[f], m];
  }
  return o;
}
function Ms(t, o) {
  return (typeof o == "number" || typeof o == "boolean") && (o = String(o)), o ? Array.isArray(o) ? o.map((s) => `${io(t)}=${fo(s)}`).join("&") : `${io(t)}=${fo(o)}` : io(t);
}
function Fs(t) {
  return Object.keys(t).filter((o) => t[o] !== void 0).map((o) => Ms(o, t[o])).filter(Boolean).join("&");
}
const Ls = /^[\s\w\0+.-]{2,}:([/\\]{1,2})/, zs = /^[\s\w\0+.-]{2,}:([/\\]{2})?/, Us = /^([/\\]\s*){2,}[^/\\]/, Bs = /^\.?\//;
function ua(t, o = {}) {
  return typeof o == "boolean" && (o = { acceptRelative: o }), o.strict ? Ls.test(t) : zs.test(t) || (o.acceptRelative ? Us.test(t) : !1);
}
function js(t = "", o) {
  return t.endsWith("/");
}
function qs(t = "", o) {
  return (js(t) ? t.slice(0, -1) : t) || "/";
}
function $s(t = "", o) {
  return t.endsWith("/") ? t : t + "/";
}
function Hs(t, o) {
  if (Gs(o) || ua(t))
    return t;
  const s = qs(o);
  return t.startsWith(s) ? t : Zr(s, t);
}
function Jr(t, o) {
  const s = mo(t), d = { ...ca(s.search), ...o };
  return s.search = Fs(d), Ks(s);
}
function Vs(t) {
  return ca(mo(t).search);
}
function Gs(t) {
  return !t || t === "/";
}
function Js(t) {
  return t && t !== "/";
}
function Zr(t, ...o) {
  let s = t || "";
  for (const d of o.filter((f) => Js(f)))
    if (s) {
      const f = d.replace(Bs, "");
      s = $s(s) + f;
    } else
      s = d;
  return s;
}
const da = Symbol.for("ufo:protocolRelative");
function mo(t = "", o) {
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
  if (!ua(t, { acceptRelative: !0 }))
    return Hi(t);
  const [, d = "", f, m = ""] = t.replace(/\\/g, "/").match(/^[\s\0]*([\w+.-]{2,}:)?\/\/([^/@]+@)?(.*)/) || [];
  let [, b = "", w = ""] = m.match(/([^#/?]*)(.*)?/) || [];
  d === "file:" && (w = w.replace(/\/(?=[A-Za-z]:)/, ""));
  const { pathname: S, search: C, hash: E } = Hi(w);
  return {
    protocol: d.toLowerCase(),
    auth: f ? f.slice(0, Math.max(0, f.length - 1)) : "",
    host: b,
    pathname: S,
    search: C,
    hash: E,
    [da]: !d
  };
}
function Hi(t = "") {
  const [o = "", s = "", d = ""] = (t.match(/([^#?]*)(\?[^#]*)?(#.*)?/) || []).splice(1);
  return {
    pathname: o,
    search: s,
    hash: d
  };
}
function Ks(t) {
  const o = t.pathname || "", s = t.search ? (t.search.startsWith("?") ? "" : "?") + t.search : "", d = t.hash || "", f = t.auth ? t.auth + "@" : "", m = t.host || "";
  return (t.protocol || t[da] ? (t.protocol || "") + "//" : "") + f + m + o + s + d;
}
const Ys = (t) => (o, s) => (t.set(o, s), s), Vi = Number.MAX_SAFE_INTEGER === void 0 ? 9007199254740991 : Number.MAX_SAFE_INTEGER, fa = 536870912, Gi = fa * 2, Zs = (t, o) => (s) => {
  const d = o.get(s);
  let f = d === void 0 ? s.size : d < Gi ? d + 1 : 0;
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
}, la = /* @__PURE__ */ new WeakMap(), Xs = Ys(la), mn = Zs(Xs, la), Qs = (t) => t.method !== void 0 && t.method === "call", ks = (t) => typeof t.id == "number" && typeof t.result == "boolean", ec = (t) => {
  const o = /* @__PURE__ */ new Map([[0, () => {
  }]]), s = /* @__PURE__ */ new Map([[0, () => {
  }]]), d = /* @__PURE__ */ new Map(), f = new Worker(t);
  return f.addEventListener("message", ({ data: C }) => {
    if (Qs(C)) {
      const { params: { timerId: E, timerType: D } } = C;
      if (D === "interval") {
        const N = o.get(E);
        if (typeof N === void 0)
          throw new Error("The timer is in an undefined state.");
        if (typeof N == "number") {
          const se = d.get(N);
          if (se === void 0 || se.timerId !== E || se.timerType !== D)
            throw new Error("The timer is in an undefined state.");
        } else typeof N == "function" && N();
      } else if (D === "timeout") {
        const N = s.get(E);
        if (typeof N === void 0)
          throw new Error("The timer is in an undefined state.");
        if (typeof N == "number") {
          const se = d.get(N);
          if (se === void 0 || se.timerId !== E || se.timerType !== D)
            throw new Error("The timer is in an undefined state.");
        } else typeof N == "function" && (N(), s.delete(E));
      }
    } else if (ks(C)) {
      const { id: E } = C, D = d.get(E);
      if (D === void 0)
        throw new Error("The timer is in an undefined state.");
      const { timerId: N, timerType: se } = D;
      d.delete(E), se === "interval" ? o.delete(N) : s.delete(N);
    } else {
      const { error: { message: E } } = C;
      throw new Error(E);
    }
  }), {
    clearInterval: (C) => {
      if (typeof o.get(C) == "function") {
        const E = mn(d);
        d.set(E, { timerId: C, timerType: "interval" }), o.set(C, E), f.postMessage({
          id: E,
          method: "clear",
          params: { timerId: C, timerType: "interval" }
        });
      }
    },
    clearTimeout: (C) => {
      if (typeof s.get(C) == "function") {
        const E = mn(d);
        d.set(E, { timerId: C, timerType: "timeout" }), s.set(C, E), f.postMessage({
          id: E,
          method: "clear",
          params: { timerId: C, timerType: "timeout" }
        });
      }
    },
    setInterval: (C, E = 0, ...D) => {
      const N = mn(o);
      return o.set(N, () => {
        C(...D), typeof o.get(N) == "function" && f.postMessage({
          id: null,
          method: "set",
          params: {
            delay: E,
            now: performance.timeOrigin + performance.now(),
            timerId: N,
            timerType: "interval"
          }
        });
      }), f.postMessage({
        id: null,
        method: "set",
        params: {
          delay: E,
          now: performance.timeOrigin + performance.now(),
          timerId: N,
          timerType: "interval"
        }
      }), N;
    },
    setTimeout: (C, E = 0, ...D) => {
      const N = mn(s);
      return s.set(N, () => C(...D)), f.postMessage({
        id: null,
        method: "set",
        params: {
          delay: E,
          now: performance.timeOrigin + performance.now(),
          timerId: N,
          timerType: "timeout"
        }
      }), N;
    }
  };
}, tc = (t, o) => {
  let s = null;
  return () => {
    if (s !== null)
      return s;
    const d = new Blob([o], { type: "application/javascript; charset=utf-8" }), f = URL.createObjectURL(d);
    return s = t(f), setTimeout(() => URL.revokeObjectURL(f)), s;
  };
}, rc = `(()=>{"use strict";const e=new Map,t=new Map,r=t=>{const r=e.get(t);return void 0!==r&&(clearTimeout(r),e.delete(t),!0)},s=e=>{const r=t.get(e);return void 0!==r&&(clearTimeout(r),t.delete(e),!0)},o=(e,t)=>{const r=performance.now(),s=e+t-r-performance.timeOrigin;return{expected:r+s,remainingDelay:s}},i=(e,t,r,s)=>{const o=r-performance.now();o>0?e.set(t,setTimeout(i,o,e,t,r,s)):(e.delete(t),postMessage({id:null,method:"call",params:{timerId:t,timerType:s}}))};addEventListener("message",(n=>{let{data:a}=n;try{if("clear"===a.method){const{id:e,params:{timerId:t,timerType:o}}=a;if("interval"===o)postMessage({id:e,result:r(t)});else{if("timeout"!==o)throw new Error('The given type "'.concat(o,'" is not supported'));postMessage({id:e,result:s(t)})}}else{if("set"!==a.method)throw new Error('The given method "'.concat(a.method,'" is not supported'));{const{params:{delay:r,now:s,timerId:n,timerType:m}}=a;if("interval"===m)((t,r,s)=>{const{expected:n,remainingDelay:a}=o(t,s);e.set(r,setTimeout(i,a,e,r,n,"interval"))})(r,n,s);else{if("timeout"!==m)throw new Error('The given type "'.concat(m,'" is not supported'));((e,r,s)=>{const{expected:n,remainingDelay:a}=o(e,s);t.set(r,setTimeout(i,a,t,r,n,"timeout"))})(r,n,s)}}}}catch(e){postMessage({error:{message:e.message},id:a.id,result:null})}}))})();`, nc = tc(ec, rc), Ji = (t) => nc().clearTimeout(t);
/**
* @vue/shared v3.5.1
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
/*! #__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function oc(t, o) {
  const s = new Set(t.split(","));
  return (d) => s.has(d);
}
const Ki = Object.assign, ic = Object.prototype.hasOwnProperty, lo = (t, o) => ic.call(t, o), Tr = Array.isArray, Vr = (t) => ha(t) === "[object Map]", ac = (t) => typeof t == "string", Xr = (t) => typeof t == "symbol", Tn = (t) => t !== null && typeof t == "object", sc = Object.prototype.toString, ha = (t) => sc.call(t), pa = (t) => ha(t).slice(8, -1), go = (t) => ac(t) && t !== "NaN" && t[0] !== "-" && "" + parseInt(t, 10) === t, cc = (t) => {
  const o = /* @__PURE__ */ Object.create(null);
  return (s) => o[s] || (o[s] = t(s));
}, uc = cc((t) => t.charAt(0).toUpperCase() + t.slice(1)), Ir = (t, o) => !Object.is(t, o);
var tt = {};
function xr(t, ...o) {
  console.warn(`[Vue warn] ${t}`, ...o);
}
let ge;
const ao = /* @__PURE__ */ new WeakSet();
class Yi {
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
    this.flags & 2 && !(this.flags & 32) || this.flags & 8 || (this.flags |= 8, this.nextEffect = Gr, Gr = this);
  }
  run() {
    if (!(this.flags & 1))
      return this.fn();
    this.flags |= 2, Zi(this), wa(this);
    const o = ge, s = Ct;
    ge = this, Ct = !0;
    try {
      return this.fn();
    } finally {
      tt.NODE_ENV !== "production" && ge !== this && xr(
        "Active effect was not restored correctly - this is likely a Vue internal bug."
      ), ma(this), ge = o, Ct = s, this.flags &= -3;
    }
  }
  stop() {
    if (this.flags & 1) {
      for (let o = this.deps; o; o = o.nextDep)
        bo(o);
      this.deps = this.depsTail = void 0, Zi(this), this.onStop && this.onStop(), this.flags &= -2;
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
let va = 0, Gr;
function yo() {
  va++;
}
function Eo() {
  if (--va > 0)
    return;
  let t;
  for (; Gr; ) {
    let o = Gr;
    for (Gr = void 0; o; ) {
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
function wa(t) {
  for (let o = t.deps; o; o = o.nextDep)
    o.version = -1, o.prevActiveLink = o.dep.activeLink, o.dep.activeLink = o;
}
function ma(t) {
  let o, s = t.depsTail;
  for (let d = s; d; d = d.prevDep)
    d.version === -1 ? (d === s && (s = d.prevDep), bo(d), fc(d)) : o = d, d.dep.activeLink = d.prevActiveLink, d.prevActiveLink = void 0;
  t.deps = o, t.depsTail = s;
}
function ho(t) {
  for (let o = t.deps; o; o = o.nextDep)
    if (o.dep.version !== o.version || o.dep.computed && dc(o.dep.computed) === !1 || o.dep.version !== o.version)
      return !0;
  return !!t._dirty;
}
function dc(t) {
  if (t.flags & 2)
    return !1;
  if (t.flags & 4 && !(t.flags & 16) || (t.flags &= -17, t.globalVersion === Rn))
    return;
  t.globalVersion = Rn;
  const o = t.dep;
  if (t.flags |= 2, o.version > 0 && !t.isSSR && !ho(t)) {
    t.flags &= -3;
    return;
  }
  const s = ge, d = Ct;
  ge = t, Ct = !0;
  try {
    wa(t);
    const f = t.fn();
    (o.version === 0 || Ir(f, t._value)) && (t._value = f, o.version++);
  } catch (f) {
    throw o.version++, f;
  } finally {
    ge = s, Ct = d, ma(t), t.flags &= -3;
  }
}
function bo(t) {
  const { dep: o, prevSub: s, nextSub: d } = t;
  if (s && (s.nextSub = d, t.prevSub = void 0), d && (d.prevSub = s, t.nextSub = void 0), o.subs === t && (o.subs = s), !o.subs && o.computed) {
    o.computed.flags &= -5;
    for (let f = o.computed.deps; f; f = f.nextDep)
      bo(f);
  }
}
function fc(t) {
  const { prevDep: o, nextDep: s } = t;
  o && (o.nextDep = s, t.prevDep = void 0), s && (s.prevDep = o, t.nextDep = void 0);
}
function lc(t, o) {
  t.effect instanceof Yi && (t = t.effect.fn);
  const s = new Yi(t);
  try {
    s.run();
  } catch (f) {
    throw s.stop(), f;
  }
  const d = s.run.bind(s);
  return d.effect = s, d;
}
let Ct = !0;
const ga = [];
function hc() {
  ga.push(Ct), Ct = !1;
}
function pc() {
  const t = ga.pop();
  Ct = t === void 0 ? !0 : t;
}
function Zi(t) {
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
let Rn = 0;
class ya {
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
      }, ge.deps ? (s.prevDep = ge.depsTail, ge.depsTail.nextDep = s, ge.depsTail = s) : ge.deps = ge.depsTail = s, ge.flags & 4 && Ea(s);
    else if (s.version === -1 && (s.version = this.version, s.nextDep)) {
      const d = s.nextDep;
      d.prevDep = s.prevDep, s.prevDep && (s.prevDep.nextDep = d), s.prevDep = ge.depsTail, s.nextDep = void 0, ge.depsTail.nextDep = s, ge.depsTail = s, ge.deps === s && (ge.deps = d);
    }
    return tt.NODE_ENV !== "production" && ge.onTrack && ge.onTrack(
      Ki(
        {
          effect: ge
        },
        o
      )
    ), s;
  }
  trigger(o) {
    this.version++, Rn++, this.notify(o);
  }
  notify(o) {
    yo();
    try {
      if (tt.NODE_ENV !== "production")
        for (let s = this.subsHead; s; s = s.nextSub)
          tt.NODE_ENV !== "production" && s.sub.onTrigger && !(s.sub.flags & 8) && s.sub.onTrigger(
            Ki(
              {
                effect: s.sub
              },
              o
            )
          );
      for (let s = this.subs; s; s = s.prevSub)
        s.sub.notify();
    } finally {
      Eo();
    }
  }
}
function Ea(t) {
  const o = t.dep.computed;
  if (o && !t.dep.subs) {
    o.flags |= 20;
    for (let d = o.deps; d; d = d.nextDep)
      Ea(d);
  }
  const s = t.dep.subs;
  s !== t && (t.prevSub = s, s && (s.nextSub = t)), tt.NODE_ENV !== "production" && t.dep.subsHead === void 0 && (t.dep.subsHead = t), t.dep.subs = t;
}
const po = /* @__PURE__ */ new WeakMap(), vr = Symbol(
  tt.NODE_ENV !== "production" ? "Object iterate" : ""
), vo = Symbol(
  tt.NODE_ENV !== "production" ? "Map keys iterate" : ""
), Kr = Symbol(
  tt.NODE_ENV !== "production" ? "Array iterate" : ""
);
function vt(t, o, s) {
  if (Ct && ge) {
    let d = po.get(t);
    d || po.set(t, d = /* @__PURE__ */ new Map());
    let f = d.get(s);
    f || d.set(s, f = new ya()), tt.NODE_ENV !== "production" ? f.track({
      target: t,
      type: o,
      key: s
    }) : f.track();
  }
}
function nr(t, o, s, d, f, m) {
  const b = po.get(t);
  if (!b) {
    Rn++;
    return;
  }
  let w = [];
  if (o === "clear")
    w = [...b.values()];
  else {
    const S = Tr(t), C = S && go(s);
    if (S && s === "length") {
      const E = Number(d);
      b.forEach((D, N) => {
        (N === "length" || N === Kr || !Xr(N) && N >= E) && w.push(D);
      });
    } else {
      const E = (D) => D && w.push(D);
      switch (s !== void 0 && E(b.get(s)), C && E(b.get(Kr)), o) {
        case "add":
          S ? C && E(b.get("length")) : (E(b.get(vr)), Vr(t) && E(b.get(vo)));
          break;
        case "delete":
          S || (E(b.get(vr)), Vr(t) && E(b.get(vo)));
          break;
        case "set":
          Vr(t) && E(b.get(vr));
          break;
      }
    }
  }
  yo();
  for (const S of w)
    tt.NODE_ENV !== "production" ? S.trigger({
      target: t,
      type: o,
      key: s,
      newValue: d,
      oldValue: f,
      oldTarget: m
    }) : S.trigger();
  Eo();
}
function Pr(t) {
  const o = ye(t);
  return o === t ? o : (vt(o, "iterate", Kr), or(t) ? o : o.map(ht));
}
function Po(t) {
  return vt(t = ye(t), "iterate", Kr), t;
}
const vc = {
  __proto__: null,
  [Symbol.iterator]() {
    return so(this, Symbol.iterator, ht);
  },
  concat(...t) {
    return Pr(this).concat(
      ...t.map((o) => Tr(o) ? Pr(o) : o)
    );
  },
  entries() {
    return so(this, "entries", (t) => (t[1] = ht(t[1]), t));
  },
  every(t, o) {
    return Bt(this, "every", t, o, void 0, arguments);
  },
  filter(t, o) {
    return Bt(this, "filter", t, o, (s) => s.map(ht), arguments);
  },
  find(t, o) {
    return Bt(this, "find", t, o, ht, arguments);
  },
  findIndex(t, o) {
    return Bt(this, "findIndex", t, o, void 0, arguments);
  },
  findLast(t, o) {
    return Bt(this, "findLast", t, o, ht, arguments);
  },
  findLastIndex(t, o) {
    return Bt(this, "findLastIndex", t, o, void 0, arguments);
  },
  // flat, flatMap could benefit from ARRAY_ITERATE but are not straight-forward to implement
  forEach(t, o) {
    return Bt(this, "forEach", t, o, void 0, arguments);
  },
  includes(...t) {
    return co(this, "includes", t);
  },
  indexOf(...t) {
    return co(this, "indexOf", t);
  },
  join(t) {
    return Pr(this).join(t);
  },
  // keys() iterator only reads `length`, no optimisation required
  lastIndexOf(...t) {
    return co(this, "lastIndexOf", t);
  },
  map(t, o) {
    return Bt(this, "map", t, o, void 0, arguments);
  },
  pop() {
    return Hr(this, "pop");
  },
  push(...t) {
    return Hr(this, "push", t);
  },
  reduce(t, ...o) {
    return Xi(this, "reduce", t, o);
  },
  reduceRight(t, ...o) {
    return Xi(this, "reduceRight", t, o);
  },
  shift() {
    return Hr(this, "shift");
  },
  // slice could use ARRAY_ITERATE but also seems to beg for range tracking
  some(t, o) {
    return Bt(this, "some", t, o, void 0, arguments);
  },
  splice(...t) {
    return Hr(this, "splice", t);
  },
  toReversed() {
    return Pr(this).toReversed();
  },
  toSorted(t) {
    return Pr(this).toSorted(t);
  },
  toSpliced(...t) {
    return Pr(this).toSpliced(...t);
  },
  unshift(...t) {
    return Hr(this, "unshift", t);
  },
  values() {
    return so(this, "values", ht);
  }
};
function so(t, o, s) {
  const d = Po(t), f = d[o]();
  return d !== t && !or(t) && (f._next = f.next, f.next = () => {
    const m = f._next();
    return m.value && (m.value = s(m.value)), m;
  }), f;
}
const wc = Array.prototype;
function Bt(t, o, s, d, f, m) {
  const b = Po(t), w = b !== t && !or(t), S = b[o];
  if (S !== wc[o]) {
    const D = S.apply(t, m);
    return w ? ht(D) : D;
  }
  let C = s;
  b !== t && (w ? C = function(D, N) {
    return s.call(this, ht(D), N, t);
  } : s.length > 2 && (C = function(D, N) {
    return s.call(this, D, N, t);
  }));
  const E = S.call(b, C, d);
  return w && f ? f(E) : E;
}
function Xi(t, o, s, d) {
  const f = Po(t);
  let m = s;
  return f !== t && (or(t) ? s.length > 3 && (m = function(b, w, S) {
    return s.call(this, b, w, S, t);
  }) : m = function(b, w, S) {
    return s.call(this, b, ht(w), S, t);
  }), f[o](m, ...d);
}
function co(t, o, s) {
  const d = ye(t);
  vt(d, "iterate", Kr);
  const f = d[o](...s);
  return (f === -1 || f === !1) && Wc(s[0]) ? (s[0] = ye(s[0]), d[o](...s)) : f;
}
function Hr(t, o, s = []) {
  hc(), yo();
  const d = ye(t)[o].apply(t, s);
  return Eo(), pc(), d;
}
const mc = /* @__PURE__ */ oc("__proto__,__v_isRef,__isVue"), ba = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((t) => t !== "arguments" && t !== "caller").map((t) => Symbol[t]).filter(Xr)
);
function gc(t) {
  Xr(t) || (t = String(t));
  const o = ye(this);
  return vt(o, "has", t), o.hasOwnProperty(t);
}
class Pa {
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
      return d === (f ? m ? _c : xa : m ? Dc : Sa).get(o) || // receiver is not the reactive proxy, but has the same prototype
      // this means the receiver is a user proxy of the reactive proxy
      Object.getPrototypeOf(o) === Object.getPrototypeOf(d) ? o : void 0;
    const b = Tr(o);
    if (!f) {
      let S;
      if (b && (S = vc[s]))
        return S;
      if (s === "hasOwnProperty")
        return gc;
    }
    const w = Reflect.get(
      o,
      s,
      // if this is a proxy wrapping a ref, return methods using the raw ref
      // as receiver so that we don't have to call `toRaw` on the ref in all
      // its class methods
      Sr(o) ? o : d
    );
    return (Xr(s) ? ba.has(s) : mc(s)) || (f || vt(o, "get", s), m) ? w : Sr(w) ? b && go(s) ? w : w.value : Tn(w) ? f ? Ia(w) : Oa(w) : w;
  }
}
class yc extends Pa {
  constructor(o = !1) {
    super(!1, o);
  }
  set(o, s, d, f) {
    let m = o[s];
    if (!this._isShallow) {
      const S = Or(m);
      if (!or(d) && !Or(d) && (m = ye(m), d = ye(d)), !Tr(o) && Sr(m) && !Sr(d))
        return S ? !1 : (m.value = d, !0);
    }
    const b = Tr(o) && go(s) ? Number(s) < o.length : lo(o, s), w = Reflect.set(
      o,
      s,
      d,
      Sr(o) ? o : f
    );
    return o === ye(f) && (b ? Ir(d, m) && nr(o, "set", s, d, m) : nr(o, "add", s, d)), w;
  }
  deleteProperty(o, s) {
    const d = lo(o, s), f = o[s], m = Reflect.deleteProperty(o, s);
    return m && d && nr(o, "delete", s, void 0, f), m;
  }
  has(o, s) {
    const d = Reflect.has(o, s);
    return (!Xr(s) || !ba.has(s)) && vt(o, "has", s), d;
  }
  ownKeys(o) {
    return vt(
      o,
      "iterate",
      Tr(o) ? "length" : vr
    ), Reflect.ownKeys(o);
  }
}
class Ec extends Pa {
  constructor(o = !1) {
    super(!0, o);
  }
  set(o, s) {
    return tt.NODE_ENV !== "production" && xr(
      `Set operation on key "${String(s)}" failed: target is readonly.`,
      o
    ), !0;
  }
  deleteProperty(o, s) {
    return tt.NODE_ENV !== "production" && xr(
      `Delete operation on key "${String(s)}" failed: target is readonly.`,
      o
    ), !0;
  }
}
const bc = /* @__PURE__ */ new yc(), Pc = /* @__PURE__ */ new Ec(), Ro = (t) => t, Sn = (t) => Reflect.getPrototypeOf(t);
function gn(t, o, s = !1, d = !1) {
  t = t.__v_raw;
  const f = ye(t), m = ye(o);
  s || (Ir(o, m) && vt(f, "get", o), vt(f, "get", m));
  const { has: b } = Sn(f), w = d ? Ro : s ? To : ht;
  if (b.call(f, o))
    return w(t.get(o));
  if (b.call(f, m))
    return w(t.get(m));
  t !== f && t.get(o);
}
function yn(t, o = !1) {
  const s = this.__v_raw, d = ye(s), f = ye(t);
  return o || (Ir(t, f) && vt(d, "has", t), vt(d, "has", f)), t === f ? s.has(t) : s.has(t) || s.has(f);
}
function En(t, o = !1) {
  return t = t.__v_raw, !o && vt(ye(t), "iterate", vr), Reflect.get(t, "size", t);
}
function Qi(t, o = !1) {
  !o && !or(t) && !Or(t) && (t = ye(t));
  const s = ye(this);
  return Sn(s).has.call(s, t) || (s.add(t), nr(s, "add", t, t)), this;
}
function ki(t, o, s = !1) {
  !s && !or(o) && !Or(o) && (o = ye(o));
  const d = ye(this), { has: f, get: m } = Sn(d);
  let b = f.call(d, t);
  b ? tt.NODE_ENV !== "production" && Ta(d, f, t) : (t = ye(t), b = f.call(d, t));
  const w = m.call(d, t);
  return d.set(t, o), b ? Ir(o, w) && nr(d, "set", t, o, w) : nr(d, "add", t, o), this;
}
function ea(t) {
  const o = ye(this), { has: s, get: d } = Sn(o);
  let f = s.call(o, t);
  f ? tt.NODE_ENV !== "production" && Ta(o, s, t) : (t = ye(t), f = s.call(o, t));
  const m = d ? d.call(o, t) : void 0, b = o.delete(t);
  return f && nr(o, "delete", t, void 0, m), b;
}
function ta() {
  const t = ye(this), o = t.size !== 0, s = tt.NODE_ENV !== "production" ? Vr(t) ? new Map(t) : new Set(t) : void 0, d = t.clear();
  return o && nr(t, "clear", void 0, void 0, s), d;
}
function bn(t, o) {
  return function(d, f) {
    const m = this, b = m.__v_raw, w = ye(b), S = o ? Ro : t ? To : ht;
    return !t && vt(w, "iterate", vr), b.forEach((C, E) => d.call(f, S(C), S(E), m));
  };
}
function Pn(t, o, s) {
  return function(...d) {
    const f = this.__v_raw, m = ye(f), b = Vr(m), w = t === "entries" || t === Symbol.iterator && b, S = t === "keys" && b, C = f[t](...d), E = s ? Ro : o ? To : ht;
    return !o && vt(
      m,
      "iterate",
      S ? vo : vr
    ), {
      // iterator protocol
      next() {
        const { value: D, done: N } = C.next();
        return N ? { value: D, done: N } : {
          value: w ? [E(D[0]), E(D[1])] : E(D),
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
      xr(
        `${uc(t)} operation ${s}failed: target is readonly.`,
        ye(this)
      );
    }
    return t === "delete" ? !1 : t === "clear" ? void 0 : this;
  };
}
function Rc() {
  const t = {
    get(m) {
      return gn(this, m);
    },
    get size() {
      return En(this);
    },
    has: yn,
    add: Qi,
    set: ki,
    delete: ea,
    clear: ta,
    forEach: bn(!1, !1)
  }, o = {
    get(m) {
      return gn(this, m, !1, !0);
    },
    get size() {
      return En(this);
    },
    has: yn,
    add(m) {
      return Qi.call(this, m, !0);
    },
    set(m, b) {
      return ki.call(this, m, b, !0);
    },
    delete: ea,
    clear: ta,
    forEach: bn(!1, !0)
  }, s = {
    get(m) {
      return gn(this, m, !0);
    },
    get size() {
      return En(this, !0);
    },
    has(m) {
      return yn.call(this, m, !0);
    },
    add: tr("add"),
    set: tr("set"),
    delete: tr("delete"),
    clear: tr("clear"),
    forEach: bn(!0, !1)
  }, d = {
    get(m) {
      return gn(this, m, !0, !0);
    },
    get size() {
      return En(this, !0);
    },
    has(m) {
      return yn.call(this, m, !0);
    },
    add: tr("add"),
    set: tr("set"),
    delete: tr("delete"),
    clear: tr("clear"),
    forEach: bn(!0, !0)
  };
  return [
    "keys",
    "values",
    "entries",
    Symbol.iterator
  ].forEach((m) => {
    t[m] = Pn(m, !1, !1), s[m] = Pn(m, !0, !1), o[m] = Pn(m, !1, !0), d[m] = Pn(
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
  Tc,
  Sc,
  xc,
  Oc
] = /* @__PURE__ */ Rc();
function Ra(t, o) {
  const s = o ? t ? Oc : xc : t ? Sc : Tc;
  return (d, f, m) => f === "__v_isReactive" ? !t : f === "__v_isReadonly" ? t : f === "__v_raw" ? d : Reflect.get(
    lo(s, f) && f in d ? s : d,
    f,
    m
  );
}
const Ic = {
  get: /* @__PURE__ */ Ra(!1, !1)
}, Cc = {
  get: /* @__PURE__ */ Ra(!0, !1)
};
function Ta(t, o, s) {
  const d = ye(s);
  if (d !== s && o.call(t, d)) {
    const f = pa(t);
    xr(
      `Reactive ${f} contains both the raw and reactive versions of the same object${f === "Map" ? " as keys" : ""}, which can lead to inconsistencies. Avoid differentiating between the raw and reactive versions of an object and only use the reactive version if possible.`
    );
  }
}
const Sa = /* @__PURE__ */ new WeakMap(), Dc = /* @__PURE__ */ new WeakMap(), xa = /* @__PURE__ */ new WeakMap(), _c = /* @__PURE__ */ new WeakMap();
function Nc(t) {
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
function Ac(t) {
  return t.__v_skip || !Object.isExtensible(t) ? 0 : Nc(pa(t));
}
function Oa(t) {
  return Or(t) ? t : Ca(
    t,
    !1,
    bc,
    Ic,
    Sa
  );
}
function Ia(t) {
  return Ca(
    t,
    !0,
    Pc,
    Cc,
    xa
  );
}
function Ca(t, o, s, d, f) {
  if (!Tn(t))
    return tt.NODE_ENV !== "production" && xr(
      `value cannot be made ${o ? "readonly" : "reactive"}: ${String(
        t
      )}`
    ), t;
  if (t.__v_raw && !(o && t.__v_isReactive))
    return t;
  const m = f.get(t);
  if (m)
    return m;
  const b = Ac(t);
  if (b === 0)
    return t;
  const w = new Proxy(
    t,
    b === 2 ? d : s
  );
  return f.set(t, w), w;
}
function Or(t) {
  return !!(t && t.__v_isReadonly);
}
function or(t) {
  return !!(t && t.__v_isShallow);
}
function Wc(t) {
  return t ? !!t.__v_raw : !1;
}
function ye(t) {
  const o = t && t.__v_raw;
  return o ? ye(o) : t;
}
const ht = (t) => Tn(t) ? Oa(t) : t, To = (t) => Tn(t) ? Ia(t) : t;
function Sr(t) {
  return t ? t.__v_isRef === !0 : !1;
}
function qt(t) {
  return Mc(t, !1);
}
function Mc(t, o) {
  return Sr(t) ? t : new Fc(t, o);
}
class Fc {
  constructor(o, s) {
    this.dep = new ya(), this.__v_isRef = !0, this.__v_isShallow = !1, this._rawValue = s ? o : ye(o), this._value = s ? o : ht(o), this.__v_isShallow = s;
  }
  get value() {
    return tt.NODE_ENV !== "production" ? this.dep.track({
      target: this,
      type: "get",
      key: "value"
    }) : this.dep.track(), this._value;
  }
  set value(o) {
    const s = this._rawValue, d = this.__v_isShallow || or(o) || Or(o);
    o = d ? o : ye(o), Ir(o, s) && (this._rawValue = o, this._value = d ? o : ht(o), tt.NODE_ENV !== "production" ? this.dep.trigger({
      target: this,
      type: "set",
      key: "value",
      newValue: o,
      oldValue: s
    }) : this.dep.trigger());
  }
}
const Lc = /"(?:_|\\u0{2}5[Ff]){2}(?:p|\\u0{2}70)(?:r|\\u0{2}72)(?:o|\\u0{2}6[Ff])(?:t|\\u0{2}74)(?:o|\\u0{2}6[Ff])(?:_|\\u0{2}5[Ff]){2}"\s*:/, zc = /"(?:c|\\u0063)(?:o|\\u006[Ff])(?:n|\\u006[Ee])(?:s|\\u0073)(?:t|\\u0074)(?:r|\\u0072)(?:u|\\u0075)(?:c|\\u0063)(?:t|\\u0074)(?:o|\\u006[Ff])(?:r|\\u0072)"\s*:/, Uc = /^\s*["[{]|^\s*-?\d{1,16}(\.\d{1,17})?([Ee][+-]?\d+)?\s*$/;
function Bc(t, o) {
  if (t === "__proto__" || t === "constructor" && o && typeof o == "object" && "prototype" in o) {
    jc(t);
    return;
  }
  return o;
}
function jc(t) {
  console.warn(`[destr] Dropping "${t}" key to prevent prototype pollution.`);
}
function Da(t, o = {}) {
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
  if (!Uc.test(t)) {
    if (o.strict)
      throw new SyntaxError("[destr] Invalid JSON");
    return t;
  }
  try {
    if (Lc.test(t) || zc.test(t)) {
      if (o.strict)
        throw new Error("[destr] Possible prototype pollution");
      return JSON.parse(t, Bc);
    }
    return JSON.parse(t);
  } catch (d) {
    if (o.strict)
      throw d;
    return t;
  }
}
function qc() {
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
async function $c(t) {
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
var Hc = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, _a = { exports: {} };
(function(t, o) {
  (function(s, d) {
    t.exports = d();
  })(typeof self < "u" ? self : Hc, function() {
    return function(s) {
      var d = {};
      function f(m) {
        if (d[m]) return d[m].exports;
        var b = d[m] = {
          i: m,
          l: !1,
          exports: {}
        };
        return s[m].call(b.exports, b, b.exports, f), b.l = !0, b.exports;
      }
      return f.m = s, f.c = d, f.d = function(m, b, w) {
        f.o(m, b) || Object.defineProperty(m, b, {
          enumerable: !0,
          get: w
        });
      }, f.r = function(m) {
        typeof Symbol < "u" && Symbol.toStringTag && Object.defineProperty(m, Symbol.toStringTag, {
          value: "Module"
        }), Object.defineProperty(m, "__esModule", {
          value: !0
        });
      }, f.t = function(m, b) {
        if (1 & b && (m = f(m)), 8 & b || 4 & b && typeof m == "object" && m && m.__esModule) return m;
        var w = /* @__PURE__ */ Object.create(null);
        if (f.r(w), Object.defineProperty(w, "default", {
          enumerable: !0,
          value: m
        }), 2 & b && typeof m != "string") for (var S in m) f.d(w, S, (function(C) {
          return m[C];
        }).bind(null, S));
        return w;
      }, f.n = function(m) {
        var b = m && m.__esModule ? function() {
          return m.default;
        } : function() {
          return m;
        };
        return f.d(b, "a", b), b;
      }, f.o = function(m, b) {
        return {}.hasOwnProperty.call(m, b);
      }, f.p = "", f(f.s = 0);
    }([function(s, d, f) {
      f.r(d), f.d(d, "PopupOpenError", function() {
        return zn;
      }), f.d(d, "create", function() {
        return us;
      }), f.d(d, "destroy", function() {
        return ds;
      }), f.d(d, "destroyComponents", function() {
        return Ci;
      }), f.d(d, "destroyAll", function() {
        return Di;
      }), f.d(d, "PROP_TYPE", function() {
        return be;
      }), f.d(d, "PROP_SERIALIZATION", function() {
        return pn;
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
      function b(e, r) {
        e.prototype = Object.create(r.prototype), e.prototype.constructor = e, m(e, r);
      }
      function w() {
        return (w = Object.assign || function(e) {
          for (var r = 1; r < arguments.length; r++) {
            var n = arguments[r];
            for (var i in n) ({}).hasOwnProperty.call(n, i) && (e[i] = n[i]);
          }
          return e;
        }).apply(this, arguments);
      }
      function S(e) {
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
      var C = [], E = [], D = 0, N;
      function se() {
        if (!D && N) {
          var e = N;
          N = null, e.resolve();
        }
      }
      function ce() {
        D += 1;
      }
      function Ge() {
        D -= 1, se();
      }
      var p = function() {
        function e(n) {
          var i = this;
          if (this.resolved = void 0, this.rejected = void 0, this.errorHandled = void 0, this.value = void 0, this.error = void 0, this.handlers = void 0, this.dispatching = void 0, this.stack = void 0, this.resolved = !1, this.rejected = !1, this.errorHandled = !1, this.handlers = [], n) {
            var a, c, u = !1, h = !1, l = !1;
            ce();
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
          if (S(n)) throw new Error("Can not resolve promise with another promise");
          return this.resolved = !0, this.value = n, this.dispatch(), this;
        }, r.reject = function(n) {
          var i = this;
          if (this.resolved || this.rejected) return this;
          if (S(n)) throw new Error("Can not reject promise with another promise");
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
                for (var h = 0; h < E.length; h++) E[h](c, u);
              }
            }(n, i);
          }, 1), this.dispatch(), this;
        }, r.asyncReject = function(n) {
          return this.errorHandled = !0, this.reject(n), this;
        }, r.dispatch = function() {
          var n = this.resolved, i = this.rejected, a = this.handlers;
          if (!this.dispatching && (n || i)) {
            this.dispatching = !0, ce();
            for (var c = function(P, T) {
              return P.then(function(x) {
                T.resolve(x);
              }, function(x) {
                T.reject(x);
              });
            }, u = 0; u < a.length; u++) {
              var h = a[u], l = h.onSuccess, g = h.onError, R = h.promise, y = void 0;
              if (n) try {
                y = l ? l(this.value) : this.value;
              } catch (P) {
                R.reject(P);
                continue;
              }
              else if (i) {
                if (!g) {
                  R.reject(this.error);
                  continue;
                }
                try {
                  y = g(this.error);
                } catch (P) {
                  R.reject(P);
                  continue;
                }
              }
              if (y instanceof e && (y.resolved || y.rejected)) {
                var v = y;
                v.resolved ? R.resolve(v.value) : R.reject(v.error), v.errorHandled = !0;
              } else S(y) ? y instanceof e && (y.resolved || y.rejected) ? y.resolved ? R.resolve(y.value) : R.reject(y.error) : c(y, R) : R.resolve(y);
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
          return n instanceof e ? n : S(n) ? new e(function(i, a) {
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
          for (var u = function(g, R, y) {
            return R.then(function(v) {
              c[g] = v, (a -= 1) == 0 && i.resolve(c);
            }, function(v) {
              y.reject(v);
            });
          }, h = 0; h < n.length; h++) {
            var l = n[h];
            if (l instanceof e) {
              if (l.resolved) {
                c[h] = l.value, a -= 1;
                continue;
              }
            } else if (!S(l)) {
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
              S(l) ? a.push(l.then(function(g) {
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
            return E.push(i), {
              cancel: function() {
                E.splice(E.indexOf(i), 1);
              }
            };
          }(n);
        }, e.try = function(n, i, a) {
          if (n && typeof n != "function" && !n.call) throw new Error("Promise.try expected a function");
          var c;
          ce();
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
          return !!(n && n instanceof e) || S(n);
        }, e.flush = function() {
          return function(n) {
            var i = N = N || new n();
            return se(), i;
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
      function ae(e) {
        e === void 0 && (e = window);
        var r = Pe(e);
        return r && e.mockDomain && e.mockDomain.indexOf("mock:") === 0 ? e.mockDomain : r;
      }
      function L(e) {
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
          if (e === window || Fe(e) && Z() || ae(window) === ae(e)) return !0;
        } catch {
        }
        return !1;
      }
      function B(e) {
        if (!L(e)) throw new Error("Expected window to be same domain");
        return e;
      }
      function X(e, r) {
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
      function Re(e) {
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
        for (var r = [], n = 0, i = Re(e); n < i.length; n++) {
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
          if (X(window, e) && window.top) return window.top;
        } catch {
        }
        try {
          if (X(e, window) && window.top) return window.top;
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
      function Le(e, r) {
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
        if (r && L(e)) try {
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
      function xn(e) {
        return (e = e || window).navigator.mockUserAgent || e.navigator.userAgent;
      }
      function $t(e, r) {
        for (var n = Re(e), i = 0; i < n.length; i++) {
          var a = n[i];
          try {
            if (L(a) && a.name === r && n.indexOf(a) !== -1) return a;
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
      function Qr(e, r) {
        return e === Ae(r);
      }
      function Ht(e) {
        return e === void 0 && (e = window), Ae(e = e || window) || ve(e) || void 0;
      }
      function Cr(e, r) {
        for (var n = 0; n < e.length; n++)
          for (var i = e[n], a = 0; a < r.length; a++) if (i === r[a]) return !0;
        return !1;
      }
      function Dr(e) {
        e === void 0 && (e = window);
        for (var r = 0, n = e; n; ) (n = ve(n)) && (r += 1);
        return r;
      }
      function ir(e, r) {
        var n = Oe(e) || e, i = Oe(r) || r;
        try {
          if (n && i) return n === i;
        } catch {
        }
        var a = Je(e), c = Je(r);
        if (Cr(a, c)) return !0;
        var u = Ae(n), h = Ae(i);
        return u && Cr(Je(u), c) || h && Cr(Je(h), a), !1;
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
        return e.match(/^(https?|mock|file):\/\//) ? e.split("/").slice(0, 3).join("/") : ae();
      }
      function xo(e, r, n, i) {
        n === void 0 && (n = 1e3), i === void 0 && (i = 1 / 0);
        var a;
        return function c() {
          if (Le(e))
            return a && clearTimeout(a), r();
          i <= 0 ? clearTimeout(a) : (i -= n, a = setTimeout(c, n));
        }(), {
          cancel: function() {
            a && clearTimeout(a);
          }
        };
      }
      function ar(e) {
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
      function On(e) {
        if (r = Wt(e), r.indexOf("mock:") !== 0) return e;
        var r;
        throw new Error("Mock urls not supported out of test mode");
      }
      function Oo(e) {
        if (L(e)) return B(e).frameElement;
        for (var r = 0, n = document.querySelectorAll("iframe"); r < n.length; r++) {
          var i = n[r];
          if (i && i.contentWindow && i.contentWindow === e) return i;
        }
      }
      function Io(e) {
        if (function(n) {
          return n === void 0 && (n = window), !!ve(n);
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
      function kr(e, r) {
        for (var n = 0; n < e.length; n++) try {
          if (e[n] === r) return n;
        } catch {
        }
        return -1;
      }
      var en = function() {
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
            if (ar(c) && Le(c)) {
              if (n) try {
                n.delete(c);
              } catch {
              }
              i.splice(a, 1), this.values.splice(a, 1), a -= 1;
            }
          }
        }, r.isSafeToReadWrite = function(n) {
          return !ar(n);
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
          var h = this.keys, l = this.values, g = kr(h, n);
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
          var c = kr(this.keys, n);
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
          var c = this.keys, u = kr(c, n);
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
          return this._cleanupClosedWindows(), kr(this.keys, n) !== -1;
        }, r.getOrSet = function(n, i) {
          if (this.has(n)) return this.get(n);
          var a = i();
          return this.set(n, a), a;
        }, e;
      }();
      function Co(e) {
        return (Co = Object.setPrototypeOf ? Object.getPrototypeOf : function(r) {
          return r.__proto__ || Object.getPrototypeOf(r);
        })(e);
      }
      function Fa() {
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
        return (Do = Fa() ? Reflect.construct : function(i, a, c) {
          var u = [null];
          u.push.apply(u, a);
          var h = new (Function.bind.apply(i, u))();
          return c && m(h, c.prototype), h;
        }).apply(null, arguments);
      }
      function _o(e) {
        var r = typeof Map == "function" ? /* @__PURE__ */ new Map() : void 0;
        return (_o = function(n) {
          if (n === null || (i = n, Function.toString.call(i).indexOf("[native code]") === -1)) return n;
          var i;
          if (typeof n != "function") throw new TypeError("Super expression must either be null or a function");
          if (r !== void 0) {
            if (r.has(n)) return r.get(n);
            r.set(n, a);
          }
          function a() {
            return Do(n, arguments, Co(this).constructor);
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
      function In(e) {
        var r = !1;
        try {
          (e instanceof window.Element || e !== null && typeof e == "object" && e.nodeType === 1 && typeof e.style == "object" && typeof e.ownerDocument == "object") && (r = !0);
        } catch {
        }
        return r;
      }
      function Cn(e) {
        return e.name || e.__name__ || e.displayName || "anonymous";
      }
      function Dn(e, r) {
        try {
          delete e.name, e.name = r;
        } catch {
        }
        return e.__name__ = e.displayName = r, e;
      }
      function _n(e) {
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
        }) + "_" + _n((/* @__PURE__ */ new Date()).toISOString().slice(11, 19).replace("T", ".")).replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
      }
      var tn;
      function Nn(e) {
        try {
          return JSON.stringify([].slice.call(e), function(r, n) {
            return typeof n == "function" ? "memoize[" + function(i) {
              if (tn = tn || new en(), i == null || typeof i != "object" && typeof i != "function") throw new Error("Invalid object");
              var a = tn.get(i);
              return a || (a = typeof i + ":" + st(), tn.set(i, a)), a;
            }(n) + "]" : In(n) ? {} : n;
          });
        } catch {
          throw new Error("Arguments not serializable -- can not be used to memoize");
        }
      }
      function La() {
        return {};
      }
      var _r = 0, No = 0;
      function Vt(e, r) {
        r === void 0 && (r = {});
        var n = r.thisNamespace, i = n !== void 0 && n, a = r.time, c, u, h = _r;
        _r += 1;
        var l = function() {
          for (var g = arguments.length, R = new Array(g), y = 0; y < g; y++) R[y] = arguments[y];
          h < No && (c = null, u = null, h = _r, _r += 1);
          var v;
          v = i ? (u = u || new en()).getOrSet(this, La) : c = c || {};
          var P;
          try {
            P = Nn(R);
          } catch {
            return e.apply(this, arguments);
          }
          var T = v[P];
          if (T && a && Date.now() - T.time < a && (delete v[P], T = null), T) return T.value;
          var x = Date.now(), O = e.apply(this, arguments);
          return v[P] = {
            time: x,
            value: O
          }, O;
        };
        return l.reset = function() {
          c = null, u = null;
        }, Dn(l, (r.name || Cn(e)) + "::memoized");
      }
      Vt.clear = function() {
        No = _r;
      };
      function za(e) {
        var r = {};
        function n() {
          for (var i = arguments, a = this, c = arguments.length, u = new Array(c), h = 0; h < c; h++) u[h] = arguments[h];
          var l = Nn(u);
          return r.hasOwnProperty(l) || (r[l] = p.try(function() {
            return e.apply(a, i);
          }).finally(function() {
            delete r[l];
          })), r[l];
        }
        return n.reset = function() {
          r = {};
        }, Dn(n, Cn(e) + "::promiseMemoized");
      }
      function Ie() {
      }
      function rn(e) {
        var r = !1;
        return Dn(function() {
          if (!r)
            return r = !0, e.apply(this, arguments);
        }, Cn(e) + "::once");
      }
      function wr(e, r) {
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
          return "Error while stringifying error: " + wr(a, r + 1);
        }
      }
      function nn(e) {
        return typeof e == "string" ? e : e && e.toString && typeof e.toString == "function" ? e.toString() : {}.toString.call(e);
      }
      function mr(e, r) {
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
      function Ua(e) {
        return e;
      }
      function Nr(e, r) {
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
      function An(e) {
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
            var i = n();
            return e[r] = i, i;
          },
          set: function(i) {
            delete e[r], e[r] = i;
          }
        });
      }
      function Wn(e) {
        return [].slice.call(e);
      }
      function Wo(e) {
        return typeof (r = e) == "object" && r !== null && {}.toString.call(e) === "[object Object]";
        var r;
      }
      function Mn(e) {
        if (!Wo(e)) return !1;
        var r = e.constructor;
        if (typeof r != "function") return !1;
        var n = r.prototype;
        return !!Wo(n) && !!n.hasOwnProperty("isPrototypeOf");
      }
      function on(e, r, n) {
        if (n === void 0 && (n = ""), Array.isArray(e)) {
          for (var i = e.length, a = [], c = function(R) {
            Ao(a, R, function() {
              var y = n ? n + "." + R : "" + R, v = r(e[R], R, y);
              return (Mn(v) || Array.isArray(v)) && (v = on(v, r, y)), v;
            });
          }, u = 0; u < i; u++) c(u);
          return a;
        }
        if (Mn(e)) {
          var h = {}, l = function(R) {
            if (!e.hasOwnProperty(R)) return 1;
            Ao(h, R, function() {
              var y = n ? n + "." + R : "" + R, v = r(e[R], R, y);
              return (Mn(v) || Array.isArray(v)) && (v = on(v, r, y)), v;
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
      function Fn(e) {
        return {}.toString.call(e) === "[object RegExp]";
      }
      function Ar(e, r, n) {
        if (e.hasOwnProperty(r)) return e[r];
        var i = n();
        return e[r] = i, i;
      }
      function an(e) {
        var r = [], n = !1, i, a = {
          set: function(c, u) {
            return n || (e[c] = u, a.register(function() {
              delete e[c];
            })), u;
          },
          register: function(c) {
            var u = rn(function() {
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
            return p.all(u).then(Ie);
          }
        };
        return a;
      }
      function sn(e, r) {
        if (r == null) throw new Error("Expected " + e + " to be present");
        return r;
      }
      var Ba = function(e) {
        b(r, e);
        function r(n) {
          var i;
          return (i = e.call(this, n) || this).name = i.constructor.name, typeof Error.captureStackTrace == "function" ? Error.captureStackTrace(function(a) {
            if (a === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return a;
          }(i), i.constructor) : i.stack = new Error(n).stack, i;
        }
        return r;
      }(_o(Error));
      function Mo() {
        var e = document.body;
        if (!e) throw new Error("Body element not found");
        return e;
      }
      function cn() {
        return !!document.body && document.readyState === "complete";
      }
      function Fo() {
        return !!document.body && document.readyState === "interactive";
      }
      function Lo(e) {
        return encodeURIComponent(e);
      }
      Vt(function() {
        return new p(function(e) {
          if (cn() || Fo()) return e();
          var r = setInterval(function() {
            if (cn() || Fo())
              return clearInterval(r), e();
          }, 10);
        });
      });
      function zo(e) {
        return function(r, n, i) {
          i === void 0 && (i = []);
          var a = r.__inline_memoize_cache__ = r.__inline_memoize_cache__ || {}, c = Nn(i);
          return a.hasOwnProperty(c) ? a[c] : a[c] = (function() {
            var u = {};
            if (!e || e.indexOf("=") === -1) return u;
            for (var h = 0, l = e.split("&"); h < l.length; h++) {
              var g = l[h];
              (g = g.split("="))[0] && g[1] && (u[decodeURIComponent(g[0])] = decodeURIComponent(g[1]));
            }
            return u;
          }).apply(void 0, i);
        }(zo, 0, [e]);
      }
      function Uo(e, r) {
        return r === void 0 && (r = {}), r && Object.keys(r).length ? function(n) {
          return n === void 0 && (n = {}), Object.keys(n).filter(function(i) {
            return typeof n[i] == "string" || typeof n[i] == "boolean";
          }).map(function(i) {
            var a = n[i];
            if (typeof a != "string" && typeof a != "boolean") throw new TypeError("Invalid type for query");
            return Lo(i) + "=" + Lo(a.toString());
          }).join("&");
        }(w({}, zo(e), r)) : e;
      }
      function ja(e, r) {
        e.appendChild(r);
      }
      function Ln(e, r) {
        return r === void 0 && (r = document), In(e) ? e : typeof e == "string" ? r.querySelector(e) : void 0;
      }
      function Bo(e) {
        return new p(function(r, n) {
          var i = nn(e), a = Ln(e);
          if (a) return r(a);
          if (cn()) return n(new Error("Document is ready and element " + i + " does not exist"));
          var c = setInterval(function() {
            if (a = Ln(e))
              r(a), clearInterval(c);
            else if (cn())
              return clearInterval(c), n(new Error("Document is ready and element " + i + " does not exist"));
          }, 10);
        });
      }
      var zn = function(e) {
        b(r, e);
        function r() {
          return e.apply(this, arguments) || this;
        }
        return r;
      }(Ba), un;
      function jo(e) {
        if ((un = un || new en()).has(e)) {
          var r = un.get(e);
          if (r) return r;
        }
        var n = new p(function(i, a) {
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
        return un.set(e, n), n;
      }
      function Un(e) {
        return jo(e).then(function(r) {
          if (!r.contentWindow) throw new Error("Could not find window in iframe");
          return r.contentWindow;
        });
      }
      function qo(e, r) {
        e === void 0 && (e = {});
        var n = e.style || {}, i = function(c, u, h) {
          c === void 0 && (c = "div"), u === void 0 && (u = {}), c = c.toLowerCase();
          var l = document.createElement(c);
          if (u.style && mr(l.style, u.style), u.class && (l.className = u.class.join(" ")), u.id && l.setAttribute("id", u.id), u.attributes) for (var g = 0, R = Object.keys(u.attributes); g < R.length; g++) {
            var y = R[g];
            l.setAttribute(y, u.attributes[y]);
          }
          if (u.styleSheet && function(v, P, T) {
            T === void 0 && (T = window.document), v.styleSheet ? v.styleSheet.cssText = P : v.appendChild(T.createTextNode(P));
          }(l, u.styleSheet), u.html) {
            if (c === "iframe") throw new Error("Iframe html can not be written unless container provided and iframe in DOM");
            l.innerHTML = u.html;
          }
          return l;
        }("iframe", {
          attributes: w({
            allowTransparency: "true"
          }, e.attributes || {}),
          style: w({
            backgroundColor: "transparent",
            border: "none"
          }, n),
          html: e.html,
          class: e.class
        }), a = window.navigator.userAgent.match(/MSIE|Edge/i);
        return i.hasAttribute("id") || i.setAttribute("id", st()), jo(i), (e.url || a) && i.setAttribute("src", e.url || "about:blank"), i;
      }
      function $o(e, r, n) {
        return e.addEventListener(r, n), {
          cancel: function() {
            e.removeEventListener(r, n);
          }
        };
      }
      function qa(e) {
        e.style.setProperty("display", "");
      }
      function Ho(e) {
        e.style.setProperty("display", "none", "important");
      }
      function Wr(e) {
        e && e.parentNode && e.parentNode.removeChild(e);
      }
      function gr(e) {
        return !(e && e.parentNode && e.ownerDocument && e.ownerDocument.documentElement && e.ownerDocument.documentElement.contains(e));
      }
      function Vo(e, r, n) {
        var i = n === void 0 ? {} : n, a = i.width, c = a === void 0 || a, u = i.height, h = u === void 0 || u, l = i.interval, g = l === void 0 ? 100 : l, R = i.win, y = R === void 0 ? window : R, v = e.offsetWidth, P = e.offsetHeight, T = !1;
        r({
          width: v,
          height: P
        });
        var x = function() {
          if (!T && function(M) {
            return !!(M.offsetWidth || M.offsetHeight || M.getClientRects().length);
          }(e)) {
            var z = e.offsetWidth, J = e.offsetHeight;
            (c && z !== v || h && J !== P) && r({
              width: z,
              height: J
            }), v = z, P = J;
          }
        }, O, W;
        return y.addEventListener("resize", x), y.ResizeObserver !== void 0 ? ((O = new y.ResizeObserver(x)).observe(e), W = Nr(x, 10 * g)) : y.MutationObserver !== void 0 ? ((O = new y.MutationObserver(x)).observe(e, {
          attributes: !0,
          childList: !0,
          subtree: !0,
          characterData: !1
        }), W = Nr(x, 10 * g)) : W = Nr(x, g), {
          cancel: function() {
            T = !0, O.disconnect(), window.removeEventListener("resize", x), W.cancel();
          }
        };
      }
      function Bn(e) {
        for (; e.parentNode; ) e = e.parentNode;
        return e.toString() === "[object ShadowRoot]";
      }
      var dn = typeof document < "u" ? document.currentScript : null, $a = Vt(function() {
        if (dn || (dn = function() {
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
        }())) return dn;
        throw new Error("Can not determine current script");
      }), Ha = st();
      Vt(function() {
        var e;
        try {
          e = $a();
        } catch {
          return Ha;
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
      function Go(e) {
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
        return typeof e == "number" ? Jo(e) : Go(e) ? e : Jo(e);
      }
      function Yo(e, r) {
        if (typeof e == "number") return e;
        if (Go(e)) return parseInt(r * jn(e) / 100, 10);
        if (typeof (n = e) == "string" && /^[0-9]+px$/.test(n)) return jn(e);
        var n;
        throw new Error("Can not normalize dimension: " + e);
      }
      function _t(e) {
        e === void 0 && (e = window);
        var r = "__post_robot_11_0_0__";
        return e !== window ? e[r] : e[r] = e[r] || {};
      }
      var Zo = function() {
        return {};
      };
      function we(e, r) {
        return e === void 0 && (e = "store"), r === void 0 && (r = Zo), Ar(_t(), e, function() {
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
      var Va = function() {
      };
      function fn() {
        var e = _t();
        return e.WINDOW_WILDCARD = e.WINDOW_WILDCARD || new Va(), e.WINDOW_WILDCARD;
      }
      function it(e, r) {
        return e === void 0 && (e = "store"), r === void 0 && (r = Zo), we("windowStore").getOrSet(e, function() {
          var n = new en(), i = function(a) {
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
              return Ar(i(a), e, c);
            }
          };
        });
      }
      function Xo() {
        return we("instance").getOrSet("instanceID", st);
      }
      function Qo(e, r) {
        var n = r.domain, i = it("helloPromises"), a = i.get(e);
        a && a.resolve({
          domain: n
        });
        var c = p.resolve({
          domain: n
        });
        return i.set(e, c), c;
      }
      function qn(e, r) {
        return (0, r.send)(e, "postrobot_hello", {
          instanceID: Xo()
        }, {
          domain: "*",
          timeout: -1
        }).then(function(n) {
          var i = n.origin, a = n.data.instanceID;
          return Qo(e, {
            domain: i
          }), {
            win: e,
            domain: i,
            instanceID: a
          };
        });
      }
      function ko(e, r) {
        var n = r.send;
        return it("windowInstanceIDPromises").getOrSet(e, function() {
          return qn(e, {
            send: n
          }).then(function(i) {
            return i.instanceID;
          });
        });
      }
      function ei(e, r, n) {
        r === void 0 && (r = 5e3), n === void 0 && (n = "Window");
        var i = function(a) {
          return it("helloPromises").getOrSet(a, function() {
            return new p();
          });
        }(e);
        return r !== -1 && (i = i.timeout(r, new Error(n + " did not load after " + r + "ms"))), i;
      }
      function ti(e) {
        it("knownWindows").set(e, !0);
      }
      function $n(e) {
        return typeof e == "object" && e !== null && typeof e.__type__ == "string";
      }
      function ri(e) {
        return e === void 0 ? "undefined" : e === null ? "null" : Array.isArray(e) ? "array" : typeof e == "function" ? "function" : typeof e == "object" ? e instanceof Error ? "error" : typeof e.then == "function" ? "promise" : {}.toString.call(e) === "[object RegExp]" ? "regex" : {}.toString.call(e) === "[object Date]" ? "date" : "object" : typeof e == "string" ? "string" : typeof e == "number" ? "number" : typeof e == "boolean" ? "boolean" : void 0;
      }
      function sr(e, r) {
        return {
          __type__: e,
          __val__: r
        };
      }
      var mt, Ga = ((mt = {}).function = function() {
      }, mt.error = function(e) {
        return sr("error", {
          message: e.message,
          stack: e.stack,
          code: e.code,
          data: e.data
        });
      }, mt.promise = function() {
      }, mt.regex = function(e) {
        return sr("regex", e.source);
      }, mt.date = function(e) {
        return sr("date", e.toJSON());
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
        return sr("undefined", e);
      }, mt), Ja = {}, gt, Ka = ((gt = {}).function = function() {
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
      }, gt), Ya = {};
      function Hn() {
        return !!xn(window).match(/MSIE|trident|edge\/12|edge\/13/i);
      }
      function ni(e) {
        return !ir(window, e);
      }
      function oi(e, r) {
        if (e) {
          if (ae() !== Wt(e)) return !0;
        } else if (r && !L(r)) return !0;
        return !1;
      }
      function ii(e) {
        var r = e.win, n = e.domain;
        return !(!Hn() || n && !oi(n, r) || r && !ni(r));
      }
      function Vn(e) {
        return "__postrobot_bridge___" + (e = e || Wt(e)).replace(/[^a-zA-Z0-9]+/g, "_");
      }
      function ai() {
        return !!(window.name && window.name === Vn(ae()));
      }
      var Za = new p(function(e) {
        if (window.document && window.document.body) return e(window.document.body);
        var r = setInterval(function() {
          if (window.document && window.document.body)
            return clearInterval(r), e(window.document.body);
        }, 10);
      });
      function si(e) {
        it("remoteWindowPromises").getOrSet(e, function() {
          return new p();
        });
      }
      function Gn(e) {
        var r = it("remoteWindowPromises").get(e);
        if (!r) throw new Error("Remote window promise not found");
        return r;
      }
      function ci(e, r, n) {
        Gn(e).resolve(function(i, a, c) {
          if (i !== e) throw new Error("Remote window does not match window");
          if (!wt(a, r)) throw new Error("Remote domain " + a + " does not match domain " + r);
          n.fireAndForget(c);
        });
      }
      function Jn(e, r) {
        Gn(e).reject(r).catch(Ie);
      }
      function ln(e) {
        for (var r = e.win, n = e.name, i = e.domain, a = we("popupWindowsByName"), c = it("popupWindowsByWin"), u = 0, h = a.keys(); u < h.length; u++) {
          var l = h[u], g = a.get(l);
          g && !Le(g.win) || a.del(l);
        }
        if (Le(r)) return {
          win: r,
          name: n,
          domain: i
        };
        var R = c.getOrSet(r, function() {
          return n ? a.getOrSet(n, function() {
            return {
              win: r,
              name: n
            };
          }) : {
            win: r
          };
        });
        if (R.win && R.win !== r) throw new Error("Different window already linked for window: " + (n || "undefined"));
        return n && (R.name = n, a.set(n, R)), i && (R.domain = i, si(r)), c.set(r, R), R;
      }
      function ui(e) {
        var r = e.on, n = e.send, i = e.receiveMessage;
        a = window.open, window.open = function(c, u, h, l) {
          var g = a.call(this, On(c), u, h, l);
          return g && (ln({
            win: g,
            name: u,
            domain: c ? Wt(c) : null
          }), g);
        };
        var a;
        (function(c) {
          var u = c.on, h = c.send, l = c.receiveMessage, g = we("popupWindowsByName");
          u("postrobot_open_tunnel", function(R) {
            var y = R.source, v = R.origin, P = R.data, T = we("bridges").get(v);
            if (!T) throw new Error("Can not find bridge promise for domain " + v);
            return T.then(function(x) {
              if (y !== x) throw new Error("Message source does not matched registered bridge for domain " + v);
              if (!P.name) throw new Error("Register window expected to be passed window name");
              if (!P.sendMessage) throw new Error("Register window expected to be passed sendMessage method");
              if (!g.has(P.name)) throw new Error("Window with name " + P.name + " does not exist, or was not opened by this window");
              var O = function() {
                return g.get(P.name);
              };
              if (!O().domain) throw new Error("We do not have a registered domain for window " + P.name);
              if (O().domain !== v) throw new Error("Message origin " + v + " does not matched registered window origin " + (O().domain || "unknown"));
              return ci(O().win, v, P.sendMessage), {
                sendMessage: function(W) {
                  if (window && !window.closed && O()) {
                    var z = O().domain;
                    if (z) try {
                      l({
                        data: W,
                        origin: z,
                        source: O().win
                      }, {
                        on: u,
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
        }), function(c) {
          var u = c.send;
          _t(window).openTunnelToParent = function(h) {
            var l = h.name, g = h.source, R = h.canary, y = h.sendMessage, v = we("tunnelWindows"), P = ve(window);
            if (!P) throw new Error("No parent window found to open tunnel to");
            var T = function(x) {
              var O = x.name, W = x.source, z = x.canary, J = x.sendMessage;
              (function() {
                for (var V = we("tunnelWindows"), U = 0, re = V.keys(); U < re.length; U++) {
                  var H = re[U];
                  Le(V[H].source) && V.del(H);
                }
              })();
              var M = st();
              return we("tunnelWindows").set(M, {
                name: O,
                source: W,
                canary: z,
                sendMessage: J
              }), M;
            }({
              name: l,
              source: g,
              canary: R,
              sendMessage: y
            });
            return u(P, "postrobot_open_tunnel", {
              name: l,
              sendMessage: function() {
                var x = v.get(T);
                if (x && x.source && !Le(x.source)) {
                  try {
                    x.canary();
                  } catch {
                    return;
                  }
                  x.sendMessage.apply(this, arguments);
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
          p.try(function() {
            var g = Ae(window);
            if (g && ii({
              win: g
            })) {
              return si(g), (R = g, it("remoteBridgeAwaiters").getOrSet(R, function() {
                return p.try(function() {
                  var y = $t(R, Vn(ae()));
                  if (y) return L(y) && _t(B(y)) ? y : new p(function(v) {
                    var P, T;
                    P = setInterval(function() {
                      if (y && L(y) && _t(B(y)))
                        return clearInterval(P), clearTimeout(T), v(y);
                    }, 100), T = setTimeout(function() {
                      return clearInterval(P), v();
                    }, 2e3);
                  });
                });
              })).then(function(y) {
                return y ? window.name ? _t(B(y)).openTunnelToParent({
                  name: window.name,
                  source: window,
                  canary: function() {
                  },
                  sendMessage: function(v) {
                    try {
                    } catch {
                      return;
                    }
                    if (window && !window.closed) try {
                      l({
                        data: v,
                        origin: this.origin,
                        source: this.source
                      }, {
                        on: u,
                        send: h
                      });
                    } catch (P) {
                      p.reject(P);
                    }
                  }
                }).then(function(v) {
                  var P = v.source, T = v.origin, x = v.data;
                  if (P !== g) throw new Error("Source does not match opener");
                  ci(P, T, x.sendMessage);
                }).catch(function(v) {
                  throw Jn(g, v), v;
                }) : Jn(g, new Error("Can not register with opener: window does not have a name")) : Jn(g, new Error("Can not register with opener: no bridge found in opener"));
              });
              var R;
            }
          });
        }({
          on: r,
          send: n,
          receiveMessage: i
        });
      }
      function Kn() {
        for (var e = we("idToProxyWindow"), r = 0, n = e.keys(); r < n.length; r++) {
          var i = n[r];
          e.get(i).shouldClean() && e.del(i);
        }
      }
      function di(e, r) {
        var n = r.send, i = r.id, a = i === void 0 ? st() : i, c = e.then(function(l) {
          if (L(l)) return B(l).name;
        }), u = e.then(function(l) {
          if (Le(l)) throw new Error("Window is closed, can not determine type");
          return Ae(l) ? q.POPUP : q.IFRAME;
        });
        c.catch(Ie), u.catch(Ie);
        var h = function() {
          return e.then(function(l) {
            if (!Le(l)) return L(l) ? B(l).name : c;
          });
        };
        return {
          id: a,
          getType: function() {
            return u;
          },
          getInstanceID: za(function() {
            return e.then(function(l) {
              return ko(l, {
                send: n
              });
            });
          }),
          close: function() {
            return e.then(Io);
          },
          getName: h,
          focus: function() {
            return e.then(function(l) {
              l.focus();
            });
          },
          isClosed: function() {
            return e.then(function(l) {
              return Le(l);
            });
          },
          setLocation: function(l, g) {
            return g === void 0 && (g = {}), e.then(function(R) {
              var y = window.location.protocol + "//" + window.location.host, v = g.method, P = v === void 0 ? "get" : v, T = g.body;
              if (l.indexOf("/") === 0) l = "" + y + l;
              else if (!l.match(/^https?:\/\//) && l.indexOf(y) !== 0) throw new Error("Expected url to be http or https url, or absolute path, got " + JSON.stringify(l));
              if (P === "post") return h().then(function(x) {
                if (!x) throw new Error("Can not post to window without target name");
                (function(O) {
                  var W = O.url, z = O.target, J = O.body, M = O.method, V = M === void 0 ? "post" : M, U = document.createElement("form");
                  if (U.setAttribute("target", z), U.setAttribute("method", V), U.setAttribute("action", W), U.style.display = "none", J) for (var re = 0, H = Object.keys(J); re < H.length; re++) {
                    var he, ue = H[re], Q = document.createElement("input");
                    Q.setAttribute("name", ue), Q.setAttribute("value", (he = J[ue]) == null ? void 0 : he.toString()), U.appendChild(Q);
                  }
                  Mo().appendChild(U), U.submit(), Mo().removeChild(U);
                })({
                  url: l,
                  target: x,
                  method: P,
                  body: T
                });
              });
              if (P !== "get") throw new Error("Unsupported method: " + P);
              if (L(R)) try {
                if (R.location && typeof R.location.replace == "function") {
                  R.location.replace(l);
                  return;
                }
              } catch {
              }
              R.location = l;
            });
          },
          setName: function(l) {
            return e.then(function(g) {
              ln({
                win: g,
                name: l
              });
              var R = L(g), y = Oo(g);
              if (!R) throw new Error("Can not set name for cross-domain window: " + l);
              B(g).name = l, y && y.setAttribute("name", l), c = p.resolve(l);
            });
          }
        };
      }
      var yt = function() {
        function e(n) {
          var i = n.send, a = n.win, c = n.serializedWindow;
          this.id = void 0, this.isProxyWindow = !0, this.serializedWindow = void 0, this.actualWindow = void 0, this.actualWindowPromise = void 0, this.send = void 0, this.name = void 0, this.actualWindowPromise = new p(), this.serializedWindow = c || di(this.actualWindowPromise, {
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
          var n = this, i = this.isPopup(), a = this.getName(), c = p.hash({
            isPopup: i,
            name: a
          }).then(function(h) {
            var l = h.name;
            h.isPopup && l && window.open("", l, "noopener");
          }), u = this.serializedWindow.focus();
          return p.all([c, u]).then(function() {
            return n;
          });
        }, r.isClosed = function() {
          return this.serializedWindow.isClosed();
        }, r.getWindow = function() {
          return this.actualWindow;
        }, r.setWindow = function(n, i) {
          var a = i.send;
          this.actualWindow = n, this.actualWindowPromise.resolve(this.actualWindow), this.serializedWindow = di(this.actualWindowPromise, {
            send: a,
            id: this.getID()
          }), it("winToProxyWindow").set(n, this);
        }, r.awaitWindow = function() {
          return this.actualWindowPromise;
        }, r.matchWindow = function(n, i) {
          var a = this, c = i.send;
          return p.try(function() {
            return a.actualWindow ? n === a.actualWindow : p.hash({
              proxyInstanceID: a.getInstanceID(),
              knownWindowInstanceID: ko(n, {
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
          return !!(this.actualWindow && Le(this.actualWindow));
        }, r.serialize = function() {
          return this.serializedWindow;
        }, e.unwrap = function(n) {
          return e.isProxyWindow(n) ? n.unwrap() : n;
        }, e.serialize = function(n, i) {
          var a = i.send;
          return Kn(), e.toProxyWindow(n, {
            send: a
          }).serialize();
        }, e.deserialize = function(n, i) {
          var a = i.send;
          return Kn(), we("idToProxyWindow").get(n.id) || new e({
            serializedWindow: n,
            send: a
          });
        }, e.isProxyWindow = function(n) {
          return !!(n && !ar(n) && n.isProxyWindow);
        }, e.toProxyWindow = function(n, i) {
          var a = i.send;
          if (Kn(), e.isProxyWindow(n)) return n;
          var c = n;
          return it("winToProxyWindow").get(c) || new e({
            win: c,
            send: a
          });
        }, e;
      }();
      function Yn(e, r, n, i, a) {
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
      function fi(e, r) {
        var n = it("methodStore"), i = we("proxyWindowMethods");
        return n.getOrSet(e, function() {
          return {};
        })[r] || i.get(r);
      }
      function li(e, r, n, i, a) {
        u = (c = {
          on: a.on,
          send: a.send
        }).on, h = c.send, we("builtinListeners").getOrSet("functionCalls", function() {
          return u("postrobot_method", {
            domain: "*"
          }, function(R) {
            var y = R.source, v = R.origin, P = R.data, T = P.id, x = P.name, O = fi(y, T);
            if (!O) throw new Error("Could not find method '" + x + "' with id: " + P.id + " in " + ae(window));
            var W = O.source, z = O.domain, J = O.val;
            return p.try(function() {
              if (!wt(z, v)) throw new Error("Method '" + P.name + "' domain " + JSON.stringify(Fn(O.domain) ? O.domain.source : O.domain) + " does not match origin " + v + " in " + ae(window));
              if (yt.isProxyWindow(W)) return W.matchWindow(y, {
                send: h
              }).then(function(M) {
                if (!M) throw new Error("Method call '" + P.name + "' failed - proxy window does not match source in " + ae(window));
              });
            }).then(function() {
              return J.apply({
                source: y,
                origin: v
              }, P.args);
            }, function(M) {
              return p.try(function() {
                if (J.onError) return J.onError(M);
              }).then(function() {
                throw M.stack && (M.stack = "Remote call to " + x + "(" + function(V) {
                  return V === void 0 && (V = []), Wn(V).map(function(U) {
                    return typeof U == "string" ? "'" + U + "'" : U === void 0 ? "undefined" : U === null ? "null" : typeof U == "boolean" ? U.toString() : Array.isArray(U) ? "[ ... ]" : typeof U == "object" ? "{ ... }" : typeof U == "function" ? "() => { ... }" : "<" + typeof U + ">";
                  }).join(", ");
                }(P.args) + `) failed

` + M.stack), M;
              });
            }).then(function(M) {
              return {
                result: M,
                id: T,
                name: x
              };
            });
          });
        });
        var c, u, h, l = n.__id__ || st();
        e = yt.unwrap(e);
        var g = n.__name__ || n.name || i;
        return typeof g == "string" && typeof g.indexOf == "function" && g.indexOf("anonymous::") === 0 && (g = g.replace("anonymous::", i + "::")), yt.isProxyWindow(e) ? (Yn(l, n, g, e, r), e.awaitWindow().then(function(R) {
          Yn(l, n, g, R, r);
        })) : Yn(l, n, g, e, r), sr("cross_domain_function", {
          id: l,
          name: g
        });
      }
      function hi(e, r, n, i) {
        var a, c = i.on, u = i.send;
        return function(h, l) {
          l === void 0 && (l = Ja);
          var g = JSON.stringify(h, function(R) {
            var y = this[R];
            if ($n(this)) return y;
            var v = ri(y);
            if (!v) return y;
            var P = l[v] || Ga[v];
            return P ? P(y, R) : y;
          });
          return g === void 0 ? "undefined" : g;
        }(n, ((a = {}).promise = function(h, l) {
          return function(g, R, y, v, P) {
            return sr("cross_domain_zalgo_promise", {
              then: li(g, R, function(T, x) {
                return y.then(T, x);
              }, v, {
                on: P.on,
                send: P.send
              })
            });
          }(e, r, h, l, {
            on: c,
            send: u
          });
        }, a.function = function(h, l) {
          return li(e, r, h, l, {
            on: c,
            send: u
          });
        }, a.object = function(h) {
          return ar(h) || yt.isProxyWindow(h) ? sr("cross_domain_window", yt.serialize(h, {
            send: u
          })) : h;
        }, a));
      }
      function pi(e, r, n, i) {
        var a, c = i.send;
        return function(u, h) {
          if (h === void 0 && (h = Ya), u !== "undefined") return JSON.parse(u, function(l, g) {
            if ($n(this)) return g;
            var R, y;
            if ($n(g) ? (R = g.__type__, y = g.__val__) : (R = ri(g), y = g), !R) return y;
            var v = h[R] || Ka[R];
            return v ? v(y, l) : y;
          });
        }(n, ((a = {}).cross_domain_zalgo_promise = function(u) {
          return function(h, l, g) {
            return new p(g.then);
          }(0, 0, u);
        }, a.cross_domain_function = function(u) {
          return function(h, l, g, R) {
            var y = g.id, v = g.name, P = R.send, T = function(O) {
              O === void 0 && (O = {});
              function W() {
                var z = arguments;
                return yt.toProxyWindow(h, {
                  send: P
                }).awaitWindow().then(function(J) {
                  var M = fi(J, y);
                  if (M && M.val !== W) return M.val.apply({
                    source: window,
                    origin: ae()
                  }, z);
                  var V = [].slice.call(z);
                  return O.fireAndForget ? P(J, "postrobot_method", {
                    id: y,
                    name: v,
                    args: V
                  }, {
                    domain: l,
                    fireAndForget: !0
                  }) : P(J, "postrobot_method", {
                    id: y,
                    name: v,
                    args: V
                  }, {
                    domain: l,
                    fireAndForget: !1
                  }).then(function(U) {
                    return U.data.result;
                  });
                }).catch(function(J) {
                  throw J;
                });
              }
              return W.__name__ = v, W.__origin__ = l, W.__source__ = h, W.__id__ = y, W.origin = l, W;
            }, x = T();
            return x.fireAndForget = T({
              fireAndForget: !0
            }), x;
          }(e, r, u, {
            send: c
          });
        }, a.cross_domain_window = function(u) {
          return yt.deserialize(u, {
            send: c
          });
        }, a));
      }
      var Mr = {};
      Mr.postrobot_post_message = function(e, r, n) {
        n.indexOf("file:") === 0 && (n = "*"), e.postMessage(r, n);
      }, Mr.postrobot_bridge = function(e, r, n) {
        if (!Hn() && !ai()) throw new Error("Bridge not needed for browser");
        if (L(e)) throw new Error("Post message through bridge disabled between same domain windows");
        if (ir(window, e) !== !1) throw new Error("Can only use bridge to communicate between two different windows, not between frames");
        (function(i, a, c) {
          var u = Qr(window, i), h = Qr(i, window);
          if (!u && !h) throw new Error("Can only send messages to and from parent and popup windows");
          Gn(i).then(function(l) {
            return l(i, a, c);
          });
        })(e, n, r);
      }, Mr.postrobot_global = function(e, r) {
        if (!xn(window).match(/MSIE|rv:11|trident|edge\/12|edge\/13/i)) throw new Error("Global messaging not needed for browser");
        if (!L(e)) throw new Error("Post message through global disabled between different domain windows");
        if (ir(window, e) !== !1) throw new Error("Can only use global to communicate between two different windows, not between frames");
        var n = _t(e);
        if (!n) throw new Error("Can not find postRobot global on foreign window");
        n.receiveMessage({
          source: window,
          origin: ae(),
          data: r
        });
      };
      function Zn(e, r, n, i) {
        var a = i.on, c = i.send;
        return p.try(function() {
          var u = it().getOrSet(e, function() {
            return {};
          });
          return u.buffer = u.buffer || [], u.buffer.push(n), u.flush = u.flush || p.flush().then(function() {
            if (Le(e)) throw new Error("Window is closed");
            var h = hi(e, r, ((l = {}).__post_robot_11_0_0__ = u.buffer || [], l), {
              on: a,
              send: c
            }), l;
            delete u.buffer;
            for (var g = Object.keys(Mr), R = [], y = 0; y < g.length; y++) {
              var v = g[y];
              try {
                Mr[v](e, h, r);
              } catch (P) {
                R.push(P);
              }
            }
            if (R.length === g.length) throw new Error(`All post-robot messaging strategies failed:

` + R.map(function(P, T) {
              return T + ". " + wr(P);
            }).join(`

`));
          }), u.flush.then(function() {
            delete u.flush;
          });
        }).then(Ie);
      }
      function vi(e) {
        return we("responseListeners").get(e);
      }
      function wi(e) {
        we("responseListeners").del(e);
      }
      function mi(e) {
        return we("erroredResponseListeners").has(e);
      }
      function gi(e) {
        var r = e.name, n = e.win, i = e.domain, a = it("requestListeners");
        if (n === "*" && (n = null), i === "*" && (i = null), !r) throw new Error("Name required to get request listener");
        for (var c = 0, u = [n, fn()]; c < u.length; c++) {
          var h = u[c];
          if (h) {
            var l = a.get(h);
            if (l) {
              var g = l[r];
              if (g) {
                if (i && typeof i == "string") {
                  if (g[i]) return g[i];
                  if (g.__domain_regex__) for (var R = 0, y = g.__domain_regex__; R < y.length; R++) {
                    var v = y[R], P = v.listener;
                    if (wt(v.regex, i)) return P;
                  }
                }
                if (g["*"]) return g["*"];
              }
            }
          }
        }
      }
      function Xn(e, r) {
        var n = r.on, i = r.send, a = we("receivedMessages");
        try {
          if (!window || window.closed || !e.source) return;
        } catch {
          return;
        }
        var c = e.source, u = e.origin, h = function(y, v, P, T) {
          var x = T.on, O = T.send, W;
          try {
            W = pi(v, P, y, {
              on: x,
              send: O
            });
          } catch {
            return;
          }
          if (W && typeof W == "object" && W !== null) {
            var z = W.__post_robot_11_0_0__;
            if (Array.isArray(z)) return z;
          }
        }(e.data, c, u, {
          on: n,
          send: i
        });
        if (h) {
          ti(c);
          for (var l, g = function() {
            var y = h[R];
            if (a.has(y.id)) return {
              v: void 0
            };
            if (a.set(y.id, !0), Le(c) && !y.fireAndForget) return {
              v: void 0
            };
            y.origin.indexOf("file:") === 0 && (u = "file://");
            try {
              y.type === "postrobot_message_request" ? function(v, P, T, x) {
                var O = x.on, W = x.send, z = gi({
                  name: T.name,
                  win: v,
                  domain: P
                }), J = T.name === "postrobot_method" && T.data && typeof T.data.name == "string" ? T.data.name + "()" : T.name;
                function M(V, U, re) {
                  return p.flush().then(function() {
                    if (!T.fireAndForget && !Le(v)) try {
                      return Zn(v, P, {
                        id: st(),
                        origin: ae(window),
                        type: "postrobot_message_response",
                        hash: T.hash,
                        name: T.name,
                        ack: V,
                        data: U,
                        error: re
                      }, {
                        on: O,
                        send: W
                      });
                    } catch (H) {
                      throw new Error("Send response message failed for " + J + " in " + ae() + `

` + wr(H));
                    }
                  });
                }
                p.all([p.flush().then(function() {
                  if (!T.fireAndForget && !Le(v)) try {
                    return Zn(v, P, {
                      id: st(),
                      origin: ae(window),
                      type: "postrobot_message_ack",
                      hash: T.hash,
                      name: T.name
                    }, {
                      on: O,
                      send: W
                    });
                  } catch (V) {
                    throw new Error("Send ack message failed for " + J + " in " + ae() + `

` + wr(V));
                  }
                }), p.try(function() {
                  if (!z) throw new Error("No handler found for post message: " + T.name + " from " + P + " in " + window.location.protocol + "//" + window.location.host + window.location.pathname);
                  return z.handler({
                    source: v,
                    origin: P,
                    data: T.data
                  });
                }).then(function(V) {
                  return M("success", V);
                }, function(V) {
                  return M("error", null, V);
                })]).then(Ie).catch(function(V) {
                  if (z && z.handleError) return z.handleError(V);
                  throw V;
                });
              }(c, u, y, {
                on: n,
                send: i
              }) : y.type === "postrobot_message_response" ? function(v, P, T) {
                if (!mi(T.hash)) {
                  var x = vi(T.hash);
                  if (!x) throw new Error("No handler found for post message response for message: " + T.name + " from " + P + " in " + window.location.protocol + "//" + window.location.host + window.location.pathname);
                  if (!wt(x.domain, P)) throw new Error("Response origin " + P + " does not match domain " + (O = x.domain, Array.isArray(O) ? "(" + O.join(" | ") + ")" : A(O) ? "RegExp(" + O.toString() + ")" : O.toString()));
                  var O;
                  if (v !== x.win) throw new Error("Response source does not match registered window");
                  wi(T.hash), T.ack === "error" ? x.promise.reject(T.error) : T.ack === "success" && x.promise.resolve({
                    source: v,
                    origin: P,
                    data: T.data
                  });
                }
              }(c, u, y) : y.type === "postrobot_message_ack" && function(v, P, T) {
                if (!mi(T.hash)) {
                  var x = vi(T.hash);
                  if (!x) throw new Error("No handler found for post message ack for message: " + T.name + " from " + P + " in " + window.location.protocol + "//" + window.location.host + window.location.pathname);
                  try {
                    if (!wt(x.domain, P)) throw new Error("Ack origin " + P + " does not match domain " + x.domain.toString());
                    if (v !== x.win) throw new Error("Ack source does not match registered window");
                  } catch (O) {
                    x.promise.reject(O);
                  }
                  x.ack = !0;
                }
              }(c, u, y);
            } catch (v) {
              setTimeout(function() {
                throw v;
              }, 0);
            }
          }, R = 0; R < h.length; R++) if (l = g()) return l.v;
        }
      }
      function Mt(e, r, n) {
        if (!e) throw new Error("Expected name");
        if (typeof (r = r || {}) == "function" && (n = r, r = {}), !n) throw new Error("Expected handler");
        var i = function a(c, u) {
          var h = c.name, l = c.win, g = c.domain, R = it("requestListeners");
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
          var v = l;
          if (Array.isArray(v)) {
            for (var P = [], T = 0, x = v; T < x.length; T++) P.push(a({
              name: h,
              domain: g,
              win: x[T]
            }, u));
            return {
              cancel: function() {
                for (var he = 0; he < P.length; he++) P[he].cancel();
              }
            };
          }
          if (Array.isArray(g)) {
            for (var O = [], W = 0, z = g; W < z.length; W++) O.push(a({
              name: h,
              win: v,
              domain: z[W]
            }, u));
            return {
              cancel: function() {
                for (var he = 0; he < O.length; he++) O[he].cancel();
              }
            };
          }
          var J = gi({
            name: h,
            win: v,
            domain: g
          });
          v && v !== "*" || (v = fn());
          var M = (g = g || "*").toString();
          if (J) throw v && g ? new Error("Request listener already exists for " + h + " on domain " + g.toString() + " for " + (v === fn() ? "wildcard" : "specified") + " window") : v ? new Error("Request listener already exists for " + h + " for " + (v === fn() ? "wildcard" : "specified") + " window") : g ? new Error("Request listener already exists for " + h + " on domain " + g.toString()) : new Error("Request listener already exists for " + h);
          var V = R.getOrSet(v, function() {
            return {};
          }), U = Ar(V, h, function() {
            return {};
          }), re, H;
          return Fn(g) ? (re = Ar(U, "__domain_regex__", function() {
            return [];
          })).push(H = {
            regex: g,
            listener: u
          }) : U[M] = u, {
            cancel: function() {
              delete U[M], H && (re.splice(re.indexOf(H, 1)), re.length || delete U.__domain_regex__), Object.keys(U).length || delete V[h], v && !Object.keys(V).length && R.del(v);
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
      var xt = function e(r, n, i, a) {
        var c = (a = a || {}).domain || "*", u = a.timeout || -1, h = a.timeout || 5e3, l = a.fireAndForget || !1;
        return yt.toProxyWindow(r, {
          send: e
        }).awaitWindow().then(function(g) {
          return p.try(function() {
            if (function(R, y, v) {
              if (!R) throw new Error("Expected name");
              if (v && typeof v != "string" && !Array.isArray(v) && !Fn(v)) throw new TypeError("Can not send " + R + ". Expected domain " + JSON.stringify(v) + " to be a string, array, or regex");
              if (Le(y)) throw new Error("Can not send " + R + ". Target window is closed");
            }(n, g, c), function(R, y) {
              var v = Ht(y);
              if (v) return v === R;
              if (y === R || Oe(y) === y) return !1;
              for (var P = 0, T = Re(R); P < T.length; P++) if (T[P] === y) return !0;
              return !1;
            }(window, g)) return ei(g, h);
          }).then(function(R) {
            return function(y, v, P, T) {
              var x = T.send;
              return p.try(function() {
                return typeof v == "string" ? v : p.try(function() {
                  return P || qn(y, {
                    send: x
                  }).then(function(O) {
                    return O.domain;
                  });
                }).then(function(O) {
                  if (!wt(v, v)) throw new Error("Domain " + nn(v) + " does not match " + nn(v));
                  return O;
                });
              });
            }(g, c, (R === void 0 ? {} : R).domain, {
              send: e
            });
          }).then(function(R) {
            var y = R, v = n === "postrobot_method" && i && typeof i.name == "string" ? i.name + "()" : n, P = new p(), T = n + "_" + st();
            if (!l) {
              var x = {
                name: n,
                win: g,
                domain: y,
                promise: P
              };
              (function(U, re) {
                we("responseListeners").set(U, re);
              })(T, x);
              var O = it("requestPromises").getOrSet(g, function() {
                return [];
              });
              O.push(P), P.catch(function() {
                (function(U) {
                  we("erroredResponseListeners").set(U, !0);
                })(T), wi(T);
              });
              var W = function(U) {
                return it("knownWindows").get(U, !1);
              }(g) ? 1e4 : 2e3, z = u, J = W, M = z, V = Nr(function() {
                return Le(g) ? P.reject(new Error("Window closed for " + n + " before " + (x.ack ? "response" : "ack"))) : x.cancelled ? P.reject(new Error("Response listener was cancelled for " + n)) : (J = Math.max(J - 500, 0), M !== -1 && (M = Math.max(M - 500, 0)), x.ack || J !== 0 ? M === 0 ? P.reject(new Error("No response for postMessage " + v + " in " + ae() + " in " + z + "ms")) : void 0 : P.reject(new Error("No ack for postMessage " + v + " in " + ae() + " in " + W + "ms")));
              }, 500);
              P.finally(function() {
                V.cancel(), O.splice(O.indexOf(P, 1));
              }).catch(Ie);
            }
            return Zn(g, y, {
              id: st(),
              origin: ae(window),
              type: "postrobot_message_request",
              hash: T,
              name: n,
              data: i,
              fireAndForget: l
            }, {
              on: Mt,
              send: e
            }).then(function() {
              return l ? P.resolve() : P;
            }, function(U) {
              throw new Error("Send request message failed for " + v + " in " + ae() + `

` + wr(U));
            });
          });
        });
      };
      function Fr(e) {
        return yt.toProxyWindow(e, {
          send: xt
        });
      }
      function yi(e) {
        for (var r = 0, n = it("requestPromises").get(e, []); r < n.length; r++) n[r].reject(new Error("Window " + (Le(e) ? "closed" : "cleaned up") + " before response")).catch(Ie);
      }
      var Jt;
      Jt = {
        setupBridge: ui,
        openBridge: function(e, r) {
          var n = we("bridges"), i = we("bridgeFrames");
          return r = r || Wt(e), n.getOrSet(r, function() {
            return p.try(function() {
              if (ae() === r) throw new Error("Can not open bridge on the same domain as current domain: " + r);
              var a = Vn(r);
              if ($t(window, a)) throw new Error("Frame with name " + a + " already exists on page");
              var c = function(u, h) {
                var l = document.createElement("iframe");
                return l.setAttribute("name", u), l.setAttribute("id", u), l.setAttribute("style", "display: none; margin: 0; padding: 0; border: 0px none; overflow: hidden;"), l.setAttribute("frameborder", "0"), l.setAttribute("border", "0"), l.setAttribute("scrolling", "no"), l.setAttribute("allowTransparency", "true"), l.setAttribute("tabindex", "-1"), l.setAttribute("hidden", "true"), l.setAttribute("title", ""), l.setAttribute("role", "presentation"), l.src = h, l;
              }(a, e);
              return i.set(r, c), Za.then(function(u) {
                u.appendChild(c);
                var h = c.contentWindow;
                return new p(function(l, g) {
                  c.addEventListener("load", l), c.addEventListener("error", g);
                }).then(function() {
                  return ei(h, 5e3, "Bridge " + e);
                }).then(function() {
                  return h;
                });
              });
            });
          });
        },
        linkWindow: ln,
        linkUrl: function(e, r) {
          ln({
            win: e,
            domain: Wt(r)
          });
        },
        isBridge: ai,
        needsBridge: ii,
        needsBridgeForBrowser: Hn,
        hasBridge: function(e, r) {
          return we("bridges").has(r || Wt(e));
        },
        needsBridgeForWin: ni,
        needsBridgeForDomain: oi,
        destroyBridges: function() {
          for (var e = we("bridges"), r = we("bridgeFrames"), n = 0, i = r.keys(); n < i.length; n++) {
            var a = r.get(i[n]);
            a && a.parentNode && a.parentNode.removeChild(a);
          }
          r.reset(), e.reset();
        }
      };
      function Lr(e) {
        if (!L(e)) throw new Error("Can not get global for window on different domain");
        return e.__zoid_10_3_3__ || (e.__zoid_10_3_3__ = {}), e.__zoid_10_3_3__;
      }
      function Ei(e, r) {
        try {
          return r(Lr(e));
        } catch {
        }
      }
      function hn(e) {
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
      function Xa(e) {
        return _n(JSON.stringify(e));
      }
      function Qn(e) {
        var r = Lr(e);
        return r.references = r.references || {}, r.references;
      }
      function bi(e) {
        var r = e.data, n = e.metaData, i = e.sender, a = e.receiver, c = e.passByReference, u = c !== void 0 && c, h = e.basic, l = h !== void 0 && h, g = Fr(a.win), R = l ? JSON.stringify(r) : hi(g, a.domain, r, {
          on: Mt,
          send: xt
        }), y = u ? function(v) {
          var P = st();
          return Qn(window)[P] = v, {
            type: "uid",
            uid: P
          };
        }(R) : {
          type: "raw",
          val: R
        };
        return {
          serializedData: Xa({
            sender: {
              domain: i.domain
            },
            metaData: n,
            reference: y
          }),
          cleanReference: function() {
            v = window, (P = y).type === "uid" && delete Qn(v)[P.uid];
            var v, P;
          }
        };
      }
      function Pi(e) {
        var r = e.sender, n = e.basic, i = n !== void 0 && n, a = function(R) {
          return JSON.parse(function(y) {
            if (typeof atob == "function") return decodeURIComponent([].map.call(atob(y), function(v) {
              return "%" + ("00" + v.charCodeAt(0).toString(16)).slice(-2);
            }).join(""));
            if (typeof Buffer < "u") return Buffer.from(y, "base64").toString("utf8");
            throw new Error("Can not find window.atob or Buffer");
          }(R));
        }(e.data), c = a.reference, u = a.metaData, h;
        h = typeof r.win == "function" ? r.win({
          metaData: u
        }) : r.win;
        var l;
        l = typeof r.domain == "function" ? r.domain({
          metaData: u
        }) : typeof r.domain == "string" ? r.domain : a.sender.domain;
        var g = function(R, y) {
          if (y.type === "raw") return y.val;
          if (y.type === "uid") return Qn(R)[y.uid];
          throw new Error("Unsupported ref type: " + y.type);
        }(h, c);
        return {
          data: i ? JSON.parse(g) : function(R, y, v) {
            return pi(R, y, v, {
              on: Mt,
              send: xt
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
      }, pn = {
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
      function Ri(e) {
        return "__zoid__" + e.name + "__" + e.serializedPayload + "__";
      }
      function kn(e) {
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
      var Qa = Vt(function(e) {
        var r = Pi({
          data: kn(e).serializedInitialPayload,
          sender: {
            win: function(n) {
              return function(i) {
                if (i.type === "opener") return sn("opener", Ae(window));
                if (i.type === "parent" && typeof i.distance == "number") return sn("parent", function(y, v) {
                  return v === void 0 && (v = 1), function(P, T) {
                    T === void 0 && (T = 1);
                    for (var x = P, O = 0; O < T; O++) {
                      if (!x) return;
                      x = ve(x);
                    }
                    return x;
                  }(y, Dr(y) - v);
                }(window, i.distance));
                if (i.type === "global" && i.uid && typeof i.uid == "string") {
                  var a = i.uid, c = Ht(window);
                  if (!c) throw new Error("Can not find ancestor window");
                  for (var u = 0, h = Je(c); u < h.length; u++) {
                    var l = h[u];
                    if (L(l)) {
                      var g = Ei(l, function(y) {
                        return y.windows && y.windows[a];
                      });
                      if (g) return g;
                    }
                  }
                } else if (i.type === "name") {
                  var R = i.name;
                  return sn("namedWindow", function(y, v) {
                    return $t(y, v) || function P(T, x) {
                      var O = $t(T, x);
                      if (O) return O;
                      for (var W = 0, z = Re(T); W < z.length; W++) {
                        var J = P(z[W], x);
                        if (J) return J;
                      }
                    }(Oe(y) || y, v);
                  }(sn("ancestor", Ht(window)), R));
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
      function Ti() {
        return Qa(window.name);
      }
      function ka(e, r) {
        if (r === void 0 && (r = window), e === ve(r)) return {
          type: "parent",
          distance: Dr(e)
        };
        if (e === Ae(r)) return {
          type: "opener"
        };
        if (L(e) && (i = e, i !== Oe(i))) {
          var n = B(e).name;
          if (n) return {
            type: "name",
            name: n
          };
        }
        var i;
      }
      function Si(e, r, n, i, a) {
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
      function es() {
        return p.try(function() {
          window.focus();
        });
      }
      function xi() {
        return p.try(function() {
          window.close();
        });
      }
      var Ft = function() {
        return Ie;
      }, cr = function(e) {
        return rn(e.value);
      };
      function eo(e, r, n) {
        for (var i = 0, a = Object.keys(w({}, e, r)); i < a.length; i++) {
          var c = a[i];
          n(c, r[c], e[c]);
        }
      }
      function Oi(e, r, n) {
        var i = {};
        return p.all(function(a, c, u) {
          var h = [];
          return eo(a, c, function(l, g, R) {
            var y = function(v, P, T) {
              return p.resolve().then(function() {
                var x, O;
                if (T != null && P) {
                  var W = (x = {}, x.get = P.queryParam, x.post = P.bodyParam, x)[n], z = (O = {}, O.get = P.queryValue, O.post = P.bodyValue, O)[n];
                  if (W) return p.hash({
                    finalParam: p.try(function() {
                      return typeof W == "function" ? W({
                        value: T
                      }) : typeof W == "string" ? W : v;
                    }),
                    finalValue: p.try(function() {
                      return typeof z == "function" && Gt(T) ? z({
                        value: T
                      }) : T;
                    })
                  }).then(function(J) {
                    var M = J.finalParam, V = J.finalValue, U;
                    if (typeof V == "boolean") U = V.toString();
                    else if (typeof V == "string") U = V.toString();
                    else if (typeof V == "object" && V !== null) {
                      if (P.serialization === pn.JSON) U = JSON.stringify(V);
                      else if (P.serialization === pn.BASE64) U = _n(JSON.stringify(V));
                      else if (P.serialization === pn.DOTIFY || !P.serialization) {
                        U = function ue(Q, G, le) {
                          G === void 0 && (G = ""), le === void 0 && (le = {}), G = G && G + ".";
                          for (var ne in Q) Q.hasOwnProperty(ne) && Q[ne] != null && typeof Q[ne] != "function" && (Q[ne] && Array.isArray(Q[ne]) && Q[ne].length && Q[ne].every(function(Me) {
                            return typeof Me != "object";
                          }) ? le["" + G + ne + "[]"] = Q[ne].join(",") : Q[ne] && typeof Q[ne] == "object" ? le = ue(Q[ne], "" + G + ne, le) : le["" + G + ne] = Q[ne].toString());
                          return le;
                        }(V, v);
                        for (var re = 0, H = Object.keys(U); re < H.length; re++) {
                          var he = H[re];
                          i[he] = U[he];
                        }
                        return;
                      }
                    } else typeof V == "number" && (U = V.toString());
                    i[M] = U;
                  });
                }
              });
            }(l, g, R);
            h.push(y);
          }), h;
        }(r, e)).then(function() {
          return i;
        });
      }
      function Ii(e) {
        var r = e.uid, n = e.options, i = e.overrides, a = i === void 0 ? {} : i, c = e.parentWin, u = c === void 0 ? window : c, h = n.propsDef, l = n.containerTemplate, g = n.prerenderTemplate, R = n.tag, y = n.name, v = n.attributes, P = n.dimensions, T = n.autoResize, x = n.url, O = n.domain, W = n.exports, z = new p(), J = [], M = an(), V = {}, U = {}, re = {
          visible: !0
        }, H = a.event ? a.event : (he = {}, ue = {}, Q = {
          on: function(I, _) {
            var $ = ue[I] = ue[I] || [];
            $.push(_);
            var j = !1;
            return {
              cancel: function() {
                j || (j = !0, $.splice($.indexOf(_), 1));
              }
            };
          },
          once: function(I, _) {
            var $ = Q.on(I, function() {
              $.cancel(), _();
            });
            return $;
          },
          trigger: function(I) {
            for (var _ = arguments.length, $ = new Array(_ > 1 ? _ - 1 : 0), j = 1; j < _; j++) $[j - 1] = arguments[j];
            var ie = ue[I], k = [];
            if (ie)
              for (var Te = function() {
                var Ze = ie[Se];
                k.push(p.try(function() {
                  return Ze.apply(void 0, $);
                }));
              }, Se = 0; Se < ie.length; Se++) Te();
            return p.all(k).then(Ie);
          },
          triggerOnce: function(I) {
            if (he[I]) return p.resolve();
            he[I] = !0;
            for (var _ = arguments.length, $ = new Array(_ > 1 ? _ - 1 : 0), j = 1; j < _; j++) $[j - 1] = arguments[j];
            return Q.trigger.apply(Q, [I].concat($));
          },
          reset: function() {
            ue = {};
          }
        }), he, ue, Q, G = a.props ? a.props : {}, le, ne, Me, Nt, Et, Kt = !1, Yt = a.onError, Lt = a.getProxyContainer, Zt = a.show, Xt = a.hide, ur = a.close, Qt = a.renderContainer, Ot = a.getProxyWindow, dr = a.setProxyWin, kt = a.openFrame, er = a.openPrerenderFrame, fr = a.prerender, lr = a.open, de = a.openPrerender, bt = a.watchForUnload, fe = a.getInternalState, Ke = a.setInternalState, ze = function() {
          return typeof P == "function" ? P({
            props: G
          }) : P;
        }, Ye = function() {
          return p.try(function() {
            return a.resolveInitPromise ? a.resolveInitPromise() : z.resolve();
          });
        }, Ne = function(I) {
          return p.try(function() {
            return a.rejectInitPromise ? a.rejectInitPromise(I) : z.reject(I);
          });
        }, ct = function(I) {
          for (var _ = {}, $ = 0, j = Object.keys(G); $ < j.length; $++) {
            var ie = j[$], k = h[ie];
            if (!k || k.sendToChild !== !1) {
              var Te = k && k.trustedDomains && k.trustedDomains.length > 0 ? k.trustedDomains.reduce(function(Se, Ze) {
                return Se || wt(Ze, I);
              }, !1) : wt(I, ae(window));
              k && k.sameDomain && !Te || k && k.trustedDomains && !Te || (_[ie] = G[ie]);
            }
          }
          return p.hash(_);
        }, $e = function() {
          return p.try(function() {
            return fe ? fe() : re;
          });
        }, He = function(I) {
          return p.try(function() {
            return Ke ? Ke(I) : re = w({}, re, I);
          });
        }, Pt = function() {
          return Ot ? Ot() : p.try(function() {
            var I = G.window;
            if (I) {
              var _ = Fr(I);
              return M.register(function() {
                return I.close();
              }), _;
            }
            return new yt({
              send: xt
            });
          });
        }, dt = function(I) {
          return dr ? dr(I) : p.try(function() {
            le = I;
          });
        }, It = function() {
          return Zt ? Zt() : p.hash({
            setState: He({
              visible: !0
            }),
            showElement: ne ? ne.get().then(qa) : null
          }).then(Ie);
        }, zt = function() {
          return Xt ? Xt() : p.hash({
            setState: He({
              visible: !1
            }),
            showElement: ne ? ne.get().then(Ho) : null
          }).then(Ie);
        }, yr = function() {
          return typeof x == "function" ? x({
            props: G
          }) : x;
        }, Er = function() {
          return typeof v == "function" ? v({
            props: G
          }) : v;
        }, hr = function() {
          return Wt(yr());
        }, ft = function(I, _) {
          var $ = _.windowName;
          return kt ? kt(I, {
            windowName: $
          }) : p.try(function() {
            if (I === We.IFRAME) return hn(qo({
              attributes: w({
                name: $,
                title: y
              }, Er().iframe)
            }));
          });
        }, zr = function(I) {
          return er ? er(I) : p.try(function() {
            if (I === We.IFRAME) return hn(qo({
              attributes: w({
                name: "__zoid_prerender_frame__" + y + "_" + st() + "__",
                title: "prerender__" + y
              }, Er().iframe)
            }));
          });
        }, Ur = function(I, _, $) {
          return de ? de(I, _, $) : p.try(function() {
            if (I === We.IFRAME) {
              if (!$) throw new Error("Expected proxy frame to be passed");
              return $.get().then(function(j) {
                return M.register(function() {
                  return Wr(j);
                }), Un(j).then(function(ie) {
                  return B(ie);
                }).then(function(ie) {
                  return Fr(ie);
                });
              });
            }
            if (I === We.POPUP) return _;
            throw new Error("No render context available for " + I);
          });
        }, br = function() {
          return p.try(function() {
            if (le) return p.all([H.trigger(Ce.FOCUS), le.focus()]).then(Ie);
          });
        }, vn = function() {
          var I = Lr(window);
          return I.windows = I.windows || {}, I.windows[r] = window, M.register(function() {
            delete I.windows[r];
          }), r;
        }, Br = function(I, _, $, j) {
          if (_ === ae(window)) return {
            type: "global",
            uid: vn()
          };
          if (I !== window) throw new Error("Can not construct cross-domain window reference for different target window");
          if (G.window) {
            var ie = j.getWindow();
            if (!ie) throw new Error("Can not construct cross-domain window reference for lazy window prop");
            if (Ht(ie) !== window) throw new Error("Can not construct cross-domain window reference for window prop with different ancestor");
          }
          if ($ === We.POPUP) return {
            type: "opener"
          };
          if ($ === We.IFRAME) return {
            type: "parent",
            distance: Dr(window)
          };
          throw new Error("Can not construct window reference for child");
        }, wn = function(I, _) {
          return p.try(function() {
            var $;
            Nt = I, Me = _, ($ = le) == null || $.isPopup().then(function(j) {
              if ((_ == null ? void 0 : _.name) !== "" && j) {
                var ie;
                (ie = le) == null || ie.setName(_ == null ? void 0 : _.name);
              }
            }).finally(function() {
              Ye(), M.register(function() {
                return _.close.fireAndForget().catch(Ie);
              });
            });
          });
        }, jr = function(I) {
          var _ = I.width, $ = I.height;
          return p.try(function() {
            H.trigger(Ce.RESIZE, {
              width: _,
              height: $
            });
          });
        }, qr = function(I) {
          return p.try(function() {
            return H.trigger(Ce.DESTROY);
          }).catch(Ie).then(function() {
            return M.all(I);
          }).then(function() {
            var _ = I || new Error("Component destroyed");
            Et && gr(Et) || _.message === "Window navigated away" ? z.resolve() : z.asyncReject(_);
          });
        }, Ut = Vt(function(I) {
          return p.try(function() {
            return ur ? Le(ur.__source__) ? void 0 : ur() : p.try(function() {
              return H.trigger(Ce.CLOSE);
            }).then(function() {
              return qr(I || new Error("Component closed"));
            });
          });
        }), _i = function(I, _) {
          var $ = _.proxyWin, j = _.proxyFrame, ie = _.windowName;
          return lr ? lr(I, {
            proxyWin: $,
            proxyFrame: j,
            windowName: ie
          }) : p.try(function() {
            if (I === We.IFRAME) {
              if (!j) throw new Error("Expected proxy frame to be passed");
              return j.get().then(function(Ue) {
                return Un(Ue).then(function(me) {
                  return M.register(function() {
                    return Wr(Ue);
                  }), M.register(function() {
                    return yi(me);
                  }), me;
                });
              });
            }
            if (I === We.POPUP) {
              var k = ze(), Te = k.width, Se = Te === void 0 ? "300px" : Te, Ze = k.height, De = Ze === void 0 ? "150px" : Ze;
              Se = Yo(Se, window.outerWidth), De = Yo(De, window.outerWidth);
              var Ve = function(Ue, me) {
                var Be = (me = me || {}).closeOnUnload, _e = Be === void 0 ? 1 : Be, lt = me.name, Xe = lt === void 0 ? "" : lt, pe = me.width, Qe = me.height, ut = 0, rt = 0;
                pe && (window.outerWidth ? rt = Math.round((window.outerWidth - pe) / 2) + window.screenX : window.screen.width && (rt = Math.round((window.screen.width - pe) / 2))), Qe && (window.outerHeight ? ut = Math.round((window.outerHeight - Qe) / 2) + window.screenY : window.screen.height && (ut = Math.round((window.screen.height - Qe) / 2))), delete me.closeOnUnload, delete me.name, pe && Qe && (me = w({
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
                var pr = Object.keys(me).map(function(At) {
                  if (me[At] != null) return At + "=" + nn(me[At]);
                }).filter(Boolean).join(","), Rt;
                try {
                  Rt = window.open("", Xe, pr);
                } catch (At) {
                  throw new zn("Can not open popup window - " + (At.stack || At.message));
                }
                if (Le(Rt))
                  throw new zn("Can not open popup window - blocked");
                return _e && window.addEventListener("unload", function() {
                  return Rt.close();
                }), Rt;
              }(0, w({
                name: ie,
                width: Se,
                height: De
              }, Er().popup));
              return M.register(function() {
                return Io(Ve);
              }), M.register(function() {
                return yi(Ve);
              }), Ve;
            }
            throw new Error("No render context available for " + I);
          }).then(function(k) {
            return $.setWindow(k, {
              send: xt
            }), $.setName(ie).then(function() {
              return $;
            });
          });
        }, Ni = function() {
          return p.try(function() {
            var I = $o(window, "unload", rn(function() {
              qr(new Error("Window navigated away"));
            })), _ = xo(u, qr, 3e3);
            if (M.register(_.cancel), M.register(I.cancel), bt) return bt();
          });
        }, Ai = function(I) {
          var _ = !1;
          return I.isClosed().then(function($) {
            return $ ? (_ = !0, Ut(new Error("Detected component window close"))) : p.delay(200).then(function() {
              return I.isClosed();
            }).then(function(j) {
              if (j)
                return _ = !0, Ut(new Error("Detected component window close"));
            });
          }).then(function() {
            return _;
          });
        }, $r = function(I) {
          return Yt ? Yt(I) : p.try(function() {
            if (J.indexOf(I) === -1)
              return J.push(I), z.asyncReject(I), H.trigger(Ce.ERROR, I);
          });
        }, Wi = new p(), Mi = function(I) {
          return p.try(function() {
            Wi.resolve(I);
          });
        };
        wn.onError = $r;
        var Fi = function(I, _) {
          return I({
            uid: r,
            container: _.container,
            context: _.context,
            doc: _.doc,
            frame: _.frame,
            prerenderFrame: _.prerenderFrame,
            focus: br,
            close: Ut,
            state: V,
            props: G,
            tag: R,
            dimensions: ze(),
            event: H
          });
        }, Li = function(I, _) {
          var $ = _.context;
          return fr ? fr(I, {
            context: $
          }) : p.try(function() {
            if (g) {
              H.trigger(Ce.PRERENDER);
              var j = I.getWindow();
              if (j && L(j) && function(Be) {
                try {
                  if (!Be.location.href || Be.location.href === "about:blank") return !0;
                } catch {
                }
                return !1;
              }(j)) {
                var ie = (j = B(j)).document, k = Fi(g, {
                  context: $,
                  doc: ie
                });
                if (k) {
                  if (k.ownerDocument !== ie) throw new Error("Expected prerender template to have been created with document from child window");
                  (function(Be, _e) {
                    var lt = _e.tagName.toLowerCase();
                    if (lt !== "html") throw new Error("Expected element to be html, got " + lt);
                    for (var Xe = Be.document.documentElement, pe = 0, Qe = Wn(Xe.children); pe < Qe.length; pe++) Xe.removeChild(Qe[pe]);
                    for (var ut = 0, rt = Wn(_e.children); ut < rt.length; ut++) Xe.appendChild(rt[ut]);
                  })(j, k);
                  var Te = T.width, Se = Te !== void 0 && Te, Ze = T.height, De = Ze !== void 0 && Ze, Ve = T.element, Ue = Ve === void 0 ? "body" : Ve;
                  if ((Ue = Ln(Ue, ie)) && (Se || De)) {
                    var me = Vo(Ue, function(Be) {
                      jr({
                        width: Se ? Be.width : void 0,
                        height: De ? Be.height : void 0
                      });
                    }, {
                      width: Se,
                      height: De,
                      win: j
                    });
                    H.on(Ce.RENDERED, me.cancel);
                  }
                  H.trigger(Ce.PRERENDERED);
                }
              }
            }
          });
        }, zi = function(I, _) {
          var $ = _.proxyFrame, j = _.proxyPrerenderFrame, ie = _.context, k = _.rerender;
          return Qt ? Qt(I, {
            proxyFrame: $,
            proxyPrerenderFrame: j,
            context: ie,
            rerender: k
          }) : p.hash({
            container: I.get(),
            frame: $ ? $.get() : null,
            prerenderFrame: j ? j.get() : null,
            internalState: $e()
          }).then(function(Te) {
            var Se = Te.container, Ze = Te.internalState.visible, De = Fi(l, {
              context: ie,
              container: Se,
              frame: Te.frame,
              prerenderFrame: Te.prerenderFrame,
              doc: document
            });
            if (De) {
              Ze || Ho(De), ja(Se, De);
              var Ve = function(Ue, me) {
                me = rn(me);
                var Be = !1, _e = [], lt, Xe, pe, Qe = function() {
                  Be = !0;
                  for (var Rt = 0; Rt < _e.length; Rt++) _e[Rt].disconnect();
                  lt && lt.cancel(), pe && pe.removeEventListener("unload", ut), Xe && Wr(Xe);
                }, ut = function() {
                  Be || (me(), Qe());
                };
                if (gr(Ue))
                  return ut(), {
                    cancel: Qe
                  };
                if (window.MutationObserver)
                  for (var rt = Ue.parentElement; rt; ) {
                    var pr = new window.MutationObserver(function() {
                      gr(Ue) && ut();
                    });
                    pr.observe(rt, {
                      childList: !0
                    }), _e.push(pr), rt = rt.parentElement;
                  }
                return (Xe = document.createElement("iframe")).setAttribute("name", "__detect_close_" + st() + "__"), Xe.style.display = "none", Un(Xe).then(function(Rt) {
                  (pe = B(Rt)).addEventListener("unload", ut);
                }), Ue.appendChild(Xe), lt = Nr(function() {
                  gr(Ue) && ut();
                }, 1e3), {
                  cancel: Qe
                };
              }(De, function() {
                var Ue = new Error("Detected container element removed from DOM");
                return p.delay(1).then(function() {
                  if (!gr(De))
                    return M.all(Ue), k().then(Ye, Ne);
                  Ut(Ue);
                });
              });
              return M.register(function() {
                return Ve.cancel();
              }), M.register(function() {
                return Wr(De);
              }), ne = hn(De);
            }
          });
        }, Ui = function() {
          return {
            state: V,
            event: H,
            close: Ut,
            focus: br,
            resize: jr,
            onError: $r,
            updateProps: fs,
            show: It,
            hide: zt
          };
        }, no = function(I) {
          I === void 0 && (I = {});
          var _ = Et, $ = Ui();
          mr(U, I), function(j, ie, k, Te, Se) {
            var Ze = Te.state, De = Te.close, Ve = Te.focus, Ue = Te.event, me = Te.onError;
            eo(k, j, function(Be, _e, lt) {
              var Xe = !1, pe = lt;
              Object.defineProperty(ie, Be, {
                configurable: !0,
                enumerable: !0,
                get: function() {
                  return Xe ? pe : (Xe = !0, function() {
                    if (!_e) return pe;
                    var Qe = _e.alias;
                    if (Qe && !Gt(lt) && Gt(k[Qe]) && (pe = k[Qe]), _e.value && (pe = _e.value({
                      props: ie,
                      state: Ze,
                      close: De,
                      focus: Ve,
                      event: Ue,
                      onError: me,
                      container: Se
                    })), !_e.default || Gt(pe) || Gt(k[Be]) || (pe = _e.default({
                      props: ie,
                      state: Ze,
                      close: De,
                      focus: Ve,
                      event: Ue,
                      onError: me,
                      container: Se
                    })), Gt(pe)) {
                      if (_e.type === be.ARRAY ? !Array.isArray(pe) : typeof pe !== _e.type) throw new TypeError("Prop is not of type " + _e.type + ": " + Be);
                    } else if (_e.required !== !1 && !Gt(k[Be])) throw new Error('Expected prop "' + Be + '" to be defined');
                    return Gt(pe) && _e.decorate && (pe = _e.decorate({
                      value: pe,
                      props: ie,
                      state: Ze,
                      close: De,
                      focus: Ve,
                      event: Ue,
                      onError: me,
                      container: Se
                    })), pe;
                  }());
                }
              });
            }), eo(ie, j, Ie);
          }(h, G, U, $, _);
        }, fs = function(I) {
          return no(I), z.then(function() {
            var _ = Me, $ = le;
            if (_ && $ && Nt) return ct(Nt).then(function(j) {
              return _.updateProps(j).catch(function(ie) {
                return Ai($).then(function(k) {
                  if (!k) throw ie;
                });
              });
            });
          });
        }, Bi = function(I) {
          return Lt ? Lt(I) : p.try(function() {
            return Bo(I);
          }).then(function(_) {
            return Bn(_) && (_ = function $(j) {
              var ie = function(Ze) {
                var De = function(Ve) {
                  for (; Ve.parentNode; ) Ve = Ve.parentNode;
                  if (Bn(Ve)) return Ve;
                }(Ze);
                if (De && De.host) return De.host;
              }(j);
              if (!ie) throw new Error("Element is not in shadow dom");
              var k = "shadow-slot-" + st(), Te = document.createElement("slot");
              Te.setAttribute("name", k), j.appendChild(Te);
              var Se = document.createElement("div");
              return Se.setAttribute("slot", k), ie.appendChild(Se), Bn(ie) ? $(Se) : Se;
            }(_)), Et = _, hn(_);
          });
        };
        return {
          init: function() {
            (function() {
              H.on(Ce.RENDER, function() {
                return G.onRender();
              }), H.on(Ce.PRERENDER, function() {
                return G.onPrerender();
              }), H.on(Ce.DISPLAY, function() {
                return G.onDisplay();
              }), H.on(Ce.RENDERED, function() {
                return G.onRendered();
              }), H.on(Ce.PRERENDERED, function() {
                return G.onPrerendered();
              }), H.on(Ce.CLOSE, function() {
                return G.onClose();
              }), H.on(Ce.DESTROY, function() {
                return G.onDestroy();
              }), H.on(Ce.RESIZE, function() {
                return G.onResize();
              }), H.on(Ce.FOCUS, function() {
                return G.onFocus();
              }), H.on(Ce.PROPS, function(I) {
                return G.onProps(I);
              }), H.on(Ce.ERROR, function(I) {
                return G && G.onError ? G.onError(I) : Ne(I).then(function() {
                  setTimeout(function() {
                    throw I;
                  }, 1);
                });
              }), M.register(H.reset);
            })();
          },
          render: function(I) {
            var _ = I.target, $ = I.container, j = I.context, ie = I.rerender;
            return p.try(function() {
              var k = hr(), Te = O || hr();
              (function(K, ke, je) {
                if (K !== window) {
                  if (!ir(window, K)) throw new Error("Can only renderTo an adjacent frame");
                  var et = ae();
                  if (!wt(ke, et) && !L(K)) throw new Error("Can not render remotely to " + ke.toString() + " - can only render to " + et);
                  if (je && typeof je != "string") throw new Error("Container passed to renderTo must be a string selector, got " + typeof je + " }");
                }
              })(_, Te, $);
              var Se = p.try(function() {
                if (_ !== window) return function(K, ke) {
                  for (var je = {}, et = 0, pt = Object.keys(G); et < pt.length; et++) {
                    var qe = pt[et], St = h[qe];
                    St && St.allowDelegate && (je[qe] = G[qe]);
                  }
                  var nt = xt(ke, "zoid_delegate_" + y, {
                    uid: r,
                    overrides: {
                      props: je,
                      event: H,
                      close: Ut,
                      onError: $r,
                      getInternalState: $e,
                      setInternalState: He,
                      resolveInitPromise: Ye,
                      rejectInitPromise: Ne
                    }
                  }).then(function(ee) {
                    var te = ee.data.parent;
                    return M.register(function(F) {
                      if (!Le(ke)) return te.destroy(F);
                    }), te.getDelegateOverrides();
                  }).catch(function(ee) {
                    throw new Error(`Unable to delegate rendering. Possibly the component is not loaded in the target window.

` + wr(ee));
                  });
                  return Lt = function() {
                    for (var ee = arguments.length, te = new Array(ee), F = 0; F < ee; F++) te[F] = arguments[F];
                    return nt.then(function(oe) {
                      return oe.getProxyContainer.apply(oe, te);
                    });
                  }, Qt = function() {
                    for (var ee = arguments.length, te = new Array(ee), F = 0; F < ee; F++) te[F] = arguments[F];
                    return nt.then(function(oe) {
                      return oe.renderContainer.apply(oe, te);
                    });
                  }, Zt = function() {
                    for (var ee = arguments.length, te = new Array(ee), F = 0; F < ee; F++) te[F] = arguments[F];
                    return nt.then(function(oe) {
                      return oe.show.apply(oe, te);
                    });
                  }, Xt = function() {
                    for (var ee = arguments.length, te = new Array(ee), F = 0; F < ee; F++) te[F] = arguments[F];
                    return nt.then(function(oe) {
                      return oe.hide.apply(oe, te);
                    });
                  }, bt = function() {
                    for (var ee = arguments.length, te = new Array(ee), F = 0; F < ee; F++) te[F] = arguments[F];
                    return nt.then(function(oe) {
                      return oe.watchForUnload.apply(oe, te);
                    });
                  }, K === We.IFRAME ? (Ot = function() {
                    for (var ee = arguments.length, te = new Array(ee), F = 0; F < ee; F++) te[F] = arguments[F];
                    return nt.then(function(oe) {
                      return oe.getProxyWindow.apply(oe, te);
                    });
                  }, kt = function() {
                    for (var ee = arguments.length, te = new Array(ee), F = 0; F < ee; F++) te[F] = arguments[F];
                    return nt.then(function(oe) {
                      return oe.openFrame.apply(oe, te);
                    });
                  }, er = function() {
                    for (var ee = arguments.length, te = new Array(ee), F = 0; F < ee; F++) te[F] = arguments[F];
                    return nt.then(function(oe) {
                      return oe.openPrerenderFrame.apply(oe, te);
                    });
                  }, fr = function() {
                    for (var ee = arguments.length, te = new Array(ee), F = 0; F < ee; F++) te[F] = arguments[F];
                    return nt.then(function(oe) {
                      return oe.prerender.apply(oe, te);
                    });
                  }, lr = function() {
                    for (var ee = arguments.length, te = new Array(ee), F = 0; F < ee; F++) te[F] = arguments[F];
                    return nt.then(function(oe) {
                      return oe.open.apply(oe, te);
                    });
                  }, de = function() {
                    for (var ee = arguments.length, te = new Array(ee), F = 0; F < ee; F++) te[F] = arguments[F];
                    return nt.then(function(oe) {
                      return oe.openPrerender.apply(oe, te);
                    });
                  }) : K === We.POPUP && (dr = function() {
                    for (var ee = arguments.length, te = new Array(ee), F = 0; F < ee; F++) te[F] = arguments[F];
                    return nt.then(function(oe) {
                      return oe.setProxyWin.apply(oe, te);
                    });
                  }), nt;
                }(j, _);
              }), Ze = G.window, De = Ni(), Ve = Oi(h, G, "post"), Ue = H.trigger(Ce.RENDER), me = Bi($), Be = Pt(), _e = me.then(function() {
                return no();
              }), lt = _e.then(function() {
                return Oi(h, G, "get").then(function(K) {
                  return function(ke, je) {
                    var et = je.query || {}, pt = je.hash || {}, qe, St, nt = ke.split("#");
                    St = nt[1];
                    var ee = (qe = nt[0]).split("?");
                    qe = ee[0];
                    var te = Uo(ee[1], et), F = Uo(St, pt);
                    return te && (qe = qe + "?" + te), F && (qe = qe + "#" + F), qe;
                  }(On(yr()), {
                    query: K
                  });
                });
              }), Xe = Be.then(function(K) {
                return function(je) {
                  var et = je === void 0 ? {} : je, pt = et.proxyWin, qe = et.initialChildDomain, St = et.childDomainMatch, nt = et.target, ee = nt === void 0 ? window : nt, te = et.context;
                  return function(F) {
                    var oe = F === void 0 ? {} : F, oo = oe.proxyWin, gs = oe.childDomainMatch, ys = oe.context;
                    return ct(oe.initialChildDomain).then(function(Es) {
                      return {
                        uid: r,
                        context: ys,
                        tag: R,
                        childDomainMatch: gs,
                        version: "10_3_3",
                        props: Es,
                        exports: ($i = oo, {
                          init: function(bs) {
                            return wn(this.origin, bs);
                          },
                          close: Ut,
                          checkClose: function() {
                            return Ai($i);
                          },
                          resize: jr,
                          onError: $r,
                          show: It,
                          hide: zt,
                          export: Mi
                        })
                      };
                      var $i;
                    });
                  }({
                    proxyWin: pt,
                    initialChildDomain: qe,
                    childDomainMatch: St,
                    context: te
                  }).then(function(F) {
                    var oe = bi({
                      data: F,
                      metaData: {
                        windowRef: Br(ee, qe, te, pt)
                      },
                      sender: {
                        domain: ae(window)
                      },
                      receiver: {
                        win: pt,
                        domain: St
                      },
                      passByReference: qe === ae()
                    }), oo = oe.serializedData;
                    return M.register(oe.cleanReference), oo;
                  });
                }({
                  proxyWin: (ke = {
                    proxyWin: K,
                    initialChildDomain: k,
                    childDomainMatch: Te,
                    target: _,
                    context: j
                  }).proxyWin,
                  initialChildDomain: ke.initialChildDomain,
                  childDomainMatch: ke.childDomainMatch,
                  target: ke.target,
                  context: ke.context
                }).then(function(je) {
                  return Ri({
                    name: y,
                    serializedPayload: je
                  });
                });
                var ke;
              }), pe = Xe.then(function(K) {
                return ft(j, {
                  windowName: K
                });
              }), Qe = zr(j), ut = p.hash({
                proxyContainer: me,
                proxyFrame: pe,
                proxyPrerenderFrame: Qe
              }).then(function(K) {
                return zi(K.proxyContainer, {
                  context: j,
                  proxyFrame: K.proxyFrame,
                  proxyPrerenderFrame: K.proxyPrerenderFrame,
                  rerender: ie
                });
              }).then(function(K) {
                return K;
              }), rt = p.hash({
                windowName: Xe,
                proxyFrame: pe,
                proxyWin: Be
              }).then(function(K) {
                var ke = K.proxyWin;
                return Ze ? ke : _i(j, {
                  windowName: K.windowName,
                  proxyWin: ke,
                  proxyFrame: K.proxyFrame
                });
              }), pr = p.hash({
                proxyWin: rt,
                proxyPrerenderFrame: Qe
              }).then(function(K) {
                return Ur(j, K.proxyWin, K.proxyPrerenderFrame);
              }), Rt = rt.then(function(K) {
                return le = K, dt(K);
              }), At = p.hash({
                proxyPrerenderWin: pr,
                state: Rt
              }).then(function(K) {
                return Li(K.proxyPrerenderWin, {
                  context: j
                });
              }), ji = p.hash({
                proxyWin: rt,
                windowName: Xe
              }).then(function(K) {
                if (Ze) return K.proxyWin.setName(K.windowName);
              }), ls = p.hash({
                body: Ve
              }).then(function(K) {
                return n.method ? n.method : Object.keys(K.body).length ? "post" : "get";
              }), qi = p.hash({
                proxyWin: rt,
                windowUrl: lt,
                body: Ve,
                method: ls,
                windowName: ji,
                prerender: At
              }).then(function(K) {
                return K.proxyWin.setLocation(K.windowUrl, {
                  method: K.method,
                  body: K.body
                });
              }), hs = rt.then(function(K) {
                (function ke(je, et) {
                  var pt = !1;
                  return M.register(function() {
                    pt = !0;
                  }), p.delay(2e3).then(function() {
                    return je.isClosed();
                  }).then(function(qe) {
                    if (!pt) {
                      if (et === We.POPUP && qe) return Ut(new Error("Detected popup close"));
                      var St = !!(Et && gr(Et));
                      return et === We.IFRAME && qe && (St || Kt) ? Ut(new Error("Detected iframe close")) : ke(je, et);
                    }
                  });
                })(K, j);
              }), ps = p.hash({
                container: ut,
                prerender: At
              }).then(function() {
                return H.trigger(Ce.DISPLAY);
              }), vs = rt.then(function(K) {
                return function(ke, je, et) {
                  return p.try(function() {
                    return ke.awaitWindow();
                  }).then(function(pt) {
                    if (Jt && Jt.needsBridge({
                      win: pt,
                      domain: je
                    }) && !Jt.hasBridge(je, je)) {
                      var qe = typeof n.bridgeUrl == "function" ? n.bridgeUrl({
                        props: G
                      }) : n.bridgeUrl;
                      if (!qe) throw new Error("Bridge needed to render " + et);
                      var St = Wt(qe);
                      return Jt.linkUrl(pt, je), Jt.openBridge(On(qe), St);
                    }
                  });
                }(K, k, j);
              }), ws = qi.then(function() {
                return p.try(function() {
                  var K = G.timeout;
                  if (K) return z.timeout(K, new Error("Loading component timed out after " + K + " milliseconds"));
                });
              }), ms = z.then(function() {
                return Kt = !0, H.trigger(Ce.RENDERED);
              });
              return p.hash({
                initPromise: z,
                buildUrlPromise: lt,
                onRenderPromise: Ue,
                getProxyContainerPromise: me,
                openFramePromise: pe,
                openPrerenderFramePromise: Qe,
                renderContainerPromise: ut,
                openPromise: rt,
                openPrerenderPromise: pr,
                setStatePromise: Rt,
                prerenderPromise: At,
                loadUrlPromise: qi,
                buildWindowNamePromise: Xe,
                setWindowNamePromise: ji,
                watchForClosePromise: hs,
                onDisplayPromise: ps,
                openBridgePromise: vs,
                runTimeoutPromise: ws,
                onRenderedPromise: ms,
                delegatePromise: Se,
                watchForUnloadPromise: De,
                finalSetPropsPromise: _e
              });
            }).catch(function(k) {
              return p.all([$r(k), qr(k)]).then(function() {
                throw k;
              }, function() {
                throw k;
              });
            }).then(Ie);
          },
          destroy: qr,
          getProps: function() {
            return G;
          },
          setProps: no,
          export: Mi,
          getHelpers: Ui,
          getDelegateOverrides: function() {
            return p.try(function() {
              return {
                getProxyContainer: Bi,
                show: It,
                hide: zt,
                renderContainer: zi,
                getProxyWindow: Pt,
                watchForUnload: Ni,
                openFrame: ft,
                openPrerenderFrame: zr,
                prerender: Li,
                open: _i,
                openPrerender: Ur,
                setProxyWin: dt
              };
            });
          },
          getExports: function() {
            return W({
              getExports: function() {
                return Wi;
              }
            });
          }
        };
      }
      var ts = {
        register: function(e, r, n, i) {
          var a = i.React, c = i.ReactDOM;
          return function(u) {
            b(h, u);
            function h() {
              return u.apply(this, arguments) || this;
            }
            var l = h.prototype;
            return l.render = function() {
              return a.createElement("div", null);
            }, l.componentDidMount = function() {
              var g = c.findDOMNode(this), R = n(mr({}, this.props));
              R.render(g, We.IFRAME), this.setState({
                parent: R
              });
            }, l.componentDidUpdate = function() {
              this.state && this.state.parent && this.state.parent.updateProps(mr({}, this.props)).catch(Ie);
            }, h;
          }(a.Component);
        }
      }, rs = {
        register: function(e, r, n, i) {
          return i.component(e, {
            render: function(a) {
              return a("div");
            },
            inheritAttrs: !1,
            mounted: function() {
              var a = this.$el;
              this.parent = n(w({}, (c = this.$attrs, Object.keys(c).reduce(function(u, h) {
                var l = c[h];
                return h === "style-object" || h === "styleObject" ? (u.style = l, u.styleObject = l) : h.includes("-") ? u[An(h)] = l : u[h] = l, u;
              }, {}))));
              var c;
              this.parent.render(a, We.IFRAME);
            },
            watch: {
              $attrs: {
                handler: function() {
                  this.parent && this.$attrs && this.parent.updateProps(w({}, this.$attrs)).catch(Ie);
                },
                deep: !0
              }
            }
          });
        }
      }, ns = {
        register: function(e, r, n) {
          return {
            template: "<div></div>",
            inheritAttrs: !1,
            mounted: function() {
              var i = this.$el;
              this.parent = n(w({}, (a = this.$attrs, Object.keys(a).reduce(function(c, u) {
                var h = a[u];
                return u === "style-object" || u === "styleObject" ? (c.style = h, c.styleObject = h) : u.includes("-") ? c[An(u)] = h : c[u] = h, c;
              }, {}))));
              var a;
              this.parent.render(i, We.IFRAME);
            },
            watch: {
              $attrs: {
                handler: function() {
                  this.parent && this.$attrs && this.parent.updateProps(w({}, this.$attrs)).catch(Ie);
                },
                deep: !0
              }
            }
          };
        }
      }, os = {
        register: function(e, r, n, i) {
          return i.module(e, []).directive(An(e), function() {
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
                var R = function() {
                  return on(h.props, function(v) {
                    return typeof v == "function" ? function() {
                      var P = v.apply(this, arguments);
                      return g(), P;
                    } : v;
                  });
                }, y = n(R());
                y.render(l[0], We.IFRAME), h.$watch(function() {
                  y.updateProps(R()).catch(Ie);
                });
              }]
            };
          });
        }
      }, is = {
        register: function(e, r, n, i) {
          var a = i.Component, c = i.NgModule, u = i.ElementRef, h = i.NgZone, l = i.Inject, g = function() {
            function y(P, T) {
              this.elementRef = void 0, this.internalProps = void 0, this.parent = void 0, this.props = void 0, this.zone = void 0, this._props = void 0, this._props = {}, this.elementRef = P, this.zone = T;
            }
            var v = y.prototype;
            return v.getProps = function() {
              var P = this;
              return on(w({}, this.internalProps, this.props), function(T) {
                if (typeof T == "function") {
                  var x = P.zone;
                  return function() {
                    var O = arguments, W = this;
                    return x.run(function() {
                      return T.apply(W, O);
                    });
                  };
                }
                return T;
              });
            }, v.ngOnInit = function() {
              var P = this.elementRef.nativeElement;
              this.parent = n(this.getProps()), this.parent.render(P, We.IFRAME);
            }, v.ngDoCheck = function() {
              this.parent && !function(P, T) {
                var x = {};
                for (var O in P) if (P.hasOwnProperty(O) && (x[O] = !0, P[O] !== T[O]))
                  return !1;
                for (var W in T) if (!x[W]) return !1;
                return !0;
              }(this._props, this.props) && (this._props = w({}, this.props), this.parent.updateProps(this.getProps()));
            }, y;
          }();
          g.annotations = void 0, g.parameters = void 0, g.parameters = [[new l(u)], [new l(h)]], g.annotations = [new a({
            selector: e,
            template: "<div></div>",
            inputs: ["props"]
          })];
          var R = function() {
          };
          return R.annotations = void 0, R.annotations = [new c({
            declarations: [g],
            exports: [g]
          })], R;
        }
      };
      function as(e) {
        var r = e.uid, n = e.frame, i = e.prerenderFrame, a = e.doc, c = e.props, u = e.event, h = e.dimensions, l = h.width, g = h.height;
        if (n && i) {
          var R = a.createElement("div");
          R.setAttribute("id", r);
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
        `)), R.appendChild(n), R.appendChild(i), R.appendChild(y), i.classList.add("zoid-visible"), n.classList.add("zoid-invisible"), u.on(Ce.RENDERED, function() {
            i.classList.remove("zoid-visible"), i.classList.add("zoid-invisible"), n.classList.remove("zoid-invisible"), n.classList.add("zoid-visible"), setTimeout(function() {
              Wr(i);
            }, 1);
          }), u.on(Ce.RESIZE, function(v) {
            var P = v.width, T = v.height;
            typeof P == "number" && (R.style.width = Ko(P)), typeof T == "number" && (R.style.height = Ko(T));
          }), R;
        }
      }
      function ss(e) {
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
      var to = an(), ro = an();
      function cs(e) {
        var r = function(T) {
          var x = T.tag, O = T.url, W = T.domain, z = T.bridgeUrl, J = T.props, M = J === void 0 ? {} : J, V = T.dimensions, U = V === void 0 ? {} : V, re = T.autoResize, H = re === void 0 ? {} : re, he = T.allowedParentDomains, ue = he === void 0 ? "*" : he, Q = T.attributes, G = Q === void 0 ? {} : Q, le = T.defaultContext, ne = le === void 0 ? We.IFRAME : le, Me = T.containerTemplate, Nt = Me === void 0 ? as : Me, Et = T.prerenderTemplate, Kt = Et === void 0 ? ss : Et, Yt = T.validate, Lt = T.eligible, Zt = Lt === void 0 ? function() {
            return {
              eligible: !0
            };
          } : Lt, Xt = T.logger, ur = Xt === void 0 ? {
            info: Ie
          } : Xt, Qt = T.exports, Ot = Qt === void 0 ? Ie : Qt, dr = T.method, kt = T.children, er = kt === void 0 ? function() {
            return {};
          } : kt, fr = x.replace(/-/g, "_"), lr = w({}, {
            window: {
              type: be.OBJECT,
              sendToChild: !1,
              required: !1,
              allowDelegate: !0,
              validate: function(de) {
                var bt = de.value;
                if (!ar(bt) && !yt.isProxyWindow(bt)) throw new Error("Expected Window or ProxyWindow");
                if (ar(bt)) {
                  if (Le(bt)) throw new Error("Window is closed");
                  if (!L(bt)) throw new Error("Window is not same domain");
                }
              },
              decorate: function(de) {
                return Fr(de.value);
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
              decorate: cr
            },
            onRendered: {
              type: be.FUNCTION,
              required: !1,
              sendToChild: !1,
              default: Ft,
              decorate: cr
            },
            onRender: {
              type: be.FUNCTION,
              required: !1,
              sendToChild: !1,
              default: Ft,
              decorate: cr
            },
            onPrerendered: {
              type: be.FUNCTION,
              required: !1,
              sendToChild: !1,
              default: Ft,
              decorate: cr
            },
            onPrerender: {
              type: be.FUNCTION,
              required: !1,
              sendToChild: !1,
              default: Ft,
              decorate: cr
            },
            onClose: {
              type: be.FUNCTION,
              required: !1,
              sendToChild: !1,
              allowDelegate: !0,
              default: Ft,
              decorate: cr
            },
            onDestroy: {
              type: be.FUNCTION,
              required: !1,
              sendToChild: !1,
              allowDelegate: !0,
              default: Ft,
              decorate: cr
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
              childDecorate: function(de) {
                return de.close;
              }
            },
            focus: {
              type: be.FUNCTION,
              required: !1,
              sendToChild: !1,
              childDecorate: function(de) {
                return de.focus;
              }
            },
            resize: {
              type: be.FUNCTION,
              required: !1,
              sendToChild: !1,
              childDecorate: function(de) {
                return de.resize;
              }
            },
            uid: {
              type: be.STRING,
              required: !1,
              sendToChild: !1,
              childDecorate: function(de) {
                return de.uid;
              }
            },
            tag: {
              type: be.STRING,
              required: !1,
              sendToChild: !1,
              childDecorate: function(de) {
                return de.tag;
              }
            },
            getParent: {
              type: be.FUNCTION,
              required: !1,
              sendToChild: !1,
              childDecorate: function(de) {
                return de.getParent;
              }
            },
            getParentDomain: {
              type: be.FUNCTION,
              required: !1,
              sendToChild: !1,
              childDecorate: function(de) {
                return de.getParentDomain;
              }
            },
            show: {
              type: be.FUNCTION,
              required: !1,
              sendToChild: !1,
              childDecorate: function(de) {
                return de.show;
              }
            },
            hide: {
              type: be.FUNCTION,
              required: !1,
              sendToChild: !1,
              childDecorate: function(de) {
                return de.hide;
              }
            },
            export: {
              type: be.FUNCTION,
              required: !1,
              sendToChild: !1,
              childDecorate: function(de) {
                return de.export;
              }
            },
            onError: {
              type: be.FUNCTION,
              required: !1,
              sendToChild: !1,
              childDecorate: function(de) {
                return de.onError;
              }
            },
            onProps: {
              type: be.FUNCTION,
              required: !1,
              sendToChild: !1,
              childDecorate: function(de) {
                return de.onProps;
              }
            },
            getSiblings: {
              type: be.FUNCTION,
              required: !1,
              sendToChild: !1,
              childDecorate: function(de) {
                return de.getSiblings;
              }
            }
          }, M);
          if (!Nt) throw new Error("Container template required");
          return {
            name: fr,
            tag: x,
            url: O,
            domain: W,
            bridgeUrl: z,
            method: dr,
            propsDef: lr,
            dimensions: U,
            autoResize: H,
            allowedParentDomains: ue,
            attributes: G,
            defaultContext: ne,
            containerTemplate: Nt,
            prerenderTemplate: Kt,
            validate: Yt,
            logger: ur,
            eligible: Zt,
            children: er,
            exports: typeof Ot == "function" ? Ot : function(de) {
              for (var bt = de.getExports, fe = {}, Ke = function() {
                var Ne = Ye[ze], ct = Ot[Ne].type, $e = bt().then(function(He) {
                  return He[Ne];
                });
                fe[Ne] = ct === be.FUNCTION ? function() {
                  for (var He = arguments.length, Pt = new Array(He), dt = 0; dt < He; dt++) Pt[dt] = arguments[dt];
                  return $e.then(function(It) {
                    return It.apply(void 0, Pt);
                  });
                } : $e;
              }, ze = 0, Ye = Object.keys(Ot); ze < Ye.length; ze++) Ke();
              return fe;
            }
          };
        }(e), n = r.name, i = r.tag, a = r.defaultContext, c = r.propsDef, u = r.eligible, h = r.children, l = Lr(window), g = {}, R = [], y = function() {
          if (function(x) {
            try {
              return kn(window.name).name === x;
            } catch {
            }
            return !1;
          }(n)) {
            var T = Ti().payload;
            if (T.tag === i && wt(T.childDomainMatch, ae())) return !0;
          }
          return !1;
        }, v = Vt(function() {
          if (y()) {
            if (window.xprops)
              throw delete l.components[i], new Error("Can not register " + n + " as child - child already registered");
            var T = function(x) {
              var O = x.tag, W = x.propsDef, z = x.autoResize, J = x.allowedParentDomains, M = [], V = Ti(), U = V.parent, re = V.payload, H = U.win, he = U.domain, ue, Q = new p(), G = re.version, le = re.uid, ne = re.exports, Me = re.context, Nt = re.props;
              if (!function(fe, Ke) {
                if (!/_/.test(fe) || !/_/.test("10_3_3")) throw new Error("Versions are in an invalid format (" + fe + ", 10_3_3)");
                return fe.split("_")[0] === "10_3_3".split("_")[0];
              }(G)) throw new Error("Parent window has zoid version " + G + ", child window has version 10_3_3");
              var Et = ne.show, Kt = ne.hide, Yt = ne.close, Lt = ne.onError, Zt = ne.checkClose, Xt = ne.export, ur = ne.resize, Qt = ne.init, Ot = function() {
                return H;
              }, dr = function() {
                return he;
              }, kt = function(fe) {
                return M.push(fe), {
                  cancel: function() {
                    M.splice(M.indexOf(fe), 1);
                  }
                };
              }, er = function(fe) {
                return ur.fireAndForget({
                  width: fe.width,
                  height: fe.height
                });
              }, fr = function(fe) {
                return Q.resolve(fe), Xt(fe);
              }, lr = function(fe) {
                var Ke = (fe === void 0 ? {} : fe).anyParent, ze = [], Ye = ue.parent;
                if (Ke === void 0 && (Ke = !Ye), !Ke && !Ye) throw new Error("No parent found for " + O + " child");
                for (var Ne = 0, ct = Je(window); Ne < ct.length; Ne++) {
                  var $e = ct[Ne];
                  if (L($e)) {
                    var He = B($e).xprops;
                    if (He && Ot() === He.getParent()) {
                      var Pt = He.parent;
                      if (Ke || !Ye || Pt && Pt.uid === Ye.uid) {
                        var dt = Ei($e, function(It) {
                          return It.exports;
                        });
                        ze.push({
                          props: He,
                          exports: dt
                        });
                      }
                    }
                  }
                }
                return ze;
              }, de = function(fe, Ke, ze) {
                ze === void 0 && (ze = !1);
                var Ye = function(ct, $e, He, Pt, dt, It) {
                  It === void 0 && (It = !1);
                  for (var zt = {}, yr = 0, Er = Object.keys(He); yr < Er.length; yr++) {
                    var hr = Er[yr], ft = $e[hr], zr = ft && ft.trustedDomains && ft.trustedDomains.length > 0 ? ft.trustedDomains.reduce(function(wn, jr) {
                      return wn || wt(jr, ae(window));
                    }, !1) : Pt === ae(window) || L(ct);
                    if ((!ft || !ft.sameDomain || zr) && (!ft || !ft.trustedDomains || zr)) {
                      var Ur = Si($e, 0, hr, He[hr], dt);
                      zt[hr] = Ur, ft && ft.alias && !zt[ft.alias] && (zt[ft.alias] = Ur);
                    }
                  }
                  if (!It) for (var br = 0, vn = Object.keys($e); br < vn.length; br++) {
                    var Br = vn[br];
                    He.hasOwnProperty(Br) || (zt[Br] = Si($e, 0, Br, void 0, dt));
                  }
                  return zt;
                }(H, W, fe, Ke, {
                  tag: O,
                  show: Et,
                  hide: Kt,
                  close: Yt,
                  focus: es,
                  onError: Lt,
                  resize: er,
                  getSiblings: lr,
                  onProps: kt,
                  getParent: Ot,
                  getParentDomain: dr,
                  uid: le,
                  export: fr
                }, ze);
                ue ? mr(ue, Ye) : ue = Ye;
                for (var Ne = 0; Ne < M.length; Ne++) (0, M[Ne])(ue);
              }, bt = function(fe) {
                return p.try(function() {
                  return de(fe, he, !0);
                });
              };
              return {
                init: function() {
                  return p.try(function() {
                    var fe = "";
                    return L(H) && (fe = function(Ke) {
                      var ze = Ke.componentName, Ye = Ke.parentComponentWindow, Ne = Pi({
                        data: kn(window.name).serializedInitialPayload,
                        sender: {
                          win: Ye
                        },
                        basic: !0
                      }), ct = Ne.sender;
                      if (Ne.reference.type === "uid" || Ne.metaData.windowRef.type === "global") {
                        var $e = Ri({
                          name: ze,
                          serializedPayload: bi({
                            data: Ne.data,
                            metaData: {
                              windowRef: ka(Ye)
                            },
                            sender: {
                              domain: ct.domain
                            },
                            receiver: {
                              win: window,
                              domain: ae()
                            },
                            basic: !0
                          }).serializedData
                        });
                        return window.name = $e, $e;
                      }
                    }({
                      componentName: x.name,
                      parentComponentWindow: H
                    }) || ""), Lr(window).exports = x.exports({
                      getExports: function() {
                        return Q;
                      }
                    }), function(Ke, ze) {
                      if (!wt(Ke, ze)) throw new Error("Can not be rendered by domain: " + ze);
                    }(J, he), ti(H), function() {
                      window.addEventListener("beforeunload", function() {
                        Zt.fireAndForget();
                      }), window.addEventListener("unload", function() {
                        Zt.fireAndForget();
                      }), xo(H, function() {
                        xi();
                      });
                    }(), Qt({
                      name: fe,
                      updateProps: bt,
                      close: xi
                    });
                  }).then(function() {
                    return (fe = z.width, Ke = fe !== void 0 && fe, ze = z.height, Ye = ze !== void 0 && ze, Ne = z.element, Bo(Ne === void 0 ? "body" : Ne).catch(Ie).then(function(ct) {
                      return {
                        width: Ke,
                        height: Ye,
                        element: ct
                      };
                    })).then(function(ct) {
                      var $e = ct.width, He = ct.height, Pt = ct.element;
                      Pt && ($e || He) && Me !== We.POPUP && Vo(Pt, function(dt) {
                        er({
                          width: $e ? dt.width : void 0,
                          height: He ? dt.height : void 0
                        });
                      }, {
                        width: $e,
                        height: He
                      });
                    });
                    var fe, Ke, ze, Ye, Ne;
                  }).catch(function(fe) {
                    Lt(fe);
                  });
                },
                getProps: function() {
                  return ue || (de(Nt, he), ue);
                }
              };
            }(r);
            return T.init(), T;
          }
        }), P = function T(x) {
          var O, W = "zoid-" + i + "-" + st(), z = x || {}, J = u({
            props: z
          }), M = J.eligible, V = J.reason, U = z.onDestroy;
          z.onDestroy = function() {
            if (O && M && R.splice(R.indexOf(O), 1), U) return U.apply(void 0, arguments);
          };
          var re = Ii({
            uid: W,
            options: r
          });
          re.init(), M ? re.setProps(z) : z.onDestroy && z.onDestroy(), to.register(function(ue) {
            return re.destroy(ue || new Error("zoid destroyed all components"));
          });
          var H = function(ue) {
            var Q = (ue === void 0 ? {} : ue).decorate;
            return T((Q === void 0 ? Ua : Q)(z));
          }, he = function(ue, Q, G) {
            return p.try(function() {
              if (!M) {
                var le = new Error(V || n + " component is not eligible");
                return re.destroy(le).then(function() {
                  throw le;
                });
              }
              if (!ar(ue)) throw new Error("Must pass window to renderTo");
              return function(ne, Me) {
                return p.try(function() {
                  if (ne.window) return Fr(ne.window).getType();
                  if (Me) {
                    if (Me !== We.IFRAME && Me !== We.POPUP) throw new Error("Unrecognized context: " + Me);
                    return Me;
                  }
                  return a;
                });
              }(z, G);
            }).then(function(le) {
              if (Q = function(ne, Me) {
                if (Me) {
                  if (typeof Me != "string" && !In(Me)) throw new TypeError("Expected string or element selector to be passed");
                  return Me;
                }
                if (ne === We.POPUP) return "body";
                throw new Error("Expected element to be passed to render iframe");
              }(le, Q), ue !== window && typeof Q != "string") throw new Error("Must pass string element when rendering to another window");
              return re.render({
                target: ue,
                container: Q,
                context: le,
                rerender: function() {
                  var ne = H();
                  return mr(O, ne), ne.renderTo(ue, Q, G);
                }
              });
            }).catch(function(le) {
              return re.destroy(le).then(function() {
                throw le;
              });
            });
          };
          return O = w({}, re.getExports(), re.getHelpers(), function() {
            for (var ue = h(), Q = {}, G = function() {
              var Me = ne[le], Nt = ue[Me];
              Q[Me] = function(Et) {
                var Kt = re.getProps(), Yt = w({}, Et, {
                  parent: {
                    uid: W,
                    props: Kt,
                    export: re.export
                  }
                });
                return Nt(Yt);
              };
            }, le = 0, ne = Object.keys(ue); le < ne.length; le++) G();
            return Q;
          }(), {
            isEligible: function() {
              return M;
            },
            clone: H,
            render: function(ue, Q) {
              return he(window, ue, Q);
            },
            renderTo: function(ue, Q, G) {
              return he(ue, Q, G);
            }
          }), M && R.push(O), O;
        };
        if (v(), function() {
          var T = Mt("zoid_allow_delegate_" + n, function() {
            return !0;
          }), x = Mt("zoid_delegate_" + n, function(O) {
            var W = O.data;
            return {
              parent: Ii({
                uid: W.uid,
                options: r,
                overrides: W.overrides,
                parentWin: O.source
              })
            };
          });
          ro.register(T.cancel), ro.register(x.cancel);
        }(), l.components = l.components || {}, l.components[i]) throw new Error("Can not register multiple components with the same tag: " + i);
        return l.components[i] = !0, {
          init: P,
          instances: R,
          driver: function(T, x) {
            var O = {
              react: ts,
              angular: os,
              vue: rs,
              vue3: ns,
              angular2: is
            };
            if (!O[T]) throw new Error("Could not find driver for framework: " + T);
            return g[T] || (g[T] = O[T].register(i, c, P, x)), g[T];
          },
          isChild: y,
          canRenderTo: function(T) {
            return xt(T, "zoid_allow_delegate_" + n).then(function(x) {
              return x.data;
            }).catch(function() {
              return !1;
            });
          },
          registerChild: v
        };
      }
      var us = function(e) {
        (function() {
          _t().initialized || (_t().initialized = !0, c = (a = {
            on: Mt,
            send: xt
          }).on, u = a.send, (h = _t()).receiveMessage = h.receiveMessage || function(l) {
            return Xn(l, {
              on: c,
              send: u
            });
          }, function(l) {
            var g = l.on, R = l.send;
            we().getOrSet("postMessageListener", function() {
              return $o(window, "message", function(y) {
                (function(v, P) {
                  var T = P.on, x = P.send;
                  p.try(function() {
                    var O = v.source || v.sourceElement, W = v.origin || v.originalEvent && v.originalEvent.origin, z = v.data;
                    if (W === "null" && (W = "file://"), O) {
                      if (!W) throw new Error("Post message did not have origin domain");
                      Xn({
                        source: O,
                        origin: W,
                        data: z
                      }, {
                        on: T,
                        send: x
                      });
                    }
                  });
                })(y, {
                  on: g,
                  send: R
                });
              });
            });
          }({
            on: Mt,
            send: xt
          }), ui({
            on: Mt,
            send: xt,
            receiveMessage: Xn
          }), function(l) {
            var g = l.on, R = l.send;
            we("builtinListeners").getOrSet("helloListener", function() {
              var y = g("postrobot_hello", {
                domain: "*"
              }, function(P) {
                return Qo(P.source, {
                  domain: P.origin
                }), {
                  instanceID: Xo()
                };
              }), v = Ht();
              return v && qn(v, {
                send: R
              }).catch(function(P) {
              }), y;
            });
          }({
            on: Mt,
            send: xt
          }));
          var a, c, u, h;
        })();
        var r = cs(e), n = function(a) {
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
        Jt && Jt.destroyBridges();
        var r = to.all(e);
        return to = an(), r;
      }
      var Di = Ci;
      function ds(e) {
        return Di(), delete window.__zoid_10_3_3__, function() {
          (function() {
            for (var n = we("responseListeners"), i = 0, a = n.keys(); i < a.length; i++) {
              var c = a[i], u = n.get(c);
              u && (u.cancelled = !0), n.del(c);
            }
          })(), (r = we().get("postMessageListener")) && r.cancel();
          var r;
          delete window.__post_robot_11_0_0__;
        }(), ro.all(e);
      }
    }]);
  });
})(_a);
var Na = _a.exports;
const ra = Na.EVENT, Rr = {
  VISIBLE: "zoid-visible",
  INVISIBLE: "zoid-invisible"
};
function Vc({
  uid: t,
  frame: o,
  prerenderFrame: s,
  doc: d,
  props: f,
  event: m,
  dimensions: b
}) {
  const { width: w, height: S } = b, { top: C = 0, left: E = 0 } = f;
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
              width: ${w};
              height: ${S};
              z-index: 1049;
              border: none;
              top: ${C}px;
              left: ${E}px;
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

          #${t} > iframe.${Rr.INVISIBLE} {
              opacity: 0;
          }

          #${t} > iframe.${Rr.VISIBLE} {
              opacity: 1;
        }
      `)
  ), D.appendChild(o), D.appendChild(s), D.appendChild(N), s.classList.add(Rr.INVISIBLE), o.classList.add(Rr.INVISIBLE), m.on(ra.RENDERED, () => {
    setTimeout(() => {
      o.classList.remove(Rr.INVISIBLE), o.classList.add(Rr.VISIBLE);
    }, 100), setTimeout(() => {
      s.remove();
    }, 1);
  }), m.on(ra.RESIZE, ({ width: se, height: ce }) => {
    typeof se == "number" && (D.style.width = `${se}px`), typeof ce == "number" && (D.style.height = `${ce}px`);
  }), D;
}
function Gc(t) {
  return Na.create({
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
    containerTemplate: Vc
  });
}
function Jc(t) {
  return Gc(t.id)(t);
}
class Kc extends Error {
  constructor(o, s) {
    super(o, s), this.name = "FetchError", s != null && s.cause && !this.cause && (this.cause = s.cause);
  }
}
function Yc(t) {
  var S, C, E, D, N;
  const o = ((S = t.error) == null ? void 0 : S.message) || ((C = t.error) == null ? void 0 : C.toString()) || "", s = ((E = t.request) == null ? void 0 : E.method) || ((D = t.options) == null ? void 0 : D.method) || "GET", d = ((N = t.request) == null ? void 0 : N.url) || String(t.request) || "/", f = `[${s}] ${JSON.stringify(d)}`, m = t.response ? `${t.response.status} ${t.response.statusText}` : "<no response>", b = `${f}: ${m}${o ? ` ${o}` : ""}`, w = new Kc(
    b,
    t.error ? { cause: t.error } : void 0
  );
  for (const se of ["request", "options", "response"])
    Object.defineProperty(w, se, {
      get() {
        return t[se];
      }
    });
  for (const [se, ce] of [
    ["data", "_data"],
    ["status", "status"],
    ["statusCode", "status"],
    ["statusText", "statusText"],
    ["statusMessage", "statusText"]
  ])
    Object.defineProperty(w, se, {
      get() {
        return t.response && t.response[ce];
      }
    });
  return w;
}
const Zc = new Set(
  Object.freeze(["PATCH", "POST", "PUT", "DELETE"])
);
function na(t = "GET") {
  return Zc.has(t.toUpperCase());
}
function Xc(t) {
  if (t === void 0)
    return !1;
  const o = typeof t;
  return o === "string" || o === "number" || o === "boolean" || o === null ? !0 : o !== "object" ? !1 : Array.isArray(t) ? !0 : t.buffer ? !1 : t.constructor && t.constructor.name === "Object" || typeof t.toJSON == "function";
}
const Qc = /* @__PURE__ */ new Set([
  "image/svg",
  "application/xml",
  "application/xhtml",
  "application/html"
]), kc = /^application\/(?:[\w!#$%&*.^`~-]*\+)?json(;.+)?$/i;
function eu(t = "") {
  if (!t)
    return "json";
  const o = t.split(";").shift() || "";
  return kc.test(o) ? "json" : Qc.has(o) || o.startsWith("text/") ? "text" : "blob";
}
function tu(t, o, s = globalThis.Headers) {
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
function Aa(t = {}) {
  const {
    fetch: o = globalThis.fetch,
    Headers: s = globalThis.Headers,
    AbortController: d = globalThis.AbortController
  } = t;
  async function f(w) {
    const S = w.error && w.error.name === "AbortError" && !w.options.timeout || !1;
    if (w.options.retry !== !1 && !S) {
      let E;
      typeof w.options.retry == "number" ? E = w.options.retry : E = na(w.options.method) ? 0 : 1;
      const D = w.response && w.response.status || 500;
      if (E > 0 && (Array.isArray(w.options.retryStatusCodes) ? w.options.retryStatusCodes.includes(D) : ru.has(D))) {
        const N = w.options.retryDelay || 0;
        return N > 0 && await new Promise((se) => setTimeout(se, N)), m(w.request, {
          ...w.options,
          retry: E - 1
        });
      }
    }
    const C = Yc(w);
    throw Error.captureStackTrace && Error.captureStackTrace(C, m), C;
  }
  const m = async function(S, C = {}) {
    var se;
    const E = {
      request: S,
      options: tu(C, t.defaults, s),
      response: void 0,
      error: void 0
    };
    E.options.method = (se = E.options.method) == null ? void 0 : se.toUpperCase(), E.options.onRequest && await E.options.onRequest(E), typeof E.request == "string" && (E.options.baseURL && (E.request = Hs(E.request, E.options.baseURL)), (E.options.query || E.options.params) && (E.request = Jr(E.request, {
      ...E.options.params,
      ...E.options.query
    }))), E.options.body && na(E.options.method) && (Xc(E.options.body) ? (E.options.body = typeof E.options.body == "string" ? E.options.body : JSON.stringify(E.options.body), E.options.headers = new s(E.options.headers || {}), E.options.headers.has("content-type") || E.options.headers.set("content-type", "application/json"), E.options.headers.has("accept") || E.options.headers.set("accept", "application/json")) : (
      // ReadableStream Body
      ("pipeTo" in E.options.body && typeof E.options.body.pipeTo == "function" || // Node.js Stream Body
      typeof E.options.body.pipe == "function") && ("duplex" in E.options || (E.options.duplex = "half"))
    ));
    let D;
    if (!E.options.signal && E.options.timeout) {
      const ce = new d();
      D = setTimeout(
        () => ce.abort(),
        E.options.timeout
      ), E.options.signal = ce.signal;
    }
    try {
      E.response = await o(
        E.request,
        E.options
      );
    } catch (ce) {
      return E.error = ce, E.options.onRequestError && await E.options.onRequestError(E), await f(E);
    } finally {
      D && clearTimeout(D);
    }
    if (E.response.body && !nu.has(E.response.status) && E.options.method !== "HEAD") {
      const ce = (E.options.parseResponse ? "json" : E.options.responseType) || eu(E.response.headers.get("content-type") || "");
      switch (ce) {
        case "json": {
          const Ge = await E.response.text(), p = E.options.parseResponse || Da;
          E.response._data = p(Ge);
          break;
        }
        case "stream": {
          E.response._data = E.response.body;
          break;
        }
        default:
          E.response._data = await E.response[ce]();
      }
    }
    return E.options.onResponse && await E.options.onResponse(E), !E.options.ignoreResponseError && E.response.status >= 400 && E.response.status < 600 ? (E.options.onResponseError && await E.options.onResponseError(E), await f(E)) : E.response;
  }, b = async function(S, C) {
    return (await m(S, C))._data;
  };
  return b.raw = m, b.native = (...w) => o(...w), b.create = (w = {}) => Aa({
    ...t,
    defaults: {
      ...t.defaults,
      ...w
    }
  }), b;
}
const So = function() {
  if (typeof globalThis < "u")
    return globalThis;
  if (typeof self < "u")
    return self;
  if (typeof window < "u")
    return window;
  if (typeof global < "u")
    return global;
  throw new Error("unable to locate global object");
}(), ou = So.fetch || (() => Promise.reject(new Error("[ofetch] global.fetch is not supported!"))), iu = So.Headers, au = So.AbortController, su = Aa({ fetch: ou, Headers: iu, AbortController: au }), cu = su.create({
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
}), rr = {
  DEBUG: 0,
  INFO: 1,
  WARN: 2,
  ERROR: 3
};
function uu() {
  return (window == null ? void 0 : window.CSPM_LOG_LEVEL) || "INFO";
}
class Wa {
  constructor(o = "[APP]", s = uu()) {
    Tt(this, "prefix");
    Tt(this, "logLevel");
    this.prefix = o, this.logLevel = s;
  }
  setPrefix(o) {
    this.prefix = o;
  }
  debug(...o) {
    rr[this.logLevel] <= rr.DEBUG && console.log(`${this.prefix} [DEBUG]`, ...o);
  }
  info(...o) {
    rr[this.logLevel] <= rr.INFO && console.log(`${this.prefix} [INFO]`, ...o);
  }
  warn(...o) {
    rr[this.logLevel] <= rr.WARN && console.warn(`${this.prefix} [WARN]`, ...o);
  }
  error(...o) {
    rr[this.logLevel] <= rr.ERROR && console.error(`${this.prefix} [ERROR]`, ...o);
  }
}
const uo = new Wa("[HLSAdapter]");
function oa({ adsUrl: t, sdk: o, loader: s }) {
  return class extends s {
    constructor(f) {
      super(f);
    }
    load(f, m, b) {
      const w = b.onSuccess;
      b.onSuccess = async (S, C, E) => {
        if (E.type === "manifest" || E.type === "level" || E.type === "audioTrack") {
          const D = S.data;
          uo.debug("getLoader", "params", { url: S.url, type: E.type }), uo.debug("getLoader", `before 
`, D);
          const N = await this.modifyManifest(S.url, S.data, E.type);
          uo.debug("getLoader", `after 
`, N), S.data = N;
        }
        w(S, C, E);
      }, super.load(f, m, b);
    }
    async modifyManifest(f, m, b) {
      const w = {
        proxyAds: {
          uri: t,
          timeout: 2
        },
        log: {
          level: (window == null ? void 0 : window.CSPM_LOG_LEVEL) || "ERROR"
        }
      };
      try {
        return await o.loadSource({ config: w, manifest: m, masterUri: f });
      } catch (S) {
        return console.error("[LOG] ~ error:", S), m;
      }
    }
  };
}
function du() {
  var t = t || window;
  const o = new TextEncoder("utf-8"), s = new TextDecoder("utf-8");
  let d = new DataView(new ArrayBuffer(8));
  var f = [];
  class m {
    constructor() {
      this._callbackTimeouts = /* @__PURE__ */ new Map(), this._nextCallbackTimeoutID = 1;
      const w = () => new DataView(this._inst.exports.memory.buffer), S = (p) => {
        d.setBigInt64(0, p, !0);
        const A = d.getFloat64(0, !0);
        if (A === 0) return;
        if (!isNaN(A)) return A;
        const q = 0xffffffffn & p;
        return this._values[q];
      }, C = (p) => {
        let A = w().getBigUint64(p, !0);
        return S(A);
      }, E = (p) => {
        const A = 0x7ff80000n;
        if (typeof p == "number")
          return isNaN(p) ? A << 32n : p === 0 ? A << 32n | 1n : (d.setFloat64(0, p, !0), d.getBigInt64(0, !0));
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
        let q = this._ids.get(p);
        q === void 0 && (q = this._idPool.pop(), q === void 0 && (q = BigInt(this._values.length)), this._values[q] = p, this._goRefCounts[q] = 0, this._ids.set(p, q)), this._goRefCounts[q]++;
        let Y = 1n;
        switch (typeof p) {
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
      }, D = (p, A) => {
        let q = E(A);
        w().setBigUint64(p, q, !0);
      }, N = (p, A, q) => new Uint8Array(this._inst.exports.memory.buffer, p, A), se = (p, A, q) => {
        const Y = new Array(A);
        for (let Ee = 0; Ee < A; Ee++) Y[Ee] = C(p + 8 * Ee);
        return Y;
      }, ce = (p, A) => s.decode(new DataView(this._inst.exports.memory.buffer, p, A)), Ge = Date.now() - performance.now();
      this.importObject = {
        wasi_snapshot_preview1: {
          fd_write: function(p, A, q, Y) {
            let Ee = 0;
            if (p == 1)
              for (let xe = 0; xe < q; xe++) {
                let Fe = A + 8 * xe, ve = w().getUint32(Fe + 0, !0), Ae = w().getUint32(Fe + 4, !0);
                Ee += Ae;
                for (let Z = 0; Z < Ae; Z++) {
                  let Pe = w().getUint8(ve + Z);
                  if (Pe != 13) if (Pe == 10) {
                    let ae = s.decode(new Uint8Array(f));
                    f = [], console.log(ae);
                  } else f.push(Pe);
                }
              }
            else console.error("invalid file descriptor:", p);
            return w().setUint32(Y, Ee, !0), 0;
          },
          fd_close: () => 0,
          fd_fdstat_get: () => 0,
          fd_seek: () => 0,
          proc_exit: (p) => {
            if (!t.process) throw "trying to exit with code " + p;
            process.exit(p);
          },
          random_get: (p, A) => (crypto.getRandomValues(N(p, A)), 0)
        },
        gojs: {
          "runtime.ticks": () => Ge + performance.now(),
          "runtime.sleepTicks": (p) => {
            setTimeout(this._inst.exports.go_scheduler, p);
          },
          "syscall/js.finalizeRef": (p) => {
            const A = w().getUint32(S(p), !0);
            if (this._goRefCounts[A]--, this._goRefCounts[A] === 0) {
              const q = this._values[A];
              this._values[A] = null, this._ids.delete(q), this._idPool.push(A);
            }
          },
          "syscall/js.stringVal": (p, A) => {
            const q = ce(p, A);
            return E(q);
          },
          "syscall/js.valueGet": (p, A, q) => {
            let Y = ce(A, q), Ee = S(p), xe = Reflect.get(Ee, Y);
            return E(xe);
          },
          "syscall/js.valueSet": (p, A, q, Y) => {
            const Ee = S(p), xe = ce(A, q), Fe = S(Y);
            Reflect.set(Ee, xe, Fe);
          },
          "syscall/js.valueDelete": (p, A, q) => {
            const Y = S(p), Ee = ce(A, q);
            Reflect.deleteProperty(Y, Ee);
          },
          "syscall/js.valueIndex": (p, A) => E(Reflect.get(S(p), A)),
          "syscall/js.valueSetIndex": (p, A, q) => {
            Reflect.set(S(p), A, S(q));
          },
          "syscall/js.valueCall": (p, A, q, Y, Ee, xe, Fe) => {
            const ve = S(A), Ae = ce(q, Y), Z = se(Ee, xe);
            try {
              const Pe = Reflect.get(ve, Ae);
              D(p, Reflect.apply(Pe, ve, Z)), w().setUint8(p + 8, 1);
            } catch (Pe) {
              D(p, Pe), w().setUint8(p + 8, 0);
            }
          },
          "syscall/js.valueInvoke": (p, A, q, Y, Ee) => {
            try {
              const xe = S(A), Fe = se(q, Y);
              D(p, Reflect.apply(xe, void 0, Fe)), w().setUint8(p + 8, 1);
            } catch (xe) {
              D(p, xe), w().setUint8(p + 8, 0);
            }
          },
          "syscall/js.valueNew": (p, A, q, Y, Ee) => {
            const xe = S(A), Fe = se(q, Y);
            try {
              D(p, Reflect.construct(xe, Fe)), w().setUint8(p + 8, 1);
            } catch (ve) {
              D(p, ve), w().setUint8(p + 8, 0);
            }
          },
          "syscall/js.valueLength": (p) => S(p).length,
          "syscall/js.valuePrepareString": (p, A) => {
            const q = String(S(A)), Y = o.encode(q);
            D(p, Y), w().setInt32(p + 8, Y.length, !0);
          },
          "syscall/js.valueLoadString": (p, A, q, Y) => {
            const Ee = S(p);
            N(A, q).set(Ee);
          },
          "syscall/js.valueInstanceOf": (p, A) => S(p) instanceof S(A),
          "syscall/js.copyBytesToGo": (p, A, q, Y, Ee) => {
            let xe = p, Fe = p + 4;
            const ve = N(A, q), Ae = S(Ee);
            if (!(Ae instanceof Uint8Array || Ae instanceof Uint8ClampedArray))
              return void w().setUint8(Fe, 0);
            const Z = Ae.subarray(0, ve.length);
            ve.set(Z), w().setUint32(xe, Z.length, !0), w().setUint8(Fe, 1);
          },
          "syscall/js.copyBytesToJS": (p, A, q, Y, Ee) => {
            let xe = p, Fe = p + 4;
            const ve = S(A), Ae = N(q, Y);
            if (!(ve instanceof Uint8Array || ve instanceof Uint8ClampedArray))
              return void w().setUint8(Fe, 0);
            const Z = Ae.subarray(0, ve.length);
            ve.set(Z), w().setUint32(xe, Z.length, !0), w().setUint8(Fe, 1);
          }
        }
      }, this.importObject.env = this.importObject.gojs;
    }
    async run(w) {
      for (this._inst = w, this._values = [NaN, 0, null, !0, !1, t, this], this._goRefCounts = [], this._ids = /* @__PURE__ */ new Map(), this._idPool = [], this.exited = !1; ; ) {
        const S = new Promise((C) => {
          this._resolveCallbackPromise = () => {
            if (this.exited)
              throw new Error("bad callback: Go program has already exited");
            setTimeout(C, 0);
          };
        });
        if (this._inst.exports._start(), this.exited) break;
        await S;
      }
    }
    _resume() {
      if (this.exited) throw new Error("Go program has already exited");
      this._inst.exports.resume(), this.exited && this._resolveExitPromise();
    }
    _makeFuncWrapper(w) {
      const S = this;
      return function() {
        const C = {
          id: w,
          this: this,
          args: arguments
        };
        return S._pendingEvent = C, S._resume(), C.result;
      };
    }
  }
  return new m();
}
class fu {
  constructor() {
    Tt(this, "data");
    Tt(this, "mutex");
    this.mutex = new Ma(), this.data = "";
  }
  async loadSource(o) {
    await this.mutex.acquire();
    try {
      this.data && (o.session = this.data);
      const s = JSON.stringify(o);
      for (let d = 1; d <= 3; d++)
        try {
          const f = await Yr.getInstance({}), { manifest: m, err: b, session: w } = await f.loadSource(s);
          if (b)
            throw new Error(b);
          return this.data = w, m;
        } catch (f) {
          if (console.warn(`Attempt ${d} failed:`, f, s), d === 3)
            throw console.log("paramsStr", s), f;
        }
    } finally {
      this.mutex.release();
    }
    return null;
  }
  async getEventTracking() {
    return await (await Yr.getInstance({})).getEventTracking(this.data);
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
class Ma {
  constructor() {
    Tt(this, "_queue");
    Tt(this, "_locked");
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
const jt = class jt {
  constructor(o) {
    Tt(this, "mutex");
    // private go: any
    // private _values: any[]
    // private _goRefCounts: Map<any, any>
    // private _ids: any[]
    Tt(this, "instanceExpiration");
    Tt(this, "wasm");
    Tt(this, "uri");
    Tt(this, "go");
    var s;
    this.uri = o, o || (this.uri = (s = window == null ? void 0 : window.sigmaCSPMEnv) == null ? void 0 : s.WASM_URL), this.instanceExpiration = Date.now() + 1e3, this.mutex = new Ma();
  }
  static async getInstance(o) {
    if (!jt.instance)
      jt.instance = new jt(o.uri), jt.instance.initializeInstance(1e3);
    else if (!jt.instance)
      throw new Error("Manager not initialized");
    return jt.instance;
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
        const d = du();
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
    return new fu();
  }
};
Tt(jt, "instance");
let Yr = jt;
const lu = new Wa("[AdsTracking]");
function ia(t, o, s) {
  var w;
  lu.debug("getCurrentAds", { query: t, avails: o, currentAds: s });
  const d = o == null ? void 0 : o.find((S) => S.id == t.availId), f = (w = d == null ? void 0 : d.ads) == null ? void 0 : w.filter((S) => (S == null ? void 0 : S.id) == (t == null ? void 0 : t.adsId)), m = f == null ? void 0 : f.find((S) => S.position === (t == null ? void 0 : t.position));
  return !m || (m.availId = d == null ? void 0 : d.id, s && s.id == (m == null ? void 0 : m.id) && s.availId == m.availId) ? s : { ...m, impression: !1 };
}
function hu(t) {
  try {
    return atob(t);
  } catch (o) {
    return console.error("Invalid base64 string:", o), null;
  }
}
function pu(t) {
  try {
    const s = new URL(t).hash.substring(1), d = hu(s);
    return d ? JSON.parse(d) : null;
  } catch (o) {
    return console.error("Error parsing URI:", o), null;
  }
}
function vu({
  video: t,
  adContainer: o,
  startSession: s,
  sdk: d,
  domain: f
}) {
  const m = qc(), b = qt(!1), w = qt(), S = Math.random().toString(36).slice(6);
  function C({ icons: L }) {
    const B = Zr(f, "/build/dist/wta/index.html");
    return {
      id: S,
      appConfig: {
        sdkBaseUrl: Jr(B || "https://localhost:4222/wta/index.html", { id: S })
      },
      icons: L
    };
  }
  if (!!o) {
    const L = Jc(C({
      icons: []
    }));
    L.render(o), L.hide(), o.style.display = "none", lc(() => {
      var B;
      if (w.value) {
        const X = ((B = w.value) == null ? void 0 : B.icons) || [];
        o.style.display = "block", L.updateProps(C({
          icons: X
        })), L.show();
      } else
        o.style.display = "none", L.hide();
    });
  }
  const D = qt([]), N = qt(), se = qt([]);
  async function ce(L) {
    var B;
    try {
      const X = (B = w.value) == null ? void 0 : B.trackingEvents.find((Re) => Re.eventType === L);
      if (!X)
        return;
      m.trigger(X), X.beaconUrls.map((Re) => $c(cu(Re, {
        retry: 3,
        retryDelay: 500
      })));
    } catch (X) {
      console.error("[ERROR] ~ error:", X);
    }
  }
  const Ge = /* @__PURE__ */ new Map();
  let p, A;
  function q(L, B, X) {
    L.addEventListener(B, X), Ge.set(B, X);
  }
  async function Y(L) {
    const B = pu(L);
    if (B) {
      const { avails: X } = await d.getEventTracking();
      w.value = ia(B, X, w.value), B.events.forEach((Re) => {
        w.value && (w.value.impression || (ce("impression"), w.value.impression = !0), ce(Re), Re === "complete" && (w.value = void 0));
      });
    }
  }
  function Ee() {
    return b.value = !1, ["fullscreenchange", "webkitfullscreenchange", "mozfullscreenchange", "msfullscreenchange"].forEach((L) => {
      q(t, L, () => {
        const B = document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement;
        ce(B ? "fullscreen" : "exitFullscreen");
      });
    }), q(t, "pause", () => ce("pause")), q(t, "play", () => ce("resume")), q(t, "rewind", () => ce("rewind")), q(t, "mute", () => ce("mute")), q(t, "unmute", () => ce("unmute")), async (L, B) => {
      const { tagList: X, _url: Re } = B.frag;
      X.flat().find((Oe) => Oe === "EXT-X-CUE-OUT-CONT" || Oe === "EXT-X-CUE-OUT" || Oe === "EXT-X-CUE-IN") && Y(Re);
    };
  }
  async function xe() {
    return d.getEventTracking().then((L) => {
      for (const B of (L == null ? void 0 : L.avails) || [])
        for (const X of B.ads) {
          const Re = `${B.id}_${X.id}_${X.startTimeInSeconds}`;
          for (const ot of X.trackingEvents) {
            const Oe = `${Re}_${ot.eventType}`;
            se.value.find((at) => at.key === Oe) || se.value.push({
              ...ot,
              key: Oe,
              ad: {
                ...X,
                key: Re
              },
              tracked: !1
            });
          }
        }
    });
  }
  function Fe() {
    return async (L, B) => {
      function X(Oe) {
        for (let Je = 0; Je < Oe.length; Je++)
          if (Oe[Je] === 0)
            return Je;
        return Oe.length;
      }
      const { start: Re, sn: ot } = B.frag;
      for (let Oe = 0; Oe < B.samples.length; Oe++) {
        const Je = B.samples[Oe], at = Je.data, Dt = Je.pts;
        if (String.fromCharCode.apply(null, at.slice(0, 3)) !== "ID3" || String.fromCharCode.apply(null, at.slice(10, 14)) !== "TXXX")
          continue;
        const $t = at.slice(21, at.length), Qr = X($t), Ht = $t.slice(Qr + 1, $t.length), Cr = X(Ht), Dr = new TextDecoder("utf-8").decode(Ht.slice(0, Cr)), ir = {
          sn: ot,
          time: Dt - Re,
          value: Da(Dr)
        };
        if (N.value && ot < N.value)
          return;
        D.value.push(ir), ir.value.event === "start" && xe();
      }
    };
  }
  function ve() {
    return (L) => {
      const B = L.track;
      B.kind === "metadata" && (B.oncuechange = async () => {
        const X = B.activeCues;
        for (let Re = 0; Re < X.length; Re++) {
          const ot = X[Re];
          if (ot.value && ot.value.uri) {
            const Oe = ot.value.uri;
            Y(Oe);
          }
        }
      });
    };
  }
  function Ae() {
    return async (L) => {
      var X, Re;
      const B = (X = L == null ? void 0 : L.detail) == null ? void 0 : X.value;
      if (((Re = L == null ? void 0 : L.detail) == null ? void 0 : Re.schemeIdUri) === "urn:sigma:dai:2018")
        try {
          const Oe = ((at) => {
            try {
              return atob(at);
            } catch (Dt) {
              return console.error("Invalid base64 string:", Dt), null;
            }
          })(B), Je = JSON.parse(Oe);
          if (Je.event = L.detail.id, Je) {
            const { avails: at } = await d.getEventTracking();
            w.value = ia(Je, at, w.value);
            const Dt = Je.event;
            w.value && (w.value.impression || (ce("impression"), w.value.impression = !0), ce(Dt), Dt === "complete" && (w.value = void 0));
          }
        } catch (ot) {
          console.error("Error decoding base64:", ot);
        }
    };
  }
  function Z(L, B) {
    m.on((X) => {
      (L === "*" || X.eventType === L) && B(X);
    });
  }
  function Pe() {
    w.value = void 0, D.value = [], se.value = [], Ji(p), Ji(A), Ge.forEach((L, B) => {
      t.removeEventListener(B, L);
    }), Ge.clear();
  }
  function ae() {
    return {
      eventTracking: D,
      trackingDataEvent: se
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
    getLog: ae
  };
}
async function yu({ video: t, adContainer: o, adsUrl: s, baseURL: d }) {
  const f = d || "https://cdn.jsdelivr.net/gh/sigmaott/sigma-ssai-web-sdk@v1.5.1", b = (await Yr.getInstance({ uri: Zr(f, "/build/dist/sigma-cspm.wasm") || "https://localhost:4222/sigma-cspm.wasm" })).createSession();
  function w() {
  }
  const { onEventTracking: S, destroy: C, videojsHelper: E, hlsHelper: D, shakaPlayerHelper: N, getLog: se } = vu({
    video: t,
    adContainer: o,
    trackingUrl: "",
    startSession: w,
    sdk: b,
    domain: f
  }), ce = qt(), Ge = qt();
  function p(Z) {
    Z.config.loader = oa({ adsUrl: s, sdk: b, loader: Hls.DefaultConfig.loader }), ce.value = Z;
    const Pe = D.createHlsFragChanged(), ae = D.createHlsFragParsingMetadata();
    Z.on("hlsFragChanged", Pe), Z.on("hlsFragParsingMetadata", ae), Z.on(Hls.Events.ERROR, (L, B) => {
      console.error("HLS Error:", L, B), B.type === window.Hls.ErrorTypes.NETWORK_ERROR ? console.error("Network Error:", B.details) : B.type === window.Hls.ErrorTypes.MEDIA_ERROR ? console.error("Media Error:", B.details) : console.error("Other Error:", B.details);
    }), Ge.value = () => {
      Z.off("hlsFragChanged", Pe), Z.off("hlsFragParsingMetadata", ae);
    };
  }
  function A(Z) {
    const Pe = Z.config;
    Z.config = {
      ...Pe,
      loader: oa({ adsUrl: s, sdk: b, loader: SigmaManager.DefaultConfig.loader })
    }, ce.value = Z;
    const ae = D.createHlsFragChanged(), L = D.createHlsFragParsingMetadata();
    Z.on("hlsFragChanged", ae), Z.on("hlsFragParsingMetadata", L), Z.on(SigmaManager == null ? void 0 : SigmaManager.Events.ERROR, (B, X) => {
      console.error("HLS Error:", B, X), X.type === (SigmaManager == null ? void 0 : SigmaManager.ErrorTypes.NETWORK_ERROR) ? console.error("Network Error:", X.details) : X.type === (SigmaManager == null ? void 0 : SigmaManager.ErrorTypes.MEDIA_ERROR) ? console.error("Media Error:", X.details) : console.error("Other Error:", X.details);
    }), Ge.value = () => {
      Z.destroy();
    };
  }
  const q = qt(), Y = qt(), xe = {
    instance: b,
    config: {
      proxyAds: {
        uri: s,
        timeout: 2
      }
    }
  };
  function Fe(Z) {
    q.value = Z;
    const Pe = E.createVideojsAddTrack();
    Z.textTracks().on("addtrack", Pe), Y.value = () => {
      Z.textTracks().off("addtrack", Pe);
    };
  }
  function ve(Z, Pe) {
    const ae = N.createShakaPlayerHandlerEvent();
    Z.addEventListener("timelineregionenter", ae), Z.getNetworkingEngine().registerResponseFilter(async (L, B) => {
      if (L === 0) {
        const X = new TextDecoder().decode(B.data), Re = await b.loadSource({
          config: {
            proxyAds: {
              uri: s,
              timeout: 2e3
            }
          },
          masterUri: Pe,
          manifest: X
        });
        B.data = new TextEncoder().encode(Re);
      }
    });
  }
  function Ae() {
    var Z, Pe;
    C(), (Z = Ge.value) == null || Z.call(Ge), (Pe = Y.value) == null || Pe.call(Y), ce.value = null, q.value = null, Ge.value = null, Y.value = null;
  }
  return {
    onEventTracking: S,
    destroy: Ae,
    sigmaPlayer: {
      attachVideojs: Fe,
      attachHls: p,
      attachSigmaDrm: A,
      getLog: se,
      attachShaka: ve
    },
    sdk: b,
    cspm: xe
  };
}
const aa = window == null ? void 0 : window.videojs;
function wu(t) {
  if ((t == null ? void 0 : t.VERSION) === "7.10.2") {
    let o = t.Vhs.PlaylistLoader.prototype.setupInitialPlaylist;
    t != null && t.originalSetupInitialPlaylist ? o = t.originalSetupInitialPlaylist : t.originalSetupInitialPlaylist = o, t.Vhs.PlaylistLoader.prototype.setupInitialPlaylist = async function(f) {
      var m;
      if ((m = this.vhs_.options_) != null && m.cspm)
        try {
          const w = await (await fetch(this.src)).text();
          await this.vhs_.options_.cspm.instance.loadSource({
            config: this.vhs_.options_.cspm.config,
            manifest: w,
            masterUri: this.src
          });
        } catch (b) {
          console.error("Error loading source:", b);
        }
      o.apply(this, [f]);
    };
    let s = t.Vhs.PlaylistLoader.prototype.haveMetadata;
    t != null && t.originalHaveMetadata ? s = t.originalHaveMetadata : t.originalHaveMetadata = s, t.Vhs.PlaylistLoader.prototype.haveMetadata = async function({
      playlistString: f,
      playlistObject: m,
      url: b,
      id: w
    }) {
      var C, E;
      const S = (C = this.vhs_.options_.cspm) == null ? void 0 : C.config;
      try {
        f && ((E = this.vhs_.options_) != null && E.cspm) && (f = await this.vhs_.options_.cspm.instance.loadSource({
          config: S,
          manifest: f,
          masterUri: this.master.playlists[w].resolvedUri
        })), s.apply(this, [{ playlistString: f, playlistObject: m, url: b, id: w }]);
      } catch (D) {
        console.error("Error loading source:", D);
      }
    };
    const d = (f, m, b) => f && b && b.responseURL && m !== b.responseURL ? b.responseURL : m;
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
        const S = f.targetDuration / 2 * 1e3 || 5e3;
        this.finalRenditionTimeout = window.setTimeout(this.media.bind(this, f, !1), S);
        return;
      }
      const b = this.state, w = !this.media_ || f.id !== this.media_.id;
      if (this.master.playlists[f.id].endList || f.endList && f.segments.length) {
        this.request && (this.request.onreadystatechange = null, this.request.abort(), this.request = null), this.state = "HAVE_METADATA", this.media_ = f, w && (this.trigger("mediachanging"), b === "HAVE_MASTER" ? this.trigger("loadedmetadata") : this.trigger("mediachange"));
        return;
      }
      if (w) {
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
          (S, C) => {
            if (this.request) {
              if (f.resolvedUri = d(this.handleManifestRedirects, f.resolvedUri, C), S)
                return this.playlistRequestError(this.request, f, b);
              this.haveMetadata({
                playlistString: C.responseText,
                url: f.uri,
                id: f.id
              }).then(() => {
                b === "HAVE_MASTER" ? this.trigger("loadedmetadata") : this.trigger("mediachange");
              });
            }
          }
        );
      }
    };
  } else {
    let o = t.Vhs.PlaylistLoader.prototype.setupInitialPlaylist;
    t != null && t.originalSetupInitialPlaylist ? o = t.originalSetupInitialPlaylist : t.originalSetupInitialPlaylist = o, t.Vhs.PlaylistLoader.prototype.setupInitialPlaylist = async function(b) {
      if (b.manifestString && this.vhs_.options_.cspm)
        try {
          await this.vhs_.options_.cspm.instance.loadSource({
            config: this.vhs_.options_.cspm.config,
            manifest: b.manifestString,
            masterUri: this.src
          });
        } catch (w) {
          console.error("Error loading source:", w);
        }
      o.apply(this, [b]);
    };
    let s = t.Vhs.PlaylistLoader.prototype.parseManifest_;
    t != null && t.originalParseManifest ? s = t.originalParseManifest : t.originalParseManifest = s, t.Vhs.PlaylistLoader.prototype.parseManifest_ = function({ url: b, manifestString: w }) {
      const S = s.apply(this, [{ url: b, manifestString: w }]);
      return S.playlists && S.playlists.length && (S.manifestString = w), S;
    };
    let d = t.Vhs.PlaylistLoader.prototype.haveMetadata;
    t.Vhs.PlaylistLoader.prototype.haveMetadata = async function({
      playlistString: b,
      playlistObject: w,
      url: S,
      id: C
    }) {
      try {
        if (b && this.vhs_.options_.cspm) {
          const E = this.vhs_.options_.cspm.config;
          b = await this.vhs_.options_.cspm.instance.loadSource({
            config: E,
            manifest: b,
            masterUri: this.main.playlists[C].resolvedUri
          });
        }
        d.apply(this, [{ playlistString: b, playlistObject: w, url: S, id: C }]);
      } catch (E) {
        throw console.error("Error loading source:", E), E;
      }
    }, t != null && t.originalHaveMetadata ? d = t.originalHaveMetadata : t.originalHaveMetadata = d;
    const f = (b, w) => {
      const S = b.segments || [], C = S[S.length - 1], E = C && C.parts && C.parts[C.parts.length - 1], D = E && E.duration || C && C.duration;
      return D ? D * 1e3 : (b.partTargetDuration || b.targetDuration || 10) * 500;
    }, m = (b, w) => w && w.responseURL && b !== w.responseURL ? w.responseURL : b;
    t.Vhs.PlaylistLoader.prototype.media = function(b, w) {
      if (!b)
        return this.media_;
      if (this.state === "HAVE_NOTHING")
        throw new Error(`Cannot switch media playlist from ${this.state}`);
      if (typeof b == "string") {
        if (!this.main.playlists[b])
          throw new Error(`Unknown playlist URI: ${b}`);
        b = this.main.playlists[b];
      }
      if (window.clearTimeout(this.finalRenditionTimeout), w) {
        const N = (b.partTargetDuration || b.targetDuration) / 2 * 1e3 || 5e3;
        this.finalRenditionTimeout = window.setTimeout(this.media.bind(this, b, !1), N);
        return;
      }
      const S = this.state, C = !this.media_ || b.id !== this.media_.id, E = this.main.playlists[b.id];
      if (E && E.endList || b.endList && b.segments.length) {
        this.request && (this.request.onreadystatechange = null, this.request.abort(), this.request = null), this.state = "HAVE_METADATA", this.media_ = b, C && (this.trigger("mediachanging"), S === "HAVE_MAIN_MANIFEST" ? this.trigger("loadedmetadata") : this.trigger("mediachange"));
        return;
      }
      if (this.updateMediaUpdateTimeout_(f(b)), !C)
        return;
      if (this.state = "SWITCHING_MEDIA", this.request) {
        if (b.resolvedUri === this.request.url)
          return;
        this.request.onreadystatechange = null, this.request.abort(), this.request = null;
      }
      this.media_ && this.trigger("mediachanging"), this.pendingMedia_ = b;
      const D = {
        playlistInfo: {
          type: "media",
          uri: b.uri
        }
      };
      this.trigger({ type: "playlistrequeststart", metadata: D }), this.request = this.vhs_.xhr(
        {
          uri: b.resolvedUri,
          withCredentials: this.withCredentials,
          requestType: "hls-playlist"
        },
        (N, se) => {
          if (this.request) {
            if (b.lastRequest = Date.now(), b.resolvedUri = m(b.resolvedUri, se), N)
              return this.playlistRequestError(this.request, b, S);
            this.haveMetadata({
              playlistString: se.responseText,
              url: b.uri,
              id: b.id
            }).then(() => {
              this.trigger({ type: "playlistrequestcomplete", metadata: D }), S === "HAVE_MAIN_MANIFEST" ? this.trigger("loadedmetadata") : this.trigger("mediachange");
            });
          }
        }
      );
    };
  }
  return t;
}
aa && wu(aa);
function Eu(t) {
  const o = "https://dai.sigma.video/api/proxy-ads/ads/", s = mo(t), d = `${s.protocol}//${s.host}${s.pathname}`;
  if (!s.search)
    return { playerUrl: t, adsUrl: null };
  const f = Vs(t), m = f["sigma.dai.adsEndpoint"];
  if (!m)
    return { playerUrl: t, adsUrl: null };
  const b = {}, w = {};
  for (const [C, E] of Object.entries(f))
    C.startsWith("sigma.dai") ? C !== "sigma.dai.adsEndpoint" && (b[C.replace("sigma.dai.", "")] = E) : w[C] = E;
  return {
    playerUrl: Jr(d, w),
    adsUrl: Jr(Zr(o, m), b)
  };
}
function bu(t, o) {
  return {
    adsUrl: Jr(Zr("https://dai.sigma.video/api/proxy-ads/ads/", t), o)
  };
}
export {
  yu as createSigmaDai,
  bu as getAdsURL,
  Eu as processURL,
  wu as videojsForCSPM
};
