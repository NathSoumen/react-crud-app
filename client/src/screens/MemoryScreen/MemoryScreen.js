import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../../components/api'
import MemItem from './MemItem'

export default function MemoryScreen() {
    const [memos, setMemos] = useState([])
    const [tokenFound,settokenFound] = useState(false)

   
    useEffect(() => {
        async function load(){
            let {data} = await api.get("/memo")
           
           if(data.auth === false) {
               localStorage.removeItem("token=f9jCrLBFEFSseA^3")
               settokenFound(false)   
               return null
           }
           settokenFound(true)           
           }
       async function apiHandle(){
        api.get('/memo').then(doc => {
            console.log(doc.data.error)
            if(doc.data.error === true) {
                return null
            }
            
            setMemos(doc.data)
        }).catch(err => {
            console.log(err)
        })
        }

        setTimeout(() => {
            load()
        },1000)
        apiHandle()
        
    }, [])

   

    return (
        <div>

         {(tokenFound && (memos !==null)) ?
                memos.map((memo) => {
                    return <MemItem key={memo._id} memo={memo}/>
                })
            :(
                
           <Link style={{color:"red", textAlign:"center",padding:'1rem'}} to="/user"><h1>Please login</h1></Link>
       
            )}           
        </div>
    )
}
