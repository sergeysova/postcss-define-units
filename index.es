import * as postcss from 'postcss';

export default postcss.plugin('postcss-define-units', (options = {}) => {
    return css => {
        const save = {};

        css.walkDecls(decl => {
          if (decl.prop === '--define') {
            const [ type, value ] = postcss.list.space(decl.value);
            const [_, count, postfix] = value.match(/(\d+)(\w+)/);
            save[type] = [count, postfix];
            decl.remove();
          }
          else {
            for (const type in save) {
              const [count, postfix] = save[type];
              const reg = new RegExp("(([\\d\.]+)" + type + ")", 'g');

              decl.value = decl.value.replace(reg, (a, b, c) => {
                return [count * c, postfix].join('');
              });
            }
          }
        });
    };
});
