
import React, { useState, useEffect } from 'react';
import ComplianceScore from './ComplianceScore';
import DataInsights from './DataInsights';
import FileUpload from '../upload/FileUpload';
import Reports from '../reports/Reports';
import { toast } from 'sonner';

const Dashboard = () => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  
  const insightsData = [
    { category: 'Privacy', issues: 12, color: '#0ea5e9' },
    { category: 'Data Bias', issues: 8, color: '#f59e0b' },
    { category: 'Integrity', issues: 5, color: '#10b981' },
    { category: 'Security', issues: 15, color: '#ef4444' },
    { category: 'Compliance', issues: 10, color: '#8b5cf6' },
  ];
  
  const handleFileUpload = (file: File) => {
    setFile(file);
    setLoading(true);
    
    // Simulate analysis process
    setTimeout(() => {
      setLoading(false);
      setAnalysisComplete(true);
      toast.success('Analysis complete!', {
        description: 'Your data has been processed and evaluated.'
      });
    }, 3000);
  };
  
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div>
          <h1 className="heading-lg mb-2">Data Compliance Dashboard</h1>
          <p className="text-gray-600">Upload a file or connect to an API to analyze your data for compliance and ethical standards.</p>
        </div>
        <div className="flex justify-end items-center">
          {analysisComplete && (
            <button 
              type="button"
              className="btn-primary"
              onClick={() => {
                setFile(null);
                setAnalysisComplete(false);
              }}
            >
              New Analysis
            </button>
          )}
        </div>
      </div>
      
      <div className="space-y-8">
        {!analysisComplete && (
          <div className="glass-card p-6" id="upload">
            <h2 className="text-xl font-medium mb-4">Analyze Your Data</h2>
            <FileUpload onFileUpload={handleFileUpload} />
          </div>
        )}
        
        {(loading || analysisComplete) && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <ComplianceScore score={78} loading={loading} />
            <DataInsights data={insightsData} loading={loading} />
          </div>
        )}
        
        {(loading || analysisComplete) && (
          <Reports loading={loading} />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
