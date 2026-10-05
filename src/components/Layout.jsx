import React, { useContext } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Activity } from 'lucide-react';
import Sidebar from './Sidebar';
import { AppContext } from '../context/AppContext';

export default function Layout() {
  const location = useLocation();
  const { healthScore } = useContext(AppContext);

  return (
    <div className="flex h-screen bg-slate-50 font-sans text-slate-900">
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-700 capitalize">
            {location.pathname === '/' ? 'Overview Dashboard' : location.pathname.substring(1).replace('-', ' ')}
          </h2>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-slate-100 px-3 py-1.5 rounded-full">
              <Activity size={16} className={healthScore > 80 ? 'text-emerald-500' : healthScore > 50 ? 'text-amber-500' : 'text-rose-500'} />
              <span className="text-sm font-bold text-slate-700">Score: {healthScore}/100</span>
            </div>
            <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
              AD
            </div>
          </div>
        </header>

        {/* Dynamic Page Content */}
        <main className="flex-1 overflow-y-auto p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}