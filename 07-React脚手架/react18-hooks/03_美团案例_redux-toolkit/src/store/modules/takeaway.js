import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const foodsStore = createSlice({
  name: 'foods',
  initialState: {
    // 商品列表
    foodsList: [],
    // 菜单激活下标
    activeIndex: '318569657',
    // 购物车列表
    cartsList: []
  },
  reducers: {
    // 更改商品列表
    setFoodsList(state, action) {
      state.foodsList = action.payload
    },
    // 菜单点击激活
    setActiveIndex(state, action) {
      state.activeIndex = action.payload
    },
    // 添加购物车列表
    addCart(state, action) {
      const item = state.cartsList.find(item => item.id === action.payload.id)
      if (item) {
        item.count++
      } else {
        state.cartsList.push(action.payload)
      }
    },
    // count增
    increCount(state, action) {
      const item = state.cartsList.find(item => item.id === action.payload.id)
      item.count++
    },
    // count减
    decreCount(state, action) {
      const item = state.cartsList.find(item => item.id === action.payload.id)
      if (item.count === 1) {
        state.cartsList = state.cartsList.filter(cart=>cart.id !== item.id)
        console.log(state.cartsList);
        return 
      }
      item.count--
    },
    // 清除购物车
    clearCart(state,action){
      state.cartsList = []
    }

  }
})
// 异步获取商品信息
const { setFoodsList, setActiveIndex, addCart,increCount,decreCount,clearCart } = foodsStore.actions
const asyncFoodsList = () => {
  return async (dispatch) => {
    // 编写异步逻辑
    const res = await axios.get('http://localhost:3004/takeaway')
    // 调用dispatch函数提交action
    dispatch(setFoodsList(res.data))
  }
}

export { asyncFoodsList, setActiveIndex, addCart,increCount,decreCount,clearCart }
export default foodsStore.reducer