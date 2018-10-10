import React,{Component} from 'react'
import {Link} from 'react-router-dom'
import './index.less'

export default class NotMatch extends Component{
    
    render(){
        return(
            <div className='box' >
                <div className='text' >
                    <h1>404 this page is not found</h1>
                    <Link to='/admin/home' >
                        <p className='backhome' >回首页</p>
                    </Link>
                </div>
                {/* <div className='imgbox' >
                    <img src={notmatchimg} className='img'></img>
                </div> */}
            </div>
        )
    }
}