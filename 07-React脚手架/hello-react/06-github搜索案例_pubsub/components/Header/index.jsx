import React, { Component } from 'react'
import PubSub from 'pubsub-js'
import axios from 'axios'
import './index.css'

export default class Header extends Component {

  search = () => {
    // 利用连续解构赋值，拿到this下的KeyValue中的value并重命名为keyWord
    const { KeyValue: { value: keyWord } } = this
    //在搜索之前设置,搜索的开始，结束第一次展示
    PubSub.publish('getState',{isFirst:false,isLoading:true})
    //切记在配置代理了之后一定需要添加相应的路径
    axios.get(`https://api.github.com/search/users?q=${keyWord}`).then(
      res => {
        PubSub.publish('getState',{ git: res.data.items, isLoading: false })
      }, error => {
        PubSub.publish('getState',{ isLoading: false, isError: error.message })
      }
    )
    
  }
  render() {
    return (
      <section className="jumbotron">
        <h3 className="jumbotron-heading">搜索GitHub用户</h3>
        <div>
          {/*使用ref拿到输入的数据，ref中使用回调函数的形式，在实例对象中创建一个KeyValue的属性，值是该节点*/}
          <input ref={c => this.KeyValue = c} type="text" placeholder="输入关键词进行搜索" />&nbsp;
          <button onClick={this.search}>搜索</button>
        </div>
      </section>
    )
  }
}
