(function($) {
  $.fn.changeElementType = function(newType) {


      this.replaceWith(function() {
        var attrs = {};
        $.each(this.attributes, function(idx, attr) {
            attrs[attr.nodeName] = attr.nodeValue;
        });
          return $("<" + newType + "/>", attrs).append($(this).contents());
      });
  };
})(jQuery);

window.disableLinks = function(){
  $("a").changeElementType("nota");
}
window.enableLinks = function(){
  $("nota").changeElementType("a");
}