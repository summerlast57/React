import React, { Component } from 'react'
import { connect } from "react-redux";
import { addPersonAction } from "../../redux/action/person";
import { nanoid } from "nanoid";

class PersonUI extends Component {

  add = () => {
      const name = this.nameNode.value
      const age = this.ageNode.value*1
      this.props.addPerson({ id:nanoid(),name, age })

  }
  render() {
    const {persons} = this.props
    return (
      <div className='header'>
        <h2>我是Person组件，上方总数为{this.props.count}</h2>
        <input ref={c => this.nameNode = c} type="text" placeholder='姓名' />
        <input ref={c => this.ageNode = c} type="text" placeholder='年龄' />&nbsp;
        <button onClick={this.add}>添加</button>
        <ul>
          {
            persons.map((person) => {
              return <li key={person.id}>{person.name}---{person.age}</li>
            })
          }
        </ul>
      </div>
    )
  }
}

export default connect(
  state => ({
    persons:state.persons,
    count:state.count
  }),
  {
    addPerson: addPersonAction
  }
)(PersonUI)