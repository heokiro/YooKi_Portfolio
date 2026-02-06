import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './components/HomePage'
import PortfolioPage from './components/PortfolioPage'
import PortfolioDetail from './components/PortfolioDetail'
import InfoPage from './components/InfoPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/portfolio" element={<PortfolioPage />} />
        <Route path="/portfolio/:id" element={<PortfolioDetail />} />
        <Route path="/info" element={<InfoPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
