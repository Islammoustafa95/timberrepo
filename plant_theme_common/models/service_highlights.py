# -*- coding: utf-8 -*-
# Part of Odoo Module Developed by Bizople Solutions Pvt. Ltd.
# See LICENSE file for full copyright and licensing details.

from odoo import models, fields


class ProductServices(models.Model):
    _name = "nutritional.facts"
    _description = "Nutritional Facts"


    name = fields.Char("Name", required=True)
    description = fields.Html("Description")
    visible_desc = fields.Boolean("Visible description in popup", default=True)
    

class ProductHighlights(models.Model):
    _name = "product.highlights"
    _description = "Product Highlights"


    name = fields.Char("Highlight Text")
