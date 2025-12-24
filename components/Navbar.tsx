import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from './Button';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = window.location.pathname;

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'About', path: '/about' },
    { name: 'Blog', path: '/blog' },
  ];

  // Refined Official Logo Emblem SVG
  const LogoEmblem = () => (
    <svg width="34" height="34" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="44" stroke="#1A8FD8" stroke-width="10"/>
      <circle cx="50" cy="50" r="23" stroke="#1A8FD8" stroke-width="7"/>
      {/* Handset - Refined for smoother curves */}
      <path d="M46 38 C46 36.8954 46.8954 36 48 36 H52 C53.1046 36 54 36.8954 54 38 V43 C54 44.1046 53.1046 45 52 45 H51 C50.4477 45 50 45.4477 50 46 V54 C50 54.5523 50.4477 55 51 55 H52 C53.1046 55 54 55.8954 54 57 V62 C54 63.1046 53.1046 64 52 64 H48 C46.8954 64 46 63.1046 46 62 V38Z" fill="#1A8FD8"/>
    </svg>
  );

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <a href="/" className="flex items-center gap-3 group" onClick={closeMenu}>
              <LogoEmblem />
              <span className="font-heading font-bold text-2xl text-[#333333] tracking-tight">
                golden<span className="text-primary">call</span>
                <span className="text-[10px] align-top ml-0.5 font-normal text-gray-500">®</span>
              </span>
            </a>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.path}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  pathname === link.path ? 'text-primary' : 'text-gray-600'
                }`}
              >
                {link.name}
              </a>
            ))}
            <a href="/book">
              <Button size="sm">Book Now</Button>
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-primary hover:bg-gray-100 focus:outline-none"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 absolute w-full shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.path}
                className={`block px-3 py-4 rounded-md text-base font-medium text-center ${
                  pathname === link.path
                    ? 'text-primary bg-blue-50'
                    : 'text-gray-700 hover:text-primary hover:bg-gray-50'
                }`}
                onClick={closeMenu}
              >
                {link.name}
              </a>
            ))}
            <div className="px-3 py-4">
              <a href="/book" onClick={closeMenu}>
                <Button fullWidth>Book Now</Button>
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};
