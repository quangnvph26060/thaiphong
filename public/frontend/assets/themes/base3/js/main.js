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
var ALERT_TITLE = window.location.hostname,
  ALERT_BUTTON_TEXT = "Ok",
  ALERT_BUTTON_TEXT_CLOSE = "Close";
function createCustomAlert(t) {
  (d = document),
    (mObj = d
      .getElementsByTagName("body")[0]
      .appendChild(d.createElement("div"))),
    (mObj.id = "myModalAlert"),
    (mObj.className = "modal fade"),
    (mObj.style.height = d.documentElement.scrollHeight + "px"),
    (alertObj = mObj.appendChild(d.createElement("div"))),
    (alertObj.className = "modal-dialog"),
    (alertObj2 = alertObj.appendChild(d.createElement("div"))),
    (alertObj2.className = "modal-content"),
    (alertObj3 = alertObj2.appendChild(d.createElement("div"))),
    (alertObj3.className = "modal-header"),
    (alertObj4 = alertObj2.appendChild(d.createElement("div"))),
    (alertObj4.className = "modal-body"),
    (alertObj5 = alertObj2.appendChild(d.createElement("div"))),
    (alertObj5.className = "modal-footer"),
    (h1 = alertObj3.appendChild(d.createElement("h1"))),
    h1.appendChild(d.createTextNode(ALERT_TITLE)),
    (msg = alertObj4.appendChild(d.createElement("p"))),
    console.log(t),
    (msg.innerHTML = t),
    (btnClose = alertObj5.appendChild(d.createElement("button"))),
    (btnClose.className = "btn btn-default"),
    (btnClose.dataset.dismiss = "modal"),
    btnClose.appendChild(d.createTextNode(ALERT_BUTTON_TEXT)),
    (btnClose.onclick = function () {
      return removeCustomAlert(), !1;
    }),
    $("#myModalAlert").modal();
}
function createCustomConfirm(t) {
  (d = document),
    (mObj = d
      .getElementsByTagName("body")[0]
      .appendChild(d.createElement("div"))),
    (mObj.id = "myModalConfirm"),
    (mObj.className = "modal fade"),
    (mObj.style.height = d.documentElement.scrollHeight + "px"),
    (alertObj = mObj.appendChild(d.createElement("div"))),
    (alertObj.className = "modal-dialog"),
    (alertObj2 = alertObj.appendChild(d.createElement("div"))),
    (alertObj2.className = "modal-content"),
    (alertObj3 = alertObj2.appendChild(d.createElement("div"))),
    (alertObj3.className = "modal-header"),
    (alertObj4 = alertObj2.appendChild(d.createElement("div"))),
    (alertObj4.className = "modal-body"),
    (alertObj5 = alertObj2.appendChild(d.createElement("div"))),
    (alertObj5.className = "modal-footer"),
    (h1 = alertObj3.appendChild(d.createElement("h1"))),
    h1.appendChild(d.createTextNode(ALERT_TITLE)),
    (msg = alertObj4.appendChild(d.createElement("p"))),
    console.log(t),
    (msg.innerHTML = t),
    (btnClose = alertObj5.appendChild(d.createElement("button"))),
    (btnClose.className = "btn btn-default"),
    (btnClose.dataset.dismiss = "modal"),
    btnClose.appendChild(d.createTextNode(ALERT_BUTTON_TEXT_CLOSE)),
    (btnOk = alertObj5.appendChild(d.createElement("button"))),
    (btnOk.className = "btn btn-confirm"),
    (btnOk.dataset.dismiss = "modal"),
    btnOk.appendChild(d.createTextNode(ALERT_BUTTON_TEXT)),
    (btnOk.onclick = function () {
      return removeCustomConfirm(), !0;
    }),
    (btnClose.onclick = function () {
      return removeCustomConfirm(), !1;
    }),
    $("#myModalConfirm").modal();
}
function removeCustomAlert() {
  document
    .getElementsByTagName("body")[0]
    .removeChild(document.getElementById("myModalAlert"));
}
function removeCustomConfirm() {
  document
    .getElementsByTagName("body")[0]
    .removeChild(document.getElementById("myModalConfirm"));
}
$(document).ready(function () {
  window.alert = function (t) {
    createCustomAlert(t);
  };
}),
  (function (t) {
    (t.WBComment = function (e) {
      (this.$element = t(e)), this.init();
    }),
      (t.WBComment.prototype = {
        init: function () {
          (this.$limit = 5),
            (this.$end = !1),
            (this.$reviewed = !1),
            (this.$commentable_type = this.$element.data("commentable_type")),
            (this.$commentable_id = this.$element.data("commentable_id")),
            (this.$censorship = this.$element.data("censorship")),
            this.load(),
            this.create(),
            this.beforereply(),
            this.reply(),
            this.loadmore();
        },
        create: function () {
          var e = this;
          t(document)
            .find("#system_comments textarea")
            .on("focusin", function () {
              t(document).find(".comment-success").hide();
            }),
            t(document)
              .find("#system_comments input")
              .on("focusin", function () {
                t(document).find(".alert-danger").remove();
              }),
            t(document).on(
              "submit",
              ".comment-main .formcomment",
              function (i) {
                var n = {
                  name: i.target.elements.name.value,
                  content: i.target.elements.content.value,
                  parent_id: i.target.elements.parent_id.value,
                  commentable_type: e.$commentable_type,
                  commentable_id: e.$commentable_id,
                  censorship: e.$censorship,
                  url: location.href,
                };
                return (
                  t(".comment-main .formcomment .form-captcha").length &&
                    (n.captcha = i.target.elements.captcha.value),
                  t(".comment-main .formcomment .form-email").length &&
                    (n.email = i.target.elements.email.value),
                  t(".comment-main .formcomment .form-phone").length &&
                    (n.phone = i.target.elements.phone.value),
                  this.reviewed ||
                    ("undefined" !== _typeof(i.target.elements.review) &&
                      ((n.review = i.target.elements.review.value),
                      e.storagereview())),
                  e.$censorship &&
                    t(document).find(".comment-footer.comment-reply").hide(),
                  t
                    .post("/submit-comment", n, function (n) {
                      (i.target.elements.name.style.display = "none"),
                        t(".comment-main .formcomment .form-email").length &&
                          (i.target.elements.email.style.display = "none"),
                        t(".comment-main .formcomment .form-phone").length &&
                          (i.target.elements.phone.style.display = "none"),
                        (i.target.elements.content.value = ""),
                        t(".comment-main .formcomment .form-captcha").length &&
                          (i.target.elements.captcha.value = ""),
                        t(
                          "." +
                            i.target.elements.parent_name.value +
                            " .comment-success"
                        ).length &&
                          t(
                            "." +
                              i.target.elements.parent_name.value +
                              " .comment-success"
                          ).show(),
                        e.$censorship && e.load(),
                        t
                          .ajax({ type: "GET", url: "/ajax_regen_captcha" })
                          .done(function (e) {
                            t(
                              ".comment-main .formcomment .form-captcha img"
                            ).attr("src", e);
                          });
                    })
                    .fail(function (e) {
                      t("#system_comments .comment-main").prepend(
                        t(
                          '<div class="alert alert-danger" role="alert">' +
                            e.responseJSON.message +
                            "</div>"
                        )
                      ),
                        t(".form-captcha").length &&
                          (i.target.elements.captcha.value = ""),
                        t
                          .ajax({ type: "GET", url: "/ajax_regen_captcha" })
                          .done(function (e) {
                            t(
                              ".comment-main .formcomment .form-captcha img"
                            ).attr("src", e);
                          });
                    }),
                  !1
                );
              }
            );
        },
        reply: function () {
          var e = this;
          t(document)
            .find("#system_comments textarea")
            .on("focusin", function () {
              t(document).find(".comment-success").hide();
            }),
            t(document).on(
              "submit",
              "#comments-list .formcomment",
              function (i) {
                var n = {
                  name: i.target.elements.name.value,
                  content: i.target.elements.content.value,
                  parent_id: i.target.elements.parent_id.value,
                  commentable_type: e.$commentable_type,
                  commentable_id: e.$commentable_id,
                  censorship: e.$censorship,
                  url: location.href,
                };
                return (
                  t(".comment-reply .formcomment .form-email").length &&
                    (n.email = i.target.elements.email.value),
                  t(".comment-reply .formcomment .form-phone").length &&
                    (n.phone = i.target.elements.phone.value),
                  this.reviewed ||
                    ("undefined" !== _typeof(i.target.elements.review) &&
                      ((n.review = i.target.elements.review.value),
                      e.storagereview())),
                  t.post("/submit-comment", n, function (n) {
                    (i.target.elements.name.style.display = "none"),
                      t(".comment-reply .formcomment .form-email").length &&
                        (i.target.elements.email.style.display = "none"),
                      t(".comment-reply .formcomment .form-phone").length &&
                        (i.target.elements.phone.style.display = "none"),
                      (i.target.elements.content.value = ""),
                      t(
                        "." +
                          i.target.elements.parent_name.value +
                          " .comment-success"
                      ).length &&
                        t(
                          "." +
                            i.target.elements.parent_name.value +
                            " .comment-success"
                        ).show(),
                      e.$censorship && e.load();
                  }),
                  !1
                );
              }
            );
        },
        beforereply: function () {
          var e = "";
          t(document).on("click", ".comment_reply", function (i) {
            i.preventDefault(),
              (e = t(this).data("parent")),
              t("#system_comments ul").find(".comment-footer").remove(),
              t("#comment-" + e)
                .find(".comment-footer")
                .remove(),
              t("#comment-" + e).append(t("#reply-template").html()),
              t("#comment-" + e)
                .find(".formcomment .parent_id")
                .val(e),
              t("#comment-" + e)
                .find(".comment-footer.comment-reply")
                .show(),
              t(document).find(".comment-success").hide();
          }),
            t(document).on("click", ".comment_reply_close", function (i) {
              i.preventDefault(),
                t("#comment-" + e)
                  .find(".comment-footer")
                  .remove();
            });
        },
        load: function () {
          if (t("#system_comments").length) {
            t("#data-comments").hide();
            var e = this;
            this.showreview();
            var i = {
              commentable_type: this.$commentable_type,
              commentable_id: this.$commentable_id,
              limit: e.$limit,
            };
            // t.get("/load-comment", i, function (i) {
            //   t("#comments-list").empty(),
            //     t(".more_comment").hide(),
            //     i.length >= e.$limit && t(".more_comment").show(),
            //     i.length &&
            //       (i.forEach(function (e) {
            //         var i = "<li>";
            //         (i +=
            //           '<div class="comment-main-level clearfix comment-wrap m-bottom-20">'),
            //           (i += '  <div class="comment-avatar">'),
            //           (i +=
            //             '      <img src="' +
            //             comment_avatar +
            //             '" alt="avatar" class="f-left circle m-right-10">'),
            //           (i += "  </div>"),
            //           (i +=
            //             '  <div class="comment-box comment-content-wrap" id="comment-' +
            //             e.id +
            //             '">'),
            //           (i +=
            //             '      <div class="comment-head author m-bottom-5">'),
            //           parseInt(e.review) > 0 &&
            //             (i +=
            //               '          <p class="wb_rating"><label><input hidden class="rating" data-filled="fa fa-star" data-empty="fa fa-star wb-color-rating wb-rating" data-fractions="1" data-readonly value="' +
            //               e.review +
            //               '" /></label></p>'),
            //           (i +=
            //             '          <p class="review-header"><strong>' +
            //             e.name +
            //             "</strong> <span>" +
            //             e.created_at +
            //             "</span></p>"),
            //           (i +=
            //             '          <a class="comment_reply" data-parent="' +
            //             e.id +
            //             '" href="#">' +
            //             trans_reply +
            //             "</a>"),
            //           (i += "      </div>"),
            //           (i +=
            //             '      <div class="comment-content comment relative">' +
            //             e.content +
            //             "</div>"),
            //           (i += "  </div>"),
            //           (i += "</div>"),
            //           Object.keys(e.children).length &&
            //             ((i +=
            //               '<ul class="comments-list reply-list col-md-offset-1 comment-container m-left-20">'),
            //             e.children.forEach(function (t) {
            //               var e = comment_avatar;
            //               1 === t.is_admin && (e = comment_avatar_admin),
            //                 (i += "  <li>"),
            //                 (i +=
            //                   '      <div class="clearfix comment-wrap m-bottom-20">'),
            //                 (i +=
            //                   '          <div class="comment-avatar"><img src="' +
            //                   e +
            //                   '" alt="avatar" class="f-left circle m-right-10"></div>'),
            //                 (i +=
            //                   '          <div class="comment-box comment-content-wrap">'),
            //                 (i +=
            //                   '              <div class="comment-head author m-bottom-5">'),
            //                 (i +=
            //                   '                  <p class="review-header"><strong>' +
            //                   t.name +
            //                   "</strong> <span>" +
            //                   t.created_at +
            //                   "</span></p>"),
            //                 (i += "              </div>"),
            //                 (i +=
            //                   '              <div class="comment-content comment">' +
            //                   t.content +
            //                   "</div>"),
            //                 (i += "          </div>"),
            //                 (i += "      </div>"),
            //                 (i += "  </li>");
            //             }),
            //             (i += "</ul>")),
            //           (i += "</li>"),
            //           t("#comments-list").append(i);
            //       }),
            //       t(document).find("input.rating").rating(),
            //       t("#data-comments").show());
            // });
          }
        },
        loadmore: function () {
          var e = this;
          t(".more_comment").on("click", function (t) {
            t.preventDefault(), (e.$limit += 5), e.load();
          });
        },
        showreview: function () {
          var e = localStorage.getItem("rating_" + this.$commentable_type),
            i = [];
          e && (i = JSON.parse(e)),
            -1 == t.inArray(this.$commentable_id, i)
              ? ((this.$reviewed = !1), t("#review").show())
              : ((this.$reviewed = !0), t("#review").hide());
        },
        storagereview: function () {
          var t = localStorage.getItem("rating_" + this.$commentable_type),
            e = [];
          t && (e = JSON.parse(t)),
            e.push(this.$commentable_id),
            localStorage.setItem(
              "rating_" + this.$commentable_type,
              JSON.stringify(e)
            ),
            (this.$reviewed = !0);
        },
      }),
      new t.WBComment("#system_comments"),
      t(document).on("click", ".regen-captcha", function (e) {
        var i = this;
        e.preventDefault(),
          t
            .ajax({ type: "GET", url: "/ajax_regen_captcha" })
            .done(function (e) {
              t(i).parent().find("img").attr("src", e);
            });
      });
  })(jQuery);
var runHeightMegaMenuEcommerce,
  width_first = 0,
  productListActive = function () {
    var t = getCookie("display_style");
    "list" == t
      ? $(".but-style-list").click()
      : "grid" == t && $(".but-style-grid").click();
  };
function initCarousel(t) {
  t.owlCarousel({
    center: null != t.data("center") && t.data("center"),
    loop: null != t.data("loop") && t.data("loop"),
    margin: null != t.data("margin") ? t.data("margin") : 0,
    nav: null == t.data("nav") || t.data("nav"),
    dots: null != t.data("dots") && t.data("dots"),
    autoplay: null != t.data("autoplay") && t.data("autoplay"),
    autoplayTimeout:
      null != t.data("autoplaytimeout") ? t.data("autoplaytimeout") : 5e3,
    autoplayHoverPause: !0,
    navText: [
      '<i class="fas fa-angle-left"></i>',
      '<i class="fas fa-angle-right"></i>',
    ],
    lazyLoad: !0,
    video: !0,
    smartSpeed: null != t.data("smartspeed") ? t.data("smartspeed") : 500,
    autoHeight: null != t.data("autoheight") && t.data("autoheight"),
    lazyLoadEager: 1,
    animateIn: t.data("animatein"),
    animateOut: t.data("animateout"),
    responsive: {
      0: { items: t.data("responsive-0") },
      576: { items: t.data("responsive-576") },
      768: { items: t.data("responsive-768") },
      992: { items: t.data("responsive-992") },
    },
  }),
    t.on("change.owl.carousel", function (e) {
      t.find(".owl-item img").each(function () {
        $(this).attr("src", $(this).data("src")).css("opacity", "1");
      });
    }),
    t.on("changed.owl.carousel", function (e) {
      t.find(".owl-item img").each(function () {
        $(this).attr("src", $(this).data("src"));
      });
    }),
    t.on("initialized.owl.carousel", function (t) {
      $(document).find("#product-detail-carousel").length &&
        ($(document)
          .find(
            "#product-detail-carousel.owl-carousel .owl-stage-outer .owl-item a"
          )
          .height(
            $(document)
              .find(
                "#product-detail-carousel.owl-carousel .owl-stage-outer .owl-item.active a"
              )
              .width()
          ),
        $(document)
          .find("#product-detail-carousel.owl-carousel .owl-stage-outer")
          .height(
            $(document)
              .find(
                "#product-detail-carousel.owl-carousel .owl-stage-outer .owl-item.active a"
              )
              .width() + 2
          ),
        $(document)
          .find(
            "#product-detail-carousel.owl-carousel.owl-drag .owl-item.active"
          )
          .first()
          .addClass("active-border"));
    }),
    t.on("dragged.owl.carousel", function (t) {
      $(document).find("#product-detail-carousel").length &&
        ($(document)
          .find(
            "#product-detail-carousel.owl-carousel .owl-stage-outer .owl-item a"
          )
          .height(
            $(document)
              .find(
                "#product-detail-carousel.owl-carousel .owl-stage-outer .owl-item.active a"
              )
              .width()
          ),
        $(document)
          .find("#product-detail-carousel.owl-carousel .owl-stage-outer")
          .height(
            $(document)
              .find(
                "#product-detail-carousel.owl-carousel .owl-stage-outer .owl-item.active a"
              )
              .width() + 2
          ));
    }),
    t.on("loaded.owl.lazy", function (t) {
      $(document).find("#product-detail-carousel").length &&
        ($(document)
          .find(
            "#product-detail-carousel.owl-carousel .owl-stage-outer .owl-item a"
          )
          .height(
            $(document)
              .find(
                "#product-detail-carousel.owl-carousel .owl-stage-outer .owl-item.active a"
              )
              .width()
          ),
        $(document)
          .find("#product-detail-carousel.owl-carousel .owl-stage-outer")
          .height(
            $(document)
              .find(
                "#product-detail-carousel.owl-carousel .owl-stage-outer .owl-item.active a"
              )
              .width() + 2
          ));
    }),
    1 == t.hasClass("youtube-carousel") &&
      t.find("button").click(function () {
        t.find(".owl-item iframe").remove();
      }),
    t.trigger("refresh.owl.carousel");
}
function initDatePicker() {
  $(".datepicker").length &&
    $(".datepicker").each(function (t, e) {
      $(this).daterangepicker({
        singleDatePicker: !0,
        showDropdowns: !0,
        locale: { format: $(this).data("dateformat") },
        minYear: 1901,
      });
    }),
    $(".datetimepicker").length &&
      $(".datetimepicker").each(function (t, e) {
        $(this).daterangepicker({
          singleDatePicker: !0,
          showDropdowns: !0,
          timePicker: !0,
          locale: { format: "DD/MM/YYYY hh:mm" },
          minYear: 1901,
        });
      }),
    $(".booking-datepicker").length &&
      $(".booking-datepicker").each(function (t, e) {
        $(this).daterangepicker({
          singleDatePicker: !0,
          showDropdowns: !0,
          minDate: moment(),
          autoUpdateInput: !0,
          locale: { format: $(this).data("dateformat") },
        });
      });
}
function validateCoupon(t) {
  var e = $(t).val();
  if (((re = /[`~!@#$%^&* ()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi), re.test(e))) {
    var i = e.replace(/[`~!@#$%^&* ()_|+\-=?;:'",.<>\{\}\[\]\\\/]/gi, "");
    $(t).val(i);
  }
}
var heightMegaEcomerce = 0;
function setHeightMegaMenuEcommerce() {
  $(".mega-menu-category").length
    ? $(window).width() > 992
      ? (heightMegaEcomerce > 0 && clearInterval(runHeightMegaMenuEcommerce),
        $(".header-sub-ecommerce").length &&
          (heightMegaEcomerce = parseInt($(".header-sub-ecommerce").height())),
        $(".header-sub-ecommerce-2").length &&
          (heightMegaEcomerce = parseInt(
            $(".header-sub-ecommerce-2").height()
          )),
        $(".mega-menu-category").css("min-height", heightMegaEcomerce))
      : ($(".mega-menu-category").css("min-height", "auto"),
        clearInterval(runHeightMegaMenuEcommerce))
    : clearInterval(runHeightMegaMenuEcommerce);
}
function sectionFixed() {
  if ($(".section-fixed").length) {
    var t = 0;
    $(window).scroll(function () {
      (t =
        $(".section-fixed").parent().offset().top -
        $(".section-fixed").height()),
        $(window).scrollTop() >= t
          ? $(".section-fixed:not(.fixed-content)").addClass("fixed-content")
          : $(".section-fixed.fixed-content").removeClass("fixed-content");
    });
  }
}
function formatFilter() {
  if ($(".formProductFilter .min-price-1").length) {
    var t = $(".formProductFilter .min-price-1")
        .val()
        .replace(/\D/g, "")
        .replace(/\B(?=(\d{3})+(?!\d))/g, "."),
      e = $(".formProductFilter .max-price-1")
        .val()
        .replace(/\D/g, "")
        .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    $(".formProductFilter .min-price-1").val(t),
      $(".formProductFilter .max-price-1").val(e);
  }
  if ($(".formProductFilter .min-price-2").length) {
    var i = $(".formProductFilter .min-price-2")
        .text()
        .replace(/\D/g, "")
        .replace(/\B(?=(\d{3})+(?!\d))/g, "."),
      n = $(".formProductFilter .max-price-2")
        .text()
        .replace(/\D/g, "")
        .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    $(".formProductFilter .min-price-2").text(i + "đ"),
      $(".formProductFilter .max-price-2").text(n + "đ");
  }
}
function styleIsotope(t) {
  var e = $(t).find("ul.button-group").attr("id"),
    i = $(".isotope." + e).isotope({
      itemSelector: ".element-item",
      layoutMode: "fitRows",
      getSortData: {
        name: ".name",
        symbol: ".symbol",
        number: ".number parseInt",
        category: "[data-category]",
        weight: function (t) {
          var e = $(t).find(".weight").text();
          return parseFloat(e.replace(/[\(\)]/g, ""));
        },
      },
    }),
    n = {
      numberGreaterThan50: function () {
        var t = $(this).find(".number").text();
        return parseInt(t, 10) > 50;
      },
      ium: function () {
        return $(this).find(".name").text().match(/ium$/);
      },
    };
  $("#" + e).on("click", "a", function () {
    var t = $(this).attr("data-filter");
    (t = n[t] || t), i.isotope({ filter: t });
  }),
    $(".button-group." + e).each(function (t, e) {
      (e = $(e)).on("click", "a", function () {
        e.find(".active").removeClass("active"), $(this).addClass("active");
      });
    }),
    $("#" + e + " li:first-child a").click();
}
function menuWidthMobile() {
  if ($(window).width() < 992) {
    var t = $(".header-container .width-menu-mobile .container").width();
    $(".main-nav .navbar-menu").width(t);
  } else $(".main-nav .navbar-menu").width("auto");
}
function setBannerFixed() {
  var t = $(".page-content").width(),
    e = $(".page-content").offset().left,
    i = $(".fc-banner-left").width();
  $(".fc-banner-left").css("left", e - i - 5),
    $(".fc-banner-right").css("left", t + e + 5),
    $(".fc-banner").show();
}
function TimeCirclesCountdown() {
  var t = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
  $(".time-circles").each(function () {
    var e = $(this).TimeCircles({
      animation: "ticks",
      bg_width: parseFloat($(this).data("bg-width")),
      fg_width: parseFloat($(this).data("fg-width")),
      circle_bg_color: $(this).data("circle-bg-color"),
      count_past_zero: !1,
      time: {
        Days: {
          text: wb_translate.just_days,
          color: $(this).data("days-color"),
          show: !0,
        },
        Hours: {
          text: wb_translate.just_hours,
          color: $(this).data("hours-color"),
          show: !0,
        },
        Minutes: {
          text: wb_translate.just_minutes,
          color: $(this).data("minutes-color"),
          show: !0,
        },
        Seconds: {
          text: wb_translate.just_secs,
          color: $(this).data("seconds-color"),
          show: !0,
        },
      },
    });
    t && e.rebuild();
    var i = $(this).parents(".countdown").data("ids-hide");
    if ("" != i) {
      i = i.split(",");
      for (var n = 0; n < i.length; n++) $(i[n].trim()).hide();
    }
    var o = $(this).parents(".countdown").data("ids-show");
    if ("" != o)
      for (o = o.split(","), n = 0; n < o.length; n++) $(o[n].trim()).show();
  }),
    $(".time-circles")
      .TimeCircles()
      .addListener(function (t, e, i) {
        if (i <= 2) {
          if ("" != (o = $(this).parents(".countdown").data("ids-hide"))) {
            o = o.split(",");
            for (var n = 0; n < o.length; n++) $(o[n].trim()).hide();
          }
          if ("" != (a = $(this).parents(".countdown").data("ids-show")))
            for (a = a.split(","), n = 0; n < a.length; n++)
              $(a[n].trim()).show();
        } else {
          var o, a;
          if ("" != (o = $(this).parents(".countdown").data("ids-hide")))
            for (o = o.split(","), n = 0; n < o.length; n++)
              $(o[n].trim()).show();
          if ("" != (a = $(this).parents(".countdown").data("ids-show")))
            for (a = a.split(","), n = 0; n < a.length; n++)
              $(a[n].trim()).hide();
        }
      });
}
function equalize(t, e) {
  $(t).each(function () {
    $(this).find(e).height("auto");
    var t = $(this)
        .find(e)
        .map(function () {
          return $(this).height();
        })
        .get(),
      i = Math.max.apply(null, t);
    $(this).find(e).height(i);
  });
}
function readMoreCategoryChild(t) {
  $(window).width() >= 992
    ? t.each(function (t) {
        if (t > 9)
          return (
            $(this).hide().addClass("toggleable"),
            $(this).prev().hide().addClass("toggleable"),
            $(this).nextAll().hide().addClass("toggleable"),
            $(this).parent().find(".more").remove(),
            $(this)
              .parent()
              .append(
                '<a class="category-child more" title="' +
                  wb_translate.menu_readmore +
                  '"><span> ' +
                  wb_translate.menu_readmore +
                  "</span></a>"
              ),
            !1
          );
      })
    : ($(".page-content .list-category-product .category-child")
        .removeClass("toggleable")
        .show(),
      $(".page-content .list-category-product .category-child.more").remove()),
    $(t).parent().css("opacity", "1");
}
function readURLImg(t) {
  if (t.files && t.files[0]) {
    if (t.files[0].size > 524288)
      return void alert(wb_translate.error_avatar_upload_size + " 500kb");
    if (
      "image/png" != t.files[0].type &&
      "image/jpeg" != t.files[0].type &&
      "image/jpg" != t.files[0].type
    )
      return void alert(wb_translate.error_avatar_upload_file);
    var e = new FileReader();
    (e.onload = function (e) {
      $(".image-upload-wrap").hide(),
        $(".file-upload-image").attr("src", e.target.result),
        $(".file-upload-content").show(),
        $(".image-title").html(t.files[0].name);
    }),
      e.readAsDataURL(t.files[0]);
  } else removeUpload();
}
function removeUpload() {
  $(".file-upload-input").replaceWith($(".file-upload-input").clone()),
    $(".file-upload-content").hide(),
    $("#img-avatar").val(""),
    $(".image-upload-wrap").show();
}
function init() {
  $(".booking-datepicker").length &&
    $(".booking-datepicker").each(function (t, e) {
      var i = this;
      $(i).daterangepicker(
        {
          singleDatePicker: !0,
          showDropdowns: !0,
          minDate: moment(),
          autoUpdateInput: !1,
          locale: { format: $(i).data("dateformat") },
        },
        function (t) {
          $(i).val(t.format($(i).data("dateformat")));
        }
      );
    });
}
function tableofcontents() {
  if (1 == $(".post_detail .article-detail").data("tableofcontents")) {
    var t = !1;
    $(".article-detail > .decription h2").length && (t = !0),
      $(".article-detail > .decription h3").length && (t = !0),
      $(".article-detail > .decription h4").length && (t = !0),
      t &&
        ($(".article-detail > .decription").prepend(
          '<div id="toc"><div id="toc-title"><strong>' +
            wb_translate.table_of_contents +
            '</strong> <span>[<a href="javascript:void(0)" class="toggleTocList">' +
            wb_translate.hide +
            '</a>]</span></div><ul id="toc-list"></ul></div>'
        ),
        $(document)
          .find("#toc-list")
          .toc({
            content: ".article-detail > .decription",
            headings: "h2,h3,h4",
          }));
  }
  1 ==
    $(".detail-descript.wb-content.ck_editor_content").data(
      "tableofcontents"
    ) &&
    ((t = !1),
    $(".detail-descript.wb-content.ck_editor_content h2").length && (t = !0),
    $(".detail-descript.wb-content.ck_editor_content h3").length && (t = !0),
    $(".detail-descript.wb-content.ck_editor_content h4").length && (t = !0),
    t &&
      ($(".detail-descript.wb-content.ck_editor_content").prepend(
        '<div id="toc"><div id="toc-title"><strong>' +
          wb_translate.table_of_contents +
          '</strong> <span>[<a href="javascript:void(0)" class="toggleTocList">' +
          wb_translate.hide +
          '</a>]</span></div><ul id="toc-list"></ul></div>'
      ),
      $(document)
        .find("#toc-list")
        .toc({
          content: ".detail-descript.wb-content.ck_editor_content",
          headings: "h2,h3,h4",
        }))),
    1 ==
      $(".page_detail .page-content .article-detail .ck_editor_content").data(
        "tableofcontents"
      ) &&
      ((t = !1),
      $(".page-content .article-detail .ck_editor_content h2").length &&
        (t = !0),
      $(".page-content .article-detail .ck_editor_content h3").length &&
        (t = !0),
      $(".page-content .article-detail .ck_editor_content h4").length &&
        (t = !0),
      t &&
        ($(".page-content .article-detail .ck_editor_content").prepend(
          '<div id="toc"><div id="toc-title"><strong>' +
            wb_translate.table_of_contents +
            '</strong> <span>[<a href="javascript:void(0)" class="toggleTocList">' +
            wb_translate.hide +
            '</a>]</span></div><ul id="toc-list"></ul></div>'
        ),
        $(document)
          .find("#toc-list")
          .toc({
            content: ".page-content .article-detail .ck_editor_content",
            headings: "h2,h3,h4",
          })));
}
$(window).resize(function () {
  var t = $(window).width();
  t != width_first &&
    ((width_first = $(window).width()),
    sectionFixed(),
    ($(".menu_mobile_style2").length || $(".menu_mobile_style6").length) &&
      menuWidthMobile(),
    $(".homepage .widget_product_body.style6 .isoProduct").length &&
      setTimeout(
        equalize(
          ".homepage .widget_product_body.style6 .isoProduct",
          ".element-item"
        ),
        500
      ),
    $(".homepage .widget_post_body.style7 .isoPost").length &&
      setTimeout(
        equalize(
          ".homepage .widget_post_body.style7 .isoPost",
          ".element-item"
        ),
        500
      ),
    $(".service_price.style2 .justify-content-center").length &&
      equalize(".service_price.style2 .justify-content-center", ".set-height"),
    $(".time-circles").length && TimeCirclesCountdown(!0)),
    t >= 992 ? setBannerFixed() : $(".fc-banner").hide(),
    $(".page-content .list-category-product").length &&
      readMoreCategoryChild(
        $(".page-content .list-category-product .category-child")
      );
}),
  $(document).on(
    "click",
    '.widget-call_to_action a[href*="#"]:not([href="#"]).btn-item',
    function (t) {
      return (
        0 == $(".call-to-action-show-popup").length &&
          ($("body").append(
            '<div class="modal fade call-to-action-show-popup" data-backdrop="static"></div>'
          ),
          $(".call-to-action-show-popup").append(
            '<div class="modal-dialog modal-xl"></div>'
          ),
          $(".modal-dialog").append('<div class="modal-content"></div>'),
          $(".modal-content").append(
            '<div class="modal-body page-content"></div>'
          ),
          $(".modal-body").append(
            '<button type="button" class="close" data-dismiss="modal">&times;</button>'
          ),
          $(this.hash).appendTo(".modal-body").show()),
        $(".call-to-action-show-popup").modal({ show: !0 }),
        !1
      );
    }
  ),
  $(document).on(
    "click",
    'header a[href*="#"]:not([href="#"]):not([data-toggle])',
    function (t) {
      var e = $(document).find('img[data-isrc*="/"]').not(".lazy-loaded");
      $(e).length &&
        $(e).each(function () {
          $(this).attr("src", $(this).data("isrc")).addClass("lazy-loaded");
        });
      var i = 0;
      $("body").hasClass("menu_fixed_1") && (i = 50),
        $(document).find(".fixed-ontop").length &&
          (i = $(".fixed-ontop").height());
      var n = $(this.hash);
      n.length &&
        (t.preventDefault(),
        history.replaceState(
          {},
          document.title,
          window.location.pathname + this.hash
        ),
        setTimeout(function () {
          var t = n.offset().top - i;
          $("html, body").animate({ scrollTop: t }, 1e3);
        }, 1e3));
    }
  ),
  $(document).on("click", ".product-open-filters", function (t) {
    $(this).parent().toggleClass("open");
  }),
  $(".iframe-account-affiliate").length &&
    $(".iframe-account-affiliate").on("load", function () {
      $(this).contents().find("#header").remove(),
        $(this).contents().find(".footer").remove(),
        $(this).contents().find(".footer-top").remove(),
        $(this).contents().find(".footer-bottom").remove(),
        $(this).contents().find(".share-container").remove(),
        $(this).contents().find(".related-article").remove(),
        $(this).contents().find(".wb-comment").remove(),
        $(this).contents().find(".f-size-medium").remove(),
        $(this).contents().find(".breadcrumbs").remove(),
        $(this).contents().find(".divider-3").remove(),
        $(this).contents().find(".widget-sidebar").remove(),
        $(this).contents().find(".post-infor").remove(),
        $(this).contents().find(".admin-tools").remove(),
        $(this).contents().find(".float-button").remove(),
        $(this)
          .contents()
          .find(".col-lg-9")
          .addClass("col-12")
          .removeClass("col-lg-9"),
        $(this).show();
    }),
  $(".widget-product_filter .color-attribute").length &&
    $(".widget-product_filter .childs-attribute input").on(
      "change",
      function (t) {
        $(".widget-product_filter .childs-attribute").removeClass("checked"),
          $(this).is(":checked") &&
            $(".widget-product_filter .childs-attribute input").each(function (
              t,
              e
            ) {
              $(e).is(":checked") && $(e).parent().addClass("checked");
            });
      }
    ),
  $(document).ready(function () {
    if (
      ($(document).on(
        "click",
        ".page-content .list-category-product .category-child.more",
        function (t) {
          $(this).hasClass("less")
            ? ($(this).remove(),
              $(".page-content .list-category-product").append(
                '<a class="category-child more" title="' +
                  wb_translate.menu_readmore +
                  '"><span> ' +
                  wb_translate.menu_readmore +
                  "</span></a>"
              ),
              $(".page-content .list-category-product")
                .find(".category-child.toggleable")
                .hide())
            : ($(this).remove(),
              $(".page-content .list-category-product").append(
                '<a class="category-child more less" title="' +
                  wb_translate.menu_collapse +
                  '"><span> ' +
                  wb_translate.menu_collapse +
                  "</span></a>"
              ),
              $(".page-content .list-category-product")
                .find(".category-child.toggleable")
                .show());
        }
      ),
      $(".page-content .list-category-product").length &&
        readMoreCategoryChild(
          $(".page-content .list-category-product .category-child")
        ),
      $(".product_layout_item_style3").length &&
        $(".button-show-hide>.btn-primary").each(function () {
          $(this).parents(".product-item").addClass("img-opacity");
        }),
      $(".product_layout_item_style2").length &&
        $(".img-product .btn-primary").each(function () {
          $(this).parents(".product-item").addClass("img-opacity");
        }),
      $(window).width() >= 992 && setBannerFixed(),
      $(".widget-popup").length &&
        "/cart" != window.location.pathname &&
        "/checkout" != window.location.pathname &&
        "/checkout/thankyou" != window.location.pathname &&
        $(".widget-popup").each(function () {
          var t = this,
            e = getCookie(
              "widget_popup_id_" + $(t).find("input[name=widget_id]").val()
            ),
            i = function () {
              $(t).show(), $(t).find(".popup").modal({ show: !0 });
            };
          if (1 == $(t).find("input[name=is_allways]").val())
            setTimeout(i, 1e3 * $(t).find("input[name=stand_by_time]").val()),
              setCookie(
                "widget_popup_id_" + $(t).find("input[name=widget_id]").val(),
                null,
                -1
              );
          else if (($(t).hide(), null == e)) {
            setTimeout(i, 1e3 * $(t).find("input[name=stand_by_time]").val());
            var n = $(t).find("input[name=show_again]").val();
            "" == n && (n = 24),
              setCookie(
                "widget_popup_id_" + $(t).find("input[name=widget_id]").val(),
                $(t).find("input[name=show_again]").val(),
                n / 24
              );
          }
        }),
      (width_first = $(window).width()),
      $(".widget-call_to_action .btn-item").length)
    ) {
      var t = $(document)
        .find(".widget-call_to_action a.btn-item")
        .attr("href");
      t.includes("#") && $(document).find(t).hide();
    }
    $(".time-circles").length && TimeCirclesCountdown(),
      ($(".menu_mobile_style2").length || $(".menu_mobile_style6").length) &&
        (menuWidthMobile(),
        $(document).on(
          "click",
          ".width-menu-mobile .btn-toggle-mobile-menu",
          function (t) {
            $(this).parent().find(".navbar-menu").slideToggle();
          }
        )),
      $(".widget_product_body.style6").length &&
        setTimeout(function () {
          $(".widget_product_body.style6").each(function () {
            styleIsotope(this);
          });
        }, 1e3),
      $(".widget_post_body.style7").length &&
        setTimeout(function () {
          $(".widget_post_body.style7").each(function () {
            styleIsotope(this);
          });
        }, 1e3),
      $(".formProductFilter").length && formatFilter(),
      setTimeout(sectionFixed, 5e3),
      initDatePicker(),
      $(".widget-partner .service-list-3").length &&
        ($(".service-list-3")
          .ticker({
            speed:
              null != $(".service-list-3").data("speed")
                ? $(".service-list-3").data("speed")
                : 60,
            pauseOnHover: !0,
            item: ".service-list-3 .item",
          })
          .data("ticker"),
        $(".widget-partner .service-list-3")
          .find(".js-ticker-track")
          .addClass("center-vertical")),
      $(".youtube-carousel").length &&
        $(".youtube-carousel").each(function () {
          initCarousel($(this));
        }),
      $(".related-carousel").length &&
        $(".related-carousel").each(function () {
          initCarousel($(this));
        }),
      $(".post-related-carousel").length &&
        $(".post-related-carousel").each(function () {
          initCarousel($(this));
        }),
      $(".product-detail-carousel").length &&
        $(".product-detail-carousel").each(function () {
          initCarousel($(this));
        }),
      $(".w-product-carousel-style2").length &&
        $(".w-product-carousel-style2").each(function () {
          initCarousel($(this));
        }),
      $(".w-product-carousel-style4").length &&
        $(".w-product-carousel-style4").each(function () {
          initCarousel($(this));
        }),
      $(".w-product-carousel-style14").length &&
        $(".w-product-carousel-style14").each(function () {
          initCarousel($(this));
        }),
      $(".w-product-carousel-style14-2").length &&
        $(".w-product-carousel-style14-2").each(function () {
          initCarousel($(this));
        }),
      $(".w-product-carousel-style14-3").length &&
        $(".w-product-carousel-style14-3").each(function () {
          initCarousel($(this));
        }),
      $(".w-post-carousel-style2").length &&
        $(".w-post-carousel-style2").each(function () {
          initCarousel($(this));
        }),
      $(".w-post-carousel-style4").length &&
        $(".w-post-carousel-style4").each(function () {
          initCarousel($(this));
        }),
      $(".w-partner-carousel").length &&
        $(".w-partner-carousel").each(function () {
          initCarousel($(this));
        }),
      $(".w-partner-carousel-footer").length &&
        $(".w-partner-carousel-footer").each(function () {
          initCarousel($(this));
        }),
      $(".w-slider-carousel").length &&
        $(".w-slider-carousel").each(function () {
          initCarousel($(this));
          var t = $(this).find(".img-sub-slider").data("animation");
          $(this).find(".owl-item.active").find(".img-sub-slider").addClass(t),
            $(this).on("changed.owl.carousel", function (e) {
              $(this).find(".img-sub-slider").removeClass(t);
              var i = e.relatedTarget.current();
              (t = $(this)
                .find(".owl-item")
                .eq(i)
                .find(".img-sub-slider")
                .data("animation")),
                $(this)
                  .find(".owl-item")
                  .eq(i)
                  .find(".img-sub-slider")
                  .addClass(t);
            });
        }),
      $(".w-testimonial-carousel-1").length &&
        $(".w-testimonial-carousel-1").each(function () {
          initCarousel($(this));
        }),
      $(".w-testimonial-carousel-2").length &&
        $(".w-testimonial-carousel-2").each(function () {
          initCarousel($(this));
        }),
      $(".w-testimonial-carousel-3").length &&
        $(".w-testimonial-carousel-3").each(function () {
          initCarousel($(this));
        }),
      $(".w-testimonial-carousel-4").length &&
        $(".w-testimonial-carousel-4").each(function () {
          initCarousel($(this));
        }),
      $(".w-testimonial-carousel-6").length &&
        $(".w-testimonial-carousel-6").each(function () {
          initCarousel($(this));
        }),
      $(".w-service-style1").length &&
        $(".w-service-style1").each(function () {
          initCarousel($(this));
        }),
      $(".w-service-style2").length &&
        $(".w-service-style2").each(function () {
          initCarousel($(this));
        }),
      $(".w-service-style3").length &&
        $(".w-service-style3").each(function () {
          initCarousel($(this));
        }),
      $(".w-service-style5").length &&
        $(".w-service-style5").each(function () {
          initCarousel($(this));
        }),
      $(".w-service-style7").length &&
        $(".w-service-style7").each(function () {
          initCarousel($(this));
        }),
      $(".homepage .widget_product_body.style6 .isoProduct").length &&
        equalize(
          ".homepage .widget_product_body.style6 .isoProduct",
          ".element-item"
        ),
      $(".homepage .widget_post_body.style7 .isoPost").length &&
        equalize(
          ".homepage .widget_post_body.style7 .isoPost",
          ".element-item"
        ),
      $(".service_price.style2 .justify-content-center").length &&
        equalize(
          ".service_price.style2 .justify-content-center",
          ".set-height"
        ),
      $(".title-tab.nav-tabs li").on("click", function (t) {
        $(window).lazyLoadXT();
      }),
      setTimeout(productListActive, 300),
      $(".but-style-list").on("click", function (t) {
        $(".blog-item").addClass("product-list-view"),
          $(".blog-item").removeClass("product-grid-view"),
          $(".but-style-1").removeClass("active"),
          $(this).addClass("active"),
          setCookie("display_style", "list", 7);
      }),
      $(".but-style-grid").on("click", function (t) {
        $(".blog-item").addClass("product-grid-view"),
          $(".blog-item").removeClass("product-list-view"),
          $(".but-style-1").removeClass("active"),
          $(this).addClass("active"),
          setCookie("display_style", "grid", 7);
      }),
      $(".select_products > option").each(function () {
        if (-1 != window.location.href.indexOf(this.value)) {
          selected = this.value.split("=");
          var t = selected[0],
            e = selected[1];
          return (
            $(".formProductFilter .sort_option").length &&
              $(".formProductFilter .sort_option").remove(),
            $(".formProductFilter").append(
              '<input class="sort_option" type="hidden" name="'
                .concat(t, '" value="')
                .concat(e, '">')
            ),
            $(this).prop("selected", !0),
            !1
          );
        }
      }),
      $(".select_products").change(function (t) {
        var e = $(this).val().split("=");
        if (1 === e.length) return !1;
        var i = e[0],
          n = e[1];
        if ($(".formProductFilter").length) {
          $(".sort-filter").remove(),
            $(".formProductFilter .sort_option").length &&
              $(".formProductFilter .sort_option").remove(),
            $(".formProductFilter").append(
              '<input class="sort_option" type="hidden" name="'
                .concat(i, '" value="')
                .concat(n, '">')
            );
          var o = window.location.origin + window.location.pathname;
          $(".formProductFilter").attr("action", o),
            $(".formProductFilter").submit();
        } else {
          if (-1 != (o = window.location.href).indexOf("keyword")) {
            var a = window.location.search;
            -1 != a.indexOf("&") && (a = a.substr(0, a.indexOf("&"))),
              (o = window.location.origin + window.location.pathname + a);
          } else o = window.location.origin + window.location.pathname;
          -1 != o.indexOf("#") && (o = o.replace("#", "")),
            (o =
              -1 != o.indexOf("?")
                ? o + "&" + $(this).val()
                : o + "?" + $(this).val()),
            (window.location.href = o);
        }
      }),
      $(".formProductFilter input.type-2").keyup(function (t) {
        if (!(t.which >= 37 && t.which <= 40)) {
          $(this).val(function (t, e) {
            return e.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ".");
          });
          var e = $(this).attr("class"),
            i = $(this).val().replace(/\./g, "");
          "type-2 min-price-1" == e
            ? $(".product-filter.style1 .formProductFilter .showFrom").val(i)
            : "type-2 max-price-1" == e &&
              $(".product-filter.style1 .formProductFilter .showTo").val(i);
        }
      });
    var e = parseInt($("#max-row-coupon").attr("data-value"));
    $(".btn-create-coupon").click(function () {
      e += 1;
      var t = (parseInt($("#get-max-profit").val()) / 2).toFixed(0),
        i = '<div class="row row-item">';
      (i += '<div class="col-lg-5 col-sm-5 col-md-5 col-xs-5">'),
        (i += '<div class="form-group">'),
        (i +=
          '<input type="text" onkeyup="validateCoupon(this)" required="" name="coupon[' +
          e +
          '][name]" class="form-control" placeholder="' +
          wb_translate.text_coupon +
          '"/>'),
        (i += "</div>"),
        (i += "</div>"),
        (i += '<div class="col-lg-5 col-sm-5 col-md-5 col-xs-5">'),
        (i += '<div class="form-group">'),
        (i += '<div class="input-group">'),
        (i +=
          '<span class="input-group-addon"> ' +
          wb_translate.text_reduction +
          " </span>"),
        (i +=
          '<input type="number" name="coupon[' +
          e +
          '][money]" required="" class="form-control" value="' +
          t +
          '" min="0" data-dirrty-initial-value="0" data-is-dirrty="false" placeholder="' +
          wb_translate.text_reduction +
          '">'),
        (i += '<span class="input-group-addon"> % </span>'),
        (i += "</div>"),
        (i += "</div>"),
        (i += "</div>"),
        (i += '<div class="col-lg-2 col-sm-2 col-md-2 col-xs-2 text-right">'),
        (i +=
          '<button class="btn btn-danger removerow mb-3" type="button" data-value="">'),
        (i += '<i class="fa fa-minus-circle"></i>'),
        (i += "</button>"),
        (i += "</div>"),
        (i += "</div>"),
        $("#id-show-data").append(i);
    }),
      $(".coupon-input").on("keyup", function (t) {
        validateCoupon(this);
      }),
      $("#id-show-data").on("click", ".removerow", function (t) {
        var e = $(this).attr("data-value");
        "" != e
          ? 1 == confirm(wb_translate.message_alert_discount_confirm) &&
            (deleteCoupon(e), $(this).parents(".row-item").remove())
          : $(this).parents(".row-item").remove();
      }),
      $(".counterup").length &&
        $(".counterup").each(function () {
          var t = 0,
            e = $(this);
          $(window).scroll(function () {
            var i = e.offset().top - window.innerHeight;
            0 == t &&
              $(window).scrollTop() > i &&
              (e.find(".counter").each(function () {
                var t = $(this),
                  e = t.attr("data-count");
                $({ countNum: t.text() }).animate(
                  { countNum: e },
                  {
                    duration: 2e3,
                    easing: "swing",
                    step: function () {
                      t.text(Math.floor(this.countNum));
                    },
                    complete: function () {
                      t.text(this.countNum);
                    },
                  }
                );
              }),
              e.find(".progress-bar").each(function () {
                var t = $(this).data("percent");
                $(this), $(this).animate({ width: t });
              }),
              (t = 1));
          });
        }),
      $("body").hasClass("keep-loading") || $("#loading").fadeOut(),
      $(
        ".ecommerce-0.product_layout_item_style1 .product-view .product-grid-view .product-item .photoframe"
      ).each(function () {
        0 == $(this).find(".btn-purchased>a").length &&
          $(this).css("padding-bottom", "10px");
      });
  }),
  jQuery(document).ready(function () {
    $(".scroll-to-top").on("click", function (t) {
      t.preventDefault(), $("html, body").animate({ scrollTop: 0 }, "slow");
    });
  }),
  jQuery(window).on("scroll", function () {
    $(this).scrollTop() > 200
      ? $(".scroll-to-top").fadeIn()
      : $(".scroll-to-top").fadeOut();
  }),
  $(".slider-range").length &&
    $(".slider-range").slider({
      range: !0,
      min: 0,
      step: 1e3,
      max: $("input[name='filter_max_price']").val(),
      values: [
        $("input[name='price_from']").val(),
        $("input[name='price_to']").val(),
      ],
      slide: function (t, e) {
        $(".min-price-2").html(e.values[0]),
          (suffix = ""),
          e.values[1] == $(".max-price-2").data("max") && (suffix = " +"),
          $(".max-price-2").html(e.values[1] + suffix),
          formatFilter();
      },
      change: function (t, e) {
        $("input[name='price_from']").val(
          $(".slider-range").slider("values", 0)
        ),
          $("input[name='price_to']").val(
            $(".slider-range").slider("values", 1)
          );
      },
    }),
  $(".form_booking_service").length &&
    ($(".form_booking_service").on("submit", function (t) {
      t.preventDefault();
      var e = $(this);
      $(e).find("button[name=submit]").attr("disabled", "disabled"),
        $.ajax({
          url: $(e).attr("action"),
          method: "POST",
          data: $(e).serialize(),
        })
          .done(function (t) {
            $(".booking-display-message").text(t.message),
              $(".booking-display-message").show(),
              $(e).trigger("reset"),
              init(),
              $(e).find("button[name=submit]").removeAttr("disabled");
          })
          .fail(function (t) {
            $(".booking-display-message").text(t.message),
              $(".booking-display-message").show(),
              $(e).find("button[name=submit]").removeAttr("disabled");
          });
    }),
    $(document).on("click", function () {
      $(".booking-display-message").hide();
    })),
  $(".contact-form-header").length &&
    ($(".contact-form-header").on("submit", function (t) {
      t.preventDefault();
      var e = $(this);
      $(e).find("button[name=submit]").attr("disabled", "disabled"),
        $.ajax({
          url: $(e).attr("action"),
          method: "POST",
          data: $(e).serialize(),
        })
          .done(function (t) {
            $(e).find(".alert-success").show(),
              $(e).trigger("reset"),
              $(e).find("button[name=submit]").removeAttr("disabled");
          })
          .fail(function (t) {
            $(e).find(".alert-danger").show(),
              $(e).find("button[name=submit]").removeAttr("disabled");
          });
    }),
    $(document).on("click", function () {
      $(".booking-display-message").hide();
    })),
  $(document)
    .find(
      ".widget-product ul.tab_list li a.tab-item, .widget-product_category ul.tab_list li a.tab-item, .widget-post ul.tab_list li a.tab-item, .widget-post_category ul.tab_list li a.tab-item"
    )
    .on("click", function () {
      if (
        ($(this).removeClass("active"),
        0 == $($(this).attr("href")).children().length)
      ) {
        $($(this).attr("href")).addClass("loading");
        var t = this;
        $.ajax({
          url:
            $(t).parents(".container").data("ajax") +
            "&category_id=" +
            $(t).data("id"),
          headers: { Authorization: "Bearer " + wb_token_public },
          method: "GET",
        }).done(function (e) {
          $($(t).attr("href")).empty().append(e),
            $($(t).attr("href")).removeClass("loading").addClass("loaded"),
            initCarousel($($(t).attr("href")).find(".owl-carousel")),
            $($(t).attr("href")).find("input.rating").rating(),
            $(window).lazyLoadXT();
        });
      }
    }),
  $(document).on("click", "#toc .toggleTocList", function () {
    $(document).find("#toc-list").toggle(),
      $(this).text() == wb_translate.hide
        ? $(this).text(wb_translate.show)
        : $(this).text(wb_translate.hide);
  }),
  $(document).ready(function () {
    tableofcontents(),
      $(".btn-popup-booking-form").on("click", function (t) {
        t.preventDefault(),
          $("#popup_booking_form.widget.widget-popup .modal").modal({
            show: !0,
          }),
          $("#popup_booking_form.widget.widget-popup").addClass("showing"),
          $(".modal-backdrop.fade").addClass("showing");
      });
  });
var defaultOptions = {
    item: "div",
    pauseOnHover: !1,
    speed: 60,
    pauseAt: "",
    delay: 500,
  },
  rafSupported = !0;
function getSupportedTransform() {
  for (
    var t =
        "transform WebkitTransform MozTransform OTransform msTransform".split(
          " "
        ),
      e = document.createElement("div"),
      i = 0;
    i < t.length;
    i++
  )
    if (e && void 0 !== e.style[t[i]]) return t[i];
  return !1;
}
var requestAnimFrame =
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function (t) {
      (rafSupported = !1), window.setTimeout(t, 1e3 / 60);
    },
  logger = function (t) {
    return function () {};
  },
  log$1 = logger("brain"),
  FPSs = [60],
  tickers = [];
function getFps() {
  if (!rafSupported) return 60;
  var t = FPSs.length;
  return (
    FPSs.reduce(function (t, e) {
      return t + e;
    }) / t
  );
}
var brain = {
    get fps() {
      return getFps();
    },
    get tickers() {
      return tickers;
    },
    init: function (t) {
      var e = 0,
        i = 0;
      if (
        (requestAnimFrame(function t() {
          e++,
            tickers.length &&
              tickers.forEach(function (t) {
                return t.advance();
              }),
            requestAnimFrame(t);
        }),
        rafSupported)
      ) {
        var n = void 0;
        t(window)
          .on("load focus", function () {
            log$1("Frame Count: %d, FPS Interval: %d", e, i),
              !n &&
                document.hasFocus() &&
                ((i = e),
                (n = setInterval(function () {
                  var t = e - i;
                  for (FPSs.push(t); FPSs.length > 10; ) FPSs.shift();
                  log$1(getFps()), (i = e);
                }, 1e3)));
          })
          .on("blur", function () {
            clearInterval(n), (n = null);
          });
      }
    },
  },
  asyncGenerator = (function () {
    function t(t) {
      this.value = t;
    }
    function e(e) {
      var i, n;
      function o(i, n) {
        try {
          var r = e[i](n),
            s = r.value;
          s instanceof t
            ? Promise.resolve(s.value).then(
                function (t) {
                  o("next", t);
                },
                function (t) {
                  o("throw", t);
                }
              )
            : a(r.done ? "return" : "normal", r.value);
        } catch (t) {
          a("throw", t);
        }
      }
      function a(t, e) {
        switch (t) {
          case "return":
            i.resolve({ value: e, done: !0 });
            break;
          case "throw":
            i.reject(e);
            break;
          default:
            i.resolve({ value: e, done: !1 });
        }
        (i = i.next) ? o(i.key, i.arg) : (n = null);
      }
      (this._invoke = function (t, e) {
        return new Promise(function (a, r) {
          var s = { key: t, arg: e, resolve: a, reject: r, next: null };
          n ? (n = n.next = s) : ((i = n = s), o(t, e));
        });
      }),
        "function" != typeof e.return && (this.return = void 0);
    }
    return (
      "function" == typeof Symbol &&
        Symbol.asyncIterator &&
        (e.prototype[Symbol.asyncIterator] = function () {
          return this;
        }),
      (e.prototype.next = function (t) {
        return this._invoke("next", t);
      }),
      (e.prototype.throw = function (t) {
        return this._invoke("throw", t);
      }),
      (e.prototype.return = function (t) {
        return this._invoke("return", t);
      }),
      {
        wrap: function (t) {
          return function () {
            return new e(t.apply(this, arguments));
          };
        },
        await: function (e) {
          return new t(e);
        },
      }
    );
  })(),
  classCallCheck = function (t, e) {
    if (!(t instanceof e))
      throw new TypeError("Cannot call a class as a function");
  },
  createClass = (function () {
    function t(t, e) {
      for (var i = 0; i < e.length; i++) {
        var n = e[i];
        (n.enumerable = n.enumerable || !1),
          (n.configurable = !0),
          "value" in n && (n.writable = !0),
          Object.defineProperty(t, n.key, n);
      }
    }
    return function (e, i, n) {
      return i && t(e.prototype, i), n && t(e, n), e;
    };
  })(),
  log$2 = logger("class"),
  Ticker = (function () {
    function t(e, i) {
      classCallCheck(this, t),
        (this.elem = e),
        (this.settings = i),
        (this.__offset = 0),
        (this.__pauseTracker = 0),
        this.build();
    }
    return (
      createClass(
        t,
        [
          {
            key: "build",
            value: function () {
              var t = this;
              if (!this.started) {
                this.started = !0;
                var e = document.createElement("div");
                (e.className = "js-ticker-track"),
                  this.elem.addClass("js-ticker"),
                  this.elem
                    .children(this.settings.item)
                    .addClass("js-ticker-item")
                    .appendTo(e),
                  this.elem.append(e),
                  (this.track = this.elem.find(".js-ticker-track")),
                  (this.__items = this.track.children(".js-ticker-item")),
                  (this.__first = this.__items.first()),
                  this.__first.attr("data-first", !0);
                var i = this.elem.width() + this.__first.width();
                for (
                  log$2(
                    "(Pre Clones) Target Width: %d, Actual: %d",
                    i,
                    this.elem[0].scrollWidth
                  );
                  this.elem[0].scrollWidth < i;

                )
                  this.__items.each(function (e) {
                    t.track.append(t.__items.eq(e).clone());
                  });
                log$2(
                  "(Post Clones) Target Width: %d, Actual: %d",
                  i,
                  this.elem[0].scrollWidth
                ),
                  this.settings.pauseOnHover &&
                    (function e() {
                      t.elem.one("mouseenter", function () {
                        t.__pauseTracker++,
                          t.elem.one("mouseleave", function () {
                            t.__pauseTracker--, e();
                          });
                      });
                    })(),
                  this.elem.addClass("active"),
                  this.elem.data("ticker", this),
                  brain.tickers.push(this);
              }
            },
          },
          {
            key: "advance",
            value: function () {
              var t = this;
              if (
                ((this.__width = this.__first.outerWidth()),
                !this.__pauseTracker)
              ) {
                (this.__offset += this.settings.speed / brain.fps),
                  this.__offset > this.__width &&
                    ((this.__offset = 0),
                    this.__first.appendTo(this.track),
                    (this.__first = this.track
                      .children(".js-ticker-item")
                      .first()),
                    ("item" === this.settings.pauseAt ||
                      ("track" === this.settings.pauseAt &&
                        this.__first.data("first"))) &&
                      (this.__pauseTracker++,
                      setTimeout(function () {
                        return t.__pauseTracker--;
                      }, this.settings.delay)));
                var e = getSupportedTransform();
                e
                  ? this.track.css(e, "translateX(" + -this.__offset + "px)")
                  : this.track.css("left", -this.__offset + "px");
              }
            },
          },
          {
            key: "pause",
            value: function () {
              this.__manuallyPaused ||
                (this.__pauseTracker++, (this.__manuallyPaused = !0));
            },
          },
          {
            key: "play",
            value: function () {
              this.__manuallyPaused &&
                (this.__pauseTracker--, (this.__manuallyPaused = !1));
            },
          },
          {
            key: "toggle",
            value: function () {
              this.__manuallyPaused ? this.play() : this.pause();
            },
          },
        ],
        [
          {
            key: "version",
            get: function () {
              return "0.0.1";
            },
          },
        ]
      ),
      t
    );
  })(),
  log = logger("entry");
!(function (t) {
  if (!t)
    return console.warn(
      "Whoa there, buddy! Looks like you included the jQuery Ticker plugin without including jQuery first."
    );
  (t.ticker = function (e, i) {
    return new Ticker(t(e), i);
  }),
    (t.fn.ticker = function () {
      var e =
        arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
      return this.each(function () {
        t.ticker(this, t.extend(!0, {}, defaultOptions, e));
      });
    }),
    brain.init(t);
})("undefined" != typeof jQuery ? jQuery : null),
  (function (t, e) {
    "function" == typeof define && define.amd
      ? define("jquery-bridget/jquery-bridget", ["jquery"], function (i) {
          return e(t, i);
        })
      : "object" ==
          ("undefined" == typeof module ? "undefined" : _typeof(module)) &&
        module.exports
      ? (module.exports = e(t, require("jquery")))
      : (t.jQueryBridget = e(t, t.jQuery));
  })(window, function (t, e) {
    "use strict";
    var i = Array.prototype.slice,
      n = t.console,
      o =
        void 0 === n
          ? function () {}
          : function (t) {
              n.error(t);
            };
    function a(n, a, s) {
      (s = s || e || t.jQuery) &&
        (a.prototype.option ||
          (a.prototype.option = function (t) {
            s.isPlainObject(t) &&
              (this.options = s.extend(!0, this.options, t));
          }),
        (s.fn[n] = function (t) {
          var e;
          return "string" == typeof t
            ? (function (t, e, i) {
                var a,
                  r = "$()." + n + '("' + e + '")';
                return (
                  t.each(function (t, l) {
                    var c = s.data(l, n);
                    if (c) {
                      var d = c[e];
                      if (d && "_" != e.charAt(0)) {
                        var u = d.apply(c, i);
                        a = void 0 === a ? u : a;
                      } else o(r + " is not a valid method");
                    } else o(n + " not initialized. Cannot call methods, i.e. " + r);
                  }),
                  void 0 !== a ? a : t
                );
              })(this, t, i.call(arguments, 1))
            : ((e = t),
              this.each(function (t, i) {
                var o = s.data(i, n);
                o
                  ? (o.option(e), o._init())
                  : ((o = new a(i, e)), s.data(i, n, o));
              }),
              this);
        }),
        r(s));
    }
    function r(t) {
      !t || (t && t.bridget) || (t.bridget = a);
    }
    return r(e || t.jQuery), a;
  }),
  (function (t, e) {
    "function" == typeof define && define.amd
      ? define("ev-emitter/ev-emitter", e)
      : "object" ==
          ("undefined" == typeof module ? "undefined" : _typeof(module)) &&
        module.exports
      ? (module.exports = e())
      : (t.EvEmitter = e());
  })("undefined" != typeof window ? window : this, function () {
    function t() {}
    var e = t.prototype;
    return (
      (e.on = function (t, e) {
        if (t && e) {
          var i = (this._events = this._events || {}),
            n = (i[t] = i[t] || []);
          return -1 == n.indexOf(e) && n.push(e), this;
        }
      }),
      (e.once = function (t, e) {
        if (t && e) {
          this.on(t, e);
          var i = (this._onceEvents = this._onceEvents || {});
          return ((i[t] = i[t] || {})[e] = !0), this;
        }
      }),
      (e.off = function (t, e) {
        var i = this._events && this._events[t];
        if (i && i.length) {
          var n = i.indexOf(e);
          return -1 != n && i.splice(n, 1), this;
        }
      }),
      (e.emitEvent = function (t, e) {
        var i = this._events && this._events[t];
        if (i && i.length) {
          (i = i.slice(0)), (e = e || []);
          for (
            var n = this._onceEvents && this._onceEvents[t], o = 0;
            o < i.length;
            o++
          ) {
            var a = i[o];
            n && n[a] && (this.off(t, a), delete n[a]), a.apply(this, e);
          }
          return this;
        }
      }),
      (e.allOff = function () {
        delete this._events, delete this._onceEvents;
      }),
      t
    );
  }),
  (function (t, e) {
    "function" == typeof define && define.amd
      ? define("get-size/get-size", e)
      : "object" ==
          ("undefined" == typeof module ? "undefined" : _typeof(module)) &&
        module.exports
      ? (module.exports = e())
      : (t.getSize = e());
  })(window, function () {
    "use strict";
    function t(t) {
      var e = parseFloat(t);
      return -1 == t.indexOf("%") && !isNaN(e) && e;
    }
    var e =
        "undefined" == typeof console
          ? function () {}
          : function (t) {
              console.error(t);
            },
      i = [
        "paddingLeft",
        "paddingRight",
        "paddingTop",
        "paddingBottom",
        "marginLeft",
        "marginRight",
        "marginTop",
        "marginBottom",
        "borderLeftWidth",
        "borderRightWidth",
        "borderTopWidth",
        "borderBottomWidth",
      ],
      n = i.length;
    function o(t) {
      var i = getComputedStyle(t);
      return (
        i ||
          e(
            "Style returned " +
              i +
              ". Are you running this code in a hidden iframe on Firefox? See https://bit.ly/getsizebug1"
          ),
        i
      );
    }
    var a,
      r = !1;
    return function e(s) {
      if (
        ((function () {
          if (!r) {
            r = !0;
            var i = document.createElement("div");
            (i.style.width = "200px"),
              (i.style.padding = "1px 2px 3px 4px"),
              (i.style.borderStyle = "solid"),
              (i.style.borderWidth = "1px 2px 3px 4px"),
              (i.style.boxSizing = "border-box");
            var n = document.body || document.documentElement;
            n.appendChild(i);
            var s = o(i);
            (a = 200 == Math.round(t(s.width))),
              (e.isBoxSizeOuter = a),
              n.removeChild(i);
          }
        })(),
        "string" == typeof s && (s = document.querySelector(s)),
        s && "object" == _typeof(s) && s.nodeType)
      ) {
        var l = o(s);
        if ("none" == l.display)
          return (function () {
            for (
              var t = {
                  width: 0,
                  height: 0,
                  innerWidth: 0,
                  innerHeight: 0,
                  outerWidth: 0,
                  outerHeight: 0,
                },
                e = 0;
              e < n;
              e++
            )
              t[i[e]] = 0;
            return t;
          })();
        var c = {};
        (c.width = s.offsetWidth), (c.height = s.offsetHeight);
        for (
          var d = (c.isBorderBox = "border-box" == l.boxSizing), u = 0;
          u < n;
          u++
        ) {
          var h = i[u],
            m = l[h],
            f = parseFloat(m);
          c[h] = isNaN(f) ? 0 : f;
        }
        var p = c.paddingLeft + c.paddingRight,
          g = c.paddingTop + c.paddingBottom,
          v = c.marginLeft + c.marginRight,
          y = c.marginTop + c.marginBottom,
          _ = c.borderLeftWidth + c.borderRightWidth,
          b = c.borderTopWidth + c.borderBottomWidth,
          $ = d && a,
          w = t(l.width);
        !1 !== w && (c.width = w + ($ ? 0 : p + _));
        var x = t(l.height);
        return (
          !1 !== x && (c.height = x + ($ ? 0 : g + b)),
          (c.innerWidth = c.width - (p + _)),
          (c.innerHeight = c.height - (g + b)),
          (c.outerWidth = c.width + v),
          (c.outerHeight = c.height + y),
          c
        );
      }
    };
  }),
  (function (t, e) {
    "use strict";
    "function" == typeof define && define.amd
      ? define("desandro-matches-selector/matches-selector", e)
      : "object" ==
          ("undefined" == typeof module ? "undefined" : _typeof(module)) &&
        module.exports
      ? (module.exports = e())
      : (t.matchesSelector = e());
  })(window, function () {
    "use strict";
    var t = (function () {
      var t = window.Element.prototype;
      if (t.matches) return "matches";
      if (t.matchesSelector) return "matchesSelector";
      for (var e = ["webkit", "moz", "ms", "o"], i = 0; i < e.length; i++) {
        var n = e[i] + "MatchesSelector";
        if (t[n]) return n;
      }
    })();
    return function (e, i) {
      return e[t](i);
    };
  }),
  (function (t, e) {
    "function" == typeof define && define.amd
      ? define(
          "fizzy-ui-utils/utils",
          ["desandro-matches-selector/matches-selector"],
          function (i) {
            return e(t, i);
          }
        )
      : "object" ==
          ("undefined" == typeof module ? "undefined" : _typeof(module)) &&
        module.exports
      ? (module.exports = e(t, require("desandro-matches-selector")))
      : (t.fizzyUIUtils = e(t, t.matchesSelector));
  })(window, function (t, e) {
    var i = {
        extend: function (t, e) {
          for (var i in e) t[i] = e[i];
          return t;
        },
        modulo: function (t, e) {
          return ((t % e) + e) % e;
        },
      },
      n = Array.prototype.slice;
    (i.makeArray = function (t) {
      return Array.isArray(t)
        ? t
        : null == t
        ? []
        : "object" == _typeof(t) && "number" == typeof t.length
        ? n.call(t)
        : [t];
    }),
      (i.removeFrom = function (t, e) {
        var i = t.indexOf(e);
        -1 != i && t.splice(i, 1);
      }),
      (i.getParent = function (t, i) {
        for (; t.parentNode && t != document.body; )
          if (((t = t.parentNode), e(t, i))) return t;
      }),
      (i.getQueryElement = function (t) {
        return "string" == typeof t ? document.querySelector(t) : t;
      }),
      (i.handleEvent = function (t) {
        var e = "on" + t.type;
        this[e] && this[e](t);
      }),
      (i.filterFindElements = function (t, n) {
        t = i.makeArray(t);
        var o = [];
        return (
          t.forEach(function (t) {
            if (t instanceof HTMLElement)
              if (n) {
                e(t, n) && o.push(t);
                for (var i = t.querySelectorAll(n), a = 0; a < i.length; a++)
                  o.push(i[a]);
              } else o.push(t);
          }),
          o
        );
      }),
      (i.debounceMethod = function (t, e, i) {
        i = i || 100;
        var n = t.prototype[e],
          o = e + "Timeout";
        t.prototype[e] = function () {
          var t = this[o];
          clearTimeout(t);
          var e = arguments,
            a = this;
          this[o] = setTimeout(function () {
            n.apply(a, e), delete a[o];
          }, i);
        };
      }),
      (i.docReady = function (t) {
        var e = document.readyState;
        "complete" == e || "interactive" == e
          ? setTimeout(t)
          : document.addEventListener("DOMContentLoaded", t);
      }),
      (i.toDashed = function (t) {
        return t
          .replace(/(.)([A-Z])/g, function (t, e, i) {
            return e + "-" + i;
          })
          .toLowerCase();
      });
    var o = t.console;
    return (
      (i.htmlInit = function (e, n) {
        i.docReady(function () {
          var a = i.toDashed(n),
            r = "data-" + a,
            s = document.querySelectorAll("[" + r + "]"),
            l = document.querySelectorAll(".js-" + a),
            c = i.makeArray(s).concat(i.makeArray(l)),
            d = r + "-options",
            u = t.jQuery;
          c.forEach(function (t) {
            var i,
              a = t.getAttribute(r) || t.getAttribute(d);
            try {
              i = a && JSON.parse(a);
            } catch (e) {
              return void (
                o &&
                o.error("Error parsing " + r + " on " + t.className + ": " + e)
              );
            }
            var s = new e(t, i);
            u && u.data(t, n, s);
          });
        });
      }),
      i
    );
  }),
  (function (t, e) {
    "function" == typeof define && define.amd
      ? define(
          "outlayer/item",
          ["ev-emitter/ev-emitter", "get-size/get-size"],
          e
        )
      : "object" ==
          ("undefined" == typeof module ? "undefined" : _typeof(module)) &&
        module.exports
      ? (module.exports = e(require("ev-emitter"), require("get-size")))
      : ((t.Outlayer = {}), (t.Outlayer.Item = e(t.EvEmitter, t.getSize)));
  })(window, function (t, e) {
    "use strict";
    var i = document.documentElement.style,
      n = "string" == typeof i.transition ? "transition" : "WebkitTransition",
      o = "string" == typeof i.transform ? "transform" : "WebkitTransform",
      a = {
        WebkitTransition: "webkitTransitionEnd",
        transition: "transitionend",
      }[n],
      r = {
        transform: o,
        transition: n,
        transitionDuration: n + "Duration",
        transitionProperty: n + "Property",
        transitionDelay: n + "Delay",
      };
    function s(t, e) {
      t &&
        ((this.element = t),
        (this.layout = e),
        (this.position = { x: 0, y: 0 }),
        this._create());
    }
    var l = (s.prototype = Object.create(t.prototype));
    (l.constructor = s),
      (l._create = function () {
        (this._transn = { ingProperties: {}, clean: {}, onEnd: {} }),
          this.css({ position: "absolute" });
      }),
      (l.handleEvent = function (t) {
        var e = "on" + t.type;
        this[e] && this[e](t);
      }),
      (l.getSize = function () {
        this.size = e(this.element);
      }),
      (l.css = function (t) {
        var e = this.element.style;
        for (var i in t) e[r[i] || i] = t[i];
      }),
      (l.getPosition = function () {
        var t = getComputedStyle(this.element),
          e = this.layout._getOption("originLeft"),
          i = this.layout._getOption("originTop"),
          n = t[e ? "left" : "right"],
          o = t[i ? "top" : "bottom"],
          a = parseFloat(n),
          r = parseFloat(o),
          s = this.layout.size;
        -1 != n.indexOf("%") && (a = (a / 100) * s.width),
          -1 != o.indexOf("%") && (r = (r / 100) * s.height),
          (a = isNaN(a) ? 0 : a),
          (r = isNaN(r) ? 0 : r),
          (a -= e ? s.paddingLeft : s.paddingRight),
          (r -= i ? s.paddingTop : s.paddingBottom),
          (this.position.x = a),
          (this.position.y = r);
      }),
      (l.layoutPosition = function () {
        var t = this.layout.size,
          e = {},
          i = this.layout._getOption("originLeft"),
          n = this.layout._getOption("originTop"),
          o = i ? "paddingLeft" : "paddingRight",
          a = i ? "left" : "right",
          r = i ? "right" : "left",
          s = this.position.x + t[o];
        (e[a] = this.getXValue(s)), (e[r] = "");
        var l = n ? "paddingTop" : "paddingBottom",
          c = n ? "top" : "bottom",
          d = n ? "bottom" : "top",
          u = this.position.y + t[l];
        (e[c] = this.getYValue(u)),
          (e[d] = ""),
          this.css(e),
          this.emitEvent("layout", [this]);
      }),
      (l.getXValue = function (t) {
        var e = this.layout._getOption("horizontal");
        return this.layout.options.percentPosition && !e
          ? (t / this.layout.size.width) * 100 + "%"
          : t + "px";
      }),
      (l.getYValue = function (t) {
        var e = this.layout._getOption("horizontal");
        return this.layout.options.percentPosition && e
          ? (t / this.layout.size.height) * 100 + "%"
          : t + "px";
      }),
      (l._transitionTo = function (t, e) {
        this.getPosition();
        var i = this.position.x,
          n = this.position.y,
          o = t == this.position.x && e == this.position.y;
        if ((this.setPosition(t, e), !o || this.isTransitioning)) {
          var a = t - i,
            r = e - n,
            s = {};
          (s.transform = this.getTranslate(a, r)),
            this.transition({
              to: s,
              onTransitionEnd: { transform: this.layoutPosition },
              isCleaning: !0,
            });
        } else this.layoutPosition();
      }),
      (l.getTranslate = function (t, e) {
        return (
          "translate3d(" +
          (t = this.layout._getOption("originLeft") ? t : -t) +
          "px, " +
          (e = this.layout._getOption("originTop") ? e : -e) +
          "px, 0)"
        );
      }),
      (l.goTo = function (t, e) {
        this.setPosition(t, e), this.layoutPosition();
      }),
      (l.moveTo = l._transitionTo),
      (l.setPosition = function (t, e) {
        (this.position.x = parseFloat(t)), (this.position.y = parseFloat(e));
      }),
      (l._nonTransition = function (t) {
        for (var e in (this.css(t.to),
        t.isCleaning && this._removeStyles(t.to),
        t.onTransitionEnd))
          t.onTransitionEnd[e].call(this);
      }),
      (l.transition = function (t) {
        if (parseFloat(this.layout.options.transitionDuration)) {
          var e = this._transn;
          for (var i in t.onTransitionEnd) e.onEnd[i] = t.onTransitionEnd[i];
          for (i in t.to)
            (e.ingProperties[i] = !0), t.isCleaning && (e.clean[i] = !0);
          t.from && (this.css(t.from), this.element.offsetHeight),
            this.enableTransition(t.to),
            this.css(t.to),
            (this.isTransitioning = !0);
        } else this._nonTransition(t);
      });
    var c =
      "opacity," +
      o.replace(/([A-Z])/g, function (t) {
        return "-" + t.toLowerCase();
      });
    (l.enableTransition = function () {
      if (!this.isTransitioning) {
        var t = this.layout.options.transitionDuration;
        (t = "number" == typeof t ? t + "ms" : t),
          this.css({
            transitionProperty: c,
            transitionDuration: t,
            transitionDelay: this.staggerDelay || 0,
          }),
          this.element.addEventListener(a, this, !1);
      }
    }),
      (l.onwebkitTransitionEnd = function (t) {
        this.ontransitionend(t);
      }),
      (l.onotransitionend = function (t) {
        this.ontransitionend(t);
      });
    var d = { "-webkit-transform": "transform" };
    (l.ontransitionend = function (t) {
      if (t.target === this.element) {
        var e = this._transn,
          i = d[t.propertyName] || t.propertyName;
        delete e.ingProperties[i],
          (function (t) {
            for (var e in t) return !1;
            return !0;
          })(e.ingProperties) && this.disableTransition(),
          i in e.clean &&
            ((this.element.style[t.propertyName] = ""), delete e.clean[i]),
          i in e.onEnd && (e.onEnd[i].call(this), delete e.onEnd[i]),
          this.emitEvent("transitionEnd", [this]);
      }
    }),
      (l.disableTransition = function () {
        this.removeTransitionStyles(),
          this.element.removeEventListener(a, this, !1),
          (this.isTransitioning = !1);
      }),
      (l._removeStyles = function (t) {
        var e = {};
        for (var i in t) e[i] = "";
        this.css(e);
      });
    var u = {
      transitionProperty: "",
      transitionDuration: "",
      transitionDelay: "",
    };
    return (
      (l.removeTransitionStyles = function () {
        this.css(u);
      }),
      (l.stagger = function (t) {
        (t = isNaN(t) ? 0 : t), (this.staggerDelay = t + "ms");
      }),
      (l.removeElem = function () {
        this.element.parentNode.removeChild(this.element),
          this.css({ display: "" }),
          this.emitEvent("remove", [this]);
      }),
      (l.remove = function () {
        n && parseFloat(this.layout.options.transitionDuration)
          ? (this.once("transitionEnd", function () {
              this.removeElem();
            }),
            this.hide())
          : this.removeElem();
      }),
      (l.reveal = function () {
        delete this.isHidden, this.css({ display: "" });
        var t = this.layout.options,
          e = {};
        (e[this.getHideRevealTransitionEndProperty("visibleStyle")] =
          this.onRevealTransitionEnd),
          this.transition({
            from: t.hiddenStyle,
            to: t.visibleStyle,
            isCleaning: !0,
            onTransitionEnd: e,
          });
      }),
      (l.onRevealTransitionEnd = function () {
        this.isHidden || this.emitEvent("reveal");
      }),
      (l.getHideRevealTransitionEndProperty = function (t) {
        var e = this.layout.options[t];
        if (e.opacity) return "opacity";
        for (var i in e) return i;
      }),
      (l.hide = function () {
        (this.isHidden = !0), this.css({ display: "" });
        var t = this.layout.options,
          e = {};
        (e[this.getHideRevealTransitionEndProperty("hiddenStyle")] =
          this.onHideTransitionEnd),
          this.transition({
            from: t.visibleStyle,
            to: t.hiddenStyle,
            isCleaning: !0,
            onTransitionEnd: e,
          });
      }),
      (l.onHideTransitionEnd = function () {
        this.isHidden &&
          (this.css({ display: "none" }), this.emitEvent("hide"));
      }),
      (l.destroy = function () {
        this.css({
          position: "",
          left: "",
          right: "",
          top: "",
          bottom: "",
          transition: "",
          transform: "",
        });
      }),
      s
    );
  }),
  (function (t, e) {
    "use strict";
    "function" == typeof define && define.amd
      ? define(
          "outlayer/outlayer",
          [
            "ev-emitter/ev-emitter",
            "get-size/get-size",
            "fizzy-ui-utils/utils",
            "./item",
          ],
          function (i, n, o, a) {
            return e(t, i, n, o, a);
          }
        )
      : "object" ==
          ("undefined" == typeof module ? "undefined" : _typeof(module)) &&
        module.exports
      ? (module.exports = e(
          t,
          require("ev-emitter"),
          require("get-size"),
          require("fizzy-ui-utils"),
          require("./item")
        ))
      : (t.Outlayer = e(
          t,
          t.EvEmitter,
          t.getSize,
          t.fizzyUIUtils,
          t.Outlayer.Item
        ));
  })(window, function (t, e, i, n, o) {
    "use strict";
    var a = t.console,
      r = t.jQuery,
      s = function () {},
      l = 0,
      c = {};
    function d(t, e) {
      var i = n.getQueryElement(t);
      if (i) {
        (this.element = i),
          r && (this.$element = r(this.element)),
          (this.options = n.extend({}, this.constructor.defaults)),
          this.option(e);
        var o = ++l;
        (this.element.outlayerGUID = o),
          (c[o] = this),
          this._create(),
          this._getOption("initLayout") && this.layout();
      } else a && a.error("Bad element for " + this.constructor.namespace + ": " + (i || t));
    }
    (d.namespace = "outlayer"),
      (d.Item = o),
      (d.defaults = {
        containerStyle: { position: "relative" },
        initLayout: !0,
        originLeft: !0,
        originTop: !0,
        resize: !0,
        resizeContainer: !0,
        transitionDuration: "0.4s",
        hiddenStyle: { opacity: 0, transform: "scale(0.001)" },
        visibleStyle: { opacity: 1, transform: "scale(1)" },
      });
    var u = d.prototype;
    function h(t) {
      function e() {
        t.apply(this, arguments);
      }
      return (
        (e.prototype = Object.create(t.prototype)),
        (e.prototype.constructor = e),
        e
      );
    }
    n.extend(u, e.prototype),
      (u.option = function (t) {
        n.extend(this.options, t);
      }),
      (u._getOption = function (t) {
        var e = this.constructor.compatOptions[t];
        return e && void 0 !== this.options[e]
          ? this.options[e]
          : this.options[t];
      }),
      (d.compatOptions = {
        initLayout: "isInitLayout",
        horizontal: "isHorizontal",
        layoutInstant: "isLayoutInstant",
        originLeft: "isOriginLeft",
        originTop: "isOriginTop",
        resize: "isResizeBound",
        resizeContainer: "isResizingContainer",
      }),
      (u._create = function () {
        this.reloadItems(),
          (this.stamps = []),
          this.stamp(this.options.stamp),
          n.extend(this.element.style, this.options.containerStyle),
          this._getOption("resize") && this.bindResize();
      }),
      (u.reloadItems = function () {
        this.items = this._itemize(this.element.children);
      }),
      (u._itemize = function (t) {
        for (
          var e = this._filterFindItemElements(t),
            i = this.constructor.Item,
            n = [],
            o = 0;
          o < e.length;
          o++
        ) {
          var a = new i(e[o], this);
          n.push(a);
        }
        return n;
      }),
      (u._filterFindItemElements = function (t) {
        return n.filterFindElements(t, this.options.itemSelector);
      }),
      (u.getItemElements = function () {
        return this.items.map(function (t) {
          return t.element;
        });
      }),
      (u.layout = function () {
        this._resetLayout(), this._manageStamps();
        var t = this._getOption("layoutInstant"),
          e = void 0 !== t ? t : !this._isLayoutInited;
        this.layoutItems(this.items, e), (this._isLayoutInited = !0);
      }),
      (u._init = u.layout),
      (u._resetLayout = function () {
        this.getSize();
      }),
      (u.getSize = function () {
        this.size = i(this.element);
      }),
      (u._getMeasurement = function (t, e) {
        var n,
          o = this.options[t];
        o
          ? ("string" == typeof o
              ? (n = this.element.querySelector(o))
              : o instanceof HTMLElement && (n = o),
            (this[t] = n ? i(n)[e] : o))
          : (this[t] = 0);
      }),
      (u.layoutItems = function (t, e) {
        (t = this._getItemsForLayout(t)),
          this._layoutItems(t, e),
          this._postLayout();
      }),
      (u._getItemsForLayout = function (t) {
        return t.filter(function (t) {
          return !t.isIgnored;
        });
      }),
      (u._layoutItems = function (t, e) {
        if ((this._emitCompleteOnItems("layout", t), t && t.length)) {
          var i = [];
          t.forEach(function (t) {
            var n = this._getItemLayoutPosition(t);
            (n.item = t), (n.isInstant = e || t.isLayoutInstant), i.push(n);
          }, this),
            this._processLayoutQueue(i);
        }
      }),
      (u._getItemLayoutPosition = function () {
        return { x: 0, y: 0 };
      }),
      (u._processLayoutQueue = function (t) {
        this.updateStagger(),
          t.forEach(function (t, e) {
            this._positionItem(t.item, t.x, t.y, t.isInstant, e);
          }, this);
      }),
      (u.updateStagger = function () {
        var t = this.options.stagger;
        if (null != t)
          return (
            (this.stagger = (function (t) {
              if ("number" == typeof t) return t;
              var e = t.match(/(^\d*\.?\d*)(\w*)/),
                i = e && e[1],
                n = e && e[2];
              return i.length ? (i = parseFloat(i)) * (m[n] || 1) : 0;
            })(t)),
            this.stagger
          );
        this.stagger = 0;
      }),
      (u._positionItem = function (t, e, i, n, o) {
        n ? t.goTo(e, i) : (t.stagger(o * this.stagger), t.moveTo(e, i));
      }),
      (u._postLayout = function () {
        this.resizeContainer();
      }),
      (u.resizeContainer = function () {
        if (this._getOption("resizeContainer")) {
          var t = this._getContainerSize();
          t &&
            (this._setContainerMeasure(t.width, !0),
            this._setContainerMeasure(t.height, !1));
        }
      }),
      (u._getContainerSize = s),
      (u._setContainerMeasure = function (t, e) {
        if (void 0 !== t) {
          var i = this.size;
          i.isBorderBox &&
            (t += e
              ? i.paddingLeft +
                i.paddingRight +
                i.borderLeftWidth +
                i.borderRightWidth
              : i.paddingBottom +
                i.paddingTop +
                i.borderTopWidth +
                i.borderBottomWidth),
            (t = Math.max(t, 0)),
            (this.element.style[e ? "width" : "height"] = t + "px");
        }
      }),
      (u._emitCompleteOnItems = function (t, e) {
        var i = this;
        function n() {
          i.dispatchEvent(t + "Complete", null, [e]);
        }
        var o = e.length;
        if (e && o) {
          var a = 0;
          e.forEach(function (e) {
            e.once(t, r);
          });
        } else n();
        function r() {
          ++a == o && n();
        }
      }),
      (u.dispatchEvent = function (t, e, i) {
        var n = e ? [e].concat(i) : i;
        if ((this.emitEvent(t, n), r))
          if (((this.$element = this.$element || r(this.element)), e)) {
            var o = r.Event(e);
            (o.type = t), this.$element.trigger(o, i);
          } else this.$element.trigger(t, i);
      }),
      (u.ignore = function (t) {
        var e = this.getItem(t);
        e && (e.isIgnored = !0);
      }),
      (u.unignore = function (t) {
        var e = this.getItem(t);
        e && delete e.isIgnored;
      }),
      (u.stamp = function (t) {
        (t = this._find(t)) &&
          ((this.stamps = this.stamps.concat(t)), t.forEach(this.ignore, this));
      }),
      (u.unstamp = function (t) {
        (t = this._find(t)) &&
          t.forEach(function (t) {
            n.removeFrom(this.stamps, t), this.unignore(t);
          }, this);
      }),
      (u._find = function (t) {
        if (t)
          return (
            "string" == typeof t && (t = this.element.querySelectorAll(t)),
            n.makeArray(t)
          );
      }),
      (u._manageStamps = function () {
        this.stamps &&
          this.stamps.length &&
          (this._getBoundingRect(),
          this.stamps.forEach(this._manageStamp, this));
      }),
      (u._getBoundingRect = function () {
        var t = this.element.getBoundingClientRect(),
          e = this.size;
        this._boundingRect = {
          left: t.left + e.paddingLeft + e.borderLeftWidth,
          top: t.top + e.paddingTop + e.borderTopWidth,
          right: t.right - (e.paddingRight + e.borderRightWidth),
          bottom: t.bottom - (e.paddingBottom + e.borderBottomWidth),
        };
      }),
      (u._manageStamp = s),
      (u._getElementOffset = function (t) {
        var e = t.getBoundingClientRect(),
          n = this._boundingRect,
          o = i(t);
        return {
          left: e.left - n.left - o.marginLeft,
          top: e.top - n.top - o.marginTop,
          right: n.right - e.right - o.marginRight,
          bottom: n.bottom - e.bottom - o.marginBottom,
        };
      }),
      (u.handleEvent = n.handleEvent),
      (u.bindResize = function () {
        t.addEventListener("resize", this), (this.isResizeBound = !0);
      }),
      (u.unbindResize = function () {
        t.removeEventListener("resize", this), (this.isResizeBound = !1);
      }),
      (u.onresize = function () {
        this.resize();
      }),
      n.debounceMethod(d, "onresize", 100),
      (u.resize = function () {
        this.isResizeBound && this.needsResizeLayout() && this.layout();
      }),
      (u.needsResizeLayout = function () {
        var t = i(this.element);
        return this.size && t && t.innerWidth !== this.size.innerWidth;
      }),
      (u.addItems = function (t) {
        var e = this._itemize(t);
        return e.length && (this.items = this.items.concat(e)), e;
      }),
      (u.appended = function (t) {
        var e = this.addItems(t);
        e.length && (this.layoutItems(e, !0), this.reveal(e));
      }),
      (u.prepended = function (t) {
        var e = this._itemize(t);
        if (e.length) {
          var i = this.items.slice(0);
          (this.items = e.concat(i)),
            this._resetLayout(),
            this._manageStamps(),
            this.layoutItems(e, !0),
            this.reveal(e),
            this.layoutItems(i);
        }
      }),
      (u.reveal = function (t) {
        if ((this._emitCompleteOnItems("reveal", t), t && t.length)) {
          var e = this.updateStagger();
          t.forEach(function (t, i) {
            t.stagger(i * e), t.reveal();
          });
        }
      }),
      (u.hide = function (t) {
        if ((this._emitCompleteOnItems("hide", t), t && t.length)) {
          var e = this.updateStagger();
          t.forEach(function (t, i) {
            t.stagger(i * e), t.hide();
          });
        }
      }),
      (u.revealItemElements = function (t) {
        var e = this.getItems(t);
        this.reveal(e);
      }),
      (u.hideItemElements = function (t) {
        var e = this.getItems(t);
        this.hide(e);
      }),
      (u.getItem = function (t) {
        for (var e = 0; e < this.items.length; e++) {
          var i = this.items[e];
          if (i.element == t) return i;
        }
      }),
      (u.getItems = function (t) {
        t = n.makeArray(t);
        var e = [];
        return (
          t.forEach(function (t) {
            var i = this.getItem(t);
            i && e.push(i);
          }, this),
          e
        );
      }),
      (u.remove = function (t) {
        var e = this.getItems(t);
        this._emitCompleteOnItems("remove", e),
          e &&
            e.length &&
            e.forEach(function (t) {
              t.remove(), n.removeFrom(this.items, t);
            }, this);
      }),
      (u.destroy = function () {
        var t = this.element.style;
        (t.height = ""),
          (t.position = ""),
          (t.width = ""),
          this.items.forEach(function (t) {
            t.destroy();
          }),
          this.unbindResize();
        var e = this.element.outlayerGUID;
        delete c[e],
          delete this.element.outlayerGUID,
          r && r.removeData(this.element, this.constructor.namespace);
      }),
      (d.data = function (t) {
        var e = (t = n.getQueryElement(t)) && t.outlayerGUID;
        return e && c[e];
      }),
      (d.create = function (t, e) {
        var i = h(d);
        return (
          (i.defaults = n.extend({}, d.defaults)),
          n.extend(i.defaults, e),
          (i.compatOptions = n.extend({}, d.compatOptions)),
          (i.namespace = t),
          (i.data = d.data),
          (i.Item = h(o)),
          n.htmlInit(i, t),
          r && r.bridget && r.bridget(t, i),
          i
        );
      });
    var m = { ms: 1, s: 1e3 };
    return (d.Item = o), d;
  }),
  (function (t, e) {
    "function" == typeof define && define.amd
      ? define("isotope-layout/js/item", ["outlayer/outlayer"], e)
      : "object" ==
          ("undefined" == typeof module ? "undefined" : _typeof(module)) &&
        module.exports
      ? (module.exports = e(require("outlayer")))
      : ((t.Isotope = t.Isotope || {}), (t.Isotope.Item = e(t.Outlayer)));
  })(window, function (t) {
    "use strict";
    function e() {
      t.Item.apply(this, arguments);
    }
    var i = (e.prototype = Object.create(t.Item.prototype)),
      n = i._create;
    (i._create = function () {
      (this.id = this.layout.itemGUID++), n.call(this), (this.sortData = {});
    }),
      (i.updateSortData = function () {
        if (!this.isIgnored) {
          (this.sortData.id = this.id),
            (this.sortData["original-order"] = this.id),
            (this.sortData.random = Math.random());
          var t = this.layout.options.getSortData,
            e = this.layout._sorters;
          for (var i in t) {
            var n = e[i];
            this.sortData[i] = n(this.element, this);
          }
        }
      });
    var o = i.destroy;
    return (
      (i.destroy = function () {
        o.apply(this, arguments), this.css({ display: "" });
      }),
      e
    );
  }),
  (function (t, e) {
    "function" == typeof define && define.amd
      ? define(
          "isotope-layout/js/layout-mode",
          ["get-size/get-size", "outlayer/outlayer"],
          e
        )
      : "object" ==
          ("undefined" == typeof module ? "undefined" : _typeof(module)) &&
        module.exports
      ? (module.exports = e(require("get-size"), require("outlayer")))
      : ((t.Isotope = t.Isotope || {}),
        (t.Isotope.LayoutMode = e(t.getSize, t.Outlayer)));
  })(window, function (t, e) {
    "use strict";
    function i(t) {
      (this.isotope = t),
        t &&
          ((this.options = t.options[this.namespace]),
          (this.element = t.element),
          (this.items = t.filteredItems),
          (this.size = t.size));
    }
    var n = i.prototype;
    return (
      [
        "_resetLayout",
        "_getItemLayoutPosition",
        "_manageStamp",
        "_getContainerSize",
        "_getElementOffset",
        "needsResizeLayout",
        "_getOption",
      ].forEach(function (t) {
        n[t] = function () {
          return e.prototype[t].apply(this.isotope, arguments);
        };
      }),
      (n.needsVerticalResizeLayout = function () {
        var e = t(this.isotope.element);
        return (
          this.isotope.size &&
          e &&
          e.innerHeight != this.isotope.size.innerHeight
        );
      }),
      (n._getMeasurement = function () {
        this.isotope._getMeasurement.apply(this, arguments);
      }),
      (n.getColumnWidth = function () {
        this.getSegmentSize("column", "Width");
      }),
      (n.getRowHeight = function () {
        this.getSegmentSize("row", "Height");
      }),
      (n.getSegmentSize = function (t, e) {
        var i = t + e,
          n = "outer" + e;
        if ((this._getMeasurement(i, n), !this[i])) {
          var o = this.getFirstItemSize();
          this[i] = (o && o[n]) || this.isotope.size["inner" + e];
        }
      }),
      (n.getFirstItemSize = function () {
        var e = this.isotope.filteredItems[0];
        return e && e.element && t(e.element);
      }),
      (n.layout = function () {
        this.isotope.layout.apply(this.isotope, arguments);
      }),
      (n.getSize = function () {
        this.isotope.getSize(), (this.size = this.isotope.size);
      }),
      (i.modes = {}),
      (i.create = function (t, e) {
        function o() {
          i.apply(this, arguments);
        }
        return (
          (o.prototype = Object.create(n)),
          (o.prototype.constructor = o),
          e && (o.options = e),
          (o.prototype.namespace = t),
          (i.modes[t] = o),
          o
        );
      }),
      i
    );
  }),
  (function (t, e) {
    "function" == typeof define && define.amd
      ? define(
          "masonry-layout/masonry",
          ["outlayer/outlayer", "get-size/get-size"],
          e
        )
      : "object" ==
          ("undefined" == typeof module ? "undefined" : _typeof(module)) &&
        module.exports
      ? (module.exports = e(require("outlayer"), require("get-size")))
      : (t.Masonry = e(t.Outlayer, t.getSize));
  })(window, function (t, e) {
    var i = t.create("masonry");
    i.compatOptions.fitWidth = "isFitWidth";
    var n = i.prototype;
    return (
      (n._resetLayout = function () {
        this.getSize(),
          this._getMeasurement("columnWidth", "outerWidth"),
          this._getMeasurement("gutter", "outerWidth"),
          this.measureColumns(),
          (this.colYs = []);
        for (var t = 0; t < this.cols; t++) this.colYs.push(0);
        (this.maxY = 0), (this.horizontalColIndex = 0);
      }),
      (n.measureColumns = function () {
        if ((this.getContainerWidth(), !this.columnWidth)) {
          var t = this.items[0],
            i = t && t.element;
          this.columnWidth = (i && e(i).outerWidth) || this.containerWidth;
        }
        var n = (this.columnWidth += this.gutter),
          o = this.containerWidth + this.gutter,
          a = o / n,
          r = n - (o % n);
        (a = Math[r && r < 1 ? "round" : "floor"](a)),
          (this.cols = Math.max(a, 1));
      }),
      (n.getContainerWidth = function () {
        var t = this._getOption("fitWidth")
            ? this.element.parentNode
            : this.element,
          i = e(t);
        this.containerWidth = i && i.innerWidth;
      }),
      (n._getItemLayoutPosition = function (t) {
        t.getSize();
        var e = t.size.outerWidth % this.columnWidth,
          i = Math[e && e < 1 ? "round" : "ceil"](
            t.size.outerWidth / this.columnWidth
          );
        i = Math.min(i, this.cols);
        for (
          var n = this[
              this.options.horizontalOrder
                ? "_getHorizontalColPosition"
                : "_getTopColPosition"
            ](i, t),
            o = { x: this.columnWidth * n.col, y: n.y },
            a = n.y + t.size.outerHeight,
            r = i + n.col,
            s = n.col;
          s < r;
          s++
        )
          this.colYs[s] = a;
        return o;
      }),
      (n._getTopColPosition = function (t) {
        var e = this._getTopColGroup(t),
          i = Math.min.apply(Math, e);
        return { col: e.indexOf(i), y: i };
      }),
      (n._getTopColGroup = function (t) {
        if (t < 2) return this.colYs;
        for (var e = [], i = this.cols + 1 - t, n = 0; n < i; n++)
          e[n] = this._getColGroupY(n, t);
        return e;
      }),
      (n._getColGroupY = function (t, e) {
        if (e < 2) return this.colYs[t];
        var i = this.colYs.slice(t, t + e);
        return Math.max.apply(Math, i);
      }),
      (n._getHorizontalColPosition = function (t, e) {
        var i = this.horizontalColIndex % this.cols;
        i = t > 1 && i + t > this.cols ? 0 : i;
        var n = e.size.outerWidth && e.size.outerHeight;
        return (
          (this.horizontalColIndex = n ? i + t : this.horizontalColIndex),
          { col: i, y: this._getColGroupY(i, t) }
        );
      }),
      (n._manageStamp = function (t) {
        var i = e(t),
          n = this._getElementOffset(t),
          o = this._getOption("originLeft") ? n.left : n.right,
          a = o + i.outerWidth,
          r = Math.floor(o / this.columnWidth);
        r = Math.max(0, r);
        var s = Math.floor(a / this.columnWidth);
        (s -= a % this.columnWidth ? 0 : 1), (s = Math.min(this.cols - 1, s));
        for (
          var l =
              (this._getOption("originTop") ? n.top : n.bottom) + i.outerHeight,
            c = r;
          c <= s;
          c++
        )
          this.colYs[c] = Math.max(l, this.colYs[c]);
      }),
      (n._getContainerSize = function () {
        this.maxY = Math.max.apply(Math, this.colYs);
        var t = { height: this.maxY };
        return (
          this._getOption("fitWidth") &&
            (t.width = this._getContainerFitWidth()),
          t
        );
      }),
      (n._getContainerFitWidth = function () {
        for (var t = 0, e = this.cols; --e && 0 === this.colYs[e]; ) t++;
        return (this.cols - t) * this.columnWidth - this.gutter;
      }),
      (n.needsResizeLayout = function () {
        var t = this.containerWidth;
        return this.getContainerWidth(), t != this.containerWidth;
      }),
      i
    );
  }),
  (function (t, e) {
    "function" == typeof define && define.amd
      ? define(
          "isotope-layout/js/layout-modes/masonry",
          ["../layout-mode", "masonry-layout/masonry"],
          e
        )
      : "object" ==
          ("undefined" == typeof module ? "undefined" : _typeof(module)) &&
        module.exports
      ? (module.exports = e(
          require("../layout-mode"),
          require("masonry-layout")
        ))
      : e(t.Isotope.LayoutMode, t.Masonry);
  })(window, function (t, e) {
    "use strict";
    var i = t.create("masonry"),
      n = i.prototype,
      o = { _getElementOffset: !0, layout: !0, _getMeasurement: !0 };
    for (var a in e.prototype) o[a] || (n[a] = e.prototype[a]);
    var r = n.measureColumns;
    n.measureColumns = function () {
      (this.items = this.isotope.filteredItems), r.call(this);
    };
    var s = n._getOption;
    return (
      (n._getOption = function (t) {
        return "fitWidth" == t
          ? void 0 !== this.options.isFitWidth
            ? this.options.isFitWidth
            : this.options.fitWidth
          : s.apply(this.isotope, arguments);
      }),
      i
    );
  }),
  (function (t, e) {
    "function" == typeof define && define.amd
      ? define("isotope-layout/js/layout-modes/fit-rows", ["../layout-mode"], e)
      : "object" ==
        ("undefined" == typeof exports ? "undefined" : _typeof(exports))
      ? (module.exports = e(require("../layout-mode")))
      : e(t.Isotope.LayoutMode);
  })(window, function (t) {
    "use strict";
    var e = t.create("fitRows"),
      i = e.prototype;
    return (
      (i._resetLayout = function () {
        (this.x = 0),
          (this.y = 0),
          (this.maxY = 0),
          this._getMeasurement("gutter", "outerWidth");
      }),
      (i._getItemLayoutPosition = function (t) {
        t.getSize();
        var e = t.size.outerWidth + this.gutter,
          i = this.isotope.size.innerWidth + this.gutter;
        0 !== this.x && e + this.x > i && ((this.x = 0), (this.y = this.maxY));
        var n = { x: this.x, y: this.y };
        return (
          (this.maxY = Math.max(this.maxY, this.y + t.size.outerHeight)),
          (this.x += e),
          n
        );
      }),
      (i._getContainerSize = function () {
        return { height: this.maxY };
      }),
      e
    );
  }),
  (function (t, e) {
    "function" == typeof define && define.amd
      ? define("isotope-layout/js/layout-modes/vertical", ["../layout-mode"], e)
      : "object" ==
          ("undefined" == typeof module ? "undefined" : _typeof(module)) &&
        module.exports
      ? (module.exports = e(require("../layout-mode")))
      : e(t.Isotope.LayoutMode);
  })(window, function (t) {
    "use strict";
    var e = t.create("vertical", { horizontalAlignment: 0 }),
      i = e.prototype;
    return (
      (i._resetLayout = function () {
        this.y = 0;
      }),
      (i._getItemLayoutPosition = function (t) {
        t.getSize();
        var e =
            (this.isotope.size.innerWidth - t.size.outerWidth) *
            this.options.horizontalAlignment,
          i = this.y;
        return (this.y += t.size.outerHeight), { x: e, y: i };
      }),
      (i._getContainerSize = function () {
        return { height: this.y };
      }),
      e
    );
  }),
  (function (t, e) {
    "function" == typeof define && define.amd
      ? define(
          [
            "outlayer/outlayer",
            "get-size/get-size",
            "desandro-matches-selector/matches-selector",
            "fizzy-ui-utils/utils",
            "isotope-layout/js/item",
            "isotope-layout/js/layout-mode",
            "isotope-layout/js/layout-modes/masonry",
            "isotope-layout/js/layout-modes/fit-rows",
            "isotope-layout/js/layout-modes/vertical",
          ],
          function (i, n, o, a, r, s) {
            return e(t, i, n, o, a, r, s);
          }
        )
      : "object" ==
          ("undefined" == typeof module ? "undefined" : _typeof(module)) &&
        module.exports
      ? (module.exports = e(
          t,
          require("outlayer"),
          require("get-size"),
          require("desandro-matches-selector"),
          require("fizzy-ui-utils"),
          require("isotope-layout/js/item"),
          require("isotope-layout/js/layout-mode"),
          require("isotope-layout/js/layout-modes/masonry"),
          require("isotope-layout/js/layout-modes/fit-rows"),
          require("isotope-layout/js/layout-modes/vertical")
        ))
      : (t.Isotope = e(
          t,
          t.Outlayer,
          t.getSize,
          t.matchesSelector,
          t.fizzyUIUtils,
          t.Isotope.Item,
          t.Isotope.LayoutMode
        ));
  })(window, function (t, e, i, n, o, a, r) {
    var s = t.jQuery,
      l = String.prototype.trim
        ? function (t) {
            return t.trim();
          }
        : function (t) {
            return t.replace(/^\s+|\s+$/g, "");
          },
      c = e.create("isotope", {
        layoutMode: "masonry",
        isJQueryFiltering: !0,
        sortAscending: !0,
      });
    (c.Item = a), (c.LayoutMode = r);
    var d = c.prototype;
    (d._create = function () {
      for (var t in ((this.itemGUID = 0),
      (this._sorters = {}),
      this._getSorters(),
      e.prototype._create.call(this),
      (this.modes = {}),
      (this.filteredItems = this.items),
      (this.sortHistory = ["original-order"]),
      r.modes))
        this._initLayoutMode(t);
    }),
      (d.reloadItems = function () {
        (this.itemGUID = 0), e.prototype.reloadItems.call(this);
      }),
      (d._itemize = function () {
        for (
          var t = e.prototype._itemize.apply(this, arguments), i = 0;
          i < t.length;
          i++
        )
          t[i].id = this.itemGUID++;
        return this._updateItemsSortData(t), t;
      }),
      (d._initLayoutMode = function (t) {
        var e = r.modes[t],
          i = this.options[t] || {};
        (this.options[t] = e.options ? o.extend(e.options, i) : i),
          (this.modes[t] = new e(this));
      }),
      (d.layout = function () {
        this._isLayoutInited || !this._getOption("initLayout")
          ? this._layout()
          : this.arrange();
      }),
      (d._layout = function () {
        var t = this._getIsInstant();
        this._resetLayout(),
          this._manageStamps(),
          this.layoutItems(this.filteredItems, t),
          (this._isLayoutInited = !0);
      }),
      (d.arrange = function (t) {
        this.option(t), this._getIsInstant();
        var e = this._filter(this.items);
        (this.filteredItems = e.matches),
          this._bindArrangeComplete(),
          this._isInstant
            ? this._noTransition(this._hideReveal, [e])
            : this._hideReveal(e),
          this._sort(),
          this._layout();
      }),
      (d._init = d.arrange),
      (d._hideReveal = function (t) {
        this.reveal(t.needReveal), this.hide(t.needHide);
      }),
      (d._getIsInstant = function () {
        var t = this._getOption("layoutInstant"),
          e = void 0 !== t ? t : !this._isLayoutInited;
        return (this._isInstant = e), e;
      }),
      (d._bindArrangeComplete = function () {
        var t,
          e,
          i,
          n = this;
        function o() {
          t &&
            e &&
            i &&
            n.dispatchEvent("arrangeComplete", null, [n.filteredItems]);
        }
        this.once("layoutComplete", function () {
          (t = !0), o();
        }),
          this.once("hideComplete", function () {
            (e = !0), o();
          }),
          this.once("revealComplete", function () {
            (i = !0), o();
          });
      }),
      (d._filter = function (t) {
        var e = this.options.filter;
        e = e || "*";
        for (
          var i = [], n = [], o = [], a = this._getFilterTest(e), r = 0;
          r < t.length;
          r++
        ) {
          var s = t[r];
          if (!s.isIgnored) {
            var l = a(s);
            l && i.push(s),
              l && s.isHidden ? n.push(s) : l || s.isHidden || o.push(s);
          }
        }
        return { matches: i, needReveal: n, needHide: o };
      }),
      (d._getFilterTest = function (t) {
        return s && this.options.isJQueryFiltering
          ? function (e) {
              return s(e.element).is(t);
            }
          : "function" == typeof t
          ? function (e) {
              return t(e.element);
            }
          : function (e) {
              return n(e.element, t);
            };
      }),
      (d.updateSortData = function (t) {
        var e;
        t ? ((t = o.makeArray(t)), (e = this.getItems(t))) : (e = this.items),
          this._getSorters(),
          this._updateItemsSortData(e);
      }),
      (d._getSorters = function () {
        var t = this.options.getSortData;
        for (var e in t) {
          var i = t[e];
          this._sorters[e] = u(i);
        }
      }),
      (d._updateItemsSortData = function (t) {
        for (var e = t && t.length, i = 0; e && i < e; i++)
          t[i].updateSortData();
      });
    var u = function (t) {
      if ("string" != typeof t) return t;
      var e = l(t).split(" "),
        i = e[0],
        n = i.match(/^\[(.+)\]$/),
        o = (function (t, e) {
          return t
            ? function (e) {
                return e.getAttribute(t);
              }
            : function (t) {
                var i = t.querySelector(e);
                return i && i.textContent;
              };
        })(n && n[1], i),
        a = c.sortDataParsers[e[1]];
      return a
        ? function (t) {
            return t && a(o(t));
          }
        : function (t) {
            return t && o(t);
          };
    };
    (c.sortDataParsers = {
      parseInt: (function (t) {
        function e(e) {
          return t.apply(this, arguments);
        }
        return (
          (e.toString = function () {
            return t.toString();
          }),
          e
        );
      })(function (t) {
        return parseInt(t, 10);
      }),
      parseFloat: (function (t) {
        function e(e) {
          return t.apply(this, arguments);
        }
        return (
          (e.toString = function () {
            return t.toString();
          }),
          e
        );
      })(function (t) {
        return parseFloat(t);
      }),
    }),
      (d._sort = function () {
        if (this.options.sortBy) {
          var t = o.makeArray(this.options.sortBy);
          this._getIsSameSortBy(t) ||
            (this.sortHistory = t.concat(this.sortHistory));
          var e = (function (t, e) {
            return function (i, n) {
              for (var o = 0; o < t.length; o++) {
                var a = t[o],
                  r = i.sortData[a],
                  s = n.sortData[a];
                if (r > s || r < s)
                  return (
                    (r > s ? 1 : -1) * ((void 0 !== e[a] ? e[a] : e) ? 1 : -1)
                  );
              }
              return 0;
            };
          })(this.sortHistory, this.options.sortAscending);
          this.filteredItems.sort(e);
        }
      }),
      (d._getIsSameSortBy = function (t) {
        for (var e = 0; e < t.length; e++)
          if (t[e] != this.sortHistory[e]) return !1;
        return !0;
      }),
      (d._mode = function () {
        var t = this.options.layoutMode,
          e = this.modes[t];
        if (!e) throw new Error("No layout mode: " + t);
        return (e.options = this.options[t]), e;
      }),
      (d._resetLayout = function () {
        e.prototype._resetLayout.call(this), this._mode()._resetLayout();
      }),
      (d._getItemLayoutPosition = function (t) {
        return this._mode()._getItemLayoutPosition(t);
      }),
      (d._manageStamp = function (t) {
        this._mode()._manageStamp(t);
      }),
      (d._getContainerSize = function () {
        return this._mode()._getContainerSize();
      }),
      (d.needsResizeLayout = function () {
        return this._mode().needsResizeLayout();
      }),
      (d.appended = function (t) {
        var e = this.addItems(t);
        if (e.length) {
          var i = this._filterRevealAdded(e);
          this.filteredItems = this.filteredItems.concat(i);
        }
      }),
      (d.prepended = function (t) {
        var e = this._itemize(t);
        if (e.length) {
          this._resetLayout(), this._manageStamps();
          var i = this._filterRevealAdded(e);
          this.layoutItems(this.filteredItems),
            (this.filteredItems = i.concat(this.filteredItems)),
            (this.items = e.concat(this.items));
        }
      }),
      (d._filterRevealAdded = function (t) {
        var e = this._filter(t);
        return (
          this.hide(e.needHide),
          this.reveal(e.matches),
          this.layoutItems(e.matches, !0),
          e.matches
        );
      }),
      (d.insert = function (t) {
        var e = this.addItems(t);
        if (e.length) {
          var i,
            n,
            o = e.length;
          for (i = 0; i < o; i++)
            (n = e[i]), this.element.appendChild(n.element);
          var a = this._filter(e).matches;
          for (i = 0; i < o; i++) e[i].isLayoutInstant = !0;
          for (this.arrange(), i = 0; i < o; i++) delete e[i].isLayoutInstant;
          this.reveal(a);
        }
      });
    var h = d.remove;
    return (
      (d.remove = function (t) {
        t = o.makeArray(t);
        var e = this.getItems(t);
        h.call(this, t);
        for (var i = e && e.length, n = 0; i && n < i; n++) {
          var a = e[n];
          o.removeFrom(this.filteredItems, a);
        }
      }),
      (d.shuffle = function () {
        for (var t = 0; t < this.items.length; t++)
          this.items[t].sortData.random = Math.random();
        (this.options.sortBy = "random"), this._sort(), this._layout();
      }),
      (d._noTransition = function (t, e) {
        var i = this.options.transitionDuration;
        this.options.transitionDuration = 0;
        var n = t.apply(this, e);
        return (this.options.transitionDuration = i), n;
      }),
      (d.getFilteredItemElements = function () {
        return this.filteredItems.map(function (t) {
          return t.element;
        });
      }),
      c
    );
  }),
  $(".wb-email-form").on("submit", function (t) {
    t.preventDefault();
    var e = $(this),
      i = $(e).find('[type="submit"], button').html(),
      n = {
        _token: $('meta[name="csrf-token"]').attr("content"),
        email: e.find("input[name=email]").val() || "",
      };
    return (
      e.find("input[name=email]").attr("required") && (n.required_email = !0),
      e.find("input[name=name]").length &&
        ((n.name = e.find("input[name=name]").val() || ""),
        e.find("input[name=name]").attr("required") && (n.required_name = !0)),
      e.find("input[name=phone]").length &&
        ((n.phone = e.find("input[name=phone]").val() || ""),
        e.find("input[name=phone]").attr("required") &&
          (n.required_phone = !0)),
      e.find("input[name=captcha]").length &&
        ((n.captcha = e.find("input[name=captcha]").val() || ""),
        e.find("input[name=captcha]").attr("required") &&
          (n.required_captcha = !0)),
      $(e)
        .find('[type="submit"], button')
        .attr("disabled", "disabled")
        .html(wb_translate.progressing),
      "" == e.find("input[name=email]").val() && "" == n.phone
        ? ($(e).find('[type="submit"], button').removeAttr("disabled").html(i),
          alert(wb_translate.please_enter))
        : $.ajax({
            type: "POST",
            url: e.attr("action"),
            data: n,
            dataType: "json",
            success: function (t) {
              $(e)
                .find('[type="submit"], button')
                .removeAttr("disabled")
                .html(i),
                $(e).find(".regen-captcha").click(),
                t.success
                  ? (e.trigger("reset"), alert(t.message))
                  : alert(t.message);
            },
          }).fail(function (t) {
            var n = "\n";
            for (var o in ($(e)
              .find('[type="submit"], button')
              .removeAttr("disabled")
              .html(i),
            $(e).find(".regen-captcha").click(),
            t.responseJSON))
              n += t.responseJSON[o] + "\n";
            alert(n);
          }),
      !1
    );
  }),
  $(document).ready(function () {
    $(".product-filter-top .attributes .checkbox-size").length &&
      $(".product-filter-top .attributes .checkbox-size").each(function (t, e) {
        $(this)
          .children(".input-attributes:checked")
          .parent()
          .addClass("checked"),
          $(this)
            .children(".input-attributes:checked")
            .parent()
            .clone()
            .appendTo(".product-filter-top .list-checked"),
          1 == $(".product-filter-top .list-checked .checkbox-size").length &&
            $(".product-filter-top .list-checked .delete-filter").show();
      }),
      $(".product-filter-top .attributes .select-attribute").length &&
        $(".product-filter-top .attributes .select-attribute select").each(
          function (t, e) {
            if ($(this).children("option:selected").val()) {
              var i = $(this).parent().clone();
              i
                .find(
                  "option[value=" +
                    $(this).children("option:selected").val() +
                    "]"
                )
                .prop("selected", !0),
                i
                  .children("select")
                  .addClass("checkbox-size checked")
                  .attr("disabled", "disabled"),
                i.appendTo(".product-filter-top .list-checked"),
                $(".product-filter-top .list-checked .delete-filter").show();
            }
          }
        ),
      $(document).on(
        "click",
        '.product-filter-top .list-checked .checkbox-size:not("select") i',
        function (t) {
          var e = $(this)
            .parents(".checkbox-size")
            .find(".input-attributes")
            .attr("id");
          $(".product-filter-top .attributes")
            .find(".input-attributes#" + e)
            .trigger("click"),
            0 == $(".product-filter-top .list-checked .checkbox-size").length &&
              $(".product-filter-top .list-checked .delete-filter").hide();
        }
      ),
      $(document).on(
        "click",
        ".product-filter-top .list-checked .select-attribute i",
        function (t) {
          $(".product-filter-top .attributes .select-attribute option").prop(
            "selected",
            !1
          ),
            $(this).parent().remove(),
            0 == $(".product-filter-top .list-checked .checkbox-size").length &&
              $(".product-filter-top .list-checked .delete-filter").hide(),
            $("#formProductFilter").submit();
        }
      ),
      $(document).on(
        "click",
        ".product-filter-top .list-checked .delete-filter",
        function (t) {
          $(".product-filter-top .attributes .input-attributes").prop(
            "checked",
            !1
          ),
            $(".product-filter-top .attributes .checkbox-size").removeClass(
              "checked"
            ),
            $(".product-filter-top .attributes .select-attribute option").prop(
              "selected",
              !1
            ),
            $(".product-filter-top .list-checked")
              .children()
              .not(":first")
              .remove(),
            $(this).hide(),
            $("#formProductFilter").submit();
        }
      );
  }),
  $(".product-filter-top .attributes .input-attributes").on(
    "click",
    function (t) {
      if ($(this).is(":checked"))
        $(this).parent().addClass("checked"),
          $(this)
            .parent()
            .clone()
            .appendTo(".product-filter-top .list-checked"),
          $(".product-filter-top .list-checked .delete-filter").show();
      else {
        $(this).parent().removeClass("checked");
        var e = $(this).attr("id");
        $(".product-filter-top .list-checked")
          .find("#" + e)
          .parent()
          .remove(),
          0 == $(".product-filter-top .list-checked .checkbox-size").length &&
            $(".product-filter-top .list-checked .delete-filter").hide();
      }
      $("#formProductFilter").submit();
    }
  ),
  $(".product-filter-top .attributes select").on("change", function (t) {
    if (
      ($(".product-filter-top .list-checked .select-attribute").remove(),
      $(this).children("option:selected").val())
    ) {
      var e = $(this).parent().clone();
      e
        .find("option[value=" + $(this).children("option:selected").val() + "]")
        .prop("selected", !0),
        e
          .children("select")
          .addClass("checkbox-size checked")
          .attr("disabled", "disabled"),
        e.appendTo(".product-filter-top .list-checked"),
        $(".product-filter-top .list-checked .delete-filter").show();
    }
    0 == $(".product-filter-top .list-checked .checkbox-size").length &&
      $(".product-filter-top .list-checked .delete-filter").hide(),
      $("#formProductFilter").submit();
  }),
  (function (t) {
    var e = window;
    Object.keys ||
      (Object.keys = (function () {
        "use strict";
        var t = Object.prototype.hasOwnProperty,
          e = !{ toString: null }.propertyIsEnumerable("toString"),
          i = [
            "toString",
            "toLocaleString",
            "valueOf",
            "hasOwnProperty",
            "isPrototypeOf",
            "propertyIsEnumerable",
            "constructor",
          ],
          n = i.length;
        return function (o) {
          if ("object" !== _typeof(o) && ("function" != typeof o || null === o))
            throw new TypeError("Object.keys called on non-object");
          var a,
            r,
            s = [];
          for (a in o) t.call(o, a) && s.push(a);
          if (e) for (r = 0; r < n; r++) t.call(o, i[r]) && s.push(i[r]);
          return s;
        };
      })());
    var i = !1;
    location.hash;
    var n = ["Days", "Hours", "Minutes", "Seconds"],
      o = {
        Seconds: "Minutes",
        Minutes: "Hours",
        Hours: "Days",
        Days: "Years",
      },
      a = {
        Seconds: 1,
        Minutes: 60,
        Hours: 3600,
        Days: 86400,
        Months: 2678400,
        Years: 31536e3,
      };
    function r() {
      return Math.floor(65536 * (1 + Math.random()))
        .toString(16)
        .substring(1);
    }
    function s(t, e, i, n, o) {
      for (
        var r = {}, s = {}, l = {}, c = {}, d = {}, u = {}, h = null, m = 0;
        m < n.length;
        m++
      ) {
        var f,
          p = n[m];
        f = null === h ? i / a[p] : a[h] / a[p];
        var g = t / a[p],
          v = e / a[p];
        o &&
          ((g = g > 0 ? Math.floor(g) : Math.ceil(g)),
          (v = v > 0 ? Math.floor(v) : Math.ceil(v))),
          "Days" !== p && ((g %= f), (v %= f)),
          (r[p] = g),
          (l[p] = Math.abs(g)),
          (s[p] = v),
          (u[p] = Math.abs(v)),
          (c[p] = Math.abs(g) / f),
          (d[p] = Math.abs(v) / f),
          (h = p);
      }
      return {
        raw_time: r,
        raw_old_time: s,
        time: l,
        old_time: u,
        pct: c,
        old_pct: d,
      };
    }
    Array.prototype.indexOf ||
      (Array.prototype.indexOf = function (t) {
        var e = this.length >>> 0,
          i = Number(arguments[1]) || 0;
        for (
          (i = i < 0 ? Math.ceil(i) : Math.floor(i)) < 0 && (i += e);
          i < e;
          i++
        )
          if (i in this && this[i] === t) return i;
        return -1;
      });
    var l = {};
    var c = function (t, e) {
      (this.element = t),
        this.container,
        (this.listeners = null),
        (this.data = {
          paused: !1,
          last_frame: 0,
          animation_frame: null,
          interval_fallback: null,
          timer: !1,
          total_duration: null,
          prev_time: null,
          drawn_units: [],
          text_elements: {
            Days: null,
            Hours: null,
            Minutes: null,
            Seconds: null,
          },
          attributes: {
            canvas: null,
            context: null,
            item_size: null,
            line_width: null,
            radius: null,
            outer_radius: null,
          },
          state: { fading: { Days: !1, Hours: !1, Minutes: !1, Seconds: !1 } },
        }),
        (this.config = null),
        this.setOptions(e),
        this.initialize();
    };
    (c.prototype.clearListeners = function () {
      this.listeners = { all: [], visible: [] };
    }),
      (c.prototype.addTime = function (t) {
        if (this.data.attributes.ref_date instanceof Date) {
          var e = this.data.attributes.ref_date;
          e.setSeconds(e.getSeconds() + t);
        } else
          isNaN(this.data.attributes.ref_date) ||
            (this.data.attributes.ref_date += 1e3 * t);
      }),
      (c.prototype.initialize = function (n) {
        this.data.drawn_units = [];
        for (var o = 0; o < Object.keys(this.config.time).length; o++) {
          var a = Object.keys(this.config.time)[o];
          this.config.time[a].show && this.data.drawn_units.push(a);
        }
        t(this.element).children("div.time_circles").remove(),
          void 0 === n && (n = !0),
          (n || null === this.listeners) && this.clearListeners(),
          (this.container = t("<div>")),
          this.container.addClass("time_circles"),
          this.container.appendTo(this.element);
        var r = this.element.offsetHeight,
          s = this.element.offsetWidth;
        0 === r && (r = t(this.element).height()),
          0 === s && (s = t(this.element).width()),
          0 === r && s > 0
            ? (r = s / this.data.drawn_units.length)
            : 0 === s && r > 0 && (s = r * this.data.drawn_units.length);
        var l = document.createElement("canvas");
        (l.width = s),
          (l.height = r),
          (this.data.attributes.canvas = t(l)),
          this.data.attributes.canvas.appendTo(this.container);
        var c,
          d = !(
            !(c = document.createElement("canvas")).getContext ||
            !c.getContext("2d")
          );
        for (var u in (d ||
          "undefined" == typeof G_vmlCanvasManager ||
          (G_vmlCanvasManager.initElement(l), (i = !0), (d = !0)),
        d && (this.data.attributes.context = l.getContext("2d")),
        (this.data.attributes.item_size = Math.min(
          s / this.data.drawn_units.length,
          r
        )),
        (this.data.attributes.line_width =
          this.data.attributes.item_size * this.config.fg_width),
        (this.data.attributes.radius =
          (0.8 * this.data.attributes.item_size -
            this.data.attributes.line_width) /
          2),
        (this.data.attributes.outer_radius =
          this.data.attributes.radius +
          0.5 *
            Math.max(
              this.data.attributes.line_width,
              this.data.attributes.line_width * this.config.bg_width
            )),
        (o = 0),
        this.data.text_elements))
          if (this.config.time[u].show) {
            var h = t("<div>");
            h.addClass("textDiv_" + u),
              h.css("top", Math.round(0.35 * this.data.attributes.item_size)),
              h.css("left", Math.round(o++ * this.data.attributes.item_size)),
              h.css("width", this.data.attributes.item_size),
              h.appendTo(this.container);
            var m = t("<h4>");
            m.text(this.config.time[u].text),
              m.css(
                "font-size",
                Math.round(
                  this.config.text_size * this.data.attributes.item_size
                )
              ),
              m.css(
                "line-height",
                Math.round(
                  this.config.text_size * this.data.attributes.item_size
                ) + "px"
              ),
              m.appendTo(h);
            var f = t("<span>");
            f.css(
              "font-size",
              Math.round(
                3 * this.config.text_size * this.data.attributes.item_size
              )
            ),
              f.css(
                "line-height",
                Math.round(
                  this.config.text_size * this.data.attributes.item_size
                ) + "px"
              ),
              f.appendTo(h),
              (this.data.text_elements[u] = f);
          }
        this.start(), this.config.start || (this.data.paused = !0);
        var p = this;
        this.data.interval_fallback = e.setInterval(function () {
          p.update.call(p, !0);
        }, 100);
      }),
      (c.prototype.update = function (t) {
        if (void 0 === t) t = !1;
        else if (t && this.data.paused) return;
        var o, r;
        i &&
          this.data.attributes.context.clearRect(
            0,
            0,
            this.data.attributes.canvas[0].width,
            this.data.attributes.canvas[0].hright
          );
        var l = this.data.prev_time,
          c = new Date();
        if (
          ((this.data.prev_time = c),
          null === l && (l = c),
          !this.config.count_past_zero && c > this.data.attributes.ref_date)
        ) {
          for (var d = 0; d < this.data.drawn_units.length; d++) {
            var u = this.data.drawn_units[d];
            this.data.text_elements[u].text("0");
            var h =
                d * this.data.attributes.item_size +
                this.data.attributes.item_size / 2,
              m = this.data.attributes.item_size / 2,
              f = this.config.time[u].color;
            this.drawArc(h, m, f, 0);
          }
          this.stop();
        } else {
          (o = (this.data.attributes.ref_date - c) / 1e3),
            (r = (this.data.attributes.ref_date - l) / 1e3);
          var p = "smooth" !== this.config.animation,
            g = s(o, r, this.data.total_duration, this.data.drawn_units, p),
            v = s(o, r, a.Years, n, p),
            y = ((d = 0), 0),
            _ = null,
            b = this.data.drawn_units.slice();
          for (var d in n)
            (u = n[d]),
              Math.floor(v.raw_time[u]) !== Math.floor(v.raw_old_time[u]) &&
                this.notifyListeners(
                  u,
                  Math.floor(v.time[u]),
                  Math.floor(o),
                  "all"
                ),
              b.indexOf(u) < 0 ||
                (Math.floor(g.raw_time[u]) !== Math.floor(g.raw_old_time[u]) &&
                  this.notifyListeners(
                    u,
                    Math.floor(g.time[u]),
                    Math.floor(o),
                    "visible"
                  ),
                t ||
                  (this.data.text_elements[u].text(
                    Math.floor(Math.abs(g.time[u]))
                  ),
                  (h =
                    y * this.data.attributes.item_size +
                    this.data.attributes.item_size / 2),
                  (m = this.data.attributes.item_size / 2),
                  (f = this.config.time[u].color),
                  "smooth" === this.config.animation
                    ? (null === _ ||
                        i ||
                        (Math.floor(g.time[_]) > Math.floor(g.old_time[_])
                          ? (this.radialFade(h, m, f, 1, u),
                            (this.data.state.fading[u] = !0))
                          : Math.floor(g.time[_]) < Math.floor(g.old_time[_]) &&
                            (this.radialFade(h, m, f, 0, u),
                            (this.data.state.fading[u] = !0))),
                      this.data.state.fading[u] ||
                        this.drawArc(h, m, f, g.pct[u]))
                    : this.animateArc(
                        h,
                        m,
                        f,
                        g.pct[u],
                        g.old_pct[u],
                        new Date().getTime() + 200
                      )),
                (_ = u),
                y++);
          if (!this.data.paused && !t) {
            var $ = this,
              w = function () {
                $.update.call($);
              };
            if ("smooth" === this.config.animation)
              this.data.animation_frame = e.requestAnimationFrame(
                w,
                $.element,
                $
              );
            else {
              var x = (o % 1) * 1e3;
              x < 0 && (x = 1e3 + x),
                (x += 50),
                ($.data.animation_frame = e.setTimeout(function () {
                  $.data.animation_frame = e.requestAnimationFrame(
                    w,
                    $.element,
                    $
                  );
                }, x));
            }
          }
        }
      }),
      (c.prototype.animateArc = function (t, i, n, o, a, r) {
        if (null !== this.data.attributes.context) {
          var s = a - o;
          if (Math.abs(s) > 0.5)
            0 === o ? this.radialFade(t, i, n, 1) : this.radialFade(t, i, n, 0);
          else {
            var l = (200 - (r - new Date().getTime())) / 200;
            l > 1 && (l = 1);
            var c = a * (1 - l) + o * l;
            if ((this.drawArc(t, i, n, c), l >= 1)) return;
            var d = this;
            e.requestAnimationFrame(function () {
              d.animateArc(t, i, n, o, a, r);
            }, this.element);
          }
        }
      }),
      (c.prototype.drawArc = function (t, e, n, o) {
        if (null !== this.data.attributes.context) {
          var a,
            r,
            s,
            l = Math.max(
              this.data.attributes.outer_radius,
              this.data.attributes.item_size / 2
            );
          i ||
            this.data.attributes.context.clearRect(t - l, e - l, 2 * l, 2 * l),
            this.config.use_background &&
              (this.data.attributes.context.beginPath(),
              this.data.attributes.context.arc(
                t,
                e,
                this.data.attributes.radius,
                0,
                2 * Math.PI,
                !1
              ),
              (this.data.attributes.context.lineWidth =
                this.data.attributes.line_width * this.config.bg_width),
              (this.data.attributes.context.strokeStyle =
                this.config.circle_bg_color),
              this.data.attributes.context.stroke());
          var c = -0.5 * Math.PI,
            d = 2 * Math.PI;
          a = c + (this.config.start_angle / 360) * d;
          var u = 2 * o * Math.PI;
          "Both" === this.config.direction
            ? ((s = !1), (r = (a -= u / 2) + u))
            : "Clockwise" === this.config.direction
            ? ((s = !1), (r = a + u))
            : ((s = !0), (r = a - u)),
            this.data.attributes.context.beginPath(),
            this.data.attributes.context.arc(
              t,
              e,
              this.data.attributes.radius,
              a,
              r,
              s
            ),
            (this.data.attributes.context.lineWidth =
              this.data.attributes.line_width),
            (this.data.attributes.context.strokeStyle = n),
            this.data.attributes.context.stroke();
        }
      }),
      (c.prototype.radialFade = function (t, i, n, o, a) {
        var r,
          s = (function (t) {
            t = t.replace(
              /^#?([a-f\d])([a-f\d])([a-f\d])$/i,
              function (t, e, i, n) {
                return e + e + i + i + n + n;
              }
            );
            var e = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(t);
            return e
              ? {
                  r: parseInt(e[1], 16),
                  g: parseInt(e[2], 16),
                  b: parseInt(e[3], 16),
                }
              : null;
          })(n),
          l = this,
          c = 0.2 * (1 === o ? -1 : 1);
        for (r = 0; o <= 1 && o >= 0; r++)
          !(function () {
            var n = 50 * r,
              a =
                "rgba(" +
                s.r +
                ", " +
                s.g +
                ", " +
                s.b +
                ", " +
                Math.round(10 * o) / 10 +
                ")";
            e.setTimeout(function () {
              l.drawArc(t, i, a, 1);
            }, n);
          })(),
            (o += c);
        void 0 !== _typeof(a) &&
          e.setTimeout(function () {
            l.data.state.fading[a] = !1;
          }, 50 * r);
      }),
      (c.prototype.timeLeft = function () {
        if (this.data.paused && "number" == typeof this.data.timer)
          return this.data.timer;
        var t = new Date();
        return (this.data.attributes.ref_date - t) / 1e3;
      }),
      (c.prototype.start = function () {
        e.cancelAnimationFrame(this.data.animation_frame),
          e.clearTimeout(this.data.animation_frame);
        var i = t(this.element).data("date");
        if (
          (void 0 === i && (i = t(this.element).attr("data-date")),
          "string" == typeof i)
        )
          this.data.attributes.ref_date = (function (t) {
            var e = t.match(
              /^[0-9]{4}-[0-9]{2}-[0-9]{2}\s[0-9]{1,2}:[0-9]{2}:[0-9]{2}$/
            );
            if (null !== e && e.length > 0) {
              var i = t.split(" "),
                n = i[0].split("-"),
                o = i[1].split(":");
              return new Date(n[0], n[1] - 1, n[2], o[0], o[1], o[2]);
            }
            var a = Date.parse(t);
            return isNaN(a)
              ? ((a = Date.parse(t.replace(/-/g, "/").replace("T", " "))),
                isNaN(a) ? new Date() : a)
              : a;
          })(i);
        else if ("number" == typeof this.data.timer)
          this.data.paused &&
            (this.data.attributes.ref_date =
              new Date().getTime() + 1e3 * this.data.timer);
        else {
          var n = t(this.element).data("timer");
          void 0 === n && (n = t(this.element).attr("data-timer")),
            "string" == typeof n && (n = parseFloat(n)),
            "number" == typeof n
              ? ((this.data.timer = n),
                (this.data.attributes.ref_date =
                  new Date().getTime() + 1e3 * n))
              : (this.data.attributes.ref_date = this.config.ref_date);
        }
        (this.data.paused = !1), this.update.call(this);
      }),
      (c.prototype.restart = function () {
        (this.data.timer = !1), this.start();
      }),
      (c.prototype.stop = function () {
        "number" == typeof this.data.timer &&
          (this.data.timer = this.timeLeft(this)),
          (this.data.paused = !0),
          e.cancelAnimationFrame(this.data.animation_frame);
      }),
      (c.prototype.destroy = function () {
        this.clearListeners(),
          this.stop(),
          e.clearInterval(this.data.interval_fallback),
          (this.data.interval_fallback = null),
          this.container.remove(),
          t(this.element).removeAttr("data-tc-id"),
          t(this.element).removeData("tc-id");
      }),
      (c.prototype.setOptions = function (i) {
        if (
          (null === this.config &&
            ((this.default_options.ref_date = new Date()),
            (this.config = t.extend(!0, {}, this.default_options))),
          t.extend(!0, this.config, i),
          void 0 !==
          (e = this.config.use_top_frame ? window.top : window).TC_Instance_List
            ? (l = e.TC_Instance_List)
            : (e.TC_Instance_List = l),
          (function (t) {
            for (
              var e = ["webkit", "moz"], i = 0;
              i < e.length && !t.requestAnimationFrame;
              ++i
            )
              (t.requestAnimationFrame = t[e[i] + "RequestAnimationFrame"]),
                (t.cancelAnimationFrame = t[e[i] + "CancelAnimationFrame"]);
            (t.requestAnimationFrame && t.cancelAnimationFrame) ||
              ((t.requestAnimationFrame = function (e, i, n) {
                void 0 === n && (n = { data: { last_frame: 0 } });
                var o = new Date().getTime(),
                  a = Math.max(0, 16 - (o - n.data.last_frame)),
                  r = t.setTimeout(function () {
                    e(o + a);
                  }, a);
                return (n.data.last_frame = o + a), r;
              }),
              (t.cancelAnimationFrame = function (t) {
                clearTimeout(t);
              }));
          })(e),
          (this.data.total_duration = this.config.total_duration),
          "string" == typeof this.data.total_duration)
        )
          if (void 0 !== a[this.data.total_duration])
            this.data.total_duration = a[this.data.total_duration];
          else if ("Auto" === this.data.total_duration)
            for (var n = 0; n < Object.keys(this.config.time).length; n++) {
              var r = Object.keys(this.config.time)[n];
              if (this.config.time[r].show) {
                this.data.total_duration = a[o[r]];
                break;
              }
            }
          else
            (this.data.total_duration = a.Years),
              console.error(
                "Valid values for TimeCircles config.total_duration are either numeric, or (string) Years, Months, Days, Hours, Minutes, Auto"
              );
      }),
      (c.prototype.addListener = function (t, e, i) {
        "function" == typeof t &&
          (void 0 === i && (i = "visible"),
          this.listeners[i].push({ func: t, scope: e }));
      }),
      (c.prototype.notifyListeners = function (t, e, i, n) {
        for (var o = 0; o < this.listeners[n].length; o++) {
          var a = this.listeners[n][o];
          a.func.apply(a.scope, [t, e, i]);
        }
      }),
      (c.prototype.default_options = {
        ref_date: new Date(),
        start: !0,
        animation: "smooth",
        count_past_zero: !0,
        circle_bg_color: "#60686F",
        use_background: !0,
        fg_width: 0.1,
        bg_width: 1.2,
        text_size: 0.07,
        total_duration: "Auto",
        direction: "Clockwise",
        use_top_frame: !1,
        start_angle: 0,
        time: {
          Days: { show: !0, text: "Days", color: "#FC6" },
          Hours: { show: !0, text: "Hours", color: "#9CF" },
          Minutes: { show: !0, text: "Minutes", color: "#BFB" },
          Seconds: { show: !0, text: "Seconds", color: "#F99" },
        },
      });
    var d = function (t, e) {
      (this.elements = t), (this.options = e), this.foreach();
    };
    (d.prototype.getInstance = function (e) {
      var i,
        n = t(e).data("tc-id");
      if (
        (void 0 === n &&
          ((n =
            r() +
            r() +
            "-" +
            r() +
            "-" +
            r() +
            "-" +
            r() +
            "-" +
            r() +
            r() +
            r()),
          t(e).attr("data-tc-id", n)),
        void 0 === l[n])
      ) {
        var o = this.options,
          a = t(e).data("options");
        "string" == typeof a && (a = JSON.parse(a)),
          "object" === _typeof(a) && (o = t.extend(!0, {}, this.options, a)),
          (i = new c(e, o)),
          (l[n] = i);
      } else (i = l[n]), void 0 !== this.options && i.setOptions(this.options);
      return i;
    }),
      (d.prototype.addTime = function (t) {
        this.foreach(function (e) {
          e.addTime(t);
        });
      }),
      (d.prototype.foreach = function (t) {
        var e = this;
        return (
          this.elements.each(function () {
            var i = e.getInstance(this);
            "function" == typeof t && t(i);
          }),
          this
        );
      }),
      (d.prototype.start = function () {
        return (
          this.foreach(function (t) {
            t.start();
          }),
          this
        );
      }),
      (d.prototype.stop = function () {
        return (
          this.foreach(function (t) {
            t.stop();
          }),
          this
        );
      }),
      (d.prototype.restart = function () {
        return (
          this.foreach(function (t) {
            t.restart();
          }),
          this
        );
      }),
      (d.prototype.rebuild = function () {
        return (
          this.foreach(function (t) {
            t.initialize(!1);
          }),
          this
        );
      }),
      (d.prototype.getTime = function () {
        return this.getInstance(this.elements[0]).timeLeft();
      }),
      (d.prototype.addListener = function (t, e) {
        void 0 === e && (e = "visible");
        var i = this;
        return (
          this.foreach(function (n) {
            n.addListener(t, i.elements, e);
          }),
          this
        );
      }),
      (d.prototype.destroy = function () {
        return (
          this.foreach(function (t) {
            t.destroy();
          }),
          this
        );
      }),
      (d.prototype.end = function () {
        return this.elements;
      }),
      (t.fn.TimeCircles = function (t) {
        return new d(this, t);
      });
  })(jQuery);
