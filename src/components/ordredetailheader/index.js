import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import './index.less'

export default class OrderDetailHeader extends Component {
  render() {
    return (
      <div className='clearfix height-60 bgc39f'>
        <div className='fll pad-l-40'>
            <span className='fontsz-23 clo-white'>共享单车后台系统</span>
        </div>
        <div className='flr'>
            <div className='fll pad-r-20'>
                <span className='clo-white'>你好，</span>
                <span className='clo-f9c700'>欧成</span>
            </div>
            <div className='fll pad-r-40'>
                <Link to='/login' className='clo-f9c700'>退出</Link>
            </div>
        </div>
        <div>
            
        </div>
      </div>
    )
  }
}
