# PostCSS Define Units

[![Build Status](https://travis-ci.org/LestaD/postcss-define-units.svg?branch=master)](https://travis-ci.org/LestaD/postcss-define-units)

PostCSS plugin define custom units.

So simple. Use `--define` property. Unit define globally.

```css
.foo {
  --define: dp 4px;
  --define: tt 2px;
  padding: 8dp 1tt;
  font-size: 10tt;
  width: calc(30px + 2dp + 2tt)
}
```

Result:

```css
.foo {
  padding: 32px 2px;
  font-size: 20px;
  width: calc(30px + 8px + 4px)
}
```

## Usage

```js
postcss([ require('postcss-define-units') ])
```

