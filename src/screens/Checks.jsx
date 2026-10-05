import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { AlertCircle, ArrowRight } from 'lucide-react';

export default function Checks() {
  const { activeIssues } = useContext(AppContext);
  const navigate = useNavigate();

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800">Trusted Advisor Checks</h1>
        <p className="text-slate-500 mt-1">Review the specific rules and best practices your infrastructure is evaluated against.</p>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Check Name</th>
              <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Category</th>
              <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
              <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-wider">Potential Savings</th>
              <th className="py-4 px-6"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {activeIssues.map(check => (
              <tr key={check.id} className="hover:bg-slate-50 transition-colors">
                <td className="py-4 px-6">
                  <p className="font-bold text-slate-800">{check.checkName}</p>
                  <p className="text-xs text-slate-500 mt-1 truncate max-w-md">{check.description}</p>
                </td>
                <td className="py-4 px-6">
                  <span className="text-xs font-bold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-md">{check.category}</span>
                </td>
                <td className="py-4 px-6">
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold border
                    ${check.severity === 'Critical' ? 'bg-rose-50 text-rose-700 border-rose-200' : 
                      check.severity === 'High' ? 'bg-orange-50 text-orange-700 border-orange-200' : 
                      'bg-amber-50 text-amber-700 border-amber-200'}`}>
                    <AlertCircle size={14} /> {check.severity === 'Critical' ? 'Action Required' : 'Warning'}
                  </span>
                </td>
                <td className="py-4 px-6 text-sm font-bold text-slate-700">
                  {check.cost > 0 ? `₹${check.cost}/mo` : '-'}
                </td>
                <td className="py-4 px-6 text-right">
                  <button 
                    onClick={() => navigate('/recommendations')}
                    className="text-blue-600 hover:text-blue-800 text-sm font-bold flex items-center justify-end gap-1"
                  >
                    View Details <ArrowRight size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}