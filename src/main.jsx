import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import { TourProvider } from './components/TourContext.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <TourProvider>
        <App />
      </TourProvider>
    </BrowserRouter>
  </StrictMode>,
)
