import React from 'react'
import {Link,NavLink} from 'react-router-dom'
import {auth} from "../firebase"
import {withRouter} from "react-router-dom"

const Navbar = (props) => {
    
    const {firebase}=props

    const cerrarSesion =()=>{
        auth.signOut().then(()=>{
            props.history.push('/login')
        })
        
    }

    return (
        <div className="navbar navbar-dark bg-dark">
            <Link className="navbar-brand" to="/">AUTH</Link>
            <div className="d-flex">
                <NavLink className="btn btn-dark mr-2" to="/" exact activeClassName="active">
                    Inicio
                </NavLink>
                {
                    firebase!== null ?(
                        <NavLink className="btn btn-dark mr-2" to="/admin" activeClassName="active" >
                            Admin
                        </NavLink>
                    ): null
                }
                
                {
                    firebase!== null?(
                        <button className="btn btn-dark" onClick={()=>cerrarSesion()}>Cerrar Sesión</button>
                    ):(
                    <NavLink className="btn btn-dark mr-2" to="/login" activeClassName="active" >
                        Login
                    </NavLink>
                    )
                }
                
            </div>
        </div>
    )
}

export default withRouter(Navbar)
