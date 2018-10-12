import React,{Component} from 'react'
import { Form, Icon, Input,Card,Button,Cascader,Select,DatePicker,Table,Modal,message   } from 'antd';
import axios from '../../axios/index'
import './index.less'

const FormItem = Form.Item;
const Option = Select.Option;
const {  RangePicker } = DatePicker;

class orderPage extends Component{
    constructor(props){
        super(props)
    }

    state={
        tableDataSource:[],
        paginztion:{
            total:0,
            pageSize:10,
            current: 1
        },
        pn:1,
        isLoading:false,
        selectedKey:'',
        orderEndItem:[],

        
    }
    //----------------------------------值---------------------------------
    cityData = [
        {
            label: '北京',
            id: '0'
        },
        {
            label: '上海',
            id: '1'
        },
        {
            label: '广东',
            id: '2'
        }
    ]

    orderData = [
        {
            label: '全部',
            id: 0
        },
        {
            label: '进行中',
            id: 1
        },
        {
            label: '结束行程',
            id: 2
        }
    ]
    
    tableColumns = [
        {
            title:'订单编号',
            dataIndex:'order_sn',
            key: 'order_sn'
        },
        {
            title: '车辆编号',
            dataIndex: 'bike_sn',
            key: 'bike_sn'
        },
        {
            title: '用户名',
            dataIndex: 'user_name',
            key: 'user_name'
        },
        {
            title: '手机号',
            dataIndex: 'mobile',
            key: 'mobile'
        },
        {
            title: '里程',
            dataIndex: 'distance',
            render(distance){
                return distance/1000 + 'Km';
            },
            key: 'distance'
        },
        {
            title: '行驶时长',
            dataIndex: 'total_time',
            key: 'total_time'
        },
        {
            title: '状态',
            dataIndex: 'status',
            key: 'status'
        },
        {
            title: '开始时间',
            dataIndex: 'start_time',
            key: 'start_time'
        },
        {
            title: '结束时间',
            dataIndex: 'end_time',
            key: 'end_time'
        },
        {
            title: '订单金额',
            dataIndex: 'total_fee',
            key: 'total_fee'
        },
        {
            title: '实付金额',
            dataIndex: 'user_pay',
            key: 'user_pay'
        }
    ]

    rowSelection = {
        type:'radio',
        onChange: (selectedRowKeys, selectedRows) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);

            this.setState({
                selectedKey:selectedRowKeys,
                selectedItem:selectedRows
            })
        }
      };

    //----------------------------------函数--------------------------------
    //获取表单值
    handleSearch=()=>{
        const formData=this.props.form.getFieldsValue()
        console.log(formData)
    }
    //重置表单
    resetData=()=>{
        this.props.form.resetFields()
    }
    //获取表格数据
    getTableData=()=>{
        let params = {
            page: this.state.pn
        }
        this.setState({
            isLoading:true
        },()=>{
            axios.get('/order/list',params).then(res=>{
                console.log(res)
                let tabledata = res.result.item_list
                this.setState({
                    tableDataSource:tabledata.map((item,index)=>{
                        item.key = index
                        return item
                    }),
                    isLoading:false,
                    paginztion:{
                        total:res.result.total_count,
                        current:this.state.pn,
                        pageSize:10,
                        onChange: (page) => {
                            console.log(page)
                            this.setState({
                                pn: page
                            }, () => this.getTableData()
                            )
                        }
                    }
                })
            })
        })
    }
    //结束订单弹窗
    handleOrderDone=()=>{
        let orderItemMassage = this.state.selectedItem[0]
        if(orderItemMassage){
            this.setState({
                visible:true
            })
            axios.get('/order/ebike_info',{id:orderItemMassage.id}).then(res=>{
                this.setState({
                    orderEndItem:res.result
                })
            })
        }else{
            Modal.info({
                title: '提示',
                content: '请选择一个订单'
            })
        }
    }
    //用户确定删除订单
    handleOrderEnd=()=>{
        let _this = this
        let id = this.state.selectedItem[0].id
        this.setState({
            visible:false    
        },()=>{
            axios.get('order/finish_order',{id}).then(res=>{
                if(res.code == 0){
                    message.success('删除订单成功');
                    _this.getTableData()    
                }
            })
        })
    }
    //跳转到订单详情页
    handleOrderDetial=()=>{
        
    }
    //--------------------------------生命钩子-----------------------------
    componentWillMount(){
        this.getTableData()
    }
    render(){
        const { getFieldDecorator } = this.props.form;
        return(
            <div className='order-box' >
                <Card>
                    <Form layout="inline">
                        <FormItem
                            label='城市'
                        >
                            {getFieldDecorator('city',{
                                initialValue:'北京'
                            })(
                                <Select placeholder='请选择服务城市' style={{ width: 180 }}>
                                {this.cityData.map(item =>
                                    <Option value={item.id} key={item.id}>{item.label}</Option>
                                )}
                            </Select>
                            )}
                        </FormItem>
                        <FormItem
                            label='订单时间'
                        >
                            {getFieldDecorator('orderTime')(
                                <RangePicker />
                            )}
                        </FormItem>
                        <FormItem
                            label='订单状态'
                        >
                            {getFieldDecorator('order-status')(
                               <Select placeholder="请选择订单状态" style={{ width: 180 }} onChange={this.handlecityvalue}>
                               {this.orderData.map(item =>
                                   <Option value={item.id} key={item.id}>{item.label}</Option>
                               )}
                           </Select> 
                            )}
                        </FormItem>    
                    </Form>
                    <div className='mgtop-20'>
                        <Button type='primary' onClick={this.handleSearch} className='mgright-20'>查询</Button>
                        <Button  onClick={this.resetData}>重置</Button>
                    </div>
                </Card>
                <Card className='mgtop--1'>
                    <Button type='primary' className='mgright-20' onClick={this.handleOrderDetial}>订单详情</Button>
                    <Button type='primary' onClick={this.handleOrderDone} >结束订单</Button>
                </Card>
                <Card className='mgtop--1'>
                    <Table columns={this.tableColumns} 
                        dataSource={this.state.tableDataSource} 
                        pagination={this.state.paginztion}
                        rowSelection={this.rowSelection}
                        loading={this.state.isLoading}
                    />
                </Card>    
                <Modal title="Title"
                    visible={this.state.visible}
                    onOk={this.handleOrderEnd}
                    confirmLoading={this.state.confirmLoading}
                    onCancel={()=>{
                        this.setState({
                            visible:false
                        })
                    }}
                    >
                     <ul className='ul-data'>
                        <li>
                            <span className='fontw-700'>车辆编号：</span>
                            {this.state.orderEndItem.bike_sn}
                        </li>
                        <li>
                            <span className='fontw-700'>剩余电量：</span>
                            {this.state.orderEndItem.battery}
                        </li>
                        <li>
                            <span className='fontw-700'>行程开始时间：</span>
                            {this.state.orderEndItem.start_time}
                        </li>
                        <li>
                            <span className='fontw-700'>当前位置：</span>
                            {this.state.orderEndItem.location}
                        </li>

                    </ul>
                </Modal>
            </div>
        )
    }
}

export default Form.create()(orderPage)
