
import React from 'react';
import { Heart, Target, Sparkles, Users } from 'lucide-react';

interface AboutProps {
  onNavigate: (page: string) => void;
}

const About: React.FC<AboutProps> = ({ onNavigate }) => {
  return (
    <div className="bg-slate-50">
       <section className="bg-white py-24">
         <div className="max-w-4xl mx-auto px-4 text-center space-y-8">
           <div className="inline-block p-4 bg-green-100 rounded-3xl text-green-600 mb-4 animate-bounce">
             <Heart fill="currentColor" className="w-10 h-10" />
           </div>
           <h1 className="text-5xl md:text-6xl font-black text-slate-900">Why ShareFeast?</h1>
           <p className="text-xl text-slate-600 leading-relaxed">
             In a world where millions of tons of resources are wasted every day, millions of people still go to bed hungry or lack basic essentials. ShareFeast was born from a simple idea: <strong>Kindness starts at home.</strong>
           </p>
         </div>
       </section>

       <section className="py-24 px-4">
         <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="bg-white p-10 rounded-[3rem] shadow-sm hover:shadow-xl transition-all border border-slate-100 text-center space-y-4">
               <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto text-orange-600 mb-4">
                 <Target className="w-8 h-8" />
               </div>
               <h3 className="text-2xl font-bold">Our Mission</h3>
               <p className="text-slate-500">To create a seamless, technology-driven bridge between surplus and need, ensuring no usable item goes to waste.</p>
            </div>
            <div className="bg-white p-10 rounded-[3rem] shadow-sm hover:shadow-xl transition-all border border-slate-100 text-center space-y-4">
               <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto text-green-600 mb-4">
                 <Users className="w-8 h-8" />
               </div>
               <h3 className="text-2xl font-bold">Our Community</h3>
               <p className="text-slate-500">A growing network of local donors and suppliers working together to strengthen neighborhood bonds.</p>
            </div>
            <div className="bg-white p-10 rounded-[3rem] shadow-sm hover:shadow-xl transition-all border border-slate-100 text-center space-y-4">
               <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto text-blue-600 mb-4">
                 <Sparkles className="w-8 h-8" />
               </div>
               <h3 className="text-2xl font-bold">The Impact</h3>
               <p className="text-slate-500">Reducing waste, alleviating poverty, and fostering a culture of gratitude and shared responsibility.</p>
            </div>
         </div>
       </section>

       <section className="py-24 bg-green-500 text-white overflow-hidden relative">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
          <div className="max-w-5xl mx-auto px-4 text-center space-y-12">
             <h2 className="text-4xl font-black">Become a part of the story.</h2>
             <p className="text-xl opacity-90 max-w-2xl mx-auto">Whether you're donating a single loaf of bread or collecting a set of furniture, your action matters.</p>
             <button 
              onClick={() => onNavigate('signup')}
              className="px-12 py-5 bg-white text-green-600 rounded-full font-black text-lg shadow-2xl transform hover:scale-105 transition-transform"
             >
               Join ShareFeast Today
             </button>
          </div>
       </section>
    </div>
  );
};

export default About;
