/* 
  该文件专门用于暴露一个store对象，整个应用只有一个store对象
*/
// 引入legacy_createStore，专门用于创建redux的最核心的store对象
import { legacy_createStore as createStore,applyMiddleware } from "redux";
// 引入redux-thunk用于支持异步action
import { thunk } from "redux-thunk";
// 引入为Count组件服务的reducer
import countReducer from './reducer/count'
// 暴露store
export default createStore(countReducer,applyMiddleware(thunk))
