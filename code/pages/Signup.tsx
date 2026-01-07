
import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { User, Mail, Phone, MapPin, Lock, ArrowRight, Calendar, UserCircle } from 'lucide-react';

interface SignupProps {
  onNavigate: (page: string) => void;
}

const Signup: React.FC<SignupProps> = ({ onNavigate }) => {
  const { signup } = useApp();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    mobile: '',
    age: '',
    dob: '',
    gender: 'Other',
    address: '',
    locality: '',
    city: '',
    state: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match!");
      return;
    }
    signup(formData);
    onNavigate('role-selection');
  };

  return (
    <div className="min-h-screen bg-slate-50 py-16 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-slate-100">
        <div className="grid grid-cols-1 md:grid-cols-3">
          {/* Side Panel */}
          <div className="bg-green-500 p-12 text-white flex flex-col justify-center">
             <div className="w-16 h-16 bg-white/20 backdrop-blur rounded-2xl flex items-center justify-center mb-8">
               <UserCircle className="w-10 h-10" />
             </div>
             <h2 className="text-3xl font-bold mb-4">Join the community.</h2>
             <p className="text-green-50 opacity-90 leading-relaxed">
               Create an account to start donating or collecting surplus items in your city. Your information is safe with us.
             </p>
          </div>

          {/* Form Panel */}
          <div className="col-span-2 p-8 md:p-12">
            <h1 className="text-3xl font-bold mb-8">Create Your Account</h1>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Full Name</label>
                  <input name="fullName" required onChange={handleChange} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-green-500/20 focus:border-green-500 outline-none" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Email</label>
                  <input name="email" type="email" required onChange={handleChange} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-green-500/20 focus:border-green-500 outline-none" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Mobile</label>
                  <input name="mobile" required onChange={handleChange} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-green-500/20 focus:border-green-500 outline-none" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Age</label>
                  <input name="age" type="number" required onChange={handleChange} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-green-500/20 focus:border-green-500 outline-none" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">DOB</label>
                  <input name="dob" type="date" required onChange={handleChange} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-green-500/20 focus:border-green-500 outline-none" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Gender</label>
                  <select name="gender" onChange={handleChange} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-green-500/20 focus:border-green-500 outline-none">
                    <option>Male</option>
                    <option>Female</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Street Address</label>
                <input name="address" required onChange={handleChange} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-green-500/20 focus:border-green-500 outline-none" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Locality</label>
                  <input name="locality" required onChange={handleChange} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-green-500/20 focus:border-green-500 outline-none" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">City</label>
                  <input name="city" required onChange={handleChange} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-green-500/20 focus:border-green-500 outline-none" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">State</label>
                  <input name="state" required onChange={handleChange} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-green-500/20 focus:border-green-500 outline-none" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Password</label>
                  <input name="password" type="password" required onChange={handleChange} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-green-500/20 focus:border-green-500 outline-none" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Confirm</label>
                  <input name="confirmPassword" type="password" required onChange={handleChange} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-green-500/20 focus:border-green-500 outline-none" />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-green-500 text-white rounded-2xl font-bold text-lg shadow-lg hover:bg-green-600 transition-all flex items-center justify-center space-x-2"
              >
                <span>Continue</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
