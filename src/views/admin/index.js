import React,{Component} from 'react'
import {Row,Col} from 'antd'

import Footer from '../../components/footer/index'
import Header from '../../components/header/index'
import NavLeft from '../../components/navLeft/index'

export default class Admin extends Component{
    
    render(){
        return(
            <div className='admin'>
                <Row>
                    <Col span={4}>
                        <NavLeft></NavLeft>
                    </Col>
                    <Col span={20}>
                        <Header></Header>
                        <div className="content-wrap">
                            {this.props.children}
                        </div>
                        <Footer></Footer>
                    </Col>
                </Row>
            </div>
        )
    }
}