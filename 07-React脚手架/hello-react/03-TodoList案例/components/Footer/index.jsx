import React, { Component } from 'react'
import './index.css'

export default class Footer extends Component {
  // 全选按钮的回调
  checkAll = (event)=>{
    this.props.checkAll(event.target.checked)
  }
  // 删除已完成事件的回调
  delChecked = ()=>{
    this.props.delChecked()
  }
  render() {
    const {todoList} = this.props
    const sum = todoList.reduce((pre,cur)=>{
      return pre + (cur.done?1:0)
    },0)
    return (
      <div className="todo-footer">
        <label>
          {/*注意不能使用defaultChecked,这个只能在初始化的时候执行一次，并且如果使用checkede就必须添加onChange*/}
          <input type="checkbox" checked={sum === todoList.length && todoList.length !==0? true:false} onChange={this.checkAll}/>
        </label>
        <span>
          <span>已完成{sum}</span> / 全部{todoList.length}
        </span>
        <button onClick={this.delChecked} className="btn btn-danger">清除已完成任务</button>
      </div>
    )
  }
}
