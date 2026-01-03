// Login.js - Plain React + TailwindCSS without ShadCN components
import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { showToast } from '../context/notifContext';
import { showError } from '../context/notifContext';
import { Sprout, Mail, Lock } from 'lucide-react';
import { GoogleIcon } from '../utils/icons';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, isLoading, handleGoogleLogin, handleLogout, checkCookies } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = async () => {
      const result = await checkCookies();
      if (result === 1) {
        showToast({
          success: 'Welcome back Admin!',
        });
        navigate('/dashboard');
      }
    };
    checkUser();
  }, []);


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      showToast({
        success: 'Login successful',
        description: 'Welcome to the Crop Insurance Admin Panel',
      });
    } catch (error) {
      showError({
        err: 'Login failed',
        description: 'Please check your credentials and try again',
        variant: 'destructive',
      });
    }
  };

  const handleGoogleSubmit = async (e) => {
    e.preventDefault();
    try {
      await handleGoogleLogin();
      console.log('Google login successful');
      showToast({
        success: 'Login successful',
        description: 'Welcome to the Crop Insurance Admin Panel',
      });
    } catch (error) {
      showError({
        err: 'Login failed',
        description: 'Please try again later',
        variant: 'destructive',
      });
    }

  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-yellow-50 p-4 font-mono">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="h-20 w-20 bg-green-400 border-2 border-black rounded-xl flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <Sprout className="h-10 w-10 text-black" />
            </div>
          </div>
          <div>
            <h1 className="text-4xl font-black text-black uppercase tracking-tighter">AgroSure</h1>
            <p className="text-gray-600 font-bold uppercase tracking-wider mt-2">Admin Portal</p>
          </div>
        </div>

        <div className="neo-box p-8 border-2 border-black bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <div className="mb-6 pb-6 border-b-2 border-dashed border-gray-200">
            <h2 className="text-2xl font-bold text-black uppercase">Sign In</h2>
            <p className="text-sm font-medium text-gray-500 mt-1">
              Enter your credentials to access the panel
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-bold uppercase tracking-wider">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  id="email"
                  type="email"
                  placeholder="admin@agrosure.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="neo-input pl-10"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-bold uppercase tracking-wider">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="neo-input pl-10"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full neo-button bg-black text-white hover:bg-gray-800 hover:text-white border-black font-bold py-3 mt-4 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? 'AUTHENTICATING...' : 'ACCESS DASHBOARD'}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t-2 border-black/10">
            <button
              onClick={handleGoogleSubmit}
              className="w-full neo-button bg-white text-black hover:bg-yellow-100 flex items-center justify-center gap-3 py-3"
            >
              <GoogleIcon className="w-5 h-5" />
              <span>Sign in with Google</span>
            </button>
          </div>
        </div>

        <div className="text-center text-xs font-bold text-gray-400 uppercase tracking-widest">
          Secured by AgroSure Enterprise
        </div>
      </div>
    </div>
  );
}
