# PostCSS Define Units

[![Build Status](https://travis-ci.org/lestad/postcss-define-units.svg?branch=master)](https://travis-ci.org/lestad/postcss-define-units)

PostCSS plugin define custom units.

So simple. Use `--define` property. Unit define globally.

There are two ways to define a unit. First one is just a unit representation. Second one is an expression.

Expression **must** be surrounded by the parenthesis and it also should be ended with css unit, like so: `(value * 10)px`. Where `value` is a variable that holds a user defined unit value. Code inside parenthesies is just a JavScript, so you could use any of it functionality.

```css
.foo {
  --define: dp 4px;
  --define: tt 2px;
  --define: ms (Math.pow(1.618, value))rem; // Modular scale expression
  padding: 8dp 1tt;
  font-size: 2ms;
  width: calc(30px + 2dp + 2tt)
}
```

Result:

```css
.foo {
  padding: 32px 2px;
  font-size: 2.617924rem;
  width: calc(30px + 8px + 4px)
}
```

## Usage

```js
postcss([ require('postcss-define-units') ])
```

