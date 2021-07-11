import React from 'react'
import Pokemones from '../Redux/reduxComponentes/Pokemones'
import {Provider} from 'react-redux'
import generateStore from '../Redux/store'

const Redux = () => {
    const store =generateStore()

    return (
        <Provider store={store}>
            <Pokemones/>
        </Provider>
    )
}

export default Redux
