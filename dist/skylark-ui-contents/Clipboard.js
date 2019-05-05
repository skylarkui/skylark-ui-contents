/**
 * skylark-ui-contents - A dom plugin for  editing  the content of html element.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.0
 * @link www.skylarkjs.org
 * @license MIT
 */
define(["skylark-langx/langx","skylark-utils-dom/query","./contents"],function(t,e,i){var o=t.Evented.inherit({});return o.pluginName="Clipboard",o.prototype.opts={pasteImage:!1,cleanPaste:!1},o.prototype.init=function(e,i){var o;this.editor=e,this.opts=t.extend({},this.opts,i),this.opts.pasteImage&&"string"!=typeof this.opts.pasteImage&&(this.opts.pasteImage="inline"),this.editor.body.on("paste",(o=this,function(t){var e;if(!o.pasting&&!o._pasteBin)return!1!==o.editor.triggerHandler(t)&&(e=o.editor.selection.deleteRangeContents(),o.editor.body.html()?e.collapsed||e.collapse(!0):(o.editor.formatter.format(),o.editor.selection.setRangeAtStartOf(o.editor.body.find("p:first"))),!o._processPasteByClipboardApi(t)&&(o.editor.inputManager.throttledValueChanged.clear(),o.editor.inputManager.throttledSelectionChanged.clear(),o.editor.undoManager.throttledPushState.clear(),o.editor.selection.reset(),o.editor.undoManager.resetCaretPosition(),o.pasting=!0,o._getPasteContent(function(t){return o._processPasteContent(t),o._pasteInBlockEl=null,o._pastePlainText=null,o.pasting=!1})))}))},o.prototype._processPasteByClipboardApi=function(t){var e,i,o,n;if(!this.editor.util.browser.edge&&t.originalEvent.clipboardData&&t.originalEvent.clipboardData.items&&t.originalEvent.clipboardData.items.length>0&&(i=t.originalEvent.clipboardData.items[0],/^image\//.test(i.type))){if(null==(e=i.getAsFile())||!this.opts.pasteImage)return;if(e.name||(e.name="Clipboard Image.png"),!1===this.editor.triggerHandler("pasting",[e]))return;return(n={})[this.opts.pasteImage]=!0,null!=(o=this.editor.uploader)&&o.upload(e,n),!0}},o.prototype._getPasteContent=function(t){var i,o;return this._pasteBin=e('<div contenteditable="true" />').addClass(this.opts.classPrefix+"paste-bin").attr("tabIndex","-1").appendTo(this.editor.el),i={html:this.editor.body.html(),caret:this.editor.undoManager.caretPosition()},this._pasteBin.focus(),setTimeout((o=this,function(){var n;return o.editor.hidePopover(),o.editor.body.get(0).innerHTML=i.html,o.editor.undoManager.caretPosition(i.caret),o.editor.body.focus(),o.editor.selection.reset(),o.editor.selection.range(),o._pasteInBlockEl=o.editor.selection.blockNodes().last(),o._pastePlainText=o.opts.cleanPaste||o._pasteInBlockEl.is("pre, table"),o._pastePlainText?n=o.editor.formatter.clearHtml(o._pasteBin.html(),!0):((n=e("<div/>").append(o._pasteBin.contents())).find("style").remove(),n.find("table colgroup").remove(),o._cleanPasteFontSize(n),o.editor.formatter.format(n),o.editor.formatter.decorate(n),o.editor.formatter.beautify(n.children()),n=n.contents()),o._pasteBin.remove(),o._pasteBin=null,t(n)}),0)},o.prototype._processPasteContent=function(t){var i,o,n,r,s,a,l,d,p,c,h,g,f,u,m,b,v,y,_,I,P,E,C,x,B,k;if(!1!==this.editor.triggerHandler("pasting",[t])&&(i=this._pasteInBlockEl,t)){if(this._pastePlainText)if(i.is("table")){for(c=(v=t.split("\n")).pop(),d=0,h=v.length;d<h;d++)b=v[d],this.editor.selection.insertNode(document.createTextNode(b)),this.editor.selection.insertNode(e("<br/>"));this.editor.selection.insertNode(document.createTextNode(c))}else for(p=0,g=(E=(t=e("<div/>").text(t)).contents()).length;p<g;p++)_=E[p],this.editor.selection.insertNode(e(_)[0]);else if(i.is(this.editor.body))for(y=0,f=t.length;y<f;y++)_=t[y],this.editor.selection.insertNode(_);else{if(t.length<1)return;if(1===t.length)if(t.is("p")){if(r=t.contents(),i.is("h1, h2, h3, h4, h5")&&r.length&&r.css("font-size",""),1===r.length&&r.is("img")){if(/^data:image/.test((o=r).attr("src"))){if(!this.opts.pasteImage)return;return(n=this.editor.util.dataURLtoBlob(o.attr("src"))).name="Clipboard Image.png",(B={})[this.opts.pasteImage]=!0,void(null!=(C=this.editor.uploader)&&C.upload(n,B))}if(new RegExp("^blob:"+location.origin+"/").test(o.attr("src"))){if(!this.opts.pasteImage)return;return(B={})[this.opts.pasteImage]=!0,s=this.editor.util.dataURLtoBlob,k=this.editor.uploader,(a=new Image).onload=function(){var t;(t=document.createElement("canvas")).width=a.naturalWidth,t.height=a.naturalHeight,t.getContext("2d").drawImage(a,0,0),(n=s(t.toDataURL("image/png"))).name="Clipboard Image.png",null!==k&&k.upload(n,B)},void(a.src=o.attr("src"))}if(o.is('img[src^="webkit-fake-url://"]'))return}for(I=0,u=r.length;I<u;I++)_=r[I],this.editor.selection.insertNode(_)}else if(i.is("p")&&this.editor.util.isEmptyNode(i))i.replaceWith(t),this.editor.selection.setRangeAtEndOf(t);else if(t.is("ul, ol"))if(1===t.find("li").length)for(P=0,m=(x=(t=e("<div/>").text(t.text())).contents()).length;P<m;P++)_=x[P],this.editor.selection.insertNode(e(_)[0]);else i.is("li")?(i.parent().after(t),this.editor.selection.setRangeAtEndOf(t)):(i.after(t),this.editor.selection.setRangeAtEndOf(t));else i.after(t),this.editor.selection.setRangeAtEndOf(t);else i.is("li")&&(i=i.parent()),this.editor.selection.rangeAtStartOf(i)?l="before":this.editor.selection.rangeAtEndOf(i)?l="after":(this.editor.selection.breakBlockEl(i),l="before"),i[l](t),this.editor.selection.setRangeAtEndOf(t.last())}return this.editor.inputManager.throttledValueChanged()}},o.prototype._cleanPasteFontSize=function(i){var o,n;if((o=e(i)).length>0)return n=["1.5em","1.25em","0.75em","0.5em"],o.find('[style*="font-size"]').map(function(i,o){var r;if(r=e(o),t.inArray(r.css("font-size"),n)<0)return r.css("font-size","")})},i.Clipboard=o});
//# sourceMappingURL=sourcemaps/Clipboard.js.map
