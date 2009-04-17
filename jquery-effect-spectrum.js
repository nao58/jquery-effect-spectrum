/*
 * jQuery Spectrum 1.0.0
 *
 * Copyright (c) 2009 MORI Naohiko
 * Dual licensed under the MIT and GPL licenses.
 *
 * Depends:
 *   effects.core.js
 */
(function($){
	$.effects.spectrum = function(o){
		var opt = $.extend({
			dest: null,
			destPos: null,
			spClass: null,
			spCss: {
				border: '1px solid #333'
			},
			spDelay: 300,
			autoScroll: true
		}, (o.options||{}));
		if(!opt.dest && !opt.destPos) return;
		return this.queue(function(){
			var e = $(this);
			var pos = e.offset();
			pos.height = e.innerHeight();
			pos.width  = e.innerWidth();
			var destPos = opt.destPos;
			if(opt.dest){
				var dest = $(opt.dest);
				var destPos = dest.offset();
				destPos.height = dest.innerHeight();
				destPos.width  = dest.innerWidth();
			}
			var rt = $('<div></div>').css('position', 'absolute');
			if(opt.spClass){rt.addClass(opt.spClass)}
			if(opt.spCss){rt.css(opt.spCss)}
			var diff = {
				left: (destPos.left - pos.left),
				top:  (destPos.top  - pos.top),
				width:  (destPos.width  - pos.width),
				height: (destPos.height - pos.height)
			};
			$('<div></div>').css('width', 0).animate({width: 1}, {
				duration: o.duration,
				easing: opt.easing,
				step: function(now){
					var spPos = {
						left: pos.left + (diff.left * now),
						top:  pos.top + (diff.top * now),
						width: pos.width + (diff.width * now),
						height: pos.height + (diff.height * now)
					};
					rt.clone().appendTo(document.body).css(spPos)
						.fadeOut(opt.spDelay, function(){
							$(this).remove();
						});
					if(opt.autoScroll){
						var w = $(window);
						var wh = w.height();
						var ww = w.width();
						var wt = w.scrollTop();
						var wl = w.scrollLeft();
						var sph = (spPos.height > wh ? wh : spPos.height);
						var spw = (spPos.width  > ww ? ww : spPos.width);
						if(spPos.top+sph > wt+wh){
							w.scrollTop(spPos.top+sph-wh);
						}
						if(spPos.top < wt){
							w.scrollTop(spPos.top);
						}
						if(spPos.left+spw > wl+ww){
							w.scrollLeft(spPos.left+spw-ww);
						}
						if(spPos.left < wl){
							w.scrollLeft(spPos.left);
						}
					}
				},
				complete: function(){
					$(this).remove();
					(o.callback && o.callback.apply(e[0], arguments));
					e.dequeue();
				}
			});
		});
	}
})(jQuery);

