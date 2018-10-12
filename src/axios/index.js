import axios from 'axios'
import { resolve } from 'url';
import { rejects } from 'assert';
export default class Axios{
    static instance=axios.create({
        baseURL:'https://www.easy-mock.com/mock/5bbb8bf854d6771eb592838d',
        timeout:150000
    })

    static get(url,data,confing){
        return new Promise((resolve,reject)=>{
            this.instance.get(url, {params: data}, confing).then(res => {
                resolve(res.data)
            }).catch(err=>{
                reject(err)
            })
        })
    }
    static post(url,data,confing){
        return new Promise((resolve,reject)=>{
            this.instance.post(url,data,confing).then(res=>{
                resolve(res.data)
            }).catch(err=>{
                reject(err)
            })
        })
    }
}