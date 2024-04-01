import React from 'react'
import { NavLink,Outlet } from "react-router-dom";
import './index.css'

export default function Home() {

  function changeActiveClassName(isActive) {
    return isActive.isActive ? 'list-group-item hover' : 'list-group-item atguigu'
  }
  return (
    <div>
      <h1>我是Home组件</h1>
      <div>
        <ul className='nav nav-tabs'>
          <li><NavLink className={changeActiveClassName} to="news">News</NavLink></li>
          <li><NavLink className={changeActiveClassName} to="message">Message</NavLink></li>
        </ul>
        {/* 指定路由组件呈现的位置 */}
        <Outlet/>
      </div>
    </div>
  )
}

