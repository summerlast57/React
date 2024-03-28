import React, { Component } from 'react'
import MyNavLink from '../../components/MyNavLink'
import { Switch,Route,Redirect } from "react-router-dom";
import News from './News'
import Message from './Message'
import './index.css'

export default class Header extends Component {

  render() {
    return (
      <div>
          <h1>我是Home组件</h1>
          <div >
            <ul className="nav nav-tabs">
              <li><MyNavLink to='/home/news'>News</MyNavLink></li>
              <li><MyNavLink to='/home/message'>Message</MyNavLink></li>
            </ul>
          </div>
          <Switch>
            <Route path='/home/news' component={News}></Route>
            <Route path='/home/message' component={Message}></Route>
            <Redirect to='/home/news'></Redirect>
          </Switch>
      </div>
    )
  }
}
