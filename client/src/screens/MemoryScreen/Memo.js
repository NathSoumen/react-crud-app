import React, { useEffect, useState } from 'react'
import api from '../../components/api'
import './memo.css'
import { Redirect } from 'react-router'

export default function Memo(props) {

    const [memo, setMemo] = useState([])
    const [delMemo,setDelmemo] = useState(false)
    const [repon, setRepon] = useState('');
    const [memoUserId, setUserId]  = useState('')
    const [currentUser, setCurrentUser] = useState('')

    useEffect(() => {

        async function n() {
            let { data } = await api.get('/memo/' + props.match.params.id)
             await api.get('/users/currentUser').then(re => {
                setCurrentUser(re.data['userID'])
             })
            setMemo(data)
            setUserId(data.authorId)
            

        }
        n()

    }, [])

    const deleteRequrest = async() => {
        await api.delete(`/memo/${props.match.params.id}/delete`).then(res => {
            setRepon(res)
            setDelmemo(true)
            console.log(repon)
        }).catch(err => {
            setRepon(err)
            setDelmemo(false)
        })
    }
    
    if(delMemo) {
        return <Redirect to="/" />
    }  else {
        return (
            <div className="memo-div">
          
                <div className="memo-head">
                    <h1 className="memo-title">{memo.title}</h1>
                    <div className="memo-image-container"> <img className="memo-image-img" src={`/uploads/${memo.Image}`} alt="..."/></div>
    
                </div>
                <div className="memo-details">                
                    <div className="memo-desc">
                        <p>{memo.Description}</p>
                        <br />
                        <h5>Owner: {memo.author}</h5>
                    </div>
                    {( memoUserId === currentUser) && (<div className="memo-button">
                        <a href={`/memo/${props.match.params.id}/edit`}>edit</a>
                        <a href="/" onClick={deleteRequrest}>delete</a>
                    </div>) }
                    
                </div>
            </div>
        )
    }
  
}
