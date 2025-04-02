/** @odoo-module */

import { rpc } from "@web/core/network/rpc";
import publicWidget from "@web/legacy/js/public/public_widget";
import { WebsiteSale } from '@website_sale/js/website_sale';
import "@website_sale/js/website_sale";

    $(document).ready(function() {
        publicWidget.registry.WebsiteSale.include({
            _getProductImageLayout: function () {
                if (document.querySelector("#product_detail_main")){
                    return document.querySelector("#product_detail_main").dataset.image_layout;
                }
            },

        	onChangeVariant: async function (ev) {
                this._super.apply(this, arguments);
                var $parent = $(ev.target).closest('.js_product');
                var qty = $parent.find('input[name="add_qty"]').val();
                var combination = this.getSelectedVariantValues($parent);
                var parentCombination = $parent.find('ul[data-attribute_exclusions]').data('attribute_exclusions').parent_combination;
                var productTemplateId = parseInt($parent.find('.product_template_id').val());
                return await rpc('/product_code/get_combination_info', {
                    'product_template_id': productTemplateId,
                    'product_id': this._getProductId($parent),
                    'combination': combination,
                    'add_qty': parseInt(qty),
                    'pricelist_id': this.pricelistId || false,
                    'parent_combination': parentCombination,
                }).then(function (data) {
                    $('.product_ref_code').html(data)
                });

            }
        })    
    })

    publicWidget.registry.WebsiteSale.include({
        events: Object.assign({}, WebsiteSale.prototype.events, {
            'click .a-submit-btn': '_onClickSubmit',
        }),
        _onClickSubmit: async function (ev, forceSubmit) {
            if ($(ev.currentTarget).is('#add_to_cart, #products_grid .a-submit:not(.ajax-cart-btn)') && !forceSubmit) {
                return;
            }
            var $aSubmit = $(ev.currentTarget);
            if (!$aSubmit.is(".disabled")) {
                ev.preventDefault();
                if ($aSubmit.parents('.ajax_cart_modal_tools').length) {
                    var frm = $aSubmit.closest('form');
                    var product_product = frm.find('input[name="product_id"]').val();
                    var quantity = frm.find('.quantity').val();
                    if(!quantity) {
                        quantity = 1;
                    }
                    await rpc('/shop/cart/update_custom', {'product_id':product_product,'add_qty':quantity}).then(function(data) {
                        if(data) {
                            sessionStorage.setItem('website_sale_cart_quantity', data.cart_quantity);
                            $(".my_cart_quantity").removeClass('d-none')
                            .queue(function () {
                                $(this)
                                .toggleClass('fa fa-warning', !data.cart_quantity)
                                .text(data.cart_quantity || '')
                                .removeClass('o_mycart_zoom_animation')
                                .dequeue();
                            });
                        }
                    });
                    $('.added_to_cart_popup').addClass('shown');
                    
                    setTimeout(function () {
                        $('.added_to_cart_popup').removeClass('shown');
                    }, 3000);
                    $(".select-modal-backdrop").remove();
                    $(".select-modal").remove();
                    $(".quick-modal-backdrop").remove();
                    $(".quick-modal").remove();
                } else {
                    $aSubmit.closest('form').submit();
                }
            }
            if ($aSubmit.hasClass('a-submit-disable')){
                $aSubmit.addClass("disabled");
            }
            if ($aSubmit.hasClass('a-submit-loading')){
                var loading = '<span class="fa fa-cog fa-spin"/>';
                var fa_span = $aSubmit.find('span[class*="fa"]');
                if (fa_span.length){
                    fa_span.replaceWith(loading);
                } else {
                    $aSubmit.append(loading);
                }
            }
            setTimeout(function(){
                rpc('/update/menucart').then(function (data) {
                    $(".bizemart_shop .shop-collection-cart-main").first().before(data).end().remove();
                    $(".bottom-bar-cart .shop-collection-cart-main").first().before(data).end().remove();
                });
            }, 1000);

            setTimeout(function(){
                rpc('/update/mobilecart').then(function (data) {
                    $(".mobile-cart-right").first().before(data).end().remove();
                });
            }, 1000);
        },
    });

    WebsiteSale.include({
        _onCancelButtonClick: function () {
            this._super.apply(this, arguments);
            $('.product_configurator_content').removeClass('bizople_button_style');
        },
        destroy: function () {
            this._super.apply(this, arguments);
            $('.product_configurator_content').removeClass('bizople_button_style');
        },
    });

// ajax cart modal js ends