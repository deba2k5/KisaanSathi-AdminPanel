// Converted Dashboard.js to plain React + TailwindCSS, removing ShadCN components
import React from 'react';
import { Link } from 'react-router-dom';
import {
  FileText,
  TrendingUp,
  CheckCircle,
  Clock,
  Users,
  MapPin,
  LogOut,
  Bell,
  PlusCircle,
  CreditCard
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { StatsCard } from '../components/Dashboard/StatsCard';
import { StatusBadge } from '../components/Dashboard/StatsBadge';

const agentStats = {
  totalSubmissions: 45,
  successfulSubmissions: 38,
  totalInsuranceAmount: 1575000,
  pendingClaims: 7,
  approvedClaims: 35,
  rejectedClaims: 3,
};

const adminStats = {
  totalAgents: 12,
  totalSubmissions: 487,
  totalInsuranceAmount: 15200000,
  pendingReviews: 23,
};

const recentActivity = [
  { id: 1, action: 'Claim submitted for Farmer Rajesh Kumar', time: '2 hours ago', status: 'approved' },
  { id: 2, action: 'New farmer request from Mysore District', time: '4 hours ago', status: 'in-progress' },
  { id: 3, action: 'Claim approved for Farmer Priya Devi', time: '1 day ago', status: 'rejected' },
];

export default function Dashboard() {
  const { user, logout, handleLogout } = useAuth();

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      notation: 'compact',
      maximumFractionDigits: 1,
    }).format(amount);
  };

  const renderQuickButton = (to, Icon, label, isNew = false) => {
    const target = label === 'Add New Farmer' ? '_blank' : '_self';

    return (
      <Link
        to={to}
        target={target === '_blank' ? '_blank' : undefined}
        rel={target === '_blank' ? "noopener noreferrer" : undefined}
        className="w-full text-left neo-button bg-white hover:bg-yellow-100 flex items-center justify-between font-bold text-black group border-2 border-black"
      >
        <span className="flex items-center">
          <Icon className="mr-3 h-5 w-5 group-hover:scale-110 transition-transform" />
          {label}
        </span>
        {isNew && <span className="bg-red-500 text-white text-[10px] px-2 py-0.5 rounded-full uppercase tracking-widest">New</span>}
      </Link>
    );
  };

  const renderAgentDashboard = () => (
    <div className="space-y-8 animate-in slide-in-from-bottom-5 duration-500">
      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <StatsCard title="Total Submissions" value={agentStats.totalSubmissions} description="Insurance claims filed" icon={FileText} trend={{ value: 12, isPositive: true }} color="bg-blue-200" />
        <StatsCard title="Success Rate" value={`${Math.round((agentStats.successfulSubmissions / agentStats.totalSubmissions) * 100)}%`} description="Claims approved" icon={CheckCircle} trend={{ value: 5, isPositive: true }} color="bg-green-200" />
        <StatsCard title="Total Insurance" value={formatCurrency(agentStats.totalInsuranceAmount)} description="Amount raised" icon={TrendingUp} trend={{ value: 8, isPositive: true }} color="bg-yellow-200" />
        <StatsCard title="Pending Claims" value={agentStats.pendingClaims} description="Awaiting review" icon={Clock} color="bg-orange-200" />
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {/* Quick Actions */}
        <div className="neo-box p-6 bg-white relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-yellow-300 rounded-bl-full -mr-4 -mt-4 border-l-2 border-b-2 border-black z-0"></div>
          <h3 className="text-xl font-black uppercase tracking-wider relative z-10">Quick Actions</h3>
          <p className="text-sm font-bold text-gray-500 mb-6 relative z-10">Common tasks for your daily workflow</p>
          <div className="space-y-4 relative z-10">
            {renderQuickButton(`/add-farmer`, PlusCircle, 'Add New Farmer')}
            {renderQuickButton('/all-farmers', FileText, 'Farmers under me')}
            {renderQuickButton('#', TrendingUp, 'View Submission History')}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="neo-box p-6 bg-white">
          <h3 className="text-xl font-black uppercase tracking-wider flex items-center gap-2">
            <Clock className="w-5 h-5" /> Recent Activity
          </h3>
          <p className="text-sm font-bold text-gray-500 mb-4">Your recent submissions and updates</p>
          <div className="space-y-0 divide-y-2 divide-black">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-center justify-between py-3 hover:bg-gray-50 px-2 transition-colors">
                <div>
                  <p className="text-sm font-bold">{activity.action}</p>
                  <p className="text-xs font-semibold text-gray-500">{activity.time}</p>
                </div>
                <StatusBadge status={activity.status} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderAdminDashboard = () => (
    <div className="space-y-8 my-4 animate-in slide-in-from-bottom-5 duration-500">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 my-4">
        <StatsCard title="Total Agents" value={adminStats.totalAgents} description="Active field agents" icon={Users} trend={{ value: 2, isPositive: true }} color="bg-purple-200" />
        <StatsCard title="Total Submissions" value={adminStats.totalSubmissions} description="Across all agents" icon={FileText} trend={{ value: 15, isPositive: true }} color="bg-pink-200" />
        <StatsCard title="Total Insurance" value={formatCurrency(adminStats.totalInsuranceAmount)} description="Amount processed" icon={TrendingUp} trend={{ value: 23, isPositive: true }} color="bg-emerald-200" />
        <StatsCard title="Pending Reviews" value={adminStats.pendingReviews} description="Awaiting approval" icon={Clock} color="bg-red-200" />
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <div className="neo-box p-8 bg-white">
          <h3 className="text-xl font-black uppercase tracking-wider mb-2">Admin Actions</h3>
          <p className="text-sm font-bold text-gray-500 mb-6">Management and oversight tools</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {renderQuickButton('/add-kiosk', Users, 'Add Agent')}
            {renderQuickButton('/all-kiosks', FileText, 'All Kiosks')}
            {renderQuickButton('/loan-requests', CreditCard, 'Loan Requests')}
            {renderQuickButton('#', TrendingUp, 'Reports')}
            {renderQuickButton('/insurance-policies', FileText, 'Policies', true)} {/* New Link */}
          </div>
        </div>

        <div className="neo-box p-8 bg-stone-100">
          <h3 className="text-lg font-black uppercase tracking-wider">System Overview</h3>
          <p className="text-md font-bold text-gray-500 mb-4">Platform health and metrics</p>
          <div className="flex flex-col flex-1 space-y-4">
            <div className="flex items-center justify-between p-3 bg-white border-2 border-black rounded-lg shadow-sm">
              <span className="text-sm font-bold">Active Agents</span>
              <div className="flex items-center gap-2">
                <strong className="text-lg">{adminStats.totalAgents - 4}</strong>
                <StatusBadge status="approved" />
              </div>
            </div>
            <div className="flex items-center justify-between p-3 bg-white border-2 border-black rounded-lg shadow-sm">
              <span className="text-sm font-bold">Total Amount</span>
              <div className="flex items-center gap-2">
                <strong className="text-lg">{formatCurrency(adminStats.totalInsuranceAmount)}</strong>
                <StatusBadge status="approved" />
              </div>
            </div>
            <div className="flex items-center justify-between p-3 bg-white border-2 border-black rounded-lg shadow-sm">
              <span className="text-sm font-bold">Pending Approvals</span>
              <div className="flex items-center gap-2">
                <strong className="text-lg">{adminStats.pendingReviews}</strong>
                <StatusBadge status="pending" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-yellow-50 font-sans">
      {/* Neo-Header */}
      <header className="border-b-4 border-black bg-white sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="h-12 w-12 bg-black text-white rounded-lg border-2 border-transparent flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(255,200,0,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all">
                <FileText className="h-6 w-6" />
              </div>
              <div>
                <h1 className="text-2xl font-black uppercase tracking-tighter text-black">
                  AgroSure <span className="text-yellow-500">Admin</span>
                </h1>
                <p className="text-xs font-bold bg-black text-white px-2 py-0.5 inline-block rounded-sm uppercase tracking-widest">
                  {user?.role === 'admin' ? 'Commander Mode' : 'Field Agent'}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-6">
              <button className='neo-button bg-white hover:bg-yellow-200 flex items-center justify-center !p-2 rounded-full aspect-square'>
                <Bell className="h-5 w-5" />
              </button>

              <div className="flex items-center gap-3 pl-6 border-l-4 border-black">
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-black text-black">{user?.name}</p>
                  <p className="text-xs font-bold text-gray-500">
                    {user?.jurisdiction || user?.role}
                  </p>
                </div>
                <button
                  onClick={handleLogout}
                  className="neo-button bg-red-500 text-white hover:bg-red-600 !px-3 !py-2 flex items-center gap-2"
                >
                  <span className="hidden sm:inline">Logout</span>
                  <LogOut className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        <div className="mb-10 bg-blue-600 text-white p-6 rounded-xl border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-3xl font-black uppercase italic tracking-tighter">
              Welcome back, {user?.name}
            </h2>
            <p className="text-blue-100 font-medium mt-1 text-lg">
              {user?.role === 'admin'
                ? 'System Status: All Systems Operational'
                : `Region: ${user?.jurisdiction || 'Assigned Area'}`}
            </p>
            {user?.location && (
              <div className="flex items-center mt-4 text-sm font-bold bg-black/20 w-fit px-3 py-1 rounded-full backdrop-blur-sm">
                <MapPin className="h-4 w-4 mr-2" />
                {user.location}
              </div>
            )}
          </div>
          <MapPin className="absolute -bottom-8 -right-8 w-64 h-64 text-blue-500/50 rotate-12" />
        </div>

        {user?.role === 'admin' ? renderAdminDashboard() : renderAgentDashboard()}
      </main>
    </div>
  );
}
