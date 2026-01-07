
import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Search, MapPin, Filter, Package, Truck, Info, CheckCircle2 } from 'lucide-react';
import { Category, DonationStatus } from '../types';

interface SupplierDashboardProps {
  onNavigate: (page: string) => void;
}

const SupplierDashboard: React.FC<SupplierDashboardProps> = ({ onNavigate }) => {
  const { currentUser, donations, requestCollection } = useApp();
  const [filter, setFilter] = useState<Category | 'ALL'>('ALL');
  const [search, setSearch] = useState('');

  // Filter donations: must be in same city, available, and match filters
  const availableItems = donations.filter(d => 
    d.city === currentUser?.city && 
    (d.status === DonationStatus.AVAILABLE || d.requestedBy === currentUser?.id || d.acceptedBy === currentUser?.id) &&
    (filter === 'ALL' || d.category === filter) &&
    (d.itemName.toLowerCase().includes(search.toLowerCase()))
  );

  const stats = [
    { label: 'Available Locally', value: availableItems.filter(i => i.status === DonationStatus.AVAILABLE).length, icon: Package, color: 'text-green-600' },
    { label: 'Active Requests', value: availableItems.filter(i => i.status === DonationStatus.REQUESTED && i.requestedBy === currentUser?.id).length, icon: Truck, color: 'text-orange-600' },
    { label: 'Collections Done', value: 12, icon: CheckCircle2, color: 'text-blue-600' },
  ];

  return (
    <div className="bg-slate-50 min-h-screen pt-12 pb-24 px-4">
      <div className="max-w-7xl mx-auto space-y-12">
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <h1 className="text-4xl font-black text-slate-900">Items in {currentUser?.city} 📍</h1>
            <p className="text-slate-500 text-lg">Help distribute surplus to people in your locality.</p>
          </div>
        </header>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((s, idx) => (
            <div key={idx} className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex items-center space-x-4">
              <div className={`p-4 rounded-2xl bg-slate-50 ${s.color}`}>
                <s.icon className="w-8 h-8" />
              </div>
              <div>
                <div className="text-2xl font-black">{s.value}</div>
                <div className="text-slate-500 font-bold text-sm">{s.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="bg-white p-4 rounded-[2rem] shadow-sm border border-slate-100 flex flex-col md:flex-row items-center gap-4">
          <div className="relative flex-grow w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input 
              placeholder="Search items..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-green-500 outline-none"
            />
          </div>
          <div className="flex items-center space-x-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
             {['ALL', ...Object.values(Category)].map((cat) => (
               <button
                key={cat}
                onClick={() => setFilter(cat as any)}
                className={`px-6 py-3 rounded-xl font-bold text-sm whitespace-nowrap transition-all ${
                  filter === cat ? 'bg-green-500 text-white shadow-lg' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
               >
                 {cat}
               </button>
             ))}
          </div>
        </div>

        {/* Item Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {availableItems.length > 0 ? availableItems.map(d => {
            const isRequestedByMe = d.requestedBy === currentUser?.id;
            const isAcceptedForMe = d.acceptedBy === currentUser?.id;

            return (
              <div key={d.id} className="bg-white rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all border border-slate-100 group flex flex-col">
                <div className="relative h-56 overflow-hidden">
                  <img src={d.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt={d.itemName} />
                  <div className="absolute top-4 left-4 right-4 flex justify-between">
                    <span className="px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest bg-white/90 backdrop-blur shadow-sm">
                      {d.category}
                    </span>
                    <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest text-white shadow-sm ${
                      d.status === DonationStatus.AVAILABLE ? 'bg-green-500' : 
                      isAcceptedForMe ? 'bg-blue-500' : 'bg-orange-500'
                    }`}>
                      {isAcceptedForMe ? 'READY' : d.status}
                    </span>
                  </div>
                </div>
                <div className="p-6 flex-grow space-y-4 flex flex-col justify-between">
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-slate-800 line-clamp-1">{d.itemName}</h3>
                    <div className="flex items-center text-sm font-semibold text-slate-500">
                      <MapPin className="w-4 h-4 mr-1 text-green-500" />
                      {d.city}
                    </div>
                    <div className="flex flex-wrap gap-2 pt-2">
                       <span className="px-3 py-1 bg-slate-100 rounded-lg text-xs font-bold text-slate-500">{d.condition}</span>
                       {d.quantity && <span className="px-3 py-1 bg-slate-100 rounded-lg text-xs font-bold text-slate-500">{d.quantity}</span>}
                    </div>
                  </div>

                  <div className="pt-4 space-y-3">
                    {isAcceptedForMe ? (
                      <div className="space-y-3">
                         <div className="p-3 bg-blue-50 rounded-xl space-y-1">
                           <p className="text-[10px] font-bold text-blue-400 uppercase tracking-widest">Collector Address</p>
                           <p className="text-xs font-bold text-blue-800">123 Kindness St, Apt 4B, {d.city}</p>
                           <p className="text-xs font-bold text-blue-800">Mobile: +1 987 654 321</p>
                         </div>
                         <div className="flex items-center justify-center p-3 bg-green-50 text-green-700 rounded-xl font-bold text-sm">
                           <CheckCircle2 className="w-4 h-4 mr-2" />
                           Accepted! Collect soon.
                         </div>
                      </div>
                    ) : isRequestedByMe ? (
                      <button className="w-full py-3 bg-slate-100 text-slate-400 rounded-2xl font-bold cursor-not-allowed">
                        Waiting for Approval...
                      </button>
                    ) : (
                      <button 
                        onClick={() => requestCollection(d.id)}
                        className="w-full py-4 bg-green-500 text-white rounded-2xl font-bold shadow-lg hover:bg-green-600 transition-all flex items-center justify-center group/btn"
                      >
                        <span>Request Collection</span>
                        <Truck className="ml-2 w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          }) : (
            <div className="col-span-full py-32 text-center space-y-6">
              <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mx-auto text-green-200">
                <Package className="w-12 h-12" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-400">No items available right now.</h3>
                <p className="text-slate-400">Check back later or try a different category.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SupplierDashboard;
