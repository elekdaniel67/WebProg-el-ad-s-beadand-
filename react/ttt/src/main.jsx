import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './tictactoe.jsx'
import 'C:\Users\Elek Dániel\Documents\GitHub\WebProg-el-ad-s-beadand-\style.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)