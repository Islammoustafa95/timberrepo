/** @odoo-module */

    function animateClone($cart, $elem, offsetTop, offsetLeft) {
        $cart.find('.o_animate_blink').addClass('o_red_highlight o_shadow_animation').delay(500).queue(function () {
            $(this).removeClass("o_shadow_animation").dequeue();
        }).delay(2000).queue(function () {
            $(this).removeClass("o_red_highlight").dequeue();
        });
        return new Promise(function (resolve, reject) {
            var $imgtodrag = $elem.find('img').eq(0);
            if ($imgtodrag.length) {
                var $imgclone = $imgtodrag.clone()
                    .offset({
                        top: $imgtodrag.offset().top,
                        left: $imgtodrag.offset().left
                    })
                    .addClass('o_website_sale_animate')
                    .appendTo(document.body)
                    .animate({
                        top: $cart.offset().top + offsetTop,
                        left: $cart.offset().left + offsetLeft,
                        width: 75,
                        height: 75,
                    }, 1000, 'easeInOutExpo');

                $imgclone.animate({
                    width: 0,
                    height: 0,
                }, function () {
                    resolve();
                    $(this).detach();
                });
            } else {
                resolve();
            }
        });
    }

    /**
     * Updates both navbar cart
     * @param {Object} data
     */
    function updateCartNavBar(data) {
        var $qtyNavBar = $(".my_cart_quantity");
        // _.each($qtyNavBar, function (qty) {
            Array.from($qtyNavBar).forEach((qty) => {
            var $qty = $(qty);
            $qty.parents('li:first').removeClass('d-none');
            $qty.html(data.cart_quantity).hide().fadeIn(600);
        });
        $(".js_cart_lines").first().before(data['website_sale.cart_lines']).end().remove();
        $(".js_cart_summary").before(data['website_sale.short_cart_summary']).remove();
        // $(".bizemart_shop .shop-collection-cart-main").first().before(data['theme_emart_plant.cart_right']).end().remove();
        $(".bottom-bar-cart .shop-collection-cart-main").first().before(data['theme_emart_plant.cart_right']).end().remove();
        $(".mobile-cart-right").first().before(data['theme_emart_plant.mobile_bottom_cart']).end().remove();
    }

    return {
        animateClone: animateClone,
        updateCartNavBar: updateCartNavBar,
    };
// });