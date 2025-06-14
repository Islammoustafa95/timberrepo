/** @odoo-module */
    
import publicWidget from "@web/legacy/js/public/public_widget";
    
    publicWidget.registry.bizemartsSearchBar = publicWidget.Widget.extend({
        selector : '.bizople-search, .search-box',
        events: {
            "keyup .search-query-bizople": "_onKeydown",
            "keyup .search-query-bizople-popup": "_onKeydown",
        },
    
        _onKeydown: function(ev) {
            var search_var = $(ev.currentTarget).val()
            $.get("/bizemart/search/product", {
                'category':$("#tvsearchCateg").val(),
                'popupcateg':$("#tvsearchCateg-popup").val(),
                'term': search_var,
           }).then(function(data){
                if(data){
                    $(".bizople-search .bizople-search-results").remove()
                    $(".bizople-search .bizople-search-text").remove()
                    $('.bizople-search .o_wsale_search_order_by').after(data)
                    $(".search-box .bizople-search-results").remove()
                    $(".search-box .bizople-search-text").remove()
                    $('.search-box .o_wsale_search_order_by').after(data)
                }
    
            });
        },
    });
    
    publicWidget.registry.tvsearchCateg = publicWidget.Widget.extend({
        "selector":".select-category, .select-category-popup",
        events:{
            "click":"_changeCategory"
        },
        _changeCategory:function(ev){
            var getcatid = $(ev.currentTarget).attr("data-id");
            var getcatname = $(ev.currentTarget).text().trim();
            $("#tvsearchCateg").val(getcatid);
            $("#categbtn > .categ-name").text(getcatname);
            $(".select-category").removeClass("text-primary");
            $(ev.currentTarget).addClass("text-primary");
    
            $("#tvsearchCateg-popup").val(getcatid);
            $("#categbtn-popup > .categ-name").text(getcatname);
            $(".select-category-popup").removeClass("text-primary");
            $(ev.currentTarget).addClass("text-primary");
        }
    });
    // });    