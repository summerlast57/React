import React, { Component } from 'react'
// import qs from "qs"

const detailObj = [
  { id: '01', content: '你好，世界' },
  { id: '02', content: '你好，中国' },
  { id: '03', content: '你好，宇宙' },
]
export default class Detail extends Component {
  render() {
    // 接收params参数
    // const { id, title } = this.props.match.params

    // 接收search参数
    // const {search} = this.props.location
    // const {id,title} = qs.parse(search.slice(1))

    // 接收state参数
    const { id, title } = this.props.location.state

    const detObj = detailObj.find((obj) => {
      return obj.id === id
    })
    return (
      <div>
        <hr />
        <li>id:{id}</li>
        <li>title:{title}</li>
        <li>content:{detObj.content}</li>
        
      </div>

    )
  }
}
