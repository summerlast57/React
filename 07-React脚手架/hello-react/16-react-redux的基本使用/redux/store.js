/* 
  该文件专门用于暴露一个store对象，整个应用只有一个store对象
*/
// 引入legacy_createStore，专门用于创建redux的最核心的store对象
import { legacy_createStore as createStore,applyMiddleware } from "redux";
// 引入redux-thunk用于支持异步action
import { thunk } from "redux-thunk";
// 引入react-redux开发者工具
import { composeWithDevTools } from "redux-devtools-extension";
// 引入汇总的reducer
import rootReducer from "./reducer";


// 暴露store
export default createStore(rootReducer,composeWithDevTools(applyMiddleware(thunk)))
