function _typeof(t) {
    return (_typeof =
      "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
        ? function (t) {
            return typeof t;
          }
        : function (t) {
            return t &&
              "function" == typeof Symbol &&
              t.constructor === Symbol &&
              t !== Symbol.prototype
              ? "symbol"
              : typeof t;
          })(t);
  }
  
  !(function (t) {
    function e(t, e) {
      if (!(t.originalEvent.touches.length > 1)) {
        t.preventDefault();
        var i = t.originalEvent.changedTouches[0],
          s = document.createEvent("MouseEvents");
        s.initMouseEvent(
          e,
          !0,
          !0,
          window,
          1,
          i.screenX,
          i.screenY,
          i.clientX,
          i.clientY,
          !1,
          !1,
          !1,
          !1,
          0,
          null
        ),
          t.target.dispatchEvent(s);
      }
    }
    if (((t.support.touch = "ontouchend" in document), t.support.touch)) {
      var i,
        s = t.ui.mouse.prototype,
        n = s._mouseInit,
        a = s._mouseDestroy;
      (s._touchStart = function (t) {
        !i &&
          this._mouseCapture(t.originalEvent.changedTouches[0]) &&
          ((i = !0),
          (this._touchMoved = !1),
          e(t, "mouseover"),
          e(t, "mousemove"),
          e(t, "mousedown"));
      }),
        (s._touchMove = function (t) {
          i && ((this._touchMoved = !0), e(t, "mousemove"));
        }),
        (s._touchEnd = function (t) {
          i &&
            (e(t, "mouseup"),
            e(t, "mouseout"),
            this._touchMoved || e(t, "click"),
            (i = !1));
        }),
        (s._mouseInit = function () {
          var e = this;
          e.element.bind({
            touchstart: t.proxy(e, "_touchStart"),
            touchmove: t.proxy(e, "_touchMove"),
            touchend: t.proxy(e, "_touchEnd"),
          }),
            n.call(e);
        }),
        (s._mouseDestroy = function () {
          var e = this;
          e.element.unbind({
            touchstart: t.proxy(e, "_touchStart"),
            touchmove: t.proxy(e, "_touchMove"),
            touchend: t.proxy(e, "_touchEnd"),
          }),
            a.call(e);
        });
    }
  })(jQuery),
    (function (t, e, i, s) {
      var n = "lazyLoadXT",
        a = "lazied",
        o = "load error",
        r = "lazy-hidden",
        l = i.documentElement || i.body,
        h = {
          autoInit: !0,
          selector: "img[data-isrc]",
          blankImage:
            "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7",
          throttle: 99,
          forceLoad:
            e.onscroll === s || !!e.operamini || !l.getBoundingClientRect,
          loadEvent: "pageshow",
          updateEvent: "load orientationchange resize scroll touchmove focus",
          forceEvent: "lazyloadall",
          oninit: { removeClass: "lazy" },
          onshow: { addClass: r },
          onload: { removeClass: r, addClass: "lazy-loaded" },
          onerror: { removeClass: r },
          checkDuplicates: !0,
        },
        c = { srcAttr: "data-isrc", edgeX: 0, edgeY: 0, visibleOnly: !0 },
        d = t(e),
        u = t.isFunction,
        f = t.extend,
        p =
          t.data ||
          function (e, i) {
            return t(e).data(i);
          },
        m = [],
        g = 0,
        y = 0;
      function v(t, e) {
        return t[e] === s ? h[e] : t[e];
      }
      function b() {
        var t = e.pageYOffset;
        return t === s ? l.scrollTop : t;
      }
      function w(t, e) {
        var i = h["on" + t];
        i &&
          (u(i)
            ? i.call(e[0])
            : (i.addClass && e.addClass(i.addClass),
              i.removeClass && e.removeClass(i.removeClass))),
          e.trigger("lazy" + t, [e]),
          k();
      }
      function _(e) {
        w(e.type, t(this).off(o, _));
      }
      function x(i) {
        if (m.length) {
          (i = i || h.forceLoad), (g = 1 / 0);
          var s,
            r,
            c = b(),
            d = e.innerHeight || l.clientHeight,
            f = e.innerWidth || l.clientWidth;
          for (s = 0, r = m.length; s < r; s++) {
            var y,
              v = m[s],
              x = v[0],
              D = v[n],
              k = !1,
              C = i || p(x, a) < 0;
            if (t.contains(l, x)) {
              if (i || !D.visibleOnly || x.offsetWidth || x.offsetHeight) {
                if (!C) {
                  var S = x.getBoundingClientRect(),
                    M = D.edgeX,
                    P = D.edgeY;
                  C =
                    (y = S.top + c - P - d) <= c &&
                    S.bottom > -P &&
                    S.left <= f + M &&
                    S.right > -M;
                }
                if (C) {
                  v.on(o, _), w("show", v);
                  var T = D.srcAttr,
                    $ = u(T) ? T(v) : x.getAttribute(T);
                  $ && (x.src = $), (k = !0);
                } else y < g && (g = y);
              }
            } else k = !0;
            k && (p(x, a, 0), m.splice(s--, 1), r--);
          }
          r || w("complete", t(l));
        }
      }
      function D() {
        y > 1 ? ((y = 1), x(), setTimeout(D, h.throttle)) : (y = 0);
      }
      function k(t) {
        m.length &&
          ((t && "scroll" === t.type && t.currentTarget === e && g >= b()) ||
            (y || setTimeout(D, 0), (y = 2)));
      }
      function C() {
        d.lazyLoadXT();
      }
      function S() {
        x(!0);
      }
      (t[n] = f(h, c, t[n])),
        (t.fn[n] = function (i) {
          var s,
            o = v((i = i || {}), "blankImage"),
            r = v(i, "checkDuplicates"),
            l = v(i, "scrollContainer"),
            d = v(i, "show"),
            u = {};
          for (s in (t(l).on("scroll", k), c)) u[s] = v(i, s);
          return this.each(function (s, l) {
            if (l === e) t(h.selector).lazyLoadXT(i);
            else {
              var c = r && p(l, a),
                g = t(l).data(a, d ? -1 : 1);
              if (c) return void k();
              o && "IMG" === l.tagName && !l.src && (l.src = o),
                (g[n] = f({}, u)),
                w("init", g),
                m.push(g),
                k();
            }
          });
        }),
        t(i).ready(function () {
          w("start", d),
            d.on(h.updateEvent, k).on(h.forceEvent, S),
            t(i).on(h.updateEvent, k),
            h.autoInit && (d.on(h.loadEvent, C), C());
        });
    })(window.jQuery || window.Zepto || window.$, window, document),
    (function (t, e) {
      "use strict";
      function i(i, n) {
        (this.$input = t(i)),
          (this.$rating = t("<span></span>")
            .css({ cursor: "default" })
            .insertBefore(this.$input)),
          (this.options = (function (i) {
            return (
              (i.start = parseInt(i.start, 10)),
              (i.start = isNaN(i.start) ? e : i.start),
              (i.stop = parseInt(i.stop, 10)),
              (i.stop = isNaN(i.stop) ? i.start + s || e : i.stop),
              (i.step = parseInt(i.step, 10) || e),
              (i.fractions = Math.abs(parseInt(i.fractions, 10)) || e),
              (i.scale = Math.abs(parseInt(i.scale, 10)) || e),
              ((i = t.extend({}, t.fn.rating.defaults, i)).filledSelected =
                i.filledSelected || i.filled),
              i
            );
          })(t.extend({}, this.$input.data(), n))),
          this._init();
      }
      var s = 5;
      (i.prototype = {
        _init: function () {
          for (
            var i = this,
              s = this.$input,
              n = this.$rating,
              a = function (t) {
                return function (i) {
                  s.prop("disabled") ||
                    s.prop("readonly") ||
                    s.data("readonly") !== e ||
                    t.call(this, i);
                };
              },
              o = 1;
            o <= this._rateToIndex(this.options.stop);
            o++
          ) {
            var r = t('<div class="rating-symbol"></div>').css({
              display: "inline-block",
              position: "relative",
            });
            t(
              '<div class="rating-symbol-background ' +
                this.options.empty +
                '"></div>'
            ).appendTo(r),
              t('<div class="rating-symbol-foreground"></div>')
                .append('<span class="' + this.options.filled + '"></span>')
                .css({
                  display: "inline-block",
                  position: "absolute",
                  overflow: "hidden",
                  left: 0,
                  right: 0,
                  width: 0,
                })
                .appendTo(r),
              n.append(r),
              this.options.extendSymbol.call(r, this._indexToRate(o));
          }
          this._updateRate(s.val()),
            s.on("change", function () {
              i._updateRate(t(this).val());
            });
          var l,
            h = function (e) {
              var s = t(e.currentTarget),
                n = Math.abs(
                  (e.pageX || e.originalEvent.touches[0].pageX) -
                    (("rtl" === s.css("direction") && s.width()) +
                      s.offset().left)
                );
              return (
                (n = n > 0 ? n : 0.1 * i.options.scale), s.index() + n / s.width()
              );
            };
          n.on(
            "mousedown touchstart",
            ".rating-symbol",
            a(function (t) {
              s.val(i._indexToRate(h(t))).change();
            })
          )
            .on(
              "mousemove touchmove",
              ".rating-symbol",
              a(function (s) {
                var n = i._roundToFraction(h(s));
                n !== l &&
                  (l !== e && t(this).trigger("rating.rateleave"),
                  (l = n),
                  t(this).trigger("rating.rateenter", [i._indexToRate(l)])),
                  i._fillUntil(n);
              })
            )
            .on(
              "mouseleave touchend",
              ".rating-symbol",
              a(function () {
                (l = e),
                  t(this).trigger("rating.rateleave"),
                  i._fillUntil(i._rateToIndex(parseFloat(s.val())));
              })
            );
        },
        _fillUntil: function (t) {
          var e = this.$rating,
            i = Math.floor(t);
          e.find(".rating-symbol-background")
            .css("visibility", "visible")
            .slice(0, i)
            .css("visibility", "hidden");
          var s = e.find(".rating-symbol-foreground");
          s.width(0),
            s
              .slice(0, i)
              .width("auto")
              .find("span")
              .attr("class", this.options.filled),
            s
              .eq(t % 1 ? i : i - 1)
              .find("span")
              .attr("class", this.options.filledSelected),
            s.eq(i).width((t % 1) * 100 + "%");
        },
        _indexToRate: function (t) {
          return (
            this.options.start +
            Math.floor(t) * this.options.step +
            this.options.step * this._roundToFraction(t % 1)
          );
        },
        _rateToIndex: function (t) {
          return (t - this.options.start) / this.options.step;
        },
        _roundToFraction: function (t) {
          var e =
              Math.ceil((t % 1) * this.options.fractions) /
              this.options.fractions,
            i = Math.pow(10, this.options.scale);
          return Math.floor(t) + Math.floor(e * i) / i;
        },
        _contains: function (t) {
          var e = this.options.step > 0 ? this.options.start : this.options.stop,
            i = this.options.step > 0 ? this.options.stop : this.options.start;
          return e <= t && t <= i;
        },
        _updateRate: function (t) {
          var e = parseFloat(t);
          this._contains(e)
            ? (this._fillUntil(this._rateToIndex(e)), this.$input.val(e))
            : "" === t && (this._fillUntil(0), this.$input.val(""));
        },
        rate: function (t) {
          return t === e ? this.$input.val() : void this._updateRate(t);
        },
      }),
        (t.fn.rating = function (s) {
          var n,
            a = Array.prototype.slice.call(arguments, 1);
          return (
            this.each(function () {
              var e = t(this),
                o = e.data("rating");
              o || e.data("rating", (o = new i(this, s))),
                "string" == typeof s && "_" !== s[0] && (n = o[s].apply(o, a));
            }),
            n !== e ? n : this
          );
        }),
        (t.fn.rating.defaults = {
          filled: "glyphicon glyphicon-star",
          filledSelected: e,
          empty: "glyphicon glyphicon-star-empty",
          start: 0,
          stop: s,
          step: 1,
          fractions: 1,
          scale: 3,
          extendSymbol: function (t) {},
        }),
        t(function () {
          t("input.rating").rating();
        });
    })(jQuery),
    (function (t, e, i, s) {
      function n(e, i) {
        (this.settings = null),
          (this.options = t.extend({}, n.Defaults, i)),
          (this.$element = t(e)),
          (this._handlers = {}),
          (this._plugins = {}),
          (this._supress = {}),
          (this._current = null),
          (this._speed = null),
          (this._coordinates = []),
          (this._breakpoint = null),
          (this._width = null),
          (this._items = []),
          (this._clones = []),
          (this._mergers = []),
          (this._widths = []),
          (this._invalidated = {}),
          (this._pipe = []),
          (this._drag = {
            time: null,
            target: null,
            pointer: null,
            stage: { start: null, current: null },
            direction: null,
          }),
          (this._states = {
            current: {},
            tags: {
              initializing: ["busy"],
              animating: ["busy"],
              dragging: ["interacting"],
            },
          }),
          t.each(
            ["onResize", "onThrottledResize"],
            t.proxy(function (e, i) {
              this._handlers[i] = t.proxy(this[i], this);
            }, this)
          ),
          t.each(
            n.Plugins,
            t.proxy(function (t, e) {
              this._plugins[t.charAt(0).toLowerCase() + t.slice(1)] = new e(this);
            }, this)
          ),
          t.each(
            n.Workers,
            t.proxy(function (e, i) {
              this._pipe.push({ filter: i.filter, run: t.proxy(i.run, this) });
            }, this)
          ),
          this.setup(),
          this.initialize();
      }
      (n.Defaults = {
        items: 3,
        loop: !1,
        center: !1,
        rewind: !1,
        mouseDrag: !0,
        touchDrag: !0,
        pullDrag: !0,
        freeDrag: !1,
        margin: 0,
        stagePadding: 0,
        merge: !1,
        mergeFit: !0,
        autoWidth: !1,
        startPosition: 0,
        rtl: !1,
        smartSpeed: 250,
        fluidSpeed: !1,
        dragEndSpeed: !1,
        responsive: {},
        responsiveRefreshRate: 200,
        responsiveBaseElement: e,
        fallbackEasing: "swing",
        info: !1,
        nestedItemSelector: !1,
        itemElement: "div",
        stageElement: "div",
        refreshClass: "owl-refresh",
        loadedClass: "owl-loaded",
        loadingClass: "owl-loading",
        rtlClass: "owl-rtl",
        responsiveClass: "owl-responsive",
        dragClass: "owl-drag",
        itemClass: "owl-item",
        stageClass: "owl-stage",
        stageOuterClass: "owl-stage-outer",
        grabClass: "owl-grab",
      }),
        (n.Width = { Default: "default", Inner: "inner", Outer: "outer" }),
        (n.Type = { Event: "event", State: "state" }),
        (n.Plugins = {}),
        (n.Workers = [
          {
            filter: ["width", "settings"],
            run: function () {
              this._width = this.$element.width();
            },
          },
          {
            filter: ["width", "items", "settings"],
            run: function (t) {
              t.current =
                this._items && this._items[this.relative(this._current)];
            },
          },
          {
            filter: ["items", "settings"],
            run: function () {
              this.$stage.children(".cloned").remove();
            },
          },
          {
            filter: ["width", "items", "settings"],
            run: function (t) {
              var e = this.settings.margin || "",
                i = !this.settings.autoWidth,
                s = this.settings.rtl,
                n = {
                  width: "auto",
                  "margin-left": s ? e : "",
                  "margin-right": s ? "" : e,
                };
              !i && this.$stage.children().css(n), (t.css = n);
            },
          },
          {
            filter: ["width", "items", "settings"],
            run: function (t) {
              var e =
                  (this.width() / this.settings.items).toFixed(3) -
                  this.settings.margin,
                i = null,
                s = this._items.length,
                n = !this.settings.autoWidth,
                a = [];
              for (t.items = { merge: !1, width: e }; s--; )
                (i = this._mergers[s]),
                  (i =
                    (this.settings.mergeFit &&
                      Math.min(i, this.settings.items)) ||
                    i),
                  (t.items.merge = i > 1 || t.items.merge),
                  (a[s] = n ? e * i : this._items[s].width());
              this._widths = a;
            },
          },
          {
            filter: ["items", "settings"],
            run: function () {
              var e = [],
                i = this._items,
                s = this.settings,
                n = Math.max(2 * s.items, 4),
                a = 2 * Math.ceil(i.length / 2),
                o = s.loop && i.length ? (s.rewind ? n : Math.max(n, a)) : 0,
                r = "",
                l = "";
              for (o /= 2; o--; )
                e.push(this.normalize(e.length / 2, !0)),
                  (r += i[e[e.length - 1]][0].outerHTML),
                  e.push(this.normalize(i.length - 1 - (e.length - 1) / 2, !0)),
                  (l = i[e[e.length - 1]][0].outerHTML + l);
              (this._clones = e),
                t(r).addClass("cloned").appendTo(this.$stage),
                t(l).addClass("cloned").prependTo(this.$stage);
            },
          },
          {
            filter: ["width", "items", "settings"],
            run: function () {
              for (
                var t = this.settings.rtl ? 1 : -1,
                  e = this._clones.length + this._items.length,
                  i = -1,
                  s = 0,
                  n = 0,
                  a = [];
                ++i < e;

              )
                (s = a[i - 1] || 0),
                  (n = this._widths[this.relative(i)] + this.settings.margin),
                  a.push(s + n * t);
              this._coordinates = a;
            },
          },
          {
            filter: ["width", "items", "settings"],
            run: function () {
              var t = this.settings.stagePadding,
                e = this._coordinates,
                i = {
                  width: Math.ceil(Math.abs(e[e.length - 1])) + 2 * t,
                  "padding-left": t || "",
                  "padding-right": t || "",
                };
              this.$stage.css(i);
            },
          },
          {
            filter: ["width", "items", "settings"],
            run: function (t) {
              var e = this._coordinates.length,
                i = !this.settings.autoWidth,
                s = this.$stage.children();
              if (i && t.items.merge)
                for (; e--; )
                  (t.css.width = this._widths[this.relative(e)]),
                    s.eq(e).css(t.css);
              else i && ((t.css.width = t.items.width), s.css(t.css));
            },
          },
          {
            filter: ["items"],
            run: function () {
              this._coordinates.length < 1 && this.$stage.removeAttr("style");
            },
          },
          {
            filter: ["width", "items", "settings"],
            run: function (t) {
              (t.current = t.current
                ? this.$stage.children().index(t.current)
                : 0),
                (t.current = Math.max(
                  this.minimum(),
                  Math.min(this.maximum(), t.current)
                )),
                this.reset(t.current);
            },
          },
          {
            filter: ["position"],
            run: function () {
              this.animate(this.coordinates(this._current));
            },
          },
          {
            filter: ["width", "position", "items", "settings"],
            run: function () {
              var t,
                e,
                i,
                s,
                n = this.settings.rtl ? 1 : -1,
                a = 2 * this.settings.stagePadding,
                o = this.coordinates(this.current()) + a,
                r = o + this.width() * n,
                l = [];
              for (i = 0, s = this._coordinates.length; i < s; i++)
                (t = this._coordinates[i - 1] || 0),
                  (e = Math.abs(this._coordinates[i]) + a * n),
                  ((this.op(t, "<=", o) && this.op(t, ">", r)) ||
                    (this.op(e, "<", o) && this.op(e, ">", r))) &&
                    l.push(i);
              this.$stage.children(".active").removeClass("active"),
                this.$stage
                  .children(":eq(" + l.join("), :eq(") + ")")
                  .addClass("active"),
                this.settings.center &&
                  (this.$stage.children(".center").removeClass("center"),
                  this.$stage.children().eq(this.current()).addClass("center"));
            },
          },
        ]),
        (n.prototype.initialize = function () {
          var e, i, s;
          this.enter("initializing"),
            this.trigger("initialize"),
            this.$element.toggleClass(this.settings.rtlClass, this.settings.rtl),
            this.settings.autoWidth &&
              !this.is("pre-loading") &&
              ((e = this.$element.find("img")),
              (i = this.settings.nestedItemSelector
                ? "." + this.settings.nestedItemSelector
                : void 0),
              (s = this.$element.children(i).width()),
              e.length && s <= 0 && this.preloadAutoWidthImages(e)),
            this.$element.addClass(this.options.loadingClass),
            (this.$stage = t(
              "<" +
                this.settings.stageElement +
                ' class="' +
                this.settings.stageClass +
                '"/>'
            ).wrap('<div class="' + this.settings.stageOuterClass + '"/>')),
            this.$element.append(this.$stage.parent()),
            this.replace(this.$element.children().not(this.$stage.parent())),
            this.$element.is(":visible")
              ? this.refresh()
              : this.invalidate("width"),
            this.$element
              .removeClass(this.options.loadingClass)
              .addClass(this.options.loadedClass),
            this.registerEventHandlers(),
            this.leave("initializing"),
            this.trigger("initialized");
        }),
        (n.prototype.setup = function () {
          var e = this.viewport(),
            i = this.options.responsive,
            s = -1,
            n = null;
          i
            ? (t.each(i, function (t) {
                t <= e && t > s && (s = Number(t));
              }),
              "function" ==
                typeof (n = t.extend({}, this.options, i[s])).stagePadding &&
                (n.stagePadding = n.stagePadding()),
              delete n.responsive,
              n.responsiveClass &&
                this.$element.attr(
                  "class",
                  this.$element
                    .attr("class")
                    .replace(
                      new RegExp(
                        "(" + this.options.responsiveClass + "-)\\S+\\s",
                        "g"
                      ),
                      "$1" + s
                    )
                ))
            : (n = t.extend({}, this.options)),
            this.trigger("change", { property: { name: "settings", value: n } }),
            (this._breakpoint = s),
            (this.settings = n),
            this.invalidate("settings"),
            this.trigger("changed", {
              property: { name: "settings", value: this.settings },
            });
        }),
        (n.prototype.optionsLogic = function () {
          this.settings.autoWidth &&
            ((this.settings.stagePadding = !1), (this.settings.merge = !1));
        }),
        (n.prototype.prepare = function (e) {
          var i = this.trigger("prepare", { content: e });
          return (
            i.data ||
              (i.data = t("<" + this.settings.itemElement + "/>")
                .addClass(this.options.itemClass)
                .append(e)),
            this.trigger("prepared", { content: i.data }),
            i.data
          );
        }),
        (n.prototype.update = function () {
          for (
            var e = 0,
              i = this._pipe.length,
              s = t.proxy(function (t) {
                return this[t];
              }, this._invalidated),
              n = {};
            e < i;

          )
            (this._invalidated.all ||
              t.grep(this._pipe[e].filter, s).length > 0) &&
              this._pipe[e].run(n),
              e++;
          (this._invalidated = {}), !this.is("valid") && this.enter("valid");
        }),
        (n.prototype.width = function (t) {
          switch ((t = t || n.Width.Default)) {
            case n.Width.Inner:
            case n.Width.Outer:
              return this._width;
            default:
              return (
                this._width -
                2 * this.settings.stagePadding +
                this.settings.margin
              );
          }
        }),
        (n.prototype.refresh = function () {
          this.enter("refreshing"),
            this.trigger("refresh"),
            this.setup(),
            this.optionsLogic(),
            this.$element.addClass(this.options.refreshClass),
            this.update(),
            this.$element.removeClass(this.options.refreshClass),
            this.leave("refreshing"),
            this.trigger("refreshed");
        }),
        (n.prototype.onThrottledResize = function () {
          e.clearTimeout(this.resizeTimer),
            (this.resizeTimer = e.setTimeout(
              this._handlers.onResize,
              this.settings.responsiveRefreshRate
            ));
        }),
        (n.prototype.onResize = function () {
          return (
            !!this._items.length &&
            this._width !== this.$element.width() &&
            !!this.$element.is(":visible") &&
            (this.enter("resizing"),
            this.trigger("resize").isDefaultPrevented()
              ? (this.leave("resizing"), !1)
              : (this.invalidate("width"),
                this.refresh(),
                this.leave("resizing"),
                void this.trigger("resized")))
          );
        }),
        (n.prototype.registerEventHandlers = function () {
          t.support.transition &&
            this.$stage.on(
              t.support.transition.end + ".owl.core",
              t.proxy(this.onTransitionEnd, this)
            ),
            !1 !== this.settings.responsive &&
              this.on(e, "resize", this._handlers.onThrottledResize),
            this.settings.mouseDrag &&
              (this.$element.addClass(this.options.dragClass),
              this.$stage.on(
                "mousedown.owl.core",
                t.proxy(this.onDragStart, this)
              ),
              this.$stage.on(
                "dragstart.owl.core selectstart.owl.core",
                function () {
                  return !1;
                }
              )),
            this.settings.touchDrag &&
              (this.$stage.on(
                "touchstart.owl.core",
                t.proxy(this.onDragStart, this)
              ),
              this.$stage.on(
                "touchcancel.owl.core",
                t.proxy(this.onDragEnd, this)
              ));
        }),
        (n.prototype.onDragStart = function (e) {
          var s = null;
          3 !== e.which &&
            (t.support.transform
              ? (s = {
                  x: (s = this.$stage
                    .css("transform")
                    .replace(/.*\(|\)| /g, "")
                    .split(","))[16 === s.length ? 12 : 4],
                  y: s[16 === s.length ? 13 : 5],
                })
              : ((s = this.$stage.position()),
                (s = {
                  x: this.settings.rtl
                    ? s.left +
                      this.$stage.width() -
                      this.width() +
                      this.settings.margin
                    : s.left,
                  y: s.top,
                })),
            this.is("animating") &&
              (t.support.transform ? this.animate(s.x) : this.$stage.stop(),
              this.invalidate("position")),
            this.$element.toggleClass(
              this.options.grabClass,
              "mousedown" === e.type
            ),
            this.speed(0),
            (this._drag.time = new Date().getTime()),
            (this._drag.target = t(e.target)),
            (this._drag.stage.start = s),
            (this._drag.stage.current = s),
            (this._drag.pointer = this.pointer(e)),
            t(i).on(
              "mouseup.owl.core touchend.owl.core",
              t.proxy(this.onDragEnd, this)
            ),
            t(i).one(
              "mousemove.owl.core touchmove.owl.core",
              t.proxy(function (e) {
                var s = this.difference(this._drag.pointer, this.pointer(e));
                t(i).on(
                  "mousemove.owl.core touchmove.owl.core",
                  t.proxy(this.onDragMove, this)
                ),
                  (Math.abs(s.x) < Math.abs(s.y) && this.is("valid")) ||
                    (e.preventDefault(),
                    this.enter("dragging"),
                    this.trigger("drag"));
              }, this)
            ));
        }),
        (n.prototype.onDragMove = function (t) {
          var e = null,
            i = null,
            s = null,
            n = this.difference(this._drag.pointer, this.pointer(t)),
            a = this.difference(this._drag.stage.start, n);
          this.is("dragging") &&
            (t.preventDefault(),
            this.settings.loop
              ? ((e = this.coordinates(this.minimum())),
                (i = this.coordinates(this.maximum() + 1) - e),
                (a.x = ((((a.x - e) % i) + i) % i) + e))
              : ((e = this.settings.rtl
                  ? this.coordinates(this.maximum())
                  : this.coordinates(this.minimum())),
                (i = this.settings.rtl
                  ? this.coordinates(this.minimum())
                  : this.coordinates(this.maximum())),
                (s = this.settings.pullDrag ? (-1 * n.x) / 5 : 0),
                (a.x = Math.max(Math.min(a.x, e + s), i + s))),
            (this._drag.stage.current = a),
            this.animate(a.x));
        }),
        (n.prototype.onDragEnd = function (e) {
          var s = this.difference(this._drag.pointer, this.pointer(e)),
            n = this._drag.stage.current,
            a = (s.x > 0) ^ this.settings.rtl ? "left" : "right";
          t(i).off(".owl.core"),
            this.$element.removeClass(this.options.grabClass),
            ((0 !== s.x && this.is("dragging")) || !this.is("valid")) &&
              (this.speed(this.settings.dragEndSpeed || this.settings.smartSpeed),
              this.current(
                this.closest(n.x, 0 !== s.x ? a : this._drag.direction)
              ),
              this.invalidate("position"),
              this.update(),
              (this._drag.direction = a),
              (Math.abs(s.x) > 3 ||
                new Date().getTime() - this._drag.time > 300) &&
                this._drag.target.one("click.owl.core", function () {
                  return !1;
                })),
            this.is("dragging") &&
              (this.leave("dragging"), this.trigger("dragged"));
        }),
        (n.prototype.closest = function (e, i) {
          var s = -1,
            n = this.width(),
            a = this.coordinates();
          return (
            this.settings.freeDrag ||
              t.each(
                a,
                t.proxy(function (t, o) {
                  return (
                    "left" === i && e > o - 30 && e < o + 30
                      ? (s = t)
                      : "right" === i && e > o - n - 30 && e < o - n + 30
                      ? (s = t + 1)
                      : this.op(e, "<", o) &&
                        this.op(e, ">", a[t + 1] || o - n) &&
                        (s = "left" === i ? t + 1 : t),
                    -1 === s
                  );
                }, this)
              ),
            this.settings.loop ||
              (this.op(e, ">", a[this.minimum()])
                ? (s = e = this.minimum())
                : this.op(e, "<", a[this.maximum()]) && (s = e = this.maximum())),
            s
          );
        }),
        (n.prototype.animate = function (e) {
          var i = this.speed() > 0;
          this.is("animating") && this.onTransitionEnd(),
            i && (this.enter("animating"), this.trigger("translate")),
            t.support.transform3d && t.support.transition
              ? this.$stage.css({
                  transform: "translate3d(" + e + "px,0px,0px)",
                  transition: this.speed() / 1e3 + "s",
                })
              : i
              ? this.$stage.animate(
                  { left: e + "px" },
                  this.speed(),
                  this.settings.fallbackEasing,
                  t.proxy(this.onTransitionEnd, this)
                )
              : this.$stage.css({ left: e + "px" });
        }),
        (n.prototype.is = function (t) {
          return this._states.current[t] && this._states.current[t] > 0;
        }),
        (n.prototype.current = function (t) {
          if (void 0 === t) return this._current;
          if (0 !== this._items.length) {
            if (((t = this.normalize(t)), this._current !== t)) {
              var e = this.trigger("change", {
                property: { name: "position", value: t },
              });
              void 0 !== e.data && (t = this.normalize(e.data)),
                (this._current = t),
                this.invalidate("position"),
                this.trigger("changed", {
                  property: { name: "position", value: this._current },
                });
            }
            return this._current;
          }
        }),
        (n.prototype.invalidate = function (e) {
          return (
            "string" === t.type(e) &&
              ((this._invalidated[e] = !0),
              this.is("valid") && this.leave("valid")),
            t.map(this._invalidated, function (t, e) {
              return e;
            })
          );
        }),
        (n.prototype.reset = function (t) {
          void 0 !== (t = this.normalize(t)) &&
            ((this._speed = 0),
            (this._current = t),
            this.suppress(["translate", "translated"]),
            this.animate(this.coordinates(t)),
            this.release(["translate", "translated"]));
        }),
        (n.prototype.normalize = function (t, e) {
          var i = this._items.length,
            s = e ? 0 : this._clones.length;
          return (
            !this.isNumeric(t) || i < 1
              ? (t = void 0)
              : (t < 0 || t >= i + s) &&
                (t = ((((t - s / 2) % i) + i) % i) + s / 2),
            t
          );
        }),
        (n.prototype.relative = function (t) {
          return (t -= this._clones.length / 2), this.normalize(t, !0);
        }),
        (n.prototype.maximum = function (t) {
          var e,
            i,
            s,
            n = this.settings,
            a = this._coordinates.length;
          if (n.loop) a = this._clones.length / 2 + this._items.length - 1;
          else if (n.autoWidth || n.merge) {
            for (
              e = this._items.length,
                i = this._items[--e].width(),
                s = this.$element.width();
              e-- && !((i += this._items[e].width() + this.settings.margin) > s);

            );
            a = e + 1;
          } else
            a = n.center ? this._items.length - 1 : this._items.length - n.items;
          return t && (a -= this._clones.length / 2), Math.max(a, 0);
        }),
        (n.prototype.minimum = function (t) {
          return t ? 0 : this._clones.length / 2;
        }),
        (n.prototype.items = function (t) {
          return void 0 === t
            ? this._items.slice()
            : ((t = this.normalize(t, !0)), this._items[t]);
        }),
        (n.prototype.mergers = function (t) {
          return void 0 === t
            ? this._mergers.slice()
            : ((t = this.normalize(t, !0)), this._mergers[t]);
        }),
        (n.prototype.clones = function (e) {
          var i = this._clones.length / 2,
            s = i + this._items.length,
            n = function (t) {
              return t % 2 == 0 ? s + t / 2 : i - (t + 1) / 2;
            };
          return void 0 === e
            ? t.map(this._clones, function (t, e) {
                return n(e);
              })
            : t.map(this._clones, function (t, i) {
                return t === e ? n(i) : null;
              });
        }),
        (n.prototype.speed = function (t) {
          return void 0 !== t && (this._speed = t), this._speed;
        }),
        (n.prototype.coordinates = function (e) {
          var i,
            s = 1,
            n = e - 1;
          return void 0 === e
            ? t.map(
                this._coordinates,
                t.proxy(function (t, e) {
                  return this.coordinates(e);
                }, this)
              )
            : (this.settings.center
                ? (this.settings.rtl && ((s = -1), (n = e + 1)),
                  (i = this._coordinates[e]),
                  (i +=
                    ((this.width() - i + (this._coordinates[n] || 0)) / 2) * s))
                : (i = this._coordinates[n] || 0),
              (i = Math.ceil(i)));
        }),
        (n.prototype.duration = function (t, e, i) {
          return 0 === i
            ? 0
            : Math.min(Math.max(Math.abs(e - t), 1), 6) *
                Math.abs(i || this.settings.smartSpeed);
        }),
        (n.prototype.to = function (t, e) {
          var i = this.current(),
            s = null,
            n = t - this.relative(i),
            a = (n > 0) - (n < 0),
            o = this._items.length,
            r = this.minimum(),
            l = this.maximum();
          this.settings.loop
            ? (!this.settings.rewind && Math.abs(n) > o / 2 && (n += -1 * a * o),
              (s = (((((t = i + n) - r) % o) + o) % o) + r) !== t &&
                s - n <= l &&
                s - n > 0 &&
                ((i = s - n), (t = s), this.reset(i)))
            : (t = this.settings.rewind
                ? ((t % (l += 1)) + l) % l
                : Math.max(r, Math.min(l, t))),
            this.speed(this.duration(i, t, e)),
            this.current(t),
            this.$element.is(":visible") && this.update();
        }),
        (n.prototype.next = function (t) {
          (t = t || !1), this.to(this.relative(this.current()) + 1, t);
        }),
        (n.prototype.prev = function (t) {
          (t = t || !1), this.to(this.relative(this.current()) - 1, t);
        }),
        (n.prototype.onTransitionEnd = function (t) {
          if (
            void 0 !== t &&
            (t.stopPropagation(),
            (t.target || t.srcElement || t.originalTarget) !== this.$stage.get(0))
          )
            return !1;
          this.leave("animating"), this.trigger("translated");
        }),
        (n.prototype.viewport = function () {
          var s;
          if (this.options.responsiveBaseElement !== e)
            s = t(this.options.responsiveBaseElement).width();
          else if (e.innerWidth) s = e.innerWidth;
          else {
            if (!i.documentElement || !i.documentElement.clientWidth)
              throw "Can not detect viewport width.";
            s = i.documentElement.clientWidth;
          }
          return s;
        }),
        (n.prototype.replace = function (e) {
          this.$stage.empty(),
            (this._items = []),
            e && (e = e instanceof jQuery ? e : t(e)),
            this.settings.nestedItemSelector &&
              (e = e.find("." + this.settings.nestedItemSelector)),
            e
              .filter(function () {
                return 1 === this.nodeType;
              })
              .each(
                t.proxy(function (t, e) {
                  (e = this.prepare(e)),
                    this.$stage.append(e),
                    this._items.push(e),
                    this._mergers.push(
                      1 *
                        e
                          .find("[data-merge]")
                          .addBack("[data-merge]")
                          .attr("data-merge") || 1
                    );
                }, this)
              ),
            this.reset(
              this.isNumeric(this.settings.startPosition)
                ? this.settings.startPosition
                : 0
            ),
            this.invalidate("items");
        }),
        (n.prototype.add = function (e, i) {
          var s = this.relative(this._current);
          (i = void 0 === i ? this._items.length : this.normalize(i, !0)),
            (e = e instanceof jQuery ? e : t(e)),
            this.trigger("add", { content: e, position: i }),
            (e = this.prepare(e)),
            0 === this._items.length || i === this._items.length
              ? (0 === this._items.length && this.$stage.append(e),
                0 !== this._items.length && this._items[i - 1].after(e),
                this._items.push(e),
                this._mergers.push(
                  1 *
                    e
                      .find("[data-merge]")
                      .addBack("[data-merge]")
                      .attr("data-merge") || 1
                ))
              : (this._items[i].before(e),
                this._items.splice(i, 0, e),
                this._mergers.splice(
                  i,
                  0,
                  1 *
                    e
                      .find("[data-merge]")
                      .addBack("[data-merge]")
                      .attr("data-merge") || 1
                )),
            this._items[s] && this.reset(this._items[s].index()),
            this.invalidate("items"),
            this.trigger("added", { content: e, position: i });
        }),
        (n.prototype.remove = function (t) {
          void 0 !== (t = this.normalize(t, !0)) &&
            (this.trigger("remove", { content: this._items[t], position: t }),
            this._items[t].remove(),
            this._items.splice(t, 1),
            this._mergers.splice(t, 1),
            this.invalidate("items"),
            this.trigger("removed", { content: null, position: t }));
        }),
        (n.prototype.preloadAutoWidthImages = function (e) {
          e.each(
            t.proxy(function (e, i) {
              this.enter("pre-loading"),
                (i = t(i)),
                t(new Image())
                  .one(
                    "load",
                    t.proxy(function (t) {
                      i.attr("src", t.target.src),
                        i.css("opacity", 1),
                        this.leave("pre-loading"),
                        !this.is("pre-loading") &&
                          !this.is("initializing") &&
                          this.refresh();
                    }, this)
                  )
                  .attr(
                    "src",
                    i.attr("src") ||
                      i.attr("data-src") ||
                      i.attr("data-src-retina")
                  );
            }, this)
          );
        }),
        (n.prototype.destroy = function () {
          for (var s in (this.$element.off(".owl.core"),
          this.$stage.off(".owl.core"),
          t(i).off(".owl.core"),
          !1 !== this.settings.responsive &&
            (e.clearTimeout(this.resizeTimer),
            this.off(e, "resize", this._handlers.onThrottledResize)),
          this._plugins))
            this._plugins[s].destroy();
          this.$stage.children(".cloned").remove(),
            this.$stage.unwrap(),
            this.$stage.children().contents().unwrap(),
            this.$stage.children().unwrap(),
            this.$element
              .removeClass(this.options.refreshClass)
              .removeClass(this.options.loadingClass)
              .removeClass(this.options.loadedClass)
              .removeClass(this.options.rtlClass)
              .removeClass(this.options.dragClass)
              .removeClass(this.options.grabClass)
              .attr(
                "class",
                this.$element
                  .attr("class")
                  .replace(
                    new RegExp(this.options.responsiveClass + "-\\S+\\s", "g"),
                    ""
                  )
              )
              .removeData("owl.carousel");
        }),
        (n.prototype.op = function (t, e, i) {
          var s = this.settings.rtl;
          switch (e) {
            case "<":
              return s ? t > i : t < i;
            case ">":
              return s ? t < i : t > i;
            case ">=":
              return s ? t <= i : t >= i;
            case "<=":
              return s ? t >= i : t <= i;
          }
        }),
        (n.prototype.on = function (t, e, i, s) {
          t.addEventListener
            ? t.addEventListener(e, i, s)
            : t.attachEvent && t.attachEvent("on" + e, i);
        }),
        (n.prototype.off = function (t, e, i, s) {
          t.removeEventListener
            ? t.removeEventListener(e, i, s)
            : t.detachEvent && t.detachEvent("on" + e, i);
        }),
        (n.prototype.trigger = function (e, i, s, a, o) {
          var r = { item: { count: this._items.length, index: this.current() } },
            l = t.camelCase(
              t
                .grep(["on", e, s], function (t) {
                  return t;
                })
                .join("-")
                .toLowerCase()
            ),
            h = t.Event(
              [e, "owl", s || "carousel"].join(".").toLowerCase(),
              t.extend({ relatedTarget: this }, r, i)
            );
          return (
            this._supress[e] ||
              (t.each(this._plugins, function (t, e) {
                e.onTrigger && e.onTrigger(h);
              }),
              this.register({ type: n.Type.Event, name: e }),
              this.$element.trigger(h),
              this.settings &&
                "function" == typeof this.settings[l] &&
                this.settings[l].call(this, h)),
            h
          );
        }),
        (n.prototype.enter = function (e) {
          t.each(
            [e].concat(this._states.tags[e] || []),
            t.proxy(function (t, e) {
              void 0 === this._states.current[e] && (this._states.current[e] = 0),
                this._states.current[e]++;
            }, this)
          );
        }),
        (n.prototype.leave = function (e) {
          t.each(
            [e].concat(this._states.tags[e] || []),
            t.proxy(function (t, e) {
              this._states.current[e]--;
            }, this)
          );
        }),
        (n.prototype.register = function (e) {
          if (e.type === n.Type.Event) {
            if (
              (t.event.special[e.name] || (t.event.special[e.name] = {}),
              !t.event.special[e.name].owl)
            ) {
              var i = t.event.special[e.name]._default;
              (t.event.special[e.name]._default = function (t) {
                return !i ||
                  !i.apply ||
                  (t.namespace && -1 !== t.namespace.indexOf("owl"))
                  ? t.namespace && t.namespace.indexOf("owl") > -1
                  : i.apply(this, arguments);
              }),
                (t.event.special[e.name].owl = !0);
            }
          } else
            e.type === n.Type.State &&
              (this._states.tags[e.name]
                ? (this._states.tags[e.name] = this._states.tags[e.name].concat(
                    e.tags
                  ))
                : (this._states.tags[e.name] = e.tags),
              (this._states.tags[e.name] = t.grep(
                this._states.tags[e.name],
                t.proxy(function (i, s) {
                  return t.inArray(i, this._states.tags[e.name]) === s;
                }, this)
              )));
        }),
        (n.prototype.suppress = function (e) {
          t.each(
            e,
            t.proxy(function (t, e) {
              this._supress[e] = !0;
            }, this)
          );
        }),
        (n.prototype.release = function (e) {
          t.each(
            e,
            t.proxy(function (t, e) {
              delete this._supress[e];
            }, this)
          );
        }),
        (n.prototype.pointer = function (t) {
          var i = { x: null, y: null };
          return (
            (t =
              (t = t.originalEvent || t || e.event).touches && t.touches.length
                ? t.touches[0]
                : t.changedTouches && t.changedTouches.length
                ? t.changedTouches[0]
                : t).pageX
              ? ((i.x = t.pageX), (i.y = t.pageY))
              : ((i.x = t.clientX), (i.y = t.clientY)),
            i
          );
        }),
        (n.prototype.isNumeric = function (t) {
          return !isNaN(parseFloat(t));
        }),
        (n.prototype.difference = function (t, e) {
          return { x: t.x - e.x, y: t.y - e.y };
        }),
        (t.fn.owlCarousel = function (e) {
          var i = Array.prototype.slice.call(arguments, 1);
          return this.each(function () {
            var s = t(this),
              a = s.data("owl.carousel");
            a ||
              ((a = new n(this, "object" == _typeof(e) && e)),
              s.data("owl.carousel", a),
              t.each(
                [
                  "next",
                  "prev",
                  "to",
                  "destroy",
                  "refresh",
                  "replace",
                  "add",
                  "remove",
                ],
                function (e, i) {
                  a.register({ type: n.Type.Event, name: i }),
                    a.$element.on(
                      i + ".owl.carousel.core",
                      t.proxy(function (t) {
                        t.namespace &&
                          t.relatedTarget !== this &&
                          (this.suppress([i]),
                          a[i].apply(this, [].slice.call(arguments, 1)),
                          this.release([i]));
                      }, a)
                    );
                }
              )),
              "string" == typeof e && "_" !== e.charAt(0) && a[e].apply(a, i);
          });
        }),
        (t.fn.owlCarousel.Constructor = n);
    })(window.Zepto || window.jQuery, window, document),
    (function (t, e, i, s) {
      var n = function e(i) {
        (this._core = i),
          (this._interval = null),
          (this._visible = null),
          (this._handlers = {
            "initialized.owl.carousel": t.proxy(function (t) {
              t.namespace && this._core.settings.autoRefresh && this.watch();
            }, this),
          }),
          (this._core.options = t.extend({}, e.Defaults, this._core.options)),
          this._core.$element.on(this._handlers);
      };
      (n.Defaults = { autoRefresh: !0, autoRefreshInterval: 500 }),
        (n.prototype.watch = function () {
          this._interval ||
            ((this._visible = this._core.$element.is(":visible")),
            (this._interval = e.setInterval(
              t.proxy(this.refresh, this),
              this._core.settings.autoRefreshInterval
            )));
        }),
        (n.prototype.refresh = function () {
          this._core.$element.is(":visible") !== this._visible &&
            ((this._visible = !this._visible),
            this._core.$element.toggleClass("owl-hidden", !this._visible),
            this._visible &&
              this._core.invalidate("width") &&
              this._core.refresh());
        }),
        (n.prototype.destroy = function () {
          var t, i;
          for (t in (e.clearInterval(this._interval), this._handlers))
            this._core.$element.off(t, this._handlers[t]);
          for (i in Object.getOwnPropertyNames(this))
            "function" != typeof this[i] && (this[i] = null);
        }),
        (t.fn.owlCarousel.Constructor.Plugins.AutoRefresh = n);
    })(window.Zepto || window.jQuery, window, document),
    (function (t, e, i, s) {
      var n = function e(i) {
        (this._core = i),
          (this._loaded = []),
          (this._handlers = {
            "initialized.owl.carousel change.owl.carousel resized.owl.carousel":
              t.proxy(function (e) {
                if (
                  e.namespace &&
                  this._core.settings &&
                  this._core.settings.lazyLoad &&
                  ((e.property && "position" == e.property.name) ||
                    "initialized" == e.type)
                )
                  for (
                    var i = this._core.settings,
                      s = (i.center && Math.ceil(i.items / 2)) || i.items,
                      n = (i.center && -1 * s) || 0,
                      a =
                        (e.property && void 0 !== e.property.value
                          ? e.property.value
                          : this._core.current()) + n,
                      o = this._core.clones().length,
                      r = t.proxy(function (t, e) {
                        this.load(e);
                      }, this);
                    n++ < s;

                  )
                    this.load(o / 2 + this._core.relative(a)),
                      o && t.each(this._core.clones(this._core.relative(a)), r),
                      a++;
              }, this),
          }),
          (this._core.options = t.extend({}, e.Defaults, this._core.options)),
          this._core.$element.on(this._handlers);
      };
      (n.Defaults = { lazyLoad: !1 }),
        (n.prototype.load = function (i) {
          var s = this._core.$stage.children().eq(i),
            n = s && s.find(".owl-lazy");
          !n ||
            t.inArray(s.get(0), this._loaded) > -1 ||
            (n.each(
              t.proxy(function (i, s) {
                var n,
                  a = t(s),
                  o =
                    (e.devicePixelRatio > 1 && a.attr("data-src-retina")) ||
                    a.attr("data-src");
                this._core.trigger("load", { element: a, url: o }, "lazy"),
                  a.is("img")
                    ? a
                        .one(
                          "load.owl.lazy",
                          t.proxy(function () {
                            a.css("opacity", 1),
                              this._core.trigger(
                                "loaded",
                                { element: a, url: o },
                                "lazy"
                              );
                          }, this)
                        )
                        .attr("src", o)
                    : (((n = new Image()).onload = t.proxy(function () {
                        a.css({
                          "background-image": "url(" + o + ")",
                          opacity: "1",
                        }),
                          this._core.trigger(
                            "loaded",
                            { element: a, url: o },
                            "lazy"
                          );
                      }, this)),
                      (n.src = o));
              }, this)
            ),
            this._loaded.push(s.get(0)));
        }),
        (n.prototype.destroy = function () {
          var t, e;
          for (t in this.handlers) this._core.$element.off(t, this.handlers[t]);
          for (e in Object.getOwnPropertyNames(this))
            "function" != typeof this[e] && (this[e] = null);
        }),
        (t.fn.owlCarousel.Constructor.Plugins.Lazy = n);
    })(window.Zepto || window.jQuery, window, document),
    (function (t, e, i, s) {
      var n = function e(i) {
        (this._core = i),
          (this._handlers = {
            "initialized.owl.carousel refreshed.owl.carousel": t.proxy(function (
              t
            ) {
              t.namespace && this._core.settings.autoHeight && this.update();
            },
            this),
            "changed.owl.carousel": t.proxy(function (t) {
              t.namespace &&
                this._core.settings.autoHeight &&
                "position" == t.property.name &&
                this.update();
            }, this),
            "loaded.owl.lazy": t.proxy(function (t) {
              t.namespace &&
                this._core.settings.autoHeight &&
                t.element.closest("." + this._core.settings.itemClass).index() ===
                  this._core.current() &&
                this.update();
            }, this),
          }),
          (this._core.options = t.extend({}, e.Defaults, this._core.options)),
          this._core.$element.on(this._handlers);
      };
      (n.Defaults = { autoHeight: !1, autoHeightClass: "owl-height" }),
        (n.prototype.update = function () {
          var e,
            i = this._core._current,
            s = i + this._core.settings.items,
            n = this._core.$stage.children().toArray().slice(i, s),
            a = [];
          t.each(n, function (e, i) {
            a.push(t(i).height());
          }),
            (e = Math.max.apply(null, a)),
            this._core.$stage
              .parent()
              .height(e)
              .addClass(this._core.settings.autoHeightClass);
        }),
        (n.prototype.destroy = function () {
          var t, e;
          for (t in this._handlers) this._core.$element.off(t, this._handlers[t]);
          for (e in Object.getOwnPropertyNames(this))
            "function" != typeof this[e] && (this[e] = null);
        }),
        (t.fn.owlCarousel.Constructor.Plugins.AutoHeight = n);
    })(window.Zepto || window.jQuery, window, document),
    (function (t, e, i, s) {
      var n = function e(i) {
        (this._core = i),
          (this._videos = {}),
          (this._playing = null),
          (this._handlers = {
            "initialized.owl.carousel": t.proxy(function (t) {
              t.namespace &&
                this._core.register({
                  type: "state",
                  name: "playing",
                  tags: ["interacting"],
                });
            }, this),
            "resize.owl.carousel": t.proxy(function (t) {
              t.namespace &&
                this._core.settings.video &&
                this.isInFullScreen() &&
                t.preventDefault();
            }, this),
            "refreshed.owl.carousel": t.proxy(function (t) {
              t.namespace &&
                this._core.is("resizing") &&
                this._core.$stage.find(".cloned .owl-video-frame").remove();
            }, this),
            "changed.owl.carousel": t.proxy(function (t) {
              t.namespace &&
                "position" === t.property.name &&
                this._playing &&
                this.stop();
            }, this),
            "prepared.owl.carousel": t.proxy(function (e) {
              if (e.namespace) {
                var i = t(e.content).find(".owl-video");
                i.length &&
                  (i.css("display", "none"), this.fetch(i, t(e.content)));
              }
            }, this),
          }),
          (this._core.options = t.extend({}, e.Defaults, this._core.options)),
          this._core.$element.on(this._handlers),
          this._core.$element.on(
            "click.owl.video",
            ".owl-video-play-icon",
            t.proxy(function (t) {
              this.play(t);
            }, this)
          );
      };
      (n.Defaults = { video: !1, videoHeight: !1, videoWidth: !1 }),
        (n.prototype.fetch = function (t, e) {
          var i = t.attr("data-vimeo-id")
              ? "vimeo"
              : t.attr("data-vzaar-id")
              ? "vzaar"
              : "youtube",
            s =
              t.attr("data-vimeo-id") ||
              t.attr("data-youtube-id") ||
              t.attr("data-vzaar-id"),
            n = t.attr("data-width") || this._core.settings.videoWidth,
            a = t.attr("data-height") || this._core.settings.videoHeight,
            o = t.attr("href");
          if (!o) throw new Error("Missing video URL.");
          if (
            (s = o.match(
              /(http:|https:|)\/\/(player.|www.|app.)?(vimeo\.com|youtu(be\.com|\.be|be\.googleapis\.com)|vzaar\.com)\/(video\/|videos\/|embed\/|channels\/.+\/|groups\/.+\/|watch\?v=|v\/)?([A-Za-z0-9._%-]*)(\&\S+)?/
            ))[3].indexOf("youtu") > -1
          )
            i = "youtube";
          else if (s[3].indexOf("vimeo") > -1) i = "vimeo";
          else {
            if (!(s[3].indexOf("vzaar") > -1))
              throw new Error("Video URL not supported.");
            i = "vzaar";
          }
          (s =
            "shorts" == s[6]
              ? (s = o.match(
                  /(http:|https:|)\/\/(?:www\.)?youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/
                ))
                ? s[2]
                : null
              : s[6]),
            (this._videos[o] = { type: i, id: s, width: n, height: a }),
            e.attr("data-video", o),
            this.thumbnail(t, this._videos[o]);
        }),
        (n.prototype.thumbnail = function (e, i) {
          var s,
            n,
            a =
              i.width && i.height
                ? 'style="width:' + i.width + "px;height:" + i.height + 'px;"'
                : "",
            o = e.find("img"),
            r = "src",
            l = "",
            h = this._core.settings,
            c = function (t) {
              (s = h.lazyLoad
                ? '<div class="owl-video-tn ' +
                  l +
                  '" ' +
                  r +
                  '="' +
                  t +
                  '"></div>'
                : '<div class="owl-video-tn" style="opacity:1;background-image:url(' +
                  t +
                  ')"></div>'),
                e.after(s),
                e.after('<div class="owl-video-play-icon"></div>');
            };
          if (
            (e.wrap('<div class="owl-video-wrapper"' + a + "></div>"),
            this._core.settings.lazyLoad && ((r = "data-src"), (l = "owl-lazy")),
            o.length)
          )
            return c(o.attr(r)), o.remove(), !1;
          "youtube" === i.type
            ? ((n = "//img.youtube.com/vi/" + i.id + "/maxresdefault.jpg"), c(n))
            : "vimeo" === i.type
            ? t.ajax({
                type: "GET",
                url: "//vimeo.com/api/v2/video/" + i.id + ".json",
                jsonp: "callback",
                dataType: "jsonp",
                success: function (t) {
                  (n = t[0].thumbnail_large), c(n);
                },
              })
            : "vzaar" === i.type &&
              t.ajax({
                type: "GET",
                url: "//vzaar.com/api/videos/" + i.id + ".json",
                jsonp: "callback",
                dataType: "jsonp",
                success: function (t) {
                  (n = t.framegrab_url), c(n);
                },
              });
        }),
        (n.prototype.stop = function () {
          this._core.trigger("stop", null, "video"),
            this._playing.find(".owl-video-frame").remove(),
            this._playing.removeClass("owl-video-playing"),
            (this._playing = null),
            this._core.leave("playing"),
            this._core.trigger("stopped", null, "video");
        }),
        (n.prototype.play = function (e) {
          var i,
            s = t(e.target).closest("." + this._core.settings.itemClass),
            n = this._videos[s.attr("data-video")],
            a = n.width || "100%",
            o = n.height || this._core.$stage.height();
          this._playing ||
            (this._core.enter("playing"),
            this._core.trigger("play", null, "video"),
            (s = this._core.items(this._core.relative(s.index()))),
            this._core.reset(s.index()),
            "youtube" === n.type
              ? (i =
                  '<iframe width="' +
                  a +
                  '" height="' +
                  o +
                  '" src="//www.youtube.com/embed/' +
                  n.id +
                  "?autoplay=1&playlist=" +
                  n.id +
                  '&loop=1" gesture="media" allow="autoplay; encrypted-media" frameborder="0" allowfullscreen></iframe>')
              : "vimeo" === n.type
              ? (i =
                  '<iframe src="//player.vimeo.com/video/' +
                  n.id +
                  '?autoplay=1" width="' +
                  a +
                  '" height="' +
                  o +
                  '" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>')
              : "vzaar" === n.type &&
                (i =
                  '<iframe frameborder="0"height="' +
                  o +
                  '"width="' +
                  a +
                  '" allowfullscreen mozallowfullscreen webkitAllowFullScreen src="//view.vzaar.com/' +
                  n.id +
                  '/player?autoplay=true"></iframe>'),
            t('<div class="owl-video-frame">' + i + "</div>").insertAfter(
              s.find(".owl-video")
            ),
            (this._playing = s.addClass("owl-video-playing")));
        }),
        (n.prototype.isInFullScreen = function () {
          var e =
            i.fullscreenElement ||
            i.mozFullScreenElement ||
            i.webkitFullscreenElement;
          return e && t(e).parent().hasClass("owl-video-frame");
        }),
        (n.prototype.destroy = function () {
          var t, e;
          for (t in (this._core.$element.off("click.owl.video"), this._handlers))
            this._core.$element.off(t, this._handlers[t]);
          for (e in Object.getOwnPropertyNames(this))
            "function" != typeof this[e] && (this[e] = null);
        }),
        (t.fn.owlCarousel.Constructor.Plugins.Video = n);
    })(window.Zepto || window.jQuery, window, document),
    (function (t, e, i, s) {
      var n = function e(i) {
        (this.core = i),
          (this.core.options = t.extend({}, e.Defaults, this.core.options)),
          (this.swapping = !0),
          (this.previous = void 0),
          (this.next = void 0),
          (this.handlers = {
            "change.owl.carousel": t.proxy(function (t) {
              t.namespace &&
                "position" == t.property.name &&
                ((this.previous = this.core.current()),
                (this.next = t.property.value));
            }, this),
            "drag.owl.carousel dragged.owl.carousel translated.owl.carousel":
              t.proxy(function (t) {
                t.namespace && (this.swapping = "translated" == t.type);
              }, this),
            "translate.owl.carousel": t.proxy(function (t) {
              t.namespace &&
                this.swapping &&
                (this.core.options.animateOut || this.core.options.animateIn) &&
                this.swap();
            }, this),
          }),
          this.core.$element.on(this.handlers);
      };
      (n.Defaults = { animateOut: !1, animateIn: !1 }),
        (n.prototype.swap = function () {
          if (
            1 === this.core.settings.items &&
            t.support.animation &&
            t.support.transition
          ) {
            this.core.speed(0);
            var e,
              i = t.proxy(this.clear, this),
              s = this.core.$stage.children().eq(this.previous),
              n = this.core.$stage.children().eq(this.next),
              a = this.core.settings.animateIn,
              o = this.core.settings.animateOut;
            this.core.current() !== this.previous &&
              (o &&
                ((e =
                  this.core.coordinates(this.previous) -
                  this.core.coordinates(this.next)),
                s
                  .one(t.support.animation.end, i)
                  .css({ left: e + "px" })
                  .addClass("animated owl-animated-out")
                  .addClass(o)),
              a &&
                n
                  .one(t.support.animation.end, i)
                  .addClass("animated owl-animated-in")
                  .addClass(a));
          }
        }),
        (n.prototype.clear = function (e) {
          t(e.target)
            .css({ left: "" })
            .removeClass("animated owl-animated-out owl-animated-in")
            .removeClass(this.core.settings.animateIn)
            .removeClass(this.core.settings.animateOut),
            this.core.onTransitionEnd();
        }),
        (n.prototype.destroy = function () {
          var t, e;
          for (t in this.handlers) this.core.$element.off(t, this.handlers[t]);
          for (e in Object.getOwnPropertyNames(this))
            "function" != typeof this[e] && (this[e] = null);
        }),
        (t.fn.owlCarousel.Constructor.Plugins.Animate = n);
    })(window.Zepto || window.jQuery, window, document),
    (function (t, e, i, s) {
      var n = function e(i) {
        (this._core = i),
          (this._timeout = null),
          (this._paused = !1),
          (this._handlers = {
            "changed.owl.carousel": t.proxy(function (t) {
              t.namespace && "settings" === t.property.name
                ? this._core.settings.autoplay
                  ? this.play()
                  : this.stop()
                : t.namespace &&
                  "position" === t.property.name &&
                  this._core.settings.autoplay &&
                  this._setAutoPlayInterval();
            }, this),
            "initialized.owl.carousel": t.proxy(function (t) {
              t.namespace && this._core.settings.autoplay && this.play();
            }, this),
            "play.owl.autoplay": t.proxy(function (t, e, i) {
              t.namespace && this.play(e, i);
            }, this),
            "stop.owl.autoplay": t.proxy(function (t) {
              t.namespace && this.stop();
            }, this),
            "mouseover.owl.autoplay": t.proxy(function () {
              this._core.settings.autoplayHoverPause &&
                this._core.is("rotating") &&
                this.pause();
            }, this),
            "mouseleave.owl.autoplay": t.proxy(function () {
              this._core.settings.autoplayHoverPause &&
                this._core.is("rotating") &&
                this.play();
            }, this),
            "touchstart.owl.core": t.proxy(function () {
              this._core.settings.autoplayHoverPause &&
                this._core.is("rotating") &&
                this.pause();
            }, this),
            "touchend.owl.core": t.proxy(function () {
              this._core.settings.autoplayHoverPause && this.play();
            }, this),
          }),
          this._core.$element.on(this._handlers),
          (this._core.options = t.extend({}, e.Defaults, this._core.options));
      };
      (n.Defaults = {
        autoplay: !1,
        autoplayTimeout: 5e3,
        autoplayHoverPause: !1,
        autoplaySpeed: !1,
      }),
        (n.prototype.play = function (t, e) {
          (this._paused = !1),
            this._core.is("rotating") ||
              (this._core.enter("rotating"), this._setAutoPlayInterval());
        }),
        (n.prototype._getNextTimeout = function (s, n) {
          return (
            this._timeout && e.clearTimeout(this._timeout),
            e.setTimeout(
              t.proxy(function () {
                this._paused ||
                  this._core.is("busy") ||
                  this._core.is("interacting") ||
                  i.hidden ||
                  this._core.next(n || this._core.settings.autoplaySpeed);
              }, this),
              s || this._core.settings.autoplayTimeout
            )
          );
        }),
        (n.prototype._setAutoPlayInterval = function () {
          this._timeout = this._getNextTimeout();
        }),
        (n.prototype.stop = function () {
          this._core.is("rotating") &&
            (e.clearTimeout(this._timeout), this._core.leave("rotating"));
        }),
        (n.prototype.pause = function () {
          this._core.is("rotating") && (this._paused = !0);
        }),
        (n.prototype.destroy = function () {
          var t, e;
          for (t in (this.stop(), this._handlers))
            this._core.$element.off(t, this._handlers[t]);
          for (e in Object.getOwnPropertyNames(this))
            "function" != typeof this[e] && (this[e] = null);
        }),
        (t.fn.owlCarousel.Constructor.Plugins.autoplay = n);
    })(window.Zepto || window.jQuery, window, document),
    (function (t, e, i, s) {
      "use strict";
      var n = function e(i) {
        (this._core = i),
          (this._initialized = !1),
          (this._pages = []),
          (this._controls = {}),
          (this._templates = []),
          (this.$element = this._core.$element),
          (this._overrides = {
            next: this._core.next,
            prev: this._core.prev,
            to: this._core.to,
          }),
          (this._handlers = {
            "prepared.owl.carousel": t.proxy(function (e) {
              e.namespace &&
                this._core.settings.dotsData &&
                this._templates.push(
                  '<div class="' +
                    this._core.settings.dotClass +
                    '">' +
                    t(e.content)
                      .find("[data-dot]")
                      .addBack("[data-dot]")
                      .attr("data-dot") +
                    "</div>"
                );
            }, this),
            "added.owl.carousel": t.proxy(function (t) {
              t.namespace &&
                this._core.settings.dotsData &&
                this._templates.splice(t.position, 0, this._templates.pop());
            }, this),
            "remove.owl.carousel": t.proxy(function (t) {
              t.namespace &&
                this._core.settings.dotsData &&
                this._templates.splice(t.position, 1);
            }, this),
            "changed.owl.carousel": t.proxy(function (t) {
              t.namespace && "position" == t.property.name && this.draw();
            }, this),
            "initialized.owl.carousel": t.proxy(function (t) {
              t.namespace &&
                !this._initialized &&
                (this._core.trigger("initialize", null, "navigation"),
                this.initialize(),
                this.update(),
                this.draw(),
                (this._initialized = !0),
                this._core.trigger("initialized", null, "navigation"));
            }, this),
            "refreshed.owl.carousel": t.proxy(function (t) {
              t.namespace &&
                this._initialized &&
                (this._core.trigger("refresh", null, "navigation"),
                this.update(),
                this.draw(),
                this._core.trigger("refreshed", null, "navigation"));
            }, this),
          }),
          (this._core.options = t.extend({}, e.Defaults, this._core.options)),
          this.$element.on(this._handlers);
      };
      (n.Defaults = {
        nav: !1,
        navText: ["prev", "next"],
        navSpeed: !1,
        navElement: "div",
        navContainer: !1,
        navContainerClass: "owl-nav",
        navClass: ["owl-prev", "owl-next"],
        slideBy: 1,
        dotClass: "owl-dot",
        dotsClass: "owl-dots",
        dots: !0,
        dotsEach: !1,
        dotsData: !1,
        dotsSpeed: !1,
        dotsContainer: !1,
      }),
        (n.prototype.initialize = function () {
          var e,
            i = this._core.settings;
          for (e in ((this._controls.$relative = (
            i.navContainer
              ? t(i.navContainer)
              : t("<div>").addClass(i.navContainerClass).appendTo(this.$element)
          ).addClass("disabled")),
          (this._controls.$previous = t("<" + i.navElement + ">")
            .addClass(i.navClass[0])
            .html(i.navText[0])
            .prependTo(this._controls.$relative)
            .on(
              "click",
              t.proxy(function (t) {
                this.prev(i.navSpeed);
              }, this)
            )),
          (this._controls.$next = t("<" + i.navElement + ">")
            .addClass(i.navClass[1])
            .html(i.navText[1])
            .appendTo(this._controls.$relative)
            .on(
              "click",
              t.proxy(function (t) {
                this.next(i.navSpeed);
              }, this)
            )),
          i.dotsData ||
            (this._templates = [
              t("<div>")
                .addClass(i.dotClass)
                .append(t("<span>"))
                .prop("outerHTML"),
            ]),
          (this._controls.$absolute = (
            i.dotsContainer
              ? t(i.dotsContainer)
              : t("<div>").addClass(i.dotsClass).appendTo(this.$element)
          ).addClass("disabled")),
          this._controls.$absolute.on(
            "click",
            "div",
            t.proxy(function (e) {
              var s = t(e.target).parent().is(this._controls.$absolute)
                ? t(e.target).index()
                : t(e.target).parent().index();
              e.preventDefault(), this.to(s, i.dotsSpeed);
            }, this)
          ),
          this._overrides))
            this._core[e] = t.proxy(this[e], this);
        }),
        (n.prototype.destroy = function () {
          var t, e, i, s;
          for (t in this._handlers) this.$element.off(t, this._handlers[t]);
          for (e in this._controls) this._controls[e].remove();
          for (s in this.overides) this._core[s] = this._overrides[s];
          for (i in Object.getOwnPropertyNames(this))
            "function" != typeof this[i] && (this[i] = null);
        }),
        (n.prototype.update = function () {
          var t,
            e,
            i = this._core.clones().length / 2,
            s = i + this._core.items().length,
            n = this._core.maximum(!0),
            a = this._core.settings,
            o = a.center || a.autoWidth || a.dotsData ? 1 : a.dotsEach || a.items;
          if (
            ("page" !== a.slideBy && (a.slideBy = Math.min(a.slideBy, a.items)),
            a.dots || "page" == a.slideBy)
          )
            for (this._pages = [], t = i, e = 0; t < s; t++) {
              if (e >= o || 0 === e) {
                if (
                  (this._pages.push({
                    start: Math.min(n, t - i),
                    end: t - i + o - 1,
                  }),
                  Math.min(n, t - i) === n)
                )
                  break;
                e = 0;
              }
              e += this._core.mergers(this._core.relative(t));
            }
        }),
        (n.prototype.draw = function () {
          var e,
            i = this._core.settings,
            s = this._core.items().length <= i.items,
            n = this._core.relative(this._core.current()),
            a = i.loop || i.rewind;
          this._controls.$relative.toggleClass("disabled", !i.nav || s),
            i.nav &&
              (this._controls.$previous.toggleClass(
                "disabled",
                !a && n <= this._core.minimum(!0)
              ),
              this._controls.$next.toggleClass(
                "disabled",
                !a && n >= this._core.maximum(!0)
              )),
            this._controls.$absolute.toggleClass("disabled", !i.dots || s),
            i.dots &&
              ((e =
                this._pages.length - this._controls.$absolute.children().length),
              i.dotsData && 0 !== e
                ? this._controls.$absolute.html(this._templates.join(""))
                : e > 0
                ? this._controls.$absolute.append(
                    new Array(e + 1).join(this._templates[0])
                  )
                : e < 0 && this._controls.$absolute.children().slice(e).remove(),
              this._controls.$absolute.find(".active").removeClass("active"),
              this._controls.$absolute
                .children()
                .eq(t.inArray(this.current(), this._pages))
                .addClass("active"));
        }),
        (n.prototype.onTrigger = function (e) {
          var i = this._core.settings;
          e.page = {
            index: t.inArray(this.current(), this._pages),
            count: this._pages.length,
            size:
              i &&
              (i.center || i.autoWidth || i.dotsData ? 1 : i.dotsEach || i.items),
          };
        }),
        (n.prototype.current = function () {
          var e = this._core.relative(this._core.current());
          return t
            .grep(
              this._pages,
              t.proxy(function (t, i) {
                return t.start <= e && t.end >= e;
              }, this)
            )
            .pop();
        }),
        (n.prototype.getPosition = function (e) {
          var i,
            s,
            n = this._core.settings;
          return (
            "page" == n.slideBy
              ? ((i = t.inArray(this.current(), this._pages)),
                (s = this._pages.length),
                e ? ++i : --i,
                (i = this._pages[((i % s) + s) % s].start))
              : ((i = this._core.relative(this._core.current())),
                (s = this._core.items().length),
                e ? (i += n.slideBy) : (i -= n.slideBy)),
            i
          );
        }),
        (n.prototype.next = function (e) {
          t.proxy(this._overrides.to, this._core)(this.getPosition(!0), e);
        }),
        (n.prototype.prev = function (e) {
          t.proxy(this._overrides.to, this._core)(this.getPosition(!1), e);
        }),
        (n.prototype.to = function (e, i, s) {
          var n;
          !s && this._pages.length
            ? ((n = this._pages.length),
              t.proxy(this._overrides.to, this._core)(
                this._pages[((e % n) + n) % n].start,
                i
              ))
            : t.proxy(this._overrides.to, this._core)(e, i);
        }),
        (t.fn.owlCarousel.Constructor.Plugins.Navigation = n);
    })(window.Zepto || window.jQuery, window, document),
    (function (t, e, i, s) {
      "use strict";
      var n = function i(s) {
        (this._core = s),
          (this._hashes = {}),
          (this.$element = this._core.$element),
          (this._handlers = {
            "initialized.owl.carousel": t.proxy(function (i) {
              i.namespace &&
                "URLHash" === this._core.settings.startPosition &&
                t(e).trigger("hashchange.owl.navigation");
            }, this),
            "prepared.owl.carousel": t.proxy(function (e) {
              if (e.namespace) {
                var i = t(e.content)
                  .find("[data-hash]")
                  .addBack("[data-hash]")
                  .attr("data-hash");
                if (!i) return;
                this._hashes[i] = e.content;
              }
            }, this),
            "changed.owl.carousel": t.proxy(function (i) {
              if (i.namespace && "position" === i.property.name) {
                var s = this._core.items(
                    this._core.relative(this._core.current())
                  ),
                  n = t
                    .map(this._hashes, function (t, e) {
                      return t === s ? e : null;
                    })
                    .join();
                if (!n || e.location.hash.slice(1) === n) return;
                e.location.hash = n;
              }
            }, this),
          }),
          (this._core.options = t.extend({}, i.Defaults, this._core.options)),
          this.$element.on(this._handlers),
          t(e).on(
            "hashchange.owl.navigation",
            t.proxy(function (t) {
              var i = e.location.hash.substring(1),
                s = this._core.$stage.children(),
                n = this._hashes[i] && s.index(this._hashes[i]);
              void 0 !== n &&
                n !== this._core.current() &&
                this._core.to(this._core.relative(n), !1, !0);
            }, this)
          );
      };
      (n.Defaults = { URLhashListener: !1 }),
        (n.prototype.destroy = function () {
          var i, s;
          for (i in (t(e).off("hashchange.owl.navigation"), this._handlers))
            this._core.$element.off(i, this._handlers[i]);
          for (s in Object.getOwnPropertyNames(this))
            "function" != typeof this[s] && (this[s] = null);
        }),
        (t.fn.owlCarousel.Constructor.Plugins.Hash = n);
    })(window.Zepto || window.jQuery, window, document),
    (function (t, e, i, s) {
      var n = t("<support>").get(0).style,
        a = "Webkit Moz O ms".split(" "),
        o = {
          transition: {
            end: {
              WebkitTransition: "webkitTransitionEnd",
              MozTransition: "transitionend",
              OTransition: "oTransitionEnd",
              transition: "transitionend",
            },
          },
          animation: {
            end: {
              WebkitAnimation: "webkitAnimationEnd",
              MozAnimation: "animationend",
              OAnimation: "oAnimationEnd",
              animation: "animationend",
            },
          },
        };
      function r(e, i) {
        var o = !1,
          r = e.charAt(0).toUpperCase() + e.slice(1);
        return (
          t.each((e + " " + a.join(r + " ") + r).split(" "), function (t, e) {
            if (n[e] !== s) return (o = !i || e), !1;
          }),
          o
        );
      }
      function l(t) {
        return r(t, !0);
      }
      !!r("transition") &&
        ((t.support.transition = new String(l("transition"))),
        (t.support.transition.end = o.transition.end[t.support.transition])),
        !!r("animation") &&
          ((t.support.animation = new String(l("animation"))),
          (t.support.animation.end = o.animation.end[t.support.animation])),
        r("transform") &&
          ((t.support.transform = new String(l("transform"))),
          (t.support.transform3d = !!r("perspective")));
    })(window.Zepto || window.jQuery, window, document),
    (function (t, e) {
      "object" ===
        ("undefined" == typeof exports ? "undefined" : _typeof(exports)) &&
      "undefined" != typeof module
        ? (module.exports = e())
        : "function" == typeof define && define.amd
        ? define(e)
        : (t.moment = e());
    })(this, function () {
      "use strict";
      var t, e;
      function i() {
        return t.apply(null, arguments);
      }
      function s(t) {
        return (
          t instanceof Array ||
          "[object Array]" === Object.prototype.toString.call(t)
        );
      }
      function n(t) {
        return (
          null != t && "[object Object]" === Object.prototype.toString.call(t)
        );
      }
      function a(t) {
        return void 0 === t;
      }
      function o(t) {
        return (
          "number" == typeof t ||
          "[object Number]" === Object.prototype.toString.call(t)
        );
      }
      function r(t) {
        return (
          t instanceof Date ||
          "[object Date]" === Object.prototype.toString.call(t)
        );
      }
      function l(t, e) {
        var i,
          s = [];
        for (i = 0; i < t.length; ++i) s.push(e(t[i], i));
        return s;
      }
      function h(t, e) {
        return Object.prototype.hasOwnProperty.call(t, e);
      }
      function c(t, e) {
        for (var i in e) h(e, i) && (t[i] = e[i]);
        return (
          h(e, "toString") && (t.toString = e.toString),
          h(e, "valueOf") && (t.valueOf = e.valueOf),
          t
        );
      }
      function d(t, e, i, s) {
        return Me(t, e, i, s, !0).utc();
      }
      function u(t) {
        return (
          null == t._pf &&
            (t._pf = {
              empty: !1,
              unusedTokens: [],
              unusedInput: [],
              overflow: -2,
              charsLeftOver: 0,
              nullInput: !1,
              invalidMonth: null,
              invalidFormat: !1,
              userInvalidated: !1,
              iso: !1,
              parsedDateParts: [],
              meridiem: null,
              rfc2822: !1,
              weekdayMismatch: !1,
            }),
          t._pf
        );
      }
      function f(t) {
        if (null == t._isValid) {
          var i = u(t),
            s = e.call(i.parsedDateParts, function (t) {
              return null != t;
            }),
            n =
              !isNaN(t._d.getTime()) &&
              i.overflow < 0 &&
              !i.empty &&
              !i.invalidMonth &&
              !i.invalidWeekday &&
              !i.weekdayMismatch &&
              !i.nullInput &&
              !i.invalidFormat &&
              !i.userInvalidated &&
              (!i.meridiem || (i.meridiem && s));
          if (
            (t._strict &&
              (n =
                n &&
                0 === i.charsLeftOver &&
                0 === i.unusedTokens.length &&
                void 0 === i.bigHour),
            null != Object.isFrozen && Object.isFrozen(t))
          )
            return n;
          t._isValid = n;
        }
        return t._isValid;
      }
      function p(t) {
        var e = d(NaN);
        return null != t ? c(u(e), t) : (u(e).userInvalidated = !0), e;
      }
      e = Array.prototype.some
        ? Array.prototype.some
        : function (t) {
            for (var e = Object(this), i = e.length >>> 0, s = 0; s < i; s++)
              if (s in e && t.call(this, e[s], s, e)) return !0;
            return !1;
          };
      var m = (i.momentProperties = []);
      function g(t, e) {
        var i, s, n;
        if (
          (a(e._isAMomentObject) || (t._isAMomentObject = e._isAMomentObject),
          a(e._i) || (t._i = e._i),
          a(e._f) || (t._f = e._f),
          a(e._l) || (t._l = e._l),
          a(e._strict) || (t._strict = e._strict),
          a(e._tzm) || (t._tzm = e._tzm),
          a(e._isUTC) || (t._isUTC = e._isUTC),
          a(e._offset) || (t._offset = e._offset),
          a(e._pf) || (t._pf = u(e)),
          a(e._locale) || (t._locale = e._locale),
          m.length > 0)
        )
          for (i = 0; i < m.length; i++) a((n = e[(s = m[i])])) || (t[s] = n);
        return t;
      }
      var y = !1;
      function v(t) {
        g(this, t),
          (this._d = new Date(null != t._d ? t._d.getTime() : NaN)),
          this.isValid() || (this._d = new Date(NaN)),
          !1 === y && ((y = !0), i.updateOffset(this), (y = !1));
      }
      function b(t) {
        return t instanceof v || (null != t && null != t._isAMomentObject);
      }
      function w(t) {
        return t < 0 ? Math.ceil(t) || 0 : Math.floor(t);
      }
      function _(t) {
        var e = +t,
          i = 0;
        return 0 !== e && isFinite(e) && (i = w(e)), i;
      }
      function x(t, e, i) {
        var s,
          n = Math.min(t.length, e.length),
          a = Math.abs(t.length - e.length),
          o = 0;
        for (s = 0; s < n; s++)
          ((i && t[s] !== e[s]) || (!i && _(t[s]) !== _(e[s]))) && o++;
        return o + a;
      }
      function D(t) {
        !1 === i.suppressDeprecationWarnings &&
          "undefined" != typeof console &&
          console.warn &&
          console.warn("Deprecation warning: " + t);
      }
      function k(t, e) {
        var s = !0;
        return c(function () {
          if (
            (null != i.deprecationHandler && i.deprecationHandler(null, t), s)
          ) {
            for (var n, a = [], o = 0; o < arguments.length; o++) {
              if (((n = ""), "object" === _typeof(arguments[o]))) {
                for (var r in ((n += "\n[" + o + "] "), arguments[0]))
                  n += r + ": " + arguments[0][r] + ", ";
                n = n.slice(0, -2);
              } else n = arguments[o];
              a.push(n);
            }
            D(
              t +
                "\nArguments: " +
                Array.prototype.slice.call(a).join("") +
                "\n" +
                new Error().stack
            ),
              (s = !1);
          }
          return e.apply(this, arguments);
        }, e);
      }
      var C,
        S = {};
      function M(t, e) {
        null != i.deprecationHandler && i.deprecationHandler(t, e),
          S[t] || (D(e), (S[t] = !0));
      }
      function P(t) {
        return (
          t instanceof Function ||
          "[object Function]" === Object.prototype.toString.call(t)
        );
      }
      function T(t, e) {
        var i,
          s = c({}, t);
        for (i in e)
          h(e, i) &&
            (n(t[i]) && n(e[i])
              ? ((s[i] = {}), c(s[i], t[i]), c(s[i], e[i]))
              : null != e[i]
              ? (s[i] = e[i])
              : delete s[i]);
        for (i in t) h(t, i) && !h(e, i) && n(t[i]) && (s[i] = c({}, s[i]));
        return s;
      }
      function $(t) {
        null != t && this.set(t);
      }
      (i.suppressDeprecationWarnings = !1),
        (i.deprecationHandler = null),
        (C = Object.keys
          ? Object.keys
          : function (t) {
              var e,
                i = [];
              for (e in t) h(t, e) && i.push(e);
              return i;
            });
      var Y = {};
      function E(t, e) {
        var i = t.toLowerCase();
        Y[i] = Y[i + "s"] = Y[e] = t;
      }
      function O(t) {
        return "string" == typeof t ? Y[t] || Y[t.toLowerCase()] : void 0;
      }
      function I(t) {
        var e,
          i,
          s = {};
        for (i in t) h(t, i) && (e = O(i)) && (s[e] = t[i]);
        return s;
      }
      var L = {};
      function A(t, e) {
        L[t] = e;
      }
      function z(t, e, i) {
        var s = "" + Math.abs(t),
          n = e - s.length;
        return (
          (t >= 0 ? (i ? "+" : "") : "-") +
          Math.pow(10, Math.max(0, n)).toString().substr(1) +
          s
        );
      }
      var R =
          /(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|kk?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g,
        F = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g,
        H = {},
        W = {};
      function j(t, e, i, s) {
        var n = s;
        "string" == typeof s &&
          (n = function () {
            return this[s]();
          }),
          t && (W[t] = n),
          e &&
            (W[e[0]] = function () {
              return z(n.apply(this, arguments), e[1], e[2]);
            }),
          i &&
            (W[i] = function () {
              return this.localeData().ordinal(n.apply(this, arguments), t);
            });
      }
      function N(t, e) {
        return t.isValid()
          ? ((e = B(e, t.localeData())),
            (H[e] =
              H[e] ||
              (function (t) {
                var e,
                  i,
                  s,
                  n = t.match(R);
                for (e = 0, i = n.length; e < i; e++)
                  W[n[e]]
                    ? (n[e] = W[n[e]])
                    : (n[e] = (s = n[e]).match(/\[[\s\S]/)
                        ? s.replace(/^\[|\]$/g, "")
                        : s.replace(/\\/g, ""));
                return function (e) {
                  var s,
                    a = "";
                  for (s = 0; s < i; s++) a += P(n[s]) ? n[s].call(e, t) : n[s];
                  return a;
                };
              })(e)),
            H[e](t))
          : t.localeData().invalidDate();
      }
      function B(t, e) {
        var i = 5;
        function s(t) {
          return e.longDateFormat(t) || t;
        }
        for (F.lastIndex = 0; i >= 0 && F.test(t); )
          (t = t.replace(F, s)), (F.lastIndex = 0), (i -= 1);
        return t;
      }
      var V = /\d/,
        U = /\d\d/,
        q = /\d{3}/,
        G = /\d{4}/,
        X = /[+-]?\d{6}/,
        Z = /\d\d?/,
        Q = /\d\d\d\d?/,
        K = /\d\d\d\d\d\d?/,
        J = /\d{1,3}/,
        tt = /\d{1,4}/,
        et = /[+-]?\d{1,6}/,
        it = /\d+/,
        st = /[+-]?\d+/,
        nt = /Z|[+-]\d\d:?\d\d/gi,
        at = /Z|[+-]\d\d(?::?\d\d)?/gi,
        ot =
          /[0-9]{0,256}['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFF07\uFF10-\uFFEF]{1,256}|[\u0600-\u06FF\/]{1,256}(\s*?[\u0600-\u06FF]{1,256}){1,2}/i,
        rt = {};
      function lt(t, e, i) {
        rt[t] = P(e)
          ? e
          : function (t, s) {
              return t && i ? i : e;
            };
      }
      function ht(t, e) {
        return h(rt, t)
          ? rt[t](e._strict, e._locale)
          : new RegExp(
              ct(
                t
                  .replace("\\", "")
                  .replace(
                    /\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g,
                    function (t, e, i, s, n) {
                      return e || i || s || n;
                    }
                  )
              )
            );
      }
      function ct(t) {
        return t.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
      }
      var dt = {};
      function ut(t, e) {
        var i,
          s = e;
        for (
          "string" == typeof t && (t = [t]),
            o(e) &&
              (s = function (t, i) {
                i[e] = _(t);
              }),
            i = 0;
          i < t.length;
          i++
        )
          dt[t[i]] = s;
      }
      function ft(t, e) {
        ut(t, function (t, i, s, n) {
          (s._w = s._w || {}), e(t, s._w, s, n);
        });
      }
      function pt(t, e, i) {
        null != e && h(dt, t) && dt[t](e, i._a, i, t);
      }
      var mt = 0,
        gt = 1,
        yt = 2,
        vt = 3,
        bt = 4,
        wt = 5,
        _t = 6,
        xt = 7,
        Dt = 8;
      function kt(t) {
        return Ct(t) ? 366 : 365;
      }
      function Ct(t) {
        return (t % 4 == 0 && t % 100 != 0) || t % 400 == 0;
      }
      j("Y", 0, 0, function () {
        var t = this.year();
        return t <= 9999 ? "" + t : "+" + t;
      }),
        j(0, ["YY", 2], 0, function () {
          return this.year() % 100;
        }),
        j(0, ["YYYY", 4], 0, "year"),
        j(0, ["YYYYY", 5], 0, "year"),
        j(0, ["YYYYYY", 6, !0], 0, "year"),
        E("year", "y"),
        A("year", 1),
        lt("Y", st),
        lt("YY", Z, U),
        lt("YYYY", tt, G),
        lt("YYYYY", et, X),
        lt("YYYYYY", et, X),
        ut(["YYYYY", "YYYYYY"], mt),
        ut("YYYY", function (t, e) {
          e[mt] = 2 === t.length ? i.parseTwoDigitYear(t) : _(t);
        }),
        ut("YY", function (t, e) {
          e[mt] = i.parseTwoDigitYear(t);
        }),
        ut("Y", function (t, e) {
          e[mt] = parseInt(t, 10);
        }),
        (i.parseTwoDigitYear = function (t) {
          return _(t) + (_(t) > 68 ? 1900 : 2e3);
        });
      var St,
        Mt = Pt("FullYear", !0);
      function Pt(t, e) {
        return function (s) {
          return null != s
            ? ($t(this, t, s), i.updateOffset(this, e), this)
            : Tt(this, t);
        };
      }
      function Tt(t, e) {
        return t.isValid() ? t._d["get" + (t._isUTC ? "UTC" : "") + e]() : NaN;
      }
      function $t(t, e, i) {
        t.isValid() &&
          !isNaN(i) &&
          ("FullYear" === e && Ct(t.year()) && 1 === t.month() && 29 === t.date()
            ? t._d["set" + (t._isUTC ? "UTC" : "") + e](
                i,
                t.month(),
                Yt(i, t.month())
              )
            : t._d["set" + (t._isUTC ? "UTC" : "") + e](i));
      }
      function Yt(t, e) {
        if (isNaN(t) || isNaN(e)) return NaN;
        var i = ((e % 12) + 12) % 12;
        return (
          (t += (e - i) / 12), 1 === i ? (Ct(t) ? 29 : 28) : 31 - ((i % 7) % 2)
        );
      }
      (St = Array.prototype.indexOf
        ? Array.prototype.indexOf
        : function (t) {
            var e;
            for (e = 0; e < this.length; ++e) if (this[e] === t) return e;
            return -1;
          }),
        j("M", ["MM", 2], "Mo", function () {
          return this.month() + 1;
        }),
        j("MMM", 0, 0, function (t) {
          return this.localeData().monthsShort(this, t);
        }),
        j("MMMM", 0, 0, function (t) {
          return this.localeData().months(this, t);
        }),
        E("month", "M"),
        A("month", 8),
        lt("M", Z),
        lt("MM", Z, U),
        lt("MMM", function (t, e) {
          return e.monthsShortRegex(t);
        }),
        lt("MMMM", function (t, e) {
          return e.monthsRegex(t);
        }),
        ut(["M", "MM"], function (t, e) {
          e[gt] = _(t) - 1;
        }),
        ut(["MMM", "MMMM"], function (t, e, i, s) {
          var n = i._locale.monthsParse(t, s, i._strict);
          null != n ? (e[gt] = n) : (u(i).invalidMonth = t);
        });
      var Et = /D[oD]?(\[[^\[\]]*\]|\s)+MMMM?/,
        Ot =
          "January_February_March_April_May_June_July_August_September_October_November_December".split(
            "_"
          ),
        It = "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_");
      function Lt(t, e) {
        var i;
        if (!t.isValid()) return t;
        if ("string" == typeof e)
          if (/^\d+$/.test(e)) e = _(e);
          else if (!o((e = t.localeData().monthsParse(e)))) return t;
        return (
          (i = Math.min(t.date(), Yt(t.year(), e))),
          t._d["set" + (t._isUTC ? "UTC" : "") + "Month"](e, i),
          t
        );
      }
      function At(t) {
        return null != t
          ? (Lt(this, t), i.updateOffset(this, !0), this)
          : Tt(this, "Month");
      }
      var zt = ot,
        Rt = ot;
      function Ft() {
        function t(t, e) {
          return e.length - t.length;
        }
        var e,
          i,
          s = [],
          n = [],
          a = [];
        for (e = 0; e < 12; e++)
          (i = d([2e3, e])),
            s.push(this.monthsShort(i, "")),
            n.push(this.months(i, "")),
            a.push(this.months(i, "")),
            a.push(this.monthsShort(i, ""));
        for (s.sort(t), n.sort(t), a.sort(t), e = 0; e < 12; e++)
          (s[e] = ct(s[e])), (n[e] = ct(n[e]));
        for (e = 0; e < 24; e++) a[e] = ct(a[e]);
        (this._monthsRegex = new RegExp("^(" + a.join("|") + ")", "i")),
          (this._monthsShortRegex = this._monthsRegex),
          (this._monthsStrictRegex = new RegExp("^(" + n.join("|") + ")", "i")),
          (this._monthsShortStrictRegex = new RegExp(
            "^(" + s.join("|") + ")",
            "i"
          ));
      }
      function Ht(t) {
        var e = new Date(Date.UTC.apply(null, arguments));
        return (
          t < 100 &&
            t >= 0 &&
            isFinite(e.getUTCFullYear()) &&
            e.setUTCFullYear(t),
          e
        );
      }
      function Wt(t, e, i) {
        var s = 7 + e - i;
        return (-(7 + Ht(t, 0, s).getUTCDay() - e) % 7) + s - 1;
      }
      function jt(t, e, i, s, n) {
        var a,
          o,
          r = 1 + 7 * (e - 1) + ((7 + i - s) % 7) + Wt(t, s, n);
        return (
          r <= 0
            ? (o = kt((a = t - 1)) + r)
            : r > kt(t)
            ? ((a = t + 1), (o = r - kt(t)))
            : ((a = t), (o = r)),
          { year: a, dayOfYear: o }
        );
      }
      function Nt(t, e, i) {
        var s,
          n,
          a = Wt(t.year(), e, i),
          o = Math.floor((t.dayOfYear() - a - 1) / 7) + 1;
        return (
          o < 1
            ? (s = o + Bt((n = t.year() - 1), e, i))
            : o > Bt(t.year(), e, i)
            ? ((s = o - Bt(t.year(), e, i)), (n = t.year() + 1))
            : ((n = t.year()), (s = o)),
          { week: s, year: n }
        );
      }
      function Bt(t, e, i) {
        var s = Wt(t, e, i),
          n = Wt(t + 1, e, i);
        return (kt(t) - s + n) / 7;
      }
      j("w", ["ww", 2], "wo", "week"),
        j("W", ["WW", 2], "Wo", "isoWeek"),
        E("week", "w"),
        E("isoWeek", "W"),
        A("week", 5),
        A("isoWeek", 5),
        lt("w", Z),
        lt("ww", Z, U),
        lt("W", Z),
        lt("WW", Z, U),
        ft(["w", "ww", "W", "WW"], function (t, e, i, s) {
          e[s.substr(0, 1)] = _(t);
        }),
        j("d", 0, "do", "day"),
        j("dd", 0, 0, function (t) {
          return this.localeData().weekdaysMin(this, t);
        }),
        j("ddd", 0, 0, function (t) {
          return this.localeData().weekdaysShort(this, t);
        }),
        j("dddd", 0, 0, function (t) {
          return this.localeData().weekdays(this, t);
        }),
        j("e", 0, 0, "weekday"),
        j("E", 0, 0, "isoWeekday"),
        E("day", "d"),
        E("weekday", "e"),
        E("isoWeekday", "E"),
        A("day", 11),
        A("weekday", 11),
        A("isoWeekday", 11),
        lt("d", Z),
        lt("e", Z),
        lt("E", Z),
        lt("dd", function (t, e) {
          return e.weekdaysMinRegex(t);
        }),
        lt("ddd", function (t, e) {
          return e.weekdaysShortRegex(t);
        }),
        lt("dddd", function (t, e) {
          return e.weekdaysRegex(t);
        }),
        ft(["dd", "ddd", "dddd"], function (t, e, i, s) {
          var n = i._locale.weekdaysParse(t, s, i._strict);
          null != n ? (e.d = n) : (u(i).invalidWeekday = t);
        }),
        ft(["d", "e", "E"], function (t, e, i, s) {
          e[s] = _(t);
        });
      var Vt = "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split(
          "_"
        ),
        Ut = "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),
        qt = "Su_Mo_Tu_We_Th_Fr_Sa".split("_"),
        Gt = ot,
        Xt = ot,
        Zt = ot;
      function Qt() {
        function t(t, e) {
          return e.length - t.length;
        }
        var e,
          i,
          s,
          n,
          a,
          o = [],
          r = [],
          l = [],
          h = [];
        for (e = 0; e < 7; e++)
          (i = d([2e3, 1]).day(e)),
            (s = this.weekdaysMin(i, "")),
            (n = this.weekdaysShort(i, "")),
            (a = this.weekdays(i, "")),
            o.push(s),
            r.push(n),
            l.push(a),
            h.push(s),
            h.push(n),
            h.push(a);
        for (o.sort(t), r.sort(t), l.sort(t), h.sort(t), e = 0; e < 7; e++)
          (r[e] = ct(r[e])), (l[e] = ct(l[e])), (h[e] = ct(h[e]));
        (this._weekdaysRegex = new RegExp("^(" + h.join("|") + ")", "i")),
          (this._weekdaysShortRegex = this._weekdaysRegex),
          (this._weekdaysMinRegex = this._weekdaysRegex),
          (this._weekdaysStrictRegex = new RegExp("^(" + l.join("|") + ")", "i")),
          (this._weekdaysShortStrictRegex = new RegExp(
            "^(" + r.join("|") + ")",
            "i"
          )),
          (this._weekdaysMinStrictRegex = new RegExp(
            "^(" + o.join("|") + ")",
            "i"
          ));
      }
      function Kt() {
        return this.hours() % 12 || 12;
      }
      function Jt(t, e) {
        j(t, 0, 0, function () {
          return this.localeData().meridiem(this.hours(), this.minutes(), e);
        });
      }
      function te(t, e) {
        return e._meridiemParse;
      }
      j("H", ["HH", 2], 0, "hour"),
        j("h", ["hh", 2], 0, Kt),
        j("k", ["kk", 2], 0, function () {
          return this.hours() || 24;
        }),
        j("hmm", 0, 0, function () {
          return "" + Kt.apply(this) + z(this.minutes(), 2);
        }),
        j("hmmss", 0, 0, function () {
          return (
            "" + Kt.apply(this) + z(this.minutes(), 2) + z(this.seconds(), 2)
          );
        }),
        j("Hmm", 0, 0, function () {
          return "" + this.hours() + z(this.minutes(), 2);
        }),
        j("Hmmss", 0, 0, function () {
          return "" + this.hours() + z(this.minutes(), 2) + z(this.seconds(), 2);
        }),
        Jt("a", !0),
        Jt("A", !1),
        E("hour", "h"),
        A("hour", 13),
        lt("a", te),
        lt("A", te),
        lt("H", Z),
        lt("h", Z),
        lt("k", Z),
        lt("HH", Z, U),
        lt("hh", Z, U),
        lt("kk", Z, U),
        lt("hmm", Q),
        lt("hmmss", K),
        lt("Hmm", Q),
        lt("Hmmss", K),
        ut(["H", "HH"], vt),
        ut(["k", "kk"], function (t, e, i) {
          var s = _(t);
          e[vt] = 24 === s ? 0 : s;
        }),
        ut(["a", "A"], function (t, e, i) {
          (i._isPm = i._locale.isPM(t)), (i._meridiem = t);
        }),
        ut(["h", "hh"], function (t, e, i) {
          (e[vt] = _(t)), (u(i).bigHour = !0);
        }),
        ut("hmm", function (t, e, i) {
          var s = t.length - 2;
          (e[vt] = _(t.substr(0, s))),
            (e[bt] = _(t.substr(s))),
            (u(i).bigHour = !0);
        }),
        ut("hmmss", function (t, e, i) {
          var s = t.length - 4,
            n = t.length - 2;
          (e[vt] = _(t.substr(0, s))),
            (e[bt] = _(t.substr(s, 2))),
            (e[wt] = _(t.substr(n))),
            (u(i).bigHour = !0);
        }),
        ut("Hmm", function (t, e, i) {
          var s = t.length - 2;
          (e[vt] = _(t.substr(0, s))), (e[bt] = _(t.substr(s)));
        }),
        ut("Hmmss", function (t, e, i) {
          var s = t.length - 4,
            n = t.length - 2;
          (e[vt] = _(t.substr(0, s))),
            (e[bt] = _(t.substr(s, 2))),
            (e[wt] = _(t.substr(n)));
        });
      var ee,
        ie = Pt("Hours", !0),
        se = {
          calendar: {
            sameDay: "[Today at] LT",
            nextDay: "[Tomorrow at] LT",
            nextWeek: "dddd [at] LT",
            lastDay: "[Yesterday at] LT",
            lastWeek: "[Last] dddd [at] LT",
            sameElse: "L",
          },
          longDateFormat: {
            LTS: "h:mm:ss A",
            LT: "h:mm A",
            L: "MM/DD/YYYY",
            LL: "MMMM D, YYYY",
            LLL: "MMMM D, YYYY h:mm A",
            LLLL: "dddd, MMMM D, YYYY h:mm A",
          },
          invalidDate: "Invalid date",
          ordinal: "%d",
          dayOfMonthOrdinalParse: /\d{1,2}/,
          relativeTime: {
            future: "in %s",
            past: "%s ago",
            s: "a few seconds",
            ss: "%d seconds",
            m: "a minute",
            mm: "%d minutes",
            h: "an hour",
            hh: "%d hours",
            d: "a day",
            dd: "%d days",
            M: "a month",
            MM: "%d months",
            y: "a year",
            yy: "%d years",
          },
          months: Ot,
          monthsShort: It,
          week: { dow: 0, doy: 6 },
          weekdays: Vt,
          weekdaysMin: qt,
          weekdaysShort: Ut,
          meridiemParse: /[ap]\.?m?\.?/i,
        },
        ne = {},
        ae = {};
      function oe(t) {
        return t ? t.toLowerCase().replace("_", "-") : t;
      }
      function re(t) {
        var e = null;
        if (!ne[t] && "undefined" != typeof module && module && module.exports)
          try {
            (e = ee._abbr), require("./locale/" + t), le(e);
          } catch (t) {}
        return ne[t];
      }
      function le(t, e) {
        var i;
        return (
          t &&
            ((i = a(e) ? ce(t) : he(t, e))
              ? (ee = i)
              : "undefined" != typeof console &&
                console.warn &&
                console.warn(
                  "Locale " + t + " not found. Did you forget to load it?"
                )),
          ee._abbr
        );
      }
      function he(t, e) {
        if (null !== e) {
          var i,
            s = se;
          if (((e.abbr = t), null != ne[t]))
            M(
              "defineLocaleOverride",
              "use moment.updateLocale(localeName, config) to change an existing locale. moment.defineLocale(localeName, config) should only be used for creating a new locale See http://momentjs.com/guides/#/warnings/define-locale/ for more info."
            ),
              (s = ne[t]._config);
          else if (null != e.parentLocale)
            if (null != ne[e.parentLocale]) s = ne[e.parentLocale]._config;
            else {
              if (null == (i = re(e.parentLocale)))
                return (
                  ae[e.parentLocale] || (ae[e.parentLocale] = []),
                  ae[e.parentLocale].push({ name: t, config: e }),
                  null
                );
              s = i._config;
            }
          return (
            (ne[t] = new $(T(s, e))),
            ae[t] &&
              ae[t].forEach(function (t) {
                he(t.name, t.config);
              }),
            le(t),
            ne[t]
          );
        }
        return delete ne[t], null;
      }
      function ce(t) {
        var e;
        if ((t && t._locale && t._locale._abbr && (t = t._locale._abbr), !t))
          return ee;
        if (!s(t)) {
          if ((e = re(t))) return e;
          t = [t];
        }
        return (function (t) {
          for (var e, i, s, n, a = 0; a < t.length; ) {
            for (
              e = (n = oe(t[a]).split("-")).length,
                i = (i = oe(t[a + 1])) ? i.split("-") : null;
              e > 0;

            ) {
              if ((s = re(n.slice(0, e).join("-")))) return s;
              if (i && i.length >= e && x(n, i, !0) >= e - 1) break;
              e--;
            }
            a++;
          }
          return ee;
        })(t);
      }
      function de(t) {
        var e,
          i = t._a;
        return (
          i &&
            -2 === u(t).overflow &&
            ((e =
              i[gt] < 0 || i[gt] > 11
                ? gt
                : i[yt] < 1 || i[yt] > Yt(i[mt], i[gt])
                ? yt
                : i[vt] < 0 ||
                  i[vt] > 24 ||
                  (24 === i[vt] && (0 !== i[bt] || 0 !== i[wt] || 0 !== i[_t]))
                ? vt
                : i[bt] < 0 || i[bt] > 59
                ? bt
                : i[wt] < 0 || i[wt] > 59
                ? wt
                : i[_t] < 0 || i[_t] > 999
                ? _t
                : -1),
            u(t)._overflowDayOfYear && (e < mt || e > yt) && (e = yt),
            u(t)._overflowWeeks && -1 === e && (e = xt),
            u(t)._overflowWeekday && -1 === e && (e = Dt),
            (u(t).overflow = e)),
          t
        );
      }
      function ue(t, e, i) {
        return null != t ? t : null != e ? e : i;
      }
      function fe(t) {
        var e,
          s,
          n,
          a,
          o,
          r = [];
        if (!t._d) {
          for (
            n = (function (t) {
              var e = new Date(i.now());
              return t._useUTC
                ? [e.getUTCFullYear(), e.getUTCMonth(), e.getUTCDate()]
                : [e.getFullYear(), e.getMonth(), e.getDate()];
            })(t),
              t._w &&
                null == t._a[yt] &&
                null == t._a[gt] &&
                (function (t) {
                  var e, i, s, n, a, o, r, l;
                  if (null != (e = t._w).GG || null != e.W || null != e.E)
                    (a = 1),
                      (o = 4),
                      (i = ue(e.GG, t._a[mt], Nt(Pe(), 1, 4).year)),
                      (s = ue(e.W, 1)),
                      ((n = ue(e.E, 1)) < 1 || n > 7) && (l = !0);
                  else {
                    (a = t._locale._week.dow), (o = t._locale._week.doy);
                    var h = Nt(Pe(), a, o);
                    (i = ue(e.gg, t._a[mt], h.year)),
                      (s = ue(e.w, h.week)),
                      null != e.d
                        ? ((n = e.d) < 0 || n > 6) && (l = !0)
                        : null != e.e
                        ? ((n = e.e + a), (e.e < 0 || e.e > 6) && (l = !0))
                        : (n = a);
                  }
                  s < 1 || s > Bt(i, a, o)
                    ? (u(t)._overflowWeeks = !0)
                    : null != l
                    ? (u(t)._overflowWeekday = !0)
                    : ((r = jt(i, s, n, a, o)),
                      (t._a[mt] = r.year),
                      (t._dayOfYear = r.dayOfYear));
                })(t),
              null != t._dayOfYear &&
                ((o = ue(t._a[mt], n[mt])),
                (t._dayOfYear > kt(o) || 0 === t._dayOfYear) &&
                  (u(t)._overflowDayOfYear = !0),
                (s = Ht(o, 0, t._dayOfYear)),
                (t._a[gt] = s.getUTCMonth()),
                (t._a[yt] = s.getUTCDate())),
              e = 0;
            e < 3 && null == t._a[e];
            ++e
          )
            t._a[e] = r[e] = n[e];
          for (; e < 7; e++)
            t._a[e] = r[e] = null == t._a[e] ? (2 === e ? 1 : 0) : t._a[e];
          24 === t._a[vt] &&
            0 === t._a[bt] &&
            0 === t._a[wt] &&
            0 === t._a[_t] &&
            ((t._nextDay = !0), (t._a[vt] = 0)),
            (t._d = (
              t._useUTC
                ? Ht
                : function (t, e, i, s, n, a, o) {
                    var r = new Date(t, e, i, s, n, a, o);
                    return (
                      t < 100 &&
                        t >= 0 &&
                        isFinite(r.getFullYear()) &&
                        r.setFullYear(t),
                      r
                    );
                  }
            ).apply(null, r)),
            (a = t._useUTC ? t._d.getUTCDay() : t._d.getDay()),
            null != t._tzm && t._d.setUTCMinutes(t._d.getUTCMinutes() - t._tzm),
            t._nextDay && (t._a[vt] = 24),
            t._w &&
              void 0 !== t._w.d &&
              t._w.d !== a &&
              (u(t).weekdayMismatch = !0);
        }
      }
      var pe =
          /^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/,
        me =
          /^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/,
        ge = /Z|[+-]\d\d(?::?\d\d)?/,
        ye = [
          ["YYYYYY-MM-DD", /[+-]\d{6}-\d\d-\d\d/],
          ["YYYY-MM-DD", /\d{4}-\d\d-\d\d/],
          ["GGGG-[W]WW-E", /\d{4}-W\d\d-\d/],
          ["GGGG-[W]WW", /\d{4}-W\d\d/, !1],
          ["YYYY-DDD", /\d{4}-\d{3}/],
          ["YYYY-MM", /\d{4}-\d\d/, !1],
          ["YYYYYYMMDD", /[+-]\d{10}/],
          ["YYYYMMDD", /\d{8}/],
          ["GGGG[W]WWE", /\d{4}W\d{3}/],
          ["GGGG[W]WW", /\d{4}W\d{2}/, !1],
          ["YYYYDDD", /\d{7}/],
        ],
        ve = [
          ["HH:mm:ss.SSSS", /\d\d:\d\d:\d\d\.\d+/],
          ["HH:mm:ss,SSSS", /\d\d:\d\d:\d\d,\d+/],
          ["HH:mm:ss", /\d\d:\d\d:\d\d/],
          ["HH:mm", /\d\d:\d\d/],
          ["HHmmss.SSSS", /\d\d\d\d\d\d\.\d+/],
          ["HHmmss,SSSS", /\d\d\d\d\d\d,\d+/],
          ["HHmmss", /\d\d\d\d\d\d/],
          ["HHmm", /\d\d\d\d/],
          ["HH", /\d\d/],
        ],
        be = /^\/?Date\((\-?\d+)/i;
      function we(t) {
        var e,
          i,
          s,
          n,
          a,
          o,
          r = t._i,
          l = pe.exec(r) || me.exec(r);
        if (l) {
          for (u(t).iso = !0, e = 0, i = ye.length; e < i; e++)
            if (ye[e][1].exec(l[1])) {
              (n = ye[e][0]), (s = !1 !== ye[e][2]);
              break;
            }
          if (null == n) return void (t._isValid = !1);
          if (l[3]) {
            for (e = 0, i = ve.length; e < i; e++)
              if (ve[e][1].exec(l[3])) {
                a = (l[2] || " ") + ve[e][0];
                break;
              }
            if (null == a) return void (t._isValid = !1);
          }
          if (!s && null != a) return void (t._isValid = !1);
          if (l[4]) {
            if (!ge.exec(l[4])) return void (t._isValid = !1);
            o = "Z";
          }
          (t._f = n + (a || "") + (o || "")), Ce(t);
        } else t._isValid = !1;
      }
      var _e =
        /^(?:(Mon|Tue|Wed|Thu|Fri|Sat|Sun),?\s)?(\d{1,2})\s(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(\d{2,4})\s(\d\d):(\d\d)(?::(\d\d))?\s(?:(UT|GMT|[ECMP][SD]T)|([Zz])|([+-]\d{4}))$/;
      function xe(t) {
        var e = parseInt(t, 10);
        return e <= 49 ? 2e3 + e : e <= 999 ? 1900 + e : e;
      }
      var De = {
        UT: 0,
        GMT: 0,
        EDT: -240,
        EST: -300,
        CDT: -300,
        CST: -360,
        MDT: -360,
        MST: -420,
        PDT: -420,
        PST: -480,
      };
      function ke(t) {
        var e,
          i,
          s,
          n,
          a,
          o,
          r,
          l = _e.exec(
            t._i
              .replace(/\([^)]*\)|[\n\t]/g, " ")
              .replace(/(\s\s+)/g, " ")
              .replace(/^\s\s*/, "")
              .replace(/\s\s*$/, "")
          );
        if (l) {
          var h =
            ((e = l[4]),
            (i = l[3]),
            (s = l[2]),
            (n = l[5]),
            (a = l[6]),
            (o = l[7]),
            (r = [
              xe(e),
              It.indexOf(i),
              parseInt(s, 10),
              parseInt(n, 10),
              parseInt(a, 10),
            ]),
            o && r.push(parseInt(o, 10)),
            r);
          if (
            !(function (t, e, i) {
              return (
                !t ||
                Ut.indexOf(t) === new Date(e[0], e[1], e[2]).getDay() ||
                ((u(i).weekdayMismatch = !0), (i._isValid = !1), !1)
              );
            })(l[1], h, t)
          )
            return;
          (t._a = h),
            (t._tzm = (function (t, e, i) {
              if (t) return De[t];
              if (e) return 0;
              var s = parseInt(i, 10),
                n = s % 100;
              return ((s - n) / 100) * 60 + n;
            })(l[8], l[9], l[10])),
            (t._d = Ht.apply(null, t._a)),
            t._d.setUTCMinutes(t._d.getUTCMinutes() - t._tzm),
            (u(t).rfc2822 = !0);
        } else t._isValid = !1;
      }
      function Ce(t) {
        if (t._f !== i.ISO_8601)
          if (t._f !== i.RFC_2822) {
            (t._a = []), (u(t).empty = !0);
            var e,
              s,
              n,
              a,
              o,
              r = "" + t._i,
              l = r.length,
              h = 0;
            for (n = B(t._f, t._locale).match(R) || [], e = 0; e < n.length; e++)
              (a = n[e]),
                (s = (r.match(ht(a, t)) || [])[0]) &&
                  ((o = r.substr(0, r.indexOf(s))).length > 0 &&
                    u(t).unusedInput.push(o),
                  (r = r.slice(r.indexOf(s) + s.length)),
                  (h += s.length)),
                W[a]
                  ? (s ? (u(t).empty = !1) : u(t).unusedTokens.push(a),
                    pt(a, s, t))
                  : t._strict && !s && u(t).unusedTokens.push(a);
            (u(t).charsLeftOver = l - h),
              r.length > 0 && u(t).unusedInput.push(r),
              t._a[vt] <= 12 &&
                !0 === u(t).bigHour &&
                t._a[vt] > 0 &&
                (u(t).bigHour = void 0),
              (u(t).parsedDateParts = t._a.slice(0)),
              (u(t).meridiem = t._meridiem),
              (t._a[vt] = (function (t, e, i) {
                var s;
                return null == i
                  ? e
                  : null != t.meridiemHour
                  ? t.meridiemHour(e, i)
                  : null != t.isPM
                  ? ((s = t.isPM(i)) && e < 12 && (e += 12),
                    s || 12 !== e || (e = 0),
                    e)
                  : e;
              })(t._locale, t._a[vt], t._meridiem)),
              fe(t),
              de(t);
          } else ke(t);
        else we(t);
      }
      function Se(t) {
        var e = t._i,
          h = t._f;
        return (
          (t._locale = t._locale || ce(t._l)),
          null === e || (void 0 === h && "" === e)
            ? p({ nullInput: !0 })
            : ("string" == typeof e && (t._i = e = t._locale.preparse(e)),
              b(e)
                ? new v(de(e))
                : (r(e)
                    ? (t._d = e)
                    : s(h)
                    ? (function (t) {
                        var e, i, s, n, a;
                        if (0 === t._f.length)
                          return (
                            (u(t).invalidFormat = !0), void (t._d = new Date(NaN))
                          );
                        for (n = 0; n < t._f.length; n++)
                          (a = 0),
                            (e = g({}, t)),
                            null != t._useUTC && (e._useUTC = t._useUTC),
                            (e._f = t._f[n]),
                            Ce(e),
                            f(e) &&
                              ((a += u(e).charsLeftOver),
                              (a += 10 * u(e).unusedTokens.length),
                              (u(e).score = a),
                              (null == s || a < s) && ((s = a), (i = e)));
                        c(t, i || e);
                      })(t)
                    : h
                    ? Ce(t)
                    : (function (t) {
                        var e = t._i;
                        a(e)
                          ? (t._d = new Date(i.now()))
                          : r(e)
                          ? (t._d = new Date(e.valueOf()))
                          : "string" == typeof e
                          ? (function (t) {
                              var e = be.exec(t._i);
                              null === e
                                ? (we(t),
                                  !1 === t._isValid &&
                                    (delete t._isValid,
                                    ke(t),
                                    !1 === t._isValid &&
                                      (delete t._isValid,
                                      i.createFromInputFallback(t))))
                                : (t._d = new Date(+e[1]));
                            })(t)
                          : s(e)
                          ? ((t._a = l(e.slice(0), function (t) {
                              return parseInt(t, 10);
                            })),
                            fe(t))
                          : n(e)
                          ? (function (t) {
                              if (!t._d) {
                                var e = I(t._i);
                                (t._a = l(
                                  [
                                    e.year,
                                    e.month,
                                    e.day || e.date,
                                    e.hour,
                                    e.minute,
                                    e.second,
                                    e.millisecond,
                                  ],
                                  function (t) {
                                    return t && parseInt(t, 10);
                                  }
                                )),
                                  fe(t);
                              }
                            })(t)
                          : o(e)
                          ? (t._d = new Date(e))
                          : i.createFromInputFallback(t);
                      })(t),
                  f(t) || (t._d = null),
                  t))
        );
      }
      function Me(t, e, i, a, o) {
        var r,
          l = {};
        return (
          (!0 !== i && !1 !== i) || ((a = i), (i = void 0)),
          ((n(t) &&
            (function (t) {
              if (Object.getOwnPropertyNames)
                return 0 === Object.getOwnPropertyNames(t).length;
              var e;
              for (e in t) if (t.hasOwnProperty(e)) return !1;
              return !0;
            })(t)) ||
            (s(t) && 0 === t.length)) &&
            (t = void 0),
          (l._isAMomentObject = !0),
          (l._useUTC = l._isUTC = o),
          (l._l = i),
          (l._i = t),
          (l._f = e),
          (l._strict = a),
          (r = new v(de(Se(l))))._nextDay &&
            (r.add(1, "d"), (r._nextDay = void 0)),
          r
        );
      }
      function Pe(t, e, i, s) {
        return Me(t, e, i, s, !1);
      }
      (i.createFromInputFallback = k(
        "value provided is not in a recognized RFC2822 or ISO format. moment construction falls back to js Date(), which is not reliable across all browsers and versions. Non RFC2822/ISO date formats are discouraged and will be removed in an upcoming major release. Please refer to http://momentjs.com/guides/#/warnings/js-date/ for more info.",
        function (t) {
          t._d = new Date(t._i + (t._useUTC ? " UTC" : ""));
        }
      )),
        (i.ISO_8601 = function () {}),
        (i.RFC_2822 = function () {});
      var Te = k(
          "moment().min is deprecated, use moment.max instead. http://momentjs.com/guides/#/warnings/min-max/",
          function () {
            var t = Pe.apply(null, arguments);
            return this.isValid() && t.isValid() ? (t < this ? this : t) : p();
          }
        ),
        $e = k(
          "moment().max is deprecated, use moment.min instead. http://momentjs.com/guides/#/warnings/min-max/",
          function () {
            var t = Pe.apply(null, arguments);
            return this.isValid() && t.isValid() ? (t > this ? this : t) : p();
          }
        );
      function Ye(t, e) {
        var i, n;
        if ((1 === e.length && s(e[0]) && (e = e[0]), !e.length)) return Pe();
        for (i = e[0], n = 1; n < e.length; ++n)
          (e[n].isValid() && !e[n][t](i)) || (i = e[n]);
        return i;
      }
      var Ee = [
        "year",
        "quarter",
        "month",
        "week",
        "day",
        "hour",
        "minute",
        "second",
        "millisecond",
      ];
      function Oe(t) {
        var e = I(t),
          i = e.year || 0,
          s = e.quarter || 0,
          n = e.month || 0,
          a = e.week || 0,
          o = e.day || 0,
          r = e.hour || 0,
          l = e.minute || 0,
          h = e.second || 0,
          c = e.millisecond || 0;
        (this._isValid = (function (t) {
          for (var e in t)
            if (-1 === St.call(Ee, e) || (null != t[e] && isNaN(t[e]))) return !1;
          for (var i = !1, s = 0; s < Ee.length; ++s)
            if (t[Ee[s]]) {
              if (i) return !1;
              parseFloat(t[Ee[s]]) !== _(t[Ee[s]]) && (i = !0);
            }
          return !0;
        })(e)),
          (this._milliseconds = +c + 1e3 * h + 6e4 * l + 1e3 * r * 60 * 60),
          (this._days = +o + 7 * a),
          (this._months = +n + 3 * s + 12 * i),
          (this._data = {}),
          (this._locale = ce()),
          this._bubble();
      }
      function Ie(t) {
        return t instanceof Oe;
      }
      function Le(t) {
        return t < 0 ? -1 * Math.round(-1 * t) : Math.round(t);
      }
      function Ae(t, e) {
        j(t, 0, 0, function () {
          var t = this.utcOffset(),
            i = "+";
          return (
            t < 0 && ((t = -t), (i = "-")),
            i + z(~~(t / 60), 2) + e + z(~~t % 60, 2)
          );
        });
      }
      Ae("Z", ":"),
        Ae("ZZ", ""),
        lt("Z", at),
        lt("ZZ", at),
        ut(["Z", "ZZ"], function (t, e, i) {
          (i._useUTC = !0), (i._tzm = Re(at, t));
        });
      var ze = /([\+\-]|\d\d)/gi;
      function Re(t, e) {
        var i = (e || "").match(t);
        if (null === i) return null;
        var s = ((i[i.length - 1] || []) + "").match(ze) || ["-", 0, 0],
          n = 60 * s[1] + _(s[2]);
        return 0 === n ? 0 : "+" === s[0] ? n : -n;
      }
      function Fe(t, e) {
        var s, n;
        return e._isUTC
          ? ((s = e.clone()),
            (n = (b(t) || r(t) ? t.valueOf() : Pe(t).valueOf()) - s.valueOf()),
            s._d.setTime(s._d.valueOf() + n),
            i.updateOffset(s, !1),
            s)
          : Pe(t).local();
      }
      function He(t) {
        return 15 * -Math.round(t._d.getTimezoneOffset() / 15);
      }
      function We() {
        return !!this.isValid() && this._isUTC && 0 === this._offset;
      }
      i.updateOffset = function () {};
      var je = /^(\-|\+)?(?:(\d*)[. ])?(\d+)\:(\d+)(?:\:(\d+)(\.\d*)?)?$/,
        Ne =
          /^(-|\+)?P(?:([-+]?[0-9,.]*)Y)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)W)?(?:([-+]?[0-9,.]*)D)?(?:T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?)?$/;
      function Be(t, e) {
        var i,
          s,
          n,
          a = t,
          r = null;
        return (
          Ie(t)
            ? (a = { ms: t._milliseconds, d: t._days, M: t._months })
            : o(t)
            ? ((a = {}), e ? (a[e] = t) : (a.milliseconds = t))
            : (r = je.exec(t))
            ? ((i = "-" === r[1] ? -1 : 1),
              (a = {
                y: 0,
                d: _(r[yt]) * i,
                h: _(r[vt]) * i,
                m: _(r[bt]) * i,
                s: _(r[wt]) * i,
                ms: _(Le(1e3 * r[_t])) * i,
              }))
            : (r = Ne.exec(t))
            ? ((i = "-" === r[1] ? -1 : (r[1], 1)),
              (a = {
                y: Ve(r[2], i),
                M: Ve(r[3], i),
                w: Ve(r[4], i),
                d: Ve(r[5], i),
                h: Ve(r[6], i),
                m: Ve(r[7], i),
                s: Ve(r[8], i),
              }))
            : null == a
            ? (a = {})
            : "object" === _typeof(a) &&
              ("from" in a || "to" in a) &&
              ((n = (function (t, e) {
                var i;
                return t.isValid() && e.isValid()
                  ? ((e = Fe(e, t)),
                    t.isBefore(e)
                      ? (i = Ue(t, e))
                      : (((i = Ue(e, t)).milliseconds = -i.milliseconds),
                        (i.months = -i.months)),
                    i)
                  : { milliseconds: 0, months: 0 };
              })(Pe(a.from), Pe(a.to))),
              ((a = {}).ms = n.milliseconds),
              (a.M = n.months)),
          (s = new Oe(a)),
          Ie(t) && h(t, "_locale") && (s._locale = t._locale),
          s
        );
      }
      function Ve(t, e) {
        var i = t && parseFloat(t.replace(",", "."));
        return (isNaN(i) ? 0 : i) * e;
      }
      function Ue(t, e) {
        var i = { milliseconds: 0, months: 0 };
        return (
          (i.months = e.month() - t.month() + 12 * (e.year() - t.year())),
          t.clone().add(i.months, "M").isAfter(e) && --i.months,
          (i.milliseconds = +e - +t.clone().add(i.months, "M")),
          i
        );
      }
      function qe(t, e) {
        return function (i, s) {
          var n;
          return (
            null === s ||
              isNaN(+s) ||
              (M(
                e,
                "moment()." +
                  e +
                  "(period, number) is deprecated. Please use moment()." +
                  e +
                  "(number, period). See http://momentjs.com/guides/#/warnings/add-inverted-param/ for more info."
              ),
              (n = i),
              (i = s),
              (s = n)),
            Ge(this, Be((i = "string" == typeof i ? +i : i), s), t),
            this
          );
        };
      }
      function Ge(t, e, s, n) {
        var a = e._milliseconds,
          o = Le(e._days),
          r = Le(e._months);
        t.isValid() &&
          ((n = null == n || n),
          r && Lt(t, Tt(t, "Month") + r * s),
          o && $t(t, "Date", Tt(t, "Date") + o * s),
          a && t._d.setTime(t._d.valueOf() + a * s),
          n && i.updateOffset(t, o || r));
      }
      (Be.fn = Oe.prototype),
        (Be.invalid = function () {
          return Be(NaN);
        });
      var Xe = qe(1, "add"),
        Ze = qe(-1, "subtract");
      function Qe(t, e) {
        var i = 12 * (e.year() - t.year()) + (e.month() - t.month()),
          s = t.clone().add(i, "months");
        return (
          -(
            i +
            (e - s < 0
              ? (e - s) / (s - t.clone().add(i - 1, "months"))
              : (e - s) / (t.clone().add(i + 1, "months") - s))
          ) || 0
        );
      }
      function Ke(t) {
        var e;
        return void 0 === t
          ? this._locale._abbr
          : (null != (e = ce(t)) && (this._locale = e), this);
      }
      (i.defaultFormat = "YYYY-MM-DDTHH:mm:ssZ"),
        (i.defaultFormatUtc = "YYYY-MM-DDTHH:mm:ss[Z]");
      var Je = k(
        "moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.",
        function (t) {
          return void 0 === t ? this.localeData() : this.locale(t);
        }
      );
      function ti() {
        return this._locale;
      }
      function ei(t, e) {
        j(0, [t, t.length], 0, e);
      }
      function ii(t, e, i, s, n) {
        var a;
        return null == t
          ? Nt(this, s, n).year
          : (e > (a = Bt(t, s, n)) && (e = a),
            function (t, e, i, s, n) {
              var a = jt(t, e, i, s, n),
                o = Ht(a.year, 0, a.dayOfYear);
              return (
                this.year(o.getUTCFullYear()),
                this.month(o.getUTCMonth()),
                this.date(o.getUTCDate()),
                this
              );
            }.call(this, t, e, i, s, n));
      }
      j(0, ["gg", 2], 0, function () {
        return this.weekYear() % 100;
      }),
        j(0, ["GG", 2], 0, function () {
          return this.isoWeekYear() % 100;
        }),
        ei("gggg", "weekYear"),
        ei("ggggg", "weekYear"),
        ei("GGGG", "isoWeekYear"),
        ei("GGGGG", "isoWeekYear"),
        E("weekYear", "gg"),
        E("isoWeekYear", "GG"),
        A("weekYear", 1),
        A("isoWeekYear", 1),
        lt("G", st),
        lt("g", st),
        lt("GG", Z, U),
        lt("gg", Z, U),
        lt("GGGG", tt, G),
        lt("gggg", tt, G),
        lt("GGGGG", et, X),
        lt("ggggg", et, X),
        ft(["gggg", "ggggg", "GGGG", "GGGGG"], function (t, e, i, s) {
          e[s.substr(0, 2)] = _(t);
        }),
        ft(["gg", "GG"], function (t, e, s, n) {
          e[n] = i.parseTwoDigitYear(t);
        }),
        j("Q", 0, "Qo", "quarter"),
        E("quarter", "Q"),
        A("quarter", 7),
        lt("Q", V),
        ut("Q", function (t, e) {
          e[gt] = 3 * (_(t) - 1);
        }),
        j("D", ["DD", 2], "Do", "date"),
        E("date", "D"),
        A("date", 9),
        lt("D", Z),
        lt("DD", Z, U),
        lt("Do", function (t, e) {
          return t
            ? e._dayOfMonthOrdinalParse || e._ordinalParse
            : e._dayOfMonthOrdinalParseLenient;
        }),
        ut(["D", "DD"], yt),
        ut("Do", function (t, e) {
          e[yt] = _(t.match(Z)[0]);
        });
      var si = Pt("Date", !0);
      j("DDD", ["DDDD", 3], "DDDo", "dayOfYear"),
        E("dayOfYear", "DDD"),
        A("dayOfYear", 4),
        lt("DDD", J),
        lt("DDDD", q),
        ut(["DDD", "DDDD"], function (t, e, i) {
          i._dayOfYear = _(t);
        }),
        j("m", ["mm", 2], 0, "minute"),
        E("minute", "m"),
        A("minute", 14),
        lt("m", Z),
        lt("mm", Z, U),
        ut(["m", "mm"], bt);
      var ni = Pt("Minutes", !1);
      j("s", ["ss", 2], 0, "second"),
        E("second", "s"),
        A("second", 15),
        lt("s", Z),
        lt("ss", Z, U),
        ut(["s", "ss"], wt);
      var ai,
        oi = Pt("Seconds", !1);
      for (
        j("S", 0, 0, function () {
          return ~~(this.millisecond() / 100);
        }),
          j(0, ["SS", 2], 0, function () {
            return ~~(this.millisecond() / 10);
          }),
          j(0, ["SSS", 3], 0, "millisecond"),
          j(0, ["SSSS", 4], 0, function () {
            return 10 * this.millisecond();
          }),
          j(0, ["SSSSS", 5], 0, function () {
            return 100 * this.millisecond();
          }),
          j(0, ["SSSSSS", 6], 0, function () {
            return 1e3 * this.millisecond();
          }),
          j(0, ["SSSSSSS", 7], 0, function () {
            return 1e4 * this.millisecond();
          }),
          j(0, ["SSSSSSSS", 8], 0, function () {
            return 1e5 * this.millisecond();
          }),
          j(0, ["SSSSSSSSS", 9], 0, function () {
            return 1e6 * this.millisecond();
          }),
          E("millisecond", "ms"),
          A("millisecond", 16),
          lt("S", J, V),
          lt("SS", J, U),
          lt("SSS", J, q),
          ai = "SSSS";
        ai.length <= 9;
        ai += "S"
      )
        lt(ai, it);
      function ri(t, e) {
        e[_t] = _(1e3 * ("0." + t));
      }
      for (ai = "S"; ai.length <= 9; ai += "S") ut(ai, ri);
      var li = Pt("Milliseconds", !1);
      j("z", 0, 0, "zoneAbbr"), j("zz", 0, 0, "zoneName");
      var hi = v.prototype;
      function ci(t) {
        return t;
      }
      (hi.add = Xe),
        (hi.calendar = function (t, e) {
          var s = t || Pe(),
            n = Fe(s, this).startOf("day"),
            a = i.calendarFormat(this, n) || "sameElse",
            o = e && (P(e[a]) ? e[a].call(this, s) : e[a]);
          return this.format(o || this.localeData().calendar(a, this, Pe(s)));
        }),
        (hi.clone = function () {
          return new v(this);
        }),
        (hi.diff = function (t, e, i) {
          var s, n, a;
          if (!this.isValid()) return NaN;
          if (!(s = Fe(t, this)).isValid()) return NaN;
          switch (((n = 6e4 * (s.utcOffset() - this.utcOffset())), (e = O(e)))) {
            case "year":
              a = Qe(this, s) / 12;
              break;
            case "month":
              a = Qe(this, s);
              break;
            case "quarter":
              a = Qe(this, s) / 3;
              break;
            case "second":
              a = (this - s) / 1e3;
              break;
            case "minute":
              a = (this - s) / 6e4;
              break;
            case "hour":
              a = (this - s) / 36e5;
              break;
            case "day":
              a = (this - s - n) / 864e5;
              break;
            case "week":
              a = (this - s - n) / 6048e5;
              break;
            default:
              a = this - s;
          }
          return i ? a : w(a);
        }),
        (hi.endOf = function (t) {
          return void 0 === (t = O(t)) || "millisecond" === t
            ? this
            : ("date" === t && (t = "day"),
              this.startOf(t)
                .add(1, "isoWeek" === t ? "week" : t)
                .subtract(1, "ms"));
        }),
        (hi.format = function (t) {
          t || (t = this.isUtc() ? i.defaultFormatUtc : i.defaultFormat);
          var e = N(this, t);
          return this.localeData().postformat(e);
        }),
        (hi.from = function (t, e) {
          return this.isValid() && ((b(t) && t.isValid()) || Pe(t).isValid())
            ? Be({ to: this, from: t }).locale(this.locale()).humanize(!e)
            : this.localeData().invalidDate();
        }),
        (hi.fromNow = function (t) {
          return this.from(Pe(), t);
        }),
        (hi.to = function (t, e) {
          return this.isValid() && ((b(t) && t.isValid()) || Pe(t).isValid())
            ? Be({ from: this, to: t }).locale(this.locale()).humanize(!e)
            : this.localeData().invalidDate();
        }),
        (hi.toNow = function (t) {
          return this.to(Pe(), t);
        }),
        (hi.get = function (t) {
          return P(this[(t = O(t))]) ? this[t]() : this;
        }),
        (hi.invalidAt = function () {
          return u(this).overflow;
        }),
        (hi.isAfter = function (t, e) {
          var i = b(t) ? t : Pe(t);
          return (
            !(!this.isValid() || !i.isValid()) &&
            ("millisecond" === (e = O(a(e) ? "millisecond" : e))
              ? this.valueOf() > i.valueOf()
              : i.valueOf() < this.clone().startOf(e).valueOf())
          );
        }),
        (hi.isBefore = function (t, e) {
          var i = b(t) ? t : Pe(t);
          return (
            !(!this.isValid() || !i.isValid()) &&
            ("millisecond" === (e = O(a(e) ? "millisecond" : e))
              ? this.valueOf() < i.valueOf()
              : this.clone().endOf(e).valueOf() < i.valueOf())
          );
        }),
        (hi.isBetween = function (t, e, i, s) {
          return (
            ("(" === (s = s || "()")[0]
              ? this.isAfter(t, i)
              : !this.isBefore(t, i)) &&
            (")" === s[1] ? this.isBefore(e, i) : !this.isAfter(e, i))
          );
        }),
        (hi.isSame = function (t, e) {
          var i,
            s = b(t) ? t : Pe(t);
          return (
            !(!this.isValid() || !s.isValid()) &&
            ("millisecond" === (e = O(e || "millisecond"))
              ? this.valueOf() === s.valueOf()
              : ((i = s.valueOf()),
                this.clone().startOf(e).valueOf() <= i &&
                  i <= this.clone().endOf(e).valueOf()))
          );
        }),
        (hi.isSameOrAfter = function (t, e) {
          return this.isSame(t, e) || this.isAfter(t, e);
        }),
        (hi.isSameOrBefore = function (t, e) {
          return this.isSame(t, e) || this.isBefore(t, e);
        }),
        (hi.isValid = function () {
          return f(this);
        }),
        (hi.lang = Je),
        (hi.locale = Ke),
        (hi.localeData = ti),
        (hi.max = $e),
        (hi.min = Te),
        (hi.parsingFlags = function () {
          return c({}, u(this));
        }),
        (hi.set = function (t, e) {
          if ("object" === _typeof(t))
            for (
              var i = (function (t) {
                  var e = [];
                  for (var i in t) e.push({ unit: i, priority: L[i] });
                  return (
                    e.sort(function (t, e) {
                      return t.priority - e.priority;
                    }),
                    e
                  );
                })((t = I(t))),
                s = 0;
              s < i.length;
              s++
            )
              this[i[s].unit](t[i[s].unit]);
          else if (P(this[(t = O(t))])) return this[t](e);
          return this;
        }),
        (hi.startOf = function (t) {
          switch ((t = O(t))) {
            case "year":
              this.month(0);
            case "quarter":
            case "month":
              this.date(1);
            case "week":
            case "isoWeek":
            case "day":
            case "date":
              this.hours(0);
            case "hour":
              this.minutes(0);
            case "minute":
              this.seconds(0);
            case "second":
              this.milliseconds(0);
          }
          return (
            "week" === t && this.weekday(0),
            "isoWeek" === t && this.isoWeekday(1),
            "quarter" === t && this.month(3 * Math.floor(this.month() / 3)),
            this
          );
        }),
        (hi.subtract = Ze),
        (hi.toArray = function () {
          var t = this;
          return [
            t.year(),
            t.month(),
            t.date(),
            t.hour(),
            t.minute(),
            t.second(),
            t.millisecond(),
          ];
        }),
        (hi.toObject = function () {
          var t = this;
          return {
            years: t.year(),
            months: t.month(),
            date: t.date(),
            hours: t.hours(),
            minutes: t.minutes(),
            seconds: t.seconds(),
            milliseconds: t.milliseconds(),
          };
        }),
        (hi.toDate = function () {
          return new Date(this.valueOf());
        }),
        (hi.toISOString = function (t) {
          if (!this.isValid()) return null;
          var e = !0 !== t,
            i = e ? this.clone().utc() : this;
          return i.year() < 0 || i.year() > 9999
            ? N(
                i,
                e
                  ? "YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]"
                  : "YYYYYY-MM-DD[T]HH:mm:ss.SSSZ"
              )
            : P(Date.prototype.toISOString)
            ? e
              ? this.toDate().toISOString()
              : new Date(this.valueOf() + 60 * this.utcOffset() * 1e3)
                  .toISOString()
                  .replace("Z", N(i, "Z"))
            : N(
                i,
                e ? "YYYY-MM-DD[T]HH:mm:ss.SSS[Z]" : "YYYY-MM-DD[T]HH:mm:ss.SSSZ"
              );
        }),
        (hi.inspect = function () {
          if (!this.isValid()) return "moment.invalid(/* " + this._i + " */)";
          var t = "moment",
            e = "";
          this.isLocal() ||
            ((t = 0 === this.utcOffset() ? "moment.utc" : "moment.parseZone"),
            (e = "Z"));
          var i = "[" + t + '("]',
            s = 0 <= this.year() && this.year() <= 9999 ? "YYYY" : "YYYYYY",
            n = e + '[")]';
          return this.format(i + s + "-MM-DD[T]HH:mm:ss.SSS" + n);
        }),
        (hi.toJSON = function () {
          return this.isValid() ? this.toISOString() : null;
        }),
        (hi.toString = function () {
          return this.clone()
            .locale("en")
            .format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ");
        }),
        (hi.unix = function () {
          return Math.floor(this.valueOf() / 1e3);
        }),
        (hi.valueOf = function () {
          return this._d.valueOf() - 6e4 * (this._offset || 0);
        }),
        (hi.creationData = function () {
          return {
            input: this._i,
            format: this._f,
            locale: this._locale,
            isUTC: this._isUTC,
            strict: this._strict,
          };
        }),
        (hi.year = Mt),
        (hi.isLeapYear = function () {
          return Ct(this.year());
        }),
        (hi.weekYear = function (t) {
          return ii.call(
            this,
            t,
            this.week(),
            this.weekday(),
            this.localeData()._week.dow,
            this.localeData()._week.doy
          );
        }),
        (hi.isoWeekYear = function (t) {
          return ii.call(this, t, this.isoWeek(), this.isoWeekday(), 1, 4);
        }),
        (hi.quarter = hi.quarters =
          function (t) {
            return null == t
              ? Math.ceil((this.month() + 1) / 3)
              : this.month(3 * (t - 1) + (this.month() % 3));
          }),
        (hi.month = At),
        (hi.daysInMonth = function () {
          return Yt(this.year(), this.month());
        }),
        (hi.week = hi.weeks =
          function (t) {
            var e = this.localeData().week(this);
            return null == t ? e : this.add(7 * (t - e), "d");
          }),
        (hi.isoWeek = hi.isoWeeks =
          function (t) {
            var e = Nt(this, 1, 4).week;
            return null == t ? e : this.add(7 * (t - e), "d");
          }),
        (hi.weeksInYear = function () {
          var t = this.localeData()._week;
          return Bt(this.year(), t.dow, t.doy);
        }),
        (hi.isoWeeksInYear = function () {
          return Bt(this.year(), 1, 4);
        }),
        (hi.date = si),
        (hi.day = hi.days =
          function (t) {
            if (!this.isValid()) return null != t ? this : NaN;
            var e = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
            return null != t
              ? ((t = (function (t, e) {
                  return "string" != typeof t
                    ? t
                    : isNaN(t)
                    ? "number" == typeof (t = e.weekdaysParse(t))
                      ? t
                      : null
                    : parseInt(t, 10);
                })(t, this.localeData())),
                this.add(t - e, "d"))
              : e;
          }),
        (hi.weekday = function (t) {
          if (!this.isValid()) return null != t ? this : NaN;
          var e = (this.day() + 7 - this.localeData()._week.dow) % 7;
          return null == t ? e : this.add(t - e, "d");
        }),
        (hi.isoWeekday = function (t) {
          if (!this.isValid()) return null != t ? this : NaN;
          if (null != t) {
            var e = (function (t, e) {
              return "string" == typeof t
                ? e.weekdaysParse(t) % 7 || 7
                : isNaN(t)
                ? null
                : t;
            })(t, this.localeData());
            return this.day(this.day() % 7 ? e : e - 7);
          }
          return this.day() || 7;
        }),
        (hi.dayOfYear = function (t) {
          var e =
            Math.round(
              (this.clone().startOf("day") - this.clone().startOf("year")) / 864e5
            ) + 1;
          return null == t ? e : this.add(t - e, "d");
        }),
        (hi.hour = hi.hours = ie),
        (hi.minute = hi.minutes = ni),
        (hi.second = hi.seconds = oi),
        (hi.millisecond = hi.milliseconds = li),
        (hi.utcOffset = function (t, e, s) {
          var n,
            a = this._offset || 0;
          if (!this.isValid()) return null != t ? this : NaN;
          if (null != t) {
            if ("string" == typeof t) {
              if (null === (t = Re(at, t))) return this;
            } else Math.abs(t) < 16 && !s && (t *= 60);
            return (
              !this._isUTC && e && (n = He(this)),
              (this._offset = t),
              (this._isUTC = !0),
              null != n && this.add(n, "m"),
              a !== t &&
                (!e || this._changeInProgress
                  ? Ge(this, Be(t - a, "m"), 1, !1)
                  : this._changeInProgress ||
                    ((this._changeInProgress = !0),
                    i.updateOffset(this, !0),
                    (this._changeInProgress = null))),
              this
            );
          }
          return this._isUTC ? a : He(this);
        }),
        (hi.utc = function (t) {
          return this.utcOffset(0, t);
        }),
        (hi.local = function (t) {
          return (
            this._isUTC &&
              (this.utcOffset(0, t),
              (this._isUTC = !1),
              t && this.subtract(He(this), "m")),
            this
          );
        }),
        (hi.parseZone = function () {
          if (null != this._tzm) this.utcOffset(this._tzm, !1, !0);
          else if ("string" == typeof this._i) {
            var t = Re(nt, this._i);
            null != t ? this.utcOffset(t) : this.utcOffset(0, !0);
          }
          return this;
        }),
        (hi.hasAlignedHourOffset = function (t) {
          return (
            !!this.isValid() &&
            ((t = t ? Pe(t).utcOffset() : 0), (this.utcOffset() - t) % 60 == 0)
          );
        }),
        (hi.isDST = function () {
          return (
            this.utcOffset() > this.clone().month(0).utcOffset() ||
            this.utcOffset() > this.clone().month(5).utcOffset()
          );
        }),
        (hi.isLocal = function () {
          return !!this.isValid() && !this._isUTC;
        }),
        (hi.isUtcOffset = function () {
          return !!this.isValid() && this._isUTC;
        }),
        (hi.isUtc = We),
        (hi.isUTC = We),
        (hi.zoneAbbr = function () {
          return this._isUTC ? "UTC" : "";
        }),
        (hi.zoneName = function () {
          return this._isUTC ? "Coordinated Universal Time" : "";
        }),
        (hi.dates = k("dates accessor is deprecated. Use date instead.", si)),
        (hi.months = k("months accessor is deprecated. Use month instead", At)),
        (hi.years = k("years accessor is deprecated. Use year instead", Mt)),
        (hi.zone = k(
          "moment().zone is deprecated, use moment().utcOffset instead. http://momentjs.com/guides/#/warnings/zone/",
          function (t, e) {
            return null != t
              ? ("string" != typeof t && (t = -t), this.utcOffset(t, e), this)
              : -this.utcOffset();
          }
        )),
        (hi.isDSTShifted = k(
          "isDSTShifted is deprecated. See http://momentjs.com/guides/#/warnings/dst-shifted/ for more information",
          function () {
            if (!a(this._isDSTShifted)) return this._isDSTShifted;
            var t = {};
            if ((g(t, this), (t = Se(t))._a)) {
              var e = t._isUTC ? d(t._a) : Pe(t._a);
              this._isDSTShifted = this.isValid() && x(t._a, e.toArray()) > 0;
            } else this._isDSTShifted = !1;
            return this._isDSTShifted;
          }
        ));
      var di = $.prototype;
      function ui(t, e, i, s) {
        var n = ce(),
          a = d().set(s, e);
        return n[i](a, t);
      }
      function fi(t, e, i) {
        if ((o(t) && ((e = t), (t = void 0)), (t = t || ""), null != e))
          return ui(t, e, i, "month");
        var s,
          n = [];
        for (s = 0; s < 12; s++) n[s] = ui(t, s, i, "month");
        return n;
      }
      function pi(t, e, i, s) {
        "boolean" == typeof t
          ? (o(e) && ((i = e), (e = void 0)), (e = e || ""))
          : ((i = e = t),
            (t = !1),
            o(e) && ((i = e), (e = void 0)),
            (e = e || ""));
        var n,
          a = ce(),
          r = t ? a._week.dow : 0;
        if (null != i) return ui(e, (i + r) % 7, s, "day");
        var l = [];
        for (n = 0; n < 7; n++) l[n] = ui(e, (n + r) % 7, s, "day");
        return l;
      }
      (di.calendar = function (t, e, i) {
        var s = this._calendar[t] || this._calendar.sameElse;
        return P(s) ? s.call(e, i) : s;
      }),
        (di.longDateFormat = function (t) {
          var e = this._longDateFormat[t],
            i = this._longDateFormat[t.toUpperCase()];
          return e || !i
            ? e
            : ((this._longDateFormat[t] = i.replace(
                /MMMM|MM|DD|dddd/g,
                function (t) {
                  return t.slice(1);
                }
              )),
              this._longDateFormat[t]);
        }),
        (di.invalidDate = function () {
          return this._invalidDate;
        }),
        (di.ordinal = function (t) {
          return this._ordinal.replace("%d", t);
        }),
        (di.preparse = ci),
        (di.postformat = ci),
        (di.relativeTime = function (t, e, i, s) {
          var n = this._relativeTime[i];
          return P(n) ? n(t, e, i, s) : n.replace(/%d/i, t);
        }),
        (di.pastFuture = function (t, e) {
          var i = this._relativeTime[t > 0 ? "future" : "past"];
          return P(i) ? i(e) : i.replace(/%s/i, e);
        }),
        (di.set = function (t) {
          var e, i;
          for (i in t) P((e = t[i])) ? (this[i] = e) : (this["_" + i] = e);
          (this._config = t),
            (this._dayOfMonthOrdinalParseLenient = new RegExp(
              (this._dayOfMonthOrdinalParse.source || this._ordinalParse.source) +
                "|" +
                /\d{1,2}/.source
            ));
        }),
        (di.months = function (t, e) {
          return t
            ? s(this._months)
              ? this._months[t.month()]
              : this._months[
                  (this._months.isFormat || Et).test(e) ? "format" : "standalone"
                ][t.month()]
            : s(this._months)
            ? this._months
            : this._months.standalone;
        }),
        (di.monthsShort = function (t, e) {
          return t
            ? s(this._monthsShort)
              ? this._monthsShort[t.month()]
              : this._monthsShort[Et.test(e) ? "format" : "standalone"][t.month()]
            : s(this._monthsShort)
            ? this._monthsShort
            : this._monthsShort.standalone;
        }),
        (di.monthsParse = function (t, e, i) {
          var s, n, a;
          if (this._monthsParseExact)
            return function (t, e, i) {
              var s,
                n,
                a,
                o = t.toLocaleLowerCase();
              if (!this._monthsParse)
                for (
                  this._monthsParse = [],
                    this._longMonthsParse = [],
                    this._shortMonthsParse = [],
                    s = 0;
                  s < 12;
                  ++s
                )
                  (a = d([2e3, s])),
                    (this._shortMonthsParse[s] = this.monthsShort(
                      a,
                      ""
                    ).toLocaleLowerCase()),
                    (this._longMonthsParse[s] = this.months(
                      a,
                      ""
                    ).toLocaleLowerCase());
              return i
                ? "MMM" === e
                  ? -1 !== (n = St.call(this._shortMonthsParse, o))
                    ? n
                    : null
                  : -1 !== (n = St.call(this._longMonthsParse, o))
                  ? n
                  : null
                : "MMM" === e
                ? -1 !== (n = St.call(this._shortMonthsParse, o))
                  ? n
                  : -1 !== (n = St.call(this._longMonthsParse, o))
                  ? n
                  : null
                : -1 !== (n = St.call(this._longMonthsParse, o))
                ? n
                : -1 !== (n = St.call(this._shortMonthsParse, o))
                ? n
                : null;
            }.call(this, t, e, i);
          for (
            this._monthsParse ||
              ((this._monthsParse = []),
              (this._longMonthsParse = []),
              (this._shortMonthsParse = [])),
              s = 0;
            s < 12;
            s++
          ) {
            if (
              ((n = d([2e3, s])),
              i &&
                !this._longMonthsParse[s] &&
                ((this._longMonthsParse[s] = new RegExp(
                  "^" + this.months(n, "").replace(".", "") + "$",
                  "i"
                )),
                (this._shortMonthsParse[s] = new RegExp(
                  "^" + this.monthsShort(n, "").replace(".", "") + "$",
                  "i"
                ))),
              i ||
                this._monthsParse[s] ||
                ((a = "^" + this.months(n, "") + "|^" + this.monthsShort(n, "")),
                (this._monthsParse[s] = new RegExp(a.replace(".", ""), "i"))),
              i && "MMMM" === e && this._longMonthsParse[s].test(t))
            )
              return s;
            if (i && "MMM" === e && this._shortMonthsParse[s].test(t)) return s;
            if (!i && this._monthsParse[s].test(t)) return s;
          }
        }),
        (di.monthsRegex = function (t) {
          return this._monthsParseExact
            ? (h(this, "_monthsRegex") || Ft.call(this),
              t ? this._monthsStrictRegex : this._monthsRegex)
            : (h(this, "_monthsRegex") || (this._monthsRegex = Rt),
              this._monthsStrictRegex && t
                ? this._monthsStrictRegex
                : this._monthsRegex);
        }),
        (di.monthsShortRegex = function (t) {
          return this._monthsParseExact
            ? (h(this, "_monthsRegex") || Ft.call(this),
              t ? this._monthsShortStrictRegex : this._monthsShortRegex)
            : (h(this, "_monthsShortRegex") || (this._monthsShortRegex = zt),
              this._monthsShortStrictRegex && t
                ? this._monthsShortStrictRegex
                : this._monthsShortRegex);
        }),
        (di.week = function (t) {
          return Nt(t, this._week.dow, this._week.doy).week;
        }),
        (di.firstDayOfYear = function () {
          return this._week.doy;
        }),
        (di.firstDayOfWeek = function () {
          return this._week.dow;
        }),
        (di.weekdays = function (t, e) {
          return t
            ? s(this._weekdays)
              ? this._weekdays[t.day()]
              : this._weekdays[
                  this._weekdays.isFormat.test(e) ? "format" : "standalone"
                ][t.day()]
            : s(this._weekdays)
            ? this._weekdays
            : this._weekdays.standalone;
        }),
        (di.weekdaysMin = function (t) {
          return t ? this._weekdaysMin[t.day()] : this._weekdaysMin;
        }),
        (di.weekdaysShort = function (t) {
          return t ? this._weekdaysShort[t.day()] : this._weekdaysShort;
        }),
        (di.weekdaysParse = function (t, e, i) {
          var s, n, a;
          if (this._weekdaysParseExact)
            return function (t, e, i) {
              var s,
                n,
                a,
                o = t.toLocaleLowerCase();
              if (!this._weekdaysParse)
                for (
                  this._weekdaysParse = [],
                    this._shortWeekdaysParse = [],
                    this._minWeekdaysParse = [],
                    s = 0;
                  s < 7;
                  ++s
                )
                  (a = d([2e3, 1]).day(s)),
                    (this._minWeekdaysParse[s] = this.weekdaysMin(
                      a,
                      ""
                    ).toLocaleLowerCase()),
                    (this._shortWeekdaysParse[s] = this.weekdaysShort(
                      a,
                      ""
                    ).toLocaleLowerCase()),
                    (this._weekdaysParse[s] = this.weekdays(
                      a,
                      ""
                    ).toLocaleLowerCase());
              return i
                ? "dddd" === e
                  ? -1 !== (n = St.call(this._weekdaysParse, o))
                    ? n
                    : null
                  : "ddd" === e
                  ? -1 !== (n = St.call(this._shortWeekdaysParse, o))
                    ? n
                    : null
                  : -1 !== (n = St.call(this._minWeekdaysParse, o))
                  ? n
                  : null
                : "dddd" === e
                ? -1 !== (n = St.call(this._weekdaysParse, o))
                  ? n
                  : -1 !== (n = St.call(this._shortWeekdaysParse, o))
                  ? n
                  : -1 !== (n = St.call(this._minWeekdaysParse, o))
                  ? n
                  : null
                : "ddd" === e
                ? -1 !== (n = St.call(this._shortWeekdaysParse, o))
                  ? n
                  : -1 !== (n = St.call(this._weekdaysParse, o))
                  ? n
                  : -1 !== (n = St.call(this._minWeekdaysParse, o))
                  ? n
                  : null
                : -1 !== (n = St.call(this._minWeekdaysParse, o))
                ? n
                : -1 !== (n = St.call(this._weekdaysParse, o))
                ? n
                : -1 !== (n = St.call(this._shortWeekdaysParse, o))
                ? n
                : null;
            }.call(this, t, e, i);
          for (
            this._weekdaysParse ||
              ((this._weekdaysParse = []),
              (this._minWeekdaysParse = []),
              (this._shortWeekdaysParse = []),
              (this._fullWeekdaysParse = [])),
              s = 0;
            s < 7;
            s++
          ) {
            if (
              ((n = d([2e3, 1]).day(s)),
              i &&
                !this._fullWeekdaysParse[s] &&
                ((this._fullWeekdaysParse[s] = new RegExp(
                  "^" + this.weekdays(n, "").replace(".", "\\.?") + "$",
                  "i"
                )),
                (this._shortWeekdaysParse[s] = new RegExp(
                  "^" + this.weekdaysShort(n, "").replace(".", "\\.?") + "$",
                  "i"
                )),
                (this._minWeekdaysParse[s] = new RegExp(
                  "^" + this.weekdaysMin(n, "").replace(".", "\\.?") + "$",
                  "i"
                ))),
              this._weekdaysParse[s] ||
                ((a =
                  "^" +
                  this.weekdays(n, "") +
                  "|^" +
                  this.weekdaysShort(n, "") +
                  "|^" +
                  this.weekdaysMin(n, "")),
                (this._weekdaysParse[s] = new RegExp(a.replace(".", ""), "i"))),
              i && "dddd" === e && this._fullWeekdaysParse[s].test(t))
            )
              return s;
            if (i && "ddd" === e && this._shortWeekdaysParse[s].test(t)) return s;
            if (i && "dd" === e && this._minWeekdaysParse[s].test(t)) return s;
            if (!i && this._weekdaysParse[s].test(t)) return s;
          }
        }),
        (di.weekdaysRegex = function (t) {
          return this._weekdaysParseExact
            ? (h(this, "_weekdaysRegex") || Qt.call(this),
              t ? this._weekdaysStrictRegex : this._weekdaysRegex)
            : (h(this, "_weekdaysRegex") || (this._weekdaysRegex = Gt),
              this._weekdaysStrictRegex && t
                ? this._weekdaysStrictRegex
                : this._weekdaysRegex);
        }),
        (di.weekdaysShortRegex = function (t) {
          return this._weekdaysParseExact
            ? (h(this, "_weekdaysRegex") || Qt.call(this),
              t ? this._weekdaysShortStrictRegex : this._weekdaysShortRegex)
            : (h(this, "_weekdaysShortRegex") || (this._weekdaysShortRegex = Xt),
              this._weekdaysShortStrictRegex && t
                ? this._weekdaysShortStrictRegex
                : this._weekdaysShortRegex);
        }),
        (di.weekdaysMinRegex = function (t) {
          return this._weekdaysParseExact
            ? (h(this, "_weekdaysRegex") || Qt.call(this),
              t ? this._weekdaysMinStrictRegex : this._weekdaysMinRegex)
            : (h(this, "_weekdaysMinRegex") || (this._weekdaysMinRegex = Zt),
              this._weekdaysMinStrictRegex && t
                ? this._weekdaysMinStrictRegex
                : this._weekdaysMinRegex);
        }),
        (di.isPM = function (t) {
          return "p" === (t + "").toLowerCase().charAt(0);
        }),
        (di.meridiem = function (t, e, i) {
          return t > 11 ? (i ? "pm" : "PM") : i ? "am" : "AM";
        }),
        le("en", {
          dayOfMonthOrdinalParse: /\d{1,2}(th|st|nd|rd)/,
          ordinal: function (t) {
            var e = t % 10;
            return (
              t +
              (1 === _((t % 100) / 10)
                ? "th"
                : 1 === e
                ? "st"
                : 2 === e
                ? "nd"
                : 3 === e
                ? "rd"
                : "th")
            );
          },
        }),
        (i.lang = k("moment.lang is deprecated. Use moment.locale instead.", le)),
        (i.langData = k(
          "moment.langData is deprecated. Use moment.localeData instead.",
          ce
        ));
      var mi = Math.abs;
      function gi(t, e, i, s) {
        var n = Be(e, i);
        return (
          (t._milliseconds += s * n._milliseconds),
          (t._days += s * n._days),
          (t._months += s * n._months),
          t._bubble()
        );
      }
      function yi(t) {
        return t < 0 ? Math.floor(t) : Math.ceil(t);
      }
      function vi(t) {
        return (4800 * t) / 146097;
      }
      function bi(t) {
        return (146097 * t) / 4800;
      }
      function wi(t) {
        return function () {
          return this.as(t);
        };
      }
      var _i = wi("ms"),
        xi = wi("s"),
        Di = wi("m"),
        ki = wi("h"),
        Ci = wi("d"),
        Si = wi("w"),
        Mi = wi("M"),
        Pi = wi("y");
      function Ti(t) {
        return function () {
          return this.isValid() ? this._data[t] : NaN;
        };
      }
      var $i = Ti("milliseconds"),
        Yi = Ti("seconds"),
        Ei = Ti("minutes"),
        Oi = Ti("hours"),
        Ii = Ti("days"),
        Li = Ti("months"),
        Ai = Ti("years"),
        zi = Math.round,
        Ri = { ss: 44, s: 45, m: 45, h: 22, d: 26, M: 11 },
        Fi = Math.abs;
      function Hi(t) {
        return (t > 0) - (t < 0) || +t;
      }
      function Wi() {
        if (!this.isValid()) return this.localeData().invalidDate();
        var t,
          e,
          i = Fi(this._milliseconds) / 1e3,
          s = Fi(this._days),
          n = Fi(this._months);
        (t = w(i / 60)), (e = w(t / 60)), (i %= 60), (t %= 60);
        var a = w(n / 12),
          o = (n %= 12),
          r = s,
          l = e,
          h = t,
          c = i ? i.toFixed(3).replace(/\.?0+$/, "") : "",
          d = this.asSeconds();
        if (!d) return "P0D";
        var u = d < 0 ? "-" : "",
          f = Hi(this._months) !== Hi(d) ? "-" : "",
          p = Hi(this._days) !== Hi(d) ? "-" : "",
          m = Hi(this._milliseconds) !== Hi(d) ? "-" : "";
        return (
          u +
          "P" +
          (a ? f + a + "Y" : "") +
          (o ? f + o + "M" : "") +
          (r ? p + r + "D" : "") +
          (l || h || c ? "T" : "") +
          (l ? m + l + "H" : "") +
          (h ? m + h + "M" : "") +
          (c ? m + c + "S" : "")
        );
      }
      var ji = Oe.prototype;
      return (
        (ji.isValid = function () {
          return this._isValid;
        }),
        (ji.abs = function () {
          var t = this._data;
          return (
            (this._milliseconds = mi(this._milliseconds)),
            (this._days = mi(this._days)),
            (this._months = mi(this._months)),
            (t.milliseconds = mi(t.milliseconds)),
            (t.seconds = mi(t.seconds)),
            (t.minutes = mi(t.minutes)),
            (t.hours = mi(t.hours)),
            (t.months = mi(t.months)),
            (t.years = mi(t.years)),
            this
          );
        }),
        (ji.add = function (t, e) {
          return gi(this, t, e, 1);
        }),
        (ji.subtract = function (t, e) {
          return gi(this, t, e, -1);
        }),
        (ji.as = function (t) {
          if (!this.isValid()) return NaN;
          var e,
            i,
            s = this._milliseconds;
          if ("month" === (t = O(t)) || "year" === t)
            return (
              (e = this._days + s / 864e5),
              (i = this._months + vi(e)),
              "month" === t ? i : i / 12
            );
          switch (((e = this._days + Math.round(bi(this._months))), t)) {
            case "week":
              return e / 7 + s / 6048e5;
            case "day":
              return e + s / 864e5;
            case "hour":
              return 24 * e + s / 36e5;
            case "minute":
              return 1440 * e + s / 6e4;
            case "second":
              return 86400 * e + s / 1e3;
            case "millisecond":
              return Math.floor(864e5 * e) + s;
            default:
              throw new Error("Unknown unit " + t);
          }
        }),
        (ji.asMilliseconds = _i),
        (ji.asSeconds = xi),
        (ji.asMinutes = Di),
        (ji.asHours = ki),
        (ji.asDays = Ci),
        (ji.asWeeks = Si),
        (ji.asMonths = Mi),
        (ji.asYears = Pi),
        (ji.valueOf = function () {
          return this.isValid()
            ? this._milliseconds +
                864e5 * this._days +
                (this._months % 12) * 2592e6 +
                31536e6 * _(this._months / 12)
            : NaN;
        }),
        (ji._bubble = function () {
          var t,
            e,
            i,
            s,
            n,
            a = this._milliseconds,
            o = this._days,
            r = this._months,
            l = this._data;
          return (
            (a >= 0 && o >= 0 && r >= 0) ||
              (a <= 0 && o <= 0 && r <= 0) ||
              ((a += 864e5 * yi(bi(r) + o)), (o = 0), (r = 0)),
            (l.milliseconds = a % 1e3),
            (t = w(a / 1e3)),
            (l.seconds = t % 60),
            (e = w(t / 60)),
            (l.minutes = e % 60),
            (i = w(e / 60)),
            (l.hours = i % 24),
            (o += w(i / 24)),
            (r += n = w(vi(o))),
            (o -= yi(bi(n))),
            (s = w(r / 12)),
            (r %= 12),
            (l.days = o),
            (l.months = r),
            (l.years = s),
            this
          );
        }),
        (ji.clone = function () {
          return Be(this);
        }),
        (ji.get = function (t) {
          return (t = O(t)), this.isValid() ? this[t + "s"]() : NaN;
        }),
        (ji.milliseconds = $i),
        (ji.seconds = Yi),
        (ji.minutes = Ei),
        (ji.hours = Oi),
        (ji.days = Ii),
        (ji.weeks = function () {
          return w(this.days() / 7);
        }),
        (ji.months = Li),
        (ji.years = Ai),
        (ji.humanize = function (t) {
          if (!this.isValid()) return this.localeData().invalidDate();
          var e = this.localeData(),
            i = (function (t, e, i) {
              var s = Be(t).abs(),
                n = zi(s.as("s")),
                a = zi(s.as("m")),
                o = zi(s.as("h")),
                r = zi(s.as("d")),
                l = zi(s.as("M")),
                h = zi(s.as("y")),
                c = (n <= Ri.ss && ["s", n]) ||
                  (n < Ri.s && ["ss", n]) ||
                  (a <= 1 && ["m"]) ||
                  (a < Ri.m && ["mm", a]) ||
                  (o <= 1 && ["h"]) ||
                  (o < Ri.h && ["hh", o]) ||
                  (r <= 1 && ["d"]) ||
                  (r < Ri.d && ["dd", r]) ||
                  (l <= 1 && ["M"]) ||
                  (l < Ri.M && ["MM", l]) ||
                  (h <= 1 && ["y"]) || ["yy", h];
              return (
                (c[2] = e),
                (c[3] = +t > 0),
                (c[4] = i),
                function (t, e, i, s, n) {
                  return n.relativeTime(e || 1, !!i, t, s);
                }.apply(null, c)
              );
            })(this, !t, e);
          return t && (i = e.pastFuture(+this, i)), e.postformat(i);
        }),
        (ji.toISOString = Wi),
        (ji.toString = Wi),
        (ji.toJSON = Wi),
        (ji.locale = Ke),
        (ji.localeData = ti),
        (ji.toIsoString = k(
          "toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)",
          Wi
        )),
        (ji.lang = Je),
        j("X", 0, 0, "unix"),
        j("x", 0, 0, "valueOf"),
        lt("x", st),
        lt("X", /[+-]?\d+(\.\d{1,3})?/),
        ut("X", function (t, e, i) {
          i._d = new Date(1e3 * parseFloat(t, 10));
        }),
        ut("x", function (t, e, i) {
          i._d = new Date(_(t));
        }),
        (i.version = "2.22.2"),
        (t = Pe),
        (i.fn = hi),
        (i.min = function () {
          return Ye("isBefore", [].slice.call(arguments, 0));
        }),
        (i.max = function () {
          return Ye("isAfter", [].slice.call(arguments, 0));
        }),
        (i.now = function () {
          return Date.now ? Date.now() : +new Date();
        }),
        (i.utc = d),
        (i.unix = function (t) {
          return Pe(1e3 * t);
        }),
        (i.months = function (t, e) {
          return fi(t, e, "months");
        }),
        (i.isDate = r),
        (i.locale = le),
        (i.invalid = p),
        (i.duration = Be),
        (i.isMoment = b),
        (i.weekdays = function (t, e, i) {
          return pi(t, e, i, "weekdays");
        }),
        (i.parseZone = function () {
          return Pe.apply(null, arguments).parseZone();
        }),
        (i.localeData = ce),
        (i.isDuration = Ie),
        (i.monthsShort = function (t, e) {
          return fi(t, e, "monthsShort");
        }),
        (i.weekdaysMin = function (t, e, i) {
          return pi(t, e, i, "weekdaysMin");
        }),
        (i.defineLocale = he),
        (i.updateLocale = function (t, e) {
          if (null != e) {
            var i,
              s,
              n = se;
            null != (s = re(t)) && (n = s._config),
              ((i = new $((e = T(n, e)))).parentLocale = ne[t]),
              (ne[t] = i),
              le(t);
          } else
            null != ne[t] &&
              (null != ne[t].parentLocale
                ? (ne[t] = ne[t].parentLocale)
                : null != ne[t] && delete ne[t]);
          return ne[t];
        }),
        (i.locales = function () {
          return C(ne);
        }),
        (i.weekdaysShort = function (t, e, i) {
          return pi(t, e, i, "weekdaysShort");
        }),
        (i.normalizeUnits = O),
        (i.relativeTimeRounding = function (t) {
          return void 0 === t ? zi : "function" == typeof t && ((zi = t), !0);
        }),
        (i.relativeTimeThreshold = function (t, e) {
          return (
            void 0 !== Ri[t] &&
            (void 0 === e
              ? Ri[t]
              : ((Ri[t] = e), "s" === t && (Ri.ss = e - 1), !0))
          );
        }),
        (i.calendarFormat = function (t, e) {
          var i = t.diff(e, "days", !0);
          return i < -6
            ? "sameElse"
            : i < -1
            ? "lastWeek"
            : i < 0
            ? "lastDay"
            : i < 1
            ? "sameDay"
            : i < 2
            ? "nextDay"
            : i < 7
            ? "nextWeek"
            : "sameElse";
        }),
        (i.prototype = hi),
        (i.HTML5_FMT = {
          DATETIME_LOCAL: "YYYY-MM-DDTHH:mm",
          DATETIME_LOCAL_SECONDS: "YYYY-MM-DDTHH:mm:ss",
          DATETIME_LOCAL_MS: "YYYY-MM-DDTHH:mm:ss.SSS",
          DATE: "YYYY-MM-DD",
          TIME: "HH:mm",
          TIME_SECONDS: "HH:mm:ss",
          TIME_MS: "HH:mm:ss.SSS",
          WEEK: "YYYY-[W]WW",
          MONTH: "YYYY-MM",
        }),
        i
      );
    }),
    (function (t, e) {
      if ("function" == typeof define && define.amd)
        define(["moment", "jquery"], function (t, i) {
          return i.fn || (i.fn = {}), e(t, i);
        });
      else if (
        "object" ===
          ("undefined" == typeof module ? "undefined" : _typeof(module)) &&
        module.exports
      ) {
        var i = "undefined" != typeof window ? window.jQuery : void 0;
        i || (i = require("jquery")).fn || (i.fn = {});
        var s =
          "undefined" != typeof window && void 0 !== window.moment
            ? window.moment
            : require("moment");
        module.exports = e(s, i);
      } else t.daterangepicker = e(t.moment, t.jQuery);
    })(this, function (t, e) {
      var i = function (i, s, n) {
        if (
          ((this.parentEl = "body"),
          (this.element = e(i)),
          (this.startDate = t().startOf("day")),
          (this.endDate = t().endOf("day")),
          (this.minDate = !1),
          (this.maxDate = !1),
          (this.dateLimit = !1),
          (this.autoApply = !1),
          (this.singleDatePicker = !1),
          (this.showDropdowns = !1),
          (this.showWeekNumbers = !1),
          (this.showISOWeekNumbers = !1),
          (this.showCustomRangeLabel = !0),
          (this.timePicker = !1),
          (this.timePicker24Hour = !1),
          (this.timePickerIncrement = 1),
          (this.timePickerSeconds = !1),
          (this.linkedCalendars = !0),
          (this.autoUpdateInput = !0),
          (this.alwaysShowCalendars = !1),
          (this.ranges = {}),
          (this.opens = "right"),
          this.element.hasClass("pull-right") && (this.opens = "left"),
          (this.drops = "down"),
          this.element.hasClass("dropup") && (this.drops = "up"),
          (this.buttonClasses = "btn btn-sm"),
          (this.applyClass = "btn-success"),
          (this.cancelClass = "btn-default"),
          (this.locale = {
            direction: "ltr",
            format: t.localeData().longDateFormat("L"),
            separator: " - ",
            applyLabel: "Apply",
            cancelLabel: "Cancel",
            weekLabel: "W",
            customRangeLabel: "Custom Range",
            daysOfWeek: t.weekdaysMin(),
            monthNames: t.monthsShort(),
            firstDay: t.localeData().firstDayOfWeek(),
          }),
          (this.callback = function () {}),
          (this.isShowing = !1),
          (this.leftCalendar = {}),
          (this.rightCalendar = {}),
          ("object" === _typeof(s) && null !== s) || (s = {}),
          "string" == typeof (s = e.extend(this.element.data(), s)).template ||
            s.template instanceof e ||
            (s.template =
              '<div class="daterangepicker dropdown-menu"><div class="calendar left"><div class="daterangepicker_input"><input class="input-mini form-control" type="text" name="daterangepicker_start" value="" /><i class="fa fa-calendar glyphicon glyphicon-calendar"></i><div class="calendar-time"><div></div><i class="fa fa-clock-o glyphicon glyphicon-time"></i></div></div><div class="calendar-table"></div></div><div class="calendar right"><div class="daterangepicker_input"><input class="input-mini form-control" type="text" name="daterangepicker_end" value="" /><i class="fa fa-calendar glyphicon glyphicon-calendar"></i><div class="calendar-time"><div></div><i class="fa fa-clock-o glyphicon glyphicon-time"></i></div></div><div class="calendar-table"></div></div><div class="ranges"><div class="range_inputs"><button class="applyBtn" disabled="disabled" type="button"></button> <button class="cancelBtn" type="button"></button></div></div></div>'),
          (this.parentEl =
            s.parentEl && e(s.parentEl).length
              ? e(s.parentEl)
              : e(this.parentEl)),
          (this.container = e(s.template).appendTo(this.parentEl)),
          "object" === _typeof(s.locale) &&
            ("string" == typeof s.locale.direction &&
              (this.locale.direction = s.locale.direction),
            "string" == typeof s.locale.format &&
              (this.locale.format = s.locale.format),
            "string" == typeof s.locale.separator &&
              (this.locale.separator = s.locale.separator),
            "object" === _typeof(s.locale.daysOfWeek) &&
              (this.locale.daysOfWeek = s.locale.daysOfWeek.slice()),
            "object" === _typeof(s.locale.monthNames) &&
              (this.locale.monthNames = s.locale.monthNames.slice()),
            "number" == typeof s.locale.firstDay &&
              (this.locale.firstDay = s.locale.firstDay),
            "string" == typeof s.locale.applyLabel &&
              (this.locale.applyLabel = s.locale.applyLabel),
            "string" == typeof s.locale.cancelLabel &&
              (this.locale.cancelLabel = s.locale.cancelLabel),
            "string" == typeof s.locale.weekLabel &&
              (this.locale.weekLabel = s.locale.weekLabel),
            "string" == typeof s.locale.customRangeLabel))
        ) {
          (u = document.createElement("textarea")).innerHTML =
            s.locale.customRangeLabel;
          var a = u.value;
          this.locale.customRangeLabel = a;
        }
        if (
          (this.container.addClass(this.locale.direction),
          "string" == typeof s.startDate &&
            (this.startDate = t(s.startDate, this.locale.format)),
          "string" == typeof s.endDate &&
            (this.endDate = t(s.endDate, this.locale.format)),
          "string" == typeof s.minDate &&
            (this.minDate = t(s.minDate, this.locale.format)),
          "string" == typeof s.maxDate &&
            (this.maxDate = t(s.maxDate, this.locale.format)),
          "object" === _typeof(s.startDate) && (this.startDate = t(s.startDate)),
          "object" === _typeof(s.endDate) && (this.endDate = t(s.endDate)),
          "object" === _typeof(s.minDate) && (this.minDate = t(s.minDate)),
          "object" === _typeof(s.maxDate) && (this.maxDate = t(s.maxDate)),
          this.minDate &&
            this.startDate.isBefore(this.minDate) &&
            (this.startDate = this.minDate.clone()),
          this.maxDate &&
            this.endDate.isAfter(this.maxDate) &&
            (this.endDate = this.maxDate.clone()),
          "string" == typeof s.applyClass && (this.applyClass = s.applyClass),
          "string" == typeof s.cancelClass && (this.cancelClass = s.cancelClass),
          "object" === _typeof(s.dateLimit) && (this.dateLimit = s.dateLimit),
          "string" == typeof s.opens && (this.opens = s.opens),
          "string" == typeof s.drops && (this.drops = s.drops),
          "boolean" == typeof s.showWeekNumbers &&
            (this.showWeekNumbers = s.showWeekNumbers),
          "boolean" == typeof s.showISOWeekNumbers &&
            (this.showISOWeekNumbers = s.showISOWeekNumbers),
          "string" == typeof s.buttonClasses &&
            (this.buttonClasses = s.buttonClasses),
          "object" === _typeof(s.buttonClasses) &&
            (this.buttonClasses = s.buttonClasses.join(" ")),
          "boolean" == typeof s.showDropdowns &&
            (this.showDropdowns = s.showDropdowns),
          "boolean" == typeof s.showCustomRangeLabel &&
            (this.showCustomRangeLabel = s.showCustomRangeLabel),
          "boolean" == typeof s.singleDatePicker &&
            ((this.singleDatePicker = s.singleDatePicker),
            this.singleDatePicker && (this.endDate = this.startDate.clone())),
          "boolean" == typeof s.timePicker && (this.timePicker = s.timePicker),
          "boolean" == typeof s.timePickerSeconds &&
            (this.timePickerSeconds = s.timePickerSeconds),
          "number" == typeof s.timePickerIncrement &&
            (this.timePickerIncrement = s.timePickerIncrement),
          "boolean" == typeof s.timePicker24Hour &&
            (this.timePicker24Hour = s.timePicker24Hour),
          "boolean" == typeof s.autoApply && (this.autoApply = s.autoApply),
          "boolean" == typeof s.autoUpdateInput &&
            (this.autoUpdateInput = s.autoUpdateInput),
          "boolean" == typeof s.linkedCalendars &&
            (this.linkedCalendars = s.linkedCalendars),
          "function" == typeof s.isInvalidDate &&
            (this.isInvalidDate = s.isInvalidDate),
          "function" == typeof s.isCustomDate &&
            (this.isCustomDate = s.isCustomDate),
          "boolean" == typeof s.alwaysShowCalendars &&
            (this.alwaysShowCalendars = s.alwaysShowCalendars),
          0 != this.locale.firstDay)
        )
          for (var o = this.locale.firstDay; o > 0; )
            this.locale.daysOfWeek.push(this.locale.daysOfWeek.shift()), o--;
        var r, l, h;
        if (
          void 0 === s.startDate &&
          void 0 === s.endDate &&
          e(this.element).is("input[type=text]")
        ) {
          var c = e(this.element).val(),
            d = c.split(this.locale.separator);
          (r = l = null),
            2 == d.length
              ? ((r = t(d[0], this.locale.format)),
                (l = t(d[1], this.locale.format)))
              : this.singleDatePicker &&
                "" !== c &&
                ((r = t(c, this.locale.format)), (l = t(c, this.locale.format))),
            null !== r &&
              null !== l &&
              (this.setStartDate(r), this.setEndDate(l));
        }
        if ("object" === _typeof(s.ranges)) {
          for (h in s.ranges) {
            (r =
              "string" == typeof s.ranges[h][0]
                ? t(s.ranges[h][0], this.locale.format)
                : t(s.ranges[h][0])),
              (l =
                "string" == typeof s.ranges[h][1]
                  ? t(s.ranges[h][1], this.locale.format)
                  : t(s.ranges[h][1])),
              this.minDate &&
                r.isBefore(this.minDate) &&
                (r = this.minDate.clone());
            var u,
              f = this.maxDate;
            if (
              (this.dateLimit &&
                f &&
                r.clone().add(this.dateLimit).isAfter(f) &&
                (f = r.clone().add(this.dateLimit)),
              f && l.isAfter(f) && (l = f.clone()),
              !(
                (this.minDate &&
                  l.isBefore(this.minDate, this.timepicker ? "minute" : "day")) ||
                (f && r.isAfter(f, this.timepicker ? "minute" : "day"))
              ))
            )
              ((u = document.createElement("textarea")).innerHTML = h),
                (a = u.value),
                (this.ranges[a] = [r, l]);
          }
          var p = "<ul>";
          for (h in this.ranges)
            p += '<li data-range-key="' + h + '">' + h + "</li>";
          this.showCustomRangeLabel &&
            (p +=
              '<li data-range-key="' +
              this.locale.customRangeLabel +
              '">' +
              this.locale.customRangeLabel +
              "</li>"),
            (p += "</ul>"),
            this.container.find(".ranges").prepend(p);
        }
        "function" == typeof n && (this.callback = n),
          this.timePicker ||
            ((this.startDate = this.startDate.startOf("day")),
            (this.endDate = this.endDate.endOf("day")),
            this.container.find(".calendar-time").hide()),
          this.timePicker && this.autoApply && (this.autoApply = !1),
          this.autoApply && "object" !== _typeof(s.ranges)
            ? this.container.find(".ranges").hide()
            : this.autoApply &&
              this.container.find(".applyBtn, .cancelBtn").addClass("hide"),
          this.singleDatePicker &&
            (this.container.addClass("single"),
            this.container.find(".calendar.left").addClass("single"),
            this.container.find(".calendar.left").show(),
            this.container.find(".calendar.right").hide(),
            this.container
              .find(".daterangepicker_input input, .daterangepicker_input > i")
              .hide(),
            this.timePicker
              ? this.container.find(".ranges ul").hide()
              : this.container.find(".ranges").hide()),
          ((void 0 === s.ranges && !this.singleDatePicker) ||
            this.alwaysShowCalendars) &&
            this.container.addClass("show-calendar"),
          this.container.addClass("opens" + this.opens),
          void 0 !== s.ranges &&
            "right" == this.opens &&
            this.container
              .find(".ranges")
              .prependTo(this.container.find(".calendar.left").parent()),
          this.container
            .find(".applyBtn, .cancelBtn")
            .addClass(this.buttonClasses),
          this.applyClass.length &&
            this.container.find(".applyBtn").addClass(this.applyClass),
          this.cancelClass.length &&
            this.container.find(".cancelBtn").addClass(this.cancelClass),
          this.container.find(".applyBtn").html(this.locale.applyLabel),
          this.container.find(".cancelBtn").html(this.locale.cancelLabel),
          this.container
            .find(".calendar")
            .on("click.daterangepicker", ".prev", e.proxy(this.clickPrev, this))
            .on("click.daterangepicker", ".next", e.proxy(this.clickNext, this))
            .on(
              "mousedown.daterangepicker",
              "td.available",
              e.proxy(this.clickDate, this)
            )
            .on(
              "mouseenter.daterangepicker",
              "td.available",
              e.proxy(this.hoverDate, this)
            )
            .on(
              "mouseleave.daterangepicker",
              "td.available",
              e.proxy(this.updateFormInputs, this)
            )
            .on(
              "change.daterangepicker",
              "select.yearselect",
              e.proxy(this.monthOrYearChanged, this)
            )
            .on(
              "change.daterangepicker",
              "select.monthselect",
              e.proxy(this.monthOrYearChanged, this)
            )
            .on(
              "change.daterangepicker",
              "select.hourselect,select.minuteselect,select.secondselect,select.ampmselect",
              e.proxy(this.timeChanged, this)
            )
            .on(
              "click.daterangepicker",
              ".daterangepicker_input input",
              e.proxy(this.showCalendars, this)
            )
            .on(
              "focus.daterangepicker",
              ".daterangepicker_input input",
              e.proxy(this.formInputsFocused, this)
            )
            .on(
              "blur.daterangepicker",
              ".daterangepicker_input input",
              e.proxy(this.formInputsBlurred, this)
            )
            .on(
              "change.daterangepicker",
              ".daterangepicker_input input",
              e.proxy(this.formInputsChanged, this)
            )
            .on(
              "keydown.daterangepicker",
              ".daterangepicker_input input",
              e.proxy(this.formInputsKeydown, this)
            ),
          this.container
            .find(".ranges")
            .on(
              "click.daterangepicker",
              "button.applyBtn",
              e.proxy(this.clickApply, this)
            )
            .on(
              "click.daterangepicker",
              "button.cancelBtn",
              e.proxy(this.clickCancel, this)
            )
            .on("click.daterangepicker", "li", e.proxy(this.clickRange, this))
            .on(
              "mouseenter.daterangepicker",
              "li",
              e.proxy(this.hoverRange, this)
            )
            .on(
              "mouseleave.daterangepicker",
              "li",
              e.proxy(this.updateFormInputs, this)
            ),
          this.element.is("input") || this.element.is("button")
            ? this.element.on({
                "click.daterangepicker": e.proxy(this.show, this),
                "focus.daterangepicker": e.proxy(this.show, this),
                "keyup.daterangepicker": e.proxy(this.elementChanged, this),
                "keydown.daterangepicker": e.proxy(this.keydown, this),
              })
            : (this.element.on(
                "click.daterangepicker",
                e.proxy(this.toggle, this)
              ),
              this.element.on(
                "keydown.daterangepicker",
                e.proxy(this.toggle, this)
              )),
          this.element.is("input") &&
          !this.singleDatePicker &&
          this.autoUpdateInput
            ? (this.element.val(
                this.startDate.format(this.locale.format) +
                  this.locale.separator +
                  this.endDate.format(this.locale.format)
              ),
              this.element.trigger("change"))
            : this.element.is("input") &&
              this.autoUpdateInput &&
              (this.element.val(this.startDate.format(this.locale.format)),
              this.element.trigger("change"));
      };
      return (
        (i.prototype = {
          constructor: i,
          setStartDate: function (e) {
            "string" == typeof e && (this.startDate = t(e, this.locale.format)),
              "object" === _typeof(e) && (this.startDate = t(e)),
              this.timePicker || (this.startDate = this.startDate.startOf("day")),
              this.timePicker &&
                this.timePickerIncrement &&
                this.startDate.minute(
                  Math.round(this.startDate.minute() / this.timePickerIncrement) *
                    this.timePickerIncrement
                ),
              this.minDate &&
                this.startDate.isBefore(this.minDate) &&
                ((this.startDate = this.minDate.clone()),
                this.timePicker &&
                  this.timePickerIncrement &&
                  this.startDate.minute(
                    Math.round(
                      this.startDate.minute() / this.timePickerIncrement
                    ) * this.timePickerIncrement
                  )),
              this.maxDate &&
                this.startDate.isAfter(this.maxDate) &&
                ((this.startDate = this.maxDate.clone()),
                this.timePicker &&
                  this.timePickerIncrement &&
                  this.startDate.minute(
                    Math.floor(
                      this.startDate.minute() / this.timePickerIncrement
                    ) * this.timePickerIncrement
                  )),
              this.isShowing || this.updateElement(),
              this.updateMonthsInView();
          },
          setEndDate: function (e) {
            "string" == typeof e && (this.endDate = t(e, this.locale.format)),
              "object" === _typeof(e) && (this.endDate = t(e)),
              this.timePicker ||
                (this.endDate = this.endDate
                  .add(1, "d")
                  .startOf("day")
                  .subtract(1, "second")),
              this.timePicker &&
                this.timePickerIncrement &&
                this.endDate.minute(
                  Math.round(this.endDate.minute() / this.timePickerIncrement) *
                    this.timePickerIncrement
                ),
              this.endDate.isBefore(this.startDate) &&
                (this.endDate = this.startDate.clone()),
              this.maxDate &&
                this.endDate.isAfter(this.maxDate) &&
                (this.endDate = this.maxDate.clone()),
              this.dateLimit &&
                this.startDate
                  .clone()
                  .add(this.dateLimit)
                  .isBefore(this.endDate) &&
                (this.endDate = this.startDate.clone().add(this.dateLimit)),
              (this.previousRightTime = this.endDate.clone()),
              this.isShowing || this.updateElement(),
              this.updateMonthsInView();
          },
          isInvalidDate: function () {
            return !1;
          },
          isCustomDate: function () {
            return !1;
          },
          updateView: function () {
            this.timePicker &&
              (this.renderTimePicker("left"),
              this.renderTimePicker("right"),
              this.endDate
                ? this.container
                    .find(".right .calendar-time select")
                    .removeAttr("disabled")
                    .removeClass("disabled")
                : this.container
                    .find(".right .calendar-time select")
                    .attr("disabled", "disabled")
                    .addClass("disabled")),
              this.endDate
                ? (this.container
                    .find('input[name="daterangepicker_end"]')
                    .removeClass("active"),
                  this.container
                    .find('input[name="daterangepicker_start"]')
                    .addClass("active"))
                : (this.container
                    .find('input[name="daterangepicker_end"]')
                    .addClass("active"),
                  this.container
                    .find('input[name="daterangepicker_start"]')
                    .removeClass("active")),
              this.updateMonthsInView(),
              this.updateCalendars(),
              this.updateFormInputs();
          },
          updateMonthsInView: function () {
            if (this.endDate) {
              if (
                !this.singleDatePicker &&
                this.leftCalendar.month &&
                this.rightCalendar.month &&
                (this.startDate.format("YYYY-MM") ==
                  this.leftCalendar.month.format("YYYY-MM") ||
                  this.startDate.format("YYYY-MM") ==
                    this.rightCalendar.month.format("YYYY-MM")) &&
                (this.endDate.format("YYYY-MM") ==
                  this.leftCalendar.month.format("YYYY-MM") ||
                  this.endDate.format("YYYY-MM") ==
                    this.rightCalendar.month.format("YYYY-MM"))
              )
                return;
              (this.leftCalendar.month = this.startDate.clone().date(2)),
                this.linkedCalendars ||
                (this.endDate.month() == this.startDate.month() &&
                  this.endDate.year() == this.startDate.year())
                  ? (this.rightCalendar.month = this.startDate
                      .clone()
                      .date(2)
                      .add(1, "month"))
                  : (this.rightCalendar.month = this.endDate.clone().date(2));
            } else
              this.leftCalendar.month.format("YYYY-MM") !=
                this.startDate.format("YYYY-MM") &&
                this.rightCalendar.month.format("YYYY-MM") !=
                  this.startDate.format("YYYY-MM") &&
                ((this.leftCalendar.month = this.startDate.clone().date(2)),
                (this.rightCalendar.month = this.startDate
                  .clone()
                  .date(2)
                  .add(1, "month")));
            this.maxDate &&
              this.linkedCalendars &&
              !this.singleDatePicker &&
              this.rightCalendar.month > this.maxDate &&
              ((this.rightCalendar.month = this.maxDate.clone().date(2)),
              (this.leftCalendar.month = this.maxDate
                .clone()
                .date(2)
                .subtract(1, "month")));
          },
          updateCalendars: function () {
            var t, e, i, s;
            this.timePicker &&
              (this.endDate
                ? ((t = parseInt(
                    this.container.find(".left .hourselect").val(),
                    10
                  )),
                  (e = parseInt(
                    this.container.find(".left .minuteselect").val(),
                    10
                  )),
                  (i = this.timePickerSeconds
                    ? parseInt(
                        this.container.find(".left .secondselect").val(),
                        10
                      )
                    : 0),
                  this.timePicker24Hour ||
                    ("PM" ===
                      (s = this.container.find(".left .ampmselect").val()) &&
                      t < 12 &&
                      (t += 12),
                    "AM" === s && 12 === t && (t = 0)))
                : ((t = parseInt(
                    this.container.find(".right .hourselect").val(),
                    10
                  )),
                  (e = parseInt(
                    this.container.find(".right .minuteselect").val(),
                    10
                  )),
                  (i = this.timePickerSeconds
                    ? parseInt(
                        this.container.find(".right .secondselect").val(),
                        10
                      )
                    : 0),
                  this.timePicker24Hour ||
                    ("PM" ===
                      (s = this.container.find(".right .ampmselect").val()) &&
                      t < 12 &&
                      (t += 12),
                    "AM" === s && 12 === t && (t = 0))),
              this.leftCalendar.month.hour(t).minute(e).second(i),
              this.rightCalendar.month.hour(t).minute(e).second(i));
            this.renderCalendar("left"),
              this.renderCalendar("right"),
              this.container.find(".ranges li").removeClass("active"),
              null != this.endDate && this.calculateChosenLabel();
          },
          renderCalendar: function (i) {
            var s,
              n = (s =
                "left" == i
                  ? this.leftCalendar
                  : this.rightCalendar).month.month(),
              a = s.month.year(),
              o = s.month.hour(),
              r = s.month.minute(),
              l = s.month.second(),
              h = t([a, n]).daysInMonth(),
              c = t([a, n, 1]),
              d = t([a, n, h]),
              u = t(c).subtract(1, "month").month(),
              f = t(c).subtract(1, "month").year(),
              p = t([f, u]).daysInMonth(),
              m = c.day();
            ((s = []).firstDay = c), (s.lastDay = d);
            for (var g = 0; g < 6; g++) s[g] = [];
            var y = p - m + this.locale.firstDay + 1;
            y > p && (y -= 7), m == this.locale.firstDay && (y = p - 6);
            for (
              var v = t([f, u, y, 12, r, l]), b = ((g = 0), 0), w = 0;
              g < 42;
              g++, b++, v = t(v).add(24, "hour")
            )
              g > 0 && b % 7 == 0 && ((b = 0), w++),
                (s[w][b] = v.clone().hour(o).minute(r).second(l)),
                v.hour(12),
                this.minDate &&
                  s[w][b].format("YYYY-MM-DD") ==
                    this.minDate.format("YYYY-MM-DD") &&
                  s[w][b].isBefore(this.minDate) &&
                  "left" == i &&
                  (s[w][b] = this.minDate.clone()),
                this.maxDate &&
                  s[w][b].format("YYYY-MM-DD") ==
                    this.maxDate.format("YYYY-MM-DD") &&
                  s[w][b].isAfter(this.maxDate) &&
                  "right" == i &&
                  (s[w][b] = this.maxDate.clone());
            "left" == i
              ? (this.leftCalendar.calendar = s)
              : (this.rightCalendar.calendar = s);
            var _ = "left" == i ? this.minDate : this.startDate,
              x = this.maxDate,
              D =
                ("left" == i ? this.startDate : this.endDate,
                "ltr" == this.locale.direction
                  ? { left: "chevron-left", right: "chevron-right" }
                  : { left: "chevron-right", right: "chevron-left" }),
              k = '<table class="table-condensed">';
            (k += "<thead>"),
              (k += "<tr>"),
              (this.showWeekNumbers || this.showISOWeekNumbers) &&
                (k += "<th></th>"),
              (_ && !_.isBefore(s.firstDay)) ||
              (this.linkedCalendars && "left" != i)
                ? (k += "<th></th>")
                : (k +=
                    '<th class="prev available"><i class="fa fa-' +
                    D.left +
                    " glyphicon glyphicon-" +
                    D.left +
                    '"></i></th>');
            var C =
              this.locale.monthNames[s[1][1].month()] + s[1][1].format(" YYYY");
            if (this.showDropdowns) {
              for (
                var S = s[1][1].month(),
                  M = s[1][1].year(),
                  P = (x && x.year()) || M + 5,
                  T = (_ && _.year()) || M - 50,
                  $ = M == T,
                  Y = M == P,
                  E = '<select class="monthselect">',
                  O = 0;
                O < 12;
                O++
              )
                (!$ || O >= _.month()) && (!Y || O <= x.month())
                  ? (E +=
                      "<option value='" +
                      O +
                      "'" +
                      (O === S ? " selected='selected'" : "") +
                      ">" +
                      this.locale.monthNames[O] +
                      "</option>")
                  : (E +=
                      "<option value='" +
                      O +
                      "'" +
                      (O === S ? " selected='selected'" : "") +
                      " disabled='disabled'>" +
                      this.locale.monthNames[O] +
                      "</option>");
              E += "</select>";
              for (var I = '<select class="yearselect">', L = T; L <= P; L++)
                I +=
                  '<option value="' +
                  L +
                  '"' +
                  (L === M ? ' selected="selected"' : "") +
                  ">" +
                  L +
                  "</option>";
              C = E + (I += "</select>");
            }
            if (
              ((k += '<th colspan="5" class="month">' + C + "</th>"),
              (x && !x.isAfter(s.lastDay)) ||
              (this.linkedCalendars && "right" != i && !this.singleDatePicker)
                ? (k += "<th></th>")
                : (k +=
                    '<th class="next available"><i class="fa fa-' +
                    D.right +
                    " glyphicon glyphicon-" +
                    D.right +
                    '"></i></th>'),
              (k += "</tr>"),
              (k += "<tr>"),
              (this.showWeekNumbers || this.showISOWeekNumbers) &&
                (k += '<th class="week">' + this.locale.weekLabel + "</th>"),
              e.each(this.locale.daysOfWeek, function (t, e) {
                k += "<th>" + e + "</th>";
              }),
              (k += "</tr>"),
              (k += "</thead>"),
              (k += "<tbody>"),
              null == this.endDate && this.dateLimit)
            ) {
              var A = this.startDate.clone().add(this.dateLimit).endOf("day");
              (x && !A.isBefore(x)) || (x = A);
            }
            for (w = 0; w < 6; w++) {
              for (
                k += "<tr>",
                  this.showWeekNumbers
                    ? (k += '<td class="week">' + s[w][0].week() + "</td>")
                    : this.showISOWeekNumbers &&
                      (k += '<td class="week">' + s[w][0].isoWeek() + "</td>"),
                  b = 0;
                b < 7;
                b++
              ) {
                var z = [];
                s[w][b].isSame(new Date(), "day") && z.push("today"),
                  s[w][b].isoWeekday() > 5 && z.push("weekend"),
                  s[w][b].month() != s[1][1].month() && z.push("off"),
                  this.minDate &&
                    s[w][b].isBefore(this.minDate, "day") &&
                    z.push("off", "disabled"),
                  x && s[w][b].isAfter(x, "day") && z.push("off", "disabled"),
                  this.isInvalidDate(s[w][b]) && z.push("off", "disabled"),
                  s[w][b].format("YYYY-MM-DD") ==
                    this.startDate.format("YYYY-MM-DD") &&
                    z.push("active", "start-date"),
                  null != this.endDate &&
                    s[w][b].format("YYYY-MM-DD") ==
                      this.endDate.format("YYYY-MM-DD") &&
                    z.push("active", "end-date"),
                  null != this.endDate &&
                    s[w][b] > this.startDate &&
                    s[w][b] < this.endDate &&
                    z.push("in-range");
                var R = this.isCustomDate(s[w][b]);
                !1 !== R &&
                  ("string" == typeof R
                    ? z.push(R)
                    : Array.prototype.push.apply(z, R));
                var F = "",
                  H = !1;
                for (g = 0; g < z.length; g++)
                  (F += z[g] + " "), "disabled" == z[g] && (H = !0);
                H || (F += "available"),
                  (k +=
                    '<td class="' +
                    F.replace(/^\s+|\s+$/g, "") +
                    '" data-title="r' +
                    w +
                    "c" +
                    b +
                    '">' +
                    s[w][b].date() +
                    "</td>");
              }
              k += "</tr>";
            }
            (k += "</tbody>"),
              (k += "</table>"),
              this.container.find(".calendar." + i + " .calendar-table").html(k);
          },
          renderTimePicker: function (t) {
            if ("right" != t || this.endDate) {
              var e,
                i,
                s,
                n = this.maxDate;
              if (
                (!this.dateLimit ||
                  (this.maxDate &&
                    !this.startDate
                      .clone()
                      .add(this.dateLimit)
                      .isAfter(this.maxDate)) ||
                  (n = this.startDate.clone().add(this.dateLimit)),
                "left" == t)
              )
                (i = this.startDate.clone()), (s = this.minDate);
              else if ("right" == t) {
                (i = this.endDate.clone()), (s = this.startDate);
                var a = this.container.find(".calendar.right .calendar-time div");
                if (
                  "" != a.html() &&
                  (i.hour(
                    a.find(".hourselect option:selected").val() || i.hour()
                  ),
                  i.minute(
                    a.find(".minuteselect option:selected").val() || i.minute()
                  ),
                  i.second(
                    a.find(".secondselect option:selected").val() || i.second()
                  ),
                  !this.timePicker24Hour)
                ) {
                  var o = a.find(".ampmselect option:selected").val();
                  "PM" === o && i.hour() < 12 && i.hour(i.hour() + 12),
                    "AM" === o && 12 === i.hour() && i.hour(0);
                }
                i.isBefore(this.startDate) && (i = this.startDate.clone()),
                  n && i.isAfter(n) && (i = n.clone());
              }
              e = '<select class="hourselect">';
              for (
                var r = this.timePicker24Hour ? 0 : 1,
                  l = this.timePicker24Hour ? 23 : 12,
                  h = r;
                h <= l;
                h++
              ) {
                var c = h;
                this.timePicker24Hour ||
                  (c =
                    i.hour() >= 12 ? (12 == h ? 12 : h + 12) : 12 == h ? 0 : h);
                var d = i.clone().hour(c),
                  u = !1;
                s && d.minute(59).isBefore(s) && (u = !0),
                  n && d.minute(0).isAfter(n) && (u = !0),
                  c != i.hour() || u
                    ? (e += u
                        ? '<option value="' +
                          h +
                          '" disabled="disabled" class="disabled">' +
                          h +
                          "</option>"
                        : '<option value="' + h + '">' + h + "</option>")
                    : (e +=
                        '<option value="' +
                        h +
                        '" selected="selected">' +
                        h +
                        "</option>");
              }
              for (
                e += "</select> ", e += ': <select class="minuteselect">', h = 0;
                h < 60;
                h += this.timePickerIncrement
              ) {
                var f = h < 10 ? "0" + h : h;
                (d = i.clone().minute(h)),
                  (u = !1),
                  s && d.second(59).isBefore(s) && (u = !0),
                  n && d.second(0).isAfter(n) && (u = !0),
                  i.minute() != h || u
                    ? (e += u
                        ? '<option value="' +
                          h +
                          '" disabled="disabled" class="disabled">' +
                          f +
                          "</option>"
                        : '<option value="' + h + '">' + f + "</option>")
                    : (e +=
                        '<option value="' +
                        h +
                        '" selected="selected">' +
                        f +
                        "</option>");
              }
              if (((e += "</select> "), this.timePickerSeconds)) {
                for (e += ': <select class="secondselect">', h = 0; h < 60; h++)
                  (f = h < 10 ? "0" + h : h),
                    (d = i.clone().second(h)),
                    (u = !1),
                    s && d.isBefore(s) && (u = !0),
                    n && d.isAfter(n) && (u = !0),
                    i.second() != h || u
                      ? (e += u
                          ? '<option value="' +
                            h +
                            '" disabled="disabled" class="disabled">' +
                            f +
                            "</option>"
                          : '<option value="' + h + '">' + f + "</option>")
                      : (e +=
                          '<option value="' +
                          h +
                          '" selected="selected">' +
                          f +
                          "</option>");
                e += "</select> ";
              }
              if (!this.timePicker24Hour) {
                e += '<select class="ampmselect">';
                var p = "",
                  m = "";
                s &&
                  i.clone().hour(12).minute(0).second(0).isBefore(s) &&
                  (p = ' disabled="disabled" class="disabled"'),
                  n &&
                    i.clone().hour(0).minute(0).second(0).isAfter(n) &&
                    (m = ' disabled="disabled" class="disabled"'),
                  i.hour() >= 12
                    ? (e +=
                        '<option value="AM"' +
                        p +
                        '>AM</option><option value="PM" selected="selected"' +
                        m +
                        ">PM</option>")
                    : (e +=
                        '<option value="AM" selected="selected"' +
                        p +
                        '>AM</option><option value="PM"' +
                        m +
                        ">PM</option>"),
                  (e += "</select>");
              }
              this.container
                .find(".calendar." + t + " .calendar-time div")
                .html(e);
            }
          },
          updateFormInputs: function () {
            this.container
              .find("input[name=daterangepicker_start]")
              .is(":focus") ||
              this.container
                .find("input[name=daterangepicker_end]")
                .is(":focus") ||
              (this.container
                .find("input[name=daterangepicker_start]")
                .val(this.startDate.format(this.locale.format)),
              this.endDate &&
                this.container
                  .find("input[name=daterangepicker_end]")
                  .val(this.endDate.format(this.locale.format)),
              this.singleDatePicker ||
              (this.endDate &&
                (this.startDate.isBefore(this.endDate) ||
                  this.startDate.isSame(this.endDate)))
                ? this.container.find("button.applyBtn").removeAttr("disabled")
                : this.container
                    .find("button.applyBtn")
                    .attr("disabled", "disabled"));
          },
          move: function () {
            var t,
              i = { top: 0, left: 0 },
              s = e(window).width();
            this.parentEl.is("body") ||
              ((i = {
                top: this.parentEl.offset().top - this.parentEl.scrollTop(),
                left: this.parentEl.offset().left - this.parentEl.scrollLeft(),
              }),
              (s = this.parentEl[0].clientWidth + this.parentEl.offset().left)),
              (t =
                "up" == this.drops
                  ? this.element.offset().top -
                    this.container.outerHeight() -
                    i.top
                  : this.element.offset().top +
                    this.element.outerHeight() -
                    i.top),
              this.container["up" == this.drops ? "addClass" : "removeClass"](
                "dropup"
              ),
              "left" == this.opens
                ? (this.container.css({
                    top: t,
                    right:
                      s - this.element.offset().left - this.element.outerWidth(),
                    left: "auto",
                  }),
                  this.container.offset().left < 0 &&
                    this.container.css({ right: "auto", left: 9 }))
                : "center" == this.opens
                ? (this.container.css({
                    top: t,
                    left:
                      this.element.offset().left -
                      i.left +
                      this.element.outerWidth() / 2 -
                      this.container.outerWidth() / 2,
                    right: "auto",
                  }),
                  this.container.offset().left < 0 &&
                    this.container.css({ right: "auto", left: 9 }))
                : (this.container.css({
                    top: t,
                    left: this.element.offset().left - i.left,
                    right: "auto",
                  }),
                  this.container.offset().left + this.container.outerWidth() >
                    e(window).width() &&
                    this.container.css({ left: "auto", right: 0 }));
          },
          show: function (t) {
            this.isShowing ||
              ((this._outsideClickProxy = e.proxy(function (t) {
                this.outsideClick(t);
              }, this)),
              e(document)
                .on("mousedown.daterangepicker", this._outsideClickProxy)
                .on("touchend.daterangepicker", this._outsideClickProxy)
                .on(
                  "click.daterangepicker",
                  "[data-toggle=dropdown]",
                  this._outsideClickProxy
                )
                .on("focusin.daterangepicker", this._outsideClickProxy),
              e(window).on(
                "resize.daterangepicker",
                e.proxy(function (t) {
                  this.move(t);
                }, this)
              ),
              (this.oldStartDate = this.startDate.clone()),
              (this.oldEndDate = this.endDate.clone()),
              (this.previousRightTime = this.endDate.clone()),
              this.updateView(),
              this.container.show(),
              this.move(),
              this.element.trigger("show.daterangepicker", this),
              (this.isShowing = !0));
          },
          hide: function (t) {
            this.isShowing &&
              (this.endDate ||
                ((this.startDate = this.oldStartDate.clone()),
                (this.endDate = this.oldEndDate.clone())),
              (this.startDate.isSame(this.oldStartDate) &&
                this.endDate.isSame(this.oldEndDate)) ||
                this.callback(this.startDate, this.endDate, this.chosenLabel),
              this.updateElement(),
              e(document).off(".daterangepicker"),
              e(window).off(".daterangepicker"),
              this.container.hide(),
              this.element.trigger("hide.daterangepicker", this),
              (this.isShowing = !1));
          },
          toggle: function (t) {
            this.isShowing ? this.hide() : this.show();
          },
          outsideClick: function (t) {
            var i = e(t.target);
            "focusin" == t.type ||
              i.closest(this.element).length ||
              i.closest(this.container).length ||
              i.closest(".calendar-table").length ||
              (this.hide(),
              this.element.trigger("outsideClick.daterangepicker", this));
          },
          showCalendars: function () {
            this.container.addClass("show-calendar"),
              this.move(),
              this.element.trigger("showCalendar.daterangepicker", this);
          },
          hideCalendars: function () {
            this.container.removeClass("show-calendar"),
              this.element.trigger("hideCalendar.daterangepicker", this);
          },
          hoverRange: function (t) {
            if (
              !this.container
                .find("input[name=daterangepicker_start]")
                .is(":focus") &&
              !this.container.find("input[name=daterangepicker_end]").is(":focus")
            ) {
              var e = t.target.getAttribute("data-range-key");
              if (e == this.locale.customRangeLabel) this.updateView();
              else {
                var i = this.ranges[e];
                this.container
                  .find("input[name=daterangepicker_start]")
                  .val(i[0].format(this.locale.format)),
                  this.container
                    .find("input[name=daterangepicker_end]")
                    .val(i[1].format(this.locale.format));
              }
            }
          },
          clickRange: function (t) {
            var e = t.target.getAttribute("data-range-key");
            if (((this.chosenLabel = e), e == this.locale.customRangeLabel))
              this.showCalendars();
            else {
              var i = this.ranges[e];
              (this.startDate = i[0]),
                (this.endDate = i[1]),
                this.timePicker ||
                  (this.startDate.startOf("day"), this.endDate.endOf("day")),
                this.alwaysShowCalendars || this.hideCalendars(),
                this.clickApply();
            }
          },
          clickPrev: function (t) {
            e(t.target).parents(".calendar").hasClass("left")
              ? (this.leftCalendar.month.subtract(1, "month"),
                this.linkedCalendars &&
                  this.rightCalendar.month.subtract(1, "month"))
              : this.rightCalendar.month.subtract(1, "month"),
              this.updateCalendars();
          },
          clickNext: function (t) {
            e(t.target).parents(".calendar").hasClass("left")
              ? this.leftCalendar.month.add(1, "month")
              : (this.rightCalendar.month.add(1, "month"),
                this.linkedCalendars && this.leftCalendar.month.add(1, "month")),
              this.updateCalendars();
          },
          hoverDate: function (t) {
            if (e(t.target).hasClass("available")) {
              var i = e(t.target).attr("data-title"),
                s = i.substr(1, 1),
                n = i.substr(3, 1),
                a = e(t.target).parents(".calendar").hasClass("left")
                  ? this.leftCalendar.calendar[s][n]
                  : this.rightCalendar.calendar[s][n];
              this.endDate &&
              !this.container
                .find("input[name=daterangepicker_start]")
                .is(":focus")
                ? this.container
                    .find("input[name=daterangepicker_start]")
                    .val(a.format(this.locale.format))
                : this.endDate ||
                  this.container
                    .find("input[name=daterangepicker_end]")
                    .is(":focus") ||
                  this.container
                    .find("input[name=daterangepicker_end]")
                    .val(a.format(this.locale.format));
              var o = this.leftCalendar,
                r = this.rightCalendar,
                l = this.startDate;
              this.endDate ||
                this.container.find(".calendar tbody td").each(function (t, i) {
                  if (!e(i).hasClass("week")) {
                    var s = e(i).attr("data-title"),
                      n = s.substr(1, 1),
                      h = s.substr(3, 1),
                      c = e(i).parents(".calendar").hasClass("left")
                        ? o.calendar[n][h]
                        : r.calendar[n][h];
                    (c.isAfter(l) && c.isBefore(a)) || c.isSame(a, "day")
                      ? e(i).addClass("in-range")
                      : e(i).removeClass("in-range");
                  }
                });
            }
          },
          clickDate: function (t) {
            if (e(t.target).hasClass("available")) {
              var i = e(t.target).attr("data-title"),
                s = i.substr(1, 1),
                n = i.substr(3, 1),
                a = e(t.target).parents(".calendar").hasClass("left")
                  ? this.leftCalendar.calendar[s][n]
                  : this.rightCalendar.calendar[s][n];
              if (this.endDate || a.isBefore(this.startDate, "day")) {
                if (this.timePicker) {
                  var o = parseInt(
                    this.container.find(".left .hourselect").val(),
                    10
                  );
                  this.timePicker24Hour ||
                    ("PM" ===
                      (h = this.container.find(".left .ampmselect").val()) &&
                      o < 12 &&
                      (o += 12),
                    "AM" === h && 12 === o && (o = 0));
                  var r = parseInt(
                      this.container.find(".left .minuteselect").val(),
                      10
                    ),
                    l = this.timePickerSeconds
                      ? parseInt(
                          this.container.find(".left .secondselect").val(),
                          10
                        )
                      : 0;
                  a = a.clone().hour(o).minute(r).second(l);
                }
                (this.endDate = null), this.setStartDate(a.clone());
              } else if (!this.endDate && a.isBefore(this.startDate))
                this.setEndDate(this.startDate.clone());
              else {
                var h;
                if (this.timePicker)
                  (o = parseInt(
                    this.container.find(".right .hourselect").val(),
                    10
                  )),
                    this.timePicker24Hour ||
                      ("PM" ===
                        (h = this.container.find(".right .ampmselect").val()) &&
                        o < 12 &&
                        (o += 12),
                      "AM" === h && 12 === o && (o = 0)),
                    (r = parseInt(
                      this.container.find(".right .minuteselect").val(),
                      10
                    )),
                    (l = this.timePickerSeconds
                      ? parseInt(
                          this.container.find(".right .secondselect").val(),
                          10
                        )
                      : 0),
                    (a = a.clone().hour(o).minute(r).second(l));
                this.setEndDate(a.clone()),
                  this.autoApply &&
                    (this.calculateChosenLabel(), this.clickApply());
              }
              this.singleDatePicker &&
                (this.setEndDate(this.startDate),
                this.timePicker || this.clickApply()),
                this.updateView(),
                t.stopPropagation();
            }
          },
          calculateChosenLabel: function () {
            var t = !0,
              e = 0;
            for (var i in this.ranges) {
              if (this.timePicker) {
                var s = this.timePickerSeconds
                  ? "YYYY-MM-DD hh:mm:ss"
                  : "YYYY-MM-DD hh:mm";
                if (
                  this.startDate.format(s) == this.ranges[i][0].format(s) &&
                  this.endDate.format(s) == this.ranges[i][1].format(s)
                ) {
                  (t = !1),
                    (this.chosenLabel = this.container
                      .find(".ranges li:eq(" + e + ")")
                      .addClass("active")
                      .html());
                  break;
                }
              } else if (
                this.startDate.format("YYYY-MM-DD") ==
                  this.ranges[i][0].format("YYYY-MM-DD") &&
                this.endDate.format("YYYY-MM-DD") ==
                  this.ranges[i][1].format("YYYY-MM-DD")
              ) {
                (t = !1),
                  (this.chosenLabel = this.container
                    .find(".ranges li:eq(" + e + ")")
                    .addClass("active")
                    .html());
                break;
              }
              e++;
            }
            t &&
              (this.showCustomRangeLabel
                ? (this.chosenLabel = this.container
                    .find(".ranges li:last")
                    .addClass("active")
                    .html())
                : (this.chosenLabel = null),
              this.showCalendars());
          },
          clickApply: function (t) {
            this.hide(), this.element.trigger("apply.daterangepicker", this);
          },
          clickCancel: function (t) {
            (this.startDate = this.oldStartDate),
              (this.endDate = this.oldEndDate),
              this.hide(),
              this.element.trigger("cancel.daterangepicker", this);
          },
          monthOrYearChanged: function (t) {
            var i = e(t.target).closest(".calendar").hasClass("left"),
              s = i ? "left" : "right",
              n = this.container.find(".calendar." + s),
              a = parseInt(n.find(".monthselect").val(), 10),
              o = n.find(".yearselect").val();
            i ||
              ((o < this.startDate.year() ||
                (o == this.startDate.year() && a < this.startDate.month())) &&
                ((a = this.startDate.month()), (o = this.startDate.year()))),
              this.minDate &&
                (o < this.minDate.year() ||
                  (o == this.minDate.year() && a < this.minDate.month())) &&
                ((a = this.minDate.month()), (o = this.minDate.year())),
              this.maxDate &&
                (o > this.maxDate.year() ||
                  (o == this.maxDate.year() && a > this.maxDate.month())) &&
                ((a = this.maxDate.month()), (o = this.maxDate.year())),
              i
                ? (this.leftCalendar.month.month(a).year(o),
                  this.linkedCalendars &&
                    (this.rightCalendar.month = this.leftCalendar.month
                      .clone()
                      .add(1, "month")))
                : (this.rightCalendar.month.month(a).year(o),
                  this.linkedCalendars &&
                    (this.leftCalendar.month = this.rightCalendar.month
                      .clone()
                      .subtract(1, "month"))),
              this.updateCalendars();
          },
          timeChanged: function (t) {
            var i = e(t.target).closest(".calendar"),
              s = i.hasClass("left"),
              n = parseInt(i.find(".hourselect").val(), 10),
              a = parseInt(i.find(".minuteselect").val(), 10),
              o = this.timePickerSeconds
                ? parseInt(i.find(".secondselect").val(), 10)
                : 0;
            if (!this.timePicker24Hour) {
              var r = i.find(".ampmselect").val();
              "PM" === r && n < 12 && (n += 12),
                "AM" === r && 12 === n && (n = 0);
            }
            if (s) {
              var l = this.startDate.clone();
              l.hour(n),
                l.minute(a),
                l.second(o),
                this.setStartDate(l),
                this.singleDatePicker
                  ? (this.endDate = this.startDate.clone())
                  : this.endDate &&
                    this.endDate.format("YYYY-MM-DD") == l.format("YYYY-MM-DD") &&
                    this.endDate.isBefore(l) &&
                    this.setEndDate(l.clone());
            } else if (this.endDate) {
              var h = this.endDate.clone();
              h.hour(n), h.minute(a), h.second(o), this.setEndDate(h);
            }
            this.updateCalendars(),
              this.updateFormInputs(),
              this.renderTimePicker("left"),
              this.renderTimePicker("right");
          },
          formInputsChanged: function (i) {
            var s = e(i.target).closest(".calendar").hasClass("right"),
              n = t(
                this.container.find('input[name="daterangepicker_start"]').val(),
                this.locale.format
              ),
              a = t(
                this.container.find('input[name="daterangepicker_end"]').val(),
                this.locale.format
              );
            n.isValid() &&
              a.isValid() &&
              (s && a.isBefore(n) && (n = a.clone()),
              this.setStartDate(n),
              this.setEndDate(a),
              s
                ? this.container
                    .find('input[name="daterangepicker_start"]')
                    .val(this.startDate.format(this.locale.format))
                : this.container
                    .find('input[name="daterangepicker_end"]')
                    .val(this.endDate.format(this.locale.format))),
              this.updateView();
          },
          formInputsFocused: function (t) {
            this.container
              .find(
                'input[name="daterangepicker_start"], input[name="daterangepicker_end"]'
              )
              .removeClass("active"),
              e(t.target).addClass("active"),
              e(t.target).closest(".calendar").hasClass("right") &&
                ((this.endDate = null),
                this.setStartDate(this.startDate.clone()),
                this.updateView());
          },
          formInputsBlurred: function (e) {
            if (!this.endDate) {
              var i = this.container
                  .find('input[name="daterangepicker_end"]')
                  .val(),
                s = t(i, this.locale.format);
              s.isValid() && (this.setEndDate(s), this.updateView());
            }
          },
          formInputsKeydown: function (t) {
            13 === t.keyCode && (t.preventDefault(), this.formInputsChanged(t));
          },
          elementChanged: function () {
            if (this.element.is("input") && this.element.val().length) {
              var e = this.element.val().split(this.locale.separator),
                i = null,
                s = null;
              2 === e.length &&
                ((i = t(e[0], this.locale.format)),
                (s = t(e[1], this.locale.format))),
                (this.singleDatePicker || null === i || null === s) &&
                  (s = i = t(this.element.val(), this.locale.format)),
                i.isValid() &&
                  s.isValid() &&
                  (this.setStartDate(i), this.setEndDate(s), this.updateView());
            }
          },
          keydown: function (t) {
            (9 !== t.keyCode && 13 !== t.keyCode) || this.hide(),
              27 === t.keyCode &&
                (t.preventDefault(), t.stopPropagation(), this.hide());
          },
          updateElement: function () {
            this.element.is("input") &&
            !this.singleDatePicker &&
            this.autoUpdateInput
              ? (this.element.val(
                  this.startDate.format(this.locale.format) +
                    this.locale.separator +
                    this.endDate.format(this.locale.format)
                ),
                this.element.trigger("change"))
              : this.element.is("input") &&
                this.autoUpdateInput &&
                (this.element.val(this.startDate.format(this.locale.format)),
                this.element.trigger("change"));
          },
          remove: function () {
            this.container.remove(),
              this.element.off(".daterangepicker"),
              this.element.removeData();
          },
        }),
        (e.fn.daterangepicker = function (t, s) {
          var n = e.extend(!0, {}, e.fn.daterangepicker.defaultOptions, t);
          return (
            this.each(function () {
              var t = e(this);
              t.data("daterangepicker") && t.data("daterangepicker").remove(),
                t.data("daterangepicker", new i(t, n, s));
            }),
            this
          );
        }),
        i
      );
    }),
    (function (t, e, i, s) {
      "use strict";
      if (((t.console = t.console || { info: function (t) {} }), i))
        if (i.fn.fancybox) console.info("fancyBox already initialized");
        else {
          var n,
            a,
            o = {
              closeExisting: !1,
              loop: !1,
              gutter: 50,
              keyboard: !0,
              arrows: !0,
              infobar: !0,
              smallBtn: "auto",
              toolbar: "auto",
              buttons: ["zoom", "thumbs", "close"],
              idleTime: 3,
              protect: !1,
              modal: !1,
              image: { preload: !1 },
              ajax: { settings: { data: { fancybox: !0 } } },
              iframe: {
                tpl: '<iframe id="fancybox-frame{rnd}" name="fancybox-frame{rnd}" class="fancybox-iframe" frameborder="0" vspace="0" hspace="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen allowtransparency="true" src=""></iframe>',
                preload: !0,
                css: {},
                attr: { scrolling: "auto" },
              },
              video: {
                tpl: '<video class="fancybox-video" controls controlsList="nodownload"><source src="{{src}}" type="{{format}}" />Your browser doesn\'t support HTML5 video</video>',
                format: "",
                autoStart: !0,
              },
              defaultType: "image",
              animationEffect: "zoom",
              animationDuration: 366,
              zoomOpacity: "auto",
              transitionEffect: "fade",
              transitionDuration: 366,
              slideClass: "",
              baseClass: "",
              baseTpl:
                '<div class="fancybox-container" role="dialog" tabindex="-1"><div class="fancybox-bg"></div><div class="fancybox-inner"><div class="fancybox-infobar"><span data-fancybox-index></span>&nbsp;/&nbsp;<span data-fancybox-count></span></div><div class="fancybox-toolbar">{{buttons}}</div><div class="fancybox-navigation">{{arrows}}</div><div class="fancybox-stage"></div><div class="fancybox-caption"></div></div></div>',
              spinnerTpl: '<div class="fancybox-loading"></div>',
              errorTpl: '<div class="fancybox-error"><p>{{ERROR}}</p></div>',
              btnTpl: {
                download:
                  '<a download data-fancybox-download class="fancybox-button fancybox-button--download" title="{{DOWNLOAD}}" href="javascript:;"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M18.62 17.09V19H5.38v-1.91zm-2.97-6.96L17 11.45l-5 4.87-5-4.87 1.36-1.32 2.68 2.64V5h1.92v7.77z"/></svg></a>',
                zoom: '<button data-fancybox-zoom class="fancybox-button fancybox-button--zoom" title="{{ZOOM}}"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M18.7 17.3l-3-3a5.9 5.9 0 0 0-.6-7.6 5.9 5.9 0 0 0-8.4 0 5.9 5.9 0 0 0 0 8.4 5.9 5.9 0 0 0 7.7.7l3 3a1 1 0 0 0 1.3 0c.4-.5.4-1 0-1.5zM8.1 13.8a4 4 0 0 1 0-5.7 4 4 0 0 1 5.7 0 4 4 0 0 1 0 5.7 4 4 0 0 1-5.7 0z"/></svg></button>',
                close:
                  '<button data-fancybox-close class="fancybox-button fancybox-button--close" title="{{CLOSE}}"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 10.6L6.6 5.2 5.2 6.6l5.4 5.4-5.4 5.4 1.4 1.4 5.4-5.4 5.4 5.4 1.4-1.4-5.4-5.4 5.4-5.4-1.4-1.4-5.4 5.4z"/></svg></button>',
                arrowLeft:
                  '<button data-fancybox-prev class="fancybox-button fancybox-button--arrow_left" title="{{PREV}}"><div><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M11.28 15.7l-1.34 1.37L5 12l4.94-5.07 1.34 1.38-2.68 2.72H19v1.94H8.6z"/></svg></div></button>',
                arrowRight:
                  '<button data-fancybox-next class="fancybox-button fancybox-button--arrow_right" title="{{NEXT}}"><div><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M15.4 12.97l-2.68 2.72 1.34 1.38L19 12l-4.94-5.07-1.34 1.38 2.68 2.72H5v1.94z"/></svg></div></button>',
                smallBtn:
                  '<button type="button" data-fancybox-close class="fancybox-button fancybox-close-small" title="{{CLOSE}}"><svg xmlns="http://www.w3.org/2000/svg" version="1" viewBox="0 0 24 24"><path d="M13 12l5-5-1-1-5 5-5-5-1 1 5 5-5 5 1 1 5-5 5 5 1-1z"/></svg></button>',
              },
              parentEl: "body",
              hideScrollbar: !0,
              autoFocus: !0,
              backFocus: !0,
              trapFocus: !0,
              fullScreen: { autoStart: !1 },
              touch: { vertical: !0, momentum: !0 },
              hash: null,
              media: {},
              slideShow: { autoStart: !1, speed: 3e3 },
              thumbs: {
                autoStart: !1,
                hideOnClose: !0,
                parentEl: ".fancybox-container",
                axis: "y",
              },
              wheel: "auto",
              onInit: i.noop,
              beforeLoad: i.noop,
              afterLoad: i.noop,
              beforeShow: i.noop,
              afterShow: i.noop,
              beforeClose: i.noop,
              afterClose: i.noop,
              onActivate: i.noop,
              onDeactivate: i.noop,
              clickContent: function (t, e) {
                return "image" === t.type && "zoom";
              },
              clickSlide: "close",
              clickOutside: "close",
              dblclickContent: !1,
              dblclickSlide: !1,
              dblclickOutside: !1,
              mobile: {
                idleTime: !1,
                clickContent: function (t, e) {
                  return "image" === t.type && "toggleControls";
                },
                clickSlide: function (t, e) {
                  return "image" === t.type ? "toggleControls" : "close";
                },
                dblclickContent: function (t, e) {
                  return "image" === t.type && "zoom";
                },
                dblclickSlide: function (t, e) {
                  return "image" === t.type && "zoom";
                },
              },
              lang: "en",
              i18n: {
                en: {
                  CLOSE: "Close",
                  NEXT: "Next",
                  PREV: "Previous",
                  ERROR:
                    "The requested content cannot be loaded. <br/> Please try again later.",
                  PLAY_START: "Start slideshow",
                  PLAY_STOP: "Pause slideshow",
                  FULL_SCREEN: "Full screen",
                  THUMBS: "Thumbnails",
                  DOWNLOAD: "Download",
                  SHARE: "Share",
                  ZOOM: "Zoom",
                },
                de: {
                  CLOSE: "Schliessen",
                  NEXT: "Weiter",
                  PREV: "ZurĂ¼ck",
                  ERROR:
                    "Die angeforderten Daten konnten nicht geladen werden. <br/> Bitte versuchen Sie es spĂ¤ter nochmal.",
                  PLAY_START: "Diaschau starten",
                  PLAY_STOP: "Diaschau beenden",
                  FULL_SCREEN: "Vollbild",
                  THUMBS: "Vorschaubilder",
                  DOWNLOAD: "Herunterladen",
                  SHARE: "Teilen",
                  ZOOM: "MaĂŸstab",
                },
              },
            },
            r = i(t),
            l = i(e),
            h = 0,
            c =
              t.requestAnimationFrame ||
              t.webkitRequestAnimationFrame ||
              t.mozRequestAnimationFrame ||
              t.oRequestAnimationFrame ||
              function (e) {
                return t.setTimeout(e, 1e3 / 60);
              },
            d = (function () {
              var t,
                i = e.createElement("fakeelement"),
                s = {
                  transition: "transitionend",
                  OTransition: "oTransitionEnd",
                  MozTransition: "transitionend",
                  WebkitTransition: "webkitTransitionEnd",
                };
              for (t in s) if (void 0 !== i.style[t]) return s[t];
              return "transitionend";
            })(),
            u = function (t) {
              return t && t.length && t[0].offsetHeight;
            },
            f = function (t, e) {
              var s = i.extend(!0, {}, t, e);
              return (
                i.each(e, function (t, e) {
                  i.isArray(e) && (s[t] = e);
                }),
                s
              );
            },
            p = function (t, e, s) {
              (this.opts = f({ index: s }, i.fancybox.defaults)),
                i.isPlainObject(e) && (this.opts = f(this.opts, e)),
                i.fancybox.isMobile &&
                  (this.opts = f(this.opts, this.opts.mobile)),
                (this.id = this.opts.id || ++h),
                (this.currIndex = parseInt(this.opts.index, 10) || 0),
                (this.prevIndex = null),
                (this.prevPos = null),
                (this.currPos = 0),
                (this.firstRun = !0),
                (this.group = []),
                (this.slides = {}),
                this.addContent(t),
                this.group.length && this.init();
            };
          i.extend(p.prototype, {
            init: function () {
              var s,
                n,
                a,
                o = this,
                r = o.group[o.currIndex].opts,
                l = i.fancybox.scrollbarWidth;
              r.closeExisting && i.fancybox.close(!0),
                i("body").addClass("fancybox-active"),
                !i.fancybox.getInstance() &&
                  !1 !== r.hideScrollbar &&
                  !i.fancybox.isMobile &&
                  e.body.scrollHeight > t.innerHeight &&
                  (void 0 === l &&
                    ((s = i(
                      '<div style="width:100px;height:100px;overflow:scroll;" />'
                    ).appendTo("body")),
                    (l = i.fancybox.scrollbarWidth =
                      s[0].offsetWidth - s[0].clientWidth),
                    s.remove()),
                  i("head").append(
                    '<style id="fancybox-style-noscroll" type="text/css">.compensate-for-scrollbar { margin-right: ' +
                      l +
                      "px; }</style>"
                  ),
                  i("body").addClass("compensate-for-scrollbar")),
                (a = ""),
                i.each(r.buttons, function (t, e) {
                  a += r.btnTpl[e] || "";
                }),
                (n = i(
                  o.translate(
                    o,
                    r.baseTpl
                      .replace("{{buttons}}", a)
                      .replace(
                        "{{arrows}}",
                        r.btnTpl.arrowLeft + r.btnTpl.arrowRight
                      )
                  )
                )
                  .attr("id", "fancybox-container-" + o.id)
                  .addClass(r.baseClass)
                  .data("FancyBox", o)
                  .appendTo(r.parentEl)),
                (o.$refs = { container: n }),
                [
                  "bg",
                  "inner",
                  "infobar",
                  "toolbar",
                  "stage",
                  "caption",
                  "navigation",
                ].forEach(function (t) {
                  o.$refs[t] = n.find(".fancybox-" + t);
                }),
                o.trigger("onInit"),
                o.activate(),
                o.jumpTo(o.currIndex);
            },
            translate: function (t, e) {
              var i = t.opts.i18n[t.opts.lang];
              return e.replace(/\{\{(\w+)\}\}/g, function (t, e) {
                var s = i[e];
                return void 0 === s ? t : s;
              });
            },
            addContent: function (t) {
              var e,
                s = this,
                n = i.makeArray(t);
              i.each(n, function (t, e) {
                var n,
                  a,
                  o,
                  r,
                  l,
                  h = {},
                  c = {};
                i.isPlainObject(e)
                  ? ((h = e), (c = e.opts || e))
                  : "object" === i.type(e) && i(e).length
                  ? ((c = (n = i(e)).data() || {}),
                    ((c = i.extend(!0, {}, c, c.options)).$orig = n),
                    (h.src = s.opts.src || c.src || n.attr("href")),
                    h.type || h.src || ((h.type = "inline"), (h.src = e)))
                  : (h = { type: "html", src: e + "" }),
                  (h.opts = i.extend(!0, {}, s.opts, c)),
                  i.isArray(c.buttons) && (h.opts.buttons = c.buttons),
                  i.fancybox.isMobile &&
                    h.opts.mobile &&
                    (h.opts = f(h.opts, h.opts.mobile)),
                  (a = h.type || h.opts.type),
                  (r = h.src || ""),
                  !a &&
                    r &&
                    ((o = r.match(/\.(mp4|mov|ogv|webm)((\?|#).*)?$/i))
                      ? ((a = "video"),
                        h.opts.video.format ||
                          (h.opts.video.format =
                            "video/" + ("ogv" === o[1] ? "ogg" : o[1])))
                      : r.match(
                          /(^data:image\/[a-z0-9+\/=]*,)|(\.(jp(e|g|eg)|gif|png|bmp|webp|svg|ico)((\?|#).*)?$)/i
                        )
                      ? (a = "image")
                      : r.match(/\.(pdf)((\?|#).*)?$/i)
                      ? (a = "iframe")
                      : "#" === r.charAt(0) && (a = "inline")),
                  a ? (h.type = a) : s.trigger("objectNeedsType", h),
                  h.contentType ||
                    (h.contentType =
                      i.inArray(h.type, ["html", "inline", "ajax"]) > -1
                        ? "html"
                        : h.type),
                  (h.index = s.group.length),
                  "auto" == h.opts.smallBtn &&
                    (h.opts.smallBtn =
                      i.inArray(h.type, ["html", "inline", "ajax"]) > -1),
                  "auto" === h.opts.toolbar &&
                    (h.opts.toolbar = !h.opts.smallBtn),
                  h.opts.$trigger &&
                    h.index === s.opts.index &&
                    ((h.opts.$thumb = h.opts.$trigger.find("img:first")),
                    h.opts.$thumb.length && (h.opts.$orig = h.opts.$trigger)),
                  (h.opts.$thumb && h.opts.$thumb.length) ||
                    !h.opts.$orig ||
                    (h.opts.$thumb = h.opts.$orig.find("img:first")),
                  "function" === i.type(h.opts.caption) &&
                    (h.opts.caption = h.opts.caption.apply(e, [s, h])),
                  "function" === i.type(s.opts.caption) &&
                    (h.opts.caption = s.opts.caption.apply(e, [s, h])),
                  h.opts.caption instanceof i ||
                    (h.opts.caption =
                      void 0 === h.opts.caption ? "" : h.opts.caption + ""),
                  "ajax" === h.type &&
                    (l = r.split(/\s+/, 2)).length > 1 &&
                    ((h.src = l.shift()), (h.opts.filter = l.shift())),
                  h.opts.modal &&
                    (h.opts = i.extend(!0, h.opts, {
                      infobar: 0,
                      toolbar: 0,
                      smallBtn: 0,
                      keyboard: 0,
                      slideShow: 0,
                      fullScreen: 0,
                      thumbs: 0,
                      touch: 0,
                      clickContent: !1,
                      clickSlide: !1,
                      clickOutside: !1,
                      dblclickContent: !1,
                      dblclickSlide: !1,
                      dblclickOutside: !1,
                    })),
                  s.group.push(h);
              }),
                Object.keys(s.slides).length &&
                  (s.updateControls(),
                  (e = s.Thumbs) && e.isActive && (e.create(), e.focus()));
            },
            addEvents: function () {
              var e = this;
              e.removeEvents(),
                e.$refs.container
                  .on("click.fb-close", "[data-fancybox-close]", function (t) {
                    t.stopPropagation(), t.preventDefault(), e.close(t);
                  })
                  .on(
                    "touchstart.fb-prev click.fb-prev",
                    "[data-fancybox-prev]",
                    function (t) {
                      t.stopPropagation(), t.preventDefault(), e.previous();
                    }
                  )
                  .on(
                    "touchstart.fb-next click.fb-next",
                    "[data-fancybox-next]",
                    function (t) {
                      t.stopPropagation(), t.preventDefault(), e.next();
                    }
                  )
                  .on("click.fb", "[data-fancybox-zoom]", function (t) {
                    e[e.isScaledDown() ? "scaleToActual" : "scaleToFit"]();
                  }),
                r.on("orientationchange.fb resize.fb", function (t) {
                  t && t.originalEvent && "resize" === t.originalEvent.type
                    ? c(function () {
                        e.update();
                      })
                    : (e.current &&
                        "iframe" === e.current.type &&
                        e.$refs.stage.hide(),
                      setTimeout(
                        function () {
                          e.$refs.stage.show(), e.update();
                        },
                        i.fancybox.isMobile ? 600 : 250
                      ));
                }),
                l.on("keydown.fb", function (t) {
                  var s = (i.fancybox ? i.fancybox.getInstance() : null).current,
                    n = t.keyCode || t.which;
                  if (9 != n) {
                    if (
                      !(
                        !s.opts.keyboard ||
                        t.ctrlKey ||
                        t.altKey ||
                        t.shiftKey ||
                        i(t.target).is("input") ||
                        i(t.target).is("textarea")
                      )
                    )
                      return 8 === n || 27 === n
                        ? (t.preventDefault(), void e.close(t))
                        : 37 === n || 38 === n
                        ? (t.preventDefault(), void e.previous())
                        : 39 === n || 40 === n
                        ? (t.preventDefault(), void e.next())
                        : void e.trigger("afterKeydown", t, n);
                  } else s.opts.trapFocus && e.focus(t);
                }),
                e.group[e.currIndex].opts.idleTime &&
                  ((e.idleSecondsCounter = 0),
                  l.on(
                    "mousemove.fb-idle mouseleave.fb-idle mousedown.fb-idle touchstart.fb-idle touchmove.fb-idle scroll.fb-idle keydown.fb-idle",
                    function (t) {
                      (e.idleSecondsCounter = 0),
                        e.isIdle && e.showControls(),
                        (e.isIdle = !1);
                    }
                  ),
                  (e.idleInterval = t.setInterval(function () {
                    e.idleSecondsCounter++,
                      e.idleSecondsCounter >=
                        e.group[e.currIndex].opts.idleTime &&
                        !e.isDragging &&
                        ((e.isIdle = !0),
                        (e.idleSecondsCounter = 0),
                        e.hideControls());
                  }, 1e3)));
            },
            removeEvents: function () {
              r.off("orientationchange.fb resize.fb"),
                l.off("keydown.fb .fb-idle"),
                this.$refs.container.off(".fb-close .fb-prev .fb-next"),
                this.idleInterval &&
                  (t.clearInterval(this.idleInterval),
                  (this.idleInterval = null));
            },
            previous: function (t) {
              return this.jumpTo(this.currPos - 1, t);
            },
            next: function (t) {
              return this.jumpTo(this.currPos + 1, t);
            },
            jumpTo: function (t, e) {
              var s,
                n,
                a,
                o,
                r,
                l,
                h,
                c = this,
                d = c.group.length;
              if (
                !(c.isDragging || c.isClosing || (c.isAnimating && c.firstRun))
              ) {
                if (
                  ((t = parseInt(t, 10)),
                  !(a = c.current ? c.current.opts.loop : c.opts.loop) &&
                    (t < 0 || t >= d))
                )
                  return !1;
                if (
                  ((s = c.firstRun = !Object.keys(c.slides).length),
                  !(d < 2 && !s && c.isDragging))
                ) {
                  if (
                    ((r = c.current),
                    (c.prevIndex = c.currIndex),
                    (c.prevPos = c.currPos),
                    (o = c.createSlide(t)),
                    d > 1 &&
                      ((a || o.index < d - 1) && c.createSlide(t + 1),
                      (a || o.index > 0) && c.createSlide(t - 1)),
                    (c.current = o),
                    (c.currIndex = o.index),
                    (c.currPos = o.pos),
                    c.trigger("beforeShow", s),
                    c.updateControls(),
                    (n = c.isMoved(o)),
                    (o.forcedDuration = void 0),
                    i.isNumeric(e)
                      ? (o.forcedDuration = e)
                      : (e =
                          o.opts[s ? "animationDuration" : "transitionDuration"]),
                    (e = parseInt(e, 10)),
                    s)
                  )
                    return (
                      o.opts.animationEffect &&
                        e &&
                        c.$refs.container.css("transition-duration", e + "ms"),
                      c.$refs.container.addClass("fancybox-is-open"),
                      o.$slide.addClass("fancybox-slide--previous"),
                      c.loadSlide(o),
                      o.$slide
                        .removeClass("fancybox-slide--previous")
                        .addClass("fancybox-slide--current"),
                      c.preload("image"),
                      void c.$refs.container.trigger("focus")
                    );
                  i.each(c.slides, function (t, e) {
                    i.fancybox.stop(e.$slide, !0),
                      e.$slide
                        .removeClass("fancybox-animated")
                        .removeClass(function (t, e) {
                          return (e.match(/(^|\s)fancybox-fx-\S+/g) || []).join(
                            " "
                          );
                        });
                  }),
                    o.$slide
                      .removeClass(
                        "fancybox-slide--next fancybox-slide--previous"
                      )
                      .addClass("fancybox-slide--current"),
                    n
                      ? ((l = Math.round(o.$slide.width())),
                        i.each(c.slides, function (t, s) {
                          var n = s.pos - o.pos;
                          i.fancybox.animate(
                            s.$slide,
                            { top: 0, left: n * l + n * s.opts.gutter },
                            e,
                            function () {
                              s.$slide
                                .removeAttr("style")
                                .removeClass(
                                  "fancybox-slide--next fancybox-slide--previous"
                                ),
                                s.pos === c.currPos && c.complete();
                            }
                          );
                        }))
                      : c.$refs.stage.children().removeAttr("style"),
                    o.isLoaded ? c.revealContent(o) : c.loadSlide(o),
                    c.preload("image"),
                    r.pos !== o.pos &&
                      ((h =
                        "fancybox-slide--" +
                        (r.pos > o.pos ? "next" : "previous")),
                      r.$slide.removeClass(
                        "fancybox-slide--complete fancybox-slide--current fancybox-slide--next fancybox-slide--previous"
                      ),
                      (r.isComplete = !1),
                      e &&
                        (n || o.opts.transitionEffect) &&
                        (n
                          ? r.$slide.addClass(h)
                          : ((h =
                              "fancybox-animated " +
                              h +
                              " fancybox-fx-" +
                              o.opts.transitionEffect),
                            i.fancybox.animate(r.$slide, h, e, null, !1))));
                }
              }
            },
            createSlide: function (t) {
              var e, s;
              return (
                (s = (s = t % this.group.length) < 0 ? this.group.length + s : s),
                !this.slides[t] &&
                  this.group[s] &&
                  ((e = i('<div class="fancybox-slide"></div>').appendTo(
                    this.$refs.stage
                  )),
                  (this.slides[t] = i.extend(!0, {}, this.group[s], {
                    pos: t,
                    $slide: e,
                    isLoaded: !1,
                  })),
                  this.updateSlide(this.slides[t])),
                this.slides[t]
              );
            },
            scaleToActual: function (t, e, s) {
              var n,
                a,
                o,
                r,
                l,
                h = this,
                c = h.current,
                d = c.$content,
                u = i.fancybox.getTranslate(c.$slide).width,
                f = i.fancybox.getTranslate(c.$slide).height,
                p = c.width,
                m = c.height;
              !h.isAnimating &&
                d &&
                "image" == c.type &&
                c.isLoaded &&
                !c.hasError &&
                (i.fancybox.stop(d),
                (h.isAnimating = !0),
                (t = void 0 === t ? 0.5 * u : t),
                (e = void 0 === e ? 0.5 * f : e),
                ((n = i.fancybox.getTranslate(d)).top -= i.fancybox.getTranslate(
                  c.$slide
                ).top),
                (n.left -= i.fancybox.getTranslate(c.$slide).left),
                (r = p / n.width),
                (l = m / n.height),
                (a = 0.5 * u - 0.5 * p),
                (o = 0.5 * f - 0.5 * m),
                p > u &&
                  ((a = n.left * r - (t * r - t)) > 0 && (a = 0),
                  a < u - p && (a = u - p)),
                m > f &&
                  ((o = n.top * l - (e * l - e)) > 0 && (o = 0),
                  o < f - m && (o = f - m)),
                h.updateCursor(p, m),
                i.fancybox.animate(
                  d,
                  { top: o, left: a, scaleX: r, scaleY: l },
                  s || 330,
                  function () {
                    h.isAnimating = !1;
                  }
                ),
                h.SlideShow && h.SlideShow.isActive && h.SlideShow.stop());
            },
            scaleToFit: function (t) {
              var e,
                s = this,
                n = s.current,
                a = n.$content;
              !s.isAnimating &&
                a &&
                "image" == n.type &&
                n.isLoaded &&
                !n.hasError &&
                (i.fancybox.stop(a),
                (s.isAnimating = !0),
                (e = s.getFitPos(n)),
                s.updateCursor(e.width, e.height),
                i.fancybox.animate(
                  a,
                  {
                    top: e.top,
                    left: e.left,
                    scaleX: e.width / a.width(),
                    scaleY: e.height / a.height(),
                  },
                  t || 330,
                  function () {
                    s.isAnimating = !1;
                  }
                ));
            },
            getFitPos: function (t) {
              var e,
                s,
                n,
                a,
                o = t.$content,
                r = t.$slide,
                l = t.width || t.opts.width,
                h = t.height || t.opts.height,
                c = {};
              return (
                !!(t.isLoaded && o && o.length) &&
                ((e = i.fancybox.getTranslate(this.$refs.stage).width),
                (s = i.fancybox.getTranslate(this.$refs.stage).height),
                (e -=
                  parseFloat(r.css("paddingLeft")) +
                  parseFloat(r.css("paddingRight")) +
                  parseFloat(o.css("marginLeft")) +
                  parseFloat(o.css("marginRight"))),
                (s -=
                  parseFloat(r.css("paddingTop")) +
                  parseFloat(r.css("paddingBottom")) +
                  parseFloat(o.css("marginTop")) +
                  parseFloat(o.css("marginBottom"))),
                (l && h) || ((l = e), (h = s)),
                (n = Math.min(1, e / l, s / h)),
                (l = Math.floor(n * l)),
                (h = Math.floor(n * h)),
                "image" === t.type
                  ? ((c.top =
                      Math.floor(0.5 * (s - h)) +
                      parseFloat(r.css("paddingTop"))),
                    (c.left =
                      Math.floor(0.5 * (e - l)) +
                      parseFloat(r.css("paddingLeft"))))
                  : "video" === t.contentType &&
                    (h >
                    l /
                      (a =
                        t.opts.width && t.opts.height
                          ? l / h
                          : t.opts.ratio || 16 / 9)
                      ? (h = l / a)
                      : l > h * a && (l = h * a)),
                (c.width = l),
                (c.height = h),
                c)
              );
            },
            update: function () {
              var t = this;
              i.each(t.slides, function (e, i) {
                t.updateSlide(i);
              });
            },
            updateSlide: function (t) {
              var e = t && t.$content,
                s = t.width || t.opts.width,
                n = t.height || t.opts.height,
                a = t.$slide;
              e &&
                (s || n || "video" === t.contentType) &&
                !t.hasError &&
                (i.fancybox.stop(e),
                i.fancybox.setTranslate(e, this.getFitPos(t)),
                t.pos === this.currPos &&
                  ((this.isAnimating = !1), this.updateCursor())),
                a.length &&
                  (a.trigger("refresh"),
                  this.$refs.toolbar.toggleClass(
                    "compensate-for-scrollbar",
                    a.get(0).scrollHeight > a.get(0).clientHeight
                  )),
                this.trigger("onUpdate", t);
            },
            centerSlide: function (t, e) {
              var s, n;
              this.current &&
                ((s = Math.round(t.$slide.width())),
                (n = t.pos - this.current.pos),
                i.fancybox.animate(
                  t.$slide,
                  { top: 0, left: n * s + n * t.opts.gutter, opacity: 1 },
                  void 0 === e ? 0 : e,
                  null,
                  !1
                ));
            },
            isMoved: function (t) {
              var e = t || this.current,
                s = i.fancybox.getTranslate(e.$slide);
              return (
                (0 !== s.left || 0 !== s.top) &&
                !e.$slide.hasClass("fancybox-animated")
              );
            },
            updateCursor: function (t, e) {
              var s,
                n = this.current,
                a = this.$refs.container.removeClass(
                  "fancybox-is-zoomable fancybox-can-zoomIn fancybox-can-zoomOut fancybox-can-swipe fancybox-can-pan"
                );
              n &&
                !this.isClosing &&
                ((s = this.isZoomable()),
                a.toggleClass("fancybox-is-zoomable", s),
                i("[data-fancybox-zoom]").prop("disabled", !s),
                this.canPan(t, e)
                  ? a.addClass("fancybox-can-pan")
                  : s &&
                    ("zoom" === n.opts.clickContent ||
                      (i.isFunction(n.opts.clickContent) &&
                        "zoom" == n.opts.clickContent(n)))
                  ? a.addClass("fancybox-can-zoomIn")
                  : n.opts.touch &&
                    (n.opts.touch.vertical || this.group.length > 1) &&
                    "video" !== n.contentType &&
                    a.addClass("fancybox-can-swipe"));
            },
            isZoomable: function () {
              var t,
                e = this.current;
              if (e && !this.isClosing && "image" === e.type && !e.hasError) {
                if (!e.isLoaded) return !0;
                if (
                  ((t = this.getFitPos(e)),
                  e.width > t.width || e.height > t.height)
                )
                  return !0;
              }
              return !1;
            },
            isScaledDown: function (t, e) {
              var s = !1,
                n = this.current,
                a = n.$content;
              return (
                void 0 !== t && void 0 !== e
                  ? (s = t < n.width && e < n.height)
                  : a &&
                    (s =
                      (s = i.fancybox.getTranslate(a)).width < n.width &&
                      s.height < n.height),
                s
              );
            },
            canPan: function (t, e) {
              var s,
                n,
                a = !1,
                o = this.current;
              return (
                "image" === o.type &&
                  (s = o.$content) &&
                  !o.hasError &&
                  ((a = this.getFitPos(o)),
                  (n =
                    void 0 !== t && void 0 !== e
                      ? { width: t, height: e }
                      : i.fancybox.getTranslate(s)),
                  (a =
                    Math.abs(n.width - a.width) > 1.5 ||
                    Math.abs(n.height - a.height) > 1.5)),
                a
              );
            },
            loadSlide: function (t) {
              var e,
                s,
                n,
                a = this;
              if (!t.isLoading && !t.isLoaded) {
                switch (
                  ((t.isLoading = !0),
                  a.trigger("beforeLoad", t),
                  (e = t.type),
                  (s = t.$slide)
                    .off("refresh")
                    .trigger("onReset")
                    .addClass(t.opts.slideClass),
                  e)
                ) {
                  case "image":
                    a.setImage(t);
                    break;
                  case "iframe":
                    a.setIframe(t);
                    break;
                  case "html":
                    a.setContent(t, t.src || t.content);
                    break;
                  case "video":
                    a.setContent(
                      t,
                      t.opts.video.tpl
                        .replace("{{src}}", t.src)
                        .replace(
                          "{{format}}",
                          t.opts.videoFormat || t.opts.video.format
                        )
                    );
                    break;
                  case "inline":
                    i(t.src).length ? a.setContent(t, i(t.src)) : a.setError(t);
                    break;
                  case "ajax":
                    a.showLoading(t),
                      (n = i.ajax(
                        i.extend({}, t.opts.ajax.settings, {
                          url: t.src,
                          success: function (e, i) {
                            "success" === i && a.setContent(t, e);
                          },
                          error: function (e, i) {
                            e && "abort" !== i && a.setError(t);
                          },
                        })
                      )),
                      s.one("onReset", function () {
                        n.abort();
                      });
                    break;
                  default:
                    a.setError(t);
                }
                return !0;
              }
            },
            setImage: function (e) {
              var s,
                n,
                a,
                o,
                r,
                l = this,
                h = e.opts.srcset || e.opts.image.srcset;
              if (
                ((e.timouts = setTimeout(function () {
                  var t = e.$image;
                  !e.isLoading ||
                    (t && t.length && t[0].complete) ||
                    e.hasError ||
                    l.showLoading(e);
                }, 350)),
                h)
              ) {
                (o = t.devicePixelRatio || 1),
                  (r = t.innerWidth * o),
                  (a = h.split(",").map(function (t) {
                    var e = {};
                    return (
                      t
                        .trim()
                        .split(/\s+/)
                        .forEach(function (t, i) {
                          var s = parseInt(t.substring(0, t.length - 1), 10);
                          if (0 === i) return (e.url = t);
                          s && ((e.value = s), (e.postfix = t[t.length - 1]));
                        }),
                      e
                    );
                  })).sort(function (t, e) {
                    return t.value - e.value;
                  });
                for (var c = 0; c < a.length; c++) {
                  var d = a[c];
                  if (
                    ("w" === d.postfix && d.value >= r) ||
                    ("x" === d.postfix && d.value >= o)
                  ) {
                    n = d;
                    break;
                  }
                }
                !n && a.length && (n = a[a.length - 1]),
                  n &&
                    ((e.src = n.url),
                    e.width &&
                      e.height &&
                      "w" == n.postfix &&
                      ((e.height = (e.width / e.height) * n.value),
                      (e.width = n.value)),
                    (e.opts.srcset = h));
              }
              (e.$content = i('<div class="fancybox-content"></div>')
                .addClass("fancybox-is-hidden")
                .appendTo(e.$slide.addClass("fancybox-slide--image"))),
                (s =
                  e.opts.thumb ||
                  (!(!e.opts.$thumb || !e.opts.$thumb.length) &&
                    e.opts.$thumb.attr("src"))),
                !1 !== e.opts.preload &&
                  e.opts.width &&
                  e.opts.height &&
                  s &&
                  ((e.width = e.opts.width),
                  (e.height = e.opts.height),
                  (e.$ghost = i("<img />")
                    .one("error", function () {
                      i(this).remove(), (e.$ghost = null);
                    })
                    .one("load", function () {
                      l.afterLoad(e);
                    })
                    .addClass("fancybox-image")
                    .appendTo(e.$content)
                    .attr("src", s))),
                l.setBigImage(e);
            },
            setBigImage: function (t) {
              var e = this,
                s = i("<img />");
              (t.$image = s
                .one("error", function () {
                  e.setError(t);
                })
                .one("load", function () {
                  var i;
                  t.$ghost ||
                    (e.resolveImageSlideSize(
                      t,
                      this.naturalWidth,
                      this.naturalHeight
                    ),
                    e.afterLoad(t)),
                    t.timouts && (clearTimeout(t.timouts), (t.timouts = null)),
                    e.isClosing ||
                      (t.opts.srcset &&
                        (((i = t.opts.sizes) && "auto" !== i) ||
                          (i =
                            (t.width / t.height > 1 && r.width() / r.height() > 1
                              ? "100"
                              : Math.round((t.width / t.height) * 100)) + "vw"),
                        s.attr("sizes", i).attr("srcset", t.opts.srcset)),
                      t.$ghost &&
                        setTimeout(function () {
                          t.$ghost && !e.isClosing && t.$ghost.hide();
                        }, Math.min(300, Math.max(1e3, t.height / 1600))),
                      e.hideLoading(t));
                })
                .addClass("fancybox-image")
                .attr("src", t.src)
                .appendTo(t.$content)),
                (s[0].complete || "complete" == s[0].readyState) &&
                s[0].naturalWidth &&
                s[0].naturalHeight
                  ? s.trigger("load")
                  : s[0].error && s.trigger("error");
            },
            resolveImageSlideSize: function (t, e, i) {
              var s = parseInt(t.opts.width, 10),
                n = parseInt(t.opts.height, 10);
              (t.width = e),
                (t.height = i),
                s > 0 && ((t.width = s), (t.height = Math.floor((s * i) / e))),
                n > 0 && ((t.width = Math.floor((n * e) / i)), (t.height = n));
            },
            setIframe: function (t) {
              var e,
                s = this,
                n = t.opts.iframe,
                a = t.$slide;
              (t.$content = i(
                '<div class="fancybox-content' +
                  (n.preload ? " fancybox-is-hidden" : "") +
                  '"></div>'
              )
                .css(n.css)
                .appendTo(a)),
                a.addClass("fancybox-slide--" + t.contentType),
                (t.$iframe = e =
                  i(n.tpl.replace(/\{rnd\}/g, new Date().getTime()))
                    .attr(n.attr)
                    .appendTo(t.$content)),
                n.preload
                  ? (s.showLoading(t),
                    e.on("load.fb error.fb", function (e) {
                      (this.isReady = 1),
                        t.$slide.trigger("refresh"),
                        s.afterLoad(t);
                    }),
                    a.on("refresh.fb", function () {
                      var i,
                        s = t.$content,
                        o = n.css.width,
                        r = n.css.height;
                      if (1 === e[0].isReady) {
                        try {
                          i = e.contents().find("body");
                        } catch (t) {}
                        i &&
                          i.length &&
                          i.children().length &&
                          (a.css("overflow", "visible"),
                          s.css({ width: "100%", height: "" }),
                          void 0 === o &&
                            (o = Math.ceil(
                              Math.max(i[0].clientWidth, i.outerWidth(!0))
                            )),
                          o && s.width(o),
                          void 0 === r &&
                            (r = Math.ceil(
                              Math.max(i[0].clientHeight, i.outerHeight(!0))
                            )),
                          r && s.height(r),
                          a.css("overflow", "auto")),
                          s.removeClass("fancybox-is-hidden");
                      }
                    }))
                  : this.afterLoad(t),
                e.attr("src", t.src),
                a.one("onReset", function () {
                  try {
                    i(this)
                      .find("iframe")
                      .hide()
                      .unbind()
                      .attr("src", "//about:blank");
                  } catch (t) {}
                  i(this).off("refresh.fb").empty(), (t.isLoaded = !1);
                });
            },
            setContent: function (t, e) {
              var s;
              this.isClosing ||
                (this.hideLoading(t),
                t.$content && i.fancybox.stop(t.$content),
                t.$slide.empty(),
                (s = e) && s.hasOwnProperty && s instanceof i && e.parent().length
                  ? (e.hasClass("fancybox-content") &&
                      e.parent(".fancybox-slide--html").trigger("onReset"),
                    (t.$placeholder = i("<div>").hide().insertAfter(e)),
                    e.css("display", "inline-block"))
                  : t.hasError ||
                    ("string" === i.type(e) &&
                      (e = i("<div>").append(i.trim(e)).contents()),
                    t.opts.filter &&
                      (e = i("<div>").html(e).find(t.opts.filter))),
                t.$slide.one("onReset", function () {
                  i(this).find("video,audio").trigger("pause"),
                    t.$placeholder &&
                      (t.$placeholder
                        .after(e.removeClass("fancybox-content").hide())
                        .remove(),
                      (t.$placeholder = null)),
                    t.$smallBtn && (t.$smallBtn.remove(), (t.$smallBtn = null)),
                    t.hasError ||
                      (i(this).empty(), (t.isLoaded = !1), (t.isRevealed = !1));
                }),
                i(e).appendTo(t.$slide),
                i(e).is("video,audio") &&
                  (i(e).addClass("fancybox-video"),
                  i(e).wrap("<div></div>"),
                  (t.contentType = "video"),
                  (t.opts.width = t.opts.width || i(e).attr("width")),
                  (t.opts.height = t.opts.height || i(e).attr("height"))),
                (t.$content = t.$slide
                  .children()
                  .filter("div,form,main,video,audio,article,.fancybox-content")
                  .first()),
                t.$content.siblings().hide(),
                t.$content.length ||
                  (t.$content = t.$slide
                    .wrapInner("<div></div>")
                    .children()
                    .first()),
                t.$content.addClass("fancybox-content"),
                t.$slide.addClass("fancybox-slide--" + t.contentType),
                this.afterLoad(t));
            },
            setError: function (t) {
              (t.hasError = !0),
                t.$slide
                  .trigger("onReset")
                  .removeClass("fancybox-slide--" + t.contentType)
                  .addClass("fancybox-slide--error"),
                (t.contentType = "html"),
                this.setContent(t, this.translate(t, t.opts.errorTpl)),
                t.pos === this.currPos && (this.isAnimating = !1);
            },
            showLoading: function (t) {
              (t = t || this.current) &&
                !t.$spinner &&
                (t.$spinner = i(
                  this.translate(this, this.opts.spinnerTpl)
                ).appendTo(t.$slide));
            },
            hideLoading: function (t) {
              (t = t || this.current) &&
                t.$spinner &&
                (t.$spinner.remove(), delete t.$spinner);
            },
            afterLoad: function (t) {
              this.isClosing ||
                ((t.isLoading = !1),
                (t.isLoaded = !0),
                this.trigger("afterLoad", t),
                this.hideLoading(t),
                t.pos === this.currPos && this.updateCursor(),
                !t.opts.smallBtn ||
                  (t.$smallBtn && t.$smallBtn.length) ||
                  (t.$smallBtn = i(
                    this.translate(t, t.opts.btnTpl.smallBtn)
                  ).appendTo(t.$content)),
                t.opts.protect &&
                  t.$content &&
                  !t.hasError &&
                  (t.$content.on("contextmenu.fb", function (t) {
                    return 2 == t.button && t.preventDefault(), !0;
                  }),
                  "image" === t.type &&
                    i('<div class="fancybox-spaceball"></div>').appendTo(
                      t.$content
                    )),
                this.revealContent(t));
            },
            revealContent: function (t) {
              var e,
                s,
                n,
                a,
                o = this,
                r = t.$slide,
                l = !1,
                h = !1,
                c = o.isMoved(t),
                d = t.isRevealed;
              if (!c || !d) {
                if (
                  ((t.isRevealed = !0),
                  (e =
                    t.opts[o.firstRun ? "animationEffect" : "transitionEffect"]),
                  (n =
                    t.opts[
                      o.firstRun ? "animationDuration" : "transitionDuration"
                    ]),
                  (n = parseInt(
                    void 0 === t.forcedDuration ? n : t.forcedDuration,
                    10
                  )),
                  t.pos === o.currPos &&
                    (t.isComplete ? (e = !1) : (o.isAnimating = !0)),
                  (!c && t.pos === o.currPos && n) || (e = !1),
                  "zoom" === e &&
                    (t.pos === o.currPos &&
                    n &&
                    "image" === t.type &&
                    !t.hasError &&
                    (h = o.getThumbPos(t))
                      ? (l = o.getFitPos(t))
                      : (e = "fade")),
                  "zoom" === e)
                )
                  return (
                    (l.scaleX = l.width / h.width),
                    (l.scaleY = l.height / h.height),
                    "auto" == (a = t.opts.zoomOpacity) &&
                      (a =
                        Math.abs(t.width / t.height - h.width / h.height) > 0.1),
                    a && ((h.opacity = 0.1), (l.opacity = 1)),
                    i.fancybox.setTranslate(
                      t.$content.removeClass("fancybox-is-hidden"),
                      h
                    ),
                    u(t.$content),
                    void i.fancybox.animate(t.$content, l, n, function () {
                      (o.isAnimating = !1), o.complete();
                    })
                  );
                if ((o.updateSlide(t), !e))
                  return (
                    u(r),
                    d ||
                      t.$content
                        .removeClass("fancybox-is-hidden")
                        .hide()
                        .fadeIn("fast"),
                    void (t.pos === o.currPos && o.complete())
                  );
                i.fancybox.stop(r),
                  (s =
                    "fancybox-animated fancybox-slide--" +
                    (t.pos >= o.prevPos ? "next" : "previous") +
                    " fancybox-fx-" +
                    e),
                  r
                    .removeAttr("style")
                    .removeClass(
                      "fancybox-slide--current fancybox-slide--next fancybox-slide--previous"
                    )
                    .addClass(s),
                  t.$content.removeClass("fancybox-is-hidden"),
                  u(r),
                  i.fancybox.animate(
                    r,
                    "fancybox-slide--current",
                    n,
                    function () {
                      r.removeClass(s).removeAttr("style"),
                        t.pos === o.currPos && o.complete();
                    },
                    !0
                  );
              }
            },
            getThumbPos: function (s) {
              var n,
                a = !1,
                o = s.opts.$thumb,
                r = o && o.length && o[0].ownerDocument === e ? o.offset() : 0;
              return (
                r &&
                  (function (e) {
                    for (
                      var s = o[0], n = s.getBoundingClientRect(), a = [];
                      null !== s.parentElement;

                    )
                      ("hidden" !== i(s.parentElement).css("overflow") &&
                        "auto" !== i(s.parentElement).css("overflow")) ||
                        a.push(s.parentElement.getBoundingClientRect()),
                        (s = s.parentElement);
                    return (
                      a.every(function (t) {
                        var e =
                            Math.min(n.right, t.right) - Math.max(n.left, t.left),
                          i =
                            Math.min(n.bottom, t.bottom) - Math.max(n.top, t.top);
                        return e > 0 && i > 0;
                      }) &&
                      n.bottom > 0 &&
                      n.right > 0 &&
                      n.left < i(t).width() &&
                      n.top < i(t).height()
                    );
                  })() &&
                  ((n = this.$refs.stage.offset()),
                  (a = {
                    top:
                      r.top - n.top + parseFloat(o.css("border-top-width") || 0),
                    left:
                      r.left -
                      n.left +
                      parseFloat(o.css("border-left-width") || 0),
                    width: o.width(),
                    height: o.height(),
                    scaleX: 1,
                    scaleY: 1,
                  })),
                a
              );
            },
            complete: function () {
              var t,
                e = this,
                s = e.current,
                n = {};
              !e.isMoved() &&
                s.isLoaded &&
                (s.isComplete ||
                  ((s.isComplete = !0),
                  s.$slide.siblings().trigger("onReset"),
                  e.preload("inline"),
                  u(s.$slide),
                  s.$slide.addClass("fancybox-slide--complete"),
                  i.each(e.slides, function (t, s) {
                    s.pos >= e.currPos - 1 && s.pos <= e.currPos + 1
                      ? (n[s.pos] = s)
                      : s && (i.fancybox.stop(s.$slide), s.$slide.off().remove());
                  }),
                  (e.slides = n)),
                (e.isAnimating = !1),
                e.updateCursor(),
                e.trigger("afterShow"),
                s.opts.video.autoStart &&
                  s.$slide
                    .find("video,audio")
                    .filter(":visible:first")
                    .trigger("play"),
                s.opts.autoFocus &&
                  "html" === s.contentType &&
                  ((t = s.$content.find("input[autofocus]:enabled:visible:first"))
                    .length
                    ? t.trigger("focus")
                    : e.focus(null, !0)),
                s.$slide.scrollTop(0).scrollLeft(0));
            },
            preload: function (t) {
              var e = this.slides[this.currPos + 1],
                i = this.slides[this.currPos - 1];
              i && i.type === t && this.loadSlide(i),
                e && e.type === t && this.loadSlide(e);
            },
            focus: function (t, s) {
              var n,
                a,
                o = [
                  "a[href]",
                  "area[href]",
                  'input:not([disabled]):not([type="hidden"]):not([aria-hidden])',
                  "select:not([disabled]):not([aria-hidden])",
                  "textarea:not([disabled]):not([aria-hidden])",
                  "button:not([disabled]):not([aria-hidden])",
                  "iframe",
                  "object",
                  "embed",
                  "[contenteditable]",
                  '[tabindex]:not([tabindex^="-"])',
                ].join(",");
              this.isClosing ||
                ((n = (n =
                  !t && this.current && this.current.isComplete
                    ? this.current.$slide.find(
                        "*:visible" + (s ? ":not(.fancybox-close-small)" : "")
                      )
                    : this.$refs.container.find("*:visible"))
                  .filter(o)
                  .filter(function () {
                    return (
                      "hidden" !== i(this).css("visibility") &&
                      !i(this).hasClass("disabled")
                    );
                  })).length
                  ? ((a = n.index(e.activeElement)),
                    t && t.shiftKey
                      ? (a < 0 || 0 == a) &&
                        (t.preventDefault(), n.eq(n.length - 1).trigger("focus"))
                      : (a < 0 || a == n.length - 1) &&
                        (t && t.preventDefault(), n.eq(0).trigger("focus")))
                  : this.$refs.container.trigger("focus"));
            },
            activate: function () {
              var t = this;
              i(".fancybox-container").each(function () {
                var e = i(this).data("FancyBox");
                e &&
                  e.id !== t.id &&
                  !e.isClosing &&
                  (e.trigger("onDeactivate"),
                  e.removeEvents(),
                  (e.isVisible = !1));
              }),
                (t.isVisible = !0),
                (t.current || t.isIdle) && (t.update(), t.updateControls()),
                t.trigger("onActivate"),
                t.addEvents();
            },
            close: function (t, e) {
              var s,
                n,
                a,
                o,
                r,
                l,
                h,
                f = this,
                p = f.current,
                m = function () {
                  f.cleanUp(t);
                };
              return !(
                f.isClosing ||
                ((f.isClosing = !0),
                !1 === f.trigger("beforeClose", t)
                  ? ((f.isClosing = !1),
                    c(function () {
                      f.update();
                    }),
                    1)
                  : (f.removeEvents(),
                    p.timouts && clearTimeout(p.timouts),
                    (a = p.$content),
                    (s = p.opts.animationEffect),
                    (n = i.isNumeric(e) ? e : s ? p.opts.animationDuration : 0),
                    p.$slide
                      .off(d)
                      .removeClass(
                        "fancybox-slide--complete fancybox-slide--next fancybox-slide--previous fancybox-animated"
                      ),
                    p.$slide.siblings().trigger("onReset").remove(),
                    n &&
                      f.$refs.container
                        .removeClass("fancybox-is-open")
                        .addClass("fancybox-is-closing"),
                    f.hideLoading(p),
                    f.hideControls(),
                    f.updateCursor(),
                    "zoom" !== s ||
                      (!0 !== t &&
                        a &&
                        n &&
                        "image" === p.type &&
                        !p.hasError &&
                        (h = f.getThumbPos(p))) ||
                      (s = "fade"),
                    "zoom" === s
                      ? (i.fancybox.stop(a),
                        (l = {
                          top: (o = i.fancybox.getTranslate(a)).top,
                          left: o.left,
                          scaleX: o.width / h.width,
                          scaleY: o.height / h.height,
                          width: h.width,
                          height: h.height,
                        }),
                        "auto" == (r = p.opts.zoomOpacity) &&
                          (r =
                            Math.abs(p.width / p.height - h.width / h.height) >
                            0.1),
                        r && (h.opacity = 0),
                        i.fancybox.setTranslate(a, l),
                        u(a),
                        i.fancybox.animate(a, h, n, m),
                        0)
                      : (s && n
                          ? !0 === t
                            ? setTimeout(m, n)
                            : i.fancybox.animate(
                                p.$slide.removeClass("fancybox-slide--current"),
                                "fancybox-animated fancybox-slide--previous fancybox-fx-" +
                                  s,
                                n,
                                m
                              )
                          : m(),
                        0)))
              );
            },
            cleanUp: function (e) {
              var s,
                n,
                a,
                o = this.current.opts.$orig;
              this.current.$slide.trigger("onReset"),
                this.$refs.container.empty().remove(),
                this.trigger("afterClose", e),
                this.current.opts.backFocus &&
                  ((o && o.length && o.is(":visible")) || (o = this.$trigger),
                  o &&
                    o.length &&
                    ((n = t.scrollX),
                    (a = t.scrollY),
                    o.trigger("focus"),
                    i("html, body").scrollTop(a).scrollLeft(n))),
                (this.current = null),
                (s = i.fancybox.getInstance())
                  ? s.activate()
                  : (i("body").removeClass(
                      "fancybox-active compensate-for-scrollbar"
                    ),
                    i("#fancybox-style-noscroll").remove());
            },
            trigger: function (t, e) {
              var s,
                n = Array.prototype.slice.call(arguments, 1),
                a = e && e.opts ? e : this.current;
              if (
                (a ? n.unshift(a) : (a = this),
                n.unshift(this),
                i.isFunction(a.opts[t]) && (s = a.opts[t].apply(a, n)),
                !1 === s)
              )
                return s;
              "afterClose" !== t && this.$refs
                ? this.$refs.container.trigger(t + ".fb", n)
                : l.trigger(t + ".fb", n);
            },
            updateControls: function () {
              var t = this.current,
                s = t.index,
                n = t.opts.caption,
                a = this.$refs.container,
                o = this.$refs.caption;
              t.$slide.trigger("refresh"),
                (this.$caption = n && n.length ? o.html(n) : null),
                this.isHiddenControls || this.isIdle || this.showControls(),
                a.find("[data-fancybox-count]").html(this.group.length),
                a.find("[data-fancybox-index]").html(s + 1),
                a
                  .find("[data-fancybox-prev]")
                  .prop("disabled", !t.opts.loop && s <= 0),
                a
                  .find("[data-fancybox-next]")
                  .prop("disabled", !t.opts.loop && s >= this.group.length - 1),
                "image" === t.type
                  ? a
                      .find("[data-fancybox-zoom]")
                      .show()
                      .end()
                      .find("[data-fancybox-download]")
                      .attr("href", t.opts.image.src || t.src)
                      .show()
                  : t.opts.toolbar &&
                    a
                      .find("[data-fancybox-download],[data-fancybox-zoom]")
                      .hide(),
                i(e.activeElement).is(":hidden,[disabled]") &&
                  this.$refs.container.trigger("focus");
            },
            hideControls: function () {
              (this.isHiddenControls = !0),
                this.$refs.container.removeClass(
                  "fancybox-show-infobar fancybox-show-toolbar fancybox-show-caption fancybox-show-nav"
                );
            },
            showControls: function () {
              var t = this.current ? this.current.opts : this.opts,
                e = this.$refs.container;
              (this.isHiddenControls = !1),
                (this.idleSecondsCounter = 0),
                e
                  .toggleClass(
                    "fancybox-show-toolbar",
                    !(!t.toolbar || !t.buttons)
                  )
                  .toggleClass(
                    "fancybox-show-infobar",
                    !!(t.infobar && this.group.length > 1)
                  )
                  .toggleClass("fancybox-show-caption", !!this.$caption)
                  .toggleClass(
                    "fancybox-show-nav",
                    !!(t.arrows && this.group.length > 1)
                  )
                  .toggleClass("fancybox-is-modal", !!t.modal);
            },
            toggleControls: function () {
              this.isHiddenControls ? this.showControls() : this.hideControls();
            },
          }),
            (i.fancybox = {
              version: "3.4.1",
              defaults: o,
              getInstance: function (t) {
                var e = i(
                    '.fancybox-container:not(".fancybox-is-closing"):last'
                  ).data("FancyBox"),
                  s = Array.prototype.slice.call(arguments, 1);
                return (
                  e instanceof p &&
                  ("string" === i.type(t)
                    ? e[t].apply(e, s)
                    : "function" === i.type(t) && t.apply(e, s),
                  e)
                );
              },
              open: function (t, e, i) {
                return new p(t, e, i);
              },
              close: function (t) {
                var e = this.getInstance();
                e && (e.close(), !0 === t && this.close(t));
              },
              destroy: function () {
                this.close(!0), l.add("body").off("click.fb-start", "**");
              },
              isMobile:
                /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
                  navigator.userAgent
                ),
              use3d:
                ((n = e.createElement("div")),
                t.getComputedStyle &&
                  t.getComputedStyle(n) &&
                  t.getComputedStyle(n).getPropertyValue("transform") &&
                  !(e.documentMode && e.documentMode < 11)),
              getTranslate: function (t) {
                var e;
                return (
                  !(!t || !t.length) && {
                    top: (e = t[0].getBoundingClientRect()).top || 0,
                    left: e.left || 0,
                    width: e.width,
                    height: e.height,
                    opacity: parseFloat(t.css("opacity")),
                  }
                );
              },
              setTranslate: function (t, e) {
                var i = "",
                  s = {};
                if (t && e)
                  return (
                    (void 0 === e.left && void 0 === e.top) ||
                      ((i =
                        (void 0 === e.left ? t.position().left : e.left) +
                        "px, " +
                        (void 0 === e.top ? t.position().top : e.top) +
                        "px"),
                      (i = this.use3d
                        ? "translate3d(" + i + ", 0px)"
                        : "translate(" + i + ")")),
                    void 0 !== e.scaleX &&
                      void 0 !== e.scaleY &&
                      (i =
                        (i.length ? i + " " : "") +
                        "scale(" +
                        e.scaleX +
                        ", " +
                        e.scaleY +
                        ")"),
                    i.length && (s.transform = i),
                    void 0 !== e.opacity && (s.opacity = e.opacity),
                    void 0 !== e.width && (s.width = e.width),
                    void 0 !== e.height && (s.height = e.height),
                    t.css(s)
                  );
              },
              animate: function (t, e, s, n, a) {
                var o,
                  r = !1;
                i.isFunction(s) && ((n = s), (s = null)),
                  i.isPlainObject(e) || t.removeAttr("style"),
                  i.fancybox.stop(t),
                  t.on(d, function (o) {
                    (!o ||
                      !o.originalEvent ||
                      (t.is(o.originalEvent.target) &&
                        "z-index" != o.originalEvent.propertyName)) &&
                      (i.fancybox.stop(t),
                      r && i.fancybox.setTranslate(t, r),
                      i.isNumeric(s) && t.css("transition-duration", ""),
                      i.isPlainObject(e)
                        ? !1 === a && t.removeAttr("style")
                        : !0 !== a && t.removeClass(e),
                      i.isFunction(n) && n(o));
                  }),
                  i.isNumeric(s) && t.css("transition-duration", s + "ms"),
                  i.isPlainObject(e)
                    ? (void 0 !== e.scaleX &&
                        void 0 !== e.scaleY &&
                        ((o = i.fancybox.getTranslate(t)),
                        (r = i.extend({}, e, {
                          width: o.width * e.scaleX,
                          height: o.height * e.scaleY,
                          scaleX: 1,
                          scaleY: 1,
                        })),
                        delete e.width,
                        delete e.height,
                        t.parent().hasClass("fancybox-slide--image") &&
                          t.parent().addClass("fancybox-is-scaling")),
                      i.fancybox.setTranslate(t, e))
                    : t.addClass(e),
                  t.data(
                    "timer",
                    setTimeout(function () {
                      t.trigger("transitionend");
                    }, s + 16)
                  );
              },
              stop: function (t, e) {
                t &&
                  t.length &&
                  (clearTimeout(t.data("timer")),
                  e && t.trigger(d),
                  t.off(d).css("transition-duration", ""),
                  t.parent().removeClass("fancybox-is-scaling"));
              },
            }),
            (i.fn.fancybox = function (t) {
              var e;
              return (
                (e = (t = t || {}).selector || !1)
                  ? i("body")
                      .off("click.fb-start", e)
                      .on("click.fb-start", e, { options: t }, m)
                  : this.off("click.fb-start").on(
                      "click.fb-start",
                      { items: this, options: t },
                      m
                    ),
                this
              );
            }),
            l.on("click.fb-start", "[data-fancybox]", m),
            l.on("click.fb-start", "[data-fancybox-trigger]", function (t) {
              i('[data-fancybox="' + i(this).attr("data-fancybox-trigger") + '"]')
                .eq(i(this).attr("data-fancybox-index") || 0)
                .trigger("click.fb-start", { $trigger: i(this) });
            }),
            (a = null),
            l.on(
              "mousedown mouseup focus blur",
              ".fancybox-button",
              function (t) {
                switch (t.type) {
                  case "mousedown":
                    a = i(this);
                    break;
                  case "mouseup":
                    a = null;
                    break;
                  case "focusin":
                    i(".fancybox-button").removeClass("fancybox-focus"),
                      i(this).is(a) ||
                        i(this).is("[disabled]") ||
                        i(this).addClass("fancybox-focus");
                    break;
                  case "focusout":
                    i(".fancybox-button").removeClass("fancybox-focus");
                }
              }
            );
        }
      function m(t, e) {
        var s,
          n,
          a,
          o = [],
          r = 0;
        (t && t.isDefaultPrevented()) ||
          (t.preventDefault(),
          (e = e || {}),
          t && t.data && (e = f(t.data.options, e)),
          (s = e.$target || i(t.currentTarget).trigger("blur")),
          ((a = i.fancybox.getInstance()) && a.$trigger && a.$trigger.is(s)) ||
            ((o = e.selector
              ? i(e.selector)
              : (n = s.attr("data-fancybox") || "")
              ? (o = t.data ? t.data.items : []).length
                ? o.filter('[data-fancybox="' + n + '"]')
                : i('[data-fancybox="' + n + '"]')
              : [s]),
            (r = i(o).index(s)) < 0 && (r = 0),
            ((a = i.fancybox.open(o, e, r)).$trigger = s)));
      }
    })(window, document, jQuery),
    (function (t) {
      "use strict";
      var e = function (e, i, s) {
          if (e)
            return (
              (s = s || ""),
              "object" === t.type(s) && (s = t.param(s, !0)),
              t.each(i, function (t, i) {
                e = e.replace("$" + t, i || "");
              }),
              s.length && (e += (e.indexOf("?") > 0 ? "&" : "?") + s),
              e
            );
        },
        i = {
          youtube: {
            matcher:
              /(youtube\.com|youtu\.be|youtube\-nocookie\.com)\/(watch\?(.*&)?v=|v\/|u\/|embed\/?)?(videoseries\?list=(.*)|[\w-]{11}|\?listType=(.*)&list=(.*))(.*)/i,
            params: {
              autoplay: 1,
              autohide: 1,
              fs: 1,
              rel: 0,
              hd: 1,
              wmode: "transparent",
              enablejsapi: 1,
              html5: 1,
            },
            paramPlace: 8,
            type: "iframe",
            url: "//www.youtube-nocookie.com/embed/$4",
            thumb: "//img.youtube.com/vi/$4/hqdefault.jpg",
          },
          vimeo: {
            matcher: /^.+vimeo.com\/(.*\/)?([\d]+)(.*)?/,
            params: {
              autoplay: 1,
              hd: 1,
              show_title: 1,
              show_byline: 1,
              show_portrait: 0,
              fullscreen: 1,
              api: 1,
            },
            paramPlace: 3,
            type: "iframe",
            url: "//player.vimeo.com/video/$2",
          },
          instagram: {
            matcher: /(instagr\.am|instagram\.com)\/p\/([a-zA-Z0-9_\-]+)\/?/i,
            type: "image",
            url: "//$1/p/$2/media/?size=l",
          },
          gmap_place: {
            matcher:
              /(maps\.)?google\.([a-z]{2,3}(\.[a-z]{2})?)\/(((maps\/(place\/(.*)\/)?\@(.*),(\d+.?\d+?)z))|(\?ll=))(.*)?/i,
            type: "iframe",
            url: function (t) {
              return (
                "//maps.google." +
                t[2] +
                "/?ll=" +
                (t[9]
                  ? t[9] +
                    "&z=" +
                    Math.floor(t[10]) +
                    (t[12] ? t[12].replace(/^\//, "&") : "")
                  : t[12] + ""
                ).replace(/\?/, "&") +
                "&output=" +
                (t[12] && t[12].indexOf("layer=c") > 0 ? "svembed" : "embed")
              );
            },
          },
          gmap_search: {
            matcher:
              /(maps\.)?google\.([a-z]{2,3}(\.[a-z]{2})?)\/(maps\/search\/)(.*)/i,
            type: "iframe",
            url: function (t) {
              return (
                "//maps.google." +
                t[2] +
                "/maps?q=" +
                t[5].replace("query=", "q=").replace("api=1", "") +
                "&output=embed"
              );
            },
          },
        };
      t(document).on("objectNeedsType.fb", function (s, n, a) {
        var o,
          r,
          l,
          h,
          c,
          d,
          u,
          f = a.src || "",
          p = !1;
        (o = t.extend(!0, {}, i, a.opts.media)),
          t.each(o, function (i, s) {
            if ((l = f.match(s.matcher))) {
              if (
                ((p = s.type), (u = i), (d = {}), s.paramPlace && l[s.paramPlace])
              ) {
                "?" == (c = l[s.paramPlace])[0] && (c = c.substring(1)),
                  (c = c.split("&"));
                for (var n = 0; n < c.length; ++n) {
                  var o = c[n].split("=", 2);
                  2 == o.length &&
                    (d[o[0]] = decodeURIComponent(o[1].replace(/\+/g, " ")));
                }
              }
              return (
                (h = t.extend(!0, {}, s.params, a.opts[i], d)),
                (f =
                  "function" === t.type(s.url)
                    ? s.url.call(this, l, h, a)
                    : e(s.url, l, h)),
                (r =
                  "function" === t.type(s.thumb)
                    ? s.thumb.call(this, l, h, a)
                    : e(s.thumb, l)),
                "youtube" === i
                  ? (f = f.replace(/&t=((\d+)m)?(\d+)s/, function (t, e, i, s) {
                      return (
                        "&start=" +
                        ((i ? 60 * parseInt(i, 10) : 0) + parseInt(s, 10))
                      );
                    }))
                  : "vimeo" === i && (f = f.replace("&%23", "#")),
                !1
              );
            }
          }),
          p
            ? (a.opts.thumb ||
                (a.opts.$thumb && a.opts.$thumb.length) ||
                (a.opts.thumb = r),
              "iframe" === p &&
                (a.opts = t.extend(!0, a.opts, {
                  iframe: { preload: !1, attr: { scrolling: "no" } },
                })),
              t.extend(a, {
                type: p,
                src: f,
                origSrc: a.src,
                contentSource: u,
                contentType:
                  "image" === p
                    ? "image"
                    : "gmap_place" == u || "gmap_search" == u
                    ? "map"
                    : "video",
              }))
            : f && (a.type = a.opts.defaultType);
      });
    })(jQuery),
    (function (t, e, i) {
      "use strict";
      var s =
          t.requestAnimationFrame ||
          t.webkitRequestAnimationFrame ||
          t.mozRequestAnimationFrame ||
          t.oRequestAnimationFrame ||
          function (e) {
            return t.setTimeout(e, 1e3 / 60);
          },
        n =
          t.cancelAnimationFrame ||
          t.webkitCancelAnimationFrame ||
          t.mozCancelAnimationFrame ||
          t.oCancelAnimationFrame ||
          function (e) {
            t.clearTimeout(e);
          },
        a = function (e) {
          var i = [];
          for (var s in (e =
            (e = e.originalEvent || e || t.e).touches && e.touches.length
              ? e.touches
              : e.changedTouches && e.changedTouches.length
              ? e.changedTouches
              : [e]))
            e[s].pageX
              ? i.push({ x: e[s].pageX, y: e[s].pageY })
              : e[s].clientX && i.push({ x: e[s].clientX, y: e[s].clientY });
          return i;
        },
        o = function (t, e, i) {
          return e && t
            ? "x" === i
              ? t.x - e.x
              : "y" === i
              ? t.y - e.y
              : Math.sqrt(Math.pow(t.x - e.x, 2) + Math.pow(t.y - e.y, 2))
            : 0;
        },
        r = function (t) {
          if (
            t.is(
              'a,area,button,[role="button"],input,label,select,summary,textarea,video,audio'
            ) ||
            i.isFunction(t.get(0).onclick) ||
            t.data("selectable")
          )
            return !0;
          for (var e = 0, s = t[0].attributes, n = s.length; e < n; e++)
            if ("data-fancybox-" === s[e].nodeName.substr(0, 14)) return !0;
          return !1;
        },
        l = function (e) {
          for (
            var i, s, n, a, o, r = !1;
            (i = e.get(0)),
              void 0,
              void 0,
              void 0,
              void 0,
              (s = t.getComputedStyle(i)["overflow-y"]),
              (n = t.getComputedStyle(i)["overflow-x"]),
              (a =
                ("scroll" === s || "auto" === s) &&
                i.scrollHeight > i.clientHeight),
              (o =
                ("scroll" === n || "auto" === n) &&
                i.scrollWidth > i.clientWidth),
              !(r = a || o) &&
                (e = e.parent()).length &&
                !e.hasClass("fancybox-stage") &&
                !e.is("body");

          );
          return r;
        },
        h = function (t) {
          (this.instance = t),
            (this.$bg = t.$refs.bg),
            (this.$stage = t.$refs.stage),
            (this.$container = t.$refs.container),
            this.destroy(),
            this.$container.on(
              "touchstart.fb.touch mousedown.fb.touch",
              i.proxy(this, "ontouchstart")
            );
        };
      (h.prototype.destroy = function () {
        this.$container.off(".fb.touch");
      }),
        (h.prototype.ontouchstart = function (s) {
          var n = i(s.target),
            h = this.instance,
            c = h.current,
            d = c.$slide,
            u = c.$content,
            f = "touchstart" == s.type;
          if (
            (f && this.$container.off("mousedown.fb.touch"),
            (!s.originalEvent || 2 != s.originalEvent.button) &&
              d.length &&
              n.length &&
              !r(n) &&
              !r(n.parent()) &&
              (n.is("img") ||
                !(s.originalEvent.clientX > n[0].clientWidth + n.offset().left)))
          ) {
            if (!c || h.isAnimating || h.isClosing)
              return s.stopPropagation(), void s.preventDefault();
            (this.realPoints = this.startPoints = a(s)),
              this.startPoints.length &&
                (c.touch && s.stopPropagation(),
                (this.startEvent = s),
                (this.canTap = !0),
                (this.$target = n),
                (this.$content = u),
                (this.opts = c.opts.touch),
                (this.isPanning = !1),
                (this.isSwiping = !1),
                (this.isZooming = !1),
                (this.isScrolling = !1),
                (this.canPan = h.canPan()),
                (this.startTime = new Date().getTime()),
                (this.distanceX = this.distanceY = this.distance = 0),
                (this.canvasWidth = Math.round(d[0].clientWidth)),
                (this.canvasHeight = Math.round(d[0].clientHeight)),
                (this.contentLastPos = null),
                (this.contentStartPos = i.fancybox.getTranslate(
                  this.$content
                ) || { top: 0, left: 0 }),
                (this.sliderStartPos =
                  this.sliderLastPos || i.fancybox.getTranslate(d)),
                (this.stagePos = i.fancybox.getTranslate(h.$refs.stage)),
                (this.sliderStartPos.top -= this.stagePos.top),
                (this.sliderStartPos.left -= this.stagePos.left),
                (this.contentStartPos.top -= this.stagePos.top),
                (this.contentStartPos.left -= this.stagePos.left),
                i(e)
                  .off(".fb.touch")
                  .on(
                    f
                      ? "touchend.fb.touch touchcancel.fb.touch"
                      : "mouseup.fb.touch mouseleave.fb.touch",
                    i.proxy(this, "ontouchend")
                  )
                  .on(
                    f ? "touchmove.fb.touch" : "mousemove.fb.touch",
                    i.proxy(this, "ontouchmove")
                  ),
                i.fancybox.isMobile &&
                  e.addEventListener("scroll", this.onscroll, !0),
                (this.opts || this.canPan) &&
                (n.is(this.$stage) || this.$stage.find(n).length)
                  ? ((this.isScrollable = l(n) || l(n.parent())),
                    (i.fancybox.isMobile && this.isScrollable) ||
                      s.preventDefault(),
                    (1 === this.startPoints.length || c.hasError) &&
                      (this.canPan
                        ? (i.fancybox.stop(this.$content),
                          this.$content.css("transition-duration", ""),
                          (this.isPanning = !0))
                        : (this.isSwiping = !0),
                      this.$container.addClass("fancybox-is-grabbing")),
                    2 === this.startPoints.length &&
                      "image" === c.type &&
                      (c.isLoaded || c.$ghost) &&
                      ((this.canTap = !1),
                      (this.isSwiping = !1),
                      (this.isPanning = !1),
                      (this.isZooming = !0),
                      i.fancybox.stop(this.$content),
                      this.$content.css("transition-duration", ""),
                      (this.centerPointStartX =
                        0.5 * (this.startPoints[0].x + this.startPoints[1].x) -
                        i(t).scrollLeft()),
                      (this.centerPointStartY =
                        0.5 * (this.startPoints[0].y + this.startPoints[1].y) -
                        i(t).scrollTop()),
                      (this.percentageOfImageAtPinchPointX =
                        (this.centerPointStartX - this.contentStartPos.left) /
                        this.contentStartPos.width),
                      (this.percentageOfImageAtPinchPointY =
                        (this.centerPointStartY - this.contentStartPos.top) /
                        this.contentStartPos.height),
                      (this.startDistanceBetweenFingers = o(
                        this.startPoints[0],
                        this.startPoints[1]
                      ))))
                  : n.is(".fancybox-image") && s.preventDefault());
          }
        }),
        (h.prototype.onscroll = function (t) {
          (this.isScrolling = !0),
            e.removeEventListener("scroll", this.onscroll, !0);
        }),
        (h.prototype.ontouchmove = function (t) {
          void 0 === t.originalEvent.buttons || 0 !== t.originalEvent.buttons
            ? this.isScrolling
              ? (this.canTap = !1)
              : ((this.newPoints = a(t)),
                (this.opts || this.canPan) &&
                  this.newPoints.length &&
                  this.newPoints.length &&
                  ((this.isSwiping && !0 === this.isSwiping) ||
                    t.preventDefault(),
                  (this.distanceX = o(
                    this.newPoints[0],
                    this.startPoints[0],
                    "x"
                  )),
                  (this.distanceY = o(
                    this.newPoints[0],
                    this.startPoints[0],
                    "y"
                  )),
                  (this.distance = o(this.newPoints[0], this.startPoints[0])),
                  this.distance > 0 &&
                    (this.isSwiping
                      ? this.onSwipe(t)
                      : this.isPanning
                      ? this.onPan()
                      : this.isZooming && this.onZoom())))
            : this.ontouchend(t);
        }),
        (h.prototype.onSwipe = function (e) {
          var a,
            o = this,
            r = o.isSwiping,
            l = o.sliderStartPos.left || 0;
          if (!0 !== r)
            "x" == r &&
              (o.distanceX > 0 &&
              (o.instance.group.length < 2 ||
                (0 === o.instance.current.index && !o.instance.current.opts.loop))
                ? (l += Math.pow(o.distanceX, 0.8))
                : o.distanceX < 0 &&
                  (o.instance.group.length < 2 ||
                    (o.instance.current.index === o.instance.group.length - 1 &&
                      !o.instance.current.opts.loop))
                ? (l -= Math.pow(-o.distanceX, 0.8))
                : (l += o.distanceX)),
              (o.sliderLastPos = {
                top: "x" == r ? 0 : o.sliderStartPos.top + o.distanceY,
                left: l,
              }),
              o.requestId && (n(o.requestId), (o.requestId = null)),
              (o.requestId = s(function () {
                o.sliderLastPos &&
                  (i.each(o.instance.slides, function (t, e) {
                    var s = e.pos - o.instance.currPos;
                    i.fancybox.setTranslate(e.$slide, {
                      top: o.sliderLastPos.top,
                      left:
                        o.sliderLastPos.left +
                        s * o.canvasWidth +
                        s * e.opts.gutter,
                    });
                  }),
                  o.$container.addClass("fancybox-is-sliding"));
              }));
          else if (Math.abs(o.distance) > 10) {
            if (
              ((o.canTap = !1),
              o.instance.group.length < 2 && o.opts.vertical
                ? (o.isSwiping = "y")
                : o.instance.isDragging ||
                  !1 === o.opts.vertical ||
                  ("auto" === o.opts.vertical && i(t).width() > 800)
                ? (o.isSwiping = "x")
                : ((a = Math.abs(
                    (180 * Math.atan2(o.distanceY, o.distanceX)) / Math.PI
                  )),
                  (o.isSwiping = a > 45 && a < 135 ? "y" : "x")),
              (o.canTap = !1),
              "y" === o.isSwiping && i.fancybox.isMobile && o.isScrollable)
            )
              return void (o.isScrolling = !0);
            (o.instance.isDragging = o.isSwiping),
              (o.startPoints = o.newPoints),
              i.each(o.instance.slides, function (t, e) {
                i.fancybox.stop(e.$slide),
                  e.$slide.css("transition-duration", ""),
                  (e.inTransition = !1),
                  e.pos === o.instance.current.pos &&
                    (o.sliderStartPos.left =
                      i.fancybox.getTranslate(e.$slide).left -
                      i.fancybox.getTranslate(o.instance.$refs.stage).left);
              }),
              o.instance.SlideShow &&
                o.instance.SlideShow.isActive &&
                o.instance.SlideShow.stop();
          }
        }),
        (h.prototype.onPan = function () {
          var t = this;
          o(t.newPoints[0], t.realPoints[0]) < (i.fancybox.isMobile ? 10 : 5)
            ? (t.startPoints = t.newPoints)
            : ((t.canTap = !1),
              (t.contentLastPos = t.limitMovement()),
              t.requestId && (n(t.requestId), (t.requestId = null)),
              (t.requestId = s(function () {
                i.fancybox.setTranslate(t.$content, t.contentLastPos);
              })));
        }),
        (h.prototype.limitMovement = function () {
          var t,
            e,
            i,
            s,
            n,
            a,
            o = this.canvasWidth,
            r = this.canvasHeight,
            l = this.distanceX,
            h = this.distanceY,
            c = this.contentStartPos,
            d = c.left,
            u = c.top,
            f = c.width,
            p = c.height;
          return (
            (n = f > o ? d + l : d),
            (a = u + h),
            (t = Math.max(0, 0.5 * o - 0.5 * f)),
            (e = Math.max(0, 0.5 * r - 0.5 * p)),
            (i = Math.min(o - f, 0.5 * o - 0.5 * f)),
            (s = Math.min(r - p, 0.5 * r - 0.5 * p)),
            l > 0 && n > t && (n = t - 1 + Math.pow(-t + d + l, 0.8) || 0),
            l < 0 && n < i && (n = i + 1 - Math.pow(i - d - l, 0.8) || 0),
            h > 0 && a > e && (a = e - 1 + Math.pow(-e + u + h, 0.8) || 0),
            h < 0 && a < s && (a = s + 1 - Math.pow(s - u - h, 0.8) || 0),
            { top: a, left: n }
          );
        }),
        (h.prototype.limitPosition = function (t, e, i, s) {
          var n = this.canvasWidth,
            a = this.canvasHeight;
          return (
            (t =
              i > n
                ? (t = t > 0 ? 0 : t) < n - i
                  ? n - i
                  : t
                : Math.max(0, n / 2 - i / 2)),
            {
              top: (e =
                s > a
                  ? (e = e > 0 ? 0 : e) < a - s
                    ? a - s
                    : e
                  : Math.max(0, a / 2 - s / 2)),
              left: t,
            }
          );
        }),
        (h.prototype.onZoom = function () {
          var e = this,
            a = e.contentStartPos,
            r = a.width,
            l = a.height,
            h = a.left,
            c = a.top,
            d = o(e.newPoints[0], e.newPoints[1]) / e.startDistanceBetweenFingers,
            u = Math.floor(r * d),
            f = Math.floor(l * d),
            p = (r - u) * e.percentageOfImageAtPinchPointX,
            m = (l - f) * e.percentageOfImageAtPinchPointY,
            g = (e.newPoints[0].x + e.newPoints[1].x) / 2 - i(t).scrollLeft(),
            y = (e.newPoints[0].y + e.newPoints[1].y) / 2 - i(t).scrollTop(),
            v = g - e.centerPointStartX,
            b = {
              top: c + (m + (y - e.centerPointStartY)),
              left: h + (p + v),
              scaleX: d,
              scaleY: d,
            };
          (e.canTap = !1),
            (e.newWidth = u),
            (e.newHeight = f),
            (e.contentLastPos = b),
            e.requestId && (n(e.requestId), (e.requestId = null)),
            (e.requestId = s(function () {
              i.fancybox.setTranslate(e.$content, e.contentLastPos);
            }));
        }),
        (h.prototype.ontouchend = function (t) {
          var s = Math.max(new Date().getTime() - this.startTime, 1),
            o = this.isSwiping,
            r = this.isPanning,
            l = this.isZooming,
            h = this.isScrolling;
          if (
            ((this.endPoints = a(t)),
            this.$container.removeClass("fancybox-is-grabbing"),
            i(e).off(".fb.touch"),
            e.removeEventListener("scroll", this.onscroll, !0),
            this.requestId && (n(this.requestId), (this.requestId = null)),
            (this.isSwiping = !1),
            (this.isPanning = !1),
            (this.isZooming = !1),
            (this.isScrolling = !1),
            (this.instance.isDragging = !1),
            this.canTap)
          )
            return this.onTap(t);
          (this.speed = 366),
            (this.velocityX = (this.distanceX / s) * 0.5),
            (this.velocityY = (this.distanceY / s) * 0.5),
            (this.speedX = Math.max(
              0.5 * this.speed,
              Math.min(
                1.5 * this.speed,
                (1 / Math.abs(this.velocityX)) * this.speed
              )
            )),
            r ? this.endPanning() : l ? this.endZooming() : this.endSwiping(o, h);
        }),
        (h.prototype.endSwiping = function (t, e) {
          var s = !1,
            n = this.instance.group.length;
          (this.sliderLastPos = null),
            "y" == t && !e && Math.abs(this.distanceY) > 50
              ? (i.fancybox.animate(
                  this.instance.current.$slide,
                  {
                    top:
                      this.sliderStartPos.top +
                      this.distanceY +
                      150 * this.velocityY,
                    opacity: 0,
                  },
                  200
                ),
                (s = this.instance.close(!0, 200)))
              : "x" == t && this.distanceX > 50 && n > 1
              ? (s = this.instance.previous(this.speedX))
              : "x" == t &&
                this.distanceX < -50 &&
                n > 1 &&
                (s = this.instance.next(this.speedX)),
            !1 !== s ||
              ("x" != t && "y" != t) ||
              (e || n < 2
                ? this.instance.centerSlide(this.instance.current, 150)
                : this.instance.jumpTo(this.instance.current.index)),
            this.$container.removeClass("fancybox-is-sliding");
        }),
        (h.prototype.endPanning = function () {
          var t, e, s;
          this.contentLastPos &&
            (!1 === this.opts.momentum
              ? ((t = this.contentLastPos.left), (e = this.contentLastPos.top))
              : ((t = this.contentLastPos.left + this.velocityX * this.speed),
                (e = this.contentLastPos.top + this.velocityY * this.speed)),
            ((s = this.limitPosition(
              t,
              e,
              this.contentStartPos.width,
              this.contentStartPos.height
            )).width = this.contentStartPos.width),
            (s.height = this.contentStartPos.height),
            i.fancybox.animate(this.$content, s, 330));
        }),
        (h.prototype.endZooming = function () {
          var t,
            e,
            s,
            n,
            a = this.instance.current,
            o = this.newWidth,
            r = this.newHeight;
          this.contentLastPos &&
            ((t = this.contentLastPos.left),
            (n = {
              top: (e = this.contentLastPos.top),
              left: t,
              width: o,
              height: r,
              scaleX: 1,
              scaleY: 1,
            }),
            i.fancybox.setTranslate(this.$content, n),
            o < this.canvasWidth && r < this.canvasHeight
              ? this.instance.scaleToFit(150)
              : o > a.width || r > a.height
              ? this.instance.scaleToActual(
                  this.centerPointStartX,
                  this.centerPointStartY,
                  150
                )
              : ((s = this.limitPosition(t, e, o, r)),
                i.fancybox.setTranslate(
                  this.$content,
                  i.fancybox.getTranslate(this.$content)
                ),
                i.fancybox.animate(this.$content, s, 150)));
        }),
        (h.prototype.onTap = function (e) {
          var s,
            n = this,
            o = i(e.target),
            r = n.instance,
            l = r.current,
            h = (e && a(e)) || n.startPoints,
            c = h[0] ? h[0].x - i(t).scrollLeft() - n.stagePos.left : 0,
            d = h[0] ? h[0].y - i(t).scrollTop() - n.stagePos.top : 0,
            u = function (t) {
              var s = l.opts[t];
              if ((i.isFunction(s) && (s = s.apply(r, [l, e])), s))
                switch (s) {
                  case "close":
                    r.close(n.startEvent);
                    break;
                  case "toggleControls":
                    r.toggleControls(!0);
                    break;
                  case "next":
                    r.next();
                    break;
                  case "nextOrClose":
                    r.group.length > 1 ? r.next() : r.close(n.startEvent);
                    break;
                  case "zoom":
                    "image" == l.type &&
                      (l.isLoaded || l.$ghost) &&
                      (r.canPan()
                        ? r.scaleToFit()
                        : r.isScaledDown()
                        ? r.scaleToActual(c, d)
                        : r.group.length < 2 && r.close(n.startEvent));
                }
            };
          if (
            (!e.originalEvent || 2 != e.originalEvent.button) &&
            (o.is("img") || !(c > o[0].clientWidth + o.offset().left))
          ) {
            if (
              o.is(
                ".fancybox-bg,.fancybox-inner,.fancybox-outer,.fancybox-container"
              )
            )
              s = "Outside";
            else if (o.is(".fancybox-slide")) s = "Slide";
            else {
              if (
                !r.current.$content ||
                !r.current.$content.find(o).addBack().filter(o).length
              )
                return;
              s = "Content";
            }
            if (n.tapped) {
              if (
                (clearTimeout(n.tapped),
                (n.tapped = null),
                Math.abs(c - n.tapX) > 50 || Math.abs(d - n.tapY) > 50)
              )
                return this;
              u("dblclick" + s);
            } else
              (n.tapX = c),
                (n.tapY = d),
                l.opts["dblclick" + s] &&
                l.opts["dblclick" + s] !== l.opts["click" + s]
                  ? (n.tapped = setTimeout(function () {
                      (n.tapped = null), u("click" + s);
                    }, 500))
                  : u("click" + s);
            return this;
          }
        }),
        i(e).on("onActivate.fb", function (t, e) {
          e && !e.Guestures && (e.Guestures = new h(e));
        });
    })(window, document, jQuery),
    (function (t, e) {
      "use strict";
      e.extend(!0, e.fancybox.defaults, {
        btnTpl: {
          slideShow:
            '<button data-fancybox-play class="fancybox-button fancybox-button--play" title="{{PLAY_START}}"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M6.5 5.4v13.2l11-6.6z"/></svg><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M8.33 5.75h2.2v12.5h-2.2V5.75zm5.15 0h2.2v12.5h-2.2V5.75z"/></svg></button>',
        },
        slideShow: { autoStart: !1, speed: 3e3 },
      });
      var i = function (t) {
        (this.instance = t), this.init();
      };
      e.extend(i.prototype, {
        timer: null,
        isActive: !1,
        $button: null,
        init: function () {
          var t = this;
          (t.$button = t.instance.$refs.toolbar
            .find("[data-fancybox-play]")
            .on("click", function () {
              t.toggle();
            })),
            (t.instance.group.length < 2 ||
              !t.instance.group[t.instance.currIndex].opts.slideShow) &&
              t.$button.hide();
        },
        set: function (t) {
          var e = this,
            i = e.instance,
            s = i.current,
            n = function () {
              e.isActive && i.jumpTo((i.currIndex + 1) % i.group.length);
            };
          s && (!0 === t || s.opts.loop || i.currIndex < i.group.length - 1)
            ? (e.timer = setTimeout(function () {
                var t;
                e.isActive &&
                  ((t = s.$slide.find("video,audio").filter(":visible:first"))
                    .length
                    ? t.one("ended", n)
                    : n());
              }, s.opts.slideShow.speed))
            : (e.stop(), (i.idleSecondsCounter = 0), i.showControls());
        },
        clear: function () {
          clearTimeout(this.timer), (this.timer = null);
        },
        start: function () {
          var t = this.instance.current;
          t &&
            (this.$button
              .attr("title", t.opts.i18n[t.opts.lang].PLAY_STOP)
              .removeClass("fancybox-button--play")
              .addClass("fancybox-button--pause"),
            (this.isActive = !0),
            t.isComplete && this.set(!0),
            this.instance.trigger("onSlideShowChange", !0));
        },
        stop: function () {
          var t = this.instance.current;
          this.clear(),
            this.$button
              .attr("title", t.opts.i18n[t.opts.lang].PLAY_START)
              .removeClass("fancybox-button--pause")
              .addClass("fancybox-button--play"),
            (this.isActive = !1),
            this.instance.trigger("onSlideShowChange", !1);
        },
        toggle: function () {
          this.isActive ? this.stop() : this.start();
        },
      }),
        e(t).on({
          "onInit.fb": function (t, e) {
            e && !e.SlideShow && (e.SlideShow = new i(e));
          },
          "beforeShow.fb": function (t, e, i, s) {
            var n = e && e.SlideShow;
            s
              ? n && i.opts.slideShow.autoStart && n.start()
              : n && n.isActive && n.clear();
          },
          "afterShow.fb": function (t, e, i) {
            var s = e && e.SlideShow;
            s && s.isActive && s.set();
          },
          "afterKeydown.fb": function (i, s, n, a, o) {
            var r = s && s.SlideShow;
            !r ||
              !n.opts.slideShow ||
              (80 !== o && 32 !== o) ||
              e(t.activeElement).is("button,a,input") ||
              (a.preventDefault(), r.toggle());
          },
          "beforeClose.fb onDeactivate.fb": function (t, e) {
            var i = e && e.SlideShow;
            i && i.stop();
          },
        }),
        e(t).on("visibilitychange", function () {
          var i = e.fancybox.getInstance(),
            s = i && i.SlideShow;
          s && s.isActive && (t.hidden ? s.clear() : s.set());
        });
    })(document, jQuery),
    (function (t, e) {
      "use strict";
      var i = (function () {
        for (
          var e = [
              [
                "requestFullscreen",
                "exitFullscreen",
                "fullscreenElement",
                "fullscreenEnabled",
                "fullscreenchange",
                "fullscreenerror",
              ],
              [
                "webkitRequestFullscreen",
                "webkitExitFullscreen",
                "webkitFullscreenElement",
                "webkitFullscreenEnabled",
                "webkitfullscreenchange",
                "webkitfullscreenerror",
              ],
              [
                "webkitRequestFullScreen",
                "webkitCancelFullScreen",
                "webkitCurrentFullScreenElement",
                "webkitCancelFullScreen",
                "webkitfullscreenchange",
                "webkitfullscreenerror",
              ],
              [
                "mozRequestFullScreen",
                "mozCancelFullScreen",
                "mozFullScreenElement",
                "mozFullScreenEnabled",
                "mozfullscreenchange",
                "mozfullscreenerror",
              ],
              [
                "msRequestFullscreen",
                "msExitFullscreen",
                "msFullscreenElement",
                "msFullscreenEnabled",
                "MSFullscreenChange",
                "MSFullscreenError",
              ],
            ],
            i = {},
            s = 0;
          s < e.length;
          s++
        ) {
          var n = e[s];
          if (n && n[1] in t) {
            for (var a = 0; a < n.length; a++) i[e[0][a]] = n[a];
            return i;
          }
        }
        return !1;
      })();
      if (i) {
        var s = {
          request: function (e) {
            (e = e || t.documentElement)[i.requestFullscreen](
              e.ALLOW_KEYBOARD_INPUT
            );
          },
          exit: function () {
            t[i.exitFullscreen]();
          },
          toggle: function (e) {
            (e = e || t.documentElement),
              this.isFullscreen() ? this.exit() : this.request(e);
          },
          isFullscreen: function () {
            return Boolean(t[i.fullscreenElement]);
          },
          enabled: function () {
            return Boolean(t[i.fullscreenEnabled]);
          },
        };
        e.extend(!0, e.fancybox.defaults, {
          btnTpl: {
            fullScreen:
              '<button data-fancybox-fullscreen class="fancybox-button fancybox-button--fsenter" title="{{FULL_SCREEN}}"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/></svg><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5 16h3v3h2v-5H5zm3-8H5v2h5V5H8zm6 11h2v-3h3v-2h-5zm2-11V5h-2v5h5V8z"/></svg></button>',
          },
          fullScreen: { autoStart: !1 },
        }),
          e(t).on(i.fullscreenchange, function () {
            var t = s.isFullscreen(),
              i = e.fancybox.getInstance();
            i &&
              (i.current &&
                "image" === i.current.type &&
                i.isAnimating &&
                (i.current.$content.css("transition", "none"),
                (i.isAnimating = !1),
                i.update(!0, !0, 0)),
              i.trigger("onFullscreenChange", t),
              i.$refs.container.toggleClass("fancybox-is-fullscreen", t),
              i.$refs.toolbar
                .find("[data-fancybox-fullscreen]")
                .toggleClass("fancybox-button--fsenter", !t)
                .toggleClass("fancybox-button--fsexit", t));
          });
      }
      e(t).on({
        "onInit.fb": function (t, e) {
          i
            ? e && e.group[e.currIndex].opts.fullScreen
              ? (e.$refs.container.on(
                  "click.fb-fullscreen",
                  "[data-fancybox-fullscreen]",
                  function (t) {
                    t.stopPropagation(), t.preventDefault(), s.toggle();
                  }
                ),
                e.opts.fullScreen &&
                  !0 === e.opts.fullScreen.autoStart &&
                  s.request(),
                (e.FullScreen = s))
              : e && e.$refs.toolbar.find("[data-fancybox-fullscreen]").hide()
            : e.$refs.toolbar.find("[data-fancybox-fullscreen]").remove();
        },
        "afterKeydown.fb": function (t, e, i, s, n) {
          e &&
            e.FullScreen &&
            70 === n &&
            (s.preventDefault(), e.FullScreen.toggle());
        },
        "beforeClose.fb": function (t, e) {
          e &&
            e.FullScreen &&
            e.$refs.container.hasClass("fancybox-is-fullscreen") &&
            s.exit();
        },
      });
    })(document, jQuery),
    (function (t, e) {
      "use strict";
      var i = "fancybox-thumbs";
      e.fancybox.defaults = e.extend(
        !0,
        {
          btnTpl: {
            thumbs:
              '<button data-fancybox-thumbs class="fancybox-button fancybox-button--thumbs" title="{{THUMBS}}"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M14.59 14.59h3.76v3.76h-3.76v-3.76zm-4.47 0h3.76v3.76h-3.76v-3.76zm-4.47 0h3.76v3.76H5.65v-3.76zm8.94-4.47h3.76v3.76h-3.76v-3.76zm-4.47 0h3.76v3.76h-3.76v-3.76zm-4.47 0h3.76v3.76H5.65v-3.76zm8.94-4.47h3.76v3.76h-3.76V5.65zm-4.47 0h3.76v3.76h-3.76V5.65zm-4.47 0h3.76v3.76H5.65V5.65z"/></svg></button>',
          },
          thumbs: {
            autoStart: !1,
            hideOnClose: !0,
            parentEl: ".fancybox-container",
            axis: "y",
          },
        },
        e.fancybox.defaults
      );
      var s = function (t) {
        this.init(t);
      };
      e.extend(s.prototype, {
        $button: null,
        $grid: null,
        $list: null,
        isVisible: !1,
        isActive: !1,
        init: function (t) {
          var e,
            i,
            s = this;
          (s.instance = t),
            (t.Thumbs = s),
            (s.opts = t.group[t.currIndex].opts.thumbs),
            (e =
              (e = t.group[0]).opts.thumb ||
              (!(!e.opts.$thumb || !e.opts.$thumb.length) &&
                e.opts.$thumb.attr("src"))),
            t.group.length > 1 &&
              (i =
                (i = t.group[1]).opts.thumb ||
                (!(!i.opts.$thumb || !i.opts.$thumb.length) &&
                  i.opts.$thumb.attr("src"))),
            (s.$button = t.$refs.toolbar.find("[data-fancybox-thumbs]")),
            s.opts && e && i
              ? (s.$button.show().on("click", function () {
                  s.toggle();
                }),
                (s.isActive = !0))
              : s.$button.hide();
        },
        create: function () {
          var t,
            s = this.instance,
            n = this.opts.parentEl,
            a = [];
          this.$grid ||
            ((this.$grid = e(
              '<div class="' + i + " " + i + "-" + this.opts.axis + '"></div>'
            ).appendTo(s.$refs.container.find(n).addBack().filter(n))),
            this.$grid.on("click", "a", function () {
              s.jumpTo(e(this).attr("data-index"));
            })),
            this.$list ||
              (this.$list = e('<div class="' + i + '__list">').appendTo(
                this.$grid
              )),
            e.each(s.group, function (e, i) {
              (t =
                i.opts.thumb ||
                (i.opts.$thumb ? i.opts.$thumb.attr("src") : null)) ||
                "image" !== i.type ||
                (t = i.src),
                a.push(
                  '<a href="javascript:;" tabindex="0" data-index="' +
                    e +
                    '" ' +
                    (t && t.length
                      ? ' style="background-image:url(' + t + ')" />'
                      : "") +
                    "></a>"
                );
            }),
            (this.$list[0].innerHTML = a.join("")),
            "x" === this.opts.axis &&
              this.$list.width(
                parseInt(this.$grid.css("padding-right"), 10) +
                  s.group.length * this.$list.children().eq(0).outerWidth(!0)
              );
        },
        focus: function (t) {
          var e,
            i,
            s = this.$list,
            n = this.$grid;
          this.instance.current &&
            ((i = (e = s
              .children()
              .removeClass("fancybox-thumbs-active")
              .filter('[data-index="' + this.instance.current.index + '"]')
              .addClass("fancybox-thumbs-active")).position()),
            "y" === this.opts.axis &&
            (i.top < 0 || i.top > s.height() - e.outerHeight())
              ? s.stop().animate({ scrollTop: s.scrollTop() + i.top }, t)
              : "x" === this.opts.axis &&
                (i.left < n.scrollLeft() ||
                  i.left > n.scrollLeft() + (n.width() - e.outerWidth())) &&
                s.parent().stop().animate({ scrollLeft: i.left }, t));
        },
        update: function () {
          this.instance.$refs.container.toggleClass(
            "fancybox-show-thumbs",
            this.isVisible
          ),
            this.isVisible
              ? (this.$grid || this.create(),
                this.instance.trigger("onThumbsShow"),
                this.focus(0))
              : this.$grid && this.instance.trigger("onThumbsHide"),
            this.instance.update();
        },
        hide: function () {
          (this.isVisible = !1), this.update();
        },
        show: function () {
          (this.isVisible = !0), this.update();
        },
        toggle: function () {
          (this.isVisible = !this.isVisible), this.update();
        },
      }),
        e(t).on({
          "onInit.fb": function (t, e) {
            var i;
            e &&
              !e.Thumbs &&
              (i = new s(e)).isActive &&
              !0 === i.opts.autoStart &&
              i.show();
          },
          "beforeShow.fb": function (t, e, i, s) {
            var n = e && e.Thumbs;
            n && n.isVisible && n.focus(s ? 0 : 250);
          },
          "afterKeydown.fb": function (t, e, i, s, n) {
            var a = e && e.Thumbs;
            a && a.isActive && 71 === n && (s.preventDefault(), a.toggle());
          },
          "beforeClose.fb": function (t, e) {
            var i = e && e.Thumbs;
            i && i.isVisible && !1 !== i.opts.hideOnClose && i.$grid.hide();
          },
        });
    })(document, jQuery),
    (function (t, e) {
      "use strict";
      e.extend(!0, e.fancybox.defaults, {
        btnTpl: {
          share:
            '<button data-fancybox-share class="fancybox-button fancybox-button--share" title="{{SHARE}}"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M2.55 19c1.4-8.4 9.1-9.8 11.9-9.8V5l7 7-7 6.3v-3.5c-2.8 0-10.5 2.1-11.9 4.2z"/></svg></button>',
        },
        share: {
          url: function (t, e) {
            return (
              (!t.currentHash &&
                "inline" !== e.type &&
                "html" !== e.type &&
                (e.origSrc || e.src)) ||
              window.location
            );
          },
          tpl: '<div class="fancybox-share"><h1>{{SHARE}}</h1><p><a class="fancybox-share__button fancybox-share__button--fb" href="https://www.facebook.com/sharer/sharer.php?u={{url}}"><svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="m287 456v-299c0-21 6-35 35-35h38v-63c-7-1-29-3-55-3-54 0-91 33-91 94v306m143-254h-205v72h196" /></svg><span>Facebook</span></a><a class="fancybox-share__button fancybox-share__button--tw" href="https://twitter.com/intent/tweet?url={{url}}&text={{descr}}"><svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="m456 133c-14 7-31 11-47 13 17-10 30-27 37-46-15 10-34 16-52 20-61-62-157-7-141 75-68-3-129-35-169-85-22 37-11 86 26 109-13 0-26-4-37-9 0 39 28 72 65 80-12 3-25 4-37 2 10 33 41 57 77 57-42 30-77 38-122 34 170 111 378-32 359-208 16-11 30-25 41-42z" /></svg><span>Twitter</span></a><a class="fancybox-share__button fancybox-share__button--pt" href="https://www.pinterest.com/pin/create/button/?url={{url}}&description={{descr}}&media={{media}}"><svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="m265 56c-109 0-164 78-164 144 0 39 15 74 47 87 5 2 10 0 12-5l4-19c2-6 1-8-3-13-9-11-15-25-15-45 0-58 43-110 113-110 62 0 96 38 96 88 0 67-30 122-73 122-24 0-42-19-36-44 6-29 20-60 20-81 0-19-10-35-31-35-25 0-44 26-44 60 0 21 7 36 7 36l-30 125c-8 37-1 83 0 87 0 3 4 4 5 2 2-3 32-39 42-75l16-64c8 16 31 29 56 29 74 0 124-67 124-157 0-69-58-132-146-132z" fill="#fff"/></svg><span>Pinterest</span></a></p><p><input class="fancybox-share__input" type="text" value="{{url_raw}}" onclick="select()" /></p></div>',
        },
      }),
        e(t).on("click", "[data-fancybox-share]", function () {
          var t,
            i,
            s,
            n,
            a = e.fancybox.getInstance(),
            o = a.current || null;
          o &&
            ("function" === e.type(o.opts.share.url) &&
              (t = o.opts.share.url.apply(o, [a, o])),
            (i = o.opts.share.tpl
              .replace(
                /\{\{media\}\}/g,
                "image" === o.type ? encodeURIComponent(o.src) : ""
              )
              .replace(/\{\{url\}\}/g, encodeURIComponent(t))
              .replace(
                /\{\{url_raw\}\}/g,
                ((s = t),
                (n = {
                  "&": "&amp;",
                  "<": "&lt;",
                  ">": "&gt;",
                  '"': "&quot;",
                  "'": "&#39;",
                  "/": "&#x2F;",
                  "`": "&#x60;",
                  "=": "&#x3D;",
                }),
                String(s).replace(/[&<>"'`=\/]/g, function (t) {
                  return n[t];
                }))
              )
              .replace(
                /\{\{descr\}\}/g,
                a.$caption ? encodeURIComponent(a.$caption.text()) : ""
              )),
            e.fancybox.open({
              src: a.translate(a, i),
              type: "html",
              opts: {
                touch: !1,
                animationEffect: !1,
                afterLoad: function (t, e) {
                  a.$refs.container.one("beforeClose.fb", function () {
                    t.close(null, 0);
                  }),
                    e.$content.find(".fancybox-share__button").click(function () {
                      return (
                        window.open(this.href, "Share", "width=550, height=450"),
                        !1
                      );
                    });
                },
                mobile: { autoFocus: !1 },
              },
            }));
        });
    })(document, jQuery),
    (function (t, e, i) {
      "use strict";
      function s() {
        var e = t.location.hash.substr(1),
          i = e.split("-"),
          s =
            (i.length > 1 &&
              /^\+?\d+$/.test(i[i.length - 1]) &&
              parseInt(i.pop(-1), 10)) ||
            1;
        return { hash: e, index: s < 1 ? 1 : s, gallery: i.join("-") };
      }
      function n(t) {
        "" !== t.gallery &&
          i("[data-fancybox='" + i.escapeSelector(t.gallery) + "']")
            .eq(t.index - 1)
            .focus()
            .trigger("click.fb-start");
      }
      function a(t) {
        var e, i;
        return (
          !!t &&
          "" !==
            (i =
              (e = t.current ? t.current.opts : t.opts).hash ||
              (e.$orig
                ? e.$orig.data("fancybox") || e.$orig.data("fancybox-trigger")
                : "")) &&
          i
        );
      }
      i.escapeSelector ||
        (i.escapeSelector = function (t) {
          return (t + "").replace(
            /([\0-\x1f\x7f]|^-?\d)|^-$|[^\x80-\uFFFF\w-]/g,
            function (t, e) {
              return e
                ? "\0" === t
                  ? "ï¿½"
                  : t.slice(0, -1) +
                    "\\" +
                    t.charCodeAt(t.length - 1).toString(16) +
                    " "
                : "\\" + t;
            }
          );
        }),
        i(function () {
          !1 !== i.fancybox.defaults.hash &&
            (i(e).on({
              "onInit.fb": function (t, e) {
                var i, n;
                !1 !== e.group[e.currIndex].opts.hash &&
                  ((i = s()),
                  (n = a(e)) &&
                    i.gallery &&
                    n == i.gallery &&
                    (e.currIndex = i.index - 1));
              },
              "beforeShow.fb": function (i, s, n, o) {
                var r;
                n &&
                  !1 !== n.opts.hash &&
                  (r = a(s)) &&
                  ((s.currentHash =
                    r + (s.group.length > 1 ? "-" + (n.index + 1) : "")),
                  t.location.hash !== "#" + s.currentHash &&
                    (o && !s.origHash && (s.origHash = t.location.hash),
                    s.hashTimer && clearTimeout(s.hashTimer),
                    (s.hashTimer = setTimeout(function () {
                      "replaceState" in t.history
                        ? (t.history[o ? "pushState" : "replaceState"](
                            {},
                            e.title,
                            t.location.pathname +
                              t.location.search +
                              "#" +
                              s.currentHash
                          ),
                          o && (s.hasCreatedHistory = !0))
                        : (t.location.hash = s.currentHash),
                        (s.hashTimer = null);
                    }, 300))));
              },
              "beforeClose.fb": function (i, s, n) {
                !1 !== n.opts.hash &&
                  (clearTimeout(s.hashTimer),
                  s.currentHash && s.hasCreatedHistory
                    ? t.history.back()
                    : s.currentHash &&
                      ("replaceState" in t.history
                        ? t.history.replaceState(
                            {},
                            e.title,
                            t.location.pathname +
                              t.location.search +
                              (s.origHash || "")
                          )
                        : (t.location.hash = s.origHash)),
                  (s.currentHash = null));
              },
            }),
            i(t).on("hashchange.fb", function () {
              var t = s(),
                e = null;
              i.each(i(".fancybox-container").get().reverse(), function (t, s) {
                var n = i(s).data("FancyBox");
                if (n && n.currentHash) return (e = n), !1;
              }),
                e
                  ? e.currentHash === t.gallery + "-" + t.index ||
                    (1 === t.index && e.currentHash == t.gallery) ||
                    ((e.currentHash = null), e.close())
                  : "" !== t.gallery && n(t);
            }),
            setTimeout(function () {
              i.fancybox.getInstance() || n(s());
            }, 50));
        });
    })(window, document, jQuery),
    (function (t, e) {
      "use strict";
      var i = new Date().getTime();
      e(t).on({
        "onInit.fb": function (t, e, s) {
          e.$refs.stage.on(
            "mousewheel DOMMouseScroll wheel MozMousePixelScroll",
            function (t) {
              var s = e.current,
                n = new Date().getTime();
              e.group.length < 2 ||
                !1 === s.opts.wheel ||
                ("auto" === s.opts.wheel && "image" !== s.type) ||
                (t.preventDefault(),
                t.stopPropagation(),
                s.$slide.hasClass("fancybox-animated") ||
                  ((t = t.originalEvent || t),
                  n - i < 250 ||
                    ((i = n),
                    e[
                      (-t.deltaY || -t.deltaX || t.wheelDelta || -t.detail) < 0
                        ? "next"
                        : "previous"
                    ]())));
            }
          );
        },
      });
    })(document, jQuery),
    (function (t) {
      "use strict";
      var e = function (e) {
          return this.each(function () {
            var i,
              s,
              n = t(this),
              a = n.data(),
              o = [n],
              r = this.tagName,
              l = 0;
            (i = t.extend(
              { content: "body", headings: "h1,h2,h3" },
              { content: a.toc || void 0, headings: a.tocHeadings || void 0 },
              e
            )),
              (s = i.headings.split(",")),
              t(i.content)
                .find(i.headings)
                .attr("id", function (e, i) {
                  return (
                    i ||
                    (function (t) {
                      0 === t.length && (t = "?");
                      for (
                        var e = t.replace(/\s+/g, "_"), i = "", s = 1;
                        null !== document.getElementById(e + i);

                      )
                        i = "_" + s++;
                      return e + i;
                    })(t(this).text())
                  );
                })
                .each(function () {
                  var e = t(this),
                    i = t.map(s, function (t, i) {
                      return e.is(t) ? i : void 0;
                    })[0];
                  if (i > l) {
                    var n = o[0].children("li:last")[0];
                    n && o.unshift(t("<" + r + "/>").appendTo(n));
                  } else o.splice(0, Math.min(l - i, Math.max(o.length - 1, 0)));
                  t("<li/>")
                    .appendTo(o[0])
                    .append(
                      t("<a/>")
                        .text(e.text())
                        .attr("href", "#" + e.attr("id"))
                    ),
                    (l = i);
                });
          });
        },
        i = t.fn.toc;
      (t.fn.toc = e),
        (t.fn.toc.noConflict = function () {
          return (t.fn.toc = i), this;
        }),
        t(function () {
          e.call(t("[data-toc]"));
        });
    })(window.jQuery);
