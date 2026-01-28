import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone } from 'lucide-react';
import { Button } from './Button';
import { SignedIn, SignedOut, UserButton } from '@clerk/clerk-react';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'About', path: '/about' },
    { name: 'Blog', path: '/blog' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center gap-2 group" onClick={closeMenu}>
              <div className="w-10 h-10 rounded-full bg-white border-2 border-primary flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                <Phone size={20} />
              </div>
              <span className="font-heading font-bold text-2xl text-dark tracking-tight">
                golden<span className="text-primary">call</span>
              </span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-sm font-medium transition-colors hover:text-primary ${location.pathname === link.path ? 'text-primary' : 'text-gray-600'
                  }`}
              >
                {link.name}
              </Link>
            ))}

            <SignedOut>
              <Link to="/login">
                <Button variant="outline" size="sm" className='mr-2'>Login</Button>
              </Link>
              <Link to="/signup">
                <Button size="sm">Sign Up</Button>
              </Link>
            </SignedOut>

            <SignedIn>
              <Link to="/dashboard" className="mr-4 text-sm font-medium text-gray-600 hover:text-primary">
                Dashboard
              </Link>
              <UserButton />
            </SignedIn>
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
              <Link
                key={link.name}
                to={link.path}
                className={`block px-3 py-4 rounded-md text-base font-medium text-center ${location.pathname === link.path
                  ? 'text-primary bg-blue-50'
                  : 'text-gray-700 hover:text-primary hover:bg-gray-50'
                  }`}
                onClick={closeMenu}
              >
                {link.name}
              </Link>
            ))}

            <div className="border-t border-gray-100 my-2 pt-2">
              <SignedOut>
                <div className="space-y-2 p-2">
                  <Link to="/login" onClick={closeMenu} className="block w-full">
                    <Button variant="outline" fullWidth>Login</Button>
                  </Link>
                  <Link to="/signup" onClick={closeMenu} className="block w-full">
                    <Button fullWidth>Sign Up</Button>
                  </Link>
                </div>
              </SignedOut>

              <SignedIn>
                <Link
                  to="/dashboard"
                  className="block px-3 py-4 rounded-md text-base font-medium text-center text-gray-700 hover:text-primary hover:bg-gray-50"
                  onClick={closeMenu}
                >
                  Dashboard
                </Link>
                <div className="flex justify-center py-4">
                  <UserButton />
                </div>
              </SignedIn>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};