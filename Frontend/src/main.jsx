import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { AppSectionProvider } from './components/UserComponents/ProfileSec/AppSectionContext';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppSectionProvider>
 <BrowserRouter>
     <App />
    </BrowserRouter>
    </AppSectionProvider>
   
   
  </StrictMode>,
)
