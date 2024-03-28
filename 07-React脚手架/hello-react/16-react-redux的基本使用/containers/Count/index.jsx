import React, { Component } from 'react'

import { createIncrementAction, createDecrementAction, createIncrementAsyncAction } from '../../redux/action/count'

// 引入 connect 连接UI组件
import { connect } from 'react-redux'
import './index.css'

class CountUI extends Component {

  state = { car: 'benchi' }

  // componentDidMount(){
  //   store.subscribe(()=>{
  //     this.setState({})
  //   })
  // }

  increase = () => {
    const { value } = this.selectValue
    this.props.increment(value * 1)
  }
  decrease = () => {
    const { value } = this.selectValue
    this.props.decrement(value * 1)
  }
  increaseIfOdd = () => {
    const count = this.props.count
    const { value } = this.selectValue
    if (count % 2 !== 0) {
      this.props.increment(value * 1)
    }
  }
  increaseAsync = () => {
    const { value } = this.selectValue
    this.props.asyncIncrement(value * 1, 500)
    // setTimeout(() => {
    //   store.dispatch(createIncrementAction(value*1))
    // }, 1000);
  }

  render() {
    console.log(this.props);
    return (
      <div className='header'>
        <h2>我是Count组件,下方总人数为{this.props.personCount}</h2>
        <h2>总和为：{this.props.count}</h2>
        <select ref={(c) => this.selectValue = c}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>&nbsp;
        <button onClick={this.increase}>+</button>&nbsp;
        <button onClick={this.decrease}>-</button>&nbsp;
        <button onClick={this.increaseIfOdd}>当为奇数时加</button>&nbsp;
        <button onClick={this.increaseAsync}>异步加</button>&nbsp;
      </div>
    )
  }
}

// mapStateToProps函数返回的是一个对象，用于传递状态
// function mapStateToProps(state){
//   return {count:state}
// }
// mapDispatchToProps函数返回的是一个对象，用来传递操作状态的方法
// function mapDispatchToProps(dispatch){
//   return {
//     increment:data => dispatch(createIncrementAction(data)),
//     decrement:data => dispatch(createDecrementAction(data)),
//     asyncIncrement:(data,time) => dispatch(createIncrementAsyncAction(data,time)),
//     }
// }
export default connect(
  state => ({ 
    count: state.count,
    personCount:state.persons.length
   }),
  {
    increment: createIncrementAction,
    decrement: createDecrementAction,
    asyncIncrement: createIncrementAsyncAction,
  }
)(CountUI)
