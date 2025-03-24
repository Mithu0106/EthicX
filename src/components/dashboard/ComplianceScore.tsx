
import React from 'react';
import { Progress } from '@/components/ui/progress';
import { Shield, AlertCircle, CheckCircle } from 'lucide-react';

interface ComplianceScoreProps {
  score: number;
  loading?: boolean;
}

const ComplianceScore: React.FC<ComplianceScoreProps> = ({ score, loading = false }) => {
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-500';
    if (score >= 60) return 'text-amber-500';
    return 'text-red-500';
  };

  const getScoreBackground = (score: number) => {
    if (score >= 80) return 'bg-green-500';
    if (score >= 60) return 'bg-amber-500';
    return 'bg-red-500';
  };
  
  const getScoreMessage = (score: number) => {
    if (score >= 80) return 'High Compliance';
    if (score >= 60) return 'Moderate Compliance';
    return 'Low Compliance';
  };
  
  const getScoreIcon = (score: number) => {
    if (score >= 80) return <CheckCircle className="h-5 w-5 text-green-500" />;
    if (score >= 60) return <AlertCircle className="h-5 w-5 text-amber-500" />;
    return <AlertCircle className="h-5 w-5 text-red-500" />;
  };
  
  return (
    <div className="glass-card p-6">
      <div className="flex items-center space-x-2 mb-4">
        <Shield className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-medium">Compliance Score</h3>
      </div>
      
      {loading ? (
        <div className="flex flex-col items-center justify-center py-8">
          <div className="w-32 h-32 rounded-full border-4 border-gray-200 border-t-primary animate-spin"></div>
          <p className="mt-4 text-sm text-gray-500">Calculating compliance score...</p>
        </div>
      ) : (
        <>
          <div className="flex justify-between items-end mb-2">
            <div>
              <p className="text-sm text-gray-500">Overall Score</p>
              <div className="flex items-baseline">
                <span className={`text-5xl font-bold ${getScoreColor(score)}`}>
                  {score}
                </span>
                <span className="text-gray-500 ml-1">/100</span>
              </div>
            </div>
            <div className="flex items-center space-x-2 px-3 py-1 rounded-full bg-gray-100">
              {getScoreIcon(score)}
              <span className="text-sm font-medium">{getScoreMessage(score)}</span>
            </div>
          </div>
          
          <Progress 
            value={score} 
            className="h-2 mt-2"
            indicatorClassName={getScoreBackground(score)}
          />
          
          <div className="grid grid-cols-3 gap-4 mt-8">
            {[
              { label: 'Data Bias', score: Math.min(100, score + 5) },
              { label: 'Regulatory', score: Math.max(0, score - 8) },
              { label: 'Integrity', score: Math.min(100, score + 3) }
            ].map((category, idx) => (
              <div key={category.label} className="text-center">
                <p className="text-xs text-gray-500 mb-1">{category.label}</p>
                <div className="relative h-1.5 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className={`absolute top-0 left-0 h-full ${getScoreBackground(category.score)}`}
                    style={{ width: `${category.score}%` }}
                  ></div>
                </div>
                <p className="mt-1 text-xs font-medium">{category.score}</p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ComplianceScore;
