import React from 'react'
import { Link } from 'react-router-dom'
import './Index.css'

export default function Errorpage() {
    return (
        <div className="error-page">
            <div>
            <Link to="/"><h1 className="err-mesg">No Page is found</h1></Link>
            </div>
        </div>
    )
}
