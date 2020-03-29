(function(w){"use strict";w.matchMedia=w.matchMedia||(function(doc,undefined){var bool,docElem=doc.documentElement,refNode=docElem.firstElementChild||docElem.firstChild,fakeBody=doc.createElement("body"),div=doc.createElement("div");div.id="mq-test-1";div.style.cssText="position:absolute;top:-100em";fakeBody.style.background="none";fakeBody.appendChild(div);return function(q){div.innerHTML="&shy;<style media=\""+q+"\"> #mq-test-1 { width: 42px; }</style>";docElem.insertBefore(fakeBody,refNode);bool=div.offsetWidth===42;docElem.removeChild(fakeBody);return{matches:bool,media:q};};}(w.document));}(this));(function(w){"use strict";if(w.matchMedia&&w.matchMedia('all').addListener){return false;}
var localMatchMedia=w.matchMedia,hasMediaQueries=localMatchMedia('only all').matches,isListening=false,timeoutID=0,queries=[],handleChange=function(evt){w.clearTimeout(timeoutID);timeoutID=w.setTimeout(function(){for(var i=0,il=queries.length;i<il;i++){var mql=queries[i].mql,listeners=queries[i].listeners||[],matches=localMatchMedia(mql.media).matches;if(matches!==mql.matches){mql.matches=matches;for(var j=0,jl=listeners.length;j<jl;j++){listeners[j].call(w,mql);}}}},30);};w.matchMedia=function(media){var mql=localMatchMedia(media),listeners=[],index=0;mql.addListener=function(listener){if(!hasMediaQueries){return;}
if(!isListening){isListening=true;w.addEventListener('resize',handleChange,true);}
if(index===0){index=queries.push({mql:mql,listeners:listeners});}
listeners.push(listener);};mql.removeListener=function(listener){for(var i=0,il=listeners.length;i<il;i++){if(listeners[i]===listener){listeners.splice(i,1);}}};return mql;};}(this));(function(w){"use strict";var respond={};w.respond=respond;respond.update=function(){};var requestQueue=[],xmlHttp=(function(){var xmlhttpmethod=false;try{xmlhttpmethod=new w.XMLHttpRequest();}
catch(e){xmlhttpmethod=new w.ActiveXObject("Microsoft.XMLHTTP");}
return function(){return xmlhttpmethod;};})(),ajax=function(url,callback){var req=xmlHttp();if(!req){return;}
req.open("GET",url,true);req.onreadystatechange=function(){if(req.readyState!==4||req.status!==200&&req.status!==304){return;}
callback(req.responseText);};if(req.readyState===4){return;}
req.send(null);},isUnsupportedMediaQuery=function(query){return query.replace(respond.regex.minmaxwh,'').match(respond.regex.other);};respond.ajax=ajax;respond.queue=requestQueue;respond.unsupportedmq=isUnsupportedMediaQuery;respond.regex={media:/@media[^\{]+\{([^\{\}]*\{[^\}\{]*\})+/gi,keyframes:/@(?:\-(?:o|moz|webkit)\-)?keyframes[^\{]+\{(?:[^\{\}]*\{[^\}\{]*\})+[^\}]*\}/gi,comments:/\/\*[^*]*\*+([^/][^*]*\*+)*\//gi,urls:/(url\()['"]?([^\/\)'"][^:\)'"]+)['"]?(\))/g,findStyles:/@media *([^\{]+)\{([\S\s]+?)$/,only:/(only\s+)?([a-zA-Z]+)\s?/,minw:/\(\s*min\-width\s*:\s*(\s*[0-9\.]+)(px|em)\s*\)/,maxw:/\(\s*max\-width\s*:\s*(\s*[0-9\.]+)(px|em)\s*\)/,minmaxwh:/\(\s*m(in|ax)\-(height|width)\s*:\s*(\s*[0-9\.]+)(px|em)\s*\)/gi,other:/\([^\)]*\)/g};respond.setAfterFirstApply=function(fn){if(firstApply){fn();}else{respond.afterFirstApply=fn;}};respond.afterFirstApply=null;respond.mediaQueriesSupported=w.matchMedia&&w.matchMedia("only all")!==null&&w.matchMedia("only all").matches;if(respond.mediaQueriesSupported){return;}
var doc=w.document,firstApply=false,docElem=doc.documentElement,mediastyles=[],rules=[],appendedEls=[],parsedSheets={},resizeThrottle=30,head=doc.getElementsByTagName("head")[0]||docElem,base=doc.getElementsByTagName("base")[0],links=head.getElementsByTagName("link"),lastCall,resizeDefer,eminpx,getEmValue=function(){var ret,div=doc.createElement('div'),body=doc.body,originalHTMLFontSize=docElem.style.fontSize,originalBodyFontSize=body&&body.style.fontSize,fakeUsed=false;div.style.cssText="position:absolute;font-size:1em;width:1em";if(!body){body=fakeUsed=doc.createElement("body");body.style.background="none";}
docElem.style.fontSize="100%";body.style.fontSize="100%";body.appendChild(div);if(fakeUsed){docElem.insertBefore(body,docElem.firstChild);}
ret=div.offsetWidth;if(fakeUsed){docElem.removeChild(body);}
else{body.removeChild(div);}
docElem.style.fontSize=originalHTMLFontSize;if(originalBodyFontSize){body.style.fontSize=originalBodyFontSize;}
ret=eminpx=parseFloat(ret);return ret;},applyMedia=function(fromResize){var name="clientWidth",docElemProp=docElem[name],currWidth=doc.compatMode==="CSS1Compat"&&docElemProp||doc.body[name]||docElemProp,styleBlocks={},lastLink=links[links.length-1],now=(new Date()).getTime();if(fromResize&&lastCall&&now-lastCall<resizeThrottle){w.clearTimeout(resizeDefer);resizeDefer=w.setTimeout(applyMedia,resizeThrottle);return;}
else{lastCall=now;}
for(var i in mediastyles){if(mediastyles.hasOwnProperty(i)){var thisstyle=mediastyles[i],min=thisstyle.minw,max=thisstyle.maxw,minnull=min===null,maxnull=max===null,em="em";if(!!min){min=parseFloat(min)*(min.indexOf(em)>-1?(eminpx||getEmValue()):1);}
if(!!max){max=parseFloat(max)*(max.indexOf(em)>-1?(eminpx||getEmValue()):1);}
if(!thisstyle.hasquery||(!minnull||!maxnull)&&(minnull||currWidth>=min)&&(maxnull||currWidth<=max)){if(!styleBlocks[thisstyle.media]){styleBlocks[thisstyle.media]=[];}
styleBlocks[thisstyle.media].push(rules[thisstyle.rules]);}}}
for(var j in appendedEls){if(appendedEls.hasOwnProperty(j)){if(appendedEls[j]&&appendedEls[j].parentNode===head){head.removeChild(appendedEls[j]);}}}
appendedEls.length=0;for(var k in styleBlocks){if(styleBlocks.hasOwnProperty(k)){var ss=doc.createElement("style"),css=styleBlocks[k].join("\n");ss.type="text/css";ss.media=k;head.insertBefore(ss,lastLink.nextSibling);if(ss.styleSheet){ss.styleSheet.cssText=css;}
else{ss.appendChild(doc.createTextNode(css));}
appendedEls.push(ss);}}},translate=function(styles,href,media){var qs=styles.replace(respond.regex.comments,'').replace(respond.regex.keyframes,'').match(respond.regex.media),ql=qs&&qs.length||0;href=href.substring(0,href.lastIndexOf("/"));var repUrls=function(css){return css.replace(respond.regex.urls,"$1"+href+"$2$3");},useMedia=!ql&&media;if(href.length){href+="/";}
if(useMedia){ql=1;}
for(var i=0;i<ql;i++){var fullq,thisq,eachq,eql;if(useMedia){fullq=media;rules.push(repUrls(styles));}
else{fullq=qs[i].match(respond.regex.findStyles)&&RegExp.$1;rules.push(RegExp.$2&&repUrls(RegExp.$2));}
eachq=fullq.split(",");eql=eachq.length;for(var j=0;j<eql;j++){thisq=eachq[j];if(isUnsupportedMediaQuery(thisq)){continue;}
mediastyles.push({media:thisq.split("(")[0].match(respond.regex.only)&&RegExp.$2||"all",rules:rules.length-1,hasquery:thisq.indexOf("(")>-1,minw:thisq.match(respond.regex.minw)&&parseFloat(RegExp.$1)+(RegExp.$2||""),maxw:thisq.match(respond.regex.maxw)&&parseFloat(RegExp.$1)+(RegExp.$2||"")});}}
applyMedia();},makeRequests=function(){if(requestQueue.length){var thisRequest=requestQueue.shift();ajax(thisRequest.href,function(styles){translate(styles,thisRequest.href,thisRequest.media);parsedSheets[thisRequest.href]=true;w.setTimeout(function(){makeRequests();},0);});}else{if(respond.afterFirstApply){respond.afterFirstApply();}}},ripCSS=function(){for(var i=0;i<links.length;i++){var sheet=links[i],href=sheet.href,media=sheet.media,isCSS=sheet.rel&&sheet.rel.toLowerCase()==="stylesheet";if(!!href&&isCSS&&!parsedSheets[href]){if(sheet.styleSheet&&sheet.styleSheet.rawCssText){translate(sheet.styleSheet.rawCssText,href,media);parsedSheets[href]=true;}else{if((!/^([a-zA-Z:]*\/\/)/.test(href)&&!base)||href.replace(RegExp.$1,"").split("/")[0]===w.location.host){if(href.substring(0,2)==="//"){href=w.location.protocol+href;}
requestQueue.push({href:href,media:media});}}}}
makeRequests();};ripCSS();respond.update=ripCSS;respond.getEmValue=getEmValue;function callMedia(){applyMedia(true);}
if(w.addEventListener){w.addEventListener("resize",callMedia,false);}
else if(w.attachEvent){w.attachEvent("onresize",callMedia);}})(this);function FastClick(layer){'use strict';var oldOnClick,self=this;this.trackingClick=false;this.trackingClickStart=0;this.targetElement=null;this.touchStartX=0;this.touchStartY=0;this.lastTouchIdentifier=0;this.touchBoundary=10;this.layer=layer;if(!layer||!layer.nodeType){throw new TypeError('Layer must be a document node');}
this.onClick=function(){return FastClick.prototype.onClick.apply(self,arguments);};this.onMouse=function(){return FastClick.prototype.onMouse.apply(self,arguments);};this.onTouchStart=function(){return FastClick.prototype.onTouchStart.apply(self,arguments);};this.onTouchMove=function(){return FastClick.prototype.onTouchMove.apply(self,arguments);};this.onTouchEnd=function(){return FastClick.prototype.onTouchEnd.apply(self,arguments);};this.onTouchCancel=function(){return FastClick.prototype.onTouchCancel.apply(self,arguments);};if(FastClick.notNeeded(layer)){return;}
if(this.deviceIsAndroid){layer.addEventListener('mouseover',this.onMouse,true);layer.addEventListener('mousedown',this.onMouse,true);layer.addEventListener('mouseup',this.onMouse,true);}
layer.addEventListener('click',this.onClick,true);layer.addEventListener('touchstart',this.onTouchStart,false);layer.addEventListener('touchmove',this.onTouchMove,false);layer.addEventListener('touchend',this.onTouchEnd,false);layer.addEventListener('touchcancel',this.onTouchCancel,false);if(!Event.prototype.stopImmediatePropagation){layer.removeEventListener=function(type,callback,capture){var rmv=Node.prototype.removeEventListener;if(type==='click'){rmv.call(layer,type,callback.hijacked||callback,capture);}else{rmv.call(layer,type,callback,capture);}};layer.addEventListener=function(type,callback,capture){var adv=Node.prototype.addEventListener;if(type==='click'){adv.call(layer,type,callback.hijacked||(callback.hijacked=function(event){if(!event.propagationStopped){callback(event);}}),capture);}else{adv.call(layer,type,callback,capture);}};}
if(typeof layer.onclick==='function'){oldOnClick=layer.onclick;layer.addEventListener('click',function(event){oldOnClick(event);},false);layer.onclick=null;}}
FastClick.prototype.deviceIsAndroid=navigator.userAgent.indexOf('Android')>0;FastClick.prototype.deviceIsIOS=/iP(ad|hone|od)/.test(navigator.userAgent);FastClick.prototype.deviceIsIOS4=FastClick.prototype.deviceIsIOS&&(/OS 4_\d(_\d)?/).test(navigator.userAgent);FastClick.prototype.deviceIsIOSWithBadTarget=FastClick.prototype.deviceIsIOS&&(/OS ([6-9]|\d{2})_\d/).test(navigator.userAgent);FastClick.prototype.needsClick=function(target){'use strict';switch(target.nodeName.toLowerCase()){case'button':case'select':case'textarea':if(target.disabled){return true;}
break;case'input':if((this.deviceIsIOS&&target.type==='file')||target.disabled){return true;}
break;case'label':case'video':return true;}
return(/\bneedsclick\b/).test(target.className);};FastClick.prototype.needsFocus=function(target){'use strict';switch(target.nodeName.toLowerCase()){case'textarea':return true;case'select':return!this.deviceIsAndroid;case'input':switch(target.type){case'button':case'checkbox':case'file':case'image':case'radio':case'submit':return false;}
return!target.disabled&&!target.readOnly;default:return(/\bneedsfocus\b/).test(target.className);}};FastClick.prototype.sendClick=function(targetElement,event){'use strict';var clickEvent,touch;if(document.activeElement&&document.activeElement!==targetElement){document.activeElement.blur();}
touch=event.changedTouches[0];clickEvent=document.createEvent('MouseEvents');clickEvent.initMouseEvent(this.determineEventType(targetElement),true,true,window,1,touch.screenX,touch.screenY,touch.clientX,touch.clientY,false,false,false,false,0,null);clickEvent.forwardedTouchEvent=true;targetElement.dispatchEvent(clickEvent);};FastClick.prototype.determineEventType=function(targetElement){'use strict';if(this.deviceIsAndroid&&targetElement.tagName.toLowerCase()==='select'){return'mousedown';}
return'click';};FastClick.prototype.focus=function(targetElement){'use strict';var length;if(this.deviceIsIOS&&targetElement.setSelectionRange&&targetElement.type.indexOf('date')!==0&&targetElement.type!=='time'){length=targetElement.value.length;targetElement.setSelectionRange(length,length);}else{targetElement.focus();}};FastClick.prototype.updateScrollParent=function(targetElement){'use strict';var scrollParent,parentElement;scrollParent=targetElement.fastClickScrollParent;if(!scrollParent||!scrollParent.contains(targetElement)){parentElement=targetElement;do{if(parentElement.scrollHeight>parentElement.offsetHeight){scrollParent=parentElement;targetElement.fastClickScrollParent=parentElement;break;}
parentElement=parentElement.parentElement;}while(parentElement);}
if(scrollParent){scrollParent.fastClickLastScrollTop=scrollParent.scrollTop;}};FastClick.prototype.getTargetElementFromEventTarget=function(eventTarget){'use strict';if(eventTarget.nodeType===Node.TEXT_NODE){return eventTarget.parentNode;}
return eventTarget;};FastClick.prototype.onTouchStart=function(event){'use strict';var targetElement,touch,selection;if(event.targetTouches.length>1){return true;}
targetElement=this.getTargetElementFromEventTarget(event.target);touch=event.targetTouches[0];if(this.deviceIsIOS){selection=window.getSelection();if(selection.rangeCount&&!selection.isCollapsed){return true;}
if(!this.deviceIsIOS4){if(touch.identifier===this.lastTouchIdentifier){event.preventDefault();return false;}
this.lastTouchIdentifier=touch.identifier;this.updateScrollParent(targetElement);}}
this.trackingClick=true;this.trackingClickStart=event.timeStamp;this.targetElement=targetElement;this.touchStartX=touch.pageX;this.touchStartY=touch.pageY;if((event.timeStamp-this.lastClickTime)<200){event.preventDefault();}
return true;};FastClick.prototype.touchHasMoved=function(event){'use strict';var touch=event.changedTouches[0],boundary=this.touchBoundary;if(Math.abs(touch.pageX-this.touchStartX)>boundary||Math.abs(touch.pageY-this.touchStartY)>boundary){return true;}
return false;};FastClick.prototype.onTouchMove=function(event){'use strict';if(!this.trackingClick){return true;}
if(this.targetElement!==this.getTargetElementFromEventTarget(event.target)||this.touchHasMoved(event)){this.trackingClick=false;this.targetElement=null;}
return true;};FastClick.prototype.findControl=function(labelElement){'use strict';if(labelElement.control!==undefined){return labelElement.control;}
if(labelElement.htmlFor){return document.getElementById(labelElement.htmlFor);}
return labelElement.querySelector('button, input:not([type=hidden]), keygen, meter, output, progress, select, textarea');};FastClick.prototype.onTouchEnd=function(event){'use strict';var forElement,trackingClickStart,targetTagName,scrollParent,touch,targetElement=this.targetElement;if(!this.trackingClick){return true;}
if((event.timeStamp-this.lastClickTime)<200){this.cancelNextClick=true;return true;}
this.cancelNextClick=false;this.lastClickTime=event.timeStamp;trackingClickStart=this.trackingClickStart;this.trackingClick=false;this.trackingClickStart=0;if(this.deviceIsIOSWithBadTarget){touch=event.changedTouches[0];targetElement=document.elementFromPoint(touch.pageX-window.pageXOffset,touch.pageY-window.pageYOffset)||targetElement;targetElement.fastClickScrollParent=this.targetElement.fastClickScrollParent;}
targetTagName=targetElement.tagName.toLowerCase();if(targetTagName==='label'){forElement=this.findControl(targetElement);if(forElement){this.focus(targetElement);if(this.deviceIsAndroid){return false;}
targetElement=forElement;}}else if(this.needsFocus(targetElement)){if((event.timeStamp-trackingClickStart)>100||(this.deviceIsIOS&&window.top!==window&&targetTagName==='input')){this.targetElement=null;return false;}
this.focus(targetElement);if(!this.deviceIsIOS4||targetTagName!=='select'){this.targetElement=null;event.preventDefault();}
return false;}
if(this.deviceIsIOS&&!this.deviceIsIOS4){scrollParent=targetElement.fastClickScrollParent;if(scrollParent&&scrollParent.fastClickLastScrollTop!==scrollParent.scrollTop){return true;}}
if(!this.needsClick(targetElement)){event.preventDefault();this.sendClick(targetElement,event);}
return false;};FastClick.prototype.onTouchCancel=function(){'use strict';this.trackingClick=false;this.targetElement=null;};FastClick.prototype.onMouse=function(event){'use strict';if(!this.targetElement){return true;}
if(event.forwardedTouchEvent){return true;}
if(!event.cancelable){return true;}
if(!this.needsClick(this.targetElement)||this.cancelNextClick){if(event.stopImmediatePropagation){event.stopImmediatePropagation();}else{event.propagationStopped=true;}
event.stopPropagation();event.preventDefault();return false;}
return true;};FastClick.prototype.onClick=function(event){'use strict';var permitted;if(this.trackingClick){this.targetElement=null;this.trackingClick=false;return true;}
if(event.target.type==='submit'&&event.detail===0){return true;}
permitted=this.onMouse(event);if(!permitted){this.targetElement=null;}
return permitted;};FastClick.prototype.destroy=function(){'use strict';var layer=this.layer;if(this.deviceIsAndroid){layer.removeEventListener('mouseover',this.onMouse,true);layer.removeEventListener('mousedown',this.onMouse,true);layer.removeEventListener('mouseup',this.onMouse,true);}
layer.removeEventListener('click',this.onClick,true);layer.removeEventListener('touchstart',this.onTouchStart,false);layer.removeEventListener('touchmove',this.onTouchMove,false);layer.removeEventListener('touchend',this.onTouchEnd,false);layer.removeEventListener('touchcancel',this.onTouchCancel,false);};FastClick.notNeeded=function(layer){'use strict';var metaViewport;var chromeVersion;if(typeof window.ontouchstart==='undefined'){return true;}
chromeVersion=+(/Chrome\/([0-9]+)/.exec(navigator.userAgent)||[,0])[1];if(chromeVersion){if(FastClick.prototype.deviceIsAndroid){metaViewport=document.querySelector('meta[name=viewport]');if(metaViewport){if(metaViewport.content.indexOf('user-scalable=no')!==-1){return true;}
if(chromeVersion>31&&window.innerWidth<=window.screen.width){return true;}}}else{return true;}}
if(layer.style.msTouchAction==='none'){return true;}
return false;};FastClick.attach=function(layer){'use strict';return new FastClick(layer);};if(typeof define!=='undefined'&&define.amd){define(function(){'use strict';return FastClick;});}else if(typeof module!=='undefined'&&module.exports){module.exports=FastClick.attach;module.exports.FastClick=FastClick;}else{window.FastClick=FastClick;};window.Modernizr=function(a,b,c){function y(a){i.cssText=a}function z(a,b){return y(l.join(a+";")+(b||""))}function A(a,b){return typeof a===b}function B(a,b){return!!~(""+a).indexOf(b)}function C(a,b){for(var d in a){var e=a[d];if(!B(e,"-")&&i[e]!==c)return b=="pfx"?e:!0}return!1}function D(a,b,d){for(var e in a){var f=b[a[e]];if(f!==c)return d===!1?a[e]:A(f,"function")?f.bind(d||b):f}return!1}function E(a,b,c){var d=a.charAt(0).toUpperCase()+a.slice(1),e=(a+" "+n.join(d+" ")+d).split(" ");return A(b,"string")||A(b,"undefined")?C(e,b):(e=(a+" "+o.join(d+" ")+d).split(" "),D(e,b,c))}function F(){e.input=function(c){for(var d=0,e=c.length;d<e;d++)r[c[d]]=c[d]in j;return r.list&&(r.list=!!b.createElement("datalist")&&!!a.HTMLDataListElement),r}("autocomplete autofocus list placeholder max min multiple pattern required step".split(" "))}var d="2.8.3",e={},f=b.documentElement,g="modernizr",h=b.createElement(g),i=h.style,j=b.createElement("input"),k={}.toString,l=" -webkit- -moz- -o- -ms- ".split(" "),m="Webkit Moz O ms",n=m.split(" "),o=m.toLowerCase().split(" "),p={},q={},r={},s=[],t=s.slice,u,v=function(a,c,d,e){var h,i,j,k,l=b.createElement("div"),m=b.body,n=m||b.createElement("body");if(parseInt(d,10))while(d--)j=b.createElement("div"),j.id=e?e[d]:g+(d+1),l.appendChild(j);return h=["&#173;",'<style id="s',g,'">',a,"</style>"].join(""),l.id=g,(m?l:n).innerHTML+=h,n.appendChild(l),m||(n.style.background="",n.style.overflow="hidden",k=f.style.overflow,f.style.overflow="hidden",f.appendChild(n)),i=c(l,a),m?l.parentNode.removeChild(l):(n.parentNode.removeChild(n),f.style.overflow=k),!!i},w={}.hasOwnProperty,x;!A(w,"undefined")&&!A(w.call,"undefined")?x=function(a,b){return w.call(a,b)}:x=function(a,b){return b in a&&A(a.constructor.prototype[b],"undefined")},Function.prototype.bind||(Function.prototype.bind=function(b){var c=this;if(typeof c!="function")throw new TypeError;var d=t.call(arguments,1),e=function(){if(this instanceof e){var a=function(){};a.prototype=c.prototype;var f=new a,g=c.apply(f,d.concat(t.call(arguments)));return Object(g)===g?g:f}return c.apply(b,d.concat(t.call(arguments)))};return e}),p.history=function(){return!!a.history&&!!history.pushState},p.cssanimations=function(){return E("animationName")},p.csstransforms=function(){return!!E("transform")},p.csstransforms3d=function(){var a=!!E("perspective");return a&&"webkitPerspective"in f.style&&v("@media (transform-3d),(-webkit-transform-3d){#modernizr{left:9px;position:absolute;height:3px;}}",function(b,c){a=b.offsetLeft===9&&b.offsetHeight===3}),a},p.csstransitions=function(){return E("transition")};for(var G in p)x(p,G)&&(u=G.toLowerCase(),e[u]=p[G](),s.push((e[u]?"":"no-")+u));return e.input||F(),e.addTest=function(a,b){if(typeof a=="object")for(var d in a)x(a,d)&&e.addTest(d,a[d]);else{a=a.toLowerCase();if(e[a]!==c)return e;b=typeof b=="function"?b():b,typeof enableClasses!="undefined"&&enableClasses&&(f.className+=" "+(b?"":"no-")+a),e[a]=b}return e},y(""),h=j=null,e._version=d,e._prefixes=l,e._domPrefixes=o,e._cssomPrefixes=n,e.testProp=function(a){return C([a])},e.testAllProps=E,e.testStyles=v,e}(this,this.document);var requirejs,require,define;(function(global){var req,s,head,baseElement,dataMain,src,interactiveScript,currentlyAddingScript,mainScript,subPath,version='2.1.9',commentRegExp=/(\/\*([\s\S]*?)\*\/|([^:]|^)\/\/(.*)$)/mg,cjsRequireRegExp=/[^.]\s*require\s*\(\s*["']([^'"\s]+)["']\s*\)/g,jsSuffixRegExp=/\.js$/,currDirRegExp=/^\.\//,op=Object.prototype,ostring=op.toString,hasOwn=op.hasOwnProperty,ap=Array.prototype,apsp=ap.splice,isBrowser=!!(typeof window!=='undefined'&&typeof navigator!=='undefined'&&window.document),isWebWorker=!isBrowser&&typeof importScripts!=='undefined',readyRegExp=isBrowser&&navigator.platform==='PLAYSTATION 3'?/^complete$/:/^(complete|loaded)$/,defContextName='_',isOpera=typeof opera!=='undefined'&&opera.toString()==='[object Opera]',contexts={},cfg={},globalDefQueue=[],useInteractive=false;function isFunction(it){return ostring.call(it)==='[object Function]';}
function isArray(it){return ostring.call(it)==='[object Array]';}
function each(ary,func){if(ary){var i;for(i=0;i<ary.length;i+=1){if(ary[i]&&func(ary[i],i,ary)){break;}}}}
function eachReverse(ary,func){if(ary){var i;for(i=ary.length-1;i>-1;i-=1){if(ary[i]&&func(ary[i],i,ary)){break;}}}}
function hasProp(obj,prop){return hasOwn.call(obj,prop);}
function getOwn(obj,prop){return hasProp(obj,prop)&&obj[prop];}
function eachProp(obj,func){var prop;for(prop in obj){if(hasProp(obj,prop)){if(func(obj[prop],prop)){break;}}}}
function mixin(target,source,force,deepStringMixin){if(source){eachProp(source,function(value,prop){if(force||!hasProp(target,prop)){if(deepStringMixin&&typeof value!=='string'){if(!target[prop]){target[prop]={};}
mixin(target[prop],value,force,deepStringMixin);}else{target[prop]=value;}}});}
return target;}
function bind(obj,fn){return function(){return fn.apply(obj,arguments);};}
function scripts(){return document.getElementsByTagName('script');}
function defaultOnError(err){throw err;}
function getGlobal(value){if(!value){return value;}
var g=global;each(value.split('.'),function(part){g=g[part];});return g;}
function makeError(id,msg,err,requireModules){var e=new Error(msg+'\nhttp://requirejs.org/docs/errors.html#'+id);e.requireType=id;e.requireModules=requireModules;if(err){e.originalError=err;}
return e;}
if(typeof define!=='undefined'){return;}
if(typeof requirejs!=='undefined'){if(isFunction(requirejs)){return;}
cfg=requirejs;requirejs=undefined;}
if(typeof require!=='undefined'&&!isFunction(require)){cfg=require;require=undefined;}
function newContext(contextName){var inCheckLoaded,Module,context,handlers,checkLoadedTimeoutId,config={waitSeconds:7,baseUrl:'./',paths:{},pkgs:{},shim:{},config:{}},registry={},enabledRegistry={},undefEvents={},defQueue=[],defined={},urlFetched={},requireCounter=1,unnormalizedCounter=1;function trimDots(ary){var i,part;for(i=0;ary[i];i+=1){part=ary[i];if(part==='.'){ary.splice(i,1);i-=1;}else if(part==='..'){if(i===1&&(ary[2]==='..'||ary[0]==='..')){break;}else if(i>0){ary.splice(i-1,2);i-=2;}}}}
function normalize(name,baseName,applyMap){var pkgName,pkgConfig,mapValue,nameParts,i,j,nameSegment,foundMap,foundI,foundStarMap,starI,baseParts=baseName&&baseName.split('/'),normalizedBaseParts=baseParts,map=config.map,starMap=map&&map['*'];if(name&&name.charAt(0)==='.'){if(baseName){if(getOwn(config.pkgs,baseName)){normalizedBaseParts=baseParts=[baseName];}else{normalizedBaseParts=baseParts.slice(0,baseParts.length-1);}
name=normalizedBaseParts.concat(name.split('/'));trimDots(name);pkgConfig=getOwn(config.pkgs,(pkgName=name[0]));name=name.join('/');if(pkgConfig&&name===pkgName+'/'+pkgConfig.main){name=pkgName;}}else if(name.indexOf('./')===0){name=name.substring(2);}}
if(applyMap&&map&&(baseParts||starMap)){nameParts=name.split('/');for(i=nameParts.length;i>0;i-=1){nameSegment=nameParts.slice(0,i).join('/');if(baseParts){for(j=baseParts.length;j>0;j-=1){mapValue=getOwn(map,baseParts.slice(0,j).join('/'));if(mapValue){mapValue=getOwn(mapValue,nameSegment);if(mapValue){foundMap=mapValue;foundI=i;break;}}}}
if(foundMap){break;}
if(!foundStarMap&&starMap&&getOwn(starMap,nameSegment)){foundStarMap=getOwn(starMap,nameSegment);starI=i;}}
if(!foundMap&&foundStarMap){foundMap=foundStarMap;foundI=starI;}
if(foundMap){nameParts.splice(0,foundI,foundMap);name=nameParts.join('/');}}
return name;}
function removeScript(name){if(isBrowser){each(scripts(),function(scriptNode){if(scriptNode.getAttribute('data-requiremodule')===name&&scriptNode.getAttribute('data-requirecontext')===context.contextName){scriptNode.parentNode.removeChild(scriptNode);return true;}});}}
function hasPathFallback(id){var pathConfig=getOwn(config.paths,id);if(pathConfig&&isArray(pathConfig)&&pathConfig.length>1){pathConfig.shift();context.require.undef(id);context.require([id]);return true;}}
function splitPrefix(name){var prefix,index=name?name.indexOf('!'):-1;if(index>-1){prefix=name.substring(0,index);name=name.substring(index+1,name.length);}
return[prefix,name];}
function makeModuleMap(name,parentModuleMap,isNormalized,applyMap){var url,pluginModule,suffix,nameParts,prefix=null,parentName=parentModuleMap?parentModuleMap.name:null,originalName=name,isDefine=true,normalizedName='';if(!name){isDefine=false;name='_@r'+(requireCounter+=1);}
nameParts=splitPrefix(name);prefix=nameParts[0];name=nameParts[1];if(prefix){prefix=normalize(prefix,parentName,applyMap);pluginModule=getOwn(defined,prefix);}
if(name){if(prefix){if(pluginModule&&pluginModule.normalize){normalizedName=pluginModule.normalize(name,function(name){return normalize(name,parentName,applyMap);});}else{normalizedName=normalize(name,parentName,applyMap);}}else{normalizedName=normalize(name,parentName,applyMap);nameParts=splitPrefix(normalizedName);prefix=nameParts[0];normalizedName=nameParts[1];isNormalized=true;url=context.nameToUrl(normalizedName);}}
suffix=prefix&&!pluginModule&&!isNormalized?'_unnormalized'+(unnormalizedCounter+=1):'';return{prefix:prefix,name:normalizedName,parentMap:parentModuleMap,unnormalized:!!suffix,url:url,originalName:originalName,isDefine:isDefine,id:(prefix?prefix+'!'+normalizedName:normalizedName)+suffix};}
function getModule(depMap){var id=depMap.id,mod=getOwn(registry,id);if(!mod){mod=registry[id]=new context.Module(depMap);}
return mod;}
function on(depMap,name,fn){var id=depMap.id,mod=getOwn(registry,id);if(hasProp(defined,id)&&(!mod||mod.defineEmitComplete)){if(name==='defined'){fn(defined[id]);}}else{mod=getModule(depMap);if(mod.error&&name==='error'){fn(mod.error);}else{mod.on(name,fn);}}}
function onError(err,errback){var ids=err.requireModules,notified=false;if(errback){errback(err);}else{each(ids,function(id){var mod=getOwn(registry,id);if(mod){mod.error=err;if(mod.events.error){notified=true;mod.emit('error',err);}}});if(!notified){req.onError(err);}}}
function takeGlobalQueue(){if(globalDefQueue.length){apsp.apply(defQueue,[defQueue.length-1,0].concat(globalDefQueue));globalDefQueue=[];}}
handlers={'require':function(mod){if(mod.require){return mod.require;}else{return(mod.require=context.makeRequire(mod.map));}},'exports':function(mod){mod.usingExports=true;if(mod.map.isDefine){if(mod.exports){return mod.exports;}else{return(mod.exports=defined[mod.map.id]={});}}},'module':function(mod){if(mod.module){return mod.module;}else{return(mod.module={id:mod.map.id,uri:mod.map.url,config:function(){var c,pkg=getOwn(config.pkgs,mod.map.id);c=pkg?getOwn(config.config,mod.map.id+'/'+pkg.main):getOwn(config.config,mod.map.id);return c||{};},exports:defined[mod.map.id]});}}};function cleanRegistry(id){delete registry[id];delete enabledRegistry[id];}
function breakCycle(mod,traced,processed){var id=mod.map.id;if(mod.error){mod.emit('error',mod.error);}else{traced[id]=true;each(mod.depMaps,function(depMap,i){var depId=depMap.id,dep=getOwn(registry,depId);if(dep&&!mod.depMatched[i]&&!processed[depId]){if(getOwn(traced,depId)){mod.defineDep(i,defined[depId]);mod.check();}else{breakCycle(dep,traced,processed);}}});processed[id]=true;}}
function checkLoaded(){var map,modId,err,usingPathFallback,waitInterval=config.waitSeconds*1000,expired=waitInterval&&(context.startTime+waitInterval)<new Date().getTime(),noLoads=[],reqCalls=[],stillLoading=false,needCycleCheck=true;if(inCheckLoaded){return;}
inCheckLoaded=true;eachProp(enabledRegistry,function(mod){map=mod.map;modId=map.id;if(!mod.enabled){return;}
if(!map.isDefine){reqCalls.push(mod);}
if(!mod.error){if(!mod.inited&&expired){if(hasPathFallback(modId)){usingPathFallback=true;stillLoading=true;}else{noLoads.push(modId);removeScript(modId);}}else if(!mod.inited&&mod.fetched&&map.isDefine){stillLoading=true;if(!map.prefix){return(needCycleCheck=false);}}}});if(expired&&noLoads.length){err=makeError('timeout','Load timeout for modules: '+noLoads,null,noLoads);err.contextName=context.contextName;return onError(err);}
if(needCycleCheck){each(reqCalls,function(mod){breakCycle(mod,{},{});});}
if((!expired||usingPathFallback)&&stillLoading){if((isBrowser||isWebWorker)&&!checkLoadedTimeoutId){checkLoadedTimeoutId=setTimeout(function(){checkLoadedTimeoutId=0;checkLoaded();},50);}}
inCheckLoaded=false;}
Module=function(map){this.events=getOwn(undefEvents,map.id)||{};this.map=map;this.shim=getOwn(config.shim,map.id);this.depExports=[];this.depMaps=[];this.depMatched=[];this.pluginMaps={};this.depCount=0;};Module.prototype={init:function(depMaps,factory,errback,options){options=options||{};if(this.inited){return;}
this.factory=factory;if(errback){this.on('error',errback);}else if(this.events.error){errback=bind(this,function(err){this.emit('error',err);});}
this.depMaps=depMaps&&depMaps.slice(0);this.errback=errback;this.inited=true;this.ignore=options.ignore;if(options.enabled||this.enabled){this.enable();}else{this.check();}},defineDep:function(i,depExports){if(!this.depMatched[i]){this.depMatched[i]=true;this.depCount-=1;this.depExports[i]=depExports;}},fetch:function(){if(this.fetched){return;}
this.fetched=true;context.startTime=(new Date()).getTime();var map=this.map;if(this.shim){context.makeRequire(this.map,{enableBuildCallback:true})(this.shim.deps||[],bind(this,function(){return map.prefix?this.callPlugin():this.load();}));}else{return map.prefix?this.callPlugin():this.load();}},load:function(){var url=this.map.url;if(!urlFetched[url]){urlFetched[url]=true;context.load(this.map.id,url);}},check:function(){if(!this.enabled||this.enabling){return;}
var err,cjsModule,id=this.map.id,depExports=this.depExports,exports=this.exports,factory=this.factory;if(!this.inited){this.fetch();}else if(this.error){this.emit('error',this.error);}else if(!this.defining){this.defining=true;if(this.depCount<1&&!this.defined){if(isFunction(factory)){if((this.events.error&&this.map.isDefine)||req.onError!==defaultOnError){try{exports=context.execCb(id,factory,depExports,exports);}catch(e){err=e;}}else{exports=context.execCb(id,factory,depExports,exports);}
if(this.map.isDefine){cjsModule=this.module;if(cjsModule&&cjsModule.exports!==undefined&&cjsModule.exports!==this.exports){exports=cjsModule.exports;}else if(exports===undefined&&this.usingExports){exports=this.exports;}}
if(err){err.requireMap=this.map;err.requireModules=this.map.isDefine?[this.map.id]:null;err.requireType=this.map.isDefine?'define':'require';return onError((this.error=err));}}else{exports=factory;}
this.exports=exports;if(this.map.isDefine&&!this.ignore){defined[id]=exports;if(req.onResourceLoad){req.onResourceLoad(context,this.map,this.depMaps);}}
cleanRegistry(id);this.defined=true;}
this.defining=false;if(this.defined&&!this.defineEmitted){this.defineEmitted=true;this.emit('defined',this.exports);this.defineEmitComplete=true;}}},callPlugin:function(){var map=this.map,id=map.id,pluginMap=makeModuleMap(map.prefix);this.depMaps.push(pluginMap);on(pluginMap,'defined',bind(this,function(plugin){var load,normalizedMap,normalizedMod,name=this.map.name,parentName=this.map.parentMap?this.map.parentMap.name:null,localRequire=context.makeRequire(map.parentMap,{enableBuildCallback:true});if(this.map.unnormalized){if(plugin.normalize){name=plugin.normalize(name,function(name){return normalize(name,parentName,true);})||'';}
normalizedMap=makeModuleMap(map.prefix+'!'+name,this.map.parentMap);on(normalizedMap,'defined',bind(this,function(value){this.init([],function(){return value;},null,{enabled:true,ignore:true});}));normalizedMod=getOwn(registry,normalizedMap.id);if(normalizedMod){this.depMaps.push(normalizedMap);if(this.events.error){normalizedMod.on('error',bind(this,function(err){this.emit('error',err);}));}
normalizedMod.enable();}
return;}
load=bind(this,function(value){this.init([],function(){return value;},null,{enabled:true});});load.error=bind(this,function(err){this.inited=true;this.error=err;err.requireModules=[id];eachProp(registry,function(mod){if(mod.map.id.indexOf(id+'_unnormalized')===0){cleanRegistry(mod.map.id);}});onError(err);});load.fromText=bind(this,function(text,textAlt){var moduleName=map.name,moduleMap=makeModuleMap(moduleName),hasInteractive=useInteractive;if(textAlt){text=textAlt;}
if(hasInteractive){useInteractive=false;}
getModule(moduleMap);if(hasProp(config.config,id)){config.config[moduleName]=config.config[id];}
try{req.exec(text);}catch(e){return onError(makeError('fromtexteval','fromText eval for '+id+' failed: '+e,e,[id]));}
if(hasInteractive){useInteractive=true;}
this.depMaps.push(moduleMap);context.completeLoad(moduleName);localRequire([moduleName],load);});plugin.load(map.name,localRequire,load,config);}));context.enable(pluginMap,this);this.pluginMaps[pluginMap.id]=pluginMap;},enable:function(){enabledRegistry[this.map.id]=this;this.enabled=true;this.enabling=true;each(this.depMaps,bind(this,function(depMap,i){var id,mod,handler;if(typeof depMap==='string'){depMap=makeModuleMap(depMap,(this.map.isDefine?this.map:this.map.parentMap),false,!this.skipMap);this.depMaps[i]=depMap;handler=getOwn(handlers,depMap.id);if(handler){this.depExports[i]=handler(this);return;}
this.depCount+=1;on(depMap,'defined',bind(this,function(depExports){this.defineDep(i,depExports);this.check();}));if(this.errback){on(depMap,'error',bind(this,this.errback));}}
id=depMap.id;mod=registry[id];if(!hasProp(handlers,id)&&mod&&!mod.enabled){context.enable(depMap,this);}}));eachProp(this.pluginMaps,bind(this,function(pluginMap){var mod=getOwn(registry,pluginMap.id);if(mod&&!mod.enabled){context.enable(pluginMap,this);}}));this.enabling=false;this.check();},on:function(name,cb){var cbs=this.events[name];if(!cbs){cbs=this.events[name]=[];}
cbs.push(cb);},emit:function(name,evt){each(this.events[name],function(cb){cb(evt);});if(name==='error'){delete this.events[name];}}};function callGetModule(args){if(!hasProp(defined,args[0])){getModule(makeModuleMap(args[0],null,true)).init(args[1],args[2]);}}
function removeListener(node,func,name,ieName){if(node.detachEvent&&!isOpera){if(ieName){node.detachEvent(ieName,func);}}else{node.removeEventListener(name,func,false);}}
function getScriptData(evt){var node=evt.currentTarget||evt.srcElement;removeListener(node,context.onScriptLoad,'load','onreadystatechange');removeListener(node,context.onScriptError,'error');return{node:node,id:node&&node.getAttribute('data-requiremodule')};}
function intakeDefines(){var args;takeGlobalQueue();while(defQueue.length){args=defQueue.shift();if(args[0]===null){return onError(makeError('mismatch','Mismatched anonymous define() module: '+args[args.length-1]));}else{callGetModule(args);}}}
context={config:config,contextName:contextName,registry:registry,defined:defined,urlFetched:urlFetched,defQueue:defQueue,Module:Module,makeModuleMap:makeModuleMap,nextTick:req.nextTick,onError:onError,configure:function(cfg){if(cfg.baseUrl){if(cfg.baseUrl.charAt(cfg.baseUrl.length-1)!=='/'){cfg.baseUrl+='/';}}
var pkgs=config.pkgs,shim=config.shim,objs={paths:true,config:true,map:true};eachProp(cfg,function(value,prop){if(objs[prop]){if(prop==='map'){if(!config.map){config.map={};}
mixin(config[prop],value,true,true);}else{mixin(config[prop],value,true);}}else{config[prop]=value;}});if(cfg.shim){eachProp(cfg.shim,function(value,id){if(isArray(value)){value={deps:value};}
if((value.exports||value.init)&&!value.exportsFn){value.exportsFn=context.makeShimExports(value);}
shim[id]=value;});config.shim=shim;}
if(cfg.packages){each(cfg.packages,function(pkgObj){var location;pkgObj=typeof pkgObj==='string'?{name:pkgObj}:pkgObj;location=pkgObj.location;pkgs[pkgObj.name]={name:pkgObj.name,location:location||pkgObj.name,main:(pkgObj.main||'main').replace(currDirRegExp,'').replace(jsSuffixRegExp,'')};});config.pkgs=pkgs;}
eachProp(registry,function(mod,id){if(!mod.inited&&!mod.map.unnormalized){mod.map=makeModuleMap(id);}});if(cfg.deps||cfg.callback){context.require(cfg.deps||[],cfg.callback);}},makeShimExports:function(value){function fn(){var ret;if(value.init){ret=value.init.apply(global,arguments);}
return ret||(value.exports&&getGlobal(value.exports));}
return fn;},makeRequire:function(relMap,options){options=options||{};function localRequire(deps,callback,errback){var id,map,requireMod;if(options.enableBuildCallback&&callback&&isFunction(callback)){callback.__requireJsBuild=true;}
if(typeof deps==='string'){if(isFunction(callback)){return onError(makeError('requireargs','Invalid require call'),errback);}
if(relMap&&hasProp(handlers,deps)){return handlers[deps](registry[relMap.id]);}
if(req.get){return req.get(context,deps,relMap,localRequire);}
map=makeModuleMap(deps,relMap,false,true);id=map.id;if(!hasProp(defined,id)){return onError(makeError('notloaded','Module name "'+
id+'" has not been loaded yet for context: '+
contextName+
(relMap?'':'. Use require([])')));}
return defined[id];}
intakeDefines();context.nextTick(function(){intakeDefines();requireMod=getModule(makeModuleMap(null,relMap));requireMod.skipMap=options.skipMap;requireMod.init(deps,callback,errback,{enabled:true});checkLoaded();});return localRequire;}
mixin(localRequire,{isBrowser:isBrowser,toUrl:function(moduleNamePlusExt){var ext,index=moduleNamePlusExt.lastIndexOf('.'),segment=moduleNamePlusExt.split('/')[0],isRelative=segment==='.'||segment==='..';if(index!==-1&&(!isRelative||index>1)){ext=moduleNamePlusExt.substring(index,moduleNamePlusExt.length);moduleNamePlusExt=moduleNamePlusExt.substring(0,index);}
return context.nameToUrl(normalize(moduleNamePlusExt,relMap&&relMap.id,true),ext,true);},defined:function(id){return hasProp(defined,makeModuleMap(id,relMap,false,true).id);},specified:function(id){id=makeModuleMap(id,relMap,false,true).id;return hasProp(defined,id)||hasProp(registry,id);}});if(!relMap){localRequire.undef=function(id){takeGlobalQueue();var map=makeModuleMap(id,relMap,true),mod=getOwn(registry,id);removeScript(id);delete defined[id];delete urlFetched[map.url];delete undefEvents[id];if(mod){if(mod.events.defined){undefEvents[id]=mod.events;}
cleanRegistry(id);}};}
return localRequire;},enable:function(depMap){var mod=getOwn(registry,depMap.id);if(mod){getModule(depMap).enable();}},completeLoad:function(moduleName){var found,args,mod,shim=getOwn(config.shim,moduleName)||{},shExports=shim.exports;takeGlobalQueue();while(defQueue.length){args=defQueue.shift();if(args[0]===null){args[0]=moduleName;if(found){break;}
found=true;}else if(args[0]===moduleName){found=true;}
callGetModule(args);}
mod=getOwn(registry,moduleName);if(!found&&!hasProp(defined,moduleName)&&mod&&!mod.inited){if(config.enforceDefine&&(!shExports||!getGlobal(shExports))){if(hasPathFallback(moduleName)){return;}else{return onError(makeError('nodefine','No define call for '+moduleName,null,[moduleName]));}}else{callGetModule([moduleName,(shim.deps||[]),shim.exportsFn]);}}
checkLoaded();},nameToUrl:function(moduleName,ext,skipExt){var paths,pkgs,pkg,pkgPath,syms,i,parentModule,url,parentPath;if(req.jsExtRegExp.test(moduleName)){url=moduleName+(ext||'');}else{paths=config.paths;pkgs=config.pkgs;syms=moduleName.split('/');for(i=syms.length;i>0;i-=1){parentModule=syms.slice(0,i).join('/');pkg=getOwn(pkgs,parentModule);parentPath=getOwn(paths,parentModule);if(parentPath){if(isArray(parentPath)){parentPath=parentPath[0];}
syms.splice(0,i,parentPath);break;}else if(pkg){if(moduleName===pkg.name){pkgPath=pkg.location+'/'+pkg.main;}else{pkgPath=pkg.location;}
syms.splice(0,i,pkgPath);break;}}
url=syms.join('/');url+=(ext||(/^data\:|\?/.test(url)||skipExt?'':'.js'));url=(url.charAt(0)==='/'||url.match(/^[\w\+\.\-]+:/)?'':config.baseUrl)+url;}
return config.urlArgs?url+
((url.indexOf('?')===-1?'?':'&')+
config.urlArgs):url;},load:function(id,url){req.load(context,id,url);},execCb:function(name,callback,args,exports){return callback.apply(exports,args);},onScriptLoad:function(evt){if(evt.type==='load'||(readyRegExp.test((evt.currentTarget||evt.srcElement).readyState))){interactiveScript=null;var data=getScriptData(evt);context.completeLoad(data.id);}},onScriptError:function(evt){var data=getScriptData(evt);if(!hasPathFallback(data.id)){return onError(makeError('scripterror','Script error for: '+data.id,evt,[data.id]));}}};context.require=context.makeRequire();return context;}
req=requirejs=function(deps,callback,errback,optional){var context,config,contextName=defContextName;if(!isArray(deps)&&typeof deps!=='string'){config=deps;if(isArray(callback)){deps=callback;callback=errback;errback=optional;}else{deps=[];}}
if(config&&config.context){contextName=config.context;}
context=getOwn(contexts,contextName);if(!context){context=contexts[contextName]=req.s.newContext(contextName);}
if(config){context.configure(config);}
return context.require(deps,callback,errback);};req.config=function(config){return req(config);};req.nextTick=typeof setTimeout!=='undefined'?function(fn){setTimeout(fn,4);}:function(fn){fn();};if(!require){require=req;}
req.version=version;req.jsExtRegExp=/^\/|:|\?|\.js$/;req.isBrowser=isBrowser;s=req.s={contexts:contexts,newContext:newContext};req({});each(['toUrl','undef','defined','specified'],function(prop){req[prop]=function(){var ctx=contexts[defContextName];return ctx.require[prop].apply(ctx,arguments);};});if(isBrowser){head=s.head=document.getElementsByTagName('head')[0];baseElement=document.getElementsByTagName('base')[0];if(baseElement){head=s.head=baseElement.parentNode;}}
req.onError=defaultOnError;req.createNode=function(config,moduleName,url){var node=config.xhtml?document.createElementNS('http://www.w3.org/1999/xhtml','html:script'):document.createElement('script');node.type=config.scriptType||'text/javascript';node.charset='utf-8';node.async=true;return node;};req.load=function(context,moduleName,url){var config=(context&&context.config)||{},node;if(isBrowser){node=req.createNode(config,moduleName,url);node.setAttribute('data-requirecontext',context.contextName);node.setAttribute('data-requiremodule',moduleName);if(node.attachEvent&&!(node.attachEvent.toString&&node.attachEvent.toString().indexOf('[native code')<0)&&!isOpera){useInteractive=true;node.attachEvent('onreadystatechange',context.onScriptLoad);}else{node.addEventListener('load',context.onScriptLoad,false);node.addEventListener('error',context.onScriptError,false);}
node.src=url;currentlyAddingScript=node;if(baseElement){head.insertBefore(node,baseElement);}else{head.appendChild(node);}
currentlyAddingScript=null;return node;}else if(isWebWorker){try{importScripts(url);context.completeLoad(moduleName);}catch(e){context.onError(makeError('importscripts','importScripts failed for '+
moduleName+' at '+url,e,[moduleName]));}}};function getInteractiveScript(){if(interactiveScript&&interactiveScript.readyState==='interactive'){return interactiveScript;}
eachReverse(scripts(),function(script){if(script.readyState==='interactive'){return(interactiveScript=script);}});return interactiveScript;}
if(isBrowser&&!cfg.skipDataMain){eachReverse(scripts(),function(script){if(!head){head=script.parentNode;}
dataMain=script.getAttribute('data-main');if(dataMain){mainScript=dataMain;if(!cfg.baseUrl){src=mainScript.split('/');mainScript=src.pop();subPath=src.length?src.join('/')+'/':'./';cfg.baseUrl=subPath;}
mainScript=mainScript.replace(jsSuffixRegExp,'');if(req.jsExtRegExp.test(mainScript)){mainScript=dataMain;}
cfg.deps=cfg.deps?cfg.deps.concat(mainScript):[mainScript];return true;}});}
define=function(name,deps,callback){var node,context;if(typeof name!=='string'){callback=deps;deps=name;name=null;}
if(!isArray(deps)){callback=deps;deps=null;}
if(!deps&&isFunction(callback)){deps=[];if(callback.length){callback.toString().replace(commentRegExp,'').replace(cjsRequireRegExp,function(match,dep){deps.push(dep);});deps=(callback.length===1?['require']:['require','exports','module']).concat(deps);}}
if(useInteractive){node=currentlyAddingScript||getInteractiveScript();if(node){if(!name){name=node.getAttribute('data-requiremodule');}
context=contexts[node.getAttribute('data-requirecontext')];}}
(context?context.defQueue:globalDefQueue).push([name,deps,callback]);};define.amd={jQuery:true};req.exec=function(text){return eval(text);};req(cfg);}(this));(function(window,undefined){var
readyList,rootjQuery,core_strundefined=typeof undefined,location=window.location,document=window.document,docElem=document.documentElement,_jQuery=window.jQuery,_$=window.$,class2type={},core_deletedIds=[],core_version="1.10.2",core_concat=core_deletedIds.concat,core_push=core_deletedIds.push,core_slice=core_deletedIds.slice,core_indexOf=core_deletedIds.indexOf,core_toString=class2type.toString,core_hasOwn=class2type.hasOwnProperty,core_trim=core_version.trim,jQuery=function(selector,context){return new jQuery.fn.init(selector,context,rootjQuery);},core_pnum=/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,core_rnotwhite=/\S+/g,rtrim=/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,rquickExpr=/^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,rsingleTag=/^<(\w+)\s*\/?>(?:<\/\1>|)$/,rvalidchars=/^[\],:{}\s]*$/,rvalidbraces=/(?:^|:|,)(?:\s*\[)+/g,rvalidescape=/\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g,rvalidtokens=/"[^"\\\r\n]*"|true|false|null|-?(?:\d+\.|)\d+(?:[eE][+-]?\d+|)/g,rmsPrefix=/^-ms-/,rdashAlpha=/-([\da-z])/gi,fcamelCase=function(all,letter){return letter.toUpperCase();},completed=function(event){if(document.addEventListener||event.type==="load"||document.readyState==="complete"){detach();jQuery.ready();}},detach=function(){if(document.addEventListener){document.removeEventListener("DOMContentLoaded",completed,false);window.removeEventListener("load",completed,false);}else{document.detachEvent("onreadystatechange",completed);window.detachEvent("onload",completed);}};jQuery.fn=jQuery.prototype={jquery:core_version,constructor:jQuery,init:function(selector,context,rootjQuery){var match,elem;if(!selector){return this;}
if(typeof selector==="string"){if(selector.charAt(0)==="<"&&selector.charAt(selector.length-1)===">"&&selector.length>=3){match=[null,selector,null];}else{match=rquickExpr.exec(selector);}
if(match&&(match[1]||!context)){if(match[1]){context=context instanceof jQuery?context[0]:context;jQuery.merge(this,jQuery.parseHTML(match[1],context&&context.nodeType?context.ownerDocument||context:document,true));if(rsingleTag.test(match[1])&&jQuery.isPlainObject(context)){for(match in context){if(jQuery.isFunction(this[match])){this[match](context[match]);}else{this.attr(match,context[match]);}}}
return this;}else{elem=document.getElementById(match[2]);if(elem&&elem.parentNode){if(elem.id!==match[2]){return rootjQuery.find(selector);}
this.length=1;this[0]=elem;}
this.context=document;this.selector=selector;return this;}}else if(!context||context.jquery){return(context||rootjQuery).find(selector);}else{return this.constructor(context).find(selector);}}else if(selector.nodeType){this.context=this[0]=selector;this.length=1;return this;}else if(jQuery.isFunction(selector)){return rootjQuery.ready(selector);}
if(selector.selector!==undefined){this.selector=selector.selector;this.context=selector.context;}
return jQuery.makeArray(selector,this);},selector:"",length:0,toArray:function(){return core_slice.call(this);},get:function(num){return num==null?this.toArray():(num<0?this[this.length+num]:this[num]);},pushStack:function(elems){var ret=jQuery.merge(this.constructor(),elems);ret.prevObject=this;ret.context=this.context;return ret;},each:function(callback,args){return jQuery.each(this,callback,args);},ready:function(fn){jQuery.ready.promise().done(fn);return this;},slice:function(){return this.pushStack(core_slice.apply(this,arguments));},first:function(){return this.eq(0);},last:function(){return this.eq(-1);},eq:function(i){var len=this.length,j=+i+(i<0?len:0);return this.pushStack(j>=0&&j<len?[this[j]]:[]);},map:function(callback){return this.pushStack(jQuery.map(this,function(elem,i){return callback.call(elem,i,elem);}));},end:function(){return this.prevObject||this.constructor(null);},push:core_push,sort:[].sort,splice:[].splice};jQuery.fn.init.prototype=jQuery.fn;jQuery.extend=jQuery.fn.extend=function(){var src,copyIsArray,copy,name,options,clone,target=arguments[0]||{},i=1,length=arguments.length,deep=false;if(typeof target==="boolean"){deep=target;target=arguments[1]||{};i=2;}
if(typeof target!=="object"&&!jQuery.isFunction(target)){target={};}
if(length===i){target=this;--i;}
for(;i<length;i++){if((options=arguments[i])!=null){for(name in options){src=target[name];copy=options[name];if(target===copy){continue;}
if(deep&&copy&&(jQuery.isPlainObject(copy)||(copyIsArray=jQuery.isArray(copy)))){if(copyIsArray){copyIsArray=false;clone=src&&jQuery.isArray(src)?src:[];}else{clone=src&&jQuery.isPlainObject(src)?src:{};}
target[name]=jQuery.extend(deep,clone,copy);}else if(copy!==undefined){target[name]=copy;}}}}
return target;};jQuery.extend({expando:"jQuery"+(core_version+Math.random()).replace(/\D/g,""),noConflict:function(deep){if(window.$===jQuery){window.$=_$;}
if(deep&&window.jQuery===jQuery){window.jQuery=_jQuery;}
return jQuery;},isReady:false,readyWait:1,holdReady:function(hold){if(hold){jQuery.readyWait++;}else{jQuery.ready(true);}},ready:function(wait){if(wait===true?--jQuery.readyWait:jQuery.isReady){return;}
if(!document.body){return setTimeout(jQuery.ready);}
jQuery.isReady=true;if(wait!==true&&--jQuery.readyWait>0){return;}
readyList.resolveWith(document,[jQuery]);if(jQuery.fn.trigger){jQuery(document).trigger("ready").off("ready");}},isFunction:function(obj){return jQuery.type(obj)==="function";},isArray:Array.isArray||function(obj){return jQuery.type(obj)==="array";},isWindow:function(obj){return obj!=null&&obj==obj.window;},isNumeric:function(obj){return!isNaN(parseFloat(obj))&&isFinite(obj);},type:function(obj){if(obj==null){return String(obj);}
return typeof obj==="object"||typeof obj==="function"?class2type[core_toString.call(obj)]||"object":typeof obj;},isPlainObject:function(obj){var key;if(!obj||jQuery.type(obj)!=="object"||obj.nodeType||jQuery.isWindow(obj)){return false;}
try{if(obj.constructor&&!core_hasOwn.call(obj,"constructor")&&!core_hasOwn.call(obj.constructor.prototype,"isPrototypeOf")){return false;}}catch(e){return false;}
if(jQuery.support.ownLast){for(key in obj){return core_hasOwn.call(obj,key);}}
for(key in obj){}
return key===undefined||core_hasOwn.call(obj,key);},isEmptyObject:function(obj){var name;for(name in obj){return false;}
return true;},error:function(msg){throw new Error(msg);},parseHTML:function(data,context,keepScripts){if(!data||typeof data!=="string"){return null;}
if(typeof context==="boolean"){keepScripts=context;context=false;}
context=context||document;var parsed=rsingleTag.exec(data),scripts=!keepScripts&&[];if(parsed){return[context.createElement(parsed[1])];}
parsed=jQuery.buildFragment([data],context,scripts);if(scripts){jQuery(scripts).remove();}
return jQuery.merge([],parsed.childNodes);},parseJSON:function(data){if(window.JSON&&window.JSON.parse){return window.JSON.parse(data);}
if(data===null){return data;}
if(typeof data==="string"){data=jQuery.trim(data);if(data){if(rvalidchars.test(data.replace(rvalidescape,"@").replace(rvalidtokens,"]").replace(rvalidbraces,""))){return(new Function("return "+data))();}}}
jQuery.error("Invalid JSON: "+data);},parseXML:function(data){var xml,tmp;if(!data||typeof data!=="string"){return null;}
try{if(window.DOMParser){tmp=new DOMParser();xml=tmp.parseFromString(data,"text/xml");}else{xml=new ActiveXObject("Microsoft.XMLDOM");xml.async="false";xml.loadXML(data);}}catch(e){xml=undefined;}
if(!xml||!xml.documentElement||xml.getElementsByTagName("parsererror").length){jQuery.error("Invalid XML: "+data);}
return xml;},noop:function(){},globalEval:function(data){if(data&&jQuery.trim(data)){(window.execScript||function(data){window["eval"].call(window,data);})(data);}},camelCase:function(string){return string.replace(rmsPrefix,"ms-").replace(rdashAlpha,fcamelCase);},nodeName:function(elem,name){return elem.nodeName&&elem.nodeName.toLowerCase()===name.toLowerCase();},each:function(obj,callback,args){var value,i=0,length=obj.length,isArray=isArraylike(obj);if(args){if(isArray){for(;i<length;i++){value=callback.apply(obj[i],args);if(value===false){break;}}}else{for(i in obj){value=callback.apply(obj[i],args);if(value===false){break;}}}}else{if(isArray){for(;i<length;i++){value=callback.call(obj[i],i,obj[i]);if(value===false){break;}}}else{for(i in obj){value=callback.call(obj[i],i,obj[i]);if(value===false){break;}}}}
return obj;},trim:core_trim&&!core_trim.call("\uFEFF\xA0")?function(text){return text==null?"":core_trim.call(text);}:function(text){return text==null?"":(text+"").replace(rtrim,"");},makeArray:function(arr,results){var ret=results||[];if(arr!=null){if(isArraylike(Object(arr))){jQuery.merge(ret,typeof arr==="string"?[arr]:arr);}else{core_push.call(ret,arr);}}
return ret;},inArray:function(elem,arr,i){var len;if(arr){if(core_indexOf){return core_indexOf.call(arr,elem,i);}
len=arr.length;i=i?i<0?Math.max(0,len+i):i:0;for(;i<len;i++){if(i in arr&&arr[i]===elem){return i;}}}
return-1;},merge:function(first,second){var l=second.length,i=first.length,j=0;if(typeof l==="number"){for(;j<l;j++){first[i++]=second[j];}}else{while(second[j]!==undefined){first[i++]=second[j++];}}
first.length=i;return first;},grep:function(elems,callback,inv){var retVal,ret=[],i=0,length=elems.length;inv=!!inv;for(;i<length;i++){retVal=!!callback(elems[i],i);if(inv!==retVal){ret.push(elems[i]);}}
return ret;},map:function(elems,callback,arg){var value,i=0,length=elems.length,isArray=isArraylike(elems),ret=[];if(isArray){for(;i<length;i++){value=callback(elems[i],i,arg);if(value!=null){ret[ret.length]=value;}}}else{for(i in elems){value=callback(elems[i],i,arg);if(value!=null){ret[ret.length]=value;}}}
return core_concat.apply([],ret);},guid:1,proxy:function(fn,context){var args,proxy,tmp;if(typeof context==="string"){tmp=fn[context];context=fn;fn=tmp;}
if(!jQuery.isFunction(fn)){return undefined;}
args=core_slice.call(arguments,2);proxy=function(){return fn.apply(context||this,args.concat(core_slice.call(arguments)));};proxy.guid=fn.guid=fn.guid||jQuery.guid++;return proxy;},access:function(elems,fn,key,value,chainable,emptyGet,raw){var i=0,length=elems.length,bulk=key==null;if(jQuery.type(key)==="object"){chainable=true;for(i in key){jQuery.access(elems,fn,i,key[i],true,emptyGet,raw);}}else if(value!==undefined){chainable=true;if(!jQuery.isFunction(value)){raw=true;}
if(bulk){if(raw){fn.call(elems,value);fn=null;}else{bulk=fn;fn=function(elem,key,value){return bulk.call(jQuery(elem),value);};}}
if(fn){for(;i<length;i++){fn(elems[i],key,raw?value:value.call(elems[i],i,fn(elems[i],key)));}}}
return chainable?elems:bulk?fn.call(elems):length?fn(elems[0],key):emptyGet;},now:function(){return(new Date()).getTime();},swap:function(elem,options,callback,args){var ret,name,old={};for(name in options){old[name]=elem.style[name];elem.style[name]=options[name];}
ret=callback.apply(elem,args||[]);for(name in options){elem.style[name]=old[name];}
return ret;}});jQuery.ready.promise=function(obj){if(!readyList){readyList=jQuery.Deferred();if(document.readyState==="complete"){setTimeout(jQuery.ready);}else if(document.addEventListener){document.addEventListener("DOMContentLoaded",completed,false);window.addEventListener("load",completed,false);}else{document.attachEvent("onreadystatechange",completed);window.attachEvent("onload",completed);var top=false;try{top=window.frameElement==null&&document.documentElement;}catch(e){}
if(top&&top.doScroll){(function doScrollCheck(){if(!jQuery.isReady){try{top.doScroll("left");}catch(e){return setTimeout(doScrollCheck,50);}
detach();jQuery.ready();}})();}}}
return readyList.promise(obj);};jQuery.each("Boolean Number String Function Array Date RegExp Object Error".split(" "),function(i,name){class2type["[object "+name+"]"]=name.toLowerCase();});function isArraylike(obj){var length=obj.length,type=jQuery.type(obj);if(jQuery.isWindow(obj)){return false;}
if(obj.nodeType===1&&length){return true;}
return type==="array"||type!=="function"&&(length===0||typeof length==="number"&&length>0&&(length-1)in obj);}
rootjQuery=jQuery(document);(function(window,undefined){var i,support,cachedruns,Expr,getText,isXML,compile,outermostContext,sortInput,setDocument,document,docElem,documentIsHTML,rbuggyQSA,rbuggyMatches,matches,contains,expando="sizzle"+-(new Date()),preferredDoc=window.document,dirruns=0,done=0,classCache=createCache(),tokenCache=createCache(),compilerCache=createCache(),hasDuplicate=false,sortOrder=function(a,b){if(a===b){hasDuplicate=true;return 0;}
return 0;},strundefined=typeof undefined,MAX_NEGATIVE=1<<31,hasOwn=({}).hasOwnProperty,arr=[],pop=arr.pop,push_native=arr.push,push=arr.push,slice=arr.slice,indexOf=arr.indexOf||function(elem){var i=0,len=this.length;for(;i<len;i++){if(this[i]===elem){return i;}}
return-1;},booleans="checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",whitespace="[\\x20\\t\\r\\n\\f]",characterEncoding="(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",identifier=characterEncoding.replace("w","w#"),attributes="\\["+whitespace+"*("+characterEncoding+")"+whitespace+"*(?:([*^$|!~]?=)"+whitespace+"*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|("+identifier+")|)|)"+whitespace+"*\\]",pseudos=":("+characterEncoding+")(?:\\(((['\"])((?:\\\\.|[^\\\\])*?)\\3|((?:\\\\.|[^\\\\()[\\]]|"+attributes.replace(3,8)+")*)|.*)\\)|)",rtrim=new RegExp("^"+whitespace+"+|((?:^|[^\\\\])(?:\\\\.)*)"+whitespace+"+$","g"),rcomma=new RegExp("^"+whitespace+"*,"+whitespace+"*"),rcombinators=new RegExp("^"+whitespace+"*([>+~]|"+whitespace+")"+whitespace+"*"),rsibling=new RegExp(whitespace+"*[+~]"),rattributeQuotes=new RegExp("="+whitespace+"*([^\\]'\"]*)"+whitespace+"*\\]","g"),rpseudo=new RegExp(pseudos),ridentifier=new RegExp("^"+identifier+"$"),matchExpr={"ID":new RegExp("^#("+characterEncoding+")"),"CLASS":new RegExp("^\\.("+characterEncoding+")"),"TAG":new RegExp("^("+characterEncoding.replace("w","w*")+")"),"ATTR":new RegExp("^"+attributes),"PSEUDO":new RegExp("^"+pseudos),"CHILD":new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\("+whitespace+"*(even|odd|(([+-]|)(\\d*)n|)"+whitespace+"*(?:([+-]|)"+whitespace+"*(\\d+)|))"+whitespace+"*\\)|)","i"),"bool":new RegExp("^(?:"+booleans+")$","i"),"needsContext":new RegExp("^"+whitespace+"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\("+
whitespace+"*((?:-\\d)?\\d*)"+whitespace+"*\\)|)(?=[^-]|$)","i")},rnative=/^[^{]+\{\s*\[native \w/,rquickExpr=/^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,rinputs=/^(?:input|select|textarea|button)$/i,rheader=/^h\d$/i,rescape=/'|\\/g,runescape=new RegExp("\\\\([\\da-f]{1,6}"+whitespace+"?|("+whitespace+")|.)","ig"),funescape=function(_,escaped,escapedWhitespace){var high="0x"+escaped-0x10000;return high!==high||escapedWhitespace?escaped:high<0?String.fromCharCode(high+0x10000):String.fromCharCode(high>>10|0xD800,high&0x3FF|0xDC00);};try{push.apply((arr=slice.call(preferredDoc.childNodes)),preferredDoc.childNodes);arr[preferredDoc.childNodes.length].nodeType;}catch(e){push={apply:arr.length?function(target,els){push_native.apply(target,slice.call(els));}:function(target,els){var j=target.length,i=0;while((target[j++]=els[i++])){}
target.length=j-1;}};}
function Sizzle(selector,context,results,seed){var match,elem,m,nodeType,i,groups,old,nid,newContext,newSelector;if((context?context.ownerDocument||context:preferredDoc)!==document){setDocument(context);}
context=context||document;results=results||[];if(!selector||typeof selector!=="string"){return results;}
if((nodeType=context.nodeType)!==1&&nodeType!==9){return[];}
if(documentIsHTML&&!seed){if((match=rquickExpr.exec(selector))){if((m=match[1])){if(nodeType===9){elem=context.getElementById(m);if(elem&&elem.parentNode){if(elem.id===m){results.push(elem);return results;}}else{return results;}}else{if(context.ownerDocument&&(elem=context.ownerDocument.getElementById(m))&&contains(context,elem)&&elem.id===m){results.push(elem);return results;}}}else if(match[2]){push.apply(results,context.getElementsByTagName(selector));return results;}else if((m=match[3])&&support.getElementsByClassName&&context.getElementsByClassName){push.apply(results,context.getElementsByClassName(m));return results;}}
if(support.qsa&&(!rbuggyQSA||!rbuggyQSA.test(selector))){nid=old=expando;newContext=context;newSelector=nodeType===9&&selector;if(nodeType===1&&context.nodeName.toLowerCase()!=="object"){groups=tokenize(selector);if((old=context.getAttribute("id"))){nid=old.replace(rescape,"\\$&");}else{context.setAttribute("id",nid);}
nid="[id='"+nid+"'] ";i=groups.length;while(i--){groups[i]=nid+toSelector(groups[i]);}
newContext=rsibling.test(selector)&&context.parentNode||context;newSelector=groups.join(",");}
if(newSelector){try{push.apply(results,newContext.querySelectorAll(newSelector));return results;}catch(qsaError){}finally{if(!old){context.removeAttribute("id");}}}}}
return select(selector.replace(rtrim,"$1"),context,results,seed);}
function createCache(){var keys=[];function cache(key,value){if(keys.push(key+=" ")>Expr.cacheLength){delete cache[keys.shift()];}
return(cache[key]=value);}
return cache;}
function markFunction(fn){fn[expando]=true;return fn;}
function assert(fn){var div=document.createElement("div");try{return!!fn(div);}catch(e){return false;}finally{if(div.parentNode){div.parentNode.removeChild(div);}
div=null;}}
function addHandle(attrs,handler){var arr=attrs.split("|"),i=attrs.length;while(i--){Expr.attrHandle[arr[i]]=handler;}}
function siblingCheck(a,b){var cur=b&&a,diff=cur&&a.nodeType===1&&b.nodeType===1&&(~b.sourceIndex||MAX_NEGATIVE)-
(~a.sourceIndex||MAX_NEGATIVE);if(diff){return diff;}
if(cur){while((cur=cur.nextSibling)){if(cur===b){return-1;}}}
return a?1:-1;}
function createInputPseudo(type){return function(elem){var name=elem.nodeName.toLowerCase();return name==="input"&&elem.type===type;};}
function createButtonPseudo(type){return function(elem){var name=elem.nodeName.toLowerCase();return(name==="input"||name==="button")&&elem.type===type;};}
function createPositionalPseudo(fn){return markFunction(function(argument){argument=+argument;return markFunction(function(seed,matches){var j,matchIndexes=fn([],seed.length,argument),i=matchIndexes.length;while(i--){if(seed[(j=matchIndexes[i])]){seed[j]=!(matches[j]=seed[j]);}}});});}
isXML=Sizzle.isXML=function(elem){var documentElement=elem&&(elem.ownerDocument||elem).documentElement;return documentElement?documentElement.nodeName!=="HTML":false;};support=Sizzle.support={};setDocument=Sizzle.setDocument=function(node){var doc=node?node.ownerDocument||node:preferredDoc,parent=doc.defaultView;if(doc===document||doc.nodeType!==9||!doc.documentElement){return document;}
document=doc;docElem=doc.documentElement;documentIsHTML=!isXML(doc);if(parent&&parent.attachEvent&&parent!==parent.top){parent.attachEvent("onbeforeunload",function(){setDocument();});}
support.attributes=assert(function(div){div.className="i";return!div.getAttribute("className");});support.getElementsByTagName=assert(function(div){div.appendChild(doc.createComment(""));return!div.getElementsByTagName("*").length;});support.getElementsByClassName=assert(function(div){div.innerHTML="<div class='a'></div><div class='a i'></div>";div.firstChild.className="i";return div.getElementsByClassName("i").length===2;});support.getById=assert(function(div){docElem.appendChild(div).id=expando;return!doc.getElementsByName||!doc.getElementsByName(expando).length;});if(support.getById){Expr.find["ID"]=function(id,context){if(typeof context.getElementById!==strundefined&&documentIsHTML){var m=context.getElementById(id);return m&&m.parentNode?[m]:[];}};Expr.filter["ID"]=function(id){var attrId=id.replace(runescape,funescape);return function(elem){return elem.getAttribute("id")===attrId;};};}else{delete Expr.find["ID"];Expr.filter["ID"]=function(id){var attrId=id.replace(runescape,funescape);return function(elem){var node=typeof elem.getAttributeNode!==strundefined&&elem.getAttributeNode("id");return node&&node.value===attrId;};};}
Expr.find["TAG"]=support.getElementsByTagName?function(tag,context){if(typeof context.getElementsByTagName!==strundefined){return context.getElementsByTagName(tag);}}:function(tag,context){var elem,tmp=[],i=0,results=context.getElementsByTagName(tag);if(tag==="*"){while((elem=results[i++])){if(elem.nodeType===1){tmp.push(elem);}}
return tmp;}
return results;};Expr.find["CLASS"]=support.getElementsByClassName&&function(className,context){if(typeof context.getElementsByClassName!==strundefined&&documentIsHTML){return context.getElementsByClassName(className);}};rbuggyMatches=[];rbuggyQSA=[];if((support.qsa=rnative.test(doc.querySelectorAll))){assert(function(div){div.innerHTML="<select><option selected=''></option></select>";if(!div.querySelectorAll("[selected]").length){rbuggyQSA.push("\\["+whitespace+"*(?:value|"+booleans+")");}
if(!div.querySelectorAll(":checked").length){rbuggyQSA.push(":checked");}});assert(function(div){var input=doc.createElement("input");input.setAttribute("type","hidden");div.appendChild(input).setAttribute("t","");if(div.querySelectorAll("[t^='']").length){rbuggyQSA.push("[*^$]="+whitespace+"*(?:''|\"\")");}
if(!div.querySelectorAll(":enabled").length){rbuggyQSA.push(":enabled",":disabled");}
div.querySelectorAll("*,:x");rbuggyQSA.push(",.*:");});}
if((support.matchesSelector=rnative.test((matches=docElem.webkitMatchesSelector||docElem.mozMatchesSelector||docElem.oMatchesSelector||docElem.msMatchesSelector)))){assert(function(div){support.disconnectedMatch=matches.call(div,"div");matches.call(div,"[s!='']:x");rbuggyMatches.push("!=",pseudos);});}
rbuggyQSA=rbuggyQSA.length&&new RegExp(rbuggyQSA.join("|"));rbuggyMatches=rbuggyMatches.length&&new RegExp(rbuggyMatches.join("|"));contains=rnative.test(docElem.contains)||docElem.compareDocumentPosition?function(a,b){var adown=a.nodeType===9?a.documentElement:a,bup=b&&b.parentNode;return a===bup||!!(bup&&bup.nodeType===1&&(adown.contains?adown.contains(bup):a.compareDocumentPosition&&a.compareDocumentPosition(bup)&16));}:function(a,b){if(b){while((b=b.parentNode)){if(b===a){return true;}}}
return false;};sortOrder=docElem.compareDocumentPosition?function(a,b){if(a===b){hasDuplicate=true;return 0;}
var compare=b.compareDocumentPosition&&a.compareDocumentPosition&&a.compareDocumentPosition(b);if(compare){if(compare&1||(!support.sortDetached&&b.compareDocumentPosition(a)===compare)){if(a===doc||contains(preferredDoc,a)){return-1;}
if(b===doc||contains(preferredDoc,b)){return 1;}
return sortInput?(indexOf.call(sortInput,a)-indexOf.call(sortInput,b)):0;}
return compare&4?-1:1;}
return a.compareDocumentPosition?-1:1;}:function(a,b){var cur,i=0,aup=a.parentNode,bup=b.parentNode,ap=[a],bp=[b];if(a===b){hasDuplicate=true;return 0;}else if(!aup||!bup){return a===doc?-1:b===doc?1:aup?-1:bup?1:sortInput?(indexOf.call(sortInput,a)-indexOf.call(sortInput,b)):0;}else if(aup===bup){return siblingCheck(a,b);}
cur=a;while((cur=cur.parentNode)){ap.unshift(cur);}
cur=b;while((cur=cur.parentNode)){bp.unshift(cur);}
while(ap[i]===bp[i]){i++;}
return i?siblingCheck(ap[i],bp[i]):ap[i]===preferredDoc?-1:bp[i]===preferredDoc?1:0;};return doc;};Sizzle.matches=function(expr,elements){return Sizzle(expr,null,null,elements);};Sizzle.matchesSelector=function(elem,expr){if((elem.ownerDocument||elem)!==document){setDocument(elem);}
expr=expr.replace(rattributeQuotes,"='$1']");if(support.matchesSelector&&documentIsHTML&&(!rbuggyMatches||!rbuggyMatches.test(expr))&&(!rbuggyQSA||!rbuggyQSA.test(expr))){try{var ret=matches.call(elem,expr);if(ret||support.disconnectedMatch||elem.document&&elem.document.nodeType!==11){return ret;}}catch(e){}}
return Sizzle(expr,document,null,[elem]).length>0;};Sizzle.contains=function(context,elem){if((context.ownerDocument||context)!==document){setDocument(context);}
return contains(context,elem);};Sizzle.attr=function(elem,name){if((elem.ownerDocument||elem)!==document){setDocument(elem);}
var fn=Expr.attrHandle[name.toLowerCase()],val=fn&&hasOwn.call(Expr.attrHandle,name.toLowerCase())?fn(elem,name,!documentIsHTML):undefined;return val===undefined?support.attributes||!documentIsHTML?elem.getAttribute(name):(val=elem.getAttributeNode(name))&&val.specified?val.value:null:val;};Sizzle.error=function(msg){throw new Error("Syntax error, unrecognized expression: "+msg);};Sizzle.uniqueSort=function(results){var elem,duplicates=[],j=0,i=0;hasDuplicate=!support.detectDuplicates;sortInput=!support.sortStable&&results.slice(0);results.sort(sortOrder);if(hasDuplicate){while((elem=results[i++])){if(elem===results[i]){j=duplicates.push(i);}}
while(j--){results.splice(duplicates[j],1);}}
return results;};getText=Sizzle.getText=function(elem){var node,ret="",i=0,nodeType=elem.nodeType;if(!nodeType){for(;(node=elem[i]);i++){ret+=getText(node);}}else if(nodeType===1||nodeType===9||nodeType===11){if(typeof elem.textContent==="string"){return elem.textContent;}else{for(elem=elem.firstChild;elem;elem=elem.nextSibling){ret+=getText(elem);}}}else if(nodeType===3||nodeType===4){return elem.nodeValue;}
return ret;};Expr=Sizzle.selectors={cacheLength:50,createPseudo:markFunction,match:matchExpr,attrHandle:{},find:{},relative:{">":{dir:"parentNode",first:true}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:true},"~":{dir:"previousSibling"}},preFilter:{"ATTR":function(match){match[1]=match[1].replace(runescape,funescape);match[3]=(match[4]||match[5]||"").replace(runescape,funescape);if(match[2]==="~="){match[3]=" "+match[3]+" ";}
return match.slice(0,4);},"CHILD":function(match){match[1]=match[1].toLowerCase();if(match[1].slice(0,3)==="nth"){if(!match[3]){Sizzle.error(match[0]);}
match[4]=+(match[4]?match[5]+(match[6]||1):2*(match[3]==="even"||match[3]==="odd"));match[5]=+((match[7]+match[8])||match[3]==="odd");}else if(match[3]){Sizzle.error(match[0]);}
return match;},"PSEUDO":function(match){var excess,unquoted=!match[5]&&match[2];if(matchExpr["CHILD"].test(match[0])){return null;}
if(match[3]&&match[4]!==undefined){match[2]=match[4];}else if(unquoted&&rpseudo.test(unquoted)&&(excess=tokenize(unquoted,true))&&(excess=unquoted.indexOf(")",unquoted.length-excess)-unquoted.length)){match[0]=match[0].slice(0,excess);match[2]=unquoted.slice(0,excess);}
return match.slice(0,3);}},filter:{"TAG":function(nodeNameSelector){var nodeName=nodeNameSelector.replace(runescape,funescape).toLowerCase();return nodeNameSelector==="*"?function(){return true;}:function(elem){return elem.nodeName&&elem.nodeName.toLowerCase()===nodeName;};},"CLASS":function(className){var pattern=classCache[className+" "];return pattern||(pattern=new RegExp("(^|"+whitespace+")"+className+"("+whitespace+"|$)"))&&classCache(className,function(elem){return pattern.test(typeof elem.className==="string"&&elem.className||typeof elem.getAttribute!==strundefined&&elem.getAttribute("class")||"");});},"ATTR":function(name,operator,check){return function(elem){var result=Sizzle.attr(elem,name);if(result==null){return operator==="!=";}
if(!operator){return true;}
result+="";return operator==="="?result===check:operator==="!="?result!==check:operator==="^="?check&&result.indexOf(check)===0:operator==="*="?check&&result.indexOf(check)>-1:operator==="$="?check&&result.slice(-check.length)===check:operator==="~="?(" "+result+" ").indexOf(check)>-1:operator==="|="?result===check||result.slice(0,check.length+1)===check+"-":false;};},"CHILD":function(type,what,argument,first,last){var simple=type.slice(0,3)!=="nth",forward=type.slice(-4)!=="last",ofType=what==="of-type";return first===1&&last===0?function(elem){return!!elem.parentNode;}:function(elem,context,xml){var cache,outerCache,node,diff,nodeIndex,start,dir=simple!==forward?"nextSibling":"previousSibling",parent=elem.parentNode,name=ofType&&elem.nodeName.toLowerCase(),useCache=!xml&&!ofType;if(parent){if(simple){while(dir){node=elem;while((node=node[dir])){if(ofType?node.nodeName.toLowerCase()===name:node.nodeType===1){return false;}}
start=dir=type==="only"&&!start&&"nextSibling";}
return true;}
start=[forward?parent.firstChild:parent.lastChild];if(forward&&useCache){outerCache=parent[expando]||(parent[expando]={});cache=outerCache[type]||[];nodeIndex=cache[0]===dirruns&&cache[1];diff=cache[0]===dirruns&&cache[2];node=nodeIndex&&parent.childNodes[nodeIndex];while((node=++nodeIndex&&node&&node[dir]||(diff=nodeIndex=0)||start.pop())){if(node.nodeType===1&&++diff&&node===elem){outerCache[type]=[dirruns,nodeIndex,diff];break;}}}else if(useCache&&(cache=(elem[expando]||(elem[expando]={}))[type])&&cache[0]===dirruns){diff=cache[1];}else{while((node=++nodeIndex&&node&&node[dir]||(diff=nodeIndex=0)||start.pop())){if((ofType?node.nodeName.toLowerCase()===name:node.nodeType===1)&&++diff){if(useCache){(node[expando]||(node[expando]={}))[type]=[dirruns,diff];}
if(node===elem){break;}}}}
diff-=last;return diff===first||(diff%first===0&&diff/first>=0);}};},"PSEUDO":function(pseudo,argument){var args,fn=Expr.pseudos[pseudo]||Expr.setFilters[pseudo.toLowerCase()]||Sizzle.error("unsupported pseudo: "+pseudo);if(fn[expando]){return fn(argument);}
if(fn.length>1){args=[pseudo,pseudo,"",argument];return Expr.setFilters.hasOwnProperty(pseudo.toLowerCase())?markFunction(function(seed,matches){var idx,matched=fn(seed,argument),i=matched.length;while(i--){idx=indexOf.call(seed,matched[i]);seed[idx]=!(matches[idx]=matched[i]);}}):function(elem){return fn(elem,0,args);};}
return fn;}},pseudos:{"not":markFunction(function(selector){var input=[],results=[],matcher=compile(selector.replace(rtrim,"$1"));return matcher[expando]?markFunction(function(seed,matches,context,xml){var elem,unmatched=matcher(seed,null,xml,[]),i=seed.length;while(i--){if((elem=unmatched[i])){seed[i]=!(matches[i]=elem);}}}):function(elem,context,xml){input[0]=elem;matcher(input,null,xml,results);return!results.pop();};}),"has":markFunction(function(selector){return function(elem){return Sizzle(selector,elem).length>0;};}),"contains":markFunction(function(text){return function(elem){return(elem.textContent||elem.innerText||getText(elem)).indexOf(text)>-1;};}),"lang":markFunction(function(lang){if(!ridentifier.test(lang||"")){Sizzle.error("unsupported lang: "+lang);}
lang=lang.replace(runescape,funescape).toLowerCase();return function(elem){var elemLang;do{if((elemLang=documentIsHTML?elem.lang:elem.getAttribute("xml:lang")||elem.getAttribute("lang"))){elemLang=elemLang.toLowerCase();return elemLang===lang||elemLang.indexOf(lang+"-")===0;}}while((elem=elem.parentNode)&&elem.nodeType===1);return false;};}),"target":function(elem){var hash=window.location&&window.location.hash;return hash&&hash.slice(1)===elem.id;},"root":function(elem){return elem===docElem;},"focus":function(elem){return elem===document.activeElement&&(!document.hasFocus||document.hasFocus())&&!!(elem.type||elem.href||~elem.tabIndex);},"enabled":function(elem){return elem.disabled===false;},"disabled":function(elem){return elem.disabled===true;},"checked":function(elem){var nodeName=elem.nodeName.toLowerCase();return(nodeName==="input"&&!!elem.checked)||(nodeName==="option"&&!!elem.selected);},"selected":function(elem){if(elem.parentNode){elem.parentNode.selectedIndex;}
return elem.selected===true;},"empty":function(elem){for(elem=elem.firstChild;elem;elem=elem.nextSibling){if(elem.nodeName>"@"||elem.nodeType===3||elem.nodeType===4){return false;}}
return true;},"parent":function(elem){return!Expr.pseudos["empty"](elem);},"header":function(elem){return rheader.test(elem.nodeName);},"input":function(elem){return rinputs.test(elem.nodeName);},"button":function(elem){var name=elem.nodeName.toLowerCase();return name==="input"&&elem.type==="button"||name==="button";},"text":function(elem){var attr;return elem.nodeName.toLowerCase()==="input"&&elem.type==="text"&&((attr=elem.getAttribute("type"))==null||attr.toLowerCase()===elem.type);},"first":createPositionalPseudo(function(){return[0];}),"last":createPositionalPseudo(function(matchIndexes,length){return[length-1];}),"eq":createPositionalPseudo(function(matchIndexes,length,argument){return[argument<0?argument+length:argument];}),"even":createPositionalPseudo(function(matchIndexes,length){var i=0;for(;i<length;i+=2){matchIndexes.push(i);}
return matchIndexes;}),"odd":createPositionalPseudo(function(matchIndexes,length){var i=1;for(;i<length;i+=2){matchIndexes.push(i);}
return matchIndexes;}),"lt":createPositionalPseudo(function(matchIndexes,length,argument){var i=argument<0?argument+length:argument;for(;--i>=0;){matchIndexes.push(i);}
return matchIndexes;}),"gt":createPositionalPseudo(function(matchIndexes,length,argument){var i=argument<0?argument+length:argument;for(;++i<length;){matchIndexes.push(i);}
return matchIndexes;})}};Expr.pseudos["nth"]=Expr.pseudos["eq"];for(i in{radio:true,checkbox:true,file:true,password:true,image:true}){Expr.pseudos[i]=createInputPseudo(i);}
for(i in{submit:true,reset:true}){Expr.pseudos[i]=createButtonPseudo(i);}
function setFilters(){}
setFilters.prototype=Expr.filters=Expr.pseudos;Expr.setFilters=new setFilters();function tokenize(selector,parseOnly){var matched,match,tokens,type,soFar,groups,preFilters,cached=tokenCache[selector+" "];if(cached){return parseOnly?0:cached.slice(0);}
soFar=selector;groups=[];preFilters=Expr.preFilter;while(soFar){if(!matched||(match=rcomma.exec(soFar))){if(match){soFar=soFar.slice(match[0].length)||soFar;}
groups.push(tokens=[]);}
matched=false;if((match=rcombinators.exec(soFar))){matched=match.shift();tokens.push({value:matched,type:match[0].replace(rtrim," ")});soFar=soFar.slice(matched.length);}
for(type in Expr.filter){if((match=matchExpr[type].exec(soFar))&&(!preFilters[type]||(match=preFilters[type](match)))){matched=match.shift();tokens.push({value:matched,type:type,matches:match});soFar=soFar.slice(matched.length);}}
if(!matched){break;}}
return parseOnly?soFar.length:soFar?Sizzle.error(selector):tokenCache(selector,groups).slice(0);}
function toSelector(tokens){var i=0,len=tokens.length,selector="";for(;i<len;i++){selector+=tokens[i].value;}
return selector;}
function addCombinator(matcher,combinator,base){var dir=combinator.dir,checkNonElements=base&&dir==="parentNode",doneName=done++;return combinator.first?function(elem,context,xml){while((elem=elem[dir])){if(elem.nodeType===1||checkNonElements){return matcher(elem,context,xml);}}}:function(elem,context,xml){var data,cache,outerCache,dirkey=dirruns+" "+doneName;if(xml){while((elem=elem[dir])){if(elem.nodeType===1||checkNonElements){if(matcher(elem,context,xml)){return true;}}}}else{while((elem=elem[dir])){if(elem.nodeType===1||checkNonElements){outerCache=elem[expando]||(elem[expando]={});if((cache=outerCache[dir])&&cache[0]===dirkey){if((data=cache[1])===true||data===cachedruns){return data===true;}}else{cache=outerCache[dir]=[dirkey];cache[1]=matcher(elem,context,xml)||cachedruns;if(cache[1]===true){return true;}}}}}};}
function elementMatcher(matchers){return matchers.length>1?function(elem,context,xml){var i=matchers.length;while(i--){if(!matchers[i](elem,context,xml)){return false;}}
return true;}:matchers[0];}
function condense(unmatched,map,filter,context,xml){var elem,newUnmatched=[],i=0,len=unmatched.length,mapped=map!=null;for(;i<len;i++){if((elem=unmatched[i])){if(!filter||filter(elem,context,xml)){newUnmatched.push(elem);if(mapped){map.push(i);}}}}
return newUnmatched;}
function setMatcher(preFilter,selector,matcher,postFilter,postFinder,postSelector){if(postFilter&&!postFilter[expando]){postFilter=setMatcher(postFilter);}
if(postFinder&&!postFinder[expando]){postFinder=setMatcher(postFinder,postSelector);}
return markFunction(function(seed,results,context,xml){var temp,i,elem,preMap=[],postMap=[],preexisting=results.length,elems=seed||multipleContexts(selector||"*",context.nodeType?[context]:context,[]),matcherIn=preFilter&&(seed||!selector)?condense(elems,preMap,preFilter,context,xml):elems,matcherOut=matcher?postFinder||(seed?preFilter:preexisting||postFilter)?[]:results:matcherIn;if(matcher){matcher(matcherIn,matcherOut,context,xml);}
if(postFilter){temp=condense(matcherOut,postMap);postFilter(temp,[],context,xml);i=temp.length;while(i--){if((elem=temp[i])){matcherOut[postMap[i]]=!(matcherIn[postMap[i]]=elem);}}}
if(seed){if(postFinder||preFilter){if(postFinder){temp=[];i=matcherOut.length;while(i--){if((elem=matcherOut[i])){temp.push((matcherIn[i]=elem));}}
postFinder(null,(matcherOut=[]),temp,xml);}
i=matcherOut.length;while(i--){if((elem=matcherOut[i])&&(temp=postFinder?indexOf.call(seed,elem):preMap[i])>-1){seed[temp]=!(results[temp]=elem);}}}}else{matcherOut=condense(matcherOut===results?matcherOut.splice(preexisting,matcherOut.length):matcherOut);if(postFinder){postFinder(null,results,matcherOut,xml);}else{push.apply(results,matcherOut);}}});}
function matcherFromTokens(tokens){var checkContext,matcher,j,len=tokens.length,leadingRelative=Expr.relative[tokens[0].type],implicitRelative=leadingRelative||Expr.relative[" "],i=leadingRelative?1:0,matchContext=addCombinator(function(elem){return elem===checkContext;},implicitRelative,true),matchAnyContext=addCombinator(function(elem){return indexOf.call(checkContext,elem)>-1;},implicitRelative,true),matchers=[function(elem,context,xml){return(!leadingRelative&&(xml||context!==outermostContext))||((checkContext=context).nodeType?matchContext(elem,context,xml):matchAnyContext(elem,context,xml));}];for(;i<len;i++){if((matcher=Expr.relative[tokens[i].type])){matchers=[addCombinator(elementMatcher(matchers),matcher)];}else{matcher=Expr.filter[tokens[i].type].apply(null,tokens[i].matches);if(matcher[expando]){j=++i;for(;j<len;j++){if(Expr.relative[tokens[j].type]){break;}}
return setMatcher(i>1&&elementMatcher(matchers),i>1&&toSelector(tokens.slice(0,i-1).concat({value:tokens[i-2].type===" "?"*":""})).replace(rtrim,"$1"),matcher,i<j&&matcherFromTokens(tokens.slice(i,j)),j<len&&matcherFromTokens((tokens=tokens.slice(j))),j<len&&toSelector(tokens));}
matchers.push(matcher);}}
return elementMatcher(matchers);}
function matcherFromGroupMatchers(elementMatchers,setMatchers){var matcherCachedRuns=0,bySet=setMatchers.length>0,byElement=elementMatchers.length>0,superMatcher=function(seed,context,xml,results,expandContext){var elem,j,matcher,setMatched=[],matchedCount=0,i="0",unmatched=seed&&[],outermost=expandContext!=null,contextBackup=outermostContext,elems=seed||byElement&&Expr.find["TAG"]("*",expandContext&&context.parentNode||context),dirrunsUnique=(dirruns+=contextBackup==null?1:Math.random()||0.1);if(outermost){outermostContext=context!==document&&context;cachedruns=matcherCachedRuns;}
for(;(elem=elems[i])!=null;i++){if(byElement&&elem){j=0;while((matcher=elementMatchers[j++])){if(matcher(elem,context,xml)){results.push(elem);break;}}
if(outermost){dirruns=dirrunsUnique;cachedruns=++matcherCachedRuns;}}
if(bySet){if((elem=!matcher&&elem)){matchedCount--;}
if(seed){unmatched.push(elem);}}}
matchedCount+=i;if(bySet&&i!==matchedCount){j=0;while((matcher=setMatchers[j++])){matcher(unmatched,setMatched,context,xml);}
if(seed){if(matchedCount>0){while(i--){if(!(unmatched[i]||setMatched[i])){setMatched[i]=pop.call(results);}}}
setMatched=condense(setMatched);}
push.apply(results,setMatched);if(outermost&&!seed&&setMatched.length>0&&(matchedCount+setMatchers.length)>1){Sizzle.uniqueSort(results);}}
if(outermost){dirruns=dirrunsUnique;outermostContext=contextBackup;}
return unmatched;};return bySet?markFunction(superMatcher):superMatcher;}
compile=Sizzle.compile=function(selector,group){var i,setMatchers=[],elementMatchers=[],cached=compilerCache[selector+" "];if(!cached){if(!group){group=tokenize(selector);}
i=group.length;while(i--){cached=matcherFromTokens(group[i]);if(cached[expando]){setMatchers.push(cached);}else{elementMatchers.push(cached);}}
cached=compilerCache(selector,matcherFromGroupMatchers(elementMatchers,setMatchers));}
return cached;};function multipleContexts(selector,contexts,results){var i=0,len=contexts.length;for(;i<len;i++){Sizzle(selector,contexts[i],results);}
return results;}
function select(selector,context,results,seed){var i,tokens,token,type,find,match=tokenize(selector);if(!seed){if(match.length===1){tokens=match[0]=match[0].slice(0);if(tokens.length>2&&(token=tokens[0]).type==="ID"&&support.getById&&context.nodeType===9&&documentIsHTML&&Expr.relative[tokens[1].type]){context=(Expr.find["ID"](token.matches[0].replace(runescape,funescape),context)||[])[0];if(!context){return results;}
selector=selector.slice(tokens.shift().value.length);}
i=matchExpr["needsContext"].test(selector)?0:tokens.length;while(i--){token=tokens[i];if(Expr.relative[(type=token.type)]){break;}
if((find=Expr.find[type])){if((seed=find(token.matches[0].replace(runescape,funescape),rsibling.test(tokens[0].type)&&context.parentNode||context))){tokens.splice(i,1);selector=seed.length&&toSelector(tokens);if(!selector){push.apply(results,seed);return results;}
break;}}}}}
compile(selector,match)(seed,context,!documentIsHTML,results,rsibling.test(selector));return results;}
support.sortStable=expando.split("").sort(sortOrder).join("")===expando;support.detectDuplicates=hasDuplicate;setDocument();support.sortDetached=assert(function(div1){return div1.compareDocumentPosition(document.createElement("div"))&1;});if(!assert(function(div){div.innerHTML="<a href='#'></a>";return div.firstChild.getAttribute("href")==="#";})){addHandle("type|href|height|width",function(elem,name,isXML){if(!isXML){return elem.getAttribute(name,name.toLowerCase()==="type"?1:2);}});}
if(!support.attributes||!assert(function(div){div.innerHTML="<input/>";div.firstChild.setAttribute("value","");return div.firstChild.getAttribute("value")==="";})){addHandle("value",function(elem,name,isXML){if(!isXML&&elem.nodeName.toLowerCase()==="input"){return elem.defaultValue;}});}
if(!assert(function(div){return div.getAttribute("disabled")==null;})){addHandle(booleans,function(elem,name,isXML){var val;if(!isXML){return(val=elem.getAttributeNode(name))&&val.specified?val.value:elem[name]===true?name.toLowerCase():null;}});}
jQuery.find=Sizzle;jQuery.expr=Sizzle.selectors;jQuery.expr[":"]=jQuery.expr.pseudos;jQuery.unique=Sizzle.uniqueSort;jQuery.text=Sizzle.getText;jQuery.isXMLDoc=Sizzle.isXML;jQuery.contains=Sizzle.contains;})(window);var optionsCache={};function createOptions(options){var object=optionsCache[options]={};jQuery.each(options.match(core_rnotwhite)||[],function(_,flag){object[flag]=true;});return object;}
jQuery.Callbacks=function(options){options=typeof options==="string"?(optionsCache[options]||createOptions(options)):jQuery.extend({},options);var
firing,memory,fired,firingLength,firingIndex,firingStart,list=[],stack=!options.once&&[],fire=function(data){memory=options.memory&&data;fired=true;firingIndex=firingStart||0;firingStart=0;firingLength=list.length;firing=true;for(;list&&firingIndex<firingLength;firingIndex++){if(list[firingIndex].apply(data[0],data[1])===false&&options.stopOnFalse){memory=false;break;}}
firing=false;if(list){if(stack){if(stack.length){fire(stack.shift());}}else if(memory){list=[];}else{self.disable();}}},self={add:function(){if(list){var start=list.length;(function add(args){jQuery.each(args,function(_,arg){var type=jQuery.type(arg);if(type==="function"){if(!options.unique||!self.has(arg)){list.push(arg);}}else if(arg&&arg.length&&type!=="string"){add(arg);}});})(arguments);if(firing){firingLength=list.length;}else if(memory){firingStart=start;fire(memory);}}
return this;},remove:function(){if(list){jQuery.each(arguments,function(_,arg){var index;while((index=jQuery.inArray(arg,list,index))>-1){list.splice(index,1);if(firing){if(index<=firingLength){firingLength--;}
if(index<=firingIndex){firingIndex--;}}}});}
return this;},has:function(fn){return fn?jQuery.inArray(fn,list)>-1:!!(list&&list.length);},empty:function(){list=[];firingLength=0;return this;},disable:function(){list=stack=memory=undefined;return this;},disabled:function(){return!list;},lock:function(){stack=undefined;if(!memory){self.disable();}
return this;},locked:function(){return!stack;},fireWith:function(context,args){if(list&&(!fired||stack)){args=args||[];args=[context,args.slice?args.slice():args];if(firing){stack.push(args);}else{fire(args);}}
return this;},fire:function(){self.fireWith(this,arguments);return this;},fired:function(){return!!fired;}};return self;};jQuery.extend({Deferred:function(func){var tuples=[["resolve","done",jQuery.Callbacks("once memory"),"resolved"],["reject","fail",jQuery.Callbacks("once memory"),"rejected"],["notify","progress",jQuery.Callbacks("memory")]],state="pending",promise={state:function(){return state;},always:function(){deferred.done(arguments).fail(arguments);return this;},then:function(){var fns=arguments;return jQuery.Deferred(function(newDefer){jQuery.each(tuples,function(i,tuple){var action=tuple[0],fn=jQuery.isFunction(fns[i])&&fns[i];deferred[tuple[1]](function(){var returned=fn&&fn.apply(this,arguments);if(returned&&jQuery.isFunction(returned.promise)){returned.promise().done(newDefer.resolve).fail(newDefer.reject).progress(newDefer.notify);}else{newDefer[action+"With"](this===promise?newDefer.promise():this,fn?[returned]:arguments);}});});fns=null;}).promise();},promise:function(obj){return obj!=null?jQuery.extend(obj,promise):promise;}},deferred={};promise.pipe=promise.then;jQuery.each(tuples,function(i,tuple){var list=tuple[2],stateString=tuple[3];promise[tuple[1]]=list.add;if(stateString){list.add(function(){state=stateString;},tuples[i^1][2].disable,tuples[2][2].lock);}
deferred[tuple[0]]=function(){deferred[tuple[0]+"With"](this===deferred?promise:this,arguments);return this;};deferred[tuple[0]+"With"]=list.fireWith;});promise.promise(deferred);if(func){func.call(deferred,deferred);}
return deferred;},when:function(subordinate){var i=0,resolveValues=core_slice.call(arguments),length=resolveValues.length,remaining=length!==1||(subordinate&&jQuery.isFunction(subordinate.promise))?length:0,deferred=remaining===1?subordinate:jQuery.Deferred(),updateFunc=function(i,contexts,values){return function(value){contexts[i]=this;values[i]=arguments.length>1?core_slice.call(arguments):value;if(values===progressValues){deferred.notifyWith(contexts,values);}else if(!(--remaining)){deferred.resolveWith(contexts,values);}};},progressValues,progressContexts,resolveContexts;if(length>1){progressValues=new Array(length);progressContexts=new Array(length);resolveContexts=new Array(length);for(;i<length;i++){if(resolveValues[i]&&jQuery.isFunction(resolveValues[i].promise)){resolveValues[i].promise().done(updateFunc(i,resolveContexts,resolveValues)).fail(deferred.reject).progress(updateFunc(i,progressContexts,progressValues));}else{--remaining;}}}
if(!remaining){deferred.resolveWith(resolveContexts,resolveValues);}
return deferred.promise();}});jQuery.support=(function(support){var all,a,input,select,fragment,opt,eventName,isSupported,i,div=document.createElement("div");div.setAttribute("className","t");div.innerHTML="  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";all=div.getElementsByTagName("*")||[];a=div.getElementsByTagName("a")[0];if(!a||!a.style||!all.length){return support;}
select=document.createElement("select");opt=select.appendChild(document.createElement("option"));input=div.getElementsByTagName("input")[0];a.style.cssText="top:1px;float:left;opacity:.5";support.getSetAttribute=div.className!=="t";support.leadingWhitespace=div.firstChild.nodeType===3;support.tbody=!div.getElementsByTagName("tbody").length;support.htmlSerialize=!!div.getElementsByTagName("link").length;support.style=/top/.test(a.getAttribute("style"));support.hrefNormalized=a.getAttribute("href")==="/a";support.opacity=/^0.5/.test(a.style.opacity);support.cssFloat=!!a.style.cssFloat;support.checkOn=!!input.value;support.optSelected=opt.selected;support.enctype=!!document.createElement("form").enctype;support.html5Clone=document.createElement("nav").cloneNode(true).outerHTML!=="<:nav></:nav>";support.inlineBlockNeedsLayout=false;support.shrinkWrapBlocks=false;support.pixelPosition=false;support.deleteExpando=true;support.noCloneEvent=true;support.reliableMarginRight=true;support.boxSizingReliable=true;input.checked=true;support.noCloneChecked=input.cloneNode(true).checked;select.disabled=true;support.optDisabled=!opt.disabled;try{delete div.test;}catch(e){support.deleteExpando=false;}
input=document.createElement("input");input.setAttribute("value","");support.input=input.getAttribute("value")==="";input.value="t";input.setAttribute("type","radio");support.radioValue=input.value==="t";input.setAttribute("checked","t");input.setAttribute("name","t");fragment=document.createDocumentFragment();fragment.appendChild(input);support.appendChecked=input.checked;support.checkClone=fragment.cloneNode(true).cloneNode(true).lastChild.checked;if(div.attachEvent){div.attachEvent("onclick",function(){support.noCloneEvent=false;});div.cloneNode(true).click();}
for(i in{submit:true,change:true,focusin:true}){div.setAttribute(eventName="on"+i,"t");support[i+"Bubbles"]=eventName in window||div.attributes[eventName].expando===false;}
div.style.backgroundClip="content-box";div.cloneNode(true).style.backgroundClip="";support.clearCloneStyle=div.style.backgroundClip==="content-box";for(i in jQuery(support)){break;}
support.ownLast=i!=="0";jQuery(function(){var container,marginDiv,tds,divReset="padding:0;margin:0;border:0;display:block;box-sizing:content-box;-moz-box-sizing:content-box;-webkit-box-sizing:content-box;",body=document.getElementsByTagName("body")[0];if(!body){return;}
container=document.createElement("div");container.style.cssText="border:0;width:0;height:0;position:absolute;top:0;left:-9999px;margin-top:1px";body.appendChild(container).appendChild(div);div.innerHTML="<table><tr><td></td><td>t</td></tr></table>";tds=div.getElementsByTagName("td");tds[0].style.cssText="padding:0;margin:0;border:0;display:none";isSupported=(tds[0].offsetHeight===0);tds[0].style.display="";tds[1].style.display="none";support.reliableHiddenOffsets=isSupported&&(tds[0].offsetHeight===0);div.innerHTML="";div.style.cssText="box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%;";jQuery.swap(body,body.style.zoom!=null?{zoom:1}:{},function(){support.boxSizing=div.offsetWidth===4;});if(window.getComputedStyle){support.pixelPosition=(window.getComputedStyle(div,null)||{}).top!=="1%";support.boxSizingReliable=(window.getComputedStyle(div,null)||{width:"4px"}).width==="4px";marginDiv=div.appendChild(document.createElement("div"));marginDiv.style.cssText=div.style.cssText=divReset;marginDiv.style.marginRight=marginDiv.style.width="0";div.style.width="1px";support.reliableMarginRight=!parseFloat((window.getComputedStyle(marginDiv,null)||{}).marginRight);}
if(typeof div.style.zoom!==core_strundefined){div.innerHTML="";div.style.cssText=divReset+"width:1px;padding:1px;display:inline;zoom:1";support.inlineBlockNeedsLayout=(div.offsetWidth===3);div.style.display="block";div.innerHTML="<div></div>";div.firstChild.style.width="5px";support.shrinkWrapBlocks=(div.offsetWidth!==3);if(support.inlineBlockNeedsLayout){body.style.zoom=1;}}
body.removeChild(container);container=div=tds=marginDiv=null;});all=select=fragment=opt=a=input=null;return support;})({});var rbrace=/(?:\{[\s\S]*\}|\[[\s\S]*\])$/,rmultiDash=/([A-Z])/g;function internalData(elem,name,data,pvt){if(!jQuery.acceptData(elem)){return;}
var ret,thisCache,internalKey=jQuery.expando,isNode=elem.nodeType,cache=isNode?jQuery.cache:elem,id=isNode?elem[internalKey]:elem[internalKey]&&internalKey;if((!id||!cache[id]||(!pvt&&!cache[id].data))&&data===undefined&&typeof name==="string"){return;}
if(!id){if(isNode){id=elem[internalKey]=core_deletedIds.pop()||jQuery.guid++;}else{id=internalKey;}}
if(!cache[id]){cache[id]=isNode?{}:{toJSON:jQuery.noop};}
if(typeof name==="object"||typeof name==="function"){if(pvt){cache[id]=jQuery.extend(cache[id],name);}else{cache[id].data=jQuery.extend(cache[id].data,name);}}
thisCache=cache[id];if(!pvt){if(!thisCache.data){thisCache.data={};}
thisCache=thisCache.data;}
if(data!==undefined){thisCache[jQuery.camelCase(name)]=data;}
if(typeof name==="string"){ret=thisCache[name];if(ret==null){ret=thisCache[jQuery.camelCase(name)];}}else{ret=thisCache;}
return ret;}
function internalRemoveData(elem,name,pvt){if(!jQuery.acceptData(elem)){return;}
var thisCache,i,isNode=elem.nodeType,cache=isNode?jQuery.cache:elem,id=isNode?elem[jQuery.expando]:jQuery.expando;if(!cache[id]){return;}
if(name){thisCache=pvt?cache[id]:cache[id].data;if(thisCache){if(!jQuery.isArray(name)){if(name in thisCache){name=[name];}else{name=jQuery.camelCase(name);if(name in thisCache){name=[name];}else{name=name.split(" ");}}}else{name=name.concat(jQuery.map(name,jQuery.camelCase));}
i=name.length;while(i--){delete thisCache[name[i]];}
if(pvt?!isEmptyDataObject(thisCache):!jQuery.isEmptyObject(thisCache)){return;}}}
if(!pvt){delete cache[id].data;if(!isEmptyDataObject(cache[id])){return;}}
if(isNode){jQuery.cleanData([elem],true);}else if(jQuery.support.deleteExpando||cache!=cache.window){delete cache[id];}else{cache[id]=null;}}
jQuery.extend({cache:{},noData:{"applet":true,"embed":true,"object":"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"},hasData:function(elem){elem=elem.nodeType?jQuery.cache[elem[jQuery.expando]]:elem[jQuery.expando];return!!elem&&!isEmptyDataObject(elem);},data:function(elem,name,data){return internalData(elem,name,data);},removeData:function(elem,name){return internalRemoveData(elem,name);},_data:function(elem,name,data){return internalData(elem,name,data,true);},_removeData:function(elem,name){return internalRemoveData(elem,name,true);},acceptData:function(elem){if(elem.nodeType&&elem.nodeType!==1&&elem.nodeType!==9){return false;}
var noData=elem.nodeName&&jQuery.noData[elem.nodeName.toLowerCase()];return!noData||noData!==true&&elem.getAttribute("classid")===noData;}});jQuery.fn.extend({data:function(key,value){var attrs,name,data=null,i=0,elem=this[0];if(key===undefined){if(this.length){data=jQuery.data(elem);if(elem.nodeType===1&&!jQuery._data(elem,"parsedAttrs")){attrs=elem.attributes;for(;i<attrs.length;i++){name=attrs[i].name;if(name.indexOf("data-")===0){name=jQuery.camelCase(name.slice(5));dataAttr(elem,name,data[name]);}}
jQuery._data(elem,"parsedAttrs",true);}}
return data;}
if(typeof key==="object"){return this.each(function(){jQuery.data(this,key);});}
return arguments.length>1?this.each(function(){jQuery.data(this,key,value);}):elem?dataAttr(elem,key,jQuery.data(elem,key)):null;},removeData:function(key){return this.each(function(){jQuery.removeData(this,key);});}});function dataAttr(elem,key,data){if(data===undefined&&elem.nodeType===1){var name="data-"+key.replace(rmultiDash,"-$1").toLowerCase();data=elem.getAttribute(name);if(typeof data==="string"){try{data=data==="true"?true:data==="false"?false:data==="null"?null:+data+""===data?+data:rbrace.test(data)?jQuery.parseJSON(data):data;}catch(e){}
jQuery.data(elem,key,data);}else{data=undefined;}}
return data;}
function isEmptyDataObject(obj){var name;for(name in obj){if(name==="data"&&jQuery.isEmptyObject(obj[name])){continue;}
if(name!=="toJSON"){return false;}}
return true;}
jQuery.extend({queue:function(elem,type,data){var queue;if(elem){type=(type||"fx")+"queue";queue=jQuery._data(elem,type);if(data){if(!queue||jQuery.isArray(data)){queue=jQuery._data(elem,type,jQuery.makeArray(data));}else{queue.push(data);}}
return queue||[];}},dequeue:function(elem,type){type=type||"fx";var queue=jQuery.queue(elem,type),startLength=queue.length,fn=queue.shift(),hooks=jQuery._queueHooks(elem,type),next=function(){jQuery.dequeue(elem,type);};if(fn==="inprogress"){fn=queue.shift();startLength--;}
if(fn){if(type==="fx"){queue.unshift("inprogress");}
delete hooks.stop;fn.call(elem,next,hooks);}
if(!startLength&&hooks){hooks.empty.fire();}},_queueHooks:function(elem,type){var key=type+"queueHooks";return jQuery._data(elem,key)||jQuery._data(elem,key,{empty:jQuery.Callbacks("once memory").add(function(){jQuery._removeData(elem,type+"queue");jQuery._removeData(elem,key);})});}});jQuery.fn.extend({queue:function(type,data){var setter=2;if(typeof type!=="string"){data=type;type="fx";setter--;}
if(arguments.length<setter){return jQuery.queue(this[0],type);}
return data===undefined?this:this.each(function(){var queue=jQuery.queue(this,type,data);jQuery._queueHooks(this,type);if(type==="fx"&&queue[0]!=="inprogress"){jQuery.dequeue(this,type);}});},dequeue:function(type){return this.each(function(){jQuery.dequeue(this,type);});},delay:function(time,type){time=jQuery.fx?jQuery.fx.speeds[time]||time:time;type=type||"fx";return this.queue(type,function(next,hooks){var timeout=setTimeout(next,time);hooks.stop=function(){clearTimeout(timeout);};});},clearQueue:function(type){return this.queue(type||"fx",[]);},promise:function(type,obj){var tmp,count=1,defer=jQuery.Deferred(),elements=this,i=this.length,resolve=function(){if(!(--count)){defer.resolveWith(elements,[elements]);}};if(typeof type!=="string"){obj=type;type=undefined;}
type=type||"fx";while(i--){tmp=jQuery._data(elements[i],type+"queueHooks");if(tmp&&tmp.empty){count++;tmp.empty.add(resolve);}}
resolve();return defer.promise(obj);}});var nodeHook,boolHook,rclass=/[\t\r\n\f]/g,rreturn=/\r/g,rfocusable=/^(?:input|select|textarea|button|object)$/i,rclickable=/^(?:a|area)$/i,ruseDefault=/^(?:checked|selected)$/i,getSetAttribute=jQuery.support.getSetAttribute,getSetInput=jQuery.support.input;jQuery.fn.extend({attr:function(name,value){return jQuery.access(this,jQuery.attr,name,value,arguments.length>1);},removeAttr:function(name){return this.each(function(){jQuery.removeAttr(this,name);});},prop:function(name,value){return jQuery.access(this,jQuery.prop,name,value,arguments.length>1);},removeProp:function(name){name=jQuery.propFix[name]||name;return this.each(function(){try{this[name]=undefined;delete this[name];}catch(e){}});},addClass:function(value){var classes,elem,cur,clazz,j,i=0,len=this.length,proceed=typeof value==="string"&&value;if(jQuery.isFunction(value)){return this.each(function(j){jQuery(this).addClass(value.call(this,j,this.className));});}
if(proceed){classes=(value||"").match(core_rnotwhite)||[];for(;i<len;i++){elem=this[i];cur=elem.nodeType===1&&(elem.className?(" "+elem.className+" ").replace(rclass," "):" ");if(cur){j=0;while((clazz=classes[j++])){if(cur.indexOf(" "+clazz+" ")<0){cur+=clazz+" ";}}
elem.className=jQuery.trim(cur);}}}
return this;},removeClass:function(value){var classes,elem,cur,clazz,j,i=0,len=this.length,proceed=arguments.length===0||typeof value==="string"&&value;if(jQuery.isFunction(value)){return this.each(function(j){jQuery(this).removeClass(value.call(this,j,this.className));});}
if(proceed){classes=(value||"").match(core_rnotwhite)||[];for(;i<len;i++){elem=this[i];cur=elem.nodeType===1&&(elem.className?(" "+elem.className+" ").replace(rclass," "):"");if(cur){j=0;while((clazz=classes[j++])){while(cur.indexOf(" "+clazz+" ")>=0){cur=cur.replace(" "+clazz+" "," ");}}
elem.className=value?jQuery.trim(cur):"";}}}
return this;},toggleClass:function(value,stateVal){var type=typeof value;if(typeof stateVal==="boolean"&&type==="string"){return stateVal?this.addClass(value):this.removeClass(value);}
if(jQuery.isFunction(value)){return this.each(function(i){jQuery(this).toggleClass(value.call(this,i,this.className,stateVal),stateVal);});}
return this.each(function(){if(type==="string"){var className,i=0,self=jQuery(this),classNames=value.match(core_rnotwhite)||[];while((className=classNames[i++])){if(self.hasClass(className)){self.removeClass(className);}else{self.addClass(className);}}}else if(type===core_strundefined||type==="boolean"){if(this.className){jQuery._data(this,"__className__",this.className);}
this.className=this.className||value===false?"":jQuery._data(this,"__className__")||"";}});},hasClass:function(selector){var className=" "+selector+" ",i=0,l=this.length;for(;i<l;i++){if(this[i].nodeType===1&&(" "+this[i].className+" ").replace(rclass," ").indexOf(className)>=0){return true;}}
return false;},val:function(value){var ret,hooks,isFunction,elem=this[0];if(!arguments.length){if(elem){hooks=jQuery.valHooks[elem.type]||jQuery.valHooks[elem.nodeName.toLowerCase()];if(hooks&&"get"in hooks&&(ret=hooks.get(elem,"value"))!==undefined){return ret;}
ret=elem.value;return typeof ret==="string"?ret.replace(rreturn,""):ret==null?"":ret;}
return;}
isFunction=jQuery.isFunction(value);return this.each(function(i){var val;if(this.nodeType!==1){return;}
if(isFunction){val=value.call(this,i,jQuery(this).val());}else{val=value;}
if(val==null){val="";}else if(typeof val==="number"){val+="";}else if(jQuery.isArray(val)){val=jQuery.map(val,function(value){return value==null?"":value+"";});}
hooks=jQuery.valHooks[this.type]||jQuery.valHooks[this.nodeName.toLowerCase()];if(!hooks||!("set"in hooks)||hooks.set(this,val,"value")===undefined){this.value=val;}});}});jQuery.extend({valHooks:{option:{get:function(elem){var val=jQuery.find.attr(elem,"value");return val!=null?val:elem.text;}},select:{get:function(elem){var value,option,options=elem.options,index=elem.selectedIndex,one=elem.type==="select-one"||index<0,values=one?null:[],max=one?index+1:options.length,i=index<0?max:one?index:0;for(;i<max;i++){option=options[i];if((option.selected||i===index)&&(jQuery.support.optDisabled?!option.disabled:option.getAttribute("disabled")===null)&&(!option.parentNode.disabled||!jQuery.nodeName(option.parentNode,"optgroup"))){value=jQuery(option).val();if(one){return value;}
values.push(value);}}
return values;},set:function(elem,value){var optionSet,option,options=elem.options,values=jQuery.makeArray(value),i=options.length;while(i--){option=options[i];if((option.selected=jQuery.inArray(jQuery(option).val(),values)>=0)){optionSet=true;}}
if(!optionSet){elem.selectedIndex=-1;}
return values;}}},attr:function(elem,name,value){var hooks,ret,nType=elem.nodeType;if(!elem||nType===3||nType===8||nType===2){return;}
if(typeof elem.getAttribute===core_strundefined){return jQuery.prop(elem,name,value);}
if(nType!==1||!jQuery.isXMLDoc(elem)){name=name.toLowerCase();hooks=jQuery.attrHooks[name]||(jQuery.expr.match.bool.test(name)?boolHook:nodeHook);}
if(value!==undefined){if(value===null){jQuery.removeAttr(elem,name);}else if(hooks&&"set"in hooks&&(ret=hooks.set(elem,value,name))!==undefined){return ret;}else{elem.setAttribute(name,value+"");return value;}}else if(hooks&&"get"in hooks&&(ret=hooks.get(elem,name))!==null){return ret;}else{ret=jQuery.find.attr(elem,name);return ret==null?undefined:ret;}},removeAttr:function(elem,value){var name,propName,i=0,attrNames=value&&value.match(core_rnotwhite);if(attrNames&&elem.nodeType===1){while((name=attrNames[i++])){propName=jQuery.propFix[name]||name;if(jQuery.expr.match.bool.test(name)){if(getSetInput&&getSetAttribute||!ruseDefault.test(name)){elem[propName]=false;}else{elem[jQuery.camelCase("default-"+name)]=elem[propName]=false;}}else{jQuery.attr(elem,name,"");}
elem.removeAttribute(getSetAttribute?name:propName);}}},attrHooks:{type:{set:function(elem,value){if(!jQuery.support.radioValue&&value==="radio"&&jQuery.nodeName(elem,"input")){var val=elem.value;elem.setAttribute("type",value);if(val){elem.value=val;}
return value;}}}},propFix:{"for":"htmlFor","class":"className"},prop:function(elem,name,value){var ret,hooks,notxml,nType=elem.nodeType;if(!elem||nType===3||nType===8||nType===2){return;}
notxml=nType!==1||!jQuery.isXMLDoc(elem);if(notxml){name=jQuery.propFix[name]||name;hooks=jQuery.propHooks[name];}
if(value!==undefined){return hooks&&"set"in hooks&&(ret=hooks.set(elem,value,name))!==undefined?ret:(elem[name]=value);}else{return hooks&&"get"in hooks&&(ret=hooks.get(elem,name))!==null?ret:elem[name];}},propHooks:{tabIndex:{get:function(elem){var tabindex=jQuery.find.attr(elem,"tabindex");return tabindex?parseInt(tabindex,10):rfocusable.test(elem.nodeName)||rclickable.test(elem.nodeName)&&elem.href?0:-1;}}}});boolHook={set:function(elem,value,name){if(value===false){jQuery.removeAttr(elem,name);}else if(getSetInput&&getSetAttribute||!ruseDefault.test(name)){elem.setAttribute(!getSetAttribute&&jQuery.propFix[name]||name,name);}else{elem[jQuery.camelCase("default-"+name)]=elem[name]=true;}
return name;}};jQuery.each(jQuery.expr.match.bool.source.match(/\w+/g),function(i,name){var getter=jQuery.expr.attrHandle[name]||jQuery.find.attr;jQuery.expr.attrHandle[name]=getSetInput&&getSetAttribute||!ruseDefault.test(name)?function(elem,name,isXML){var fn=jQuery.expr.attrHandle[name],ret=isXML?undefined:(jQuery.expr.attrHandle[name]=undefined)!=getter(elem,name,isXML)?name.toLowerCase():null;jQuery.expr.attrHandle[name]=fn;return ret;}:function(elem,name,isXML){return isXML?undefined:elem[jQuery.camelCase("default-"+name)]?name.toLowerCase():null;};});if(!getSetInput||!getSetAttribute){jQuery.attrHooks.value={set:function(elem,value,name){if(jQuery.nodeName(elem,"input")){elem.defaultValue=value;}else{return nodeHook&&nodeHook.set(elem,value,name);}}};}
if(!getSetAttribute){nodeHook={set:function(elem,value,name){var ret=elem.getAttributeNode(name);if(!ret){elem.setAttributeNode((ret=elem.ownerDocument.createAttribute(name)));}
ret.value=value+="";return name==="value"||value===elem.getAttribute(name)?value:undefined;}};jQuery.expr.attrHandle.id=jQuery.expr.attrHandle.name=jQuery.expr.attrHandle.coords=function(elem,name,isXML){var ret;return isXML?undefined:(ret=elem.getAttributeNode(name))&&ret.value!==""?ret.value:null;};jQuery.valHooks.button={get:function(elem,name){var ret=elem.getAttributeNode(name);return ret&&ret.specified?ret.value:undefined;},set:nodeHook.set};jQuery.attrHooks.contenteditable={set:function(elem,value,name){nodeHook.set(elem,value===""?false:value,name);}};jQuery.each(["width","height"],function(i,name){jQuery.attrHooks[name]={set:function(elem,value){if(value===""){elem.setAttribute(name,"auto");return value;}}};});}
if(!jQuery.support.hrefNormalized){jQuery.each(["href","src"],function(i,name){jQuery.propHooks[name]={get:function(elem){return elem.getAttribute(name,4);}};});}
if(!jQuery.support.style){jQuery.attrHooks.style={get:function(elem){return elem.style.cssText||undefined;},set:function(elem,value){return(elem.style.cssText=value+"");}};}
if(!jQuery.support.optSelected){jQuery.propHooks.selected={get:function(elem){var parent=elem.parentNode;if(parent){parent.selectedIndex;if(parent.parentNode){parent.parentNode.selectedIndex;}}
return null;}};}
jQuery.each(["tabIndex","readOnly","maxLength","cellSpacing","cellPadding","rowSpan","colSpan","useMap","frameBorder","contentEditable"],function(){jQuery.propFix[this.toLowerCase()]=this;});if(!jQuery.support.enctype){jQuery.propFix.enctype="encoding";}
jQuery.each(["radio","checkbox"],function(){jQuery.valHooks[this]={set:function(elem,value){if(jQuery.isArray(value)){return(elem.checked=jQuery.inArray(jQuery(elem).val(),value)>=0);}}};if(!jQuery.support.checkOn){jQuery.valHooks[this].get=function(elem){return elem.getAttribute("value")===null?"on":elem.value;};}});var rformElems=/^(?:input|select|textarea)$/i,rkeyEvent=/^key/,rmouseEvent=/^(?:mouse|contextmenu)|click/,rfocusMorph=/^(?:focusinfocus|focusoutblur)$/,rtypenamespace=/^([^.]*)(?:\.(.+)|)$/;function returnTrue(){return true;}
function returnFalse(){return false;}
function safeActiveElement(){try{return document.activeElement;}catch(err){}}
jQuery.event={global:{},add:function(elem,types,handler,data,selector){var tmp,events,t,handleObjIn,special,eventHandle,handleObj,handlers,type,namespaces,origType,elemData=jQuery._data(elem);if(!elemData){return;}
if(handler.handler){handleObjIn=handler;handler=handleObjIn.handler;selector=handleObjIn.selector;}
if(!handler.guid){handler.guid=jQuery.guid++;}
if(!(events=elemData.events)){events=elemData.events={};}
if(!(eventHandle=elemData.handle)){eventHandle=elemData.handle=function(e){return typeof jQuery!==core_strundefined&&(!e||jQuery.event.triggered!==e.type)?jQuery.event.dispatch.apply(eventHandle.elem,arguments):undefined;};eventHandle.elem=elem;}
types=(types||"").match(core_rnotwhite)||[""];t=types.length;while(t--){tmp=rtypenamespace.exec(types[t])||[];type=origType=tmp[1];namespaces=(tmp[2]||"").split(".").sort();if(!type){continue;}
special=jQuery.event.special[type]||{};type=(selector?special.delegateType:special.bindType)||type;special=jQuery.event.special[type]||{};handleObj=jQuery.extend({type:type,origType:origType,data:data,handler:handler,guid:handler.guid,selector:selector,needsContext:selector&&jQuery.expr.match.needsContext.test(selector),namespace:namespaces.join(".")},handleObjIn);if(!(handlers=events[type])){handlers=events[type]=[];handlers.delegateCount=0;if(!special.setup||special.setup.call(elem,data,namespaces,eventHandle)===false){if(elem.addEventListener){elem.addEventListener(type,eventHandle,false);}else if(elem.attachEvent){elem.attachEvent("on"+type,eventHandle);}}}
if(special.add){special.add.call(elem,handleObj);if(!handleObj.handler.guid){handleObj.handler.guid=handler.guid;}}
if(selector){handlers.splice(handlers.delegateCount++,0,handleObj);}else{handlers.push(handleObj);}
jQuery.event.global[type]=true;}
elem=null;},remove:function(elem,types,handler,selector,mappedTypes){var j,handleObj,tmp,origCount,t,events,special,handlers,type,namespaces,origType,elemData=jQuery.hasData(elem)&&jQuery._data(elem);if(!elemData||!(events=elemData.events)){return;}
types=(types||"").match(core_rnotwhite)||[""];t=types.length;while(t--){tmp=rtypenamespace.exec(types[t])||[];type=origType=tmp[1];namespaces=(tmp[2]||"").split(".").sort();if(!type){for(type in events){jQuery.event.remove(elem,type+types[t],handler,selector,true);}
continue;}
special=jQuery.event.special[type]||{};type=(selector?special.delegateType:special.bindType)||type;handlers=events[type]||[];tmp=tmp[2]&&new RegExp("(^|\\.)"+namespaces.join("\\.(?:.*\\.|)")+"(\\.|$)");origCount=j=handlers.length;while(j--){handleObj=handlers[j];if((mappedTypes||origType===handleObj.origType)&&(!handler||handler.guid===handleObj.guid)&&(!tmp||tmp.test(handleObj.namespace))&&(!selector||selector===handleObj.selector||selector==="**"&&handleObj.selector)){handlers.splice(j,1);if(handleObj.selector){handlers.delegateCount--;}
if(special.remove){special.remove.call(elem,handleObj);}}}
if(origCount&&!handlers.length){if(!special.teardown||special.teardown.call(elem,namespaces,elemData.handle)===false){jQuery.removeEvent(elem,type,elemData.handle);}
delete events[type];}}
if(jQuery.isEmptyObject(events)){delete elemData.handle;jQuery._removeData(elem,"events");}},trigger:function(event,data,elem,onlyHandlers){var handle,ontype,cur,bubbleType,special,tmp,i,eventPath=[elem||document],type=core_hasOwn.call(event,"type")?event.type:event,namespaces=core_hasOwn.call(event,"namespace")?event.namespace.split("."):[];cur=tmp=elem=elem||document;if(elem.nodeType===3||elem.nodeType===8){return;}
if(rfocusMorph.test(type+jQuery.event.triggered)){return;}
if(type.indexOf(".")>=0){namespaces=type.split(".");type=namespaces.shift();namespaces.sort();}
ontype=type.indexOf(":")<0&&"on"+type;event=event[jQuery.expando]?event:new jQuery.Event(type,typeof event==="object"&&event);event.isTrigger=onlyHandlers?2:3;event.namespace=namespaces.join(".");event.namespace_re=event.namespace?new RegExp("(^|\\.)"+namespaces.join("\\.(?:.*\\.|)")+"(\\.|$)"):null;event.result=undefined;if(!event.target){event.target=elem;}
data=data==null?[event]:jQuery.makeArray(data,[event]);special=jQuery.event.special[type]||{};if(!onlyHandlers&&special.trigger&&special.trigger.apply(elem,data)===false){return;}
if(!onlyHandlers&&!special.noBubble&&!jQuery.isWindow(elem)){bubbleType=special.delegateType||type;if(!rfocusMorph.test(bubbleType+type)){cur=cur.parentNode;}
for(;cur;cur=cur.parentNode){eventPath.push(cur);tmp=cur;}
if(tmp===(elem.ownerDocument||document)){eventPath.push(tmp.defaultView||tmp.parentWindow||window);}}
i=0;while((cur=eventPath[i++])&&!event.isPropagationStopped()){event.type=i>1?bubbleType:special.bindType||type;handle=(jQuery._data(cur,"events")||{})[event.type]&&jQuery._data(cur,"handle");if(handle){handle.apply(cur,data);}
handle=ontype&&cur[ontype];if(handle&&jQuery.acceptData(cur)&&handle.apply&&handle.apply(cur,data)===false){event.preventDefault();}}
event.type=type;if(!onlyHandlers&&!event.isDefaultPrevented()){if((!special._default||special._default.apply(eventPath.pop(),data)===false)&&jQuery.acceptData(elem)){if(ontype&&elem[type]&&!jQuery.isWindow(elem)){tmp=elem[ontype];if(tmp){elem[ontype]=null;}
jQuery.event.triggered=type;try{elem[type]();}catch(e){}
jQuery.event.triggered=undefined;if(tmp){elem[ontype]=tmp;}}}}
return event.result;},dispatch:function(event){event=jQuery.event.fix(event);var i,ret,handleObj,matched,j,handlerQueue=[],args=core_slice.call(arguments),handlers=(jQuery._data(this,"events")||{})[event.type]||[],special=jQuery.event.special[event.type]||{};args[0]=event;event.delegateTarget=this;if(special.preDispatch&&special.preDispatch.call(this,event)===false){return;}
handlerQueue=jQuery.event.handlers.call(this,event,handlers);i=0;while((matched=handlerQueue[i++])&&!event.isPropagationStopped()){event.currentTarget=matched.elem;j=0;while((handleObj=matched.handlers[j++])&&!event.isImmediatePropagationStopped()){if(!event.namespace_re||event.namespace_re.test(handleObj.namespace)){event.handleObj=handleObj;event.data=handleObj.data;ret=((jQuery.event.special[handleObj.origType]||{}).handle||handleObj.handler).apply(matched.elem,args);if(ret!==undefined){if((event.result=ret)===false){event.preventDefault();event.stopPropagation();}}}}}
if(special.postDispatch){special.postDispatch.call(this,event);}
return event.result;},handlers:function(event,handlers){var sel,handleObj,matches,i,handlerQueue=[],delegateCount=handlers.delegateCount,cur=event.target;if(delegateCount&&cur.nodeType&&(!event.button||event.type!=="click")){for(;cur!=this;cur=cur.parentNode||this){if(cur.nodeType===1&&(cur.disabled!==true||event.type!=="click")){matches=[];for(i=0;i<delegateCount;i++){handleObj=handlers[i];sel=handleObj.selector+" ";if(matches[sel]===undefined){matches[sel]=handleObj.needsContext?jQuery(sel,this).index(cur)>=0:jQuery.find(sel,this,null,[cur]).length;}
if(matches[sel]){matches.push(handleObj);}}
if(matches.length){handlerQueue.push({elem:cur,handlers:matches});}}}}
if(delegateCount<handlers.length){handlerQueue.push({elem:this,handlers:handlers.slice(delegateCount)});}
return handlerQueue;},fix:function(event){if(event[jQuery.expando]){return event;}
var i,prop,copy,type=event.type,originalEvent=event,fixHook=this.fixHooks[type];if(!fixHook){this.fixHooks[type]=fixHook=rmouseEvent.test(type)?this.mouseHooks:rkeyEvent.test(type)?this.keyHooks:{};}
copy=fixHook.props?this.props.concat(fixHook.props):this.props;event=new jQuery.Event(originalEvent);i=copy.length;while(i--){prop=copy[i];event[prop]=originalEvent[prop];}
if(!event.target){event.target=originalEvent.srcElement||document;}
if(event.target.nodeType===3){event.target=event.target.parentNode;}
event.metaKey=!!event.metaKey;return fixHook.filter?fixHook.filter(event,originalEvent):event;},props:"altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),fixHooks:{},keyHooks:{props:"char charCode key keyCode".split(" "),filter:function(event,original){if(event.which==null){event.which=original.charCode!=null?original.charCode:original.keyCode;}
return event;}},mouseHooks:{props:"button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),filter:function(event,original){var body,eventDoc,doc,button=original.button,fromElement=original.fromElement;if(event.pageX==null&&original.clientX!=null){eventDoc=event.target.ownerDocument||document;doc=eventDoc.documentElement;body=eventDoc.body;event.pageX=original.clientX+(doc&&doc.scrollLeft||body&&body.scrollLeft||0)-(doc&&doc.clientLeft||body&&body.clientLeft||0);event.pageY=original.clientY+(doc&&doc.scrollTop||body&&body.scrollTop||0)-(doc&&doc.clientTop||body&&body.clientTop||0);}
if(!event.relatedTarget&&fromElement){event.relatedTarget=fromElement===event.target?original.toElement:fromElement;}
if(!event.which&&button!==undefined){event.which=(button&1?1:(button&2?3:(button&4?2:0)));}
return event;}},special:{load:{noBubble:true},focus:{trigger:function(){if(this!==safeActiveElement()&&this.focus){try{this.focus();return false;}catch(e){}}},delegateType:"focusin"},blur:{trigger:function(){if(this===safeActiveElement()&&this.blur){this.blur();return false;}},delegateType:"focusout"},click:{trigger:function(){if(jQuery.nodeName(this,"input")&&this.type==="checkbox"&&this.click){this.click();return false;}},_default:function(event){return jQuery.nodeName(event.target,"a");}},beforeunload:{postDispatch:function(event){if(event.result!==undefined){event.originalEvent.returnValue=event.result;}}}},simulate:function(type,elem,event,bubble){var e=jQuery.extend(new jQuery.Event(),event,{type:type,isSimulated:true,originalEvent:{}});if(bubble){jQuery.event.trigger(e,null,elem);}else{jQuery.event.dispatch.call(elem,e);}
if(e.isDefaultPrevented()){event.preventDefault();}}};jQuery.removeEvent=document.removeEventListener?function(elem,type,handle){if(elem.removeEventListener){elem.removeEventListener(type,handle,false);}}:function(elem,type,handle){var name="on"+type;if(elem.detachEvent){if(typeof elem[name]===core_strundefined){elem[name]=null;}
elem.detachEvent(name,handle);}};jQuery.Event=function(src,props){if(!(this instanceof jQuery.Event)){return new jQuery.Event(src,props);}
if(src&&src.type){this.originalEvent=src;this.type=src.type;this.isDefaultPrevented=(src.defaultPrevented||src.returnValue===false||src.getPreventDefault&&src.getPreventDefault())?returnTrue:returnFalse;}else{this.type=src;}
if(props){jQuery.extend(this,props);}
this.timeStamp=src&&src.timeStamp||jQuery.now();this[jQuery.expando]=true;};jQuery.Event.prototype={isDefaultPrevented:returnFalse,isPropagationStopped:returnFalse,isImmediatePropagationStopped:returnFalse,preventDefault:function(){var e=this.originalEvent;this.isDefaultPrevented=returnTrue;if(!e){return;}
if(e.preventDefault){e.preventDefault();}else{e.returnValue=false;}},stopPropagation:function(){var e=this.originalEvent;this.isPropagationStopped=returnTrue;if(!e){return;}
if(e.stopPropagation){e.stopPropagation();}
e.cancelBubble=true;},stopImmediatePropagation:function(){this.isImmediatePropagationStopped=returnTrue;this.stopPropagation();}};jQuery.each({mouseenter:"mouseover",mouseleave:"mouseout"},function(orig,fix){jQuery.event.special[orig]={delegateType:fix,bindType:fix,handle:function(event){var ret,target=this,related=event.relatedTarget,handleObj=event.handleObj;if(!related||(related!==target&&!jQuery.contains(target,related))){event.type=handleObj.origType;ret=handleObj.handler.apply(this,arguments);event.type=fix;}
return ret;}};});if(!jQuery.support.submitBubbles){jQuery.event.special.submit={setup:function(){if(jQuery.nodeName(this,"form")){return false;}
jQuery.event.add(this,"click._submit keypress._submit",function(e){var elem=e.target,form=jQuery.nodeName(elem,"input")||jQuery.nodeName(elem,"button")?elem.form:undefined;if(form&&!jQuery._data(form,"submitBubbles")){jQuery.event.add(form,"submit._submit",function(event){event._submit_bubble=true;});jQuery._data(form,"submitBubbles",true);}});},postDispatch:function(event){if(event._submit_bubble){delete event._submit_bubble;if(this.parentNode&&!event.isTrigger){jQuery.event.simulate("submit",this.parentNode,event,true);}}},teardown:function(){if(jQuery.nodeName(this,"form")){return false;}
jQuery.event.remove(this,"._submit");}};}
if(!jQuery.support.changeBubbles){jQuery.event.special.change={setup:function(){if(rformElems.test(this.nodeName)){if(this.type==="checkbox"||this.type==="radio"){jQuery.event.add(this,"propertychange._change",function(event){if(event.originalEvent.propertyName==="checked"){this._just_changed=true;}});jQuery.event.add(this,"click._change",function(event){if(this._just_changed&&!event.isTrigger){this._just_changed=false;}
jQuery.event.simulate("change",this,event,true);});}
return false;}
jQuery.event.add(this,"beforeactivate._change",function(e){var elem=e.target;if(rformElems.test(elem.nodeName)&&!jQuery._data(elem,"changeBubbles")){jQuery.event.add(elem,"change._change",function(event){if(this.parentNode&&!event.isSimulated&&!event.isTrigger){jQuery.event.simulate("change",this.parentNode,event,true);}});jQuery._data(elem,"changeBubbles",true);}});},handle:function(event){var elem=event.target;if(this!==elem||event.isSimulated||event.isTrigger||(elem.type!=="radio"&&elem.type!=="checkbox")){return event.handleObj.handler.apply(this,arguments);}},teardown:function(){jQuery.event.remove(this,"._change");return!rformElems.test(this.nodeName);}};}
if(!jQuery.support.focusinBubbles){jQuery.each({focus:"focusin",blur:"focusout"},function(orig,fix){var attaches=0,handler=function(event){jQuery.event.simulate(fix,event.target,jQuery.event.fix(event),true);};jQuery.event.special[fix]={setup:function(){if(attaches++===0){document.addEventListener(orig,handler,true);}},teardown:function(){if(--attaches===0){document.removeEventListener(orig,handler,true);}}};});}
jQuery.fn.extend({on:function(types,selector,data,fn,one){var type,origFn;if(typeof types==="object"){if(typeof selector!=="string"){data=data||selector;selector=undefined;}
for(type in types){this.on(type,selector,data,types[type],one);}
return this;}
if(data==null&&fn==null){fn=selector;data=selector=undefined;}else if(fn==null){if(typeof selector==="string"){fn=data;data=undefined;}else{fn=data;data=selector;selector=undefined;}}
if(fn===false){fn=returnFalse;}else if(!fn){return this;}
if(one===1){origFn=fn;fn=function(event){jQuery().off(event);return origFn.apply(this,arguments);};fn.guid=origFn.guid||(origFn.guid=jQuery.guid++);}
return this.each(function(){jQuery.event.add(this,types,fn,data,selector);});},one:function(types,selector,data,fn){return this.on(types,selector,data,fn,1);},off:function(types,selector,fn){var handleObj,type;if(types&&types.preventDefault&&types.handleObj){handleObj=types.handleObj;jQuery(types.delegateTarget).off(handleObj.namespace?handleObj.origType+"."+handleObj.namespace:handleObj.origType,handleObj.selector,handleObj.handler);return this;}
if(typeof types==="object"){for(type in types){this.off(type,selector,types[type]);}
return this;}
if(selector===false||typeof selector==="function"){fn=selector;selector=undefined;}
if(fn===false){fn=returnFalse;}
return this.each(function(){jQuery.event.remove(this,types,fn,selector);});},trigger:function(type,data){return this.each(function(){jQuery.event.trigger(type,data,this);});},triggerHandler:function(type,data){var elem=this[0];if(elem){return jQuery.event.trigger(type,data,elem,true);}}});var isSimple=/^.[^:#\[\.,]*$/,rparentsprev=/^(?:parents|prev(?:Until|All))/,rneedsContext=jQuery.expr.match.needsContext,guaranteedUnique={children:true,contents:true,next:true,prev:true};jQuery.fn.extend({find:function(selector){var i,ret=[],self=this,len=self.length;if(typeof selector!=="string"){return this.pushStack(jQuery(selector).filter(function(){for(i=0;i<len;i++){if(jQuery.contains(self[i],this)){return true;}}}));}
for(i=0;i<len;i++){jQuery.find(selector,self[i],ret);}
ret=this.pushStack(len>1?jQuery.unique(ret):ret);ret.selector=this.selector?this.selector+" "+selector:selector;return ret;},has:function(target){var i,targets=jQuery(target,this),len=targets.length;return this.filter(function(){for(i=0;i<len;i++){if(jQuery.contains(this,targets[i])){return true;}}});},not:function(selector){return this.pushStack(winnow(this,selector||[],true));},filter:function(selector){return this.pushStack(winnow(this,selector||[],false));},is:function(selector){return!!winnow(this,typeof selector==="string"&&rneedsContext.test(selector)?jQuery(selector):selector||[],false).length;},closest:function(selectors,context){var cur,i=0,l=this.length,ret=[],pos=rneedsContext.test(selectors)||typeof selectors!=="string"?jQuery(selectors,context||this.context):0;for(;i<l;i++){for(cur=this[i];cur&&cur!==context;cur=cur.parentNode){if(cur.nodeType<11&&(pos?pos.index(cur)>-1:cur.nodeType===1&&jQuery.find.matchesSelector(cur,selectors))){cur=ret.push(cur);break;}}}
return this.pushStack(ret.length>1?jQuery.unique(ret):ret);},index:function(elem){if(!elem){return(this[0]&&this[0].parentNode)?this.first().prevAll().length:-1;}
if(typeof elem==="string"){return jQuery.inArray(this[0],jQuery(elem));}
return jQuery.inArray(elem.jquery?elem[0]:elem,this);},add:function(selector,context){var set=typeof selector==="string"?jQuery(selector,context):jQuery.makeArray(selector&&selector.nodeType?[selector]:selector),all=jQuery.merge(this.get(),set);return this.pushStack(jQuery.unique(all));},addBack:function(selector){return this.add(selector==null?this.prevObject:this.prevObject.filter(selector));}});function sibling(cur,dir){do{cur=cur[dir];}while(cur&&cur.nodeType!==1);return cur;}
jQuery.each({parent:function(elem){var parent=elem.parentNode;return parent&&parent.nodeType!==11?parent:null;},parents:function(elem){return jQuery.dir(elem,"parentNode");},parentsUntil:function(elem,i,until){return jQuery.dir(elem,"parentNode",until);},next:function(elem){return sibling(elem,"nextSibling");},prev:function(elem){return sibling(elem,"previousSibling");},nextAll:function(elem){return jQuery.dir(elem,"nextSibling");},prevAll:function(elem){return jQuery.dir(elem,"previousSibling");},nextUntil:function(elem,i,until){return jQuery.dir(elem,"nextSibling",until);},prevUntil:function(elem,i,until){return jQuery.dir(elem,"previousSibling",until);},siblings:function(elem){return jQuery.sibling((elem.parentNode||{}).firstChild,elem);},children:function(elem){return jQuery.sibling(elem.firstChild);},contents:function(elem){return jQuery.nodeName(elem,"iframe")?elem.contentDocument||elem.contentWindow.document:jQuery.merge([],elem.childNodes);}},function(name,fn){jQuery.fn[name]=function(until,selector){var ret=jQuery.map(this,fn,until);if(name.slice(-5)!=="Until"){selector=until;}
if(selector&&typeof selector==="string"){ret=jQuery.filter(selector,ret);}
if(this.length>1){if(!guaranteedUnique[name]){ret=jQuery.unique(ret);}
if(rparentsprev.test(name)){ret=ret.reverse();}}
return this.pushStack(ret);};});jQuery.extend({filter:function(expr,elems,not){var elem=elems[0];if(not){expr=":not("+expr+")";}
return elems.length===1&&elem.nodeType===1?jQuery.find.matchesSelector(elem,expr)?[elem]:[]:jQuery.find.matches(expr,jQuery.grep(elems,function(elem){return elem.nodeType===1;}));},dir:function(elem,dir,until){var matched=[],cur=elem[dir];while(cur&&cur.nodeType!==9&&(until===undefined||cur.nodeType!==1||!jQuery(cur).is(until))){if(cur.nodeType===1){matched.push(cur);}
cur=cur[dir];}
return matched;},sibling:function(n,elem){var r=[];for(;n;n=n.nextSibling){if(n.nodeType===1&&n!==elem){r.push(n);}}
return r;}});function winnow(elements,qualifier,not){if(jQuery.isFunction(qualifier)){return jQuery.grep(elements,function(elem,i){return!!qualifier.call(elem,i,elem)!==not;});}
if(qualifier.nodeType){return jQuery.grep(elements,function(elem){return(elem===qualifier)!==not;});}
if(typeof qualifier==="string"){if(isSimple.test(qualifier)){return jQuery.filter(qualifier,elements,not);}
qualifier=jQuery.filter(qualifier,elements);}
return jQuery.grep(elements,function(elem){return(jQuery.inArray(elem,qualifier)>=0)!==not;});}
function createSafeFragment(document){var list=nodeNames.split("|"),safeFrag=document.createDocumentFragment();if(safeFrag.createElement){while(list.length){safeFrag.createElement(list.pop());}}
return safeFrag;}
var nodeNames="abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|"+"header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",rinlinejQuery=/ jQuery\d+="(?:null|\d+)"/g,rnoshimcache=new RegExp("<(?:"+nodeNames+")[\\s/>]","i"),rleadingWhitespace=/^\s+/,rxhtmlTag=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,rtagName=/<([\w:]+)/,rtbody=/<tbody/i,rhtml=/<|&#?\w+;/,rnoInnerhtml=/<(?:script|style|link)/i,manipulation_rcheckableType=/^(?:checkbox|radio)$/i,rchecked=/checked\s*(?:[^=]|=\s*.checked.)/i,rscriptType=/^$|\/(?:java|ecma)script/i,rscriptTypeMasked=/^true\/(.*)/,rcleanScript=/^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,wrapMap={option:[1,"<select multiple='multiple'>","</select>"],legend:[1,"<fieldset>","</fieldset>"],area:[1,"<map>","</map>"],param:[1,"<object>","</object>"],thead:[1,"<table>","</table>"],tr:[2,"<table><tbody>","</tbody></table>"],col:[2,"<table><tbody></tbody><colgroup>","</colgroup></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],_default:jQuery.support.htmlSerialize?[0,"",""]:[1,"X<div>","</div>"]},safeFragment=createSafeFragment(document),fragmentDiv=safeFragment.appendChild(document.createElement("div"));wrapMap.optgroup=wrapMap.option;wrapMap.tbody=wrapMap.tfoot=wrapMap.colgroup=wrapMap.caption=wrapMap.thead;wrapMap.th=wrapMap.td;jQuery.fn.extend({text:function(value){return jQuery.access(this,function(value){return value===undefined?jQuery.text(this):this.empty().append((this[0]&&this[0].ownerDocument||document).createTextNode(value));},null,value,arguments.length);},append:function(){return this.domManip(arguments,function(elem){if(this.nodeType===1||this.nodeType===11||this.nodeType===9){var target=manipulationTarget(this,elem);target.appendChild(elem);}});},prepend:function(){return this.domManip(arguments,function(elem){if(this.nodeType===1||this.nodeType===11||this.nodeType===9){var target=manipulationTarget(this,elem);target.insertBefore(elem,target.firstChild);}});},before:function(){return this.domManip(arguments,function(elem){if(this.parentNode){this.parentNode.insertBefore(elem,this);}});},after:function(){return this.domManip(arguments,function(elem){if(this.parentNode){this.parentNode.insertBefore(elem,this.nextSibling);}});},remove:function(selector,keepData){var elem,elems=selector?jQuery.filter(selector,this):this,i=0;for(;(elem=elems[i])!=null;i++){if(!keepData&&elem.nodeType===1){jQuery.cleanData(getAll(elem));}
if(elem.parentNode){if(keepData&&jQuery.contains(elem.ownerDocument,elem)){setGlobalEval(getAll(elem,"script"));}
elem.parentNode.removeChild(elem);}}
return this;},empty:function(){var elem,i=0;for(;(elem=this[i])!=null;i++){if(elem.nodeType===1){jQuery.cleanData(getAll(elem,false));}
while(elem.firstChild){elem.removeChild(elem.firstChild);}
if(elem.options&&jQuery.nodeName(elem,"select")){elem.options.length=0;}}
return this;},clone:function(dataAndEvents,deepDataAndEvents){dataAndEvents=dataAndEvents==null?false:dataAndEvents;deepDataAndEvents=deepDataAndEvents==null?dataAndEvents:deepDataAndEvents;return this.map(function(){return jQuery.clone(this,dataAndEvents,deepDataAndEvents);});},html:function(value){return jQuery.access(this,function(value){var elem=this[0]||{},i=0,l=this.length;if(value===undefined){return elem.nodeType===1?elem.innerHTML.replace(rinlinejQuery,""):undefined;}
if(typeof value==="string"&&!rnoInnerhtml.test(value)&&(jQuery.support.htmlSerialize||!rnoshimcache.test(value))&&(jQuery.support.leadingWhitespace||!rleadingWhitespace.test(value))&&!wrapMap[(rtagName.exec(value)||["",""])[1].toLowerCase()]){value=value.replace(rxhtmlTag,"<$1></$2>");try{for(;i<l;i++){elem=this[i]||{};if(elem.nodeType===1){jQuery.cleanData(getAll(elem,false));elem.innerHTML=value;}}
elem=0;}catch(e){}}
if(elem){this.empty().append(value);}},null,value,arguments.length);},replaceWith:function(){var
args=jQuery.map(this,function(elem){return[elem.nextSibling,elem.parentNode];}),i=0;this.domManip(arguments,function(elem){var next=args[i++],parent=args[i++];if(parent){if(next&&next.parentNode!==parent){next=this.nextSibling;}
jQuery(this).remove();parent.insertBefore(elem,next);}},true);return i?this:this.remove();},detach:function(selector){return this.remove(selector,true);},domManip:function(args,callback,allowIntersection){args=core_concat.apply([],args);var first,node,hasScripts,scripts,doc,fragment,i=0,l=this.length,set=this,iNoClone=l-1,value=args[0],isFunction=jQuery.isFunction(value);if(isFunction||!(l<=1||typeof value!=="string"||jQuery.support.checkClone||!rchecked.test(value))){return this.each(function(index){var self=set.eq(index);if(isFunction){args[0]=value.call(this,index,self.html());}
self.domManip(args,callback,allowIntersection);});}
if(l){fragment=jQuery.buildFragment(args,this[0].ownerDocument,false,!allowIntersection&&this);first=fragment.firstChild;if(fragment.childNodes.length===1){fragment=first;}
if(first){scripts=jQuery.map(getAll(fragment,"script"),disableScript);hasScripts=scripts.length;for(;i<l;i++){node=fragment;if(i!==iNoClone){node=jQuery.clone(node,true,true);if(hasScripts){jQuery.merge(scripts,getAll(node,"script"));}}
callback.call(this[i],node,i);}
if(hasScripts){doc=scripts[scripts.length-1].ownerDocument;jQuery.map(scripts,restoreScript);for(i=0;i<hasScripts;i++){node=scripts[i];if(rscriptType.test(node.type||"")&&!jQuery._data(node,"globalEval")&&jQuery.contains(doc,node)){if(node.src){jQuery._evalUrl(node.src);}else{jQuery.globalEval((node.text||node.textContent||node.innerHTML||"").replace(rcleanScript,""));}}}}
fragment=first=null;}}
return this;}});function manipulationTarget(elem,content){return jQuery.nodeName(elem,"table")&&jQuery.nodeName(content.nodeType===1?content:content.firstChild,"tr")?elem.getElementsByTagName("tbody")[0]||elem.appendChild(elem.ownerDocument.createElement("tbody")):elem;}
function disableScript(elem){elem.type=(jQuery.find.attr(elem,"type")!==null)+"/"+elem.type;return elem;}
function restoreScript(elem){var match=rscriptTypeMasked.exec(elem.type);if(match){elem.type=match[1];}else{elem.removeAttribute("type");}
return elem;}
function setGlobalEval(elems,refElements){var elem,i=0;for(;(elem=elems[i])!=null;i++){jQuery._data(elem,"globalEval",!refElements||jQuery._data(refElements[i],"globalEval"));}}
function cloneCopyEvent(src,dest){if(dest.nodeType!==1||!jQuery.hasData(src)){return;}
var type,i,l,oldData=jQuery._data(src),curData=jQuery._data(dest,oldData),events=oldData.events;if(events){delete curData.handle;curData.events={};for(type in events){for(i=0,l=events[type].length;i<l;i++){jQuery.event.add(dest,type,events[type][i]);}}}
if(curData.data){curData.data=jQuery.extend({},curData.data);}}
function fixCloneNodeIssues(src,dest){var nodeName,e,data;if(dest.nodeType!==1){return;}
nodeName=dest.nodeName.toLowerCase();if(!jQuery.support.noCloneEvent&&dest[jQuery.expando]){data=jQuery._data(dest);for(e in data.events){jQuery.removeEvent(dest,e,data.handle);}
dest.removeAttribute(jQuery.expando);}
if(nodeName==="script"&&dest.text!==src.text){disableScript(dest).text=src.text;restoreScript(dest);}else if(nodeName==="object"){if(dest.parentNode){dest.outerHTML=src.outerHTML;}
if(jQuery.support.html5Clone&&(src.innerHTML&&!jQuery.trim(dest.innerHTML))){dest.innerHTML=src.innerHTML;}}else if(nodeName==="input"&&manipulation_rcheckableType.test(src.type)){dest.defaultChecked=dest.checked=src.checked;if(dest.value!==src.value){dest.value=src.value;}}else if(nodeName==="option"){dest.defaultSelected=dest.selected=src.defaultSelected;}else if(nodeName==="input"||nodeName==="textarea"){dest.defaultValue=src.defaultValue;}}
jQuery.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(name,original){jQuery.fn[name]=function(selector){var elems,i=0,ret=[],insert=jQuery(selector),last=insert.length-1;for(;i<=last;i++){elems=i===last?this:this.clone(true);jQuery(insert[i])[original](elems);core_push.apply(ret,elems.get());}
return this.pushStack(ret);};});function getAll(context,tag){var elems,elem,i=0,found=typeof context.getElementsByTagName!==core_strundefined?context.getElementsByTagName(tag||"*"):typeof context.querySelectorAll!==core_strundefined?context.querySelectorAll(tag||"*"):undefined;if(!found){for(found=[],elems=context.childNodes||context;(elem=elems[i])!=null;i++){if(!tag||jQuery.nodeName(elem,tag)){found.push(elem);}else{jQuery.merge(found,getAll(elem,tag));}}}
return tag===undefined||tag&&jQuery.nodeName(context,tag)?jQuery.merge([context],found):found;}
function fixDefaultChecked(elem){if(manipulation_rcheckableType.test(elem.type)){elem.defaultChecked=elem.checked;}}
jQuery.extend({clone:function(elem,dataAndEvents,deepDataAndEvents){var destElements,node,clone,i,srcElements,inPage=jQuery.contains(elem.ownerDocument,elem);if(jQuery.support.html5Clone||jQuery.isXMLDoc(elem)||!rnoshimcache.test("<"+elem.nodeName+">")){clone=elem.cloneNode(true);}else{fragmentDiv.innerHTML=elem.outerHTML;fragmentDiv.removeChild(clone=fragmentDiv.firstChild);}
if((!jQuery.support.noCloneEvent||!jQuery.support.noCloneChecked)&&(elem.nodeType===1||elem.nodeType===11)&&!jQuery.isXMLDoc(elem)){destElements=getAll(clone);srcElements=getAll(elem);for(i=0;(node=srcElements[i])!=null;++i){if(destElements[i]){fixCloneNodeIssues(node,destElements[i]);}}}
if(dataAndEvents){if(deepDataAndEvents){srcElements=srcElements||getAll(elem);destElements=destElements||getAll(clone);for(i=0;(node=srcElements[i])!=null;i++){cloneCopyEvent(node,destElements[i]);}}else{cloneCopyEvent(elem,clone);}}
destElements=getAll(clone,"script");if(destElements.length>0){setGlobalEval(destElements,!inPage&&getAll(elem,"script"));}
destElements=srcElements=node=null;return clone;},buildFragment:function(elems,context,scripts,selection){var j,elem,contains,tmp,tag,tbody,wrap,l=elems.length,safe=createSafeFragment(context),nodes=[],i=0;for(;i<l;i++){elem=elems[i];if(elem||elem===0){if(jQuery.type(elem)==="object"){jQuery.merge(nodes,elem.nodeType?[elem]:elem);}else if(!rhtml.test(elem)){nodes.push(context.createTextNode(elem));}else{tmp=tmp||safe.appendChild(context.createElement("div"));tag=(rtagName.exec(elem)||["",""])[1].toLowerCase();wrap=wrapMap[tag]||wrapMap._default;tmp.innerHTML=wrap[1]+elem.replace(rxhtmlTag,"<$1></$2>")+wrap[2];j=wrap[0];while(j--){tmp=tmp.lastChild;}
if(!jQuery.support.leadingWhitespace&&rleadingWhitespace.test(elem)){nodes.push(context.createTextNode(rleadingWhitespace.exec(elem)[0]));}
if(!jQuery.support.tbody){elem=tag==="table"&&!rtbody.test(elem)?tmp.firstChild:wrap[1]==="<table>"&&!rtbody.test(elem)?tmp:0;j=elem&&elem.childNodes.length;while(j--){if(jQuery.nodeName((tbody=elem.childNodes[j]),"tbody")&&!tbody.childNodes.length){elem.removeChild(tbody);}}}
jQuery.merge(nodes,tmp.childNodes);tmp.textContent="";while(tmp.firstChild){tmp.removeChild(tmp.firstChild);}
tmp=safe.lastChild;}}}
if(tmp){safe.removeChild(tmp);}
if(!jQuery.support.appendChecked){jQuery.grep(getAll(nodes,"input"),fixDefaultChecked);}
i=0;while((elem=nodes[i++])){if(selection&&jQuery.inArray(elem,selection)!==-1){continue;}
contains=jQuery.contains(elem.ownerDocument,elem);tmp=getAll(safe.appendChild(elem),"script");if(contains){setGlobalEval(tmp);}
if(scripts){j=0;while((elem=tmp[j++])){if(rscriptType.test(elem.type||"")){scripts.push(elem);}}}}
tmp=null;return safe;},cleanData:function(elems,acceptData){var elem,type,id,data,i=0,internalKey=jQuery.expando,cache=jQuery.cache,deleteExpando=jQuery.support.deleteExpando,special=jQuery.event.special;for(;(elem=elems[i])!=null;i++){if(acceptData||jQuery.acceptData(elem)){id=elem[internalKey];data=id&&cache[id];if(data){if(data.events){for(type in data.events){if(special[type]){jQuery.event.remove(elem,type);}else{jQuery.removeEvent(elem,type,data.handle);}}}
if(cache[id]){delete cache[id];if(deleteExpando){delete elem[internalKey];}else if(typeof elem.removeAttribute!==core_strundefined){elem.removeAttribute(internalKey);}else{elem[internalKey]=null;}
core_deletedIds.push(id);}}}}},_evalUrl:function(url){return jQuery.ajax({url:url,type:"GET",dataType:"script",async:false,global:false,"throws":true});}});jQuery.fn.extend({wrapAll:function(html){if(jQuery.isFunction(html)){return this.each(function(i){jQuery(this).wrapAll(html.call(this,i));});}
if(this[0]){var wrap=jQuery(html,this[0].ownerDocument).eq(0).clone(true);if(this[0].parentNode){wrap.insertBefore(this[0]);}
wrap.map(function(){var elem=this;while(elem.firstChild&&elem.firstChild.nodeType===1){elem=elem.firstChild;}
return elem;}).append(this);}
return this;},wrapInner:function(html){if(jQuery.isFunction(html)){return this.each(function(i){jQuery(this).wrapInner(html.call(this,i));});}
return this.each(function(){var self=jQuery(this),contents=self.contents();if(contents.length){contents.wrapAll(html);}else{self.append(html);}});},wrap:function(html){var isFunction=jQuery.isFunction(html);return this.each(function(i){jQuery(this).wrapAll(isFunction?html.call(this,i):html);});},unwrap:function(){return this.parent().each(function(){if(!jQuery.nodeName(this,"body")){jQuery(this).replaceWith(this.childNodes);}}).end();}});var iframe,getStyles,curCSS,ralpha=/alpha\([^)]*\)/i,ropacity=/opacity\s*=\s*([^)]*)/,rposition=/^(top|right|bottom|left)$/,rdisplayswap=/^(none|table(?!-c[ea]).+)/,rmargin=/^margin/,rnumsplit=new RegExp("^("+core_pnum+")(.*)$","i"),rnumnonpx=new RegExp("^("+core_pnum+")(?!px)[a-z%]+$","i"),rrelNum=new RegExp("^([+-])=("+core_pnum+")","i"),elemdisplay={BODY:"block"},cssShow={position:"absolute",visibility:"hidden",display:"block"},cssNormalTransform={letterSpacing:0,fontWeight:400},cssExpand=["Top","Right","Bottom","Left"],cssPrefixes=["Webkit","O","Moz","ms"];function vendorPropName(style,name){if(name in style){return name;}
var capName=name.charAt(0).toUpperCase()+name.slice(1),origName=name,i=cssPrefixes.length;while(i--){name=cssPrefixes[i]+capName;if(name in style){return name;}}
return origName;}
function isHidden(elem,el){elem=el||elem;return jQuery.css(elem,"display")==="none"||!jQuery.contains(elem.ownerDocument,elem);}
function showHide(elements,show){var display,elem,hidden,values=[],index=0,length=elements.length;for(;index<length;index++){elem=elements[index];if(!elem.style){continue;}
values[index]=jQuery._data(elem,"olddisplay");display=elem.style.display;if(show){if(!values[index]&&display==="none"){elem.style.display="";}
if(elem.style.display===""&&isHidden(elem)){values[index]=jQuery._data(elem,"olddisplay",css_defaultDisplay(elem.nodeName));}}else{if(!values[index]){hidden=isHidden(elem);if(display&&display!=="none"||!hidden){jQuery._data(elem,"olddisplay",hidden?display:jQuery.css(elem,"display"));}}}}
for(index=0;index<length;index++){elem=elements[index];if(!elem.style){continue;}
if(!show||elem.style.display==="none"||elem.style.display===""){elem.style.display=show?values[index]||"":"none";}}
return elements;}
jQuery.fn.extend({css:function(name,value){return jQuery.access(this,function(elem,name,value){var len,styles,map={},i=0;if(jQuery.isArray(name)){styles=getStyles(elem);len=name.length;for(;i<len;i++){map[name[i]]=jQuery.css(elem,name[i],false,styles);}
return map;}
return value!==undefined?jQuery.style(elem,name,value):jQuery.css(elem,name);},name,value,arguments.length>1);},show:function(){return showHide(this,true);},hide:function(){return showHide(this);},toggle:function(state){if(typeof state==="boolean"){return state?this.show():this.hide();}
return this.each(function(){if(isHidden(this)){jQuery(this).show();}else{jQuery(this).hide();}});}});jQuery.extend({cssHooks:{opacity:{get:function(elem,computed){if(computed){var ret=curCSS(elem,"opacity");return ret===""?"1":ret;}}}},cssNumber:{"columnCount":true,"fillOpacity":true,"fontWeight":true,"lineHeight":true,"opacity":true,"order":true,"orphans":true,"widows":true,"zIndex":true,"zoom":true},cssProps:{"float":jQuery.support.cssFloat?"cssFloat":"styleFloat"},style:function(elem,name,value,extra){if(!elem||elem.nodeType===3||elem.nodeType===8||!elem.style){return;}
var ret,type,hooks,origName=jQuery.camelCase(name),style=elem.style;name=jQuery.cssProps[origName]||(jQuery.cssProps[origName]=vendorPropName(style,origName));hooks=jQuery.cssHooks[name]||jQuery.cssHooks[origName];if(value!==undefined){type=typeof value;if(type==="string"&&(ret=rrelNum.exec(value))){value=(ret[1]+1)*ret[2]+parseFloat(jQuery.css(elem,name));type="number";}
if(value==null||type==="number"&&isNaN(value)){return;}
if(type==="number"&&!jQuery.cssNumber[origName]){value+="px";}
if(!jQuery.support.clearCloneStyle&&value===""&&name.indexOf("background")===0){style[name]="inherit";}
if(!hooks||!("set"in hooks)||(value=hooks.set(elem,value,extra))!==undefined){try{style[name]=value;}catch(e){}}}else{if(hooks&&"get"in hooks&&(ret=hooks.get(elem,false,extra))!==undefined){return ret;}
return style[name];}},css:function(elem,name,extra,styles){var num,val,hooks,origName=jQuery.camelCase(name);name=jQuery.cssProps[origName]||(jQuery.cssProps[origName]=vendorPropName(elem.style,origName));hooks=jQuery.cssHooks[name]||jQuery.cssHooks[origName];if(hooks&&"get"in hooks){val=hooks.get(elem,true,extra);}
if(val===undefined){val=curCSS(elem,name,styles);}
if(val==="normal"&&name in cssNormalTransform){val=cssNormalTransform[name];}
if(extra===""||extra){num=parseFloat(val);return extra===true||jQuery.isNumeric(num)?num||0:val;}
return val;}});if(window.getComputedStyle){getStyles=function(elem){return window.getComputedStyle(elem,null);};curCSS=function(elem,name,_computed){var width,minWidth,maxWidth,computed=_computed||getStyles(elem),ret=computed?computed.getPropertyValue(name)||computed[name]:undefined,style=elem.style;if(computed){if(ret===""&&!jQuery.contains(elem.ownerDocument,elem)){ret=jQuery.style(elem,name);}
if(rnumnonpx.test(ret)&&rmargin.test(name)){width=style.width;minWidth=style.minWidth;maxWidth=style.maxWidth;style.minWidth=style.maxWidth=style.width=ret;ret=computed.width;style.width=width;style.minWidth=minWidth;style.maxWidth=maxWidth;}}
return ret;};}else if(document.documentElement.currentStyle){getStyles=function(elem){return elem.currentStyle;};curCSS=function(elem,name,_computed){var left,rs,rsLeft,computed=_computed||getStyles(elem),ret=computed?computed[name]:undefined,style=elem.style;if(ret==null&&style&&style[name]){ret=style[name];}
if(rnumnonpx.test(ret)&&!rposition.test(name)){left=style.left;rs=elem.runtimeStyle;rsLeft=rs&&rs.left;if(rsLeft){rs.left=elem.currentStyle.left;}
style.left=name==="fontSize"?"1em":ret;ret=style.pixelLeft+"px";style.left=left;if(rsLeft){rs.left=rsLeft;}}
return ret===""?"auto":ret;};}
function setPositiveNumber(elem,value,subtract){var matches=rnumsplit.exec(value);return matches?Math.max(0,matches[1]-(subtract||0))+(matches[2]||"px"):value;}
function augmentWidthOrHeight(elem,name,extra,isBorderBox,styles){var i=extra===(isBorderBox?"border":"content")?4:name==="width"?1:0,val=0;for(;i<4;i+=2){if(extra==="margin"){val+=jQuery.css(elem,extra+cssExpand[i],true,styles);}
if(isBorderBox){if(extra==="content"){val-=jQuery.css(elem,"padding"+cssExpand[i],true,styles);}
if(extra!=="margin"){val-=jQuery.css(elem,"border"+cssExpand[i]+"Width",true,styles);}}else{val+=jQuery.css(elem,"padding"+cssExpand[i],true,styles);if(extra!=="padding"){val+=jQuery.css(elem,"border"+cssExpand[i]+"Width",true,styles);}}}
return val;}
function getWidthOrHeight(elem,name,extra){var valueIsBorderBox=true,val=name==="width"?elem.offsetWidth:elem.offsetHeight,styles=getStyles(elem),isBorderBox=jQuery.support.boxSizing&&jQuery.css(elem,"boxSizing",false,styles)==="border-box";if(val<=0||val==null){val=curCSS(elem,name,styles);if(val<0||val==null){val=elem.style[name];}
if(rnumnonpx.test(val)){return val;}
valueIsBorderBox=isBorderBox&&(jQuery.support.boxSizingReliable||val===elem.style[name]);val=parseFloat(val)||0;}
return(val+
augmentWidthOrHeight(elem,name,extra||(isBorderBox?"border":"content"),valueIsBorderBox,styles))+"px";}
function css_defaultDisplay(nodeName){var doc=document,display=elemdisplay[nodeName];if(!display){display=actualDisplay(nodeName,doc);if(display==="none"||!display){iframe=(iframe||jQuery("<iframe frameborder='0' width='0' height='0'/>").css("cssText","display:block !important")).appendTo(doc.documentElement);doc=(iframe[0].contentWindow||iframe[0].contentDocument).document;doc.write("<!doctype html><html><body>");doc.close();display=actualDisplay(nodeName,doc);iframe.detach();}
elemdisplay[nodeName]=display;}
return display;}
function actualDisplay(name,doc){var elem=jQuery(doc.createElement(name)).appendTo(doc.body),display=jQuery.css(elem[0],"display");elem.remove();return display;}
jQuery.each(["height","width"],function(i,name){jQuery.cssHooks[name]={get:function(elem,computed,extra){if(computed){return elem.offsetWidth===0&&rdisplayswap.test(jQuery.css(elem,"display"))?jQuery.swap(elem,cssShow,function(){return getWidthOrHeight(elem,name,extra);}):getWidthOrHeight(elem,name,extra);}},set:function(elem,value,extra){var styles=extra&&getStyles(elem);return setPositiveNumber(elem,value,extra?augmentWidthOrHeight(elem,name,extra,jQuery.support.boxSizing&&jQuery.css(elem,"boxSizing",false,styles)==="border-box",styles):0);}};});if(!jQuery.support.opacity){jQuery.cssHooks.opacity={get:function(elem,computed){return ropacity.test((computed&&elem.currentStyle?elem.currentStyle.filter:elem.style.filter)||"")?(0.01*parseFloat(RegExp.$1))+"":computed?"1":"";},set:function(elem,value){var style=elem.style,currentStyle=elem.currentStyle,opacity=jQuery.isNumeric(value)?"alpha(opacity="+value*100+")":"",filter=currentStyle&&currentStyle.filter||style.filter||"";style.zoom=1;if((value>=1||value==="")&&jQuery.trim(filter.replace(ralpha,""))===""&&style.removeAttribute){style.removeAttribute("filter");if(value===""||currentStyle&&!currentStyle.filter){return;}}
style.filter=ralpha.test(filter)?filter.replace(ralpha,opacity):filter+" "+opacity;}};}
jQuery(function(){if(!jQuery.support.reliableMarginRight){jQuery.cssHooks.marginRight={get:function(elem,computed){if(computed){return jQuery.swap(elem,{"display":"inline-block"},curCSS,[elem,"marginRight"]);}}};}
if(!jQuery.support.pixelPosition&&jQuery.fn.position){jQuery.each(["top","left"],function(i,prop){jQuery.cssHooks[prop]={get:function(elem,computed){if(computed){computed=curCSS(elem,prop);return rnumnonpx.test(computed)?jQuery(elem).position()[prop]+"px":computed;}}};});}});if(jQuery.expr&&jQuery.expr.filters){jQuery.expr.filters.hidden=function(elem){return elem.offsetWidth<=0&&elem.offsetHeight<=0||(!jQuery.support.reliableHiddenOffsets&&((elem.style&&elem.style.display)||jQuery.css(elem,"display"))==="none");};jQuery.expr.filters.visible=function(elem){return!jQuery.expr.filters.hidden(elem);};}
jQuery.each({margin:"",padding:"",border:"Width"},function(prefix,suffix){jQuery.cssHooks[prefix+suffix]={expand:function(value){var i=0,expanded={},parts=typeof value==="string"?value.split(" "):[value];for(;i<4;i++){expanded[prefix+cssExpand[i]+suffix]=parts[i]||parts[i-2]||parts[0];}
return expanded;}};if(!rmargin.test(prefix)){jQuery.cssHooks[prefix+suffix].set=setPositiveNumber;}});var r20=/%20/g,rbracket=/\[\]$/,rCRLF=/\r?\n/g,rsubmitterTypes=/^(?:submit|button|image|reset|file)$/i,rsubmittable=/^(?:input|select|textarea|keygen)/i;jQuery.fn.extend({serialize:function(){return jQuery.param(this.serializeArray());},serializeArray:function(){return this.map(function(){var elements=jQuery.prop(this,"elements");return elements?jQuery.makeArray(elements):this;}).filter(function(){var type=this.type;return this.name&&!jQuery(this).is(":disabled")&&rsubmittable.test(this.nodeName)&&!rsubmitterTypes.test(type)&&(this.checked||!manipulation_rcheckableType.test(type));}).map(function(i,elem){var val=jQuery(this).val();return val==null?null:jQuery.isArray(val)?jQuery.map(val,function(val){return{name:elem.name,value:val.replace(rCRLF,"\r\n")};}):{name:elem.name,value:val.replace(rCRLF,"\r\n")};}).get();}});jQuery.param=function(a,traditional){var prefix,s=[],add=function(key,value){value=jQuery.isFunction(value)?value():(value==null?"":value);s[s.length]=encodeURIComponent(key)+"="+encodeURIComponent(value);};if(traditional===undefined){traditional=jQuery.ajaxSettings&&jQuery.ajaxSettings.traditional;}
if(jQuery.isArray(a)||(a.jquery&&!jQuery.isPlainObject(a))){jQuery.each(a,function(){add(this.name,this.value);});}else{for(prefix in a){buildParams(prefix,a[prefix],traditional,add);}}
return s.join("&").replace(r20,"+");};function buildParams(prefix,obj,traditional,add){var name;if(jQuery.isArray(obj)){jQuery.each(obj,function(i,v){if(traditional||rbracket.test(prefix)){add(prefix,v);}else{buildParams(prefix+"["+(typeof v==="object"?i:"")+"]",v,traditional,add);}});}else if(!traditional&&jQuery.type(obj)==="object"){for(name in obj){buildParams(prefix+"["+name+"]",obj[name],traditional,add);}}else{add(prefix,obj);}}
jQuery.each(("blur focus focusin focusout load resize scroll unload click dblclick "+"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave "+"change select submit keydown keypress keyup error contextmenu").split(" "),function(i,name){jQuery.fn[name]=function(data,fn){return arguments.length>0?this.on(name,null,data,fn):this.trigger(name);};});jQuery.fn.extend({hover:function(fnOver,fnOut){return this.mouseenter(fnOver).mouseleave(fnOut||fnOver);},bind:function(types,data,fn){return this.on(types,null,data,fn);},unbind:function(types,fn){return this.off(types,null,fn);},delegate:function(selector,types,data,fn){return this.on(types,selector,data,fn);},undelegate:function(selector,types,fn){return arguments.length===1?this.off(selector,"**"):this.off(types,selector||"**",fn);}});var
ajaxLocParts,ajaxLocation,ajax_nonce=jQuery.now(),ajax_rquery=/\?/,rhash=/#.*$/,rts=/([?&])_=[^&]*/,rheaders=/^(.*?):[ \t]*([^\r\n]*)\r?$/mg,rlocalProtocol=/^(?:about|app|app-storage|.+-extension|file|res|widget):$/,rnoContent=/^(?:GET|HEAD)$/,rprotocol=/^\/\//,rurl=/^([\w.+-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/,_load=jQuery.fn.load,prefilters={},transports={},allTypes="*/".concat("*");try{ajaxLocation=location.href;}catch(e){ajaxLocation=document.createElement("a");ajaxLocation.href="";ajaxLocation=ajaxLocation.href;}
ajaxLocParts=rurl.exec(ajaxLocation.toLowerCase())||[];function addToPrefiltersOrTransports(structure){return function(dataTypeExpression,func){if(typeof dataTypeExpression!=="string"){func=dataTypeExpression;dataTypeExpression="*";}
var dataType,i=0,dataTypes=dataTypeExpression.toLowerCase().match(core_rnotwhite)||[];if(jQuery.isFunction(func)){while((dataType=dataTypes[i++])){if(dataType[0]==="+"){dataType=dataType.slice(1)||"*";(structure[dataType]=structure[dataType]||[]).unshift(func);}else{(structure[dataType]=structure[dataType]||[]).push(func);}}}};}
function inspectPrefiltersOrTransports(structure,options,originalOptions,jqXHR){var inspected={},seekingTransport=(structure===transports);function inspect(dataType){var selected;inspected[dataType]=true;jQuery.each(structure[dataType]||[],function(_,prefilterOrFactory){var dataTypeOrTransport=prefilterOrFactory(options,originalOptions,jqXHR);if(typeof dataTypeOrTransport==="string"&&!seekingTransport&&!inspected[dataTypeOrTransport]){options.dataTypes.unshift(dataTypeOrTransport);inspect(dataTypeOrTransport);return false;}else if(seekingTransport){return!(selected=dataTypeOrTransport);}});return selected;}
return inspect(options.dataTypes[0])||!inspected["*"]&&inspect("*");}
function ajaxExtend(target,src){var deep,key,flatOptions=jQuery.ajaxSettings.flatOptions||{};for(key in src){if(src[key]!==undefined){(flatOptions[key]?target:(deep||(deep={})))[key]=src[key];}}
if(deep){jQuery.extend(true,target,deep);}
return target;}
jQuery.fn.load=function(url,params,callback){if(typeof url!=="string"&&_load){return _load.apply(this,arguments);}
var selector,response,type,self=this,off=url.indexOf(" ");if(off>=0){selector=url.slice(off,url.length);url=url.slice(0,off);}
if(jQuery.isFunction(params)){callback=params;params=undefined;}else if(params&&typeof params==="object"){type="POST";}
if(self.length>0){jQuery.ajax({url:url,type:type,dataType:"html",data:params}).done(function(responseText){response=arguments;self.html(selector?jQuery("<div>").append(jQuery.parseHTML(responseText)).find(selector):responseText);}).complete(callback&&function(jqXHR,status){self.each(callback,response||[jqXHR.responseText,status,jqXHR]);});}
return this;};jQuery.each(["ajaxStart","ajaxStop","ajaxComplete","ajaxError","ajaxSuccess","ajaxSend"],function(i,type){jQuery.fn[type]=function(fn){return this.on(type,fn);};});jQuery.extend({active:0,lastModified:{},etag:{},ajaxSettings:{url:ajaxLocation,type:"GET",isLocal:rlocalProtocol.test(ajaxLocParts[1]),global:true,processData:true,async:true,contentType:"application/x-www-form-urlencoded; charset=UTF-8",accepts:{"*":allTypes,text:"text/plain",html:"text/html",xml:"application/xml, text/xml",json:"application/json, text/javascript"},contents:{xml:/xml/,html:/html/,json:/json/},responseFields:{xml:"responseXML",text:"responseText",json:"responseJSON"},converters:{"* text":String,"text html":true,"text json":jQuery.parseJSON,"text xml":jQuery.parseXML},flatOptions:{url:true,context:true}},ajaxSetup:function(target,settings){return settings?ajaxExtend(ajaxExtend(target,jQuery.ajaxSettings),settings):ajaxExtend(jQuery.ajaxSettings,target);},ajaxPrefilter:addToPrefiltersOrTransports(prefilters),ajaxTransport:addToPrefiltersOrTransports(transports),ajax:function(url,options){if(typeof url==="object"){options=url;url=undefined;}
options=options||{};var
parts,i,cacheURL,responseHeadersString,timeoutTimer,fireGlobals,transport,responseHeaders,s=jQuery.ajaxSetup({},options),callbackContext=s.context||s,globalEventContext=s.context&&(callbackContext.nodeType||callbackContext.jquery)?jQuery(callbackContext):jQuery.event,deferred=jQuery.Deferred(),completeDeferred=jQuery.Callbacks("once memory"),statusCode=s.statusCode||{},requestHeaders={},requestHeadersNames={},state=0,strAbort="canceled",jqXHR={readyState:0,getResponseHeader:function(key){var match;if(state===2){if(!responseHeaders){responseHeaders={};while((match=rheaders.exec(responseHeadersString))){responseHeaders[match[1].toLowerCase()]=match[2];}}
match=responseHeaders[key.toLowerCase()];}
return match==null?null:match;},getAllResponseHeaders:function(){return state===2?responseHeadersString:null;},setRequestHeader:function(name,value){var lname=name.toLowerCase();if(!state){name=requestHeadersNames[lname]=requestHeadersNames[lname]||name;requestHeaders[name]=value;}
return this;},overrideMimeType:function(type){if(!state){s.mimeType=type;}
return this;},statusCode:function(map){var code;if(map){if(state<2){for(code in map){statusCode[code]=[statusCode[code],map[code]];}}else{jqXHR.always(map[jqXHR.status]);}}
return this;},abort:function(statusText){var finalText=statusText||strAbort;if(transport){transport.abort(finalText);}
done(0,finalText);return this;}};deferred.promise(jqXHR).complete=completeDeferred.add;jqXHR.success=jqXHR.done;jqXHR.error=jqXHR.fail;s.url=((url||s.url||ajaxLocation)+"").replace(rhash,"").replace(rprotocol,ajaxLocParts[1]+"//");s.type=options.method||options.type||s.method||s.type;s.dataTypes=jQuery.trim(s.dataType||"*").toLowerCase().match(core_rnotwhite)||[""];if(s.crossDomain==null){parts=rurl.exec(s.url.toLowerCase());s.crossDomain=!!(parts&&(parts[1]!==ajaxLocParts[1]||parts[2]!==ajaxLocParts[2]||(parts[3]||(parts[1]==="http:"?"80":"443"))!==(ajaxLocParts[3]||(ajaxLocParts[1]==="http:"?"80":"443"))));}
if(s.data&&s.processData&&typeof s.data!=="string"){s.data=jQuery.param(s.data,s.traditional);}
inspectPrefiltersOrTransports(prefilters,s,options,jqXHR);if(state===2){return jqXHR;}
fireGlobals=s.global;if(fireGlobals&&jQuery.active++===0){jQuery.event.trigger("ajaxStart");}
s.type=s.type.toUpperCase();s.hasContent=!rnoContent.test(s.type);cacheURL=s.url;if(!s.hasContent){if(s.data){cacheURL=(s.url+=(ajax_rquery.test(cacheURL)?"&":"?")+s.data);delete s.data;}
if(s.cache===false){s.url=rts.test(cacheURL)?cacheURL.replace(rts,"$1_="+ajax_nonce++):cacheURL+(ajax_rquery.test(cacheURL)?"&":"?")+"_="+ajax_nonce++;}}
if(s.ifModified){if(jQuery.lastModified[cacheURL]){jqXHR.setRequestHeader("If-Modified-Since",jQuery.lastModified[cacheURL]);}
if(jQuery.etag[cacheURL]){jqXHR.setRequestHeader("If-None-Match",jQuery.etag[cacheURL]);}}
if(s.data&&s.hasContent&&s.contentType!==false||options.contentType){jqXHR.setRequestHeader("Content-Type",s.contentType);}
jqXHR.setRequestHeader("Accept",s.dataTypes[0]&&s.accepts[s.dataTypes[0]]?s.accepts[s.dataTypes[0]]+(s.dataTypes[0]!=="*"?", "+allTypes+"; q=0.01":""):s.accepts["*"]);for(i in s.headers){jqXHR.setRequestHeader(i,s.headers[i]);}
if(s.beforeSend&&(s.beforeSend.call(callbackContext,jqXHR,s)===false||state===2)){return jqXHR.abort();}
strAbort="abort";for(i in{success:1,error:1,complete:1}){jqXHR[i](s[i]);}
transport=inspectPrefiltersOrTransports(transports,s,options,jqXHR);if(!transport){done(-1,"No Transport");}else{jqXHR.readyState=1;if(fireGlobals){globalEventContext.trigger("ajaxSend",[jqXHR,s]);}
if(s.async&&s.timeout>0){timeoutTimer=setTimeout(function(){jqXHR.abort("timeout");},s.timeout);}
try{state=1;transport.send(requestHeaders,done);}catch(e){if(state<2){done(-1,e);}else{throw e;}}}
function done(status,nativeStatusText,responses,headers){var isSuccess,success,error,response,modified,statusText=nativeStatusText;if(state===2){return;}
state=2;if(timeoutTimer){clearTimeout(timeoutTimer);}
transport=undefined;responseHeadersString=headers||"";jqXHR.readyState=status>0?4:0;isSuccess=status>=200&&status<300||status===304;if(responses){response=ajaxHandleResponses(s,jqXHR,responses);}
response=ajaxConvert(s,response,jqXHR,isSuccess);if(isSuccess){if(s.ifModified){modified=jqXHR.getResponseHeader("Last-Modified");if(modified){jQuery.lastModified[cacheURL]=modified;}
modified=jqXHR.getResponseHeader("etag");if(modified){jQuery.etag[cacheURL]=modified;}}
if(status===204||s.type==="HEAD"){statusText="nocontent";}else if(status===304){statusText="notmodified";}else{statusText=response.state;success=response.data;error=response.error;isSuccess=!error;}}else{error=statusText;if(status||!statusText){statusText="error";if(status<0){status=0;}}}
jqXHR.status=status;jqXHR.statusText=(nativeStatusText||statusText)+"";if(isSuccess){deferred.resolveWith(callbackContext,[success,statusText,jqXHR]);}else{deferred.rejectWith(callbackContext,[jqXHR,statusText,error]);}
jqXHR.statusCode(statusCode);statusCode=undefined;if(fireGlobals){globalEventContext.trigger(isSuccess?"ajaxSuccess":"ajaxError",[jqXHR,s,isSuccess?success:error]);}
completeDeferred.fireWith(callbackContext,[jqXHR,statusText]);if(fireGlobals){globalEventContext.trigger("ajaxComplete",[jqXHR,s]);if(!(--jQuery.active)){jQuery.event.trigger("ajaxStop");}}}
return jqXHR;},getJSON:function(url,data,callback){return jQuery.get(url,data,callback,"json");},getScript:function(url,callback){return jQuery.get(url,undefined,callback,"script");}});jQuery.each(["get","post"],function(i,method){jQuery[method]=function(url,data,callback,type){if(jQuery.isFunction(data)){type=type||callback;callback=data;data=undefined;}
return jQuery.ajax({url:url,type:method,dataType:type,data:data,success:callback});};});function ajaxHandleResponses(s,jqXHR,responses){var firstDataType,ct,finalDataType,type,contents=s.contents,dataTypes=s.dataTypes;while(dataTypes[0]==="*"){dataTypes.shift();if(ct===undefined){ct=s.mimeType||jqXHR.getResponseHeader("Content-Type");}}
if(ct){for(type in contents){if(contents[type]&&contents[type].test(ct)){dataTypes.unshift(type);break;}}}
if(dataTypes[0]in responses){finalDataType=dataTypes[0];}else{for(type in responses){if(!dataTypes[0]||s.converters[type+" "+dataTypes[0]]){finalDataType=type;break;}
if(!firstDataType){firstDataType=type;}}
finalDataType=finalDataType||firstDataType;}
if(finalDataType){if(finalDataType!==dataTypes[0]){dataTypes.unshift(finalDataType);}
return responses[finalDataType];}}
function ajaxConvert(s,response,jqXHR,isSuccess){var conv2,current,conv,tmp,prev,converters={},dataTypes=s.dataTypes.slice();if(dataTypes[1]){for(conv in s.converters){converters[conv.toLowerCase()]=s.converters[conv];}}
current=dataTypes.shift();while(current){if(s.responseFields[current]){jqXHR[s.responseFields[current]]=response;}
if(!prev&&isSuccess&&s.dataFilter){response=s.dataFilter(response,s.dataType);}
prev=current;current=dataTypes.shift();if(current){if(current==="*"){current=prev;}else if(prev!=="*"&&prev!==current){conv=converters[prev+" "+current]||converters["* "+current];if(!conv){for(conv2 in converters){tmp=conv2.split(" ");if(tmp[1]===current){conv=converters[prev+" "+tmp[0]]||converters["* "+tmp[0]];if(conv){if(conv===true){conv=converters[conv2];}else if(converters[conv2]!==true){current=tmp[0];dataTypes.unshift(tmp[1]);}
break;}}}}
if(conv!==true){if(conv&&s["throws"]){response=conv(response);}else{try{response=conv(response);}catch(e){return{state:"parsererror",error:conv?e:"No conversion from "+prev+" to "+current};}}}}}}
return{state:"success",data:response};}
jQuery.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/(?:java|ecma)script/},converters:{"text script":function(text){jQuery.globalEval(text);return text;}}});jQuery.ajaxPrefilter("script",function(s){if(s.cache===undefined){s.cache=false;}
if(s.crossDomain){s.type="GET";s.global=false;}});jQuery.ajaxTransport("script",function(s){if(s.crossDomain){var script,head=document.head||jQuery("head")[0]||document.documentElement;return{send:function(_,callback){script=document.createElement("script");script.async=true;if(s.scriptCharset){script.charset=s.scriptCharset;}
script.src=s.url;script.onload=script.onreadystatechange=function(_,isAbort){if(isAbort||!script.readyState||/loaded|complete/.test(script.readyState)){script.onload=script.onreadystatechange=null;if(script.parentNode){script.parentNode.removeChild(script);}
script=null;if(!isAbort){callback(200,"success");}}};head.insertBefore(script,head.firstChild);},abort:function(){if(script){script.onload(undefined,true);}}};}});var oldCallbacks=[],rjsonp=/(=)\?(?=&|$)|\?\?/;jQuery.ajaxSetup({jsonp:"callback",jsonpCallback:function(){var callback=oldCallbacks.pop()||(jQuery.expando+"_"+(ajax_nonce++));this[callback]=true;return callback;}});jQuery.ajaxPrefilter("json jsonp",function(s,originalSettings,jqXHR){var callbackName,overwritten,responseContainer,jsonProp=s.jsonp!==false&&(rjsonp.test(s.url)?"url":typeof s.data==="string"&&!(s.contentType||"").indexOf("application/x-www-form-urlencoded")&&rjsonp.test(s.data)&&"data");if(jsonProp||s.dataTypes[0]==="jsonp"){callbackName=s.jsonpCallback=jQuery.isFunction(s.jsonpCallback)?s.jsonpCallback():s.jsonpCallback;if(jsonProp){s[jsonProp]=s[jsonProp].replace(rjsonp,"$1"+callbackName);}else if(s.jsonp!==false){s.url+=(ajax_rquery.test(s.url)?"&":"?")+s.jsonp+"="+callbackName;}
s.converters["script json"]=function(){if(!responseContainer){jQuery.error(callbackName+" was not called");}
return responseContainer[0];};s.dataTypes[0]="json";overwritten=window[callbackName];window[callbackName]=function(){responseContainer=arguments;};jqXHR.always(function(){window[callbackName]=overwritten;if(s[callbackName]){s.jsonpCallback=originalSettings.jsonpCallback;oldCallbacks.push(callbackName);}
if(responseContainer&&jQuery.isFunction(overwritten)){overwritten(responseContainer[0]);}
responseContainer=overwritten=undefined;});return"script";}});var xhrCallbacks,xhrSupported,xhrId=0,xhrOnUnloadAbort=window.ActiveXObject&&function(){var key;for(key in xhrCallbacks){xhrCallbacks[key](undefined,true);}};function createStandardXHR(){try{return new window.XMLHttpRequest();}catch(e){}}
function createActiveXHR(){try{return new window.ActiveXObject("Microsoft.XMLHTTP");}catch(e){}}
jQuery.ajaxSettings.xhr=window.ActiveXObject?function(){return!this.isLocal&&createStandardXHR()||createActiveXHR();}:createStandardXHR;xhrSupported=jQuery.ajaxSettings.xhr();jQuery.support.cors=!!xhrSupported&&("withCredentials"in xhrSupported);xhrSupported=jQuery.support.ajax=!!xhrSupported;if(xhrSupported){jQuery.ajaxTransport(function(s){if(!s.crossDomain||jQuery.support.cors){var callback;return{send:function(headers,complete){var handle,i,xhr=s.xhr();if(s.username){xhr.open(s.type,s.url,s.async,s.username,s.password);}else{xhr.open(s.type,s.url,s.async);}
if(s.xhrFields){for(i in s.xhrFields){xhr[i]=s.xhrFields[i];}}
if(s.mimeType&&xhr.overrideMimeType){xhr.overrideMimeType(s.mimeType);}
if(!s.crossDomain&&!headers["X-Requested-With"]){headers["X-Requested-With"]="XMLHttpRequest";}
try{for(i in headers){xhr.setRequestHeader(i,headers[i]);}}catch(err){}
xhr.send((s.hasContent&&s.data)||null);callback=function(_,isAbort){var status,responseHeaders,statusText,responses;try{if(callback&&(isAbort||xhr.readyState===4)){callback=undefined;if(handle){xhr.onreadystatechange=jQuery.noop;if(xhrOnUnloadAbort){delete xhrCallbacks[handle];}}
if(isAbort){if(xhr.readyState!==4){xhr.abort();}}else{responses={};status=xhr.status;responseHeaders=xhr.getAllResponseHeaders();if(typeof xhr.responseText==="string"){responses.text=xhr.responseText;}
try{statusText=xhr.statusText;}catch(e){statusText="";}
if(!status&&s.isLocal&&!s.crossDomain){status=responses.text?200:404;}else if(status===1223){status=204;}}}}catch(firefoxAccessException){if(!isAbort){complete(-1,firefoxAccessException);}}
if(responses){complete(status,statusText,responses,responseHeaders);}};if(!s.async){callback();}else if(xhr.readyState===4){setTimeout(callback);}else{handle=++xhrId;if(xhrOnUnloadAbort){if(!xhrCallbacks){xhrCallbacks={};jQuery(window).unload(xhrOnUnloadAbort);}
xhrCallbacks[handle]=callback;}
xhr.onreadystatechange=callback;}},abort:function(){if(callback){callback(undefined,true);}}};}});}
var fxNow,timerId,rfxtypes=/^(?:toggle|show|hide)$/,rfxnum=new RegExp("^(?:([+-])=|)("+core_pnum+")([a-z%]*)$","i"),rrun=/queueHooks$/,animationPrefilters=[defaultPrefilter],tweeners={"*":[function(prop,value){var tween=this.createTween(prop,value),target=tween.cur(),parts=rfxnum.exec(value),unit=parts&&parts[3]||(jQuery.cssNumber[prop]?"":"px"),start=(jQuery.cssNumber[prop]||unit!=="px"&&+target)&&rfxnum.exec(jQuery.css(tween.elem,prop)),scale=1,maxIterations=20;if(start&&start[3]!==unit){unit=unit||start[3];parts=parts||[];start=+target||1;do{scale=scale||".5";start=start/scale;jQuery.style(tween.elem,prop,start+unit);}while(scale!==(scale=tween.cur()/target)&&scale!==1&&--maxIterations);}
if(parts){start=tween.start=+start||+target||0;tween.unit=unit;tween.end=parts[1]?start+(parts[1]+1)*parts[2]:+parts[2];}
return tween;}]};function createFxNow(){setTimeout(function(){fxNow=undefined;});return(fxNow=jQuery.now());}
function createTween(value,prop,animation){var tween,collection=(tweeners[prop]||[]).concat(tweeners["*"]),index=0,length=collection.length;for(;index<length;index++){if((tween=collection[index].call(animation,prop,value))){return tween;}}}
function Animation(elem,properties,options){var result,stopped,index=0,length=animationPrefilters.length,deferred=jQuery.Deferred().always(function(){delete tick.elem;}),tick=function(){if(stopped){return false;}
var currentTime=fxNow||createFxNow(),remaining=Math.max(0,animation.startTime+animation.duration-currentTime),temp=remaining/animation.duration||0,percent=1-temp,index=0,length=animation.tweens.length;for(;index<length;index++){animation.tweens[index].run(percent);}
deferred.notifyWith(elem,[animation,percent,remaining]);if(percent<1&&length){return remaining;}else{deferred.resolveWith(elem,[animation]);return false;}},animation=deferred.promise({elem:elem,props:jQuery.extend({},properties),opts:jQuery.extend(true,{specialEasing:{}},options),originalProperties:properties,originalOptions:options,startTime:fxNow||createFxNow(),duration:options.duration,tweens:[],createTween:function(prop,end){var tween=jQuery.Tween(elem,animation.opts,prop,end,animation.opts.specialEasing[prop]||animation.opts.easing);animation.tweens.push(tween);return tween;},stop:function(gotoEnd){var index=0,length=gotoEnd?animation.tweens.length:0;if(stopped){return this;}
stopped=true;for(;index<length;index++){animation.tweens[index].run(1);}
if(gotoEnd){deferred.resolveWith(elem,[animation,gotoEnd]);}else{deferred.rejectWith(elem,[animation,gotoEnd]);}
return this;}}),props=animation.props;propFilter(props,animation.opts.specialEasing);for(;index<length;index++){result=animationPrefilters[index].call(animation,elem,props,animation.opts);if(result){return result;}}
jQuery.map(props,createTween,animation);if(jQuery.isFunction(animation.opts.start)){animation.opts.start.call(elem,animation);}
jQuery.fx.timer(jQuery.extend(tick,{elem:elem,anim:animation,queue:animation.opts.queue}));return animation.progress(animation.opts.progress).done(animation.opts.done,animation.opts.complete).fail(animation.opts.fail).always(animation.opts.always);}
function propFilter(props,specialEasing){var index,name,easing,value,hooks;for(index in props){name=jQuery.camelCase(index);easing=specialEasing[name];value=props[index];if(jQuery.isArray(value)){easing=value[1];value=props[index]=value[0];}
if(index!==name){props[name]=value;delete props[index];}
hooks=jQuery.cssHooks[name];if(hooks&&"expand"in hooks){value=hooks.expand(value);delete props[name];for(index in value){if(!(index in props)){props[index]=value[index];specialEasing[index]=easing;}}}else{specialEasing[name]=easing;}}}
jQuery.Animation=jQuery.extend(Animation,{tweener:function(props,callback){if(jQuery.isFunction(props)){callback=props;props=["*"];}else{props=props.split(" ");}
var prop,index=0,length=props.length;for(;index<length;index++){prop=props[index];tweeners[prop]=tweeners[prop]||[];tweeners[prop].unshift(callback);}},prefilter:function(callback,prepend){if(prepend){animationPrefilters.unshift(callback);}else{animationPrefilters.push(callback);}}});function defaultPrefilter(elem,props,opts){var prop,value,toggle,tween,hooks,oldfire,anim=this,orig={},style=elem.style,hidden=elem.nodeType&&isHidden(elem),dataShow=jQuery._data(elem,"fxshow");if(!opts.queue){hooks=jQuery._queueHooks(elem,"fx");if(hooks.unqueued==null){hooks.unqueued=0;oldfire=hooks.empty.fire;hooks.empty.fire=function(){if(!hooks.unqueued){oldfire();}};}
hooks.unqueued++;anim.always(function(){anim.always(function(){hooks.unqueued--;if(!jQuery.queue(elem,"fx").length){hooks.empty.fire();}});});}
if(elem.nodeType===1&&("height"in props||"width"in props)){opts.overflow=[style.overflow,style.overflowX,style.overflowY];if(jQuery.css(elem,"display")==="inline"&&jQuery.css(elem,"float")==="none"){if(!jQuery.support.inlineBlockNeedsLayout||css_defaultDisplay(elem.nodeName)==="inline"){style.display="inline-block";}else{style.zoom=1;}}}
if(opts.overflow){style.overflow="hidden";if(!jQuery.support.shrinkWrapBlocks){anim.always(function(){style.overflow=opts.overflow[0];style.overflowX=opts.overflow[1];style.overflowY=opts.overflow[2];});}}
for(prop in props){value=props[prop];if(rfxtypes.exec(value)){delete props[prop];toggle=toggle||value==="toggle";if(value===(hidden?"hide":"show")){continue;}
orig[prop]=dataShow&&dataShow[prop]||jQuery.style(elem,prop);}}
if(!jQuery.isEmptyObject(orig)){if(dataShow){if("hidden"in dataShow){hidden=dataShow.hidden;}}else{dataShow=jQuery._data(elem,"fxshow",{});}
if(toggle){dataShow.hidden=!hidden;}
if(hidden){jQuery(elem).show();}else{anim.done(function(){jQuery(elem).hide();});}
anim.done(function(){var prop;jQuery._removeData(elem,"fxshow");for(prop in orig){jQuery.style(elem,prop,orig[prop]);}});for(prop in orig){tween=createTween(hidden?dataShow[prop]:0,prop,anim);if(!(prop in dataShow)){dataShow[prop]=tween.start;if(hidden){tween.end=tween.start;tween.start=prop==="width"||prop==="height"?1:0;}}}}}
function Tween(elem,options,prop,end,easing){return new Tween.prototype.init(elem,options,prop,end,easing);}
jQuery.Tween=Tween;Tween.prototype={constructor:Tween,init:function(elem,options,prop,end,easing,unit){this.elem=elem;this.prop=prop;this.easing=easing||"swing";this.options=options;this.start=this.now=this.cur();this.end=end;this.unit=unit||(jQuery.cssNumber[prop]?"":"px");},cur:function(){var hooks=Tween.propHooks[this.prop];return hooks&&hooks.get?hooks.get(this):Tween.propHooks._default.get(this);},run:function(percent){var eased,hooks=Tween.propHooks[this.prop];if(this.options.duration){this.pos=eased=jQuery.easing[this.easing](percent,this.options.duration*percent,0,1,this.options.duration);}else{this.pos=eased=percent;}
this.now=(this.end-this.start)*eased+this.start;if(this.options.step){this.options.step.call(this.elem,this.now,this);}
if(hooks&&hooks.set){hooks.set(this);}else{Tween.propHooks._default.set(this);}
return this;}};Tween.prototype.init.prototype=Tween.prototype;Tween.propHooks={_default:{get:function(tween){var result;if(tween.elem[tween.prop]!=null&&(!tween.elem.style||tween.elem.style[tween.prop]==null)){return tween.elem[tween.prop];}
result=jQuery.css(tween.elem,tween.prop,"");return!result||result==="auto"?0:result;},set:function(tween){if(jQuery.fx.step[tween.prop]){jQuery.fx.step[tween.prop](tween);}else if(tween.elem.style&&(tween.elem.style[jQuery.cssProps[tween.prop]]!=null||jQuery.cssHooks[tween.prop])){jQuery.style(tween.elem,tween.prop,tween.now+tween.unit);}else{tween.elem[tween.prop]=tween.now;}}}};Tween.propHooks.scrollTop=Tween.propHooks.scrollLeft={set:function(tween){if(tween.elem.nodeType&&tween.elem.parentNode){tween.elem[tween.prop]=tween.now;}}};jQuery.each(["toggle","show","hide"],function(i,name){var cssFn=jQuery.fn[name];jQuery.fn[name]=function(speed,easing,callback){return speed==null||typeof speed==="boolean"?cssFn.apply(this,arguments):this.animate(genFx(name,true),speed,easing,callback);};});jQuery.fn.extend({fadeTo:function(speed,to,easing,callback){return this.filter(isHidden).css("opacity",0).show().end().animate({opacity:to},speed,easing,callback);},animate:function(prop,speed,easing,callback){var empty=jQuery.isEmptyObject(prop),optall=jQuery.speed(speed,easing,callback),doAnimation=function(){var anim=Animation(this,jQuery.extend({},prop),optall);if(empty||jQuery._data(this,"finish")){anim.stop(true);}};doAnimation.finish=doAnimation;return empty||optall.queue===false?this.each(doAnimation):this.queue(optall.queue,doAnimation);},stop:function(type,clearQueue,gotoEnd){var stopQueue=function(hooks){var stop=hooks.stop;delete hooks.stop;stop(gotoEnd);};if(typeof type!=="string"){gotoEnd=clearQueue;clearQueue=type;type=undefined;}
if(clearQueue&&type!==false){this.queue(type||"fx",[]);}
return this.each(function(){var dequeue=true,index=type!=null&&type+"queueHooks",timers=jQuery.timers,data=jQuery._data(this);if(index){if(data[index]&&data[index].stop){stopQueue(data[index]);}}else{for(index in data){if(data[index]&&data[index].stop&&rrun.test(index)){stopQueue(data[index]);}}}
for(index=timers.length;index--;){if(timers[index].elem===this&&(type==null||timers[index].queue===type)){timers[index].anim.stop(gotoEnd);dequeue=false;timers.splice(index,1);}}
if(dequeue||!gotoEnd){jQuery.dequeue(this,type);}});},finish:function(type){if(type!==false){type=type||"fx";}
return this.each(function(){var index,data=jQuery._data(this),queue=data[type+"queue"],hooks=data[type+"queueHooks"],timers=jQuery.timers,length=queue?queue.length:0;data.finish=true;jQuery.queue(this,type,[]);if(hooks&&hooks.stop){hooks.stop.call(this,true);}
for(index=timers.length;index--;){if(timers[index].elem===this&&timers[index].queue===type){timers[index].anim.stop(true);timers.splice(index,1);}}
for(index=0;index<length;index++){if(queue[index]&&queue[index].finish){queue[index].finish.call(this);}}
delete data.finish;});}});function genFx(type,includeWidth){var which,attrs={height:type},i=0;includeWidth=includeWidth?1:0;for(;i<4;i+=2-includeWidth){which=cssExpand[i];attrs["margin"+which]=attrs["padding"+which]=type;}
if(includeWidth){attrs.opacity=attrs.width=type;}
return attrs;}
jQuery.each({slideDown:genFx("show"),slideUp:genFx("hide"),slideToggle:genFx("toggle"),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(name,props){jQuery.fn[name]=function(speed,easing,callback){return this.animate(props,speed,easing,callback);};});jQuery.speed=function(speed,easing,fn){var opt=speed&&typeof speed==="object"?jQuery.extend({},speed):{complete:fn||!fn&&easing||jQuery.isFunction(speed)&&speed,duration:speed,easing:fn&&easing||easing&&!jQuery.isFunction(easing)&&easing};opt.duration=jQuery.fx.off?0:typeof opt.duration==="number"?opt.duration:opt.duration in jQuery.fx.speeds?jQuery.fx.speeds[opt.duration]:jQuery.fx.speeds._default;if(opt.queue==null||opt.queue===true){opt.queue="fx";}
opt.old=opt.complete;opt.complete=function(){if(jQuery.isFunction(opt.old)){opt.old.call(this);}
if(opt.queue){jQuery.dequeue(this,opt.queue);}};return opt;};jQuery.easing={linear:function(p){return p;},swing:function(p){return 0.5-Math.cos(p*Math.PI)/2;}};jQuery.timers=[];jQuery.fx=Tween.prototype.init;jQuery.fx.tick=function(){var timer,timers=jQuery.timers,i=0;fxNow=jQuery.now();for(;i<timers.length;i++){timer=timers[i];if(!timer()&&timers[i]===timer){timers.splice(i--,1);}}
if(!timers.length){jQuery.fx.stop();}
fxNow=undefined;};jQuery.fx.timer=function(timer){if(timer()&&jQuery.timers.push(timer)){jQuery.fx.start();}};jQuery.fx.interval=13;jQuery.fx.start=function(){if(!timerId){timerId=setInterval(jQuery.fx.tick,jQuery.fx.interval);}};jQuery.fx.stop=function(){clearInterval(timerId);timerId=null;};jQuery.fx.speeds={slow:600,fast:200,_default:400};jQuery.fx.step={};if(jQuery.expr&&jQuery.expr.filters){jQuery.expr.filters.animated=function(elem){return jQuery.grep(jQuery.timers,function(fn){return elem===fn.elem;}).length;};}
jQuery.fn.offset=function(options){if(arguments.length){return options===undefined?this:this.each(function(i){jQuery.offset.setOffset(this,options,i);});}
var docElem,win,box={top:0,left:0},elem=this[0],doc=elem&&elem.ownerDocument;if(!doc){return;}
docElem=doc.documentElement;if(!jQuery.contains(docElem,elem)){return box;}
if(typeof elem.getBoundingClientRect!==core_strundefined){box=elem.getBoundingClientRect();}
win=getWindow(doc);return{top:box.top+(win.pageYOffset||docElem.scrollTop)-(docElem.clientTop||0),left:box.left+(win.pageXOffset||docElem.scrollLeft)-(docElem.clientLeft||0)};};jQuery.offset={setOffset:function(elem,options,i){var position=jQuery.css(elem,"position");if(position==="static"){elem.style.position="relative";}
var curElem=jQuery(elem),curOffset=curElem.offset(),curCSSTop=jQuery.css(elem,"top"),curCSSLeft=jQuery.css(elem,"left"),calculatePosition=(position==="absolute"||position==="fixed")&&jQuery.inArray("auto",[curCSSTop,curCSSLeft])>-1,props={},curPosition={},curTop,curLeft;if(calculatePosition){curPosition=curElem.position();curTop=curPosition.top;curLeft=curPosition.left;}else{curTop=parseFloat(curCSSTop)||0;curLeft=parseFloat(curCSSLeft)||0;}
if(jQuery.isFunction(options)){options=options.call(elem,i,curOffset);}
if(options.top!=null){props.top=(options.top-curOffset.top)+curTop;}
if(options.left!=null){props.left=(options.left-curOffset.left)+curLeft;}
if("using"in options){options.using.call(elem,props);}else{curElem.css(props);}}};jQuery.fn.extend({position:function(){if(!this[0]){return;}
var offsetParent,offset,parentOffset={top:0,left:0},elem=this[0];if(jQuery.css(elem,"position")==="fixed"){offset=elem.getBoundingClientRect();}else{offsetParent=this.offsetParent();offset=this.offset();if(!jQuery.nodeName(offsetParent[0],"html")){parentOffset=offsetParent.offset();}
parentOffset.top+=jQuery.css(offsetParent[0],"borderTopWidth",true);parentOffset.left+=jQuery.css(offsetParent[0],"borderLeftWidth",true);}
return{top:offset.top-parentOffset.top-jQuery.css(elem,"marginTop",true),left:offset.left-parentOffset.left-jQuery.css(elem,"marginLeft",true)};},offsetParent:function(){return this.map(function(){var offsetParent=this.offsetParent||docElem;while(offsetParent&&(!jQuery.nodeName(offsetParent,"html")&&jQuery.css(offsetParent,"position")==="static")){offsetParent=offsetParent.offsetParent;}
return offsetParent||docElem;});}});jQuery.each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"},function(method,prop){var top=/Y/.test(prop);jQuery.fn[method]=function(val){return jQuery.access(this,function(elem,method,val){var win=getWindow(elem);if(val===undefined){return win?(prop in win)?win[prop]:win.document.documentElement[method]:elem[method];}
if(win){win.scrollTo(!top?val:jQuery(win).scrollLeft(),top?val:jQuery(win).scrollTop());}else{elem[method]=val;}},method,val,arguments.length,null);};});function getWindow(elem){return jQuery.isWindow(elem)?elem:elem.nodeType===9?elem.defaultView||elem.parentWindow:false;}
jQuery.each({Height:"height",Width:"width"},function(name,type){jQuery.each({padding:"inner"+name,content:type,"":"outer"+name},function(defaultExtra,funcName){jQuery.fn[funcName]=function(margin,value){var chainable=arguments.length&&(defaultExtra||typeof margin!=="boolean"),extra=defaultExtra||(margin===true||value===true?"margin":"border");return jQuery.access(this,function(elem,type,value){var doc;if(jQuery.isWindow(elem)){return elem.document.documentElement["client"+name];}
if(elem.nodeType===9){doc=elem.documentElement;return Math.max(elem.body["scroll"+name],doc["scroll"+name],elem.body["offset"+name],doc["offset"+name],doc["client"+name]);}
return value===undefined?jQuery.css(elem,type,extra):jQuery.style(elem,type,value,extra);},type,chainable?margin:undefined,chainable,null);};});});jQuery.fn.size=function(){return this.length;};jQuery.fn.andSelf=jQuery.fn.addBack;if(typeof module==="object"&&module&&typeof module.exports==="object"){module.exports=jQuery;}else{window.jQuery=window.$=jQuery;if(typeof define==="function"&&define.amd){define("jquery",[],function(){return jQuery;});}}})(window);require.config({baseUrl:'',waitSeconds:200,paths:{'urls':'/static/js/../../urls','i18n':'/static/js/../../i18n','ajax_select':'/static/js/ajax_select','dajax':'/static/js/../dajax/jquery.dajax.core','dajaxice':'/static/js/../dajaxice/dajaxice.core','inflatetext':'/static/js/inflateText.min.js?8af182ab','css':'/static/js/css.min.js?76d80750','jquery-color':'/static/js/jquery.color-2.1.2.min.js?3901917b','slabtext':'/static/js/jquery.group-slabtext.min.js?44d1dadd','jqueryui':'/static/js/jquery-ui-1.9.2.custom.min.js?9b9c19cd','tag-it':'/static/js/tag-it.min.js?d4ce3b06','iscroll':'/static/js/iscroll.min.js?947a23e9','jcrop':'/static/js/jquery.Jcrop.min.js?486a87d6','jquery.slabtext':'/static/js/jquery.slabtext.min.js?f555dab5','fc/fileuploader':'/static/js/fc/fileuploader.min.js?ceaa08ca','fc/wa':'/static/js/fc/wa.min.js?5f338801','fc/fccarousel':'/static/js/fc/fccarousel.min.js?1d6ffcf6','fc/admin/post_to_blog':'/static/js/fc/admin/post_to_blog.min.js?16999db6','fc/admin/editortask_do_phrase':'/static/js/fc/admin/editortask_do_phrase.min.js?a2332fce','fc/admin/delete_phrase_from_bundle':'/static/js/fc/admin/delete_phrase_from_bundle.min.js?981b10cd','fc/ui/profile_page':'/static/js/fc/ui/profile_page.min.js?507c0ede','fc/ui/highlighted_sources':'/static/js/fc/ui/highlighted_sources.min.js?4bb0b54f','fc/ui/movie_page':'/static/js/fc/ui/movie_page.min.js?5b08dd39','fc/ui/replace_page':'/static/js/fc/ui/replace_page.min.js?59ef3316','fc/ui/authors_index_page':'/static/js/fc/ui/authors_index_page.min.js?135e177a','fc/ui/page_load':'/static/js/fc/ui/page_load.min.js?40d16ce0','fc/ui/freeze':'/static/js/fc/ui/freeze.min.js?efb8eda0','fc/ui/expandable_sections':'/static/js/fc/ui/expandable_sections.min.js?8498e35e','fc/ui/change_page':'/static/js/fc/ui/change_page.min.js?622c36f1','fc/ui/suggest_page':'/static/js/fc/ui/suggest_page.min.js?1b3da450','fc/ui/section_page':'/static/js/fc/ui/section_page.min.js?8c10830d','fc/ui/refresh_content':'/static/js/fc/ui/refresh_content.min.js?b02d1712','fc/ui/current_topic_page':'/static/js/fc/ui/current_topic_page.min.js?45a7e349','fc/ui/homepage':'/static/js/fc/ui/homepage.min.js?4498a308','fc/ui/login_page':'/static/js/fc/ui/login_page.min.js?0145de26','fc/ui/expandable_tags':'/static/js/fc/ui/expandable_tags.min.js?dcf2ce65','fc/ui/phrases_square':'/static/js/fc/ui/phrases_square.min.js?0529b5f4','fc/ui/topic_page':'/static/js/fc/ui/topic_page.min.js?fa2f1a80','fc/ui/faves_page':'/static/js/fc/ui/faves_page.min.js?935e4aec','fc/ui/sticky_banner':'/static/js/fc/ui/sticky_banner.min.js?38b17e76','fc/ui/dialog':'/static/js/fc/ui/dialog.min.js?b253adb3','fc/ui/highlighted_sources_scroll':'/static/js/fc/ui/highlighted_sources_scroll.min.js?10cd0c3e','fc/ui/autocomplete':'/static/js/fc/ui/autocomplete.min.js?34c5d2c6','fc/ui/phrase_page':'/static/js/fc/ui/phrase_page.min.js?c1336a9e','fc/ui/user_area_page':'/static/js/fc/ui/user_area_page.min.js?95e9d48c','fc/ui/comment':'/static/js/fc/ui/comment.min.js?05e8fdfa','fc/ui/search_page':'/static/js/fc/ui/search_page.min.js?a10298ab'},shim:{'jquery-bootstrap':{deps:['jquery']},'jqueryui':{deps:['jquery']},'tag-it':{deps:['jquery','jqueryui']},'slabtext':{deps:['jquery']},'dajax':{deps:['jquery']},'dajaxice':{deps:['jquery']},}});define("setup",['jquery','jquery-bootstrap','fc/utils','fc/shop','fc/async_load_module','urls'],function($,bootstrap,fc_utils,fc_shop,fc_async_load_module,urls){fc_utils.setCsRfHeader.init();fc_shop.markForPartner.init();$(function(){require(['fc/ui/forms'],function(fc_ui_forms){fc_ui_forms.init();});require(['fc/ui/phrase_list'],function(fc_ui_phrases){fc_ui_phrases.init();});require(['fc/login'],function(fc_login){fc_login.init();});require(['fc/ui/pagination'],function(fc_ui_pagination){fc_ui_pagination.init();});require(['fc/ui/navbar'],function(fc_ui_navbar){fc_ui_navbar.init();});require(['fc/ui/site_updates'],function(fc_ui_site_updates){fc_ui_site_updates.init();});$(document).on('click','.main-content .admin-panel .delete_phrase_from_bundle',function(evt){var event_this=this;require(['fc/admin/delete_phrase_from_bundle'],function(delete_phrase){delete_phrase.apply_remove.call(event_this,evt);});});$(document).on('click','.main-content .admin-panel .editortask_do_phrase',function(evt){var event_this=this;require(['fc/admin/editortask_do_phrase'],function(editortask_do_phrase){editortask_do_phrase.apply.call(event_this,evt);});});$(document).on('click','.main-content .admin-panel .post_to_blog',function(evt){var event_this=this;require(['fc/admin/post_to_blog'],function(post_to_blog){post_to_blog.apply.call(event_this,evt);});});require(['fc/fb'],function(fc_fb){fc_fb.init();});require(['fc/tw'],function(fc_tw){fc_tw.init();});require(['fc/cookieconsent'],function(fc_cookieconsent){fc_cookieconsent.init($('#cookie_consent'));});if($('.sidebox.bundles').length>0&&$('#sidebar').is(':visible')){require(['slabtext'],function(slabtext){$('.sidebox.bundles .name').slabText({'noResizeEvent':true,'postTweak':true,'maxFontSize':100});});}
$(document).on('click','.privacy-policy a.read-policy',function(e){e.preventDefault();$(e.currentTarget).closest('.privacy-policy').find('.privacy-text').addClass('reading');});if($('#sidebar .tag-cloud').length>0&&$('#sidebar').is(':visible')){$('#sidebar .tag-cloud a').each(function(){if($(this).width()>parseInt($('#sidebar').css('width'))){$(this).css('word-break','break-all');}});}
if($('#sidebar').is(':visible')){$('#sidebar #facebook-social-wrapper iframe').attr('src',$('#sidebar #facebook-social-wrapper iframe').data('src')+'&container_width='+
($('#sidebar #facebook-social-wrapper .responsive-lg-beacon').is(':visible')?$('#sidebar #facebook-social-wrapper iframe').data('width-lg'):$('#sidebar #facebook-social-wrapper iframe').data('width')));}
if($('#sidebar').is(':visible')&&$('#sidebar .adsense .banner-sticky').length>0){$(window).on("load",function(){require(['fc/ui/sticky_banner'],function(fc_ui_sticky_banner){fc_ui_sticky_banner.sidebar.init();});});}
FastClick.attach(document.body);});});require(['setup']);define('base64',[],function(){var Base64={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(input){var output="";var chr1,chr2,chr3,enc1,enc2,enc3,enc4;var i=0;input=Base64._utf8_encode(input);while(i<input.length){chr1=input.charCodeAt(i++);chr2=input.charCodeAt(i++);chr3=input.charCodeAt(i++);enc1=chr1>>2;enc2=((chr1&3)<<4)|(chr2>>4);enc3=((chr2&15)<<2)|(chr3>>6);enc4=chr3&63;if(isNaN(chr2)){enc3=enc4=64;}else if(isNaN(chr3)){enc4=64;}
output=output+
this._keyStr.charAt(enc1)+this._keyStr.charAt(enc2)+
this._keyStr.charAt(enc3)+this._keyStr.charAt(enc4);}
return output;},decode:function(input){var output="";var chr1,chr2,chr3;var enc1,enc2,enc3,enc4;var i=0;input=input.replace(/[^A-Za-z0-9\+\/\=]/g,"");while(i<input.length){enc1=this._keyStr.indexOf(input.charAt(i++));enc2=this._keyStr.indexOf(input.charAt(i++));enc3=this._keyStr.indexOf(input.charAt(i++));enc4=this._keyStr.indexOf(input.charAt(i++));chr1=(enc1<<2)|(enc2>>4);chr2=((enc2&15)<<4)|(enc3>>2);chr3=((enc3&3)<<6)|enc4;output=output+String.fromCharCode(chr1);if(enc3!=64){output=output+String.fromCharCode(chr2);}
if(enc4!=64){output=output+String.fromCharCode(chr3);}}
output=Base64._utf8_decode(output);return output;},_utf8_encode:function(string){string=string.replace(/\r\n/g,"\n");var utftext="";for(var n=0;n<string.length;n++){var c=string.charCodeAt(n);if(c<128){utftext+=String.fromCharCode(c);}
else if((c>127)&&(c<2048)){utftext+=String.fromCharCode((c>>6)|192);utftext+=String.fromCharCode((c&63)|128);}
else{utftext+=String.fromCharCode((c>>12)|224);utftext+=String.fromCharCode(((c>>6)&63)|128);utftext+=String.fromCharCode((c&63)|128);}}
return utftext;},_utf8_decode:function(utftext){var string="";var i=0;var c=c1=c2=0;while(i<utftext.length){c=utftext.charCodeAt(i);if(c<128){string+=String.fromCharCode(c);i++;}
else if((c>191)&&(c<224)){c2=utftext.charCodeAt(i+1);string+=String.fromCharCode(((c&31)<<6)|(c2&63));i+=2;}
else{c2=utftext.charCodeAt(i+1);c3=utftext.charCodeAt(i+2);string+=String.fromCharCode(((c&15)<<12)|((c2&63)<<6)|(c3&63));i+=3;}}
return string;}};return Base64;});define('jquery-bootstrap',['jquery'],function(jQBootstrap){if(!jQuery){throw new Error("Bootstrap requires jQuery")}
+function($){"use strict";function transitionEnd(){var el=document.createElement('bootstrap')
var transEndEventNames={'WebkitTransition':'webkitTransitionEnd','MozTransition':'transitionend','OTransition':'oTransitionEnd otransitionend','transition':'transitionend'}
for(var name in transEndEventNames){if(el.style[name]!==undefined){return{end:transEndEventNames[name]}}}}
$.fn.emulateTransitionEnd=function(duration){var called=false,$el=this
$(this).one($.support.transition.end,function(){called=true})
var callback=function(){if(!called)$($el).trigger($.support.transition.end)}
setTimeout(callback,duration)
return this}
$(function(){$.support.transition=transitionEnd()})}(jQBootstrap);+function($){"use strict";var dismiss='[data-dismiss="alert"]'
var Alert=function(el){$(el).on('click',dismiss,this.close)}
Alert.prototype.close=function(e){var $this=$(this)
var selector=$this.attr('data-target')
if(!selector){selector=$this.attr('href')
selector=selector&&selector.replace(/.*(?=#[^\s]*$)/,'')}
var $parent=$(selector)
if(e)e.preventDefault()
if(!$parent.length){$parent=$this.hasClass('alert')?$this:$this.parent()}
$parent.trigger(e=$.Event('close.bs.alert'))
if(e.isDefaultPrevented())return
$parent.removeClass('in')
function removeElement(){$parent.trigger('closed.bs.alert').remove()}
$.support.transition&&$parent.hasClass('fade')?$parent.one($.support.transition.end,removeElement).emulateTransitionEnd(150):removeElement()}
var old=$.fn.alert
$.fn.alert=function(option){return this.each(function(){var $this=$(this)
var data=$this.data('bs.alert')
if(!data)$this.data('bs.alert',(data=new Alert(this)))
if(typeof option=='string')data[option].call($this)})}
$.fn.alert.Constructor=Alert
$.fn.alert.noConflict=function(){$.fn.alert=old
return this}
$(document).on('click.bs.alert.data-api',dismiss,Alert.prototype.close)}(jQBootstrap);+function($){"use strict";var Button=function(element,options){this.$element=$(element)
this.options=$.extend({},Button.DEFAULTS,options)}
Button.DEFAULTS={loadingText:'loading...'}
Button.prototype.setState=function(state){var d='disabled'
var $el=this.$element
var val=$el.is('input')?'val':'html'
var data=$el.data()
state=state+'Text'
if(!data.resetText)$el.data('resetText',$el[val]())
$el[val](data[state]||this.options[state])
setTimeout(function(){state=='loadingText'?$el.addClass(d).attr(d,d):$el.removeClass(d).removeAttr(d);},0)}
Button.prototype.toggle=function(){var $parent=this.$element.closest('[data-toggle="buttons"]')
if($parent.length){var $input=this.$element.find('input').prop('checked',!this.$element.hasClass('active')).trigger('change')
if($input.prop('type')==='radio')$parent.find('.active').removeClass('active')}
this.$element.toggleClass('active')}
var old=$.fn.button
$.fn.button=function(option){return this.each(function(){var $this=$(this)
var data=$this.data('bs.button')
var options=typeof option=='object'&&option
if(!data)$this.data('bs.button',(data=new Button(this,options)))
if(option=='toggle')data.toggle()
else if(option)data.setState(option)})}
$.fn.button.Constructor=Button
$.fn.button.noConflict=function(){$.fn.button=old
return this}
$(document).on('click.bs.button.data-api','[data-toggle^=button]',function(e){var $btn=$(e.target)
if(!$btn.hasClass('btn'))$btn=$btn.closest('.btn')
$btn.button('toggle')
e.preventDefault()})}(jQBootstrap);+function($){"use strict";var Carousel=function(element,options){this.$element=$(element)
this.$indicators=this.$element.find('.carousel-indicators')
this.options=options
this.paused=this.sliding=this.interval=this.$active=this.$items=null
this.options.pause=='hover'&&this.$element.on('mouseenter',$.proxy(this.pause,this)).on('mouseleave',$.proxy(this.cycle,this))}
Carousel.DEFAULTS={interval:5000,pause:'hover',wrap:true}
Carousel.prototype.cycle=function(e){e||(this.paused=false)
this.interval&&clearInterval(this.interval)
this.options.interval&&!this.paused&&(this.interval=setInterval($.proxy(this.next,this),this.options.interval))
return this}
Carousel.prototype.getActiveIndex=function(){this.$active=this.$element.find('.item.active')
this.$items=this.$active.parent().children()
return this.$items.index(this.$active)}
Carousel.prototype.to=function(pos){var that=this
var activeIndex=this.getActiveIndex()
if(pos>(this.$items.length-1)||pos<0)return
if(this.sliding)return this.$element.one('slid',function(){that.to(pos)})
if(activeIndex==pos)return this.pause().cycle()
return this.slide(pos>activeIndex?'next':'prev',$(this.$items[pos]))}
Carousel.prototype.pause=function(e){e||(this.paused=true)
if(this.$element.find('.next, .prev').length&&$.support.transition.end){this.$element.trigger($.support.transition.end)
this.cycle(true)}
this.interval=clearInterval(this.interval)
return this}
Carousel.prototype.next=function(){if(this.sliding)return
return this.slide('next')}
Carousel.prototype.prev=function(){if(this.sliding)return
return this.slide('prev')}
Carousel.prototype.slide=function(type,next){var $active=this.$element.find('.item.active')
var $next=next||$active[type]()
var isCycling=this.interval
var direction=type=='next'?'left':'right'
var fallback=type=='next'?'first':'last'
var that=this
if(!$next.length){if(!this.options.wrap)return
$next=this.$element.find('.item')[fallback]()}
this.sliding=true
isCycling&&this.pause()
var e=$.Event('slide.bs.carousel',{relatedTarget:$next[0],direction:direction})
if($next.hasClass('active'))return
if(this.$indicators.length){this.$indicators.find('.active').removeClass('active')
this.$element.one('slid',function(){var $nextIndicator=$(that.$indicators.children()[that.getActiveIndex()])
$nextIndicator&&$nextIndicator.addClass('active')})}
if($.support.transition&&this.$element.hasClass('slide')){this.$element.trigger(e)
if(e.isDefaultPrevented())return
$next.addClass(type)
$next[0].offsetWidth
$active.addClass(direction)
$next.addClass(direction)
$active.one($.support.transition.end,function(){$next.removeClass([type,direction].join(' ')).addClass('active')
$active.removeClass(['active',direction].join(' '))
that.sliding=false
setTimeout(function(){that.$element.trigger('slid')},0)}).emulateTransitionEnd(600)}else{this.$element.trigger(e)
if(e.isDefaultPrevented())return
$active.removeClass('active')
$next.addClass('active')
this.sliding=false
this.$element.trigger('slid')}
isCycling&&this.cycle()
return this}
var old=$.fn.carousel
$.fn.carousel=function(option){return this.each(function(){var $this=$(this)
var data=$this.data('bs.carousel')
var options=$.extend({},Carousel.DEFAULTS,$this.data(),typeof option=='object'&&option)
var action=typeof option=='string'?option:options.slide
if(!data)$this.data('bs.carousel',(data=new Carousel(this,options)))
if(typeof option=='number')data.to(option)
else if(action)data[action]()
else if(options.interval)data.pause().cycle()})}
$.fn.carousel.Constructor=Carousel
$.fn.carousel.noConflict=function(){$.fn.carousel=old
return this}
$(document).on('click.bs.carousel.data-api','[data-slide], [data-slide-to]',function(e){var $this=$(this),href
var $target=$($this.attr('data-target')||(href=$this.attr('href'))&&href.replace(/.*(?=#[^\s]+$)/,''))
var options=$.extend({},$target.data(),$this.data())
var slideIndex=$this.attr('data-slide-to')
if(slideIndex)options.interval=false
$target.carousel(options)
if(slideIndex=$this.attr('data-slide-to')){$target.data('bs.carousel').to(slideIndex)}
e.preventDefault()})
$(window).on('load',function(){$('[data-ride="carousel"]').each(function(){var $carousel=$(this)
$carousel.carousel($carousel.data())})})}(jQBootstrap);+function($){"use strict";var Collapse=function(element,options){this.$element=$(element)
this.options=$.extend({},Collapse.DEFAULTS,options)
this.transitioning=null
if(this.options.parent)this.$parent=$(this.options.parent)
if(this.options.toggle)this.toggle()}
Collapse.DEFAULTS={toggle:true}
Collapse.prototype.dimension=function(){var hasWidth=this.$element.hasClass('width')
return hasWidth?'width':'height'}
Collapse.prototype.show=function(){if(this.transitioning||this.$element.hasClass('in'))return
var startEvent=$.Event('show.bs.collapse')
this.$element.trigger(startEvent)
if(startEvent.isDefaultPrevented())return
var actives=this.$parent&&this.$parent.find('> .panel > .in')
if(actives&&actives.length){var hasData=actives.data('bs.collapse')
if(hasData&&hasData.transitioning)return
actives.collapse('hide')
hasData||actives.data('bs.collapse',null)}
var dimension=this.dimension()
this.$element.removeClass('collapse').addClass('collapsing')
[dimension](0)
this.transitioning=1
var complete=function(){this.$element.removeClass('collapsing').addClass('in')
[dimension]('auto')
this.transitioning=0
this.$element.trigger('shown.bs.collapse')}
if(!$.support.transition)return complete.call(this)
var scrollSize=$.camelCase(['scroll',dimension].join('-'))
this.$element.one($.support.transition.end,$.proxy(complete,this)).emulateTransitionEnd(350)
[dimension](this.$element[0][scrollSize])}
Collapse.prototype.hide=function(){if(this.transitioning||!this.$element.hasClass('in'))return
var startEvent=$.Event('hide.bs.collapse')
this.$element.trigger(startEvent)
if(startEvent.isDefaultPrevented())return
var dimension=this.dimension()
this.$element
[dimension](this.$element[dimension]())
[0].offsetHeight
this.$element.addClass('collapsing').removeClass('collapse').removeClass('in')
this.transitioning=1
var complete=function(){this.transitioning=0
this.$element.trigger('hidden.bs.collapse').removeClass('collapsing').addClass('collapse')}
if(!$.support.transition)return complete.call(this)
this.$element
[dimension](0).one($.support.transition.end,$.proxy(complete,this)).emulateTransitionEnd(350)}
Collapse.prototype.toggle=function(){this[this.$element.hasClass('in')?'hide':'show']()}
var old=$.fn.collapse
$.fn.collapse=function(option){return this.each(function(){var $this=$(this)
var data=$this.data('bs.collapse')
var options=$.extend({},Collapse.DEFAULTS,$this.data(),typeof option=='object'&&option)
if(!data)$this.data('bs.collapse',(data=new Collapse(this,options)))
if(typeof option=='string')data[option]()})}
$.fn.collapse.Constructor=Collapse
$.fn.collapse.noConflict=function(){$.fn.collapse=old
return this}
$(document).on('click.bs.collapse.data-api','[data-toggle=collapse]',function(e){var $this=$(this),href
var target=$this.attr('data-target')||e.preventDefault()||(href=$this.attr('href'))&&href.replace(/.*(?=#[^\s]+$)/,'')
var $target=$(target)
var data=$target.data('bs.collapse')
var option=data?'toggle':$this.data()
var parent=$this.attr('data-parent')
var $parent=parent&&$(parent)
if(!data||!data.transitioning){if($parent){$parent.find('[data-toggle=collapse][data-parent="'+parent+'"]').not($this).each(function(){$(this).addClass('collapsed')
$($(this).attr('data-target')).each(function(){if(!$(this).hasClass('collapse')){$(this).collapse('hide')}});});}
$this[$target.hasClass('in')?'addClass':'removeClass']('collapsed')}
$target.collapse(option)})}(jQBootstrap);+function($){"use strict";var backdrop='.dropdown-backdrop'
var toggle='[data-toggle=dropdown]'
var Dropdown=function(element){var $el=$(element).on('click.bs.dropdown',this.toggle)}
Dropdown.prototype.toggle=function(e){var $this=$(this)
if($this.is('.disabled, :disabled'))return
var $parent=getParent($this)
var isActive=$parent.hasClass('open')
clearMenus()
if(!isActive){if('ontouchstart'in document.documentElement&&!$parent.closest('.navbar-nav').length){$('<div class="dropdown-backdrop"/>').insertAfter($(this)).on('click',clearMenus)}
$parent.trigger(e=$.Event('show.bs.dropdown'))
if(e.isDefaultPrevented())return
$parent.toggleClass('open').trigger('shown.bs.dropdown')
$this.focus()}
return false}
Dropdown.prototype.keydown=function(e){if(!/(38|40|27)/.test(e.keyCode))return
var $this=$(this)
e.preventDefault()
e.stopPropagation()
if($this.is('.disabled, :disabled'))return
var $parent=getParent($this)
var isActive=$parent.hasClass('open')
if(!isActive||(isActive&&e.keyCode==27)){if(e.which==27)$parent.find(toggle).focus()
return $this.click()}
var $items=$('[role=menu] li:not(.divider):visible a',$parent)
if(!$items.length)return
var index=$items.index($items.filter(':focus'))
if(e.keyCode==38&&index>0)index--
if(e.keyCode==40&&index<$items.length-1)index++
if(!~index)index=0
$items.eq(index).focus()}
function clearMenus(){$(backdrop).remove()
$(toggle).each(function(e){var $parent=getParent($(this))
if(!$parent.hasClass('open'))return
$parent.trigger(e=$.Event('hide.bs.dropdown'))
if(e.isDefaultPrevented())return
$parent.removeClass('open').trigger('hidden.bs.dropdown')})}
function getParent($this){var selector=$this.attr('data-target')
if(!selector){selector=$this.attr('href')
selector=selector&&/#/.test(selector)&&selector.replace(/.*(?=#[^\s]*$)/,'')}
var $parent=selector&&$(selector)
return $parent&&$parent.length?$parent:$this.parent()}
var old=$.fn.dropdown
$.fn.dropdown=function(option){return this.each(function(){var $this=$(this)
var data=$this.data('dropdown')
if(!data)$this.data('dropdown',(data=new Dropdown(this)))
if(typeof option=='string')data[option].call($this)})}
$.fn.dropdown.Constructor=Dropdown
$.fn.dropdown.noConflict=function(){$.fn.dropdown=old
return this}
$(document).on('click.bs.dropdown.data-api',clearMenus).on('click.bs.dropdown.data-api','.dropdown form',function(e){e.stopPropagation()}).on('click.bs.dropdown.data-api',toggle,Dropdown.prototype.toggle).on('keydown.bs.dropdown.data-api',toggle+', [role=menu]',Dropdown.prototype.keydown)}(jQBootstrap);+function($){"use strict";var Modal=function(element,options){this.options=options
this.$element=$(element)
this.$backdrop=this.isShown=null
if(this.options.remote)this.$element.load(this.options.remote)}
Modal.DEFAULTS={backdrop:true,keyboard:true,show:true}
Modal.prototype.toggle=function(_relatedTarget){return this[!this.isShown?'show':'hide'](_relatedTarget)}
Modal.prototype.show=function(_relatedTarget){var that=this
var e=$.Event('show.bs.modal',{relatedTarget:_relatedTarget})
this.$element.trigger(e)
if(this.isShown||e.isDefaultPrevented())return
this.isShown=true
this.escape()
this.$element.on('click.dismiss.modal','[data-dismiss="modal"]',$.proxy(this.hide,this))
this.backdrop(function(){var transition=$.support.transition&&that.$element.hasClass('fade')
if(!that.$element.parent().length){that.$element.appendTo(document.body)}
that.$element.show()
if(transition){that.$element[0].offsetWidth}
that.$element.addClass('in').attr('aria-hidden',false)
that.enforceFocus()
var e=$.Event('shown.bs.modal',{relatedTarget:_relatedTarget})
transition?that.$element.find('.modal-dialog').one($.support.transition.end,function(){that.$element.focus().trigger(e)}).emulateTransitionEnd(300):that.$element.focus().trigger(e)})}
Modal.prototype.hide=function(e){if(e)e.preventDefault()
e=$.Event('hide.bs.modal')
this.$element.trigger(e)
if(!this.isShown||e.isDefaultPrevented())return
this.isShown=false
this.escape()
$(document).off('focusin.bs.modal')
this.$element.removeClass('in').attr('aria-hidden',true).off('click.dismiss.modal')
$.support.transition&&this.$element.hasClass('fade')?this.$element.one($.support.transition.end,$.proxy(this.hideModal,this)).emulateTransitionEnd(300):this.hideModal()}
Modal.prototype.enforceFocus=function(){$(document).off('focusin.bs.modal').on('focusin.bs.modal',$.proxy(function(e){if(this.$element[0]!==e.target&&!this.$element.has(e.target).length){this.$element.focus()}},this))}
Modal.prototype.escape=function(){if(this.isShown&&this.options.keyboard){this.$element.on('keyup.dismiss.bs.modal',$.proxy(function(e){e.which==27&&this.hide()},this))}else if(!this.isShown){this.$element.off('keyup.dismiss.bs.modal')}}
Modal.prototype.hideModal=function(){var that=this
this.$element.hide()
this.backdrop(function(){that.removeBackdrop()
that.$element.trigger('hidden.bs.modal')})}
Modal.prototype.removeBackdrop=function(){this.$backdrop&&this.$backdrop.remove()
this.$backdrop=null}
Modal.prototype.backdrop=function(callback){var that=this
var animate=this.$element.hasClass('fade')?'fade':''
if(this.isShown&&this.options.backdrop){var doAnimate=$.support.transition&&animate
this.$backdrop=$('<div class="modal-backdrop '+animate+'" />').appendTo(document.body)
this.$element.on('click.dismiss.modal',$.proxy(function(e){if(e.target!==e.currentTarget)return
this.options.backdrop=='static'?this.$element[0].focus.call(this.$element[0]):this.hide.call(this)},this))
if(doAnimate)this.$backdrop[0].offsetWidth
this.$backdrop.addClass('in')
if(!callback)return
doAnimate?this.$backdrop.one($.support.transition.end,callback).emulateTransitionEnd(150):callback()}else if(!this.isShown&&this.$backdrop){this.$backdrop.removeClass('in')
$.support.transition&&this.$element.hasClass('fade')?this.$backdrop.one($.support.transition.end,callback).emulateTransitionEnd(150):callback()}else if(callback){callback()}}
var old=$.fn.modal
$.fn.modal=function(option,_relatedTarget){return this.each(function(){var $this=$(this)
var data=$this.data('bs.modal')
var options=$.extend({},Modal.DEFAULTS,$this.data(),typeof option=='object'&&option)
if(!data)$this.data('bs.modal',(data=new Modal(this,options)))
if(typeof option=='string')data[option](_relatedTarget)
else if(options.show)data.show(_relatedTarget)})}
$.fn.modal.Constructor=Modal
$.fn.modal.noConflict=function(){$.fn.modal=old
return this}
$(document).on('click.bs.modal.data-api','[data-toggle="modal"]',function(e){var $this=$(this)
var href=$this.attr('href')
var $target=$($this.attr('data-target')||(href&&href.replace(/.*(?=#[^\s]+$)/,'')))
var option=$target.data('modal')?'toggle':$.extend({remote:!/#/.test(href)&&href},$target.data(),$this.data())
e.preventDefault()
$target.modal(option,this).one('hide',function(){$this.is(':visible')&&$this.focus()})})
$(document).on('show.bs.modal','.modal',function(){$(document.body).addClass('modal-open')}).on('hidden.bs.modal','.modal',function(){$(document.body).removeClass('modal-open')})}(jQBootstrap);+function($){"use strict";var Tooltip=function(element,options){this.type=this.options=this.enabled=this.timeout=this.hoverState=this.$element=null
this.init('tooltip',element,options)}
Tooltip.DEFAULTS={animation:true,placement:'top',selector:false,template:'<div class="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',trigger:'hover focus',title:'',delay:0,html:false,container:false}
Tooltip.prototype.init=function(type,element,options){this.enabled=true
this.type=type
this.$element=$(element)
this.options=this.getOptions(options)
var triggers=this.options.trigger.split(' ')
for(var i=triggers.length;i--;){var trigger=triggers[i]
if(trigger=='click'){this.$element.on('click.'+this.type,this.options.selector,$.proxy(this.toggle,this))}else if(trigger!='manual'){var eventIn=trigger=='hover'?'mouseenter':'focus'
var eventOut=trigger=='hover'?'mouseleave':'blur'
this.$element.on(eventIn+'.'+this.type,this.options.selector,$.proxy(this.enter,this))
this.$element.on(eventOut+'.'+this.type,this.options.selector,$.proxy(this.leave,this))}}
this.options.selector?(this._options=$.extend({},this.options,{trigger:'manual',selector:''})):this.fixTitle()}
Tooltip.prototype.getDefaults=function(){return Tooltip.DEFAULTS}
Tooltip.prototype.getOptions=function(options){options=$.extend({},this.getDefaults(),this.$element.data(),options)
if(options.delay&&typeof options.delay=='number'){options.delay={show:options.delay,hide:options.delay}}
return options}
Tooltip.prototype.getDelegateOptions=function(){var options={}
var defaults=this.getDefaults()
this._options&&$.each(this._options,function(key,value){if(defaults[key]!=value)options[key]=value})
return options}
Tooltip.prototype.enter=function(obj){var self=obj instanceof this.constructor?obj:$(obj.currentTarget)[this.type](this.getDelegateOptions()).data('bs.'+this.type)
clearTimeout(self.timeout)
self.hoverState='in'
if(!self.options.delay||!self.options.delay.show)return self.show()
self.timeout=setTimeout(function(){if(self.hoverState=='in')self.show()},self.options.delay.show)}
Tooltip.prototype.leave=function(obj){var self=obj instanceof this.constructor?obj:$(obj.currentTarget)[this.type](this.getDelegateOptions()).data('bs.'+this.type)
clearTimeout(self.timeout)
self.hoverState='out'
if(!self.options.delay||!self.options.delay.hide)return self.hide()
self.timeout=setTimeout(function(){if(self.hoverState=='out')self.hide()},self.options.delay.hide)}
Tooltip.prototype.show=function(){var e=$.Event('show.bs.'+this.type)
if(this.hasContent()&&this.enabled){this.$element.trigger(e)
if(e.isDefaultPrevented())return
var $tip=this.tip()
this.setContent()
if(this.options.animation)$tip.addClass('fade')
var placement=typeof this.options.placement=='function'?this.options.placement.call(this,$tip[0],this.$element[0]):this.options.placement
var autoToken=/\s?auto?\s?/i
var autoPlace=autoToken.test(placement)
if(autoPlace)placement=placement.replace(autoToken,'')||'top'
$tip.detach().css({top:0,left:0,display:'block'}).addClass(placement)
this.options.container?$tip.appendTo(this.options.container):$tip.insertAfter(this.$element)
var pos=this.getPosition()
var actualWidth=$tip[0].offsetWidth
var actualHeight=$tip[0].offsetHeight
if(autoPlace){var $parent=this.$element.parent()
var orgPlacement=placement
var docScroll=document.documentElement.scrollTop||document.body.scrollTop
var parentWidth=this.options.container=='body'?window.innerWidth:$parent.outerWidth()
var parentHeight=this.options.container=='body'?window.innerHeight:$parent.outerHeight()
var parentLeft=this.options.container=='body'?0:$parent.offset().left
placement=placement=='bottom'&&pos.top+pos.height+actualHeight-docScroll>parentHeight?'top':placement=='top'&&pos.top-docScroll-actualHeight<0?'bottom':placement=='right'&&pos.right+actualWidth>parentWidth?'left':placement=='left'&&pos.left-actualWidth<parentLeft?'right':placement
$tip.removeClass(orgPlacement).addClass(placement)}
var calculatedOffset=this.getCalculatedOffset(placement,pos,actualWidth,actualHeight)
this.applyPlacement(calculatedOffset,placement)
this.$element.trigger('shown.bs.'+this.type)}}
Tooltip.prototype.applyPlacement=function(offset,placement){var replace
var $tip=this.tip()
var width=$tip[0].offsetWidth
var height=$tip[0].offsetHeight
var marginTop=parseInt($tip.css('margin-top'),10)
var marginLeft=parseInt($tip.css('margin-left'),10)
if(isNaN(marginTop))marginTop=0
if(isNaN(marginLeft))marginLeft=0
offset.top=offset.top+marginTop
offset.left=offset.left+marginLeft
$tip.offset(offset).addClass('in')
var actualWidth=$tip[0].offsetWidth
var actualHeight=$tip[0].offsetHeight
if(placement=='top'&&actualHeight!=height){replace=true
offset.top=offset.top+height-actualHeight}
if(/bottom|top/.test(placement)){var delta=0
if(offset.left<0){delta=offset.left*-2
offset.left=0
$tip.offset(offset)
actualWidth=$tip[0].offsetWidth
actualHeight=$tip[0].offsetHeight}
this.replaceArrow(delta-width+actualWidth,actualWidth,'left')}else{this.replaceArrow(actualHeight-height,actualHeight,'top')}
if(replace)$tip.offset(offset)}
Tooltip.prototype.replaceArrow=function(delta,dimension,position){this.arrow().css(position,delta?(50*(1-delta/dimension)+"%"):'')}
Tooltip.prototype.setContent=function(){var $tip=this.tip()
var title=this.getTitle()
$tip.find('.tooltip-inner')[this.options.html?'html':'text'](title)
$tip.removeClass('fade in top bottom left right')}
Tooltip.prototype.hide=function(){var that=this
var $tip=this.tip()
var e=$.Event('hide.bs.'+this.type)
function complete(){if(that.hoverState!='in')$tip.detach()}
this.$element.trigger(e)
if(e.isDefaultPrevented())return
$tip.removeClass('in')
$.support.transition&&this.$tip.hasClass('fade')?$tip.one($.support.transition.end,complete).emulateTransitionEnd(150):complete()
this.$element.trigger('hidden.bs.'+this.type)
return this}
Tooltip.prototype.fixTitle=function(){var $e=this.$element
if($e.attr('title')||typeof($e.attr('data-original-title'))!='string'){$e.attr('data-original-title',$e.attr('title')||'').attr('title','')}}
Tooltip.prototype.hasContent=function(){return this.getTitle()}
Tooltip.prototype.getPosition=function(){var el=this.$element[0]
return $.extend({},(typeof el.getBoundingClientRect=='function')?el.getBoundingClientRect():{width:el.offsetWidth,height:el.offsetHeight},this.$element.offset())}
Tooltip.prototype.getCalculatedOffset=function(placement,pos,actualWidth,actualHeight){return placement=='bottom'?{top:pos.top+pos.height,left:pos.left+pos.width/2-actualWidth/2}:placement=='top'?{top:pos.top-actualHeight,left:pos.left+pos.width/2-actualWidth/2}:placement=='left'?{top:pos.top+pos.height/2-actualHeight/2,left:pos.left-actualWidth}:{top:pos.top+pos.height/2-actualHeight/2,left:pos.left+pos.width}}
Tooltip.prototype.getTitle=function(){var title
var $e=this.$element
var o=this.options
title=$e.attr('data-original-title')||(typeof o.title=='function'?o.title.call($e[0]):o.title)
return title}
Tooltip.prototype.tip=function(){return this.$tip=this.$tip||$(this.options.template)}
Tooltip.prototype.arrow=function(){return this.$arrow=this.$arrow||this.tip().find('.tooltip-arrow')}
Tooltip.prototype.validate=function(){if(!this.$element[0].parentNode){this.hide()
this.$element=null
this.options=null}}
Tooltip.prototype.enable=function(){this.enabled=true}
Tooltip.prototype.disable=function(){this.enabled=false}
Tooltip.prototype.toggleEnabled=function(){this.enabled=!this.enabled}
Tooltip.prototype.toggle=function(e){var self=e?$(e.currentTarget)[this.type](this.getDelegateOptions()).data('bs.'+this.type):this
self.tip().hasClass('in')?self.leave(self):self.enter(self)}
Tooltip.prototype.destroy=function(){this.hide().$element.off('.'+this.type).removeData('bs.'+this.type)}
var old=$.fn.tooltip
$.fn.tooltip=function(option){return this.each(function(){var $this=$(this)
var data=$this.data('bs.tooltip')
var options=typeof option=='object'&&option
if(!data)$this.data('bs.tooltip',(data=new Tooltip(this,options)))
if(typeof option=='string')data[option]()})}
$.fn.tooltip.Constructor=Tooltip
$.fn.tooltip.noConflict=function(){$.fn.tooltip=old
return this}}(jQBootstrap);+function($){"use strict";var Popover=function(element,options){this.init('popover',element,options)}
if(!$.fn.tooltip)throw new Error('Popover requires tooltip.js')
Popover.DEFAULTS=$.extend({},$.fn.tooltip.Constructor.DEFAULTS,{placement:'right',trigger:'click',content:'',template:'<div class="popover"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'})
Popover.prototype=$.extend({},$.fn.tooltip.Constructor.prototype)
Popover.prototype.constructor=Popover
Popover.prototype.getDefaults=function(){return Popover.DEFAULTS}
Popover.prototype.setContent=function(){var $tip=this.tip()
var title=this.getTitle()
var content=this.getContent()
$tip.find('.popover-title')[this.options.html?'html':'text'](title)
$tip.find('.popover-content')[this.options.html?'html':'text'](content)
$tip.removeClass('fade top bottom left right in')
if(!$tip.find('.popover-title').html())$tip.find('.popover-title').hide()}
Popover.prototype.hasContent=function(){return this.getTitle()||this.getContent()}
Popover.prototype.getContent=function(){var $e=this.$element
var o=this.options
return $e.attr('data-content')||(typeof o.content=='function'?o.content.call($e[0]):o.content)}
Popover.prototype.arrow=function(){return this.$arrow=this.$arrow||this.tip().find('.arrow')}
Popover.prototype.tip=function(){if(!this.$tip)this.$tip=$(this.options.template)
return this.$tip}
var old=$.fn.popover
$.fn.popover=function(option){return this.each(function(){var $this=$(this)
var data=$this.data('bs.popover')
var options=typeof option=='object'&&option
if(!data)$this.data('bs.popover',(data=new Popover(this,options)))
if(typeof option=='string')data[option]()})}
$.fn.popover.Constructor=Popover
$.fn.popover.noConflict=function(){$.fn.popover=old
return this}}(jQBootstrap);+function($){"use strict";function ScrollSpy(element,options){var href
var process=$.proxy(this.process,this)
this.$element=$(element).is('body')?$(window):$(element)
this.$body=$('body')
this.$scrollElement=this.$element.on('scroll.bs.scroll-spy.data-api',process)
this.options=$.extend({},ScrollSpy.DEFAULTS,options)
this.selector=(this.options.target||((href=$(element).attr('href'))&&href.replace(/.*(?=#[^\s]+$)/,''))||'')+' .nav li > a'
this.offsets=$([])
this.targets=$([])
this.activeTarget=null
this.refresh()
this.process()}
ScrollSpy.DEFAULTS={offset:10}
ScrollSpy.prototype.refresh=function(){var offsetMethod=this.$element[0]==window?'offset':'position'
this.offsets=$([])
this.targets=$([])
var self=this
var $targets=this.$body.find(this.selector).map(function(){var $el=$(this)
var href=$el.data('target')||$el.attr('href')
var $href=/^#\w/.test(href)&&$(href)
return($href&&$href.length&&[[$href[offsetMethod]().top+(!$.isWindow(self.$scrollElement.get(0))&&self.$scrollElement.scrollTop()),href]])||null}).sort(function(a,b){return a[0]-b[0]}).each(function(){self.offsets.push(this[0])
self.targets.push(this[1])})}
ScrollSpy.prototype.process=function(){var scrollTop=this.$scrollElement.scrollTop()+this.options.offset
var scrollHeight=this.$scrollElement[0].scrollHeight||this.$body[0].scrollHeight
var maxScroll=scrollHeight-this.$scrollElement.height()
var offsets=this.offsets
var targets=this.targets
var activeTarget=this.activeTarget
var i
if(scrollTop>=maxScroll){return activeTarget!=(i=targets.last()[0])&&this.activate(i)}
for(i=offsets.length;i--;){activeTarget!=targets[i]&&scrollTop>=offsets[i]&&(!offsets[i+1]||scrollTop<=offsets[i+1])&&this.activate(targets[i])}}
ScrollSpy.prototype.activate=function(target){this.activeTarget=target
$(this.selector).parents('.active').removeClass('active')
var selector=this.selector
+'[data-target="'+target+'"],'
+this.selector+'[href="'+target+'"]'
var active=$(selector).parents('li').addClass('active')
if(active.parent('.dropdown-menu').length){active=active.closest('li.dropdown').addClass('active')}
active.trigger('activate')}
var old=$.fn.scrollspy
$.fn.scrollspy=function(option){return this.each(function(){var $this=$(this)
var data=$this.data('bs.scrollspy')
var options=typeof option=='object'&&option
if(!data)$this.data('bs.scrollspy',(data=new ScrollSpy(this,options)))
if(typeof option=='string')data[option]()})}
$.fn.scrollspy.Constructor=ScrollSpy
$.fn.scrollspy.noConflict=function(){$.fn.scrollspy=old
return this}
$(window).on('load',function(){$('[data-spy="scroll"]').each(function(){var $spy=$(this)
$spy.scrollspy($spy.data())})})}(jQBootstrap);+function($){"use strict";var Tab=function(element){this.element=$(element)}
Tab.prototype.show=function(){var $this=this.element
var $ul=$this.closest('ul:not(.dropdown-menu)')
var selector=$this.attr('data-target')
if(!selector){selector=$this.attr('href')
selector=selector&&selector.replace(/.*(?=#[^\s]*$)/,'')}
if($this.parent('li').hasClass('active'))return
var previous=$ul.find('.active:last a')[0]
var e=$.Event('show.bs.tab',{relatedTarget:previous})
$this.trigger(e)
if(e.isDefaultPrevented())return
var $target=$(selector)
this.activate($this.parent('li'),$ul)
this.activate($target,$target.parent(),function(){$this.trigger({type:'shown.bs.tab',relatedTarget:previous})})}
Tab.prototype.activate=function(element,container,callback){var $active=container.find('> .active')
var transition=callback&&$.support.transition&&$active.hasClass('fade')
function next(){$active.removeClass('active').find('> .dropdown-menu > .active').removeClass('active')
element.addClass('active')
if(transition){element[0].offsetWidth
element.addClass('in')}else{element.removeClass('fade')}
if(element.parent('.dropdown-menu')){element.closest('li.dropdown').addClass('active')}
callback&&callback()}
transition?$active.one($.support.transition.end,next).emulateTransitionEnd(150):next()
$active.removeClass('in')}
var old=$.fn.tab
$.fn.tab=function(option){return this.each(function(){var $this=$(this)
var data=$this.data('bs.tab')
if(!data)$this.data('bs.tab',(data=new Tab(this)))
if(typeof option=='string')data[option]()})}
$.fn.tab.Constructor=Tab
$.fn.tab.noConflict=function(){$.fn.tab=old
return this}
$(document).on('click.bs.tab.data-api','[data-toggle="tab"], [data-toggle="pill"]',function(e){e.preventDefault()
$(this).tab('show')})}(jQBootstrap);+function($){"use strict";var Affix=function(element,options){this.options=$.extend({},Affix.DEFAULTS,options)
this.$window=$(window).on('scroll.bs.affix.data-api',$.proxy(this.checkPosition,this)).on('click.bs.affix.data-api',$.proxy(this.checkPositionWithEventLoop,this))
this.$element=$(element)
this.affixed=this.unpin=null
this.checkPosition()}
Affix.RESET='affix affix-top affix-bottom'
Affix.DEFAULTS={offset:0}
Affix.prototype.checkPositionWithEventLoop=function(){setTimeout($.proxy(this.checkPosition,this),1)}
Affix.prototype.checkPosition=function(){if(!this.$element.is(':visible'))return
var scrollHeight=$(document).height()
var scrollTop=this.$window.scrollTop()
var position=this.$element.offset()
var offset=this.options.offset
var offsetTop=offset.top
var offsetBottom=offset.bottom
if(typeof offset!='object')offsetBottom=offsetTop=offset
if(typeof offsetTop=='function')offsetTop=offset.top()
if(typeof offsetBottom=='function')offsetBottom=offset.bottom()
var affix=this.unpin!=null&&(scrollTop+this.unpin<=position.top)?false:offsetBottom!=null&&(position.top+this.$element.height()>=scrollHeight-offsetBottom)?'bottom':offsetTop!=null&&(scrollTop<=offsetTop)?'top':false
if(this.affixed===affix)return
if(this.unpin)this.$element.css('top','')
this.affixed=affix
this.unpin=affix=='bottom'?position.top-scrollTop:null
this.$element.removeClass(Affix.RESET).addClass('affix'+(affix?'-'+affix:''))
if(affix=='bottom'){this.$element.offset({top:document.body.offsetHeight-offsetBottom-this.$element.height()})}}
var old=$.fn.affix
$.fn.affix=function(option){return this.each(function(){var $this=$(this)
var data=$this.data('bs.affix')
var options=typeof option=='object'&&option
if(!data)$this.data('bs.affix',(data=new Affix(this,options)))
if(typeof option=='string')data[option]()})}
$.fn.affix.Constructor=Affix
$.fn.affix.noConflict=function(){$.fn.affix=old
return this}
$(window).on('load',function(){$('[data-spy="affix"]').each(function(){var $spy=$(this)
var data=$spy.data()
data.offset=data.offset||{}
if(data.offsetBottom)data.offset.bottom=data.offsetBottom
if(data.offsetTop)data.offset.top=data.offsetTop
$spy.affix(data)})})}(jQBootstrap);});(function(window,undefined){'use strict';var Hammer=function Hammer(element,options){return new Hammer.Instance(element,options||{});};Hammer.VERSION='1.1.3';Hammer.defaults={behavior:{userSelect:'none',touchAction:'pan-y',touchCallout:'none',contentZooming:'none',userDrag:'none',tapHighlightColor:'rgba(0,0,0,0)'}};Hammer.DOCUMENT=document;Hammer.HAS_POINTEREVENTS=navigator.pointerEnabled||navigator.msPointerEnabled;Hammer.HAS_TOUCHEVENTS=('ontouchstart'in window);Hammer.IS_MOBILE=/mobile|tablet|ip(ad|hone|od)|android|silk/i.test(navigator.userAgent);Hammer.NO_MOUSEEVENTS=(Hammer.HAS_TOUCHEVENTS&&Hammer.IS_MOBILE)||Hammer.HAS_POINTEREVENTS;Hammer.CALCULATE_INTERVAL=25;var EVENT_TYPES={};var DIRECTION_DOWN=Hammer.DIRECTION_DOWN='down';var DIRECTION_LEFT=Hammer.DIRECTION_LEFT='left';var DIRECTION_UP=Hammer.DIRECTION_UP='up';var DIRECTION_RIGHT=Hammer.DIRECTION_RIGHT='right';var POINTER_MOUSE=Hammer.POINTER_MOUSE='mouse';var POINTER_TOUCH=Hammer.POINTER_TOUCH='touch';var POINTER_PEN=Hammer.POINTER_PEN='pen';var EVENT_START=Hammer.EVENT_START='start';var EVENT_MOVE=Hammer.EVENT_MOVE='move';var EVENT_END=Hammer.EVENT_END='end';var EVENT_RELEASE=Hammer.EVENT_RELEASE='release';var EVENT_TOUCH=Hammer.EVENT_TOUCH='touch';Hammer.READY=false;Hammer.plugins=Hammer.plugins||{};Hammer.gestures=Hammer.gestures||{};function setup(){if(Hammer.READY){return;}
Event.determineEventTypes();Utils.each(Hammer.gestures,function(gesture){Detection.register(gesture);});Event.onTouch(Hammer.DOCUMENT,EVENT_MOVE,Detection.detect);Event.onTouch(Hammer.DOCUMENT,EVENT_END,Detection.detect);Hammer.READY=true;}
var Utils=Hammer.utils={extend:function extend(dest,src,merge){for(var key in src){if(!src.hasOwnProperty(key)||(dest[key]!==undefined&&merge)){continue;}
dest[key]=src[key];}
return dest;},on:function on(element,type,handler){element.addEventListener(type,handler,false);},off:function off(element,type,handler){element.removeEventListener(type,handler,false);},each:function each(obj,iterator,context){var i,len;if('forEach'in obj){obj.forEach(iterator,context);}else if(obj.length!==undefined){for(i=0,len=obj.length;i<len;i++){if(iterator.call(context,obj[i],i,obj)===false){return;}}}else{for(i in obj){if(obj.hasOwnProperty(i)&&iterator.call(context,obj[i],i,obj)===false){return;}}}},inStr:function inStr(src,find){return src.indexOf(find)>-1;},inArray:function inArray(src,find){if(src.indexOf){var index=src.indexOf(find);return(index===-1)?false:index;}else{for(var i=0,len=src.length;i<len;i++){if(src[i]===find){return i;}}
return false;}},toArray:function toArray(obj){return Array.prototype.slice.call(obj,0);},hasParent:function hasParent(node,parent){while(node){if(node==parent){return true;}
node=node.parentNode;}
return false;},getCenter:function getCenter(touches){var pageX=[],pageY=[],clientX=[],clientY=[],min=Math.min,max=Math.max;if(touches.length===1){return{pageX:touches[0].pageX,pageY:touches[0].pageY,clientX:touches[0].clientX,clientY:touches[0].clientY};}
Utils.each(touches,function(touch){pageX.push(touch.pageX);pageY.push(touch.pageY);clientX.push(touch.clientX);clientY.push(touch.clientY);});return{pageX:(min.apply(Math,pageX)+max.apply(Math,pageX))/2,pageY:(min.apply(Math,pageY)+max.apply(Math,pageY))/2,clientX:(min.apply(Math,clientX)+max.apply(Math,clientX))/2,clientY:(min.apply(Math,clientY)+max.apply(Math,clientY))/2};},getVelocity:function getVelocity(deltaTime,deltaX,deltaY){return{x:Math.abs(deltaX/deltaTime)||0,y:Math.abs(deltaY/deltaTime)||0};},getAngle:function getAngle(touch1,touch2){var x=touch2.clientX-touch1.clientX,y=touch2.clientY-touch1.clientY;return Math.atan2(y,x)*180/Math.PI;},getDirection:function getDirection(touch1,touch2){var x=Math.abs(touch1.clientX-touch2.clientX),y=Math.abs(touch1.clientY-touch2.clientY);if(x>=y){return touch1.clientX-touch2.clientX>0?DIRECTION_LEFT:DIRECTION_RIGHT;}
return touch1.clientY-touch2.clientY>0?DIRECTION_UP:DIRECTION_DOWN;},getDistance:function getDistance(touch1,touch2){var x=touch2.clientX-touch1.clientX,y=touch2.clientY-touch1.clientY;return Math.sqrt((x*x)+(y*y));},getScale:function getScale(start,end){if(start.length>=2&&end.length>=2){return this.getDistance(end[0],end[1])/this.getDistance(start[0],start[1]);}
return 1;},getRotation:function getRotation(start,end){if(start.length>=2&&end.length>=2){return this.getAngle(end[1],end[0])-this.getAngle(start[1],start[0]);}
return 0;},isVertical:function isVertical(direction){return direction==DIRECTION_UP||direction==DIRECTION_DOWN;},setPrefixedCss:function setPrefixedCss(element,prop,value,toggle){var prefixes=['','Webkit','Moz','O','ms'];prop=Utils.toCamelCase(prop);for(var i=0;i<prefixes.length;i++){var p=prop;if(prefixes[i]){p=prefixes[i]+p.slice(0,1).toUpperCase()+p.slice(1);}
if(p in element.style){element.style[p]=(toggle==null||toggle)&&value||'';break;}}},toggleBehavior:function toggleBehavior(element,props,toggle){if(!props||!element||!element.style){return;}
Utils.each(props,function(value,prop){Utils.setPrefixedCss(element,prop,value,toggle);});var falseFn=toggle&&function(){return false;};if(props.userSelect=='none'){element.onselectstart=falseFn;}
if(props.userDrag=='none'){element.ondragstart=falseFn;}},toCamelCase:function toCamelCase(str){return str.replace(/[_-]([a-z])/g,function(s){return s[1].toUpperCase();});}};Hammer.Instance=function(element,options){var self=this;setup();this.element=element;this.enabled=true;Utils.each(options,function(value,name){delete options[name];options[Utils.toCamelCase(name)]=value;});this.options=Utils.extend(Utils.extend({},Hammer.defaults),options||{});if(this.options.behavior){Utils.toggleBehavior(this.element,this.options.behavior,true);}
this.eventStartHandler=Event.onTouch(element,EVENT_START,function(ev){if(self.enabled&&ev.eventType==EVENT_START){Detection.startDetect(self,ev);}else if(ev.eventType==EVENT_TOUCH){Detection.detect(ev);}});this.eventHandlers=[];};Hammer.Instance.prototype={on:function onEvent(gestures,handler){var self=this;Event.on(self.element,gestures,handler,function(type){self.eventHandlers.push({gesture:type,handler:handler});});return self;},off:function offEvent(gestures,handler){var self=this;Event.off(self.element,gestures,handler,function(type){var index=Utils.inArray({gesture:type,handler:handler});if(index!==false){self.eventHandlers.splice(index,1);}});return self;},trigger:function triggerEvent(gesture,eventData){if(!eventData){eventData={};}
var event=Hammer.DOCUMENT.createEvent('Event');event.initEvent(gesture,true,true);event.gesture=eventData;var element=this.element;if(Utils.hasParent(eventData.target,element)){element=eventData.target;}
element.dispatchEvent(event);return this;},enable:function enable(state){this.enabled=state;return this;},dispose:function dispose(){var i,eh;Utils.toggleBehavior(this.element,this.options.behavior,false);for(i=-1;(eh=this.eventHandlers[++i]);){Utils.off(this.element,eh.gesture,eh.handler);}
this.eventHandlers=[];Event.off(this.element,EVENT_TYPES[EVENT_START],this.eventStartHandler);return null;}};var Event=Hammer.event={preventMouseEvents:false,started:false,shouldDetect:false,on:function on(element,type,handler,hook){var types=type.split(' ');Utils.each(types,function(type){Utils.on(element,type,handler);hook&&hook(type);});},off:function off(element,type,handler,hook){var types=type.split(' ');Utils.each(types,function(type){Utils.off(element,type,handler);hook&&hook(type);});},onTouch:function onTouch(element,eventType,handler){var self=this;var onTouchHandler=function onTouchHandler(ev){var srcType=ev.type.toLowerCase(),isPointer=Hammer.HAS_POINTEREVENTS,isMouse=Utils.inStr(srcType,'mouse'),triggerType;if(isMouse&&self.preventMouseEvents){return;}else if(isMouse&&eventType==EVENT_START&&ev.button===0){self.preventMouseEvents=false;self.shouldDetect=true;}else if(isPointer&&eventType==EVENT_START){self.shouldDetect=(ev.buttons===1||PointerEvent.matchType(POINTER_TOUCH,ev));}else if(!isMouse&&eventType==EVENT_START){self.preventMouseEvents=true;self.shouldDetect=true;}
if(isPointer&&eventType!=EVENT_END){PointerEvent.updatePointer(eventType,ev);}
if(self.shouldDetect){triggerType=self.doDetect.call(self,ev,eventType,element,handler);}
if(triggerType==EVENT_END){self.preventMouseEvents=false;self.shouldDetect=false;PointerEvent.reset();}
if(isPointer&&eventType==EVENT_END){PointerEvent.updatePointer(eventType,ev);}};this.on(element,EVENT_TYPES[eventType],onTouchHandler);return onTouchHandler;},doDetect:function doDetect(ev,eventType,element,handler){var touchList=this.getTouchList(ev,eventType);var touchListLength=touchList.length;var triggerType=eventType;var triggerChange=touchList.trigger;var changedLength=touchListLength;if(eventType==EVENT_START){triggerChange=EVENT_TOUCH;}else if(eventType==EVENT_END){triggerChange=EVENT_RELEASE;changedLength=touchList.length-((ev.changedTouches)?ev.changedTouches.length:1);}
if(changedLength>0&&this.started){triggerType=EVENT_MOVE;}
this.started=true;var evData=this.collectEventData(element,triggerType,touchList,ev);if(eventType!=EVENT_END){handler.call(Detection,evData);}
if(triggerChange){evData.changedLength=changedLength;evData.eventType=triggerChange;handler.call(Detection,evData);evData.eventType=triggerType;delete evData.changedLength;}
if(triggerType==EVENT_END){handler.call(Detection,evData);this.started=false;}
return triggerType;},determineEventTypes:function determineEventTypes(){var types;if(Hammer.HAS_POINTEREVENTS){if(window.PointerEvent){types=['pointerdown','pointermove','pointerup pointercancel lostpointercapture'];}else{types=['MSPointerDown','MSPointerMove','MSPointerUp MSPointerCancel MSLostPointerCapture'];}}else if(Hammer.NO_MOUSEEVENTS){types=['touchstart','touchmove','touchend touchcancel'];}else{types=['touchstart mousedown','touchmove mousemove','touchend touchcancel mouseup'];}
EVENT_TYPES[EVENT_START]=types[0];EVENT_TYPES[EVENT_MOVE]=types[1];EVENT_TYPES[EVENT_END]=types[2];return EVENT_TYPES;},getTouchList:function getTouchList(ev,eventType){if(Hammer.HAS_POINTEREVENTS){return PointerEvent.getTouchList();}
if(ev.touches){if(eventType==EVENT_MOVE){return ev.touches;}
var identifiers=[];var concat=[].concat(Utils.toArray(ev.touches),Utils.toArray(ev.changedTouches));var touchList=[];Utils.each(concat,function(touch){if(Utils.inArray(identifiers,touch.identifier)===false){touchList.push(touch);}
identifiers.push(touch.identifier);});return touchList;}
ev.identifier=1;return[ev];},collectEventData:function collectEventData(element,eventType,touches,ev){var pointerType=POINTER_TOUCH;if(Utils.inStr(ev.type,'mouse')||PointerEvent.matchType(POINTER_MOUSE,ev)){pointerType=POINTER_MOUSE;}else if(PointerEvent.matchType(POINTER_PEN,ev)){pointerType=POINTER_PEN;}
return{center:Utils.getCenter(touches),timeStamp:Date.now(),target:ev.target,touches:touches,eventType:eventType,pointerType:pointerType,srcEvent:ev,preventDefault:function(){var srcEvent=this.srcEvent;srcEvent.preventManipulation&&srcEvent.preventManipulation();srcEvent.preventDefault&&srcEvent.preventDefault();},stopPropagation:function(){this.srcEvent.stopPropagation();},stopDetect:function(){return Detection.stopDetect();}};}};var PointerEvent=Hammer.PointerEvent={pointers:{},getTouchList:function getTouchList(){var touchlist=[];Utils.each(this.pointers,function(pointer){touchlist.push(pointer);});return touchlist;},updatePointer:function updatePointer(eventType,pointerEvent){if(eventType==EVENT_END||(eventType!=EVENT_END&&pointerEvent.buttons!==1)){delete this.pointers[pointerEvent.pointerId];}else{pointerEvent.identifier=pointerEvent.pointerId;this.pointers[pointerEvent.pointerId]=pointerEvent;}},matchType:function matchType(pointerType,ev){if(!ev.pointerType){return false;}
var pt=ev.pointerType,types={};types[POINTER_MOUSE]=(pt===(ev.MSPOINTER_TYPE_MOUSE||POINTER_MOUSE));types[POINTER_TOUCH]=(pt===(ev.MSPOINTER_TYPE_TOUCH||POINTER_TOUCH));types[POINTER_PEN]=(pt===(ev.MSPOINTER_TYPE_PEN||POINTER_PEN));return types[pointerType];},reset:function resetList(){this.pointers={};}};var Detection=Hammer.detection={gestures:[],current:null,previous:null,stopped:false,startDetect:function startDetect(inst,eventData){if(this.current){return;}
this.stopped=false;this.current={inst:inst,startEvent:Utils.extend({},eventData),lastEvent:false,lastCalcEvent:false,futureCalcEvent:false,lastCalcData:{},name:''};this.detect(eventData);},detect:function detect(eventData){if(!this.current||this.stopped){return;}
eventData=this.extendEventData(eventData);var inst=this.current.inst,instOptions=inst.options;Utils.each(this.gestures,function triggerGesture(gesture){if(!this.stopped&&inst.enabled&&instOptions[gesture.name]){gesture.handler.call(gesture,eventData,inst);}},this);if(this.current){this.current.lastEvent=eventData;}
if(eventData.eventType==EVENT_END){this.stopDetect();}
return eventData;},stopDetect:function stopDetect(){this.previous=Utils.extend({},this.current);this.current=null;this.stopped=true;},getCalculatedData:function getCalculatedData(ev,center,deltaTime,deltaX,deltaY){var cur=this.current,recalc=false,calcEv=cur.lastCalcEvent,calcData=cur.lastCalcData;if(calcEv&&ev.timeStamp-calcEv.timeStamp>Hammer.CALCULATE_INTERVAL){center=calcEv.center;deltaTime=ev.timeStamp-calcEv.timeStamp;deltaX=ev.center.clientX-calcEv.center.clientX;deltaY=ev.center.clientY-calcEv.center.clientY;recalc=true;}
if(ev.eventType==EVENT_TOUCH||ev.eventType==EVENT_RELEASE){cur.futureCalcEvent=ev;}
if(!cur.lastCalcEvent||recalc){calcData.velocity=Utils.getVelocity(deltaTime,deltaX,deltaY);calcData.angle=Utils.getAngle(center,ev.center);calcData.direction=Utils.getDirection(center,ev.center);cur.lastCalcEvent=cur.futureCalcEvent||ev;cur.futureCalcEvent=ev;}
ev.velocityX=calcData.velocity.x;ev.velocityY=calcData.velocity.y;ev.interimAngle=calcData.angle;ev.interimDirection=calcData.direction;},extendEventData:function extendEventData(ev){var cur=this.current,startEv=cur.startEvent,lastEv=cur.lastEvent||startEv;if(ev.eventType==EVENT_TOUCH||ev.eventType==EVENT_RELEASE){startEv.touches=[];Utils.each(ev.touches,function(touch){startEv.touches.push({clientX:touch.clientX,clientY:touch.clientY});});}
var deltaTime=ev.timeStamp-startEv.timeStamp,deltaX=ev.center.clientX-startEv.center.clientX,deltaY=ev.center.clientY-startEv.center.clientY;this.getCalculatedData(ev,lastEv.center,deltaTime,deltaX,deltaY);Utils.extend(ev,{startEvent:startEv,deltaTime:deltaTime,deltaX:deltaX,deltaY:deltaY,distance:Utils.getDistance(startEv.center,ev.center),angle:Utils.getAngle(startEv.center,ev.center),direction:Utils.getDirection(startEv.center,ev.center),scale:Utils.getScale(startEv.touches,ev.touches),rotation:Utils.getRotation(startEv.touches,ev.touches)});return ev;},register:function register(gesture){var options=gesture.defaults||{};if(options[gesture.name]===undefined){options[gesture.name]=true;}
Utils.extend(Hammer.defaults,options,true);gesture.index=gesture.index||1000;this.gestures.push(gesture);this.gestures.sort(function(a,b){if(a.index<b.index){return-1;}
if(a.index>b.index){return 1;}
return 0;});return this.gestures;}};(function(name){var triggered=false;function dragGesture(ev,inst){var cur=Detection.current;if(inst.options.dragMaxTouches>0&&ev.touches.length>inst.options.dragMaxTouches){return;}
switch(ev.eventType){case EVENT_START:triggered=false;break;case EVENT_MOVE:if(ev.distance<inst.options.dragMinDistance&&cur.name!=name){return;}
var startCenter=cur.startEvent.center;if(cur.name!=name){cur.name=name;if(inst.options.dragDistanceCorrection&&ev.distance>0){var factor=Math.abs(inst.options.dragMinDistance/ev.distance);startCenter.pageX+=ev.deltaX*factor;startCenter.pageY+=ev.deltaY*factor;startCenter.clientX+=ev.deltaX*factor;startCenter.clientY+=ev.deltaY*factor;ev=Detection.extendEventData(ev);}}
if(cur.lastEvent.dragLockToAxis||(inst.options.dragLockToAxis&&inst.options.dragLockMinDistance<=ev.distance)){ev.dragLockToAxis=true;}
var lastDirection=cur.lastEvent.direction;if(ev.dragLockToAxis&&lastDirection!==ev.direction){if(Utils.isVertical(lastDirection)){ev.direction=(ev.deltaY<0)?DIRECTION_UP:DIRECTION_DOWN;}else{ev.direction=(ev.deltaX<0)?DIRECTION_LEFT:DIRECTION_RIGHT;}}
if(!triggered){inst.trigger(name+'start',ev);triggered=true;}
inst.trigger(name,ev);inst.trigger(name+ev.direction,ev);var isVertical=Utils.isVertical(ev.direction);if((inst.options.dragBlockVertical&&isVertical)||(inst.options.dragBlockHorizontal&&!isVertical)){ev.preventDefault();}
break;case EVENT_RELEASE:if(triggered&&ev.changedLength<=inst.options.dragMaxTouches){inst.trigger(name+'end',ev);triggered=false;}
break;case EVENT_END:triggered=false;break;}}
Hammer.gestures.Drag={name:name,index:50,handler:dragGesture,defaults:{dragMinDistance:10,dragDistanceCorrection:true,dragMaxTouches:1,dragBlockHorizontal:false,dragBlockVertical:false,dragLockToAxis:false,dragLockMinDistance:25}};})('drag');Hammer.gestures.Gesture={name:'gesture',index:1337,handler:function releaseGesture(ev,inst){inst.trigger(this.name,ev);}};(function(name){var timer;function holdGesture(ev,inst){var options=inst.options,current=Detection.current;switch(ev.eventType){case EVENT_START:clearTimeout(timer);current.name=name;timer=setTimeout(function(){if(current&&current.name==name){inst.trigger(name,ev);}},options.holdTimeout);break;case EVENT_MOVE:if(ev.distance>options.holdThreshold){clearTimeout(timer);}
break;case EVENT_RELEASE:clearTimeout(timer);break;}}
Hammer.gestures.Hold={name:name,index:10,defaults:{holdTimeout:500,holdThreshold:2},handler:holdGesture};})('hold');Hammer.gestures.Release={name:'release',index:Infinity,handler:function releaseGesture(ev,inst){if(ev.eventType==EVENT_RELEASE){inst.trigger(this.name,ev);}}};Hammer.gestures.Swipe={name:'swipe',index:40,defaults:{swipeMinTouches:1,swipeMaxTouches:1,swipeVelocityX:0.6,swipeVelocityY:0.6},handler:function swipeGesture(ev,inst){if(ev.eventType==EVENT_RELEASE){var touches=ev.touches.length,options=inst.options;if(touches<options.swipeMinTouches||touches>options.swipeMaxTouches){return;}
if(ev.velocityX>options.swipeVelocityX||ev.velocityY>options.swipeVelocityY){inst.trigger(this.name,ev);inst.trigger(this.name+ev.direction,ev);}}}};(function(name){var hasMoved=false;function tapGesture(ev,inst){var options=inst.options,current=Detection.current,prev=Detection.previous,sincePrev,didDoubleTap;switch(ev.eventType){case EVENT_START:hasMoved=false;break;case EVENT_MOVE:hasMoved=hasMoved||(ev.distance>options.tapMaxDistance);break;case EVENT_END:if(!Utils.inStr(ev.srcEvent.type,'cancel')&&ev.deltaTime<options.tapMaxTime&&!hasMoved){sincePrev=prev&&prev.lastEvent&&ev.timeStamp-prev.lastEvent.timeStamp;didDoubleTap=false;if(prev&&prev.name==name&&(sincePrev&&sincePrev<options.doubleTapInterval)&&ev.distance<options.doubleTapDistance){inst.trigger('doubletap',ev);didDoubleTap=true;}
if(!didDoubleTap||options.tapAlways){current.name=name;inst.trigger(current.name,ev);}}
break;}}
Hammer.gestures.Tap={name:name,index:100,handler:tapGesture,defaults:{tapMaxTime:250,tapMaxDistance:10,tapAlways:true,doubleTapDistance:20,doubleTapInterval:300}};})('tap');Hammer.gestures.Touch={name:'touch',index:-Infinity,defaults:{preventDefault:false,preventMouse:false},handler:function touchGesture(ev,inst){if(inst.options.preventMouse&&ev.pointerType==POINTER_MOUSE){ev.stopDetect();return;}
if(inst.options.preventDefault){ev.preventDefault();}
if(ev.eventType==EVENT_TOUCH){inst.trigger('touch',ev);}}};(function(name){var triggered=false;function transformGesture(ev,inst){switch(ev.eventType){case EVENT_START:triggered=false;break;case EVENT_MOVE:if(ev.touches.length<2){return;}
var scaleThreshold=Math.abs(1-ev.scale);var rotationThreshold=Math.abs(ev.rotation);if(scaleThreshold<inst.options.transformMinScale&&rotationThreshold<inst.options.transformMinRotation){return;}
Detection.current.name=name;if(!triggered){inst.trigger(name+'start',ev);triggered=true;}
inst.trigger(name,ev);if(rotationThreshold>inst.options.transformMinRotation){inst.trigger('rotate',ev);}
if(scaleThreshold>inst.options.transformMinScale){inst.trigger('pinch',ev);inst.trigger('pinch'+(ev.scale<1?'in':'out'),ev);}
break;case EVENT_RELEASE:if(triggered&&ev.changedLength<2){inst.trigger(name+'end',ev);triggered=false;}
break;}}
Hammer.gestures.Transform={name:name,index:45,defaults:{transformMinScale:0.01,transformMinRotation:1},handler:transformGesture};})('transform');window.Hammer=Hammer;if(typeof module!=='undefined'&&module.exports){module.exports=Hammer;}
function setupPlugin(Hammer,$){if(!Date.now){Date.now=function now(){return new Date().getTime();};}
Hammer.utils.each(['on','off'],function(method){Hammer.utils[method]=function(element,type,handler){$(element)[method](type,function($ev){var data=$.extend({},$ev.originalEvent,$ev);if(data.button===undefined){data.button=$ev.which-1;}
handler.call(this,data);});};});Hammer.Instance.prototype.trigger=function(gesture,eventData){var el=$(this.element);if(el.has(eventData.target).length){el=$(eventData.target);}
return el.trigger({type:gesture,gesture:eventData});};$.fn.hammer=function(options){return this.each(function(){var el=$(this);var inst=el.data('hammer');if(!inst){el.data('hammer',new Hammer(this,options||{}));}else if(inst&&options){Hammer.utils.extend(inst.options,options);}});};}
if(typeof define=='function'&&define.amd){define('hammer',['jquery'],function($){return setupPlugin(window.Hammer,$);});}else{setupPlugin(window.Hammer,window.jQuery||window.Zepto);}})(window);;(function(window){if(window.jQuery){return;}
var $=function(selector,context){return new $.fn.init(selector,context);};$.isWindow=function(obj){return obj!=null&&obj==obj.window;};$.type=function(obj){if(obj==null){return obj+"";}
return typeof obj==="object"||typeof obj==="function"?class2type[toString.call(obj)]||"object":typeof obj;};$.isArray=Array.isArray||function(obj){return $.type(obj)==="array";};function isArraylike(obj){var length=obj.length,type=$.type(obj);if(type==="function"||$.isWindow(obj)){return false;}
if(obj.nodeType===1&&length){return true;}
return type==="array"||length===0||typeof length==="number"&&length>0&&(length-1)in obj;}
$.isPlainObject=function(obj){var key;if(!obj||$.type(obj)!=="object"||obj.nodeType||$.isWindow(obj)){return false;}
try{if(obj.constructor&&!hasOwn.call(obj,"constructor")&&!hasOwn.call(obj.constructor.prototype,"isPrototypeOf")){return false;}}catch(e){return false;}
for(key in obj){}
return key===undefined||hasOwn.call(obj,key);};$.each=function(obj,callback,args){var value,i=0,length=obj.length,isArray=isArraylike(obj);if(args){if(isArray){for(;i<length;i++){value=callback.apply(obj[i],args);if(value===false){break;}}}else{for(i in obj){value=callback.apply(obj[i],args);if(value===false){break;}}}}else{if(isArray){for(;i<length;i++){value=callback.call(obj[i],i,obj[i]);if(value===false){break;}}}else{for(i in obj){value=callback.call(obj[i],i,obj[i]);if(value===false){break;}}}}
return obj;};$.data=function(node,key,value){if(value===undefined){var id=node[$.expando],store=id&&cache[id];if(key===undefined){return store;}else if(store){if(key in store){return store[key];}}}else if(key!==undefined){var id=node[$.expando]||(node[$.expando]=++$.uuid);cache[id]=cache[id]||{};cache[id][key]=value;return value;}};$.removeData=function(node,keys){var id=node[$.expando],store=id&&cache[id];if(store){$.each(keys,function(_,key){delete store[key];});}};$.extend=function(){var src,copyIsArray,copy,name,options,clone,target=arguments[0]||{},i=1,length=arguments.length,deep=false;if(typeof target==="boolean"){deep=target;target=arguments[i]||{};i++;}
if(typeof target!=="object"&&$.type(target)!=="function"){target={};}
if(i===length){target=this;i--;}
for(;i<length;i++){if((options=arguments[i])!=null){for(name in options){src=target[name];copy=options[name];if(target===copy){continue;}
if(deep&&copy&&($.isPlainObject(copy)||(copyIsArray=$.isArray(copy)))){if(copyIsArray){copyIsArray=false;clone=src&&$.isArray(src)?src:[];}else{clone=src&&$.isPlainObject(src)?src:{};}
target[name]=$.extend(deep,clone,copy);}else if(copy!==undefined){target[name]=copy;}}}}
return target;};$.queue=function(elem,type,data){function $makeArray(arr,results){var ret=results||[];if(arr!=null){if(isArraylike(Object(arr))){(function(first,second){var len=+second.length,j=0,i=first.length;while(j<len){first[i++]=second[j++];}
if(len!==len){while(second[j]!==undefined){first[i++]=second[j++];}}
first.length=i;return first;})(ret,typeof arr==="string"?[arr]:arr);}else{[].push.call(ret,arr);}}
return ret;}
if(!elem){return;}
type=(type||"fx")+"queue";var q=$.data(elem,type);if(!data){return q||[];}
if(!q||$.isArray(data)){q=$.data(elem,type,$makeArray(data));}else{q.push(data);}
return q;};$.dequeue=function(elems,type){$.each(elems.nodeType?[elems]:elems,function(i,elem){type=type||"fx";var queue=$.queue(elem,type),fn=queue.shift();if(fn==="inprogress"){fn=queue.shift();}
if(fn){if(type==="fx"){queue.unshift("inprogress");}
fn.call(elem,function(){$.dequeue(elem,type);});}});};$.fn=$.prototype={init:function(selector){if(selector.nodeType){this[0]=selector;return this;}else{throw new Error("Not a DOM node.");}},offset:function(){var box=this[0].getBoundingClientRect?this[0].getBoundingClientRect():{top:0,left:0};return{top:box.top+(window.pageYOffset||document.scrollTop||0)-(document.clientTop||0),left:box.left+(window.pageXOffset||document.scrollLeft||0)-(document.clientLeft||0)};},position:function(){function offsetParent(){var offsetParent=this.offsetParent||document;while(offsetParent&&(!offsetParent.nodeType.toLowerCase==="html"&&offsetParent.style.position==="static")){offsetParent=offsetParent.offsetParent;}
return offsetParent||document;}
var elem=this[0],offsetParent=offsetParent.apply(elem),offset=this.offset(),parentOffset=/^(?:body|html)$/i.test(offsetParent.nodeName)?{top:0,left:0}:$(offsetParent).offset()
offset.top-=parseFloat(elem.style.marginTop)||0;offset.left-=parseFloat(elem.style.marginLeft)||0;if(offsetParent.style){parentOffset.top+=parseFloat(offsetParent.style.borderTopWidth)||0
parentOffset.left+=parseFloat(offsetParent.style.borderLeftWidth)||0}
return{top:offset.top-parentOffset.top,left:offset.left-parentOffset.left};}};var cache={};$.expando="velocity"+(new Date().getTime());$.uuid=0;var class2type={},hasOwn=class2type.hasOwnProperty,toString=class2type.toString;var types="Boolean Number String Function Array Date RegExp Object Error".split(" ");for(var i=0;i<types.length;i++){class2type["[object "+types[i]+"]"]=types[i].toLowerCase();}
$.fn.init.prototype=$.fn;window.Velocity={Utilities:$};})(window);;(function(factory){if(typeof module==="object"&&typeof module.exports==="object"){module.exports=factory();}else if(typeof define==="function"&&define.amd){define('velocity',factory);}else{factory();}}(function(){return function(global,window,document,undefined){var IE=(function(){if(document.documentMode){return document.documentMode;}else{for(var i=7;i>4;i--){var div=document.createElement("div");div.innerHTML="<!--[if IE "+i+"]><span></span><![endif]-->";if(div.getElementsByTagName("span").length){div=null;return i;}}}
return undefined;})();var rAFShim=(function(){var timeLast=0;return window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||function(callback){var timeCurrent=(new Date()).getTime(),timeDelta;timeDelta=Math.max(0,16-(timeCurrent-timeLast));timeLast=timeCurrent+timeDelta;return setTimeout(function(){callback(timeCurrent+timeDelta);},timeDelta);};})();function compactSparseArray(array){var index=-1,length=array?array.length:0,result=[];while(++index<length){var value=array[index];if(value){result.push(value);}}
return result;}
function sanitizeElements(elements){if(Type.isWrapped(elements)){elements=[].slice.call(elements);}else if(Type.isNode(elements)){elements=[elements];}
return elements;}
var Type={isString:function(variable){return(typeof variable==="string");},isArray:Array.isArray||function(variable){return Object.prototype.toString.call(variable)==="[object Array]";},isFunction:function(variable){return Object.prototype.toString.call(variable)==="[object Function]";},isNode:function(variable){return variable&&variable.nodeType;},isNodeList:function(variable){return typeof variable==="object"&&/^\[object(HTMLCollection|NodeList|Object)\]$/.test(Object.prototype.toString.call(variable))&&variable.length!==undefined&&(variable.length===0||(typeof variable[0]==="object"&&variable[0].nodeType>0));},isWrapped:function(variable){return variable&&(variable.jquery||(window.Zepto&&window.Zepto.zepto.isZ(variable)));},isSVG:function(variable){return window.SVGElement&&(variable instanceof window.SVGElement);},isEmptyObject:function(variable){for(var name in variable){return false;}
return true;}};var $,isJQuery=false;if(global.fn&&global.fn.jquery){$=global;isJQuery=true;}else{$=window.Velocity.Utilities;}
if(IE<=8&&!isJQuery){throw new Error("Velocity: IE8 and below require jQuery to be loaded before Velocity.");}else if(IE<=7){jQuery.fn.velocity=jQuery.fn.animate;return;}
var DURATION_DEFAULT=400,EASING_DEFAULT="swing";var Velocity={State:{isMobile:/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),isAndroid:/Android/i.test(navigator.userAgent),isGingerbread:/Android 2\.3\.[3-7]/i.test(navigator.userAgent),isChrome:window.chrome,isFirefox:/Firefox/i.test(navigator.userAgent),prefixElement:document.createElement("div"),prefixMatches:{},scrollAnchor:null,scrollPropertyLeft:null,scrollPropertyTop:null,isTicking:false,calls:[]},CSS:{},Utilities:$,Redirects:{},Easings:{},Promise:window.Promise,defaults:{queue:"",duration:DURATION_DEFAULT,easing:EASING_DEFAULT,begin:undefined,complete:undefined,progress:undefined,display:undefined,visibility:undefined,loop:false,delay:false,mobileHA:true,_cacheValues:true},init:function(element){$.data(element,"velocity",{isSVG:Type.isSVG(element),isAnimating:false,computedStyle:null,tweensContainer:null,rootPropertyValueCache:{},transformCache:{}});},hook:null,mock:false,version:{major:1,minor:1,patch:0},debug:false};if(window.pageYOffset!==undefined){Velocity.State.scrollAnchor=window;Velocity.State.scrollPropertyLeft="pageXOffset";Velocity.State.scrollPropertyTop="pageYOffset";}else{Velocity.State.scrollAnchor=document.documentElement||document.body.parentNode||document.body;Velocity.State.scrollPropertyLeft="scrollLeft";Velocity.State.scrollPropertyTop="scrollTop";}
function Data(element){var response=$.data(element,"velocity");return response===null?undefined:response;};function generateStep(steps){return function(p){return Math.round(p*steps)*(1/steps);};}
function generateBezier(mX1,mY1,mX2,mY2){var NEWTON_ITERATIONS=4,NEWTON_MIN_SLOPE=0.001,SUBDIVISION_PRECISION=0.0000001,SUBDIVISION_MAX_ITERATIONS=10,kSplineTableSize=11,kSampleStepSize=1.0/(kSplineTableSize-1.0),float32ArraySupported="Float32Array"in window;if(arguments.length!==4){return false;}
for(var i=0;i<4;++i){if(typeof arguments[i]!=="number"||isNaN(arguments[i])||!isFinite(arguments[i])){return false;}}
mX1=Math.min(mX1,1);mX2=Math.min(mX2,1);mX1=Math.max(mX1,0);mX2=Math.max(mX2,0);var mSampleValues=float32ArraySupported?new Float32Array(kSplineTableSize):new Array(kSplineTableSize);function A(aA1,aA2){return 1.0-3.0*aA2+3.0*aA1;}
function B(aA1,aA2){return 3.0*aA2-6.0*aA1;}
function C(aA1){return 3.0*aA1;}
function calcBezier(aT,aA1,aA2){return((A(aA1,aA2)*aT+B(aA1,aA2))*aT+C(aA1))*aT;}
function getSlope(aT,aA1,aA2){return 3.0*A(aA1,aA2)*aT*aT+2.0*B(aA1,aA2)*aT+C(aA1);}
function newtonRaphsonIterate(aX,aGuessT){for(var i=0;i<NEWTON_ITERATIONS;++i){var currentSlope=getSlope(aGuessT,mX1,mX2);if(currentSlope===0.0)return aGuessT;var currentX=calcBezier(aGuessT,mX1,mX2)-aX;aGuessT-=currentX/currentSlope;}
return aGuessT;}
function calcSampleValues(){for(var i=0;i<kSplineTableSize;++i){mSampleValues[i]=calcBezier(i*kSampleStepSize,mX1,mX2);}}
function binarySubdivide(aX,aA,aB){var currentX,currentT,i=0;do{currentT=aA+(aB-aA)/2.0;currentX=calcBezier(currentT,mX1,mX2)-aX;if(currentX>0.0){aB=currentT;}else{aA=currentT;}}while(Math.abs(currentX)>SUBDIVISION_PRECISION&&++i<SUBDIVISION_MAX_ITERATIONS);return currentT;}
function getTForX(aX){var intervalStart=0.0,currentSample=1,lastSample=kSplineTableSize-1;for(;currentSample!=lastSample&&mSampleValues[currentSample]<=aX;++currentSample){intervalStart+=kSampleStepSize;}
--currentSample;var dist=(aX-mSampleValues[currentSample])/(mSampleValues[currentSample+1]-mSampleValues[currentSample]),guessForT=intervalStart+dist*kSampleStepSize,initialSlope=getSlope(guessForT,mX1,mX2);if(initialSlope>=NEWTON_MIN_SLOPE){return newtonRaphsonIterate(aX,guessForT);}else if(initialSlope==0.0){return guessForT;}else{return binarySubdivide(aX,intervalStart,intervalStart+kSampleStepSize);}}
var _precomputed=false;function precompute(){_precomputed=true;if(mX1!=mY1||mX2!=mY2)calcSampleValues();}
var f=function(aX){if(!_precomputed)precompute();if(mX1===mY1&&mX2===mY2)return aX;if(aX===0)return 0;if(aX===1)return 1;return calcBezier(getTForX(aX),mY1,mY2);};f.getControlPoints=function(){return[{x:mX1,y:mY1},{x:mX2,y:mY2}];};var str="generateBezier("+[mX1,mY1,mX2,mY2]+")";f.toString=function(){return str;};return f;}
var generateSpringRK4=(function(){function springAccelerationForState(state){return(-state.tension*state.x)-(state.friction*state.v);}
function springEvaluateStateWithDerivative(initialState,dt,derivative){var state={x:initialState.x+derivative.dx*dt,v:initialState.v+derivative.dv*dt,tension:initialState.tension,friction:initialState.friction};return{dx:state.v,dv:springAccelerationForState(state)};}
function springIntegrateState(state,dt){var a={dx:state.v,dv:springAccelerationForState(state)},b=springEvaluateStateWithDerivative(state,dt*0.5,a),c=springEvaluateStateWithDerivative(state,dt*0.5,b),d=springEvaluateStateWithDerivative(state,dt,c),dxdt=1.0/6.0*(a.dx+2.0*(b.dx+c.dx)+d.dx),dvdt=1.0/6.0*(a.dv+2.0*(b.dv+c.dv)+d.dv);state.x=state.x+dxdt*dt;state.v=state.v+dvdt*dt;return state;}
return function springRK4Factory(tension,friction,duration){var initState={x:-1,v:0,tension:null,friction:null},path=[0],time_lapsed=0,tolerance=1/10000,DT=16/1000,have_duration,dt,last_state;tension=parseFloat(tension)||500;friction=parseFloat(friction)||20;duration=duration||null;initState.tension=tension;initState.friction=friction;have_duration=duration!==null;if(have_duration){time_lapsed=springRK4Factory(tension,friction);dt=time_lapsed/duration*DT;}else{dt=DT;}
while(true){last_state=springIntegrateState(last_state||initState,dt);path.push(1+last_state.x);time_lapsed+=16;if(!(Math.abs(last_state.x)>tolerance&&Math.abs(last_state.v)>tolerance)){break;}}
return!have_duration?time_lapsed:function(percentComplete){return path[(percentComplete*(path.length-1))|0];};};}());Velocity.Easings={linear:function(p){return p;},swing:function(p){return 0.5-Math.cos(p*Math.PI)/2},spring:function(p){return 1-(Math.cos(p*4.5*Math.PI)*Math.exp(-p*6));}};$.each([["ease",[0.25,0.1,0.25,1.0]],["ease-in",[0.42,0.0,1.00,1.0]],["ease-out",[0.00,0.0,0.58,1.0]],["ease-in-out",[0.42,0.0,0.58,1.0]],["easeInSine",[0.47,0,0.745,0.715]],["easeOutSine",[0.39,0.575,0.565,1]],["easeInOutSine",[0.445,0.05,0.55,0.95]],["easeInQuad",[0.55,0.085,0.68,0.53]],["easeOutQuad",[0.25,0.46,0.45,0.94]],["easeInOutQuad",[0.455,0.03,0.515,0.955]],["easeInCubic",[0.55,0.055,0.675,0.19]],["easeOutCubic",[0.215,0.61,0.355,1]],["easeInOutCubic",[0.645,0.045,0.355,1]],["easeInQuart",[0.895,0.03,0.685,0.22]],["easeOutQuart",[0.165,0.84,0.44,1]],["easeInOutQuart",[0.77,0,0.175,1]],["easeInQuint",[0.755,0.05,0.855,0.06]],["easeOutQuint",[0.23,1,0.32,1]],["easeInOutQuint",[0.86,0,0.07,1]],["easeInExpo",[0.95,0.05,0.795,0.035]],["easeOutExpo",[0.19,1,0.22,1]],["easeInOutExpo",[1,0,0,1]],["easeInCirc",[0.6,0.04,0.98,0.335]],["easeOutCirc",[0.075,0.82,0.165,1]],["easeInOutCirc",[0.785,0.135,0.15,0.86]]],function(i,easingArray){Velocity.Easings[easingArray[0]]=generateBezier.apply(null,easingArray[1]);});function getEasing(value,duration){var easing=value;if(Type.isString(value)){if(!Velocity.Easings[value]){easing=false;}}else if(Type.isArray(value)&&value.length===1){easing=generateStep.apply(null,value);}else if(Type.isArray(value)&&value.length===2){easing=generateSpringRK4.apply(null,value.concat([duration]));}else if(Type.isArray(value)&&value.length===4){easing=generateBezier.apply(null,value);}else{easing=false;}
if(easing===false){if(Velocity.Easings[Velocity.defaults.easing]){easing=Velocity.defaults.easing;}else{easing=EASING_DEFAULT;}}
return easing;}
var CSS=Velocity.CSS={RegEx:{isHex:/^#([A-f\d]{3}){1,2}$/i,valueUnwrap:/^[A-z]+\((.*)\)$/i,wrappedValueAlreadyExtracted:/[0-9.]+ [0-9.]+ [0-9.]+( [0-9.]+)?/,valueSplit:/([A-z]+\(.+\))|(([A-z0-9#-.]+?)(?=\s|$))/ig},Lists:{colors:["fill","stroke","stopColor","color","backgroundColor","borderColor","borderTopColor","borderRightColor","borderBottomColor","borderLeftColor","outlineColor"],transformsBase:["translateX","translateY","scale","scaleX","scaleY","skewX","skewY","rotateZ"],transforms3D:["transformPerspective","translateZ","scaleZ","rotateX","rotateY"]},Hooks:{templates:{"textShadow":["Color X Y Blur","black 0px 0px 0px"],"boxShadow":["Color X Y Blur Spread","black 0px 0px 0px 0px"],"clip":["Top Right Bottom Left","0px 0px 0px 0px"],"backgroundPosition":["X Y","0% 0%"],"transformOrigin":["X Y Z","50% 50% 0px"],"perspectiveOrigin":["X Y","50% 50%"]},registered:{},register:function(){for(var i=0;i<CSS.Lists.colors.length;i++){var rgbComponents=(CSS.Lists.colors[i]==="color")?"0 0 0 1":"255 255 255 1";CSS.Hooks.templates[CSS.Lists.colors[i]]=["Red Green Blue Alpha",rgbComponents];}
var rootProperty,hookTemplate,hookNames;if(IE){for(rootProperty in CSS.Hooks.templates){hookTemplate=CSS.Hooks.templates[rootProperty];hookNames=hookTemplate[0].split(" ");var defaultValues=hookTemplate[1].match(CSS.RegEx.valueSplit);if(hookNames[0]==="Color"){hookNames.push(hookNames.shift());defaultValues.push(defaultValues.shift());CSS.Hooks.templates[rootProperty]=[hookNames.join(" "),defaultValues.join(" ")];}}}
for(rootProperty in CSS.Hooks.templates){hookTemplate=CSS.Hooks.templates[rootProperty];hookNames=hookTemplate[0].split(" ");for(var i in hookNames){var fullHookName=rootProperty+hookNames[i],hookPosition=i;CSS.Hooks.registered[fullHookName]=[rootProperty,hookPosition];}}},getRoot:function(property){var hookData=CSS.Hooks.registered[property];if(hookData){return hookData[0];}else{return property;}},cleanRootPropertyValue:function(rootProperty,rootPropertyValue){if(CSS.RegEx.valueUnwrap.test(rootPropertyValue)){rootPropertyValue=rootPropertyValue.match(CSS.RegEx.valueUnwrap)[1];}
if(CSS.Values.isCSSNullValue(rootPropertyValue)){rootPropertyValue=CSS.Hooks.templates[rootProperty][1];}
return rootPropertyValue;},extractValue:function(fullHookName,rootPropertyValue){var hookData=CSS.Hooks.registered[fullHookName];if(hookData){var hookRoot=hookData[0],hookPosition=hookData[1];rootPropertyValue=CSS.Hooks.cleanRootPropertyValue(hookRoot,rootPropertyValue);return rootPropertyValue.toString().match(CSS.RegEx.valueSplit)[hookPosition];}else{return rootPropertyValue;}},injectValue:function(fullHookName,hookValue,rootPropertyValue){var hookData=CSS.Hooks.registered[fullHookName];if(hookData){var hookRoot=hookData[0],hookPosition=hookData[1],rootPropertyValueParts,rootPropertyValueUpdated;rootPropertyValue=CSS.Hooks.cleanRootPropertyValue(hookRoot,rootPropertyValue);rootPropertyValueParts=rootPropertyValue.toString().match(CSS.RegEx.valueSplit);rootPropertyValueParts[hookPosition]=hookValue;rootPropertyValueUpdated=rootPropertyValueParts.join(" ");return rootPropertyValueUpdated;}else{return rootPropertyValue;}}},Normalizations:{registered:{clip:function(type,element,propertyValue){switch(type){case"name":return"clip";case"extract":var extracted;if(CSS.RegEx.wrappedValueAlreadyExtracted.test(propertyValue)){extracted=propertyValue;}else{extracted=propertyValue.toString().match(CSS.RegEx.valueUnwrap);extracted=extracted?extracted[1].replace(/,(\s+)?/g," "):propertyValue;}
return extracted;case"inject":return"rect("+propertyValue+")";}},blur:function(type,element,propertyValue){switch(type){case"name":return"-webkit-filter";case"extract":var extracted=parseFloat(propertyValue);if(!(extracted||extracted===0)){var blurComponent=propertyValue.toString().match(/blur\(([0-9]+[A-z]+)\)/i);if(blurComponent){extracted=blurComponent[1];}else{extracted=0;}}
return extracted;case"inject":if(!parseFloat(propertyValue)){return"none";}else{return"blur("+propertyValue+")";}}},opacity:function(type,element,propertyValue){if(IE<=8){switch(type){case"name":return"filter";case"extract":var extracted=propertyValue.toString().match(/alpha\(opacity=(.*)\)/i);if(extracted){propertyValue=extracted[1]/100;}else{propertyValue=1;}
return propertyValue;case"inject":element.style.zoom=1;if(parseFloat(propertyValue)>=1){return"";}else{return"alpha(opacity="+parseInt(parseFloat(propertyValue)*100,10)+")";}}}else{switch(type){case"name":return"opacity";case"extract":return propertyValue;case"inject":return propertyValue;}}}},register:function(){if(!(IE<=9)&&!Velocity.State.isGingerbread){CSS.Lists.transformsBase=CSS.Lists.transformsBase.concat(CSS.Lists.transforms3D);}
for(var i=0;i<CSS.Lists.transformsBase.length;i++){(function(){var transformName=CSS.Lists.transformsBase[i];CSS.Normalizations.registered[transformName]=function(type,element,propertyValue){switch(type){case"name":return"transform";case"extract":if(Data(element)===undefined||Data(element).transformCache[transformName]===undefined){return/^scale/i.test(transformName)?1:0;}else{return Data(element).transformCache[transformName].replace(/[()]/g,"");}
case"inject":var invalid=false;switch(transformName.substr(0,transformName.length-1)){case"translate":invalid=!/(%|px|em|rem|vw|vh|\d)$/i.test(propertyValue);break;case"scal":case"scale":if(Velocity.State.isAndroid&&Data(element).transformCache[transformName]===undefined&&propertyValue<1){propertyValue=1;}
invalid=!/(\d)$/i.test(propertyValue);break;case"skew":invalid=!/(deg|\d)$/i.test(propertyValue);break;case"rotate":invalid=!/(deg|\d)$/i.test(propertyValue);break;}
if(!invalid){Data(element).transformCache[transformName]="("+propertyValue+")";}
return Data(element).transformCache[transformName];}};})();}
for(var i=0;i<CSS.Lists.colors.length;i++){(function(){var colorName=CSS.Lists.colors[i];CSS.Normalizations.registered[colorName]=function(type,element,propertyValue){switch(type){case"name":return colorName;case"extract":var extracted;if(CSS.RegEx.wrappedValueAlreadyExtracted.test(propertyValue)){extracted=propertyValue;}else{var converted,colorNames={black:"rgb(0, 0, 0)",blue:"rgb(0, 0, 255)",gray:"rgb(128, 128, 128)",green:"rgb(0, 128, 0)",red:"rgb(255, 0, 0)",white:"rgb(255, 255, 255)"};if(/^[A-z]+$/i.test(propertyValue)){if(colorNames[propertyValue]!==undefined){converted=colorNames[propertyValue]}else{converted=colorNames.black;}}else if(CSS.RegEx.isHex.test(propertyValue)){converted="rgb("+CSS.Values.hexToRgb(propertyValue).join(" ")+")";}else if(!(/^rgba?\(/i.test(propertyValue))){converted=colorNames.black;}
extracted=(converted||propertyValue).toString().match(CSS.RegEx.valueUnwrap)[1].replace(/,(\s+)?/g," ");}
if(!(IE<=8)&&extracted.split(" ").length===3){extracted+=" 1";}
return extracted;case"inject":if(IE<=8){if(propertyValue.split(" ").length===4){propertyValue=propertyValue.split(/\s+/).slice(0,3).join(" ");}}else if(propertyValue.split(" ").length===3){propertyValue+=" 1";}
return(IE<=8?"rgb":"rgba")+"("+propertyValue.replace(/\s+/g,",").replace(/\.(\d)+(?=,)/g,"")+")";}};})();}}},Names:{camelCase:function(property){return property.replace(/-(\w)/g,function(match,subMatch){return subMatch.toUpperCase();});},SVGAttribute:function(property){var SVGAttributes="width|height|x|y|cx|cy|r|rx|ry|x1|x2|y1|y2";if(IE||(Velocity.State.isAndroid&&!Velocity.State.isChrome)){SVGAttributes+="|transform";}
return new RegExp("^("+SVGAttributes+")$","i").test(property);},prefixCheck:function(property){if(Velocity.State.prefixMatches[property]){return[Velocity.State.prefixMatches[property],true];}else{var vendors=["","Webkit","Moz","ms","O"];for(var i=0,vendorsLength=vendors.length;i<vendorsLength;i++){var propertyPrefixed;if(i===0){propertyPrefixed=property;}else{propertyPrefixed=vendors[i]+property.replace(/^\w/,function(match){return match.toUpperCase();});}
if(Type.isString(Velocity.State.prefixElement.style[propertyPrefixed])){Velocity.State.prefixMatches[property]=propertyPrefixed;return[propertyPrefixed,true];}}
return[property,false];}}},Values:{hexToRgb:function(hex){var shortformRegex=/^#?([a-f\d])([a-f\d])([a-f\d])$/i,longformRegex=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i,rgbParts;hex=hex.replace(shortformRegex,function(m,r,g,b){return r+r+g+g+b+b;});rgbParts=longformRegex.exec(hex);return rgbParts?[parseInt(rgbParts[1],16),parseInt(rgbParts[2],16),parseInt(rgbParts[3],16)]:[0,0,0];},isCSSNullValue:function(value){return(value==0||/^(none|auto|transparent|(rgba\(0, ?0, ?0, ?0\)))$/i.test(value));},getUnitType:function(property){if(/^(rotate|skew)/i.test(property)){return"deg";}else if(/(^(scale|scaleX|scaleY|scaleZ|alpha|flexGrow|flexHeight|zIndex|fontWeight)$)|((opacity|red|green|blue|alpha)$)/i.test(property)){return"";}else{return"px";}},getDisplayType:function(element){var tagName=element&&element.tagName.toString().toLowerCase();if(/^(b|big|i|small|tt|abbr|acronym|cite|code|dfn|em|kbd|strong|samp|var|a|bdo|br|img|map|object|q|script|span|sub|sup|button|input|label|select|textarea)$/i.test(tagName)){return"inline";}else if(/^(li)$/i.test(tagName)){return"list-item";}else if(/^(tr)$/i.test(tagName)){return"table-row";}else{return"block";}},addClass:function(element,className){if(element.classList){element.classList.add(className);}else{element.className+=(element.className.length?" ":"")+className;}},removeClass:function(element,className){if(element.classList){element.classList.remove(className);}else{element.className=element.className.toString().replace(new RegExp("(^|\\s)"+className.split(" ").join("|")+"(\\s|$)","gi")," ");}}},getPropertyValue:function(element,property,rootPropertyValue,forceStyleLookup){function computePropertyValue(element,property){var computedValue=0;if(IE<=8){computedValue=$.css(element,property);}else{var toggleDisplay=false;if(/^(width|height)$/.test(property)&&CSS.getPropertyValue(element,"display")===0){toggleDisplay=true;CSS.setPropertyValue(element,"display",CSS.Values.getDisplayType(element));}
function revertDisplay(){if(toggleDisplay){CSS.setPropertyValue(element,"display","none");}}
if(!forceStyleLookup){if(property==="height"&&CSS.getPropertyValue(element,"boxSizing").toString().toLowerCase()!=="border-box"){var contentBoxHeight=element.offsetHeight-(parseFloat(CSS.getPropertyValue(element,"borderTopWidth"))||0)-(parseFloat(CSS.getPropertyValue(element,"borderBottomWidth"))||0)-(parseFloat(CSS.getPropertyValue(element,"paddingTop"))||0)-(parseFloat(CSS.getPropertyValue(element,"paddingBottom"))||0);revertDisplay();return contentBoxHeight;}else if(property==="width"&&CSS.getPropertyValue(element,"boxSizing").toString().toLowerCase()!=="border-box"){var contentBoxWidth=element.offsetWidth-(parseFloat(CSS.getPropertyValue(element,"borderLeftWidth"))||0)-(parseFloat(CSS.getPropertyValue(element,"borderRightWidth"))||0)-(parseFloat(CSS.getPropertyValue(element,"paddingLeft"))||0)-(parseFloat(CSS.getPropertyValue(element,"paddingRight"))||0);revertDisplay();return contentBoxWidth;}}
var computedStyle;if(Data(element)===undefined){computedStyle=window.getComputedStyle(element,null);}else if(!Data(element).computedStyle){computedStyle=Data(element).computedStyle=window.getComputedStyle(element,null);}else{computedStyle=Data(element).computedStyle;}
if((IE||Velocity.State.isFirefox)&&property==="borderColor"){property="borderTopColor";}
if(IE===9&&property==="filter"){computedValue=computedStyle.getPropertyValue(property);}else{computedValue=computedStyle[property];}
if(computedValue===""||computedValue===null){computedValue=element.style[property];}
revertDisplay();}
if(computedValue==="auto"&&/^(top|right|bottom|left)$/i.test(property)){var position=computePropertyValue(element,"position");if(position==="fixed"||(position==="absolute"&&/top|left/i.test(property))){computedValue=$(element).position()[property]+"px";}}
return computedValue;}
var propertyValue;if(CSS.Hooks.registered[property]){var hook=property,hookRoot=CSS.Hooks.getRoot(hook);if(rootPropertyValue===undefined){rootPropertyValue=CSS.getPropertyValue(element,CSS.Names.prefixCheck(hookRoot)[0]);}
if(CSS.Normalizations.registered[hookRoot]){rootPropertyValue=CSS.Normalizations.registered[hookRoot]("extract",element,rootPropertyValue);}
propertyValue=CSS.Hooks.extractValue(hook,rootPropertyValue);}else if(CSS.Normalizations.registered[property]){var normalizedPropertyName,normalizedPropertyValue;normalizedPropertyName=CSS.Normalizations.registered[property]("name",element);if(normalizedPropertyName!=="transform"){normalizedPropertyValue=computePropertyValue(element,CSS.Names.prefixCheck(normalizedPropertyName)[0]);if(CSS.Values.isCSSNullValue(normalizedPropertyValue)&&CSS.Hooks.templates[property]){normalizedPropertyValue=CSS.Hooks.templates[property][1];}}
propertyValue=CSS.Normalizations.registered[property]("extract",element,normalizedPropertyValue);}
if(!/^[\d-]/.test(propertyValue)){if(Data(element)&&Data(element).isSVG&&CSS.Names.SVGAttribute(property)){if(/^(height|width)$/i.test(property)){propertyValue=element.getBBox()[property];}else{propertyValue=element.getAttribute(property);}}else{propertyValue=computePropertyValue(element,CSS.Names.prefixCheck(property)[0]);}}
if(CSS.Values.isCSSNullValue(propertyValue)){propertyValue=0;}
if(Velocity.debug>=2)console.log("Get "+property+": "+propertyValue);return propertyValue;},setPropertyValue:function(element,property,propertyValue,rootPropertyValue,scrollData){var propertyName=property;if(property==="scroll"){if(scrollData.container){scrollData.container["scroll"+scrollData.direction]=propertyValue;}else{if(scrollData.direction==="Left"){window.scrollTo(propertyValue,scrollData.alternateValue);}else{window.scrollTo(scrollData.alternateValue,propertyValue);}}}else{if(CSS.Normalizations.registered[property]&&CSS.Normalizations.registered[property]("name",element)==="transform"){CSS.Normalizations.registered[property]("inject",element,propertyValue);propertyName="transform";propertyValue=Data(element).transformCache[property];}else{if(CSS.Hooks.registered[property]){var hookName=property,hookRoot=CSS.Hooks.getRoot(property);rootPropertyValue=rootPropertyValue||CSS.getPropertyValue(element,hookRoot);propertyValue=CSS.Hooks.injectValue(hookName,propertyValue,rootPropertyValue);property=hookRoot;}
if(CSS.Normalizations.registered[property]){propertyValue=CSS.Normalizations.registered[property]("inject",element,propertyValue);property=CSS.Normalizations.registered[property]("name",element);}
propertyName=CSS.Names.prefixCheck(property)[0];if(IE<=8){try{element.style[propertyName]=propertyValue;}catch(error){if(Velocity.debug)console.log("Browser does not support ["+propertyValue+"] for ["+propertyName+"]");}}else if(Data(element)&&Data(element).isSVG&&CSS.Names.SVGAttribute(property)){element.setAttribute(property,propertyValue);}else{element.style[propertyName]=propertyValue;}
if(Velocity.debug>=2)console.log("Set "+property+" ("+propertyName+"): "+propertyValue);}}
return[propertyName,propertyValue];},flushTransformCache:function(element){var transformString="";if((IE||(Velocity.State.isAndroid&&!Velocity.State.isChrome))&&Data(element).isSVG){function getTransformFloat(transformProperty){return parseFloat(CSS.getPropertyValue(element,transformProperty));}
var SVGTransforms={translate:[getTransformFloat("translateX"),getTransformFloat("translateY")],skewX:[getTransformFloat("skewX")],skewY:[getTransformFloat("skewY")],scale:getTransformFloat("scale")!==1?[getTransformFloat("scale"),getTransformFloat("scale")]:[getTransformFloat("scaleX"),getTransformFloat("scaleY")],rotate:[getTransformFloat("rotateZ"),0,0]};$.each(Data(element).transformCache,function(transformName){if(/^translate/i.test(transformName)){transformName="translate";}else if(/^scale/i.test(transformName)){transformName="scale";}else if(/^rotate/i.test(transformName)){transformName="rotate";}
if(SVGTransforms[transformName]){transformString+=transformName+"("+SVGTransforms[transformName].join(" ")+")"+" ";delete SVGTransforms[transformName];}});}else{var transformValue,perspective;$.each(Data(element).transformCache,function(transformName){transformValue=Data(element).transformCache[transformName];if(transformName==="transformPerspective"){perspective=transformValue;return true;}
if(IE===9&&transformName==="rotateZ"){transformName="rotate";}
transformString+=transformName+transformValue+" ";});if(perspective){transformString="perspective"+perspective+" "+transformString;}}
CSS.setPropertyValue(element,"transform",transformString);}};CSS.Hooks.register();CSS.Normalizations.register();Velocity.hook=function(elements,arg2,arg3){var value=undefined;elements=sanitizeElements(elements);$.each(elements,function(i,element){if(Data(element)===undefined){Velocity.init(element);}
if(arg3===undefined){if(value===undefined){value=Velocity.CSS.getPropertyValue(element,arg2);}}else{var adjustedSet=Velocity.CSS.setPropertyValue(element,arg2,arg3);if(adjustedSet[0]==="transform"){Velocity.CSS.flushTransformCache(element);}
value=adjustedSet;}});return value;};var animate=function(){function getChain(){if(isUtility){return promiseData.promise||null;}else{return elementsWrapped;}}
var syntacticSugar=(arguments[0]&&(($.isPlainObject(arguments[0].properties)&&!arguments[0].properties.names)||Type.isString(arguments[0].properties))),isUtility,elementsWrapped,argumentIndex;var elements,propertiesMap,options;if(Type.isWrapped(this)){isUtility=false;argumentIndex=0;elements=this;elementsWrapped=this;}else{isUtility=true;argumentIndex=1;elements=syntacticSugar?arguments[0].elements:arguments[0];}
elements=sanitizeElements(elements);if(!elements){return;}
if(syntacticSugar){propertiesMap=arguments[0].properties;options=arguments[0].options;}else{propertiesMap=arguments[argumentIndex];options=arguments[argumentIndex+1];}
var elementsLength=elements.length,elementsIndex=0;if(propertiesMap!=="stop"&&!$.isPlainObject(options)){var startingArgumentPosition=argumentIndex+1;options={};for(var i=startingArgumentPosition;i<arguments.length;i++){if(!Type.isArray(arguments[i])&&(/^(fast|normal|slow)$/i.test(arguments[i])||/^\d/.test(arguments[i]))){options.duration=arguments[i];}else if(Type.isString(arguments[i])||Type.isArray(arguments[i])){options.easing=arguments[i];}else if(Type.isFunction(arguments[i])){options.complete=arguments[i];}}}
var promiseData={promise:null,resolver:null,rejecter:null};if(isUtility&&Velocity.Promise){promiseData.promise=new Velocity.Promise(function(resolve,reject){promiseData.resolver=resolve;promiseData.rejecter=reject;});}
var action;switch(propertiesMap){case"scroll":action="scroll";break;case"reverse":action="reverse";break;case"stop":$.each(elements,function(i,element){if(Data(element)&&Data(element).delayTimer){clearTimeout(Data(element).delayTimer.setTimeout);if(Data(element).delayTimer.next){Data(element).delayTimer.next();}
delete Data(element).delayTimer;}});var callsToStop=[];$.each(Velocity.State.calls,function(i,activeCall){if(activeCall){$.each(activeCall[1],function(k,activeElement){var queueName=Type.isString(options)?options:"";if(options!==undefined&&activeCall[2].queue!==queueName){return true;}
$.each(elements,function(l,element){if(element===activeElement){if(options!==undefined){$.each($.queue(element,queueName),function(_,item){if(Type.isFunction(item)){item(null,true);}});$.queue(element,queueName,[]);}
if(Data(element)&&queueName===""){$.each(Data(element).tweensContainer,function(m,activeTween){activeTween.endValue=activeTween.currentValue;});}
callsToStop.push(i);}});});}});$.each(callsToStop,function(i,j){completeCall(j,true);});if(promiseData.promise){promiseData.resolver(elements);}
return getChain();default:if($.isPlainObject(propertiesMap)&&!Type.isEmptyObject(propertiesMap)){action="start";}else if(Type.isString(propertiesMap)&&Velocity.Redirects[propertiesMap]){var opts=$.extend({},options),durationOriginal=opts.duration,delayOriginal=opts.delay||0;if(opts.backwards===true){elements=$.extend(true,[],elements).reverse();}
$.each(elements,function(elementIndex,element){if(parseFloat(opts.stagger)){opts.delay=delayOriginal+(parseFloat(opts.stagger)*elementIndex);}else if(Type.isFunction(opts.stagger)){opts.delay=delayOriginal+opts.stagger.call(element,elementIndex,elementsLength);}
if(opts.drag){opts.duration=parseFloat(durationOriginal)||(/^(callout|transition)/.test(propertiesMap)?1000:DURATION_DEFAULT);opts.duration=Math.max(opts.duration*(opts.backwards?1-elementIndex/elementsLength:(elementIndex+1)/elementsLength),opts.duration*0.75,200);}
Velocity.Redirects[propertiesMap].call(element,element,opts||{},elementIndex,elementsLength,elements,promiseData.promise?promiseData:undefined);});return getChain();}else{var abortError="Velocity: First argument ("+propertiesMap+") was not a property map, a known action, or a registered redirect. Aborting.";if(promiseData.promise){promiseData.rejecter(new Error(abortError));}else{console.log(abortError);}
return getChain();}}
var callUnitConversionData={lastParent:null,lastPosition:null,lastFontSize:null,lastPercentToPxWidth:null,lastPercentToPxHeight:null,lastEmToPx:null,remToPx:null,vwToPx:null,vhToPx:null};var call=[];function processElement(){var element=this,opts=$.extend({},Velocity.defaults,options),tweensContainer={},elementUnitConversionData;if(Data(element)===undefined){Velocity.init(element);}
if(parseFloat(opts.delay)&&opts.queue!==false){$.queue(element,opts.queue,function(next){Velocity.velocityQueueEntryFlag=true;Data(element).delayTimer={setTimeout:setTimeout(next,parseFloat(opts.delay)),next:next};});}
switch(opts.duration.toString().toLowerCase()){case"fast":opts.duration=200;break;case"normal":opts.duration=DURATION_DEFAULT;break;case"slow":opts.duration=600;break;default:opts.duration=parseFloat(opts.duration)||1;}
if(Velocity.mock!==false){if(Velocity.mock===true){opts.duration=opts.delay=1;}else{opts.duration*=parseFloat(Velocity.mock)||1;opts.delay*=parseFloat(Velocity.mock)||1;}}
opts.easing=getEasing(opts.easing,opts.duration);if(opts.begin&&!Type.isFunction(opts.begin)){opts.begin=null;}
if(opts.progress&&!Type.isFunction(opts.progress)){opts.progress=null;}
if(opts.complete&&!Type.isFunction(opts.complete)){opts.complete=null;}
if(opts.display!==undefined&&opts.display!==null){opts.display=opts.display.toString().toLowerCase();if(opts.display==="auto"){opts.display=Velocity.CSS.Values.getDisplayType(element);}}
if(opts.visibility!==undefined&&opts.visibility!==null){opts.visibility=opts.visibility.toString().toLowerCase();}
opts.mobileHA=(opts.mobileHA&&Velocity.State.isMobile&&!Velocity.State.isGingerbread);function buildQueue(next){if(opts.begin&&elementsIndex===0){try{opts.begin.call(elements,elements);}catch(error){setTimeout(function(){throw error;},1);}}
if(action==="scroll"){var scrollDirection=(/^x$/i.test(opts.axis)?"Left":"Top"),scrollOffset=parseFloat(opts.offset)||0,scrollPositionCurrent,scrollPositionCurrentAlternate,scrollPositionEnd;if(opts.container){if(Type.isWrapped(opts.container)||Type.isNode(opts.container)){opts.container=opts.container[0]||opts.container;scrollPositionCurrent=opts.container["scroll"+scrollDirection];scrollPositionEnd=(scrollPositionCurrent+$(element).position()[scrollDirection.toLowerCase()])+scrollOffset;}else{opts.container=null;}}else{scrollPositionCurrent=Velocity.State.scrollAnchor[Velocity.State["scrollProperty"+scrollDirection]];scrollPositionCurrentAlternate=Velocity.State.scrollAnchor[Velocity.State["scrollProperty"+(scrollDirection==="Left"?"Top":"Left")]];scrollPositionEnd=$(element).offset()[scrollDirection.toLowerCase()]+scrollOffset;}
tweensContainer={scroll:{rootPropertyValue:false,startValue:scrollPositionCurrent,currentValue:scrollPositionCurrent,endValue:scrollPositionEnd,unitType:"",easing:opts.easing,scrollData:{container:opts.container,direction:scrollDirection,alternateValue:scrollPositionCurrentAlternate}},element:element};if(Velocity.debug)console.log("tweensContainer (scroll): ",tweensContainer.scroll,element);}else if(action==="reverse"){if(!Data(element).tweensContainer){$.dequeue(element,opts.queue);return;}else{if(Data(element).opts.display==="none"){Data(element).opts.display="auto";}
if(Data(element).opts.visibility==="hidden"){Data(element).opts.visibility="visible";}
Data(element).opts.loop=false;Data(element).opts.begin=null;Data(element).opts.complete=null;if(!options.easing){delete opts.easing;}
if(!options.duration){delete opts.duration;}
opts=$.extend({},Data(element).opts,opts);var lastTweensContainer=$.extend(true,{},Data(element).tweensContainer);for(var lastTween in lastTweensContainer){if(lastTween!=="element"){var lastStartValue=lastTweensContainer[lastTween].startValue;lastTweensContainer[lastTween].startValue=lastTweensContainer[lastTween].currentValue=lastTweensContainer[lastTween].endValue;lastTweensContainer[lastTween].endValue=lastStartValue;if(!Type.isEmptyObject(options)){lastTweensContainer[lastTween].easing=opts.easing;}
if(Velocity.debug)console.log("reverse tweensContainer ("+lastTween+"): "+JSON.stringify(lastTweensContainer[lastTween]),element);}}
tweensContainer=lastTweensContainer;}}else if(action==="start"){var lastTweensContainer;if(Data(element).tweensContainer&&Data(element).isAnimating===true){lastTweensContainer=Data(element).tweensContainer;}
function parsePropertyValue(valueData,skipResolvingEasing){var endValue=undefined,easing=undefined,startValue=undefined;if(Type.isArray(valueData)){endValue=valueData[0];if((!Type.isArray(valueData[1])&&/^[\d-]/.test(valueData[1]))||Type.isFunction(valueData[1])||CSS.RegEx.isHex.test(valueData[1])){startValue=valueData[1];}else if((Type.isString(valueData[1])&&!CSS.RegEx.isHex.test(valueData[1]))||Type.isArray(valueData[1])){easing=skipResolvingEasing?valueData[1]:getEasing(valueData[1],opts.duration);if(valueData[2]!==undefined){startValue=valueData[2];}}}else{endValue=valueData;}
if(!skipResolvingEasing){easing=easing||opts.easing;}
if(Type.isFunction(endValue)){endValue=endValue.call(element,elementsIndex,elementsLength);}
if(Type.isFunction(startValue)){startValue=startValue.call(element,elementsIndex,elementsLength);}
return[endValue||0,easing,startValue];}
$.each(propertiesMap,function(property,value){if(RegExp("^"+CSS.Lists.colors.join("$|^")+"$").test(property)){var valueData=parsePropertyValue(value,true),endValue=valueData[0],easing=valueData[1],startValue=valueData[2];if(CSS.RegEx.isHex.test(endValue)){var colorComponents=["Red","Green","Blue"],endValueRGB=CSS.Values.hexToRgb(endValue),startValueRGB=startValue?CSS.Values.hexToRgb(startValue):undefined;for(var i=0;i<colorComponents.length;i++){var dataArray=[endValueRGB[i]];if(easing){dataArray.push(easing);}
if(startValueRGB!==undefined){dataArray.push(startValueRGB[i]);}
propertiesMap[property+colorComponents[i]]=dataArray;}
delete propertiesMap[property];}}});for(var property in propertiesMap){var valueData=parsePropertyValue(propertiesMap[property]),endValue=valueData[0],easing=valueData[1],startValue=valueData[2];property=CSS.Names.camelCase(property);var rootProperty=CSS.Hooks.getRoot(property),rootPropertyValue=false;if(!Data(element).isSVG&&CSS.Names.prefixCheck(rootProperty)[1]===false&&CSS.Normalizations.registered[rootProperty]===undefined){if(Velocity.debug)console.log("Skipping ["+rootProperty+"] due to a lack of browser support.");continue;}
if(((opts.display!==undefined&&opts.display!==null&&opts.display!=="none")||(opts.visibility!==undefined&&opts.visibility!=="hidden"))&&/opacity|filter/.test(property)&&!startValue&&endValue!==0){startValue=0;}
if(opts._cacheValues&&lastTweensContainer&&lastTweensContainer[property]){if(startValue===undefined){startValue=lastTweensContainer[property].endValue+lastTweensContainer[property].unitType;}
rootPropertyValue=Data(element).rootPropertyValueCache[rootProperty];}else{if(CSS.Hooks.registered[property]){if(startValue===undefined){rootPropertyValue=CSS.getPropertyValue(element,rootProperty);startValue=CSS.getPropertyValue(element,property,rootPropertyValue);}else{rootPropertyValue=CSS.Hooks.templates[rootProperty][1];}}else if(startValue===undefined){startValue=CSS.getPropertyValue(element,property);}}
var separatedValue,endValueUnitType,startValueUnitType,operator=false;function separateValue(property,value){var unitType,numericValue;numericValue=(value||"0").toString().toLowerCase().replace(/[%A-z]+$/,function(match){unitType=match;return"";});if(!unitType){unitType=CSS.Values.getUnitType(property);}
return[numericValue,unitType];}
separatedValue=separateValue(property,startValue);startValue=separatedValue[0];startValueUnitType=separatedValue[1];separatedValue=separateValue(property,endValue);endValue=separatedValue[0].replace(/^([+-\/*])=/,function(match,subMatch){operator=subMatch;return"";});endValueUnitType=separatedValue[1];startValue=parseFloat(startValue)||0;endValue=parseFloat(endValue)||0;if(endValueUnitType==="%"){if(/^(fontSize|lineHeight)$/.test(property)){endValue=endValue/100;endValueUnitType="em";}else if(/^scale/.test(property)){endValue=endValue/100;endValueUnitType="";}else if(/(Red|Green|Blue)$/i.test(property)){endValue=(endValue/100)*255;endValueUnitType="";}}
function calculateUnitRatios(){var sameRatioIndicators={myParent:element.parentNode||document.body,position:CSS.getPropertyValue(element,"position"),fontSize:CSS.getPropertyValue(element,"fontSize")},samePercentRatio=((sameRatioIndicators.position===callUnitConversionData.lastPosition)&&(sameRatioIndicators.myParent===callUnitConversionData.lastParent)),sameEmRatio=(sameRatioIndicators.fontSize===callUnitConversionData.lastFontSize);callUnitConversionData.lastParent=sameRatioIndicators.myParent;callUnitConversionData.lastPosition=sameRatioIndicators.position;callUnitConversionData.lastFontSize=sameRatioIndicators.fontSize;var measurement=100,unitRatios={};if(!sameEmRatio||!samePercentRatio){var dummy=Data(element).isSVG?document.createElementNS("http://www.w3.org/2000/svg","rect"):document.createElement("div");Velocity.init(dummy);sameRatioIndicators.myParent.appendChild(dummy);$.each(["overflow","overflowX","overflowY"],function(i,property){Velocity.CSS.setPropertyValue(dummy,property,"hidden");});Velocity.CSS.setPropertyValue(dummy,"position",sameRatioIndicators.position);Velocity.CSS.setPropertyValue(dummy,"fontSize",sameRatioIndicators.fontSize);Velocity.CSS.setPropertyValue(dummy,"boxSizing","content-box");$.each(["minWidth","maxWidth","width","minHeight","maxHeight","height"],function(i,property){Velocity.CSS.setPropertyValue(dummy,property,measurement+"%");});Velocity.CSS.setPropertyValue(dummy,"paddingLeft",measurement+"em");unitRatios.percentToPxWidth=callUnitConversionData.lastPercentToPxWidth=(parseFloat(CSS.getPropertyValue(dummy,"width",null,true))||1)/measurement;unitRatios.percentToPxHeight=callUnitConversionData.lastPercentToPxHeight=(parseFloat(CSS.getPropertyValue(dummy,"height",null,true))||1)/measurement;unitRatios.emToPx=callUnitConversionData.lastEmToPx=(parseFloat(CSS.getPropertyValue(dummy,"paddingLeft"))||1)/measurement;sameRatioIndicators.myParent.removeChild(dummy);}else{unitRatios.emToPx=callUnitConversionData.lastEmToPx;unitRatios.percentToPxWidth=callUnitConversionData.lastPercentToPxWidth;unitRatios.percentToPxHeight=callUnitConversionData.lastPercentToPxHeight;}
if(callUnitConversionData.remToPx===null){callUnitConversionData.remToPx=parseFloat(CSS.getPropertyValue(document.body,"fontSize"))||16;}
if(callUnitConversionData.vwToPx===null){callUnitConversionData.vwToPx=parseFloat(window.innerWidth)/100;callUnitConversionData.vhToPx=parseFloat(window.innerHeight)/100;}
unitRatios.remToPx=callUnitConversionData.remToPx;unitRatios.vwToPx=callUnitConversionData.vwToPx;unitRatios.vhToPx=callUnitConversionData.vhToPx;if(Velocity.debug>=1)console.log("Unit ratios: "+JSON.stringify(unitRatios),element);return unitRatios;}
if(/[\/*]/.test(operator)){endValueUnitType=startValueUnitType;}else if((startValueUnitType!==endValueUnitType)&&startValue!==0){if(endValue===0){endValueUnitType=startValueUnitType;}else{elementUnitConversionData=elementUnitConversionData||calculateUnitRatios();var axis=(/margin|padding|left|right|width|text|word|letter/i.test(property)||/X$/.test(property)||property==="x")?"x":"y";switch(startValueUnitType){case"%":startValue*=(axis==="x"?elementUnitConversionData.percentToPxWidth:elementUnitConversionData.percentToPxHeight);break;case"px":break;default:startValue*=elementUnitConversionData[startValueUnitType+"ToPx"];}
switch(endValueUnitType){case"%":startValue*=1/(axis==="x"?elementUnitConversionData.percentToPxWidth:elementUnitConversionData.percentToPxHeight);break;case"px":break;default:startValue*=1/elementUnitConversionData[endValueUnitType+"ToPx"];}}}
switch(operator){case"+":endValue=startValue+endValue;break;case"-":endValue=startValue-endValue;break;case"*":endValue=startValue*endValue;break;case"/":endValue=startValue/endValue;break;}
tweensContainer[property]={rootPropertyValue:rootPropertyValue,startValue:startValue,currentValue:startValue,endValue:endValue,unitType:endValueUnitType,easing:easing};if(Velocity.debug)console.log("tweensContainer ("+property+"): "+JSON.stringify(tweensContainer[property]),element);}
tweensContainer.element=element;}
if(tweensContainer.element){CSS.Values.addClass(element,"velocity-animating");call.push(tweensContainer);if(opts.queue===""){Data(element).tweensContainer=tweensContainer;Data(element).opts=opts;}
Data(element).isAnimating=true;if(elementsIndex===elementsLength-1){if(Velocity.State.calls.length>10000){Velocity.State.calls=compactSparseArray(Velocity.State.calls);}
Velocity.State.calls.push([call,elements,opts,null,promiseData.resolver]);if(Velocity.State.isTicking===false){Velocity.State.isTicking=true;tick();}}else{elementsIndex++;}}}
if(opts.queue===false){if(opts.delay){setTimeout(buildQueue,opts.delay);}else{buildQueue();}}else{$.queue(element,opts.queue,function(next,clearQueue){if(clearQueue===true){if(promiseData.promise){promiseData.resolver(elements);}
return true;}
Velocity.velocityQueueEntryFlag=true;buildQueue(next);});}
if((opts.queue===""||opts.queue==="fx")&&$.queue(element)[0]!=="inprogress"){$.dequeue(element);}}
$.each(elements,function(i,element){if(Type.isNode(element)){processElement.call(element);}});var opts=$.extend({},Velocity.defaults,options),reverseCallsCount;opts.loop=parseInt(opts.loop);reverseCallsCount=(opts.loop*2)-1;if(opts.loop){for(var x=0;x<reverseCallsCount;x++){var reverseOptions={delay:opts.delay,progress:opts.progress};if(x===reverseCallsCount-1){reverseOptions.display=opts.display;reverseOptions.visibility=opts.visibility;reverseOptions.complete=opts.complete;}
animate(elements,"reverse",reverseOptions);}}
return getChain();};Velocity=$.extend(animate,Velocity);Velocity.animate=animate;var ticker=window.requestAnimationFrame||rAFShim;if(!Velocity.State.isMobile&&document.hidden!==undefined){document.addEventListener("visibilitychange",function(){if(document.hidden){ticker=function(callback){return setTimeout(function(){callback(true)},16);};tick();}else{ticker=window.requestAnimationFrame||rAFShim;}});}
function tick(timestamp){if(timestamp){var timeCurrent=(new Date).getTime();for(var i=0,callsLength=Velocity.State.calls.length;i<callsLength;i++){if(!Velocity.State.calls[i]){continue;}
var callContainer=Velocity.State.calls[i],call=callContainer[0],opts=callContainer[2],timeStart=callContainer[3],firstTick=!!timeStart;if(!timeStart){timeStart=Velocity.State.calls[i][3]=timeCurrent-16;}
var percentComplete=Math.min((timeCurrent-timeStart)/opts.duration,1);for(var j=0,callLength=call.length;j<callLength;j++){var tweensContainer=call[j],element=tweensContainer.element;if(!Data(element)){continue;}
var transformPropertyExists=false;if(opts.display!==undefined&&opts.display!==null&&opts.display!=="none"){if(opts.display==="flex"){var flexValues=["-webkit-box","-moz-box","-ms-flexbox","-webkit-flex"];$.each(flexValues,function(i,flexValue){CSS.setPropertyValue(element,"display",flexValue);});}
CSS.setPropertyValue(element,"display",opts.display);}
if(opts.visibility!==undefined&&opts.visibility!=="hidden"){CSS.setPropertyValue(element,"visibility",opts.visibility);}
for(var property in tweensContainer){if(property!=="element"){var tween=tweensContainer[property],currentValue,easing=Type.isString(tween.easing)?Velocity.Easings[tween.easing]:tween.easing;if(percentComplete===1){currentValue=tween.endValue;}else{currentValue=tween.startValue+((tween.endValue-tween.startValue)*easing(percentComplete));if(!firstTick&&(currentValue===tween.currentValue)){continue;}}
tween.currentValue=currentValue;if(CSS.Hooks.registered[property]){var hookRoot=CSS.Hooks.getRoot(property),rootPropertyValueCache=Data(element).rootPropertyValueCache[hookRoot];if(rootPropertyValueCache){tween.rootPropertyValue=rootPropertyValueCache;}}
var adjustedSetData=CSS.setPropertyValue(element,property,tween.currentValue+(parseFloat(currentValue)===0?"":tween.unitType),tween.rootPropertyValue,tween.scrollData);if(CSS.Hooks.registered[property]){if(CSS.Normalizations.registered[hookRoot]){Data(element).rootPropertyValueCache[hookRoot]=CSS.Normalizations.registered[hookRoot]("extract",null,adjustedSetData[1]);}else{Data(element).rootPropertyValueCache[hookRoot]=adjustedSetData[1];}}
if(adjustedSetData[0]==="transform"){transformPropertyExists=true;}}}
if(opts.mobileHA){if(Data(element).transformCache.translate3d===undefined){Data(element).transformCache.translate3d="(0px, 0px, 0px)";transformPropertyExists=true;}}
if(transformPropertyExists){CSS.flushTransformCache(element);}}
if(opts.display!==undefined&&opts.display!=="none"){Velocity.State.calls[i][2].display=false;}
if(opts.visibility!==undefined&&opts.visibility!=="hidden"){Velocity.State.calls[i][2].visibility=false;}
if(opts.progress){opts.progress.call(callContainer[1],callContainer[1],percentComplete,Math.max(0,(timeStart+opts.duration)-timeCurrent),timeStart);}
if(percentComplete===1){completeCall(i);}}}
if(Velocity.State.isTicking){ticker(tick);}}
function completeCall(callIndex,isStopped){if(!Velocity.State.calls[callIndex]){return false;}
var call=Velocity.State.calls[callIndex][0],elements=Velocity.State.calls[callIndex][1],opts=Velocity.State.calls[callIndex][2],resolver=Velocity.State.calls[callIndex][4];var remainingCallsExist=false;for(var i=0,callLength=call.length;i<callLength;i++){var element=call[i].element;if(!isStopped&&!opts.loop){if(opts.display==="none"){CSS.setPropertyValue(element,"display",opts.display);}
if(opts.visibility==="hidden"){CSS.setPropertyValue(element,"visibility",opts.visibility);}}
if(opts.loop!==true&&($.queue(element)[1]===undefined||!/\.velocityQueueEntryFlag/i.test($.queue(element)[1]))){if(Data(element)){Data(element).isAnimating=false;Data(element).rootPropertyValueCache={};var transformHAPropertyExists=false;$.each(CSS.Lists.transforms3D,function(i,transformName){var defaultValue=/^scale/.test(transformName)?1:0,currentValue=Data(element).transformCache[transformName];if(Data(element).transformCache[transformName]!==undefined&&new RegExp("^\\("+defaultValue+"[^.]").test(currentValue)){transformHAPropertyExists=true;delete Data(element).transformCache[transformName];}});if(opts.mobileHA){transformHAPropertyExists=true;delete Data(element).transformCache.translate3d;}
if(transformHAPropertyExists){CSS.flushTransformCache(element);}
CSS.Values.removeClass(element,"velocity-animating");}}
if(!isStopped&&opts.complete&&!opts.loop&&(i===callLength-1)){try{opts.complete.call(elements,elements);}catch(error){setTimeout(function(){throw error;},1);}}
if(resolver&&opts.loop!==true){resolver(elements);}
if(opts.loop===true&&!isStopped){$.each(Data(element).tweensContainer,function(propertyName,tweenContainer){if(/^rotate/.test(propertyName)&&parseFloat(tweenContainer.endValue)===360){tweenContainer.endValue=0;tweenContainer.startValue=360;}});Velocity(element,"reverse",{loop:true,delay:opts.delay});}
if(opts.queue!==false){$.dequeue(element,opts.queue);}}
Velocity.State.calls[callIndex]=false;for(var j=0,callsLength=Velocity.State.calls.length;j<callsLength;j++){if(Velocity.State.calls[j]!==false){remainingCallsExist=true;break;}}
if(remainingCallsExist===false){Velocity.State.isTicking=false;delete Velocity.State.calls;Velocity.State.calls=[];}}
global.Velocity=Velocity;if(global!==window){global.fn.velocity=animate;global.fn.velocity.defaults=Velocity.defaults;}
$.each(["Down","Up"],function(i,direction){Velocity.Redirects["slide"+direction]=function(element,options,elementsIndex,elementsSize,elements,promiseData){var opts=$.extend({},options),begin=opts.begin,complete=opts.complete,computedValues={height:"",marginTop:"",marginBottom:"",paddingTop:"",paddingBottom:""},inlineValues={};if(opts.display===undefined){opts.display=(direction==="Down"?(Velocity.CSS.Values.getDisplayType(element)==="inline"?"inline-block":"block"):"none");}
opts.begin=function(){begin&&begin.call(elements,elements);for(var property in computedValues){inlineValues[property]=element.style[property];var propertyValue=Velocity.CSS.getPropertyValue(element,property);computedValues[property]=(direction==="Down")?[propertyValue,0]:[0,propertyValue];}
inlineValues.overflow=element.style.overflow;element.style.overflow="hidden";}
opts.complete=function(){for(var property in inlineValues){element.style[property]=inlineValues[property];}
complete&&complete.call(elements,elements);promiseData&&promiseData.resolver(elements);};Velocity(element,computedValues,opts);};});$.each(["In","Out"],function(i,direction){Velocity.Redirects["fade"+direction]=function(element,options,elementsIndex,elementsSize,elements,promiseData){var opts=$.extend({},options),propertiesMap={opacity:(direction==="In")?1:0},originalComplete=opts.complete;if(elementsIndex!==elementsSize-1){opts.complete=opts.begin=null;}else{opts.complete=function(){if(originalComplete){originalComplete.call(elements,elements);}
promiseData&&promiseData.resolver(elements);}}
if(opts.display===undefined){opts.display=(direction==="In"?"auto":"none");}
Velocity(this,propertiesMap,opts);};});return Velocity;}((window.jQuery||window.Zepto||window),window,document);}));(function(module){if(typeof define==='function'&&define.amd){define('jquery.event.move',['jquery'],module);}else{module(jQuery);}})(function(jQuery,undefined){var
threshold=6,add=jQuery.event.add,remove=jQuery.event.remove,trigger=function(node,type,data){jQuery.event.trigger(type,data,node);},requestFrame=(function(){return(window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(fn,element){return window.setTimeout(function(){fn();},25);});})(),ignoreTags={textarea:true,input:true,select:true,button:true},mouseevents={move:'mousemove',cancel:'mouseup dragstart',end:'mouseup'},touchevents={move:'touchmove',cancel:'touchend',end:'touchend'};function Timer(fn){var callback=fn,active=false,running=false;function trigger(time){if(active){callback();requestFrame(trigger);running=true;active=false;}
else{running=false;}}
this.kick=function(fn){active=true;if(!running){trigger();}};this.end=function(fn){var cb=callback;if(!fn){return;}
if(!running){fn();}
else{callback=active?function(){cb();fn();}:fn;active=true;}};}
function returnTrue(){return true;}
function returnFalse(){return false;}
function preventDefault(e){e.preventDefault();}
function preventIgnoreTags(e){if(ignoreTags[e.target.tagName.toLowerCase()]){return;}
e.preventDefault();}
function isLeftButton(e){return(e.which===1&&!e.ctrlKey&&!e.altKey);}
function identifiedTouch(touchList,id){var i,l;if(touchList.identifiedTouch){return touchList.identifiedTouch(id);}
i=-1;l=touchList.length;while(++i<l){if(touchList[i].identifier===id){return touchList[i];}}}
function changedTouch(e,event){var touch=identifiedTouch(e.changedTouches,event.identifier);if(!touch){return;}
if(touch.pageX===event.pageX&&touch.pageY===event.pageY){return;}
return touch;}
function mousedown(e){var data;if(!isLeftButton(e)){return;}
data={target:e.target,startX:e.pageX,startY:e.pageY,timeStamp:e.timeStamp};add(document,mouseevents.move,mousemove,data);add(document,mouseevents.cancel,mouseend,data);}
function mousemove(e){var data=e.data;checkThreshold(e,data,e,removeMouse);}
function mouseend(e){removeMouse();}
function removeMouse(){remove(document,mouseevents.move,mousemove);remove(document,mouseevents.cancel,mouseend);}
function touchstart(e){var touch,template;if(ignoreTags[e.target.tagName.toLowerCase()]){return;}
touch=e.changedTouches[0];template={target:touch.target,startX:touch.pageX,startY:touch.pageY,timeStamp:e.timeStamp,identifier:touch.identifier};add(document,touchevents.move+'.'+touch.identifier,touchmove,template);add(document,touchevents.cancel+'.'+touch.identifier,touchend,template);}
function touchmove(e){var data=e.data,touch=changedTouch(e,data);if(!touch){return;}
checkThreshold(e,data,touch,removeTouch);}
function touchend(e){var template=e.data,touch=identifiedTouch(e.changedTouches,template.identifier);if(!touch){return;}
removeTouch(template.identifier);}
function removeTouch(identifier){remove(document,'.'+identifier,touchmove);remove(document,'.'+identifier,touchend);}
function checkThreshold(e,template,touch,fn){var distX=touch.pageX-template.startX,distY=touch.pageY-template.startY;if((distX*distX)+(distY*distY)<(threshold*threshold)){return;}
triggerStart(e,template,touch,distX,distY,fn);}
function handled(){this._handled=returnTrue;return false;}
function flagAsHandled(e){e._handled();}
function triggerStart(e,template,touch,distX,distY,fn){var node=template.target,touches,time;touches=e.targetTouches;time=e.timeStamp-template.timeStamp;template.type='movestart';template.distX=distX;template.distY=distY;template.deltaX=distX;template.deltaY=distY;template.pageX=touch.pageX;template.pageY=touch.pageY;template.velocityX=distX/time;template.velocityY=distY/time;template.targetTouches=touches;template.finger=touches?touches.length:1;template._handled=handled;template._preventTouchmoveDefault=function(){e.preventDefault();};trigger(template.target,template);fn(template.identifier);}
function activeMousemove(e){var timer=e.data.timer;e.data.touch=e;e.data.timeStamp=e.timeStamp;timer.kick();}
function activeMouseend(e){var event=e.data.event,timer=e.data.timer;removeActiveMouse();endEvent(event,timer,function(){setTimeout(function(){remove(event.target,'click',returnFalse);},0);});}
function removeActiveMouse(event){remove(document,mouseevents.move,activeMousemove);remove(document,mouseevents.end,activeMouseend);}
function activeTouchmove(e){var event=e.data.event,timer=e.data.timer,touch=changedTouch(e,event);if(!touch){return;}
e.preventDefault();event.targetTouches=e.targetTouches;e.data.touch=touch;e.data.timeStamp=e.timeStamp;timer.kick();}
function activeTouchend(e){var event=e.data.event,timer=e.data.timer,touch=identifiedTouch(e.changedTouches,event.identifier);if(!touch){return;}
removeActiveTouch(event);endEvent(event,timer);}
function removeActiveTouch(event){remove(document,'.'+event.identifier,activeTouchmove);remove(document,'.'+event.identifier,activeTouchend);}
function updateEvent(event,touch,timeStamp,timer){var time=timeStamp-event.timeStamp;event.type='move';event.distX=touch.pageX-event.startX;event.distY=touch.pageY-event.startY;event.deltaX=touch.pageX-event.pageX;event.deltaY=touch.pageY-event.pageY;event.velocityX=0.3*event.velocityX+0.7*event.deltaX/time;event.velocityY=0.3*event.velocityY+0.7*event.deltaY/time;event.pageX=touch.pageX;event.pageY=touch.pageY;}
function endEvent(event,timer,fn){timer.end(function(){event.type='moveend';trigger(event.target,event);return fn&&fn();});}
function setup(data,namespaces,eventHandle){add(this,'movestart.move',flagAsHandled);return true;}
function teardown(namespaces){remove(this,'dragstart drag',preventDefault);remove(this,'mousedown touchstart',preventIgnoreTags);remove(this,'movestart',flagAsHandled);return true;}
function addMethod(handleObj){if(handleObj.namespace==="move"||handleObj.namespace==="moveend"){return;}
add(this,'dragstart.'+handleObj.guid+' drag.'+handleObj.guid,preventDefault,undefined,handleObj.selector);add(this,'mousedown.'+handleObj.guid,preventIgnoreTags,undefined,handleObj.selector);}
function removeMethod(handleObj){if(handleObj.namespace==="move"||handleObj.namespace==="moveend"){return;}
remove(this,'dragstart.'+handleObj.guid+' drag.'+handleObj.guid);remove(this,'mousedown.'+handleObj.guid);}
jQuery.event.special.movestart={setup:setup,teardown:teardown,add:addMethod,remove:removeMethod,_default:function(e){var event,data;if(!e._handled()){return;}
function update(time){updateEvent(event,data.touch,data.timeStamp);trigger(e.target,event);}
event={target:e.target,startX:e.startX,startY:e.startY,pageX:e.pageX,pageY:e.pageY,distX:e.distX,distY:e.distY,deltaX:e.deltaX,deltaY:e.deltaY,velocityX:e.velocityX,velocityY:e.velocityY,timeStamp:e.timeStamp,identifier:e.identifier,targetTouches:e.targetTouches,finger:e.finger};data={event:event,timer:new Timer(update),touch:undefined,timeStamp:undefined};if(e.identifier===undefined){add(e.target,'click',returnFalse);add(document,mouseevents.move,activeMousemove,data);add(document,mouseevents.end,activeMouseend,data);}
else{e._preventTouchmoveDefault();add(document,touchevents.move+'.'+e.identifier,activeTouchmove,data);add(document,touchevents.end+'.'+e.identifier,activeTouchend,data);}}};jQuery.event.special.move={setup:function(){add(this,'movestart.move',jQuery.noop);},teardown:function(){remove(this,'movestart.move',jQuery.noop);}};jQuery.event.special.moveend={setup:function(){add(this,'movestart.moveend',jQuery.noop);},teardown:function(){remove(this,'movestart.moveend',jQuery.noop);}};add(document,'mousedown.move',mousedown);add(document,'touchstart.move',touchstart);if(typeof Array.prototype.indexOf==='function'){(function(jQuery,undefined){var props=["changedTouches","targetTouches"],l=props.length;while(l--){if(jQuery.event.props.indexOf(props[l])===-1){jQuery.event.props.push(props[l]);}}})(jQuery);};});define('fc/async_load_module',['jquery'],function($){var to_load=window.async_js_to_load;if($.isArray(to_load)){for(var i=0;i<to_load.length;i++){require(to_load[i][0],to_load[i][1]);}}
window.async_js_to_load={};window.async_js_to_load.push=function(to_load){require(to_load[0],to_load[1]);};});define('fc/utils',['jquery','urls','base64'],function($,urls,base64){var module={};module.setCsRfHeader=(function(){function sameOrigin(url){"use strict";var host=document.location.host;var protocol=document.location.protocol;var sr_origin='//'+host;var origin=protocol+sr_origin;return(url==origin||url.slice(0,origin.length+1)==origin
+'/')||(url==sr_origin||url.slice(0,sr_origin.length+1)==sr_origin+'/')||!(/^(\/\/|http:|https:).*/.test(url));}
function safeMethod(method){"use strict";return(/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));}
function init(){$(document).ajaxSend(function(event,xhr,settings){"use strict";if(!safeMethod(settings.type)&&sameOrigin(settings.url)){xhr.setRequestHeader("X-CSRFToken",module.cookie.get('csrftoken'));}});}
return{'init':init}}());module.cookie=(function(){function set(name,value,expire){if(!expire){expire=new Date();expire.setTime(expire.getTime()+3600000*24);}
document.cookie=name+"="+escape(value)+";expires="
+expire.toGMTString()+";path=/";}
function get(name){var cookieValue=null;if(document.cookie&&document.cookie!==''){var cookies=document.cookie.split(';');for(var i=0;i<cookies.length;i++){var cookie=jQuery.trim(cookies[i]);if(cookie.substring(0,name.length+1)==(name+'=')){return decodeURIComponent(cookie.substring(name.length+1));}}}
return false;}
return{'set':function(name,value,expire){set(name,value,expire);},'get':function(name){return get(name);}}}());module.getCaretPosition=function(field){var iCaretPos=0;if(field[0].selectionStart||field[0].selectionStart=='0'){iCaretPos=field[0].selectionStart;}
return iCaretPos;}
module.setCaretPosition=function(field,iCaretPos){if(field[0].selectionStart||field[0].selectionStart=='0'){field[0].selectionStart=iCaretPos;field[0].selectionEnd=iCaretPos;}}
module.urls=(function(){function _missing_params(path){var re=new RegExp('<>','g');var args=[];var match;var i=0;while(match=re.exec(path)){args.push(i);i++;}
re=new RegExp('<([a-zA-Z0-9-_]{1,})>','g');var kwargs=[];while(match=re.exec(path)){if(args.length>0){args.push(i);i++;}
else{kwargs.push(match[1]);}}
return{'args':args,'kwargs':kwargs};}
function _get_path(name,args,kwargs){var path=urls[name]||false;if(!path){throw('URL not found for view: '+name);}
var _path=path;var key;if(args&&args.length>0){var placeholders=path.match(/<[^\>]*>/g);placeholders=(placeholders?placeholders.length:0);if(placeholders!=args.length){throw(_path+' takes exactly '+placeholders+' arguments ('+args.length+' given)');}
for(key in args){path=path.replace(/<[^\>]*>/,args[key]);}}
else{for(key in kwargs){if(kwargs.hasOwnProperty(key)){if(!path.match('<'+key+'>')){throw(key+' does not exist in '+_path);}
path=path.replace('<'+key+'>',kwargs[key]);}}}
var missing_args=_missing_params(path);if(missing_args['args'].length>0){throw('Missing arguments ('+missing_args['args'].length+') for url '+_path);}
if(missing_args['kwargs'].length>0){throw('Missing arguments ('+missing_args['kwargs'].join(", ")
+') for url '+_path);}
return path;}
function _get_path_from_element(name,element){var path=urls[name]||false;if(!path){throw('URL not found for view: '+name);}
var key,args=[],kwargs={},params=_missing_params(path);if(params['args'].length>0){for(key in params['args']){var position=params['args'][key];var attr=element.attr('data-url-param-'+position);if(typeof(attr)=="undefined"){throw('Missing argument in position '+position
+' for url '+path);}
args.push(attr);}}
else{var position=0;for(key in params['kwargs']){var param_name=params['kwargs'][key];var attr=element.attr('data-'+param_name);if(attr){kwargs[param_name]=attr;}
attr=element.attr('data-url-param-'+position);if(attr){args.push(attr);}
position++;}}
var query=element.attr('data-query');var hash=element.attr('data-hash')?element.attr('data-hash').replace('#',''):'';return _get_path(name,args,kwargs)+
_get_query_from_element(element)+
_get_hash_from_element(element);}
function _get_query_from_element(element){var query=element.attr('data-query');return(query?'?'+query:'');}
function _get_hash_from_element(element){var hash=element.attr('data-hash')?element.attr('data-hash').replace('#',''):'';return(hash?'#'+hash:'');}
function _parse_url(url){var a=document.createElement('a');a.href=url;return a;}
function _get_value_from_query(variable,query){query=query||window.location.search.substring(1);var vars=query.split("&");for(var i=0;i<vars.length;i++){var pair=vars[i].split("=");if(pair[0]==variable){return pair[1];}}
return false;}
function _append_next_page(url,next_page){var query=_parse_url(url).search.substring(1);if(query){if(_get_value_from_query('next',query)){return url;}}
var append=(query?'&':'?');var with_next_page=url;if(typeof(next_page)=='undefined'&&window.next_page){with_next_page+=append+'next='+base64.decode(window.next_page);}
else if(next_page){with_next_page+=append+'next='+next_page;}
else{with_next_page+=append+'next='+_get_path('home');}
return with_next_page;}
return{'get':_get_path,'getFromElement':_get_path_from_element,'getQueryFromElement':_get_query_from_element,'getHashFromElement':_get_hash_from_element,'getValueFromQuery':_get_value_from_query,'parseUrl':_parse_url,'appendNextPage':_append_next_page}}());module.noSelectText=(function(){function return_false(){return false;}
$.extend($.fn.disableTextSelect=function(){return this.each(function(){$(this).css('MozUserSelect','none').on('selectstart mousedown',return_false);});});$.extend($.fn.enableTextSelect=function(){return this.each(function(){$(this).css('MozUserSelect','').off('selectstart mousedown',return_false);});});$(function(){$('.no-select-text').disableTextSelect();});}());module.replaceLinks=(function(){function replace($parent){if(typeof($parent)=="undefined"){$parent=$(document);}
$parent.find('[data-replace-url]').each(function(){var $this=$(this);if($(this).prop('tagName')!='a'){$a=$('<a>'+$this.html()+'</a>');$.each($(this).prop("attributes"),function(){$a.attr(this.name,this.value);});$this.replaceWith($a);$this=$a;}
if($this.data('replace-url')){$this.attr('href',module.urls.getFromElement($this.data('replace-url'),$this));}
else{$this.attr('href',module.urls.getQueryFromElement($this)+
module.urls.getHashFromElement($this));}
$this.removeAttr('data-replace-url');});$parent.trigger('urls_replaced');}
$(document).on('page_changed',$('body'),replace);$(document).on('page_loaded',$('body'),replace);$(document).on('content_refreshed',$('body'),replace);$(function(){replace();});return{'replace':replace};}());module.preloadImage=(function(){var cache=[];var preLoadImages=function(){var args_len=arguments.length;for(var i=0;i<args_len;i++){var cacheImage=document.createElement('img');cacheImage.src=arguments[i];cache.push(cacheImage);}};return{'load':preLoadImages};}());module.hashParser=(function(){function _hash_tokens(hash_value){var dict={};if(hash_value){var tokens=hash_value.split('&');for(i in tokens){if(tokens[i]){var pair=tokens[i].split('=');var key=pair[0];if(pair.length==1){var value="";}
else{var value=pair[1];}
dict[key]=value;}}}
return dict;}
function _update_history(){if(Modernizr.history){history.replaceState('','',(''+window.location).split('#')[0]);}
else{window.location.replace((''+window.location).split('#')[0]+'#');}}
function get(key,hide_history){var hash_value=window.location.hash.replace('#','');var hash_tokens=_hash_tokens(hash_value);for(h_key in hash_tokens){if(key==h_key){if(hide_history){_update_history();}
return hash_tokens[h_key];}}
return false;}
function full(hide_history){var hash_value=window.location.hash.replace('#','');if(hide_history){_update_history();}
return _hash_tokens(hash_value);}
return{'get':get,'full':full,'clear':_update_history};}());module.action_queue={};module.responsive=(function(){var is_mobile;var has_ios_fixed_input_bug;var is_old_ios;var window_width;var window_height;var document_width;var document_height;var document_resize_interval=false;var document_resized=false;function _parse(){is_mobile=($('#responsive-beacon:visible').length==0);}
function _parseOnce(){has_ios_fixed_input_bug=(/(iPhone|iPod|iPad)/i.test(navigator.userAgent)&&!/OS (4|5|6|7|10)_\d(_\d)? like Mac OS X/i.test(navigator.userAgent));is_old_ios=(/(iPhone|iPod|iPad)/i.test(navigator.userAgent)&&/OS (4|5|6|7)_\d(_\d)? like Mac OS X/i.test(navigator.userAgent));document_width=$(document).width();document_height=$(document).height();}
function _init(){window_width=$(window).width();window_height=$(window).height();setInterval(function(){var new_window_width=$(window).width();var new_window_height=$(window).height();if(window_width!==new_window_width||window_height!=new_window_height){var changes={'width':(window_width!=new_window_width),'height':(window_height!=new_window_height),}
window_width=new_window_width;window_height=new_window_height;_parse();$(document).trigger('window_resize',changes);}},300);_parse();_parseOnce();}
function onDocumentResize(){if(document_resize_interval){var new_document_width=$(document).width();var new_document_height=$(document).height();if(document_width!==new_document_width||document_height!=new_document_height){var changes={'width':(document_width!=new_document_width),'height':(document_height!=new_document_height),}
document_width=new_document_width;document_height=new_document_height;$(document).trigger('document_resize',changes);}}
else{document_resized=true;}}
function respondOnDocumentResize(){if(!document_resize_interval){document_resize_interval=setInterval(onDocumentResize,300);if(document_resized){onDocumentResize();document_resized=false;}}}
$(function(){_init();});return{'isMobile':function(){return is_mobile;},'hasIosFixedInputBug':function(){return has_ios_fixed_input_bug;},'isOldIos':function(){return is_old_ios;},'respondOnDocumentResize':respondOnDocumentResize,'onDocumentResize':onDocumentResize};})();return module;});define('fc/shop',['jquery','fc/utils'],function($,fc_utils){var module={};module.redirectToShopUrl=function(url){return fc_utils.urls.get('redirect_to_shop',[],{'url':url});}
module.markForPartner=(function(){function init(){var hash=fc_utils.hashParser.get('t',true);if(hash){$.ajax({url:module.redirectToShopUrl('partner.js'+'?t='+hash),crossDomain:true,dataType:"script"});}}
return{'init':init};}());return module;});define('fc/dataconsent',['jquery','base64','fc/utils'],function($,base64,fc_utils){function dataConsentSubmit($container){if(!$container.attr('data-data-consent-submit')){$container.append('<input type="hidden" name="data_consent[form]" value="'+base64.encode($container.html())+'">');var tokens=new Array();$container.find('[data-data-consent-token]').each(function(){tokens.push($(this).attr('data-data-consent-token'));});$container.find('[data-data-consent-token]:checked, [type="hidden"][data-data-consent-token]').each(function(){$(this).after('<input type="hidden" name="data_consent[consents]['+$(this).attr('data-data-consent-token')+']" value="'+$(this).val()+'">');});$container.append('<input type="hidden" name="data_consent[tokens]" value="'+tokens.join('|')+'">');$container.attr('data-data-consent-submit',true);}};return{'dataConsentSubmit':function($container){dataConsentSubmit($container);}};});define('fc/cookieconsent',['jquery','fc/utils'],function($,fc_utils){var module={};module.init=function($box,onShowingBox,onBoxClosed){if($box.length==0){return;}
var cookie_name='cookie_data_compliant';function cookiePair(type){if(typeof(type)=='undefined'){type='all';}
return[cookie_name+'_'+type,type];}
function checkConsent(type){return fc_utils.cookie.get(cookiePair(type)[0]);}
function withConsent(type,action){if(checkConsent(type)){action();}}
function askForConsent(){$.get(fc_utils.urls.get('data_consent'),function(html){$box.append(html);if(typeof(onShowingBox)!="undefined"){onShowingBox($box);}
$box.show();$box.find('a.accept').click(function(e){e.preventDefault();var $form=$(this).closest('form');require(['fc/dataconsent'],function(fc_dataconsent){fc_dataconsent.dataConsentSubmit($form);$.post('/data-consent/',$form.serialize(),function(){accept();$box.hide();if(typeof(onBoxClosed)!="undefined"){onBoxClosed($box);}});});});$box.find('a.law').click(function(e){e.preventDefault();e.stopPropagation();window.location=$(this).attr('href');});});}
function accept(){var cookie=cookiePair();var time_ago=new Date();time_ago.setTime(-1);fc_utils.cookie.set(cookie[0],cookie[1],time_ago);var one_year=new Date();one_year.setTime(one_year.getTime()+60*60*24*365*1000);fc_utils.cookie.set(cookie[0],cookie[1],one_year);}
if(!checkConsent()){if($('.cookie-consent-free').length==0){askForConsent();}}
else{accept();}};return module;});define('fc/ui/forms',['jquery','base64','jquery-bootstrap'],function($,base64){function init(){$('.help_text').popover({live:true,fallback:'Aiuto'});$('[rel="tooltip"]').tooltip({});$('form select.encoded').each(function(){$(this).html(base64.decode($(this).data('options')));}).removeClass('encoded');$(document).on('change','form.auto-submit-select select',function(e){$(e.currentTarget).closest('form').submit();});$(document).on('submit','form.no-empty-submit',function(e){var check_val='';$(e.currentTarget).find('.prevent-empty-submit').each(function(){check_val+=$.trim($(this).val());});if(check_val==''){$(e.currentTarget).find('.focus-on-empty-submit').eq(0).focus();}
return(check_val!='');});if(!Modernizr.input.placeholder){$('[placeholder]').focus(function(){var input=$(this);if(input.val()==input.attr('placeholder')){input.val('');input.removeClass('placeholder');}}).blur(function(){var input=$(this);if(input.val()==''||input.val()==input.attr('placeholder')){input.addClass('placeholder');input.val(input.attr('placeholder'));}}).blur();$('[placeholder]').parents('form').submit(function(){$(this).find('[placeholder]').each(function(){var input=$(this);if(input.val()==input.attr('placeholder')){input.val('');}})});}
$('.expand-on-focus').on('focus','form textarea',function(e){var $form=$(e.currentTarget).closest('form');$form.addClass('focused');$(e.currentTarget).one('blur',function(){if(!$.trim($(this).val())){$(this).val('');}
if($.trim($(this).val())){return;}
$form.removeClass('focused');});});}
return{'init':init}});define('fc/ui/phrase_list',['hammer','jquery','fc/login','fc/utils','fc/ui/forms','fc/ui/stars','base64','jquery-color','i18n'],function(hammer,$,fc_login,fc_utils,fc_ui_forms,fc_ui_stars,base64,color,i18n){var module={};var $active_phraseblock=false;module.panels=(function(){function getPanelForButton(button){var panelname=button.data('panelname');if(!panelname){return[];}
var $quoteblock=button.closest('.quote-block');var form=$quoteblock.find('.'+panelname);if(form.length==0){$quoteblock.append($('body').find('.phrase_panel_template.'+panelname).clone().addClass('phrase_panel').removeClass('phrase_panel_template'));}
form=button.closest('.quote-block').find('.'+panelname);return form;}
function hidePanel(button,form){form.removeClass('active');button.removeClass('active');form.trigger('closed');form.css('left','');button.closest('.quote-block').removeClass("quote-active");}
function showPanel(button,form){var $quoteblock=form.closest('.quote-block');$quoteblock.find('.phrase_panel.active').removeClass('active');$quoteblock.find('.open-panel.active').removeClass('active');if(button.find('.arrow').length==0){button.append('<span class="arrow"></span>');}
button.addClass('active');form.addClass('active');form.trigger('show');if($quoteblock.prop('scrollLeft')>0){form.css('left',$quoteblock.prop('scrollLeft')+'px');}}
function togglePanel(button,form){if(button.hasClass('active')){hidePanel(button,form);button.closest('.quote-block').removeClass("quote-active");}else{showPanel(button,form);button.closest('.quote-block').addClass("quote-active");}}
function waitingPanel($panel){$panel.html('');$panel.addClass('loading-background');}
function readyPanel($panel){$panel.removeClass('loading-background');}
function loadInPanel_helper(url,$panel){waitingPanel($panel);$panel.trigger('pre-loading');$.get(url,function(data){$panel.html(data);readyPanel($panel);$panel.trigger('opened');},'html');}
function loadInPanel_urlHelper($target){var url=false;var panelname=$target.data('panelname');var url_name=$target.data('url');if(!url_name){var panel_default_urls={info_panel:'phrase_info',email_form:'phrase_email_form',comment_form:'phrase_comment_preview',addto_form:'phrase_addto_snippet',inappropriate_panel:'phrase_correct',link_this_form:'phrase_link',products_form:'phrase_products'}
url_name=panel_default_urls[panelname];}
if(url_name){$target.attr('data-slug',$target.closest('.quote-block').data('slug'))
url=fc_utils.urls.getFromElement(url_name,$target);}
return url;}
function loadInPanel(e,$target,$panel){e.preventDefault();var url=loadInPanel_urlHelper($target);if(url){if($target.hasClass('require_login')){fc_login.logged_action(function(){loadInPanel_helper(url,$panel);},$target.data('error-message'),function(){hidePanel($target,$panel);},undefined,true);}else{loadInPanel_helper(url,$panel);}}}
function toggle_lateralinfo($quoteblock,show){var $phraseblock=$quoteblock.find('blockquote');var $lateralinfo=$quoteblock.find('.post-info');var $lateralinfogradient=$quoteblock.find('.post-info-gradient');var $phraseactions=$quoteblock.find('.phrase-actions');var $phraseactions_a=$phraseactions.find('a.lateral-switch');var lateralinfo_fixed=$lateralinfo.width()+parseInt($lateralinfo.css('margin-left'),10)-parseInt($lateralinfogradient.width(),10);if(show){$phraseactions.find('.share').css('display','none');}else{$phraseactions.find('.share').css('display','');}
if($quoteblock.width()>(lateralinfo_fixed+$phraseactions.width())){var share_offset=0;}else if($quoteblock.width()>lateralinfo_fixed){var share_offset=0;}else{var share_offset=null;}
if(!show){if($quoteblock.find('.open-panel.active').length>0){$quoteblock.find('.open-panel.active').trigger('click');}
$quoteblock.stop().animate({scrollLeft:0,queue:false});$phraseactions.stop().animate({marginRight:0,queue:false});$phraseactions_a.html($phraseactions_a.attr('data-open-text'));$lateralinfo.removeClass('expanded');$lateralinfogradient.stop().animate({right:0,queue:false});}else{$quoteblock.stop().animate({scrollLeft:lateralinfo_fixed,queue:false},function(){$phraseactions_a.html($phraseactions_a.attr('data-close-text'));if(parseInt($phraseactions.css('margin-right'))==0){if(share_offset===null){share_offset='-'+($quoteblock.scrollLeft()-$quoteblock.width()+$phraseactions.width()+parseInt($quoteblock.css('padding-left'),10)*2)+'px';}
$phraseactions.stop().animate({marginRight:share_offset,queue:false});}});$lateralinfo.addClass('expanded');$lateralinfogradient.stop().animate({right:-1*lateralinfo_fixed,queue:false});}}
function init(){$(document).on('click reload','.quote-box a.open-panel',function(e,object){var button=$(e.currentTarget);;e.preventDefault();if(!object){object=false;}
var form=getPanelForButton(button);if(form.length==0){return;}
if((!button.hasClass('active')||e.type=='reload')){loadInPanel(e,button,form);}else{form.trigger('opened');}
if(e.type=='click'){togglePanel(button,form);}});$(document).on('close','.quote-box a.open-panel',function(e){var button=$(e.target);var panelname=button.data('panelname');var form=getPanelForButton(button);togglePanel(button,form);});$(document).on('wait','.quote-box .phrase_panel',function(e){var panel=$(e.target);waitingPanel(panel);});$(document).on('ready','.quote-box .phrase_panel',function(e){var panel=$(e.target);readyPanel(panel);});$(document).on('click','.quote-box .phrase-actions a.lateral-switch',function(e){e.preventDefault();var $quoteblock=$(e.target).closest('.quote-block');if(!$quoteblock.length){return;}
var $lateralinfo=$quoteblock.find('.post-info');if($lateralinfo.hasClass('expanded')){toggle_lateralinfo($quoteblock,false);_gaq.push(['_trackEvent','Phrase List','Lateral info - with button','close']);}else{toggle_lateralinfo($quoteblock,true);_gaq.push(['_trackEvent','Phrase List','Lateral info - with button','open']);}});$(document).on('click','.quote-box .post-info .quote-image a, .quote-box .post-info .quote-image > img, .quote-box .post-info-gradient',function(e){if(fc_utils.responsive.isMobile()){e.preventDefault();var $lateralinfo=$(e.target).closest('.post-info');if(!$lateralinfo.hasClass('expanded')){toggle_lateralinfo($(e.target).closest('.quote-block'),true);_gaq.push(['_trackEvent','Phrase List','Lateral info - with image','open']);}else{toggle_lateralinfo($(e.target).closest('.quote-block'),false);_gaq.push(['_trackEvent','Phrase List','Lateral info - with image','close']);}}});delete Hammer.defaults.behavior.userSelect;var hammer=$('.quote-box').hammer();hammer.on('dragstart',function(e){e.preventDefault();$quoteblock=$(e.target).closest('.quote-block');if(!$quoteblock.length){return;}
$active_phraseblock=$quoteblock;$quoteblock.data('startScrollLeft',$quoteblock.scrollLeft());$quoteblock.data('startWindowScrollTop',$(window).scrollTop());});hammer.on('dragleft',function(e){e.preventDefault();var finalScrollLeft=Math.abs(e.gesture.deltaX);var $quoteblock=$(e.target).closest('.quote-block');if(!$quoteblock.length){return;}
var $lateralinfogradient=$quoteblock.find('.post-info-gradient');var is_expanded=$quoteblock.find('.post-info.expanded').length==1;var gradient_position=-1*finalScrollLeft;if(gradient_position<=0&&!is_expanded){$lateralinfogradient.css('right',gradient_position);}
if(is_expanded){toggle_lateralinfo($quoteblock,true);return;}
$quoteblock.scrollLeft(finalScrollLeft);});hammer.on('dragright',function(e){e.preventDefault();var finalScrollLeft=Math.abs(e.gesture.deltaX);var $quoteblock=$(e.target).closest('.quote-block');if(!$quoteblock.length){return;}
var $lateralinfogradient=$quoteblock.find('.post-info-gradient');var is_expanded=$quoteblock.find('.post-info.expanded').length==1;var gradient_position=-1*($quoteblock.data('startScrollLeft')-finalScrollLeft);if(gradient_position<=0&&is_expanded){$lateralinfogradient.css('right',gradient_position);}
if(!is_expanded){toggle_lateralinfo($quoteblock,false);return;}
$quoteblock.scrollLeft($quoteblock.data('startScrollLeft')-finalScrollLeft);});hammer.on('dragend',function(e){e.preventDefault();var $quoteblock=$(e.target).closest('.quote-block');if($quoteblock.length==0||typeof($quoteblock.data('startScrollLeft'))=='undefined'){if($active_phraseblock){if($active_phraseblock.find('.lateralinfo').hasClass('expanded')){toggle_lateralinfo($active_phraseblock,false);}else{toggle_lateralinfo($active_phraseblock,true);}}
return;}
var $lateralinfo=$quoteblock.find('.post-info');var deltaY=Math.abs(e.gesture.deltaY)+Math.abs($quoteblock.data('startWindowScrollTop')-$(window).scrollTop());var deltaX=e.gesture.deltaX;if(deltaY<60){if($quoteblock.scrollLeft()>0){if($lateralinfo.hasClass('expanded')&&deltaX>0){toggle_lateralinfo($quoteblock,false);_gaq.push(['_trackEvent','Phrase List','Lateral info - with drag','close']);}else{toggle_lateralinfo($quoteblock,true);_gaq.push(['_trackEvent','Phrase List','Lateral info - with drag','open']);}}}else{if($lateralinfo.hasClass('expanded')){toggle_lateralinfo($quoteblock,true);}else{toggle_lateralinfo($quoteblock,false);}}
$active_phraseblock=false;$quoteblock.removeData('startScrollLeft');$quoteblock.removeData('startWindowScrollTop');});$(document).on('opened','.phrase_panel',function(e){e.preventDefault();$panel=$(this);if($panel.data('has-close')&&$panel.find('.close-panel').length==0){$close_element=$panel.parent().find('.close-panel-template').clone();$close_element.removeClass('close-panel-template').addClass('close-panel');$panel.append($close_element);}});$(document).on('opened','.phrase_panel.info_panel',function(e){_gaq.push(['_trackEvent','Phrase List','Info - Open Panel','']);});$(document).on('click','.close-panel',function(e){e.preventDefault();$(this).closest('.quote-block').find('.open-panel.active').trigger('click');});}
return{'init':init};}());module.faves=(function(){function load_faves(url,e,request_data){fc_login.logged_action(function(){$.get(url,request_data,function(data){var to_reload=false;$(e.target).trigger('faves-begin-operation',{'slug':data.slug});if(data&&data.success==true){data.url=url;$(e.target).closest('.quote-block').trigger('phrase-data-changed');if(data.withdrawn){$(e.target).trigger('faves-removed',{'slug':data.slug});}else{$(e.target).trigger('faves-added',{'slug':data.slug});}
to_reload=true;}
$(e.target).trigger('faves-end-operation');if(to_reload){$(e.target).closest('.quote-block').find('.open-panel.addto').eq(0).trigger('reload',data);}},'json');},undefined,undefined,undefined,true);}
function init(){$(document).on('click','.addto_faves',function(e){e.preventDefault();var url=$(e.currentTarget).attr('href');load_faves(url,e,{});});$(document).on('click','.item-add-new button',function(e){e.preventDefault();var url=$(e.target).closest('.phrase_panel').find('.addto_new_faves').data('url');var title=$(e.target).closest('.phrase_panel').find('.title').val();if($.trim(title)!=""){load_faves(url,e,{title:title});}});$(document).on('keyup','.item-add-new input[type=text]',function(e){e.preventDefault();if(e.keyCode==13){$(e.target).closest('.phrase_panel').find('.item-add-new button').click();}});$(document).on('opened','.phrase_panel.addto_form',function(e){_gaq.push(['_trackEvent','Phrase List','Faves - Open Panel','']);if($(this).data('slug-added')){$(this).prepend('<div class="alert alert-success"><a class="close" data-dismiss="alert" href="#">&times;</a><strong>'+i18n.gettext("La frase è stata aggiunta con successo!")+'</strong></div>');var added=$(this).find('li[data-slug="'+$(this).data('slug-added')+'"]');added.addClass('just-added');$(this).data('slug-added','');added.animate({"borderTopColor":"#f9b233","borderBottomColor":"#f9b233","borderLeftColor":"#f9b233","borderRightColor":"#f9b233"},4000);}});$(document).on('faves-added','.phrase_panel.addto_form',function(e,data){$(this).data('slug-added',data.slug);});}
return{'init':init};}());module.comments=(function(){function init(){$(document).on('pre-loading','.phrase_panel.comment_form',function(e){require(['fc/ui/comment'],function(fc_ui_comment){fc_ui_comment.init($('.quote-box'));});});$(document).on('comment-waiting','.phrase_panel.comment_form',function(e){$(e.target).trigger('wait');});$(document).on('comment-ready','.phrase_panel.comment_form',function(e){$(e.target).trigger('ready');});$(document).on('comment-reload','.phrase_panel.comment_form',function(e){$(e.target).closest('.quote-block').find('.open-panel.comment').eq(0).trigger('reload');});$(document).on('opened','.phrase_panel.comment_form',function(e){$(e.target).find('textarea').focus();});var counter_update=function($counter,difference){var cnt=parseInt($counter.find('.comment_counter').text());$counter.removeClass('num-'+cnt);$counter.addClass('num-'+(cnt+difference));$counter.find('.comment_counter').text(cnt+difference);};$(document).on('comment-new','.quote-block',function(e){counter_update($(e.currentTarget).find('.quote-num'),1);});$(document).on('comment-deleted','.quote-block',function(e){counter_update($(e.currentTarget).find('.quote-num'),-1);});$(document).on('opened','.phrase_panel.comment_form',function(e){_gaq.push(['_trackEvent','Phrase List','Comment - Open Panel','']);});}
return{'init':init};}());module.email=(function(){function send_email(url,e,request_data){$.post(url,request_data,function(data){var panel=$(e.target).closest('.phrase_panel');$(e.target).closest('.quote-block').trigger('phrase-data-changed');$(e.target).closest('.quote-block').find('.phrase_panel.email_form').html(data);panel.trigger('opened');},'text');}
function init(){$(document).on('click','.quote-block .email_form button.send',function(e){e.preventDefault();var $form=$(e.target).closest('form');var url=$form.attr('action');var data=$form.serialize();send_email(url,e,data);});$(document).on('click','.quote-block .email_form .send_another_email',function(e){e.preventDefault();$(e.target).closest('.quote-block').find('.open-panel.email').eq(0).trigger('reload');});$(document).on('opened','.phrase_panel.email_form',function(e){_gaq.push(['_trackEvent','Phrase List','Email - Open Panel','']);});}
return{'init':init};}());module.fixit=(function(){function post_fixit(url,e,request_data){$.post(url,request_data,function(data){$(e.target).closest('.quote-block').trigger('phrase-data-changed');$(e.target).closest('.phrase_panel').html(data).trigger('opened');},'html');}
function init(){$(document).on('submit','.quote-block .phrase_panel.inappropriate_panel form',function(e){e.preventDefault();var $form=$(e.target);var url=$form.attr('action');var data=$form.serialize();post_fixit(url,e,data);});$(document).on('opened','.quote-block .phrase_panel.inappropriate_panel',function(e){require(['fc/ui/autocomplete'],function(fc_autocomplete){fc_autocomplete.init($(e.target));});fc_ui_forms.init();});$(document).on('opened','.phrase_panel.inappropriate_panel',function(e){_gaq.push(['_trackEvent','Phrase List','Fix It - Open Panel','']);});}
return{'init':init};}());module.link_this=(function(){function init(){$(document).on('opened','.phrase_panel.link_this_form',function(e){_gaq.push(['_trackEvent','Phrase List','Link this - Open Panel','']);$(e.target).find("textarea").focus(function(){var $this=$(this);$this.select();$this.mouseup(function(){$this.unbind("mouseup");return false;});});});}
return{'init':init};}());module.remove_phrase=(function(){function removePhrase($target){$target.addClass('phrase_removed');$target.append('<div class="phrase_removed_mask">');}
function init(){$(document).on('phrase_removed','.quote-block',function(e){removePhrase($(this));});}
return{'init':init};}());module.share=(function(){function init($parent){if(!$parent){$parent=$(document);}
$parent.find('.group.share a').not("[href]").each(function(){$(this).attr('href',$(this).closest('.quote-block').data('link'));});require(['fc/tw','fc/fb','fc/wa'],function(fc_tw,fc_fb,fc_wa){fc_tw.init($parent);fc_fb.init($parent);fc_wa.init($parent);});}
$(document).on('page_changed',$('body'),init);$(document).on('page_loaded',$('body'),init);$(document).on('content_refreshed',$('body'),init);return{'init':init};}());module.show_context=(function(){function init(){$(document).find('.quote-block').find('.context').each(function(){if($(this).data('content')){$(this).html(base64.decode($(this).data('content'))).removeAttr('data-content');}});}
$(document).on('page_changed',$('body'),init);$(document).on('page_loaded',$('body'),init);$(document).on('content_refreshed',$('body'),init);return{'init':init};}());module.linked_text=(function(){function init(){$(document).find('.quote-block').each(function(){var links;if(!fc_utils.responsive.isMobile()){links=$(this).find('blockquote [data-can-replace-url]').not('.whole-read-more');}
else{links=$(this).find('.whole-read-more[data-can-replace-url]');links.find('a').each(function(){$(this).replaceWith($(this).text());});}
links.each(function(){$(this).attr('data-replace-url',$(this).data('can-replace-url'));$(this).removeAttr('data-can-replace-url');});fc_utils.replaceLinks.replace($(this));});}
$(document).on('page_changed',$('body'),init);$(document).on('page_loaded',$('body'),init);$(document).on('content_refreshed',$('body'),init);return{'init':init};}());module.init=function(){module.show_context.init();module.linked_text.init();module.share.init();fc_ui_stars.init($('.post-info'));module.panels.init();module.comments.init();module.faves.init();module.email.init();module.fixit.init();module.link_this.init();module.remove_phrase.init();};return module;});define('fc/login',['jquery','fc/utils','i18n'],function($,fc_utils,i18n){var dialog;var dialog_frame;var logged=false;var logged_cookie=false;var login_url=fc_utils.urls.get('login');var logout_url=fc_utils.urls.get('logout');var todo_after_login=false;var replace_pieces_after_login=true;function init(){if($('#user_logged').val()=='1'){logged=true;logged_cookie=fc_utils.cookie.get('logged');}
$(document).on('click','#header-register a.login, #header-wrapper a.logout',function(e){e.preventDefault();var url_specified=$(e.target).attr('href');var next_url=fc_utils.urls.getValueFromQuery('next',fc_utils.urls.parseUrl(url_specified).search.substring(1));if($(this).hasClass('login')){launch_login(undefined,'',undefined,undefined,undefined,next_url);_gaq.push(['_trackEvent','Header','launch-login']);}else{launch_logout(next_url);}});$(document).on('click','#nav-wrapper button.launch-login, #user-menu-utils a.launch-login',function(e,data){data=data||{};e.preventDefault();var login_url_specified=$(e.target).attr('data-href')||$(e.target).attr('href');var next_url=fc_utils.urls.getValueFromQuery('next',fc_utils.urls.parseUrl(login_url_specified).search.substring(1));var $this=$(this);launch_login(function(){$this.removeClass('launch-login');if(typeof(data.callback)!="undefined"){data.callback();}},'',undefined,undefined,undefined,next_url);});}
function check_login_in_html(html){return $('#user_logged',html).val()=='1';}
function set_as_logged(){logged=true;logged_cookie=fc_utils.cookie.get('logged');}
function set_as_unlogged(){logged=false;logged_cookie=fc_utils.cookie.get('logged');}
function replace_user_pieces(html){$('#header-register').html($('#header-register',html).html());$('#header-register').attr('class',$('#header-register',html).attr('class'));$('#user-menu-utils').html($('#user-menu-utils',html).html());$('.our-icon-user').each(function(){$(this).html($('.our-icon-user',html).html());});$('#nav-wrapper').trigger('nav_changed');$('#nav-wrapper button.launch-login').removeClass('launch-login');$('#user-menu-utils a.launch-login').removeClass('launch-login');}
function check_login(){var new_logged_cookie=fc_utils.cookie.get('logged');if(logged_cookie==new_logged_cookie){return logged;}
var is_logged=false;$.ajax({url:fc_utils.urls.get('logged'),async:false,success:function(data){if(check_login_in_html(data)){is_logged=true;}
replace_user_pieces(data);},dataType:'html'});logged_cookie=new_logged_cookie;logged=is_logged;return logged;}
function launch_login(fn,message,void_fn,replace_pieces,title,next_url,important_data){if(fn){todo_after_login=fn;}else{todo_after_login=false;}
if(typeof(replace_pieces)!='undefined'&&replace_pieces==false){replace_pieces_after_login=false;}else{replace_pieces_after_login=true;}
with_next_url=fc_utils.urls.appendNextPage(login_url,next_url);if(typeof(message)=='undefined')
message='';if(typeof(title)=='undefined'){title=i18n.gettext('Registrati / Accedi')}
require(['fc/ui/dialog'],function(fc_ui_dialog){dialog=fc_ui_dialog.createAndShow(title,'',{buttons:false,width:960,padding:0,body_ajax:{url:with_next_url,method:'get',async:true},oncomplete:function(){require(['fc/ui/login_page'],function(fc_ui_login_page){fc_ui_login_page.init();});},onvoid:void_fn,backdrop:"static"});if(message.length>0){var message_tag=$('<div class="alert alert-warning"></div>').text(message);dialog.find('.modal-header').append(message_tag);}
dialog.on('submit','form',function(e){e.preventDefault();require(['fc/dataconsent'],function(fc_dataconsent){var form=dialog.find('form').filter(':visible');fc_dataconsent.dataConsentSubmit(form);login_done(form.serialize(),next_url);});});dialog.on('click','.external_login',function(e){load_external_login_in_iframe(e,important_data);});dialog.on('retry',function(e){fc_ui_dialog.close(dialog);dialog=undefined;launch_login(fn,message,void_fn,replace_pieces,title,next_url,important_data);});});}
function login_done(form,next_url){method='post';if(!form){form={};method='get';}
with_next_url=fc_utils.urls.appendNextPage(login_url,next_url);require(['fc/ui/dialog'],function(fc_ui_dialog){if(dialog){fc_ui_dialog.loader(dialog);fc_ui_dialog.align(dialog);}
if(dialog_frame){fc_ui_dialog.loader(dialog_frame);fc_ui_dialog.align(dialog_frame);}
$.ajax(with_next_url,{type:method,data:form,success:function(data){if(check_login_in_html(data)){set_as_logged();require(['fc/newsletter'],function(fc_newsletter){var newsletter_proposal=!fc_newsletter.check_subscription_in_html(data);if(newsletter_proposal){active_dialog=dialog;if(dialog_frame){active_dialog=dialog_frame;fc_ui_dialog.close(dialog);dialog=undefined;}
fc_newsletter.launch_subscription(todo_after_login,todo_after_login,active_dialog,undefined,next_url);}
else{if(dialog){fc_ui_dialog.close(dialog);dialog=undefined;}
if(dialog_frame){fc_ui_dialog.close(dialog_frame);dialog_frame=undefined;}}
if(replace_pieces_after_login){replace_user_pieces(data);}
if(!newsletter_proposal&&todo_after_login){todo_after_login();todo_after_login=false;}});}else{if(dialog){fc_ui_dialog.changeContent(dialog,data);}
require(['fc/ui/login_page'],function(fc_ui_login_page){fc_ui_login_page.init();});}},error:function(jqXHR,error_message){if(dialog){fc_ui_dialog.changeContent(dialog,'<div class="generic-dialog-content"><p>'+
i18n.gettext("Si è verificato un errore durante il login o registrazione")+'</p><div class="actions">'+"<button class=\"btn btn-default login primary\">"+
i18n.gettext("Torna alla schermata di login/registrazione")+"</button></div></div>");dialog.one('click','.login',function(){dialog.trigger('retry');});}},dataType:'html',cache:false,backdrop:"static"});});}
function launch_logout(next_url,fn){with_next_url=fc_utils.urls.appendNextPage(logout_url,next_url);require(['fc/ui/dialog'],function(fc_ui_dialog){dialog=fc_ui_dialog.createAndShow(i18n.gettext('Logout'),'',{buttons:false,width:960,padding:0,loader:true,with_close:false});if(typeof(fn)!='undefined'){fn();}
window.location=with_next_url;});}
function load_external_login_in_iframe(e,important_data){e.preventDefault();$target=$(e.target).closest('a');require(['fc/ui/dialog'],function(fc_ui_dialog){dialog_frame=fc_ui_dialog.createAndShow(i18n.gettext('Registrati / Accedi'),'',{buttons:false,width:960,padding:0,backdrop:"static",with_close:false});if(dialog){fc_ui_dialog.hide(dialog);}
fc_ui_dialog.changeContent(dialog_frame,'<div class="generic-dialog-content"><p>'+
i18n.gettext("Si sta aprendo un'altra finestra da cui potrai accedere al sito o registrarti. Se non appare alcuna finestra controlla che non sia attivo sul tuo browser il blocco dei popup!")+'</p><div class="actions">'+"<button class=\"btn btn-default login retry-login primary\">"+
i18n.gettext("Riprova l'accesso/registrazione")+"</button></div></div>");dialog_frame.on('click','.login',function(){fc_ui_dialog.close(dialog_frame);dialog_frame=undefined;fc_ui_dialog.show(dialog);});open_popup($target,e,important_data,true);});}
function open_popup($target,e,important_data,bind){var w=600;var h=300;var left=(screen.width/2)-(w/2);var top=(screen.height/2)-(h/2);var popup=window.open($target.attr('href')+'%26popup%3D1','external_login','menubar=0,directories=0'+',resizable=1,status=0,toolbar=0,location=1,width='+
w+',height='+h+',top='+top+',left='+left);var popup_creation=new Date().getTime();$(popup).unload(function(){if((new Date().getTime()-popup_creation)<400){popup_blocked($target,e,important_data,bind);}});setTimeout(function(){if(important_data&&(!popup||popup.outerHeight===0)){popup_blocked($target,e,important_data,bind);}else if(!popup||popup.outerHeight===0){window.location=$target.attr('href');}},100);}
function popup_blocked($target,e,important_data,bind){require(['fc/ui/dialog'],function(fc_ui_dialog){fc_ui_dialog.changeContent(dialog_frame,'<div class="generic-dialog-content"><p>'+
i18n.gettext("Il blocco popup impedisce di aprire una finestra in cui effettuare il login o registrazione. Fare ora il login senza aprire il popup potrebbe comportare la perdita dei dati che si vuole inviare.")+"</p><div class=\"login-popup-blocked\">"+"<button class=\"btn btn-default retry primary\">"+
i18n.gettext("Riapri il popup")+"</button><button class=\"btn btn-default force-login primary\">"+
i18n.gettext("Effettua il login senza popup")+"</button><button class=\"btn btn-default close-login\">"+
i18n.gettext("Annulla l'operazione")+"</button></div></div>");if(bind){dialog_frame.on('click','.close-login',function(){fc_ui_dialog.close(dialog_frame);dialog_frame=undefined;if(dialog){fc_ui_dialog.close(dialog,true);dialog=undefined;}});dialog_frame.on('click','.force-login',function(){window.location=$target.attr('href');});dialog_frame.on('click','.retry',function(){open_popup($target,e,important_data,false);});}});}
function external_login_error(){require(['fc/ui/dialog'],function(fc_ui_dialog){fc_ui_dialog.loader(dialog_frame);$.get(fc_utils.urls.get('login_error'),function(data){fc_ui_dialog.changeContent(dialog_frame,'<div class="generic-dialog-content">'+data+'</div>');})});}
function logged_action(fn,message,void_fn,replace_pieces,important_data,next_url){if(check_login()){fn();}else{launch_login(fn,message,void_fn,replace_pieces,i18n.gettext('Per proseguire effettua il login'),next_url,important_data);}}
window.fc_login_done=login_done;window.fc_external_login_error=external_login_error;return{'init':init,'check_login':check_login,'launch_login':launch_login,'login_done':login_done,'launch_logout':launch_logout,'logged_action':logged_action};});define('fc/newsletter',['jquery','fc/utils','i18n'],function($,fc_utils,i18n){var dialog;var subscription_url=fc_utils.urls.get('subscribe_newsletter');var todo_after_subscription=false;var _this=this;function init(context){$('a.subscribe',context).click(function(e){e.preventDefault();launch_subscription();});}
function init_page(){require(['fc/dataconsent'],function(fc_dataconsent){$('form.newsletter-page').submit(function(){fc_dataconsent.dataConsentSubmit($(this));});});}
function check_subscription_in_html(html){return $('#user_subscribed',html).val()=='1';}
function launch_subscription(fn,void_fn,login_dialog,dialog_title,next_url){if(fn){todo_after_subscription=fn;}else{todo_after_subscription=false;}
with_next_url=fc_utils.urls.appendNextPage(subscription_url,next_url);if(typeof(login_dialog)!='undefined'){with_next_url+=(with_next_url.indexOf('?')!=-1?'&':'?')+'signing_in=1';if(!todo_after_subscription){todo_after_subscription=function(){};}}
if(typeof(dialog_title)=='undefined'){title=i18n.gettext('Newsletter');}
else{title=dialog_title;}
require(['fc/ui/dialog'],function(fc_ui_dialog){var dialog_opts={buttons:false,width:960,padding:0,body_ajax:{url:with_next_url,method:'get',async:true},onvoid:void_fn,backdrop:"static",with_close:true}
if(typeof(login_dialog)=='undefined'){dialog=fc_ui_dialog.createAndShow(title,'',dialog_opts);}
else{dialog=login_dialog;dialog.off('submit','form');dialog.off('retry');dialog.off('void');fc_ui_dialog.update(dialog,dialog_opts);}
dialog.on('click','input[name="cancel"]',function(e){e.preventDefault();fc_ui_dialog.close(dialog,true);dialog=undefined;});dialog.on('submit','form',function(e){e.preventDefault();_gaq.push(['_trackEvent','Newsletter Subscribtion','Send','']);require(['fc/dataconsent'],function(fc_dataconsent){var form=dialog.find('form');fc_dataconsent.dataConsentSubmit(form);subscription_done(form.serialize(),next_url);});});dialog.on('click','.close_box',function(e){e.preventDefault();fc_ui_dialog.close(dialog);dialog=undefined;});dialog.on('retry',function(e){fc_ui_dialog.loader(dialog);setTimeout(function(){if(typeof(login_dialog)=='undefined'){fc_ui_dialog.close(dialog);dialog=undefined;}
else{dialog.find('.modal-header .alert').remove();}
launch_subscription(fn,void_fn,login_dialog,dialog_title,next_url);},1500);});});_this.dialog=dialog;}
function subscription_done(form,next_url){method='post';with_next_url=fc_utils.urls.appendNextPage(subscription_url,next_url);require(['fc/ui/dialog'],function(fc_ui_dialog){if(dialog){fc_ui_dialog.loader(dialog);fc_ui_dialog.align(dialog);}
$.ajax(with_next_url,{type:method,data:form,success:function(data){if(todo_after_subscription&&check_subscription_in_html(data)){if(dialog){fc_ui_dialog.close(dialog);dialog=undefined;}
todo_after_subscription();todo_after_subscription=false;}
else if(dialog){fc_ui_dialog.changeContent(dialog,data);}},error:function(jqXHR,error_message){if(dialog){var message_tag=$('<div class="alert alert-warning">'+
i18n.gettext("Si è verificato un errore durante l'iscrizione alla newsletter, ti invitiamo a riprovare")+'</div>');dialog.find('.modal-header .alert').remove();dialog.find('.modal-header').append(message_tag);dialog.trigger('retry');}},dataType:'html',cache:false,backdrop:"static"});});}
return{'init':init,'init_page':init_page,'check_subscription_in_html':check_subscription_in_html,'launch_subscription':launch_subscription};});define('fc/ui/pagination',['jquery','fc/login','fc/ui/change_page','i18n','fc/utils'],function($,fc_login,fc_ui_change_page,i18n,fc_utils){function go_to_next_page(url){function change_page(status,data){if(typeof(data)=='undefined'){data=false;}
require(['fc/ui/change_page'],function(){if(status!=='success'){var parsed_url=fc_utils.urls.parseUrl(url);fc_login.logged_action(function(){fc_ui_change_page({url:url,positionToElement:'start-content',auto_freeze:true});},i18n.gettext('Al fine di tutelare i contenuti del sito da illecite condotte predatorie per navigare oltre la pagina 3 è necessario registrarsi'),undefined,false,false,encodeURIComponent(parsed_url.pathname+parsed_url.search));}else{fc_ui_change_page({url:url,data:data,positionToElement:'start-content',auto_freeze:true});}});}
var is_protected=false;if(!fc_login.check_login()){$.ajax({url:url,complete:function(jqXHR,status){change_page((status==='nocontent'?'success':status),jqXHR.responseText);},dataType:'text',async:false,type:"HEAD"});}else{change_page('success');}}
function init(){$(document).on('click','.fc-pagination ul li a',function(e){e.preventDefault();if($(this).parent().hasClass('active'))return;go_to_next_page(this.href);});}
return{'init':init}});define('fc/fb',['jquery'],function($){var module={};function share_click(e){e.preventDefault();module.share($(this));}
module.init=function($parent){if(!$parent){$parent=$(document);}
$parent.find('.facebook-publish').off('click',share_click).on('click',share_click);};module.push=function(fn){fn();};module.share=function(ele){var data={};data['app_id']=window.fc_facebook_app_id;if(ele.attr('href')&&ele.attr('href').length>0){data['u']=ele.attr('href');}else{data['u']=ele.data('link');}
data['display']='popup';var url='https://facebook.com/sharer/sharer.php?'+jQuery.param(data);var windowOptions='scrollbars=yes,resizable=yes,toolbar=no,location=yes',width=550,height=420,winHeight=screen.height,winWidth=screen.width;var left=Math.round((winWidth/2)-(width/2));var top=0;if(winHeight>height){top=Math.round((winHeight/2)-(height/2));}
window.open(url,'facebook_share',windowOptions+',width='+width+',height='+height+',left='+left+',top='+top);_gaq.push(['_trackSocial','Facebook','share',data['u']]);};return module;});define('fc/tw',['jquery','fc/login'],function($,fc_login){var module={};function click_publish(e){e.preventDefault();module.tweet($(this));}
module.init=function($parent){if(!$parent){$parent=$(document);}
$parent.find('.twitter-publish').off('click',click_publish).on('click',click_publish);};module.tweet=function(ele){var data={};var used_chars=0;if(ele.attr('href')&&ele.attr('href').length>0){data['url']=ele.attr('href');}else{data['url']=ele.data('link');}
used_chars+=23;var text=ele.data('text');if(text){var remaining_chars=140-used_chars;if(text.length>remaining_chars){text=text.substring(0,remaining_chars-3)+'...';}
data['text']=text;}
var url='https://twitter.com/intent/tweet?'+jQuery.param(data);var windowOptions='scrollbars=yes,resizable=yes,toolbar=no,location=yes',width=550,height=420,winHeight=screen.height,winWidth=screen.width;var left=Math.round((winWidth/2)-(width/2));var top=0;if(winHeight>height){top=Math.round((winHeight/2)-(height/2));}
window.open(url,'intent',windowOptions+',width='+width+',height='+height+',left='+left+',top='+top);_gaq.push(['_trackSocial','Twitter','share',data['url']]);};return module;});define('fc/ui/stars',['jquery','fc/login','fc/utils','i18n','jquery-bootstrap'],function($,fc_login,fc_utils,i18n){function set_vote($parent,vote,message){$parent.find('.star').each(function(index,star){if(index<vote){$(star).addClass('on').removeClass('empty').removeClass('off');}
else{$(star).removeClass('on').removeClass('empty').addClass('off');}});$parent.find('.star').tooltip('hide');if(message){$parent.find('.star').tooltip('hide');var old_title=$parent.find('.star').eq(vote-1).attr('data-original-title');$parent.find('.star').eq(vote-1).attr('data-original-title',message);$(document).one('mouseover',function(e){$parent.find('.star').eq(vote-1).tooltip('hide');$parent.find('.star').eq(vote-1).attr('data-original-title',old_title);});$parent.find('.star').eq(vote-1).tooltip('show');}}
function init($target){if(typeof $target!='undefined'){var selector=$target.selector+' ';}
else{var selector='';}
$(document).on('mouseenter',selector+'.stars .star',function(e){e.preventDefault();$(e.target).prevAll().addClass('hover').removeClass('empty');$(e.target).addClass('hover').removeClass('empty');$(e.target).nextAll('.on').addClass('empty');$(e.target).nextAll().removeClass('hover');});$(document).on('mouseleave',selector+'.stars',function(e){e.preventDefault();$(e.currentTarget).find('.star').removeClass('hover').removeClass('empty');});$(document).on('click',selector+'.stars a.star',function(e){e.preventDefault();$target=$(e.target);$target.prevAll().removeClass('hover').removeClass('off').addClass('on');$target.removeClass('hover').removeClass('off').addClass('on');$target.nextAll().removeClass('hover').removeClass('on').addClass('off');var parent=$target.closest('.stars');var vote=parent.find('.star.on').length;var url=fc_utils.urls.getFromElement($target.data('url'),$target);$.get(url,function(data){_gaq.push(['_trackEvent','Stars ','Voted',data.extra.vote]);set_vote(parent,data.extra.vote,i18n.gettext('Grazie per il tuo voto!'));parent.trigger('stars-new-rating',[data.extra.vote]);}).error(function(jqXHR){var data=$.parseJSON(jqXHR.responseText);if(typeof data.extra.vote!='undefined'){set_vote(parent,data.extra.vote,data.message);}
else{set_vote(parent,0,'');alert(data.message);}});});$(selector+"a.star[rel=twipsy]").tooltip({live:true,animation:false});}
return{'init':init,'setVote':set_vote};});define("fc/ui/navbar",['jquery','fc/utils','fc/ui/menu'],function($,fc_utils,fc_ui_menu){var $element=$('nav.navbar');var $wrapper=$('#nav-wrapper');var $header_wrapper=$('#header-wrapper');var $placeholder=$('#nav-wrapper + .navbar-background');var buttons={};var width;var top;var top_gap;var left;var fullscreen;var focus_event='focus';var search_bar=(function(){function open(){$element.addClass('w-search-bar');_toggleButton('search',true);fc_ui_menu.withSearchBar(true);$element.find('input[type="search"]').trigger(focus_event);}
function close(){$element.removeClass('w-search-bar');_toggleButton('search',false);fc_ui_menu.withSearchBar(false);}
return{'open':open,'close':close};})();function _getButton(button_type){return $element.find('.navbar-toggle.navbar-toggle-'+button_type);}
function _toggleButton(button_type,state){buttons[button_type].toggleClass('active',state);}
function _toggleMenu(state,whenOpen,whenVisible){if(!state&&buttons['menu'].hasClass('active')&&fc_ui_menu.canClose()){fc_ui_menu.close();search_bar.close();_toggleButton('menu',false);if(fc_ui_menu.isSideEnabled()){top=-parseInt($('body').css('margin-top'))+top_gap-1;$('body').css('margin-top',0);fc_utils.responsive.onDocumentResize();$(window).scrollTop($(window).scrollTop()+(top-top_gap+1));}}
else if(state&&!buttons['menu'].hasClass('active')&&!fc_ui_menu.isVisible()){var hideHeader=function(){if(fc_ui_menu.isSideEnabled()){var scroll_top=$(window).scrollTop();$('body').css('margin-top',-(top-top_gap+1));fc_utils.responsive.onDocumentResize();$(window).scrollTop(scroll_top-(top-top_gap+1));top=0;}};if(buttons['search'].hasClass('active')){fc_ui_menu.withSearchBar(true);}
_toggleButton('menu',true);if(!$wrapper.hasClass('attach')){if(!fullscreen){$('body, html').animate({'scrollTop':top+1},200).promise().done(function(){_draw();if(top>0){hideHeader();}
fc_ui_menu.open(whenOpen,whenVisible);});}
else{_draw();hideHeader();fc_ui_menu.open(whenOpen,whenVisible);}}
else{hideHeader();fc_ui_menu.open(whenOpen,whenVisible);}}}
function _staticNavbar(forced){if(forced||$wrapper.hasClass('attach')){$wrapper.css('left',0);$element.css('width','auto');$wrapper.removeClass('attach');$wrapper.addClass('detach');search_bar.close();_toggleMenu(false);if(fc_utils.responsive.isOldIos()){$('#header-wrapper').removeClass('attach-old-ios');}}}
function _fixedNavbar(forced){if(forced||!$wrapper.hasClass('attach')){$element.css('width',width);$wrapper.css('left',left);$wrapper.removeClass('detach');$wrapper.addClass('attach');if(fc_utils.responsive.isOldIos()){$('#header-wrapper').addClass('attach-old-ios');}}}
function _draw(forced){var scroll_top=$(window).scrollTop();if(scroll_top>top||(buttons['menu'].hasClass('active')&&(fullscreen||forced))){_fixedNavbar(forced);}
else if(scroll_top<=top-top_gap&&!buttons['menu'].hasClass('active')){_staticNavbar(forced);}}
function _parse(){width=$placeholder.width();var offset=$placeholder.offset();top=Math.round(offset.top);top_gap=$element.find('.navbar-header').height()-$placeholder.height();left=offset.left;fullscreen=$('body').outerHeight()<$(window).height()+top+1;}
function _bind(){buttons['search'].on('click',function(e){e.preventDefault();if($(e.currentTarget).hasClass('active')){search_bar.close();}
else{search_bar.open();_gaq.push(['_trackEvent','Navbar','open','search ('+(buttons['menu'].hasClass('active')?'open':'closed')+' menu)']);}});buttons['menu'].on('click',function(e){e.preventDefault();if(!buttons['menu'].hasClass('active')){_gaq.push(['_trackEvent','Navbar','open','menu ('+($wrapper.hasClass('attach')?'fixed':'static')+' navbar)']);}
_toggleMenu(!buttons['menu'].hasClass('active'));});$element.on('toggle',function(e,data){data=data||{};if(data.button=='menu'){_toggleMenu(data.state,data.whenOpen);}
else if(data.state!=buttons[data.button].hasClass('active')){buttons[data.button].trigger('click');}});$element.on('menu_closed',function(e,data){_draw();});$('#header-register').on('click','a[data-trigger-menu]',function(e){e.preventDefault();$element.find('[data-trigger-menu="'+$(e.currentTarget).data('trigger-menu')+'"]').trigger('click',{'triggered':true});_gaq.push(['_trackEvent','Header','trigger-menu','user-area']);});$('#header-search').on('submit',function(e){_gaq.push(['_trackEvent','Header','search',$(e.target).find('input[type="search"]').val()]);});$element.on('click','.navbar-nav > li',function(e){if(!$(e.currentTarget).data('trigger-menu')){_gaq.push(['_trackEvent','Navbar','link',$.trim($(e.currentTarget).find('a').text())]);}});$element.on('click','.navbar-logo > div',function(){_gaq.push(['_trackEvent','Navbar','link','logo ('+(buttons['menu'].hasClass('active')?'open':'closed')+' menu)']);});$element.on('submit','.navbar-search-tools > form',function(e){_gaq.push(['_trackEvent','Navbar','search',(buttons['menu'].hasClass('active')?'open':'closed')+' menu, '
+($wrapper.hasClass('attach')?'fixed':'static')+' navbar ('+$(e.currentTarget).find('input[type="search"]').val()+')']);});$element.on('click','[data-trigger-menu]',function(e,data){if($(e.currentTarget).is('button')||($(e.currentTarget).is('li')&&$(e.target).is('a'))){var target=$(e.currentTarget).data('trigger-menu');data=data||{};if($(e.currentTarget).is('button.launch-login')){if(buttons['menu'].hasClass('active')){target='launch-login';_gaq.push(['_trackEvent','Navbar','launch-login','button (open menu)']);}
else{target=null;if(!data.callback){e.preventDefault();e.stopPropagation();$(e.currentTarget).trigger('click',{'callback':function(){$(e.currentTarget).trigger('click',{'triggered':true});}});_gaq.push(['_trackEvent','Navbar','launch-login','button (closed menu)']);}}}
if(target){e.preventDefault();e.stopPropagation();if(target!='launch-login'&&!data.triggered){_gaq.push(['_trackEvent','Navbar','trigger-menu',target+' ('+($(e.currentTarget).is('button')?'button':'link')+', '+(buttons['menu'].hasClass('active')?'open':'closed')+' menu)']);}
if(!buttons['menu'].hasClass('active')){_toggleMenu(true,function(){fc_ui_menu.trigger(target,true,true);},function(){if(!$(e.currentTarget).is('button')){fc_ui_menu.trigger(target,false,true);}});}
else{fc_ui_menu.trigger(target);}}}});$(window).scroll(function(){_draw();});$(document).on('window_resize',$('body'),function(e,data){data=data||{};if(data.width){_parse();_draw(true);}
$wrapper.trigger('nav_resize',data);});if(fc_utils.responsive.hasIosFixedInputBug()){focus_event='ios-fixed-focus';$wrapper.find('input.focus-on-empty-submit').each(function(){$(this).removeClass('focus-on-empty-submit');$(this).addClass('fixed-focus-on-empty-submit');});$(document).on('submit','form.no-empty-submit',function(e){var check_val='';$(e.currentTarget).find('.prevent-empty-submit').each(function(){check_val+=$.trim($(this).val());});if(check_val==''){$(e.currentTarget).find('.fixed-focus-on-empty-submit').eq(0).trigger(focus_event);}
return(check_val!='');});var wrapper_top=null;$wrapper.find('input').on('touchstart '+focus_event,function(e){if($wrapper.hasClass('attach')&&!$(e.target).data('ios-fixed-focus')){var old_style=$wrapper.attr('style');$(e.target).data('ios-fixed-focus',true);if(wrapper_top==null){wrapper_top=$wrapper.offset().top-$header_wrapper.offset().top;}
$wrapper.css({'position':'absolute','top':wrapper_top,'left':0});$(e.target).one('blur',function(){$wrapper.attr('style',old_style);$(e.target).data('ios-fixed-focus',false);});setTimeout(function(){$(window).one('scroll',function(){$(e.target).blur();wrapper_top=null;});},300);}
if(e.type==focus_event){$(e.target).focus();}});}}
function init(){buttons={'menu':_getButton('menu'),'search':_getButton('search'),'user':_getButton('user'),};if(fc_utils.responsive.isOldIos()){$element.removeClass('navbar-transition');}
if(!Modernizr.csstransforms){buttons['menu'].removeClass('navbar-toggle-menu-transform');}
fc_ui_menu.init($element);_parse();_bind();_draw();}
return{'init':init};});define("fc/ui/menu",['jquery','fc/utils','base64','jquery-bootstrap'],function($,fc_utils,base64){var $element=$('.navbar-menu');var $container=$('.navbar-menu .navbar-menu-container');var $content=$('.navbar-menu .navbar-menu-container .navbar-menu-content');var $wrapper=$('#nav-wrapper');var $navbar;var tap_event='fc_menu_tap';var legacy_scrolling=false;var scroll_top_y_offset=-100;var scroll_util_timeout=100;var scroll_util_update_timeout=50;var scroll_to_element_duration=300;var scroll_util_default_options={'tap':tap_event,'mouseWheel':true};var tap_element_duration=50;var transition_duration=300+200;var wrapper_height=null;var content_height=null;var main_scroll_util=null;var main_menu_with_transition=null;if(!$.support.transition){$.support.transition={'end':'mockTransitionEnd'};}
function _safeCallback(callback){if(typeof(callback)!="undefined"){callback();}}
function scrollUtil($scroll_element,options,tap_handlers){var util=null;var create_util_timeout=null;options=options||{};tap_handlers=tap_handlers||{};var scroll_options=$.extend({},scroll_util_default_options,options);var scroll_padding=parseInt($scroll_element.find('> div').css('padding-top'));function _bind(){if(tap_event!='click'){$scroll_element.on('click','li',function(e,data){data=data||{};if(!data.bypass){e.preventDefault();e.stopPropagation();}});}
for(element in tap_handlers){$scroll_element.on(tap_event,element,tap_handlers[element]);}}
function update(whenUpdated){if(!util){require(['iscroll'],function(IScroll){if(create_util_timeout){clearTimeout(create_util_timeout);}
create_util_timeout=setTimeout(function(){if(!$scroll_element.hasClass('default-scrolling')){try{util=new IScroll($scroll_element.selector,scroll_options);}
catch(err){tap_event='click';$scroll_element.addClass('default-scrolling');}
_bind();}
_safeCallback(whenUpdated);},scroll_util_timeout);});}
else{setTimeout(function(){util.refresh();_safeCallback(whenUpdated);},scroll_util_update_timeout);}}
function destroy(){if(util){util.destroy();util=null;}};function scrollToElement($item,y_offset,duration){if(util){if(typeof(duration)=="undefined"){duration=scroll_to_element_duration;}
var x_offset=0;y_offset=y_offset||0;if(scroll_padding&&$item.hasClass('scroll-first-item')){y_offset=-scroll_padding;}
util.scrollToElement($item.get(0),duration,x_offset,y_offset);}}
function scrollToY(y_offset,duration){if(util){if(typeof(duration)=="undefined"){duration=scroll_to_element_duration;}
util.scrollTo(0,y_offset,duration);}}
return{'update':update,'destroy':destroy,'scrollToElement':scrollToElement,'scrollToY':scrollToY}}
function menuWithTransition($menu_element,$menu_container,onShowTransitionEnd,onHideTransitionEnd){var emulation_timeout=null;function _onTransitionEnd(e){if($(e.target).is($(e.currentTarget))&&$menu_container.hasClass('pending-transition')){clearTimeout(emulation_timeout);if(!isVisible()){close();_safeCallback(onHideTransitionEnd);}
else{fullVisible();_safeCallback(onShowTransitionEnd);}
$menu_container.trigger('fc'+$.support.transition.end);$menu_container.removeClass('pending-transition');}
else if(!$(e.target).is($(e.currentTarget))){$menu_container.one($.support.transition.end,_onTransitionEnd);}}
function _emulateTransitionEnd(duration){if(emulation_timeout){clearTimeout(emulation_timeout);}
var callback=function(){$menu_container.trigger($.support.transition.end);};emulation_timeout=setTimeout(callback,duration);}
function _transition(startTransition,onTransitionEnd){$menu_container.one($.support.transition.end,_onTransitionEnd);if(typeof(onTransitionEnd)!="undefined"){_transitionOnce(onTransitionEnd);}
$menu_container.addClass('pending-transition');startTransition();_emulateTransitionEnd(transition_duration);}
function _transitionOnce(onTransitionEnd){$menu_container.unbind('fc'+$.support.transition.end);$menu_container.one('fc'+$.support.transition.end,function(){onTransitionEnd();});}
function open(){$menu_element.addClass('open');}
function close(){$menu_element.removeClass('open');}
function isOpen(){return $menu_element.hasClass('open');}
function show(onTransitionEnd){_transition(function(){$menu_element.addClass('visible');},onTransitionEnd);}
function hide(onTransitionEnd){_transition(function(){$menu_element.removeClass('visible');$menu_element.removeClass('full-visible');},onTransitionEnd);}
function fullVisible(){$menu_element.addClass('full-visible');}
function isVisible(){return $menu_element.hasClass('visible');}
function isFullVisible(){return $menu_element.hasClass('full-visible');}
return{'open':open,'close':close,'isOpen':isOpen,'show':show,'hide':hide,'isVisible':isVisible,'isFullVisible':isFullVisible}};var side_menu=function(){var $side_element=$($element.selector+' + .navbar-side-menu');var $side_container=$($element.selector+' + .navbar-side-menu .navbar-side-menu-container');var $side_content=$($element.selector+' + .navbar-side-menu .navbar-side-menu-container .navbar-side-menu-content');var side_scroll_util=null;var enabled=false;var width=0;var hidden_left=0;var left=0;var side_menu_with_transition=null;function _parse(){enabled=$element.width()<$navbar.width();if(enabled){width=$navbar.width()-$container.width();hidden_left=-(width-$container.width());left=$container.width();}}
function _draw(){_parse();if(enabled){$side_element.css('width',width);if(!side_menu_with_transition.isVisible()){$side_element.css('left',hidden_left);}
else{$side_element.css('left',left);}}}
function _bind(){$wrapper.on('nav_resize',function(e,data){data=data||{};if(data.width){_draw();}
if(side_menu_with_transition.isVisible()){side_scroll_util.update();}});}
function open($item){if(enabled){if(!side_menu_with_transition.isOpen()){$wrapper.addClass('w-side-menu');side_menu_with_transition.open();$side_element.css('left',left);}
$side_content.find('> div:first-child').html($item.find('ul').clone());side_scroll_util.update(function(){side_scroll_util.scrollToY(0,0);$side_content.find('> div:first-child img').eq(-1).load(function(){side_scroll_util.update();});});var already_visible=side_menu_with_transition.isVisible();var whenVisible=function(){$item.trigger('side_open_item',{'slide':!already_visible});};if(!already_visible){side_menu_with_transition.show(whenVisible);}
else{whenVisible();}}}
function close(whenClosed){if(side_menu_with_transition.isVisible()){side_menu_with_transition.hide(whenClosed);}}
function isEnabled(){return enabled;}
function withSearchBar(state){side_scroll_util.update();}
function init(){side_menu_with_transition=menuWithTransition($side_element,$side_container,undefined,function(){$side_content.find('> div:first-child').html('');$wrapper.removeClass('w-side-menu');$side_element.css('left',hidden_left);});_draw();var tap_handlers={'li':function(e){_gaq.push(['_trackEvent','Menu','link:'+$(e.currentTarget).data('ga-menu-level'),$(e.currentTarget).data('ga-menu-item')+' (from side)']);window.location=$(e.currentTarget).find('a').eq(0).attr('href');}};side_scroll_util=scrollUtil($side_content,{'scrollbars':true},tap_handlers);_bind();}
return{'init':init,'isEnabled':isEnabled,'open':open,'close':close,'withSearchBar':withSearchBar,'isOpen':function(){if(enabled&&side_menu_with_transition){return side_menu_with_transition.isOpen();}
return false;},'isVisible':function(){if(enabled&&side_menu_with_transition){return side_menu_with_transition.isVisible();}
return false;}}}();function _bind(){$wrapper.on('nav_resize',function(e,data){data=data||{};_parse();if(data.width){if(side_menu.isEnabled()){if(!$container.hasClass('expandable-menu-images')){$container.addClass('expandable-menu-images');$container.find('img[data-src]').each(function(){$(this).attr('src',$(this).data('src'));});}
var $active_item=$content.find('.expandable-side.expanded');if($active_item.length>0){if(!$active_item.hasClass('expanded-side')){$active_item.addClass('expanded-side');_toggleSideMenu(true,$active_item);}
_scrollIntoViewport($active_item);}
if($content.find('.expandable-side.expanded.expanded-side').length==0){_toggleSideMenu(false);}}
else{var $active_item=$content.find('.expanded.expandable-side.expanded-side');if($active_item.length>0){$active_item.removeClass('expanded-side');main_scroll_util.scrollToElement($active_item);_toggleSideMenu(false);}}}
if(main_menu_with_transition.isVisible()){if(data.height){_parseWrapperHeight();$wrapper.css('height',wrapper_height);_parse();}
main_scroll_util.update();}});$wrapper.on('nav_changed',function(){var zero_scroll=!main_menu_with_transition.isVisible();var whenChanged=function(){if($element.data('trigger-on-nav-change')){trigger($element.data('trigger-on-nav-change'),undefined,zero_scroll);$element.data('trigger-on-nav-change',undefined);}};if($element.hasClass('reopen-on-nav-change')){$navbar.trigger('toggle',{'button':'menu','state':true,'whenOpen':whenChanged});$element.removeClass('reopen-on-nav-change')}
else if(main_menu_with_transition.isVisible()){main_scroll_util.update(whenChanged);}});$content.on('closed_item','li',function(e){e.stopPropagation();$(e.currentTarget).removeClass('expanded expanded-side linked-side linked-side-slide');$(e.currentTarget).find('.expanded').removeClass('expanded expanded-side linked-side linked-side-slide');});$content.on('side_open_item','li',function(e,data){e.stopPropagation();data=data||{'slide':true};$(e.currentTarget).toggleClass('linked-side-slide',data.slide);$(e.currentTarget).addClass('linked-side');});}
function _parse(){content_height=$content.height()||$container.height();}
function _parseWrapperHeight(){$wrapper.css('bottom',0);$wrapper.css('height','auto');wrapper_height=$wrapper.height();$wrapper.css('bottom','auto');}
function _toggleSideMenu(state,$item,whenClosed){if(state){$element.removeClass('fold-slide');$element.addClass('fold');side_menu.open($item);}
else{side_menu.close(function(){$element.addClass('fold-slide');$element.removeClass('fold');_safeCallback(whenClosed);});}}
function _toggleItem($item,state,data){data=data||{};if(!$content.hasClass('expandable-menu')){return;}
$item.addClass('tapped');if($item.find('.expand-button:visible').length>0){setTimeout(function(){$item.removeClass('tapped');$item.toggleClass('expanded',state);var go_deep=(data.open_first_child||$item.find('> ul > li').not('.expanded').length==1);var on_side=(side_menu.isEnabled()&&$item.hasClass('expandable-side'));if(on_side){$item.toggleClass('expanded-side',state);}
if($item.hasClass('expanded')){$item.siblings().trigger('closed_item');if(on_side&&!data.prevent_side){_toggleSideMenu(true,$item);}
else if(!go_deep){_toggleSideMenu(false);}
if(!data.triggered){_gaq.push(['_trackEvent','Menu','open:'+$item.data('ga-menu-level'),$item.data('ga-menu-item')+' (to '+(on_side?'side':'main')+')']);}}
else{$item.trigger('closed_item');_toggleSideMenu(false);}
main_scroll_util.update(function(){if($item.hasClass('expanded')){if(go_deep){_toggleItem($item.find('> ul > li.expandable, > ul > li.expandable-sm').eq(0),state,data)}
else{var scroll_duration=(data.zero_scroll?0:undefined);if(!on_side){main_scroll_util.scrollToElement($item,undefined,scroll_duration);}
else{_scrollIntoViewport($item,scroll_duration);}}}});},tap_element_duration);}
else{_gaq.push(['_trackEvent','Menu','link:'+$item.data('ga-menu-level'),$item.data('ga-menu-item')+' (from main)']);window.location=$item.find('a').attr('href');}}
function _scrollIntoViewport($item,duration){var offset=($item.hasClass('expanded-side')?scroll_top_y_offset:0);var top=$content.offset().top;var bottom=top+content_height;if(offset!=0){top+=$item.height();bottom-=$item.height()*2;}
if($item.offset().top<top||$item.offset().top>bottom){main_scroll_util.scrollToElement($item,offset,duration);}}
function open(whenOpen,whenVisible){if(!main_menu_with_transition.isOpen()){$wrapper.addClass('w-menu');_parseWrapperHeight();$wrapper.css('height',wrapper_height);main_menu_with_transition.open();_parse();if(fc_utils.responsive.hasIosFixedInputBug()&&$element.hasClass('w-search-bar')){var whenVisibleCallBack=whenVisible;whenVisible=function(){_safeCallback(whenVisibleCallBack);_parseWrapperHeight();$wrapper.css('height',wrapper_height);_parse();main_scroll_util.update();};}}
if(!$content.hasClass('expandable-menu')){$content.load(fc_utils.urls.get('menu',[(side_menu.isEnabled()?1:0)])+'?next='+base64.decode(window.next_page),function(data,textStatus){if(textStatus=="success"){$(this).addClass('expandable-menu');if(side_menu.isEnabled()){$(this).addClass('expandable-menu-images');}}
$(this).find('ul.site-nav > li:first-child').addClass('scroll-first-item');main_scroll_util.update(function(){if(textStatus=="success"){_safeCallback(whenOpen);_safeCallback(whenVisible);}});});}
else{main_scroll_util.update(function(){if($content.find('.expanded').length>0){_scrollIntoViewport($content.find('.expanded').eq(-1),0);}
else{main_scroll_util.scrollToY(0,0);}
_safeCallback(whenOpen);});}
if(!main_menu_with_transition.isVisible()){main_menu_with_transition.show(whenVisible);}}
function close(){if(main_menu_with_transition.isOpen()){var whenSideClosed=function(){if(main_menu_with_transition.isVisible()){main_menu_with_transition.hide();}};if($content.find('.expanded-side').length>0){_toggleSideMenu(false,null,whenSideClosed);$content.find('.expanded-side').removeClass('linked-side');}
else{whenSideClosed();}}}
function withSearchBar(state){if(state||(main_menu_with_transition.isVisible()&&(side_menu.isVisible()||!side_menu.isOpen()))||(!side_menu.isOpen()&&!main_menu_with_transition.isOpen())){$element.toggleClass('w-search-bar',state);_parse();if(main_menu_with_transition.isVisible()){main_scroll_util.update();}
if(side_menu.isVisible()){side_menu.withSearchBar(state);}}}
function trigger(target,prevent_side,zero_scroll){prevent_side=prevent_side||false;zero_scroll=zero_scroll||false;var $item=$content.find('li[data-menu-target="'+target+'"]');if($item.length>0){if(!$item.is('#user-menu-utils li')&&!$item.hasClass('expanded')){_toggleItem($item,true,{'triggered':true,'prevent_side':prevent_side,'zero_scroll':zero_scroll});}
else if(target=='launch-login'){$item.trigger(tap_event,{'no_highlight':true,'triggered':true});}
else{main_scroll_util.update(function(){if($item.is('.site-nav > li')&&$item.find('li.expanded').length>0){$item=$item.find('li.expanded').eq(0);}
if($item.hasClass('expanded-side')&&!side_menu.isOpen()&&!prevent_side){_toggleSideMenu(true,$item);}
if(!$item.is('#user-menu-utils li')){_scrollIntoViewport($item,0);}
else{if($content.find('li.expanded').length>0){$content.find('li.expanded').trigger('closed_item');if(side_menu.isOpen()){_toggleSideMenu(false);}}
main_scroll_util.update(function(){main_scroll_util.scrollToElement($item,($item.is(':first-child')?parseInt($('#user-menu-utils').css('margin-top')):0),(zero_scroll?0:undefined));});}});}}}
function init($_navbar){$navbar=$_navbar;$content.find('> div').prepend($navbar.find('.navbar-nav').clone().removeClass('nav navbar-nav'));var tap_handlers={'.site-nav li':function(e,data){e.stopPropagation();e.preventDefault();data=data||{};if($(e.target).is('ul, li:not(.expanded-side)')&&$(e.currentTarget).hasClass('expanded')){e.preventDefault();}
else{_toggleItem($(e.currentTarget),!$(e.currentTarget).hasClass('expanded'),data);}},'#user-menu-utils li':function(e,data){data=data||{};if(!data.no_highlight){$(e.currentTarget).addClass('tapped');}
if($(e.currentTarget).find('a.launch-login, a.logout').length>0){e.stopPropagation();e.preventDefault();$(e.currentTarget).find('a').trigger('click',{'bypass':true});if(!$(e.currentTarget).find('a').hasClass('logout')){$element.data('trigger-on-nav-change','user-area');if(!data.triggered){_gaq.push(['_trackEvent','Menu','launch-login']);}}
if(!side_menu.isEnabled()){$element.addClass('reopen-on-nav-change');$navbar.trigger('toggle',{'button':'menu','state':false});}
else{var $item=$(e.currentTarget);setTimeout(function(){$item.removeClass('tapped');},tap_element_duration);}}
else{window.location=$(e.currentTarget).find('a').attr('href');}}};main_scroll_util=scrollUtil($content,{},tap_handlers);side_menu.init();main_menu_with_transition=menuWithTransition($element,$container,function(){if($content.find('.expanded-side').length>0){_toggleSideMenu(true,$content.find('.expanded-side'));}},function(){$wrapper.css('height','auto');$wrapper.removeClass('w-menu');$element.removeClass('w-search-bar');$element.find('li.tapped').removeClass('tapped');$navbar.trigger('menu_closed');});_bind();}
return{'init':init,'open':open,'close':close,'withSearchBar':withSearchBar,'trigger':trigger,'isSideEnabled':function(){return side_menu.isEnabled();},'isOpen':function(){return main_menu_with_transition.isOpen();},'isVisible':function(){return main_menu_with_transition.isVisible();},'canClose':function(){return main_menu_with_transition.isFullVisible()||($content.find('.expanded-side').length==0);}};});define("fc/ui/site_updates",['jquery','fc/ui/highlighted_sources','fc/ui/highlighted_sources_scroll','fc/utils','setup'],function($,fc_ui_highlighted_sources,fc_ui_highlighted_sources_scroll,fc_utils){function bind(){if($('#blog_events').length>0){fc_ui_highlighted_sources_scroll.init($('#blog_events'),{"initial_offset":25,"hide_offset":true});}
fc_ui_highlighted_sources_scroll.init($('#author_events'),{"initial_offset":25,"hide_offset":true});fc_ui_highlighted_sources_scroll.init($('#source_events'),{"initial_offset":25,"hide_offset":true});}
function init(){if($('.empty-updates').length>0){$('.site-updates').load(fc_utils.urls.get('site_updates_snippet',[1]),function(response,status,xhr){if(status=='success'){fc_utils.responsive.onDocumentResize();$('.empty-updates').removeClass('empty-updates');bind();}});}
else if($('.site-updates').length>0){bind();}}
return{'init':init};});