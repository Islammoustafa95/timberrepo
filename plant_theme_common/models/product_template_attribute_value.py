# -*- coding: utf-8 -*-
# Part of Odoo Module Developed by Bizople Solutions Pvt. Ltd.
# See LICENSE file for full copyright and licensing details.

from odoo import models, fields

class ProductTemplateAttributeValue(models.Model):

    _inherit = "product.template.attribute.value"

    color_attrib_img = fields.Image("Variant Color Image", max_width=1024, max_height=1024, store=True)