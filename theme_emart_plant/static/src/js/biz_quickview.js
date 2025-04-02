/** @odoo-module */

import publicWidget from "@web/legacy/js/public/public_widget";
import { _t } from "@web/core/l10n/translation";
import { rpc } from "@web/core/network/rpc";
    
    publicWidget.registry.websiteSaleCategoryMobile = publicWidget.Widget.extend({
        selector: '#wrapwrap',
        events: {
            'click .fa-chevron-right': '_onOpenClick',
            'click .fa-chevron-down': '_onCloseClick',
        },
    
        //--------------------------------------------------------------------------
        // Handlers
        //--------------------------------------------------------------------------
    
        /**
         * @private
         * @param {Event} ev
         */
        _onOpenClick: function (ev) {
            var $fa = $(ev.currentTarget);
            $fa.parent().siblings().find('.fa-chevron-down:first').click();
            $fa.parents('li').find('ul:first').show('normal');
            $fa.toggleClass('fa-chevron-down fa-chevron-right');
        },
        /**
         * @private
         * @param {Event} ev
         */
        _onCloseClick: function (ev) {
            var $fa = $(ev.currentTarget);
            $fa.parent().find('ul:first').hide('normal');
            $fa.toggleClass('fa-chevron-down fa-chevron-right');
        },
    });
    
    publicWidget.registry.plantModalPopups = publicWidget.Widget.extend({
      selector: "#wrapwrap",
      events: {
        "click a.quick_btn,button.quick_btn": "_prodqvopen",
        "click a.select_btn": "_prodsvopen",
        "click a.similar_btn": "_prodspopen",
      },
      
      
      _prodqvopen: function (ev) {
        var self = this;
        var pid = $(ev.currentTarget).attr('data-product_template_id');
        window.quick_btn = $(ev.currentTarget);
        var domain_url = encodeURIComponent(window.location.origin);
        setTimeout(function(){ 
            $(".quick_modal_product_details").css("z-index", "0"); 
        }, 1500);

        rpc('/get_prod_quick_view_details', { 'prod_id': pid, 'href': domain_url }).then(function (data) {
            $(".quick_modal_wrap").append(data);
            self.trigger_up('widgets_start_request', {
                $target: $(".quick_modal_wrap")
            });
            $(".quick-modal-backdrop").fadeIn();
            $(".quick_modal_wrap").css("display", "block");
            $(".quick-popout #product_details").css("transform", "translateX(0)");
            $("[data-attribute_exclusions]").trigger('change');
            $("[data-attribute_exclusions]").on('change', function (event) {
                setTimeout(function () {
                    $('.lazyload').lazyload();
                }, 1000);
            });

            $(".quick_close").click(function () {
                setTimeout(function () {
                    $('.quick_modal_wrap').empty(data); 
                }, 500);
                $(".quick-popout #product_details").css("transform", "translateX(-50%)","z-index", "-1");
            });
            setTimeout(function () {
                $('.lazyload').lazyload();
            }, 1000);
        });
    },
      _prodsvopen: function (ev) {
        var self = this;
        var shoppageqtydiv = $(ev.currentTarget)
          .parents("form")
          .find(".shop_page_quantity");
        if ($(shoppageqtydiv).length) {
          var shoppageqty = $(shoppageqtydiv).find("input.quantity").val();
        }
        var pid = $(ev.currentTarget).attr("data-product_template_id");
        window.select_btn = $(ev.currentTarget);
        rpc("/get_prod_select_option_details", { prod_id: pid }).then(
          function (data) {
            $(".quick_modal_wrap").append(data);
            self.trigger_up("widgets_start_request", {
              $target: $(".quick_modal_wrap"),
            });
            if (parseInt(shoppageqty) > 1) {
              $(".quick_modal_wrap")
                .find(".css_quantity input.quantity")
                .val(parseInt(shoppageqty))
                .change();
            }
            $(".select-modal-backdrop").fadeIn();
            $(".quick_modal_wrap").css("display", "block");
            $("[data-attribute_exclusions]").trigger("change");
            $("[data-attribute_exclusions]").on("change", function (event) {
              setTimeout(function () {
                $(".lazyload").lazyload();
              }, 1000);
            });
            $(".css_attribute_color input").click(function (event) {
              setTimeout(function () {
                $(".lazyload").lazyload();
              }, 1000);
            });

            $(".select_close").click(function () {
              $(".quick_modal_wrap").empty(data);
            });
            $(".select-modal #add_to_cart").click(function () {
              setTimeout(function () {
                $(".select_close").click();
              }, 1000);
            });
            setTimeout(function () {
              $(".lazyload").lazyload();
            }, 1000);
          }
        );
      },
      _prodspopen: function (ev) {
        var pid = $(ev.currentTarget).attr("data-product_template_id");
        window.similar_btn = $(ev.currentTarget);
        var domain_url = encodeURIComponent(window.location.origin);

        rpc("/get_prod_similar_view_details", {
          prod_id: pid,
          href: domain_url,
        }).then(function (data) {
          $(".quick_modal_wrap").append(data);
          $(".similar-modal-backdrop").fadeIn();
          $(".quick_modal_wrap").css("display", "block");
          $("[data-attribute_exclusions]").trigger("change");
          $("[data-attribute_exclusions]").on("change", function (event) {
            setTimeout(function () {
              $(".lazyload").lazyload();
            }, 1000);
          });

          $(".similar_close").click(function () {
            $(".quick_modal_wrap").empty(data);
          });

          $(".quick_modal_wrap")
            .find("#estore_similar_popup")
            .owlCarousel({
              autoPlay: 3000, //Set AutoPlay to 3 seconds
              responsiveClass: true,
              items: 4,
              loop: false,
              // loop: true,
              dots: true,
              margin: 30,

              nav: true,
              navText: [
                '<i class="fa fa-long-arrow-left"></i>',
                '<i class="fa fa-long-arrow-right"></i>',
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
                  items: 2,
                },
                1200: {
                  items: 3,
                },
                1400: {
                  items: 3,
                },
              },
            });
          $(".lazyload").lazyload();
        });
      },
    
    });
    

    
        publicWidget.registry.openpop = publicWidget.Widget.extend({
            "selector": "#wrapwrap",
            "events":{
                "click .openpop":"_openSignuppopup",
                "click .resetbtn":"_resetForm",
                "click .respass":"_resetPassword",
                "click .loginbtn":"_oauth",
                "click .alreadyuser":"_backToLogin",
                "click .signupbtn":"_userSignup",
                "click .createbtn":"_createAcc"
                
            },
            _resetPassword:function(ev){
                if($("#resetlogin").val().trim() != ""){
                    ev.preventDefault();
                    return rpc("/ajax/web/reset_password",
                        {
                            "login":$("#resetlogin").val(),
                        }
                    ).then(function (result) {
                        if("error" in result){
                            $("#error").css("display","block").empty().append(result["error"]);
                        }
                        else if ("message" in result){
                            $("#reset_form").css("display","none");
                            $("#msgbox").css("display","block");
                            $("#messager").empty().append(result["message"]);
                        }
                    });
                }
            },
            _resetForm:function(){
                $("#nav-reset-tab").click();
            },
            _createAcc:function(){
                $("#nav-register-tab").click();
            },
            _userSignup:function(ev){
                if($("#logins").val().trim() != "" && $("#passwords").val().trim() != ""
                    && $("#confirm_passwords").val().trim() != "" && $("#names").val().trim() != ""){
                    ev.preventDefault();
                    return rpc("/ajax/signup/",
                        {
                            "login":$("#logins").val(),
                            "name":$("#names").val(),
                            "password":$("#passwords").val(),
                            "confirm_password":$("#confirm_passwords").val(),
                            "token":$("#token").val()
                        }
                    ).then(function (result) {
                        if("error" in result){
                            $("#errors").css("display","block").empty().append(result["error"])
                        }
                        else if(result["signup_success"] == true){
                            window.location.reload();
                        }
                    });
                }
            },
            _backToLogin:function(){
                $("#nav-login-tab").click();
            },
            _openSignuppopup:function(evt){
                var theme_name = $(evt.currentTarget).attr('data-theme_name');
                return rpc("/ajax/login/",
                    {'theme_name':theme_name
                }).then(function (result) {
                    $("#nav-login").empty().append(result["loginview"]);
                    $("#nav-login-tab").click();
                    // $(".blured-bg").addClass("active");
                    if("signupview" in result){
                        $("#nav-register").empty().append(result["signupview"]);
                    }
                    if("resetview" in result){
                        $("#nav-reset").empty().append(result["resetview"]);
                    }
        
                });
            },
            _oauth:function(ev){
                if($("#login").val().trim() != "" && $("#password").val().trim() != ""){
                    ev.preventDefault();
                    return rpc("/ajax/web/login",
                        {
                        "login":$("#login").val(),
                        "password":$("#password").val()
                        }
                    ).then(function (result) {
                        if(result["login_success"] == true){
                            window.location.reload();
                        }
                        else if("error" in result){
                            $("#errormsg").css("display","block").empty().append(result["error"]);
                        }
                    });
                }
            }
        });
    
    publicWidget.registry.infinite_load = publicWidget.Widget.extend({
        selector: ".infinite_loader_div",
        events: {
            'click .infinite_load_button': 'startLoadMoreNextClick',
            'click .infinite_load_button_top': 'startLoadMorePrevClick',
        },
        start: function () {
            var self = this;
            self.startLoadMore();
            var total_product_count = $(".infinite_load_next_page").attr('all-products');
        },
        startLoadMore: function () {
            var next_call = true;
            var prev_call = true;
            var self = this;
            $('#wrapwrap').scroll(function() {
                var scrollTop = $('#wrapwrap').scrollTop();
                var page_url = $(".infinite_load_next_page").attr('next-page-url');
                var prev_page_url = $(".infinite_load_next_page").attr('prev-page-url');
                var first_page_url = $(".infinite_load_next_page").attr('first-page-url');
                var last_page_url = $(".infinite_load_next_page").attr('last-page-url');
                var current_url = $(".infinite_load_next_page").attr('current-page-url');
                var next_page_num = $(".infinite_load_next_page").attr('next-page-num');
                var prev_page_num = $(".infinite_load_next_page").attr('prev-page-num');
                var total_page = $(".infinite_load_next_page").attr('total-page');
                if ($(".bizemart_shop").hasClass("bizemart_shop")) {
                    var trigger_element = document.querySelector('.bizemart_bottom_pager');
                    var position = trigger_element.getBoundingClientRect();
                }else {
                    var position = -1;
                }
    
    
                if(position.top >= 0 && position.bottom <= window.innerHeight) {
                    if(next_call && current_url != last_page_url){
                        next_call = false;
                        $.ajax({
                            url: page_url,
                            type: 'GET',
                            beforeSend: function(){
                                $(".infinite_loader_div_next").removeClass("d-none");
                            },
                            success: function(data) {
                                $(".infinite_loader_div_next").addClass("d-none");
                                var data_replace = null;
    
                                var new_page_url = $(data).find('.infinite_load_next_page').attr('next-page-url');
                                $(".infinite_load_next_page").attr('next-page-url',new_page_url);
    
                                var next_page_num = $(data).find('.infinite_load_next_page').attr('next-page-num');
                                $(".infinite_load_next_page").attr('next-page-num',next_page_num);
    
                                data_replace = $(data).find("#products_grid .o_wsale_products_grid_table_wrapper tr");
                                if(data_replace){
                                    $("#products_grid tbody").append(data_replace);
                                }
                                if(last_page_url !=  page_url)
                                {
                                    $("ul.pagination li:last").removeClass("disabled");
                                    next_call = true;
                                }else {
                                    $("ul.pagination li:last").addClass("disabled");
                                }
                                $("ul.pagination li:first-child").removeClass("disabled");
                                var update_pre_page = $(data).find('.infinite_load_next_page').attr('prev-page-url');
                                $("ul.pagination li:first-child a").attr("href",update_pre_page);
                                $("ul.pagination li:last a").attr("href",new_page_url);
    
                                var active_page = $(data).find(".infinite_load_next_page").attr('page-number');
                                $("ul.pagination li").removeClass("active");
                                $("ul.pagination li:contains("+active_page+")").addClass("active");
    
                                var current_page_num = $(data).find(".infinite_load_next_page").attr('current-page-number');
                                $(".infinite_load_next_page").attr('current-page-number',current_page_num);
    
                                var current_page = $(data).find(".infinite_load_next_page").attr('current-page-url');
                                window.history.replaceState(null, null, current_page);
    
                                if(current_page_num >= total_page) {
                                    $('.infinite_load_button').removeClass('active');
                                }
                                $('.lazyload').lazyload();
                            }
                        });
                    }
                }
                if($("#products_grid tbody tr:first").length && scrollTop <= 0)
                {
                    if(prev_call && current_url != first_page_url){
                        prev_call = false;
                        $.ajax({
                            url: prev_page_url,
                            type: 'GET',
                            beforeSend: function(){
                                $(".infinite_loader_div").removeClass("d-none");
                            },
                            success: function(data) {
                                $(window).scrollTop(100);
                                $(".infinite_loader_div").addClass("d-none");
                                var data_replace = null;
    
                                var new_prev_page_url = $(data).find('.infinite_load_next_page').attr('prev-page-url');
                                $(".infinite_load_next_page").attr('prev-page-url',new_prev_page_url);
    
                                var new_prev_page_num = $(data).find('.infinite_load_next_page').attr('prev-page-num');
                                $(".infinite_load_next_page").attr('prev-page-num',new_prev_page_num);
    
                                data_replace = $(data).find("#products_grid .o_wsale_products_grid_table_wrapper tr");
                                if(data_replace){
                                    $("#products_grid tbody").prepend(data_replace);
                                }
    
                                var active_page = $(data).find(".infinite_load_next_page").attr('page-number');
                                var current_page_num = $(data).find(".infinite_load_next_page").attr('current-page-number');
                                $(".infinite_load_next_page").attr('current-page-number',current_page_num);
                                $("ul.pagination li").removeClass("active");
                                $("ul.pagination li:contains("+active_page+")").addClass("active");
    
                                var current_page = $(data).find(".infinite_load_next_page").attr('current-page-url');
                                window.history.replaceState(null, null, current_page);
                                if(first_page_url != prev_page_url)
                                {
                                    $("ul.pagination li:first-child").removeClass("disabled");
                                    prev_call = true;
                                }else {
                                    $("ul.pagination li:first-child").addClass("disabled");
                                }
                                $("ul.pagination li:last-child").removeClass("disabled");
                                var update_next_page = $(data).find('.infinite_load_next_page').attr('next-page-url');
                                $("ul.pagination li:first-child a").attr("href",update_next_page);
    
                                $("ul.pagination li:last-child a").attr("href",new_prev_page_url);
    
                                if(current_page_num < 2) {
                                    $('.infinite_load_button_top').removeClass('active');
                                }
                                $('.lazyload').lazyload();
                            }
                        });
                    }
                }
            });
        },
        
    });
    return {
        infinite_load : publicWidget.registry.infinite_load,
        openpop : publicWidget.registry.openpop,
        websiteSaleCategoryMobile : publicWidget.registry.websiteSaleCategoryMobile,
    }
    
// });