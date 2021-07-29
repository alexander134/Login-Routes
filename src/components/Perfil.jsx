import React,{useState} from 'react'
import {useSelector,useDispatch} from "react-redux"
import {actualuzarNombreUsuario,editarFotoAccion} from '../Redux/usuarioDucks'

const Perfil = () => {

    const usuario = useSelector(store=>store.usuarioGoogle.user)
    const loading =useSelector(store => store.usuarioGoogle.loading)
    //console.log(usuario);
    const [editarNombre, setEditarNombre] = useState(usuario.displayName)
    const [viewForm, setViewForm] = useState(false)
    const [error, setError] = useState(false)

    const dispatch = useDispatch()

    const actualizarUsuario = () =>{
        if(!editarNombre.trim()){
            return
        }
        dispatch(actualuzarNombreUsuario(editarNombre))
        setViewForm(false)
    }
    const seleccionarFoto = (imagen) =>{
        console.log(imagen.target.files[0])
        const imgCliente =imagen.target.files[0];

        if (imgCliente === undefined) {
            console.log("error sin seleccionar imagen");
            return
        }
        if(imgCliente.type==="image/png" ||imgCliente.type=== "image/jpeg"){
            // console.log("entro");
            setError(false)
            dispatch(editarFotoAccion(imgCliente))
            
        }else{
            setError(true)
        }
    }


    return (
        <div className="mt-5 text-center">
            <div className="card">
                <div className="card-body">
                    <img src={usuario.photoURL} alt="imagen" width={100} className="img-fluid rounded-circle"/>
                    <h5 className="card-title">{usuario.displayName}</h5>
                    <p className="card-text">{usuario.email}</p>
                    <button className="btn btn-dark" onClick={()=>setViewForm(true)}>Editar Nombre</button>
                    {
                            error &&
                            (
                                <div className="alert alert-warning mt-3">Solo archivos png jpg</div>
                            )
                        }
                    <div className="custom-file">
                        <input disabled={loading} type="file" onChange={e=>seleccionarFoto(e)} className="custom-file-input" id="inputGroupFile01" style={{display:'none'}} />
                        <label className={loading ? "btn btn-dark mt-2 disabled":"btn btn-dark mt-2" } htmlFor="inputGroupFile01">Actualizar imagenes</label>
                    </div>
                </div>
                {
                    loading &&(
                        <div className="card-body">
                            <div className="d-flex justify-content-center my-3">
                                <div className="spinner-border" role="status">
                                    <span className="visually-hidden"></span>
                                </div>
                            </div>
                        </div>
                    )
                }
                {
                    viewForm && (
                        <div className="card-body">
                            <div className="row justify-content-center">
                                <div className="col-md-5">
                                    <div className="input-group mb-3">
                                        <input type="text" className="form-control" value={editarNombre} onChange={e=>setEditarNombre(e.target.value)}/>
                                        <div className="input-group-append">
                                            <button className="btn btn-dark" onClick={()=>actualizarUsuario()}>Actualizar</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }
                
            </div>
        </div>
    )
}

export default Perfil
