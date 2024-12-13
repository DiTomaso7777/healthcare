"use client"
import React from 'react';
import { SignInButton, SignOutButton, SignedIn, SignedOut, UserButton, useUser } from '@clerk/nextjs';
import Link from 'next/link';
import Image from 'next/image';

const Hero: React.FC = () => {
  const { user } = useUser();

  return (
    <section className="hero-section bg-white py-20">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start">
          {/* Left Side */}
          <div className="w-full md:w-1/2 px-4 md:px-0">
            <SignedOut>
              <h1 className="text-4xl font-bold mb-4 text-gray-900">Your health goes first</h1>
              <p className="mb-8 text-gray-900">Log in to contact your personal assistant.</p>
              <div className="flex space-x-4">
                <SignInButton>
                  <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
                    Sign In
                  </button>
                </SignInButton>
              </div>
            </SignedOut>

            <SignedIn>
              <div className="flex items-center space-x-4 mb-8">
                <UserButton />
                <span className="text-gray-900">{user?.firstName}</span>
                <SignOutButton>
                  <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
                    Sign Out
                  </button>
                </SignOutButton>
              </div>
              
              <p className="text-gray-900 mb-8">
                Meet <b>Julia</b>, your virtual assistant dedicated to providing top-notch blood analysis, 
                microbiology, and other related healthcare services. We are committed to delivering accurate 
                results and personalized care to ensure your well-being.
              </p>

              <div className="flex space-x-4">
                <Link href="/customer/new-ticket">
                  <button className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600">
                    Create New Ticket
                  </button>
                </Link></div>

            </SignedIn>
          </div>

          {/* Right Side - Julia Image */}
          <SignedIn>
            <div className="order-2 md:order-none w-full md:w-1/2 mt-8 md:mt-0 flex justify-center">
              <Image src="https://i.ibb.co/JxfsKB7/Julia.png" alt="Doctor" className="block w-full max-w-xs h-auto object-contain" width={200} height={200} />
                
             
            </div>
          </SignedIn>
        </div>
      </div>
    </section>
  );
};

export default Hero;
