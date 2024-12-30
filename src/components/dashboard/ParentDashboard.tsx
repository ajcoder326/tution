import React from 'react';
import { BookOpen, Clock, Star, MessageSquare } from 'lucide-react';

const ParentDashboard = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-brown-800 mb-6">Parent Dashboard</h1>
      
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          icon={BookOpen}
          title="Active Subjects"
          value="3"
        />
        <StatCard
          icon={Clock}
          title="Total Hours"
          value="24"
        />
        <StatCard
          icon={Star}
          title="Avg. Rating Given"
          value="4.5"
        />
        <StatCard
          icon={MessageSquare}
          title="Open Requests"
          value="2"
        />
      </div>

      {/* Dashboard Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ActiveTutors />
        <UpcomingSessions />
      </div>
    </div>
  );
};

const StatCard = ({ icon: Icon, title, value }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center mb-4">
        <div className="p-2 bg-yellow-100 rounded-lg">
          <Icon className="w-6 h-6 text-yellow-600" />
        </div>
      </div>
      <h3 className="text-lg font-semibold text-brown-800">{title}</h3>
      <p className="text-2xl font-bold text-brown-900">{value}</p>
    </div>
  );
};

const ActiveTutors = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-brown-800 mb-4">Active Tutors</h2>
      <div className="space-y-4">
        {/* Add tutors list here */}
      </div>
    </div>
  );
};

const UpcomingSessions = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-brown-800 mb-4">Upcoming Sessions</h2>
      <div className="space-y-4">
        {/* Add sessions list here */}
      </div>
    </div>
  );
};

export default ParentDashboard;