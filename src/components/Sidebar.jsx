import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, ListChecks, Server, Activity, Menu, X } from 'lucide-react';

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();

  // src/components/Sidebar.jsx (Navigation part)
const navItems = [
  { name: 'Dashboard', path: '/', icon: LayoutDashboard },
  { name: 'TA Checks', path: '/checks', icon: Server },
  { name: 'Recommendations', path: '/recommendations', icon: ListChecks },
];

  return (
    <aside className={`${isCollapsed ? 'w-20' : 'w-64'} bg-slate-900 text-slate-300 flex flex-col transition-all duration-300 relative z-20`}>
      {/* Header & Hamburger */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-slate-800">
        {!isCollapsed && (
          <div className="text-xl font-bold text-white flex items-center gap-2 overflow-hidden whitespace-nowrap">
            <Activity className="text-blue-500 min-w-max" />
            <span>sad<span className="text-blue-500">TA</span></span>
          </div>
        )}
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className={`p-2 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white ${isCollapsed ? 'mx-auto' : ''}`}
        >
          {isCollapsed ? <Menu size={24} /> : <X size={24} />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-6 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <Link 
              key={item.path} 
              to={item.path} 
              title={isCollapsed ? item.name : ''}
              className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-colors ${isActive ? 'bg-blue-600 text-white' : 'hover:bg-slate-800 hover:text-white'} ${isCollapsed ? 'justify-center' : ''}`}
            >
              <Icon size={20} className="min-w-max" />
              {!isCollapsed && <span className="font-medium whitespace-nowrap">{item.name}</span>}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}