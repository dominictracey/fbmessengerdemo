ACC.cartitem={_autoload:["bindCartItem"],submitTriggered:!1,bindCartItem:function(){$(".js-remove-entry-button").on("click",function(){var t=$(this).attr("id").split("_"),a=$("#updateCartForm"+t[1]),e=a.find("input[name=productCode]").val(),n=a.find("input[name=initialQuantity]"),i=a.find("input[name=quantity]");ACC.track.trackRemoveFromCart(e,n.val()),i.val(0),n.val(0),a.submit()}),$(".js-update-entry-quantity-input").on("blur",function(t){ACC.cartitem.handleUpdateQuantity(this,t)}).on("keyup",function(t){return ACC.cartitem.handleKeyEvent(this,t)}).on("keydown",function(t){return ACC.cartitem.handleKeyEvent(this,t)})},handleKeyEvent:function(t,a){return 13!=a.which||ACC.cartitem.submitTriggered?(ACC.cartitem.submitTriggered,!0):(ACC.cartitem.handleUpdateQuantity(t,a),!1)},handleUpdateQuantity:function(t,a){var e=$(t).closest("form"),n=e.find("input[name=productCode]").val(),i=e.find("input[name=initialQuantity]").val(),r=e.find("input[name=quantity]").val();if(i!=r){ACC.track.trackUpdateCart(n,i,r);var u=e.attr("method")?e.attr("method").toUpperCase():"GET";return $.ajax({url:e.attr("action"),data:e.serialize(),type:u,success:function(t){ACC.cartitem.submitTriggered=!1,ACC.cart.refreshCartPageWithJSONResponse(t)},error:function(){console.log("Failed to alter quantity."),location.reload()}}),!0}return!1}};