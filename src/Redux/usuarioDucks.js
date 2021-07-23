import {auth,firebase, db} from '../firebase'

// Constantes
const dataInicial ={
    loading:false,
    activo:false
}

// types
const LOADING='LOADING'
const USUARIO_ERROR='USUARIO_ERROR'
const USUARIO_EXITO='USUARIO_EXITO'
const CERRAR_SESION='CERRAR_SESION'
//reducer
export default function usuarioReducer(state=dataInicial,action) {
    // debugger;
    // console.log(state);
    // console.log(action.type);
    switch (action.type) {
        case LOADING:
            return{...state, loading:true}
        case USUARIO_EXITO:
            return{...state, loading:false,user:action.payload, activo:true}
        case USUARIO_ERROR:
            return{...dataInicial}
        case CERRAR_SESION:
            return{...dataInicial}
        default:
            return{...state}
    }
}

// acciones

export const ingresoUsuarioAccion =() =>async(dispatch)=>{
    dispatch({
        type:LOADING
    })
    try {
        const provider =new firebase.auth.GoogleAuthProvider();
        const res = await auth.signInWithPopup(provider)
        //console.log(res.user);
        
        const usuarioPerfil ={
            uid: res.user.uid,
            email: res.user.email,
            displayName:res.user.displayName,
            photoURL:res.user.photoURL
        }
        console.log(usuarioPerfil.email);
        const usuarioDB = await db.collection('usuarios').doc(usuarioPerfil.email).get()
        //console.log(usuarioDB);
        if(usuarioDB.exists){
            const usuarioDB = await db.collection('usuarios').doc(usuarioPerfil.email).get()
            dispatch({
                type:USUARIO_EXITO,
                payload:usuarioDB.data()
            })
            localStorage.setItem('usuario', JSON.stringify(usuarioDB.data()))
            console.log("entra usuario google");
        }else{
            // no exite el usuario en firestore
            await db.collection('usuarios').doc(usuarioPerfil.email).set(usuarioPerfil)
            dispatch({
                type:USUARIO_EXITO,
                payload:usuarioPerfil
            })
            localStorage.setItem('usuario', JSON.stringify(usuarioPerfil))
            console.log("entra usuario google");
        }
        
        
    } catch (error) {
        console.log(error);
        dispatch({
            type:USUARIO_ERROR
        })
    }
}


export const leerUsuarioActivoAccion =() =>(dispatch)=>{
    if(localStorage.getItem('usuario')){
        // console.log(localStorage.getItem('usuario'));
        dispatch({
            type:USUARIO_EXITO,
            payload:JSON.parse(localStorage.getItem('usuario'))
        })
    }
    console.log("lee usuario");
}

export const cerrarSesionUsuarioAccion =() =>(dispatch)=>{
    auth.signOut()
    localStorage.removeItem('usuario')
    localStorage.removeItem('usuario2')
    dispatch({
        type:CERRAR_SESION
    })
    console.log("cierra usuario google");
}