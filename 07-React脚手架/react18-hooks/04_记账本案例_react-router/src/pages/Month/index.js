import { NavBar, DatePicker } from 'antd-mobile'
import './index.scss'
import classnames from "classnames";
import { useMemo, useState,useEffect } from 'react'
import { useSelector } from "react-redux";
import _ from "lodash";
import dayjs from 'dayjs';
import DailyBill from './components/DailyBill';

const Month = () => {

  // 数据按月分组
  const { billList } = useSelector(state => state.bill)
  const monthGroup = useMemo(() => {
    return _.groupBy(billList, (item) => dayjs(item.date).format('YYYY-MM'))
  }, [billList])

  // 控制弹框的打开和关闭
  const [dateVisible, setDateVisible] = useState(false)
  // 控制时间显示
  const [currentMonth, setCurrentMonth] = useState(() => {
    return dayjs().format('YYYY-MM')
  })
  // 选中时间月份内的账单
  const [currentMonthList, setMonthList] = useState([])

  const dateConfirm = (date) => {
    setDateVisible(false)
    const month = dayjs(date).format('YYYY-MM')
    setCurrentMonth(month)
    setMonthList(monthGroup[month])
  }

  // 选中月份内的支出，收入，结余
  const overView = useMemo(()=>{
    const pay = currentMonthList.filter(item=>item.type==='pay').reduce((p,v)=>p+v.money,0)
    const income = currentMonthList.filter(item=>item.type==='income').reduce((p,v)=>p+v.money,0)
    const total = pay + income
    return {
      pay,income,total
    }
  },[currentMonthList])

  // 初始化时渲染一次账单列表
  useEffect(()=>{
    const nowDate = dayjs().format('YYYY-MM')
    if(monthGroup[nowDate]){
      setMonthList(monthGroup[nowDate])
    }

  },[monthGroup])

  // 单日帐单列表
  const dayGroup = useMemo(()=>{
    const dayData = _.groupBy(currentMonthList,(item)=>dayjs(item.date).format('YYYY-MM-DD'))
    const keys = Object.keys(dayData)
    return {
      dayData,
      keys
    }
  },[currentMonthList])


  return (
    <div className="monthlyBill">
      <NavBar className="nav" backArrow={false}>
        月度收支
      </NavBar>
      <div className="content">
        <div className="header">
          {/* 时间切换区域 */}
          <div className="date" onClick={() => setDateVisible(true)}>
            <span className="text">
              {currentMonth}账单
            </span>
            <span className={classnames('arrow', dateVisible && 'expand')}></span>
          </div>
          {/* 统计区域 */}
          <div className='twoLineOverview'>
            <div className="item">
              <span className="money">{overView.pay.toFixed(2)}</span>
              <span className="type">支出</span>
            </div>
            <div className="item">
              <span className="money">{overView.income.toFixed(2)}</span>
              <span className="type">收入</span>
            </div>
            <div className="item">
              <span className="money">{overView.total.toFixed(2)}</span>
              <span className="type">结余</span>
            </div>
          </div>
          {/* 时间选择器 */}
          <DatePicker
            className="kaDate"
            title="记账日期"
            precision="month"
            visible={dateVisible}
            max={new Date()}
            onConfirm={dateConfirm}
          />
        </div>
        {/* 单日列表统计 */}
        {
          dayGroup.keys.map(key=>{
            return (<DailyBill key={key} date={key} dayList={dayGroup.dayData[key]}  />)
          })
        }
        
      </div>
    </div >
  )
}

export default Month