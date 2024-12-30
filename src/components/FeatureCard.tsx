import React from 'react';
import { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

const FeatureCard = ({ icon: Icon, title, description }: FeatureCardProps) => {
  return (
    <div className="p-6 bg-brown-50 rounded-lg hover:shadow-lg transition-shadow">
      <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mb-4">
        <Icon className="w-6 h-6 text-yellow-600" />
      </div>
      <h3 className="text-xl font-semibold text-brown-800 mb-2">{title}</h3>
      <p className="text-brown-600">{description}</p>
    </div>
  );
};

export default FeatureCard;