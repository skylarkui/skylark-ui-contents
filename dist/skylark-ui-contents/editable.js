/**
 * skylark-ui-contents - A dom plugin for  editing  the content of html element.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.0
 * @link www.skylarkjs.org
 * @license MIT
 */
define(["skylark-langx/langx","skylark-utils-dom/query","./contents","./hotkeys","./Util","./InputManager","./Selection","./UndoManager","./Keystroke","./Formatter","./Indentation","./Clipboard"],function(t,i,s,n,a,r,o,l,h,d,u,c){var f=t.Evented.inherit({init:function(t,s){this.el=t,this.textarea=i(s.textarea),this.body=i(s.body);var f={classPrefix:s.classPrefix};if(this.util=new a(this,f),!n)throw new Error("simditor: simple-hotkeys is required.");if(this.hotkeys=n({el:this.body}),this.inputManager=new r(this,f),this.selection=new o(this,f),this.undoManager=new l(this,f),this.keystroke=new h(this,f),this.formatter=new d(this,f),this.indentation=new u(this,f),this.clipboard=new c(this,f),this.util.os.mac?this.el.addClass(s.classPrefix+"mac"):this.util.os.linux&&this.el.addClass(s.classPrefix+"linux"),this.util.os.mobile&&this.el.addClass(s.classPrefix+"mobile"),this.util.browser.mozilla){this.util.reflow();try{return document.execCommand("enableObjectResizing",!1,!1),document.execCommand("enableInlineTableEditing",!1,!1)}catch(t){e=t}}},setValue:function(t){this.textarea.val(t),this.body.get(0).innerHTML=t,this.formatter.format(),this.formatter.decorate(),this.util.reflow(this.body),this.inputManager.lastCaretPosition=null},getValue:function(){return this.sync()},sync:function(){var i,e,s,n,a,r;for(e=this.body.clone(),this.formatter.undecorate(e),this.formatter.format(e),this.formatter.autolink(e),a=(i=e.children()).last("p"),n=i.first("p");a.is("p")&&this.util.isEmptyNode(a);)s=a,a=a.prev("p"),s.remove();for(;n.is("p")&&this.util.isEmptyNode(n);)s=n,n=a.next("p"),s.remove();return e.find("img.uploading").remove(),r=t.trim(e.html()),this.textarea.val(r),r},focus:function(){var t,e;if(this.body.is(":visible")&&this.body.is("[contenteditable]"))return this.inputManager.lastCaretPosition?(this.undoManager.caretPosition(this.inputManager.lastCaretPosition),this.inputManager.lastCaretPosition=null):((t=this.body.children().last()).is("p")||(t=i("<p/>").append(this.util.phBr).appendTo(this.body)),e=document.createRange(),this.selection.setRangeAtEndOf(t,e));this.el.find("textarea:visible").focus()},blur:function(){return this.body.is(":visible")&&this.body.is("[contenteditable]")?this.body.blur():this.body.find("textarea:visible").blur()}});return s.editable=function(t,i){return new f(t,i)}});
//# sourceMappingURL=sourcemaps/editable.js.map
