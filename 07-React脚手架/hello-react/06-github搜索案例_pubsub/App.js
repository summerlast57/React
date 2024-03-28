//创建外壳组件APP
import React, { Component } from 'react'
import Header from  './components/Header'
import List from  './components/List'
import './App.css'

export default class App extends Component {


  render() {
    return (
      <div >
        <Header/>
        <List />
      </div>
    )
  }
}
