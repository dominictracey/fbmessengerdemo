ACC.cart={_autoload:["bindHelp","cartRestoration","bindCartPage","bindMultiDEntryRemoval","bindMultidCartProduct","bindAutoShip",["bindApplyVoucher",0!=$("#js-voucher-apply-btn").length],["bindToReleaseVoucher",0!=$("#js-applied-vouchers").length]],bindHelp:function(){$(document).on("click",".js-cart-help",function(t){t.preventDefault();var e=$(this).data("help");ACC.colorbox.open(e,{html:$(".js-help-popup-content").html(),width:"300px"})})},cartRestoration:function(){$(".cartRestoration").click(function(){var t=$(this).data("cartUrl");window.location=t})},bindCartPage:function(){$(document).on("click",".js-show-editable-grid",function(t){ACC.cart.populateAndShowEditableGrid(this,t)})},bindAutoShip:function(){$(".page-cartPage .autoship-options .js_cart_autoship").on("click",function(t){var e=$(this).prev(),a=e.attr("value"),r=e.attr("name").split("_")[1];ACC.cart.setAutoShip(r,a)})},setAutoShip:function(t,e){var a=$("#atuoShipUpdateUrl").val()+t+"&autoShipFlag="+e;return $.ajax({url:a,data:"",type:"POST",success:function(t){t.success?ACC.cart.refreshCartPageWithJSONResponse(t.cart):location.reload()},error:function(t){console.log("There was an error while trying to set your autoship option."),location.reload()}}),!1},bindMultiDEntryRemoval:function(){$(document).on("click",".js-submit-remove-product-multi-d",function(){var t=$(this).data("index"),e=$("#updateCartForm"+t),a=e.find("input[name=initialQuantity]"),r=e.find("input[name=quantity]"),i=(e.find("input[name=entryNumber]").val(),e.find("input[name=productCode]").val()),o=$(this).closest(".item__list--item");r.val(0),a.val(0),ACC.track.trackRemoveFromCart(i,a,r.val());var n=e.attr("method")?e.attr("method").toUpperCase():"GET";return $.ajax({url:e.attr("action"),data:e.serialize(),type:n,success:function(t){location.reload(),o.fadeOut(300,function(){o.detach(),t.entries&&(numItems=t.entries.length,$(".cart-headline span").text(" ("+numItems+" item"+(1<numItems?"s":"")+")")),t.entries&&0!=t.entries.length&&1!=t.entries.length||location.reload()}),ACC.cart.refreshCartPageWithJSONResponse(t)},error:function(){location.reload()}}),!1})},populateAndShowEditableGrid:function(i,t){var e=$(i).data("readOnlyMultidGrid"),a=$(i).data("index");grid=$("#ajaxGrid"+a);var r=$("#grid"+a),o=r.data("sub-entries").split(","),n=o[0].split(":")[0];$(i).toggleClass("open");for(var l=r.data("target-url"),d=new Object,c=0;c<o.length;c++){var u=o[c].split(":");d[u[0]]=u[1]}if(0<grid.children("#cartOrderGridForm").length)grid.slideToggle("slow");else{$.ajax({url:l,data:{productCode:n,readOnly:e},type:"GET",success:function(t){grid.html(t),$("#ajaxGrid").removeAttr("id");for(var e=grid.find(".product-grid-container"),a=e.length,r=0;r<a;r++)ACC.cart.getProductQuantity(e.eq(r),d,r);grid.slideDown("slow"),ACC.cart.coreCartGridTableActions(i,d),ACC.productorderform.coreTableScrollActions(grid.children("#cartOrderGridForm"))},error:function(t,e,a){alert("Failed to get variant matrix. Error details ["+t+", "+e+", "+a+"]")}})}},coreCartGridTableActions:function(t,h){ACC.productorderform.bindUpdateFutureStockButton(".update_future_stock_button"),ACC.productorderform.bindVariantSelect($(".variant-select-btn"),"cartOrderGridForm");var f=$(t).data("index"),e=".sku-quantity",v=0,C=$("#ajaxGrid"+f+" .product-grid-container");C.on("focusin",e,function(t){v=jQuery.trim(this.value),$(this).parents("tr").next(".variant-summary").remove(),$(this).parents("table").data(ACC.productorderform.selectedVariantData)?ACC.productorderform.selectedVariants=$(this).parents("table").data(ACC.productorderform.selectedVariantData):ACC.productorderform.selectedVariants=[],""==v&&(v=0,this.value=0)}),C.on("focusout keypress",e,function(t){var e=t.keyCode||t.which||t.charCode;if(13==e||null==e){var r=0,a="",i=parseInt($(this).attr("id").match("[0-9]+"));this.value=ACC.productorderform.filterSkuEntry(this.value),r=jQuery.trim(this.value);var o=$("input[id='cartEntries["+i+"].sku']").val();isNaN(jQuery.trim(this.value))&&(this.value=0),""==r&&(r=0,this.value=0);var n=C.find("[data-grid-total-id=total_value_"+i+"]"),l=$("input[id='productPrice["+i+"]']").val();0<r&&(a=ACC.productorderform.formatTotalsCurrency(parseFloat(l)*parseInt(r))),n.html(a);var d=this,c=$(this).siblings(".price"),u=$(this).siblings(".variant-prop"),s=$(this).next(".td_stock").data("sku-id"),p=$(this).siblings(".data-grid-total");if(this.value!=v){var m=!0;ACC.productorderform.selectedVariants.forEach(function(t,e){t.id===s&&(m=!1,"0"===d.value||0===d.value?ACC.productorderform.selectedVariants.splice(e,1):(ACC.productorderform.selectedVariants[e].quantity=d.value,ACC.productorderform.selectedVariants[e].total=ACC.productorderform.updateVariantTotal(c,d.value,p)))}),m&&0<this.value&&ACC.productorderform.selectedVariants.push({id:s,size:u.data("variant-prop"),quantity:d.value,total:ACC.productorderform.updateVariantTotal(c,d.value,p)})}if(ACC.productorderform.showSelectedVariant($(this).parents("table")),0<this.value&&this.value!=v?$(this).parents("table").addClass("selected"):0===ACC.productorderform.selectedVariants.length&&$(this).parents("table").removeClass("selected").find(".variant-summary").remove(),v!=r){$.ajax({url:ACC.config.encodedContextPath+"/cart/updateMultiD",data:{productCode:o,quantity:r,entryNumber:-1},type:"POST",success:function(t,e,a){ACC.cart.refreshCartData(t,-1,r,f),h[o]=r},error:function(t,e,a){var r=t.getResponseHeader("redirectUrl"),i=t.getResponseHeader("Connection");null!==r?window.location=r:"close"===i&&window.location.reload()}})}}})},refreshCartData:function(t,e,a,r){if(0==t.entries.length)location.reload();else{var i;if(-1==e){for(var o=(i=$(".js-qty-form"+r)).find("input[name=productCode]").val(),n=(a=0,0),l=0;l<t.entries.length;l++){var d=t.entries[l];if(d.product.code==o){a=d.quantity,n=d.totalPrice;break}}0==a?location.reload():(i.find(".qtyValue").html(a),i.parent().parent().find(".js-item-total").html(n.formattedValue))}ACC.cart.refreshCartPageWithJSONResponse(t)}},refreshCartPageWithJSONResponse:function(r){"string"==typeof r&&location.reload(),ACC.minicart.updateMiniCartDisplay();var i=0;$(".js-cart-top-totals").html($("#cartTopTotalSectionTemplate").tmpl(r)),$("div .cartpotproline").remove(),$("div .cartproline").remove(),$(".js-cart-totals").remove(),$(".pnl-promo-totals .order-summary-panel .cart-totals").remove(),$("#ajaxCartPotentialPromotionSection").html($("#cartPotentialPromotionSectionTemplate").tmpl(r)),$("#ajaxCartPromotionSection").html($("#cartPromotionSectionTemplate").tmpl(r)),$("ul.item__list.item__list__cart li.item__list--item").each(function(t,e){if("object"==typeof r.entries[t]){var a=r.entries[t];$(e).find(".js-item-total").text(a.totalPrice.formattedValue),$("#updateCartForm"+t).find('input[name="initialQuantity"]').val(a.quantity),i+=a.pharmacyFee?a.pharmacyFee:0,$(e).find(".js-update-entry-quantity-input").each(function(t,e){($(e).val()+"").match(/^\d+$/)?$(e).val()+""=="0"||$(e).val():ACC.cart.throwInvalidQtyEntry()}),$(e).find(".js-update-entry-quantity-input").val(a.quantity)}else location.reload()}),r.totalPharmacyFee={value:i,formattedValue:"$"+i.toFixed(2)},$("#ajaxCart").html($("#cartTotalsTemplate").tmpl(r)),ACC.quote.bindQuoteDiscount()},throwInvalidQtyEntry:function(){$(".global-alerts").remove(),$(".offcanvas-wrap > div:first-child").prepend('<div class="global-alerts"><div class="alert alert-danger alert-dismissable"><div class="container-fluid-max"><button class="close" aria-hidden="true" data-dismiss="alert" type="button">×</button>Please provide a positive number to update the quantity of an item.</div></div></div>')},getProductQuantity:function(c,u,t){var e=c.find("table");$.each(e,function(t,e){var a=jQuery.map($(e).find("input[type='hidden'].sku"),function(t){return t.value}),l=jQuery.map($(e).find("input[type='textbox'].sku-quantity"),function(t){return t}),d=[];$.each(a,function(t,e){var a=u[e];if(null!=a){l[t].value=a;var r=parseInt(l[t].id.match("[0-9]+")),i=c.find("[data-grid-total-id=total_value_"+r+"]"),o="",n=$("input[id='productPrice["+r+"]']").val();0<a&&(o=ACC.productorderform.formatTotalsCurrency(parseFloat(n)*parseInt(a))),i.html(o),d.push({id:e,size:$(l[t]).siblings(".variant-prop").data("variant-prop"),quantity:a,total:o})}}),0!=d.length&&($.tmpl(ACC.productorderform.$variantSummaryTemplate,{variants:d}).appendTo($(e).addClass("selected")),$(e).find(".variant-summary .variant-property").html($(e).find(".variant-detail").data("variant-property")),$(e).data(ACC.productorderform.selectedVariantData,d))})},bindMultidCartProduct:function(){$(document).on("click",".showQuantityProduct",function(t){ACC.multidgrid.populateAndShowGrid(this,t,!0)}),$(document).on("click",".showQuantityProductOverlay",function(t){ACC.multidgrid.populateAndShowGridOverlay(this,t)})},bindApplyVoucher:function(){$("#js-voucher-apply-btn").on("click",function(t){ACC.cart.handleApplyVoucher(t)}),$("#js-voucher-code-text").on("keypress",function(t){13==(t.keyCode?t.keyCode:t.which)&&ACC.cart.handleApplyVoucher(t)})},handleApplyVoucher:function(t){var e=$.trim($("#js-voucher-code-text").val());""!=e&&0<e.length&&$("#applyVoucherForm").submit()},bindToReleaseVoucher:function(){$(".js-release-voucher-remove-btn").on("click",function(t){$(this).closest("form").submit()})}};