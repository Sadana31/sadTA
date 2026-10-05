import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  DollarSign, Shield, Zap, Server, Activity, Download, 
  AlertTriangle, XOctagon, CheckCircle2, Clock, Globe, 
  Database, ArrowRight, ArrowUpRight
} from 'lucide-react';
import { AppContext, MOCK_PASSED_CHECKS } from '../context/AppContext';

export default function Dashboard() {
  const { healthScore, activeIssues, totalSavings } = useContext(AppContext);
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState('');

  // Simulate a "Last Scanned" time that is always recent
  useEffect(() => {
    const time = new Date();
    time.setMinutes(time.getMinutes() - 2);
    setCurrentTime(time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
  }, []);

  const criticalCount = activeIssues.filter(i => i.severity === 'Critical').length;
  const warningCount = activeIssues.filter(i => ['High', 'Medium'].includes(i.severity)).length;
  
  // Get top 2 highest impact issues for the Priority Widget
  const topPriorities = [...activeIssues].sort((a, b) => b.impact - a.impact).slice(0, 2);

  const categories = [
    { name: 'Cost Optimization', icon: DollarSign, color: 'text-emerald-500', bg: 'bg-emerald-50' },
    { name: 'Security', icon: Shield, color: 'text-rose-500', bg: 'bg-rose-50' },
    { name: 'Performance', icon: Zap, color: 'text-blue-500', bg: 'bg-blue-50' },
    { name: 'Fault Tolerance', icon: Server, color: 'text-amber-500', bg: 'bg-amber-50' },
    { name: 'Service Limits', icon: Activity, color: 'text-indigo-500', bg: 'bg-indigo-50' },
  ];

  const handleDownloadReport = () => {
    window.print();
  };

  const healthColor = healthScore > 80 ? '#10b981' : healthScore > 50 ? '#f59e0b' : '#f43f5e';

  return (
    <div className="space-y-6 max-w-7xl mx-auto print:bg-white print:p-0">
      
      {/* HEADER */}
      <div className="flex justify-between items-end mb-6 print:hidden">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">AWS Trusted Advisor</h1>
          <p className="text-slate-500">CloudGuardian Account Health Summary</p>
        </div>
        <button onClick={handleDownloadReport} className="bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 px-4 py-2.5 rounded-lg flex items-center gap-2 font-semibold shadow-sm transition-colors text-sm">
          <Download size={16} /> Download Audit Report
        </button>
      </div>

      {/* ROW 1: HERO METRICS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Score Card */}
        <div className="md:col-span-2 bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-8 text-white shadow-lg relative overflow-hidden flex flex-col justify-between">
          <div className="absolute -right-10 -top-10 opacity-10">
            <Activity size={200} />
          </div>
          <div className="relative z-10 flex justify-between items-start">
            <div>
              <p className="text-slate-400 font-bold uppercase tracking-widest text-xs mb-2">Overall Health Score</p>
              <div className="text-6xl font-black" style={{ color: healthColor }}>
                {healthScore}<span className="text-2xl text-slate-500">/100</span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-emerald-400 font-bold uppercase tracking-wider text-xs mb-2">Total Est. Savings</p>
              <p className="text-3xl font-bold">₹{totalSavings.toLocaleString()}</p>
              <p className="text-xs text-slate-400 mt-1">Per month</p>
            </div>
          </div>
          
          <div className="w-full bg-slate-800/50 rounded-full h-2 mt-6 relative z-10 overflow-hidden">
            <div 
              className="h-full rounded-full transition-all duration-1000"
              style={{ width: `${healthScore}%`, backgroundColor: healthColor }}
            ></div>
          </div>
        </div>

        {/* Counts */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col justify-center relative group cursor-pointer hover:border-rose-300 transition-colors" onClick={() => navigate('/checks')}>
          <div className="flex items-center gap-2 text-rose-600 mb-4">
            <XOctagon size={20} /> <span className="font-bold text-sm uppercase tracking-wide">Critical</span>
          </div>
          <p className="text-5xl font-black text-slate-800">{criticalCount}</p>
          <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
            <ArrowUpRight size={20} className="text-slate-400" />
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col justify-center relative group cursor-pointer hover:border-amber-300 transition-colors" onClick={() => navigate('/checks')}>
          <div className="flex items-center gap-2 text-amber-500 mb-4">
            <AlertTriangle size={20} /> <span className="font-bold text-sm uppercase tracking-wide">Warnings</span>
          </div>
          <p className="text-5xl font-black text-slate-800">{warningCount}</p>
          <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
            <ArrowUpRight size={20} className="text-slate-400" />
          </div>
        </div>
      </div>

      {/* ROW 2: ADVANCED WIDGETS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* WIDGET 1: Pillar Health Breakdown (Takes up 2 columns) */}
        <div className="md:col-span-2 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-slate-800">Pillar Health Breakdown</h3>
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-md flex items-center gap-1 border border-emerald-200">
              <CheckCircle2 size={14} /> {MOCK_PASSED_CHECKS} Checks Passed
            </span>
          </div>
          
          <div className="space-y-5">
            {categories.map(cat => {
              const issuesInCat = activeIssues.filter(i => i.category === cat.name);
              const count = issuesInCat.length;
              // Mock math: if 0 issues, 100% health. If 1, 60%. If 2+, 20%.
              const pillarHealth = count === 0 ? 100 : count === 1 ? 60 : 20;
              const barColor = count === 0 ? 'bg-emerald-500' : count === 1 ? 'bg-amber-500' : 'bg-rose-500';

              return (
                <div key={cat.name} className="flex items-center gap-4">
                  <div className={`p-2.5 rounded-lg ${cat.bg} ${cat.color}`}>
                    <cat.icon size={20} />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-bold text-slate-700">{cat.name}</span>
                      <span className={`font-bold ${count > 0 ? 'text-rose-600' : 'text-emerald-600'}`}>
                        {count === 0 ? 'Healthy' : `${count} Issue${count > 1 ? 's' : ''}`}
                      </span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2">
                      <div className={`${barColor} h-2 rounded-full transition-all duration-500`} style={{ width: `${pillarHealth}%` }}></div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* SIDE COLUMN: Telemetry & Actions */}
        <div className="space-y-6">
          
          {/* WIDGET 2: Scan Telemetry */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 shadow-inner">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Scan Telemetry</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-slate-600 font-medium">
                  <Clock size={16} className="text-blue-500"/> Last Scanned
                </div>
                <span className="text-sm font-bold text-slate-800">Today, {currentTime}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-slate-600 font-medium">
                  <Database size={16} className="text-blue-500"/> Resources Analyzed
                </div>
                <span className="text-sm font-bold text-slate-800">142</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-slate-600 font-medium">
                  <Globe size={16} className="text-blue-500"/> Active Regions
                </div>
                <span className="text-sm font-bold text-slate-800">3 (Global)</span>
              </div>
            </div>
          </div>

          {/* WIDGET 3: Top Priorities List */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Top Priorities</h3>
            
            {topPriorities.length === 0 ? (
              <div className="text-center py-4 text-slate-500 text-sm">No action required.</div>
            ) : (
              <div className="space-y-3">
                {topPriorities.map(issue => (
                  <div key={issue.id} className="p-3 bg-slate-50 border border-slate-100 rounded-xl hover:border-blue-300 transition-colors cursor-pointer group" onClick={() => navigate('/recommendations')}>
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`w-2 h-2 rounded-full ${issue.severity === 'Critical' ? 'bg-rose-500' : 'bg-orange-500'} animate-pulse`}></span>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">{issue.category}</span>
                    </div>
                    <p className="text-sm font-bold text-slate-800 truncate">{issue.checkName}</p>
                  </div>
                ))}
                
                <button 
                  onClick={() => navigate('/recommendations')}
                  className="w-full mt-2 py-2 flex items-center justify-center gap-2 text-sm font-bold text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
                >
                  View All Actions <ArrowRight size={16} />
                </button>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}