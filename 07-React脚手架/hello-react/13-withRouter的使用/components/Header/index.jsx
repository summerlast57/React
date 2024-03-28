import React, { Component } from 'react'
import { withRouter } from "react-router-dom";
import './index.css'

class Header extends Component {
  back = ()=>{
    this.props.history.goBack()
  }
  forward = ()=>{
    this.props.history.goForward()
  }
  render() {
    return (
      <div className='header'>
        <h2>React Router Demo</h2>
        <button onClick={this.back}>回退</button>&nbsp;
        <button onClick={this.forward}>前进</button>&nbsp;
      </div>
    )
  }
}
export default withRouter(Header)

// withRouter可以加工一般组件，让一般组件具备路由组件特有的api
// withRouter返回值是一个新组件