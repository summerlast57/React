import React, { Component } from 'react'
import { Link, Route } from "react-router-dom";
import Detail from './Detail'


export default class Message extends Component {

  state = {
    details: [
      { id: '01', title: '和平' },
      { id: '02', title: '自由' },
      { id: '03', title: '开放' },
    ]
  }

  replaceShow = (id,title)=>{
    // replace跳转+携带params参数
    // this.props.history.replace(`/home/message/detail/${id}/${title}`)

    // replace跳转+携带search参数
    // this.props.history.replace(`/home/message/detail?id=${id}&title=${title}`)

    // replace跳转+携带state参数
    this.props.history.replace(`/home/message/detail`,{id,title})
  }
  pushShow = (id,title)=>{
    // push跳转+携带params参数
    // this.props.history.push(`/home/message/detail/${id}/${title}`)

    // push跳转+携带search参数
    // this.props.history.push(`/home/message/detail?id=${id}&title=${title}`)

    // push跳转+携带state参数
    this.props.history.push(`/home/message/detail`,{id,title})
  }
  back = ()=>{
    this.props.history.goBack()
  }
  forward = ()=>{
    this.props.history.goForward()
  }
  go = ()=>{
    this.props.history.go(2)
  }
  render() {
    const { details } = this.state
    return (
      <ul>
        {
          details.map((detailObj) => {
            return (
              <li key={detailObj.id}>
                {/* 向路由组件传递params参数 */}
                {/* <Link to={`/home/message/detail/${detailObj.id}/${detailObj.title}`}>{detailObj.title}</Link> */}

                {/* 向路由组件传递search参数 */}
                {/* <Link to={`/home/message/detail?id=${detailObj.id}&title=${detailObj.title}`}>{detailObj.title}</Link> */}

                {/* 向路由组件传递state参数 */}
                <Link to={{pathname:'/home/message/detail',state:{id:detailObj.id,title:detailObj.title}}}>{detailObj.title}</Link>

                &nbsp;<button onClick={()=>this.pushShow(detailObj.id,detailObj.title)}>push查看</button>
                &nbsp;<button onClick={()=>this.replaceShow(detailObj.id,detailObj.title)}>replace查看</button>
              </li>
            )
          })
        }
        {/* 声明接收params参数 */}
        {/* <Route path='/home/message/detail/:id/:title' component={Detail}></Route> */}

        {/* search参数无需接收参数，正常注册路由即可 */}
        {/* <Route path='/home/message/detail' component={Detail}></Route> */}

        {/* state参数无需接收参数，正常注册路由即可 */}
        <Route path='/home/message/detail' component={Detail}></Route>
        <button onClick={this.back}>回退</button>&nbsp;
        <button onClick={this.forward}>前进</button>&nbsp;
        <button onClick={this.go}>go2</button>

      </ul>
    )
  }
}
