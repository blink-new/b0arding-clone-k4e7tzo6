export interface Flight {
  id: string
  userId: string
  flightNumber: string
  airline: string
  departureAirport: string
  arrivalAirport: string
  departureTime: string
  arrivalTime: string
  departureDate: string
  arrivalDate: string
  gate?: string
  terminal?: string
  seat?: string
  status: 'scheduled' | 'boarding' | 'departed' | 'arrived' | 'delayed' | 'cancelled'
  bookingReference: string
  passengerName: string
  createdAt: string
}

export interface BoardingPass {
  id: string
  userId: string
  flightId: string
  qrCode?: string
  checkInTime?: string
  boardingGroup?: string
  sequenceNumber?: string
  createdAt: string
}