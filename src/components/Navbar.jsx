import React from 'react'
import {Link,NavLink} from 'react-router-dom'

const Navbar = () => {
    return (
        <div className="navbar navbar-dark bg-dark">
            <Link className="navbar-brand" to="/">AUTH</Link>
            <div className="d-flex">
                <NavLink className="btn btn-dark mr-2" to="/" exact activeClassName="active">
                    Inicio
                </NavLink>
                <NavLink className="btn btn-dark mr-2" to="/admin" activeClassName="active" >
                    Admin
                </NavLink>
                <NavLink className="btn btn-dark mr-2" to="/login" activeClassName="active" >
                    Login
                </NavLink>
            </div>
        </div>
    )
}

export default Navbar
