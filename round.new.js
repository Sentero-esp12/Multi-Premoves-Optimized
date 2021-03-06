var LichessRound = function(e) {
    "use strict";
    const t = {
        createElement: function(e, t) {
            return document.createElement(e, t)
        },
        createElementNS: function(e, t, o) {
            return document.createElementNS(e, t, o)
        },
        createTextNode: function(e) {
            return document.createTextNode(e)
        },
        createComment: function(e) {
            return document.createComment(e)
        },
        insertBefore: function(e, t, o) {
            e.insertBefore(t, o)
        },
        removeChild: function(e, t) {
            e.removeChild(t)
        },
        appendChild: function(e, t) {
            e.appendChild(t)
        },
        parentNode: function(e) {
            return e.parentNode
        },
        nextSibling: function(e) {
            return e.nextSibling
        },
        tagName: function(e) {
            return e.tagName
        },
        setTextContent: function(e, t) {
            e.textContent = t
        },
        getTextContent: function(e) {
            return e.textContent
        },
        isElement: function(e) {
            return 1 === e.nodeType
        },
        isText: function(e) {
            return 3 === e.nodeType
        },
        isComment: function(e) {
            return 8 === e.nodeType
        }
    };
    function o(e, t, o, n, s) {
        return {
            sel: e,
            data: t,
            children: o,
            text: n,
            elm: s,
            key: void 0 === t ? void 0 : t.key
        }
    }
    const n = Array.isArray;
    function s(e) {
        return "string" == typeof e || "number" == typeof e
    }
    function r(e) {
        return void 0 === e
    }
    function i(e) {
        return void 0 !== e
    }
    const a = o("", {}, [], void 0, void 0);
    function c(e, t) {
        var o, n;
        const s = e.key === t.key
          , r = (null === (o = e.data) || void 0 === o ? void 0 : o.is) === (null === (n = t.data) || void 0 === n ? void 0 : n.is);
        return e.sel === t.sel && s && r
    }
    function l(e, t, o) {
        var n;
        const s = {};
        for (let r = t; r <= o; ++r) {
            const t = null === (n = e[r]) || void 0 === n ? void 0 : n.key;
            void 0 !== t && (s[t] = r)
        }
        return s
    }
    const d = ["create", "update", "remove", "destroy", "pre", "post"];
    function u(e, u) {
        let h, p;
        const m = {
            create: [],
            update: [],
            remove: [],
            destroy: [],
            pre: [],
            post: []
        }
          , f = void 0 !== u ? u : t;
        for (h = 0; h < d.length; ++h)
            for (m[d[h]] = [],
            p = 0; p < e.length; ++p) {
                const t = e[p][d[h]];
                void 0 !== t && m[d[h]].push(t)
            }
        function g(e) {
            const t = e.id ? "#" + e.id : ""
              , n = e.className ? "." + e.className.split(" ").join(".") : "";
            return o(f.tagName(e).toLowerCase() + t + n, {}, [], void 0, e)
        }
        function v(e, t) {
            return function() {
                if (0 == --t) {
                    const t = f.parentNode(e);
                    f.removeChild(t, e)
                }
            }
        }
        function b(e, t) {
            var o, c;
            let l, d = e.data;
            if (void 0 !== d) {
                const t = null === (o = d.hook) || void 0 === o ? void 0 : o.init;
                i(t) && (t(e),
                d = e.data)
            }
            const u = e.children
              , h = e.sel;
            if ("!" === h)
                r(e.text) && (e.text = ""),
                e.elm = f.createComment(e.text);
            else if (void 0 !== h) {
                const o = h.indexOf("#")
                  , r = h.indexOf(".", o)
                  , p = o > 0 ? o : h.length
                  , g = r > 0 ? r : h.length
                  , v = -1 !== o || -1 !== r ? h.slice(0, Math.min(p, g)) : h
                  , w = e.elm = i(d) && i(l = d.ns) ? f.createElementNS(l, v, d) : f.createElement(v, d);
                for (p < g && w.setAttribute("id", h.slice(p + 1, g)),
                r > 0 && w.setAttribute("class", h.slice(g + 1).replace(/\./g, " ")),
                l = 0; l < m.create.length; ++l)
                    m.create[l](a, e);
                if (n(u))
                    for (l = 0; l < u.length; ++l) {
                        const e = u[l];
                        null != e && f.appendChild(w, b(e, t))
                    }
                else
                    s(e.text) && f.appendChild(w, f.createTextNode(e.text));
                const k = e.data.hook;
                i(k) && (null === (c = k.create) || void 0 === c || c.call(k, a, e),
                k.insert && t.push(e))
            } else
                e.elm = f.createTextNode(e.text);
            return e.elm
        }
        function w(e, t, o, n, s, r) {
            for (; n <= s; ++n) {
                const s = o[n];
                null != s && f.insertBefore(e, b(s, r), t)
            }
        }
        function k(e) {
            var t, o;
            const n = e.data;
            if (void 0 !== n) {
                null === (o = null === (t = null == n ? void 0 : n.hook) || void 0 === t ? void 0 : t.destroy) || void 0 === o || o.call(t, e);
                for (let t = 0; t < m.destroy.length; ++t)
                    m.destroy[t](e);
                if (void 0 !== e.children)
                    for (let t = 0; t < e.children.length; ++t) {
                        const o = e.children[t];
                        null != o && "string" != typeof o && k(o)
                    }
            }
        }
        function y(e, t, o, n) {
            for (var s, r; o <= n; ++o) {
                let n, a;
                const c = t[o];
                if (null != c)
                    if (i(c.sel)) {
                        k(c),
                        n = m.remove.length + 1,
                        a = v(c.elm, n);
                        for (let t = 0; t < m.remove.length; ++t)
                            m.remove[t](c, a);
                        const e = null === (r = null === (s = null == c ? void 0 : c.data) || void 0 === s ? void 0 : s.hook) || void 0 === r ? void 0 : r.remove;
                        i(e) ? e(c, a) : a()
                    } else
                        f.removeChild(e, c.elm)
            }
        }
        function C(e, t, o) {
            var n, s, a, d, u;
            const h = null === (n = t.data) || void 0 === n ? void 0 : n.hook;
            null === (s = null == h ? void 0 : h.prepatch) || void 0 === s || s.call(h, e, t);
            const p = t.elm = e.elm
              , g = e.children
              , v = t.children;
            if (e !== t) {
                if (void 0 !== t.data) {
                    for (let o = 0; o < m.update.length; ++o)
                        m.update[o](e, t);
                    null === (d = null === (a = t.data.hook) || void 0 === a ? void 0 : a.update) || void 0 === d || d.call(a, e, t)
                }
                r(t.text) ? i(g) && i(v) ? g !== v && function(e, t, o, n) {
                    let s, i, a, d, u = 0, h = 0, p = t.length - 1, m = t[0], g = t[p], v = o.length - 1, k = o[0], T = o[v];
                    for (; u <= p && h <= v; )
                        null == m ? m = t[++u] : null == g ? g = t[--p] : null == k ? k = o[++h] : null == T ? T = o[--v] : c(m, k) ? (C(m, k, n),
                        m = t[++u],
                        k = o[++h]) : c(g, T) ? (C(g, T, n),
                        g = t[--p],
                        T = o[--v]) : c(m, T) ? (C(m, T, n),
                        f.insertBefore(e, m.elm, f.nextSibling(g.elm)),
                        m = t[++u],
                        T = o[--v]) : c(g, k) ? (C(g, k, n),
                        f.insertBefore(e, g.elm, m.elm),
                        g = t[--p],
                        k = o[++h]) : (void 0 === s && (s = l(t, u, p)),
                        i = s[k.key],
                        r(i) ? f.insertBefore(e, b(k, n), m.elm) : (a = t[i],
                        a.sel !== k.sel ? f.insertBefore(e, b(k, n), m.elm) : (C(a, k, n),
                        t[i] = void 0,
                        f.insertBefore(e, a.elm, m.elm))),
                        k = o[++h]);
                    (u <= p || h <= v) && (u > p ? (d = null == o[v + 1] ? null : o[v + 1].elm,
                    w(e, d, o, h, v, n)) : y(e, t, u, p))
                }(p, g, v, o) : i(v) ? (i(e.text) && f.setTextContent(p, ""),
                w(p, null, v, 0, v.length - 1, o)) : i(g) ? y(p, g, 0, g.length - 1) : i(e.text) && f.setTextContent(p, "") : e.text !== t.text && (i(g) && y(p, g, 0, g.length - 1),
                f.setTextContent(p, t.text)),
                null === (u = null == h ? void 0 : h.postpatch) || void 0 === u || u.call(h, e, t)
            }
        }
        return function(e, t) {
            let o, n, s;
            const r = [];
            for (o = 0; o < m.pre.length; ++o)
                m.pre[o]();
            for (function(e) {
                return void 0 !== e.sel
            }(e) || (e = g(e)),
            c(e, t) ? C(e, t, r) : (n = e.elm,
            s = f.parentNode(n),
            b(t, r),
            null !== s && (f.insertBefore(s, t.elm, f.nextSibling(n)),
            y(s, [e], 0, 0))),
            o = 0; o < r.length; ++o)
                r[o].data.hook.insert(r[o]);
            for (o = 0; o < m.post.length; ++o)
                m.post[o]();
            return t
        }
    }
    function h(e, t, o) {
        if (e.ns = "http://www.w3.org/2000/svg",
        "foreignObject" !== o && void 0 !== t)
            for (let n = 0; n < t.length; ++n) {
                const e = t[n].data;
                void 0 !== e && h(e, t[n].children, t[n].sel)
            }
    }
    function p(e, t, r) {
        let i, a, c, l = {};
        if (void 0 !== r ? (null !== t && (l = t),
        n(r) ? i = r : s(r) ? a = r : r && r.sel && (i = [r])) : null != t && (n(t) ? i = t : s(t) ? a = t : t && t.sel ? i = [t] : l = t),
        void 0 !== i)
            for (c = 0; c < i.length; ++c)
                s(i[c]) && (i[c] = o(void 0, void 0, void 0, i[c], void 0));
        return "s" !== e[0] || "v" !== e[1] || "g" !== e[2] || 3 !== e.length && "." !== e[3] && "#" !== e[3] || h(l, i, e),
        o(e, l, i, a, void 0)
    }
    function m(e, t) {
        e.data.fn = t.data.fn,
        e.data.args = t.data.args,
        t.data = e.data,
        t.children = e.children,
        t.text = e.text,
        t.elm = e.elm
    }
    function f(e) {
        const t = e.data;
        m(t.fn(...t.args), e)
    }
    function g(e, t) {
        let o;
        const n = e.data
          , s = t.data
          , r = n.args
          , i = s.args;
        if (n.fn === s.fn && r.length === i.length) {
            for (o = 0; o < i.length; ++o)
                if (r[o] !== i[o])
                    return void m(s.fn(...i), t);
            m(e, t)
        } else
            m(s.fn(...i), t)
    }
    function v(e, t) {
        let o;
        const n = t.elm;
        let s = e.data.attrs
          , r = t.data.attrs;
        if ((s || r) && s !== r) {
            for (o in s = s || {},
            r = r || {},
            r) {
                const e = r[o];
                s[o] !== e && (!0 === e ? n.setAttribute(o, "") : !1 === e ? n.removeAttribute(o) : 120 !== o.charCodeAt(0) ? n.setAttribute(o, e) : 58 === o.charCodeAt(3) ? n.setAttributeNS("http://www.w3.org/XML/1998/namespace", o, e) : 58 === o.charCodeAt(5) ? n.setAttributeNS("http://www.w3.org/1999/xlink", o, e) : n.setAttribute(o, e))
            }
            for (o in s)
                o in r || n.removeAttribute(o)
        }
    }
    const b = {
        create: v,
        update: v
    };
    function w(e, t) {
        let o, n;
        const s = t.elm;
        let r = e.data.class
          , i = t.data.class;
        if ((r || i) && r !== i) {
            for (n in r = r || {},
            i = i || {},
            r)
                r[n] && !Object.prototype.hasOwnProperty.call(i, n) && s.classList.remove(n);
            for (n in i)
                o = i[n],
                o !== r[n] && s.classList[o ? "add" : "remove"](n)
        }
    }
    const k = {
        create: w,
        update: w
    }
      , y = e=>void 0 !== e
      , C = e=>{
        let t = e;
        return function(e) {
            return y(e) && (t = e),
            t
        }
    }
      , T = {
        Accept: "application/vnd.lichess.v5+json"
    }
      , M = {
        cache: "no-cache",
        credentials: "same-origin"
    }
      , x = {
        "X-Requested-With": "XMLHttpRequest"
    };
    function S(e) {
        if (e.ok)
            return e;
        if (429 == e.status)
            throw new Error("Too many requests");
        throw new Error(`Error ${e.status}`)
    }
    const P = (e,t={})=>fetch(e, Object.assign(Object.assign(Object.assign({}, M), {
        headers: Object.assign(Object.assign({}, T), x)
    }), t)).then((e=>S(e).json()))
      , L = (e,t={})=>D(e, t).then((e=>S(e).text()))
      , D = (e,t={})=>fetch(e, Object.assign(Object.assign(Object.assign({}, M), {
        headers: Object.assign({}, x)
    }), t))
      , E = e=>{
        const t = new FormData;
        for (const o of Object.keys(e))
            t.append(o, e[o]);
        return t
    }
      , O = ["white", "black"]
      , A = ["a", "b", "c", "d", "e", "f", "g", "h"]
      , N = ["1", "2", "3", "4", "5", "6", "7", "8"]
      , I = [...N].reverse()
      , j = Array.prototype.concat(...A.map((e=>N.map((t=>e + t)))))
      , B = e=>j[8 * e[0] + e[1]]
      , R = e=>[e.charCodeAt(0) - 97, e.charCodeAt(1) - 49]
      , _ = j.map(R);
    const z = ()=>{
        let e;
        return {
            start() {
                e = performance.now()
            },
            cancel() {
                e = void 0
            },
            stop() {
                if (!e)
                    return 0;
                const t = performance.now() - e;
                return e = void 0,
                t
            }
        }
    }
      , q = e=>"white" === e ? "black" : "white"
      , F = (e,t)=>{
        const o = e[0] - t[0]
          , n = e[1] - t[1];
        return o * o + n * n
    }
      , G = (e,t)=>e.role === t.role && e.color === t.color
      , H = e=>(t,o)=>[(o ? t[0] : 7 - t[0]) * e.width / 8, (o ? 7 - t[1] : t[1]) * e.height / 8]
      , K = (e,t)=>{
        e.style.transform = `translate(${t[0]}px,${t[1]}px)`
    }
      , W = (e,t)=>{
        e.style.visibility = t ? "visible" : "hidden"
    }
      , U = e=>{
        var t;
        return e.clientX || 0 === e.clientX ? [e.clientX, e.clientY] : (null === (t = e.targetTouches) || void 0 === t ? void 0 : t[0]) ? [e.targetTouches[0].clientX, e.targetTouches[0].clientY] : void 0
    }
      , V = e=>2 === e.buttons || 2 === e.button
      , Y = (e,t)=>{
        const o = document.createElement(e);
        return t && (o.className = t),
        o
    }
    ;
    function X(e, t, o) {
        const n = R(e);
        return t || (n[0] = 7 - n[0],
        n[1] = 7 - n[1]),
        [o.left + o.width * n[0] / 8 + o.width / 16, o.top + o.height * (7 - n[1]) / 8 + o.height / 16]
    }
    const J = {
        pawn: 1,
        knight: 3,
        bishop: 3,
        rook: 5,
        queen: 9,
        king: 0
    }
      , Z = e=>({
        attrs: {
            "data-icon": e
        }
    })
      , Q = e=>{
        if (e)
            return "@" === e[1] ? [e.slice(2, 4)] : [e.slice(0, 2), e.slice(2, 4)]
    }
      , ee = e=>({
        insert(t) {
            e(t.elm)
        }
    })
      , te = (e,t,o,n=!0)=>ee((s=>{
        s.addEventListener(e, (e=>{
            t(e),
            o && o()
        }
        ), {
            passive: n
        })
    }
    ));
    function oe(e) {
        const t = new Map;
        if (!e)
            return t;
        if ("string" == typeof e)
            for (const o of e.split(" "))
                t.set(o.slice(0, 2), o.slice(2).match(/.{2}/g));
        else
            for (const o in e)
                t.set(o, e[o].match(/.{2}/g));
        return t
    }
    const ne = {
        white: 0,
        black: 0
    };
    function se(e, t, o) {
        const n = e.length > 13 ? e.substring(0, 13) + "…" : e
          , s = o ? p("line.line.patron", {
            attrs: {
                title: "Lichess Patron"
            }
        }) : void 0;
        return p("a", {
            class: {
                "user-link": !0,
                ulpt: !0
            },
            attrs: {
                href: "/@/" + e
            }
        }, t && "BOT" != t ? [s, p("span.utitle", t), n] : [s, n])
    }
    function re(e, t) {
        return {
            insert(o) {
                o.elm.addEventListener(e, t)
            }
        }
    }
    const ie = {
        start: ["hi/Hello", "gl/Good luck", "hf/Have fun!", "u2/You too!"].map(ae),
        end: ["gg/Good game", "wp/Well played", "ty/Thank you", "gtg/I've got to go", "bye/Bye!"].map(ae)
    };
    function ae(e) {
        const t = e.split("/");
        return {
            key: t[0],
            text: t[1]
        }
    }
    const ce = e=>L(le(e))
      , le = e=>`/${e}/note`;
    function de(e, t, o=!1) {
        let n, s = 0;
        return function(...r) {
            const i = this;
            n && clearTimeout(n),
            n = void 0;
            const a = performance.now() - s;
            s = performance.now(),
            o && a > t ? e.apply(i, r) : n = setTimeout((()=>{
                n = void 0,
                e.apply(i, r)
            }
            ), t)
        }
    }
    function ue(e) {
        let t = e.text;
        const o = de((()=>{
            ((e,t)=>{
                P(le(e), {
                    method: "post",
                    body: E({
                        text: t
                    })
                })
            }
            )(e.id, t || "")
        }
        ), 1e3);
        return {
            id: e.id,
            trans: e.trans,
            text: ()=>t,
            fetch() {
                ce(e.id).then((o=>{
                    t = o || "",
                    e.redraw()
                }
                ))
            },
            post(e) {
                t = e,
                o()
            }
        }
    }
    function he(e) {
        const t = e.text();
        return null == t ? p("div.loading", {
            hook: {
                insert: e.fetch
            }
        }) : p("textarea", {
            attrs: {
                placeholder: e.trans("typePrivateNotesHere")
            },
            hook: {
                insert(o) {
                    const n = $(o.elm);
                    n.val(t).on("change keyup paste", (()=>e.post(n.val())))
                }
            }
        })
    }
    let pe = !1;
    function me(e) {
        let t, o = !1;
        const n = ()=>{
            t = void 0,
            o = !1,
            e.redraw()
        }
        ;
        return {
            loading: ()=>o,
            data: ()=>t,
            reasons: e.reasons,
            permissions: ()=>e.permissions,
            open: n=>{
                const s = n.querySelector("a.user-link")
                  , r = n.querySelector("t").innerText
                  , i = s.href.split("/")[4];
                e.permissions.timeout ? (o = !0,
                (e=>P("/mod/chat-user/" + e))(i).then((n=>{
                    t = Object.assign(Object.assign({}, n), {
                        text: r
                    }),
                    o = !1,
                    e.redraw()
                }
                ))) : t = {
                    id: i.toLowerCase(),
                    username: i,
                    text: r
                },
                e.redraw()
            }
            ,
            close: n,
            timeout(o, s) {
                t && lichess.pubsub.emit("socket.send", "timeout", {
                    userId: t.id,
                    reason: o.key,
                    text: s
                }),
                n(),
                e.redraw()
            }
        }
    }
    const fe = ()=>p("i.mod", {
        attrs: {
            "data-icon": ""
        }
    });
    function ge(e, t) {
        const o = e.data;
        o.domVersion = 1;
        const n = {
            instance: void 0,
            loaded: !1,
            enabled: C(!!o.palantir)
        }
          , s = ["discussion"];
        e.noteId && s.push("note"),
        e.plugin && s.push(e.plugin.tab.key);
        const r = lichess.storage.make("chat.tab")
          , i = r.get();
        let a;
        const c = {
            tab: s.find((e=>e === i)) || s[0],
            enabled: e.alwaysEnabled || !lichess.storage.get("nochat"),
            placeholderKey: "talkInChat",
            loading: !1,
            timeout: e.timeout,
            writeable: e.writeable
        };
        s.length > 1 && "discussion" === c.tab && lichess.storage.get("nochat") && (c.tab = s[1]);
        const l = e=>!!(e = e.trim()) && (!("You too!" == e && !o.lines.some((e=>e.u != o.userId))) && (e.length > 140 ? (alert("Max length: 140 chars. " + e.length + " chars used."),
        !1) : (lichess.pubsub.emit("socket.send", "talk", e),
        !0)))
          , d = lichess.trans(e.i18n);
        function u() {
            (e.permissions.timeout || e.permissions.local) && (a = me({
                reasons: e.timeoutReasons || [{
                    key: "other",
                    name: "Inappropriate behavior"
                }],
                permissions: e.permissions,
                redraw: t
            }),
            e.loadCss("chat.mod"))
        }
        u();
        const h = e.noteId ? ue({
            id: e.noteId,
            text: e.noteText,
            trans: d,
            redraw: t
        }) : void 0
          , p = function(e) {
            let t = e.initialGroup
              , o = [];
            return {
                group: ()=>t,
                said: ()=>o,
                setGroup(n) {
                    n !== t && (t = n,
                    n || (o = []),
                    e.redraw())
                },
                post(n) {
                    t && ie[t] && (o.includes(n.key) || e.post(n.text) && o.push(n.key))
                }
            }
        }({
            initialGroup: e.preset,
            post: l,
            redraw: t
        })
          , m = [["socket.in.message", e=>{
            o.lines.push(e);
            const n = o.lines.length;
            n > 200 && (o.lines.splice(0, n - 200 + 50),
            o.domVersion++),
            t()
        }
        ], ["socket.in.chat_timeout", e=>{
            let n = !1;
            o.lines.forEach((t=>{
                t.u && t.u.toLowerCase() == e && (t.d = !0,
                n = !0)
            }
            )),
            e == o.userId && (c.timeout = n = !0),
            n && (o.domVersion++,
            t())
        }
        ], ["socket.in.chat_reinstate", e=>{
            e == o.userId && (c.timeout = !1,
            t())
        }
        ], ["chat.writeable", e=>{
            c.writeable = e,
            t()
        }
        ], ["chat.permissions", o=>{
            let n;
            for (n in o)
                e.permissions[n] = o[n];
            u(),
            t()
        }
        ], ["palantir.toggle", n.enabled]];
        m.forEach((([e,t])=>lichess.pubsub.on(e, t)));
        const f = ()=>lichess.pubsub.emit("chat.enabled", c.enabled);
        return f(),
        {
            data: o,
            opts: e,
            vm: c,
            allTabs: s,
            setTab(e) {
                c.tab = e,
                r.set(e),
                "discussion" === e && lichess.requestIdleCallback((()=>$(".mchat__say").each((function() {
                    this.focus()
                }
                ))), 500),
                t()
            },
            moderation: ()=>a,
            note: h,
            preset: p,
            post: l,
            trans: d,
            plugin: e.plugin,
            setEnabled(e) {
                c.enabled = e,
                f(),
                e ? lichess.storage.remove("nochat") : lichess.storage.set("nochat", "1"),
                t()
            },
            redraw: t,
            palantir: n,
            destroy: ()=>{
                m.forEach((([e,t])=>lichess.pubsub.off(e, t)))
            }
        }
    }
    const ve = /(^|[^\w@#/])@([a-z0-9][a-z0-9_-]{0,28}[a-z0-9])/gi;
    function be(e, t, o) {
        return e.includes("&quot;") ? e : `<a target="_blank" rel="noopener nofollow noreferrer" href="${e.startsWith("/") || e.includes("://") ? e : "//" + e}"${o ? ` class="${o}"` : ""}>${t || e}</a>`
    }
    const we = /\b\b(?:https?:\/\/)?(lichess\.org\/[-–—\w+&'@#\/%?=()~|!:,.;]+[\w+&@#\/%=~|])/gi
      , ke = /^[a-h][2-7]$/
      , ye = /\b(\d+)\s*(\.+)\s*(?:[o0-]+[o0]|[NBRQKP\u2654\u2655\u2656\u2657\u2658\u2659]?[a-h]?[1-8]?[x@]?[a-z][1-8](?:=[NBRQK\u2654\u2655\u2656\u2657\u2658\u2659])?)\+?#?[!\?=]{0,5}/gi;
    function Ce(e, t, o) {
        if (t < 1 || t > 200)
            return e;
        return '<a class="jump" data-ply="' + (2 * t - (o.length > 1 ? 0 : 1)) + '">' + e + "</a>"
    }
    function Te(e, t, o) {
        return o.match(ke) ? e : function(e, t, o) {
            return t + be("/@/" + o, "@" + o)
        }(0, t, o)
    }
    function Me(e, t) {
        const o = lichess.escapeHtml(e)
          , n = o.replace(ve, Te).replace(we, be);
        return t && n === o ? n.replace(ye, Ce) : n
    }
    const xe = ()=>"1" == lichess.storage.get("chat-spam")
      , Se = new RegExp(["xcamweb.com", "(^|[^i])chess-bot", "chess-cheat", "coolteenbitch", "letcafa.webcam", "tinyurl.com/", "wooga.info/", "bit.ly/", "wbt.link/", "eb.by/", "001.rs/", "shr.name/", "u.to/", ".3-a.net", ".ssl443.org", ".ns02.us", ".myftp.info", ".flinkup.com", ".serveusers.com", "badoogirls.com", "hide.su", "wyon.de", "sexdatingcz.club", "qps.ru", "tiny.cc/"].map((e=>e.replace(/\./g, "\\.").replace(/\//g, "\\/"))).join("|"))
      , Pe = e=>!!e.match(Se)
      , Le = /follow me|join my team/i
      , De = e=>!!e.match(Le)
      , Ee = /lichess\.org\/team\//i
      , Oe = /^\/[wW](?:hisper)?\s/;
    function Ae(e) {
        if (!e.vm.enabled)
            return [];
        const t = t=>{
            const o = t.elm;
            if (e.data.lines.length > 5) {
                (0 === o.scrollTop || o.scrollTop > o.scrollHeight - o.clientHeight - 100) && (o.scrollTop = 999999,
                setTimeout((e=>o.scrollTop = 999999), 300))
            }
        }
          , o = !!e.moderation()
          , n = [p("ol.mchat__messages.chat-v-" + e.data.domVersion, {
            attrs: {
                role: "log",
                "aria-live": "polite",
                "aria-atomic": "false"
            },
            hook: {
                insert(n) {
                    const s = $(n.elm).on("click", "a.jump", (e=>{
                        lichess.pubsub.emit("jump", e.target.getAttribute("data-ply"))
                    }
                    ));
                    o ? s.on("click", ".mod", (t=>{
                        var o;
                        return null === (o = e.moderation()) || void 0 === o ? void 0 : o.open(t.target.parentNode)
                    }
                    )) : s.on("click", ".flag", (t=>function(e, t) {
                        const o = t.querySelector("a.user-link")
                          , n = t.querySelector("t").innerText;
                        o && confirm(`Report "${n}" to moderators?`) && ((e,t,o)=>{
                            P("/report/flag", {
                                method: "post",
                                body: E({
                                    username: t,
                                    resource: e,
                                    text: o
                                })
                            })
                        }
                        )(e.data.resourceId, o.href.split("/")[4], n)
                    }(e, t.target.parentNode))),
                    t(n)
                },
                postpatch: (e,o)=>t(o)
            }
        }, je(e).map((t=>function(e, t) {
            const o = function(e, t) {
                if (o = e,
                /(\n|(@|#|\.)\w{2,})/.test(o)) {
                    const o = function(e) {
                        return (t,o)=>{
                            o.data.lichessChat !== t.data.lichessChat && (o.elm.innerHTML = Me(o.data.lichessChat, e))
                        }
                    }(t);
                    return p("t", {
                        lichessChat: e,
                        hook: {
                            create: o,
                            update: o
                        }
                    })
                }
                var o;
                return p("t", e)
            }(t.t, e.opts.parseMoves);
            if ("lichess" === t.u)
                return p("li.system", o);
            if (t.c)
                return p("li", [p("span.color", "[" + t.c + "]"), o]);
            const n = (s = "a",
            r = t.u,
            i = se,
            a = [t.u, t.title, t.p],
            void 0 === a && (a = i,
            i = r,
            r = void 0),
            p(s, {
                key: r,
                hook: {
                    init: f,
                    prepatch: g
                },
                fn: i,
                args: a
            }));
            var s, r, i, a;
            return p("li", {
                class: {
                    me: t.u === e.data.userId,
                    host: t.u === e.data.hostId
                }
            }, e.moderation() ? [t.u ? fe() : null, n, " ", o] : [e.data.userId && t.u && e.data.userId != t.u ? p("i.flag", {
                attrs: {
                    "data-icon": "",
                    title: "Report"
                }
            }) : null, n, " ", o])
        }(e, t)))), $e(e)]
          , s = function(e) {
            const t = e.group();
            if (!t)
                return;
            const o = ie[t]
              , n = e.said();
            return o && n.length < 2 ? p("div.mchat__presets", o.map((t=>{
                const o = n.includes(t.key);
                return p("span", {
                    class: {
                        disabled: o
                    },
                    attrs: {
                        title: t.text,
                        disabled: o
                    },
                    hook: re("click", (()=>{
                        !o && e.post(t)
                    }
                    ))
                }, t.key)
            }
            ))) : void 0
        }(e.preset);
        return s && n.push(s),
        n
    }
    function $e(e) {
        if (!e.vm.writeable)
            return;
        if (e.data.loginRequired && !e.data.userId || e.data.restricted)
            return p("input.mchat__say", {
                attrs: {
                    placeholder: e.trans("loginToChat"),
                    disabled: !0
                }
            });
        let t;
        return t = e.vm.timeout ? e.trans("youHaveBeenTimedOut") : e.opts.blind ? "Chat" : e.trans.noarg(e.vm.placeholderKey),
        p("input.mchat__say", {
            attrs: {
                placeholder: t,
                autocomplete: "off",
                maxlength: 140,
                disabled: e.vm.timeout || !e.vm.writeable,
                "aria-label": "Chat input"
            },
            hook: {
                insert(t) {
                    Ie(e, t.elm)
                }
            }
        })
    }
    let Ne;
    const Ie = (e,t)=>{
        const o = lichess.tempStorage.make("chat.input")
          , n = o.get();
        n && (t.value = n,
        t.focus(),
        !e.opts.public && n.match(Oe) && t.classList.add("whisper")),
        t.addEventListener("keydown", (t=>{
            "Enter" === t.key && setTimeout((()=>{
                const n = t.target
                  , s = n.value
                  , r = e.opts.public;
                "" === s ? $(".keyboard-move input").each((function() {
                    this.focus()
                }
                )) : (e.opts.kobold || (e=>{
                    if (xe())
                        return;
                    const t = Pe(e);
                    t && L(`/jslog/${window.location.href.substr(-12)}?n=spam`, {
                        method: "post"
                    }),
                    (t || De(e)) && lichess.storage.set("chat-spam", "1")
                }
                )(s),
                r && (e=>!!e.match(Ee))(s) ? alert("Please don't advertise teams in the chat.") : e.post(s),
                n.value = "",
                o.remove(),
                r || n.classList.remove("whisper"))
            }
            ))
        }
        )),
        t.addEventListener("input", (t=>setTimeout((()=>{
            const n = t.target
              , s = n.value;
            n.removeAttribute("placeholder"),
            e.opts.public || n.classList.toggle("whisper", !!s.match(Oe)),
            o.set(s)
        }
        )))),
        window.Mousetrap.bind("c", (()=>t.focus()));
        const s = ["touchstart", "mousedown"];
        Ne && s.forEach((e=>document.body.removeEventListener(e, Ne, {
            capture: !0
        }))),
        Ne = e=>{
            e.shiftKey || 2 === e.buttons || 2 === e.button || t.blur()
        }
        ,
        t.onfocus = ()=>s.forEach((e=>document.body.addEventListener(e, Ne, {
            passive: !0,
            capture: !0
        }))),
        t.onblur = ()=>s.forEach((e=>document.body.removeEventListener(e, Ne, {
            capture: !0
        })))
    }
    ;
    function je(e) {
        const t = [];
        let o;
        return e.data.lines.forEach((n=>{
            var s, r, i;
            n.d || o && (i = n,
            (r = o).d && i.d && r.u === i.u) || n.r && (n.u || "").toLowerCase() != e.data.userId || (s = n.t,
            (Pe(s) || De(s)) && !xe()) || t.push(n),
            o = n
        }
        )),
        t
    }
    function Be(e) {
        const t = e.moderation();
        return p("section.mchat" + (e.opts.alwaysEnabled ? "" : ".mchat-optional"), {
            class: {
                "mchat-mod": !!t
            },
            hook: {
                destroy: e.destroy
            }
        }, function(e) {
            if (!e)
                return;
            if (e.loading())
                return [p("div.loading")];
            const t = e.data();
            if (!t)
                return;
            const o = e.permissions()
              , n = t.history ? p("div.infos.block", [(s = t.games || 0,
            !1 === pe && (pe = window.Intl && Intl.NumberFormat ? new Intl.NumberFormat : null),
            (null === pe ? "" + s : pe.format(s)) + " games"), t.tos ? "TOS" : void 0].map((e=>e && p("span", e))).concat([p("a", {
                attrs: {
                    href: "/@/" + t.username + "?mod"
                }
            }, "profile")]).concat(o.shadowban ? [p("a", {
                attrs: {
                    href: "/mod/" + t.username + "/communication"
                }
            }, "coms")] : [])) : void 0;
            var s;
            const r = o.timeout ? p("div.timeout.block", [p("strong", "Timeout 15 minutes for"), ...e.reasons.map((o=>p("a.text", {
                attrs: {
                    "data-icon": ""
                },
                hook: re("click", (()=>e.timeout(o, t.text)))
            }, o.name)))]) : p("div.timeout.block", [p("strong", "Moderation"), p("a.text", {
                attrs: {
                    "data-icon": ""
                },
                hook: re("click", (()=>e.timeout(e.reasons[0], t.text)))
            }, "Timeout 15 minutes")])
              , i = t.history ? p("div.history.block", [p("strong", "Timeout history"), p("table", p("tbody.slist", {
                hook: {
                    insert() {
                        lichess.contentLoaded()
                    }
                }
            }, t.history.map((function(e) {
                return p("tr", [p("td.reason", e.reason), p("td.mod", e.mod), p("td", p("time.timeago", {
                    attrs: {
                        datetime: e.date
                    }
                }))])
            }
            ))))]) : void 0;
            return [p("div.top", {
                key: "mod-" + t.id
            }, [p("span.text", {
                attrs: {
                    "data-icon": ""
                }
            }, [se(t.username)]), p("a", {
                attrs: {
                    "data-icon": ""
                },
                hook: re("click", e.close)
            })]), p("div.mchat__content.moderation", [p("i.line-text.block", ['"', t.text, '"']), n, r, i])]
        }(t) || function(e) {
            const t = e.vm.tab;
            return [p("div.mchat__tabs.nb_" + e.allTabs.length, [...e.allTabs.map((o=>function(e, t, o) {
                return p("div.mchat__tab." + t, {
                    class: {
                        "mchat__tab-active": t === o
                    },
                    hook: re("click", (()=>e.setTab(t)))
                }, function(e, t) {
                    return "discussion" === t ? [p("span", e.data.name), e.opts.alwaysEnabled ? void 0 : p("input", {
                        attrs: {
                            type: "checkbox",
                            title: e.trans.noarg("toggleTheChat"),
                            checked: e.vm.enabled
                        },
                        hook: re("change", (t=>{
                            e.setEnabled(t.target.checked)
                        }
                        ))
                    })] : "note" === t ? [p("span", e.trans.noarg("notes"))] : e.plugin && t === e.plugin.tab.key ? [p("span", e.plugin.tab.name)] : []
                }(e, t))
            }(e, o, t))), Re(e)]), p("div.mchat__content." + t, "note" === t && e.note ? [he(e.note)] : e.plugin && t === e.plugin.tab.key ? [e.plugin.view()] : Ae(e))]
        }(e))
    }
    function Re(e) {
        const t = e.palantir;
        if (t.enabled())
            return t.instance ? t.instance.render(p) : p("div.mchat__tab.palantir.palantir-slot", {
                attrs: {
                    "data-icon": "",
                    title: "Voice chat"
                },
                hook: re("click", (()=>{
                    t.loaded || (t.loaded = !0,
                    lichess.loadScript("javascripts/vendor/peerjs.min.js").then((()=>{
                        lichess.loadModule("palantir").then((()=>{
                            t.instance = window.Palantir.palantir({
                                uid: e.data.userId,
                                redraw: e.redraw
                            }),
                            e.redraw()
                        }
                        ))
                    }
                    )))
                }
                ))
            })
    }
    const _e = (()=>{
        const e = "mousemove";
        let t = !1
          , o = []
          , n = 0;
        function s(e) {
            var t;
            o.push({
                b: 0 != e.buttons,
                x: e.clientX,
                y: e.clientY
            }),
            o.length > 4 && (o.shift(),
            !(t = o)[0].b && t[1].b && t[2].b && !t[3].b && r(t[0], t[1]) > 900 && 0 === r(t[1], t[2]) && 0 === r(t[2], t[3]) && n++)
        }
        function r(e, t) {
            return Math.pow(t.x - e.x, 2) + Math.pow(t.y - e.y, 2)
        }
        return {
            start() {
                t || (t = !1,
                document.addEventListener(e, s))
            },
            stop() {
                t && (t = !1,
                document.removeEventListener(e, s))
            },
            hits: ()=>n
        }
    }
    )();
    let ze = []
      , qe = !1
      , Fe = {
        holdAcc: 0
    }
      , Ge = !1;
    const He = (e,t)=>fetch("/jslog/" + e.game.id + e.player.id + "?n=" + t, {
        method: "post"
    })
      , Ke = e=>$(atob(e)).length
      , We = ()=>$("u8t").first().append("<j>")
      , Ue = 10 + Math.round(11 * Math.random());
    function Ve(e, t) {
        !function(e, t) {
            if (t.premove && e.ply > 1 && (Ge = !0),
            Ge || !t.holdTime || e.ply > 30)
                return void _e.stop();
            if (ze.push(t.holdTime),
            ze.length <= 6)
                return;
            let o, n = !1;
            ze.shift();
            const s = ze.reduce(((e,t)=>e + t)) / 6;
            s > 2 && s < 140 && (o = ze.map((e=>Math.pow(e - s, 2))).reduce(((e,t)=>e + t)) / 5,
            n = o < 256);
            (n || qe) && $(".manipulable .cg-board").toggleClass("bh1", n && _e.hits() > 2),
            n ? (Fe.hold || (Fe.holdAcc++,
            Fe.holdAcc > 5 && (e.socket.send("hold", {
                mean: Math.round(s),
                sd: Math.round(Math.sqrt(o))
            }),
            Fe.hold = !0)),
            _e.start(),
            _e.hits() > 2 && !Fe.ick && (e.socket.send("bye2"),
            He(e.data, "ick2"),
            Fe.ick = !0)) : Fe.holdAcc = 0,
            qe = n
        }(e, t),
        e.ply <= Ue + 2 && e.ply > Ue && ((Ke("TWVudUFwcGVuZA==") || Ke("LmNnLWJvYXJkIGNhbnZhcw==")) && He(e.data, "mcb"),
        Ke("I2NoZXNzX2J0bl9jb250YWluZXI") && He(e.data, "cma0"),
        Ke("bGFiZWwgPiBpbnB1dFt2YWx1ZT0id2hpdGUiXQ==") && He(e.data, "cma1"),
        Ke("bGFiZWw+c3Bhbi5jaC1jaGVja21hcms=") && setTimeout((()=>He(e.data, "cma2")), 2e4),
        Ke("YVtocmVmPSJodHRwOi8vdGhhcGF3bmd1bi5saXZlIl0=") && He(e.data, "lga"),
        (Ke("I2F1dGhCYXI=") || Ke("I21vdmVfc3VnZ2VzdF9ib3g=")) && He(e.data, "los")),
        6 != e.ply && 7 != e.ply || We()
    }
    function Ye(e) {
        setTimeout((()=>{
            Object.keys(window.WebSocket).length || He(e.data, "ih1"),
            e.ply >= 6 && We()
        }
        ), 1e3)
    }
    const Xe = e=>e.steps[0].ply
      , Je = e=>Ze(e).ply
      , Ze = e=>e.steps[e.steps.length - 1]
      , Qe = (e,t)=>e.steps[t - Xe(e)]
      , et = e=>{
        e.clock && (e.clock.showTenths = e.pref.clockTenths,
        e.clock.showBar = e.pref.clockBar),
        e.correspondence && (e.correspondence.showBar = e.pref.clockBar),
        ["horde", "crazyhouse"].includes(e.game.variant.key) && (e.pref.showCaptured = !1),
        e.expiration && (e.expiration.movedAt = Date.now() - e.expiration.idleMillis)
    }
      , tt = 20
      , ot = 25
      , nt = 30;
    function st(e) {
        return e.game.status.id >= nt
    }
    function rt(e) {
        return e.game.status.id === ot
    }
    function it(e) {
        return function(e) {
            return e.game.status.id >= tt
        }(e) && !st(e) && !rt(e)
    }
    const at = e=>e.game.status.id < ot && !ft(e)
      , ct = e=>at(e) && !e.player.spectator
      , lt = e=>ct(e) && e.game.player == e.player.color
      , dt = e=>e.game.turns - (e.game.startedAtTurn || 0)
      , ut = e=>dt(e) > 1
      , ht = e=>at(e) && !ut(e) && !(e=>!!e.tournament || !!e.simul || !!e.swiss)(e)
      , pt = e=>at(e) && e.takebackable && ut(e) && !e.player.proposingTakeback && !e.opponent.proposingTakeback
      , mt = e=>at(e) && !ht(e)
      , ft = e=>"import" === e.game.source;
    function gt(e, t) {
        return e.player.color === t ? e.player : e.opponent.color === t ? e.opponent : null
    }
    const vt = e=>!(!e.player.ai && !e.opponent.ai)
      , bt = (e,t,o)=>{
        const n = gt(e, t);
        o = o || !!n.ai,
        n.onGame = o,
        o && wt(e, t, !1)
    }
      , wt = (e,t,o)=>{
        const n = gt(e, t);
        n.gone = !n.ai && o,
        !1 === n.gone && n.user && (n.user.online = !0)
    }
    ;
    function kt(e, t) {
        return Math.abs(e - t)
    }
    const yt = (e,t,o,n)=>{
        const s = kt(e, o)
          , r = kt(t, n);
        return 1 === s && 2 === r || 2 === s && 1 === r
    }
      , Ct = (e,t,o,n)=>kt(e, o) === kt(t, n)
      , Tt = (e,t,o,n)=>e === o || t === n
      , Mt = (e,t,o,n)=>Ct(e, t, o, n) || Tt(e, t, o, n);
    function xt(e, t, o) {
        const n = e.get(t);
        if (!n)
            return [];
        const s = R(t)
          , r = n.role
          , i = "pawn" === r ? (a = n.color,
        (e,t,o,n)=>kt(e, o) < 2 && ("white" === a ? n === t + 1 || t <= 1 && n === t + 2 && e === o : n === t - 1 || t >= 6 && n === t - 2 && e === o)) : "knight" === r ? yt : "bishop" === r ? Ct : "rook" === r ? Tt : "queen" === r ? Mt : function(e, t, o) {
            return (n,s,r,i)=>kt(n, r) < 2 && kt(s, i) < 2 || o && s === i && s === ("white" === e ? 0 : 7) && (4 === n && (2 === r && t.includes(0) || 6 === r && t.includes(7)) || t.includes(r))
        }(n.color, function(e, t) {
            const o = "white" === t ? "1" : "8"
              , n = [];
            for (const [s,r] of e)
                s[1] === o && r.color === t && "rook" === r.role && n.push(R(s)[0]);
            return n
        }(e, n.color), o);
        var a;
        return _.filter((e=>(s[0] !== e[0] || s[1] !== e[1]) && i(s[0], s[1], e[0], e[1]))).map(B)
    }
    function St(e, ...t) {
        e && setTimeout((()=>e(...t)), 1)
    }
    function Pt(e) {
        e.premovable.current && (e.premovable.current = void 0,
        St(e.premovable.events.unset))
    }
    function Lt(e) {
        const t = e.predroppable;
        t.current && (t.current = void 0,
        St(t.events.unset))
    }
    function Dt(e, t, o) {
        const n = e.pieces.get(t)
          , s = e.pieces.get(o);
        if (t === o || !n)
            return !1;
        const r = s && s.color !== n.color ? s : void 0;
        return o === e.selected && jt(e),
        St(e.events.move, t, o, r),
        function(e, t, o) {
            if (!e.autoCastle)
                return !1;
            const n = e.pieces.get(t);
            if (!n || "king" !== n.role)
                return !1;
            const s = R(t)
              , r = R(o);
            if (0 !== s[1] && 7 !== s[1] || s[1] !== r[1])
                return !1;
            4 !== s[0] || e.pieces.has(o) || (6 === r[0] ? o = B([7, r[1]]) : 2 === r[0] && (o = B([0, r[1]])));
            const i = e.pieces.get(o);
            return !(!i || i.color !== n.color || "rook" !== i.role || (e.pieces.delete(t),
            e.pieces.delete(o),
            s[0] < r[0] ? (e.pieces.set(B([6, r[1]]), n),
            e.pieces.set(B([5, r[1]]), i)) : (e.pieces.set(B([2, r[1]]), n),
            e.pieces.set(B([3, r[1]]), i)),
            0))
        }(e, t, o) || (e.pieces.set(o, n),
        e.pieces.delete(t)),
        e.lastMove = [t, o],
        e.check = void 0,
        St(e.events.change),
        r || !0
    }
    function Et(e, t, o, n) {
        if (e.pieces.has(o)) {
            if (!n)
                return !1;
            e.pieces.delete(o)
        }
        return St(e.events.dropNewPiece, t, o),
        e.pieces.set(o, t),
        e.lastMove = [o],
        e.check = void 0,
        St(e.events.change),
        e.movable.dests = void 0,
        e.turnColor = q(e.turnColor),
        !0
    }
    function Ot(e, t, o) {
        const n = Dt(e, t, o);
        return n && (e.movable.dests = void 0,
        e.turnColor = q(e.turnColor),
        e.animation.current = void 0),
        n
    }
    function At(e, t, o) {
        if (Rt(e, t, o)) {
            const n = Ot(e, t, o);
            if (n) {
                const s = e.hold.stop();
                jt(e);
                const r = {
                    premove: !1,
                    ctrlKey: e.stats.ctrlKey,
                    holdTime: s
                };
                return !0 !== n && (r.captured = n),
                St(e.movable.events.after, t, o, r),
                !0
            }
        } else if (function(e, t, o) {
            return t !== o && _t(e, t) && xt(e.pieces, t, e.premovable.castle).includes(o)
        }(e, t, o))
            return function(e, t, o, n) {
                Lt(e),
                e.premovable.current = [t, o],
                St(e.premovable.events.set, t, o, n)
            }(e, t, o, {
                ctrlKey: e.stats.ctrlKey
            }),
            jt(e),
            !0;
        return jt(e),
        !1
    }
    function $t(e, t, o, n) {
        const s = e.pieces.get(t);
        s && (function(e, t, o) {
            const n = e.pieces.get(t);
            return !(!n || t !== o && e.pieces.has(o) || "both" !== e.movable.color && (e.movable.color !== n.color || e.turnColor !== n.color))
        }(e, t, o) || n) ? (e.pieces.delete(t),
        Et(e, s, o, n),
        St(e.movable.events.afterNewPiece, s.role, o, {
            premove: !1,
            predrop: !1
        })) : s && function(e, t, o) {
            const n = e.pieces.get(t)
              , s = e.pieces.get(o);
            return !!n && (!s || s.color !== e.movable.color) && e.predroppable.enabled && ("pawn" !== n.role || "1" !== o[1] && "8" !== o[1]) && e.movable.color === n.color && e.turnColor !== n.color
        }(e, t, o) ? function(e, t, o) {
            Pt(e),
            e.predroppable.current = {
                role: t,
                key: o
            },
            St(e.predroppable.events.set, t, o)
        }(e, s.role, o) : (Pt(e),
        Lt(e)),
        e.pieces.delete(t),
        jt(e)
    }
    function Nt(e, t, o) {
        if (St(e.events.select, t),
        e.selected) {
            if (e.selected === t && !e.draggable.enabled)
                return jt(e),
                void e.hold.cancel();
            if ((e.selectable.enabled || o) && e.selected !== t && At(e, e.selected, t))
                return void (e.stats.dragged = !1)
        }
        (Bt(e, t) || _t(e, t)) && (It(e, t),
        e.hold.start())
    }
    function It(e, t) {
        e.selected = t,
        _t(e, t) ? e.premovable.dests = xt(e.pieces, t, e.premovable.castle) : e.premovable.dests = void 0
    }
    function jt(e) {
        e.selected = void 0,
        e.premovable.dests = void 0,
        e.hold.cancel()
    }
    function Bt(e, t) {
        const o = e.pieces.get(t);
        return !!o && ("both" === e.movable.color || e.movable.color === o.color && e.turnColor === o.color)
    }
    function Rt(e, t, o) {
        var n, s;
        return t !== o && Bt(e, t) && (e.movable.free || !!(null === (s = null === (n = e.movable.dests) || void 0 === n ? void 0 : n.get(t)) || void 0 === s ? void 0 : s.includes(o)))
    }
    function _t(e, t) {
        const o = e.pieces.get(t);
        return !!o && e.premovable.enabled && e.movable.color === o.color && e.turnColor !== o.color
    }
    function zt(e) {
        const t = e.premovable.current;
        if (!t)
            return !1;
        const o = t[0]
          , n = t[1];
        let s = !1;
        if (Rt(e, o, n)) {
            const t = Ot(e, o, n);
            if (t) {
                const r = {
                    premove: !0
                };
                !0 !== t && (r.captured = t),
                St(e.movable.events.after, o, n, r),
                s = !0
            }
        }
        return Pt(e),
        s
    }
    function qt(e) {
        Pt(e),
        Lt(e),
        jt(e)
    }
    function Ft(e) {
        e.movable.color = e.movable.dests = e.animation.current = void 0,
        qt(e)
    }
    function Gt(e, t, o) {
        let n = Math.floor(8 * (e[0] - o.left) / o.width);
        t || (n = 7 - n);
        let s = 7 - Math.floor(8 * (e[1] - o.top) / o.height);
        return t || (s = 7 - s),
        n >= 0 && n < 8 && s >= 0 && s < 8 ? B([n, s]) : void 0
    }
    function Ht(e) {
        return "white" === e.orientation
    }
    const Kt = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR"
      , Wt = {
        p: "pawn",
        r: "rook",
        n: "knight",
        b: "bishop",
        q: "queen",
        k: "king"
    }
      , Ut = {
        pawn: "p",
        rook: "r",
        knight: "n",
        bishop: "b",
        queen: "q",
        king: "k"
    };
    function Vt(e) {
        "start" === e && (e = Kt);
        const t = new Map;
        let o = 7
          , n = 0;
        for (const s of e)
            switch (s) {
            case " ":
                return t;
            case "/":
                if (--o,
                o < 0)
                    return t;
                n = 0;
                break;
            case "~":
                {
                    const e = t.get(B([n, o]));
                    e && (e.promoted = !0);
                    break
                }
            default:
                {
                    const e = s.charCodeAt(0);
                    if (e < 57)
                        n += e - 48;
                    else {
                        const e = s.toLowerCase();
                        t.set(B([n, o]), {
                            role: Wt[e],
                            color: s === e ? "black" : "white"
                        }),
                        ++n
                    }
                }
            }
        return t
    }
    function Yt(e, t) {
        var o, n;
        if ((null === (o = t.movable) || void 0 === o ? void 0 : o.dests) && (e.movable.dests = void 0),
        (null === (n = t.drawable) || void 0 === n ? void 0 : n.autoShapes) && (e.drawable.autoShapes = []),
        Xt(e, t),
        t.fen && (e.pieces = Vt(t.fen),
        e.drawable.shapes = []),
        "check"in t && function(e, t) {
            if (e.check = void 0,
            !0 === t && (t = e.turnColor),
            t)
                for (const [o,n] of e.pieces)
                    "king" === n.role && n.color === t && (e.check = o)
        }(e, t.check || !1),
        "lastMove"in t && !t.lastMove ? e.lastMove = void 0 : t.lastMove && (e.lastMove = t.lastMove),
        e.selected && It(e, e.selected),
        (!e.animation.duration || e.animation.duration < 100) && (e.animation.enabled = !1),
        !e.movable.rookCastle && e.movable.dests) {
            const t = "white" === e.movable.color ? "1" : "8"
              , o = "e" + t
              , n = e.movable.dests.get(o)
              , s = e.pieces.get(o);
            if (!n || !s || "king" !== s.role)
                return;
            e.movable.dests.set(o, n.filter((e=>!(e === "a" + t && n.includes("c" + t) || e === "h" + t && n.includes("g" + t)))))
        }
    }
    function Xt(e, t) {
        for (const o in t)
            Jt(e[o]) && Jt(t[o]) ? Xt(e[o], t[o]) : e[o] = t[o]
    }
    function Jt(e) {
        return "object" == typeof e
    }
    function Zt(e, t) {
        return t.animation.enabled ? function(e, t) {
            const o = new Map(t.pieces)
              , n = e(t)
              , s = function(e, t) {
                const o = new Map
                  , n = []
                  , s = new Map
                  , r = []
                  , i = []
                  , a = new Map;
                let c, l, d;
                for (const [u,h] of e)
                    a.set(u, eo(u, h));
                for (const u of j)
                    c = t.pieces.get(u),
                    l = a.get(u),
                    c ? l ? G(c, l.piece) || (r.push(l),
                    i.push(eo(u, c))) : i.push(eo(u, c)) : l && r.push(l);
                for (const u of i)
                    l = to(u, r.filter((e=>G(u.piece, e.piece)))),
                    l && (d = [l.pos[0] - u.pos[0], l.pos[1] - u.pos[1]],
                    o.set(u.key, d.concat(d)),
                    n.push(l.key));
                for (const u of r)
                    n.includes(u.key) || s.set(u.key, u.piece);
                return {
                    anims: o,
                    fadings: s
                }
            }(o, t);
            if (s.anims.size || s.fadings.size) {
                const e = t.animation.current && t.animation.current.start;
                t.animation.current = {
                    start: performance.now(),
                    frequency: 1 / t.animation.duration,
                    plan: s
                },
                e || oo(t, performance.now())
            } else
                t.dom.redraw();
            return n
        }(e, t) : Qt(e, t)
    }
    function Qt(e, t) {
        const o = e(t);
        return t.dom.redraw(),
        o
    }
    function eo(e, t) {
        return {
            key: e,
            pos: R(e),
            piece: t
        }
    }
    function to(e, t) {
        return t.sort(((t,o)=>F(e.pos, t.pos) - F(e.pos, o.pos)))[0]
    }
    function oo(e, t) {
        const o = e.animation.current;
        if (void 0 === o)
            return void (e.dom.destroyed || e.dom.redrawNow());
        const n = 1 - (t - o.start) * o.frequency;
        if (n <= 0)
            e.animation.current = void 0,
            e.dom.redrawNow();
        else {
            const t = (s = n) < .5 ? 4 * s * s * s : (s - 1) * (2 * s - 2) * (2 * s - 2) + 1;
            for (const e of o.plan.anims.values())
                e[2] = e[0] * t,
                e[3] = e[1] * t;
            e.dom.redrawNow(!0),
            requestAnimationFrame(((t=performance.now())=>oo(e, t)))
        }
        var s
    }
    const no = ["green", "red", "blue", "yellow"];
    function so(e, t) {
        if (t.touches && t.touches.length > 1)
            return;
        t.stopPropagation(),
        t.preventDefault(),
        t.ctrlKey ? jt(e) : qt(e);
        const o = U(t)
          , n = Gt(o, Ht(e), e.dom.bounds());
        n && (e.drawable.current = {
            orig: n,
            pos: o,
            brush: lo(t),
            snapToValidMove: e.drawable.defaultSnapToValidMove
        },
        ro(e))
    }
    function ro(e) {
        requestAnimationFrame((()=>{
            const t = e.drawable.current;
            if (t) {
                const o = Gt(t.pos, Ht(e), e.dom.bounds());
                o || (t.snapToValidMove = !1);
                const n = t.snapToValidMove ? function(e, t, o, n) {
                    const s = R(e)
                      , r = _.filter((e=>Mt(s[0], s[1], e[0], e[1]) || yt(s[0], s[1], e[0], e[1])))
                      , i = r.map((e=>X(B(e), o, n))).map((e=>F(t, e)))
                      , [,a] = i.reduce(((e,t,o)=>e[0] < t ? e : [t, o]), [i[0], 0]);
                    return B(r[a])
                }(t.orig, t.pos, Ht(e), e.dom.bounds()) : o;
                n !== t.mouseSq && (t.mouseSq = n,
                t.dest = n !== t.orig ? n : void 0,
                e.dom.redrawNow()),
                ro(e)
            }
        }
        ))
    }
    function io(e, t) {
        e.drawable.current && (e.drawable.current.pos = U(t))
    }
    function ao(e) {
        const t = e.drawable.current;
        t && (t.mouseSq && function(e, t) {
            const o = e=>e.orig === t.orig && e.dest === t.dest
              , n = e.shapes.find(o);
            n && (e.shapes = e.shapes.filter((e=>!o(e))));
            n && n.brush === t.brush || e.shapes.push(t);
            uo(e)
        }(e.drawable, t),
        co(e))
    }
    function co(e) {
        e.drawable.current && (e.drawable.current = void 0,
        e.dom.redraw())
    }
    function lo(e) {
        var t;
        const o = (e.shiftKey || e.ctrlKey) && V(e)
          , n = e.altKey || e.metaKey || (null === (t = e.getModifierState) || void 0 === t ? void 0 : t.call(e, "AltGraph"));
        return no[(o ? 1 : 0) + (n ? 2 : 0)]
    }
    function uo(e) {
        e.onChange && e.onChange(e.shapes)
    }
    function ho(e, t) {
        if (!t.isTrusted || void 0 !== t.button && 0 !== t.button)
            return;
        if (t.touches && t.touches.length > 1)
            return;
        const o = e.dom.bounds()
          , n = U(t)
          , s = Gt(n, Ht(e), o);
        if (!s)
            return;
        const r = e.pieces.get(s)
          , i = e.selected;
        var a;
        i || !e.drawable.enabled || !e.drawable.eraseOnClick && r && r.color === e.turnColor || (a = e).drawable.shapes.length && (a.drawable.shapes = [],
        a.dom.redraw(),
        uo(a.drawable)),
        !1 === t.cancelable || t.touches && e.movable.color && !r && !i && !function(e, t) {
            const o = Ht(e)
              , n = e.dom.bounds()
              , s = Math.pow(n.width / 8, 2);
            for (const r in e.pieces) {
                const e = X(r, o, n);
                if (F(e, t) <= s)
                    return !0
            }
            return !1
        }(e, n) || t.preventDefault();
        const c = !!e.premovable.current
          , l = !!e.predroppable.current;
        e.stats.ctrlKey = t.ctrlKey,
        e.selected && Rt(e, e.selected, s) ? Zt((e=>Nt(e, s)), e) : Nt(e, s);
        const d = e.selected === s
          , u = wo(e, s);
        if (r && u && d && function(e, t) {
            const o = e.pieces.get(t);
            return !!o && e.draggable.enabled && ("both" === e.movable.color || e.movable.color === o.color && (e.turnColor === o.color || e.premovable.enabled))
        }(e, s)) {
            e.draggable.current = {
                orig: s,
                piece: r,
                origPos: n,
                pos: n,
                started: e.draggable.autoDistance && e.stats.dragged,
                element: u,
                previouslySelected: i,
                originTarget: t.target
            },
            u.cgDragging = !0,
            u.classList.add("dragging");
            const a = e.dom.elements.ghost;
            a && (a.className = `ghost ${r.color} ${r.role}`,
            K(a, H(o)(R(s), Ht(e))),
            W(a, !0)),
            mo(e)
        } else
            c && Pt(e),
            l && Lt(e);
        e.dom.redraw()
    }
    function po(e, t, o, n) {
        const s = "a0";
        e.pieces.set(s, t),
        e.dom.redraw();
        const r = U(o);
        e.draggable.current = {
            orig: s,
            piece: t,
            origPos: r,
            pos: r,
            started: !0,
            element: ()=>wo(e, s),
            originTarget: o.target,
            newPiece: !0,
            force: !!n
        },
        mo(e)
    }
    function mo(e) {
        requestAnimationFrame((()=>{
            var t;
            const o = e.draggable.current;
            if (!o)
                return;
            (null === (t = e.animation.current) || void 0 === t ? void 0 : t.plan.anims.has(o.orig)) && (e.animation.current = void 0);
            const n = e.pieces.get(o.orig);
            if (n && G(n, o.piece)) {
                if (!o.started && F(o.pos, o.origPos) >= Math.pow(e.draggable.distance, 2) && (o.started = !0),
                o.started) {
                    if ("function" == typeof o.element) {
                        const e = o.element();
                        if (!e)
                            return;
                        e.cgDragging = !0,
                        e.classList.add("dragging"),
                        o.element = e
                    }
                    const t = e.dom.bounds();
                    K(o.element, [o.pos[0] - t.left - t.width / 16, o.pos[1] - t.top - t.height / 16])
                }
            } else
                vo(e);
            mo(e)
        }
        ))
    }
    function fo(e, t) {
        e.draggable.current && (!t.touches || t.touches.length < 2) && (e.draggable.current.pos = U(t))
    }
    function go(e, t) {
        const o = e.draggable.current;
        if (!o)
            return;
        if ("touchend" === t.type && !1 !== t.cancelable && t.preventDefault(),
        "touchend" === t.type && o.originTarget !== t.target && !o.newPiece)
            return void (e.draggable.current = void 0);
        Pt(e),
        Lt(e);
        const n = Gt(U(t) || o.pos, Ht(e), e.dom.bounds());
        n && o.started && o.orig !== n ? o.newPiece ? $t(e, o.orig, n, o.force) : (e.stats.ctrlKey = t.ctrlKey,
        At(e, o.orig, n) && (e.stats.dragged = !0)) : o.newPiece ? e.pieces.delete(o.orig) : e.draggable.deleteOnDropOff && !n && (e.pieces.delete(o.orig),
        St(e.events.change)),
        (o.orig !== o.previouslySelected || o.orig !== n && n) && e.selectable.enabled || jt(e),
        bo(e),
        e.draggable.current = void 0,
        e.dom.redraw()
    }
    function vo(e) {
        const t = e.draggable.current;
        t && (t.newPiece && e.pieces.delete(t.orig),
        e.draggable.current = void 0,
        jt(e),
        bo(e),
        e.dom.redraw())
    }
    function bo(e) {
        const t = e.dom.elements;
        t.ghost && W(t.ghost, !1)
    }
    function wo(e, t) {
        let o = e.dom.elements.board.firstChild;
        for (; o; ) {
            if (o.cgKey === t && "PIECE" === o.tagName)
                return o;
            o = o.nextSibling
        }
    }
    function ko(e, t) {
        e.exploding && (t ? e.exploding.stage = t : e.exploding = void 0,
        e.dom.redraw())
    }
    function yo(e, t) {
        function o() {
            !function(e) {
                e.orientation = q(e.orientation),
                e.animation.current = e.draggable.current = e.selected = void 0
            }(e),
            t()
        }
        return {
            set(t) {
                t.orientation && t.orientation !== e.orientation && o(),
                (t.fen ? Zt : Qt)((e=>Yt(e, t)), e)
            },
            state: e,
            getFen: ()=>{
                return t = e.pieces,
                I.map((e=>A.map((o=>{
                    const n = t.get(o + e);
                    if (n) {
                        const e = Ut[n.role];
                        return "white" === n.color ? e.toUpperCase() : e
                    }
                    return "1"
                }
                )).join(""))).join("/").replace(/1{2,}/g, (e=>e.length.toString()));
                var t
            }
            ,
            toggleOrientation: o,
            setPieces(t) {
                Zt((e=>function(e, t) {
                    for (const [o,n] of t)
                        n ? e.pieces.set(o, n) : e.pieces.delete(o)
                }(e, t)), e)
            },
            selectSquare(t, o) {
                t ? Zt((e=>Nt(e, t, o)), e) : e.selected && (jt(e),
                e.dom.redraw())
            },
            move(t, o) {
                Zt((e=>Dt(e, t, o)), e)
            },
            newPiece(t, o) {
                Zt((e=>Et(e, t, o)), e)
            },
            playPremove() {
                if (e.premovable.current) {
                    if (Zt(zt, e))
                        return !0;
                    e.dom.redraw()
                }
                return !1
            },
            playPredrop(t) {
                if (e.predroppable.current) {
                    const o = function(e, t) {
                        const o = e.predroppable.current;
                        let n = !1;
                        if (!o)
                            return !1;
                        t(o) && Et(e, {
                            role: o.role,
                            color: e.movable.color
                        }, o.key) && (St(e.movable.events.afterNewPiece, o.role, o.key, {
                            premove: !1,
                            predrop: !0
                        }),
                        n = !0);
                        return Lt(e),
                        n
                    }(e, t);
                    return e.dom.redraw(),
                    o
                }
                return !1
            },
            cancelPremove() {
                Qt(Pt, e)
            },
            cancelPredrop() {
                Qt(Lt, e)
            },
            cancelMove() {
                Qt((e=>{
                    qt(e),
                    vo(e)
                }
                ), e)
            },
            stop() {
                Qt((e=>{
                    Ft(e),
                    vo(e)
                }
                ), e)
            },
            explode(t) {
                !function(e, t) {
                    e.exploding = {
                        stage: 1,
                        keys: t
                    },
                    e.dom.redraw(),
                    setTimeout((()=>{
                        ko(e, 2),
                        setTimeout((()=>ko(e, void 0)), 120)
                    }
                    ), 120)
                }(e, t)
            },
            setAutoShapes(t) {
                Qt((e=>e.drawable.autoShapes = t), e)
            },
            setShapes(t) {
                Qt((e=>e.drawable.shapes = t), e)
            },
            getKeyAtDomPos: t=>Gt(t, Ht(e), e.dom.bounds()),
            redrawAll: t,
            dragNewPiece(t, o, n) {
                po(e, t, o, n)
            },
            destroy() {
                Ft(e),
                e.dom.unbind && e.dom.unbind(),
                e.dom.destroyed = !0
            }
        }
    }
    function Co(e) {
        return document.createElementNS("http://www.w3.org/2000/svg", e)
    }
    function To(e, t, o) {
        const n = e.drawable
          , s = n.current
          , r = s && s.mouseSq ? s : void 0
          , i = new Map
          , a = e.dom.bounds();
        for (const p of n.shapes.concat(n.autoShapes).concat(r ? [r] : []))
            p.dest && i.set(p.dest, (i.get(p.dest) || 0) + 1);
        const c = n.shapes.concat(n.autoShapes).map((e=>({
            shape: e,
            current: !1,
            hash: xo(e, i, !1, a)
        })));
        r && c.push({
            shape: r,
            current: !0,
            hash: xo(r, i, !0, a)
        });
        const l = c.map((e=>e.hash)).join(";");
        if (l === e.drawable.prevSvgHash)
            return;
        e.drawable.prevSvgHash = l;
        const d = t.querySelector("defs")
          , u = t.querySelector("g")
          , h = o.querySelector("g");
        !function(e, t, o) {
            const n = new Map;
            let s;
            for (const a of t)
                a.shape.dest && (s = e.brushes[a.shape.brush],
                a.shape.modifiers && (s = Ao(s, a.shape.modifiers)),
                n.set(s.key, s));
            const r = new Set;
            let i = o.firstChild;
            for (; i; )
                r.add(i.getAttribute("cgKey")),
                i = i.nextSibling;
            for (const [a,c] of n.entries())
                r.has(a) || o.appendChild(Do(c))
        }(n, c, d),
        Mo(e, c.filter((e=>!e.shape.customSvg)), n.brushes, i, u),
        Mo(e, c.filter((e=>e.shape.customSvg)), n.brushes, i, h)
    }
    function Mo(e, t, o, n, s) {
        const r = e.dom.bounds()
          , i = new Map
          , a = [];
        for (const d of t)
            i.set(d.hash, !1);
        let c, l = s.firstChild;
        for (; l; )
            c = l.getAttribute("cgHash"),
            i.has(c) ? i.set(c, !0) : a.push(l),
            l = l.nextSibling;
        for (const d of a)
            s.removeChild(d);
        for (const d of t)
            i.get(d.hash) || s.appendChild(Lo(e, d, o, n, r))
    }
    function xo({orig: e, dest: t, brush: o, piece: n, modifiers: s, customSvg: r}, i, a, c) {
        return [c.width, c.height, a, e, t, o, t && (i.get(t) || 0) > 1, n && So(n), s && (l = s,
        "" + (l.lineWidth || "")), r && Po(r)].filter((e=>e)).join(",");
        var l
    }
    function So(e) {
        return [e.color, e.role, e.scale].filter((e=>e)).join(",")
    }
    function Po(e) {
        let t = 0;
        for (let o = 0; o < e.length; o++)
            t = (t << 5) - t + e.charCodeAt(o) >>> 0;
        return "custom-" + t.toString()
    }
    function Lo(e, {shape: t, current: o, hash: n}, s, r, i) {
        let a;
        if (t.customSvg) {
            const o = Oo(R(t.orig), e.orientation);
            a = function(e, t, o) {
                const {width: n, height: s} = o
                  , r = n / 8
                  , i = s / 8
                  , a = t[0] * r
                  , c = (7 - t[1]) * i
                  , l = Eo(Co("g"), {
                    transform: `translate(${a},${c})`
                })
                  , d = Eo(Co("svg"), {
                    width: r,
                    height: i,
                    viewBox: "0 0 100 100"
                });
                return l.appendChild(d),
                d.innerHTML = e,
                l
            }(t.customSvg, o, i)
        } else if (t.piece)
            a = function(e, t, o, n) {
                const s = Io(t, n)
                  , r = n.width / 8 * (o.scale || 1)
                  , i = o.color[0] + ("knight" === o.role ? "n" : o.role[0]).toUpperCase();
                return Eo(Co("image"), {
                    className: `${o.role} ${o.color}`,
                    x: s[0] - r / 2,
                    y: s[1] - r / 2,
                    width: r,
                    height: r,
                    href: e + i + ".svg"
                })
            }(e.drawable.pieces.baseUrl, Oo(R(t.orig), e.orientation), t.piece, i);
        else {
            const n = Oo(R(t.orig), e.orientation);
            if (t.dest) {
                let c = s[t.brush];
                t.modifiers && (c = Ao(c, t.modifiers)),
                a = function(e, t, o, n, s, r) {
                    const i = function(e, t) {
                        return (t ? 20 : 10) / 512 * e.width
                    }(r, s && !n)
                      , a = Io(t, r)
                      , c = Io(o, r)
                      , l = c[0] - a[0]
                      , d = c[1] - a[1]
                      , u = Math.atan2(d, l)
                      , h = Math.cos(u) * i
                      , p = Math.sin(u) * i;
                    return Eo(Co("line"), {
                        stroke: e.color,
                        "stroke-width": $o(e, n, r),
                        "stroke-linecap": "round",
                        "marker-end": "url(#arrowhead-" + e.key + ")",
                        opacity: No(e, n),
                        x1: a[0],
                        y1: a[1],
                        x2: c[0] - h,
                        y2: c[1] - p
                    })
                }(c, n, Oo(R(t.dest), e.orientation), o, (r.get(t.dest) || 0) > 1, i)
            } else
                a = function(e, t, o, n) {
                    const s = Io(t, n)
                      , r = function(e) {
                        const t = e.width / 512;
                        return [3 * t, 4 * t]
                    }(n)
                      , i = (n.width + n.height) / 32;
                    return Eo(Co("circle"), {
                        stroke: e.color,
                        "stroke-width": r[o ? 0 : 1],
                        fill: "none",
                        opacity: No(e, o),
                        cx: s[0],
                        cy: s[1],
                        r: i - r[1] / 2
                    })
                }(s[t.brush], n, o, i)
        }
        return a.setAttribute("cgHash", n),
        a
    }
    function Do(e) {
        const t = Eo(Co("marker"), {
            id: "arrowhead-" + e.key,
            orient: "auto",
            markerWidth: 4,
            markerHeight: 8,
            refX: 2.05,
            refY: 2.01
        });
        return t.appendChild(Eo(Co("path"), {
            d: "M0,0 V4 L3,2 Z",
            fill: e.color
        })),
        t.setAttribute("cgKey", e.key),
        t
    }
    function Eo(e, t) {
        for (const o in t)
            e.setAttribute(o, t[o]);
        return e
    }
    function Oo(e, t) {
        return "white" === t ? e : [7 - e[0], 7 - e[1]]
    }
    function Ao(e, t) {
        return {
            color: e.color,
            opacity: Math.round(10 * e.opacity) / 10,
            lineWidth: Math.round(t.lineWidth || e.lineWidth),
            key: [e.key, t.lineWidth].filter((e=>e)).join("")
        }
    }
    function $o(e, t, o) {
        return (e.lineWidth || 10) * (t ? .85 : 1) / 512 * o.width
    }
    function No(e, t) {
        return (e.opacity || 1) * (t ? .9 : 1)
    }
    function Io(e, t) {
        return [(e[0] + .5) * t.width / 8, (7.5 - e[1]) * t.height / 8]
    }
    function jo(e, t) {
        const o = Y("coords", t);
        let n;
        for (const s of e)
            n = Y("coord"),
            n.textContent = s,
            o.appendChild(n);
        return o
    }
    function Bo(e, t) {
        const o = e.dom.elements.board;
        if ("ResizeObserver"in window && new ResizeObserver(t).observe(e.dom.elements.wrap),
        e.viewOnly)
            return;
        const n = function(e) {
            return t=>{
                e.draggable.current ? vo(e) : e.drawable.current ? co(e) : t.shiftKey || V(t) ? e.drawable.enabled && so(e, t) : e.viewOnly || (e.dropmode.active ? function(e, t) {
                    if (!e.dropmode.active)
                        return;
                    Pt(e),
                    Lt(e);
                    const o = e.dropmode.piece;
                    if (o) {
                        e.pieces.set("a0", o);
                        const n = U(t)
                          , s = n && Gt(n, Ht(e), e.dom.bounds());
                        s && $t(e, "a0", s)
                    }
                    e.dom.redraw()
                }(e, t) : ho(e, t))
            }
        }(e);
        o.addEventListener("touchstart", n, {
            passive: !1
        }),
        o.addEventListener("mousedown", n, {
            passive: !1
        }),
        (e.disableContextMenu || e.drawable.enabled) && o.addEventListener("contextmenu", (e=>e.preventDefault()))
    }
    function Ro(e, t, o, n) {
        return e.addEventListener(t, o, n),
        ()=>e.removeEventListener(t, o, n)
    }
    function _o(e, t, o) {
        return n=>{
            e.drawable.current ? e.drawable.enabled && o(e, n) : e.viewOnly || t(e, n)
        }
    }
    function zo(e) {
        const t = Ht(e)
          , o = H(e.dom.bounds())
          , n = e.dom.elements.board
          , s = e.pieces
          , r = e.animation.current
          , i = r ? r.plan.anims : new Map
          , a = r ? r.plan.fadings : new Map
          , c = e.draggable.current
          , l = function(e) {
            var t;
            const o = new Map;
            if (e.lastMove && e.highlight.lastMove)
                for (const r of e.lastMove)
                    Uo(o, r, "last-move");
            e.check && e.highlight.check && Uo(o, e.check, "check");
            if (e.selected && (Uo(o, e.selected, "selected"),
            e.movable.showDests)) {
                const n = null === (t = e.movable.dests) || void 0 === t ? void 0 : t.get(e.selected);
                if (n)
                    for (const t of n)
                        Uo(o, t, "move-dest" + (e.pieces.has(t) ? " oc" : ""));
                const s = e.premovable.dests;
                if (s)
                    for (const t of s)
                        Uo(o, t, "premove-dest" + (e.pieces.has(t) ? " oc" : ""))
            }
            const n = e.premovable.current;
            if (n)
                for (const r of n)
                    Uo(o, r, "current-premove");
            else
                e.predroppable.current && Uo(o, e.predroppable.current.key, "current-premove");
            const s = e.exploding;
            if (s)
                for (const r of s.keys)
                    Uo(o, r, "exploding" + s.stage);
            return o
        }(e)
          , d = new Set
          , u = new Set
          , h = new Map
          , p = new Map;
        let m, f, g, v, b, w, k, y, C, T;
        for (f = n.firstChild; f; ) {
            if (m = f.cgKey,
            Fo(f))
                if (g = s.get(m),
                b = i.get(m),
                w = a.get(m),
                v = f.cgPiece,
                !f.cgDragging || c && c.orig === m || (f.classList.remove("dragging"),
                K(f, o(R(m), t)),
                f.cgDragging = !1),
                !w && f.cgFading && (f.cgFading = !1,
                f.classList.remove("fading")),
                g) {
                    if (b && f.cgAnimating && v === Wo(g)) {
                        const e = R(m);
                        e[0] += b[2],
                        e[1] += b[3],
                        f.classList.add("anim"),
                        K(f, o(e, t))
                    } else
                        f.cgAnimating && (f.cgAnimating = !1,
                        f.classList.remove("anim"),
                        K(f, o(R(m), t)),
                        e.addPieceZIndex && (f.style.zIndex = Ko(R(m), t)));
                    v !== Wo(g) || w && f.cgFading ? w && v === Wo(w) ? (f.classList.add("fading"),
                    f.cgFading = !0) : Vo(h, v, f) : d.add(m)
                } else
                    Vo(h, v, f);
            else if (Go(f)) {
                const e = f.className;
                l.get(m) === e ? u.add(m) : Vo(p, e, f)
            }
            f = f.nextSibling
        }
        for (const [M,x] of l)
            if (!u.has(M)) {
                C = p.get(x),
                T = C && C.pop();
                const e = o(R(M), t);
                if (T)
                    T.cgKey = M,
                    K(T, e);
                else {
                    const t = Y("square", x);
                    t.cgKey = M,
                    K(t, e),
                    n.insertBefore(t, n.firstChild)
                }
            }
        for (const [M,x] of s)
            if (b = i.get(M),
            !d.has(M))
                if (k = h.get(Wo(x)),
                y = k && k.pop(),
                y) {
                    y.cgKey = M,
                    y.cgFading && (y.classList.remove("fading"),
                    y.cgFading = !1);
                    const n = R(M);
                    e.addPieceZIndex && (y.style.zIndex = Ko(n, t)),
                    b && (y.cgAnimating = !0,
                    y.classList.add("anim"),
                    n[0] += b[2],
                    n[1] += b[3]),
                    K(y, o(n, t))
                } else {
                    const s = Wo(x)
                      , r = Y("piece", s)
                      , i = R(M);
                    r.cgPiece = s,
                    r.cgKey = M,
                    b && (r.cgAnimating = !0,
                    i[0] += b[2],
                    i[1] += b[3]),
                    K(r, o(i, t)),
                    e.addPieceZIndex && (r.style.zIndex = Ko(i, t)),
                    n.appendChild(r)
                }
        for (const M of h.values())
            Ho(e, M);
        for (const M of p.values())
            Ho(e, M)
    }
    function qo(e) {
        const t = e.dom.elements.wrap.getBoundingClientRect()
          , o = e.dom.elements.container
          , n = t.height / t.width
          , s = 8 * Math.floor(t.width * window.devicePixelRatio / 8) / window.devicePixelRatio
          , r = s * n;
        o.style.width = s + "px",
        o.style.height = r + "px",
        e.dom.bounds.clear(),
        e.addDimensionsCssVars && (document.documentElement.style.setProperty("--cg-width", s + "px"),
        document.documentElement.style.setProperty("--cg-height", r + "px"))
    }
    function Fo(e) {
        return "PIECE" === e.tagName
    }
    function Go(e) {
        return "SQUARE" === e.tagName
    }
    function Ho(e, t) {
        for (const o of t)
            e.dom.elements.board.removeChild(o)
    }
    function Ko(e, t) {
        let o = 2 + 8 * e[1] + (7 - e[0]);
        return t && (o = 67 - o),
        o + ""
    }
    function Wo(e) {
        return `${e.color} ${e.role}`
    }
    function Uo(e, t, o) {
        const n = e.get(t);
        n ? e.set(t, `${n} ${o}`) : e.set(t, o)
    }
    function Vo(e, t, o) {
        const n = e.get(t);
        n ? n.push(o) : e.set(t, [o])
    }
    function Yo(e, t) {
        const o = {
            pieces: Vt(Kt),
            orientation: "white",
            turnColor: "white",
            coordinates: !0,
            autoCastle: !0,
            viewOnly: !1,
            disableContextMenu: !1,
            addPieceZIndex: !1,
            addDimensionsCssVars: !1,
            pieceKey: !1,
            highlight: {
                lastMove: !0,
                check: !0
            },
            animation: {
                enabled: !0,
                duration: 200
            },
            movable: {
                free: !0,
                color: "both",
                showDests: !0,
                events: {},
                rookCastle: !0
            },
            premovable: {
                enabled: !0,
                showDests: !0,
                castle: !0,
                events: {}
            },
            predroppable: {
                enabled: !1,
                events: {}
            },
            draggable: {
                enabled: !0,
                distance: 3,
                autoDistance: !0,
                showGhost: !0,
                deleteOnDropOff: !1
            },
            dropmode: {
                active: !1
            },
            selectable: {
                enabled: !0
            },
            stats: {
                dragged: !("ontouchstart"in window)
            },
            events: {},
            drawable: {
                enabled: !0,
                visible: !0,
                defaultSnapToValidMove: !0,
                eraseOnClick: !0,
                shapes: [],
                autoShapes: [],
                brushes: {
                    green: {
                        key: "g",
                        color: "#15781B",
                        opacity: 1,
                        lineWidth: 10
                    },
                    red: {
                        key: "r",
                        color: "#882020",
                        opacity: 1,
                        lineWidth: 10
                    },
                    blue: {
                        key: "b",
                        color: "#003088",
                        opacity: 1,
                        lineWidth: 10
                    },
                    yellow: {
                        key: "y",
                        color: "#e68f00",
                        opacity: 1,
                        lineWidth: 10
                    },
                    paleBlue: {
                        key: "pb",
                        color: "#003088",
                        opacity: .4,
                        lineWidth: 15
                    },
                    paleGreen: {
                        key: "pg",
                        color: "#15781B",
                        opacity: .4,
                        lineWidth: 15
                    },
                    paleRed: {
                        key: "pr",
                        color: "#882020",
                        opacity: .4,
                        lineWidth: 15
                    },
                    paleGrey: {
                        key: "pgr",
                        color: "#4a4a4a",
                        opacity: .35,
                        lineWidth: 15
                    }
                },
                pieces: {
                    baseUrl: "https://lichess1.org/assets/piece/cburnett/"
                },
                prevSvgHash: ""
            },
            hold: z()
        };
        function n() {
            const t = "dom"in o ? o.dom.unbind : void 0
              , n = function(e, t) {
                e.innerHTML = "",
                e.classList.add("cg-wrap");
                for (const a of O)
                    e.classList.toggle("orientation-" + a, t.orientation === a);
                e.classList.toggle("manipulable", !t.viewOnly);
                const o = Y("cg-container");
                e.appendChild(o);
                const n = Y("cg-board");
                let s, r, i;
                if (o.appendChild(n),
                t.drawable.visible && (s = Eo(Co("svg"), {
                    class: "cg-shapes"
                }),
                s.appendChild(Co("defs")),
                s.appendChild(Co("g")),
                r = Eo(Co("svg"), {
                    class: "cg-custom-svgs"
                }),
                r.appendChild(Co("g")),
                o.appendChild(s),
                o.appendChild(r)),
                t.coordinates) {
                    const e = "black" === t.orientation ? " black" : "";
                    o.appendChild(jo(N, "ranks" + e)),
                    o.appendChild(jo(A, "files" + e))
                }
                return t.draggable.showGhost && (i = Y("piece", "ghost"),
                W(i, !1),
                o.appendChild(i)),
                {
                    board: n,
                    container: o,
                    wrap: e,
                    ghost: i,
                    svg: s,
                    customSvg: r
                }
            }(e, o)
              , s = function(e) {
                let t;
                const o = ()=>(void 0 === t && (t = e()),
                t);
                return o.clear = ()=>{
                    t = void 0
                }
                ,
                o
            }((()=>n.board.getBoundingClientRect()))
              , r = e=>{
                zo(a),
                !e && n.svg && To(a, n.svg, n.customSvg)
            }
              , i = ()=>{
                qo(a),
                function(e) {
                    const t = Ht(e)
                      , o = H(e.dom.bounds());
                    let n = e.dom.elements.board.firstChild;
                    for (; n; )
                        (Fo(n) && !n.cgAnimating || Go(n)) && K(n, o(R(n.cgKey), t)),
                        n = n.nextSibling
                }(a),
                n.svg && To(a, n.svg, n.customSvg)
            }
              , a = o;
            return a.dom = {
                elements: n,
                bounds: s,
                redraw: Xo(r),
                redrawNow: r,
                unbind: t
            },
            a.drawable.prevSvgHash = "",
            qo(a),
            r(!1),
            Bo(a, i),
            t || (a.dom.unbind = function(e, t) {
                const o = [];
                if ("ResizeObserver"in window || o.push(Ro(document.body, "chessground.resize", t)),
                !e.viewOnly) {
                    const t = _o(e, fo, io)
                      , n = _o(e, go, ao);
                    for (const e of ["touchmove", "mousemove"])
                        o.push(Ro(document, e, t));
                    for (const e of ["touchend", "mouseup"])
                        o.push(Ro(document, e, n));
                    const s = ()=>e.dom.bounds.clear();
                    o.push(Ro(document, "scroll", s, {
                        capture: !0,
                        passive: !0
                    })),
                    o.push(Ro(window, "resize", s, {
                        passive: !0
                    }))
                }
                return ()=>o.forEach((e=>e()))
            }(a, i)),
            a.events.insert && a.events.insert(n),
            a
        }
        return Yt(o, t || {}),
        yo(n(), n)
    }
    function Xo(e) {
        let t = !1;
        return ()=>{
            t || (t = !0,
            requestAnimationFrame((()=>{
                e(),
                t = !1
            }
            )))
        }
    }
    function Jo(e) {
        var t;
        return e.clientX || 0 === e.clientX ? [e.clientX, e.clientY] : (null === (t = e.targetTouches) || void 0 === t ? void 0 : t[0]) ? [e.targetTouches[0].clientX, e.targetTouches[0].clientY] : void 0
    }
    function Zo(e) {
        const t = e.data
          , o = e.makeCgHooks()
          , n = Qe(t, e.ply)
          , s = e.isPlaying();
        return {
            fen: n.fen,
            orientation: en(t, e.flip),
            turnColor: n.ply % 2 == 0 ? "white" : "black",
            lastMove: Q(n.uci),
            check: !!n.check,
            coordinates: 0 !== t.pref.coords,
            addPieceZIndex: e.data.pref.is3d,
            addDimensionsCssVars: !0,
            highlight: {
                lastMove: t.pref.highlight,
                check: t.pref.highlight
            },
            events: {
                move: o.onMove,
                dropNewPiece: o.onNewPiece,
                insert(o) {
                    !function(e, t, o, n) {
                        if (0 === t)
                            return;
                        const s = document.createElement("cg-resize");
                        e.container.appendChild(s);
                        const r = e=>{
                            e.preventDefault();
                            const t = "touchstart" === e.type ? "touchmove" : "mousemove"
                              , o = "touchstart" === e.type ? "touchend" : "mouseup"
                              , n = Jo(e)
                              , s = parseInt(getComputedStyle(document.body).getPropertyValue("--zoom"));
                            let r = s;
                            const i = de((()=>L(`/pref/zoom?v=${100 + r}`, {
                                method: "post"
                            })), 700)
                              , a = e=>{
                                const t = Jo(e)
                                  , o = t[0] - n[0] + t[1] - n[1];
                                r = Math.round(Math.min(100, Math.max(0, s + o / 10))),
                                document.body.setAttribute("style", "--zoom:" + r),
                                window.dispatchEvent(new Event("resize")),
                                i()
                            }
                            ;
                            document.body.classList.add("resizing"),
                            document.addEventListener(t, a),
                            document.addEventListener(o, (()=>{
                                document.removeEventListener(t, a),
                                document.body.classList.remove("resizing")
                            }
                            ), {
                                once: !0
                            })
                        }
                        ;
                        if (s.addEventListener("touchstart", r, {
                            passive: !1
                        }),
                        s.addEventListener("mousedown", r, {
                            passive: !1
                        }),
                        1 === t) {
                            const e = e=>s.classList.toggle("none", n ? !n(e) : e >= 2);
                            e(o),
                            lichess.pubsub.on("ply", e)
                        }
                    }(o, e.data.pref.resizeHandle, e.ply),
                    1 === t.pref.coords && (()=>{
                        const e = {
                            blue: "#DEE3E6 #788a94",
                            blue2: "#97b2c7 #546f82",
                            blue3: "#d9e0e6 #315991",
                            canvas: "#d7daeb #547388",
                            wood: "#d8a45b #9b4d0f",
                            wood2: "#a38b5d #6c5017",
                            wood3: "#d0ceca #755839",
                            wood4: "#caaf7d #7b5330",
                            maple: "#e8ceab #bc7944",
                            maple2: "#E2C89F #996633",
                            leather: "#d1d1c9 #c28e16",
                            green: "#FFFFDD #6d8753",
                            brown: "#F0D9B5 #946f51",
                            pink: "#E8E9B7 #ED7272",
                            marble: "#93ab91 #4f644e",
                            "blue-marble": "#EAE6DD #7C7F87",
                            "green-plastic": "#f2f9bb #59935d",
                            grey: "#b8b8b8 #7d7d7d",
                            metal: "#c9c9c9 #727272",
                            olive: "#b8b19f #6d6655",
                            newspaper: "#fff #8d8d8d",
                            purple: "#9f90b0 #7d4a8d",
                            "purple-diag": "#E5DAF0 #957AB0",
                            ic: "#ececec #c1c18e",
                            horsey: "#F0D9B5 #946f51"
                        };
                        for (const t of document.body.className.split(" "))
                            if (t in e) {
                                const o = document.documentElement.style
                                  , n = e[t].split(" ");
                                o.setProperty("--cg-coord-color-white", n[0]),
                                o.setProperty("--cg-coord-color-black", n[1]),
                                o.setProperty("--cg-coord-shadow", "none")
                            }
                    }
                    )()
                }
            },
            movable: {
                free: !1,
                color: s ? t.player.color : void 0,
                dests: s ? oe(t.possibleMoves) : new Map,
                showDests: t.pref.destination,
                rookCastle: t.pref.rookCastle,
                events: {
                    after: o.onUserMove,
                    afterNewPiece: o.onUserNewPiece
                }
            },
            animation: {
                enabled: !0,
                duration: t.pref.animationDuration
            },
            premovable: {
                enabled: t.pref.enablePremove,
                showDests: t.pref.destination,
                castle: "antichess" !== t.game.variant.key,
                events: {
                    set: o.onPremove,
                    unset: o.onCancelPremove
                }
            },
            predroppable: {
                enabled: t.pref.enablePremove && "crazyhouse" === t.game.variant.key,
                events: {
                    set: o.onPredrop,
                    unset() {
                        o.onPredrop(void 0)
                    }
                }
            },
            draggable: {
                enabled: 0 !== t.pref.moveEvent,
                showGhost: t.pref.highlight
            },
            selectable: {
                enabled: 1 !== t.pref.moveEvent
            },
            drawable: {
                enabled: !0,
                defaultSnapToValidMove: "0" != (lichess.storage.get("arrow.snap") || 1)
            },
            disableContextMenu: !0
        }
    }
    function Qo(e, t, o) {
        const n = e.state.pieces.get(t);
        n && "pawn" === n.role && e.setPieces(new Map([[t, {
            color: n.color,
            role: o,
            promoted: !0
        }]]))
    }
    function en(e, t) {
        return "racingKings" === e.game.variant.key ? t ? "black" : "white" : t ? e.opponent.color : e.player.color
    }
    function tn(e) {
        return p("div.cg-wrap", {
            hook: ee((t=>e.setChessground(Yo(t, Zo(e)))))
        })
    }
    let on = []
      , nn = !1;
    function sn(e) {
        const t = lichess.storage.make("just-notified");
        if (document.hasFocus() || Date.now() - parseInt(t.get(), 10) < 1e3)
            return;
        t.set("" + Date.now()),
        $.isFunction(e) && (e = e());
        const o = new Notification("lichess.org",{
            icon: lichess.assetUrl("logo/lichess-favicon-256.png", {
                noVersion: !0
            }),
            body: e
        });
        o.onclick = ()=>window.focus(),
        on.push(o),
        nn || (nn = !0,
        window.addEventListener("focus", (()=>{
            on.forEach((e=>e.close())),
            on = []
        }
        )))
    }
    function rn(e) {
        !document.hasFocus() && "Notification"in window && "granted" === Notification.permission && setTimeout(sn, 10 + 500 * Math.random(), e)
    }
    function an(e, t) {
        let o, n = 0;
        return function(...s) {
            const r = this
              , i = performance.now() - n;
            function a() {
                o = void 0,
                n = performance.now(),
                t.apply(r, s)
            }
            o && clearTimeout(o),
            i > e ? a() : o = setTimeout(a, e - i)
        }
    }
    function cn(e, t, o) {
        cn.close();
        const n = $('<div id="modal-wrap"><span class="close" data-icon=""></span></div>')
          , s = $(`<div id="modal-overlay" class="${t}">`).on("click", cn.close);
        return n.appendTo(s),
        e.clone().removeClass("none").appendTo(n),
        cn.onClose = o,
        n.find(".close").on("click", cn.close),
        n.on("click", (e=>e.stopPropagation())),
        $("body").addClass("overlayed").prepend(s),
        n
    }
    cn.close = ()=>{
        $("body").removeClass("overlayed"),
        $("#modal-overlay").each((function() {
            cn.onClose && cn.onClose(),
            $(this).remove()
        }
        )),
        delete cn.onClose
    }
    ,
    cn.onClose = void 0;
    const ln = e=>P(e.data.url.round)
      , dn = an(1e3, (e=>L("/pref/zen", {
        method: "post",
        body: E({
            zen: e ? 1 : 0
        })
    })))
      , un = e=>an(100, (()=>lichess.sound.play(e)))
      , hn = un("move")
      , pn = un("capture")
      , mn = un("check")
      , fn = un("explosion");
    function gn(e, t, o) {
        let n, s = 0;
        return function(...r) {
            const i = this
              , a = performance.now() - s;
            function c() {
                n = void 0,
                s = performance.now(),
                e *= t,
                o.apply(i, r)
            }
            n && clearTimeout(n),
            a > e ? c() : n = setTimeout(c, e - a)
        }
    }
    const vn = document.title;
    let bn = 0;
    const wn = ["/assets/logo/lichess-favicon-32.png", "/assets/logo/lichess-favicon-32-invert.png"].map(((e,t)=>()=>{
        bn !== t && (document.getElementById("favicon").href = e,
        bn = t)
    }
    ));
    let kn, yn, Cn;
    function Tn() {
        kn && clearTimeout(kn),
        kn = void 0,
        wn[0]()
    }
    function Mn(e, t) {
        e.data.player.spectator || (t || (rt(e.data) || st(e.data) ? t = e.noarg("gameOver") : lt(e.data) ? (t = e.noarg("yourTurn"),
        document.hasFocus() || kn || (kn = setTimeout((function e() {
            document.hasFocus() || (wn[1 - bn](),
            kn = setTimeout(e, 1e3))
        }
        ), 200))) : (t = e.noarg("waitingForOpponent"),
        Tn())),
        document.title = `${t} - ${vn}`)
    }
    function xn(e, t, o, n, s) {
        return Qo(e.chessground, o, n),
        e.sendMove(t, o, n, s),
        !0
    }
    function Sn(e, t, o, n={}) {
        var s;
        const r = e.data
          , i = e.chessground.state.pieces.get(o)
          , a = e.chessground.state.pieces.get(t);
        return !(!(i && "pawn" === i.role && !a || a && "pawn" === a.role) || !("8" === o[1] && "white" === r.player.color || "1" === o[1] && "black" === r.player.color)) && (Cn && n && n.premove ? xn(e, t, o, Cn, n) : n.ctrlKey || yn || !(3 === r.pref.autoQueen || 2 === r.pref.autoQueen && a || (null === (s = e.keyboardMove) || void 0 === s ? void 0 : s.justSelected())) ? (yn = {
            move: [t, o],
            pre: !!a,
            meta: n
        },
        e.redraw(),
        !0) : (a ? Pn(e, o, "queen") : xn(e, t, o, "queen", n),
        !0))
    }
    function Pn(e, t, o) {
        Cn = o,
        e.chessground.setAutoShapes([{
            orig: t,
            piece: {
                color: e.data.player.color,
                role: o,
                opacity: .8
            },
            brush: ""
        }])
    }
    function Ln(e) {
        Cn && (e.chessground.setAutoShapes([]),
        Cn = void 0,
        e.redraw())
    }
    function Dn(e) {
        Ln(e),
        e.chessground.cancelPremove(),
        yn && ln(e).then(e.reload, lichess.reload),
        yn = void 0
    }
    function En(e, t, o, n, s) {
        let r = 12.5 * (7 - R(t)[0]);
        "white" === s && (r = 87.5 - r);
        return p("div#promotion-choice." + (n === s ? "top" : "bottom"), {
            hook: ee((t=>{
                t.addEventListener("click", (()=>Dn(e))),
                t.addEventListener("contextmenu", (e=>(e.preventDefault(),
                !1)))
            }
            ))
        }, o.map(((t,o)=>p("square", {
            attrs: {
                style: `top:${12.5 * (n === s ? o : 7 - o)}%;left:${r}%`
            },
            hook: te("click", (o=>{
                o.stopPropagation(),
                function(e, t) {
                    if (yn) {
                        const o = yn;
                        yn = void 0,
                        o.pre ? Pn(e, o.move[1], t) : xn(e, o.move[0], o.move[1], t, o.meta),
                        e.redraw()
                    }
                }(e, t)
            }
            ))
        }, [p(`piece.${t}.${n}`)]))))
    }
    const On = ["queen", "knight", "rook", "bishop"];
    function An(e) {
        if (yn)
            return En(e, yn.move[1], "antichess" === e.data.game.variant.key ? On.concat("king") : On, e.data.player.color, e.chessground.state.orientation)
    }
    let $n = 0
      , Nn = 0;
    function In() {
        return $n >= Nn
    }
    function jn(e) {
        const t = e.trans.noarg
          , o = e.data;
        switch (o.game.status.name) {
        case "started":
            return t("playingRightNow");
        case "aborted":
            return t("gameAborted");
        case "mate":
            return t("checkmate");
        case "resign":
            return t("white" == o.game.winner ? "blackResigned" : "whiteResigned");
        case "stalemate":
            return t("stalemate");
        case "timeout":
            switch (o.game.winner) {
            case "white":
                return t("blackLeftTheGame");
            case "black":
                return t("whiteLeftTheGame")
            }
            return t("draw");
        case "draw":
            return t("draw");
        case "outoftime":
            return `${o.game.turns % 2 == 0 ? t("whiteTimeOut") : t("blackTimeOut")}${o.game.winner ? "" : ` • ${t("draw")}`}`;
        case "noStart":
            return ("white" == o.game.winner ? "Black" : "White") + " didn't move";
        case "cheat":
            return t("cheatDetected");
        case "variantEnd":
            switch (o.game.variant.key) {
            case "kingOfTheHill":
                return t("kingInTheCenter");
            case "threeCheck":
                return t("threeChecks")
            }
            return t("variantEnding");
        case "unknownFinish":
            return "Finished";
        default:
            return o.game.status.name
        }
    }
    const Bn = e=>t=>{
        !window.LichessSpeech && t ? lichess.loadModule("speech").then((()=>Rn(e))) : window.LichessSpeech && !t && (window.LichessSpeech = void 0)
    }
      , Rn = e=>{
        if ("started" === e.data.game.status.name)
            window.LichessSpeech.step(e.stepAt(e.ply), !1);
        else {
            const t = jn(e);
            lichess.sound.say(t, !1, !1, !0);
            const o = e.data.game.winner;
            o && lichess.sound.say(e.noarg(o + "IsVictorious"), !1, !1, !0)
        }
    }
      , _n = e=>window.LichessSpeech && e(window.LichessSpeech);
    function zn(e, t, o) {
        return (o ? "/embed/" : "/") + (e.game ? e.game.id : e) + (t ? "/" + t : "")
    }
    function qn(e) {
        const t = e.data
          , o = zn(t, "racingKings" === (n = t).game.variant.key ? "white" : n.player.color) + "#" + e.ply;
        var n;
        return (e=>ft(e) || st(e) || rt(e) && ut(e))(t) ? p("a.fbt", {
            attrs: {
                href: o
            },
            hook: te("click", (e=>{
                location.pathname === o.split("#")[0] && location.reload()
            }
            ))
        }, e.noarg("analysis")) : null
    }
    function Fn(e, t, o, n, s, r) {
        const i = ()=>!t || t(e.data);
        return p("button.fbt." + s, {
            attrs: {
                disabled: !i(),
                title: e.noarg(n)
            },
            hook: te("click", (t=>{
                i() && (r ? r() : e.socket.sendLoading(s))
            }
            ))
        }, [p("span", "offerDraw" == n ? ["½"] : e.nvui ? [e.noarg(n)] : Z(o))])
    }
    function Gn(e) {
        const t = e.opponentGone();
        return !0 === t ? p("div.suggestion", [p("p", {
            hook: rs
        }, e.noarg("opponentLeftChoices")), p("button.button", {
            hook: te("click", (()=>e.socket.sendLoading("resign-force")))
        }, e.noarg("forceResignation")), p("button.button", {
            hook: te("click", (()=>e.socket.sendLoading("draw-force")))
        }, e.noarg("forceDraw"))]) : t ? p("div.suggestion", [p("p", e.trans.vdomPlural("opponentLeftCounter", t, p("strong", "" + t)))]) : null
    }
    const Hn = (e,t)=>p("button.fbt.no", {
        attrs: {
            title: e.noarg("cancel"),
            "data-icon": ""
        },
        hook: te("click", (()=>t(!1)))
    })
      , Kn = e=>p("div.act-confirm", [p("button.fbt.yes", {
        attrs: {
            title: e.noarg("resign"),
            "data-icon": ""
        },
        hook: te("click", (()=>e.resign(!0)))
    }), Hn(e, e.resign)])
      , Wn = e=>p("div.act-confirm", [p("button.fbt.yes.draw-yes", {
        attrs: {
            title: e.noarg("offerDraw")
        },
        hook: te("click", (()=>e.offerDraw(!0)))
    }, p("span", "½")), Hn(e, e.offerDraw)]);
    function Un(e) {
        return e.data.game.threefold ? p("div.suggestion", [p("p", {
            hook: rs
        }, e.noarg("threefoldRepetition")), p("button.button", {
            hook: te("click", (()=>e.socket.sendLoading("draw-claim")))
        }, e.noarg("claimADraw"))]) : null
    }
    function Vn(e) {
        return e.data.player.offeringDraw ? p("div.pending", [p("p", e.noarg("drawOfferSent"))]) : null
    }
    function Yn(e) {
        return e.data.opponent.offeringDraw ? p("div.negotiation.draw", [Zn(e, (()=>e.socket.sendLoading("draw-no"))), p("p", e.noarg("yourOpponentOffersADraw")), Jn(e, "draw-yes", (()=>e.socket.sendLoading("draw-yes")))]) : null
    }
    function Xn(e) {
        return e.data.player.proposingTakeback ? p("div.pending", [p("p", e.noarg("takebackPropositionSent")), p("button.button", {
            hook: te("click", (()=>e.socket.sendLoading("takeback-no")))
        }, e.noarg("cancel"))]) : null
    }
    function Jn(e, t, o, n="accept") {
        const s = e.noarg(n);
        return e.nvui ? p("button." + t, {
            hook: te("click", o)
        }, s) : p("a.accept", {
            attrs: {
                "data-icon": "",
                title: s
            },
            hook: te("click", o)
        })
    }
    function Zn(e, t, o="decline") {
        const n = e.noarg(o);
        return e.nvui ? p("button", {
            hook: te("click", t)
        }, n) : p("a.decline", {
            attrs: {
                "data-icon": "",
                title: n
            },
            hook: te("click", t)
        })
    }
    function Qn(e) {
        return e.data.opponent.proposingTakeback ? p("div.negotiation.takeback", [Zn(e, (()=>e.socket.sendLoading("takeback-no"))), p("p", e.noarg("yourOpponentProposesATakeback")), Jn(e, "takeback-yes", e.takebackYes)]) : null
    }
    function es(e) {
        var t;
        const o = e.data;
        return (null === (t = o.tournament) || void 0 === t ? void 0 : t.running) ? p("div.follow-up", [p("a.text.fbt.strong.glowing", {
            attrs: {
                "data-icon": "",
                href: "/tournament/" + o.tournament.id
            },
            hook: te("click", e.setRedirecting)
        }, e.noarg("backToTournament")), p("form", {
            attrs: {
                method: "post",
                action: "/tournament/" + o.tournament.id + "/withdraw"
            }
        }, [p("button.text.fbt.weak", Z(""), "Pause")]), qn(e)]) : void 0
    }
    function ts(e) {
        var t;
        const o = e.data;
        return (null === (t = o.swiss) || void 0 === t ? void 0 : t.running) ? p("div.follow-up", [p("a.text.fbt.strong.glowing", {
            attrs: {
                "data-icon": "",
                href: "/swiss/" + o.swiss.id
            },
            hook: te("click", e.setRedirecting)
        }, e.noarg("backToTournament")), qn(e)]) : void 0
    }
    function os(e) {
        return t = e.data,
        ct(t) && t.moretimeable && (t.clock || t.correspondence && t.correspondence[t.opponent.color] < t.correspondence.increment - 3600) ? p("a.moretime", {
            attrs: {
                title: e.data.clock ? e.trans("giveNbSeconds", e.data.clock.moretime) : e.noarg("giveMoreTime"),
                "data-icon": ""
            },
            hook: te("click", e.socket.moreTime)
        }) : null;
        var t
    }
    function ns(e) {
        const t = e.data
          , o = !t.game.rematch && (st(t) || rt(t)) && !t.tournament && !t.simul && !t.swiss && !t.game.boosted
          , n = (st(t) || rt(t)) && ("lobby" === t.game.source || "pool" === t.game.source)
          , s = e.challengeRematched ? [p("div.suggestion.text", {
            hook: rs
        }, e.noarg("rematchOfferSent"))] : o || t.game.rematch ? function(e) {
            const t = e.data
              , o = !!t.player.offeringRematch
              , n = !!t.opponent.offeringRematch
              , s = e.noarg;
            return [n ? p("button.rematch-decline", {
                attrs: {
                    "data-icon": "",
                    title: s("decline")
                },
                hook: te("click", (()=>e.socket.send("rematch-no")))
            }, e.nvui ? s("decline") : "") : null, p("button.fbt.rematch.white", {
                class: {
                    me: o,
                    glowing: n,
                    disabled: !o && !(t.opponent.onGame || !t.clock && t.player.user && t.opponent.user)
                },
                attrs: {
                    title: n ? s("yourOpponentWantsToPlayANewGameWithYou") : o ? s("rematchOfferSent") : ""
                },
                hook: te("click", (t=>{
                    const o = e.data;
                    o.game.rematch ? location.href = zn(o.game.rematch, o.opponent.color) : o.player.offeringRematch ? (o.player.offeringRematch = !1,
                    e.socket.send("rematch-no")) : o.opponent.onGame ? (o.player.offeringRematch = !0,
                    e.socket.send("rematch-yes")) : t.currentTarget.classList.contains("disabled") || e.challengeRematch()
                }
                ), e.redraw)
            }, [o ? p("div.spinner", {
                "aria-label": "loading"
            }, [p("svg", {
                attrs: {
                    viewBox: "0 0 40 40"
                }
            }, [p("circle", {
                attrs: {
                    cx: 20,
                    cy: 20,
                    r: 18,
                    fill: "none"
                }
            })])]) : p("span", s("rematch"))])]
        }(e) : [];
        return p("div.follow-up", [...s, t.tournament ? p("a.fbt", {
            attrs: {
                href: "/tournament/" + t.tournament.id
            }
        }, e.noarg("viewTournament")) : null, t.swiss ? p("a.fbt", {
            attrs: {
                href: "/swiss/" + t.swiss.id
            }
        }, e.noarg("viewTournament")) : null, n ? p("a.fbt", {
            attrs: {
                href: "pool" === t.game.source ? (r = t.clock,
                i = t.opponent.user,
                "/#pool/" + r.initial / 60 + "+" + r.increment + (i ? "/" + i.id : "")) : "/?hook_like=" + t.game.id
            }
        }, e.noarg("newOpponent")) : null, qn(e)]);
        var r, i
    }
    function ss(e) {
        const t = e.data
          , o = [t.game.rematch ? p("a.fbt.text", {
            attrs: {
                href: `/${t.game.rematch}/${t.opponent.color}`
            }
        }, e.noarg("viewRematch")) : null, t.tournament ? p("a.fbt", {
            attrs: {
                href: "/tournament/" + t.tournament.id
            }
        }, e.noarg("viewTournament")) : null, t.swiss ? p("a.fbt", {
            attrs: {
                href: "/swiss/" + t.swiss.id
            }
        }, e.noarg("viewTournament")) : null, qn(e)];
        return o.find((e=>!!e)) ? p("div.follow-up", o) : null
    }
    const rs = ee((e=>lichess.pubsub.emit("round.suggestion", e.textContent)));
    const is = e=>(e < 10 ? "0" : "") + e
      , as = "<sep>:</sep>";
    function cs(e, t, o, n) {
        const s = new Date(e);
        if (n)
            return (e >= 36e5 ? Math.floor(e / 36e5) + "H:" : "") + s.getUTCMinutes() + "M:" + s.getUTCSeconds() + "S";
        const r = s.getUTCMilliseconds()
          , i = o && r < 500 ? '<sep class="low">:</sep>' : as
          , a = is(s.getUTCMinutes()) + i + is(s.getUTCSeconds());
        if (e >= 36e5) {
            return is(Math.floor(e / 36e5)) + as + a
        }
        if (t) {
            let t = Math.floor(r / 100).toString();
            return !o && e < 1e3 && (t += "<huns>" + Math.floor(r / 10) % 10 + "</huns>"),
            a + "<tenths><sep>.</sep>" + t + "</tenths>"
        }
        return a
    }
    function ls(e, t) {
        const o = e.clock
          , n = e=>{
            if (void 0 !== e.animate) {
                let n = o.elements[t].barAnim;
                void 0 !== n && n.effect && n.effect.target === e || (n = e.animate([{
                    transform: "scale(1)"
                }, {
                    transform: "scale(0, 1)"
                }], {
                    duration: o.barTime,
                    fill: "both"
                }),
                o.elements[t].barAnim = n);
                const s = o.millisOf(t);
                n.currentTime = o.barTime - s,
                t === o.times.activeColor ? s > 0 && n.play() : n.pause()
            } else
                o.elements[t].bar = e,
                e.style.transform = "scale(" + o.timeRatio(o.millisOf(t)) + ",1)"
        }
        ;
        return p("div.bar", {
            class: {
                berserk: !!e.goneBerserk[t]
            },
            hook: {
                insert: e=>n(e.elm),
                postpatch: (e,t)=>n(t.elm)
            }
        })
    }
    function ds(e, t) {
        return !!e.goneBerserk[t] && e.data.game.turns <= 1 && at(e.data)
    }
    function us(e, t, o) {
        return ds(e, t) ? p("div.berserked." + o, Z("")) : null
    }
    function hs(e) {
        var t;
        if ((t = e.data).tournament && t.tournament.berserkable && ct(t) && !ut(t) && !e.goneBerserk[e.data.player.color])
            return p("button.fbt.go-berserk", {
                attrs: {
                    title: "GO BERSERK! Half the time, no increment, bonus point",
                    "data-icon": ""
                },
                hook: te("click", e.goBerserk)
            })
    }
    function ps(e, t, o) {
        var n, s;
        const r = e.data
          , i = (null === (n = r.tournament) || void 0 === n ? void 0 : n.ranks) || (null === (s = r.swiss) || void 0 === s ? void 0 : s.ranks);
        return i && !ds(e, t) ? p("div.tour-rank." + o, {
            attrs: {
                title: "Current tournament rank"
            }
        }, "#" + i[t]) : null
    }
    class ms {
        constructor(e, t) {
            this.opts = t,
            this.emergSound = {
                play: ()=>lichess.sound.play("lowTime"),
                delay: 2e4,
                playable: {
                    white: !0,
                    black: !0
                }
            },
            this.elements = {
                white: {},
                black: {}
            },
            this.timeRatio = e=>Math.min(1, e * this.timeRatioDivisor),
            this.setClock = (e,t,o,n=0)=>{
                const s = at(e) && (dt(e) > 1 || e.clock.running)
                  , r = 10 * n;
                this.times = {
                    white: 1e3 * t,
                    black: 1e3 * o,
                    activeColor: s ? e.game.player : void 0,
                    lastUpdate: performance.now() + r
                },
                s && this.scheduleTick(this.times[e.game.player], r)
            }
            ,
            this.addTime = (e,t)=>{
                this.times[e] += 10 * t
            }
            ,
            this.stopClock = ()=>{
                const e = this.times.activeColor;
                if (e) {
                    const t = this.elapsed();
                    return this.times[e] = Math.max(0, this.times[e] - t),
                    this.times.activeColor = void 0,
                    t
                }
            }
            ,
            this.hardStopClock = ()=>this.times.activeColor = void 0,
            this.scheduleTick = (e,t)=>{
                void 0 !== this.tickCallback && clearTimeout(this.tickCallback),
                this.tickCallback = setTimeout(this.tick, this.opts.nvui ? 1e3 : e % (this.showTenths(e) ? 100 : 500) + 1 + t)
            }
            ,
            this.tick = ()=>{
                this.tickCallback = void 0;
                const e = this.times.activeColor;
                if (void 0 === e)
                    return;
                const t = performance.now()
                  , o = Math.max(0, this.times[e] - this.elapsed(t));
                this.scheduleTick(o, 0),
                0 === o ? this.opts.onFlag() : function(e, t, o) {
                    if (t.time && (t.time.innerHTML = cs(o, e.showTenths(o), !0, e.opts.nvui)),
                    t.bar && (t.bar.style.transform = "scale(" + e.timeRatio(o) + ",1)"),
                    t.clock) {
                        const n = t.clock.classList;
                        o < e.emergMs ? n.add("emerg") : n.contains("emerg") && n.remove("emerg")
                    }
                }(this, this.elements[e], o),
                this.opts.soundColor === e && (this.emergSound.playable[e] ? o < this.emergMs && !(t < this.emergSound.next) && (this.emergSound.play(),
                this.emergSound.next = t + this.emergSound.delay,
                this.emergSound.playable[e] = !1) : o > 1.5 * this.emergMs && (this.emergSound.playable[e] = !0))
            }
            ,
            this.elapsed = (e=performance.now())=>Math.max(0, e - this.times.lastUpdate),
            this.millisOf = e=>this.times.activeColor === e ? Math.max(0, this.times[e] - this.elapsed()) : this.times[e],
            this.isRunning = ()=>void 0 !== this.times.activeColor;
            const o = e.clock;
            if (0 === o.showTenths)
                this.showTenths = ()=>!1;
            else {
                const e = 1 === o.showTenths ? 1e4 : 36e5;
                this.showTenths = t=>t < e
            }
            this.showBar = o.showBar && !this.opts.nvui,
            this.barTime = 1e3 * (Math.max(o.initial, 2) + 5 * o.increment),
            this.timeRatioDivisor = 1 / this.barTime,
            this.emergMs = 1e3 * Math.min(60, Math.max(10, .125 * o.initial)),
            this.setClock(e, o.white, o.black)
        }
    }
    class fs {
        constructor(e, t) {
            this.ctrl = e,
            this.key = t,
            this.storage = lichess.storage.makeBoolean(this.key),
            this.toggle = ()=>{
                this.storage.toggle(),
                this.next(!0)
            }
            ,
            this.get = this.storage.get,
            this.redirect = e=>{
                this.ctrl.setRedirecting(),
                window.location.href = e
            }
            ,
            this.next = e=>{
                const t = this.ctrl.data;
                var o;
                t.player.spectator || (o = t,
                vt(o) || !o.simul && !(e=>"correspondence" === e.game.speed)(o)) || lt(t) || !this.get() || (e ? this.redirect("/round-next/" + t.game.id) : t.simul ? t.simul.hostId === this.ctrl.opts.userId && t.simul.nbPlaying > 1 && this.redirect("/round-next/" + t.game.id) : (e=>P(`/whats-next/${e.data.game.id}${e.data.player.id}`))(this.ctrl).then((e=>{
                    e.next && this.redirect("/" + e.next)
                }
                )))
            }
        }
    }
    class gs {
        constructor(e) {
            this.socket = e,
            this.current = void 0,
            this.register = ()=>{
                this.current = setTimeout(this.expire, 1e4)
            }
            ,
            this.clear = ()=>{
                this.current && clearTimeout(this.current)
            }
            ,
            this.expire = ()=>{
                L("/statlog?e=roundTransientExpire", {
                    method: "post"
                }),
                this.socket.reload({})
            }
        }
    }
    const vs = ["pawn", "knight", "bishop", "rook", "queen"];
    let bs = !1
      , ws = !1
      , ks = !1;
    function ys(e, t, o) {
        if (0 === Cs.length ? ws = !0 : (bs = !0,
        ks || Ms(e)),
        !lt(e))
            return !1;
        if ("pawn" === t && ("1" === o[1] || "8" === o[1]))
            return !1;
        const n = e.possibleDrops;
        if (null == n)
            return !0;
        return (n.match(/.{2}/g) || []).includes(o)
    }
    const Cs = [];
    function Ts(e) {
        const t = window.Mousetrap;
        let o;
        const n = ()=>{
            if (o && document.body.classList.remove(o),
            Cs.length > 0) {
                const s = vs[Cs[Cs.length - 1] - 1]
                  , r = e.data.player.color
                  , i = e.data.crazyhouse;
                if (!i)
                    return;
                const a = i.pockets["white" === r ? 0 : 1][s];
                t = e.chessground.state,
                n = a > 0 ? {
                    color: r,
                    role: s
                } : void 0,
                t.dropmode = {
                    active: !0,
                    piece: n
                },
                vo(t),
                o = `cursor-${r}-${s}`,
                document.body.classList.add(o)
            } else
                !function(e) {
                    e.dropmode = {
                        active: !1
                    }
                }(e.chessground.state),
                o = void 0;
            var t, n
        }
        ;
        lichess.pubsub.on("ply", (()=>{
            Cs.length > 0 && n()
        }
        ));
        for (let r = 1; r <= 5; r++) {
            const e = r.toString();
            t.bind(e, (()=>{
                Cs.includes(r) || (Cs.push(r),
                n())
            }
            )).bind(e, (()=>{
                const e = Cs.indexOf(r);
                e >= 0 && (Cs.splice(e, 1),
                e === Cs.length && n())
            }
            ), "keyup")
        }
        const s = ()=>{
            Cs.length > 0 && (Cs.length = 0,
            n())
        }
        ;
        window.addEventListener("blur", s),
        window.addEventListener("focus", (e=>{
            e.target && "input" === e.target.localName && s()
        }
        ), {
            capture: !0
        }),
        "0" !== lichess.storage.get("crazyKeyHist") && Ms(e.data)
    }
    function Ms(e) {
        const t = e.player.color[0];
        for (const o of "PNBRQ")
            fetch(lichess.assetUrl(`piece/cburnett/${t}${o}.svg`));
        ks = !0
    }
    const xs = {
        P: "pawn",
        N: "knight",
        B: "bishop",
        R: "rook",
        Q: "queen",
        K: "king"
    };
    function Ss(e) {
        return p("div.keyboard-move", [p("input", {
            attrs: {
                spellcheck: !1,
                autocomplete: !1
            },
            hook: ee((t=>lichess.loadModule("round.keyboardMove").then((()=>e.registerHandler(lichess.keyboardMove({
                input: t,
                ctrl: e
            }))))))
        }), e.hasFocus() ? p("em", "Enter SAN (Nc3) or UCI (b1c3) moves, or type / to focus chat") : p("strong", "Press <enter> to focus")])
    }
    function Ps(e, t) {
        return e.trans("aiNameLevelAiLevel", "Stockfish", t)
    }
    let Ls = !1;
    const Ds = e=>e.split(" ")[0];
    const Es = e=>e.userJump(e.ply - 1)
      , Os = e=>e.userJump(e.ply + 1);
    class As {
        constructor(e, t) {
            var o;
            this.opts = e,
            this.redraw = t,
            this.firstSeconds = !0,
            this.flip = !1,
            this.loading = !1,
            this.redirecting = !1,
            this.goneBerserk = {},
            this.resignConfirm = void 0,
            this.drawConfirm = void 0,
            this.autoScroll = ()=>{}
            ,
            this.challengeRematched = !1,
            this.shouldSendMoveTime = !1,
            this.sign = Math.random().toString(36),
            this.showExpiration = ()=>{
                this.data.expiration && (this.redraw(),
                setTimeout(this.showExpiration, 250))
            }
            ,
            this.onUserMove = (e,t,o)=>{
                this.keyboardMove && this.keyboardMove.usedSan || Ve(this, o),
                Sn(this, e, t, o) || this.sendMove(e, t, void 0, o)
            }
            ,
            this.onUserNewPiece = (e,t,o)=>{
                !this.replaying() && ys(this.data, e, t) ? this.sendNewPiece(e, t, !!o.predrop) : this.jump(this.ply)
            }
            ,
            this.onMove = (e,t,o)=>{
                o || this.enpassant(e, t) ? "atomic" === this.data.game.variant.key ? (fn(),
                function(e, t) {
                    const o = []
                      , n = new Map
                      , s = R(t)
                      , r = Math.max(0, s[0] - 1)
                      , i = Math.min(7, s[0] + 1)
                      , a = Math.max(0, s[1] - 1)
                      , c = Math.min(7, s[1] + 1);
                    for (let l = r; l <= i; l++)
                        for (let s = a; s <= c; s++) {
                            const r = B([l, s]);
                            o.push(r);
                            const i = e.chessground.state.pieces.get(r);
                            i && (r === t || "pawn" !== i.role) && n.set(r, void 0)
                        }
                    e.chessground.setPieces(n),
                    e.chessground.explode(o)
                }(this, t)) : pn() : hn()
            }
            ,
            this.onPremove = (e,t,o)=>{
                Sn(this, e, t, o)
            }
            ,
            this.onCancelPremove = ()=>{
                Ln(this)
            }
            ,
            this.onPredrop = (e,t)=>{
                this.preDrop = e,
                this.redraw()
            }
            ,
            this.isSimulHost = ()=>this.data.simul && this.data.simul.hostId === this.opts.userId,
            this.enpassant = (e,t)=>{
                var o;
                if (e[0] === t[0] || "pawn" !== (null === (o = this.chessground.state.pieces.get(t)) || void 0 === o ? void 0 : o.role))
                    return !1;
                const n = t[0] + e[1];
                return this.chessground.setPieces(new Map([[n, void 0]])),
                !0
            }
            ,
            this.lastPly = ()=>Je(this.data),
            this.makeCgHooks = ()=>({
                onUserMove: this.onUserMove,
                onUserNewPiece: this.onUserNewPiece,
                onMove: this.onMove,
                onNewPiece: hn,
                onPremove: this.onPremove,
                onCancelPremove: this.onCancelPremove,
                onPredrop: this.onPredrop
            }),
            this.replaying = ()=>this.ply !== this.lastPly(),
            this.userJump = e=>{
                this.cancelMove(),
                this.chessground.selectSquare(null),
                e != this.ply && this.jump(e) ? ((e,t)=>{
                    _n((o=>o.step(e.stepAt(t), !0)))
                }
                )(this, this.ply) : this.redraw()
            }
            ,
            this.isPlaying = ()=>ct(this.data),
            this.jump = e=>{
                const t = (e = Math.max(Xe(this.data), Math.min(this.lastPly(), e))) === this.ply + 1;
                this.ply = e,
                this.justDropped = void 0,
                this.preDrop = void 0;
                const o = this.stepAt(e)
                  , n = {
                    fen: o.fen,
                    lastMove: Q(o.uci),
                    check: !!o.check,
                    turnColor: this.ply % 2 == 0 ? "white" : "black"
                };
                return this.replaying() ? this.chessground.stop() : n.movable = {
                    color: this.isPlaying() ? this.data.player.color : void 0,
                    dests: oe(this.data.possibleMoves)
                },
                this.chessground.set(n),
                o.san && t && (o.san.includes("x") ? pn() : hn(),
                /[+#]/.test(o.san) && mn()),
                this.autoScroll(),
                this.keyboardMove && this.keyboardMove.update(o),
                lichess.pubsub.emit("ply", e),
                !0
            }
            ,
            this.replayEnabledByPref = ()=>{
                const e = this.data;
                return 2 === e.pref.replay || 1 === e.pref.replay && ("classical" === e.game.speed || "unlimited" === e.game.speed || "correspondence" === e.game.speed)
            }
            ,
            this.isLate = ()=>this.replaying() && it(this.data),
            this.playerAt = e=>this.flip ^ "top" === e ? this.data.opponent : this.data.player,
            this.flipNow = ()=>{
                this.flip = !this.nvui && !this.flip,
                this.chessground.set({
                    orientation: en(this.data, this.flip)
                }),
                this.redraw()
            }
            ,
            this.setTitle = ()=>Mn(this),
            this.actualSendMove = (e,t,o={})=>{
                const n = {
                    sign: this.sign,
                    ackable: !0
                };
                if (this.clock)
                    if (n.withLag = !this.shouldSendMoveTime || !this.clock.isRunning(),
                    o.premove && this.shouldSendMoveTime)
                        this.clock.hardStopClock(),
                        n.millis = 0;
                    else {
                        const e = this.clock.stopClock();
                        void 0 !== e && this.shouldSendMoveTime && (n.millis = e)
                    }
                this.socket.send(e, t, n),
                this.justDropped = o.justDropped,
                this.justCaptured = o.justCaptured,
                this.preDrop = void 0,
                this.transientMove.register(),
                this.redraw()
            }
            ,
            this.sendMove = (e,t,o,n)=>{
                const s = {
                    u: e + t
                };
                o && (s.u += "knight" === o ? "n" : o[0]),
                In() && (s.b = 1),
                this.resign(!1),
                this.data.pref.submitMove && !n.premove ? (this.moveToSubmit = s,
                this.redraw()) : this.actualSendMove("move", s, {
                    justCaptured: n.captured,
                    premove: n.premove
                })
            }
            ,
            this.sendNewPiece = (e,t,o)=>{
                const n = {
                    role: e,
                    pos: t
                };
                In() && (n.b = 1),
                this.resign(!1),
                this.data.pref.submitMove && !o ? (this.dropToSubmit = n,
                this.redraw()) : this.actualSendMove("drop", n, {
                    justDropped: e,
                    premove: o
                })
            }
            ,
            this.showYourMoveNotification = ()=>{
                const e = this.data
                  , t = $("body").hasClass("zen") ? "Your opponent" : function(e, t) {
                    return t.user ? (t.user.title ? t.user.title + " " : "") + t.user.username : t.ai ? Ps(e, t.ai) : e.noarg("anonymous")
                }(this, e.opponent)
                  , o = `${t}\njoined the game.`;
                lt(e) ? rn((()=>{
                    let n = this.noarg("yourTurn");
                    if (this.ply < 1)
                        n = `${o}\n${n}`;
                    else {
                        let o = e.steps[e.steps.length - 1].san;
                        o = `${Math.floor((this.ply - 1) / 2) + 1}${this.ply % 2 == 1 ? "." : "..."} ${o}`,
                        n = `${t}\nplayed ${o}.\n${n}`
                    }
                    return n
                }
                )) : this.isPlaying() && this.ply < 1 && rn(o)
            }
            ,
            this.playerByColor = e=>this.data[e === this.data.player.color ? "player" : "opponent"],
            this.apiMove = e=>{
                var t, o;
                const n = this.data
                  , s = this.isPlaying();
                n.game.turns = e.ply,
                n.game.player = e.ply % 2 == 0 ? "white" : "black";
                const r = e.ply % 2 == 0 ? "black" : "white"
                  , i = n.player.color === n.game.player;
                if (e.status && (n.game.status = e.status),
                e.winner && (n.game.winner = e.winner),
                this.playerByColor("white").offeringDraw = e.wDraw,
                this.playerByColor("black").offeringDraw = e.bDraw,
                n.possibleMoves = i ? e.dests : void 0,
                n.possibleDrops = i ? e.drops : void 0,
                n.crazyhouse = e.crazyhouse,
                this.setTitle(),
                !this.replaying()) {
                    if (this.ply++,
                    e.role)
                        this.chessground.newPiece({
                            role: e.role,
                            color: r
                        }, e.uci.substr(2, 2));
                    else {
                        const n = Q(e.uci)
                          , s = this.chessground.state.pieces;
                        (!e.castle || "king" === (null === (t = s.get(e.castle.king[0])) || void 0 === t ? void 0 : t.role) && "rook" === (null === (o = s.get(e.castle.rook[0])) || void 0 === o ? void 0 : o.role)) && this.chessground.move(n[0], n[1])
                    }
                    e.promotion && Qo(this.chessground, e.promotion.key, e.promotion.pieceClass),
                    this.chessground.set({
                        turnColor: n.game.player,
                        movable: {
                            dests: s ? oe(n.possibleMoves) : new Map
                        },
                        check: !!e.check
                    }),
                    e.check && mn(),
                    Nn = Date.now() + 1e3,
                    lichess.pubsub.emit("ply", this.ply)
                }
                n.game.threefold = !!e.threefold;
                const a = {
                    ply: this.lastPly() + 1,
                    fen: e.fen,
                    san: e.san,
                    uci: e.uci,
                    check: e.check,
                    crazy: e.crazyhouse
                };
                if (n.steps.push(a),
                this.justDropped = void 0,
                this.justCaptured = void 0,
                bt(n, r, !0),
                this.data.forecastCount = void 0,
                e.clock) {
                    this.shouldSendMoveTime = !0;
                    const t = e.clock
                      , o = s && i ? 0 : t.lag || 1;
                    this.clock ? this.clock.setClock(n, t.white, t.black, o) : this.corresClock && this.corresClock.update(t.white, t.black)
                }
                if (this.data.expiration && (this.data.steps.length > 2 ? this.data.expiration = void 0 : this.data.expiration.movedAt = Date.now()),
                this.redraw(),
                s && r == n.player.color && (this.transientMove.clear(),
                this.moveOn.next(),
                function(e, t) {
                    e.opponent.ai && lichess.storage.fire("ceval.fen", t.fen)
                }(n, e)),
                !this.replaying() && r != n.player.color) {
                    const e = "atomic" === n.game.variant.key ? 100 : 1;
                    setTimeout((()=>{
                        this.chessground.playPremove() || this.playPredrop() || (Dn(this),
                        this.showYourMoveNotification())
                    }
                    ), e)
                }
                return this.autoScroll(),
                this.onChange(),
                this.keyboardMove && this.keyboardMove.update(a, r != n.player.color),
                this.music && this.music.jump(e),
                (e=>{
                    _n((t=>t.step(e, !1)))
                }
                )(a),
                !0
            }
            ,
            this.playPredrop = ()=>this.chessground.playPredrop((e=>ys(this.data, e.role, e.key))),
            this.reload = e=>{
                e.steps.length !== this.data.steps.length && (this.ply = e.steps[e.steps.length - 1].ply),
                et(e),
                this.data = e,
                this.clearJust(),
                this.shouldSendMoveTime = !1,
                this.clock && this.clock.setClock(e, e.clock.white, e.clock.black),
                this.corresClock && this.corresClock.update(e.correspondence.white, e.correspondence.black),
                this.replaying() || function(e) {
                    e.chessground.set(Zo(e))
                }(this),
                this.setTitle(),
                this.moveOn.next(),
                this.setQuietMode(),
                this.redraw(),
                this.autoScroll(),
                this.onChange(),
                this.setLoading(!1),
                this.keyboardMove && this.keyboardMove.update(e.steps[e.steps.length - 1])
            }
            ,
            this.endWithData = e=>{
                var t, o;
                const n = this.data;
                if (n.game.winner = e.winner,
                n.game.status = e.status,
                n.game.boosted = e.boosted,
                this.userJump(this.lastPly()),
                this.chessground.stop(),
                e.ratingDiff && (n.player.ratingDiff = e.ratingDiff[n.player.color],
                n.opponent.ratingDiff = e.ratingDiff[n.opponent.color]),
                !n.player.spectator && n.game.turns > 1) {
                    const s = e.winner ? n.player.color === e.winner ? "victory" : "defeat" : "draw";
                    lichess.sound.play(s),
                    "victory" != s && n.game.turns > 6 && !n.tournament && !n.swiss && "1" == lichess.storage.get("courtesy") && (null === (o = null === (t = this.opts.chat) || void 0 === t ? void 0 : t.instance) || void 0 === o || o.then((e=>e.post("Good game, well played"))))
                }
                n.crazyhouse && function() {
                    const e = lichess.storage.make("crazyKeyHist");
                    if (bs)
                        e.set(10);
                    else if (ws) {
                        const t = parseInt(e.get());
                        t > 0 && t <= 10 ? e.set(t - 1) : 0 !== t && e.set(3)
                    }
                }(),
                this.clearJust(),
                this.setTitle(),
                this.moveOn.next(),
                this.setQuietMode(),
                this.setLoading(!1),
                this.clock && e.clock && this.clock.setClock(n, .01 * e.clock.wc, .01 * e.clock.bc),
                this.redraw(),
                this.autoScroll(),
                this.onChange(),
                n.tv && setTimeout(lichess.reload, 1e4),
                Rn(this)
            }
            ,
            this.challengeRematch = ()=>{
                var e;
                this.challengeRematched = !0,
                (e = this.data.game.id,
                P("/challenge/rematch-of/" + e, {
                    method: "post"
                })).then((()=>{
                    lichess.pubsub.emit("challenge-app.open"),
                    lichess.once("rematch-challenge") && setTimeout((()=>{
                        lichess.hopscotch((function() {
                            window.hopscotch.configure({
                                i18n: {
                                    doneBtn: "OK, got it"
                                }
                            }).startTour({
                                id: "rematch-challenge",
                                showPrevButton: !0,
                                steps: [{
                                    title: "Challenged to a rematch",
                                    content: "Your opponent is offline, but they can accept this challenge later!",
                                    target: "#challenge-app",
                                    placement: "bottom"
                                }]
                            })
                        }
                        ))
                    }
                    ), 1e3)
                }
                ), (e=>{
                    this.challengeRematched = !1
                }
                ))
            }
            ,
            this.makeCorrespondenceClock = ()=>{
                this.data.correspondence && !this.corresClock && (this.corresClock = function(e, t, o) {
                    const n = .1 / t.increment;
                    let s;
                    function r(e, t) {
                        s = {
                            white: 1e3 * e,
                            black: 1e3 * t,
                            lastUpdate: performance.now()
                        }
                    }
                    return r(t.white, t.black),
                    {
                        root: e,
                        data: t,
                        timePercent: e=>Math.max(0, Math.min(100, s[e] * n)),
                        millisOf: e=>Math.max(0, s[e]),
                        update: r,
                        tick: function(e) {
                            const t = performance.now();
                            s[e] -= t - s.lastUpdate,
                            s.lastUpdate = t,
                            s[e] <= 0 && o()
                        }
                    }
                }(this, this.data.correspondence, this.socket.outoftime))
            }
            ,
            this.corresClockTick = ()=>{
                this.corresClock && at(this.data) && this.corresClock.tick(this.data.game.player)
            }
            ,
            this.setQuietMode = ()=>{
                const e = lichess.quietMode
                  , t = this.isPlaying();
                e !== t && (lichess.quietMode = t,
                $("body").toggleClass("playing", !this.data.player.spectator).toggleClass("no-select", t && this.clock && this.clock.millisOf(this.data.player.color) <= 3e5))
            }
            ,
            this.takebackYes = ()=>{
                this.socket.sendLoading("takeback-yes"),
                this.chessground.cancelPremove(),
                Dn(this)
            }
            ,
            this.resign = (e,t)=>{
                e ? (this.resignConfirm || !this.data.pref.confirmResign || t ? (this.socket.sendLoading("resign"),
                clearTimeout(this.resignConfirm)) : this.resignConfirm = setTimeout((()=>this.resign(!1)), 3e3),
                this.redraw()) : this.resignConfirm && (clearTimeout(this.resignConfirm),
                this.resignConfirm = void 0,
                this.redraw())
            }
            ,
            this.goBerserk = ()=>{
                this.socket.berserk(),
                lichess.sound.play("berserk")
            }
            ,
            this.setBerserk = e=>{
                this.goneBerserk[e] || (this.goneBerserk[e] = !0,
                e !== this.data.player.color && lichess.sound.play("berserk"),
                this.redraw(),
                $('<i data-icon="">').appendTo($(`.game__meta .player.${e} .user-link`)))
            }
            ,
            this.setLoading = (e,t=1500)=>{
                clearTimeout(this.loadingTimeout),
                e ? (this.loading = !0,
                this.loadingTimeout = setTimeout((()=>{
                    this.loading = !1,
                    this.redraw()
                }
                ), t),
                this.redraw()) : this.loading && (this.loading = !1,
                this.redraw())
            }
            ,
            this.setRedirecting = ()=>{
                this.redirecting = !0,
                lichess.unload.expected = !0,
                setTimeout((()=>{
                    this.redirecting = !1,
                    this.redraw()
                }
                ), 2500),
                this.redraw()
            }
            ,
            this.submitMove = e=>{
                const t = this.moveToSubmit || this.dropToSubmit;
                e && t ? (this.moveToSubmit ? this.actualSendMove("move", this.moveToSubmit) : this.actualSendMove("drop", this.dropToSubmit),
                lichess.sound.play("confirmation")) : this.jump(this.ply),
                this.cancelMove(),
                t && this.setLoading(!0, 300)
            }
            ,
            this.cancelMove = ()=>{
                this.moveToSubmit = void 0,
                this.dropToSubmit = void 0
            }
            ,
            this.onChange = ()=>{
                this.opts.onChange && setTimeout((()=>this.opts.onChange(this.data)), 150)
            }
            ,
            this.setGone = e=>{
                wt(this.data, this.data.opponent.color, e),
                clearTimeout(this.goneTick),
                Number(e) > 1 && (this.goneTick = setTimeout((()=>{
                    const e = Number(this.opponentGone());
                    e > 1 && this.setGone(e - 1)
                }
                ), 1e3)),
                this.redraw()
            }
            ,
            this.opponentGone = ()=>{
                const e = this.data;
                return !1 !== e.opponent.gone && !lt(e) && mt(e) && e.opponent.gone
            }
            ,
            this.canOfferDraw = ()=>{
                return e = this.data,
                at(e) && e.game.turns >= 2 && !e.player.offeringDraw && !vt(e) && (this.lastDrawOfferAtPly || -99) < this.ply - 20;
                var e
            }
            ,
            this.offerDraw = e=>{
                this.canOfferDraw() && (this.drawConfirm ? (e && this.doOfferDraw(),
                clearTimeout(this.drawConfirm),
                this.drawConfirm = void 0) : e && (this.data.pref.confirmResign ? this.drawConfirm = setTimeout((()=>{
                    this.offerDraw(!1)
                }
                ), 3e3) : this.doOfferDraw())),
                this.redraw()
            }
            ,
            this.doOfferDraw = ()=>{
                this.lastDrawOfferAtPly = this.ply,
                this.socket.sendLoading("draw-yes", null)
            }
            ,
            this.setChessground = e=>{
                this.chessground = e,
                this.data.pref.keyboardMove && (this.keyboardMove = function(e, t, o) {
                    let n, s = !1, r = t.fen, i = performance.now();
                    const a = e.chessground.state
                      , c = t=>{
                        a.selected === t ? e.chessground.cancelMove() : (e.chessground.selectSquare(t, !0),
                        i = performance.now())
                    }
                    ;
                    let l = !1;
                    return {
                        drop(t, o) {
                            const n = xs[o]
                              , s = e.data.crazyhouse
                              , r = e.data.player.color;
                            n && s && !a.pieces.has(t) && s.pockets["white" === r ? 0 : 1][n] && ys(e.data, n, t) && (e.chessground.cancelMove(),
                            e.chessground.newPiece({
                                role: n,
                                color: r
                            }, t),
                            e.sendNewPiece(n, t, !1))
                        },
                        promote(t, o, n) {
                            const s = xs[n];
                            s && "pawn" != s && (e.chessground.cancelMove(),
                            xn(e, t, o, s, {
                                premove: !1
                            }))
                        },
                        update(e, t=!1) {
                            n ? n(e.fen, a.movable.dests, t) : r = e.fen
                        },
                        registerHandler(e) {
                            n = e,
                            r && n(r, a.movable.dests)
                        },
                        hasFocus: ()=>s,
                        setFocus(e) {
                            s = e,
                            o()
                        },
                        san(t, o) {
                            l = !0,
                            e.chessground.cancelMove(),
                            c(t),
                            c(o)
                        },
                        select: c,
                        hasSelected: ()=>a.selected,
                        confirmMove() {
                            e.submitMove(!0)
                        },
                        usedSan: l,
                        jump(t) {
                            e.userJump(e.ply + t),
                            o()
                        },
                        justSelected: ()=>performance.now() - i < 500,
                        clock: ()=>e.clock,
                        resign: e.resign
                    }
                }(this, this.stepAt(this.ply), this.redraw),
                requestAnimationFrame((()=>this.redraw())))
            }
            ,
            this.stepAt = e=>Qe(this.data, e),
            this.delayedInit = ()=>{
                const e = this.data;
                var t, o;
                this.isPlaying() && 0 === (t = e,
                o = e.player.color,
                Math.floor((t.game.turns + ("white" == o ? 1 : 0)) / 2)) && !this.isSimulHost() && lichess.sound.play("genericNotify"),
                lichess.requestIdleCallback((()=>{
                    const e = this.data;
                    this.isPlaying() && (e.simul || (e.steps.length > 2 || (Nn = Date.now() + 1e4),
                    window.addEventListener("focus", (()=>$n = Date.now()))),
                    window.addEventListener("focus", Tn),
                    this.setTitle(),
                    e.crazyhouse && Ts(this),
                    window.addEventListener("beforeunload", (e=>{
                        const t = this.data;
                        if (lichess.unload.expected || this.nvui || !at(t) || !t.clock || t.opponent.ai || this.isSimulHost())
                            return;
                        this.socket.send("bye2");
                        const o = "There is a game in progress!";
                        return (e || window.event).returnValue = o,
                        o
                    }
                    )),
                    !this.nvui && e.pref.submitMove && window.Mousetrap.bind("esc", (()=>{
                        this.submitMove(!1),
                        this.chessground.cancelMove()
                    }
                    )).bind("return", (()=>this.submitMove(!0))),
                    function(e) {
                        var t;
                        e.data.opponent.ai || !e.data.game.rated && e.opts.userId || "BOT" != (null === (t = e.data.player.user) || void 0 === t ? void 0 : t.title) && (lichess.storage.fire("ceval.disable"),
                        lichess.storage.make("ceval.fen").listen((t=>{
                            const o = e.data
                              , n = Ze(e.data);
                            !Ls && n.ply > 14 && e.isPlaying() && t.value && Ds(n.fen) == Ds(t.value) && (L(`/jslog/${o.game.id}${o.player.id}?n=ceval`, {
                                method: "post"
                            }),
                            Ls = !0)
                        }
                        )))
                    }(this)),
                    this.nvui || (e=>{
                        window.Mousetrap.bind(["left", "h"], (()=>{
                            Es(e),
                            e.redraw()
                        }
                        )).bind(["right", "l"], (()=>{
                            Os(e),
                            e.redraw()
                        }
                        )).bind(["up", "k"], (()=>{
                            e.userJump(0),
                            e.redraw()
                        }
                        )).bind(["down", "j"], (()=>{
                            e.userJump(e.data.steps.length - 1),
                            e.redraw()
                        }
                        )).bind("f", e.flipNow).bind("z", (()=>lichess.pubsub.emit("zen")))
                    }
                    )(this),
                    (e=>{
                        lichess.pubsub.on("speech.enabled", Bn(e)),
                        Bn(e)(lichess.sound.speech())
                    }
                    )(this),
                    this.onChange()
                }
                ), 800)
            }
            ,
            et(e.data);
            const n = this.data = e.data;
            this.ply = Je(n),
            this.goneBerserk[n.player.color] = n.player.berserk,
            this.goneBerserk[n.opponent.color] = n.opponent.berserk,
            setTimeout((()=>{
                this.firstSeconds = !1,
                this.redraw()
            }
            ), 3e3),
            this.socket = function(e, t) {
                function o(e, s) {
                    e && e.t ? (t.setLoading(!1),
                    n[e.t](e.d)) : ln(t).then((n=>{
                        lichess.socket.getVersion() > n.player.version ? s ? lichess.reload() : o(e, !0) : t.reload(n)
                    }
                    ), lichess.reload)
                }
                lichess.socket.sign(t.sign);
                const n = {
                    takebackOffers(e) {
                        t.setLoading(!1),
                        t.data.player.proposingTakeback = e[t.data.player.color],
                        (t.data.opponent.proposingTakeback = e[t.data.opponent.color]) && rn(t.noarg("yourOpponentProposesATakeback")),
                        t.redraw()
                    },
                    move: t.apiMove,
                    drop: t.apiMove,
                    reload: o,
                    redirect: t.setRedirecting,
                    clockInc(e) {
                        t.clock && (t.clock.addTime(e.color, e.time),
                        t.redraw())
                    },
                    cclock(e) {
                        t.corresClock && (t.data.correspondence.white = e.white,
                        t.data.correspondence.black = e.black,
                        t.corresClock.update(e.white, e.black),
                        t.redraw())
                    },
                    crowd(e) {
                        ["white", "black"].forEach((o=>{
                            y(e[o]) && bt(t.data, o, e[o])
                        }
                        )),
                        t.redraw()
                    },
                    endData: t.endWithData,
                    rematchOffer(e) {
                        t.data.player.offeringRematch = e === t.data.player.color,
                        (t.data.opponent.offeringRematch = e === t.data.opponent.color) && rn(t.noarg("yourOpponentWantsToPlayANewGameWithYou")),
                        t.redraw()
                    },
                    rematchTaken(e) {
                        t.data.game.rematch = e,
                        t.data.player.spectator ? t.redraw() : t.setLoading(!0)
                    },
                    drawOffer(e) {
                        if (t.isPlaying() && (t.data.player.offeringDraw = e === t.data.player.color,
                        (t.data.opponent.offeringDraw = e === t.data.opponent.color) && rn(t.noarg("yourOpponentOffersADraw"))),
                        e) {
                            let o = t.lastPly();
                            "white" == e == (o % 2 == 0) && o++,
                            t.data.game.drawOffers = (t.data.game.drawOffers || []).concat([o])
                        }
                        t.redraw()
                    },
                    berserk(e) {
                        t.setBerserk(e)
                    },
                    gone: t.setGone,
                    goneIn: t.setGone,
                    checkCount(e) {
                        t.data.player.checks = "white" == t.data.player.color ? e.white : e.black,
                        t.data.opponent.checks = "white" == t.data.opponent.color ? e.white : e.black,
                        t.redraw()
                    },
                    simulPlayerMove(e) {
                        t.opts.userId && t.data.simul && t.opts.userId == t.data.simul.hostId && e !== t.data.game.id && t.moveOn.get() && !lt(t.data) && (t.setRedirecting(),
                        hn(),
                        location.href = "/" + e)
                    },
                    simulEnd(e) {
                        lichess.loadCssPath("modal"),
                        cn($(`<p>Simul complete!</p><br /><br /><a class="button" href="/simul/${e.id}">Back to ${e.name} simul</a>`))
                    }
                };
                return lichess.pubsub.on("ab.rep", (t=>e("rep", {
                    n: t
                }))),
                {
                    send: e,
                    handlers: n,
                    moreTime: an(300, (()=>e("moretime"))),
                    outoftime: gn(500, 1.1, (()=>e("flag", t.data.game.player))),
                    berserk: an(200, (()=>e("berserk", null, {
                        ackable: !0
                    }))),
                    sendLoading(o, n) {
                        t.setLoading(!0),
                        e(o, n)
                    },
                    receive: (e,t)=>!!n[e] && (n[e](t),
                    !0),
                    reload: o
                }
            }(e.socketSend, this),
            lichess.RoundNVUI && (this.nvui = lichess.RoundNVUI(t)),
            n.clock ? this.clock = new ms(n,{
                onFlag: this.socket.outoftime,
                soundColor: n.simul || n.player.spectator || !n.pref.clockSound ? void 0 : n.player.color,
                nvui: !!this.nvui
            }) : (this.makeCorrespondenceClock(),
            setInterval(this.corresClockTick, 1e3)),
            this.setQuietMode(),
            this.moveOn = new fs(this,"move-on"),
            this.transientMove = new gs(this.socket),
            this.trans = lichess.trans(e.i18n),
            this.noarg = this.trans.noarg,
            setTimeout(this.delayedInit, 200),
            setTimeout(this.showExpiration, 350),
            (null === (o = document.referrer) || void 0 === o ? void 0 : o.includes("/serviceWorker.")) || setTimeout(this.showYourMoveNotification, 500),
            lichess.pubsub.on("jump", (e=>{
                this.jump(parseInt(e)),
                this.redraw()
            }
            )),
            lichess.pubsub.on("sound_set", (e=>{
                this.music || "music" !== e || lichess.loadScript("javascripts/music/play.js").then((()=>{
                    this.music = lichess.playMusic()
                }
                )),
                this.music && "music" !== e && (this.music = void 0)
            }
            )),
            lichess.pubsub.on("zen", (()=>{
                if (!this.data.player.spectator) {
                    const e = $("body").toggleClass("zen").hasClass("zen");
                    window.dispatchEvent(new Event("resize")),
                    dn(e)
                }
            }
            )),
            this.isPlaying() && Ye(this)
        }
        clearJust() {
            this.justDropped = void 0,
            this.justCaptured = void 0,
            this.preDrop = void 0
        }
    }
    const $s = ["mousedown", "touchstart"];
    function Ns(e, t, o) {
        const n = Qe(e.data, e.ply);
        if (!n.crazy)
            return;
        const s = e.justDropped
          , r = e.preDrop
          , i = n.crazy.pockets["white" === t ? 0 : 1]
          , a = o === (e.flip ? "top" : "bottom") && !e.replaying() && e.isPlaying()
          , c = t === e.data.player.color
          , l = e.justCaptured
          , d = l && (l.promoted ? "pawn" : l.role);
        return p("div.pocket.is2d.pocket-" + o, {
            class: {
                usable: a
            },
            hook: ee((t=>$s.forEach((n=>t.addEventListener(n, (t=>{
                o === (e.flip ? "top" : "bottom") && 0 == Cs.length && function(e, t) {
                    if (void 0 !== t.button && 0 !== t.button)
                        return;
                    if (e.replaying() || !e.isPlaying())
                        return;
                    const o = t.target
                      , n = o.getAttribute("data-role")
                      , s = o.getAttribute("data-color")
                      , r = o.getAttribute("data-nb");
                    n && s && "0" !== r && (t.stopPropagation(),
                    t.preventDefault(),
                    po(e.chessground.state, {
                        color: s,
                        role: n
                    }, t))
                }(e, t)
            }
            ))))))
        }, vs.map((e=>{
            let o = i[e] || 0;
            return c && (s === e && o--,
            d === e && o++),
            p("div.pocket-c1", p("div.pocket-c2", p("piece." + e + "." + t, {
                class: {
                    premove: c && r === e
                },
                attrs: {
                    "data-role": e,
                    "data-color": t,
                    "data-nb": o
                }
            })))
        }
        )))
    }
    const Is = (e,t)=>(e / Math.pow(10, t)).toFixed(t).substr(2)
      , js = e=>`<b>${e}</b>`;
    function Bs(e, t, o, n, s) {
        const r = e.millisOf(o)
          , i = e=>{
            e.innerHTML = function(e, t) {
                const o = new Date(t)
                  , n = Is(o.getUTCMinutes(), 2)
                  , s = Is(o.getSeconds(), 2);
                let r, i = "";
                if (t >= 864e5) {
                    const t = o.getUTCDate() - 1;
                    r = o.getUTCHours(),
                    i += (1 === t ? e("oneDay") : e.plural("nbDays", t)) + " ",
                    0 !== r && (i += e.plural("nbHours", r))
                } else
                    t >= 36e5 ? (r = o.getUTCHours(),
                    i += js(Is(r, 2)) + ":" + js(n)) : i += js(n) + ":" + js(s);
                return i
            }(t, r)
        }
          , a = e.root.data.player.color === o;
        return p("div.rclock.rclock-correspondence.rclock-" + n, {
            class: {
                outoftime: r <= 0,
                running: s === o
            }
        }, [e.data.showBar ? p("div.bar", [p("span", {
            attrs: {
                style: `width: ${e.timePercent(o)}%`
            }
        })]) : null, p("div.time", {
            hook: {
                insert: e=>i(e.elm),
                postpatch: (e,t)=>i(t.elm)
            }
        }), a ? null : os(e.root)])
    }
    let Rs = "init";
    function _s() {
        return "string" == typeof Rs && ("init" == Rs && (window.addEventListener("resize", (()=>{
            Rs = "rec"
        }
        )),
        navigator.userAgent.indexOf("Edge/") > -1 && requestAnimationFrame((()=>{
            Rs = "rec"
        }
        ))),
        Rs = !!getComputedStyle(document.body).getPropertyValue("--col1")),
        Rs
    }
    const zs = "u8t"
      , qs = "i5z".toUpperCase()
      , Fs = an(100, ((e,t)=>window.requestAnimationFrame((()=>{
        if (t.data.steps.length < 7)
            return;
        let o;
        if (t.ply < 3)
            o = 0;
        else if (t.ply == Je(t.data))
            o = 99999;
        else {
            const t = e.querySelector(".a1t");
            t && (o = _s() ? t.offsetLeft - e.offsetWidth / 2 + t.offsetWidth / 2 : t.offsetTop - e.offsetHeight / 2 + t.offsetHeight / 2)
        }
        "number" == typeof o && (99999 == o ? e.scrollLeft = e.scrollTop = o : _s() ? e.scrollLeft = o : e.scrollTop = o)
    }
    ))));
    function Gs(e, t, o, n) {
        return e ? p(zs, {
            class: {
                a1t: e.ply === t
            }
        }, ["P" === e.san[0] ? e.san.slice(1) : e.san, n.has(e.ply) ? p("draw", {
            attrs: {
                title: "Draw offer"
            }
        }, "½?") : void 0]) : o ? p(zs, "…") : void 0
    }
    function Hs(e) {
        let t;
        if (st(e.data))
            switch (e.data.game.winner) {
            case "white":
                t = "1-0";
                break;
            case "black":
                t = "0-1";
                break;
            default:
                t = "½-½"
            }
        if (t || rt(e.data)) {
            const o = e.data.game.winner;
            return p("div.result-wrap", [p("p.result", t || ""), p("p.status", {
                hook: ee((()=>{
                    e.autoScroll ? e.autoScroll() : setTimeout((()=>e.autoScroll()), 200)
                }
                ))
            }, [jn(e), o ? " • " + e.noarg(o + "IsVictorious") : ""])])
        }
    }
    function Ks(e) {
        const t = e.data.forecastCount;
        return st(o = e.data) || at(o) && (!o.clock || !ct(o)) ? p("a.fbt.analysis", {
            class: {
                text: !!t
            },
            attrs: {
                title: e.noarg("analysis"),
                href: zn(e.data, e.data.player.color) + "/analysis#" + e.ply,
                "data-icon": ""
            }
        }, t ? ["" + t] : []) : void 0;
        var o
    }
    function Ws(e) {
        const t = e.data
          , o = Xe(t)
          , n = Je(t);
        return p("div.buttons", {
            hook: te("mousedown", (o=>{
                const n = o.target
                  , s = parseInt(n.getAttribute("data-ply") || "");
                if (isNaN(s)) {
                    "flip" === (n.getAttribute("data-act") || n.parentNode.getAttribute("data-act")) && (t.tv ? location.href = "/tv/" + t.tv.channel + (t.tv.flip ? "" : "?flip=1") : t.player.spectator ? location.href = zn(t, t.opponent.color) : e.flipNow())
                } else
                    e.userJump(s)
            }
            ), e.redraw)
        }, [p("button.fbt.flip", {
            class: {
                active: e.flip
            },
            attrs: {
                title: e.noarg("flipBoard"),
                "data-act": "flip",
                "data-icon": ""
            }
        }), ...[["", o], ["", e.ply - 1], ["", e.ply + 1], ["", n]].map(((t,s)=>{
            const r = e.ply !== t[1] && t[1] >= o && t[1] <= n;
            return p("button.fbt", {
                class: {
                    glowing: 3 === s && e.isLate()
                },
                attrs: {
                    disabled: !r,
                    "data-icon": t[0],
                    "data-ply": r ? t[1] : "-"
                }
            })
        }
        )), Ks(e) || p("div.noop")])
    }
    function Us(e, t) {
        return at(e) && 0 === e.game.turns && !e.player.spectator ? p("div.message", Z(""), [p("div", [t("white" === e.player.color ? "youPlayTheWhitePieces" : "youPlayTheBlackPieces"), ..."white" === e.player.color ? [p("br"), p("strong", t("itsYourTurn"))] : []])]) : null
    }
    function Vs(e, t, o, n) {
        return n ? null : p("button.fbt", {
            attrs: {
                disabled: n,
                "data-icon": o,
                "data-ply": e.ply + t
            },
            hook: te("mousedown", (o=>{
                o.preventDefault(),
                e.userJump(e.ply + t),
                e.redraw()
            }
            ))
        })
    }
    function Ys(e) {
        const t = e.data
          , o = e.replayEnabledByPref() && p("l4x", {
            hook: ee((t=>{
                t.addEventListener("mousedown", (t=>{
                    let o = t.target
                      , n = -2;
                    if (o.tagName === zs.toUpperCase())
                        for (; o = o.previousSibling; )
                            if (n++,
                            o.tagName === qs) {
                                e.userJump(2 * parseInt(o.textContent || "") + n),
                                e.redraw();
                                break
                            }
                }
                )),
                e.autoScroll = ()=>Fs(t, e),
                e.autoScroll()
            }
            ))
        }, function(e) {
            const t = e.data.steps
              , o = Xe(e.data)
              , n = Je(e.data)
              , s = new Set(e.data.game.drawOffers || []);
            if (void 0 === n)
                return [];
            const r = [];
            let i = 1;
            o % 2 == 1 && (r.push([null, t[1]]),
            i = 2);
            for (let l = i; l < t.length; l += 2)
                r.push([t[l], t[l + 1]]);
            const a = []
              , c = e.ply;
            for (let l = 0; l < r.length; l++)
                a.push(p("i5z", l + 1 + "")),
                a.push(Gs(r[l][0], c, !0, s)),
                a.push(Gs(r[l][1], c, !1, s));
            return a.push(Hs(e)),
            a
        }(e));
        return e.nvui ? void 0 : p("rm6", [Ws(e), Us(t, e.trans.noarg) || (o ? _s() ? p("div.col1-moves", [Vs(e, -1, "", e.ply == Xe(t)), o, Vs(e, 1, "", e.ply == Je(t))]) : o : Hs(e))])
    }
    let Xs = !1;
    function Js(e) {
        const t = at(e.data) && e.data.expiration;
        if (!t)
            return;
        const o = Math.max(0, t.movedAt - Date.now() + t.millisToMove)
          , n = Math.floor(o / 1e3)
          , s = lt(e.data)
          , r = s && o < 8e3;
        !Xs && r && (lichess.sound.play("lowTime"),
        Xs = !0);
        return p("div.expiration.expiration-" + (s != e.flip ? "bottom" : "top"), {
            class: {
                emerg: r,
                "bar-glider": s
            }
        }, e.trans.vdomPlural("nbSecondsToPlayTheFirstMove", n, p("strong", "" + n)))
    }
    function Zs(e, t) {
        const o = e.playerAt(t);
        return e.nvui ? void 0 : o.ai ? p("div.user-link.online.ruser.ruser-" + t, [p("i.line"), p("name", Ps(e, o.ai))]) : function(e, t, o) {
            const n = e.data
              , s = t.user
              , r = s ? s.perfs[n.game.perf] : null
              , i = t.rating ? t.rating : r && r.rating
              , a = t.ratingDiff
              , c = 0 === a ? p("span", "±0") : a && a > 0 ? p("good", "+" + a) : a && a < 0 ? p("bad", "−" + -a) : void 0;
            if (s) {
                const n = !t.onGame && e.firstSeconds && s.online;
                return p(`div.ruser-${o}.ruser.user-link`, {
                    class: {
                        online: t.onGame,
                        offline: !t.onGame,
                        long: s.username.length > 16,
                        connecting: n
                    }
                }, [p("i.line" + (s.patron ? ".patron" : ""), {
                    attrs: {
                        title: n ? "Connecting to the game" : t.onGame ? "Joined the game" : "Left the game"
                    }
                }), p("a.text.ulpt", {
                    attrs: Object.assign({
                        "data-pt-pos": "s",
                        href: "/@/" + s.username
                    }, e.isPlaying() ? {
                        target: "_blank",
                        rel: "noopener"
                    } : {})
                }, s.title ? [p("span.utitle", "BOT" == s.title ? {
                    attrs: {
                        "data-bot": !0
                    }
                } : {}, s.title), " ", s.username] : [s.username]), i ? p("rating", i + (t.provisional ? "?" : "")) : null, c, t.engine ? p("span", {
                    attrs: {
                        "data-icon": "",
                        title: e.noarg("thisAccountViolatedTos")
                    }
                }) : null])
            }
            const l = !t.onGame && e.firstSeconds;
            return p(`div.ruser-${o}.ruser.user-link`, {
                class: {
                    online: t.onGame,
                    offline: !t.onGame,
                    connecting: l
                }
            }, [p("i.line", {
                attrs: {
                    title: l ? "Connecting to the game" : t.onGame ? "Joined the game" : "Left the game"
                }
            }), p("name", t.name || e.noarg("anonymous"))])
        }(e, o, t)
    }
    const Qs = e=>e.loading || e.redirecting
      , er = ()=>p("i.ddloader")
      , tr = (e,t)=>[Ys(e), t.find((e=>!!e)) ? p("div.rcontrols", t) : null]
      , or = e=>tr(e, [Qs(e) ? er() : es(e) || ts(e) || ns(e)])
      , nr = e=>tr(e, [Qs(e) ? er() : at(e.data) ? void 0 : ss(e)])
      , sr = e=>{
        const t = e.data
          , o = Qs(e)
          , n = function(e) {
            return e.moveToSubmit || e.dropToSubmit ? p("div.negotiation.move-confirm", [Zn(e, (()=>e.submitMove(!1)), "cancel"), p("p", e.noarg("confirmMove")), Jn(e, "confirm-yes", (()=>e.submitMove(!0)))]) : void 0
        }(e)
          , s = o || n ? [] : [ht(t) ? Fn(e, void 0, "", "abortGame", "abort") : Fn(e, pt, "", "proposeATakeback", "takeback-yes", e.takebackYes), e.drawConfirm ? Wn(e) : Fn(e, e.canOfferDraw, "2", "offerDraw", "draw-yes", (()=>e.offerDraw(!0))), e.resignConfirm ? Kn(e) : Fn(e, mt, "", "resign", "resign", (()=>e.resign(!0))), Ks(e)]
          , r = o ? [er()] : n ? [n] : [Gn(e), Un(e), Vn(e), Yn(e), Xn(e), Qn(e)];
        return [Ys(e), p("div.rcontrols", [...r, p("div.ricons", {
            class: {
                confirm: !(!e.drawConfirm && !e.resignConfirm)
            }
        }, s)])]
    }
    ;
    function rr(e, t) {
        const o = e.playerAt(t);
        return e.clock ? function(e, t, o) {
            const n = e.clock
              , s = n.millisOf(t.color)
              , r = e.data.player.color === t.color
              , i = t.color === n.times.activeColor
              , a = e=>{
                const o = n.elements[t.color]
                  , s = n.millisOf(t.color)
                  , r = t.color === n.times.activeColor;
                o.time = e,
                o.clock = e.parentElement,
                e.innerHTML = cs(s, n.showTenths(s), r, n.opts.nvui)
            }
              , c = {
                insert: e=>a(e.elm),
                postpatch: (e,t)=>a(t.elm)
            };
            return p("div.rclock.rclock-" + o, {
                class: {
                    outoftime: s <= 0,
                    running: i,
                    emerg: s < n.emergMs
                }
            }, n.opts.nvui ? [p("div.time", {
                attrs: {
                    role: "timer"
                },
                hook: c
            })] : [n.showBar && ut(e.data) ? ls(e, t.color) : void 0, p("div.time", {
                class: {
                    hour: s > 36e5
                },
                hook: c
            }), us(e, t.color, o), r ? hs(e) : os(e), ps(e, t.color, o)])
        }(e, o, t) : e.data.correspondence && e.data.game.turns > 1 ? Bs(e.corresClock, e.trans, o.color, t, e.data.game.player) : function(e, t, o) {
            const n = e.data;
            if (!st(n) && !rt(n))
                return p("div.rclock.rclock-turn.rclock-" + o, [n.game.player === t ? p("div.rclock-turn__text", n.player.spectator ? e.trans(n.game.player + "Plays") : e.trans(n.game.player === n.player.color ? "yourTurn" : "waitingForOpponent")) : null])
        }(e, o.color, t)
    }
    const ir = e=>[p("div.round__app__table"), Js(e), Zs(e, "top"), ...e.data.player.spectator ? nr(e) : at(e.data) ? sr(e) : or(e), Zs(e, "bottom"), rr(e, "top"), rr(e, "bottom")];
    function ar(e, t, o, n) {
        const s = [];
        let r, i;
        for (r in e)
            if (e[r] > 0) {
                const t = [];
                for (i = 0; i < e[r]; i++)
                    t.push(p("mpiece." + r));
                s.push(p("div", t))
            }
        if (n)
            for (i = 0; i < n; i++)
                s.push(p("div", p("mpiece.king")));
        return t > 0 && s.push(p("score", "+" + t)),
        p("div.material.material-" + o, s)
    }
    const cr = {
        white: {},
        black: {}
    };
    function lr(e) {
        const t = e.data
          , o = e.chessground && e.chessground.state
          , n = t[e.flip ? "player" : "opponent"].color
          , s = t[e.flip ? "opponent" : "player"].color;
        let r, i = 0;
        if (t.pref.showCaptured) {
            const t = o ? o.pieces : Vt(Qe(e.data, e.ply).fen);
            r = function(e) {
                const t = {
                    white: {
                        king: 0,
                        queen: 0,
                        rook: 0,
                        bishop: 0,
                        knight: 0,
                        pawn: 0
                    },
                    black: {
                        king: 0,
                        queen: 0,
                        rook: 0,
                        bishop: 0,
                        knight: 0,
                        pawn: 0
                    }
                };
                for (const o of e.values()) {
                    const e = t[q(o.color)];
                    e[o.role] > 0 ? e[o.role]-- : t[o.color][o.role]++
                }
                return t
            }(t),
            i = function(e) {
                let t = 0;
                for (const o of e.values())
                    t += J[o.role] * ("white" === o.color ? 1 : -1);
                return t
            }(t) * ("white" === s ? 1 : -1)
        } else
            r = cr;
        const a = t.player.checks || t.opponent.checks ? function(e, t) {
            const o = Object.assign({}, ne);
            for (const n of e) {
                if (t < n.ply)
                    break;
                n.check && (n.ply % 2 == 1 ? o.white++ : o.black++)
            }
            return o
        }(e.data.steps, e.ply) : ne;
        return e.nvui ? e.nvui.render(e) : p("div.round__app.variant-" + t.game.variant.key, [p("div.round__app__board.main-board" + (e.data.pref.blindfold ? ".blindfold" : ""), {
            hook: "ontouchstart"in window || "0" == lichess.storage.get("scrollMoves") ? void 0 : te("wheel", (t=>function(e, t) {
                e.isPlaying() || (t.preventDefault(),
                t.deltaY > 0 ? Os(e) : t.deltaY < 0 && Es(e),
                e.redraw())
            }(e, t)), void 0, !1)
        }, [tn(e), An(e)]), Ns(e, n, "top") || ar(r[n], -i, "top", a[n]), ...ir(e), Ns(e, s, "bottom") || ar(r[s], i, "bottom", a[s]), e.keyboardMove ? Ss(e.keyboardMove) : null])
    }
    const dr = u([k, b]);
    return window.LichessChat = function(e, t) {
        const o = u([k, b])
          , n = ge(t, (function() {
            r = o(r, Be(n))
        }
        ))
          , s = Be(n);
        e.innerHTML = "";
        let r = o(e, s);
        return n
    }
    ,
    window.Chessground = Yo,
    e.app = function(e) {
        const t = new As(e,s)
          , o = lr(t);
        e.element.innerHTML = "";
        let n = dr(e.element, o);
        function s() {
            n = dr(n, lr(t))
        }
        return window.addEventListener("resize", s),
        t.isPlaying() && function() {
            if ("ontouchstart"in window)
                return;
            let e, t;
            const o = o=>{
                e = o.pageX,
                t = o.pageY
            }
            ;
            let n = {};
            $("#topnav.hover").each((function() {
                const s = $(this).removeClass("hover")
                  , r = ()=>s.toggleClass("hover")
                  , i = ()=>{
                    Math.sqrt((n.pX - e) * (n.pX - e) + (n.pY - t) * (n.pY - t)) < 8 ? (s.off(n.event, o),
                    delete n.timeoutId,
                    n.isActive = !0,
                    r()) : (n.pX = e,
                    n.pY = t,
                    n.timeoutId = setTimeout(i, 200))
                }
                  , a = function(e) {
                    n.timeoutId && (n.timeoutId = clearTimeout(n.timeoutId));
                    const t = n.event = "mousemove";
                    if ("mouseover" == e.type) {
                        if (n.isActive || e.buttons)
                            return;
                        n.pX = e.pageX,
                        n.pY = e.pageY,
                        s.off(t, o).on(t, o),
                        n.timeoutId = setTimeout(i, 200)
                    } else {
                        if (!n.isActive)
                            return;
                        s.off(t, o),
                        n = {},
                        r()
                    }
                };
                s.on("mouseover", a).on("mouseleave", a)
            }
            ))
        }(),
        lichess.sound.preloadBoardSounds(),
        {
            socketReceive: t.socket.receive,
            moveOn: t.moveOn
        }
    }
    ,
    e.boot = function(e) {
        var t;
        const o = document.querySelector(".round__app")
          , n = e.data;
        function s() {
            n.tournament && $(".game__tournament .clock").each((function() {
                $(this).clock({
                    time: parseFloat($(this).data("time"))
                })
            }
            ))
        }
        function r(e) {
            if (!e.player.spectator)
                return e.steps.length < 4 ? "start" : e.game.status.id >= 30 ? "end" : void 0
        }
        n.tournament && $("body").data("tournament-id", n.tournament.id),
        lichess.socket = new lichess.StrongSocket(n.url.socket,n.player.version,{
            params: {
                userTv: n.userTv && n.userTv.id
            },
            receive(e, t) {
                i.socketReceive(e, t)
            },
            events: {
                tvSelect(e) {
                    n.tv && n.tv.channel == e.channel ? lichess.reload() : $(".tv-channels ." + e.channel + " .champion").html(e.player ? [e.player.title, e.player.name, e.player.rating].filter((e=>e)).join("&nbsp") : "Anonymous")
                },
                end() {
                    L(`${n.tv ? "/tv" : ""}/${n.game.id}/${n.player.color}/sides`).then((e=>{
                        const t = $(e)
                          , o = t.find(".game__meta");
                        o.length && $(".game__meta").replaceWith(o),
                        $(".crosstable").replaceWith(t.find(".crosstable")),
                        s(),
                        lichess.contentLoaded()
                    }
                    ))
                },
                tourStanding(t) {
                    var o, n, s;
                    (null === (o = e.chat) || void 0 === o ? void 0 : o.plugin) && (null === (s = null === (n = e.chat) || void 0 === n ? void 0 : n.instance) || void 0 === s || s.then((o=>{
                        e.chat.plugin.set(t),
                        o.redraw()
                    }
                    )))
                }
            }
        }),
        e.element = o,
        e.socketSend = lichess.socket.send;
        const i = window.LichessRound.app(e)
          , a = e.chat;
        var c, l;
        a && ((null === (t = n.tournament) || void 0 === t ? void 0 : t.top) ? (a.plugin = (c = n.tournament.top,
        l = n.tournament.team,
        {
            set(e) {
                c = e
            },
            tab: {
                key: "tourStanding",
                name: e.i18n.standing
            },
            view: ()=>p("div", {
                hook: ee((e=>{
                    lichess.loadCssPath("round.tour-standing")
                }
                ))
            }, [l ? p("h3.text", {
                attrs: {
                    "data-icon": ""
                }
            }, l.name) : null, p("table.slist", [p("tbody", c.map(((e,t)=>p("tr." + e.n, [p("td.name", [p("span.rank", "" + (t + 1)), p("a.user-link.ulpt", {
                attrs: {
                    href: `/@/${e.n}`
                }
            }, (e.t ? e.t + " " : "") + e.n)]), p("td.total", e.f ? {
                class: {
                    "is-gold": !0
                },
                attrs: {
                    "data-icon": ""
                }
            } : {}, "" + e.s)]))))])])
        }),
        a.alwaysEnabled = !0) : n.simul || n.swiss || (a.preset = r(n),
        a.parseMoves = !0),
        a.noteId && (a.noteAge || 0) < 10 && (a.noteText = ""),
        a.instance = lichess.makeChat(a),
        n.tournament || n.simul || n.swiss || (e.onChange = e=>a.instance.then((t=>t.preset.setGroup(r(e)))))),
        s(),
        $(".round__now-playing .move-on input").on("change", i.moveOn.toggle).prop("checked", i.moveOn.get()).on("click", "a", (()=>(lichess.unload.expected = !0,
        !0))),
        0 === location.pathname.lastIndexOf("/round-next/", 0) && history.replaceState(null, "", "/" + n.game.id),
        $("#zentog").on("click", (()=>lichess.pubsub.emit("zen"))),
        lichess.storage.make("reload-round-tabs").listen(lichess.reload)
    }
    ,
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e
}({});
