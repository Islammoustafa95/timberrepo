/** @odoo-module */

    import publicWidget from "@web/legacy/js/public/public_widget";
    import { rpc } from "@web/core/network/rpc";


    publicWidget.registry.store_location_data = publicWidget.Widget.extend({
        selector: ".store",
        events: {
            'click .radio_delivery': 'check_delivery',
            'click .radio_pickup': 'check_pickup',
            'click input[name=pickup_address]': 'check_store',
        },

        start: function () {
            var default_select = this.$el.find(".radio_delivery").is(":checked");
            if (default_select == true) {
                this.check_delivery()
            }
        },

        check_delivery: function () {
            $('.o_website_sale_checkout .oe_cart').removeClass('d-none')
            $('.store_data').addClass('d-none')
            $('#wrap').removeClass('checkout_btn_disable');
            $('.store_menu li').css('box-shadow','')
            $('.store_menu li').find('#store_list_id').removeClass('selected')
            this.check_store()
        },

        check_pickup: function () {
            $('#wrap').addClass('checkout_btn_disable');
            $('.o_website_sale_checkout .oe_cart').addClass('d-none')
            $('.store_data').removeClass('d-none')
            $('.store_line .row').each(function () {
                if ($(this).find("input[name='pickup_address']").is(':checked')) {
                    $('#wrap').removeClass('checkout_btn_disable');
                }
            });
        },

        check_store: function () {
            if($(".radio_pickup").is(":checked")){
                $('.store_line .row .store-data').each(function () {
                    if ($(this).find("input[name='pickup_address']").is(':checked')) {
                        $('#wrap').removeClass('checkout_btn_disable')
                        var store_id = $(this).find("input[name='info_id']").attr('value');
                        if (store_id) {
                            rpc('/add_store_data', {
                                'store_id': store_id
                            })
                        }
                    }
                })
            }
            else{
                rpc('/add_store_data', {
                    'store_id': false
                })
            }
        }
    });
// });