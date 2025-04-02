# -*- coding: utf-8 -*-
# Part of Odoo Module Developed by Bizople Solutions Pvt. Ltd.
# See LICENSE file for full copyright and licensing details.

from odoo import models, fields, api
from odoo import models, fields

class ProductTemplate(models.Model):
    _inherit = 'product.template'

    biz_total_sale_count = fields.Integer('Total Sale Count')
    tab_ids = fields.Many2many('product.tab','product_tab_table','tab_ids','product_ids',string="Tab")
    product_label_id = fields.Many2one('product.label.bizople',string="Product Label")
    nutrition_id = fields.Many2one('nutritional.facts',string="Nutritional Factssssssssssss")
    highlights_ids = fields.Many2many("product.highlights",string="Website Highlights")
    hover_image = fields.Image(string="Product Hover Image")

    def write(self, vals):
        for obj in self:
            vals['biz_total_sale_count'] = int(obj.sales_count)
            res = super(ProductTemplate, self).write(vals)
        return res
    
    @api.model
    def _search_get_detail(self, website, order, options):
        res = super(ProductTemplate, self)._search_get_detail(website=website, order=order, options=options)
        brand = options.get('brand_id')
        old_domain = res['base_domain']
        if brand:
            old_domain.append([('brand_id', 'in', brand)])
        return res

    
class ProductTab(models.Model):
    _name = 'product.tab'
    _description = 'Product Tab'
    _rec_name = 'name'

    name = fields.Char(string="Name")
    sequence = fields.Integer(string="Sequence", default=1)
    content = fields.Html(string="Content")
    product_ids = fields.Many2many('product.template','product_tab_table','product_ids','tab_ids', string="product")

class ProductLabelBizople (models.Model):
     _name = 'product.label.bizople'
     _description = 'Product Label'
     
     _SELECTION_STYLE = [
        ('rounded', 'Rounded'),
        ('outlinesquare', 'Outline Square'),
        ('outlineround', 'Outline Rounded'),
        ('flat', 'Flat'),
    ]
     
     name = fields.Char(string="Name", translate=True, required=True)
     label_bg_color = fields.Char(string="Label Background Color", required=True,default="#f6513b")
     label_font_color = fields.Char(string="Label Font Color", required=True, default="#ffffff")
     label_style = fields.Selection(
        string='Label Style', selection=_SELECTION_STYLE, default='rounded')