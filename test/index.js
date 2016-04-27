var React = require('react');
var ReactElementToString = require('../');

var expect = require('chai').expect;

var str = ReactElementToString;

var Basic = React.createClass({
  render: function() {
    return (
      <div />
    );
  }
});

var DefaultProp = React.createClass({

  getDefaultProps: function() {
    return {
      test2: 'abc'
    };
  },

  render: function() {
    return (
      <div />
    );
  }
});

var BasicChild = React.createClass({
  render: function() {
    return (
      <div />
    );
  }
});

describe("ReactElementToString", function() {
  it('should string a basic react component', function() {
    expect(str(<Basic />)).to.eql('<Basic />');
  });

  it('should include simple props', function() {
    expect(
      str(<Basic
        test="abc" test2={4} test4={true}
        test5={{ abc: "abc" }} test6=""
      />)
    ).to.eql(
      '<Basic test="abc" test2={4} test4={true}' +
      ' test5={{"abc": "abc"}} test6="" />'
    );
  });

  it('should ignore default props', function() {
    expect(str(<DefaultProp test="abc" />))
      .to.eql('<DefaultProp test="abc" />');
  });

  it('should show anonymous functions', function() {
    var func = function() { return 1; };
    expect(str(<Basic test={func} />))
      .to.eql('<Basic test={function()} />');
  });

  it('should show named functions', function() {
    var func = function func() { return 1; };
    expect(str(<Basic test={func} />))
      .to.eql('<Basic test={func()} />');
  });

  it('should show ReactElement props', function() {
    expect(str(<Basic test1={<Basic />} />))
      .to.eql('<Basic test1={<Basic />} />');
  });

  it('should show ReactElement with ReactElement children', function() {
    expect(str(<Basic><hr /><BasicChild /></Basic>))
      .to.eql('<Basic>\n  <hr />\n  <BasicChild />\n</Basic>');
  });

  it('should handle function children', function() {
    function Func() { return <hr />; }
    expect(str(<Basic><Func /></Basic>))
      .to.eql('<Basic>\n  <Func />\n</Basic>');
  });

  it('should handle component without displayName children', function() {
    var A = (function() {
      // eslint-disable-next-line react/display-name
      return React.createClass({
        render: function() { return null; }
      });
    })();
    expect(str(<Basic><A /></Basic>))
      .to.eql('<Basic>\n  <Unknown />\n</Basic>');
  });

  it('should show ReactElement with text children', function() {
    expect(str(<Basic>Stuff{"&"}Nonsense</Basic>))
      .to.eql('<Basic>\n  Stuff\n  &\n  Nonsense\n</Basic>');
  });

  it('should show ReactElement with many children', function() {
    var output = str(
      <Basic>
        <BasicChild prop="thing">
          <div>
            <BasicChild row={3}>
              Title
            </BasicChild>
            <p>
              Title 2
            </p>
          </div>
        </BasicChild>
      </Basic>
    );

    expect(output).to.eql(
      '<Basic>\n' +
      '  <BasicChild prop="thing">\n' +
      '    <div>\n' +
      '      <BasicChild row={3}>\n' +
      '        Title\n' +
      '      </BasicChild>\n' +
      '      <p>\n' +
      '        Title 2\n' +
      '      </p>\n' +
      '    </div>\n' +
      '  </BasicChild>\n' +
      '</Basic>'
    );
  });

  it('should handle null and otherwise empty children', function() {
    var output = str(<p>
      a {""}
      b {0}
      c {false}
      d {null}
    </p>);

    expect(output).to.eql(
      '<p>\n' +
      '  a \n' +
      '  b \n' +
      '  0\n' +
      '  c \n' +
      '  d \n' +
      '</p>'
    );
  });

  it('should work with raw createElement as well', function() {
    expect(str(React.createElement(Basic, { a: 1 }, React.createElement('hr'))))
      .to.eql('<Basic a={1}>\n  <hr />\n</Basic>');
  });

});
