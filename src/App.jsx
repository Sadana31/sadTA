import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './screens/Dashboard';
import Checks from './screens/Checks'; // Replaced Inventory with Checks
import Recommendations from './screens/Recommendations';
import { AppContext, INITIAL_CHECKS } from './context/AppContext';

export default function App() {
  // Initialize state using the new INITIAL_CHECKS
  const [issues, setIssues] = useState(INITIAL_CHECKS);
  
  // Dynamic derived state based on open issues
  const activeIssues = issues.filter(i => i.status === 'open');
  const healthScore = Math.max(0, 100 - activeIssues.reduce((sum, issue) => sum + issue.impact, 0));
  const totalSavings = activeIssues.reduce((sum, issue) => sum + issue.cost, 0);

  // Remediation function (Simulate Fix)
  const resolveIssue = (id) => {
    setIssues(issues.map(issue => issue.id === id ? { ...issue, status: 'resolved' } : issue));
  };

  return (
    <AppContext.Provider value={{ 
      issues, 
      activeIssues, 
      healthScore, 
      totalSavings, 
      resolveIssue 
    }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="checks" element={<Checks />} />
            <Route path="recommendations" element={<Recommendations />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AppContext.Provider>
  );
}