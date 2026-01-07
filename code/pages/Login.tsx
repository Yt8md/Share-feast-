
import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Mail, Lock, Heart, ArrowRight } from 'lucide-react';

interface LoginProps {
  onNavigate: (page: string) => void;
}

const Login: React.FC<LoginProps> = ({ onNavigate }) => {
  const { login } = useApp();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(email)) {
      onNavigate('donor-dashboard'); // Context handles redirection if role is missing
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 bg-slate-50">
      <div className="w-full max-w-md bg-white rounded-[2.5rem] shadow-xl overflow-hidden p-10 border border-slate-100">
        <div className="text-center mb-10 space-y-2">
          <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto text-green-600 mb-4">
            <Heart fill="currentColor" className="w-8 h-8" />
          </div>
          <h2 className="text-3xl font-bold text-slate-900">Welcome Back</h2>
          <p className="text-slate-500">Sign in to continue sharing kindness.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 ml-1">Email Address</label>
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-green-500 transition-colors" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-green-100 focus:border-green-500 outline-none transition-all"
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center ml-1">
              <label className="text-sm font-bold text-slate-700">Password</label>
              <button type="button" className="text-xs font-semibold text-green-600 hover:text-green-700">Forgot?</button>
            </div>
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-green-500 transition-colors" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-green-100 focus:border-green-500 outline-none transition-all"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-4 bg-green-500 text-white rounded-2xl font-bold text-lg shadow-lg hover:bg-green-600 hover:shadow-green-200 transition-all flex items-center justify-center space-x-2"
          >
            <span>Sign In</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </form>

        <div className="mt-8 pt-8 border-t border-slate-100 text-center">
          <p className="text-slate-500 font-medium">
            Don't have an account?{' '}
            <button 
              onClick={() => onNavigate('signup')}
              className="text-green-600 font-bold hover:underline"
            >
              Sign up now
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
