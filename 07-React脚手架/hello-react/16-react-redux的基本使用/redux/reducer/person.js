import { ADD_PERSON } from "../constant";

const initState = [
  { id: '01', name: 'tom', age: 17 },
  { id: '02', name: 'jack', age: 20 }
]
export default function personReducer(preState = initState, action) {
  const { type, data } = action
  switch (type) {
    case ADD_PERSON:
      return ([data, ...preState])
    default:
      return preState
  }
}