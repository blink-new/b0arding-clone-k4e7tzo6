import { useState } from 'react'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs'
import { mockFlights } from '../data/mockFlights'
import { Flight } from '../types/flight'
import { Plane, Clock, MapPin, QrCode, Download, Calendar, ArrowRight } from 'lucide-react'

interface MyTripsPageProps {
  onFlightSelect: (flightId: string) => void
  onPageChange: (page: string) => void
}

export function MyTripsPage({ onFlightSelect, onPageChange }: MyTripsPageProps) {
  const [selectedTab, setSelectedTab] = useState('upcoming')

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'boarding': return 'bg-green-500'
      case 'delayed': return 'bg-yellow-500'
      case 'cancelled': return 'bg-red-500'
      case 'departed': return 'bg-blue-500'
      case 'arrived': return 'bg-gray-500'
      default: return 'bg-blue-500'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'boarding': return 'Now Boarding'
      case 'delayed': return 'Delayed'
      case 'cancelled': return 'Cancelled'
      case 'departed': return 'Departed'
      case 'arrived': return 'Arrived'
      default: return 'Scheduled'
    }
  }

  const upcomingFlights = mockFlights.filter(f => 
    ['scheduled', 'boarding', 'delayed'].includes(f.status)
  )

  const pastFlights = mockFlights.filter(f => 
    ['departed', 'arrived', 'cancelled'].includes(f.status)
  )

  const handleViewBoardingPass = (flightId: string) => {
    onFlightSelect(flightId)
    onPageChange('boarding-pass')
  }

  const FlightCard = ({ flight }: { flight: Flight }) => (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Plane className="h-5 w-5" />
              {flight.flightNumber}
            </CardTitle>
            <CardDescription>{flight.airline}</CardDescription>
          </div>
          <Badge className={`${getStatusColor(flight.status)} text-white`}>
            {getStatusText(flight.status)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Route */}
          <div className="flex items-center justify-between">
            <div className="text-center">
              <div className="text-2xl font-bold">{flight.departureAirport}</div>
              <div className="text-sm text-gray-600">{flight.departureTime}</div>
            </div>
            <div className="flex-1 flex items-center justify-center">
              <ArrowRight className="h-5 w-5 text-gray-400" />
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{flight.arrivalAirport}</div>
              <div className="text-sm text-gray-600">{flight.arrivalTime}</div>
            </div>
          </div>

          {/* Flight Details */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-gray-400" />
              <span>{flight.departureDate}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-gray-400" />
              <span>Gate {flight.gate} • Terminal {flight.terminal}</span>
            </div>
          </div>

          {/* Passenger Info */}
          <div className="bg-gray-50 p-3 rounded-lg">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Passenger:</span>
                <div className="font-semibold">{flight.passengerName}</div>
              </div>
              <div>
                <span className="text-gray-600">Seat:</span>
                <div className="font-semibold">{flight.seat}</div>
              </div>
              <div>
                <span className="text-gray-600">Booking Ref:</span>
                <div className="font-semibold">{flight.bookingReference}</div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            {['scheduled', 'boarding', 'delayed'].includes(flight.status) && (
              <Button 
                onClick={() => handleViewBoardingPass(flight.id)}
                className="flex-1"
              >
                <QrCode className="h-4 w-4 mr-2" />
                View Boarding Pass
              </Button>
            )}
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Trips</h1>
          <p className="text-lg text-gray-600">Manage your bookings and boarding passes</p>
        </div>

        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto mb-8">
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="past">Past Trips</TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming" className="space-y-6">
            {upcomingFlights.length > 0 ? (
              <div className="grid md:grid-cols-2 gap-6">
                {upcomingFlights.map((flight) => (
                  <FlightCard key={flight.id} flight={flight} />
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="p-12 text-center">
                  <Plane className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-600 mb-2">No Upcoming Trips</h3>
                  <p className="text-gray-500 mb-6">You don't have any upcoming flights</p>
                  <Button onClick={() => onPageChange('home')}>
                    Search Flights
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="past" className="space-y-6">
            {pastFlights.length > 0 ? (
              <div className="grid md:grid-cols-2 gap-6">
                {pastFlights.map((flight) => (
                  <FlightCard key={flight.id} flight={flight} />
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="p-12 text-center">
                  <Clock className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-600 mb-2">No Past Trips</h3>
                  <p className="text-gray-500">Your travel history will appear here</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>

        {/* Quick Actions */}
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => onPageChange('checkin')}>
            <CardContent className="p-6 text-center">
              <QrCode className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Check-in Online</h3>
              <p className="text-gray-600">Get your boarding pass</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => onPageChange('status')}>
            <CardContent className="p-6 text-center">
              <Clock className="h-12 w-12 text-accent mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Flight Status</h3>
              <p className="text-gray-600">Track your flight</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => onPageChange('home')}>
            <CardContent className="p-6 text-center">
              <Plane className="h-12 w-12 text-green-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Book New Flight</h3>
              <p className="text-gray-600">Plan your next trip</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}