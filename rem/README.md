## rem
rem unit for flexible layout.

## Getting Started

```js
import rem from 'rem'

const base = 750 // psd dimension
const convert = 100 // convert number, should be greater than 12

rem(base, convert)
```

Then it works.

```css
.foo {
  width: 7.5rem; /* 750px */
  height: 1rem; /* 100px */
  color: #fff;
}
```
