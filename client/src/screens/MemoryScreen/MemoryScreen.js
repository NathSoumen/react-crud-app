import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../../components/api'
import MemItem from './MemItem'
import  Pagination  from '../pagination/Pagination'
export default function MemoryScreen() {
    const [memos, setMemos] = useState([])
    const [tokenFound,settokenFound] = useState(false)
    const [correntPage, setCurrentPage] = useState(1)
    const [postPerPage] = useState(5)
    const [loading,setLoading] = useState(false)

   
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
       await api.get('/memo').then(doc => {
            console.log(doc.data.error)
            if(doc.data.error === true) {
                return null
            }
            setLoading(false)
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

//    get current posts
    const indexOfLastPost = correntPage * postPerPage;
    const indexOfFirstPost = indexOfLastPost - postPerPage;
    const currentPosts     =  memos.slice(indexOfFirstPost,indexOfLastPost)

    // change page 
    const paginate = (pagesNumber) =>{
        setCurrentPage(pagesNumber)
    }
    if(loading) {
        return <h2>Loading ....</h2>
    } 
    return (
        <div>

         {(tokenFound && (memos !==null)) &&
           <div>
              {(correntPage !==1) && (
                   <h2 style={{textAlign:'center', fontSize:"1.5rem" , padding:"0.5rem"}}>page {correntPage}</h2>
              )}  
            {   
                
                currentPosts.map((memo) => {
                    return <MemItem key={memo._id} memo={memo} correntPage={correntPage}/>
                })}
            <Pagination postsPerPage={postPerPage} totalpost={memos.length} paginate={paginate}/>
            </div>
            }           
        </div>
    )
}
