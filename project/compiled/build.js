"use strict";!function(e){e.fn.changeElementType=function(n){var t={};e.each(this[0].attributes,(function(e,n){t[n.nodeName]=n.nodeValue})),this.replaceWith((function(){return e("<"+n+"/>",t).append(e(this).contents())}))}}(jQuery);