import { Routes, Route } from 'react-router-dom'
import Home from './pages/home'
// import ApiStatus from './components/ApiStatus'
import Header from './components/layout/Header'

function App() {
  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Header />
      {/* API Status Indicator - Mobile responsive positioning */}
      {/* <div className="fixed top-2 right-2 z-50 sm:top-4 sm:right-4">
        <div className="bg-white/90 backdrop-blur-sm rounded-lg px-2 py-1 shadow-sm sm:px-3 sm:py-2">
          <ApiStatus showDetails={true} />
        </div>
      </div> */}
      
      {/* Main App Routes with minimal top padding to account for fixed header */}
      <div className="pt-0">
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
