var gs = Object.defineProperty;
var ys = (t, o, s) => o in t ? gs(t, o, { enumerable: !0, configurable: !0, writable: !0, value: s }) : t[o] = s;
var It = (t, o, s) => ys(t, typeof o != "symbol" ? o + "" : o, s);
const Es = /#/g, bs = /&/g, Ps = /\//g, Ts = /=/g, po = /\+/g, Rs = /%5e/gi, Ss = /%60/gi, xs = /%7c/gi, Os = /%20/gi;
function Is(t) {
  return encodeURI("" + t).replace(xs, "|");
}
function co(t) {
  return Is(typeof t == "string" ? t : JSON.stringify(t)).replace(po, "%2B").replace(Os, "+").replace(Es, "%23").replace(bs, "%26").replace(Ss, "`").replace(Rs, "^").replace(Ps, "%2F");
}
function oo(t) {
  return co(t).replace(Ts, "%3D");
}
function oa(t = "") {
  try {
    return decodeURIComponent("" + t);
  } catch {
    return "" + t;
  }
}
function Ds(t) {
  return oa(t.replace(po, " "));
}
function Cs(t) {
  return oa(t.replace(po, " "));
}
function ia(t = "") {
  const o = {};
  t[0] === "?" && (t = t.slice(1));
  for (const s of t.split("&")) {
    const c = s.match(/([^=]+)=?(.*)/) || [];
    if (c.length < 2)
      continue;
    const f = Ds(c[1]);
    if (f === "__proto__" || f === "constructor")
      continue;
    const v = Cs(c[2] || "");
    o[f] === void 0 ? o[f] = v : Array.isArray(o[f]) ? o[f].push(v) : o[f] = [o[f], v];
  }
  return o;
}
function _s(t, o) {
  return (typeof o == "number" || typeof o == "boolean") && (o = String(o)), o ? Array.isArray(o) ? o.map((s) => `${oo(t)}=${co(s)}`).join("&") : `${oo(t)}=${co(o)}` : oo(t);
}
function Ns(t) {
  return Object.keys(t).filter((o) => t[o] !== void 0).map((o) => _s(o, t[o])).filter(Boolean).join("&");
}
const As = /^[\s\w\0+.-]{2,}:([/\\]{1,2})/, Ws = /^[\s\w\0+.-]{2,}:([/\\]{2})?/, Ms = /^([/\\]\s*){2,}[^/\\]/, Fs = /^\.?\//;
function aa(t, o = {}) {
  return typeof o == "boolean" && (o = { acceptRelative: o }), o.strict ? As.test(t) : Ws.test(t) || (o.acceptRelative ? Ms.test(t) : !1);
}
function zs(t = "", o) {
  return t.endsWith("/");
}
function Us(t = "", o) {
  return (zs(t) ? t.slice(0, -1) : t) || "/";
}
function Ls(t = "", o) {
  return t.endsWith("/") ? t : t + "/";
}
function js(t, o) {
  if (qs(o) || aa(t))
    return t;
  const s = Us(o);
  return t.startsWith(s) ? t : Pn(s, t);
}
function En(t, o) {
  const s = vo(t), c = { ...ia(s.search), ...o };
  return s.search = Ns(c), $s(s);
}
function Bs(t) {
  return ia(vo(t).search);
}
function qs(t) {
  return !t || t === "/";
}
function Hs(t) {
  return t && t !== "/";
}
function Pn(t, ...o) {
  let s = t || "";
  for (const c of o.filter((f) => Hs(f)))
    if (s) {
      const f = c.replace(Fs, "");
      s = Ls(s) + f;
    } else
      s = c;
  return s;
}
const sa = Symbol.for("ufo:protocolRelative");
function vo(t = "", o) {
  const s = t.match(
    /^[\s\0]*(blob:|data:|javascript:|vbscript:)(.*)/i
  );
  if (s) {
    const [, _, F = ""] = s;
    return {
      protocol: _.toLowerCase(),
      pathname: F,
      href: _ + F,
      auth: "",
      host: "",
      search: "",
      hash: ""
    };
  }
  if (!aa(t, { acceptRelative: !0 }))
    return qi(t);
  const [, c = "", f, v = ""] = t.replace(/\\/g, "/").match(/^[\s\0]*([\w+.-]{2,}:)?\/\/([^/@]+@)?(.*)/) || [];
  let [, R = "", m = ""] = v.match(/([^#/?]*)(.*)?/) || [];
  c === "file:" && (m = m.replace(/\/(?=[A-Za-z]:)/, ""));
  const { pathname: I, search: C, hash: b } = qi(m);
  return {
    protocol: c.toLowerCase(),
    auth: f ? f.slice(0, Math.max(0, f.length - 1)) : "",
    host: R,
    pathname: I,
    search: C,
    hash: b,
    [sa]: !c
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
  return (t.protocol || t[sa] ? (t.protocol || "") + "//" : "") + f + v + o + s + c;
}
const Vs = (t) => (o, s) => (t.set(o, s), s), Hi = Number.MAX_SAFE_INTEGER === void 0 ? 9007199254740991 : Number.MAX_SAFE_INTEGER, ca = 536870912, $i = ca * 2, Gs = (t, o) => (s) => {
  const c = o.get(s);
  let f = c === void 0 ? s.size : c < $i ? c + 1 : 0;
  if (!s.has(f))
    return t(s, f);
  if (s.size < ca) {
    for (; s.has(f); )
      f = Math.floor(Math.random() * $i);
    return t(s, f);
  }
  if (s.size > Hi)
    throw new Error("Congratulations, you created a collection of unique numbers which uses all available integers!");
  for (; s.has(f); )
    f = Math.floor(Math.random() * Hi);
  return t(s, f);
}, ua = /* @__PURE__ */ new WeakMap(), Js = Vs(ua), pn = Gs(Js, ua), Ks = (t) => t.method !== void 0 && t.method === "call", Ys = (t) => typeof t.id == "number" && typeof t.result == "boolean", Zs = (t) => {
  const o = /* @__PURE__ */ new Map([[0, () => {
  }]]), s = /* @__PURE__ */ new Map([[0, () => {
  }]]), c = /* @__PURE__ */ new Map(), f = new Worker(t);
  return f.addEventListener("message", ({ data: C }) => {
    if (Ks(C)) {
      const { params: { timerId: b, timerType: _ } } = C;
      if (_ === "interval") {
        const F = o.get(b);
        if (typeof F === void 0)
          throw new Error("The timer is in an undefined state.");
        if (typeof F == "number") {
          const de = c.get(F);
          if (de === void 0 || de.timerId !== b || de.timerType !== _)
            throw new Error("The timer is in an undefined state.");
        } else typeof F == "function" && F();
      } else if (_ === "timeout") {
        const F = s.get(b);
        if (typeof F === void 0)
          throw new Error("The timer is in an undefined state.");
        if (typeof F == "number") {
          const de = c.get(F);
          if (de === void 0 || de.timerId !== b || de.timerType !== _)
            throw new Error("The timer is in an undefined state.");
        } else typeof F == "function" && (F(), s.delete(b));
      }
    } else if (Ys(C)) {
      const { id: b } = C, _ = c.get(b);
      if (_ === void 0)
        throw new Error("The timer is in an undefined state.");
      const { timerId: F, timerType: de } = _;
      c.delete(b), de === "interval" ? o.delete(F) : s.delete(F);
    } else {
      const { error: { message: b } } = C;
      throw new Error(b);
    }
  }), {
    clearInterval: (C) => {
      if (typeof o.get(C) == "function") {
        const b = pn(c);
        c.set(b, { timerId: C, timerType: "interval" }), o.set(C, b), f.postMessage({
          id: b,
          method: "clear",
          params: { timerId: C, timerType: "interval" }
        });
      }
    },
    clearTimeout: (C) => {
      if (typeof s.get(C) == "function") {
        const b = pn(c);
        c.set(b, { timerId: C, timerType: "timeout" }), s.set(C, b), f.postMessage({
          id: b,
          method: "clear",
          params: { timerId: C, timerType: "timeout" }
        });
      }
    },
    setInterval: (C, b = 0, ..._) => {
      const F = pn(o);
      return o.set(F, () => {
        C(..._), typeof o.get(F) == "function" && f.postMessage({
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
    setTimeout: (C, b = 0, ..._) => {
      const F = pn(s);
      return s.set(F, () => C(..._)), f.postMessage({
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
}, Xs = (t, o) => {
  let s = null;
  return () => {
    if (s !== null)
      return s;
    const c = new Blob([o], { type: "application/javascript; charset=utf-8" }), f = URL.createObjectURL(c);
    return s = t(f), setTimeout(() => URL.revokeObjectURL(f)), s;
  };
}, Qs = `(()=>{"use strict";const e=new Map,t=new Map,r=t=>{const r=e.get(t);return void 0!==r&&(clearTimeout(r),e.delete(t),!0)},s=e=>{const r=t.get(e);return void 0!==r&&(clearTimeout(r),t.delete(e),!0)},o=(e,t)=>{const r=performance.now(),s=e+t-r-performance.timeOrigin;return{expected:r+s,remainingDelay:s}},i=(e,t,r,s)=>{const o=r-performance.now();o>0?e.set(t,setTimeout(i,o,e,t,r,s)):(e.delete(t),postMessage({id:null,method:"call",params:{timerId:t,timerType:s}}))};addEventListener("message",(n=>{let{data:a}=n;try{if("clear"===a.method){const{id:e,params:{timerId:t,timerType:o}}=a;if("interval"===o)postMessage({id:e,result:r(t)});else{if("timeout"!==o)throw new Error('The given type "'.concat(o,'" is not supported'));postMessage({id:e,result:s(t)})}}else{if("set"!==a.method)throw new Error('The given method "'.concat(a.method,'" is not supported'));{const{params:{delay:r,now:s,timerId:n,timerType:m}}=a;if("interval"===m)((t,r,s)=>{const{expected:n,remainingDelay:a}=o(t,s);e.set(r,setTimeout(i,a,e,r,n,"interval"))})(r,n,s);else{if("timeout"!==m)throw new Error('The given type "'.concat(m,'" is not supported'));((e,r,s)=>{const{expected:n,remainingDelay:a}=o(e,s);t.set(r,setTimeout(i,a,t,r,n,"timeout"))})(r,n,s)}}}}catch(e){postMessage({error:{message:e.message},id:a.id,result:null})}}))})();`, ks = Xs(Zs, Qs), Vi = (t) => ks().clearTimeout(t);
/**
* @vue/shared v3.5.1
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
/*! #__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function ec(t, o) {
  const s = new Set(t.split(","));
  return (c) => s.has(c);
}
const Gi = Object.assign, tc = Object.prototype.hasOwnProperty, uo = (t, o) => tc.call(t, o), Tr = Array.isArray, $r = (t) => da(t) === "[object Map]", rc = (t) => typeof t == "string", Kr = (t) => typeof t == "symbol", Tn = (t) => t !== null && typeof t == "object", nc = Object.prototype.toString, da = (t) => nc.call(t), fa = (t) => da(t).slice(8, -1), wo = (t) => rc(t) && t !== "NaN" && t[0] !== "-" && "" + parseInt(t, 10) === t, oc = (t) => {
  const o = /* @__PURE__ */ Object.create(null);
  return (s) => o[s] || (o[s] = t(s));
}, ic = oc((t) => t.charAt(0).toUpperCase() + t.slice(1)), Or = (t, o) => !Object.is(t, o);
var tt = {};
function Sr(t, ...o) {
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
    this.flags |= 2, Ki(this), ha(this);
    const o = ge, s = Dt;
    ge = this, Dt = !0;
    try {
      return this.fn();
    } finally {
      tt.NODE_ENV !== "production" && ge !== this && Sr(
        "Active effect was not restored correctly - this is likely a Vue internal bug."
      ), pa(this), ge = o, Dt = s, this.flags &= -3;
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
let la = 0, Vr;
function mo() {
  la++;
}
function go() {
  if (--la > 0)
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
function ha(t) {
  for (let o = t.deps; o; o = o.nextDep)
    o.version = -1, o.prevActiveLink = o.dep.activeLink, o.dep.activeLink = o;
}
function pa(t) {
  let o, s = t.depsTail;
  for (let c = s; c; c = c.prevDep)
    c.version === -1 ? (c === s && (s = c.prevDep), yo(c), sc(c)) : o = c, c.dep.activeLink = c.prevActiveLink, c.prevActiveLink = void 0;
  t.deps = o, t.depsTail = s;
}
function fo(t) {
  for (let o = t.deps; o; o = o.nextDep)
    if (o.dep.version !== o.version || o.dep.computed && ac(o.dep.computed) === !1 || o.dep.version !== o.version)
      return !0;
  return !!t._dirty;
}
function ac(t) {
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
  const s = ge, c = Dt;
  ge = t, Dt = !0;
  try {
    ha(t);
    const f = t.fn();
    (o.version === 0 || Or(f, t._value)) && (t._value = f, o.version++);
  } catch (f) {
    throw o.version++, f;
  } finally {
    ge = s, Dt = c, pa(t), t.flags &= -3;
  }
}
function yo(t) {
  const { dep: o, prevSub: s, nextSub: c } = t;
  if (s && (s.nextSub = c, t.prevSub = void 0), c && (c.prevSub = s, t.nextSub = void 0), o.subs === t && (o.subs = s), !o.subs && o.computed) {
    o.computed.flags &= -5;
    for (let f = o.computed.deps; f; f = f.nextDep)
      yo(f);
  }
}
function sc(t) {
  const { prevDep: o, nextDep: s } = t;
  o && (o.nextDep = s, t.prevDep = void 0), s && (s.prevDep = o, t.nextDep = void 0);
}
function cc(t, o) {
  t.effect instanceof Ji && (t = t.effect.fn);
  const s = new Ji(t);
  try {
    s.run();
  } catch (f) {
    throw s.stop(), f;
  }
  const c = s.run.bind(s);
  return c.effect = s, c;
}
let Dt = !0;
const va = [];
function uc() {
  va.push(Dt), Dt = !1;
}
function dc() {
  const t = va.pop();
  Dt = t === void 0 ? !0 : t;
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
class wa {
  constructor(o) {
    this.computed = o, this.version = 0, this.activeLink = void 0, this.subs = void 0, tt.NODE_ENV !== "production" && (this.subsHead = void 0);
  }
  track(o) {
    if (!ge || !Dt)
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
      }, ge.deps ? (s.prevDep = ge.depsTail, ge.depsTail.nextDep = s, ge.depsTail = s) : ge.deps = ge.depsTail = s, ge.flags & 4 && ma(s);
    else if (s.version === -1 && (s.version = this.version, s.nextDep)) {
      const c = s.nextDep;
      c.prevDep = s.prevDep, s.prevDep && (s.prevDep.nextDep = c), s.prevDep = ge.depsTail, s.nextDep = void 0, ge.depsTail.nextDep = s, ge.depsTail = s, ge.deps === s && (ge.deps = c);
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
function ma(t) {
  const o = t.dep.computed;
  if (o && !t.dep.subs) {
    o.flags |= 20;
    for (let c = o.deps; c; c = c.nextDep)
      ma(c);
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
  if (Dt && ge) {
    let c = lo.get(t);
    c || lo.set(t, c = /* @__PURE__ */ new Map());
    let f = c.get(s);
    f || c.set(s, f = new wa()), tt.NODE_ENV !== "production" ? f.track({
      target: t,
      type: o,
      key: s
    }) : f.track();
  }
}
function rr(t, o, s, c, f, v) {
  const R = lo.get(t);
  if (!R) {
    bn++;
    return;
  }
  let m = [];
  if (o === "clear")
    m = [...R.values()];
  else {
    const I = Tr(t), C = I && wo(s);
    if (I && s === "length") {
      const b = Number(c);
      R.forEach((_, F) => {
        (F === "length" || F === Gr || !Kr(F) && F >= b) && m.push(_);
      });
    } else {
      const b = (_) => _ && m.push(_);
      switch (s !== void 0 && b(R.get(s)), C && b(R.get(Gr)), o) {
        case "add":
          I ? C && b(R.get("length")) : (b(R.get(pr)), $r(t) && b(R.get(ho)));
          break;
        case "delete":
          I || (b(R.get(pr)), $r(t) && b(R.get(ho)));
          break;
        case "set":
          $r(t) && b(R.get(pr));
          break;
      }
    }
  }
  mo();
  for (const I of m)
    tt.NODE_ENV !== "production" ? I.trigger({
      target: t,
      type: o,
      key: s,
      newValue: c,
      oldValue: f,
      oldTarget: v
    }) : I.trigger();
  go();
}
function br(t) {
  const o = ye(t);
  return o === t ? o : (vt(o, "iterate", Gr), nr(t) ? o : o.map(ht));
}
function Eo(t) {
  return vt(t = ye(t), "iterate", Gr), t;
}
const fc = {
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
  const c = Eo(t), f = c[o]();
  return c !== t && !nr(t) && (f._next = f.next, f.next = () => {
    const v = f._next();
    return v.value && (v.value = s(v.value)), v;
  }), f;
}
const lc = Array.prototype;
function jt(t, o, s, c, f, v) {
  const R = Eo(t), m = R !== t && !nr(t), I = R[o];
  if (I !== lc[o]) {
    const _ = I.apply(t, v);
    return m ? ht(_) : _;
  }
  let C = s;
  R !== t && (m ? C = function(_, F) {
    return s.call(this, ht(_), F, t);
  } : s.length > 2 && (C = function(_, F) {
    return s.call(this, _, F, t);
  }));
  const b = I.call(R, C, c);
  return m && f ? f(b) : b;
}
function Yi(t, o, s, c) {
  const f = Eo(t);
  let v = s;
  return f !== t && (nr(t) ? s.length > 3 && (v = function(R, m, I) {
    return s.call(this, R, m, I, t);
  }) : v = function(R, m, I) {
    return s.call(this, R, ht(m), I, t);
  }), f[o](v, ...c);
}
function so(t, o, s) {
  const c = ye(t);
  vt(c, "iterate", Gr);
  const f = c[o](...s);
  return (f === -1 || f === !1) && Cc(s[0]) ? (s[0] = ye(s[0]), c[o](...s)) : f;
}
function Hr(t, o, s = []) {
  uc(), mo();
  const c = ye(t)[o].apply(t, s);
  return go(), dc(), c;
}
const hc = /* @__PURE__ */ ec("__proto__,__v_isRef,__isVue"), ga = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((t) => t !== "arguments" && t !== "caller").map((t) => Symbol[t]).filter(Kr)
);
function pc(t) {
  Kr(t) || (t = String(t));
  const o = ye(this);
  return vt(o, "has", t), o.hasOwnProperty(t);
}
class ya {
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
      return c === (f ? v ? Oc : Ta : v ? xc : Pa).get(o) || // receiver is not the reactive proxy, but has the same prototype
      // this means the receiver is a user proxy of the reactive proxy
      Object.getPrototypeOf(o) === Object.getPrototypeOf(c) ? o : void 0;
    const R = Tr(o);
    if (!f) {
      let I;
      if (R && (I = fc[s]))
        return I;
      if (s === "hasOwnProperty")
        return pc;
    }
    const m = Reflect.get(
      o,
      s,
      // if this is a proxy wrapping a ref, return methods using the raw ref
      // as receiver so that we don't have to call `toRaw` on the ref in all
      // its class methods
      Rr(o) ? o : c
    );
    return (Kr(s) ? ga.has(s) : hc(s)) || (f || vt(o, "get", s), v) ? m : Rr(m) ? R && wo(s) ? m : m.value : Tn(m) ? f ? Sa(m) : Ra(m) : m;
  }
}
class vc extends ya {
  constructor(o = !1) {
    super(!1, o);
  }
  set(o, s, c, f) {
    let v = o[s];
    if (!this._isShallow) {
      const I = xr(v);
      if (!nr(c) && !xr(c) && (v = ye(v), c = ye(c)), !Tr(o) && Rr(v) && !Rr(c))
        return I ? !1 : (v.value = c, !0);
    }
    const R = Tr(o) && wo(s) ? Number(s) < o.length : uo(o, s), m = Reflect.set(
      o,
      s,
      c,
      Rr(o) ? o : f
    );
    return o === ye(f) && (R ? Or(c, v) && rr(o, "set", s, c, v) : rr(o, "add", s, c)), m;
  }
  deleteProperty(o, s) {
    const c = uo(o, s), f = o[s], v = Reflect.deleteProperty(o, s);
    return v && c && rr(o, "delete", s, void 0, f), v;
  }
  has(o, s) {
    const c = Reflect.has(o, s);
    return (!Kr(s) || !ga.has(s)) && vt(o, "has", s), c;
  }
  ownKeys(o) {
    return vt(
      o,
      "iterate",
      Tr(o) ? "length" : pr
    ), Reflect.ownKeys(o);
  }
}
class wc extends ya {
  constructor(o = !1) {
    super(!0, o);
  }
  set(o, s) {
    return tt.NODE_ENV !== "production" && Sr(
      `Set operation on key "${String(s)}" failed: target is readonly.`,
      o
    ), !0;
  }
  deleteProperty(o, s) {
    return tt.NODE_ENV !== "production" && Sr(
      `Delete operation on key "${String(s)}" failed: target is readonly.`,
      o
    ), !0;
  }
}
const mc = /* @__PURE__ */ new vc(), gc = /* @__PURE__ */ new wc(), bo = (t) => t, Rn = (t) => Reflect.getPrototypeOf(t);
function vn(t, o, s = !1, c = !1) {
  t = t.__v_raw;
  const f = ye(t), v = ye(o);
  s || (Or(o, v) && vt(f, "get", o), vt(f, "get", v));
  const { has: R } = Rn(f), m = c ? bo : s ? Po : ht;
  if (R.call(f, o))
    return m(t.get(o));
  if (R.call(f, v))
    return m(t.get(v));
  t !== f && t.get(o);
}
function wn(t, o = !1) {
  const s = this.__v_raw, c = ye(s), f = ye(t);
  return o || (Or(t, f) && vt(c, "has", t), vt(c, "has", f)), t === f ? s.has(t) : s.has(t) || s.has(f);
}
function mn(t, o = !1) {
  return t = t.__v_raw, !o && vt(ye(t), "iterate", pr), Reflect.get(t, "size", t);
}
function Zi(t, o = !1) {
  !o && !nr(t) && !xr(t) && (t = ye(t));
  const s = ye(this);
  return Rn(s).has.call(s, t) || (s.add(t), rr(s, "add", t, t)), this;
}
function Xi(t, o, s = !1) {
  !s && !nr(o) && !xr(o) && (o = ye(o));
  const c = ye(this), { has: f, get: v } = Rn(c);
  let R = f.call(c, t);
  R ? tt.NODE_ENV !== "production" && ba(c, f, t) : (t = ye(t), R = f.call(c, t));
  const m = v.call(c, t);
  return c.set(t, o), R ? Or(o, m) && rr(c, "set", t, o, m) : rr(c, "add", t, o), this;
}
function Qi(t) {
  const o = ye(this), { has: s, get: c } = Rn(o);
  let f = s.call(o, t);
  f ? tt.NODE_ENV !== "production" && ba(o, s, t) : (t = ye(t), f = s.call(o, t));
  const v = c ? c.call(o, t) : void 0, R = o.delete(t);
  return f && rr(o, "delete", t, void 0, v), R;
}
function ki() {
  const t = ye(this), o = t.size !== 0, s = tt.NODE_ENV !== "production" ? $r(t) ? new Map(t) : new Set(t) : void 0, c = t.clear();
  return o && rr(t, "clear", void 0, void 0, s), c;
}
function gn(t, o) {
  return function(c, f) {
    const v = this, R = v.__v_raw, m = ye(R), I = o ? bo : t ? Po : ht;
    return !t && vt(m, "iterate", pr), R.forEach((C, b) => c.call(f, I(C), I(b), v));
  };
}
function yn(t, o, s) {
  return function(...c) {
    const f = this.__v_raw, v = ye(f), R = $r(v), m = t === "entries" || t === Symbol.iterator && R, I = t === "keys" && R, C = f[t](...c), b = s ? bo : o ? Po : ht;
    return !o && vt(
      v,
      "iterate",
      I ? ho : pr
    ), {
      // iterator protocol
      next() {
        const { value: _, done: F } = C.next();
        return F ? { value: _, done: F } : {
          value: m ? [b(_[0]), b(_[1])] : b(_),
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
function tr(t) {
  return function(...o) {
    if (tt.NODE_ENV !== "production") {
      const s = o[0] ? `on key "${o[0]}" ` : "";
      Sr(
        `${ic(t)} operation ${s}failed: target is readonly.`,
        ye(this)
      );
    }
    return t === "delete" ? !1 : t === "clear" ? void 0 : this;
  };
}
function yc() {
  const t = {
    get(v) {
      return vn(this, v);
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
    get(v) {
      return vn(this, v, !1, !0);
    },
    get size() {
      return mn(this);
    },
    has: wn,
    add(v) {
      return Zi.call(this, v, !0);
    },
    set(v, R) {
      return Xi.call(this, v, R, !0);
    },
    delete: Qi,
    clear: ki,
    forEach: gn(!1, !0)
  }, s = {
    get(v) {
      return vn(this, v, !0);
    },
    get size() {
      return mn(this, !0);
    },
    has(v) {
      return wn.call(this, v, !0);
    },
    add: tr("add"),
    set: tr("set"),
    delete: tr("delete"),
    clear: tr("clear"),
    forEach: gn(!0, !1)
  }, c = {
    get(v) {
      return vn(this, v, !0, !0);
    },
    get size() {
      return mn(this, !0);
    },
    has(v) {
      return wn.call(this, v, !0);
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
  ].forEach((v) => {
    t[v] = yn(v, !1, !1), s[v] = yn(v, !0, !1), o[v] = yn(v, !1, !0), c[v] = yn(
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
  Ec,
  bc,
  Pc,
  Tc
] = /* @__PURE__ */ yc();
function Ea(t, o) {
  const s = o ? t ? Tc : Pc : t ? bc : Ec;
  return (c, f, v) => f === "__v_isReactive" ? !t : f === "__v_isReadonly" ? t : f === "__v_raw" ? c : Reflect.get(
    uo(s, f) && f in c ? s : c,
    f,
    v
  );
}
const Rc = {
  get: /* @__PURE__ */ Ea(!1, !1)
}, Sc = {
  get: /* @__PURE__ */ Ea(!0, !1)
};
function ba(t, o, s) {
  const c = ye(s);
  if (c !== s && o.call(t, c)) {
    const f = fa(t);
    Sr(
      `Reactive ${f} contains both the raw and reactive versions of the same object${f === "Map" ? " as keys" : ""}, which can lead to inconsistencies. Avoid differentiating between the raw and reactive versions of an object and only use the reactive version if possible.`
    );
  }
}
const Pa = /* @__PURE__ */ new WeakMap(), xc = /* @__PURE__ */ new WeakMap(), Ta = /* @__PURE__ */ new WeakMap(), Oc = /* @__PURE__ */ new WeakMap();
function Ic(t) {
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
  return t.__v_skip || !Object.isExtensible(t) ? 0 : Ic(fa(t));
}
function Ra(t) {
  return xr(t) ? t : xa(
    t,
    !1,
    mc,
    Rc,
    Pa
  );
}
function Sa(t) {
  return xa(
    t,
    !0,
    gc,
    Sc,
    Ta
  );
}
function xa(t, o, s, c, f) {
  if (!Tn(t))
    return tt.NODE_ENV !== "production" && Sr(
      `value cannot be made ${o ? "readonly" : "reactive"}: ${String(
        t
      )}`
    ), t;
  if (t.__v_raw && !(o && t.__v_isReactive))
    return t;
  const v = f.get(t);
  if (v)
    return v;
  const R = Dc(t);
  if (R === 0)
    return t;
  const m = new Proxy(
    t,
    R === 2 ? c : s
  );
  return f.set(t, m), m;
}
function xr(t) {
  return !!(t && t.__v_isReadonly);
}
function nr(t) {
  return !!(t && t.__v_isShallow);
}
function Cc(t) {
  return t ? !!t.__v_raw : !1;
}
function ye(t) {
  const o = t && t.__v_raw;
  return o ? ye(o) : t;
}
const ht = (t) => Tn(t) ? Ra(t) : t, Po = (t) => Tn(t) ? Sa(t) : t;
function Rr(t) {
  return t ? t.__v_isRef === !0 : !1;
}
function qt(t) {
  return _c(t, !1);
}
function _c(t, o) {
  return Rr(t) ? t : new Nc(t, o);
}
class Nc {
  constructor(o, s) {
    this.dep = new wa(), this.__v_isRef = !0, this.__v_isShallow = !1, this._rawValue = s ? o : ye(o), this._value = s ? o : ht(o), this.__v_isShallow = s;
  }
  get value() {
    return tt.NODE_ENV !== "production" ? this.dep.track({
      target: this,
      type: "get",
      key: "value"
    }) : this.dep.track(), this._value;
  }
  set value(o) {
    const s = this._rawValue, c = this.__v_isShallow || nr(o) || xr(o);
    o = c ? o : ye(o), Or(o, s) && (this._rawValue = o, this._value = c ? o : ht(o), tt.NODE_ENV !== "production" ? this.dep.trigger({
      target: this,
      type: "set",
      key: "value",
      newValue: o,
      oldValue: s
    }) : this.dep.trigger());
  }
}
const Ac = /"(?:_|\\u0{2}5[Ff]){2}(?:p|\\u0{2}70)(?:r|\\u0{2}72)(?:o|\\u0{2}6[Ff])(?:t|\\u0{2}74)(?:o|\\u0{2}6[Ff])(?:_|\\u0{2}5[Ff]){2}"\s*:/, Wc = /"(?:c|\\u0063)(?:o|\\u006[Ff])(?:n|\\u006[Ee])(?:s|\\u0073)(?:t|\\u0074)(?:r|\\u0072)(?:u|\\u0075)(?:c|\\u0063)(?:t|\\u0074)(?:o|\\u006[Ff])(?:r|\\u0072)"\s*:/, Mc = /^\s*["[{]|^\s*-?\d{1,16}(\.\d{1,17})?([Ee][+-]?\d+)?\s*$/;
function Fc(t, o) {
  if (t === "__proto__" || t === "constructor" && o && typeof o == "object" && "prototype" in o) {
    zc(t);
    return;
  }
  return o;
}
function zc(t) {
  console.warn(`[destr] Dropping "${t}" key to prevent prototype pollution.`);
}
function Oa(t, o = {}) {
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
  if (!Mc.test(t)) {
    if (o.strict)
      throw new SyntaxError("[destr] Invalid JSON");
    return t;
  }
  try {
    if (Ac.test(t) || Wc.test(t)) {
      if (o.strict)
        throw new Error("[destr] Possible prototype pollution");
      return JSON.parse(t, Fc);
    }
    return JSON.parse(t);
  } catch (c) {
    if (o.strict)
      throw c;
    return t;
  }
}
function Uc() {
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
async function Lc(t) {
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
var jc = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, Ia = { exports: {} };
(function(t, o) {
  (function(s, c) {
    t.exports = c();
  })(typeof self < "u" ? self : jc, function() {
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
      return f.m = s, f.c = c, f.d = function(v, R, m) {
        f.o(v, R) || Object.defineProperty(v, R, {
          enumerable: !0,
          get: m
        });
      }, f.r = function(v) {
        typeof Symbol < "u" && Symbol.toStringTag && Object.defineProperty(v, Symbol.toStringTag, {
          value: "Module"
        }), Object.defineProperty(v, "__esModule", {
          value: !0
        });
      }, f.t = function(v, R) {
        if (1 & R && (v = f(v)), 8 & R || 4 & R && typeof v == "object" && v && v.__esModule) return v;
        var m = /* @__PURE__ */ Object.create(null);
        if (f.r(m), Object.defineProperty(m, "default", {
          enumerable: !0,
          value: v
        }), 2 & R && typeof v != "string") for (var I in v) f.d(m, I, (function(C) {
          return v[C];
        }).bind(null, I));
        return m;
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
        return is;
      }), f.d(c, "destroy", function() {
        return as;
      }), f.d(c, "destroyComponents", function() {
        return Oi;
      }), f.d(c, "destroyAll", function() {
        return Ii;
      }), f.d(c, "PROP_TYPE", function() {
        return be;
      }), f.d(c, "PROP_SERIALIZATION", function() {
        return fn;
      }), f.d(c, "CONTEXT", function() {
        return We;
      }), f.d(c, "EVENT", function() {
        return De;
      });
      function v(e, r) {
        return (v = Object.setPrototypeOf || function(n, i) {
          return n.__proto__ = i, n;
        })(e, r);
      }
      function R(e, r) {
        e.prototype = Object.create(r.prototype), e.prototype.constructor = e, v(e, r);
      }
      function m() {
        return (m = Object.assign || function(e) {
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
      var C = [], b = [], _ = 0, F;
      function de() {
        if (!_ && F) {
          var e = F;
          F = null, e.resolve();
        }
      }
      function ae() {
        _ += 1;
      }
      function Ge() {
        _ -= 1, de();
      }
      var p = function() {
        function e(n) {
          var i = this;
          if (this.resolved = void 0, this.rejected = void 0, this.errorHandled = void 0, this.value = void 0, this.error = void 0, this.handlers = void 0, this.dispatching = void 0, this.stack = void 0, this.resolved = !1, this.rejected = !1, this.errorHandled = !1, this.handlers = [], n) {
            var a, u, d = !1, h = !1, l = !1;
            ae();
            try {
              n(function(g) {
                l ? i.resolve(g) : (d = !0, a = g);
              }, function(g) {
                l ? i.reject(g) : (h = !0, u = g);
              });
            } catch (g) {
              Ge(), this.reject(g);
              return;
            }
            Ge(), l = !0, d ? this.resolve(a) : h && this.reject(u);
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
              if (C.indexOf(u) === -1) {
                C.push(u), setTimeout(function() {
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
              var h = a[d], l = h.onSuccess, g = h.onError, P = h.promise, y = void 0;
              if (n) try {
                y = l ? l(this.value) : this.value;
              } catch (E) {
                P.reject(E);
                continue;
              }
              else if (i) {
                if (!g) {
                  P.reject(this.error);
                  continue;
                }
                try {
                  y = g(this.error);
                } catch (E) {
                  P.reject(E);
                  continue;
                }
              }
              if (y instanceof e && (y.resolved || y.rejected)) {
                var w = y;
                w.resolved ? P.resolve(w.value) : P.reject(w.error), w.errorHandled = !0;
              } else I(y) ? y instanceof e && (y.resolved || y.rejected) ? y.resolved ? P.resolve(y.value) : P.reject(y.error) : u(y, P) : P.resolve(y);
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
          for (var d = function(g, P, y) {
            return P.then(function(w) {
              u[g] = w, (a -= 1) == 0 && i.resolve(u);
            }, function(w) {
              y.reject(w);
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
              I(l) ? a.push(l.then(function(g) {
                i[h] = g;
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
            return Ge(), e.reject(d);
          }
          return Ge(), e.resolve(u);
        }, e.delay = function(n) {
          return new e(function(i) {
            setTimeout(i, n);
          });
        }, e.isPromise = function(n) {
          return !!(n && n instanceof e) || I(n);
        }, e.flush = function() {
          return function(n) {
            var i = F = F || new n();
            return de(), i;
          }(e);
        }, e;
      }();
      function N(e) {
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
      function ue(e, r) {
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
      function ot(e) {
        for (var r = [], n = 0, i = Te(e); n < i.length; n++) {
          var a = i[n];
          r.push(a);
          for (var u = 0, d = ot(a); u < d.length; u++) r.push(d[u]);
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
          if (ue(window, e) && window.top) return window.top;
        } catch {
        }
        try {
          if (ue(e, window) && window.top) return window.top;
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
      var at = [], Ct = [];
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
        var n = function(a, u) {
          for (var d = 0; d < a.length; d++) try {
            if (a[d] === u) return d;
          } catch {
          }
          return -1;
        }(at, e);
        if (n !== -1) {
          var i = Ct[n];
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
      function Sn(e) {
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
      function Dr(e) {
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
        var a = Je(e), u = Je(r);
        if (Ir(a, u)) return !0;
        var d = Ae(n), h = Ae(i);
        return d && Ir(Je(d), u) || h && Ir(Je(h), a), !1;
      }
      function wt(e, r) {
        if (typeof e == "string") {
          if (typeof r == "string") return e === "*" || r === e;
          if (N(r) || Array.isArray(r)) return !1;
        }
        return N(e) ? N(r) ? e.toString() === r.toString() : !Array.isArray(r) && !!r.match(e) : !!Array.isArray(e) && (Array.isArray(r) ? JSON.stringify(e) === JSON.stringify(r) : !N(r) && e.some(function(n) {
          return wt(n, r);
        }));
      }
      function Wt(e) {
        return e.match(/^(https?|mock|file):\/\//) ? e.split("/").slice(0, 3).join("/") : ie();
      }
      function Ro(e, r, n, i) {
        n === void 0 && (n = 1e3), i === void 0 && (i = 1 / 0);
        var a;
        return function u() {
          if (ze(e))
            return a && clearTimeout(a), r();
          i <= 0 ? clearTimeout(a) : (i -= n, a = setTimeout(u, n));
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
      function So(e) {
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
            var u = i[a];
            if (ir(u) && ze(u)) {
              if (n) try {
                n.delete(u);
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
            var u = this.name, d = n[u];
            d && d[0] === n ? d[1] = i : Object.defineProperty(n, u, {
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
          var u = Zr(this.keys, n);
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
          var u = this.keys, d = Zr(u, n);
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
      function Io(e, r, n) {
        return (Io = Na() ? Reflect.construct : function(i, a, u) {
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
      function st() {
        var e = "0123456789abcdef";
        return "uid_" + "xxxxxxxxxx".replace(/./g, function() {
          return e.charAt(Math.floor(Math.random() * e.length));
        }) + "_" + Cn((/* @__PURE__ */ new Date()).toISOString().slice(11, 19).replace("T", ".")).replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
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
      function Aa() {
        return {};
      }
      var Cr = 0, Co = 0;
      function Vt(e, r) {
        r === void 0 && (r = {});
        var n = r.thisNamespace, i = n !== void 0 && n, a = r.time, u, d, h = Cr;
        Cr += 1;
        var l = function() {
          for (var g = arguments.length, P = new Array(g), y = 0; y < g; y++) P[y] = arguments[y];
          h < Co && (u = null, d = null, h = Cr, Cr += 1);
          var w;
          w = i ? (d = d || new Xr()).getOrSet(this, Aa) : u = u || {};
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
      Vt.clear = function() {
        Co = Cr;
      };
      function Wa(e) {
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
      function Ie() {
      }
      function kr(e) {
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
      function Ma(e) {
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
          for (var i = e.length, a = [], u = function(P) {
            _o(a, P, function() {
              var y = n ? n + "." + P : "" + P, w = r(e[P], P, y);
              return (Wn(w) || Array.isArray(w)) && (w = tn(w, r, y)), w;
            });
          }, d = 0; d < i; d++) u(d);
          return a;
        }
        if (Wn(e)) {
          var h = {}, l = function(P) {
            if (!e.hasOwnProperty(P)) return 1;
            _o(h, P, function() {
              var y = n ? n + "." + P : "" + P, w = r(e[P], P, y);
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
          set: function(u, d) {
            return n || (e[u] = d, a.register(function() {
              delete e[u];
            })), d;
          },
          register: function(u) {
            var d = kr(function() {
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
            return p.all(d).then(Ie);
          }
        };
        return a;
      }
      function nn(e, r) {
        if (r == null) throw new Error("Expected " + e + " to be present");
        return r;
      }
      var Fa = function(e) {
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
        return new p(function(e) {
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
          var a = r.__inline_memoize_cache__ = r.__inline_memoize_cache__ || {}, u = _n(i);
          return a.hasOwnProperty(u) ? a[u] : a[u] = (function() {
            var d = {};
            if (!e || e.indexOf("=") === -1) return d;
            for (var h = 0, l = e.split("&"); h < l.length; h++) {
              var g = l[h];
              (g = g.split("="))[0] && g[1] && (d[decodeURIComponent(g[0])] = decodeURIComponent(g[1]));
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
        }(m({}, Fo(e), r)) : e;
      }
      function za(e, r) {
        e.appendChild(r);
      }
      function Fn(e, r) {
        return r === void 0 && (r = document), On(e) ? e : typeof e == "string" ? r.querySelector(e) : void 0;
      }
      function Uo(e) {
        return new p(function(r, n) {
          var i = en(e), a = Fn(e);
          if (a) return r(a);
          if (on()) return n(new Error("Document is ready and element " + i + " does not exist"));
          var u = setInterval(function() {
            if (a = Fn(e))
              r(a), clearInterval(u);
            else if (on())
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
      }(Fa), an;
      function Lo(e) {
        if ((an = an || new Xr()).has(e)) {
          var r = an.get(e);
          if (r) return r;
        }
        var n = new p(function(i, a) {
          e.addEventListener("load", function() {
            (function(u) {
              if (function() {
                for (var d = 0; d < at.length; d++) {
                  var h = !1;
                  try {
                    h = at[d].closed;
                  } catch {
                  }
                  h && (Ct.splice(d, 1), at.splice(d, 1));
                }
              }(), u && u.contentWindow) try {
                at.push(u.contentWindow), Ct.push(u);
              } catch {
              }
            })(e), i(e);
          }), e.addEventListener("error", function(u) {
            e.contentWindow ? i(e) : a(u);
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
        var n = e.style || {}, i = function(u, d, h) {
          u === void 0 && (u = "div"), d === void 0 && (d = {}), u = u.toLowerCase();
          var l = document.createElement(u);
          if (d.style && wr(l.style, d.style), d.class && (l.className = d.class.join(" ")), d.id && l.setAttribute("id", d.id), d.attributes) for (var g = 0, P = Object.keys(d.attributes); g < P.length; g++) {
            var y = P[g];
            l.setAttribute(y, d.attributes[y]);
          }
          if (d.styleSheet && function(w, E, T) {
            T === void 0 && (T = window.document), w.styleSheet ? w.styleSheet.cssText = E : w.appendChild(T.createTextNode(E));
          }(l, d.styleSheet), d.html) {
            if (u === "iframe") throw new Error("Iframe html can not be written unless container provided and iframe in DOM");
            l.innerHTML = d.html;
          }
          return l;
        }("iframe", {
          attributes: m({
            allowTransparency: "true"
          }, e.attributes || {}),
          style: m({
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
      function Ua(e) {
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
        var i = n === void 0 ? {} : n, a = i.width, u = a === void 0 || a, d = i.height, h = d === void 0 || d, l = i.interval, g = l === void 0 ? 100 : l, P = i.win, y = P === void 0 ? window : P, w = e.offsetWidth, E = e.offsetHeight, T = !1;
        r({
          width: w,
          height: E
        });
        var S = function() {
          if (!T && function(W) {
            return !!(W.offsetWidth || W.offsetHeight || W.getClientRects().length);
          }(e)) {
            var L = e.offsetWidth, J = e.offsetHeight;
            (u && L !== w || h && J !== E) && r({
              width: L,
              height: J
            }), w = L, E = J;
          }
        }, x, A;
        return y.addEventListener("resize", S), y.ResizeObserver !== void 0 ? ((x = new y.ResizeObserver(S)).observe(e), A = _r(S, 10 * g)) : y.MutationObserver !== void 0 ? ((x = new y.MutationObserver(S)).observe(e, {
          attributes: !0,
          childList: !0,
          subtree: !0,
          characterData: !1
        }), A = _r(S, 10 * g)) : A = _r(S, g), {
          cancel: function() {
            T = !0, x.disconnect(), window.removeEventListener("resize", S), A.cancel();
          }
        };
      }
      function Ln(e) {
        for (; e.parentNode; ) e = e.parentNode;
        return e.toString() === "[object ShadowRoot]";
      }
      var sn = typeof document < "u" ? document.currentScript : null, La = Vt(function() {
        if (sn || (sn = function() {
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
        }())) return sn;
        throw new Error("Can not determine current script");
      }), ja = st();
      Vt(function() {
        var e;
        try {
          e = La();
        } catch {
          return ja;
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
      var Ba = function() {
      };
      function cn() {
        var e = _t();
        return e.WINDOW_WILDCARD = e.WINDOW_WILDCARD || new Ba(), e.WINDOW_WILDCARD;
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
        return we("instance").getOrSet("instanceID", st);
      }
      function Zo(e, r) {
        var n = r.domain, i = it("helloPromises"), a = i.get(e);
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
            return new p();
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
      var mt, qa = ((mt = {}).function = function() {
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
      }, mt), Ha = {}, gt, $a = ((gt = {}).function = function() {
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
      }, gt), Va = {};
      function Hn() {
        return !!Sn(window).match(/MSIE|trident|edge\/12|edge\/13/i);
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
      var Ga = new p(function(e) {
        if (window.document && window.document.body) return e(window.document.body);
        var r = setInterval(function() {
          if (window.document && window.document.body)
            return clearInterval(r), e(window.document.body);
        }, 10);
      });
      function ii(e) {
        it("remoteWindowPromises").getOrSet(e, function() {
          return new p();
        });
      }
      function Vn(e) {
        var r = it("remoteWindowPromises").get(e);
        if (!r) throw new Error("Remote window promise not found");
        return r;
      }
      function ai(e, r, n) {
        Vn(e).resolve(function(i, a, u) {
          if (i !== e) throw new Error("Remote window does not match window");
          if (!wt(a, r)) throw new Error("Remote domain " + a + " does not match domain " + r);
          n.fireAndForget(u);
        });
      }
      function Gn(e, r) {
        Vn(e).reject(r).catch(Ie);
      }
      function un(e) {
        for (var r = e.win, n = e.name, i = e.domain, a = we("popupWindowsByName"), u = it("popupWindowsByWin"), d = 0, h = a.keys(); d < h.length; d++) {
          var l = h[d], g = a.get(l);
          g && !ze(g.win) || a.del(l);
        }
        if (ze(r)) return {
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
          var g = a.call(this, xn(u), d, h, l);
          return g && (un({
            win: g,
            name: d,
            domain: u ? Wt(u) : null
          }), g);
        };
        var a;
        (function(u) {
          var d = u.on, h = u.send, l = u.receiveMessage, g = we("popupWindowsByName");
          d("postrobot_open_tunnel", function(P) {
            var y = P.source, w = P.origin, E = P.data, T = we("bridges").get(w);
            if (!T) throw new Error("Can not find bridge promise for domain " + w);
            return T.then(function(S) {
              if (y !== S) throw new Error("Message source does not matched registered bridge for domain " + w);
              if (!E.name) throw new Error("Register window expected to be passed window name");
              if (!E.sendMessage) throw new Error("Register window expected to be passed sendMessage method");
              if (!g.has(E.name)) throw new Error("Window with name " + E.name + " does not exist, or was not opened by this window");
              var x = function() {
                return g.get(E.name);
              };
              if (!x().domain) throw new Error("We do not have a registered domain for window " + E.name);
              if (x().domain !== w) throw new Error("Message origin " + w + " does not matched registered window origin " + (x().domain || "unknown"));
              return ai(x().win, w, E.sendMessage), {
                sendMessage: function(A) {
                  if (window && !window.closed && x()) {
                    var L = x().domain;
                    if (L) try {
                      l({
                        data: A,
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
          _t(window).openTunnelToParent = function(h) {
            var l = h.name, g = h.source, P = h.canary, y = h.sendMessage, w = we("tunnelWindows"), E = ve(window);
            if (!E) throw new Error("No parent window found to open tunnel to");
            var T = function(S) {
              var x = S.name, A = S.source, L = S.canary, J = S.sendMessage;
              (function() {
                for (var V = we("tunnelWindows"), j = 0, te = V.keys(); j < te.length; j++) {
                  var $ = te[j];
                  ze(V[$].source) && V.del($);
                }
              })();
              var W = st();
              return we("tunnelWindows").set(W, {
                name: x,
                source: A,
                canary: L,
                sendMessage: J
              }), W;
            }({
              name: l,
              source: g,
              canary: P,
              sendMessage: y
            });
            return d(E, "postrobot_open_tunnel", {
              name: l,
              sendMessage: function() {
                var S = w.get(T);
                if (S && S.source && !ze(S.source)) {
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
            var g = Ae(window);
            if (g && ni({
              win: g
            })) {
              return ii(g), (P = g, it("remoteBridgeAwaiters").getOrSet(P, function() {
                return p.try(function() {
                  var y = Ht(P, $n(ie()));
                  if (y) return U(y) && _t(z(y)) ? y : new p(function(w) {
                    var E, T;
                    E = setInterval(function() {
                      if (y && U(y) && _t(z(y)))
                        return clearInterval(E), clearTimeout(T), w(y);
                    }, 100), T = setTimeout(function() {
                      return clearInterval(E), w();
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
                        on: d,
                        send: h
                      });
                    } catch (E) {
                      p.reject(E);
                    }
                  }
                }).then(function(w) {
                  var E = w.source, T = w.origin, S = w.data;
                  if (E !== g) throw new Error("Source does not match opener");
                  ai(E, T, S.sendMessage);
                }).catch(function(w) {
                  throw Gn(g, w), w;
                }) : Gn(g, new Error("Can not register with opener: window does not have a name")) : Gn(g, new Error("Can not register with opener: no bridge found in opener"));
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
        for (var e = we("idToProxyWindow"), r = 0, n = e.keys(); r < n.length; r++) {
          var i = n[r];
          e.get(i).shouldClean() && e.del(i);
        }
      }
      function ci(e, r) {
        var n = r.send, i = r.id, a = i === void 0 ? st() : i, u = e.then(function(l) {
          if (U(l)) return z(l).name;
        }), d = e.then(function(l) {
          if (ze(l)) throw new Error("Window is closed, can not determine type");
          return Ae(l) ? q.POPUP : q.IFRAME;
        });
        u.catch(Ie), d.catch(Ie);
        var h = function() {
          return e.then(function(l) {
            if (!ze(l)) return U(l) ? z(l).name : u;
          });
        };
        return {
          id: a,
          getType: function() {
            return d;
          },
          getInstanceID: Wa(function() {
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
            return g === void 0 && (g = {}), e.then(function(P) {
              var y = window.location.protocol + "//" + window.location.host, w = g.method, E = w === void 0 ? "get" : w, T = g.body;
              if (l.indexOf("/") === 0) l = "" + y + l;
              else if (!l.match(/^https?:\/\//) && l.indexOf(y) !== 0) throw new Error("Expected url to be http or https url, or absolute path, got " + JSON.stringify(l));
              if (E === "post") return h().then(function(S) {
                if (!S) throw new Error("Can not post to window without target name");
                (function(x) {
                  var A = x.url, L = x.target, J = x.body, W = x.method, V = W === void 0 ? "post" : W, j = document.createElement("form");
                  if (j.setAttribute("target", L), j.setAttribute("method", V), j.setAttribute("action", A), j.style.display = "none", J) for (var te = 0, $ = Object.keys(J); te < $.length; te++) {
                    var he, se = $[te], X = document.createElement("input");
                    X.setAttribute("name", se), X.setAttribute("value", (he = J[se]) == null ? void 0 : he.toString()), j.appendChild(X);
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
              if (U(P)) try {
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
            return e.then(function(g) {
              un({
                win: g,
                name: l
              });
              var P = U(g), y = So(g);
              if (!P) throw new Error("Can not set name for cross-domain window: " + l);
              z(g).name = l, y && y.setAttribute("name", l), u = p.resolve(l);
            });
          }
        };
      }
      var yt = function() {
        function e(n) {
          var i = n.send, a = n.win, u = n.serializedWindow;
          this.id = void 0, this.isProxyWindow = !0, this.serializedWindow = void 0, this.actualWindow = void 0, this.actualWindowPromise = void 0, this.send = void 0, this.name = void 0, this.actualWindowPromise = new p(), this.serializedWindow = u || ci(this.actualWindowPromise, {
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
          }), it("winToProxyWindow").set(n, this);
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
          var u = n;
          return it("winToProxyWindow").get(u) || new e({
            win: u,
            send: a
          });
        }, e;
      }();
      function Kn(e, r, n, i, a) {
        var u = it("methodStore"), d = we("proxyWindowMethods");
        yt.isProxyWindow(i) ? d.set(e, {
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
        var n = it("methodStore"), i = we("proxyWindowMethods");
        return n.getOrSet(e, function() {
          return {};
        })[r] || i.get(r);
      }
      function di(e, r, n, i, a) {
        d = (u = {
          on: a.on,
          send: a.send
        }).on, h = u.send, we("builtinListeners").getOrSet("functionCalls", function() {
          return d("postrobot_method", {
            domain: "*"
          }, function(P) {
            var y = P.source, w = P.origin, E = P.data, T = E.id, S = E.name, x = ui(y, T);
            if (!x) throw new Error("Could not find method '" + S + "' with id: " + E.id + " in " + ie(window));
            var A = x.source, L = x.domain, J = x.val;
            return p.try(function() {
              if (!wt(L, w)) throw new Error("Method '" + E.name + "' domain " + JSON.stringify(Mn(x.domain) ? x.domain.source : x.domain) + " does not match origin " + w + " in " + ie(window));
              if (yt.isProxyWindow(A)) return A.matchWindow(y, {
                send: h
              }).then(function(W) {
                if (!W) throw new Error("Method call '" + E.name + "' failed - proxy window does not match source in " + ie(window));
              });
            }).then(function() {
              return J.apply({
                source: y,
                origin: w
              }, E.args);
            }, function(W) {
              return p.try(function() {
                if (J.onError) return J.onError(W);
              }).then(function() {
                throw W.stack && (W.stack = "Remote call to " + S + "(" + function(V) {
                  return V === void 0 && (V = []), An(V).map(function(j) {
                    return typeof j == "string" ? "'" + j + "'" : j === void 0 ? "undefined" : j === null ? "null" : typeof j == "boolean" ? j.toString() : Array.isArray(j) ? "[ ... ]" : typeof j == "object" ? "{ ... }" : typeof j == "function" ? "() => { ... }" : "<" + typeof j + ">";
                  }).join(", ");
                }(E.args) + `) failed

` + W.stack), W;
              });
            }).then(function(W) {
              return {
                result: W,
                id: T,
                name: S
              };
            });
          });
        });
        var u, d, h, l = n.__id__ || st();
        e = yt.unwrap(e);
        var g = n.__name__ || n.name || i;
        return typeof g == "string" && typeof g.indexOf == "function" && g.indexOf("anonymous::") === 0 && (g = g.replace("anonymous::", i + "::")), yt.isProxyWindow(e) ? (Kn(l, n, g, e, r), e.awaitWindow().then(function(P) {
          Kn(l, n, g, P, r);
        })) : Kn(l, n, g, e, r), ar("cross_domain_function", {
          id: l,
          name: g
        });
      }
      function fi(e, r, n, i) {
        var a, u = i.on, d = i.send;
        return function(h, l) {
          l === void 0 && (l = Ha);
          var g = JSON.stringify(h, function(P) {
            var y = this[P];
            if (qn(this)) return y;
            var w = ei(y);
            if (!w) return y;
            var E = l[w] || qa[w];
            return E ? E(y, P) : y;
          });
          return g === void 0 ? "undefined" : g;
        }(n, ((a = {}).promise = function(h, l) {
          return function(g, P, y, w, E) {
            return ar("cross_domain_zalgo_promise", {
              then: di(g, P, function(T, S) {
                return y.then(T, S);
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
          return ir(h) || yt.isProxyWindow(h) ? ar("cross_domain_window", yt.serialize(h, {
            send: d
          })) : h;
        }, a));
      }
      function li(e, r, n, i) {
        var a, u = i.send;
        return function(d, h) {
          if (h === void 0 && (h = Va), d !== "undefined") return JSON.parse(d, function(l, g) {
            if (qn(this)) return g;
            var P, y;
            if (qn(g) ? (P = g.__type__, y = g.__val__) : (P = ei(g), y = g), !P) return y;
            var w = h[P] || $a[P];
            return w ? w(y, l) : y;
          });
        }(n, ((a = {}).cross_domain_zalgo_promise = function(d) {
          return function(h, l, g) {
            return new p(g.then);
          }(0, 0, d);
        }, a.cross_domain_function = function(d) {
          return function(h, l, g, P) {
            var y = g.id, w = g.name, E = P.send, T = function(x) {
              x === void 0 && (x = {});
              function A() {
                var L = arguments;
                return yt.toProxyWindow(h, {
                  send: E
                }).awaitWindow().then(function(J) {
                  var W = ui(J, y);
                  if (W && W.val !== A) return W.val.apply({
                    source: window,
                    origin: ie()
                  }, L);
                  var V = [].slice.call(L);
                  return x.fireAndForget ? E(J, "postrobot_method", {
                    id: y,
                    name: w,
                    args: V
                  }, {
                    domain: l,
                    fireAndForget: !0
                  }) : E(J, "postrobot_method", {
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
              return A.__name__ = w, A.__origin__ = l, A.__source__ = h, A.__id__ = y, A.origin = l, A;
            }, S = T();
            return S.fireAndForget = T({
              fireAndForget: !0
            }), S;
          }(e, r, d, {
            send: u
          });
        }, a.cross_domain_window = function(d) {
          return yt.deserialize(d, {
            send: u
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
        (function(i, a, u) {
          var d = Yr(window, i), h = Yr(i, window);
          if (!d && !h) throw new Error("Can only send messages to and from parent and popup windows");
          Vn(i).then(function(l) {
            return l(i, a, u);
          });
        })(e, n, r);
      }, Wr.postrobot_global = function(e, r) {
        if (!Sn(window).match(/MSIE|rv:11|trident|edge\/12|edge\/13/i)) throw new Error("Global messaging not needed for browser");
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
        var a = i.on, u = i.send;
        return p.try(function() {
          var d = it().getOrSet(e, function() {
            return {};
          });
          return d.buffer = d.buffer || [], d.buffer.push(n), d.flush = d.flush || p.flush().then(function() {
            if (ze(e)) throw new Error("Window is closed");
            var h = fi(e, r, ((l = {}).__post_robot_11_0_0__ = d.buffer || [], l), {
              on: a,
              send: u
            }), l;
            delete d.buffer;
            for (var g = Object.keys(Wr), P = [], y = 0; y < g.length; y++) {
              var w = g[y];
              try {
                Wr[w](e, h, r);
              } catch (E) {
                P.push(E);
              }
            }
            if (P.length === g.length) throw new Error(`All post-robot messaging strategies failed:

` + P.map(function(E, T) {
              return T + ". " + vr(E);
            }).join(`

`));
          }), d.flush.then(function() {
            delete d.flush;
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
        for (var u = 0, d = [n, cn()]; u < d.length; u++) {
          var h = d[u];
          if (h) {
            var l = a.get(h);
            if (l) {
              var g = l[r];
              if (g) {
                if (i && typeof i == "string") {
                  if (g[i]) return g[i];
                  if (g.__domain_regex__) for (var P = 0, y = g.__domain_regex__; P < y.length; P++) {
                    var w = y[P], E = w.listener;
                    if (wt(w.regex, i)) return E;
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
        var u = e.source, d = e.origin, h = function(y, w, E, T) {
          var S = T.on, x = T.send, A;
          try {
            A = li(w, E, y, {
              on: S,
              send: x
            });
          } catch {
            return;
          }
          if (A && typeof A == "object" && A !== null) {
            var L = A.__post_robot_11_0_0__;
            if (Array.isArray(L)) return L;
          }
        }(e.data, u, d, {
          on: n,
          send: i
        });
        if (h) {
          ko(u);
          for (var l, g = function() {
            var y = h[P];
            if (a.has(y.id)) return {
              v: void 0
            };
            if (a.set(y.id, !0), ze(u) && !y.fireAndForget) return {
              v: void 0
            };
            y.origin.indexOf("file:") === 0 && (d = "file://");
            try {
              y.type === "postrobot_message_request" ? function(w, E, T, S) {
                var x = S.on, A = S.send, L = wi({
                  name: T.name,
                  win: w,
                  domain: E
                }), J = T.name === "postrobot_method" && T.data && typeof T.data.name == "string" ? T.data.name + "()" : T.name;
                function W(V, j, te) {
                  return p.flush().then(function() {
                    if (!T.fireAndForget && !ze(w)) try {
                      return Yn(w, E, {
                        id: st(),
                        origin: ie(window),
                        type: "postrobot_message_response",
                        hash: T.hash,
                        name: T.name,
                        ack: V,
                        data: j,
                        error: te
                      }, {
                        on: x,
                        send: A
                      });
                    } catch ($) {
                      throw new Error("Send response message failed for " + J + " in " + ie() + `

` + vr($));
                    }
                  });
                }
                p.all([p.flush().then(function() {
                  if (!T.fireAndForget && !ze(w)) try {
                    return Yn(w, E, {
                      id: st(),
                      origin: ie(window),
                      type: "postrobot_message_ack",
                      hash: T.hash,
                      name: T.name
                    }, {
                      on: x,
                      send: A
                    });
                  } catch (V) {
                    throw new Error("Send ack message failed for " + J + " in " + ie() + `

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
                  return W("success", V);
                }, function(V) {
                  return W("error", null, V);
                })]).then(Ie).catch(function(V) {
                  if (L && L.handleError) return L.handleError(V);
                  throw V;
                });
              }(u, d, y, {
                on: n,
                send: i
              }) : y.type === "postrobot_message_response" ? function(w, E, T) {
                if (!vi(T.hash)) {
                  var S = hi(T.hash);
                  if (!S) throw new Error("No handler found for post message response for message: " + T.name + " from " + E + " in " + window.location.protocol + "//" + window.location.host + window.location.pathname);
                  if (!wt(S.domain, E)) throw new Error("Response origin " + E + " does not match domain " + (x = S.domain, Array.isArray(x) ? "(" + x.join(" | ") + ")" : N(x) ? "RegExp(" + x.toString() + ")" : x.toString()));
                  var x;
                  if (w !== S.win) throw new Error("Response source does not match registered window");
                  pi(T.hash), T.ack === "error" ? S.promise.reject(T.error) : T.ack === "success" && S.promise.resolve({
                    source: w,
                    origin: E,
                    data: T.data
                  });
                }
              }(u, d, y) : y.type === "postrobot_message_ack" && function(w, E, T) {
                if (!vi(T.hash)) {
                  var S = hi(T.hash);
                  if (!S) throw new Error("No handler found for post message ack for message: " + T.name + " from " + E + " in " + window.location.protocol + "//" + window.location.host + window.location.pathname);
                  try {
                    if (!wt(S.domain, E)) throw new Error("Ack origin " + E + " does not match domain " + S.domain.toString());
                    if (w !== S.win) throw new Error("Ack source does not match registered window");
                  } catch (x) {
                    S.promise.reject(x);
                  }
                  S.ack = !0;
                }
              }(u, d, y);
            } catch (w) {
              setTimeout(function() {
                throw w;
              }, 0);
            }
          }, P = 0; P < h.length; P++) if (l = g()) return l.v;
        }
      }
      function Mt(e, r, n) {
        if (!e) throw new Error("Expected name");
        if (typeof (r = r || {}) == "function" && (n = r, r = {}), !n) throw new Error("Expected handler");
        var i = function a(u, d) {
          var h = u.name, l = u.win, g = u.domain, P = it("requestListeners");
          if (!h || typeof h != "string") throw new Error("Name required to add request listener");
          if (l && l !== "*" && yt.isProxyWindow(l)) {
            var y = l.awaitWindow().then(function(he) {
              return a({
                name: h,
                win: he,
                domain: g
              }, d);
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
            for (var E = [], T = 0, S = w; T < S.length; T++) E.push(a({
              name: h,
              domain: g,
              win: S[T]
            }, d));
            return {
              cancel: function() {
                for (var he = 0; he < E.length; he++) E[he].cancel();
              }
            };
          }
          if (Array.isArray(g)) {
            for (var x = [], A = 0, L = g; A < L.length; A++) x.push(a({
              name: h,
              win: w,
              domain: L[A]
            }, d));
            return {
              cancel: function() {
                for (var he = 0; he < x.length; he++) x[he].cancel();
              }
            };
          }
          var J = wi({
            name: h,
            win: w,
            domain: g
          });
          w && w !== "*" || (w = cn());
          var W = (g = g || "*").toString();
          if (J) throw w && g ? new Error("Request listener already exists for " + h + " on domain " + g.toString() + " for " + (w === cn() ? "wildcard" : "specified") + " window") : w ? new Error("Request listener already exists for " + h + " for " + (w === cn() ? "wildcard" : "specified") + " window") : g ? new Error("Request listener already exists for " + h + " on domain " + g.toString()) : new Error("Request listener already exists for " + h);
          var V = P.getOrSet(w, function() {
            return {};
          }), j = Nr(V, h, function() {
            return {};
          }), te, $;
          return Mn(g) ? (te = Nr(j, "__domain_regex__", function() {
            return [];
          })).push($ = {
            regex: g,
            listener: d
          }) : j[W] = d, {
            cancel: function() {
              delete j[W], $ && (te.splice(te.indexOf($, 1)), te.length || delete j.__domain_regex__), Object.keys(j).length || delete V[h], w && !Object.keys(V).length && P.del(w);
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
      var St = function e(r, n, i, a) {
        var u = (a = a || {}).domain || "*", d = a.timeout || -1, h = a.timeout || 5e3, l = a.fireAndForget || !1;
        return yt.toProxyWindow(r, {
          send: e
        }).awaitWindow().then(function(g) {
          return p.try(function() {
            if (function(P, y, w) {
              if (!P) throw new Error("Expected name");
              if (w && typeof w != "string" && !Array.isArray(w) && !Mn(w)) throw new TypeError("Can not send " + P + ". Expected domain " + JSON.stringify(w) + " to be a string, array, or regex");
              if (ze(y)) throw new Error("Can not send " + P + ". Target window is closed");
            }(n, g, u), function(P, y) {
              var w = $t(y);
              if (w) return w === P;
              if (y === P || Oe(y) === y) return !1;
              for (var E = 0, T = Te(P); E < T.length; E++) if (T[E] === y) return !0;
              return !1;
            }(window, g)) return Qo(g, h);
          }).then(function(P) {
            return function(y, w, E, T) {
              var S = T.send;
              return p.try(function() {
                return typeof w == "string" ? w : p.try(function() {
                  return E || Bn(y, {
                    send: S
                  }).then(function(x) {
                    return x.domain;
                  });
                }).then(function(x) {
                  if (!wt(w, w)) throw new Error("Domain " + en(w) + " does not match " + en(w));
                  return x;
                });
              });
            }(g, u, (P === void 0 ? {} : P).domain, {
              send: e
            });
          }).then(function(P) {
            var y = P, w = n === "postrobot_method" && i && typeof i.name == "string" ? i.name + "()" : n, E = new p(), T = n + "_" + st();
            if (!l) {
              var S = {
                name: n,
                win: g,
                domain: y,
                promise: E
              };
              (function(j, te) {
                we("responseListeners").set(j, te);
              })(T, S);
              var x = it("requestPromises").getOrSet(g, function() {
                return [];
              });
              x.push(E), E.catch(function() {
                (function(j) {
                  we("erroredResponseListeners").set(j, !0);
                })(T), pi(T);
              });
              var A = function(j) {
                return it("knownWindows").get(j, !1);
              }(g) ? 1e4 : 2e3, L = d, J = A, W = L, V = _r(function() {
                return ze(g) ? E.reject(new Error("Window closed for " + n + " before " + (S.ack ? "response" : "ack"))) : S.cancelled ? E.reject(new Error("Response listener was cancelled for " + n)) : (J = Math.max(J - 500, 0), W !== -1 && (W = Math.max(W - 500, 0)), S.ack || J !== 0 ? W === 0 ? E.reject(new Error("No response for postMessage " + w + " in " + ie() + " in " + L + "ms")) : void 0 : E.reject(new Error("No ack for postMessage " + w + " in " + ie() + " in " + A + "ms")));
              }, 500);
              E.finally(function() {
                V.cancel(), x.splice(x.indexOf(E, 1));
              }).catch(Ie);
            }
            return Yn(g, y, {
              id: st(),
              origin: ie(window),
              type: "postrobot_message_request",
              hash: T,
              name: n,
              data: i,
              fireAndForget: l
            }, {
              on: Mt,
              send: e
            }).then(function() {
              return l ? E.resolve() : E;
            }, function(j) {
              throw new Error("Send request message failed for " + w + " in " + ie() + `

` + vr(j));
            });
          });
        });
      };
      function Mr(e) {
        return yt.toProxyWindow(e, {
          send: St
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
            return p.try(function() {
              if (ie() === r) throw new Error("Can not open bridge on the same domain as current domain: " + r);
              var a = $n(r);
              if (Ht(window, a)) throw new Error("Frame with name " + a + " already exists on page");
              var u = function(d, h) {
                var l = document.createElement("iframe");
                return l.setAttribute("name", d), l.setAttribute("id", d), l.setAttribute("style", "display: none; margin: 0; padding: 0; border: 0px none; overflow: hidden;"), l.setAttribute("frameborder", "0"), l.setAttribute("border", "0"), l.setAttribute("scrolling", "no"), l.setAttribute("allowTransparency", "true"), l.setAttribute("tabindex", "-1"), l.setAttribute("hidden", "true"), l.setAttribute("title", ""), l.setAttribute("role", "presentation"), l.src = h, l;
              }(a, e);
              return i.set(r, u), Ga.then(function(d) {
                d.appendChild(u);
                var h = u.contentWindow;
                return new p(function(l, g) {
                  u.addEventListener("load", l), u.addEventListener("error", g);
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
            return p.try(function() {
              if (r.source && r.source !== window) throw new Error("Can not call get on proxy object from a remote window");
              return e;
            });
          }
        };
      }
      function Ja(e) {
        return Cn(JSON.stringify(e));
      }
      function Xn(e) {
        var r = Fr(e);
        return r.references = r.references || {}, r.references;
      }
      function yi(e) {
        var r = e.data, n = e.metaData, i = e.sender, a = e.receiver, u = e.passByReference, d = u !== void 0 && u, h = e.basic, l = h !== void 0 && h, g = Mr(a.win), P = l ? JSON.stringify(r) : fi(g, a.domain, r, {
          on: Mt,
          send: St
        }), y = d ? function(w) {
          var E = st();
          return Xn(window)[E] = w, {
            type: "uid",
            uid: E
          };
        }(P) : {
          type: "raw",
          val: P
        };
        return {
          serializedData: Ja({
            sender: {
              domain: i.domain
            },
            metaData: n,
            reference: y
          }),
          cleanReference: function() {
            w = window, (E = y).type === "uid" && delete Xn(w)[E.uid];
            var w, E;
          }
        };
      }
      function Ei(e) {
        var r = e.sender, n = e.basic, i = n !== void 0 && n, a = function(P) {
          return JSON.parse(function(y) {
            if (typeof atob == "function") return decodeURIComponent([].map.call(atob(y), function(w) {
              return "%" + ("00" + w.charCodeAt(0).toString(16)).slice(-2);
            }).join(""));
            if (typeof Buffer < "u") return Buffer.from(y, "base64").toString("utf8");
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
        var g = function(P, y) {
          if (y.type === "raw") return y.val;
          if (y.type === "uid") return Xn(P)[y.uid];
          throw new Error("Unsupported ref type: " + y.type);
        }(h, u);
        return {
          data: i ? JSON.parse(g) : function(P, y, w) {
            return li(P, y, w, {
              on: Mt,
              send: St
            });
          }(h, l, g),
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
      }, fn = {
        JSON: "json",
        DOTIFY: "dotify",
        BASE64: "base64"
      }, We = q, De = {
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
      var Ka = Vt(function(e) {
        var r = Ei({
          data: Qn(e).serializedInitialPayload,
          sender: {
            win: function(n) {
              return function(i) {
                if (i.type === "opener") return nn("opener", Ae(window));
                if (i.type === "parent" && typeof i.distance == "number") return nn("parent", function(y, w) {
                  return w === void 0 && (w = 1), function(E, T) {
                    T === void 0 && (T = 1);
                    for (var S = E, x = 0; x < T; x++) {
                      if (!S) return;
                      S = ve(S);
                    }
                    return S;
                  }(y, Dr(y) - w);
                }(window, i.distance));
                if (i.type === "global" && i.uid && typeof i.uid == "string") {
                  var a = i.uid, u = $t(window);
                  if (!u) throw new Error("Can not find ancestor window");
                  for (var d = 0, h = Je(u); d < h.length; d++) {
                    var l = h[d];
                    if (U(l)) {
                      var g = gi(l, function(y) {
                        return y.windows && y.windows[a];
                      });
                      if (g) return g;
                    }
                  }
                } else if (i.type === "name") {
                  var P = i.name;
                  return nn("namedWindow", function(y, w) {
                    return Ht(y, w) || function E(T, S) {
                      var x = Ht(T, S);
                      if (x) return x;
                      for (var A = 0, L = Te(T); A < L.length; A++) {
                        var J = E(L[A], S);
                        if (J) return J;
                      }
                    }(Oe(y) || y, w);
                  }(nn("ancestor", $t(window)), P));
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
        return Ka(window.name);
      }
      function Ya(e, r) {
        if (r === void 0 && (r = window), e === ve(r)) return {
          type: "parent",
          distance: Dr(e)
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
      function Za() {
        return p.try(function() {
          window.focus();
        });
      }
      function Ri() {
        return p.try(function() {
          window.close();
        });
      }
      var Ft = function() {
        return Ie;
      }, sr = function(e) {
        return kr(e.value);
      };
      function kn(e, r, n) {
        for (var i = 0, a = Object.keys(m({}, e, r)); i < a.length; i++) {
          var u = a[i];
          n(u, r[u], e[u]);
        }
      }
      function Si(e, r, n) {
        var i = {};
        return p.all(function(a, u, d) {
          var h = [];
          return kn(a, u, function(l, g, P) {
            var y = function(w, E, T) {
              return p.resolve().then(function() {
                var S, x;
                if (T != null && E) {
                  var A = (S = {}, S.get = E.queryParam, S.post = E.bodyParam, S)[n], L = (x = {}, x.get = E.queryValue, x.post = E.bodyValue, x)[n];
                  if (A) return p.hash({
                    finalParam: p.try(function() {
                      return typeof A == "function" ? A({
                        value: T
                      }) : typeof A == "string" ? A : w;
                    }),
                    finalValue: p.try(function() {
                      return typeof L == "function" && Gt(T) ? L({
                        value: T
                      }) : T;
                    })
                  }).then(function(J) {
                    var W = J.finalParam, V = J.finalValue, j;
                    if (typeof V == "boolean") j = V.toString();
                    else if (typeof V == "string") j = V.toString();
                    else if (typeof V == "object" && V !== null) {
                      if (E.serialization === fn.JSON) j = JSON.stringify(V);
                      else if (E.serialization === fn.BASE64) j = Cn(JSON.stringify(V));
                      else if (E.serialization === fn.DOTIFY || !E.serialization) {
                        j = function se(X, G, le) {
                          G === void 0 && (G = ""), le === void 0 && (le = {}), G = G && G + ".";
                          for (var re in X) X.hasOwnProperty(re) && X[re] != null && typeof X[re] != "function" && (X[re] && Array.isArray(X[re]) && X[re].length && X[re].every(function(Me) {
                            return typeof Me != "object";
                          }) ? le["" + G + re + "[]"] = X[re].join(",") : X[re] && typeof X[re] == "object" ? le = se(X[re], "" + G + re, le) : le["" + G + re] = X[re].toString());
                          return le;
                        }(V, w);
                        for (var te = 0, $ = Object.keys(j); te < $.length; te++) {
                          var he = $[te];
                          i[he] = j[he];
                        }
                        return;
                      }
                    } else typeof V == "number" && (j = V.toString());
                    i[W] = j;
                  });
                }
              });
            }(l, g, P);
            h.push(y);
          }), h;
        }(r, e)).then(function() {
          return i;
        });
      }
      function xi(e) {
        var r = e.uid, n = e.options, i = e.overrides, a = i === void 0 ? {} : i, u = e.parentWin, d = u === void 0 ? window : u, h = n.propsDef, l = n.containerTemplate, g = n.prerenderTemplate, P = n.tag, y = n.name, w = n.attributes, E = n.dimensions, T = n.autoResize, S = n.url, x = n.domain, A = n.exports, L = new p(), J = [], W = rn(), V = {}, j = {}, te = {
          visible: !0
        }, $ = a.event ? a.event : (he = {}, se = {}, X = {
          on: function(O, D) {
            var H = se[O] = se[O] || [];
            H.push(D);
            var B = !1;
            return {
              cancel: function() {
                B || (B = !0, H.splice(H.indexOf(D), 1));
              }
            };
          },
          once: function(O, D) {
            var H = X.on(O, function() {
              H.cancel(), D();
            });
            return H;
          },
          trigger: function(O) {
            for (var D = arguments.length, H = new Array(D > 1 ? D - 1 : 0), B = 1; B < D; B++) H[B - 1] = arguments[B];
            var oe = se[O], Q = [];
            if (oe)
              for (var Re = function() {
                var Ze = oe[Se];
                Q.push(p.try(function() {
                  return Ze.apply(void 0, H);
                }));
              }, Se = 0; Se < oe.length; Se++) Re();
            return p.all(Q).then(Ie);
          },
          triggerOnce: function(O) {
            if (he[O]) return p.resolve();
            he[O] = !0;
            for (var D = arguments.length, H = new Array(D > 1 ? D - 1 : 0), B = 1; B < D; B++) H[B - 1] = arguments[B];
            return X.trigger.apply(X, [O].concat(H));
          },
          reset: function() {
            se = {};
          }
        }), he, se, X, G = a.props ? a.props : {}, le, re, Me, Nt, Et, Kt = !1, Yt = a.onError, zt = a.getProxyContainer, Zt = a.show, Xt = a.hide, cr = a.close, Qt = a.renderContainer, xt = a.getProxyWindow, ur = a.setProxyWin, kt = a.openFrame, er = a.openPrerenderFrame, dr = a.prerender, fr = a.open, ce = a.openPrerender, bt = a.watchForUnload, fe = a.getInternalState, Ke = a.setInternalState, Ue = function() {
          return typeof E == "function" ? E({
            props: G
          }) : E;
        }, Ye = function() {
          return p.try(function() {
            return a.resolveInitPromise ? a.resolveInitPromise() : L.resolve();
          });
        }, Ne = function(O) {
          return p.try(function() {
            return a.rejectInitPromise ? a.rejectInitPromise(O) : L.reject(O);
          });
        }, ct = function(O) {
          for (var D = {}, H = 0, B = Object.keys(G); H < B.length; H++) {
            var oe = B[H], Q = h[oe];
            if (!Q || Q.sendToChild !== !1) {
              var Re = Q && Q.trustedDomains && Q.trustedDomains.length > 0 ? Q.trustedDomains.reduce(function(Se, Ze) {
                return Se || wt(Ze, O);
              }, !1) : wt(O, ie(window));
              Q && Q.sameDomain && !Re || Q && Q.trustedDomains && !Re || (D[oe] = G[oe]);
            }
          }
          return p.hash(D);
        }, He = function() {
          return p.try(function() {
            return fe ? fe() : te;
          });
        }, $e = function(O) {
          return p.try(function() {
            return Ke ? Ke(O) : te = m({}, te, O);
          });
        }, Pt = function() {
          return xt ? xt() : p.try(function() {
            var O = G.window;
            if (O) {
              var D = Mr(O);
              return W.register(function() {
                return O.close();
              }), D;
            }
            return new yt({
              send: St
            });
          });
        }, dt = function(O) {
          return ur ? ur(O) : p.try(function() {
            le = O;
          });
        }, Ot = function() {
          return Zt ? Zt() : p.hash({
            setState: $e({
              visible: !0
            }),
            showElement: re ? re.get().then(Ua) : null
          }).then(Ie);
        }, Ut = function() {
          return Xt ? Xt() : p.hash({
            setState: $e({
              visible: !1
            }),
            showElement: re ? re.get().then(qo) : null
          }).then(Ie);
        }, gr = function() {
          return typeof S == "function" ? S({
            props: G
          }) : S;
        }, yr = function() {
          return typeof w == "function" ? w({
            props: G
          }) : w;
        }, lr = function() {
          return Wt(gr());
        }, ft = function(O, D) {
          var H = D.windowName;
          return kt ? kt(O, {
            windowName: H
          }) : p.try(function() {
            if (O === We.IFRAME) return dn(jo({
              attributes: m({
                name: H,
                title: y
              }, yr().iframe)
            }));
          });
        }, zr = function(O) {
          return er ? er(O) : p.try(function() {
            if (O === We.IFRAME) return dn(jo({
              attributes: m({
                name: "__zoid_prerender_frame__" + y + "_" + st() + "__",
                title: "prerender__" + y
              }, yr().iframe)
            }));
          });
        }, Ur = function(O, D, H) {
          return ce ? ce(O, D, H) : p.try(function() {
            if (O === We.IFRAME) {
              if (!H) throw new Error("Expected proxy frame to be passed");
              return H.get().then(function(B) {
                return W.register(function() {
                  return Ar(B);
                }), Un(B).then(function(oe) {
                  return z(oe);
                }).then(function(oe) {
                  return Mr(oe);
                });
              });
            }
            if (O === We.POPUP) return D;
            throw new Error("No render context available for " + O);
          });
        }, Er = function() {
          return p.try(function() {
            if (le) return p.all([$.trigger(De.FOCUS), le.focus()]).then(Ie);
          });
        }, ln = function() {
          var O = Fr(window);
          return O.windows = O.windows || {}, O.windows[r] = window, W.register(function() {
            delete O.windows[r];
          }), r;
        }, Lr = function(O, D, H, B) {
          if (D === ie(window)) return {
            type: "global",
            uid: ln()
          };
          if (O !== window) throw new Error("Can not construct cross-domain window reference for different target window");
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
            distance: Dr(window)
          };
          throw new Error("Can not construct window reference for child");
        }, hn = function(O, D) {
          return p.try(function() {
            var H;
            Nt = O, Me = D, (H = le) == null || H.isPopup().then(function(B) {
              if ((D == null ? void 0 : D.name) !== "" && B) {
                var oe;
                (oe = le) == null || oe.setName(D == null ? void 0 : D.name);
              }
            }).finally(function() {
              Ye(), W.register(function() {
                return D.close.fireAndForget().catch(Ie);
              });
            });
          });
        }, jr = function(O) {
          var D = O.width, H = O.height;
          return p.try(function() {
            $.trigger(De.RESIZE, {
              width: D,
              height: H
            });
          });
        }, Br = function(O) {
          return p.try(function() {
            return $.trigger(De.DESTROY);
          }).catch(Ie).then(function() {
            return W.all(O);
          }).then(function() {
            var D = O || new Error("Component destroyed");
            Et && mr(Et) || D.message === "Window navigated away" ? L.resolve() : L.asyncReject(D);
          });
        }, Lt = Vt(function(O) {
          return p.try(function() {
            return cr ? ze(cr.__source__) ? void 0 : cr() : p.try(function() {
              return $.trigger(De.CLOSE);
            }).then(function() {
              return Br(O || new Error("Component closed"));
            });
          });
        }), Di = function(O, D) {
          var H = D.proxyWin, B = D.proxyFrame, oe = D.windowName;
          return fr ? fr(O, {
            proxyWin: H,
            proxyFrame: B,
            windowName: oe
          }) : p.try(function() {
            if (O === We.IFRAME) {
              if (!B) throw new Error("Expected proxy frame to be passed");
              return B.get().then(function(Le) {
                return Un(Le).then(function(me) {
                  return W.register(function() {
                    return Ar(Le);
                  }), W.register(function() {
                    return mi(me);
                  }), me;
                });
              });
            }
            if (O === We.POPUP) {
              var Q = Ue(), Re = Q.width, Se = Re === void 0 ? "300px" : Re, Ze = Q.height, Ce = Ze === void 0 ? "150px" : Ze;
              Se = Jo(Se, window.outerWidth), Ce = Jo(Ce, window.outerWidth);
              var Ve = function(Le, me) {
                var je = (me = me || {}).closeOnUnload, _e = je === void 0 ? 1 : je, lt = me.name, Xe = lt === void 0 ? "" : lt, pe = me.width, Qe = me.height, ut = 0, rt = 0;
                pe && (window.outerWidth ? rt = Math.round((window.outerWidth - pe) / 2) + window.screenX : window.screen.width && (rt = Math.round((window.screen.width - pe) / 2))), Qe && (window.outerHeight ? ut = Math.round((window.outerHeight - Qe) / 2) + window.screenY : window.screen.height && (ut = Math.round((window.screen.height - Qe) / 2))), delete me.closeOnUnload, delete me.name, pe && Qe && (me = m({
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
              }(0, m({
                name: oe,
                width: Se,
                height: Ce
              }, yr().popup));
              return W.register(function() {
                return xo(Ve);
              }), W.register(function() {
                return mi(Ve);
              }), Ve;
            }
            throw new Error("No render context available for " + O);
          }).then(function(Q) {
            return H.setWindow(Q, {
              send: St
            }), H.setName(oe).then(function() {
              return H;
            });
          });
        }, Ci = function() {
          return p.try(function() {
            var O = Bo(window, "unload", kr(function() {
              Br(new Error("Window navigated away"));
            })), D = Ro(d, Br, 3e3);
            if (W.register(D.cancel), W.register(O.cancel), bt) return bt();
          });
        }, _i = function(O) {
          var D = !1;
          return O.isClosed().then(function(H) {
            return H ? (D = !0, Lt(new Error("Detected component window close"))) : p.delay(200).then(function() {
              return O.isClosed();
            }).then(function(B) {
              if (B)
                return D = !0, Lt(new Error("Detected component window close"));
            });
          }).then(function() {
            return D;
          });
        }, qr = function(O) {
          return Yt ? Yt(O) : p.try(function() {
            if (J.indexOf(O) === -1)
              return J.push(O), L.asyncReject(O), $.trigger(De.ERROR, O);
          });
        }, Ni = new p(), Ai = function(O) {
          return p.try(function() {
            Ni.resolve(O);
          });
        };
        hn.onError = qr;
        var Wi = function(O, D) {
          return O({
            uid: r,
            container: D.container,
            context: D.context,
            doc: D.doc,
            frame: D.frame,
            prerenderFrame: D.prerenderFrame,
            focus: Er,
            close: Lt,
            state: V,
            props: G,
            tag: P,
            dimensions: Ue(),
            event: $
          });
        }, Mi = function(O, D) {
          var H = D.context;
          return dr ? dr(O, {
            context: H
          }) : p.try(function() {
            if (g) {
              $.trigger(De.PRERENDER);
              var B = O.getWindow();
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
                  var Re = T.width, Se = Re !== void 0 && Re, Ze = T.height, Ce = Ze !== void 0 && Ze, Ve = T.element, Le = Ve === void 0 ? "body" : Ve;
                  if ((Le = Fn(Le, oe)) && (Se || Ce)) {
                    var me = Ho(Le, function(je) {
                      jr({
                        width: Se ? je.width : void 0,
                        height: Ce ? je.height : void 0
                      });
                    }, {
                      width: Se,
                      height: Ce,
                      win: B
                    });
                    $.on(De.RENDERED, me.cancel);
                  }
                  $.trigger(De.PRERENDERED);
                }
              }
            }
          });
        }, Fi = function(O, D) {
          var H = D.proxyFrame, B = D.proxyPrerenderFrame, oe = D.context, Q = D.rerender;
          return Qt ? Qt(O, {
            proxyFrame: H,
            proxyPrerenderFrame: B,
            context: oe,
            rerender: Q
          }) : p.hash({
            container: O.get(),
            frame: H ? H.get() : null,
            prerenderFrame: B ? B.get() : null,
            internalState: He()
          }).then(function(Re) {
            var Se = Re.container, Ze = Re.internalState.visible, Ce = Wi(l, {
              context: oe,
              container: Se,
              frame: Re.frame,
              prerenderFrame: Re.prerenderFrame,
              doc: document
            });
            if (Ce) {
              Ze || qo(Ce), za(Se, Ce);
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
              }(Ce, function() {
                var Le = new Error("Detected container element removed from DOM");
                return p.delay(1).then(function() {
                  if (!mr(Ce))
                    return W.all(Le), Q().then(Ye, Ne);
                  Lt(Le);
                });
              });
              return W.register(function() {
                return Ve.cancel();
              }), W.register(function() {
                return Ar(Ce);
              }), re = dn(Ce);
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
            updateProps: ss,
            show: Ot,
            hide: Ut
          };
        }, ro = function(O) {
          O === void 0 && (O = {});
          var D = Et, H = zi();
          wr(j, O), function(B, oe, Q, Re, Se) {
            var Ze = Re.state, Ce = Re.close, Ve = Re.focus, Le = Re.event, me = Re.onError;
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
                      close: Ce,
                      focus: Ve,
                      event: Le,
                      onError: me,
                      container: Se
                    })), !_e.default || Gt(pe) || Gt(Q[je]) || (pe = _e.default({
                      props: oe,
                      state: Ze,
                      close: Ce,
                      focus: Ve,
                      event: Le,
                      onError: me,
                      container: Se
                    })), Gt(pe)) {
                      if (_e.type === be.ARRAY ? !Array.isArray(pe) : typeof pe !== _e.type) throw new TypeError("Prop is not of type " + _e.type + ": " + je);
                    } else if (_e.required !== !1 && !Gt(Q[je])) throw new Error('Expected prop "' + je + '" to be defined');
                    return Gt(pe) && _e.decorate && (pe = _e.decorate({
                      value: pe,
                      props: oe,
                      state: Ze,
                      close: Ce,
                      focus: Ve,
                      event: Le,
                      onError: me,
                      container: Se
                    })), pe;
                  }());
                }
              });
            }), kn(oe, B, Ie);
          }(h, G, j, H, D);
        }, ss = function(O) {
          return ro(O), L.then(function() {
            var D = Me, H = le;
            if (D && H && Nt) return ct(Nt).then(function(B) {
              return D.updateProps(B).catch(function(oe) {
                return _i(H).then(function(Q) {
                  if (!Q) throw oe;
                });
              });
            });
          });
        }, Ui = function(O) {
          return zt ? zt(O) : p.try(function() {
            return Uo(O);
          }).then(function(D) {
            return Ln(D) && (D = function H(B) {
              var oe = function(Ze) {
                var Ce = function(Ve) {
                  for (; Ve.parentNode; ) Ve = Ve.parentNode;
                  if (Ln(Ve)) return Ve;
                }(Ze);
                if (Ce && Ce.host) return Ce.host;
              }(B);
              if (!oe) throw new Error("Element is not in shadow dom");
              var Q = "shadow-slot-" + st(), Re = document.createElement("slot");
              Re.setAttribute("name", Q), B.appendChild(Re);
              var Se = document.createElement("div");
              return Se.setAttribute("slot", Q), oe.appendChild(Se), Ln(oe) ? H(Se) : Se;
            }(D)), Et = D, dn(D);
          });
        };
        return {
          init: function() {
            (function() {
              $.on(De.RENDER, function() {
                return G.onRender();
              }), $.on(De.PRERENDER, function() {
                return G.onPrerender();
              }), $.on(De.DISPLAY, function() {
                return G.onDisplay();
              }), $.on(De.RENDERED, function() {
                return G.onRendered();
              }), $.on(De.PRERENDERED, function() {
                return G.onPrerendered();
              }), $.on(De.CLOSE, function() {
                return G.onClose();
              }), $.on(De.DESTROY, function() {
                return G.onDestroy();
              }), $.on(De.RESIZE, function() {
                return G.onResize();
              }), $.on(De.FOCUS, function() {
                return G.onFocus();
              }), $.on(De.PROPS, function(O) {
                return G.onProps(O);
              }), $.on(De.ERROR, function(O) {
                return G && G.onError ? G.onError(O) : Ne(O).then(function() {
                  setTimeout(function() {
                    throw O;
                  }, 1);
                });
              }), W.register($.reset);
            })();
          },
          render: function(O) {
            var D = O.target, H = O.container, B = O.context, oe = O.rerender;
            return p.try(function() {
              var Q = lr(), Re = x || lr();
              (function(K, ke, Be) {
                if (K !== window) {
                  if (!or(window, K)) throw new Error("Can only renderTo an adjacent frame");
                  var et = ie();
                  if (!wt(ke, et) && !U(K)) throw new Error("Can not render remotely to " + ke.toString() + " - can only render to " + et);
                  if (Be && typeof Be != "string") throw new Error("Container passed to renderTo must be a string selector, got " + typeof Be + " }");
                }
              })(D, Re, H);
              var Se = p.try(function() {
                if (D !== window) return function(K, ke) {
                  for (var Be = {}, et = 0, pt = Object.keys(G); et < pt.length; et++) {
                    var qe = pt[et], Rt = h[qe];
                    Rt && Rt.allowDelegate && (Be[qe] = G[qe]);
                  }
                  var nt = St(ke, "zoid_delegate_" + y, {
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
                    return W.register(function(M) {
                      if (!ze(ke)) return ee.destroy(M);
                    }), ee.getDelegateOverrides();
                  }).catch(function(k) {
                    throw new Error(`Unable to delegate rendering. Possibly the component is not loaded in the target window.

` + vr(k));
                  });
                  return zt = function() {
                    for (var k = arguments.length, ee = new Array(k), M = 0; M < k; M++) ee[M] = arguments[M];
                    return nt.then(function(ne) {
                      return ne.getProxyContainer.apply(ne, ee);
                    });
                  }, Qt = function() {
                    for (var k = arguments.length, ee = new Array(k), M = 0; M < k; M++) ee[M] = arguments[M];
                    return nt.then(function(ne) {
                      return ne.renderContainer.apply(ne, ee);
                    });
                  }, Zt = function() {
                    for (var k = arguments.length, ee = new Array(k), M = 0; M < k; M++) ee[M] = arguments[M];
                    return nt.then(function(ne) {
                      return ne.show.apply(ne, ee);
                    });
                  }, Xt = function() {
                    for (var k = arguments.length, ee = new Array(k), M = 0; M < k; M++) ee[M] = arguments[M];
                    return nt.then(function(ne) {
                      return ne.hide.apply(ne, ee);
                    });
                  }, bt = function() {
                    for (var k = arguments.length, ee = new Array(k), M = 0; M < k; M++) ee[M] = arguments[M];
                    return nt.then(function(ne) {
                      return ne.watchForUnload.apply(ne, ee);
                    });
                  }, K === We.IFRAME ? (xt = function() {
                    for (var k = arguments.length, ee = new Array(k), M = 0; M < k; M++) ee[M] = arguments[M];
                    return nt.then(function(ne) {
                      return ne.getProxyWindow.apply(ne, ee);
                    });
                  }, kt = function() {
                    for (var k = arguments.length, ee = new Array(k), M = 0; M < k; M++) ee[M] = arguments[M];
                    return nt.then(function(ne) {
                      return ne.openFrame.apply(ne, ee);
                    });
                  }, er = function() {
                    for (var k = arguments.length, ee = new Array(k), M = 0; M < k; M++) ee[M] = arguments[M];
                    return nt.then(function(ne) {
                      return ne.openPrerenderFrame.apply(ne, ee);
                    });
                  }, dr = function() {
                    for (var k = arguments.length, ee = new Array(k), M = 0; M < k; M++) ee[M] = arguments[M];
                    return nt.then(function(ne) {
                      return ne.prerender.apply(ne, ee);
                    });
                  }, fr = function() {
                    for (var k = arguments.length, ee = new Array(k), M = 0; M < k; M++) ee[M] = arguments[M];
                    return nt.then(function(ne) {
                      return ne.open.apply(ne, ee);
                    });
                  }, ce = function() {
                    for (var k = arguments.length, ee = new Array(k), M = 0; M < k; M++) ee[M] = arguments[M];
                    return nt.then(function(ne) {
                      return ne.openPrerender.apply(ne, ee);
                    });
                  }) : K === We.POPUP && (ur = function() {
                    for (var k = arguments.length, ee = new Array(k), M = 0; M < k; M++) ee[M] = arguments[M];
                    return nt.then(function(ne) {
                      return ne.setProxyWin.apply(ne, ee);
                    });
                  }), nt;
                }(B, D);
              }), Ze = G.window, Ce = Ci(), Ve = Si(h, G, "post"), Le = $.trigger(De.RENDER), me = Ui(H), je = Pt(), _e = me.then(function() {
                return ro();
              }), lt = _e.then(function() {
                return Si(h, G, "get").then(function(K) {
                  return function(ke, Be) {
                    var et = Be.query || {}, pt = Be.hash || {}, qe, Rt, nt = ke.split("#");
                    Rt = nt[1];
                    var k = (qe = nt[0]).split("?");
                    qe = k[0];
                    var ee = zo(k[1], et), M = zo(Rt, pt);
                    return ee && (qe = qe + "?" + ee), M && (qe = qe + "#" + M), qe;
                  }(xn(gr()), {
                    query: K
                  });
                });
              }), Xe = je.then(function(K) {
                return function(Be) {
                  var et = Be === void 0 ? {} : Be, pt = et.proxyWin, qe = et.initialChildDomain, Rt = et.childDomainMatch, nt = et.target, k = nt === void 0 ? window : nt, ee = et.context;
                  return function(M) {
                    var ne = M === void 0 ? {} : M, no = ne.proxyWin, ps = ne.childDomainMatch, vs = ne.context;
                    return ct(ne.initialChildDomain).then(function(ws) {
                      return {
                        uid: r,
                        context: vs,
                        tag: P,
                        childDomainMatch: ps,
                        version: "10_3_3",
                        props: ws,
                        exports: (Bi = no, {
                          init: function(ms) {
                            return hn(this.origin, ms);
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
                    childDomainMatch: Rt,
                    context: ee
                  }).then(function(M) {
                    var ne = yi({
                      data: M,
                      metaData: {
                        windowRef: Lr(k, qe, ee, pt)
                      },
                      sender: {
                        domain: ie(window)
                      },
                      receiver: {
                        win: pt,
                        domain: Rt
                      },
                      passByReference: qe === ie()
                    }), no = ne.serializedData;
                    return W.register(ne.cleanReference), no;
                  });
                }({
                  proxyWin: (ke = {
                    proxyWin: K,
                    initialChildDomain: Q,
                    childDomainMatch: Re,
                    target: D,
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
              }), Qe = zr(B), ut = p.hash({
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
              }), rt = p.hash({
                windowName: Xe,
                proxyFrame: pe,
                proxyWin: je
              }).then(function(K) {
                var ke = K.proxyWin;
                return Ze ? ke : Di(B, {
                  windowName: K.windowName,
                  proxyWin: ke,
                  proxyFrame: K.proxyFrame
                });
              }), hr = p.hash({
                proxyWin: rt,
                proxyPrerenderFrame: Qe
              }).then(function(K) {
                return Ur(B, K.proxyWin, K.proxyPrerenderFrame);
              }), Tt = rt.then(function(K) {
                return le = K, dt(K);
              }), At = p.hash({
                proxyPrerenderWin: hr,
                state: Tt
              }).then(function(K) {
                return Mi(K.proxyPrerenderWin, {
                  context: B
                });
              }), Li = p.hash({
                proxyWin: rt,
                windowName: Xe
              }).then(function(K) {
                if (Ze) return K.proxyWin.setName(K.windowName);
              }), cs = p.hash({
                body: Ve
              }).then(function(K) {
                return n.method ? n.method : Object.keys(K.body).length ? "post" : "get";
              }), ji = p.hash({
                proxyWin: rt,
                windowUrl: lt,
                body: Ve,
                method: cs,
                windowName: Li,
                prerender: At
              }).then(function(K) {
                return K.proxyWin.setLocation(K.windowUrl, {
                  method: K.method,
                  body: K.body
                });
              }), us = rt.then(function(K) {
                (function ke(Be, et) {
                  var pt = !1;
                  return W.register(function() {
                    pt = !0;
                  }), p.delay(2e3).then(function() {
                    return Be.isClosed();
                  }).then(function(qe) {
                    if (!pt) {
                      if (et === We.POPUP && qe) return Lt(new Error("Detected popup close"));
                      var Rt = !!(Et && mr(Et));
                      return et === We.IFRAME && qe && (Rt || Kt) ? Lt(new Error("Detected iframe close")) : ke(Be, et);
                    }
                  });
                })(K, B);
              }), ds = p.hash({
                container: ut,
                prerender: At
              }).then(function() {
                return $.trigger(De.DISPLAY);
              }), fs = rt.then(function(K) {
                return function(ke, Be, et) {
                  return p.try(function() {
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
                      var Rt = Wt(qe);
                      return Jt.linkUrl(pt, Be), Jt.openBridge(xn(qe), Rt);
                    }
                  });
                }(K, Q, B);
              }), ls = ji.then(function() {
                return p.try(function() {
                  var K = G.timeout;
                  if (K) return L.timeout(K, new Error("Loading component timed out after " + K + " milliseconds"));
                });
              }), hs = L.then(function() {
                return Kt = !0, $.trigger(De.RENDERED);
              });
              return p.hash({
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
                watchForClosePromise: us,
                onDisplayPromise: ds,
                openBridgePromise: fs,
                runTimeoutPromise: ls,
                onRenderedPromise: hs,
                delegatePromise: Se,
                watchForUnloadPromise: Ce,
                finalSetPropsPromise: _e
              });
            }).catch(function(Q) {
              return p.all([qr(Q), Br(Q)]).then(function() {
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
            return p.try(function() {
              return {
                getProxyContainer: Ui,
                show: Ot,
                hide: Ut,
                renderContainer: Fi,
                getProxyWindow: Pt,
                watchForUnload: Ci,
                openFrame: ft,
                openPrerenderFrame: zr,
                prerender: Mi,
                open: Di,
                openPrerender: Ur,
                setProxyWin: dt
              };
            });
          },
          getExports: function() {
            return A({
              getExports: function() {
                return Ni;
              }
            });
          }
        };
      }
      var Xa = {
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
              var g = u.findDOMNode(this), P = n(wr({}, this.props));
              P.render(g, We.IFRAME), this.setState({
                parent: P
              });
            }, l.componentDidUpdate = function() {
              this.state && this.state.parent && this.state.parent.updateProps(wr({}, this.props)).catch(Ie);
            }, h;
          }(a.Component);
        }
      }, Qa = {
        register: function(e, r, n, i) {
          return i.component(e, {
            render: function(a) {
              return a("div");
            },
            inheritAttrs: !1,
            mounted: function() {
              var a = this.$el;
              this.parent = n(m({}, (u = this.$attrs, Object.keys(u).reduce(function(d, h) {
                var l = u[h];
                return h === "style-object" || h === "styleObject" ? (d.style = l, d.styleObject = l) : h.includes("-") ? d[Nn(h)] = l : d[h] = l, d;
              }, {}))));
              var u;
              this.parent.render(a, We.IFRAME);
            },
            watch: {
              $attrs: {
                handler: function() {
                  this.parent && this.$attrs && this.parent.updateProps(m({}, this.$attrs)).catch(Ie);
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
              var i = this.$el;
              this.parent = n(m({}, (a = this.$attrs, Object.keys(a).reduce(function(u, d) {
                var h = a[d];
                return d === "style-object" || d === "styleObject" ? (u.style = h, u.styleObject = h) : d.includes("-") ? u[Nn(d)] = h : u[d] = h, u;
              }, {}))));
              var a;
              this.parent.render(i, We.IFRAME);
            },
            watch: {
              $attrs: {
                handler: function() {
                  this.parent && this.$attrs && this.parent.updateProps(m({}, this.$attrs)).catch(Ie);
                },
                deep: !0
              }
            }
          };
        }
      }, es = {
        register: function(e, r, n, i) {
          return i.module(e, []).directive(Nn(e), function() {
            for (var a = {}, u = 0, d = Object.keys(r); u < d.length; u++) a[d[u]] = "=";
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
                var P = function() {
                  return tn(h.props, function(w) {
                    return typeof w == "function" ? function() {
                      var E = w.apply(this, arguments);
                      return g(), E;
                    } : w;
                  });
                }, y = n(P());
                y.render(l[0], We.IFRAME), h.$watch(function() {
                  y.updateProps(P()).catch(Ie);
                });
              }]
            };
          });
        }
      }, ts = {
        register: function(e, r, n, i) {
          var a = i.Component, u = i.NgModule, d = i.ElementRef, h = i.NgZone, l = i.Inject, g = function() {
            function y(E, T) {
              this.elementRef = void 0, this.internalProps = void 0, this.parent = void 0, this.props = void 0, this.zone = void 0, this._props = void 0, this._props = {}, this.elementRef = E, this.zone = T;
            }
            var w = y.prototype;
            return w.getProps = function() {
              var E = this;
              return tn(m({}, this.internalProps, this.props), function(T) {
                if (typeof T == "function") {
                  var S = E.zone;
                  return function() {
                    var x = arguments, A = this;
                    return S.run(function() {
                      return T.apply(A, x);
                    });
                  };
                }
                return T;
              });
            }, w.ngOnInit = function() {
              var E = this.elementRef.nativeElement;
              this.parent = n(this.getProps()), this.parent.render(E, We.IFRAME);
            }, w.ngDoCheck = function() {
              this.parent && !function(E, T) {
                var S = {};
                for (var x in E) if (E.hasOwnProperty(x) && (S[x] = !0, E[x] !== T[x]))
                  return !1;
                for (var A in T) if (!S[A]) return !1;
                return !0;
              }(this._props, this.props) && (this._props = m({}, this.props), this.parent.updateProps(this.getProps()));
            }, y;
          }();
          g.annotations = void 0, g.parameters = void 0, g.parameters = [[new l(d)], [new l(h)]], g.annotations = [new a({
            selector: e,
            template: "<div></div>",
            inputs: ["props"]
          })];
          var P = function() {
          };
          return P.annotations = void 0, P.annotations = [new u({
            declarations: [g],
            exports: [g]
          })], P;
        }
      };
      function rs(e) {
        var r = e.uid, n = e.frame, i = e.prerenderFrame, a = e.doc, u = e.props, d = e.event, h = e.dimensions, l = h.width, g = h.height;
        if (n && i) {
          var P = a.createElement("div");
          P.setAttribute("id", r);
          var y = a.createElement("style");
          return u.cspNonce && y.setAttribute("nonce", u.cspNonce), y.appendChild(a.createTextNode(`
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
        `)), P.appendChild(n), P.appendChild(i), P.appendChild(y), i.classList.add("zoid-visible"), n.classList.add("zoid-invisible"), d.on(De.RENDERED, function() {
            i.classList.remove("zoid-visible"), i.classList.add("zoid-invisible"), n.classList.remove("zoid-invisible"), n.classList.add("zoid-visible"), setTimeout(function() {
              Ar(i);
            }, 1);
          }), d.on(De.RESIZE, function(w) {
            var E = w.width, T = w.height;
            typeof E == "number" && (P.style.width = Go(E)), typeof T == "number" && (P.style.height = Go(T));
          }), P;
        }
      }
      function ns(e) {
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
      var eo = rn(), to = rn();
      function os(e) {
        var r = function(T) {
          var S = T.tag, x = T.url, A = T.domain, L = T.bridgeUrl, J = T.props, W = J === void 0 ? {} : J, V = T.dimensions, j = V === void 0 ? {} : V, te = T.autoResize, $ = te === void 0 ? {} : te, he = T.allowedParentDomains, se = he === void 0 ? "*" : he, X = T.attributes, G = X === void 0 ? {} : X, le = T.defaultContext, re = le === void 0 ? We.IFRAME : le, Me = T.containerTemplate, Nt = Me === void 0 ? rs : Me, Et = T.prerenderTemplate, Kt = Et === void 0 ? ns : Et, Yt = T.validate, zt = T.eligible, Zt = zt === void 0 ? function() {
            return {
              eligible: !0
            };
          } : zt, Xt = T.logger, cr = Xt === void 0 ? {
            info: Ie
          } : Xt, Qt = T.exports, xt = Qt === void 0 ? Ie : Qt, ur = T.method, kt = T.children, er = kt === void 0 ? function() {
            return {};
          } : kt, dr = S.replace(/-/g, "_"), fr = m({}, {
            window: {
              type: be.OBJECT,
              sendToChild: !1,
              required: !1,
              allowDelegate: !0,
              validate: function(ce) {
                var bt = ce.value;
                if (!ir(bt) && !yt.isProxyWindow(bt)) throw new Error("Expected Window or ProxyWindow");
                if (ir(bt)) {
                  if (ze(bt)) throw new Error("Window is closed");
                  if (!U(bt)) throw new Error("Window is not same domain");
                }
              },
              decorate: function(ce) {
                return Mr(ce.value);
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
              childDecorate: function(ce) {
                return ce.close;
              }
            },
            focus: {
              type: be.FUNCTION,
              required: !1,
              sendToChild: !1,
              childDecorate: function(ce) {
                return ce.focus;
              }
            },
            resize: {
              type: be.FUNCTION,
              required: !1,
              sendToChild: !1,
              childDecorate: function(ce) {
                return ce.resize;
              }
            },
            uid: {
              type: be.STRING,
              required: !1,
              sendToChild: !1,
              childDecorate: function(ce) {
                return ce.uid;
              }
            },
            tag: {
              type: be.STRING,
              required: !1,
              sendToChild: !1,
              childDecorate: function(ce) {
                return ce.tag;
              }
            },
            getParent: {
              type: be.FUNCTION,
              required: !1,
              sendToChild: !1,
              childDecorate: function(ce) {
                return ce.getParent;
              }
            },
            getParentDomain: {
              type: be.FUNCTION,
              required: !1,
              sendToChild: !1,
              childDecorate: function(ce) {
                return ce.getParentDomain;
              }
            },
            show: {
              type: be.FUNCTION,
              required: !1,
              sendToChild: !1,
              childDecorate: function(ce) {
                return ce.show;
              }
            },
            hide: {
              type: be.FUNCTION,
              required: !1,
              sendToChild: !1,
              childDecorate: function(ce) {
                return ce.hide;
              }
            },
            export: {
              type: be.FUNCTION,
              required: !1,
              sendToChild: !1,
              childDecorate: function(ce) {
                return ce.export;
              }
            },
            onError: {
              type: be.FUNCTION,
              required: !1,
              sendToChild: !1,
              childDecorate: function(ce) {
                return ce.onError;
              }
            },
            onProps: {
              type: be.FUNCTION,
              required: !1,
              sendToChild: !1,
              childDecorate: function(ce) {
                return ce.onProps;
              }
            },
            getSiblings: {
              type: be.FUNCTION,
              required: !1,
              sendToChild: !1,
              childDecorate: function(ce) {
                return ce.getSiblings;
              }
            }
          }, W);
          if (!Nt) throw new Error("Container template required");
          return {
            name: dr,
            tag: S,
            url: x,
            domain: A,
            bridgeUrl: L,
            method: ur,
            propsDef: fr,
            dimensions: j,
            autoResize: $,
            allowedParentDomains: se,
            attributes: G,
            defaultContext: re,
            containerTemplate: Nt,
            prerenderTemplate: Kt,
            validate: Yt,
            logger: cr,
            eligible: Zt,
            children: er,
            exports: typeof xt == "function" ? xt : function(ce) {
              for (var bt = ce.getExports, fe = {}, Ke = function() {
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
        }(e), n = r.name, i = r.tag, a = r.defaultContext, u = r.propsDef, d = r.eligible, h = r.children, l = Fr(window), g = {}, P = [], y = function() {
          if (function(S) {
            try {
              return Qn(window.name).name === S;
            } catch {
            }
            return !1;
          }(n)) {
            var T = Pi().payload;
            if (T.tag === i && wt(T.childDomainMatch, ie())) return !0;
          }
          return !1;
        }, w = Vt(function() {
          if (y()) {
            if (window.xprops)
              throw delete l.components[i], new Error("Can not register " + n + " as child - child already registered");
            var T = function(S) {
              var x = S.tag, A = S.propsDef, L = S.autoResize, J = S.allowedParentDomains, W = [], V = Pi(), j = V.parent, te = V.payload, $ = j.win, he = j.domain, se, X = new p(), G = te.version, le = te.uid, re = te.exports, Me = te.context, Nt = te.props;
              if (!function(fe, Ke) {
                if (!/_/.test(fe) || !/_/.test("10_3_3")) throw new Error("Versions are in an invalid format (" + fe + ", 10_3_3)");
                return fe.split("_")[0] === "10_3_3".split("_")[0];
              }(G)) throw new Error("Parent window has zoid version " + G + ", child window has version 10_3_3");
              var Et = re.show, Kt = re.hide, Yt = re.close, zt = re.onError, Zt = re.checkClose, Xt = re.export, cr = re.resize, Qt = re.init, xt = function() {
                return $;
              }, ur = function() {
                return he;
              }, kt = function(fe) {
                return W.push(fe), {
                  cancel: function() {
                    W.splice(W.indexOf(fe), 1);
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
                var Ke = (fe === void 0 ? {} : fe).anyParent, Ue = [], Ye = se.parent;
                if (Ke === void 0 && (Ke = !Ye), !Ke && !Ye) throw new Error("No parent found for " + x + " child");
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
              }, ce = function(fe, Ke, Ue) {
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
                }($, A, fe, Ke, {
                  tag: x,
                  show: Et,
                  hide: Kt,
                  close: Yt,
                  focus: Za,
                  onError: zt,
                  resize: er,
                  getSiblings: fr,
                  onProps: kt,
                  getParent: xt,
                  getParentDomain: ur,
                  uid: le,
                  export: dr
                }, Ue);
                se ? wr(se, Ye) : se = Ye;
                for (var Ne = 0; Ne < W.length; Ne++) (0, W[Ne])(se);
              }, bt = function(fe) {
                return p.try(function() {
                  return ce(fe, he, !0);
                });
              };
              return {
                init: function() {
                  return p.try(function() {
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
                              windowRef: Ya(Ye)
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
                      componentName: S.name,
                      parentComponentWindow: $
                    }) || ""), Fr(window).exports = S.exports({
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
                      }), Ro($, function() {
                        Ri();
                      });
                    }(), Qt({
                      name: fe,
                      updateProps: bt,
                      close: Ri
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
                  return se || (ce(Nt, he), se);
                }
              };
            }(r);
            return T.init(), T;
          }
        }), E = function T(S) {
          var x, A = "zoid-" + i + "-" + st(), L = S || {}, J = d({
            props: L
          }), W = J.eligible, V = J.reason, j = L.onDestroy;
          L.onDestroy = function() {
            if (x && W && P.splice(P.indexOf(x), 1), j) return j.apply(void 0, arguments);
          };
          var te = xi({
            uid: A,
            options: r
          });
          te.init(), W ? te.setProps(L) : L.onDestroy && L.onDestroy(), eo.register(function(se) {
            return te.destroy(se || new Error("zoid destroyed all components"));
          });
          var $ = function(se) {
            var X = (se === void 0 ? {} : se).decorate;
            return T((X === void 0 ? Ma : X)(L));
          }, he = function(se, X, G) {
            return p.try(function() {
              if (!W) {
                var le = new Error(V || n + " component is not eligible");
                return te.destroy(le).then(function() {
                  throw le;
                });
              }
              if (!ir(se)) throw new Error("Must pass window to renderTo");
              return function(re, Me) {
                return p.try(function() {
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
              }(le, X), se !== window && typeof X != "string") throw new Error("Must pass string element when rendering to another window");
              return te.render({
                target: se,
                container: X,
                context: le,
                rerender: function() {
                  var re = $();
                  return wr(x, re), re.renderTo(se, X, G);
                }
              });
            }).catch(function(le) {
              return te.destroy(le).then(function() {
                throw le;
              });
            });
          };
          return x = m({}, te.getExports(), te.getHelpers(), function() {
            for (var se = h(), X = {}, G = function() {
              var Me = re[le], Nt = se[Me];
              X[Me] = function(Et) {
                var Kt = te.getProps(), Yt = m({}, Et, {
                  parent: {
                    uid: A,
                    props: Kt,
                    export: te.export
                  }
                });
                return Nt(Yt);
              };
            }, le = 0, re = Object.keys(se); le < re.length; le++) G();
            return X;
          }(), {
            isEligible: function() {
              return W;
            },
            clone: $,
            render: function(se, X) {
              return he(window, se, X);
            },
            renderTo: function(se, X, G) {
              return he(se, X, G);
            }
          }), W && P.push(x), x;
        };
        if (w(), function() {
          var T = Mt("zoid_allow_delegate_" + n, function() {
            return !0;
          }), S = Mt("zoid_delegate_" + n, function(x) {
            var A = x.data;
            return {
              parent: xi({
                uid: A.uid,
                options: r,
                overrides: A.overrides,
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
              react: Xa,
              angular: es,
              vue: Qa,
              vue3: ka,
              angular2: ts
            };
            if (!x[T]) throw new Error("Could not find driver for framework: " + T);
            return g[T] || (g[T] = x[T].register(i, u, E, S)), g[T];
          },
          isChild: y,
          canRenderTo: function(T) {
            return St(T, "zoid_allow_delegate_" + n).then(function(S) {
              return S.data;
            }).catch(function() {
              return !1;
            });
          },
          registerChild: w
        };
      }
      var is = function(e) {
        (function() {
          _t().initialized || (_t().initialized = !0, u = (a = {
            on: Mt,
            send: St
          }).on, d = a.send, (h = _t()).receiveMessage = h.receiveMessage || function(l) {
            return Zn(l, {
              on: u,
              send: d
            });
          }, function(l) {
            var g = l.on, P = l.send;
            we().getOrSet("postMessageListener", function() {
              return Bo(window, "message", function(y) {
                (function(w, E) {
                  var T = E.on, S = E.send;
                  p.try(function() {
                    var x = w.source || w.sourceElement, A = w.origin || w.originalEvent && w.originalEvent.origin, L = w.data;
                    if (A === "null" && (A = "file://"), x) {
                      if (!A) throw new Error("Post message did not have origin domain");
                      Zn({
                        source: x,
                        origin: A,
                        data: L
                      }, {
                        on: T,
                        send: S
                      });
                    }
                  });
                })(y, {
                  on: g,
                  send: P
                });
              });
            });
          }({
            on: Mt,
            send: St
          }), si({
            on: Mt,
            send: St,
            receiveMessage: Zn
          }), function(l) {
            var g = l.on, P = l.send;
            we("builtinListeners").getOrSet("helloListener", function() {
              var y = g("postrobot_hello", {
                domain: "*"
              }, function(E) {
                return Zo(E.source, {
                  domain: E.origin
                }), {
                  instanceID: Yo()
                };
              }), w = $t();
              return w && Bn(w, {
                send: P
              }).catch(function(E) {
              }), y;
            });
          }({
            on: Mt,
            send: St
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
        var i = r.registerChild();
        return i && (window.xprops = n.xprops = i.getProps()), n;
      };
      function Oi(e) {
        Jt && Jt.destroyBridges();
        var r = eo.all(e);
        return eo = rn(), r;
      }
      var Ii = Oi;
      function as(e) {
        return Ii(), delete window.__zoid_10_3_3__, function() {
          (function() {
            for (var n = we("responseListeners"), i = 0, a = n.keys(); i < a.length; i++) {
              var u = a[i], d = n.get(u);
              d && (d.cancelled = !0), n.del(u);
            }
          })(), (r = we().get("postMessageListener")) && r.cancel();
          var r;
          delete window.__post_robot_11_0_0__;
        }(), to.all(e);
      }
    }]);
  });
})(Ia);
var Da = Ia.exports;
const ea = Da.EVENT, Pr = {
  VISIBLE: "zoid-visible",
  INVISIBLE: "zoid-invisible"
};
function Bc({
  uid: t,
  frame: o,
  prerenderFrame: s,
  doc: c,
  props: f,
  event: v,
  dimensions: R
}) {
  const { width: m, height: I } = R, { top: C = 0, left: b = 0 } = f;
  if (!o || !s)
    return;
  const _ = c.createElement("div");
  _.setAttribute("id", t);
  const F = c.createElement("style");
  return f.cspNonce && F.setAttribute("nonce", f.cspNonce), F.appendChild(
    c.createTextNode(`
          #${t} {
              display: inline-block;
              position: absolute;
              width: ${m};
              height: ${I};
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
  ), _.appendChild(o), _.appendChild(s), _.appendChild(F), s.classList.add(Pr.INVISIBLE), o.classList.add(Pr.INVISIBLE), v.on(ea.RENDERED, () => {
    setTimeout(() => {
      o.classList.remove(Pr.INVISIBLE), o.classList.add(Pr.VISIBLE);
    }, 100), setTimeout(() => {
      s.remove();
    }, 1);
  }), v.on(ea.RESIZE, ({ width: de, height: ae }) => {
    typeof de == "number" && (_.style.width = `${de}px`), typeof ae == "number" && (_.style.height = `${ae}px`);
  }), _;
}
function qc(t) {
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
    containerTemplate: Bc
  });
}
function Hc(t) {
  return qc(t.id)(t);
}
class $c extends Error {
  constructor(o, s) {
    super(o, s), this.name = "FetchError", s != null && s.cause && !this.cause && (this.cause = s.cause);
  }
}
function Vc(t) {
  var I, C, b, _, F;
  const o = ((I = t.error) == null ? void 0 : I.message) || ((C = t.error) == null ? void 0 : C.toString()) || "", s = ((b = t.request) == null ? void 0 : b.method) || ((_ = t.options) == null ? void 0 : _.method) || "GET", c = ((F = t.request) == null ? void 0 : F.url) || String(t.request) || "/", f = `[${s}] ${JSON.stringify(c)}`, v = t.response ? `${t.response.status} ${t.response.statusText}` : "<no response>", R = `${f}: ${v}${o ? ` ${o}` : ""}`, m = new $c(
    R,
    t.error ? { cause: t.error } : void 0
  );
  for (const de of ["request", "options", "response"])
    Object.defineProperty(m, de, {
      get() {
        return t[de];
      }
    });
  for (const [de, ae] of [
    ["data", "_data"],
    ["status", "status"],
    ["statusCode", "status"],
    ["statusText", "statusText"],
    ["statusMessage", "statusText"]
  ])
    Object.defineProperty(m, de, {
      get() {
        return t.response && t.response[ae];
      }
    });
  return m;
}
const Gc = new Set(
  Object.freeze(["PATCH", "POST", "PUT", "DELETE"])
);
function ta(t = "GET") {
  return Gc.has(t.toUpperCase());
}
function Jc(t) {
  if (t === void 0)
    return !1;
  const o = typeof t;
  return o === "string" || o === "number" || o === "boolean" || o === null ? !0 : o !== "object" ? !1 : Array.isArray(t) ? !0 : t.buffer ? !1 : t.constructor && t.constructor.name === "Object" || typeof t.toJSON == "function";
}
const Kc = /* @__PURE__ */ new Set([
  "image/svg",
  "application/xml",
  "application/xhtml",
  "application/html"
]), Yc = /^application\/(?:[\w!#$%&*.^`~-]*\+)?json(;.+)?$/i;
function Zc(t = "") {
  if (!t)
    return "json";
  const o = t.split(";").shift() || "";
  return Yc.test(o) ? "json" : Kc.has(o) || o.startsWith("text/") ? "text" : "blob";
}
function Xc(t, o, s = globalThis.Headers) {
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
const Qc = /* @__PURE__ */ new Set([
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
]), kc = /* @__PURE__ */ new Set([101, 204, 205, 304]);
function Ca(t = {}) {
  const {
    fetch: o = globalThis.fetch,
    Headers: s = globalThis.Headers,
    AbortController: c = globalThis.AbortController
  } = t;
  async function f(m) {
    const I = m.error && m.error.name === "AbortError" && !m.options.timeout || !1;
    if (m.options.retry !== !1 && !I) {
      let b;
      typeof m.options.retry == "number" ? b = m.options.retry : b = ta(m.options.method) ? 0 : 1;
      const _ = m.response && m.response.status || 500;
      if (b > 0 && (Array.isArray(m.options.retryStatusCodes) ? m.options.retryStatusCodes.includes(_) : Qc.has(_))) {
        const F = m.options.retryDelay || 0;
        return F > 0 && await new Promise((de) => setTimeout(de, F)), v(m.request, {
          ...m.options,
          retry: b - 1
        });
      }
    }
    const C = Vc(m);
    throw Error.captureStackTrace && Error.captureStackTrace(C, v), C;
  }
  const v = async function(I, C = {}) {
    var de;
    const b = {
      request: I,
      options: Xc(C, t.defaults, s),
      response: void 0,
      error: void 0
    };
    b.options.method = (de = b.options.method) == null ? void 0 : de.toUpperCase(), b.options.onRequest && await b.options.onRequest(b), typeof b.request == "string" && (b.options.baseURL && (b.request = js(b.request, b.options.baseURL)), (b.options.query || b.options.params) && (b.request = En(b.request, {
      ...b.options.params,
      ...b.options.query
    }))), b.options.body && ta(b.options.method) && (Jc(b.options.body) ? (b.options.body = typeof b.options.body == "string" ? b.options.body : JSON.stringify(b.options.body), b.options.headers = new s(b.options.headers || {}), b.options.headers.has("content-type") || b.options.headers.set("content-type", "application/json"), b.options.headers.has("accept") || b.options.headers.set("accept", "application/json")) : (
      // ReadableStream Body
      ("pipeTo" in b.options.body && typeof b.options.body.pipeTo == "function" || // Node.js Stream Body
      typeof b.options.body.pipe == "function") && ("duplex" in b.options || (b.options.duplex = "half"))
    ));
    let _;
    if (!b.options.signal && b.options.timeout) {
      const ae = new c();
      _ = setTimeout(
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
      _ && clearTimeout(_);
    }
    if (b.response.body && !kc.has(b.response.status) && b.options.method !== "HEAD") {
      const ae = (b.options.parseResponse ? "json" : b.options.responseType) || Zc(b.response.headers.get("content-type") || "");
      switch (ae) {
        case "json": {
          const Ge = await b.response.text(), p = b.options.parseResponse || Oa;
          b.response._data = p(Ge);
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
  }, R = async function(I, C) {
    return (await v(I, C))._data;
  };
  return R.raw = v, R.native = (...m) => o(...m), R.create = (m = {}) => Ca({
    ...t,
    defaults: {
      ...t.defaults,
      ...m
    }
  }), R;
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
}(), eu = To.fetch || (() => Promise.reject(new Error("[ofetch] global.fetch is not supported!"))), tu = To.Headers, ru = To.AbortController, nu = Ca({ fetch: eu, Headers: tu, AbortController: ru }), ou = nu.create({
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
function iu() {
  var t = t || window;
  const o = new TextEncoder("utf-8"), s = new TextDecoder("utf-8");
  let c = new DataView(new ArrayBuffer(8));
  var f = [];
  class v {
    constructor() {
      this._callbackTimeouts = /* @__PURE__ */ new Map(), this._nextCallbackTimeoutID = 1;
      const m = () => new DataView(this._inst.exports.memory.buffer), I = (p) => {
        c.setBigInt64(0, p, !0);
        const N = c.getFloat64(0, !0);
        if (N === 0) return;
        if (!isNaN(N)) return N;
        const q = 0xffffffffn & p;
        return this._values[q];
      }, C = (p) => {
        let N = m().getBigUint64(p, !0);
        return I(N);
      }, b = (p) => {
        const N = 0x7ff80000n;
        if (typeof p == "number")
          return isNaN(p) ? N << 32n : p === 0 ? N << 32n | 1n : (c.setFloat64(0, p, !0), c.getBigInt64(0, !0));
        switch (p) {
          case void 0:
            return 0n;
          case null:
            return N << 32n | 2n;
          case !0:
            return N << 32n | 3n;
          case !1:
            return N << 32n | 4n;
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
        return q | (N | Y) << 32n;
      }, _ = (p, N) => {
        let q = b(N);
        m().setBigUint64(p, q, !0);
      }, F = (p, N, q) => new Uint8Array(this._inst.exports.memory.buffer, p, N), de = (p, N, q) => {
        const Y = new Array(N);
        for (let Ee = 0; Ee < N; Ee++) Y[Ee] = C(p + 8 * Ee);
        return Y;
      }, ae = (p, N) => s.decode(new DataView(this._inst.exports.memory.buffer, p, N)), Ge = Date.now() - performance.now();
      this.importObject = {
        wasi_snapshot_preview1: {
          fd_write: function(p, N, q, Y) {
            let Ee = 0;
            if (p == 1)
              for (let xe = 0; xe < q; xe++) {
                let Fe = N + 8 * xe, ve = m().getUint32(Fe + 0, !0), Ae = m().getUint32(Fe + 4, !0);
                Ee += Ae;
                for (let Z = 0; Z < Ae; Z++) {
                  let Pe = m().getUint8(ve + Z);
                  if (Pe != 13) if (Pe == 10) {
                    let ie = s.decode(new Uint8Array(f));
                    f = [], console.log(ie);
                  } else f.push(Pe);
                }
              }
            else console.error("invalid file descriptor:", p);
            return m().setUint32(Y, Ee, !0), 0;
          },
          fd_close: () => 0,
          fd_fdstat_get: () => 0,
          fd_seek: () => 0,
          proc_exit: (p) => {
            if (!t.process) throw "trying to exit with code " + p;
            process.exit(p);
          },
          random_get: (p, N) => (crypto.getRandomValues(F(p, N)), 0)
        },
        gojs: {
          "runtime.ticks": () => Ge + performance.now(),
          "runtime.sleepTicks": (p) => {
            setTimeout(this._inst.exports.go_scheduler, p);
          },
          "syscall/js.finalizeRef": (p) => {
            const N = m().getUint32(I(p), !0);
            if (this._goRefCounts[N]--, this._goRefCounts[N] === 0) {
              const q = this._values[N];
              this._values[N] = null, this._ids.delete(q), this._idPool.push(N);
            }
          },
          "syscall/js.stringVal": (p, N) => {
            const q = ae(p, N);
            return b(q);
          },
          "syscall/js.valueGet": (p, N, q) => {
            let Y = ae(N, q), Ee = I(p), xe = Reflect.get(Ee, Y);
            return b(xe);
          },
          "syscall/js.valueSet": (p, N, q, Y) => {
            const Ee = I(p), xe = ae(N, q), Fe = I(Y);
            Reflect.set(Ee, xe, Fe);
          },
          "syscall/js.valueDelete": (p, N, q) => {
            const Y = I(p), Ee = ae(N, q);
            Reflect.deleteProperty(Y, Ee);
          },
          "syscall/js.valueIndex": (p, N) => b(Reflect.get(I(p), N)),
          "syscall/js.valueSetIndex": (p, N, q) => {
            Reflect.set(I(p), N, I(q));
          },
          "syscall/js.valueCall": (p, N, q, Y, Ee, xe, Fe) => {
            const ve = I(N), Ae = ae(q, Y), Z = de(Ee, xe);
            try {
              const Pe = Reflect.get(ve, Ae);
              _(p, Reflect.apply(Pe, ve, Z)), m().setUint8(p + 8, 1);
            } catch (Pe) {
              _(p, Pe), m().setUint8(p + 8, 0);
            }
          },
          "syscall/js.valueInvoke": (p, N, q, Y, Ee) => {
            try {
              const xe = I(N), Fe = de(q, Y);
              _(p, Reflect.apply(xe, void 0, Fe)), m().setUint8(p + 8, 1);
            } catch (xe) {
              _(p, xe), m().setUint8(p + 8, 0);
            }
          },
          "syscall/js.valueNew": (p, N, q, Y, Ee) => {
            const xe = I(N), Fe = de(q, Y);
            try {
              _(p, Reflect.construct(xe, Fe)), m().setUint8(p + 8, 1);
            } catch (ve) {
              _(p, ve), m().setUint8(p + 8, 0);
            }
          },
          "syscall/js.valueLength": (p) => I(p).length,
          "syscall/js.valuePrepareString": (p, N) => {
            const q = String(I(N)), Y = o.encode(q);
            _(p, Y), m().setInt32(p + 8, Y.length, !0);
          },
          "syscall/js.valueLoadString": (p, N, q, Y) => {
            const Ee = I(p);
            F(N, q).set(Ee);
          },
          "syscall/js.valueInstanceOf": (p, N) => I(p) instanceof I(N),
          "syscall/js.copyBytesToGo": (p, N, q, Y, Ee) => {
            let xe = p, Fe = p + 4;
            const ve = F(N, q), Ae = I(Ee);
            if (!(Ae instanceof Uint8Array || Ae instanceof Uint8ClampedArray))
              return void m().setUint8(Fe, 0);
            const Z = Ae.subarray(0, ve.length);
            ve.set(Z), m().setUint32(xe, Z.length, !0), m().setUint8(Fe, 1);
          },
          "syscall/js.copyBytesToJS": (p, N, q, Y, Ee) => {
            let xe = p, Fe = p + 4;
            const ve = I(N), Ae = F(q, Y);
            if (!(ve instanceof Uint8Array || ve instanceof Uint8ClampedArray))
              return void m().setUint8(Fe, 0);
            const Z = Ae.subarray(0, ve.length);
            ve.set(Z), m().setUint32(xe, Z.length, !0), m().setUint8(Fe, 1);
          }
        }
      }, this.importObject.env = this.importObject.gojs;
    }
    async run(m) {
      for (this._inst = m, this._values = [NaN, 0, null, !0, !1, t, this], this._goRefCounts = [], this._ids = /* @__PURE__ */ new Map(), this._idPool = [], this.exited = !1; ; ) {
        const I = new Promise((C) => {
          this._resolveCallbackPromise = () => {
            if (this.exited)
              throw new Error("bad callback: Go program has already exited");
            setTimeout(C, 0);
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
    _makeFuncWrapper(m) {
      const I = this;
      return function() {
        const C = {
          id: m,
          this: this,
          args: arguments
        };
        return I._pendingEvent = C, I._resume(), C.result;
      };
    }
  }
  return new v();
}
class au {
  constructor() {
    It(this, "data");
    It(this, "mutex");
    this.mutex = new _a(), this.data = "";
  }
  async loadSource(o) {
    await this.mutex.acquire();
    try {
      this.data && (o.session = this.data);
      const s = JSON.stringify(o);
      for (let c = 1; c <= 3; c++)
        try {
          const f = await Jr.getInstance({}), { manifest: v, err: R, session: m } = await f.loadSource(s);
          if (R)
            throw new Error(R);
          return this.data = m, v;
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
class _a {
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
    this.uri = o, o || (this.uri = (s = window == null ? void 0 : window.sigmaCSPMEnv) == null ? void 0 : s.WASM_URL), this.instanceExpiration = Date.now() + 1e3, this.mutex = new _a();
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
          const v = await fetch(this.uri);
          this.wasm = await v.arrayBuffer();
        }
        window.loadSource !== null && (window.loadSource = null), window.getEventTracking = null, this.go && (this.go = null);
        const c = iu();
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
        return { err: c };
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
    return new au();
  }
};
It(Bt, "instance");
let Jr = Bt;
function ra(t, o, s) {
  var R;
  const c = o == null ? void 0 : o.find((m) => (m == null ? void 0 : m.id) == (t == null ? void 0 : t.availId)), v = ((R = c == null ? void 0 : c.ads) == null ? void 0 : R.filter((m) => (m == null ? void 0 : m.id) == (t == null ? void 0 : t.adsId))).find((m) => m.position === (t == null ? void 0 : t.position));
  return v && (v.availId = c == null ? void 0 : c.id), s && (s == null ? void 0 : s.id) == (v == null ? void 0 : v.id) && s.availId == (v == null ? void 0 : v.availId) ? s : v ? { ...v, impression: !1 } : null;
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
function na({ adsUrl: t, sdk: o, loader: s }) {
  return class extends s {
    constructor(f) {
      super(f);
    }
    load(f, v, R) {
      const m = R.onSuccess;
      R.onSuccess = async (I, C, b) => {
        (b.type === "manifest" || b.type === "level" || b.type === "audioTrack") && (I.data = await this.modifyManifest(I.url, I.data, b.type)), m(I, C, b);
      }, super.load(f, v, R);
    }
    async modifyManifest(f, v, R) {
      const m = {
        proxyAds: {
          uri: t,
          timeout: 2
        }
      };
      try {
        return await o.loadSource({ config: m, manifest: v, masterUri: f });
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
  const v = Uc(), R = qt(!1), m = qt(), I = Math.random().toString(36).slice(6);
  function C({ icons: U }) {
    const z = Pn(f, "/build/dist/wta/index.html");
    return {
      id: I,
      appConfig: {
        sdkBaseUrl: En(z || "https://localhost:4222/wta/index.html", { id: I })
      },
      icons: U
    };
  }
  if (!!o) {
    const U = Hc(C({
      icons: []
    }));
    U.render(o), U.hide(), o.style.display = "none", cc(() => {
      var z;
      if (m.value) {
        const ue = ((z = m.value) == null ? void 0 : z.icons) || [];
        o.style.display = "block", U.updateProps(C({
          icons: ue
        })), U.show();
      } else
        o.style.display = "none", U.hide();
    });
  }
  const _ = qt([]), F = qt(), de = qt([]);
  async function ae(U) {
    var z;
    try {
      const ue = (z = m.value) == null ? void 0 : z.trackingEvents.find((Te) => Te.eventType === U);
      if (!ue)
        return;
      v.trigger(ue), ue.beaconUrls.map((Te) => Lc(ou(Te, {
        retry: 3,
        retryDelay: 500
      })));
    } catch (ue) {
      console.error("[ERROR] ~ error:", ue);
    }
  }
  const Ge = /* @__PURE__ */ new Map();
  let p, N;
  function q(U, z, ue) {
    U.addEventListener(z, ue), Ge.set(z, ue);
  }
  async function Y(U) {
    const z = cu(U);
    if (z) {
      const { avails: ue } = await c.getEventTracking();
      m.value = ra(z, ue, m.value), z.events.forEach((Te) => {
        m.value && (m.value.impression || (ae("impression"), m.value.impression = !0), ae(Te), Te === "complete" && (m.value = void 0));
      });
    }
  }
  function Ee() {
    return R.value = !1, ["fullscreenchange", "webkitfullscreenchange", "mozfullscreenchange", "msfullscreenchange"].forEach((U) => {
      q(t, U, () => {
        const z = document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement;
        ae(z ? "fullscreen" : "exitFullscreen");
      });
    }), q(t, "pause", () => ae("pause")), q(t, "play", () => ae("resume")), q(t, "rewind", () => ae("rewind")), q(t, "mute", () => ae("mute")), q(t, "unmute", () => ae("unmute")), async (U, z) => {
      const { tagList: ue, _url: Te } = z.frag;
      ue.flat().find((Oe) => Oe === "EXT-X-CUE-OUT-CONT" || Oe === "EXT-X-CUE-OUT" || Oe === "EXT-X-CUE-IN") && Y(Te);
    };
  }
  async function xe() {
    return c.getEventTracking().then((U) => {
      for (const z of (U == null ? void 0 : U.avails) || [])
        for (const ue of z.ads) {
          const Te = `${z.id}_${ue.id}_${ue.startTimeInSeconds}`;
          for (const ot of ue.trackingEvents) {
            const Oe = `${Te}_${ot.eventType}`;
            de.value.find((at) => at.key === Oe) || de.value.push({
              ...ot,
              key: Oe,
              ad: {
                ...ue,
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
      function ue(Oe) {
        for (let Je = 0; Je < Oe.length; Je++)
          if (Oe[Je] === 0)
            return Je;
        return Oe.length;
      }
      const { start: Te, sn: ot } = z.frag;
      for (let Oe = 0; Oe < z.samples.length; Oe++) {
        const Je = z.samples[Oe], at = Je.data, Ct = Je.pts;
        if (String.fromCharCode.apply(null, at.slice(0, 3)) !== "ID3" || String.fromCharCode.apply(null, at.slice(10, 14)) !== "TXXX")
          continue;
        const Ht = at.slice(21, at.length), Yr = ue(Ht), $t = Ht.slice(Yr + 1, Ht.length), Ir = ue($t), Dr = new TextDecoder("utf-8").decode($t.slice(0, Ir)), or = {
          sn: ot,
          time: Ct - Te,
          value: Oa(Dr)
        };
        if (F.value && ot < F.value)
          return;
        _.value.push(or), or.value.event === "start" && xe();
      }
    };
  }
  function ve() {
    return (U) => {
      const z = U.track;
      z.kind === "metadata" && (z.oncuechange = async () => {
        const ue = z.activeCues;
        for (let Te = 0; Te < ue.length; Te++) {
          const ot = ue[Te];
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
      var ue, Te;
      const z = (ue = U == null ? void 0 : U.detail) == null ? void 0 : ue.value;
      if (((Te = U == null ? void 0 : U.detail) == null ? void 0 : Te.schemeIdUri) === "urn:sigma:dai:2018")
        try {
          const Oe = ((at) => {
            try {
              return atob(at);
            } catch (Ct) {
              return console.error("Invalid base64 string:", Ct), null;
            }
          })(z), Je = JSON.parse(Oe);
          if (Je.event = U.detail.id, Je) {
            const { avails: at } = await c.getEventTracking();
            m.value = ra(Je, at, m.value);
            const Ct = Je.event;
            m.value && (m.value.impression || (ae("impression"), m.value.impression = !0), ae(Ct), Ct === "complete" && (m.value = void 0));
          }
        } catch (ot) {
          console.error("Error decoding base64:", ot);
        }
    };
  }
  function Z(U, z) {
    v.on((ue) => {
      (U === "*" || ue.eventType === U) && z(ue);
    });
  }
  function Pe() {
    m.value = void 0, _.value = [], de.value = [], Vi(p), Vi(N), Ge.forEach((U, z) => {
      t.removeEventListener(z, U);
    }), Ge.clear();
  }
  function ie() {
    return {
      eventTracking: _,
      trackingDataEvent: de
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
async function lu({ video: t, adContainer: o, adsUrl: s, baseURL: c }) {
  const f = c || "https://cdn.jsdelivr.net/gh/sigmaott/sigma-ssai-web-sdk@v1.2.0", R = (await Jr.getInstance({ uri: Pn(f, "/build/dist/sigma-cspm.wasm") || "https://localhost:4222/sigma-cspm.wasm" })).createSession();
  function m() {
  }
  const { onEventTracking: I, destroy: C, videojsHelper: b, hlsHelper: _, shakaPlayerHelper: F, getLog: de } = uu({
    video: t,
    adContainer: o,
    trackingUrl: "",
    startSession: m,
    sdk: R,
    domain: f
  }), ae = qt(), Ge = qt();
  function p(Z) {
    Z.config.loader = na({ adsUrl: s, sdk: R, loader: Hls.DefaultConfig.loader }), ae.value = Z;
    const Pe = _.createHlsFragChanged(), ie = _.createHlsFragParsingMetadata();
    Z.on("hlsFragChanged", Pe), Z.on("hlsFragParsingMetadata", ie), Z.on(Hls.Events.ERROR, (U, z) => {
      console.error("HLS Error:", U, z), z.type === window.Hls.ErrorTypes.NETWORK_ERROR ? console.error("Network Error:", z.details) : z.type === window.Hls.ErrorTypes.MEDIA_ERROR ? console.error("Media Error:", z.details) : console.error("Other Error:", z.details);
    }), Ge.value = () => {
      Z.off("hlsFragChanged", Pe), Z.off("hlsFragParsingMetadata", ie);
    };
  }
  function N(Z) {
    Z.hls.config.loader = na({ adsUrl: s, sdk: R, loader: SigmaManager.DefaultConfig.loader }), ae.value = Z.hls;
    const Pe = _.createHlsFragChanged(), ie = _.createHlsFragParsingMetadata();
    Z.hls.on("hlsFragChanged", Pe), Z.hls.on("hlsFragParsingMetadata", ie), Z.on(SigmaManager.Events.ERROR, (U, z) => {
      console.error("HLS Error:", U, z), z.type === window.Hls.ErrorTypes.NETWORK_ERROR ? console.error("Network Error:", z.details) : z.type === window.Hls.ErrorTypes.MEDIA_ERROR ? console.error("Media Error:", z.details) : console.error("Other Error:", z.details);
    }), Ge.value = () => {
      Z.hls.destroy();
    };
  }
  const q = qt(), Y = qt(), xe = {
    instance: R,
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
    const ie = F.createShakaPlayerHandlerEvent();
    Z.addEventListener("timelineregionenter", ie), Z.getNetworkingEngine().registerRequestFilter((U, z) => {
    }), Z.getNetworkingEngine().registerResponseFilter(async (U, z) => {
      if (U === 0) {
        const ue = new TextDecoder().decode(z.data), Te = await R.loadSource({
          config: {
            proxyAds: {
              uri: s,
              timeout: 2e3
            }
          },
          masterUri: Pe,
          manifest: ue
        });
        z.data = new TextEncoder().encode(Te);
      }
    });
  }
  function Ae() {
    var Z, Pe;
    C(), (Z = Ge.value) == null || Z.call(Ge), (Pe = Y.value) == null || Pe.call(Y), ae.value = null, q.value = null, Ge.value = null, Y.value = null;
  }
  return {
    onEventTracking: I,
    destroy: Ae,
    sigmaPlayer: {
      attachVideojs: Fe,
      attachHls: p,
      attachSigmaDrm: N,
      getLog: de,
      attachShaka: ve
    },
    sdk: R,
    cspm: xe
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
    } catch (m) {
      console.error("Error loading source:", m);
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
        (R, m) => {
          if (this.request) {
            if (s.resolvedUri = o(this.handleManifestRedirects, s.resolvedUri, m), R)
              return this.playlistRequestError(this.request, s, f);
            this.haveMetadata({
              playlistString: m.responseText,
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
    const v = c.segments || [], R = v[v.length - 1], m = R && R.parts && R.parts[R.parts.length - 1], I = m && m.duration || R && R.duration;
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
      const C = (c.partTargetDuration || c.targetDuration) / 2 * 1e3 || 5e3;
      this.finalRenditionTimeout = window.setTimeout(this.media.bind(this, c, !1), C);
      return;
    }
    const v = this.state, R = !this.media_ || c.id !== this.media_.id, m = this.main.playlists[c.id];
    if (m && m.endList || c.endList && c.segments.length) {
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
      (C, b) => {
        if (this.request) {
          if (c.lastRequest = Date.now(), c.resolvedUri = s(c.resolvedUri, b), C)
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
  const f = Bs(t), v = f["sigma.dai.adsEndpoint"];
  if (!v)
    return { playerUrl: t, adsUrl: null };
  const R = {}, m = {};
  for (const [C, b] of Object.entries(f))
    C.startsWith("sigma.dai") ? C !== "sigma.dai.adsEndpoint" && (R[C.replace("sigma.dai.", "")] = b) : m[C] = b;
  return {
    playerUrl: En(c, m),
    adsUrl: En(Pn(o, v), R)
  };
}
export {
  lu as createSigmaDai,
  hu as processURL
};
