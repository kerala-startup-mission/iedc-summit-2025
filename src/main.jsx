import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
// import { SponsorForm } from './components/SponsorForm'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        {/* <Route path="/be-our-sponsor" element={<SponsorForm />} /> */}
      </Routes>
    </Router>
  </StrictMode>,
)
