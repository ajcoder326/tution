import React from 'react';
import { LucideIcon } from 'lucide-react';

interface SubjectCardProps {
  icon: LucideIcon;
  name: string;
  description: string;
}

const SubjectCard = ({ icon: Icon, name, description }: SubjectCardProps) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
      <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mb-4">
        <Icon className="w-6 h-6 text-yellow-600" />
      </div>
      <h3 className="text-lg font-semibold text-brown-800 mb-2">{name}</h3>
      <p className="text-sm text-brown-600">{description}</p>
    </div>
  );
};

export default SubjectCard;