import React,{Component} from 'react'
import { Menu, Icon, Button } from 'antd';
import {Link} from 'react-router-dom'
import './index.less'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import action from '../../redux/action/index'

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

class NavLeft extends Component{
    state = {
        collapsed: false,
      }
    
      toggleCollapsed = () => {
        this.setState({
          collapsed: !this.state.collapsed,
        });
      }
      clickMuneItem=({item, key, keyPath})=>{
        const text = item.props.children[1].props.children
        this.props.action.changeMenuItem(text)
      }

    render(){
        
        return(
            <div className="navLeft-box">
                <Menu
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                mode="vertical"
                theme="dark"
                onClick={this.clickMuneItem}                
                >
                    <Menu.Item key="1">
                        <Icon type="home" theme="twoTone" twoToneColor="#66ccff" />
                        <span>首页</span>
                        <Link to="/admin/home"></Link>
                    </Menu.Item>
                    <Menu.Item key="2">
                        <Icon type="profile" theme="twoTone" twoToneColor="#66ccff" />
                        <span>订单管理</span>
                        <Link to="/admin/order"></Link>
                    </Menu.Item>
                    {/* <Menu> */}
                        <SubMenu 
                        title={<span ><Icon type="project" theme="twoTone" twoToneColor="#66ccff"  /><span>图例</span></span>}
                        >
                            <Menu.Item key="3">
                                <Icon type="pie-chart" theme="twoTone" twoToneColor="#66ccff" />
                                <span>饼状图</span>
                                <Link to="/admin/chart/piechart"></Link>
                            </Menu.Item>
                            <Menu.Item key="4">
                                <Icon type="project" theme="twoTone" twoToneColor="#66ccff" />
                                <span>柱状图</span>
                                <Link to="/admin/chart/barchart"></Link>
                            </Menu.Item>
                        </SubMenu>
                    {/* </Menu> */}
                </Menu>
            </div>
        )
    }
}
export default connect(
    null,
    (dispatch)=>({
        action: bindActionCreators(action,dispatch)
    })
    
)(NavLeft)