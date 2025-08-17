(function () {
  const t = document.createElement("link").relList;
  if (t && t.supports && t.supports("modulepreload")) return;
  for (const r of document.querySelectorAll('link[rel="modulepreload"]')) s(r);
  new MutationObserver((r) => {
    for (const o of r)
      if (o.type === "childList")
        for (const i of o.addedNodes)
          i.tagName === "LINK" && i.rel === "modulepreload" && s(i);
  }).observe(document, { childList: !0, subtree: !0 });
  function n(r) {
    const o = {};
    return (
      r.integrity && (o.integrity = r.integrity),
      r.referrerPolicy && (o.referrerPolicy = r.referrerPolicy),
      r.crossOrigin === "use-credentials"
        ? (o.credentials = "include")
        : r.crossOrigin === "anonymous"
          ? (o.credentials = "omit")
          : (o.credentials = "same-origin"),
      o
    );
  }
  function s(r) {
    if (r.ep) return;
    r.ep = !0;
    const o = n(r);
    fetch(r.href, o);
  }
})();
/**
 * @vue/shared v3.5.18
 * (c) 2018-present Yuxi (Evan) You and Vue contributors
 * @license MIT
 **/ /*! #__NO_SIDE_EFFECTS__ */ function ms(e) {
  const t = Object.create(null);
  for (const n of e.split(",")) t[n] = 1;
  return (n) => n in t;
}
const re = {},
  It = [],
  We = () => {},
  hi = () => !1,
  Cn = (e) =>
    e.charCodeAt(0) === 111 &&
    e.charCodeAt(1) === 110 &&
    (e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97),
  vs = (e) => e.startsWith("onUpdate:"),
  _e = Object.assign,
  _s = (e, t) => {
    const n = e.indexOf(t);
    n > -1 && e.splice(n, 1);
  },
  pi = Object.prototype.hasOwnProperty,
  X = (e, t) => pi.call(e, t),
  D = Array.isArray,
  Vt = (e) => Pn(e) === "[object Map]",
  gi = (e) => Pn(e) === "[object Set]",
  B = (e) => typeof e == "function",
  de = (e) => typeof e == "string",
  Ft = (e) => typeof e == "symbol",
  ce = (e) => e !== null && typeof e == "object",
  kr = (e) => (ce(e) || B(e)) && B(e.then) && B(e.catch),
  mi = Object.prototype.toString,
  Pn = (e) => mi.call(e),
  vi = (e) => Pn(e).slice(8, -1),
  _i = (e) => Pn(e) === "[object Object]",
  ys = (e) =>
    de(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e,
  Ut = ms(
    ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted",
  ),
  On = (e) => {
    const t = Object.create(null);
    return (n) => t[n] || (t[n] = e(n));
  },
  yi = /-(\w)/g,
  Ae = On((e) => e.replace(yi, (t, n) => (n ? n.toUpperCase() : ""))),
  bi = /\B([A-Z])/g,
  wt = On((e) => e.replace(bi, "-$1").toLowerCase()),
  In = On((e) => e.charAt(0).toUpperCase() + e.slice(1)),
  $n = On((e) => (e ? `on${In(e)}` : "")),
  dt = (e, t) => !Object.is(e, t),
  Hn = (e, ...t) => {
    for (let n = 0; n < e.length; n++) e[n](...t);
  },
  Zn = (e, t, n, s = !1) => {
    Object.defineProperty(e, t, {
      configurable: !0,
      enumerable: !1,
      writable: s,
      value: n,
    });
  },
  xi = (e) => {
    const t = parseFloat(e);
    return isNaN(t) ? e : t;
  };
let Ks;
const Tn = () =>
  Ks ||
  (Ks =
    typeof globalThis < "u"
      ? globalThis
      : typeof self < "u"
        ? self
        : typeof window < "u"
          ? window
          : typeof global < "u"
            ? global
            : {});
function bs(e) {
  if (D(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
      const s = e[n],
        r = de(s) ? Ri(s) : bs(s);
      if (r) for (const o in r) t[o] = r[o];
    }
    return t;
  } else if (de(e) || ce(e)) return e;
}
const wi = /;(?![^(]*\))/g,
  Ei = /:([^]+)/,
  Si = /\/\*[^]*?\*\//g;
function Ri(e) {
  const t = {};
  return (
    e
      .replace(Si, "")
      .split(wi)
      .forEach((n) => {
        if (n) {
          const s = n.split(Ei);
          s.length > 1 && (t[s[0].trim()] = s[1].trim());
        }
      }),
    t
  );
}
function xs(e) {
  let t = "";
  if (de(e)) t = e;
  else if (D(e))
    for (let n = 0; n < e.length; n++) {
      const s = xs(e[n]);
      s && (t += s + " ");
    }
  else if (ce(e)) for (const n in e) e[n] && (t += n + " ");
  return t.trim();
}
const Ci =
    "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",
  Pi = ms(Ci);
function $r(e) {
  return !!e || e === "";
}
/**
 * @vue/reactivity v3.5.18
 * (c) 2018-present Yuxi (Evan) You and Vue contributors
 * @license MIT
 **/ let ge;
class Hr {
  constructor(t = !1) {
    ((this.detached = t),
      (this._active = !0),
      (this._on = 0),
      (this.effects = []),
      (this.cleanups = []),
      (this._isPaused = !1),
      (this.parent = ge),
      !t &&
        ge &&
        (this.index = (ge.scopes || (ge.scopes = [])).push(this) - 1));
  }
  get active() {
    return this._active;
  }
  pause() {
    if (this._active) {
      this._isPaused = !0;
      let t, n;
      if (this.scopes)
        for (t = 0, n = this.scopes.length; t < n; t++) this.scopes[t].pause();
      for (t = 0, n = this.effects.length; t < n; t++) this.effects[t].pause();
    }
  }
  resume() {
    if (this._active && this._isPaused) {
      this._isPaused = !1;
      let t, n;
      if (this.scopes)
        for (t = 0, n = this.scopes.length; t < n; t++) this.scopes[t].resume();
      for (t = 0, n = this.effects.length; t < n; t++) this.effects[t].resume();
    }
  }
  run(t) {
    if (this._active) {
      const n = ge;
      try {
        return ((ge = this), t());
      } finally {
        ge = n;
      }
    }
  }
  on() {
    ++this._on === 1 && ((this.prevScope = ge), (ge = this));
  }
  off() {
    this._on > 0 &&
      --this._on === 0 &&
      ((ge = this.prevScope), (this.prevScope = void 0));
  }
  stop(t) {
    if (this._active) {
      this._active = !1;
      let n, s;
      for (n = 0, s = this.effects.length; n < s; n++) this.effects[n].stop();
      for (this.effects.length = 0, n = 0, s = this.cleanups.length; n < s; n++)
        this.cleanups[n]();
      if (((this.cleanups.length = 0), this.scopes)) {
        for (n = 0, s = this.scopes.length; n < s; n++) this.scopes[n].stop(!0);
        this.scopes.length = 0;
      }
      if (!this.detached && this.parent && !t) {
        const r = this.parent.scopes.pop();
        r &&
          r !== this &&
          ((this.parent.scopes[this.index] = r), (r.index = this.index));
      }
      this.parent = void 0;
    }
  }
}
function Dr(e) {
  return new Hr(e);
}
function Br() {
  return ge;
}
function Oi(e, t = !1) {
  ge && ge.cleanups.push(e);
}
let se;
const Dn = new WeakSet();
class Vr {
  constructor(t) {
    ((this.fn = t),
      (this.deps = void 0),
      (this.depsTail = void 0),
      (this.flags = 5),
      (this.next = void 0),
      (this.cleanup = void 0),
      (this.scheduler = void 0),
      ge && ge.active && ge.effects.push(this));
  }
  pause() {
    this.flags |= 64;
  }
  resume() {
    this.flags & 64 &&
      ((this.flags &= -65), Dn.has(this) && (Dn.delete(this), this.trigger()));
  }
  notify() {
    (this.flags & 2 && !(this.flags & 32)) || this.flags & 8 || Kr(this);
  }
  run() {
    if (!(this.flags & 1)) return this.fn();
    ((this.flags |= 2), Ws(this), Wr(this));
    const t = se,
      n = Le;
    ((se = this), (Le = !0));
    try {
      return this.fn();
    } finally {
      (Gr(this), (se = t), (Le = n), (this.flags &= -3));
    }
  }
  stop() {
    if (this.flags & 1) {
      for (let t = this.deps; t; t = t.nextDep) Ss(t);
      ((this.deps = this.depsTail = void 0),
        Ws(this),
        this.onStop && this.onStop(),
        (this.flags &= -2));
    }
  }
  trigger() {
    this.flags & 64
      ? Dn.add(this)
      : this.scheduler
        ? this.scheduler()
        : this.runIfDirty();
  }
  runIfDirty() {
    es(this) && this.run();
  }
  get dirty() {
    return es(this);
  }
}
let Ur = 0,
  Kt,
  Wt;
function Kr(e, t = !1) {
  if (((e.flags |= 8), t)) {
    ((e.next = Wt), (Wt = e));
    return;
  }
  ((e.next = Kt), (Kt = e));
}
function ws() {
  Ur++;
}
function Es() {
  if (--Ur > 0) return;
  if (Wt) {
    let t = Wt;
    for (Wt = void 0; t; ) {
      const n = t.next;
      ((t.next = void 0), (t.flags &= -9), (t = n));
    }
  }
  let e;
  for (; Kt; ) {
    let t = Kt;
    for (Kt = void 0; t; ) {
      const n = t.next;
      if (((t.next = void 0), (t.flags &= -9), t.flags & 1))
        try {
          t.trigger();
        } catch (s) {
          e || (e = s);
        }
      t = n;
    }
  }
  if (e) throw e;
}
function Wr(e) {
  for (let t = e.deps; t; t = t.nextDep)
    ((t.version = -1),
      (t.prevActiveLink = t.dep.activeLink),
      (t.dep.activeLink = t));
}
function Gr(e) {
  let t,
    n = e.depsTail,
    s = n;
  for (; s; ) {
    const r = s.prevDep;
    (s.version === -1 ? (s === n && (n = r), Ss(s), Ii(s)) : (t = s),
      (s.dep.activeLink = s.prevActiveLink),
      (s.prevActiveLink = void 0),
      (s = r));
  }
  ((e.deps = t), (e.depsTail = n));
}
function es(e) {
  for (let t = e.deps; t; t = t.nextDep)
    if (
      t.dep.version !== t.version ||
      (t.dep.computed && (qr(t.dep.computed) || t.dep.version !== t.version))
    )
      return !0;
  return !!e._dirty;
}
function qr(e) {
  if (
    (e.flags & 4 && !(e.flags & 16)) ||
    ((e.flags &= -17), e.globalVersion === Zt) ||
    ((e.globalVersion = Zt),
    !e.isSSR && e.flags & 128 && ((!e.deps && !e._dirty) || !es(e)))
  )
    return;
  e.flags |= 2;
  const t = e.dep,
    n = se,
    s = Le;
  ((se = e), (Le = !0));
  try {
    Wr(e);
    const r = e.fn(e._value);
    (t.version === 0 || dt(r, e._value)) &&
      ((e.flags |= 128), (e._value = r), t.version++);
  } catch (r) {
    throw (t.version++, r);
  } finally {
    ((se = n), (Le = s), Gr(e), (e.flags &= -3));
  }
}
function Ss(e, t = !1) {
  const { dep: n, prevSub: s, nextSub: r } = e;
  if (
    (s && ((s.nextSub = r), (e.prevSub = void 0)),
    r && ((r.prevSub = s), (e.nextSub = void 0)),
    n.subs === e && ((n.subs = s), !s && n.computed))
  ) {
    n.computed.flags &= -5;
    for (let o = n.computed.deps; o; o = o.nextDep) Ss(o, !0);
  }
  !t && !--n.sc && n.map && n.map.delete(n.key);
}
function Ii(e) {
  const { prevDep: t, nextDep: n } = e;
  (t && ((t.nextDep = n), (e.prevDep = void 0)),
    n && ((n.prevDep = t), (e.nextDep = void 0)));
}
let Le = !0;
const zr = [];
function tt() {
  (zr.push(Le), (Le = !1));
}
function nt() {
  const e = zr.pop();
  Le = e === void 0 ? !0 : e;
}
function Ws(e) {
  const { cleanup: t } = e;
  if (((e.cleanup = void 0), t)) {
    const n = se;
    se = void 0;
    try {
      t();
    } finally {
      se = n;
    }
  }
}
let Zt = 0;
class Ti {
  constructor(t, n) {
    ((this.sub = t),
      (this.dep = n),
      (this.version = n.version),
      (this.nextDep =
        this.prevDep =
        this.nextSub =
        this.prevSub =
        this.prevActiveLink =
          void 0));
  }
}
class Rs {
  constructor(t) {
    ((this.computed = t),
      (this.version = 0),
      (this.activeLink = void 0),
      (this.subs = void 0),
      (this.map = void 0),
      (this.key = void 0),
      (this.sc = 0),
      (this.__v_skip = !0));
  }
  track(t) {
    if (!se || !Le || se === this.computed) return;
    let n = this.activeLink;
    if (n === void 0 || n.sub !== se)
      ((n = this.activeLink = new Ti(se, this)),
        se.deps
          ? ((n.prevDep = se.depsTail),
            (se.depsTail.nextDep = n),
            (se.depsTail = n))
          : (se.deps = se.depsTail = n),
        Yr(n));
    else if (n.version === -1 && ((n.version = this.version), n.nextDep)) {
      const s = n.nextDep;
      ((s.prevDep = n.prevDep),
        n.prevDep && (n.prevDep.nextDep = s),
        (n.prevDep = se.depsTail),
        (n.nextDep = void 0),
        (se.depsTail.nextDep = n),
        (se.depsTail = n),
        se.deps === n && (se.deps = s));
    }
    return n;
  }
  trigger(t) {
    (this.version++, Zt++, this.notify(t));
  }
  notify(t) {
    ws();
    try {
      for (let n = this.subs; n; n = n.prevSub)
        n.sub.notify() && n.sub.dep.notify();
    } finally {
      Es();
    }
  }
}
function Yr(e) {
  if ((e.dep.sc++, e.sub.flags & 4)) {
    const t = e.dep.computed;
    if (t && !e.dep.subs) {
      t.flags |= 20;
      for (let s = t.deps; s; s = s.nextDep) Yr(s);
    }
    const n = e.dep.subs;
    (n !== e && ((e.prevSub = n), n && (n.nextSub = e)), (e.dep.subs = e));
  }
}
const vn = new WeakMap(),
  yt = Symbol(""),
  ts = Symbol(""),
  en = Symbol("");
function me(e, t, n) {
  if (Le && se) {
    let s = vn.get(e);
    s || vn.set(e, (s = new Map()));
    let r = s.get(n);
    (r || (s.set(n, (r = new Rs())), (r.map = s), (r.key = n)), r.track());
  }
}
function et(e, t, n, s, r, o) {
  const i = vn.get(e);
  if (!i) {
    Zt++;
    return;
  }
  const l = (c) => {
    c && c.trigger();
  };
  if ((ws(), t === "clear")) i.forEach(l);
  else {
    const c = D(e),
      h = c && ys(n);
    if (c && n === "length") {
      const a = Number(s);
      i.forEach((d, g) => {
        (g === "length" || g === en || (!Ft(g) && g >= a)) && l(d);
      });
    } else
      switch (
        ((n !== void 0 || i.has(void 0)) && l(i.get(n)), h && l(i.get(en)), t)
      ) {
        case "add":
          c ? h && l(i.get("length")) : (l(i.get(yt)), Vt(e) && l(i.get(ts)));
          break;
        case "delete":
          c || (l(i.get(yt)), Vt(e) && l(i.get(ts)));
          break;
        case "set":
          Vt(e) && l(i.get(yt));
          break;
      }
  }
  Es();
}
function Ai(e, t) {
  const n = vn.get(e);
  return n && n.get(t);
}
function Rt(e) {
  const t = G(e);
  return t === e ? t : (me(t, "iterate", en), Ne(e) ? t : t.map(be));
}
function Cs(e) {
  return (me((e = G(e)), "iterate", en), e);
}
const Mi = {
  __proto__: null,
  [Symbol.iterator]() {
    return Bn(this, Symbol.iterator, be);
  },
  concat(...e) {
    return Rt(this).concat(...e.map((t) => (D(t) ? Rt(t) : t)));
  },
  entries() {
    return Bn(this, "entries", (e) => ((e[1] = be(e[1])), e));
  },
  every(e, t) {
    return Ye(this, "every", e, t, void 0, arguments);
  },
  filter(e, t) {
    return Ye(this, "filter", e, t, (n) => n.map(be), arguments);
  },
  find(e, t) {
    return Ye(this, "find", e, t, be, arguments);
  },
  findIndex(e, t) {
    return Ye(this, "findIndex", e, t, void 0, arguments);
  },
  findLast(e, t) {
    return Ye(this, "findLast", e, t, be, arguments);
  },
  findLastIndex(e, t) {
    return Ye(this, "findLastIndex", e, t, void 0, arguments);
  },
  forEach(e, t) {
    return Ye(this, "forEach", e, t, void 0, arguments);
  },
  includes(...e) {
    return Vn(this, "includes", e);
  },
  indexOf(...e) {
    return Vn(this, "indexOf", e);
  },
  join(e) {
    return Rt(this).join(e);
  },
  lastIndexOf(...e) {
    return Vn(this, "lastIndexOf", e);
  },
  map(e, t) {
    return Ye(this, "map", e, t, void 0, arguments);
  },
  pop() {
    return $t(this, "pop");
  },
  push(...e) {
    return $t(this, "push", e);
  },
  reduce(e, ...t) {
    return Gs(this, "reduce", e, t);
  },
  reduceRight(e, ...t) {
    return Gs(this, "reduceRight", e, t);
  },
  shift() {
    return $t(this, "shift");
  },
  some(e, t) {
    return Ye(this, "some", e, t, void 0, arguments);
  },
  splice(...e) {
    return $t(this, "splice", e);
  },
  toReversed() {
    return Rt(this).toReversed();
  },
  toSorted(e) {
    return Rt(this).toSorted(e);
  },
  toSpliced(...e) {
    return Rt(this).toSpliced(...e);
  },
  unshift(...e) {
    return $t(this, "unshift", e);
  },
  values() {
    return Bn(this, "values", be);
  },
};
function Bn(e, t, n) {
  const s = Cs(e),
    r = s[t]();
  return (
    s !== e &&
      !Ne(e) &&
      ((r._next = r.next),
      (r.next = () => {
        const o = r._next();
        return (o.value && (o.value = n(o.value)), o);
      })),
    r
  );
}
const Li = Array.prototype;
function Ye(e, t, n, s, r, o) {
  const i = Cs(e),
    l = i !== e && !Ne(e),
    c = i[t];
  if (c !== Li[t]) {
    const d = c.apply(e, o);
    return l ? be(d) : d;
  }
  let h = n;
  i !== e &&
    (l
      ? (h = function (d, g) {
          return n.call(this, be(d), g, e);
        })
      : n.length > 2 &&
        (h = function (d, g) {
          return n.call(this, d, g, e);
        }));
  const a = c.call(i, h, s);
  return l && r ? r(a) : a;
}
function Gs(e, t, n, s) {
  const r = Cs(e);
  let o = n;
  return (
    r !== e &&
      (Ne(e)
        ? n.length > 3 &&
          (o = function (i, l, c) {
            return n.call(this, i, l, c, e);
          })
        : (o = function (i, l, c) {
            return n.call(this, i, be(l), c, e);
          })),
    r[t](o, ...s)
  );
}
function Vn(e, t, n) {
  const s = G(e);
  me(s, "iterate", en);
  const r = s[t](...n);
  return (r === -1 || r === !1) && Is(n[0])
    ? ((n[0] = G(n[0])), s[t](...n))
    : r;
}
function $t(e, t, n = []) {
  (tt(), ws());
  const s = G(e)[t].apply(e, n);
  return (Es(), nt(), s);
}
const Ni = ms("__proto__,__v_isRef,__isVue"),
  Jr = new Set(
    Object.getOwnPropertyNames(Symbol)
      .filter((e) => e !== "arguments" && e !== "caller")
      .map((e) => Symbol[e])
      .filter(Ft),
  );
function Fi(e) {
  Ft(e) || (e = String(e));
  const t = G(this);
  return (me(t, "has", e), t.hasOwnProperty(e));
}
class Qr {
  constructor(t = !1, n = !1) {
    ((this._isReadonly = t), (this._isShallow = n));
  }
  get(t, n, s) {
    if (n === "__v_skip") return t.__v_skip;
    const r = this._isReadonly,
      o = this._isShallow;
    if (n === "__v_isReactive") return !r;
    if (n === "__v_isReadonly") return r;
    if (n === "__v_isShallow") return o;
    if (n === "__v_raw")
      return s === (r ? (o ? Wi : to) : o ? eo : Zr).get(t) ||
        Object.getPrototypeOf(t) === Object.getPrototypeOf(s)
        ? t
        : void 0;
    const i = D(t);
    if (!r) {
      let c;
      if (i && (c = Mi[n])) return c;
      if (n === "hasOwnProperty") return Fi;
    }
    const l = Reflect.get(t, n, le(t) ? t : s);
    return (Ft(n) ? Jr.has(n) : Ni(n)) || (r || me(t, "get", n), o)
      ? l
      : le(l)
        ? i && ys(n)
          ? l
          : l.value
        : ce(l)
          ? r
            ? so(l)
            : jt(l)
          : l;
  }
}
class Xr extends Qr {
  constructor(t = !1) {
    super(!1, t);
  }
  set(t, n, s, r) {
    let o = t[n];
    if (!this._isShallow) {
      const c = xt(o);
      if (
        (!Ne(s) && !xt(s) && ((o = G(o)), (s = G(s))), !D(t) && le(o) && !le(s))
      )
        return c ? !1 : ((o.value = s), !0);
    }
    const i = D(t) && ys(n) ? Number(n) < t.length : X(t, n),
      l = Reflect.set(t, n, s, le(t) ? t : r);
    return (
      t === G(r) && (i ? dt(s, o) && et(t, "set", n, s) : et(t, "add", n, s)),
      l
    );
  }
  deleteProperty(t, n) {
    const s = X(t, n);
    t[n];
    const r = Reflect.deleteProperty(t, n);
    return (r && s && et(t, "delete", n, void 0), r);
  }
  has(t, n) {
    const s = Reflect.has(t, n);
    return ((!Ft(n) || !Jr.has(n)) && me(t, "has", n), s);
  }
  ownKeys(t) {
    return (me(t, "iterate", D(t) ? "length" : yt), Reflect.ownKeys(t));
  }
}
class ji extends Qr {
  constructor(t = !1) {
    super(!0, t);
  }
  set(t, n) {
    return !0;
  }
  deleteProperty(t, n) {
    return !0;
  }
}
const ki = new Xr(),
  $i = new ji(),
  Hi = new Xr(!0);
const ns = (e) => e,
  an = (e) => Reflect.getPrototypeOf(e);
function Di(e, t, n) {
  return function (...s) {
    const r = this.__v_raw,
      o = G(r),
      i = Vt(o),
      l = e === "entries" || (e === Symbol.iterator && i),
      c = e === "keys" && i,
      h = r[e](...s),
      a = n ? ns : t ? ss : be;
    return (
      !t && me(o, "iterate", c ? ts : yt),
      {
        next() {
          const { value: d, done: g } = h.next();
          return g
            ? { value: d, done: g }
            : { value: l ? [a(d[0]), a(d[1])] : a(d), done: g };
        },
        [Symbol.iterator]() {
          return this;
        },
      }
    );
  };
}
function dn(e) {
  return function (...t) {
    return e === "delete" ? !1 : e === "clear" ? void 0 : this;
  };
}
function Bi(e, t) {
  const n = {
    get(r) {
      const o = this.__v_raw,
        i = G(o),
        l = G(r);
      e || (dt(r, l) && me(i, "get", r), me(i, "get", l));
      const { has: c } = an(i),
        h = t ? ns : e ? ss : be;
      if (c.call(i, r)) return h(o.get(r));
      if (c.call(i, l)) return h(o.get(l));
      o !== i && o.get(r);
    },
    get size() {
      const r = this.__v_raw;
      return (!e && me(G(r), "iterate", yt), Reflect.get(r, "size", r));
    },
    has(r) {
      const o = this.__v_raw,
        i = G(o),
        l = G(r);
      return (
        e || (dt(r, l) && me(i, "has", r), me(i, "has", l)),
        r === l ? o.has(r) : o.has(r) || o.has(l)
      );
    },
    forEach(r, o) {
      const i = this,
        l = i.__v_raw,
        c = G(l),
        h = t ? ns : e ? ss : be;
      return (
        !e && me(c, "iterate", yt),
        l.forEach((a, d) => r.call(o, h(a), h(d), i))
      );
    },
  };
  return (
    _e(
      n,
      e
        ? {
            add: dn("add"),
            set: dn("set"),
            delete: dn("delete"),
            clear: dn("clear"),
          }
        : {
            add(r) {
              !t && !Ne(r) && !xt(r) && (r = G(r));
              const o = G(this);
              return (
                an(o).has.call(o, r) || (o.add(r), et(o, "add", r, r)),
                this
              );
            },
            set(r, o) {
              !t && !Ne(o) && !xt(o) && (o = G(o));
              const i = G(this),
                { has: l, get: c } = an(i);
              let h = l.call(i, r);
              h || ((r = G(r)), (h = l.call(i, r)));
              const a = c.call(i, r);
              return (
                i.set(r, o),
                h ? dt(o, a) && et(i, "set", r, o) : et(i, "add", r, o),
                this
              );
            },
            delete(r) {
              const o = G(this),
                { has: i, get: l } = an(o);
              let c = i.call(o, r);
              (c || ((r = G(r)), (c = i.call(o, r))), l && l.call(o, r));
              const h = o.delete(r);
              return (c && et(o, "delete", r, void 0), h);
            },
            clear() {
              const r = G(this),
                o = r.size !== 0,
                i = r.clear();
              return (o && et(r, "clear", void 0, void 0), i);
            },
          },
    ),
    ["keys", "values", "entries", Symbol.iterator].forEach((r) => {
      n[r] = Di(r, e, t);
    }),
    n
  );
}
function Ps(e, t) {
  const n = Bi(e, t);
  return (s, r, o) =>
    r === "__v_isReactive"
      ? !e
      : r === "__v_isReadonly"
        ? e
        : r === "__v_raw"
          ? s
          : Reflect.get(X(n, r) && r in s ? n : s, r, o);
}
const Vi = { get: Ps(!1, !1) },
  Ui = { get: Ps(!1, !0) },
  Ki = { get: Ps(!0, !1) };
const Zr = new WeakMap(),
  eo = new WeakMap(),
  to = new WeakMap(),
  Wi = new WeakMap();
function Gi(e) {
  switch (e) {
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
function qi(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : Gi(vi(e));
}
function jt(e) {
  return xt(e) ? e : Os(e, !1, ki, Vi, Zr);
}
function no(e) {
  return Os(e, !1, Hi, Ui, eo);
}
function so(e) {
  return Os(e, !0, $i, Ki, to);
}
function Os(e, t, n, s, r) {
  if (!ce(e) || (e.__v_raw && !(t && e.__v_isReactive))) return e;
  const o = qi(e);
  if (o === 0) return e;
  const i = r.get(e);
  if (i) return i;
  const l = new Proxy(e, o === 2 ? s : n);
  return (r.set(e, l), l);
}
function ht(e) {
  return xt(e) ? ht(e.__v_raw) : !!(e && e.__v_isReactive);
}
function xt(e) {
  return !!(e && e.__v_isReadonly);
}
function Ne(e) {
  return !!(e && e.__v_isShallow);
}
function Is(e) {
  return e ? !!e.__v_raw : !1;
}
function G(e) {
  const t = e && e.__v_raw;
  return t ? G(t) : e;
}
function Ts(e) {
  return (
    !X(e, "__v_skip") && Object.isExtensible(e) && Zn(e, "__v_skip", !0),
    e
  );
}
const be = (e) => (ce(e) ? jt(e) : e),
  ss = (e) => (ce(e) ? so(e) : e);
function le(e) {
  return e ? e.__v_isRef === !0 : !1;
}
function ue(e) {
  return ro(e, !1);
}
function zi(e) {
  return ro(e, !0);
}
function ro(e, t) {
  return le(e) ? e : new Yi(e, t);
}
class Yi {
  constructor(t, n) {
    ((this.dep = new Rs()),
      (this.__v_isRef = !0),
      (this.__v_isShallow = !1),
      (this._rawValue = n ? t : G(t)),
      (this._value = n ? t : be(t)),
      (this.__v_isShallow = n));
  }
  get value() {
    return (this.dep.track(), this._value);
  }
  set value(t) {
    const n = this._rawValue,
      s = this.__v_isShallow || Ne(t) || xt(t);
    ((t = s ? t : G(t)),
      dt(t, n) &&
        ((this._rawValue = t),
        (this._value = s ? t : be(t)),
        this.dep.trigger()));
  }
}
function ie(e) {
  return le(e) ? e.value : e;
}
const Ji = {
  get: (e, t, n) => (t === "__v_raw" ? e : ie(Reflect.get(e, t, n))),
  set: (e, t, n, s) => {
    const r = e[t];
    return le(r) && !le(n) ? ((r.value = n), !0) : Reflect.set(e, t, n, s);
  },
};
function oo(e) {
  return ht(e) ? e : new Proxy(e, Ji);
}
function Qi(e) {
  const t = D(e) ? new Array(e.length) : {};
  for (const n in e) t[n] = io(e, n);
  return t;
}
class Xi {
  constructor(t, n, s) {
    ((this._object = t),
      (this._key = n),
      (this._defaultValue = s),
      (this.__v_isRef = !0),
      (this._value = void 0));
  }
  get value() {
    const t = this._object[this._key];
    return (this._value = t === void 0 ? this._defaultValue : t);
  }
  set value(t) {
    this._object[this._key] = t;
  }
  get dep() {
    return Ai(G(this._object), this._key);
  }
}
class Zi {
  constructor(t) {
    ((this._getter = t),
      (this.__v_isRef = !0),
      (this.__v_isReadonly = !0),
      (this._value = void 0));
  }
  get value() {
    return (this._value = this._getter());
  }
}
function el(e, t, n) {
  return le(e)
    ? e
    : B(e)
      ? new Zi(e)
      : ce(e) && arguments.length > 1
        ? io(e, t, n)
        : ue(e);
}
function io(e, t, n) {
  const s = e[t];
  return le(s) ? s : new Xi(e, t, n);
}
class tl {
  constructor(t, n, s) {
    ((this.fn = t),
      (this.setter = n),
      (this._value = void 0),
      (this.dep = new Rs(this)),
      (this.__v_isRef = !0),
      (this.deps = void 0),
      (this.depsTail = void 0),
      (this.flags = 16),
      (this.globalVersion = Zt - 1),
      (this.next = void 0),
      (this.effect = this),
      (this.__v_isReadonly = !n),
      (this.isSSR = s));
  }
  notify() {
    if (((this.flags |= 16), !(this.flags & 8) && se !== this))
      return (Kr(this, !0), !0);
  }
  get value() {
    const t = this.dep.track();
    return (qr(this), t && (t.version = this.dep.version), this._value);
  }
  set value(t) {
    this.setter && this.setter(t);
  }
}
function nl(e, t, n = !1) {
  let s, r;
  return (B(e) ? (s = e) : ((s = e.get), (r = e.set)), new tl(s, r, n));
}
const hn = {},
  _n = new WeakMap();
let _t;
function sl(e, t = !1, n = _t) {
  if (n) {
    let s = _n.get(n);
    (s || _n.set(n, (s = [])), s.push(e));
  }
}
function rl(e, t, n = re) {
  const {
      immediate: s,
      deep: r,
      once: o,
      scheduler: i,
      augmentJob: l,
      call: c,
    } = n,
    h = (I) => (r ? I : Ne(I) || r === !1 || r === 0 ? at(I, 1) : at(I));
  let a,
    d,
    g,
    m,
    E = !1,
    x = !1;
  if (
    (le(e)
      ? ((d = () => e.value), (E = Ne(e)))
      : ht(e)
        ? ((d = () => h(e)), (E = !0))
        : D(e)
          ? ((x = !0),
            (E = e.some((I) => ht(I) || Ne(I))),
            (d = () =>
              e.map((I) => {
                if (le(I)) return I.value;
                if (ht(I)) return h(I);
                if (B(I)) return c ? c(I, 2) : I();
              })))
          : B(e)
            ? t
              ? (d = c ? () => c(e, 2) : e)
              : (d = () => {
                  if (g) {
                    tt();
                    try {
                      g();
                    } finally {
                      nt();
                    }
                  }
                  const I = _t;
                  _t = a;
                  try {
                    return c ? c(e, 3, [m]) : e(m);
                  } finally {
                    _t = I;
                  }
                })
            : (d = We),
    t && r)
  ) {
    const I = d,
      j = r === !0 ? 1 / 0 : r;
    d = () => at(I(), j);
  }
  const N = Br(),
    L = () => {
      (a.stop(), N && N.active && _s(N.effects, a));
    };
  if (o && t) {
    const I = t;
    t = (...j) => {
      (I(...j), L());
    };
  }
  let A = x ? new Array(e.length).fill(hn) : hn;
  const F = (I) => {
    if (!(!(a.flags & 1) || (!a.dirty && !I)))
      if (t) {
        const j = a.run();
        if (r || E || (x ? j.some((Y, q) => dt(Y, A[q])) : dt(j, A))) {
          g && g();
          const Y = _t;
          _t = a;
          try {
            const q = [j, A === hn ? void 0 : x && A[0] === hn ? [] : A, m];
            ((A = j), c ? c(t, 3, q) : t(...q));
          } finally {
            _t = Y;
          }
        }
      } else a.run();
  };
  return (
    l && l(F),
    (a = new Vr(d)),
    (a.scheduler = i ? () => i(F, !1) : F),
    (m = (I) => sl(I, !1, a)),
    (g = a.onStop =
      () => {
        const I = _n.get(a);
        if (I) {
          if (c) c(I, 4);
          else for (const j of I) j();
          _n.delete(a);
        }
      }),
    t ? (s ? F(!0) : (A = a.run())) : i ? i(F.bind(null, !0), !0) : a.run(),
    (L.pause = a.pause.bind(a)),
    (L.resume = a.resume.bind(a)),
    (L.stop = L),
    L
  );
}
function at(e, t = 1 / 0, n) {
  if (t <= 0 || !ce(e) || e.__v_skip || ((n = n || new Set()), n.has(e)))
    return e;
  if ((n.add(e), t--, le(e))) at(e.value, t, n);
  else if (D(e)) for (let s = 0; s < e.length; s++) at(e[s], t, n);
  else if (gi(e) || Vt(e))
    e.forEach((s) => {
      at(s, t, n);
    });
  else if (_i(e)) {
    for (const s in e) at(e[s], t, n);
    for (const s of Object.getOwnPropertySymbols(e))
      Object.prototype.propertyIsEnumerable.call(e, s) && at(e[s], t, n);
  }
  return e;
}
/**
 * @vue/runtime-core v3.5.18
 * (c) 2018-present Yuxi (Evan) You and Vue contributors
 * @license MIT
 **/ function ln(e, t, n, s) {
  try {
    return s ? e(...s) : e();
  } catch (r) {
    An(r, t, n);
  }
}
function qe(e, t, n, s) {
  if (B(e)) {
    const r = ln(e, t, n, s);
    return (
      r &&
        kr(r) &&
        r.catch((o) => {
          An(o, t, n);
        }),
      r
    );
  }
  if (D(e)) {
    const r = [];
    for (let o = 0; o < e.length; o++) r.push(qe(e[o], t, n, s));
    return r;
  }
}
function An(e, t, n, s = !0) {
  const r = t ? t.vnode : null,
    { errorHandler: o, throwUnhandledErrorInProduction: i } =
      (t && t.appContext.config) || re;
  if (t) {
    let l = t.parent;
    const c = t.proxy,
      h = `https://vuejs.org/error-reference/#runtime-${n}`;
    for (; l; ) {
      const a = l.ec;
      if (a) {
        for (let d = 0; d < a.length; d++) if (a[d](e, c, h) === !1) return;
      }
      l = l.parent;
    }
    if (o) {
      (tt(), ln(o, null, 10, [e, c, h]), nt());
      return;
    }
  }
  ol(e, n, r, s, i);
}
function ol(e, t, n, s = !0, r = !1) {
  if (r) throw e;
  console.error(e);
}
const xe = [];
let Be = -1;
const Tt = [];
let ct = null,
  Pt = 0;
const lo = Promise.resolve();
let yn = null;
function As(e) {
  const t = yn || lo;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function il(e) {
  let t = Be + 1,
    n = xe.length;
  for (; t < n; ) {
    const s = (t + n) >>> 1,
      r = xe[s],
      o = tn(r);
    o < e || (o === e && r.flags & 2) ? (t = s + 1) : (n = s);
  }
  return t;
}
function Ms(e) {
  if (!(e.flags & 1)) {
    const t = tn(e),
      n = xe[xe.length - 1];
    (!n || (!(e.flags & 2) && t >= tn(n)) ? xe.push(e) : xe.splice(il(t), 0, e),
      (e.flags |= 1),
      co());
  }
}
function co() {
  yn || (yn = lo.then(fo));
}
function ll(e) {
  (D(e)
    ? Tt.push(...e)
    : ct && e.id === -1
      ? ct.splice(Pt + 1, 0, e)
      : e.flags & 1 || (Tt.push(e), (e.flags |= 1)),
    co());
}
function qs(e, t, n = Be + 1) {
  for (; n < xe.length; n++) {
    const s = xe[n];
    if (s && s.flags & 2) {
      if (e && s.id !== e.uid) continue;
      (xe.splice(n, 1),
        n--,
        s.flags & 4 && (s.flags &= -2),
        s(),
        s.flags & 4 || (s.flags &= -2));
    }
  }
}
function uo(e) {
  if (Tt.length) {
    const t = [...new Set(Tt)].sort((n, s) => tn(n) - tn(s));
    if (((Tt.length = 0), ct)) {
      ct.push(...t);
      return;
    }
    for (ct = t, Pt = 0; Pt < ct.length; Pt++) {
      const n = ct[Pt];
      (n.flags & 4 && (n.flags &= -2), n.flags & 8 || n(), (n.flags &= -2));
    }
    ((ct = null), (Pt = 0));
  }
}
const tn = (e) => (e.id == null ? (e.flags & 2 ? -1 : 1 / 0) : e.id);
function fo(e) {
  try {
    for (Be = 0; Be < xe.length; Be++) {
      const t = xe[Be];
      t &&
        !(t.flags & 8) &&
        (t.flags & 4 && (t.flags &= -2),
        ln(t, t.i, t.i ? 15 : 14),
        t.flags & 4 || (t.flags &= -2));
    }
  } finally {
    for (; Be < xe.length; Be++) {
      const t = xe[Be];
      t && (t.flags &= -2);
    }
    ((Be = -1),
      (xe.length = 0),
      uo(),
      (yn = null),
      (xe.length || Tt.length) && fo());
  }
}
let Me = null,
  ao = null;
function bn(e) {
  const t = Me;
  return ((Me = e), (ao = (e && e.type.__scopeId) || null), t);
}
function cl(e, t = Me, n) {
  if (!t || e._n) return e;
  const s = (...r) => {
    s._d && sr(-1);
    const o = bn(t);
    let i;
    try {
      i = e(...r);
    } finally {
      (bn(o), s._d && sr(1));
    }
    return i;
  };
  return ((s._n = !0), (s._c = !0), (s._d = !0), s);
}
function mt(e, t, n, s) {
  const r = e.dirs,
    o = t && t.dirs;
  for (let i = 0; i < r.length; i++) {
    const l = r[i];
    o && (l.oldValue = o[i].value);
    let c = l.dir[s];
    c && (tt(), qe(c, n, 8, [e.el, l, e, t]), nt());
  }
}
const ul = Symbol("_vte"),
  fl = (e) => e.__isTeleport;
function Ls(e, t) {
  e.shapeFlag & 6 && e.component
    ? ((e.transition = t), Ls(e.component.subTree, t))
    : e.shapeFlag & 128
      ? ((e.ssContent.transition = t.clone(e.ssContent)),
        (e.ssFallback.transition = t.clone(e.ssFallback)))
      : (e.transition = t);
}
/*! #__NO_SIDE_EFFECTS__ */ function ho(e, t) {
  return B(e) ? _e({ name: e.name }, t, { setup: e }) : e;
}
function po(e) {
  e.ids = [e.ids[0] + e.ids[2]++ + "-", 0, 0];
}
function Gt(e, t, n, s, r = !1) {
  if (D(e)) {
    e.forEach((E, x) => Gt(E, t && (D(t) ? t[x] : t), n, s, r));
    return;
  }
  if (qt(s) && !r) {
    s.shapeFlag & 512 &&
      s.type.__asyncResolved &&
      s.component.subTree.component &&
      Gt(e, t, n, s.component.subTree);
    return;
  }
  const o = s.shapeFlag & 4 ? ks(s.component) : s.el,
    i = r ? null : o,
    { i: l, r: c } = e,
    h = t && t.r,
    a = l.refs === re ? (l.refs = {}) : l.refs,
    d = l.setupState,
    g = G(d),
    m = d === re ? () => !1 : (E) => X(g, E);
  if (
    (h != null &&
      h !== c &&
      (de(h)
        ? ((a[h] = null), m(h) && (d[h] = null))
        : le(h) && (h.value = null)),
    B(c))
  )
    ln(c, l, 12, [i, a]);
  else {
    const E = de(c),
      x = le(c);
    if (E || x) {
      const N = () => {
        if (e.f) {
          const L = E ? (m(c) ? d[c] : a[c]) : c.value;
          r
            ? D(L) && _s(L, o)
            : D(L)
              ? L.includes(o) || L.push(o)
              : E
                ? ((a[c] = [o]), m(c) && (d[c] = a[c]))
                : ((c.value = [o]), e.k && (a[e.k] = c.value));
        } else
          E
            ? ((a[c] = i), m(c) && (d[c] = i))
            : x && ((c.value = i), e.k && (a[e.k] = i));
      };
      i ? ((N.id = -1), Pe(N, n)) : N();
    }
  }
}
Tn().requestIdleCallback;
Tn().cancelIdleCallback;
const qt = (e) => !!e.type.__asyncLoader,
  go = (e) => e.type.__isKeepAlive;
function al(e, t) {
  mo(e, "a", t);
}
function dl(e, t) {
  mo(e, "da", t);
}
function mo(e, t, n = ve) {
  const s =
    e.__wdc ||
    (e.__wdc = () => {
      let r = n;
      for (; r; ) {
        if (r.isDeactivated) return;
        r = r.parent;
      }
      return e();
    });
  if ((Mn(t, s, n), n)) {
    let r = n.parent;
    for (; r && r.parent; )
      (go(r.parent.vnode) && hl(s, t, n, r), (r = r.parent));
  }
}
function hl(e, t, n, s) {
  const r = Mn(t, e, s, !0);
  vo(() => {
    _s(s[t], r);
  }, n);
}
function Mn(e, t, n = ve, s = !1) {
  if (n) {
    const r = n[e] || (n[e] = []),
      o =
        t.__weh ||
        (t.__weh = (...i) => {
          tt();
          const l = cn(n),
            c = qe(t, n, e, i);
          return (l(), nt(), c);
        });
    return (s ? r.unshift(o) : r.push(o), o);
  }
}
const st =
    (e) =>
    (t, n = ve) => {
      (!sn || e === "sp") && Mn(e, (...s) => t(...s), n);
    },
  pl = st("bm"),
  Ln = st("m"),
  gl = st("bu"),
  ml = st("u"),
  vl = st("bum"),
  vo = st("um"),
  _l = st("sp"),
  yl = st("rtg"),
  bl = st("rtc");
function xl(e, t = ve) {
  Mn("ec", e, t);
}
const wl = "components";
function El(e, t) {
  return Rl(wl, e, !0, t) || e;
}
const Sl = Symbol.for("v-ndc");
function Rl(e, t, n = !0, s = !1) {
  const r = Me || ve;
  if (r) {
    const o = r.type;
    {
      const l = dc(o, !1);
      if (l && (l === t || l === Ae(t) || l === In(Ae(t)))) return o;
    }
    const i = zs(r[e] || o[e], t) || zs(r.appContext[e], t);
    return !i && s ? o : i;
  }
}
function zs(e, t) {
  return e && (e[t] || e[Ae(t)] || e[In(Ae(t))]);
}
const rs = (e) => (e ? ($o(e) ? ks(e) : rs(e.parent)) : null),
  zt = _e(Object.create(null), {
    $: (e) => e,
    $el: (e) => e.vnode.el,
    $data: (e) => e.data,
    $props: (e) => e.props,
    $attrs: (e) => e.attrs,
    $slots: (e) => e.slots,
    $refs: (e) => e.refs,
    $parent: (e) => rs(e.parent),
    $root: (e) => rs(e.root),
    $host: (e) => e.ce,
    $emit: (e) => e.emit,
    $options: (e) => yo(e),
    $forceUpdate: (e) =>
      e.f ||
      (e.f = () => {
        Ms(e.update);
      }),
    $nextTick: (e) => e.n || (e.n = As.bind(e.proxy)),
    $watch: (e) => ql.bind(e),
  }),
  Un = (e, t) => e !== re && !e.__isScriptSetup && X(e, t),
  Cl = {
    get({ _: e }, t) {
      if (t === "__v_skip") return !0;
      const {
        ctx: n,
        setupState: s,
        data: r,
        props: o,
        accessCache: i,
        type: l,
        appContext: c,
      } = e;
      let h;
      if (t[0] !== "$") {
        const m = i[t];
        if (m !== void 0)
          switch (m) {
            case 1:
              return s[t];
            case 2:
              return r[t];
            case 4:
              return n[t];
            case 3:
              return o[t];
          }
        else {
          if (Un(s, t)) return ((i[t] = 1), s[t]);
          if (r !== re && X(r, t)) return ((i[t] = 2), r[t]);
          if ((h = e.propsOptions[0]) && X(h, t)) return ((i[t] = 3), o[t]);
          if (n !== re && X(n, t)) return ((i[t] = 4), n[t]);
          os && (i[t] = 0);
        }
      }
      const a = zt[t];
      let d, g;
      if (a) return (t === "$attrs" && me(e.attrs, "get", ""), a(e));
      if ((d = l.__cssModules) && (d = d[t])) return d;
      if (n !== re && X(n, t)) return ((i[t] = 4), n[t]);
      if (((g = c.config.globalProperties), X(g, t))) return g[t];
    },
    set({ _: e }, t, n) {
      const { data: s, setupState: r, ctx: o } = e;
      return Un(r, t)
        ? ((r[t] = n), !0)
        : s !== re && X(s, t)
          ? ((s[t] = n), !0)
          : X(e.props, t) || (t[0] === "$" && t.slice(1) in e)
            ? !1
            : ((o[t] = n), !0);
    },
    has(
      {
        _: {
          data: e,
          setupState: t,
          accessCache: n,
          ctx: s,
          appContext: r,
          propsOptions: o,
        },
      },
      i,
    ) {
      let l;
      return (
        !!n[i] ||
        (e !== re && X(e, i)) ||
        Un(t, i) ||
        ((l = o[0]) && X(l, i)) ||
        X(s, i) ||
        X(zt, i) ||
        X(r.config.globalProperties, i)
      );
    },
    defineProperty(e, t, n) {
      return (
        n.get != null
          ? (e._.accessCache[t] = 0)
          : X(n, "value") && this.set(e, t, n.value, null),
        Reflect.defineProperty(e, t, n)
      );
    },
  };
function Ys(e) {
  return D(e) ? e.reduce((t, n) => ((t[n] = null), t), {}) : e;
}
let os = !0;
function Pl(e) {
  const t = yo(e),
    n = e.proxy,
    s = e.ctx;
  ((os = !1), t.beforeCreate && Js(t.beforeCreate, e, "bc"));
  const {
    data: r,
    computed: o,
    methods: i,
    watch: l,
    provide: c,
    inject: h,
    created: a,
    beforeMount: d,
    mounted: g,
    beforeUpdate: m,
    updated: E,
    activated: x,
    deactivated: N,
    beforeDestroy: L,
    beforeUnmount: A,
    destroyed: F,
    unmounted: I,
    render: j,
    renderTracked: Y,
    renderTriggered: q,
    errorCaptured: K,
    serverPrefetch: U,
    expose: ee,
    inheritAttrs: fe,
    components: ae,
    directives: pe,
    filters: gt,
  } = t;
  if ((h && Ol(h, s, null), i))
    for (const V in i) {
      const J = i[V];
      B(J) && (s[V] = J.bind(n));
    }
  if (r) {
    const V = r.call(n, n);
    ce(V) && (e.data = jt(V));
  }
  if (((os = !0), o))
    for (const V in o) {
      const J = o[V],
        ze = B(J) ? J.bind(n, n) : B(J.get) ? J.get.bind(n, n) : We,
        ot = !B(J) && B(J.set) ? J.set.bind(n) : We,
        je = he({ get: ze, set: ot });
      Object.defineProperty(s, V, {
        enumerable: !0,
        configurable: !0,
        get: () => je.value,
        set: (we) => (je.value = we),
      });
    }
  if (l) for (const V in l) _o(l[V], s, n, V);
  if (c) {
    const V = B(c) ? c.call(n) : c;
    Reflect.ownKeys(V).forEach((J) => {
      pn(J, V[J]);
    });
  }
  a && Js(a, e, "c");
  function oe(V, J) {
    D(J) ? J.forEach((ze) => V(ze.bind(n))) : J && V(J.bind(n));
  }
  if (
    (oe(pl, d),
    oe(Ln, g),
    oe(gl, m),
    oe(ml, E),
    oe(al, x),
    oe(dl, N),
    oe(xl, K),
    oe(bl, Y),
    oe(yl, q),
    oe(vl, A),
    oe(vo, I),
    oe(_l, U),
    D(ee))
  )
    if (ee.length) {
      const V = e.exposed || (e.exposed = {});
      ee.forEach((J) => {
        Object.defineProperty(V, J, {
          get: () => n[J],
          set: (ze) => (n[J] = ze),
          enumerable: !0,
        });
      });
    } else e.exposed || (e.exposed = {});
  (j && e.render === We && (e.render = j),
    fe != null && (e.inheritAttrs = fe),
    ae && (e.components = ae),
    pe && (e.directives = pe),
    U && po(e));
}
function Ol(e, t, n = We) {
  D(e) && (e = is(e));
  for (const s in e) {
    const r = e[s];
    let o;
    (ce(r)
      ? "default" in r
        ? (o = Ge(r.from || s, r.default, !0))
        : (o = Ge(r.from || s))
      : (o = Ge(r)),
      le(o)
        ? Object.defineProperty(t, s, {
            enumerable: !0,
            configurable: !0,
            get: () => o.value,
            set: (i) => (o.value = i),
          })
        : (t[s] = o));
  }
}
function Js(e, t, n) {
  qe(D(e) ? e.map((s) => s.bind(t.proxy)) : e.bind(t.proxy), t, n);
}
function _o(e, t, n, s) {
  let r = s.includes(".") ? Mo(n, s) : () => n[s];
  if (de(e)) {
    const o = t[e];
    B(o) && At(r, o);
  } else if (B(e)) At(r, e.bind(n));
  else if (ce(e))
    if (D(e)) e.forEach((o) => _o(o, t, n, s));
    else {
      const o = B(e.handler) ? e.handler.bind(n) : t[e.handler];
      B(o) && At(r, o, e);
    }
}
function yo(e) {
  const t = e.type,
    { mixins: n, extends: s } = t,
    {
      mixins: r,
      optionsCache: o,
      config: { optionMergeStrategies: i },
    } = e.appContext,
    l = o.get(t);
  let c;
  return (
    l
      ? (c = l)
      : !r.length && !n && !s
        ? (c = t)
        : ((c = {}),
          r.length && r.forEach((h) => xn(c, h, i, !0)),
          xn(c, t, i)),
    ce(t) && o.set(t, c),
    c
  );
}
function xn(e, t, n, s = !1) {
  const { mixins: r, extends: o } = t;
  (o && xn(e, o, n, !0), r && r.forEach((i) => xn(e, i, n, !0)));
  for (const i in t)
    if (!(s && i === "expose")) {
      const l = Il[i] || (n && n[i]);
      e[i] = l ? l(e[i], t[i]) : t[i];
    }
  return e;
}
const Il = {
  data: Qs,
  props: Xs,
  emits: Xs,
  methods: Bt,
  computed: Bt,
  beforeCreate: ye,
  created: ye,
  beforeMount: ye,
  mounted: ye,
  beforeUpdate: ye,
  updated: ye,
  beforeDestroy: ye,
  beforeUnmount: ye,
  destroyed: ye,
  unmounted: ye,
  activated: ye,
  deactivated: ye,
  errorCaptured: ye,
  serverPrefetch: ye,
  components: Bt,
  directives: Bt,
  watch: Al,
  provide: Qs,
  inject: Tl,
};
function Qs(e, t) {
  return t
    ? e
      ? function () {
          return _e(
            B(e) ? e.call(this, this) : e,
            B(t) ? t.call(this, this) : t,
          );
        }
      : t
    : e;
}
function Tl(e, t) {
  return Bt(is(e), is(t));
}
function is(e) {
  if (D(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) t[e[n]] = e[n];
    return t;
  }
  return e;
}
function ye(e, t) {
  return e ? [...new Set([].concat(e, t))] : t;
}
function Bt(e, t) {
  return e ? _e(Object.create(null), e, t) : t;
}
function Xs(e, t) {
  return e
    ? D(e) && D(t)
      ? [...new Set([...e, ...t])]
      : _e(Object.create(null), Ys(e), Ys(t ?? {}))
    : t;
}
function Al(e, t) {
  if (!e) return t;
  if (!t) return e;
  const n = _e(Object.create(null), e);
  for (const s in t) n[s] = ye(e[s], t[s]);
  return n;
}
function bo() {
  return {
    app: null,
    config: {
      isNativeTag: hi,
      performance: !1,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: void 0,
      warnHandler: void 0,
      compilerOptions: {},
    },
    mixins: [],
    components: {},
    directives: {},
    provides: Object.create(null),
    optionsCache: new WeakMap(),
    propsCache: new WeakMap(),
    emitsCache: new WeakMap(),
  };
}
let Ml = 0;
function Ll(e, t) {
  return function (s, r = null) {
    (B(s) || (s = _e({}, s)), r != null && !ce(r) && (r = null));
    const o = bo(),
      i = new WeakSet(),
      l = [];
    let c = !1;
    const h = (o.app = {
      _uid: Ml++,
      _component: s,
      _props: r,
      _container: null,
      _context: o,
      _instance: null,
      version: pc,
      get config() {
        return o.config;
      },
      set config(a) {},
      use(a, ...d) {
        return (
          i.has(a) ||
            (a && B(a.install)
              ? (i.add(a), a.install(h, ...d))
              : B(a) && (i.add(a), a(h, ...d))),
          h
        );
      },
      mixin(a) {
        return (o.mixins.includes(a) || o.mixins.push(a), h);
      },
      component(a, d) {
        return d ? ((o.components[a] = d), h) : o.components[a];
      },
      directive(a, d) {
        return d ? ((o.directives[a] = d), h) : o.directives[a];
      },
      mount(a, d, g) {
        if (!c) {
          const m = h._ceVNode || Ie(s, r);
          return (
            (m.appContext = o),
            g === !0 ? (g = "svg") : g === !1 && (g = void 0),
            e(m, a, g),
            (c = !0),
            (h._container = a),
            (a.__vue_app__ = h),
            ks(m.component)
          );
        }
      },
      onUnmount(a) {
        l.push(a);
      },
      unmount() {
        c &&
          (qe(l, h._instance, 16),
          e(null, h._container),
          delete h._container.__vue_app__);
      },
      provide(a, d) {
        return ((o.provides[a] = d), h);
      },
      runWithContext(a) {
        const d = bt;
        bt = h;
        try {
          return a();
        } finally {
          bt = d;
        }
      },
    });
    return h;
  };
}
let bt = null;
function pn(e, t) {
  if (ve) {
    let n = ve.provides;
    const s = ve.parent && ve.parent.provides;
    (s === n && (n = ve.provides = Object.create(s)), (n[e] = t));
  }
}
function Ge(e, t, n = !1) {
  const s = ko();
  if (s || bt) {
    let r = bt
      ? bt._context.provides
      : s
        ? s.parent == null || s.ce
          ? s.vnode.appContext && s.vnode.appContext.provides
          : s.parent.provides
        : void 0;
    if (r && e in r) return r[e];
    if (arguments.length > 1) return n && B(t) ? t.call(s && s.proxy) : t;
  }
}
function Nl() {
  return !!(ko() || bt);
}
const xo = {},
  wo = () => Object.create(xo),
  Eo = (e) => Object.getPrototypeOf(e) === xo;
function Fl(e, t, n, s = !1) {
  const r = {},
    o = wo();
  ((e.propsDefaults = Object.create(null)), So(e, t, r, o));
  for (const i in e.propsOptions[0]) i in r || (r[i] = void 0);
  (n ? (e.props = s ? r : no(r)) : e.type.props ? (e.props = r) : (e.props = o),
    (e.attrs = o));
}
function jl(e, t, n, s) {
  const {
      props: r,
      attrs: o,
      vnode: { patchFlag: i },
    } = e,
    l = G(r),
    [c] = e.propsOptions;
  let h = !1;
  if ((s || i > 0) && !(i & 16)) {
    if (i & 8) {
      const a = e.vnode.dynamicProps;
      for (let d = 0; d < a.length; d++) {
        let g = a[d];
        if (Nn(e.emitsOptions, g)) continue;
        const m = t[g];
        if (c)
          if (X(o, g)) m !== o[g] && ((o[g] = m), (h = !0));
          else {
            const E = Ae(g);
            r[E] = ls(c, l, E, m, e, !1);
          }
        else m !== o[g] && ((o[g] = m), (h = !0));
      }
    }
  } else {
    So(e, t, r, o) && (h = !0);
    let a;
    for (const d in l)
      (!t || (!X(t, d) && ((a = wt(d)) === d || !X(t, a)))) &&
        (c
          ? n &&
            (n[d] !== void 0 || n[a] !== void 0) &&
            (r[d] = ls(c, l, d, void 0, e, !0))
          : delete r[d]);
    if (o !== l) for (const d in o) (!t || !X(t, d)) && (delete o[d], (h = !0));
  }
  h && et(e.attrs, "set", "");
}
function So(e, t, n, s) {
  const [r, o] = e.propsOptions;
  let i = !1,
    l;
  if (t)
    for (let c in t) {
      if (Ut(c)) continue;
      const h = t[c];
      let a;
      r && X(r, (a = Ae(c)))
        ? !o || !o.includes(a)
          ? (n[a] = h)
          : ((l || (l = {}))[a] = h)
        : Nn(e.emitsOptions, c) ||
          ((!(c in s) || h !== s[c]) && ((s[c] = h), (i = !0)));
    }
  if (o) {
    const c = G(n),
      h = l || re;
    for (let a = 0; a < o.length; a++) {
      const d = o[a];
      n[d] = ls(r, c, d, h[d], e, !X(h, d));
    }
  }
  return i;
}
function ls(e, t, n, s, r, o) {
  const i = e[n];
  if (i != null) {
    const l = X(i, "default");
    if (l && s === void 0) {
      const c = i.default;
      if (i.type !== Function && !i.skipFactory && B(c)) {
        const { propsDefaults: h } = r;
        if (n in h) s = h[n];
        else {
          const a = cn(r);
          ((s = h[n] = c.call(null, t)), a());
        }
      } else s = c;
      r.ce && r.ce._setProp(n, s);
    }
    i[0] &&
      (o && !l ? (s = !1) : i[1] && (s === "" || s === wt(n)) && (s = !0));
  }
  return s;
}
const kl = new WeakMap();
function Ro(e, t, n = !1) {
  const s = n ? kl : t.propsCache,
    r = s.get(e);
  if (r) return r;
  const o = e.props,
    i = {},
    l = [];
  let c = !1;
  if (!B(e)) {
    const a = (d) => {
      c = !0;
      const [g, m] = Ro(d, t, !0);
      (_e(i, g), m && l.push(...m));
    };
    (!n && t.mixins.length && t.mixins.forEach(a),
      e.extends && a(e.extends),
      e.mixins && e.mixins.forEach(a));
  }
  if (!o && !c) return (ce(e) && s.set(e, It), It);
  if (D(o))
    for (let a = 0; a < o.length; a++) {
      const d = Ae(o[a]);
      Zs(d) && (i[d] = re);
    }
  else if (o)
    for (const a in o) {
      const d = Ae(a);
      if (Zs(d)) {
        const g = o[a],
          m = (i[d] = D(g) || B(g) ? { type: g } : _e({}, g)),
          E = m.type;
        let x = !1,
          N = !0;
        if (D(E))
          for (let L = 0; L < E.length; ++L) {
            const A = E[L],
              F = B(A) && A.name;
            if (F === "Boolean") {
              x = !0;
              break;
            } else F === "String" && (N = !1);
          }
        else x = B(E) && E.name === "Boolean";
        ((m[0] = x), (m[1] = N), (x || X(m, "default")) && l.push(d));
      }
    }
  const h = [i, l];
  return (ce(e) && s.set(e, h), h);
}
function Zs(e) {
  return e[0] !== "$" && !Ut(e);
}
const Ns = (e) => e === "_" || e === "__" || e === "_ctx" || e === "$stable",
  Fs = (e) => (D(e) ? e.map(Ke) : [Ke(e)]),
  $l = (e, t, n) => {
    if (t._n) return t;
    const s = cl((...r) => Fs(t(...r)), n);
    return ((s._c = !1), s);
  },
  Co = (e, t, n) => {
    const s = e._ctx;
    for (const r in e) {
      if (Ns(r)) continue;
      const o = e[r];
      if (B(o)) t[r] = $l(r, o, s);
      else if (o != null) {
        const i = Fs(o);
        t[r] = () => i;
      }
    }
  },
  Po = (e, t) => {
    const n = Fs(t);
    e.slots.default = () => n;
  },
  Oo = (e, t, n) => {
    for (const s in t) (n || !Ns(s)) && (e[s] = t[s]);
  },
  Hl = (e, t, n) => {
    const s = (e.slots = wo());
    if (e.vnode.shapeFlag & 32) {
      const r = t.__;
      r && Zn(s, "__", r, !0);
      const o = t._;
      o ? (Oo(s, t, n), n && Zn(s, "_", o, !0)) : Co(t, s);
    } else t && Po(e, t);
  },
  Dl = (e, t, n) => {
    const { vnode: s, slots: r } = e;
    let o = !0,
      i = re;
    if (s.shapeFlag & 32) {
      const l = t._;
      (l
        ? n && l === 1
          ? (o = !1)
          : Oo(r, t, n)
        : ((o = !t.$stable), Co(t, r)),
        (i = t));
    } else t && (Po(e, t), (i = { default: 1 }));
    if (o) for (const l in r) !Ns(l) && i[l] == null && delete r[l];
  },
  Pe = ec;
function Bl(e) {
  return Vl(e);
}
function Vl(e, t) {
  const n = Tn();
  n.__VUE__ = !0;
  const {
      insert: s,
      remove: r,
      patchProp: o,
      createElement: i,
      createText: l,
      createComment: c,
      setText: h,
      setElementText: a,
      parentNode: d,
      nextSibling: g,
      setScopeId: m = We,
      insertStaticContent: E,
    } = e,
    x = (
      u,
      f,
      p,
      v = null,
      b = null,
      y = null,
      C = void 0,
      R = null,
      S = !!f.dynamicChildren,
    ) => {
      if (u === f) return;
      (u && !Ht(u, f) && ((v = _(u)), we(u, b, y, !0), (u = null)),
        f.patchFlag === -2 && ((S = !1), (f.dynamicChildren = null)));
      const { type: w, ref: $, shapeFlag: O } = f;
      switch (w) {
        case Fn:
          N(u, f, p, v);
          break;
        case pt:
          L(u, f, p, v);
          break;
        case Wn:
          u == null && A(f, p, v, C);
          break;
        case Ue:
          ae(u, f, p, v, b, y, C, R, S);
          break;
        default:
          O & 1
            ? j(u, f, p, v, b, y, C, R, S)
            : O & 6
              ? pe(u, f, p, v, b, y, C, R, S)
              : (O & 64 || O & 128) && w.process(u, f, p, v, b, y, C, R, S, M);
      }
      $ != null && b
        ? Gt($, u && u.ref, y, f || u, !f)
        : $ == null && u && u.ref != null && Gt(u.ref, null, y, u, !0);
    },
    N = (u, f, p, v) => {
      if (u == null) s((f.el = l(f.children)), p, v);
      else {
        const b = (f.el = u.el);
        f.children !== u.children && h(b, f.children);
      }
    },
    L = (u, f, p, v) => {
      u == null ? s((f.el = c(f.children || "")), p, v) : (f.el = u.el);
    },
    A = (u, f, p, v) => {
      [u.el, u.anchor] = E(u.children, f, p, v, u.el, u.anchor);
    },
    F = ({ el: u, anchor: f }, p, v) => {
      let b;
      for (; u && u !== f; ) ((b = g(u)), s(u, p, v), (u = b));
      s(f, p, v);
    },
    I = ({ el: u, anchor: f }) => {
      let p;
      for (; u && u !== f; ) ((p = g(u)), r(u), (u = p));
      r(f);
    },
    j = (u, f, p, v, b, y, C, R, S) => {
      (f.type === "svg" ? (C = "svg") : f.type === "math" && (C = "mathml"),
        u == null ? Y(f, p, v, b, y, C, R, S) : U(u, f, b, y, C, R, S));
    },
    Y = (u, f, p, v, b, y, C, R) => {
      let S, w;
      const { props: $, shapeFlag: O, transition: k, dirs: H } = u;
      if (
        ((S = u.el = i(u.type, y, $ && $.is, $)),
        O & 8
          ? a(S, u.children)
          : O & 16 && K(u.children, S, null, v, b, Kn(u, y), C, R),
        H && mt(u, null, v, "created"),
        q(S, u, u.scopeId, C, v),
        $)
      ) {
        for (const ne in $)
          ne !== "value" && !Ut(ne) && o(S, ne, null, $[ne], y, v);
        ("value" in $ && o(S, "value", null, $.value, y),
          (w = $.onVnodeBeforeMount) && De(w, v, u));
      }
      H && mt(u, null, v, "beforeMount");
      const W = Ul(b, k);
      (W && k.beforeEnter(S),
        s(S, f, p),
        ((w = $ && $.onVnodeMounted) || W || H) &&
          Pe(() => {
            (w && De(w, v, u), W && k.enter(S), H && mt(u, null, v, "mounted"));
          }, b));
    },
    q = (u, f, p, v, b) => {
      if ((p && m(u, p), v)) for (let y = 0; y < v.length; y++) m(u, v[y]);
      if (b) {
        let y = b.subTree;
        if (
          f === y ||
          (No(y.type) && (y.ssContent === f || y.ssFallback === f))
        ) {
          const C = b.vnode;
          q(u, C, C.scopeId, C.slotScopeIds, b.parent);
        }
      }
    },
    K = (u, f, p, v, b, y, C, R, S = 0) => {
      for (let w = S; w < u.length; w++) {
        const $ = (u[w] = R ? ut(u[w]) : Ke(u[w]));
        x(null, $, f, p, v, b, y, C, R);
      }
    },
    U = (u, f, p, v, b, y, C) => {
      const R = (f.el = u.el);
      let { patchFlag: S, dynamicChildren: w, dirs: $ } = f;
      S |= u.patchFlag & 16;
      const O = u.props || re,
        k = f.props || re;
      let H;
      if (
        (p && vt(p, !1),
        (H = k.onVnodeBeforeUpdate) && De(H, p, f, u),
        $ && mt(f, u, p, "beforeUpdate"),
        p && vt(p, !0),
        ((O.innerHTML && k.innerHTML == null) ||
          (O.textContent && k.textContent == null)) &&
          a(R, ""),
        w
          ? ee(u.dynamicChildren, w, R, p, v, Kn(f, b), y)
          : C || J(u, f, R, null, p, v, Kn(f, b), y, !1),
        S > 0)
      ) {
        if (S & 16) fe(R, O, k, p, b);
        else if (
          (S & 2 && O.class !== k.class && o(R, "class", null, k.class, b),
          S & 4 && o(R, "style", O.style, k.style, b),
          S & 8)
        ) {
          const W = f.dynamicProps;
          for (let ne = 0; ne < W.length; ne++) {
            const Z = W[ne],
              Ee = O[Z],
              Se = k[Z];
            (Se !== Ee || Z === "value") && o(R, Z, Ee, Se, b, p);
          }
        }
        S & 1 && u.children !== f.children && a(R, f.children);
      } else !C && w == null && fe(R, O, k, p, b);
      ((H = k.onVnodeUpdated) || $) &&
        Pe(() => {
          (H && De(H, p, f, u), $ && mt(f, u, p, "updated"));
        }, v);
    },
    ee = (u, f, p, v, b, y, C) => {
      for (let R = 0; R < f.length; R++) {
        const S = u[R],
          w = f[R],
          $ =
            S.el && (S.type === Ue || !Ht(S, w) || S.shapeFlag & 198)
              ? d(S.el)
              : p;
        x(S, w, $, null, v, b, y, C, !0);
      }
    },
    fe = (u, f, p, v, b) => {
      if (f !== p) {
        if (f !== re)
          for (const y in f) !Ut(y) && !(y in p) && o(u, y, f[y], null, b, v);
        for (const y in p) {
          if (Ut(y)) continue;
          const C = p[y],
            R = f[y];
          C !== R && y !== "value" && o(u, y, R, C, b, v);
        }
        "value" in p && o(u, "value", f.value, p.value, b);
      }
    },
    ae = (u, f, p, v, b, y, C, R, S) => {
      const w = (f.el = u ? u.el : l("")),
        $ = (f.anchor = u ? u.anchor : l(""));
      let { patchFlag: O, dynamicChildren: k, slotScopeIds: H } = f;
      (H && (R = R ? R.concat(H) : H),
        u == null
          ? (s(w, p, v), s($, p, v), K(f.children || [], p, $, b, y, C, R, S))
          : O > 0 && O & 64 && k && u.dynamicChildren
            ? (ee(u.dynamicChildren, k, p, b, y, C, R),
              (f.key != null || (b && f === b.subTree)) && Io(u, f, !0))
            : J(u, f, p, $, b, y, C, R, S));
    },
    pe = (u, f, p, v, b, y, C, R, S) => {
      ((f.slotScopeIds = R),
        u == null
          ? f.shapeFlag & 512
            ? b.ctx.activate(f, p, v, C, S)
            : gt(f, p, v, b, y, C, S)
          : rt(u, f, S));
    },
    gt = (u, f, p, v, b, y, C) => {
      const R = (u.component = lc(u, v, b));
      if ((go(u) && (R.ctx.renderer = M), cc(R, !1, C), R.asyncDep)) {
        if ((b && b.registerDep(R, oe, C), !u.el)) {
          const S = (R.subTree = Ie(pt));
          (L(null, S, f, p), (u.placeholder = S.el));
        }
      } else oe(R, u, f, p, b, y, C);
    },
    rt = (u, f, p) => {
      const v = (f.component = u.component);
      if (Xl(u, f, p))
        if (v.asyncDep && !v.asyncResolved) {
          V(v, f, p);
          return;
        } else ((v.next = f), v.update());
      else ((f.el = u.el), (v.vnode = f));
    },
    oe = (u, f, p, v, b, y, C) => {
      const R = () => {
        if (u.isMounted) {
          let { next: O, bu: k, u: H, parent: W, vnode: ne } = u;
          {
            const $e = To(u);
            if ($e) {
              (O && ((O.el = ne.el), V(u, O, C)),
                $e.asyncDep.then(() => {
                  u.isUnmounted || R();
                }));
              return;
            }
          }
          let Z = O,
            Ee;
          (vt(u, !1),
            O ? ((O.el = ne.el), V(u, O, C)) : (O = ne),
            k && Hn(k),
            (Ee = O.props && O.props.onVnodeBeforeUpdate) && De(Ee, W, O, ne),
            vt(u, !0));
          const Se = tr(u),
            ke = u.subTree;
          ((u.subTree = Se),
            x(ke, Se, d(ke.el), _(ke), u, b, y),
            (O.el = Se.el),
            Z === null && Zl(u, Se.el),
            H && Pe(H, b),
            (Ee = O.props && O.props.onVnodeUpdated) &&
              Pe(() => De(Ee, W, O, ne), b));
        } else {
          let O;
          const { el: k, props: H } = f,
            { bm: W, m: ne, parent: Z, root: Ee, type: Se } = u,
            ke = qt(f);
          (vt(u, !1),
            W && Hn(W),
            !ke && (O = H && H.onVnodeBeforeMount) && De(O, Z, f),
            vt(u, !0));
          {
            Ee.ce &&
              Ee.ce._def.shadowRoot !== !1 &&
              Ee.ce._injectChildStyle(Se);
            const $e = (u.subTree = tr(u));
            (x(null, $e, p, v, u, b, y), (f.el = $e.el));
          }
          if ((ne && Pe(ne, b), !ke && (O = H && H.onVnodeMounted))) {
            const $e = f;
            Pe(() => De(O, Z, $e), b);
          }
          ((f.shapeFlag & 256 ||
            (Z && qt(Z.vnode) && Z.vnode.shapeFlag & 256)) &&
            u.a &&
            Pe(u.a, b),
            (u.isMounted = !0),
            (f = p = v = null));
        }
      };
      u.scope.on();
      const S = (u.effect = new Vr(R));
      u.scope.off();
      const w = (u.update = S.run.bind(S)),
        $ = (u.job = S.runIfDirty.bind(S));
      (($.i = u), ($.id = u.uid), (S.scheduler = () => Ms($)), vt(u, !0), w());
    },
    V = (u, f, p) => {
      f.component = u;
      const v = u.vnode.props;
      ((u.vnode = f),
        (u.next = null),
        jl(u, f.props, v, p),
        Dl(u, f.children, p),
        tt(),
        qs(u),
        nt());
    },
    J = (u, f, p, v, b, y, C, R, S = !1) => {
      const w = u && u.children,
        $ = u ? u.shapeFlag : 0,
        O = f.children,
        { patchFlag: k, shapeFlag: H } = f;
      if (k > 0) {
        if (k & 128) {
          ot(w, O, p, v, b, y, C, R, S);
          return;
        } else if (k & 256) {
          ze(w, O, p, v, b, y, C, R, S);
          return;
        }
      }
      H & 8
        ? ($ & 16 && Te(w, b, y), O !== w && a(p, O))
        : $ & 16
          ? H & 16
            ? ot(w, O, p, v, b, y, C, R, S)
            : Te(w, b, y, !0)
          : ($ & 8 && a(p, ""), H & 16 && K(O, p, v, b, y, C, R, S));
    },
    ze = (u, f, p, v, b, y, C, R, S) => {
      ((u = u || It), (f = f || It));
      const w = u.length,
        $ = f.length,
        O = Math.min(w, $);
      let k;
      for (k = 0; k < O; k++) {
        const H = (f[k] = S ? ut(f[k]) : Ke(f[k]));
        x(u[k], H, p, null, b, y, C, R, S);
      }
      w > $ ? Te(u, b, y, !0, !1, O) : K(f, p, v, b, y, C, R, S, O);
    },
    ot = (u, f, p, v, b, y, C, R, S) => {
      let w = 0;
      const $ = f.length;
      let O = u.length - 1,
        k = $ - 1;
      for (; w <= O && w <= k; ) {
        const H = u[w],
          W = (f[w] = S ? ut(f[w]) : Ke(f[w]));
        if (Ht(H, W)) x(H, W, p, null, b, y, C, R, S);
        else break;
        w++;
      }
      for (; w <= O && w <= k; ) {
        const H = u[O],
          W = (f[k] = S ? ut(f[k]) : Ke(f[k]));
        if (Ht(H, W)) x(H, W, p, null, b, y, C, R, S);
        else break;
        (O--, k--);
      }
      if (w > O) {
        if (w <= k) {
          const H = k + 1,
            W = H < $ ? f[H].el : v;
          for (; w <= k; )
            (x(null, (f[w] = S ? ut(f[w]) : Ke(f[w])), p, W, b, y, C, R, S),
              w++);
        }
      } else if (w > k) for (; w <= O; ) (we(u[w], b, y, !0), w++);
      else {
        const H = w,
          W = w,
          ne = new Map();
        for (w = W; w <= k; w++) {
          const Ce = (f[w] = S ? ut(f[w]) : Ke(f[w]));
          Ce.key != null && ne.set(Ce.key, w);
        }
        let Z,
          Ee = 0;
        const Se = k - W + 1;
        let ke = !1,
          $e = 0;
        const kt = new Array(Se);
        for (w = 0; w < Se; w++) kt[w] = 0;
        for (w = H; w <= O; w++) {
          const Ce = u[w];
          if (Ee >= Se) {
            we(Ce, b, y, !0);
            continue;
          }
          let He;
          if (Ce.key != null) He = ne.get(Ce.key);
          else
            for (Z = W; Z <= k; Z++)
              if (kt[Z - W] === 0 && Ht(Ce, f[Z])) {
                He = Z;
                break;
              }
          He === void 0
            ? we(Ce, b, y, !0)
            : ((kt[He - W] = w + 1),
              He >= $e ? ($e = He) : (ke = !0),
              x(Ce, f[He], p, null, b, y, C, R, S),
              Ee++);
        }
        const Bs = ke ? Kl(kt) : It;
        for (Z = Bs.length - 1, w = Se - 1; w >= 0; w--) {
          const Ce = W + w,
            He = f[Ce],
            Vs = f[Ce + 1],
            Us = Ce + 1 < $ ? Vs.el || Vs.placeholder : v;
          kt[w] === 0
            ? x(null, He, p, Us, b, y, C, R, S)
            : ke && (Z < 0 || w !== Bs[Z] ? je(He, p, Us, 2) : Z--);
        }
      }
    },
    je = (u, f, p, v, b = null) => {
      const { el: y, type: C, transition: R, children: S, shapeFlag: w } = u;
      if (w & 6) {
        je(u.component.subTree, f, p, v);
        return;
      }
      if (w & 128) {
        u.suspense.move(f, p, v);
        return;
      }
      if (w & 64) {
        C.move(u, f, p, M);
        return;
      }
      if (C === Ue) {
        s(y, f, p);
        for (let O = 0; O < S.length; O++) je(S[O], f, p, v);
        s(u.anchor, f, p);
        return;
      }
      if (C === Wn) {
        F(u, f, p);
        return;
      }
      if (v !== 2 && w & 1 && R)
        if (v === 0) (R.beforeEnter(y), s(y, f, p), Pe(() => R.enter(y), b));
        else {
          const { leave: O, delayLeave: k, afterLeave: H } = R,
            W = () => {
              u.ctx.isUnmounted ? r(y) : s(y, f, p);
            },
            ne = () => {
              O(y, () => {
                (W(), H && H());
              });
            };
          k ? k(y, W, ne) : ne();
        }
      else s(y, f, p);
    },
    we = (u, f, p, v = !1, b = !1) => {
      const {
        type: y,
        props: C,
        ref: R,
        children: S,
        dynamicChildren: w,
        shapeFlag: $,
        patchFlag: O,
        dirs: k,
        cacheIndex: H,
      } = u;
      if (
        (O === -2 && (b = !1),
        R != null && (tt(), Gt(R, null, p, u, !0), nt()),
        H != null && (f.renderCache[H] = void 0),
        $ & 256)
      ) {
        f.ctx.deactivate(u);
        return;
      }
      const W = $ & 1 && k,
        ne = !qt(u);
      let Z;
      if ((ne && (Z = C && C.onVnodeBeforeUnmount) && De(Z, f, u), $ & 6))
        fn(u.component, p, v);
      else {
        if ($ & 128) {
          u.suspense.unmount(p, v);
          return;
        }
        (W && mt(u, null, f, "beforeUnmount"),
          $ & 64
            ? u.type.remove(u, f, p, M, v)
            : w && !w.hasOnce && (y !== Ue || (O > 0 && O & 64))
              ? Te(w, f, p, !1, !0)
              : ((y === Ue && O & 384) || (!b && $ & 16)) && Te(S, f, p),
          v && Et(u));
      }
      ((ne && (Z = C && C.onVnodeUnmounted)) || W) &&
        Pe(() => {
          (Z && De(Z, f, u), W && mt(u, null, f, "unmounted"));
        }, p);
    },
    Et = (u) => {
      const { type: f, el: p, anchor: v, transition: b } = u;
      if (f === Ue) {
        St(p, v);
        return;
      }
      if (f === Wn) {
        I(u);
        return;
      }
      const y = () => {
        (r(p), b && !b.persisted && b.afterLeave && b.afterLeave());
      };
      if (u.shapeFlag & 1 && b && !b.persisted) {
        const { leave: C, delayLeave: R } = b,
          S = () => C(p, y);
        R ? R(u.el, y, S) : S();
      } else y();
    },
    St = (u, f) => {
      let p;
      for (; u !== f; ) ((p = g(u)), r(u), (u = p));
      r(f);
    },
    fn = (u, f, p) => {
      const {
        bum: v,
        scope: b,
        job: y,
        subTree: C,
        um: R,
        m: S,
        a: w,
        parent: $,
        slots: { __: O },
      } = u;
      (er(S),
        er(w),
        v && Hn(v),
        $ &&
          D(O) &&
          O.forEach((k) => {
            $.renderCache[k] = void 0;
          }),
        b.stop(),
        y && ((y.flags |= 8), we(C, u, f, p)),
        R && Pe(R, f),
        Pe(() => {
          u.isUnmounted = !0;
        }, f),
        f &&
          f.pendingBranch &&
          !f.isUnmounted &&
          u.asyncDep &&
          !u.asyncResolved &&
          u.suspenseId === f.pendingId &&
          (f.deps--, f.deps === 0 && f.resolve()));
    },
    Te = (u, f, p, v = !1, b = !1, y = 0) => {
      for (let C = y; C < u.length; C++) we(u[C], f, p, v, b);
    },
    _ = (u) => {
      if (u.shapeFlag & 6) return _(u.component.subTree);
      if (u.shapeFlag & 128) return u.suspense.next();
      const f = g(u.anchor || u.el),
        p = f && f[ul];
      return p ? g(p) : f;
    };
  let T = !1;
  const P = (u, f, p) => {
      (u == null
        ? f._vnode && we(f._vnode, null, null, !0)
        : x(f._vnode || null, u, f, null, null, null, p),
        (f._vnode = u),
        T || ((T = !0), qs(), uo(), (T = !1)));
    },
    M = {
      p: x,
      um: we,
      m: je,
      r: Et,
      mt: gt,
      mc: K,
      pc: J,
      pbc: ee,
      n: _,
      o: e,
    };
  return { render: P, hydrate: void 0, createApp: Ll(P) };
}
function Kn({ type: e, props: t }, n) {
  return (n === "svg" && e === "foreignObject") ||
    (n === "mathml" &&
      e === "annotation-xml" &&
      t &&
      t.encoding &&
      t.encoding.includes("html"))
    ? void 0
    : n;
}
function vt({ effect: e, job: t }, n) {
  n ? ((e.flags |= 32), (t.flags |= 4)) : ((e.flags &= -33), (t.flags &= -5));
}
function Ul(e, t) {
  return (!e || (e && !e.pendingBranch)) && t && !t.persisted;
}
function Io(e, t, n = !1) {
  const s = e.children,
    r = t.children;
  if (D(s) && D(r))
    for (let o = 0; o < s.length; o++) {
      const i = s[o];
      let l = r[o];
      (l.shapeFlag & 1 &&
        !l.dynamicChildren &&
        ((l.patchFlag <= 0 || l.patchFlag === 32) &&
          ((l = r[o] = ut(r[o])), (l.el = i.el)),
        !n && l.patchFlag !== -2 && Io(i, l)),
        l.type === Fn && (l.el = i.el),
        l.type === pt && !l.el && (l.el = i.el));
    }
}
function Kl(e) {
  const t = e.slice(),
    n = [0];
  let s, r, o, i, l;
  const c = e.length;
  for (s = 0; s < c; s++) {
    const h = e[s];
    if (h !== 0) {
      if (((r = n[n.length - 1]), e[r] < h)) {
        ((t[s] = r), n.push(s));
        continue;
      }
      for (o = 0, i = n.length - 1; o < i; )
        ((l = (o + i) >> 1), e[n[l]] < h ? (o = l + 1) : (i = l));
      h < e[n[o]] && (o > 0 && (t[s] = n[o - 1]), (n[o] = s));
    }
  }
  for (o = n.length, i = n[o - 1]; o-- > 0; ) ((n[o] = i), (i = t[i]));
  return n;
}
function To(e) {
  const t = e.subTree.component;
  if (t) return t.asyncDep && !t.asyncResolved ? t : To(t);
}
function er(e) {
  if (e) for (let t = 0; t < e.length; t++) e[t].flags |= 8;
}
const Wl = Symbol.for("v-scx"),
  Gl = () => Ge(Wl);
function At(e, t, n) {
  return Ao(e, t, n);
}
function Ao(e, t, n = re) {
  const { immediate: s, deep: r, flush: o, once: i } = n,
    l = _e({}, n),
    c = (t && s) || (!t && o !== "post");
  let h;
  if (sn) {
    if (o === "sync") {
      const m = Gl();
      h = m.__watcherHandles || (m.__watcherHandles = []);
    } else if (!c) {
      const m = () => {};
      return ((m.stop = We), (m.resume = We), (m.pause = We), m);
    }
  }
  const a = ve;
  l.call = (m, E, x) => qe(m, a, E, x);
  let d = !1;
  (o === "post"
    ? (l.scheduler = (m) => {
        Pe(m, a && a.suspense);
      })
    : o !== "sync" &&
      ((d = !0),
      (l.scheduler = (m, E) => {
        E ? m() : Ms(m);
      })),
    (l.augmentJob = (m) => {
      (t && (m.flags |= 4),
        d && ((m.flags |= 2), a && ((m.id = a.uid), (m.i = a))));
    }));
  const g = rl(e, t, l);
  return (sn && (h ? h.push(g) : c && g()), g);
}
function ql(e, t, n) {
  const s = this.proxy,
    r = de(e) ? (e.includes(".") ? Mo(s, e) : () => s[e]) : e.bind(s, s);
  let o;
  B(t) ? (o = t) : ((o = t.handler), (n = t));
  const i = cn(this),
    l = Ao(r, o.bind(s), n);
  return (i(), l);
}
function Mo(e, t) {
  const n = t.split(".");
  return () => {
    let s = e;
    for (let r = 0; r < n.length && s; r++) s = s[n[r]];
    return s;
  };
}
const zl = (e, t) =>
  t === "modelValue" || t === "model-value"
    ? e.modelModifiers
    : e[`${t}Modifiers`] || e[`${Ae(t)}Modifiers`] || e[`${wt(t)}Modifiers`];
function Yl(e, t, ...n) {
  if (e.isUnmounted) return;
  const s = e.vnode.props || re;
  let r = n;
  const o = t.startsWith("update:"),
    i = o && zl(s, t.slice(7));
  i &&
    (i.trim && (r = n.map((a) => (de(a) ? a.trim() : a))),
    i.number && (r = n.map(xi)));
  let l,
    c = s[(l = $n(t))] || s[(l = $n(Ae(t)))];
  (!c && o && (c = s[(l = $n(wt(t)))]), c && qe(c, e, 6, r));
  const h = s[l + "Once"];
  if (h) {
    if (!e.emitted) e.emitted = {};
    else if (e.emitted[l]) return;
    ((e.emitted[l] = !0), qe(h, e, 6, r));
  }
}
function Lo(e, t, n = !1) {
  const s = t.emitsCache,
    r = s.get(e);
  if (r !== void 0) return r;
  const o = e.emits;
  let i = {},
    l = !1;
  if (!B(e)) {
    const c = (h) => {
      const a = Lo(h, t, !0);
      a && ((l = !0), _e(i, a));
    };
    (!n && t.mixins.length && t.mixins.forEach(c),
      e.extends && c(e.extends),
      e.mixins && e.mixins.forEach(c));
  }
  return !o && !l
    ? (ce(e) && s.set(e, null), null)
    : (D(o) ? o.forEach((c) => (i[c] = null)) : _e(i, o),
      ce(e) && s.set(e, i),
      i);
}
function Nn(e, t) {
  return !e || !Cn(t)
    ? !1
    : ((t = t.slice(2).replace(/Once$/, "")),
      X(e, t[0].toLowerCase() + t.slice(1)) || X(e, wt(t)) || X(e, t));
}
function tr(e) {
  const {
      type: t,
      vnode: n,
      proxy: s,
      withProxy: r,
      propsOptions: [o],
      slots: i,
      attrs: l,
      emit: c,
      render: h,
      renderCache: a,
      props: d,
      data: g,
      setupState: m,
      ctx: E,
      inheritAttrs: x,
    } = e,
    N = bn(e);
  let L, A;
  try {
    if (n.shapeFlag & 4) {
      const I = r || s,
        j = I;
      ((L = Ke(h.call(j, I, a, d, m, g, E))), (A = l));
    } else {
      const I = t;
      ((L = Ke(
        I.length > 1 ? I(d, { attrs: l, slots: i, emit: c }) : I(d, null),
      )),
        (A = t.props ? l : Jl(l)));
    }
  } catch (I) {
    ((Yt.length = 0), An(I, e, 1), (L = Ie(pt)));
  }
  let F = L;
  if (A && x !== !1) {
    const I = Object.keys(A),
      { shapeFlag: j } = F;
    I.length &&
      j & 7 &&
      (o && I.some(vs) && (A = Ql(A, o)), (F = Mt(F, A, !1, !0)));
  }
  return (
    n.dirs &&
      ((F = Mt(F, null, !1, !0)),
      (F.dirs = F.dirs ? F.dirs.concat(n.dirs) : n.dirs)),
    n.transition && Ls(F, n.transition),
    (L = F),
    bn(N),
    L
  );
}
const Jl = (e) => {
    let t;
    for (const n in e)
      (n === "class" || n === "style" || Cn(n)) && ((t || (t = {}))[n] = e[n]);
    return t;
  },
  Ql = (e, t) => {
    const n = {};
    for (const s in e) (!vs(s) || !(s.slice(9) in t)) && (n[s] = e[s]);
    return n;
  };
function Xl(e, t, n) {
  const { props: s, children: r, component: o } = e,
    { props: i, children: l, patchFlag: c } = t,
    h = o.emitsOptions;
  if (t.dirs || t.transition) return !0;
  if (n && c >= 0) {
    if (c & 1024) return !0;
    if (c & 16) return s ? nr(s, i, h) : !!i;
    if (c & 8) {
      const a = t.dynamicProps;
      for (let d = 0; d < a.length; d++) {
        const g = a[d];
        if (i[g] !== s[g] && !Nn(h, g)) return !0;
      }
    }
  } else
    return (r || l) && (!l || !l.$stable)
      ? !0
      : s === i
        ? !1
        : s
          ? i
            ? nr(s, i, h)
            : !0
          : !!i;
  return !1;
}
function nr(e, t, n) {
  const s = Object.keys(t);
  if (s.length !== Object.keys(e).length) return !0;
  for (let r = 0; r < s.length; r++) {
    const o = s[r];
    if (t[o] !== e[o] && !Nn(n, o)) return !0;
  }
  return !1;
}
function Zl({ vnode: e, parent: t }, n) {
  for (; t; ) {
    const s = t.subTree;
    if ((s.suspense && s.suspense.activeBranch === e && (s.el = e.el), s === e))
      (((e = t.vnode).el = n), (t = t.parent));
    else break;
  }
}
const No = (e) => e.__isSuspense;
function ec(e, t) {
  t && t.pendingBranch
    ? D(e)
      ? t.effects.push(...e)
      : t.effects.push(e)
    : ll(e);
}
const Ue = Symbol.for("v-fgt"),
  Fn = Symbol.for("v-txt"),
  pt = Symbol.for("v-cmt"),
  Wn = Symbol.for("v-stc"),
  Yt = [];
let Oe = null;
function Re(e = !1) {
  Yt.push((Oe = e ? null : []));
}
function tc() {
  (Yt.pop(), (Oe = Yt[Yt.length - 1] || null));
}
let nn = 1;
function sr(e, t = !1) {
  ((nn += e), e < 0 && Oe && t && (Oe.hasOnce = !0));
}
function Fo(e) {
  return (
    (e.dynamicChildren = nn > 0 ? Oe || It : null),
    tc(),
    nn > 0 && Oe && Oe.push(e),
    e
  );
}
function Ve(e, t, n, s, r, o) {
  return Fo(z(e, t, n, s, r, o, !0));
}
function wn(e, t, n, s, r) {
  return Fo(Ie(e, t, n, s, r, !0));
}
function En(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
function Ht(e, t) {
  return e.type === t.type && e.key === t.key;
}
const jo = ({ key: e }) => e ?? null,
  gn = ({ ref: e, ref_key: t, ref_for: n }) => (
    typeof e == "number" && (e = "" + e),
    e != null
      ? de(e) || le(e) || B(e)
        ? { i: Me, r: e, k: t, f: !!n }
        : e
      : null
  );
function z(
  e,
  t = null,
  n = null,
  s = 0,
  r = null,
  o = e === Ue ? 0 : 1,
  i = !1,
  l = !1,
) {
  const c = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && jo(t),
    ref: t && gn(t),
    scopeId: ao,
    slotScopeIds: null,
    children: n,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetStart: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag: o,
    patchFlag: s,
    dynamicProps: r,
    dynamicChildren: null,
    appContext: null,
    ctx: Me,
  };
  return (
    l
      ? (js(c, n), o & 128 && e.normalize(c))
      : n && (c.shapeFlag |= de(n) ? 8 : 16),
    nn > 0 &&
      !i &&
      Oe &&
      (c.patchFlag > 0 || o & 6) &&
      c.patchFlag !== 32 &&
      Oe.push(c),
    c
  );
}
const Ie = nc;
function nc(e, t = null, n = null, s = 0, r = null, o = !1) {
  if (((!e || e === Sl) && (e = pt), En(e))) {
    const l = Mt(e, t, !0);
    return (
      n && js(l, n),
      nn > 0 &&
        !o &&
        Oe &&
        (l.shapeFlag & 6 ? (Oe[Oe.indexOf(e)] = l) : Oe.push(l)),
      (l.patchFlag = -2),
      l
    );
  }
  if ((hc(e) && (e = e.__vccOpts), t)) {
    t = sc(t);
    let { class: l, style: c } = t;
    (l && !de(l) && (t.class = xs(l)),
      ce(c) && (Is(c) && !D(c) && (c = _e({}, c)), (t.style = bs(c))));
  }
  const i = de(e) ? 1 : No(e) ? 128 : fl(e) ? 64 : ce(e) ? 4 : B(e) ? 2 : 0;
  return z(e, t, n, s, r, i, o, !0);
}
function sc(e) {
  return e ? (Is(e) || Eo(e) ? _e({}, e) : e) : null;
}
function Mt(e, t, n = !1, s = !1) {
  const { props: r, ref: o, patchFlag: i, children: l, transition: c } = e,
    h = t ? rc(r || {}, t) : r,
    a = {
      __v_isVNode: !0,
      __v_skip: !0,
      type: e.type,
      props: h,
      key: h && jo(h),
      ref:
        t && t.ref
          ? n && o
            ? D(o)
              ? o.concat(gn(t))
              : [o, gn(t)]
            : gn(t)
          : o,
      scopeId: e.scopeId,
      slotScopeIds: e.slotScopeIds,
      children: l,
      target: e.target,
      targetStart: e.targetStart,
      targetAnchor: e.targetAnchor,
      staticCount: e.staticCount,
      shapeFlag: e.shapeFlag,
      patchFlag: t && e.type !== Ue ? (i === -1 ? 16 : i | 16) : i,
      dynamicProps: e.dynamicProps,
      dynamicChildren: e.dynamicChildren,
      appContext: e.appContext,
      dirs: e.dirs,
      transition: c,
      component: e.component,
      suspense: e.suspense,
      ssContent: e.ssContent && Mt(e.ssContent),
      ssFallback: e.ssFallback && Mt(e.ssFallback),
      placeholder: e.placeholder,
      el: e.el,
      anchor: e.anchor,
      ctx: e.ctx,
      ce: e.ce,
    };
  return (c && s && Ls(a, c.clone(a)), a);
}
function Qe(e = " ", t = 0) {
  return Ie(Fn, null, e, t);
}
function Ze(e = "", t = !1) {
  return t ? (Re(), wn(pt, null, e)) : Ie(pt, null, e);
}
function Ke(e) {
  return e == null || typeof e == "boolean"
    ? Ie(pt)
    : D(e)
      ? Ie(Ue, null, e.slice())
      : En(e)
        ? ut(e)
        : Ie(Fn, null, String(e));
}
function ut(e) {
  return (e.el === null && e.patchFlag !== -1) || e.memo ? e : Mt(e);
}
function js(e, t) {
  let n = 0;
  const { shapeFlag: s } = e;
  if (t == null) t = null;
  else if (D(t)) n = 16;
  else if (typeof t == "object")
    if (s & 65) {
      const r = t.default;
      r && (r._c && (r._d = !1), js(e, r()), r._c && (r._d = !0));
      return;
    } else {
      n = 32;
      const r = t._;
      !r && !Eo(t)
        ? (t._ctx = Me)
        : r === 3 &&
          Me &&
          (Me.slots._ === 1 ? (t._ = 1) : ((t._ = 2), (e.patchFlag |= 1024)));
    }
  else
    B(t)
      ? ((t = { default: t, _ctx: Me }), (n = 32))
      : ((t = String(t)), s & 64 ? ((n = 16), (t = [Qe(t)])) : (n = 8));
  ((e.children = t), (e.shapeFlag |= n));
}
function rc(...e) {
  const t = {};
  for (let n = 0; n < e.length; n++) {
    const s = e[n];
    for (const r in s)
      if (r === "class")
        t.class !== s.class && (t.class = xs([t.class, s.class]));
      else if (r === "style") t.style = bs([t.style, s.style]);
      else if (Cn(r)) {
        const o = t[r],
          i = s[r];
        i &&
          o !== i &&
          !(D(o) && o.includes(i)) &&
          (t[r] = o ? [].concat(o, i) : i);
      } else r !== "" && (t[r] = s[r]);
  }
  return t;
}
function De(e, t, n, s = null) {
  qe(e, t, 7, [n, s]);
}
const oc = bo();
let ic = 0;
function lc(e, t, n) {
  const s = e.type,
    r = (t ? t.appContext : e.appContext) || oc,
    o = {
      uid: ic++,
      vnode: e,
      type: s,
      parent: t,
      appContext: r,
      root: null,
      next: null,
      subTree: null,
      effect: null,
      update: null,
      job: null,
      scope: new Hr(!0),
      render: null,
      proxy: null,
      exposed: null,
      exposeProxy: null,
      withProxy: null,
      provides: t ? t.provides : Object.create(r.provides),
      ids: t ? t.ids : ["", 0, 0],
      accessCache: null,
      renderCache: [],
      components: null,
      directives: null,
      propsOptions: Ro(s, r),
      emitsOptions: Lo(s, r),
      emit: null,
      emitted: null,
      propsDefaults: re,
      inheritAttrs: s.inheritAttrs,
      ctx: re,
      data: re,
      props: re,
      attrs: re,
      slots: re,
      refs: re,
      setupState: re,
      setupContext: null,
      suspense: n,
      suspenseId: n ? n.pendingId : 0,
      asyncDep: null,
      asyncResolved: !1,
      isMounted: !1,
      isUnmounted: !1,
      isDeactivated: !1,
      bc: null,
      c: null,
      bm: null,
      m: null,
      bu: null,
      u: null,
      um: null,
      bum: null,
      da: null,
      a: null,
      rtg: null,
      rtc: null,
      ec: null,
      sp: null,
    };
  return (
    (o.ctx = { _: o }),
    (o.root = t ? t.root : o),
    (o.emit = Yl.bind(null, o)),
    e.ce && e.ce(o),
    o
  );
}
let ve = null;
const ko = () => ve || Me;
let Sn, cs;
{
  const e = Tn(),
    t = (n, s) => {
      let r;
      return (
        (r = e[n]) || (r = e[n] = []),
        r.push(s),
        (o) => {
          r.length > 1 ? r.forEach((i) => i(o)) : r[0](o);
        }
      );
    };
  ((Sn = t("__VUE_INSTANCE_SETTERS__", (n) => (ve = n))),
    (cs = t("__VUE_SSR_SETTERS__", (n) => (sn = n))));
}
const cn = (e) => {
    const t = ve;
    return (
      Sn(e),
      e.scope.on(),
      () => {
        (e.scope.off(), Sn(t));
      }
    );
  },
  rr = () => {
    (ve && ve.scope.off(), Sn(null));
  };
function $o(e) {
  return e.vnode.shapeFlag & 4;
}
let sn = !1;
function cc(e, t = !1, n = !1) {
  t && cs(t);
  const { props: s, children: r } = e.vnode,
    o = $o(e);
  (Fl(e, s, o, t), Hl(e, r, n || t));
  const i = o ? uc(e, t) : void 0;
  return (t && cs(!1), i);
}
function uc(e, t) {
  const n = e.type;
  ((e.accessCache = Object.create(null)), (e.proxy = new Proxy(e.ctx, Cl)));
  const { setup: s } = n;
  if (s) {
    tt();
    const r = (e.setupContext = s.length > 1 ? ac(e) : null),
      o = cn(e),
      i = ln(s, e, 0, [e.props, r]),
      l = kr(i);
    if ((nt(), o(), (l || e.sp) && !qt(e) && po(e), l)) {
      if ((i.then(rr, rr), t))
        return i
          .then((c) => {
            or(e, c);
          })
          .catch((c) => {
            An(c, e, 0);
          });
      e.asyncDep = i;
    } else or(e, i);
  } else Ho(e);
}
function or(e, t, n) {
  (B(t)
    ? e.type.__ssrInlineRender
      ? (e.ssrRender = t)
      : (e.render = t)
    : ce(t) && (e.setupState = oo(t)),
    Ho(e));
}
function Ho(e, t, n) {
  const s = e.type;
  e.render || (e.render = s.render || We);
  {
    const r = cn(e);
    tt();
    try {
      Pl(e);
    } finally {
      (nt(), r());
    }
  }
}
const fc = {
  get(e, t) {
    return (me(e, "get", ""), e[t]);
  },
};
function ac(e) {
  const t = (n) => {
    e.exposed = n || {};
  };
  return {
    attrs: new Proxy(e.attrs, fc),
    slots: e.slots,
    emit: e.emit,
    expose: t,
  };
}
function ks(e) {
  return e.exposed
    ? e.exposeProxy ||
        (e.exposeProxy = new Proxy(oo(Ts(e.exposed)), {
          get(t, n) {
            if (n in t) return t[n];
            if (n in zt) return zt[n](e);
          },
          has(t, n) {
            return n in t || n in zt;
          },
        }))
    : e.proxy;
}
function dc(e, t = !0) {
  return B(e) ? e.displayName || e.name : e.name || (t && e.__name);
}
function hc(e) {
  return B(e) && "__vccOpts" in e;
}
const he = (e, t) => nl(e, t, sn);
function Do(e, t, n) {
  const s = arguments.length;
  return s === 2
    ? ce(t) && !D(t)
      ? En(t)
        ? Ie(e, null, [t])
        : Ie(e, t)
      : Ie(e, null, t)
    : (s > 3
        ? (n = Array.prototype.slice.call(arguments, 2))
        : s === 3 && En(n) && (n = [n]),
      Ie(e, t, n));
}
const pc = "3.5.18";
/**
 * @vue/runtime-dom v3.5.18
 * (c) 2018-present Yuxi (Evan) You and Vue contributors
 * @license MIT
 **/ let us;
const ir = typeof window < "u" && window.trustedTypes;
if (ir)
  try {
    us = ir.createPolicy("vue", { createHTML: (e) => e });
  } catch {}
const Bo = us ? (e) => us.createHTML(e) : (e) => e,
  gc = "http://www.w3.org/2000/svg",
  mc = "http://www.w3.org/1998/Math/MathML",
  Xe = typeof document < "u" ? document : null,
  lr = Xe && Xe.createElement("template"),
  vc = {
    insert: (e, t, n) => {
      t.insertBefore(e, n || null);
    },
    remove: (e) => {
      const t = e.parentNode;
      t && t.removeChild(e);
    },
    createElement: (e, t, n, s) => {
      const r =
        t === "svg"
          ? Xe.createElementNS(gc, e)
          : t === "mathml"
            ? Xe.createElementNS(mc, e)
            : n
              ? Xe.createElement(e, { is: n })
              : Xe.createElement(e);
      return (
        e === "select" &&
          s &&
          s.multiple != null &&
          r.setAttribute("multiple", s.multiple),
        r
      );
    },
    createText: (e) => Xe.createTextNode(e),
    createComment: (e) => Xe.createComment(e),
    setText: (e, t) => {
      e.nodeValue = t;
    },
    setElementText: (e, t) => {
      e.textContent = t;
    },
    parentNode: (e) => e.parentNode,
    nextSibling: (e) => e.nextSibling,
    querySelector: (e) => Xe.querySelector(e),
    setScopeId(e, t) {
      e.setAttribute(t, "");
    },
    insertStaticContent(e, t, n, s, r, o) {
      const i = n ? n.previousSibling : t.lastChild;
      if (r && (r === o || r.nextSibling))
        for (
          ;
          t.insertBefore(r.cloneNode(!0), n),
            !(r === o || !(r = r.nextSibling));

        );
      else {
        lr.innerHTML = Bo(
          s === "svg"
            ? `<svg>${e}</svg>`
            : s === "mathml"
              ? `<math>${e}</math>`
              : e,
        );
        const l = lr.content;
        if (s === "svg" || s === "mathml") {
          const c = l.firstChild;
          for (; c.firstChild; ) l.appendChild(c.firstChild);
          l.removeChild(c);
        }
        t.insertBefore(l, n);
      }
      return [
        i ? i.nextSibling : t.firstChild,
        n ? n.previousSibling : t.lastChild,
      ];
    },
  },
  _c = Symbol("_vtc");
function yc(e, t, n) {
  const s = e[_c];
  (s && (t = (t ? [t, ...s] : [...s]).join(" ")),
    t == null
      ? e.removeAttribute("class")
      : n
        ? e.setAttribute("class", t)
        : (e.className = t));
}
const cr = Symbol("_vod"),
  bc = Symbol("_vsh"),
  xc = Symbol(""),
  wc = /(^|;)\s*display\s*:/;
function Ec(e, t, n) {
  const s = e.style,
    r = de(n);
  let o = !1;
  if (n && !r) {
    if (t)
      if (de(t))
        for (const i of t.split(";")) {
          const l = i.slice(0, i.indexOf(":")).trim();
          n[l] == null && mn(s, l, "");
        }
      else for (const i in t) n[i] == null && mn(s, i, "");
    for (const i in n) (i === "display" && (o = !0), mn(s, i, n[i]));
  } else if (r) {
    if (t !== n) {
      const i = s[xc];
      (i && (n += ";" + i), (s.cssText = n), (o = wc.test(n)));
    }
  } else t && e.removeAttribute("style");
  cr in e && ((e[cr] = o ? s.display : ""), e[bc] && (s.display = "none"));
}
const ur = /\s*!important$/;
function mn(e, t, n) {
  if (D(n)) n.forEach((s) => mn(e, t, s));
  else if ((n == null && (n = ""), t.startsWith("--"))) e.setProperty(t, n);
  else {
    const s = Sc(e, t);
    ur.test(n)
      ? e.setProperty(wt(s), n.replace(ur, ""), "important")
      : (e[s] = n);
  }
}
const fr = ["Webkit", "Moz", "ms"],
  Gn = {};
function Sc(e, t) {
  const n = Gn[t];
  if (n) return n;
  let s = Ae(t);
  if (s !== "filter" && s in e) return (Gn[t] = s);
  s = In(s);
  for (let r = 0; r < fr.length; r++) {
    const o = fr[r] + s;
    if (o in e) return (Gn[t] = o);
  }
  return t;
}
const ar = "http://www.w3.org/1999/xlink";
function dr(e, t, n, s, r, o = Pi(t)) {
  s && t.startsWith("xlink:")
    ? n == null
      ? e.removeAttributeNS(ar, t.slice(6, t.length))
      : e.setAttributeNS(ar, t, n)
    : n == null || (o && !$r(n))
      ? e.removeAttribute(t)
      : e.setAttribute(t, o ? "" : Ft(n) ? String(n) : n);
}
function hr(e, t, n, s, r) {
  if (t === "innerHTML" || t === "textContent") {
    n != null && (e[t] = t === "innerHTML" ? Bo(n) : n);
    return;
  }
  const o = e.tagName;
  if (t === "value" && o !== "PROGRESS" && !o.includes("-")) {
    const l = o === "OPTION" ? e.getAttribute("value") || "" : e.value,
      c = n == null ? (e.type === "checkbox" ? "on" : "") : String(n);
    ((l !== c || !("_value" in e)) && (e.value = c),
      n == null && e.removeAttribute(t),
      (e._value = n));
    return;
  }
  let i = !1;
  if (n === "" || n == null) {
    const l = typeof e[t];
    l === "boolean"
      ? (n = $r(n))
      : n == null && l === "string"
        ? ((n = ""), (i = !0))
        : l === "number" && ((n = 0), (i = !0));
  }
  try {
    e[t] = n;
  } catch {}
  i && e.removeAttribute(r || t);
}
function Rc(e, t, n, s) {
  e.addEventListener(t, n, s);
}
function Cc(e, t, n, s) {
  e.removeEventListener(t, n, s);
}
const pr = Symbol("_vei");
function Pc(e, t, n, s, r = null) {
  const o = e[pr] || (e[pr] = {}),
    i = o[t];
  if (s && i) i.value = s;
  else {
    const [l, c] = Oc(t);
    if (s) {
      const h = (o[t] = Ac(s, r));
      Rc(e, l, h, c);
    } else i && (Cc(e, l, i, c), (o[t] = void 0));
  }
}
const gr = /(?:Once|Passive|Capture)$/;
function Oc(e) {
  let t;
  if (gr.test(e)) {
    t = {};
    let s;
    for (; (s = e.match(gr)); )
      ((e = e.slice(0, e.length - s[0].length)), (t[s[0].toLowerCase()] = !0));
  }
  return [e[2] === ":" ? e.slice(3) : wt(e.slice(2)), t];
}
let qn = 0;
const Ic = Promise.resolve(),
  Tc = () => qn || (Ic.then(() => (qn = 0)), (qn = Date.now()));
function Ac(e, t) {
  const n = (s) => {
    if (!s._vts) s._vts = Date.now();
    else if (s._vts <= n.attached) return;
    qe(Mc(s, n.value), t, 5, [s]);
  };
  return ((n.value = e), (n.attached = Tc()), n);
}
function Mc(e, t) {
  if (D(t)) {
    const n = e.stopImmediatePropagation;
    return (
      (e.stopImmediatePropagation = () => {
        (n.call(e), (e._stopped = !0));
      }),
      t.map((s) => (r) => !r._stopped && s && s(r))
    );
  } else return t;
}
const mr = (e) =>
    e.charCodeAt(0) === 111 &&
    e.charCodeAt(1) === 110 &&
    e.charCodeAt(2) > 96 &&
    e.charCodeAt(2) < 123,
  Lc = (e, t, n, s, r, o) => {
    const i = r === "svg";
    t === "class"
      ? yc(e, s, i)
      : t === "style"
        ? Ec(e, n, s)
        : Cn(t)
          ? vs(t) || Pc(e, t, n, s, o)
          : (
                t[0] === "."
                  ? ((t = t.slice(1)), !0)
                  : t[0] === "^"
                    ? ((t = t.slice(1)), !1)
                    : Nc(e, t, s, i)
              )
            ? (hr(e, t, s),
              !e.tagName.includes("-") &&
                (t === "value" || t === "checked" || t === "selected") &&
                dr(e, t, s, i, o, t !== "value"))
            : e._isVueCE && (/[A-Z]/.test(t) || !de(s))
              ? hr(e, Ae(t), s, o, t)
              : (t === "true-value"
                  ? (e._trueValue = s)
                  : t === "false-value" && (e._falseValue = s),
                dr(e, t, s, i));
  };
function Nc(e, t, n, s) {
  if (s)
    return !!(
      t === "innerHTML" ||
      t === "textContent" ||
      (t in e && mr(t) && B(n))
    );
  if (
    t === "spellcheck" ||
    t === "draggable" ||
    t === "translate" ||
    t === "autocorrect" ||
    t === "form" ||
    (t === "list" && e.tagName === "INPUT") ||
    (t === "type" && e.tagName === "TEXTAREA")
  )
    return !1;
  if (t === "width" || t === "height") {
    const r = e.tagName;
    if (r === "IMG" || r === "VIDEO" || r === "CANVAS" || r === "SOURCE")
      return !1;
  }
  return mr(t) && de(n) ? !1 : t in e;
}
const Fc = _e({ patchProp: Lc }, vc);
let vr;
function jc() {
  return vr || (vr = Bl(Fc));
}
const kc = (...e) => {
  const t = jc().createApp(...e),
    { mount: n } = t;
  return (
    (t.mount = (s) => {
      const r = Hc(s);
      if (!r) return;
      const o = t._component;
      (!B(o) && !o.render && !o.template && (o.template = r.innerHTML),
        r.nodeType === 1 && (r.textContent = ""));
      const i = n(r, !1, $c(r));
      return (
        r instanceof Element &&
          (r.removeAttribute("v-cloak"), r.setAttribute("data-v-app", "")),
        i
      );
    }),
    t
  );
};
function $c(e) {
  if (e instanceof SVGElement) return "svg";
  if (typeof MathMLElement == "function" && e instanceof MathMLElement)
    return "mathml";
}
function Hc(e) {
  return de(e) ? document.querySelector(e) : e;
}
/*!
 * pinia v3.0.3
 * (c) 2025 Eduardo San Martin Morote
 * @license MIT
 */ let Vo;
const jn = (e) => (Vo = e),
  Uo = Symbol();
function fs(e) {
  return (
    e &&
    typeof e == "object" &&
    Object.prototype.toString.call(e) === "[object Object]" &&
    typeof e.toJSON != "function"
  );
}
var Jt;
(function (e) {
  ((e.direct = "direct"),
    (e.patchObject = "patch object"),
    (e.patchFunction = "patch function"));
})(Jt || (Jt = {}));
function Dc() {
  const e = Dr(!0),
    t = e.run(() => ue({}));
  let n = [],
    s = [];
  const r = Ts({
    install(o) {
      (jn(r),
        (r._a = o),
        o.provide(Uo, r),
        (o.config.globalProperties.$pinia = r),
        s.forEach((i) => n.push(i)),
        (s = []));
    },
    use(o) {
      return (this._a ? n.push(o) : s.push(o), this);
    },
    _p: n,
    _a: null,
    _e: e,
    _s: new Map(),
    state: t,
  });
  return r;
}
const Ko = () => {};
function _r(e, t, n, s = Ko) {
  e.push(t);
  const r = () => {
    const o = e.indexOf(t);
    o > -1 && (e.splice(o, 1), s());
  };
  return (!n && Br() && Oi(r), r);
}
function Ct(e, ...t) {
  e.slice().forEach((n) => {
    n(...t);
  });
}
const Bc = (e) => e(),
  yr = Symbol(),
  zn = Symbol();
function as(e, t) {
  e instanceof Map && t instanceof Map
    ? t.forEach((n, s) => e.set(s, n))
    : e instanceof Set && t instanceof Set && t.forEach(e.add, e);
  for (const n in t) {
    if (!t.hasOwnProperty(n)) continue;
    const s = t[n],
      r = e[n];
    fs(r) && fs(s) && e.hasOwnProperty(n) && !le(s) && !ht(s)
      ? (e[n] = as(r, s))
      : (e[n] = s);
  }
  return e;
}
const Vc = Symbol();
function Uc(e) {
  return !fs(e) || !Object.prototype.hasOwnProperty.call(e, Vc);
}
const { assign: lt } = Object;
function Kc(e) {
  return !!(le(e) && e.effect);
}
function Wc(e, t, n, s) {
  const { state: r, actions: o, getters: i } = t,
    l = n.state.value[e];
  let c;
  function h() {
    l || (n.state.value[e] = r ? r() : {});
    const a = Qi(n.state.value[e]);
    return lt(
      a,
      o,
      Object.keys(i || {}).reduce(
        (d, g) => (
          (d[g] = Ts(
            he(() => {
              jn(n);
              const m = n._s.get(e);
              return i[g].call(m, m);
            }),
          )),
          d
        ),
        {},
      ),
    );
  }
  return ((c = Wo(e, h, t, n, s, !0)), c);
}
function Wo(e, t, n = {}, s, r, o) {
  let i;
  const l = lt({ actions: {} }, n),
    c = { deep: !0 };
  let h,
    a,
    d = [],
    g = [],
    m;
  const E = s.state.value[e];
  (!o && !E && (s.state.value[e] = {}), ue({}));
  let x;
  function N(K) {
    let U;
    ((h = a = !1),
      typeof K == "function"
        ? (K(s.state.value[e]),
          (U = { type: Jt.patchFunction, storeId: e, events: m }))
        : (as(s.state.value[e], K),
          (U = { type: Jt.patchObject, payload: K, storeId: e, events: m })));
    const ee = (x = Symbol());
    (As().then(() => {
      x === ee && (h = !0);
    }),
      (a = !0),
      Ct(d, U, s.state.value[e]));
  }
  const L = o
    ? function () {
        const { state: U } = n,
          ee = U ? U() : {};
        this.$patch((fe) => {
          lt(fe, ee);
        });
      }
    : Ko;
  function A() {
    (i.stop(), (d = []), (g = []), s._s.delete(e));
  }
  const F = (K, U = "") => {
      if (yr in K) return ((K[zn] = U), K);
      const ee = function () {
        jn(s);
        const fe = Array.from(arguments),
          ae = [],
          pe = [];
        function gt(V) {
          ae.push(V);
        }
        function rt(V) {
          pe.push(V);
        }
        Ct(g, { args: fe, name: ee[zn], store: j, after: gt, onError: rt });
        let oe;
        try {
          oe = K.apply(this && this.$id === e ? this : j, fe);
        } catch (V) {
          throw (Ct(pe, V), V);
        }
        return oe instanceof Promise
          ? oe
              .then((V) => (Ct(ae, V), V))
              .catch((V) => (Ct(pe, V), Promise.reject(V)))
          : (Ct(ae, oe), oe);
      };
      return ((ee[yr] = !0), (ee[zn] = U), ee);
    },
    I = {
      _p: s,
      $id: e,
      $onAction: _r.bind(null, g),
      $patch: N,
      $reset: L,
      $subscribe(K, U = {}) {
        const ee = _r(d, K, U.detached, () => fe()),
          fe = i.run(() =>
            At(
              () => s.state.value[e],
              (ae) => {
                (U.flush === "sync" ? a : h) &&
                  K({ storeId: e, type: Jt.direct, events: m }, ae);
              },
              lt({}, c, U),
            ),
          );
        return ee;
      },
      $dispose: A,
    },
    j = jt(I);
  s._s.set(e, j);
  const q = ((s._a && s._a.runWithContext) || Bc)(() =>
    s._e.run(() => (i = Dr()).run(() => t({ action: F }))),
  );
  for (const K in q) {
    const U = q[K];
    if ((le(U) && !Kc(U)) || ht(U))
      o ||
        (E && Uc(U) && (le(U) ? (U.value = E[K]) : as(U, E[K])),
        (s.state.value[e][K] = U));
    else if (typeof U == "function") {
      const ee = F(U, K);
      ((q[K] = ee), (l.actions[K] = U));
    }
  }
  return (
    lt(j, q),
    lt(G(j), q),
    Object.defineProperty(j, "$state", {
      get: () => s.state.value[e],
      set: (K) => {
        N((U) => {
          lt(U, K);
        });
      },
    }),
    s._p.forEach((K) => {
      lt(
        j,
        i.run(() => K({ store: j, app: s._a, pinia: s, options: l })),
      );
    }),
    E && o && n.hydrate && n.hydrate(j.$state, E),
    (h = !0),
    (a = !0),
    j
  );
}
/*! #__NO_SIDE_EFFECTS__ */ function Gc(e, t, n) {
  let s;
  const r = typeof t == "function";
  s = r ? n : t;
  function o(i, l) {
    const c = Nl();
    return (
      (i = i || (c ? Ge(Uo, null) : null)),
      i && jn(i),
      (i = Vo),
      i._s.has(e) || (r ? Wo(e, t, s, i) : Wc(e, s, i)),
      i._s.get(e)
    );
  }
  return ((o.$id = e), o);
}
function Go(e) {
  const t = G(e),
    n = {};
  for (const s in t) {
    const r = t[s];
    r.effect
      ? (n[s] = he({
          get: () => e[s],
          set(o) {
            e[s] = o;
          },
        }))
      : (le(r) || ht(r)) && (n[s] = el(e, s));
  }
  return n;
}
/*!
 * vue-router v4.5.1
 * (c) 2025 Eduardo San Martin Morote
 * @license MIT
 */ const Ot = typeof document < "u";
function qo(e) {
  return (
    typeof e == "object" ||
    "displayName" in e ||
    "props" in e ||
    "__vccOpts" in e
  );
}
function qc(e) {
  return (
    e.__esModule ||
    e[Symbol.toStringTag] === "Module" ||
    (e.default && qo(e.default))
  );
}
const Q = Object.assign;
function Yn(e, t) {
  const n = {};
  for (const s in t) {
    const r = t[s];
    n[s] = Fe(r) ? r.map(e) : e(r);
  }
  return n;
}
const Qt = () => {},
  Fe = Array.isArray,
  zo = /#/g,
  zc = /&/g,
  Yc = /\//g,
  Jc = /=/g,
  Qc = /\?/g,
  Yo = /\+/g,
  Xc = /%5B/g,
  Zc = /%5D/g,
  Jo = /%5E/g,
  eu = /%60/g,
  Qo = /%7B/g,
  tu = /%7C/g,
  Xo = /%7D/g,
  nu = /%20/g;
function $s(e) {
  return encodeURI("" + e)
    .replace(tu, "|")
    .replace(Xc, "[")
    .replace(Zc, "]");
}
function su(e) {
  return $s(e).replace(Qo, "{").replace(Xo, "}").replace(Jo, "^");
}
function ds(e) {
  return $s(e)
    .replace(Yo, "%2B")
    .replace(nu, "+")
    .replace(zo, "%23")
    .replace(zc, "%26")
    .replace(eu, "`")
    .replace(Qo, "{")
    .replace(Xo, "}")
    .replace(Jo, "^");
}
function ru(e) {
  return ds(e).replace(Jc, "%3D");
}
function ou(e) {
  return $s(e).replace(zo, "%23").replace(Qc, "%3F");
}
function iu(e) {
  return e == null ? "" : ou(e).replace(Yc, "%2F");
}
function rn(e) {
  try {
    return decodeURIComponent("" + e);
  } catch {}
  return "" + e;
}
const lu = /\/$/,
  cu = (e) => e.replace(lu, "");
function Jn(e, t, n = "/") {
  let s,
    r = {},
    o = "",
    i = "";
  const l = t.indexOf("#");
  let c = t.indexOf("?");
  return (
    l < c && l >= 0 && (c = -1),
    c > -1 &&
      ((s = t.slice(0, c)),
      (o = t.slice(c + 1, l > -1 ? l : t.length)),
      (r = e(o))),
    l > -1 && ((s = s || t.slice(0, l)), (i = t.slice(l, t.length))),
    (s = du(s ?? t, n)),
    { fullPath: s + (o && "?") + o + i, path: s, query: r, hash: rn(i) }
  );
}
function uu(e, t) {
  const n = t.query ? e(t.query) : "";
  return t.path + (n && "?") + n + (t.hash || "");
}
function br(e, t) {
  return !t || !e.toLowerCase().startsWith(t.toLowerCase())
    ? e
    : e.slice(t.length) || "/";
}
function fu(e, t, n) {
  const s = t.matched.length - 1,
    r = n.matched.length - 1;
  return (
    s > -1 &&
    s === r &&
    Lt(t.matched[s], n.matched[r]) &&
    Zo(t.params, n.params) &&
    e(t.query) === e(n.query) &&
    t.hash === n.hash
  );
}
function Lt(e, t) {
  return (e.aliasOf || e) === (t.aliasOf || t);
}
function Zo(e, t) {
  if (Object.keys(e).length !== Object.keys(t).length) return !1;
  for (const n in e) if (!au(e[n], t[n])) return !1;
  return !0;
}
function au(e, t) {
  return Fe(e) ? xr(e, t) : Fe(t) ? xr(t, e) : e === t;
}
function xr(e, t) {
  return Fe(t)
    ? e.length === t.length && e.every((n, s) => n === t[s])
    : e.length === 1 && e[0] === t;
}
function du(e, t) {
  if (e.startsWith("/")) return e;
  if (!e) return t;
  const n = t.split("/"),
    s = e.split("/"),
    r = s[s.length - 1];
  (r === ".." || r === ".") && s.push("");
  let o = n.length - 1,
    i,
    l;
  for (i = 0; i < s.length; i++)
    if (((l = s[i]), l !== "."))
      if (l === "..") o > 1 && o--;
      else break;
  return n.slice(0, o).join("/") + "/" + s.slice(i).join("/");
}
const it = {
  path: "/",
  name: void 0,
  params: {},
  query: {},
  hash: "",
  fullPath: "/",
  matched: [],
  meta: {},
  redirectedFrom: void 0,
};
var on;
(function (e) {
  ((e.pop = "pop"), (e.push = "push"));
})(on || (on = {}));
var Xt;
(function (e) {
  ((e.back = "back"), (e.forward = "forward"), (e.unknown = ""));
})(Xt || (Xt = {}));
function hu(e) {
  if (!e)
    if (Ot) {
      const t = document.querySelector("base");
      ((e = (t && t.getAttribute("href")) || "/"),
        (e = e.replace(/^\w+:\/\/[^\/]+/, "")));
    } else e = "/";
  return (e[0] !== "/" && e[0] !== "#" && (e = "/" + e), cu(e));
}
const pu = /^[^#]+#/;
function gu(e, t) {
  return e.replace(pu, "#") + t;
}
function mu(e, t) {
  const n = document.documentElement.getBoundingClientRect(),
    s = e.getBoundingClientRect();
  return {
    behavior: t.behavior,
    left: s.left - n.left - (t.left || 0),
    top: s.top - n.top - (t.top || 0),
  };
}
const kn = () => ({ left: window.scrollX, top: window.scrollY });
function vu(e) {
  let t;
  if ("el" in e) {
    const n = e.el,
      s = typeof n == "string" && n.startsWith("#"),
      r =
        typeof n == "string"
          ? s
            ? document.getElementById(n.slice(1))
            : document.querySelector(n)
          : n;
    if (!r) return;
    t = mu(r, e);
  } else t = e;
  "scrollBehavior" in document.documentElement.style
    ? window.scrollTo(t)
    : window.scrollTo(
        t.left != null ? t.left : window.scrollX,
        t.top != null ? t.top : window.scrollY,
      );
}
function wr(e, t) {
  return (history.state ? history.state.position - t : -1) + e;
}
const hs = new Map();
function _u(e, t) {
  hs.set(e, t);
}
function yu(e) {
  const t = hs.get(e);
  return (hs.delete(e), t);
}
let bu = () => location.protocol + "//" + location.host;
function ei(e, t) {
  const { pathname: n, search: s, hash: r } = t,
    o = e.indexOf("#");
  if (o > -1) {
    let l = r.includes(e.slice(o)) ? e.slice(o).length : 1,
      c = r.slice(l);
    return (c[0] !== "/" && (c = "/" + c), br(c, ""));
  }
  return br(n, e) + s + r;
}
function xu(e, t, n, s) {
  let r = [],
    o = [],
    i = null;
  const l = ({ state: g }) => {
    const m = ei(e, location),
      E = n.value,
      x = t.value;
    let N = 0;
    if (g) {
      if (((n.value = m), (t.value = g), i && i === E)) {
        i = null;
        return;
      }
      N = x ? g.position - x.position : 0;
    } else s(m);
    r.forEach((L) => {
      L(n.value, E, {
        delta: N,
        type: on.pop,
        direction: N ? (N > 0 ? Xt.forward : Xt.back) : Xt.unknown,
      });
    });
  };
  function c() {
    i = n.value;
  }
  function h(g) {
    r.push(g);
    const m = () => {
      const E = r.indexOf(g);
      E > -1 && r.splice(E, 1);
    };
    return (o.push(m), m);
  }
  function a() {
    const { history: g } = window;
    g.state && g.replaceState(Q({}, g.state, { scroll: kn() }), "");
  }
  function d() {
    for (const g of o) g();
    ((o = []),
      window.removeEventListener("popstate", l),
      window.removeEventListener("beforeunload", a));
  }
  return (
    window.addEventListener("popstate", l),
    window.addEventListener("beforeunload", a, { passive: !0 }),
    { pauseListeners: c, listen: h, destroy: d }
  );
}
function Er(e, t, n, s = !1, r = !1) {
  return {
    back: e,
    current: t,
    forward: n,
    replaced: s,
    position: window.history.length,
    scroll: r ? kn() : null,
  };
}
function wu(e) {
  const { history: t, location: n } = window,
    s = { value: ei(e, n) },
    r = { value: t.state };
  r.value ||
    o(
      s.value,
      {
        back: null,
        current: s.value,
        forward: null,
        position: t.length - 1,
        replaced: !0,
        scroll: null,
      },
      !0,
    );
  function o(c, h, a) {
    const d = e.indexOf("#"),
      g =
        d > -1
          ? (n.host && document.querySelector("base") ? e : e.slice(d)) + c
          : bu() + e + c;
    try {
      (t[a ? "replaceState" : "pushState"](h, "", g), (r.value = h));
    } catch (m) {
      (console.error(m), n[a ? "replace" : "assign"](g));
    }
  }
  function i(c, h) {
    const a = Q({}, t.state, Er(r.value.back, c, r.value.forward, !0), h, {
      position: r.value.position,
    });
    (o(c, a, !0), (s.value = c));
  }
  function l(c, h) {
    const a = Q({}, r.value, t.state, { forward: c, scroll: kn() });
    o(a.current, a, !0);
    const d = Q({}, Er(s.value, c, null), { position: a.position + 1 }, h);
    (o(c, d, !1), (s.value = c));
  }
  return { location: s, state: r, push: l, replace: i };
}
function Eu(e) {
  e = hu(e);
  const t = wu(e),
    n = xu(e, t.state, t.location, t.replace);
  function s(o, i = !0) {
    (i || n.pauseListeners(), history.go(o));
  }
  const r = Q(
    { location: "", base: e, go: s, createHref: gu.bind(null, e) },
    t,
    n,
  );
  return (
    Object.defineProperty(r, "location", {
      enumerable: !0,
      get: () => t.location.value,
    }),
    Object.defineProperty(r, "state", {
      enumerable: !0,
      get: () => t.state.value,
    }),
    r
  );
}
function Su(e) {
  return (
    (e = location.host ? e || location.pathname + location.search : ""),
    e.includes("#") || (e += "#"),
    Eu(e)
  );
}
function Ru(e) {
  return typeof e == "string" || (e && typeof e == "object");
}
function ti(e) {
  return typeof e == "string" || typeof e == "symbol";
}
const ni = Symbol("");
var Sr;
(function (e) {
  ((e[(e.aborted = 4)] = "aborted"),
    (e[(e.cancelled = 8)] = "cancelled"),
    (e[(e.duplicated = 16)] = "duplicated"));
})(Sr || (Sr = {}));
function Nt(e, t) {
  return Q(new Error(), { type: e, [ni]: !0 }, t);
}
function Je(e, t) {
  return e instanceof Error && ni in e && (t == null || !!(e.type & t));
}
const Rr = "[^/]+?",
  Cu = { sensitive: !1, strict: !1, start: !0, end: !0 },
  Pu = /[.+*?^${}()[\]/\\]/g;
function Ou(e, t) {
  const n = Q({}, Cu, t),
    s = [];
  let r = n.start ? "^" : "";
  const o = [];
  for (const h of e) {
    const a = h.length ? [] : [90];
    n.strict && !h.length && (r += "/");
    for (let d = 0; d < h.length; d++) {
      const g = h[d];
      let m = 40 + (n.sensitive ? 0.25 : 0);
      if (g.type === 0)
        (d || (r += "/"), (r += g.value.replace(Pu, "\\$&")), (m += 40));
      else if (g.type === 1) {
        const { value: E, repeatable: x, optional: N, regexp: L } = g;
        o.push({ name: E, repeatable: x, optional: N });
        const A = L || Rr;
        if (A !== Rr) {
          m += 10;
          try {
            new RegExp(`(${A})`);
          } catch (I) {
            throw new Error(
              `Invalid custom RegExp for param "${E}" (${A}): ` + I.message,
            );
          }
        }
        let F = x ? `((?:${A})(?:/(?:${A}))*)` : `(${A})`;
        (d || (F = N && h.length < 2 ? `(?:/${F})` : "/" + F),
          N && (F += "?"),
          (r += F),
          (m += 20),
          N && (m += -8),
          x && (m += -20),
          A === ".*" && (m += -50));
      }
      a.push(m);
    }
    s.push(a);
  }
  if (n.strict && n.end) {
    const h = s.length - 1;
    s[h][s[h].length - 1] += 0.7000000000000001;
  }
  (n.strict || (r += "/?"),
    n.end ? (r += "$") : n.strict && !r.endsWith("/") && (r += "(?:/|$)"));
  const i = new RegExp(r, n.sensitive ? "" : "i");
  function l(h) {
    const a = h.match(i),
      d = {};
    if (!a) return null;
    for (let g = 1; g < a.length; g++) {
      const m = a[g] || "",
        E = o[g - 1];
      d[E.name] = m && E.repeatable ? m.split("/") : m;
    }
    return d;
  }
  function c(h) {
    let a = "",
      d = !1;
    for (const g of e) {
      ((!d || !a.endsWith("/")) && (a += "/"), (d = !1));
      for (const m of g)
        if (m.type === 0) a += m.value;
        else if (m.type === 1) {
          const { value: E, repeatable: x, optional: N } = m,
            L = E in h ? h[E] : "";
          if (Fe(L) && !x)
            throw new Error(
              `Provided param "${E}" is an array but it is not repeatable (* or + modifiers)`,
            );
          const A = Fe(L) ? L.join("/") : L;
          if (!A)
            if (N)
              g.length < 2 &&
                (a.endsWith("/") ? (a = a.slice(0, -1)) : (d = !0));
            else throw new Error(`Missing required param "${E}"`);
          a += A;
        }
    }
    return a || "/";
  }
  return { re: i, score: s, keys: o, parse: l, stringify: c };
}
function Iu(e, t) {
  let n = 0;
  for (; n < e.length && n < t.length; ) {
    const s = t[n] - e[n];
    if (s) return s;
    n++;
  }
  return e.length < t.length
    ? e.length === 1 && e[0] === 80
      ? -1
      : 1
    : e.length > t.length
      ? t.length === 1 && t[0] === 80
        ? 1
        : -1
      : 0;
}
function si(e, t) {
  let n = 0;
  const s = e.score,
    r = t.score;
  for (; n < s.length && n < r.length; ) {
    const o = Iu(s[n], r[n]);
    if (o) return o;
    n++;
  }
  if (Math.abs(r.length - s.length) === 1) {
    if (Cr(s)) return 1;
    if (Cr(r)) return -1;
  }
  return r.length - s.length;
}
function Cr(e) {
  const t = e[e.length - 1];
  return e.length > 0 && t[t.length - 1] < 0;
}
const Tu = { type: 0, value: "" },
  Au = /[a-zA-Z0-9_]/;
function Mu(e) {
  if (!e) return [[]];
  if (e === "/") return [[Tu]];
  if (!e.startsWith("/")) throw new Error(`Invalid path "${e}"`);
  function t(m) {
    throw new Error(`ERR (${n})/"${h}": ${m}`);
  }
  let n = 0,
    s = n;
  const r = [];
  let o;
  function i() {
    (o && r.push(o), (o = []));
  }
  let l = 0,
    c,
    h = "",
    a = "";
  function d() {
    h &&
      (n === 0
        ? o.push({ type: 0, value: h })
        : n === 1 || n === 2 || n === 3
          ? (o.length > 1 &&
              (c === "*" || c === "+") &&
              t(
                `A repeatable param (${h}) must be alone in its segment. eg: '/:ids+.`,
              ),
            o.push({
              type: 1,
              value: h,
              regexp: a,
              repeatable: c === "*" || c === "+",
              optional: c === "*" || c === "?",
            }))
          : t("Invalid state to consume buffer"),
      (h = ""));
  }
  function g() {
    h += c;
  }
  for (; l < e.length; ) {
    if (((c = e[l++]), c === "\\" && n !== 2)) {
      ((s = n), (n = 4));
      continue;
    }
    switch (n) {
      case 0:
        c === "/" ? (h && d(), i()) : c === ":" ? (d(), (n = 1)) : g();
        break;
      case 4:
        (g(), (n = s));
        break;
      case 1:
        c === "("
          ? (n = 2)
          : Au.test(c)
            ? g()
            : (d(), (n = 0), c !== "*" && c !== "?" && c !== "+" && l--);
        break;
      case 2:
        c === ")"
          ? a[a.length - 1] == "\\"
            ? (a = a.slice(0, -1) + c)
            : (n = 3)
          : (a += c);
        break;
      case 3:
        (d(), (n = 0), c !== "*" && c !== "?" && c !== "+" && l--, (a = ""));
        break;
      default:
        t("Unknown state");
        break;
    }
  }
  return (
    n === 2 && t(`Unfinished custom RegExp for param "${h}"`),
    d(),
    i(),
    r
  );
}
function Lu(e, t, n) {
  const s = Ou(Mu(e.path), n),
    r = Q(s, { record: e, parent: t, children: [], alias: [] });
  return (t && !r.record.aliasOf == !t.record.aliasOf && t.children.push(r), r);
}
function Nu(e, t) {
  const n = [],
    s = new Map();
  t = Tr({ strict: !1, end: !0, sensitive: !1 }, t);
  function r(d) {
    return s.get(d);
  }
  function o(d, g, m) {
    const E = !m,
      x = Or(d);
    x.aliasOf = m && m.record;
    const N = Tr(t, d),
      L = [x];
    if ("alias" in d) {
      const I = typeof d.alias == "string" ? [d.alias] : d.alias;
      for (const j of I)
        L.push(
          Or(
            Q({}, x, {
              components: m ? m.record.components : x.components,
              path: j,
              aliasOf: m ? m.record : x,
            }),
          ),
        );
    }
    let A, F;
    for (const I of L) {
      const { path: j } = I;
      if (g && j[0] !== "/") {
        const Y = g.record.path,
          q = Y[Y.length - 1] === "/" ? "" : "/";
        I.path = g.record.path + (j && q + j);
      }
      if (
        ((A = Lu(I, g, N)),
        m
          ? m.alias.push(A)
          : ((F = F || A),
            F !== A && F.alias.push(A),
            E && d.name && !Ir(A) && i(d.name)),
        ri(A) && c(A),
        x.children)
      ) {
        const Y = x.children;
        for (let q = 0; q < Y.length; q++) o(Y[q], A, m && m.children[q]);
      }
      m = m || A;
    }
    return F
      ? () => {
          i(F);
        }
      : Qt;
  }
  function i(d) {
    if (ti(d)) {
      const g = s.get(d);
      g &&
        (s.delete(d),
        n.splice(n.indexOf(g), 1),
        g.children.forEach(i),
        g.alias.forEach(i));
    } else {
      const g = n.indexOf(d);
      g > -1 &&
        (n.splice(g, 1),
        d.record.name && s.delete(d.record.name),
        d.children.forEach(i),
        d.alias.forEach(i));
    }
  }
  function l() {
    return n;
  }
  function c(d) {
    const g = ku(d, n);
    (n.splice(g, 0, d), d.record.name && !Ir(d) && s.set(d.record.name, d));
  }
  function h(d, g) {
    let m,
      E = {},
      x,
      N;
    if ("name" in d && d.name) {
      if (((m = s.get(d.name)), !m)) throw Nt(1, { location: d });
      ((N = m.record.name),
        (E = Q(
          Pr(
            g.params,
            m.keys
              .filter((F) => !F.optional)
              .concat(m.parent ? m.parent.keys.filter((F) => F.optional) : [])
              .map((F) => F.name),
          ),
          d.params &&
            Pr(
              d.params,
              m.keys.map((F) => F.name),
            ),
        )),
        (x = m.stringify(E)));
    } else if (d.path != null)
      ((x = d.path),
        (m = n.find((F) => F.re.test(x))),
        m && ((E = m.parse(x)), (N = m.record.name)));
    else {
      if (((m = g.name ? s.get(g.name) : n.find((F) => F.re.test(g.path))), !m))
        throw Nt(1, { location: d, currentLocation: g });
      ((N = m.record.name),
        (E = Q({}, g.params, d.params)),
        (x = m.stringify(E)));
    }
    const L = [];
    let A = m;
    for (; A; ) (L.unshift(A.record), (A = A.parent));
    return { name: N, path: x, params: E, matched: L, meta: ju(L) };
  }
  e.forEach((d) => o(d));
  function a() {
    ((n.length = 0), s.clear());
  }
  return {
    addRoute: o,
    resolve: h,
    removeRoute: i,
    clearRoutes: a,
    getRoutes: l,
    getRecordMatcher: r,
  };
}
function Pr(e, t) {
  const n = {};
  for (const s of t) s in e && (n[s] = e[s]);
  return n;
}
function Or(e) {
  const t = {
    path: e.path,
    redirect: e.redirect,
    name: e.name,
    meta: e.meta || {},
    aliasOf: e.aliasOf,
    beforeEnter: e.beforeEnter,
    props: Fu(e),
    children: e.children || [],
    instances: {},
    leaveGuards: new Set(),
    updateGuards: new Set(),
    enterCallbacks: {},
    components:
      "components" in e
        ? e.components || null
        : e.component && { default: e.component },
  };
  return (Object.defineProperty(t, "mods", { value: {} }), t);
}
function Fu(e) {
  const t = {},
    n = e.props || !1;
  if ("component" in e) t.default = n;
  else for (const s in e.components) t[s] = typeof n == "object" ? n[s] : n;
  return t;
}
function Ir(e) {
  for (; e; ) {
    if (e.record.aliasOf) return !0;
    e = e.parent;
  }
  return !1;
}
function ju(e) {
  return e.reduce((t, n) => Q(t, n.meta), {});
}
function Tr(e, t) {
  const n = {};
  for (const s in e) n[s] = s in t ? t[s] : e[s];
  return n;
}
function ku(e, t) {
  let n = 0,
    s = t.length;
  for (; n !== s; ) {
    const o = (n + s) >> 1;
    si(e, t[o]) < 0 ? (s = o) : (n = o + 1);
  }
  const r = $u(e);
  return (r && (s = t.lastIndexOf(r, s - 1)), s);
}
function $u(e) {
  let t = e;
  for (; (t = t.parent); ) if (ri(t) && si(e, t) === 0) return t;
}
function ri({ record: e }) {
  return !!(
    e.name ||
    (e.components && Object.keys(e.components).length) ||
    e.redirect
  );
}
function Hu(e) {
  const t = {};
  if (e === "" || e === "?") return t;
  const s = (e[0] === "?" ? e.slice(1) : e).split("&");
  for (let r = 0; r < s.length; ++r) {
    const o = s[r].replace(Yo, " "),
      i = o.indexOf("="),
      l = rn(i < 0 ? o : o.slice(0, i)),
      c = i < 0 ? null : rn(o.slice(i + 1));
    if (l in t) {
      let h = t[l];
      (Fe(h) || (h = t[l] = [h]), h.push(c));
    } else t[l] = c;
  }
  return t;
}
function Ar(e) {
  let t = "";
  for (let n in e) {
    const s = e[n];
    if (((n = ru(n)), s == null)) {
      s !== void 0 && (t += (t.length ? "&" : "") + n);
      continue;
    }
    (Fe(s) ? s.map((o) => o && ds(o)) : [s && ds(s)]).forEach((o) => {
      o !== void 0 &&
        ((t += (t.length ? "&" : "") + n), o != null && (t += "=" + o));
    });
  }
  return t;
}
function Du(e) {
  const t = {};
  for (const n in e) {
    const s = e[n];
    s !== void 0 &&
      (t[n] = Fe(s)
        ? s.map((r) => (r == null ? null : "" + r))
        : s == null
          ? s
          : "" + s);
  }
  return t;
}
const Bu = Symbol(""),
  Mr = Symbol(""),
  Hs = Symbol(""),
  oi = Symbol(""),
  ps = Symbol("");
function Dt() {
  let e = [];
  function t(s) {
    return (
      e.push(s),
      () => {
        const r = e.indexOf(s);
        r > -1 && e.splice(r, 1);
      }
    );
  }
  function n() {
    e = [];
  }
  return { add: t, list: () => e.slice(), reset: n };
}
function ft(e, t, n, s, r, o = (i) => i()) {
  const i = s && (s.enterCallbacks[r] = s.enterCallbacks[r] || []);
  return () =>
    new Promise((l, c) => {
      const h = (g) => {
          g === !1
            ? c(Nt(4, { from: n, to: t }))
            : g instanceof Error
              ? c(g)
              : Ru(g)
                ? c(Nt(2, { from: t, to: g }))
                : (i &&
                    s.enterCallbacks[r] === i &&
                    typeof g == "function" &&
                    i.push(g),
                  l());
        },
        a = o(() => e.call(s && s.instances[r], t, n, h));
      let d = Promise.resolve(a);
      (e.length < 3 && (d = d.then(h)), d.catch((g) => c(g)));
    });
}
function Qn(e, t, n, s, r = (o) => o()) {
  const o = [];
  for (const i of e)
    for (const l in i.components) {
      let c = i.components[l];
      if (!(t !== "beforeRouteEnter" && !i.instances[l]))
        if (qo(c)) {
          const a = (c.__vccOpts || c)[t];
          a && o.push(ft(a, n, s, i, l, r));
        } else {
          let h = c();
          o.push(() =>
            h.then((a) => {
              if (!a)
                throw new Error(
                  `Couldn't resolve component "${l}" at "${i.path}"`,
                );
              const d = qc(a) ? a.default : a;
              ((i.mods[l] = a), (i.components[l] = d));
              const m = (d.__vccOpts || d)[t];
              return m && ft(m, n, s, i, l, r)();
            }),
          );
        }
    }
  return o;
}
function Lr(e) {
  const t = Ge(Hs),
    n = Ge(oi),
    s = he(() => {
      const c = ie(e.to);
      return t.resolve(c);
    }),
    r = he(() => {
      const { matched: c } = s.value,
        { length: h } = c,
        a = c[h - 1],
        d = n.matched;
      if (!a || !d.length) return -1;
      const g = d.findIndex(Lt.bind(null, a));
      if (g > -1) return g;
      const m = Nr(c[h - 2]);
      return h > 1 && Nr(a) === m && d[d.length - 1].path !== m
        ? d.findIndex(Lt.bind(null, c[h - 2]))
        : g;
    }),
    o = he(() => r.value > -1 && Gu(n.params, s.value.params)),
    i = he(
      () =>
        r.value > -1 &&
        r.value === n.matched.length - 1 &&
        Zo(n.params, s.value.params),
    );
  function l(c = {}) {
    if (Wu(c)) {
      const h = t[ie(e.replace) ? "replace" : "push"](ie(e.to)).catch(Qt);
      return (
        e.viewTransition &&
          typeof document < "u" &&
          "startViewTransition" in document &&
          document.startViewTransition(() => h),
        h
      );
    }
    return Promise.resolve();
  }
  return {
    route: s,
    href: he(() => s.value.href),
    isActive: o,
    isExactActive: i,
    navigate: l,
  };
}
function Vu(e) {
  return e.length === 1 ? e[0] : e;
}
const Uu = ho({
    name: "RouterLink",
    compatConfig: { MODE: 3 },
    props: {
      to: { type: [String, Object], required: !0 },
      replace: Boolean,
      activeClass: String,
      exactActiveClass: String,
      custom: Boolean,
      ariaCurrentValue: { type: String, default: "page" },
      viewTransition: Boolean,
    },
    useLink: Lr,
    setup(e, { slots: t }) {
      const n = jt(Lr(e)),
        { options: s } = Ge(Hs),
        r = he(() => ({
          [Fr(e.activeClass, s.linkActiveClass, "router-link-active")]:
            n.isActive,
          [Fr(
            e.exactActiveClass,
            s.linkExactActiveClass,
            "router-link-exact-active",
          )]: n.isExactActive,
        }));
      return () => {
        const o = t.default && Vu(t.default(n));
        return e.custom
          ? o
          : Do(
              "a",
              {
                "aria-current": n.isExactActive ? e.ariaCurrentValue : null,
                href: n.href,
                onClick: n.navigate,
                class: r.value,
              },
              o,
            );
      };
    },
  }),
  Ku = Uu;
function Wu(e) {
  if (
    !(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey) &&
    !e.defaultPrevented &&
    !(e.button !== void 0 && e.button !== 0)
  ) {
    if (e.currentTarget && e.currentTarget.getAttribute) {
      const t = e.currentTarget.getAttribute("target");
      if (/\b_blank\b/i.test(t)) return;
    }
    return (e.preventDefault && e.preventDefault(), !0);
  }
}
function Gu(e, t) {
  for (const n in t) {
    const s = t[n],
      r = e[n];
    if (typeof s == "string") {
      if (s !== r) return !1;
    } else if (!Fe(r) || r.length !== s.length || s.some((o, i) => o !== r[i]))
      return !1;
  }
  return !0;
}
function Nr(e) {
  return e ? (e.aliasOf ? e.aliasOf.path : e.path) : "";
}
const Fr = (e, t, n) => e ?? t ?? n,
  qu = ho({
    name: "RouterView",
    inheritAttrs: !1,
    props: { name: { type: String, default: "default" }, route: Object },
    compatConfig: { MODE: 3 },
    setup(e, { attrs: t, slots: n }) {
      const s = Ge(ps),
        r = he(() => e.route || s.value),
        o = Ge(Mr, 0),
        i = he(() => {
          let h = ie(o);
          const { matched: a } = r.value;
          let d;
          for (; (d = a[h]) && !d.components; ) h++;
          return h;
        }),
        l = he(() => r.value.matched[i.value]);
      (pn(
        Mr,
        he(() => i.value + 1),
      ),
        pn(Bu, l),
        pn(ps, r));
      const c = ue();
      return (
        At(
          () => [c.value, l.value, e.name],
          ([h, a, d], [g, m, E]) => {
            (a &&
              ((a.instances[d] = h),
              m &&
                m !== a &&
                h &&
                h === g &&
                (a.leaveGuards.size || (a.leaveGuards = m.leaveGuards),
                a.updateGuards.size || (a.updateGuards = m.updateGuards))),
              h &&
                a &&
                (!m || !Lt(a, m) || !g) &&
                (a.enterCallbacks[d] || []).forEach((x) => x(h)));
          },
          { flush: "post" },
        ),
        () => {
          const h = r.value,
            a = e.name,
            d = l.value,
            g = d && d.components[a];
          if (!g) return jr(n.default, { Component: g, route: h });
          const m = d.props[a],
            E = m
              ? m === !0
                ? h.params
                : typeof m == "function"
                  ? m(h)
                  : m
              : null,
            N = Do(
              g,
              Q({}, E, t, {
                onVnodeUnmounted: (L) => {
                  L.component.isUnmounted && (d.instances[a] = null);
                },
                ref: c,
              }),
            );
          return jr(n.default, { Component: N, route: h }) || N;
        }
      );
    },
  });
function jr(e, t) {
  if (!e) return null;
  const n = e(t);
  return n.length === 1 ? n[0] : n;
}
const zu = qu;
function Yu(e) {
  const t = Nu(e.routes, e),
    n = e.parseQuery || Hu,
    s = e.stringifyQuery || Ar,
    r = e.history,
    o = Dt(),
    i = Dt(),
    l = Dt(),
    c = zi(it);
  let h = it;
  Ot &&
    e.scrollBehavior &&
    "scrollRestoration" in history &&
    (history.scrollRestoration = "manual");
  const a = Yn.bind(null, (_) => "" + _),
    d = Yn.bind(null, iu),
    g = Yn.bind(null, rn);
  function m(_, T) {
    let P, M;
    return (
      ti(_) ? ((P = t.getRecordMatcher(_)), (M = T)) : (M = _),
      t.addRoute(M, P)
    );
  }
  function E(_) {
    const T = t.getRecordMatcher(_);
    T && t.removeRoute(T);
  }
  function x() {
    return t.getRoutes().map((_) => _.record);
  }
  function N(_) {
    return !!t.getRecordMatcher(_);
  }
  function L(_, T) {
    if (((T = Q({}, T || c.value)), typeof _ == "string")) {
      const p = Jn(n, _, T.path),
        v = t.resolve({ path: p.path }, T),
        b = r.createHref(p.fullPath);
      return Q(p, v, {
        params: g(v.params),
        hash: rn(p.hash),
        redirectedFrom: void 0,
        href: b,
      });
    }
    let P;
    if (_.path != null) P = Q({}, _, { path: Jn(n, _.path, T.path).path });
    else {
      const p = Q({}, _.params);
      for (const v in p) p[v] == null && delete p[v];
      ((P = Q({}, _, { params: d(p) })), (T.params = d(T.params)));
    }
    const M = t.resolve(P, T),
      te = _.hash || "";
    M.params = a(g(M.params));
    const u = uu(s, Q({}, _, { hash: su(te), path: M.path })),
      f = r.createHref(u);
    return Q(
      { fullPath: u, hash: te, query: s === Ar ? Du(_.query) : _.query || {} },
      M,
      { redirectedFrom: void 0, href: f },
    );
  }
  function A(_) {
    return typeof _ == "string" ? Jn(n, _, c.value.path) : Q({}, _);
  }
  function F(_, T) {
    if (h !== _) return Nt(8, { from: T, to: _ });
  }
  function I(_) {
    return q(_);
  }
  function j(_) {
    return I(Q(A(_), { replace: !0 }));
  }
  function Y(_) {
    const T = _.matched[_.matched.length - 1];
    if (T && T.redirect) {
      const { redirect: P } = T;
      let M = typeof P == "function" ? P(_) : P;
      return (
        typeof M == "string" &&
          ((M = M.includes("?") || M.includes("#") ? (M = A(M)) : { path: M }),
          (M.params = {})),
        Q(
          {
            query: _.query,
            hash: _.hash,
            params: M.path != null ? {} : _.params,
          },
          M,
        )
      );
    }
  }
  function q(_, T) {
    const P = (h = L(_)),
      M = c.value,
      te = _.state,
      u = _.force,
      f = _.replace === !0,
      p = Y(P);
    if (p)
      return q(
        Q(A(p), {
          state: typeof p == "object" ? Q({}, te, p.state) : te,
          force: u,
          replace: f,
        }),
        T || P,
      );
    const v = P;
    v.redirectedFrom = T;
    let b;
    return (
      !u && fu(s, M, P) && ((b = Nt(16, { to: v, from: M })), je(M, M, !0, !1)),
      (b ? Promise.resolve(b) : ee(v, M))
        .catch((y) => (Je(y) ? (Je(y, 2) ? y : ot(y)) : J(y, v, M)))
        .then((y) => {
          if (y) {
            if (Je(y, 2))
              return q(
                Q({ replace: f }, A(y.to), {
                  state: typeof y.to == "object" ? Q({}, te, y.to.state) : te,
                  force: u,
                }),
                T || v,
              );
          } else y = ae(v, M, !0, f, te);
          return (fe(v, M, y), y);
        })
    );
  }
  function K(_, T) {
    const P = F(_, T);
    return P ? Promise.reject(P) : Promise.resolve();
  }
  function U(_) {
    const T = St.values().next().value;
    return T && typeof T.runWithContext == "function"
      ? T.runWithContext(_)
      : _();
  }
  function ee(_, T) {
    let P;
    const [M, te, u] = Ju(_, T);
    P = Qn(M.reverse(), "beforeRouteLeave", _, T);
    for (const p of M)
      p.leaveGuards.forEach((v) => {
        P.push(ft(v, _, T));
      });
    const f = K.bind(null, _, T);
    return (
      P.push(f),
      Te(P)
        .then(() => {
          P = [];
          for (const p of o.list()) P.push(ft(p, _, T));
          return (P.push(f), Te(P));
        })
        .then(() => {
          P = Qn(te, "beforeRouteUpdate", _, T);
          for (const p of te)
            p.updateGuards.forEach((v) => {
              P.push(ft(v, _, T));
            });
          return (P.push(f), Te(P));
        })
        .then(() => {
          P = [];
          for (const p of u)
            if (p.beforeEnter)
              if (Fe(p.beforeEnter))
                for (const v of p.beforeEnter) P.push(ft(v, _, T));
              else P.push(ft(p.beforeEnter, _, T));
          return (P.push(f), Te(P));
        })
        .then(
          () => (
            _.matched.forEach((p) => (p.enterCallbacks = {})),
            (P = Qn(u, "beforeRouteEnter", _, T, U)),
            P.push(f),
            Te(P)
          ),
        )
        .then(() => {
          P = [];
          for (const p of i.list()) P.push(ft(p, _, T));
          return (P.push(f), Te(P));
        })
        .catch((p) => (Je(p, 8) ? p : Promise.reject(p)))
    );
  }
  function fe(_, T, P) {
    l.list().forEach((M) => U(() => M(_, T, P)));
  }
  function ae(_, T, P, M, te) {
    const u = F(_, T);
    if (u) return u;
    const f = T === it,
      p = Ot ? history.state : {};
    (P &&
      (M || f
        ? r.replace(_.fullPath, Q({ scroll: f && p && p.scroll }, te))
        : r.push(_.fullPath, te)),
      (c.value = _),
      je(_, T, P, f),
      ot());
  }
  let pe;
  function gt() {
    pe ||
      (pe = r.listen((_, T, P) => {
        if (!fn.listening) return;
        const M = L(_),
          te = Y(M);
        if (te) {
          q(Q(te, { replace: !0, force: !0 }), M).catch(Qt);
          return;
        }
        h = M;
        const u = c.value;
        (Ot && _u(wr(u.fullPath, P.delta), kn()),
          ee(M, u)
            .catch((f) =>
              Je(f, 12)
                ? f
                : Je(f, 2)
                  ? (q(Q(A(f.to), { force: !0 }), M)
                      .then((p) => {
                        Je(p, 20) &&
                          !P.delta &&
                          P.type === on.pop &&
                          r.go(-1, !1);
                      })
                      .catch(Qt),
                    Promise.reject())
                  : (P.delta && r.go(-P.delta, !1), J(f, M, u)),
            )
            .then((f) => {
              ((f = f || ae(M, u, !1)),
                f &&
                  (P.delta && !Je(f, 8)
                    ? r.go(-P.delta, !1)
                    : P.type === on.pop && Je(f, 20) && r.go(-1, !1)),
                fe(M, u, f));
            })
            .catch(Qt));
      }));
  }
  let rt = Dt(),
    oe = Dt(),
    V;
  function J(_, T, P) {
    ot(_);
    const M = oe.list();
    return (
      M.length ? M.forEach((te) => te(_, T, P)) : console.error(_),
      Promise.reject(_)
    );
  }
  function ze() {
    return V && c.value !== it
      ? Promise.resolve()
      : new Promise((_, T) => {
          rt.add([_, T]);
        });
  }
  function ot(_) {
    return (
      V ||
        ((V = !_),
        gt(),
        rt.list().forEach(([T, P]) => (_ ? P(_) : T())),
        rt.reset()),
      _
    );
  }
  function je(_, T, P, M) {
    const { scrollBehavior: te } = e;
    if (!Ot || !te) return Promise.resolve();
    const u =
      (!P && yu(wr(_.fullPath, 0))) ||
      ((M || !P) && history.state && history.state.scroll) ||
      null;
    return As()
      .then(() => te(_, T, u))
      .then((f) => f && vu(f))
      .catch((f) => J(f, _, T));
  }
  const we = (_) => r.go(_);
  let Et;
  const St = new Set(),
    fn = {
      currentRoute: c,
      listening: !0,
      addRoute: m,
      removeRoute: E,
      clearRoutes: t.clearRoutes,
      hasRoute: N,
      getRoutes: x,
      resolve: L,
      options: e,
      push: I,
      replace: j,
      go: we,
      back: () => we(-1),
      forward: () => we(1),
      beforeEach: o.add,
      beforeResolve: i.add,
      afterEach: l.add,
      onError: oe.add,
      isReady: ze,
      install(_) {
        const T = this;
        (_.component("RouterLink", Ku),
          _.component("RouterView", zu),
          (_.config.globalProperties.$router = T),
          Object.defineProperty(_.config.globalProperties, "$route", {
            enumerable: !0,
            get: () => ie(c),
          }),
          Ot &&
            !Et &&
            c.value === it &&
            ((Et = !0), I(r.location).catch((te) => {})));
        const P = {};
        for (const te in it)
          Object.defineProperty(P, te, {
            get: () => c.value[te],
            enumerable: !0,
          });
        (_.provide(Hs, T), _.provide(oi, no(P)), _.provide(ps, c));
        const M = _.unmount;
        (St.add(_),
          (_.unmount = function () {
            (St.delete(_),
              St.size < 1 &&
                ((h = it),
                pe && pe(),
                (pe = null),
                (c.value = it),
                (Et = !1),
                (V = !1)),
              M());
          }));
      },
    };
  function Te(_) {
    return _.reduce((T, P) => T.then(() => U(P)), Promise.resolve());
  }
  return fn;
}
function Ju(e, t) {
  const n = [],
    s = [],
    r = [],
    o = Math.max(t.matched.length, e.matched.length);
  for (let i = 0; i < o; i++) {
    const l = t.matched[i];
    l && (e.matched.find((h) => Lt(h, l)) ? s.push(l) : n.push(l));
    const c = e.matched[i];
    c && (t.matched.find((h) => Lt(h, c)) || r.push(c));
  }
  return [n, s, r];
}
function ii(e) {
  return -1 * (e - 1) ** 2 + 1;
}
function Qu(e) {
  return e ** 2;
}
function Xu(e) {
  return e;
}
const un = Gc("global", () => {
    let e = jt({ chapter: 0, section: 0, sentence: 0 }),
      t = ue(!1),
      n = ue(!1);
    function s() {
      ((t.value = !0), (n.value = !1));
    }
    function r(o) {
      const i = document.createElement("div");
      i.classList.add("warn");
      const l = document.createElement("i");
      ((l.innerText = o),
        i.appendChild(l),
        document.body.appendChild(i),
        i.classList.add("fadeIn"),
        (i.onanimationend = () => {
          i.classList.contains("fadeOut")
            ? i.remove()
            : (i.classList.remove("fadeIn"),
              setTimeout(() => {
                i.classList.add("fadeOut");
              }, 2e3));
        }));
    }
    return { indexInf: e, gaming: t, paused: n, warn: r, reload: s };
  }),
  Zu = {
    __name: "topNav",
    setup(e) {
      const t = ue(null),
        n = un();
      return (
        Ln(() => {
          if (!t.value) return;
          (console.log(n.paused), (t.value.style.opacity = 0));
          let s = 0;
          const r = setInterval(() => {
            ((s += 50 / 500),
              (t.value.style.opacity = ii(s)),
              s >= 1 && clearInterval(r));
          }, 50);
        }),
        (s, r) => (
          Re(),
          Ve(
            "div",
            { class: "topNav", ref_key: "target", ref: t },
            r[0] ||
              (r[0] = [
                z(
                  "div",
                  { class: "options button" },
                  [z("i", null, "OPTIONS 选项")],
                  -1,
                ),
                z(
                  "div",
                  { class: "memories button" },
                  [z("i", null, "MEMORIES 记忆")],
                  -1,
                ),
              ]),
            512,
          )
        )
      );
    },
  },
  Xn = {
    0: {
      0: {
        sentences: [
          {
            id: 0,
            effects: [{ blackBlock: "linear", duration: 1e3, reserve: !1 }],
            text: "...一年前，在KKC，我有幸结识这么一个传奇人物",
          },
          { id: 1, text: "它技术高端，打遍kk无敌手，刀法娴熟堪比一线厨师" },
          { id: 2, text: "它就是abcpqrklm3" },
          {
            id: 3,
            effects: [{ blackBlock: "easeOut", duration: 500, reserve: !0 }],
            text: "虽然这么说，但这个千刀杀的真不是个人",
          },
          { id: 4, text: "我都懒得举例" },
          {
            id: 5,
            text: 'aaaaaaaaaaaaaaaaaaaaaaaaa<a style="color: red">aaaaa</a><i><a style="color:blue">aaaaaa</a></i>',
          },
        ],
      },
    },
  },
  ef = {
    __name: "Gaming",
    setup(e) {
      const t = un(),
        { indexInf: n } = Go(t),
        s = ue(null);
      let r = ue(0),
        o = ue(!1),
        i = null,
        l = 0,
        c = "",
        h = !1,
        a = 50;
      const d = ue(null),
        g = ue(null),
        m = he(() => n.value.chapter),
        E = he(() => n.value.section);
      he(() => n.value.sentence);
      const x = he(
        () => Xn[n.value.chapter][n.value.section].sentences[r.value]?.text,
      );
      function N() {
        (h || (h = !0), o.value && (r.value += 1));
      }
      function L() {
        x.value &&
          (i = setInterval(() => {
            ((c += x.value[l]),
              (s.value.innerHTML = c),
              (l += 1),
              h && ((l = x.value.length), (s.value.innerHTML = x.value)),
              l >= x.value.length && ((o.value = !0), clearInterval(i)));
          }, a));
      }
      function A(I, j, Y, q) {
        return new Promise((K) => {
          let U = 0,
            ee = 0;
          const fe = { white: d.value, black: g.value }[I],
            ae = { easeOut: ii, easeIn: Qu, linear: Xu }[j],
            pe = setInterval(() => {
              ((ee = U / Y),
                ee >= 1 &&
                  ((fe.style.opacity = q ? 1 - ae(1) : ae(1)),
                  clearInterval(pe),
                  K()),
                (fe.style.opacity = q ? 1 - ae(ee) : ae(ee)),
                (U += 16));
            }, 16);
        });
      }
      async function F() {
        const I = Xn[m.value][E.value].sentences[r.value]?.effects;
        if (I)
          for (let j = 0; j < I.length; j++) {
            const Y = I[j];
            (console.log(Y),
              "blackBlock" in Y
                ? await A("black", Y.blackBlock, Y.duration, Y.reserve)
                : "whiteBlock" in Y &&
                  (await A("white", Y.whiteBlock, Y.duration, Y.reserve)));
          }
      }
      return (
        At(
          () => [n.value, r.value],
          async () => {
            (console.log("进度变化！"),
              console.log(n.value),
              (g.value.style.color = "white"),
              (g.value.innerText = `${JSON.stringify(Xn[n.value.chapter][n.value.section].sentences[r.value])}`),
              (o.value = !1),
              (c = ""),
              (l = 0),
              (i = null),
              (h = !1),
              (a = 50),
              await F(),
              L());
          },
          { deep: !0 },
        ),
        (I, j) => (
          Re(),
          Ve(
            Ue,
            null,
            [
              ie(t).paused ? (Re(), wn(Zu, { key: 0 })) : Ze("", !0),
              z(
                "div",
                {
                  class: "gaming-block-black",
                  ref_key: "gamingBlockBlack",
                  ref: g,
                },
                null,
                512,
              ),
              z(
                "div",
                {
                  class: "gaming-block-white",
                  ref_key: "gamingBlockWhite",
                  ref: d,
                },
                null,
                512,
              ),
              j[0] || (j[0] = z("div", { class: "gaming-chapter" }, null, -1)),
              z("div", { class: "gaming-dialog fadeIn", onClick: N }, [
                z("p", { class: "text", ref_key: "text", ref: s }, null, 512),
              ]),
              j[1] ||
                (j[1] = z(
                  "div",
                  { class: "gaming-roleLeft fadeIn" },
                  null,
                  -1,
                )),
              j[2] ||
                (j[2] = z(
                  "div",
                  { class: "gaming-roleCenter fadeIn" },
                  null,
                  -1,
                )),
              j[3] ||
                (j[3] = z(
                  "div",
                  { class: "gaming-roleRight fadeIn" },
                  null,
                  -1,
                )),
              j[4] ||
                (j[4] = z("div", { class: "gaming-bg fadeIn" }, null, -1)),
            ],
            64,
          )
        )
      );
    },
  },
  tf = Yu({ history: Su(), routes: [{ path: "/", component: ef }] }),
  li = "/abc-I-Love-you/assets/abc_normal-DjEgIj3k.jpg",
  ci = "/abc-I-Love-you/assets/ciciyou-CCGZ8NiX.jpg",
  ui = "/abc-I-Love-you/assets/pystary-DJ_Cwvml.jpg",
  fi = "/abc-I-Love-you/assets/VE1GR-CLgIcln5.jpg",
  ai = "/abc-I-Love-you/assets/welcome-B0ECWkmr.wav",
  di = "/abc-I-Love-you/assets/bg-Crseo-vH.jpg";
async function nf() {
  return (
    console.log("预加载..."),
    [li, ci, ui, fi, di].forEach((t) => {
      new Image().src = t;
    }),
    new Promise((t) => {
      const s = [ai].map(
        (r) =>
          new Promise((o) => {
            const i = new Audio(r);
            ((i.preload = "auto"),
              (i.oncanplaythrough = () => {
                ((i.volume = 0), i.play(), (i.oncanplaythrough = null), o(!0));
              }));
          }),
      );
      Promise.all(s).then(() => {
        (console.log("资源预加载完毕"), t(!0));
      });
    })
  );
}
function gs() {
  return {
    abc: li,
    ciciyou: ci,
    pystary: ui,
    VE1GR: fi,
    welcome: ai,
    bg: di,
    preload: nf,
  };
}
function sf(e) {
  return {
    all: (e = e || new Map()),
    on: function (t, n) {
      var s = e.get(t);
      s ? s.push(n) : e.set(t, [n]);
    },
    off: function (t, n) {
      var s = e.get(t);
      s && (n ? s.splice(s.indexOf(n) >>> 0, 1) : e.set(t, []));
    },
    emit: function (t, n) {
      var s = e.get(t);
      (s &&
        s.slice().map(function (r) {
          r(n);
        }),
        (s = e.get("*")) &&
          s.slice().map(function (r) {
            r(t, n);
          }));
    },
  };
}
const Rn = sf();
function rf() {
  const e = un(),
    { indexInf: t } = Go(e);
  (Rn.on("newGame", n), Rn.on("continue", s));
  function n() {
    (e.reload(),
      setTimeout(() => {
        ((e.indexInf.sentence = 1),
          (e.indexInf.chapter = 0),
          (e.indexInf.section = 0),
          e.warn("左键对话框继续"));
      }, 1e3));
  }
  function s() {
    t.value.chapter == 0 &&
      t.value.section == 0 &&
      t.value.sentence == 0 &&
      e.warn("没有可用的进度！");
  }
}
const of = (e, t) => {
    const n = e.__vccOpts || e;
    for (const [s, r] of t) n[s] = r;
    return n;
  },
  lf = { key: 0, class: "welcome-options fadeIn" },
  cf = { key: 1, class: "welcomeRoles welcome-abc fadeIn" },
  uf = ["src"],
  ff = { key: 2, class: "welcomeRoles welcome-pystary fadeIn" },
  af = ["src"],
  df = { key: 3, class: "welcomeRoles welcome-ciciyou fadeIn" },
  hf = ["src"],
  pf = { key: 4, class: "welcomeRoles welcome-VE1GR fadeIn" },
  gf = ["src"],
  mf = { key: 5, class: "bg fadeIn" },
  vf = ["src"],
  _f = {
    __name: "Welcome",
    setup(e) {
      const t = un(),
        n = gs();
      let s = ue(!1),
        r = ue(!1),
        o = ue(!1),
        i = ue(!1),
        l = ue(!1),
        c = ue(!1),
        h = new Audio(gs().welcome);
      function a() {
        const E = document.createElement("div");
        E.classList.add("continueGameShowing");
        const x = `Chapter - ${t.indexInf.chapter} - ${t.indexInf.section} - ${t.indexInf.sentence}`,
          N = document.createElement("div");
        (N.classList.add("continueGameShowingChapter"),
          (N.innerText = x),
          E.appendChild(N),
          document.body.appendChild(E));
      }
      function d(E) {
        const x = document.querySelector(".continueGameShowing");
        if (x) {
          const N = E.pageX,
            L = E.pageY;
          ((x.style.left = `${N}px`), (x.style.top = `${L + 40}px`));
        }
      }
      function g() {
        const E = document.querySelector(".continueGameShowing");
        E && E.remove();
      }
      function m() {
        const E = document.querySelector("main");
        let x = 100;
        const N = setInterval(() => {
          ((x -= 0.1),
            (E.style.background = `linear-gradient(to top, hsl(280, 100%, ${x}%), transparent 20%)`),
            x <= 90 && clearInterval(N));
        }, 5);
      }
      return (
        Ln(() => {
          window.onclick = () => {
            (setTimeout(m, 1400),
              setTimeout(() => (c.value = !0), 1400),
              setTimeout(() => (s.value = !0), 1400),
              setTimeout(() => h.play(), 0),
              setTimeout(() => (r.value = !0), 100),
              setTimeout(() => (i.value = !0), 800),
              setTimeout(() => (o.value = !0), 700),
              setTimeout(() => (l.value = !0), 900),
              (window.onclick = null));
          };
        }),
        (E, x) => (
          Re(),
          Ve("main", null, [
            ie(s)
              ? (Re(),
                Ve("div", lf, [
                  z(
                    "li",
                    {
                      onClick: x[0] || (x[0] = (N) => ie(Rn).emit("continue")),
                    },
                    [
                      z(
                        "i",
                        {
                          onMouseenter: a,
                          onMouseout: g,
                          onMousemove: d,
                          class: "continue",
                        },
                        x[2] ||
                          (x[2] = [
                            Qe("CONTINUE ", -1),
                            z("br", null, null, -1),
                            Qe("- ", -1),
                          ]),
                        32,
                      ),
                    ],
                  ),
                  z(
                    "li",
                    { onClick: x[1] || (x[1] = (N) => ie(Rn).emit("newGame")) },
                    x[3] ||
                      (x[3] = [
                        z(
                          "i",
                          { class: "newgame" },
                          [Qe("NEWGAME "), z("br"), Qe("- ")],
                          -1,
                        ),
                      ]),
                  ),
                  x[4] ||
                    (x[4] = z(
                      "li",
                      null,
                      [
                        z("i", { class: "memories" }, [
                          Qe("MEMORIES "),
                          z("br"),
                          Qe("- "),
                        ]),
                      ],
                      -1,
                    )),
                  x[5] ||
                    (x[5] = z(
                      "li",
                      null,
                      [
                        z("i", { class: "about" }, [
                          Qe("ABOUT "),
                          z("br"),
                          Qe("- "),
                        ]),
                      ],
                      -1,
                    )),
                ]))
              : Ze("", !0),
            ie(r)
              ? (Re(),
                Ve("div", cf, [
                  z(
                    "img",
                    { src: ie(n).abc, alt: " 这是abc, 变白板了", class: "img" },
                    null,
                    8,
                    uf,
                  ),
                ]))
              : Ze("", !0),
            ie(o)
              ? (Re(),
                Ve("div", ff, [
                  z(
                    "img",
                    {
                      src: ie(n).pystary,
                      alt: "这是pystary, 变白板了",
                      class: "img",
                    },
                    null,
                    8,
                    af,
                  ),
                ]))
              : Ze("", !0),
            ie(i)
              ? (Re(),
                Ve("div", df, [
                  z(
                    "img",
                    {
                      src: ie(n).ciciyou,
                      alt: "这是ciciyou, 变白板了",
                      class: "img",
                    },
                    null,
                    8,
                    hf,
                  ),
                ]))
              : Ze("", !0),
            ie(l)
              ? (Re(),
                Ve("div", pf, [
                  z(
                    "img",
                    {
                      src: ie(n).VE1GR,
                      alt: "这是VE1GR, 变白板了",
                      class: "img",
                    },
                    null,
                    8,
                    gf,
                  ),
                ]))
              : Ze("", !0),
            ie(c)
              ? (Re(),
                Ve("div", mf, [
                  z(
                    "img",
                    { src: ie(n).bg, alt: "这是背景, 变白板了", class: "img" },
                    null,
                    8,
                    vf,
                  ),
                ]))
              : Ze("", !0),
          ])
        )
      );
    },
  },
  yf = of(_f, [["__scopeId", "data-v-f8e43f54"]]),
  bf = {
    __name: "App",
    setup(e) {
      const t = un();
      let n = ue(!1);
      return (
        Ln(() => {
          ((document.title = "wait..."),
            gs()
              .preload()
              .then(() => {
                ((document.title = "abc I love you"), rf(), (n.value = !0));
              }));
        }),
        (s, r) => {
          const o = El("router-view");
          return (
            Re(),
            Ve("main", null, [
              ie(t).gaming && ie(n) ? (Re(), wn(o, { key: 0 })) : Ze("", !0),
              !ie(t).gaming && ie(n) ? (Re(), wn(yf, { key: 1 })) : Ze("", !0),
            ])
          );
        }
      );
    },
  },
  xf = Dc(),
  Ds = kc(bf);
Ds.use(tf);
Ds.use(xf);
Ds.mount("#app");
