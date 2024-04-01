import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const billStore = createSlice({
  name: 'bill',
  initialState: {
    // 账单列表
    billList: []
  },
  reducers: {
    // 同步更改账单列表
    setBillList(state, action) {
      state.billList = action.payload
    },
    // 同步添加账单
    addBillList(state,action){
      state.billList.push(action.payload)
    }

  }
})
// 异步获取商品信息
const { setBillList,addBillList } = billStore.actions
const asyncBillList = () => {
  return async (dispatch) => {
    // 编写异步逻辑
    const res = await axios.get('http://localhost:3004/ka')
    // 调用dispatch函数提交action
    dispatch(setBillList(res.data))
  }
}
// 异步添加账单
const asyncAddBillList = (data)=>{
  return async (dispatch)=>{
    const res = await axios.post('http://localhost:3004/ka',data)
    dispatch(addBillList(res.data))
  }
}

export { asyncBillList,asyncAddBillList }
export default billStore.reducer