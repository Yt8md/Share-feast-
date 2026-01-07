
import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Heart, Menu, X, User, Bell, LogOut, PackagePlus, LayoutDashboard } from 'lucide-react';
import { UserRole } from '../types';

interface NavbarProps {
  onNavigate: (page: string) => void;
  activePage: string;
}

const Navbar: React.FC<NavbarProps> = ({ onNavigate, activePage }) => {
  const { currentUser, logout, notifications } = useApp();
  const [isOpen, setIsOpen] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;

  const navItems = [
    { label: 'Home', page: 'home' },
    { label: 'About', page: 'about' },
    { label: 'Contact', page: 'contact' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-green-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <button 
              onClick={() => onNavigate('home')}
              className="flex items-center space-x-2 text-green-600 group"
            >
              <div className="bg-green-100 p-2 rounded-xl group-hover:bg-green-200 transition-colors">
                <Heart fill="currentColor" className="w-6 h-6" />
              </div>
              <span className="text-2xl font-bold tracking-tight">ShareFeast</span>
            </button>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.page}
                onClick={() => onNavigate(item.page)}
                className={`text-sm font-medium transition-colors hover:text-green-600 ${
                  activePage === item.page ? 'text-green-600' : 'text-slate-600'
                }`}
              >
                {item.label}
              </button>
            ))}

            {currentUser ? (
              <div className="flex items-center space-x-4 pl-4 border-l border-slate-200">
                <button 
                  onClick={() => onNavigate('notifications')}
                  className="relative p-2 text-slate-600 hover:text-green-600 transition-colors"
                >
                  <Bell className="w-5 h-5" />
                  {unreadCount > 0 && (
                    <span className="absolute top-1 right-1 bg-orange-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full ring-2 ring-white">
                      {unreadCount}
                    </span>
                  )}
                </button>
                
                <div className="flex items-center space-x-2">
                   <button 
                    onClick={() => onNavigate(currentUser.role === UserRole.DONOR ? 'donor-dashboard' : 'supplier-dashboard')}
                    className="flex items-center space-x-2 px-4 py-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition-shadow shadow-md hover:shadow-lg text-sm font-semibold"
                  >
                    <LayoutDashboard className="w-4 h-4" />
                    <span>Dashboard</span>
                  </button>
                  <button 
                    onClick={() => onNavigate('profile')}
                    className="p-2 bg-slate-100 rounded-full text-slate-600 hover:bg-slate-200"
                  >
                    <User className="w-5 h-5" />
                  </button>
                  <button 
                    onClick={() => { logout(); onNavigate('home'); }}
                    className="p-2 text-slate-400 hover:text-orange-500"
                  >
                    <LogOut className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <button 
                  onClick={() => onNavigate('login')}
                  className="text-sm font-semibold text-slate-600 hover:text-green-600"
                >
                  Log In
                </button>
                <button 
                  onClick={() => onNavigate('signup')}
                  className="px-6 py-2.5 bg-green-500 text-white rounded-full font-bold shadow-md hover:bg-green-600 hover:shadow-lg transform active:scale-95 transition-all"
                >
                  Join Us
                </button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-slate-600 hover:text-green-600"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-green-100 py-4 px-6 space-y-4 shadow-xl">
          {navItems.map((item) => (
            <button
              key={item.page}
              onClick={() => { onNavigate(item.page); setIsOpen(false); }}
              className="block w-full text-left py-2 text-base font-medium text-slate-600"
            >
              {item.label}
            </button>
          ))}
          {currentUser ? (
             <>
               <button 
                onClick={() => { onNavigate('notifications'); setIsOpen(false); }}
                className="flex items-center space-x-2 w-full text-left py-2"
              >
                <Bell className="w-5 h-5" />
                <span>Notifications ({unreadCount})</span>
              </button>
              <button 
                onClick={() => { onNavigate(currentUser.role === UserRole.DONOR ? 'donor-dashboard' : 'supplier-dashboard'); setIsOpen(false); }}
                className="flex items-center space-x-2 w-full text-left py-2"
              >
                <LayoutDashboard className="w-5 h-5" />
                <span>Dashboard</span>
              </button>
              <button 
                onClick={() => { logout(); onNavigate('home'); setIsOpen(false); }}
                className="flex items-center space-x-2 w-full text-left py-2 text-orange-500"
              >
                <LogOut className="w-5 h-5" />
                <span>Logout</span>
              </button>
             </>
          ) : (
            <div className="flex flex-col space-y-4 pt-4 border-t border-slate-100">
              <button onClick={() => { onNavigate('login'); setIsOpen(false); }} className="font-semibold text-slate-600">Log In</button>
              <button onClick={() => { onNavigate('signup'); setIsOpen(false); }} className="w-full py-3 bg-green-500 text-white rounded-full font-bold">Sign Up</button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
