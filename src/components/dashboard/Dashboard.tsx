
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ComplianceScore from './ComplianceScore';
import DataInsights from './DataInsights';
import Reports from '../reports/Reports';
import RegulatoryInfo from './RegulatoryInfo';
import SectorFrameworks from './SectorFrameworks';
import { toast } from 'sonner';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { CheckCircle, FileCode } from 'lucide-react';
import { Button } from "@/components/ui/button";

const Dashboard = () => {
  const [loading, setLoading] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [evaluationType, setEvaluationType] = useState("custom");
  const [geography, setGeography] = useState("global");
  const [selectedSector, setSelectedSector] = useState("general");
  const [customChecklistFile, setCustomChecklistFile] = useState<File | null>(null);
  
  const insightsData = [
    { category: 'Privacy', issues: 12, color: '#0ea5e9' },
    { category: 'Data Bias', issues: 8, color: '#f59e0b' },
    { category: 'Integrity', issues: 5, color: '#10b981' },
    { category: 'Security', issues: 15, color: '#ef4444' },
    { category: 'Compliance', issues: 10, color: '#8b5cf6' },
  ];
  
  const geographyOptions = [
    { value: "global", label: "Global Standards 🌍" },
    { value: "eu", label: "European Union 🇪🇺" },
    { value: "us", label: "United States 🇺🇸" },
    { value: "india", label: "India 🇮🇳" },
    { value: "canada", label: "Canada 🇨🇦" },
    { value: "singapore", label: "Singapore 🇸🇬" },
    { value: "uk", label: "United Kingdom 🇬🇧" },
    { value: "australia", label: "Australia 🇦🇺" },
    { value: "japan", label: "Japan 🇯🇵" },
    { value: "china", label: "China 🇨🇳" },
    { value: "brazil", label: "Brazil 🇧🇷" },
  ];

  const prebuiltEvaluations = [
    { id: "general", name: "General AI Systems 🤖" },
    { id: "healthcare", name: "Healthcare AI 🏥" },
    { id: "finance", name: "Financial/Fintech AI 💰" },
    { id: "government", name: "Government/Public Sector 🏛️" },
    { id: "education", name: "Education AI 🎓" }
  ];
  
  const handleCustomChecklistUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      // Check if it's a valid file type (CSV or PDF)
      const validTypes = ['text/csv', 'application/pdf'];
      if (!validTypes.includes(file.type)) {
        toast.error('Invalid file type', {
          description: 'Please upload a CSV or PDF file only.'
        });
        return;
      }
      
      setCustomChecklistFile(file);
      toast.success('Custom checklist uploaded', {
        description: `${file.name} will be applied to your evaluation.`
      });
    }
  };
  
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div>
          <h1 className="heading-lg mb-2">AI Compliance Dashboard</h1>
          <p className="text-gray-600">Evaluate your AI systems for compliance and ethical standards based on deployment geography and industry requirements.</p>
        </div>
        <div className="flex justify-end items-center space-x-4">
          <Link to="/evaluation">
            <Button className="flex items-center space-x-2">
              <FileCode className="h-4 w-4" />
              <span>Code Evaluation</span>
            </Button>
          </Link>
          
          {analysisComplete && (
            <button 
              type="button"
              className="btn-primary"
              onClick={() => {
                setAnalysisComplete(false);
                setCustomChecklistFile(null);
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
                    Select applicable geographic regulations for your AI system
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
                    
                    {/* Display regulatory information */}
                    <RegulatoryInfo geography={geography} />
                  </div>
                  
                  <div className="flex justify-end">
                    <Button
                      onClick={() => {
                        setLoading(true);
                        // Simulate analysis process
                        setTimeout(() => {
                          setLoading(false);
                          setAnalysisComplete(true);
                          toast.success('Evaluation complete!', {
                            description: 'Your compliance evaluation has been processed.'
                          });
                        }, 3000);
                      }}
                    >
                      Start Compliance Check
                    </Button>
                  </div>
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
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-4">
                      Select Industry Sector
                    </label>
                    <RadioGroup 
                      defaultValue="general" 
                      onValueChange={setSelectedSector}
                      className="grid grid-cols-1 md:grid-cols-2 gap-4"
                    >
                      {prebuiltEvaluations.map(evaluation => (
                        <div key={evaluation.id} className="flex items-start space-x-2">
                          <RadioGroupItem value={evaluation.id} id={`radio-${evaluation.id}`} />
                          <Label 
                            htmlFor={`radio-${evaluation.id}`} 
                            className="p-3 border rounded-lg flex-grow cursor-pointer hover:bg-gray-50 transition-colors"
                          >
                            <div className="font-medium">{evaluation.name}</div>
                            <p className="text-sm text-gray-500 mt-1">
                              Standard compliance checks for {evaluation.name.toLowerCase()}
                            </p>
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                    
                    {/* Display sector frameworks */}
                    <SectorFrameworks sectorId={selectedSector} />
                  </div>
                  
                  {/* Custom checklist upload option */}
                  <div className="mb-6 border-t pt-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Upload Custom Checklist (Optional)
                    </label>
                    <div className="p-4 border-2 border-dashed rounded-lg bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors">
                      <div className="flex flex-col items-center justify-center">
                        <FileCode className="h-8 w-8 text-gray-400 mb-2" />
                        <p className="text-sm text-gray-500 text-center mb-2">
                          Upload a custom checklist in CSV or PDF format
                        </p>
                        <input 
                          type="file" 
                          id="custom-checklist" 
                          className="hidden" 
                          accept=".csv,.pdf"
                          onChange={handleCustomChecklistUpload}
                        />
                        <label htmlFor="custom-checklist" className="btn-secondary text-sm cursor-pointer">
                          Browse Files
                        </label>
                        {customChecklistFile && (
                          <div className="mt-2 text-sm text-primary font-medium">
                            {customChecklistFile.name}
                          </div>
                        )}
                      </div>
                    </div>
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
                    
                    {/* Display regulatory information in prebuilt tab too */}
                    <RegulatoryInfo geography={geography} />
                  </div>
                  
                  <div className="flex justify-end">
                    <button
                      type="button"
                      className="btn-primary"
                      onClick={() => {
                        setLoading(true);
                        // Simulate analysis process for pre-built evaluation
                        setTimeout(() => {
                          setLoading(false);
                          setAnalysisComplete(true);
                          toast.success('Evaluation complete!', {
                            description: `${prebuiltEvaluations.find(e => e.id === selectedSector)?.name} evaluation has been processed.`
                          });
                        }, 3000);
                      }}
                    >
                      Start Evaluation
                    </button>
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
