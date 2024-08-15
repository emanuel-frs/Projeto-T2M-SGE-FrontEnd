import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { AuthUserProvider } from './context/AuthUserContext.jsx'
import RoutesApp from './router/index.jsx'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthUserProvider>
      <BrowserRouter>
        <RoutesApp/>
      </BrowserRouter>
    </AuthUserProvider>
  </StrictMode>
)
