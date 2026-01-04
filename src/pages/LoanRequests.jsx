import React, { useState, useEffect } from 'react';
import { Shield, CheckCircle, XCircle, Clock, Search, Filter, Loader2, CreditCard, Trash2, Zap } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

const StatusBadge = ({ status }) => {
    const styles = {
        APPROVED: 'bg-green-100 text-black border-green-600',
        PENDING: 'bg-yellow-100 text-black border-yellow-600',
        REJECTED: 'bg-red-100 text-black border-red-600',
        UNDER_REVIEW: 'bg-blue-100 text-black border-blue-600',
    };

    return (
        <span className={`px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider border-2 ${styles[status] || 'bg-gray-100 text-black border-black'}`}>
            {status}
        </span>
    );
};

export default function LoanRequests() {
    const [loans, setLoans] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('ALL');
    const { user } = useAuth(); // Assuming we might need token later

    useEffect(() => {
        fetchLoans();
    }, []);

    const fetchLoans = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/loan/getAll`);
            const data = await response.json();
            if (data.success) {
                setLoans(data.loans);
            } else {
                toast.error('Failed to fetch loans');
            }
        } catch (error) {
            console.error('Error fetching loans:', error);
            toast.error('Error connecting to server');
        } finally {
            setLoading(false);
        }
    };

    const handleStatusUpdate = async (id, newStatus) => {
        try {
            // Optimistic update
            setLoans(prevLoans => prevLoans.map(loan =>
                loan._id === id ? { ...loan, status: newStatus } : loan
            ));

            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/loan/updateStatus/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ status: newStatus }),
            });

            const data = await response.json();

            if (data.success) {
                toast.success(`Loan ${newStatus.toLowerCase()} successfully`);
            } else {
                // Revert on failure
                fetchLoans();
                toast.error(data.message || 'Failed to update status');
            }
        } catch (error) {
            console.error('Error updating status:', error);
            fetchLoans(); // Revert
            toast.error('Server error updating status');
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this loan request? This action cannot be undone.")) {
            return;
        }

        try {
            // Optimistic update
            const mLoans = loans;
            setLoans(prevLoans => prevLoans.filter(loan => loan._id !== id));

            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/loan/delete/${id}`, {
                method: 'DELETE',
            });

            const data = await response.json();

            if (data.success) {
                toast.success('Loan request deleted successfully');
            } else {
                setLoans(mLoans); // Revert
                toast.error(data.message || 'Failed to delete loan');
            }
        } catch (error) {
            console.error('Error deleting loan:', error);
            fetchLoans(); // Revert
            toast.error('Server error deleting loan');
        }
    };

    const filteredLoans = loans.filter(loan => {
        const farmerName = loan.farmerName || '';
        const purpose = loan.loanPurpose || '';

        const matchesSearch =
            farmerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            purpose.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'ALL' || loan.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-yellow-50">
                <Loader2 className="h-12 w-12 animate-spin text-black" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-yellow-50 p-6 md:p-8 font-mono">
            <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-4xl font-black text-black uppercase tracking-tighter mb-2">Loan Requests</h1>
                    <p className="text-gray-700 font-medium">Manage and review farmer financing applications</p>
                </div>
                <div className="bg-white border-2 border-black rounded-lg px-4 py-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                    <span className="font-bold text-lg">{filteredLoans.length} Applications</span>
                </div>
            </div>

            {/* Filters */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="relative md:col-span-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-black" />
                    <input
                        type="text"
                        placeholder="Search farmer or purpose..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="neo-input pl-10"
                    />
                </div>

                <div className="md:col-span-2 flex gap-3 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
                    {['ALL', 'PENDING', 'APPROVED', 'REJECTED'].map((status) => (
                        <button
                            key={status}
                            onClick={() => setStatusFilter(status)}
                            className={`px-6 py-2 rounded-lg font-bold border-2 border-black transition-all whitespace-nowrap uppercase tracking-wider ${statusFilter === status
                                ? 'bg-black text-white shadow-[4px_4px_0px_0px_rgba(100,100,100,1)] translate-x-[2px] translate-y-[2px]'
                                : 'bg-white text-black hover:bg-yellow-100 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none active:shadow-none'
                                }`}
                        >
                            {status === 'ALL' ? 'All' : status}
                        </button>
                    ))}
                </div>
            </div>

            {/* Loan List */}
            <div className="space-y-6">
                {filteredLoans.length === 0 ? (
                    <div className="text-center py-20 neo-box border-dashed">
                        <CreditCard className="mx-auto h-16 w-16 text-black mb-4" />
                        <h3 className="text-xl font-bold text-black uppercase">No loan requests found</h3>
                        <p className="mt-2 text-gray-600 font-medium">Try adjusting your filters or search terms.</p>
                    </div>
                ) : (
                    filteredLoans.map((loan) => (
                        <div key={loan._id} className="neo-box p-6 relative group">
                            {/* Decorative corner tag */}
                            <div className="absolute top-0 right-0 bg-black text-white text-xs font-bold px-3 py-1 rounded-bl-lg border-l-2 border-b-2 border-white">
                                {loan.cropType}
                            </div>

                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-6">
                                <div className="flex items-center gap-4">
                                    <div className="h-14 w-14 bg-yellow-200 border-2 border-black rounded-lg flex items-center justify-center flex-shrink-0 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                                        <CreditCard className="h-7 w-7 text-black" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-black">{loan.farmerName}</h3>
                                        <p className="text-sm font-semibold text-gray-600">Applied on {new Date(loan.createdAt).toLocaleDateString()}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <StatusBadge status={loan.status} />
                                    <div className="text-right">
                                        <div className="text-2xl font-black text-black">
                                            ₹{loan.requestedAmount.toLocaleString('en-IN')}
                                        </div>
                                        <div className="text-xs font-bold text-gray-500 uppercase">Requested Amount</div>
                                    </div>
                                </div>
                            </div>

                            <div className="grid md:grid-cols-3 gap-6 py-4 border-t-2 border-b-2 border-black/10 bg-gray-50/50 -mx-6 px-6">
                                <div>
                                    <label className="text-xs font-black text-black uppercase tracking-wider">Land Size</label>
                                    <p className="text-lg font-bold text-gray-800">{loan.acres || loan.landSize} Acres</p>
                                </div>
                                <div>
                                    <label className="text-xs font-black text-black uppercase tracking-wider">Purpose</label>
                                    <p className="text-lg font-bold text-gray-800 capitalize">
                                        {loan.loanPurpose?.replace('-', ' ')}
                                    </p>
                                </div>
                                <div>
                                    <label className="text-xs font-black text-black uppercase tracking-wider">Tenure</label>
                                    <p className="text-lg font-bold text-gray-800">{loan.tenureMonths} Months</p>
                                </div>
                            </div>

                            {/* AI Fraud Analysis Section */}
                            <div className="mt-4 p-4 border-2 border-black rounded-lg bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                                <div className="flex items-center justify-between mb-3">
                                    <h4 className="text-sm font-black text-black uppercase flex items-center">
                                        <Shield className={`h-4 w-4 mr-2 ${loan.fraudRiskScore > 60 ? 'text-red-600' : loan.fraudRiskScore > 40 ? 'text-yellow-600' : 'text-green-600'}`} />
                                        AI Fraud Risk Assessment
                                    </h4>
                                    <div className="flex gap-2 items-center">
                                        <span className={`px-2 py-1 text-xs font-bold rounded border-2 border-black ${
                                            loan.fraudRiskScore >= 80 ? 'bg-red-200 text-red-800' :
                                            loan.fraudRiskScore >= 60 ? 'bg-orange-200 text-orange-800' :
                                            loan.fraudRiskScore >= 40 ? 'bg-yellow-200 text-yellow-800' :
                                            'bg-green-200 text-green-800'
                                        }`}>
                                            {loan.fraudRiskLevel || 'MEDIUM_RISK'}
                                        </span>
                                        <span className="text-lg font-black text-black bg-white px-3 py-1 rounded border-2 border-black">
                                            {loan.fraudRiskScore}/100
                                        </span>
                                    </div>
                                </div>
                                <div className="w-full bg-gray-200 border-2 border-black rounded-full h-3 overflow-hidden mb-3">
                                    <div 
                                        className={`h-full transition-all ${
                                            loan.fraudRiskScore >= 80 ? 'bg-red-500' :
                                            loan.fraudRiskScore >= 60 ? 'bg-orange-500' :
                                            loan.fraudRiskScore >= 40 ? 'bg-yellow-500' :
                                            'bg-green-500'
                                        }`}
                                        style={{ width: `${loan.fraudRiskScore}%` }}
                                    />
                                </div>
                                <p className="text-sm font-semibold text-gray-700 mb-3">
                                    <span className="font-bold text-black">Analysis: </span>
                                    {loan.fraudReason || "No detailed analysis available."}
                                </p>
                                {loan.fraudRiskFactors && loan.fraudRiskFactors.length > 0 && (
                                    <div className="mt-3 pt-3 border-t-2 border-black/10">
                                        <p className="text-xs font-bold text-black uppercase mb-2">Risk Factors:</p>
                                        <div className="space-y-2">
                                            {loan.fraudRiskFactors.map((factor, idx) => (
                                                <div key={idx} className="bg-gray-50 p-2 rounded border-l-4 border-black">
                                                    <p className="text-xs font-bold text-black">{factor.category}</p>
                                                    <p className="text-xs text-gray-700">{factor.description}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Eligibility Score Section */}
                            {loan.eligibilityScore !== null && (
                                <div className="mt-4 p-4 border-2 border-black rounded-lg bg-blue-50 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                                    <div className="flex items-center justify-between mb-3">
                                        <h4 className="text-sm font-black text-black uppercase flex items-center">
                                            <Zap className={`h-4 w-4 mr-2 ${loan.eligibilityScore >= 60 ? 'text-blue-600' : 'text-yellow-600'}`} />
                                            ML Eligibility Prediction
                                        </h4>
                                        <div className="flex gap-2 items-center">
                                            <span className={`px-3 py-1 text-xs font-bold rounded-full border-2 border-black ${
                                                loan.eligibilityScore >= 75 ? 'bg-green-200 text-green-800' :
                                                loan.eligibilityScore >= 60 ? 'bg-blue-200 text-blue-800' :
                                                loan.eligibilityScore >= 40 ? 'bg-yellow-200 text-yellow-800' :
                                                'bg-red-200 text-red-800'
                                            }`}>
                                                {loan.predictedEligible ? '✓ ELIGIBLE' : '✗ NOT ELIGIBLE'}
                                            </span>
                                            <span className="text-lg font-black text-black bg-white px-3 py-1 rounded border-2 border-black">
                                                {loan.eligibilityScore.toFixed(1)}%
                                            </span>
                                        </div>
                                    </div>
                                    <div className="w-full bg-gray-200 border-2 border-black rounded-full h-4 overflow-hidden mb-3">
                                        <div 
                                            className={`h-full transition-all ${
                                                loan.eligibilityScore >= 75 ? 'bg-green-500' :
                                                loan.eligibilityScore >= 60 ? 'bg-blue-500' :
                                                loan.eligibilityScore >= 40 ? 'bg-yellow-500' :
                                                'bg-red-500'
                                            }`}
                                            style={{ width: `${loan.eligibilityScore}%` }}
                                        />
                                    </div>
                                    <p className="text-sm font-semibold text-gray-700">
                                        <span className="font-bold text-black">Analysis: </span>
                                        {loan.eligibilityReasoning || "No detailed analysis available."}
                                    </p>
                                </div>
                            )}

                            {/* Blockchain & Disbursement Details (Only when APPROVED and available) */}
                            {loan.status === 'APPROVED' && loan.blockchainTxHash && (
                                <div className="mt-4 p-4 bg-green-50 border-2 border-black/10 rounded-lg">
                                    <h4 className="text-sm font-black text-black uppercase mb-3 flex items-center">
                                        <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
                                        Disbursement & Blockchain Details
                                    </h4>
                                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                                        <div>
                                            <span className="font-bold text-gray-500 block text-xs uppercase">Disbursed Amount</span>
                                            <span className="font-black text-xl text-green-700">₹{loan.disbursedAmount ? loan.disbursedAmount.toLocaleString('en-IN') : loan.requestedAmount.toLocaleString('en-IN')}</span>
                                        </div>
                                        <div>
                                            <span className="font-bold text-gray-500 block text-xs uppercase">NFT Token ID</span>
                                            <span className="font-mono font-bold bg-white px-2 py-1 border border-black rounded inline-block">#{loan.tokenId || 'N/A'}</span>
                                        </div>
                                        <div className="md:col-span-2">
                                            <span className="font-bold text-gray-500 block text-xs uppercase">Transaction Hash</span>
                                            <span className="font-mono text-xs break-all bg-gray-100 p-1 rounded block">{loan.blockchainTxHash}</span>
                                        </div>
                                        <div className="md:col-span-2">
                                            <span className="font-bold text-gray-500 block text-xs uppercase">Contract Address</span>
                                            <span className="font-mono text-xs break-all bg-gray-100 p-1 rounded block">{loan.smartContractAddress}</span>
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div className="mt-6 flex items-center justify-between gap-4">
                                <div className="hidden md:block text-sm font-bold text-gray-500">
                                    ID: {loan._id}
                                </div>

                                <div className="flex gap-3 w-full md:w-auto">
                                    {loan.status === 'PENDING' && (
                                        <>
                                            <button
                                                onClick={() => handleStatusUpdate(loan._id, 'REJECTED')}
                                                className="flex-1 md:flex-none flex items-center justify-center px-4 py-2 border-2 border-black bg-red-100 text-black rounded-lg hover:bg-red-200 font-bold transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-[2px] active:translate-y-[2px]"
                                            >
                                                <XCircle className="h-5 w-5 mr-2" />
                                                REJECT
                                            </button>
                                            <button
                                                onClick={() => handleStatusUpdate(loan._id, 'APPROVED')}
                                                className="flex-1 md:flex-none flex items-center justify-center px-4 py-2 border-2 border-black bg-green-400 text-black rounded-lg hover:bg-green-500 font-bold transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-[2px] active:translate-y-[2px]"
                                            >
                                                <CheckCircle className="h-5 w-5 mr-2" />
                                                APPROVE
                                            </button>
                                        </>
                                    )}
                                    <button
                                        onClick={() => handleDelete(loan._id)}
                                        className="p-2 border-2 border-black bg-white text-black hover:bg-red-50 hover:text-red-500 rounded-lg transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-[2px] active:translate-y-[2px]"
                                        title="Delete Request"
                                    >
                                        <Trash2 className="h-5 w-5" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                )
                }
            </div >
        </div >
    );
}
