import { useState } from 'react'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { Label } from '../components/ui/label'
import { Progress } from '../components/ui/progress'
import { useToast } from '../hooks/use-toast'
import { mockFlights } from '../data/mockFlights'
import { Flight } from '../types/flight'
import { Plane, Clock, MapPin, AlertCircle, CheckCircle, Search, ArrowRight } from 'lucide-react'

export function FlightStatusPage() {
  const [flightNumber, setFlightNumber] = useState('')
  const [foundFlight, setFoundFlight] = useState<Flight | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleSearch = async () => {
    if (!flightNumber.trim()) {
      toast({
        title: "Missing Information",
        description: "Please enter a flight number",
        variant: "destructive"
      })
      return
    }

    setIsLoading(true)
    
    // Simulate API call delay
    setTimeout(() => {
      const flight = mockFlights.find(f => 
        f.flightNumber.toLowerCase() === flightNumber.toLowerCase()
      )

      if (flight) {
        setFoundFlight(flight)
        toast({
          title: "Flight Found!",
          description: `Status for flight ${flight.flightNumber}`,
        })
      } else {
        toast({
          title: "Flight Not Found",
          description: "Please check the flight number and try again",
          variant: "destructive"
        })
      }
      setIsLoading(false)
    }, 1000)
  }

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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'boarding':
      case 'departed':
      case 'arrived':
        return <CheckCircle className="h-5 w-5" />
      case 'delayed':
      case 'cancelled':
        return <AlertCircle className="h-5 w-5" />
      default:
        return <Clock className="h-5 w-5" />
    }
  }

  const getFlightProgress = (status: string) => {
    switch (status) {
      case 'scheduled': return 25
      case 'boarding': return 50
      case 'departed': return 75
      case 'arrived': return 100
      case 'delayed': return 25
      case 'cancelled': return 0
      default: return 25
    }
  }

  const getProgressColor = (status: string) => {
    switch (status) {
      case 'cancelled': return 'bg-red-500'
      case 'delayed': return 'bg-yellow-500'
      case 'arrived': return 'bg-green-500'
      default: return 'bg-blue-500'
    }
  }

  const liveFlights = mockFlights.filter(f => ['boarding', 'delayed', 'scheduled'].includes(f.status))

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Flight Status</h1>
          <p className="text-lg text-gray-600">Track your flight in real-time</p>
        </div>

        {/* Search Section */}
        <Card className="max-w-2xl mx-auto mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5" />
              Track Flight
            </CardTitle>
            <CardDescription>
              Enter your flight number to get real-time status updates
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="flight-number">Flight Number</Label>
              <Input
                id="flight-number"
                placeholder="e.g. AA1234, DL5678, UA9012"
                value={flightNumber}
                onChange={(e) => setFlightNumber(e.target.value.toUpperCase())}
                className="text-lg"
              />
            </div>
            
            <Button 
              onClick={handleSearch} 
              className="w-full" 
              size="lg"
              disabled={isLoading}
            >
              {isLoading ? 'Searching...' : 'Track Flight'}
            </Button>

            <div className="text-center text-sm text-gray-500">
              <p>Try: AA1234, DL5678, or UA9012</p>
            </div>
          </CardContent>
        </Card>

        {/* Flight Details */}
        {foundFlight && (
          <Card className="mb-8">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Plane className="h-6 w-6" />
                    Flight {foundFlight.flightNumber}
                  </CardTitle>
                  <CardDescription className="text-lg">{foundFlight.airline}</CardDescription>
                </div>
                <Badge className={`${getStatusColor(foundFlight.status)} text-white text-lg px-4 py-2`}>
                  <span className="mr-2">{getStatusIcon(foundFlight.status)}</span>
                  {foundFlight.status.toUpperCase()}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Route */}
                <div className="flex items-center justify-between">
                  <div className="text-center">
                    <div className="text-3xl font-bold">{foundFlight.departureAirport}</div>
                    <div className="text-lg text-gray-600">{foundFlight.departureTime}</div>
                    <div className="text-sm text-gray-500">Departure</div>
                  </div>
                  <div className="flex-1 flex flex-col items-center mx-8">
                    <ArrowRight className="h-6 w-6 text-gray-400 mb-2" />
                    <Progress 
                      value={getFlightProgress(foundFlight.status)} 
                      className="w-full h-2"
                    />
                    <div className="text-sm text-gray-500 mt-1">
                      {foundFlight.status === 'arrived' ? 'Completed' : 
                       foundFlight.status === 'departed' ? 'In Flight' :
                       foundFlight.status === 'boarding' ? 'Boarding' : 'Scheduled'}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold">{foundFlight.arrivalAirport}</div>
                    <div className="text-lg text-gray-600">{foundFlight.arrivalTime}</div>
                    <div className="text-sm text-gray-500">Arrival</div>
                  </div>
                </div>

                {/* Flight Info Grid */}
                <div className="grid md:grid-cols-3 gap-6 bg-gray-50 p-6 rounded-lg">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">{foundFlight.gate}</div>
                    <div className="text-sm text-gray-600">Gate</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">{foundFlight.terminal}</div>
                    <div className="text-sm text-gray-600">Terminal</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">{foundFlight.departureDate}</div>
                    <div className="text-sm text-gray-600">Date</div>
                  </div>
                </div>

                {/* Status Messages */}
                {foundFlight.status === 'boarding' && (
                  <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
                    <div className="flex items-center gap-2 text-green-800">
                      <CheckCircle className="h-5 w-5" />
                      <span className="font-semibold">Now Boarding</span>
                    </div>
                    <p className="text-green-700 mt-1">
                      Boarding is now in progress. Please proceed to gate {foundFlight.gate}.
                    </p>
                  </div>
                )}

                {foundFlight.status === 'delayed' && (
                  <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                    <div className="flex items-center gap-2 text-yellow-800">
                      <AlertCircle className="h-5 w-5" />
                      <span className="font-semibold">Flight Delayed</span>
                    </div>
                    <p className="text-yellow-700 mt-1">
                      This flight has been delayed. Please check with airline staff for updates.
                    </p>
                  </div>
                )}

                {foundFlight.status === 'cancelled' && (
                  <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
                    <div className="flex items-center gap-2 text-red-800">
                      <AlertCircle className="h-5 w-5" />
                      <span className="font-semibold">Flight Cancelled</span>
                    </div>
                    <p className="text-red-700 mt-1">
                      This flight has been cancelled. Please contact your airline for rebooking options.
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Live Flight Board */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Live Flight Board
            </CardTitle>
            <CardDescription>Real-time status of active flights</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {liveFlights.map((flight) => (
                <div key={flight.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                  <div className="flex items-center gap-4">
                    <div className="text-center">
                      <div className="font-bold">{flight.flightNumber}</div>
                      <div className="text-sm text-gray-600">{flight.airline}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">{flight.departureAirport}</span>
                      <ArrowRight className="h-4 w-4 text-gray-400" />
                      <span className="font-semibold">{flight.arrivalAirport}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="font-semibold">{flight.departureTime}</div>
                      <div className="text-sm text-gray-600">Gate {flight.gate}</div>
                    </div>
                    <Badge className={`${getStatusColor(flight.status)} text-white`}>
                      {flight.status.toUpperCase()}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}