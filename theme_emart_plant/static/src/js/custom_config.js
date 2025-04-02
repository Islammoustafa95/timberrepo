/** @odoo-module */
	
import publicWidget from "@web/legacy/js/public/public_widget";
import { _t } from "@web/core/l10n/translation";
import { rpc } from "@web/core/network/rpc";
import { Component } from "@odoo/owl";
import wSaleUtils from "@website_sale/js/website_sale_utils";
import "@website_sale/js/website_sale";
	
	
		publicWidget.registry.ProductConfigAjaxPopup = publicWidget.Widget.extend({
      selector: ".bizople_product_banner",

      events: {
        "click .a-submit.ajax-cart-btn": "_AddClassOnClick",
        "click #cnt_shopping,.ajax-cart-modal .close": "_RemoveClassOnClick",
        "click .ajax-cart-modal": "_RemoveClassOnClickContent",
        "click .optional-btn .a-submit": "_AddClassOnButton",
      },

      _AddClassOnClick: function (ev) {
        $("body").addClass("ajax-require-body");
        $(ev.currentTarget)
          .parents("form")
          .prev(".ajax-cart-modal")
          .modal("show");
      },

      _AddClassOnButton: function (ev) {
        $(".product_configurator_content").addClass("bizople_button_style");
      },

      _onConfirmButtonClick: function () {
        $(".product_configurator_content").removeClass("bizople_button_style");
      },

      _RemoveClassOnClick: function () {
        $("body").removeClass("ajax-require-body");
      },

      _RemoveClassOnClickContent: function (ev) {
        if (!$(ev.currentTarget).closest(".modal-content").length) {
          $("body").removeClass("ajax-require-body");
        }
      },
    });
	
		publicWidget.registry.bizopletestslider = publicWidget.Widget.extend({
			selector: ".bizople_test_slider",
			start: function () {
				var self = this
				var initial_section = $(this.$target)[0].innerHTML
				var win_size = $( window ).width()
				if (win_size < 768){
					this._resize();
				}
				$(window).on('resize', function() {
					var win_size = $( window ).width()
					if (win_size < 768){
						self._resize();
					} else{
						$(self.$target).empty()
						$(self.$target).append(initial_section)
					}
				});
			},
	
			_resize: function(){
				var self = this
				var col_items = $(this.$target).find('.carousel-inner .carousel-item > .row > div[class*=col]')
				var carousel_inner = $(this.$target).find('.carousel-inner')
				$(this.$target).find('.carousel-inner').empty()
				var count = 0
				$(col_items).each(function(){
					var col_html = $(this)[0].outerHTML
					var even = count % 2
					if (count % 2 == 0){
						var carousel_item = '<div class="carousel-item" data-name="Slide"><div class="row justify-content-center"></div></div>'
						$(carousel_inner).append(carousel_item);
					}
					var last_carousel_item = self.$target.find('.carousel-inner')[0].lastChild
					$(last_carousel_item).find('.row').append(col_html)
					count = count + 1
				});
				var first_carousel_item = $(this.$target).find('.carousel-inner')[0].firstChild
				$(first_carousel_item).addClass('active')
			}
	
	
		});
		publicWidget.registry.bizopletestslidertwo = publicWidget.Widget.extend({
			selector: ".bizople_test_slider_two",
			start: function () {
				var self = this
				var initial_section = $(this.$target)[0].innerHTML
				var win_size = $( window ).width()
				if (win_size < 768){
					this._resize();
				}
				$(window).on('resize', function() {
					var win_size = $( window ).width()
					if (win_size < 768){
						self._resize();
					} else{
						$(self.$target).empty()
						$(self.$target).append(initial_section)
					}
				});
			},
	
			_resize: function(){
				var col_items = $(this.$target).find('.carousel-inner .carousel-item > .row > div[class*=col]')
				var carousel_inner = $(this.$target).find('.carousel-inner')
				$(this.$target).find('.carousel-inner').empty()
				var count = 0
				$(col_items).each(function(){
					var col_html = $(this)[0].outerHTML
					var carousel_item = '<div class="carousel-item" data-name="Slide"><div class="row justify-content-center">'+col_html+'</div></div>'
					$(carousel_inner).append(carousel_item);
	
				});
				var first_carousel_item = $(this.$target).find('.carousel-inner')[0].firstChild
				$(first_carousel_item).addClass('active')
			}
		});
	
		publicWidget.registry.imghotspotpopover = publicWidget.Widget.extend({
			selector: ".image_hotspot",
			events: {
				'click .hotspot_info': '_openhotspotpopover',
			},
	
			init: function () {
				this._super.apply(this, arguments);
				this._popoverRPC = null;
			},
			start: function () {
				var popover_bg = this.$el.find(".static_image_hotspot_info").css('background-color');
				this.$el.find('.hotspot_info').popover({
					trigger: 'manual',
					animation: true,
					html: true,
					container: 'body',
					placement: 'bottom',
					trigger: 'focus',
					template: '<div class="popover hotspot-popover" style="background-color: '+popover_bg+'; border-color: '+popover_bg+'" role="tooltip"><div class="arrow" style="border-color: '+popover_bg+'"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>'
				});
				$("body").addClass("image_hotspot_active");

			},
	
			_openhotspotpopover: function (ev) {
				var self = this;
				$(this.selector).not(ev.currentTarget).popover('hide');
				self.$el.find('.hotspot_info').popover("show");
			}
		});
		publicWidget.registry.WrapwrapRelateJS = publicWidget.Widget.extend({
			selector: "#wrapwrap",
			events: {
				'click .shop-collection-cart-main .js_delete_product': '_RightCartDeleteProduct',
				'click .mobile-cart-right-main .process-btn': '_openCartDetail',
				'click .shop-collection-cart-main .shop-collection-cart .close-icon': '_closeCartDetail',
			},
			_openCartDetail: function () {
				$('.cart-right-desktop').addClass('open-mobile-cart oe_website_sale');
				this.trigger_up('widgets_start_request', {
                    $target: $(".cart-right-desktop")
                });
			},
			_closeCartDetail: function () {
				$('.cart-right-desktop').removeClass('open-mobile-cart oe_website_sale');
			},
	
			_RightCartDeleteProduct: function (ev) {
				ev.preventDefault();
				$(ev.currentTarget).closest('.selected-product').find('.js_quantity').val(0).trigger('change');
			},
		});
	
		publicWidget.registry.headerrelatedjs = publicWidget.Widget.extend({
			selector: "header.biz-emart-shop-header",
			start: function () {
				/*mbl btm bar start*/
				$("main").addClass("blured-bg");
				var size = $(window).width();
				if (size <= 1200){
					$(function() {
	
						/*show bottom bar start*/
						  $(document).scroll(function() {
							if ($(this).scrollTop() > 100) {
							  $('.bizople-mbl-bottom-bar').addClass('show-bottom-bar');
							  $('.cart-right-mobile-section').addClass('show-bottom-bar-up');
							} else {
							  $('.bizople-mbl-bottom-bar').removeClass('show-bottom-bar');
							  $('.cart-right-mobile-section').removeClass('show-bottom-bar-up');
							}
						  });
						/*show bottom bar start*/
	
						/*shop page hide shop menu from bottom bar start*/
						if ($('.bizemart_shop').hasClass('bizemart_shop')) {
							  $('.bottom-bar-filter').removeClass('d-none');
							  $('.bottom-bar-category').removeClass('d-none');
							  $('.bottom-bar-shop').addClass('d-none');
						}else {
							  $('.bottom-bar-filter').addClass('d-none');
							  $('.bottom-bar-category').addClass('d-none');
							  $('.bottom-bar-shop').removeClass('d-none');
						}
						/*shop page hide shop menu from bottom bar end*/
					});
				}
				/*mbl btm bar end*/
	
				/*mbl btm bar extra menu start and sticky cart start*/
				$(".open-extra-menu").click(function() {
					  if($('.extra-menu-bar').hasClass('open')){
						$(".extra-menu-bar").removeClass("open");
						$(".cart-right-mobile-section").removeClass("open");
						$(".bottom-bar-extra-menu").removeClass("active");
						$(".cart_product_sticky_section").removeClass("goup");
					  } else {
						$(".extra-menu-bar").addClass("open");
						$(".cart-right-mobile-section").addClass("open");
						$(".bottom-bar-extra-menu").addClass("active");
						$(".cart_product_sticky_section").addClass("goup");
					  }
				});
				/*mbl btm bar extra menu start and sticky cart end*/
	
				/* header category menu start*/
				$(function() {
					var categ_target = $(".biz-emart-shop-header-category > li.dropdown-submenu > .nav-link > i.ti");
					var parent_categ = $(categ_target).parent().parent();
					if ($(categ_target).hasClass("ti")) {
						$(parent_categ).addClass('dropend');
					}
				});
				/* header category menu end*/
	
				/*header 2 search js start*/
				if (size <= 1400 && size > 992){
					$(function(){
						  var to_toggle = $(".header-search-btn .search-bar");
						  $(".header-search-btn > button").click(function() {
							  if($(to_toggle).hasClass('toggled')){
								$(to_toggle).removeClass("toggled");
							  } else {
								$(to_toggle).addClass("toggled");
							  }
						});
					});
				}	
	
				/* menu sidebar js for ipad and mbl */
				  $("#show-sidebar").on("click", function(e) {
					$(".sidebar-wrapper").addClass("toggled");
					$(".blured-bg").addClass("active");
					e.stopPropagation()
				  });
				  $("#show_header4_mbl_menu").on("click", function(e) {
					$(".sidebar-wrapper").addClass("toggled");
					$(".blured-bg").addClass("active");
					e.stopPropagation()
				  });
				  $(".bottom-show-sidebar").on("click", function(e) {
					$('.sidebar-wrapper .menu-tab').click();
					$(".sidebar-wrapper").addClass("toggled");
					$(".blured-bg").addClass("active");
					e.stopPropagation()
				  });
				  $(".bottom_bar_category_button").on("click", function(e) {
					$('.sidebar-wrapper .category-tab').click();
					$(".sidebar-wrapper").addClass("toggled");
					$(".blured-bg").addClass("active");
					e.stopPropagation()
				  });
				  $("#close_mbl_sidebar").on("click", function(e) {
					$(".sidebar-wrapper").removeClass("toggled");
					$(".blured-bg").removeClass("active");
					e.stopPropagation()
				  });
				  $(document).on("click", function(e) {
					if (!$(e.target).closest('.sidebar-wrapper').length) {
					  $(".blured-bg").removeClass("active");
					  $(".sidebar-wrapper").removeClass("toggled");
					}
				  });
	
				/*header 4 sidebar*/
				  $("#show_header4_menu").on("click", function(e) {
					$(".sidebar-wrapper.header4_sidebar").addClass("toggled");
					$(".blured-bg").addClass("active");
					e.stopPropagation()
				  });
				  $("#close_header4_sidebar").on("click", function(e) {
					$(".sidebar-wrapper.header4_sidebar").removeClass("toggled");
					$(".blured-bg").removeClass("active");
					e.stopPropagation()
				  });
			}
		});
		publicWidget.registry.EmartModalPopups = publicWidget.Widget.extend({
			selector: "#wrapwrap",
			events: {
				'click .nav-link .show-search': '_OpenSearchPopup',
				'click .close-search': '_CloseSearchPopup',
		
			},
		
			_OpenSearchPopup: function () {
					$(".search-box").addClass("open");
					$(".search-popup-backdrop").addClass("active");
				},
			_CloseSearchPopup: function () {
				$(".search-box").removeClass("open");
				$(".search-popup-backdrop").removeClass("active");
			},
		});

		publicWidget.registry.AddCartPopupAlert = publicWidget.Widget.extend({
			selector: ".added_to_cart_popup",
			events: {
				'click .close': '_closePopupAlert',
			},
			_closePopupAlert: function () {
				$('.added_to_cart_popup').removeClass('shown');
			},
		});
		
		publicWidget.registry.shoppagejs = publicWidget.Widget.extend({
			selector: ".bizemart_shop",
			start: function () {
				$('[data-bs-toggle="popover"]').popover()
				$("main").addClass("blured-bg");
				/*brand check box */
				$("a.active").find('.mycheckbox').prop('checked', true);
	
				$('.lazyload').lazyload();
				/*brand check box end */
	
				// Price slider code start --- shoppage
				var minval = $("input#m1").attr('value'),
					maxval = $('input#m2').attr('value'),
					minrange = $('input#ra1').attr('value'),
					maxrange = $('input#ra2').attr('value'),
					website_currency = $('input#bizemart_website_currency').attr('value');
				if (!minval) {
					minval = 0;
				}
				if (!maxval) {
					maxval = maxrange;
				}
				if (!minrange) {
					minrange = 0;
	
				}
				if (!maxrange) {
					maxrange = 2000;
				}
	
				$("div#priceslider").ionRangeSlider({
					keyboard: true,
					min: parseInt(minrange),
					max: parseInt(maxrange),
					type: 'double',
					from: minval,
					skin: "square",
					to: maxval,
					step: 1,
					prefix: website_currency,
					grid: true,
					onFinish: function(data) {
						$("input[name='min1']").attr('value', parseInt(data.from));
						$("input[name='max1']").attr('value', parseInt(data.to));
						$("div#priceslider").closest("form").submit();
					},
				});
				// Price slider code end --- shoppage
	
				/* Product hover image js start */
				setInterval(function(){
					$(".product_extra_hover_image").hover(function(){
						  var product_id = $(this).find('.has_extra_hover_image .extra_hover_image').attr('productid');
						  var target_image = $(this).find('.has_extra_hover_image .extra_hover_image img');
						  $(target_image).attr('data-src', '/web/image/product.template/' + product_id +'/hover_image');
						  $('.lazyload').lazyload();
					  }, function(){
						  var target_image = $(this).find('.has_extra_hover_image .extra_hover_image img');
						  $(target_image).delay(200).attr('data-src', ' ');
					  });
				  }, 1000);
				/* Product hover image js end */
	
				setTimeout(function(){
					$('#products_grid').fadeIn();
				}, 500);
				var size = $(window).width();
				if (size <= 767){
					$(function() {
						if ($(".bizemart_shop #products_grid").hasClass("o_wsale_layout_list")) {
							$(".bizemart_shop #products_grid").removeClass("o_wsale_layout_list");
						}
					});
				}
				$('.search_filter_attributes').keyup(function(e){
					if (e.which == 13) e.preventDefault();
					var input_val = $(this).val()
					var loop_el = $(this).parent().find('li,.list-group-item,.css_attribute_color,.brand_content')
					
					$(loop_el).each(function(index){
						var label_text = $(this).find('.get_attribute_name').text()
						var brand_id = $(this).find('.brand_image').attr('id')
		
						if (String(label_text).toLowerCase().match(input_val.toLowerCase()) || String(brand_id).toLowerCase().match(input_val.toLowerCase()) ) {
							$(this).removeClass('d-none')
						}else{
							$(this).addClass('d-none')
						}
					})
				})
				var size = $(window).width();
				if (size <= 991) {
					var list_height = $('#o_wsale_offcanvas_categories .category-height-overflow').height();
				}
				else{
					var list_height = $('.category-height-overflow').height();
				}
				
				if(list_height > 60){
					if (size <= 991) {
						var text = $('#o_wsale_offcanvas_categories .category-height-overflow');
					}
					else{
						var text = $('.category-height-overflow');
					}
					var btn = $('.show-more-btn');
					var h = text[0].scrollHeight;
					if(h > 60) {
						btn.addClass('less');
						btn.css('display', 'block');
					}
				
					btn.click(function(e)
					{
						e.stopPropagation();
						var target = $(e.target);
						
						if (size <= 991) {
							var text = $('#o_wsale_offcanvas_categories .category-height-overflow');
						}
						else{
							var text = $('.category-height-overflow');
						}
						btn = $(this);
						h = text[0].scrollHeight;
					
						if (size <= 991) {
							if ($(target).hasClass('less')) {
								$(target).removeClass('less');
								$(target).addClass('more');
								$(target).text('- View less');
								text.animate({'height': '210px'});
							}else {
								$(target).addClass('less');
								$(target).removeClass('more');
								$(target).text('+ View more');
								text.animate({'height':h});
							}
						}
						else{
							if ($(target).hasClass('less')) {
								$(target).removeClass('less');
								$(target).addClass('more');
								$(target).text('- View less');
								text.animate({'height':h});
							}else {
								$(target).addClass('less');
								$(target).removeClass('more');
								$(target).text('+ View more');
								text.animate({'height':'210px'});
							}
						}
						
					});
				}
				/* category sidebar js shop page */
				  $(".bottom_bar_filter_button").on("click", function(e) {
					$(".category-sidebar").addClass("toggled");
					$(".blured-bg").addClass("active");
					e.stopPropagation()
				  });
				  $(".bottom_bar_category_button").on("click", function(e) {
					$(".category-sidebar").addClass("toggled");
					$(".blured-bg").addClass("active");
					e.stopPropagation()
				  });
				  $("#category_close").on("click", function(e) {
					$(".category-sidebar").removeClass("toggled");
					$(".blured-bg").removeClass("active");
					e.stopPropagation()
				  });
				  $(document).on("click", function(e) {
					if ((!$(e.target).closest('.category-sidebar').length)){
					  $(".category-sidebar.toggled").parents(".blured-bg").removeClass("active");
					  $(".category-sidebar").removeClass("toggled");
					}
				  });
				  /* category sidebar js end shop page */
	
				  // shop page banner category slider start
				  $("#bizemart_categ_slider").owlCarousel({
				  autoPlay: 3000, //Set AutoPlay to 3 seconds
				  responsiveClass: true,
				  items : 5,
				  loop: true,
				  center: true,
				  margin: 0,
				  nav:true,
				  navText: [
					  '<i class="fa fa-long-arrow-left" aria-hidden="true"></i>',
					  '<i class="fa fa-long-arrow-right" aria-hidden="true"></i>'
				  ],
				  responsive: {
					  0: {
						  items: 2,
					  },
					  420: {
						  items: 2,
					  },
					  768: {
						  items: 3,
					  },
					  1024: {
						  items: 5,
					  },
					  1200: {
						  items: 5,
					  },
					  1400: {
						  items: 5,
					  },
				  },
				  });
	
				  $("#bizemart_sub_categ_slider").owlCarousel({
				  autoPlay: 3000, //Set AutoPlay to 3 seconds
				  responsiveClass: true,
				  items : 4,
				  loop: true,
				  center: true,
				  margin: 0,
				  nav:true,
				  navText: [
					  '<i class="fa fa-long-arrow-left" aria-hidden="true"></i>',
					  '<i class="fa fa-long-arrow-right" aria-hidden="true"></i>'
				  ],
				  responsive: {
					0: {
						items: 2,
					},
					420: {
						items: 2,
					},
					768: {
						items: 3,
					},
					1024: {
						items: 5,
					},
					1200: {
						items: 5,
					},
					1400: {
						items: 5,
					},
				  },
				  });
	
				  // shop page banner category slider end
			},
		});
		
		publicWidget.registry.productpageand404js = publicWidget.Widget.extend({
			selector: "#product_detail, .template_404_page",
			start: function () {
				/*product page highlight start*/
				$('[data-bs-toggle="popover"]').popover()
				/*product page highlight end*/
	
				/*404 page start try inherit */
				if($('.template_404_page').hasClass('template_404_page')){
					  $('.template_404_page').parent().siblings('hr').addClass('d-none');
				}
				/*404 page end*/
				setInterval(function(){
					$('.lazyload').lazyload();
				}, 1000);
			}
		});
	
		publicWidget.registry.sliderjs = publicWidget.Widget.extend({
			selector: "#product_detail",
	
			start: function () {
	
				  // accessories product slider js
				  $("#bizemart_accessory_product_slider").owlCarousel({
				  margin: 20,
				  dots: false,
				  rewind: true,
				  autoPlay: 3000, //Set AutoPlay to 3 seconds
				  responsiveClass: true,
				  items : 3,
				  loop: false,
				  nav:true,
				  navText: [
					  '<i class="fa fa-long-arrow-left" aria-hidden="true"></i>',
					  '<i class="fa fa-long-arrow-right" aria-hidden="true"></i>'
				  ],
				  responsive: {
					0: {
						items: 1,
					},
					420: {
						items: 1,
					},
					768: {
						items: 2,
					},
					1024: {
						items: 4,
					},
					1200: {
						items: 4,
					},
					1400: {
						items: 4,
					},
				  },
				  });
	
				  // alternative product slider js
				  $("#bizemart_alternative_product_slider").owlCarousel({
				  margin: 20,
				  dots: false,
				  rewind: true,
				  autoPlay: 3000, //Set AutoPlay to 3 seconds
				  responsiveClass: true,
				  items : 3,
				  loop: false,
				  nav:true,
				  navText: [
					  '<i class="fa fa-long-arrow-left" aria-hidden="true"></i>',
					  '<i class="fa fa-long-arrow-right" aria-hidden="true"></i>'
				  ],
				  responsive: {
					0: {
						items: 1,
					},
					420: {
						items: 1,
					},
					768: {
						items: 2,
					},
					1024: {
						items: 3,
					},
					1200: {
						items: 3,
					},
					1400: {
						items: 3,
					},
				  },
				  });
			}
	
		});
	
		$(document).ready(function() {
			$('.js_tags').change(get_product_tags);
			function  get_product_tags(ev) {
				if (!ev.isDefaultPrevented()) {
					ev.preventDefault();
					$(ev.currentTarget).closest("form").submit();
				}
			}
		})
	
		var ExtendWebsiteSale = publicWidget.registry.WebsiteSale.include({
			_changeCartQuantity: function ($input, value, $dom_optional, line_id, productIDs) {
				$($dom_optional).toArray().forEach((elem) => {
					$(elem).find('.js_quantity').text(value);
					productIDs.push($(elem).find('span[data-product-id]').data('product-id'));
				});
				$input.data('update_change', true);
		
				rpc("/shop/cart/update_json", {
					line_id: line_id,
					product_id: parseInt($input.data('product-id'), 10),
					set_qty: value,
					display: true,
				}).then((data) => {
					$input.data('update_change', false);
					var check_value = parseInt($input.val() || 0, 10);
					if (isNaN(check_value)) {
						check_value = 1;
					}
					if (value !== check_value) {
						$input.trigger('change');
						return;
					}
					if (!data.cart_quantity) {
						return window.location = '/shop';
					}
					$input.val(data.quantity);
					$('.js_quantity[data-line-id=' + line_id + ']').val(data.quantity).text(data.quantity);
		
					wSaleUtils.updateCartNavBar(data);
					// wSaleUtils.showWarning(data.notification_info.warning);
					// Propagating the change to the express checkout forms
					Component.env.bus.trigger('cart_amount_changed', [data.amount, data.minor_amount]);
					if (data.warning) {
						var cart_alert = $('.oe_cart').parent().find('#data_warning');
						if (cart_alert.length === 0) {
							$('.oe_cart').prepend('<div class="alert alert-danger alert-dismissable" role="alert" id="data_warning">' +
								'<button type="button" class="close" data-bs-dismiss="alert" aria-hidden="true">&times;</button> ' + data.warning + '</div>');
						}
						else {
							cart_alert.html('<button type="button" class="close" data-bs-dismiss="alert" aria-hidden="true">&times;</button> ' + data.warning);
						}
						$input.val(data.quantity);
					}
				});
				setTimeout(function () {
					rpc('/update/menucart').then(function (data) {
						$(".bizemart_shop .shop-collection-cart-main").first().before(data).end().remove();
						$(".bottom-bar-cart .shop-collection-cart-main").first().before(data).end().remove();
					});
				}, 1000);
		
				setTimeout(function () {
					rpc('/update/mobilecart').then(function (data) {
						$(".mobile-cart-right").first().before(data).end().remove();
					});
				}, 1000);
			},
		});
		
		var ExtendOptionalModalSubmit = publicWidget.registry.WebsiteSale.include({
			_onModalSubmit: function (goToShop) {
				const $product = $('#product_detail');
				let currency;
				if ($product.length) {
					currency = this.$('[itemprop="priceCurrency"]').first().text();
				} else {
					// Add to cart from /shop page
					currency = this.$('[itemprop="priceCurrency"]').first().text();
				}
				const productsTrackingInfo = [];
				this.$('.js_product.in_cart').each((i, el) => {
					productsTrackingInfo.push({
						'item_id': el.getElementsByClassName('product_id')[0].value,
						'item_name': el.getElementsByClassName('product_display_name')[0].textContent,
						'quantity': el.getElementsByClassName('js_quantity')[0].value,
						'currency': currency,
						'price': el.getElementsByClassName('oe_price')[0].getElementsByClassName('oe_currency_value')[0].textContent,
					});
				});
				if (productsTrackingInfo) {
					this.$el.trigger('add_to_cart_event', productsTrackingInfo);
				}
	
				this.optionalProductsModal.getAndCreateSelectedProducts()
					.then((products) => {
						const productAndOptions = JSON.stringify(products);
						rpc('/shop/cart/update_option', {product_and_options: productAndOptions})
							.then(function (quantity) {
								if (goToShop) {
									window.location.pathname = "/shop/cart";
								}
								const $quantity = $(".my_cart_quantity");
								$quantity.removeClass('d-none');
								$quantity.text(quantity.cart_quantity).hide().fadeIn(600);
							});
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
					});
			},
		});

	// });