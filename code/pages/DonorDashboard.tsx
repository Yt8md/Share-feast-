
import React from 'react';
import { useApp } from '../context/AppContext';
import { PackagePlus, Clock, CheckCircle2, AlertCircle, Heart } from 'lucide-react';
import { DonationStatus } from '../types';

interface DonorDashboardProps {
  onNavigate: (page: string) => void;
}

const DonorDashboard: React.FC<DonorDashboardProps> = ({ onNavigate }) => {
  const { currentUser, donations, handleRequest } = useApp();

  const myDonations = donations.filter(d => d.donorId === currentUser?.id);
  const pendingRequests = myDonations.filter(d => d.status === DonationStatus.REQUESTED);
  
  return (
    <div className="bg-slate-50 min-h-screen pt-12 pb-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-12">
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <h1 className="text-4xl font-black text-slate-900">Welcome, {currentUser?.fullName}! 👋</h1>
            <p className="text-slate-500 text-lg">Your kindness has touched many lives in {currentUser?.city}.</p>
          </div>
          <button 
            onClick={() => onNavigate('post-donation')}
            className="flex items-center space-x-2 px-8 py-4 bg-green-500 text-white rounded-2xl font-bold shadow-lg hover:bg-green-600 hover:-translate-y-1 transition-all"
          >
            <PackagePlus className="w-6 h-6" />
            <span>New Donation</span>
          </button>
        </header>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100">
            <div className="text-4xl font-black text-green-500 mb-1">{myDonations.length}</div>
            <div className="text-slate-500 font-bold">Total Donations</div>
          </div>
          <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100">
            <div className="text-4xl font-black text-orange-500 mb-1">{pendingRequests.length}</div>
            <div className="text-slate-500 font-bold">Incoming Requests</div>
          </div>
          <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100">
            <div className="text-4xl font-black text-blue-500 mb-1">
              {myDonations.filter(d => d.status === DonationStatus.COLLECTED).length}
            </div>
            <div className="text-slate-500 font-bold">Success Stories</div>
          </div>
        </div>

        {/* Requests Section */}
        {pendingRequests.length > 0 && (
          <section className="space-y-6">
            <h2 className="text-2xl font-bold flex items-center space-x-2">
              <AlertCircle className="text-orange-500 w-6 h-6" />
              <span>Pending Collection Requests</span>
            </h2>
            <div className="grid grid-cols-1 gap-4">
              {pendingRequests.map(d => (
                <div key={d.id} className="bg-orange-50 border-2 border-orange-100 p-6 rounded-[2rem] flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="flex items-center space-x-4">
                    <img src={d.image} className="w-20 h-20 rounded-2xl object-cover shadow-md" alt="" />
                    <div>
                      <h4 className="font-bold text-lg">{d.itemName}</h4>
                      <p className="text-slate-500">Requested by local supplier</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <button 
                      onClick={() => handleRequest(d.id, false)}
                      className="px-6 py-3 bg-white text-slate-600 rounded-xl font-bold hover:bg-slate-100 transition-colors"
                    >
                      Decline
                    </button>
                    <button 
                      onClick={() => handleRequest(d.id, true)}
                      className="px-8 py-3 bg-green-500 text-white rounded-xl font-bold shadow-md hover:bg-green-600 transition-all"
                    >
                      Accept Request
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* My List */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold">Your Donation History</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {myDonations.length > 0 ? myDonations.map(d => (
              <div key={d.id} className="bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-xl transition-all border border-slate-100 group">
                <div className="relative h-48">
                  <img src={d.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt={d.itemName} />
                  <div className="absolute top-4 left-4">
                    <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-white shadow-lg ${
                      d.status === DonationStatus.AVAILABLE ? 'text-green-600' : 
                      d.status === DonationStatus.ACCEPTED ? 'text-blue-600' : 'text-slate-600'
                    }`}>
                      {d.status}
                    </span>
                  </div>
                </div>
                <div className="p-6 space-y-3">
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">{d.category}</div>
                  <h3 className="text-xl font-bold text-slate-800">{d.itemName}</h3>
                  <div className="flex items-center text-sm text-slate-500">
                    <Clock className="w-4 h-4 mr-2" />
                    <span>Posted {new Date(d.createdAt).toLocaleDateString()}</span>
                  </div>
                  {d.status === DonationStatus.ACCEPTED && (
                    <div className="mt-4 p-4 bg-blue-50 text-blue-700 rounded-xl text-sm font-medium">
                      Collection scheduled with supplier.
                    </div>
                  )}
                </div>
              </div>
            )) : (
              <div className="col-span-full py-20 text-center space-y-4">
                <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-slate-300">
                  <PackagePlus className="w-10 h-10" />
                </div>
                <h3 className="text-xl font-bold text-slate-400">No donations yet.</h3>
                <button 
                  onClick={() => onNavigate('post-donation')}
                  className="text-green-600 font-bold hover:underline"
                >
                  Post your first item
                </button>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default DonorDashboard;
