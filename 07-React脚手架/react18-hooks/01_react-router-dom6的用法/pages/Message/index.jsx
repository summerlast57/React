import React, { useState } from 'react'
import { Link, Outlet,useNavigate } from "react-router-dom";

export default function Message() {

  const [message] = useState([
    { id: '01', title: "消息1", content: '白日依山尽' },
    { id: '02', title: "消息2", content: '黄河入海流' },
    { id: '03', title: "消息3", content: '欲穷千里目' },
    { id: '04', title: "消息4", content: '更上一层楼' },
  ])

  // 编程式路由导航
  const navigate = useNavigate()
  function showDetail(m) {
    navigate('detail',{
      state:{
        id:m.id,
        title:m.title,
        content:m.content
      }
    })
  }
  return (
    <div>
      <ul>
        {
          message.map((m) => {
            return (
              // 传递params参数
              // <li key={m.id}><Link to={`detail/${m.id}/${m.title}/${m.content}`}>{m.title}</Link></li>

              // 传递search参数
              // <li key={m.id}><Link to={`detail?id=${m.id}&title=${m.title}&content=${m.content}`}>{m.title}</Link></li>

              // 传递state参数
              <li key={m.id}><Link to='detail' state={{
                id:m.id,
                title:m.title,
                content:m.content
              }}>{m.title}</Link>&nbsp;
              <button onClick={()=>showDetail(m)}>查看详情</button>
              </li>
            )
          })
        }
      </ul>
      <hr />
      <Outlet />
    </div>
  )
}

