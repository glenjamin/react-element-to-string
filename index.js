var React = require('react');
var stringify = require('json-stringify-pretty-compact');
var indentString = require('indent-string');

function ReactElementToString(element) {
  var name = showName(element);
  var props = showProps(element);
  var children = showChildren(element);
  var hasChildren = children.length > 0;

  if (hasChildren) {
    return '<' + name + props + '>' + children + '</' + name + '>';
  }
  return '<' + name + props + ' />';
}

function showName(element) {
  var type = element.type;
  if (type.displayName) return type.displayName;
  if (type.name) return type.name;
  if (typeof type == 'string') return type;
  return 'Unknown';
}

function showProps(element) {
  return Object.keys(element.props || {}).map(function(prop) {
    var val = element.props[prop];

    if (prop == 'children') {
      return '';
    }
    if (isDefaultProp(element, prop, val)) {
      return '';
    }

    if (typeof val == 'string') {
      return ' ' + prop + '=' + JSON.stringify(val);
    }

    if (React.isValidElement(val)) {
      val = ReactElementToString(val);
    }
    if (typeof val == 'object') {
      val = stringify(val);
    }
    if (typeof val == 'function') {
      val = (val.name || 'function') + '()';
    }

    return ' ' + prop + '={' + val + '}';
  }).join('');
}

function showChildren(element) {
  var children = element.props.children;
  if (!children) return '';

  // Currently we support React 0.13, where React.Children.map returns an
  // opaque data structure rather than an array. So we build one via forEach.
  var shownChildren = [];
  React.Children.forEach(children, function(child) {
    shownChildren.push(showChild(child));
  });
  var content = shownChildren.filter(Boolean).join("\n");

  return "\n" + indentString(content, ' ', 2) + "\n";
}

function showChild(element) {
  if (React.isValidElement(element)) {
    return ReactElementToString(element);
  }
  if (element == null || element === false) {
    return '';
  }

  return String(element);
}

function isDefaultProp(element, prop, value) {
  if (!element.type.defaultProps) {
    return false;
  }
  return element.type.defaultProps[prop] === value;
}

module.exports = ReactElementToString;
