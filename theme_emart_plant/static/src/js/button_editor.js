/** @odoo-module */
		
import { LinkDialog } from "@web_editor/js/wysiwyg/widgets/link_dialog";
import { patch } from "@web/core/utils/patch";
import { LinkTools } from '@web_editor/js/wysiwyg/widgets/link_tools';
import { Link } from "@web_editor/js/wysiwyg/widgets/link";
import { _t } from "@web/core/l10n/translation";

	const bizemartsLinkDialog = patch(LinkDialog.prototype, {
		_getLinkOptions: function () {
			const options = [
				'input[name="link_style_color"]',
				'select[name="link_style_size"] > option',
				'select[name="link_style_shape"] > option',
				'select[name="link_hover_style"] > option',
			];
			return this.$el.find(options.join(','));
		},

		_getLinkStyle: function () {
			return this.$el.find('select[name="link_hover_style"]').val() || '';
		},
	});

	const bizemartsLinkTools = patch(LinkTools.prototype, {
		xmlDependencies: (LinkTools.prototype.xmlDependencies || [])
		.concat([
			'/theme_emart_plant/static/src/xml/button_editor.xml',
		]),
		_getLinkOptions: function () {
			const options = [
				'we-selection-items[name="link_style_color"] > we-button',
				'we-selection-items[name="link_style_size"] > we-button',
				'we-selection-items[name="link_style_shape"] > we-button',
				'we-selection-items[name="link_hover_style"] > we-button',
			];
			return this.$el.find(options.join(','));
		},

		_getLinkStyle: function () {
			return this.$el.find('we-selection-items[name="link_hover_style"] we-button.active').data('value') || '';
		},
	});

	const bizemartsLink = patch(Link.prototype, {
		_getData: function () {
			var $url = this.$el.find('input[name="url"]');
			var url = $url.val();
			var content = this.$el.find('input[name="label"]').val() || url;

			if (!this.isButton && $url.prop('required') && (!url || !$url[0].checkValidity())) {
				return null;
			}

			const type = this._getLinkType();
			const customTextColor = this._getLinkCustomTextColor();
			const customFill = this._getLinkCustomFill();
			const customBorder = this._getLinkCustomBorder();
			const customBorderWidth = this._getLinkCustomBorderWidth();
			const customBorderStyle = this._getLinkCustomBorderStyle();
			const size = this._getLinkSize();
			const shape = this._getLinkShape();
			const hoverstyle = this._getLinkStyle();
			const shapes = shape ? shape.split(',') : [];
			const style = ['outline', 'fill'].includes(shapes[0]) ? `${shapes[0]}-` : '';
			const shapeClasses = shapes.slice(style ? 1 : 0).join(' ');
			const classes = (this.state.className || '') +
				(type ? (` btn btn-${style}${type}`) : '') +
				(type && shapeClasses ? (` ${shapeClasses}`) : '') +
				(type && size ? (' btn-' + size) : '') + 
				(type && hoverstyle ? (' btn-' + hoverstyle) : '');
			var isNewWindow = this._isNewWindow(url);
			var doStripDomain = this._doStripDomain();
			if (url.indexOf('@') >= 0 && url.indexOf('mailto:') < 0 && !url.match(/^http[s]?/i)) {
				url = ('mailto:' + url);
			} else if (url.indexOf(location.origin) === 0 && doStripDomain) {
				url = url.slice(location.origin.length);
			}
			var allWhitespace = /\s+/gi;
			var allStartAndEndSpace = /^\s+|\s+$/gi;
			return {
				content: content,
				url: this._correctLink(url),
				classes: classes.replace(allWhitespace, ' ').replace(allStartAndEndSpace, ''),
				customTextColor: customTextColor,
				customFill: customFill,
				customBorder: customBorder,
				customBorderWidth: customBorderWidth,
				customBorderStyle: customBorderStyle,
				oldAttributes: this.state.oldAttributes,
				isNewWindow: isNewWindow,
				doStripDomain: doStripDomain,
			};
		},

			_getLinkStyle: function () {},
	});


// });