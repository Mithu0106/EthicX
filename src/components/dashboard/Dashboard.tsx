
import React, { useState, useEffect } from 'react';
import ComplianceScore from './ComplianceScore';
import DataInsights from './DataInsights';
import FileUpload from '../upload/FileUpload';
import Reports from '../reports/Reports';
import { toast } from 'sonner';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CheckCircle } from 'lucide-react';

const Dashboard = () => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [evaluationType, setEvaluationType] = useState("custom");
  const [geography, setGeography] = useState("global");
  
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

  const geographyOptions = [
    { value: "global", label: "Global Standards" },
    { value: "eu", label: "European Union (GDPR, AI Act)" },
    { value: "us", label: "United States" },
    { value: "uk", label: "United Kingdom" },
    { value: "canada", label: "Canada" },
    { value: "australia", label: "Australia" },
    { value: "japan", label: "Japan" },
    { value: "china", label: "China" },
    { value: "india", label: "India" },
    { value: "brazil", label: "Brazil" },
  ];

  const prebuiltEvaluations = [
    { id: "general", name: "General AI Compliance" },
    { id: "healthcare", name: "Healthcare AI" },
    { id: "finance", name: "Financial Services AI" },
    { id: "education", name: "Educational AI" },
    { id: "hr", name: "HR & Recruitment AI" },
    { id: "marketing", name: "Marketing & Customer AI" },
  ];
  
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div>
          <h1 className="heading-lg mb-2">AI Compliance Dashboard</h1>
          <p className="text-gray-600">Evaluate your AI systems for compliance and ethical standards based on deployment geography and industry requirements.</p>
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
              New Evaluation
            </button>
          )}
        </div>
      </div>
      
      <div className="space-y-8">
        {!analysisComplete && (
          <Tabs defaultValue="custom" onValueChange={setEvaluationType}>
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="custom">Custom Evaluation</TabsTrigger>
              <TabsTrigger value="prebuilt">Pre-built Evaluations</TabsTrigger>
            </TabsList>
            
            <TabsContent value="custom">
              <Card>
                <CardHeader>
                  <CardTitle>Custom AI Evaluation</CardTitle>
                  <CardDescription>
                    Upload your AI system data and select applicable geographic regulations
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Deployment Geography
                    </label>
                    <Select 
                      defaultValue="global" 
                      onValueChange={setGeography}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select geography" />
                      </SelectTrigger>
                      <SelectContent>
                        {geographyOptions.map(option => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    
                    {geography !== "global" && (
                      <div className="mt-4 p-3 bg-blue-50 rounded-md text-sm">
                        <p className="font-medium flex items-center">
                          <CheckCircle className="h-4 w-4 mr-2 text-primary" />
                          {geographyOptions.find(g => g.value === geography)?.label} regulations will be applied
                        </p>
                      </div>
                    )}
                  </div>
                  
                  <FileUpload onFileUpload={handleFileUpload} />
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="prebuilt">
              <Card>
                <CardHeader>
                  <CardTitle>Pre-built Evaluations</CardTitle>
                  <CardDescription>
                    Choose from industry-specific evaluation templates
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    {prebuiltEvaluations.map(evaluation => (
                      <button
                        key={evaluation.id}
                        className="p-4 border rounded-lg hover:bg-gray-50 text-left transition-colors"
                        onClick={() => {
                          setLoading(true);
                          // Simulate analysis process for pre-built evaluation
                          setTimeout(() => {
                            setLoading(false);
                            setAnalysisComplete(true);
                            toast.success('Evaluation complete!', {
                              description: `${evaluation.name} evaluation has been processed.`
                            });
                          }, 3000);
                        }}
                      >
                        <div className="font-medium">{evaluation.name}</div>
                        <p className="text-sm text-gray-500 mt-1">
                          Standard compliance checks for {evaluation.name.toLowerCase()} applications
                        </p>
                      </button>
                    ))}
                  </div>
                  
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Add Geographic Regulations
                    </label>
                    <Select 
                      defaultValue="global" 
                      onValueChange={setGeography}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select geography" />
                      </SelectTrigger>
                      <SelectContent>
                        {geographyOptions.map(option => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
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
