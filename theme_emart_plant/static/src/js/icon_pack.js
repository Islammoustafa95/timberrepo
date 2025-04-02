/** @odoo-module */
	
import { WysiwygAdapterComponent } from '@website/components/wysiwyg_adapter/wysiwyg_adapter';
import { patch } from "@web/core/utils/patch";
import { closestElement } from "@web_editor/js/editor/odoo-editor/src/OdooEditor";
	const newmediaSelector = '.lnr, .icon, .icofont, .lni, .ri, .ti';

		patch(WysiwygAdapterComponent.prototype, {
		startEdition: async function () {
			await this._super(...arguments);
			var self = this;
			this.$editable.on('dblclick', newmediaSelector, function () {
				if (this.isContentEditable || (this.parentElement && this.parentElement.isContentEditable)) {
					self.showTooltip = false;
					const selection = self.odooEditor.document.getSelection();
					const anchorNode = selection.anchorNode;
					if (anchorNode && closestElement(anchorNode, '.oe-blackbox')) {
						return;
					}
					const $el = $(this);
					let params = {node: this};
					$el.selectElement();
					if (!$el.parent().hasClass('o_stars')) {
						self.openMediaDialog(params);
					}
				}
			});
		},
	});
// });