import React from 'react';
import SubjectCard from './SubjectCard';
import { subjects } from '../data/subjects';

const Subjects = () => {
  return (
    <section className="py-16 bg-[#F5F5DC]" id="subjects">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-brown-800">Popular Subjects</h2>
          <p className="mt-4 text-lg text-brown-600">Expert tutoring across various subjects</p>
        </div>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {subjects.map((subject, index) => (
            <SubjectCard key={index} {...subject} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Subjects;