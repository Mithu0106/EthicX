
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Upload, Code, FileCode, Key, Shield, CheckCircle, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const AIEvaluation = () => {
  const [evaluationMethod, setEvaluationMethod] = useState<'code' | 'api'>('code');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [apiEndpoint, setApiEndpoint] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [evaluationComplete, setEvaluationComplete] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedRegulation, setSelectedRegulation] = useState<{ title: string; url: string; description: string } | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleEvaluate = () => {
    if (evaluationMethod === 'code' && !selectedFile) {
      toast.error('Please select a file to evaluate');
      return;
    }

    if (evaluationMethod === 'api' && (!apiEndpoint || !apiKey)) {
      toast.error('Please provide both API endpoint and key');
      return;
    }

    setIsAnalyzing(true);

    // Simulate evaluation process
    setTimeout(() => {
      setIsAnalyzing(false);
      setEvaluationComplete(true);
      toast.success('AI system evaluation complete!');
    }, 3000);
  };

  const resetEvaluation = () => {
    setSelectedFile(null);
    setApiEndpoint('');
    setApiKey('');
    setEvaluationComplete(false);
  };

  const handleViewRegulation = (regulation: { title: string; url: string; description: string }) => {
    setSelectedRegulation(regulation);
    setDialogOpen(true);
  };

  const sampleRegulations = [
    {
      title: 'EU AI Act',
      url: 'https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX%3A52021PC0206',
      description: 'The EU AI Act defines various risk categories for AI systems and outlines compliance requirements for high-risk AI systems.'
    },
    {
      title: 'NIST AI RMF',
      url: 'https://www.nist.gov/system/files/documents/2021/09/22/AI-RMF-Preliminary-Report.pdf',
      description: 'The NIST AI Risk Management Framework provides guidelines on managing the risks associated with AI systems.'
    }
  ];

  const evaluationResults = [
    { area: 'Privacy', status: 'Pass', score: 87 },
    { area: 'Fairness', status: 'Warning', score: 68 },
    { area: 'Transparency', status: 'Pass', score: 92 },
    { area: 'Security', status: 'Warning', score: 71 },
    { area: 'Robustness', status: 'Pass', score: 81 },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="heading-lg mb-2">AI System Evaluation</h1>
        <p className="text-gray-600">Upload your AI code or connect to your AI system API for automated compliance evaluation</p>
      </div>

      {!evaluationComplete ? (
        <Card>
          <CardHeader>
            <CardTitle>Evaluate Your AI System</CardTitle>
            <CardDescription>
              Choose your preferred method for AI system evaluation
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="code" onValueChange={(value) => setEvaluationMethod(value as 'code' | 'api')}>
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="code" className="flex items-center gap-2">
                  <Code className="h-4 w-4" />
                  Code Upload
                </TabsTrigger>
                <TabsTrigger value="api" className="flex items-center gap-2">
                  <Key className="h-4 w-4" />
                  API Connection
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="code" className="space-y-6">
                <div className="border-2 border-dashed rounded-lg p-8 text-center">
                  {selectedFile ? (
                    <div>
                      <div className="flex items-center justify-center mb-4">
                        <FileCode className="h-12 w-12 text-primary" />
                      </div>
                      <h3 className="text-lg font-medium">{selectedFile.name}</h3>
                      <p className="text-sm text-gray-500 mt-1">
                        {(selectedFile.size / 1024).toFixed(2)} KB
                      </p>
                      <Button 
                        variant="outline" 
                        className="mt-4"
                        onClick={() => setSelectedFile(null)}
                      >
                        Remove File
                      </Button>
                    </div>
                  ) : (
                    <>
                      <div className="flex items-center justify-center mb-4">
                        <Upload className="h-12 w-12 text-gray-400" />
                      </div>
                      <h3 className="text-lg font-medium">Upload AI Code Files</h3>
                      <p className="text-gray-500 mt-2 mb-4">
                        Drag and drop your code files or click to browse
                      </p>
                      <Button asChild>
                        <label>
                          Browse Files
                          <input 
                            type="file" 
                            className="hidden" 
                            accept=".py,.js,.ts,.json,.ipynb,.h5,.pkl,.model" 
                            onChange={handleFileChange}
                          />
                        </label>
                      </Button>
                      <p className="text-xs text-gray-500 mt-4">
                        Supported formats: .py, .js, .ts, .json, .ipynb, .h5, .pkl, .model
                      </p>
                    </>
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="api" className="space-y-6">
                <div>
                  <label htmlFor="api-endpoint" className="block text-sm font-medium text-gray-700 mb-1">
                    API Endpoint
                  </label>
                  <Input
                    id="api-endpoint"
                    type="text"
                    placeholder="https://your-ai-system-api.com/endpoint"
                    value={apiEndpoint}
                    onChange={(e) => setApiEndpoint(e.target.value)}
                  />
                </div>
                
                <div>
                  <label htmlFor="api-key" className="block text-sm font-medium text-gray-700 mb-1">
                    API Key
                  </label>
                  <Input
                    id="api-key"
                    type="password"
                    placeholder="Your API Key"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Your API key is securely used only for evaluation purposes
                  </p>
                </div>
              </TabsContent>

              <div className="mt-8">
                <Button 
                  className="w-full sm:w-auto" 
                  onClick={handleEvaluate}
                  disabled={isAnalyzing}
                >
                  {isAnalyzing ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      Start Evaluation
                    </>
                  )}
                </Button>
              </div>
            </Tabs>
          </CardContent>
        </Card>
      ) : (
        <>
          <div className="mb-6 flex justify-between items-center">
            <h2 className="text-xl font-semibold">Evaluation Results</h2>
            <Button onClick={resetEvaluation} variant="outline">
              New Evaluation
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="h-5 w-5 text-primary mr-2" />
                  Compliance Overview
                </CardTitle>
                <CardDescription>
                  System evaluation based on AI ethical standards
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {evaluationResults.map((item) => (
                    <div key={item.area} className="flex justify-between items-center p-3 border rounded-md bg-white">
                      <div>
                        <span className="font-medium">{item.area}</span>
                      </div>
                      <div className="flex items-center">
                        <span className={`text-sm font-bold mr-3 ${item.score >= 75 ? 'text-green-500' : 'text-amber-500'}`}>
                          {item.score}/100
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          item.status === 'Pass' ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'
                        }`}>
                          {item.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-primary mr-2" />
                  Applicable Regulations
                </CardTitle>
                <CardDescription>
                  Regulations relevant to your AI system
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {sampleRegulations.map((regulation) => (
                    <div 
                      key={regulation.title} 
                      className="p-3 border rounded-md bg-white hover:bg-gray-50 cursor-pointer"
                      onClick={() => handleViewRegulation(regulation)}
                    >
                      <div className="flex justify-between">
                        <h4 className="font-medium text-primary">{regulation.title}</h4>
                        <Button variant="ghost" size="sm">View</Button>
                      </div>
                      <p className="text-xs text-gray-500 mt-1 line-clamp-2">{regulation.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Remediation Recommendations</CardTitle>
              <CardDescription>
                Actions to take to improve your AI system compliance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-3 border rounded-md bg-white">
                  <h4 className="font-medium">Improve Fairness Score</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    Review your training data for potential biases related to protected attributes. 
                    Implement fairness constraints in your model training pipeline.
                  </p>
                </div>
                <div className="p-3 border rounded-md bg-white">
                  <h4 className="font-medium">Enhance Security Measures</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    Implement robust authentication mechanisms and consider adding rate limiting to prevent abuse.
                    Apply encryption to sensitive data both in transit and at rest.
                  </p>
                </div>
                <div className="p-3 border rounded-md bg-white">
                  <h4 className="font-medium">Documentation Improvements</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    Create comprehensive documentation detailing the model's intended use, limitations, and potential risks.
                    Include model cards and datasheets for better transparency.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </>
      )}

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selectedRegulation?.title}</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="text-gray-700 mb-4">{selectedRegulation?.description}</p>
            <Button asChild>
              <a 
                href={selectedRegulation?.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center"
              >
                View Official Document
              </a>
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AIEvaluation;
