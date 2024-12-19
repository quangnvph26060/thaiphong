function setCookie(t, e) {
  var a = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 30,
    n = t + "=" + encodeURIComponent(e);
  "number" == typeof a &&
    ((n += ";path=/; max-age=" + 24 * a * 60 * 60), (document.cookie = n));
}
function getCookie(t) {
  for (var e = document.cookie.split(";"), a = 0; a < e.length; a++) {
    var n = e[a].split("=");
    if (t == n[0].trim()) return decodeURIComponent(n[1]);
  }
}
function getRefCode() {
  return getCookie("ref");
}
function affiliateIdToForm() {
  "" != wb_translate.affiliate_id &&
    ($(".widget-form form").length &&
      $(".widget-form form").append(
        '<input type="hidden" name="affiliate_id" value="' +
          wb_translate.affiliate_id +
          '" />'
      ),
    $("form#contact_form").length &&
      $("form#contact_form").append(
        '<input type="hidden" name="affiliate_id" value="' +
          wb_translate.affiliate_id +
          '" />'
      ));
}
function loadFBSDK() {
  $(".fb-page").each(function (t) {
    var e = $(this).parent().width().toFixed(0);
    0 == e && (e = 250), $(this).attr("data-width", e);
  });
  var t,
    e,
    a,
    n,
    i,
    o = "";
  $('meta[property="fb:app_id"]').attr("content") &&
    (o = "&appId=" + $('meta[property="fb:app_id"]').attr("content")),
    (e = "script"),
    (a = "facebook-jssdk"),
    (i = (t = document).getElementsByTagName(e)[0]),
    t.getElementById(a) ||
      (((n = t.createElement(e)).id = a),
      (n.src =
        "https://connect.facebook.net/vi_VN/sdk.js#xfbml=1&version=v4.0" +
        o +
        "&autoLogAppEvents=1"),
      i.parentNode.insertBefore(n, i));
}
function updateQueryStringParameter(t, e, a) {
  var n = new RegExp("([?&])" + e + "=.*?(&|$)", "i"),
    i = -1 !== t.indexOf("?") ? "&" : "?";
  return t.match(n)
    ? t.replace(n, "$1" + e + "=" + a + "$2")
    : t + i + e + "=" + a;
}
function removeQueryStringParameter(t, e) {
  var a = t.split("?"),
    n = new URLSearchParams(a[1]);
  n.delete(e);
  var i = a[0];
  return n.toString() ? i + "?" + n.toString() : i;
}
function switchCurrency() {
  $(".switch-currency ul li a").on("click", function () {
    var t = { unit: $(this).data("unit") };
    setCookie("currency", JSON.stringify(t), 30), location.reload();
  });
}
function loadSmartButton() {
  if (addon_smart_feature_menu) {
    var t = "";
    $("body").hasClass("homepage") && (t = "homepage"),
      $("body").hasClass("category_product") && (t = "category_product"),
      $("body").hasClass("category_post") && (t = "category_post"),
      $("body").hasClass("product_detail") && (t = "product_detail"),
      $("body").hasClass("post_detail") && (t = "post_detail");
    var e =
      "link=" +
      window.location.href.split("?")[0] +
      "&pagetype=" +
      t +
      "&lang_code=" +
      wb_language;
    $.ajax({
      url: "/api/v2/smart-feature-menu/load",
      type: "GET",
      data: e,
      headers: { Authorization: "Bearer " + wb_token_public },
    }).done(function (t) {
      $("body").append(t);
    });
  }
}
function defaultTitleElement() {
  $(document)
    .find("a")
    .each(function (t) {
      ("" != $(this).attr("aria-label") &&
        null != $(this).attr("aria-label")) ||
        $(this).attr("aria-label", document.title);
    }),
    $(document)
      .find("iframe")
      .each(function (t) {
        ("" != $(this).attr("aria-label") &&
          null != $(this).attr("aria-label")) ||
          $(this).attr("aria-label", document.title);
      }),
    $(document)
      .find("img")
      .each(function (t) {
        ("" != $(this).attr("alt") && null != $(this).attr("alt")) ||
          $(this).attr("alt", document.title);
      });
}
function collapse_element(t) {
  if (1 == $(t).data("collapse")) {
    if (
      ($(t).addClass("collapse_element"),
      $(t).addClass("show"),
      $(document).find(".collapse_element").height() > 200)
    ) {
      $(document).find(".collapse_element").addClass("collapsed");
      var e =
        '<div class="btn_collape"><button class="btn btn-outline-info btn-lg">'.concat(
          wb_translate.text_btn_collapse,
          "</button></div>"
        );
      $(document).find(".collapse_element").append(e);
    }
    $(document).on(
      "click",
      ".collapse_element.collapsed .btn_collape button",
      function () {
        $(document).find(".collapse_element.collapsed .btn_collape").remove(),
          $(document).find(".collapse_element").addClass("collapse");
        var t =
          '<div class="btn_collape"><button class="btn btn-outline-info btn-lg">'.concat(
            wb_translate.text_btn_collapsed,
            "</button></div>"
          );
        $(document).find(".collapse_element").append(t),
          $(document).find(".collapse_element").removeClass("collapsed");
      }
    ),
      $(document).on(
        "click",
        ".collapse_element.collapse .btn_collape button",
        function () {
          $(document).find(".collapse_element.collapse .btn_collape").remove(),
            $(".collapse_element").addClass("collapsed");
          var t =
            '<div class="btn_collape"><button class="btn btn-outline-info btn-lg">'.concat(
              wb_translate.text_btn_collapse,
              "</button></div>"
            );
          $(document).find(".collapse_element").append(t),
            $(document).find(".collapse_element").removeClass("collapse");
        }
      );
  }
}
function stripTrailingSlash(t) {
  return t.replace(/\/\/*/g, "/").replace(/\/+$/, "");
}
$(".widget-form form").on("submit", function (t) {
  t.preventDefault();
  var e = this,
    a = $(e).data("success-url"),
    n = $(e).find("button.btn-primary").text();
  $(e).find("button.btn-primary").text(wb_translate.progressing),
    $(e).find("button.btn-primary").attr("disabled", "disabled");
  var i = $(e).serialize();
  (i += "&form_id=" + $(e).data("id") + "&ref=" + getRefCode()),
    $.ajax({ url: $(e).attr("action"), type: "post", data: i })
      .done(function (t) {
        "validate" in t
          ? 0 == t.validate && $(e).find(".alert-danger").text(t.message).show()
          : ($(e).trigger("reset"),
            a
              ? (window.location.href = a)
              : $(e).find(".alert-success").show());
      })
      .fail(function () {
        $(e).find(".alert-danger").show();
      })
      .always(function () {
        $(e).find("button.btn-primary").removeAttr("disabled"),
          $(e).find("button.btn-primary").text(n);
      });
});
var page = 1;
if (
  ($(document).on(
    "click",
    ".pagging.pagging_loadmore .btn-loadmore:not(.disabled)",
    function () {
      $(".pagging .loading").show(), (page += 1);
      var t = this;
      $(t).prop("disabled", !0).addClass("disabled").hide();
      var e,
        a = window.location.href.split("?");
      (e =
        a.length > 1
          ? stripTrailingSlash(location.pathname) +
            "-trang-" +
            page +
            "?" +
            a[1] +
            "&loadmore=true"
          : stripTrailingSlash(location.pathname) +
            "-trang-" +
            page +
            "?loadmore=true"),
        $.ajax({
          url: location.protocol + "//" + location.host + e,
          success: function (e) {
            $(".pagging .loading").hide(),
              $(".blog-item .row").append(e),
              $(t).prop("disabled", !1).removeClass("disabled").show(),
              "" == e && $(t).prop("disabled", !0).addClass("disabled").hide(),
              $(window).lazyLoadXT();
          },
          dataType: "html",
        });
    }
  ),
  $(".pagging.pagging_infinity:not(.disabled)").length)
) {
  var loading = !1;
  $(window).on("scroll", function () {
    if (
      $(window).scrollTop() >=
        $(".pagging.pagging_infinity:not(.disabled)").offset().top - 400 &&
      $(".pagging.pagging_infinity:not(.disabled)").length &&
      !1 === loading
    ) {
      $(".pagging .loading").show(), (loading = !0), (page += 1);
      var t,
        e = window.location.href.split("?");
      (t =
        e.length > 1
          ? stripTrailingSlash(location.pathname) +
            "-trang-" +
            page +
            "?" +
            e[1] +
            "&loadmore=true"
          : stripTrailingSlash(location.pathname) +
            "-trang-" +
            page +
            "?loadmore=true"),
        $.ajax({
          url: location.protocol + "//" + location.host + t,
          success: function (t) {
            $(".blog-item .row").append(t),
              (loading = !1),
              "" == t &&
                ($(".pagging .loading").hide(),
                $(".pagging.pagging_infinity").addClass("disabled"),
                (loading = !0)),
              $(window).lazyLoadXT();
          },
          dataType: "html",
        });
    }
  });
}
$(document).ready(function () {
  switchCurrency(),
    affiliateIdToForm(),
    loadSmartButton(),
    $("#fb-root").length && loadFBSDK(),
    (document.title = document.title.trim()),
    defaultTitleElement(),
    collapse_element(".category_post .conten-detail.bottom"),
    collapse_element(".category_product .conten-detail.bottom"),
    collapse_element(".product_detail .detail-descript.ck_editor_content");
  var t = function () {
      document
        .querySelectorAll("script[data-type='lazy']")
        .forEach(function (t) {
          return t.setAttribute("src", t.getAttribute("data-src"));
        }),
        document
          .querySelectorAll("iframe[data-type='lazy']")
          .forEach(function (t) {
            return t.setAttribute("src", t.getAttribute("data-src"));
          });
    },
    e = setTimeout(t, 5e3),
    a = function () {
      t(), clearTimeout(e);
    };
  ["mouseover", "keydown", "touchmove", "touchstart"].forEach(function (t) {
    return window.addEventListener(t, a, { passive: !0, once: !0 });
  }),
    (jQuery.event.special.touchstart = {
      setup: function (t, e, a) {
        this.addEventListener("touchstart", a, {
          passive: !e.includes("noPreventDefault"),
        });
      },
    }),
    (jQuery.event.special.touchmove = {
      setup: function (t, e, a) {
        this.addEventListener("touchmove", a, {
          passive: !e.includes("noPreventDefault"),
        });
      },
    }),
    (jQuery.event.special.wheel = {
      setup: function (t, e, a) {
        this.addEventListener("wheel", a, { passive: !0 });
      },
    }),
    (jQuery.event.special.mousewheel = {
      setup: function (t, e, a) {
        this.addEventListener("mousewheel", a, { passive: !0 });
      },
    });
});
var initElevateZoom = function () {
  if ($(window).width() > 768)
    $(".img-product .img-main-detail-zoom").elevateZoom({
      gallery: "img-product",
      cursor: "zoom-in",
      galleryActiveClass: "active",
      easing: !0,
      scrollZoom: !1,
      responsive: !0,
      zoomWindowFadeIn: 500,
      zoomWindowFadeOut: 500,
      lensFadeIn: 500,
      lensFadeOut: 500,
    });
  else if ($.find(".zoomContainer")) return $(".zoomContainer").remove(), !1;
};
function changeImageOnClick(t) {
  $("#product-detail-carousel img").attr("data-active", "false");
  var e = t.target;
  e.setAttribute("data-active", "true"),
    $(document)
      .find("#product-detail-carousel.owl-carousel.owl-drag .owl-item")
      .removeClass("active-border"),
    $(document)
      .find(
        "#product-detail-carousel.owl-carousel.owl-drag .owl-item img[data-active=true]"
      )
      .parents(".owl-item")
      .addClass("active-border");
  var a = e.getAttribute("data-number");
  "IMG" == e.tagName &&
    ($(".img-product").find(".qv-preview .img-main-href").hide(),
    $(".img-main-href[data-number=" + a + "]").show()),
    $(".img-main-detail-zoom").length &&
      ($.find(".zoomContainer") && $(".zoomContainer").remove(),
      initElevateZoom());
}
function productQuantityBreak(t) {
  $(".product-price").find(".old").removeClass("d-none"),
    $(".product-price").find(".percent-sale").removeClass("d-none"),
    $(".product_quantity_break .info-extra").each(function (e, a) {
      var n = $(this).find("input[name=quantity_product]").val(),
        i = $(this).find("input[name=price_product]").val(),
        o = $(this).find("input[name=sale_product]").val();
      t >= n &&
        ($(".product-price").find(".new.edit_price_detail").html(i),
        $(".product-price")
          .find(".percent-sale")
          .html(o + "%"));
    });
}
function _clickBtnQty(t) {
  $(t).on("click", function (e) {
    e.preventDefault();
    var a = $(this).siblings("span.product-detail-Sqty"),
      n = $(this).siblings("input.product-detail-qty"),
      i = parseInt(n.val()),
      o = parseInt($(this).parent().find("input.product-price").val()),
      r = void 0;
    if (
      ($(this)
        .parents(".product-properties")
        .find("input.input_product_quantity").length &&
        (r = parseInt(
          $(this)
            .parents(".product-properties")
            .find("input.input_product_quantity")
            .val()
        )),
      ".qty-up" == t &&
        (null != r
          ? i < r && (a.text(i + 1), n.val(i + 1), (i += 1))
          : (a.text(i + 1), n.val(i + 1), (i += 1))),
      ".qty-down" == t)
    ) {
      if (i <= 1) return !1;
      a.text(i - 1), n.val(i - 1), (i -= 1);
    }
    n.trigger("change"),
      parseInt(n.val()) <= 0
        ? $(".addcart-link").attr("disabled", "disabled")
        : $(".addcart-link").removeAttr("disabled"),
      (o *= i) > 3e6
        ? $(".installment-show-hide").show()
        : $(".installment-show-hide").hide();
  });
}
function checkedInArray(t, e) {
  if (t.length > 1) {
    for (var a = [], n = 0; n < t.length; n++)
      for (var i = 0; i < e.length; i++) t[n] == e[i].id && a.push(e[i].id);
    return a.length == t.length;
  }
  for (n = 0; n < e.length; n++) if (e[n].id == t[0]) return !0;
  return !1;
}
function getDataProductsAttribute(t) {
  var e = $(".product-detail").data("attributes");
  if (null != e)
    for (var a = 0; a < e.length; a++) {
      var n = Object.values(e[a].items);
      if (n.length > 0 && 1 == checkedInArray(t, n)) return e[a];
    }
  return !1;
}
function clickProductByParameter() {
  var t = window.location.search.substring(1).split("&");
  $(t).each(function (t, e) {
    var a = e.split("=")[0],
      n = e.split("=")[1];
    $(".checkbox-size input.edit_products_attribute").each(function (t, e) {
      $(e).attr("name") == a && $(e).val() == n && $(e).click();
    });
  });
}
$("input.product-qty").on("change", function () {
  parseInt($(this).val()) < 1 && $(this).val(1),
    parseInt($(this).val()) < parseInt($(this).attr("min")) &&
      $(this).val($(this).attr("min")),
    "undefined" !== $(this).attr("max") &&
      parseInt($(this).val()) > parseInt($(this).attr("max")) &&
      $(this).val($(this).attr("max"));
}),
  $(".product-properties .edit_products_attribute").on("change", function (t) {
    var e = window.location.origin + window.location.pathname;
    if (
      ((e = updateQueryStringParameter(e, $(this).attr("name"), $(this).val())),
      $("label.checkbox-size").removeClass("checked"),
      $(this).is(":checked") || $(this).children("option:selected").val())
    ) {
      var a = $(this),
        n = [],
        i = a.children("option:selected").val();
      if (
        ((void 0 !== i && null != i) || (i = a.val()),
        $(".product-properties .edit_products_attribute").each(function (t, a) {
          $(a).is(":checked") &&
            ($(a).parent().addClass("checked"),
            i != $(a).val() &&
              ((n[$(a).data("index")] = $(a).val()),
              (e = updateQueryStringParameter(
                e,
                $(this).attr("name"),
                $(this).val()
              )))),
            $(a).children("option:selected").val() &&
              i != $(a).children("option:selected").val() &&
              ((n[$(a).data("index")] = $(a).children("option:selected").val()),
              (e = updateQueryStringParameter(
                e,
                $(this).attr("name"),
                $(this).children("option:selected").val()
              )));
        }),
        0 ==
          $('.product-properties input[name="in-stock-product"]').attr(
            "data-in-stock-product"
          ))
      ) {
        var o = $(this).attr("data-index");
        $.each(advancedAttributes, function (t, e) {
          -1 != jQuery.inArray(parseInt(a.val()), e.attribute_ids) &&
            $.each(e.attribute_ids, function (t, n) {
              var i = $(".product-properties").find("input[value=" + n + "]");
              o != i.attr("data-index") &&
                (n != a.val() &&
                0 == e.in_stocks &&
                0 == e.allow_out_of_stock_order
                  ? (i.attr("data-index") != attrFirst &&
                      i.attr("disabled", !0),
                    i.parent().addClass("disabled"))
                  : (i.attr("disabled", !1),
                    i.parent().removeClass("disabled")));
              var r = $(".product-properties").find("option[value=" + n + "]");
              o != i.parent().attr("data-index") &&
                (n != a.val() &&
                0 == e.in_stocks &&
                0 == e.allow_out_of_stock_order
                  ? (r.parent().attr("data-index") != attrFirst &&
                      r.attr("disabled", !0),
                    r.addClass("disabled"),
                    r.parent().addClass("disabled"))
                  : (r.attr("disabled", !1),
                    r.parent().removeClass("disabled"),
                    r.removeClass("disabled")));
            });
        });
      }
      n[a.data("index")] = i;
      var r = getDataProductsAttribute(Object.values(n));
      if (0 != r) {
        if (
          $(".product_quantity_break").length &&
          $(".product_quantity_break").length > 1
        ) {
          var d = $(".product-quantity").find("input[name=quantity]").val();
          $.each(r.product_quantity_break, function (t, e) {
            d >= e.quantity &&
              ((r.sale_price = e.price),
              (r.sale_price_formatted = e.price_formatted),
              (r.discount_percent = parseFloat(
                (100 * r.sale_price) / r.price - 100
              )),
              r.discount_percent > 0 &&
                (r.discount_percent = Math.ceil(r.discount_percent)),
              r.discount_percent < 0 &&
                (r.discount_percent = Math.floor(r.discount_percent)),
              (r.discount_percent += "%"));
            var a = parseFloat((100 * e.price) / r.price - 100);
            a > 0 && (a = Math.ceil(a)),
              a < 0 && (a = Math.floor(a)),
              $(".break-quantity-item-" + t).text(
                wb_translate.product_quantity_break_description_value
                  .replace(":price", e.price_formatted)
                  .replace(":percent", a)
              );
          });
        }
        if (
          ($(".product-price").find(".old.silver").html(r.price_formatted),
          $(".product-price")
            .find(".new.edit_price_detail")
            .html(r.sale_price_formatted),
          "0%" == r.discount_percent
            ? ($(".product-price").find(".percent-sale").html(""),
              $(".product-price").find(".product-detail-discount").html(""))
            : ($(".product-price")
                .find(".percent-sale")
                .html(r.discount_percent),
              $(".product-price")
                .find(".product-detail-discount")
                .html(r.discount_percent)),
          $(".product-quantity").find(".product_quantity").html(r.quantity),
          $(".product-quantity")
            .find(".input_product_quantity")
            .val(r.quantity),
          $(".product-detail").find(".wb-product-detail-code").text(r.code),
          $(".product-detail").find('input[name="product_code"]').val(r.code),
          r.sale_price != r.price
            ? ($(".product-price").find(".old").removeClass("d-none"),
              $(".product-price").find(".percent-sale").removeClass("d-none"))
            : ($(".product-price").find(".old").addClass("d-none"),
              $(".product-price").find(".percent-sale").addClass("d-none")),
          r.in_stock > 0 &&
          $('.product-properties input[name="in-stock-common"]').attr(
            "data-in-stock-common"
          ) > 0
            ? ($(".product-infor")
                .find(".wb-stock-status")
                .html(wb_translate.instock),
              $(".product-detail").removeClass("out-of-stock"),
              $(".product-detail").addClass("in-stock"))
            : ($(".product-infor")
                .find(".wb-stock-status")
                .html(wb_translate.outstock),
              $(".product-detail").removeClass("in-stock"),
              $(".product-detail").addClass("out-of-stock")),
          r.galleries.length > 0)
        ) {
          var c = $(".product-detail-carousel");
          if ((c.empty(), r.galleries.length > 1))
            for (var s = 0; s < r.galleries.length; s++)
              c.append(
                "<div><a class='d-block text-center' style='background-image: url(" +
                  r.galleries[s] +
                  ")'><img data-number='" +
                  s +
                  "' src='" +
                  r.galleries[s] +
                  "'></a></div>"
              );
          c.trigger("destroy.owl.carousel"),
            c.removeClass("owl-loaded"),
            initCarousel($(".product-detail-carousel"));
          var l = $(".qv-preview").find(".img-main-detail").attr("title");
          for ($(".qv-preview").empty(), s = 0; s < r.galleries.length; s++)
            2 == $(".qv-preview").data("zoom")
              ? $(".qv-preview").append(
                  "<a data-fancybox='gallery' data-number='" +
                    s +
                    "' href='" +
                    r.galleries[s] +
                    "' class='img-main-href'><img class='img-main-detail-zoom' src='" +
                    r.galleries[s] +
                    "' data-zoom-image='" +
                    r.galleries[s] +
                    "' title='" +
                    l +
                    "'></a>"
                )
              : $(".qv-preview").append(
                  "<a data-fancybox='gallery' data-number='" +
                    s +
                    "' href='" +
                    r.galleries[s] +
                    "' class='img-main-href'><img class='img-main-detail' src='" +
                    r.galleries[s] +
                    "' title='" +
                    l +
                    "'><i class='fa fa-expand'></i></a>"
                );
          $(".img-main-detail-zoom").length &&
            ($.find(".zoomContainer") && $(".zoomContainer").remove(),
            initElevateZoom());
        }
      }
    }
    window.history.pushState(null, null, e),
      $(document)
        .find(".product-properties label.disabled input")
        .prop("disabled", !0);
  }),
  $(document).on(
    "click",
    ".product-detail a.addcart_link_contact",
    function (t) {
      t.preventDefault(),
        $("#loading.transparent").show(),
        $(this).parents("form").prop("action", $(this).attr("href")),
        $(this).parents("form").submit();
    }
  ),
  $(document).on("click", ".product-detail a.addcart-link", function (t) {
    if ((t.preventDefault(), 0 == $(this).parents("form")[0].checkValidity()))
      return (
        $(".notify-cart-no-select-options").length &&
          ($(".notify-cart-no-select-options").fadeIn("slow"),
          setTimeout(function () {
            $(".notify-cart-no-select-options").fadeOut("slow");
          }, 1e3 * parseInt($(".notify-cart-no-select-options").data("hide")))),
        !1
      );
    $("#loading.transparent").show(),
      $(this).parents("form").prop("action", $(this).attr("href")),
      $(this).parents("form").submit();
  }),
  $(document).ready(function () {
    setTimeout(function () {
      $(document)
        .find("#product-detail-carousel.owl-carousel.owl-drag .owl-item.active")
        .first()
        .addClass("active-border");
    }, 2e3),
      $(document)
        .find(".product-properties label.disabled input")
        .prop("disabled", !0),
      $(".checkbox-size input.edit_products_attribute").length &&
      "" != window.location.search
        ? (clickProductByParameter(),
          $(document)
            .find(".product-properties label.disabled input")
            .prop("disabled", !0))
        : 0 ==
            $('.product-properties input[name="in-stock-product"]').attr(
              "data-in-stock-product"
            ) &&
          ($(".product-properties .edit_products_attribute").each(function () {
            if (1 == $(this).prop("checked")) {
              var t = $(this),
                e = $(this).attr("data-index");
              $.each(advancedAttributes, function (a, n) {
                -1 != jQuery.inArray(parseInt(t.val()), n.attribute_ids) &&
                  $.each(n.attribute_ids, function (a, i) {
                    var o = $(".product-properties").find(
                      "input[value=" + i + "]"
                    );
                    e != o.attr("data-index") &&
                      i != t.val() &&
                      0 == n.in_stocks &&
                      0 == n.allow_out_of_stock_order &&
                      0 == o.prop("checked") &&
                      (o.attr("data-index") != attrFirst &&
                        o.attr("disabled", !0),
                      o.parent().addClass("disabled"));
                    var r = $(".product-properties").find(
                      "option[value=" + i + "]"
                    );
                    e != r.parent().attr("data-index") &&
                      i != t.val() &&
                      0 == n.in_stocks &&
                      (r.parent().attr("data-index") != attrFirst &&
                        r.attr("disabled", !0),
                      r.addClass("disabled"));
                  });
              });
            }
          }),
          $(".product-properties .edit_products_attribute option").each(
            function (t, e) {
              if (1 == $(this).prop("selected")) {
                var a = $(this),
                  n = $(this).parent().attr("data-index");
                $.each(advancedAttributes, function (t, e) {
                  -1 != jQuery.inArray(parseInt(a.val()), e.attribute_ids) &&
                    $.each(e.attribute_ids, function (t, i) {
                      var o = $(".product-properties").find(
                        "option[value=" + i + "]"
                      );
                      n != o.parent().attr("data-index") &&
                        i != a.val() &&
                        0 == e.in_stocks &&
                        0 == e.allow_out_of_stock_order &&
                        (o.parent().attr("data-index") != attrFirst &&
                          o.attr("disabled", !0),
                        o.addClass("disabled"));
                      var r = $(".product-properties").find(
                        "input[value=" + i + "]"
                      );
                      n != r.attr("data-index") &&
                        i != a.val() &&
                        0 == e.in_stocks &&
                        0 == r.prop("checked") &&
                        (r.attr("data-index") != attrFirst &&
                          r.attr("disabled", !0),
                        r.parent().addClass("disabled"));
                    });
                });
              }
            }
          )),
      _clickBtnQty(".qty-up"),
      _clickBtnQty(".qty-down"),
      parseInt($("body .detail-product").find("input.product-price").val()) >
        3e6 && $(".installment-show-hide").show(),
      $(".img-main-detail-zoom").length &&
        ($.find(".zoomContainer") && $(".zoomContainer").remove(),
        initElevateZoom());
  }),
  $(window).resize(function () {
    $(".img-main-detail-zoom").length &&
      ($.find(".zoomContainer") && $(".zoomContainer").remove(),
      initElevateZoom());
  }),
  (function (t) {
    (t.ShoppingCart = function () {
      this.init();
    }),
      (t.ShoppingCart.prototype = {
        init: function () {
          this.handleAddToCart(),
            this.handleUpdateCart(),
            this.handleDeleteCart();
        },
        handleAddToCart: function () {
          t("body.product_detail").length &&
            (t(document).on(
              "click",
              "body.product_detail .product-detail form.add-to-cart a.addcart-link",
              function () {
                return 0 ==
                  t(this).parents("form.add-to-cart")[0].checkValidity()
                  ? (t(".notify-cart-no-select-options").length &&
                      (t(".notify-cart-no-select-options").fadeIn("slow"),
                      setTimeout(function () {
                        t(".notify-cart-no-select-options").fadeOut("slow");
                      }, 1e3 *
                        parseInt(
                          t(".notify-cart-no-select-options").data("hide")
                        ))),
                    !1)
                  : (t(this).parents("form.add-to-cart").submit(), !1);
              }
            ),
            t(document).on(
              "click",
              "body.product_detail .product-detail form.add-to-cart a.add-cart",
              function () {
                if (0 == t(this).parents("form.add-to-cart")[0].checkValidity())
                  return (
                    t(".notify-cart-no-select-options").length &&
                      (t(".notify-cart-no-select-options").fadeIn("slow"),
                      setTimeout(function () {
                        t(".notify-cart-no-select-options").fadeOut("slow");
                      }, 1e3 *
                        parseInt(
                          t(".notify-cart-no-select-options").data("hide")
                        ))),
                    !1
                  );
                t("#loading.transparent").show();
                var e = t(this).parents("form.add-to-cart"),
                  a = e.serialize();
                return (
                  t
                    .ajax({ url: e.attr("action"), method: "POST", data: a })
                    .done(function (e) {
                      if ((t("#loading.transparent").hide(), e.success)) {
                        if (
                          (t(".notify-cart").length &&
                            (t(".notify-cart").fadeIn("slow"),
                            setTimeout(function () {
                              t(".notify-cart").fadeOut("slow");
                            }, 1e3 * parseInt(t(".notify-cart").data("hide")))),
                          t(".mini-cart-link i").length)
                        ) {
                          var a = t(document)
                            .find(
                              "#product-detail-carousel img[data-active=true]"
                            )
                            .eq(0);
                          0 == a.length &&
                            (a = t(document)
                              .find("#product-detail-carousel img")
                              .eq(0)),
                            0 == a.length &&
                              (a = t(document)
                                .find(".product-detail .img-main-detail")
                                .eq(0)),
                            0 == a.length &&
                              (a = t(document)
                                .find(".product-detail .img-main-detail-zoom")
                                .eq(0));
                          var n = a.clone(),
                            i = t(
                              ".header-desktop .mini-cart-box .mini-cart-link i"
                            ).eq(0);
                          t(window).width() < 768 &&
                            (i = t(".mini-cart-box .mini-cart-link i").eq(0));
                          var o = i.offset().top,
                            r = i.offset().left;
                          t(".header-container").hasClass("fixed-ontop") &&
                            (t(".menu-cart .mini-cart-box .mini-cart-link i")
                              .length &&
                              (i = t(
                                ".menu-cart .mini-cart-box .mini-cart-link i"
                              ).eq(-1)),
                            (o = i.position().top),
                            (r = i.offset().left)),
                            t("body").hasClass("menu_fixed_1") &&
                            t(".header-container").hasClass("fixed-ontop")
                              ? (t("#loading.transparent").hide(),
                                n
                                  .offset({ top: o - 95, left: r - 95 })
                                  .css({
                                    opacity: "0.5",
                                    position: "absolute",
                                    height: "200px",
                                    width: "200px",
                                    "z-index": "1000",
                                  })
                                  .appendTo(t(".header-container.fixed-ontop"))
                                  .animate(
                                    {
                                      top: o + 5,
                                      left: r + 9,
                                      width: 0,
                                      height: 0,
                                    },
                                    function () {
                                      t(this).detach(),
                                        t(document)
                                          .find(
                                            ".mini-cart-box .mini-cart-link .mini-cart-number"
                                          )
                                          .each(function (a) {
                                            t(this).text(e.data.count);
                                          });
                                    }
                                  ))
                              : (t(window).width() <= 992 &&
                                  ((i = t(
                                    ".menu-cart .mini-cart-box .mini-cart-link i"
                                  ).eq(-1)),
                                  (o = i.offset().top),
                                  (r = i.offset().left)),
                                setTimeout(function () {
                                  n.offset({ top: o - 95, left: r - 95 })
                                    .css({
                                      opacity: "0.5",
                                      position: "absolute",
                                      height: "200px",
                                      width: "200px",
                                      "z-index": "1000",
                                    })
                                    .appendTo(t("body"))
                                    .animate(
                                      {
                                        top: o + 5,
                                        left: r + 9,
                                        width: 0,
                                        height: 0,
                                      },
                                      function () {
                                        t(this).detach(),
                                          t(document)
                                            .find(
                                              ".mini-cart-box .mini-cart-link .mini-cart-number"
                                            )
                                            .each(function () {
                                              t(this).text(e.data.count);
                                            });
                                      }
                                    );
                                }, 600),
                                t("html, body").animate(
                                  { scrollTop: 0 },
                                  function () {
                                    t("#loading.transparent").hide();
                                  }
                                ));
                        }
                      } else
                        e.message &&
                          t(".notify-cart-no-select-options").length &&
                          (t(".notify-cart-no-select-options").fadeIn("slow"),
                          setTimeout(function () {
                            t(".notify-cart-no-select-options").fadeOut("slow");
                          }, 1e3 *
                            parseInt(
                              t(".notify-cart-no-select-options").data("hide")
                            )));
                    }),
                  !1
                );
              }
            ),
            t(document).on(
              "click",
              "body.product_detail .product-detail form.add-to-cart button.buy_now",
              function () {
                t(this).parents("form.add-to-cart").submit();
              }
            ),
            t(document).on(
              "click",
              "body.product_detail .product-detail form.add-to-cart button.add_to_cart",
              function () {
                if (0 == t(this).parents("form.add-to-cart")[0].checkValidity())
                  return (
                    t(".notify-cart-no-select-options").length &&
                      (t(".notify-cart-no-select-options").fadeIn("slow"),
                      setTimeout(function () {
                        t(".notify-cart-no-select-options").fadeOut("slow");
                      }, 1e3 *
                        parseInt(
                          t(".notify-cart-no-select-options").data("hide")
                        ))),
                    !1
                  );
                t("#loading.transparent").show();
                var e = t(this).parents("form.add-to-cart"),
                  a = e.serialize();
                return (
                  t
                    .ajax({ url: e.attr("action"), method: "POST", data: a })
                    .done(function (e) {
                      if ((t("#loading.transparent").hide(), e.success)) {
                        if (
                          (t(".notify-cart").length &&
                            (t(".notify-cart").fadeIn("slow"),
                            setTimeout(function () {
                              t(".notify-cart").fadeOut("slow");
                            }, 1e3 * parseInt(t(".notify-cart").data("hide")))),
                          t(".mini-cart-link i").length)
                        ) {
                          var a = t(document)
                            .find(
                              "#product-detail-carousel img[data-active=true]"
                            )
                            .eq(0);
                          0 == a.length &&
                            (a = t(document)
                              .find("#product-detail-carousel img")
                              .eq(0)),
                            0 == a.length &&
                              (a = t(document)
                                .find(".product-detail .img-main-detail")
                                .eq(0)),
                            0 == a.length &&
                              (a = t(document)
                                .find(".product-detail .img-main-detail-zoom")
                                .eq(0));
                          var n = a.clone(),
                            i = t(
                              ".header-desktop .mini-cart-box .mini-cart-link i"
                            ).eq(0);
                          t(window).width() < 768 &&
                            (i = t(".mini-cart-box .mini-cart-link i").eq(0));
                          var o = i.offset().top,
                            r = i.offset().left;
                          t(".header-container").hasClass("fixed-ontop") &&
                            (t(".menu-cart .mini-cart-box .mini-cart-link i")
                              .length &&
                              (i = t(
                                ".menu-cart .mini-cart-box .mini-cart-link i"
                              ).eq(-1)),
                            (o = i.position().top),
                            (r = i.offset().left)),
                            t("body").hasClass("menu_fixed_1") &&
                            t(".header-container").hasClass("fixed-ontop")
                              ? (t("#loading.transparent").hide(),
                                n
                                  .offset({ top: o - 95, left: r - 95 })
                                  .css({
                                    opacity: "0.5",
                                    position: "absolute",
                                    height: "200px",
                                    width: "200px",
                                    "z-index": "1000",
                                  })
                                  .appendTo(t(".header-container.fixed-ontop"))
                                  .animate(
                                    {
                                      top: o + 5,
                                      left: r + 9,
                                      width: 0,
                                      height: 0,
                                    },
                                    function () {
                                      t(this).detach(),
                                        t(document)
                                          .find(
                                            ".mini-cart-box .mini-cart-link .mini-cart-number"
                                          )
                                          .each(function (a) {
                                            t(this).text(e.data.count);
                                          });
                                    }
                                  ))
                              : (t(window).width() <= 992 &&
                                  ((i = t(
                                    ".menu-cart .mini-cart-box .mini-cart-link i"
                                  ).eq(-1)),
                                  (o = i.offset().top),
                                  (r = i.offset().left)),
                                setTimeout(function () {
                                  n.offset({ top: o - 95, left: r - 95 })
                                    .css({
                                      opacity: "0.5",
                                      position: "absolute",
                                      height: "200px",
                                      width: "200px",
                                      "z-index": "1000",
                                    })
                                    .appendTo(t("body"))
                                    .animate(
                                      {
                                        top: o + 5,
                                        left: r + 9,
                                        width: 0,
                                        height: 0,
                                      },
                                      function () {
                                        t(this).detach(),
                                          t(document)
                                            .find(
                                              ".mini-cart-box .mini-cart-link .mini-cart-number"
                                            )
                                            .each(function () {
                                              t(this).text(e.data.count);
                                            });
                                      }
                                    );
                                }, 600),
                                t("html, body").animate(
                                  { scrollTop: 0 },
                                  function () {
                                    t("#loading.transparent").hide();
                                  }
                                ));
                        }
                      } else
                        e.message &&
                          t(".notify-cart-no-select-options").length &&
                          (t(".notify-cart-no-select-options").fadeIn("slow"),
                          setTimeout(function () {
                            t(".notify-cart-no-select-options").fadeOut("slow");
                          }, 1e3 *
                            parseInt(
                              t(".notify-cart-no-select-options").data("hide")
                            )));
                    }),
                  !1
                );
              }
            ),
            t(document).on(
              "click",
              "body.product_detail .product-detail form.add-to-cart a.product_prepay_btn_addtocart",
              function () {
                var e = t(this).attr("data-price");
                return (
                  t(this)
                    .parent()
                    .append(
                      '<input type="hidden" name="is_prepay" value="true" /><input type="hidden" name="prepay_price" value="' +
                        e +
                        '" />'
                    ),
                  t(this).parents("form.add-to-cart").submit(),
                  !1
                );
              }
            ),
            t(document).on(
              "click",
              "body.product_detail .product-detail form.add-to-cart a.installment",
              function () {
                return (
                  t(this).attr("data-price"),
                  t(this)
                    .parent()
                    .append(
                      '<input type="hidden" name="is_installment" value="true" />'
                    ),
                  t(this).parents("form.add-to-cart").submit(),
                  !1
                );
              }
            )),
            t(".product-item a.add-cart").length &&
              t(document).on("click", ".product-item a.add-cart", function () {
                var e = t(this).parents(".product-item"),
                  a = e.find(".img-product img").eq(0);
                return (
                  t
                    .ajax({ url: e.attr("action"), method: "POST" })
                    .done(function (e) {
                      if (
                        e.success &&
                        (t(".notify-cart").length &&
                          (t(".notify-cart").fadeIn("slow"),
                          setTimeout(function () {
                            t(".notify-cart").fadeOut("slow");
                          }, 1e3 * parseInt(t(".notify-cart").data("hide")))),
                        t(".mini-cart-link i").length)
                      ) {
                        var n = a.clone(),
                          i = t(
                            ".header-desktop .mini-cart-box .mini-cart-link i"
                          ).eq(0);
                        t(window).width() < 768 &&
                          (i = t(".mini-cart-box .mini-cart-link i").eq(0));
                        var o = i.offset().top,
                          r = i.offset().left;
                        t(".header-container").hasClass("fixed-ontop") &&
                          (t(".menu-cart .mini-cart-box .mini-cart-link i")
                            .length &&
                            (i = t(
                              ".menu-cart .mini-cart-box .mini-cart-link i"
                            ).eq(-1)),
                          (o = i.position().top),
                          (r = i.offset().left)),
                          t("body").hasClass("menu_fixed_1") &&
                          t(".header-container").hasClass("fixed-ontop")
                            ? n
                                .offset({ top: o - 95, left: r - 95 })
                                .css({
                                  opacity: "0.5",
                                  position: "absolute",
                                  height: "200px",
                                  width: "200px",
                                  "z-index": "1000",
                                })
                                .appendTo(t(".header-container.fixed-ontop"))
                                .animate(
                                  {
                                    top: o + 5,
                                    left: r + 9,
                                    width: 0,
                                    height: 0,
                                  },
                                  function () {
                                    t(this).detach(),
                                      t(document)
                                        .find(
                                          ".mini-cart-box .mini-cart-link .mini-cart-number"
                                        )
                                        .each(function (a) {
                                          t(this).text(e.data.count);
                                        });
                                  }
                                )
                            : (t(window).width() <= 992 &&
                                ((i = t(
                                  ".menu-cart .mini-cart-box .mini-cart-link i"
                                ).eq(-1)),
                                (o = i.offset().top),
                                (r = i.offset().left)),
                              setTimeout(function () {
                                n.offset({ top: o - 95, left: r - 95 })
                                  .css({
                                    opacity: "0.5",
                                    position: "absolute",
                                    height: "200px",
                                    width: "200px",
                                    "z-index": "1000",
                                  })
                                  .appendTo(t("body"))
                                  .animate(
                                    {
                                      top: o + 5,
                                      left: r + 9,
                                      width: 0,
                                      height: 0,
                                    },
                                    function () {
                                      t(this).detach(),
                                        t(document)
                                          .find(
                                            ".mini-cart-box .mini-cart-link .mini-cart-number"
                                          )
                                          .each(function () {
                                            t(this).text(e.data.count);
                                          });
                                    }
                                  );
                              }, 600));
                      }
                    }),
                  !1
                );
              }),
            t(".product-item button.buy_now").length &&
              t(document).on(
                "click",
                ".product-item button.buy_now",
                function () {
                  (staying_in_site = !0),
                    (location.href =
                      "/api/v2/add-to-cart/" +
                      t(this).data("id") +
                      "/" +
                      wb_language);
                }
              ),
            t(".product-item button.add_to_cart").length &&
              t(document).on(
                "click",
                ".product-item button.add_to_cart",
                function () {
                  var e = t(this)
                    .parents(".product-item")
                    .find(".img-product img")
                    .eq(0);
                  return (
                    t
                      .ajax({
                        url:
                          "/api/v2/add-to-cart/" +
                          t(this).data("id") +
                          "/" +
                          wb_language,
                        method: "POST",
                      })
                      .done(function (a) {
                        if (
                          a.success &&
                          (t(".notify-cart").length &&
                            (t(".notify-cart").fadeIn("slow"),
                            setTimeout(function () {
                              t(".notify-cart").fadeOut("slow");
                            }, 1e3 * parseInt(t(".notify-cart").data("hide")))),
                          t(".mini-cart-link i").length)
                        ) {
                          var n = e.clone(),
                            i = t(
                              ".header-desktop .mini-cart-box .mini-cart-link i"
                            ).eq(0);
                          t(window).width() < 768 &&
                            (i = t(".mini-cart-box .mini-cart-link i").eq(0));
                          var o = i.offset().top,
                            r = i.offset().left;
                          t(".header-container").hasClass("fixed-ontop") &&
                            (t(".menu-cart .mini-cart-box .mini-cart-link i")
                              .length &&
                              (i = t(
                                ".menu-cart .mini-cart-box .mini-cart-link i"
                              ).eq(-1)),
                            (o = i.position().top),
                            (r = i.offset().left)),
                            t("body").hasClass("menu_fixed_1") &&
                            t(".header-container").hasClass("fixed-ontop")
                              ? n
                                  .offset({ top: o - 95, left: r - 95 })
                                  .css({
                                    opacity: "0.5",
                                    position: "absolute",
                                    height: "200px",
                                    width: "200px",
                                    "z-index": "1000",
                                  })
                                  .appendTo(t(".header-container.fixed-ontop"))
                                  .animate(
                                    {
                                      top: o + 5,
                                      left: r + 9,
                                      width: 0,
                                      height: 0,
                                    },
                                    function () {
                                      t(this).detach(),
                                        t(document)
                                          .find(
                                            ".mini-cart-box .mini-cart-link .mini-cart-number"
                                          )
                                          .each(function (e) {
                                            t(this).text(a.data.count);
                                          });
                                    }
                                  )
                              : (t(window).width() <= 992 &&
                                  ((i = t(
                                    ".menu-cart .mini-cart-box .mini-cart-link i"
                                  ).eq(-1)),
                                  (o = i.offset().top),
                                  (r = i.offset().left)),
                                setTimeout(function () {
                                  n.offset({ top: o - 95, left: r - 95 })
                                    .css({
                                      opacity: "0.5",
                                      position: "absolute",
                                      height: "200px",
                                      width: "200px",
                                      "z-index": "1000",
                                    })
                                    .appendTo(t("body"))
                                    .animate(
                                      {
                                        top: o + 5,
                                        left: r + 9,
                                        width: 0,
                                        height: 0,
                                      },
                                      function () {
                                        t(this).detach(),
                                          t(document)
                                            .find(
                                              ".mini-cart-box .mini-cart-link .mini-cart-number"
                                            )
                                            .each(function () {
                                              t(this).text(a.data.count);
                                            });
                                      }
                                    );
                                }, 600));
                        }
                      }),
                    !1
                  );
                }
              );
        },
        handleUpdateCart: function () {
          t(document).on(
            "change",
            "#shopping-cart .product-quantity .product-qty",
            function () {
              t("#loading.transparent").show();
              var e = {
                  update: {
                    id: t(this).parents("div.cart-item").attr("data-id"),
                    quantity: t(this).val(),
                  },
                },
                a = "/api/data-checkout";
              "vi" != wb_language &&
                "" != wb_language &&
                (a = "/" + wb_language + a),
                t
                  .ajax({ url: a, type: "POST", dataType: "json", data: e })
                  .done(function (t) {
                    location.reload();
                  });
            }
          );
        },
        handleDeleteCart: function () {
          t("#shopping-cart .pdelete .delete").length &&
            t(document).on(
              "click",
              "#shopping-cart .pdelete .delete",
              function () {
                t("#loading.transparent").show();
                var e = {
                    delete: {
                      id: t(this).parents("div.cart-item").attr("data-id"),
                    },
                  },
                  a = "/api/data-checkout";
                "vi" != wb_language &&
                  "" != wb_language &&
                  (a = "/" + wb_language + a),
                  t
                    .ajax({ url: a, type: "POST", dataType: "json", data: e })
                    .done(function (t) {
                      location.reload();
                    });
              }
            );
        },
      }),
      t(".notify-cart .icon-close").on("click", function (e) {
        t(".notify-cart").fadeOut("slow");
      }),
      t(document).mouseup(function (e) {
        0 === t(e.target).closest(".notify-container").length &&
          t(".notify-cart").fadeOut("slow");
      }),
      new t.ShoppingCart();
  })(jQuery);
var refCode = "";
function sendMailOrder() {
  $.ajax({
    url: $("#data_js").data("route_order_email_new"),
    type: "POST",
    data: { _token: $("meta[name=csrf-token]").attr("content") },
  });
}
function renderCartForm(t) {
  if (($("#coupon_list").empty(), t.discount.coupon.item.length)) {
    var e = [];
    $.each(t.discount.coupon.item, function (t, a) {
      e.includes(a.code) ||
        (e.push(a.code),
        $("#coupon_list").append(
          '<label data-coupon="'
            .concat(a.code, '">')
            .concat(a.code, '<a href="javascript:void(0);" title="')
            .concat(
              wb_translate.text_remove_coupon,
              '"><i class="fa fa-times"></i></a></label>'
            )
        ));
    }),
      $("input#coupons").val(JSON.stringify(e)),
      $("#price-discount").html("-" + t.discount.coupon.price_formatted),
      t.discount.coupon.price > 0 && $("tr#promotion").show(),
      $(".coupon_message").show(),
      $("input#coupon_code").val("");
  } else $("tr#promotion").hide();
  $(".noti_coupon").hide(),
    $("#noti_coupon").empty(),
    "" != t.discount.coupon.message &&
      ($("#noti_coupon").html(
        '<span style="color: red;">'.concat(
          t.discount.coupon.message,
          "</span>"
        )
      ),
      $(".noti_coupon").show()),
    $("#stotal-mini").html(t.total_formatted);
}
function renderCheckoutForm(t) {
  if (t.shipping.shipping_method.length) {
    $(".ship_methods").empty();
    var e = !0,
      a =
        '<li class="payment_method_bacs"><select class="form-control" name="ship">';
    t.shipping.shipping_method.length;
    for (var n = 0; n < t.shipping.shipping_method.length; n++) {
      var i = t.shipping.shipping_method[n],
        o = "";
      if (i.data.length) {
        void 0 !== i.name &&
          ((a += '<optgroup label="'.concat(i.name, '">')),
          (o = i.name + " - "));
        for (var r = 0; r < i.data.length; r++) {
          var d = "";
          t.shipping.shipping_method_selected == o + i.data[r].name &&
            (d = 'selected="selected"'),
            (a += '<option value="'
              .concat(i.data[r].fee, '" ')
              .concat(d, ' data-price="')
              .concat(i.data[r].price, '" data-value="')
              .concat(o + i.data[r].name, '">')
              .concat(i.data[r].name, " - ")
              .concat(i.data[r].price, "</option>"));
        }
        void 0 !== i.name && (a += "</optgroup>");
      } else
        (e = !1),
          void 0 !== i.name &&
            ((d = ""),
            t.shipping.shipping_method_selected == i.name &&
              (d = 'selected="selected"'),
            (a += '<option value="0" '
              .concat(d, ' data-price="0" data-value="')
              .concat(i.name, '">')
              .concat(i.name, "</option>")));
    }
    if (
      ((a += "</select></li>"),
      $(".ship_methods").append(a).show(),
      e
        ? ($(".shipping_message_val").hide(), $(".shipping_message").empty())
        : t.shipping.shipping_message &&
          ($(".shipping_message").html(t.shipping.shipping_message),
          $("#shipping_fee_val").empty(),
          $(".shipping_message_val").show()),
      $(".edit_shipping").show(),
      $(".shipping_fee").show(),
      $(document).find(".payment_method_bacs select[name=ship]").length)
    ) {
      var c = $(".payment_method_bacs select[name=ship] option:selected");
      $("#shipping_fee_val").text(c.attr("data-price")),
        $("#shipping_fee_val").append(
          '<input type="hidden" name="shipping_fee" value="' + c.val() + '" />'
        ),
        $("#shipping_fee_val").append(
          '<input type="hidden" name="shipping_method" value="' +
            c.attr("data-value") +
            '" />'
        );
    }
    $(".edit_shipping").parent().show();
  } else
    $(".edit_shipping").hide(),
      $(".ship_methods").empty(),
      $("#shipping_fee_val").empty(),
      $(".shipping_fee").hide(),
      t.shipping.shipping_message &&
        ($(".shipping_message").html(t.shipping.shipping_message),
        $(".shipping_message_val").show(),
        $(".shipping_fee").show());
  if (
    ($(".edit_payment").length && $(".edit_shipping").parent().show(),
    t.discount.coupon.item.length)
  ) {
    $("#coupon_list").empty();
    var s = [];
    $.each(t.discount.coupon.item, function (t, e) {
      s.push(e.code),
        $("#coupon_list").append(
          '<label data-coupon="'
            .concat(e.code, '">')
            .concat(e.code, '<a href="javascript:void(0);" title="')
            .concat(
              wb_translate.text_remove_coupon,
              '"><i class="fa fa-times"></i></a></label>'
            )
        );
    }),
      $("input#coupons").val(JSON.stringify(s)),
      $("#price-discount").html("-" + t.discount.coupon.price_formatted),
      t.discount.coupon.price > 0 && $("tr#promotion").show(),
      $(".coupon_message").show(),
      $("input#coupon_code").val("");
  } else $("tr#promotion").hide();
  if (
    ($(".noti_coupon").hide(),
    $("#noti_coupon").empty(),
    "" != t.discount.coupon.message &&
      ($("#noti_coupon").html(
        '<span style="color: red;">'.concat(
          t.discount.coupon.message,
          "</span>"
        )
      ),
      $(".noti_coupon").show()),
    void 0 !== t.is_prepay && null !== t.is_prepay && 1 == t.is_prepay)
  )
    return (
      $("#stotal-mini").html(t.prepayTotal_formatted),
      void $("#loading.transparent").hide()
    );
  $("#stotal-mini").html(t.total_formatted), $("#loading.transparent").hide();
}
function updateDataCheckout(t) {
  var e = "/api/data-checkout";
  "vi" != wb_language && "" != wb_language && (e = "/" + wb_language + e),
    $.ajax({ url: e, type: "POST", data: t }).done(function (t) {
      if (
        ($(document).find("input[name=action]").remove(),
        "checkout" == t.action)
      )
        return (
          void 0 !== t.validate && t.validate
            ? ($.each(t.validate, function (t, e) {
                $("#fieldset-billing #" + t)
                  .parent()
                  .find("small")
                  .remove(),
                  $("#fieldset-billing #" + t)
                    .parent()
                    .append(
                      $(
                        '<small class="form-text text-danger" style="margin-top: -5px;">' +
                          e[0] +
                          "</small>"
                      )
                    );
              }),
              $("#loading.transparent").hide())
            : (location.href = $("#checkout-order-form").attr("action")),
          !1
        );
      renderCheckoutForm(t);
    });
}
function updateDataCart(t) {
  var e = "/api/data-checkout";
  "vi" != wb_language && "" != wb_language && (e = "/" + wb_language + e),
    $.ajax({ url: e, type: "POST", data: t })
      .done(function (t) {
        renderCartForm(t);
      })
      .always(function () {
        $("#loading.transparent").hide();
      });
}
function getDataFormCart() {
  $("#loading.transparent").show();
  var t = {};
  if ("" != $("input#coupons").val().trim()) {
    var e = JSON.parse($("input#coupons").val());
    e.length && (t.coupons = e);
  }
  updateDataCart(t);
}
function getDataFormCheckout() {
  $("#loading.transparent").show();
  var t,
    e = {};
  $("input[name=has_saddress]").length &&
    ($("input[name=has_saddress]").is(":checked") ||
      ((t = $("#district").find("option:selected").data("id")) &&
        (e.shipping_address = {
          ward_id: $("#wb_ward").find("option:selected").data("id"),
          ward_ghn_id: $("#wb_ward").find("option:selected").data("ghn-id"),
          ward_vtp_id: $("#wb_ward").find("option:selected").data("vtp-id"),
          ward_name: $("#wb_ward").find("option:selected").val(),
          district_id: t,
          district_ghn_id: $("#district")
            .find("option:selected")
            .data("ghn-id"),
          district_vtp_id: $("#district")
            .find("option:selected")
            .data("vtp-id"),
          district_name: $("#district").find("option:selected").val(),
          province_id: $("#province").find("option:selected").data("id"),
          province_ghn_id: $("#province")
            .find("option:selected")
            .data("ghn-id"),
          province_vtp_id: $("#province")
            .find("option:selected")
            .data("vtp-id"),
          province_name: $("#province").find("option:selected").val(),
        })),
    $("input[name=has_saddress]").is(":checked") &&
      (t = $("#sdistrict").find("option:selected").data("id")) &&
      (e.shipping_address = {
        ward_id: $("#wb_sward").find("option:selected").data("id"),
        ward_ghn_id: $("#wb_sward").find("option:selected").data("ghn-id"),
        ward_vtp_id: $("#wb_sward").find("option:selected").data("vtp-id"),
        ward_name: $("#wb_sward").find("option:selected").val(),
        district_id: t,
        district_ghn_id: $("#sdistrict").find("option:selected").data("ghn-id"),
        district_vtp_id: $("#sdistrict").find("option:selected").data("vtp-id"),
        district_name: $("#sdistrict").find("option:selected").val(),
        province_id: $("#sprovince").find("option:selected").data("id"),
        province_ghn_id: $("#sprovince").find("option:selected").data("ghn-id"),
        province_vtp_id: $("#sprovince").find("option:selected").data("vtp-id"),
        province_name: $("#sprovince").find("option:selected").val(),
      }));
  if ($("input#coupons").length && "" != $("input#coupons").val().trim()) {
    var a = JSON.parse($("input#coupons").val());
    a.length && (e.coupons = a);
  }
  $("input#name").length &&
    "" != $("input#name").val().trim() &&
    (e.name = $("input#name").val().trim()),
    $("input#email").length &&
      "" != $("input#email").val().trim() &&
      (e.email = $("input#email").val().trim()),
    $("input#phone").length &&
      "" != $("input#phone").val().trim() &&
      (e.phone = $("input#phone").val().trim()),
    $("select#province").length &&
      "" != $("select#province").val().trim() &&
      (e.province = $("select#province").val().trim()),
    $("select#district").length &&
      "" != $("select#district").val().trim() &&
      (e.district = $("select#district").val().trim()),
    $("select#wb_ward").length &&
      "" != $("select#wb_ward").val().trim() &&
      (e.ward = $("select#wb_ward").val().trim()),
    $("input#address").length &&
      "" != $("input#address").val().trim() &&
      (e.address = $("input#address").val().trim()),
    "" != $("textarea#note").val().trim() &&
      (e.note = $("textarea#note").val().trim()),
    $("input#sname").length &&
      "" != $("input#sname").val().trim() &&
      (e.sname = $("input#sname").val().trim()),
    $("input#semail").length &&
      "" != $("input#semail").val().trim() &&
      (e.semail = $("input#semail").val().trim()),
    $("input#sphone").length &&
      "" != $("input#sphone").val().trim() &&
      (e.sphone = $("input#sphone").val().trim()),
    $("select#sprovince").length &&
      "" != $("select#sprovince").val().trim() &&
      (e.sprovince = $("select#sprovince").val().trim()),
    $("select#sdistrict").length &&
      "" != $("select#sdistrict").val().trim() &&
      (e.sdistrict = $("select#sdistrict").val().trim()),
    $("select#wb_sward").length &&
      "" != $("select#wb_sward").val().trim() &&
      (e.sward = $("select#wb_sward").val().trim()),
    $("input#saddress").length &&
      "" != $("input#saddress").val().trim() &&
      (e.saddress = $("input#saddress").val().trim()),
    $("input[name=payment]").length &&
      $("input[name=payment]").val() &&
      (e.payment_id = $("input[name=payment]:checked").val()),
    $("input[name=parent_id]").length &&
      $("input[name=parent_id]").val() &&
      (e.parent_id = $("input[name=parent_id]").val()),
    $("input[name=prepay_amount]").length &&
      $("input[name=prepay_amount]").val() &&
      (e.prepay_amount = $("input[name=prepay_amount]").val()),
    $(document).find("input[name=ref_code]").val() &&
      (e.ref_code = $(document).find("input[name=ref_code]").val()),
    $(document).find("input[name=action]").val() &&
      (e.action = $(document).find("input[name=action]").val()),
    $(document).find("input[name=shipping_fee]").val() &&
      (e.shipping_fee = $(document).find("input[name=shipping_fee]").val()),
    $(document).find("input[name=shipping_method]").val() &&
      (e.shipping_method = $(document)
        .find("input[name=shipping_method]")
        .val()),
    $("input[name=has_saddress]").is(":checked") && (e.has_saddress = 1),
    $('[name*="custom_fields"]').length &&
      ((e.custom_fields = {}),
      $('[name*="custom_fields"]').each(function (t, a) {
        var n = $(this).attr("name");
        e.custom_fields[n.substring(n.indexOf("[") + 1, n.indexOf("]"))] =
          $(this).val();
      })),
    updateDataCheckout(e);
}
$(document).ready(function () {
  (refCode = getRefCode()),
    ($("body.checkout").length ||
      $("body.cart").length ||
      $("body.product_detail").length) &&
      0 == $("#loading.transparent").length &&
      $("body").append(
        '<div id="loading" class="transparent" style="display: none;"><div class="sk-circle"><div class="sk-circle1 sk-child"></div><div class="sk-circle2 sk-child"></div><div class="sk-circle3 sk-child"></div><div class="sk-circle4 sk-child"></div><div class="sk-circle5 sk-child"></div><div class="sk-circle6 sk-child"></div><div class="sk-circle7 sk-child"></div><div class="sk-circle8 sk-child"></div><div class="sk-circle9 sk-child"></div><div class="sk-circle10 sk-child"></div><div class="sk-circle11 sk-child"></div><div class="sk-circle12 sk-child"></div></div></div>'
      ),
    ($("body.checkout").length || $("body.cart").length) &&
      ($(document).find("input[name=ref_code]").remove(),
      $("#checkout-order-form").append(
        '<input type="hidden" name="ref_code" value="'.concat(refCode, '"/>')
      ),
      $("#wbFastOrderForm").append(
        '<input type="hidden" name="ref_code" value="'.concat(refCode, '"/>')
      )),
    $("body.checkout").length &&
      (buildAddress($("#province"), $("#district"), $("#wb_ward")),
      buildAddress($("#sprovince"), $("#sdistrict"), $("#wb_sward"))),
    $(".widget-search_house").length &&
      buildAddress($("#province"), $("#district")),
    $("body.checkout_thankyou").length && sendMailOrder(),
    $("#loading.transparent").length && $("#loading.transparent").hide();
}),
  $(document).on(
    "change",
    ".payment_method_bacs select[name=ship]",
    function () {
      var t = $(".payment_method_bacs select[name=ship] option:selected");
      $("#shipping_fee_val").text(t.attr("data-price")),
        $("#shipping_fee_val").append(
          '<input type="hidden" name="shipping_fee" value="' + t.val() + '" />'
        ),
        $("#shipping_fee_val").append(
          '<input type="hidden" name="shipping_method" value="' +
            t.attr("data-value") +
            '" />'
        ),
        getDataFormCheckout();
    }
  ),
  $(document).on(
    "keyup blur",
    "#wbFastOrderForm input[name=phone]",
    function (t) {
      "" != $(this).val().trim()
        ? $("#btnFastOrder").prop("disabled", !1)
        : $("#btnFastOrder").prop("disabled", !0);
    }
  ),
  $(document).on("keyup blur", "input#coupon_code", function (t) {
    "" != $(this).val().trim()
      ? $("#check-coupon").removeClass("disabled")
      : $("#check-coupon").addClass("disabled");
  }),
  $(document).on("click", "#coupon_list label a", function () {
    var t = $(this).parent().data("coupon"),
      e = JSON.parse($("input#coupons").val());
    $.each(e, function (a, n) {
      n == t && e.splice(a, 1);
    }),
      $("input#coupons").val(JSON.stringify(e)),
      $(this).parent().remove(),
      $("body.checkout").length && getDataFormCheckout(),
      $("body.cart").length && getDataFormCart();
  }),
  $(document).on("click", "#fieldset-billing", function () {
    $("#fieldset-billing").find("small").remove();
  }),
  $(document).on("click", '#check-coupon:not(".disabled")', function (t) {
    if ("" != $("input#coupon_code").val().trim()) {
      var e = $("input#coupon_code").val().replace(/ /g, ""),
        a = [];
      "" != $("input#coupons").val().trim() &&
        (a = JSON.parse($("input#coupons").val())),
        -1 == a.indexOf(e) && a.push(e),
        $("input#coupons").val(JSON.stringify(a)),
        $("body.checkout").length && getDataFormCheckout(),
        $("body.cart").length && getDataFormCart();
    }
  }),
  $("#same-as-billing").on("change", function () {
    $(this).prop("checked")
      ? $("#fieldset-shipping").slideDown("normal")
      : $("#fieldset-shipping").slideUp("normal");
  }),
  $("#district").on("change", function () {
    $("input[name=has_saddress]").is(":checked") ||
      ($("input[name=shipping_fee]").remove(),
      $("input[name=shipping_method]").remove(),
      $(this).val() && getDataFormCheckout());
  }),
  $("#sdistrict").on("change", function () {
    $("input[name=shipping_fee]").remove(),
      $("input[name=shipping_method]").remove(),
      $(this).val() && getDataFormCheckout();
  }),
  $("#wbFastOrderForm").on("submit", function () {
    if ("" == $(this).find("input[name=phone]").val().trim())
      return alert(wb_translate.phone_required), !1;
    $(document).find("input[name=ref_code]").remove(),
      $(this).append(
        '<input type="hidden" name="is_fast_order" value="true"/>'
      ),
      $(this).append(
        '<input type="hidden" name="ref_code" value="'.concat(refCode, '"/>')
      );
  }),
  $("#submit-order").on("click", function (t) {
    return (
      t.preventDefault(),
      $(document).find("input[name=action]").remove(),
      $(this).append('<input type="hidden" name="action" value="checkout"/>'),
      getDataFormCheckout(),
      !1
    );
  }),
  $("#checkout-order-form").bind("keypress", function (t) {
    if (13 == t.keyCode) return !1;
  }),
  $("input[type=radio][name=payment]").on("change", function () {
    $(".payment_description").hide(), $("#payment_" + $(this).val()).show();
  }),
  (function (t) {
    t("body.checkout .product-checkout").length &&
      ((t.ShoppingCart = function () {
        this.init();
      }),
      (t.ShoppingCart.prototype = {
        init: function () {
          this.handleUpdateCart(), this.handleDeleteCart();
        },
        handleUpdateCart: function () {
          t(document).on(
            "change",
            "body.checkout .product-checkout .product-qty",
            function () {
              t("#loading.transparent").show();
              var e = {
                  update: {
                    id: t(this).parents("div.cart-item").attr("data-id"),
                    quantity: t(this).val(),
                  },
                },
                a = "/api/data-checkout";
              "vi" != wb_language &&
                "" != wb_language &&
                (a = "/" + wb_language + a),
                t
                  .ajax({ url: a, type: "POST", dataType: "json", data: e })
                  .done(function (t) {
                    location.reload();
                  });
            }
          );
        },
        handleDeleteCart: function () {
          t("body.checkout .product-checkout .pdelete .delete").length &&
            t(document).on(
              "click",
              "body.checkout .product-checkout .pdelete .delete",
              function () {
                t("#loading.transparent").show();
                var e = {
                    delete: {
                      id: t(this).parents("div.cart-item").attr("data-id"),
                    },
                  },
                  a = "/api/data-checkout";
                "vi" != wb_language &&
                  "" != wb_language &&
                  (a = "/" + wb_language + a),
                  t
                    .ajax({ url: a, type: "POST", dataType: "json", data: e })
                    .done(function (t) {
                      location.reload();
                    });
              }
            );
        },
      }),
      new t.ShoppingCart());
  })(jQuery);
var isExitPopup = !0;
function ClickExitPopup() {
  $("#show_exit_popup").length &&
    ($("#exit_popup").click(), $("#fancybox-overlay").unbind());
}
jQuery(document).ready(function () {
  $("#show_exit_popup").length &&
    "true" == getCookie("show_exit_popup") &&
    $("#exit_popup").fancybox({
      titleShow: "false",
      transitionIn: "none",
      transitionOut: "none",
      hideOnOverlayClick: !1,
      hideOnContentClick: !1,
      enableEscapeButton: !0,
      overlayShow: !0,
      smallBtn: !1,
      buttons: ["close"],
      toolbar: "auto",
      afterLoad: function () {
        document.cookie =
          "show_exit_popup=;Path=/;expires=Thu, 01 Jan 1970 00:00:01 GMT;";
      },
    });
}),
  (function () {
    var t;
    function e(e) {
      var a, n, i;
      $(window).scrollTop(),
        null == (e = e || window.event).pageX &&
          null != e.clientX &&
          ((n = (a = (e.target && e.target.ownerDocument) || document)
            .documentElement),
          (i = a.body),
          (e.pageX =
            e.clientX +
            ((n && n.scrollLeft) || (i && i.scrollLeft) || 0) -
            ((n && n.clientLeft) || (i && i.clientLeft) || 0)),
          (e.pageY =
            e.clientY +
            ((n && n.scrollTop) || (i && i.scrollTop) || 0) -
            ((n && n.clientTop) || (i && i.clientTop) || 0))),
        (t = { x: e.pageX, y: e.pageY + 1e5 });
    }
    (document.onmousemove = function (e) {
      var a, n, i;
      $(window).scrollTop(),
        null == (e = e || window.event).pageX &&
          null != e.clientX &&
          ((n = (a = (e.target && e.target.ownerDocument) || document)
            .documentElement),
          (i = a.body),
          (e.pageX =
            e.clientX +
            ((n && n.scrollLeft) || (i && i.scrollLeft) || 0) -
            ((n && n.clientLeft) || (i && i.clientLeft) || 0)),
          (e.pageY =
            e.clientY +
            ((n && n.scrollTop) || (i && i.scrollTop) || 0) -
            ((n && n.clientTop) || (i && i.clientTop) || 0))),
        (t = { x: e.pageX, y: e.pageY });
    }),
      window.addEventListener &&
        window.addEventListener("DOMMouseScroll", e, !1),
      (window.onmousewheel = document.onmousewheel = e),
      (myTime = setInterval(function () {
        var e = t,
          a = $(window).scrollTop();
        e &&
          e.y - a < 5 &&
          (clearInterval(myTime),
          isExitPopup && (ClickExitPopup(), (isExitPopup = !1)));
      }, 100));
  })();
var solantat = 0,
  staying_in_site = !1;
function before() {
  if ($("#exit_popup").length)
    return staying_in_site || 1 == solantat
      ? void (staying_in_site = !1)
      : ("" != exit_popup_url &&
          ($("body div").remove(),
          $("body a").remove(),
          $("body").prepend(
            '<iframe width="100%" style="height:100%" frameborder="0" type="text/html" src="' +
              exit_popup_url +
              '"></frame>'
          ),
          $("html").css({ height: "100%", overflow: "hidden" }),
          $("body").css({
            height: "100%",
            overflow: "hidden",
            "margin-right": "0px",
          })),
        (document.cookie =
          "exit_popup=;Path=/;expires=Thu, 01 Jan 1970 00:00:01 GMT;"),
        (solantat = 1),
        !0);
}
function buildAddress(t, e, a) {
  if (t.length > 0) {
    var n = t.data("id"),
      i = t.data("name"),
      o = t.data("value");
    e.length > 0 &&
      (t.change(function () {
        $("#loading.transparent").show();
        var t = e.data("id"),
          a = e.data("value"),
          n = e.data("name");
        e.find("option:not(:first)").remove();
        var i = { province_id: $(this).find(":selected").data("id") };
        $.ajax({
          type: "GET",
          url: "/api/province/distrist",
          data: i,
          success: function (i) {
            $.each(i, function (i, o) {
              var r = document.createElement("option");
              (r.text = o.name),
                r.setAttribute("data-id", o.id),
                r.setAttribute("data-ghn-id", o.ghn_code),
                (r.value = "name" == a ? o.name : o.id),
                (n != o.name && t != o.id) || (r.selected = !0),
                e.append(r);
            }),
              (t || n) && e.trigger("change");
          },
        }).always(function () {
          $("#loading.transparent").hide();
        });
      }),
      a.length > 0 &&
        e.change(function () {
          var t = a.data("id"),
            n = a.data("value"),
            i = a.data("name");
          a.find("option:not(:first)").remove();
          var o = $(this).find(":selected").data("id");
          $("[name=" + e.attr("name") + "_name]").length &&
            $("[name=" + e.attr("name") + "_name]").val(
              $(this).find(":selected").data("name")
            );
          var r = { district_id: o };
          $.ajax({
            type: "GET",
            url: "/api/district/ward",
            data: r,
            success: function (e) {
              $.each(e, function (e, o) {
                var r = document.createElement("option");
                (r.text = o.name),
                  r.setAttribute("data-id", o.id),
                  r.setAttribute("data-name", o.name),
                  r.setAttribute("data-ghn-id", o.ghn_code),
                  (r.value = "name" == n ? o.name : o.id),
                  (i != o.name && t != o.id) || (r.selected = !0),
                  a.append(r);
              }),
                (t || i) && a.trigger("change");
            },
          }).always(function () {
            $("#loading.transparent").hide();
          });
        })),
      $.ajax({
        type: "GET",
        url: "/api/province",
        success: function (e) {
          $.each(e, function (e, a) {
            var r = document.createElement("option");
            (r.text = a.name),
              r.setAttribute("data-id", a.id),
              r.setAttribute("data-ghn-id", a.ghn_code),
              (r.value = "name" == o ? a.name : a.id),
              (n != a.id && i != a.name) || (r.selected = !0),
              t.append(r);
          }),
            (n || i) && t.trigger("change");
        },
      });
  }
}
$(document).ready(function (t) {
  $(document).on("click", "a", function (t) {
    (staying_in_site = !0),
      "popup" == $(this).attr("id") && (staying_in_site = !1),
      "exit_popup" == $(this).attr("id") && (staying_in_site = !1);
  }),
    $(document).on("click", "button.buy_now", function (t) {
      staying_in_site = !0;
    }),
    $("body form").on("submit", function (t) {
      staying_in_site = !0;
    }),
    (window.onbeforeunload = before);
}),
  jQuery(document).ready(function () {
    if ($("#popup").length) {
      var t = 1e3 * parseInt($("#popup").data("delay-time"));
      $("#popup").fancybox({
        titleShow: "false",
        transitionIn: "none",
        transitionOut: "none",
        hideOnOverlayClick: !1,
        hideOnContentClick: !1,
        enableEscapeButton: !0,
        overlayShow: !0,
        smallBtn: !1,
        buttons: ["close"],
        toolbar: "auto",
      }),
        setTimeout(function () {
          $("#popup").click(), $("#fancybox-overlay").unbind();
        }, t);
    }
  }),
  $(document).ready(function () {
    $("#wb_province").length &&
      $("#wb_district").length &&
      buildAddress($("#wb_province"), $("#wb_district"), $("#wb_ward"));
  });
var no_data_text = $("#affiliate_info").data("textnodata"),
  vi_info_datatable = {
    sProcessing: wb_translate.processing,
    sLengthMenu: "Xem _MENU_ mục",
    sZeroRecords: "Không tìm thấy dòng nào phù hợp",
    sInfo: "Đang xem _START_ đến _END_ trong tổng số _TOTAL_ mục",
    sInfoEmpty: "Đang xem 0 đến 0 trong tổng số 0 mục",
    sInfoFiltered: "(được lọc từ _MAX_ mục)",
    sInfoPostFix: "",
    sSearch: "Tìm:",
    sUrl: "",
    oPaginate: {
      sFirst: wb_translate.paging_first,
      sPrevious: wb_translate.paging_previous,
      sNext: wb_translate.paging_next,
      sLast: wb_translate.paging_last,
    },
  };
function displayAndHandleWithdrawHistory(t, e) {
  var a = $("#withdraw_history_table").DataTable({
    info: !0,
    lengthChange: !1,
    searching: !1,
    language: vi_info_datatable,
    processing: !1,
    serverSide: !0,
    ajax: {
      url: "/api/account/affiliate/" + t + "/withrawal-datatable",
      type: "GET",
      data: {
        user_id: e.data("userid"),
        affiliate_code: e.data("affiliatecode"),
      },
    },
    columns: [
      { data: "formatted_created_at", className: "text-center", orderable: !1 },
      {
        data: "formatted_amount",
        name: "formatted_amount",
        className: "text-center",
        orderable: !1,
      },
      { data: "translated_status", className: "text-center", orderable: !1 },
    ],
  });
  $(document).on("click", ".cancel_withdraw_request", function (n) {
    var i = $(this);
    $(".cancel_withdraw_request").attr({ disabled: "true" }),
      jQuery.ajax({
        url: "/api/account/affiliate/" + t + "/cancel-withdrawal-request",
        type: "POST",
        data: {
          user_id: e.data("userid"),
          affiliate_code: e.data("affiliatecode"),
          transaction_id: i.data("transactionid"),
          _token: $("meta[name=csrf-token]").attr("content"),
        },
        complete: function (t, e) {
          $(".cancel_withdraw_request").removeAttr("disabled");
        },
        success: function (t, e, n) {
          t.success && a.ajax.reload(), alert(t.message);
        },
        error: function (t, e, a) {},
      });
  });
}
function displayBonus(t, e) {
  $("#history_bonus_table").DataTable({
    info: !0,
    lengthChange: !1,
    searching: !1,
    language: vi_info_datatable,
    processing: !1,
    serverSide: !0,
    ajax: {
      url: "/api/account/affiliate/" + t + "/bonus-datatable",
      type: "GET",
      data: {
        user_id: e.data("userid"),
        affiliate_code: e.data("affiliatecode"),
      },
    },
    columns: [
      { data: "order.code", className: "text-center" },
      { data: "order.fullname", className: "text-center", orderable: !1 },
      { data: "translated_status", className: "text-center", orderable: !1 },
      {
        data: "formatted_order_total",
        className: "text-center",
        orderable: !1,
      },
      { data: "formatted_amount", className: "text-center", orderable: !1 },
    ],
  });
}
function submitNewWithdrawRequest(t, e) {
  $(".withdraw_btn_confirm").click(function (a) {
    $(".withdraw_btn_confirm").attr({ disabled: "true" }),
      jQuery.ajax({
        url: "/api/account/affiliate/" + e + "/new-withdrawal-request",
        type: "POST",
        data: {
          user_id: t.data("userid"),
          affiliate_code: t.data("affiliatecode"),
          amount: $("#withdrawal_amount").val(),
          _token: $("meta[name=csrf-token]").attr("content"),
        },
        complete: function (t, e) {
          $(".withdraw_btn_confirm").removeAttr("disabled");
        },
        success: function (t, e, a) {
          t.success ? (alert(t.message), location.reload()) : alert(t.message);
        },
        error: function (t, e, a) {},
      });
  });
}
function affiliateTools() {
  if ($("#shorten_links_table").length) {
    $("#create_short_link").click(function (e) {
      "" !== $("#short_link").val() &&
        ($("#create_short_link").attr("disabled", "disabled"),
        $.post(
          "create-short-link",
          {
            link: $("#short_link").val(),
            _token: $("meta[name=csrf-token]").attr("content"),
          },
          function (e, a, n) {
            !1 === e.success
              ? ($("#create_short_link").removeAttr("disabled"),
                $("#short_link_error").html(e.msg).show())
              : ($("#create_short_link").removeAttr("disabled"),
                $("#short_link").val(""),
                $("#short_link_error").hide(),
                t.ajax.reload());
          }
        ));
    });
    var t = $("#shorten_links_table").DataTable({
      info: !1,
      lengthChange: !1,
      searching: !1,
      language: vi_info_datatable,
      processing: !1,
      serverSide: !0,
      ajax: { url: "short-links", type: "GET" },
      columns: [
        {
          data: null,
          orderable: !1,
          render: function (t) {
            return (
              '<div class="input-group col-md-12"><input readonly="readonly" type="text" class="form-control" value="' +
              t.original_link +
              '"/><span class="input-group-btn"><button class="btn btn-default copy_short_link_to_clipboard" type="button"><i class="fa fa-copy"></i></button></span></div>'
            );
          },
        },
        {
          data: null,
          orderable: !1,
          render: function (t) {
            return (
              '<div class="input-group col-md-12"><input readonly="readonly" type="text" class="form-control" value="' +
              t.short_link +
              '"/><span class="input-group-btn"><button class="btn btn-default copy_short_link_to_clipboard" type="button"><i class="fa fa-copy"></i></button></span></div>'
            );
          },
        },
        {
          data: "formatted_created_at",
          className: "text-center",
          orderable: !1,
        },
      ],
    });
    $("#shorten_links_table").on(
      "click",
      ".copy_short_link_to_clipboard",
      function (t) {
        $(this).closest(".input-group").find("input").select(),
          document.execCommand("copy");
      }
    );
  }
  $(".prompt_access_token").click(function () {
    var t = prompt("Nhập access token của bạn", "");
    null != t &&
      $.post("update-access-token", { access_token: t }, function (t, e, a) {
        !1 === t.success
          ? alert("Cập nhật thất bại")
          : (alert("Cập nhật thành công"),
            $("#notice_no_token").hide(),
            $("#notice_has_token").show());
      });
  });
}
function deleteCoupon(t) {
  return (
    $.ajax({
      url: "/account/affiliate/delete-coupon",
      type: "post",
      dataType: "text",
      data: { coupon: t, _token: $("meta[name=csrf-token]").attr("content") },
      success: function (t) {
        return !0;
      },
    }),
    !1
  );
}
function fb_show(t) {
  document.getElementById(t).style.display = "block";
}
function fb_hide(t) {
  document.getElementById(t).style.display = "none";
}
function chat_fb_close() {
  fb_hide("b-c-facebook"), fb_show("chat_f_b_smal");
}
function chat_fb_show() {
  fb_show("b-c-facebook"), fb_show("f-chat-conent"), fb_hide("chat_f_b_smal");
}
function fb_start() {
  fb_show("chat_f_b_smal"), fb_hide("b-c-facebook");
}
$(document).ready(function () {
  if (
    ($("a.register_affiliate").click(function () {
      $("#register_account_type").val(2),
        $("#register_affiliate_agree").show(),
        $("#register_affiliate_agree #agree").removeAttr("disabled");
    }),
    $("a.register_account").click(function () {
      $("#register_account_type").val(1),
        $("#register_affiliate_agree").hide(),
        $("#register_affiliate_agree #agree").attr("disabled", "disabled");
    }),
    $(".is_affiliate_page").length)
  ) {
    var t = $("#affiliate_info"),
      e = t.data("affiliateid");
    $(".copy_to_clipboard").click(function (t) {
      $("#affiliate_code").select(), document.execCommand("copy");
    }),
      $(".withdraw_btn").click(function (t) {
        $(".affiliate_amount_form").hasClass("dnone")
          ? $(".affiliate_amount_form").removeClass("dnone")
          : $(".affiliate_amount_form").addClass("dnone");
      }),
      displayAndHandleWithdrawHistory(e, t),
      displayBonus(e, t),
      submitNewWithdrawRequest(t, e),
      affiliateTools();
  }
}),
  $(".contact-form").submit(function (t) {
    t.preventDefault();
    var e = $(this),
      a = $(e).find('[type="submit"], button').html(),
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
      e.find("textarea[name=message]").length &&
        ((n.message = e.find("textarea[name=message]").val() || ""),
        e.find("textarea[name=message]").attr("required") &&
          (n.required_message = !0)),
      e.find("input[name=captcha]").length &&
        ((n.captcha = e.find("input[name=captcha]").val() || ""),
        e.find("input[name=captcha]").attr("required") &&
          (n.required_captcha = !0)),
      $(e)
        .find('[type="submit"], button')
        .attr("disabled", "disabled")
        .html(wb_translate.progressing),
      e.find(".alert").hide(),
      $.ajax({
        type: "POST",
        url: e.attr("action"),
        data: n,
        dataType: "json",
        success: function (t) {
          t.success
            ? void 0 !== t.link
              ? (window.location.href = t.link)
              : ($(e)
                  .find('[type="submit"], button')
                  .removeAttr("disabled")
                  .html(a),
                e.trigger("reset"),
                e.find(".alert-success").text(t.message),
                e.find(".alert-success").show(),
                $(e).find(".regen-captcha").click())
            : ($(e)
                .find('[type="submit"], button')
                .removeAttr("disabled")
                .html(a),
              e.find("input[name=captcha]").val(""),
              e.find(".alert-danger").text(t.message),
              e.find(".alert-danger").show(),
              $(e).find(".regen-captcha").click());
        },
      }).fail(function (t) {
        var n = "\n";
        for (var i in ($(e)
          .find('[type="submit"], button')
          .removeAttr("disabled")
          .html(a),
        t.responseJSON))
          n += t.responseJSON[i] + "\n";
        alert(n);
      }),
      !1
    );
  }),
  $(document).ready(function () {
    $(".search-box").length &&
      ($(".search-box")
        .autocomplete({
          source: function (t, e) {
            $.ajax({
              url: $(".search-box").parents("form").attr("action"),
              data: { keyword: t.term },
              success: function (t) {
                e(
                  $.map(t.data, function (t, e) {
                    return { label: t.title, value: t.title, url: t.url };
                  })
                );
              },
            });
          },
          select: function (t, e) {
            $(".search-box").val(e.item.value).parents("form").submit();
          },
        })
        .autocomplete("instance")._renderItem = function (t, e) {
        return $("<li></li>")
          .append(
            "<p class='content_autocomplete_search'><a href='" +
              e.url +
              "'><span class='txt_autocomplete_search'>" +
              e.value +
              "</span></a></p>"
          )
          .appendTo(t);
      });
  }),
  $(document).on("submit", "form.search-form", function (t) {
    if ("" == $(this).find(".search-box").val()) return !1;
    $(this).find(".search-box-hidden").length &&
      ($(this)
        .find(".search-box-hidden")
        .val($(this).find(".search-box").val()),
      $(this).find(".search-box").val("")),
      $(this).attr(
        "action",
        $(this).attr("action").replace("/autocomplete", "")
      );
  });
