import { useEffect, useState } from 'react'
import './nav.css'
import api from '../api'
function Navbar() {
    const [toggle, setToggle] = useState(false)
    const [isAuthenticated, setAuthenticated] = useState(false)

    const removeToken = () => {
        localStorage.removeItem("token=f9jCrLBFEFSseA^3")
        setAuthenticated(false)
    }

    useEffect(() => {

        async function checkToken() {
            let token = await localStorage.getItem("token=f9jCrLBFEFSseA^3")
            if (token) {
                let { data } = await api.get("/users")
                if (data.auth === false) {
                    removeToken()
                }
                setAuthenticated(true)
            }
            else {
                setAuthenticated(false)
            }
        }
        checkToken()
    }, [isAuthenticated])


    return (
        <div className='nav-container'>
            <div className="nav-brand">
                <a href="/">Pro<span style={{color:"blue"}}>TON</span></a>
            </div>
            <div className="nav_toggle" onClick={() => setToggle(!toggle)}>
                <span className="bar"></span>
                <span className="bar"></span>
                <span className="bar"></span>
            </div>
            <ul className={`nav-lists ${toggle ? 'done' : ''}`}>
                <li><a href="/memo/add">build Memo</a></li>
                <li><a  href="/mypost">my post</a></li>
                {isAuthenticated ?
                    (   
                        <li><a onClick={removeToken} href="/">logout</a></li>
                    ) :
                    (
                        <li><a href="/user">login</a></li>
                    )}

                <li><a href="/about">about</a></li>
            </ul>


        </div>
    )
}
export default Navbar