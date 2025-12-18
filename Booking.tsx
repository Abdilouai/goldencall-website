import React, { useState } from 'react';
import { Send, CheckCircle, MessageCircle } from 'lucide-react';

const Booking: React.FC = () => {
  const [sent, setSent] = useState(false);
  return (
    <div className="py-20 bg-gray-50 min-h-screen">
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white p-10 rounded-2xl shadow-sm border border-gray-100">
          {sent ? (
            <div className="text-center py-12">
              <CheckCircle size={64} className="text-green-500 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-brand-dark mb-2">Application Sent!</h2>
              <p className="text-gray-500 mb-8">We will review your details and contact you within 24 hours.</p>
              <button onClick={() => setSent(false)} className="text-brand-blue font-bold">Submit another form</button>
            </div>
          ) : (
            <>
              <h1 className="text-3xl font-bold mb-8 text-brand-dark text-center">Start Your Journey</h1>
              <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="space-y-6">
                <div>
                  <label className="block text-sm font-bold mb-2">Full Name</label>
                  <input required className="w-full p-4 border rounded-lg focus:ring-2 focus:ring-brand-blue outline-none" placeholder="John Doe" />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2">Email Address</label>
                  <input required type="email" className="w-full p-4 border rounded-lg focus:ring-2 focus:ring-brand-blue outline-none" placeholder="john@example.com" />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-2">Service</label>
                  <select required className="w-full p-4 border rounded-lg focus:ring-2 focus:ring-brand-blue outline-none bg-white">
                    <option value="">Select a service</option>
                    <option>Cabin Crew Prep</option>
                    <option>Interview Coaching</option>
                    <option>IELTS Preparation</option>
                  </select>
                </div>
                <button className="w-full bg-brand-blue text-white py-4 rounded-lg font-bold text-lg flex items-center justify-center gap-2 hover:bg-brand-blue/90 transition-all shadow-lg shadow-brand-blue/20">
                  <Send size={20} /> Submit Application
                </button>
              </form>
              <div className="mt-12 pt-8 border-t text-center">
                <p className="text-gray-500 text-sm mb-4">Or contact us directly via WhatsApp</p>
                <a href="#" className="inline-flex items-center gap-2 px-6 py-3 bg-[#25D366] text-white rounded-full font-bold">
                  <MessageCircle size={20} /> WhatsApp Us
                </a>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Booking;