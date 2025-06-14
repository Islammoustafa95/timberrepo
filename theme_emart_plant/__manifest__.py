# -*- coding: utf-8 -*-
# Developed by Bizople Solutions Pvt. Ltd.
# See LICENSE file for full copyright and licensing details

{
    'name': 'Theme Emart Plant',
    'category': 'Theme/eCommerce',
    'version': '18.0.0.2',
    'author': 'Bizople Solutions Pvt. Ltd.',
    'sequence': 1,
    'website': 'https://www.bizople.com',
    'summary': 'Theme eMart Plants is featured with eCommerce functionalities and is fully responsive for all devices that can be used for Grocery, Agriculture, Nursery, and related industries.',    
    'description': """Theme eMart Plants is featured with eCommerce functionalities and is fully responsive for all devices that can be used for Grocery, Agriculture, Nursery, and related industries.""",
    'depends': [
        'website',
        'plant_theme_common',
        'website_blog',
        'portal',
        'theme_default',
        'web_editor',
    ],
    'data': [
            
            # BackEnd Files
            'views/dynamicslider.xml',
            'views/res_config.xml',
            'views/product_tab_view.xml',
            'views/brand_view.xml',
            'views/product_service_view.xml',
            'views/customize_inherit.xml',
            'views/pwa_shortcuts.xml',
            'views/store_location.xml',
            'views/saleorder_field_add.xml',
            'views/product_template_attribute_value_view.xml',
            'views/product_size_chart_view.xml',
            'views/menus.xml',
            
            # FontEnd Template Files
            'views/assets.xml',
            'views/404_template.xml',
            'views/slider_snippets.xml', 
            'views/product_quick_view_template.xml', 
            'views/shop_page_template.xml',
            'views/product_page_template.xml',
            'views/product_customize_template.xml',
            'views/common_template.xml', 
            'views/shop_cart_sidebar.xml',
            'views/portal_template.xml',
           
            'views/wishlist_inherited.xml',
            'views/blog_page_inherit.xml',
            'views/product_rating_shop_page.xml',
            'views/image_hotspot_options.xml',
            'views/product_banner_options.xml',
           
            'views/checkout_pages_inherit.xml',
            'views/product_page_variant_img_template.xml',
            'views/biz_emart_shop_outlets_template.xml', 
            'views/theme_emart_plant_searchbar.xml',
            'views/theme_emart_plant_inherited.xml',

            # configurator
            'views/dynamic_config_template.xml',

            
            #Headers
            'views/headers/header_template1.xml',
            'views/headers/header_template2.xml',
            'views/headers/header_template3.xml',
            'views/headers/header_template4.xml',
            'views/headers/header_template5.xml',
            'views/headers/header_template6.xml',
            'views/headers/header_template7.xml',
            'views/headers/header_template8.xml',
            'views/headers/header_template9.xml',
            'views/headers/header_template10.xml',
            'views/headers/header_template11.xml',
            'views/headers/header_template12.xml',
            'views/headers/header_template13.xml',
            
            #Inherited 
            'views/inherited/login_template_inherited.xml',
            'views/inherited/blog_inherit.xml',
            'views/inherited/biz_emart_shop_contactus_two.xml',

            #Footers
            'views/footers/footer_template1.xml',
            'views/footers/footer_template2.xml',
            'views/footers/footer_template3.xml',
            'views/footers/footer_template4.xml',
            'views/footers/footer_template5.xml',
            'views/footers/footer_template6.xml',
            'views/footers/footer_template7.xml',
            'views/footers/footer_template8.xml',
            'views/footers/footer_biz_emart_shop_one.xml',
            'views/footers/footer_biz_emart_shop_two.xml',
            'views/footers/footer_template11.xml',
            
           #Emart Homepages
            'views/pages/emart_plant_homepage_one.xml',
            'views/pages/emart_plant_homepage_three.xml',
            'views/pages/emart_plant_homepage_two.xml',
            
            #Dynamic Configurator Snippets
            'views/snippets/s_emart_plant_page_one.xml',
            'views/snippets/s_emart_plant_page_two.xml',
            'views/snippets/s_emart_plant_page_three.xml',
            'views/snippets/s_biz_emart_title.xml',

            'views/snippets/s_emart_plant_page_one_banner.xml',
            'views/snippets/s_emart_plant_page_one_grid.xml',
            'views/snippets/s_emart_plant_page_one_history.xml',
            'views/snippets/s_emart_plant_page_one_categories.xml',
            'views/snippets/s_emart_plant_page_one_widget.xml',
            'views/snippets/s_emart_plant_page_one_three_blocks.xml',
            'views/snippets/s_emart_plant_page_one_testimonials.xml',
            'views/snippets/s_emart_plant_page_one_newsletter.xml',

            'views/snippets/s_emart_plant_page_two_banner.xml',
            'views/snippets/s_emart_plant_page_two_grid.xml',
            'views/snippets/s_emart_plant_page_two_three_blocks.xml',
            'views/snippets/s_emart_plant_page_two_testimonials.xml',
            'views/snippets/s_emart_plant_page_two_categories.xml',
            'views/snippets/s_emart_plant_page_two_newsletter.xml',

            'views/snippets/s_emart_plant_page_three_banner.xml',
            'views/snippets/s_emart_plant_page_three_history.xml',
            'views/snippets/s_emart_plant_page_three_image_text.xml',
            'views/snippets/s_emart_plant_page_three_two_blocks.xml',
            'views/snippets/s_emart_plant_page_three_testimonials.xml',
            'views/snippets/s_emart_plant_page_three_three_blocks.xml',
            'views/snippets/s_emart_plant_page_three_newsletter.xml',

            'views/snippets/s_configurator_snippet_style2.xml',
            'views/snippets/s_configurator_snippet_style3.xml',
            'views/snippets/s_configurator_snippet_style4.xml',
            'views/snippets/s_image_hotspot.xml',

            'views/snippets/blocks1.xml',
            'views/snippets/blocks2.xml',
            'views/snippets/blocks3.xml',
            'views/snippets/blocks4.xml',
            'views/snippets/blocks5.xml',
            'views/snippets/blocks6.xml',
            'views/snippets/blocks7.xml',

            'views/configurator/product_configurator_template.xml',
            'views/configurator/category_configurator_template.xml',
            'views/configurator/brand_configurator_template.xml',
            'views/configurator/blog_configurator_template.xml',

            'views/snippet_options.xml',

    ],
    'assets': {
        
        'web._assets_primary_variables':[
            ("prepend","/theme_emart_plant/static/src/scss/color_variables.scss"),
            "/theme_emart_plant/static/src/scss/theme_variable.scss",
        ],
        'web._assets_frontend_helpers': [
            "/theme_emart_plant/static/src/scss/bootstrap_overridden.scss",
        ],
        'web_editor.assets_wysiwyg': [
            "/theme_emart_plant/static/src/js/utils.js",
        ],
        'web.assets_backend': [
          
            "/theme_emart_plant/static/src/css/owl.carousel.css",
            "/theme_emart_plant/static/src/scss/blog_slider_product_banner_modals.scss",
            "/theme_emart_plant/static/src/scss/dynamic_configurator.scss",
            "/theme_emart_plant/static/src/scss/prod_sticky.scss",
            "/theme_emart_plant/static/lib/themify-icons/themify-icons.css",
            "/theme_emart_plant/static/lib/fonticon/strock-gap-icons.css",
            "/theme_emart_plant/static/lib/icofont/icofont.css",
            "/theme_emart_plant/static/lib/linearicons/style.css",
            "/theme_emart_plant/static/lib/RemixIcon/remixicon.css",
            "/theme_emart_plant/static/lib/lineicons/font-css/LineIcons.css",
            "/theme_emart_plant/static/src/scss/configurator/biz_mixins.scss",
            "/theme_emart_plant/static/src/scss/configurator/product_styles.scss",
            "/theme_emart_plant/static/src/scss/configurator/categ_styles.scss",
            "/theme_emart_plant/static/src/scss/configurator/brand_styles.scss",
            "/theme_emart_plant/static/src/scss/configurator/blog_styles.scss",

            ('include', 'theme_emart_plant.webclientmulti'),
        ],
        'web.assets_frontend': [
            "/theme_emart_plant/static/src/css/owl.carousel.css",

            "/theme_emart_plant/static/src/scss/font-family.scss",
            "/theme_emart_plant/static/src/css/ion.rangeSlider.css",
            "/theme_emart_plant/static/src/css/ion.rangeSlider.skinHTML5.css",
            "/theme_emart_plant/static/src/scss/pro_slider.scss",
            "/theme_emart_plant/static/src/scss/prod_sticky.scss",
            "/theme_emart_plant/static/lib/themify-icons/themify-icons.css",
            "/theme_emart_plant/static/lib/fonticon/strock-gap-icons.css",
            "/theme_emart_plant/static/lib/icofont/icofont.css",
            "/theme_emart_plant/static/lib/linearicons/style.css",
            "/theme_emart_plant/static/lib/RemixIcon/remixicon.css",
            "/theme_emart_plant/static/lib/lineicons/font-css/LineIcons.css",
            "/theme_emart_plant/static/src/scss/customise_model.scss",
            "/theme_emart_plant/static/src/scss/common.scss",
            "/theme_emart_plant/static/src/scss/login_popup.scss",
            "/theme_emart_plant/static/src/scss/headers/mobile_bottom_bar.scss",
            "/theme_emart_plant/static/src/scss/checkout_pages.scss",
            "/theme_emart_plant/static/src/scss/wishlist.scss",
            "/theme_emart_plant/static/src/scss/megamenu.scss",
            "/theme_emart_plant/static/src/scss/fonts.scss",
            "/theme_emart_plant/static/src/scss/snippets.scss",
            "/theme_emart_plant/static/src/scss/biz_emart_shop_snippet.scss",
            "/theme_emart_plant/static/src/scss/footers/footer.scss",
            "/theme_emart_plant/static/src/scss/footers/footer4.scss",
            "/theme_emart_plant/static/src/scss/footers/footer5.scss",
            "/theme_emart_plant/static/src/scss/footers/footer6.scss",
            "/theme_emart_plant/static/src/scss/footers/footer7.scss",
            "/theme_emart_plant/static/src/scss/footers/footer8.scss",
            "/theme_emart_plant/static/src/scss/footers/footer_one.scss",
            "/theme_emart_plant/static/src/scss/headers/sidebar.scss",
            "/theme_emart_plant/static/src/scss/headers/header11.scss",
            "/theme_emart_plant/static/src/scss/headers/header12.scss",
            "/theme_emart_plant/static/src/scss/headers/header13.scss",
            "/theme_emart_plant/static/src/scss/headers/header.scss",
            "/theme_emart_plant/static/src/scss/headers/header2.scss",
            "/theme_emart_plant/static/src/scss/headers/header3.scss",
            "/theme_emart_plant/static/src/scss/headers/header4.scss",
            "/theme_emart_plant/static/src/scss/headers/header5.scss",
            "/theme_emart_plant/static/src/scss/headers/header6.scss",
            "/theme_emart_plant/static/src/scss/headers/header7.scss",
            "/theme_emart_plant/static/src/scss/headers/header8.scss",
            "/theme_emart_plant/static/src/scss/headers/header9.scss",
            "/theme_emart_plant/static/src/scss/headers/header10.scss",
            "/theme_emart_plant/static/src/scss/shop_products.scss",
            "/theme_emart_plant/static/src/scss/shop_product.scss",
            "/theme_emart_plant/static/src/scss/optional_product_popup.scss",
            "/theme_emart_plant/static/src/scss/product_slider.scss",
            "/theme_emart_plant/static/src/scss/contactus.scss",
            "/theme_emart_plant/static/src/scss/newsletter_popup.scss",
            "/theme_emart_plant/static/src/scss/quick_view.scss",
            "/theme_emart_plant/static/src/scss/category_sidebar.scss",
            "/theme_emart_plant/static/src/scss/cart_sidebar.scss",
            "/theme_emart_plant/static/src/scss/compare_products.scss",
            "/theme_emart_plant/static/src/scss/shopby.scss",
            "/theme_emart_plant/static/src/scss/portal.scss",
            "/theme_emart_plant/static/src/scss/help_center.scss",
            "/theme_emart_plant/static/src/scss/coming-soon.scss",
            "/theme_emart_plant/static/src/scss/blog_page.scss",
            "/theme_emart_plant/static/src/scss/image_hotspot.scss",
            "/theme_emart_plant/static/src/scss/product_banner.scss",
           
            "/theme_emart_plant/static/src/scss/dynamic_configurator_snippets.scss",
            "/theme_emart_plant/static/src/scss/buttons/biz_button_1.scss",
            "/theme_emart_plant/static/src/scss/buttons/biz_button_2.scss",
            "/theme_emart_plant/static/src/scss/buttons/biz_button_3.scss",
            "/theme_emart_plant/static/src/scss/buttons/biz_button_4.scss",
            "/theme_emart_plant/static/src/scss/buttons/biz_button_5.scss",
            "/theme_emart_plant/static/src/scss/buttons/biz_button_6.scss",
            "/theme_emart_plant/static/src/scss/buttons/biz_button_7.scss",
            "/theme_emart_plant/static/src/scss/buttons/biz_button_8.scss",
            "/theme_emart_plant/static/src/scss/buttons/biz_button_9.scss",
            "/theme_emart_plant/static/src/scss/buttons/biz_button_10.scss",
            "/theme_emart_plant/static/src/scss/buttons/biz_button_11.scss",
            "/theme_emart_plant/static/src/scss/buttons/biz_button_12.scss",
            "/theme_emart_plant/static/src/scss/biz_shop_products.scss",
            "/theme_emart_plant/static/src/scss/homepages/s_emart_title.scss",
            
            #Snippts
            
            "/theme_emart_plant/static/src/scss/snippets/s_emart_plant_page_one_grid.scss",
            "/theme_emart_plant/static/src/scss/snippets/s_emart_plant_page_one_newsletter.scss",
            "/theme_emart_plant/static/src/scss/snippets/s_emart_plant_page_one_testimonials.scss",
            "/theme_emart_plant/static/src/scss/snippets/s_emart_plant_page_one_categories.scss",
            "/theme_emart_plant/static/src/scss/snippets/s_emart_plant_page_one_widget.scss",
            "/theme_emart_plant/static/src/scss/snippets/s_emart_plant_page_one_three_blocks.scss",
            "/theme_emart_plant/static/src/scss/snippets/s_emart_plant_page_two_categories.scss",
            "/theme_emart_plant/static/src/scss/snippets/s_emart_plant_page_three_image_text.scss",
            "/theme_emart_plant/static/src/scss/snippets/s_emart_plant_page_three_two_blocks.scss",
            "/theme_emart_plant/static/src/scss/snippets/s_emart_plant_page_one_banner.scss",
            "/theme_emart_plant/static/src/scss/snippets/s_emart_plant_page_two_banner.scss",
            "/theme_emart_plant/static/src/scss/snippets/s_emart_plant_page_three_banner.scss",
           

            #JS
            "/theme_emart_plant/static/src/js/bizcommon_fronted.js",
            "/theme_emart_plant/static/src/js/ion.rangeSlider.min.js",
            "/theme_emart_plant/static/src/js/common.js",
            "/theme_emart_plant/static/src/js/custom_config.js",
            "/theme_emart_plant/static/src/js/BizUtils.js",
            "/theme_emart_plant/static/src/js/biz_quickview.js",
            "/theme_emart_plant/static/src/js/product_variant.js",
            "/theme_emart_plant/static/src/js/user_portal.js",
            "/theme_emart_plant/static/src/js/portal.js",
            "/theme_emart_plant/static/src/js/pwebapp.js",
            "/theme_emart_plant/static/src/js/popover.js",
            "/theme_emart_plant/static/src/js/product_search.js",
            "/theme_emart_plant/static/src/js/store_location_data.js",
            "/theme_emart_plant/static/src/js/product_color_change.js",

            "/theme_emart_plant/static/src/js/dynamic_config_frontend.js",
            "/theme_emart_plant/static/src/js/product_brand.js",
            "/theme_emart_plant/static/src/js/product_configurator.js",



            "/theme_emart_plant/static/src/scss/configurator/biz_mixins.scss",
            "/theme_emart_plant/static/src/scss/configurator/product_styles.scss",
            "/theme_emart_plant/static/src/scss/configurator/categ_styles.scss",
            "/theme_emart_plant/static/src/scss/configurator/brand_styles.scss",
            "/theme_emart_plant/static/src/scss/configurator/blog_styles.scss",
            "/theme_emart_plant/static/src/scss/dynamic_configurator.scss",
            "/theme_emart_plant/static/src/xml/website_sale_reorder_modal_inherited.xml",
            ('include', 'theme_emart_plant.webclientmulti'),


        ],
        'theme_emart_plant.webclientmulti': [
            '/web/static/lib/jquery/jquery.js',
            '/theme_emart_plant/static/lib/owlcarousel/owl.carousel.min.js',
            '/theme_emart_plant/static/lib/lazyload/lazyload.js',            
             ('include', 'web_editor.wysiwyg_iframe_editor_assets'),
        ],

        'web_editor.assets_wysiwyg': [
            '/theme_emart_plant/static/src/xml/dynamic_config_tool.xml',
            '/theme_emart_plant/static/src/xml/bizople_theme_common.xml',
            '/theme_emart_plant/static/src/xml/product_banner.xml',
            '/theme_emart_plant/static/src/xml/image_hotspot_info.xml',
            '/theme_emart_plant/static/src/xml/button_editor.xml',
            "/theme_emart_plant/static/src/js/button_editor.js",
        ],

       'web_editor.assets_snippets_menu': [
            '/theme_emart_plant/static/src/js/bizcommon_editor.js',
        ],

        'website.assets_wysiwyg': [
            "/theme_emart_plant/static/src/js/product_banner_option.js",
            "/theme_emart_plant/static/src/js/image_hotspot_options.js",
            "/theme_emart_plant/static/src/js/dynamic_config_tool.js",                                                                
        ],

        'web_editor.assets_media_dialog': [
            'theme_emart_plant/static/src/js/icon_selector.js',
        ],
    },
    'demo': [
            'data/menu_data.xml',
            'views/help_center_template.xml',
            'views/coming_soon_template.xml',
            'views/thankyou_template.xml',
    ],
    
    'live_test_url': 'https://www.bizople.com/r/theme-plant',
    
    'images': [
        'static/description/emart_cover.png',
        'static/description/plants_screenshot.gif',
    ],

    'installable': True,
    'auto_install': False,
    'application': False,
    'license': 'OPL-1',
    'price': 125,
    'currency': 'EUR',
}
