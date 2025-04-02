# -*- coding: utf-8 -*-
# Part of Odoo Module Developed by Bizople Solutions Pvt. Ltd.
# See LICENSE file for full copyright and licensing details.
{
    # Theme information
    'name': 'Plant Theme Common',
    'category': 'Website',
    'version': '18.0.0.1',
    'author': 'Bizople Solutions Pvt. Ltd.',
    'sequence': 1,
    'website': 'https://www.bizople.com',
    'summary': 'Plant Theme Common',
    'description': """Plant Theme Common""",
    'depends': [
        'website',
        'website_blog',
        'portal',
        'theme_default',
        'web_editor',
        'website_sale',
        'website_sale_wishlist',
        'website_sale_comparison',
    ],

    'data': [
            'security/ir.model.access.csv',
            # 'data/data.xml',
            'views/manifest.xml',
            'views/pwa_offline.xml',
            'views/brand_template.xml',
            'views/category_template.xml',
            'views/megamenus/megamenu_one_snippet.xml',
            'views/megamenus/megamenu_four_snippet.xml',
            'report/sale_order_store_field.xml',
    ],

    'images': [
        'static/description/banner.jpg'
    ],


    'installable': True,
    'auto_install': False,
    'application': False,
    'license': 'OPL-1',
    'price': 25,
    'currency': 'EUR',
}
