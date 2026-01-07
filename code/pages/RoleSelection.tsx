
import React from 'react';
import { useApp } from '../context/AppContext';
import { UserRole } from '../types';
import { Heart, Package, Truck, ArrowRight } from 'lucide-react';

interface RoleSelectionProps {
  onNavigate: (page: string) => void;
}

const RoleSelection: React.FC<RoleSelectionProps> = ({ onNavigate }) => {
  const { setRole } = useApp();

  const handleSelect = (role: UserRole) => {
    setRole(role);
    onNavigate(role === UserRole.DONOR ? 'donor-dashboard' : 'supplier-dashboard');
  };

  return (
    <div className="min-h-screen bg-green-50 flex items-center justify-center p-6">
      <div className="max-w-4xl w-full text-center space-y-12">
        <div className="space-y-4">
           <div className="w-20 h-20 bg-green-500 rounded-[2rem] flex items-center justify-center mx-auto text-white shadow-xl rotate-12">
             <Heart fill="currentColor" className="w-10 h-10" />
           </div>
           <h1 className="text-4xl md:text-5xl font-black text-slate-900">Choose Your Role</h1>
           <p className="text-lg text-slate-500 max-w-lg mx-auto">Tell us how you'd like to help the community today.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <button 
            onClick={() => handleSelect(UserRole.DONOR)}
            className="group relative bg-white p-10 rounded-[3rem] shadow-xl hover:shadow-2xl transition-all border-4 border-transparent hover:border-green-500 text-left"
          >
            <div className="w-20 h-20 bg-green-100 rounded-3xl flex items-center justify-center text-green-600 mb-8 group-hover:scale-110 transition-transform">
              <Package className="w-10 h-10" />
            </div>
            <h3 className="text-3xl font-bold mb-4">I'm a Donor</h3>
            <p className="text-slate-500 mb-8 text-lg">I have surplus items like food, clothes, or furniture that I want to donate to those in need.</p>
            <div className="flex items-center text-green-600 font-bold group-hover:translate-x-2 transition-transform">
              <span>Select Donor</span>
              <ArrowRight className="ml-2 w-5 h-5" />
            </div>
          </button>

          <button 
            onClick={() => handleSelect(UserRole.SUPPLIER)}
            className="group relative bg-white p-10 rounded-[3rem] shadow-xl hover:shadow-2xl transition-all border-4 border-transparent hover:border-orange-500 text-left"
          >
            <div className="w-20 h-20 bg-orange-100 rounded-3xl flex items-center justify-center text-orange-600 mb-8 group-hover:scale-110 transition-transform">
              <Truck className="w-10 h-10" />
            </div>
            <h3 className="text-3xl font-bold mb-4">I'm a Supplier</h3>
            <p className="text-slate-500 mb-8 text-lg">I collect donated items and ensure they reach the right people or organizations.</p>
            <div className="flex items-center text-orange-600 font-bold group-hover:translate-x-2 transition-transform">
              <span>Select Supplier</span>
              <ArrowRight className="ml-2 w-5 h-5" />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoleSelection;
