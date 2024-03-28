import React, { Component } from 'react'

import Header from './components/Header'
import List from './components/List'
import Footer from './components/Footer'
import {nanoid} from 'nanoid'
import './App.css'


export default class App extends Component {

  state = {
    todoList:[
      {id:'001',name:'吃饭',done:true},
      {id:'002',name:'睡觉',done:false},
      {id:'003',name:'洗澡',done:true},
  ]}
  // 添加相应的事件
  addTodo = (value)=>{
    const {todoList} = this.state
    const todoObj = {id:nanoid(),name:value,done:false}
    this.setState({todoList:[todoObj,...todoList]})
  }
  // 根据id，修改状态中是否被选中
  createChecked = (id,value)=>{
    const {todoList} = this.state
    const newTodos = todoList.map((todo) =>{
      if(todo.id === id){
        return {...todo,done:value}
      }
      return todo
    })
    this.setState({todoList:newTodos})
  }
  // 根据id删除对应的事件
  delTodo = (id)=>{
    const {todoList} = this.state
    const newTodos = todoList.filter((todo)=>{
      return todo.id !== id
    })
    this.setState({todoList:newTodos})
  }
  // 全选按钮事件
  checkAll = (value)=>{
    const {todoList} = this.state
    const newTodos = todoList.map((todo)=>{
      return {...todo,done:value}
    })
    this.setState({todoList:newTodos})
  }
  // 删除已完成事件
  delChecked = ()=>{
    const {todoList} = this.state
    const newTodos = todoList.filter((todo)=>{
      return todo.done !== true
    })
    this.setState({todoList:newTodos})
  }
  render() {
    return (
      <div className='todo-container'>
        <div className='todo-wrap'>
          <Header addTodo={this.addTodo}/>
          <List delTodo={this.delTodo} todoList={this.state.todoList} createChecked={this.createChecked}/>
          <Footer delChecked={this.delChecked} todoList={this.state.todoList} checkAll={this.checkAll}/>
        </div>
      </div>
    )
  }
}
