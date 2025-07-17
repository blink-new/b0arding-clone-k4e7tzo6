import { useState } from 'react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Badge } from '../ui/badge'
import { Label } from '../ui/label'
import { Progress } from '../ui/progress'
import { Search, Plane, MapPin, Clock, AlertTriangle, CheckCircle, Info } from 'lucide-react'
import { mockFlights } from '../../data/mockFlights'

interface FlightStatusPageProps {
  onPageChange: (page: string) => void
}

export function FlightStatusPage({ onPageChange }: FlightStatusPageProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedFlight, setSelectedFlight] = useState(mockFlights[0])
  const [showResults, setShowResults] = useState(false)

  const handleSearch = () => {
    setShowResults(true)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'boarding': return 'bg-green-100 text-green-800'
      case 'delayed': return 'bg-yellow-100 text-yellow-800'
      case 'cancelled': return 'bg-red-100 text-red-800'
      case 'arrived': return 'bg-gray-100 text-gray-800'
      default: return 'bg-blue-100 text-blue-800'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'boarding': return <CheckCircle className="h-5 w-5" />
      case 'delayed': return <AlertTriangle className="h-5 w-5" />
      case 'cancelled': return <AlertTriangle className="h-5 w-5" />
      default: return <Plane className="h-5 w-5" />
    }
  }

  const getFlightProgress = (status: string) => {
    switch (status) {
      case 'scheduled': return 25
      case 'boarding': return 75
      case 'departed': return 90
      case 'arrived': return 100
      case 'delayed': return 50
      default: return 25
    }
  }

  if (showResults) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <Button 
              variant="outline" 
              onClick={() => setShowResults(false)}
              className="mb-4"
            >
              ← Back to Search
            </Button>
            <h1 className="text-3xl font-bold text-gray-900">Flight Status</h1>
          </div>

          {/* Main Flight Status Card */}
          <Card className="mb-8">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-2xl">{selectedFlight.flightNumber}</CardTitle>
                  <p className="text-gray-600">{selectedFlight.airline}</p>
                </div>
                <Badge className={getStatusColor(selectedFlight.status)}>
                  <div className="flex items-center space-x-1">
                    {getStatusIcon(selectedFlight.status)}
                    <span className="capitalize">{selectedFlight.status}</span>
                  </div>
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Flight Route */}
              <div className="flex items-center justify-between">
                <div className="text-center">
                  <p className="text-3xl font-bold text-gray-900">{selectedFlight.departureAirport}</p>
                  <p className="text-lg text-gray-600">{selectedFlight.departureTime}</p>
                  <p className="text-sm text-gray-500">{selectedFlight.departureDate}</p>
                </div>
                <div className="flex-1 flex flex-col items-center justify-center mx-8">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="w-3 h-3 bg-primary rounded-full"></div>
                    <div className="w-24 h-0.5 bg-gray-300"></div>
                    <Plane className="h-6 w-6 text-primary" />
                    <div className="w-24 h-0.5 bg-gray-300"></div>
                    <div className="w-3 h-3 bg-primary rounded-full"></div>
                  </div>
                  <Progress value={getFlightProgress(selectedFlight.status)} className="w-full" />
                  <p className="text-xs text-gray-500 mt-1">Flight Progress</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-gray-900">{selectedFlight.arrivalAirport}</p>
                  <p className="text-lg text-gray-600">{selectedFlight.arrivalTime}</p>
                  <p className="text-sm text-gray-500">{selectedFlight.arrivalDate}</p>
                </div>
              </div>

              {/* Status Message */}
              {selectedFlight.status === 'delayed' && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
                    <div>
                      <p className="font-semibold text-yellow-800">Flight Delayed</p>
                      <p className="text-sm text-yellow-700">
                        This flight is delayed by approximately 45 minutes due to weather conditions. 
                        New estimated departure time: 15:15
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {selectedFlight.status === 'boarding' && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <p className="font-semibold text-green-800">Now Boarding</p>
                      <p className="text-sm text-green-700">
                        Boarding is now in progress. Please proceed to gate {selectedFlight.gate} 
                        with your boarding pass and valid ID.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Flight Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <MapPin className="h-5 w-5 mr-2" />
                  Gate & Terminal
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div>
                    <p className="text-sm text-gray-600">Gate</p>
                    <p className="text-2xl font-bold">{selectedFlight.gate}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Terminal</p>
                    <p className="text-xl font-semibold">{selectedFlight.terminal}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <Clock className="h-5 w-5 mr-2" />
                  Timing
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div>
                    <p className="text-sm text-gray-600">Boarding Time</p>
                    <p className="text-lg font-semibold">14:00</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Flight Duration</p>
                    <p className="text-lg font-semibold">5h 15m</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <Info className="h-5 w-5 mr-2" />
                  Aircraft
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div>
                    <p className="text-sm text-gray-600">Aircraft Type</p>
                    <p className="text-lg font-semibold">Boeing 737-800</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Registration</p>
                    <p className="text-lg font-semibold">N123AA</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Weather Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle>Departure Weather - {selectedFlight.departureAirport}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold">72°F</p>
                    <p className="text-gray-600">Partly Cloudy</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Wind: 8 mph NW</p>
                    <p className="text-sm text-gray-600">Visibility: 10 mi</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Arrival Weather - {selectedFlight.arrivalAirport}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold">68°F</p>
                    <p className="text-gray-600">Clear Skies</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Wind: 5 mph SW</p>
                    <p className="text-sm text-gray-600">Visibility: 10 mi</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button className="flex-1" onClick={() => onPageChange('checkin')}>
              Check-in for this Flight
            </Button>
            <Button variant="outline" className="flex-1" onClick={() => onPageChange('trips')}>
              View All My Trips
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Flight Status</h1>
          <p className="text-xl text-gray-600">Get real-time updates on your flight</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl text-center">Track Your Flight</CardTitle>
            <p className="text-gray-600 text-center">Enter your flight number or route to get live updates</p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="flight-search">Flight Number or Route</Label>
                <Input
                  id="flight-search"
                  placeholder="e.g., AA1234 or JFK-LAX"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="text-center text-lg"
                />
              </div>
              
              <Button 
                className="w-full" 
                size="lg" 
                onClick={handleSearch}
                disabled={searchQuery.length < 3}
              >
                <Search className="h-5 w-5 mr-2" />
                Track Flight
              </Button>
            </div>

            <div className="text-center">
              <p className="text-sm text-gray-600 mb-4">Or select from your recent flights</p>
              <div className="space-y-2">
                {mockFlights.slice(0, 3).map((flight) => (
                  <Button
                    key={flight.id}
                    variant="outline"
                    className="w-full justify-between"
                    onClick={() => {
                      setSelectedFlight(flight)
                      setShowResults(true)
                    }}
                  >
                    <span>{flight.flightNumber} - {flight.departureAirport} to {flight.arrivalAirport}</span>
                    <Badge className={getStatusColor(flight.status)}>
                      {flight.status}
                    </Badge>
                  </Button>
                ))}
              </div>
            </div>

            <div className="bg-blue-50 rounded-lg p-4">
              <h4 className="font-semibold text-blue-900 mb-2">Flight Status Information</h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Real-time updates on departure and arrival times</li>
                <li>• Gate and terminal information</li>
                <li>• Weather conditions at departure and arrival airports</li>
                <li>• Delay notifications and reasons</li>
                <li>• Boarding status and announcements</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Quick Status Cards */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="text-center">
            <CardContent className="py-6">
              <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-3" />
              <h3 className="font-semibold text-green-800">On Time</h3>
              <p className="text-sm text-gray-600">Most flights are operating normally</p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="py-6">
              <AlertTriangle className="h-12 w-12 text-yellow-600 mx-auto mb-3" />
              <h3 className="font-semibold text-yellow-800">Some Delays</h3>
              <p className="text-sm text-gray-600">Weather causing minor delays</p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="py-6">
              <Clock className="h-12 w-12 text-blue-600 mx-auto mb-3" />
              <h3 className="font-semibold text-blue-800">Live Updates</h3>
              <p className="text-sm text-gray-600">Information updated every 5 minutes</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}