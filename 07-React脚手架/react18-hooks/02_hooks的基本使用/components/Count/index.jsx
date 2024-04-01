import React, { useState, useEffect,useRef,useLayoutEffect,useContext, createContext } from 'react'
import axios from "axios";

// useContext可用来跨层组件通信
const MyContext = createContext()

export default function Count() {
  // 使用useState来创建函数组件的状态
  const [state, setState] = useState({
    count: 0,
    message:[]
  })
  // 使用useEffect来执行副作用操作，即与组件渲染无关的操作，例如数据获取，订阅事件等
  useEffect(() => {
    const getData =async ()=>{
      const {data:{data:{channels:msg}}} = await axios.get('https://geek.itheima.net/v1_0/channels')
      setState({count:0,message:msg})
    } 
    getData()
    return ()=>{

    }
  },[])

  // useLayoutEffect 会在所有 DOM 变更之后同步调用 effect
  useLayoutEffect(() => {
    // 在浏览器绘制之前修改 DOM 样式
    myRef.current.style.height = '40px';
  }, []);

  // useRef可以获取对应的元素
  const myRef = useRef()
  function showMsg(){
    alert(myRef.current.value)
  }


  return (
    
    <div className='header' style={{ marginLeft: '30%' }} >
      <h2>总数为：{state.count} </h2>
      <button onClick={() => setState({...state, count: state.count+1})}>加1</button>
      <button onClick={() => setState({...state, count: state.count - 1 })}>减1</button>
      <input type="text" placeholder='输入信息' ref={myRef}/>
      <button onClick={showMsg}>输出信息</button>
      <MyContext.Provider value={state.count}>
        <Demo/>
      </MyContext.Provider>
      
      <ul>
        {
          state.message.map((m)=>{
            return (
              <li key={m.id}>id:{m.id}---name:{m.name}</li>
            )
          })
        }
      </ul>
    </div>
  )
}

function Demo() {
  const data = useContext(MyContext)
  return (
    <div>子组件,父组件的值为{data}</div>
  )
}


