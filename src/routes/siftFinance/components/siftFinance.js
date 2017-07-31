import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './siftFinance.scss'
import Spinner from 'react-spinkit'
import { IndexLink, Link } from 'react-router'
import Nav from '../../../components/Nav'

export default class siftFinance extends Component {
  componentDidMount () {
    const { fetchSiftFinance, siftFinance: { fetching, text } } = this.props
    fetchSiftFinance()

  }
  componentDidUpdate(){
    //环形进度条
    var circleEle = document.getElementsByClassName('circle');
    for(var i=0; i<circleEle.length; i++){
      var that = circleEle[i]
      var num = parseInt(that.getElementsByTagName('em')[0].innerHTML)
      num = num*3.6
      if(num<=180){
        that.getElementsByClassName('right')[0].style.transform = 'rotate('+num+'deg)'
      }else{
        that.getElementsByClassName('right')[0].style.transform = 'rotate(180deg)'
        that.getElementsByClassName('left')[0].style.transform = 'rotate(' + (num - 180) + 'deg)'
      }
    }
    //倒计时
    var countDown = document.getElementsByClassName('countdown');
    for(var i=0; i<countDown.length; i++){
      var that = countDown[i],
          countDownText = that.getAttribute('data-time'),
          curTimeText = that.getAttribute('data-curtime');
      if(!that)return
      countDownFun(countDownText,curTimeText,that);
    }
    function addzero(a){
        if(a<10){
            return a='0'+a;
        }else{return a}
    }
    function caculateDate(time){
        var d = parseInt(time/86400);
        var h = parseInt((time%86400)/3600);
        var m = parseInt(((time%86400)%3600)/60);
        var s = parseInt(((time%86400)%3600)%60);
        var t = d+'天'+addzero(h)+':'+addzero(m)+':'+addzero(s);
        return t;
    }
    function countDownFun(date,curData,Time){
        var time =(Date.parse(date.replace(/-/g,'/')) - Date.parse(curData.replace(/-/g,'/')))/1000;
        Time.innerHTML = caculateDate(time);
        var clearTime = setInterval(function(){
            time -= 1;
            Time.innerHTML = caculateDate(time);
            if(time == 0){
                location.reload();
            }
        },1000);
    }

  }
  render () {
    const { fetchSiftFinance, clearSiftFinance, siftFinance: { fetching, text } } = this.props
    return (
      <div>
        <Nav />
        <div className='loading'>
          { fetching ?
            <Spinner spinnerName='double-bounce' /> : ''
          }
        </div>
        <div className="pd-cont">
          {text.map(item => (
            <div key={item.id}>{JSON.parse(item.text).map(i => (
              <Link to='/ProductView' className="pd-list" key={i.id}>
                <div className="list-tit">
                  <h2>{i.title}
                    <span className={i.status===1 ? "forsale" : "hide"}>待售</span>
                  </h2>
                  <span className={i.status===1 ? "count-down" : "hide"}>倒计时：<em className="countdown" data-time={i.startTimeText} data-curtime={i.serverTimeText}></em></span>
                  <span className={i.productType2Id===1 ? "vip" : "hide"}>新手专享</span>
                </div>
                <ul className="list-info">
                  <li className={i.eventSpecificIncome!=0 ? "":"hide"}><p className="earn">{i.interestRateText}<span className="event">{i.eventSpecificIncomeText}</span></p><span>预期年化收益</span></li>
                  <li className={i.eventSpecificIncome===0 ? "":"hide"}><p className="earn">{i.interestRateText}</p><span>预期年化收益</span></li>
                  <li><p>{i.investmentTimeText}</p><span>{i.startAmountText}元起投</span></li>
                  <li>
                    <div className={i.status===0 && i.appTemplateType===6 && i.appointment===1 ? "ac-warn":"hide"}>预约中</div>
                    <div className={i.status===0 ? "circle":"hide"}>
                      <div className="pie_left">
                        <div className="left"></div>
                      </div>
                      <div className="pie_right">
                        <div className="right"></div>
                      </div>
                      <div className="mask"><em>{parseInt(i.remainingPercentage)}</em>%<br/>可购</div>
                    </div>
                    <div className={i.status===2 ? "ac-warn haswarn":"hide"}>已售罄</div>
                    <div className={i.status===1 && i.appointment===0 ? "ac-warn remind":"hide"} data-proid={i.id}>提醒</div>
                    <div className={i.status===1 && i.appointment!=0? "ac-warn haswarn":"hide"}>已提醒</div>
                  </li>
                </ul>
              </Link>
            ))}</div>
          ))}
        </div>
      </div>
    )
  }
}

siftFinance.propTypes = {
  siftFinance: PropTypes.object.isRequired
}
