//创建外壳组件APP
import React, { Component } from 'react'
import { Route,Switch,Redirect } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Header from './components/Header'
import MyNavLink from './components/MyNavLink'
import './App.css'

export default class App extends Component {

  render() {
    return (
      <div>
        <Header />
        <div className="list-group">
          {/* NavLink在进行切换时，会给标签加一个名为active的类用来高亮显示，可以通过
          activeClassName手动控制添加的类，注意新增的类会与原来的active冲突，需要将新增的优先级提高 */}
          {/* <NavLink activeClassName='hover' className="list-group-item" to="/about">About</NavLink>
          <NavLink activeClassName='hover' className="list-group-item" to="/home">Home</NavLink> */}
          <MyNavLink to='/about'>About</MyNavLink>
          <MyNavLink to='/home'>Home</MyNavLink>
        </div>
        <div className="panel-body">
          {/* 注册路由，也就是写对应的关系 */}
          {/* Switch可以将path与路由一对一对应--单一匹配 */}
          <Switch>
            <Route path="/about" component={About} />
            <Route path="/home" component={Home} />
            <Redirect to='/about'></Redirect>
          </Switch>
        </div>
      </div>
    )
  }
}
