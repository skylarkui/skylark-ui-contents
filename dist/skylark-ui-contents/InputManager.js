/**
 * skylark-ui-contents - A dom plugin for  editing  the content of html element.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.0
 * @link www.skylarkjs.org
 * @license MIT
 */
define(["skylark-langx/langx","skylark-utils-dom/query","./contents"],function(t,e,i){var o=[].indexOf,r=t.Evented.inherit({init:function(i,o){var r,n,s;this.editor=i,this.opts=t.extend({},this.opts,o),this.throttledValueChanged=this.editor.util.throttle((s=this,function(t){return setTimeout(function(){return s.editor.trigger("valuechanged",t)},10)}),300),this.throttledSelectionChanged=this.editor.util.throttle(function(t){return function(){return t.editor.trigger("selectionchanged")}}(this),50),e(document).on("selectionchange.simditor"+this.editor.id,function(t){return function(e){var i;if(t.focused&&!t.editor.clipboard.pasting)return(i=function(){return t._selectionTimer&&(clearTimeout(t._selectionTimer),t._selectionTimer=null),t.editor.selection._selection.rangeCount>0?t.throttledSelectionChanged():t._selectionTimer=setTimeout(function(){if(t._selectionTimer=null,t.focused)return i()},10)})()}}(this)),this.editor.on("valuechanged",function(t){return function(){var i;if(t.lastCaretPosition=null,i=t.editor.body.children().filter(function(e,i){return t.editor.util.isBlockNode(i)}),t.focused&&0===i.length&&(t.editor.selection.save(),t.editor.formatter.format(),t.editor.selection.restore()),t.editor.body.find("hr, pre, ."+t.opts.classPrefix+"table").each(function(i,o){var r,n;if(((r=e(o)).parent().is("blockquote")||r.parent()[0]===t.editor.body[0])&&(n=!1,0===r.next().length&&(e("<p/>").append(t.editor.util.phBr).insertAfter(r),n=!0),0===r.prev().length&&(e("<p/>").append(t.editor.util.phBr).insertBefore(r),n=!0),n))return t.throttledValueChanged()}),t.editor.body.find("pre:empty").append(t.editor.util.phBr),!t.editor.util.support.onselectionchange&&t.focused)return t.throttledSelectionChanged()}}(this)),this.editor.body.on("keydown",t.proxy(this._onKeyDown,this)).on("keypress",t.proxy(this._onKeyPress,this)).on("keyup",t.proxy(this._onKeyUp,this)).on("mouseup",t.proxy(this._onMouseUp,this)).on("focus",t.proxy(this._onFocus,this)).on("blur",t.proxy(this._onBlur,this)).on("drop",t.proxy(this._onDrop,this)).on("input",t.proxy(this._onInput,this)),this.editor.util.browser.firefox&&(this.editor.hotkeys.add("cmd+left",function(t){return function(e){return e.preventDefault(),t.editor.selection._selection.modify("move","backward","lineboundary"),!1}}(this)),this.editor.hotkeys.add("cmd+right",function(t){return function(e){return e.preventDefault(),t.editor.selection._selection.modify("move","forward","lineboundary"),!1}}(this)),r=this.editor.util.os.mac?"cmd+a":"ctrl+a",this.editor.hotkeys.add(r,function(t){return function(e){var i,o,r,n;if((i=t.editor.body.children()).length>0)return o=i.first().get(0),r=i.last().get(0),(n=document.createRange()).setStart(o,0),n.setEnd(r,t.editor.util.getNodeLength(r)),t.editor.selection.range(n),!1}}(this))),n=this.editor.util.os.mac?"cmd+enter":"ctrl+enter",this.editor.hotkeys.add(n,function(t){return function(e){return t.editor.el.closest("form").find("button:submit").click(),!1}}(this))}});return r.pluginName="InputManager",r.prototype._modifierKeys=[16,17,18,91,93,224],r.prototype._arrowKeys=[37,38,39,40],r.prototype._onFocus=function(t){var e;if(!this.editor.clipboard.pasting)return this.editor.el.addClass("focus").removeClass("error"),this.focused=!0,setTimeout((e=this,function(){var t,i;if((i=e.editor.selection._selection.getRangeAt(0)).startContainer===e.editor.body[0]&&(e.lastCaretPosition?e.editor.undoManager.caretPosition(e.lastCaretPosition):(t=e.editor.body.children().first(),i=document.createRange(),e.editor.selection.setRangeAtStartOf(t,i),console.log("aaaaaa"))),e.lastCaretPosition=null,e.editor.triggerHandler("focus"),!e.editor.util.support.onselectionchange)return e.throttledSelectionChanged()}),0)},r.prototype._onBlur=function(t){var e;if(!this.editor.clipboard.pasting)return this.editor.el.removeClass("focus"),this.editor.sync(),this.focused=!1,this.lastCaretPosition=null!=(e=this.editor.undoManager.currentState())?e.caret:void 0,this.editor.triggerHandler("blur")},r.prototype._onMouseUp=function(t){if(!this.editor.util.support.onselectionchange)return this.throttledSelectionChanged()},r.prototype._onKeyDown=function(t){var e,i;if(!1===this.editor.triggerHandler(t))return!1;if(!this.editor.hotkeys.respondTo(t)){if(this.editor.keystroke.respondTo(t))return this.throttledValueChanged(),!1;if(!(e=t.which,o.call(this._modifierKeys,e)>=0||(i=t.which,o.call(this._arrowKeys,i)>=0)||this.editor.util.metaKey(t)&&86===t.which))return this.editor.util.support.oninput||this.throttledValueChanged(["typing"]),null}},r.prototype._onKeyPress=function(t){if(!1===this.editor.triggerHandler(t))return!1},r.prototype._onKeyUp=function(t){var i,r;if(!1===this.editor.triggerHandler(t))return!1;!this.editor.util.support.onselectionchange&&(r=t.which,o.call(this._arrowKeys,r)>=0)?this.throttledValueChanged():8!==t.which&&46!==t.which||!this.editor.util.isEmptyNode(this.editor.body)||(this.editor.body.empty(),i=e("<p/>").append(this.editor.util.phBr).appendTo(this.editor.body),this.editor.selection.setRangeAtStartOf(i))},r.prototype._onDrop=function(t){return!1!==this.editor.triggerHandler(t)&&this.throttledValueChanged()},r.prototype._onInput=function(t){return this.throttledValueChanged(["oninput"])},i.InputManager=r});
//# sourceMappingURL=sourcemaps/InputManager.js.map
