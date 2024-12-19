var runHeightSlider, runHeightMegaMenuEcommerce;
function readMore(e) {
  var t = 0;
  e.each(function (e) {
    if (
      t >
      parseInt(
        $("div.show-readmore[data-limit_menu_item]").data("limit_menu_item")
      )
    )
      return (
        $(this).hide().addClass("toggleable"),
        $(this).prev().hide().addClass("toggleable"),
        $(this).nextAll().hide().addClass("toggleable"),
        $(this).parent().find(".more").remove(),
        $(this)
          .parent()
          .append(
            '<li class="more"><a class="evo-categories-a" title="' +
              wb_translate.menu_readmore +
              '"> ' +
              wb_translate.menu_readmore +
              "</a></li>"
          ),
        $(this).parent().parent().css("opacity", "1"),
        !1
      );
    t += 1;
  }),
    $(e).parent().parent().css("opacity", "1");
}
function readMore_old(e) {
  var t = 0;
  e.each(function (e) {
    if (
      (5 == e &&
        $(".menu_mobile_style2").length &&
        $(window).width() < 992 &&
        (t = 1 + src.height()),
      (t += $(this).height()) > src.height())
    )
      return (
        $(this).hide().addClass("toggleable"),
        $(this).prev().hide().addClass("toggleable"),
        $(this).nextAll().hide().addClass("toggleable"),
        $(this).parent().find(".more").remove(),
        $(this)
          .parent()
          .append(
            '<li class="more"><a class="evo-categories-a" title="' +
              wb_translate.menu_readmore +
              '"> ' +
              wb_translate.menu_readmore +
              "</a></li>"
          ),
        $(this).parents(".mega-menu-category").height() +
          $(this).prev().height() <
          src.height() && $(this).prev().show().removeClass("toggleable"),
        $(this).parent().parent().css("opacity", "1"),
        !1
      );
  }),
    $(e).parent().parent().css("opacity", "1");
}
function customMegaMenu() {
  var e = $(window).width();
  e > 992
    ? $(".dropdown").each(function () {
        var t = 150;
        e > 992 && (t = 200);
        var n = t * $(this).find(".sub-menu-has-child").children("li").length,
          a = n / 2;
        $(this).find(".sub-menu-has-child").css({ width: n, padding: "0" }),
          $(this).find(".sub-menu-has-child .item-cat-child").css("width", t);
        var i = $(this).width() / 2,
          s =
            $(window).width() - ($(this).offset().left + $(this).outerWidth()),
          o = $(this).offset().left;
        (a = n / 2 - i) > s
          ? (a = n - $(this).width())
          : o < a && (a = e > 1400 ? 0 : o - 20),
          $(this).find(".sub-menu-has-child").css("left", -a),
          $(document)
            .find(".mega_menu_mega_menu_center")
            .parent("li")
            .removeClass("has-mega-menu"),
          $(document)
            .find(".mega_menu_mega_menu_center")
            .css("display", "block"),
          $(".item-cat-child").css("float", "left"),
          $(".main-nav>ul>li.has-mega-menu .sub-menu>li").css(
            "box-shadow",
            "none"
          );
      })
    : ($(document)
        .find(".mega_menu_mega_menu_center")
        .parent("li")
        .addClass("has-mega-menu"),
      $(document).find(".sub-menu-has-child").css({ width: "auto" }),
      $(document).find(".sub-menu-has-child").css({ left: "unset" }),
      $(document).find(".sub-menu-has-child").css({ padding: "0 15px" }),
      $(document)
        .find(".sub-menu-has-child .item-cat-child")
        .css("width", "auto"),
      $(document).find(".mega_menu_mega_menu_center").css("display", "none"),
      $(".item-cat-child").css("float", "unset"));
}
function fixed_header() {
  if ($("body").hasClass("menu_fixed_1") && $(".header-container").length) {
    var e = $(window).scrollTop(),
      t = 0;
    e > $("#header .height-menu-fixed").height()
      ? $(".header-container.fixed-ontop").length ||
        ($(window).width() > 992
          ? ((fixed = $(".header-desktop .header-container")),
            (t = $(".page-content").offset().top))
          : ((fixed = $(".header-mobile .header-container")),
            (t = $(".header-mobile .header-container").offset().top)),
        (0 == $(document).find(".header-empty").length &&
          0 == $(document).find(".header-simple").length) ||
          ((t = $(".header-desktop .btn-toggle-mobile-menu").offset().top),
          (fixed = $(".header-desktop .header-container"))),
        e > t
          ? 0 == $(document).find(".fixed-ontop").length &&
            (fixed.clone().addClass("fixed-ontop").appendTo("#header").hide(),
            $(".header-container:not(.fixed-ontop)")
              .find(".main-nav.navbar-expand-lg")
              .hasClass("active") && $("header#header").css("z-index", "1000"),
            $(".fixed-ontop").show(),
            $(".header-center .height-menu-fixed").addClass(
              "center-vertical-nojustify"
            ),
            $(".header-menucenter .height-menu-fixed").addClass(
              "center-vertical-nojustify"
            ),
            setTimeout(function () {
              set_height_menu(
                $(document).find(".header-container.fixed-ontop")
              );
            }, 1e3))
          : ($(".header-container.fixed-ontop")
              .find(".main-nav.navbar-expand-lg")
              .hasClass("active") && $("header#header").css("z-index", "1000"),
            $(".fixed-ontop").remove(),
            $(".header-center .height-menu-fixed").removeClass(
              "center-vertical-nojustify"
            ),
            $(".header-menucenter .height-menu-fixed").removeClass(
              "center-vertical-nojustify"
            ),
            set_height_menu(
              $(document).find(".header-container:not(.fixed-ontop)")
            )))
      : ($(".fixed-ontop").remove(),
        $(".header-center .height-menu-fixed").removeClass(
          "center-vertical-nojustify"
        ),
        $(".header-menucenter .height-menu-fixed").removeClass(
          "center-vertical-nojustify"
        ),
        set_height_menu(
          $(document).find(".header-container:not(.fixed-ontop)")
        ));
  }
}
function menu_sidebar(e) {
  e.preventDefault(),
    $(".wrapper.project-layout").toggleClass("toggled"),
    $(".toggle-mobile-menu").toggleClass("active"),
    $(".body_overlay").toggleClass("active");
}
function set_height_menu(e) {
  if ($(window).outerWidth() <= 991 && e.length) {
    var t = $(window).height(),
      n = e.height();
    -1 == e.attr("class").indexOf("fixed-ontop") &&
      ($(".header-top").length ? (n += $(".header-top").height()) : (n = n));
    var a = t - n;
    $(".navbar-menu").css("height", a);
  } else $(".navbar-menu").css("height", "auto");
}
function menuActive() {
  var e = window.location.href,
    t = !e.split("/")[3],
    n = window.location.hostname,
    a = [];
  if ($("body.menu_mobile_style4").length)
    if ($(window).width() < 992)
      var i = ".fixed-menu-left .wb-header-menu-item>a";
    else i = ".header-container .wb-header-menu-item>a";
  else
    i = $("body.menu_mobile_style5").length
      ? $(window).width() < 992
        ? ".menu-mobile-5 .wb-header-menu-item>a"
        : ".menu-mobile .wb-header-menu-item>a"
      : ".wb-header-menu-item>a";
  $(i).each(function () {
    var i = $(this).prop("href"),
      s = !i.split("/")[3],
      o = i.split("/")[2],
      d = {};
    n == o &&
      ((t && s) || (e.search(i) > -1 && !s)) &&
      ((d.element = $(this)),
      (d.menuPosition = 1),
      (d.hasChild = !1),
      $(this).closest("li").children("ul").length && (d.hasChild = !0),
      $(this).closest("ul").parent("li").length &&
        (d.menuPosition = d.menuPosition + 1),
      a.push(d));
  });
  for (var s = { shortess: "", longess_url: "" }, o = a.length - 1; o >= 0; o--)
    1 == a[o].menuPosition &&
      a[o].hasChild &&
      (s.shortess = a[o].element.prop("href"));
  for (o = a.length - 1; o >= 0; o--)
    s.longess_url.length < a[o].element.prop("href").length
      ? (s.longess_url = a[o].element.prop("href"))
      : 1 == a[o].menuPosition &&
        a[o].element.prop("href").length <= s.shortess.length &&
        a[o].hasChild
      ? (s.shortess = a[o].element.prop("href"))
      : delete a[o];
  for (o = a.length - 1; o >= 0; o--)
    void 0 !== a[o] &&
      (a[o].element
        .parents(".wb-header-menu-item")
        .addClass("active current-menu-item"),
      a[o].element.addClass("active"));
}
$(document).ready(function () {
  set_height_menu($(document).find(".header-container:not(.fixed-ontop)")),
    $(".menu_style_mega_menu_2").length &&
      $(
        ".header-desktop .section-header-menu .mega_menu_2 .mega-menu-lv1"
      ).hover(function () {
        $(".mega_menu_2 .mega-menu-lv1").removeClass("hover"),
          $(this).addClass("hover");
      }),
    $(document).on("click", ".header-simple .toggle-mobile-menu", function (e) {
      menu_sidebar(e);
    }),
    $(document).on("click", ".header-empty .toggle-mobile-menu", function (e) {
      menu_sidebar(e);
    }),
    0 == $(".header-simple").length &&
      0 == $(".header-empty").length &&
      $(document).on(
        "click",
        ".menu_mobile_style4 .toggle-mobile-menu-style4 .toggle-mobile-menu",
        function (e) {
          menu_sidebar(e);
        }
      ),
    $(".close-wrapper .fa-times").on("click", function (e) {
      menu_sidebar(e);
    }),
    $(".body_overlay").on("click", function (e) {
      -1 !== $(this).attr("class").indexOf("active") && menu_sidebar(e);
    }),
    $(document).on("click", ".btn-toggle-mobile-menu", function (e) {
      e.preventDefault(),
        $(this).parent().toggleClass("active"),
        $(this).parent().hasClass("active")
          ? $("header#header").css("z-index", "1000")
          : $("header#header").css("z-index", "998");
    }),
    $("#header").on(
      "click",
      ".header-container.fixed-ontop .btn-toggle-mobile-menu",
      function (e) {
        e.preventDefault(),
          $(
            ".header-container:not(.fixed-ontop) .btn-toggle-mobile-menu"
          ).trigger("click");
      }
    ),
    customMegaMenu(),
    $(document).on(
      "click",
      ".mb-menu li.dropdown>a:not(.item_expand) i",
      function (e) {
        var t = $(document)
            .find(".main-nav")
            .attr("class")
            .indexOf("fixed-menu-right"),
          n = $(".widget-menu").length;
        ($(window).width() <= 992 || -1 !== t || n > 0) &&
          (e.preventDefault(),
          -1 !== $(this).attr("class").indexOf("plus")
            ? ($(this).removeClass("fa fa-plus").addClass("fa fa-minus"),
              $(this).parent().addClass("expanded"))
            : ($(this).removeClass("fa fa-minus").addClass("fa fa-plus"),
              $(this).parent().removeClass("expanded")),
          $(this).parent().next().slideToggle());
      }
    ),
    $(document).on("click", ".mb-menu li.dropdown>a.item_expand", function (e) {
      var t = $(document)
          .find(".main-nav")
          .attr("class")
          .indexOf("fixed-menu-right"),
        n = $(".widget-menu").length;
      ($(window).width() <= 992 || -1 !== t || n > 0) &&
        (e.preventDefault(),
        -1 !== $(this).find("i").last().attr("class").indexOf("plus")
          ? ($(this)
              .find("i")
              .last()
              .removeClass("fa fa-plus")
              .addClass("fa fa-minus"),
            $(this).addClass("expanded"))
          : ($(this)
              .find("i")
              .last()
              .removeClass("fa fa-minus")
              .addClass("fa fa-plus"),
            $(this).removeClass("expanded")),
        $(this).next().slideToggle());
    }),
    $(".header-container.show-readmore").length &&
      ($(".header-ecommerce_2").length ||
        $(".header-ecommerce").length ||
        $(".header-ecommerce_mobile").length ||
        $(".header-ecommerce_minimart").length ||
        $(".header-ecommerce_mechanical").length) &&
      (readMore(
        $(
          "div.show-readmore[data-limit_menu_item] .wb-nav-header .mega-menu-category>.mb-menu>li"
        )
      ),
      readMore($(".fixed-menu-left .mega-menu-category>.mb-menu>li"))),
    $(document).on(
      "click",
      ".mega-container .mega-menu-category li.more",
      function (e) {
        $(this).hasClass("less")
          ? $(this)
              .html(
                '<a class="evo-categories-a" title="' +
                  wb_translate.menu_readmore +
                  '"> ' +
                  wb_translate.menu_readmore +
                  "</a>"
              )
              .removeClass("less")
          : $(this)
              .html(
                '<a class="evo-categories-a" title="' +
                  wb_translate.menu_collapse +
                  '"> ' +
                  wb_translate.menu_collapse +
                  "</a>"
              )
              .addClass("less"),
          $(this).siblings("li.toggleable").slideToggle({});
      }
    );
}),
  $(window).resize(function () {
    customMegaMenu(),
      fixed_header(),
      set_height_menu($(document).find(".header-container:not(.fixed-ontop)")),
      $(".header-container.show-readmore").length &&
        ($(".header-ecommerce_2").length ||
          $(".header-ecommerce_2").length ||
          $(".header-ecommerce_mobile").length) &&
        ($(".mega-menu-category li.more").remove(),
        $(".mega-menu-category li.toggleable").css("display", "block"),
        $(".mega-menu-category li.toggleable").removeClass("toggleable"),
        readMore(
          $(
            "div.show-readmore[data-limit_menu_item] .mega-container .mega-menu-category>.mb-menu>li"
          )
        ),
        readMore($(".fixed-menu-left .mega-menu-category>.mb-menu>li")));
  }),
  $(window).scroll(function () {
    fixed_header();
  }),
  $(document).ready(function () {
    menuActive();
  }),
  $(window).resize(function () {
    menuActive();
  });