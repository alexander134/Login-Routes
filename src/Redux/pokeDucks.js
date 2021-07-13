import axios from 'axios'

// Constantes
const dataInicial ={
    // array:[],
    // offset:0
    count:0,
    next:null,
    previous:null,
    results:[]
}

// types
const OBTENER_POKEMONES_EXITO ='OBTENER_POKEMONES_EXITO'
const TRASPASAR_POKEMONES_EXITO ='TRASPASAR_POKEMONES_EXITO'
const OBTENER_DETALLE_POKEMON_EXITO ='OBTENER_DETALLE_POKEMON_EXITO'

//reducer
export default function pokeReducer(state = dataInicial, action) {
    switch(action.type){
        case OBTENER_POKEMONES_EXITO:
            return {...state, ...action.payload}
        
        case TRASPASAR_POKEMONES_EXITO:
            // return {...state, array: action.payload.array,offset:action.payload.offset}
            return {...state, ...action.payload}
        case OBTENER_DETALLE_POKEMON_EXITO:
            return {...state, unPokemon:action.payload}
        default:
            return state
    }
}

// acciones

export const ApiObtenerDetallePoke = (url="https://pokeapi.co/api/v2/pokemon/1/") => async(dispatch,getState)=>{
    // console.log('getState',getState().pokemones.offset);
    // const offset =getState().pokemones.offset
    if(localStorage.getItem(url)){
        dispatch({
            type:OBTENER_DETALLE_POKEMON_EXITO,
            payload:JSON.parse(localStorage.getItem(url))
        })
        console.log("localStorage");
        return
    }
    try {
        const res = await axios.get(url)
        dispatch({
            type:OBTENER_DETALLE_POKEMON_EXITO,
            payload:{
                nombre:res.data.name,
                ancho:res.data.weight,
                alto:res.data.height,
                foto:res.data.sprites.front_default,
            }
        })
        localStorage.setItem(url,JSON.stringify({ 
            nombre:res.data.name,
            ancho:res.data.weight,
            alto:res.data.height,
            foto:res.data.sprites.front_default
        }))
        console.log("api");
    } catch (error) {
        console.log(error);
    }
}

export const ApiObtenerPokeAccion = () => async(dispatch,getState)=>{
    // console.log('getState',getState().pokemones.offset);
    // const offset =getState().pokemones.offset
    if(localStorage.getItem('offset=0')){
        dispatch({
            type:OBTENER_POKEMONES_EXITO,
            payload:JSON.parse(localStorage.getItem('offset=0'))
        })
        // console.log("localStorage");
        return
    }
    try {
        // const res = await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=20`)
        const res = await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=0&limit=10`)
        // console.log(res.data);
        dispatch({
            type:OBTENER_POKEMONES_EXITO,
            payload:res.data
        })
        // console.log("api");
        localStorage.setItem('offset=0',JSON.stringify(res.data))
    } catch (error) {
        console.log(error);
    }
}

export const ApiSiguenteObtenerPokeAccion = () => async(dispatch,getState)=>{
    // console.log('getState',getState().pokemones.offset);
    // const offset =getState().pokemones.offset
    // const siguente = offset+numeroPoke
    const {next} = getState().pokemones
    if(localStorage.getItem(next)){
        dispatch({
            type:OBTENER_POKEMONES_EXITO,
            payload:JSON.parse(localStorage.getItem(next))
        })
        return
    }
    try {
        const res = await axios.get(next)
        dispatch({
            type:TRASPASAR_POKEMONES_EXITO,
            payload:res.data
            
        })
        localStorage.setItem(next,JSON.stringify(res.data))
    } catch (error) {
        console.log(error);
    }

}
export const ApiAnterioresObtenerPokeAccion = () => async(dispatch,getState)=>{
    // console.log('getState',getState().pokemones.offset);
    // const offset =getState().pokemones.offset
    // const siguente = offset+numeroPoke
    const {previous} = getState().pokemones
    if(localStorage.getItem(previous)){
        dispatch({
            type:OBTENER_POKEMONES_EXITO,
            payload:JSON.parse(localStorage.getItem(previous))
        })
        return
    }
    try {
        const res = await axios.get(previous)
        dispatch({
            type:TRASPASAR_POKEMONES_EXITO,
            payload:res.data
            
        })
        localStorage.setItem(previous,JSON.stringify(res.data))
    } catch (error) {
        console.log(error);
    }

}