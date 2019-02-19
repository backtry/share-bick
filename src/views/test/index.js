import React, { Component } from 'react'
import { Carousel } from 'antd'
import './index.less'

import img_1 from '../../style/images/swarp/01.jpg'
import img_2 from '../../style/images/swarp/02.jpg'
import img_3 from '../../style/images/swarp/03.jpg'
import img_4 from '../../style/images/swarp/04.jpg'

export default class Test extends Component {
  render() {
    return (
      <div className='test-box'>
        <div className='carousel-container' >
          <Carousel className='carousel'
            effect={'scrollx'}
            autoplay={true} 
            dots={true}
            easing={"ease"}
          >
            <div><img src={img_1} className='carouse-img' /></div>    
            <div><img src={img_2} className='carouse-img' /></div>
            <div><img src={img_3} className='carouse-img' /></div>
            <div><img src={img_4} className='carouse-img' /></div>
            {/* <div className='carouse-img-box1'></div>
            <div className='carouse-img-box2'></div>
            <div className='carouse-img-box3'></div>
            <div className='carouse-img-box4'></div> */}
          </Carousel>    
        </div>    
      </div>
    )
  }
}
