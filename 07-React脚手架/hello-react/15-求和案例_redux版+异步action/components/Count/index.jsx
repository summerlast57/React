import React, { Component } from 'react'
// 引入store，用于获取redux保存状态
import store from '../../redux/store'
import {createIncrementAction,createDecrementAction,createDecrementAsyncAction} from '../../redux/action/count'
import './index.css'

export default class Count extends Component {

  state = { car: 'benchi' }

  /* 
    当调用store.subscribe方法会注册一个监听器，当store.dispatch触发时并改变了state的状态，就会调用监听器
    通过在组件挂载完毕生命周期函数使用该函数，且监听器为setState函数等改变状态时，可以实现响应式
    但这种方式在单个组件时使用时，当组件过多时比较麻烦，建议使用redux-react库，将根组件包裹在 <Provider> 组件中，
    并通过 connect 或 React Hooks 来访问 Redux store 的状态 
  */
  componentDidMount(){
    store.subscribe(()=>{
      this.setState({})
    })
  }

  increase = () => {
    const { value } = this.selectValue
    store.dispatch(createIncrementAction(value*1))
  }
  decrease = () => {
    const { value } = this.selectValue
    store.dispatch(createDecrementAction(value*1))
  }
  increaseIfOdd = () => {
    const count = store.getState()
    const { value } = this.selectValue
    if (count % 2 !== 0) {
      store.dispatch(createIncrementAction(value*1))
    }
  }
  increaseAsync = () => {
    const { value } = this.selectValue
    store.dispatch(createDecrementAsyncAction(value*1,1000))
    // setTimeout(() => {
    //   store.dispatch(createIncrementAction(value*1))
    // }, 1000);
  }

  render() {
    const state= store.getState()
    return (
      <div className='header'>
        <h2>总和为：{state}</h2>
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
