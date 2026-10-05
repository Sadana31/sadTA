import React, { useContext } from 'react';
import { AlertTriangle, CheckCircle } from 'lucide-react';
import { AppContext } from '../context/AppContext';

export default function Inventory() {
  const { INITIAL_RESOURCES, activeIssues } = useContext(AppContext);

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800">Resource Inventory</h1>
        <p className="text-slate-500 mt-1">Status of all simulated cloud assets.</p>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              <th className="py-4 px-6 text-sm font-semibold text-slate-600">Resource ID</th>
              <th className="py-4 px-6 text-sm font-semibold text-slate-600">Type</th>
              <th className="py-4 px-6 text-sm font-semibold text-slate-600">Region</th>
              <th className="py-4 px-6 text-sm font-semibold text-slate-600">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {INITIAL_RESOURCES.map(resource => {
              const issue = activeIssues.find(i => i.resourceId === resource.id);
              return (
                <tr key={resource.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-4 px-6 font-mono text-sm text-slate-800 font-medium">{resource.id}</td>
                  <td className="py-4 px-6 text-sm text-slate-600">{resource.type}</td>
                  <td className="py-4 px-6 text-sm text-slate-600">{resource.region}</td>
                  <td className="py-4 px-6">
                    {issue ? (
                      <span className="inline-flex items-center gap-1.5 bg-rose-50 text-rose-700 px-2.5 py-1 rounded-md text-xs font-bold border border-rose-100">
                        <AlertTriangle size={14} /> Attention Needed
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-md text-xs font-bold border border-emerald-100">
                        <CheckCircle size={14} /> Compliant
                      </span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}