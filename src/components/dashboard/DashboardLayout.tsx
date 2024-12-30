import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Home, 
  Users, 
  Calendar, 
  MessageSquare, 
  Settings, 
  LogOut,
  Menu,
  X
} from 'lucide-react';
import { supabase } from '../../lib/supabase';

interface DashboardLayoutProps {
  children: React.ReactNode;
  userRole: 'admin' | 'tutor' | 'parent';
}

const DashboardLayout = ({ children, userRole }: DashboardLayoutProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  const menuItems = {
    admin: [
      { icon: Home, label: 'Dashboard', path: '/admin' },
      { icon: Users, label: 'Users', path: '/admin/users' },
      { icon: MessageSquare, label: 'Requests', path: '/admin/requests' },
      { icon: Settings, label: 'Settings', path: '/admin/settings' }
    ],
    tutor: [
      { icon: Home, label: 'Dashboard', path: '/tutor' },
      { icon: Calendar, label: 'Schedule', path: '/tutor/schedule' },
      { icon: MessageSquare, label: 'Requests', path: '/tutor/requests' },
      { icon: Settings, label: 'Profile', path: '/tutor/profile' }
    ],
    parent: [
      { icon: Home, label: 'Dashboard', path: '/parent' },
      { icon: Users, label: 'Tutors', path: '/parent/tutors' },
      { icon: Calendar, label: 'Sessions', path: '/parent/sessions' },
      { icon: Settings, label: 'Settings', path: '/parent/settings' }
    ]
  };

  return (
    <div className="min-h-screen bg-[#F5F5DC] flex">
      {/* Mobile Sidebar Toggle */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-md"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? (
          <X className="w-6 h-6 text-brown-800" />
        ) : (
          <Menu className="w-6 h-6 text-brown-800" />
        )}
      </button>

      {/* Sidebar */}
      <div
        className={`
          fixed lg:static inset-y-0 left-0 z-40
          transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0 transition-transform duration-300 ease-in-out
          w-64 bg-white shadow-xl
        `}
      >
        <div className="h-full flex flex-col">
          {/* Logo */}
          <div className="p-6 border-b">
            <h1 className="text-2xl font-bold text-brown-800">EduConnect</h1>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {menuItems[userRole].map((item) => (
              <a
                key={item.path}
                href={item.path}
                className="flex items-center space-x-3 p-3 rounded-lg hover:bg-yellow-50 text-brown-700 hover:text-yellow-600"
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </a>
            ))}
          </nav>

          {/* Sign Out Button */}
          <div className="p-4 border-t">
            <button
              onClick={handleSignOut}
              className="flex items-center space-x-3 w-full p-3 rounded-lg hover:bg-red-50 text-red-600"
            >
              <LogOut className="w-5 h-5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;