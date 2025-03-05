"use client";

import React, { useState } from 'react';
import { Timer } from '../components/CountdownTimer'; // Import your Timer component
import { Modal } from './Modal';  // Import the Modal component
import { Menu } from 'lucide-react';  // Hamburger icon from lucide-react

export const Navbar: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [isTimerActive, setIsTimerActive] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleEndClass = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const stopTimer = () => {
    setIsTimerActive(false);
    setShowModal(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="flex justify-between items-center p-4 bg-white text-black shadow-md">
      <div className="flex items-center">
        {/* Logo on the left with rounded corners */}
        <img
          src="/logo.jpeg"  // Update with your logo path
          alt="Logo"
          className="w-12 h-12 object-contain"  
        />

        {/* Vertical Line after Logo */}
        <div className="border-l border-gray-300 h-12 mx-4"></div>

        {/* Text after the vertical line */}
        <div className="text-lg hidden md:block">
          Trial lesson [Grade 1-3]
        </div>

        {/* Mobile View: Show "Codingal" text next to the logo */}
        <div className="text-lg font-semibold block md:hidden">
          Codingal
        </div>
      </div>

      {/* Right side: Timer and End Class button for large screens */}
      <div className="hidden md:flex items-center space-x-4">
        <Timer isActive={isTimerActive} />  {/* Timer component to show the countdown */}
        <button onClick={handleEndClass} className="bg-red-600 px-4 py-2 rounded-md text-white">
          End Class
        </button>
      </div>

      {/* Hamburger menu for mobile screens */}
      <div className="md:hidden">
        <button onClick={toggleMobileMenu}>
          <Menu className="w-8 h-8" />  {/* Hamburger icon */}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-16 right-4 bg-white shadow-lg rounded-lg p-4 flex flex-col space-y-4">
          <button onClick={handleEndClass} className="bg-red-600 px-4 py-2 rounded-md text-white">
            End Class
          </button>
        </div>
      )}

      {/* Modal will open if the state showModal is true */}
      {showModal && <Modal closeModal={closeModal} stopTimer={stopTimer} />}
      
    </nav>
  );
};
