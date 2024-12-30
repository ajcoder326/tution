import React from 'react';
import TestimonialCard from './TestimonialCard';

const testimonials = [
  {
    name: 'Priya Sharma',
    role: 'Parent',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80',
    content: 'EduConnect helped us find the perfect Math tutor for my daughter. Her grades have improved significantly!'
  },
  {
    name: 'Rahul Verma',
    role: 'Student',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80',
    content: 'The personalized attention from my Science tutor has made complex topics much easier to understand.'
  },
  {
    name: 'Anjali Patel',
    role: 'Parent',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80',
    content: 'Flexible scheduling and quality tutoring have made a huge difference in my son\'s academic performance.'
  }
];

const Testimonials = () => {
  return (
    <section className="py-16 bg-white" id="testimonials">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-brown-800">What Parents Say</h2>
          <p className="mt-4 text-lg text-brown-600">Real experiences from our community</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} {...testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;