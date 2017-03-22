## rem
rem unit for flexible layout.

## Getting Started

```js
// ES Module
import rem from 'rem'

const base = 750 // psd dimension
const convert = 100 // convert number, should be greater than 12

rem(base, convert)
```

```js
// CommonJS
const rem = require('rem').default

// vanilla JS
var rem = window.rem.default
```

Then it works.

```css
.foo {
  width: 7.5rem; // => 750px
  height: 1rem; // => 100px
  color: #fff;
}
```
