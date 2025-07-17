import { useState } from 'react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Badge } from '../ui/badge'
import { Label } from '../ui/label'
import { Separator } from '../ui/separator'
import { Search, Plane, MapPin, Clock, User, Luggage, QrCode } from 'lucide-react'
import { mockFlights } from '../../data/mockFlights'

interface CheckInPageProps {
  onPageChange: (page: string) => void
}

export function CheckInPage({ onPageChange }: CheckInPageProps) {
  const [step, setStep] = useState<'search' | 'details' | 'boarding'>('search')
  const [bookingRef, setBookingRef] = useState('')
  const [selectedFlight, setSelectedFlight] = useState(mockFlights[0])
  const [selectedSeat, setSelectedSeat] = useState('12A')

  const handleSearch = () => {
    // Simulate finding flight
    setStep('details')
  }

  const handleCheckIn = () => {
    setStep('boarding')
  }

  const generateQRCode = () => {
    return `data:image/svg+xml;base64,${btoa(`
      <svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
        <rect width="200" height="200" fill="white"/>
        <g fill="black">
          <rect x="20" y="20" width="20" height="20"/>
          <rect x="60" y="20" width="20" height="20"/>
          <rect x="100" y="20" width="20" height="20"/>
          <rect x="140" y="20" width="20" height="20"/>
          <rect x="20" y="60" width="20" height="20"/>
          <rect x="100" y="60" width="20" height="20"/>
          <rect x="160" y="60" width="20" height="20"/>
          <rect x="40" y="100" width="20" height="20"/>
          <rect x="80" y="100" width="20" height="20"/>
          <rect x="120" y="100" width="20" height="20"/>
          <rect x="160" y="100" width="20" height="20"/>
          <rect x="20" y="140" width="20" height="20"/>
          <rect x="60" y="140" width="20" height="20"/>
          <rect x="140" y="140" width="20" height="20"/>
          <rect x="40" y="180" width="20" height="20"/>
          <rect x="120" y="180" width="20" height="20"/>
          <rect x="160" y="180" width="20" height="20"/>
        </g>
      </svg>
    `)}`
  }

  if (step === 'boarding') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
        <div className="max-w-md mx-auto px-4">
          {/* Mobile Boarding Pass */}
          <Card className="bg-white shadow-2xl overflow-hidden">
            <div className="bg-gradient-to-r from-primary to-blue-600 text-white p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h1 className="text-2xl font-bold">BOARDING PASS</h1>
                  <p className="text-blue-100">Mobile Boarding Pass</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-blue-100">Seat</p>
                  <p className="text-2xl font-bold">{selectedSeat}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-blue-100">Passenger</p>
                  <p className="font-semibold">{selectedFlight.passengerName}</p>
                </div>
                <div>
                  <p className="text-blue-100">Flight</p>
                  <p className="font-semibold">{selectedFlight.flightNumber}</p>
                </div>
              </div>
            </div>

            <CardContent className="p-6">
              <div className="space-y-6">
                {/* Flight Route */}
                <div className="flex items-center justify-between">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-gray-900">{selectedFlight.departureAirport}</p>
                    <p className="text-sm text-gray-600">{selectedFlight.departureTime}</p>
                    <p className="text-xs text-gray-500">{selectedFlight.departureDate}</p>
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
                    <p className="text-2xl font-bold text-gray-900">{selectedFlight.arrivalAirport}</p>
                    <p className="text-sm text-gray-600">{selectedFlight.arrivalTime}</p>
                    <p className="text-xs text-gray-500">{selectedFlight.arrivalDate}</p>
                  </div>
                </div>

                <Separator />

                {/* Flight Details */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">Gate</p>
                    <p className="font-semibold text-lg">{selectedFlight.gate}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Terminal</p>
                    <p className="font-semibold text-lg">{selectedFlight.terminal}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Boarding Group</p>
                    <p className="font-semibold text-lg">A</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Sequence</p>
                    <p className="font-semibold text-lg">012</p>
                  </div>
                </div>

                <Separator />

                {/* QR Code */}
                <div className="text-center">
                  <div className="inline-block p-4 bg-gray-50 rounded-lg">
                    <img 
                      src={generateQRCode()} 
                      alt="Boarding Pass QR Code" 
                      className="w-32 h-32 mx-auto"
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    Booking Reference: {selectedFlight.bookingReference}
                  </p>
                </div>

                {/* Important Info */}
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <div className="flex items-start space-x-2">
                    <Clock className="h-5 w-5 text-yellow-600 mt-0.5" />
                    <div>
                      <p className="font-semibold text-yellow-800">Boarding Information</p>
                      <p className="text-sm text-yellow-700">
                        Boarding begins 30 minutes before departure. Please arrive at the gate at least 15 minutes before boarding.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="mt-6 space-y-3">
            <Button className="w-full" size="lg">
              <QrCode className="h-5 w-5 mr-2" />
              Add to Wallet
            </Button>
            <Button variant="outline" className="w-full" onClick={() => onPageChange('trips')}>
              View All Trips
            </Button>
          </div>
        </div>
      </div>
    )
  }

  if (step === 'details') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
        <div className="max-w-2xl mx-auto px-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Check-in Details</CardTitle>
              <p className="text-gray-600">Review your flight information and complete check-in</p>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Flight Info */}
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold">{selectedFlight.flightNumber}</h3>
                    <p className="text-gray-600">{selectedFlight.airline}</p>
                  </div>
                  <Badge className="bg-green-100 text-green-800">
                    On Time
                  </Badge>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold">{selectedFlight.departureAirport}</p>
                    <p className="text-sm text-gray-600">{selectedFlight.departureTime}</p>
                  </div>
                  <div className="flex-1 flex items-center justify-center">
                    <Plane className="h-6 w-6 text-primary" />
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold">{selectedFlight.arrivalAirport}</p>
                    <p className="text-sm text-gray-600">{selectedFlight.arrivalTime}</p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">Gate</p>
                    <p className="font-semibold">{selectedFlight.gate}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Terminal</p>
                    <p className="font-semibold">{selectedFlight.terminal}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Date</p>
                    <p className="font-semibold">{selectedFlight.departureDate}</p>
                  </div>
                </div>
              </div>

              {/* Passenger Info */}
              <div>
                <h4 className="font-semibold mb-3">Passenger Information</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Full Name</Label>
                    <Input value={selectedFlight.passengerName} readOnly />
                  </div>
                  <div>
                    <Label>Booking Reference</Label>
                    <Input value={selectedFlight.bookingReference} readOnly />
                  </div>
                </div>
              </div>

              {/* Seat Selection */}
              <div>
                <h4 className="font-semibold mb-3">Seat Selection</h4>
                <div className="grid grid-cols-6 gap-2 max-w-md">
                  {['12A', '12B', '12C', '12D', '12E', '12F'].map((seat) => (
                    <Button
                      key={seat}
                      variant={selectedSeat === seat ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setSelectedSeat(seat)}
                      className="aspect-square"
                    >
                      {seat}
                    </Button>
                  ))}
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  Current seat: <span className="font-semibold">{selectedSeat}</span>
                </p>
              </div>

              {/* Baggage Info */}
              <div className="bg-blue-50 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <Luggage className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-blue-900">Baggage Information</h4>
                    <p className="text-sm text-blue-700">
                      1 carry-on bag and 1 personal item included. Check-in baggage: 1 bag (23kg)
                    </p>
                  </div>
                </div>
              </div>

              <Button className="w-full" size="lg" onClick={handleCheckIn}>
                Complete Check-in
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-3xl">Online Check-in</CardTitle>
            <p className="text-gray-600">Enter your booking reference to check-in for your flight</p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="booking-ref">Booking Reference</Label>
                <Input
                  id="booking-ref"
                  placeholder="Enter your 6-character booking reference (e.g., ABC123)"
                  value={bookingRef}
                  onChange={(e) => setBookingRef(e.target.value.toUpperCase())}
                  className="text-center text-lg font-mono"
                  maxLength={6}
                />
              </div>
              
              <Button 
                className="w-full" 
                size="lg" 
                onClick={handleSearch}
                disabled={bookingRef.length !== 6}
              >
                <Search className="h-5 w-5 mr-2" />
                Find My Flight
              </Button>
            </div>

            <div className="text-center">
              <p className="text-sm text-gray-600 mb-4">Or search by flight number</p>
              <div className="flex gap-2">
                <Input placeholder="Flight number (e.g., AA1234)" />
                <Button variant="outline">
                  <Search className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="bg-blue-50 rounded-lg p-4">
              <h4 className="font-semibold text-blue-900 mb-2">Check-in Information</h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Online check-in opens 24 hours before departure</li>
                <li>• Check-in closes 1 hour before domestic flights</li>
                <li>• Check-in closes 2 hours before international flights</li>
                <li>• You can select or change your seat during check-in</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}