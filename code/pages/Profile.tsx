
import React from 'react';
import { useApp } from '../context/AppContext';
// Added missing Info icon to imports
import { User, Mail, Phone, MapPin, Edit3, Shield, Star, Heart, Info } from 'lucide-react';

interface ProfileProps {
  onNavigate: (page: string) => void;
}

const Profile: React.FC<ProfileProps> = ({ onNavigate }) => {
  const { currentUser } = useApp();

  if (!currentUser) return null;

  return (
    <div className="bg-slate-50 min-h-screen py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-[3.5rem] shadow-2xl overflow-hidden border border-slate-100">
          {/* Header Profile */}
          <div className="h-48 bg-gradient-to-r from-green-500 to-orange-400 relative">
             <div className="absolute -bottom-12 left-12">
                <div className="w-32 h-32 bg-white rounded-[2.5rem] p-1.5 shadow-xl">
                  <div className="w-full h-full bg-slate-100 rounded-[2.2rem] flex items-center justify-center text-slate-300">
                    <User className="w-16 h-16" />
                  </div>
                </div>
             </div>
             <button className="absolute bottom-4 right-8 px-6 py-2.5 bg-white/20 backdrop-blur-md text-white border border-white/30 rounded-xl font-bold hover:bg-white/30 transition-colors flex items-center space-x-2">
               <Edit3 className="w-4 h-4" />
               <span>Edit Profile</span>
             </button>
          </div>

          <div className="pt-16 px-12 pb-12">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
              <div className="space-y-1">
                <h1 className="text-4xl font-black text-slate-900">{currentUser.fullName}</h1>
                <div className="flex items-center space-x-2 text-green-600 font-bold bg-green-50 px-3 py-1 rounded-lg w-fit">
                   <Shield className="w-4 h-4" />
                   <span className="text-sm uppercase tracking-widest">{currentUser.role} Account</span>
                </div>
              </div>
              <div className="flex items-center space-x-6">
                <div className="text-center">
                  <div className="text-2xl font-black text-slate-900">4.9</div>
                  <div className="flex text-orange-400"><Star fill="currentColor" className="w-3 h-3"/><Star fill="currentColor" className="w-3 h-3"/><Star fill="currentColor" className="w-3 h-3"/><Star fill="currentColor" className="w-3 h-3"/><Star fill="currentColor" className="w-3 h-3"/></div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Rating</div>
                </div>
                <div className="w-px h-10 bg-slate-100"></div>
                <div className="text-center">
                   <div className="text-2xl font-black text-slate-900">28</div>
                   <div className="text-orange-500 font-bold"><Heart fill="currentColor" className="w-4 h-4 mx-auto" /></div>
                   <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Impact</div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-8">
                <h3 className="text-xl font-bold flex items-center">
                  <Info className="w-5 h-5 mr-2 text-slate-400" />
                  Contact Details
                </h3>
                <div className="space-y-6">
                  <div className="flex items-center space-x-4 p-4 rounded-2xl bg-slate-50 group hover:bg-green-50 transition-colors">
                    <div className="p-3 bg-white rounded-xl shadow-sm text-slate-400 group-hover:text-green-500">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Email Address</p>
                      <p className="font-bold text-slate-700">{currentUser.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 p-4 rounded-2xl bg-slate-50 group hover:bg-green-50 transition-colors">
                    <div className="p-3 bg-white rounded-xl shadow-sm text-slate-400 group-hover:text-green-500">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Phone Number</p>
                      <p className="font-bold text-slate-700">{currentUser.mobile}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-8">
                <h3 className="text-xl font-bold flex items-center">
                  <MapPin className="w-5 h-5 mr-2 text-slate-400" />
                  Location
                </h3>
                <div className="p-6 bg-slate-50 rounded-[2rem] border border-slate-100 space-y-4">
                  <div className="space-y-1">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Address</p>
                    <p className="font-bold text-slate-700">{currentUser.address}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Locality</p>
                      <p className="font-bold text-slate-700">{currentUser.locality}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">City</p>
                      <p className="font-bold text-slate-700">{currentUser.city}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
