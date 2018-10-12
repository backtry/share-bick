import React,{Component} from 'react'
import {Row,Col} from 'antd'
import './index.less'

import Footer from '../../components/footer/index'
import Header from '../../components/header/index'
import NavLeft from '../../components/navLeft/index'

export default class Admin extends Component{
    constructor(props){
        super(props)
    }
    render(){
        return(
            <div className='admin'>
                <Row>
                    <Col span={4}>
                        <NavLeft></NavLeft>
                    </Col>
                    <Col span={20}  style={{height:"100vh",overflow:'auto'}} >
                        <Header></Header>
                        <div className="content-wrap">
                            <div className='content-box'>
                                {this.props.children}
                            </div>
                        </div>
                        <Footer></Footer>
                    </Col>
                </Row>
            </div>
        )
    }
}