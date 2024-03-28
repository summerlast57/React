import React, { Component } from 'react'
import PubSub from 'pubsub-js'
// import axios from 'axios'
import './index.css'

export default class Header extends Component {

  search = async () => {
    // 利用连续解构赋值，拿到this下的KeyValue中的value并重命名为keyWord
    const { KeyValue: { value: keyWord } } = this
    //在搜索之前设置,搜索的开始，结束第一次展示
    PubSub.publish('getState', { isFirst: false, isLoading: true })
    //切记在配置代理了之后一定需要添加相应的路径

    // fetch(`http://localhost:3000/api1/search/users?q=${keyWord}`).then(
    //     resolve =>{
    //         //关注分离原则，先判断网络是不是成功
    //         console.log("网络链接成功",resolve);
    //         //在通过json获取数据
    //         return resolve.json(); //获取数据
    //     },
    //     reject =>{
    //         console.log("网络链接失败",reject);
    //     }
    // ).then(
    //     resolve =>{
    //         console.log(resolve);
    //     }
    // )

    try {
      //链接网络,获取成功的返回值
      const response = await fetch(`https://api.github.com/search/users?q=${keyWord}`)
      //通过成功的返回值，获取数据 json()只是获取json文件
      //还有其他获取的方法，但是这些方法只能使用一个
      const users = await response.json();
      // const wang2 = await wang.clone(); 将返回的成功结果复制一份
      //提取出数据中想要的结果                                                                    
      console.log(users.items);
      PubSub.publish('getState', { git: users.items, isLoading: false })
    } catch (error) {
      
    }

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
