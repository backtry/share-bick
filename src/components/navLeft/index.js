import React,{Component} from 'react'
import { Menu, Icon, Button } from 'antd';
import {Link} from 'react-router-dom'
import './index.less'

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

export default class NavLeft extends Component{
    state = {
        collapsed: false,
      }
    
      toggleCollapsed = () => {
        this.setState({
          collapsed: !this.state.collapsed,
        });
      }
    
    render(){
        return(
            <div className="navLeft-box">
                <Menu
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                mode="inline"
                theme="dark"
                inlineCollapsed={this.state.collapsed}
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
                </Menu>
            </div>
        )
    }
}