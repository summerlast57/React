import React, { Component } from 'react'
import './index.css'

export default class Count extends Component {

  state = { count: 0 }

  increase = () => {
    const { count } = this.state
    const { value } = this.selectValue
    this.setState({ count: count + value * 1 })
  }
  decrease = () => {
    const { count } = this.state
    const { value } = this.selectValue
    this.setState({ count: count - value * 1 })
  }
  increaseIfOdd = () => {
    const { count } = this.state
    const { value } = this.selectValue
    if (count % 2 !== 0) {
      this.setState({ count: count + value * 1 })
    }

  }
  increaseAsync = () => {
    const { count } = this.state
    const { value } = this.selectValue
    setTimeout(() => {
      this.setState({ count: count + value * 1 })
    }, 1000);

  }

  render() {
    return (
      <div className='header'>
        <h2>总和为：{this.state.count }</h2>
        <select ref={(c) => this.selectValue = c}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>
        <button onClick={this.increase}>+</button>&nbsp;
        <button onClick={this.decrease}>-</button>&nbsp;
        <button onClick={this.increaseIfOdd}>当为奇数时加</button>&nbsp;
        <button onClick={this.increaseAsync}>异步加</button>&nbsp;
      </div>
    )
  }
}
