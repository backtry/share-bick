import React,{Component} from 'react'
import {Link} from 'react-router-dom'
import './index.less'
import utils from '../../utils/index'
import axios from 'axios'
import {connect} from 'react-redux'

const formDate = utils.formDate

 class Header extends Component{

    state={
        time:'没错，这就是时间',
        weather:'额，这个就是天气了 101280901'
    }
    
    getTime = () => {
        setInterval(()=>{
            let unixDate = new Date().getTime()
            let timeStr = formDate(unixDate)
            this.setState({
                time:timeStr
            })
        },1000)
    }
    getWeather = () =>{
        axios.get('http://t.weather.sojson.com/api/weather/city/101280901').then(res=>{
            console.log(res.data.data.forecast[0])
            let weatherdata = res.data.data.forecast[0]
            let seatherStr = `${weatherdata.type}  ${weatherdata.low}~${weatherdata.high} 风力：${weatherdata.fl}`
            this.setState({
                weather:seatherStr
            })
            
        })
    }

    componentWillMount(){
        this.getTime()
        this.getWeather()
    }

    render(){
        return(
            <div className='Header-box clearfix'>
                <div className='user-info clearfix'>
                    <div className='flr clearfix' >
                        <div className='user-detail fll'>
                            你好，{'  '}<span className='username' >faker</span>
                        </div>
                        <div className='logout fll' >
                            <Link to='/login' >退出</Link>
                        </div>
                    </div>
                </div>
                <div className='weather-wrap clearfix' >
                    <div className='breadcrumb-box fll' >
                        {this.props.MuneText.menuItemText}
                    </div>
                    <div className='weather-box flr clearfix' >
                        <div className="date fll" >
                            {this.state.time}
                        </div>
                        <div className='weather-detail fll' >
                            {this.state.weather}
                        </div>
                    </div>   
                </div>
            </div>
        )
    }
}

export default connect(
    function mapStateToProps(state){
        return{
            MuneText: state
        }
    }
)(Header)