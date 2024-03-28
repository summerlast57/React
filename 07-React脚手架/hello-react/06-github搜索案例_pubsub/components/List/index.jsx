import React, { Component } from 'react'
import PubSub from 'pubsub-js'
import './index.css'

export default class List extends Component {

  state = {
    git:[],
    isFirst:true,
    isLoading:false,
    isError:''
  }
  // 在组件渲染之前订阅消息
  componentDidMount(){
    PubSub.subscribe('getState',(_,data)=>{
      console.log(data);
      this.setState(data)
    })
  }
  render() {
    const {git,isFirst,isLoading,isError} = this.state
    return (
      <div className="album">
        {
          isFirst ? <h2>欢迎进入页面</h2>:
          isLoading ? <h2>loading...</h2>:
          isError !== '' ? <h2>{isError}</h2>:
          git.map((item) => {
            return (
              <div className="card" key={item.id}>
                <a href={item.html_url} target="_blank" rel="noreferrer">
                  <img alt="headImg" src={item.avatar_url} style={{ width: '100px' }} />
                </a>
                <p className="card-text">{item.login}</p>
              </div>
            )
          })
        }
      </div>
    )
  }
}
