import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import { Button } from '../components/Button';

export const BookingSuccess: React.FC = () => {
  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-light px-4">
      <div className="max-w-lg w-full bg-white p-10 rounded-3xl shadow-lg text-center border border-gray-100">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="text-success w-10 h-10" />
        </div>
        <h1 className="font-heading font-bold text-3xl text-dark mb-4">Booking Request Received!</h1>
        <p className="text-gray-600 mb-8 leading-relaxed">
          Thank you for booking with Golden Call Consulting! We've received your request and will confirm your appointment via email within 24 hours.
        </p>
        
        <div className="bg-gray-50 rounded-xl p-6 mb-8 text-left text-sm text-gray-600 space-y-3">
          <p className="font-semibold text-dark mb-2">Next Steps:</p>
          <div className="flex gap-2">
            <span className="text-primary">✓</span>
            <span>Receive email confirmation</span>
          </div>
          <div className="flex gap-2">
            <span className="text-primary">✓</span>
            <span>Get your preparation materials</span>
          </div>
          <div className="flex gap-2">
            <span className="text-primary">✓</span>
            <span>Receive Zoom/Meet link</span>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <Link to="/">
            <Button fullWidth>Return to Home</Button>
          </Link>
          <Link to="/book">
            <Button variant="outline" fullWidth>Book Another Session</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};