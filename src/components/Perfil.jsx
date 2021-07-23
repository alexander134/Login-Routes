import React from 'react'
import {useSelector} from "react-redux"

const Perfil = () => {

    const usuario = useSelector(store=>store.usuarioGoogle.user)
    console.log(usuario);
    return (
        <div className="mt-5 text-center">
            <div className="card">
                <div className="card-body">
                    <img src="" alt="" />
                    <h5 className="card-title">Nombre de Usuario</h5>
                    <p className="card-text">Email:</p>
                    <button className="btn btn-dark">Editar Nombre</button>
                </div>
            </div>
        </div>
    )
}

export default Perfil
