/* 
  该文件用于汇总所有的reducer
*/
// 引入为Count组件服务的reducer
import countReducer from './count'
// 引入为Person组件服务的reducer
import personReducer from "./person";
// 引入combineReducers用于汇总所有的reducer
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  count:countReducer,
  persons:personReducer
})
export default rootReducer
