
import React from 'react';
import { useApp } from '../context/AppContext';
import { Bell, Heart, Package, Truck, CheckCircle2, Clock } from 'lucide-react';

interface NotificationsProps {
  onNavigate: (page: string) => void;
}

const Notifications: React.FC<NotificationsProps> = ({ onNavigate }) => {
  const { notifications, markNotificationRead } = useApp();

  const getIcon = (type: string) => {
    switch (type) {
      case 'REQUEST': return <Truck className="w-6 h-6 text-orange-500" />;
      case 'ACCEPTANCE': return <CheckCircle2 className="w-6 h-6 text-green-500" />;
      default: return <Bell className="w-6 h-6 text-blue-500" />;
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen py-16 px-4">
      <div className="max-w-2xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="text-4xl font-black text-slate-900">Notifications</h1>
          <button className="text-sm font-bold text-green-600 hover:underline">Mark all as read</button>
        </div>

        <div className="space-y-4">
          {notifications.length > 0 ? notifications.map((n) => (
            <div 
              key={n.id} 
              onClick={() => markNotificationRead(n.id)}
              className={`bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100 flex items-start space-x-6 hover:shadow-md transition-shadow cursor-pointer relative overflow-hidden ${!n.read ? 'ring-2 ring-green-100' : ''}`}
            >
              {!n.read && <div className="absolute top-0 right-0 w-20 h-20 bg-green-500 rotate-45 translate-x-12 -translate-y-12"></div>}
              
              <div className="flex-shrink-0 p-4 rounded-2xl bg-slate-50">
                {getIcon(n.type)}
              </div>
              
              <div className="flex-grow space-y-1">
                <h4 className={`text-lg font-bold ${!n.read ? 'text-slate-900' : 'text-slate-600'}`}>
                  {n.title}
                </h4>
                <p className="text-slate-500 font-medium leading-relaxed">
                  {n.message}
                </p>
                <div className="flex items-center text-xs text-slate-400 font-bold pt-2 uppercase tracking-widest">
                  <Clock className="w-3 h-3 mr-1" />
                  {new Date(n.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </div>
          )) : (
            <div className="bg-white p-12 rounded-[3rem] text-center space-y-4 border border-slate-100 shadow-sm">
               <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto text-slate-200">
                 <Bell className="w-10 h-10" />
               </div>
               <h3 className="text-2xl font-bold text-slate-400">All caught up!</h3>
               <p className="text-slate-400">No new notifications at the moment.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Notifications;
