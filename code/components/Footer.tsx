
import React from 'react';
import { Heart, Instagram, Twitter, Facebook, Mail } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: string) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-slate-900 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center space-x-2 text-green-400 mb-6">
              <Heart fill="currentColor" className="w-6 h-6" />
              <span className="text-2xl font-bold tracking-tight">ShareFeast</span>
            </div>
            <p className="text-slate-400 leading-relaxed mb-6">
              Ending hunger and waste through community connection. One donation can change a life.
            </p>
            <div className="flex space-x-4">
              <button className="p-2 bg-slate-800 rounded-full hover:bg-green-500 transition-colors"><Instagram className="w-5 h-5" /></button>
              <button className="p-2 bg-slate-800 rounded-full hover:bg-green-500 transition-colors"><Twitter className="w-5 h-5" /></button>
              <button className="p-2 bg-slate-800 rounded-full hover:bg-green-500 transition-colors"><Facebook className="w-5 h-5" /></button>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-6">Quick Links</h4>
            <ul className="space-y-4 text-slate-400">
              <li><button onClick={() => onNavigate('home')} className="hover:text-green-400 transition-colors">Home</button></li>
              <li><button onClick={() => onNavigate('about')} className="hover:text-green-400 transition-colors">About Us</button></li>
              <li><button onClick={() => onNavigate('contact')} className="hover:text-green-400 transition-colors">Contact</button></li>
              <li><button className="hover:text-green-400 transition-colors">FAQs</button></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6">Support</h4>
            <ul className="space-y-4 text-slate-400">
              <li><button className="hover:text-green-400 transition-colors">Guidelines</button></li>
              <li><button className="hover:text-green-400 transition-colors">Safety Tips</button></li>
              <li><button className="hover:text-green-400 transition-colors">Terms of Service</button></li>
              <li><button className="hover:text-green-400 transition-colors">Privacy Policy</button></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6">Join Our Newsletter</h4>
            <p className="text-slate-400 mb-4">Get updates on impact and new features.</p>
            <div className="flex bg-slate-800 rounded-full p-1 border border-slate-700">
              <input 
                type="email" 
                placeholder="Email address" 
                className="bg-transparent border-none focus:ring-0 px-4 text-sm w-full"
              />
              <button className="bg-green-500 p-2 rounded-full hover:bg-green-600 transition-colors">
                <Mail className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
        
        <div className="border-t border-slate-800 mt-16 pt-8 text-center text-slate-500 text-sm">
          <p>© {new Date().getFullYear()} ShareFeast. Made with ❤️ for a better world.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
