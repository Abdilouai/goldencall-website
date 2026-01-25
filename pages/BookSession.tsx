import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar as CalendarIcon, Clock, AlertCircle } from 'lucide-react';
import { Button } from '../components/Button';
import { BookingFormData } from '../types';
import { useSEO } from '../hooks/useSEO';

export const BookSession: React.FC = () => {
  useSEO(
    "Book Your Session | Golden Call Consulting",
    "Schedule your one-to-one coaching session. Choose your service, pick a time, and take the first step toward your aviation career."
  );

  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState<BookingFormData>({
    fullName: '',
    email: '',
    phoneNumber: '',
    country: 'Tunisia',
    serviceType: '',
    preferredDate: '',
    preferredTime: '09:00',
    message: '',
    consent: false
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch('/api/submit-booking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Something went wrong. Please try again.');
      }

      // Success
      navigate('/booking-success');
    } catch (err) {
      console.error(err);
      setError("Failed to submit booking. Please check your connection and try again.");
      window.scrollTo(0, 0);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Date constraints
  const today = new Date().toISOString().split('T')[0];
  const threeMonthsLater = new Date();
  threeMonthsLater.setMonth(threeMonthsLater.getMonth() + 3);
  const maxDate = threeMonthsLater.toISOString().split('T')[0];

  return (
    <div className="min-h-screen bg-light py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100">
        <div className="bg-dark px-8 py-6 text-white text-center">
          <h1 className="font-heading font-bold text-2xl">Book Your Success Session</h1>
          <p className="text-gray-300 text-sm mt-1">Fill out the form below to schedule your personalized coaching.</p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">

          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
              <div className="flex items-center">
                <AlertCircle className="text-red-500 mr-2" size={20} />
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {/* Full Name */}
            <div className="col-span-1 sm:col-span-2">
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Full Name *</label>
              <input
                type="text"
                name="fullName"
                id="fullName"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary py-2 px-3 border"
                placeholder="John Doe"
                value={formData.fullName}
                onChange={handleChange}
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address *</label>
              <input
                type="email"
                name="email"
                id="email"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary py-2 px-3 border"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            {/* Phone */}
            <div>
              <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">Phone Number *</label>
              <input
                type="tel"
                name="phoneNumber"
                id="phoneNumber"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary py-2 px-3 border"
                placeholder="+216 12 345 678"
                value={formData.phoneNumber}
                onChange={handleChange}
              />
            </div>

            {/* Country */}
            <div>
              <label htmlFor="country" className="block text-sm font-medium text-gray-700">Country *</label>
              <select
                name="country"
                id="country"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary py-2 px-3 border"
                value={formData.country}
                onChange={handleChange}
              >
                <option value="Tunisia">Tunisia</option>
                <option value="Morocco">Morocco</option>
                <option value="Algeria">Algeria</option>
                <option value="Egypt">Egypt</option>
                <option value="UAE">UAE</option>
                <option value="Qatar">Qatar</option>
                <option value="Saudi Arabia">Saudi Arabia</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Service Type */}
            <div>
              <label htmlFor="serviceType" className="block text-sm font-medium text-gray-700">Service Type *</label>
              <select
                name="serviceType"
                id="serviceType"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary py-2 px-3 border"
                value={formData.serviceType}
                onChange={handleChange}
              >
                <option value="">Select a service...</option>
                <option value="Cabin Crew Prep">Cabin Crew Assessment Prep</option>
                <option value="Interview Prep">Final Interview Preparation</option>
                <option value="IELTS Coaching">IELTS/ESL Coaching</option>
              </select>
            </div>

            {/* Date */}
            <div>
              <label htmlFor="preferredDate" className="block text-sm font-medium text-gray-700">Preferred Date *</label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <CalendarIcon size={16} className="text-gray-400" />
                </div>
                <input
                  type="date"
                  name="preferredDate"
                  id="preferredDate"
                  required
                  min={today}
                  max={maxDate}
                  className="block w-full rounded-md border-gray-300 pl-10 focus:border-primary focus:ring-primary py-2 border"
                  value={formData.preferredDate}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Time */}
            <div>
              <label htmlFor="preferredTime" className="block text-sm font-medium text-gray-700">Preferred Time (GMT+1) *</label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Clock size={16} className="text-gray-400" />
                </div>
                <select
                  name="preferredTime"
                  id="preferredTime"
                  required
                  className="block w-full rounded-md border-gray-300 pl-10 focus:border-primary focus:ring-primary py-2 border"
                  value={formData.preferredTime}
                  onChange={handleChange}
                >
                  <option value="09:00">09:00 AM</option>
                  <option value="10:00">10:00 AM</option>
                  <option value="11:00">11:00 AM</option>
                  <option value="13:00">01:00 PM</option>
                  <option value="14:00">02:00 PM</option>
                  <option value="15:00">03:00 PM</option>
                  <option value="16:00">04:00 PM</option>
                  <option value="17:00">05:00 PM</option>
                </select>
              </div>
            </div>

            {/* Message */}
            <div className="col-span-1 sm:col-span-2">
              <label htmlFor="message" className="block text-sm font-medium text-gray-700">Additional Message (Optional)</label>
              <textarea
                name="message"
                id="message"
                rows={4}
                maxLength={500}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary py-2 px-3 border"
                placeholder="Tell us about your goals, specific concerns, or timeline..."
                value={formData.message}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Consent */}
          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                id="consent"
                name="consent"
                type="checkbox"
                required
                className="focus:ring-primary h-4 w-4 text-primary border-gray-300 rounded"
                checked={formData.consent}
                onChange={handleChange}
              />
            </div>
            <div className="ml-3 text-sm">
              <label htmlFor="consent" className="font-medium text-gray-700">
                I agree to receive email confirmations and reminders about my session.
              </label>
            </div>
          </div>

          <div className="pt-4">
            <Button
              type="submit"
              fullWidth
              disabled={isSubmitting}
              className={`${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </span>
              ) : 'Book My Session'}
            </Button>
            <p className="mt-4 text-xs text-center text-gray-500">
              By booking, you acknowledge that a confirmation email will be sent within 24 hours.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};
