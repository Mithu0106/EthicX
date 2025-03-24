
import React from 'react';
import { FileText, Download, FileCheck } from 'lucide-react';

interface ReportsProps {
  loading?: boolean;
}

const Reports: React.FC<ReportsProps> = ({ loading = false }) => {
  const reports = [
    {
      id: 1,
      name: 'Compliance Report',
      description: 'Complete analysis of data compliance with regulatory standards',
      date: 'August 25, 2023',
      type: 'PDF',
      size: '2.4 MB'
    },
    {
      id: 2,
      name: 'Data Integrity Report',
      description: 'Assessment of data quality, completeness, and accuracy',
      date: 'August 25, 2023',
      type: 'XLSX',
      size: '1.8 MB'
    },
    {
      id: 3,
      name: 'Bias Detection Report',
      description: 'Analysis of potential bias patterns in the dataset',
      date: 'August 25, 2023',
      type: 'CSV',
      size: '956 KB'
    }
  ];
  
  const handleDownload = (reportId: number) => {
    console.log(`Downloading report ${reportId}`);
    // In a real app, this would trigger a download
  };
  
  return (
    <div className="glass-card p-6" id="reports">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <FileCheck className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-medium">Reports</h3>
        </div>
        <button 
          type="button"
          className="btn-secondary inline-flex items-center text-xs"
        >
          <FileText className="h-3.5 w-3.5 mr-1.5" />
          Generate New Report
        </button>
      </div>
      
      {loading ? (
        <div className="flex flex-col items-center justify-center py-8">
          <div className="w-32 h-32 rounded-full border-4 border-gray-200 border-t-primary animate-spin"></div>
          <p className="mt-4 text-sm text-gray-500">Generating reports...</p>
        </div>
      ) : (
        <div className="space-y-4">
          {reports.map((report) => (
            <div 
              key={report.id}
              className="p-4 border rounded-lg bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all hover:shadow-md"
            >
              <div className="flex-1">
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-md bg-blue-100">
                    <FileText className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium">{report.name}</h4>
                    <p className="text-sm text-gray-500">{report.description}</p>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-4">
                <div className="text-right">
                  <p className="text-xs text-gray-500">{report.date}</p>
                  <p className="text-xs font-medium">{report.type} • {report.size}</p>
                </div>
                
                <button
                  type="button"
                  className="p-2 rounded-full bg-gray-100 hover:bg-primary/10 text-gray-700 hover:text-primary transition-colors"
                  onClick={() => handleDownload(report.id)}
                >
                  <Download className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Reports;
