import React, { useEffect, useState } from 'react'
import api from '../../components/api'
import MemItem from '../MemoryScreen/MemItem'
export default function Mypost() {
    const [mypost, setMypost] = useState([])
    const [myId, setMyid] = useState('')


    useEffect(() => {
        // api.get('/')
        async function apihandle() {
            await api.get('/users/currentUser').then((doc) => {
                setMyid(doc.data.userID)
            }).catch(err => {
                console.log(err)
            })

        }
        async function getdata(id) {
            if (id) {
                await api.get(`/memo/mypost/${id}`).then((doc) => {
                    setMypost(doc.data)
                }).catch(err => {
                    console.log(err)
                })
            }

        }

        apihandle()
        getdata(myId)


    }, [myId])
    return (
        <div>
            {(myId !== undefined) ?
             <div>
                {   (mypost.length > 0) ?  mypost.map(myfile => {
                        return <MemItem key={myfile._id} memo={myfile} />
                    }) : <h1 style={{color:"blue",textAlign:"center", padding:"1rem",margin:"1rem"}}>No data found</h1>
                    
                })
            </div> : (<a style={{ color: "red", textAlign: "center", padding: '1rem' }} href="/user"><h1>Please login</h1></a>)}

{}




        </div>

    )

}
