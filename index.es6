import * as postcss from 'postcss';

export default postcss.plugin('postcss-define-units', (options = {}) => {
  return css => {
    const save = {};

    css.walkDecls(decl => {
      if (decl.prop === '--define') {
        const [ type, value ] = postcss.list.space(decl.value);

        if(value.charAt(0) == '(') {
          const [_, expression, postfix] = value.match(/\((.+)\)(\w+)/);
          save[type] = [new Function('value', [
            'return', '(', expression, ')',
            ].join(' ')), postfix];
        } else {
          const [_, count, postfix] = value.match(/(\d+)(\w+)/);
          save[type] = [(value) => count * value, postfix];
        }

        decl.remove();
      }
      else {
        for (const type in save) {
          const [f, postfix] = save[type];
          const reg = new RegExp("(([\\d\.]+)" + type + ")", 'g');

          decl.value = decl.value.replace(reg, (a, b, c) => {
            return [f(c), postfix].join('');
          });
        }
      }
    });
  };
});
