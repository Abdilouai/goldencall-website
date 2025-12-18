import React from 'react';
import { Link } from 'react-router-dom';
import { Logo } from './Logo';
import { Mail, Phone, Instagram, Linkedin, Globe } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-brand-dark text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <Logo className="h-10 mb-6 brightness-0 invert" />
            <p className="text-gray-400 max-w-sm leading-relaxed mb-6">
              Golden Call Consulting empowers Tunisian candidates to achieve their dreams of joining world-class airlines and top companies
            </p>
            <div className="flex space-x-4">
              <a href="#" className="p-2 bg-white/10 rounded-full hover:bg-brand-blue transition-colors"><Instagram size={18} /></a>
              <a href="#" className="p-2 bg-white/10 rounded-full hover:bg-brand-blue transition-colors"><Linkedin size={18} /></a>
              <a href="#" className="p-2 bg-white/10 rounded-full hover:bg-brand-blue transition-colors"><Globe size={18} /></a>
            </div>
          </div>
          <div>
            <h4 className="text-lg font-bold mb-6 text-white border-b-2 border-brand-blue inline-block">Quick Links</h4>
            <ul className="space-y-4 mt-4">
              <li><Link to="/" className="text-gray-400 hover:text-brand-blue">Home</Link></li>
              <li><Link to="/about" className="text-gray-400 hover:text-brand-blue">About Us</Link></li>
              <li><Link to="/services" className="text-gray-400 hover:text-brand-blue">Services</Link></li>
              <li><Link to="/blog" className="text-gray-400 hover:text-brand-blue">Resources</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-bold mb-6 text-white border-b-2 border-brand-blue inline-block">Contact</h4>
            <ul className="space-y-4 text-gray-400 mt-4">
              <li className="flex items-center gap-3"><Mail size={18} /> hello@goldencall.tn</li>
              <li className="flex items-center gap-3"><Phone size={18} /> Based in Tunis</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10 pt-8 text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} Golden Call Consulting.
        </div>
      </div>
    </footer>
  );
};
