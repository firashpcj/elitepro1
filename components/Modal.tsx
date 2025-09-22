import React, { useState, useEffect } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  const [isRendered, setIsRendered] = useState(false);

  useEffect(() => {
    let timer: number;
    if (isOpen) {
      setIsRendered(true);
    } else {
      // Allow time for exit animation before unmounting
      timer = window.setTimeout(() => setIsRendered(false), 300); 
    }
    return () => clearTimeout(timer);
  }, [isOpen]);

  if (!isRendered) {
    return null;
  }

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black transition-opacity duration-300 ease-out ${isOpen ? 'bg-opacity-50' : 'bg-opacity-0'}`}
      aria-modal="true"
      onClick={onClose}
    >
      <div
        className={`bg-white rounded-lg shadow-xl max-w-2xl w-full m-4 transition-all duration-300 ease-out ${isOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-4'}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <h3 className="text-lg font-medium text-gray-900">{title}</h3>
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="text-gray-400 hover:text-gray-600 p-1 rounded-full transition-colors hover:bg-gray-100"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
};