import React from 'react';
import { Quote } from 'lucide-react';

interface TestimonialCardProps {
  name: string;
  role: string;
  image: string;
  content: string;
}

const TestimonialCard = ({ name, role, image, content }: TestimonialCardProps) => {
  return (
    <div className="bg-brown-50 p-6 rounded-lg relative">
      <Quote className="absolute top-4 right-4 w-8 h-8 text-yellow-600 opacity-20" />
      <div className="flex items-center mb-4">
        <img 
          src={image} 
          alt={name} 
          className="w-12 h-12 rounded-full object-cover mr-4"
        />
        <div>
          <h4 className="font-semibold text-brown-800">{name}</h4>
          <p className="text-brown-600 text-sm">{role}</p>
        </div>
      </div>
      <p className="text-brown-700">{content}</p>
    </div>
  );
};

export default TestimonialCard;