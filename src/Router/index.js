import React,{Component} from 'react'
import {HashRouter,Route,Switch} from 'react-router-dom'
import Home from '../views/home/index'
import NotMatch from '../views/notMatch/index'
import Admin from '../views/admin/index'
import Order from '../views/order/index'
import Test from '../views/test/index'

export default class Router extends Component{
    constructor(props){
        super(props)
    }
    render(){
        return(
            <HashRouter>
                <div>
                    <Switch>
                        <Route path='/' render={()=>
                           <Admin>
                               <Switch>
                               <Route path='/admin/test' component={Test} ></Route>
                               <Route path='/admin/home' component={Home} ></Route>
                               <Route path='/admin/order' component={Order} ></Route>
                               <Route  component={NotMatch} ></Route>
                               
                               </Switch>
                           </Admin>
                        }></Route>
                        <Route component={NotMatch}></Route>
                    </Switch>    
                </div>
            </HashRouter>
        )
    }
}