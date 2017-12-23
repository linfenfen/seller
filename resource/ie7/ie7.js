/* To avoid CSS expressions while still supporting IE 7 and IE 6, use this script */
/* The script tag referencing this file must be placed before the ending body tag. */

/* Use conditional comments in order to target IE 7 and older:
	<!--[if lt IE 8]><!-->
	<script src="ie7/ie7.js"></script>
	<!--<![endif]-->
*/

(function() {
	function addIcon(el, entity) {
		var html = el.innerHTML;
		el.innerHTML = '<span style="font-family: \'sell-icon\'">' + entity + '</span>' + html;
	}
	var icons = {
		'icon-add_circle': '&#xe900;',
		'icon-arrow_lift': '&#xe901;',
		'icon-check_circle': '&#xe902;',
		'icon-close': '&#xe903;',
		'icon-favorite': '&#xe904;',
		'icon-keyboard_arrow_right': '&#xe905;',
		'icon-remove_circle_outline': '&#xe906;',
		'icon-shopping_cart': '&#xe907;',
		'icon-thumb_down': '&#xe908;',
		'icon-thumb_up': '&#xe909;',
		'0': 0
		},
		els = document.getElementsByTagName('*'),
		i, c, el;
	for (i = 0; ; i += 1) {
		el = els[i];
		if(!el) {
			break;
		}
		c = el.className;
		c = c.match(/icon-[^\s'"]+/);
		if (c && icons[c[0]]) {
			addIcon(el, icons[c[0]]);
		}
	}
}());
