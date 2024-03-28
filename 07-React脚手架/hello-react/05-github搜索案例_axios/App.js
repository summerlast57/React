//创建外壳组件APP
import React, { Component } from 'react'
import Header from  './components/Header'
import List from  './components/List'
import './App.css'

export default class App extends Component {

  state = {
    git:[],
    isFirst:true,
    isLoading:false,
    isError:''
  }

  updateAppState = (stateObj)=>{
    this.setState(stateObj)
  }
  render() {
    return (
      <div >
        <Header updateAppState={this.updateAppState}/>
        <List {...this.state} />
      </div>
    )
  }
}
