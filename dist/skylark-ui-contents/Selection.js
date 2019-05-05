/**
 * skylark-ui-contents - A dom plugin for  editing  the content of html element.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.0
 * @link www.skylarkjs.org
 * @license MIT
 */
define(["skylark-langx/langx","skylark-utils-dom/noder","skylark-utils-dom/query","./contents"],function(e,t,n,s){var r=e.Evented.inherit({_range:null,_startNodes:null,_endNodes:null,_containerNode:null,_nodes:null,_blockNodes:null,_rootNodes:null,init:function(t,n){var s=this;this.editor=t,this.opts=e.extend({},this.opts,n),this._selection=document.getSelection(),this.editor.on("selectionchanged",function(e){return console.log("selectionchanged"),s.reset(),s._range=s._selection.getRangeAt(0)}),this.editor.on("blur",function(e){return s.reset()}),this.editor.on("focus",function(e){return s.reset(),s._range=s._selection.getRangeAt(0)})},reset:function(){return this._range=null,this._startNodes=null,this._endNodes=null,this._containerNode=null,this._nodes=null,this._blockNodes=null,this._rootNodes=null},clear:function(){try{this._selection.removeAllRanges(),console.log("clear")}catch(e){e}return this.reset()},range:function(t){var n;return t?(this.clear(),this._selection.addRange(t),this._range=t,n=e.hoster.browser.mozilla||e.hoster.browser.msie,!this.editor.inputManager.focused&&n&&this.editor.body.focus()):!this._range&&this.editor.inputManager.focused&&this._selection.rangeCount&&(this._range=this._selection.getRangeAt(0)),this._range},startNodes:function(){var e;return this._range&&(this._startNodes||(this._startNodes=(e=this,function(){var t;return(t=n(e._range.startContainer).parentsUntil(e.editor.body).get()).unshift(e._range.startContainer),n(t)})())),this._startNodes},endNodes:function(){var e;return this._range&&(this._endNodes||(this._endNodes=this._range.collapsed?this.startNodes():((e=n(this._range.endContainer).parentsUntil(this.editor.body).get()).unshift(this._range.endContainer),n(e)))),this._endNodes},containerNode:function(){return this._range&&(this._containerNode||(this._containerNode=n(this._range.commonAncestorContainer))),this._containerNode},nodes:function(){var t;return this._range&&(this._nodes||(this._nodes=(t=this,function(){var s;return s=[],t.startNodes().first().is(t.endNodes().first())?s=t.startNodes().get():(t.startNodes().each(function(r,i){var o,a,d,l,c,h,u;return a=n(i),t.endNodes().index(a)>-1?s.push(i):a.parent().is(t.editor.body)||(h=t.endNodes().index(a.parent()))>-1?(o=h&&h>-1?t.endNodes().eq(h-1):t.endNodes().last(),u=(d=a.parent().contents()).index(a),l=d.index(o),e.merge(s,d.slice(u,l).get())):(c=(d=a.parent().contents()).index(a),e.merge(s,d.slice(c).get()))}),t.endNodes().each(function(r,i){var o,a,d;return(o=n(i)).parent().is(t.editor.body)||t.startNodes().index(o.parent())>-1?(s.push(i),!1):(d=(a=o.parent().contents()).index(o),e.merge(s,a.slice(0,d+1)))})),n(e.uniq(s))})())),this._nodes},blockNodes:function(){var e;if(this._range)return this._blockNodes||(this._blockNodes=(e=this,function(){return e.nodes().filter(function(t,n){return e.editor.util.isBlockNode(n)})})()),this._blockNodes},rootNodes:function(){var e;if(this._range)return this._rootNodes||(this._rootNodes=(e=this,function(){return e.nodes().filter(function(t,s){var r;return(r=n(s).parent()).is(e.editor.body)||r.is("blockquote")})})()),this._rootNodes},rangeAtEndOf:function(e,s){var r,i,o,a,d,l;if(null==s&&(s=this.range()),s&&s.collapsed)return e=n(e)[0],o=s.endContainer,a=this.editor.util.getNodeLength(o),i=s.endOffset===a-1,d=n(o).contents().last().is("br"),r=s.endOffset===a,!!(i&&d||r)&&(e===o||!!t.contains(e,o)&&(l=!0,n(o).parentsUntil(e).addBack().each(function(e,t){var s,r,i;if(i=(s=n(t).parent().contents().filter(function(){return!(this!==t&&3===this.nodeType&&!this.nodeValue)}).last()).get(0)===t,r=s.is("br")&&s.prev().get(0)===t,!i&&!r)return l=!1,!1}),l))},rangeAtStartOf:function(e,s){var r,i;if(null==s&&(s=this.range()),s&&s.collapsed)return e=n(e)[0],i=s.startContainer,0===s.startOffset&&(e===i||!!t.contains(e,i)&&(r=!0,n(i).parentsUntil(e).addBack().each(function(e,t){if(n(t).parent().contents().filter(function(){return!(this!==t&&3===this.nodeType&&!this.nodeValue)}).first().get(0)!==t)return r=!1}),r))},insertNode:function(e,t){if(null==t&&(t=this.range()),t)return e=n(e)[0],t.insertNode(e),this.setRangeAfter(e,t)},setRangeAfter:function(e,t){if(null==t&&(t=this.range()),null!=t)return e=n(e)[0],t.setEndAfter(e),t.collapse(!1),this.range(t)},setRangeBefore:function(e,t){if(null==t&&(t=this.range()),null!=t)return e=n(e)[0],t.setEndBefore(e),t.collapse(!1),this.range(t)},setRangeAtStartOf:function(e,t){return null==t&&(t=this.range()),e=n(e).get(0),t.setEnd(e,0),t.collapse(!1),this.range(t)},setRangeAtEndOf:function(e,t){var s,r,i,o,a,d,l;if(null==t&&(t=this.range()),e=(r=n(e))[0])return r.is("pre")?(i=r.contents()).length>0?(d=(o=i.last()).text(),a=this.editor.util.getNodeLength(o[0]),"\n"===d.charAt(d.length-1)?t.setEnd(o[0],a-1):t.setEnd(o[0],a)):t.setEnd(e,0):(l=this.editor.util.getNodeLength(e),3!==e.nodeType&&l>0&&((s=n(e).contents().last()).is("br")?l-=1:3!==s[0].nodeType&&this.editor.util.isEmptyNode(s)&&(s.append(this.editor.util.phBr),e=s[0],l=0)),t.setEnd(e,l)),t.collapse(!1),this.range(t)},deleteRangeContents:function(e){var t,n,s,r;return null==e&&(e=this.range()),r=e.cloneRange(),s=e.cloneRange(),r.collapse(!0),s.collapse(!1),n=this.rangeAtStartOf(this.editor.body,r),t=this.rangeAtEndOf(this.editor.body,s),!e.collapsed&&n&&t?(this.editor.body.empty(),e.setStart(this.editor.body[0],0),e.collapse(!0),this.range(e)):e.deleteContents(),e},breakBlockEl:function(e,t){var s;return null==t&&(t=this.range()),s=n(e),t.collapsed?(t.setStartBefore(s.get(0)),t.collapsed?s:s.before(t.extractContents())):s},save:function(e){var t,s,r;if(null==e&&(e=this.range()),!this._selectionSaved)return(s=e.cloneRange()).collapse(!1),r=n("<span/>").addClass(this.opts.classPrefix+"caret-start"),t=n("<span/>").addClass(this.opts.classPrefix+"caret-end"),s.insertNode(t[0]),e.insertNode(r[0]),this.clear(),this._selectionSaved=!0},restore:function(){var e,t,n,s,r,i,o;return!!this._selectionSaved&&(r=this.editor.body.find("."+this.opts.classPrefix+"caret-start"),e=this.editor.body.find("."+this.opts.classPrefix+"caret-end"),r.length&&e.length?(o=(i=r.parent()).contents().index(r),n=(t=e.parent()).contents().index(e),i[0]===t[0]&&(n-=1),(s=document.createRange()).setStart(i.get(0),o),s.setEnd(t.get(0),n),r.remove(),e.remove(),this.range(s)):(r.remove(),e.remove()),this._selectionSaved=!1,s)}});return r.pluginName="Selection",s.Selection=r});
//# sourceMappingURL=sourcemaps/Selection.js.map
