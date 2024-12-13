"use client";
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import logo from '@/images/logo.svg';

const Header: React.FC = () => {
  const [activeLink, setActiveLink] = useState('Home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = ['Home', 'About', 'Services', 'Contact'];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  return (
    <header className="bg-blue-500 text-white py-4 px-6">
      <div className="container mx-auto flex justify-between items-center relative">
        {/* Logo */}
        <Link href="/" className="flex-shrink-0">
          <Image src={logo} alt="Logo" width={120} height={120} />
        </Link>
  
        {/* Hamburger Menu Icon */}
        <div className="md:hidden">
          <button onClick={toggleMobileMenu} className="focus:outline-none">
            {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>

        {/* Navigation Links */}
        <nav className={`
          ${isMobileMenuOpen ? 'flex' : 'hidden'} 
          md:flex
          flex-col md:flex-row
          absolute md:relative 
          top-full left-0 
          w-full md:w-auto
          bg-blue-500 md:bg-transparent
          md:items-center md:ml-auto
          transition-all duration-300 ease-in-out
          py-4 md:py-0
          mt-2 md:mt-0
          space-y-4 md:space-y-0
          z-50
        `}>
          {navItems.map((item, index) => (
            <React.Fragment key={item}>
              <a
                href={item === 'Services' ? '#whatwedo' : `#${item.toLowerCase()}`}
                className={`px-6 md:px-3 py-2 relative text-center md:text-left ${
                  activeLink === item
                    ? 'font-semibold after:content-[""] after:absolute after:left-0 after:bottom-0 after:w-full after:h-0.5 after:bg-white'
                    : 'hover:text-gray-200'
                }`}
                onClick={() => {
                  setActiveLink(item);
                  setIsMobileMenuOpen(false);
                }}
              >
                {item}
              </a>
              {index < navItems.length - 1 && (
                <div className="hidden md:block h-5 mx-4 border-l border-white/30" />
              )}
            </React.Fragment>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;