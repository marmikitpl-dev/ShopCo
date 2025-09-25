import { Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing'
import ApiStatus from './components/ApiStatus'

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* API Status Indicator */}
      <div className="fixed top-4 right-4 z-50">
        <ApiStatus showDetails={true} />
      </div>
      
      {/* Main App Routes */}
      <Routes>
        <Route path="/" element={<Landing />} />
      </Routes>
    </div>
  )
}

export default App
