import { Button, DatePicker, Input, NavBar } from 'antd-mobile'
import Icon from '../../components/Icon'
import './index.scss'
import classNames from 'classnames'
import { billListData } from '../../contants'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { asyncAddBillList } from '../../store/modules/billStore'
import { useDispatch } from "react-redux";
import dayjs from 'dayjs'

const New = () => {
  const navigate = useNavigate()
  const [billType,setBillType] = useState('pay')
  const dispatch = useDispatch()

  // 获取金额
  const [money,setMoney] = useState(0)
  const changeMoney = (value)=>{
    setMoney(value)
  }

  // 获取账单类型
  const [useFor,setUseFor] = useState('')

  // 添加账单
  const saveBill = ()=>{
    // 获取账单数据
    const data = {
      type:billType,
      money:billType === 'pay' ? -money: money,
      date:currentDate,
      useFor:useFor
    }
    dispatch(asyncAddBillList(data)) 
  }

  const [dateVisible,setVisible] = useState(false)

  const [currentDate,setDate] = useState()
  const dateConfirm =(date)=>{
    setDate(date)
    setVisible(false)
    

  }


  return (
    <div className="keepAccounts">
      <NavBar className="nav" onBack={() => navigate(-1)}>
        记一笔
      </NavBar>

      <div className="header">
        <div className="kaType">
          <Button
            shape="rounded"
            className={classNames(billType === 'pay'? 'selected':'')}
            onClick={()=>setBillType('pay')}
          >
            支出
          </Button>
          <Button
            className={classNames(billType === 'income'? 'selected':'')}
            onClick={()=>setBillType('income')}
            shape="rounded"
          >
            收入
          </Button>
        </div>

        <div className="kaFormWrapper">
          <div className="kaForm">
            <div className="date">
              <Icon type="calendar" className="icon" />
              <span className="text" onClick={()=>setVisible(true)}>{dayjs(currentDate).format('YYYY-MM-DD')}</span>
              {/* 时间选择器 */}
              <DatePicker
                className="kaDate" 
                title="记账日期"
                max={new Date()}
                visible={dateVisible}
                onConfirm={dateConfirm}
              />
            </div>
            <div className="kaInput">
              <Input
                className="input"
                placeholder="0.00"
                type="number"
                value={money}
                onChange={changeMoney}
              />
              <span className="iconYuan">¥</span>
            </div>
          </div>
        </div>
      </div>

      <div className="kaTypeList">
        {billListData[billType].map(item => {
          return (
            <div className="kaType" key={item.type}>
              <div className="title">{item.name}</div>
              <div className="list">
                {item.list.map(item => {
                  return (
                    <div
                      className={classNames(
                        'item',
                        useFor === item.type ? 'selected':''
                      )}
                      key={item.type}
                      onClick={()=>setUseFor(item.type)}

                    >
                      <div className="icon">
                        <Icon type={item.type} />
                      </div>
                      <div className="text">{item.name}</div>
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>

      <div className="btns">
        <Button className="btn save" onClick={saveBill}>
          保 存
        </Button>
      </div>
    </div>
  )
}

export default New