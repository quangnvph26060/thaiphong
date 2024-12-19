<a class="scroll-to-top btn-item" href="javascript:void(0);" aria-label="Về đầu trang"></a>
<div class="float-button">
    <div
        class="btn-quick-alo-phone btn-quick-alo-green btn-quick-alo-show phone-mobile edit_btn_quick_phone position_0 left_position">
        <a id="btn_hotline" href="tel:{{$setting->phone}}" rel="nofollow" aria-label="Hotline">
            <div class="btn-quick-alo-ph-circle edit_btn_quick_ph_circle"></div>
            <div class="btn-quick-alo-ph-circle-fill edit_btn_quick_ph_circle_fill"></div>
            <div class="btn-quick-alo-ph-img-circle edit_btn_quick_ph_img_circle"
                style="
        background-image: url(https://static.loveitopcdn.com/themes/base/images/icons/phone-ico.png);
      ">
            </div>
        </a>
    </div>
    <div
        class="btn-quick-mail-phone btn-quick-mail-green btn-quick-mail-show phone-mobile edit_btn_quick_phone position_1 left_position">
        <a id="btn_zalo" href="https://zalo.me/{{$setting->phone}}" rel="nofollow" target="_blank">
            <div class="btn-quick-mail-ph-circle edit_btn_quick_ph_circle"></div>
            <div class="btn-quick-mail-ph-circle-fill edit_btn_quick_ph_circle_fill"></div>
            <div class="btn-quick-mail-ph-img-circle edit_btn_quick_ph_img_circle"
                style="
        background-image: url(https://static.loveitopcdn.com/themes/base/images/icons/icon-zalo.svg);
      ">
            </div>
        </a>
    </div>
</div>
<div class="notify-cart" data-hide="5">
    <div class="notify-container">
        <div class="icon-close">
            <i class="fas fa-times"></i>
        </div>
        <div class="icon-notify">
            <i class="fas fa-check-circle"><span></span></i>
        </div>
        <div class="text-notify">Đã thêm vào giỏ hàng</div>
        <div class="view-cart">
            <a href="#">Xem giỏ hàng và thanh toán</a>
        </div>
    </div>
</div>
<div class="notify-cart-no-select-options" data-hide="3"
    style="
        display: none;
        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        z-index: 9999;
        ">
    <div class="notify-container"
        style="
            border-radius: 2px;
            overflow: hidden;
            display: inline-block;
            cursor: default;
            padding: 1.9rem 1rem;
            background-color: rgba(0, 0, 0, 0.7);
            color: #fff;
            font-size: 1.0625rem;
            text-align: center;
            min-width: 21.75rem;
            max-width: 25rem;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
        ">
        <div class="icon-close" style="position: absolute; top: 10px; right: 15px; cursor: pointer">
            <i class="fas fa-times"></i>
        </div>
        <div class="icon-notify">
            <i class="fas fa-exclamation-triangle" style="color: orange"></i>
        </div>
        <div class="text-notify">Hãy chọn các phiên bản muốn mua</div>
    </div>
</div>
