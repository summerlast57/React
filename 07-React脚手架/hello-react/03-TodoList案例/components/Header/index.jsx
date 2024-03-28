import React, { Component } from "react"
import PropTypes from 'prop-types'
import './index.css'

export default class Hello extends Component {

  static propTypes={
    addTodo:PropTypes.func.isRequired
  }

  addTodo = (event) => {
    const {target,keyCode} = event
    // 判断按键是否为enter
    if(keyCode !==13) return
    // 判断输入是否为空
    if(target.value ==='') return
    // 将输入值传给props中的addTodo
    this.props.addTodo(event.target.value)
    // 回车后清空输入
    target.value = ''
  }
  render() {
    return (
      <div className="todo-header">
        <input onKeyUp={this.addTodo} type="text" placeholder="请输入你的任务名称，按回车键确认" />
      </div>
    )
  }
}
