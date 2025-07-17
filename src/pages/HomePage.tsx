import { useState } from 'react'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { Plane, Search, Clock, MapPin, Users, Shield, Smartphone, QrCode } from 'lucide-react'

interface HomePageProps {
  onPageChange: (page: string) => void
}

export function HomePage({ onPageChange }: HomePageProps) {
  const [searchQuery, setSearchQuery] = useState('')

  const features = [
    {
      icon: <Smartphone className="h-8 w-8 text-primary" />,
      title: 'Mobile Boarding Pass',
      description: 'Get your boarding pass on your phone with QR code for easy scanning'
    },
    {
      icon: <Clock className="h-8 w-8 text-primary" />,
      title: 'Real-time Updates',
      description: 'Stay informed with live flight status, gate changes, and delays'
    },
    {
      icon: <Users className="h-8 w-8 text-primary" />,
      title: 'Easy Check-in',
      description: 'Check in online, select your seat, and skip the airport lines'
    },
    {
      icon: <Shield className="h-8 w-8 text-primary" />,
      title: 'Secure & Fast',
      description: 'Your booking information is encrypted and always accessible'
    }
  ]

  const quickActions = [
    {
      title: 'Check-in Online',
      description: 'Check in for your flight and get your boarding pass',
      action: () => onPageChange('checkin'),
      icon: <QrCode className="h-6 w-6" />,
      color: 'bg-primary'
    },
    {
      title: 'Flight Status',
      description: 'Track your flight in real-time',
      action: () => onPageChange('status'),
      icon: <Clock className="h-6 w-6" />,
      color: 'bg-accent'
    },
    {
      title: 'My Trips',
      description: 'View and manage your bookings',
      action: () => onPageChange('trips'),
      icon: <MapPin className="h-6 w-6" />,
      color: 'bg-green-500'
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-primary/80 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="bg-white/20 p-4 rounded-full">
                <Plane className="h-12 w-12" />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Your Digital Boarding Pass
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-3xl mx-auto">
              Check in online, get your mobile boarding pass, and track your flights in real-time. 
              Travel smarter with B0arding.
            </p>
            
            {/* Flight Search */}
            <div className="max-w-2xl mx-auto">
              <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                <CardContent className="p-6">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1">
                      <Input
                        placeholder="Enter flight number or booking reference..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="bg-white/20 border-white/30 text-white placeholder:text-white/70 text-lg h-12"
                      />
                    </div>
                    <Button 
                      size="lg" 
                      className="bg-accent hover:bg-accent/90 text-white h-12 px-8"
                      onClick={() => onPageChange('checkin')}
                    >
                      <Search className="h-5 w-5 mr-2" />
                      Search Flight
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Quick Actions</h2>
            <p className="text-lg text-gray-600">Everything you need for your journey</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {quickActions.map((action, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer" onClick={action.action}>
                <CardContent className="p-6 text-center">
                  <div className={`${action.color} text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4`}>
                    {action.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{action.title}</h3>
                  <p className="text-gray-600">{action.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose B0arding?</h2>
            <p className="text-lg text-gray-600">Modern travel management made simple</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">1M+</div>
              <div className="text-white/80">Boarding Passes Generated</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">500+</div>
              <div className="text-white/80">Airlines Supported</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">99.9%</div>
              <div className="text-white/80">Uptime Guarantee</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Travel Smarter?</h2>
          <p className="text-lg text-gray-600 mb-8">
            Join millions of travelers who trust B0arding for their digital boarding passes
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" onClick={() => onPageChange('checkin')} className="px-8">
              Check In Now
            </Button>
            <Button size="lg" variant="outline" onClick={() => onPageChange('status')} className="px-8">
              Track Flight Status
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}