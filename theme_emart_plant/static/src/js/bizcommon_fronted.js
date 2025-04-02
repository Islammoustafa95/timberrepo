/** @odoo-module */

import animations from "@website/js/content/snippets.animation";
import { _t } from "@web/core/l10n/translation";
    	
    if ($('.product_description').length < 1) {
        $('#product_detail_tabs').find('li:first-child').find('.nav-link').addClass('active');
        var firstlink = $('#product_detail_tabs').find('li:first-child').find('.nav-link').attr('aria-controls');
        $('.product-tab .tab-pane').removeClass('active show');
        $('#'+ firstlink).addClass('active show');
    }

    animations.registry.theme_emart_plant_image_hotspot = animations.Class.extend({
        selector: ".hotspot_dynamic",
        disabledInEditableMode: false,
        start: function() {
            var self = this.$target;
            if (this.editableMode) {
                self.find('.hotspot_info').removeClass('quick_btn')
            }
            if (!this.editableMode) {
                self.find('.hotspot_info').addClass('quick_btn')
            }
            
        },
    });

   

    animations.registry.theme_emart_plant_product_banner = animations.Class.extend({
        selector: ".bizople_product_banner",
        disabledInEditableMode: false,
        start: function() {
            var self = this.$target;
            if (this.editableMode) {
                self.find('.edit_mode_product_banner').removeClass('d-none');
                self.find('.product_banner_main_section').remove();
            }
            if (!this.editableMode) {
                self.find('.edit_mode_product_banner').addClass('d-none');
                var product_id = self.attr('data-prod-select-id');
                $.get("/theme_emart_plant/get_product_banner_details_xml", {
                    'product_id': self.attr('data-prod-select-id') || '',
                }).then(function(data) {
                    if (data) {
                        self.find('.product_banner_main_section').remove();
                        $(data).appendTo(self.find('.container'));
                        $("[data-attribute_exclusions]").on('change', function(event) {
                            setTimeout(function(){
                                $('.lazyload').lazyload();
                            }, 1000);
                        });
                        $(".css_attribute_color input").click(function(event){   
                            setTimeout(function(){
                                $('.lazyload').lazyload();
                            }, 1000);
                        });
                        $('.lazyload').lazyload();
                    }
                });
            }
        }
    });
    
    
    
    $(function() {
        $('#wrapwrap').scroll(function() {
            var changeprice = $('div#product_details .product_price').html();
            
            var cartheight = $('#wrapwrap').height() / 2 - 100;
            
            if ($(this).scrollTop() > cartheight) {
                $('.cart_product_sticky_section').addClass('d-block');
            } else {
                $('.cart_product_sticky_section').removeClass('d-block');
            }
            
            if( $( ".js_product.js_main_product" ).hasClass( "css_not_available" )){
               $('div#wrapwrap .cart_prod_name_price').html('');
               $(".cart_product_sticky_details .sticky_cart_button#add_to_cart, .cart_product_sticky_details .sticky_cart_button#buy_now").addClass('disabled');
            }
            else{
                $('div#wrapwrap .cart_prod_name_price').html(changeprice);
                $(".cart_product_sticky_details .sticky_cart_button#add_to_cart, .cart_product_sticky_details .sticky_cart_button#buy_now").removeClass('disabled');
            }

            $(".cart_product_sticky_details .sticky_cart_button #add_to_cart").click(function(){
                $("div#cart_product_sticky_details .js_product.js_main_product #add_to_cart").trigger( "click" );
                return false;
            });
            $(".product_details_sticky .sticky_cart_button #buy_now").click(function(){
                $("div#cart_product_sticky_details .js_product.js_main_product #buy_now").trigger( "click" );
                return false;
            });

        });
    });

    $(document).ready(function(){
        $('.search_filter_attributes').keyup(function(e){
            if (e.which == 13) e.preventDefault();
            var input_val = $(this).val()
            var loop_el = $(this).parent().find('li,.list-group-item,.css_attribute_color')
            $(loop_el).each(function(index){
            // $(loop_el).forEach((index) => {
                var label_text = $(this).find('.get_attribute_name').text()
                var brand_id = $(this).find('.brand_image').attr('id')

                if (String(label_text).toLowerCase().match(input_val.toLowerCase()) || String(brand_id).toLowerCase().match(input_val.toLowerCase()) ) {
                    $(this).removeClass('d-none')
                }else{
                    $(this).addClass('d-none')
                }
            })
        })
    })
// });
