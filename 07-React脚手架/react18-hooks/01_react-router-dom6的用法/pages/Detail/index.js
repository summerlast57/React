import React from 'react'
// import { useParams,useMatch } from "react-router-dom";

// import { useSearchParams,useLocation } from "react-router-dom";

import { useLocation } from "react-router-dom";

export default function Detail() {
  // 接收params参数
  // const {id,title,content} = useParams()
  // const m = useMatch('home/message/detail/:id/:title/:content')
  // console.log(m);

  // 接收search参数
  // const [search,setSearch] = useSearchParams()
  // const id = search.get('id');
  // const title = search.get('title');
  // const content = search.get('content');
  // const m = useLocation()
  // console.log(m);

  // 接收state参数
  const {state:{id,title,content}} = useLocation()
  return (
    <div>
      <ul>
        {/* <li><button onClick={()=>setSearch('id=05&title=消息5&content=行路难')}>点击修改传过来的search参数</button></li> */}
        <li>id:{id} </li>
        <li>title:{title} </li>
        <li>content:{content} </li>
      </ul>
    </div>
  )
}
