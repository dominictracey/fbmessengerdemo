function hideDeleteAddressConfirmation(e){$(".delete-address-btn-"+e).popover("hide")}function showDeleteAddressConfirmation(e){$('[class^="delete-address-btn"]').not(".delete-address-btn-"+e).popover("hide"),$('[class^="delete-credit-card-btn"]').popover("hide"),$(".delete-address-btn-"+e).popover("show")}function hideDeleteCreditCardConfirmation(e){$(".delete-credit-card-btn-"+e).popover("hide")}function showDeleteCreditCardConfirmation(e){$('[class^="delete-credit-card-btn"]').not(".delete-credit-card-btn-"+e).popover("hide"),$('[class^="delete-address-btn"]').popover("hide");var t=$(".delete-credit-card-btn-"+e).attr("data-content");if(0==/form/i.test(t)){var o=t+$("#popup_confirm_payment_removal_"+e).html();$(".delete-credit-card-btn-"+e).attr("data-content",o)}$(".delete-credit-card-btn-"+e).popover("show")}ACC.paymentDetails={_autoload:["showRemovePaymentDetailsConfirmation","bindDeleteCreditCardAndAddressPopover"],bindDeleteCreditCardAndAddressPopover:function(){$('[class^="delete-credit-card-btn"]').popover(),$('[class^="delete-address-btn"]').popover()},showRemovePaymentDetailsConfirmation:function(){$(document).on("click",".removePaymentDetailsButton",function(){var e=$(this).data("paymentId"),t=$(this).data("popupTitle");ACC.colorbox.open(t,{inline:!0,href:"#popup_confirm_payment_removal_"+e,onComplete:function(){$(this).colorbox.resize()}})})}},$("body").on("click",function(e){"popover"!==$(e.target).data("toggle")&&0===$(e.target).parents(".popover.in").length&&$('[class^="delete-credit-card-btn"],[class^="delete-address-btn"]').popover("hide")}),$("body").on("hidden.bs.popover",function(e){$(e.target).data("bs.popover").inState.click=!1});