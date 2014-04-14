/**
 * Shower HTML presentation engine: github.com/shower/shower
 * @copyright 2010–2013 Vadim Makeev, pepelsbey.net
 * @license MIT license: github.com/shower/shower/wiki/MIT-License
 */window.shower=window.shower||function(e,t,n){function l(e){for(var t in e)e.hasOwnProperty(t)&&(this[t]=e[t])}var r={},i=e.location,s=t.body,o=[],u=[],a,f=!!e.history&&!!e.history.pushState;l.prototype={getSlideNumber:function(){return this.number},isLast:function(){return r.slideList.length===this.number+1},isFinished:function(){return this.innerComplete>=this.innerLength},process:function(e){if(this.timing){this.initTimer(e);return this}this.next(e);return this},initTimer:function(e){var t=this;if(!t.timing)return!1;t.stopTimer();t.isFinished()?a=setInterval(function(){t.stopTimer();e.next()},t.timing*(t.innerLength||1)):a=setInterval(function(){if(t.isFinished()){t.stopTimer();e.next()}else t.next(e)},t.timing);return this},stopTimer:function(){if(a){clearInterval(a);a=!1}return this},prev:function(e){var n,r=this;if(!r.hasInnerNavigation||r.isFinished()||r.innerComplete===0){e.prev();return!1}n=t.getElementById(r.id).querySelectorAll(".next.active");if(!n||n.length<1)return!1;if(r.innerComplete>0){r.innerComplete--;n[n.length-1].classList.remove("active")}else e.prev();return this},next:function(e){var n,r=this;if(!r.hasInnerNavigation||r.isFinished()){e.next();return!1}if(!r.isFinished()){n=t.getElementById(r.id).querySelectorAll(".next:not(.active)");n[0].classList.add("active");r.innerComplete++}return this}};r._getData=function(e,t){return e.dataset?e.dataset[t]:e.getAttribute("data-"+t)};r.slideList=[];r.init=function(e,n){var i;e=e||".slide";n=n||"div.progress div";o=t.querySelectorAll(e);u=t.querySelector(n);for(var s=0;s<o.length;s++){o[s].id||(o[s].id=s+1);i=r._getData(o[s],"timing");if(i&&/^(\d{1,2}:)?\d{1,3}$/.test(i)){if(i.indexOf(":")!==-1){i=i.split(":");i=(parseInt(i[0],10)*60+parseInt(i[1],10))*1e3}else i=parseInt(i,10)*1e3;i===0&&(i=!1)}else i=!1;r.slideList.push(new l({id:o[s].id,number:s,hasInnerNavigation:null!==o[s].querySelector(".next"),timing:i,innerLength:o[s].querySelectorAll(".next").length,innerComplete:0}))}return r};r._getTransform=function(){var t=Math.max(s.clientWidth/e.innerWidth,s.clientHeight/e.innerHeight);return"scale("+1/t+")"};r._applyTransform=function(e){["WebkitTransform","MozTransform","msTransform","OTransform","transform"].forEach(function(t){s.style[t]=e});return!0};r._isNumber=function(e){return!isNaN(parseFloat(e))&&isFinite(e)};r._normalizeSlideNumber=function(e){if(!r._isNumber(e))throw new Error("Gimme slide number as Number, baby!");e<0&&(e=0);e>=r.slideList.length&&(e=r.slideList.length-1);return e};r._getSlideIdByEl=function(e){while("BODY"!==e.nodeName&&"HTML"!==e.nodeName){if(e.classList.contains("slide"))return e.id;e=e.parentNode}return""};r._checkInteractiveElement=function(e){return"A"===e.target.nodeName};r.getSlideNumber=function(e){var t=r.slideList.length-1,n;e===""&&(n=0);for(;t>=0;--t)if(e===r.slideList[t].id){n=t;break}return n};r.go=function(e,t){var n;if(!r._isNumber(e))throw new Error("Gimme slide number as Number, baby!");if(!r.slideList[e])return!1;i.hash=r.getSlideHash(e);r.updateProgress(e);r.updateActiveAndVisitedSlides(e);if(r.isSlideMode()){r.showPresenterNotes(e);n=r.slideList[e];n.timing&&n.initTimer(r)}typeof t=="function"&&t();return e};r.next=function(e){var t=r.getCurrentSlideNumber(),n=r.slideList[t+1];if(!n)return!1;r.go(t+1);typeof e=="function"&&e();return this};r._turnNextSlide=function(e){var t=r.getCurrentSlideNumber(),n=r.slideList[t];if(r.isSlideMode()){n.stopTimer();n.next(r)}else r.go(t+1);typeof e=="function"&&e();return};r.prev=r.previous=function(e){var t=r.getCurrentSlideNumber();if(t<1)return!1;r.go(t-1);typeof e=="function"&&e();return!0};r._turnPreviousSlide=function(e){var t=r.getCurrentSlideNumber(),n=r.slideList[t];n.stopTimer();r.isSlideMode()?n.prev(r):r.go(t-1);typeof e=="function"&&e();return!0};r.first=function(e){var t=r.slideList[r.getCurrentSlideNumber()];t&&t.timing&&t.stopTimer();r.go(0);typeof e=="function"&&e()};r.last=function(e){var t=r.slideList[r.getCurrentSlideNumber()];t&&t.timing&&t.stopTimer();r.go(r.slideList.length-1);typeof e=="function"&&e()};r.enterSlideMode=function(e){var t=r.getCurrentSlideNumber();s.classList.remove("list");s.classList.add("full");r.isListMode()&&f&&history.pushState(null,null,i.pathname+"?full"+r.getSlideHash(t));r._applyTransform(r._getTransform());typeof e=="function"&&e();return!0};r.enterListMode=function(e){var t;s.classList.remove("full");s.classList.add("list");r.clearPresenterNotes();if(r.isListMode())return!1;t=r.getCurrentSlideNumber();r.slideList[t].stopTimer();r.isSlideMode()&&f&&history.pushState(null,null,i.pathname+r.getSlideHash(t));r.scrollToSlide(t);r._applyTransform("none");typeof e=="function"&&e();return!0};r.toggleMode=function(e){r.isListMode()?r.enterSlideMode():r.enterListMode();typeof e=="function"&&e();return!0};r.getCurrentSlideNumber=function(){var e=r.slideList.length-1,t=i.hash.substr(1);if(t==="")return-1;for(;e>=0;--e)if(t===r.slideList[e].id)return e;return 0};r.scrollToSlide=function(n){var i,s=!1;if(!r._isNumber(n))throw new Error("Gimme slide number as Number, baby!");if(r.isSlideMode())throw new Error("You can't scroll to because you in slide mode. Please, switch to list mode.");if(-1===n)return s;if(!r.slideList[n])throw new Error("There is no slide with number "+n);i=t.getElementById(r.slideList[n].id);e.scrollTo(0,i.offsetTop);s=!0;return s};r.isListMode=function(){return f?!/^full.*/.test(i.search.substr(1)):s.classList.contains("list")};r.isSlideMode=function(){return f?/^full.*/.test(i.search.substr(1)):s.classList.contains("full")};r.updateProgress=function(e){if(null===u)return!1;if(!r._isNumber(e))throw new Error("Gimme slide number as Number, baby!");u.style.width=(100/(r.slideList.length-1)*r._normalizeSlideNumber(e)).toFixed(2)+"%";return!0};r.updateActiveAndVisitedSlides=function(e){var n,i,s=r.slideList.length;e=r._normalizeSlideNumber(e);if(!r._isNumber(e))throw new Error("Gimme slide number as Number, baby!");for(n=0;n<s;++n){i=t.getElementById(r.slideList[n].id);if(n<e){i.classList.remove("active");i.classList.add("visited")}else if(n>e){i.classList.remove("visited");i.classList.remove("active")}else{i.classList.remove("visited");i.classList.add("active")}}return!0};r.clearPresenterNotes=function(){r.isSlideMode()&&e.console&&e.console.clear&&console.clear()};r.showPresenterNotes=function(n){r.clearPresenterNotes();if(e.console){n=r._normalizeSlideNumber(n);var i=r.slideList[n].id,s=r.slideList[n+1]?r.slideList[n+1].id:null,o=t.getElementById(i).querySelector("footer");o&&o.innerHTML&&console.info(o.innerHTML.replace(/\n\s+/g,"\n"));if(s){var u=t.getElementById(s).querySelector("h2");if(u){u=u.innerHTML.replace(/^\s+|<[^>]+>/g,"");console.info("NEXT: "+u)}}}};r.getSlideHash=function(e){if(!r._isNumber(e))throw new Error("Gimme slide number as Number, baby!");e=r._normalizeSlideNumber(e);return"#"+r.slideList[e].id};r.wheel=function(e){var i=t.querySelector("body"),s,o=i.getAttribute("data-scroll")==="locked";if(!o&&!r.isListMode()){i.setAttribute("data-scroll","locked");e.deltaY===n?s=e.wheelDeltaY<0:s=e.deltaY>0;s?r._turnNextSlide():r._turnPreviousSlide();setTimeout(function(){i.setAttribute("data-scroll","unlocked")},200)}};e.addEventListener("DOMContentLoaded",function(){var e=r.getCurrentSlideNumber(),t=s.classList.contains("full")||r.isSlideMode();e===-1&&t?r.go(0):(e===0||t)&&r.go(e);t&&r.enterSlideMode()},!1);e.addEventListener("popstate",function(){var e=r.getCurrentSlideNumber();e!==-1&&r.go(e);r.isListMode()?r.enterListMode():r.enterSlideMode()},!1);e.addEventListener("resize",function(){r.isSlideMode()&&r._applyTransform(r._getTransform())},!1);t.addEventListener("keydown",function(e){var t=r.getCurrentSlideNumber(),n=r.slideList[t!==-1?t:0],i;switch(e.which){case 80:if(r.isListMode()&&e.altKey&&e.metaKey){e.preventDefault();i=n.number;r.go(i);r.enterSlideMode();r.showPresenterNotes(i);n.timing&&n.initTimer(r)}break;case 116:e.preventDefault();if(r.isListMode()){i=e.shiftKey?n.number:0;r.go(i);r.enterSlideMode();r.showPresenterNotes(i);n.timing&&n.initTimer(r)}else r.enterListMode();break;case 13:if(r.isListMode()&&-1!==t){e.preventDefault();r.enterSlideMode();r.showPresenterNotes(t);n.timing&&n.initTimer(r)}break;case 27:if(r.isSlideMode()){e.preventDefault();r.enterListMode()}break;case 33:case 38:case 37:case 72:case 75:if(e.altKey||e.ctrlKey||e.metaKey)return;e.preventDefault();r._turnPreviousSlide();break;case 34:case 40:case 39:case 76:case 74:if(e.altKey||e.ctrlKey||e.metaKey)return;e.preventDefault();r._turnNextSlide();break;case 36:e.preventDefault();r.first();break;case 35:e.preventDefault();r.last();break;case 9:case 32:e.preventDefault();r[e.shiftKey?"_turnPreviousSlide":"_turnNextSlide"]();break;default:}},!1);r.init();t.addEventListener("click",function(e){var t=r._getSlideIdByEl(e.target),n,i;if(t&&r.isListMode()){n=r.getSlideNumber(t);r.go(n);r.enterSlideMode();r.showPresenterNotes(n);i=r.slideList[n];i.timing&&i.initTimer(r)}},!1);t.addEventListener("touchstart",function(t){var n=r._getSlideIdByEl(t.target),i,s,o;if(n){if(r.isSlideMode()&&!r._checkInteractiveElement(t)){o=t.touches[0].pageX;o>e.innerWidth/2?r._turnNextSlide():r._turnPreviousSlide()}if(r.isListMode()){i=r.getSlideNumber(n);r.go(i);r.enterSlideMode();r.showPresenterNotes(i);s=r.slideList[i];s.timing&&s.initTimer(r)}}},!1);t.addEventListener("touchmove",function(e){r.isSlideMode()&&e.preventDefault()},!1);t.addEventListener("wheel",r.wheel,!1);t.addEventListener("mousewheel",r.wheel,!1);return r}(this,this.document);