/** @odoo-module **/

import { registry } from '@web/core/registry';
// All of our work will be trash because registry will be no longer useful in next version.
let PRODUCTS_ACTIONS = ['rating', 'quick_view', 'add_to_cart', 'comparison', 'wishlist', 'category_info', 'label'];
let PRODUCTS_ACTIONS_2 = ['rating', 'category_info', 'add_to_cart', 'wishlist', 'comparison', 'description_ecommerce', 'label'];
let PRODUCTS_DATA = { models: ['product.template', 'product.product'], fields: ['name', 'list_price', 'dr_stock_label'], fieldsToMarkUp: ['price', 'list_price', 'dr_stock_label']}
let CATEGORIES_DATA = { fields: ['name'], fieldsToMarkUp: []};
let SELECTOR_DATA = { TpRecordSelector: { ...PRODUCTS_DATA, defaultVal: { selectionType: 'manual', recordsIDs: [], model: 'product.template'}}};
let EXTRA_OPTIONS = { TpExtraOpts: { startDate: '', endDate: '', priceList: '*' } };
let CATEGORY_SELECTOR_DATA = { TpRecordSelector: { ...CATEGORIES_DATA, defaultVal: { selectionType: 'manual', recordsIDs: [], model: 'product.public.category'}}};

registry.category('theme_prime_card_registry')
    .add('s_card_style_1', {supportedActions: PRODUCTS_ACTIONS})
    .add('s_card_style_2', {supportedActions: PRODUCTS_ACTIONS})
    .add('s_card_style_3', {supportedActions: [...new Set([...PRODUCTS_ACTIONS, ...['show_similar']])]})
    .add('s_card_style_4', {supportedActions: PRODUCTS_ACTIONS})
    .add('s_card_style_5', { supportedActions: [...new Set([...PRODUCTS_ACTIONS, ...['colors']])]})
    .add('s_card_style_6', { supportedActions: [...new Set([...PRODUCTS_ACTIONS, ...['show_similar', 'colors']])]})
    .add('s_card_style_7', { supportedActions: [...new Set([...PRODUCTS_ACTIONS, ...['show_similar', 'colors']])]})
    .add('s_card_style_8', { supportedActions: [...new Set([...PRODUCTS_ACTIONS, ...['show_similar']])]})

registry.category('theme_prime_mobile_card_registry')
    .add('s_mobile_card_style_1', {supportedActions: []})
    .add('s_mobile_card_style_2', {supportedActions: []})

registry.category('theme_prime_small_card_registry')
    .add('tp_category_product_card_style_1', { supportedActions: ['add_to_cart', 'rating', 'category_info']})
    .add('tp_category_product_card_style_2', { supportedActions: ['add_to_cart', 'rating', 'category_info'] })
    .add('tp_category_product_card_style_3', { supportedActions: ['add_to_cart', 'rating', 'category_info'] });

registry.category('theme_prime_top_category_card_registry')
    .add('tp_category_category_card_style_1', { supportedActions: [] })
    .add('tp_category_category_card_style_2', { supportedActions: [] })

registry.category('theme_prime_two_column_card_registry')
    .add('tp_two_column_card_style_1', { supportedActions: PRODUCTS_ACTIONS_2})
    .add('tp_two_column_card_style_2', { supportedActions: ['rating', 'category_info', 'add_to_cart', 'wishlist', 'comparison', 'description_ecommerce', 'label', 'colors']})
    .add('tp_two_column_card_style_3', { supportedActions: ['rating', 'category_info', 'add_to_cart', 'wishlist', 'comparison', 'description_ecommerce', 'label', 'colors']});

registry.category('theme_prime_snippet_registry')
    .add('s_d_products_snippet', {
        widgets: {
            ...SELECTOR_DATA,
            TpUiComponent: { cardRegistry: 'theme_prime_card_registry', defaultVal: { style: 's_card_style_1', mode: 'slider', ppr: 4, activeActions: PRODUCTS_ACTIONS, mobileConfig: { style: 'default', mode: 'default' } } },
            ...EXTRA_OPTIONS
        },
        defaultValue: { hasSwitcher: true, }
    })
    .add('s_d_single_product_count_down', { widgets: { ...SELECTOR_DATA, ...EXTRA_OPTIONS }, defaultValue: { recordsLimit: 5} })
    .add('s_two_column_cards', { widgets: { ...SELECTOR_DATA, TpUiComponent: { cardRegistry: 'theme_prime_two_column_card_registry', defaultVal: { style: 'tp_two_column_card_style_1', mode: 'slider', activeActions: PRODUCTS_ACTIONS_2 } }, ...EXTRA_OPTIONS } })
    .add('s_d_products_grid', { widgets: { ...SELECTOR_DATA, ...EXTRA_OPTIONS }, defaultValue: { recordsLimit: 9 } })
    .add('s_d_category_snippet', { widgets: { ...CATEGORY_SELECTOR_DATA, TpUiComponent: { cardRegistry: 'theme_prime_card_registry', defaultVal: { style: 's_card_style_1', sortBy: 'list_price asc', tabStyle: 'tp-droggol-18-builder-snippet-tab-1', mode: 'slider', limit: 8, ppr: 4, includesChild: true, activeActions: PRODUCTS_ACTIONS, mobileConfig: { style: 'default', mode: 'default' } } }, ...EXTRA_OPTIONS } })
    .add('s_products_by_brands_tabs', { widgets: { TpRecordSelector: { model: 'product.attribute.value', fields: ['name'], isBrand: true, fieldsToMarkUp: [], defaultVal: { selectionType: 'manual', recordsIDs: [],model: 'product.attribute.value' } }, TpUiComponent: { cardRegistry: 'theme_prime_card_registry', defaultVal: { tabStyle: 'tp-droggol-18-builder-snippet-tab-1', style: 's_card_style_1', sortBy: 'list_price asc', mode: 'slider', ppr: 4, activeActions: PRODUCTS_ACTIONS, limit: 6, mobileConfig: { style: 'default', mode: 'default' } } } } })
    .add('s_d_brand_snippet', { widgets: { TpRecordSelector: { model: 'product.attribute.value', fields: ['name'], isBrand: true, fieldsToMarkUp: [], defaultVal: { selectionType: 'manual', recordsIDs: [], model: 'product.attribute.value' } }, TpUiComponent: { cardRegistry: 'theme_prime_brand_card_registry', defaultVal: { style: 'tp_brand_card_style_1', mode: 'slider' } }, ...EXTRA_OPTIONS } })
    .add('s_brands_small', { widgets: { TpRecordSelector: { model: 'product.attribute.value', fields: ['name'], isBrand: true, fieldsToMarkUp: [], defaultVal: { selectionType: 'manual', recordsIDs: [],model: 'product.attribute.value' } } }, defaultValue: { recordsLimit: 8 } })
    .add('s_category_small', { widgets: { ...CATEGORY_SELECTOR_DATA }, defaultValue: { recordsLimit: 8 } })
    .add('s_d_single_category_snippet', { widgets: { ...CATEGORY_SELECTOR_DATA, TpUiComponent: { cardRegistry: 'theme_prime_small_card_registry', defaultVal: { style: 'tp_category_product_card_style_1', sortBy: 'list_price asc', activeActions: ['add_to_cart', 'rating', 'category_info'], includesChild: true, } }, ...EXTRA_OPTIONS }, defaultValue: { recordsLimit: 1} })
    .add('s_d_single_product_snippet', { widgets: { TpRecordSelector: { ...PRODUCTS_DATA, ...{ models: ['product.template']} , defaultVal: { selectionType: 'manual', recordsIDs: [], model: 'product.template' }}, ...EXTRA_OPTIONS }, defaultValue: { recordsLimit: 1} })
    .add('s_d_single_product_cover_snippet', { widgets: { TpRecordSelector: { ...PRODUCTS_DATA, ...{ models: ['product.template'] }, defaultVal: { selectionType: 'manual', recordsIDs: [], model: 'product.template' } }, ...EXTRA_OPTIONS }, defaultValue: { recordsLimit: 1} })
    .add('s_d_product_count_down', { widgets: { ...SELECTOR_DATA, ...EXTRA_OPTIONS }, defaultValue: { noSnippet: true }})
    .add('s_d_product_small_block', { widgets: { ...SELECTOR_DATA, ...EXTRA_OPTIONS }, defaultValue: { noSnippet: true }})
    .add('s_d_image_products_block', { widgets: { ...SELECTOR_DATA, ...EXTRA_OPTIONS }, defaultValue: { hasSwitcher: true, } })
    .add('s_d_top_categories', { widgets: { ...CATEGORY_SELECTOR_DATA, TpUiComponent: { cardRegistry: 'theme_prime_top_category_card_registry', defaultVal: { style: 'tp_category_category_card_style_1', sortBy: 'list_price asc', includesChild: true } }, ...EXTRA_OPTIONS }, defaultValue: { recordsLimit: 3} })
    .add('s_category_snippet', { widgets: { ...CATEGORY_SELECTOR_DATA, TpUiComponent: { cardRegistry: 'theme_prime_category_card_registry', defaultVal: { style: 's_tp_category_style_1' } }, ...EXTRA_OPTIONS } })
    .add('s_product_listing_cards', { widgets: { TpUiComponent: { cardRegistry: 'theme_prime_product_list_cards', defaultVal: { header: 'tp_product_list_header_1', style: 'tp_product_list_cards_1', limit: 5, activeActions: ['rating'], bestseller: true, newArrived: true, discount: true } }, ...EXTRA_OPTIONS }, defaultValue: { noSelection: true, maxValue: 5, minValue: 2} })
    .add('s_image_product_listing_cards', { widgets: { TpUiComponent: { cardRegistry: 'theme_prime_product_list_cards', defaultVal: { header: 'tp_product_list_header_1', style: 'tp_product_list_cards_1', limit: 5, activeActions: ['rating'], bestseller: true, newArrived: true, discount: true } }, ...EXTRA_OPTIONS}, defaultValue: { noSelection: true, maxValue: 5, minValue: 2} })
    .add('s_tp_mega_menu_category_snippet', { widgets: { ...CATEGORY_SELECTOR_DATA, TpUiComponent: { cardRegistry: 'theme_prime_mega_menu_cards', defaultVal: { style: 's_tp_hierarchical_category_style_1', childOrder: 'sequence', productListing: 'newArrived', limit: 5, activeActions: ['brand', 'label', 'count'] } }, ...EXTRA_OPTIONS }, defaultValue: { maxValue: 10, minValue: 2} })
    .add('s_mega_menu_category_tabs_snippet', { widgets: { ...CATEGORY_SELECTOR_DATA, TpUiComponent: { cardRegistry: 'theme_prime_mega_menu_tabs_styles', defaultVal: { style: 'tp_mega_menu_tab_style_1', childOrder: 'sequence', menuLabel: true, onlyDirectChild: false, categoryTabsConfig: { activeRecordID: false, records: [] } } }, ...EXTRA_OPTIONS }, defaultValue: { noSwicher: true, lazy: true} })
    .add('s_product_listing_tabs', { widgets: { ...CATEGORY_SELECTOR_DATA, TpUiComponent: { cardRegistry: 'theme_prime_card_registry', defaultVal: { mode: 'slider', ppr: 4, tabStyle: 'tp-droggol-18-builder-snippet-tab-1', style: 's_card_style_1', limit: 20, activeActions: PRODUCTS_ACTIONS, bestseller: true, newArrived: true, discount: true, mobileConfig: { style: 'default', mode: 'default' } } }, ...EXTRA_OPTIONS}, defaultValue: { forceVisible: true, recordsLimit: 1} });

registry.category('theme_prime_mega_menus')
    .add('s_tp_mega_menu_category_snippet', { widgets: { ...CATEGORY_SELECTOR_DATA, TpUiComponent: { cardRegistry: 'theme_prime_mega_menu_cards', defaultVal: { style: 's_tp_hierarchical_category_style_1', childOrder: 'sequence', productListing: 'newArrived', limit: 5, activeActions: ['brand', 'label', 'count'] } } }, defaultValue: { maxValue: 10, minValue: 2} })
    .add('s_mega_menu_category_tabs_snippet', { widgets: { ...CATEGORY_SELECTOR_DATA, TpUiComponent: { cardRegistry: 'theme_prime_mega_menu_tabs_styles', defaultVal: { style: 'tp_mega_menu_tab_style_1', childOrder: 'sequence', menuLabel: true, onlyDirectChild: false, categoryTabsConfig: { activeRecordID: false, records: [] } } } }, defaultValue: { noSwicher: true, lazy: true} })
    .add('s_category_snippet', { widgets: { ...CATEGORY_SELECTOR_DATA, TpUiComponent: { cardRegistry: 'theme_prime_category_card_registry', defaultVal: { style: 's_tp_category_style_1' } } }});

registry.category('theme_prime_category_card_registry')
    .add('s_tp_category_style_1', { supportedActions:[] })
    .add('s_tp_category_style_2', { supportedActions: [] })
    .add('s_tp_category_style_3', { supportedActions: [] })
    .add('s_tp_category_style_4', { supportedActions: [] })
    .add('s_tp_category_style_5', { supportedActions: [] });

registry.category('theme_prime_brand_card_registry')
    .add('tp_brand_card_style_1', { supportedActions:[] })
    .add('tp_brand_card_style_2', { supportedActions: [] })
    .add('tp_brand_card_style_3', { supportedActions: [] })
    .add('tp_brand_card_style_4', { supportedActions: [] })
    .add('tp_brand_card_style_5', { supportedActions: [] })

registry.category('theme_prime_product_list_cards')
    .add('tp_product_list_cards_1', {supportedActions: ['rating']})
    .add('tp_product_list_cards_2', {supportedActions: ['rating']})
    .add('tp_product_list_cards_3', {supportedActions: ['rating', 'add_to_cart']})
    .add('tp_product_list_cards_4', {supportedActions: ['rating', 'add_to_cart', 'wishlist', 'quick_view']});

registry.category('theme_prime_product_list_cards_headers')
    .add('tp_product_list_header_1', {})
    .add('tp_product_list_header_2', {})
    .add('tp_product_list_header_3', {});

registry.category('theme_prime_mega_menu_tabs_styles')
    .add('tp_mega_menu_tab_style_1', { supportedActions:[] })
    .add('tp_mega_menu_tab_style_2', { supportedActions: [] })

registry.category('theme_prime_mega_menu_cards')
    .add('s_tp_hierarchical_category_style_1', {supportedActions: ['limit', 'brand', 'label', 'count', 'style', 'background']})
    .add('s_tp_hierarchical_category_style_2', {supportedActions: ['limit', 'brand', 'label', 'count', 'style', 'background']})
    .add('s_tp_hierarchical_category_style_3', {supportedActions: ['limit', 'brand', 'label', 'count', 'style', 'background']})
    .add('s_tp_hierarchical_category_style_4', {supportedActions: ['limit', 'brand', 'label', 'count', 'style', 'background']})
    .add('s_tp_hierarchical_category_style_5', {supportedActions: ['productListing', 'limit', 'brand', 'label', 'count', 'style', 'background']})
    .add('s_tp_hierarchical_category_style_6', {supportedActions: ['limit', 'brand', 'label', 'count', 'style', 'background']})
    .add('s_tp_hierarchical_category_style_7', {supportedActions: ['limit', 'brand', 'label', 'count', 'style', 'background']})
    .add('s_tp_hierarchical_category_style_8', {supportedActions: ['limit', 'brand', 'label', 'count', 'style', 'background']})
    .add('s_tp_hierarchical_category_style_9', {supportedActions: ['limit', 'brand', 'label', 'count', 'style', 'background']})
    .add('s_tp_hierarchical_category_style_10', {supportedActions: ['limit', 'brand', 'label', 'count', 'style', 'background']})
    .add('s_tp_hierarchical_category_style_11', {supportedActions: ['limit', 'brand', 'label', 'count', 'style', 'background']});