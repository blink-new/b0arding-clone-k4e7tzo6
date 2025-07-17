import { useState, useEffect } from 'react'
import { Header } from './components/layout/Header'
import { HomePage } from './components/pages/HomePage'
import { CheckInPage } from './components/pages/CheckInPage'
import { MyTripsPage } from './components/pages/MyTripsPage'
import { FlightStatusPage } from './components/pages/FlightStatusPage'
import { blink } from './blink/client'

function App() {
  const [currentPage, setCurrentPage] = useState('home')
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = blink.auth.onAuthStateChanged((state) => {
      setUser(state.user)
      setLoading(state.isLoading)
    })
    return unsubscribe
  }, [])

  const renderPage = () => {
    switch (currentPage) {
      case 'checkin':
        return <CheckInPage onPageChange={setCurrentPage} />
      case 'trips':
        return <MyTripsPage onPageChange={setCurrentPage} />
      case 'status':
        return <FlightStatusPage onPageChange={setCurrentPage} />
      default:
        return <HomePage onPageChange={setCurrentPage} />
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Loading B0arding...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header currentPage={currentPage} onPageChange={setCurrentPage} />
      {renderPage()}
    </div>
  )
}

export default App