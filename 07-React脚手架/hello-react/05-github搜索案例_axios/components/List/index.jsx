import React, { Component } from 'react'
import './index.css'

export default class List extends Component {
  render() {
    const {git,isFirst,isLoading,isError} = this.props
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
