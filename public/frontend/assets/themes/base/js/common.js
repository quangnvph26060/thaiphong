
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
