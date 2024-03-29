import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ThemeContextProvider } from './contexts/ThemeContext.jsx'
import { AuthContextProvider } from './contexts/AuthContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthContextProvider>
    <ThemeContextProvider>
      <App />
    </ThemeContextProvider>
    </AuthContextProvider>
  </React.StrictMode>,
)
