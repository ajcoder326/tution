import React, { useState } from 'react';
import { BookOpen, Users } from 'lucide-react';
import RegistrationModal from './auth/RegistrationModal';

const Hero = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [registrationType, setRegistrationType] = useState<'tutor' | 'parent'>('tutor');

  const openModal = (type: 'tutor' | 'parent') => {
    setRegistrationType(type);
    setModalOpen(true);
  };

  return (
    <>
      <div className="min-h-screen bg-[#F5F5DC] pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h1 className="text-4xl md:text-5xl font-bold text-brown-800 leading-tight">
                Find Your Perfect Tutor for Personalized Learning
              </h1>
              <p className="text-lg text-brown-600">
                Connect with qualified tutors who can help your child excel in academics
                and develop essential skills for future success.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => openModal('tutor')}
                  className="px-8 py-3 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors flex items-center justify-center"
                >
                  <BookOpen className="w-5 h-5 mr-2" />
                  Join as Tutor
                </button>
                <button
                  onClick={() => openModal('parent')}
                  className="px-8 py-3 bg-brown-700 text-white rounded-lg hover:bg-brown-800 transition-colors flex items-center justify-center"
                >
                  <Users className="w-5 h-5 mr-2" />
                  Join as Parent
                </button>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80"
                alt="Tutor teaching student"
                className="rounded-lg shadow-xl"
              />
              <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-lg shadow-lg">
                <div className="text-brown-800 font-semibold">Trusted by</div>
                <div className="text-2xl font-bold text-yellow-600">10,000+ Parents</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <RegistrationModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        type={registrationType}
      />
    </>
  );
};

export default Hero;