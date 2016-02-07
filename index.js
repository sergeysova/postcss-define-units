var postcss = require('postcss');

module.exports = postcss.plugin('postcss-define-units', function (opts) {
  opts = opts || {};

  return function (css) {
    var save = {};

    css.walkDecls(function (decl) {
      if (decl.prop === '--define') {
        var _list = postcss.list.space(decl.value);
        var type = _list[0];
        var value = _list[1].match(/(\d+)(\w+)/);

        save[type] = [value[1], value[2]]; // [count, postfix]. ex:  12px
        decl.remove();
      }
      else {
        for (var rtype in save) {
          var count = save[rtype][0];
          var postfix = save[rtype][1]
          var reg = new RegExp("((\\d+)" + rtype + ")", 'g');

          decl.value = decl.value.replace(reg, function(a, b, c) {
            return [count * c, postfix].join('');
          });
        }
      }
    });
  };
});


