//创建外壳组件APP
import React, { Component } from 'react'
import { Link, Route } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Header from './components/Header'
import './App.css'

export default class App extends Component {

  render() {
    return (
      <div>
        <Header/>
        <div className="list-group">
          <Link className="list-group-item" to="/about">About</Link>
          <Link className="list-group-item" to="/home">Home</Link>
        </div>
        <div className="panel-body">
          {/* 注册路由，也就是写对应的关系 */}
          <Route path="/about" component={About} />
          <Route path="/home" component={Home} />
        </div>
      </div>
    )
  }
}
