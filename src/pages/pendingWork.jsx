// PendingWork.js - Plain React with TailwindCSS (No ShadCN)
import React, { useState } from 'react';
// import { useAuth } from '@/context/AuthContext';
import { Search, MapPin, Calendar, User, ArrowRight, Filter, ClipboardList } from 'lucide-react';
import { StatusBadge } from '../components/Dashboard/StatsBadge';
import { ArrowLeftCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const mockPendingFarmers = [
  {
    id: 'farmer-1',
    name: 'Rajesh Kumar',
    location: 'Mysore, Karnataka',
    village: 'Belavadi',
    district: 'Mysore',
    phoneNumber: '+91 98765 43210',
    requestDate: '2024-01-20',
    assignedAgentId: 'agent-1',
    status: 'pending',
  },
  {
    id: 'farmer-2',
    name: 'Priya Devi',
    location: 'Mandya, Karnataka',
    village: 'Srirangapatna',
    district: 'Mandya',
    phoneNumber: '+91 98765 43211',
    requestDate: '2024-01-19',
    assignedAgentId: 'agent-1',
    status: 'pending',
  },
  {
    id: 'farmer-3',
    name: 'Suresh Reddy',
    location: 'Tumkur, Karnataka',
    village: 'Kunigal',
    district: 'Tumkur',
    requestDate: '2024-01-18',
    assignedAgentId: 'agent-1',
    status: 'pending',
  },
];

// const [user,setUser] = useState({
//   id: 'agent-1',
//   role: 'agent',
//   name: 'Ravi Kumar'});

const user = {
  id: 'agent-1',
  role: 'agent',
  name: 'Ravi Kumar',
}

export default function PendingWork() {
  //   const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFarmer, setSelectedFarmer] = useState(null);

  const navigate = useNavigate();

  const filteredFarmers = mockPendingFarmers.filter(farmer => {
    const matchesSearch = farmer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      farmer.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      farmer.village.toLowerCase().includes(searchTerm.toLowerCase());

    if (user?.role === 'agent') {
      return farmer.assignedAgentId === user.id && matchesSearch;
    }
    return matchesSearch;
  });

  const handleProceed = (farmer) => {
    setSelectedFarmer(farmer);
    console.log('Proceeding with farmer:', farmer);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric', month: 'short', year: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-yellow-50 font-mono">
      <header className="bg-white border-b-2 border-black sticky top-0 z-10 shadow-sm">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">

          <div className='flex items-center space-x-4'>
            <button
              onClick={() => navigate("/dashboard")}
              className="hover:scale-110 transition-transform"
            >
              <ArrowLeftCircle className="h-8 w-8 text-black" />
            </button>
            <div>
              <h1 className="text-2xl font-black uppercase text-black tracking-tight">Pending Work</h1>
              <p className="text-gray-600 text-sm font-bold uppercase tracking-wider">Farmers awaiting claims</p>
            </div>
          </div>
          <div className="bg-yellow-300 border-2 border-black px-4 py-1 rounded-full shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] font-bold text-sm">
            {filteredFarmers.length} REQUESTS
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        <div className="flex gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
            <input
              className="neo-input pl-10"
              placeholder="Search by farmer name, village, or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="neo-button bg-white text-black flex items-center gap-2 hover:bg-gray-100">
            <Filter className="h-5 w-5" /> Filters
          </button>
        </div>

        <div className="space-y-6">
          {filteredFarmers.length === 0 ? (
            <div className="neo-box border-dashed p-12 text-center">
              <ClipboardList className="mx-auto h-16 w-16 text-black mb-4" />
              <h3 className="text-xl font-bold uppercase mb-2">No pending requests</h3>
              <p className="text-gray-600 font-medium">
                {searchTerm
                  ? 'No farmers found matching your search criteria.'
                  : 'All farmers in your jurisdiction have been processed.'}
              </p>
            </div>
          ) : (
            filteredFarmers.map(farmer => (
              <div key={farmer.id} className="neo-box p-6 hover:translate-x-[2px] hover:translate-y-[2px] transition-all">
                <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                  <div className="space-y-3 w-full">
                    <div className="flex items-center justify-between md:justify-start gap-4">
                      <h3 className="text-xl font-black text-black">{farmer.name}</h3>
                      <span className="px-3 py-1 bg-yellow-100 border border-yellow-500 rounded text-xs font-bold uppercase tracking-wider text-black">
                        {farmer.status}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 text-sm">
                      <div className="flex items-center gap-2 text-gray-700 font-medium">
                        <MapPin className="h-4 w-4 text-black" />
                        {farmer.village}, {farmer.district}
                      </div>
                      <div className="flex items-center gap-2 text-gray-700 font-medium">
                        <Calendar className="h-4 w-4 text-black" />
                        Requested: {formatDate(farmer.requestDate)}
                      </div>
                      <div className="flex items-center gap-2 text-gray-700 font-medium md:col-span-2">
                        <span className="font-bold text-black uppercase text-xs">Full Location:</span> {farmer.location}
                      </div>
                      {farmer.phoneNumber && (
                        <div className="flex items-center gap-2 text-gray-700 font-medium md:col-span-2">
                          <span className="font-bold text-black uppercase text-xs">Phone:</span> {farmer.phoneNumber}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-row md:flex-col gap-3 w-full md:w-auto mt-4 md:mt-0">
                    <button
                      onClick={() => handleProceed(farmer)}
                      className="neo-button bg-black text-white hover:bg-gray-800 flex items-center justify-center gap-2 flex-1 md:flex-none whitespace-nowrap"
                    >
                      PROCEED <ArrowRight className="h-4 w-4" />
                    </button>
                    <button className="neo-button bg-white text-black hover:bg-gray-100 flex-1 md:flex-none whitespace-nowrap">
                      DETAILS
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {selectedFarmer && (
          <div className="mt-8 neo-box border-l-[8px] border-l-green-500 p-8 bg-white relative">
            <h3 className="text-2xl font-black mb-2 uppercase">Processing: {selectedFarmer.name}</h3>
            <p className="text-sm font-bold text-gray-500 mb-6 uppercase tracking-wider">Fill insurance details for this farmer</p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-sm bg-gray-50 p-4 border border-black rounded-lg mb-6">
              <div><span className="font-bold block uppercase text-xs text-gray-500">Farmer ID</span> {selectedFarmer.id}</div>
              <div><span className="font-bold block uppercase text-xs text-gray-500">Date</span> {formatDate(selectedFarmer.requestDate)}</div>
              <div><span className="font-bold block uppercase text-xs text-gray-500">Village</span> {selectedFarmer.village}</div>
              <div><span className="font-bold block uppercase text-xs text-gray-500">District</span> {selectedFarmer.district}</div>
            </div>

            <div className="flex gap-4">
              <button className="neo-button bg-green-500 text-black hover:bg-green-600 flex-1 md:flex-none">
                START SUBMISSION
              </button>
              <button onClick={() => setSelectedFarmer(null)} className="neo-button bg-white text-black hover:bg-red-50 hover:text-red-500 hover:border-red-500 flex-1 md:flex-none">
                CANCEL
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
