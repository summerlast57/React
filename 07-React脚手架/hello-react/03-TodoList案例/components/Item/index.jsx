import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './index.css'

export default class Item extends Component {

  static propTypes={
    id:PropTypes.string.isRequired,
    name:PropTypes.string.isRequired,
    done:PropTypes.bool.isRequired,
  }

  state = {mouse:false}

  // 勾选以及取消勾选的id
  show = (id)=>{
    return (event)=>{
      this.props.createChecked(id,event.target.checked)
    }
  }
  // 鼠标移入移除时的回调
  handleMouse = (flag)=>{
    return ()=>{
      this.setState({mouse:flag})
    }
  }
  // 根据id删除事件
  delTodo = (id)=>{
    return ()=>{
      if(window.confirm('确定删除吗？')){
        this.props.delTodo(id)
      }
      
    }
  }
  render() {
    const {id,name,done} = this.props
    const {mouse} = this.state
    return (
      <li style={{backgroundColor: mouse? '#ddd': 'white'}} onMouseEnter={this.handleMouse(true)} onMouseLeave={this.handleMouse(false)}>
        <label>
          <input type="checkbox" checked={done} onChange={this.show(id)}/>
          <span>{name}</span>
        </label>
        <button onClick={this.delTodo(id)} className="btn btn-danger" style={{ display:mouse?'block': 'none' }}>删除</button>
      </li>
    )
  }
}
