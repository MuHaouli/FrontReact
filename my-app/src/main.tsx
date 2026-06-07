import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './App.css'
import App from './pages/App.tsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Blackjack from './pages/blackJack.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/jogo" element={<Blackjack />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
)
