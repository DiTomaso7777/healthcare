"use client";
import Link from 'next/link';
import React from 'react';
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa';
import Image from 'next/image';



const Footer: React.FC = () => {

  const socialIcons = [
    { icon: <FaFacebook size={20} />, href: "#" },
    { icon: <FaTwitter size={20} />, href: "#" },
    { icon: <FaLinkedin size={20} />, href: "#" },
    { icon: <FaInstagram size={20} />, href: "#" },
  ];

  return (
    <footer className="bg-blue-500 text-white py-8">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0 flex items-center">
          <Image src="https://i.ibb.co/C5B1v6Q/logo.png" alt="Logo" width={120} height={120} />
          <span className="text-white text-2xl ml-2">
           <strong>Hemo</strong>Tech
           </span>
        </Link>

          {/* Social Media Icons */}
          <div className="flex space-x-6 mb-6 md:mb-0">
            {socialIcons.map((social, index) => (
              <a
                key={index}
                href={social.href}
                className="hover:text-gray-200 transition-colors duration-300"
                target="_blank"
                rel="noopener noreferrer"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center mt-8 text-sm text-white/80">
          <p>&copy; {new Date().getFullYear()} HemoTech Solutions. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;