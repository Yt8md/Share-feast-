import React, { useState, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { Camera, Package, Info, ArrowLeft, Send, Sparkles, X } from 'lucide-react';
import { Category, ItemCondition } from '../types';

interface PostDonationProps {
  onNavigate: (page: string) => void;
}

const PostDonation: React.FC<PostDonationProps> = ({ onNavigate }) => {
  const { addDonation } = useApp();
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [formData, setFormData] = useState({
    itemName: '',
    category: Category.FOOD,
    quantity: '',
    condition: ItemCondition.GOOD,
    image: '' // Start empty to show the upload prompt
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, image: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setFormData(prev => ({ ...prev, image: '' }));
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.image) {
      alert("Please upload an image for the item.");
      return;
    }
    setLoading(true);
    // Simulate API delay
    await new Promise(r => setTimeout(r, 1000));
    // Provide a default image if somehow it's missing, though we check above
    const finalData = {
      ...formData,
      image: formData.image || 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&q=80&w=800'
    };
    addDonation(finalData as any);
    onNavigate('donor-dashboard');
  };

  return (
    <div className="bg-slate-50 min-h-screen py-16 px-4">
      <div className="max-w-2xl mx-auto">
        <button 
          onClick={() => onNavigate('donor-dashboard')}
          className="mb-8 flex items-center text-slate-500 hover:text-green-600 font-bold transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Dashboard
        </button>

        <div className="bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-slate-100">
          <div className="bg-green-500 p-8 text-white relative">
            <Sparkles className="absolute top-8 right-8 w-12 h-12 text-white/20 animate-pulse" />
            <h1 className="text-3xl font-bold mb-2">Share Something</h1>
            <p className="text-green-50 opacity-90">Give a second life to your surplus items.</p>
          </div>

          <form onSubmit={handleSubmit} className="p-10 space-y-8">
            <div className="space-y-4">
              <label className="text-sm font-bold text-slate-600 block ml-1">What are you donating?</label>
              <input 
                required
                value={formData.itemName}
                onChange={(e) => setFormData({...formData, itemName: e.target.value})}
                placeholder="e.g. 10 packs of noodles, Winter coats"
                className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-green-100 focus:border-green-500 outline-none transition-all font-medium"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <label className="text-sm font-bold text-slate-600 block ml-1">Category</label>
                <select 
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value as any})}
                  className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-green-100 focus:border-green-500 outline-none transition-all font-bold"
                >
                  {Object.values(Category).map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>

              <div className="space-y-4">
                <label className="text-sm font-bold text-slate-600 block ml-1">Condition</label>
                <select 
                  value={formData.condition}
                  onChange={(e) => setFormData({...formData, condition: e.target.value as any})}
                  className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-green-100 focus:border-green-500 outline-none transition-all font-bold"
                >
                  {Object.values(ItemCondition).map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-sm font-bold text-slate-600 block ml-1">Quantity / Details</label>
              <input 
                value={formData.quantity}
                onChange={(e) => setFormData({...formData, quantity: e.target.value})}
                placeholder="e.g. Feeds 10 people, 5 jackets"
                className="w-full px-6 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-green-100 focus:border-green-500 outline-none transition-all font-medium"
              />
            </div>

            <div className="space-y-4">
              <label className="text-sm font-bold text-slate-600 block ml-1">Item Image</label>
              <div 
                onClick={() => fileInputRef.current?.click()}
                className={`relative group cursor-pointer h-64 bg-slate-50 border-2 border-dashed border-slate-200 rounded-[2rem] flex flex-col items-center justify-center hover:border-green-500 transition-all overflow-hidden ${formData.image ? 'border-solid border-green-500' : ''}`}
              >
                {formData.image ? (
                  <>
                    <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                       <p className="text-white font-bold flex items-center">
                         <Camera className="w-5 h-5 mr-2" />
                         Change Photo
                       </p>
                    </div>
                    <button 
                      onClick={removeImage}
                      className="absolute top-4 right-4 p-2 bg-white/90 rounded-full text-slate-600 hover:text-orange-500 shadow-lg z-10"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </>
                ) : (
                  <>
                    <Camera className="w-12 h-12 text-slate-300 group-hover:text-green-500 mb-2 transition-colors" />
                    <p className="text-slate-400 font-bold">Tap to upload photo</p>
                    <p className="text-xs text-slate-300 mt-1">PNG, JPG or JPEG</p>
                  </>
                )}
                <input 
                  type="file" 
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept="image/*"
                  className="hidden" 
                />
              </div>
              <p className="text-xs text-slate-400 text-center">Images help suppliers identify items quickly.</p>
            </div>

            <button
              disabled={loading}
              type="submit"
              className={`w-full py-5 bg-green-500 text-white rounded-[2rem] font-bold text-lg shadow-xl hover:bg-green-600 transition-all flex items-center justify-center space-x-2 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {loading ? (
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
              ) : (
                <>
                  <span>Post Donation</span>
                  <Send className="w-5 h-5" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PostDonation;