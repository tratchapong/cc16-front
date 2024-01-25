import { createContext, useState } from 'react'

const ThemeContext = createContext()

function ThemeContextProvider(props) {
  const [theme, setTheme] = useState(false)
  return (
    <ThemeContext.Provider value={{theme, setTheme}}>
      {props.children}
    </ThemeContext.Provider>
  )
}

export {ThemeContextProvider}
export default ThemeContext