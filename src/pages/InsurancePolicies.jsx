import React, { useState, useEffect } from 'react';
import { FileText, CheckCircle, XCircle, Search, Filter, Eye, Loader2, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

// Note: Replace with actual backend API call later
const mockClaims = [
    { id: 'CLM-1001', farmer: 'Rajesh Kumar', policyType: 'Pradhan Mantri Fasal Bima', amount: 45000, status: 'Pending', date: '2024-12-28', docUrl: '#' },
    { id: 'CLM-1002', farmer: 'Sunita Devi', policyType: 'Weather Based Crop Insurance', amount: 12000, status: 'Approved', date: '2024-12-27', docUrl: '#' },
    { id: 'CLM-1003', farmer: 'Amit Patel', policyType: 'Unified Package', amount: 85000, status: 'Pending', date: '2024-12-26', docUrl: '#' },
    { id: 'CLM-1004', farmer: 'Vikram Singh', policyType: 'Pradhan Mantri Fasal Bima', amount: 32000, status: 'Rejected', date: '2024-12-25', docUrl: '#' },
    { id: 'CLM-1005', farmer: 'Meera Reddy', policyType: 'Coconut Palm Insurance', amount: 15000, status: 'Pending', date: '2024-12-24', docUrl: '#' },
];

export default function InsurancePolicies() {
    const [claims, setClaims] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [filter, setFilter] = useState('All');
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchClaims = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/insurance/all`);
                const data = await response.json();
                if (data.success) {
                    // Normalize data structure if needed, backend sends { claims: [...] }
                    // Transforming backend 'status' to frontend expected 'Pending', 'Approved', 'Rejected' casing if needed
                    // But let's assume backend returns "Under Review" or similar. 
                    // Let's map "Under Review" to "Pending" for UI consistency or handle raw strings.
                    const mappedClaims = data.claims.map(c => ({
                        id: c._id,
                        farmer: c.userId || "Unknown Farmer", // ideally backend populates this, or we fetch
                        policyType: c.provider || "General Policy",
                        amount: 0, // Backend might not have amount in schema yet? Mocking for now as schema had 'authenticityScore' etc.
                        status: c.status === 'Under Review' ? 'Pending' : c.status,
                        date: new Date(c.submissionDate).toLocaleDateString(),
                        docUrl: '#'
                    }));
                    setClaims(mappedClaims);
                }
            } catch (error) {
                console.error("Error fetching claims:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchClaims();
    }, []);

    const handleStatusChange = async (id, newStatus) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/insurance/update/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: newStatus })
            });
            const data = await response.json();

            if (data.success) {
                setClaims(claims.map(claim =>
                    claim.id === id ? { ...claim, status: newStatus } : claim
                ));
            } else {
                alert("Failed to update status");
            }
        } catch (error) {
            console.error("Error updating status:", error);
            alert("Error updating status");
        }
    };

    const filteredClaims = claims.filter(claim => {
        const matchesFilter = filter === 'All' || claim.status === filter;
        const farmerName = claim.farmer || '';
        const claimId = claim.id || '';

        const matchesSearch = farmerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            claimId.toString().toLowerCase().includes(searchTerm.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    const getStatusColor = (status) => {
        switch (status) {
            case 'Approved': return 'bg-green-100 text-green-800 border-green-600';
            case 'Rejected': return 'bg-red-100 text-red-800 border-red-600';
            default: return 'bg-yellow-100 text-yellow-800 border-yellow-600';
        }
    };

    return (
        <div className="min-h-screen bg-yellow-50 font-sans p-6">

            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div className="flex items-center gap-4">
                    <Link to="/" className="neo-button bg-white hover:bg-gray-100 flex items-center justify-center !p-2">
                        <ArrowLeft className="h-5 w-5" />
                    </Link>
                    <div>
                        <h1 className="text-3xl font-black uppercase tracking-tighter">Insurance Policies</h1>
                        <p className="text-gray-600 font-bold">Manage and verify farmer claims</p>
                    </div>
                </div>
                <div className="flex gap-2">
                    <button className="neo-button bg-black text-white hover:bg-gray-800">
                        Generate Report
                    </button>
                </div>
            </div>

            {/* Filters & Search */}
            <div className="neo-box p-4 mb-8 flex flex-col md:flex-row gap-4 justify-between items-center">
                <div className="relative w-full md:w-96">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <input
                        type="text"
                        placeholder="Search by ID or Farmer Name..."
                        className="neo-input pl-10"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
                    {['All', 'Pending', 'Approved', 'Rejected'].map(status => (
                        <button
                            key={status}
                            onClick={() => setFilter(status)}
                            className={`px-4 py-2 font-bold uppercase text-sm border-2 border-black rounded-lg transition-all 
                        ${filter === status
                                    ? 'bg-black text-white shadow-[2px_2px_0px_0px_rgba(100,100,100,1)]'
                                    : 'bg-white hover:bg-gray-100'}`}
                        >
                            {status}
                        </button>
                    ))}
                </div>
            </div>

            {/* Claims List */}
            <div className="space-y-4">
                {isLoading ? (
                    <div className="text-center py-20 flex flex-col items-center">
                        <Loader2 className="h-10 w-10 animate-spin mb-4" />
                        <p className="font-bold text-gray-500">Loading Claims...</p>
                    </div>
                ) : filteredClaims.length === 0 ? (
                    <div className="text-center py-20 neo-box bg-gray-50 border-dashed">
                        <FileText className="h-16 w-16 mx-auto text-gray-300 mb-4" />
                        <p className="font-bold text-xl text-gray-400">No claims found</p>
                    </div>
                ) : (
                    filteredClaims.map((claim) => (
                        <div key={claim.id} className="neo-box p-6 flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between group hover:bg-blue-50/50">

                            {/* Info */}
                            <div className="flex-1">
                                <div className="flex flex-wrap items-center gap-3 mb-2">
                                    <span className="font-black text-lg">#{claim.id}</span>
                                    <span className={`px-3 py-1 rounded-full text-xs font-black uppercase border-2 ${getStatusColor(claim.status)}`}>
                                        {claim.status}
                                    </span>
                                    <span className="text-xs font-bold text-gray-500 bg-gray-200 px-2 py-1 rounded border border-gray-400">
                                        {claim.date}
                                    </span>
                                </div>
                                <h3 className="font-bold text-xl mb-1">{claim.farmer}</h3>
                                <p className="text-gray-600 font-medium flex items-center gap-2">
                                    policy: <span className="text-black">{claim.policyType}</span>
                                </p>
                            </div>

                            {/* Amount */}
                            <div className="text-left lg:text-right min-w-[150px]">
                                <p className="text-xs font-bold text-gray-500 uppercase">Claim Amount</p>
                                <p className="text-2xl font-black">₹{claim.amount.toLocaleString('en-IN')}</p>
                            </div>

                            {/* Actions */}
                            <div className="flex flex-wrap gap-3 w-full lg:w-auto justify-end">
                                <button className="neo-button bg-white hover:bg-gray-100 text-sm flex items-center gap-2">
                                    <Eye className="h-4 w-4" /> View Doc
                                </button>

                                {claim.status === 'Pending' && (
                                    <>
                                        <button
                                            onClick={() => handleStatusChange(claim.id, 'Approved')}
                                            className="neo-button bg-green-500 hover:bg-green-600 text-white text-sm flex items-center gap-2"
                                        >
                                            <CheckCircle className="h-4 w-4" /> Approve
                                        </button>
                                        <button
                                            onClick={() => handleStatusChange(claim.id, 'Rejected')}
                                            className="neo-button bg-red-500 hover:bg-red-600 text-white text-sm flex items-center gap-2"
                                        >
                                            <XCircle className="h-4 w-4" /> Reject
                                        </button>
                                    </>
                                )}
                            </div>

                        </div>
                    ))
                )}
            </div>

        </div>
    );
}
