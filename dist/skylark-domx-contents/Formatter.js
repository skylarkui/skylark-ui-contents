/**
 * skylark-domx-contents - A dom plugin for  editing  the content of html element.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.0
 * @link www.skylarkjs.org
 * @license MIT
 */
define(["skylark-langx/langx","skylark-domx-query","./contents"],function(t,e,n){var r=[].indexOf,l=t.Evented.inherit({opts:{allowedTags:[],allowedAttributes:{},allowedStyles:{}},init:function(e,n){this.editable=e,this.opts=t.extend({},this.opts,n),this._allowedTags=t.merge(["br","span","a","img","b","strong","i","strike","u","font","p","ul","ol","li","blockquote","pre","code","h1","h2","h3","h4","hr"],this.opts.allowedTags),this._allowedAttributes=t.extend({img:["src","alt","width","height","data-non-image"],a:["href","target","download"],font:["color"],code:["class"]},this.opts.allowedAttributes),this._allowedStyles=t.extend({span:["color","font-size","background-color","background"],b:["color","font-size","background-color","background"],i:["color","font-size","background-color","background"],strong:["color","font-size","background-color","background"],strike:["color","font-size","background-color","background"],u:["color","font-size","background-color","background"],p:["margin-left","text-align","background-color","background"],h1:["margin-left","text-align"],h2:["margin-left","text-align"],h3:["margin-left","text-align"],h4:["margin-left","text-align"]},this.opts.allowedStyles),this.editable.body.on("click","a",function(t){return!1})},decorate:function(t){return null==t&&(t=this.editable.body),this.editable.trigger("decorate",[t]),t},undecorate:function(t){return null==t&&(t=this.editable.body.clone()),this.editable.trigger("undecorate",[t]),t},autolink:function(t){var n,r,l,o,i,a,s,d,c,u,h,p,g;for(null==t&&(t=this.editable.body),s=[],(l=function(n){return n.contents().each(function(n,r){var o,i;if(!(o=e(r)).is("a")&&!o.closest("a, pre",t).length)return!o.is("iframe")&&o.contents().length?l(o):(i=o.text())&&/https?:\/\/|www\./gi.test(i)?s.push(o):void 0})})(t),c=/(https?:\/\/|www\.)[\w\-\.\?&=\/#%:,@\!\+]+/gi,o=0,a=s.length;o<a;o++){for(p=(r=s[o]).text(),u=[],d=null,i=0;null!==(d=c.exec(p));)h=p.substring(i,d.index),u.push(document.createTextNode(h)),i=c.lastIndex,g=/^(http(s)?:\/\/|\/)/.test(d[0])?d[0]:"http://"+d[0],n=e('<a href="'+g+'" rel="nofollow"></a>').text(d[0]),u.push(n[0]);u.push(document.createTextNode(p.substring(i))),r.replaceWith(e(u))}return t},format:function(t){var n,r,l,o,i,a,s,d,c,u;if(null==t&&(t=this.editable.body),t.is(":empty"))return t.append("<p></p>"),t;for(l=0,i=(c=t.contents()).length;l<i;l++)s=c[l],this.cleanNode(s,!0);for(o=0,a=(u=t.contents()).length;o<a;o++)d=u[o],(n=e(d)).is("br")?(void 0!==r&&null!==r&&(r=null),n.remove()):this.editable.util.isBlockNode(d)?n.is("li")?r&&r.is("ul, ol")?r.append(d):(r=e("<ul/>").insertBefore(d)).append(d):r=null:(r&&!r.is("ul, ol")||(r=e("<p/>").insertBefore(d)),r.append(d),this.editable.util.isEmptyNode(r)&&r.append(this.editable.util.phBr));return t},cleanNode:function(n,l){var o,i,a,s,d,c,u,h,p,g,f,b,m,y,w,x,k,v;if((a=e(n)).length>0){if(3!==a[0].nodeType){if(h=a.is("iframe")?null:a.contents(),p=this.editable.util.isDecoratedNode(a),a.is(this._allowedTags.join(","))||p){if(a.is("a")&&(i=a.find("img")).length>0&&(a.replaceWith(i),a=i,h=null),a.is("td")&&(o=a.find(this.editable.util.blockNodes.join(","))).length>0&&(o.each(function(t,n){return e(n).contents().unwrap()}),h=a.contents()),a.is("img")&&a.hasClass("uploading")&&a.remove(),!p){for(c=this._allowedAttributes[a[0].tagName.toLowerCase()],g=0,b=(w=t.makeArray(a[0].attributes)).length;g<b;g++)"style"!==(u=w[g]).name&&(null!=c&&(x=u.name,r.call(c,x)>=0)||a.removeAttr(u.name));this._cleanNodeStyles(a),a.is("span")&&(0===a[0].attributes.length&&a.contents().first().unwrap(),2===a[0].style.length&&"rgb(51, 51, 51)"===a[0].style.color&&"16px"===a[0].style.fontSize&&a.contents().unwrap())}}else 1!==a[0].nodeType||a.is(":empty")?(a.remove(),h=null):a.is("div, article, dl, header, footer, tr")?(a.append("<br/>"),h.first().unwrap()):a.is("table")?(s=e("<p/>"),a.find("tr").each(function(t,n){return s.append(e(n).text()+"<br/>")}),a.replaceWith(s),h=null):a.is("thead, tfoot")?(a.remove(),h=null):a.is("th")?(d=e("<td/>").append(a.contents()),a.replaceWith(d)):h.first().unwrap();if(l&&null!=h&&!a.is("pre"))for(f=0,m=h.length;f<m;f++)y=h[f],this.cleanNode(y,!0);return null}(k=a.text().replace(/(\r\n|\n|\r)/gm,""))?(v=document.createTextNode(k),a.replaceWith(v)):a.remove()}},_cleanNodeStyles:function(e){var n,l,o,i,a,s,d,c,u;if(c=e.attr("style")){if(e.removeAttr("style"),!((n=this._allowedStyles[e[0].tagName.toLowerCase()])&&n.length>0))return e;for(u={},l=0,o=(a=c.split(";")).length;l<o;l++)d=a[l],2===(i=(d=t.trim(d)).split(":")).length&&("font-size"===i[0]&&i[1].indexOf("px")>0&&parseInt(i[1],10)<12||(s=i[0],r.call(n,s)>=0&&(u[t.trim(i[0])]=t.trim(i[1]))));return Object.keys(u).length>0&&e.css(u),e}},clearHtml:function(t,n){var r,l,o,i;return null==n&&(n=!0),r=e("<div/>").append(t),l=r.contents(),o="",l.each((i=this,function(t,r){var a,s;return 3===r.nodeType?o+=r.nodeValue:1===r.nodeType&&((s=(a=e(r)).is("iframe")?null:a.contents())&&s.length>0&&(o+=i.clearHtml(s)),n&&t<l.length-1&&a.is("br, p, div, li,tr, pre, address, artticle, aside, dl, figcaption, footer, h1, h2,h3, h4, header"))?o+="\n":void 0})),o},beautify:function(t){var n,r=this;return n=function(t){return!!(t.is("p")&&!t.text()&&t.children(":not(br)").length<1)},t.each(function(t,l){var o;return((o=e(l)).is(':not(img, br, col, td, hr, [class^="'+r.opts.classPrefix+'"]):empty')||n(o))&&o.remove(),o.find(':not(img, br, col, td, hr, [class^="'+r.opts.classPrefix+'"]):empty').remove()})}});return l.pluginName="Formatter",n.Formatter=l});
//# sourceMappingURL=sourcemaps/Formatter.js.map
