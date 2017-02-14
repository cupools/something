## slider
Slider component for preact.

## Usage

```js
import { h, Component } from 'preact'
import Slider from 'something/slider'

class Foo extends Component {
  redirect() {
    // sliding from bottom to top trigger
    // router redirect
  }

  render() {
    return (
      <Slider onB2T={this.redirect.bind(this)}>
        <h2>Title</h2>
        <p>Content</p>
      </Slider>
    )
  }
}
```
