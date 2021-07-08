import React,{useState} from 'react'
import {auth} from "../firebase"
import {withRouter} from "react-router-dom"
const Reset = (props) => {
    const [email, setEmail] = useState('alex@alex.com')
    const [emailVa, setEmailVa] = useState(false)
    const [mensajeAlert, setMensajeAlert] = useState([])

    const procesarDatos =(e)=>{
        e.preventDefault()
        if(!email.trim()){
            setEmailVa(true)
            setMensajeAlert([
                {inputPass:'',inputUser: 'debe ingresar el usuario'}
            ])
            return
        }
        setEmailVa(false)
        recuperar()
    }

    const recuperar = React.useCallback(async()=>{
        try {
            await auth.sendPasswordResetEmail(email);
            props.history.push('/login')
            console.log('correo enviado');
        } catch (error) {
            setMensajeAlert([
                {inputPass: error.message}
            ])
        }
    },[email,props.history])
    return (
        <div className="mt-5">
            <h3 className="text-center">
            Reiniciar Contraseña
            </h3>
            <hr />
            <div className="row justify-content-center">
                <div className="col-12 col-sm-8 col-md-6 col-xl-4">
                    <form onSubmit={procesarDatos}>
                        {
                            emailVa && (
                                <div className="alert alert-warning" role="alert">{mensajeAlert[0].inputUser}</div>
                            )
                        }
                        <input 
                            type="text" 
                            onChange={e=>setEmail(e.target.value)} 
                            className="form-control mb-2"
                            placeholder="Ingrese Usuario" 
                            value={email}/>
                       
                        <button className="btn btn-dark btn-lg btn-block" type="submit">
                            Resetear Contraseña
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default withRouter(Reset)
