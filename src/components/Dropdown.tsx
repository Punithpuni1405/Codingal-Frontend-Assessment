import React, { useState } from 'react';

export const Dropdown: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      <button onClick={toggleDropdown} className="text-white">
        Menu
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 bg-white text-black rounded-lg shadow-md">
          <a href="#" className="block px-4 py-2">Item 1</a>
          <a href="#" className="block px-4 py-2">Item 2</a>
          <a href="#" className="block px-4 py-2">Item 3</a>
        </div>
      )}
    </div>
  );
};
