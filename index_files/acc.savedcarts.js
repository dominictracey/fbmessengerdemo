ACC.savedcarts={_autoload:[["bindRestoreSavedCartClick",0!=$(".js-restore-saved-cart").length],["bindDeleteSavedCartLink",0!=$(".js-delete-saved-cart").length],["bindDeleteConfirmLink",0!=$(".js-savedcart_delete_confirm").length],["bindSaveCartForm",0!=$(".js-save-cart-link").length||0!=$(".js-update-saved-cart").length],["bindUpdateUploadingSavedCarts",0!=$(".js-uploading-saved-carts-update").length]],$savedCartRestoreBtn:{},$currentCartName:{},bindRestoreSavedCartClick:function(){$(".js-restore-saved-cart").click(function(e){e.preventDefault();var t=$(this).data("restore-popup-title"),a=$(this).data("savedcart-id"),r=ACC.config.encodedContextPath+"/my-account/saved-carts/"+a+"/restore";$.get(r).done(function(e){ACC.colorbox.open(t,{html:e,width:500,onComplete:function(){ACC.common.refreshScreenReaderBuffer(),ACC.savedcarts.bindRestoreModalHandlers(),ACC.savedcarts.bindPostRestoreSavedCartLink()},onClosed:function(){ACC.common.refreshScreenReaderBuffer()}})})})},bindRestoreModalHandlers:function(){ACC.savedcarts.$savedCartRestoreBtn=$(".js-save-cart-restore-btn"),ACC.savedcarts.$currentCartName=$(".js-current-cart-name"),$(".js-prevent-save-active-cart").on("change",function(e){if(!0===$(this).prop("checked"))ACC.savedcarts.$currentCartName.attr("disabled","disabled"),ACC.savedcarts.$savedCartRestoreBtn.removeAttr("disabled");else{ACC.savedcarts.$currentCartName.removeAttr("disabled");var t=ACC.savedcarts.$currentCartName.val();""==t&&0===t.length&&ACC.savedcarts.$savedCartRestoreBtn.attr("disabled","disabled")}}),ACC.savedcarts.$currentCartName.on("focus",function(e){$(".js-restore-current-cart-form").removeClass("has-error"),$(".js-restore-error-container").html("")}),ACC.savedcarts.$currentCartName.on("blur",function(e){""==this.value&&0===this.value.length?ACC.savedcarts.$savedCartRestoreBtn.attr("disabled","disabled"):ACC.savedcarts.$savedCartRestoreBtn.removeAttr("disabled")})},bindPostRestoreSavedCartLink:function(){var n=!0,s=!1;$(document).on("click",".js-keep-restored-cart",function(e){n=$(this).prop("checked")}),$(document).on("click",".js-prevent-save-active-cart",function(e){s=$(this).prop("checked")}),$(document).on("click",".js-save-cart-restore-btn",function(e){e.preventDefault();var t=$("#activeCartName").val(),a=$(this).data("restore-url"),r={preventSaveActiveCart:s,keepRestoredCart:n,cartName:t};$.post(a,r).done(function(e,t,a){if("200"==e){var r=ACC.config.encodedContextPath+"/cart";window.location.replace(r)}else{var n=a.responseText.slice(1,-1);$(".js-restore-current-cart-form").addClass("has-error"),$(".js-restore-error-container").html(n),$(".js-savedcart_restore_confirm_modal").colorbox.resize()}})}),$(document).on("click",".js-cancel-restore-btn",function(e){ACC.colorbox.close()})},bindDeleteSavedCartLink:function(){$(document).on("click",".js-delete-saved-cart",function(e){e.preventDefault();var t=$(this).data("savedcart-id"),a=$(this).data("delete-popup-title");ACC.colorbox.open(a,{inline:!0,className:"js-savedcart_delete_confirm_modal",href:"#popup_confirm_savedcart_delete_"+t,width:"500px",onComplete:function(){$(this).colorbox.resize()}})})},bindDeleteConfirmLink:function(){$(document).on("click",".js-savedcart_delete_confirm",function(e){e.preventDefault();var t=$(this).data("savedcart-id"),a=ACC.config.encodedContextPath+"/my-account/saved-carts/"+t+"/delete";$.ajax({url:a,type:"DELETE",success:function(e){ACC.colorbox.close();var t=ACC.config.encodedContextPath+"/my-account/saved-carts";window.location.replace(t)}})}),$(document).on("click",".js-savedcart_delete_confirm_cancel",function(e){ACC.colorbox.close()})},bindSaveCartForm:function(){ACC.savedcarts.charactersLeftInit();var t=$("#saveCartForm"),a=!1,r=function(){var e=$("#saveCart").data("saveCartTitle");ACC.colorbox.open(e,{href:"#saveCart",inline:!0,width:"620px",onOpen:function(){$("#saveCartName").val()&&ACC.savedcarts.disableSaveCartButton(!1)},onComplete:function(){$(this).colorbox.resize(),a=!1},onClosed:function(){a&&t.submit(),document.getElementById("saveCartForm").reset(),ACC.savedcarts.disableSaveCartButton(!0),ACC.savedcarts.charactersLeftInit()}})};$(document).on("click",".js-save-cart-link, .js-update-saved-cart",function(e){e.preventDefault(),ACC.common.checkAuthenticationStatusBeforeAction(r)}),$(document).on("click","#saveCart #cancelSaveCartButton",function(e){e.preventDefault(),$.colorbox.close()}),$("#saveCartName").keyup(function(){$("#saveCart #saveCartButton").prop("disabled",""==this.value.trim());var e=$("#localized_val").attr("value"),t=$(this).val().length;remain=255-parseInt(t),$("#remain").text(e+" : "+remain)}),$("#saveCartDescription").keyup(function(){var e=$("#localized_val").attr("value"),t=$(this).val().length;remain=255-parseInt(t),$("#remainTextArea").text(e+" : "+remain)}),$(document).on("click","#saveCart #saveCartButton",function(e){e.preventDefault(),a=!0,$.colorbox.close()})},charactersLeftInit:function(){$("#remain").text($("#localized_val").attr("value")+" : 255"),$("#remainTextArea").text($("#localized_val").attr("value")+" : 255")},disableSaveCartButton:function(e){$("#saveCart #saveCartButton").prop("disabled",e)},bindUpdateUploadingSavedCarts:function(){var e=$(".js-uploading-saved-carts-update").data("idRowMapping"),t=$(".js-uploading-saved-carts-update").data("refreshCart");if(e&&t){var a=$(".js-uploading-saved-carts-update").data("refreshInterval"),r=e.split(","),n=new Object,s=[];for(i=0;i<r.length;i++){var o=r[i].split(":");""!=o&&(n[o[0]]=o[1],s.push(o[0]))}0<s.length&&setTimeout(function(){ACC.savedcarts.refreshWorker(s,n,a)},a)}},refreshWorker:function(o,c,d){$.ajax({dataType:"json",url:ACC.config.encodedContextPath+"/my-account/saved-carts/uploadingCarts",data:{cartCodes:o},type:"GET",traditional:!0,success:function(e){if(null!=e){for(i=0;i<e.length;i++){var t=e[i],a=$.inArray(t.code,o);-1<a&&o.splice(a,1);var r=c[t.code];if(null!=r){var n="#row-"+r;$(n+" .js-saved-cart-name").removeClass("not-active"),$(n+" .js-saved-cart-date").removeClass("hidden"),$(n+" .js-file-importing").remove(),$(n+" .js-saved-cart-description").text(t.description);var s=t.entries.length;$(n+" .js-saved-cart-number-of-items").text(s),$(n+" .js-saved-cart-total").text(t.totalPrice.formattedValue),0<s&&$(n+" .js-restore-saved-cart").removeClass("hidden"),$(n+" .js-delete-saved-cart").removeClass("hidden")}}}0<o.length&&setTimeout(function(){ACC.savedcarts.refreshWorker(o,c,d)},d)}})}};