import { h, Component } from 'preact'

export default class Slider extends Component {
  constructor(props) {
    super(props)

    this.threshold = 60
    this.startX = null
    this.startY = null
    this.endX = null
    this.endY = null
  }

  __onTouchstart(e) {
    const touch = e.touches[0]
    this.startX = touch.pageX
    this.startY = touch.pageY
    this.endX = null
    this.endY = null
  }

  __onTouchmove(e) {
    const touch = e.touches[0]
    this.endX = touch.pageX
    this.endY = touch.pageY
    e.preventDefault()
  }

  __onTouchend() {
    // just a tap, should be ignored
    if (!this.endX) {
      return
    }

    const { props } = this
    const offsetY = this.startY - this.endY
    const offsetX = this.startX - this.endX

    if (props.onB2T && offsetY > this.threshold) {
      props.onB2T()
    } else if (props.onT2B && offsetY < 0 - this.threshold) {
      props.onT2B()
    } else if (props.onL2R && offsetX > this.threshold) {
      props.onL2R()
    } else if (props.onR2L && offsetX < 0 - this.threshold) {
      props.onR2L()
    }
  }

  trigger(ev) {
    const { props } = this
    const hook = 'on' + ev.toUpperCase()

    if (props[hook]) {
      props[hook]()
    }
  }

  render() {
    return (
      <div
        className={this.props.className}
        onTouchstart={this.__onTouchstart.bind(this)}
        onTouchmove={this.__onTouchmove.bind(this)}
        onTouchend={this.__onTouchend.bind(this)}>
        {this.props.children}
      </div>
    )
  }
}
