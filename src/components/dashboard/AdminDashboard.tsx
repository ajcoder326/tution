import React from 'react';
import { Users, BookOpen, MessageSquare, Activity } from 'lucide-react';

const AdminDashboard = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-brown-800 mb-6">Admin Dashboard</h1>
      
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          icon={Users}
          title="Total Users"
          value="1,234"
          trend="+12%"
        />
        <StatCard
          icon={BookOpen}
          title="Active Tutors"
          value="456"
          trend="+8%"
        />
        <StatCard
          icon={MessageSquare}
          title="Open Requests"
          value="89"
          trend="-3%"
        />
        <StatCard
          icon={Activity}
          title="Completed Matches"
          value="567"
          trend="+15%"
        />
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentUsers />
        <PendingVerifications />
      </div>
    </div>
  );
};

const StatCard = ({ icon: Icon, title, value, trend }) => {
  const isPositive = trend.startsWith('+');
  
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-4">
        <div className="p-2 bg-yellow-100 rounded-lg">
          <Icon className="w-6 h-6 text-yellow-600" />
        </div>
        <span className={`text-sm font-semibold ${
          isPositive ? 'text-green-600' : 'text-red-600'
        }`}>
          {trend}
        </span>
      </div>
      <h3 className="text-lg font-semibold text-brown-800">{title}</h3>
      <p className="text-2xl font-bold text-brown-900">{value}</p>
    </div>
  );
};

const RecentUsers = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-brown-800 mb-4">Recent Users</h2>
      <div className="space-y-4">
        {/* Add user list here */}
      </div>
    </div>
  );
};

const PendingVerifications = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-brown-800 mb-4">Pending Verifications</h2>
      <div className="space-y-4">
        {/* Add verification list here */}
      </div>
    </div>
  );
};

export default AdminDashboard;