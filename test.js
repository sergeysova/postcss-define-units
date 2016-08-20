
var postcss = require('postcss');
var test = require('ava');

var plugin = require('./index').default;

function run(t, input, output, opts) {
  opts = opts || {};

  return postcss([ plugin(opts) ]).process(input)
  .then( function(result) {
    t.same(result.css, output);
    t.same(result.warnings().length, 0);
  });
}


test('replace one', function(t) {
  return run(t, 'a{ --define: dp 1px; width: 2dp }', 'a{ width: 2px }', { });
});

test('replace with multiply', function(t) {
  return run(t, 'a{ --define: dp 4px; width: 2dp }', 'a{ width: 8px }', { });
});

test('many definitions', function(t) {
  return run(t, 'a{ --define: dp 4px; --define: tost 2px; width: 2dp; height: 3tost }', 'a{ width: 8px; height: 6px }', { });
});

test('replace different in one line', function(t) {
  return run(t, 'a{ --define: dp 4px; --define: rat 8px; padding: 6dp 2rat }', 'a{ padding: 24px 16px }', { });
});

test('replace different in calc', function(t) {
  return run(t, 'a{ --define: mouse 4px; --define: rat 8px; --define: dog 46px; width: calc(1mouse + 2rat + 3dog) }', 'a{ width: calc(4px + 16px + 138px) }', { });
});

test('accept unit with dot', function(t) {
  return run(t, 'a{ --define: unit 10px; line-height: 3.5unit }', 'a{ line-height: 35px }', { });
});

test('expression definition', function(t) {
  return run(t, 'a{ --define: sq (Math.pow(value, 2))px; line-height: 2sq; line-height: 8sq }', 'a{ line-height: 4px; line-height: 64px }', { });
});

test('expression definition multiple uses', function(t) {
  return run(t, 'a{ --define: ms (Math.pow(value, 2) + 10 * value)rem; margin: 2ms 8ms }', 'a{ margin: 24rem 144rem }', { });
});
