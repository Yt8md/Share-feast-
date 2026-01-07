
import React from 'react';
import { Mail, Phone, MapPin, MessageCircle, Send } from 'lucide-react';

interface ContactProps {
  onNavigate: (page: string) => void;
}

const Contact: React.FC<ContactProps> = ({ onNavigate }) => {
  return (
    <div className="bg-slate-50 min-h-screen py-24 px-4">
       <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">
          <div className="space-y-12">
             <div className="space-y-4">
               <h1 className="text-5xl font-black text-slate-900">Get in Touch.</h1>
               <p className="text-xl text-slate-500 leading-relaxed">Have questions about how to donate or collect? Our team of kindness enthusiasts is here to help.</p>
             </div>

             <div className="space-y-8">
                <div className="flex items-center space-x-6">
                   <div className="p-4 bg-white rounded-3xl shadow-sm border border-slate-100 text-green-500">
                     <Mail className="w-6 h-6" />
                   </div>
                   <div>
                     <h4 className="font-bold text-slate-900">Email Us</h4>
                     <p className="text-slate-500">hello@sharefeast.org</p>
                   </div>
                </div>
                <div className="flex items-center space-x-6">
                   <div className="p-4 bg-white rounded-3xl shadow-sm border border-slate-100 text-orange-500">
                     <Phone className="w-6 h-6" />
                   </div>
                   <div>
                     <h4 className="font-bold text-slate-900">Call Support</h4>
                     <p className="text-slate-500">+1 (555) 123-SHARE</p>
                   </div>
                </div>
                <div className="flex items-center space-x-6">
                   <div className="p-4 bg-white rounded-3xl shadow-sm border border-slate-100 text-blue-500">
                     <MapPin className="w-6 h-6" />
                   </div>
                   <div>
                     <h4 className="font-bold text-slate-900">Main Hub</h4>
                     <p className="text-slate-500">456 Sharing Way, San Francisco, CA</p>
                   </div>
                </div>
             </div>
          </div>

          <div className="bg-white p-10 md:p-12 rounded-[3.5rem] shadow-xl border border-slate-100">
             <form className="space-y-8">
                <div className="space-y-1">
                   <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
                   <input className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-green-100 outline-none" placeholder="Your name" />
                </div>
                <div className="space-y-1">
                   <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
                   <input className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-green-100 outline-none" placeholder="you@example.com" />
                </div>
                <div className="space-y-1">
                   <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Your Message</label>
                   <textarea rows={4} className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-green-100 outline-none resize-none" placeholder="How can we help you?" />
                </div>
                <button className="w-full py-5 bg-green-500 text-white rounded-3xl font-bold text-lg shadow-lg hover:bg-green-600 transition-all flex items-center justify-center space-x-2">
                   <span>Send Message</span>
                   <Send className="w-5 h-5" />
                </button>
             </form>
          </div>
       </div>
    </div>
  );
};

export default Contact;
