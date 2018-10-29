'use strict';

// Copied from https://facebook.github.io/react/docs/dom-elements.html
// Copied from https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes#Attribute_list
var map = {
  "accept": "accept",
  "acceptCharset": "accept-charset",
  "accessKey": "accesskey",
  "action": "action",
  "alt": "alt",
  "async": "async",
  "autoComplete": "autocomplete",
  "autoFocus": "autofocus",
  "autoPlay": "autoplay",
  "challenge": "challenge",
  "charSet": "charset",
  "checked": "checked",
  "cite": "cite",
  "className": "class",
  "cols": "cols",
  "colSpan": "colspan",
  "content": "content",
  "contentEditable": "contenteditable",
  "contextMenu": "contextmenu",
  "controls": "controls",
  "coords": "coords",
  "crossOrigin": "crossorigin",
  "data": "data",
  "dateTime": "datetime",
  "default": "default",
  "defer": "defer",
  "dir": "dir",
  "disabled": "disabled",
  "download": "download",
  "draggable": "draggable",
  "encType": "enctype",
  "htmlFor": "for",
  "form": "form",
  "formAction": "formaction",
  "headers": "headers",
  "height": "height",
  "hidden": "hidden",
  "high": "high",
  "href": "href",
  "hrefLang": "hreflang",
  "httpEquiv": "http-equiv",
  "icon": "icon",
  "id": "id",
  "integrity": "integrity",
  "keyType": "keytype",
  "kind": "kind",
  "label": "label",
  "lang": "lang",
  "list": "list",
  "loop": "loop",
  "low": "low",
  "manifest": "manifest",
  "max": "max",
  "maxLength": "maxlength",
  "minLength": "minlength",
  "media": "media",
  "method": "method",
  "min": "min",
  "multiple": "multiple",
  "muted": "muted",
  "name": "name",
  "noValidate": "novalidate",
  "open": "open",
  "optimum": "optimum",
  "pattern": "pattern",
  "placeholder": "placeholder",
  "poster": "poster",
  "preload": "preload",
  "radioGroup": "radiogroup",
  "readOnly": "readonly",
  "rel": "rel",;
  "required": "required",
  "reversed": "reversed",
  "rows": "rows",
  "rowSpan": "rowspan",
  "sandbox": "sandbox",
  "scope": "scope",
  "scoped": "scoped",
  "selected": "selected",
  "shape": "shape",
  "size": "size",
  "sizes": "sizes",
  "span": "span",
  "spellCheck": "spellcheck",
  "src": "src",
  "srcDoc": "srcdoc",
  "srcLang": "srclang",
  "srcSet": "srcset",
  "start": "start",
  "step": "step",
  "style": "style",
  "summary": "summary",
  "tabIndex": "tabindex",
  "target": "target",
  "title": "title",
  "type": "type",
  "useMap": "usemap",
  "value": "value",
  "width": "width",
  "wrap": "wrap"
};

var convert = function (attr) {
  return map[attr] || attr;
};

module.exports = convert;
module.exports.convert = convert;
