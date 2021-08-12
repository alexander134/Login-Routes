import React from 'react'
import PruebaContext from './fileContex/PruebaContext'
import ThemeProvider from '../context/ThemeProvider'

const Home = () => {
   
    return (
        <ThemeProvider>
            <PruebaContext/>
        </ThemeProvider>
    )
}

export default Home
