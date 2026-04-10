import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import React from 'react'
import { AuthProvider } from './contexts/AuthContext.tsx'

createRoot(document.getElementById('root')!).render(
  //AuthProvider es usado para envolver toda la aplicación y proporcionar el contexto de autenticación a todos los componentes hijos. 
  // Esto permite que cualquier componente dentro de la aplicación pueda acceder a la información de autenticación y a las funciones relacionadas con la autenticación sin necesidad de pasar props manualmente a través de cada nivel del componente.
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
)
