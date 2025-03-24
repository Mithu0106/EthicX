
import React from 'react';
import { BarChart, XAxis, YAxis, Bar, ResponsiveContainer, Tooltip, Cell } from 'recharts';
import { BarChart3, AlertTriangle } from 'lucide-react';
import {
  Tooltip as UITooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface DataInsightsProps {
  data: {
    category: string;
    issues: number;
    color: string;
  }[];
  loading?: boolean;
}

const DataInsights: React.FC<DataInsightsProps> = ({ data, loading = false }) => {
  const issues = [
    { title: 'Missing Data', count: 23, severity: 'medium' },
    { title: 'Potential Bias', count: 8, severity: 'high' },
    { title: 'Outdated Information', count: 12, severity: 'low' },
  ];
  
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'medium':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'low':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };
  
  return (
    <div className="glass-card p-6">
      <div className="flex items-center space-x-2 mb-4">
        <BarChart3 className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-medium">Data Insights</h3>
      </div>
      
      {loading ? (
        <div className="flex flex-col items-center justify-center py-8">
          <div className="w-32 h-32 rounded-full border-4 border-gray-200 border-t-primary animate-spin"></div>
          <p className="mt-4 text-sm text-gray-500">Analyzing data patterns...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-sm font-medium text-gray-500 mb-3">Compliance Issues by Category</h4>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data} barGap={4}>
                  <XAxis 
                    dataKey="category" 
                    tick={{ fontSize: 12 }} 
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis 
                    tick={{ fontSize: 12 }} 
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip 
                    cursor={{ fill: 'rgba(236, 240, 244, 0.5)' }}
                    contentStyle={{
                      borderRadius: '0.5rem',
                      border: '1px solid #e2e8f0',
                      boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                    }}
                  />
                  <Bar dataKey="issues" radius={[4, 4, 0, 0]}>
                    {data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-medium text-gray-500 mb-3">Top Compliance Issues</h4>
            <div className="space-y-3">
              {issues.map((issue, idx) => (
                <UITooltip key={idx}>
                  <TooltipTrigger asChild>
                    <div 
                      className="flex items-center justify-between p-3 border rounded-lg bg-white cursor-pointer hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`p-1.5 rounded-full ${getSeverityColor(issue.severity)}`}>
                          <AlertTriangle className="h-3.5 w-3.5" />
                        </div>
                        <span className="text-sm font-medium">{issue.title}</span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-sm font-bold">{issue.count}</span>
                        <span className="text-xs text-gray-500 ml-1">issues</span>
                      </div>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent side="right">
                    <p>{issue.title}: {issue.severity} severity</p>
                  </TooltipContent>
                </UITooltip>
              ))}
              
              <button 
                type="button"
                className="w-full text-sm text-primary hover:text-primary/80 font-medium mt-2"
              >
                View All Issues
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataInsights;
