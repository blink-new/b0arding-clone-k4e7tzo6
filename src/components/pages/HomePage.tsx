import { useState } from 'react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Badge } from '../ui/badge'
import { Search, Plane, Clock, MapPin, CheckCircle } from 'lucide-react'
import { mockFlights } from '../../data/mockFlights'

interface HomePageProps {
  onPageChange: (page: string) => void
}

export function HomePage({ onPageChange }: HomePageProps) {
  const [searchQuery, setSearchQuery] = useState('')

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'boarding': return 'bg-green-100 text-green-800'
      case 'delayed': return 'bg-yellow-100 text-yellow-800'
      case 'cancelled': return 'bg-red-100 text-red-800'
      default: return 'bg-blue-100 text-blue-800'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'boarding': return <CheckCircle className="h-4 w-4" />
      case 'delayed': return <Clock className="h-4 w-4" />
      default: return <Plane className="h-4 w-4" />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-primary text-white">
        <div className="absolute inset-0 bg-gradient-to-r from-primary to-blue-600"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Your Digital Boarding Pass
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Check-in online, get your boarding pass, and track your flight status
            </p>
            
            {/* Flight Search */}
            <div className="max-w-2xl mx-auto">
              <div className="bg-white rounded-lg p-6 shadow-xl">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <Input
                      placeholder="Enter booking reference or flight number"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="text-gray-900"
                    />
                  </div>
                  <Button size="lg" className="bg-accent hover:bg-accent/90 text-white">
                    <Search className="h-5 w-5 mr-2" />
                    Search Flight
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => onPageChange('checkin')}>
            <CardHeader className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <CardTitle>Online Check-in</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-gray-600 mb-4">
                Check-in online and select your seat up to 24 hours before departure
              </p>
              <Button variant="outline" className="w-full">
                Check-in Now
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => onPageChange('status')}>
            <CardHeader className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-blue-600" />
              </div>
              <CardTitle>Flight Status</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-gray-600 mb-4">
                Get real-time updates on your flight status, gate changes, and delays
              </p>
              <Button variant="outline" className="w-full">
                Check Status
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => onPageChange('trips')}>
            <CardHeader className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Plane className="h-8 w-8 text-purple-600" />
              </div>
              <CardTitle>My Trips</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-gray-600 mb-4">
                View all your upcoming and past flights in one convenient place
              </p>
              <Button variant="outline" className="w-full">
                View Trips
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Recent Flights */}
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Your Upcoming Flights</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockFlights.slice(0, 3).map((flight) => (
              <Card key={flight.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{flight.flightNumber}</CardTitle>
                      <p className="text-sm text-gray-600">{flight.airline}</p>
                    </div>
                    <Badge className={getStatusColor(flight.status)}>
                      <div className="flex items-center space-x-1">
                        {getStatusIcon(flight.status)}
                        <span className="capitalize">{flight.status}</span>
                      </div>
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-4 w-4 text-gray-400" />
                        <span className="font-medium">{flight.departureAirport}</span>
                      </div>
                      <Plane className="h-4 w-4 text-gray-400" />
                      <div className="flex items-center space-x-2">
                        <span className="font-medium">{flight.arrivalAirport}</span>
                        <MapPin className="h-4 w-4 text-gray-400" />
                      </div>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>{flight.departureTime}</span>
                      <span>{flight.arrivalTime}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Gate: <span className="font-medium">{flight.gate || 'TBA'}</span></span>
                      <span>Seat: <span className="font-medium">{flight.seat || 'Not assigned'}</span></span>
                    </div>
                  </div>
                  <Button className="w-full mt-4" onClick={() => onPageChange('checkin')}>
                    {flight.status === 'boarding' ? 'View Boarding Pass' : 'Check-in'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}