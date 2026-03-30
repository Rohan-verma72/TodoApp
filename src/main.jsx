import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { CookiesProvider } from 'react-cookie'
import './index.css'

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Index } from './components/todo-index.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CookiesProvider>
      <Index/>
    </CookiesProvider>
  </StrictMode>,
)
