var oDoc=document;ACC.navigation={_autoload:["offcanvasNavigation","myAccountNavigation","needHelpNavigation"],offcanvasNavigation:function(){enquire.register("screen and (max-width:882px)",{match:function i(n){var e=n||".js_nav__link--drill__down";$(e).off("click").on("click",function(n){n.preventDefault();var e=this;$(e).parents(".js-enquire-has-sub").find(" > .sub__navigation").addClass("sub__navigation--open"),$(".mobile-menu-overflow").animate({left:"-=100%"},300),window.setTimeout(function(){i(e)},100)})}}),$(".js-enquire-sub-close:not(.clicked)").click(function(n){if(n.preventDefault(),$(window).width()<882){var e=this,i=$(this).parent();$(e).addClass("clicked"),$(".mobile-menu-overflow").animate({left:"+=100%"},300,function(){$(i).removeClass("sub__navigation--open")}),window.setTimeout(function(){$(e).removeClass("clicked")},400)}}),enquire.register("screen and (min-width:1025px)",{match:function(){$(".sub-nav-title").hover(function(){$(this).parents(".nav__links--primary").find(".sub-nav-item").removeClass("sub-nav-item--active"),$(this).parent().addClass("sub-nav-item--active")},function(){})},unmatch:function(){$(".sub-nav-title").off("mouseenter mouseleave")}}),enquire.register("screen and (min-width:882px) and (max-width:1024px)",{match:function(){$(document).on("click touchstart","li.js-nav-ipad:not(.touched) a",function(n){var e=$(this).parents("li.js-nav-ipad:not(.touched)");if(e.find(".sub__navigation").length)return e.addClass("touched"),e.siblings().removeClass("touched"),!1}),$(document).on("click",function(n){!1===$(n.target).is(".js-nav-ipad")&&$(".js-nav-ipad").removeClass("touched")}),$(document).on("click",".js_nav_link--drill__down_ipad",function(n){if(!$(this).parent().hasClass("sub-nav-item--active"))return $(this).parents(".nav__links--primary").find(".sub-nav-item").removeClass("sub-nav-item--active"),$(this).parent().addClass("sub-nav-item--active"),!1})}})},myAccountNavigation:function(){$(".account-menu-title").click(function(n){return n.preventDefault(),$(window).width()<882&&($(this).siblings().addClass("sub__navigation--open"),$(".mobile-menu-overflow").animate({left:"-=100%"},300,function(){})),!1}),enquire.register("screen and (min-width:1025px)",{match:function(){$(".account-menu").hoverIntent(function(){$(this).find(".account-menu-dropdown").slideDown()},function(){$(this).find(".account-menu-dropdown").slideUp()})},unmatch:function(){$(".account-menu").off("mouseenter mouseleave")}}),enquire.register("screen and (min-width:882px) and (max-width:1024px)",{match:function(){$(".account-menu").hoverIntent(function(){$(this).find(".account-menu-dropdown").slideDown()},function(){$(this).find(".account-menu-dropdown").slideUp()})},unmatch:function(){$(".account-menu").off("mouseenter mouseleave")}})},needHelpNavigation:function(){$(".help-menu-title").click(function(n){n.preventDefault(),$(window).width()<882&&($(this).siblings().addClass("sub__navigation--open"),$(".mobile-menu-overflow").animate({left:"-=100%"},300,function(){}))}),enquire.register("screen and (min-width:1025px)",{match:function(){$(".help-menu").hoverIntent(function(){$(this).find(".help-dropdown").slideDown()},function(){$(this).find(".help-dropdown").slideUp()})}}),enquire.register("screen and (min-width:882px) and (max-width:1024px)",{match:function(){$(".help-menu").on("touchstart",function(){$(this).find(".help-dropdown").slideDown()})},unmatch:function(){$(".help-menu").off("mouseenter mouseleave")}}),$(".help-link-large,a#liveChat, a.live-chat").click(function(n){n.preventDefault(),n.stopPropagation(),$(".bc-minimize-state-container,.bcFloat a").trigger("click")})}};