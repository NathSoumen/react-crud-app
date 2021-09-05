import React, {  useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../../components/api'
import './style.css'

export default function AddMemory() {

    const [title, setTitle] = useState('')
    const [Description, setDescription] = useState('')
    const [filename,SetFilename] = useState('')
    const [isAdded,setIsAdded] = useState(false)
    const [submited,setSubmited] = useState(false)

    const [tokenFound,settokenFound] = useState(false)
    useEffect(() => {
       async function load(){
         let {data} = await api.get("/users")
        if(data.auth === false) {
            return null
        }
        settokenFound(true)
        
        }
        load()
    },[])
    const onChangeFile = (e) => {
        SetFilename(e.target.files[0])
    }
    const insertTitle = (e) => {
        setTitle(e.target.value)
    }
  
    const insertDesc = (e) => {
        setDescription(e.target.value)
    }

    const submitForm =(e) => {
        const formData = new FormData()
        formData.append("title",title)
        formData.append("description",Description)
        formData.append("memoImage",filename)

        e.preventDefault()
        api.post('/memo/add',formData).then((reps) => {
            setSubmited(true)
            console.log(reps.data.auth)
            if(reps.data.auth === false) {
                setIsAdded(false)
            } else {
                setIsAdded(true)

            }
        }).catch(err => {
            setSubmited(false)
            setIsAdded(false)
            console.log(err);
        })
    }
    return (
        <div>
            {tokenFound ? ( <form className="Mem-form" encType="multipart/form-data" onSubmit={submitForm}>
        {submited ? isAdded ? (<h2 style={{color:"green"}}>Memo Added Sucessfully</h2>):
            (<h2 style={{color:"red"}}>Error try again</h2>) : <h2 style={{color:"blue"}}>Insert Your Memo</h2> }
            
            <div className="mb-3">       
                              
                <div>
                    <label className="form-label" htmlFor="name">Image Title</label>
                    <input className="form-control" type="text" id="name" placeholder="Title"
                        value={title} onChange={insertTitle} name="Title" required />
                </div>             
                <div>
                    <label className="form-label" htmlFor="desc">Image Description</label>
                    <textarea className="form-control" id="desc" name="Description" value={Description} onChange={insertDesc} rows="2"
                        placeholder="Description" required></textarea>

                </div>
                <div className="input-group mb-3">
                    <input onChange={onChangeFile} type="file" className="form-control" id="inputGroupFile02" name="memoImage" />
                </div>
                <div>
                    <button className="btn btn-primary" type="submit">Submit</button>
                </div>
            </div>
        </form>) : (
                
                <Link style={{color:"red", textAlign:"center",padding:'1rem'}} to="/user"><h1>Please login</h1></Link>
            
                 )} 
        </div>
       

    )
}
