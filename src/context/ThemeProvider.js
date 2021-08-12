import React,{useState}  from 'react'


export const ThemeContext = React.createContext()


const ThemeProvider = (props) => {
    const themes={
        color:'#000',
        background:'#eee'
    }

    const [theme, setThemes] = useState(themes)

    return (
        <ThemeContext.Provider value={{theme, setThemes}}>
            {props.children}
        </ThemeContext.Provider>
    )
}

export default ThemeProvider
