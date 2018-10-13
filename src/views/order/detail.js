import React, { Component } from 'react'
import {Card} from 'antd'
import OrderDetailHeader from '../../components/ordredetailheader/index'
import './detail.less'
import axios from '../../axios/index'
import startIconImage from '../../style/images/mapIconImg/start_point.png'
import endIconImage from '../../style/images/mapIconImg/end_point.png'

export default class OrderMap extends Component {

    state={
        orderInfo:{}
    }

    //-------------------------------------函数----------------------------------------------
    //初始化地图
    initMap=(result)=>{
        const BMap = window.BMap
        this.map = new BMap.Map("bmap-content");
        this.addControl()
        this.drawpolyline(result.position_list)
        this.drawPolygon(result.area)
    }
    //添加控件
    addControl=()=>{
        const BMap = window.BMap
        let map = this.map
        map.addControl(new BMap.NavigationControl({
            anchor: window.BMAP_ANCHOR_TOP_RIGHT        
        }));
        map.addControl(new BMap.ScaleControl({
            anchor: window.BMAP_ANCHOR_TOP_RIGHT        
        }));
        map.addControl(new BMap.MapTypeControl({
            anchor: window.BMAP_ANCHOR_TOP_LEFT        
        }));
    }
    //绘制折线图
    drawpolyline=(position_list)=>{
        const BMap = window.BMap
        let map = this.map

        let startPoint = position_list[0] //折线起点
        let endPoint = position_list[position_list.length-1] //折线终点
        let startBmapPoint =  new BMap.Point(startPoint.lon, startPoint.lat) //绘制标注起点
        let endBmapPoint =  new BMap.Point(endPoint.lon, endPoint.lat)  //绘制标注终点
        let point = new BMap.Point(startPoint.lon, startPoint.lat);    
        
        //定义Icon
        let startIcon = new BMap.Icon(startIconImage, new BMap.Size(46, 50), {    
            imageSize : new BMap.Size(46, 50) 
        });
        let endIcon = new BMap.Icon(endIconImage, new BMap.Size(46, 50), {    
            imageSize : new BMap.Size(46, 50) 
        });

        let startMarker = new window.BMap.Marker(startBmapPoint,{icon:startIcon})
        let endMarker = new window.BMap.Marker(endBmapPoint,{icon:endIcon})
        map.addOverlay(startMarker)
        map.addOverlay(endMarker)
        
        let polylineArr = position_list.map(point => {
            return new BMap.Point(point.lon, point.lat)
        })
        var polyline = new BMap.Polyline(polylineArr,
            {strokeColor:"#003399", strokeWeight:3, strokeOpacity:0.8}
            );
        map.addOverlay(polyline);

        map.centerAndZoom(point, 12); //绘制折线
        

    }
    //绘制服务区
    drawPolygon=(area)=>{
        const BMap = window.BMap
        const map = this.map
        let polygonArr = area.map(point => {
            return new BMap.Point(point.lon, point.lat)
        })
        const polygon = new BMap.Polygon(polygonArr,{
            strokeColor: '#ff0000',
            fillColor:'#ffcc33',
            strokeWeight:2,
            fillOpacity:0.3,
            strokeStyle:'dashed'
        })
        map.addOverlay(polygon)
    }
    getOrderData=()=>{
        const id= this.props.match.params.id 
        axios.get('/order/detail',{id:id}).then(res=>{
            if(res.code==0){
                console.log(res)
                this.initMap(res.result)
                this.setState({
                    orderInfo: res.result
                })
            }
        })
    } 
    //-------------------------------------钩子----------------------------------------------
    componentDidMount(){
        this.getOrderData()
    }

  render() {
    const info = this.state.orderInfo
    return (
      <div>
          <OrderDetailHeader></OrderDetailHeader>
          <Card>
              <div>
                  <div className='het-600 mg-0-100' id='bmap-content'></div>
              </div>
          </Card>
          
          <div className="clearfix detail-massage-box">
                        <div className="detail-info fll wid-700 ml-detail-left h-162">
                            <div className="item-title">
                                基础信息
                            </div>
                            <ul>
                                <li>
                                    <span className="info-left">用车模式:</span>
                                    <span className="info-right">{info.mode == 1 ? '服务区': '停车点'}</span>
                                </li>
                                <li>
                                    <span className="info-left">订单编号:</span>
                                    <span className="info-right">{info.order_sn}</span>
                                </li>
                                <li>
                                    <span className="info-left">车辆编号:</span>
                                    <span className="info-right">{info.bike_sn}</span>
                                </li>
                                <li>
                                    <span className="info-left">用户姓名:</span>
                                    <span className="info-right">{info.user_name}</span>
                                </li>
                                <li>
                                    <span className="info-left">手机号码:</span>
                                    <span className="info-right">{info.mobile}</span>
                                </li>
                            </ul>
                        </div>
                        <div className="detail-info flr wid-700 ml-detail-rigtl h-162">
                            <div className="item-title">
                                行驶轨迹
                            </div>
                            <ul className='info-wrap'>
                                <li>
                                    <span className="info-left">行程起点:</span>
                                    <span className="info-right">{info.start_location}</span>
                                </li>
                                <li>
                                    <span className="info-left">行程终点:</span>
                                    <span className="info-right">{info.end_location}</span>
                                </li>
                                <li>
                                    <span className="info-left">行驶里程:</span>
                                    <span className="info-right">{info.distance/1000 + 'KM'}</span>
                                </li>
                            </ul>
                        </div>
            </div>
          
      </div>
    )
  }
}
