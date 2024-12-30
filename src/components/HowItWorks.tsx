import React from 'react';
import { UserPlus, Search, MessageSquare, BookOpen } from 'lucide-react';
import StepCard from './StepCard';

const steps = [
  {
    icon: UserPlus,
    title: 'Create Profile',
    description: 'Sign up and tell us about your tutoring needs'
  },
  {
    icon: Search,
    title: 'Find Tutors',
    description: 'Browse through verified tutors in your area'
  },
  {
    icon: MessageSquare,
    title: 'Connect',
    description: 'Chat with tutors and discuss requirements'
  },
  {
    icon: BookOpen,
    title: 'Start Learning',
    description: 'Begin your personalized learning journey'
  }
];

const HowItWorks = () => {
  return (
    <section className="py-16 bg-[#F5F5DC]" id="how-it-works">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-brown-800">How It Works</h2>
          <p className="mt-4 text-lg text-brown-600">Simple steps to start your learning journey</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <StepCard key={index} {...step} number={index + 1} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;