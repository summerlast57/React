import classNames from 'classnames'
import Count from '../Count'
import { useDispatch, useSelector } from "react-redux";
import { increCount,decreCount,clearCart } from '../../store/modules/takeaway';
import './index.scss'
import { useState } from 'react';

const Cart = () => {
  const {cartsList} = useSelector(state=>state.foods)

  const totalPrice= cartsList.reduce((p,v)=>p+v.price*v.count,0)

  const dispatch = useDispatch()

  // 控制购物车打开关闭的开关
  const [visable,setVisable] = useState(false)
  const show = ()=>{
    if(cartsList.length >0){
      setVisable(true)
    }
  }
  return (
    <div className="cartContainer">
      {/* 遮罩层 添加visible类名可以显示出来 */}
      <div
        className={classNames('cartOverlay',visable && cartsList.length > 0 && 'visible')}
        onClick={()=>setVisable(false)}
      />
      <div className="cart">
        {/* fill 添加fill类名可以切换购物车状态*/}
        {/* 购物车数量 */}
        <div onClick={show} className={classNames('icon', cartsList.length > 0 && 'fill')}>
          {true && <div className="cartCornerMark">{cartsList.length}</div>}
        </div>
        {/* 购物车价格 */}
        <div className="main">
          <div className="price">
            <span className="payableAmount">
              <span className="payableAmountUnit">¥</span>
              {totalPrice.toFixed(2)}
            </span>
          </div>
          <span className="text">预估另需配送费 ¥5</span>
        </div>
        {/* 结算 or 起送 */}
        {cartsList.length > 0 ? (
          <div className="goToPreview">去结算</div>
        ) : (
          <div className="minFee">¥20起送</div>
        )}
      </div>
      {/* 添加visible类名 div会显示出来 */}
      <div className={classNames('cartPanel',visable && cartsList.length >0 &&'visible')}>
        <div className="header">
          <span className="text">购物车</span>
          <span className="clearCart" onClick={()=>dispatch(clearCart())}>
            清空购物车
          </span>
        </div>

        {/* 购物车列表 */}
        <div className="scrollArea">
          {cartsList.map(item => {
            return (
              <div className="cartItem" key={item.id}>
                <img className="shopPic" src={item.picture} alt="" />
                <div className="main">
                  <div className="skuInfo">
                    <div className="name">{item.name}</div>
                  </div>
                  <div className="payableAmount">
                    <span className="yuan">¥</span>
                    <span className="price">{item.price}</span>
                  </div>
                </div>
                <div className="skuBtnWrapper btnGroup">
                  <Count
                    count={item.count}
                    onPlus={()=>dispatch(increCount({id:item.id}))}
                    onMinus={()=>dispatch(decreCount({id:item.id}))}
                  />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Cart
