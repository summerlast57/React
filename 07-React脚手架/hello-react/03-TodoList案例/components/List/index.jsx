import React, { Component } from 'react'
import Item from "../Item";
import PropTypes from 'prop-types'
import './index.css'


export default class List extends Component {

  static propTypes={
    createChecked:PropTypes.func.isRequired,
    delTodo:PropTypes.func.isRequired,
  }

  render() {
    const {todoList,createChecked,delTodo} = this.props
    return (
      <ul className="todo-main">
        {
          todoList.map((todo)=>{
            return <Item key={todo.id} {...todo} createChecked={createChecked} delTodo={delTodo}/>
          })
        }
      </ul>
    )
  }
}
