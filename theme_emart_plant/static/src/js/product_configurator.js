/** @odoo-module **/
import {  ProductConfiguratorDialog } from '@sale/js/product_configurator_dialog/product_configurator_dialog';
import { patch } from '@web/core/utils/patch';
import { rpc } from "@web/core/network/rpc";
patch(ProductConfiguratorDialog.prototype, {

    async onConfirm(options) {
        if (!this.isPossibleConfiguration()) return;

        // Create the products with dynamic attributes

        for (const product of this.state.products) {
            if ( !product.id && product.attribute_lines.some(ptal => ptal.create_variant === "dynamic")) {
                const productId = await this._createProduct(product);
                product.id = parseInt(productId);
            }

        }
        await this.props.save(
            this.state.products.find( p => p.product_tmpl_id === this.env.mainProductTmplId ),
            this.state.products.filter( p => p.product_tmpl_id !== this.env.mainProductTmplId ),
            options,

        );
        this.props.close();

        setTimeout(() => {
            rpc('/update/menucart').then((data) => {
                $(".bizemart_shop .shop-collection-cart-main").first().before(data).end().remove();
                $(".bottom-bar-cart .shop-collection-cart-main").first().before(data).end().remove();
            });
        }, 1000);

    }

});