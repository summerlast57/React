//创建外壳组件APP
import React, { Component } from 'react'
import Count from './components/Count'
import './App.css'

export default class App extends Component {

  render() {
    return (
      <div>
        <Count />
      </div>

    )
  }
}
