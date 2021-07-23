import React from 'react'
import {Link,NavLink} from 'react-router-dom'
import {auth} from "../firebase"
import {withRouter} from "react-router-dom"


import {useDispatch,useSelector} from 'react-redux'
import {cerrarSesionUsuarioAccion} from '../Redux/usuarioDucks.js'

const Navbar = (props) => {
    
    const {firebase}=props

    const dispatch= useDispatch()
    const activo=useSelector(store => store.usuarioGoogle.activo)

    const cerrarSesion =()=>{
        dispatch(cerrarSesionUsuarioAccion())
        
        auth.signOut().then(()=>{
            props.history.push('/login')
        })
        props.history.push('/login')
        
    }

    return (
        <div className="navbar navbar-dark bg-dark">
            <Link className="navbar-brand" to="/">AUTH</Link>
            <div className="d-flex">
                <NavLink className="btn btn-dark mr-2" to="/" exact activeClassName="active">
                    Inicio
                </NavLink>
                {
                    firebase!== null &&(
                        <>
                        <NavLink className="btn btn-dark mr-2" to="/perfil" activeClassName="active" >
                            Perfil
                        </NavLink>
                        <NavLink className="btn btn-dark mr-2" to="/admin" activeClassName="active" >
                            Admin
                        </NavLink>
                        <NavLink className="btn btn-dark mr-2" to="/redux" exact activeClassName="active">
                            Redux
                        </NavLink>
                        </>
                    )
                }
                {
                    // firebase!== null?(
                        activo || (firebase!== null) ?(
                        <button className="btn btn-dark" onClick={()=>cerrarSesion()}>Cerrar Sesión</button>
                    )
                    :
                    (
                    <NavLink className="btn btn-dark mr-2" to="/login" activeClassName="active" >
                        Login
                    </NavLink>
                    )
                }
               {/* <button className="btn btn-dark" onClick={()=>cerrarSesion()}>2Salir</button> */}
            </div>
        </div>
    )
}

export default withRouter(Navbar)
