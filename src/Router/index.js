import React,{Component} from 'react'
import {HashRouter,Route,Switch} from 'react-router-dom'
import Home from '../views/home/index'
import NotMatch from '../views/notMatch/index'
import Admin from '../views/admin/index'

export default class Router extends Component{
    
    render(){
        return(
            <HashRouter>
                <div>
                    <Switch>
                        <Route path='/' render={()=>
                           <Admin>
                               <Router path='/admin/home' component={Home} ></Router>
                           </Admin>
                        }></Route>
                        <Route  component={NotMatch} ></Route>
                    </Switch>    
                </div>
            </HashRouter>
        )
    }
}