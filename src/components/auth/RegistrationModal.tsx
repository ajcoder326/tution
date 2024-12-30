import React from 'react';
import { X } from 'lucide-react';
import TutorRegistration from './TutorRegistration';
import ParentRegistration from './ParentRegistration';

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'tutor' | 'parent';
}

const RegistrationModal = ({ isOpen, onClose, type }: RegistrationModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="relative bg-[#F5F5DC] rounded-lg max-w-md w-full">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-brown-600 hover:text-brown-800"
        >
          <X className="h-6 w-6" />
        </button>
        {type === 'tutor' ? <TutorRegistration /> : <ParentRegistration />}
      </div>
    </div>
  );
};

export default RegistrationModal;