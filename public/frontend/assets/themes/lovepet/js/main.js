$(document).on(
  "click",
  ".menu_mobile_style5 .btn-toggle-mobile-menu",
  function (e) {
    e.preventDefault(), $(this).parents(".bg-header").toggleClass("active");
  }
),
  $(document).ready(function () {
    0 == $(".header-left-2").length &&
      1 == $("body").hasClass("menu_mobile_style5") &&
      $("body")
        .removeClass("menu_mobile_style5")
        .addClass("menu_mobile_style1");
  });
