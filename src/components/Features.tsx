import React from 'react';
import { BookCheck, Clock, MapPin, Award } from 'lucide-react';
import FeatureCard from './FeatureCard';

const features = [
  {
    icon: BookCheck,
    title: 'Expert Tutors',
    description: 'Qualified and experienced tutors across all subjects and competitive exams'
  },
  {
    icon: Clock,
    title: 'Flexible Scheduling',
    description: 'Choose timings that work best for your child\'s learning routine'
  },
  {
    icon: MapPin,
    title: 'Location Based',
    description: 'Find tutors in your neighborhood for personalized home tutoring'
  },
  {
    icon: Award,
    title: 'Quality Assured',
    description: 'Verified tutors with proven track records and parent reviews'
  }
];

const Features = () => {
  return (
    <section className="py-16 bg-white" id="features">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-brown-800">Why Choose EduConnect?</h2>
          <p className="mt-4 text-lg text-brown-600">We provide the best tutoring experience for your child</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;