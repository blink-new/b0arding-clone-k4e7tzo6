import { useState } from 'react'
import { Button } from '../ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Badge } from '../ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'
import { Plane, MapPin, Clock, Calendar, Download, QrCode } from 'lucide-react'
import { mockFlights } from '../../data/mockFlights'

interface MyTripsPageProps {
  onPageChange: (page: string) => void
}

export function MyTripsPage({ onPageChange }: MyTripsPageProps) {
  const [selectedTab, setSelectedTab] = useState('upcoming')

  const upcomingFlights = mockFlights.filter(flight => 
    new Date(flight.departureDate) >= new Date()
  )

  const pastFlights = mockFlights.filter(flight => 
    new Date(flight.departureDate) < new Date()
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'boarding': return 'bg-green-100 text-green-800'
      case 'delayed': return 'bg-yellow-100 text-yellow-800'
      case 'cancelled': return 'bg-red-100 text-red-800'
      case 'arrived': return 'bg-gray-100 text-gray-800'
      default: return 'bg-blue-100 text-blue-800'
    }
  }

  const FlightCard = ({ flight, isPast = false }: { flight: any, isPast?: boolean }) => (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl">{flight.flightNumber}</CardTitle>
            <p className="text-gray-600">{flight.airline}</p>
          </div>
          <Badge className={getStatusColor(flight.status)}>
            <span className="capitalize">{flight.status}</span>
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Route */}
        <div className="flex items-center justify-between">
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-900">{flight.departureAirport}</p>
            <p className="text-sm text-gray-600">{flight.departureTime}</p>
          </div>
          <div className="flex-1 flex items-center justify-center">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <div className="w-16 h-0.5 bg-gray-300"></div>
              <Plane className="h-5 w-5 text-primary" />
              <div className="w-16 h-0.5 bg-gray-300"></div>
              <div className="w-2 h-2 bg-primary rounded-full"></div>
            </div>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-900">{flight.arrivalAirport}</p>
            <p className="text-sm text-gray-600">{flight.arrivalTime}</p>
          </div>
        </div>

        {/* Flight Details */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div>
            <p className="text-gray-600 flex items-center">
              <Calendar className="h-4 w-4 mr-1" />
              Date
            </p>
            <p className="font-semibold">{flight.departureDate}</p>
          </div>
          <div>
            <p className="text-gray-600">Gate</p>
            <p className="font-semibold">{flight.gate || 'TBA'}</p>
          </div>
          <div>
            <p className="text-gray-600">Terminal</p>
            <p className="font-semibold">{flight.terminal}</p>
          </div>
          <div>
            <p className="text-gray-600">Seat</p>
            <p className="font-semibold">{flight.seat || 'Not assigned'}</p>
          </div>
        </div>

        {/* Booking Reference */}
        <div className="bg-gray-50 rounded-lg p-3">
          <p className="text-sm text-gray-600">Booking Reference</p>
          <p className="font-mono font-semibold text-lg">{flight.bookingReference}</p>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-2">
          {!isPast && (
            <>
              {flight.status === 'boarding' || flight.status === 'scheduled' ? (
                <Button className="flex-1" onClick={() => onPageChange('checkin')}>
                  <QrCode className="h-4 w-4 mr-2" />
                  {flight.status === 'boarding' ? 'View Boarding Pass' : 'Check-in'}
                </Button>
              ) : (
                <Button variant="outline" className="flex-1" onClick={() => onPageChange('status')}>
                  <Clock className="h-4 w-4 mr-2" />
                  Track Flight
                </Button>
              )}
            </>
          )}
          <Button variant="outline" className={isPast ? 'flex-1' : ''}>
            <Download className="h-4 w-4 mr-2" />
            Download Receipt
          </Button>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">My Trips</h1>
          <p className="text-xl text-gray-600">Manage all your flights in one place</p>
        </div>

        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto mb-8">
            <TabsTrigger value="upcoming" className="flex items-center space-x-2">
              <Plane className="h-4 w-4" />
              <span>Upcoming ({upcomingFlights.length})</span>
            </TabsTrigger>
            <TabsTrigger value="past" className="flex items-center space-x-2">
              <Clock className="h-4 w-4" />
              <span>Past Trips ({pastFlights.length})</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming" className="space-y-6">
            {upcomingFlights.length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {upcomingFlights.map((flight) => (
                  <FlightCard key={flight.id} flight={flight} />
                ))}
              </div>
            ) : (
              <Card className="text-center py-12">
                <CardContent>
                  <Plane className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">No upcoming trips</h3>
                  <p className="text-gray-600 mb-6">
                    You don't have any upcoming flights. Book your next adventure!
                  </p>
                  <Button onClick={() => onPageChange('home')}>
                    Search Flights
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="past" className="space-y-6">
            {pastFlights.length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {pastFlights.map((flight) => (
                  <FlightCard key={flight.id} flight={flight} isPast />
                ))}
              </div>
            ) : (
              <Card className="text-center py-12">
                <CardContent>
                  <Clock className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">No past trips</h3>
                  <p className="text-gray-600">
                    Your travel history will appear here after you complete your flights.
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>

        {/* Quick Actions */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => onPageChange('checkin')}>
            <CardContent className="text-center py-6">
              <QrCode className="h-12 w-12 text-primary mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Quick Check-in</h3>
              <p className="text-sm text-gray-600">Check-in for your upcoming flight</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => onPageChange('status')}>
            <CardContent className="text-center py-6">
              <Clock className="h-12 w-12 text-primary mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Flight Status</h3>
              <p className="text-sm text-gray-600">Check real-time flight information</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => onPageChange('home')}>
            <CardContent className="text-center py-6">
              <Plane className="h-12 w-12 text-primary mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Book New Flight</h3>
              <p className="text-sm text-gray-600">Search and book your next trip</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}