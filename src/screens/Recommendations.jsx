import React, { useContext, useState } from 'react';
import { CheckCircle, ArrowRight, X, Terminal, Wrench, Info, TrendingDown } from 'lucide-react';
import { AppContext } from '../context/AppContext';

export default function Recommendations() {
  const { activeIssues, resolveIssue, totalSavings } = useContext(AppContext);
  const [selectedIssue, setSelectedIssue] = useState(null);

  const getSeverityBadge = (severity) => {
    const styles = {
      Critical: 'bg-rose-100 text-rose-700 border-rose-200',
      High: 'bg-orange-100 text-orange-700 border-orange-200',
      Medium: 'bg-amber-100 text-amber-700 border-amber-200',
    };
    return <span className={`px-2.5 py-1 rounded-md border text-[10px] font-bold uppercase tracking-wider ${styles[severity]}`}>{severity}</span>;
  };

  const handleFix = (id) => {
    resolveIssue(id);
    setSelectedIssue(null);
  };

  // SMART PRIORITY RANKING: Sorts by Impact (Risk) then by Cost (Savings)
  const rankedIssues = [...activeIssues].sort((a, b) => b.impact - a.impact || b.cost - a.cost);

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-800">Prioritized Recommendations</h1>
        <p className="text-slate-500 mt-1">Issues are ranked by our Smart Priority Engine based on security risk and cost impact.</p>
      </div>

      {rankedIssues.length === 0 ? (
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-16 text-center text-emerald-700">
          <CheckCircle size={56} className="mx-auto mb-4 text-emerald-500" />
          <h3 className="text-2xl font-bold">100% Compliant</h3>
          <p className="mt-2 text-emerald-600">All Trusted Advisor checks passed.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {rankedIssues.map((issue, index) => (
            <div key={issue.id} className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm flex flex-col md:flex-row gap-6 hover:border-blue-400 transition-colors relative overflow-hidden">
              
              {/* Priority Rank Number */}
              <div className="absolute top-0 left-0 bg-slate-800 text-white w-8 h-8 rounded-br-xl flex items-center justify-center font-bold text-sm shadow-sm">
                #{index + 1}
              </div>

              <div className="flex-1 pl-6">
                <div className="flex items-center gap-3 mb-2">
                  {getSeverityBadge(issue.severity)}
                  <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2 py-1 rounded uppercase tracking-wider">{issue.category}</span>
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">{issue.checkName}</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div className="bg-rose-50/50 p-4 rounded-lg border border-rose-100">
                    <h4 className="text-xs font-bold text-rose-800 uppercase flex items-center gap-1 mb-1"><Info size={14}/> Why it matters</h4>
                    <p className="text-sm text-slate-700 leading-relaxed">{issue.whyItMatters}</p>
                  </div>
                  <div className="bg-emerald-50/50 p-4 rounded-lg border border-emerald-100">
                    <h4 className="text-xs font-bold text-emerald-800 uppercase flex items-center gap-1 mb-1"><CheckCircle size={14}/> Best Practice</h4>
                    <p className="text-sm text-slate-700 leading-relaxed">{issue.bestPractice}</p>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col justify-center items-end gap-4 min-w-[200px] border-l border-slate-100 pl-6">
                <div className="text-right w-full">
                  <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">Affected Resource</p>
                  <p className="text-sm font-mono font-medium text-slate-700 bg-slate-50 px-2 py-1 rounded border border-slate-200 inline-block">
                    {issue.resourceId}
                  </p>
                </div>
                <button 
                  onClick={() => setSelectedIssue(issue)}
                  className="w-full bg-slate-900 hover:bg-blue-600 text-white font-bold py-3 px-5 rounded-lg flex items-center justify-center gap-2 transition-all">
                  <Wrench size={16} /> Simulate Fix
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* REMEDIATION & WHAT-IF MODAL */}
      {selectedIssue && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden">
            <div className="bg-slate-900 p-6 flex justify-between items-start text-white">
              <div>
                <h2 className="text-xl font-bold">{selectedIssue.checkName}</h2>
                <p className="text-slate-400 text-sm mt-1">Automated Resolution Simulator</p>
              </div>
              <button onClick={() => setSelectedIssue(null)} className="text-slate-400 hover:text-white transition-colors">
                <X size={24} />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* What-If Cost Simulator Component */}
              {selectedIssue.cost > 0 && (
                <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-xl p-5">
                  <h4 className="text-sm font-bold text-emerald-800 flex items-center gap-2 mb-3">
                    <TrendingDown size={18} /> "What If?" Cost Simulator
                  </h4>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-slate-500 font-medium">Current Monthly Waste</p>
                      <p className="text-lg font-bold text-slate-800 line-through decoration-rose-500 decoration-2">₹{totalSavings.toLocaleString()}</p>
                    </div>
                    <ArrowRight className="text-slate-400" />
                    <div className="text-right">
                      <p className="text-xs text-emerald-600 font-bold">New Monthly Waste</p>
                      <p className="text-2xl font-black text-emerald-600">₹{(totalSavings - selectedIssue.cost).toLocaleString()}</p>
                    </div>
                  </div>
                  <p className="text-xs text-emerald-700 mt-3 font-medium bg-emerald-100/50 inline-block px-2 py-1 rounded">
                    Fixing this saves you ₹{selectedIssue.cost}/month instantly.
                  </p>
                </div>
              )}

              {/* Terminal / Remediation Log */}
              <div>
                <h4 className="text-sm font-bold text-slate-700 mb-3 flex items-center gap-2">
                  <Terminal size={16} /> Remediation Runbook
                </h4>
                <div className="bg-slate-900 rounded-xl p-4 font-mono text-xs text-slate-300 space-y-2">
                  <p className="text-blue-400"># AWS CLI Execution initiated...</p>
                  <p>&gt; Target Resource: {selectedIssue.resourceId}</p>
                  <p>&gt; Applying best practice: {selectedIssue.bestPractice.substring(0, 40)}...</p>
                  <p className="text-amber-400"># Ready to apply changes to CloudGuardian account.</p>
                </div>
              </div>
            </div>

            <div className="p-6 bg-slate-50 border-t border-slate-200 flex justify-end gap-3">
              <button onClick={() => setSelectedIssue(null)} className="px-5 py-2.5 text-sm font-bold text-slate-600 hover:bg-slate-200 rounded-lg">
                Cancel
              </button>
              <button onClick={() => handleFix(selectedIssue.id)} className="px-5 py-2.5 text-sm font-bold bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center gap-2">
                Execute Fix <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}