//创建外壳组件APP
import React from 'react'
import { NavLink, useRoutes } from 'react-router-dom'
import routes from './routes'
import Header from './components/Header'
import './App.css'

export default function App() {
  // 根据路由表生成对应的路由规则
  const element = useRoutes(routes)

  function changeActiveClassName(isActive) {
    return isActive.isActive ? 'list-group-item hover' : 'list-group-item atguigu'
  }
  return (
    <div>
      <Header />
      <div className="list-group">
        <NavLink className={changeActiveClassName} to="/about">About</NavLink>
        <NavLink className={changeActiveClassName} to="/home">Home</NavLink>
      </div>
      <div className="panel-body">
        {/* 注册路由，也就是写对应的关系 */}
        {/* Routes代替Switch，用于一对一匹配，且Routes不可省略 */}
        {element}
      </div>
    </div>
  )
}

