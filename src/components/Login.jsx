import React,{useState,useEffect} from 'react'
import {auth,db} from "../firebase"
import {withRouter} from "react-router-dom"
import {useDispatch,useSelector} from 'react-redux'
import {ingresoUsuarioAccion} from '../Redux/usuarioDucks'

const Login = (props) => {
    const [email, setEmail] = useState('alex@alex.com')
    const [emailVa, setEmailVa] = useState(false)
    const [pass, setPass] = useState('123456')
    const [passVa, setPassVa] = useState(false)
    const [mensajeAlert, setMensajeAlert] = useState([])
    const [esResgitro, setEsResgitro] = useState(false)

    const dispatch =useDispatch()
    const loading =useSelector(store=>store.usuarioGoogle.loading)
    const activo =useSelector(store=>store.usuarioGoogle.activo)
    // console.log(loading);
    

    useEffect(() => {
        console.log(activo);
        if(activo){
            props.history.push('/redux')
        }
    }, [activo,props.history])

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
        if(!pass.trim()){
            // console.log("sin contraseña")
            setPassVa(true)
            setMensajeAlert([
                {inputPass: 'debe ingresar la Contraseña',inputUser:''}
            ])
            return
        }else if(pass.length <6){
            setPassVa(true)
            setMensajeAlert([
                {inputPass: 'La Contraseña debe terne un minimo de 6 caracteres',inputUser:''}
            ])
            return
        }
        
        if(esResgitro){
            registrar()
        }else{
            loguearse()
        }
        // setMensajeAlert([])
        // setPassVa(false)
    }

    const loguearse= React.useCallback(async()=>{
        try {
            const res =await auth.signInWithEmailAndPassword(email,pass)
            console.log(res);
            setPassVa(false)
            setEmailVa(false)
            setEmail('')
            setPass('')
            setEsResgitro(false)
            setMensajeAlert([])
            props.history.push('/admin')
        } catch (error) {
            console.log(error);
            if(error.code==="auth/invalid-email"){
                setMensajeAlert([
                    {inputPass:'',inputUser: error.message}
                ])
                setEmailVa(true)
                setPassVa(false)
            }else if(error.code==="auth/wrong-password"){
                setMensajeAlert([
                    
                    {inputUser:'',inputPass: error.message}
                ])
                setEmailVa(false)
                setPassVa(true)
            }else if(error.code==="auth/user-not-found"){
                setMensajeAlert([
                    {inputPass:'',inputUser: error.message}
                ])
                
                setEmailVa(true)
                setPassVa(false)
            }
            
        }
    },[email,pass,props.history])

    const registrar= React.useCallback(async()=>{
        try {
            const res =await auth.createUserWithEmailAndPassword(email,pass)
            await db.collection('usuarios').doc(res.user.email).set({
                email:res.user.email,
                uid:res.user.uid,
            })
            await db.collection(res.user.uid).add({
                name:'Tarea de Muestra',
                fecha: Date.now()
            })
            setEmail('')
            setPass('')
            setEsResgitro(false)
            setMensajeAlert([])
            // console.log(res);
            props.history.push('/admin')
        } catch (error) {
            if(error.code==="auth/invalid-email"){
                setMensajeAlert([
                    {inputPass:'',inputUser: error.message}
                ])
                setEmailVa(true)
                setPassVa(false)
            }else if(error.code==="auth/email-already-in-use"){
                setMensajeAlert([
                    {inputPass:'',inputUser: error.message}
                ])
                setEmailVa(true)
                setPassVa(false)
            }
            // console.log(error);
        }
    },[email,pass,props.history])

    return (
        <>
        <div className="mt-5">
            <h3 className="text-center">
            {
                esResgitro ? "Resgistro de Usuarios" :"Ingreso a Cuenta"
            }
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
                        {
                            passVa && (
                                <div className="alert alert-warning" role="alert">{mensajeAlert[0].inputPass}</div>
                            )
                        }
                        <input 
                            type="password"
                            onChange={e=>setPass(e.target.value)} 
                            className="form-control mb-2" 
                            placeholder="Ingrese Contraseña" 
                            value={pass}/>
                        <button className="btn btn-dark btn-lg btn-block" type="submit">
                            {
                                esResgitro ? "Resgistrarse" :"Acceder"
                            }
                        </button>
                        <button className="btn btn-info btn-sm btn-block" onClick={()=>setEsResgitro(!esResgitro)} type="button">
                            {
                                esResgitro ? "¿Ya tienes Resgistrado?" :"¿No tienes cuenta?"
                            }
                            
                        </button>

                        
                            {
                                !esResgitro && passVa ? (
                                <button className="btn btn-warning btn-sm mt-2" onClick={()=>props.history.push('./reset')} type="button">Recuperar Contraseña</button>
                                ):null
                            }
                            
                        
                    </form>
                </div>
            </div>
        </div>
        <div className="mt-5 text-center">
            <h3>Ingreso Con Google</h3>
            <hr />
            <button className="btn btn-sm btn-dark" disabled={loading} onClick={()=>dispatch(ingresoUsuarioAccion())}>Acceder</button>
        </div>
        </>
    )
}

export default withRouter(Login)
