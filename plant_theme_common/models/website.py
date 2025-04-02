# -*- coding: utf-8 -*-
# Part of Odoo Module Developed by Bizople Solutions Pvt. Ltd.
# See LICENSE file for full copyright and licensing details.

from odoo import api, fields, models, tools
from datetime import date, datetime, time, timedelta
from odoo.http import request
import logging
_logger = logging.getLogger(__name__)
from odoo.modules.module import get_resource_path
from odoo.tools.translate import html_translate 
import pytz
from pytz import timezone
import base64

class PWAshortcuts(models.Model):
    _name = 'pwa.shortcuts'
    _description = "PWA Shortcuts"

    name = fields.Char("Name", required=True)
    short_name = fields.Char("Short Name", required=True)
    url = fields.Char("URL", required=True, default='/')
    description = fields.Char("Description", required=True)
    image_192_shortcut = fields.Binary('Image 192px', readonly=False)
    
class ResConfigSettings(models.TransientModel):
    _inherit = "res.config.settings"

    is_infinite_load = fields.Boolean(string='Infinite Load', related='website_id.is_infinite_load', readonly=False)
    infinite_load_image = fields.Binary(string='Infinite Load Image', related='website_id.infinite_load_image', readonly=False)
    login_page_banner_image = fields.Binary(string='Login Banner Image', related='website_id.login_page_banner_image', readonly=False)
    transparent_header_logo = fields.Binary(string='Transparent Header Logo', related='website_id.transparent_header_logo', readonly=False)
    prevent_guest_checkout = fields.Boolean(string='Prevent Guest/Visitor Checkout', related='website_id.prevent_guest_checkout', readonly=False)
    enable_pwa = fields.Boolean(string='Enable PWA', related='website_id.enable_pwa', readonly=False,)
    app_name_pwa = fields.Char('App Name', related='website_id.app_name_pwa', readonly=False)
    short_name_pwa = fields.Char('Short Name', related='website_id.short_name_pwa', readonly=False)
    description_pwa = fields.Char('App Description', related='website_id.description_pwa', readonly=False)
    image_192_pwa = fields.Binary('Image 192px', related='website_id.image_192_pwa', readonly=False)
    image_512_pwa = fields.Binary('Image 512px', related='website_id.image_512_pwa', readonly=False)
    start_url_pwa = fields.Char('App Start Url', related='website_id.start_url_pwa', readonly=False)
    background_color_pwa = fields.Char('Background Color', related='website_id.background_color_pwa', readonly=False)
    theme_color_pwa = fields.Char('Theme Color', related='website_id.theme_color_pwa', readonly=False)
    pwa_shortcuts_ids = fields.Many2many(related='website_id.pwa_shortcuts_ids', readonly=False)

    is_lazy_load = fields.Boolean(string='Lazy Load', related='website_id.is_lazy_load', readonly=False)
    lazy_load_image = fields.Binary(string='Lazy Load Image', related='website_id.lazy_load_image', readonly=False)
    
    cart_alert_message = fields.Char(string='Cart Alert Message', related='website_id.cart_alert_message', readonly=False, translate=True)

    @api.model
    def _tz_get(self):
        _tzs = [(tz, tz) for tz in sorted(pytz.all_timezones, key=lambda tz: tz if not tz.startswith('Etc/') else '_')]
        return _tzs
    
    timings = fields.Boolean(string="Store Timings", related='website_id.timings', readonly=False)
    
    tz = fields.Selection(_tz_get, string='Timezone', default=lambda self: self._context.get('tz'), readonly=False, config_parameter="plant_theme_common.tz",
                          help="When printing documents and exporting/importing data, time values are computed according to this timezone.\n"
                               "If the timezone is not set, UTC (Coordinated Universal Time) is used.\n"
                               "Anywhere else, time values are computed according to the time offset of your web client.")

    # store_close_message = fields.Html(string="Store Closed", strip_style=True, related='website_id.store_close_message', translate=html_translate, readonly=False)
    # store_close_bg_img = fields.Binary(string="Background Image of Popup", related='website_id.store_close_bg_img', readonly=False)
    
    opening_time = fields.Float(string="Store Opning Time", readonly=False, config_parameter="plant_theme_common.opening_time")
    closing_time = fields.Float(string="Store Closing Time", readonly=False, config_parameter="plant_theme_common.closing_time")

    def get_values(self):
        res = super(ResConfigSettings, self).get_values()
        allow = self.env['ir.config_parameter'].sudo()
        res['timings'] = allow.get_param(
            'plant_theme_common.timings', self.timings)
        return res

    def set_values(self):
        res = super(ResConfigSettings, self).set_values()
        allow = self.env['ir.config_parameter'].sudo()
        allow.set_param(
            'plant_theme_common.timings', self.timings)
        return res

class Website(models.Model):
    _inherit = "website"
    
    @api.model
    def get_categories(self):
        domain = [('parent_id', '=', False)]
        category_ids = self.env['product.public.category'].search(domain)
        res = {
            'categories': category_ids,
        }
        return res

    @api.model
    def get_categories_in_header(self, categ_id):
        child_categ = self.env['product.public.category'].search(
            [('parent_id', '=', categ_id),('category_in_header','=',True)])

        return child_categ
    
    @api.model
    def get_product_category_data_menu(self):
        category_ids = self.env['product.public.category'].sudo().search([('quick_categ', '=', True)])
        return category_ids
    
    @api.model
    def get_auto_assign_category(self):
        auto_assign_categ_ids = self.env['product.public.category'].search([('auto_assign','=',True)])

        return auto_assign_categ_ids
    
    @api.model
    

    def get_brand_data(self):
        brand_ids = self.env['product.brand'].sudo().search(
            [('visible_snippet', '=', True)])
        return brand_ids

    def get_product_brands(self, category, **post):
       
        domain = []
        if category:
            cat_id = []
            if category != None:
                for ids in category:
                    cat_id.append(ids.id)
                domain += ['|', ('public_categ_ids.id', 'in', cat_id),
                           ('public_categ_ids.parent_id', 'in', cat_id)]
        else:
            domain = []
        product_ids = self.env["product.template"].sudo().search(domain)
        domain_brand = [
            ('product_ids', 'in', product_ids.ids or []), ('product_ids', '!=', False)]
        brands = self.env['product.brand'].sudo().search(domain_brand)
        return brands
    
    def get_product_count_bizemart(self):
        prod_per_page = self.env['product.per.page.bizople'].search([])
        prod_per_page_no = self.env['product.per.page.count.bizople'].search([])
        values = {
            'name': prod_per_page.name,
            'page_no': prod_per_page_no,
        }
        return values

    def get_current_pager_selection(self):
        page_no = request.env['product.per.page.count.bizople'].sudo().search(
            [('default_active_count', '=', True)])
        if request.session.get('default_paging_no'):
            return int(request.session.get('default_paging_no'))
        elif page_no:
            return int(page_no.name)

    def _default_pwa_icon(self):
        pwa_image_path = get_resource_path('plant_theme_common', 'static/src/img', 'pwa_logo.png')
        with tools.file_open(pwa_image_path, 'rb') as f:
            return base64.b64encode(f.read())

    timings = fields.Boolean(string="Store Timings")
    store_close_message = fields.Html(string="Store Closed", strip_style=True, translate=html_translate)
    store_close_bg_img = fields.Binary(string="Background Image of Popup")

    @api.model
    def store_timing(self):
        
        res_config_record = self.env['res.config.settings'].sudo().search([], order="id desc", limit=1)
        store = False
        if res_config_record.timings==True:
            opening_time_field = res_config_record.opening_time
            timedelta(0, 35600)
            str(timedelta(hours=opening_time_field))
            opening_time_str =str(timedelta(hours=opening_time_field)).rsplit(':', 1)[0]
            opening_date_time = datetime.strptime(opening_time_str, '%H:%M')
            opening_time = opening_date_time.time().strftime('%H:%M')
            closing_time_field = res_config_record.closing_time
            timedelta(0, 35600)
            str(timedelta(hours=closing_time_field))
            closing_time_str =str(timedelta(hours=closing_time_field)).rsplit(':', 1)[0]
            closing_date_time = datetime.strptime(closing_time_str, '%H:%M')
            closing_time = closing_date_time.time().strftime('%H:%M')
            
            now_time = datetime.now(timezone('UTC'))
            tz = res_config_record.tz
            now_asia = now_time.astimezone(timezone(tz))
            local_time = now_asia.strftime('%H:%M')
            if ((local_time > opening_time) and (local_time < closing_time)):
                store = True
                return {'store':store}
            else:
                return {'opening_time':opening_time, 'closing_time':closing_time, 'store':store}
        else:
            return store
        
    is_infinite_load = fields.Boolean(string='Infinite Load', default=True,readonly=False)
    infinite_load_image = fields.Binary('Infinite Load Image', readonly=False)
    login_page_banner_image = fields.Binary('Login Page Banner Image', readonly=False)
    transparent_header_logo = fields.Binary('Transparent Header Logo', readonly=False)
    enable_pwa = fields.Boolean(string='Enable PWA', readonly=False)
    prevent_guest_checkout = fields.Boolean('Prevent Guest/Visitor Checkout',readonly=False)
    app_name_pwa = fields.Char('App Name', readonly=False, default='PWA Name')
    short_name_pwa = fields.Char('Short Name', readonly=False, default='Short Name')
    description_pwa = fields.Char('App Description', readonly=False, default='PWA Desciprtion')
    image_192_pwa = fields.Binary('Image 192px', readonly=False)
    image_512_pwa = fields.Binary('Image 512px', readonly=False, store=True)
    start_url_pwa = fields.Char('App Start Url', readonly=False, default='/')
    pwa_shortcuts_ids = fields.Many2many('pwa.shortcuts', string='PWA Shortcuts')
    background_color_pwa = fields.Char('Background Color', readonly=False, default='#419183')
    theme_color_pwa = fields.Char('Theme Color', readonly=False, default='#419183')

    is_lazy_load = fields.Boolean(string='Lazy Load', default=False, readonly=False)
    lazy_load_image = fields.Binary('Lazy Load Image', readonly=False)
    
    cart_alert_message = fields.Char(string='Cart Alert Message', default="Your Product has been added to Cart Successfully!!", readonly=False, translate=True)




   