import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StepCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  number: number;
}

const StepCard = ({ icon: Icon, title, description, number }: StepCardProps) => {
  return (
    <div className="relative p-6 bg-white rounded-lg shadow-md">
      <div className="absolute -top-4 -left-4 w-8 h-8 bg-yellow-600 rounded-full flex items-center justify-center text-white font-bold">
        {number}
      </div>
      <div className="w-12 h-12 bg-brown-100 rounded-full flex items-center justify-center mb-4">
        <Icon className="w-6 h-6 text-brown-600" />
      </div>
      <h3 className="text-xl font-semibold text-brown-800 mb-2">{title}</h3>
      <p className="text-brown-600">{description}</p>
    </div>
  );
};

export default StepCard;