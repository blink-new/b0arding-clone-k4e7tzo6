import { useState } from 'react'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { Label } from '../components/ui/label'
import { Separator } from '../components/ui/separator'
import { useToast } from '../hooks/use-toast'
import { mockFlights } from '../data/mockFlights'
import { Flight } from '../types/flight'
import { Plane, Clock, MapPin, User, Luggage, CheckCircle } from 'lucide-react'

interface CheckInPageProps {
  onFlightSelect: (flightId: string) => void
}

export function CheckInPage({ onFlightSelect }: CheckInPageProps) {
  const [bookingRef, setBookingRef] = useState('')
  const [lastName, setLastName] = useState('')
  const [foundFlight, setFoundFlight] = useState<Flight | null>(null)
  const [isCheckedIn, setIsCheckedIn] = useState(false)
  const [selectedSeat, setSelectedSeat] = useState('')
  const { toast } = useToast()

  const handleSearch = () => {
    if (!bookingRef.trim() || !lastName.trim()) {
      toast({
        title: "Missing Information",
        description: "Please enter both booking reference and last name",
        variant: "destructive"
      })
      return
    }

    // Find flight in mock data
    const flight = mockFlights.find(f => 
      f.bookingReference.toLowerCase() === bookingRef.toLowerCase() &&
      f.passengerName.toLowerCase().includes(lastName.toLowerCase())
    )

    if (flight) {
      setFoundFlight(flight)
      setSelectedSeat(flight.seat || '12A')
      toast({
        title: "Flight Found!",
        description: `Found your flight ${flight.flightNumber}`,
      })
    } else {
      toast({
        title: "Flight Not Found",
        description: "Please check your booking reference and last name",
        variant: "destructive"
      })
    }
  }

  const handleCheckIn = () => {
    if (!foundFlight) return

    setIsCheckedIn(true)
    onFlightSelect(foundFlight.id)
    
    toast({
      title: "Check-in Successful!",
      description: "Your boarding pass is ready",
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'boarding': return 'bg-green-500'
      case 'delayed': return 'bg-yellow-500'
      case 'cancelled': return 'bg-red-500'
      default: return 'bg-blue-500'
    }
  }

  const seatOptions = ['12A', '12B', '12C', '13A', '13B', '13C', '14A', '14B', '14C']

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Online Check-in</h1>
          <p className="text-lg text-gray-600">Enter your booking details to check in</p>
        </div>

        {!foundFlight ? (
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plane className="h-5 w-5" />
                Find Your Flight
              </CardTitle>
              <CardDescription>
                Enter your booking reference and last name to begin check-in
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="booking-ref">Booking Reference</Label>
                <Input
                  id="booking-ref"
                  placeholder="e.g. ABC123"
                  value={bookingRef}
                  onChange={(e) => setBookingRef(e.target.value.toUpperCase())}
                  className="text-lg"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="last-name">Last Name</Label>
                <Input
                  id="last-name"
                  placeholder="Enter your last name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="text-lg"
                />
              </div>

              <Button onClick={handleSearch} className="w-full" size="lg">
                Find My Flight
              </Button>

              <div className="text-center text-sm text-gray-500">
                <p>Demo booking references: ABC123, DEF456, GHI789</p>
                <p>Use "Doe" as last name</p>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {/* Flight Details */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Plane className="h-5 w-5" />
                    Flight {foundFlight.flightNumber}
                  </CardTitle>
                  <Badge className={`${getStatusColor(foundFlight.status)} text-white`}>
                    {foundFlight.status.toUpperCase()}
                  </Badge>
                </div>
                <CardDescription>{foundFlight.airline}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <MapPin className="h-5 w-5 text-gray-400" />
                      <div>
                        <div className="font-semibold">{foundFlight.departureAirport} → {foundFlight.arrivalAirport}</div>
                        <div className="text-sm text-gray-600">
                          {foundFlight.departureTime} - {foundFlight.arrivalTime}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <Clock className="h-5 w-5 text-gray-400" />
                      <div>
                        <div className="font-semibold">{foundFlight.departureDate}</div>
                        <div className="text-sm text-gray-600">Departure Date</div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <User className="h-5 w-5 text-gray-400" />
                      <div>
                        <div className="font-semibold">{foundFlight.passengerName}</div>
                        <div className="text-sm text-gray-600">Passenger</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <Luggage className="h-5 w-5 text-gray-400" />
                      <div>
                        <div className="font-semibold">Gate {foundFlight.gate} • Terminal {foundFlight.terminal}</div>
                        <div className="text-sm text-gray-600">Boarding Information</div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {!isCheckedIn ? (
              <Card>
                <CardHeader>
                  <CardTitle>Select Your Seat</CardTitle>
                  <CardDescription>Choose your preferred seat for this flight</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-3 gap-2 max-w-xs">
                      {seatOptions.map((seat) => (
                        <Button
                          key={seat}
                          variant={selectedSeat === seat ? "default" : "outline"}
                          size="sm"
                          onClick={() => setSelectedSeat(seat)}
                          className="h-12"
                        >
                          {seat}
                        </Button>
                      ))}
                    </div>
                    
                    <Separator />
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-semibold">Selected Seat: {selectedSeat}</div>
                        <div className="text-sm text-gray-600">Economy Class</div>
                      </div>
                      <Button onClick={handleCheckIn} size="lg">
                        Complete Check-in
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="border-green-200 bg-green-50">
                <CardContent className="p-6">
                  <div className="text-center">
                    <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-green-800 mb-2">Check-in Complete!</h2>
                    <p className="text-green-700 mb-4">
                      You're all set for flight {foundFlight.flightNumber}
                    </p>
                    <div className="space-y-2 text-sm text-green-600">
                      <p>Seat: {selectedSeat} • Gate: {foundFlight.gate} • Terminal: {foundFlight.terminal}</p>
                      <p>Boarding begins 30 minutes before departure</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )}
      </div>
    </div>
  )
}