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
        </ul>
    )
  }
}
