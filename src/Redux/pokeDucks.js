import axios from 'axios'

// Constantes
const dataInicial ={
    array:[],
    offset:0
}

// types
const OBTENER_POKEMONES_EXITO ='OBTENER_POKEMONES_EXITO'
const SIGUENTE_POKEMONES_EXITO ='SIGUENTE_POKEMONES_EXITO'

//reducer
export default function pokeReducer(state = dataInicial, action) {
    switch(action.type){
        case OBTENER_POKEMONES_EXITO:
            return {...state, array: action.payload}
        case SIGUENTE_POKEMONES_EXITO:
            return {...state, array: action.payload.array,offset:action.payload.offset}
        default:
            return state
    }
}

// acciones
export const ApiObtenerPokeAccion = () => async(dispatch,getState)=>{
    // console.log('getState',getState().pokemones.offset);
    const offset =getState().pokemones.offset
    try {
        const res = await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=20`)
        dispatch({
            type:OBTENER_POKEMONES_EXITO,
            payload:res.data.results
        })
    } catch (error) {
        console.log(error);
    }

}

export const ApiSiguenteObtenerPokeAccion = (numeroPoke) => async(dispatch,getState)=>{
    // console.log('getState',getState().pokemones.offset);
    const offset =getState().pokemones.offset
    const siguente = offset+numeroPoke
    try {
        const res = await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=${siguente}&limit=20`)
        dispatch({
            type:SIGUENTE_POKEMONES_EXITO,
            payload:{
                array:res.data.results,
                offset:siguente
            }
            
        })
    } catch (error) {
        console.log(error);
    }

}