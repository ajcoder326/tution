import React from 'react';
import { Star, Clock, GraduationCap, IndianRupee } from 'lucide-react';
import Button from '../ui/Button';
import type { TutorMatch } from '../../types/matchmaking';

interface TutorCardProps {
  tutor: TutorMatch;
  onSelect: (tutorId: string) => void;
  isLoading?: boolean;
}

const TutorCard = ({ tutor, onSelect, isLoading }: TutorCardProps) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-semibold text-brown-800">{tutor.full_name}</h3>
          <div className="flex items-center mt-1">
            <Star className="w-4 h-4 text-yellow-500" />
            <span className="ml-1 text-brown-600">{tutor.rating.toFixed(1)} ({tutor.total_reviews} reviews)</span>
          </div>
        </div>
      </div>

      <div className="space-y-3 mb-4">
        <div className="flex items-center text-brown-700">
          <GraduationCap className="w-5 h-5 mr-2" />
          <span>{tutor.qualification}</span>
        </div>
        <div className="flex items-center text-brown-700">
          <Clock className="w-5 h-5 mr-2" />
          <span>{tutor.experience} years experience</span>
        </div>
        <div className="flex items-center text-brown-700">
          <IndianRupee className="w-5 h-5 mr-2" />
          <span>₹{tutor.hourly_rate}/hour</span>
        </div>
      </div>

      <Button
        onClick={() => onSelect(tutor.id)}
        isLoading={isLoading}
        className="w-full"
      >
        Select Tutor
      </Button>
    </div>
  );
};