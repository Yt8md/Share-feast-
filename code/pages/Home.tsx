
import React from 'react';
import { useApp } from '../context/AppContext';
import { Heart, Package, Users, ArrowRight, Zap, Globe, ShieldCheck } from 'lucide-react';

interface HomeProps {
  onNavigate: (page: string) => void;
}

const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  const { currentUser } = useApp();

  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center pt-10 overflow-hidden">
        {/* Background blobs for aesthetics */}
        <div className="absolute top-0 -left-20 w-96 h-96 bg-green-200/50 rounded-full blur-3xl -z-10 animate-pulse"></div>
        <div className="absolute bottom-0 -right-20 w-96 h-96 bg-orange-200/50 rounded-full blur-3xl -z-10"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 animate-[fadeIn_0.8s_ease-out]">
            <div className="inline-flex items-center space-x-2 px-4 py-1.5 bg-green-100 text-green-700 rounded-full text-sm font-bold border border-green-200 shadow-sm">
              <Zap className="w-4 h-4" />
              <span>Join 5,000+ local heroes sharing surplus</span>
            </div>
            <h1 className="text-6xl md:text-7xl font-extrabold text-slate-900 leading-[1.1]">
              Sharing surplus, <br />
              <span className="text-green-500 italic">Spreading kindness.</span>
            </h1>
            <p className="text-xl text-slate-600 leading-relaxed max-w-lg">
              One home's unused item is another's essential. Join ShareFeast to donate or collect surplus food, clothes, and more in your city.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <button 
                onClick={() => onNavigate(currentUser ? 'donor-dashboard' : 'signup')}
                className="group px-8 py-4 bg-green-500 text-white rounded-full font-bold text-lg shadow-xl hover:bg-green-600 hover:shadow-green-200 transition-all flex items-center justify-center space-x-2"
              >
                <span>Start Sharing</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button 
                onClick={() => onNavigate('about')}
                className="px-8 py-4 bg-white text-slate-700 border-2 border-slate-100 rounded-full font-bold text-lg hover:border-green-200 transition-all shadow-sm"
              >
                Our Mission
              </button>
            </div>
          </div>
          
          <div className="relative animate-[float_6s_ease-in-out_infinite]">
            <img 
              src="https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&q=80&w=1200" 
              alt="People sharing food" 
              className="rounded-[3rem] shadow-2xl border-8 border-white transform rotate-2 hover:rotate-0 transition-transform duration-500"
            />
            <div className="absolute -bottom-10 -left-10 bg-white p-6 rounded-3xl shadow-2xl border border-green-100 hidden sm:block">
              <div className="flex items-center space-x-4">
                <div className="bg-orange-100 p-3 rounded-2xl">
                  <Heart className="w-8 h-8 text-orange-500" fill="currentColor" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-slate-900">12k+</div>
                  <div className="text-sm text-slate-500">Items Donated</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div className="space-y-4 p-8 rounded-3xl bg-green-50 border border-green-100">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto text-green-600 mb-4">
                <Package className="w-8 h-8" />
              </div>
              <h3 className="text-3xl font-bold">5,200+</h3>
              <p className="text-slate-500 font-medium">Food Parcels Shared</p>
            </div>
            <div className="space-y-4 p-8 rounded-3xl bg-orange-50 border border-orange-100">
              <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto text-orange-600 mb-4">
                <Users className="w-8 h-8" />
              </div>
              <h3 className="text-3xl font-bold">1,800+</h3>
              <p className="text-slate-500 font-medium">Active Volunteers</p>
            </div>
            <div className="space-y-4 p-8 rounded-3xl bg-blue-50 border border-blue-100">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto text-blue-600 mb-4">
                <Globe className="w-8 h-8" />
              </div>
              <h3 className="text-3xl font-bold">45</h3>
              <p className="text-slate-500 font-medium">Cities Reached</p>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl font-bold">How ShareFeast Works</h2>
            <p className="text-slate-500 max-w-xl mx-auto">Simple steps to make a huge difference in your community.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
             <div className="text-center relative">
               <div className="text-7xl font-black text-green-100 absolute -top-8 left-1/2 -translate-x-1/2 -z-0">01</div>
               <div className="relative z-10 space-y-4">
                 <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto shadow-lg text-green-500">
                   <ShieldCheck className="w-10 h-10" />
                 </div>
                 <h4 className="text-xl font-bold">Post Surplus</h4>
                 <p className="text-slate-500">Snap a photo of any unused items or extra food and list it on the platform.</p>
               </div>
             </div>
             <div className="text-center relative">
               <div className="text-7xl font-black text-green-100 absolute -top-8 left-1/2 -translate-x-1/2 -z-0">02</div>
               <div className="relative z-10 space-y-4">
                 <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto shadow-lg text-orange-500">
                   <Users className="w-10 h-10" />
                 </div>
                 <h4 className="text-xl font-bold">Local Request</h4>
                 <p className="text-slate-500">Suppliers in your city see the post and request to collect for distribution.</p>
               </div>
             </div>
             <div className="text-center relative">
               <div className="text-7xl font-black text-green-100 absolute -top-8 left-1/2 -translate-x-1/2 -z-0">03</div>
               <div className="relative z-10 space-y-4">
                 <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto shadow-lg text-blue-500">
                   <Heart className="w-10 h-10" />
                 </div>
                 <h4 className="text-xl font-bold">Spread Happiness</h4>
                 <p className="text-slate-500">Accept the request, arrange a pickup, and enjoy the feeling of helping others.</p>
               </div>
             </div>
          </div>
        </div>
      </section>

      {/* CTA section */}
      <section className="py-24 px-4">
        <div className="max-w-5xl mx-auto bg-green-500 rounded-[3rem] p-12 text-center text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-green-400 rounded-full -translate-y-1/2 translate-x-1/2 opacity-50"></div>
          <h2 className="text-4xl font-bold mb-6">Ready to make an impact?</h2>
          <p className="text-xl opacity-90 mb-10 max-w-2xl mx-auto">Join the movement today. It only takes 2 minutes to list your first item.</p>
          <button 
            onClick={() => onNavigate('signup')}
            className="px-10 py-5 bg-white text-green-600 rounded-full font-bold text-lg shadow-2xl hover:bg-slate-50 transition-colors"
          >
            Create Your Account
          </button>
        </div>
      </section>
    </div>
  );
};

export default Home;
