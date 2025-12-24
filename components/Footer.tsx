import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Linkedin, Mail, Phone } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-dark text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 rounded-full border-2 border-primary flex items-center justify-center text-primary">
                <Phone size={16} />
              </div>
              <span className="font-heading font-bold text-xl text-white">
                golden<span className="text-primary">call</span>
              </span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              Helping you achieve your aviation dreams through personalized coaching and expert guidance.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.instagram.com/golden_call1/" className="text-gray-400 hover:text-primary transition-colors"><Instagram size={20} /></a>
              <a href="https://www.linkedin.com/company/goldencall/" className="text-gray-400 hover:text-primary transition-colors"><Linkedin size={20} /></a>
              <a href="https://www.facebook.com/profile.php?id=61585462373272&rdid=V8kvrzOTH9EGZKQn#" className="text-gray-400 hover:text-primary transition-colors"><Facebook size={20} /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-heading font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li><Link to="/services" className="text-gray-400 hover:text-primary text-sm transition-colors">Services</Link></li>
              <li><Link to="/about" className="text-gray-400 hover:text-primary text-sm transition-colors">About Us</Link></li>
              <li><Link to="/blog" className="text-gray-400 hover:text-primary text-sm transition-colors">Blog</Link></li>
              <li><Link to="/book" className="text-gray-400 hover:text-primary text-sm transition-colors">Book a Session</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-heading font-semibold mb-6">Services</h3>
            <ul className="space-y-3">
              <li><Link to="/services" className="text-gray-400 hover:text-primary text-sm transition-colors">Cabin Crew Prep</Link></li>
              <li><Link to="/services" className="text-gray-400 hover:text-primary text-sm transition-colors">Final Interview</Link></li>
              <li><Link to="/services" className="text-gray-400 hover:text-primary text-sm transition-colors">IELTS Coaching</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-heading font-semibold mb-6">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-gray-400 text-sm">
                <Mail size={18} className="mt-0.5 text-primary" />
                <span>golden_call@outlook.com</span>
              </li>
              <li className="flex items-start gap-3 text-gray-400 text-sm">
                <Phone size={18} className="mt-0.5 text-primary" />
                <span>+216 29 373 579</span>
              </li>
              <li className="flex items-start gap-3 text-gray-400 text-sm">
                <span className="text-2xl mt-[-5px]">🇹🇳</span>
                <span>Proudly based in Tunisia<br/>Serving clients worldwide</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} Golden Call Consulting. All rights reserved.
          </p>
          <div className="flex gap-6">
            <span className="text-gray-600 text-xs">Privacy Policy</span>
            <span className="text-gray-600 text-xs">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
